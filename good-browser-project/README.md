## This is a proposal of what KMF should output when generating for "js"

> This project showcases **KMF**, **WebPack** and **TypeScript**

Install the devDependencies by running:
```sh
npm i
```

This will install:
- webpack
- webpack-dev-server
- typescript
- ts-loader

Those devDependencies are used by **WebPack** in order to dynamically build the typescript sources and bundle them in one file `dist/bundle.js`

## Run the dev mode
```sh
npm run serve
```

This command starts a web server using **WebPack Dev Server** that will watch your files and transpile them to JavaScript and re-bundle them after any changes.

Go to http://localhost:8080 to see the result :)
