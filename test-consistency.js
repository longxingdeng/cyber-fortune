// Node.js 测试脚本，用于验证姓名分值计算的一致性

// 模拟浏览器环境
global.window = {};
global.document = {};

// 加载必要的文件
const fs = require('fs');
const path = require('path');

// 读取并执行 JavaScript 文件
function loadScript(filename) {
    const filePath = path.join(__dirname, filename);
    const content = fs.readFileSync(filePath, 'utf8');
    eval(content);
}

try {
    loadScript('js/bazi-calculator.js');
    loadScript('js/name-calculator.js');
    
    console.log('✅ 脚本加载成功');
    
    // 创建计算器实例
    const baziCalculator = new BaziCalculator();
    const nameCalculator = new NameCalculator();
    
    // 测试数据
    const testCases = [
        {
            name: '张伟',
            birthData: {
                year: 1990,
                month: 5,
                day: 15,
                hour: 10,
                gender: '男'
            }
        },
        {
            name: '李娜',
            birthData: {
                year: 1985,
                month: 8,
                day: 20,
                hour: 14,
                gender: '女'
            }
        },
        {
            name: '王小明',
            birthData: {
                year: 1995,
                month: 3,
                day: 10,
                hour: 8,
                gender: '男'
            }
        }
    ];
    
    console.log('\n🔍 开始一致性测试...\n');
    
    let allTestsPassed = true;
    
    testCases.forEach((testCase, caseIndex) => {
        console.log(`📋 测试案例 ${caseIndex + 1}: ${testCase.name}`);
        
        try {
            // 计算八字（只计算一次）
            const baziResult = baziCalculator.calculate(testCase.birthData);
            
            // 多次运行姓名分析
            const iterations = 50;
            const results = [];
            
            for (let i = 0; i < iterations; i++) {
                const nameAnalysis = nameCalculator.analyzeName(testCase.name, baziResult);
                results.push({
                    score: nameAnalysis.score,
                    wuXingMatch: nameAnalysis.wuXingMatch,
                    serialized: JSON.stringify(nameAnalysis)
                });
            }
            
            // 检查一致性
            const firstResult = results[0];
            let isConsistent = true;
            const inconsistentFields = [];
            
            for (let i = 1; i < results.length; i++) {
                if (results[i].score !== firstResult.score) {
                    isConsistent = false;
                    inconsistentFields.push(`分数: ${firstResult.score} vs ${results[i].score}`);
                    break;
                }
                if (results[i].wuXingMatch !== firstResult.wuXingMatch) {
                    isConsistent = false;
                    inconsistentFields.push(`五行匹配: ${firstResult.wuXingMatch} vs ${results[i].wuXingMatch}`);
                    break;
                }
                if (results[i].serialized !== firstResult.serialized) {
                    isConsistent = false;
                    inconsistentFields.push('完整结果不一致');
                    break;
                }
            }
            
            if (isConsistent) {
                console.log(`   ✅ 通过 - 所有${iterations}次计算结果一致`);
                console.log(`   📊 分数: ${firstResult.score}分, 五行匹配: ${firstResult.wuXingMatch}分`);
            } else {
                console.log(`   ❌ 失败 - 计算结果不一致`);
                console.log(`   🔍 不一致字段: ${inconsistentFields.join(', ')}`);
                allTestsPassed = false;
                
                // 显示前几次的详细结果
                console.log('   📋 前5次结果:');
                results.slice(0, 5).forEach((result, index) => {
                    console.log(`      ${index + 1}: 分数=${result.score}, 五行匹配=${result.wuXingMatch}`);
                });
            }
            
        } catch (error) {
            console.log(`   ❌ 错误: ${error.message}`);
            allTestsPassed = false;
        }
        
        console.log('');
    });
    
    // 总结
    if (allTestsPassed) {
        console.log('🎉 所有测试通过！姓名分值计算结果完全一致。');
        process.exit(0);
    } else {
        console.log('⚠️  部分测试失败，存在计算结果不一致的问题。');
        process.exit(1);
    }
    
} catch (error) {
    console.error('❌ 测试执行失败:', error.message);
    console.error(error.stack);
    process.exit(1);
}
