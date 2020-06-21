'use strict';
window.formFilter = (function (wrapper, img) {
  // Задание 4.2.3 Наложение эффекта на изображение
  var effectsOptions = wrapper.querySelectorAll('.effects__radio');
  var effectSaturation = wrapper.querySelector('.effect-level__value');
  var effectSaturationPin = wrapper.querySelector('.effect-level__pin');
  var effectSaturationDepth = wrapper.querySelector('.effect-level__depth');
  var effectSaturationLine = wrapper.querySelector('.effect-level__line');
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

  var movePin = function (evt) {
    var limitMovementX = {
      min: effectSaturationLine.offsetLeft - 20,
      max: effectSaturationLine.offsetLeft + effectSaturationLine.offsetWidth - effectSaturationPin.offsetWidth
    };
    var pinCoord = effectSaturationPin.offsetLeft + evt.movementX;
    if (pinCoord < limitMovementX.min) {
      pinCoord = limitMovementX.min;
    }
    if (pinCoord > limitMovementX.max) {
      pinCoord = limitMovementX.max;
    }
    effectSaturationPin.style.left = pinCoord + 'px';
    effectSaturationDepth.style.width = pinCoord + 'px';
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
  };

  var onPinMouseup = function () {
    document.removeEventListener('mousemove', movePin);
    document.removeEventListener('mouseup', onPinMouseup);
  };
  effectSaturationPin.addEventListener('mousedown', function () {
    effectSaturationPin.addEventListener('dragstart', function (evt) {
      evt.preventDefault();
    });
    document.addEventListener('mousemove', movePin);
    document.addEventListener('mouseup', onPinMouseup);
  });

  return {
    effectsOptions: effectsOptions,
    effectsInformation: effectsInformation,
    addThumbnailClickHandler: function (thumbnail, effect) {
      thumbnail.addEventListener('click', function () {
        img.setAttribute('class', '');
        img.style.filter = 'none';
        img.classList.add('effects__preview--' + effect.name);
        var filterValue = effect.start;
        if (effect.units) {
          filterValue += effect.units;
        }
        img.style.filter = effect.filter + '(' + filterValue + ')';
        effectSaturation.setAttribute('value', '100');
        effectSaturationPin.style.left = effectSaturation.value + '%';
        effectSaturationDepth.style.width = effectSaturation.value + '%';
      });
    }
  };
})(document.querySelector('.img-upload__overlay'), document.querySelector('.img-upload__preview img'));
