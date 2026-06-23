# 🌐 Personal Website + 📋 Todo App

> **Academic Cooperation** — School of Computer Science and Engineering, North Minzu University & Software Engineering, College of Arts, Media and Technology, Chiang Mai University  
> **Academic Year 2024** · Basic Development and Operation · **Lab 12 Final Work**

---

## 👤 Student Info

| Field | Info |
|-------|------|
| **Name** | 杨炫 Yang Xuan (Hyun) |
| **Student ID** | 20242168 |
| **Major** | Software Engineering |
| **Photo** | ![Profile Photo](website/images/photo.jpg) |

*(请将你的照片放在 `website/images/photo.jpg`)*

---

## 🌍 Application URLs

| Application | URL |
|-------------|-----|
| **Personal Website** | [http://localhost:8080](http://localhost:8080) (本地) / *部署后更新* |
| **Todo App** | [http://localhost:8081](http://localhost:8081) (本地) / *部署后更新* |

> ⚠️ **部署后请将实际 URL 替换到上方表格和 `website/index.html` 中的链接！**

---

## 📁 Project Structure

```
/
├── website/                      # 个人网站
│   ├── index.html                # 网站主页面
│   ├── style.css                 # 样式文件
│   └── images/
│       └── photo.jpg             # 👈 你的照片放这里
│
├── todo-app/                     # Todo 应用（开源）
│   ├── index.html                # Todo 前端
│   ├── style.css
│   ├── app.js
│   └── Dockerfile                # Todo 应用 Dockerfile
│
├── Dockerfile                    # 个人网站 Dockerfile
├── docker-compose.yml            # Docker Compose 编排
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions CI/CD
└── README.md                     # 本文件
```

---

## 🚀 Quick Start

### 1. 本地运行 (使用 Docker Compose)

```bash
# 构建并启动所有服务
docker compose up -d --build

# 查看运行状态
docker compose ps

# 查看日志
docker compose logs -f

# 停止所有服务
docker compose down
```

然后访问：
- **个人网站**: http://localhost:8080
- **Todo 应用**: http://localhost:8081

### 2. 单独构建/运行

```bash
# 个人网站
docker build -t personal-site .
docker run -d -p 8080:80 personal-site

# Todo 应用
cd todo-app && docker build -t todo-app .
docker run -d -p 8081:80 todo-app
```

---

## ⚙️ GitHub Actions CI/CD

工作流文件: `.github/workflows/deploy.yml`

当推送代码到 `main` 或 `master` 分支时自动：
1. ✅ 构建 Docker 镜像
2. ✅ 推送到 Docker Hub
3. ✅ 通过 SSH 部署到服务器

### 需要的 Secrets

在 GitHub 仓库 → **Settings → Secrets and variables → Actions** 中添加：

| Secret Name | 说明 |
|-------------|------|
| `DOCKER_USERNAME` | Docker Hub 用户名 |
| `DOCKER_PASSWORD` | Docker Hub 密码（或 Access Token） |
| `SERVER_HOST` | 服务器 IP 地址 |
| `SERVER_USER` | SSH 用户名 |
| `SERVER_SSH_KEY` | SSH 私钥 |

---

## 🐳 Docker Compose 详解

```yaml
services:
  personal-site:   # 个人网站 — 端口 8080
    build: ./Dockerfile
    ports: "8080:80"

  todo-app:        # Todo 应用 — 端口 8081
    build: ./todo-app/Dockerfile
    ports: "8081:80"
```

两个应用各自有独立的 Dockerfile，通过 docker-compose.yml 编排在同一台服务器上部署。

---

## 📋 Todo 应用

- 纯前端应用（Vanilla JavaScript）
- 数据存储在浏览器 localStorage
- 基于开源项目 [TodoMVC](https://github.com/tastejs/todomvc) 的设计
- 支持：添加 / 完成 / 删除 / 筛选 / 清除已完成

---

## 📸 录屏要求

请在完成所有步骤后录屏 `.mp4`，内容包括：

1. ✅ GitHub 仓库创建
2. ✅ 项目代码推送
3. ✅ Dockerfile 构建镜像
4. ✅ GitHub Actions CI/CD 运行
5. ✅ Docker Compose 启动 + 两个应用访问
6. ✅ 浏览器展示个人网站 + Todo 应用

---

## 📝 评分参考

| 项目 | 说明 |
|------|------|
| GitHub Repository | 仓库、Commit、README |
| Personal Website | 真实照片 + 内容 |
| Dockerfile | 镜像构建 |
| GitHub Workflow | CI/CD 流水线 |
| Docker Compose | 多容器编排 |
| Todo Application | 开源 Todo 应用集成 |
| Deploy Both Apps | 同一服务器部署 |

---

*Built with ❤️ by 杨炫 Yang Xuan*
