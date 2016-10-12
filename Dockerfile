FROM nginx:1.11.4

# to help docker debugging
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl

# nodejs installation used for build tools
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs

# install tools for bundle.js
WORKDIR /usr/share/nginx/html/
COPY ./package.json /usr/share/nginx/html/
RUN npm install

# ngnix config
COPY ./ngnix/prod.conf /etc/nginx/conf.d/default.conf

# add source code (after npm install for docker build optimization reason)
COPY ./www/ /usr/share/nginx/html/

# build www/dist/bundle.js and www/dist/bundle.css for production
RUN npm run build