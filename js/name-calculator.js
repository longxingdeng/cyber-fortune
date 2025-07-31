// 赛博论命 - 起名计算模块

class NameCalculator {
    // 五行属性字典（完整版）
    constructor() {
        this.wuXingDict = {
            '木': ['甲','乙','寅','卯','东','青','春','生','长','仁','柔','曲','直','酸','肝','角','风','麦','李','鸡'],
            '火': ['丙','丁','巳','午','南','红','夏','热','明','礼','急','上','炎','苦','心','徵','暑','黍','杏','羊'],
            '土': ['戊','己','辰','戌','丑','未','中','黄','季夏','厚','信','重','载','化','甘','脾','宫','湿','稷','枣','牛'],
            '金': ['庚','辛','申','酉','西','白','秋','凉','收','义','刚','锐','利','辛','肺','商','燥','稻','桃','马'],
            '水': ['壬','癸','亥','子','北','黑','冬','寒','藏','智','柔','下','润','咸','肾','羽','寒','豆','栗','猪']
        };

        // 常用起名用字五行属性
        this.charWuXing = {
            // 木属性字 (32字)
            '木': ['林','森','树','枝','叶','花','草','竹','松','柏','梅','兰','菊','莲','荷','芳','芬','芸','苗','茂','英','华','蓝','绿','青','蓉','芊','茉','葵','枫','楠','桦'],

            // 火属性字 (31字)
            '火': ['火','炎','焰','烈','热','暖','阳','光','明','亮','辉','灿','烂','红','朱','丹','彤','赤','晨','昊','昕','晓','晖','煌','煜','煊','炜','炫','熙','烨','焕'],

            // 土属性字 (33字)
            '土': ['土','地','山','岩','石','岗','峰','岭','坤','培','城','堡','墨','黄','棕','褐','厚','重','稳','安','宁','静','和','平','堂','基','圣','域','增','坦','硕','磊','垣'],

            // 金属性字 (32字)
            '金': ['金','银','铜','铁','钢','锋','利','刀','剑','钟','铃','锦','钰','鑫','白','素','洁','净','清','爽','刚','强','坚','硬','锐','铮','铭','铠','钧','铄','镇','锴'],

            // 水属性字 (33字)
            '水': ['水','江','河','湖','海','波','浪','流','溪','泉','雨','雪','冰','霜','露','云','雾','黑','蓝','深','润','湿','柔','软','沛','涵','涛','浩','泽','渊','潇','澜','汐']
        };

        // 完整三才配置吉凶表（天格-人格-地格）
        this.sanCaiTable = {
            /* 木系三才（天格1） */
            '111': '大吉', '112': '大吉', '113': '大吉', '114': '凶', '115': '半吉',
            '121': '大吉', '122': '中吉', '123': '大吉', '124': '凶', '125': '大凶',
            '131': '凶', '132': '中吉', '133': '中吉', '134': '凶', '135': '凶',
            '141': '大凶', '142': '大凶', '143': '凶', '144': '大凶', '145': '大凶',
            '151': '凶', '152': '凶', '153': '凶', '154': '大凶', '155': '凶',
            
            /* 火系三才（天格2） */
            '211': '大吉', '212': '大吉', '213': '大吉', '214': '凶', '215': '凶',
            '221': '大吉', '222': '中吉', '223': '大吉', '224': '凶', '225': '大凶',
            '231': '中吉', '232': '大吉', '233': '大吉', '234': '大吉', '235': '中吉',
            '241': '凶', '242': '凶', '243': '凶', '244': '凶', '245': '大凶',
            '251': '凶', '252': '大凶', '253': '凶', '254': '凶', '255': '凶',
            
            /* 土系三才（天格3） */
            '311': '凶', '312': '中吉', '313': '凶', '314': '凶', '315': '凶',
            '321': '大吉', '322': '大吉', '323': '大吉', '324': '中吉', '325': '凶',
            '331': '凶', '332': '大吉', '333': '大吉', '334': '大吉', '335': '凶',
            '341': '凶', '342': '凶', '343': '大吉', '344': '大吉', '345': '大吉',
            '351': '凶', '352': '凶', '353': '凶', '354': '中吉', '355': '凶',
            
            /* 金系三才（天格4） */
            '411': '凶', '412': '凶', '413': '凶', '414': '大凶', '415': '凶',
            '421': '凶', '422': '凶', '423': '中吉', '424': '凶', '425': '大凶',
            '431': '凶', '432': '中吉', '433': '中吉', '434': '大吉', '435': '中吉',
            '441': '凶', '442': '凶', '443': '大吉', '444': '中平', '445': '中吉',
            '451': '中吉', '452': '凶', '453': '中吉', '454': '中吉', '455': '大吉',
            
            /* 水系三才（天格5） */
            '511': '中吉', '512': '中吉', '513': '中吉', '514': '凶', '515': '大吉',
            '521': '大凶', '522': '大凶', '523': '凶', '524': '凶', '525': '大凶',
            '531': '凶', '532': '中吉', '533': '中吉', '534': '中吉', '535': '凶',
            '541': '凶', '542': '凶', '543': '中吉', '544': '中吉', '545': '大吉',
            '551': '大吉', '552': '凶', '553': '凶', '554': '大吉', '555': '中平'
        };

        // 增强版常用好字推荐（每个属性20字）
        this.goodChars = {
            '男': {
                '木': ['林','森','杰','楠','松','柏','梓','桐','栋','彬','楷','枫','榕','楚','柯','荣','桓','权','森','栋','梁','杨','柳','桂','桦','梧','棠','棣','森','棋'],
                '火': ['炎','焱','煜','烨','辉','晖','明','昊','晨','旭','炜','炫','熙','煊','灿','炅','烽','熠','晟','曜','煦','赫','阳','朗','曜','昭','昱','炯','灼','焕'],
                '土': ['坤','培','城','墨','轩','宇','安','宁','稳','厚','基','圣','堂','坚','磊','硕','增','坦','垚','圭','垣','峥','嵘','岗','崇','峻','峰','岱','岩','峥'],
                '金': ['鑫','锋','钢','铭','锐','钰','刚','强','坚','毅','铮','铄','铠','钧','锦','锐','锴','镇','镕','铎','钊','钺','锟','镐','铮','铉','锏','铖','铠','铧'],
                '水': ['江','河','海','波','涛','润','泽','洋','浩','渊','沛','涵','瀚','灏','潇','澜','泓','浚','淳','澈','湛','澎','淼','溪','潮','沐','泷','淞','淮','溟']
            },
            '女': {
                '木': ['林','梅','兰','菊','莲','荷','芳','芬','芸','蕾','蓉','芊','茉','葵','薇','茜','蕊','萱','芙','苓','芷','茵','蔓','菁','蕾','荔','檬','檬','樱','杉','桐'],
                '火': ['晨','昕','晓','晖','丹','彤','红','朱','灿','烂','晴','晶','灵','暖','晗','旻','昭','晗','焓','熠','煊','煖','烨','煐','煣','熳','煜','焓','煣','焫'],
                '土': ['安','宁','静','和','平','雅','素','纯','真','美','婉','娴','娅','怡','圆','容','宛','岚','岫','岑','培','埼','堇','垭','垚','堃','墁','墀','墨','圭'],
                '金': ['银','钰','锦','白','素','洁','净','清','爽','雪','铃','铭','锐','锶','铱','镘','铂','钗','钏','钤','铄','锘','镱','锌','锜','镟','锶','锳','钰','锦'],
                '水': ['雨','雪','露','云','雾','润','湿','柔','软','清','汐','滢','沐','湉','泠','沁','泺','浣','涓','漪','湄','潇','潞','澜','澄','潆','澍','漩','滟','潋']
            }
        };
    }

