<template>
  <q-page class="column content_page">
    <q-breadcrumbs class="q-mb-md relative-position text-h4">
      <q-breadcrumbs-el icon="home" label="Главная" to="/" class="cursor-pointer text-secondary" />
      <q-breadcrumbs-el icon="memory" label="Устройства" to="/devices" class="text-dark text-weight-bold" />
    </q-breadcrumbs>
    <div class="row no-wrap justify-between items-center q-mb-lg">
      <div class="text-h1">
        <q-icon name="memory" size="30px" color="dark"/>
        Устройства
      </div>
      <div>
         <q-btn size="md" color="primary" icon="add" text-color="dark" padding="8px 12px" @click="handleAddDevice = true">
          <q-label class="gt-xs">Добавить устройство</q-label>
         </q-btn>
      </div>
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

    
    <q-card class="col q-pt-none">
      <q-card-section class="q-pt-none">
        <q-list dense separator class="pages_list q-py-sm" v-if="devices.length > 0">
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
    

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'
import BaseDialog from '@/components/utilits/BaseDialog.vue'

export default {
  name: 'Devices',
  components: {
    BaseDialog
  },
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
      this.handleAddDevice = false
    },

    resetDeviceForm() {
      this.newDevice = { name: '', status: '' }
    },

    toggleDialog(val) {
      document.body.style.overflow = val ? 'hidden' : ''
      document.documentElement.style.overflow = val ? 'hidden' : ''
    }
  },
  setup() {
    const handleAddDevice = ref(false)
    const newDevice = ref({
      name: '',
      status: ''
    })

    return {
      handleAddDevice,
      newDevice
    }
  }
}
</script>
