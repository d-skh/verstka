<template>
  <div id="app">
    <q-layout view="lHh Lpr lFf">
      <q-header elevated class="bg-primary text-white">
        <q-toolbar>
          <q-btn
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <q-toolbar-title>
            UI Kit - Vue 2 + Quasar
          </q-toolbar-title>

          <div>v1.0.0</div>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="leftDrawerOpen"
        show-if-above
        bordered
        content-class="bg-grey-1"
      >
        <q-list>
          <q-item-label header>Навигация</q-item-label>
          <router-link to="/buttons" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <q-icon name="smart_button" />
              </q-item-section>
              <q-item-section>Кнопки</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/forms" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <q-icon name="input" />
              </q-item-section>
              <q-item-section>Формы</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/cards" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <q-icon name="dashboard" />
              </q-item-section>
              <q-item-section>Карточки</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/dialogs" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <q-icon name="chat" />
              </q-item-section>
              <q-item-section>Диалоги</q-item-section>
            </q-item>
          </router-link>
        </q-list>
      </q-drawer>

      <q-page-container>
        <q-page class="q-pa-md">
          <router-view />
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style> 