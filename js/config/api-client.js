// API客户端 - 支持本地代理和直接API调用
class ApiClient {
    constructor() {
        this.isLocalDevelopment = this.detectLocalDevelopment();
        console.log('API客户端初始化 - 环境:', this.isLocalDevelopment ? '本地开发' : '生产环境');
    }

    // 检测是否为本地开发环境
    detectLocalDevelopment() {
        return window.location.hostname === 'localhost' ||
               window.location.hostname === '127.0.0.1' ||
               window.location.port === '3000';
    }

    // 检测是否在 Cloudflare Pages 环境
    detectCloudflarePages() {
        return window.location.hostname.includes('.pages.dev') ||
               window.location.hostname.includes('workers.dev');
    }

    // 获取可用模型列表
    async getAvailableModels(modelsUrl, apiKey) {
        if (!modelsUrl || !apiKey) {
            throw new Error('API地址和密钥不能为空');
        }

        try {
            if (this.isLocalDevelopment) {
                // 本地开发环境：使用代理服务器
                return await this.loadModelsViaProxy(modelsUrl, apiKey);
            } else {
                // 生产环境：直接调用API
                return await this.loadModelsDirectly(modelsUrl, apiKey);
            }
        } catch (error) {
            console.error('加载模型失败:', error);
            throw error;
        }
    }

    // 加载可用模型（保持向后兼容）
    async loadModels(modelsUrl, apiKey) {
        if (!modelsUrl || !apiKey) {
            throw new Error('API地址和密钥不能为空');
        }

        try {
            if (this.isLocalDevelopment) {
                // 本地开发环境：使用代理服务器
                return await this.loadModelsViaProxy(modelsUrl, apiKey);
            } else if (this.detectCloudflarePages()) {
                // Cloudflare Pages环境：使用CORS代理
                return await this.loadModelsViaCORSProxy(modelsUrl, apiKey);
            } else {
                // 生产环境：直接调用API
                return await this.loadModelsDirectly(modelsUrl, apiKey);
            }
        } catch (error) {
            console.error('加载模型失败:', error);
            throw error;
        }
    }

    // 通过代理服务器加载模型
    async loadModelsViaProxy(modelsUrl, apiKey) {
        const response = await fetch('http://localhost:3000/api/models', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                apiUrl: modelsUrl,
                apiKey: apiKey
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // 使用标准化方法处理模型数据
        return this.normalizeModelsData(data);
    }

    // 通过CORS代理加载模型（用于Cloudflare Pages）
    async loadModelsViaCORSProxy(modelsUrl, apiKey) {
        // 使用公共CORS代理服务
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(proxyUrl + modelsUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`API请求失败: ${response.status} ${response.statusText}\n${errorData}`);
        }

        const data = await response.json();
        // 使用标准化方法处理模型数据
        return this.normalizeModelsData(data);
    }

    // 直接调用API加载模型
    async loadModelsDirectly(modelsUrl, apiKey) {
        const response = await fetch(modelsUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`API请求失败: ${response.status} ${response.statusText}\n${errorData}`);
        }

