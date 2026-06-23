# ============================================
# Dockerfile — Todo App (Open Source)
# 使用 nginx-alpine 部署静态 Todo 应用
# ============================================

FROM nginx:alpine

COPY . /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
