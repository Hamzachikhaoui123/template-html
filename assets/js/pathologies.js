let resultats = [];
let indexValue = 0;
let specialities = [];
function allPathologies() {
  let url = `${API_HOST_NAME}/api/pathologies`;
  return new Promise((resovle, reject) => {
    fetch(url, {
      method: "GET",
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referr
      headers: { "Content-type": "application/json;" },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) resovle(response.data);
        else reject(response.error);
      })
      .catch((error) => reject(error));
  });
}

allPathologies().then((elm) => {
  resultats = elm;
  append(elm);
});
function append(data) {
  if (data.length > 0) {
    data.map(function (elm, index) {
      $(".check-list ").append(
        `
          <li onclick="show_sub(this)" id="app">                <i class="feather feather-link" style="color:#b1005a"></i>
          <a id="anchor" >${elm.label}</a>
          <ul class="nav" style="display:none">
          <li>${elm.description}</li>
          
      </ul>
          </li>

       
            
      `
      );
    });
  }
}
function show_sub(cat) {
  cat.querySelector("ul").style.display =
    cat.querySelector("ul").style.display == "block" ? "none" : "block";
  $("#specialité").empty();
}

$(document).on("click", "#anchor", function (e) {
  resultats.filter((elm) => elm.label == this.text);
  specialities = resultats.filter((elm) => elm.label == this.text)[0]
    ?.specialities;
  specialities.map((elm, index) => {
    appendSpec(elm);
  });
});
function appendSpec(data) {
  console.log("data", data);

  $("#specialité").append(`
        <a class="span-spec" onclick="show(this)" >${data.specialiteNom}</a>
       `);
}
