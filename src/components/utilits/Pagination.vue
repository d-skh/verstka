<template>
  <div class="row items-center justify-between full-width" :class="paddingClass">
    <div class="text-h5">
      {{ label }}: {{ totalItems }}
    </div>

    <div class="row items-center">
      <q-btn icon="first_page" flat round dense :disable="currentPage === 1" @click="goToPage(1)" />
      <q-btn icon="chevron_left" flat round dense :disable="currentPage === 1" @click="goToPage(currentPage - 1)" />

      <span :class="pageLabelClass">
        {{ pageLabel }}
      </span>

      <q-btn icon="chevron_right" flat round dense :disable="currentPage >= totalPages" @click="goToPage(currentPage + 1)" />
      <q-btn icon="last_page" flat round dense :disable="currentPage >= totalPages" @click="goToPage(totalPages)" />
    </div>

    <q-btn-dropdown flat dense :label="`${rowsPerPageLabel}${pagination.rowsPerPage}`" color="secondary" class="text-h5" auto-close>
      <q-list dense>
        <q-item v-for="option in rowsPerPageOptions" :key="option" clickable @click="changeRowsPerPage(option)">
          <q-item-section>
            <q-item-label>{{ option }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    currentPage: Number,
    rowsPerPage: Number,
    totalItems: Number,
    rowsPerPageOptions: {
      type: Array,
      default: () => [5, 10, 25, 50]
    },
    variant: {
      type: String,
      default: 'desktop', // 'desktop' or 'mobile'
      validator: (value) => ['desktop', 'mobile'].includes(value)
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalItems / this.rowsPerPage)
    },
    label() {
      return this.variant === 'desktop' ? 'Всего записей' : 'Всего'
    },
    pageLabel() {
      if (this.variant === 'desktop') {
        return `Страница ${this.currentPage} из ${this.totalPages}`
      } else {
        return `${this.currentPage}/${this.totalPages}`
      }
    },
    pageLabelClass() {
      return this.variant === 'desktop' ? 'q-mx-md text-h5' : 'q-mx-sm text-h5'
    },
    paddingClass() {
      return this.variant === 'desktop' ? 'q-pa-md' : 'q-pt-md'
    },
    rowsPerPageLabel() {
      return this.variant === 'desktop' ? 'Строк: ' : ''
    },
    pagination() {
      return {
        rowsPerPage: this.rowsPerPage
      }
    }
  },
  methods: {
    goToPage(page) {
      this.$emit('page-changed', page)
    },
    changeRowsPerPage(rows) {
      this.$emit('rows-per-page-changed', rows)
    }
  }
}
</script>