FROM node:10-alpine

WORKDIR /var/www/kvartborg.net
COPY . /var/www/kvartborg.net
ENV NODE_ENV production
RUN npm install

EXPOSE 3000
CMD ["npm", "start"]
