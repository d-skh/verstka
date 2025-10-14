<template>
  <q-page class="column">
    <!-- Хлебные крошки -->
    <q-breadcrumbs class="q-mb-md relative-position text-h4">
      <q-breadcrumbs-el 
        icon="home" 
        label="Главная" 
        to="/"
        class="cursor-pointer text-secondary"
      />
      <q-breadcrumbs-el 
        icon="shop" 
        label="Мои заказы" 
        to="/orders"
        class="cursor-pointer text-secondary" 
      />
      <q-breadcrumbs-el 
        icon="assignment" 
        :label="order?.projectName || `Заказ ${order?.invoiceNumber}`" 
        class="text-dark text-weight-bold" 
      />
    </q-breadcrumbs>

    <div v-if="order" class="order-detail">
      <!-- Заголовок -->
      <div class="row items-center q-mb-lg">
        <div class="col">
          <div class="text-h1">{{ order.projectName || `Заказ ${order.invoiceNumber}` }}</div>
        </div>
      </div>

      <!-- Основная информация -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-4">
          <div class="text-h5">Общая сумма</div>
          <div class="text-h4">{{ formatCurrency(order.amount) }}</div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="text-h5">Условия оплаты</div>
          <div class="text-h4">{{ order.paymentTerms || 'Не указано' }}</div>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-12 col-sm-4">
          <div class="text-h5">Ответственный менеджер</div>
          <div class="text-h4">{{ order.manager || 'Не назначен' }}</div>
        </div>
        <div class="col-12 col-sm-4">
          <q-checkbox 
            v-model="warehouseDS"
            label="Склад DS" 
            class="text-h4"
            dense
          />
        </div>
      </div>

      <!-- Табы -->
      <q-card>
        <q-card-section class="row items-center q-pa-sm">
          <div class="col">
            <q-tabs 
              v-model="activeTab" 
              active-color="primary" 
              indicator-color="primary" 
              align="left" 
              narrow-indicator
            >
              <q-tab 
                name="items" 
                :icon="$q.screen.gt.xs ? undefined : 'list_alt'"
                :label="$q.screen.lt.sm ? undefined : 'Позиции заказа'" 
                class="text-h2 tab-responsive"
              />
              <q-tab 
                name="conditions" 
                :icon="$q.screen.gt.xs ? undefined : 'local_offer'"
                :label="$q.screen.lt.sm ? undefined : 'Спецусловия и скидки'" 
                class="text-h2 tab-responsive"
              />
            </q-tabs>
          </div>

          <div class="col-auto">
            <q-btn outline size="md" :label="$q.screen.lt.sm ? '' : 'Ещё'" icon="more_vert" text-color="secondary">
              <q-menu>
                <q-list style="min-width: 200px">
                  <q-item clickable v-close-popup @click="editProjectName">
                    <q-item-section avatar>
                      <q-icon name="edit" />
                    </q-item-section>
                    <q-item-section>Название проекта</q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="copyOrder">
                    <q-item-section avatar>
                      <q-icon name="content_copy" />
                    </q-item-section>
                    <q-item-section>Копировать</q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="completeOrderAction" :disable="order.status === 'completed'">
                    <q-item-section avatar>
                      <q-icon name="flag" />
                    </q-item-section>
                    <q-item-section>Завершить заказ</q-item-section>
                  </q-item>

                  <q-item clickable v-close-popup @click="cancelOrderAction"
                    :disable="order.status === 'cancelled' || order.status === 'completed'">
                    <q-item-section avatar>
                      <q-icon name="arrow_back" />
                    </q-item-section>
                    <q-item-section>Отменить заказ</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </q-card-section>

        <q-separator />

        <q-tab-panels v-model="activeTab" animated>
          <q-tab-panel name="items">
            <!-- Desktop версия - фильтры и поиск -->
            <div v-if="!$q.screen.lt.md" class="row items-center justify-between full-width q-gutter-md q-mb-md">
              <!-- Поиск -->
              <div class="col-auto">
                <q-input 
                  v-model="filter" 
                  placeholder="Поиск по артикулу и коду..." 
                  dense clearable
                  outlined 
                  style="min-width: 250px;"
                  class="global-search"
                  text-color="secondary"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>

              <!-- Кнопка сброса -->
              <div class="col-auto">
                <q-btn 
                  size="md" 
                  outline 
                  label="Сбросить фильтры" 
                  icon="filter_alt" 
                  text-color="secondary"
                  padding="6px 16px" 
                  @click="resetFilters" 
                  :disable="!hasActiveFilters"
                />
              </div>

              <!-- Кнопка добавить строку -->
              <div class="col-auto">
                <q-btn 
                  size="md" 
                  color="primary" 
                  label="Добавить строку" 
                  icon="add" 
                  text-color="dark"
                  padding="6px 16px" 
                  @click="openAddRowDialog"
                />
              </div>
            </div>

            <!-- Mobile версия - поиск с кнопкой фильтров -->
            <div v-else class="row items-center q-mb-md">
              <q-input 
                v-model="filter" 
                placeholder="Поиск по артикулу и коду..." 
                dense clearable
                outlined 
                class="full-width"
                text-color="secondary"
              >
                <template v-slot:append>
                  <q-separator vertical inset class="q-mx-sm" />
                  <q-btn 
                    flat 
                    dense 
                    icon="filter_alt" 
                    color="secondary"
                    @click="showMobileFiltersDialog = true"
                    class="q-pr-none"
                  >
                    <q-badge v-if="hasActiveFilters" color="accent" floating class="q-pa-xs" style="top: -5px; right: -5px">
                      {{ getTotalActiveFiltersCount }}
                    </q-badge>
                  </q-btn>
                  <q-icon name="search" class="q-ml-sm" />
                </template>
              </q-input>
            </div>

            <!-- Desktop таблица -->
            <q-table
              v-if="!$q.screen.lt.md"
              :data="paginatedItems"
              :columns="columns"
              row-key="id"
              :pagination="pagination"
              flat
              class="no-scroll-table"
              hide-pagination
            >
              <!-- Заголовки с фильтрами -->
              <template v-slot:header="props">
                <q-tr :props="props">
                  <q-th v-for="col in props.cols" :key="col.name" :props="props" class="text-h3 multi-line-header">
                    <div class="column full-width items-center">
                      <div class="row items-center justify-between full-width q-px-xs">
                        <div class="row items-center">
                          <span class="header-label">{{ col.label }}</span>
                        </div>
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
                    </div>
                  </q-th>
                </q-tr>
              </template>

              <!-- Тело таблицы -->
              <template v-slot:body="props">
                <order-item-table-row 
                  :props="props"
                  @edit="editRow"
                  @delete="openDeleteDialog"
                />
              </template>

              <!-- Итоги -->
              <template v-slot:bottom-row v-if="paginatedItems.length > 0">
                <q-tr class="text-right text-h3 text-dark">
                  <q-td colspan="3">Итого:</q-td>
                  <q-td>{{ formatCurrency(totalAmount) }}</q-td>
                  <q-td></q-td>
                  <q-td>{{ formatCurrency(totalDiscountedPrice) }}</q-td>
                  <q-td>{{ formatCurrency(totalDiscountedAmountWithVAT) }}</q-td>
                  <q-td></q-td>
                </q-tr>
              </template>

              <!-- Нет данных -->
              <template v-slot:no-data>
                <no-data-placeholder :has-active-filters="hasActiveFilters" />
              </template>

              <!-- Пагинация -->
              <template v-slot:bottom>
                <pagination
                  v-if="filteredItems.length > 0"
                  :current-page="pagination.page"
                  :rows-per-page="pagination.rowsPerPage"
                  :total-items="filteredItems.length"
                  :rows-per-page-options="[5, 10, 25, 50]"
                  variant="desktop"
                  @page-changed="onPageChanged"
                  @rows-per-page-changed="onRowsPerPageChanged"
                />
              </template>
            </q-table>

            <!-- Mobile версия -->
