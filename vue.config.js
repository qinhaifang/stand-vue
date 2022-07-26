const defaultSettings = require("./src/config/config.base");
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const port = process.env.port || process.env.npm_config_port || 8080; // dev port
const Timestamp = new Date().getTime();

const express = require("express");
const app = express();
var router = express.Router();
/*post方法*/
var bodyParser = require("body-parser");
app.use(bodyParser.json()); // 添加json解析
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
/*为app添加中间件处理跨域请求*/
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

function resolve(dir) {
  return path.join(__dirname, dir);
}
const name = defaultSettings.title || "vue Admin Template"; // page title
const isProd = process.env.NODE_ENV === "production";
const target =
  process.env.NODE_ENV === "mock"
    ? "http://localhost:8080"
    : "https://www.******";
module.exports = {
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true,
    },
    proxy: {
      "/attendance": {
        target,
        changeOrigin: true,
      },
    },
    before(app) {
      app.post("/login", function (req, res) {
        console.log(req, res);
      });
    },
    // before: require("./mock/index"),
  },
  publicPath: "/",
  outputDir: "dist",
  assetsDir: "static",
  runtimeCompiler: false, // 开启生产环境SourceMap，设为false打包时不生成.map文件
  productionSourceMap: false, // 开启生产环境SourceMap，设为false打包时不生成.map文件
  lintOnSave: process.env.NODE_ENV === "development",

  configureWebpack: (config) => {
    // 生产环境打包分析体积
    if (isProd) {
      return {
        output: {
          filename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
          chunkFilename: `static/js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
        },
        name: name,
        plugins: [
          // new BundleAnalyzerPlugin(),
          new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
          new webpack.ProvidePlugin({
            jQuery: "jquery",
            $: "jquery",
          }),
        ],
        optimization: {
          minimizer: [
            new TerserPlugin({
              terserOptions: {
                ecma: undefined,
                warnings: false,
                parse: {},
                compress: {
                  drop_console: true,
                  drop_debugger: false,
                  pure_funcs: ["console.log"], // 移除console
                },
              },
            }),
          ],
        },
      };
    } else {
      config.name = name;
      config.devtool = "source-map";
    }
  },

  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: (config) => {
    config.plugin("preload").tap(() => [
      {
        rel: "preload",
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: "initial",
      },
    ]);

    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"))
      .set("views", resolve("src/views"))
      .set("global", resolve("src/global"));
    config.plugins.delete("prefetch");
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/global/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/global/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
    config.when(process.env.NODE_ENV !== "development", (config) => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/,
          },
        ])
        .end();
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          elementUI: {
            name: "chunk-elementUI", // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/, // in order to adapt to cnpm
          },
          commons: {
            name: "chunk-commons",
            test: resolve("src/components"), // can customize your rules
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      });
      // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
      config.optimization.runtimeChunk("single");
    });
  },
  parallel: false,
};
