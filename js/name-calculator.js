// 赛博论命 - 起名计算模块

class NameCalculator {
    constructor() {
        // 五行属性字典（简化版）
        this.wuXingDict = {
            '木': ['甲', '乙', '寅', '卯', '东', '青', '春', '生', '长', '仁', '柔', '曲', '直'],
            '火': ['丙', '丁', '巳', '午', '南', '红', '夏', '热', '明', '礼', '急', '上', '炎'],
            '土': ['戊', '己', '辰', '戌', '丑', '未', '中', '黄', '季', '厚', '信', '重', '载'],
            '金': ['庚', '辛', '申', '酉', '西', '白', '秋', '凉', '收', '义', '刚', '锐', '利'],
            '水': ['壬', '癸', '亥', '子', '北', '黑', '冬', '寒', '藏', '智', '柔', '下', '润']
        };
        
        // 常用起名用字五行属性
        this.charWuXing = {
            // 木属性字
            '木': ['林', '森', '树', '枝', '叶', '花', '草', '竹', '松', '柏', '梅', '兰', '菊', '莲', '荷', '芳', '芬', '芸', '苗', '茂', '英', '华', '蓝', '绿', '青'],
            // 火属性字
            '火': ['火', '炎', '焰', '烈', '热', '暖', '阳', '光', '明', '亮', '辉', '灿', '烂', '红', '朱', '丹', '彤', '赤', '晨', '昊', '昕', '晓', '晖', '煌'],
            // 土属性字
            '土': ['土', '地', '山', '岩', '石', '岗', '峰', '岭', '坤', '培', '城', '堡', '墨', '黄', '棕', '褐', '厚', '重', '稳', '安', '宁', '静', '和', '平'],
            // 金属性字
            '金': ['金', '银', '铜', '铁', '钢', '锋', '利', '刀', '剑', '钟', '铃', '锦', '钰', '鑫', '白', '素', '洁', '净', '清', '爽', '刚', '强', '坚', '硬'],
            // 水属性字
            '水': ['水', '江', '河', '湖', '海', '波', '浪', '流', '溪', '泉', '雨', '雪', '冰', '霜', '露', '云', '雾', '黑', '蓝', '深', '润', '湿', '柔', '软']
        };
        
        // 三才配置吉凶表（简化版）
        this.sanCaiTable = {
            '111': '大吉', '112': '吉', '113': '凶', '121': '吉', '122': '大吉', '123': '吉',
            '131': '凶', '132': '吉', '133': '凶', '211': '吉', '212': '大吉', '213': '吉',
            '221': '大吉', '222': '吉', '223': '大吉', '231': '吉', '232': '大吉', '233': '吉',
            '311': '凶', '312': '吉', '313': '大吉', '321': '吉', '322': '大吉', '323': '大吉',
            '331': '大吉', '332': '大吉', '333': '大吉'
        };
        
        // 常用好字推荐
        this.goodChars = {
            '男': {
                '木': ['林', '森', '杰', '楠', '松', '柏', '梓', '桐', '栋', '彬'],
                '火': ['炎', '焱', '煜', '烨', '辉', '晖', '明', '昊', '晨', '旭'],
                '土': ['坤', '培', '城', '墨', '轩', '宇', '安', '宁', '稳', '厚'],
                '金': ['鑫', '锋', '钢', '铭', '锐', '钰', '刚', '强', '坚', '毅'],
                '水': ['江', '河', '海', '波', '涛', '润', '泽', '洋', '浩', '渊']
            },
            '女': {
                '木': ['林', '梅', '兰', '菊', '莲', '荷', '芳', '芬', '芸', '蕾'],
                '火': ['晨', '昕', '晓', '晖', '丹', '彤', '红', '朱', '灿', '烂'],
                '土': ['安', '宁', '静', '和', '平', '雅', '素', '纯', '真', '美'],
                '金': ['银', '钰', '锦', '白', '素', '洁', '净', '清', '爽', '雪'],
                '水': ['雨', '雪', '露', '云', '雾', '润', '湿', '柔', '软', '清']
            }
        };
    }

