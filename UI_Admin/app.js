function loadGuests() {
    var url = "http://localhost:8080/guestsAtParty/" + findIndexInParty(document.getElementById("dropdown").options[document.getElementById("dropdown").selectedIndex].value);
    fetch(url, {
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
                var obj = JSON.parse(data);
                console.log(obj);

                var tableRef = document.getElementById('guests'); 
                tableRef.innerHTML="";               
                table = document.createElement('table');
                for (var i = 0; i < obj.length; i++) {

                    var tr = document.createElement('tr');

                    var td1 = document.createElement('td');
                    var td2 = document.createElement('td');

                    var text1 = document.createTextNode(obj[i].firstName);
                    var text2 = document.createTextNode(obj[i].lastName);

                    td1.appendChild(text1);
                    td2.appendChild(text2);
                    tr.appendChild(td1);
                    tr.appendChild(td2);

                    table.appendChild(tr);
                }
                tableRef.appendChild(table);
                console.log(obj[i]);
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

function findIndexInParty(name) {
    var index = 0;
    for (var i = 0; i < parties.length; i++) {
        if (parties[i].title === name) {
            index = parties[i].partyID;
        }
    }
    return index;
}