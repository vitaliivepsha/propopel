// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var Popup = require('_modules/popup');
// var LightGallery = require('_modules/lightgallery');
// var Slider = require('_modules/slider');
require('../node_modules/sumoselect/jquery.sumoselect.min');
// require('../node_modules/ez-plus/src/jquery.ez-plus');
require('../node_modules/sweetalert2/dist/sweetalert2');
require('../node_modules/jquery-validation/dist/jquery.validate.min');

// Stylesheet entrypoint
require('_stylesheets/app.scss');

// Are you ready?
$(function () {
    new Forms();
    new Popup();
    // new LightGallery();
    // new Slider();

    setTimeout(function () {
        $('body').trigger('scroll', doAnimations);
        $(window).trigger('resize');
        $('body').css('opacity', '1');
    }, 100);
    $('body').css('display', 'block');

    // fixed header

    var header = $('.header'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 60) {
            header.addClass('fixed');
        } else {
            header.removeClass('fixed');
        }
        scrollPrev = scrolled;
    });

    // mobile menu

    var touch = $('.mobile-menu__btn');
    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            this.classList.contains('active') === true
                ? this.classList.remove('active')
                : this.classList.add('active');
        });
    }

  if($('body.menu-opened').has($('.swal2-shown')))  {
      $('body').removeClass('menu-opened');
  }


    $('.mobile-menu li a').click(function() {
        $('body').removeClass("menu-opened");
        $('.mobile-menu__btn').removeClass("active");
    })

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });
    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });
    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });


    //lang

    $('.header-lang__current').click(function () {
        $(this).parent().toggleClass('active');
    });

    $(document).click(function () {
        $(".header-lang").removeClass("active");
    });

    $(document).on("click", ".header-lang", function (e) {
        e.stopPropagation();
    });

    // show text

    $(".show-text").click(function () {
        $(".advantages-seo").addClass("active");
    });

    $(".hide-text").click(function () {
        $(".advantages-seo").removeClass("active");
    });

    // spoller

    $(".advantages-list__head").click(function () {
        $(this).toggleClass("active").next(".advantages-list__body").slideToggle();
    });

    $('.header-btn').magnificPopup({
        callbacks: {
            open: function () {
                setTimeout(function () {
                    $('.consult-form input[name="name"]').focus();
                }, 100);
            }
        }
    });

    // input value
    //
    // $('.input, .textarea').blur(function () {
    //     if ($(this).val()) {
    //         $(this).closest('.input-wrapper').addClass('active');
    //     } else {
    //         $(this).closest('.input-wrapper').removeClass('active');
    //     }
    // });

    // select

    // $('.select').SumoSelect({
    //     forceCustomRendering: true
    // });
    //
    // // show/hide password
    //
    // $('.show-password').click(function() {
    //     if (!$(this).hasClass('active')) {
    //         $(this).addClass('active').closest('.input-wrapper').find('.input').attr('type', 'text');
    //     } else{
    //         $(this).removeClass('active').closest('.input-wrapper').find('.input').attr('type', 'password');
    //     }
    // });

    // validation

    // $('.validate-form').each(function() {
    //     $(this).validate({
    //         highlight: function(element) {
    //             $(element).parent().addClass('error');
    //         },
    //         unhighlight: function(element) {
    //             $(element).parent().removeClass('error');
    //         },
    //         rules: {
    //             email: {
    //                 required: true,
    //             },
    //             password: {
    //                 required: true,
    //             },
    //             new_password: {
    //                 required: true,
    //             },
    //             re_password: {
    //                 required: true,
    //                 equalTo: '#new_password'
    //             }
    //         },
    //         messages: {
    //             email: {
    //                 required: 'Povinné pole',
    //             },
    //             password: {
    //                 required: 'Povinné pole',
    //             },
    //             new_password: {
    //                 required: 'Zadejte nové heslo',
    //             },
    //             re_password: {
    //                 required: 'Odeslat heslo',
    //                 equalTo: 'Hesla se neshodují'
    //             }
    //         }
    //     });
    // });

    $("#phone").mask("+31 ( 99 ) 999 9999");

    // animation
    var doAnimations = function () {
        var offset = $(window).scrollTop() + $(window).height(),
            $animatables = $('.animate');
        if ($animatables.length == 0) {
            $(window).off('scroll', doAnimations);
        }
        $animatables.each(function (i) {
            var $animatable = $(this);
            if (($animatable.offset().top + $animatable.height() + 100) < offset) {
                $animatable.removeClass('animate').addClass('animated');
            }
        });
    };

    $(window).on('scroll', doAnimations);

    // scroll

    $(document).on("click", 'a[href^="#"]', function (e) {
        var id = $(this).attr("href");
        var $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        var pos = $id.offset().top + 20;
        $("body, html").animate({scrollTop: pos}, 500);
    });
    $(document).on("click", 'a[href^="#"]', function (e) {
        e.preventDefault();
    });

    $(window).scroll(function () {
        var $sections = $(".section");
        $sections.each(function (i, el) {
            var data_id = $(this).data('id');
            if ($(window).width() >= 768) {
                var top = $(el).offset().top - 10;
            } else {
                var top = $(el).offset().top - 10;
            }
            var bottom = top + $(el).height();
            var scroll = $(window).scrollTop();
            var id = $(el).attr("id");
            if (scroll > top && scroll < bottom) {
                $("a.active").removeClass("active");
                $('a[href="#' + id + '"]').addClass("active")
                    .closest('.header').attr('id', data_id);
            }
        });
    });

    $( ".product-cycles__item" ).hover(
        function() {
            $( ".product-cycles__item" ).addClass( "stopAnim" ).closest('.product-cycles').addClass( "stopAnim" );
        }, function() {
            $( ".product-cycles__item" ).removeClass( "stopAnim" ).closest('.product-cycles').removeClass( "stopAnim" );
        }
    );

// lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };


    $(window).scroll(lazyload);

})


