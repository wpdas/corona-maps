# Corona Maps

The plan is to create a Web App initially that shows every place where COVID-19 was detected. Data will be set by the users itself. Every register should have a validation date so that, it'll be automatically removed from the map. Google Maps API can be used in order to have a maps service running within the app.

We have to use the manifest to put some information and turn possible people downloading this app as a Progressive Web App.

Main stack: React, TypeScript, NodeJS, Express, GraphQL, Apollo, MongoDB, Docker, i18n

## Well to know

### VSCode + ESlint

All the setup for VSCode IDE is set into the `.vscode` folder.

## Envs

**.env:** This a is public .env, important data must not be into the repo though

```
SERVER_PORT=5000
REACT_APP_PORT=3000
WEB_PORT=80
API_URL=http://localhost:$SERVER_PORT
```
