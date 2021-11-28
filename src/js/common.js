
// side menu show hide start
$( 'body' ).on( 'click', '.menu-btn', function (e) {
    $( 'nav.global-nav' ).addClass( 'nav-showing' );
    $( 'div.nav-overlay' ).fadeIn( 400 );
    $( 'body' ).css( 'overflow', 'hidden' );
});

//close global navigation
$( 'body' ).on( 'click', 'nav.global-nav .btn-closenav, div.nav-overlay, ul.lst-subnavigation>li', function (e) {
    $( 'nav.global-nav' ).removeClass( 'nav-showing' );
    $( 'div.nav-overlay' ).fadeOut( 300 );
    $( 'body' ).css( 'overflow', 'auto' );
} );

$( 'body' ).on( 'click', 'ul.lst-navigation>li>a', function (e) {
    $( 'ul.lst-navigation li a' ).removeClass( 'item-selected' );
    //$( this ).addClass( 'item-selected' );
} );

/* Below code is to disable cut copy paste in admin portal */
// $('body').bind('cut copy paste', function (e) {
//   e.preventDefault();
// });
// side menu show hide end



function dashboardCarousel () {

    $('.owl-carousel').owlCarousel({
        stagePadding: 50,
        loop:false,
        rewind : false,
        margin:10,
        nav:true,
        autoWidth:true,
        responsive:{
            0:{
                items:1
            },
            // 600:{
            //     items:3
            // },
            1000:{
                items:3
            }
        }
    });

$('.owl-offers').owlCarousel({
        stagePadding: 50,
        loop:false,
        margin:10,
        nav:true,
        autoWidth:true,
        responsive:{
            0:{
                items:1
            },
            // 600:{
            //     items:3
            // },
            1000:{
                items:3
            }
        }
    });

$('.owl-rounded-item').owlCarousel({
        stagePadding: 50,
        loop:false,
        margin:10,
        nav:true,
        autoWidth:true,
        responsive:{
            0:{
                items:1
            },
            // 600:{
            //     items:3
            // },
            1000:{
                items:3
            }
        }
    })

$('.owl-saved-accts').owlCarousel({
        stagePadding: 50,
        loop:false,
        margin:10,
        nav:true,
        autoWidth:true,
        responsive:{
            0:{
                items:1
            },
            // 600:{
            //     items:3
            // },
            1000:{
                items:3
            }
        }
    })
/*
    $('.owl-menuList').owlCarousel({
        stagePadding: 50,
        loop:false,
        rewind : false,
        margin:10,
        nav:true,
        autoWidth:true,
        responsive:{
            0:{
                items:1
            },
            // 600:{
            //     items:3
            // },
            1000:{
                items:3
            }
        }
    }); */

}

function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

function ShowHidePassword() {
    $('body').on('click',".show-pwd", function(){
        if($(this).siblings("input").attr('type')=='password') {
            $(this).siblings("input").attr('type','text');
            $(this).addClass("showing");
        }
        else {
            $(this).siblings("input").attr('type','password');
            $(this).removeClass("showing");
        }
    });
}

    // input type as number start
function ShowHideNumber() {
    console.log("show hide number");
    $(".show-pwd-number").on('click',function(){
        if($(this).siblings("input").hasClass("password_number")) {
            $(this).siblings("input").removeClass("password_number");
            $(this).addClass("showing");
        }
        else {
            $(this).siblings("input").addClass("password_number");
            $(this).removeClass("showing");
        }
    });
}
    // input type as number end

function toggleLangugae(){
    $(".ux-selection label").click(function(){
        if ( $(this).hasClass(".lang-sel") ) {
            $(".ux-selection label").removeClass("lang-sel");
        }
        else {
            $(".ux-selection label").removeClass("lang-sel");
            $(this).addClass("lang-sel");
        }
    })
}

