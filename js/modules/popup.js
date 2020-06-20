'use strict';
window.popup = (function (body) {
  var onPopupEscPress = function (target) {
    return function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        window.popup.closeModal(target);
      }
    };
  };

  return {
    openModal: function (target) {
      target.classList.remove('hidden');
      body.classList.add('modal-open');
      document.addEventListener('keydown', onPopupEscPress(target));
    },

    closeModal: function (target) {
      target.classList.add('hidden');
      body.classList.remove('modal-open');
      document.removeEventListener('keydown', onPopupEscPress(target));
    }
  };
})(document.querySelector('body'));
