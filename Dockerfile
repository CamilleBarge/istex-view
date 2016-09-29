FROM nginx:1.11.4

# pour faciliter le debug de l'image
RUN echo "export LS_OPTIONS='--color=auto'" >> /root/.bashrc
RUN echo "alias ls='ls $LS_OPTIONS'"        >> /root/.bashrc
RUN echo "alias ll='ls $LS_OPTIONS -l'"     >> /root/.bashrc
ENV DEBIAN_FRONTEND noninteractive
RUN apt-get -y update && apt-get -y install vim curl

# la configuration du ngnix
COPY ./ngnix/prod.conf /etc/nginx/conf.d/default.conf

# le code source
COPY ./www/ /usr/share/nginx/html/