function contactAccordian(){
     //script for arrow toggle accrodian start
     $(".acc-slide .arrow-toggle").click(function(event) {

        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(".acc-slide").removeClass('slide-active');
        }
        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(this).parent(".acc-slide").addClass('slide-active');
            $('.acc-slide-content').slideUp();
            $(".acc-slide").children('.acc-slide-content').slideUp();
            $(this).parent(".acc-slide").children('.acc-slide-content').slideDown();
        }
        else if ($(this).parent(".acc-slide").hasClass('slide-active'))
        {
            $(this).parent(".acc-slide").removeClass('slide-active');
            $('.acc-slide-content').slideUp();
        }
    });
    //script for arrow toggle accordian end

    //contact us
    $(".talk").click(function(){
        $(this).closest(".talkto-us").toggleClass("talk-active");
        $(this).parent(".container").siblings(".talkto-us-details").slideToggle();
    });
}

$(document).ready(function(){

    $( 'body' ).on( 'click', 'div.toast-messages div.msg-toast', function() {
        setTimeout(function () {
            $( 'div.toast-messages' ).find( '.msg-toast' ).removeClass( 'msg-showing' );
        }, 300);
    } );
   /*  //script for arrow toggle accrodian start
    $(".acc-slide .arrow-toggle").click(function(event) {

        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(".acc-slide").removeClass('slide-active');
        }
        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(this).parent(".acc-slide").addClass('slide-active');
            $('.acc-slide-content').slideUp();
            $(".acc-slide").children('.acc-slide-content').slideUp();
            $(this).parent(".acc-slide").children('.acc-slide-content').slideDown();
        }
        else if ($(this).parent(".acc-slide").hasClass('slide-active'))
        {
            $(this).parent(".acc-slide").removeClass('slide-active');
            $('.acc-slide-content').slideUp();
        }
    });
    //script for arrow toggle accordian end

    //contact us
    $(".talk").click(function(){
        $(this).closest(".talkto-us").toggleClass("talk-active");
        $(this).parent(".container").siblings(".talkto-us-details").slideToggle();
    }); */

    // window resize function
    $( window ).resize(function() {
        fixMapHeight();
    });
});
// document ready ends
// showToastMessage( 'TextYouWantToShow', 'TypeofMessage(error|success|warning|info)', automaticallyDismiss(true|false), AfterHowMuchMilisecondsDismiss(1000)  );

/* //-- show toast message - Function */
function showToastMessage ( messageText, messageType, autoDismiss, dismissDuration ) {
    if(messageText == "Product Service Error") messageText = "";
    if ( typeof messageType === "undefined" || messageType === null )
        messageType = 'error';
    if ( typeof autoDismiss === "undefined" || autoDismiss === null )
        autoDismiss = true;
    if (typeof dismissDuration === "undefined" || dismissDuration === null)
        dismissDuration = 5000;

    var messageHTML = '<div class="msg-toast msg-'+ messageType +'"><em>'+ messageText +'</em></div>';
    $( 'body' ).append( '<div class="toast-messages"></div>' );
    $( 'div.toast-messages' ).html( messageHTML );
    setTimeout( function () {
        $( 'div.toast-messages' ).find( '.msg-toast' ).addClass( 'msg-showing' );
    }, 300 );
    if ( autoDismiss ) {
        setTimeout( function () {
            $( 'div.toast-messages' ).find( '.msg-toast' ).removeClass( 'msg-showing' );
        }, dismissDuration );
        setTimeout( function () {
            $( 'div.toast-messages' ).html( '' );
        }, dismissDuration + 400 );
    } else {
        $( 'div.toast-messages' ).find( '.msg-toast' ).addClass( 'msg-close' );
    }
};

