# flow rollup config

This is a preset [rollup config][] for [flow][] projects, which uses preconfigured plugins useful in that setup.

### Install

```
npm install --save-dev rollup.config.flow
```

### Configure

Then in your own project create `rollup.config.js` file that just exports the default

```js
import config from "rollup.config.flow"
export default config()
```

### Rollup

Then you can create UMD style bundles from `src` files to `dist` by runing following:

```
rollup -c --files index
```

You can also create multiple bundles as follows:

```
rollup -c --files index,other,nested/module
```

### Customization

You can further customize your config by passing additional options to the config:

```js
import config from "rollup.config.flow"
export default config({
  name: "mylibname", // file name used if not provided
  alias: { stuff: "@gozala/stuff" },
  css: true // importing `style.css` will inject them into head element.
})
```

[flow]: http://flow.org/
[rollup config]: https://rollupjs.org/guide/en#using-config-files
