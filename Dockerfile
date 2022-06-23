FROM gplane/pnpm as Builder

RUN pnpm -v

RUN mkdir -p /home/xihedocs/web
WORKDIR /home/xihedocs/web
COPY . /home/xihedocs/web

RUN pnpm install

RUN pnpm build

FROM nginx:1.20.0

# COPY ./deploy/test-login.html /usr/share/nginx/html/test-login.html

COPY --from=Builder /home/xihedocs/web/docs/.vitepress/dist /usr/share/nginx/html/
RUN chmod -R 755 /usr/share/nginx/html
COPY ./deploy/nginx/nginx.conf /etc/nginx/nginx.conf


ENV RUN_USER nginx
ENV RUN_GROUP nginx
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]