// switch tabs js start
function switchOptionsInit () {
    $( 'body' ).on( 'click', 'div.ux-switch-tabs div.ux-switch>.lst-ux-switch>li>a', function () {
        if ( !$( this ).hasClass( 'switch-selected' ) ) {
            var switchIndex = $( this ).closest( 'ul.lst-ux-switch li' ).index();
            $( this ).closest( 'div.ux-switch-tabs' ).find( 'div.ux-switch-container div.ux-switch-content' ).removeClass( 'content-showing' );
            $( this ).closest( 'div.ux-switch-tabs' ).find( '.lst-ux-switch>li>a' ).removeClass( 'switch-selected' );
            $( this ).addClass( 'switch-selected' );
            $( this ).closest( 'div.ux-switch-tabs' ).find( 'div.ux-switch-container' ).children( 'div.ux-switch-content' ).eq( switchIndex ).addClass( 'content-showing' );
        }
    });
};

// switch tabs js end

// map height script
function fixMapHeight() {
    var windowHeight = $(window).height();
    var headerHeight = $('header.global-header').innerHeight();
    var tabsHeight = $('div.ux-switch').innerHeight();

    $('div.map-controller').height(windowHeight - (headerHeight + tabsHeight + 70));
}

function footer(){
    if ($(window).width() < 1024) {
        //alert('Less than 1024');
        $("input").focusin(function(){
             $(".sticky-actions").hide();
         });

        //alert('More than 1025');
        $("input").focusout(function(){
             $(".sticky-actions").show();
         });
    }
}

function accountTabChange(){
    $(".ux-button").hide();
    $(".account-details").click(function(){
        $(".ux-button").hide();
    });
    $(".recent-trans").click(function(){
       $(".ux-button").show();
    });
}

function filterToggle(){
    $(".filter-container").hide();
    $(".btn-fliter").click(function(){
        $(".filter-container").slideToggle();
    })
}

function balanceViewToggle(){
    $(".show-bal").click(function(){
        $(this).parent().toggleClass("showing-balance");
    })
}

// footer hide in devices on keyboard active start
function stickFooter(){
    var _originalSize = $(window).width() + $(window).height();
    $(window).on('resize',function() {

        checkNavMenu();

        if ($(window).width() + $(window).height() != _originalSize) {
            console.log("keyboard active");
            $(".footer-container").removeClass("sticky-actions");
        } else {
            console.log("keyboard closed");
            $(".footer-container").addClass("sticky-actions");
        }
    });
}
// footer hide in devices on keyboard active end

// ripple effect start
function rippleEffect(){
    $('body').on('click', '.ux-button',function(){
    //$(".ux-button").click(function(){
        $(".ux-button").removeClass("ripple-btn");
        $(this).addClass("ripple-btn");
        setTimeout( function () {
            $(".ux-button").removeClass("ripple-btn");
        }, 1000 );
    });
}

// spend analysis doughnut chart script start
function spendDoughnut (label,data) {
    var ctx = document.getElementById("myChartDonut").getContext('2d');
    var mySpendDoughnut = new Chart(ctx,{
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                // label: '# of Votes',
                data: data,
                backgroundColor: ['#673AB7','#f44336','#4CAF50','#2196F3','#607D8B','#673AB7','#f44336','#4CAF50','#2196F3','#607D8B','#673AB7','#f44336']
            }]
        },
        options: {
            cutoutPercentage: 60,
            legend : {display: false}

        }
    });
    document.getElementById("legendSpend").innerHTML = mySpendDoughnut.generateLegend();
};
// spend analysis doughnut chart script end

// spend analysis bar chart script start
function spendBarGraph () {
    var barCanvas = document.getElementById("spendbarChart");

    var densityData = {
        label: false,
        data: [150, 400, 300, 250, 100,150, 400, 300, 250, 100,150, 400, 300, 250, 100,150, 400, 300, 250, 100],
        backgroundColor: ['#673AB7','#f44336','#4CAF50','#2196F3','#607D8B','#673AB7','#f44336','#4CAF50','#2196F3','#607D8B','#673AB7','#f44336','#4CAF50','#2196F3','#607D8B','#673AB7','#f44336','#4CAF50','#2196F3','#607D8B']
    };

    var barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: ["T-Mart", "Levis", "Zara", "Zodiac", "John Player","T-Mart", "Levis", "Zara", "Zodiac", "John Player","T-Mart", "Levis", "Zara", "Zodiac", "John Player","T-Mart", "Levis", "Zara", "Zodiac", "John Player"],
            datasets: [densityData],
        },
        options: {
            legend: {
                display: false
            },
            scales: {
                xAxes: [{
                    gridLines: {display:false},
                    ticks: {
                    autoSkip: false
                    },
                    barPercentage: 0.5
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        autoSkip: false
                    },
                    // gridLines: {display:false}
                    display: false
                }]
            }
        }
    });
    }
