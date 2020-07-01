'use strict';
window.popup = (function (body) {
  var exceptions = [document.querySelector('.text__hashtags'), document.querySelector('.text__description'), document.querySelector('.social__footer-text')];
  return {
    onPopupEscPress: function (target, input) {
      return function (evt) {
        for (var i = 0; i < exceptions.length; i++) {
          if (exceptions[i] === document.activeElement) {
            return evt;
          }
        }
        if (evt.key === 'Escape') {
          evt.preventDefault();
          if (!target.classList.contains('hidden')) {
            window.popup.toggleModal(target);
            window.formReset.fullReserForm(input);
            window.formReset.resetInputs();
          }
        }
        return evt;
      };
    },
    toggleModal: function (target) {
      target.classList.toggle('hidden');
      body.classList.toggle('modal-open');
    }
  };
})(document.querySelector('body'));
