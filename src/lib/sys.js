//TODO: install from npm

var deviceReadyPromise = new Promise(function (resolve) {
  document.addEventListener("deviceready", function () {
    resolve();
  }, false);
});

window.sys = {
  toast: function (text) {
    window.plugins.toast.showLongBottom(text)
  },
  getUserInfo: function (fields, successCallback, failCallback) {
    // fields: [ "name", "mobile", "email" ]
    deviceReadyPromise.then(function () {
      cordova.exec(function (data) {
        successCallback(JSON.parse(data))
      }, failCallback, 'Auth', 'getUserInfo', fields);
    });
  },
  getUserIdentity: function (successCallback) {
    // fields: [ "name", "mobile", "email" ]
    deviceReadyPromise.then(function () {
      cordova.exec(function (data) {
        successCallback(JSON.parse(data))
      }, function () {
      }, 'Auth', 'getUserIdentity');
    });
  },
};

// shim when developing on a PC
window.sys_shim = {
  toast: function (text) {
    alert(text)
  },
  getUserInfo: function (fields, successCallback, failCallback) {
    if (confirm("授权 " + fields.join(",") + "?")) {
      var data = {};
      if (fields.indexOf("email") >= 0) {
        data["email"] = localStorage["email_shim"]
      }
      if (fields.indexOf("name") >= 0) {
        data["name"] = localStorage["name_shim"]
      }
      if (fields.indexOf("mobile") >= 0) {
        data["mobile"] = localStorage["mobile_shim"]
      }
      successCallback(data)
    } else {
      failCallback();
    }
  },
  getUserIdentity: function (successCallback) {
    cordova.exec(function (data) {
      successCallback(JSON.parse(data))
    }, function () {
    }, 'Auth', 'getUserIdentity');
  },
};

if (!window.cordova) {
  if (!localStorage['email_shim']) {
    localStorage['email_shim'] = (Math.random() + "").substring(2, 10) + "@example.com";
  }
  if (!localStorage['name_shim']) {
    localStorage['name_shim'] = Math.random().toString(36).substring(7) + " " + Math.random().toString(36).substring(7);
  }
  if (!localStorage['mobile_shim']) {
    localStorage['mobile_shim'] = "1" + (Math.random() + "").substring(2, 12);
  }

  if (!localStorage['public_key_shim']) {
    //TODO
  }

  if (!localStorage['private_key_shim']) {
    //TODO
  }

  window.sys = window.sys_shim;
}