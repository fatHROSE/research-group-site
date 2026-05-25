/**
 * Supabase 客户端配置和数据操作函数
 * 用于课题组管理系统
 */

// 从 Hugo 参数中获取 Supabase 配置
// 这些值会在构建时注入
const SUPABASE_URL = '{{ .Site.Params.supabase.url }}';
const SUPABASE_ANON_KEY = '{{ .Site.Params.supabase.anon_key }}';

// 初始化 Supabase 客户端
let supabaseClient = null;

function initSupabase() {
    if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log('Supabase 客户端初始化成功');
        return true;
    } else {
        console.error('Supabase JS SDK 未加载');
        return false;
    }
}

// 项目相关操作
const ProjectService = {
    // 获取所有项目
    async getAll() {
        const { data, error } = await supabaseClient
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('获取项目失败:', error);
            return [];
        }
        return data;
    },

    // 获取单个项目
    async getById(id) {
        const { data, error } = await supabaseClient
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('获取项目失败:', error);
            return null;
        }
        return data;
    },

    // 创建项目
    async create(project) {
        const { data, error } = await supabaseClient
            .from('projects')
            .insert([project])
            .select();
        
        if (error) {
            console.error('创建项目失败:', error);
            return null;
        }
        return data[0];
    },

    // 更新项目
    async update(id, updates) {
        const { data, error } = await supabaseClient
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select();
        
        if (error) {
            console.error('更新项目失败:', error);
            return null;
        }
        return data[0];
    },

    // 删除项目
    async delete(id) {
        const { error } = await supabaseClient
            .from('projects')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('删除项目失败:', error);
            return false;
        }
        return true;
    }
};

// 论文/成果相关操作
const PublicationService = {
    // 获取所有论文
    async getAll() {
        const { data, error } = await supabaseClient
            .from('publications')
            .select('*')
            .order('year', { ascending: false });
        
        if (error) {
            console.error('获取论文失败:', error);
            return [];
        }
        return data;
    },

    // 获取单篇论文
    async getById(id) {
        const { data, error } = await supabaseClient
            .from('publications')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('获取论文失败:', error);
            return null;
        }
        return data;
    },

    // 创建论文
    async create(publication) {
        const { data, error } = await supabaseClient
            .from('publications')
            .insert([publication])
            .select();
        
        if (error) {
            console.error('创建论文失败:', error);
            return null;
        }
        return data[0];
    },

    // 更新论文
    async update(id, updates) {
        const { data, error } = await supabaseClient
            .from('publications')
            .update(updates)
            .eq('id', id)
            .select();
        
        if (error) {
            console.error('更新论文失败:', error);
            return null;
        }
        return data[0];
    },

    // 删除论文
    async delete(id) {
        const { error } = await supabaseClient
            .from('publications')
            .delete()
            .eq('id', id);
        
        if (error) {
            console.error('删除论文失败:', error);
            return false;
        }
        return true;
    }
};

// 文档相关操作
const DocumentService = {
    // 获取所有文档
    async getAll() {
        const { data, error } = await supabaseClient
            .from('documents')
            .select('*')
            .order('created_at', { ascending: false });
        
        if (error) {
            console.error('获取文档失败:', error);
            return [];
        }
        return data;
    },

    // 获取单个文档
    async getById(id) {
        const { data, error } = await supabaseClient
            .from('documents')
            .select('*')
            .eq('id', id)
            .single();
        
        if (error) {
            console.error('获取文档失败:', error);
            return null;
        }
        return data;
    },

    // 上传文档
    async upload(file, metadata) {
        // 上传文件到存储桶
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `documents/${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
            .from('documents')
            .upload(filePath, file);

        if (uploadError) {
            console.error('上传文件失败:', uploadError);
            return null;
        }

        // 创建文档记录
        const { data, error: insertError } = await supabaseClient
            .from('documents')
            .insert([{
                title: metadata.title || file.name,
                description: metadata.description,
                file_path: filePath,
                file_size: file.size,
                file_type: file.type,
                category: metadata.category || 'general',
                project_id: metadata.project_id
            }])
            .select();

        if (insertError) {
            console.error('创建文档记录失败:', insertError);
            return null;
        }

        return data[0];
    },

    // 删除文档
    async delete(id) {
        // 先获取文档信息
        const doc = await this.getById(id);
        if (!doc) return false;

        // 删除存储桶中的文件
        const { error: storageError } = await supabaseClient.storage
            .from('documents')
            .remove([doc.file_path]);

        if (storageError) {
            console.error('删除文件失败:', storageError);
        }

        // 删除数据库记录
        const { error: dbError } = await supabaseClient
            .from('documents')
            .delete()
            .eq('id', id);

        if (dbError) {
            console.error('删除文档记录失败:', dbError);
            return false;
        }

        return true;
    },

    // 获取文档下载链接
    async getDownloadUrl(filePath) {
        const { data } = supabaseClient.storage
            .from('documents')
            .getPublicUrl(filePath);
        
        return data.publicUrl;
    }
};

// 认证相关操作
const AuthService = {
    // 登录
    async signIn(email, password) {
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error('登录失败:', error);
            return null;
        }
        return data.user;
    },

    // 注册
    async signUp(email, password, metadata) {
        const { data, error } = await supabaseClient.auth.signUp({
            email,
            password,
            options: {
                data: metadata
            }
        });

        if (error) {
            console.error('注册失败:', error);
            return null;
        }
        return data.user;
    },

    // 登出
    async signOut() {
        const { error } = await supabaseClient.auth.signOut();
        if (error) {
            console.error('登出失败:', error);
            return false;
        }
        return true;
    },

    // 获取当前用户
    async getCurrentUser() {
        const { data: { user } } = await supabaseClient.auth.getUser();
        return user;
    },

    // 监听认证状态变化
    onAuthStateChange(callback) {
        return supabaseClient.auth.onAuthStateChange(callback);
    }
};

// 导出服务
window.ProjectService = ProjectService;
window.PublicationService = PublicationService;
window.DocumentService = DocumentService;
window.AuthService = AuthService;
window.initSupabase = initSupabase;
