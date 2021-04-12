const max_mobile = 767;

const mobileMenuNav = function() {
  const navButton = document.querySelector('.header__menu-button');
  const navMenu = document.querySelector('.header__nav');

  if (window.matchMedia( '(max-width:' + max_mobile + 'px)').matches) {
    navMenu.classList.remove('nav--nojs');
    navButton.addEventListener('click', function(evt) {
      navButton.classList.toggle('header__menu-button--close');
      navButton.classList.toggle('header__menu-button--open');
      navMenu.classList.toggle('nav--close');
    });
  }
}

const sliderInit = function() {

  const slider = document.querySelector('.slider');
  if(!slider) {
    return;
  }

  const toggle = slider.querySelector('.slider__toggle');
  const scale = slider.querySelector('.slider__scale');
  const bar = slider.querySelector('.slider__bar');
  const beforeButton = slider.querySelector('.before');
  const afterButton = slider.querySelector('.after');
  const sliderImage = slider.querySelectorAll('.slider__img');

  if (window.matchMedia("(max-width: 767px)").matches) {
    beforeButton.addEventListener('click', function(evt) {
      sliderImage[1].style.clipPath = "inset(100%)";
      sliderImage[0].style.clipPath = "inset(0%)";
      bar.style.width = 0 + '%';
    });


    afterButton.addEventListener('click', function(evt) {
      sliderImage[0].style.clipPath = "inset(100%)";
      sliderImage[1].style.clipPath = "inset(0%)";
      bar.style.width = 100 + '%';
    });
  }

  beforeButton.addEventListener('click', function(evt) {
    sliderImage[1].style.clipPath = "inset(100%)";
    sliderImage[0].style.clipPath = "inset(0%)";
    toggle.style.left = 0 + '%';
  });


  afterButton.addEventListener('click', function(evt) {
    sliderImage[0].style.clipPath = "inset(100%)";
    sliderImage[1].style.clipPath = "inset(0%)";
    toggle.style.left = 95 + '%';
  });

  toggle.addEventListener('mousedown', function(event) {
    const scaleClientRect = scale.getBoundingClientRect();
    const scaleBorderLeft = scaleClientRect.x;
    const sliderWidth = scaleClientRect.width;
    let shiftX = event.clientX - toggle.getBoundingClientRect().left;

    let listenerMove = function(evt) {
      let x = evt.clientX - scaleBorderLeft;
      if (x >= 0 && x <= sliderWidth) {
        toggle.style.left = (x - shiftX) + 'px';
        let chenges = x / (sliderWidth / 100);
        let chengesreverse = 100 - chenges;
        let changesbefore = 'inset( 0 ' + (chenges + '%') + ' 0 0)';
        let changesafter = 'inset( 0 0 0 ' + (chengesreverse + '%') + ')';
        sliderImage[0].style.clipPath = changesbefore;
        sliderImage[1].style.clipPath = changesafter;
        }
    };

    document.addEventListener('mousemove', listenerMove);

    toggle.addEventListener('mouseup', function() {
      document.removeEventListener('mousemove', listenerMove);
    });
  });
}

mobileMenuNav();

sliderInit();
