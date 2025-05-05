var numberDepage = 0
let resultat


let pageIndex = 0;
function load_labo(filter, pagination) {

  let endpoint = `${API_HOST_NAME}/api/manage/organizations/laboratory/search`;

  if (filter.query && filter.query.length > 0) {
    endpoint += `${endpoint.endsWith('search') ? '?' : '&'}q=${filter.query}`;

  }
  else if (!filter.query && pagination == undefined) {
    endpoint += `${endpoint.endsWith('search') ? '?' : '&'}q=&page=0&size=10`;

  }
  else if (filter.query && filter.query.length > 0 || pagination) {
    endpoint += `${endpoint.endsWith('search') ? '?' : '&'}q=`;
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
    query: urlParams.get('query'),

  };

  if (filter.query) {
    $('input[name=query]').val(filter.query)
  }

  load_labo(filter).then(page => {
    if (page.content.length) {
      $('.list-doctors-wrapper').empty();
      resultat = page.content
      $('#page-actule').text(page.number + 1)
      $('#total-page').text('-' + page.totalPages)
      append_data(resultat);
      if (page.last) {
        $('#next-button').empty()
        $('#prev-button').css("display", "block")

      }
      if (page.first) {
        $('#prev-button').css("display", "none")
      }
    }
  }).catch(e => console.error(e));

  $('.pagination-container #next-button ').on('click', () => {
    $('#prev-button').css("display", "block")
    $('.list-doctors-wrapper').empty()

    load_labo(filter, { page: ++pageIndex, size: Number(urlParams.get('size') || 10) }).then(page => {
      if (page.content.length) {
        resultat = page.content
        $('#page-actule').text(page.number + 1)


        append_data(resultat);
        if (page.last) {
          $('#next-button').css("display", "none")
        }
      }
    }).catch(e => console.error(e));
  })

  $('.pagination-container #prev-button ').on('click', () => {
    $('#prev-button').css("display", "block")
    $('#next-button').css("display", "block")

    load_labo(filter, { page: --pageIndex, size: Number(urlParams.get('size') || 10) }).then(page => {
      if (page.content.length) {
        resultat = page.content
        $('#page-actule').text(page.number + 1)
        $('.list-doctors-wrapper').empty()

        append_data(resultat);
        if (page.first) {
          $('#prev-button').css("display", "none")

        }
      }
    }).catch(e => console.error(e));
  })
})


function append_data(data) {
  if (data.length > 0) {
    data.map(function (labo, index) {

      $('.list-doctors-wrapper ').append(

        `
    <div class="col-md-4 col-sm-6 col-12 mb-sm-4 mb-4 item-society">
              <div class="card card-custom card-color-purple d-flex flex-column h-100">
                  <div class="card-header">
                      <a ><strong>${labo.name}</strong></a>
                  </div>
                  <div class="card-body">
                      <div class="small">
                          <a >
                          ${labo.address}  
                          </a>
                      </div>
                      <div class="address">
                      <span> ${labo.government}</span>
                      <span> ${labo.city!==null?labo.city:""}</span>
                   
                  </div>
                  <div>
                  ${labo.fixPhone?'<i class="feather-phone"></i>':""} ${labo.fixPhone}
                  </div>
                 
              </div>
          </div>

          
    `
      )

    })
  }
}
