// AI配置模块 - 处理AI特定的配置功能
class AiConfig {
    constructor() {
        this.configManager = new ConfigManager();
        this.apiClient = new ApiClient();
        this.currentConfig = this.configManager.getConfig();
        this.models = [];
        this.isLoading = false;
        // 使用配置管理器中的提供商配置
        this.providers = this.configManager.providers;
    }

    // 初始化AI配置
    init() {
        this.bindEvents();
        this.loadConfigToUI();
        this.updateProviderSelection();
    }

    // 绑定事件
    bindEvents() {
        const configToggle = document.getElementById('config-toggle');
        const configClose = document.getElementById('config-close');
        const configOverlay = document.getElementById('config-overlay');
        const saveConfigBtn = document.getElementById('save-global-config');
        const testConfigBtn = document.getElementById('test-global-config');
        const apiUrlInput = document.getElementById('global-api-url');
        const apiKeyInput = document.getElementById('global-api-key');
        const modelSelect = document.getElementById('global-model');
        const loadModelsBtn = document.getElementById('load-models-btn');

        // 打开/关闭配置面板
        if (configToggle) {
            configToggle.addEventListener('click', () => this.showConfigPanel());
        }
        
        if (configClose) {
            configClose.addEventListener('click', () => this.hideConfigPanel());
        }
        
        if (configOverlay) {
            configOverlay.addEventListener('click', () => this.hideConfigPanel());
        }

        // 保存配置
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', () => this.saveConfig());
        }

        // 测试配置
        if (testConfigBtn) {
            testConfigBtn.addEventListener('click', () => this.testConfig());
        }

        // 加载模型列表
        if (loadModelsBtn) {
            loadModelsBtn.addEventListener('click', () => this.loadModelsFromAPI());
        }

        // API地址变化时自动检测提供商
        if (apiUrlInput) {
            apiUrlInput.addEventListener('change', () => {
                this.detectProvider();
                this.updateProviderSelection();
            });
        }

