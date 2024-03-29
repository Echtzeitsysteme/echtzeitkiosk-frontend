FROM node:lts-alpine as builder

ENV TZ Etc/Universal
RUN apk update && apk add tzdata

ENV GENERATE_SOURCEMAP=false 
ENV DISABLE_ESLINT_PLUGIN=true
ENV TSC_COMPILE_ON_ERROR=true
ENV NODE_ENV=production
# ENV REACT_APP_API_URL=https://api.echtzeitkiosk.mertalpulus.eu/v1
#ENV REACT_APP_API_URL=http://kiosk.fg.es.e-technik.tu-darmstadt.de:4000/v1
ENV REACT_APP_API_URL=https://api.echtzeitkiosk.de/v1

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile --network-timeout 1000000

COPY . .
RUN yarn build


FROM nginx:stable-alpine

ENV TZ Europe/Berlin
RUN apk update && apk add tzdata

COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
