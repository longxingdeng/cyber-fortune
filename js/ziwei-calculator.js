// 赛博论命 - 紫薇斗数计算模块

class ZiweiCalculator {
    constructor() {
        // 十二宫位
        this.gongWei = [
            '命宫', '兄弟宫', '夫妻宫', '子女宫', '财帛宫', '疾厄宫',
            '迁移宫', '奴仆宫', '官禄宫', '田宅宫', '福德宫', '父母宫'
        ];
        
        // 主星
        this.zhuXing = [
            '紫微', '天机', '太阳', '武曲', '天同', '廉贞', '天府',
            '太阴', '贪狼', '巨门', '天相', '天梁', '七杀', '破军'
        ];
        
        // 辅星
        this.fuXing = [
            '左辅', '右弼', '天魁', '天钺', '文昌', '文曲',
            '禄存', '天马', '擎羊', '陀罗', '火星', '铃星'
        ];
        
        // 四化
        this.siHua = ['化禄', '化权', '化科', '化忌'];
        
        // 地支
        this.diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    }

    // 计算命宫位置
    calculateMingGong(month, hour) {
        // 简化的命宫计算公式
        // 实际计算需要考虑更多因素
        const hourIndex = this.getHourIndex(hour);
        const mingGongIndex = (14 - month - hourIndex) % 12;
        return this.diZhi[mingGongIndex];
    }

    // 获取时辰索引
    getHourIndex(hour) {
        if (hour >= 23 || hour < 1) return 0; // 子时
        if (hour >= 1 && hour < 3) return 1;  // 丑时
        if (hour >= 3 && hour < 5) return 2;  // 寅时
        if (hour >= 5 && hour < 7) return 3;  // 卯时
        if (hour >= 7 && hour < 9) return 4;  // 辰时
        if (hour >= 9 && hour < 11) return 5; // 巳时
        if (hour >= 11 && hour < 13) return 6; // 午时
        if (hour >= 13 && hour < 15) return 7; // 未时
        if (hour >= 15 && hour < 17) return 8; // 申时
        if (hour >= 17 && hour < 19) return 9; // 酉时
        if (hour >= 19 && hour < 21) return 10; // 戌时
        if (hour >= 21 && hour < 23) return 11; // 亥时
        return 0;
    }

    // 计算身宫位置
    calculateShenGong(month, hour) {
        const hourIndex = this.getHourIndex(hour);
        const shenGongIndex = (month + hourIndex) % 12;
        return this.diZhi[shenGongIndex];
    }

    // 安排紫微星
    arrangePurpleEmperor(day, mingGong) {
        // 简化的紫微星安排
        const mingGongIndex = this.diZhi.indexOf(mingGong);
        const ziweiIndex = (day + mingGongIndex) % 12;
        return this.diZhi[ziweiIndex];
    }

    // 安排天府星
    arrangeTianFu(ziweiPosition) {
        const ziweiIndex = this.diZhi.indexOf(ziweiPosition);
        // 天府星与紫微星相对
        const tianFuIndex = (ziweiIndex + 6) % 12;
        return this.diZhi[tianFuIndex];
    }

    // 计算十二宫的星曜分布
    calculateStarDistribution(birthData) {
        const { year, month, day, hour } = birthData;
        
        // 计算基本宫位
        const mingGong = this.calculateMingGong(month, hour);
        const shenGong = this.calculateShenGong(month, hour);
        
        // 安排主星
        const ziweiPosition = this.arrangePurpleEmperor(day, mingGong);
        const tianFuPosition = this.arrangeTianFu(ziweiPosition);
        
        // 构建星盘
        const starChart = {};
        this.diZhi.forEach(gong => {
            starChart[gong] = {
                gongWei: this.getGongWei(gong, mingGong),
                zhuXing: [],
                fuXing: [],
                siHua: []
            };
        });
        
        // 安排紫微星系
        this.arrangeZiweiStars(starChart, ziweiPosition);
        
        // 安排天府星系
        this.arrangeTianFuStars(starChart, tianFuPosition);
        
        // 安排辅星
        this.arrangeFuXing(starChart, birthData);
        
        return {
            mingGong,
            shenGong,
            ziweiPosition,
            tianFuPosition,
            starChart
        };
    }

    // 获取宫位名称
    getGongWei(currentGong, mingGong) {
        const mingGongIndex = this.diZhi.indexOf(mingGong);
        const currentIndex = this.diZhi.indexOf(currentGong);
        const gongWeiIndex = (currentIndex - mingGongIndex + 12) % 12;
        return this.gongWei[gongWeiIndex];
    }

