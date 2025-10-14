<template>
  <q-item class="q-pa-md" separator>
    <q-item-section class="q-gutter-y-sm">
      <!-- Основная информация -->
      <div class="flex flex-center text-h2 q-mt-none q-mb-md">{{ item.article }}</div>
      
      <div class="row justify-between q-mb-md">
        <div>
          <div class="text-h5">Типовой код</div>
          <div class="text-h4">{{ item.typicalCode || 'Не указан' }}</div>
        </div>
        <div>
          <div class="text-h5">Количество</div>
          <div class="text-h4">{{ item.quantity }} шт</div>
        </div>
      </div>

      <div class="row justify-between no-wrap q-mb-md">
        <div>
          <div class="text-h5">Цена</div>
          <div class="text-h4">{{ formatCurrency(item.price) }}</div>
        </div>
        <div>
          <div class="text-h5">Скидка</div>
          <div class="text-h4">{{ item.discount }}%</div>
        </div>
      </div>

      <div class="q-mb-md">
        <div class="text-h5">Итого с НДС</div>
        <div class="text-h4">{{ formatCurrency(item.totalWithVAT) }}</div>
      </div>

      <!-- Кнопки действий -->
      <div class="row justify-between q-pt-md q-gutter-xs">
        <q-btn icon="edit" size="sm" @click.stop="$emit('edit', item)" color="primary" text-color="dark"
          class="col">
          <q-tooltip>Редактировать</q-tooltip>
        </q-btn>
        <q-btn icon="delete" size="sm" @click.stop="$emit('delete', item)" color="primary" text-color="dark"
          class="col">
          <q-tooltip>Удалить</q-tooltip>
        </q-btn>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: 'OrderItemMobileCard',
  props: {
    item: Object
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
  },
  emits: ['edit', 'delete']
}
</script>