Vue.component('list-component', {
    template : '#list-component',
    props : [ 'lists' ]
})

const v = new Vue({
    el: "#lists",
    data() {
        return {
            newslists : [
                {"title":"제목1","subtitle":"본문1"},
                {"title":"제목2","subtitle":"본문2"},
                {"title":"제목3","subtitle":"본문3"},
            ]
        }
    }
})