// @flow

const json = require("rollup-plugin-json")
const resolve = require("rollup-plugin-node-resolve")
const commonjs = require("rollup-plugin-commonjs")
const babel = require("rollup-plugin-babel")
const legacy = require("rollup-plugin-legacy")
const serve = require("rollup-plugin-serve")
const postcss = require("rollup-plugin-postcss")

const alias = (mapping /*: { [string]: string } */) => ({
  resolveId(importee /*: string */, importer /*: string */) {
    const alias = mapping[importee]
    return alias == null ? null : require.resolve(alias)
  }
})

const bundle = config => file => ({
  input: `./src/${file}.js`,
  output: {
    file: `./dist/${file}.js`,
    format: "umd",
    sourcemap: true,
    name: config.name || file.replace(/\//g, ".")
  },
  moduleContext: config.moduleContext,
  plugins: [
    ...[config.css ? postcss(config.css) : []],
    ...[config.alias ? [alias(config.alias)] : []],
    json({ preferConst: true }),
    babel(),
    ...[config.legacy ? [legacy(config.legacy)] : []],
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true,
      extensions: [".js", ".json"]
    }),
    commonjs()
  ]
})

const watch =
  process.argv.includes("-w") || process.argv.includes("--watch")
    ? [serve()]
    : []

const files = process.argv.includes("--files")
  ? process.argv[process.argv.indexOf("--files") + 1].split(",")
  : []

module.exports = (
  config /*: {
    name?: string,
    alias?: { [string]: string },
    moduleContext?: { [string]: string },
    legacy?: { [string]: { [string]: string } },
    css?: boolean
  } */ = {}
) => [...files.map(bundle(config))]
