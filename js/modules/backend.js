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
  var currentInner;
  var currentModal;

  var closeModalHendler = function (evt) {
    var isClickInside = currentInner.contains(evt.target);

    if (!isClickInside) {
      currentModal.remove();
      document.querySelector('body').classList.toggle('modal-open');
    }
    document.removeEventListener('click', closeModalHendler, false);
  };

  var closeResult = function (button, modal, inner) {

    document.querySelector('body').classList.toggle('modal-open');

    button.addEventListener('click', function () {
      modal.remove();
      document.querySelector('body').classList.toggle('modal-open');
    });
    currentInner = inner;
    currentModal = modal;
    document.addEventListener('click', closeModalHendler);

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

          window.formReset.fullResetForm(uploadFile);

          showResult(successTemplate);

          var successButton = document.querySelector('.success__button');
          var successModal = document.querySelector('.success');
          var successInner = document.querySelector('.success__inner');

          closeResult(successButton, successModal, successInner);

        } else {
          window.popup.closePopup(uploadWrapper, uploadFile);
          showResult(errorTemplate);

          var errorButton = document.querySelector('.error__button');
          var errorModal = document.querySelector('.error');
          var errorInner = document.querySelector('.error__inner');

          closeResult(errorButton, errorModal, errorInner);
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

    showError: function (errorMessage) {
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
