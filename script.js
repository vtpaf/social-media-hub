// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// 应用初始化
function initializeApp() {
    loadSettings();
    bindEvents();
    createOverlay();
}

// 绑定事件监听器
function bindEvents() {
    const editToggle = document.getElementById('editToggle');
    const editPanel = document.getElementById('editPanel');
    const saveButton = document.getElementById('saveSettings');
    const resetButton = document.getElementById('resetSettings');
    const mainButton = document.getElementById('mainButton');

    // 编辑面板切换
    editToggle.addEventListener('click', function() {
        toggleEditPanel();
    });

    // 点击遮罩层关闭编辑面板
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('overlay')) {
            closeEditPanel();
        }
    });

    // ESC键关闭编辑面板
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeEditPanel();
        }
    });

    // 保存设置
    saveButton.addEventListener('click', function() {
        saveSettings();
        showNotification('设置已保存！', 'success');
        closeEditPanel();
    });

    // 重置设置
    resetButton.addEventListener('click', function() {
        if (confirm('确定要重置所有设置吗？')) {
            resetSettings();
            showNotification('设置已重置！', 'info');
        }
    });

    // 主按钮点击事件
    mainButton.addEventListener('click', function() {
        const targetUrl = localStorage.getItem('targetUrl');
        if (targetUrl && targetUrl.trim() !== '') {
            // 在新标签页打开链接
            window.open(targetUrl, '_blank');
        } else {
            showNotification('请先设置跳转网址！', 'warning');
            toggleEditPanel();
        }
    });

    // 社交媒体卡片点击事件
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.dataset.platform;
            const url = localStorage.getItem(`${platform}Url`);
            
            if (url && url.trim() !== '') {
                window.open(url, '_blank');
            } else {
                showNotification(`请先设置${this.querySelector('span').textContent}链接！`, 'warning');
                toggleEditPanel();
            }
        });
    });
}

// 创建遮罩层
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
}

// 切换编辑面板
function toggleEditPanel() {
    const editPanel = document.getElementById('editPanel');
    const overlay = document.querySelector('.overlay');
    
    if (editPanel.classList.contains('active')) {
        closeEditPanel();
    } else {
        openEditPanel();
    }
}

// 打开编辑面板
function openEditPanel() {
    const editPanel = document.getElementById('editPanel');
    const overlay = document.querySelector('.overlay');
    
    editPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 加载当前设置到表单
    loadSettingsToForm();
}

// 关闭编辑面板
function closeEditPanel() {
    const editPanel = document.getElementById('editPanel');
    const overlay = document.querySelector('.overlay');
    
    editPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

// 加载设置到表单
function loadSettingsToForm() {
    document.getElementById('buttonText').value = localStorage.getItem('buttonText') || '访问主网站';
    document.getElementById('targetUrl').value = localStorage.getItem('targetUrl') || '';
    document.getElementById('buttonDescription').value = localStorage.getItem('buttonDescription') || '点击访问我们的主要网站';
    
    // 加载社交媒体链接
    const platforms = ['facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'linkedin'];
    platforms.forEach(platform => {
        const input = document.getElementById(`${platform}Url`);
        if (input) {
            input.value = localStorage.getItem(`${platform}Url`) || '';
        }
    });
}

// 保存设置
function saveSettings() {
    // 保存按钮设置
    const buttonText = document.getElementById('buttonText').value;
    const targetUrl = document.getElementById('targetUrl').value;
    const buttonDescription = document.getElementById('buttonDescription').value;
    
    localStorage.setItem('buttonText', buttonText);
    localStorage.setItem('targetUrl', targetUrl);
    localStorage.setItem('buttonDescription', buttonDescription);
    
    // 保存社交媒体链接
    const platforms = ['facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'linkedin'];
    platforms.forEach(platform => {
        const input = document.getElementById(`${platform}Url`);
        if (input) {
            localStorage.setItem(`${platform}Url`, input.value);
        }
    });
    
    // 应用设置到页面
    applySettings();
}

// 应用设置到页面
function applySettings() {
    // 更新主按钮
    const buttonText = localStorage.getItem('buttonText') || '访问主网站';
    const buttonDescription = localStorage.getItem('buttonDescription') || '点击访问我们的主要网站';
    
    document.querySelector('.button-text').textContent = buttonText;
    document.querySelector('.cta-description').textContent = buttonDescription;
    
    // 更新社交媒体卡片状态
    const platforms = ['facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'linkedin'];
    platforms.forEach(platform => {
        const card = document.querySelector(`[data-platform="${platform}"]`);
        const url = localStorage.getItem(`${platform}Url`);
        
        if (card) {
            if (url && url.trim() !== '') {
                card.style.opacity = '1';
                card.style.cursor = 'pointer';
                card.title = `访问我的${card.querySelector('span').textContent}`;
            } else {
                card.style.opacity = '0.6';
                card.style.cursor = 'default';
                card.title = '尚未设置链接';
            }
        }
    });
}

// 加载设置
function loadSettings() {
    applySettings();
}

// 重置设置
function resetSettings() {
    // 清除所有本地存储
    const platforms = ['facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'linkedin'];
    
    localStorage.removeItem('buttonText');
    localStorage.removeItem('targetUrl');
    localStorage.removeItem('buttonDescription');
    
    platforms.forEach(platform => {
        localStorage.removeItem(`${platform}Url`);
    });
    
    // 重新加载设置到表单和页面
    loadSettingsToForm();
    applySettings();
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 获取通知图标
function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

// 获取通知颜色
function getNotificationColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
        error: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
        warning: 'linear-gradient(135deg, #feca57, #ff9ff3)',
        info: 'linear-gradient(135deg, #667eea, #764ba2)'
    };
    return colors[type] || colors.info;
}

// 添加页面加载动画
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// 添加平滑滚动
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

// 添加键盘快捷键
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + E 打开编辑面板
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        toggleEditPanel();
    }
    
    // Ctrl/Cmd + S 保存设置（在编辑面板打开时）
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        const editPanel = document.getElementById('editPanel');
        if (editPanel.classList.contains('active')) {
            e.preventDefault();
            saveSettings();
            showNotification('设置已保存！', 'success');
            closeEditPanel();
        }
    }
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 为触摸设备优化悬停效果
    const socialCards = document.querySelectorAll('.social-card');
    socialCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 150);
        });
    });
}

// 添加网络状态检测
window.addEventListener('online', function() {
    showNotification('网络连接已恢复', 'success');
});

window.addEventListener('offline', function() {
    showNotification('网络连接已断开', 'warning');
});

// 性能优化：图片懒加载（如果有图片的话）
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// 初始化懒加载
if ('IntersectionObserver' in window) {
    lazyLoadImages();
}

