'use strict';
window.gallery = (function () {
  var photosInformation = window.data.getPhotos(25);
  var pictureFragment = document.createDocumentFragment();
  var picturesTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  return {
    photosInformation: photosInformation,
    renderPicture: function (photo) {
      var pictureElement = picturesTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').setAttribute('src', photo.url);
      pictureElement.querySelector('.picture__likes').textContent = photo.likes;
      pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
      return pictureElement;
    },
    pictureFragment: pictureFragment
  };
})();
