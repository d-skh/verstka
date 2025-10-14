<template>
  <transition
    :name="animation"
    @enter="onEnter"
    @leave="onLeave"
  >
    <InfoCard
      v-if="!isClosed"
      v-bind="$props"
      @close="handleClose"
    >
      <template v-if="$slots.default" #default>
        <slot />
      </template>
      <template v-if="$slots.actions" #actions>
        <slot name="actions" />
      </template>
    </InfoCard>
  </transition>
</template>

<script>
import InfoCard from './InfoCard.vue'

export default {
  name: 'AnimatedInfoCard',
  components: {
    InfoCard
  },
  extends: InfoCard,
  props: {
    animation: {
      type: String,
      default: 'slide',
      validator: (value) => ['slide', 'fade', 'scale'].includes(value)
    },
    autoClose: {
      type: Number,
      default: 0 // в миллисекундах, 0 - не закрывается автоматически
    }
  },
  data() {
    return {
      isClosed: false
    }
  },
  mounted() {
    if (this.autoClose > 0) {
      setTimeout(() => {
        this.handleClose()
      }, this.autoClose)
    }
  },
  methods: {
    handleClose() {
      this.isClosed = true
      this.$emit('close')
    },
    
    onEnter(el) {
      if (this.animation === 'slide') {
        el.style.height = '0'
        el.style.opacity = '0'
        setTimeout(() => {
          el.style.height = el.scrollHeight + 'px'
          el.style.opacity = '1'
        }, 50)
      }
    },
    
    onLeave(el) {
      if (this.animation === 'slide') {
        el.style.height = '0'
        el.style.opacity = '0'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.3s ease;
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>