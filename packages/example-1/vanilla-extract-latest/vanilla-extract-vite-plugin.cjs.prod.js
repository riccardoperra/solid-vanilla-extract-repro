'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var path = require('path');
var vite = require('vite');
var outdent = require('outdent');
var integration = require('@vanilla-extract/integration');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var path__default = /*#__PURE__*/_interopDefault(path);
var outdent__default = /*#__PURE__*/_interopDefault(outdent);

// Mostly copied from vite's implementation
// https://github.com/vitejs/vite/blob/efec70f816b80e55b64255b32a5f120e1cf4e4be/packages/vite/src/node/plugins/css.ts
const resolvePostcssConfig = async config => {
  var _config$css;

  // inline postcss config via vite config
  const inlineOptions = (_config$css = config.css) === null || _config$css === void 0 ? void 0 : _config$css.postcss;
  const inlineOptionsIsString = typeof inlineOptions === 'string';

  if (inlineOptions && !inlineOptionsIsString) {
    const options = { ...inlineOptions
    };
    delete options.plugins;
    return {
      options,
      plugins: inlineOptions.plugins || []
    };
  } else {
    try {
      const searchPath = typeof inlineOptions === 'string' ? inlineOptions : config.root;
      const postCssConfig = await (await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('postcss-load-config')); })).default({}, searchPath);
      return {
        options: postCssConfig.options,
        // @ts-expect-error - The postcssrc options don't agree with real postcss, but it should be ok
        plugins: postCssConfig.plugins
      };
    } catch (e) {
      if (!/No PostCSS Config found/.test(e.message)) {
        throw e;
      }

      return null;
    }
  }
};

const styleUpdateEvent = fileId => `vanilla-extract-style-update:${fileId}`;

function vanillaExtractPlugin({
  identifiers
} = {}) {
  let config;
  let server;
  let postCssConfig;
  const cssMap = new Map();
  let virtualExt;
  let packageName;
  return {
    name: 'vanilla-extract',
    enforce: 'pre',

    configureServer(_server) {
      server = _server;
    },

    config(_userConfig, env) {
      const include = env.command === 'serve' ? ['@vanilla-extract/css/injectStyles'] : [];
      return {
        optimizeDeps: {
          include
        },
        ssr: {
          external: ['@vanilla-extract/css', '@vanilla-extract/css/fileScope', '@vanilla-extract/css/adapter']
        }
      };
    },

    async configResolved(resolvedConfig) {
      config = resolvedConfig;
      packageName = integration.getPackageInfo(config.root).name;

      if (config.command === 'serve') {
        postCssConfig = await resolvePostcssConfig(config);
      }

      virtualExt = `.vanilla.${config.command === 'serve' ? 'js' : 'css'}`;
    },

    resolveId(id) {
      if (!id.endsWith(virtualExt)) {
        return;
      }

      const normalizedId = id.startsWith('/') ? id.slice(1) : id;

      if (cssMap.has(normalizedId)) {
        return vite.normalizePath(path__default["default"].join(config.root, normalizedId));
      }
    },

    load(id) {
      if (!id.endsWith(virtualExt)) {
        return;
      }

      const cssFileId = id.slice(config.root.length + 1);
      const css = cssMap.get(cssFileId);

      if (typeof css !== 'string') {
        return;
      }

      if (!server) {
        return css;
      }

      return outdent__default["default"]`
        import { injectStyles } from '@vanilla-extract/css/injectStyles';
        
        const inject = (css) => injectStyles({
          fileScope: ${JSON.stringify({
        filePath: cssFileId
      })},
          css
        });

        inject(${JSON.stringify(css)});

        import.meta.hot.on('${styleUpdateEvent(cssFileId)}', (css) => {
          inject(css);
        });   
      `;
    },

    async transform(code, id, ssrParam) {
      if (!integration.cssFileFilter.test(id)) {
        return null;
      }

      let ssr;

      if (typeof ssrParam === 'boolean') {
        ssr = ssrParam;
      } else {
        ssr = ssrParam === null || ssrParam === void 0 ? void 0 : ssrParam.ssr;
      }

      const index = id.indexOf('?');
      const validId = index === -1 ? id : id.substring(0, index);

      if (ssr) {
        return integration.addFileScope({
          source: code,
          filePath: vite.normalizePath(validId),
          rootPath: config.root,
          packageName
        });
      }

      const {
        source,
        watchFiles
      } = await integration.compile({
        filePath: validId,
        cwd: config.root
      });

      for (const file of watchFiles) {
        // In start mode, we need to prevent the file from rewatching itself.
        // If it's a `build --watch`, it needs to watch everything.
        if (config.command === 'build' || file !== id) {
          this.addWatchFile(file);
        }
      }

      const output = await integration.processVanillaFile({
        source,
        filePath: validId,
        identOption: identifiers !== null && identifiers !== void 0 ? identifiers : config.mode === 'production' ? 'short' : 'debug',
        serializeVirtualCssPath: async ({
          fileScope,
          source
        }) => {
          const id = `${fileScope.filePath}${virtualExt}`;
          let cssSource = source;

          if (postCssConfig) {
            const postCssResult = await (await Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('postcss')); })).default(postCssConfig.plugins).process(source, { ...postCssConfig.options,
              from: undefined,
              map: false
            });
            cssSource = postCssResult.css;
          }

          if (server && cssMap.has(id) && cssMap.get(id) !== source) {
            const {
              moduleGraph
            } = server;
            const moduleId = vite.normalizePath(path__default["default"].join(config.root, id));
            const module = moduleGraph.getModuleById(moduleId);

            if (module) {
              moduleGraph.invalidateModule(module);
            }

            server.ws.send({
              type: 'custom',
              event: styleUpdateEvent(id),
              data: cssSource
            });
          }

          cssMap.set(id, cssSource);
          return `import "${id}";`;
        }
      });
      return {
        code: output,
        map: {
          mappings: ''
        }
      };
    }

  };
}

exports.vanillaExtractPlugin = vanillaExtractPlugin;
