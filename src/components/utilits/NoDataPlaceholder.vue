<template>
  <div class="full-width row flex-center text-h4 text-grey q-pa-xl">
    <q-icon name="inbox" size="3em" class="q-mr-sm" />
    {{ hasActiveFilters ? 'Заказы не найдены' : 'Нет заказов' }}
  </div>
</template>

<script>
export default {
  name: 'NoDataPlaceholder',
  props: {
    hasActiveFilters: {
      type: Boolean,
      default: false
    }
  }
}
</script>