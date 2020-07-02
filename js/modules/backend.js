'use strict';

window.backend = (function () {
  var URL = ' https://javascript.pages.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;
  var uploadFile = document.querySelector('#upload-file');
  var uploadWrapper = document.querySelector('.img-upload__overlay');
  var showResult = function (block) {
    var template = block.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(template);
    var main = document.querySelector('main');
    main.appendChild(fragment);
  };


  return {
    savePhoto: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';
      var successTemplate = document.querySelector('#success').content.querySelector('.success');
      var errorTemplate = document.querySelector('#error').content.querySelector('.error');
      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
          window.formReset.fullReserForm(uploadFile);
          showResult(successTemplate);
          var successButton = document.querySelector('.success__button');
          var successModal = document.querySelector('.success');
          successButton.addEventListener('click', function () {
            successModal.remove();
          });
          document.addEventListener('keydown', window.popup.removePopupEscPress(successModal));
        } else {
          window.popup.closePopup(uploadWrapper, uploadFile);
          showResult(errorTemplate);
          var errorButton = document.querySelector('.error__button');
          var errorModal = document.querySelector('.error');
          errorButton.addEventListener('click', function () {
            errorModal.remove();
          });
          document.addEventListener('keydown', window.popup.removePopupEscPress(errorModal));
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.open('POST', URL);
      xhr.send(data);
    },

    loadPhotos: function (onLoad, onError) {

      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === StatusCode.OK) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });
      xhr.addEventListener('error', function () {
        onError('Произошла ошибка соединения');
      });
      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open('GET', URL + '/data');
      xhr.send();
    },

    error: function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: #dc291a;';
      node.style.position = 'absolute';
      node.style.left = 0;
      node.style.right = 0;
      node.style.fontSize = '22px';
      node.style.fontFamily = '"Open Sans", "Arial", sans-serif;';

      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    }
  };
})();
