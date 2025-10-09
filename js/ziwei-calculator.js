// 赛博论命 - 紫薇斗数计算模块（基于iztro库）

class ZiweiCalculator {
    constructor() {
        // 检查iztro库是否可用
        this.iztroAvailable = typeof iztro !== 'undefined';
        if (this.iztroAvailable) {
            console.log('✅ iztro库已加载，将使用专业紫薇斗数计算');
        } else {
            console.error('❌ iztro库未加载，将使用备用计算方法');
        }
        
        // 十二宫位
        this.gongWei = [
            '命宫', '兄弟宫', '夫妻宫', '子女宫', '财帛宫', '疾厄宫',
            '迁移宫', '奴仆宫', '官禄宫', '田宅宫', '福德宫', '父母宫'
        ];
        
        // 地支
        this.diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    }

    // 使用iztro库计算紫薇斗数
    calculate(birthData) {
        if (this.iztroAvailable) {
            return this.calculateWithIztro(birthData);
        } else {
            return this.getFallbackResult(birthData);
        }
    }

    // 使用iztro库进行专业计算
    calculateWithIztro(birthData) {
        try {
            const { year, month, day, hour, gender } = birthData;
            
            // 构建日期字符串
            const dateStr = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
            
            // 转换性别格式 - iztro使用1表示男性,0表示女性
            const genderNum = gender === '男' ? 1 : 0;
            
            // 转换时辰 - iztro需要时辰索引(0-11),而非小时数(0-23)
            // 时辰对照: 子(23-1)=0, 丑(1-3)=1, 寅(3-5)=2, 卯(5-7)=3, 辰(7-9)=4, 巳(9-11)=5
            //          午(11-13)=6, 未(13-15)=7, 申(15-17)=8, 酉(17-19)=9, 戌(19-21)=10, 亥(21-23)=11
            console.log('🔍 [时辰转换调试] 原始hour值:', hour, '类型:', typeof hour);
            const hourNum = parseInt(hour);
            console.log('🔍 [时辰转换调试] 转换后hourNum:', hourNum);
            
            let timeNum;
            if (hourNum === 23) {
                timeNum = 0; // 子时(23:00-00:59)
                console.log('🔍 [时辰转换调试] 特殊处理23点 -> timeNum=0');
            } else {
                timeNum = Math.floor((hourNum + 1) / 2); // 将小时数转换为时辰索引
                console.log('🔍 [时辰转换调试] 计算公式: Math.floor((', hourNum, '+ 1) / 2) =', timeNum);
            }
            
            console.log('📊 [iztro调用参数]', {
                原始birthData: {
                    year: birthData.year,
                    month: birthData.month,
                    day: birthData.day,
                    hour: birthData.hour,
                    gender: birthData.gender
                },
                转换后参数: {
                    solarDate: dateStr,
                    time: timeNum,
                    gender: genderNum,
                    fixLeap: true
                }
            });
            
            // 使用iztro库计算星盘 - 使用正确的API
            console.log('🚀 [开始调用iztro.astrolabe]');
            const astrolabe = iztro.astrolabe({
                solarDate: dateStr,
                time: timeNum,
                gender: genderNum,
                fixLeap: true  // 修正闰月
            });
            
            console.log('✅ [iztro计算成功]', {
                命宫: astrolabe.palaces?.find(p => p.name === '命宫'),
                计算方法: 'iztro专业算法',
                时辰: astrolabe.time,
                时间范围: astrolabe.timeRange
            });
            
            // 解析星盘数据
            const result = this.parseAstrolabe(astrolabe);
            
            console.log('紫薇斗数计算完成:', result);
            return result;
            
        } catch (error) {
            console.error('❌ [iztro计算失败]');
            console.error('错误类型:', error.name);
            console.error('错误信息:', error.message);
            console.error('错误堆栈:', error.stack);
            console.error('失败时的参数:', {
                dateStr,
                timeNum,
                genderNum,
                birthData
            });
            console.warn('⚠️ 降级使用简化算法');
            return this.getFallbackResult(birthData);
        }
    }

