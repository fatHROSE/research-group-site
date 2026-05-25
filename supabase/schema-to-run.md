# 建表脚本 — 复制以下全部内容到 Supabase SQL Editor 执行

```sql
-- 启用 UUID 扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 项目表
CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused')),
    start_date DATE,
    end_date DATE,
    funding_source TEXT,
    funding_amount DECIMAL(12, 2),
    principal_investigator TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 论文/成果表
CREATE TABLE publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    authors TEXT[] NOT NULL,
    abstract TEXT,
    journal TEXT,
    volume TEXT,
    issue TEXT,
    pages TEXT,
    year INTEGER,
    doi TEXT,
    url TEXT,
    pdf_url TEXT,
    publication_type TEXT DEFAULT 'article' CHECK (publication_type IN ('article', 'conference', 'book', 'thesis', 'report', 'other')),
    project_id UUID REFERENCES projects(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 文档/文件表
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT,
    file_path TEXT NOT NULL,
    file_size BIGINT,
    file_type TEXT,
    category TEXT DEFAULT 'general' CHECK (category IN ('general', 'paper', 'data', 'code', 'presentation', 'report', 'other')),
    project_id UUID REFERENCES projects(id),
    uploaded_by UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 成员表（关联 Supabase Auth）
CREATE TABLE members (
    id UUID PRIMARY KEY REFERENCES auth.users(id),
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'pi', 'postdoc', 'phd', 'master', 'undergraduate', 'visitor', 'member')),
    title TEXT,
    bio TEXT,
    avatar_url TEXT,
    research_interests TEXT[],
    homepage_url TEXT,
    google_scholar_url TEXT,
    orcid_url TEXT,
    github_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX idx_publications_project_id ON publications(project_id);
CREATE INDEX idx_publications_year ON publications(year);
CREATE INDEX idx_documents_project_id ON documents(project_id);
CREATE INDEX idx_documents_category ON documents(category);
CREATE INDEX idx_projects_status ON projects(status);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_publications_updated_at BEFORE UPDATE ON publications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_members_updated_at BEFORE UPDATE ON members
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 行级安全策略 (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "项目公开可读" ON projects FOR SELECT USING (true);
CREATE POLICY "认证用户可创建项目" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "认证用户可更新项目" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "认证用户可删除项目" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "论文公开可读" ON publications FOR SELECT USING (true);
CREATE POLICY "认证用户可创建论文" ON publications FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "认证用户可更新论文" ON publications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "认证用户可删除论文" ON publications FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "文档公开可读" ON documents FOR SELECT USING (true);
CREATE POLICY "认证用户可上传文档" ON documents FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "认证用户可更新文档" ON documents FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "认证用户可删除文档" ON documents FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "成员信息公开可读" ON members FOR SELECT USING (true);
CREATE POLICY "用户可创建自己的资料" ON members FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "用户可更新自己的资料" ON members FOR UPDATE USING (auth.uid() = id);

-- 创建存储桶（用于文件存储）
INSERT INTO storage.buckets (id, name, public) VALUES ('documents', 'documents', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- 存储桶策略
CREATE POLICY "文档公开可读" ON storage.objects FOR SELECT USING (bucket_id = 'documents');
CREATE POLICY "认证用户可上传文档" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'documents' AND auth.role() = 'authenticated');
CREATE POLICY "头像公开可读" ON storage.objects FOR SELECT USING (bucket_id = 'avatars');
CREATE POLICY "认证用户可上传头像" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'avatars' AND auth.role() = 'authenticated');
```

## 执行步骤

1. 左侧菜单点击 **SQL Editor**（或 `</>` 图标）
2. 粘贴以上全部 SQL
3. 点击 **Run**（▶）按钮
4. 看到绿色 ✓ 表示成功
