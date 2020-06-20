'use strict';
window.form = (function () {
  // Задание 4.2.1 Загрузка изображения и показ формы редактирования

  var uploadFile = document.querySelector('#upload-file');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadWrapper = document.querySelector('.img-upload__overlay');
  uploadFile.addEventListener('change', function () {
    window.popup.openModal(uploadWrapper);
  });

  uploadClose.addEventListener('click', function () {
    window.popup.closeModal(uploadWrapper);
    uploadFile.value = '';
  });
})();