// spend analysis bar chart script end

// manage beneficiary footer btn show hides script start
function mngbeneficiary() {
    $(".btntransfer").hide();
    $(".account-details").click(function(){
        $(".btnproceed").show();
        $(".btntransfer").hide();
    });
    $(".recent-trans").click(function(){
       $(".btntransfer").show();
       $(".btnproceed").hide();
    });
}
// manage beneficiary footer btn show hides script end

// numeric keypad script start
var mPINEntering = [];

function numericKeypad(pinLength){

   // mPIN 4 digit - 4 input
    $('div.mpin-digits input:first').focus();
    $('body').on('keypress', 'div.mpin-digits input[type=password]', function (e) {
        console.log('input = ' + e.which);
        // if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        var keycode =  e.keyCode ? e.keyCode : e.which;
        if (keycode != 0 && (keycode < 48 || keycode > 57)) {
            return false;
        } else {
            var inputs = $(this).closest('div.mpin-digits').find(':input');
            inputs.eq(inputs.index(this) + 1).focus();
        };
        if (keycode == 8) {
            $(this).val('');
            var inputs = $(this).closest('div.mpin-digits').find(':input');
            inputs.eq(inputs.index(this) - 1).focus();
        };
    });

    $('div.btn-mpin-numbers button.btn-mpin-number').click(function(e) {
        if (mPINEntering.length < pinLength) {
            mPINEntering.push($(this).html());
            $('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).addClass('dot-filled');
        } /* else {

        } */
    });

    $('div.mpin-dots-line button.btn-mpin-fill.btn-mpin-clear').click(function(e) {
        if (mPINEntering.length != 0) {
            //alert('ALL CLEARED');
            $('div.mpin-dots-line div.mpin-dot-' + mPINEntering.length).removeClass('dot-filled');
            mPINEntering.pop();
        } /* else {

        } */
    });

}
// numeric keypad script end

//script for arrow toggle accordian start
function arrowToggle(){
    $(".acc-slide .arrow-toggle").click(function(event) {

        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(".acc-slide").removeClass('slide-active');
        }
        if (!$(this).parent(".acc-slide").hasClass('slide-active')){
            $(this).parent(".acc-slide").addClass('slide-active');
            $('.acc-slide-content').slideUp();
            $(".acc-slide").children('.acc-slide-content').slideUp();
            $(this).parent(".acc-slide").children('.acc-slide-content').slideDown();
        }
        else if ($(this).parent(".acc-slide").hasClass('slide-active'))
        {
            $(this).parent(".acc-slide").removeClass('slide-active');
            $('.acc-slide-content').slideUp();
        }
    });
}
//script for arrow toggle accordian end

function checkNavMenu(){
    if($(window).width() > 991 && sessionStorage.getItem("isLoggedIn") == null)
    {
        $(".right-main-column").css("margin-left", "0");
        $(".global-header").css("left", "0");
        this.showNavigation = true;
        $(".global-nav").hide();
    }
    else if($(window).width() > 991 && sessionStorage.getItem("isLoggedIn") == "true")
    {
        $(".global-nav").show();
        $(".right-main-column").css("margin-left", "250px");
        $(".global-header").css("left", "250px");
        this.showNavigation = true;
    }
    /*else
    {
        $(".right-main-column").css("margin-left", "0");
        $(".global-header").css("left", "0");
        this.showNavigation = true;
    }*/
}


