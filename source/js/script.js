

const sliderInit = function() {

  const slider = document.querySelector('.slider');
  if(!slider) {
    return;
  }

  const toggle = slider.querySelector('.slider__toggle');
  const bar = slider.querySelector('.slider__scale');
  const beforeButton = slider.querySelector('.before');
  const afterButton = slider.querySelector('.after');
  const beforeImg = slider.querySelector('.slider__img--before');
  const afterImg = slider.querySelector('.slider__img--after');

  afterButton.addEventListener('click', function(evt) {
    document.getElementsByClassName('slider__img--before')[0].style.clipPath = "inset(100%)";
    document.getElementsByClassName('slider__img--after')[0].style.clipPath = "inset(0%)";
    document.getElementsByClassName('slider__toggle')[0].style.left = 100 + '%';
  });

  beforeButton.addEventListener('click', function(evt) {
    document.getElementsByClassName('slider__img--after')[0].style.clipPath = "inset(100%)";
    document.getElementsByClassName('slider__img--before')[0].style.clipPath = "inset(0%)";
    document.getElementsByClassName('slider__toggle')[0].style.left = 0 + '%';
  });

  toggle.onmousedown = function(event) {
    const barClientRect = bar.getBoundingClientRect();
    const barBorderLeft = barClientRect.x;
    const sliderWidth = barClientRect.width;



    document.onmousemove = function(evt) {
      let x = evt.clientX - barBorderLeft;
      if (x >= 0 && x <= sliderWidth) {
        toggle.getElementsByClassName.left = x + 'px';

        document.addEventListener('mousemove', function() {
          document.getElementsByClassName('slider__toggle')[0].style.left = x + 'px';
          let chenges = x / (sliderWidth / 100);
          let chengesreverse = 100 - chenges;
          let changesbefore = 'inset( 0 ' + (chenges + '%') + ' 0 0)';
          let changesafter = 'inset( 0 0 0 ' + (chengesreverse + '%') + ')';
          document.getElementsByClassName('slider__img--before')[0].style.clipPath = changesbefore;
          document.getElementsByClassName('slider__img--after')[0].style.clipPath = changesafter;

        } );
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
