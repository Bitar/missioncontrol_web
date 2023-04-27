#FROM node:16.15.1 as build
#
#WORKDIR /missioncontrol_web
#
#COPY . ./
#
## ---
#FROM fholzer/nginx-brotli:v1.12.2
#
#WORKDIR /etc/nginx
#ADD nginx.conf /etc/nginx/nginx.conf
#
#COPY --from=build /missioncontrol_web/build /usr/share/nginx/html
#EXPOSE 443
#CMD ["nginx", "-g", "daemon off;"]


FROM node:16.15.1 as build
WORKDIR /missioncontrol_web

#COPY --from=build /missioncontrol_web/package*.json .
#RUN npm install
COPY . ./

RUN npm run build
FROM nginx:1.19
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /missioncontrol_web/build /usr/share/nginx/html