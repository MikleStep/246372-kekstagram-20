'use strict';

window.filter = (function () {
  var RANDOM_COUNTER = 10;
  var DEBOUNCE_INTERVAL = 500;
  var photos = [];

  var filtersButtons = document.querySelectorAll('.img-filters__button');
  var filtersDefaultButton = document.querySelector('#filter-default');
  var filtersRandomButton = document.querySelector('#filter-random');
  var filtersTrendButton = document.querySelector('#filter-discussed');
  var imgFilters = document.querySelector('.img-filters');

  var resetButtons = function (thumbnail) {
    thumbnail.addEventListener('click', function () {
      for (var i = 0; i < filtersButtons.length; i++) {
        filtersButtons[i].classList.remove('img-filters__button--active');
      }
      thumbnail.classList.add('img-filters__button--active');
      window.filter.photos = window.gallery.defaultPhotos;
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

  var disableFilter = function (button) {
    for (var i = 0; i < filtersButtons.length; i++) {
      filtersButtons[i].removeAttribute('disabled');
    }
    button.setAttribute('disabled', 'true');
  };

  filtersRandomButton.addEventListener('click', function () {
    disableFilter(filtersRandomButton);
    window.filter.photos = window.math.getRandomSortArr(window.filter.photos);
    window.filter.updatePhotos(RANDOM_COUNTER, window.filter.hideFilters);
  });

  filtersTrendButton.addEventListener('click', function () {
    disableFilter(filtersTrendButton);
    window.filter.photos = getTrendArr(window.filter.photos);
    window.filter.updatePhotos(window.filter.photos.length, window.filter.hideFilters);
  });

  filtersDefaultButton.addEventListener('click', function () {
    disableFilter(filtersDefaultButton);
    window.filter.updatePhotos(window.gallery.defaultPhotos.length, window.filter.hideFilters);
  });

  return {
    photos: photos,
    updatePhotos: function (quantity, callback) {
      imgFilters.classList.add('img-filters--inactive');
      window.setTimeout(function () {
        window.gallery.renderTemplatePhoto(window.filter.photos, quantity);
        window.gallery.addPhotoHendler();
        if (callback) {
          callback();
        }
      }, DEBOUNCE_INTERVAL);
    },
    hideFilters: function () {
      imgFilters.classList.remove('img-filters--inactive');
    }
  };
})();
