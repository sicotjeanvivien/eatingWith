window.addEventListener('DOMContentLoaded', () => {
    console.log("START JS");
    document.querySelector("#js_search_by_city") && document.querySelector("#js_search_by_city").addEventListener("change", e => searchRestaurantByCity(e));
    document.querySelectorAll(".js_modal_button_show").forEach(element => {
        element.addEventListener("click", e => toggleShowModal(e));
    });
    document.querySelector("#js_modal_delete_fetch") && document.querySelector("#js_modal_delete_fetch").addEventListener("click", e => fetchDelete(e))

}, false);

const searchRestaurantByCity = (e) => {
    e.preventDefault();
    let city = e.currentTarget.value;

    if (city) {
        let url = new URL("/search/", window.location.origin);
        url.searchParams.append("city_name", city);
        fetch(url, {
            method: "GET"
        }).then(res => res.text()).then(res => {
            document.querySelector("#js_list_restaurant_fetch").innerHTML = res
        })
    }
}


// MODAL

const toggleShowModal = (e) => {
    console.log("log", document.querySelector("#js_modal").classList);
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
        console.log(res);
        if (res[0].error) {
            window.location.assign(window.location.origin)
        }
        document.querySelector("#js_modal_delete_fetch_error").innerHTML = res.message


    })
}
