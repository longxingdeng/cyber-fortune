// 赛博论命 - 合婚计算模块

class MarriageCalculator {
    constructor() {
        // 生肖配对表
        this.shengXiaoMatch = {
            '鼠': { '龙': 90, '猴': 85, '牛': 80, '鼠': 70, '猪': 75, '鸡': 60, '兔': 50, '羊': 45, '马': 40 },
            '牛': { '蛇': 90, '鸡': 85, '鼠': 80, '牛': 70, '猪': 65, '龙': 60, '羊': 50, '狗': 45, '马': 40 },
            '虎': { '马': 90, '狗': 85, '猪': 80, '龙': 75, '鸡': 70, '牛': 60, '蛇': 50, '猴': 40 },
            '兔': { '羊': 90, '猪': 85, '狗': 80, '虎': 75, '龙': 70, '蛇': 65, '马': 60, '鸡': 50, '鼠': 45 },
            '龙': { '鸡': 90, '鼠': 85, '猴': 80, '虎': 75, '兔': 70, '蛇': 65, '牛': 60, '狗': 40 },
            '蛇': { '牛': 90, '鸡': 85, '龙': 80, '猴': 75, '鼠': 70, '兔': 65, '马': 60, '虎': 50, '猪': 40 },
            '马': { '虎': 90, '狗': 85, '羊': 80, '龙': 75, '蛇': 70, '猴': 65, '兔': 60, '牛': 50, '鼠': 40 },
            '羊': { '兔': 90, '猪': 85, '马': 80, '猴': 75, '鸡': 70, '龙': 65, '蛇': 60, '虎': 55, '牛': 50 },
            '猴': { '龙': 90, '鼠': 85, '蛇': 80, '羊': 75, '马': 70, '兔': 65, '牛': 60, '虎': 50, '猪': 45 },
            '鸡': { '蛇': 90, '牛': 85, '龙': 80, '羊': 75, '猴': 70, '马': 65, '虎': 60, '兔': 50, '狗': 40 },
            '狗': { '马': 90, '虎': 85, '兔': 80, '猪': 75, '蛇': 70, '鸡': 65, '羊': 60, '龙': 50, '牛': 40 },
            '猪': { '羊': 90, '兔': 85, '虎': 80, '狗': 75, '鼠': 70, '龙': 65, '马': 60, '蛇': 55, '猴': 50 }
        };
        
        // 五行相生相克
        this.wuXingRelation = {
            '木': { '生': '火', '克': '土', '被生': '水', '被克': '金' },
            '火': { '生': '土', '克': '金', '被生': '木', '被克': '水' },
            '土': { '生': '金', '克': '水', '被生': '火', '被克': '木' },
            '金': { '生': '水', '克': '木', '被生': '土', '被克': '火' },
            '水': { '生': '木', '克': '火', '被生': '金', '被克': '土' }
        };
        
        // 纳音五行表（简化版）
        this.naYin = {
            '甲子': '海中金', '乙丑': '海中金', '丙寅': '炉中火', '丁卯': '炉中火',
            '戊辰': '大林木', '己巳': '大林木', '庚午': '路旁土', '辛未': '路旁土',
            '壬申': '剑锋金', '癸酉': '剑锋金', '甲戌': '山头火', '乙亥': '山头火'
        };
        
        // 十神关系评分
        this.shiShenMatch = {
            '比肩': { '比肩': 80, '劫财': 75, '食神': 85, '伤官': 70, '偏财': 90, '正财': 85, '七杀': 60, '正官': 70, '偏印': 65, '正印': 75 },
            '劫财': { '比肩': 75, '劫财': 70, '食神': 80, '伤官': 85, '偏财': 85, '正财': 90, '七杀': 70, '正官': 60, '偏印': 75, '正印': 65 },
            '食神': { '比肩': 85, '劫财': 80, '食神': 75, '伤官': 70, '偏财': 95, '正财': 90, '七杀': 50, '正官': 60, '偏印': 40, '正印': 45 },
            '伤官': { '比肩': 70, '劫财': 85, '食神': 70, '伤官': 75, '偏财': 90, '正财': 95, '七杀': 60, '正官': 50, '偏印': 45, '正印': 40 }
        };
    }

    // 获取生肖
    getShengXiao(year) {
        const shengXiaoList = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
        const baseYear = 1984; // 甲子年，鼠年
        const index = (year - baseYear) % 12;
        return shengXiaoList[index >= 0 ? index : index + 12];
    }

    // 计算生肖配对分数
    calculateShengXiaoMatch(year1, year2) {
        const shengXiao1 = this.getShengXiao(year1);
        const shengXiao2 = this.getShengXiao(year2);
        
        const score1 = this.shengXiaoMatch[shengXiao1]?.[shengXiao2] || 60;
        const score2 = this.shengXiaoMatch[shengXiao2]?.[shengXiao1] || 60;
        
        return {
            shengXiao1,
            shengXiao2,
            score: Math.round((score1 + score2) / 2),
            analysis: this.getShengXiaoAnalysis(shengXiao1, shengXiao2, Math.round((score1 + score2) / 2))
        };
    }

