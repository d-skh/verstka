<template>
  <div>
    <q-page-header>
      <q-toolbar-title>Демонстрация диалогов</q-toolbar-title>
    </q-page-header>

    <div class="q-gutter-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Простые диалоги</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="primary" label="Простой диалог" @click="showSimpleDialog = true" />
            <q-btn color="secondary" label="Диалог с подтверждением" @click="showConfirmDialog = true" />
            <q-btn color="accent" label="Диалог с опциями" @click="showOptionsDialog = true" />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Формы в диалогах</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="primary" label="Форма пользователя" @click="showUserForm = true" />
            <q-btn color="secondary" label="Форма настроек" @click="showSettingsForm = true" />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Программные диалоги</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="positive" label="Успех" @click="showSuccess" />
            <q-btn color="negative" label="Ошибка" @click="showError" />
            <q-btn color="warning" label="Предупреждение" @click="showWarning" />
            <q-btn color="info" label="Информация" @click="showInfo" />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Прогресс диалоги</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="primary" label="Показать прогресс" @click="showProgress" />
            <q-btn color="secondary" label="Загрузка с отменой" @click="showLoadingWithCancel" />
          </div>
        </q-card-section>
      </q-card>
    </div>

    <!-- Простой диалог -->
    <q-dialog v-model="showSimpleDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Простой диалог</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Это простой диалог с базовым содержимым. Вы можете добавить любой контент.
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Закрыть" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Диалог подтверждения -->
    <q-dialog v-model="showConfirmDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Подтверждение</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Вы уверены, что хотите выполнить это действие? Это действие нельзя отменить.
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Подтвердить" @click="confirmAction" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Диалог с опциями -->
    <q-dialog v-model="showOptionsDialog">
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Выберите опцию</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-option-group
            v-model="selectedOption"
            :options="[
              { label: 'Опция 1', value: 'option1' },
              { label: 'Опция 2', value: 'option2' },
              { label: 'Опция 3', value: 'option3' }
            ]"
            color="primary"
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Выбрать" @click="selectOption" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Форма пользователя -->
    <q-dialog v-model="showUserForm">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Форма пользователя</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-form @submit="saveUser" class="q-gutter-md">
            <q-input
              v-model="userForm.name"
              label="Имя"
              filled
              :rules="[val => !!val || 'Имя обязательно']"
            />

            <q-input
              v-model="userForm.email"
              label="Email"
              filled
              type="email"
              :rules="[
                val => !!val || 'Email обязателен',
                val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Неверный формат email'
              ]"
            />

            <q-input
              v-model="userForm.phone"
              label="Телефон"
              filled
              mask="(##) ###-##-##"
            />
          </q-form>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Сохранить" @click="saveUser" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Форма настроек -->
    <q-dialog v-model="showSettingsForm">
      <q-card style="min-width: 400px">
        <q-card-section>
          <div class="text-h6">Настройки</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-gutter-md">
            <q-toggle
              v-model="settingsForm.darkMode"
              label="Темная тема"
              color="primary"
            />

            <q-toggle
              v-model="settingsForm.notifications"
              label="Уведомления"
              color="secondary"
            />

            <q-select
              v-model="settingsForm.language"
              :options="[
                { label: 'Русский', value: 'ru' },
                { label: 'English', value: 'en' },
                { label: 'Deutsch', value: 'de' }
              ]"
              label="Язык"
              filled
              emit-value
              map-options
            />

            <q-slider
              v-model="settingsForm.volume"
              :min="0"
              :max="100"
              label
              label-always
              color="primary"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Отмена" v-close-popup />
          <q-btn flat label="Сохранить" @click="saveSettings" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'DialogsDemo',
  data() {
    return {
      showSimpleDialog: false,
      showConfirmDialog: false,
      showOptionsDialog: false,
      showUserForm: false,
      showSettingsForm: false,
      selectedOption: 'option1',
      userForm: {
        name: '',
        email: '',
        phone: ''
      },
      settingsForm: {
        darkMode: false,
        notifications: true,
        language: 'ru',
        volume: 50
      }
    }
  },
  methods: {
    confirmAction() {
      this.$q.notify({
        type: 'positive',
        message: 'Действие выполнено!'
      })
    },
    selectOption() {
      this.$q.notify({
        type: 'info',
        message: `Выбрана опция: ${this.selectedOption}`
      })
    },
    saveUser() {
      this.$q.notify({
        type: 'positive',
        message: 'Пользователь сохранен!'
      })
      console.log('User data:', this.userForm)
    },
    saveSettings() {
      this.$q.notify({
        type: 'positive',
        message: 'Настройки сохранены!'
      })
      console.log('Settings:', this.settingsForm)
    },
    showSuccess() {
      this.$q.notify({
        type: 'positive',
        message: 'Операция выполнена успешно!',
        position: 'top'
      })
    },
    showError() {
      this.$q.notify({
        type: 'negative',
        message: 'Произошла ошибка!',
        position: 'top'
      })
    },
    showWarning() {
      this.$q.notify({
        type: 'warning',
        message: 'Внимание! Это предупреждение.',
        position: 'top'
      })
    },
    showInfo() {
      this.$q.notify({
        type: 'info',
        message: 'Это информационное сообщение.',
        position: 'top'
      })
    },
    showProgress() {
      this.$q.loading.show({
        message: 'Загрузка данных...'
      })

      setTimeout(() => {
        this.$q.loading.hide()
        this.$q.notify({
          type: 'positive',
          message: 'Данные загружены!'
        })
      }, 2000)
    },
    showLoadingWithCancel() {
      this.$q.loading.show({
        message: 'Загрузка файла...',
        spinnerColor: 'primary',
        spinnerSize: 140,
        backgroundColor: 'primary'
      })

      setTimeout(() => {
        this.$q.loading.hide()
        this.$q.notify({
          type: 'info',
          message: 'Файл загружен!'
        })
      }, 3000)
    }
  }
}
</script> 