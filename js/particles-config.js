// 赛博论命 - 粒子效果配置

// 初始化粒子系统
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": ["#00d4ff", "#ff0080", "#00ff88"]
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 6
                    }
                },
                "opacity": {
                    "value": 0.5,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": true,
                        "speed": 2,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00d4ff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 0.5
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }
});

// 创建额外的视觉效果
class CyberEffects {
    constructor() {
        this.init();
    }

    init() {
        this.createScanLines();
        this.createDataStreams();
        this.createGlitchEffect();
    }

    // 创建扫描线效果
    createScanLines() {
        const scanLine = document.createElement('div');
        scanLine.className = 'scan-line';
        scanLine.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00d4ff, transparent);
            z-index: 1;
            opacity: 0.3;
            animation: scanLine 4s linear infinite;
        `;
        document.body.appendChild(scanLine);
    }

    // 创建数据流效果
    createDataStreams() {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                this.createSingleDataStream();
            }, i * 1000);
        }
    }

    createSingleDataStream() {
        const stream = document.createElement('div');
        stream.className = 'data-stream';
        stream.style.cssText = `
            position: fixed;
            top: ${Math.random() * 100}%;
            left: -10px;
            width: 2px;
            height: 20px;
            background: linear-gradient(to bottom, transparent, #00d4ff, transparent);
            z-index: 1;
            animation: dataFlow 3s linear infinite;
        `;
        
        document.body.appendChild(stream);
        
        setTimeout(() => {
            if (stream.parentNode) {
                stream.parentNode.removeChild(stream);
            }
            this.createSingleDataStream();
        }, 3000);
    }

    // 创建故障效果
    createGlitchEffect() {
        const glitchElements = document.querySelectorAll('.title-main');
        
        glitchElements.forEach(element => {
            setInterval(() => {
                if (Math.random() < 0.1) { // 10% 概率触发故障效果
                    element.style.textShadow = `
                        2px 0 #ff0080,
                        -2px 0 #00d4ff,
                        0 0 10px #00d4ff
                    `;
                    element.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
                    
                    setTimeout(() => {
                        element.style.textShadow = '';
                        element.style.transform = '';
                    }, 100);
                }
            }, 2000);
        });
    }

    // 鼠标跟随效果
    createMouseFollower() {
        const follower = document.createElement('div');
        follower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #00d4ff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: all 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(follower);

        document.addEventListener('mousemove', (e) => {
            follower.style.left = e.clientX - 10 + 'px';
            follower.style.top = e.clientY - 10 + 'px';
        });

        // 鼠标悬停在可点击元素上时的效果
        const clickableElements = document.querySelectorAll('a, button, .feature-card');
        clickableElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                follower.style.transform = 'scale(1.5)';
                follower.style.borderColor = '#ff0080';
            });
            
            element.addEventListener('mouseleave', () => {
                follower.style.transform = 'scale(1)';
                follower.style.borderColor = '#00d4ff';
            });
        });
    }

    // 创建矩阵雨效果（可选）
    createMatrixRain() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        const charArray = chars.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00d4ff';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = charArray[Math.floor(Math.random() * charArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 50);

        // 响应窗口大小变化
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// 初始化赛博效果
document.addEventListener('DOMContentLoaded', function() {
    const cyberEffects = new CyberEffects();
    // cyberEffects.createMouseFollower(); // 可选：启用鼠标跟随效果
    // cyberEffects.createMatrixRain(); // 可选：启用矩阵雨效果
});

// 添加CSS动画关键帧
const style = document.createElement('style');
style.textContent = `
    @keyframes scanLine {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes dataFlow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100vw); }
    }
`;
document.head.appendChild(style);
