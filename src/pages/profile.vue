<template>
  <q-page>
    <div class="text-h1 q-mb-md">
      <q-icon name="account_circle" size="30px" color="dark"/>
      Профиль
    </div>
    <!-- Основной контейнер -->
    <div class="row q-col-gutter-md">
      
      <!-- Левая колонка - Профиль -->
      <div class="col-12 col-md-4">
        <q-card class="profile-sidebar sticky-card">
          <q-card-section class="text-center q-pb-none">
            <q-avatar size="120px" class="q-mb-md">
              <img :src="userProfile.avatar">
            </q-avatar>
            <div class="text-h2">{{ userProfile.name }}</div>
            <div class="text-h4">{{ userProfile.role }}</div>
            
            <!-- Статус онлайн -->
            <q-badge outline color="accent" class="q-mt-sm">
              <q-icon name="circle" size="8px" class="q-mr-xs" />
              В сети
            </q-badge>
          </q-card-section>

          <q-card-section>
            <div class="contact-summary">
              <div class="contact-item q-mb-sm">
                <q-icon name="phone" size="sm" class="q-mr-sm text-grey-6" />
                <span class="text-h4">{{ userProfile.phone }}</span>
              </div>
              <div class="contact-item q-mb-md">
                <q-icon name="email" size="sm" class="q-mr-sm text-grey-6" />
                <span class="text-h4">{{ userProfile.email }}</span>
              </div>
            </div>
            <!-- Быстрые действия -->
            <div class="">
              <q-btn class="full-width q-mb-sm" size="md" color="primary" text-color="dark" label="Редактировать профиль" icon="edit" padding="8px 12px" @click="showEditDataDialog = true"/>

              <q-btn outline class="full-width" size="md" color="primary" label="Сменить пароль" icon="lock" text-color="dark" padding="8px 12px" @click="showChangePasswordDialog = true"/>

            </div>

            <!-- Краткая контактная информация -->
            
          </q-card-section>
        </q-card>
      </div>
      

      <!-- Правая колонка - Контент -->
      <div class="col-12 col-md-8">
        <q-card>
  <!-- Кастомные табы -->
  <div class="custom-tabs">
    <div 
      v-for="tab in tabs" 
      :key="tab.name"
      class="custom-tab text-h3 q-pa-md"
      :class="{ 'active': currentTab === tab.name }"
      @click="currentTab = tab.name"
    >
      <q-icon :name="tab.icon" class="q-mr-sm" />
      {{ tab.label }}
    </div>
  </div>

  <q-separator />

  <!-- Контент табов -->
  <div class="tab-content">
    
    <!-- Вкладка Профиль -->
    <div v-if="currentTab === 'profile'" class="tab-panel q-pa-md">
      <div class="text-h2 q-mb-md">Личная информация</div>
      
      <div class="info-grid">
        <div class="">
          <div class="text-h5">Полное имя</div>
          <div class="text-h4">{{ userProfile.name }}</div>
        </div>
        <div class="">
          <div class="text-h5">Должность</div>
          <div class="text-h4">{{ userProfile.role }}</div>
        </div>
        <div class="">
          <div class="text-h5">Телефон</div>
          <div class="text-h4">{{ userProfile.phone }}</div>
        </div>
        <div class="">
          <div class="text-h5">Email</div>
          <div class="text-h4">{{ userProfile.email }}</div>
        </div>
      </div>
      
    </div>

    <!-- Вкладка Безопасность -->
    <div v-if="currentTab === 'security'" class="tab-panel q-pa-md">
      <div class="text-h2 q-mb-md">Настройки безопасности</div>
      
      <q-list bordered class="rounded-borders">
        <q-item>
          <q-item-section avatar>
            <q-icon name="lock" color="secondary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h4">Сменить пароль</q-item-label>
            <q-item-label class="text-h5">Последнее изменение: 3 месяца назад</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn size="md" color="primary" label="Изменить" icon="lock_reset" text-color="dark" padding="8px 12px" @click="showChangePasswordDialog = true"/>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item>
          <q-item-section avatar>
            <q-icon name="devices" color="secondary" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h4">Активные сессии</q-item-label>
            <q-item-label class="text-h5">1 активное устройство</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn size="md" color="primary" label="Посмотреть" icon="search" text-color="dark" padding="8px 12px" @click="showChangePasswordDialog = true"/>
          </q-item-section>
        </q-item>
      </q-list>
    </div>

    <!-- Вкладка Техподдержка -->
    <div v-if="currentTab === 'support'" class="tab-panel q-pa-md">
      <div class="text-h2 q-mb-md">Информация для техподдержки</div>
      
      <div>
        <div class="q-pb-md">
          <div class="text-h5">Ridan ID</div>
          <div class="text-h4">{{ userProfile.danfors }}</div>
        </div>
        <div class="q-pb-md">
          <div class="text-h5">Место работы</div>
          <div class="text-h4">{{ userProfile.workplace }}</div>
        </div>
        <div class="q-pb-md">
          <div class="text-h5">VEDA MC</div>
          <div class="text-h4">{{ userProfile.veda }}</div>
        </div>
      </div>

      <q-btn 
        color="primary" 
        icon="edit" 
        label="Редактировать данные" 
        class="q-mt-md"
        @click="showEditSupportDialog = true"
      />
    </div>

    <!-- Вкладка Активность -->
    <div v-if="currentTab === 'activity'" class="tab-panel q-pa-md">
      <div class="text-h2 q-mb-md">Последняя активность</div>
      
      <q-timeline color="secondary">
        <q-timeline-entry
          title="Новый вопрос"
          subtitle="2 часа назад"
          icon="help"
        >
          <div>Создан новый вопрос в категории "Технические проблемы"</div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Обновление профиля"
          subtitle="5 дней назад"
          icon="edit"
        >
          <div>Изменена контактная информация</div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Вход в систему"
          subtitle="1 неделю назад"
          icon="login"
        >
          <div>Успешный вход с нового устройства</div>
        </q-timeline-entry>
      </q-timeline>
    </div>
  </div>
  <div class="q-pa-md">
        <div class="text-h2 q-mb-md">Быстрый доступ</div>
        <div class="row q-col-gutter-sm">
          <div class="col-6">
            <q-card class="link-card cursor-pointer" @click="$router.push('/support')">
              <q-card-section class="text-center">
                <q-icon name="help" size="lg" color="primary" />
                <div class="text-h4 q-mt-sm">Мои вопросы</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-6">
            <q-card class="link-card cursor-pointer" @click="$router.push('/devices')">
              <q-card-section class="text-center">
                <q-icon name="devices" size="lg" color="primary" />
                <div class="text-h4 q-mt-sm">Мои устройства</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