    // 生肖配对分析
    getShengXiaoAnalysis(sx1, sx2, score) {
        if (score >= 85) {
            return `${sx1}与${sx2}是天作之合，性格互补，感情深厚，婚姻美满。`;
        } else if (score >= 75) {
            return `${sx1}与${sx2}配对良好，相处和谐，能够相互理解支持。`;
        } else if (score >= 65) {
            return `${sx1}与${sx2}配对一般，需要多沟通理解，用心经营感情。`;
        } else if (score >= 55) {
            return `${sx1}与${sx2}配对较差，性格差异较大，需要更多包容和理解。`;
        } else {
            return `${sx1}与${sx2}配对困难，性格冲突较多，需要慎重考虑。`;
        }
    }

    // 计算八字五行配对
    calculateWuXingMatch(bazi1, bazi2) {
        // 提取日元五行
        const dayGan1 = bazi1.dayPillar[0];
        const dayGan2 = bazi2.dayPillar[0];
        
        const wuXing1 = this.getGanWuXing(dayGan1);
        const wuXing2 = this.getGanWuXing(dayGan2);
        
        let score = 60;
        let relation = '平和';
        
        // 判断五行关系
        if (this.wuXingRelation[wuXing1].生 === wuXing2) {
            score = 90;
            relation = `${wuXing1}生${wuXing2}，相生关系`;
        } else if (this.wuXingRelation[wuXing1].被生 === wuXing2) {
            score = 85;
            relation = `${wuXing2}生${wuXing1}，相生关系`;
        } else if (this.wuXingRelation[wuXing1].克 === wuXing2) {
            score = 40;
            relation = `${wuXing1}克${wuXing2}，相克关系`;
        } else if (this.wuXingRelation[wuXing1].被克 === wuXing2) {
            score = 45;
            relation = `${wuXing2}克${wuXing1}，相克关系`;
        } else if (wuXing1 === wuXing2) {
            score = 75;
            relation = `同为${wuXing1}，同类关系`;
        }
        
        return {
            wuXing1,
            wuXing2,
            score,
            relation,
            analysis: this.getWuXingAnalysis(relation, score)
        };
    }

