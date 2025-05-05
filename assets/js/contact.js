

var form = document.getElementById('form')
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const mail = document.getElementById('mail').value
  const content = document.getElementById('content').value
  const firstName = document.getElementById('firstName').value
  const role = document.getElementById('role').value
  const tel = document.getElementById('tel').value
  const lastName = document.getElementById('lasteName').value

  fetch(`${API_HOST_NAME}/api/contact`, {
    method: "POST",
    redirect: "follow", // manual, *follow, error
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      role: role,
      tel: tel,
      mail: mail,
      content: content,
    }),
    referrerPolicy: "no-referrer", // no-referr
    headers: { "Content-type": "application/json;" },
  }).then((response) => response.json()).then((data) => data.success == true ? location.href = "https://connect.altabib.tn/auth/login" : window.alert('Cette Compte deja Existe'))
})