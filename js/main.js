'use strict';

for (var b = 0; b < window.gallery.photosInformation.length; b++) {
  window.gallery.pictureFragment.appendChild(window.gallery.renderPicture(window.gallery.photosInformation[b]));
}

document.querySelector('.pictures').appendChild(window.gallery.pictureFragment);

var bigPictureOpen = document.querySelectorAll('.picture');
for (var a = 0; a < bigPictureOpen.length; a++) {
  window.preview.addPictureClickHandler(bigPictureOpen[a], window.gallery.photosInformation[a]);
}

for (var c = 0; c < window.formFilter.effectsOptions.length; c++) {
  window.formFilter.addThumbnailClickHandler(window.formFilter.effectsOptions[c], window.formFilter.effectsInformation[c]);
}

