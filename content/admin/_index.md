---
title: "管理后台"
type: admin
layout: admin
---

# 管理后台

<div id="auth-section">
    <div id="login-form">
        <h2>登录</h2>
        <form id="loginForm">
            <div class="form-group">
                <label for="loginEmail">邮箱</label>
                <input type="email" id="loginEmail" required>
            </div>
            <div class="form-group">
                <label for="loginPassword">密码</label>
                <input type="password" id="loginPassword" required>
            </div>
            <button type="submit">登录</button>
        </form>
    </div>
    
    <div id="user-info" style="display: none;">
        <p>已登录: <span id="userEmail"></span></p>
        <button id="logoutBtn">登出</button>
    </div>
</div>

<div id="admin-content" style="display: none;">
    <nav>
        <button class="tab-btn active" data-tab="projects">项目管理</button>
        <button class="tab-btn" data-tab="publications">论文管理</button>
        <button class="tab-btn" data-tab="documents">文档管理</button>
    </nav>

    <!-- 项目管理 -->
    <div id="projects-tab" class="tab-content active">
        <h2>项目管理</h2>
        <button id="addProjectBtn">添加项目</button>
        
        <div id="project-list"></div>
        
        <div id="project-form-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <h3 id="project-form-title">添加项目</h3>
                <form id="projectForm">
                    <input type="hidden" id="projectId">
                    <div class="form-group">
                        <label for="projectTitle">项目名称</label>
                        <input type="text" id="projectTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="projectSlug">URL 标识</label>
                        <input type="text" id="projectSlug" required>
                    </div>
                    <div class="form-group">
                        <label for="projectDescription">项目描述</label>
                        <textarea id="projectDescription"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="projectStatus">状态</label>
                        <select id="projectStatus">
                            <option value="active">进行中</option>
                            <option value="completed">已完成</option>
                            <option value="paused">已暂停</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="projectStartDate">开始日期</label>
                        <input type="date" id="projectStartDate">
                    </div>
                    <div class="form-group">
                        <label for="projectEndDate">结束日期</label>
                        <input type="date" id="projectEndDate">
                    </div>
                    <div class="form-group">
                        <label for="projectFunding">资助来源</label>
                        <input type="text" id="projectFunding">
                    </div>
                    <div class="form-group">
                        <label for="projectPI">负责人</label>
                        <input type="text" id="projectPI">
                    </div>
                    <button type="submit">保存</button>
                    <button type="button" id="cancelProjectBtn">取消</button>
                </form>
            </div>
        </div>
    </div>

    <!-- 论文管理 -->
    <div id="publications-tab" class="tab-content">
        <h2>论文管理</h2>
        <button id="addPublicationBtn">添加论文</button>
        
        <div id="publication-list"></div>
        
        <div id="publication-form-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <h3 id="publication-form-title">添加论文</h3>
                <form id="publicationForm">
                    <input type="hidden" id="publicationId">
                    <div class="form-group">
                        <label for="publicationTitle">论文标题</label>
                        <input type="text" id="publicationTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="publicationSlug">URL 标识</label>
                        <input type="text" id="publicationSlug" required>
                    </div>
                    <div class="form-group">
                        <label for="publicationAuthors">作者（逗号分隔）</label>
                        <input type="text" id="publicationAuthors" required>
                    </div>
                    <div class="form-group">
                        <label for="publicationAbstract">摘要</label>
                        <textarea id="publicationAbstract"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="publicationJournal">期刊</label>
                        <input type="text" id="publicationJournal">
                    </div>
                    <div class="form-group">
                        <label for="publicationYear">年份</label>
                        <input type="number" id="publicationYear">
                    </div>
                    <div class="form-group">
                        <label for="publicationDoi">DOI</label>
                        <input type="text" id="publicationDoi">
                    </div>
                    <div class="form-group">
                        <label for="publicationUrl">链接</label>
                        <input type="url" id="publicationUrl">
                    </div>
                    <div class="form-group">
                        <label for="publicationType">类型</label>
                        <select id="publicationType">
                            <option value="article">期刊论文</option>
                            <option value="conference">会议论文</option>
                            <option value="book">书籍</option>
                            <option value="thesis">学位论文</option>
                            <option value="report">报告</option>
                            <option value="other">其他</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="publicationProject">关联项目</label>
                        <select id="publicationProject">
                            <option value="">无</option>
                        </select>
                    </div>
                    <button type="submit">保存</button>
                    <button type="button" id="cancelPublicationBtn">取消</button>
                </form>
            </div>
        </div>
    </div>

    <!-- 文档管理 -->
    <div id="documents-tab" class="tab-content">
        <h2>文档管理</h2>
        <button id="addDocumentBtn">上传文档</button>
        
        <div id="document-list"></div>
        
        <div id="document-form-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <h3 id="document-form-title">上传文档</h3>
                <form id="documentForm">
                    <input type="hidden" id="documentId">
                    <div class="form-group">
                        <label for="documentFile">文件</label>
                        <input type="file" id="documentFile" required>
                    </div>
                    <div class="form-group">
                        <label for="documentTitle">标题</label>
                        <input type="text" id="documentTitle" required>
                    </div>
                    <div class="form-group">
                        <label for="documentDescription">描述</label>
                        <textarea id="documentDescription"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="documentCategory">分类</label>
                        <select id="documentCategory">
                            <option value="general">通用</option>
                            <option value="paper">论文</option>
                            <option value="data">数据</option>
                            <option value="code">代码</option>
                            <option value="presentation">演示</option>
                            <option value="report">报告</option>
                            <option value="other">其他</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="documentProject">关联项目</label>
                        <select id="documentProject">
                            <option value="">无</option>
                        </select>
                    </div>
                    <button type="submit">上传</button>
                    <button type="button" id="cancelDocumentBtn">取消</button>
                </form>
            </div>
        </div>
    </div>
