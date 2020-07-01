'use strict';
window.form = (function () {
  // Задание 4.2.1 Загрузка изображения и показ формы редактирования

  var uploadFile = document.querySelector('#upload-file');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadWrapper = document.querySelector('.img-upload__overlay');
  document.addEventListener('keydown', window.popup.onPopupEscPress(uploadWrapper, uploadFile));
  uploadFile.addEventListener('change', function () {
    window.popup.toggleModal(uploadWrapper);
  });

  uploadClose.addEventListener('click', function () {
    window.popup.toggleModal(uploadWrapper);
    window.formClear.clearInputFile(uploadFile);
  });
})();