    // 计算字的笔画数（完整版）
    getCharStrokes(char) {
        // 完整的汉字笔画数据库
        const strokesDatabase = {
            // 数字
            '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9, '十': 2,
            '零': 13, '百': 6, '千': 3, '万': 3,

            // 常见姓氏
            '王': 4, '李': 7, '张': 11, '刘': 15, '陈': 16, '杨': 13, '赵': 14, '黄': 12, '周': 8, '吴': 7,
            '徐': 10, '孙': 6, '胡': 9, '朱': 6, '高': 10, '林': 8, '何': 7, '郭': 15, '马': 10, '罗': 19,
            '梁': 11, '宋': 7, '郑': 19, '谢': 17, '韩': 17, '唐': 10, '冯': 12, '于': 3, '董': 15, '萧': 18,
            '程': 12, '曹': 11, '袁': 10, '邓': 19, '许': 11, '傅': 12, '沈': 7, '曾': 12, '彭': 12, '吕': 7,
            '苏': 22, '卢': 16, '蒋': 17, '蔡': 17, '贾': 13, '丁': 2, '魏': 18, '薛': 19, '叶': 15, '阎': 16,
            '余': 7, '潘': 16, '杜': 7, '戴': 18, '夏': 10, '钟': 17, '汪': 8, '田': 5, '任': 6, '姜': 9,
            '范': 15, '方': 4, '石': 5, '姚': 9, '谭': 19, '廖': 14, '邹': 17, '熊': 14, '金': 8, '陆': 16,
            '郝': 14, '孔': 4, '白': 5, '崔': 11, '康': 11, '毛': 4, '邱': 12, '秦': 10, '江': 7, '史': 5,
            '顾': 21, '侯': 9, '邵': 12, '孟': 8, '龙': 16, '万': 15, '段': 9, '漕': 14, '钱': 16, '汤': 13,

            // 木属性字
            '林': 8, '森': 12, '树': 16, '枝': 8, '叶': 15, '花': 10, '草': 12, '竹': 6, '松': 8, '柏': 9,
            '梅': 11, '兰': 23, '菊': 14, '莲': 17, '荷': 13, '芳': 10, '芬': 10, '芸': 10, '苗': 11, '茂': 11,
            '英': 11, '华': 14, '蓝': 20, '绿': 14, '青': 8, '杰': 12, '楠': 13, '梓': 11, '桐': 10, '栋': 12,
            '彬': 11, '桂': 10, '柳': 9, '榆': 13, '槐': 14, '桃': 10, '李': 7, '杏': 7, '梨': 11, '橘': 16,
            '柿': 9, '枫': 13, '桔': 10, '柚': 9, '榴': 14, '樱': 21, '桉': 10, '柠': 18, '檬': 17, '椰': 13,
            '棕': 12, '椿': 13, '槟': 14, '榔': 14, '桦': 16, '杨': 13, '柳': 9, '榕': 14, '梧': 11, '桐': 10,
            '枳': 9, '枸': 9, '杞': 7, '桑': 10, '榆': 13, '槿': 15, '棠': 12, '棣': 12, '椴': 12, '榛': 14,
            '栗': 10, '柞': 9, '栎': 10, '椽': 13, '檀': 17, '楸': 13, '梣': 11, '楝': 13, '楮': 13, '榉': 13,

            // 火属性字
            '火': 4, '炎': 8, '焰': 12, '烈': 10, '热': 15, '暖': 13, '阳': 17, '光': 6, '明': 8, '亮': 9,
            '辉': 15, '灿': 17, '烂': 15, '红': 9, '朱': 6, '丹': 4, '彤': 7, '赤': 7, '晨': 11, '昊': 8,
            '昕': 8, '晓': 16, '晖': 13, '煌': 13, '炜': 13, '烨': 16, '焕': 11, '炳': 9, '烽': 11, '焯': 12,
            '炫': 9, '炯': 9, '烁': 19, '熠': 15, '燃': 16, '燎': 16, '燊': 16, '燚': 16, '焱': 12, '煜': 13,
            '熹': 16, '燧': 17, '燔': 16, '燊': 16, '燿': 18, '爝': 19, '爟': 20, '爨': 29, '灵': 24, '灿': 17,
            '烂': 15, '灼': 7, '炙': 8, '烤': 10, '焙': 12, '烘': 10, '焖': 12, '煎': 13, '炒': 8, '炖': 9,
            '煮': 12, '蒸': 16, '烧': 16, '焚': 12, '燃': 16, '燥': 17, '燎': 16, '燃': 16, '燧': 17, '燔': 16,

            // 土属性字
            '土': 3, '地': 6, '山': 3, '岩': 8, '石': 5, '岗': 7, '峰': 10, '岭': 17, '坤': 8, '培': 11,
            '城': 10, '堡': 12, '墨': 15, '黄': 12, '棕': 12, '褐': 16, '厚': 9, '重': 9, '稳': 19, '安': 6,
            '宁': 14, '静': 16, '和': 8, '平': 5, '坚': 11, '固': 8, '垒': 18, '堆': 11, '塔': 13, '墙': 17,
            '坡': 8, '坑': 7, '坎': 7, '坝': 7, '坪': 8, '坦': 8, '垂': 8, '型': 9, '垃': 8, '圾': 6,
            '埋': 10, '埃': 10, '域': 11, '堤': 12, '塘': 13, '墓': 14, '增': 15, '墟': 15, '壁': 16, '壤': 20,
            '圳': 6, '圩': 6, '圪': 6, '圭': 6, '圮': 5, '圯': 6, '地': 6, '圳': 6, '圹': 7, '场': 12,
            '坊': 7, '坍': 7, '坎': 7, '坏': 7, '坐': 7, '坑': 7, '块': 7, '坚': 11, '坛': 7, '坜': 8,

            // 金属性字
            '金': 8, '银': 14, '铜': 14, '铁': 21, '钢': 16, '锋': 15, '利': 7, '刀': 2, '剑': 15, '钟': 17,
            '铃': 13, '锦': 16, '钰': 13, '鑫': 24, '白': 5, '素': 10, '洁': 16, '净': 8, '清': 12, '爽': 11,
            '刚': 10, '强': 12, '坚': 11, '硬': 12, '锐': 15, '铭': 14, '钊': 10, '钧': 12, '铨': 14, '银': 14,
            '铸': 14, '链': 16, '锁': 18, '锤': 16, '锯': 16, '锹': 16, '锻': 17, '镀': 18, '镇': 18, '镜': 19,
            '钉': 10, '钓': 11, '钗': 11, '钙': 11, '钛': 11, '钜': 12, '钝': 12, '钞': 12, '钟': 17, '钠': 11,
            '钢': 16, '钣': 11, '钤': 11, '钥': 11, '钦': 12, '钧': 12, '钨': 12, '钩': 12, '钪': 11, '钫': 11,
            '钬': 11, '钭': 11, '钮': 12, '钯': 12, '钰': 13, '钱': 16, '钲': 13, '钳': 13, '钴': 13, '钵': 13,

            // 水属性字
            '水': 4, '江': 7, '河': 9, '湖': 13, '海': 11, '波': 9, '浪': 11, '流': 10, '溪': 14, '泉': 9,
            '雨': 8, '雪': 11, '冰': 6, '霜': 17, '露': 21, '云': 12, '雾': 19, '黑': 12, '蓝': 20, '深': 12,
            '润': 16, '湿': 17, '柔': 9, '软': 11, '涛': 18, '泽': 17, '洋': 10, '浩': 11, '渊': 12, '淼': 12,
            '沁': 8, '沂': 8, '沃': 8, '沅': 8, '沆': 8, '沈': 7, '沉': 8, '沐': 8, '沙': 8, '沛': 8,
            '河': 9, '治': 9, '沼': 9, '沽': 9, '沾': 9, '沿': 9, '泂': 8, '泃': 9, '泄': 9, '泅': 9,
            '泆': 9, '泇': 9, '泈': 9, '泉': 9, '泊': 9, '泌': 9, '泍': 9, '泎': 9, '泏': 9, '泐': 9,
            '泑': 9, '泒': 9, '泓': 9, '泔': 9, '法': 9, '泖': 9, '泗': 9, '泘': 9, '泙': 9, '泚': 9,

            // 常用起名字
            '文': 4, '武': 8, '德': 15, '仁': 4, '义': 13, '礼': 18, '智': 12, '信': 9, '忠': 8, '孝': 7,
            '廉': 13, '耻': 10, '温': 13, '良': 7, '恭': 10, '俭': 15, '让': 24, '慈': 14, '爱': 13, '敬': 13,
            '诚': 14, '谦': 17, '和': 8, '睦': 13, '友': 4, '善': 12, '美': 9, '好': 6, '优': 17, '秀': 7,
            '才': 4, '华': 14, '富': 12, '贵': 12, '荣': 14, '显': 23, '达': 16, '成': 7, '功': 5,
            '立': 5, '业': 13, '建': 9, '设': 11, '创': 12, '新': 13, '进': 15, '步': 7, '发': 12, '展': 10,
            '兴': 16, '旺': 8, '盛': 12, '昌': 8, '隆': 17, '泰': 9, '安': 6, '康': 11, '健': 11, '寿': 14,
            '福': 14, '禄': 13, '喜': 12, '财': 10, '运': 16, '亨': 7, '通': 14, '顺': 12, '利': 7,
            '吉': 6, '祥': 11, '如': 6, '意': 13, '称': 14, '心': 4, '满': 15, '足': 7, '快': 8, '乐': 15,
            '幸': 8, '圆': 13, '堂': 11, '红': 9, '腾': 20, '飞': 9, '翱': 18, '翔': 12, '展': 10, '翅': 17,
            '高': 10, '远': 17, '航': 10, '行': 6, '取': 8, '奋': 16, '斗': 4, '拼': 10, '搏': 14,
            '努': 7, '力': 2, '勤': 13, '刻': 8, '苦': 11, '认': 14, '真': 10, '专': 11,
            '致': 15, '志': 7, '持': 10, '恒': 10, '毅': 15, '勇': 9, '敢': 12,
            '果': 8, '断': 18, '决': 7, '念': 8, '理': 12, '想': 13, '目': 5, '标': 15,
            '方': 4, '向': 6, '道': 16, '路': 13, '途': 14, '径': 10, '桥': 16, '梁': 11, '阶': 12, '梯': 11,

            // 更多常用字
            '天': 4, '地': 6, '人': 2, '中': 4, '国': 11, '家': 10, '学': 16, '生': 5, '会': 13, '年': 6,
            '时': 10, '日': 4, '月': 4, '星': 9, '辰': 7, '宇': 6, '宙': 8, '世': 5, '界': 9, '万': 15,
            '千': 3, '百': 6, '十': 2, '个': 10, '第': 11, '次': 6, '每': 7, '都': 16, '很': 9, '最': 12,
            '更': 7, '还': 16, '也': 3, '就': 12, '只': 5, '能': 10, '要': 9, '会': 13, '可': 5, '以': 5,
            '上': 3, '下': 3, '前': 9, '后': 9, '左': 5, '右': 5, '东': 8, '南': 9, '西': 6, '北': 5,
            '里': 13, '外': 5, '内': 4, '边': 22, '面': 9, '头': 16, '尾': 7, '身': 7, '手': 4, '脚': 13,
            '眼': 11, '耳': 6, '鼻': 14, '口': 3, '牙': 4, '舌': 6, '头': 16, '发': 12, '脸': 17, '颜': 18,
            '色': 6, '黑': 12, '白': 5, '红': 9, '绿': 14, '蓝': 20, '黄': 12, '紫': 12, '粉': 10, '灰': 6,
            '大': 3, '小': 3, '长': 8, '短': 12, '高': 10, '低': 7, '宽': 15, '窄': 10, '厚': 9, '薄': 16,
            '深': 12, '浅': 11, '重': 9, '轻': 14, '快': 8, '慢': 15, '早': 6, '晚': 12, '新': 13, '旧': 18,
            '多': 6, '少': 4, '全': 6, '半': 5, '空': 8, '满': 15, '净': 8, '脏': 11, '干': 3, '湿': 17,
            '冷': 7, '热': 15, '温': 13, '凉': 10, '暖': 13, '亮': 9, '暗': 13, '明': 8, '清': 12, '浊': 11,
            '甜': 11, '苦': 11, '酸': 14, '辣': 14, '咸': 9, '淡': 12, '香': 9, '臭': 10, '好': 6, '坏': 7,
            '对': 14, '错': 16, '是': 9, '非': 8, '真': 10, '假': 11, '正': 5, '反': 4, '直': 8, '弯': 9,
            '圆': 13, '方': 4, '尖': 6, '平': 5, '斜': 11, '横': 16, '竖': 9, '粗': 11, '细': 11, '尖': 6,
            '钝': 12, '锋': 15, '利': 7, '钝': 12, '硬': 12, '软': 11, '脆': 10, '韧': 12, '滑': 13, '粗': 11,
            '糙': 16, '光': 6, '滑': 13, '毛': 4, '糙': 16, '平': 5, '凸': 5, '凹': 5, '直': 8, '弯': 9,
            '曲': 6, '折': 7, '断': 18, '连': 14, '接': 11, '分': 4, '合': 6, '开': 12, '关': 6, '进': 15,
            '出': 5, '入': 2, '回': 6, '去': 5, '来': 8, '到': 11, '从': 11, '向': 6, '往': 8, '过': 12,
            '经': 13, '通': 14, '达': 16, '近': 11, '远': 17, '内': 4, '外': 5, '中': 4, '间': 12, '旁': 10,
            '边': 22, '角': 7, '处': 5, '所': 8, '位': 7, '置': 13, '点': 17, '线': 15, '面': 9, '体': 7,
            '形': 7, '状': 7, '样': 15, '种': 14, '类': 9, '别': 7, '同': 6, '异': 11, '似': 6, '像': 14,
            '等': 12, '级': 9, '层': 7, '次': 6, '第': 11, '序': 7, '号': 13, '码': 8, '名': 6, '称': 14,
            '字': 6, '词': 12, '句': 5, '段': 9, '章': 11, '节': 13, '篇': 15, '页': 9, '本': 5, '册': 8,
            '卷': 8, '集': 12, '套': 10, '部': 11, '分': 4, '半': 5, '全': 6, '整': 16, '零': 13, '单': 12,
            '双': 18, '对': 14, '副': 11, '套': 10, '组': 11, '群': 13, '队': 12, '班': 10, '级': 9, '年': 6
        };

        return strokesDatabase[char] || this.calculateStrokesByRadical(char);
    }

