# ============================================
# Dockerfile — 个人网站 (Yang Xuan's Personal Site)
# 使用 nginx-alpine 部署静态页面
# ============================================

FROM nginx:alpine

# 复制网站文件到 nginx 默认目录
COPY website/ /usr/share/nginx/html/

# 暴露 80 端口
EXPOSE 80

# nginx 默认启动命令
CMD ["nginx", "-g", "daemon off;"]
