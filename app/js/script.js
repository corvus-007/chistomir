document.addEventListener('DOMContentLoaded', function() {
  var aboutSlider = document.querySelector('.about-slider');
  if (aboutSlider) {
    $(aboutSlider).slick({
      accessibility: false,
      infinite: false,
    });
  }
});
