<template>
  <div>
    <q-page-header>
      <q-toolbar-title>Основная палитра</q-toolbar-title>
    </q-page-header>
    <div class="q-gutter-md q-mt-md">
      <div v-for="section in colorSections" :key="section.title" class="q-mb-xl">
        <q-card flat bordered>
          <q-card-section class="bg-grey-2">
            <div class="text-h6 text-center">{{ section.title }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section class="q-pa-none color-section-cards">
            <div class="row q-col-gutter-md justify-center">
              <div
                v-for="color in section.colors"
                :key="color.label"
                class="col-12 col-sm-6 col-md-3 flex flex-center"
              >
                <div class="color-card flex flex-center column" :style="{ background: color.hex, color: color.text || '#212529' }">
                  <div class="color-name text-bold q-mb-xs">
                    {{ color.label }}
                  </div>
                  <div class="color-hex text-caption q-mb-xs">
                    {{ color.hex }}
                  </div>
                  <div class="color-var text-caption" v-if="color.var">
                    {{ color.var }}
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Colors',
  data() {
    return {
      colorSections: [
        {
          title: 'Базовые цвета',
          colors: [
            { label: 'Accent', hex: '#C9060A', var: 'accent', text: '#fff' },
            { label: 'Dark', hex: '#212529', var: 'dark', text: '#fff' },
            { label: 'Light', hex: '#FFFFFF', var: 'light', text: '#212529' }
          ]
        },
        {
          title: 'Фон',
          colors: [
            { label: 'Light', hex: '#FFFFFF', var: 'background-light', text: '#212529' },
            { label: 'Neutral', hex: '#EEF0F4', var: 'background-neutral', text: '#212529' }
          ]
        },
        {
          title: 'Обводка',
          colors: [
            { label: 'Divider Light', hex: '#DEE2E6', var: 'divider-light', text: '#212529' },
            { label: 'Divider Dark', hex: '#C3CAD0', var: 'divider-dark', text: '#212529' }
          ]
        },
        {
          title: 'Текст',
          colors: [
            { label: 'Main', hex: '#212529', var: 'text-main', text: '#fff' },
            { label: 'Secondary', hex: '#6C757D', var: 'text-secondary', text: '#fff' },
            { label: 'Tertiary', hex: '#ADB5BD', var: 'text-tertiary', text: '#212529' },
            { label: 'Link', hex: '#C9060A', var: 'text-link', text: '#fff' },
            { label: 'White', hex: '#FFFFFF', var: 'text-white', text: '#212529' }
          ]
        },
        {
          title: 'Состояния — Success',
          colors: [
            { label: 'Dark', hex: '#115D23', var: 'success-dark', text: '#fff' },
            { label: 'Base', hex: '#21BA45', var: 'success-base', text: '#fff' },
            { label: 'Light', hex: '#E9F8EC', var: 'success-light', text: '#212529' }
          ]
        },
        {
          title: 'Состояния — Error',
          colors: [
            { label: 'Dark', hex: '#70000C', var: 'error-dark', text: '#fff' },
            { label: 'Base', hex: '#BB0014', var: 'error-base', text: '#fff' },
            { label: 'Light', hex: '#F8E5E7', var: 'error-light', text: '#212529' }
          ]
        },
        {
          title: 'Состояния — Warning',
          colors: [
            { label: 'Dark', hex: '#917321', var: 'warning-dark', text: '#fff' },
            { label: 'Base', hex: '#F2C037', var: 'warning-base', text: '#212529' },
            { label: 'Light', hex: '#FCF3DB', var: 'warning-light', text: '#212529' }
          ]
        },
        {
          title: 'Состояния — Info',
          colors: [
            { label: 'Dark', hex: '#1D7A8E', var: 'info-dark', text: '#fff' },
            { label: 'Base', hex: '#31CCEC', var: 'info-base', text: '#212529' },
            { label: 'Light', hex: '#DEF7FC', var: 'info-light', text: '#212529' }
          ]
        },
        {
          title: 'Цвета элементов — Таблицы',
          colors: [
            { label: 'Divider Light', hex: '#DEE2E6', var: 'table-divider-light', text: '#212529' },
            { label: 'Divider Darker', hex: '#CED4DA', var: 'table-divider-darker', text: '#212529' },
            { label: 'Fill Row (default)', hex: '#F7F7F7', var: 'table-fill-row', text: '#212529' },
            { label: 'Fill Row (hover)', hex: '#EBEBEB', var: 'table-fill-row-hover', text: '#212529' }
          ]
        },
        {
          title: 'Цвета элементов — Кнопки',
          colors: [
            { label: 'Primary And Outline (Default)', hex: '#C9060A', var: 'btn-primary', text: '#fff' },
            { label: 'Primary And Outline (Hover)', hex: '#B50509', var: 'btn-primary-hover', text: '#fff' },
            { label: 'Secondary Fill Default', hex: '#DDE2E6', var: 'btn-secondary-fill', text: '#212529' },
            { label: 'Secondary Fill (Hover)', hex: '#D2D6DA', var: 'btn-secondary-fill-hover', text: '#212529' },
            { label: 'Secondary Outline (Default)', hex: '#6C757D', var: 'btn-secondary-outline', text: '#fff' },
            { label: 'Secondary Outline (Hover)', hex: '#4C5258', var: 'btn-secondary-outline-hover', text: '#fff' }
          ]
        }
      ]
    }
  }
}
</script>

<style scoped>
.color-card {
  width: 100%;
  min-height: 100px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  padding: 16px 8px;
  margin-bottom: 0;
  margin-top: 0;
  text-align: center;
}
.color-name {
  font-size: 1.1em;
}
.color-section-cards {
  padding: 16px 16px 24px 16px;
}
</style> 