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
          flat 
          label="Закрыть" 
          class="content_popup_negative" 
          v-close-popup 
          @click="$emit('cancel')"
        />
        <q-btn 
          flat 
          label="Добавить" 
          class="content_popup_positive" 
          :disable="!isValid"
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
    value: {  // ← используем value вместо modelValue
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
    }
  },
  emits: ['input', 'show', 'hide', 'confirm', 'cancel']  // ← input вместо update:modelValue
}
</script>