        // API密钥变化时启用加载模型按钮
        if (apiKeyInput) {
            apiKeyInput.addEventListener('input', () => {
                this.updateLoadModelsButton();
            });
        }
    }

    // 显示配置面板
    showConfigPanel() {
        const panel = document.getElementById('global-config-panel');
        if (panel) {
            panel.style.display = 'block';
            this.loadConfigToUI();
        }
    }

    // 隐藏配置面板
    hideConfigPanel() {
        const panel = document.getElementById('global-config-panel');
        if (panel) {
            panel.style.display = 'none';
        }
    }

    // 加载配置到UI
    loadConfigToUI() {
        const config = this.configManager.getConfig();
        const apiUrlInput = document.getElementById('global-api-url');
        const apiKeyInput = document.getElementById('global-api-key');
        const modelSelect = document.getElementById('global-model');
        const providerSelect = document.getElementById('provider-select');

        if (apiUrlInput) {
            // 使用baseUrl或apiUrl，优先使用baseUrl（基础URL）
            apiUrlInput.value = config.baseUrl || config.apiUrl || '';
        }
        
        if (apiKeyInput) {
            apiKeyInput.value = config.apiKey || '';
        }

        if (providerSelect) {
            providerSelect.value = config.provider || 'deepseek';
        }

        if (modelSelect) {
            // 先加载推荐模型
            this.loadRecommendedModels(modelSelect);
            
            // 如果有配置的API地址和密钥，尝试加载模型列表
            if ((config.baseUrl || config.apiUrl) && config.apiKey) {
                this.loadModelsFromAPI(false);
            }
        }

        this.updateStatus();
        this.updateLoadModelsButton();
    }

    // 加载推荐模型
    loadRecommendedModels(modelSelect) {
        if (!modelSelect) return;
        
        const recommendedModels = this.configManager.getRecommendedModels();
        modelSelect.innerHTML = '';
        
        recommendedModels.forEach(model => {
            const option = document.createElement('option');
            option.value = model.id;
            option.textContent = model.name;
            option.dataset.provider = model.provider;
            modelSelect.appendChild(option);
        });

        // 设置当前选中的模型
        const currentModel = this.currentConfig.model;
        if (currentModel) {
            modelSelect.value = currentModel;
        }
    }

    // 从API加载模型列表
    async loadModelsFromAPI(showLoading = true) {
        if (this.isLoading) return;

        const baseUrl = document.getElementById('global-api-url')?.value;
        const apiKey = document.getElementById('global-api-key')?.value;
        const providerSelect = document.getElementById('provider-select');
        const modelSelect = document.getElementById('global-model');
        const loadModelsBtn = document.getElementById('load-models-btn');

        if (!baseUrl || !apiKey) {
            this.showMessage('请先填写API地址和密钥', 'error');
            return;
        }

        if (!modelSelect) return;

        const provider = providerSelect?.value || this.configManager.detectProviderFromUrl(baseUrl) || 'custom';

        try {
            this.isLoading = true;
            
            if (showLoading) {
                this.showMessage('正在加载模型列表...', 'info');
                if (loadModelsBtn) {
                    loadModelsBtn.disabled = true;
                    loadModelsBtn.textContent = '加载中...';
                }
            }

            // 使用配置管理器获取模型列表URL
            const modelsUrl = this.configManager.getModelsUrl(provider, baseUrl);
            
            // 使用API客户端加载模型
            const models = await this.apiClient.getAvailableModels(modelsUrl, apiKey);
            
            if (models && models.length > 0) {
                // 清空现有选项
                modelSelect.innerHTML = '';
                
                // 添加加载的模型
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model.id;
                    option.textContent = model.name;
                    option.dataset.provider = model.provider;
                    modelSelect.appendChild(option);
                });

                // 尝试保持之前选择的模型
                const currentModel = this.currentConfig.model;
                if (currentModel && models.find(m => m.id === currentModel)) {
                    modelSelect.value = currentModel;
                }

                this.showMessage(`成功加载 ${models.length} 个模型`, 'success');
            } else {
                this.showMessage('未找到可用模型，使用推荐模型列表', 'warning');
                this.loadRecommendedModels(modelSelect);
            }
        } catch (error) {
            console.error('加载模型失败:', error);
            this.showMessage(`加载模型失败: ${error.message}`, 'error');
            // 加载推荐模型作为备选
            this.loadRecommendedModels(modelSelect);
        } finally {
            this.isLoading = false;
            if (showLoading && loadModelsBtn) {
                loadModelsBtn.disabled = false;
                loadModelsBtn.textContent = '🔄 加载模型';
            }
        }
    }

    // 检测API提供商
    detectProvider() {
        const apiUrl = document.getElementById('global-api-url')?.value;
        if (!apiUrl) return;

        const provider = this.configManager.detectProviderFromUrl(apiUrl);
        const providerDisplay = document.getElementById('provider-display');
        
        if (providerDisplay) {
            providerDisplay.textContent = this.providers[provider]?.name || '未知';
        }
    }

    // 更新提供商选择
    updateProviderSelection() {
        const apiUrl = document.getElementById('global-api-url')?.value;
        if (!apiUrl) return;

        const provider = this.configManager.detectProviderFromUrl(apiUrl);
        const providerSelect = document.getElementById('provider-select');
        
        if (providerSelect) {
            providerSelect.value = provider;
            this.updateProviderUrl(provider);
        }
    }

    // 更新提供商URL
    updateProviderUrl(provider) {
        const apiUrlInput = document.getElementById('global-api-url');
        if (!apiUrlInput || !apiUrlInput.value || provider === 'custom') return;

        const defaultUrl = this.providers[provider]?.defaultUrl;
        if (defaultUrl && apiUrlInput.value !== defaultUrl) {
            // 只有当用户没有自定义URL时才更新
            const currentConfig = this.configManager.getConfig();
            if (currentConfig.apiUrl === this.providers[currentConfig.provider]?.defaultUrl) {
                apiUrlInput.value = defaultUrl;
            }
        }
    }

    // 更新加载模型按钮状态
    updateLoadModelsButton() {
        const apiKey = document.getElementById('global-api-key')?.value;
        const loadModelsBtn = document.getElementById('load-models-btn');
        
        if (loadModelsBtn) {
            loadModelsBtn.disabled = !apiKey || this.isLoading;
        }
    }

    // 保存配置
    async saveConfig() {
        const baseUrl = document.getElementById('global-api-url')?.value;
        const apiKey = document.getElementById('global-api-key')?.value;
        const model = document.getElementById('global-model')?.value;
        const providerSelect = document.getElementById('provider-select');

        if (!baseUrl || !apiKey || !model) {
            this.showMessage('请填写完整的配置信息', 'error');
            return;
        }

        const provider = providerSelect?.value || this.configManager.detectProviderFromUrl(baseUrl) || 'custom';
        
        // 获取完整的API URL
        const apiUrl = this.configManager.getApiUrl(provider, baseUrl);
        
        const config = {
            baseUrl: baseUrl, // 保存基础URL
            apiUrl: apiUrl,   // 保存完整的API URL
            apiKey,
            model,
            provider
        };

        try {
            const success = this.configManager.saveConfig(config);
            if (success) {
                this.currentConfig = config;
                this.showMessage('配置保存成功', 'success');
                this.updateStatus();
            } else {
                this.showMessage('配置保存失败', 'error');
            }
        } catch (error) {
            console.error('保存配置失败:', error);
            this.showMessage(`保存配置失败: ${error.message}`, 'error');
        }
    }

    // 测试配置
    async testConfig() {
        const baseUrl = document.getElementById('global-api-url')?.value;
        const apiKey = document.getElementById('global-api-key')?.value;
        const model = document.getElementById('global-model')?.value;
        const providerSelect = document.getElementById('provider-select');
        const testBtn = document.getElementById('test-global-config');

        if (!baseUrl || !apiKey || !model) {
            this.showMessage('请填写完整的配置信息', 'error');
            return;
        }

        const provider = providerSelect?.value || this.configManager.detectProviderFromUrl(baseUrl) || 'custom';

        try {
            if (testBtn) {
                testBtn.disabled = true;
                testBtn.textContent = '测试中...';
            }

            this.showMessage('正在测试连接...', 'info');
            
            // 使用配置管理器的验证功能
            const result = await this.configManager.validateConfig(baseUrl, apiKey, provider);
            
            if (result.valid) {
                this.showMessage('连接测试成功', 'success');
                this.updateStatus('connected');
            } else {
                this.showMessage(`连接测试失败: ${result.error}`, 'error');
                this.updateStatus('error');
            }
        } catch (error) {
            console.error('测试配置失败:', error);
            this.showMessage(`测试配置失败: ${error.message}`, 'error');
            this.updateStatus('error');
        } finally {
            if (testBtn) {
                testBtn.disabled = false;
                testBtn.textContent = '🔍 测试连接';
            }
        }
    }

    // 更新状态显示
    updateStatus(status = null) {
        const statusIndicator = document.getElementById('config-status')?.querySelector('.status-indicator');
        const statusText = document.getElementById('config-status')?.querySelector('.status-text');
        
        if (!statusIndicator || !statusText) return;

        if (status === 'connected') {
            statusIndicator.textContent = '🟢';
            statusText.textContent = '已连接';
        } else if (status === 'error') {
            statusIndicator.textContent = '🔴';
            statusText.textContent = '连接失败';
        } else if ((this.currentConfig.baseUrl || this.currentConfig.apiUrl) && this.currentConfig.apiKey) {
            statusIndicator.textContent = '🟡';
            statusText.textContent = '已配置';
        } else {
            statusIndicator.textContent = '⚪';
            statusText.textContent = '未配置';
        }
    }

    // 显示消息
    showMessage(message, type = 'info') {
        // 可以在这里实现一个更好的消息提示系统
        console.log(`[${type.toUpperCase()}] ${message}`);
        
        // 简单的实现：使用alert
        if (type === 'error') {
            alert(`错误: ${message}`);
        }
    }

    // 获取当前配置
    getCurrentConfig() {
        return this.currentConfig;
    }

    // 检查配置是否有效
    isConfigValid() {
        return !!((this.currentConfig.baseUrl || this.currentConfig.apiUrl) && this.currentConfig.apiKey && this.currentConfig.model);
    }
}

// 导出模块
window.AiConfig = AiConfig;