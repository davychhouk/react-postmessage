import React from "react";
import { IFRAME_ID } from "../constants";
export var Iframe = function (_a) {
    var url = _a.url, height = _a.height, width = _a.width;
    return (React.createElement("iframe", { id: IFRAME_ID, src: url, width: width, height: height }));
};
