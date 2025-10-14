<template>
  <q-item class="q-pa-md order-total-card" separator>
    <q-item-section class="q-gutter-y-sm">
      <!-- Заголовок -->
      <div class="flex flex-center text-dark text-h2 q-mt-none q-mb-md">Итоги заказа</div>
      
      <!-- Суммы -->
      <div class="row justify-between q-mb-sm">
        <div class="text-h5">Общая сумма:</div>
        <div class="text-h4">{{ formatCurrency(totalAmount) }}</div>
      </div>
      
      <div class="row justify-between q-mb-sm">
        <div class="text-h5">Со скидкой:</div>
        <div class="text-h4">{{ formatCurrency(totalDiscountedPrice) }}</div>
      </div>
      
      <div class="row justify-between q-mb-md">
        <div class="text-h5">С НДС:</div>
        <div class="text-h4">{{ formatCurrency(totalDiscountedAmountWithVAT) }}</div>
      </div>

      <!-- Количество позиций -->
      <div class="row justify-between">
        <div class="text-h5">Всего позиций:</div>
        <div class="text-h4">{{ totalItems }} шт</div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'OrderTotalMobileCard',
  props: {
    totalAmount: {
      type: Number,
      default: 0
    },
    totalDiscountedPrice: {
      type: Number,
      default: 0
    },
    totalDiscountedAmountWithVAT: {
      type: Number,
      default: 0
    },
    totalItems: {
      type: Number,
      default: 0
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
    }
  }
}
</script>