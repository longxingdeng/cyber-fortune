// 配置管理器 - 处理API配置和模型加载
class ConfigManager {
    constructor() {
        this.configKey = 'cyberFortune_globalConfig';
        this.modelsCacheKey = 'cyberFortune_modelsCache';
        this.defaultConfig = {
            apiUrl: 'https://api.deepseek.com',
            apiKey: '',
            model: 'deepseek-r1',
            provider: 'deepseek'
        };
        this.apiClient = new ApiClient();
        
        // 提供商配置
        this.providers = {
            deepseek: {
                name: 'DeepSeek',
                baseUrl: 'https://api.deepseek.com',
                defaultModels: ['deepseek-r1', 'deepseek-chat'],
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            openai: {
                name: 'OpenAI',
                baseUrl: 'https://api.openai.com',
                defaultModels: ['gpt-4', 'gpt-3.5-turbo'],
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            anthropic: {
                name: 'Anthropic',
                baseUrl: 'https://api.anthropic.com',
                defaultModels: ['claude-3-sonnet', 'claude-3-haiku'],
                headers: {
                    'Content-Type': 'application/json',
                    'anthropic-version': '2023-06-01'
                }
            },
            alibaba: {
                name: '阿里巴巴',
                baseUrl: 'https://dashscope.aliyuncs.com',
                defaultModels: ['qwen-max', 'qwen-plus'],
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            zhipu: {
                name: '智谱AI',
                baseUrl: 'https://open.bigmodel.cn/api/paas',
                defaultModels: ['glm-4', 'glm-3-turbo'],
                headers: {
                    'Content-Type': 'application/json'
                }
            },
            custom: {
                name: '自定义',
                baseUrl: '',
                defaultModels: [],
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        };
    }

    // 获取提供商配置
    getProviderConfig(provider) {
        return this.providers[provider] || this.providers.deepseek;
    }

    // 获取API URL
    getApiUrl(provider, customUrl = '') {
        const config = this.getProviderConfig(provider);
        const baseUrl = customUrl || config.baseUrl;
        
        // 如果是自定义URL，直接返回拼接的完整URL
        if (customUrl) {
            // 确保URL不以/结尾
            const cleanUrl = baseUrl.replace(/\/$/, '');
            return `${cleanUrl}/v1/chat/completions`;
        }
        
        // 使用默认配置
        if (provider === 'anthropic') {
            // Anthropic使用不同的端点
            return `${baseUrl}/v1/messages`;
        } else if (provider === 'alibaba') {
            // 阿里云使用不同的端点
            return `${baseUrl}/api/v1/services/aigc/text-generation/generation`;
        } else if (provider === 'zhipu') {
            // 智谱AI使用不同的端点
            return `${baseUrl}/v4/chat/completions`;
        } else {
            // 标准OpenAI兼容格式
            return `${baseUrl}/v1/chat/completions`;
        }
    }

    // 获取模型列表URL
    getModelsUrl(provider, customUrl = '') {
        const config = this.getProviderConfig(provider);
        const baseUrl = customUrl || config.baseUrl;
        
        // 如果是自定义URL，直接返回拼接的完整URL
        if (customUrl) {
            // 确保URL不以/结尾
            const cleanUrl = baseUrl.replace(/\/$/, '');
            return `${cleanUrl}/v1/models`;
        }
        
        // 使用默认配置
        if (provider === 'alibaba') {
            // 阿里云使用不同的端点
            return `${baseUrl}/api/v1/models`;
        } else if (provider === 'zhipu') {
            // 智谱AI使用不同的端点
            return `${baseUrl}/v4/models`;
        } else {
            // 标准OpenAI兼容格式
            return `${baseUrl}/v1/models`;
        }
    }

    // 获取全局配置
    getConfig() {
        try {
            const config = localStorage.getItem(this.configKey);
            return config ? { ...this.defaultConfig, ...JSON.parse(config) } : { ...this.defaultConfig };
        } catch (error) {
            console.error('获取配置失败:', error);
            return { ...this.defaultConfig };
        }
    }

    // 保存配置
    saveConfig(config) {
        try {
            localStorage.setItem(this.configKey, JSON.stringify(config));
            return true;
        } catch (error) {
            console.error('保存配置失败:', error);
            return false;
        }
    }

    // 获取缓存的模型列表
    getCachedModels(apiUrl) {
        try {
            const cache = localStorage.getItem(this.modelsCacheKey);
            if (cache) {
                const parsedCache = JSON.parse(cache);
                // 检查缓存是否过期（24小时）
                const cacheTime = parsedCache[apiUrl]?.timestamp;
                if (cacheTime && Date.now() - cacheTime < 24 * 60 * 60 * 1000) {
                    return parsedCache[apiUrl]?.models || [];
                }
            }
        } catch (error) {
            console.error('获取缓存模型失败:', error);
        }
        return null;
    }

    // 缓存模型列表
    cacheModels(apiUrl, models) {
        try {
            const cache = localStorage.getItem(this.modelsCacheKey);
            const parsedCache = cache ? JSON.parse(cache) : {};
            parsedCache[apiUrl] = {
                models: models,
                timestamp: Date.now()
            };
            localStorage.setItem(this.modelsCacheKey, JSON.stringify(parsedCache));
        } catch (error) {
            console.error('缓存模型失败:', error);
        }
    }

    // 加载模型列表
    async loadModels(baseUrl, apiKey, provider = 'custom', forceRefresh = false) {
        if (!baseUrl || !apiKey) {
            throw new Error('API地址和密钥不能为空');
        }

        // 获取模型列表URL
        const modelsUrl = this.getModelsUrl(provider, baseUrl);
        
        // 如果不强制刷新，先尝试从缓存获取
        if (!forceRefresh) {
            const cachedModels = this.getCachedModels(modelsUrl);
            if (cachedModels && cachedModels.length > 0) {
                console.log('使用缓存的模型列表');
                return cachedModels;
            }
        }

        try {
            console.log('从API加载模型列表...');
            const models = await this.apiClient.loadModels(modelsUrl, apiKey);
            
            // 过滤和标准化模型名称
            const filteredModels = this.filterModels(models);
            
            // 缓存模型列表
            this.cacheModels(modelsUrl, filteredModels);
            
            return filteredModels;
        } catch (error) {
            console.error('加载模型失败:', error);
            throw error;
        }
    }

    // 过滤和标准化模型名称
    filterModels(models) {
        if (!Array.isArray(models)) {
            return [];
        }

        // 根据模型ID过滤和标准化
        const filteredModels = models.map(model => {
            let id = model.id || model.model || '';
            let name = model.name || model.id || model.model || '';
            
            // 标准化模型名称
            id = id.trim();
            name = name.trim();
            
            // 添加模型类型标识
            let type = 'unknown';
            if (id.includes('gpt')) {
                type = 'openai';
            } else if (id.includes('claude')) {
                type = 'anthropic';
            } else if (id.includes('deepseek')) {
                type = 'deepseek';
            } else if (id.includes('qwen') || id.includes('tongyi')) {
                type = 'alibaba';
            } else if (id.includes('glm') || id.includes('zhipu')) {
                type = 'zhipu';
            }
            
            return {
                id: id,
                name: name || id,
                type: type,
                provider: this.detectProvider(id)
            };
        }).filter(model => model.id && !model.id.includes('deleted'));
        
        return filteredModels;
    }

    // 检测模型提供商
    detectProvider(modelId) {
        if (modelId.includes('deepseek')) {
            return 'deepseek';
        } else if (modelId.includes('gpt')) {
            return 'openai';
        } else if (modelId.includes('claude')) {
            return 'anthropic';
        } else if (modelId.includes('qwen') || modelId.includes('tongyi')) {
            return 'alibaba';
        } else if (modelId.includes('glm') || modelId.includes('zhipu')) {
            return 'zhipu';
        }
        return 'custom';
    }

    // 根据API URL检测提供商
    detectProviderFromUrl(baseUrl) {
        if (baseUrl.includes('api.deepseek.com')) {
            return 'deepseek';
        } else if (baseUrl.includes('api.openai.com')) {
            return 'openai';
        } else if (baseUrl.includes('api.anthropic.com')) {
            return 'anthropic';
        } else if (baseUrl.includes('dashscope.aliyuncs.com')) {
            return 'alibaba';
        } else if (baseUrl.includes('open.bigmodel.cn')) {
            return 'zhipu';
        }
        return 'custom';
    }

    // 验证API配置
    async validateConfig(baseUrl, apiKey, provider = 'custom') {
        if (!baseUrl || !apiKey) {
            return { valid: false, error: 'API地址和密钥不能为空' };
        }

        try {
            // 尝试加载模型列表来验证配置
            await this.loadModels(baseUrl, apiKey, provider);
            return { valid: true };
        } catch (error) {
            return { valid: false, error: error.message };
        }
    }

    // 获取推荐的模型列表（用于默认显示）
    getRecommendedModels() {
        return [
            { id: 'deepseek-r1', name: 'DeepSeek-R1 (推荐)', provider: 'deepseek' },
            { id: 'deepseek-chat', name: 'DeepSeek-Chat', provider: 'deepseek' },
            { id: 'gpt-4', name: 'GPT-4', provider: 'openai' },
            { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'openai' },
            { id: 'claude-3-sonnet', name: 'Claude-3 Sonnet', provider: 'anthropic' },
            { id: 'claude-3-haiku', name: 'Claude-3 Haiku', provider: 'anthropic' },
            { id: 'qwen-max', name: '通义千问-Max', provider: 'alibaba' },
            { id: 'glm-4', name: '智谱GLM-4', provider: 'zhipu' }
        ];
    }

    // 清除模型缓存
    clearModelsCache(apiUrl = null) {
        try {
            if (apiUrl) {
                // 清除特定API的缓存
                const cache = localStorage.getItem(this.modelsCacheKey);
                if (cache) {
                    const parsedCache = JSON.parse(cache);
                    delete parsedCache[apiUrl];
                    localStorage.setItem(this.modelsCacheKey, JSON.stringify(parsedCache));
                }
            } else {
                // 清除所有缓存
                localStorage.removeItem(this.modelsCacheKey);
            }
        } catch (error) {
            console.error('清除缓存失败:', error);
        }
    }
}

// 导出模块
window.ConfigManager = ConfigManager;