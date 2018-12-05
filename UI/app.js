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
        document.forms["registrationForm"]["partyId"].value + ' }'
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