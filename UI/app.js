function validateForm() {
    const url = 'http://localhost:8080/register';
    fetch(url, {
        method: 'post',
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json"
        },
        body: '{ "firstName": "' + document.forms["registrationForm"]["firstname"].value + '", "lastName": "' +
            document.forms["registrationForm"]["lastname"].value + '", "partyID": ' +
            findIndexInParty(document.getElementById("dropdown").options[document.getElementById("dropdown").selectedIndex].value) + ' }'
    }).then(function (resp) {
        if (resp.status === 201) {
            resp.json().then(function (data) {
                console.log(data);
            });
        } else {
            resp.text().then(function (data) {
                alert(data);
            });
        }
    })
        .catch(function (error) {
            alert(error);
        });
}
var parties = [];
function loadPartys() {
    fetch("http://localhost:8080/parties", {
        method: 'get',
        headers: {
            "Authorization": "Basic YWRtaW46UEBzc3cwcmQh",
            "Accept": "application/json",
            "Content-type": "application/json"
        }
    }).then(function (resp) {
        if (resp.status === 201) {
            resp.json().then(function (data) {

            });
        } else {
            resp.text().then(function (data) {
                var select = document.getElementById("dropdown")
                var obj = JSON.parse(data);
                parties = obj;
                for (var i = 0; i < obj.length; i++) {

                    var option = document.createElement('option'),
                        partyName = document.createTextNode(obj[i].title);

                    option.appendChild(partyName);
                    select.add(option);
                }
                console.log(obj[i]);
            });
        }
    })
        .catch(function (error) {
            alert(error);
        });
}

function findIndexInParty(name){
    var index = 0;
    for(var i = 0; i < parties.length; i++){
        if(parties[i].title === name){
            index = parties[i].partyID;
        }
    }
    return index;
}