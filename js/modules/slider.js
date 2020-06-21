'use strict';
window.slider = (function () {
  return {
    dragSlider: function (pin, line, depth) {
      pin.addEventListener('mousedown', function () {
        var movePin = function (evt) {
          var limitMovementX = {
            min: line.offsetLeft - 20,
            max: line.offsetLeft + line.offsetWidth - pin.offsetWidth
          };
          var pinCoord = pin.offsetLeft + evt.movementX;
          if (pinCoord < limitMovementX.min) {
            pinCoord = limitMovementX.min;
          }
          if (pinCoord > limitMovementX.max) {
            pinCoord = limitMovementX.max;
          }
          pin.style.left = pinCoord + 'px';
          depth.style.width = pinCoord + 'px';
        };


        var onPinMouseup = function () {
          document.removeEventListener('mousemove', movePin);
          document.removeEventListener('mousemove', window.formFilter.changeSaturation);
          document.removeEventListener('mouseup', onPinMouseup);
        };

        pin.addEventListener('dragstart', function (evt) {
          evt.preventDefault();
        });
        document.addEventListener('mousemove', movePin);
        document.addEventListener('mousemove', window.formFilter.changeSaturation);
        document.addEventListener('mouseup', onPinMouseup);
      });
    }
  };
})();
