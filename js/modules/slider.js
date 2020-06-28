'use strict';
window.slider = (function () {
  return {
    dragSlider: function (pin, line, depth) {
      var isPinPassed;
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
      pin.addEventListener('mousedown', function () {
        isPinPassed = true;
      });
      document.addEventListener('mouseup', function () {
        isPinPassed = false;
      });

      document.addEventListener('mousemove', function (evt) {
        if (isPinPassed === true) {
          movePin(evt);
          window.formFilter.changeSaturation();
        }
      });
    }
  };
})();
