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
          <div class="custom-tabs" ref="tabsContainer">
            <div 
              v-for="tab in tabs" 
              :key="tab.name"
              class="custom-tab text-h3 q-pa-md"
              :class="{ 'active': currentTab === tab.name }"
              @click="currentTab = tab.name"
            >
              <q-icon 
                :name="tab.icon" 
                class="q-mr-sm tab-icon"
                :style="{ fontSize: containerWidth <657 ? '2rem' : '1.5rem' }"
              />
              <span v-if="containerWidth >= 657" class="tab-label">{{ tab.label }}</span>
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
<q-btn class="q-mt-md" size="md" color="primary" label="Редактировать данные" icon="edit" text-color="dark" padding="8px 12px" @click="showEditSupportDialog = true"/>
      
    </div>

    <!-- Вкладка Активность -->
    <div v-if="currentTab === 'activity'" class="tab-panel q-pa-md">
      <div class="text-h2 q-mb-md">Последняя активность</div>
      
      <div class="timeline_list">
      <q-timeline color="secondary">
        <q-timeline-entry
          title="Новый вопрос"
          subtitle="2 часа назад"
          icon="help"
        >
          <div class="text-h5">Создан новый вопрос в категории "Технические проблемы"</div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Обновление профиля"
          subtitle="5 дней назад"
          icon="edit"
        >
          <div class="text-h5">Изменена контактная информация</div>
        </q-timeline-entry>

        <q-timeline-entry
          title="Вход в систему"
          subtitle="1 неделю назад"
          icon="login"
        >
          <div class="text-h5">Успешный вход с нового устройства</div>
        </q-timeline-entry>
      </q-timeline></div>
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

    <!-- Индикатор загрузки 
    <q-inner-loading :showing="isLoading" class="fixed-full z-top custom-loading">
      <q-spinner-gears size="50px" color="secondary" />
    </q-inner-loading>  
    
    -->
    

<!-- Диалог изменения пароля -->
<BaseDialog
  v-model="showChangePasswordDialog"
  title="Изменить пароль"
  :is-valid="isPasswordFormValid"
  @confirm="changePassword"
  @cancel="resetPasswordForm"
>
  <template #content>
    <q-input 
      v-model="passwordData.currentPassword" 
      label="Текущий пароль" 
      type="password"
      class="content_popup_value"
      :rules="[val => !!val || 'Обязательное поле']"
    />
    <q-input 
      v-model="passwordData.newPassword" 
      label="Новый пароль" 
      type="password"
      class="content_popup_value"
      :rules="[val => !!val || 'Обязательное поле']"
    />
    <q-input 
      v-model="passwordData.confirmPassword" 
      label="Подтвердите пароль" 
      type="password"
      class="content_popup_value"
      :rules="[val => !!val || 'Обязательное поле']"
    />
  </template>
</BaseDialog>

<!-- Диалог изменения контактных данных -->
<BaseDialog
  v-model="showEditDataDialog"
  title="Изменить контактные данные"
  :is-valid="isContactFormValid"
  @confirm="saveContactData"
  @cancel="resetDataForm"
>
  <template #content>
    <q-input 
      v-model="editData.phone" 
      label="Телефон" 
      class="content_popup_value"
      :rules="[val => !!val || 'Обязательное поле']"
    />
    <q-input 
      v-model="editData.email" 
      label="Почта" 
      type="email"
      class="content_popup_value"
      :rules="[val => !!val || 'Обязательное поле']"
    />
  </template>
</BaseDialog>

<!-- Диалог изменения данных техподдержки -->
<BaseDialog
  v-model="showEditSupportDialog"
  title="Изменить данные техподдержки"
  :is-valid="isSupportFormValid"
  @confirm="saveSupportData"
  @cancel="resetSupportForm"
>
  <template #content>
    <q-input 
      v-model="editSupport.danfors" 
      label="Danfors" 
      class="content_popup_value"
    />
    <q-input 
      v-model="editSupport.workplace" 
      label="Место работы" 
      class="content_popup_value"
    />
    <q-input 
      v-model="editSupport.veda" 
      label="VEDA MC" 
      class="content_popup_value"
    />
  </template>
</BaseDialog>
  </q-page>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import BaseDialog from '@/components/utilits/BaseDialog.vue'

