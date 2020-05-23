$('.multiple-items').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1
            }
        }
    ]
});
$('.js-nav-open').on('click',function () {
    $('.js-nav').toggleClass('show');
    $(this).toggleClass('active');
});
$('.js-scroll-top').on('click',function (e) {
    var elem = $(this).attr('href');
    var top = $(elem).offset().top;
    $('html,body').animate({ scrollTop: top }, 500);
    e.preventDefault()
});
$('#subscribe').on('submit',function (e) {
    e.preventDefault();
    var $form = $(this),
        name = $form.find('input[name="name"]'),
        email = $form.find('input[name="email"]'),
        nameV = false,
        emailV = false;


    if(name.val().length === 0){
        name.addClass('error-input').attr('placeholder','Поле не может быть пустым')
    }else{
        name.removeClass('error-input').addClass('valid').attr('placeholder','Имя')
        nameV = true;
    }
    var pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    if(email.val() != ''){
        if(email.val().search(pattern) == 0){
            email.removeClass('error-input').addClass('valid').attr('placeholder','Email').parent('div').removeClass('open-message');
            emailV = true;
        }else{
            email.addClass('error-input').parent('div').addClass('open-message');
        }
    }else{
        email.addClass('error-input').attr('placeholder','Поле e-mail не должно быть пустым!');
    }
    if(nameV && emailV){
        $('.js-successful-sending').show().text('Сообщение успешно отправленно')
    }else{
        $('.js-successful-sending').hide()
    }
});


var theItem = null;
var replaceItem = function () {
    var priorItem = JSON.parse(theItem);
    // var priorItem = theItem;
    var writeToLog = function () {
        if (priorItem) {
            console.log("hi");
        }
    };
    theItem = {
        longStr: new Array(1000000).join('*'),
        someMethod: function () {
            console.log(someMessage);
        }
    };
};
setInterval(replaceItem, 1000);

// утечка памяти происходилла изза переменной priorItem в которой хранилась ссылка на создаваемый объект.
// заменил помещение ссылки на объект (theItem) в перемемнную priorItem на создание нового объекта на основе текущего (theItem)
// это исключает создание ссылки на объект


