
import { government  } from "./ville.js";
import { Country } from "./pays.js";
import {Questions} from"./question.js"
function getSpecialite() {
    fetch(
      `${API_HOST_NAME}/api/manage/specialities`,{

          method: "GET",

          redirect: "follow", // manual, *follow, error
          referrerPolicy: "no-referrer", // no-referr
          headers: {
            "Content-type": "application/json;",
          },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let spec = {
          arabicName: "",
          id: "0",
          name: "specialite",
        };
        //       data.data.insert(0,spec)
        let specs = [];
        specs = data.data;

        data.data.map((elm) => {
          var select = document.getElementById("selectElementId");
          var opt = document.createElement("option");

          opt.value = elm.id;

          opt.id = "search-specialite";
          opt.innerHTML = elm.name;
          opt.p;
          select?.appendChild(opt);
        });
      });
  }

  getSpecialite();

  function getGovernment() {
    government.map((elm) => {
      var selectVille = document.getElementById("selectVille");
      var opt = document.createElement("option");
      opt.value = elm.name;
      opt.innerHTML = elm.name;
      selectVille?.appendChild(opt);
    });
  }

  getGovernment();

  function getVilles(){
    Country.map((elm) => {
      var selectVille = document.getElementById("selectPays");
      var opt = document.createElement("option");
      opt.value = elm.name;
      opt.innerHTML = elm.name;
      selectVille.appendChild(opt);
    });
  }
  getVilles()
var form = document.getElementById("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const prenom = document.getElementById("prenom").value;
  const nom = document.getElementById("nom").value;
  const date = document.getElementById("date").value;
  const phone = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confrimpassword = document.getElementById('confrim-password').value
  const condition = document.getElementById('Condition').checked
  const specialite=document.getElementById('selectElementId').value
  const paye=document.getElementById('selectPays').value
  console.log("spe",specialite);

  if (password === confrimpassword) {
    document.querySelector(".mot-de-passe").style.display = "none"
    document.querySelector(".confrim-mot-de-passe").style.display = "none"

    if (prenom.length > 0 || nom.length > 0) {
      document.getElementById("va").style.display = "none"

      condition == true ? fetch(
        `${API_HOST_NAME}/api/account/doctor/register`,
        {
          method: "POST",

          redirect: "follow", // manual, *follow, error
          body: JSON.stringify({
            firstName: prenom,
            lastName: nom,
            birthDate: new Date(date).getTime(),
            phone: phone,
            email: email,
            password: password,
            country: paye,
            specialityId:specialite
          }),
          referrerPolicy: "no-referrer", // no-referr
          headers: {
            "Content-type": "application/json;",
          },
        }
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          data.success == true ? location.href = "./confrim-compte-patient.html" : window.alert('Cette Compte deja Existe')
        }) : window.alert(`Accept Condition d'Utilisation Altabib`)
    }
    else {
      document.getElementById("va").style.display = "block"



    }
  }
  else {
    document.querySelector(".mot-de-passe").style.display = "block"
    document.querySelector(".confrim-mot-de-passe").style.display = "block"

  }

});



Questions.map(function (elm, index) {
    $('.accordion').append(
      `   <div class="accordion-content">
      <header>
        <span class="accordion-content-title" id="title-accordion">
        ${elm.question}
        </span>
        <i class="feather-plus"></i>
      </header>
      <p class="accordion-content-description">
      ${elm.Response}
      </p>
    </div>`
    )
  });