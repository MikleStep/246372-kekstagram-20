'use strict';
window.form = (function (form, hashtagsContainter) {
  // Задание 4.2.4 Валидация хеш-тегов

  hashtagsContainter.addEventListener('click', function () {
    if (hashtagsContainter.value.substr(-1) !== '#' && hashtagsContainter.value.length < 1) {
      hashtagsContainter.value += '#';
    }
  });
  hashtagsContainter.addEventListener('keydown', function (evt) {
    hashtagsContainter.value = '#' + hashtagsContainter.value.slice(1);
    if (evt.key === ' ') {
      evt.preventDefault();
    }
    if (evt.key === '#') {
      evt.preventDefault();
    }
    if (evt.key === ' ' && hashtagsContainter.value.substr(-1) !== '#' && hashtagsContainter.value.substr(-1) !== ' ') {
      evt.preventDefault();
      hashtagsContainter.value += ' #';
    }
  });

  var checkDuplicate = function (array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i] === array[j] || array[i] === array[j] + ' ') {
          return false;
        }
      }
    }
    return true;
  };

  var checkCase = function (array) {
    for (var i = 0; i < array.length; i++) {
      for (var j = i + 1; j < array.length; j++) {
        if (array[i].toLowerCase() === array[j].toLowerCase() || array[i].toLowerCase() === array[j].toLowerCase() + ' ') {
          return false;
        }
      }
    }
    return true;
  };

  var checkLength = function (array) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].length > 20) {
        return false;
      }
    }
    return true;
  };

  var maxHashtags = 5;
  var hashtagsArray;

  form.addEventListener('input', function () {
    hashtagsArray = hashtagsContainter.value.split('#');
    hashtagsArray.splice(0, 1);
    var re = /[^a-zа-яё\d#]/;
    for (var i = 0; i < hashtagsArray.length; i++) {
      if (re.test(hashtagsArray[i])) {
        hashtagsContainter.setCustomValidity('В хештеге можно использовать только буквы,цифры и слитное написание');
      } else if (checkLength(hashtagsArray) === false) {
        hashtagsContainter.setCustomValidity('Слишком большой хештег. Максимальная длина 20 символов (Включаюя #)');
      } else if (checkCase(hashtagsArray) === false) {
        hashtagsContainter.setCustomValidity('Найден дубликат. Проверьте регистр');
      } else if (checkDuplicate(hashtagsArray) === false) {
        hashtagsContainter.setCustomValidity('Найден дубликат');
      } else {
        hashtagsContainter.setCustomValidity('');
      }
    }
    if (hashtagsArray.length > maxHashtags) {
      hashtagsContainter.setCustomValidity('Можно максимум ' + maxHashtags + ' Хештегов. Удалите пожалуйста лишние');
    }
  });
})(document.querySelector('.img-upload__form'), document.querySelector('.text__hashtags'));
