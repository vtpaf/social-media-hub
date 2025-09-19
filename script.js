// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 定义社交媒体链接和主按钮链接
    const socialLinks = {
        facebook: "https://fbins607.com", // 替换为您的Facebook链接
        instagram: "https://fbins607.com", // 替换为您的Instagram链接
        twitter: "https://fbins607.com", // 替换为您的Twitter链接
        youtube: "https://fbins607.com", // 替换为您的YouTube链接
        tiktok: "https://fbins607.com", // 替换为您的TikTok链接
        linkedin: "https://fbins607.com" // 替换为您的LinkedIn链接
    };

    const mainButtonConfig = {
        text: "访问主网站", // 替换为您的主按钮文字
        url: "https://fbins607.com", // 替换为您的主网站链接
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



// 公告功能
let announcementShown = false;

// 后端API基础URL
const API_BASE_URL = 'https://y0h0i3c8jyeo.manus.space';

// 加载并显示公告
async function loadAnnouncements() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/public/announcements/active`);
        const announcements = await response.json();
        
        if (announcements.length > 0 && !announcementShown) {
            // 显示第一个活跃的公告
            const announcement = announcements[0];
            showAnnouncement(announcement.title, announcement.content);
            announcementShown = true;
        }
    } catch (error) {
        console.error('加载公告失败:', error);
    }
}

// 显示公告模态框
function showAnnouncement(title, content) {
    const modal = document.getElementById('announcementModal');
    const titleElement = document.getElementById('announcementTitle');
    const bodyElement = document.getElementById('announcementBody');
    
    titleElement.textContent = title;
    bodyElement.innerHTML = content.replace(/\n/g, '<br>');
    modal.style.display = 'block';
}

// 关闭公告模态框
function closeAnnouncement() {
    const modal = document.getElementById('announcementModal');
    modal.style.display = 'none';
}

// 点击模态框外部关闭公告
window.addEventListener('click', function(event) {
    const modal = document.getElementById('announcementModal');
    if (event.target === modal) {
        closeAnnouncement();
    }
});

// ESC键关闭公告
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeAnnouncement();
    }
});

// 页面加载完成后延迟显示公告
document.addEventListener('DOMContentLoaded', function() {
    // 延迟2秒后显示公告，让用户先看到主页面
    setTimeout(() => {
        loadAnnouncements();
    }, 2000);
});

