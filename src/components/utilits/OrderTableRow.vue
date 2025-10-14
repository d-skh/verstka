<template>
  <q-tr class="cursor-pointer" @click="$emit('view', order)">
    <q-td class="text-h5 wrap-content">
      <div class="column">
        <div class="text-weight-bold">{{ order.invoiceNumber }}</div>
        <div class="text-grey-7 text-caption">{{ order.projectName || 'Без названия' }}</div>
      </div>
    </q-td>
    <q-td class="text-h5 wrap-content">
      {{ order.creator || 'Не указан' }}
    </q-td>
    <q-td class="text-h5 wrap-content">
      {{ order.company || 'Не указана' }}
    </q-td>
    <q-td class="text-h5 wrap-content">
      {{ formatDate(order.createdAt) }}
    </q-td>
    <q-td class="text-h5 wrap-content">
      {{ formatCurrency(order.amount) }}
    </q-td>
    <q-td class="text-h5 wrap-content">
      <div class="row items-center no-wrap">
        <q-linear-progress 
          :value="order.paymentPercent / 100"
          :color="getProgressColor(order.paymentPercent)" 
          class="q-mr-sm"
          style="width: 60px; height: 6px; min-width: 60px;" 
        />
        <span style="min-width: 35px;">{{ order.paymentPercent }}%</span>
      </div>
    </q-td>
    <q-td class="text-h5 wrap-content">
      <div class="row items-center no-wrap">
        <q-linear-progress 
          :value="order.shipmentPercent / 100"
          :color="getProgressColor(order.shipmentPercent)" 
          class="q-mr-sm"
          style="width: 60px; height: 6px; min-width: 60px;" 
        />
        <span style="min-width: 35px;">{{ order.shipmentPercent }}%</span>
      </div>
    </q-td>
    <q-td class="text-right">
      <q-btn icon="visibility" flat round dense @click.stop="$emit('view', order)">
        <q-tooltip>Просмотреть</q-tooltip>
      </q-btn>
      <q-btn icon="content_copy" flat round dense @click.stop="$emit('copy', order)" class="q-ml-sm">
        <q-tooltip>Копировать</q-tooltip>
      </q-btn>
      <q-btn icon="delete" flat round dense @click.stop="$emit('delete', order)" class="q-ml-sm" color="secondary">
        <q-tooltip>Удалить</q-tooltip>
      </q-btn>
    </q-td>
  </q-tr>
</template>

<script>
export default {
  name: 'OrderTableRow',
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