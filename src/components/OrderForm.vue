<template>
  <q-card style="min-width: 500px">
    <q-card-section class="row items-center">
      <div class="text-h6">Новый заказ</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>

    <q-card-section class="q-pt-none">
      <q-form @submit="onSubmit" class="q-gutter-md">
        <q-input
          v-model="formData.invoiceNumber"
          label="Номер счета *"
          required
          outlined
        />
        
        <q-input
          v-model="formData.creator"
          label="Создатель *"
          required
          outlined
        />
        
        <q-input
          v-model="formData.company"
          label="Компания *"
          required
          outlined
        />
        
        <q-input
          v-model="formData.projectName"
          label="Название проекта"
          outlined
        />
        
        <q-input
          v-model="formData.date"
          label="Дата *"
          type="date"
          required
          outlined
        />
        
        <q-input
          v-model.number="formData.amount"
          label="Сумма счета *"
          type="number"
          required
          outlined
        />
        
        <q-input
          v-model="formData.description"
          label="Описание"
          type="textarea"
          outlined
          rows="3"
        />

        <div class="row justify-end q-gutter-sm q-mt-lg">
          <q-btn label="Отмена" color="grey" v-close-popup />
          <q-btn 
            label="Создать" 
            type="submit" 
            color="primary" 
          />
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'OrderForm',
  data() {
    return {
      formData: {
        invoiceNumber: '',
        creator: '',
        company: '',
        projectName: '',
        date: new Date().toISOString().split('T')[0],
        amount: 0,
        description: '',
        paymentPercent: 0,
        shipmentPercent: 0
      }
    }
  },
  methods: {
    onSubmit() {
      this.$emit('save', this.formData)
    }
  }
}
</script>