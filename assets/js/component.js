Vue.component('list-component', {
    template : '#list-component',
    props : [ 'lists' ]
})

const v = new Vue({
    el: "#lists",
    data() {
        return {
            newslists : []
        }
    }
})

fetch('/getNewsData')
.then(data => data.json())
.then(json => {
    v.newslists = json;
    console.log(v.newslists);
})

