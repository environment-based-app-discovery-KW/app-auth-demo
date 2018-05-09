//TODO: install from npm

var deviceReadyPromise = new Promise(function(resolve){
  document.addEventListener("deviceready", function () {
    resolve();
  }, false);
});

window.sys={
  hello:function(){
    console.log("hello");
  },
  toast:function(text){
    window.plugins.toast.showLongBottom(text)
  },
  getUserInfo:function(fields, successCallback, failCallback){
    // fields: [ "name", "mobile", "email" ]
    deviceReadyPromise.then(function(){
      cordova.exec(function(data){ successCallback(JSON.parse(data)) }, failCallback, 'Auth', 'getUserInfo', fields);
    });
  },
  getUserIdentity:function(successCallback){
    // fields: [ "name", "mobile", "email" ]
    deviceReadyPromise.then(function(){
      cordova.exec(function(data){ successCallback(JSON.parse(data)) }, function() {}, 'Auth', 'getUserIdentity');
    });
  },
};