const sliderInit = function() {

  const slider = document.querySelector('.slider');
  if(!slider) {
    return;
  }

  const toggle = slider.querySelector('.slider__toggle');
  const bar = slider.querySelector('.slider__scale');
  const beforeButton = slider.querySelector('.before');
  const afterButton = slider.querySelector('.after');
  const sliderImage = slider.querySelectorAll('.slider__img');

  const ButtonBefore = function(evt) {
    sliderImage[1].style.clipPath = "inset(100%)";
    sliderImage[0].style.clipPath = "inset(0%)";
    toggle.style.left = 0 + '%';
  }
  const ButtonAfter = function(evt) {
    sliderImage[0].style.clipPath = "inset(100%)";
    sliderImage[1].style.clipPath = "inset(0%)";
    toggle.style.left = 95 + '%';
  }

  beforeButton.addEventListener('click', ButtonBefore);
  afterButton.addEventListener('click', ButtonAfter);

  toggle.onmousedown = function(event) {
    const barClientRect = bar.getBoundingClientRect();
    const barBorderLeft = barClientRect.x;
    const sliderWidth = barClientRect.width;
    let shiftX = event.clientX - toggle.getBoundingClientRect().left;

    let listenerMove = function(evt) {
      let x = evt.clientX - barBorderLeft;
      if (x >= 0 && x <= sliderWidth) {
        toggle.style.left = (x - shiftX) + 'px';
        let chenges = x / (sliderWidth / 100);
        let chengesreverse = 100 - chenges;
        let changesbefore = 'inset( 0 ' + (chenges + '%') + ' 0 0)';
        let changesafter = 'inset( 0 0 0 ' + (chengesreverse + '%') + ')';
        sliderImage[0].style.clipPath = changesbefore;
        sliderImage[1].style.clipPath = changesafter;
        }
    }

    document.onmousemove = listenerMove;

    toggle.onmouseup = function() {
      document.removeEventListener('mousemove', listenerMove);
    };

    function reboot() {
      document.onmousemove = null;
      toggle.onmousemove = null;
    }
    toggle.onmouseup = reboot;
    document.onmouseup = reboot;
  }
}

sliderInit();