        const data = await response.json();
        // 使用标准化方法处理模型数据
        return this.normalizeModelsData(data);
    }

    // 发送聊天请求
    async sendChatRequest(apiUrl, apiKey, model, messages, options = {}) {
        if (!apiUrl || !apiKey || !model) {
            throw new Error('API地址、密钥和模型不能为空');
        }

        const requestBody = {
            model: model,
            messages: messages,
            stream: options.stream || false,
            max_tokens: options.max_tokens || 2000,
            temperature: options.temperature || 0.7,
            ...options
        };

        try {
            if (this.isLocalDevelopment) {
                // 本地开发环境：使用代理服务器
                return await this.sendViaProxy(apiUrl, apiKey, requestBody);
            } else if (this.detectCloudflarePages()) {
                // Cloudflare Pages环境：使用CORS代理
                return await this.sendViaCORSProxy(apiUrl, apiKey, requestBody);
            } else {
                // 生产环境：直接调用API
                return await this.sendDirectly(apiUrl, apiKey, requestBody);
            }
        } catch (error) {
            console.error('发送请求失败:', error);
            throw error;
        }
    }

    // 通过代理服务器发送请求
    async sendViaProxy(apiUrl, apiKey, requestBody) {
        // 检查是否是自定义API配置
        const isCustomApi = apiUrl && !apiUrl.includes('api.deepseek.com') && 
                            !apiUrl.includes('api.openai.com') && 
                            !apiUrl.includes('api.anthropic.com') && 
                            !apiUrl.includes('dashscope.aliyuncs.com') && 
                            !apiUrl.includes('open.bigmodel.cn');
        
        let requestPayload;
        if (isCustomApi) {
            // 使用自定义API格式
            requestPayload = {
                service: 'custom',
                customApiUrl: apiUrl,
                customApiKey: apiKey,
                model: requestBody.model,
                messages: requestBody.messages,
                stream: requestBody.stream,
                temperature: requestBody.temperature,
                max_tokens: requestBody.max_tokens
            };
            
            // 添加DeepSeek-R1特殊参数
            if (requestBody.model.includes('deepseek-r1') && requestBody.reasoning_effort) {
                requestPayload.reasoning_effort = requestBody.reasoning_effort;
            }
        } else {
            // 使用标准API格式
            requestPayload = {
                targetUrl: apiUrl,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: requestBody
            };
        }
        
        const response = await fetch('http://localhost:3000/api/proxy', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestPayload)
        });

        return await this.handleResponse(response);
    }

    // 通过CORS代理发送请求（用于Cloudflare Pages）
    async sendViaCORSProxy(apiUrl, apiKey, requestBody) {
        // 使用公共CORS代理服务
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const response = await fetch(proxyUrl + apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest'
            },
            body: JSON.stringify(requestBody)
        });

        return await this.handleResponse(response);
    }

    // 直接调用API发送请求
    async sendDirectly(apiUrl, apiKey, requestBody) {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        return await this.handleResponse(response);
    }

    // 处理API响应
    async handleResponse(response) {
        if (!response.ok) {
            const errorData = await response.text();
            throw new Error(`API请求失败: ${response.status} ${response.statusText}\n${errorData}`);
        }

        // 处理流式响应
        if (response.headers.get('content-type')?.includes('text/event-stream')) {
            return await this.handleStreamResponse(response);
        }

        // 处理JSON响应
        return await response.json();
    }

    // 处理流式响应
    async handleStreamResponse(response) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let result = '';
        
        try {
            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                
                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6).trim();
                        if (data === '[DONE]') {
                            return { choices: [{ message: { content: result } }] };
                        }
                        
                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content || '';
                            result += content;
                        } catch (e) {
                            // 忽略解析错误
                        }
                    }
                }
            }
            
            return { choices: [{ message: { content: result } }] };
        } finally {
            reader.releaseLock();
        }
    }

    /**
     * 标准化不同API提供商的模型数据格式
     * @param {Object} data - 原始API响应数据
     * @returns {Array} 标准化的模型列表
     */
    normalizeModelsData(data) {
        let models = [];
        
        if (data.data && Array.isArray(data.data)) {
            // OpenAI格式
            models = data.data.map(model => ({
                id: model.id,
                name: model.id,
                created: model.created,
                owned_by: model.owned_by || 'unknown',
                provider: 'openai'
            }));
        } else if (data.models && Array.isArray(data.models)) {
            // 其他格式
            models = data.models.map(model => ({
                id: model.id || model.model,
                name: model.name || model.id || model.model,
                created: model.created,
                owned_by: model.owned_by || 'unknown',
                provider: 'custom'
            }));
        } else if (Array.isArray(data)) {
            // 直接是数组格式
            models = data.map(model => ({
                id: model.id || model.model || model,
                name: model.name || model.id || model.model || model,
                created: model.created,
                owned_by: model.owned_by || 'unknown',
                provider: 'custom'
            }));
        }
        
        // 按名称排序
        return models.sort((a, b) => a.name.localeCompare(b.name));
    }
}

// 导出模块
window.ApiClient = ApiClient;