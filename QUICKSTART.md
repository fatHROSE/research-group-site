# 快速开始指南

## 第一步：配置 Supabase (5分钟)

### 1. 创建 Supabase 项目
1. 访问 [supabase.com](https://supabase.com/)
2. 点击 "Start your project" 并使用 GitHub 账户登录
3. 点击 "New Project"
4. 填写项目信息：
   - Name: `research-group` (或任意名称)
   - Database Password: 设置一个强密码
   - Region: 选择 `Northeast Asia (Tokyo)` 或 `Southeast Asia (Singapore)`
5. 点击 "Create new project" 并等待 2 分钟

### 2. 创建数据库表
1. 在 Supabase 控制台，点击左侧菜单的 "SQL Editor"
2. 点击 "New query"
3. 复制 `supabase/schema.sql` 的内容并粘贴
4. 点击 "Run" 执行

### 3. 获取 API 密钥
1. 点击左侧菜单的 "Project Settings" (齿轮图标)
2. 点击 "API"
3. 复制以下两个值：
   - **Project URL**: `https://your-project-id.supabase.co`
   - **anon public**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 4. 配置 GitHub Secrets
1. 访问你的 GitHub 仓库
2. 点击 "Settings" > "Secrets and variables" > "Actions"
3. 点击 "New repository secret"
4. 添加两个 Secret：
   - Name: `SUPABASE_URL`, Value: 你的 Project URL
   - Name: `SUPABASE_ANON_KEY`, Value: 你的 anon key

## 第二步：部署到 GitHub Pages (2分钟)

### 1. 推送代码
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. 启用 GitHub Pages
1. 访问你的 GitHub 仓库
2. 点击 "Settings" > "Pages"
3. 在 "Source" 下选择 "GitHub Actions"
4. 等待部署完成（约 2 分钟）

### 3. 访问网站
- 主站: `https://yourusername.github.io/research-group-site/`
- 管理后台: `https://yourusername.github.io/research-group-site/admin/`

## 第三步：创建管理员账户 (1分钟)

### 1. 在 Supabase 创建用户
1. 在 Supabase 控制台，点击左侧菜单的 "Authentication"
2. 点击 "Users" > "Add user"
3. 输入邮箱和密码
4. 点击 "Create user"

### 2. 登录管理后台
1. 访问 `https://yourusername.github.io/research-group-site/admin/`
2. 使用刚创建的邮箱和密码登录
3. 开始管理你的课题组网站！

## 常见问题

### Q: 网站打不开？
A: 检查 GitHub Actions 是否成功部署。在仓库的 "Actions" 标签查看部署状态。

### Q: 登录失败？
A: 确认 Supabase 中的用户已创建，且 API 配置正确。

### Q: 如何修改网站标题？
A: 编辑 `config/_default/params.yaml` 中的 `hero.title` 字段。

### Q: Supabase 显示暂停？
A: 免费版会在 7 天无活动后暂停。在 Supabase 控制台点击 "Restore" 即可恢复。

## 下一步

- 📝 添加更多内容：编辑 `content/` 目录下的文件
- 🎨 自定义样式：编辑 `static/css/custom.css`
- 👥 添加成员：在管理后台创建新成员
- 📚 了解更多：查看 [Wowchemy 文档](https://wowchemy.com/docs/)
