module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    private: false,
    files: [
      "dist",
      "package.json",
      "README.md"
    ],
    scripts: {
      "build:module:Component": "vue-cli-service build --target lib --name Component ./src/components/Component.vue",
      "build:module:PreviewerAndEditor": "vue-cli-service build --target lib --name PreviewerAndEditor ./src/PreviewerAndEditor.js",
      "build:lib": "npm run build:module:Component && npm run build:module:PreviewerAndEditor -- --no-clean",
      "preview": "vue-cli-service build --watch --target lib --name PreviewerAndEditor ./src/PreviewerAndEditor.js -- --no-clean",
      "dev:preview": "cross-env VUE_APP_MODE=preview npm run serve & npm run preview"
    },
    dependencies: {
      "core-js": "^3.6.5",
      "vue": "^2.6.11"
    },
    devDependencies: {
      "@vue/cli-plugin-babel": "^4.5.0",
      "@vue/cli-plugin-eslint": "^4.5.0",
      "@vue/cli-service": "^4.5.0",
      "babel-eslint": "^10.1.0",
      "eslint": "^6.7.2",
      "eslint-plugin-vue": "^6.2.2",
      "vue-template-compiler": "^2.6.11",
      "cross-env": "^7.0.2"
    },
    "eslintConfig": {
      "root": true,
      "env": {
        "node": true
      },
      "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
      ],
      "parserOptions": {
        "parser": "babel-eslint"
      },
      "rules": {}
    },
  });

  // 删除默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(name => delete files[name]);
  });

  // 生成目录及文件
  api.render('./template/default');

  // api.onCreateComplete(() => {});
}