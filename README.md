# istex-view

Visualisation interactive des documents ISTEX.

## Développement

```
npm install
npm run dev
```

Ceci aura pour effet d'installer les dépendances nécessaires puis de lancer un serveur web static sur http://localhost:45445

Remarque : utiliser l'image docker avec ngnix pour le developpement n'est pas une bonne idée car on se coupe alors du watcher fournit par npm. TODO: voir pour préparer une image docker avec ngnix couplé au watcher ?

## Production

Avec docker, TODO...