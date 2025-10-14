<template>
  <q-tr :props="props">
    <q-td class="text-h5 wrap-content">{{ props.row.article }}</q-td>
    <q-td class="text-h5 wrap-content">{{ props.row.typicalCode }}</q-td>
    <q-td class="text-right text-h5 wrap-content">{{ props.row.quantity }}</q-td>
    <q-td class="text-right text-h5 wrap-content">{{ formatCurrency(props.row.price) }}</q-td>
    <q-td class="text-right text-h5 wrap-content">{{ props.row.discount }}%</q-td>
    <q-td class="text-right text-h5 wrap-content">{{ formatCurrency(props.row.discountedPrice) }}</q-td>
    <q-td class="text-right text-h5 wrap-content">{{ formatCurrency(props.row.totalWithVAT) }}</q-td>
    <q-td class="text-right wrap-content">
      <q-btn icon="edit" flat dense @click="$emit('edit', props.row)" />
      <q-btn icon="delete" flat dense @click="$emit('delete', props.row)" class="q-ml-sm" />
    </q-td>
  </q-tr>
</template>

<script>
export default {
  name: 'OrderItemTableRow',
  props: {
    props: Object
  },
  methods: {
    formatCurrency(amount) {
      if (!amount) return '0 ₽'
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2
      }).format(amount)
    }
  }
}
</script>