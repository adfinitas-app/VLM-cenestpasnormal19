var merci = false;

$(document).foundation();
$(document).ready(function() {
    $("#f_phone").intlTelInput({
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/12.1.13/js/utils.js",
        initialCountry: "fr"
    });


    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-sign span').html(snapshot.val());
        $('#nb-sign').css('visibility','visible')
    });

    fillFieldsFromUrl()

    if ($(window).width() > 1010 && !merci) {
        $('.container-right').height(
            $('#body').height() + $('#petition').height() + 220
        )
    }

    preload(["https://heroku-adfinitas-campaign.s3.amazonaws.com/VLM-2019/19-plaidoyer-CRCM/merci.jpg"])

});

function addVote() {
    var CountRef = firebase.database().ref('count');

    CountRef.once('value', function(snapshot) {
        $('#nb-sign span').html(snapshot.val() + 1);
        firebase.database().ref('count').set(snapshot.val() + 1);
    });

}

$(window)
    .scroll( function() {
        if (($(window).width() < 1010) &&  (($(window).scrollTop() + $(window).innerHeight() + 1) >= $(document).innerHeight())) {
            $('#closeForm').fadeIn();
            $('.container-form').animate({
                top: 0
            }, 500, function() {
            });
        }
    })
    .resize( function () {
        if ($(window).width() > 1010 && !merci) {
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
        top: '-200%'
    }, 500, function() {
        // Animation complete.
    });
});


$('form').submit( function (e) {
    e.preventDefault();
    if (validateForm()) {
        addVote()
        merci = true

        var CountRef = firebase.database().ref('count');

        CountRef.once('value', function(snapshot) {
            sendData(snapshot.val())
        });


        $('.container-right').css({'min-height':'100vh', 'height':'auto','padding-bottom':'220px'});
        $('.container-form').fadeOut('slow', function () {

        })
        $('.container-left').addClass('medium-7')
        $('.container-right').addClass('medium-5')
        $('.container-footer').fadeIn('slow', function () {

        })
        $('.container-deploy-form').fadeOut('slow', function () {
        });
        $('.container-merci').fadeIn('slow', function () {

        })
        $('#merci').css('min-height', $('.container-right').height() + 250)
        $('#body').slideUp(function () {
            $(this).hide()
        })
        $('.petition').slideUp(function () {
            $(this).hide()
        })
        $('#merci').slideDown()
    }


});

function validateForm() {
    var check = true;
    var el = $('form');


    $('.error').hide();
    el.find('input').each( function() {
        $(this).removeClass('red-border');
    });

    var phone = el.find('input[name=f_phone]');
    var firstname = el.find('input[name=f_firstname]');
    var lastname = el.find('input[name=f_lastname]');
    var email = el.find('input[name=f_email]');


    if (phone.val() !== "") {
        if (!phone.intlTelInput("isValidNumber")) {
            $('.wrong-phone').show();
            phone.addClass('red-border');
            check = false;
        }
    }
    if (!validateEmail(email.val())) {
        $('.wrong-email').show();
        email.addClass('red-border');
        check = false;
    }

    if (firstname.val() === "") {
        $('.required-firstname').show();
        firstname.addClass('red-border');
        check = false;
    }
    if (lastname.val() === "") {
        $('.required-lastname').show();
        lastname.addClass('red-border');
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