<div v-else>
  <div class="row justify-center q-mb-md">
    <q-btn 
      size="md" 
      color="primary" 
      label="Добавить позицию" 
      icon="add" 
      text-color="dark"
      class="full-width"
      @click="openAddRowDialog"
    />
  </div>

  <q-separator />

  <q-list class="q-gutter-y-md" separator>
    <order-item-mobile-card
      v-for="item in paginatedItems"
      :key="item.id"
      :item="item"
      @edit="editRow"
      @delete="openDeleteDialog"
    />
    
    <!-- Блок с итогами - всегда последний -->
    <order-total-mobile-card
      :total-amount="totalAmount"
      :total-discounted-price="totalDiscountedPrice"
      :total-discounted-amount-with-v-a-t="totalDiscountedAmountWithVAT"
      :total-items="filteredItems.length"
    />
  </q-list>

  <!-- Пагинация -->
  <pagination
    v-if="filteredItems.length > 0"
    :current-page="pagination.page"
    :rows-per-page="pagination.rowsPerPage"
    :total-items="filteredItems.length"
    :rows-per-page-options="[5, 10, 25]"
    variant="mobile"
    @page-changed="onPageChanged"
    @rows-per-page-changed="onRowsPerPageChanged"
  />

  <!-- Нет данных -->
  <no-data-placeholder 
    v-if="filteredItems.length === 0"
    :has-active-filters="hasActiveFilters" 
  />
