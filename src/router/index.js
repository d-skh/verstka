import Vue from 'vue'
import Router from 'vue-router'

import ButtonsDemo from '@/components/ButtonsDemo.vue'
import FormsDemo from '@/components/FormsDemo.vue'
import CardsDemo from '@/components/CardsDemo.vue'
import DialogsDemo from '@/components/DialogsDemo.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            redirect: '/buttons'
        },
        {
            path: '/buttons',
            name: 'Buttons',
            component: ButtonsDemo
        },
        {
            path: '/forms',
            name: 'Forms',
            component: FormsDemo
        },
        {
            path: '/cards',
            name: 'Cards',
            component: CardsDemo
        },
        {
            path: '/dialogs',
            name: 'Dialogs',
            component: DialogsDemo
        }
    ]
})