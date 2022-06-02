"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.vanillaExtractPlugin = void 0;
var integration_1 = require("@vanilla-extract/integration");
var posix_1 = require("path/posix");
function vanillaExtractPlugin(_a) {
    var _b = _a === void 0 ? {} : _a, identifiers = _b.identifiers, _c = _b.cwd, cwd = _c === void 0 ? process.cwd() : _c;
    var emittedFiles = new Map();
    var isProduction = process.env.NODE_ENV === "production";
    return {
        name: "vanilla-extract",
        buildStart: function () {
            emittedFiles.clear();
        },
        transform: function (_code, id) {
            return __awaiter(this, void 0, void 0, function () {
                var index, filePath, _a, source, watchFiles, _i, watchFiles_1, file;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!integration_1.cssFileFilter.test(id)) {
                                return [2 /*return*/, null];
                            }
                            index = id.indexOf("?");
                            filePath = index === -1 ? id : id.substring(0, index);
                            return [4 /*yield*/, (0, integration_1.compile)({
                                    filePath: filePath,
                                    cwd: cwd
                                })];
                        case 1:
                            _a = _b.sent(), source = _a.source, watchFiles = _a.watchFiles;
                            for (_i = 0, watchFiles_1 = watchFiles; _i < watchFiles_1.length; _i++) {
                                file = watchFiles_1[_i];
                                this.addWatchFile(file);
                            }
                            return [2 /*return*/, (0, integration_1.processVanillaFile)({
                                    source: source,
                                    filePath: filePath,
                                    identOption: identifiers !== null && identifiers !== void 0 ? identifiers : (isProduction ? "short" : "debug")
                                })];
                    }
                });
            });
        },
        resolveId: function (id) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, fileName, source, assetId;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!integration_1.virtualCssFileFilter.test(id)) {
                                return [2 /*return*/, null];
                            }
                            return [4 /*yield*/, (0, integration_1.getSourceFromVirtualCssFile)(id)];
                        case 1:
                            _a = _b.sent(), fileName = _a.fileName, source = _a.source;
                            if (!emittedFiles.get(fileName)) {
                                assetId = this.emitFile({
                                    type: "asset",
                                    name: fileName,
                                    source: source
                                });
                                emittedFiles.set(fileName, assetId);
                            }
                            // Resolve to a temporary external module
                            return [2 /*return*/, {
                                    id: fileName,
                                    external: true
                                }];
                    }
                });
            });
        },
        renderChunk: function (code, chunkInfo) {
            var _this = this;
            // For all imports in this chunk that we have emitted files for...
            var importsToReplace = chunkInfo.imports.filter(function (fileName) {
                return emittedFiles.get(fileName);
            });
            if (!importsToReplace.length) {
                return null;
            }
            // ...replace import paths with relative paths to emitted css files
            var chunkPath = (0, posix_1.dirname)(chunkInfo.fileName);
            return importsToReplace.reduce(function (codeResult, importPath) {
                var assetId = emittedFiles.get(importPath);
                var assetName = _this.getFileName(assetId);
                var fixedImportPath = "./".concat((0, posix_1.normalize)((0, posix_1.relative)(chunkPath, assetName)));
                return codeResult.replace(importPath, fixedImportPath);
            }, code);
        }
    };
}
exports.vanillaExtractPlugin = vanillaExtractPlugin;
