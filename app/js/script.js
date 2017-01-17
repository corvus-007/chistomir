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
      infinite: false
    });
  }

  /*=====  End of About slider  ======*/


  /*=========================================
  =            Accordion catalog            =
  =========================================*/

  var $catalogSection = $('.catalog-category');

  if ($catalogSection.length) {
    $catalogSection.each(function (index, el) {
      $(this).find('.catalog-subsection').hide();
      $(this).find('.catalog-category__toggle').show().addClass('catalog-category__toggle--closed');

    });

    var toggleBaseText = $(this).find('.catalog-category__toggle:first').text();
    $catalogSection.on('click', '.catalog-category__toggle', function (event) {
      event.preventDefault();

      $(this).toggleClass('catalog-category__toggle--closed catalog-category__toggle--opened');
      $(this).addClass('catalog-category__toggle--opened');
      $(this).closest('.catalog-category').find('.catalog-subsection').slideToggle();

      if ($(this).hasClass('catalog-category__toggle--closed')) {
        this.textContent = toggleBaseText;
      } else {
        this.textContent = 'Скрыть подкатегории';
      }
    });
  }

  /*=====  End of Accordion catalog  ======*/


  /*=================================
  =            Accordion            =
  =================================*/

  var $accordion = $('.js-accordion');

  if ($accordion.length) {
    $accordion.each(function (index, el) {
      $(this).find('.accordion__content').hide();
      $(this).on('click', '.accordion__label', function (event) {
        event.preventDefault();

        if ($(this).hasClass('is-opened')) {
          $accordion.find('.accordion__label').removeClass('is-opened');
          $accordion.find('.accordion__content').slideUp();
          $(this).removeClass('is-opened');
          $(this).next('.accordion__content').slideUp();
        } else {
          $accordion.find('.accordion__label').removeClass('is-opened');
          $accordion.find('.accordion__content').slideUp();
          $(this).addClass('is-opened');
          $(this).next('.accordion__content').slideDown();
        }
      });
    });
  }

  /*=====  End of Accordion  ======*/


  /*==================================
  =            Input mask            =
  ==================================*/

  // Phone
  $('input[type="tel"]').inputmask("+7 (999) 999 99 99", {
    // clearMaskOnLostFocus: false,
    // jitMasking: true
  });

  /*=====  End of Input mask  ======*/

  $('.js-trigger-inline-popup').magnificPopup({
    mainClass: 'popup-fade',
    removalDelay: 300
  });

  /*====================================
  =            Contacts map            =
  ====================================*/



  /*=====  End of Contacts map  ======*/


  var contactsMap = document.querySelector('#contacts-map');

  if (contactsMap) {
    initializeMap();
  }
});


// Инициализация карты
function initializeMap() {

  var mapLocations = [];
  var locationPlaces = document.querySelectorAll('[data-place-location]');
  var ICONPATH = 'images/svg-icons/pin.svg';
  var locationCenter = null;

  var contactsPlaces = document.querySelector('.contacts-places-map');

  Array.prototype.forEach.call(locationPlaces, function(place, i) {
    var placeItem = {};

    if (i === 0) {
      locationCenter = getLocationCenter(place);
      place.classList.add('contacts-place-map--active');
    }

    placeItem.position = getLocationCenter(place);
    placeItem.title = place.querySelector('.contacts-place-map__caption').textContent;
    mapLocations.push(placeItem);

  });


  var mapProp = createProp(locationCenter);
  var map = new google.maps.Map(document.getElementById("contacts-map"), mapProp);

  mapLocations.forEach(function(mapLocation) {
    addMarker(mapLocation);
  });


  $(contactsPlaces).on('click', '[data-place-location]', function(event) {
    event.preventDefault();
    $(locationPlaces).removeClass('contacts-place-map--active')
    $(this).addClass('contacts-place-map--active')
    map.panTo( getLocationCenter(this) );
  });

  function getLocationCenter(element) {
    return JSON.parse(element.dataset.placeLocation);
  }


  function createProp(defaultLocation) {
    return {
      center: defaultLocation,
      zoom: 17,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      disableDefaultUI: true,
      zoomControl: true,
    };
  }

  function addMarker(markerOption) {
    var svgIcon = {
      url: ICONPATH,
    };

    var marker = new google.maps.Marker({
      position: markerOption.position,
      map: map,
      title: markerOption.title,
      icon: svgIcon
    });
  }
}


