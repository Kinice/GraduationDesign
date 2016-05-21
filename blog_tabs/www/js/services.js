angular.module('starter.services', [])
.factory('ls',function(){
    return{
      set : function(key,value){
        localStorage[key] = value;
      },
      get : function(key,defaultValue){
        return localStorage[key] || defaultValue;
      }
    }
})
.factory('ss',function(){
  return{
    set : function(key,value){
      sessionStorage[key] = value;
    },
    get : function(key,defaultValue){
      return sessionStorage[key] || defaultValue;
    }
  }
});
