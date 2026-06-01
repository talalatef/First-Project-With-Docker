FROM nginx:1.27-alpine

LABEL org.opencontainers.image.title="Docker Calculator"
LABEL org.opencontainers.image.description="A small calculator web app for learning Docker build, run, tag, and push workflows."

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY src/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
