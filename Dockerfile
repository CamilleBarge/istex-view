FROM nginx:1.11.4

# to help docker debugging
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl

# nodejs installation used for build tools
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g cross-env browserify uglifyjs

# ngnix config
COPY ./ngnix/prod.conf /etc/nginx/conf.d/default.conf

# add source code 
WORKDIR /usr/share/nginx/html/
COPY ./www/ /usr/share/nginx/html/

# build build.js
RUN cross-env NODE_ENV=production browserify -e src/main.js | uglifyjs -c warnings=false -m > dist/build.js
