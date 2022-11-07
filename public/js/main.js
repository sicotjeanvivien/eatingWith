window.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#js_search_by_city") && document.querySelector("#js_search_by_city").addEventListener("change", e => searchRestaurantByCity(e));
    document.querySelectorAll(".js_modal_button_show").forEach(element => {
        element.addEventListener("click", e => toggleShowModal(e));
    });
    document.querySelector("#js_modal_delete_fetch") && document.querySelector("#js_modal_delete_fetch").addEventListener("click", e => fetchDelete(e));



    initMap(['48.8588897', '2.320041']);


}, false);

const searchRestaurantByCity = (e) => {
    e.preventDefault();
    let city = e.currentTarget.value;

    if (city) {
        let url = new URL("/search/", window.location.origin);
        url.searchParams.append("city_name", city);
        fetch(url, {
            method: "GET"
        }).then(res => res.json()).then(res => {
            let GpsCity = [res.city.latitude, res.city.longitude];
            updateMap(GpsCity, res.restaurants);
        })
    }
}
const initMap = (GpsCity) => {
    document.mapInstance = L.map('map', {
        center: GpsCity,
        zoom: 15
    });
    // map.setView(GpsCity, 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(document.mapInstance);
}

const updateMap = (GpsCity, restaurants) => {
    let renderView = "";
    document.mapInstance.eachLayer((layer) => {
        layer.remove();
    });
    document.mapInstance.flyTo(GpsCity);

    restaurants.map((elem, value) => {
        console.log(elem);
        L.marker([elem.latitude, elem.longitude]).bindPopup("<b> " + elem.name + "</b>.").openPopup().addTo(document.mapInstance);
        renderView += `
        <div class="card col-3">
        <img src="/images/restaurant.jpg" class="card-img-top" alt="image restaurant">
        <div class="card-body">
          <p class="card-text">` + elem.name + `</p>
          <a class="btn btn-info" href="/restaurant/ ` + elem.id + `"> Plus d'information </a>
        </div>
      </div>
        `;
    });
    document.querySelector("#js_list_restaurant_fetch").innerHTML = renderView;
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 25,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(document.mapInstance);
}


// MODAL
const toggleShowModal = (e) => {
    e.preventDefault();
    document.querySelector("#js_modal").classList.toggle("d-block");
}
const fetchDelete = (e) => {
    e.preventDefault();
    let url = new URL("/restaurants/" + e.currentTarget.dataset.id, window.location.origin)
    fetch(url, {
        method: "DELETE",
        credentials: 'same-origin',
        headers: {
            'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').attributes.content.textContent
        }
    }).then(res => res.json()).then(res => {
        if (res[0].error) {
            window.location.assign(window.location.origin)
        }
        document.querySelector("#js_modal_delete_fetch_error").innerHTML = res.message
    })
}
