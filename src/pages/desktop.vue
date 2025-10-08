<template>
  <q-page>
    <div class="text-h1 q-mb-md">
      <q-icon name="speed" size="30px" color="dark"/>
      Рабочий стол
    </div>
    <div class="row q-col-gutter-md">
      <!-- Секция 1 -->
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card>
          <q-card-section>
            <q-item class="text-h2 q-pt-none">
              <q-item-section>
                

                <div class="row items-center justify-between">
                  <div><q-icon size="sm" outlined name="chat" class="q-pr-sm" />Вопросы</div>
                  <q-btn size="md" color="primary" icon="add_comment" text-color="dark" padding="8px 12px" @click="handleAddQuestion = true"/>
                </div>
                <BaseDialog
    v-model="handleAddQuestion"
    title="Добавьте вопрос"
    :is-valid="!!newQuestion.title && !!newQuestion.time"
    @show="toggleDialog(true)"
    @hide="toggleDialog(false)"
    @confirm="addNewQuestion"
    @cancel="resetQuestionForm"
  >
    <template #content>
      <q-input 
        v-model="newQuestion.title" 
        label="Заголовок" 
        class="content_popup_value"
        :rules="[val => !!val || 'Обязательное поле']" 
      />
      <q-input 
        v-model="newQuestion.time" 
        label="Время" 
        class="content_popup_value"
        :rules="[val => !!val || 'Обязательное поле']" 
      />
    </template>
  </BaseDialog>
              </q-item-section>
            </q-item>
            <q-list separator class="scroll_questions_list scroll" v-if="questions.length > 0">
              <q-item v-for="(item, index) in questions" :key="index" class="q-pa-md" clickable v-ripple
                @click="handleQuestionClick(item)">
                <q-item-section avatar>
                  <q-icon name="account_circle" size="50px" class="content_questions_icons" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h4">{{ item.title }}</q-item-label>
                  <q-item-label caption class="text-h5">{{ item.time }}</q-item-label>
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
          <q-card>
            <q-card-section>
              <q-item class="text-h2 q-pt-none" q-pa-none>
                <div><q-icon size="sm" outlined name="shopping_cart" class="q-pr-sm" />Заказы</div>
              </q-item>
              <q-list dense>
                <q-item v-for="(item, index) in orders" :key="index" class="text-h4"
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
          <q-card>
            <q-card-section>
              <q-item class="text-h2 q-pt-none">
                <div><q-icon size="sm" outlined name="handshake" class="q-pr-sm" />Контракты</div>
              </q-item>
              <q-list dense>
                <q-item v-for="(item, index) in contracts" :key="index" class="text-h4"
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
        <q-card>
          <q-card-section>
            <q-item class="text-h2 q-pt-none">
              <q-item-section>
                <div class="row items-center justify-between">
                  <div><q-icon size="sm" outlined name="memory" class="q-pr-sm" />Устройства</div>
                  <!--<q-btn dense text-color="secondary" unelevated color="primary" class="sm content_dv-btn-1"
                    @click="handleAddQuestion = true">
                    <span class="content_dv-btn-1_text q-mr-md">Создать вопрос</span>
                    <q-icon name="mdi-chat-plus-outline" />
                  </q-btn>-->
                  <div class="">
              <q-btn class="" size="md" color="primary" icon="add_to_queue" text-color="dark" padding="8px 12px" @click="handleAddDevice = true"/>
              <BaseDialog
    :value="handleAddDevice"
    @input="handleAddDevice = $event"
    title="Добавьте устройство"
    :is-valid="!!newDevice.name && !!newDevice.status"
    @show="toggleDialog(true)"
    @hide="toggleDialog(false)"
    @confirm="addNewDevice"
    @cancel="resetDeviceForm"
  >
    <template #content>
      <q-input 
        v-model="newDevice.name" 
        label="Название устройства" 
        class="content_popup_value"
        :rules="[val => !!val || 'Обязательное поле']" 
      />
      <q-input 
        v-model="newDevice.status" 
        label="Статус (например, 50%)" 
        class="content_popup_value" 
        :rules="[val => !!val || 'Обязательное поле']" 
      />
    </template>
  </BaseDialog>
            </div>
                </div>
                
              </q-item-section>
            </q-item>
            <q-list dense separator class="scroll_devices_list scroll" v-if="devices.length > 0">
              <q-item v-for="(item, index) in devices" :key="index" class="text-h4" clickable v-ripple>
                <q-item-section>{{ item.label }}</q-item-section>
                <q-item-section class="text-right">{{ item.value }}</q-item-section>
              </q-item>
            </q-list>
            <div v-else class="content_devices_empty-state">
              <div>У вас пока нет добавленных устройств</div>
            </div>
            
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'
import BaseDialog from '@/components/utilits/BaseDialog.vue'

export default {
  name: 'DashboardView',
  components: {
    BaseDialog
  },
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
      this.resetDeviceForm()
      this.handleAddDevice = false
    },

    resetDeviceForm() {
      this.newDevice = { name: '', status: '' }
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
      this.resetQuestionForm()
      this.handleAddQuestion = false
    },

    resetQuestionForm() {
      this.newQuestion = { title: '', time: '' }
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