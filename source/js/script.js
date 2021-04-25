const max_mobile = 767;

const mobileMenuNav = function() {
  const navButton = document.querySelector('.header__menu-button');
  const navMenu = document.querySelector('.header__nav');

  if (window.matchMedia('(max-width:' + max_mobile + 'px)').matches) {
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
  if (!slider) {
    return;
  }

  const toggle = slider.querySelector('.slider__toggle');
  const scale = slider.querySelector('.slider__scale');
  const bar = slider.querySelector('.slider__bar');
  const beforeButton = slider.querySelector('.before');
  const afterButton = slider.querySelector('.after');
  const sliderImage = slider.querySelectorAll('.slider__img');

  if (window.matchMedia('(max-width: 767px)').matches) {
    beforeButton.addEventListener('click', function(evt) {
      sliderImage[1].style.clipPath = 'inset(100%)';
      sliderImage[0].style.clipPath = 'inset(0%)';
      bar.style.width = 0 + '%';
    });


    afterButton.addEventListener('click', function(evt) {
      sliderImage[0].style.clipPath = 'inset(100%)';
      sliderImage[1].style.clipPath = 'inset(0%)';
      bar.style.width = 100 + '%';
    });
  }

  beforeButton.addEventListener('click', function(evt) {
    sliderImage[1].style.clipPath = 'inset(100%)';
    sliderImage[0].style.clipPath = 'inset(0%)';
    toggle.style.left = 0 + '%';
  });


  afterButton.addEventListener('click', function(evt) {
    sliderImage[0].style.clipPath = 'inset(100%)';
    sliderImage[1].style.clipPath = 'inset(0%)';
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

const validation = function() {

  const form = document.querySelector('.form');
  if (!form) {
    return;
  }

  const phoneLength = 11;
  const maliRegEx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const nameRegEx = /[^А-Я,а-я,a-z,A-Z,ё,Ё,' ',-]/;
  const maxNumberlength = 3;

  const submitButton = document.querySelector('.form__submit-button');
  const inputName = document.querySelector('.form__input[name="cat-name"]');
  const inputWeight = document.querySelector('.form__input[name="cat-weight"]');
  const inputAge = document.querySelector('.form__input[name="cat-age"]');
  const inputEmail = document.querySelector('.form__input[type="email"]');
  const iconEmail = document.querySelector('.form__input-ico-email');
  const inputTel = document.querySelector('.form__input[type="tel"]');
  const iconTel = document.querySelector('.form__input-ico-phone');
  const formInput = form.querySelectorAll('.form__input');


  inputName.addEventListener('input', function() {
    inputName.value = inputName.value.replace(nameRegEx, '');
    if (nameRegEx.test(inputName.value)) {
      inputName.classList.add('form__input--error');
    } else {
      inputName.classList.remove('form__input--error');
    }
  })

  inputWeight.addEventListener('input', function() {
    if (inputWeight.value <= 0 || inputWeight.value.length > maxNumberlength) {
      inputWeight.classList.add('form__input--error');
    } else {
      inputWeight.classList.remove('form__input--error');
    }
  });

  inputAge.addEventListener('input', function() {
    if (inputAge.value <= 0 || inputAge.value.length > maxNumberlength) {
      inputAge.classList.add('form__input--error');
    } else {
      inputAge.classList.remove('form__input--error');
    }
  });

  inputEmail.addEventListener('input', function() {
    if (!maliRegEx.test(inputEmail.value)) {
      inputEmail.classList.add('form__input--error');
    } else {
      inputEmail.classList.remove('form__input--error');
      iconEmail.style.stroke = "#68b738";
    }
  });

  inputTel.addEventListener('input', function() {
    if (inputTel.value.length !== phoneLength) {
      inputTel.classList.add('form__input--error');
    } else {
      inputTel.classList.remove('form__input--error');
      iconTel.style.fill = "#68b738";
    }
  });

  submitButton.addEventListener('click', function(evt) {
    if (inputName.classList.contains('form__input--error') || inputWeight.classList.contains('form__input--error') || inputAge.classList.contains('form__input--error') || inputEmail.classList.contains('form__input--error') || inputTel.classList.contains('form__input--error') ) {
      evt.preventDefault();
      alert('Проверьте правильность заполнения полей');
    }
  });
}

mobileMenuNav();

sliderInit();

validation();
