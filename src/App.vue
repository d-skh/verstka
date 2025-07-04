npm ru<template>
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
        :width="drawerMini ? 64 : 240"
        :mini="drawerMini"
        show-if-above
        bordered
        content-class="bg-grey-1"
      >
        <div class="q-pa-sm flex flex-center">
          <q-btn
            dense
            flat
            round
            :icon="drawerMini ? 'chevron_right' : 'chevron_left'"
            @click="drawerMini = !drawerMini"
            aria-label="Переключить режим сайдбара"
          />
        </div>
        <q-list>
          <router-link to="/buttons" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <span class="material-symbols-outlined" style="font-size: 24px;">switch</span>
              </q-item-section>
              <q-item-section v-if="!drawerMini">Кнопки</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/forms" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <span class="material-symbols-outlined" style="font-size: 24px;">edit</span>
              </q-item-section>
              <q-item-section v-if="!drawerMini">Формы</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/cards" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <span class="material-symbols-outlined" style="font-size: 24px;">view_module</span>
              </q-item-section>
              <q-item-section v-if="!drawerMini">Карточки</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/dialogs" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <span class="material-symbols-outlined" style="font-size: 24px;">chat</span>
              </q-item-section>
              <q-item-section v-if="!drawerMini">Диалоги</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/icons" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <span class="material-symbols-outlined" style="font-size: 24px;">star</span>
              </q-item-section>
              <q-item-section v-if="!drawerMini">Иконки</q-item-section>
            </q-item>
          </router-link>
          <router-link to="/colors" custom v-slot="{ navigate, href, isActive }">
            <q-item clickable v-ripple :active="isActive" @click="navigate">
              <q-item-section avatar>
                <span class="material-symbols-outlined" style="font-size: 24px;">palette</span>
              </q-item-section>
              <q-item-section v-if="!drawerMini">Цвета</q-item-section>
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
      leftDrawerOpen: false,
      drawerMini: false
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