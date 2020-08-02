if(localStorage.getItem("initalized") !== "true"){
    localStorage.setItem("itNews",'{"id":"","pw":""}');
    localStorage.setItem("initalized","true");
}

const loading = document.querySelector(".loading");
loading.classList.add("active-loading");
fetch('/getNewsData')
.then(data => data.json())
.then(json => {
    loading.classList.remove("active-loading");
    v.newslists = json;
})

// fetch("/setSession")
// .then(data => console.log(data));