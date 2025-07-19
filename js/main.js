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
        this.setupNavigation();
        this.setupForms();
        this.populateSelects();
        this.setupEventListeners();
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
        this.populateYears();
        this.populateMonths();
        this.populateDays();
        this.populateProvinces();
    }

    // 填充年份选择框
    populateYears() {
        const yearSelects = document.querySelectorAll('select[name="birthYear"]');
        const currentYear = new Date().getFullYear();
        
        yearSelects.forEach(select => {
            for (let year = currentYear; year >= 1900; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year + '年';
                select.appendChild(option);
            }
        });
    }

    // 填充月份选择框
    populateMonths() {
        const monthSelects = document.querySelectorAll('select[name="birthMonth"]');
        
        monthSelects.forEach(select => {
            for (let month = 1; month <= 12; month++) {
                const option = document.createElement('option');
                option.value = month;
                option.textContent = month + '月';
                select.appendChild(option);
            }
        });
    }

    // 填充日期选择框
    populateDays() {
        const daySelects = document.querySelectorAll('select[name="birthDay"]');
        
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
        const monthSelects = document.querySelectorAll('select[name="birthMonth"]');
        monthSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateDays(e.target.closest('form'));
            });
        });

        // 年份变化时更新日期
        const yearSelects = document.querySelectorAll('select[name="birthYear"]');
        yearSelects.forEach(select => {
            select.addEventListener('change', (e) => {
                this.updateDays(e.target.closest('form'));
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

    // 更新日期选择框
    updateDays(form) {
        const yearSelect = form.querySelector('select[name="birthYear"]');
        const monthSelect = form.querySelector('select[name="birthMonth"]');
        const daySelect = form.querySelector('select[name="birthDay"]');
        
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
                <div class="analysis-prompt">
                    <h5>分析提示词：</h5>
                    <div class="prompt-content">
                        <pre>${prompt}</pre>
                    </div>
                </div>
                <div class="analysis-note">
                    <p>💡 <strong>使用说明：</strong></p>
                    <p>1. 复制上方的分析提示词</p>
                    <p>2. 粘贴到您喜欢的AI助手（如ChatGPT、Claude等）</p>
                    <p>3. 获得详细的命理分析报告</p>
                </div>
            </div>

            <div class="result-actions">
                <button class="cyber-button" onclick="cyberFortune.copyPrompt()">
                    <span>复制提示词</span>
                    <div class="button-glow"></div>
                </button>
                <button class="cyber-button" onclick="cyberFortune.downloadReport()">
                    <span>下载报告</span>
                    <div class="button-glow"></div>
                </button>
            </div>
        `;
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

    // 复制提示词到剪贴板
    async copyPrompt() {
        const promptElement = document.querySelector('.prompt-content pre');
        if (!promptElement) return;

        try {
            await navigator.clipboard.writeText(promptElement.textContent);
            this.showSuccess('提示词已复制到剪贴板');
        } catch (err) {
            // 降级方案
            const textArea = document.createElement('textarea');
            textArea.value = promptElement.textContent;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            this.showSuccess('提示词已复制到剪贴板');
        }
    }

    // 下载报告
    downloadReport() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) return;

        // 创建一个简化的文本版本
        const reportText = this.generateReportText();

        const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `赛博论命报告_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        URL.revokeObjectURL(url);
        this.showSuccess('报告已下载');
    }

    // 生成报告文本
    generateReportText() {
        const resultContent = document.querySelector('#zhiming-result .result-content');
        if (!resultContent) return '';

        // 提取关键信息
        const title = resultContent.querySelector('.result-title')?.textContent || '';
        const info = resultContent.querySelector('.result-info')?.textContent || '';
        const prompt = resultContent.querySelector('.prompt-content pre')?.textContent || '';

        return `${title}\n${'='.repeat(50)}\n\n基本信息：${info}\n\n${prompt}`;
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
            customChars: formData.get('customChars')?.split(',').map(s => s.trim()).filter(s => s) || []
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
                birthData.customChars
            );

            this.displayQimingResult(birthData, nameSuggestions);

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
            hour: parseInt(formData.get('birthHour'))
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

            this.displayCemingResult(testData, nameAnalysis);

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
        return data.surname && data.gender && data.year && data.month && data.day && data.hour !== null;
    }

    // 验证测名数据
    validateCemingData(data) {
        return data.fullName && data.gender && data.year && data.month && data.day && data.hour !== null;
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
    displayQimingResult(birthData, nameSuggestions) {
        const resultPanel = document.getElementById('qiming-result');
        const resultContent = resultPanel.querySelector('.result-content');

        if (!resultPanel || !resultContent) return;

        const resultHTML = `
            <div class="result-header">
                <h3 class="result-title">智能起名结果</h3>
                <div class="result-info">
                    <span>姓氏：${birthData.surname} | 性别：${birthData.gender}</span>
                </div>
            </div>

            <div class="name-suggestions">
                <h4>推荐姓名</h4>
                <div class="names-grid">
                    ${nameSuggestions.map((suggestion, index) => `
                        <div class="name-card">
                            <div class="name-rank">${index + 1}</div>
                            <div class="name-text">${suggestion.fullName}</div>
                            <div class="name-score">${suggestion.score}分</div>
                            <div class="name-wuxing">五行：${suggestion.wuXingMatch.join('、')}</div>
                            <div class="name-sancai">三才：${suggestion.sanCai.jiXiong}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        resultContent.innerHTML = resultHTML;
        resultPanel.style.display = 'block';
        resultPanel.classList.add('show');
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // 显示测名结果
    displayCemingResult(testData, nameAnalysis) {
        const resultPanel = document.getElementById('ceming-result');
        const resultContent = resultPanel.querySelector('.result-content');

        if (!resultPanel || !resultContent) return;

        const resultHTML = `
            <div class="result-header">
                <h3 class="result-title">姓名分析报告</h3>
                <div class="result-info">
                    <span>${testData.fullName} | ${testData.gender}</span>
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
                        <h4>详细分析</h4>
                        <pre class="analysis-text">${nameAnalysis.analysis}</pre>
                    </div>
                </div>
            </div>
        `;

        resultContent.innerHTML = resultHTML;
        resultPanel.style.display = 'block';
        resultPanel.classList.add('show');
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    }

    // 显示合婚结果
    displayHehunResult(marriageData, marriageResult) {
        const resultPanel = document.getElementById('hehun-result');
        const resultContent = resultPanel.querySelector('.result-content');

        if (!resultPanel || !resultContent) return;

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
            </div>
        `;

        resultContent.innerHTML = resultHTML;
        resultPanel.style.display = 'block';
        resultPanel.classList.add('show');
        resultPanel.scrollIntoView({ behavior: 'smooth' });
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
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing CyberFortune...');
    try {
        window.cyberFortune = new CyberFortune();
        console.log('CyberFortune initialized successfully');
    } catch (error) {
        console.error('Error initializing CyberFortune:', error);
    }
});
