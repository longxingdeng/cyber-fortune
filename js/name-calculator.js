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
        // 这里应该结合八字分析结果
        // 简化版本，返回需要补充的五行
        const dayTianGan = baziResult.dayTianGan;
        
        // 根据日元判断需要的五行（简化逻辑）
        const wuXingNeeds = {
            '甲': ['水', '木'], '乙': ['水', '木'],
            '丙': ['木', '火'], '丁': ['木', '火'],
            '戊': ['火', '土'], '己': ['火', '土'],
            '庚': ['土', '金'], '辛': ['土', '金'],
            '壬': ['金', '水'], '癸': ['金', '水']
        };
        
        return wuXingNeeds[dayTianGan] || ['木', '火'];
    }

    // 生成名字建议
    generateNameSuggestions(surname, gender, baziResult, customChars = []) {
        const neededWuXing = this.analyzeBaziWuXing(baziResult);
        const suggestions = [];
        
        // 获取适合的字
        const getGoodChars = (wuXing) => {
            const genderChars = this.goodChars[gender] || this.goodChars['男'];
            const wuXingChars = genderChars[wuXing] || [];
            return [...wuXingChars, ...customChars.filter(char => this.isCharWuXing(char, wuXing))];
        };
        
        // 生成双字名
        neededWuXing.forEach(wuXing1 => {
            neededWuXing.forEach(wuXing2 => {
                const chars1 = getGoodChars(wuXing1);
                const chars2 = getGoodChars(wuXing2);
                
                for (let i = 0; i < Math.min(3, chars1.length); i++) {
                    for (let j = 0; j < Math.min(3, chars2.length); j++) {
                        const firstName = chars1[i] + chars2[j];
                        const fullName = surname + firstName;
                        
                        const wuGe = this.calculateWuGe(surname, firstName);
                        const sanCai = this.calculateSanCai(wuGe);
                        const score = this.calculateNameScore(wuGe, sanCai);
                        
                        suggestions.push({
                            fullName,
                            firstName,
                            wuGe,
                            sanCai,
                            score,
                            wuXingMatch: [wuXing1, wuXing2]
                        });
                    }
                }
            });
        });
        
        // 按分数排序并返回前10个
        return suggestions
            .sort((a, b) => b.score - a.score)
            .slice(0, 10);
    }

    // 判断字的五行属性
    isCharWuXing(char, wuXing) {
        return this.charWuXing[wuXing] && this.charWuXing[wuXing].includes(char);
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
}

// 导出模块
window.NameCalculator = NameCalculator;
