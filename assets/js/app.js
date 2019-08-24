$(document).foundation();
$(document).ready(function() {
    $("#f_phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
        initialCountry: "fr"
    });

    fillFieldsFromUrl()

    if ($(window).width() > 1010) {
        $('.container-right').height(
            $('#body').height() + $('#petition').height() + 220
        )
    }

});

$(window)
    .scroll( function() {
    })
    .resize( function () {
        if ($(window).width() > 1010) {
            $('.container-right').height(
                $('#body').height() + $('#petition').height() + 220
            )
        }
})

$('#arrow-container').click( function () {
   scrollTo($('#petition'))
});

$('#deploy-form-small').click( function () {
    $('#closeForm').fadeIn();
    $('.container-form').animate({
        top: 0
    }, 500, function() {
        // Animation complete.
    });
});
$('#closeForm').click( function (e) {
    e.preventDefault()
    $(this).fadeOut();
    $('.container-form').animate({
        top: '-100%'
    }, 500, function() {
        // Animation complete.
    });
});


$('.form').submit( function (e) {
    e.preventDefault();
    if (validateForm($(this))) {
        sendEmail($(this));


        if ($(window).width() > 1024) {
            $('#popin-contact .bottom').slideUp('slow');
            $('.popin-contact-success').slideDown('slow');
            $('#close').fadeOut();
        }
        else {
            $('.notification').slideDown('slow', function () {
                setTimeout(function() {
                    $('.notification').slideUp('slow');
                }, 4000);

            });
        }



    }
});

function validateForm(el) {
    var inputs = el.find('input');

    var check = true;


    $('.civility *').css('color', "#727271");
    $('.error-civility').hide();
    $('.error-phone-wrong').hide();
    $('.error-birthdate-wrong').hide();
    el.find('input').each( function() {
        $(this).removeClass('red-border');
    });

    var phone = el.find('input[name=f_phone]');
    var birthdate = el.find('input[name=f_birthdate]');
    var civilityValMale = el.find('input[name=f_civility_male]').is(":checked");
    var civilityValFemale = el.find('input[name=f_civility_female]').is(":checked");
    var civilityValFemaleMale = el.find('input[name=f_civility_femaleMale]').is(":checked");


    if (phone.val() !== "") {
        if (!phone.intlTelInput("isValidNumber")) {
            $('.error-phone-wrong').show();
            phone.addClass('red-border');
            check = false;
        }
    }

    if (birthdate.val() !== "") {
        if (!validateBirthdate(birthdate.val())) {
            $('.error-birthdate-wrong').show();
            birthdate.addClass('red-border');
            check = false;
        }
    }

    if (!civilityValFemaleMale && !civilityValMale && !civilityValFemale) {
        $('.error-civility').show();

        $('.civility *').css('color', "red");
        check = false;
    }

    if (!check) {
        $('form').focus();
    }
    return check;
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function validateBirthdate(date) {
    var re = /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/ ;

    return re.test(date);
}

function extractUrlParams(){
    var t = document.location.search.substring(1).split('&'); var f = [];
    for (var i=0; i<t.length; i++){
        var x = t[ i ].split('=');
        f[x[0]]=decodeURIComponent(x[1]);
    }
    return f;
};

function fillFieldsFromUrl() {
    var p = extractUrlParams();

    if (p['email'] && p['email'] !== "undefined") {
        $("input[name=f_email]").each(function () {
            $(this).val(p['email']);
        });

    }
    if (p['firstname'] && p['firstname'] !== "undefined") {
        $("input[name=f_firstname]").each(function () {
            $(this).val(p['firstname']);
        });
    }
    if (p['lastname'] && p['lastname'] !== "undefined") {
        $("input[name=f_lastname]").each(function () {
            $(this).val(p['lastname']);
        });
    }
    if (p['phone'] && p['phone'] !== "undefined") {
        $("input[name=f_phone]").each(function () {
            $(this).val(p['phone']);
        });
    }
}

function 	scrollTo(next){
    $('html, body').stop().animate({
        scrollTop: $(next).offset().top
    }, 800, 'swing');
}

function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
    });
}