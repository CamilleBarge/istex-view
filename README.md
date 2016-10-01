# istex-view

Viewing enhanced ISTEX documents.

## Development

```
make install
make run-debug
```

Web server ready for debugging is available at:
- http://localhost:45445 (it will use nginx rewrite to be able to debug ARK stuff)
- or at http://localhost:8080 (it will use the internal static nodejs server)

## Production

```
make run-prod
```

It will run the docker image [istex/istex-view:1.0.5](https://hub.docker.com/r/istex/istex-view/) using the production ready [docker-compose.yml](https://github.com/istex/istex-view/blob/master/docker-compose.yml).

The web server ready for production is then available at ``http://<server ip>:45445/``

Last step is to map the ``http://<server ip>:45445/`` address to ``https://view.istex.fr/``

## How to for developers

### How to generate a new istex-view version ?

Just use npm stuff. Ex: ``npm version patch``

### How to upgrade libraries ?

- To check if a new version is available: ``bower list``
- To upgrade: ``bower update``