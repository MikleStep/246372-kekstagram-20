'use strict';

for (var c = 0; c < window.formFilter.effectsOptions.length; c++) {
  window.formFilter.addThumbnailClickHandler(window.formFilter.effectsOptions[c], window.formFilter.effectsInformation[c]);
}

