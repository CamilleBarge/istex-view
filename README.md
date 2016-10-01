# istex-view

Viewing enhanced ISTEX documents.

## Development

```
make install
make run-debug
```

Web server redy for debugging is available at:
- http://localhost:45445 (it will use nginx rewrite to be able to debug ARK stuff)
- or at http://localhost:8080 (it will use the internal static nodejs server)

## Production

```
make run-prod
```

# Libs upgrade

To check if a new version is available: ``bower list``

Tu upgrade: ``bower update``