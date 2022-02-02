// (function() {
//     'use strict';
  
//     function backToTop() {
//       if (window.pageYOffset > 0) {
//         window.scrollBy(0, -80);
//         setTimeout(backToTop, 0);
//       }
//     }
  
//     var goTopBtn = document.querySelector('.btn-top');
  
//     goTopBtn.addEventListener('click', backToTop);
// })();

$('window').ready(function(){
    let stepInput = $('.one-quest input'),
    nextStepBtn = $('.next-step'),
    stepsList, body;
    body = $('body');
    stepsList = $('.one-quest');
    if($.cookie('is_visited')){
        body.addClass('landing').removeClass('login');
    } else {
        body.addClass('login').removeClass('landing');

    }
    $("#login").attr("href", window.site + '/auth.html');
    $('.menu-mobile').click(function(){
        $('.header').toggleClass('header--menu-open');
    })

    $('.quest-number__all').html(stepsList.length);
    stepInput.on('change, input', function(){
        if (stepInput.val){
            nextStepBtn.prop('disabled', false);
        }
    })
    nextStepBtn.on('click', function(){
        stepSwitch();
    })

    function stepSwitch(){
        let nextQuest = $('.one-quest--active').next(),
        activeQuest;
        activeQuest = $('.one-quest--active');
        activeQuest.addClass('one-quest--passed').removeClass('one-quest--active');
        nextQuest.addClass('one-quest--active').removeClass('one-quest--hidden');
        $('.quest-number__active').html(nextQuest.data('number'));
        nextStepBtn.prop('disabled', true);
        let progress = 100 * nextQuest.data('number') / stepsList.length;
        $('.quest__ready').css('width', progress+'%' );
        if (activeQuest.hasClass('one-quest--final')){
            body.removeClass('quest-page').addClass('loading');
            
            $('.wrapper--quest').hide(300);
            // $('.wrapper--loading').show(300);
            setTimeout(openPrice, 7600);
        }
    }
    function openPrice(){
        body.removeClass('loading').addClass('price-land');
    }

    $('.start').on('click', function(){
        // if (!$.cookie('is_visited')){
            body.removeClass('login landing').addClass('quest-page');
        // }
    })
    $('a.scrollto').on('click', function() {let href = $(this).attr('href'); $('html, body').animate({scrollTop: $(href).offset().top }, {duration: 370, easing: "linear"}); return false; });

    $('.price-all__form').on('submit', function(e){
        e.preventDefault();
        $.cookie('price', $('input[name="price"]:checked').val());
        $.cookie('is_visited', true);
        body.removeClass('price-land').addClass('landing');
    })
    $('.price-value__radio').on('change', function (e) {
        e.preventDefault();
        $.cookie('price', e.target.value);
        $('input[value='+ e.target.value + ']').prop('checked', true);
        $('.x_order_form input[name="price"]')
            .each(function() { const el = $(this); el.val(e.target.value);})
    })
    $('input[value='+ $.cookie('price') + ']').prop('checked', true);
    $('.order__form').on('submit', function(e){
        e.preventDefault();
    })
    if (!$.cookie('stop-timer')){
        initializeTimer();
    } else {
        $('.timer').hide();
    }
    $('.x_order_form input[name="price"]')
        .each(function() { const el = $(this); el.val($.cookie('price'));});
})

