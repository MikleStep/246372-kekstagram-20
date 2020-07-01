'use strict';
window.formReset = (function () {
  var previewImg = document.querySelector('.img-upload__preview img');

  var resetImg = function () {
    var effectLevel = document.querySelector('.img-upload__effect-level');
    var imgSize = document.querySelector('.scale__control--value');
    document.querySelector('#effect-none').setAttribute('checked', true);

    effectLevel.style.display = 'none';

    previewImg.style.filter = 'none';

    window.formFilter.effectSaturation.setAttribute('value', window.formFilter.defaultFilterValue);

    imgSize.setAttribute('value', window.formResize.imgSizeMax + '%');
    previewImg.style.transform = 'scale' + '(' + window.formResize.imgSizeMax / 100 + ')';
  };

  return {
    resetInputs: function () {
      document.querySelector('.text__hashtags').value = '';
      document.querySelector('.text__description').value = '';
      document.querySelector('.social__footer-text').value = '';
    },
    resetForm: function (input) {
      if (input.value) {
        var form = document.createElement('form');
        var ref = input.nextSibling;
        form.appendChild(input);
        form.reset();
        ref.parentNode.insertBefore(input, ref);
      }
    },
    resetClassFilter: function () {
      for (var i = 0; i < window.formFilter.effectsOptions.length; i++) {
        previewImg.classList.remove('effects__preview--' + window.formFilter.effectsInformation[i].name);
      }
    },
    fullReserForm: function (input) {
      window.formReset.resetForm(input);
      window.formReset.resetClassFilter();
      resetImg();
    }
  };
})();
