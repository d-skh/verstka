<template>
  <q-menu 
    ref="menuRef"
    anchor="bottom right" 
    self="top right" 
    :max-height="isSortable ? '400px' : '300px'"
  >
    <div class="q-ma-sm">
      <q-card-section class="q-pa-sm">
        <!-- Заголовок меню с названием колонки -->
        <div class="text-caption text-weight-medium q-mb-xs text-center">
          Фильтр: {{ columnLabel }}
        </div>

        <!-- Сортировка (только для сортируемых колонок) -->
        <div v-if="isSortable" class="row items-center justify-between q-mb-sm q-px-sm">
          <span class="text-caption">Сортировка:</span>
          <div class="row">
            <q-btn 
              icon="arrow_upward" 
              flat dense size="sm"
              :color="localSort === 'asc' ? 'secondary' : 'primary'"
              @click="setLocalSort('asc')"
            >
              <q-tooltip>По возрастанию</q-tooltip>
            </q-btn>
            <q-btn 
              icon="arrow_downward" 
              flat dense size="sm"
              :color="localSort === 'desc' ? 'secondary' : 'primary'"
              @click="setLocalSort('desc')"
            >
              <q-tooltip>По убыванию</q-tooltip>
            </q-btn>
            <!-- Убрали кнопку с крестиком -->
          </div>
        </div>

        <!-- Поиск в фильтре -->
        <q-input 
          v-model="localSearch" 
          placeholder="Поиск в списке..." 
          dense clearable
          outlined class="q-mb-sm" 
          @click.stop
        >
          <template v-slot:append>
            <q-icon name="search" size="16px" />
          </template>
        </q-input>

        <!-- Список значений для фильтрации -->
        <div class="filter-options">
          <div v-for="(option, index) in filteredOptions" :key="option.value">
            <q-item tag="label" dense class="q-px-none">
              <q-item-section side top>
                <q-checkbox 
                  v-model="localFilters" 
                  :val="option.value" 
                  dense 
                />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ option.label }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-separator v-if="index < filteredOptions.length - 1" />
          </div>
        </div>

        <!-- Кнопки управления фильтром -->
        <div class="row justify-end q-mt-sm">
          <q-btn 
            label="Очистить" 
            outline size="sm" 
            color="secondary"
            @click="clearAll" 
            class="q-mr-xs"
          />
          <q-btn 
            label="Применить" 
            size="sm" 
            color="accent" 
            @click="applyAll"
          />
        </div>
      </q-card-section>
    </div>
  </q-menu>
</template>

<script>
export default {
  name: 'ColumnFilterMenu',
  props: {
    columnLabel: String,
    columnField: String,
    isSortable: Boolean,
    currentSort: String,
    filterOptions: Array,
    selectedFilters: Array
  },
  data() {
    return {
      localSearch: '',
      localFilters: [...this.selectedFilters],
      localSort: this.currentSort
    }
  },
  computed: {
    filteredOptions() {
      if (!this.localSearch) return this.filterOptions
      
      const searchTerm = this.localSearch.toLowerCase()
      return this.filterOptions.filter(option => 
        option.label.toLowerCase().includes(searchTerm)
      )
    }
  },
  watch: {
    selectedFilters(newVal) {
      this.localFilters = [...newVal]
    },
    
    currentSort(newVal) {
      this.localSort = newVal
    }
  },
  methods: {
    setLocalSort(direction) {
      this.localSort = direction
    },
    
    clearAll() {
      this.localFilters = []
      this.localSearch = ''
      this.localSort = null
      // Применяем очистку и закрываем меню
      this.$emit('filters-changed', [])
      if (this.isSortable) {
        this.$emit('sort-changed', { field: this.columnField, direction: null })
      }
      this.hideMenu()
    },
    
    applyAll() {
      // Применяем фильтры
      this.$emit('filters-changed', this.localFilters)
      
      // Применяем сортировку только если она изменилась
      if (this.localSort !== this.currentSort) {
        this.$emit('sort-changed', { field: this.columnField, direction: this.localSort })
      }
      
      this.hideMenu()
    },

    hideMenu() {
      if (this.$refs.menuRef && this.$refs.menuRef.hide) {
        this.$refs.menuRef.hide()
      }
    }
  }
}
</script>