    // 根据部首推算笔画数（优化版）
    calculateStrokesByRadical(char) {
        // 优化笔画估算：结合Unicode区块和常见结构
        const code = char.charCodeAt(0);
        
        // CJK统一汉字区 (4E00-9FFF)
        if (code >= 0x4E00 && code <= 0x9FFF) {
            // 更精确的笔画估算模型
            const strokeRanges = [
                [0x4E00, 0x4F00, 1, 5],   // 简单字
                [0x4F00, 0x5500, 5, 8],   // 中等字
                [0x5500, 0x6000, 8, 10],  // 较复杂字
                [0x6000, 0x9FFF, 10, 20] // 复杂字
            ];
            
            for (const [start, end, min, max] of strokeRanges) {
                if (code >= start && code < end) {
                    return Math.floor((code - start) / ((end - start) / (max - min))) + min;
                }
            }
        }
        
        // 扩展兼容区 (3400-4DBF)
        if (code >= 0x3400 && code <= 0x4DBF) {
            return 10; // 生僻字默认10画
        }
        
        return 8; // 非汉字字符默认8画
    }

    // 计算五格数理（修正版）
    calculateWuGe(surname, firstName) {
        // 处理复姓情况（如"欧阳"等）
        const isCompoundSurname = surname.length > 1;
        
        // 计算姓氏总笔画（区分单姓/复姓）
        const surnameStrokes = surname.split('').reduce((sum, char) => sum + this.getCharStrokes(char), 0);
        
        // 计算名字总笔画
        const firstNameStrokes = firstName.split('').reduce((sum, char) => sum + this.getCharStrokes(char), 0);
        
        // 天格：单姓+1，复姓直接取和
        const tianGe = isCompoundSurname ? surnameStrokes : surnameStrokes + 1;
        
        // 人格：姓氏末字 + 名字首字
        const surnameLastChar = surname.slice(-1);
        const nameFirstChar = firstName[0] || '';
        const renGe = this.getCharStrokes(surnameLastChar) + (nameFirstChar ? this.getCharStrokes(nameFirstChar) : 0);
        
        // 地格：名字笔画和（单名时+1）
        const diGe = firstName.length === 1 ? 
            this.getCharStrokes(firstName) + 1 : 
            firstNameStrokes;
        
        // 总格：姓+名总笔画
        const zongGe = surnameStrokes + firstNameStrokes;
        
        // 外格：区分单姓/复姓和单名/双名
        let waiGe;
        if (isCompoundSurname) {
            waiGe = firstName.length === 1 ? 
                zongGe - renGe + 1 :  // 复姓单名
                zongGe - renGe;       // 复姓双名
        } else {
            waiGe = firstName.length === 1 ? 
                2 :                   // 单姓单名
                zongGe - renGe + 1;   // 单姓双名
        }
        
        return {
            tianGe,
            renGe,
            diGe,
            waiGe,
            zongGe
        };
    }

