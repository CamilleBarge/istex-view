# istex-view

[![Docker stars](https://img.shields.io/docker/stars/istex/istex-view.svg)](https://registry.hub.docker.com/u/istex/istex-view/)
[![Docker Pulls](https://img.shields.io/docker/pulls/istex/istex-view.svg)](https://registry.hub.docker.com/u/istex/istex-view/)


Viewing enhanced ISTEX documents.
(work in progress)

## Development

Prerequisite is to have a local running [istex-ark](https://github.com/istex/istex-ark):
```
git clone https://github.com/istex/istex-ark
cd istex-ark
make install
make run-debug
```

Then open another termila and run [istex-view](https://github.com/istex/istex-view):
```
git clone https://github.com/istex/istex-view
cd istex-view
make install
make run-debug
```

Web server ready for debugging is available at:
- http://localhost:45445 (it will use nginx rewrite to be able to debug ARK stuff)
- or at http://localhost:8080 (it will use the internal static nodejs server)

If you do not have docker, you can develop if you have installed nodejs locally (version >= 4.4.0). Then you just have to run: 

```
echo 'module.exports = { istexArkUrl: "http://127.0.0.1:3000" };' > ./www/src/config.local.js
npm install
npm run dev
```

Web server will then be ready for debugging only on the 8080 port:
- http://localhost:8080 (it will use the internal static nodejs server)

## Production

```
make run-prod
```

It will run the docker image [istex/istex-view:1.6.1](https://hub.docker.com/r/istex/istex-view/) using this production ready [docker-compose.yml](https://github.com/istex/istex-view/blob/master/docker-compose.yml).

The web server ready for production is then available at ``http://<server ip>:45445/``

Last step is to map the ``http://<server ip>:45445/`` address to ``https://view.istex.fr/``

## How to for developers

### How to generate a new istex-view version ?

Just use npm stuff. Ex: ``npm version patch``

### How to upgrade libraries ?

- To check if a new version is available: ``bower list``
- To upgrade: ``bower update``
