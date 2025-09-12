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

        



      </q-toolbar>
    </q-header>

    <q-drawer :behavior="$q.screen.lt.sm ? 'mobile' : 'desktop'" v-model="leftDrawerOpen" show-if-above
      :mini="!leftDrawerOpen || miniState" :breakpoint="599">
      <!-- Кнопка для открытого состояния (абсолютное позиционирование) -->
      <div v-if="!miniState" class="absolute-top-right q-ma-md gt-xs">
        <q-btn round unelevated class="drawer-close-btn" icon="chevron_left" @click="miniState = true" />
      </div>

      <div v-if="!miniState" class="absolute-top-right q-ma-md lt-sm">
        <q-btn round unelevated class="drawer-close-btn" icon="chevron_left" @click="toggleLeftDrawer" />
      </div>

      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" :vertical-thumb-style="{ opacity: 0 }">
        <q-list class="vdh column justify-start">
          <!-- Кнопка для мини-состояния (внутри списка) -->
          <q-item v-if="miniState" clickable @click="miniState = false">
            <q-item-section avatar>
              <q-icon name="chevron_right" class="drawer-close-btn" />
            </q-item-section>
          </q-item>
          <q-item v-if="!miniState">
            <q-item-section avatar class="header_emblema">
              <img src="icons\VDH.svg" alt="Логотип" />
            </q-item-section>

            <q-item-section>
              <div class="header_logo">VEDA DRIVES HUB</div>
            </q-item-section>
          </q-item>
        </q-list>
        <div class="drawer_scrolling">
        <q-list dense class="drawer">

          <router-link to="/" custom v-slot="{ navigate }">
            <q-item clickable v-ripple @click="navigate" :active="$route.path === '/'">
              <q-item-section avatar>
                <q-icon name="speed" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Рабочий стол
              </q-item-section>
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
            </q-item>
          </router-link>

          <router-link to="/support" custom v-slot="{ navigate }">
            <q-item class="q-mb-lg" clickable v-ripple @click="navigate" :active="$route.path === '/support'">
              <q-item-section avatar>
                <q-icon name="chat" />
              </q-item-section>

              <q-item-section v-if="!miniState">
                Чат - тех поддержка - вопросы
              </q-item-section>
            </q-item>
          </router-link>

          <q-item clickable v-ripple @click="toggleMenu('store')">
            <q-item-section avatar>
              <q-icon name="shopping_cart" />
            </q-item-section>

            <q-item-section v-if="!miniState">
              Электронный магазин
            </q-item-section>

            <q-item-section v-if="!miniState" side>
              <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'store' }" />
            </q-item-section>
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
              <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': mactiveMenu === 'project' }" />
            </q-item-section>

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
              Административная панель
            </q-item-section>

            <q-item-section v-if="!miniState" side>
              <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === 'adm' }" />
            </q-item-section>

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
        <q-list class="drawer absolute-bottom">
          <q-item clickable v-ripple class="profile">
            <q-item-section avatar>
              <q-icon flat round dense name="account_circle" />
            </q-item-section>

            <q-item-section>

              <div class="user_name">{{ userName.split(' ')[0] }}<br>{{ userName.split(' ')[1] }}</div>
            </q-item-section>

          </q-item>
        </q-list>

      </q-scroll-area>

      <!--
          <div class="drawer-close-container">
        <q-btn round unelevated class="drawer-close-btn" :class="{ 'rotate-180': miniState }" icon="chevron_left" @click="miniState = true" />
      </div> -->


    </q-drawer>

    <!-- Хэдер, который теперь находится в правой части -->

    <q-toolbar class="gt-xs">
      <q-space /> <!-- Пустое пространство слева, чтобы кнопки были справа -->

      <q-btn class="toolbar_button" dense flat round icon="help"/>
      <q-btn class="toolbar_button" dense flat round icon="notifications">
        <q-badge floating color="red" transparent v-if="notificationsCount > 0">
          {{ notificationsCount }}
        </q-badge>
      </q-btn>
    </q-toolbar>


    <q-page-container>

      <router-view />
    </q-page-container>

    <q-footer> <!--v-if="showFooter"-->
      <div :class="[$q.screen.lt.sm ? 'column' : 'row', 'q-ma-lg']">
        <div class="col q-pa-sm">
          <div class="footer_logo_container q-mb-sm">
            <img class="footer_emblema" src="icons\VDH.svg" alt="Логотип" />
            <div class="footer_logo">VEDA DRIVES HUB</div>
          </div>
          <div>
            <div>
              <p :class="[$q.screen.lt.sm ? 'q-mb-sm' : 'q-mb-xl', 'footer_geo']">Сервис для удаленной поддержки<br
                  class="gt-xs">по вопросам применения<br>приводной техники</p>
            </div>
            <div>
              <div>
                <p class="footer_rights">VEDA DRIVES HUB. 2025 Все права защищены</p>
                <div class="footer_projects">
                  <a :href="privacyPolicyUrl" target="_blank">Политика конфиденциальности</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col q-pa-sm">
          <div class="footer_titles q-mb-sm">Наши проекты</div>
          <q-list>
            <template v-for="link in externalLinks">
              <q-item class="q-pl-none" dense :key="link.url" clickable v-ripple :href="link.url" target="_blank">
                <q-item-section class="footer_projects">
                  <q-item-label>{{ link.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>

        <div class="col q-pa-sm">
          <div>
            <div class="footer_titles q-mb-sm">Контакты</div>
            <p class="footer_geo">
              Адрес: 143581, Московская обл.,<br />г. Истра, д. Лешково, 217<br />
              Телефон: (495) 644-43-32<br />E-mail: info@drives.ru
            </p>
          </div>
          <div>
            <a href="https://vk.com/vedamc" target="_blank">
              <q-icon name="fab fa-vk" color="blue-9" size="30px" />
            </a>
            <a href="https://t.me/veda_vfd" target="_blank">
              <q-icon name="mdi-telegram" color="blue-5" size="30px" />
            </a>
            <a href="https://dzen.ru/veda_mc" target="_blank">
              <q-icon name="fab fa-yandex" color="red-10" size="22px" />
            </a>
          </div>
        </div>
      </div>
    </q-footer>

  </q-layout>
</template>
<!--
<script>
import { mapGetters } from 'vuex'
import { ref } from 'vue'
export default {

  setup () {
    const drawer = ref(true)
    const miniState = ref(true)
    const externalLinks = [
      { title: 'Интернет магазин VEDA Drives', url: 'https://drives.ru/' },
      { title: 'Ридан - основной портал', url: 'https://ridan.ru' },
      { title: 'Ридан Теплообменники', url: 'https://ridan.ru/pr/teplovaya-avtomatika' },
      { title: 'Ридан Форум Комьюнити', url: 'https://community.ridan.ru' },
      { title: 'Ридан Обучающая платформа', url: 'https://univer.ridan.ru/' }
    ]
    const privacyPolicyUrl = 'https://ваш-сайт.ru/privacy-policy'

    return {
      drawer,
      miniState
    }
  },

  methods: {
    drawerClick (e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    refreshData () {
      this.$store.dispatch('fetchDashboardData')
    }
  }
}
</script>
-->

<script>
import { mapGetters } from 'vuex'
import { ref } from 'vue'

export default {

  computed: {
    ...mapGetters('desktop', {
      externalLinks: 'appLinks',
      privacyPolicyUrl: 'appPrivacyPolicyUrls'
    }),

    ...mapGetters('user', {
      notificationsCount: 'currentUserNotifications',
      userName: 'currentUserName'
    }),

    showFooter() {
      return this.$route.path === '/' || this.$route.path === '/desktop'
    }
  },

  setup() {
    const leftDrawerOpen = ref(true)
    const miniState = ref(false)
    const activeMenu = ref(null) // Хранит название активного меню
    const footerHeight = 0

    const toggleMenu = (menuName) => {
      if (activeMenu.value === menuName) {
        // Если кликаем на уже активное меню - закрываем его
        activeMenu.value = null
      } else {
        // Открываем новое меню, закрывая предыдущее
        activeMenu.value = menuName
      }
    }



    return {
      menuOpenStore: ref(false),
      menuOpenService: ref(false),
      menuOpenConf: ref(false),
      menuOpenProject: ref(false),
      menuOpenApp: ref(false),
      menuOpenAdm: ref(false),
      menuOpenCRM: ref(false),
      leftDrawerOpen,
      miniState,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
        miniState.value = false;

      },
      activeMenu,
      footerHeight,
      toggleMenu
    }
  },

  mounted() {
    this.$nextTick(() => {
      const footer = document.querySelector('q-footer')
      if (footer) {
        this.footerHeight = footer.offsetHeight
      }
    })
  },

  methods: {
    drawerClick(e) {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (this.miniState) {
        this.miniState = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    },
    refreshData() {
      this.$store.dispatch('desktop/fetchDashboardData')
    }
  }
}
</script>
