FROM node:16-alpine AS builder

ENV TZ Europe/Berlin
ENV GENERATE_SOURCEMAP=false 
ENV DISABLE_ESLINT_PLUGIN=true
ENV TSC_COMPILE_ON_ERROR=true

RUN apk add --update --no-cache bash
RUN apk update && apk add tzdata

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
RUN yarn build


FROM nginx:stable-alpine

ENV TZ Europe/Berlin
RUN apk update && apk add tzdata

COPY --from=builder /usr/src/app/build/ /usr/share/nginx/html/
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf 

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]