FROM node:16.15.1 as build

WORKDIR /missioncontrol_web

COPY . ./

# ---
FROM fholzer/nginx-brotli:v1.12.2

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /missioncontrol_web/build /usr/share/nginx/html
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]