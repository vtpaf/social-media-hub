// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 定义社交媒体链接和主按钮链接
    const socialLinks = {
        facebook: "https://www.facebook.com/yourpage", // 替换为您的Facebook链接
        instagram: "https://www.instagram.com/youraccount", // 替换为您的Instagram链接
        twitter: "https://twitter.com/youraccount", // 替换为您的Twitter链接
        youtube: "https://www.youtube.com/yourchannel", // 替换为您的YouTube链接
        tiktok: "https://www.tiktok.com/@youraccount", // 替换为您的TikTok链接
        linkedin: "https://www.linkedin.com/in/yourprofile" // 替换为您的LinkedIn链接
    };

    const mainButtonConfig = {
        text: "访问主网站", // 替换为您的主按钮文字
        url: "https://www.example.com", // 替换为您的主网站链接
        description: "点击访问我们的主要网站" // 替换为您的主按钮描述
    };

    // 应用主按钮配置
    const mainButton = document.getElementById('mainButton');
    const buttonTextSpan = mainButton.querySelector('.button-text');
    const ctaDescription = document.querySelector('.cta-description');

    if (buttonTextSpan) {
        buttonTextSpan.textContent = mainButtonConfig.text;
    }
    if (ctaDescription) {
        ctaDescription.textContent = mainButtonConfig.description;
    }
    mainButton.addEventListener('click', function() {
        if (mainButtonConfig.url && mainButtonConfig.url.trim() !== '') {
            window.open(mainButtonConfig.url, '_blank');
        } else {
            alert('主网站链接未设置！');
        }
    });

    // 应用社交媒体链接
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        const platform = card.dataset.platform;
        const url = socialLinks[platform];

        if (url && url.trim() !== '') {
            card.href = url;
            card.style.opacity = '1';
            card.style.cursor = 'pointer';
            card.title = `访问我的${card.querySelector('span').textContent}`;
        } else {
            card.href = '#'; // 链接为空时，点击不跳转
            card.style.opacity = '0.6';
            card.style.cursor = 'default';
            card.title = '尚未设置链接';
            card.addEventListener('click', (e) => e.preventDefault()); // 阻止默认跳转
        }
    });

    // 添加页面加载动画
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });

    // 添加平滑滚动（如果页面有锚点链接）
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


