"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports["default"] = renderToJson;

function renderToJson(element) {
  var res = {};
  if (!element || !element.type) {
    return {};
  }
  var Component = element.type;
  res.name = element.type;
  res.attributes = _extends({}, element.props);
  var children = element.props ? element.props.children : null;
  delete res.attributes.children;
  if (typeof Component != "string") {
    res.name = Component.name;
    var context = element.context || {};
    if (typeof Component.prototype.render == "function") {
      // ReactComponent
      children = new Component(element.props, context).render();
    } else {
      // function component
      children = Component(element.props, context);
    }
  }
  if (Array.isArray(children)) {
    res.children = children.map(function (child) {
      return renderToJson(child);
    });
    return res;
  }
  res.children = [renderToJson(children)];
  return res;
}

;
module.exports = exports["default"];