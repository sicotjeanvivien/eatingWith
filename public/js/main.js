window.addEventListener('DOMContentLoaded', () => {
    console.log("START JS");
    document.querySelector("#js_search_by_city").addEventListener("change", e => searchRestaurantByCity(e));

}, false);

const searchRestaurantByCity = (e) => {
    e.preventDefault();
    let city = e.currentTarget.value;
    console.log(city);

    let url = new URL("/search/", window.location.origin);
    url.searchParams.append("city_name", city);

    fetch(url, {
        method: "GET"
    }).then(res => res.text()).then(res => {
        console.log(res);
        document.querySelector("#js_list_restaurant_fetch").innerHTML = res
    })

}