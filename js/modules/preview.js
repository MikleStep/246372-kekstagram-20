'use strict';
window.preview = (function () {
  // Открытие и закрытие модального окна (Big Picture)
  var MAX_COMMENTS = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  var counter = MAX_COMMENTS;
  document.addEventListener('keydown', window.popup.onPopupEscPress(bigPicture, document.querySelector('.social__footer-text')));

  bigPictureClose.addEventListener('click', function () {
    window.popup.toggleModal(bigPicture);
    var commentsLoader = document.querySelector('.comments-loader');
    commentsLoader.removeEventListener('click', moreComments, false);
  });

  var commentsWrapper = bigPicture.querySelector('.social__comments');
  var currentPhoto;
  var commentsLoader = document.querySelector('.comments-loader');

  var renderComments = function (photo, quantity) {
    commentsWrapper.innerHTML = '';
    for (var k = 0; k < quantity; k++) {
      var comment = '';
      comment = '<li class="social__comment"><img class="social__picture" src = "' + photo.comments[k].avatar + '" alt = "' + photo.comments[k].name + '" width = "35" height = "35" > <p class="social__text">' + photo.comments[k].message + '</p></li>';
      commentsWrapper.insertAdjacentHTML('afterbegin', comment);
    }
  };

  var moreComments = function () {
    if (counter + MAX_COMMENTS >= currentPhoto.comments.length) {
      renderComments(currentPhoto, currentPhoto.comments.length);
      commentsLoader.classList.add('hidden');
      counter = currentPhoto.comments.length;
    } else {
      counter += MAX_COMMENTS;
      renderComments(currentPhoto, counter);
    }
  };

  var renderbigPicture = function (photo) {
    currentPhoto = photo;
    counter = MAX_COMMENTS;
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', photo.url);
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;
    renderComments(photo, MAX_COMMENTS);
    commentsLoader.classList.remove('hidden');

    commentsLoader.addEventListener('click', moreComments);

    bigPicture.querySelector('.social__caption').textContent = photo.description;

    return bigPicture;
  };

  document.querySelector('.social__comment-count').classList.add('hidden');

  return {
    addPictureClickHandler: function (thumbnail, photo) {
      thumbnail.addEventListener('click', function () {
        renderbigPicture(photo);
        window.popup.toggleModal(bigPicture);
      });
    }
  };
})();
