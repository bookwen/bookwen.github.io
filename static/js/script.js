/* 简历页脚本 script.js：主题切换、中英切换、工作经历弹窗、导航与滚动、可拖动卡片等 */

(function() {
      /* 夜间模式：图标切换 + localStorage */
      var theme = localStorage.getItem('resume-theme') || 'light';
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('themeIconSun').style.display = 'none';
        document.getElementById('themeIconMoon').style.display = 'block';
        document.getElementById('themeBtn').setAttribute('title', '日间模式');
        document.getElementById('themeBtn').setAttribute('aria-label', '日间模式');
      }
      document.getElementById('themeBtn').addEventListener('click', function(e) {
        var btn = this;
        var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        var langNow = localStorage.getItem('resume-lang') || 'zh';
        var lbl = langNow === 'en' ? { dark: 'Dark mode', light: 'Light mode' } : { dark: '夜间模式', light: '日间模式' };
        var x = e.clientX;
        var y = e.clientY;

        document.documentElement.classList.add('theme-switching');
        if (isDark) {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('resume-theme', 'light');
          document.getElementById('themeIconSun').style.display = 'block';
          document.getElementById('themeIconMoon').style.display = 'none';
          btn.setAttribute('title', lbl.dark);
          btn.setAttribute('aria-label', lbl.dark);
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('resume-theme', 'dark');
          document.getElementById('themeIconSun').style.display = 'none';
          document.getElementById('themeIconMoon').style.display = 'block';
          btn.setAttribute('title', lbl.light);
          btn.setAttribute('aria-label', lbl.light);
        }

        var overlay = document.createElement('div');
        overlay.className = 'theme-overlay';
        overlay.style.setProperty('--theme-x', x + 'px');
        overlay.style.setProperty('--theme-y', y + 'px');
        overlay.classList.add(isDark ? 'theme-spread-light' : 'theme-spread-dark');
        document.body.appendChild(overlay);

        function cleanup() {
          overlay.removeEventListener('animationend', cleanup);
          if (overlay.parentNode) overlay.remove();
          document.documentElement.classList.remove('theme-switching');
        }
        overlay.addEventListener('animationend', cleanup);
        setTimeout(cleanup, 620);
      });

      /* 工作经历：可扩展卡片列表 + 弹窗详情（在 workContent/btnLabels 定义之后初始化） */
      /* 英文/中文切换 */
      var lang = localStorage.getItem('resume-lang') || 'zh';
      var t = {
        zh: { hero: '首页', about: '关于', education: '教育', experience: '经历', projects: '项目', awards: '荣誉', skills: '技能', intro: '评价', subtitle: '拖动卡片查看，拖出屏幕丢弃', experienceSubtitle: '向下滑动查看' },
        en: { hero: 'Home', about: 'About', education: 'Education', experience: 'Experience', projects: 'Projects', awards: 'Awards', skills: 'Skills', intro: 'About', subtitle: 'Drag cards to view, drag off-screen to discard', experienceSubtitle: 'Swipe down to view' }
      };
      var sectionTitles = {
        zh: { education: '教育经历', experience: '工作经历', projects: '项目经历', skills: '技术能力', intro: '自我评价' },
        en: { education: 'Education', experience: 'Work Experience', projects: 'Projects', skills: 'Skills', intro: 'Self Evaluation' }
      };
      var heroContent = {
        zh: { title: '软件测试工程师', greeting: '你好，我叫', contactMe: '联系我' },
        en: { title: 'Software Test Engineer', greeting: "Hi, I'm", contactMe: 'Contact Me' }
      };
      var eduContent = {
        zh: { school: '江西工程学院', meta: '软件工程 · 全日制本科 · 2022.07 毕业' },
        en: { school: 'Jiangxi Institute of Engineering', meta: 'Software Engineering · Full-time Bachelor · Graduated Jul 2022' }
      };
      var workContent = {
        zh: [
          { company: '深圳软通动力信息技术有限公司', date: '2024.9 - 2026.2', role: '软件测试工程师', img: 'static/img/isoftstone.png', link: 'https://www.isoftstone.com/', desc: ['负责鸿蒙系统移动端和PC端核心功能测试，覆盖系统设置、应用管理、跨设备协同等关键模块','基于 Python+Appium/Selenium 搭建自动化测试框架，编写关键业务流程脚本','使用 JMeter 进行接口性能基准测试，分析响应时间、TPS 等关键指标','定期输出多维度测试报告，为项目迭代决策提供数据支撑'], stats: ['缺陷跟踪解决','人工测试减少','性能瓶颈优化'], statVals: ['280+','30%','5'] },
          { company: '广州神州浩天科技有限公司', date: '2024.3 - 2024.8', role: '软件实施工程师', img: 'static/img/szhtkj.png', link: 'http://www.szhtkj.com.cn/', desc: ['负责广东省 20+ 所学校天财智慧财务系统部署实施，完成需求调研、系统配置和数据初始化','运用 SQL Server 进行基础数据导入、清洗与校验，处理跨系统数据同步差异','负责用户反馈、客户培训工作,解答用户系统使用过程中的疑问,推动报销流程简化和财务报表可视化功能优化','负责项目的测试、上线、验收及后期维护,确保项目按照交付和符合质量标准','负责公司软件产品的实施及售后维护工作,协助新产品发布及版本更新后的测试反馈,完成测试环境搭建及演示流程'], stats: ['所学校部署','数据准确性','用户满意度','财务效率提升'], statVals: ['20+','100%','96%','45%'] },
          { company: '广州用友政务软件有限公司', date: '2022.3 - 2024.3', role: '软件测试工程师', img: 'static/img/yonyou.png', link: 'https://www.yonyou.com/', desc: ['参与数字财政系统和数字人大系统实施，负责项目的项目计划、需求分析、项目进度管理、系统配置、测试和上线支持全流程','协助新产品发布及版本更新后的测试反馈，完成测试环境搭建及演示流程','负责公司软件产品的实施及售后维护工作,及时跟踪处理实施过程中客户提交的问题','使用 Postman 进行接口测试，编写测试用例保障系统功能稳定性','负责用户反馈、客户培训工作，解答用户系统使用过程中的疑问,维护良好客户关系'], stats: ['实施问题解决','测试用例','客户好评率'], statVals: ['500+','1000+','95%+'] }
        ],
        en: [
          { company: 'Shenzhen Chinasoft Information Technology Co., Ltd.', date: 'Sep 2024 - Feb 2026', role: 'Software Test Engineer', img: 'static/img/isoftstone.png', link: 'https://www.isoftstone.com/', desc: ['Core functional testing for HarmonyOS mobile and PC (settings, app management, cross-device sync)','Built automation framework with Python+Appium/Selenium for key business flows','JMeter-based API performance benchmarking; analyzed response time and TPS','Delivered multi-dimensional test reports to support release decisions'], stats: ['Defects tracked & resolved','Manual test reduction','Performance bottlenecks optimized'], statVals: ['280+','30%','5'] },
          { company: 'Guangzhou Shenzhou Haotian Technology Co., Ltd.', date: 'Mar - Aug 2024', role: 'Software Implementation Engineer', img: 'static/img/szhtkj.png', link: 'http://www.szhtkj.com.cn/', desc: ['Deployed Tiancai finance system for 20+ schools in Guangdong; requirements, config, data init','SQL Server for data import, cleansing, validation and cross-system sync','Trained school finance staff; wrote operation manuals'], stats: ['Schools deployed','Data accuracy','User satisfaction','Finance efficiency gain'], statVals: ['20+','100%','96%','45%'] },
          { company: 'Guangzhou Yonyou Government Software Co., Ltd.', date: 'Mar 2022 - Mar 2024', role: 'Software Test Engineer', img: 'static/img/yonyou.png', link: 'https://www.yonyou.com/', desc: ['Digital fiscal and NPC systems: requirements, config, testing and go-live support','Tracked and resolved customer-reported issues','Postman API testing; test cases for system stability','Maintained customer relationships'], stats: ['Implementation issues resolved','Test cases','Client satisfaction'], statVals: ['500+','1000+','95%+'] }
        ]
      };
      var projContent = {
        zh: [
          { name: '智小荣 & 知识社区测试', date: '2025.8 - 2026.2', sub: '荣耀 MagicOS 生态核心项目 · 软件测试工程师', bg: ['聚焦智小荣 AI 助手研发与知识社区搭建，服务内部员工及核心用户'], duty: ['项目背景'], dutyLabel: '主要职责', dutyList: ['使用 DevSecOps、JMeter、Postman、MySQL 等工具','依托云龙平台搭建测试体系，每月输出 200 条用例，适配月中发版节奏','承担社区核心模块手动测试，使用 JMeter 开展性能与压力测试','借助云龙平台落地接口自动化测试，精简重复工作量'], result: '保障系统交互准确率 <span class="stat">91%+</span>，社区故障率 <span class="stat">&lt;0.3%</span>，支撑 <span class="stat">10 万+</span> 人次活动 · 重复工作精简 <span class="stat">40%</span>，测试效率提升 <span class="stat">35%</span> · 私域转化超行业均值 <span class="stat">25%</span>，指令识别准确率提升 <span class="stat">23%</span>' },
          { name: '鸿蒙移动 & PC 集成测试', date: '2024.9 - 2025.7', sub: '软件测试工程师', bg: ['参与华为鸿蒙系统移动端和 PC 端全面测试，覆盖系统设置、应用安装卸载、多设备协同、文件跨端传输等核心模块'], duty: ['项目背景'], dutyLabel: '主要职责', dutyList: ['使用 Python、Postman、Appium、Selenium、JMeter、dev 平台','设计覆盖系统设置、多设备协同等模块的测试用例','执行端侧功能/接口测试，用 Python 编写自动化脚本','开展多设备/硬件环境兼容性测试，输出测试报告'], result: '完成 <span class="stat">1000+</span> 测试用例执行 · 发现并跟踪解决缺陷 <span class="stat">280+</span> 个 · 累计 <span class="stat">8000+</span> 行自动化代码 · 减少人工测试工作量 <span class="stat">30%</span>' },
          { name: '天财智慧财务系统', date: '2024.3 - 2024.8', sub: '软件实施工程师', bg: ['为广东省 20+ 所学校部署天财智慧财务平台，适配财政预算一体化改革要求'], duty: ['项目背景'], dutyLabel: '主要职责', dutyList: ['牵头多校财务需求调研，输出 3 份场景化需求报告','用 SQL Server 处理账务/人员/预算数据','搭建测试环境，组织 20+ 场培训，编制操作手册'], result: '数据同步准确率 <span class="stat">100%</span> · 用户满意度 <span class="stat">96%</span> · 财务办公效率提升 <span class="stat">45%</span>' },
          { name: '数字人大系统', date: '2023.10 - 2024.3', sub: '软件实施工程师', bg: ['搭建人大常委会国资监督支撑平台，实现专项报告、数据报表汇聚和自动预警功能'], duty: ['项目背景'], dutyLabel: '主要职责', dutyList: ['使用 Linux、MySQL、永洪 BI','负责国资数据图表展示、数据管理等核心功能的 Web 端功能测试','编写测试用例超 1000 条，在 Linux 下搭建 UAT 测试环境'], result: '协助分析解决 BUG 缺陷 <span class="stat">100+</span> 条，保障系统稳定上线' },
          { name: '数字财政系统', date: '2022.3 - 2023.10', sub: '软件实施工程师', bg: ['搭建财政局一体化信息化管理平台，通过数字化支付转型提升跨部门协同效率'], duty: ['项目背景'], dutyLabel: '主要职责', dutyList: ['使用 Navicat、Postman、FineReport、TAPD 等工具','开展功能测试、接口测试、兼容性测试','跟踪处理客户反馈问题，推动 100+ 问题解决'], result: '提升跨部门协同效率 <span class="stat">30%</span>，降低成本 <span class="stat">20%</span> · 客户好评率 <span class="stat">95%+</span>，成为部门实施标杆项目' }
        ],
        en: [
          { name: 'Zhi Xiaorong & Knowledge Community Testing', date: 'Aug 2025 - Feb 2026', sub: 'Honor MagicOS core project · Software Test Engineer', bg: ['AI assistant and knowledge community testing for internal and core users'], duty: ['Background'], dutyLabel: 'Responsibilities', dutyList: ['DevSecOps, JMeter, Postman, MySQL; test system on Yunlong platform; 200 cases/month','Manual testing for community modules; JMeter performance and stress testing','Interface automation on Yunlong to reduce repetitive work'], result: 'Interaction accuracy <span class="stat">91%+</span>, community failure rate <span class="stat">&lt;0.3%</span>, 100k+ events · 40% repetitive work reduced, 35% test efficiency gain · 25% above industry on conversion, 23% command recognition gain' },
          { name: 'HarmonyOS Mobile & PC Integration Testing', date: 'Sep 2024 - Jul 2025', sub: 'Software Test Engineer', bg: ['Full-scope testing for HarmonyOS mobile and PC: settings, app install/uninstall, multi-device sync, cross-device file transfer'], duty: ['Background'], dutyLabel: 'Responsibilities', dutyList: ['Python, Postman, Appium, Selenium, JMeter, dev platform','Test cases for settings and multi-device sync','E2E and API testing; Python automation scripts','Compatibility testing across devices and hardware; test reports'], result: '<span class="stat">1000+</span> test cases executed · <span class="stat">280+</span> defects tracked and resolved · <span class="stat">8000+</span> lines of automation · 30% manual test reduction' },
          { name: 'Tiancai Smart Finance System', date: 'Mar - Aug 2024', sub: 'Software Implementation Engineer', bg: ['Deployed Tiancai finance platform for 20+ schools in Guangdong; budget integration reform'], duty: ['Background'], dutyLabel: 'Responsibilities', dutyList: ['Led requirements across schools; 3 scenario-based reports','SQL Server for accounts, personnel, budget data','Test env setup; 20+ training sessions; operation manuals'], result: 'Data sync accuracy <span class="stat">100%</span> · User satisfaction <span class="stat">96%</span> · Finance efficiency <span class="stat">45%</span> up' },
          { name: 'Digital NPC System', date: 'Oct 2023 - Mar 2024', sub: 'Software Implementation Engineer', bg: ['NPC standing committee state-owned assets supervision platform; reports, dashboards, alerts'], duty: ['Background'], dutyLabel: 'Responsibilities', dutyList: ['Linux, MySQL, Yonghong BI','Web testing for data charts and data management','1000+ test cases; UAT env on Linux'], result: '<span class="stat">100+</span> bugs analyzed and resolved for stable launch' },
          { name: 'Digital Fiscal System', date: 'Mar 2022 - Oct 2023', sub: 'Software Implementation Engineer', bg: ['Integrated fiscal management platform; digital payment and cross-department collaboration'], duty: ['Background'], dutyLabel: 'Responsibilities', dutyList: ['Navicat, Postman, FineReport, TAPD','Functional, API and compatibility testing','Customer feedback and 100+ issues resolved'], result: 'Cross-department efficiency <span class="stat">30%</span> up, cost <span class="stat">20%</span> down · <span class="stat">95%+</span> client satisfaction, benchmark project' }
        ]
      };
      var projBlockTitles = { zh: { bg: '项目背景', duty: '主要职责' }, en: { bg: 'Background', duty: 'Responsibilities' } };
      var skillsContent = {
        zh: { subtitle: '技能線', title: '技术能力', row2: ['团队协作','质量管控','需求分析','测试报告','进度管控','风险管理','接口测试','自动化测试','性能测试'] },
        en: { subtitle: 'Skills', title: 'Technical Skills', row2: ['Teamwork','Quality Control','Requirements Analysis','Test Reporting','Progress Control','Risk Management','API Testing','Automation Testing','Performance Testing'] }
      };
      var introContent = {
        zh: ['具备 4 年软件测试与实施经验，熟悉软件测试全流程和方法，能够独立完成自动化测试脚本开发和维护','精通 Python 编程语言，熟练使用 Postman、JMeter 等测试工具，具备丰富的接口测试和性能测试经验','具有良好的问题分析和解决能力，能够快速定位和解决软件缺陷，保障系统质量和稳定性','工作积极认真，细心负责，善于发现问题并提出解决方案，具备良好的团队协作和沟通能力','对新技术有强烈的学习兴趣，能够快速掌握和应用新的测试工具和技术，适应高强度工作环境'],
        en: ['4 years of software testing and implementation; familiar with full test lifecycle; independent automation script development and maintenance','Proficient in Python; experienced with Postman, JMeter; strong API and performance testing','Strong analytical and problem-solving skills; quick defect identification and resolution for quality and stability','Proactive, detail-oriented; good at finding issues and proposing solutions; team collaboration and communication','Strong interest in new technologies; quick to learn and apply new tools; adaptable to high-intensity work']
      };
      var btnLabels = {
        zh: { menu: '菜单', theme: '夜间模式', themeLight: '日间模式', prev: '上一项', next: '下一项', recover: '↩ 捡回卡片', viewExp: '查看', visitSite: '访问官网' },
        en: { menu: 'Menu', theme: 'Dark mode', themeLight: 'Light mode', prev: 'Previous', next: 'Next', recover: '↩ Recover cards', viewExp: 'View', visitSite: 'Visit site' }
      };

      /* 新工作经历展开/收缩动画 */
      var workExpOverlay = document.getElementById('workExpNewOverlay');
      var workExpActiveCard = null;
      var workExpOriginalRect = null;

      window.handleWorkExpBtnClick = function(event, btn, url) {
        var card = btn.closest('.work-exp-new-card');
        if (card && card.classList.contains('expanded')) {
          event.stopPropagation();
          window.open(url, '_blank');
        }
      };

      window.handleWorkExpExpand = function(card) {
        if (workExpActiveCard || card.classList.contains('expanded')) return;
        workExpActiveCard = card;
        workExpOriginalRect = card.getBoundingClientRect();

        card.style.width = workExpOriginalRect.width + 'px';
        card.style.height = workExpOriginalRect.height + 'px';
        card.style.top = workExpOriginalRect.top + 'px';
        card.style.left = workExpOriginalRect.left + 'px';
        card.style.position = 'fixed';
        card.offsetHeight;
        card.classList.add('work-exp-new-animate', 'expanded');

        if (workExpOverlay) workExpOverlay.classList.add('show');

        var btn = card.querySelector('.work-exp-new-btn');
        if (btn) btn.textContent = '访问官网';

        var head = card.querySelector('.work-exp-new-head');
        if (head) {
          head.style.flexDirection = 'column';
          head.style.alignItems = 'stretch';
        }
      };

      function handleWorkExpShrink() {
        if (!workExpActiveCard) return;
        var card = workExpActiveCard;

        card.style.width = workExpOriginalRect.width + 'px';
        card.style.height = workExpOriginalRect.height + 'px';
        card.style.top = workExpOriginalRect.top + 'px';
        card.style.left = workExpOriginalRect.left + 'px';
        card.style.transform = 'none';
        card.classList.remove('expanded');

        if (workExpOverlay) workExpOverlay.classList.remove('show');

        var btn = card.querySelector('.work-exp-new-btn');
        if (btn) btn.textContent = '查看';

        var head = card.querySelector('.work-exp-new-head');
        if (head) {
          head.style.flexDirection = 'row';
          head.style.alignItems = 'center';
        }

        setTimeout(function() {
          card.classList.remove('work-exp-new-animate');
          card.style.position = '';
          card.style.width = '';
          card.style.height = '';
          card.style.top = '';
          card.style.left = '';
          card.style.transform = '';
          workExpActiveCard = null;
        }, 800);
      }

      if (workExpOverlay) {
        workExpOverlay.addEventListener('click', handleWorkExpShrink);
      }

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && workExpActiveCard) handleWorkExpShrink();
      });

      /* 认识一下模块：四卡片展开/收缩动画 */
      var aboutOverlay = document.getElementById('aboutOverlay');
      var aboutActiveCard = null;
      var aboutPlaceholder = null;

      window.handleAboutExpand = function(card) {
        if (aboutActiveCard) return;
        aboutActiveCard = card;

        var rect = card.getBoundingClientRect();

        aboutPlaceholder = card.cloneNode(true);
        aboutPlaceholder.classList.add('about-placeholder');
        card.parentNode.insertBefore(aboutPlaceholder, card);

        card.style.position = 'fixed';
        card.style.top = rect.top + 'px';
        card.style.left = rect.left + 'px';
        card.style.width = rect.width + 'px';
        card.style.height = rect.height + 'px';
        card.style.margin = '0';
        card.style.transition = 'all 0.6s var(--ease-out-expo)';

        requestAnimationFrame(function() {
          card.classList.add('active');
          if (aboutOverlay) aboutOverlay.classList.add('show');
          card.style.top = '50%';
          card.style.left = '50%';
          card.style.transform = 'translate(-50%, -50%)';
        });
      };

      function handleAboutShrink() {
        if (!aboutActiveCard) return;

        var card = aboutActiveCard;
        var pRect = aboutPlaceholder.getBoundingClientRect();

        card.style.transform = 'translate(0, 0)';
        card.style.top = pRect.top + 'px';
        card.style.left = pRect.left + 'px';
        card.style.width = pRect.width + 'px';
        card.style.height = pRect.height + 'px';

        card.classList.remove('active');
        if (aboutOverlay) aboutOverlay.classList.remove('show');

        setTimeout(function() {
          card.style.transition = 'none';
          card.style.position = '';
          card.style.width = '';
          card.style.height = '';
          card.style.top = '';
          card.style.left = '';
          card.style.transform = '';

          if (aboutPlaceholder) {
            aboutPlaceholder.remove();
            aboutPlaceholder = null;
          }
          aboutActiveCard = null;
        }, 600);
      }

      if (aboutOverlay) {
        aboutOverlay.addEventListener('click', handleAboutShrink);
      }

      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && aboutActiveCard) handleAboutShrink();
      });

      /* 获奖经历轮播 */
      (function initAwardsCarousel() {
        var carousel = document.getElementById('awardsCarousel');
        if (!carousel) return;

        var cards = carousel.querySelectorAll('.awards-card-wrapper');
        var totalCards = cards.length;
        var currentIndex = 0;

        window.scrollAwardsCarousel = function(direction) {
          var cardWidth = cards[0].offsetWidth + 24;
          if (direction === 'left') {
            currentIndex = Math.max(0, currentIndex - 1);
          } else {
            currentIndex = Math.min(totalCards - 1, currentIndex + 1);
          }
          carousel.scrollTo({ left: currentIndex * cardWidth, behavior: 'smooth' });
        };

        carousel.addEventListener('scroll', function() {
          var cardWidth = cards[0].offsetWidth + 24;
          var newIndex = Math.round(carousel.scrollLeft / cardWidth);
          if (newIndex !== currentIndex) {
            currentIndex = newIndex;
          }
        });

        var isDown = false, startX, scrollLeft;
        carousel.addEventListener('mousedown', function(e) {
          isDown = true;
          startX = e.pageX - carousel.offsetLeft;
          scrollLeft = carousel.scrollLeft;
        });
        carousel.addEventListener('mouseleave', function() { isDown = false; });
        carousel.addEventListener('mouseup', function() { isDown = false; });
        carousel.addEventListener('mousemove', function(e) {
          if (!isDown) return;
          e.preventDefault();
          var x = e.pageX - carousel.offsetLeft;
          var walk = (x - startX) * 2;
          carousel.scrollLeft = scrollLeft - walk;
        });
      })();

      (function scrollbarOnlyWhenScrolling() {
        var scrollTimerHtml, scrollTimerBody;
        function showPageScrollbar() {
          document.documentElement.classList.add('is-scrolling');
          clearTimeout(scrollTimerHtml);
          scrollTimerHtml = setTimeout(function() { document.documentElement.classList.remove('is-scrolling'); }, 800);
        }
        function onScroll(e) {
          if (e.target.classList && e.target.classList.contains('work-exp-modal-body')) {
            e.target.classList.add('is-scrolling');
            clearTimeout(scrollTimerBody);
            scrollTimerBody = setTimeout(function() { e.target.classList.remove('is-scrolling'); }, 800);
          } else {
            showPageScrollbar();
          }
        }
        window.addEventListener('scroll', showPageScrollbar, { passive: true });
        document.addEventListener('scroll', onScroll, true);
      })();

      /* 工作经历：不克隆，仅 3 个模块静态展示 */
      function applyLang(l) {
        var isEn = l === 'en';
        var navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(function(a) {
          var h = a.getAttribute('href').slice(1);
          a.textContent = isEn ? t.en[h] : t.zh[h];
        });
        ['education','experience','projects','skills','intro'].forEach(function(id) {
          var sec = document.getElementById(id);
          if (sec) {
            var titleEl = sec.querySelector('.section-title');
            if (titleEl) titleEl.textContent = sectionTitles[l][id];
          }
        });
        document.querySelectorAll('.section-subtitle').forEach(function(s) {
          s.textContent = isEn ? t.en.subtitle : t.zh.subtitle;
        });
        var expSub = document.querySelector('#experience .section-subtitle');
        if (expSub) expSub.textContent = isEn ? t.en.experienceSubtitle : t.zh.experienceSubtitle;
        window.resumeLang = l;
        var heroTitle = document.querySelector('.hero-title');
        if (heroTitle) heroTitle.textContent = heroContent[l].title;
        var heroGreeting = document.querySelector('.hero-greeting');
        if (heroGreeting) heroGreeting.textContent = heroContent[l].greeting;
        var heroEmailText = document.querySelector('.hero-email-text');
        if (heroEmailText) heroEmailText.textContent = heroContent[l].contactMe;
        var eduSchool = document.querySelector('#education .school');
        if (eduSchool) eduSchool.textContent = eduContent[l].school;
        var eduMeta = document.querySelector('#education .meta');
        if (eduMeta) eduMeta.textContent = eduContent[l].meta;
        var projItems = document.querySelectorAll('.draggable-card, .project-item');
        projContent[l].forEach(function(p, i) {
          if (!projItems[i]) return;
          projItems[i].querySelector('.project-name').textContent = p.name;
          projItems[i].querySelector('.project-date').textContent = p.date;
          projItems[i].querySelector('.project-subtitle').textContent = p.sub;
          var blocks = projItems[i].querySelectorAll('.project-block');
          if (blocks[0]) { blocks[0].querySelector('h4').textContent = projBlockTitles[l].bg; blocks[0].querySelector('li').textContent = p.bg[0]; }
          if (blocks[1]) { blocks[1].querySelector('h4').textContent = p.dutyLabel; blocks[1].querySelectorAll('li').forEach(function(li, j) { li.textContent = (p.dutyList && p.dutyList[j]) || ''; }); }
          var res = projItems[i].querySelector('.project-result');
          if (res) res.innerHTML = p.result;
        });
        var skillsHeader = document.querySelector('.skills-header');
        if (skillsHeader) {
          var st = skillsHeader.querySelector('.skills-subtitle');
          if (st) st.textContent = skillsContent[l].subtitle;
          var tit = skillsHeader.querySelector('.section-title');
          if (tit) tit.textContent = skillsContent[l].title;
        }
        var row2Pills = document.querySelectorAll('#skillRow2 .skill-pill');
        row2Pills.forEach(function(pill, j) { pill.textContent = skillsContent[l].row2[j % skillsContent[l].row2.length]; });
        var introLis = document.querySelectorAll('#intro .self-intro li');
        introContent[l].forEach(function(para, j) { if (introLis[j]) introLis[j].textContent = para; });
        var menuBtn = document.getElementById('menuBtn');
        if (menuBtn) menuBtn.setAttribute('aria-label', btnLabels[l].menu);
        var themeBtn = document.getElementById('themeBtn');
        if (themeBtn) {
          var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
          themeBtn.setAttribute('title', isDark ? btnLabels[l].themeLight : btnLabels[l].theme);
          themeBtn.setAttribute('aria-label', isDark ? btnLabels[l].themeLight : btnLabels[l].theme);
        }
        var projPrev = document.getElementById('projPrev');
        var projNext = document.getElementById('projNext');
        if (projPrev) projPrev.setAttribute('aria-label', btnLabels[l].prev);
        if (projNext) projNext.setAttribute('aria-label', btnLabels[l].next);
        var recoverBtn = document.getElementById('recoverBtn');
        if (recoverBtn) {
          var baseText = btnLabels[l].recover;
          recoverBtn.innerHTML = baseText;
        }
      }
      if (lang === 'en') applyLang('en');
      window.resumeLang = window.resumeLang || lang;
      document.getElementById('langBtn').addEventListener('click', function() {
        lang = lang === 'zh' ? 'en' : 'zh';
        localStorage.setItem('resume-lang', lang);
        applyLang(lang);
      });

      /* 顶部导航：滚动缩小 */
      var topNav = document.getElementById('topNav');
      function onScrollNav() {
        var y = window.scrollY;
        if (y > 55) {
          topNav.classList.add('scrolled');
        } else if (y < 25) {
          topNav.classList.remove('scrolled');
        }
      }
      window.addEventListener('scroll', onScrollNav, { passive: true });
      onScrollNav();

      /* 导航点击：高亮 + 平滑滚动 */
      var navLinks = document.getElementById('navLinks');
      var topNavEl = document.getElementById('topNav');
      var navOverlay = document.getElementById('navOverlay');
      document.querySelectorAll('.nav-links a').forEach(function(a) {
        a.addEventListener('click', function(e) {
          e.preventDefault();
          var id = this.getAttribute('href');
          if (!id || id === '#') return;
          id = id.slice(1);

          /* 取消现有高亮 */
          document.querySelectorAll('.nav-links a').forEach(function(l) { l.classList.remove('active'); });

          /* 点击位置发散涟漪（限制在导航条内） */
          var ripple = document.createElement('div');
          ripple.className = 'nav-ripple';
          var navRect = topNavEl.getBoundingClientRect();
          ripple.style.left = (e.clientX - navRect.left) + 'px';
          ripple.style.top = (e.clientY - navRect.top) + 'px';
          topNavEl.appendChild(ripple);
          setTimeout(function() { ripple.remove(); }, 550);

          var el = document.getElementById(id);
          if (el) {
            var navHeight = topNavEl ? topNavEl.offsetHeight : 60;
            var target = id === 'hero' ? el : (el.classList && el.classList.contains('section') ? el : (el.querySelector('.section-title') || el.querySelector('.skills-header') || el));
            if (!target || !el.contains(target)) target = el;
            requestAnimationFrame(function() {
              var rect = target.getBoundingClientRect();
              var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              var targetTop = rect.top + scrollTop;
              var to = Math.max(0, Math.round(targetTop - navHeight));
              var start = window.pageYOffset || document.documentElement.scrollTop;
              var startTime = null;
              function easeOut(t) { return 1 - (1 - t) * (1 - t); }
              function step(now) {
                if (startTime == null) startTime = now;
                var elapsed = now - startTime;
                var t = Math.min(elapsed / 500, 1);
                window.scrollTo(0, start + (to - start) * easeOut(t));
                if (t < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            });
          }
          if (navLinks) navLinks.classList.remove('open');
          if (navOverlay) navOverlay.classList.remove('open');
          document.body.classList.remove('menu-open');
        });
      });

      var menuBtn = document.getElementById('menuBtn');
      if (menuBtn) menuBtn.addEventListener('click', function() {
        var isOpen = navLinks.classList.toggle('open');
        if (navOverlay) navOverlay.classList.toggle('open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
      });
      if (navOverlay) navOverlay.addEventListener('click', function() {
        navLinks.classList.remove('open');
        navOverlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      });

      var mobileMenuClose = document.querySelector('.mobile-menu-close');
      if (mobileMenuClose) mobileMenuClose.addEventListener('click', function() {
        navLinks.classList.remove('open');
        if (navOverlay) navOverlay.classList.remove('open');
        document.body.classList.remove('menu-open');
      });

      /* 滚动出现：Section + 子元素错峰 */
      var sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (!entry.isIntersecting) return;
          var section = entry.target;
          section.classList.add('visible');
          var items = section.querySelectorAll('.reveal-item');
          items.forEach(function(item, i) {
            item.style.transitionDelay = (i * 0.08) + 's';
            item.classList.add('reveal');
          });
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

      document.querySelectorAll('.section').forEach(function(section) {
        sectionObserver.observe(section);
      });

      /* Hero 首屏立即显示 */
      var hero = document.getElementById('hero');
      var heroObserver = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) hero.classList.add('visible');
      }, { threshold: 0.5 });
      heroObserver.observe(hero);
      if (window.scrollY < 100) hero.classList.add('visible');

      /* 滚动高亮：当前可视模块 */
      var sections = document.querySelectorAll('.section');
      var heroEl = document.getElementById('hero');
      function updateActive() {
        var navH = topNavEl ? topNavEl.offsetHeight : 60;
        var threshold = navH + 10;
        var current = null;
        if (heroEl && heroEl.getBoundingClientRect().bottom > threshold) {
          current = heroEl;
        } else {
          var bestTop = -1e9;
          sections.forEach(function(sec) {
            var top = sec.getBoundingClientRect().top;
            if (top <= threshold && top > bestTop) {
              bestTop = top;
              current = sec;
            }
          });
        }
        if (!current && sections.length) current = sections[0];
        document.querySelectorAll('.nav-links a').forEach(function(a) {
          var href = a.getAttribute('href').slice(1);
          a.classList.toggle('active', current && current.id === href);
        });
      }
      window.addEventListener('scroll', updateActive, { passive: true });
      updateActive();

      /* 工作经历：静态三块，上下渐变 */
      var projSlider = document.getElementById('projectsSlider');
      var projPrev = document.getElementById('projPrev');
      var projNext = document.getElementById('projNext');
      if (projSlider) {
        var projSlides = projSlider.querySelectorAll('.project-item');
        if (projSlides.length) {
          var sw = 0;
          function getProjSlideWidth() {
            return projSlides[0].offsetWidth + 24;
          }
          function updateProjArrows() {
            sw = getProjSlideWidth();
            var maxScroll = projSlider.scrollWidth - projSlider.clientWidth;
            var atStart = maxScroll <= 0 || projSlider.scrollLeft <= 2;
            var atEnd = maxScroll <= 0 || projSlider.scrollLeft >= maxScroll - 2;
            if (projPrev) { projPrev.disabled = atStart; projPrev.setAttribute('aria-disabled', atStart ? 'true' : 'false'); }
            if (projNext) { projNext.disabled = atEnd; projNext.setAttribute('aria-disabled', atEnd ? 'true' : 'false'); }
          }
          function goToProj(i) {
            sw = getProjSlideWidth();
            projSlider.scrollTo({ left: i * sw, behavior: 'smooth' });
          }
          projSlider.addEventListener('scroll', updateProjArrows);
          window.addEventListener('resize', updateProjArrows);
          updateProjArrows();
          setTimeout(updateProjArrows, 100);
          setTimeout(updateProjArrows, 400);
          var projSection = document.getElementById('projects');
          if (projSection) {
            var runProjArrowsWhenVisible = function() {
              var rect = projSection.getBoundingClientRect();
              if (rect.top < window.innerHeight && rect.bottom > 0) requestAnimationFrame(updateProjArrows);
            };
            window.addEventListener('scroll', runProjArrowsWhenVisible, { passive: true });
            var projSectionObs = new IntersectionObserver(function(entries) {
              if (entries[0].isIntersecting) requestAnimationFrame(updateProjArrows);
            }, { threshold: 0 });
            projSectionObs.observe(projSection);
          }
          if (typeof ResizeObserver !== 'undefined') {
            var ro = new ResizeObserver(function() { updateProjArrows(); });
            ro.observe(projSlider);
          }
          if (projPrev) projPrev.addEventListener('click', function() {
            if (projPrev.disabled) return;
            sw = getProjSlideWidth();
            var idx = Math.max(0, Math.floor(projSlider.scrollLeft / sw) - 1);
            goToProj(idx);
          });
          if (projNext) projNext.addEventListener('click', function() {
            if (projNext.disabled) return;
            sw = getProjSlideWidth();
            var idx = Math.min(projSlides.length - 1, Math.floor(projSlider.scrollLeft / sw) + 1);
            goToProj(idx);
          });
        }
      }

      /* 可拖动卡片组件 */
      (function initDraggableCards() {
        var container = document.getElementById('draggableContainer');
        if (!container) return;

        var cards = Array.from(container.querySelectorAll('.draggable-card'));
        var recoverBtn = document.getElementById('recoverBtn');
        var discardedCards = [];
        var isDragging = false;
        var currentCard = null;
        var startX, startY, currentX, currentY, initialLeft, initialTop;
        var discardThreshold = 0.5;
        var velocityHistory = [];
        var velocitySampleCount = 6;
        var inertiaDecay = 0.88;
        var minVelocityToThrow = 0.12;
        var inertiaSpeedFactor = 0.38;
        var animId = null;

        // 堆叠角度稍大一点，但不过大（避免用户歪头看）
        function getRandomRotation(index) {
          var ranges = [[-26, 22], [-24, 26], [-25, 25], [-28, 20], [-22, 28]];
          var r = ranges[index % ranges.length];
          return r[0] + Math.random() * (r[1] - r[0]);
        }

        // 初始化卡片位置和角度（使用 --card-rotation 以便 hover 时放大）
        function initCardPositions() {
          var containerRect = container.getBoundingClientRect();
          var centerX = containerRect.width * 0.38;
          var centerY = containerRect.height / 2;

          cards.forEach(function(card, index) {
            if (card.classList.contains('discarded')) return;

            card.style.width = '';
            card.style.height = '';
            var rotation = getRandomRotation(index);
            var offsetX = (Math.random() - 0.5) * 32;
            var offsetY = (Math.random() - 0.5) * 24;
            var stackOffset = index * 8;

            card.style.left = (centerX - card.offsetWidth / 2 + offsetX + stackOffset) + 'px';
            card.style.top = (centerY - card.offsetHeight / 2 + offsetY + stackOffset * 0.5) + 'px';
            card.style.removeProperty('transform');
            card.style.setProperty('--card-rotation', rotation + 'deg');
            card.dataset.rotation = rotation;
            card.dataset.originalLeft = card.style.left;
            card.dataset.originalTop = card.style.top;
          });
          updateZIndex();
        }

        // 检查卡片是否在屏幕外（完全离开任一边或超出比例即算丢弃，拖出后不再回堆）
        function isOffScreen(rect) {
          var vw = window.innerWidth;
          var vh = window.innerHeight;
          if (rect.right < 0 || rect.left > vw || rect.bottom < 0 || rect.top > vh) return true;
          var offScreenRatio = 0;
          if (rect.right < 0) offScreenRatio += Math.abs(rect.right) / rect.width;
          if (rect.left > vw) offScreenRatio += (rect.left - vw) / rect.width;
          if (rect.bottom < 0) offScreenRatio += Math.abs(rect.bottom) / rect.height;
          if (rect.top > vh) offScreenRatio += (rect.top - vh) / rect.height;
          return offScreenRatio >= discardThreshold;
        }

        // 丢弃卡片：方向由调用方传入；先去掉 dragging 并取消位移过渡，避免出现拖动影子
        function discardCard(card, exitTranslateX, exitTranslateY) {
          card.classList.remove('dragging');
          card.style.transition = 'none';
          card.style.boxShadow = 'none';
          card.classList.add('discarded');
          card.style.left = card.dataset.originalLeft || card.style.left;
          card.style.top = card.dataset.originalTop || card.style.top;

          var viewportWidth = window.innerWidth;
          var viewportHeight = window.innerHeight;
          if (exitTranslateX == null || exitTranslateY == null) {
            var r = card.getBoundingClientRect();
            var centerX = r.left + r.width / 2;
            var centerY = r.top + r.height / 2;
            if (exitTranslateX == null) exitTranslateX = centerX < viewportWidth / 2 ? -viewportWidth : viewportWidth;
            if (exitTranslateY == null) exitTranslateY = centerY < viewportHeight / 2 ? -viewportHeight * 0.3 : viewportHeight * 0.3;
          }

          card.style.transform = 'translate(' + exitTranslateX + 'px, ' + exitTranslateY + 'px) rotate(' + card.dataset.rotation + 'deg)';
          card.style.transition = 'opacity 0.25s ease';

          discardedCards.push({
            card: card,
            originalLeft: card.dataset.originalLeft,
            originalTop: card.dataset.originalTop,
            rotation: card.dataset.rotation,
            exitTranslateX: exitTranslateX,
            exitTranslateY: exitTranslateY
          });

          if (recoverBtn && discardedCards.length > 0) {
            recoverBtn.style.display = 'inline-flex';
          }

          updateZIndex();
        }

        // 更新卡片的z-index：按 data-index 固定层级，选中/未选中/拖动都不改变层级
        function updateZIndex() {
          cards.forEach(function(card) {
            if (card.classList.contains('discarded')) return;
            var idx = parseInt(card.getAttribute('data-index') || '0', 10);
            card.style.zIndex = 50 - idx * 10;
          });
        }

        // 按内容调整卡片字体：内容多则缩小、占不满则放大，保证不溢出无滚动条
        function adjustCardFontScales() {
          cards.forEach(function(card) {
            if (card.classList.contains('discarded')) return;
            card.style.setProperty('--card-font-scale', '1');
            var sh = card.scrollHeight;
            var ch = card.clientHeight;
            if (sh > ch) {
              var scale = 1;
              for (var step = 0; step < 15; step++) {
                scale -= 0.05;
                if (scale < 0.55) break;
                card.style.setProperty('--card-font-scale', String(scale));
                if (card.scrollHeight <= card.clientHeight) break;
              }
            } else if (sh < ch * 0.65) {
              card.style.setProperty('--card-font-scale', '1.15');
            }
          });
        }

        // 捡回卡片：从飞出方向飞回（从哪来回哪去）
        function recoverCards() {
          if (discardedCards.length === 0) return;
          if (recoverBtn && recoverBtn.disabled) return;

          var toRecover = discardedCards.slice();
          discardedCards = [];
          if (recoverBtn) {
            recoverBtn.style.display = 'none';
            recoverBtn.disabled = true;
            setTimeout(function() { recoverBtn.disabled = false; }, 800);
          }

          toRecover.forEach(function(item, index) {
            setTimeout(function() {
              var card = item.card;
              card.classList.remove('discarded');
              card.classList.add('recovering');
              card.style.left = item.originalLeft;
              card.style.top = item.originalTop;
              card.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)';
              card.style.transform = 'translate(' + (item.exitTranslateX || 0) + 'px, ' + (item.exitTranslateY || 0) + 'px) rotate(' + item.rotation + 'deg)';
              card.offsetHeight;
              card.style.transform = 'translate(0, 0) rotate(' + item.rotation + 'deg)';

              setTimeout(function() {
                card.classList.remove('recovering');
                card.style.transition = '';
                card.style.setProperty('--card-rotation', item.rotation + 'deg');
                card.style.boxShadow = '';
              }, 600);
            }, index * 120);
          });

          var count = toRecover.length;
          setTimeout(function() {
            cards.forEach(function(card) { card.style.zIndex = ''; });
            updateZIndex();
          }, count * 120 + 650);
        }

        // 鼠标/触摸按下
        function onStart(e) {
          var card = e.target.closest('.draggable-card');
          if (!card || card.classList.contains('discarded')) return;

          var w = card.offsetWidth;
          var h = card.offsetHeight;

          isDragging = true;
          currentCard = card;
          currentCard.classList.add('dragging');
          velocityHistory = [];

          currentCard.style.width = w + 'px';
          currentCard.style.height = h + 'px';
          currentCard.style.minWidth = w + 'px';
          currentCard.style.maxWidth = w + 'px';
          currentCard.style.minHeight = h + 'px';
          currentCard.style.maxHeight = h + 'px';

          if (e.type.includes('touch')) {
            document.body.style.overflow = 'hidden';
            document.body.style.touchAction = 'none';
          }

          var clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
          var clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

          startX = clientX;
          startY = clientY;

          var rect = card.getBoundingClientRect();
          var containerRect = container.getBoundingClientRect();
          initialLeft = rect.left - containerRect.left;
          initialTop = rect.top - containerRect.top;

          e.preventDefault();
        }

        // 鼠标/触摸移动（记录速度用于惯性）
        function onMove(e) {
          if (!isDragging || !currentCard) return;

          var clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
          var clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

          velocityHistory.push({ x: clientX, y: clientY, t: Date.now() });
          if (velocityHistory.length > velocitySampleCount) velocityHistory.shift();

          currentX = clientX - startX;
          currentY = clientY - startY;

          var newLeft = initialLeft + currentX;
          var newTop = initialTop + currentY;

          currentCard.style.left = newLeft + 'px';
          currentCard.style.top = newTop + 'px';
          currentCard.style.transform = 'rotate(' + currentCard.dataset.rotation + 'deg) scale(1.02)';

          e.preventDefault();
        }

        function doCleanup() {
          if (currentCard) {
            currentCard.classList.remove('dragging');
            var w = currentCard.offsetWidth;
            var h = currentCard.offsetHeight;
            currentCard.style.width = w + 'px';
            currentCard.style.height = h + 'px';
            currentCard.style.minWidth = '';
            currentCard.style.maxWidth = '';
            currentCard.style.minHeight = '';
            currentCard.style.maxHeight = '';
          }
          document.body.style.overflow = '';
          document.body.style.touchAction = '';
          velocityHistory = [];
          isDragging = false;
          currentCard = null;
        }

        // 鼠标/触摸释放：未丢弃时带小幅惯性，丢弃时按位置决定飞出方向
        function onEnd(e) {
          if (!isDragging || !currentCard) return;

          var rect = currentCard.getBoundingClientRect();

          if (isOffScreen(rect)) {
            var vw = window.innerWidth;
            var vh = window.innerHeight;
            var cx = rect.left + rect.width / 2;
            var cy = rect.top + rect.height / 2;
            var exitX = cx < vw / 2 ? -vw : vw;
            var exitY = cy < vh / 2 ? -vh * 0.3 : vh * 0.3;
            discardCard(currentCard, exitX, exitY);
            doCleanup();
            return;
          }

          var vx = 0, vy = 0;
          if (velocityHistory.length >= 2) {
            var first = velocityHistory[0];
            var last = velocityHistory[velocityHistory.length - 1];
            var dt = last.t - first.t;
            if (dt > 0) {
              vx = (last.x - first.x) / dt;
              vy = (last.y - first.y) / dt;
            }
          }
          var speed = Math.sqrt(vx * vx + vy * vy);

          if (speed >= minVelocityToThrow) {
            vx *= inertiaSpeedFactor;
            vy *= inertiaSpeedFactor;
            var lastLeft = initialLeft + currentX;
            var lastTop = initialTop + currentY;
            var card = currentCard;

            function inertiaFrame() {
              lastLeft += vx * 16;
              lastTop += vy * 16;
              vx *= inertiaDecay;
              vy *= inertiaDecay;
              card.style.left = lastLeft + 'px';
              card.style.top = lastTop + 'px';

              var r = card.getBoundingClientRect();
              if (isOffScreen(r)) {
                if (animId) cancelAnimationFrame(animId);
                animId = null;
                var vw = window.innerWidth;
                var vh = window.innerHeight;
                var cx = r.left + r.width / 2;
                var cy = r.top + r.height / 2;
                discardCard(card, cx < vw / 2 ? -vw : vw, cy < vh / 2 ? -vh * 0.3 : vh * 0.3);
                doCleanup();
                return;
              }
              var curSpeed = Math.sqrt(vx * vx + vy * vy);
              if (curSpeed < 0.06) {
                if (animId) cancelAnimationFrame(animId);
                animId = null;
                card.style.removeProperty('transform');
                card.style.setProperty('--card-rotation', card.dataset.rotation + 'deg');
                updateZIndex();
                doCleanup();
                return;
              }
              animId = requestAnimationFrame(inertiaFrame);
            }
            animId = requestAnimationFrame(inertiaFrame);
            return;
          }

          currentCard.style.removeProperty('transform');
          currentCard.style.setProperty('--card-rotation', currentCard.dataset.rotation + 'deg');
          updateZIndex();
          doCleanup();
        }

        // 绑定事件
        container.addEventListener('mousedown', onStart);
        container.addEventListener('touchstart', onStart, { passive: false });

        window.addEventListener('mousemove', onMove);
        window.addEventListener('touchmove', onMove, { passive: false });

        window.addEventListener('mouseup', onEnd);
        window.addEventListener('touchend', onEnd);

        // 捡回按钮事件
        if (recoverBtn) {
          recoverBtn.addEventListener('click', recoverCards);
        }

        // 窗口大小改变时重新初始化
        var resizeTimer;
        window.addEventListener('resize', function() {
          clearTimeout(resizeTimer);
          resizeTimer = setTimeout(function() {
            if (discardedCards.length === 0) {
              initCardPositions();
              adjustCardFontScales();
            }
          }, 250);
        });

        // 初始化
        setTimeout(function() {
          initCardPositions();
          adjustCardFontScales();
        }, 100);
      })();

      /* 自我评价：眩光卡片效果 */
      (function initGlareCard() {
        var container = document.getElementById('cardContainer');
        var card = document.getElementById('card3d');
        var innerGlow = document.getElementById('innerGlow');
        if (!container || !card || !innerGlow) return;

        var isInside = false;

        function updateGlowPosition(e) {
          var rect = container.getBoundingClientRect();

          // 如果鼠标不在容器内，直接重置并返回
          if (e.clientX < rect.left || e.clientX > rect.right ||
              e.clientY < rect.top  || e.clientY > rect.bottom) {
            if (isInside) {
              isInside = false;
              card.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
              innerGlow.style.setProperty('--mouse-x', '50%');
              innerGlow.style.setProperty('--mouse-y', '50%');
            }
            return;
          }

          isInside = true;

          var x = e.clientX - rect.left;
          var y = e.clientY - rect.top;

          var centerX = rect.width / 2;
          var centerY = rect.height / 2;

          var rotateX = ((y - centerY) / centerY) * -8;
          var rotateY = ((x - centerX) / centerX) * 8;

          card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
          innerGlow.style.setProperty('--mouse-x', `${x}px`);
          innerGlow.style.setProperty('--mouse-y', `${y}px`);
        }

        // 监听 window 而非 container，彻底避免快速移出时 mouseleave 丢帧的问题
        window.addEventListener('mousemove', updateGlowPosition);

        container.addEventListener('mouseleave', function() {
          isInside = false;
          card.style.transform = 'rotateX(0) rotateY(0) scale3d(1, 1, 1)';
          innerGlow.style.setProperty('--mouse-x', '50%');
          innerGlow.style.setProperty('--mouse-y', '50%');
        });

        container.addEventListener('mouseenter', function() {
          isInside = true;
          card.style.transition = 'transform 0.1s ease-out';
        });

        if (window.DeviceOrientationEvent) {
          window.addEventListener('deviceorientation', function(e) {
            if (window.innerWidth < 768) {
              var rotateX = (e.beta - 45) * 0.2;
              var rotateY = e.gamma * 0.2;
              card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            }
          });
        }
      })();

      /* 教育经历：可展开卡片 */
      (function initEduCards() {
        var expandedCard = null;
        var originalRect = null;
        var placeholder = null;

        function expandEduCard(card) {
          if (expandedCard) return;

          var rect = card.getBoundingClientRect();
          originalRect = rect;

          // 占位符防止布局塌陷
          placeholder = document.createElement('div');
          placeholder.style.width = rect.width + 'px';
          placeholder.style.height = rect.height + 'px';
          placeholder.style.visibility = 'hidden';
          card.parentNode.insertBefore(placeholder, card);

          // 固定定位，保持当前位置
          card.style.position = 'fixed';
          card.style.top = rect.top + 'px';
          card.style.left = rect.left + 'px';
          card.style.width = rect.width + 'px';
          card.style.margin = '0';
          card.classList.add('is-expanding');

          // 强制重绘
          card.offsetHeight;

          // 显示遮罩
          document.getElementById('eduBackdrop').classList.add('is-active');
          document.body.classList.add('no-scroll');

          // 目标尺寸（屏幕中央）
          var targetWidth = Math.min(window.innerWidth * 0.9, 460);
          var targetTop = 80;
          var targetLeft = (window.innerWidth - targetWidth) / 2;

          requestAnimationFrame(function() {
            card.style.top = targetTop + 'px';
            card.style.left = targetLeft + 'px';
            card.style.width = targetWidth + 'px';
            card.classList.add('is-expanded');

            var expandedContent = card.querySelector('.edu-expanded-content');
            if (expandedContent) {
              expandedContent.classList.remove('hidden');
            }
          });

          expandedCard = card;
        }

        function closeEduCard() {
          if (!expandedCard || !originalRect) return;

          var card = expandedCard;

          var expandedContent = card.querySelector('.edu-expanded-content');
          if (expandedContent) {
            expandedContent.classList.add('hidden');
          }

          card.classList.remove('is-expanded');

          card.style.top = originalRect.top + 'px';
          card.style.left = originalRect.left + 'px';
          card.style.width = originalRect.width + 'px';

          document.getElementById('eduBackdrop').classList.remove('is-active');
          document.body.classList.remove('no-scroll');

          setTimeout(function() {
            card.style.position = '';
            card.style.top = '';
            card.style.left = '';
            card.style.width = '';
            card.style.margin = '';
            card.classList.remove('is-expanding');

            if (placeholder && placeholder.parentNode) {
              placeholder.parentNode.removeChild(placeholder);
            }

            expandedCard = null;
            originalRect = null;
            placeholder = null;
          }, 420);
        }

        // ESC 键关闭
        document.addEventListener('keydown', function(e) {
          if (e.key === 'Escape' && expandedCard) {
            closeEduCard();
          }
        });

        // 窗口大小改变时关闭
        window.addEventListener('resize', function() {
          if (expandedCard) {
            closeEduCard();
          }
        });

        // 暴露到全局
        window.expandEduCard = expandEduCard;
        window.closeEduCard = closeEduCard;
      })();
    })();