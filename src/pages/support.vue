<template>
  <q-page class="column content_page">
    <q-breadcrumbs class="q-mb-md relative-position text-h4">
      <q-breadcrumbs-el icon="home" label="Главная" to="/" class="cursor-pointer text-secondary" />
      <q-breadcrumbs-el icon="chat" label="Чат" to="/support" class="text-dark text-weight-bold" />
    </q-breadcrumbs>
    <div class="row no-wrap justify-between items-center q-mb-lg">
      <div class="text-h1">
        <q-icon name="chat" size="30px" color="dark"/>
        Чат - тех поддержка - вопросы
      </div>
      <div>
       <q-btn size="md" color="primary" icon="add_comment" text-color="dark" padding="8px 12px" @click="handleAddQuestion = true">
        <q-label class="gt-xs">Добавить вопрос</q-label>
       </q-btn>
      </div>
      <BaseDialog
    v-model="handleAddQuestion"
    title="Добавьте вопрос"
    :is-valid="!!newQuestion.title && !!newQuestion.time"
    @show="toggleDialog(true)"
    @hide="toggleDialog(false)"
    @confirm="addNewQuestion"
    @cancel="resetQuestionForm"
  >
    <template #content>
      <q-input 
        v-model="newQuestion.title" 
        label="Заголовок" 
        class="content_popup_value"
        :rules="[val => !!val || 'Обязательное поле']" 
      />
      <q-input 
        v-model="newQuestion.time" 
        label="Время" 
        class="content_popup_value"
        :rules="[val => !!val || 'Обязательное поле']" 
      />
    </template>
  </BaseDialog>
    </div>

    <q-card class="col ">
      <q-card-section class="q-pt-none">
        <q-list separator class="pages_list q-py-sm" v-if="questions.length > 0">
              <q-item v-for="(item, index) in questions" :key="index" class="q-pa-md" clickable v-ripple
                @click="handleQuestionClick(item)">
                <q-item-section avatar>
                  <q-icon name="account_circle" size="50px" class="content_questions_icons" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-h4">{{ item.title }}</q-item-label>
                  <q-item-label caption class="text-h5">{{ item.time }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
        <div v-else class="content_devices_empty-state">
              <div>К Вам пока нет вопросов</div>
            </div>
      </q-card-section>
    </q-card>

  </q-page>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { ref } from 'vue'
import BaseDialog from '@/components/utilits/BaseDialog.vue'

export default {
  name: 'support',
  components: {
    BaseDialog
  },
  
  computed: {
    ...mapGetters('support', {
      questions: 'dashboardQuestions'
    })
  },
  methods: {
    ...mapActions('support', ['addQuestion']),

    addNewQuestion() {
      this.addQuestion({
        title: this.newQuestion.title,
        time: this.newQuestion.time
      })
      this.newQuestion = { title: '', time: '' }
      this.handleAddQuestion = false
    },

    toggleDialog(val) {
      document.body.style.overflow = val ? 'hidden' : ''
      document.documentElement.style.overflow = val ? 'hidden' : ''
    },

    resetQuestionForm() {
      this.newQuestion = { title: '', time: '' }
    }
  },
  setup() {
    const handleAddQuestion = ref(false)
    const newQuestion = ref({
      title: '',
      time: ''
    })

    return {
      handleAddQuestion,
      newQuestion
    }
  }
}
</script>