//var openKeybordPress=null;
var keyPressOn=false;
function vartualKeybord(vartualPass,keyBoardDiv){
    console.log("vartualPass-->"+vartualPass+"  keyBoardDiv--->"+keyBoardDiv);

    $(function () {
      keyPressOn=true;
        // $("#"+vartualPass)
        $("#"+vartualPass)
          // apply keyboard
          .keyboard({
            layout: 'custom',
            customLayout : {
              'default': [
                '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                'q w e r t y u i o p [ ] \\',
                'a s d f g h j k l ; \'',
                '{shift} z x c v b n m , . / {shift}'
              ],
              'shift': [
                '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                'Q W E R T Y U I O P { } |',
                'A S D F G H J K L : "',
                '{shift} Z X C V B N M < > ? {shift}'
              ]
            },
            // keyboard always visible
            alwaysOpen: true,
            // disable position utility
            position: '',
            // use original input only
            usePreview: false,
            // add keyboard to desired div
            appendTo: "#"+keyBoardDiv,
            // initialize scramble
            initialized: function (e, keyboard, el) {

              setTimeout(function () {
                keyboard.$keyboard = keyboard.scramble_setup(keyboard.$keyboard);

              }, 0);
            },
            validate : function(keyboard, value, isClosing) {
                return true;
              }
          })
          .addScramble({
            targetKeys: /[a-z\d]/i, // keys to randomize
            byRow: true, // randomize by row, otherwise randomize all keys
            randomizeOnce: true // if false, randomize every time the keyboard opens
          });

      });
      return keyPressOn;
}


/*function vartualKeybord(vartualPass,keyBoardDiv){
    keyPressOn=true;
    $(".keypng")
          // apply keyboard
          .keyboard({
            customLayout : {
                'default': [
                  '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                  'q w e r t y u i o p [ ] \\',
                  'a s d f g h j k l ; \'',
                  '{shift} z x c v b n m , . / {shift}'
                ],
                'shift': [
                  '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                  'Q W E R T Y U I O P { } |',
                  'A S D F G H J K L : "',
                  '{shift} Z X C V B N M < > ? {shift}'
                ]
              },
              appendTo: ".keyBoardDiv",
          });
          return keyPressOn;
}*/

var captchaChecked = false;
function captcha(){
    var verifyCallback = function(response) {
        console.log("captcha :::: "+response);
        captchaChecked = true;
      };
      var widgetId1;


        grecaptcha.render('captchaDiv', {
            'sitekey' : '6Le42I8UAAAAAINt8HBuIQRI_KqYZbHBeWJhomil',
            'callback' : verifyCallback,
            'theme' : 'dark'
          });
}


function loginCaptcha(){
    var verifyCallback = function(response) {
        console.log("captcha :::: "+response);
        captchaChecked = true;
      };
      var widgetId1;


        grecaptcha.render('logincaptchaDiv', {
            'sitekey' : '6Le42I8UAAAAAINt8HBuIQRI_KqYZbHBeWJhomil',
            'callback' : verifyCallback,
            'theme' : 'light'
          });
}

function openModel(rightPanel) {
    $("."+rightPanel).addClass("right-model-show");
    $(".right-overlay").fadeIn();
    //$('body').css('overflow', 'hidden');
}

function closeModel() {
    $(".right-model").removeClass("right-model-show");
    $('.right-overlay').fadeOut();
    //$('body').css('overflow', 'auto');
}

function openTinyModel(){
    $( 'div#tm-favouriteconfirm' ).show();
    $("div#tm-favouriteconfirm" ).addClass("tinymodal-showing");
    $( 'body' ).css( 'overflow', 'hidden' );
}

function closeTinyModel(){
    $('div#tm-favouriteconfirm' ).fadeOut();
    $("div#tm-favouriteconfirm" ).removeClass("tinymodal-showing");
    $('body' ).css( 'overflow', 'auto' );
}

