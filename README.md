# Sitewatch

![.github/workflows/release.yml](https://github.com/maxmaccari/sitewatch/workflows/.github/workflows/release.yml/badge.svg)

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Run your end-to-end tests

```
npm run test:e2e
```

### Lints and fixes files

```
npm run lint
```

### Or you can run all tests at once

```
npm test
```

## What I used

  * scss - I choose to use scss instead using a css framework to show how I write CSS code, and because
  it's a tool widely used today. I could finish the project much faster if I chose to use some CSS framework, 
  but I wouldn't be demonstrating my skills. And I know that there are a lot of better ways to deal with styles,
  but I'd like to show my skills using tools that I've already used in production.

  * vuex to manage the application state. I choose not to use with modules to not add complexity, as it
  is a very simple domain. In bigger applications it's is recommended to split the store into modules.

  * axios to make http requests. It was not necessary, I choose because I like this library.

  * window.localStorage through vuex-persistedstate plugin to persist the ping history.
  
  * window.BroadcastChannel - to refresh the ping history data between  tabs and windows in the same browser. 

  * jest to perform unit tests, and because I'm very comfortable  with this tool.

  * cypress to perform e2e tests and because I think it offers a very productive workflow for tests.

  * eslint + prettier to enforce code quality.

### Why I use Vuex only on HistorySection and PingSection components?

I like vuex, but sometimes it can make components harder to tests and maintain. So I prefer
to use only where I think it's necessary and on components that I'm sure I'm not going to use in
other contexts.


### Why using tests in the __tests__ folter instead the tests/unit folder?

Because unit tests part of the implementation of what is being tested. So I think it's better
to be closer to them. And because sometimes I use tests as an specification of the components.