<template>
  <q-dialog 
    :value="value" 
    @input="$emit('input', $event)"
    @show="$emit('show')"
    @hide="$emit('hide')"
    :persistent="isPersistent"
  >
    <q-card class="dialog_popup q-pa-sm" :style="cardStyle">
      <q-card-section class="q-pb-none">
        <div class="content_popup_title">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pb-none" :class="contentClass">
        <slot name="content"></slot>
      </q-card-section>

      <q-card-actions align="right" class="q-pr-md q-pt-none">
        <q-btn 
          v-if="showCancel"
          v-close-popup 
          outline 
          size="md" 
          text-color="secondary" 
          :label="cancelLabel" 
          padding="4px 12px" 
          @click="$emit('cancel')"
        />

        <q-btn 
          v-if="showConfirm"
          :disable="!isValid" 
          size="md" 
          :color="confirmColor" 
          :label="confirmLabel" 
          padding="4px 12px" 
          @click="$emit('confirm')"
        />

        <slot name="actions"></slot>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'BaseDialog',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    isValid: {
      type: Boolean,
      default: false
    },
    confirmLabel: {
      type: String,
      default: 'Добавить'
    },
    cancelLabel: {
      type: String,
      default: 'Закрыть'
    },
    confirmColor: {
      type: String,
      default: 'accent'
    },
    showCancel: {
      type: Boolean,
      default: true
    },
    showConfirm: {
      type: Boolean,
      default: true
    },
    isPersistent: {
      type: Boolean,
      default: false
    },
    cardStyle: {
      type: String,
      default: ''
    },
    contentClass: {
      type: String,
      default: ''
    }
  },
  emits: ['input', 'show', 'hide', 'confirm', 'cancel']
}
</script>