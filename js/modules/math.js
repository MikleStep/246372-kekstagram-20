'use strict';

window.math = (function () {

  return {
    // Рандомизатор от/до
    getRandomArbitrary: function (min, max) {
      return Math.round(Math.random() * (max - min) + min);
    },

    // Рандомизатор до определенного числа
    getRandomInt: function (max) {
      return Math.floor(Math.random() * max);
    },
    getRandomSortArr: function (array) {
      array.sort(function () {
        return Math.random() - 0.5;
      });
      return array;
    }
  };
})();