export default {
  name: 'ProfilePage',
  components: {
    BaseDialog
  },
  
  data() {
    return {
      showChangePasswordDialog: false,
      showEditDataDialog: false,
      showEditSupportDialog: false,
      containerWidth: 0,
      currentTab: 'profile',
      tabs: [
        { name: 'profile', icon: 'person', label: 'Профиль' },
        { name: 'security', icon: 'security', label: 'Безопасность' },
        { name: 'support', icon: 'support', label: 'Техподдержка' },
        { name: 'activity', icon: 'history', label: 'Активность' }
      ],
      passwordData: {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      editData: {
        phone: '',
        email: ''
      },
      editSupport: {
        danfors: '',
        workplace: '',
        veda: ''
      },
      resizeObserver: null
    }
  },
  
  computed: {
    ...mapState('profile', ['isLoading']),
    ...mapGetters('profile', ['getUserProfile']),
    userProfile() {
      return this.getUserProfile
    },
    isPasswordFormValid() {
      return this.passwordData.currentPassword && 
             this.passwordData.newPassword && 
             this.passwordData.confirmPassword &&
             this.passwordData.newPassword === this.passwordData.confirmPassword
    },
    isContactFormValid() {
      return !!this.editData.phone && !!this.editData.email
    },
    isSupportFormValid() {
      return !!this.editSupport.danfors && 
             !!this.editSupport.workplace && 
             !!this.editSupport.veda
    }
  },
  
  methods: {
    ...mapActions('profile', ['updateProfileData', 'updatePassword']),
    
    async changePassword() {
      if (this.passwordData.newPassword !== this.passwordData.confirmPassword) {
        this.showNotify('Пароли не совпадают', 'negative')
        return
      }
      
      try {
        const result = await this.updatePassword({
          currentPassword: this.passwordData.currentPassword,
          newPassword: this.passwordData.newPassword
        })
        
        if (result && result.success) {
          this.showNotify('Пароль успешно изменен', 'positive')
          this.showChangePasswordDialog = false
          this.resetPasswordForm()
        } else {
          this.showNotify(result?.message || 'Ошибка при изменении пароля', 'negative')
        }
      } catch (error) {
        this.showNotify('Произошла ошибка', 'negative')
        this.showChangePasswordDialog = false
      }
    },
    
    async saveContactData() {
      try {
        const result = await this.updateProfileData(this.editData)
        if (result && result.success) {
          this.showNotify('Данные обновлены', 'positive')
          this.showEditDataDialog = false
        } else {
          this.showNotify(result?.message || 'Ошибка при обновлении данных', 'negative')
        }
      } catch (error) {
        this.showNotify('Произошла ошибка', 'negative')
        this.showEditDataDialog = false
      }
    },
    
    async saveSupportData() {
      try {
        const result = await this.updateProfileData(this.editSupport)
        if (result && result.success) {
          this.showNotify('Данные обновлены', 'positive')
          this.showEditSupportDialog = false
        } else {
          this.showNotify(result?.message || 'Ошибка при обновлении данных', 'negative')
        }
      } catch (error) {
        this.showNotify('Произошла ошибка', 'negative')
        this.showEditSupportDialog = false
      }
    },
    
    // Универсальный метод для уведомлений
    showNotify(message, type = 'positive') {
      // Попробуем разные способы вызова notify
      if (this.$q && this.$q.notify) {
        this.$q.notify({ type, message })
      } else if (this.$notify) {
        this.$notify({ type, message })
      } else if (window.$q && window.$q.notify) {
        window.$q.notify({ type, message })
      } else {
        // Fallback: используем console или alert
        console[type === 'positive' ? 'log' : 'error'](message)
        if (type === 'negative') {
          alert('Ошибка: ' + message)
        }
      }
    },
    
    resetPasswordForm() {
      this.passwordData.currentPassword = ''
      this.passwordData.newPassword = ''
      this.passwordData.confirmPassword = ''
    },
    
    resetDataForm() {
      this.editData.phone = this.userProfile.phone || ''
      this.editData.email = this.userProfile.email || ''
    },
    
    resetSupportForm() {
      this.editSupport.danfors = this.userProfile.danfors || ''
      this.editSupport.workplace = this.userProfile.workplace || ''
      this.editSupport.veda = this.userProfile.veda || ''
    },
    
    updateContainerWidth() {
      if (this.$refs.tabsContainer) {
        this.containerWidth = this.$refs.tabsContainer.offsetWidth;
      }
    }
  },
  
  mounted() {
    this.resetDataForm()
    this.resetSupportForm()
    
    this.updateContainerWidth();
    
    this.resizeObserver = new ResizeObserver(() => {
      this.updateContainerWidth();
    });
    
    if (this.$refs.tabsContainer) {
      this.resizeObserver.observe(this.$refs.tabsContainer);
    }
    
    window.addEventListener('resize', this.updateContainerWidth);
  },
  
  beforeUnmount() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    window.removeEventListener('resize', this.updateContainerWidth);
  }
}
</script>