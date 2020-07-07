// Задание 4.2.2 Редактирование изображения и ограничения, накладываемые на поля
'use strict';
window.formResize = (function (wrapper, img) {
  var IMG_SIZE_STEP = 25;
  var IMG_SIZE_MAX = 100;
  var IMG_SIZE_MIN = 25;
  var imgIncrease = wrapper.querySelector('.scale__control--bigger');
  var imgReduce = wrapper.querySelector('.scale__control--smaller');
  var imgSize = wrapper.querySelector('.scale__control--value');

  img.style.transition = 'transform 0.2s linear';

  var imgValue = parseInt(imgSize.value, 10);
  img.style.transform = 'scale' + '(' + imgValue / 100 + ')';

  var changeSizeImg = function (step) {
    imgValue += step;
    if (imgValue > IMG_SIZE_MAX) {
      imgValue = IMG_SIZE_MAX;
    } else if (imgValue < IMG_SIZE_MIN) {
      imgValue = IMG_SIZE_MIN;
    }
    img.style.transform = 'scale' + '(' + imgValue / IMG_SIZE_MAX + ')';
    return imgValue;
  };

  imgIncrease.addEventListener('click', function () {
    imgSize.setAttribute('value', changeSizeImg(IMG_SIZE_STEP) + '%');
  });

  imgReduce.addEventListener('click', function () {
    imgSize.setAttribute('value', changeSizeImg(-IMG_SIZE_STEP) + '%');
  });

  return {
    imgSizeMax: IMG_SIZE_MAX
  };
})(document.querySelector('.img-upload__overlay'), document.querySelector('.img-upload__preview img'));
