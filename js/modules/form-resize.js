// Задание 4.2.2 Редактирование изображения и ограничения, накладываемые на поля
'use strict';
window.formResize = (function (wrapper, img) {
  var imgIncrease = wrapper.querySelector('.scale__control--bigger');
  var imgReduce = wrapper.querySelector('.scale__control--smaller');
  var imgSize = wrapper.querySelector('.scale__control--value');

  img.style.transition = 'transform 0.2s linear';

  var imgValue = parseInt(imgSize.value, 10);
  img.style.transform = 'scale' + '(' + imgValue / 100 + ')';

  var changeSizeImg = function (step) {
    imgValue += step;
    if (imgValue > 100) {
      imgValue = 100;
    } else if (imgValue < 25) {
      imgValue = 25;
    }
    img.style.transform = 'scale' + '(' + imgValue / 100 + ')';
    return imgValue;
  };

  imgIncrease.addEventListener('click', function () {
    imgSize.setAttribute('value', changeSizeImg(25) + '%');
  });

  imgReduce.addEventListener('click', function () {
    imgSize.setAttribute('value', changeSizeImg(-25) + '%');
  });
})(document.querySelector('.img-upload__overlay'), document.querySelector('.img-upload__preview img'));
