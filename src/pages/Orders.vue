<template>
  <q-page class="column">
    <!-- Хлебные крошки -->
    <q-breadcrumbs class="q-mb-md relative-position text-h4">
      <q-breadcrumbs-el icon="home" label="Главная" to="/" class="cursor-pointer text-secondary" />
      <q-breadcrumbs-el icon="shop" label="Мои заказы" to="/orders" class="text-dark text-weight-bold" />
    </q-breadcrumbs>

    <!-- Заголовок и кнопки -->
    <div class="row no-wrap justify-between items-center q-mb-lg">
      <div class="text-h1">
        <q-icon name="shop" size="30px" color="dark" />
        Мои заказы
      </div>
      <div>
        <q-btn size="md" color="primary" icon="add" text-color="dark" padding="8px 12px" @click="openCreateDialog">
          <q-label class="gt-xs">Новый заказ</q-label>
        </q-btn>
      </div>
    </div>

    <div v-if="$q.screen.lt.md">
      <!-- Поиск и фильтры для мобильных -->
      <div class="row items-center q-mb-md">
        <q-input 
          v-model="globalSearch" 
          placeholder="Поиск по всем полям..." 
          dense 
          clearable
          @clear="globalSearch = ''" 
          outlined 
          text-color="secondary"
          color="secondary"
          class="full-width">
          <template v-slot:append>
            <q-separator vertical inset class="q-mx-sm" />
            <q-btn 
              flat 
              dense 
              icon="filter_alt" 
              color="secondary"
              @click="showFiltersDialog = true"
              class="q-pr-none">
              <q-badge v-if="hasActiveFilters" color="accent" floating class="q-pa-xs" style="top: -5px; right: -5px">
                {{ getTotalActiveFiltersCount }}
              </q-badge>
            </q-btn>
            <q-icon name="search" class="q-ml-sm" />
          </template>
        </q-input>

        <!-- Диалог фильтров для мобильных -->
        <BaseDialog 
          v-model="showFiltersDialog" 
          title="Фильтры" 
          :show-cancel="false" 
          :show-confirm="false"
          card-style="min-width: 80vw; max-width: 500px; max-height: 50vh;" 
          :content-class="'q-px-none'"
        >
          <template #content>
            <q-scroll-area style="height: 60vh;" class="q-pr-sm">
              <div class="column q-gutter-y-md q-pb-md q-px-md">
                <!-- Фильтр по номеру счета -->
                <div class="row items-center justify-between">
                  <span class="text-h5">Номер счета</span>
                  <filter-button
                    column-label="Номер счета"
                    column-field="invoiceNumber"
                    :is-sortable="isSortableColumn('invoiceNumber')"
                    :current-sort="sortOrders.invoiceNumber"
                    :filter-options="getFilterOptions('invoiceNumber')"
                    :selected-filters="columnFilters.invoiceNumber"
                    :max-height="200"
                    @sort-changed="handleSortChanged"
                    @filters-changed="(filters) => updateColumnFilters('invoiceNumber', filters)"
                  />
                </div>

                <!-- Фильтр по создателю -->
                <div class="row items-center justify-between">
                  <span class="text-h5">Создатель</span>
                  <filter-button
                    column-label="Создатель"
                    column-field="creator"
                    :is-sortable="isSortableColumn('creator')"
                    :current-sort="sortOrders.creator"
                    :filter-options="getFilterOptions('creator')"
                    :selected-filters="columnFilters.creator"
                    :max-height="200"
                    @sort-changed="handleSortChanged"
                    @filters-changed="(filters) => updateColumnFilters('creator', filters)"
                  />
                </div>

                <!-- Фильтр по компании -->
                <div class="row items-center justify-between">
                  <span class="text-h5">Компания</span>
                  <filter-button
                    column-label="Компания"
                    column-field="company"
                    :is-sortable="isSortableColumn('company')"
                    :current-sort="sortOrders.company"
                    :filter-options="getFilterOptions('company')"
                    :selected-filters="columnFilters.company"
                    :max-height="200"
                    @sort-changed="handleSortChanged"
                    @filters-changed="(filters) => updateColumnFilters('company', filters)"
                  />
                </div>

                <!-- Фильтр по дате -->
                <div class="row items-center justify-between">
                  <span class="text-h5">Дата создания</span>
                  <filter-button
                    column-label="Дата создания"
                    column-field="createdAt"
                    :is-sortable="isSortableColumn('createdAt')"
                    :current-sort="sortOrders.createdAt"
                    :filter-options="getFilterOptions('createdAt')"
                    :selected-filters="columnFilters.createdAt"
                    :max-height="200"
                    @sort-changed="handleSortChanged"
                    @filters-changed="(filters) => updateColumnFilters('createdAt', filters)"
                  />
                </div>

                <!-- Фильтр по сумме -->
                <div class="row items-center justify-between">
                  <span class="text-h5">Сумма</span>
                  <filter-button
                    column-label="Сумма"
                    column-field="amount"
                    :is-sortable="isSortableColumn('amount')"
                    :current-sort="sortOrders.amount"
                    :filter-options="getFilterOptions('amount')"
                    :selected-filters="columnFilters.amount"
                    :max-height="200"
                    @sort-changed="handleSortChanged"
                    @filters-changed="(filters) => updateColumnFilters('amount', filters)"
                  />
                </div>

                <!-- Фильтр по оплате -->
                <div class="row items-center justify-between">
                  <span class="text-h5">Процент оплаты</span>
                  <filter-button
                    column-label="Процент оплаты"
                    column-field="paymentPercent"
                    :is-sortable="isSortableColumn('paymentPercent')"
                    :current-sort="sortOrders.paymentPercent"
                    :filter-options="getFilterOptions('paymentPercent')"
                    :selected-filters="columnFilters.paymentPercent"
                    :max-height="200"
                    @sort-changed="handleSortChanged"
                    @filters-changed="(filters) => updateColumnFilters('paymentPercent', filters)"
                  />
                </div>

                <!-- Фильтр по отгрузке -->
                <div class="row items-center justify-between">
                  <span class="text-h5">Процент отгрузки</span>
                  <filter-button
                    column-label="Процент отгрузки"
                    column-field="shipmentPercent"
                    :is-sortable="isSortableColumn('shipmentPercent')"
                    :current-sort="sortOrders.shipmentPercent"
                    :filter-options="getFilterOptions('shipmentPercent')"
                    :selected-filters="columnFilters.shipmentPercent"
                    :max-height="200"
                    @sort-changed="handleSortChanged"
                    @filters-changed="(filters) => updateColumnFilters('shipmentPercent', filters)"
                  />
                </div>
              </div>
            </q-scroll-area>
          </template>

          <template #actions>
            <q-btn 
              outline 
              size="md" 
              text-color="secondary" 
              label="Сбросить" 
              icon="refresh" 
              padding="4px 12px" 
              @click="resetFilters" 
            />
            <q-btn 
              v-close-popup 
              size="md" 
              color="accent" 
              label="Сохранить" 
              padding="4px 12px" 
            />
          </template>
        </BaseDialog>
      </div>
    </div>

    <!-- Таблица заказов -->
    <q-card>
      <q-card-section>
        <!-- Desktop таблица -->
        <q-table v-if="!$q.screen.lt.md" 
          :data="filteredAndSortedOrders" 
          :columns="columns" 
          row-key="id"
          :pagination.sync="pagination" 
          :rows-per-page-options="rowsPerPageOptions" 
          :loading="loading" 
          hide-pagination
          flat class="no-scroll-table" 
          :rows-per-page="0" 
          :pagination="pagination"
        >
          <!-- Кастомные заголовки с выпадающими фильтрами для desktop -->
          <template v-slot:header="props">
            <q-tr :props="props">
              <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-h3 multi-line-header" @click.stop="">
                <div class="column full-width items-center" @click.stop="">
                  <!-- Основной контейнер заголовка -->
                  <div class="row items-center justify-between full-width q-px-xs">
                    <!-- Левая часть - текст заголовка -->
                    <div class="row items-center">
                      <span class="header-label">{{ col.label }}</span>
                    </div>

                    <!-- Правая часть - индикаторы и кнопка фильтра -->
                    <div class="row items-center">
                      <filter-button
                        v-if="col.name !== 'actions'"
                        :column-label="col.label"
                        :column-field="col.field"
                        :is-sortable="isSortableColumn(col.field)"
                        :current-sort="sortOrders[col.field]"
                        :filter-options="getFilterOptions(col.field)"
                        :selected-filters="columnFilters[col.field]"
                        :max-height="200"
                        @sort-changed="handleSortChanged"
                        @filters-changed="(filters) => updateColumnFilters(col.field, filters)"
                      />
                    </div>
                  </div>

                  <!-- Подчеркивание для активного фильтра -->
                  <div v-if="hasActiveColumnFilter(col.field)" class="active-filter-indicator"
                    style="height: 2px; background: primary; width: 100%; margin-top: 2px;"></div>
                </div>
              </q-th>
            </q-tr>
          </template>

          <!-- Слот для верхней панели с поиском и кнопкой сброса -->
          <template v-slot:top>
            <div class="row items-center justify-between full-width q-gutter-md">
              <!-- Общий поиск по всем полям -->
              <div class="col-auto q-ml-none">
                <q-input v-model="globalSearch" placeholder="Поиск по всем полям..." dense clearable
                  @clear="globalSearch = ''" outlined style="min-width: 300px;" class="global-search"
                  text-color="secondary">
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>

              <div class="col-auto">
                <q-btn size="md" outline label="Сбросить фильтры" icon="filter_alt" text-color="secondary"
                  padding="6px 16px" @click="resetFilters" />
              </div>
            </div>
          </template>

          <!-- Тело таблицы для desktop -->
          <template v-slot:body="props">
            <order-table-row 
              :order="props.row" 
              @view="viewOrder" 
              @copy="copyOrder" 
              @delete="openDeleteDialog" 
            />
          </template>

          <!-- Сообщение когда нет данных -->
          <template v-slot:no-data>
            <no-data-placeholder :has-active-filters="hasActiveFilters" />
          </template>

          <!-- Пагинация для desktop -->
          <template v-slot:bottom>
            <pagination
              v-if="allFilteredOrders.length > 0"
              :current-page="pagination.page"
              :rows-per-page="pagination.rowsPerPage"
              :total-items="allFilteredOrders.length"
              :rows-per-page-options="rowsPerPageOptions"
              variant="desktop"
              @page-changed="pagination.page = $event"
              @rows-per-page-changed="pagination.rowsPerPage = $event; pagination.page = 1"
            />
          </template>
        </q-table>

        <!-- Мобильный список -->
        <div v-else>
          <!-- Список заказов -->
          <q-list class="q-gutter-y-md" separator>
            <order-mobile-card
              v-for="order in filteredAndSortedOrders"
              :key="order.id"
              :order="order"
              @view="viewOrder"
              @copy="copyOrder"
              @delete="openDeleteDialog"
            />

            <!-- Сообщение когда нет данных -->
            <no-data-placeholder 
              v-if="filteredAndSortedOrders.length === 0"
              :has-active-filters="hasActiveFilters" 
            />
          </q-list>

          <!-- Пагинация для мобильных -->
          <pagination
            v-if="filteredAndSortedOrders.length > 0"
            :current-page="pagination.page"
            :rows-per-page="pagination.rowsPerPage"
            :total-items="allFilteredOrders.length"
            :rows-per-page-options="rowsPerPageOptions"
            variant="mobile"
            @page-changed="pagination.page = $event"
            @rows-per-page-changed="pagination.rowsPerPage = $event; pagination.page = 1"
          />
        </div>
      </q-card-section>
    </q-card>

    <!-- Диалоги (остаются без изменений) -->
    <BaseDialog v-model="showCreateDialog" title="Новый заказ" :is-valid="isNewOrderValid" @confirm="createNewOrder"
      @cancel="cancelCreateOrder">
      <template #content>
        <q-form class="q-gutter-md">
          <q-input v-model="newOrder.invoiceNumber" class="q-pb-none q-pt-md" label="Номер счета *" required outlined
            :rules="[val => !!val || 'Обязательное поле']" />

          <q-input v-model="newOrder.creator" class="q-pb-none" label="Создатель *" required outlined
            :rules="[val => !!val || 'Обязательное поле']" />

          <q-input class="q-pb-none" v-model="newOrder.company" label="Компания *" required outlined
            :rules="[val => !!val || 'Обязательное поле']" />

          <q-input class="q-pb-none" v-model="newOrder.projectName" label="Название проекта" outlined />

          <q-input class="q-pb-none" v-model="newOrder.date" label="Дата *" type="date" required outlined
            :rules="[val => !!val || 'Обязательное поле']" />

          <q-input class="q-pb-none" v-model="newOrder.description" label="Описание" type="textarea" outlined
            rows="2" />

          <q-checkbox v-model="newOrder.warehouseDS" label="Склад DS" class="text-h4" />
        </q-form>
      </template>
    </BaseDialog>

    <BaseDialog v-model="showDeleteDialog" title="Удалить заказ" confirm-label="Удалить" :is-valid="true"
      @confirm="confirmDeleteOrder" @cancel="cancelDeleteOrder">
      <template #content>
        <div class="text-h4">
          Вы уверены, что хотите удалить заказ "{{ orderToDelete?.invoiceNumber }}"?
        </div>
        <div class="text-h5 q-mt-sm q-pb-md">
          Эта операция необратима.
        </div>
      </template>
    </BaseDialog>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseDialog from '@/components/utilits/BaseDialog.vue'
