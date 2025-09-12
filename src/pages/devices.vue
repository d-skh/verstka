<template>
  <q-page class="column content_page">
    <div class="row no-wrap justify-between items-center">
      <div class="content_title q-mb-md">
        <q-icon name="memory" size="30px" color="dark"/>
        Устройства
      </div>
      <q-dialog v-model="handleAddQuestion">
        <q-card class="content_popup">
          <q-card-section>
            <div class="content_popup_title">Добавьте устройство</div>
          </q-card-section>

          <q-card-section>
            <!-- Поле ввода текста -->
            <q-input v-model="newDevice.name" label="Название устройства" outlined class="content_popup_value"
              :rules="[val => !!val || 'Обязательное поле']" />

            <!-- Поле ввода числа -->
            <q-input v-model="newDevice.status" label="Статус (например, 50%)" outlined class="content_popup_value"
              :rules="[val => !!val || 'Обязательное поле']" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Закрыть" class="content_popup_info" v-close-popup />
            <q-btn flat label="Добавить" class="content_popup_info" @click="addNewDevice"
              :disable="!newDevice.name || !newDevice.status" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    
    <q-card flat class="col content_page_card q-bt-none">
      <q-card-section class="q-pb-none">
        <div class="flex flex-center">
        <q-btn unelevated class="content_dv-btn-2_mobile" @click="handleAddQuestion = true">
        <q-icon class="q-mr-md" name="add" />
        <span class="content_dv-btn-2_text">Добавить устройство</span>
      </q-btn>
      </div>
      </q-card-section>
      <q-card-section class="">
        <q-list dense separator class="pages_list q-pa-md" v-if="devices.length > 0">
          <q-item v-for="(item, index) in devices" :key="index" class="content_orders-contracts" clickable v-ripple>
            <q-item-section>{{ item.label }}</q-item-section>
            <q-item-section class="text-right">{{ item.value }}</q-item-section>
          </q-item>
        </q-list>
        <div v-else class="content_devices_empty-state">
          <div>У вас пока нет добавленных устройств</div>
        </div>
      </q-card-section>
    </q-card>
    

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'

export default {
  name: 'Devices',
  computed: {
    ...mapGetters('devices', {
      devices: 'dashboardDevices'
    })
  },
  methods: {
    ...mapActions('devices', ['addDevice']),

    addNewDevice() {
      this.addDevice({
        name: this.newDevice.name,
        status: this.newDevice.status
      })
      this.newDevice = { name: '', status: '' }
      this.handleAddQuestion = false
    }
  },
  setup() {
    const handleAddQuestion = ref(false)
    const newDevice = ref({
      name: '',
      status: ''
    })

    return {
      handleAddQuestion,
      newDevice
    }
  }
}
</script>
