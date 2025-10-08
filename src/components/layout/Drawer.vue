<template>
    <q-drawer 
      :behavior="$q.screen.lt.sm ? 'mobile' : 'desktop'" 
      v-model="leftDrawerOpen"
      :width="260" 
      show-if-above
      :mini="miniState" 
      :breakpoint="599"
    >
      <!-- Кнопка для открытого состояния -->
      <div v-if="!miniState" class="absolute-top-right q-ma-md gt-xs">
        <div class="drawer-close-btn" @click="setMiniState(true)">
          <span class="material-symbols-outlined">left_panel_close</span>
        </div>
      </div>

      <div v-if="!miniState" class="absolute-top-right q-ma-md lt-sm">
        <div class="drawer-close-btn" @click="setLeftDrawerOpen(false)">
          <span class="material-symbols-outlined">left_panel_close</span>
        </div>
      </div>

      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: 0 }" :vertical-thumb-style="{ opacity: 0 }">
        <q-list class="q-px-md">
          <q-item class="drawer-vdh-container">
            <q-item-section avatar class="header_emblema">
              <img 
      src="icons/VDH.svg" 
      alt="Логотип" 
      class="svg-icon"
      :class="{ 'svg-dark': $q.dark.isActive }"
    />
            </q-item-section>
            <q-item-section v-if="!miniState">
              <div class="header_logo">VEDA DRIVES HUB</div>
            </q-item-section>
          </q-item>
        </q-list>
        
        <div class="drawer_scrolling">
          <q-list class="q-mt-sm q-px-md">
            <q-item v-if="miniState" clickable @click="setMiniState(false)">
              <q-item-section avatar>
                <span class="drawer-close-btn material-symbols-outlined q-pa-none">left_panel_open</span>
              </q-item-section>
              <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                Раскрыть меню
              </q-tooltip>
            </q-item>
          </q-list>

          <q-list class="q-mt-sm q-px-md">
            <!-- Унифицированные пункты меню -->
            <template v-for="item in menuItems">
              <!-- Пункты без подменю (с навигацией) -->
              <router-link 
                v-if="!item.hasChildren && item.to" 
                :key="item.id" 
                :to="item.to" 
                custom 
                v-slot="{ navigate }"
              >
                <q-item 
                  clickable 
                  v-ripple 
                  @click="navigate" 
                  :active="$route.path === item.to" 
                  :class="item.class"
                >
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>
                  <q-item-section v-if="!miniState">
                    {{ item.label }}
                  </q-item-section>
                  <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                    {{ item.label }}
                  </q-tooltip>
                </q-item>
              </router-link>

              <!-- Пункты с подменю -->
              <template v-else-if="item.hasChildren">
                <!-- Родительский пункт -->
                <q-item :key="item.id" clickable v-ripple @click="toggleMenu(item.id)">
                  <q-item-section avatar>
                    <q-icon :name="item.icon" />
                  </q-item-section>
                  <q-item-section v-if="!miniState">
                    {{ item.label }}
                  </q-item-section>
                  <q-item-section v-if="!miniState" side>
                    <q-icon name="keyboard_arrow_down" :class="{ 'rotate-180': activeMenu === item.id }" />
                  </q-item-section>
                  <q-tooltip v-if="miniState" anchor="top end" self="top start" :offset="[5, 5]">
                    {{ item.label }}
                  </q-tooltip>
                </q-item>

                <!-- Подменю -->
                <q-slide-transition :key="`submenu-${item.id}`">
                  <div v-show="activeMenu === item.id && !miniState">
                    <q-list dense separator class="menu-dropdown">
                      <router-link 
  v-for="subItem in item.children" 
  :key="subItem.id" 
  :to="subItem.to || '/'" 
  custom 
  v-slot="{ navigate, isActive }"
>
  <q-slide-transition>
    <q-item 
      clickable 
      v-ripple 
      @click="navigate"
      :class="{ 'q-item--active': isActive }"
    >
      <q-item-section>{{ subItem.label }}</q-item-section>
    </q-item>
  </q-slide-transition>
