'use strict';

var successLoadPhotos = function (photo) {
  window.gallery.renderTemplatePhoto(photo);
  var bigPictureOpen = document.querySelectorAll('.picture');
  for (var i = 0; i < bigPictureOpen.length; i++) {
    window.preview.addPictureClickHandler(bigPictureOpen[i], photo[i]);
  }
};
window.backend.loadPhotos(successLoadPhotos, window.backend.error);
for (var c = 0; c < window.formFilter.effectsOptions.length; c++) {
  window.formFilter.addThumbnailClickHandler(window.formFilter.effectsOptions[c], window.formFilter.effectsInformation[c]);
}

