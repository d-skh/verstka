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
    class="text-dark text-weight-bold" 
  />
</q-breadcrumbs>

    <!-- Заголовок и кнопки -->
    <div class="row items-center q-mb-lg">
      <div class="text-h1 col">
        <q-icon name="shop" size="30px" color="dark"/>
        Мои заказы
      </div>
      <div class="col-auto">
        <q-btn size="md" color="primary" label="Новый заказ" icon="add" text-color="dark" padding="8px 12px" @click="openCreateDialog"/>


      </div>
    </div>

    <!-- Таблица заказов -->
    <q-card>
      <q-card-section class="q-pa-sm">
        <q-table
          :data="filteredOrders"
          :columns="columns"
          row-key="id"
          :filter="filter"
          :pagination.sync="pagination"
          :rows-per-page-options="rowsPerPageOptions"
          :loading="loading"
          hide-pagination
          flat
          class="no-scroll-table"
        >
          <!-- Слот для поиска -->
          <template v-slot:top>
            <div class="row items-center full-width">
              <div class="col-auto">
                <q-input
                  v-model="filter"
                  placeholder="Поиск по номеру или названию..."
                  dense
                  clearable
                  class="q-mr-md"
                  style="min-width: 300px;"
                >
                  <template v-slot:append>
                    <q-icon name="search" />
                  </template>
                </q-input>
              </div>
              
              <div class="col-auto">
                <q-select
                  v-model="statusFilter"
                  :options="statusOptions"
                  label="Статус"
                  dense
                  clearable
                  style="min-width: 200px;"
                />
              </div>
            </div>
          </template>

          <!-- Тело таблицы -->
          <template v-slot:body="props">
            <q-tr :props="props" class="cursor-pointer" @click="viewOrder(props.row)">
              <q-td class="text-h5 wrap-content">
                <div class="column">
                  <div class="text-weight-bold">{{ props.row.invoiceNumber }}</div>
                  <div class="text-grey-7">{{ props.row.projectName || 'Без названия' }}</div>
                </div>
              </q-td>
              <q-td class="text-h5 wrap-content">
                {{ formatCurrency(props.row.amount) }}
              </q-td>
              <q-td class="text-h4 wrap-content">
                <q-badge 
                  outline
                  :color="getStatusColor(props.row.status)" 
                  :label="getStatusText(props.row.status)"
                  style="padding: 4px 16px;"
                  class="text-white text-h4"
                />
              </q-td>
              <q-td class="text-h5 wrap-content">
                {{ props.row.manager || 'Не назначен' }}
              </q-td>
              <q-td class="text-h5 wrap-content">
                {{ formatDate(props.row.createdAt) }}
              </q-td>
              <q-td class="text-right">
                <q-btn 
                  icon="visibility" 
                  flat 
                  round 
                  dense 
                  @click.stop="viewOrder(props.row)"
                >
                  <q-tooltip>Просмотреть</q-tooltip>
                </q-btn>
                <q-btn 
                  icon="content_copy" 
                  flat 
                  round 
                  dense 
                  @click.stop="copyOrder(props.row)"
                  class="q-ml-sm"
                >
                  <q-tooltip>Копировать</q-tooltip>
                </q-btn>
              </q-td>
            </q-tr>
          </template>

          <!-- Сообщение когда нет данных -->
          <template v-slot:no-data>
            <div class="full-width row flex-center text-h4 text-grey q-pa-xl">
              <q-icon name="inbox" size="3em" class="q-mr-sm" />
              {{ filter ? 'Заказы не найдены' : 'Нет заказов' }}
            </div>
          </template>

          <!-- Кастомная пагинация -->
          <template v-slot:bottom>
            <div class="row items-center justify-between full-width q-pa-md" v-if="filteredOrders.length > 0">
              <div class="text-h5">
                Всего записей: {{ filteredOrders.length }}
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
                  Страница {{ pagination.page }} из {{ Math.ceil(filteredOrders.length / pagination.rowsPerPage) }}
                </span>
                
                <q-btn 
                  icon="chevron_right" 
                  flat 
                  round 
                  dense
                  :disable="pagination.page >= Math.ceil(filteredOrders.length / pagination.rowsPerPage)"
                  @click="pagination.page++"
                />
                <q-btn 
                  icon="last_page" 
                  flat 
                  round 
                  dense
                  :disable="pagination.page >= Math.ceil(filteredOrders.length / pagination.rowsPerPage)"
                  @click="pagination.page = Math.ceil(filteredOrders.length / pagination.rowsPerPage)"
                />
              </div>
              
              <q-select
                v-model="pagination.rowsPerPage"
                :options="rowsPerPageOptions"
                label="Строк:"
                class="text-h4"
                color="secondary"
                dense
                borderless
                style="min-width: 120px;"
                @update:model-value="pagination.page = 1"
              />
            </div>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <BaseDialog 
  v-model="showCreateDialog" 
  title="Новый заказ" 
  :is-valid="isNewOrderValid"
  @confirm="createNewOrder" 
  @cancel="cancelCreateOrder"
