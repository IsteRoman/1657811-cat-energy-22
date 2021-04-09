const sliderInit = function() {

  const slider = document.querySelector('.slider');
  if(!slider) {
    return;
  }

  const toggle = slider.querySelector('.slider__toggle');
  const bar = slider.querySelector('.slider__scale');
  const beforeImg = slider.querySelector('.slider__img--before');
  const afterImg = slider.querySelector('.slider__img--after');

  toggle.onmousedown = function(event) {
    const barClientRect = bar.getBoundingClientRect();
    const barBorderLeft = barClientRect.x;
    const sliderWidth = barClientRect.width;

    document.onmousemove =function(evt) {
      let x = evt.clientX - barBorderLeft;
      if (x >= 0 && x <= sliderWidth) {
        toggle.getElementsByClassName.left = x + 'px';
      }
    }
    function reboot() {
      document.onmousemove = null;
      toggle.onmousemove = null;
    }
    toggle.onmouseup = reboot;
    document.onmouseup = reboot;
  }
}

sliderInit();
