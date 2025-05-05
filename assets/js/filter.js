
let pageIndex = 0;
let filterSpec = {
  spec: ""
}
function load_doctors(filter, pagination) {
  let endpoint = `${API_HOST_NAME}/api/organizations/cabinets/search`;

  if (filter.spec && filter.spec.length > 0) {
    endpoint += `${endpoint.endsWith('search') ? '?' : '&'}spec=${filter.spec}`;
  }

  if (filter.query && filter.query.length > 0) {
    endpoint += `${endpoint.endsWith('search') ? '?' : '&'}q=${filter.query}`;

  }

  if (filter.gov && filter.gov.length > 0) {
    endpoint += `${endpoint.endsWith('search') ? '?' : '&'}gov=${filter.gov}`;
  }


  if (filter.subscription && filter.subscription == 'true') {
    endpoint += `${endpoint.endsWith('search') ? '?' : '&'}subscription=${filter.subscription}`;
  }

  if (pagination) {
    if (pagination.page)
      endpoint += `${endpoint.endsWith('search') ? '?' : '&'}page=${pagination.page}`;
    if (pagination.size)
      endpoint += `${endpoint.endsWith('search') ? '?' : '&'}size=${pagination.size}`;
  }

  return new Promise((resolve, reject) => {
    fetch(endpoint, {
      method: "GET",
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referr
      headers: { "Content-type": "application/json;" },
    }
    ).then((response) => {
      return response.json();
    }).then((response) => {
      if (response.success)
        resolve(response.data)
      else reject(response.error)
    }).catch(e => reject(e));
  })
}


$('body').ready(() => {
  const urlParams = new URLSearchParams(window.location.search);
  let filter = {
    query: urlParams.get('q'),
    spec: urlParams.get('spec'),
    gov: urlParams.get('gov'),
    subscription: urlParams.get('subscription')
  };

  if (filter.query) {
    $('input[name=q]').val(filter.query)
  }
  if (filter.gov) {
    $('select[name=gov]').val(filter.gov)
  }

  $('#loadmore a').on('click', () => {
    load_doctors(filter, { page: ++pageIndex, size: Number(urlParams.get('size') || 10) }).then(page => {
      if (page.content.length) {
        append_data(page.content);
        if (page.last) {
          $('#loadmore').empty()
        }
      }
    }).catch(e => console.error(e));
  })

})

function append_data(data) {
  if (data.length > 0) {
    data.map(function (cabinet, index) {
      $('.list-doctors-wrapper').append(
        `<div class="attribute-user">
        <a class=" avatar-sm"><img class="avatar-img rounded-circle" src="${cabinet?.photo !== null ? STORAGE_URL + "/" + cabinet.photo : "assets/img/user-avatar.png"}" alt="User Image" /></a>
        <div class="contact-user">
          <div class="row">
              <a class="col-lg-6 name-user" href="${cabinet.owner ?`./profile.html?id=${cabinet.owner.id}`:''}">
                ${cabinet.name}
              </a>
              <div class="col-lg-6">
              <a class="btn-style btn-rendez" style="background-color:${cabinet.owner ? '#b1005a' : '#008d93'}" href="${cabinet.owner ? `${DASHBOARD_HOST_NAME}/login?backTo=/search/${cabinet.owner.id}` : `${DASHBOARD_HOST_NAME}/auth/register`}">${cabinet.owner ? 'Prendre rendez-vous' : 'Nous contacter'}</a>
              </div>
              </div>

              <span class="specialtiy-name">
              ${cabinet.speciality.name}
            </span>
            <div class="contact">
            <div class="contact-patient">Adresse:<span>
            ${cabinet.address}
          </span> </div>
         <div style="display:flex">
         <div class="contact-patient" style="visibility:${cabinet.fixPhone ? 'visible' : 'hidden'}">Tel: <span>
       ${cabinet.fixPhone}
     </span> </div>
         <div class="contact-patient" style="visibility:${cabinet.mobilePhone1 ? 'visible' : 'hidden'}">Mob: <span>
         ${cabinet.mobilePhone1}
       </span> </div>
       
         </div>
            </div>
        </div>
      </div>`
      )
    });
  }
}