    // 获取天干五行
    getGanWuXing(gan) {
        const ganWuXing = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
        };
        return ganWuXing[gan] || '木';
    }

    // 五行配对分析
    getWuXingAnalysis(relation, score) {
        if (score >= 85) {
            return `${relation}，五行相配，夫妻和睦，事业有成。`;
        } else if (score >= 70) {
            return `${relation}，五行较配，感情稳定，生活幸福。`;
        } else if (score >= 60) {
            return `${relation}，五行一般，需要相互调和，共同努力。`;
        } else {
            return `${relation}，五行不配，容易产生矛盾，需要化解。`;
        }
    }

    // 计算十神配对
    calculateShiShenMatch(bazi1, bazi2) {
        const dayGan1 = bazi1.dayPillar[0];
        const dayGan2 = bazi2.dayPillar[0];
        
        // 计算互相的十神关系
        const shiShen1to2 = this.calculateTenGods(dayGan1, dayGan2);
        const shiShen2to1 = this.calculateTenGods(dayGan2, dayGan1);
        
        const score1 = this.shiShenMatch[shiShen1to2]?.[shiShen2to1] || 60;
        const score2 = this.shiShenMatch[shiShen2to1]?.[shiShen1to2] || 60;
        
        const avgScore = Math.round((score1 + score2) / 2);
        
        return {
            shiShen1to2,
            shiShen2to1,
            score: avgScore,
            analysis: this.getShiShenAnalysis(shiShen1to2, shiShen2to1, avgScore)
        };
    }

    // 计算十神（简化版）
    calculateTenGods(dayGan, otherGan) {
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const dayIndex = tianGan.indexOf(dayGan);
        const otherIndex = tianGan.indexOf(otherGan);
        
        const diff = (otherIndex - dayIndex + 10) % 10;
        const dayYinYang = dayIndex % 2;
        const otherYinYang = otherIndex % 2;
        
        if (diff === 0) return '比肩';
        if (diff === 1) return dayYinYang === otherYinYang ? '劫财' : '比肩';
        if (diff === 2) return dayYinYang === otherYinYang ? '食神' : '伤官';
        if (diff === 3) return dayYinYang === otherYinYang ? '伤官' : '食神';
        if (diff === 4) return dayYinYang === otherYinYang ? '偏财' : '正财';
        if (diff === 5) return dayYinYang === otherYinYang ? '正财' : '偏财';
        if (diff === 6) return dayYinYang === otherYinYang ? '七杀' : '正官';
        if (diff === 7) return dayYinYang === otherYinYang ? '正官' : '七杀';
        if (diff === 8) return dayYinYang === otherYinYang ? '偏印' : '正印';
        if (diff === 9) return dayYinYang === otherYinYang ? '正印' : '偏印';
        
        return '比肩';
    }

    // 十神配对分析
    getShiShenAnalysis(ss1, ss2, score) {
        if (score >= 85) {
            return `${ss1}与${ss2}的组合非常和谐，夫妻恩爱，相互扶持。`;
        } else if (score >= 70) {
            return `${ss1}与${ss2}的组合较好，感情稳定，互相理解。`;
        } else if (score >= 60) {
            return `${ss1}与${ss2}的组合一般，需要多沟通，增进了解。`;
        } else {
            return `${ss1}与${ss2}的组合较差，容易产生分歧，需要包容。`;
        }
    }

    // 计算年龄差配对
    calculateAgeMatch(age1, age2) {
        const ageDiff = Math.abs(age1 - age2);
        let score = 80;
        let analysis = '';
        
        if (ageDiff <= 3) {
            score = 90;
            analysis = '年龄相近，共同话题多，容易相互理解。';
        } else if (ageDiff <= 6) {
            score = 85;
            analysis = '年龄差适中，能够相互学习，感情稳定。';
        } else if (ageDiff <= 10) {
            score = 75;
            analysis = '年龄差较大，需要更多理解和包容。';
        } else {
            score = 60;
            analysis = '年龄差很大，需要克服代沟问题。';
        }
        
        return { score, analysis, ageDiff };
    }

    // 综合合婚分析
    calculateMarriageMatch(person1, person2) {
        const { birthData: bd1, baziResult: bz1, name: name1 } = person1;
        const { birthData: bd2, baziResult: bz2, name: name2 } = person2;
        
        // 计算各项配对分数
        const shengXiaoMatch = this.calculateShengXiaoMatch(bd1.year, bd2.year);
        const wuXingMatch = this.calculateWuXingMatch(bz1, bz2);
        const shiShenMatch = this.calculateShiShenMatch(bz1, bz2);
        
        const currentYear = new Date().getFullYear();
        const age1 = currentYear - bd1.year;
        const age2 = currentYear - bd2.year;
        const ageMatch = this.calculateAgeMatch(age1, age2);
        
        // 计算综合分数
        const totalScore = Math.round(
            (shengXiaoMatch.score * 0.3 + 
             wuXingMatch.score * 0.3 + 
             shiShenMatch.score * 0.25 + 
             ageMatch.score * 0.15)
        );
        
        // 生成建议
        const suggestions = this.generateMarriageSuggestions(totalScore, {
            shengXiaoMatch,
            wuXingMatch,
            shiShenMatch,
            ageMatch
        });
        
        return {
            person1: { name: name1, ...bd1 },
            person2: { name: name2, ...bd2 },
            shengXiaoMatch,
            wuXingMatch,
            shiShenMatch,
            ageMatch,
            totalScore,
            level: this.getMatchLevel(totalScore),
            suggestions,
            analysis: this.generateDetailedAnalysis(totalScore, {
                shengXiaoMatch,
                wuXingMatch,
                shiShenMatch,
                ageMatch
            })
        };
    }

    // 获取匹配等级
    getMatchLevel(score) {
        if (score >= 90) return '天作之合';
        if (score >= 80) return '非常匹配';
        if (score >= 70) return '比较匹配';
        if (score >= 60) return '一般匹配';
        if (score >= 50) return '需要努力';
        return '不太匹配';
    }

    // 生成改进建议
    generateMarriageSuggestions(totalScore, matches) {
        const suggestions = [];
        
        if (matches.shengXiaoMatch.score < 70) {
            suggestions.push('生肖配对分数较低，建议多了解对方性格特点，增进理解。');
        }
        
        if (matches.wuXingMatch.score < 70) {
            suggestions.push('五行配对需要调和，可通过风水布局或佩戴相应饰品来化解。');
        }
        
        if (matches.shiShenMatch.score < 70) {
            suggestions.push('十神关系需要改善，建议多沟通，培养共同兴趣爱好。');
        }
        
        if (matches.ageMatch.score < 70) {
            suggestions.push('年龄差异较大，需要更多耐心和理解，克服代沟问题。');
        }
        
        if (totalScore >= 80) {
            suggestions.push('整体配对很好，继续保持良好的沟通和理解。');
        } else if (totalScore >= 60) {
            suggestions.push('配对有改善空间，建议多参加共同活动，增进感情。');
        } else {
            suggestions.push('配对存在较多问题，建议慎重考虑，或寻求专业指导。');
        }
        
        return suggestions;
    }

    // 生成详细分析
    generateDetailedAnalysis(totalScore, matches) {
        let analysis = `合婚综合评分：${totalScore}分 (${this.getMatchLevel(totalScore)})\n\n`;
        
        analysis += `生肖配对：${matches.shengXiaoMatch.score}分\n`;
        analysis += `${matches.shengXiaoMatch.analysis}\n\n`;
        
        analysis += `五行配对：${matches.wuXingMatch.score}分\n`;
        analysis += `${matches.wuXingMatch.analysis}\n\n`;
        
        analysis += `十神配对：${matches.shiShenMatch.score}分\n`;
        analysis += `${matches.shiShenMatch.analysis}\n\n`;
        
        analysis += `年龄配对：${matches.ageMatch.score}分\n`;
        analysis += `${matches.ageMatch.analysis}\n\n`;
        
        return analysis;
    }
}

// 导出模块
window.MarriageCalculator = MarriageCalculator;
