# 社交媒体中心 - Social Media Hub

一个现代化的响应式社交媒体展示页面，支持PC、平板和移动端的完美显示。

## 功能特点

### 🎨 现代化设计
- 渐变背景和毛玻璃效果
- 流畅的动画和过渡效果
- 精美的社交媒体卡片设计
- 专业的视觉层次和配色方案

### 📱 完全响应式
- **PC端 (1200px+)**: 三栏布局，左右广告位，中间主内容
- **平板横屏 (768px-991px)**: 垂直布局，广告位水平排列
- **平板竖屏 (576px-767px)**: 优化的垂直布局
- **手机端 (≤575px)**: 紧凑的移动端布局
- **横屏手机**: 特殊的横屏优化布局

### 🚀 交互体验
- 悬停效果和点击反馈
- 触摸设备优化

## 支持的社交平台

- Facebook
- Instagram  
- Twitter
- YouTube
- TikTok
- LinkedIn

## 广告位设置

- **PC端**: 左右两侧各300x600px广告位
- **平板端**: 顶部和底部水平广告位
- **移动端**: 垂直堆叠的广告位

## 使用方法

所有链接和按钮文字都直接在 `script.js` 文件中进行配置。

1.  **编辑 `script.js` 文件：**
    *   打开 `script.js` 文件。
    *   找到 `socialLinks` 对象，修改各个社交平台的链接地址。
    *   找到 `mainButtonConfig` 对象，修改 `text` (按钮文字)、`url` (跳转链接) 和 `description` (按钮描述)。
2.  **保存并推送更改：**
    *   保存 `script.js` 文件。
    *   将更改推送到您的GitHub仓库，Cloudflare Pages将自动重新部署您的网站。

## 技术特性

- 纯HTML/CSS/JavaScript实现
- 无外部依赖（除Font Awesome图标）
- 本地存储数据持久化
- CSS Grid和Flexbox布局
- 现代浏览器兼容
- 触摸设备友好

## 部署说明

### 静态部署
直接将所有文件上传到任何静态网站托管服务：
- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages

### 本地测试
在项目目录下启动任何HTTP服务器：
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

## 文件结构

```
social-media-hub/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互脚本
└── README.md           # 说明文档
```

## 浏览器支持

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- 移动端浏览器

## 自定义说明

### 修改颜色主题
在 `styles.css` 中修改CSS变量或渐变色值

### 添加新的社交平台
1. 在HTML中添加新的社交卡片
2. 在CSS中添加对应的颜色样式
3. 在JavaScript中添加对应的处理逻辑

### 修改广告位尺寸
在CSS的响应式媒体查询中调整 `.ad-placeholder` 的尺寸

## 许可证

MIT License - 可自由使用和修改

