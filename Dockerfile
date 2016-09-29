FROM nginx:1.11.4

# pour faciliter le debug de l'image
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl

# installation nodejs
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-get install -y nodejs
RUN npm install -g cross-env browserify uglifyjs

# la configuration du ngnix
COPY ./ngnix/prod.conf /etc/nginx/conf.d/default.conf

# le code source
COPY ./www/ /usr/share/nginx/html/

# compilation de build.js
WORKDIR /usr/share/nginx/html/
COPY ./package.json /usr/share/nginx/html/
RUN npm install
RUN cross-env NODE_ENV=production browserify -e src/main.js | uglifyjs -c warnings=false -m > dist/build.js