initializeTimer();
 function initializeTimer() {

                if (!localStorage.getItem("ever-timer")) {
                    var time = {
                        hours: 0,
                        minutes: 27,
                        seconds: 0
                    };

                    time = time.hours * 3600 + time.minutes * 60 + time.seconds;

                    localStorage.setItem("time", time);
                    localStorage.setItem("ever-timer", true);
                }

                timerSettings();

            }

            function timerSettings() {
                var time = localStorage.getItem('time'),
                    different = document.querySelector(".timer-different"),
                    hours = parseInt(time / 3600, 10),
                    minutes = parseInt((time - hours * 3600 ) / 60, 10),
                    seconds = parseInt(time % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : "" + minutes;
                seconds = seconds < 10 ? "0" + seconds : "" + seconds;
                hours = hours < 10 ? "0" + hours : "" + hours;

                var hoursHTML = document.getElementsByClassName("hourss");
                var minutesHTML = document.getElementsByClassName("minutess");
                var secondsHTML = document.getElementsByClassName("secondss");

                if (--time < 0) {
                    localStorage.removeItem("ever-timer");
                    return;
                }
                if (different) {
                    seconds = seconds.split("");
                    minutes = minutes.split("");
                    hours = hours.split("");

                    diFilling(hoursHTML, hours);
                    diFilling(minutesHTML, minutes);
                    diFilling(secondsHTML, seconds);
                } else {
                    filling(hoursHTML, hours);
                    filling(minutesHTML, minutes);
                    filling(secondsHTML, seconds);
                }

                localStorage.setItem("time", time);
                setTimeout(timerSettings, 1000);
            }

            function filling(obj, value) {
                for (var i = 0; i < obj.length; i++) {
                    obj[i].innerHTML = value;
                }
            }

            function diFilling(obj, value) {
                for (var i = 0; i < obj.length; i++) {
                    obj[i].innerHTML = value[i % 2];
                }
            }
        

function animateProgress() {
    const progressBars = document.querySelectorAll('.progress-container');

    const animateValue = (selector, start, end, duration) => {
      var obj = selector;
      var range = end - start;
    
      // no timer shorter than 50ms (not really visible any way)
      var minTimer = 50;
      
      // calc step time to show all interediate values
      var stepTime = Math.abs(Math.floor(duration / range));
      
      // never go below minTimer
      stepTime = Math.max(stepTime, minTimer);
      
      // get current time and calculate desired end time
      var startTime = new Date().getTime();
      var endTime = startTime + duration;
      var timer;
    
      function run() {
        var now = new Date().getTime();
        var remaining = Math.max((endTime - now) / duration, 0);
        var value = Math.round(end - remaining * range);
        obj.innerHTML = value + "%";
        if (value == end) {
          clearInterval(timer);
        }
      }
    
      var timer = setInterval(run, stepTime);
      run();
    }
    
    const progress = (value) => {
      var progress = value / 100;
      var dashoffset = circumference * (1 - progress);
    
      progressValue.style.strokeDashoffset = dashoffset;
    
      animateValue(valueContainer, 0, dataValue, 1500);
    }
    
    // Iterate over each progress bar
    for (var el of progressBars) {
      var dataValue = el.getAttribute('data-value');
      var progressValue = el.querySelector('.progress-value');
      var valueContainer = el.querySelector('span');
      
      valueContainer.dispatchEvent(new Event('change'));
    
      var radius = progressValue.getAttribute("r");
      
      var circumference = 2 * Math.PI * radius;
      
      progressValue.style.strokeDasharray = circumference;
      progress(dataValue);
    }
}

const smoothLinks = document.querySelectorAll('a[href^="#"]');
for (let smoothLink of smoothLinks) {
    smoothLink.addEventListener('click', function (e) {
        e.preventDefault();
        const id = smoothLink.getAttribute('href');

        document.querySelector(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
};

$('.slider').slick({
    dots: false,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<button type="button" class="slider__bottom slider__bottom_prev"></button>',
    nextArrow: '<button type="button" class="slider__bottom slider__bottom_next"></button>',
    responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
});
$('.slider-signal__slides_desktop').slick({
    centerMode: true,
    slidesToShow: 6,
    focusOnSelect: true,
    dots: false,
    arrows: true,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<button type="button" class="slider-signal__bottom slider-signal__bottom_prev"><span class="button-arr button-arr_left"></span></button>',
    nextArrow: '<button type="button" class="slider-signal__bottom slider-signal__bottom_next"><span class="button-arr button-arr_right"></span></button>',
    responsive: [
        {
          breakpoint: 1700,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        }
      ]
});
$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    responsive: [
        {
            breakpoint: 420,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1
            }
          }
      ]
});
$('.reviews-slider__wrap').slick({
    slidesToShow: 1,
    dots: true,
    arrows: true,
    slidesToScroll: 1,
    variableWidth: true,
    prevArrow: '<button type="button" class="reviews-slider__bottom reviews-slider__bottom_prev"></button>',
    nextArrow: '<button type="button" class="reviews-slider__bottom reviews-slider__bottom_next"></button>',
    dotsClass: 'reviews-slider__dots'
});
$(window).on('load resize', function() {
    if (window.innerWidth < 821) { 
        $('.access-slider').slick({
            dots: false,
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true
        }); 
    }
});

var acc = document.getElementsByClassName("accordion__head");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

const moreButton = document.querySelector('.more');
const moreWrapper = document.querySelector('.accordion-hidden');
const iconPlus = document.querySelector('.more__icon_plus');
const iconMinus = document.querySelector('.more__icon_minus');

const changeLectionCondition = () => {
    moreWrapper.classList.toggle('accordion-hidden');
    if (moreWrapper.classList.contains('accordion-hidden')) {
        iconMinus.classList.add('hidden');
        iconPlus.classList.remove('hidden');
    } else {
        iconPlus.classList.add('hidden');
        iconMinus.classList.remove('hidden');
    }    
}

moreButton.addEventListener('click', changeLectionCondition);
// $(window).on('load resize', function() {
//     if (window.innerWidth < 651) { 
//         $('.advantages').slick({
//             dots: true,
//             arrows: true,
//             infinite: true,
//             speed: 300,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             variableWidth: true,
//             prevArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_advantage advantages__slider__bottom_prev"></button>',
//             nextArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_advantage advantages__slider__bottom_next"></button>',
//             dotsClass: 'reviews__slider__dots'
//         });  
//         $('.mistakes__inner').slick({
//             dots: true,
//             arrows: true,
//             infinite: true,
//             speed: 300,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             variableWidth: true,
//             prevArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_prev"></button>',
//             nextArrow: '<button type="button" class="advantages__slider__bottom advantages__slider__bottom_next"></button>',
//             dotsClass: 'reviews__slider__dots'
//         });  
//         $('.result').slick({
//             dots: true,
//             arrows: true,
//             infinite: true,
//             speed: 300,
//             slidesToShow: 1,
//             slidesToScroll: 1,
//             variableWidth: true,
//             prevArrow: '<button type="button" class="result__slider__bottom result__slider__bottom_prev"></button>',
//             nextArrow: '<button type="button" class="result__slider__bottom result__slider__bottom_next"></button>',
//             dotsClass: 'reviews__slider__dots reviews__slider__dots_result'
//         });   
//     }
// });
function format(t) {
    return t.toFixed(0).replace(/./g, function(t, e, n) {
        return 0 < e && "." !== t && (n.length - e) % 3 == 0 ? " " + t : t
    })
}
$(document).ready(function() {
    $(".js-range-slider").ionRangeSlider({
        skin: "round",
        hide_min_max: !0,
        onChange: function(t) {
            $("#range").text(t.from_pretty);
            var e = 0,
                n = t.from,
                r = document.querySelectorAll(".slider__block_range");
            r.forEach(function(t, i) {
                var o = $(t).data("percent"),
                    a = format(n * o / 100),
                    s = format(n + n * o / 100);
                $(t).find(".range-income").html("" + a + " р. <span class='slider__span'> (" + Math.round(o) + "%)</span>"), $(t).find(".range-total").html(s + ""), i === r.length - 1 && (console.log(1), $(".range-cash").html(a)), e += parseInt(a.replace(/\D/, "")) || 0
            }), $(".range-cash").html(format(e))
        },
        onStart: function(t) {
            $("#range").text(t.from_pretty);
            var e = 0,
                n = t.from,
                r = document.querySelectorAll(".slider__block_range");
            r.forEach(function(t, i) {
                var o = $(t).data("percent"),
                    a = format(n * o / 100),
                    s = format(n + n * o / 100);
                $(t).find(".range-income").html("" + a + " р. <span class='slider__span'> (" + Math.round(o) + "%)</span>"), $(t).find(".range-total").html(s + ""), i === r.length - 1 && $(".range-cash").html(a), e += parseInt(a.replace(/\D/, "")) || 0
            }), $(".range-cash").html(format(e))
        }
    })
});