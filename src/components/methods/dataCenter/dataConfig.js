import {getHealth} from '../../../service/mine'

const data = function () {
    return {
        text: 'hello'
    }
}

const computed = {
    text1: function () {
        this.getHealthFun()
        return this.text + "  world"
    }
}

const components = {}

const methods = {
    getHealthFun() {
        getHealth().then(res => {
            if (res) {

            }
        }).catch(err => {

        })
    }
}

function mounted() {
    this.getHealthFun()
}

export default {
    data: data,
    components: components,
    methods: methods,
    computed: computed,
    mounted: mounted
}
