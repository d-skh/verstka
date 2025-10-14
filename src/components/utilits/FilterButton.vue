<template>
  <div class="row items-center">
    <!-- Бейдж активного фильтра -->
    <div v-if="hasActiveFilter" class="q-mr-xs">
      <q-badge 
        color="primary" 
        text-color="white" 
        class="filter-badge cursor-pointer"
        @click.stop="clearFilter"
      >
        {{ activeFilterCount }}
        <q-icon name="close" size="12px" class="q-ml-xs" />
      </q-badge>
    </div>

    <!-- Индикатор сортировки (только отображение, без клика) -->
    <div v-if="hasActiveSort" class="q-mr-xs">
      <q-icon 
        :name="sortIcon" 
        :color="sortColor"
        size="16px"
      >
        <q-tooltip>{{ sortTooltip }}</q-tooltip>
      </q-icon>
    </div>

    <!-- Кнопка фильтра -->
    <q-btn 
      v-if="showFilterButton"
      icon="filter_list" 
      flat round dense size="sm"
      :color="buttonColor"
      class="filter-toggle-btn"
      :class="{ 'filter-active': hasActiveFilter || hasActiveSort }"
    >
      <q-tooltip>Фильтр по столбцу "{{ columnLabel }}"{{ isSortable ? ' и сортировка' : '' }}</q-tooltip>
      
      <column-filter-menu
        :column-label="columnLabel"
        :column-field="columnField"
        :is-sortable="isSortable"
        :current-sort="currentSort"
        :filter-options="filterOptions"
        :selected-filters="selectedFilters"
        :max-height="maxHeight"
        @sort-changed="$emit('sort-changed', $event)"
        @filters-changed="onFiltersChanged"
      />
    </q-btn>
  </div>
</template>

<script>
import ColumnFilterMenu from './ColumnFilterMenu.vue'

export default {
  name: 'FilterButton',
  components: {
    ColumnFilterMenu
  },
  props: {
    columnLabel: String,
    columnField: String,
    isSortable: Boolean,
    currentSort: String,
    filterOptions: Array,
    selectedFilters: Array,
    showFilterButton: {
      type: Boolean,
      default: true
    },
    maxHeight: {
      type: Number,
      default: 200
    }
  },
  computed: {
    hasActiveFilter() {
      return this.selectedFilters && this.selectedFilters.length > 0
    },
    
    hasActiveSort() {
      return this.isSortable && this.currentSort !== null
    },
    
    activeFilterCount() {
      return this.selectedFilters ? this.selectedFilters.length : 0
    },
    
    sortIcon() {
      if (this.currentSort === 'asc') return 'arrow_upward'
      if (this.currentSort === 'desc') return 'arrow_downward'
      return 'filter_list'
    },
    
    sortColor() {
      return this.hasActiveSort ? 'secondary' : 'primary'
    },
    
    sortTooltip() {
      if (this.currentSort === 'asc') return `Сортировка по возрастанию: ${this.columnLabel}`
      if (this.currentSort === 'desc') return `Сортировка по убыванию: ${this.columnLabel}`
      return 'Сортировка'
    },
    
    buttonColor() {
      if (this.hasActiveFilter) return 'secondary'
      if (this.hasActiveSort) return 'secondary'
      return 'primary'
    }
  },
  methods: {
    clearFilter() {
      this.$emit('filters-changed', [])
    },
    
    onFiltersChanged(filters) {
      this.$emit('filters-changed', filters)
    }
  }
}
</script>