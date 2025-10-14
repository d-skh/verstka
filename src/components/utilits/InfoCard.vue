<template>
  <q-card 
    class="info-card"
    :class="computedClasses"
    :flat="flat"
    :bordered="bordered"
    :square="square"
  >
    <q-card-section class="card-content">
      <!-- Иконка слева -->
      <div v-if="icon" class="icon-container">
        <q-icon :name="icon" :size="iconSize" :class="iconClass" />
      </div>
      
      <!-- Основной контент -->
      <div class="content-wrapper">
        <!-- Заголовок -->
        <div v-if="title" class="text-h3 title">{{ title }}</div>
        
        <!-- Сообщение -->
        <div class="text-h4 message" :class="messageClass">
          <slot>{{ message }}</slot>
        </div>
      </div>
    </q-card-section>

    <!-- Кнопка закрытия снизу -->
    <q-card-actions v-if="closable" class="actions-bottom">
      <q-btn 
        class="full-width" 
        size="md" 
        outline 
        label="Закрыть" 
        icon="close" 
        text-color="secondary" 
        padding="6px 12px" 
        @click="handleClose"
      />
    </q-card-actions>

    <!-- Слот для действий -->
    <q-card-actions v-if="$slots.actions" class="actions-bottom">
      <slot name="actions"></slot>
    </q-card-actions>
  </q-card>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    // Тип плашки
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['info', 'success', 'warning', 'error', 'primary', 'secondary'].includes(value)
    },
    
    // Заголовок
    title: {
      type: String,
      default: ''
    },
    
    // Сообщение (альтернатива слоту)
    message: {
      type: String,
      default: ''
    },
    
    // Иконка
    icon: {
      type: String,
      default: ''
    },
    
    // Размер иконки
    iconSize: {
      type: String,
      default: '40px'
    },
    
    // Возможность закрыть
    closable: {
      type: Boolean,
      default: false
    },
    
    // Плоский стиль
    flat: {
      type: Boolean,
      default: false
    },
    
    // С границей
    bordered: {
      type: Boolean,
      default: true
    },
    
    // Квадратные углы
    square: {
      type: Boolean,
      default: false
    },
    
    // Плотный режим
    dense: {
      type: Boolean,
      default: false
    }
  },
  
  computed: {
    computedClasses() {
      return [
        `type-${this.type}`,
        {
          'dense-mode': this.dense,
          'has-icon': this.icon,
          'has-title': this.title,
          'has-actions': this.closable || this.$slots.actions
        }
      ]
    },
    
    messageClass() {
      return {
        'text-body1': !this.dense,
        'text-body2': this.dense
      }
    },

    iconClass() {
      return `icon-${this.type}`
    }
  },
  
  methods: {
    handleClose() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.info-card {
  margin: 28px 0 0 0;
  transition: all 0.3s ease;
  
  &.type-info {
    border: 1px solid var(--q-color-info);
    background-color: var(--q-color-info-bg);
    border-left: 4px solid var(--q-color-info);
  }
  
  &.type-success {
    background-color: #000;
    border-left: 4px solid var(--q-color-positive);
  }
  
  &.type-warning {
    background-color: #000;
    border-left: 4px solid var(--q-color-warning);
  }
  
  &.type-error {
    background: #000;
    border-left: 4px solid var(--q-color-negative);
  }
  
  &.type-primary {
    background: var(--q-primary);
    color: white;
    
    .close-btn {
      color: white;
    }
  }
  
  &.type-secondary {
    background: var(--q-secondary);
    color: white;
    
    .close-btn {
      color: white;
    }
  }
  
  &.dense-mode {
    .card-content {
      padding: 8px 16px;
    }
  }
}

.card-content {
  display: flex;
  align-items: center; /* Выравнивание по центру по вертикали */
  padding: 16px;
  gap: 16px;
}

.icon-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* Цвета иконок в зависимости от типа */
.icon-info {
  color: var(--q-color-info);
}

.icon-success {
  color: var(--q-color-positive);
}

.icon-warning {
  color: var(--q-color-warning);
}

.icon-error {
  color: var(--q-color-negative);
}

.icon-primary {
  color: var(--q-primary);
}

.icon-secondary {
  color: var(--q-secondary);
}

.content-wrapper {
  flex: 1;
  min-width: 0; /* Для правильного переноса текста */
  
  .title {
    font-weight: 600;
    margin-bottom: 8px;
  }
  
  .message {
    line-height: 1.5;
    word-break: break-word;
  }
}

.actions-bottom {
  padding: 8px 16px 16px 16px;
  
  /* Если есть иконка, добавляем отступ слева для выравнивания с контентом */
  .has-icon & {
    padding-left: 72px; /* 40px иконка + 16px gap + 16px padding */
  }
}

/* Для плотного режима */
.dense-mode {
  .card-content {
    padding: 12px 16px;
    gap: 12px;
  }
  
  .actions-bottom {
    padding: 4px 16px 12px 16px;
    
    .has-icon & {
      padding-left: 68px; /* Немного меньше для плотного режима */
    }
  }
}
</style>