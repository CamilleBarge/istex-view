# istex-view

[![Docker stars](https://img.shields.io/docker/stars/istex/istex-view.svg)](https://registry.hub.docker.com/u/istex/istex-view/)
[![Docker Pulls](https://img.shields.io/docker/pulls/istex/istex-view.svg)](https://registry.hub.docker.com/u/istex/istex-view/)

ISTEX VIEW is an HTML5 visualisation of the ISTEX ressources exposed by the [ISTEX API](https://api.istex.fr). Each page is an HTMLized version of the PDF enhanced by contextual interactivities (ex: showing refbib details when mouse over).

ISTEX VIEW is also an HTML5 visualisation over the [ISTEX OpenURL feature](https://api.istex.fr/documentation/openurl/). It is a human friendly interface over the OpenURL showing human readable messagesinstead of a raw JSON message returned by the  [ISTEX API OpenURL endpoint](https://api.istex.fr/documentation/openurl/).

(work in progress)

## Options

[config.json](https://github.com/istex/istex-view/blob/master/www/config.json) contains options you can modify to change istex-view behavior:

- **`istexApiUrl`**: this is the root URL of the ISTEX API, default value is https://api.istex.fr (it can be changed to test ISTEX API [developement](https://api-dev.istex.fr) or [integration](https://api-integ.istex.fr) versions)
- **`openUrlFTRedirectTo`**: this is how the OpenURL stuff should redirect users. Possible values are:
  - `api`:  means the user will be redirected to the raw PDF hosted by the ISTEX API (default value since istex-view is in beta status)
  - `view`:  means the user will be redirected to the istex-view HTML5 enhanced version of the PDF

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

It will run the docker image [istex/istex-view:2.4.5](https://hub.docker.com/r/istex/istex-view/) using this production ready [docker-compose.yml](https://github.com/istex/istex-view/blob/master/docker-compose.yml).

The web server ready for production is then available at ``http://<server ip>:45445/``

Last step is to map the ``http://<server ip>:45445/`` address to ``https://view.istex.fr/``

## How to for developers

### How to generate a new istex-view version ?

Just use npm stuff. Ex: ``npm version patch``

### How to upgrade libraries ?

- To check if a new version is available: ``bower list``
- To upgrade: ``bower update``
