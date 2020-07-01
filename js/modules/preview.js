'use strict';
window.preview = (function () {
  // Открытие и закрытие модального окна (Big Picture)
  var MAX_COMMENTS = 5;
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
  document.addEventListener('keydown', window.popup.onPopupEscPress(bigPicture, document.querySelector('.social__footer-text')));
  bigPictureClose.addEventListener('click', function () {
    window.popup.toggleModal(bigPicture);
  });

  var commentsWrapper = bigPicture.querySelector('.social__comments');
  var renderComments = function (photo, quantity) {
    commentsWrapper.innerHTML = '';
    for (var k = 0; k < quantity; k++) {
      var comment = '';
      comment = '<li class="social__comment"><img class="social__picture" src = "' + photo.comments[k].avatar + '" alt = "' + photo.comments[k].name + '" width = "35" height = "35" > <p class="social__text">' + photo.comments[k].message + '</p></li>';
      commentsWrapper.insertAdjacentHTML('afterbegin', comment);
    }
  };

  var renderbigPicture = function (photo) {
    var commentsLoader = document.querySelector('.comments-loader');
    bigPicture.querySelector('.big-picture__img img').setAttribute('src', photo.url);
    bigPicture.querySelector('.likes-count').textContent = photo.likes;
    bigPicture.querySelector('.comments-count').textContent = photo.comments.length;

    if (photo.comments.length <= MAX_COMMENTS) {
      commentsLoader.classList.add('hidden');
      renderComments(photo, photo.comments.length);
    } else {
      renderComments(photo, MAX_COMMENTS);
      commentsLoader.classList.remove('hidden');
    }
    commentsLoader.addEventListener('click', function () {
      commentsLoader.classList.add('hidden');
      renderComments(photo, photo.comments.length);
    });
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