    // 安排紫微星系
    arrangeZiweiStars(starChart, ziweiPosition) {
        const ziweiIndex = this.diZhi.indexOf(ziweiPosition);
        
        // 紫微星系的星曜排列（简化版）
        const ziweiStars = [
            { star: '紫微', offset: 0 },
            { star: '天机', offset: 1 },
            { star: '太阳', offset: 3 },
            { star: '武曲', offset: 4 },
            { star: '天同', offset: 5 }
        ];
        
        ziweiStars.forEach(({ star, offset }) => {
            const position = this.diZhi[(ziweiIndex + offset) % 12];
            starChart[position].zhuXing.push(star);
        });
    }

    // 安排天府星系
    arrangeTianFuStars(starChart, tianFuPosition) {
        const tianFuIndex = this.diZhi.indexOf(tianFuPosition);
        
        // 天府星系的星曜排列（简化版）
        const tianFuStars = [
            { star: '天府', offset: 0 },
            { star: '太阴', offset: 1 },
            { star: '贪狼', offset: 2 },
            { star: '巨门', offset: 3 },
            { star: '天相', offset: 4 },
            { star: '天梁', offset: 5 },
            { star: '七杀', offset: 6 },
            { star: '破军', offset: 10 }
        ];
        
        tianFuStars.forEach(({ star, offset }) => {
            const position = this.diZhi[(tianFuIndex + offset) % 12];
            starChart[position].zhuXing.push(star);
        });
    }

    // 安排辅星
    arrangeFuXing(starChart, birthData) {
        const { year, month, day, hour } = birthData;
        
        // 简化的辅星安排
        // 实际计算需要更复杂的公式
        
        // 左辅右弼
        const leftIndex = (month + day) % 12;
        const rightIndex = (leftIndex + 6) % 12;
        starChart[this.diZhi[leftIndex]].fuXing.push('左辅');
        starChart[this.diZhi[rightIndex]].fuXing.push('右弼');
        
        // 文昌文曲
        const changIndex = (hour + 1) % 12;
        const quIndex = (changIndex + 6) % 12;
        starChart[this.diZhi[changIndex]].fuXing.push('文昌');
        starChart[this.diZhi[quIndex]].fuXing.push('文曲');
        
        // 天魁天钺
        const kuiIndex = (year + month) % 12;
        const yueIndex = (kuiIndex + 4) % 12;
        starChart[this.diZhi[kuiIndex]].fuXing.push('天魁');
        starChart[this.diZhi[yueIndex]].fuXing.push('天钺');
    }

    // 生成紫薇斗数分析
    generateAnalysis(ziweiResult) {
        const { mingGong, shenGong, starChart } = ziweiResult;
        
        let analysis = "紫薇斗数命盘分析：\n\n";
        
        // 命宫分析
        const mingGongStars = starChart[mingGong];
        analysis += `命宫位于${mingGong}，主星：${mingGongStars.zhuXing.join('、') || '无主星'}\n`;
        analysis += `辅星：${mingGongStars.fuXing.join('、') || '无辅星'}\n\n`;
        
        // 身宫分析
        const shenGongStars = starChart[shenGong];
        analysis += `身宫位于${shenGong}，主星：${shenGongStars.zhuXing.join('、') || '无主星'}\n`;
        analysis += `辅星：${shenGongStars.fuXing.join('、') || '无辅星'}\n\n`;
        
        // 各宫位星曜分布
        analysis += "十二宫星曜分布：\n";
        this.diZhi.forEach(gong => {
            const gongData = starChart[gong];
            const gongWei = gongData.gongWei;
            const allStars = [...gongData.zhuXing, ...gongData.fuXing];
            analysis += `${gongWei}(${gong})：${allStars.join('、') || '空宫'}\n`;
        });
        
        return analysis;
    }

    // 主计算函数
    calculate(birthData) {
        try {
            const ziweiResult = this.calculateStarDistribution(birthData);
            const analysis = this.generateAnalysis(ziweiResult);
            
            return {
                ...ziweiResult,
                analysis
            };
        } catch (error) {
            console.error('紫薇斗数计算错误:', error);
            throw new Error('紫薇斗数计算失败');
        }
    }
}

// 导出模块
window.ZiweiCalculator = ZiweiCalculator;
