<template>
    <q-drawer 
      :behavior="$q.screen.lt.sm ? 'mobile' : 'desktop'" 
      v-model="leftDrawerOpen"
      :width="260" 
      show-if-above
      :mini="miniState" 
      :breakpoint="599"
    >
      <!-- Кнопка для открытого состояния (абсолютное позиционирование) -->
      <div v-if="!miniState" class="absolute-top-right q-ma-md gt-xs">
        <div class="drawer-close-btn" @click="setMiniState(true)">
          <span class="material-symbols-outlined">left_panel_close</span>
        </div>
      </div>

      <div v-if="!miniState" class="absolute-top-right q-ma-md lt-sm">
        <q-btn round unelevated class="drawer-close-btn" @click="setLeftDrawerOpen(false)">
          <span class="material-symbols-outlined">left_panel_close</span></q-btn>
      </div>

      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" :vertical-thumb-style="{ opacity: 0 }">
        <q-list class="">
          <q-item class="drawer-vdh-container">
            <q-item-section avatar class="header_emblema">
              <img src="icons\VDH.svg" alt="Логотип" />
            </q-item-section>

            <q-item-section v-if="!miniState">
              <div class="header_logo">VEDA DRIVES HUB</div>
            </q-item-section>
          </q-item> </q-list>
        <div class="drawer_scrolling">
          <q-list class="q-mt-sm">
             <q-item v-if="miniState" clickable @click="setMiniState(false)">
              <q-item-section avatar>
                <span class="drawer-close-btn material-symbols-outlined">left_panel_open</span>
              </q-item-section>
              <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Раскрыть меню
                </q-tooltip>
            </q-item>
          </q-list>

          <q-list class="q-mt-sm">

            <router-link to="/" custom v-slot="{ navigate }">
              <q-item clickable v-ripple @click="navigate" :active="$route.path === '/'">
                <q-item-section avatar>
                  <q-icon name="speed" />
                </q-item-section>

                <q-item-section v-if="!miniState">
                  Рабочий стол
                </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Рабочий стол
                </q-tooltip>
              </q-item>
            </router-link>

            <router-link to="/devices" custom v-slot="{ navigate }">
              <q-item clickable v-ripple @click="navigate" :active="$route.path === '/devices'">
                <q-item-section avatar>
                  <q-icon name="memory" />
                </q-item-section>

                <q-item-section v-if="!miniState">
                  Устройства
                </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Устройства
                </q-tooltip>
              </q-item>
            </router-link>

            <router-link to="/support" custom v-slot="{ navigate }">
              <q-item class="q-mb-lg" clickable v-ripple @click="navigate" :active="$route.path === '/support'">
                <q-item-section avatar>
                  <q-icon name="chat" />
                </q-item-section>

                <q-item-section v-if="!miniState">
                  Чат
                </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Чат
                </q-tooltip>
              </q-item>
            </router-link>

            <q-item clickable v-ripple @click="toggleMenu('store')">
              <q-item-section avatar>
                <q-icon name="shopping_cart" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Магазин
              </q-item-section>

              <q-item-section v-if="!miniState" side>
                <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'store' }" />
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Магазин
                </q-tooltip>
            </q-item>

            <q-slide-transition>
              <div v-show="activeMenu === 'store' && !miniState" class="q-pl-xl">
                <q-list dense separator class="menu-dropdown">
                  <q-item clickable v-ripple>
                    <q-item-section>Преобразователи частоты</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Зарядные устройства</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-slide-transition>

            <q-item clickable v-ripple @click="toggleMenu('service')">
              <q-item-section avatar>
                <q-icon name="build" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Сервис
              </q-item-section>

              <q-item-section v-if="!miniState" side>
                <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'service' }" />
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Сервис
                </q-tooltip>

            </q-item>

            <q-slide-transition>
              <div v-show="activeMenu === 'service' && !miniState" class="q-pl-xl">
                <q-list dense separator class="menu-dropdown">
                  <q-item clickable v-ripple>
                    <q-item-section>Пусконаладка</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Ремонт</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-slide-transition>

            <q-item class="q-mb-lg" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="article" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Документация
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Документация
                </q-tooltip>

            </q-item>
            <q-item clickable v-ripple @click="toggleMenu('conf')">
              <q-item-section avatar>
                <q-icon name="display_settings" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Конфигураторы
              </q-item-section>

              <q-item-section v-if="!miniState" side>
                <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'conf' }" />
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Конфигураторы
                </q-tooltip>

            </q-item>

            <q-slide-transition>
              <div v-show="activeMenu === 'conf' && !miniState" class="q-pl-xl">
                <q-list dense separator class="menu-dropdown">
                  <q-item clickable v-ripple>
                    <q-item-section>Siemens</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Allen-Bradley</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Schneider Electric</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-slide-transition>

            <q-item clickable v-ripple @click="toggleMenu('project')">
              <q-item-section avatar>
                <q-icon name="engineering" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Проектировщик
              </q-item-section>

              <q-item-section v-if="!miniState" side>
                <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'project' }" />
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Проектировщик
                </q-tooltip>

            </q-item>
            <div class="q-mb-lg">
              <q-slide-transition>
                <div v-show="activeMenu === 'project' && !miniState" class="q-pl-xl">
                  <q-list dense separator class="menu-dropdown">
                    <q-item clickable v-ripple>
                      <q-item-section>Проектирование схем</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>BIM-моделирование</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-slide-transition>
            </div>

            <q-item clickable v-ripple @click="toggleMenu('app')">
              <q-item-section avatar>
                <q-icon name="apps" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Приложения
              </q-item-section>

              <q-item-section v-if="!miniState" side>
                <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'app' }" />
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Приложения
                </q-tooltip>

            </q-item>

            <q-slide-transition>
              <div v-show="activeMenu === 'app' && !miniState" class="q-pl-xl">
                <q-list dense separator class="menu-dropdown">
                  <q-item clickable v-ripple>
                    <q-item-section>VedaMK Mobile</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Field Engineer</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>SCADA Viewe</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Asset Tracker</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-slide-transition>

            <q-item clickable v-ripple @click="toggleMenu('adm')">
              <q-item-section avatar>
                <q-icon name="admin_panel_settings" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Админ панель
              </q-item-section>

              <q-item-section v-if="!miniState" side>
                <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'adm' }" />
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  Админ панель
                </q-tooltip>

            </q-item>

            <q-slide-transition>
              <div v-show="activeMenu === 'adm' && !miniState" class="q-pl-xl">
                <q-list dense separator class="menu-dropdown">
                  <q-item clickable v-ripple>
                    <q-item-section>Управление доступом</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Настройка прав</q-item-section>
                  </q-item>
                  <q-item clickable v-ripple>
                    <q-item-section>Аудит действий</q-item-section>
                  </q-item>
                </q-list>
              </div>
            </q-slide-transition>

            <q-item clickable v-ripple @click="toggleMenu('crm')">
              <q-item-section avatar>
                <q-icon name="handshake" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                CRM
              </q-item-section>

              <q-item-section v-if="!miniState" side>
                <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'crm' }" />
              </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                  CRM
                </q-tooltip>

            </q-item>

            <div class="q-mb-lg">
              <q-slide-transition>
                <div v-show="activeMenu === 'crm' && !miniState" class="q-pl-xl">
                  <q-list dense separator class="menu-dropdown">
                    <q-item clickable v-ripple>
                      <q-item-section>Клиентская база</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>Проекты и сделки</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>Аналитика</q-item-section>
                    </q-item>
                    <q-item clickable v-ripple>
                      <q-item-section>Автоматизация</q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-slide-transition>
            </div>
            <!--
          <div class="q-pb-md">
          <q-item clickable v-ripple class="profile lt-sm">
            <q-item-section avatar>
              <q-icon flat round dense name="account_circle" />
            </q-item-section>

            <q-item-section>

              <div class="user_name">{{ userName.split(' ')[0] }}<br>{{ userName.split(' ')[1] }}</div>
            </q-item-section>

          </q-item>
          </div>-->


          </q-list>
        </div>
        <q-list class="logout absolute-bottom q-mb-sm">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon flat round dense name="logout" />
            </q-item-section>

            <q-item-section>
              Log out
            </q-item-section>
                <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]" class="logout">
                  Log out
                </q-tooltip>

          </q-item>
        </q-list>

      </q-scroll-area>

    </q-drawer>
    </template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Drawer',

  data() {
    return {
      activeMenu: null
    }
  },

  computed: {
    ...mapState('drawer', ['leftDrawerOpen', 'miniState'])
  },

  methods: {
    ...mapMutations('drawer', [
      'SET_LEFT_DRAWER_OPEN',
      'SET_MINI_STATE'
    ]),

    // Обертки для мутаций
    setLeftDrawerOpen(value) {
      this.SET_LEFT_DRAWER_OPEN(value)
    },

    setMiniState(value) {
      this.SET_MINI_STATE(value)
    },

    toggleMenu(menuName) {
      this.activeMenu = this.activeMenu === menuName ? null : menuName
    }
  }
}
</script>