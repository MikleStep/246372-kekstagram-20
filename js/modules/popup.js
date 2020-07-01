'use strict';
window.popup = (function (body) {
  return {
    onPopupEscPress: function (target, input) {
      return function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          if (!target.classList.contains('hidden')) {
            window.popup.toggleModal(target);
          } else if (input) {
            window.formClear.clearInputFile(input);
          }
        }
      };
    },
    toggleModal: function (target) {
      target.classList.toggle('hidden');
      body.classList.toggle('modal-open');
    }
  };
})(document.querySelector('body'));
