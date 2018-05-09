const _ = require('lodash');
const ReactDOM = require("react-dom");
const React = require("react");
const $ = React.createElement;

window.onload = function () {
  var root = document.createElement("div");
  document.body.appendChild(root);
  ReactDOM.render($("div", null, "Hello World"), root);
};

document.addEventListener("deviceready", function () {
  sys.getUserInfo(["name", "mobile", "email"], function (data) {
    alert("successful");
    alert(JSON.stringify(data, null, 4));
  }, function () {
    alert("failed");
  });
}, false);