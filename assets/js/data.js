function sendData(nb) {
    var data = {
        "db": {
            "schema": "vlm_plaidoyer1",
            "db": {
                "email": pureField($('#f_email').val()),
                "phone": pureField(getPhone()),
                "firstname": pureField($('#f_firstname').val()),
                "lastname": pureField($('#f_lastname').val()),
                "numero_signataire": nb,
                "date_signature": getTodayDate()
            }
        }
    };
    //console.log(data);
    makeCorsRequest(data);
}


/*
 * Debut de la lib
 */

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}
function makeCorsRequest(data) {
    var url = 'https://adfinitas-io.herokuapp.com/api/v1/organization/a4390eae-550b-485b-9ade-95b87cbc1170/webhook/ed04be13-3d8d-4023-bd5f-e86493dc153d';
    var body = JSON.stringify(data);
    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        alert('CORS not supported');
        return;
    }
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(body);
}

/*
 * Fin de la lib
 */
function getTodayDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = dd + '/' + mm + '/' + yyyy;
    return today;
}
function getPhone() {
    return $('#f_phone').intlTelInput("getNumber");
}

function getPersonnalisationCourte() {
    return getCivilityLong().toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getPersonnalisation() {
    return getCivilityDear() + " " + getCivilityLong().toUpperCase() + " " + pureField($('#f_lastname').val().toUpperCase());
}

function getList() {
    var data = [];

    data.push('corrida2019');
    return data;
}

function pureField(string) {
    return (string.replace(/'/g, "%27").replace(/"/g, "&quot;"));
}


function getOptin() {
    if ($('#f_optin').is(":checked")) {
        return "false";
    }
    return "true";
}

function getSexe() {
    if ($('#f_female').attr("checked") === "checked")
        return "Femme";
    else
        return 'Homme';
}
function getCivility(el) {
    if (el.find('input[name=f_civility_female]').is(":checked"))
        return "Madame";
    if (el.find('input[name=f_civility_male]').is(":checked"))
        return "Monsieur";
    if (el.find('input[name=f_civility_femaleMale]').is(":checked"))
        return "Madame et Monsieur";
}

function getCivilityDear() {
    if ($('#f_female').attr("checked") === "checked")
        return "Chère";
    else
        return 'Cher';
}

function getCivilityLong() {
    if ($('#f_female').attr("checked") === "checked")
        return "Madame";
    else
        return 'Monsieur';
}
