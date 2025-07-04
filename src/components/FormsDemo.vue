<template>
  <div>
    <q-page-header>
      <q-toolbar-title>Демонстрация форм</q-toolbar-title>
    </q-page-header>

    <div class="q-gutter-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Основные поля ввода</div>
          <q-form @submit="onSubmit" class="q-gutter-md q-mt-md">
            <q-input
              v-model="form.name"
              label="Имя"
              filled
              :rules="[val => !!val || 'Имя обязательно']"
            />

            <q-input
              v-model="form.email"
              label="Email"
              filled
              type="email"
              :rules="[
                val => !!val || 'Email обязателен',
                val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Неверный формат email'
              ]"
            />

            <q-input
              v-model="form.password"
              label="Пароль"
              filled
              type="password"
              :rules="[val => val.length >= 6 || 'Пароль должен содержать минимум 6 символов']"
            />

            <q-input
              v-model="form.phone"
              label="Телефон"
              filled
              mask="(##) ###-##-##"
              unmasked-value
            />

            <div>
              <q-btn type="submit" color="primary" label="Отправить" />
              <q-btn flat label="Очистить" @click="resetForm" class="q-ml-sm" />
            </div>
          </q-form>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Селекты и чекбоксы</div>
          <div class="q-gutter-md q-mt-md">
            <q-select
              v-model="form.country"
              :options="countries"
              label="Страна"
              filled
              emit-value
              map-options
            />

            <q-select
              v-model="form.languages"
              :options="languageOptions"
              label="Языки программирования"
              filled
              multiple
              use-chips
            />

            <q-option-group
              v-model="form.gender"
              :options="genderOptions"
              label="Пол"
              color="primary"
              inline
            />

            <q-checkbox v-model="form.newsletter" label="Подписаться на новости" />
            <q-checkbox v-model="form.terms" label="Согласен с условиями" />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Слайдеры и переключатели</div>
          <div class="q-gutter-md q-mt-md">
            <q-slider
              v-model="form.age"
              :min="18"
              :max="100"
              label
              label-always
              color="primary"
            />

            <q-range
              v-model="form.priceRange"
              :min="0"
              :max="10000"
              label
              label-always
              color="secondary"
            />

            <q-toggle
              v-model="form.darkMode"
              label="Темная тема"
              color="primary"
            />

            <q-toggle
              v-model="form.notifications"
              label="Уведомления"
              color="secondary"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Текстовые области</div>
          <div class="q-gutter-md q-mt-md">
            <q-input
              v-model="form.description"
              label="Описание"
              filled
              type="textarea"
              rows="3"
            />

            <q-input
              v-model="form.comments"
              label="Комментарии"
              filled
              type="textarea"
              rows="5"
              autogrow
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Дата и время</div>
          <div class="q-gutter-md q-mt-md">
            <q-input
              v-model="form.birthDate"
              label="Дата рождения"
              filled
              mask="##.##.####"
            >
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                    <q-date v-model="form.birthDate" mask="DD.MM.YYYY" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input
              v-model="form.meetingTime"
              label="Время встречи"
              filled
              mask="##:##"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="form.meetingTime" mask="HH:mm" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormsDemo',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        phone: '',
        country: 'ru',
        languages: [],
        gender: 'male',
        newsletter: false,
        terms: false,
        age: 25,
        priceRange: { min: 1000, max: 5000 },
        darkMode: false,
        notifications: true,
        description: '',
        comments: '',
        birthDate: '',
        meetingTime: ''
      },
      countries: [
        { label: 'Россия', value: 'ru' },
        { label: 'США', value: 'us' },
        { label: 'Германия', value: 'de' },
        { label: 'Франция', value: 'fr' }
      ],
      languageOptions: [
        'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Go'
      ],
      genderOptions: [
        { label: 'Мужской', value: 'male' },
        { label: 'Женский', value: 'female' },
        { label: 'Другой', value: 'other' }
      ]
    }
  },
  methods: {
    onSubmit() {
      this.$q.notify({
        type: 'positive',
        message: 'Форма отправлена успешно!'
      })
      console.log('Form data:', this.form)
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        password: '',
        phone: '',
        country: 'ru',
        languages: [],
        gender: 'male',
        newsletter: false,
        terms: false,
        age: 25,
        priceRange: { min: 1000, max: 5000 },
        darkMode: false,
        notifications: true,
        description: '',
        comments: '',
        birthDate: '',
        meetingTime: ''
      }
    }
  }
}
</script> 