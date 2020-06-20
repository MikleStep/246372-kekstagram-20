'use strict';
window.preview = (function () {
  // Открытие и закрытие модального окна (Big Picture)
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var bigPictureImg = bigPicture.querySelector('.big-picture__img img');

  bigPictureClose.addEventListener('click', function () {
    window.popup.closeModal(bigPicture);
  });

  var renderbigPicture = function (photo) {
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', photo.url);
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    for (var k = 0; k < photo.comments.length; k++) {
      var commentsWrapper = bigPicture.querySelector('.social__comments');
      var comment = '<li class="social__comment"><img class="social__picture" src = "' + photo.comments[k].avatar + '" alt = "' + photo.comments[k].name + '" width = "35" height = "35" > <p class="social__text">' + photo.comments[k].message + '</p></li>';
      commentsWrapper.insertAdjacentHTML('afterbegin', comment);
    }
    bigPicture.querySelector('.social__caption').textContent = photo.description;
    return bigPicture;
  };

  renderbigPicture(window.gallery.photosInformation[0]);

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');

  return {
    addPictureClickHandler: function (thumbnail, photo) {
      thumbnail.addEventListener('click', function () {
        window.popup.openModal(bigPicture);
        bigPictureImg.setAttribute('src', photo.url);
      });
    }
  };
})();