</div>

<style>
.form-group {
    margin-bottom: 1rem;
}
.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}
.form-group input,
.form-group textarea,
.form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
}
.form-group textarea {
    min-height: 100px;
}
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}
.modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
}
.tab-btn {
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    border: 1px solid #ddd;
    background: #f5f5f5;
    cursor: pointer;
}
.tab-btn.active {
    background: #2563eb;
    color: white;
    border-color: #2563eb;
}
.tab-content {
    display: none;
    padding: 1rem 0;
}
.tab-content.active {
    display: block;
}
.list-item {
    border: 1px solid #eee;
    padding: 1rem;
    margin-bottom: 0.5rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.list-item .actions button {
    margin-left: 0.5rem;
}
button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background: #2563eb;
    color: white;
}
button:hover {
    background: #1d4ed8;
}
#addProjectBtn,
#addPublicationBtn,
#addDocumentBtn {
    margin-bottom: 1rem;
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // 初始化 Supabase
    initSupabase();
    
    // 获取 DOM 元素
    const loginForm = document.getElementById('loginForm');
    const loginSection = document.getElementById('login-form');
    const userInfo = document.getElementById('user-info');
    const userEmail = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');
    const adminContent = document.getElementById('admin-content');
    
    // 标签页切换
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(`${tab}-tab`).classList.add('active');
            
            // 加载数据
            if (tab === 'projects') loadProjects();
            else if (tab === 'publications') loadPublications();
            else if (tab === 'documents') loadDocuments();
        });
    });
    
    // 登录
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        const user = await AuthService.signIn(email, password);
        if (user) {
            showAdminUI(user);
        } else {
            alert('登录失败，请检查邮箱和密码');
        }
    });
    
    // 登出
    logoutBtn.addEventListener('click', async function() {
        await AuthService.signOut();
        showLoginUI();
    });
    
    // 检查登录状态
    checkAuth();
    
    async function checkAuth() {
        const user = await AuthService.getCurrentUser();
        if (user) {
            showAdminUI(user);
        } else {
            showLoginUI();
        }
    }
    
    function showAdminUI(user) {
        loginSection.style.display = 'none';
        userInfo.style.display = 'block';
        userEmail.textContent = user.email;
        adminContent.style.display = 'block';
        loadProjects();
    }
    
    function showLoginUI() {
        loginSection.style.display = 'block';
        userInfo.style.display = 'none';
        adminContent.style.display = 'none';
    }
    
    // 项目管理
    const addProjectBtn = document.getElementById('addProjectBtn');
    const projectFormModal = document.getElementById('project-form-modal');
    const cancelProjectBtn = document.getElementById('cancelProjectBtn');
    const projectForm = document.getElementById('projectForm');
    
    addProjectBtn.addEventListener('click', () => {
        document.getElementById('project-form-title').textContent = '添加项目';
        projectForm.reset();
        document.getElementById('projectId').value = '';
        projectFormModal.style.display = 'flex';
    });
    
    cancelProjectBtn.addEventListener('click', () => {
        projectFormModal.style.display = 'none';
    });
    
    projectForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('projectId').value;
        const projectData = {
            title: document.getElementById('projectTitle').value,
            slug: document.getElementById('projectSlug').value,
            description: document.getElementById('projectDescription').value,
            status: document.getElementById('projectStatus').value,
            start_date: document.getElementById('projectStartDate').value || null,
            end_date: document.getElementById('projectEndDate').value || null,
            funding_source: document.getElementById('projectFunding').value,
            principal_investigator: document.getElementById('projectPI').value
        };
        
        let result;
        if (id) {
            result = await ProjectService.update(id, projectData);
        } else {
            result = await ProjectService.create(projectData);
        }
        
        if (result) {
            projectFormModal.style.display = 'none';
            loadProjects();
        }
    });
    
    async function loadProjects() {
        const projects = await ProjectService.getAll();
        const projectList = document.getElementById('project-list');
        
        if (projects.length === 0) {
            projectList.innerHTML = '<p>暂无项目</p>';
            return;
        }
        
        projectList.innerHTML = projects.map(project => `
            <div class="list-item">
                <div>
                    <h4>${project.title}</h4>
                    <p>状态: ${project.status === 'active' ? '进行中' : project.status === 'completed' ? '已完成' : '已暂停'}</p>
                    <p>负责人: ${project.principal_investigator || '未指定'}</p>
                </div>
                <div class="actions">
                    <button onclick="editProject('${project.id}')">编辑</button>
                    <button onclick="deleteProject('${project.id}')">删除</button>
                </div>
            </div>
        `).join('');
    }
    
    window.editProject = async function(id) {
        const project = await ProjectService.getById(id);
        if (!project) return;
        
        document.getElementById('project-form-title').textContent = '编辑项目';
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectTitle').value = project.title;
        document.getElementById('projectSlug').value = project.slug;
        document.getElementById('projectDescription').value = project.description || '';
        document.getElementById('projectStatus').value = project.status;
        document.getElementById('projectStartDate').value = project.start_date || '';
        document.getElementById('projectEndDate').value = project.end_date || '';
        document.getElementById('projectFunding').value = project.funding_source || '';
        document.getElementById('projectPI').value = project.principal_investigator || '';
        
        projectFormModal.style.display = 'flex';
    };
    
    window.deleteProject = async function(id) {
        if (confirm('确定要删除这个项目吗？')) {
            await ProjectService.delete(id);
            loadProjects();
        }
    };
    
    // 论文管理
    const addPublicationBtn = document.getElementById('addPublicationBtn');
    const publicationFormModal = document.getElementById('publication-form-modal');
    const cancelPublicationBtn = document.getElementById('cancelPublicationBtn');
    const publicationForm = document.getElementById('publicationForm');
    
    addPublicationBtn.addEventListener('click', () => {
        document.getElementById('publication-form-title').textContent = '添加论文';
        publicationForm.reset();
        document.getElementById('publicationId').value = '';
        publicationFormModal.style.display = 'flex';
        loadProjectOptions();
    });
    
    cancelPublicationBtn.addEventListener('click', () => {
        publicationFormModal.style.display = 'none';
    });
    
    publicationForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const id = document.getElementById('publicationId').value;
        const publicationData = {
            title: document.getElementById('publicationTitle').value,
            slug: document.getElementById('publicationSlug').value,
            authors: document.getElementById('publicationAuthors').value.split(',').map(a => a.trim()),
            abstract: document.getElementById('publicationAbstract').value,
            journal: document.getElementById('publicationJournal').value,
            year: parseInt(document.getElementById('publicationYear').value) || null,
            doi: document.getElementById('publicationDoi').value,
            url: document.getElementById('publicationUrl').value,
            publication_type: document.getElementById('publicationType').value,
            project_id: document.getElementById('publicationProject').value || null
        };
        
        let result;
        if (id) {
            result = await PublicationService.update(id, publicationData);
        } else {
            result = await PublicationService.create(publicationData);
        }
        
        if (result) {
            publicationFormModal.style.display = 'none';
            loadPublications();
        }
    });
    
    async function loadPublications() {
        const publications = await PublicationService.getAll();
        const publicationList = document.getElementById('publication-list');
        
        if (publications.length === 0) {
            publicationList.innerHTML = '<p>暂无论文</p>';
            return;
        }
        
        publicationList.innerHTML = publications.map(pub => `
            <div class="list-item">
                <div>
                    <h4>${pub.title}</h4>
                    <p>作者: ${pub.authors.join(', ')}</p>
                    <p>年份: ${pub.year || '未指定'} | 期刊: ${pub.journal || '未指定'}</p>
                </div>
                <div class="actions">
                    <button onclick="editPublication('${pub.id}')">编辑</button>
                    <button onclick="deletePublication('${pub.id}')">删除</button>
                </div>
            </div>
        `).join('');
    }
    
    window.editPublication = async function(id) {
        const pub = await PublicationService.getById(id);
        if (!pub) return;
        
        document.getElementById('publication-form-title').textContent = '编辑论文';
        document.getElementById('publicationId').value = pub.id;
        document.getElementById('publicationTitle').value = pub.title;
        document.getElementById('publicationSlug').value = pub.slug;
        document.getElementById('publicationAuthors').value = pub.authors.join(', ');
        document.getElementById('publicationAbstract').value = pub.abstract || '';
        document.getElementById('publicationJournal').value = pub.journal || '';
        document.getElementById('publicationYear').value = pub.year || '';
        document.getElementById('publicationDoi').value = pub.doi || '';
        document.getElementById('publicationUrl').value = pub.url || '';
        document.getElementById('publicationType').value = pub.publication_type;
        
        await loadProjectOptions();
        document.getElementById('publicationProject').value = pub.project_id || '';
        
        publicationFormModal.style.display = 'flex';
    };
    
    window.deletePublication = async function(id) {
        if (confirm('确定要删除这篇论文吗？')) {
            await PublicationService.delete(id);
            loadPublications();
        }
    };
    
    // 文档管理
    const addDocumentBtn = document.getElementById('addDocumentBtn');
    const documentFormModal = document.getElementById('document-form-modal');
    const cancelDocumentBtn = document.getElementById('cancelDocumentBtn');
    const documentForm = document.getElementById('documentForm');
    
    addDocumentBtn.addEventListener('click', () => {
        document.getElementById('document-form-title').textContent = '上传文档';
        documentForm.reset();
        document.getElementById('documentId').value = '';
        documentFormModal.style.display = 'flex';
        loadProjectOptions();
    });
    
    cancelDocumentBtn.addEventListener('click', () => {
        documentFormModal.style.display = 'none';
    });
    
    documentForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const file = document.getElementById('documentFile').files[0];
        const metadata = {
            title: document.getElementById('documentTitle').value,
            description: document.getElementById('documentDescription').value,
            category: document.getElementById('documentCategory').value,
            project_id: document.getElementById('documentProject').value || null
        };
        
        const result = await DocumentService.upload(file, metadata);
        if (result) {
            documentFormModal.style.display = 'none';
            loadDocuments();
        }
    });
    
    async function loadDocuments() {
        const documents = await DocumentService.getAll();
        const documentList = document.getElementById('document-list');
        
        if (documents.length === 0) {
            documentList.innerHTML = '<p>暂无文档</p>';
            return;
        }
        
        documentList.innerHTML = documents.map(doc => `
            <div class="list-item">
                <div>
                    <h4>${doc.title}</h4>
                    <p>分类: ${doc.category} | 大小: ${formatFileSize(doc.file_size)}</p>
                    <p>上传时间: ${new Date(doc.created_at).toLocaleDateString()}</p>
                </div>
                <div class="actions">
                    <button onclick="downloadDocument('${doc.file_path}')">下载</button>
                    <button onclick="deleteDocument('${doc.id}')">删除</button>
                </div>
            </div>
        `).join('');
    }
    
    window.downloadDocument = async function(filePath) {
        const url = await DocumentService.getDownloadUrl(filePath);
        window.open(url, '_blank');
    };
    
    window.deleteDocument = async function(id) {
        if (confirm('确定要删除这个文档吗？')) {
            await DocumentService.delete(id);
            loadDocuments();
        }
    };
    
    // 辅助函数
    async function loadProjectOptions() {
        const projects = await ProjectService.getAll();
        const projectSelects = document.querySelectorAll('#publicationProject, #documentProject');
        
        projectSelects.forEach(select => {
            const currentValue = select.value;
            select.innerHTML = '<option value="">无</option>';
            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.title;
                select.appendChild(option);
            });
            select.value = currentValue;
        });
    }
    
    function formatFileSize(bytes) {
        if (!bytes) return '未知';
        const units = ['B', 'KB', 'MB', 'GB'];
        let i = 0;
        while (bytes >= 1024 && i < units.length - 1) {
            bytes /= 1024;
            i++;
        }
        return `${bytes.toFixed(2)} ${units[i]}`;
    }
});
</script>
