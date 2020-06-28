'use strict';
window.formFilter = (function (wrapper, img) {
  // Задание 4.2.3 Наложение эффекта на изображение
  var effectsOptions = wrapper.querySelectorAll('.effects__radio');
  var effectSaturation = wrapper.querySelector('.effect-level__value');
  var effectSaturationPin = wrapper.querySelector('.effect-level__pin');
  var effectSaturationDepth = wrapper.querySelector('.effect-level__depth');
  var effectSaturationLine = wrapper.querySelector('.effect-level__line');
  var defaultFilterValue = effectSaturation.value;
  var effectsInformation = [{
    name: 'none',
    filter: 'none',
    start: ''
  },
  {
    name: 'chrome',
    filter: 'grayscale',
    start: 1,
    min: 0,
    max: 1
  },
  {
    name: 'sepia',
    filter: 'sepia',
    start: 1,
    min: 0,
    max: 1
  },
  {
    name: 'marvin',
    filter: 'invert',
    start: 100,
    min: 0,
    max: 100,
    units: '%'
  },
  {
    name: 'phobos',
    filter: 'blur',
    start: 3,
    min: 0,
    max: 3,
    units: 'px'
  },
  {
    name: 'heat',
    filter: 'brightness',
    start: 3,
    min: 1,
    max: 3
  }];

  window.slider.dragSlider(effectSaturationPin, effectSaturationLine, effectSaturationDepth);

  return {
    effectsOptions: effectsOptions,
    effectsInformation: effectsInformation,
    addThumbnailClickHandler: function (thumbnail, effect) {
      thumbnail.addEventListener('click', function () {
        for (var i = 0; i < effectsOptions.length; i++) {
          img.classList.remove('effects__preview--' + effectsInformation[i].name);
        }
        img.style.filter = 'none';
        img.classList.add('effects__preview--' + effect.name);
        var filterValue = effect.start;
        if (effect.units) {
          filterValue += effect.units;
        }
        img.style.filter = effect.filter + '(' + filterValue + ')';
        effectSaturation.setAttribute('value', defaultFilterValue);
        effectSaturationPin.style.left = effectSaturation.value + '%';
        effectSaturationDepth.style.width = effectSaturation.value + '%';
      });
    },
    changeSaturation: function () {
      var pinCoord = effectSaturationPin.offsetLeft;
      var saturationValue = Math.round(pinCoord / effectSaturationLine.offsetWidth * 100);
      effectSaturation.setAttribute('value', saturationValue);
      var currentNumber;
      for (var i = 0; i < effectsOptions.length; i++) {
        if (effectsOptions[i].checked) {
          currentNumber = i;
        }
      }
      var filterValue = saturationValue * (effectsInformation[currentNumber].max - effectsInformation[currentNumber].min) / 100 + effectsInformation[currentNumber].min;
      if (effectsInformation[currentNumber].units) {
        filterValue += effectsInformation[currentNumber].units;
      }
      img.style.filter = effectsInformation[currentNumber].filter + '(' + filterValue + ')';
    }
  };
})(document.querySelector('.img-upload__overlay'), document.querySelector('.img-upload__preview img'));
