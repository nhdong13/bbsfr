FROM mhart/alpine-node

WORKDIR /app

COPY . .

RUN yarn install --frozen-lockfile

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]



# FROM nginx:stable
# WORKDIR /app
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY ./nginx/.htpasswd /etc/nginx/.htpasswd
