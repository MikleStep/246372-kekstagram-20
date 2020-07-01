'use strict';
window.formClear = (function () {
  return {
    clearInputFile: function (input) {
      if (input.value) {
        var form = document.createElement('form');
        var ref = input.nextSibling;
        form.appendChild(input);
        form.reset();
        ref.parentNode.insertBefore(input, ref);
      }
    }
  };
})();
