'use strict';
window.gallery = (function (wrapper) {
  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var defaultPhotos = [];

  var addPhotoHendler = function () {
    var bigPictureOpen = document.querySelectorAll('.picture');
    for (var i = 0; i < bigPictureOpen.length; i++) {
      window.preview.addPictureClickHandler(bigPictureOpen[i], window.filter.photos[i]);
    }
  };

  var renderPhoto = function (photo) {
    var pictureElement = picturesTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').setAttribute('src', photo.url);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return pictureElement;
  };

  var successLoadPhotos = function (data) {
    window.gallery.defaultPhotos = data;
    window.filter.photos = window.gallery.defaultPhotos.slice();
    window.filter.updatePhotos(window.gallery.defaultPhotos.length);
    addPhotoHendler();
  };

  window.backend.loadPhotos(successLoadPhotos, window.backend.error);

  return {
    renderTemplatePhoto: function (photo, quantity) {
      var pictureFragment = document.createDocumentFragment();
      for (var i = 0; i < quantity; i++) {
        pictureFragment.appendChild(renderPhoto(photo[i]));
      }
      wrapper.appendChild(pictureFragment);
    },
    defaultPhotos: defaultPhotos,
    deletePhotos: function () {
      var pictures = document.querySelectorAll('.picture');
      for (var i = 0; i < pictures.length; i++) {
        pictures[i].remove();
      }
    }
  };

})(document.querySelector('.pictures'));
