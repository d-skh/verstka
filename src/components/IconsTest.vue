<template>
  <div>
    <q-page-header>
      <q-toolbar-title>Иконки</q-toolbar-title>
    </q-page-header>
    <div class="q-gutter-md q-mt-md">
      <q-card>
        <q-card-section>
          <div class="text-h6">Outlined</div>
          <span class="material-symbols-outlined" style="font-size: 48px;">switch</span>
          <span class="material-symbols-outlined" style="font-size: 48px;">edit</span>
          <span class="material-symbols-outlined" style="font-size: 48px;">view_module</span>
          <span class="material-symbols-outlined" style="font-size: 48px;">chat</span>
          <span class="material-symbols-outlined" style="font-size: 48px;">smart_button</span>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6">Размеры</div>
          <span class="material-symbols-outlined" style="font-size: 24px;">switch</span>
          <span class="material-symbols-outlined" style="font-size: 36px;">switch</span>
          <span class="material-symbols-outlined" style="font-size: 60px;">switch</span>
        </q-card-section>
      </q-card>
      <q-card>
        <q-card-section>
          <div class="text-h6">Любая другая иконка</div>
          <q-input v-model="iconName" label="Название иконки" filled class="q-mb-md" />
          <span class="material-symbols-outlined" style="font-size: 48px;">{{ iconName }}</span>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IconsTest',
  data() {
    return {
      iconName: 'switch'
    }
  }
}
</script> 