"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.attachParamsToUrl = exports.getParam = exports.getOriginFromUrl = void 0;
var getOriginFromUrl = function (url) {
    var _a;
    var cleanedHref = url === null || url === void 0 ? void 0 : url.replace("#", "");
    return (_a = new URL(cleanedHref)) === null || _a === void 0 ? void 0 : _a.origin;
};
exports.getOriginFromUrl = getOriginFromUrl;
var getParam = function (href, name) {
    var _a;
    var cleanedHref = href === null || href === void 0 ? void 0 : href.replace("#", "");
    var params = (_a = new URL(cleanedHref)) === null || _a === void 0 ? void 0 : _a.searchParams;
    return params === null || params === void 0 ? void 0 : params.get(name);
};
exports.getParam = getParam;
var attachParamsToUrl = function (url, params) {
    if (!url || !(params === null || params === void 0 ? void 0 : params.length))
        return url;
    var attachedUrl = url;
    var indexParam = url === null || url === void 0 ? void 0 : url.indexOf("?");
    if (indexParam !== -1) {
        params === null || params === void 0 ? void 0 : params.forEach(function (p) {
            if ((p === null || p === void 0 ? void 0 : p.name) && (p === null || p === void 0 ? void 0 : p.value)) {
                attachedUrl = "".concat(attachedUrl, "&").concat(p === null || p === void 0 ? void 0 : p.name, "=").concat(p === null || p === void 0 ? void 0 : p.value);
            }
        });
        return attachedUrl;
    }
    params === null || params === void 0 ? void 0 : params.forEach(function (p, i) {
        if ((p === null || p === void 0 ? void 0 : p.name) && (p === null || p === void 0 ? void 0 : p.value)) {
            if (i === 0) {
                attachedUrl = "".concat(attachedUrl, "?").concat(p === null || p === void 0 ? void 0 : p.name, "=").concat(p === null || p === void 0 ? void 0 : p.value);
            }
            else {
                attachedUrl = "".concat(attachedUrl, "&").concat(p === null || p === void 0 ? void 0 : p.name, "=").concat(p === null || p === void 0 ? void 0 : p.value);
            }
        }
    });
    return attachedUrl;
};
exports.attachParamsToUrl = attachParamsToUrl;
