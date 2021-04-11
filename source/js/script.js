

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

  toggle.onmousedown = function(event) {
    const barClientRect = bar.getBoundingClientRect();
    const barBorderLeft = barClientRect.x;
    const sliderWidth = barClientRect.width;

    document.onmousemove = function(evt) {
      let x = evt.clientX - barBorderLeft;
      if (x >= 0 && x <= sliderWidth) {
        toggle.style.left = x + 'px';

        document.addEventListener('mousemove', function() {
          document.getElementsByClassName('slider__toggle')[0].style.left = x + 'px';
          let chenges = x / (sliderWidth / 100);
          let chengesreverse = 100 - chenges;
          let changesbefore = 'inset( 0 ' + (chenges + '%') + ' 0 0)';
          let changesafter = 'inset( 0 0 0 ' + (chengesreverse + '%') + ')';
          sliderImage[0].style.clipPath = changesbefore;
          sliderImage[1].style.clipPath = changesafter;
        });

        beforeButton.addEventListener('click', function(evt) {
          sliderImage[1].style.clipPath = "inset(100%)";
          sliderImage[0].style.clipPath = "inset(0%)";
          toggle.style.left = 0 + '%';
        });

        afterButton.addEventListener('click', function(evt) {
          sliderImage[0].style.clipPath = "inset(100%)";
          sliderImage[1].style.clipPath = "inset(0%)";
          toggle.style.left = 100 + '%';
        });
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
