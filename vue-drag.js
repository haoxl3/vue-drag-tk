/*
*Vue-drag.js v1.0.0
*By haoxl
*/
(function () {
  var vueDrag = {};
  vueDrag.install = function (Vue) {
    Vue.directive('drag', {
      bind: function (el, binding, vnode) {
        var isChildDom;
        if (binding.arg !== undefined) {
          isChildDom = true
        } else {
          isChildDom = false
        }
        var offsetX = 0;
        var offsetY = 0;
        function down(e) {
          offsetX = (e.pageX - el.offsetLeft);
          offsetY = (e.pageY - el.offsetTop);
          addEventListener('mousemove', move);
          addEventListener('mouseup', up);
          return false;
        }
        function move(e) {
          let oDivLeft = e.pageX - offsetX;
          let oDivTop = e.pageY - offsetY;
          if(oDivLeft < 0){
            oDivLeft = 0;
          }else if(oDivLeft > document.documentElement.clientWidth - el.offsetWidth){
            oDivLeft = document.documentElement.clientWidth - el.offsetWidth;
          }
          if(oDivTop < 0){
            oDivTop = 0;
          }else if(oDivTop > document.documentElement.clientHeight - el.offsetHeight){
            oDivTop = document.documentElement.clientHeight - el.offsetHeight;
          }
          el.style.top = oDivTop + 'px'
        }
        function up() {
          removeEventListener('mousemove', move);
          removeEventListener('mouseup', up);
        }
        el.addEventListener('mousedown', down)
      }
    })
  }
  if (typeof exports == "object") {
    module.exports = vueDrag;
  } else if (typeof define == "function" && define.amd) {
    define([], function () {
      return vueDrag
    })
  } else if (window.Vue) {
    window.vueDrag = vueDrag;
    Vue.use(vueDrag);
  }
})();