function openTinyModel1(){
  $( 'div#tm-favouriteconfirm1' ).show();
  $("div#tm-favouriteconfirm1" ).addClass("tinymodal-showing");
  $( 'body' ).css( 'overflow', 'hidden' );
}

function closeTinyModel1(){
  $('div#tm-favouriteconfirm1' ).fadeOut();
  $("div#tm-favouriteconfirm1" ).removeClass("tinymodal-showing");
  $('body' ).css( 'overflow', 'auto' );
}

function openTinyModel2(){
  $( 'div#tm-favouriteconfirm2' ).show();
  $("div#tm-favouriteconfirm2" ).addClass("tinymodal-showing");
  $( 'body' ).css( 'overflow', 'hidden' );
}

function closeTinyModel2(){
  $('div#tm-favouriteconfirm2' ).fadeOut();
  $("div#tm-favouriteconfirm2" ).removeClass("tinymodal-showing");
  $('body' ).css( 'overflow', 'auto' );
}

function openTinyModel3(){
  $( 'div#tm-favouriteconfirm3' ).show();
  $("div#tm-favouriteconfirm3" ).addClass("tinymodal-showing");
  $( 'body' ).css( 'overflow', 'hidden' );
}

function closeTinyModel3(){
  $('div#tm-favouriteconfirm3' ).fadeOut();
  $("div#tm-favouriteconfirm3" ).removeClass("tinymodal-showing");
  $('body' ).css( 'overflow', 'auto' );
}

// function closekeypad(){
// $(document).click(function() {
//     alert(openKeybord);
// if(openKeybord==true){
//     alert("called");
//    // $('#keyBoardDiv').hide();
//     openKeybord=null;
// }
// });
// }

$(document).click(function(e) {
   console.log("event id-->"+e.target.id)
    if(e.target.id=="keypng"){
     $('#keyBoardDiv').show();
     vartualKeybord("vartualPass","keyBoardDiv");

    }else if(e.target.id=="keypng1"){
        $('#keyBoardDiv1').show();
        vartualKeybord("vartualPass1","keyBoardDiv1");
    }
    else{
     $('#keyBoardDiv').hide();
     $('#keyBoardDiv1').hide();
    }
 });


 /*=========Wizard Next Previous Script::=========*/

$(document).ready(function () {
  var navListItems = $('div.setup-panel div a'),
     allWells = $('.setup-content'),
     allNextBtn = $('.nextBtn'),
     allprevBtn = $('.prevBtn');

 allWells.hide();

 navListItems.click(function (e) {
     e.preventDefault();
     var $target = $($(this).attr('href')),
         $item = $(this);

     if (!$item.hasClass('disabled')) {
         navListItems.removeClass('btn-primary').addClass('btn-default');
         $item.addClass('btn-primary');
         allWells.hide();
         $target.show();
         $target.find('input:eq(0)').focus();
     }
 });

 allNextBtn.click(function () {
     var curStep = $(this).closest(".setup-content"),
         curStepBtn = curStep.attr("id"),
         nextStepWizard = $('div.setup-panel div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
         curInputs = curStep.find("input[type='text'],input[type='url']"),
         isValid = true;

     if (isValid)
         nextStepWizard.removeAttr('disabled').trigger('click');
 });
 allprevBtn.click(function () {
     var curStep1 = $(this).closest(".setup-content"),
         curStepBtn1 = curStep1.attr("id"),
         prevStepWizard = $('div.setup-panel div a[href="#' + curStepBtn1 + '"]').parent().prev().children("a"),
         curInputs1 = curStep1.find("input[type='text'],input[type='url']"),
         isValid = true;

     if (isValid)
         prevStepWizard.removeAttr('disabled').trigger('click');
 });

 $('div.setup-panel div a.btn-primary').trigger('click');

 $('body').on('click', '.setup-content .nextBtn' , function(){
    var prevSteps =  $('.stepwizard').find('.btn-primary').parent().prevAll('div').find('a')
    prevSteps.addClass('completed')
  });


});

/*=========Wizard Next Previous Script End Here::=========*/
