'use strict';

window.filter = (function () {
  var RANDOM_COUNTER = 10;
  var DEBOUNCE_INTERVAL = 500;
  var photos = [];

  var filtersButtons = document.querySelectorAll('.img-filters__button');
  var filtersDefaultButton = document.querySelector('#filter-default');
  var filtersRandomButton = document.querySelector('#filter-random');
  var filtersTrendButton = document.querySelector('#filter-discussed');

  var resetButtons = function (thumbnail) {
    thumbnail.addEventListener('click', function () {
      for (var i = 0; i < filtersButtons.length; i++) {
        filtersButtons[i].classList.remove('img-filters__button--active');
      }
      thumbnail.classList.add('img-filters__button--active');
      window.filter.photos = window.gallery.defaultPhotos.slice();
      window.gallery.deletePhotos();
    });
  };

  for (var k = 0; k < filtersButtons.length; k++) {
    resetButtons(filtersButtons[k]);
  }

  var getTrendArr = function (array) {
    array.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return array;
  };

  filtersRandomButton.addEventListener('click', function () {
    window.filter.photos = window.math.getRandomSortArr(window.filter.photos);
    window.filter.updatePhotos(RANDOM_COUNTER);
  });

  filtersTrendButton.addEventListener('click', function () {
    window.filter.photos = getTrendArr(window.filter.photos);
    window.filter.updatePhotos(window.filter.photos.length);
  });

  filtersDefaultButton.addEventListener('click', function () {
    window.filter.updatePhotos(window.gallery.defaultPhotos.length);
  });

  return {
    photos: photos,
    updatePhotos: function (quantity) {
      window.setTimeout(function () {
        window.gallery.renderTemplatePhoto(window.filter.photos, quantity);
      }, DEBOUNCE_INTERVAL);
    }
  };
})();