    // 计算字的笔画数（简化版）
    getCharStrokes(char) {
        // 这里应该有完整的汉字笔画数据库
        // 简化版本，返回随机笔画数用于演示
        const commonStrokes = {
            '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
            '王': 4, '李': 7, '张': 11, '刘': 15, '陈': 16, '杨': 13, '赵': 14, '黄': 12, '周': 8, '吴': 7,
            '林': 8, '森': 12, '杰': 12, '楠': 13, '松': 8, '柏': 9, '梓': 11, '桐': 10, '栋': 12, '彬': 11,
            '炎': 8, '焱': 12, '煜': 13, '烨': 16, '辉': 15, '晖': 13, '明': 8, '昊': 8, '晨': 11, '旭': 6,
            '坤': 8, '培': 11, '城': 10, '墨': 15, '轩': 10, '宇': 6, '安': 6, '宁': 14, '稳': 19, '厚': 9,
            '鑫': 24, '锋': 15, '钢': 16, '铭': 14, '锐': 15, '钰': 13, '刚': 10, '强': 12, '坚': 11, '毅': 15,
            '江': 7, '河': 9, '海': 11, '波': 9, '涛': 18, '润': 16, '泽': 17, '洋': 10, '浩': 11, '渊': 12
        };
        
        return commonStrokes[char] || Math.floor(Math.random() * 20) + 1;
    }

    // 计算五格数理
    calculateWuGe(surname, firstName) {
        const surnameStrokes = surname.split('').reduce((sum, char) => sum + this.getCharStrokes(char), 0);
        const firstNameStrokes = firstName.split('').reduce((sum, char) => sum + this.getCharStrokes(char), 0);
        
        // 天格：姓氏笔画数 + 1（单姓）
        const tianGe = surnameStrokes + 1;
        
        // 人格：姓氏最后一字 + 名字第一字
        const renGe = surnameStrokes + this.getCharStrokes(firstName[0]);
        
        // 地格：名字笔画数之和
        const diGe = firstNameStrokes;
        
        // 外格：总格 - 人格 + 1
        const zongGe = surnameStrokes + firstNameStrokes;
        const waiGe = zongGe - renGe + 1;
        
        return {
            tianGe,
            renGe,
            diGe,
            waiGe,
            zongGe
        };
    }

    // 计算三才配置
    calculateSanCai(wuGe) {
        const { tianGe, renGe, diGe } = wuGe;
        
        // 将数字转换为五行
        const getWuXingFromNumber = (num) => {
            const remainder = num % 10;
            if (remainder === 1 || remainder === 2) return '木';
            if (remainder === 3 || remainder === 4) return '火';
            if (remainder === 5 || remainder === 6) return '土';
            if (remainder === 7 || remainder === 8) return '金';
            if (remainder === 9 || remainder === 0) return '水';
            return '木';
        };
        
        const tianWuXing = getWuXingFromNumber(tianGe);
        const renWuXing = getWuXingFromNumber(renGe);
        const diWuXing = getWuXingFromNumber(diGe);
        
        // 转换为数字编码
        const wuXingToNum = { '木': 1, '火': 2, '土': 3, '金': 4, '水': 5 };
        const sanCaiCode = `${wuXingToNum[tianWuXing]}${wuXingToNum[renWuXing]}${wuXingToNum[diWuXing]}`;
        
        return {
            tianWuXing,
            renWuXing,
            diWuXing,
            sanCaiCode,
            jiXiong: this.sanCaiTable[sanCaiCode] || '中等'
        };
    }

    // 分析八字五行需求
    analyzeBaziWuXing(baziResult) {
        // 获取八字中的五行分布
        const wuxingCount = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };

