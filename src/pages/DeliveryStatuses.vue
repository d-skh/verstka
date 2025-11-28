<template>
  <q-page class="">
    <q-breadcrumbs class="q-mb-md relative-position text-h4">
      <q-breadcrumbs-el
        icon="home"
        label="Главная"
        to="/"
        class="cursor-pointer text-secondary"
      />
      <q-breadcrumbs-el
        icon="local_shipping"
        label="Статусы отгрузок"
        class="text-dark text-weight-bold"
      />
    </q-breadcrumbs>

    <div class="row no-wrap justify-between items-center q-mb-lg">
      <div class="text-h1">
        <q-icon name="local_shipping" size="30px" color="dark" />
        Статусы отгрузок
      </div>
    </div>

    <div class="q-mb-lg">
      <q-tabs
        v-model="activeTab"
        inline-label
        class="glass-horizontal-tabs text-h2"
        active-color="accent"
        indicator-color="accent"
      >
        <q-tab
          v-for="tab in statusTabs"
          :key="tab.value"
          :name="tab.value"
          class="glass-horizontal-tab"
          :ripple="false"
        >
          <div class="tabs-content">
            <q-icon
              :name="tab.icon"
              class="tab-icon"
              :size="$q.screen.lt.sm ? 'md' : 'sm'"
            />
            <div class="tab-label gt-xs">{{ tab.label }}</div>
          </div>
        </q-tab>
      </q-tabs>
    </div>

    <div class="q-mb-lg">
      <div class="text-h2 q-mb-md">Итого {{ currentTabLabel }}</div>

      <div class="row q-col-gutter-md stats-cards">
        <div class="col-12 col-md-6">
          <q-card
            class="highlight-left animate-card"
            :key="`delivery-${activeTab}`"
          >
            <q-card-section class="stats-card-section">
              <div class="row items-center text-h2 q-pb-md">
                <q-icon size="sm" name="local_shipping" class="q-mr-sm" />
                <div>Доставка</div>
              </div>
              <div class="row items-center">
                <div class="col-12 col-md-4 q-pb-sm">
                  <div class="text-h5">Количество грузов</div>
                  <div class="text-h4">{{ deliveryStats.cargoCount }}</div>
                </div>
                <div class="col-12 col-md-4 q-pb-sm">
                  <div class="text-h5">Количество мест</div>
                  <div class="text-h4">{{ deliveryStats.placeCount }}</div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="text-h5">Общий вес</div>
                  <div class="text-h4">{{ deliveryStats.totalWeight }} кг</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card
            class="highlight-left animate-card"
            :key="`delivery-${activeTab}`"
          >
            <q-card-section>
              <div class="row items-center text-h2 q-pb-md">
                <q-icon size="sm" name="store" class="q-mr-sm" />
                <div>Самовывоз</div>
              </div>

              <div class="row items-center">
                <div class="col-12 col-md-4 q-pb-sm">
                  <div class="text-h5">Количество грузов</div>
                  <div class="text-h4">{{ pickupStats.cargoCount }}</div>
                </div>
                <div class="col-12 col-md-4 q-pb-sm">
                  <div class="text-h5">Количество мест</div>
                  <div class="text-h4">{{ pickupStats.placeCount }}</div>
                </div>
                <div class="col-12 col-md-4">
                  <div class="text-h5">Общий вес</div>
                  <div class="text-h4">{{ pickupStats.totalWeight }} кг</div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="row q-mb-lg q-col-gutter-md">
      <div class="col-12 col-md-3">
        <q-input v-model="filters.inn" label="ИНН" outlined dense>
          <template v-slot:append>
            <FilterButton
              column-label="ИНН"
              column-field="inn"
              :is-sortable="false"
              :filter-options="innOptions"
              :selected-filters="filters.innList"
              @filters-changed="onInnFiltersChanged"
            />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-3">
        <q-input
          v-model="filters.transportCompany"
          label="Транспортная компания"
          outlined
          dense
        >
          <template v-slot:append>
            <FilterButton
              column-label="Транспортная компания"
              column-field="transportCompany"
              :is-sortable="false"
              :filter-options="transportOptions"
              :selected-filters="filters.transportList"
              @filters-changed="onTransportFiltersChanged"
            />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-3">
        <q-input v-model="filters.order" label="Заказ" outlined dense>
          <template v-slot:append>
            <FilterButton
              column-label="Заказ"
              column-field="order"
              :is-sortable="false"
              :filter-options="orderOptions"
              :selected-filters="filters.orderList"
              @filters-changed="onOrderFiltersChanged"
            />
          </template>
        </q-input>
      </div>

      <div class="col-12 col-md-3">
        <q-input
          v-model="filters.date"
          label="Календарь отгрузок"
          outlined
          dense
          readonly
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy
                cover
                transition-show="scale"
                transition-hide="scale"
              >
                <q-date v-model="filters.date" minimal />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <q-tab-panels v-model="activeTab" animated class="tab-panel">
      <q-tab-panel
        v-for="tab in statusTabs"
        :key="tab.value"
        :name="tab.value"
        class="q-pa-none"
      >
        <div v-if="filteredDeliveries.length > 0">
          <DeliveryCard
            v-for="delivery in filteredDeliveries"
            :key="delivery.id"
            :delivery="delivery"
            class="q-mb-md animate1 delay-3 duration-fast"
          />
        </div>

        <div v-else>
          <NoDataPlaceholder :has-active-filters="hasActiveFilters" />
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FilterButton from "@/components/utilits/FilterButton.vue";
import DeliveryCard from "@/components/DeliveryCard.vue";
import NoDataPlaceholder from "@/components/utilits/NoDataPlaceholder.vue";

