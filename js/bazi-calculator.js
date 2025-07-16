// 赛博论命 - 八字计算核心模块

class BaziCalculator {
    constructor() {
        // 天干
        this.tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        
        // 地支
        this.diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        
        // 五行
        this.wuXing = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
            '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
            '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
            '戌': '土', '亥': '水'
        };
        
        // 十神
        this.shiShen = {
            '比肩': '比', '劫财': '劫', '食神': '食', '伤官': '伤',
            '偏财': '财', '正财': '才', '七杀': '杀', '正官': '官',
            '偏印': '枭', '正印': '印'
        };
        
        // 时辰对应表
        this.shiChen = {
            23: '子', 1: '丑', 3: '寅', 5: '卯', 7: '辰', 9: '巳',
            11: '午', 13: '未', 15: '申', 17: '酉', 19: '戌', 21: '亥'
        };
        
        // 节气表（简化版）
        this.jieQi = [
            { name: '立春', month: 2, day: 4 },
            { name: '惊蛰', month: 3, day: 6 },
            { name: '清明', month: 4, day: 5 },
            { name: '立夏', month: 5, day: 6 },
            { name: '芒种', month: 6, day: 6 },
            { name: '小暑', month: 7, day: 7 },
            { name: '立秋', month: 8, day: 8 },
            { name: '白露', month: 9, day: 8 },
            { name: '寒露', month: 10, day: 8 },
            { name: '立冬', month: 11, day: 8 },
            { name: '大雪', month: 12, day: 7 },
            { name: '小寒', month: 1, day: 6 }
        ];
    }

    // 计算年柱
    calculateYearPillar(year) {
        // 以1984年甲子年为基准
        const baseYear = 1984;
        const yearDiff = year - baseYear;
        
        const tianGanIndex = (yearDiff % 10 + 10) % 10;
        const diZhiIndex = (yearDiff % 12 + 12) % 12;
        
        return this.tianGan[tianGanIndex] + this.diZhi[diZhiIndex];
    }

    // 计算月柱
    calculateMonthPillar(year, month, day) {
        // 简化的月柱计算，实际应该考虑节气
        const yearTianGan = this.calculateYearPillar(year)[0];
        const yearTianGanIndex = this.tianGan.indexOf(yearTianGan);
        
        // 月柱天干起法：甲己之年丙作首
        const monthTianGanStart = {
            0: 2, 5: 2,  // 甲己年从丙开始
            1: 4, 6: 4,  // 乙庚年从戊开始
            2: 7, 7: 7,  // 丙辛年从庚开始
            3: 9, 8: 9,  // 丁壬年从壬开始
            4: 0, 9: 0   // 戊癸年从甲开始
        };
        
        const startIndex = monthTianGanStart[yearTianGanIndex];
        const monthTianGanIndex = (startIndex + month - 1) % 10;
        const monthDiZhiIndex = (month + 1) % 12; // 寅月为正月
        
        return this.tianGan[monthTianGanIndex] + this.diZhi[monthDiZhiIndex];
    }

    // 计算日柱（简化版）
    calculateDayPillar(year, month, day) {
        // 使用简化的日柱计算公式
        const totalDays = this.calculateTotalDays(year, month, day);
        const tianGanIndex = (totalDays - 1) % 10;
        const diZhiIndex = (totalDays - 1) % 12;
        
        return this.tianGan[tianGanIndex] + this.diZhi[diZhiIndex];
    }

    // 计算时柱
    calculateHourPillar(dayPillar, hour) {
        const dayTianGan = dayPillar[0];
        const dayTianGanIndex = this.tianGan.indexOf(dayTianGan);
        
        // 时柱天干起法
        const hourTianGanStart = {
            0: 0, 5: 0,  // 甲己日从甲开始
            1: 2, 6: 2,  // 乙庚日从丙开始
            2: 4, 7: 4,  // 丙辛日从戊开始
            3: 6, 8: 6,  // 丁壬日从庚开始
            4: 8, 9: 8   // 戊癸日从壬开始
        };
        
        // 获取时辰地支
        const hourDiZhi = this.getHourDiZhi(hour);
        const hourDiZhiIndex = this.diZhi.indexOf(hourDiZhi);
        
        const startIndex = hourTianGanStart[dayTianGanIndex];
        const hourTianGanIndex = (startIndex + hourDiZhiIndex) % 10;
        
        return this.tianGan[hourTianGanIndex] + hourDiZhi;
    }

    // 获取时辰地支
    getHourDiZhi(hour) {
        if (hour >= 23 || hour < 1) return '子';
        if (hour >= 1 && hour < 3) return '丑';
        if (hour >= 3 && hour < 5) return '寅';
        if (hour >= 5 && hour < 7) return '卯';
        if (hour >= 7 && hour < 9) return '辰';
        if (hour >= 9 && hour < 11) return '巳';
        if (hour >= 11 && hour < 13) return '午';
        if (hour >= 13 && hour < 15) return '未';
        if (hour >= 15 && hour < 17) return '申';
        if (hour >= 17 && hour < 19) return '酉';
        if (hour >= 19 && hour < 21) return '戌';
        if (hour >= 21 && hour < 23) return '亥';
        return '子';
    }

    // 计算总天数（用于日柱计算）
    calculateTotalDays(year, month, day) {
        // 简化计算，以1900年1月1日为基准
        const baseYear = 1900;
        let totalDays = 0;
        
        // 计算年份天数
        for (let y = baseYear; y < year; y++) {
            totalDays += this.isLeapYear(y) ? 366 : 365;
        }
        
        // 计算月份天数
        const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (this.isLeapYear(year)) daysInMonth[1] = 29;
        
        for (let m = 1; m < month; m++) {
            totalDays += daysInMonth[m - 1];
        }
        
        totalDays += day;
        return totalDays;
    }

    // 判断闰年
    isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }

    // 计算十神
    calculateTenGods(dayTianGan, otherTianGan) {
        const dayIndex = this.tianGan.indexOf(dayTianGan);
        const otherIndex = this.tianGan.indexOf(otherTianGan);
        
        const diff = (otherIndex - dayIndex + 10) % 10;
        const dayYinYang = dayIndex % 2; // 0为阳，1为阴
        const otherYinYang = otherIndex % 2;
        
        const tenGods = [
            '比肩', '劫财', '食神', '伤官', '偏财',
            '正财', '七杀', '正官', '偏印', '正印'
        ];
        
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
        
        return '未知';
    }

    // 计算大运
    calculateDaYun(gender, yearPillar, monthPillar, year) {
        const yearTianGan = yearPillar[0];
        const yearTianGanIndex = this.tianGan.indexOf(yearTianGan);
        const isYangYear = yearTianGanIndex % 2 === 0;
        
        // 男命阳年顺行，阴年逆行；女命相反
        const isShunXing = (gender === '男' && isYangYear) || (gender === '女' && !isYangYear);
        
        const monthTianGanIndex = this.tianGan.indexOf(monthPillar[0]);
        const monthDiZhiIndex = this.diZhi.indexOf(monthPillar[1]);
        
        const dayun = [];
        const startYear = year + 8; // 简化为8岁起运
        
        for (let i = 0; i < 8; i++) {
            let tianGanIndex, diZhiIndex;
            
            if (isShunXing) {
                tianGanIndex = (monthTianGanIndex + i + 1) % 10;
                diZhiIndex = (monthDiZhiIndex + i + 1) % 12;
            } else {
                tianGanIndex = (monthTianGanIndex - i - 1 + 10) % 10;
                diZhiIndex = (monthDiZhiIndex - i - 1 + 12) % 12;
            }
            
            const dayunPillar = this.tianGan[tianGanIndex] + this.diZhi[diZhiIndex];
            dayun.push(dayunPillar);
        }
        
        return {
            startYear: startYear,
            dayun: dayun
        };
    }

    // 主要计算函数
    calculate(birthData) {
        const { year, month, day, hour, gender } = birthData;
        
        // 计算四柱
        const yearPillar = this.calculateYearPillar(year);
        const monthPillar = this.calculateMonthPillar(year, month, day);
        const dayPillar = this.calculateDayPillar(year, month, day);
        const hourPillar = this.calculateHourPillar(dayPillar, hour);
        
        // 计算十神
        const dayTianGan = dayPillar[0];
        const yearTenGod = this.calculateTenGods(dayTianGan, yearPillar[0]);
        const monthTenGod = this.calculateTenGods(dayTianGan, monthPillar[0]);
        const hourTenGod = this.calculateTenGods(dayTianGan, hourPillar[0]);
        
        // 计算大运
        const bigLuck = this.calculateDaYun(gender, yearPillar, monthPillar, year);
        
        return {
            yearPillar,
            monthPillar,
            dayPillar,
            hourPillar,
            yearTenGod,
            monthTenGod,
            hourTenGod,
            bigLuck,
            dayTianGan
        };
    }

    // 生成AI分析提示词
    generatePrompt(birthData, baziResult) {
        const { gender, birthProvince, birthCity, birthYear } = birthData;
        const { yearPillar, monthPillar, dayPillar, hourPillar, yearTenGod, monthTenGod, hourTenGod, bigLuck } = baziResult;
        
        let prompt = "";
        prompt += `你是一位对中国传统八字命理学有着深刻理解和丰富经验的专家。你精通《滴天髓》、《子平真诠》、《穷通宝鉴》等经典著作，擅长运用五行生克、十神意象、格局喜忌等理论，对人生命运进行分析和解读。\n\n`;
        prompt += `现在你将面对一个八字命例，请你运用你的专业知识和经验，对该命例进行全面、深入的分析，并给出有价值的建议。请你务必逐步思考、推理，并清晰地展示你的思考过程。\n\n`;

        prompt += `求测者的基本信息如下：\n`;
        prompt += `性别：${gender}\n`;
        prompt += `出生地区：${birthProvince} ${birthCity}\n`;
        prompt += `出生年份：${birthYear}年\n\n`;

        prompt += `其八字命盘如下：\n`;
        prompt += `年柱：${yearPillar}（${yearTenGod}）\n`;
        prompt += `月柱：${monthPillar}（${monthTenGod}）\n`;
        prompt += `日柱：${dayPillar}（日元）\n`;
        prompt += `时柱：${hourPillar}（${hourTenGod}）\n\n`;

        prompt += `大运信息：从${bigLuck.startYear}年起运，运程顺序为：${bigLuck.dayun.join('、')}\n\n`;

        prompt += `请你从以下几个方面入手，展开你的分析：\n\n`;
        prompt += `1.首先，请你列出命主进行八字排盘,整体审视命局：从五行、阴阳、十神、格局等多个角度入手，对命局的整体特点进行概括性的描述。例如，五行是否均衡？阴阳是否协调？是否存在某种特殊的格局？日元得令、得地、得助吗？\n\n`;
        prompt += `2.分析日元强弱：日元代表命主自身，其强弱直接关系到命主的运势。请你结合月令、地支、天干等因素，综合判断日元的强弱，并说明判断的依据。如果日元偏强，喜什么？忌什么？如果日元偏弱，又该如何取用神？\n\n`;
        prompt += `3.剖析性格特征：性格决定命运。请你结合八字命盘，分析命主的性格特点、优缺点，以及可能的发展方向。例如，是积极进取还是保守稳重？是善于交际还是喜欢独处？是理性思维还是感性思维？这些性格特点对命主的人生有何影响？\n\n`;
        prompt += `4.推断事业发展：事业是人生价值的重要体现。请你结合八字命盘，分析命主的事业运势、适合的职业、发展方向等。例如，适合从事稳定的工作还是具有挑战性的工作？适合自己创业还是在企业中发展？在事业发展过程中需要注意哪些问题？\n\n`;
        prompt += `5.预测财富运势：财富是人生幸福的重要保障。请你结合八字命盘，分析命主的财富状况、财运走势、理财建议等。例如，是正财运旺盛还是偏财运旺盛？适合从事哪些行业的投资？在理财方面需要注意哪些问题？\n\n`;
        prompt += `6.研判婚姻情感：婚姻是人生重要的组成部分。请你结合八字命盘，分析命主的婚姻运势、情感状况、婚恋建议等。例如，是早婚好还是晚婚好？适合找什么样的伴侣？在婚姻中需要注意哪些问题？\n\n`;
        prompt += `7.关注健康状况：健康是幸福人生的基石。请你结合八字命盘，分析命主的健康状况、可能存在的健康隐患、养生建议等。例如，五行失衡可能导致哪些疾病？需要注意哪些方面的保健？\n\n`;
        prompt += `8.洞察六亲关系：六亲是与命主关系最为密切的人。请你结合八字命盘，分析命主与父母、配偶、子女等六亲的关系，以及六亲对命主的影响。例如，与父母的关系如何？配偶对自己有帮助吗？子女是否孝顺？\n\n`;
        prompt += `9.把握大运流年：大运和流年是影响命主运势的重要因素。请你结合大运和流年，分析命主在不同人生阶段的运势变化，为命主提供人生规划建议。例如，哪些年份是机遇期？哪些年份是挑战期？应该如何把握机遇、应对挑战？\n\n`;
        prompt += `10.引用命理典籍的一段话，创作一首谶语诗，对本命主进行概括性的总结和提示。\n\n`;

        return prompt;
    }
}

// 导出模块
window.BaziCalculator = BaziCalculator;