        // 统计八字中各五行的数量
        if (baziResult.wuxingInfo) {
            ['year', 'month', 'day', 'hour'].forEach(pillar => {
                const pillarInfo = baziResult.wuxingInfo[pillar];
                if (pillarInfo) {
                    wuxingCount[pillarInfo.tianGan]++;
                    wuxingCount[pillarInfo.diZhi]++;
                }
            });
        } else {
            // 备用方法：直接从四柱字符串分析
            const pillars = [baziResult.yearPillar, baziResult.monthPillar, baziResult.dayPillar, baziResult.hourPillar];
            pillars.forEach(pillar => {
                if (pillar && pillar.length === 2) {
                    const tianGan = pillar[0];
                    const diZhi = pillar[1];
                    const tianGanWuXing = this.getCharWuXingFromTianGan(tianGan);
                    const diZhiWuXing = this.getCharWuXingFromDiZhi(diZhi);
                    if (tianGanWuXing) wuxingCount[tianGanWuXing]++;
                    if (diZhiWuXing) wuxingCount[diZhiWuXing]++;
                }
            });
        }

        // 找出最弱的五行（需要补充的）
        const dayTianGan = baziResult.dayTianGan;
        const dayWuXing = this.getCharWuXingFromTianGan(dayTianGan);

        // 分析五行强弱，确定需要补充的五行
        const neededWuXing = [];

        // 1. 如果日元五行偏弱，优先补充日元五行和生日元的五行
        const dayWuXingCount = wuxingCount[dayWuXing] || 0;
        if (dayWuXingCount <= 2) {
            neededWuXing.push(dayWuXing); // 补充日元五行
            const generateDayWuXing = this.getGenerateWuXing(dayWuXing);
            if (generateDayWuXing) {
                neededWuXing.push(generateDayWuXing); // 补充生日元的五行
            }
        }

        // 2. 找出八字中最缺的五行
        const sortedWuXing = Object.entries(wuxingCount)
            .sort((a, b) => a[1] - b[1])
            .map(item => item[0]);

        // 添加最缺的1-2个五行
        sortedWuXing.slice(0, 2).forEach(wuXing => {
            if (!neededWuXing.includes(wuXing)) {
                neededWuXing.push(wuXing);
            }
        });

        // 确保至少返回两个五行
        if (neededWuXing.length === 0) {
            return [dayWuXing, this.getGenerateWuXing(dayWuXing) || '木'];
        } else if (neededWuXing.length === 1) {
            const generateWuXing = this.getGenerateWuXing(neededWuXing[0]);
            if (generateWuXing && !neededWuXing.includes(generateWuXing)) {
                neededWuXing.push(generateWuXing);
            } else {
                neededWuXing.push(sortedWuXing[0]);
            }
        }

