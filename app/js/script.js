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

document.addEventListener('DOMContentLoaded', function () {
  $('.main-header__control-toggler').on('click', function (event) {
    event.preventDefault();
    $('.main-header__control-dropdown').toggleClass('main-header__control-dropdown--hidden');
  });


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

  $('.product-main-photo').magnificPopup({
    delegate: 'a',
    type: 'image',
    mainClass: 'popup-fade',
    removalDelay: 300,
    gallery: {
      enabled: true
    },
    retina: {
      ratio: 2
    }
  });

  /*====================================
  =            Contacts map            =
  ====================================*/

  var contactsMap = document.querySelector('#contacts-map');

  if (contactsMap) {
    initializeMap();
  }

  /*=====  End of Contacts map  ======*/

  setupYandexTargets();
});


// Инициализация карты
function initializeMap() {
  var mapLocations = [];
  var locationPlaces = document.querySelectorAll('[data-place-location]');
  var ICONPATH = 'images/svg-icons/pin.svg';
  var locationCenter = null;

  var contactsPlaces = document.querySelector('.contacts-places-map');

  Array.prototype.forEach.call(locationPlaces, function (place, i) {
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

  mapLocations.forEach(function (mapLocation) {
    addMarker(mapLocation);
  });


  $(contactsPlaces).on('click', '[data-place-location]', function (event) {
    event.preventDefault();
    $(locationPlaces).removeClass('contacts-place-map--active')
    $(this).addClass('contacts-place-map--active')
    map.panTo(getLocationCenter(this));
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
      styles: [{
          "elementType": "geometry",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        },
        {
          "elementType": "labels.icon",
          "stylers": [{
            "visibility": "off"
          }]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [{
            "color": "#f5f5f5"
          }]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "geometry.fill",
          "stylers": [{
              "color": "#e1e1e1"
            },
            {
              "lightness": 30
            }
          ]
        },
        {
          "featureType": "landscape.man_made",
          "elementType": "labels.text",
          "stylers": [{
            "color": "#969696"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [{
            "color": "#ffffff"
          }]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#757575"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{
            "color": "#dadada"
          }]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#616161"
          }]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        },
        {
          "featureType": "transit.line",
          "elementType": "geometry",
          "stylers": [{
            "color": "#e5e5e5"
          }]
        },
        {
          "featureType": "transit.station",
          "elementType": "geometry",
          "stylers": [{
            "color": "#eeeeee"
          }]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{
            "color": "#c9c9c9"
          }]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [{
            "color": "#9e9e9e"
          }]
        }
      ]
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

function validateFormElements(item) {
  console.log(item, !!item.value.length);
  return !!item.value.length;
}


function setupYandexTargets() {
  // Нажата кнопка "Заказать звонок"
  $('.main-header__button').on('click', function () {
    yaCounter45998871.reachGoal('CALLBACK_ORDER_BTN');
  });
  // Отправлена заявка на звонок (цель произойдет, даже если не заполнена форма)
  $('.popup-callback .form-submit').on('click', function () {
    yaCounter45998871.reachGoal('CALLBACK_ORDER_SEND');
  });
  // Добавили товар в корзину
  $('.single_add_to_cart_button').on('click', function () {
    yaCounter45998871.reachGoal('ADD_TO_CART');
  });
  // Перешли в корзину
  $('.woocommerce-message .wc-forward').on('click', function () {
    yaCounter45998871.reachGoal('GO_TO_CART');
  });
  $('.main-nav__user-link').on('click', function () {
    yaCounter45998871.reachGoal('GO_TO_CART');
  });
  // Отправлен заказ
  $('.woocommerce-checkout').on('submit', function () {
    // var isValidateForm = Array.from(document.querySelectorAll('.woocommerce-checkout input')).every(validateFormElements);
    // console.log(isValidateForm);
    // if (isValidateForm) {
      yaCounter45998871.reachGoal('SEND_ORDER');
    // }
  });
}