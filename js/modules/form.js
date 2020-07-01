'use strict';
window.form = (function () {
  // Задание 4.2.1 Загрузка изображения и показ формы редактирования

  var uploadFile = document.querySelector('#upload-file');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadWrapper = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('#upload-select-image');

  document.addEventListener('keydown', window.popup.onPopupEscPress(uploadWrapper, uploadFile));

  uploadFile.addEventListener('change', function () {
    window.popup.toggleModal(uploadWrapper);
  });

  uploadClose.addEventListener('click', function () {
    window.popup.toggleModal(uploadWrapper);
    window.formReset.fullReserForm(uploadFile);
    window.formReset.resetInputs();
  });

  var submitHandler = function (evt) {
    window.backend.savePhoto(new FormData(uploadForm), function () {
      window.popup.toggleModal(uploadWrapper);
      window.formReset.fullReserForm(uploadFile);
      window.formReset.resetInputs();
    }, window.backend.error);
    evt.preventDefault();
  };

  uploadForm.addEventListener('submit', submitHandler);
})();