        return neededWuXing.slice(0, 3); // 最多返回3个五行
    }

    // 获取天干对应的五行
    getCharWuXingFromTianGan(tianGan) {
        const tianGanWuXing = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
        };
        return tianGanWuXing[tianGan];
    }

    // 获取地支对应的五行
    getCharWuXingFromDiZhi(diZhi) {
        const diZhiWuXing = {
            '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
            '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
            '戌': '土', '亥': '水'
        };
        return diZhiWuXing[diZhi];
    }

    // 获取生某五行的五行
    getGenerateWuXing(wuXing) {
        const generateMap = {
            '木': '水', // 水生木
            '火': '木', // 木生火
            '土': '火', // 火生土
            '金': '土', // 土生金
            '水': '金'  // 金生水
        };
        return generateMap[wuXing];
    }

    // 生成名字建议
    generateNameSuggestions(surname, gender, baziResult, customConfig = {}) {
        const neededWuXing = this.analyzeBaziWuXing(baziResult);
        const suggestions = [];

        const { firstChar, secondChar, candidateChars = [] } = customConfig;

        // 获取适合的字
        const getGoodChars = (wuXing) => {
            const genderChars = this.goodChars[gender] || this.goodChars['男'];
            const wuXingChars = genderChars[wuXing] || [];
            // 如果有候选字库，优先使用候选字中符合五行的字
            const candidateWuXingChars = candidateChars.filter(char => this.isCharWuXing(char, wuXing));
            if (candidateWuXingChars.length > 0) {
                return [...candidateWuXingChars, ...wuXingChars.slice(0, 3)];
            }
            return wuXingChars;
        };

        // 生成自定义字组合
        const getCustomCombinations = () => {
            const customSuggestions = [];

            // 情况1：指定了第一个字
            if (firstChar) {
                const firstCharWuXing = this.getCharWuXing(firstChar);

                // 如果也指定了第二个字
                if (secondChar) {
                    const secondCharWuXing = this.getCharWuXing(secondChar);
                    const firstName = firstChar + secondChar;
                    const fullName = surname + firstName;

                    const wuGe = this.calculateWuGe(surname, firstName);
                    const sanCai = this.calculateSanCai(wuGe);
                    const score = this.calculateNameScore(wuGe, sanCai);

                    customSuggestions.push({
                        fullName,
                        firstName,
                        wuGe,
                        sanCai,
                        score: score + 10, // 完全指定字加更多分
                        wuXingMatch: [firstCharWuXing, secondCharWuXing],
                        isCustom: true,
                        customType: '完全指定'
                    });
                } else {
                    // 只指定第一个字，第二个字从候选字库或系统推荐中选择
                    const secondChars = candidateChars.length > 0 ? candidateChars : [];
                    if (secondChars.length === 0) {
                        // 如果没有候选字，从需要的五行中选择
                        neededWuXing.forEach(wuXing => {
                            const chars = getGoodChars(wuXing);
                            secondChars.push(...chars.slice(0, 3));
                        });
                    }

                    secondChars.forEach(char => {
                        const secondCharWuXing = this.getCharWuXing(char);
                        const firstName = firstChar + char;
                        const fullName = surname + firstName;

                        const wuGe = this.calculateWuGe(surname, firstName);
                        const sanCai = this.calculateSanCai(wuGe);
                        const score = this.calculateNameScore(wuGe, sanCai);

                        customSuggestions.push({
                            fullName,
                            firstName,
                            wuGe,
                            sanCai,
                            score: score + 8, // 指定第一个字加分
                            wuXingMatch: [firstCharWuXing, secondCharWuXing],
                            isCustom: true,
                            customType: '指定首字'
                        });
                    });
                }
            }
            // 情况2：只指定了第二个字
            else if (secondChar) {
                const secondCharWuXing = this.getCharWuXing(secondChar);
                const firstChars = candidateChars.length > 0 ? candidateChars : [];
                if (firstChars.length === 0) {
                    // 如果没有候选字，从需要的五行中选择
                    neededWuXing.forEach(wuXing => {
                        const chars = getGoodChars(wuXing);
                        firstChars.push(...chars.slice(0, 3));
                    });
                }

                firstChars.forEach(char => {
                    const firstCharWuXing = this.getCharWuXing(char);
                    const firstName = char + secondChar;
                    const fullName = surname + firstName;

                    const wuGe = this.calculateWuGe(surname, firstName);
                    const sanCai = this.calculateSanCai(wuGe);
                    const score = this.calculateNameScore(wuGe, sanCai);

                    customSuggestions.push({
                        fullName,
                        firstName,
                        wuGe,
                        sanCai,
                        score: score + 8, // 指定第二个字加分
                        wuXingMatch: [firstCharWuXing, secondCharWuXing],
                        isCustom: true,
                        customType: '指定末字'
                    });
                });
            }
            // 情况3：只有候选字库，生成候选字的组合
            else if (candidateChars.length >= 2) {
                for (let i = 0; i < candidateChars.length; i++) {
                    for (let j = 0; j < candidateChars.length; j++) {
                        if (i !== j) {
                            const char1 = candidateChars[i];
                            const char2 = candidateChars[j];
                            const firstName = char1 + char2;
                            const fullName = surname + firstName;

                            const wuGe = this.calculateWuGe(surname, firstName);
                            const sanCai = this.calculateSanCai(wuGe);
                            const score = this.calculateNameScore(wuGe, sanCai);

                            const char1WuXing = this.getCharWuXing(char1);
                            const char2WuXing = this.getCharWuXing(char2);

                            customSuggestions.push({
                                fullName,
                                firstName,
                                wuGe,
                                sanCai,
                                score: score + 5, // 候选字组合加分
                                wuXingMatch: [char1WuXing, char2WuXing],
                                isCustom: true,
                                customType: '候选字组合'
                            });
                        }
                    }
                }
            }

            return customSuggestions;
        };
        
        // 首先添加自定义字组合
        const customSuggestions = getCustomCombinations();
        suggestions.push(...customSuggestions);

        // 如果自定义建议不足10个，继续生成基于五行需求的建议
        if (suggestions.length < 10) {
            neededWuXing.forEach(wuXing1 => {
                neededWuXing.forEach(wuXing2 => {
                    const chars1 = getGoodChars(wuXing1);
                    const chars2 = getGoodChars(wuXing2);

                    for (let i = 0; i < Math.min(3, chars1.length); i++) {
                        for (let j = 0; j < Math.min(3, chars2.length); j++) {
                            const firstName = chars1[i] + chars2[j];
                            const fullName = surname + firstName;

                            // 避免重复（如果已经在自定义建议中）
                            if (suggestions.some(s => s.fullName === fullName)) {
                                continue;
                            }

                            const wuGe = this.calculateWuGe(surname, firstName);
                            const sanCai = this.calculateSanCai(wuGe);
                            const score = this.calculateNameScore(wuGe, sanCai);

                            suggestions.push({
                                fullName,
                                firstName,
                                wuGe,
                                sanCai,
                                score,
                                wuXingMatch: [wuXing1, wuXing2],
                                isCustom: false,
                                customType: '系统推荐'
                            });
                        }
                    }
                });
            });
        }

        // 按分数排序，自定义字优先，然后返回前10个
        return suggestions
            .sort((a, b) => {
                // 自定义字优先
                if (a.isCustom && !b.isCustom) return -1;
                if (!a.isCustom && b.isCustom) return 1;
                // 在自定义字中，完全指定的优先
                if (a.isCustom && b.isCustom) {
                    const priority = { '完全指定': 3, '指定首字': 2, '指定末字': 2, '候选字组合': 1 };
                    const aPriority = priority[a.customType] || 0;
                    const bPriority = priority[b.customType] || 0;
                    if (aPriority !== bPriority) return bPriority - aPriority;
                }
                // 分数排序
                return b.score - a.score;
            })
            .slice(0, 10);
    }

    // 判断字的五行属性
    isCharWuXing(char, wuXing) {
        return this.charWuXing[wuXing] && this.charWuXing[wuXing].includes(char);
    }

    // 获取单个字的五行属性
    getCharWuXing(char) {
        for (const [wuXing, chars] of Object.entries(this.charWuXing)) {
            if (chars.includes(char)) {
                return wuXing;
            }
        }
        // 如果找不到，根据字的笔画数推算五行
        const strokes = this.getCharStrokes(char);
        const wuXingByStrokes = ['木', '火', '土', '金', '水'];
        return wuXingByStrokes[strokes % 5];
    }

    // 计算姓名总分
    calculateNameScore(wuGe, sanCai) {
        let score = 60; // 基础分
        
        // 五格评分
        Object.values(wuGe).forEach(ge => {
            if (ge % 2 === 1) score += 2; // 奇数加分
            if (ge > 10 && ge < 30) score += 3; // 适中笔画加分
        });
        
        // 三才配置评分
        switch (sanCai.jiXiong) {
            case '大吉': score += 20; break;
            case '吉': score += 10; break;
            case '中等': score += 5; break;
            case '凶': score -= 10; break;
        }
        
        return Math.min(100, Math.max(0, score));
    }

    // 分析现有姓名
    analyzeName(fullName, baziResult) {
        if (fullName.length < 2) {
            throw new Error('姓名长度不足');
        }
        
        const surname = fullName[0];
        const firstName = fullName.slice(1);
        
        const wuGe = this.calculateWuGe(surname, firstName);
        const sanCai = this.calculateSanCai(wuGe);
        const score = this.calculateNameScore(wuGe, sanCai);
        
        // 分析五行匹配度
        const neededWuXing = this.analyzeBaziWuXing(baziResult);
        const nameWuXing = this.getNameWuXing(firstName);
        const wuXingMatch = this.calculateWuXingMatch(neededWuXing, nameWuXing);
        
        return {
            fullName,
            surname,
            firstName,
            wuGe,
            sanCai,
            score,
            neededWuXing,
            nameWuXing,
            wuXingMatch,
            analysis: this.generateNameAnalysis(wuGe, sanCai, score, wuXingMatch)
        };
    }

    // 获取姓名的五行属性
    getNameWuXing(firstName) {
        const wuXingCount = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
        
        firstName.split('').forEach(char => {
            Object.keys(this.charWuXing).forEach(wuXing => {
                if (this.charWuXing[wuXing].includes(char)) {
                    wuXingCount[wuXing]++;
                }
            });
        });
        
        return wuXingCount;
    }

    // 计算五行匹配度
    calculateWuXingMatch(needed, actual) {
        let matchScore = 0;
        needed.forEach(wuXing => {
            if (actual[wuXing] > 0) {
                matchScore += 20;
            }
        });
        return Math.min(100, matchScore);
    }

    // 生成姓名分析报告
    generateNameAnalysis(wuGe, sanCai, score, wuXingMatch) {
        let analysis = `姓名综合评分：${score}分\n\n`;
        
        analysis += `五格数理：\n`;
        analysis += `天格：${wuGe.tianGe} 人格：${wuGe.renGe} 地格：${wuGe.diGe}\n`;
        analysis += `外格：${wuGe.waiGe} 总格：${wuGe.zongGe}\n\n`;
        
        analysis += `三才配置：${sanCai.tianWuXing}${sanCai.renWuXing}${sanCai.diWuXing} (${sanCai.jiXiong})\n\n`;
        
        analysis += `五行匹配度：${wuXingMatch}分\n\n`;
        
        if (score >= 90) {
            analysis += `评价：优秀的姓名，各方面都很协调。`;
        } else if (score >= 80) {
            analysis += `评价：良好的姓名，大部分方面都不错。`;
        } else if (score >= 70) {
            analysis += `评价：一般的姓名，有改进空间。`;
        } else {
            analysis += `评价：建议考虑改名或调整。`;
        }
        
        return analysis;
    }

    // 生成AI起名分析提示词
    generateAINamingPrompt(birthData, baziResult, nameSuggestions, customConfig = {}) {
        const { gender, surname, year, month, day, hour, birthProvince, birthCity } = birthData;
        const { yearPillar, monthPillar, dayPillar, hourPillar, yearTenGod, monthTenGod, hourTenGod, dayMaster } = baziResult;
        const { firstChar, secondChar, candidateChars = [] } = customConfig;

        let prompt = "";
        prompt += `你是一位精通中国传统姓名学和现代起名理论的专家，擅长结合八字命理、五格数理、三才配置、字义内涵、音韵美学等多个维度进行综合起名分析。\n\n`;

        prompt += `你具备深厚的古典文学功底，熟悉《诗经》、《楚辞》、《论语》、《孟子》、《唐诗三百首》、《宋词》、《元曲》等经典文献，能够准确分析汉字的本义、引申义、文化内涵和诗词出处。你善于从古典诗词中寻找美好的字词寓意，为起名提供深厚的文化底蕴。\n\n`;

        prompt += `请运用你的推理能力，逐步分析每个候选姓名的各个维度。特别是在分析字义内涵时，请深入挖掘每个字的文化内涵和诗词典故，尽可能找出其在古典诗词中的具体出处和美好寓意。例如："明"字出自《诗经·大雅·烝民》"既明且哲，以保其身"，寓意聪明睿智。\n\n`;

        prompt += `现在需要你为一位求名者进行专业的起名分析和建议。请你运用你的专业知识，对候选姓名进行全面评估，并给出详细的分析和改进建议。\n\n`;

        // 基本信息
        prompt += `求名者基本信息：\n`;
        prompt += `姓氏：${surname}\n`;
        prompt += `性别：${gender}\n`;
        prompt += `出生时间：${year}年${month}月${day}日${hour}时\n`;
        prompt += `出生地区：${birthProvince || '未知'} ${birthCity || '未知'}\n\n`;

        // 八字信息
        prompt += `生辰八字：\n`;
        prompt += `年柱：${yearPillar} (${yearTenGod})\n`;
        prompt += `月柱：${monthPillar} (${monthTenGod})\n`;
        prompt += `日柱：${dayPillar} (日主：${baziResult.dayTianGan})\n`;
        prompt += `时柱：${hourPillar} (${hourTenGod})\n\n`;

        // 五行分析
        const neededWuXing = this.analyzeBaziWuXing(baziResult);
        prompt += `八字五行分析：\n`;
        prompt += `需要补充的五行：${neededWuXing.join('、')}\n`;
        prompt += `五行强弱分析：请根据八字分析五行的旺衰情况\n\n`;

        // 自定义字配置
        if (firstChar || secondChar || candidateChars.length > 0) {
            prompt += `自定义用字要求：\n`;
            if (firstChar) {
                prompt += `指定第一个字（辈分字）：${firstChar}\n`;
                prompt += `说明：这是家族辈分字，必须固定在第一个位置\n`;
            }
            if (secondChar) {
                prompt += `指定第二个字：${secondChar}\n`;
                prompt += `说明：这个字必须固定在第二个位置\n`;
            }
            if (candidateChars.length > 0) {
                prompt += `候选字库：${candidateChars.join('、')}\n`;
                prompt += `说明：请优先从这些候选字中选择搭配\n`;
            }
            prompt += `请特别关注自定义字的使用，分析其五行属性、字义内涵和与八字的匹配度\n\n`;
        }

        return prompt;
    }

    // 生成候选姓名分析部分的提示词
    generateCandidateAnalysisPrompt(nameSuggestions) {
        let prompt = `候选姓名分析：\n`;
        prompt += `以下是基于传统算法生成的${nameSuggestions.length}个候选姓名，请对每个姓名进行详细分析：\n\n`;

        nameSuggestions.forEach((suggestion, index) => {
            const { fullName, wuGe, sanCai, score, wuXingMatch, firstName } = suggestion;
            prompt += `${index + 1}. ${fullName}\n`;
            prompt += `   传统评分：${score}分\n`;
            prompt += `   五格数理：天格${wuGe.tianGe} 人格${wuGe.renGe} 地格${wuGe.diGe} 外格${wuGe.waiGe} 总格${wuGe.zongGe}\n`;
            prompt += `   三才配置：${sanCai.tianWuXing}${sanCai.renWuXing}${sanCai.diWuXing} (${sanCai.jiXiong})\n`;
            prompt += `   五行匹配：${wuXingMatch.join('、')}\n`;

            // 添加字义分析要求
            if (firstName && firstName.length >= 1) {
                prompt += `   请重点分析：\n`;
                for (let i = 0; i < firstName.length; i++) {
                    const char = firstName[i];
                    prompt += `   - "${char}"字的含义、出处和文化内涵\n`;
                }
            }
            prompt += `\n`;
        });

        return prompt;
    }

    // 生成分析要求部分的提示词
    generateAnalysisRequirementsPrompt() {
        let prompt = `请你从以下维度对每个候选姓名进行专业分析：\n\n`;
        prompt += `1. **八字匹配度分析**：\n`;
        prompt += `   - 姓名五行是否能有效补充八字所需\n`;
        prompt += `   - 与日主的生克关系是否和谐\n`;
        prompt += `   - 对命主运势的影响\n\n`;

        prompt += `2. **五格数理评估**：\n`;
        prompt += `   - 各格数理的吉凶分析\n`;
        prompt += `   - 数理对性格、事业、健康、感情的影响\n`;
        prompt += `   - 三才配置的具体含义\n\n`;

        prompt += `3. **字义内涵分析**：\n`;
        prompt += `   - 每个字的本义、引申义和文化内涵\n`;
        prompt += `   - 字的诗词出处和典故来源（如引用了哪句古诗词的哪个字）\n`;
        prompt += `   - 字与字之间的搭配是否和谐\n`;
        prompt += `   - 整体寓意是否积极向上\n`;
        prompt += `   - 是否体现了深厚的文化底蕴\n\n`;

        prompt += `4. **音韵美学评价**：\n`;
        prompt += `   - 声调搭配是否优美\n`;
        prompt += `   - 是否朗朗上口\n`;
        prompt += `   - 避免谐音歧义\n\n`;

        prompt += `5. **文化内涵考量**：\n`;
        prompt += `   - 是否符合传统文化审美\n`;
        prompt += `   - 时代特色和现代感\n`;
        prompt += `   - 性别特征是否明显\n\n`;

        prompt += `6. **实用性考虑**：\n`;
        prompt += `   - 书写是否简便\n`;
        prompt += `   - 是否容易被误读误写\n`;
        prompt += `   - 在现代社会的适用性\n\n`;

        return prompt;
    }

    // 生成输出格式要求的提示词
    generateOutputFormatPrompt() {
        let prompt = `请按以下格式输出分析结果：\n\n`;
        prompt += `## 八字五行分析\n`;
        prompt += `[详细分析八字五行的旺衰情况和需要补充的五行]\n\n`;

        prompt += `## 候选姓名详细分析\n`;
        prompt += `### 1. [姓名] - AI综合评分：[分数]/100\n`;
        prompt += `**八字匹配度**：[分析内容]\n`;
        prompt += `**五格数理**：[分析内容]\n`;
        prompt += `**字义内涵**：\n`;
        prompt += `- [第一个字]：字义、出处典故、文化内涵\n`;
        prompt += `- [第二个字]：字义、出处典故、文化内涵\n`;
        prompt += `- 整体寓意和字词搭配分析\n`;
        prompt += `**音韵美学**：[分析内容]\n`;
        prompt += `**综合评价**：[总体评价和建议]\n\n`;
        prompt += `[对其他候选姓名进行同样格式的分析]\n\n`;

        prompt += `## 最终推荐\n`;
        prompt += `**最推荐的姓名**：[姓名]\n`;
        prompt += `**推荐理由**：[详细说明为什么推荐这个姓名]\n\n`;

        prompt += `## 起名建议\n`;
        prompt += `**改进方向**：[如果需要重新起名，应该注意哪些方面]\n`;
        prompt += `**用字建议**：[推荐使用哪些字，避免哪些字]\n`;
        prompt += `**其他建议**：[其他有价值的起名建议]\n\n`;

        prompt += `请确保分析专业、详细、实用，既要体现传统姓名学的深度，也要结合现代起名的实际需求。`;

        return prompt;
    }

    // 生成完整的AI起名分析提示词
    generateCompleteAINamingPrompt(birthData, baziResult, nameSuggestions, customChars = []) {
        let fullPrompt = this.generateAINamingPrompt(birthData, baziResult, nameSuggestions, customChars);
        fullPrompt += this.generateCandidateAnalysisPrompt(nameSuggestions);
        fullPrompt += this.generateAnalysisRequirementsPrompt();
        fullPrompt += this.generateOutputFormatPrompt();

        return fullPrompt;
    }
}

// 导出模块
window.NameCalculator = NameCalculator;
