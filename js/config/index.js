// 配置模块入口文件
// 这个文件作为配置模块的统一入口点

// 确保依赖已加载
if (typeof ApiClient === 'undefined') {
    console.error('ApiClient未加载，请确保api-client.js已正确引入');
}

if (typeof ConfigManager === 'undefined') {
    console.error('ConfigManager未加载，请确保config-manager.js已正确引入');
}

if (typeof AiConfig === 'undefined') {
    console.error('AiConfig未加载，请确保ai-config.js已正确引入');
}

// 全局配置实例
let globalAIConfig = null;

// 初始化配置系统
function initConfigSystem() {
    try {
        // 创建全局AI配置实例
        globalAIConfig = new AiConfig();
        
        // 初始化配置
        globalAIConfig.init();
        
        console.log('配置系统初始化成功');
        return globalAIConfig;
    } catch (error) {
        console.error('配置系统初始化失败:', error);
        return null;
    }
}

// 获取全局配置实例
function getAIConfig() {
    if (!globalAIConfig) {
        globalAIConfig = initConfigSystem();
    }
    return globalAIConfig;
}

// 导出函数和对象
window.ConfigSystem = {
    init: initConfigSystem,
    getAIConfig: getAIConfig,
    ApiClient: ApiClient,
    ConfigManager: ConfigManager,
    AiConfig: AiConfig
};

// 自动初始化（如果在浏览器环境中）
if (typeof window !== 'undefined') {
    // 等待DOM加载完成后再初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initConfigSystem();
        });
    } else {
        // DOM已经加载完成
        initConfigSystem();
    }
}