    // 计算三才配置（修正版）
    calculateSanCai(wuGe) {
        const { tianGe, renGe, diGe } = wuGe;
        
        // 修正五行转换规则（按个位数对应）
        const getWuXingFromNumber = (num) => {
            const lastDigit = num % 10;
            // 1/2属木，3/4属火，5/6属土，7/8属金，9/0属水
            return ['木', '木', '火', '火', '土', '土', '金', '金', '水', '水'][lastDigit];
        };
        
        const tianWuXing = getWuXingFromNumber(tianGe);
        const renWuXing = getWuXingFromNumber(renGe);
        const diWuXing = getWuXingFromNumber(diGe);
        
        // 五行数字编码
        const wuXingToNum = { '木': 1, '火': 2, '土': 3, '金': 4, '水': 5 };
        const sanCaiCode = `${wuXingToNum[tianWuXing]}${wuXingToNum[renWuXing]}${wuXingToNum[diWuXing]}`;
        
        // 添加默认值处理
        return {
            tianWuXing,
            renWuXing,
            diWuXing,
            sanCaiCode,
            jiXiong: this.sanCaiTable[sanCaiCode] || '平'
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

        // 2. 找出八字中最缺的五行（确保排序稳定性）
        const sortedWuXing = Object.entries(wuxingCount)
            .sort((a, b) => {
                // 首先按数量排序
                if (a[1] !== b[1]) {
                    return a[1] - b[1];
                }
                // 数量相同时按五行顺序排序，确保结果一致
                const wuxingOrder = ['木', '火', '土', '金', '水'];
                return wuxingOrder.indexOf(a[0]) - wuxingOrder.indexOf(b[0]);
            })
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
                // 从排序后的五行中找到第一个不在neededWuXing中的五行
                for (const wuXing of sortedWuXing) {
                    if (!neededWuXing.includes(wuXing)) {
                        neededWuXing.push(wuXing);
                        break;
                    }
                }
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

        // 按分数排序，自定义字优先，然后返回前10个（确保排序稳定性）
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
                if (a.score !== b.score) {
                    return b.score - a.score;
                }
                // 分数相同时按姓名字典序排序，确保结果一致
                return a.fullName.localeCompare(b.fullName);
            })
            .slice(0, 10);
    }

    // 判断字的五行属性
    isCharWuXing(char, wuXing) {
        return this.charWuXing[wuXing] && this.charWuXing[wuXing].includes(char);
    }

    // 获取单个字的五行属性
    getCharWuXing(char) {
        // 按固定顺序遍历五行，确保结果一致
        const wuxingOrder = ['木', '火', '土', '金', '水'];
        for (const wuXing of wuxingOrder) {
            const chars = this.charWuXing[wuXing];
            if (chars && chars.includes(char)) {
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

        // 五格评分（按固定顺序遍历，确保结果一致）
        const geOrder = ['tianGe', 'renGe', 'diGe', 'waiGe', 'zongGe'];
        geOrder.forEach(geName => {
            const ge = wuGe[geName];
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
            // 使用getCharWuXing方法，它包含备用的笔画推算逻辑
            const charWuXing = this.getCharWuXing(char);
            if (charWuXing) {
                wuXingCount[charWuXing]++;
            }
        });

        return wuXingCount;
    }

    // 计算五行匹配度（改进版 - 真正的100分制，避免浮点数精度问题）
    calculateWuXingMatch(needed, actual) {
        // 如果没有需要补充的五行，说明八字平衡，返回满分
        if (needed.length === 0) return 100;

        // 使用整数运算避免浮点数精度问题
        let matchScore = 0;
        const totalPoints = 10000; // 使用10000作为基数，最后除以100
        const baseScore = Math.floor(totalPoints / needed.length);

        needed.forEach((wuXing, index) => {
            if (actual[wuXing] > 0) {
                // 基础分数
                let score = baseScore;

                // 第一个五行（最重要的）额外加权 10%
                if (index === 0) {
                    score = Math.floor(score * 11 / 10);
                }

                // 根据字数给予小幅加分（最多5%）
                const charCount = actual[wuXing];
                const bonusPercent = Math.min(charCount * 2, 5); // 每个字2%，最多5%
                score = Math.floor(score * (100 + bonusPercent) / 100);

                matchScore += score;
            }
        });

        // 转换回百分制并确保不超过100
        const finalScore = Math.floor(matchScore / 100);
        return Math.min(100, finalScore);
    }

    // 获取五行匹配度等级评价
    getWuXingMatchLevel(score) {
        if (score >= 90) return { level: '完美', emoji: '🌟', color: '#28a745', desc: '姓名五行与八字需求高度匹配，强烈推荐' };
        if (score >= 70) return { level: '优秀', emoji: '✅', color: '#20c997', desc: '姓名五行与八字需求匹配良好，推荐使用' };
        if (score >= 50) return { level: '良好', emoji: '👍', color: '#ffc107', desc: '姓名五行与八字需求部分匹配，可以考虑' };
        if (score >= 30) return { level: '一般', emoji: '⚠️', color: '#fd7e14', desc: '姓名五行与八字需求匹配度较低，建议调整' };
        return { level: '不佳', emoji: '❌', color: '#dc3545', desc: '姓名五行与八字需求不匹配，建议重新起名' };
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

        prompt += `**重要要求**：\n`;
        prompt += `1. 请深入分析每个候选名字的优缺点\n`;
        prompt += `2. 基于八字命理需求，主动思考是否有更适合的字词组合\n`;
        prompt += `3. 如果你认为有更优秀的名字推荐，请提出1-3个专家推荐名字\n`;
        prompt += `4. 对推荐名字按照同样标准（八字匹配度、五格数理、字义内涵、音韵美学）进行完整分析\n`;
        prompt += `5. 详细说明推荐名字相比候选名字的具体优势和改进之处\n\n`;

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
        prompt += `五行强弱分析：请根据八字分析五行的旺衰情况\n`;
        prompt += `起名指导：在推荐名字时，请优先选择五行属性为【${neededWuXing.join('、')}】的字，以达到五行平衡的效果。同时考虑字义美好、音韵和谐、文化内涵丰富的字词。\n\n`;

        // 自定义字配置
        if (firstChar || secondChar || candidateChars.length > 0) {
            prompt += `自定义用字要求：\n`;
            if (firstChar) {
                prompt += `指定第一个字（辈分字）：${firstChar}\n`;
                prompt += `说明：这是家族辈分字，必须固定在第一个位置\n`;
            }
            if (secondChar) {
                prompt += `指定第二个字（辈分字）：${secondChar}\n`;
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

        prompt += `## 🌟 专家推荐名字（如有更优选择）\n`;
        prompt += `如果你认为有比候选名字更适合的选择，请提出1-3个推荐名字：\n\n`;
        prompt += `### 推荐1. [推荐姓名] - AI综合评分：[分数]/100\n`;
        prompt += `**推荐理由**：[为什么推荐这个名字，相比候选名字的优势]\n`;
        prompt += `**八字匹配度**：[详细分析如何更好地匹配八字]\n`;
        prompt += `**五格数理**：[详细分析五格配置]\n`;
        prompt += `**字义内涵**：\n`;
        prompt += `- [第一个字]：字义、出处典故、文化内涵\n`;
        prompt += `- [第二个字]：字义、出处典故、文化内涵\n`;
        prompt += `- 整体寓意和字词搭配分析\n`;
        prompt += `**音韵美学**：[详细分析音韵效果]\n`;
        prompt += `**综合评价**：[为什么比候选名字更优秀的具体原因]\n\n`;
        prompt += `[如有其他推荐名字，请按同样格式继续]\n\n`;

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