    // 解析iztro星盘数据
    parseAstrolabe(astrolabe) {
        const palaces = [];
        
        // 遍历十二宫
        astrolabe.palaces.forEach((palace) => {
            const palaceData = {
                name: palace.name,
                earthlyBranch: palace.earthlyBranch,
                heavenlyStems: palace.heavenlyStems,
                majorStars: this.formatStars(palace.majorStars || []),
                minorStars: this.formatStars(palace.minorStars || []),
                adjectiveStars: this.formatStars(palace.adjectiveStars || []),
                changStars: this.formatStars(palace.changStars || []),
                decadal: palace.decadal || null,
                ages: palace.ages || []
            };
            palaces.push(palaceData);
        });

        return {
            palaces: palaces,
            solarDate: astrolabe.solarDate,
            lunarDate: astrolabe.lunarDate,
            chineseDate: astrolabe.chineseDate,
            time: astrolabe.time,
            timeRange: astrolabe.timeRange,
            sign: astrolabe.sign,
            zodiac: astrolabe.zodiac,
            earthlyBranchOfSoulPalace: astrolabe.earthlyBranchOfSoulPalace,
            earthlyBranchOfBodyPalace: astrolabe.earthlyBranchOfBodyPalace,
            soul: astrolabe.soul,
            body: astrolabe.body,
            fiveElementsClass: astrolabe.fiveElementsClass,
            calculationMethod: 'iztro'
        };
    }

    // 格式化星曜数据
    formatStars(stars) {
        if (!Array.isArray(stars)) return [];
        return stars.map(star => {
            if (typeof star === 'string') return star;
            if (star && star.name) return star.name;
            return star.toString();
        });
    }

    // 备用计算方法（当iztro库不可用时）
    getFallbackResult(birthData) {
        console.warn('⚠️ [降级警告] 使用简化紫薇斗数计算');
        console.warn('原因: iztro库调用失败或不可用');
        const { year, month, day, hour, gender } = birthData;
        
        // 简化的紫薇斗数信息
        const palaces = this.gongWei.map((name, index) => ({
            name: name,
            earthlyBranch: this.diZhi[index],
            heavenlyStems: '',
            majorStars: [],
            minorStars: [],
            adjectiveStars: [],
            changStars: [],
            decadal: null,
            ages: []
        }));

        return {
            palaces: palaces,
            solarDate: `${year}-${month}-${day}`,
            lunarDate: '农历信息需要专业库计算',
            chineseDate: '中文日期需要专业库计算',
            time: `${hour}时`,
            timeRange: `${hour}:00-${hour+1}:00`,
            sign: gender === '男' ? '乾' : '坤',
            zodiac: '生肖需要专业库计算',
            earthlyBranchOfSoulPalace: this.diZhi[0],
            earthlyBranchOfBodyPalace: this.diZhi[1],
            soul: '命宫',
            body: '身宫',
            fiveElementsClass: '五行需要专业库计算',
            calculationMethod: 'fallback',
            warning: '使用简化计算，建议加载iztro库获得准确结果'
        };
    }

    // 获取宫位简要信息
    getPalaceSummary(palace) {
        const majorStars = palace.majorStars || [];
        const minorStars = palace.minorStars || [];
        
        return {
            name: palace.name,
            earthlyBranch: palace.earthlyBranch,
            majorStars: majorStars.slice(0, 3), // 只显示前3个主星
            minorStars: minorStars.slice(0, 2), // 只显示前2个辅星
            hasImportantStars: majorStars.length > 0
        };
    }

    // 生成简要分析
    generateSummary(result) {
        if (!result || !result.palaces) {
            return '无法生成分析，请检查输入数据';
        }

        let summary = `紫薇斗数命盘分析（${result.calculationMethod === 'iztro' ? '专业版' : '简化版'}）\n\n`;
        
        // 找到命宫
        const soulPalace = result.palaces.find(p => 
            p.earthlyBranch === result.earthlyBranchOfSoulPalace
        );
        
        if (soulPalace) {
            summary += `命宫位于${soulPalace.earthlyBranch}宫\n`;
            if (soulPalace.majorStars.length > 0) {
                summary += `主星：${soulPalace.majorStars.join('、')}\n`;
            }
            if (soulPalace.minorStars.length > 0) {
                summary += `辅星：${soulPalace.minorStars.slice(0, 3).join('、')}\n`;
            }
        }

        // 找到身宫
        const bodyPalace = result.palaces.find(p => 
            p.earthlyBranch === result.earthlyBranchOfBodyPalace
        );
        
        if (bodyPalace && bodyPalace !== soulPalace) {
            summary += `\n身宫位于${bodyPalace.earthlyBranch}宫\n`;
            if (bodyPalace.majorStars.length > 0) {
                summary += `主星：${bodyPalace.majorStars.join('、')}\n`;
            }
        }

        if (result.fiveElementsClass) {
            summary += `\n五行局：${result.fiveElementsClass}\n`;
        }

        if (result.warning) {
            summary += `\n⚠️ ${result.warning}`;
        }

        return summary;
    }
}

// 导出模块
window.ZiweiCalculator = ZiweiCalculator;
