import { government } from "./ville.js";
import { Country } from "./pays.js";

function getSpecialite() {
    fetch(
        `${API_HOST_NAME}/api/manage/specialities`, {
        method: "GET",
        redirect: "follow", // manual, *follow, error
        referrerPolicy: "no-referrer", // no-referr
        headers: { "Content-type": "application/json;" },
    }
    ).then((response) => {
        return response.json();
    }).then((data) => {
        data.data.map((elm) => {
            var select = document.getElementById("selectElementId");
            var opt = document.createElement("option");
            opt.value = elm.name;
            opt.id = "search-specialite";
            opt.innerHTML = elm.name;
            opt.p;
            select.appendChild(opt);
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
        selectVille.appendChild(opt);
    });
}

getGovernment();

function getVilles() {
    Country.map((elm) => {
        var selectVille = document.getElementById("selectPays");
        var opt = document.createElement("option");
        opt.value = elm.name;
        opt.innerHTML = elm.name;
        selectVille.appendChild(opt);
    });
}
getVilles()

const allBtns = document.querySelectorAll('.style-row'); 

allBtns.forEach(btn => {
   btn.addEventListener('click', function onClick(){
    btn.style.backgroundColor =' #820040'; 
    btn.style.color="#ffffff"
 })
})