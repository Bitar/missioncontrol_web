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
WORKDIR /app

COPY . ./

FROM nginx:alpine

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/build /usr/share/nginx/html

ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080


CMD ["nginx", "-g", "daemon off;"]
#WORKDIR /app
#
##COPY --from=build /missioncontrol_web/package*.json .
#COPY package.json package.json
#COPY yarn.lock yarn.lock
#RUN npm install
#COPY . .
#
#RUN npm run build
#FROM nginx:alpine
#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /app/build /usr/share/nginx/html