</router-link>
                    </q-list>
                    <!-- Переносим отступ после подменю -->
                    <div v-if="item.class && item.class.includes('q-mb')" :class="item.class"></div>
                  </div>
                </q-slide-transition>
              </template>

              <!-- Для пунктов без подменю добавляем отступ после самого пункта -->
              <div v-if="item.class && item.class.includes('q-mb')" :class="item.class"></div>
            </template>
          </q-list>
        </div>

        <q-list class="absolute-bottom q-px-md q-mb-sm">
          <q-item clickable v-rippl class="text-negative">
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
      activeMenu: null,
      menuItems: [
        // Пункты без подменю (с навигацией)
        { id: 'home', to: '/', icon: 'speed', label: 'Рабочий стол' },
        { id: 'devices', to: '/devices', icon: 'memory', label: 'Устройства' },
        { id: 'support', to: '/support', icon: 'chat', label: 'Чат', class: 'q-mb-lg' },
        
        // Пункты с подменю
        {
          id: 'store',
          icon: 'shopping_cart', 
          label: 'Магазин',
          hasChildren: true,
          children: [
            { id: 'store-1', label: 'Баланс', to: '/store/balance' },
            { id: 'store-2', label: 'Контракты', to: '/store/contracts' },
            { id: 'store-3', label: 'Мои заказы', to: '/orders' },
            { id: 'store-4', label: 'Коммерческое предложение', to: '/store/commerce' }
          ]
        },
        {
          id: 'service',
          icon: 'build',
          label: 'Сервис', 
          hasChildren: true,
          children: [
            { id: 'service-1', label: 'Пусконаладка', to: '/service/commissioning' },
            { id: 'service-2', label: 'Ремонт', to: '/service/repair' }
          ]
        },
        {
          id: 'documentation',
          icon: 'article',
          label: 'Документация',
          to: '/documentation', // Теперь это обычный пункт с навигацией
          class: 'q-mb-lg',
          hasChildren: false
        },
        {
          id: 'conf',
          icon: 'display_settings',
          label: 'Конфигураторы',
          hasChildren: true,
          children: [
            { id: 'conf-1', label: 'Siemens', to: '/configurators/siemens' },
            { id: 'conf-2', label: 'Allen-Bradley', to: '/configurators/allen-bradley' },
            { id: 'conf-3', label: 'Schneider Electric', to: '/configurators/schneider' }
          ]
        },
        {
          id: 'project',
          icon: 'engineering',
          label: 'Проектировщик',
          class: 'q-mb-lg',
          hasChildren: true,
          children: [
            { id: 'project-1', label: 'Проектирование схем', to: '/designer/schemes' },
            { id: 'project-2', label: 'BIM-моделирование', to: '/designer/bim' }
          ]
        },
        {
          id: 'app',
          icon: 'apps',
          label: 'Приложения',
          hasChildren: true,
          children: [
            { id: 'app-1', label: 'VedaMK Mobile', to: '/apps/vedamk-mobile' },
            { id: 'app-2', label: 'Field Engineer', to: '/apps/field-engineer' },
            { id: 'app-3', label: 'SCADA Viewe', to: '/apps/scada-viewer' },
            { id: 'app-4', label: 'Asset Tracker', to: '/apps/asset-tracker' }
          ]
        },
        {
          id: 'adm',
          icon: 'admin_panel_settings',
          label: 'Админ панель',
          hasChildren: true,
          children: [
            { id: 'adm-1', label: 'Управление доступом', to: '/admin/access' },
            { id: 'adm-2', label: 'Настройка прав', to: '/admin/permissions' },
            { id: 'adm-3', label: 'Аудит действий', to: '/admin/audit' }
          ]
        },
        {
          id: 'crm',
          icon: 'handshake',
          label: 'CRM',
          class: 'q-mb-lg',
          hasChildren: true,
          children: [
            { id: 'crm-1', label: 'Клиентская база', to: '/crm/clients' },
            { id: 'crm-2', label: 'Проекты и сделки', to: '/crm/projects' },
            { id: 'crm-3', label: 'Аналитика', to: '/crm/analytics' },
            { id: 'crm-4', label: 'Автоматизация', to: '/crm/automation' }
          ]
        },
        {
          id: 'devTool',
          icon: 'settings',
          label: 'devTool',
          class: 'q-mb-lg',
          hasChildren: true,
          children: [
            { id: 'devTool-1', label: 'ButtonsDemo', to: '/buttonsDemo' },
            { id: 'devTool-2', label: 'CardsDemo', to: '/cardsDemo' },
            { id: 'devTool-3', label: 'Colors', to: '/colors' },
            { id: 'devTool-4', label: 'DialogsDemo', to: '/dialogsDemo' },
            { id: 'devTool-5', label: 'formsDemo', to: '/formsDemo' },
            { id: 'devTool-6', label: 'iconsTest', to: '/iconsTest' },
            { id: 'devTool-7', label: 'spacingDemo', to: '/spacingDemo' }
          ]
        }
      ]
    }
  },

  computed: {
    leftDrawerOpen: {
    get() {
      return this.$store.state.drawer.leftDrawerOpen
    },
    set(value) {
      this.SET_LEFT_DRAWER_OPEN(value)
    }
  },
  miniState: {
    get() {
      return this.$store.state.drawer.miniState
    },
    set(value) {
      this.SET_MINI_STATE(value)
    }
  }
  },

  methods: {
    ...mapMutations('drawer', [
      'SET_LEFT_DRAWER_OPEN',
      'SET_MINI_STATE'
    ]),

    setLeftDrawerOpen(value) {
      this.SET_LEFT_DRAWER_OPEN(value)
    },

    setMiniState(value) {
      this.SET_MINI_STATE(value)
    },

    toggleMenu(menuId) {
      this.activeMenu = this.activeMenu === menuId ? null : menuId
    }
  }
}
</script>