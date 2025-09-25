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
            <q-badge outline color="positive" class="q-mt-sm">
              <q-icon name="circle" size="8px" class="q-mr-xs" />
              В сети
            </q-badge>
          </q-card-section>

          <q-card-section>
            <!-- Быстрые действия -->
            <div class="quick-actions">
              <q-btn 
                color="primary" 
                icon="edit" 
                label="Редактировать профиль" 
                class="full-width q-mb-sm"
                @click="showEditDataDialog = true"
              />
              <q-btn 
                outline 
                color="primary" 
                icon="lock" 
                label="Сменить пароль" 
                class="full-width"
                @click="showChangePasswordDialog = true"
              />
            </div>

            <!-- Краткая контактная информация -->
            <div class="contact-summary q-mt-lg">
              <div class="contact-item q-mb-sm">
                <q-icon name="phone" size="sm" class="q-mr-sm text-grey-6" />
                <span class="text-h4">{{ userProfile.phone }}</span>
              </div>
              <div class="contact-item">
                <q-icon name="email" size="sm" class="q-mr-sm text-grey-6" />
                <span class="text-h4">{{ userProfile.email }}</span>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Правая колонка - Контент -->
      <div class="col-12 col-md-8">
        <q-card>
          <q-tabs
            v-model="currentTab"
            dense
            class="text-h3"
            active-color="primary"
            indicator-color="primary"
            align="justify"
            narrow-indicator
          >
            <q-tab name="profile" icon="person" label="Профиль" />
            <q-tab name="security" icon="security" label="Безопасность" />
            <q-tab name="support" icon="support" label="Техподдержка" />
            <q-tab name="activity" icon="activity" label="Активность" />
          </q-tabs>

          <q-separator />

          <q-tab-panels v-model="currentTab" animated>
            
            <!-- Вкладка Профиль -->
            <q-tab-panel name="profile">
              <div class="text-h2 q-mb-md">Личная информация</div>
              
              <div class="info-grid">
                <div class="info-item">
                  <div class="text-h5">Полное имя</div>
                  <div class="text-h4">{{ userProfile.name }}</div>
                </div>
                <div class="info-item">
                  <div class="text-h5">Должность</div>
                  <div class="text-h4">{{ userProfile.role }}</div>
                </div>
                <div class="info-item">
                  <div class="text-h5">Телефон</div>
                  <div class="text-h4">{{ userProfile.phone }}</div>
                </div>
                <div class="info-item">
                  <div class="text-h5">Email</div>
                  <div class="text-h4">{{ userProfile.email }}</div>
                </div>
              </div>

              <!-- Быстрые ссылки -->
              <div class="quick-links q-mt-xl">
                <div class="text-h3 q-mb-md">Быстрый доступ</div>
                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <q-card class="link-card cursor-pointer" @click="$router.push('/my-questions')">
                      <q-card-section class="text-center">
                        <q-icon name="help" size="lg" color="primary" />
                        <div class="text-h4 q-mt-sm">Мои вопросы</div>
                      </q-card-section>
                    </q-card>
                  </div>
                  <div class="col-6">
                    <q-card class="link-card cursor-pointer" @click="$router.push('/my-devices')">
                      <q-card-section class="text-center">
                        <q-icon name="devices" size="lg" color="primary" />
                        <div class="text-h4 q-mt-sm">Мои устройства</div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
            </q-tab-panel>

            <!-- Вкладка Безопасность -->
            <q-tab-panel name="security">
              <div class="text-h6 q-mb-md">Настройки безопасности</div>
              
              <q-list bordered class="rounded-borders">
                <q-item>
                  <q-item-section avatar>
                    <q-icon name="lock" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Сменить пароль</q-item-label>
                    <q-item-label caption>Последнее изменение: 3 месяца назад</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn 
                      flat 
                      color="primary" 
                      label="Изменить" 
                      @click="showChangePasswordDialog = true"
                    />
                  </q-item-section>
                </q-item>

                <q-separator />

                <q-item>
                  <q-item-section avatar>
                    <q-icon name="devices" color="primary" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>Активные сессии</q-item-label>
                    <q-item-label caption>1 активное устройство</q-item-label>
                  </q-item-section>
                  <q-item-section side>
                    <q-btn flat color="primary" label="Просмотреть" />
                  </q-item-section>
                </q-item>
              </q-list>
            </q-tab-panel>

            <!-- Вкладка Техподдержка -->
            <q-tab-panel name="support">
              <div class="text-h6 q-mb-md">Информация для техподдержки</div>
              
              <div class="support-info">
                <div class="info-item">
                  <div class="info-label">Danfors ID</div>
                  <div class="info-value">{{ userProfile.danfors }}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">Место работы</div>
                  <div class="info-value">{{ userProfile.workplace }}</div>
                </div>
                <div class="info-item">
                  <div class="info-label">VEDA MC</div>
                  <div class="info-value">{{ userProfile.veda }}</div>
                </div>
              </div>

              <q-btn 
                color="primary" 
                icon="edit" 
                label="Редактировать данные" 
                class="q-mt-md"
                @click="showEditSupportDialog = true"
              />
            </q-tab-panel>

            <!-- Вкладка Активность -->
            <q-tab-panel name="activity">
              <div class="text-h6 q-mb-md">Последняя активность</div>
              
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
            </q-tab-panel>
          </q-tab-panels>
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
import { 
  QPage, QCard, QCardSection, QAvatar, QIcon, QBtn, 
  QTabs, QTab, QTabPanels, QTabPanel, QSeparator,
  QList, QItem, QItemSection, QItemLabel, QBadge,
  QInnerLoading, QSpinnerGears, QDialog, QInput,
  QTimeline, QTimelineEntry
} from 'quasar'
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

<style scoped>
.sticky-card {
  position: sticky;
  top: 20px;
}

.quick-actions {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.contact-summary {
  border-top: 1px solid #e0e0e0;
  padding-top: 20px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 8px 0;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-item {
  padding: 12px 0;
}

.info-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 4px;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
}

.link-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border-radius: 8px;
}

.link-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.quick-links {
  border-top: 1px solid #e0e0e0;
  padding-top: 24px;
}

.support-info {
  max-width: 400px;
}

@media (max-width: 768px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .sticky-card {
    position: static;
  }
}
</style>