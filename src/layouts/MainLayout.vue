<template>
  <q-layout view="lHh lpR lff">

    <q-header class="lt-sm">

      <q-toolbar>



        <q-btn class="toolbar_button" dense flat icon="menu" @click="toggleLeftDrawer" />
        <q-space />

        <q-btn class="toolbar_button" flat dense icon="help" />
        <q-btn class="toolbar_button" flat dense icon="notifications">
          <q-badge floating color="red" transparent v-if="notificationsCount > 0">
            {{ notificationsCount }}
          </q-badge>
        </q-btn>
        <router-link to="/profile" custom v-slot="{ navigate }">
  <q-btn
    class="toolbar_button"
    dense
    flat
    round
    icon="account_circle"
    @click="navigate"
  />
</router-link>





      </q-toolbar>
    </q-header>

    <drawer />

    <!-- Хэдер, который теперь находится в правой части -->

    <q-toolbar class="gt-xs">
      <q-space /> <!-- Пустое пространство слева, чтобы кнопки были справа -->

      <q-btn class="toolbar_button" dense flat round icon="help" />
      <q-btn class="toolbar_button" dense flat round icon="notifications">
        <q-badge floating color="red" transparent v-if="notificationsCount > 0">
          {{ notificationsCount }}
        </q-badge>
      </q-btn>
      <router-link to="/profile" custom v-slot="{ navigate }">
  <q-btn
    class="toolbar_button"
    dense
    flat
    round
    icon="account_circle"
    @click="navigate"
  />
</router-link>
      <!--
          <q-item clickable v-ripple class="profile">
            <q-item-section avatar>
              <q-icon flat round dense name="account_circle" />
            </q-item-section>

            <q-item-section>

              <div class="user_name">{{ userName.split(' ')[0] }}<br>{{ userName.split(' ')[1] }}</div>
            </q-item-section> 

          </q-item>-->
    </q-toolbar>


    <q-page-container>

      <router-view />
    </q-page-container>

    <appFooter />

  </q-layout>
</template>

<script>
import drawer from '@/components/layout/Drawer2.vue'
import appFooter from '@/components/layout/Footer.vue'
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {
    drawer,
    appFooter,
  },

  computed: {
    ...mapGetters('user', {
      notificationsCount: 'currentUserNotifications',
      userName: 'currentUserName'
    })
  },

  methods: {
    ...mapActions('drawer', ['toggleLeftDrawer']),

    refreshData() {
      this.$store.dispatch('desktop/fetchDashboardData')
    }
  }
}
</script>
