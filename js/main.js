// 赛博论命 - 主交互脚本

class CyberFortune {
    constructor() {
        this.currentSection = 'home';
        this.baziCalculator = new BaziCalculator();
        this.nameCalculator = new NameCalculator();
        this.marriageCalculator = new MarriageCalculator();

        // 初始化紫薇斗数计算器
        try {
            this.ziweiCalculator = new ZiweiCalculator();
        } catch (error) {
            console.error('紫薇斗数计算器初始化失败:', error);
            this.ziweiCalculator = null;
        }

        this.init();
    }

    init() {
        console.log('Initializing CyberFortune...');
        this.setupNavigation();
        this.setupForms();

        // 延迟填充选择框，确保DOM完全加载
        setTimeout(() => {
            this.populateSelects();
        }, 100);

        this.setupEventListeners();
        this.initGlobalConfig();

        // 再次检查并填充选择框（防止第一次失败）
        setTimeout(() => {
            this.ensureSelectsPopulated();
        }, 500);
    }

    // 设置导航
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.section');
        const featureCards = document.querySelectorAll('.feature-card');

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = item.getAttribute('data-section');
                this.switchSection(targetSection);
            });
        });

        featureCards.forEach(card => {
            card.addEventListener('click', () => {
                const targetSection = card.getAttribute('data-target');
                if (targetSection) {
                    this.switchSection(targetSection);
                }
            });
        });
    }

    // 切换页面
    switchSection(targetSection) {
        const sections = document.querySelectorAll('.section');
        const navItems = document.querySelectorAll('.nav-item');

        // 隐藏所有页面
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // 移除所有导航项的激活状态
        navItems.forEach(item => {
            item.classList.remove('active');
        });

        // 显示目标页面
        const targetElement = document.getElementById(targetSection);
        if (targetElement) {
            targetElement.classList.add('active');
            targetElement.classList.add('section-enter');

            setTimeout(() => {
                targetElement.classList.remove('section-enter');
            }, 500);
        }

        // 激活对应的导航项
        const targetNavItem = document.querySelector(`[data-section="${targetSection}"]`);
        if (targetNavItem) {
            targetNavItem.classList.add('active');
        }

        this.currentSection = targetSection;
    }

    // 设置表单
    setupForms() {
        // 赛博知命表单
        const zhimingForm = document.getElementById('zhiming-form');
        if (zhimingForm) {
            zhimingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleZhimingSubmit(e);
            });
        }

        // 赛博起名表单
        const qimingForm = document.getElementById('qiming-form');
        if (qimingForm) {
            qimingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleQimingSubmit(e);
            });
        }

        // 赛博测名表单
        const cemingForm = document.getElementById('ceming-form');
        if (cemingForm) {
            cemingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCemingSubmit(e);
            });
        }

        // 赛博合婚表单
        const hehunForm = document.getElementById('hehun-form');
        if (hehunForm) {
            hehunForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleHehunSubmit(e);
            });
        }
    }

    // 填充选择框
    populateSelects() {
        console.log('Starting to populate selects...');
        this.populateYears();
        this.populateMonths();
        this.populateDays();
        this.populateProvinces();
        console.log('Finished populating selects');
    }

    // 确保选择框已填充（重试机制）
    ensureSelectsPopulated() {
        console.log('Checking if selects are properly populated...');

        // 检查年份选择框
        const yearSelects = document.querySelectorAll('select[name="birthYear"], select[name="maleBirthYear"], select[name="femaleBirthYear"]');
        let needsRepopulation = false;

        yearSelects.forEach(select => {
            if (select.children.length <= 1) { // 只有默认选项
                console.log(`Year select ${select.name} is empty, needs repopulation`);
                needsRepopulation = true;
            }
        });

        // 检查月份选择框
        const monthSelects = document.querySelectorAll('select[name="birthMonth"], select[name="maleBirthMonth"], select[name="femaleBirthMonth"]');
        monthSelects.forEach(select => {
            if (select.children.length <= 1) { // 只有默认选项
                console.log(`Month select ${select.name} is empty, needs repopulation`);
                needsRepopulation = true;
            }
        });

        if (needsRepopulation) {
            console.log('Repopulating selects...');
            this.populateSelects();
        } else {
            console.log('All selects are properly populated');
        }
    }

    // 填充年份选择框
    populateYears() {
        const yearSelects = document.querySelectorAll('select[name="birthYear"], select[name="maleBirthYear"], select[name="femaleBirthYear"]');
        const currentYear = new Date().getFullYear();

        console.log('Populating years, found selects:', yearSelects.length);

        yearSelects.forEach((select, index) => {
            console.log(`Populating year select ${index}:`, select.name);
            // 清空现有选项（保留第一个默认选项）
            while (select.children.length > 1) {
                select.removeChild(select.lastChild);
            }

            for (let year = currentYear; year >= 1900; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year + '年';
                select.appendChild(option);
            }
            console.log(`Year select ${select.name} populated with ${select.children.length - 1} options`);
        });
    }

    // 填充月份选择框
    populateMonths() {
        const monthSelects = document.querySelectorAll('select[name="birthMonth"], select[name="maleBirthMonth"], select[name="femaleBirthMonth"]');

        console.log('Populating months, found selects:', monthSelects.length);

        monthSelects.forEach((select, index) => {
            console.log(`Populating month select ${index}:`, select.name);
            // 清空现有选项（保留第一个默认选项）
            while (select.children.length > 1) {
                select.removeChild(select.lastChild);
            }

            for (let month = 1; month <= 12; month++) {
                const option = document.createElement('option');
                option.value = month;
                option.textContent = month + '月';
                select.appendChild(option);
            }
            console.log(`Month select ${select.name} populated with ${select.children.length - 1} options`);
        });
    }

    // 填充日期选择框
    populateDays() {
        const daySelects = document.querySelectorAll('select[name="birthDay"], select[name="maleBirthDay"], select[name="femaleBirthDay"]');

        daySelects.forEach(select => {
            for (let day = 1; day <= 31; day++) {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day + '日';
                select.appendChild(option);
            }
        });
    }

    // 填充省份选择框
    populateProvinces() {
        const provinces = [
            '北京市', '天津市', '上海市', '重庆市',
            '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
            '江苏省', '浙江省', '安徽省', '福建省', '江西省', '山东省',
            '河南省', '湖北省', '湖南省', '广东省', '海南省',
            '四川省', '贵州省', '云南省', '陕西省', '甘肃省', '青海省',
            '内蒙古自治区', '广西壮族自治区', '西藏自治区', '宁夏回族自治区', '新疆维吾尔自治区',
            '香港特别行政区', '澳门特别行政区', '台湾省'
        ];

        const provinceSelects = document.querySelectorAll('select[name="birthProvince"], select[name="maleBirthProvince"], select[name="femaleBirthProvince"]');

        provinceSelects.forEach(select => {
            provinces.forEach(province => {
                const option = document.createElement('option');
                option.value = province;
                option.textContent = province;
                select.appendChild(option);
            });
        });
    }

    // 设置事件监听器
    setupEventListeners() {
        // 省份变化时更新城市
        const provinceSelects = document.querySelectorAll('select[name="birthProvince"], select[name="maleBirthProvince"], select[name="femaleBirthProvince"]');
        provinceSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateCities(e.target.value, e.target.closest('form'));
            });
        });

        // 月份变化时更新日期
        const monthSelects = document.querySelectorAll('select[name="birthMonth"], select[name="maleBirthMonth"], select[name="femaleBirthMonth"]');
        monthSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateDaysForTarget(e.target);
            });
        });

        // 年份变化时更新日期
        const yearSelects = document.querySelectorAll('select[name="birthYear"], select[name="maleBirthYear"], select[name="femaleBirthYear"]');
        yearSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateDaysForTarget(e.target);
            });
        });
    }

    // 更新城市选择框
    updateCities(province, form) {
        // 查找对应的城市选择框
        let citySelect = form.querySelector('select[name="birthCity"]');

        // 如果没找到，可能是合婚表单中的男方或女方城市选择框
        if (!citySelect) {
            const provinceSelect = form.querySelector(`select[value="${province}"]`) ||
                                 form.querySelector('select:focus') ||
                                 event.target;

            if (provinceSelect) {
                const provinceName = provinceSelect.name;
                if (provinceName === 'maleBirthProvince') {
                    citySelect = form.querySelector('select[name="maleBirthCity"]');
                } else if (provinceName === 'femaleBirthProvince') {
                    citySelect = form.querySelector('select[name="femaleBirthCity"]');
                }
            }
        }

        if (!citySelect) return;

        // 清空现有选项
        citySelect.innerHTML = '<option value="">选择城市</option>';

        // 从八字计算器获取城市数据
        const cities = this.getCitiesForProvince(province);

        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }

    // 获取指定省份的城市列表
    getCitiesForProvince(province) {
        // 使用八字计算器的经度数据库
        if (!this.baziCalculator || !this.baziCalculator.locationData) {
            return ['市区']; // 备用选项
        }

        const locationData = this.baziCalculator.locationData;

        if (locationData[province]) {
            return Object.keys(locationData[province]);
        }

        return ['市区']; // 备用选项
    }

    // 根据触发的目标元素更新对应的日期选择框
    updateDaysForTarget(targetElement) {
        const form = targetElement.closest('form');
        if (!form) return;

        const targetName = targetElement.name;
        let prefix = '';

        // 根据触发元素的name确定前缀
        if (targetName.includes('male')) {
            prefix = 'male';
        } else if (targetName.includes('female')) {
            prefix = 'female';
        } else {
            prefix = ''; // 通用字段（如知命模块）
        }

        // 构建对应的字段名
        const yearName = prefix ? `${prefix}BirthYear` : 'birthYear';
        const monthName = prefix ? `${prefix}BirthMonth` : 'birthMonth';
        const dayName = prefix ? `${prefix}BirthDay` : 'birthDay';

        // 查找对应的选择框
        const yearSelect = form.querySelector(`select[name="${yearName}"]`);
        const monthSelect = form.querySelector(`select[name="${monthName}"]`);
        const daySelect = form.querySelector(`select[name="${dayName}"]`);

        if (!yearSelect || !monthSelect || !daySelect) return;

        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);

        if (!year || !month) return;

        // 保存当前选中的日期
        const currentDay = daySelect.value;

        // 清空现有选项
        daySelect.innerHTML = '<option value="">选择日期</option>';

        // 计算该月的天数
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            daySelect.appendChild(option);
        }

        // 如果之前选择的日期在新月份中仍然有效，则保持选中
        if (currentDay && parseInt(currentDay) <= daysInMonth) {
            daySelect.value = currentDay;
        }
    }

    // 更新日期选择框（保留原函数以兼容其他调用）
    updateDays(form) {
        // 尝试不同的字段名模式
        const yearSelectors = ['select[name="birthYear"]', 'select[name="maleBirthYear"]', 'select[name="femaleBirthYear"]'];
        const monthSelectors = ['select[name="birthMonth"]', 'select[name="maleBirthMonth"]', 'select[name="femaleBirthMonth"]'];
        const daySelectors = ['select[name="birthDay"]', 'select[name="maleBirthDay"]', 'select[name="femaleBirthDay"]'];

        let yearSelect, monthSelect, daySelect;

        // 查找对应的选择框
        for (let i = 0; i < yearSelectors.length; i++) {
            const year = form.querySelector(yearSelectors[i]);
            const month = form.querySelector(monthSelectors[i]);
            const day = form.querySelector(daySelectors[i]);

            if (year && month && day) {
                yearSelect = year;
                monthSelect = month;
                daySelect = day;
                break;
            }
        }

        if (!yearSelect || !monthSelect || !daySelect) return;

        const year = parseInt(yearSelect.value);
        const month = parseInt(monthSelect.value);

        if (!year || !month) return;

        // 清空现有选项
        daySelect.innerHTML = '<option value="">选择日期</option>';

        // 计算该月的天数
        const daysInMonth = new Date(year, month, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day + '日';
            daySelect.appendChild(option);
        }
    }

    // 处理赛博知命表单提交
    async handleZhimingSubmit(e) {
        const form = e.target;
        const formData = new FormData(form);
        
        const birthData = {
            gender: formData.get('gender'),
            year: parseInt(formData.get('birthYear')),
            month: parseInt(formData.get('birthMonth')),
            day: parseInt(formData.get('birthDay')),
            hour: parseInt(formData.get('birthHour')),
            minute: parseInt(formData.get('birthMinute')) || 0,
            birthProvince: formData.get('birthProvince'),
            birthCity: formData.get('birthCity')
        };

        // 验证数据
        if (!this.validateBirthData(birthData)) {
            this.showError('请填写完整的出生信息');
            return;
        }

        // 显示加载动画
        this.showLoading();

        try {
            // 计算八字
            const baziResult = this.baziCalculator.calculate(birthData);

            // 计算紫薇斗数（如果可用）
            let ziweiResult = null;
            if (this.ziweiCalculator) {
                try {
                    ziweiResult = this.ziweiCalculator.calculate(birthData);
                } catch (ziweiError) {
                    console.error('紫薇斗数计算错误:', ziweiError);
                }
            }

            // 生成AI分析提示词
            const prompt = this.baziCalculator.generatePrompt(birthData, baziResult);

            // 显示结果
            this.displayZhimingResult(birthData, baziResult, prompt, ziweiResult);

        } catch (error) {
            console.error('计算错误:', error);
            this.showError('计算过程中出现错误，请重试');
        } finally {
            this.hideLoading();
        }
    }

    // 验证出生数据
    validateBirthData(data) {
        return data.gender && data.year && data.month && data.day &&
               data.hour !== null && data.minute !== null && data.birthProvince && data.birthCity;
    }

    // 显示加载动画
    showLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'flex';
        }
    }

    // 隐藏加载动画
    hideLoading() {
        const loading = document.getElementById('loading');
        if (loading) {
            loading.style.display = 'none';
        }
    }

    // 显示错误信息
    showError(message) {
        alert(message); // 简化版，实际应该用更好的UI组件
    }

    // 显示赛博知命结果
    displayZhimingResult(birthData, baziResult, prompt, ziweiResult = null) {
        const resultPanel = document.getElementById('zhiming-result');
        const resultContent = resultPanel.querySelector('.result-content');

        if (!resultPanel || !resultContent) return;

        // 构建结果HTML
        const resultHTML = this.buildZhimingResultHTML(birthData, baziResult, prompt, ziweiResult);
        resultContent.innerHTML = resultHTML;

        // 显示结果面板
        resultPanel.style.display = 'block';
        resultPanel.classList.add('show');

        // 绑定AI分析按钮事件
        this.bindAIAnalysisEvents(birthData, baziResult, prompt, ziweiResult);

        // 滚动到结果区域
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // 构建赛博知命结果HTML
    buildZhimingResultHTML(birthData, baziResult, prompt, ziweiResult = null) {
        const { gender, year, month, day, hour, minute, birthProvince, birthCity } = birthData;
        const { yearPillar, monthPillar, dayPillar, hourPillar, yearTenGod, monthTenGod, hourTenGod, bigLuck, wuxingInfo, naYinInfo } = baziResult;

        return `
            <div class="result-header">
                <h3 class="result-title">命理分析报告</h3>
                <div class="result-info">
                    <span>${gender} | ${year}年${month}月${day}日 ${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')} | ${birthProvince} ${birthCity}</span>
                    ${baziResult.calculationMethod === 'backup' ?
                        '<div class="calculation-method-warning">⚠️ 当前使用简化计算方法，建议加载lunisolar库以获得更精确的结果</div>' :
                        '<div class="calculation-method-info">✅ 使用lunisolar库精确计算</div>'
                    }
                </div>
            </div>

            <div class="bazi-chart">
                <h4>八字命盘</h4>
                <div class="pillars-container">
                    <div class="pillar">
                        <div class="pillar-label">年柱</div>
                        <div class="pillar-chars">${yearPillar}</div>
                        <div class="pillar-god">${yearTenGod}</div>
                        <div class="pillar-wuxing">
                            <span class="wuxing-tiangan">${yearPillar[0]}(${wuxingInfo?.year?.tianGan || ''})</span>
                            <span class="wuxing-dizhi">${yearPillar[1]}(${wuxingInfo?.year?.diZhi || ''})</span>
                        </div>
                        <div class="pillar-nayin">${naYinInfo?.year || '未知'}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">月柱</div>
                        <div class="pillar-chars">${monthPillar}</div>
                        <div class="pillar-god">${monthTenGod}</div>
                        <div class="pillar-wuxing">
                            <span class="wuxing-tiangan">${monthPillar[0]}(${wuxingInfo?.month?.tianGan || ''})</span>
                            <span class="wuxing-dizhi">${monthPillar[1]}(${wuxingInfo?.month?.diZhi || ''})</span>
                        </div>
                        <div class="pillar-nayin">${naYinInfo?.month || '未知'}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">日柱</div>
                        <div class="pillar-chars">${dayPillar}</div>
                        <div class="pillar-god">日元</div>
                        <div class="pillar-wuxing">
                            <span class="wuxing-tiangan">${dayPillar[0]}(${wuxingInfo?.day?.tianGan || ''})</span>
                            <span class="wuxing-dizhi">${dayPillar[1]}(${wuxingInfo?.day?.diZhi || ''})</span>
                        </div>
                        <div class="pillar-nayin">${naYinInfo?.day || '未知'}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">时柱</div>
                        <div class="pillar-chars">${hourPillar}</div>
                        <div class="pillar-god">${hourTenGod}</div>
                        <div class="pillar-wuxing">
                            <span class="wuxing-tiangan">${hourPillar[0]}(${wuxingInfo?.hour?.tianGan || ''})</span>
                            <span class="wuxing-dizhi">${hourPillar[1]}(${wuxingInfo?.hour?.diZhi || ''})</span>
                        </div>
                        <div class="pillar-nayin">${naYinInfo?.hour || '未知'}</div>
                    </div>
                </div>
            </div>

            ${baziResult.trueSolarTimeInfo ? `
            <div class="true-solar-time-section">
                <h4>真太阳时修正</h4>
                <div class="time-correction-info">
                    <div class="time-row">
                        <span class="time-label">原始时间：</span>
                        <span class="time-value">${baziResult.trueSolarTimeInfo.originalTime}</span>
                    </div>
                    <div class="time-row">
                        <span class="time-label">修正时间：</span>
                        <span class="time-value">${baziResult.trueSolarTimeInfo.correctedTime}</span>
                    </div>
                    <div class="time-row">
                        <span class="time-label">出生地点：</span>
                        <span class="time-value">${baziResult.trueSolarTimeInfo.location}</span>
                    </div>
                    <div class="time-row">
                        <span class="time-label">经度：</span>
                        <span class="time-value">${baziResult.trueSolarTimeInfo.longitude.toFixed(1)}°E</span>
                    </div>
                    <div class="time-row">
                        <span class="time-label">总修正：</span>
                        <span class="time-value ${baziResult.trueSolarTimeInfo.correction >= 0 ? 'positive' : 'negative'}">
                            ${baziResult.trueSolarTimeInfo.correction >= 0 ? '+' : ''}${baziResult.trueSolarTimeInfo.correction.toFixed(1)}分钟
                        </span>
                    </div>
                    <div class="correction-details">
                        <small>
                            经度修正：${baziResult.trueSolarTimeInfo.longitudeCorrection >= 0 ? '+' : ''}${baziResult.trueSolarTimeInfo.longitudeCorrection.toFixed(1)}分钟 |
                            时间方程：${baziResult.trueSolarTimeInfo.timeEquation >= 0 ? '+' : ''}${baziResult.trueSolarTimeInfo.timeEquation.toFixed(1)}分钟
                        </small>
                    </div>
                </div>
            </div>
            ` : ''}

            <div class="dayun-section">
                <h4>大运信息</h4>
                <div class="dayun-info">
                    <p>起运年龄：${bigLuck.startYear - year}岁（${bigLuck.startYear}年）</p>
                    <div class="dayun-pillars">
                        ${bigLuck.dayun.map((pillar, index) => `
                            <div class="dayun-pillar">
                                <div class="dayun-age">${bigLuck.startYear - year + index * 10}-${bigLuck.startYear - year + (index + 1) * 10 - 1}岁</div>
                                <div class="dayun-chars">${pillar}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            ${this.buildZiweiSection(ziweiResult)}

            <div class="ai-analysis">
                <h4>AI命理分析</h4>

                <!-- 分析选项 -->
                <div class="analysis-options">
                    <label class="option-checkbox">
                        <input type="checkbox" id="add-ziwei-analysis" checked>
                        <span class="checkmark"></span>
                        包含紫薇斗数分析
                    </label>
                </div>

                <!-- 分析按钮 -->
                <div class="analysis-actions">
                    <button class="cyber-button" id="generate-ai-analysis">
                        <span>🤖 生成AI分析</span>
                        <div class="button-glow"></div>
                    </button>
                    <!-- 复制提示词按钮已隐藏，保护商业机密 -->
                </div>

                <!-- 处理状态显示 -->
                <div class="processing-box" id="ai-processing-box" style="display: none;">
                    <div class="processing-message" id="ai-processing-message">正在初始化AI分析...</div>
                    <div class="processing-steps" id="ai-processing-steps"></div>
                </div>

                <!-- AI分析结果 -->
                <div class="ai-result-section" id="ai-result-section" style="display: none;">
                    <h5>AI分析结果：</h5>
                    <div class="ai-output" id="ai-output"></div>
                    <div class="result-actions">
                        <button class="cyber-button" id="copy-ai-result" style="display: none;">
                            <span>📄 复制分析结果</span>
                            <div class="button-glow"></div>
                        </button>
                    </div>
                </div>

                <!-- 错误信息显示 -->
                <div class="api-error-message" id="ai-error-message" style="display: none;"></div>

                <!-- 提示词已隐藏，保护商业机密 -->
            </div>

            <div class="result-actions">
                <div class="download-options">
                    <button class="cyber-button" id="download-pdf-btn">
                        <span>📄 生成PDF报告</span>
                        <div class="button-glow"></div>
                    </button>
                    <button class="cyber-button" id="download-image-btn">
                        <span>🖼️ 下载长图报告</span>
                        <div class="button-glow"></div>
                    </button>
                    <button class="cyber-button secondary" id="download-text-btn">
                        <span>📝 下载文本报告</span>
                        <div class="button-glow"></div>
                    </button>
                    <button class="cyber-button" id="test-canvas-btn" style="background: linear-gradient(45deg, #ff6b6b, #ff8e8e);">
                        <span>🧪 测试Canvas</span>
                        <div class="button-glow"></div>
                    </button>
                </div>
                <div class="download-note">
                    <small>💡 PDF报告将在新窗口中打开，您可以使用浏览器的"打印"功能保存为PDF</small>
                </div>
            </div>
        `;
    }

    // 绑定AI分析相关事件
    bindAIAnalysisEvents(birthData, baziResult, prompt, ziweiResult) {
        const generateBtn = document.getElementById('generate-ai-analysis');
        const copyBtn = document.getElementById('copy-ai-result');
        const downloadPdfBtn = document.getElementById('download-pdf-btn');
        const downloadImageBtn = document.getElementById('download-image-btn');
        const downloadTextBtn = document.getElementById('download-text-btn');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateAIAnalysis(birthData, baziResult, prompt, ziweiResult);
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyAIResult();
            });
        }

        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', () => {
                this.downloadPDFReport();
            });
        }

        if (downloadImageBtn) {
            downloadImageBtn.addEventListener('click', () => {
                this.downloadImageReport();
            });
        }

        if (downloadTextBtn) {
            downloadTextBtn.addEventListener('click', () => {
                this.downloadTextReport();
            });
        }

        const testCanvasBtn = document.getElementById('test-canvas-btn');
        if (testCanvasBtn) {
            testCanvasBtn.addEventListener('click', () => {
                this.testCanvasGeneration();
            });
        }
    }

    // 生成AI分析
    async generateAIAnalysis(birthData, baziResult, prompt, ziweiResult) {
        // 使用全局配置
        const globalConfig = this.getGlobalConfig();
        if (!globalConfig) {
            this.showAIError('请先在右上角配置AI设置');
            return;
        }

        const apiUrl = globalConfig.apiUrl;
        const apiKey = globalConfig.apiKey;
        const modelName = globalConfig.model;
        const includeZiwei = document.getElementById('add-ziwei-analysis').checked;

        // 验证输入
        if (!apiKey) {
            this.showAIError('请输入API密钥');
            return;
        }
        if (!apiUrl) {
            this.showAIError('请输入API地址');
            return;
        }

        // 显示处理状态
        this.showAIProcessing();

        try {
            // 生成完整的分析提示词
            let fullPrompt = prompt;
            if (includeZiwei && ziweiResult) {
                const ziweiPrompt = this.generateZiweiPrompt(ziweiResult);
                fullPrompt += '\n\n' + ziweiPrompt;
            }

            // 调用AI API
            await this.callAIAPI(fullPrompt, apiKey, modelName, apiUrl);

        } catch (error) {
            console.error('AI分析错误:', error);
            this.showAIError(`AI分析失败: ${error.message}`);
        } finally {
            this.hideAIProcessing();
        }
    }

    // 构建紫薇斗数分析部分
    buildZiweiSection(ziweiResult) {
        if (!ziweiResult) {
            return `
                <div class="ziwei-section">
                    <h4>紫薇斗数分析</h4>
                    <div class="ziwei-unavailable">
                        <p>⚠️ 紫薇斗数功能暂时不可用</p>
                        <p>请确保网络连接正常，或稍后重试</p>
                    </div>
                </div>
            `;
        }

        // 生成紫薇斗数分析
        const summary = this.ziweiCalculator ? this.ziweiCalculator.generateSummary(ziweiResult) : '无法生成分析';

        return `
            <div class="ziwei-section">
                <h4>紫薇斗数分析</h4>
                <div class="ziwei-content">
                    <div class="ziwei-basic-info">
                        <div class="info-row">
                            <span class="info-label">计算方法：</span>
                            <span class="info-value">${ziweiResult.calculationMethod === 'iztro' ? '专业算法' : '简化算法'}</span>
                        </div>
                        ${ziweiResult.solarDate ? `
                            <div class="info-row">
                                <span class="info-label">阳历日期：</span>
                                <span class="info-value">${ziweiResult.solarDate}</span>
                            </div>
                        ` : ''}
                        ${ziweiResult.lunarDate ? `
                            <div class="info-row">
                                <span class="info-label">农历日期：</span>
                                <span class="info-value">${ziweiResult.lunarDate}</span>
                            </div>
                        ` : ''}
                        ${ziweiResult.fiveElementsClass ? `
                            <div class="info-row">
                                <span class="info-label">五行局：</span>
                                <span class="info-value">${ziweiResult.fiveElementsClass}</span>
                            </div>
                        ` : ''}
                    </div>

                    <div class="ziwei-analysis">
                        <h5>命盘分析：</h5>
                        <div class="analysis-text">
                            <pre>${summary}</pre>
                        </div>
                    </div>

                    ${ziweiResult.palaces && ziweiResult.palaces.length > 0 ? `
                        <div class="ziwei-palaces">
                            <h5>十二宫概览：</h5>
                            <div class="palaces-grid">
                                ${ziweiResult.palaces.slice(0, 6).map(palace => `
                                    <div class="palace-item">
                                        <div class="palace-name">${palace.name}</div>
                                        <div class="palace-branch">${palace.earthlyBranch}</div>
                                        ${palace.majorStars && palace.majorStars.length > 0 ? `
                                            <div class="palace-stars">${palace.majorStars.slice(0, 2).join('、')}</div>
                                        ` : '<div class="palace-empty">空宫</div>'}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}

                    ${ziweiResult.warning ? `
                        <div class="ziwei-warning">
                            <p>⚠️ ${ziweiResult.warning}</p>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    // 复制提示词功能已移除，保护商业机密

    // 生成PDF报告（使用打印预览）
    downloadPDFReport() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        this.showProcessing('正在准备PDF报告...');

        setTimeout(() => {
            this.hideProcessing();
            this.openPrintPreview();
        }, 500);
    }

    // 下载长图报告
    async downloadImageReport() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        try {
            this.showProcessing('正在生成长图报告...');

            // 检查html2canvas是否可用
            if (typeof html2canvas === 'undefined') {
                this.hideProcessing();
                this.showError('图片生成库未加载，请刷新页面重试');
                return;
            }

            // 尝试多种方法生成长图
            console.log('开始生成长图...');
            let canvas;

            try {
                // 方法1: 使用html2canvas截取现有内容
                canvas = await this.createCanvasFromExistingContent();
            } catch (error) {
                console.warn('html2canvas方法失败，尝试备用方法:', error);
                // 方法2: 使用Canvas API直接绘制
                canvas = await this.createCanvasManually();
            }

            console.log('Canvas生成完成:', canvas.width, 'x', canvas.height);

            // 检查Canvas是否为空
            if (canvas.width === 0 || canvas.height === 0) {
                throw new Error('生成的图片尺寸为空');
            }

            // 下载图片
            const fileName = `赛博论命长图报告_${new Date().toISOString().split('T')[0]}.png`;
            this.downloadCanvasAsImage(canvas, fileName);

            this.hideProcessing();
            this.showSuccess('长图报告已下载');
        } catch (error) {
            this.hideProcessing();
            console.error('长图生成错误:', error);
            this.showError(`长图生成失败: ${error.message}`);
        }
    }

    // 下载文本报告
    downloadTextReport() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        // 生成完整报告文本
        const reportText = this.generateCompleteReport();

        const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `赛博论命文本报告_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this.showSuccess('文本报告已下载');
    }

    // 生成完整报告文本
    generateCompleteReport() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) return '';

        let report = '';

        // 报告标题
        report += '赛博论命 - 完整命理分析报告\n';
        report += '='.repeat(60) + '\n\n';

        // 基本信息
        const title = resultContent.querySelector('.result-title')?.textContent || '';
        const info = resultContent.querySelector('.result-info')?.textContent || '';
        if (title) {
            report += `${title}\n`;
            report += '-'.repeat(30) + '\n';
        }
        if (info) {
            report += `${info}\n\n`;
        }

        // 八字命盘信息
        report += this.extractBaziInfo(resultContent);

        // 真太阳时修正信息
        report += this.extractSolarTimeInfo(resultContent);

        // 大运信息
        report += this.extractDayunInfo(resultContent);

        // 紫薇斗数信息
        report += this.extractZiweiInfo(resultContent);

        // AI分析结果
        report += this.extractAIAnalysis();

        // 报告生成时间
        report += '\n' + '='.repeat(60) + '\n';
        report += `报告生成时间：${new Date().toLocaleString('zh-CN')}\n`;
        report += '本报告由赛博论命系统生成\n';

        return report;
    }

    // 提取八字命盘信息
    extractBaziInfo(resultContent) {
        let info = '八字命盘\n';
        info += '-'.repeat(20) + '\n';

        // 提取八字
        const pillars = resultContent.querySelectorAll('.pillar');
        if (pillars.length > 0) {
            const pillarNames = ['年柱', '月柱', '日柱', '时柱'];
            pillars.forEach((pillar, index) => {
                const chars = pillar.querySelector('.pillar-chars')?.textContent || '';
                const god = pillar.querySelector('.pillar-god')?.textContent || '';
                const wuxingElements = pillar.querySelectorAll('.wuxing-tag');
                const nayin = pillar.querySelector('.pillar-nayin')?.textContent || '';

                info += `${pillarNames[index] || ''}：${chars}`;
                if (god && god !== '日元') {
                    info += ` (${god})`;
                }
                info += '\n';

                if (wuxingElements.length > 0) {
                    const wuxingTexts = Array.from(wuxingElements).map(el => el.textContent);
                    info += `  五行：${wuxingTexts.join(' ')}\n`;
                }

                if (nayin) {
                    info += `  纳音：${nayin}\n`;
                }
            });
        }

        return info + '\n';
    }

    // 提取真太阳时修正信息
    extractSolarTimeInfo(resultContent) {
        const solarTimeSection = resultContent.querySelector('.solar-time-section');
        if (!solarTimeSection) return '';

        let info = '真太阳时修正\n';
        info += '-'.repeat(20) + '\n';

        const timeRows = solarTimeSection.querySelectorAll('.time-row');
        timeRows.forEach(row => {
            const label = row.querySelector('.time-label')?.textContent || '';
            const value = row.querySelector('.time-value')?.textContent || '';
            if (label && value) {
                info += `${label}${value}\n`;
            }
        });

        return info + '\n';
    }

    // 提取大运信息
    extractDayunInfo(resultContent) {
        const dayunSection = resultContent.querySelector('.dayun-section');
        if (!dayunSection) return '';

        let info = '大运信息\n';
        info += '-'.repeat(20) + '\n';

        const dayunInfo = dayunSection.querySelector('.dayun-info p')?.textContent || '';
        if (dayunInfo) {
            info += `${dayunInfo}\n`;
        }

        const dayunPillars = dayunSection.querySelectorAll('.dayun-pillar');
        if (dayunPillars.length > 0) {
            info += '大运排列：\n';
            dayunPillars.forEach(pillar => {
                const age = pillar.querySelector('.dayun-age')?.textContent || '';
                const chars = pillar.querySelector('.dayun-chars')?.textContent || '';
                if (age && chars) {
                    info += `  ${age}：${chars}\n`;
                }
            });
        }

        return info + '\n';
    }

    // 提取紫薇斗数信息
    extractZiweiInfo(resultContent) {
        const ziweiSection = resultContent.querySelector('.ziwei-section');
        if (!ziweiSection) return '';

        let info = '紫薇斗数分析\n';
        info += '-'.repeat(20) + '\n';

        // 基本信息
        const basicInfo = ziweiSection.querySelector('.ziwei-basic-info');
        if (basicInfo) {
            const infoRows = basicInfo.querySelectorAll('.info-row');
            infoRows.forEach(row => {
                const label = row.querySelector('.info-label')?.textContent || '';
                const value = row.querySelector('.info-value')?.textContent || '';
                if (label && value) {
                    info += `${label}${value}\n`;
                }
            });
            info += '\n';
        }

        // 命盘分析
        const analysis = ziweiSection.querySelector('.analysis-text pre')?.textContent || '';
        if (analysis) {
            info += '命盘分析：\n';
            info += analysis + '\n\n';
        }

        // 十二宫概览
        const palaces = ziweiSection.querySelectorAll('.palace-item');
        if (palaces.length > 0) {
            info += '十二宫概览：\n';
            palaces.forEach(palace => {
                const name = palace.querySelector('.palace-name')?.textContent || '';
                const branch = palace.querySelector('.palace-branch')?.textContent || '';
                const stars = palace.querySelector('.palace-stars')?.textContent ||
                            palace.querySelector('.palace-empty')?.textContent || '';
                if (name && branch) {
                    info += `  ${name}(${branch})：${stars}\n`;
                }
            });
        }

        return info + '\n';
    }

    // 提取AI分析结果
    extractAIAnalysis() {
        const aiOutput = document.getElementById('ai-output');
        if (!aiOutput || !this.fullAIResponse) return '';

        let info = 'AI智能分析\n';
        info += '-'.repeat(20) + '\n';

        // 使用原始的AI响应文本，去除Markdown格式
        const cleanText = this.fullAIResponse
            .replace(/\*\*(.*?)\*\*/g, '$1')  // 移除粗体标记
            .replace(/\*(.*?)\*/g, '$1')      // 移除斜体标记
            .replace(/### (.*?)$/gm, '$1')    // 移除三级标题标记
            .replace(/## (.*?)$/gm, '$1')     // 移除二级标题标记
            .replace(/# (.*?)$/gm, '$1')      // 移除一级标题标记
            .replace(/\n\n+/g, '\n\n');       // 规范化换行

        info += cleanText + '\n\n';

        return info;
    }

    // 处理赛博起名表单提交
    async handleQimingSubmit(e) {
        const form = e.target;
        const formData = new FormData(form);

        const birthData = {
            surname: formData.get('surname'),
            gender: formData.get('gender'),
            year: parseInt(formData.get('birthYear')),
            month: parseInt(formData.get('birthMonth')),
            day: parseInt(formData.get('birthDay')),
            hour: parseInt(formData.get('birthHour')),
            minute: parseInt(formData.get('birthMinute')),
            birthProvince: formData.get('birthProvince'),
            birthCity: formData.get('birthCity'),
            // 新的自定义字配置
            customConfig: {
                firstChar: formData.get('firstChar')?.trim() || null,
                secondChar: formData.get('secondChar')?.trim() || null,
                candidateChars: formData.get('candidateChars')?.split(',').map(s => s.trim()).filter(s => s) || []
            }
        };

        if (!this.validateQimingData(birthData)) {
            this.showError('请填写完整的信息');
            return;
        }

        this.showLoading();

        try {
            // 计算八字
            const baziResult = this.baziCalculator.calculate(birthData);

            // 生成名字建议
            const nameSuggestions = this.nameCalculator.generateNameSuggestions(
                birthData.surname,
                birthData.gender,
                baziResult,
                birthData.customConfig
            );

            // 生成AI分析提示词
            const aiPrompt = this.nameCalculator.generateCompleteAINamingPrompt(
                birthData,
                baziResult,
                nameSuggestions,
                birthData.customConfig
            );

            this.displayQimingResult(birthData, baziResult, nameSuggestions, aiPrompt);

        } catch (error) {
            console.error('起名错误:', error);
            this.showError('起名过程中出现错误，请重试');
        } finally {
            this.hideLoading();
        }
    }

    // 处理赛博测名表单提交
    async handleCemingSubmit(e) {
        const form = e.target;
        const formData = new FormData(form);

        const testData = {
            fullName: formData.get('fullName'),
            gender: formData.get('gender'),
            year: parseInt(formData.get('birthYear')),
            month: parseInt(formData.get('birthMonth')),
            day: parseInt(formData.get('birthDay')),
            hour: parseInt(formData.get('birthHour')),
            minute: parseInt(formData.get('birthMinute')) || 0,
            birthProvince: formData.get('birthProvince'),
            birthCity: formData.get('birthCity')
        };

        if (!this.validateCemingData(testData)) {
            this.showError('请填写完整的信息');
            return;
        }

        this.showLoading();

        try {
            // 计算八字
            const baziResult = this.baziCalculator.calculate(testData);

            // 分析姓名
            const nameAnalysis = this.nameCalculator.analyzeName(testData.fullName, baziResult);

            this.displayCemingResult(testData, nameAnalysis, baziResult);

        } catch (error) {
            console.error('测名错误:', error);
            this.showError('测名过程中出现错误，请重试');
        } finally {
            this.hideLoading();
        }
    }

    // 处理赛博合婚表单提交
    async handleHehunSubmit(e) {
        const form = e.target;
        const formData = new FormData(form);

        const marriageData = {
            male: {
                name: formData.get('maleName'),
                year: parseInt(formData.get('maleBirthYear')),
                month: parseInt(formData.get('maleBirthMonth')),
                day: parseInt(formData.get('maleBirthDay')),
                hour: parseInt(formData.get('maleBirthHour')),
                minute: parseInt(formData.get('maleBirthMinute')) || 0,
                birthProvince: formData.get('maleBirthProvince'),
                birthCity: formData.get('maleBirthCity'),
                gender: '男'
            },
            female: {
                name: formData.get('femaleName'),
                year: parseInt(formData.get('femaleBirthYear')),
                month: parseInt(formData.get('femaleBirthMonth')),
                day: parseInt(formData.get('femaleBirthDay')),
                hour: parseInt(formData.get('femaleBirthHour')),
                minute: parseInt(formData.get('femaleBirthMinute')) || 0,
                birthProvince: formData.get('femaleBirthProvince'),
                birthCity: formData.get('femaleBirthCity'),
                gender: '女'
            }
        };

        if (!this.validateHehunData(marriageData)) {
            this.showError('请填写完整的双方信息');
            return;
        }

        this.showLoading();

        try {
            // 计算双方八字
            const maleBazi = this.baziCalculator.calculate(marriageData.male);
            const femaleBazi = this.baziCalculator.calculate(marriageData.female);

            // 合婚分析
            const marriageResult = this.marriageCalculator.calculateMarriageMatch(
                { birthData: marriageData.male, baziResult: maleBazi, name: marriageData.male.name },
                { birthData: marriageData.female, baziResult: femaleBazi, name: marriageData.female.name }
            );

            this.displayHehunResult(marriageData, marriageResult);

        } catch (error) {
            console.error('合婚错误:', error);
            this.showError('合婚过程中出现错误，请重试');
        } finally {
            this.hideLoading();
        }
    }

    // 验证起名数据
    validateQimingData(data) {
        return data.surname && data.gender && data.year && data.month && data.day &&
               data.hour !== null && data.minute !== null && data.birthProvince && data.birthCity;
    }

    // 验证测名数据
    validateCemingData(data) {
        return data.fullName && data.gender && data.year && data.month && data.day &&
               data.hour !== null && data.birthProvince && data.birthCity;
    }

    // 验证合婚数据
    validateHehunData(data) {
        const { male, female } = data;
        return male.name && male.year && male.month && male.day && male.hour !== null &&
               male.minute !== null && male.birthProvince && male.birthCity &&
               female.name && female.year && female.month && female.day && female.hour !== null &&
               female.minute !== null && female.birthProvince && female.birthCity;
    }

    // 显示起名结果
    displayQimingResult(birthData, baziResult, nameSuggestions, aiPrompt) {
        const resultPanel = document.getElementById('qiming-result');
        const resultContent = resultPanel.querySelector('.result-content');

        if (!resultPanel || !resultContent) return;

        const resultHTML = `
            <div class="result-header">
                <h3 class="result-title">智能起名结果</h3>
                <div class="result-info">
                    <span>姓氏：${birthData.surname} | 性别：${birthData.gender} | 出生：${birthData.year}年${birthData.month}月${birthData.day}日${birthData.hour}时</span>
                </div>
            </div>

            <!-- 八字信息 -->
            <div class="bazi-info">
                <h4>生辰八字</h4>
                <div class="bazi-pillars">
                    <div class="pillar">
                        <div class="pillar-label">年柱</div>
                        <div class="pillar-chars">${baziResult.yearPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.yearPillar)}</div>
                        <div class="pillar-god">${baziResult.yearTenGod}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">月柱</div>
                        <div class="pillar-chars">${baziResult.monthPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.monthPillar)}</div>
                        <div class="pillar-god">${baziResult.monthTenGod}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">日柱</div>
                        <div class="pillar-chars">${baziResult.dayPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.dayPillar)}</div>
                        <div class="pillar-god">日主${baziResult.dayTianGan}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">时柱</div>
                        <div class="pillar-chars">${baziResult.hourPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.hourPillar)}</div>
                        <div class="pillar-god">${baziResult.hourTenGod}</div>
                    </div>
                </div>

                <!-- 五行分析 -->
                <div class="wuxing-analysis">
                    <h5>五行分析</h5>
                    <div class="wuxing-stats">
                        ${this.generateWuXingStats(baziResult)}
                    </div>
                    <div class="wuxing-needs">
                        <span class="needs-label">起名宜用五行：</span>
                        <span class="needs-values">${this.nameCalculator.analyzeBaziWuXing(baziResult).join('、')}</span>
                    </div>
                </div>
            </div>

            <!-- 传统算法推荐 -->
            <div class="name-suggestions">
                <h4>智能起名推荐</h4>
                ${this.generateCustomConfigDisplay(birthData.customConfig)}
                <div class="names-grid">
                    ${nameSuggestions.map((suggestion, index) => `
                        <div class="name-card ${suggestion.isCustom ? 'custom-name' : ''}">
                            <div class="name-rank">${index + 1}</div>
                            ${suggestion.isCustom ? `<div class="custom-badge">${suggestion.customType}</div>` : ''}
                            <div class="name-text">${suggestion.fullName}</div>
                            <div class="name-score">${suggestion.score}分</div>
                            <div class="name-details">
                                <div class="name-wuxing">五行：${suggestion.wuXingMatch.join('、')}</div>
                                <div class="name-sancai">三才：${suggestion.sanCai.jiXiong}</div>
                                <div class="name-wuge">五格：天${suggestion.wuGe.tianGe} 人${suggestion.wuGe.renGe} 地${suggestion.wuGe.diGe} 外${suggestion.wuGe.waiGe} 总${suggestion.wuGe.zongGe}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- AI分析区域 -->
            <div class="ai-naming-section">
                <div class="ai-naming-header">
                    <h4>AI智能起名分析</h4>
                    <p>基于八字命理、五格数理、字义内涵、音韵美学等多维度的专业分析</p>
                    <div class="model-recommendation">
                        <span class="rec-icon">💡</span>
                        <span class="rec-text">推荐使用 <strong>DeepSeek-R1</strong>：具备强大的推理能力，能深入分析字义内涵和诗词典故</span>
                    </div>
                </div>

                <!-- AI分析控制 -->
                <div class="ai-naming-controls">
                    <button class="cyber-button" id="generate-ai-naming">
                        <span>🤖 生成AI起名分析</span>
                        <div class="button-glow"></div>
                    </button>
                </div>

                <!-- AI分析处理状态 -->
                <div class="ai-naming-processing" id="ai-naming-processing" style="display: none;">
                    <div class="processing-message" id="ai-naming-processing-message">正在初始化AI分析...</div>
                    <div class="processing-steps" id="ai-naming-processing-steps"></div>
                </div>

                <!-- AI分析结果 -->
                <div class="ai-naming-result-section" id="ai-naming-result-section" style="display: none;">
                    <h5>AI分析结果：</h5>
                    <div class="ai-naming-output" id="ai-naming-output"></div>
                    <div class="result-actions">
                        <button class="cyber-button" id="copy-ai-naming-result" style="display: none;">
                            <span>📄 复制分析结果</span>
                            <div class="button-glow"></div>
                        </button>
                    </div>
                </div>

                <!-- 提示词已隐藏，保护商业机密 -->
            </div>

            <!-- PDF报告下载 -->
            <div class="result-actions">
                <div class="download-options">
                    <button class="cyber-button" id="download-naming-pdf-btn">
                        <span>📄 生成PDF报告</span>
                        <div class="button-glow"></div>
                    </button>
                    <button class="cyber-button" id="download-naming-image-btn">
                        <span>🖼️ 下载长图报告</span>
                        <div class="button-glow"></div>
                    </button>
                    <button class="cyber-button secondary" id="download-naming-text-btn">
                        <span>📝 下载文本报告</span>
                        <div class="button-glow"></div>
                    </button>
                </div>
                <div class="download-note">
                    <small>💡 PDF报告将在新窗口中打开，您可以使用浏览器的"打印"功能保存为PDF</small>
                </div>
            </div>
        `;

        resultContent.innerHTML = resultHTML;

        // 绑定AI起名分析事件
        this.bindAINamingEvents(birthData, baziResult, nameSuggestions, aiPrompt);

        // 绑定PDF下载事件
        this.bindNamingDownloadEvents(birthData, baziResult, nameSuggestions);

        // 显示结果面板
        resultPanel.style.display = 'block';
        resultPanel.classList.add('show');
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // 生成自定义配置显示
    generateCustomConfigDisplay(customConfig) {
        const { firstChar, secondChar, candidateChars = [] } = customConfig;

        if (!firstChar && !secondChar && candidateChars.length === 0) {
            return '';
        }

        let html = '<div class="custom-config-display">';

        if (firstChar) {
            html += `
                <div class="config-item">
                    <span class="config-label">指定第一个字（辈分字）：</span>
                    <span class="config-value">${firstChar}</span>
                </div>
            `;
        }

        if (secondChar) {
            html += `
                <div class="config-item">
                    <span class="config-label">指定第二个字：</span>
                    <span class="config-value">${secondChar}</span>
                </div>
            `;
        }

        if (candidateChars.length > 0) {
            html += `
                <div class="config-item">
                    <span class="config-label">候选字库：</span>
                    <span class="config-value">${candidateChars.join('、')}</span>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    // 获取柱子的五行信息
    getPillarWuXing(pillar) {
        if (!pillar || pillar.length !== 2) return '';

        const tianGan = pillar[0];
        const diZhi = pillar[1];

        const tianGanWuXing = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
        };

        const diZhiWuXing = {
            '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
            '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
            '戌': '土', '亥': '水'
        };

        const tianGanWX = tianGanWuXing[tianGan] || '';
        const diZhiWX = diZhiWuXing[diZhi] || '';

        return `${tianGanWX}${diZhiWX}`;
    }

    // 生成五行统计信息
    generateWuXingStats(baziResult) {
        const wuxingCount = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };

        // 统计八字中各五行的数量
        const pillars = [baziResult.yearPillar, baziResult.monthPillar, baziResult.dayPillar, baziResult.hourPillar];
        pillars.forEach(pillar => {
            if (pillar && pillar.length === 2) {
                const tianGan = pillar[0];
                const diZhi = pillar[1];

                const tianGanWuXing = {
                    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
                    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
                };

                const diZhiWuXing = {
                    '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
                    '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
                    '戌': '土', '亥': '水'
                };

                const tianGanWX = tianGanWuXing[tianGan];
                const diZhiWX = diZhiWuXing[diZhi];

                if (tianGanWX) wuxingCount[tianGanWX]++;
                if (diZhiWX) wuxingCount[diZhiWX]++;
            }
        });

        // 生成统计显示
        let html = '';
        Object.entries(wuxingCount).forEach(([wuxing, count]) => {
            const percentage = (count / 8 * 100).toFixed(0);
            html += `
                <div class="wuxing-item">
                    <span class="wuxing-name">${wuxing}</span>
                    <div class="wuxing-bar">
                        <div class="wuxing-fill" style="width: ${percentage}%"></div>
                    </div>
                    <span class="wuxing-count">${count}</span>
                </div>
            `;
        });

        return html;
    }

    // 绑定AI起名分析相关事件
    bindAINamingEvents(birthData, baziResult, nameSuggestions, aiPrompt) {
        const generateBtn = document.getElementById('generate-ai-naming');
        const copyBtn = document.getElementById('copy-ai-naming-result');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateAINamingAnalysis(birthData, baziResult, nameSuggestions, aiPrompt);
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyAINamingResult();
            });
        }
    }

    // 生成AI起名分析
    async generateAINamingAnalysis(birthData, baziResult, nameSuggestions, aiPrompt) {
        // 使用全局配置
        const globalConfig = this.getGlobalConfig();
        if (!globalConfig) {
            this.showAINamingError('请先在右上角配置AI设置');
            return;
        }

        const apiUrl = globalConfig.apiUrl;
        const apiKey = globalConfig.apiKey;
        const modelName = globalConfig.model;

        // 验证输入
        if (!apiKey) {
            this.showAINamingError('请输入API密钥');
            return;
        }
        if (!apiUrl) {
            this.showAINamingError('请输入API地址');
            return;
        }

        // 显示处理状态
        this.showAINamingProcessing();

        try {
            // 调用AI API
            await this.callAINamingAPI(aiPrompt, apiKey, modelName, apiUrl);

        } catch (error) {
            console.error('AI起名分析失败:', error);
            this.showAINamingError(error.message);
        } finally {
            this.hideAINamingProcessing();
        }
    }

    // 调用AI起名API
    async callAINamingAPI(prompt, apiKey, modelName, apiUrl) {
        const processingSteps = document.getElementById('ai-naming-processing-steps');
        const processingMessage = document.getElementById('ai-naming-processing-message');
        const aiOutput = document.getElementById('ai-naming-output');
        const aiResultSection = document.getElementById('ai-naming-result-section');
        const copyBtn = document.getElementById('copy-ai-naming-result');

        let fullResponse = '';

        try {
            // 显示连接状态
            processingSteps.innerHTML = '🔗 正在连接AI服务器...<br>';
            processingMessage.textContent = '建立连接中...';

            // 构建请求体，针对不同模型进行优化
            const requestBody = {
                model: modelName,
                messages: [
                    {
                        role: "system",
                        content: "你是精通中国传统姓名学和现代起名理论的专家，擅长结合八字命理、五格数理、三才配置、字义内涵、音韵美学等多个维度进行综合起名分析。具备深厚的古典文学功底，能够准确分析汉字的文化内涵和诗词出处。"
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: true
            };

            // 针对不同模型设置不同参数
            if (modelName.includes('deepseek-r1')) {
                // DeepSeek-R1 推理模型的特殊配置
                requestBody.temperature = 0.3; // 降低随机性，提高推理准确性
                requestBody.max_tokens = 8000; // 增加输出长度，支持详细推理
                requestBody.reasoning_effort = "high"; // 启用高强度推理模式
            } else if (modelName.includes('deepseek')) {
                requestBody.temperature = 0.5;
                requestBody.max_tokens = 6000;
            } else if (modelName.includes('gpt')) {
                requestBody.temperature = 0.7;
                requestBody.max_tokens = 4000;
            } else {
                requestBody.temperature = 0.6;
                requestBody.max_tokens = 4000;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API错误 (${response.status}): ${errorData.error?.message || '未知错误'}`);
            }

            // 显示分析状态
            processingSteps.innerHTML += '🤖 AI正在分析起名方案...<br>';
            processingMessage.textContent = '正在生成分析结果...';

            // 显示结果区域
            aiResultSection.style.display = 'block';
            aiOutput.innerHTML = '';

            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content || '';
                            if (content) {
                                fullResponse += content;
                                // 使用marked库渲染Markdown（如果可用）
                                if (typeof marked !== 'undefined') {
                                    aiOutput.innerHTML = marked.parse(fullResponse);
                                } else {
                                    aiOutput.innerHTML = this.simpleMarkdownParse(fullResponse);
                                }
                            }
                        } catch (e) {
                            // 忽略JSON解析错误
                        }
                    }
                }
            }

            // 分析完成
            processingSteps.innerHTML += '✅ AI起名分析完成<br>';
            processingMessage.textContent = '分析完成！';

            // 显示复制按钮
            if (fullResponse.trim()) {
                copyBtn.style.display = 'block';
                this.fullAINamingResponse = fullResponse;

                // 强制移除滚动条
                this.removeAINamingOutputScrollbar();
            }

        } catch (error) {
            throw new Error(`API通信失败: ${error.message}`);
        }
    }

    // 显示AI起名处理状态
    showAINamingProcessing() {
        const processingDiv = document.getElementById('ai-naming-processing');
        const resultSection = document.getElementById('ai-naming-result-section');

        if (processingDiv) {
            processingDiv.style.display = 'block';
        }
        if (resultSection) {
            resultSection.style.display = 'none';
        }
    }

    // 隐藏AI起名处理状态
    hideAINamingProcessing() {
        const processingDiv = document.getElementById('ai-naming-processing');
        if (processingDiv) {
            processingDiv.style.display = 'none';
        }
    }

    // 显示AI起名错误信息
    showAINamingError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'api-error-message';
        errorDiv.textContent = `❌ ${message}`;
        errorDiv.style.cssText = `
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid #ff4444;
            color: #ff4444;
            padding: 1rem;
            border-radius: 4px;
            margin: 1rem 0;
            text-align: center;
        `;

        const processingDiv = document.getElementById('ai-naming-processing');
        if (processingDiv) {
            processingDiv.style.display = 'none';
            processingDiv.parentNode.insertBefore(errorDiv, processingDiv.nextSibling);

            // 3秒后自动移除错误信息
            setTimeout(() => {
                if (errorDiv.parentNode) {
                    errorDiv.parentNode.removeChild(errorDiv);
                }
            }, 3000);
        }
    }

    // 复制AI起名分析结果
    copyAINamingResult() {
        if (!this.fullAINamingResponse) return;

        const textArea = document.createElement('textarea');
        textArea.value = this.fullAINamingResponse;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            const copyBtn = document.getElementById('copy-ai-naming-result');
            const originalText = copyBtn.querySelector('span').textContent;
            copyBtn.querySelector('span').textContent = '✅ 复制成功!';
            setTimeout(() => {
                copyBtn.querySelector('span').textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    }

    // 强制移除AI起名输出区域的滚动条
    removeAINamingOutputScrollbar() {
        const aiOutput = document.getElementById('ai-naming-output');
        const aiResultSection = document.getElementById('ai-naming-result-section');

        if (aiOutput) {
            aiOutput.style.maxHeight = 'none';
            aiOutput.style.height = 'auto';
            aiOutput.style.overflow = 'visible';
            aiOutput.style.overflowY = 'visible';
            aiOutput.style.overflowX = 'visible';
        }

        if (aiResultSection) {
            aiResultSection.style.maxHeight = 'none';
            aiResultSection.style.height = 'auto';
            aiResultSection.style.overflow = 'visible';
            aiResultSection.style.overflowY = 'visible';
            aiResultSection.style.overflowX = 'visible';
        }

        console.log('已强制移除AI起名输出区域的滚动条');
    }

    // 显示测名结果
    displayCemingResult(testData, nameAnalysis, baziResult) {
        const resultPanel = document.getElementById('ceming-result');
        const resultContent = resultPanel.querySelector('.result-content');

        if (!resultPanel || !resultContent) return;

        // 生成AI分析提示词
        const aiPrompt = this.generateCemingAIPrompt(testData, nameAnalysis, baziResult);

        const resultHTML = `
            <div class="result-header">
                <h3 class="result-title">姓名分析报告</h3>
                <div class="result-info">
                    <span>${testData.fullName} | ${testData.gender} | ${testData.year}年${testData.month}月${testData.day}日 ${testData.hour.toString().padStart(2, '0')}:${(testData.minute || 0).toString().padStart(2, '0')} | ${testData.birthProvince} ${testData.birthCity}</span>
                </div>
            </div>

            <!-- 八字信息 -->
            <div class="bazi-info">
                <h4>生辰八字</h4>
                <div class="bazi-pillars">
                    <div class="pillar">
                        <div class="pillar-label">年柱</div>
                        <div class="pillar-chars">${baziResult.yearPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.yearPillar)}</div>
                        <div class="pillar-god">${baziResult.yearTenGod}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">月柱</div>
                        <div class="pillar-chars">${baziResult.monthPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.monthPillar)}</div>
                        <div class="pillar-god">${baziResult.monthTenGod}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">日柱</div>
                        <div class="pillar-chars">${baziResult.dayPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.dayPillar)}</div>
                        <div class="pillar-god">日主${baziResult.dayTianGan}</div>
                    </div>
                    <div class="pillar">
                        <div class="pillar-label">时柱</div>
                        <div class="pillar-chars">${baziResult.hourPillar}</div>
                        <div class="pillar-wuxing">${this.getPillarWuXing(baziResult.hourPillar)}</div>
                        <div class="pillar-god">${baziResult.hourTenGod}</div>
                    </div>
                </div>
            </div>

            <!-- 五行分析 -->
            <div class="wuxing-analysis">
                <h4>五行分析</h4>
                <div class="wuxing-stats">
                    ${this.generateWuXingStats(baziResult)}
                </div>
            </div>

            <div class="name-analysis">
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${nameAnalysis.score}</span>
                        <span class="score-label">分</span>
                    </div>
                </div>

                <div class="analysis-details">
                    <div class="detail-section">
                        <h4>五格数理</h4>
                        <div class="wuge-grid">
                            <div class="wuge-item">
                                <span class="wuge-label">天格</span>
                                <span class="wuge-value">${nameAnalysis.wuGe.tianGe}</span>
                            </div>
                            <div class="wuge-item">
                                <span class="wuge-label">人格</span>
                                <span class="wuge-value">${nameAnalysis.wuGe.renGe}</span>
                            </div>
                            <div class="wuge-item">
                                <span class="wuge-label">地格</span>
                                <span class="wuge-value">${nameAnalysis.wuGe.diGe}</span>
                            </div>
                            <div class="wuge-item">
                                <span class="wuge-label">外格</span>
                                <span class="wuge-value">${nameAnalysis.wuGe.waiGe}</span>
                            </div>
                            <div class="wuge-item">
                                <span class="wuge-label">总格</span>
                                <span class="wuge-value">${nameAnalysis.wuGe.zongGe}</span>
                            </div>
                        </div>
                    </div>

                    <div class="detail-section">
                        <h4>三才配置</h4>
                        <p>${nameAnalysis.sanCai.tianWuXing}${nameAnalysis.sanCai.renWuXing}${nameAnalysis.sanCai.diWuXing} (${nameAnalysis.sanCai.jiXiong})</p>
                    </div>

                    <div class="detail-section">
                        <h4>基础分析</h4>
                        <pre class="analysis-text">${nameAnalysis.analysis}</pre>
                    </div>
                </div>
            </div>

            <!-- AI深度分析区域 -->
            <div class="ai-naming-analysis">
                <div class="ai-naming-header">
                    <h4>AI深度测名分析</h4>
                    <p>基于八字命理、五格数理、字义内涵、音韵美学等多维度的专业分析</p>
                    <div class="model-recommendation">
                        <span class="rec-icon">💡</span>
                        <span class="rec-text">推荐使用 <strong>DeepSeek-R1</strong>：具备强大的推理能力，能深入分析字义内涵和诗词典故</span>
                    </div>
                </div>



                <!-- 分析按钮 -->
                <div class="analysis-actions">
                    <button class="cyber-button" id="generate-ceming-ai-analysis">
                        <span>🤖 生成AI深度分析</span>
                        <div class="button-glow"></div>
                    </button>
                </div>

                <!-- 处理状态显示 -->
                <div class="processing-box" id="ceming-ai-processing" style="display: none;">
                    <div class="processing-message" id="ceming-processing-message">正在初始化AI分析...</div>
                    <div class="processing-steps" id="ceming-processing-steps"></div>
                </div>

                <!-- AI分析结果 -->
                <div class="ai-result-section" id="ceming-ai-result-section" style="display: none;">
                    <h5>AI深度分析结果：</h5>
                    <div class="ai-output" id="ceming-ai-output"></div>
                    <div class="result-actions">
                        <button class="cyber-button" id="copy-ceming-ai-result" style="display: none;">
                            <span>📄 复制分析结果</span>
                            <div class="button-glow"></div>
                        </button>
                    </div>
                </div>

                <!-- 错误信息显示 -->
                <div class="api-error-message" id="ceming-ai-error-message" style="display: none;"></div>

                <!-- 提示词已隐藏，保护商业机密 -->
            </div>

            <!-- PDF报告下载 -->
            <div class="result-actions">
                <div class="download-options">
                    <button class="cyber-button" id="download-ceming-pdf-btn">
                        <span>📄 生成PDF报告</span>
                        <div class="button-glow"></div>
                    </button>
                    <button class="cyber-button" id="download-ceming-image-btn">
                        <span>🖼️ 下载长图报告</span>
                        <div class="button-glow"></div>
                    </button>
                    <button class="cyber-button secondary" id="download-ceming-text-btn">
                        <span>📝 下载文本报告</span>
                        <div class="button-glow"></div>
                    </button>
                </div>
                <div class="download-note">
                    <small>💡 PDF报告将在新窗口中打开，您可以使用浏览器的"打印"功能保存为PDF</small>
                </div>
            </div>
        `;

        resultContent.innerHTML = resultHTML;

        // 绑定AI分析事件
        this.bindCemingAIEvents(testData, nameAnalysis, baziResult, aiPrompt);

        // 绑定模型切换事件
        this.bindCemingModelSwitchEvents();

        // 绑定PDF下载事件
        this.bindCemingDownloadEvents(testData, nameAnalysis, baziResult);

        resultPanel.style.display = 'block';
        resultPanel.classList.add('show');
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // 生成测名AI分析提示词
    generateCemingAIPrompt(testData, nameAnalysis, baziResult) {
        const { fullName, gender, year, month, day, hour, minute, birthProvince, birthCity } = testData;
        const { yearPillar, monthPillar, dayPillar, hourPillar, yearTenGod, monthTenGod, hourTenGod, dayTianGan } = baziResult;

        let prompt = "";

        // 系统角色定义
        prompt += `你是一位精通中国传统姓名学和现代起名理论的专家，擅长结合八字命理、五格数理、三才配置、字义内涵、音韵美学等多个维度进行综合姓名分析。\n\n`;

        prompt += `你具备深厚的古典文学功底，熟悉《诗经》、《楚辞》、《论语》、《孟子》、《唐诗三百首》、《宋词》、《元曲》等经典文献，能够准确分析汉字的本义、引申义、文化内涵和诗词出处。你善于从古典诗词中寻找美好的字词寓意，为姓名分析提供深厚的文化底蕴。\n\n`;

        prompt += `请运用你的推理能力，逐步分析姓名的各个维度。特别是在分析字义内涵时，请深入挖掘每个字的文化内涵和诗词典故，尽可能找出其在古典诗词中的具体出处和美好寓意。\n\n`;

        prompt += `**重要要求**：\n`;
        prompt += `1. 请深入分析姓名与八字的匹配程度\n`;
        prompt += `2. 基于八字命理需求，评估姓名的优缺点\n`;
        prompt += `3. 如果发现姓名有不足之处，请提出具体的改进建议\n`;
        prompt += `4. 对姓名的字义、音韵、文化内涵进行详细分析\n`;
        prompt += `5. 提供实用的人生建议和注意事项\n\n`;

        // 基本信息
        prompt += `求名者基本信息：\n`;
        prompt += `姓名：${fullName}\n`;
        prompt += `性别：${gender}\n`;
        prompt += `出生时间：${year}年${month}月${day}日${hour}时${(minute || 0).toString().padStart(2, '0')}分\n`;
        prompt += `出生地区：${birthProvince || '未知'} ${birthCity || '未知'}\n\n`;

        // 八字信息
        prompt += `生辰八字：\n`;
        prompt += `年柱：${yearPillar} (${yearTenGod})\n`;
        prompt += `月柱：${monthPillar} (${monthTenGod})\n`;
        prompt += `日柱：${dayPillar} (日主：${dayTianGan})\n`;
        prompt += `时柱：${hourPillar} (${hourTenGod})\n\n`;

        // 五行分析
        const neededWuXing = this.nameCalculator.analyzeBaziWuXing(baziResult);
        prompt += `八字五行分析：\n`;
        prompt += `需要补充的五行：${neededWuXing.join('、')}\n`;
        prompt += `五行强弱分析：请根据八字分析五行的旺衰情况\n`;
        prompt += `姓名建议：请分析当前姓名的五行属性是否与八字需求匹配，是否有助于平衡命理。\n\n`;

        // 姓名分析信息
        prompt += `姓名分析结果：\n`;
        prompt += `五格数理：天格${nameAnalysis.wuGe.tianGe}、人格${nameAnalysis.wuGe.renGe}、地格${nameAnalysis.wuGe.diGe}、外格${nameAnalysis.wuGe.waiGe}、总格${nameAnalysis.wuGe.zongGe}\n`;
        prompt += `三才配置：${nameAnalysis.sanCai.tianWuXing}${nameAnalysis.sanCai.renWuXing}${nameAnalysis.sanCai.diWuXing} (${nameAnalysis.sanCai.jiXiong})\n`;
        prompt += `综合评分：${nameAnalysis.score}分\n\n`;

        // 输出格式要求
        prompt += `请按以下格式输出分析结果：\n\n`;
        prompt += `## 🎯 AI深度测名分析报告\n\n`;
        prompt += `### 📊 姓名综合评估\n\n`;
        prompt += `**AI综合评分**：[分数]/100\n`;
        prompt += `**八字匹配度**：[详细分析姓名与八字的匹配程度]\n`;
        prompt += `**五格数理分析**：[详细分析五格配置的吉凶]\n`;
        prompt += `**三才配置分析**：[详细分析三才配置的影响]\n\n`;

        prompt += `### 📚 字义文化分析\n\n`;
        const surname = fullName[0];
        const firstName = fullName.slice(1);
        prompt += `**姓氏分析**：\n`;
        prompt += `- ${surname}：姓氏来源、历史文化、家族寓意\n\n`;
        prompt += `**名字分析**：\n`;
        for (let i = 0; i < firstName.length; i++) {
            prompt += `- ${firstName[i]}：字义、出处典故、文化内涵、诗词引用\n`;
        }
        prompt += `- 整体寓意：姓名组合的整体含义和文化底蕴\n\n`;

        prompt += `### 🎵 音韵美学分析\n\n`;
        prompt += `**声调搭配**：[分析声调的和谐程度]\n`;
        prompt += `**音韵效果**：[分析读音的美感和朗朗上口程度]\n`;
        prompt += `**谐音分析**：[检查是否有不良谐音]\n\n`;

        prompt += `### 🔮 命理匹配分析\n\n`;
        prompt += `**五行补益**：[分析姓名五行对八字的补益作用]\n`;
        prompt += `**格局影响**：[分析姓名对命理格局的影响]\n`;
        prompt += `**运势助力**：[分析姓名对各方面运势的助力]\n\n`;

        prompt += `### 💡 改进建议\n\n`;
        prompt += `**优点总结**：[总结姓名的优点和亮点]\n`;
        prompt += `**不足之处**：[指出姓名的不足或需要注意的地方]\n`;
        prompt += `**改进方向**：[如果需要改名，提供具体的改进建议]\n`;
        prompt += `**使用建议**：[如何更好地发挥姓名的正面作用]\n\n`;

        prompt += `### 🌟 人生指导\n\n`;
        prompt += `**性格特质**：[根据姓名和八字分析性格特点]\n`;
        prompt += `**事业发展**：[适合的事业方向和发展建议]\n`;
        prompt += `**人际关系**：[人际交往的优势和注意事项]\n`;
        prompt += `**健康养生**：[根据五行分析健康养生建议]\n`;
        prompt += `**开运建议**：[具体的开运方法和注意事项]\n\n`;

        prompt += `请确保分析专业、详细、实用，既要体现传统姓名学的深度，也要结合现代生活的实际需求。特别要注重字义的文化内涵和诗词典故的准确引用。`;

        return prompt;
    }

    // 绑定测名AI分析事件
    bindCemingAIEvents(testData, nameAnalysis, baziResult, aiPrompt) {
        const generateBtn = document.getElementById('generate-ceming-ai-analysis');
        const copyBtn = document.getElementById('copy-ceming-ai-result');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateCemingAIAnalysis(testData, nameAnalysis, baziResult, aiPrompt);
            });
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyCemingAIResult();
            });
        }
    }

    // 绑定测名模型切换事件
    bindCemingModelSwitchEvents() {
        const modelSelect = document.getElementById('ceming-model');
        const apiUrlInput = document.getElementById('ceming-api-url');

        if (modelSelect && apiUrlInput) {
            modelSelect.addEventListener('change', (e) => {
                const selectedModel = e.target.value;
                const apiUrls = {
                    'deepseek-r1': 'https://api.deepseek.com/v1/chat/completions',
                    'deepseek-chat': 'https://api.deepseek.com/v1/chat/completions',
                    'gpt-4': 'https://api.openai.com/v1/chat/completions',
                    'gpt-3.5-turbo': 'https://api.openai.com/v1/chat/completions',
                    'claude-3-sonnet': 'https://api.anthropic.com/v1/messages',
                    'claude-3-haiku': 'https://api.anthropic.com/v1/messages',
                    'qwen-max': 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
                    'glm-4': 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
                };

                if (apiUrls[selectedModel]) {
                    apiUrlInput.value = apiUrls[selectedModel];
                }
            });
        }
    }

    // 生成测名AI分析
    async generateCemingAIAnalysis(testData, nameAnalysis, baziResult, aiPrompt) {
        // 使用全局配置
        const globalConfig = this.getGlobalConfig();
        if (!globalConfig) {
            this.showCemingAIError('请先在右上角配置AI设置');
            return;
        }

        const apiUrl = globalConfig.apiUrl;
        const apiKey = globalConfig.apiKey;
        const modelName = globalConfig.model;

        // 验证输入
        if (!apiKey) {
            this.showCemingAIError('请输入API密钥');
            return;
        }
        if (!apiUrl) {
            this.showCemingAIError('请输入API地址');
            return;
        }

        // 显示处理状态
        this.showCemingAIProcessing();

        try {
            // 调用AI API
            await this.callCemingAIAPI(aiPrompt, apiKey, modelName, apiUrl);

        } catch (error) {
            console.error('AI测名分析失败:', error);
            this.showCemingAIError(error.message);
        } finally {
            this.hideCemingAIProcessing();
        }
    }

    // 调用测名AI API
    async callCemingAIAPI(prompt, apiKey, modelName, apiUrl) {
        const processingSteps = document.getElementById('ceming-processing-steps');
        const processingMessage = document.getElementById('ceming-processing-message');
        const aiOutput = document.getElementById('ceming-ai-output');
        const aiResultSection = document.getElementById('ceming-ai-result-section');
        const copyBtn = document.getElementById('copy-ceming-ai-result');

        let fullResponse = '';

        try {
            // 显示连接状态
            processingSteps.innerHTML = '🔗 正在连接AI服务器...<br>';
            processingMessage.textContent = '建立连接中...';

            console.log('测名AI分析开始:', { apiUrl, modelName, promptLength: prompt.length });

            // 构建请求体，针对不同模型进行优化
            const requestBody = {
                model: modelName,
                messages: [
                    {
                        role: "system",
                        content: "你是精通中国传统姓名学和现代起名理论的专家，擅长结合八字命理、五格数理、三才配置、字义内涵、音韵美学等多个维度进行综合姓名分析。具备深厚的古典文学功底，能够准确分析汉字的文化内涵和诗词出处。"
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: true
            };

            // 针对不同模型设置不同参数
            if (modelName.includes('deepseek-r1')) {
                requestBody.temperature = 0.3;
                requestBody.max_tokens = 8000;
                requestBody.reasoning_effort = "high";
            } else if (modelName.includes('deepseek')) {
                requestBody.temperature = 0.5;
                requestBody.max_tokens = 6000;
            } else if (modelName.includes('gpt')) {
                requestBody.temperature = 0.7;
                requestBody.max_tokens = 4000;
            } else {
                requestBody.temperature = 0.6;
                requestBody.max_tokens = 4000;
            }

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API响应错误:', response.status, errorData);
                throw new Error(`API错误 (${response.status}): ${errorData.error?.message || '未知错误'}`);
            }

            console.log('API响应成功，开始处理流式数据');

            // 显示分析状态
            processingSteps.innerHTML += '🤖 AI正在分析姓名...<br>';
            processingMessage.textContent = '正在生成分析结果...';

            // 显示结果区域
            aiResultSection.style.display = 'block';
            aiOutput.innerHTML = '';

            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content || '';
                            if (content) {
                                fullResponse += content;
                                aiOutput.innerHTML = this.formatMarkdown(fullResponse);
                                aiOutput.scrollTop = aiOutput.scrollHeight;
                                console.log('收到内容片段:', content.length, '字符');
                            }
                        } catch (e) {
                            console.warn('解析流式数据失败:', e, '数据:', data);
                        }
                    }
                }
            }

            // 完成处理
            console.log('AI分析完成，总响应长度:', fullResponse.length);
            processingSteps.innerHTML += '✅ AI测名分析完成<br>';
            processingMessage.textContent = '分析完成！';

            // 显示复制按钮
            if (fullResponse.trim()) {
                copyBtn.style.display = 'block';
                this.fullCemingAIResponse = fullResponse;

                // 强制移除滚动条
                this.removeCemingAIOutputScrollbar();
                console.log('AI分析结果已显示');
            } else {
                console.warn('AI分析结果为空');
            }

        } catch (error) {
            console.error('流式API调用失败，尝试非流式调用:', error);

            // 尝试非流式调用作为备选方案
            try {
                const nonStreamRequestBody = { ...requestBody, stream: false };
                const nonStreamResponse = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    body: JSON.stringify(nonStreamRequestBody)
                });

                if (!nonStreamResponse.ok) {
                    const errorData = await nonStreamResponse.json().catch(() => ({}));
                    throw new Error(`API错误 (${nonStreamResponse.status}): ${errorData.error?.message || '未知错误'}`);
                }

                const result = await nonStreamResponse.json();
                const content = result.choices?.[0]?.message?.content || '';

                if (content) {
                    aiOutput.innerHTML = this.formatMarkdown(content);
                    this.fullCemingAIResponse = content;
                    copyBtn.style.display = 'block';
                    this.removeCemingAIOutputScrollbar();
                    console.log('非流式API调用成功');
                } else {
                    throw new Error('AI返回内容为空');
                }
            } catch (fallbackError) {
                throw new Error(`API通信失败: ${fallbackError.message}`);
            }
        }
    }

    // 显示测名AI处理状态
    showCemingAIProcessing() {
        const processingDiv = document.getElementById('ceming-ai-processing');
        const resultSection = document.getElementById('ceming-ai-result-section');

        if (processingDiv) {
            processingDiv.style.display = 'block';
        }
        if (resultSection) {
            resultSection.style.display = 'none';
        }
    }

    // 隐藏测名AI处理状态
    hideCemingAIProcessing() {
        const processingDiv = document.getElementById('ceming-ai-processing');
        if (processingDiv) {
            processingDiv.style.display = 'none';
        }
    }

    // 显示测名AI错误
    showCemingAIError(message) {
        const errorMessage = document.getElementById('ceming-ai-error-message');
        errorMessage.textContent = `❌ ${message}`;
        errorMessage.style.display = 'block';
    }

    // 复制测名AI分析结果
    copyCemingAIResult() {
        if (!this.fullCemingAIResponse) return;

        const textArea = document.createElement('textarea');
        textArea.value = this.fullCemingAIResponse;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            const copyBtn = document.getElementById('copy-ceming-ai-result');
            const originalText = copyBtn.querySelector('span').textContent;
            copyBtn.querySelector('span').textContent = '✅ 复制成功!';
            setTimeout(() => {
                copyBtn.querySelector('span').textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
        } finally {
            document.body.removeChild(textArea);
        }
    }

    // 强制移除测名AI输出区域的滚动条
    removeCemingAIOutputScrollbar() {
        const aiOutput = document.getElementById('ceming-ai-output');
        const aiResultSection = document.getElementById('ceming-ai-result-section');

        if (aiOutput) {
            aiOutput.style.maxHeight = 'none';
            aiOutput.style.height = 'auto';
            aiOutput.style.overflow = 'visible';
            aiOutput.style.overflowY = 'visible';
            aiOutput.style.overflowX = 'visible';
            aiOutput.classList.remove('scrollable');
        }

        if (aiResultSection) {
            aiResultSection.style.maxHeight = 'none';
            aiResultSection.style.height = 'auto';
            aiResultSection.style.overflow = 'visible';
            aiResultSection.style.overflowY = 'visible';
            aiResultSection.style.overflowX = 'visible';
        }

        console.log('已强制移除测名AI输出区域的滚动条');
    }

    // 格式化Markdown文本
    formatMarkdown(text) {
        if (!text) return '';

        // 简单的Markdown格式化
        let formatted = text
            // 标题格式化
            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
            // 粗体格式化
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // 斜体格式化
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            // 代码格式化
            .replace(/`(.*?)`/g, '<code>$1</code>')
            // 换行处理
            .replace(/\n\n/g, '</p><p>')
            .replace(/\n/g, '<br>');

        // 包装在段落标签中
        if (formatted && !formatted.startsWith('<h') && !formatted.startsWith('<p>')) {
            formatted = '<p>' + formatted + '</p>';
        }

        return formatted;
    }

    // 显示合婚结果
    displayHehunResult(marriageData, marriageResult) {
        const resultPanel = document.getElementById('hehun-result');
        const resultContent = resultPanel.querySelector('.result-content');

        if (!resultPanel || !resultContent) return;

        // 生成AI分析提示词
        const aiPrompt = this.generateMarriageAIPrompt(marriageData, marriageResult);

        const resultHTML = `
            <div class="result-header">
                <h3 class="result-title">合婚分析报告</h3>
                <div class="result-info">
                    <span>${marriageData.male.name} ♥ ${marriageData.female.name}</span>
                </div>
            </div>

            <div class="marriage-analysis">
                <div class="match-score">
                    <div class="score-circle large">
                        <span class="score-number">${marriageResult.totalScore}</span>
                        <span class="score-label">分</span>
                    </div>
                    <div class="match-level">${marriageResult.level}</div>
                </div>

                <div class="match-details">
                    <div class="match-item">
                        <h4>生肖配对</h4>
                        <div class="match-score-bar">
                            <div class="score-fill" style="width: ${marriageResult.shengXiaoMatch.score}%"></div>
                            <span class="score-text">${marriageResult.shengXiaoMatch.score}分</span>
                        </div>
                        <p>${marriageResult.shengXiaoMatch.analysis}</p>
                    </div>

                    <div class="match-item">
                        <h4>五行配对</h4>
                        <div class="match-score-bar">
                            <div class="score-fill" style="width: ${marriageResult.wuXingMatch.score}%"></div>
                            <span class="score-text">${marriageResult.wuXingMatch.score}分</span>
                        </div>
                        <p>${marriageResult.wuXingMatch.analysis}</p>
                    </div>

                    <div class="match-item">
                        <h4>十神配对</h4>
                        <div class="match-score-bar">
                            <div class="score-fill" style="width: ${marriageResult.shiShenMatch.score}%"></div>
                            <span class="score-text">${marriageResult.shiShenMatch.score}分</span>
                        </div>
                        <p>${marriageResult.shiShenMatch.analysis}</p>
                    </div>

                    <div class="match-item">
                        <h4>年龄配对</h4>
                        <div class="match-score-bar">
                            <div class="score-fill" style="width: ${marriageResult.ageMatch.score}%"></div>
                            <span class="score-text">${marriageResult.ageMatch.score}分</span>
                        </div>
                        <p>${marriageResult.ageMatch.analysis}</p>
                    </div>
                </div>

                <div class="suggestions">
                    <h4>改进建议</h4>
                    <ul>
                        ${marriageResult.suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
                    </ul>
                </div>

                <!-- AI深度分析区域 -->
                <div class="ai-analysis-section">
                    <h4>🤖 AI深度合婚分析</h4>
                    <p class="ai-description">基于传统合婚理论，结合现代心理学和情感分析，为您提供更深入的合婚指导</p>

                    <div class="ai-controls">
                        <button class="cyber-button" id="generate-marriage-ai-analysis">
                            <span>🧠 生成AI深度分析</span>
                            <div class="button-glow"></div>
                        </button>
                    </div>

                    <!-- AI分析处理状态 -->
                    <div class="ai-marriage-processing" id="ai-marriage-processing" style="display: none;">
                        <div class="processing-animation">
                            <div class="cyber-loader"></div>
                        </div>
                        <div class="processing-info">
                            <div class="processing-message" id="ai-marriage-processing-message">正在准备AI分析...</div>
                            <div class="processing-steps" id="ai-marriage-processing-steps"></div>
                        </div>
                    </div>

                    <!-- AI分析结果 -->
                    <div class="ai-marriage-result-section" id="ai-marriage-result-section" style="display: none;">
                        <h5>AI深度分析结果：</h5>
                        <div class="ai-marriage-output" id="ai-marriage-output"></div>
                        <div class="result-actions">
                            <button class="cyber-button" id="copy-ai-marriage-result" style="display: none;">
                                <span>📄 复制分析结果</span>
                                <div class="button-glow"></div>
                            </button>
                        </div>
                    </div>

                    <!-- 提示词已隐藏，保护商业机密 -->
                </div>

                <!-- PDF报告下载 -->
                <div class="result-actions">
                    <div class="download-options">
                        <button class="cyber-button" id="download-marriage-pdf-btn">
                            <span>📄 生成PDF报告</span>
                            <div class="button-glow"></div>
                        </button>
                        <button class="cyber-button" id="download-marriage-image-btn">
                            <span>🖼️ 下载长图报告</span>
                            <div class="button-glow"></div>
                        </button>
                        <button class="cyber-button secondary" id="download-marriage-text-btn">
                            <span>📝 下载文本报告</span>
                            <div class="button-glow"></div>
                        </button>
                    </div>
                    <div class="download-note">
                        <small>💡 PDF报告将在新窗口中打开，您可以使用浏览器的"打印"功能保存为PDF</small>
                    </div>
                </div>
            </div>
        `;

        resultContent.innerHTML = resultHTML;

        // 绑定AI合婚分析事件
        this.bindMarriageAIEvents(marriageData, marriageResult, aiPrompt);

        // 绑定PDF下载事件
        this.bindMarriageDownloadEvents(marriageData, marriageResult);

        // 显示结果面板
        resultPanel.style.display = 'block';
        resultPanel.classList.add('show');
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // 调用AI API
    async callAIAPI(prompt, apiKey, modelName, apiUrl) {
        const processingSteps = document.getElementById('ai-processing-steps');
        const processingMessage = document.getElementById('ai-processing-message');
        const aiOutput = document.getElementById('ai-output');
        const aiResultSection = document.getElementById('ai-result-section');
        const copyBtn = document.getElementById('copy-ai-result');

        let fullResponse = '';

        try {
            // 显示连接状态
            processingSteps.innerHTML = '🔗 正在连接AI服务器...<br>';
            processingMessage.textContent = '建立连接中...';

            console.log('API调用开始:', { apiUrl, modelName, environment: 'cloudflare-pages' });

            const requestBody = {
                model: modelName,
                messages: [
                    {
                        role: "system",
                        content: "你是精通中国传统命理学的AI助手，擅长八字命理和紫薇斗数分析。请用专业术语进行详细分析，并提供实用的人生建议。"
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: true,
                temperature: 0.7,
                max_tokens: 4000
            };

            console.log('发送请求体:', JSON.stringify(requestBody, null, 2));

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            console.log('API响应状态:', response.status, response.statusText);

            if (!response.ok) {
                const errorText = await response.text().catch(() => '无法读取错误信息');
                console.error('API错误详情:', errorText);

                let errorData = {};
                try {
                    errorData = JSON.parse(errorText);
                } catch (e) {
                    console.error('无法解析错误JSON:', e);
                }

                throw new Error(`API错误 (${response.status}): ${errorData.error?.message || errorText || '未知错误'}`);
            }

            // 显示分析状态
            processingSteps.innerHTML += '🤖 AI正在分析命盘...<br>';
            processingMessage.textContent = '正在生成分析结果...';

            // 显示结果区域
            aiResultSection.style.display = 'block';
            aiOutput.innerHTML = '';

            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices[0]?.delta?.content || '';
                            if (content) {
                                fullResponse += content;
                                // 使用marked库渲染Markdown（如果可用）
                                if (typeof marked !== 'undefined') {
                                    aiOutput.innerHTML = marked.parse(fullResponse);
                                } else {
                                    aiOutput.innerHTML = this.simpleMarkdownParse(fullResponse);
                                }
                            }
                        } catch (e) {
                            // 忽略JSON解析错误
                        }
                    }
                }
            }

            // 分析完成
            processingSteps.innerHTML += '✅ AI分析完成<br>';
            processingMessage.textContent = '分析完成！';

            // 显示复制按钮
            if (fullResponse.trim()) {
                copyBtn.style.display = 'block';
                this.fullAIResponse = fullResponse;

                // 强制移除AI输出区域的滚动条
                this.removeAIOutputScrollbar();
            }

        } catch (error) {
            console.error('API调用失败:', error);

            // 检查是否是网络或CORS错误
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('网络连接失败，可能的原因：\n1. 网络连接问题\n2. API地址不正确\n3. CORS跨域限制\n4. 防火墙或代理阻止\n\n请检查网络连接和API配置。');
            }

            // 检查是否是API密钥错误
            if (error.message.includes('401') || error.message.includes('Unauthorized')) {
                throw new Error('API密钥验证失败，请检查：\n1. API密钥是否正确\n2. API密钥是否有效\n3. 是否有足够的API配额');
            }

            // 检查是否是模型不存在错误
            if (error.message.includes('404') || error.message.includes('model')) {
                throw new Error('模型不存在或不可用，请检查：\n1. 模型名称是否正确\n2. 该模型是否在您的API账户中可用\n3. 尝试切换到其他模型');
            }

            throw new Error(`API通信失败: ${error.message}`);
        }
    }

    // 强制移除AI输出区域的滚动条
    removeAIOutputScrollbar() {
        const aiOutput = document.getElementById('ai-output');
        const aiResultSection = document.getElementById('ai-result-section');

        if (aiOutput) {
            // 强制设置样式移除滚动条
            aiOutput.style.maxHeight = 'none';
            aiOutput.style.height = 'auto';
            aiOutput.style.overflow = 'visible';
            aiOutput.style.overflowY = 'visible';
            aiOutput.style.overflowX = 'visible';

            // 移除可能的CSS类
            aiOutput.classList.remove('scrollable');
        }

        if (aiResultSection) {
            aiResultSection.style.maxHeight = 'none';
            aiResultSection.style.height = 'auto';
            aiResultSection.style.overflow = 'visible';
            aiResultSection.style.overflowY = 'visible';
            aiResultSection.style.overflowX = 'visible';
        }

        console.log('已强制移除AI输出区域的滚动条');
    }

    // 显示成功信息
    showSuccess(message) {
        // 创建临时提示
        const toast = document.createElement('div');
        toast.className = 'success-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #00d4ff, #00ff88);
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            z-index: 10000;
            animation: slideInFromRight 0.3s ease-out;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInFromRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // 显示错误信息
    showError(message) {
        // 创建临时提示
        const toast = document.createElement('div');
        toast.className = 'error-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff4444, #ff6666);
            color: white;
            padding: 1rem 2rem;
            border-radius: 4px;
            z-index: 10000;
            animation: slideInFromRight 0.3s ease-out;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideInFromRight 0.3s ease-out reverse';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, 3000);
    }

    // 简单的Markdown解析（备用）
    simpleMarkdownParse(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/### (.*?)$/gm, '<h3>$1</h3>')
            .replace(/## (.*?)$/gm, '<h2>$1</h2>')
            .replace(/# (.*?)$/gm, '<h1>$1</h1>')
            .replace(/\n/g, '<br>');
    }

    // 生成紫薇斗数提示词
    generateZiweiPrompt(ziweiResult) {
        if (!ziweiResult || !ziweiResult.palaces) return '';

        let prompt = '\n\n=== 紫薇斗数命盘信息 ===\n';
        prompt += `命宫：${ziweiResult.earthlyBranchOfSoulPalace}\n`;
        prompt += `身宫：${ziweiResult.earthlyBranchOfBodyPalace}\n`;
        if (ziweiResult.fiveElementsClass) {
            prompt += `五行局：${ziweiResult.fiveElementsClass}\n`;
        }

        prompt += '\n十二宫星曜分布：\n';
        ziweiResult.palaces.forEach(palace => {
            const majorStars = palace.majorStars && palace.majorStars.length > 0
                ? palace.majorStars.join('、') : '无主星';
            const minorStars = palace.minorStars && palace.minorStars.length > 0
                ? palace.minorStars.slice(0, 3).join('、') : '';

            prompt += `${palace.name}(${palace.earthlyBranch})：${majorStars}`;
            if (minorStars) {
                prompt += ` | ${minorStars}`;
            }
            prompt += '\n';
        });

        prompt += '\n请结合紫薇斗数命盘进行综合分析。';
        return prompt;
    }

    // 显示AI处理状态
    showAIProcessing() {
        const processingBox = document.getElementById('ai-processing-box');
        const processingSteps = document.getElementById('ai-processing-steps');
        const errorMessage = document.getElementById('ai-error-message');

        processingBox.style.display = 'block';
        processingSteps.innerHTML = '';
        errorMessage.style.display = 'none';
    }

    // 隐藏AI处理状态
    hideAIProcessing() {
        const processingBox = document.getElementById('ai-processing-box');
        processingBox.style.display = 'none';
    }

    // 显示AI错误
    showAIError(message) {
        const errorMessage = document.getElementById('ai-error-message');
        errorMessage.textContent = `❌ ${message}`;
        errorMessage.style.display = 'block';

        // 不再显示复制提示词按钮，保护商业机密
    }

    // 复制AI分析结果
    copyAIResult() {
        if (!this.fullAIResponse) return;

        const textArea = document.createElement('textarea');
        textArea.value = this.fullAIResponse;
        document.body.appendChild(textArea);
        textArea.select();

        try {
            document.execCommand('copy');
            const copyBtn = document.getElementById('copy-ai-result');
            const originalText = copyBtn.querySelector('span').textContent;
            copyBtn.querySelector('span').textContent = '✅ 复制成功!';
            setTimeout(() => {
                copyBtn.querySelector('span').textContent = originalText;
            }, 2000);
        } catch (err) {
            console.error('复制失败:', err);
        }

        document.body.removeChild(textArea);
    }

    // 提示词切换功能已移除，保护商业机密

    // 生成用于PDF/图片的HTML报告
    generateReportHTML() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) return '';

        const title = resultContent.querySelector('.result-title')?.textContent || '';
        const info = resultContent.querySelector('.result-info')?.textContent || '';

        // 获取AI分析结果
        const aiOutput = document.getElementById('ai-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Microsoft YaHei', 'SimHei', Arial, sans-serif;
                        line-height: 1.8;
                        color: #333;
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                        margin: 0;
                        padding: 40px;
                        min-height: 100vh;
                    }
                    .report-container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: rgba(255, 255, 255, 0.95);
                        border-radius: 15px;
                        padding: 40px;
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
                    }
                    .report-header {
                        text-align: center;
                        margin-bottom: 40px;
                        border-bottom: 3px solid #00d4ff;
                        padding-bottom: 20px;
                    }
                    .report-title {
                        font-size: 2.5rem;
                        font-weight: bold;
                        background: linear-gradient(45deg, #00d4ff, #ff0080);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 10px;
                    }
                    .report-subtitle {
                        font-size: 1.2rem;
                        color: #666;
                        margin-bottom: 20px;
                    }
                    .basic-info {
                        background: linear-gradient(45deg, #f8f9fa, #e9ecef);
                        padding: 20px;
                        border-radius: 10px;
                        margin-bottom: 30px;
                        border-left: 5px solid #00d4ff;
                    }
                    .section {
                        margin-bottom: 30px;
                        padding: 20px;
                        border-radius: 10px;
                        background: #f8f9fa;
                    }
                    .section-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #00d4ff;
                        margin-bottom: 15px;
                        border-bottom: 2px solid #00d4ff;
                        padding-bottom: 5px;
                    }
                    .bazi-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 15px;
                        margin: 20px 0;
                    }
                    .pillar-card {
                        background: white;
                        border: 2px solid #00d4ff;
                        border-radius: 8px;
                        padding: 15px;
                        text-align: center;
                        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    }
                    .pillar-name {
                        font-weight: bold;
                        color: #ff0080;
                        margin-bottom: 8px;
                    }
                    .pillar-chars {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 5px;
                    }
                    .pillar-god {
                        color: #666;
                        font-size: 0.9rem;
                    }
                    .ai-analysis {
                        background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
                        border: 2px solid #00d4ff;
                        border-radius: 10px;
                        padding: 25px;
                    }
                    .ai-analysis h1, .ai-analysis h2, .ai-analysis h3 {
                        color: #00d4ff;
                        margin-top: 20px;
                        margin-bottom: 10px;
                    }
                    .ai-analysis h1 {
                        font-size: 1.8rem;
                        border-bottom: 2px solid #00d4ff;
                        padding-bottom: 5px;
                    }
                    .ai-analysis h2 {
                        font-size: 1.5rem;
                    }
                    .ai-analysis h3 {
                        font-size: 1.3rem;
                    }
                    .ai-analysis strong {
                        color: #ff0080;
                    }
                    .ai-analysis em {
                        color: #00aa66;
                        font-style: italic;
                    }
                    .report-footer {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 20px;
                        border-top: 2px solid #00d4ff;
                        color: #666;
                        font-size: 0.9rem;
                    }
                    .watermark {
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        opacity: 0.3;
                        font-size: 0.8rem;
                        color: #999;
                    }
                </style>
            </head>
            <body>
                <div class="report-container">
                    <div class="report-header">
                        <div class="report-title">赛博论命</div>
                        <div class="report-subtitle">完整命理分析报告</div>
                    </div>

                    <div class="basic-info">
                        <strong>基本信息</strong><br>
                        ${info}
                    </div>

                    ${this.generateBaziHTML(resultContent)}
                    ${this.generateSolarTimeHTML(resultContent)}
                    ${this.generateDayunHTML(resultContent)}
                    ${this.generateZiweiHTML(resultContent)}

                    ${aiAnalysis ? `
                        <div class="section">
                            <div class="section-title">AI智能分析</div>
                            <div class="ai-analysis">
                                ${aiAnalysis}
                            </div>
                        </div>
                    ` : ''}

                    <div class="report-footer">
                        报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                        本报告由赛博论命系统生成
                    </div>
                </div>
                <div class="watermark">赛博论命 CyberFortune</div>
            </body>
            </html>
        `;
    }

    // 生成八字HTML部分
    generateBaziHTML(resultContent) {
        const pillars = resultContent.querySelectorAll('.pillar');
        if (pillars.length === 0) return '';

        const pillarNames = ['年柱', '月柱', '日柱', '时柱'];
        let html = '<div class="section"><div class="section-title">八字命盘</div><div class="bazi-grid">';

        pillars.forEach((pillar, index) => {
            const chars = pillar.querySelector('.pillar-chars')?.textContent || '';
            const god = pillar.querySelector('.pillar-god')?.textContent || '';

            html += `
                <div class="pillar-card">
                    <div class="pillar-name">${pillarNames[index] || ''}</div>
                    <div class="pillar-chars">${chars}</div>
                    <div class="pillar-god">${god}</div>
                </div>
            `;
        });

        html += '</div></div>';
        return html;
    }

    // 生成真太阳时HTML部分
    generateSolarTimeHTML(resultContent) {
        const solarTimeSection = resultContent.querySelector('.solar-time-section');
        if (!solarTimeSection) return '';

        let html = '<div class="section"><div class="section-title">真太阳时修正</div>';

        const timeRows = solarTimeSection.querySelectorAll('.time-row');
        timeRows.forEach(row => {
            const label = row.querySelector('.time-label')?.textContent || '';
            const value = row.querySelector('.time-value')?.textContent || '';
            if (label && value) {
                html += `<p><strong>${label}</strong>${value}</p>`;
            }
        });

        html += '</div>';
        return html;
    }

    // 生成大运HTML部分
    generateDayunHTML(resultContent) {
        const dayunSection = resultContent.querySelector('.dayun-section');
        if (!dayunSection) return '';

        let html = '<div class="section"><div class="section-title">大运信息</div>';

        const dayunInfo = dayunSection.querySelector('.dayun-info p')?.textContent || '';
        if (dayunInfo) {
            html += `<p>${dayunInfo}</p>`;
        }

        const dayunPillars = dayunSection.querySelectorAll('.dayun-pillar');
        if (dayunPillars.length > 0) {
            html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 10px; margin-top: 15px;">';
            dayunPillars.forEach(pillar => {
                const age = pillar.querySelector('.dayun-age')?.textContent || '';
                const chars = pillar.querySelector('.dayun-chars')?.textContent || '';
                if (age && chars) {
                    html += `
                        <div style="background: white; border: 1px solid #00d4ff; border-radius: 5px; padding: 10px; text-align: center;">
                            <div style="font-size: 0.8rem; color: #666;">${age}</div>
                            <div style="font-weight: bold; color: #333;">${chars}</div>
                        </div>
                    `;
                }
            });
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // 生成紫薇斗数HTML部分
    generateZiweiHTML(resultContent) {
        const ziweiSection = resultContent.querySelector('.ziwei-section');
        if (!ziweiSection) return '';

        let html = '<div class="section"><div class="section-title">紫薇斗数分析</div>';

        // 基本信息
        const basicInfo = ziweiSection.querySelector('.ziwei-basic-info');
        if (basicInfo) {
            const infoRows = basicInfo.querySelectorAll('.info-row');
            infoRows.forEach(row => {
                const label = row.querySelector('.info-label')?.textContent || '';
                const value = row.querySelector('.info-value')?.textContent || '';
                if (label && value) {
                    html += `<p><strong>${label}</strong>${value}</p>`;
                }
            });
        }

        // 命盘分析
        const analysis = ziweiSection.querySelector('.analysis-text pre')?.textContent || '';
        if (analysis) {
            html += `<div style="background: #f0f8ff; padding: 15px; border-radius: 5px; margin: 15px 0;"><pre style="white-space: pre-wrap; font-family: inherit;">${analysis}</pre></div>`;
        }

        html += '</div>';
        return html;
    }

    // 创建PDF
    async createPDFFromHTML(htmlContent) {
        if (typeof window.jsPDF === 'undefined' && typeof jsPDF === 'undefined') {
            throw new Error('jsPDF库未加载，请检查网络连接');
        }

        // 获取jsPDF构造函数
        const { jsPDF } = window.jsPDF || window;

        // 创建临时容器
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        tempDiv.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 800px;
            background: white;
            max-height: none !important;
            overflow: visible !important;
            height: auto !important;
        `;
        document.body.appendChild(tempDiv);

        try {
            // 等待内容渲染完成
            await new Promise(resolve => setTimeout(resolve, 500));

            // 强制重新计算高度
            const actualHeight = Math.max(
                tempDiv.scrollHeight,
                tempDiv.offsetHeight,
                tempDiv.clientHeight
            );

            console.log('PDF生成 - 计算的实际高度:', actualHeight);

            // 使用html2canvas截图
            const canvas = await html2canvas(tempDiv, {
                width: 800,
                height: actualHeight,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                scrollX: 0,
                scrollY: 0
            });

            // 创建PDF
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4宽度
            const pageHeight = 295; // A4高度
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;
            let position = 0;

            // 添加第一页
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            // 如果内容超过一页，添加更多页面
            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            return pdf;
        } finally {
            document.body.removeChild(tempDiv);
        }
    }

    // 创建Canvas
    async createCanvasFromHTML(htmlContent) {
        // 确保库已加载
        if (typeof html2canvas === 'undefined') {
            console.log('html2canvas未加载，尝试动态加载...');

            if (typeof window.ensureLibrariesLoaded === 'function') {
                const loaded = await window.ensureLibrariesLoaded();
                if (!loaded) {
                    throw new Error('html2canvas库加载失败，请检查网络连接或尝试刷新页面');
                }
            } else {
                throw new Error('html2canvas库未加载，请刷新页面重试');
            }
        }

        // 创建临时容器
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;
        tempDiv.style.cssText = `
            position: absolute;
            top: -9999px;
            left: -9999px;
            width: 800px;
            visibility: hidden;
            overflow: visible;
        `;
        document.body.appendChild(tempDiv);

        try {
            // 等待内容渲染完成
            await new Promise(resolve => setTimeout(resolve, 500));

            // 获取实际内容高度
            const actualHeight = Math.max(
                tempDiv.scrollHeight,
                tempDiv.offsetHeight,
                tempDiv.clientHeight
            );

            console.log('Canvas尺寸:', { width: 800, height: actualHeight });

            const canvas = await html2canvas(tempDiv, {
                width: 800,
                height: actualHeight,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: null,
                logging: false,
                removeContainer: false
            });

            return canvas;
        } finally {
            document.body.removeChild(tempDiv);
        }
    }

    // 下载Canvas为图片
    downloadCanvasAsImage(canvas, fileName) {
        const link = document.createElement('a');
        link.download = fileName;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // 显示处理状态
    showProcessing(message) {
        // 创建或更新处理提示
        let processingDiv = document.getElementById('global-processing');
        if (!processingDiv) {
            processingDiv = document.createElement('div');
            processingDiv.id = 'global-processing';
            processingDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 20px 40px;
                border-radius: 10px;
                z-index: 10000;
                text-align: center;
                font-size: 1.1rem;
            `;
            document.body.appendChild(processingDiv);
        }
        processingDiv.textContent = message;
        processingDiv.style.display = 'block';
    }

    // 隐藏处理状态
    hideProcessing() {
        const processingDiv = document.getElementById('global-processing');
        if (processingDiv) {
            processingDiv.style.display = 'none';
        }
    }

    // 打开打印预览（PDF生成失败时的备选方案）
    openPrintPreview() {
        const reportHTML = this.generatePrintableHTML();

        // 创建新窗口用于打印
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(reportHTML);
        printWindow.document.close();

        // 等待内容加载完成后打开打印对话框
        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.print();
            }, 1000);
        };

        this.showSuccess('已打开打印预览，您可以选择"另存为PDF"保存');
    }

    // 生成适合打印的HTML
    generatePrintableHTML() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) return '';

        const title = resultContent.querySelector('.result-title')?.textContent || '';
        const info = resultContent.querySelector('.result-info')?.textContent || '';

        // 获取AI分析结果
        const aiOutput = document.getElementById('ai-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <title>赛博论命报告</title>
                <style>
                    * { box-sizing: border-box; }
                    body {
                        font-family: 'Microsoft YaHei', 'SimHei', Arial, sans-serif;
                        line-height: 1.8;
                        color: #333;
                        margin: 0;
                        padding: 20px;
                        background: white;
                    }
                    .report-container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        padding: 30px;
                    }
                    .report-header {
                        text-align: center;
                        margin-bottom: 30px;
                        border-bottom: 3px solid #333;
                        padding-bottom: 20px;
                    }
                    .report-title {
                        font-size: 2.5rem;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 10px;
                    }
                    .report-subtitle {
                        font-size: 1.2rem;
                        color: #666;
                        margin-bottom: 20px;
                    }
                    .basic-info {
                        background: #f8f9fa;
                        padding: 20px;
                        border-radius: 8px;
                        margin-bottom: 25px;
                        border-left: 5px solid #333;
                    }
                    .section {
                        margin-bottom: 25px;
                        padding: 20px;
                        border-radius: 8px;
                        background: #f8f9fa;
                        page-break-inside: avoid;
                    }
                    .section-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 15px;
                        border-bottom: 2px solid #333;
                        padding-bottom: 5px;
                    }
                    .bazi-grid {
                        display: grid;
                        grid-template-columns: repeat(4, 1fr);
                        gap: 15px;
                        margin: 20px 0;
                    }
                    .pillar-card {
                        background: white;
                        border: 2px solid #333;
                        border-radius: 8px;
                        padding: 15px;
                        text-align: center;
                    }
                    .pillar-name {
                        font-weight: bold;
                        color: #333;
                        margin-bottom: 8px;
                    }
                    .pillar-chars {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: #000;
                        margin-bottom: 5px;
                    }
                    .pillar-god {
                        color: #666;
                        font-size: 0.9rem;
                    }
                    .ai-analysis {
                        background: #f0f8ff;
                        border: 2px solid #333;
                        border-radius: 8px;
                        padding: 25px;
                    }
                    .ai-analysis h1, .ai-analysis h2, .ai-analysis h3 {
                        color: #333;
                        margin-top: 20px;
                        margin-bottom: 10px;
                    }
                    .ai-analysis h1 {
                        font-size: 1.8rem;
                        border-bottom: 2px solid #333;
                        padding-bottom: 5px;
                    }
                    .ai-analysis h2 { font-size: 1.5rem; }
                    .ai-analysis h3 { font-size: 1.3rem; }
                    .ai-analysis strong { color: #000; }
                    .ai-analysis em { color: #333; font-style: italic; }
                    .report-footer {
                        text-align: center;
                        margin-top: 30px;
                        padding-top: 20px;
                        border-top: 2px solid #333;
                        color: #666;
                        font-size: 0.9rem;
                    }
                    @media print {
                        body { margin: 0; padding: 15px; }
                        .report-container { padding: 0; }
                        .section { page-break-inside: avoid; }
                        .bazi-grid { page-break-inside: avoid; }
                        .ai-analysis { page-break-inside: avoid; }
                    }
                    @page { margin: 2cm; size: A4; }
                </style>
            </head>
            <body>
                <div class="report-container">
                    <div class="report-header">
                        <div class="report-title">赛博论命</div>
                        <div class="report-subtitle">完整命理分析报告</div>
                    </div>

                    <div class="basic-info">
                        <strong>基本信息</strong><br>
                        ${info}
                    </div>

                    ${this.generateBaziHTML(resultContent)}
                    ${this.generateSolarTimeHTML(resultContent)}
                    ${this.generateDayunHTML(resultContent)}
                    ${this.generateZiweiHTML(resultContent)}

                    ${aiAnalysis ? `
                        <div class="section">
                            <div class="section-title">AI智能分析</div>
                            <div class="ai-analysis">
                                ${aiAnalysis}
                            </div>
                        </div>
                    ` : ''}

                    <div class="report-footer">
                        报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                        本报告由赛博论命系统生成
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // 生成专用于长图的HTML
    generateLongImageHTML() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) return '';

        const title = resultContent.querySelector('.result-title')?.textContent || '';
        const info = resultContent.querySelector('.result-info')?.textContent || '';

        // 获取AI分析结果
        const aiOutput = document.getElementById('ai-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: 'Microsoft YaHei', 'SimHei', Arial, sans-serif;
                        line-height: 1.6;
                        color: #fff;
                        background: linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%);
                        margin: 0;
                        padding: 0;
                        width: 800px;
                        min-height: 100vh;
                    }
                    .long-image-container {
                        width: 800px;
                        padding: 40px;
                        box-sizing: border-box;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 40px;
                        padding: 30px 0;
                        background: linear-gradient(45deg, rgba(0, 212, 255, 0.2), rgba(255, 0, 128, 0.2));
                        border-radius: 15px;
                        border: 2px solid rgba(0, 212, 255, 0.3);
                    }
                    .main-title {
                        font-size: 3rem;
                        font-weight: bold;
                        background: linear-gradient(45deg, #00d4ff, #ff0080);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        margin-bottom: 15px;
                        text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
                    }
                    .subtitle {
                        font-size: 1.3rem;
                        color: #00d4ff;
                        margin-bottom: 20px;
                    }
                    .basic-info {
                        background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.1));
                        padding: 25px;
                        border-radius: 12px;
                        margin-bottom: 30px;
                        border: 1px solid rgba(0, 212, 255, 0.3);
                        text-align: center;
                        font-size: 1.1rem;
                    }
                    .section {
                        margin-bottom: 35px;
                        padding: 25px;
                        border-radius: 12px;
                        background: rgba(0, 0, 0, 0.3);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                    }
                    .section-title {
                        font-size: 1.8rem;
                        font-weight: bold;
                        color: #00d4ff;
                        margin-bottom: 20px;
                        text-align: center;
                        border-bottom: 2px solid #00d4ff;
                        padding-bottom: 10px;
                    }
                    .bazi-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 20px;
                        margin: 25px 0;
                    }
                    .pillar-card {
                        background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.1));
                        border: 2px solid rgba(0, 212, 255, 0.4);
                        border-radius: 10px;
                        padding: 20px;
                        text-align: center;
                        transition: all 0.3s ease;
                    }
                    .pillar-name {
                        font-weight: bold;
                        color: #ff0080;
                        margin-bottom: 10px;
                        font-size: 1.1rem;
                    }
                    .pillar-chars {
                        font-size: 2rem;
                        font-weight: bold;
                        color: #00d4ff;
                        margin-bottom: 8px;
                        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
                    }
                    .pillar-god {
                        color: #00ff88;
                        font-size: 1rem;
                    }
                    .info-grid {
                        display: grid;
                        grid-template-columns: 1fr;
                        gap: 15px;
                        margin: 20px 0;
                    }
                    .info-item {
                        background: rgba(0, 0, 0, 0.2);
                        padding: 15px;
                        border-radius: 8px;
                        border-left: 4px solid #00d4ff;
                    }
                    .info-label {
                        color: #00d4ff;
                        font-weight: bold;
                        margin-bottom: 5px;
                    }
                    .info-value {
                        color: #fff;
                        font-size: 1.1rem;
                    }
                    .dayun-grid {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 15px;
                        margin: 20px 0;
                    }
                    .dayun-item {
                        background: linear-gradient(135deg, rgba(0, 255, 136, 0.1), rgba(0, 212, 255, 0.1));
                        border: 1px solid rgba(0, 255, 136, 0.3);
                        border-radius: 8px;
                        padding: 15px;
                        text-align: center;
                    }
                    .dayun-age {
                        color: #00ff88;
                        font-size: 0.9rem;
                        margin-bottom: 5px;
                    }
                    .dayun-chars {
                        color: #fff;
                        font-size: 1.3rem;
                        font-weight: bold;
                    }
                    .ai-analysis {
                        background: linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(0, 212, 255, 0.1));
                        border: 2px solid rgba(255, 0, 128, 0.3);
                        border-radius: 12px;
                        padding: 30px;
                        margin: 30px 0;
                    }
                    .ai-analysis h1, .ai-analysis h2, .ai-analysis h3 {
                        color: #00d4ff;
                        margin-top: 25px;
                        margin-bottom: 15px;
                    }
                    .ai-analysis h1 {
                        font-size: 1.8rem;
                        border-bottom: 2px solid #00d4ff;
                        padding-bottom: 8px;
                    }
                    .ai-analysis h2 { font-size: 1.5rem; }
                    .ai-analysis h3 { font-size: 1.3rem; }
                    .ai-analysis strong { color: #ff0080; }
                    .ai-analysis em { color: #00ff88; font-style: italic; }
                    .ai-analysis p { margin: 15px 0; line-height: 1.8; }
                    .footer {
                        text-align: center;
                        margin-top: 40px;
                        padding: 25px;
                        background: rgba(0, 0, 0, 0.3);
                        border-radius: 12px;
                        border-top: 2px solid #00d4ff;
                        color: #ccc;
                    }
                    .watermark {
                        position: absolute;
                        bottom: 20px;
                        right: 20px;
                        opacity: 0.3;
                        font-size: 0.9rem;
                        color: #00d4ff;
                    }
                </style>
            </head>
            <body>
                <div class="long-image-container">
                    <div class="header">
                        <div class="main-title">赛博论命</div>
                        <div class="subtitle">完整命理分析报告</div>
                    </div>

                    <div class="basic-info">
                        <strong>基本信息</strong><br>
                        ${info}
                    </div>

                    ${this.generateBaziHTMLForLongImage(resultContent)}
                    ${this.generateSolarTimeHTMLForLongImage(resultContent)}
                    ${this.generateDayunHTMLForLongImage(resultContent)}
                    ${this.generateZiweiHTMLForLongImage(resultContent)}

                    ${aiAnalysis ? `
                        <div class="section">
                            <div class="section-title">AI智能分析</div>
                            <div class="ai-analysis">
                                ${aiAnalysis}
                            </div>
                        </div>
                    ` : ''}

                    <div class="footer">
                        报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                        本报告由赛博论命系统生成
                    </div>
                </div>
                <div class="watermark">赛博论命 CyberFortune</div>
            </body>
            </html>
        `;
    }

    // 生成长图专用的八字HTML
    generateBaziHTMLForLongImage(resultContent) {
        const pillars = resultContent.querySelectorAll('.pillar');
        if (pillars.length === 0) return '';

        const pillarNames = ['年柱', '月柱', '日柱', '时柱'];
        let html = '<div class="section"><div class="section-title">八字命盘</div><div class="bazi-grid">';

        pillars.forEach((pillar, index) => {
            const chars = pillar.querySelector('.pillar-chars')?.textContent || '';
            const god = pillar.querySelector('.pillar-god')?.textContent || '';

            html += `
                <div class="pillar-card">
                    <div class="pillar-name">${pillarNames[index] || ''}</div>
                    <div class="pillar-chars">${chars}</div>
                    <div class="pillar-god">${god}</div>
                </div>
            `;
        });

        html += '</div></div>';
        return html;
    }

    // 生成长图专用的真太阳时HTML
    generateSolarTimeHTMLForLongImage(resultContent) {
        const solarTimeSection = resultContent.querySelector('.solar-time-section');
        if (!solarTimeSection) return '';

        let html = '<div class="section"><div class="section-title">真太阳时修正</div><div class="info-grid">';

        const timeRows = solarTimeSection.querySelectorAll('.time-row');
        timeRows.forEach(row => {
            const label = row.querySelector('.time-label')?.textContent || '';
            const value = row.querySelector('.time-value')?.textContent || '';
            if (label && value) {
                html += `
                    <div class="info-item">
                        <div class="info-label">${label}</div>
                        <div class="info-value">${value}</div>
                    </div>
                `;
            }
        });

        html += '</div></div>';
        return html;
    }

    // 生成长图专用的大运HTML
    generateDayunHTMLForLongImage(resultContent) {
        const dayunSection = resultContent.querySelector('.dayun-section');
        if (!dayunSection) return '';

        let html = '<div class="section"><div class="section-title">大运信息</div>';

        const dayunInfo = dayunSection.querySelector('.dayun-info p')?.textContent || '';
        if (dayunInfo) {
            html += `<div class="info-item"><div class="info-value">${dayunInfo}</div></div>`;
        }

        const dayunPillars = dayunSection.querySelectorAll('.dayun-pillar');
        if (dayunPillars.length > 0) {
            html += '<div class="dayun-grid">';
            dayunPillars.forEach(pillar => {
                const age = pillar.querySelector('.dayun-age')?.textContent || '';
                const chars = pillar.querySelector('.dayun-chars')?.textContent || '';
                if (age && chars) {
                    html += `
                        <div class="dayun-item">
                            <div class="dayun-age">${age}</div>
                            <div class="dayun-chars">${chars}</div>
                        </div>
                    `;
                }
            });
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    // 生成长图专用的紫薇斗数HTML
    generateZiweiHTMLForLongImage(resultContent) {
        const ziweiSection = resultContent.querySelector('.ziwei-section');
        if (!ziweiSection) return '';

        let html = '<div class="section"><div class="section-title">紫薇斗数分析</div>';

        // 基本信息
        const basicInfo = ziweiSection.querySelector('.ziwei-basic-info');
        if (basicInfo) {
            html += '<div class="info-grid">';
            const infoRows = basicInfo.querySelectorAll('.info-row');
            infoRows.forEach(row => {
                const label = row.querySelector('.info-label')?.textContent || '';
                const value = row.querySelector('.info-value')?.textContent || '';
                if (label && value) {
                    html += `
                        <div class="info-item">
                            <div class="info-label">${label}</div>
                            <div class="info-value">${value}</div>
                        </div>
                    `;
                }
            });
            html += '</div>';
        }

        // 命盘分析
        const analysis = ziweiSection.querySelector('.analysis-text pre')?.textContent || '';
        if (analysis) {
            html += `
                <div class="info-item" style="margin-top: 20px;">
                    <div class="info-label">命盘分析</div>
                    <div class="info-value" style="white-space: pre-wrap; line-height: 1.8;">${analysis}</div>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    // 从现有内容创建Canvas（更可靠的方法）
    async createCanvasFromExistingContent() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) {
            throw new Error('找不到结果内容');
        }

        // 直接使用现有的结果内容进行截图
        try {
            console.log('开始截取现有内容...');

            // 临时修改样式以便截图
            const originalStyle = resultContent.style.cssText;

            // 确保AI分析结果区域完全展开
            const aiOutput = document.getElementById('ai-output');
            const aiOriginalStyle = aiOutput ? aiOutput.style.cssText : '';
            if (aiOutput) {
                aiOutput.style.cssText = `
                    ${aiOriginalStyle}
                    max-height: none !important;
                    overflow: visible !important;
                    height: auto !important;
                `;
            }

            resultContent.style.cssText = `
                ${originalStyle}
                position: relative;
                width: 800px;
                background: linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%);
                color: white;
                padding: 40px;
                box-sizing: border-box;
                margin: 0;
                max-height: none !important;
                overflow: visible !important;
                height: auto !important;
            `;

            // 等待样式应用和重新布局
            await new Promise(resolve => setTimeout(resolve, 1000));

            // 强制重新计算高度
            const actualHeight = Math.max(
                resultContent.scrollHeight,
                resultContent.offsetHeight,
                resultContent.clientHeight
            );

            console.log('计算的实际高度:', actualHeight);

            const canvas = await html2canvas(resultContent, {
                width: 800,
                height: actualHeight,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                backgroundColor: '#1a1a2e',
                logging: true,
                removeContainer: false,
                scrollX: 0,
                scrollY: 0
            });

            // 恢复原始样式
            resultContent.style.cssText = originalStyle;
            if (aiOutput) {
                aiOutput.style.cssText = aiOriginalStyle;
            }

            console.log('截图完成:', canvas.width, 'x', canvas.height);
            return canvas;

        } catch (error) {
            console.error('截图失败:', error);
            throw error;
        }
    }

    // 生成简化的报告HTML
    generateSimplifiedReportHTML() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        const title = resultContent.querySelector('.result-title')?.textContent || '';
        const info = resultContent.querySelector('.result-info')?.textContent || '';

        // 获取AI分析结果
        const aiOutput = document.getElementById('ai-output');
        const aiAnalysis = aiOutput ? aiOutput.textContent : '';

        let html = `
            <div style="text-align: center; margin-bottom: 40px; padding: 30px; background: linear-gradient(45deg, rgba(0, 212, 255, 0.2), rgba(255, 0, 128, 0.2)); border-radius: 15px;">
                <h1 style="font-size: 3rem; margin: 0 0 15px 0; background: linear-gradient(45deg, #00d4ff, #ff0080); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">赛博论命</h1>
                <h2 style="font-size: 1.3rem; color: #00d4ff; margin: 0;">完整命理分析报告</h2>
            </div>

            <div style="background: rgba(0, 212, 255, 0.1); padding: 25px; border-radius: 12px; margin-bottom: 30px; border: 1px solid rgba(0, 212, 255, 0.3); text-align: center;">
                <strong style="color: #00d4ff;">基本信息</strong><br>
                <span style="font-size: 1.1rem;">${info}</span>
            </div>
        `;

        // 添加八字信息
        const pillars = resultContent.querySelectorAll('.pillar');
        if (pillars.length > 0) {
            html += `
                <div style="margin-bottom: 35px; padding: 25px; border-radius: 12px; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1);">
                    <h3 style="font-size: 1.8rem; color: #00d4ff; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">八字命盘</h3>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;">
            `;

            const pillarNames = ['年柱', '月柱', '日柱', '时柱'];
            pillars.forEach((pillar, index) => {
                const chars = pillar.querySelector('.pillar-chars')?.textContent || '';
                const god = pillar.querySelector('.pillar-god')?.textContent || '';

                html += `
                    <div style="background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(255, 0, 128, 0.1)); border: 2px solid rgba(0, 212, 255, 0.4); border-radius: 10px; padding: 20px; text-align: center;">
                        <div style="font-weight: bold; color: #ff0080; margin-bottom: 10px; font-size: 1.1rem;">${pillarNames[index]}</div>
                        <div style="font-size: 2rem; font-weight: bold; color: #00d4ff; margin-bottom: 8px;">${chars}</div>
                        <div style="color: #00ff88; font-size: 1rem;">${god}</div>
                    </div>
                `;
            });

            html += '</div></div>';
        }

        // 添加AI分析（如果有）
        if (aiAnalysis) {
            html += `
                <div style="margin-bottom: 35px; padding: 25px; border-radius: 12px; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1);">
                    <h3 style="font-size: 1.8rem; color: #00d4ff; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">AI智能分析</h3>
                    <div style="background: linear-gradient(135deg, rgba(255, 0, 128, 0.1), rgba(0, 212, 255, 0.1)); border: 2px solid rgba(255, 0, 128, 0.3); border-radius: 12px; padding: 30px; line-height: 1.8; white-space: pre-wrap;">
                        ${aiAnalysis.substring(0, 1000)}${aiAnalysis.length > 1000 ? '...' : ''}
                    </div>
                </div>
            `;
        }

        // 添加页脚
        html += `
            <div style="text-align: center; margin-top: 40px; padding: 25px; background: rgba(0, 0, 0, 0.3); border-radius: 12px; border-top: 2px solid #00d4ff; color: #ccc;">
                报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                本报告由赛博论命系统生成
            </div>
        `;

        return html;
    }

    // 测试Canvas生成（调试用）
    async testCanvasGeneration() {
        try {
            console.log('开始测试Canvas生成...');

            // 检查html2canvas是否可用
            if (typeof html2canvas === 'undefined') {
                this.showError('html2canvas库未加载，请检查网络连接');
                return;
            }

            // 创建一个简单的Canvas测试
            const canvas = document.createElement('canvas');
            canvas.width = 400;
            canvas.height = 300;
            const ctx = canvas.getContext('2d');

            // 绘制渐变背景
            const gradient = ctx.createLinearGradient(0, 0, 400, 300);
            gradient.addColorStop(0, '#ff0080');
            gradient.addColorStop(1, '#00d4ff');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 300);

            // 绘制文字
            ctx.fillStyle = 'white';
            ctx.font = 'bold 24px Arial';
            ctx.fillText('Canvas测试成功', 50, 100);

            ctx.font = '16px Arial';
            ctx.fillText('这是一个简单的Canvas测试', 50, 150);
            ctx.fillText('如果您看到这张图片，说明Canvas功能正常', 50, 180);

            // 绘制矩形
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.fillRect(50, 200, 300, 50);

            ctx.fillStyle = 'white';
            ctx.font = '14px Arial';
            ctx.fillText('测试框内容', 60, 230);

            console.log('Canvas绘制完成:', canvas.width, 'x', canvas.height);

            // 下载测试图片
            this.downloadCanvasAsImage(canvas, 'canvas_test.png');
            this.showSuccess('Canvas测试图片已生成');

        } catch (error) {
            console.error('Canvas测试失败:', error);
            this.showError(`Canvas测试失败: ${error.message}`);
        }
    }

    // 手动创建Canvas（备用方法）
    async createCanvasManually() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) {
            throw new Error('找不到结果内容');
        }

        console.log('使用手动Canvas绘制方法...');

        // 创建Canvas
        const canvas = document.createElement('canvas');
        canvas.width = 800;
        canvas.height = 1200; // 预设高度，后续可调整
        const ctx = canvas.getContext('2d');

        // 绘制背景
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(0.3, '#16213e');
        gradient.addColorStop(0.6, '#0f3460');
        gradient.addColorStop(1, '#1a1a2e');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let y = 60; // 当前绘制位置

        // 绘制标题
        ctx.fillStyle = '#00d4ff';
        ctx.font = 'bold 48px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('赛博论命', canvas.width / 2, y);
        y += 60;

        ctx.font = '24px Arial';
        ctx.fillText('完整命理分析报告', canvas.width / 2, y);
        y += 80;

        // 绘制基本信息
        const info = resultContent.querySelector('.result-info')?.textContent || '';
        if (info) {
            ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
            ctx.fillRect(50, y - 30, canvas.width - 100, 60);

            ctx.fillStyle = '#ffffff';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(info, canvas.width / 2, y);
            y += 100;
        }

        // 绘制八字信息
        const pillars = resultContent.querySelectorAll('.pillar');
        if (pillars.length > 0) {
            ctx.fillStyle = '#00d4ff';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('八字命盘', canvas.width / 2, y);
            y += 50;

            const pillarNames = ['年柱', '月柱', '日柱', '时柱'];
            const pillarWidth = 160;
            const pillarHeight = 120;
            const startX = (canvas.width - pillarWidth * 2 - 40) / 2;

            pillars.forEach((pillar, index) => {
                const chars = pillar.querySelector('.pillar-chars')?.textContent || '';
                const god = pillar.querySelector('.pillar-god')?.textContent || '';

                const col = index % 2;
                const row = Math.floor(index / 2);
                const x = startX + col * (pillarWidth + 40);
                const cardY = y + row * (pillarHeight + 20);

                // 绘制卡片背景
                ctx.fillStyle = 'rgba(0, 212, 255, 0.1)';
                ctx.fillRect(x, cardY, pillarWidth, pillarHeight);

                // 绘制边框
                ctx.strokeStyle = 'rgba(0, 212, 255, 0.4)';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, cardY, pillarWidth, pillarHeight);

                // 绘制柱名
                ctx.fillStyle = '#ff0080';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(pillarNames[index], x + pillarWidth / 2, cardY + 25);

                // 绘制八字
                ctx.fillStyle = '#00d4ff';
                ctx.font = 'bold 24px Arial';
                ctx.fillText(chars, x + pillarWidth / 2, cardY + 60);

                // 绘制十神
                ctx.fillStyle = '#00ff88';
                ctx.font = '14px Arial';
                ctx.fillText(god, x + pillarWidth / 2, cardY + 85);
            });

            y += Math.ceil(pillars.length / 2) * (pillarHeight + 20) + 60;
        }

        // 绘制AI分析（如果有）
        const aiOutput = document.getElementById('ai-output');
        if (aiOutput && aiOutput.textContent.trim()) {
            ctx.fillStyle = '#00d4ff';
            ctx.font = 'bold 28px Arial';
            ctx.textAlign = 'center';
            ctx.fillText('AI智能分析', canvas.width / 2, y);
            y += 50;

            // 绘制分析内容背景
            const analysisHeight = 200;
            ctx.fillStyle = 'rgba(255, 0, 128, 0.1)';
            ctx.fillRect(50, y, canvas.width - 100, analysisHeight);

            ctx.strokeStyle = 'rgba(255, 0, 128, 0.3)';
            ctx.lineWidth = 2;
            ctx.strokeRect(50, y, canvas.width - 100, analysisHeight);

            // 绘制分析文本（简化版）
            ctx.fillStyle = '#ffffff';
            ctx.font = '16px Arial';
            ctx.textAlign = 'left';
            const analysisText = aiOutput.textContent.substring(0, 200) + '...';
            const lines = this.wrapText(ctx, analysisText, canvas.width - 120);
            lines.slice(0, 8).forEach((line, index) => {
                ctx.fillText(line, 70, y + 30 + index * 22);
            });

            y += analysisHeight + 40;
        }

        // 绘制页脚
        ctx.fillStyle = '#666';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`报告生成时间：${new Date().toLocaleString('zh-CN')}`, canvas.width / 2, y);
        ctx.fillText('本报告由赛博论命系统生成', canvas.width / 2, y + 25);

        // 调整Canvas高度
        const finalHeight = y + 60;
        if (finalHeight !== canvas.height) {
            const newCanvas = document.createElement('canvas');
            newCanvas.width = canvas.width;
            newCanvas.height = finalHeight;
            const newCtx = newCanvas.getContext('2d');
            newCtx.drawImage(canvas, 0, 0);
            return newCanvas;
        }

        return canvas;
    }

    // 文本换行辅助函数
    wrapText(ctx, text, maxWidth) {
        const words = text.split('');
        const lines = [];
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i];
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        lines.push(currentLine);
        return lines;
    }



    // 初始化全局配置
    initGlobalConfig() {
        this.loadGlobalConfig();
        this.bindGlobalConfigEvents();
    }

    // 绑定全局配置事件
    bindGlobalConfigEvents() {
        const configToggle = document.getElementById('config-toggle');
        const configPanel = document.getElementById('global-config-panel');
        const configOverlay = document.getElementById('config-overlay');
        const configClose = document.getElementById('config-close');
        const saveConfigBtn = document.getElementById('save-global-config');
        const testConfigBtn = document.getElementById('test-global-config');
        const modelSelect = document.getElementById('global-model');
        const apiUrlInput = document.getElementById('global-api-url');

        // 打开配置面板
        if (configToggle) {
            configToggle.addEventListener('click', () => {
                configPanel.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        }

        // 关闭配置面板
        const closeConfig = () => {
            configPanel.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        if (configOverlay) {
            configOverlay.addEventListener('click', closeConfig);
        }
        if (configClose) {
            configClose.addEventListener('click', closeConfig);
        }

        // ESC键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && configPanel.style.display === 'flex') {
                closeConfig();
            }
        });

        // 模型切换时自动更新API地址
        if (modelSelect && apiUrlInput) {
            modelSelect.addEventListener('change', (e) => {
                const selectedModel = e.target.value;
                const apiUrls = {
                    'deepseek-r1': 'https://api.deepseek.com/v1/chat/completions',
                    'deepseek-chat': 'https://api.deepseek.com/v1/chat/completions',
                    'gpt-4': 'https://api.openai.com/v1/chat/completions',
                    'gpt-3.5-turbo': 'https://api.openai.com/v1/chat/completions',
                    'claude-3-sonnet': 'https://api.anthropic.com/v1/messages',
                    'claude-3-haiku': 'https://api.anthropic.com/v1/messages',
                    'qwen-max': 'https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation',
                    'glm-4': 'https://open.bigmodel.cn/api/paas/v4/chat/completions'
                };

                if (apiUrls[selectedModel]) {
                    apiUrlInput.value = apiUrls[selectedModel];
                }
            });
        }

        // 保存配置
        if (saveConfigBtn) {
            saveConfigBtn.addEventListener('click', () => {
                this.saveGlobalConfig();
            });
        }

        // 测试连接
        if (testConfigBtn) {
            testConfigBtn.addEventListener('click', () => {
                this.testGlobalConfig();
            });
        }
    }

    // 加载全局配置
    loadGlobalConfig() {
        try {
            const config = localStorage.getItem('cyberFortune_globalConfig');
            if (config) {
                const parsedConfig = JSON.parse(config);

                const apiUrlInput = document.getElementById('global-api-url');
                const apiKeyInput = document.getElementById('global-api-key');
                const modelSelect = document.getElementById('global-model');

                if (apiUrlInput && parsedConfig.apiUrl) {
                    apiUrlInput.value = parsedConfig.apiUrl;
                }
                if (apiKeyInput && parsedConfig.apiKey) {
                    apiKeyInput.value = parsedConfig.apiKey;
                }
                if (modelSelect && parsedConfig.model) {
                    modelSelect.value = parsedConfig.model;
                }

                this.updateConfigStatus('✅', '已配置', '#4CAF50');
            }
        } catch (error) {
            console.error('加载全局配置失败:', error);
        }
    }

    // 保存全局配置
    saveGlobalConfig() {
        try {
            const apiUrl = document.getElementById('global-api-url').value.trim();
            const apiKey = document.getElementById('global-api-key').value.trim();
            const model = document.getElementById('global-model').value;

            if (!apiUrl || !apiKey) {
                this.showConfigMessage('请填写完整的API配置信息', 'error');
                return;
            }

            const config = {
                apiUrl,
                apiKey,
                model,
                savedAt: new Date().toISOString()
            };

            localStorage.setItem('cyberFortune_globalConfig', JSON.stringify(config));
            this.updateConfigStatus('✅', '已保存', '#4CAF50');
            this.showConfigMessage('配置保存成功！', 'success');

            // 同步到各个模块
            this.syncConfigToModules(config);

        } catch (error) {
            console.error('保存全局配置失败:', error);
            this.showConfigMessage('保存配置失败', 'error');
        }
    }

    // 测试全局配置
    async testGlobalConfig() {
        const apiUrl = document.getElementById('global-api-url').value.trim();
        const apiKey = document.getElementById('global-api-key').value.trim();
        const model = document.getElementById('global-model').value;

        if (!apiUrl || !apiKey) {
            this.showConfigMessage('请先填写API配置信息', 'error');
            return;
        }

        this.updateConfigStatus('🔄', '测试中...', '#FFC107');

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: model,
                    messages: [
                        {
                            role: "user",
                            content: "测试连接"
                        }
                    ],
                    max_tokens: 10
                })
            });

            if (response.ok) {
                this.updateConfigStatus('✅', '连接成功', '#4CAF50');
                this.showConfigMessage('API连接测试成功！', 'success');
            } else {
                const errorData = await response.json().catch(() => ({}));
                this.updateConfigStatus('❌', '连接失败', '#F44336');
                this.showConfigMessage(`连接失败: ${errorData.error?.message || '未知错误'}`, 'error');
            }
        } catch (error) {
            this.updateConfigStatus('❌', '连接失败', '#F44336');
            this.showConfigMessage(`连接失败: ${error.message}`, 'error');
        }
    }

    // 更新配置状态显示
    updateConfigStatus(indicator, text, color) {
        const statusIndicator = document.querySelector('#config-status .status-indicator');
        const statusText = document.querySelector('#config-status .status-text');

        if (statusIndicator) statusIndicator.textContent = indicator;
        if (statusText) {
            statusText.textContent = text;
            statusText.style.color = color;
        }
    }

    // 显示配置消息
    showConfigMessage(message, type) {
        // 创建消息提示
        const messageDiv = document.createElement('div');
        messageDiv.className = `config-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 3000;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            transform: translateX(100%);
            transition: transform 0.3s ease;
            background: ${type === 'success' ? '#4CAF50' : '#F44336'};
        `;

        document.body.appendChild(messageDiv);

        // 显示动画
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(0)';
        }, 100);

        // 自动隐藏
        setTimeout(() => {
            messageDiv.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(messageDiv);
            }, 300);
        }, 3000);
    }

    // 同步配置到各个模块
    syncConfigToModules(config) {
        // 由于各模块已移除独立配置，现在直接使用全局配置
        // 各模块的AI分析函数会自动调用getGlobalConfig()获取配置
        console.log('全局配置已保存，各模块将自动使用全局配置');
    }

    // 获取全局配置
    getGlobalConfig() {
        try {
            const config = localStorage.getItem('cyberFortune_globalConfig');
            return config ? JSON.parse(config) : null;
        } catch (error) {
            console.error('获取全局配置失败:', error);
            return null;
        }
    }

    // ==================== 合婚AI分析相关函数 ====================

    // 绑定合婚AI分析事件
    bindMarriageAIEvents(marriageData, marriageResult, aiPrompt) {
        const generateBtn = document.getElementById('generate-marriage-ai-analysis');
        const copyBtn = document.getElementById('copy-ai-marriage-result');

        console.log('绑定合婚AI事件:', { generateBtn, copyBtn });

        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                console.log('AI分析按钮被点击');
                this.generateMarriageAIAnalysis(marriageData, marriageResult, aiPrompt);
            });
        } else {
            console.error('未找到AI分析按钮');
        }

        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                this.copyMarriageAIResult();
            });
        }
    }

    // 生成合婚AI分析提示词
    generateMarriageAIPrompt(marriageData, marriageResult) {
        const { male, female } = marriageData;

        let prompt = "";
        prompt += `你是一位精通中国传统合婚理论和现代情感心理学的专家，擅长结合八字命理、生肖配对、五行相配、十神关系等传统理论，以及现代心理学、性格分析、情感匹配等科学方法，为情侣提供全面深入的合婚分析和情感指导。\n\n`;

        prompt += `你具备深厚的传统文化底蕴，熟悉《易经》、《子平真诠》、《滴天髓》等经典著作，同时了解现代心理学理论，能够将古代智慧与现代科学相结合，为现代人的情感生活提供有价值的指导。\n\n`;

        prompt += `现在请你对以下这对情侣进行全面的合婚分析：\n\n`;

        // 男方信息
        prompt += `【男方信息】\n`;
        prompt += `姓名：${male.name}\n`;
        prompt += `出生时间：${male.year}年${male.month}月${male.day}日 ${male.hour.toString().padStart(2, '0')}:${(male.minute || 0).toString().padStart(2, '0')}\n`;
        prompt += `出生地区：${male.birthProvince || '未知'} ${male.birthCity || '未知'}\n`;
        prompt += `生肖：${this.getZodiacAnimal(male.year)}\n\n`;

        // 女方信息
        prompt += `【女方信息】\n`;
        prompt += `姓名：${female.name}\n`;
        prompt += `出生时间：${female.year}年${female.month}月${female.day}日 ${female.hour.toString().padStart(2, '0')}:${(female.minute || 0).toString().padStart(2, '0')}\n`;
        prompt += `出生地区：${female.birthProvince || '未知'} ${female.birthCity || '未知'}\n`;
        prompt += `生肖：${this.getZodiacAnimal(female.year)}\n\n`;

        // 基础合婚分析结果
        prompt += `【基础合婚分析结果】\n`;
        prompt += `综合匹配度：${marriageResult.totalScore}分 (${marriageResult.level})\n\n`;

        prompt += `生肖配对：${marriageResult.shengXiaoMatch.score}分\n`;
        prompt += `${marriageResult.shengXiaoMatch.analysis}\n\n`;

        prompt += `五行配对：${marriageResult.wuXingMatch.score}分\n`;
        prompt += `${marriageResult.wuXingMatch.analysis}\n\n`;

        prompt += `十神配对：${marriageResult.shiShenMatch.score}分\n`;
        prompt += `${marriageResult.shiShenMatch.analysis}\n\n`;

        prompt += `年龄配对：${marriageResult.ageMatch.score}分\n`;
        prompt += `${marriageResult.ageMatch.analysis}\n\n`;

        prompt += `【分析要求】\n`;
        prompt += `请基于以上信息，从以下几个维度进行深入分析：\n\n`;

        prompt += `1. **性格匹配分析**\n`;
        prompt += `   - 根据生肖和出生时间分析双方的性格特点\n`;
        prompt += `   - 分析性格互补性和潜在冲突点\n`;
        prompt += `   - 提供性格磨合的具体建议\n\n`;

        prompt += `2. **情感相处模式**\n`;
        prompt += `   - 分析双方在恋爱中的表现特点\n`;
        prompt += `   - 预测可能的情感发展模式\n`;
        prompt += `   - 提供增进感情的实用方法\n\n`;

        prompt += `3. **婚姻生活预测**\n`;
        prompt += `   - 分析婚后生活的和谐度\n`;
        prompt += `   - 预测可能面临的挑战和机遇\n`;
        prompt += `   - 提供维护婚姻稳定的建议\n\n`;

        prompt += `4. **事业财运配合**\n`;
        prompt += `   - 分析双方事业发展的互助性\n`;
        prompt += `   - 预测财运配合情况\n`;
        prompt += `   - 提供共同发展的策略建议\n\n`;

        prompt += `5. **子女教育观念**\n`;
        prompt += `   - 分析双方的教育理念匹配度\n`;
        prompt += `   - 预测子女运势和教育方向\n`;
        prompt += `   - 提供家庭教育的协调建议\n\n`;

        prompt += `6. **长期发展建议**\n`;
        prompt += `   - 提供具体的相处技巧和沟通方法\n`;
        prompt += `   - 给出化解矛盾的实用策略\n`;
        prompt += `   - 制定增进感情的长期规划\n\n`;

        prompt += `【输出格式要求】\n`;
        prompt += `请按以下格式输出分析结果：\n\n`;

        prompt += `# 🤖 AI深度合婚分析报告\n\n`;

        prompt += `## 📊 综合评估概览\n`;
        prompt += `**AI综合评分**：[分数]/100\n`;
        prompt += `**匹配等级**：[等级评价]\n`;
        prompt += `**核心优势**：[主要优势点]\n`;
        prompt += `**关注要点**：[需要注意的方面]\n\n`;

        prompt += `## 1. 💝 性格匹配分析\n`;
        prompt += `### 男方性格特点\n`;
        prompt += `- [具体分析]\n\n`;
        prompt += `### 女方性格特点\n`;
        prompt += `- [具体分析]\n\n`;
        prompt += `### 性格互补性\n`;
        prompt += `✅ **优势互补**：[具体说明]\n`;
        prompt += `⚠️ **潜在冲突**：[具体说明]\n`;
        prompt += `💡 **磨合建议**：[具体建议]\n\n`;

        prompt += `## 2. 💕 情感相处模式\n`;
        prompt += `### 恋爱表现特点\n`;
        prompt += `- [双方在恋爱中的表现]\n\n`;
        prompt += `### 情感发展预测\n`;
        prompt += `- [可能的发展模式]\n\n`;
        prompt += `### 增进感情方法\n`;
        prompt += `💡 [具体实用方法]\n\n`;

        prompt += `## 3. 🏠 婚姻生活预测\n`;
        prompt += `### 婚后和谐度分析\n`;
        prompt += `- [详细分析]\n\n`;
        prompt += `### 可能的挑战与机遇\n`;
        prompt += `⚠️ **挑战**：[具体挑战]\n`;
        prompt += `✅ **机遇**：[具体机遇]\n\n`;
        prompt += `### 婚姻稳定建议\n`;
        prompt += `💡 [具体建议]\n\n`;

        prompt += `## 4. 💼 事业财运配合\n`;
        prompt += `### 事业互助性\n`;
        prompt += `- [分析双方事业发展的互助性]\n\n`;
        prompt += `### 财运配合情况\n`;
        prompt += `- [财运配合分析]\n\n`;
        prompt += `### 共同发展策略\n`;
        prompt += `💡 [具体策略建议]\n\n`;

        prompt += `## 5. 👶 子女教育观念\n`;
        prompt += `### 教育理念匹配度\n`;
        prompt += `- [分析双方教育理念]\n\n`;
        prompt += `### 子女运势预测\n`;
        prompt += `- [子女运势和教育方向]\n\n`;
        prompt += `### 家庭教育协调\n`;
        prompt += `💡 [协调建议]\n\n`;

        prompt += `## 6. 🌟 长期发展建议\n`;
        prompt += `### 相处技巧\n`;
        prompt += `💡 [具体的相处技巧和沟通方法]\n\n`;
        prompt += `### 矛盾化解策略\n`;
        prompt += `💡 [化解矛盾的实用策略]\n\n`;
        prompt += `### 感情增进规划\n`;
        prompt += `💡 [长期感情增进规划]\n\n`;

        prompt += `## 📝 总结与祝福\n`;
        prompt += `[对这对情侣的总结性评价和美好祝福]\n\n`;

        prompt += `请确保分析专业、详细、实用，既要体现传统合婚理论的深度，也要结合现代情感心理学的科学性，为这对情侣提供真正有价值的指导建议。分析应该具体、可操作，避免空泛的表述。`;

        return prompt;
    }

    // 获取生肖
    getZodiacAnimal(year) {
        const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
        return zodiacAnimals[(year - 4) % 12];
    }

    // 生成合婚AI分析
    async generateMarriageAIAnalysis(marriageData, marriageResult, aiPrompt) {
        console.log('开始生成合婚AI分析');

        // 使用全局配置
        const globalConfig = this.getGlobalConfig();
        console.log('获取到的AI配置:', globalConfig);

        if (!globalConfig) {
            console.error('未找到AI配置');
            this.showMarriageAIError('请先配置AI设置');
            return;
        }

        const apiUrl = globalConfig.apiUrl;
        const apiKey = globalConfig.apiKey;
        const modelName = globalConfig.model;

        // 验证输入
        if (!apiKey) {
            this.showMarriageAIError('请输入API密钥');
            return;
        }
        if (!apiUrl) {
            this.showMarriageAIError('请输入API地址');
            return;
        }

        // 显示处理状态
        this.showMarriageAIProcessing();

        try {
            // 调用AI API
            await this.callMarriageAIAPI(aiPrompt, apiKey, modelName, apiUrl);

        } catch (error) {
            console.error('AI合婚分析失败:', error);
            this.showMarriageAIError(error.message);
        } finally {
            this.hideMarriageAIProcessing();
        }
    }

    // 调用合婚AI API
    async callMarriageAIAPI(prompt, apiKey, modelName, apiUrl) {
        const processingSteps = document.getElementById('ai-marriage-processing-steps');
        const processingMessage = document.getElementById('ai-marriage-processing-message');

        try {
            // 显示连接状态
            processingSteps.innerHTML = '🔗 正在连接AI服务器...<br>';
            processingMessage.textContent = '建立连接中...';

            console.log('合婚AI分析开始:', { apiUrl, modelName, promptLength: prompt.length });

            // 构建请求体
            const requestBody = {
                model: modelName,
                messages: [
                    {
                        role: "system",
                        content: "你是精通中国传统合婚理论和现代情感心理学的专家，擅长结合传统命理与现代心理学为情侣提供深入的合婚分析和情感指导。"
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                stream: true
            };

            // 根据模型调整参数
            if (modelName.includes('gpt')) {
                requestBody.temperature = 0.7;
                requestBody.max_tokens = 4000;
            } else if (modelName.includes('claude')) {
                requestBody.max_tokens = 4000;
            }

            processingSteps.innerHTML += '📡 发送分析请求...<br>';
            processingMessage.textContent = '正在发送请求...';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`API错误 (${response.status}): ${errorData.error?.message || '未知错误'}`);
            }

            processingSteps.innerHTML += '🧠 AI正在分析中...<br>';
            processingMessage.textContent = '正在生成分析结果...';

            // 处理流式响应
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let fullResponse = '';

            // 显示结果区域
            const resultSection = document.getElementById('ai-marriage-result-section');
            const output = document.getElementById('ai-marriage-output');
            const copyBtn = document.getElementById('copy-ai-marriage-result');

            if (resultSection) {
                resultSection.style.display = 'block';
                output.innerHTML = '<div class="ai-response-streaming">正在生成分析...</div>';
            }

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;

                const chunk = decoder.decode(value);
                const lines = chunk.split('\n');

                for (const line of lines) {
                    if (line.startsWith('data: ')) {
                        const data = line.slice(6);
                        if (data === '[DONE]') continue;

                        try {
                            const parsed = JSON.parse(data);
                            const content = parsed.choices?.[0]?.delta?.content || '';
                            if (content) {
                                fullResponse += content;
                                // 实时更新显示
                                if (output) {
                                    output.innerHTML = this.formatMarriageAIResponse(fullResponse);
                                }
                            }
                        } catch (e) {
                            // 忽略解析错误
                        }
                    }
                }
            }

            processingSteps.innerHTML += '✅ 分析完成！<br>';
            processingMessage.textContent = '分析完成';

            // 显示复制按钮
            if (copyBtn && fullResponse.trim()) {
                copyBtn.style.display = 'inline-block';
            }

            console.log('合婚AI分析完成');

        } catch (error) {
            console.error('合婚AI API调用失败:', error);
            throw error;
        }
    }

    // 显示合婚AI处理状态
    showMarriageAIProcessing() {
        const processingDiv = document.getElementById('ai-marriage-processing');
        const generateBtn = document.getElementById('generate-marriage-ai-analysis');

        if (processingDiv) {
            processingDiv.style.display = 'block';
        }
        if (generateBtn) {
            generateBtn.disabled = true;
            generateBtn.querySelector('span').textContent = '🧠 正在分析中...';
        }
    }

    // 隐藏合婚AI处理状态
    hideMarriageAIProcessing() {
        const processingDiv = document.getElementById('ai-marriage-processing');
        const generateBtn = document.getElementById('generate-marriage-ai-analysis');

        if (processingDiv) {
            processingDiv.style.display = 'none';
        }
        if (generateBtn) {
            generateBtn.disabled = false;
            generateBtn.querySelector('span').textContent = '🧠 生成AI深度分析';
        }
    }

    // 显示合婚AI错误
    showMarriageAIError(message) {
        console.error('合婚AI错误:', message);

        const resultSection = document.getElementById('ai-marriage-result-section');
        const output = document.getElementById('ai-marriage-output');

        console.log('错误显示元素:', { resultSection, output });

        if (resultSection && output) {
            resultSection.style.display = 'block';
            output.innerHTML = `
                <div class="ai-error">
                    <div class="error-icon">⚠️</div>
                    <div class="error-message">${message}</div>
                    <div class="error-suggestion">请检查AI配置或稍后重试</div>
                </div>
            `;
        } else {
            console.error('未找到错误显示元素');
            alert('AI分析错误: ' + message);
        }
    }

    // 复制合婚AI分析结果
    copyMarriageAIResult() {
        const output = document.getElementById('ai-marriage-output');
        if (!output) return;

        const text = output.textContent || output.innerText;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                this.showConfigMessage('分析结果已复制到剪贴板', 'success');
            }).catch(err => {
                console.error('复制失败:', err);
                this.fallbackCopyText(text);
            });
        } else {
            this.fallbackCopyText(text);
        }
    }

    // 备用复制方法
    fallbackCopyText(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            document.execCommand('copy');
            this.showConfigMessage('分析结果已复制到剪贴板', 'success');
        } catch (err) {
            console.error('复制失败:', err);
            this.showConfigMessage('复制失败，请手动选择文本复制', 'error');
        }

        document.body.removeChild(textArea);
    }

    // ==================== PDF下载功能 ====================

    // 绑定起名模块下载事件
    bindNamingDownloadEvents(birthData, baziResult, nameSuggestions) {
        const downloadPdfBtn = document.getElementById('download-naming-pdf-btn');
        const downloadImageBtn = document.getElementById('download-naming-image-btn');
        const downloadTextBtn = document.getElementById('download-naming-text-btn');

        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', () => {
                this.downloadNamingPDFReport(birthData, baziResult, nameSuggestions);
            });
        }

        if (downloadImageBtn) {
            downloadImageBtn.addEventListener('click', () => {
                this.downloadNamingImageReport(birthData, baziResult, nameSuggestions);
            });
        }

        if (downloadTextBtn) {
            downloadTextBtn.addEventListener('click', () => {
                this.downloadNamingTextReport(birthData, baziResult, nameSuggestions);
            });
        }
    }

    // 绑定测名模块下载事件
    bindCemingDownloadEvents(testData, nameAnalysis, baziResult) {
        const downloadPdfBtn = document.getElementById('download-ceming-pdf-btn');
        const downloadImageBtn = document.getElementById('download-ceming-image-btn');
        const downloadTextBtn = document.getElementById('download-ceming-text-btn');

        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', () => {
                this.downloadCemingPDFReport(testData, nameAnalysis, baziResult);
            });
        }

        if (downloadImageBtn) {
            downloadImageBtn.addEventListener('click', () => {
                this.downloadCemingImageReport(testData, nameAnalysis, baziResult);
            });
        }

        if (downloadTextBtn) {
            downloadTextBtn.addEventListener('click', () => {
                this.downloadCemingTextReport(testData, nameAnalysis, baziResult);
            });
        }
    }

    // 绑定合婚模块下载事件
    bindMarriageDownloadEvents(marriageData, marriageResult) {
        const downloadPdfBtn = document.getElementById('download-marriage-pdf-btn');
        const downloadImageBtn = document.getElementById('download-marriage-image-btn');
        const downloadTextBtn = document.getElementById('download-marriage-text-btn');

        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', () => {
                this.downloadMarriagePDFReport(marriageData, marriageResult);
            });
        }

        if (downloadImageBtn) {
            downloadImageBtn.addEventListener('click', () => {
                this.downloadMarriageImageReport(marriageData, marriageResult);
            });
        }

        if (downloadTextBtn) {
            downloadTextBtn.addEventListener('click', () => {
                this.downloadMarriageTextReport(marriageData, marriageResult);
            });
        }
    }

    // 格式化合婚AI响应
    formatMarriageAIResponse(text) {
        if (!text) return '<div class="ai-response-streaming">正在生成分析...</div>';

        let formatted = text;

        // 处理标题层级
        formatted = formatted
            .replace(/^# (.*?)$/gm, '<h1>$1</h1>')
            .replace(/^## (.*?)$/gm, '<h2>$1</h2>')
            .replace(/^### (.*?)$/gm, '<h3>$1</h3>')
            .replace(/^#### (.*?)$/gm, '<h4>$1</h4>');

        // 处理粗体和斜体
        formatted = formatted
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>');

        // 处理编号列表和要点
        formatted = formatted
            .replace(/^(\d+)\.\s*\*\*(.*?)\*\*/gm, '<div class="analysis-point"><strong>$1. $2</strong></div>')
            .replace(/^(\d+)\.\s*(.*?)$/gm, '<div class="analysis-point"><strong>$1. $2</strong></div>')
            .replace(/^-\s*(.*?)$/gm, '<li>$1</li>');

        // 处理特殊标记
        formatted = formatted
            .replace(/【(.*?)】/g, '<span class="highlight">【$1】</span>')
            .replace(/💡\s*(.*?)$/gm, '<div class="suggestion-box">💡 $1</div>')
            .replace(/⚠️\s*(.*?)$/gm, '<div class="warning-box">⚠️ $1</div>')
            .replace(/✅\s*(.*?)$/gm, '<div class="success-box">✅ $1</div>');

        // 处理段落
        const lines = formatted.split('\n');
        let result = '';
        let inList = false;
        let currentParagraph = '';

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();

            if (line === '') {
                if (currentParagraph) {
                    result += `<p>${currentParagraph}</p>\n`;
                    currentParagraph = '';
                }
                if (inList) {
                    result += '</ul>\n';
                    inList = false;
                }
                continue;
            }

            if (line.startsWith('<li>')) {
                if (currentParagraph) {
                    result += `<p>${currentParagraph}</p>\n`;
                    currentParagraph = '';
                }
                if (!inList) {
                    result += '<ul>\n';
                    inList = true;
                }
                result += line + '\n';
            } else if (line.startsWith('<h') || line.startsWith('<div class="analysis-point">') ||
                      line.startsWith('<div class="suggestion-box">') || line.startsWith('<div class="warning-box">') ||
                      line.startsWith('<div class="success-box">')) {
                if (currentParagraph) {
                    result += `<p>${currentParagraph}</p>\n`;
                    currentParagraph = '';
                }
                if (inList) {
                    result += '</ul>\n';
                    inList = false;
                }
                result += line + '\n';
            } else {
                if (inList) {
                    result += '</ul>\n';
                    inList = false;
                }
                if (currentParagraph) {
                    currentParagraph += '<br>' + line;
                } else {
                    currentParagraph = line;
                }
            }
        }

        // 处理最后的段落和列表
        if (currentParagraph) {
            result += `<p>${currentParagraph}</p>\n`;
        }
        if (inList) {
            result += '</ul>\n';
        }

        return `<div class="ai-response-content">${result}</div>`;
    }

    // ==================== 起名模块PDF生成 ====================

    // 下载起名PDF报告
    downloadNamingPDFReport(birthData, baziResult, nameSuggestions) {
        const resultContent = document.querySelector('#qiming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        this.showProcessing('正在准备PDF报告...');

        setTimeout(() => {
            this.hideProcessing();
            this.openNamingPrintPreview(birthData, baziResult, nameSuggestions);
        }, 500);
    }

    // 下载起名长图报告
    async downloadNamingImageReport(birthData, baziResult, nameSuggestions) {
        const resultContent = document.querySelector('#qiming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        this.showProcessing('正在生成长图报告...');

        try {
            // 直接截取网页的实际显示效果
            const canvas = await this.captureWebPageContent(resultContent);

            const link = document.createElement('a');
            link.download = `赛博起名报告_${birthData.name}_${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL();
            link.click();

            this.showSuccess('长图报告已下载');
        } catch (error) {
            console.error('生成长图失败:', error);
            this.showError('生成长图失败: ' + error.message);
        } finally {
            this.hideProcessing();
        }
    }

    // 下载起名文本报告
    downloadNamingTextReport(birthData, baziResult, nameSuggestions) {
        const resultContent = document.querySelector('#qiming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        const reportText = this.generateNamingCompleteReport(birthData, baziResult, nameSuggestions);

        const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `赛博起名文本报告_${birthData.name}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this.showSuccess('文本报告已下载');
    }

    // 生成起名完整报告文本
    generateNamingCompleteReport(birthData, baziResult, nameSuggestions) {
        let report = '';

        // 报告标题
        report += '赛博起名 - 完整起名分析报告\n';
        report += '='.repeat(60) + '\n\n';

        // 基本信息
        report += `姓名：${birthData.name}\n`;
        report += `性别：${birthData.gender}\n`;
        report += `出生时间：${birthData.year}年${birthData.month}月${birthData.day}日 ${birthData.hour.toString().padStart(2, '0')}:${(birthData.minute || 0).toString().padStart(2, '0')}\n`;
        report += `出生地区：${birthData.birthProvince} ${birthData.birthCity}\n\n`;

        // 八字信息
        report += '生辰八字\n';
        report += '-'.repeat(30) + '\n';
        report += `年柱：${baziResult.yearPillar} (${baziResult.yearTenGod})\n`;
        report += `月柱：${baziResult.monthPillar} (${baziResult.monthTenGod})\n`;
        report += `日柱：${baziResult.dayPillar} (日主${baziResult.dayTianGan})\n`;
        report += `时柱：${baziResult.hourPillar} (${baziResult.hourTenGod})\n\n`;

        // 五行分析
        report += '五行分析\n';
        report += '-'.repeat(30) + '\n';
        const wuxingStats = this.getWuXingStats(baziResult);
        Object.entries(wuxingStats).forEach(([element, count]) => {
            report += `${element}：${count}个\n`;
        });
        report += '\n';

        // 起名建议
        report += '起名建议\n';
        report += '-'.repeat(30) + '\n';
        nameSuggestions.forEach((suggestion, index) => {
            report += `${index + 1}. ${suggestion.name}\n`;
            report += `   评分：${suggestion.score}分\n`;
            report += `   五行：${suggestion.wuxing}\n`;
            report += `   寓意：${suggestion.meaning}\n`;
            report += `   分析：${suggestion.analysis}\n\n`;
        });

        // AI分析结果
        const aiOutput = document.getElementById('naming-ai-output');
        if (aiOutput && aiOutput.textContent.trim()) {
            report += 'AI深度分析\n';
            report += '-'.repeat(30) + '\n';
            report += aiOutput.textContent.trim() + '\n\n';
        }

        // 报告尾部
        report += '-'.repeat(60) + '\n';
        report += `报告生成时间：${new Date().toLocaleString('zh-CN')}\n`;
        report += '本报告由赛博起名系统生成\n';

        return report;
    }

    // 打开起名打印预览
    openNamingPrintPreview(birthData, baziResult, nameSuggestions) {
        const reportHTML = this.generateNamingPrintableHTML(birthData, baziResult, nameSuggestions);

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(reportHTML);
        printWindow.document.close();

        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.print();
            }, 1000);
        };

        this.showSuccess('已打开打印预览，您可以选择"另存为PDF"保存');
    }

    // 生成起名报告HTML（用于长图生成）
    generateNamingReportHTML(birthData, baziResult, nameSuggestions) {
        const aiOutput = document.getElementById('naming-ai-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <div style="width: 800px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%); color: white; padding: 40px; box-sizing: border-box; font-family: 'Microsoft YaHei', Arial, sans-serif;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-size: 2.5rem; color: #00d4ff; margin-bottom: 10px; text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);">赛博起名</h1>
                    <h2 style="font-size: 1.2rem; color: #00ff88; margin: 0;">完整起名分析报告</h2>
                </div>

                <div style="background: rgba(0, 212, 255, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 212, 255, 0.3);">
                    <h3 style="color: #00d4ff; margin-bottom: 15px; font-size: 1.3rem;">基本信息</h3>
                    <div style="line-height: 1.8; font-size: 1.1rem;">
                        <div><strong style="color: #00ff88;">姓名：</strong>${birthData.name}</div>
                        <div><strong style="color: #00ff88;">性别：</strong>${birthData.gender}</div>
                        <div><strong style="color: #00ff88;">出生时间：</strong>${birthData.year}年${birthData.month}月${birthData.day}日 ${birthData.hour.toString().padStart(2, '0')}:${(birthData.minute || 0).toString().padStart(2, '0')}</div>
                        <div><strong style="color: #00ff88;">出生地区：</strong>${birthData.birthProvince} ${birthData.birthCity}</div>
                    </div>
                </div>

                <div style="background: rgba(0, 255, 136, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 255, 136, 0.3);">
                    <h3 style="color: #00ff88; margin-bottom: 20px; font-size: 1.3rem;">生辰八字</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">年柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.yearPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">${baziResult.yearTenGod}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">月柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.monthPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">${baziResult.monthTenGod}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">日柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.dayPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">日主${baziResult.dayTianGan}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">时柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.hourPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">${baziResult.hourTenGod}</div>
                        </div>
                    </div>
                </div>

                <div style="background: rgba(255, 0, 128, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(255, 0, 128, 0.3);">
                    <h3 style="color: #ff0080; margin-bottom: 20px; font-size: 1.3rem;">五行分析</h3>
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
                        ${this.generateWuXingStatsHTMLForReport(baziResult)}
                    </div>
                </div>

                <div style="background: rgba(0, 212, 255, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 212, 255, 0.3);">
                    <h3 style="color: #00d4ff; margin-bottom: 20px; font-size: 1.3rem;">起名建议</h3>
                    ${nameSuggestions.map((suggestion, index) => `
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; margin: 15px 0; border-radius: 8px; border-left: 4px solid #00ff88;">
                            <div style="font-size: 1.2rem; font-weight: bold; color: #00ff88; margin-bottom: 10px;">${index + 1}. ${suggestion.name} <span style="color: #00d4ff;">(${suggestion.score}分)</span></div>
                            <div style="margin: 8px 0;"><strong style="color: #00ff88;">五行：</strong>${suggestion.wuxing}</div>
                            <div style="margin: 8px 0;"><strong style="color: #00ff88;">寓意：</strong>${suggestion.meaning}</div>
                            <div style="margin: 8px 0;"><strong style="color: #00ff88;">分析：</strong>${suggestion.analysis}</div>
                        </div>
                    `).join('')}
                </div>

                ${aiAnalysis ? `
                    <div style="background: rgba(0, 255, 136, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 255, 136, 0.3);">
                        <h3 style="color: #00ff88; margin-bottom: 20px; font-size: 1.3rem;">AI智能分析</h3>
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 8px; line-height: 1.8;">
                            ${aiAnalysis}
                        </div>
                    </div>
                ` : ''}

                <div style="text-align: center; margin-top: 40px; padding: 25px; background: rgba(0, 0, 0, 0.3); border-radius: 12px; border-top: 2px solid #00d4ff; color: #ccc;">
                    报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                    本报告由赛博起名系统生成
                </div>
            </div>
        `;
    }

    // 生成五行统计HTML（用于报告）
    generateWuXingStatsHTMLForReport(baziResult) {
        const wuxingStats = this.getWuXingStats(baziResult);
        return Object.entries(wuxingStats).map(([element, count]) => `
            <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                <div style="font-weight: bold; color: #00d4ff; margin-bottom: 5px;">${element}</div>
                <div style="font-size: 1.2rem; color: #00ff88;">${count}个</div>
            </div>
        `).join('');
    }

    // 生成起名可打印HTML
    generateNamingPrintableHTML(birthData, baziResult, nameSuggestions) {
        const aiOutput = document.getElementById('naming-ai-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>赛博起名报告</title>
                <link rel="stylesheet" href="css/print.css">
                <style>
                    body { font-family: 'Microsoft YaHei', 'SimHei', Arial, sans-serif; line-height: 1.6; color: #333; }
                    .report-container { max-width: 800px; margin: 0 auto; padding: 20px; }
                    .report-header { text-align: center; border-bottom: 3px solid #333; margin-bottom: 30px; padding-bottom: 15px; }
                    .report-title { font-size: 2.5rem; font-weight: bold; color: #333; margin-bottom: 10px; }
                    .report-subtitle { font-size: 1.2rem; color: #666; }
                    .basic-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .section { margin: 30px 0; }
                    .section-title { font-size: 1.4rem; font-weight: bold; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 15px; }
                    .bazi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
                    .bazi-pillar { text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px; background: #f8f9fa; }
                    .pillar-label { font-weight: bold; color: #007bff; margin-bottom: 8px; }
                    .pillar-chars { font-size: 1.5rem; font-weight: bold; margin: 8px 0; }
                    .wuxing-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 15px 0; }
                    .wuxing-item { text-align: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
                    .name-suggestions { margin: 20px 0; }
                    .name-item { background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #007bff; }
                    .name-title { font-size: 1.2rem; font-weight: bold; color: #333; margin-bottom: 8px; }
                    .name-score { color: #007bff; font-weight: bold; }
                    .ai-analysis { background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .report-footer { text-align: center; margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; color: #666; }
                    @media print {
                        body { margin: 0; padding: 15px; }
                        .report-container { padding: 0; }
                        .section { page-break-inside: avoid; }
                        .name-item { page-break-inside: avoid; }
                        .ai-analysis { page-break-inside: avoid; }
                    }
                    @page { margin: 2cm; size: A4; }
                </style>
            </head>
            <body>
                <div class="report-container">
                    <div class="report-header">
                        <div class="report-title">赛博起名</div>
                        <div class="report-subtitle">完整起名分析报告</div>
                    </div>

                    <div class="basic-info">
                        <strong>基本信息</strong><br>
                        姓名：${birthData.name}<br>
                        性别：${birthData.gender}<br>
                        出生时间：${birthData.year}年${birthData.month}月${birthData.day}日 ${birthData.hour.toString().padStart(2, '0')}:${(birthData.minute || 0).toString().padStart(2, '0')}<br>
                        出生地区：${birthData.birthProvince} ${birthData.birthCity}
                    </div>

                    <div class="section">
                        <div class="section-title">生辰八字</div>
                        <div class="bazi-grid">
                            <div class="bazi-pillar">
                                <div class="pillar-label">年柱</div>
                                <div class="pillar-chars">${baziResult.yearPillar}</div>
                                <div class="pillar-god">${baziResult.yearTenGod}</div>
                            </div>
                            <div class="bazi-pillar">
                                <div class="pillar-label">月柱</div>
                                <div class="pillar-chars">${baziResult.monthPillar}</div>
                                <div class="pillar-god">${baziResult.monthTenGod}</div>
                            </div>
                            <div class="bazi-pillar">
                                <div class="pillar-label">日柱</div>
                                <div class="pillar-chars">${baziResult.dayPillar}</div>
                                <div class="pillar-god">日主${baziResult.dayTianGan}</div>
                            </div>
                            <div class="bazi-pillar">
                                <div class="pillar-label">时柱</div>
                                <div class="pillar-chars">${baziResult.hourPillar}</div>
                                <div class="pillar-god">${baziResult.hourTenGod}</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">五行分析</div>
                        <div class="wuxing-stats">
                            ${this.generateWuXingStatsHTML(baziResult)}
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">起名建议</div>
                        <div class="name-suggestions">
                            ${nameSuggestions.map((suggestion, index) => `
                                <div class="name-item">
                                    <div class="name-title">${index + 1}. ${suggestion.name} <span class="name-score">(${suggestion.score}分)</span></div>
                                    <div><strong>五行：</strong>${suggestion.wuxing}</div>
                                    <div><strong>寓意：</strong>${suggestion.meaning}</div>
                                    <div><strong>分析：</strong>${suggestion.analysis}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    ${aiAnalysis ? `
                        <div class="section">
                            <div class="section-title">AI智能分析</div>
                            <div class="ai-analysis">
                                ${aiAnalysis}
                            </div>
                        </div>
                    ` : ''}

                    <div class="report-footer">
                        报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                        本报告由赛博起名系统生成
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // 生成五行统计HTML
    generateWuXingStatsHTML(baziResult) {
        const wuxingStats = this.getWuXingStats(baziResult);
        return Object.entries(wuxingStats).map(([element, count]) => `
            <div class="wuxing-item">
                <div style="font-weight: bold; color: #007bff;">${element}</div>
                <div>${count}个</div>
            </div>
        `).join('');
    }

    // 获取五行统计
    getWuXingStats(baziResult) {
        const stats = { '金': 0, '木': 0, '水': 0, '火': 0, '土': 0 };

        // 统计天干五行
        [baziResult.yearPillar[0], baziResult.monthPillar[0], baziResult.dayPillar[0], baziResult.hourPillar[0]].forEach(tianGan => {
            const wuxing = this.getTianGanWuXing(tianGan);
            if (stats[wuxing] !== undefined) stats[wuxing]++;
        });

        // 统计地支五行
        [baziResult.yearPillar[1], baziResult.monthPillar[1], baziResult.dayPillar[1], baziResult.hourPillar[1]].forEach(diZhi => {
            const wuxing = this.getDiZhiWuXing(diZhi);
            if (stats[wuxing] !== undefined) stats[wuxing]++;
        });

        return stats;
    }

    // 获取天干五行
    getTianGanWuXing(tianGan) {
        const wuxingMap = {
            '甲': '木', '乙': '木',
            '丙': '火', '丁': '火',
            '戊': '土', '己': '土',
            '庚': '金', '辛': '金',
            '壬': '水', '癸': '水'
        };
        return wuxingMap[tianGan] || '未知';
    }

    // 获取地支五行
    getDiZhiWuXing(diZhi) {
        const wuxingMap = {
            '子': '水', '亥': '水',
            '寅': '木', '卯': '木',
            '巳': '火', '午': '火',
            '申': '金', '酉': '金',
            '辰': '土', '戌': '土', '丑': '土', '未': '土'
        };
        return wuxingMap[diZhi] || '未知';
    }

    // ==================== 测名模块PDF生成 ====================

    // 下载测名PDF报告
    downloadCemingPDFReport(testData, nameAnalysis, baziResult) {
        const resultContent = document.querySelector('#ceming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        this.showProcessing('正在准备PDF报告...');

        setTimeout(() => {
            this.hideProcessing();
            this.openCemingPrintPreview(testData, nameAnalysis, baziResult);
        }, 500);
    }

    // 下载测名长图报告
    async downloadCemingImageReport(testData, nameAnalysis, baziResult) {
        const resultContent = document.querySelector('#ceming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        this.showProcessing('正在生成长图报告...');

        try {
            // 直接截取网页的实际显示效果
            const canvas = await this.captureWebPageContent(resultContent);

            const link = document.createElement('a');
            link.download = `赛博测名报告_${testData.fullName}_${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL();
            link.click();

            this.showSuccess('长图报告已下载');
        } catch (error) {
            console.error('生成长图失败:', error);
            this.showError('生成长图失败: ' + error.message);
        } finally {
            this.hideProcessing();
        }
    }

    // 下载测名文本报告
    downloadCemingTextReport(testData, nameAnalysis, baziResult) {
        const resultContent = document.querySelector('#ceming-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        const reportText = this.generateCemingCompleteReport(testData, nameAnalysis, baziResult);

        const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `赛博测名文本报告_${testData.fullName}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this.showSuccess('文本报告已下载');
    }

    // 生成测名完整报告文本
    generateCemingCompleteReport(testData, nameAnalysis, baziResult) {
        let report = '';

        // 报告标题
        report += '赛博测名 - 完整姓名分析报告\n';
        report += '='.repeat(60) + '\n\n';

        // 基本信息
        report += `姓名：${testData.fullName}\n`;
        report += `性别：${testData.gender}\n`;
        report += `出生时间：${testData.year}年${testData.month}月${testData.day}日 ${testData.hour.toString().padStart(2, '0')}:${(testData.minute || 0).toString().padStart(2, '0')}\n`;
        report += `出生地区：${testData.birthProvince} ${testData.birthCity}\n\n`;

        // 八字信息
        report += '生辰八字\n';
        report += '-'.repeat(30) + '\n';
        report += `年柱：${baziResult.yearPillar} (${baziResult.yearTenGod})\n`;
        report += `月柱：${baziResult.monthPillar} (${baziResult.monthTenGod})\n`;
        report += `日柱：${baziResult.dayPillar} (日主${baziResult.dayTianGan})\n`;
        report += `时柱：${baziResult.hourPillar} (${baziResult.hourTenGod})\n\n`;

        // 姓名分析
        report += '姓名分析\n';
        report += '-'.repeat(30) + '\n';
        report += `综合评分：${nameAnalysis.score}分\n\n`;

        // 五格数理
        report += '五格数理：\n';
        report += `天格：${nameAnalysis.wuGe.tianGe}\n`;
        report += `人格：${nameAnalysis.wuGe.renGe}\n`;
        report += `地格：${nameAnalysis.wuGe.diGe}\n`;
        report += `外格：${nameAnalysis.wuGe.waiGe}\n`;
        report += `总格：${nameAnalysis.wuGe.zongGe}\n\n`;

        // 三才配置
        report += `三才配置：${nameAnalysis.sanCai.tianWuXing}${nameAnalysis.sanCai.renWuXing}${nameAnalysis.sanCai.diWuXing} (${nameAnalysis.sanCai.jiXiong})\n\n`;

        // 基础分析
        report += '基础分析\n';
        report += '-'.repeat(30) + '\n';
        report += nameAnalysis.analysis + '\n\n';

        // AI分析结果
        const aiOutput = document.getElementById('ceming-ai-output');
        if (aiOutput && aiOutput.textContent.trim()) {
            report += 'AI深度分析\n';
            report += '-'.repeat(30) + '\n';
            report += aiOutput.textContent.trim() + '\n\n';
        }

        // 报告尾部
        report += '-'.repeat(60) + '\n';
        report += `报告生成时间：${new Date().toLocaleString('zh-CN')}\n`;
        report += '本报告由赛博测名系统生成\n';

        return report;
    }

    // 打开测名打印预览
    openCemingPrintPreview(testData, nameAnalysis, baziResult) {
        const reportHTML = this.generateCemingPrintableHTML(testData, nameAnalysis, baziResult);

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(reportHTML);
        printWindow.document.close();

        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.print();
            }, 1000);
        };

        this.showSuccess('已打开打印预览，您可以选择"另存为PDF"保存');
    }

    // 生成测名报告HTML（用于长图生成）
    generateCemingReportHTML(testData, nameAnalysis, baziResult) {
        const aiOutput = document.getElementById('ceming-ai-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <div style="width: 800px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%); color: white; padding: 40px; box-sizing: border-box; font-family: 'Microsoft YaHei', Arial, sans-serif;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-size: 2.5rem; color: #00d4ff; margin-bottom: 10px; text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);">赛博测名</h1>
                    <h2 style="font-size: 1.2rem; color: #00ff88; margin: 0;">完整姓名分析报告</h2>
                </div>

                <div style="background: rgba(0, 212, 255, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 212, 255, 0.3);">
                    <h3 style="color: #00d4ff; margin-bottom: 15px; font-size: 1.3rem;">基本信息</h3>
                    <div style="line-height: 1.8; font-size: 1.1rem;">
                        <div><strong style="color: #00ff88;">姓名：</strong>${testData.fullName}</div>
                        <div><strong style="color: #00ff88;">性别：</strong>${testData.gender}</div>
                        <div><strong style="color: #00ff88;">出生时间：</strong>${testData.year}年${testData.month}月${testData.day}日 ${testData.hour.toString().padStart(2, '0')}:${(testData.minute || 0).toString().padStart(2, '0')}</div>
                        <div><strong style="color: #00ff88;">出生地区：</strong>${testData.birthProvince} ${testData.birthCity}</div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <div style="display: inline-block; width: 150px; height: 150px; border: 4px solid #00d4ff; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0, 212, 255, 0.1);">
                        <div style="font-size: 3rem; font-weight: bold; color: #00d4ff;">${nameAnalysis.score}</div>
                        <div style="font-size: 1.2rem; color: #00ff88;">分</div>
                    </div>
                </div>

                <div style="background: rgba(0, 255, 136, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 255, 136, 0.3);">
                    <h3 style="color: #00ff88; margin-bottom: 20px; font-size: 1.3rem;">生辰八字</h3>
                    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;">
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">年柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.yearPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">${baziResult.yearTenGod}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">月柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.monthPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">${baziResult.monthTenGod}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">日柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.dayPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">日主${baziResult.dayTianGan}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(0, 212, 255, 0.3);">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">时柱</div>
                            <div style="font-size: 1.3rem; font-weight: bold; margin: 8px 0;">${baziResult.hourPillar}</div>
                            <div style="color: #00ff88; font-size: 0.9rem;">${baziResult.hourTenGod}</div>
                        </div>
                    </div>
                </div>

                <div style="background: rgba(255, 0, 128, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(255, 0, 128, 0.3);">
                    <h3 style="color: #ff0080; margin-bottom: 20px; font-size: 1.3rem;">五格数理</h3>
                    <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px;">
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(255, 0, 128, 0.3);">
                            <div style="color: #ff0080; font-weight: bold; margin-bottom: 8px;">天格</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: #00d4ff;">${nameAnalysis.wuGe.tianGe}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(255, 0, 128, 0.3);">
                            <div style="color: #ff0080; font-weight: bold; margin-bottom: 8px;">人格</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: #00d4ff;">${nameAnalysis.wuGe.renGe}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(255, 0, 128, 0.3);">
                            <div style="color: #ff0080; font-weight: bold; margin-bottom: 8px;">地格</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: #00d4ff;">${nameAnalysis.wuGe.diGe}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(255, 0, 128, 0.3);">
                            <div style="color: #ff0080; font-weight: bold; margin-bottom: 8px;">外格</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: #00d4ff;">${nameAnalysis.wuGe.waiGe}</div>
                        </div>
                        <div style="text-align: center; padding: 15px; background: rgba(0, 0, 0, 0.3); border-radius: 8px; border: 1px solid rgba(255, 0, 128, 0.3);">
                            <div style="color: #ff0080; font-weight: bold; margin-bottom: 8px;">总格</div>
                            <div style="font-size: 1.5rem; font-weight: bold; color: #00d4ff;">${nameAnalysis.wuGe.zongGe}</div>
                        </div>
                    </div>
                </div>

                <div style="background: rgba(0, 212, 255, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 212, 255, 0.3);">
                    <h3 style="color: #00d4ff; margin-bottom: 15px; font-size: 1.3rem;">三才配置</h3>
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #00ff88; margin-bottom: 10px;">
                            ${nameAnalysis.sanCai.tianWuXing}${nameAnalysis.sanCai.renWuXing}${nameAnalysis.sanCai.diWuXing}
                        </div>
                        <div style="color: #00d4ff; font-size: 1.1rem;">(${nameAnalysis.sanCai.jiXiong})</div>
                    </div>
                </div>

                <div style="background: rgba(0, 255, 136, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 255, 136, 0.3);">
                    <h3 style="color: #00ff88; margin-bottom: 20px; font-size: 1.3rem;">基础分析</h3>
                    <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 8px; line-height: 1.8; white-space: pre-wrap;">
                        ${nameAnalysis.analysis}
                    </div>
                </div>

                ${aiAnalysis ? `
                    <div style="background: rgba(255, 0, 128, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(255, 0, 128, 0.3);">
                        <h3 style="color: #ff0080; margin-bottom: 20px; font-size: 1.3rem;">AI智能分析</h3>
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 8px; line-height: 1.8;">
                            ${aiAnalysis}
                        </div>
                    </div>
                ` : ''}

                <div style="text-align: center; margin-top: 40px; padding: 25px; background: rgba(0, 0, 0, 0.3); border-radius: 12px; border-top: 2px solid #00d4ff; color: #ccc;">
                    报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                    本报告由赛博测名系统生成
                </div>
            </div>
        `;
    }

    // 生成测名可打印HTML
    generateCemingPrintableHTML(testData, nameAnalysis, baziResult) {
        const aiOutput = document.getElementById('ceming-ai-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <!DOCTYPE html>
            <html lang="zh-CN">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>赛博测名报告</title>
                <link rel="stylesheet" href="css/print.css">
                <style>
                    body { font-family: 'Microsoft YaHei', 'SimHei', Arial, sans-serif; line-height: 1.6; color: #333; }
                    .report-container { max-width: 800px; margin: 0 auto; padding: 20px; }
                    .report-header { text-align: center; border-bottom: 3px solid #333; margin-bottom: 30px; padding-bottom: 15px; }
                    .report-title { font-size: 2.5rem; font-weight: bold; color: #333; margin-bottom: 10px; }
                    .report-subtitle { font-size: 1.2rem; color: #666; }
                    .basic-info { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .section { margin: 30px 0; }
                    .section-title { font-size: 1.4rem; font-weight: bold; color: #333; border-bottom: 2px solid #007bff; padding-bottom: 8px; margin-bottom: 15px; }
                    .score-display { text-align: center; margin: 20px 0; }
                    .score-circle { display: inline-block; width: 120px; height: 120px; border: 4px solid #007bff; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; }
                    .score-number { font-size: 2.5rem; font-weight: bold; color: #007bff; }
                    .score-label { font-size: 1rem; color: #666; }
                    .bazi-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
                    .bazi-pillar { text-align: center; padding: 15px; border: 2px solid #ddd; border-radius: 8px; background: #f8f9fa; }
                    .pillar-label { font-weight: bold; color: #007bff; margin-bottom: 8px; }
                    .pillar-chars { font-size: 1.5rem; font-weight: bold; margin: 8px 0; }
                    .wuge-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin: 15px 0; }
                    .wuge-item { text-align: center; padding: 10px; border: 1px solid #ddd; border-radius: 5px; background: #f8f9fa; }
                    .wuge-label { font-weight: bold; color: #007bff; }
                    .wuge-value { font-size: 1.2rem; font-weight: bold; margin-top: 5px; }
                    .sancai-info { background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 15px 0; }
                    .analysis-text { background: #f8f9fa; padding: 15px; border-radius: 8px; white-space: pre-wrap; }
                    .ai-analysis { background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0; }
                    .report-footer { text-align: center; margin-top: 40px; padding: 20px; background: #f8f9fa; border-radius: 8px; color: #666; }
                    @media print {
                        body { margin: 0; padding: 15px; }
                        .report-container { padding: 0; }
                        .section { page-break-inside: avoid; }
                        .score-display { page-break-inside: avoid; }
                        .ai-analysis { page-break-inside: avoid; }
                    }
                    @page { margin: 2cm; size: A4; }
                </style>
            </head>
            <body>
                <div class="report-container">
                    <div class="report-header">
                        <div class="report-title">赛博测名</div>
                        <div class="report-subtitle">完整姓名分析报告</div>
                    </div>

                    <div class="basic-info">
                        <strong>基本信息</strong><br>
                        姓名：${testData.fullName}<br>
                        性别：${testData.gender}<br>
                        出生时间：${testData.year}年${testData.month}月${testData.day}日 ${testData.hour.toString().padStart(2, '0')}:${(testData.minute || 0).toString().padStart(2, '0')}<br>
                        出生地区：${testData.birthProvince} ${testData.birthCity}
                    </div>

                    <div class="section">
                        <div class="section-title">综合评分</div>
                        <div class="score-display">
                            <div class="score-circle">
                                <div class="score-number">${nameAnalysis.score}</div>
                                <div class="score-label">分</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">生辰八字</div>
                        <div class="bazi-grid">
                            <div class="bazi-pillar">
                                <div class="pillar-label">年柱</div>
                                <div class="pillar-chars">${baziResult.yearPillar}</div>
                                <div class="pillar-god">${baziResult.yearTenGod}</div>
                            </div>
                            <div class="bazi-pillar">
                                <div class="pillar-label">月柱</div>
                                <div class="pillar-chars">${baziResult.monthPillar}</div>
                                <div class="pillar-god">${baziResult.monthTenGod}</div>
                            </div>
                            <div class="bazi-pillar">
                                <div class="pillar-label">日柱</div>
                                <div class="pillar-chars">${baziResult.dayPillar}</div>
                                <div class="pillar-god">日主${baziResult.dayTianGan}</div>
                            </div>
                            <div class="bazi-pillar">
                                <div class="pillar-label">时柱</div>
                                <div class="pillar-chars">${baziResult.hourPillar}</div>
                                <div class="pillar-god">${baziResult.hourTenGod}</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">五格数理</div>
                        <div class="wuge-grid">
                            <div class="wuge-item">
                                <div class="wuge-label">天格</div>
                                <div class="wuge-value">${nameAnalysis.wuGe.tianGe}</div>
                            </div>
                            <div class="wuge-item">
                                <div class="wuge-label">人格</div>
                                <div class="wuge-value">${nameAnalysis.wuGe.renGe}</div>
                            </div>
                            <div class="wuge-item">
                                <div class="wuge-label">地格</div>
                                <div class="wuge-value">${nameAnalysis.wuGe.diGe}</div>
                            </div>
                            <div class="wuge-item">
                                <div class="wuge-label">外格</div>
                                <div class="wuge-value">${nameAnalysis.wuGe.waiGe}</div>
                            </div>
                            <div class="wuge-item">
                                <div class="wuge-label">总格</div>
                                <div class="wuge-value">${nameAnalysis.wuGe.zongGe}</div>
                            </div>
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">三才配置</div>
                        <div class="sancai-info">
                            <strong>${nameAnalysis.sanCai.tianWuXing}${nameAnalysis.sanCai.renWuXing}${nameAnalysis.sanCai.diWuXing}</strong> (${nameAnalysis.sanCai.jiXiong})
                        </div>
                    </div>

                    <div class="section">
                        <div class="section-title">基础分析</div>
                        <div class="analysis-text">${nameAnalysis.analysis}</div>
                    </div>

                    ${aiAnalysis ? `
                        <div class="section">
                            <div class="section-title">AI智能分析</div>
                            <div class="ai-analysis">
                                ${aiAnalysis}
                            </div>
                        </div>
                    ` : ''}

                    <div class="report-footer">
                        报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                        本报告由赛博测名系统生成
                    </div>
                </div>
            </body>
            </html>
        `;
    }

    // ==================== 合婚模块PDF生成 ====================

    // 下载合婚PDF报告
    downloadMarriagePDFReport(marriageData, marriageResult) {
        const resultContent = document.querySelector('#hehun-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        this.showProcessing('正在准备PDF报告...');

        setTimeout(() => {
            this.hideProcessing();
            this.openMarriagePrintPreview(marriageData, marriageResult);
        }, 500);
    }

    // 下载合婚长图报告
    async downloadMarriageImageReport(marriageData, marriageResult) {
        const resultContent = document.querySelector('#hehun-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        this.showProcessing('正在生成长图报告...');

        try {
            // 直接截取网页的实际显示效果
            const canvas = await this.captureWebPageContent(resultContent);

            const link = document.createElement('a');
            link.download = `赛博合婚报告_${marriageData.male.name}_${marriageData.female.name}_${new Date().toISOString().split('T')[0]}.png`;
            link.href = canvas.toDataURL();
            link.click();

            this.showSuccess('长图报告已下载');
        } catch (error) {
            console.error('生成长图失败:', error);
            this.showError('生成长图失败: ' + error.message);
        } finally {
            this.hideProcessing();
        }
    }

    // 下载合婚文本报告
    downloadMarriageTextReport(marriageData, marriageResult) {
        const resultContent = document.querySelector('#hehun-result .result-content');
        if (!resultContent) {
            this.showError('没有可下载的报告内容');
            return;
        }

        const reportText = this.generateMarriageCompleteReport(marriageData, marriageResult);

        const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `赛博合婚文本报告_${marriageData.male.name}_${marriageData.female.name}_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this.showSuccess('文本报告已下载');
    }

    // 生成合婚完整报告文本
    generateMarriageCompleteReport(marriageData, marriageResult) {
        let report = '';

        // 报告标题
        report += '赛博合婚 - 完整合婚分析报告\n';
        report += '='.repeat(60) + '\n\n';

        // 基本信息
        report += `男方：${marriageData.male.name}\n`;
        report += `出生时间：${marriageData.male.year}年${marriageData.male.month}月${marriageData.male.day}日 ${marriageData.male.hour.toString().padStart(2, '0')}:${(marriageData.male.minute || 0).toString().padStart(2, '0')}\n`;
        report += `出生地区：${marriageData.male.birthProvince || '未知'} ${marriageData.male.birthCity || '未知'}\n`;
        report += `生肖：${this.getZodiacAnimal(marriageData.male.year)}\n\n`;

        report += `女方：${marriageData.female.name}\n`;
        report += `出生时间：${marriageData.female.year}年${marriageData.female.month}月${marriageData.female.day}日 ${marriageData.female.hour.toString().padStart(2, '0')}:${(marriageData.female.minute || 0).toString().padStart(2, '0')}\n`;
        report += `出生地区：${marriageData.female.birthProvince || '未知'} ${marriageData.female.birthCity || '未知'}\n`;
        report += `生肖：${this.getZodiacAnimal(marriageData.female.year)}\n\n`;

        // 合婚分析
        report += '合婚分析\n';
        report += '-'.repeat(30) + '\n';
        report += `综合匹配度：${marriageResult.totalScore}分 (${marriageResult.level})\n\n`;

        report += `生肖配对：${marriageResult.shengXiaoMatch.score}分\n`;
        report += `${marriageResult.shengXiaoMatch.analysis}\n\n`;

        report += `五行配对：${marriageResult.wuXingMatch.score}分\n`;
        report += `${marriageResult.wuXingMatch.analysis}\n\n`;

        report += `十神配对：${marriageResult.shiShenMatch.score}分\n`;
        report += `${marriageResult.shiShenMatch.analysis}\n\n`;

        report += `年龄配对：${marriageResult.ageMatch.score}分\n`;
        report += `${marriageResult.ageMatch.analysis}\n\n`;

        // 改进建议
        report += '改进建议\n';
        report += '-'.repeat(30) + '\n';
        marriageResult.suggestions.forEach((suggestion, index) => {
            report += `${index + 1}. ${suggestion}\n`;
        });
        report += '\n';

        // AI分析结果
        const aiOutput = document.getElementById('ai-marriage-output');
        if (aiOutput && aiOutput.textContent.trim()) {
            report += 'AI深度分析\n';
            report += '-'.repeat(30) + '\n';
            report += aiOutput.textContent.trim() + '\n\n';
        }

        // 报告尾部
        report += '-'.repeat(60) + '\n';
        report += `报告生成时间：${new Date().toLocaleString('zh-CN')}\n`;
        report += '本报告由赛博合婚系统生成\n';

        return report;
    }

    // 打开合婚打印预览
    openMarriagePrintPreview(marriageData, marriageResult) {
        const reportHTML = this.generateMarriagePrintableHTML(marriageData, marriageResult);

        const printWindow = window.open('', '_blank', 'width=800,height=600');
        printWindow.document.write(reportHTML);
        printWindow.document.close();

        printWindow.onload = function() {
            setTimeout(() => {
                printWindow.print();
            }, 1000);
        };

        this.showSuccess('已打开打印预览，您可以选择"另存为PDF"保存');
    }

    // 生成合婚报告HTML（用于长图生成）
    generateMarriageReportHTML(marriageData, marriageResult) {
        const aiOutput = document.getElementById('ai-marriage-output');
        const aiAnalysis = aiOutput ? aiOutput.innerHTML : '';

        return `
            <div style="width: 800px; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #1a1a2e 100%); color: white; padding: 40px; box-sizing: border-box; font-family: 'Microsoft YaHei', Arial, sans-serif;">
                <div style="text-align: center; margin-bottom: 40px;">
                    <h1 style="font-size: 2.5rem; color: #00d4ff; margin-bottom: 10px; text-shadow: 0 0 20px rgba(0, 212, 255, 0.5);">赛博合婚</h1>
                    <h2 style="font-size: 1.2rem; color: #00ff88; margin: 0;">完整合婚分析报告</h2>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 30px 0;">
                    <div style="background: rgba(0, 212, 255, 0.1); padding: 25px; border-radius: 12px; border: 1px solid rgba(0, 212, 255, 0.3);">
                        <h3 style="color: #00d4ff; margin-bottom: 15px; font-size: 1.3rem; text-align: center;">👨 男方信息</h3>
                        <div style="line-height: 1.8; font-size: 1rem;">
                            <div><strong style="color: #00ff88;">姓名：</strong>${marriageData.male.name}</div>
                            <div><strong style="color: #00ff88;">出生：</strong>${marriageData.male.year}年${marriageData.male.month}月${marriageData.male.day}日</div>
                            <div><strong style="color: #00ff88;">时间：</strong>${marriageData.male.hour.toString().padStart(2, '0')}:${(marriageData.male.minute || 0).toString().padStart(2, '0')}</div>
                            <div><strong style="color: #00ff88;">地区：</strong>${marriageData.male.birthProvince || '未知'} ${marriageData.male.birthCity || '未知'}</div>
                            <div><strong style="color: #00ff88;">生肖：</strong>${this.getZodiacAnimal(marriageData.male.year)}</div>
                        </div>
                    </div>
                    <div style="background: rgba(255, 0, 128, 0.1); padding: 25px; border-radius: 12px; border: 1px solid rgba(255, 0, 128, 0.3);">
                        <h3 style="color: #ff0080; margin-bottom: 15px; font-size: 1.3rem; text-align: center;">👩 女方信息</h3>
                        <div style="line-height: 1.8; font-size: 1rem;">
                            <div><strong style="color: #00ff88;">姓名：</strong>${marriageData.female.name}</div>
                            <div><strong style="color: #00ff88;">出生：</strong>${marriageData.female.year}年${marriageData.female.month}月${marriageData.female.day}日</div>
                            <div><strong style="color: #00ff88;">时间：</strong>${marriageData.female.hour.toString().padStart(2, '0')}:${(marriageData.female.minute || 0).toString().padStart(2, '0')}</div>
                            <div><strong style="color: #00ff88;">地区：</strong>${marriageData.female.birthProvince || '未知'} ${marriageData.female.birthCity || '未知'}</div>
                            <div><strong style="color: #00ff88;">生肖：</strong>${this.getZodiacAnimal(marriageData.female.year)}</div>
                        </div>
                    </div>
                </div>

                <div style="text-align: center; margin: 30px 0;">
                    <div style="display: inline-block; width: 150px; height: 150px; border: 4px solid #00d4ff; border-radius: 50%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: rgba(0, 212, 255, 0.1);">
                        <div style="font-size: 2.5rem; font-weight: bold; color: #00d4ff;">${marriageResult.totalScore}</div>
                        <div style="font-size: 1rem; color: #00ff88;">分</div>
                        <div style="font-size: 0.9rem; color: #ff0080; margin-top: 5px;">${marriageResult.level}</div>
                    </div>
                </div>

                <div style="background: rgba(0, 255, 136, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 255, 136, 0.3);">
                    <h3 style="color: #00ff88; margin-bottom: 20px; font-size: 1.3rem;">合婚分析详情</h3>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; border-left: 4px solid #00d4ff;">
                            <div style="color: #00d4ff; font-weight: bold; margin-bottom: 8px;">生肖配对</div>
                            <div style="color: #00ff88; font-size: 1.2rem; margin-bottom: 5px;">${marriageResult.shengXiaoMatch.score}分</div>
                            <div style="font-size: 0.9rem; line-height: 1.5;">${marriageResult.shengXiaoMatch.analysis}</div>
                        </div>
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; border-left: 4px solid #ff0080;">
                            <div style="color: #ff0080; font-weight: bold; margin-bottom: 8px;">五行配对</div>
                            <div style="color: #00ff88; font-size: 1.2rem; margin-bottom: 5px;">${marriageResult.wuXingMatch.score}分</div>
                            <div style="font-size: 0.9rem; line-height: 1.5;">${marriageResult.wuXingMatch.analysis}</div>
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; border-left: 4px solid #00ff88;">
                            <div style="color: #00ff88; font-weight: bold; margin-bottom: 8px;">十神配对</div>
                            <div style="color: #00ff88; font-size: 1.2rem; margin-bottom: 5px;">${marriageResult.shiShenMatch.score}分</div>
                            <div style="font-size: 0.9rem; line-height: 1.5;">${marriageResult.shiShenMatch.analysis}</div>
                        </div>
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; border-radius: 8px; border-left: 4px solid #ffa500;">
                            <div style="color: #ffa500; font-weight: bold; margin-bottom: 8px;">年龄配对</div>
                            <div style="color: #00ff88; font-size: 1.2rem; margin-bottom: 5px;">${marriageResult.ageMatch.score}分</div>
                            <div style="font-size: 0.9rem; line-height: 1.5;">${marriageResult.ageMatch.analysis}</div>
                        </div>
                    </div>
                </div>

                <div style="background: rgba(255, 0, 128, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(255, 0, 128, 0.3);">
                    <h3 style="color: #ff0080; margin-bottom: 20px; font-size: 1.3rem;">改进建议</h3>
                    ${marriageResult.suggestions.map((suggestion, index) => `
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #00ff88;">
                            <div style="color: #00ff88; font-weight: bold;">${index + 1}. ${suggestion}</div>
                        </div>
                    `).join('')}
                </div>

                ${aiAnalysis ? `
                    <div style="background: rgba(0, 212, 255, 0.1); padding: 25px; border-radius: 12px; margin: 30px 0; border: 1px solid rgba(0, 212, 255, 0.3);">
                        <h3 style="color: #00d4ff; margin-bottom: 20px; font-size: 1.3rem;">AI智能分析</h3>
                        <div style="background: rgba(0, 0, 0, 0.3); padding: 20px; border-radius: 8px; line-height: 1.8;">
                            ${aiAnalysis}
                        </div>
                    </div>
                ` : ''}

                <div style="text-align: center; margin-top: 40px; padding: 25px; background: rgba(0, 0, 0, 0.3); border-radius: 12px; border-top: 2px solid #00d4ff; color: #ccc;">
                    报告生成时间：${new Date().toLocaleString('zh-CN')}<br>
                    本报告由赛博合婚系统生成
                </div>
            </div>
        `;
    }

    // 获取生肖动物
    getZodiacAnimal(year) {
        const animals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
        return animals[(year - 4) % 12];
    }

    // 直接截取网页内容生成长图（保留原始视觉效果）
    async captureWebPageContent(element) {
        // 确保库已加载
        if (typeof html2canvas === 'undefined') {
            console.log('html2canvas未加载，尝试动态加载...');

            if (typeof window.ensureLibrariesLoaded === 'function') {
                const loaded = await window.ensureLibrariesLoaded();
                if (!loaded) {
                    throw new Error('html2canvas库加载失败，请检查网络连接或尝试刷新页面');
                }
            } else {
                throw new Error('html2canvas库未加载，请刷新页面重试');
            }
        }

        console.log('开始截取网页内容...');

        // 临时修改样式以便截图
        const originalStyle = element.style.cssText;

        // 确保AI分析结果区域完全展开
        const aiOutputs = element.querySelectorAll('.ai-output, #naming-ai-output, #ceming-ai-output, #ai-marriage-output');
        const aiOriginalStyles = [];

        aiOutputs.forEach((aiOutput, index) => {
            aiOriginalStyles[index] = aiOutput.style.cssText;
            aiOutput.style.cssText = `
                ${aiOriginalStyles[index]}
                max-height: none !important;
                overflow: visible !important;
                height: auto !important;
            `;
        });

        // 设置元素样式以便截图
        element.style.cssText = `
            ${originalStyle}
            position: relative;
            width: 800px;
            max-height: none !important;
            overflow: visible !important;
            height: auto !important;
            background: transparent;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
        `;

        try {
            // 等待样式应用
            await new Promise(resolve => setTimeout(resolve, 500));

            // 强制重新计算高度
            const actualHeight = Math.max(
                element.scrollHeight,
                element.offsetHeight,
                element.clientHeight
            );

            console.log('截图元素尺寸:', {
                width: element.offsetWidth,
                height: actualHeight,
                scrollHeight: element.scrollHeight
            });

            // 使用html2canvas截图
            const canvas = await html2canvas(element, {
                width: 800,
                height: actualHeight,
                scale: 2, // 高清截图
                useCORS: true,
                allowTaint: true,
                backgroundColor: null, // 保持透明背景
                scrollX: 0,
                scrollY: 0,
                logging: true, // 启用调试日志
                onclone: (clonedDoc) => {
                    // 在克隆的文档中确保样式正确
                    const clonedElement = clonedDoc.querySelector(`#${element.id} .result-content`) ||
                                        clonedDoc.querySelector('.result-content');
                    if (clonedElement) {
                        clonedElement.style.maxHeight = 'none';
                        clonedElement.style.overflow = 'visible';
                        clonedElement.style.height = 'auto';
                    }
                }
            });

            console.log('截图完成，canvas尺寸:', canvas.width, 'x', canvas.height);
            return canvas;

        } finally {
            // 恢复原始样式
            element.style.cssText = originalStyle;
            aiOutputs.forEach((aiOutput, index) => {
                aiOutput.style.cssText = aiOriginalStyles[index];
            });
        }
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing CyberFortune...');
    try {
        window.cyberFortune = new CyberFortune();
        console.log('CyberFortune initialized successfully');

        // 额外的延迟检查，确保在所有环境下都能正常工作
        setTimeout(() => {
            console.log('Performing final check of select elements...');
            if (window.cyberFortune && typeof window.cyberFortune.ensureSelectsPopulated === 'function') {
                window.cyberFortune.ensureSelectsPopulated();
            }
        }, 1000);

    } catch (error) {
        console.error('Error initializing CyberFortune:', error);
    }
});

// 备用初始化（防止DOMContentLoaded事件失效）
window.addEventListener('load', function() {
    console.log('Window loaded, checking CyberFortune initialization...');
    if (!window.cyberFortune) {
        console.log('CyberFortune not initialized, trying again...');
        try {
            window.cyberFortune = new CyberFortune();
            console.log('CyberFortune initialized on window load');
        } catch (error) {
            console.error('Error initializing CyberFortune on window load:', error);
        }
    } else {
        console.log('CyberFortune already initialized');
        // 再次确保选择框已填充
        if (typeof window.cyberFortune.ensureSelectsPopulated === 'function') {
            window.cyberFortune.ensureSelectsPopulated();
        }
    }
});
