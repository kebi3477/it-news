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

