# 课题组管理网站

基于 Hugo Wowchemy 学术模板 + Supabase 后端 + GitHub Pages 托管的课题组管理系统。

## 功能特性

- 📚 **论文/成果管理** - 管理课题组发表的学术论文和研究成果
- 📁 **文件共享/文档库** - 上传、管理和共享课题组内部文档
- 📋 **项目/课题列表管理** - 管理研究项目和课题信息
- 👥 **团队成员管理** - 展示课题组成员信息
- 🔐 **用户认证** - 基于 Supabase Auth 的安全认证
- 📱 **响应式设计** - 适配桌面和移动设备

## 技术栈

- **前端**: Hugo + Wowchemy (Hugo Blox) 学术模板
- **后端**: Supabase (PostgreSQL + 实时数据库 + 认证 + 存储)
- **托管**: GitHub Pages (免费)
- **部署**: GitHub Actions 自动化部署

## 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/your-username/research-group-site.git
cd research-group-site
```

### 2. 配置 Supabase

1. 访问 [Supabase](https://supabase.com/) 并创建免费账户
2. 创建新项目
3. 在 SQL Editor 中执行 `supabase/schema.sql` 创建数据库表
4. 获取项目 URL 和 anon key

### 3. 配置环境变量

在 GitHub 仓库的 Settings > Secrets and variables > Actions 中添加：

- `SUPABASE_URL`: 你的 Supabase 项目 URL
- `SUPABASE_ANON_KEY`: 你的 Supabase anon key

### 4. 部署到 GitHub Pages

1. 在 GitHub 仓库的 Settings > Pages 中：
   - Source: 选择 "GitHub Actions"
2. 推送代码到 main 分支，GitHub Actions 会自动部署

### 5. 访问管理后台

部署完成后，访问 `https://your-username.github.io/research-group-site/admin/` 进入管理后台。

## 本地开发

### 安装 Hugo

```bash
# Windows (使用 Chocolatey)
choco install hugo-extended

# macOS (使用 Homebrew)
brew install hugo

# Linux (使用 Snap)
sudo snap install hugo
```

### 本地运行

```bash
# 克隆子模块
git submodule update --init --recursive

# 本地运行
hugo server -D
```

访问 `http://localhost:1313/` 查看效果。

## 项目结构

```
research-group-site/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions 部署配置
├── config/
│   └── _default/
│       ├── config.yaml         # Hugo 主配置
│       ├── languages.yaml      # 语言配置
│       ├── menus.yaml          # 菜单配置
│       └── params.yaml         # 站点参数（含 Supabase 配置）
├── content/
│   ├── admin/
│   │   └── _index.md           # 管理后台页面
│   ├── home/                   # 首页内容
│   ├── publications/           # 论文内容
│   ├── authors/                # 成员内容
│   └── project/                # 项目内容
├── layouts/
│   ├── admin/
│   │   └── baseof.html         # 管理后台布局
│   └── partials/
│       └── supabase.html       # Supabase 初始化
├── static/
│   ├── js/
│   │   └── supabase-client.js  # Supabase 客户端和数据服务
│   └── css/
│       └── custom.css          # 自定义样式
├── supabase/
│   └── schema.sql              # 数据库表结构
└── README.md
```

## 数据库表结构

### projects (项目表)
- id: UUID 主键
- title: 项目名称
- slug: URL 标识
- description: 项目描述
- status: 状态 (active/completed/paused)
- start_date: 开始日期
- end_date: 结束日期
- funding_source: 资助来源
- funding_amount: 资助金额
- principal_investigator: 负责人

### publications (论文表)
- id: UUID 主键
- title: 论文标题
- slug: URL 标识
- authors: 作者数组
- abstract: 摘要
- journal: 期刊名称
- year: 发表年份
- doi: DOI 编号
- url: 论文链接
- publication_type: 类型 (article/conference/book/thesis/report/other)
- project_id: 关联项目

### documents (文档表)
- id: UUID 主键
- title: 文档标题
- description: 文档描述
- file_path: 文件路径
- file_size: 文件大小
- file_type: 文件类型
- category: 分类 (general/paper/data/code/presentation/report/other)
- project_id: 关联项目

### members (成员表)
- id: UUID 主键 (关联 auth.users)
- full_name: 姓名
- email: 邮箱
- role: 角色 (admin/pi/postdoc/phd/master/undergraduate/visitor/member)
- title: 职称
- bio: 简介
- avatar_url: 头像 URL
- research_interests: 研究兴趣数组

## 使用说明

### 管理后台

1. 访问 `/admin/` 页面
2. 使用 Supabase 账户登录
3. 在管理后台中管理项目、论文和文档

### 文件上传

- 支持上传各种类型的文件
- 文件存储在 Supabase Storage 中
- 支持文件分类和关联项目

### 数据安全

- 所有数据通过 Supabase RLS (行级安全策略) 保护
- 公开数据可匿名访问
- 写操作需要用户认证

## 免费版限制

Supabase 免费版限制：
- 数据库: 500 MB
- 带宽: 5 GB/月
- 月活用户: 50,000
- 文件存储: 1 GB
- 7 天无活动后自动暂停

对于课题组管理来说，这些限制完全够用。

## 自定义

### 修改站点信息

编辑 `config/_default/params.yaml` 修改站点标题、描述等信息。

### 修改样式

编辑 `static/css/custom.css` 添加自定义样式。

### 修改菜单

编辑 `config/_default/menus.yaml` 修改导航菜单。

## 常见问题

### Q: 如何添加新成员？

A: 在 Supabase 认证中创建用户，然后在 members 表中添加成员信息。

### Q: 如何上传文件？

A: 访问管理后台，在文档管理中上传文件。文件会自动存储到 Supabase Storage。

### Q: 如何关联项目和论文？

A: 在创建或编辑论文时，选择关联的项目。

### Q: 网站暂停了怎么办？

A: Supabase 免费版会在 7 天无活动后暂停。只需登录 Supabase 控制台点击"Restore"即可恢复。

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
