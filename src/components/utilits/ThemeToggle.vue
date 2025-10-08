<template>
  <q-btn
    :icon="isDark ? 'light_mode' : 'dark_mode'"
    @click="toggleTheme"
    flat
    dense
  >
    <q-tooltip>
      {{ isDark ? 'Светлая тема' : 'Тёмная тема' }}
    </q-tooltip>
  </q-btn>
</template>

<script>
import { Dark } from 'quasar'

export default {
  name: 'ThemeToggle',
  
  data() {
    return {
      isDark: Dark.isActive
    }
  },
  
  methods: {
    toggleTheme() {
      Dark.set(!this.isDark)
      this.isDark = Dark.isActive
      
      // Сохраняем выбор в localStorage
      localStorage.setItem('quasar-theme', this.isDark ? 'dark' : 'light')
    }
  },
  
  mounted() {
    // Восстанавливаем тему из localStorage
    const savedTheme = localStorage.getItem('quasar-theme')
    if (savedTheme) {
      this.isDark = savedTheme === 'dark'
      Dark.set(this.isDark)
    }
  }
}
</script>