import { TARGET_ID, TYPES } from "../constants";
import { getOriginFromUrl, getParam } from "./params";
export function initRequester(_a) {
    var url = _a.url, checkOrigin = _a.checkOrigin, data = _a.data, hook = _a.hook, close = _a.close;
    if (window && document) {
        var iframeElement = document === null || document === void 0 ? void 0 : document.getElementById(TARGET_ID);
        var iframeWindow_1 = iframeElement === null || iframeElement === void 0 ? void 0 : iframeElement.contentWindow;
        /**
         * Register listener
         */
        window === null || window === void 0 ? void 0 : window.addEventListener("message", function (e) {
            var _a, _b;
            if (checkOrigin && (e === null || e === void 0 ? void 0 : e.origin) !== getOriginFromUrl(url))
                return;
            /**
             * Handshake when iframe widow loaded
             * Send data
             */
            var type = (_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type;
            if (type === TYPES.handshake) {
                iframeWindow_1 === null || iframeWindow_1 === void 0 ? void 0 : iframeWindow_1.postMessage({
                    type: TYPES === null || TYPES === void 0 ? void 0 : TYPES.request,
                    payload: data,
                }, e === null || e === void 0 ? void 0 : e.origin);
                return;
            }
            /**
             * Listen for transfer
             * And hook the data transfer
             */
            var payload = (_b = e === null || e === void 0 ? void 0 : e.data) === null || _b === void 0 ? void 0 : _b.payload;
            if (type === TYPES.response && payload) {
                hook && hook(payload);
                return;
            }
            /**
             * Listen for close
             * Cleanup on close
             */
            if (type === TYPES.close) {
                close && close();
                window === null || window === void 0 ? void 0 : window.removeEventListener("message", function () { });
                return;
            }
        }, false);
    }
}
export function initReceiver(_a) {
    var _b, _c;
    var fromOrigin = _a.fromOrigin, setFromOrigin = _a.setFromOrigin, checkOrigin = _a.checkOrigin, hook = _a.hook;
    if (window) {
        /**
         * Listen for transfer
         */
        window.addEventListener("message", function (e) {
            var _a, _b;
            if (checkOrigin && (e === null || e === void 0 ? void 0 : e.origin) !== fromOrigin)
                return;
            var type = (_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type;
            var payload = (_b = e === null || e === void 0 ? void 0 : e.data) === null || _b === void 0 ? void 0 : _b.payload;
            if (type === TYPES.request && payload) {
                hook && hook(payload);
                return;
            }
        }, false);
        /**
         * Handshake origin
         */
        var origin_1 = getParam((_b = window === null || window === void 0 ? void 0 : window.location) === null || _b === void 0 ? void 0 : _b.href, "fromOrigin");
        if (origin_1) {
            (_c = window === null || window === void 0 ? void 0 : window.parent) === null || _c === void 0 ? void 0 : _c.postMessage({ type: TYPES.handshake }, origin_1);
            setFromOrigin(origin_1);
        }
    }
}
export function postMessage(data, targetOrigin) {
    var _a;
    if (window === null || window === void 0 ? void 0 : window.parent) {
        (_a = window.parent) === null || _a === void 0 ? void 0 : _a.postMessage({
            type: TYPES.response,
            payload: data,
        }, targetOrigin);
    }
}
export function signalClose(targetOrigin) {
    var _a;
    if (window === null || window === void 0 ? void 0 : window.parent) {
        (_a = window.parent) === null || _a === void 0 ? void 0 : _a.postMessage({
            type: TYPES.close,
        }, targetOrigin);
    }
}
/**
 * Clean up on unmount
 */
export var cleanUp = function () {
    return function () { return window === null || window === void 0 ? void 0 : window.removeEventListener("message", function () { }); };
};
