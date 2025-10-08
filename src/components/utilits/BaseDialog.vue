<template>
  <q-dialog 
    :value="value" 
    @input="$emit('input', $event)"
    @show="$emit('show')"
    @hide="$emit('hide')"
  >
    <q-card class="dialog_popup q-pa-sm">
      <q-card-section class="q-pb-none">
        <div class="content_popup_title">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pb-none">
        <slot name="content"></slot>
      </q-card-section>

      <q-card-actions align="right" class="q-pr-md q-pt-none">
        <q-btn 
          v-close-popup 
          outline 
          size="md" 
          text-color="dark" 
          :label="cancelLabel" 
          padding="4px 12px" 
          @click="$emit('cancel')"
        />

        <q-btn 
          :disable="!isValid" 
          size="md" 
          :color="confirmColor" 
          :label="confirmLabel" 
          padding="4px 12px" 
          @click="$emit('confirm')"
        />
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
    }
  },
  emits: ['input', 'show', 'hide', 'confirm', 'cancel']
}
</script>