<template>
  <q-page>
    <!-- Хлебные крошки -->
    
    <q-breadcrumbs class="q-mb-md relative-position z-max text-h4">
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
      <!-- Основная информация -->
      <div class="row items-center q-mb-lg">
        <div class="col">
          <div class="text-h1">{{ order.projectName || `Заказ ${order.invoiceNumber}` }}</div>
        </div>
      </div>

      <!-- Первая строка: Сумма и условия оплаты -->
      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-4">
          <div class="text-h5">Общая сумма</div>
          <div class="text-h4">{{ formatCurrency(order.amount) }}</div>
        </div>
        <div class="col-4">
          <div class="text-h5">Условия оплаты</div>
          <div class="text-h4">{{ order.paymentTerms || 'Не указано' }}</div>
        </div>
      </div>

      <div class="row q-col-gutter-md q-mb-lg">
        <div class="col-4">
          <div class="text-h5">Ответственный менеджер</div>
          <div class="text-h4">{{ order.manager || 'Не назначен' }}</div>
        </div>
        <div class="col-4">
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
            <q-table
              :data="orderItems"
              :columns="columns"
              row-key="id"
              :filter="filter"
              :pagination.sync="pagination"
              flat
              class="no-scroll-table"
            >
              <div slot="top" slot-scope="props" class="row items-center full-width">
                <div class="col-auto">
                  <q-input
                    v-model="filter"
                    placeholder="Поиск..."
                    dense
                    clearable
                    class="q-mr-md"
                  >
                    <div slot="append">
                      <q-icon name="search" />
                    </div>
                  </q-input>
                </div>
              </div>

              <q-tr slot="body" slot-scope="props" :props="props">
                <q-td class="text-h5 wrap-content">{{ props.row.article }}</q-td>
                <q-td class="text-h5 wrap-content">{{ props.row.typicalCode }}</q-td>
                <q-td class="text-right text-h5 wrap-content">{{ props.row.quantity }}</q-td>
                <q-td class="text-right text-h5 wrap-content">{{ formatCurrency(props.row.price) }}</q-td>
                <q-td class="text-right text-h5 wrap-content">{{ props.row.discount }}%</q-td>
                <q-td class="text-right text-h5 wrap-content">{{ formatCurrency(props.row.discountedPrice) }}</q-td>
                <q-td class="text-right text-h5 wrap-content">{{ formatCurrency(props.row.totalWithVAT) }}</q-td>
                <q-td class="text-right wrap-content">
                  <q-btn icon="edit" flat dense @click="editRow(props.row)" />
                  <q-btn icon="delete" flat dense @click="openDeleteDialog(props.row)" class="q-ml-sm" />
                </q-td>
              </q-tr>

              <q-tr slot="bottom-row">
                <q-td colspan="8" class="text-left">
                  <q-btn outline label="Добавить строку" icon="add" text-color="secondary" padding="6px 24px" @click="openAddRowDialog"/>
                </q-td>
              </q-tr>

              <q-tr v-if="orderItems.length > 0" slot="bottom-row" class="text-right text-h3 text-dark">
                <q-td colspan="3">Итого:</q-td>
                <q-td>{{ formatCurrency(totalAmount) }}</q-td>
                <q-td></q-td>
                <q-td>{{ formatCurrency(totalDiscountedPrice) }}</q-td>
                <q-td>{{ formatCurrency(totalDiscountedAmountWithVAT) }}</q-td>
                <q-td></q-td>
              </q-tr>
              <template v-slot:no-data>
    <div class="full-width row flex-center text-h4 q-pa-lg">
      <q-icon name="search_off" size="2em" class="q-mr-sm" />
      Данные не найдены
    </div>
  </template>
    <template v-slot:bottom>
    <div class="row items-center justify-between full-width q-pa-md" v-if="orderItems.length > 0">
      <div class="text-h5">
        Всего записей: {{ orderItems.length }}
      </div>
      
      <div class="row items-center">
        <q-btn 
          icon="first_page" 
          flat 
          round 
          dense
          :disable="pagination.page === 1"
          @click="pagination.page = 1"
        />
        <q-btn 
          icon="chevron_left" 
          flat 
          round 
          dense
          :disable="pagination.page === 1"
          @click="pagination.page--"
        />
        
        <span class="q-mx-md text-h5">
          Страница {{ pagination.page }} из {{ Math.ceil(orderItems.length / pagination.rowsPerPage) }}
        </span>
        
        <q-btn 
          icon="chevron_right" 
          flat 
          round 
          dense
          :disable="pagination.page >= Math.ceil(orderItems.length / pagination.rowsPerPage)"
          @click="pagination.page++"
        />
        <q-btn 
          icon="last_page" 
          flat 
          round 
          dense
          :disable="pagination.page >= Math.ceil(orderItems.length / pagination.rowsPerPage)"
          @click="pagination.page = Math.ceil(orderItems.length / pagination.rowsPerPage)"
        />
      </div>
      
      <q-select
        v-model="pagination.rowsPerPage"
        :options="[5, 10, 25, 50]"
        label="Строк:"
        dense
        borderless
        style="min-width: 120px;"
        @update:model-value="pagination.page = 1"
      />
    </div>
  </template>
            </q-table>
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
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseDialog from '@/components/utilits/BaseDialog.vue'
import { QTable, QTd, QTr, QTh, QInput, QBtn, QIcon } from 'quasar'

export default {
  name: 'OrderDetail',
  components: {
    QTable,
    QTd,
    QTr,
    QTh,
    QInput,
    QBtn,
    QIcon,
    BaseDialog
  },
  data() {
    return {
      order: null,
      activeTab: 'items',
      showProjectNameDialog: false,
      editedProjectName: '',
      filter: '',
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      
      // Переименованы переменные диалогов
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
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'typicalCode',
          label: 'Типовой код', 
          field: 'typicalCode',
          align: 'left',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'quantity',
          label: 'Количество',
          field: 'quantity',
          align: 'right',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header', 
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'price',
          label: 'Цена за 1 шт. без НДС, УЕ',
          field: 'price',
          align: 'right',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'discount',
          label: 'Скидка, %',
          field: 'discount',
          align: 'right',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'discountedPrice',
          label: 'Цена со скидкой, 1 шт, без НДС, УЕ',
          field: 'discountedPrice',
          align: 'right',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'totalWithVAT',
          label: 'Сумма со скидкой, с НДС, УЕ',
          field: 'totalWithVAT',
          align: 'right',
          sortable: true,
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
    totalAmount() {
      return this.orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    },
    totalDiscountedPrice() {
      return this.orderItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0)
    },
    totalDiscountedAmountWithVAT() {
      return this.orderItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity * 1.2), 0)
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

    formatCurrency(amount) {
      if (!amount) return '0 ₽'
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2
      }).format(amount)
    },

    // Методы для работы с проектом
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
    
    // Обновляем локальный order
    this.order.warehouseDS = booleanValue
    
    this.showNotification('Настройки склада обновлены', 'positive')
  } catch (error) {
    console.error('Error updating warehouse:', error)
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

    // Методы для работы со строками таблицы (переименованы)
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
        
        const updatedOrder = {
          ...this.order,
          items: [...this.order.items, newItem]
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
        
        const updatedOrder = {
          ...this.order,
          items: updatedItems
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
          
          const updatedOrder = {
            ...this.order,
            items: updatedItems
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