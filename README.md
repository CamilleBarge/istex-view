# istex-view

[![Docker stars](https://img.shields.io/docker/stars/istex/istex-view.svg)](https://registry.hub.docker.com/u/istex/istex-view/)
[![Docker Pulls](https://img.shields.io/docker/pulls/istex/istex-view.svg)](https://registry.hub.docker.com/u/istex/istex-view/)


Viewing enhanced ISTEX ressources.
(work in progress)

## Development


Open a terminal and run [istex-view](https://github.com/istex/istex-view):
```
git clone https://github.com/istex/istex-view
cd istex-view
make install
make run-debug
```

Then web server ready for debugging is available at: http://localhost:45445

## Production

```
make run-prod
```

It will run the docker image [istex/istex-view:2.3.7](https://hub.docker.com/r/istex/istex-view/) using this production ready [docker-compose.yml](https://github.com/istex/istex-view/blob/master/docker-compose.yml).

The web server ready for production is then available at ``http://<server ip>:45445/``

Last step is to map the ``http://<server ip>:45445/`` address to ``https://view.istex.fr/``

## How to for developers

### How to generate a new istex-view version ?

Just use npm stuff. Ex: ``npm version patch``

### How to upgrade libraries ?

- To check if a new version is available: ``bower list``
- To upgrade: ``bower update``
