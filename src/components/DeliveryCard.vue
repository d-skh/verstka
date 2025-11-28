<template>
  <q-card class="delivery-card cursor-pointer" @click="isExpanded = !isExpanded">
    <q-card-section class="q-pa-md">
      
      <!-- === ОСНОВНАЯ ИНФОРМАЦИЯ === -->
      <div class="row items-center justify-between q-mb-md">
        <div class="col-12">
          <!-- Заголовок с иконкой -->
          <div class="row items-center q-mb-md no-wrap">
            <q-icon
              name="keyboard_arrow_down"
              size="sm"
              :class="{ 'rotate-180': isExpanded }"
              class="q-mr-sm flex-shrink"
            />
            <div class="text-h3 text-ellipsis">{{ delivery.title }}</div>
          </div>

          <!-- Основные метрики -->
          <div class="row">
  <div class="col-6 col-sm-3 q-pr-md q-pb-sm">
    <div class="text-h5">
      <q-icon name="fitness_center" class="q-mr-xs" />Вес:
    </div>
    <div class="text-h4">{{ delivery.weight }}</div>
  </div>
  
  <div class="col-6 col-sm-3 q-pr-md q-pb-sm">
    <div class="text-h5">
      <q-icon name="inventory_2" class="q-mr-xs" />Места:
    </div>
    <div class="text-h4">{{ delivery.places }}</div>
  </div>
  
  <div class="col-6 col-sm-3 q-pr-md q-pb-sm">
    <div class="text-h5">
      <q-icon name="assignment" class="q-mr-xs" />Статус:
    </div>
    <div class="text-h4">{{ delivery.dataStatus }}</div>
  </div>
  
  <div class="col-6 col-sm-3 q-pb-sm">
    <div class="text-h5">
      <q-icon name="local_shipping" class="q-mr-xs" />Перевозчик:
    </div>
    <div class="text-h4">{{ delivery.carrier }}</div>
  </div>
</div>
        </div>
      </div>

      <!-- === РАСКРЫВАЕМАЯ ЧАСТЬ === -->
      <transition
        name="expand"
        @enter="enter"
        @after-enter="afterEnter"
        @leave="leave"
      >
        <div v-show="isExpanded">
          
          <q-separator class="q-my-md" />

<!-- === ДЕТАЛИ ЗАКАЗА === -->
<div v-if="delivery.orderDetails" class="q-mb-md">
  <div class="row items-center q-gutter-x-md lt-sm-column">
    <div 
      class="q-pr-md lt-sm-q-pa-none q-pb-md"
      :class="$q.screen.lt.sm ? '' : 'border-right'"
    >
      <div class="text-h5">Заказ:</div>
      <div class="text-h4">{{ delivery.orderDetails.number }}</div>
    </div>
    <div 
      class="q-pr-md lt-sm-q-pa-none q-pb-md"
      :class="$q.screen.lt.sm ? '' : 'border-right'"
    >
      <div class="text-h5">Накладная:</div>
      <div class="text-h4">{{ delivery.orderDetails.invoice }}</div>
    </div>
    <div class="lt-sm-q-pa-none q-pb-md">
      <div class="text-h5">Ссылочный номер:</div>
      <div class="text-h4">{{ delivery.orderDetails.reference }}</div>
    </div>
  </div>
</div>

<q-separator class="q-my-md" />

          <!-- === СПИСОК ТОВАРОВ === -->
          <div v-if="delivery.items && delivery.items.length" class="q-mb-sm">
            
            <!-- Список товаров - артикул и описание вместе -->
            <div class="q-list">
              <div 
                v-for="(item, index) in delivery.items"
                :key="index"
                class="q-mb-xs"
              >
                <!-- Артикул и количество в одной строке -->
                <div class="row items-center justify-between q-mb-xs">
                  <div class="text-h4 text-weight-medium">{{ item.article }}</div>
                  <div class="text-h4 text-weight-bold">{{ item.quantity }} шт</div>
                </div>
                
                <!-- Описание товара -->
                <div class="text-h5">{{ item.description }}</div>
                
                <!-- Разделитель между товарами -->
                <q-separator v-if="index < delivery.items.length - 1" class="q-mt-xs" />
              </div>
            </div>

            <!-- Итоговая сумма -->
            <div class="text-right q-mt-md">
              <div class="text-h4 text-weight-bold">Итого: {{ delivery.totalItems }} шт</div>
            </div>
          </div>

        </div>
      </transition>

    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'DeliveryCard',

  props: {
    delivery: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      isExpanded: false
    }
  },

  methods: {
    enter(el) {
      el.style.height = 'auto';
      const height = getComputedStyle(el).height;
      el.style.height = '0';
      el.offsetHeight;
      el.style.height = height;
    },

    afterEnter(el) {
      el.style.height = 'auto';
    },

    leave(el) {
      el.style.height = getComputedStyle(el).height;
      el.offsetHeight;
      el.style.height = '0';
    }
  }
}
</script>