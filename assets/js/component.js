Vue.component('list-component', {
    template : '#list-component',
    props : [ 'lists' ]
})

Vue.component('loading', {
    template : '#loading'
})

const v = new Vue({
    el: "#lists",
    data() {
        return {
            newslists : []
        }
    }
})

const loading = document.querySelector(".loading");
loading.classList.add("active-loading");
fetch('/getNewsData')
.then(data => data.json())
.then(json => {
    loading.classList.remove("active-loading");
    v.newslists = json;
    console.log(v.newslists);
})

