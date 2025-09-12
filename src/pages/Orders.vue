<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section>
        <h2 class="text-h5">Заказы</h2>
        <div class="row q-col-gutter-md">
          <div class="col-md-6">
            <q-card flat>
              <q-card-section>
                <h3 class="text-h6">На складе</h3>
                <q-list dense>
                  <q-item>
                    <q-item-section>Отгружено</q-item-section>
                    <q-item-section side>24</q-item-section>
                  </q-item>
                  <q-item>
                    <q-item-section>Оплачено</q-item-section>
                    <q-item-section side>18</q-item-section>
                  </q-item>
                </q-list>
              </q-card-section>
            </q-card>
          </div>

          <div class="col-md-6">
            <q-card flat>
              <q-card-section>
                <h3 class="text-h6">Контакты</h3>
                <p>Адрес: 115581, Московская обл., г. Истра, д. Лешково, 217</p>
                <p>Телефон: (495) 644-43-32</p>
                <p>Email: info@drives.ru</p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageOrders'
}
</script>