</div>
          </q-tab-panel>

          <q-tab-panel name="conditions">
            <div class="text-h2 q-mb-md">Спецусловия и скидки</div>
            <q-input v-model="order.specialConditions" type="textarea" outlined rows="8"
              placeholder="Введите специальные условия и скидки..." @blur="updateSpecialConditions" />
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </div>

    <div v-else class="flex flex-center">
      <q-spinner size="50px" color="primary" />
    </div>

    <!---->

    <!-- Диалог мобильных фильтров -->
    <BaseDialog 
      v-model="showMobileFiltersDialog" 
      title="Фильтры" 
      :show-cancel="false" 
      :show-confirm="false"
      card-style="min-width: 80vw; max-width: 500px; max-height: 70vh;" 
      :content-class="'q-px-none'"
    >
      <template #content>
        <q-scroll-area style="height: 50vh;" class="q-pr-sm">
          <div class="column q-gutter-y-md q-pb-md q-px-md">
            <!-- Фильтр по артикулу -->
            <div class="row items-center justify-between">
              <span class="text-h5">Артикул</span>
              <filter-button
                column-label="Артикул"
                column-field="article"
                :is-sortable="isSortableColumn('article')"
                :current-sort="sortOrders.article"
                :filter-options="getFilterOptions('article')"
                :selected-filters="columnFilters.article"
                :max-height="200"
                @sort-changed="handleSortChanged"
                @filters-changed="(filters) => updateColumnFilters('article', filters)"
              />
            </div>

            <!-- Фильтр по типовому коду -->
            <div class="row items-center justify-between">
              <span class="text-h5">Типовой код</span>
              <filter-button
                column-label="Типовой код"
                column-field="typicalCode"
                :is-sortable="isSortableColumn('typicalCode')"
                :current-sort="sortOrders.typicalCode"
                :filter-options="getFilterOptions('typicalCode')"
                :selected-filters="columnFilters.typicalCode"
                :max-height="200"
                @sort-changed="handleSortChanged"
                @filters-changed="(filters) => updateColumnFilters('typicalCode', filters)"
              />
            </div>

            <!-- Фильтр по количеству -->
            <div class="row items-center justify-between">
              <span class="text-h5">Количество</span>
              <filter-button
                column-label="Количество"
                column-field="quantity"
                :is-sortable="isSortableColumn('quantity')"
                :current-sort="sortOrders.quantity"
                :filter-options="getFilterOptions('quantity')"
                :selected-filters="columnFilters.quantity"
                :max-height="200"
                @sort-changed="handleSortChanged"
                @filters-changed="(filters) => updateColumnFilters('quantity', filters)"
              />
            </div>

            <!-- Фильтр по цене -->
            <div class="row items-center justify-between">
              <span class="text-h5">Цена</span>
              <filter-button
                column-label="Цена"
                column-field="price"
                :is-sortable="isSortableColumn('price')"
                :current-sort="sortOrders.price"
                :filter-options="getFilterOptions('price')"
                :selected-filters="columnFilters.price"
                :max-height="200"
                @sort-changed="handleSortChanged"
                @filters-changed="(filters) => updateColumnFilters('price', filters)"
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

    <!-- Остальные диалоги -->
    <BaseDialog 
      v-model="showProjectNameDialog" 
      title="Название проекта" 
      :is-valid="!!editedProjectName"
      @confirm="saveProjectName" 
      @cancel="cancelProjectNameEdit"
    >
      <template #content>
        <q-input v-model="editedProjectName" label="Название проекта" outlined
          :rules="[val => !!val || 'Обязательное поле']" />
      </template>
    </BaseDialog>

    <BaseDialog 
      v-model="showAddRowDialog" 
      title="Добавить позицию" 
      :is-valid="isNewRowValid"
      @confirm="addNewRow" 
      @cancel="cancelAddRow"
    >
      <template #content>
        <div class="q-gutter-md">
          <q-input class="q-pt-md q-pb-none" v-model="newRow.article" label="Артикул" outlined
            :rules="[val => !!val || 'Обязательное поле']" />
          <q-input class="q-pb-none" v-model="newRow.typicalCode" label="Типовой код" outlined />
          <q-input class="q-pb-none" v-model.number="newRow.quantity" label="Количество" type="number" outlined
            :rules="[val => val > 0 || 'Количество должно быть больше 0']" />
          <q-input class="q-pb-none" v-model.number="newRow.price" label="Цена" type="number" outlined
            :rules="[val => val >= 0 || 'Цена не может быть отрицательной']" />
          <q-input class="q-pb-md" v-model.number="newRow.discount" label="Скидка %" type="number" outlined
            :rules="[val => val >= 0 && val <= 100 || 'Скидка должна быть от 0 до 100%']" />
        </div>
      </template>
    </BaseDialog>

    <BaseDialog 
      v-model="showEditRowDialog" 
      title="Редактировать позицию" 
      confirm-label="Изменить"
      :is-valid="isEditRowValid"
      @confirm="saveEditedRow" 
      @cancel="cancelEditRow"
    >
      <template #content>
        <div class="q-gutter-md">
          <q-input class="q-pt-md q-pb-none" v-model="editedRow.article" label="Артикул" outlined
            :rules="[val => !!val || 'Обязательное поле']" />
          <q-input class="q-pb-none" v-model="editedRow.typicalCode" label="Типовой код" outlined />
          <q-input class="q-pb-none" v-model.number="editedRow.quantity" label="Количество" type="number" outlined
            :rules="[val => val > 0 || 'Количество должно быть больше 0']" />
          <q-input class="q-pb-none" v-model.number="editedRow.price" label="Цена" type="number" outlined
            :rules="[val => val >= 0 || 'Цена не может быть отрицательной']" />
          <q-input class="q-pb-md" v-model.number="editedRow.discount" label="Скидка %" type="number" outlined
            :rules="[val => val >= 0 && val <= 100 || 'Скидка должна быть от 0 до 100%']" />
        </div>
      </template>
    </BaseDialog>

    <BaseDialog 
      v-model="showDeleteDialog" 
      title="Удалить позицию" 
      confirm-label="Удалить"
      :is-valid="true"
      @confirm="confirmDeleteRow" 
      @cancel="cancelDeleteRow"
    >
      <template #content>
        <div class="text-h4">
          Вы уверены, что хотите удалить позицию "{{ rowToDelete?.article }}"?
        </div>
        <div class="text-h5 q-mt-sm">
          Эта операция необратима.
        </div>
      </template>
    </BaseDialog>
    <AnimatedInfoCard
      type="info"
      title=""
      message="Точный срок поставки товаров отслеживайте в электронном заказе со статусом «принят в работу» в личном кабинете на платформе driveshub.ru либо уточняйте у логистов ООО «Веда МК»."
      icon="info"
      closable
      animation="slide"
      :auto-close="10000"
      @close="handleAutoClose"

    />
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseDialog from '@/components/utilits/BaseDialog.vue'
import FilterButton from '@/components/utilits/FilterButton.vue'
import Pagination from '@/components/utilits/Pagination.vue'
import NoDataPlaceholder from '@/components/utilits/NoDataPlaceholder.vue'
import OrderItemTableRow from '@/components/orders/detail/OrderItemTableRow.vue'
import OrderItemMobileCard from '@/components/orders/detail/OrderItemMobileCard.vue'
import AnimatedInfoCard from 'components/utilits/AnimatedInfoCard.vue'
import OrderTotalMobileCard from '@/components/orders/detail/OrderTotalMobileCard.vue'

