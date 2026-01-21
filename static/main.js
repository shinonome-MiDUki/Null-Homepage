/**
 * My Studio - Main Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Lucideアイコンの初期化
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. スムーススクロール
    // ページ内リンク（#）をクリックした際の挙動
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // # のみのリンクや存在しないIDの場合は無視
            if (href === '#' || href === '') return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                const navHeight = 80; // ナビゲーションの高さ分ずらす
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. フォームの送信制御
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // 送信ボタンを無効化して、二重送信を防ぐ
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'SENDING...';
                submitBtn.style.opacity = '0.5';
                submitBtn.style.cursor = 'not-allowed';
            }
        });
    }

    // 4. ナビゲーションの背景色制御（スクロール時に少し濃くする）
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('shadow-md');
        } else {
            nav.classList.remove('shadow-md');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // --- 既存のスムーススクロールなどのコード ---

    // 1. プロジェクトの追加読み込み
    const loadProjectBtn = document.getElementById('load-more-projects');
    const projectContainer = document.getElementById('project-container');

    if (loadProjectBtn) {
        loadProjectBtn.addEventListener('click', async () => {
            loadProjectBtn.innerText = 'LOADING...';
            try {
                const response = await fetch('/api/more_projects');
                const projects = await response.json();

                projects.forEach(project => {
                    const html = `
                        <div class="group cursor-pointer opacity-0 translate-y-4 transition-all duration-700">
                            <div class="img-card aspect-[4/3] flex items-center justify-center mb-6 bg-[#EBEBE6] rounded-[24px]">
                                <img src="/static/${project.image}" 
                                    alt="${project.title}" 
                                    class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                            </div>
                            <div class="px-2">
                                <h3 class="text-lg font-bold font-serif">${project.title}</h3>
                                <p class="text-gray-400 text-xs mt-2">${project.description}</p>
                            </div>
                        </div>`;
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const newElement = tempDiv.firstElementChild;
                    projectContainer.appendChild(newElement);
                    
                    // スッと表示させるためのアニメーション用
                    setTimeout(() => {
                        newElement.classList.remove('opacity-0', 'translate-y-4');
                    }, 50);
                });
                
                loadProjectBtn.style.display = 'none'; // これ以上ない場合は消す
            } catch (err) {
                console.error('Failed to load projects', err);
            }
        });
    }

    // 2. ニュースの追加読み込み
    const loadNewsBtn = document.getElementById('load-more-news');
    const newsContainer = document.getElementById('news-container');

    if (loadNewsBtn) {
        loadNewsBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('/api/more_news');
                const newsList = await response.json();

                newsList.forEach(news => {
                    const html = `
                        <article class="group flex flex-col md:flex-row md:items-center p-6 bg-white/50 rounded-2xl hover:bg-white transition-all cursor-pointer shadow-sm opacity-0 -translate-x-2 transition-all duration-500">
                            <time class="text-[10px] text-gray-400 md:w-32 mb-2 md:mb-0 font-bold uppercase tracking-widest">${news.date}</time>
                            <div class="flex-1">
                                <h3 class="text-sm font-bold text-neutral-700">${news.title}</h3>
                            </div>
                            <div class="mt-2 md:mt-0">
                                <span class="text-[8px] bg-[#E8A798]/20 text-[#E8A798] px-3 py-1 rounded-full uppercase font-bold tracking-widest">${news.tag}</span>
                            </div>
                        </article>`;
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = html;
                    const newElement = tempDiv.firstElementChild;
                    newsContainer.appendChild(newElement);

                    setTimeout(() => {
                        newElement.classList.remove('opacity-0', '-translate-x-2');
                    }, 50);
                });
                loadNewsBtn.style.display = 'none';
            } catch (err) {
                console.error('Failed to load news', err);
            }
        });
    }
});

///Users/shiinaayame/Documents/QU_NULL/WebPage ; conda activate null-homepage
// http://127.0.0.1:5000/
