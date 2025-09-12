<template>
  <q-page class="content_page">
    <div class="content_title q-mb-md">
      <q-icon name="speed" size="30px" color="dark"/>
      Рабочий стол
    </div>
    <div class="row q-col-gutter-md">
      <!-- Секция 1 -->
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat class="content_page_card">
          <q-card-section>
            <q-item class="content_card_title" q-pa-none>
              <q-item-section avatar class="content_page_card_avatar">
                <q-icon name="mdi-chat" />
              </q-item-section>
              <q-item-section>
                <div class="row items-center justify-between">
                  Вопросы
                  <q-btn icon="mdi-chat-plus-outline"  unelevated
                    class="content_chat-btn" @click="handleAddQuestion = true" />
                </div>
                <q-dialog v-model="handleAddQuestion">
                  <q-card class="content_popup">
                    <q-card-section>
                      <div class="content_popup_title">Добавьте вопрос</div>
                    </q-card-section>

                    <q-card-section>

                      <q-input v-model="newQuestion.title" label="Заголовок" outlined class="content_popup_value"
                        :rules="[val => !!val || 'Обязательное поле']" />

                      <q-input v-model="newQuestion.time" label="Время" outlined class="content_popup_value"
                        :rules="[val => !!val || 'Обязательное поле']" />
                    </q-card-section>

                    <q-card-actions align="right">
                      <q-btn flat label="Закрыть" class="content_popup_info" v-close-popup />
                      <q-btn flat label="Добавить" class="content_popup_info" @click="addNewQuestion"
                        :disable="!newQuestion.title || !newQuestion.time" />
                    </q-card-actions>
                  </q-card>
                </q-dialog>
              </q-item-section>
            </q-item>
            <q-list separator class="scroll_questions_list scroll" v-if="questions.length > 0">
              <q-item v-for="(item, index) in questions" :key="index" class="q-pa-md" clickable v-ripple
                @click="handleQuestionClick(item)">
                <q-item-section avatar>
                  <q-icon name="account_circle" size="50px" class="content_questions_icons" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="content_questions_title">{{ item.title }}</q-item-label>
                  <q-item-label caption class="content_questions_time">{{ item.time }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
            <div v-else class="content_devices_empty-state">
              <div>К Вам пока нет вопросов</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12 row q-col-gutter-md q-mx-none q-px-none">
        <!-- Секция 2 -->
        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12">
          <q-card flat class="content_page_card">
            <q-card-section>
              <q-item class="content_card_title" q-pa-none>
                <q-item-section avatar class="content_page_card_avatar">
                  <q-icon name="mdi-cart" />
                </q-item-section>
                <q-item-section>
                  Заказы
                </q-item-section>
              </q-item>
              <q-list dense>
                <q-item v-for="(item, index) in orders" :key="index" class="content_orders-contracts"
                  :class="{ 'content_orders-contracts_last': index === orders.length - 1 }">
                  <q-item-section>{{ item.label }}</q-item-section>
                  <q-item-section class="text-right">{{ item.value }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>

        <!-- Секция 3 -->
        <div class="col-lg-12 col-md-12 col-sm-6 col-xs-12">
          <q-card flat class="content_page_card">
            <q-card-section>
              <q-item class="content_card_title" q-pa-none>
                <q-item-section avatar class="content_page_card_avatar">
                  <q-icon name="mdi-handshake" />
                </q-item-section>
                <q-item-section>
                  Контракты
                </q-item-section>
              </q-item>
              <q-list dense>
                <q-item v-for="(item, index) in contracts" :key="index" class="content_orders-contracts"
                  :class="{ 'content_orders-contracts_last': index === contracts.length - 1 }">
                  <q-item-section>{{ item.label }}</q-item-section>
                  <q-item-section class="text-right">{{ item.value }}</q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <!-- Секция 4 -->
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat class="content_page_card">
          <q-card-section>
            <q-item class="content_card_title" q-pa-none>
              <q-item-section avatar class="content_page_card_avatar">
                <q-icon name="memory" />
              </q-item-section>
              <q-item-section>
                <div class="row items-center justify-between">
                  Устройства
                  <!--<q-btn dense text-color="secondary" unelevated color="primary" class="sm content_dv-btn-1"
                    @click="handleAddQuestion = true">
                    <span class="content_dv-btn-1_text q-mr-md">Создать вопрос</span>
                    <q-icon name="mdi-chat-plus-outline" />
                  </q-btn>-->
                </div>
              </q-item-section>
            </q-item>
            <q-list dense separator class="scroll_devices_list scroll" v-if="devices.length > 0">
              <q-item v-for="(item, index) in devices" :key="index" class="content_orders-contracts" clickable v-ripple>
                <q-item-section>{{ item.label }}</q-item-section>
                <q-item-section class="text-right">{{ item.value }}</q-item-section>
              </q-item>
            </q-list>
            <div v-else class="content_devices_empty-state">
              <div>У вас пока нет добавленных устройств</div>
            </div>
            <div class="row justify-center">
              <q-btn unelevated class="content_dv-btn-2 q-mt-lg" @click="handleAddDevice = true">
                <q-icon class="q-mr-md" name="add" />
                <span class="content_dv-btn-2_text">Добавить устройство</span>
              </q-btn>
              <q-dialog v-model="handleAddDevice" @show="toggleDialog(true)" @hide="toggleDialog(false)">
                <q-card class="content_popup">
                  <q-card-section>
                    <div class="content_popup_title">Добавьте устройство</div>
                  </q-card-section>

                  <q-card-section>
                    <!-- Поле ввода текста -->
                    <q-input v-model="newDevice.name" label="Название устройства" outlined class="content_popup_value"
                      :rules="[val => !!val || 'Обязательное поле']" />

                    <!-- Поле ввода числа -->
                    <q-input v-model="newDevice.status" label="Статус (например, 50%)" outlined
                      class="content_popup_value" :rules="[val => !!val || 'Обязательное поле']" />
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Закрыть" class="content_popup_info" v-close-popup />
                    <q-btn flat label="Добавить" class="content_popup_info" @click="addNewDevice"
                      :disable="!newDevice.name || !newDevice.status" />
                  </q-card-actions>
                </q-card>
              </q-dialog>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<!--
<script>
export default {
  name: 'DashboardView',
  data () {
    return {
      questions: [
        { title: 'Запрос декларации соответствия на', time: '1 день назад' },
        { title: 'Запрос декларации соответствия на', time: '5 дней назад' },
        { title: 'Возможности оборудования', time: '2 недели назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' },
        { title: 'Запрос декларации соответствия на', time: '1 месяц назад' }
      ],
      orders: [
        { label: 'На складе', value: '407' },
        { label: 'Отгружено', value: '10 854' },
        { label: 'Оплачено', value: '0' },
        { label: 'Всего', value: '11 410' }
      ],
      devices: [
        { label: 'частотник 1', value: 'off' },
        { label: 'частотник 2', value: '78%' },
        { label: 'частотник 3', value: '5%' },
        { label: 'частотник 7', value: '56%' }
      ],
      contracts: [
        { label: 'Действующие', value: '407' },
        { label: 'На согласование', value: '10 854' },
        { label: 'Всего', value: '469' }
      ]
    }
  }
}
</script>
-->
<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'DashboardView',
  computed: {
    ...mapGetters('desktop', {
      questions: 'dashboardQuestions',
      orders: 'dashboardOrders',
      contracts: 'dashboardContracts'
    }),
    ...mapGetters('devices', {
      devices: 'dashboardDevices'
    }),
    ...mapGetters('support', {
      questions: 'dashboardQuestions'
    })
  },
  methods: {
    refreshData() {
      this.$store.dispatch('desktop/fetchDashboardData')
    },
    ...mapActions('devices', ['addDevice']),
    ...mapActions('support', ['addQuestion']),

    addNewDevice() {
      this.addDevice({
        name: this.newDevice.name,
        status: this.newDevice.status
      })
      this.newDevice = { name: '', status: '' }
      this.handleAddDevice = false
    },

    toggleDialog(val) {
      document.body.style.overflow = val ? 'hidden' : ''
      document.documentElement.style.overflow = val ? 'hidden' : ''
    },

    addNewQuestion() {
      this.addQuestion({
        title: this.newQuestion.title,
        time: this.newQuestion.time
      })
      this.newQuestion = { title: '', time: '' }
      this.handleAddQuestion = false
    }
  },
  setup() {
    const handleAddQuestion = ref(false)
    const newQuestion = ref({
      title: '',
      time: ''
    })

    const handleAddDevice = ref(false)
    const newDevice = ref({
      name: '',
      status: ''
    })

    return {
      handleAddDevice,
      handleAddQuestion,
      newDevice,
      newQuestion
    }
  }
}
</script>