export default {
  name: 'OrderDetail',
  components: {
    BaseDialog,
    FilterButton,
    Pagination,
    NoDataPlaceholder,
    OrderItemTableRow,
    OrderItemMobileCard,
    AnimatedInfoCard,
    OrderTotalMobileCard
  },
  data() {
    return {
      order: null,
      activeTab: 'items',
      showMobileFiltersDialog: false,
      
      // Фильтры и сортировка
      filter: '',
      columnFilters: {
        article: [],
        typicalCode: [],
        quantity: [],
        price: [],
        discount: [],
        discountedPrice: [],
        totalWithVAT: []
      },
      sortOrders: {
        article: null,
        typicalCode: null,
        quantity: null,
        price: null,
        discount: null,
        discountedPrice: null,
        totalWithVAT: null
      },
      currentSortColumn: null,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },

      // Диалоги
      showProjectNameDialog: false,
      editedProjectName: '',
      showAddRowDialog: false,
      showEditRowDialog: false,
      showDeleteDialog: false,
      
      newRow: {
        article: '',
        typicalCode: '',
        quantity: 1,
        price: 0,
        discount: 0
      },
      
      editedRow: {
        id: null,
        article: '',
        typicalCode: '',
        quantity: 1,
        price: 0,
        discount: 0
      },
      
      rowToDelete: null,
      
      columns: [
        {
          name: 'article',
          label: 'Артикул',
          field: 'article',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'typicalCode',
          label: 'Типовой код', 
          field: 'typicalCode',
          align: 'left',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'quantity',
          label: 'Количество',
          field: 'quantity',
          align: 'right',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header', 
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'price',
          label: 'Цена за 1 шт. без НДС, УЕ',
          field: 'price',
          align: 'right',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'discount',
          label: 'Скидка, %',
          field: 'discount',
          align: 'right',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'discountedPrice',
          label: 'Цена со скидкой, 1 шт, без НДС, УЕ',
          field: 'discountedPrice',
          align: 'right',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'totalWithVAT',
          label: 'Сумма со скидкой, с НДС, УЕ',
          field: 'totalWithVAT',
          align: 'right',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'actions',
          label: 'Действия',
          align: 'right',
          sortable: false,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('orders', ['getOrderById']),

    warehouseDS: {
      get() {
        return Boolean(this.order?.warehouseDS)
      },
      set(value) {
        this.updateWarehouseDS(value)
      }
    },

    orderId() {
      return parseInt(this.$route.params.id)
    },
    
    orderItems() {
      return this.order?.items || []
    },

    // Фильтрация и сортировка
    filteredItems() {
      let items = this.orderItems

      // Глобальный поиск
      if (this.filter.trim()) {
        const searchTerm = this.filter.toLowerCase().trim()
        items = items.filter(item => 
          item.article.toLowerCase().includes(searchTerm) ||
          (item.typicalCode && item.typicalCode.toLowerCase().includes(searchTerm))
        )
      }

      // Фильтры по колонкам
      Object.keys(this.columnFilters).forEach(column => {
        const selectedValues = this.columnFilters[column]
        if (selectedValues && selectedValues.length > 0) {
          items = items.filter(item => {
            const cellValue = item[column]
            if (!cellValue) return false
            return selectedValues.includes(cellValue.toString())
          })
        }
      })

      // Сортировка
      if (this.currentSortColumn && this.sortOrders[this.currentSortColumn]) {
        const column = this.currentSortColumn
        const direction = this.sortOrders[column]

        items.sort((a, b) => {
          let aValue = a[column]
          let bValue = b[column]

          if (column === 'quantity' || column === 'price' || column === 'discount' || 
              column === 'discountedPrice' || column === 'totalWithVAT') {
            aValue = Number(aValue) || 0
            bValue = Number(bValue) || 0
          }

          if (direction === 'asc') {
            return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
          } else {
            return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
          }
        })
      }

      return items
    },

    // Пагинированные данные
    paginatedItems() {
      const startIndex = (this.pagination.page - 1) * this.pagination.rowsPerPage
      const endIndex = startIndex + this.pagination.rowsPerPage
      return this.filteredItems.slice(startIndex, endIndex)
    },

    hasActiveFilters() {
      const hasColumnFilters = Object.values(this.columnFilters).some(values => values && values.length > 0)
      const hasSorting = Object.values(this.sortOrders).some(sort => sort !== null)
      return hasColumnFilters || hasSorting || this.filter.trim() !== ''
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
      if (this.filter.trim() !== '') {
        count++
      }
      
      return count
    },

    // Итоговые суммы
    totalAmount() {
    return this.filteredItems.reduce((sum, item) => {
      const price = Number(item.price) || 0
      const quantity = Number(item.quantity) || 0
      return sum + (price * quantity)
    }, 0)
  },
  
  totalDiscountedPrice() {
    return this.filteredItems.reduce((sum, item) => {
      const discountedPrice = Number(item.discountedPrice) || 0
      const quantity = Number(item.quantity) || 0
      return sum + (discountedPrice * quantity)
    }, 0)
  },
  
  totalDiscountedAmountWithVAT() {
  return this.filteredItems.reduce((sum, item) => {
    const price = Number(item.price) || 0
    const discount = Number(item.discount) || 0
    const quantity = Number(item.quantity) || 0
    
    // Всегда считаем от базовой цены со скидкой
    const discountedPrice = price * (1 - discount / 100)
    const totalWithVAT = discountedPrice * quantity * 1.2
    
    console.log('Расчет НДС для item:', { 
      article: item.article, 
      price, discount, quantity, 
      discountedPrice, totalWithVAT 
    })
    
    return sum + totalWithVAT
  }, 0)
},
  
  // Добавь для отладки
  debugInfo() {
    return {
      orderAmount: this.order?.amount,
      calculatedTotal: this.totalAmount,
      itemsCount: this.filteredItems.length,
      firstItem: this.filteredItems[0]
    }
  },
    
    isNewRowValid() {
      return this.newRow.article.trim() !== '' && 
             this.newRow.quantity > 0 && 
             this.newRow.price >= 0 &&
             this.newRow.discount >= 0 && 
             this.newRow.discount <= 100
    },
    
    isEditRowValid() {
      return this.editedRow.article.trim() !== '' && 
             this.editedRow.quantity > 0 && 
             this.editedRow.price >= 0 &&
             this.editedRow.discount >= 0 && 
             this.editedRow.discount <= 100
    }
  },
  methods: {
    ...mapActions('orders', ['updateOrder', 'completeOrder', 'cancelOrder', 'addOrder']),

    // Методы пагинации
    onPageChanged(page) {
      this.pagination.page = page
    },

    onRowsPerPageChanged(rowsPerPage) {
      this.pagination.rowsPerPage = rowsPerPage
      this.pagination.page = 1
    },

    // Методы фильтрации и сортировки
    updateColumnFilters(field, filters) {
      this.columnFilters[field] = filters
      this.pagination.page = 1
    },

    handleSortChanged({ field, direction }) {
      this.setSort(field, direction)
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
        article: [],
        typicalCode: [],
        quantity: [],
        price: [],
        discount: [],
        discountedPrice: [],
        totalWithVAT: []
      }
      this.sortOrders = {
        article: null,
        typicalCode: null,
        quantity: null,
        price: null,
        discount: null,
        discountedPrice: null,
        totalWithVAT: null
      }
      this.currentSortColumn = null
      this.filter = ''
      this.pagination.page = 1
      this.showMobileFiltersDialog = false
    },

    getUniqueValues(field) {
      const items = this.orderItems
      const seen = new Set()
      const values = []

      items.forEach(item => {
        const value = item[field]
        if (value != null && value !== '') {
          const normalizedValue = value.toString().trim()
          if (!seen.has(normalizedValue)) {
            seen.add(normalizedValue)
            values.push(normalizedValue)
          }
        }
      })

      return values.sort()
    },

    getFilterOptions(field) {
      const values = this.getUniqueValues(field)
      return values.map(value => ({
        label: value.toString(),
        value: value
      }))
    },

    isSortableColumn(field) {
      const sortableColumns = ['article', 'typicalCode', 'quantity', 'price', 'discount', 'discountedPrice', 'totalWithVAT']
      return sortableColumns.includes(field)
    },

    // Остальные методы остаются без изменений
    formatCurrency(amount) {
      if (!amount) return '0 ₽'
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2
      }).format(amount)
    },

    // ... остальные методы без изменений
    editProjectName() {
      this.editedProjectName = this.order.projectName || ''
      this.showProjectNameDialog = true
    },

    async updateWarehouseDS(value) {
      try {
        const booleanValue = Boolean(value)
        const updatedOrder = {
          ...this.order,
          warehouseDS: booleanValue
        }
        
        await this.updateOrder(updatedOrder)
        this.order.warehouseDS = booleanValue
        this.showNotification('Настройки склада обновлены', 'positive')
      } catch (error) {
        this.showNotification('Ошибка при обновлении', 'negative')
      }
    },

    async saveProjectName() {
      try {
        await this.updateOrder({
          ...this.order,
          projectName: this.editedProjectName
        })
        this.order.projectName = this.editedProjectName
        this.showProjectNameDialog = false
        this.showNotification('Название проекта обновлено', 'positive')
      } catch (error) {
        this.showNotification('Ошибка при обновлении', 'negative')
      }
    },

    cancelProjectNameEdit() {
      this.showProjectNameDialog = false
      this.editedProjectName = ''
    },

    openAddRowDialog() {
      this.newRow = {
        article: '',
        typicalCode: '',
        quantity: 1,
        price: 0,
        discount: 0
      }
      this.showAddRowDialog = true
    },

    async addNewRow() {
  try {
    const discountedPrice = this.newRow.price * (1 - this.newRow.discount / 100)
    const totalWithVAT = discountedPrice * this.newRow.quantity * 1.2
    
    const newItem = {
      id: Date.now(),
      article: this.newRow.article,
      typicalCode: this.newRow.typicalCode,
      quantity: this.newRow.quantity,
      price: this.newRow.price,
      discount: this.newRow.discount,
      discountedPrice: Math.round(discountedPrice * 100) / 100,
      totalWithVAT: Math.round(totalWithVAT * 100) / 100
    }
    
    const updatedItems = [...this.order.items, newItem]
    
    // ДОБАВЬ ЭТУ СТРОКУ - пересчет общей суммы заказа
    const newTotalAmount = updatedItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    )
    
    const updatedOrder = {
      ...this.order,
      items: updatedItems,
      amount: newTotalAmount // ОБНОВЛЯЕМ ОБЩУЮ СУММУ
    }
    
    await this.updateOrder(updatedOrder)
    this.order = updatedOrder
    this.showAddRowDialog = false
    this.showNotification('Новая позиция добавлена', 'positive')
  } catch (error) {
    this.showNotification('Ошибка при добавлении позиции', 'negative')
  }
},

    cancelAddRow() {
      this.showAddRowDialog = false
    },

    editRow(row) {
      this.editedRow = {
        id: row.id,
        article: row.article,
        typicalCode: row.typicalCode,
        quantity: row.quantity,
        price: row.price,
        discount: row.discount
      }
      this.showEditRowDialog = true
    },

    async saveEditedRow() {
  try {
    const discountedPrice = this.editedRow.price * (1 - this.editedRow.discount / 100)
    const totalWithVAT = discountedPrice * this.editedRow.quantity * 1.2
    
    const updatedItems = this.order.items.map(item => 
      item.id === this.editedRow.id 
        ? {
            ...item,
            article: this.editedRow.article,
            typicalCode: this.editedRow.typicalCode,
            quantity: this.editedRow.quantity,
            price: this.editedRow.price,
            discount: this.editedRow.discount,
            discountedPrice: Math.round(discountedPrice * 100) / 100,
            totalWithVAT: Math.round(totalWithVAT * 100) / 100
          }
        : item
    )
    
    // ДОБАВЬ ЭТУ СТРОКУ - пересчет общей суммы заказа
    const newTotalAmount = updatedItems.reduce((sum, item) => 
      sum + (item.price * item.quantity), 0
    )
    
    const updatedOrder = {
      ...this.order,
      items: updatedItems,
      amount: newTotalAmount // ОБНОВЛЯЕМ ОБЩУЮ СУММУ
    }
    
    await this.updateOrder(updatedOrder)
    this.order = updatedOrder
    this.showEditRowDialog = false
    this.showNotification('Позиция обновлена', 'positive')
  } catch (error) {
    this.showNotification('Ошибка при обновлении позиции', 'negative')
  }
},

    cancelEditRow() {
      this.showEditRowDialog = false
    },

    openDeleteDialog(row) {
      this.rowToDelete = row
      this.showDeleteDialog = true
    },

    async confirmDeleteRow() {
  try {
    if (this.rowToDelete) {
      const updatedItems = this.order.items.filter(item => item.id !== this.rowToDelete.id)
      
      // ДОБАВЬ ЭТУ СТРОКУ - пересчет общей суммы заказа
      const newTotalAmount = updatedItems.reduce((sum, item) => 
        sum + (item.price * item.quantity), 0
      )
      
      const updatedOrder = {
        ...this.order,
        items: updatedItems,
        amount: newTotalAmount // ОБНОВЛЯЕМ ОБЩУЮ СУММУ
      }
      
      await this.updateOrder(updatedOrder)
      this.order = updatedOrder
      this.showDeleteDialog = false
      this.rowToDelete = null
      this.showNotification('Позиция удалена', 'negative')
    }
  } catch (error) {
    this.showNotification('Ошибка при удалении позиции', 'negative')
  }
},

    cancelDeleteRow() {
      this.showDeleteDialog = false
      this.rowToDelete = null
    },

    async updateSpecialConditions() {
      try {
        await this.updateOrder(this.order)
        this.showNotification('Специальные условия обновлены', 'positive')
      } catch (error) {
        this.showNotification('Ошибка при обновлении', 'negative')
      }
    },

    async completeOrderAction() {
      try {
        await this.completeOrder(this.orderId)
        this.order.status = 'completed'
        this.showNotification('Заказ завершен', 'positive')
      } catch (error) {
        this.showNotification('Ошибка при завершении', 'negative')
      }
    },

    async cancelOrderAction() {
      try {
        await this.cancelOrder(this.orderId)
        this.order.status = 'cancelled'
        this.showNotification('Заказ отменен', 'negative')
      } catch (error) {
        this.showNotification('Ошибка при отмене', 'negative')
      }
    },

    async copyOrder() {
      try {
        const orderData = {
          ...this.order,
          items: this.order.items ? [...this.order.items] : []
        }
        delete orderData.id
        orderData.invoiceNumber = `COPY-${orderData.invoiceNumber}`
        orderData.status = 'pending'

        await this.addOrder(orderData)
        this.showNotification('Заказ скопирован', 'positive')
        this.$router.push('/orders')
      } catch (error) {
        this.showNotification('Ошибка при копировании заказа', 'negative')
      }
    },

    showNotification(message, type) {
      if (this.$q && this.$q.notify) {
        this.$q.notify({
          type: type,
          message: message,
          position: 'top'
        })
      }
    },

    loadOrder() {
      const orderId = parseInt(this.$route.params.id)
      const order = this.getOrderById(orderId)
      
      if (order) {
        this.order = { 
          ...order,
          items: order.items || [],
          warehouseDS: Boolean(order.warehouseDS)
        }
      } else {
        this.showNotification('Заказ не найден', 'negative')
        this.$router.push('/orders')
      }
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
  mounted() {
    this.loadOrder()
  },
  watch: {
    '$route.params.id': {
      handler() {
        this.loadOrder()
      },
      immediate: true
    }
  }
}
</script>

