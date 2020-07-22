'use strict';

window.math = (function () {

  return {
    getRandomSortArr: function (array) {
      array.sort(function () {
        return Math.random() - 0.5;
      });
      return array;
    }
  };
})();
