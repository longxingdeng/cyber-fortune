// 赛博论命 - 八字计算核心模块 (集成lunisolar库)

class BaziCalculator {
    constructor() {
        // 天干
        this.tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

        // 地支
        this.diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        // 中国各省市经度数据 - 用于真太阳时修正
        this.locationData = {
            "北京市": { "北京市": { longitude: 116.4 } },
            "天津市": { "天津市": { longitude: 117.2 } },
            "河北省": {
                "石家庄市": { longitude: 114.5 },
                "唐山市": { longitude: 118.2 },
                "秦皇岛市": { longitude: 119.6 },
                "邯郸市": { longitude: 114.5 },
                "邢台市": { longitude: 114.5 },
                "保定市": { longitude: 115.5 },
                "张家口市": { longitude: 114.9 },
                "承德市": { longitude: 117.9 },
                "沧州市": { longitude: 116.8 },
                "廊坊市": { longitude: 116.7 },
                "衡水市": { longitude: 115.7 }
            },
            "山西省": {
                "太原市": { longitude: 112.5 },
                "大同市": { longitude: 113.3 },
                "阳泉市": { longitude: 113.6 },
                "长治市": { longitude: 113.1 },
                "晋城市": { longitude: 112.8 },
                "朔州市": { longitude: 112.4 },
                "晋中市": { longitude: 112.7 },
                "运城市": { longitude: 111.0 },
                "忻州市": { longitude: 112.7 },
                "临汾市": { longitude: 111.5 },
                "吕梁市": { longitude: 111.1 }
            },
            "内蒙古自治区": {
                "呼和浩特市": { longitude: 111.7 },
                "包头市": { longitude: 110.0 },
                "乌海市": { longitude: 118.3 },
                "赤峰市": { longitude: 118.9 },
                "通辽市": { longitude: 122.2 },
                "鄂尔多斯市": { longitude: 109.8 },
                "呼伦贝尔市": { longitude: 119.7 },
                "巴彦淖尔市": { longitude: 107.4 },
                "乌兰察布市": { longitude: 113.2 },
                "兴安盟": { longitude: 122.1 },
                "锡林郭勒盟": { longitude: 116.0 },
                "阿拉善盟": { longitude: 105.7 }
            },
            "辽宁省": {
                "沈阳市": { longitude: 123.4 },
                "大连市": { longitude: 121.6 },
                "鞍山市": { longitude: 122.9 },
                "抚顺市": { longitude: 123.9 },
                "本溪市": { longitude: 123.7 },
                "丹东市": { longitude: 124.3 },
                "锦州市": { longitude: 121.1 },
                "营口市": { longitude: 122.2 },
                "阜新市": { longitude: 121.6 },
                "辽阳市": { longitude: 123.2 },
                "盘锦市": { longitude: 122.0 },
                "铁岭市": { longitude: 123.8 },
                "朝阳市": { longitude: 120.4 },
                "葫芦岛市": { longitude: 120.8 }
            },
            "吉林省": {
                "长春市": { longitude: 125.3 },
                "吉林市": { longitude: 126.5 },
                "四平市": { longitude: 124.3 },
                "辽源市": { longitude: 125.1 },
                "通化市": { longitude: 125.9 },
                "白山市": { longitude: 126.4 },
                "松原市": { longitude: 124.8 },
                "白城市": { longitude: 122.8 },
                "延边朝鲜族自治州": { longitude: 129.5 }
            },
            "黑龙江省": {
                "哈尔滨市": { longitude: 126.6 },
                "齐齐哈尔市": { longitude: 123.9 },
                "鸡西市": { longitude: 130.9 },
                "鹤岗市": { longitude: 130.3 },
                "双鸭山市": { longitude: 131.1 },
                "大庆市": { longitude: 125.1 },
                "伊春市": { longitude: 129.0 },
                "佳木斯市": { longitude: 130.3 },
                "七台河市": { longitude: 130.9 },
                "牡丹江市": { longitude: 129.6 },
                "黑河市": { longitude: 127.5 },
                "绥化市": { longitude: 126.9 },
                "大兴安岭地区": { longitude: 124.7 }
            },
            "上海市": { "上海市": { longitude: 121.4 } },
            "江苏省": {
                "南京市": { longitude: 118.8 },
                "无锡市": { longitude: 120.3 },
                "徐州市": { longitude: 117.2 },
                "常州市": { longitude: 119.9 },
                "苏州市": { longitude: 120.6 },
                "南通市": { longitude: 120.8 },
                "连云港市": { longitude: 119.2 },
                "淮安市": { longitude: 119.0 },
                "盐城市": { longitude: 120.1 },
                "扬州市": { longitude: 119.4 },
                "镇江市": { longitude: 119.4 },
                "泰州市": { longitude: 119.9 },
                "宿迁市": { longitude: 118.3 }
            },
            "浙江省": {
                "杭州市": { longitude: 120.2 },
                "宁波市": { longitude: 121.5 },
                "温州市": { longitude: 120.6 },
                "嘉兴市": { longitude: 120.7 },
                "湖州市": { longitude: 120.1 },
                "绍兴市": { longitude: 120.5 },
                "金华市": { longitude: 119.6 },
                "衢州市": { longitude: 118.8 },
                "舟山市": { longitude: 122.3 },
                "台州市": { longitude: 121.4 },
                "丽水市": { longitude: 119.9 }
            },
            "安徽省": {
                "合肥市": { longitude: 117.3 },
                "芜湖市": { longitude: 118.3 },
                "蚌埠市": { longitude: 117.3 },
                "淮南市": { longitude: 116.7 },
                "马鞍山市": { longitude: 118.5 },
                "淮北市": { longitude: 116.8 },
                "铜陵市": { longitude: 117.8 },
                "安庆市": { longitude: 117.0 },
                "黄山市": { longitude: 118.3 },
                "滁州市": { longitude: 118.3 },
                "阜阳市": { longitude: 115.8 },
                "宿州市": { longitude: 116.9 },
                "六安市": { longitude: 116.5 },
                "亳州市": { longitude: 115.7 },
                "池州市": { longitude: 117.4 },
                "宣城市": { longitude: 118.7 }
            },
            "福建省": {
                "福州市": { longitude: 119.3 },
                "厦门市": { longitude: 118.1 },
                "莆田市": { longitude: 119.0 },
                "三明市": { longitude: 117.6 },
                "泉州市": { longitude: 118.6 },
                "漳州市": { longitude: 117.6 },
                "南平市": { longitude: 118.0 },
                "龙岩市": { longitude: 117.0 },
                "宁德市": { longitude: 119.5 }
            },
            "江西省": {
                "南昌市": { longitude: 115.9 },
                "景德镇市": { longitude: 117.2 },
                "萍乡市": { longitude: 113.8 },
                "九江市": { longitude: 116.0 },
                "新余市": { longitude: 114.9 },
                "鹰潭市": { longitude: 117.0 },
                "赣州市": { longitude: 114.9 },
                "宜春市": { longitude: 114.4 },
                "上饶市": { longitude: 117.9 },
                "吉安市": { longitude: 114.9 },
                "抚州市": { longitude: 116.3 }
            },
            "山东省": {
                "济南市": { longitude: 117.0 },
                "青岛市": { longitude: 120.3 },
                "淄博市": { longitude: 118.0 },
                "枣庄市": { longitude: 117.5 },
                "东营市": { longitude: 118.5 },
                "烟台市": { longitude: 121.4 },
                "潍坊市": { longitude: 119.1 },
                "济宁市": { longitude: 116.5 },
                "泰安市": { longitude: 117.1 },
                "威海市": { longitude: 122.1 },
                "日照市": { longitude: 119.5 },
                "滨州市": { longitude: 118.0 },
                "德州市": { longitude: 116.3 },
                "聊城市": { longitude: 115.9 },
                "临沂市": { longitude: 118.3 },
                "菏泽市": { longitude: 115.4 }
            },
            "河南省": {
                "郑州市": { longitude: 113.6 },
                "开封市": { longitude: 114.3 },
                "洛阳市": { longitude: 112.4 },
                "平顶山市": { longitude: 113.3 },
                "安阳市": { longitude: 114.3 },
                "鹤壁市": { longitude: 114.3 },
                "新乡市": { longitude: 113.9 },
                "焦作市": { longitude: 113.2 },
                "濮阳市": { longitude: 115.0 },
                "许昌市": { longitude: 113.8 },
                "漯河市": { longitude: 114.0 },
                "三门峡市": { longitude: 111.9 },
                "南阳市": { longitude: 112.5 },
                "商丘市": { longitude: 115.6 },
                "信阳市": { longitude: 114.0 },
                "周口市": { longitude: 114.6 },
                "驻马店市": { longitude: 114.0 },
                "济源市": { longitude: 112.6 }
            },
            "湖北省": {
                "武汉市": { longitude: 114.3 },
                "黄石市": { longitude: 114.9 },
                "十堰市": { longitude: 110.7 },
                "宜昌市": { longitude: 111.3 },
                "襄阳市": { longitude: 112.1 },
                "鄂州市": { longitude: 114.8 },
                "荆门市": { longitude: 112.2 },
                "孝感市": { longitude: 113.9 },
                "荆州市": { longitude: 112.2 },
                "黄冈市": { longitude: 114.8 },
                "咸宁市": { longitude: 114.3 },
                "随州市": { longitude: 113.3 },
                "恩施土家族苗族自治州": { longitude: 109.4 },
                "仙桃市": { longitude: 113.4 },
                "潜江市": { longitude: 112.9 },
                "天门市": { longitude: 113.1 },
                "神农架林区": { longitude: 110.3 }
            },
            "湖南省": {
                "长沙市": { longitude: 113.0 },
                "株洲市": { longitude: 113.1 },
                "湘潭市": { longitude: 112.9 },
                "衡阳市": { longitude: 112.6 },
                "邵阳市": { longitude: 111.4 },
                "岳阳市": { longitude: 113.1 },
                "常德市": { longitude: 111.6 },
                "张家界市": { longitude: 110.4 },
                "益阳市": { longitude: 112.3 },
                "郴州市": { longitude: 113.0 },
                "永州市": { longitude: 111.6 },
                "怀化市": { longitude: 110.0 },
                "娄底市": { longitude: 112.0 },
                "湘西土家族苗族自治州": { longitude: 109.7 }
            },
            "广东省": {
                "广州市": { longitude: 113.2 },
                "韶关市": { longitude: 113.6 },
                "深圳市": { longitude: 114.0 },
                "珠海市": { longitude: 113.5 },
                "汕头市": { longitude: 116.6 },
                "佛山市": { longitude: 113.1 },
                "江门市": { longitude: 113.0 },
                "湛江市": { longitude: 110.3 },
                "茂名市": { longitude: 110.8 },
                "肇庆市": { longitude: 112.4 },
                "惠州市": { longitude: 114.4 },
                "梅州市": { longitude: 116.1 },
                "汕尾市": { longitude: 115.3 },
                "河源市": { longitude: 114.6 },
                "阳江市": { longitude: 111.9 },
                "清远市": { longitude: 113.0 },
                "东莞市": { longitude: 113.7 },
                "中山市": { longitude: 113.3 },
                "潮州市": { longitude: 116.6 },
                "揭阳市": { longitude: 116.3 },
                "云浮市": { longitude: 112.0 }
            },
            "广西壮族自治区": {
                "南宁市": { longitude: 108.3 },
                "柳州市": { longitude: 109.4 },
                "桂林市": { longitude: 110.2 },
                "梧州市": { longitude: 111.3 },
                "北海市": { longitude: 109.1 },
                "防城港市": { longitude: 108.3 },
                "钦州市": { longitude: 108.6 },
                "贵港市": { longitude: 109.5 },
                "玉林市": { longitude: 110.1 },
                "百色市": { longitude: 106.6 },
                "贺州市": { longitude: 111.5 },
                "河池市": { longitude: 107.9 },
                "来宾市": { longitude: 109.2 },
                "崇左市": { longitude: 107.3 }
            },
            "海南省": {
                "海口市": { longitude: 110.3 },
                "三亚市": { longitude: 109.5 },
                "三沙市": { longitude: 112.3 },
                "儋州市": { longitude: 109.5 },
                "文昌市": { longitude: 110.7 },
                "琼海市": { longitude: 110.4 },
                "万宁市": { longitude: 110.4 },
                "五指山市": { longitude: 109.5 },
                "东方市": { longitude: 108.6 },
                "定安县": { longitude: 110.3 },
                "屯昌县": { longitude: 109.9 },
                "澄迈县": { longitude: 110.0 },
                "临高县": { longitude: 109.7 },
                "白沙黎族自治县": { longitude: 109.4 },
                "昌江黎族自治县": { longitude: 109.0 },
                "乐东黎族自治县": { longitude: 109.1 },
                "陵水黎族自治县": { longitude: 110.0 },
                "保亭黎族苗族自治县": { longitude: 109.7 },
                "琼中黎族苗族自治县": { longitude: 109.8 }
            },
            "重庆市": { "重庆市": { longitude: 106.5 } },
            "四川省": {
                "成都市": { longitude: 104.0 },
                "自贡市": { longitude: 104.7 },
                "攀枝花市": { longitude: 101.7 },
                "泸州市": { longitude: 105.4 },
                "德阳市": { longitude: 104.3 },
                "绵阳市": { longitude: 104.7 },
                "广元市": { longitude: 105.8 },
                "遂宁市": { longitude: 105.5 },
                "内江市": { longitude: 105.0 },
                "乐山市": { longitude: 103.7 },
                "南充市": { longitude: 106.1 },
                "眉山市": { longitude: 103.8 },
                "宜宾市": { longitude: 104.5 },
                "广安市": { longitude: 106.6 },
                "达州市": { longitude: 107.5 },
                "雅安市": { longitude: 103.0 },
                "巴中市": { longitude: 106.7 },
                "资阳市": { longitude: 104.9 },
                "阿坝藏族羌族自治州": { longitude: 102.2 },
                "甘孜藏族自治州": { longitude: 101.9 },
                "凉山彝族自治州": { longitude: 102.2 }
            },
            "贵州省": {
                "贵阳市": { longitude: 106.7 },
                "六盘水市": { longitude: 104.8 },
                "遵义市": { longitude: 106.9 },
                "安顺市": { longitude: 105.9 },
                "毕节市": { longitude: 105.2 },
                "铜仁市": { longitude: 109.1 },
                "黔东南苗族侗族自治州": { longitude: 107.9 },
                "黔南布依族苗族自治州": { longitude: 107.5 },
                "黔西南布依族苗族自治州": { longitude: 104.9 }
            },
            "云南省": {
                "昆明市": { longitude: 102.7 },
                "曲靖市": { longitude: 103.8 },
                "玉溪市": { longitude: 102.5 },
                "保山市": { longitude: 99.1 },
                "昭通市": { longitude: 103.7 },
                "丽江市": { longitude: 100.2 },
                "普洱市": { longitude: 101.0 },
                "临沧市": { longitude: 99.9 },
                "楚雄彝族自治州": { longitude: 101.5 },
                "红河哈尼族彝族自治州": { longitude: 103.4 },
                "文山壮族苗族自治州": { longitude: 104.2 },
                "西双版纳傣族自治州": { longitude: 100.8 },
                "大理白族自治州": { longitude: 100.2 },
                "德宏傣族景颇族自治州": { longitude: 98.6 },
                "怒江傈僳族自治州": { longitude: 98.8 },
                "迪庆藏族自治州": { longitude: 99.7 }
            },
            "西藏自治区": {
                "拉萨市": { longitude: 91.1 },
                "日喀则市": { longitude: 88.8 },
                "昌都市": { longitude: 97.1 },
                "林芝市": { longitude: 94.3 },
                "山南市": { longitude: 91.7 },
                "那曲市": { longitude: 92.0 },
                "阿里地区": { longitude: 80.1 }
            },
            "陕西省": {
                "西安市": { longitude: 108.9 },
                "铜川市": { longitude: 109.1 },
                "宝鸡市": { longitude: 107.1 },
                "咸阳市": { longitude: 108.7 },
                "渭南市": { longitude: 109.5 },
                "延安市": { longitude: 109.4 },
                "汉中市": { longitude: 107.0 },
                "榆林市": { longitude: 109.7 },
                "安康市": { longitude: 109.0 },
                "商洛市": { longitude: 110.0 }
            },
            "甘肃省": {
                "兰州市": { longitude: 103.7 },
                "嘉峪关市": { longitude: 98.2 },
                "金昌市": { longitude: 102.2 },
                "白银市": { longitude: 104.1 },
                "天水市": { longitude: 105.7 },
                "武威市": { longitude: 102.6 },
                "张掖市": { longitude: 100.4 },
                "平凉市": { longitude: 106.6 },
                "酒泉市": { longitude: 98.5 },
                "庆阳市": { longitude: 107.6 },
                "定西市": { longitude: 104.6 },
                "陇南市": { longitude: 104.9 },
                "临夏回族自治州": { longitude: 103.2 },
                "甘南藏族自治州": { longitude: 102.9 }
            },
            "青海省": {
                "西宁市": { longitude: 101.7 },
                "海东市": { longitude: 102.1 },
                "海北藏族自治州": { longitude: 100.9 },
                "黄南藏族自治州": { longitude: 102.0 },
                "海南藏族自治州": { longitude: 100.6 },
                "果洛藏族自治州": { longitude: 100.2 },
                "玉树藏族自治州": { longitude: 97.0 },
                "海西蒙古族藏族自治州": { longitude: 97.0 }
            },
            "宁夏回族自治区": {
                "银川市": { longitude: 106.2 },
                "石嘴山市": { longitude: 106.3 },
                "吴忠市": { longitude: 106.1 },
                "固原市": { longitude: 106.2 },
                "中卫市": { longitude: 105.1 }
            },
            "新疆维吾尔自治区": {
                "乌鲁木齐市": { longitude: 87.6 },
                "克拉玛依市": { longitude: 84.7 },
                "吐鲁番市": { longitude: 89.2 },
                "哈密市": { longitude: 93.5 },
                "昌吉回族自治州": { longitude: 87.3 },
                "博尔塔拉蒙古自治州": { longitude: 82.0 },
                "巴音郭楞蒙古自治州": { longitude: 86.1 },
                "阿克苏地区": { longitude: 80.3 },
                "克孜勒苏柯尔克孜自治州": { longitude: 76.2 },
                "喀什地区": { longitude: 75.9 },
                "和田地区": { longitude: 79.9 },
                "伊犁哈萨克自治州": { longitude: 81.3 },
                "塔城地区": { longitude: 82.9 },
                "阿勒泰地区": { longitude: 88.1 },
                "石河子市": { longitude: 86.0 },
                "阿拉尔市": { longitude: 81.2 },
                "图木舒克市": { longitude: 79.0 },
                "五家渠市": { longitude: 87.2 }
            },
            "香港特别行政区": { "香港": { longitude: 114.1 } },
            "澳门特别行政区": { "澳门": { longitude: 113.5 } },
            "台湾省": {
                "台北市": { longitude: 121.5 },
                "高雄市": { longitude: 120.3 },
                "新北市": { longitude: 121.3 },
                "基隆市": { longitude: 121.7 },
                "新竹市": { longitude: 121.0 },
                "台中市": { longitude: 120.7 },
                "台南市": { longitude: 120.2 }
            }
        };

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
            console.warn('⚠️ lunisolar库未加载，将使用简化计算方法');
        }
    }

    // 获取城市经度
    getCityLongitude(province, city) {
        try {
            // 处理直辖市的情况
            if (this.locationData[province] && this.locationData[province][province]) {
                return this.locationData[province][province].longitude;
            }

            // 处理省份下的城市
            if (this.locationData[province] && this.locationData[province][city]) {
                return this.locationData[province][city].longitude;
            }

            // 如果找不到精确匹配，尝试模糊匹配
            if (this.locationData[province]) {
                const cities = Object.keys(this.locationData[province]);
                for (const cityName of cities) {
                    if (cityName.includes(city) || city.includes(cityName.replace('市', ''))) {
                        return this.locationData[province][cityName].longitude;
                    }
                }
            }

            // 默认使用北京时间（东经120度）
            console.warn(`未找到 ${province} ${city} 的经度数据，使用默认值120度`);
            return 120.0;
        } catch (error) {
            console.error('获取城市经度失败:', error);
            return 120.0;
        }
    }

    // 真太阳时修正
    calculateTrueSolarTime(year, month, day, hour, minute, longitude) {
        try {
            // 中国标准时间使用东经120度
            const standardLongitude = 120.0;

            // 经度时差修正（每度4分钟）
            const longitudeCorrection = (longitude - standardLongitude) * 4;

            // 计算儒略日
            const julianDay = this.calculateJulianDay(year, month, day);

            // 计算时间方程（太阳时与平均太阳时的差值）
            const timeEquation = this.calculateTimeEquation(julianDay);

            // 总修正时间（分钟）
            const totalCorrection = longitudeCorrection + timeEquation;

            // 修正后的时间
            const totalMinutes = hour * 60 + minute + totalCorrection;
            const correctedHour = Math.floor(totalMinutes / 60);
            const correctedMinute = Math.round(totalMinutes % 60);

            // 处理跨日情况
            let correctedDay = day;
            let correctedMonth = month;
            let correctedYear = year;
            let finalHour = correctedHour;

            if (finalHour >= 24) {
                finalHour -= 24;
                correctedDay += 1;
                // 简化处理，不考虑月份跨越
            } else if (finalHour < 0) {
                finalHour += 24;
                correctedDay -= 1;
                // 简化处理，不考虑月份跨越
            }

            return {
                year: correctedYear,
                month: correctedMonth,
                day: correctedDay,
                hour: finalHour,
                minute: correctedMinute,
                correction: totalCorrection,
                longitudeCorrection: longitudeCorrection,
                timeEquation: timeEquation
            };
        } catch (error) {
            console.error('真太阳时修正失败:', error);
            return {
                year: year,
                month: month,
                day: day,
                hour: hour,
                minute: minute,
                correction: 0,
                longitudeCorrection: 0,
                timeEquation: 0
            };
        }
    }

    // 计算儒略日
    calculateJulianDay(year, month, day) {
        if (month <= 2) {
            year -= 1;
            month += 12;
        }

        const a = Math.floor(year / 100);
        const b = 2 - a + Math.floor(a / 4);

        return Math.floor(365.25 * (year + 4716)) +
               Math.floor(30.6001 * (month + 1)) +
               day + b - 1524.5;
    }

    // 计算时间方程（简化版本）
    calculateTimeEquation(julianDay) {
        // 计算自2000年1月1日以来的天数
        const n = julianDay - 2451545.0;

        // 平均近点角（度）
        const M = (357.5291 + 0.98560028 * n) % 360;

        // 转换为弧度
        const MRad = M * Math.PI / 180;

        // 简化的时间方程计算（分钟）
        const E = 4 * (
            1.914 * Math.sin(MRad) +
            0.020 * Math.sin(2 * MRad) -
            2.466 * Math.sin(2 * (23.44 * Math.PI / 180)) -
            0.053 * Math.sin(4 * (23.44 * Math.PI / 180))
        );

        return E;
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

    // 八字计算（支持lunisolar库和备用方法）
    calculate(birthData) {
        if (this.lunisolarAvailable) {
            return this.calculateWithLunisolar(birthData);
        } else {
            return this.calculateWithBackup(birthData);
        }
    }

    // 使用lunisolar库进行精确八字计算
    calculateWithLunisolar(birthData) {

        try {
            const { year, month, day, hour, minute = 0, gender, birthProvince, birthCity } = birthData;

            // 获取出生地经度
            const longitude = this.getCityLongitude(birthProvince, birthCity);

            // 进行真太阳时修正
            const trueSolarTime = this.calculateTrueSolarTime(year, month, day, hour, minute, longitude);

            // 构建修正后的日期时间字符串
            const datetime = `${trueSolarTime.year}-${trueSolarTime.month.toString().padStart(2, '0')}-${trueSolarTime.day.toString().padStart(2, '0')} ${trueSolarTime.hour.toString().padStart(2, '0')}:${trueSolarTime.minute.toString().padStart(2, '0')}`;

            console.log('原始时间:', `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
            console.log('真太阳时修正:', datetime);
            console.log('修正详情:', {
                longitude: longitude,
                correction: trueSolarTime.correction,
                longitudeCorrection: trueSolarTime.longitudeCorrection,
                timeEquation: trueSolarTime.timeEquation
            });

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
                // 添加真太阳时修正信息
                trueSolarTimeInfo: {
                    originalTime: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                    correctedTime: datetime,
                    longitude: longitude,
                    correction: trueSolarTime.correction,
                    longitudeCorrection: trueSolarTime.longitudeCorrection,
                    timeEquation: trueSolarTime.timeEquation,
                    location: `${birthProvince} ${birthCity}`
                },
                // 添加真太阳时修正信息
                trueSolarTimeInfo: {
                    originalTime: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                    correctedTime: datetime,
                    longitude: longitude,
                    correction: trueSolarTime.correction,
                    longitudeCorrection: trueSolarTime.longitudeCorrection,
                    timeEquation: trueSolarTime.timeEquation,
                    location: `${birthProvince} ${birthCity}`
                },
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

    // 备用计算方法（不依赖lunisolar库）
    calculateWithBackup(birthData) {
        try {
            const { year, month, day, hour, minute = 0, gender, birthProvince, birthCity } = birthData;

            console.log('使用备用计算方法:', `${year}-${month}-${day} ${hour}:${minute}`);

            // 简化的八字计算
            const yearPillar = this.getYearPillar(year);
            const monthPillar = this.getMonthPillar(year, month);
            const dayPillar = this.getDayPillar(year, month, day);
            const hourPillar = this.getHourPillar(dayPillar[0], hour);

            // 计算十神
            const dayTianGan = dayPillar[0];
            const yearTenGod = this.calculateTenGods(dayTianGan, yearPillar[0]);
            const monthTenGod = this.calculateTenGods(dayTianGan, monthPillar[0]);
            const hourTenGod = this.calculateTenGods(dayTianGan, hourPillar[0]);

            // 简化的大运计算
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
                lunarInfo: {
                    date: '农历信息需要lunisolar库支持',
                    year: year,
                    month: month,
                    day: day,
                    hour: hour,
                    isLeapMonth: false
                },
                solarTerm: '节气信息需要lunisolar库支持',
                hiddenStems: {
                    year: [yearPillar[0]],
                    month: [monthPillar[0]],
                    day: [dayPillar[0]],
                    hour: [hourPillar[0]]
                },
                hiddenStemsAnalysis: {},
                calculationMethod: 'backup',
                fullBazi: `${yearPillar} ${monthPillar} ${dayPillar} ${hourPillar}`,
                // 简化的真太阳时修正信息
                trueSolarTimeInfo: {
                    originalTime: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                    correctedTime: `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
                    longitude: this.getCityLongitude(birthProvince, birthCity),
                    correction: 0,
                    longitudeCorrection: 0,
                    timeEquation: 0,
                    location: `${birthProvince} ${birthCity}`
                },
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
            console.error('备用计算失败:', error);
            throw new Error(`八字计算失败: ${error.message}`);
        }
    }

    // 农历转公历功能
    lunarToSolar(lunarData) {
        if (!this.lunisolarAvailable) {
            return {
                error: true,
                message: '农历转换功能需要lunisolar库支持，请加载lunisolar库后重试',
                solarDate: null,
                lunarDate: null,
                bazi: null,
                solarTerm: null
            };
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

    // 简化的年柱计算
    getYearPillar(year) {
        // 简化算法：以甲子年为基准（1984年）
        const baseYear = 1984;
        const yearOffset = (year - baseYear) % 60;
        const tianGanIndex = yearOffset % 10;
        const diZhiIndex = yearOffset % 12;

        return this.tianGan[tianGanIndex < 0 ? tianGanIndex + 10 : tianGanIndex] +
               this.diZhi[diZhiIndex < 0 ? diZhiIndex + 12 : diZhiIndex];
    }

    // 简化的月柱计算
    getMonthPillar(year, month) {
        // 简化算法：基于年干推月干
        const yearTianGan = this.getYearPillar(year)[0];
        const yearTianGanIndex = this.tianGan.indexOf(yearTianGan);

        // 月干计算公式（简化）
        const monthTianGanIndex = (yearTianGanIndex * 2 + month + 1) % 10;
        const monthDiZhiIndex = (month + 1) % 12;

        return this.tianGan[monthTianGanIndex] + this.diZhi[monthDiZhiIndex];
    }

    // 简化的日柱计算
    getDayPillar(year, month, day) {
        // 简化算法：基于公历日期计算
        const date = new Date(year, month - 1, day);
        const daysSince1900 = Math.floor((date.getTime() - new Date(1900, 0, 1).getTime()) / (1000 * 60 * 60 * 24));

        const tianGanIndex = daysSince1900 % 10;
        const diZhiIndex = daysSince1900 % 12;

        return this.tianGan[tianGanIndex] + this.diZhi[diZhiIndex];
    }

    // 简化的时柱计算
    getHourPillar(dayTianGan, hour) {
        const dayTianGanIndex = this.tianGan.indexOf(dayTianGan);

        // 时辰地支
        let hourDiZhiIndex;
        if (hour >= 23 || hour < 1) hourDiZhiIndex = 0; // 子时
        else if (hour >= 1 && hour < 3) hourDiZhiIndex = 1; // 丑时
        else if (hour >= 3 && hour < 5) hourDiZhiIndex = 2; // 寅时
        else if (hour >= 5 && hour < 7) hourDiZhiIndex = 3; // 卯时
        else if (hour >= 7 && hour < 9) hourDiZhiIndex = 4; // 辰时
        else if (hour >= 9 && hour < 11) hourDiZhiIndex = 5; // 巳时
        else if (hour >= 11 && hour < 13) hourDiZhiIndex = 6; // 午时
        else if (hour >= 13 && hour < 15) hourDiZhiIndex = 7; // 未时
        else if (hour >= 15 && hour < 17) hourDiZhiIndex = 8; // 申时
        else if (hour >= 17 && hour < 19) hourDiZhiIndex = 9; // 酉时
        else if (hour >= 19 && hour < 21) hourDiZhiIndex = 10; // 戌时
        else hourDiZhiIndex = 11; // 亥时

        // 时干计算公式
        const hourTianGanIndex = (dayTianGanIndex * 2 + hourDiZhiIndex) % 10;

        return this.tianGan[hourTianGanIndex] + this.diZhi[hourDiZhiIndex];
    }
}

// 导出模块
window.BaziCalculator = BaziCalculator;