import FilterButton from '@/components/utilits/FilterButton.vue'
import OrderTableRow from '@/components/utilits/OrderTableRow.vue'
import OrderMobileCard from '@/components/utilits/OrderMobileCard.vue'
import Pagination from '@/components/utilits/Pagination.vue'
import NoDataPlaceholder from '@/components/utilits/NoDataPlaceholder.vue'
import AnimatedInfoCard from 'components/utilits/AnimatedInfoCard.vue'

export default {
  name: 'OrdersList',
  components: {
    BaseDialog,
    FilterButton,
    OrderTableRow,
    OrderMobileCard,
    Pagination,
    NoDataPlaceholder,
    AnimatedInfoCard
  },
  data() {
    return {
      loading: false,
      globalSearch: '',
      columnFilters: {
        invoiceNumber: [],
        creator: [],
        company: [],
        createdAt: [],
        amount: [],
        paymentPercent: [],
        shipmentPercent: []
      },
      filterSearch: {
        invoiceNumber: '',
        creator: '',
        company: '',
        createdAt: '',
        amount: '',
        paymentPercent: '',
        shipmentPercent: ''
      },
      sortOrders: {
        invoiceNumber: null,
        creator: null,
        company: null,
        createdAt: null,
        amount: null,
        paymentPercent: null,
        shipmentPercent: null
      },
      currentSortColumn: null,
      pagination: {
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 0
      },
      rowsPerPageOptions: [5, 10, 25, 50],
      showCreateDialog: false,
      showDeleteDialog: false,
      showFiltersDialog: false,
      orderToDelete: null,
      newOrder: {
        invoiceNumber: '',
        creator: '',
        company: '',
        projectName: '',
        date: '',
        amount: 0,
        description: '',
        warehouseDS: false,
        paymentPercent: 0,
        shipmentPercent: 0
      },

      columns: [
        {
          name: 'invoiceNumber',
          label: 'Номер счета',
          field: 'invoiceNumber',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'creator',
          label: 'Создатель',
          field: 'creator',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'company',
          label: 'Компания',
          field: 'company',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'createdAt',
          label: 'Дата создания',
          field: 'createdAt',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'amount',
          label: 'Сумма',
          field: 'amount',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'paymentPercent',
          label: 'Процент оплаты',
          field: 'paymentPercent',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'shipmentPercent',
          label: 'Процент отгрузки',
          field: 'shipmentPercent',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'actions',
          label: 'Действия',
          align: 'right',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('orders', ['getAllOrders']),

    filteredOrders() {
      let orders = this.getAllOrders || []

      if (this.globalSearch.trim()) {
        const searchTerm = this.globalSearch.toLowerCase().trim()
        orders = orders.filter(order => {
          return Object.keys(order).some(key => {
            const value = order[key]?.toString().toLowerCase()
            return value && value.includes(searchTerm)
          })
        })
      }

      Object.keys(this.columnFilters).forEach(column => {
        const selectedValues = this.columnFilters[column]
        if (selectedValues && selectedValues.length > 0) {
          orders = orders.filter(order => {
            const cellValue = order[column]
            if (!cellValue) return false

            if (column === 'createdAt') {
              const normalizedCellDate = new Date(cellValue).toISOString().split('T')[0]
              return selectedValues.includes(normalizedCellDate)
            }

            return selectedValues.includes(cellValue.toString())
          })
        }
      })

      return orders
    },

    allFilteredOrders() {
      let orders = this.getAllOrders || []

      if (this.globalSearch.trim()) {
        const searchTerm = this.globalSearch.toLowerCase().trim()
        orders = orders.filter(order => {
          return Object.keys(order).some(key => {
            const value = order[key]?.toString().toLowerCase()
            return value && value.includes(searchTerm)
          })
        })
      }

      Object.keys(this.columnFilters).forEach(column => {
        const selectedValues = this.columnFilters[column]
        if (selectedValues && selectedValues.length > 0) {
          orders = orders.filter(order => {
            const cellValue = order[column]
            if (!cellValue) return false

            if (column === 'createdAt') {
              const normalizedCellDate = new Date(cellValue).toISOString().split('T')[0]
              return selectedValues.includes(normalizedCellDate)
            }

            return selectedValues.includes(cellValue.toString())
          })
        }
      })

      // Сортировка
      if (this.currentSortColumn && this.sortOrders[this.currentSortColumn]) {
        const column = this.currentSortColumn
        const direction = this.sortOrders[column]

        orders.sort((a, b) => {
          let aValue = a[column]
          let bValue = b[column]

          if (column === 'createdAt') {
            aValue = new Date(aValue).getTime()
            bValue = new Date(bValue).getTime()
          }

          if (column === 'amount' || column.includes('Percent')) {
            aValue = Number(aValue) || 0
            bValue = Number(bValue) || 0
          }

          if (column === 'invoiceNumber' || column === 'creator' || column === 'company') {
            aValue = aValue?.toString().toLowerCase() || ''
            bValue = bValue?.toString().toLowerCase() || ''
          }

          if (direction === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          }
        })
      }
      this.pagination.rowsNumber = orders.length

      return orders
    },

    filteredAndSortedOrders() {
      // Применяем пагинацию ко всем отфильтрованным записям
      const startIndex = (this.pagination.page - 1) * this.pagination.rowsPerPage
      const endIndex = startIndex + this.pagination.rowsPerPage
      return this.allFilteredOrders.slice(startIndex, endIndex)
    },

    hasActiveFilters() {
      const hasColumnFilters = Object.values(this.columnFilters).some(values => values && values.length > 0)
      const hasSorting = Object.values(this.sortOrders).some(sort => sort !== null)
      return hasColumnFilters || hasSorting || this.globalSearch.trim() !== ''
    },

    isNewOrderValid() {
      return this.newOrder.invoiceNumber.trim() !== '' &&
        this.newOrder.creator.trim() !== '' &&
        this.newOrder.company.trim() !== '' &&
        this.newOrder.date.trim() !== ''
    },

    getTotalActiveFiltersCount() {
      let count = 0
      
      // Считаем колонки с активными фильтрами (выбранные значения)
      Object.values(this.columnFilters).forEach(values => {
        if (values && values.length > 0) {
          count++
        }
      })
      
      // Добавляем сортировки
      Object.values(this.sortOrders).forEach(sort => {
        if (sort !== null) {
          count++
        }
      })
      
      // Добавляем глобальный поиск
      if (this.globalSearch.trim() !== '') {
        count++
      }
      
      return count
    }
  },
  methods: {
    ...mapActions('orders', ['fetchOrders', 'addOrder', 'deleteOrder']),

    // Новый метод для обновления фильтров колонки
    updateColumnFilters(field, filters) {
      this.columnFilters[field] = filters
      this.pagination.page = 1
    },

    // Новый метод для обработки сортировки
    handleSortChanged({ field, direction }) {
      this.setSort(field, direction)
    },

    getUniqueValues(field) {
      const orders = this.getAllOrders || []
      const seen = new Set()
      const values = []

      orders.forEach(order => {
        const value = order[field]
        if (value != null && value !== '') {
          let normalizedValue

          if (field === 'createdAt') {
            const date = new Date(value)
            normalizedValue = date.toISOString().split('T')[0]
          } else {
            normalizedValue = value.toString().trim()
          }

          if (!seen.has(normalizedValue)) {
            seen.add(normalizedValue)
            values.push(normalizedValue)
          }
        }
      })

      return values.sort()
    },

    getFilterOptions(field) {
      let values = this.getUniqueValues(field)
      const searchTerm = this.filterSearch[field]?.toLowerCase().trim()

      if (searchTerm) {
        values = values.filter(value =>
          value.toString().toLowerCase().includes(searchTerm)
        )
      }

      return values.map(value => ({
        label: field === 'createdAt' ? this.formatDate(value) : value.toString(),
        value: value
      }))
    },

    hasActiveColumnFilter(field) {
      return this.columnFilters[field] && this.columnFilters[field].length > 0
    },

    getActiveFilterCount(field) {
      return this.columnFilters[field] ? this.columnFilters[field].length : 0
    },

    clearColumnFilter(field) {
      this.columnFilters[field] = []
      this.pagination.page = 1
    },

    setSort(column, direction) {
      Object.keys(this.sortOrders).forEach(key => {
        if (key !== column) {
          this.sortOrders[key] = null
        }
      })

      this.sortOrders[column] = direction
      this.currentSortColumn = direction ? column : null
      this.pagination.page = 1
    },

    resetFilters() {
      this.columnFilters = {
        invoiceNumber: [],
        creator: [],
        company: [],
        createdAt: [],
        amount: [],
        paymentPercent: [],
        shipmentPercent: []
      }
      this.filterSearch = {
        invoiceNumber: '',
        creator: '',
        company: '',
        createdAt: '',
        amount: '',
        paymentPercent: '',
        shipmentPercent: ''
      }
      this.sortOrders = {
        invoiceNumber: null,
        creator: null,
        company: null,
        createdAt: null,
        amount: null,
        paymentPercent: null,
        shipmentPercent: null
      }
      this.currentSortColumn = null
      this.globalSearch = ''
      this.pagination.page = 1
      this.showFiltersDialog = false
    },

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
    },

    viewOrder(order) {
      this.$router.push(`/orders/${order.id}`)
    },

    async copyOrder(order) {
      try {
        const orderData = {
          ...order,
          items: order.items ? [...order.items] : []
        }
        delete orderData.id
        orderData.invoiceNumber = `COPY-${orderData.invoiceNumber}`
        orderData.paymentPercent = 0
        orderData.shipmentPercent = 0
        orderData.createdAt = new Date().toISOString()

        await this.addOrder(orderData)
        this.showNotification('Заказ скопирован', 'positive')
      } catch (error) {
        this.showNotification('Ошибка при копировании заказа', 'negative')
      }
    },

    openDeleteDialog(order) {
      this.orderToDelete = order
      this.showDeleteDialog = true
    },

    async confirmDeleteOrder() {
      try {
        if (this.orderToDelete) {
          await this.deleteOrder(this.orderToDelete.id)
          this.showDeleteDialog = false
          this.orderToDelete = null
          this.showNotification('Заказ удален', 'negative')

          // Если удалили последний элемент на странице, переходим на предыдущую
          if (this.filteredAndSortedOrders.length === 0 && this.pagination.page > 1) {
            this.pagination.page--
          }
        }
      } catch (error) {
        this.showNotification('Ошибка при удалении заказа', 'negative')
      }
    },

    cancelDeleteOrder() {
      this.showDeleteDialog = false
      this.orderToDelete = null
    },

    openCreateDialog() {
      this.newOrder = {
        invoiceNumber: '',
        creator: '',
        company: '',
        projectName: '',
        date: this.getCurrentDate(),
        amount: 0,
        description: '',
        warehouseDS: false,
        paymentPercent: 0,
        shipmentPercent: 0
      }
      this.showCreateDialog = true
    },

    async createNewOrder() {
      try {
        const orderData = {
          ...this.newOrder,
          paymentPercent: 0,
          shipmentPercent: 0,
          items: [],
          specialConditions: '',
          warehouseDS: false,
          createdAt: new Date().toISOString()
        }

        await this.addOrder(orderData)
        this.showCreateDialog = false
        this.showNotification('Новый заказ создан', 'positive')
      } catch (error) {
        this.showNotification('Ошибка при создании заказа', 'negative')
      }
    },

    cancelCreateOrder() {
      this.showCreateDialog = false
      this.newOrder = {
        invoiceNumber: '',
        creator: '',
        company: '',
        projectName: '',
        date: this.getCurrentDate(),
        amount: 0,
        description: '',
        warehouseDS: false,
        paymentPercent: 0,
        shipmentPercent: 0
      }
    },

    getCurrentDate() {
      return new Date().toISOString().split('T')[0]
    },

    showNotification(message, type) {
      this.$q.notify({
        type: type,
        message: message,
        position: 'top'
      })
    },

    isSortableColumn(field) {
      const sortableColumns = ['createdAt', 'amount', 'paymentPercent', 'shipmentPercent']
      return sortableColumns.includes(field)
    },

    filterOptions(field, inputValue, update) {
      if (inputValue === '') {
        update(() => {
          this.filterSearch[field] = ''
        })
        return
      }

      update(() => {
        this.filterSearch[field] = inputValue
      })
    },

    handleClose() {
      console.log('Плашка закрыта')
    },
    
    handleAutoClose() {
      console.log('Автоматическое закрытие')
    },
    
    confirmAction() {
      console.log('Действие подтверждено')
    }
  },
  watch: {
    pagination: {
      handler(newPagination) {
        const totalPages = Math.ceil(this.allFilteredOrders.length / newPagination.rowsPerPage)
        if (newPagination.page > totalPages && totalPages > 0) {
          this.pagination.page = totalPages
        }
      },
      deep: true
    },

    allFilteredOrders: {
      handler(newOrders) {
        const totalPages = Math.ceil(newOrders.length / this.pagination.rowsPerPage)
        if (this.pagination.page > totalPages && totalPages > 0) {
          this.pagination.page = totalPages
        } else if (totalPages === 0 && this.pagination.page !== 1) {
          this.pagination.page = 1
        }
      },
      immediate: true
    }
  },
  async mounted() {
    this.loading = true
    try {
      await this.fetchOrders()
    } catch (error) {
      this.showNotification('Ошибка при загрузке заказов', 'negative')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
.no-scroll-table>>>.q-table th:nth-child(1),
.no-scroll-table>>>.q-table td:nth-child(1) {
  width: 13%;
}

.no-scroll-table>>>.q-table th:nth-child(2),
.no-scroll-table>>>.q-table td:nth-child(2) {
  width: 12%;
}

.no-scroll-table>>>.q-table th:nth-child(3),
.no-scroll-table>>>.q-table td:nth-child(3) {
  width: 12%;
}

.no-scroll-table>>>.q-table th:nth-child(4),
.no-scroll-table>>>.q-table td:nth-child(4) {
  width: 14%;
}

.no-scroll-table>>>.q-table th:nth-child(5),
.no-scroll-table>>>.q-table td:nth-child(5) {
  width: 11%;
}

.no-scroll-table>>>.q-table th:nth-child(6),
.no-scroll-table>>>.q-table td:nth-child(6) {
  width: 14%;
}

.no-scroll-table>>>.q-table th:nth-child(7),
.no-scroll-table>>>.q-table td:nth-child(7) {
  width: 14%;
}

.no-scroll-table>>>.q-table th:nth-child(8),
.no-scroll-table>>>.q-table td:nth-child(8) {
  width: 10%;
}
</style>