>
  <template #content>
    <q-form class="q-gutter-md">
      <q-input
        v-model="newOrder.invoiceNumber"
        class="q-pb-none q-pt-md"
        label="Номер счета *"
        required
        outlined
        :rules="[val => !!val || 'Обязательное поле']"
      />
      
      <q-input
        v-model="newOrder.creator"
        class="q-pb-none"
        label="Создатель *"
        required
        outlined
        :rules="[val => !!val || 'Обязательное поле']"
      />
      
      <q-input
        class="q-pb-none"
        v-model="newOrder.company"
        label="Компания *"
        required
        outlined
        :rules="[val => !!val || 'Обязательное поле']"
      />
      
      <q-input
        class="q-pb-none"
        v-model="newOrder.projectName"
        label="Название проекта"
        outlined
      />
      
      <q-input
        class="q-pb-none"
        v-model="newOrder.date"
        label="Дата *"
        type="date"
        required
        outlined
        :rules="[val => !!val || 'Обязательное поле']"
      />
      
      
      <q-input
        class="q-pb-none"
        v-model="newOrder.description"
        label="Описание"
        type="textarea"
        outlined
        rows="3"
      />

      <q-checkbox 
        v-model="newOrder.warehouseDS" 
        label="Склад DS" 
        class="text-h4"
      />
    </q-form>
  </template>
</BaseDialog>
    <!-- Диалог создания нового заказа -->
    
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BaseDialog from '@/components/utilits/BaseDialog.vue'

export default {
  name: 'OrdersList',
  components: {
    BaseDialog
  },
  data() {
    return {
      loading: false,
      filter: '',
      statusFilter: null,
      pagination: {
        page: 1,
        rowsPerPage: 10
      },
      rowsPerPageOptions: [5, 10, 25, 50],
      showCreateDialog: false,
      newOrder: {
      invoiceNumber: '',
      creator: '',
      company: '',
      projectName: '',
      date: '',
      amount: 0,
      description: '',
      warehouseDS: false,
      manager: '', // оставляем для совместимости
      paymentTerms: '' // оставляем для совместимости
    },
      
      columns: [
        {
          name: 'orderInfo',
          label: 'Заказ',
          field: 'invoiceNumber',
          align: 'left',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'amount',
          label: 'Сумма',
          field: 'amount',
          align: 'left',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'status',
          label: 'Статус',
          field: 'status',
          align: 'left',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'manager',
          label: 'Менеджер',
          field: 'manager',
          align: 'left',
          sortable: true,
          headerClasses: 'text-h3 multi-line-header',
          classes: 'text-h5 wrap-content'
        },
        {
          name: 'createdAt',
          label: 'Дата создания',
          field: 'createdAt',
          align: 'left',
          sortable: true,
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
      ],

      statusOptions: [
        { label: 'В работе', value: 'pending' },
        { label: 'Завершен', value: 'completed' },
        { label: 'Отменен', value: 'cancelled' }
      ]
    }
  },
  computed: {
    ...mapGetters('orders', ['getAllOrders']),
    
    filteredOrders() {
      let orders = this.getAllOrders || []
      
      // Фильтр по поиску
      if (this.filter) {
        const searchTerm = this.filter.toLowerCase()
        orders = orders.filter(order => 
          order.invoiceNumber?.toLowerCase().includes(searchTerm) ||
          order.projectName?.toLowerCase().includes(searchTerm)
        )
      }
      
      // Фильтр по статусу
      if (this.statusFilter) {
        orders = orders.filter(order => order.status === this.statusFilter.value)
      }
      
      return orders
    },

    isNewOrderValid() {
    return this.newOrder.invoiceNumber.trim() !== '' && 
           this.newOrder.creator.trim() !== '' && 
           this.newOrder.company.trim() !== '' && 
           this.newOrder.date.trim() !== '' && 
           this.newOrder.amount > 0
  }
  },
  methods: {
    ...mapActions('orders', ['fetchOrders', 'addOrder']),

    formatCurrency(amount) {
      if (!amount) return '0 ₽'
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 2
      }).format(amount)
    },

    formatDate(date) {
      if (!date) return ''
      return new Date(date).toLocaleDateString('ru-RU')
    },

    getStatusColor(status) {
      const colors = {
        pending: 'blue',
        completed: 'green',
        cancelled: 'red'
      }
      return colors[status] || 'grey'
    },

    getStatusText(status) {
      const texts = {
        pending: 'В работе',
        completed: 'Завершен',
        cancelled: 'Отменен'
      }
      return texts[status] || 'Неизвестно'
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
        orderData.status = 'pending'
        orderData.createdAt = new Date().toISOString()

        await this.addOrder(orderData)
        this.showNotification('Заказ скопирован', 'positive')
      } catch (error) {
        this.showNotification('Ошибка при копировании заказа', 'negative')
      }
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
      manager: '',
      paymentTerms: ''
    }
    this.showCreateDialog = true
  },

    async createNewOrder() {
      try {
        const orderData = {
          ...this.newOrder,
          status: 'pending',
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
      manager: '',
      paymentTerms: ''
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

/* Ширина колонок */
.no-scroll-table >>> .q-table th:nth-child(1),
.no-scroll-table >>> .q-table td:nth-child(1) { width: 25%; }
.no-scroll-table >>> .q-table th:nth-child(2),
.no-scroll-table >>> .q-table td:nth-child(2) { width: 15%; }
.no-scroll-table >>> .q-table th:nth-child(3),
.no-scroll-table >>> .q-table td:nth-child(3) { width: 15%; }
.no-scroll-table >>> .q-table th:nth-child(4),
.no-scroll-table >>> .q-table td:nth-child(4) { width: 20%; }
.no-scroll-table >>> .q-table th:nth-child(5),
.no-scroll-table >>> .q-table td:nth-child(5) { width: 15%; }
.no-scroll-table >>> .q-table th:nth-child(6),
.no-scroll-table >>> .q-table td:nth-child(6) { width: 10%; }

.no-scroll-table >>> ::-webkit-scrollbar {
  display: none;
}

.no-scroll-table {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

/* Стили для пагинации */
.no-scroll-table >>> .q-table__bottom {
  border-top: 1px solid rgba(0,0,0,0.12);
  padding: 8px 0;
}
</style>