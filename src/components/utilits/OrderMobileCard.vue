<template>
  <q-item class="q-pa-md cursor-pointer" clickable separator @click="$emit('view', order)">
    <q-item-section class="q-gutter-y-sm">

      <div class="flex flex-center text-h2 q-mt-none q-mb-md">{{ order.projectName || 'Без названия' }}</div>
      <div class="row justify-between q-mb-md">
        <div>
          <div class="text-h5">Номер счёта</div>
          <div class="text-h4">{{ order.invoiceNumber }}</div>
        </div>
        <div>
          <div class="text-h5">Создатель</div>
          <div class="text-h4">{{ order.creator || 'Не указан' }}</div>
        </div>

      </div>





      <div class="q-mb-md">
        <div class="text-h5">Компания</div>
        <div class="text-h4">{{ order.company || 'Не указана' }}</div>
      </div>



      <div class="row justify-between no-wrap q-mb-md">
        <div>
          <div class="text-h5">Сумма</div>
          <div class="text-h4">{{ formatCurrency(order.amount) }}</div>
        </div>
        <div>
          <div class="text-h5">Дата создания</div>
          <div class="text-h4">{{ formatDate(order.createdAt) }}</div>
        </div>
      </div>

      <div class="column q-gutter-y-xs q-mb-sm">

        <div class="row items-center justify-between">
          <span class="text-h5">Оплата</span>
          <span class="text-h4">{{ order.paymentPercent }}%</span>
        </div>
        <q-linear-progress :value="order.paymentPercent / 100" :color="getProgressColor(order.paymentPercent)"
          class="q-mt-xs q-mb-md" style="height: 6px;" />


        <div class="row items-center justify-between q-mt-sm">
          <span class="text-h5">Отгрузка</span>
          <span class="text-h4">{{ order.shipmentPercent }}%</span>
        </div>
        <q-linear-progress :value="order.shipmentPercent / 100" :color="getProgressColor(order.shipmentPercent)"
          class="q-mt-xs" style="height: 6px;" />
      </div>

      <!-- Кнопки действий -->
      <div class="row justify-between q-pt-md q-gutter-xs">
        <q-btn icon="visibility" size="sm" @click.stop="$emit('view', order)" color="primary" text-color="dark"
          class="col">
          <q-tooltip>Просмотреть</q-tooltip>
        </q-btn>
        <q-btn icon="content_copy" size="sm" @click.stop="$emit('copy', order)" color="primary" text-color="dark"
          class="col">
          <q-tooltip>Копировать</q-tooltip>
        </q-btn>
        <q-btn icon="delete" size="sm" @click.stop="$emit('delete', order)" color="primary" text-color="dark"
          class="col">
          <q-tooltip>Удалить</q-tooltip>
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'OrderMobileCard',
  props: {
    order: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatCurrency(amount) {
      if (!amount) return '0 ₽'
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2
      }).format(amount)
    },
    formatDate(dateString) {
      if (!dateString) return ''

      let date
      if (typeof dateString === 'string' && dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
        const [year, month, day] = dateString.split('-')
        date = new Date(year, month - 1, day)
      } else {
        date = new Date(dateString)
      }

      return isNaN(date.getTime()) ? '' : date.toLocaleDateString('ru-RU')
    },
    getProgressColor(percent) {
      if (percent >= 100) return 'green'
      if (percent >= 50) return 'blue'
      if (percent >= 25) return 'orange'
      return 'red'
    }
  },
  emits: ['view', 'copy', 'delete']
}
</script>