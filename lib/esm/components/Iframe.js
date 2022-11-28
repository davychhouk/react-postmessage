import React from "react";
import { TARGET_ID } from "../constants";
export var Iframe = function (_a) {
    var url = _a.url, _b = _a.height, height = _b === void 0 ? 450 : _b, _c = _a.width, width = _c === void 0 ? 450 : _c;
    return (React.createElement("iframe", { id: TARGET_ID, src: url, width: width, height: height }));
};