</q-card>
      </div>
    </div>

    <!-- Индикатор загрузки -->
    <q-inner-loading :showing="isLoading">
      <q-spinner-gears size="50px" color="primary" />
    </q-inner-loading>

    <!-- Диалоги (остаются без изменений) -->
    <ChangePasswordDialog 
      v-model="showChangePasswordDialog"
      @submit="changePassword"
      @hide="resetPasswordForm"
    />

    <EditDataDialog 
      v-model="showEditDataDialog"
      :data="editData"
      @submit="saveContactData"
      @hide="resetDataForm"
    />

    <EditSupportDialog 
      v-model="showEditSupportDialog"
      :data="editSupport"
      @submit="saveSupportData"
      @hide="resetSupportForm"
    />
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

// Вынесем диалоги в отдельные компоненты для чистоты
const ChangePasswordDialog = {
  props: ['value', 'loading'],
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  },
  methods: {
    onSubmit() {
      this.$emit('submit', {
        currentPassword: this.currentPassword,
        newPassword: this.newPassword
      })
    },
    onHide() {
      this.$emit('hide')
    }
  },
  template: `
    <q-dialog :value="value" @hide="onHide">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Изменить пароль</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="currentPassword" label="Текущий пароль" type="password" />
          <q-input v-model="newPassword" label="Новый пароль" type="password" class="q-mt-sm" />
          <q-input v-model="confirmPassword" label="Подтвердите пароль" type="password" class="q-mt-sm" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Сохранить" color="primary" @click="onSubmit" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  `
}

const EditDataDialog = {
  props: ['value', 'data'],
  template: `
    <q-dialog :value="value" @hide="$emit('hide')">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Изменить контактные данные</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="data.phone" label="Телефон" />
          <q-input v-model="data.email" label="Почта" type="email" class="q-mt-sm" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Сохранить" color="primary" @click="$emit('submit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  `
}

const EditSupportDialog = {
  props: ['value', 'data'],
  template: `
    <q-dialog :value="value" @hide="$emit('hide')">
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6">Изменить данные техподдержки</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-input v-model="data.danfors" label="Danfors" />
          <q-input v-model="data.workplace" label="Место работы" class="q-mt-sm" />
          <q-input v-model="data.veda" label="VEDA MC" class="q-mt-sm" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Сохранить" color="primary" @click="$emit('submit')" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  `
}

export default {
  name: 'ProfilePage',
  components: {
    ChangePasswordDialog,
    EditDataDialog,
    EditSupportDialog
  },
  data() {
    return {
      currentTab: 'profile',
      tabs: [
      { name: 'profile', icon: 'person', label: 'Профиль' },
      { name: 'security', icon: 'security', label: 'Безопасность' },
      { name: 'support', icon: 'support', label: 'Техподдержка' },
      { name: 'activity', icon: 'activity', label: 'Активность' }
    ],
      showChangePasswordDialog: false,
      showEditDataDialog: false,
      showEditSupportDialog: false,
      editData: { phone: '', email: '' },
      editSupport: { danfors: '', workplace: '', veda: '' }
    }
  },
  computed: {
    ...mapState('profile', ['isLoading']),
    ...mapGetters('profile', ['getUserProfile']),
    userProfile() {
      return this.getUserProfile
    }
  },
  methods: {
    ...mapActions('profile', ['updateProfileData', 'updatePassword']),
    
    async changePassword(data) {
      if (this.newPassword !== this.confirmPassword) {
        this.$q.notify({ type: 'negative', message: 'Пароли не совпадают' })
        return
      }
      
      const result = await this.updatePassword(data)
      if (result.success) {
        this.$q.notify({ type: 'positive', message: 'Пароль успешно изменен' })
        this.showChangePasswordDialog = false
        this.resetPasswordForm()
      }
    },
    
    async saveContactData() {
      const result = await this.updateProfileData(this.editData)
      if (result.success) {
        this.$q.notify({ type: 'positive', message: 'Данные обновлены' })
        this.showEditDataDialog = false
      }
    },
    
    async saveSupportData() {
      const result = await this.updateProfileData(this.editSupport)
      if (result.success) {
        this.$q.notify({ type: 'positive', message: 'Данные обновлены' })
        this.showEditSupportDialog = false
      }
    },
    
    resetPasswordForm() {
      this.currentPassword = ''
      this.newPassword = ''
      this.confirmPassword = ''
    },
    
    resetDataForm() {
      this.editData.phone = this.userProfile.phone
      this.editData.email = this.userProfile.email
    },
    
    resetSupportForm() {
      this.editSupport.danfors = this.userProfile.danfors
      this.editSupport.workplace = this.userProfile.workplace
      this.editSupport.veda = this.userProfile.veda
    }
  },
  mounted() {
    this.resetDataForm()
    this.resetSupportForm()
  }
}
</script>