<!-- Стили остаются без изменений -->

<style scoped>
.no-scroll-table {
  overflow-x: hidden;
  width: 100%;
}

.no-scroll-table >>> .q-table__container {
  overflow-x: hidden !important;
}

.no-scroll-table >>> .q-table {
  table-layout: fixed;
  width: 100%;
  min-width: 100%;
}

.wrap-content {
  white-space: normal !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
  line-height: 1.3 !important;
  height: auto !important;
  min-height: 60px !important;
  padding: 8px 4px !important;
}

.multi-line-header {
  white-space: normal !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
  line-height: 1.2 !important;
  height: auto !important;
  min-height: 50px !important;
  padding: 6px 3px !important;
}

.no-scroll-table >>> .q-table th:nth-child(1),
.no-scroll-table >>> .q-table td:nth-child(1) { width: 12%; }
.no-scroll-table >>> .q-table th:nth-child(2),
.no-scroll-table >>> .q-table td:nth-child(2) { width: 12%; }
.no-scroll-table >>> .q-table th:nth-child(3),
.no-scroll-table >>> .q-table td:nth-child(3) { width: 8%; }
.no-scroll-table >>> .q-table th:nth-child(4),
.no-scroll-table >>> .q-table td:nth-child(4) { width: 12%; }
.no-scroll-table >>> .q-table th:nth-child(5),
.no-scroll-table >>> .q-table td:nth-child(5) { width: 8%; }
.no-scroll-table >>> .q-table th:nth-child(6),
.no-scroll-table >>> .q-table td:nth-child(6) { width: 14%; }
.no-scroll-table >>> .q-table th:nth-child(7),
.no-scroll-table >>> .q-table td:nth-child(7) { width: 14%; }
.no-scroll-table >>> .q-table th:nth-child(8),
.no-scroll-table >>> .q-table td:nth-child(8) { width: 10%; }

.no-scroll-table >>> ::-webkit-scrollbar {
  display: none;
}

.no-scroll-table {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>