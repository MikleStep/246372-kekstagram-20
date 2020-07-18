'use strict';
window.form = (function () {
  // Задание 4.2.1 Загрузка изображения и показ формы редактирования
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var uploadFile = document.querySelector('#upload-file');
  var uploadClose = document.querySelector('#upload-cancel');
  var uploadWrapper = document.querySelector('.img-upload__overlay');
  var uploadForm = document.querySelector('#upload-select-image');
  var effectLevel = document.querySelector('.img-upload__effect-level');
  var previewImg = document.querySelector('.img-upload__preview img');

  effectLevel.style.display = 'none';

  document.addEventListener('keydown', window.popup.onPopupEscPress(uploadWrapper, uploadFile));

  uploadFile.addEventListener('change', function () {
    window.popup.toggleModal(uploadWrapper);
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        previewImg.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  uploadClose.addEventListener('click', function () {
    window.popup.closePopup(uploadWrapper, uploadFile);
  });

  var submitHandler = function (evt) {
    window.backend.savePhoto(new FormData(uploadForm), function () {
      window.popup.closePopup(uploadWrapper, uploadFile);
    }, window.backend.showError);
    evt.preventDefault();
  };

  uploadForm.addEventListener('submit', submitHandler);

  return {
    uploadWrapper: uploadWrapper,
    uploadFile: uploadFile
  };
})();