export default {
  name: "DeliveryStatuses",
  components: {
    FilterButton,
    DeliveryCard,
    NoDataPlaceholder,
  },

  data() {
    return {
      activeTab: "transit",
      statusTabs: [
        {
          label: "На складе",
          value: "warehouse",
          icon: "inventory_2",
        },
        {
          label: "В пути",
          value: "transit",
          icon: "local_shipping",
        },
        {
          label: "Доставлено",
          value: "delivered",
          icon: "check_circle",
        },
      ],
      filters: {
        inn: "",
        innList: [],
        transportCompany: "",
        transportList: [],
        order: "",
        orderList: [],
        date: new Date().toISOString().substr(0, 10),
      },
      innOptions: [
        { label: "7705238125", value: "7705238125" },
        { label: "7705238126", value: "7705238126" },
      ],
      transportOptions: [
        { label: "Ведущее значение", value: "leading" },
        { label: "ПЭК", value: "pek" },
        { label: "СДЭК", value: "sdek" },
      ],
      orderOptions: [
        { label: "V024-008201", value: "V024-008201" },
        { label: "V024-008202", value: "V024-008202" },
      ],
    };
  },

  computed: {
    ...mapGetters("delivery", {
      deliveries: "getDeliveries",
    }),

    currentTabLabel() {
      const tab = this.statusTabs.find((t) => t.value === this.activeTab);
      return tab ? tab.label.toLowerCase() : "";
    },

    filteredDeliveries() {
      return this.deliveries.filter(
        (delivery) => delivery.status === this.activeTab
      );
    },

    deliveryStats() {
      const deliveryItems = this.filteredDeliveries.filter(
        (d) => d.type === "delivery"
      );
      return this.calculateStats(deliveryItems);
    },

    pickupStats() {
      const pickupItems = this.filteredDeliveries.filter(
        (d) => d.type === "pickup"
      );
      return this.calculateStats(pickupItems);
    },

    hasActiveFilters() {
      return (
        this.filters.innList.length > 0 ||
        this.filters.transportList.length > 0 ||
        this.filters.orderList.length > 0 ||
        this.filters.date !== new Date().toISOString().substr(0, 10)
      );
    },
  },

  methods: {
    ...mapActions("delivery", ["loadDeliveries"]),

    calculateStats(items) {
      return {
        cargoCount: items.length,
        placeCount: items.reduce((sum, item) => sum + item.placesCount, 0),
        totalWeight: items
          .reduce((sum, item) => sum + item.totalWeight, 0)
          .toFixed(1),
      };
    },

    onInnFiltersChanged(filters) {
      this.filters.innList = filters;
    },

    onTransportFiltersChanged(filters) {
      this.filters.transportList = filters;
    },

    onOrderFiltersChanged(filters) {
      this.filters.orderList = filters;
    },
  },

  mounted() {
    this.loadDeliveries();
  },
};
</script>
