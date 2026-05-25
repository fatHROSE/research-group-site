# Supabase 配置示例
# 将此文件复制为 config/_default/params.yaml 中的 supabase 配置

# 1. 访问 https://supabase.com/ 创建账户
# 2. 创建新项目
# 3. 在项目设置中找到 API 配置
# 4. 复制以下信息：

supabase:
  # 项目 URL - 格式：https://your-project-id.supabase.co
  url: "https://your-project-id.supabase.co"
  
  # Anon Key - 公开密钥，用于客户端访问
  anon_key: "your-anon-key-here"

# 注意：
# - anon_key 是公开的，可以安全地嵌入到前端代码中
# - 不要暴露 service_role_key，它具有完全访问权限
# - 通过 RLS (行级安全策略) 保护数据安全
