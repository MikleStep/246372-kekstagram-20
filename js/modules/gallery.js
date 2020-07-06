'use strict';
window.gallery = (function (wrapper) {
  var picturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPhoto = function (photo) {
    var pictureElement = picturesTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').setAttribute('src', photo.url);
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    return pictureElement;
  };

  return {
    renderTemplatePhoto: function (photo) {
      var pictureFragment = document.createDocumentFragment();
      for (var i = 0; i < photo.length; i++) {
        pictureFragment.appendChild(renderPhoto(photo[i]));
      }
      wrapper.appendChild(pictureFragment);
    }
  };

})(document.querySelector('.pictures'));
