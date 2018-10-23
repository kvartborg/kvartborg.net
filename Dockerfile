FROM node:10-alpine

RUN apk update && apk upgrade && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && \
    echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories && \
    apk add --no-cache \
      chromium@edge \
      nss@edge

ADD https://github.com/Yelp/dumb-init/releases/download/v1.2.0/dumb-init_1.2.0_amd64 /usr/local/bin/dumb-init
RUN chmod +x /usr/local/bin/dumb-init


WORKDIR /var/www/kvartborg.net
COPY . /var/www/kvartborg.net
RUN npm install
ENV NODE_ENV production
RUN npm run build
RUN rm -rf node_modules
RUN npm install

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN addgroup -S pptruser && adduser -S -g pptruser pptruser \
    && mkdir -p /home/pptruser/Downloads \
    && chown -R pptruser:pptruser /home/pptruser \
    && chown -R pptruser:pptruser /var/www/kvartborg.net

USER pptruser

EXPOSE 3000
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]
