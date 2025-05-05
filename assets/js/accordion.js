// var acc = document.getElementsByClassName("accordion-label");
// var i;

// for (i = 0; i < acc.length; i++) {
//   acc[i].addEventListener("click", function () {

//     this.classList.toggle("active");
//     var panel = this.nextElementSibling;
//     if (panel.style.display === "block") {

//       panel.style.display = "none";
//     } else {
//       panel.style.display = "block";

//     }
//   });
// }

const accordionContent = document.querySelectorAll(".accordion-content");

accordionContent.forEach((item, index) => {
  let header = item.querySelector("header");
  header.addEventListener("click", () => {
    item.classList.toggle("is-open");

    let description = item.querySelector(".accordion-content-description");
    if (item.classList.contains("is-open")) {
      // Scrollheight property return the height of
      // an element including padding
      description.style.height = `${description.scrollHeight}px`;
      item.querySelector("i").classList.replace("feather-plus", "feather-minus");
    } else {
      description.style.height = "0px";
      item.querySelector("i").classList.replace("feather-minus", "feather-plus");
    }
    // function to pass the index number of clicked header
    removeOpenedContent(index);
  })
})

function removeOpenedContent(index) {
  accordionContent.forEach((item2, index2) => {
    if (index != index2) {
      item2.classList.remove("is-open");
      let descrip = item2.querySelector(".accordion-content-description");
      descrip.style.height = "0px";
      item2.querySelector("i").classList.replace("feather-minus", "feather-plus");
    }
  })
}
const navbarVertical = document.getElementById('mobile_btn')
navbarVertical.addEventListener('click', () => {
  const navbar = document.getElementById('navbar-vertical');
  if (navbar.style.display === "none") {

    navbar.style.display = "block";
    const body = document.querySelector('.container-fluid')
    body.style.display = 'none'

  } else {
    navbar.style.display = "none";
    const body = document.querySelector('.container-fluid')

    body.style.display = 'block'

  }
})