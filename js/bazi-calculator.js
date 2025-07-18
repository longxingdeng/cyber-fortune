// 赛博论命 - 八字计算核心模块 (集成lunisolar库)

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

        // 纳音五行对照表
        this.naYin = {
            '甲子': '海中金', '乙丑': '海中金',
            '丙寅': '炉中火', '丁卯': '炉中火',
            '戊辰': '大林木', '己巳': '大林木',
            '庚午': '路旁土', '辛未': '路旁土',
            '壬申': '剑锋金', '癸酉': '剑锋金',
            '甲戌': '山头火', '乙亥': '山头火',
            '丙子': '涧下水', '丁丑': '涧下水',
            '戊寅': '城头土', '己卯': '城头土',
            '庚辰': '白蜡金', '辛巳': '白蜡金',
            '壬午': '杨柳木', '癸未': '杨柳木',
            '甲申': '泉中水', '乙酉': '泉中水',
            '丙戌': '屋上土', '丁亥': '屋上土',
            '戊子': '霹雳火', '己丑': '霹雳火',
            '庚寅': '松柏木', '辛卯': '松柏木',
            '壬辰': '长流水', '癸巳': '长流水',
            '甲午': '砂中金', '乙未': '砂中金',
            '丙申': '山下火', '丁酉': '山下火',
            '戊戌': '平地木', '己亥': '平地木',
            '庚子': '壁上土', '辛丑': '壁上土',
            '壬寅': '金箔金', '癸卯': '金箔金',
            '甲辰': '覆灯火', '乙巳': '覆灯火',
            '丙午': '天河水', '丁未': '天河水',
            '戊申': '大驿土', '己酉': '大驿土',
            '庚戌': '钗钏金', '辛亥': '钗钏金',
            '壬子': '桑柘木', '癸丑': '桑柘木',
            '甲寅': '大溪水', '乙卯': '大溪水',
            '丙辰': '沙中土', '丁巳': '沙中土',
            '戊午': '天上火', '己未': '天上火',
            '庚申': '石榴木', '辛酉': '石榴木',
            '壬戌': '大海水', '癸亥': '大海水'
        };

        // 检查lunisolar库是否可用
        this.lunisolarAvailable = typeof lunisolar !== 'undefined';
        if (this.lunisolarAvailable) {
            console.log('✅ lunisolar库已加载，将使用精确计算');
        } else {
            console.error('❌ lunisolar库未加载，无法进行八字计算');
            throw new Error('lunisolar库是必需的，请确保已正确加载');
        }
    }

    // 计算纳音
    calculateNaYin(pillar) {
        return this.naYin[pillar] || '未知纳音';
    }

    // 获取五行属性
    getWuXingInfo(pillar) {
        const tianGan = pillar[0];
        const diZhi = pillar[1];
        return {
            tianGan: this.wuXing[tianGan],
            diZhi: this.wuXing[diZhi],
            combined: this.wuXing[tianGan] + this.wuXing[diZhi]
        };
    }

    // 使用lunisolar库进行精确八字计算
    calculate(birthData) {
        if (!this.lunisolarAvailable) {
            throw new Error('lunisolar库未加载，无法进行八字计算');
        }

        try {
            const { year, month, day, hour, minute = 0, gender } = birthData;

            // 构建日期时间字符串
            const datetime = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

            console.log('使用lunisolar计算:', datetime);

            // 创建lunisolar对象
            const d = lunisolar(datetime);

            // 获取八字四柱
            const yearPillar = d.char8.year.toString();
            const monthPillar = d.char8.month.toString();
            const dayPillar = d.char8.day.toString();
            const hourPillar = d.char8.hour.toString();

            // 获取地支藏干信息
            const hiddenStems = {
                year: d.char8.year.branch.hiddenStems.map(s => s.toString()),
                month: d.char8.month.branch.hiddenStems.map(s => s.toString()),
                day: d.char8.day.branch.hiddenStems.map(s => s.toString()),
                hour: d.char8.hour.branch.hiddenStems.map(s => s.toString())
            };

            // 获取农历信息
            const lunarInfo = {
                date: d.format('lY年 lM(lL)lD lH時'),
                year: d.lunar.year,
                month: d.lunar.month,
                day: d.lunar.day,
                hour: d.lunar.hour,
                isLeapMonth: d.lunar.isLeapMonth
            };

            // 获取节气信息
            const solarTerm = d.solarTerm?.toString() || '非节气';

            // 计算十神 - 使用lunisolar库的精确数据
            const dayTianGan = dayPillar[0];
            const yearTenGod = this.calculateTenGods(dayTianGan, yearPillar[0]);
            const monthTenGod = this.calculateTenGods(dayTianGan, monthPillar[0]);
            const hourTenGod = this.calculateTenGods(dayTianGan, hourPillar[0]);

            // 计算地支藏干的十神关系
            const hiddenStemsAnalysis = this.analyzeHiddenStems(dayTianGan, hiddenStems);

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
                dayTianGan,
                lunarInfo,
                solarTerm,
                hiddenStems,
                hiddenStemsAnalysis,
                calculationMethod: 'lunisolar',
                fullBazi: `${yearPillar} ${monthPillar} ${dayPillar} ${hourPillar}`,
                // 添加五行信息
                wuxingInfo: {
                    year: {
                        tianGan: this.wuXing[yearPillar[0]],
                        diZhi: this.wuXing[yearPillar[1]],
                        combined: this.wuXing[yearPillar[0]] + this.wuXing[yearPillar[1]]
                    },
                    month: {
                        tianGan: this.wuXing[monthPillar[0]],
                        diZhi: this.wuXing[monthPillar[1]],
                        combined: this.wuXing[monthPillar[0]] + this.wuXing[monthPillar[1]]
                    },
                    day: {
                        tianGan: this.wuXing[dayPillar[0]],
                        diZhi: this.wuXing[dayPillar[1]],
                        combined: this.wuXing[dayPillar[0]] + this.wuXing[dayPillar[1]]
                    },
                    hour: {
                        tianGan: this.wuXing[hourPillar[0]],
                        diZhi: this.wuXing[hourPillar[1]],
                        combined: this.wuXing[hourPillar[0]] + this.wuXing[hourPillar[1]]
                    }
                },
                // 添加纳音信息
                naYinInfo: {
                    year: this.calculateNaYin(yearPillar),
                    month: this.calculateNaYin(monthPillar),
                    day: this.calculateNaYin(dayPillar),
                    hour: this.calculateNaYin(hourPillar)
                },
                // 添加十神详细分析
                tenGodsAnalysis: {
                    year: { tianGan: yearPillar[0], tenGod: yearTenGod, wuxing: this.wuXing[yearPillar[0]] },
                    month: { tianGan: monthPillar[0], tenGod: monthTenGod, wuxing: this.wuXing[monthPillar[0]] },
                    day: { tianGan: dayPillar[0], tenGod: '日元', wuxing: this.wuXing[dayPillar[0]] },
                    hour: { tianGan: hourPillar[0], tenGod: hourTenGod, wuxing: this.wuXing[hourPillar[0]] }
                }
            };

        } catch (error) {
            console.error('lunisolar计算失败:', error);
            throw new Error(`八字计算失败: ${error.message}`);
        }
    }



    // 农历转公历功能
    lunarToSolar(lunarData) {
        if (!this.lunisolarAvailable) {
            throw new Error('需要lunisolar库支持农历转换功能');
        }

        try {
            const { year, month, day, hour = 10, minute = 0 } = lunarData;
            
            // 使用lunisolar进行农历转公历
            const d = lunisolar.fromLunar({
                year: year,
                month: month,
                day: day
            });
            
            // 设置时辰
            const solarDate = d.format('YYYY-MM-DD');
            const fullDatetime = `${solarDate} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
            const dWithHour = lunisolar(fullDatetime);
            
            return {
                solarDate: dWithHour.format('YYYY-MM-DD HH:mm:ss'),
                lunarDate: dWithHour.format('lY年 lM(lL)lD lH時'),
                bazi: dWithHour.format('cY cM cD cH'),
                solarTerm: dWithHour.solarTerm?.toString() || '非节气'
            };
            
        } catch (error) {
            console.error('农历转换失败:', error);
            throw error;
        }
    }

    // 检查库可用性
    checkLibraryStatus() {
        return {
            lunisolarAvailable: this.lunisolarAvailable,
            version: this.lunisolarAvailable ? 'lunisolar@2.5.1' : null,
            features: {
                accurateCalculation: this.lunisolarAvailable,
                lunarConversion: this.lunisolarAvailable,
                solarTerms: this.lunisolarAvailable,
                hiddenStems: this.lunisolarAvailable
            }
        };
    }



    // 计算十神 - 改进版本，参考lunisolar库的计算方式
    calculateTenGods(dayTianGan, otherTianGan) {
        // 如果是同一个天干，直接返回比肩
        if (dayTianGan === otherTianGan) {
            return '比肩';
        }

        const dayIndex = this.tianGan.indexOf(dayTianGan);
        const otherIndex = this.tianGan.indexOf(otherTianGan);

        // 计算天干之间的关系
        const diff = (otherIndex - dayIndex + 10) % 10;

        // 判断阴阳属性：甲丙戊庚壬为阳(偶数索引)，乙丁己辛癸为阴(奇数索引)
        const dayYinYang = dayIndex % 2; // 0为阳，1为阴
        const otherYinYang = otherIndex % 2;
        const sameYinYang = dayYinYang === otherYinYang;

        // 根据五行生克关系和阴阳属性确定十神
        switch (diff) {
            case 0:
                return '比肩'; // 同一天干
            case 1:
            case 9:
                // 相邻天干，同阴阳为劫财，异阴阳为比肩
                return sameYinYang ? '劫财' : '比肩';
            case 2:
            case 8:
                // 我生者为食伤，同阴阳为食神，异阴阳为伤官
                return sameYinYang ? '食神' : '伤官';
            case 3:
            case 7:
                // 我生者为食伤，异阴阳为食神，同阴阳为伤官
                return sameYinYang ? '伤官' : '食神';
            case 4:
            case 6:
                // 我克者为财，同阴阳为偏财，异阴阳为正财
                return sameYinYang ? '偏财' : '正财';
            case 5:
                // 正对面的天干，异阴阳为偏财，同阴阳为正财
                return sameYinYang ? '正财' : '偏财';
            default:
                return this.calculateTenGodsAdvanced(dayTianGan, otherTianGan);
        }
    }

    // 高级十神计算方法 - 基于五行生克关系
    calculateTenGodsAdvanced(dayTianGan, otherTianGan) {
        const dayWuXing = this.wuXing[dayTianGan];
        const otherWuXing = this.wuXing[otherTianGan];

        const dayIndex = this.tianGan.indexOf(dayTianGan);
        const otherIndex = this.tianGan.indexOf(otherTianGan);
        const sameYinYang = (dayIndex % 2) === (otherIndex % 2);

        // 五行生克关系判断
        const wuxingRelation = this.getWuXingRelation(dayWuXing, otherWuXing);

        switch (wuxingRelation) {
            case 'same': // 同类
                return sameYinYang ? '比肩' : '劫财';
            case 'generate': // 我生他
                return sameYinYang ? '食神' : '伤官';
            case 'overcome': // 我克他
                return sameYinYang ? '偏财' : '正财';
            case 'generated': // 他生我
                return sameYinYang ? '偏印' : '正印';
            case 'overcomed': // 他克我
                return sameYinYang ? '七杀' : '正官';
            default:
                return '未知';
        }
    }

    // 获取五行生克关系
    getWuXingRelation(dayWuXing, otherWuXing) {
        if (dayWuXing === otherWuXing) {
            return 'same'; // 同类
        }

        // 五行相生关系：木生火，火生土，土生金，金生水，水生木
        const generateMap = {
            '木': '火',
            '火': '土',
            '土': '金',
            '金': '水',
            '水': '木'
        };

        // 五行相克关系：木克土，土克水，水克火，火克金，金克木
        const overcomeMap = {
            '木': '土',
            '土': '水',
            '水': '火',
            '火': '金',
            '金': '木'
        };

        if (generateMap[dayWuXing] === otherWuXing) {
            return 'generate'; // 我生他
        }
        if (generateMap[otherWuXing] === dayWuXing) {
            return 'generated'; // 他生我
        }
        if (overcomeMap[dayWuXing] === otherWuXing) {
            return 'overcome'; // 我克他
        }
        if (overcomeMap[otherWuXing] === dayWuXing) {
            return 'overcomed'; // 他克我
        }

        return 'unknown';
    }

    // 分析地支藏干的十神关系
    analyzeHiddenStems(dayTianGan, hiddenStems) {
        const analysis = {};

        ['year', 'month', 'day', 'hour'].forEach(pillar => {
            if (hiddenStems[pillar] && hiddenStems[pillar].length > 0) {
                analysis[pillar] = hiddenStems[pillar].map(stem => ({
                    tianGan: stem,
                    tenGod: this.calculateTenGods(dayTianGan, stem),
                    wuxing: this.wuXing[stem]
                }));
            }
        });

        return analysis;
    }

    // 获取十神强度分析
    getTenGodsStrength(baziResult) {
        const tenGodsCount = {};
        const tenGodsList = ['比肩', '劫财', '食神', '伤官', '偏财', '正财', '七杀', '正官', '偏印', '正印'];

        // 初始化计数
        tenGodsList.forEach(god => {
            tenGodsCount[god] = 0;
        });

        // 统计天干十神
        [baziResult.yearTenGod, baziResult.monthTenGod, baziResult.hourTenGod].forEach(god => {
            if (tenGodsCount.hasOwnProperty(god)) {
                tenGodsCount[god]++;
            }
        });

        // 统计地支藏干十神
        if (baziResult.hiddenStemsAnalysis) {
            Object.values(baziResult.hiddenStemsAnalysis).forEach(pillarStems => {
                pillarStems.forEach(stem => {
                    if (tenGodsCount.hasOwnProperty(stem.tenGod)) {
                        tenGodsCount[stem.tenGod] += 0.5; // 地支藏干权重较小
                    }
                });
            });
        }

        return tenGodsCount;
    }

    // 分析日元强弱
    analyzeDayMasterStrength(baziResult) {
        const dayTianGan = baziResult.dayTianGan;
        const dayWuXing = this.wuXing[dayTianGan];

        let strength = 0;
        let analysis = {
            dayMaster: dayTianGan,
            dayWuXing: dayWuXing,
            strengthScore: 0,
            strengthLevel: '',
            supporters: [],
            weakeners: [],
            analysis: ''
        };

        // 分析月令得气
        const monthDiZhi = baziResult.monthPillar[1];
        const monthWuXing = this.wuXing[monthDiZhi];
        const monthRelation = this.getWuXingRelation(dayWuXing, monthWuXing);

        if (monthRelation === 'same') {
            strength += 3;
            analysis.supporters.push(`月令${monthDiZhi}(${monthWuXing})同类助身`);
        } else if (monthRelation === 'generated') {
            strength += 2;
            analysis.supporters.push(`月令${monthDiZhi}(${monthWuXing})生助日元`);
        } else if (monthRelation === 'overcomed') {
            strength -= 2;
            analysis.weakeners.push(`月令${monthDiZhi}(${monthWuXing})克制日元`);
        }

        // 分析其他柱的支持
        const tenGodsStrength = this.getTenGodsStrength(baziResult);
        const supportGods = tenGodsStrength['比肩'] + tenGodsStrength['劫财'] + tenGodsStrength['正印'] + tenGodsStrength['偏印'];
        const weakenGods = tenGodsStrength['正官'] + tenGodsStrength['七杀'] + tenGodsStrength['食神'] + tenGodsStrength['伤官'];

        strength += supportGods * 1.5;
        strength -= weakenGods * 1.2;

        analysis.strengthScore = Math.round(strength * 10) / 10;

        if (strength >= 3) {
            analysis.strengthLevel = '偏强';
        } else if (strength >= 1) {
            analysis.strengthLevel = '中和偏强';
        } else if (strength >= -1) {
            analysis.strengthLevel = '中和';
        } else if (strength >= -3) {
            analysis.strengthLevel = '中和偏弱';
        } else {
            analysis.strengthLevel = '偏弱';
        }

        return analysis;
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

    // 生成AI分析提示词
    generatePrompt(birthData, baziResult) {
        const { gender, birthProvince, birthCity, year: birthYear } = birthData;
        const { yearPillar, monthPillar, dayPillar, hourPillar, yearTenGod, monthTenGod, hourTenGod, bigLuck } = baziResult;

        let prompt = "";
        prompt += `你是一位对中国传统八字命理学有着深刻理解和丰富经验的专家。你精通《滴天髓》、《子平真诠》、《穷通宝鉴》等经典著作，擅长运用五行生克、十神意象、格局喜忌等理论，对人生命运进行分析和解读。\n\n`;
        prompt += `现在你将面对一个八字命例，请你运用你的专业知识和经验，对该命例进行全面、深入的分析，并给出有价值的建议。请你务必逐步思考、推理，并清晰地展示你的思考过程。\n\n`;

        prompt += `求测者的基本信息如下：\n`;
        prompt += `性别：${gender}\n`;
        prompt += `出生地区：${birthProvince || '未知'} ${birthCity || '未知'}\n`;
        prompt += `出生年份：${birthYear}年\n\n`;

        prompt += `其八字命盘如下：\n`;
        prompt += `年柱：${yearPillar}（${yearTenGod}）\n`;
        prompt += `月柱：${monthPillar}（${monthTenGod}）\n`;
        prompt += `日柱：${dayPillar}（日元）\n`;
        prompt += `时柱：${hourPillar}（${hourTenGod}）\n\n`;

        if (bigLuck) {
            prompt += `大运信息：从${bigLuck.startYear}年起运，运程顺序为：${bigLuck.dayun.join('、')}\n\n`;
        }

        // 添加计算方法信息
        if (baziResult.calculationMethod === 'lunisolar') {
            prompt += `计算方法：使用lunisolar库精确计算\n`;
            if (baziResult.lunarInfo) {
                prompt += `农历信息：${baziResult.lunarInfo.date}\n`;
            }
            if (baziResult.solarTerm) {
                prompt += `节气信息：${baziResult.solarTerm}\n`;
            }
            prompt += `\n`;
        }

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

    // 获取传统地支藏干表
    getTraditionalHiddenStems() {
        return {
            '子': ['癸'],
            '丑': ['己', '癸', '辛'],
            '寅': ['甲', '丙', '戊'],
            '卯': ['乙'],
            '辰': ['戊', '乙', '癸'],
            '巳': ['丙', '庚', '戊'],
            '午': ['丁', '己'],
            '未': ['己', '丁', '乙'],
            '申': ['庚', '壬', '戊'],
            '酉': ['辛'],
            '戌': ['戊', '辛', '丁'],
            '亥': ['壬', '甲']
        };
    }

    // 综合分析八字格局
    analyzePattern(baziResult) {
        const dayTianGan = baziResult.dayTianGan;
        const strengthAnalysis = this.analyzeDayMasterStrength(baziResult);
        const tenGodsStrength = this.getTenGodsStrength(baziResult);

        let pattern = {
            type: '',
            description: '',
            useGod: '',
            avoidGod: '',
            suggestions: []
        };

        // 根据日元强弱和十神分布判断格局
        if (strengthAnalysis.strengthLevel.includes('强')) {
            // 身强格局
            if (tenGodsStrength['食神'] + tenGodsStrength['伤官'] >= 2) {
                pattern.type = '食伤生财格';
                pattern.useGod = '食神、伤官、财星';
                pattern.avoidGod = '比劫、印星';
                pattern.description = '身强食伤旺，宜泄秀生财，发挥才华创造财富';
            } else if (tenGodsStrength['正财'] + tenGodsStrength['偏财'] >= 2) {
                pattern.type = '财旺身强格';
                pattern.useGod = '财星、官杀';
                pattern.avoidGod = '比劫、印星';
                pattern.description = '身强财旺，能胜任财务管理，宜从商或理财';
            } else if (tenGodsStrength['正官'] + tenGodsStrength['七杀'] >= 2) {
                pattern.type = '官杀制身格';
                pattern.useGod = '官杀、财星';
                pattern.avoidGod = '比劫、印星';
                pattern.description = '身强官杀重，有管理才能，适合从政或管理工作';
            } else {
                pattern.type = '身强用泄格';
                pattern.useGod = '食伤、财星、官杀';
                pattern.avoidGod = '比劫、印星';
                pattern.description = '身强无泄，需要食伤或官杀来平衡';
            }
        } else if (strengthAnalysis.strengthLevel.includes('弱')) {
            // 身弱格局
            if (tenGodsStrength['正印'] + tenGodsStrength['偏印'] >= 2) {
                pattern.type = '印绶护身格';
                pattern.useGod = '印星、比劫';
                pattern.avoidGod = '财星、食伤';
                pattern.description = '身弱印旺，学习能力强，适合文化教育行业';
            } else if (tenGodsStrength['比肩'] + tenGodsStrength['劫财'] >= 2) {
                pattern.type = '比劫帮身格';
                pattern.useGod = '比劫、印星';
                pattern.avoidGod = '官杀、食伤';
                pattern.description = '身弱比劫帮，朋友多助力，合作发展为佳';
            } else {
                pattern.type = '身弱用扶格';
                pattern.useGod = '印星、比劫';
                pattern.avoidGod = '官杀、食伤、财星';
                pattern.description = '身弱需要印星比劫扶助，宜求学深造';
            }
        } else {
            // 中和格局
            pattern.type = '中和平衡格';
            pattern.useGod = '顺其自然，平衡发展';
            pattern.avoidGod = '过旺之神';
            pattern.description = '八字平衡，各方面发展较为均衡，适应性强';
        }

        return pattern;
    }

    // 获取完整的八字分析报告
    getFullAnalysis(birthData) {
        const baziResult = this.calculate(birthData);
        const strengthAnalysis = this.analyzeDayMasterStrength(baziResult);
        const tenGodsStrength = this.getTenGodsStrength(baziResult);
        const pattern = this.analyzePattern(baziResult);

        return {
            ...baziResult,
            strengthAnalysis,
            tenGodsStrength,
            pattern,
            analysisTime: new Date().toISOString()
        };
    }
}

// 导出模块
window.BaziCalculator = BaziCalculator;
