const fs = require('fs')
const path = require('path')

const isBinary = require('isbinaryfile')

async function generate (dir, files, base = '', rootOptions = {}) {
  const glob = require('glob')

  glob.sync('**/*', {
    cwd: dir,
    nodir: true
  }).forEach(rawPath => {
    const sourcePath = path.resolve(dir, rawPath)
    const filename = path.join(base, rawPath)

    if (isBinary.sync(sourcePath)) {
      files[filename] = fs.readFileSync(sourcePath) // return buffer
    } else {
      let content = fs.readFileSync(sourcePath, 'utf-8');
      if (filename.charAt(0) === '_' && filename.charAt(1) !== '_') {
        files[`.${filename.slice(1)}`] = content
      } else if (filename.charAt(0) === '_' && filename.charAt(1) === '_') {
        files[`${filename.slice(1)}`] = content
      } else {
        files[filename] = content
      }
    }
  })
}

module.exports = (api, options, rootOptions) => {
  api.extendPackage(pkg => {
    return {
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
        "vue-template-compiler": "^2.6.11"
      }
    }
  });

  api.render(async function (files) {
    Object.keys(files).forEach(name => {
      delete files[name];
    });

    await generate(path.resolve(__dirname, './template/common'), files);
    
    const base = 'src';
    const template = options.repo || options.template;
    if (template === 'default') {
      await generate(path.resolve(__dirname, './template/default'), files, base, rootOptions);
    }
  });
}