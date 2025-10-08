<template>
  <q-layout view="lHh lpR lff">

    <q-header class="lt-sm">

      <q-toolbar>



        <q-btn  dense flat icon="menu" @click="toggleLeftDrawer" />
        <q-space />
        
        <theme-toggle />
        <q-btn  flat dense icon="help" />
        <q-btn c flat dense icon="notifications">
          <q-badge floating color="red" transparent v-if="totalCount > 0">
          {{ totalCount }}
        </q-badge>
        </q-btn>
        <router-link to="/profile" custom v-slot="{ navigate }">
  <q-btn
  v-if="$route.path !== '/profile'"
    
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

      <theme-toggle />
      <q-btn  dense flat icon="help">
        <q-tooltip>
      Помощь
    </q-tooltip>
      </q-btn>
      <q-btn  dense flat icon="notifications">
        <q-tooltip>
      Уведомления
    </q-tooltip>
        <q-badge floating color="red" transparent v-if="totalCount > 0">
          {{ totalCount }}
        </q-badge>
      </q-btn>
      <router-link to="/profile" custom v-slot="{ navigate }">
  <q-btn
  v-if="$route.path !== '/profile'"
    class="toolbar_button"
    dense
    flat
    icon="account_circle"
    @click="navigate">
    <q-tooltip>
      Профиль
    </q-tooltip>
  </q-btn>

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
import drawer from '@/components/layout/Drawer.vue'
import appFooter from '@/components/layout/Footer.vue'
import ThemeToggle from '@/components/utilits/ThemeToggle.vue'
import { mapGetters, mapActions } from 'vuex'


export default {
  components: {
    drawer,
    appFooter,
    ThemeToggle,
  },

  computed: {
    ...mapGetters({
      questionsCount: 'questions/questionsCount',
      devicesCount: 'devices/devicesCount'
    }),
    totalCount() {
      return (this.questionsCount || 0) + (this.devicesCount || 0)
    }
  },

  methods: {
    ...mapActions('drawer', ['toggleLeftDrawer']),

    refreshData() {
      this.$store.dispatch('desktop/fetchDashboardData')
    }
  }
}
</script>
