/*=================================================
=            Translating magnificPopup            =
=================================================*/

// Add it after jquery.magnific-popup.js and before first initialization code
$.extend(true, $.magnificPopup.defaults, {
  tClose: 'Закрыть (Esc)', // Alt text on close button
  tLoading: 'Загрузка...', // Text that is displayed during loading. Can contain %curr% and %total% keys
  gallery: {
    tPrev: 'Назад (Left arrow key)', // Alt text on left arrow
    tNext: 'Вперед (Right arrow key)', // Alt text on right arrow
    tCounter: '%curr% из %total%' // Markup for "1 of 7" counter
  },
  image: {
    tError: '<a href="%url%">The image</a> could not be loaded.' // Error message when image could not be loaded
  },
  ajax: {
    tError: '<a href="%url%">The content</a> could not be loaded.' // Error message when ajax request failed
  }
});

/*=====  End of Translating magnificPopup  ======*/

document.addEventListener('DOMContentLoaded', function() {
  /*====================================
  =            About slider            =
  ====================================*/
  
  var aboutSlider = document.querySelector('.about-slider');
  if (aboutSlider) {
    $(aboutSlider).slick({
      accessibility: false,
      infinite: false,
      respondTo: 'min'
    });
  }
  
  /*=====  End of About slider  ======*/



  /*==================================
  =            Input mask            =
  ==================================*/

  // Phone
  $('input[type="tel"]').inputmask("+7 (999) 999 99 99", {
    // clearMaskOnLostFocus: false,
    // jitMasking: true
  });

  /*=====  End of Input mask  ======*/
});
