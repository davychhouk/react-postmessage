"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Iframe = void 0;
var react_1 = __importDefault(require("react"));
var constants_1 = require("../constants");
var Iframe = function (_a) {
    var url = _a.url, _b = _a.height, height = _b === void 0 ? 450 : _b, _c = _a.width, width = _c === void 0 ? 450 : _c;
    return (react_1.default.createElement("iframe", { id: constants_1.TARGET_ID, src: url, width: width, height: height }));
};
exports.Iframe = Iframe;
