<template>
  <q-page class="column content_page">
    <div class="row no-wrap justify-between items-center">
      <div class="content_title q-mb-md">
        <q-icon name="chat" size="30px" color="dark"/>
        Чат - тех поддержка - вопросы
      </div>
      <q-dialog v-model="handleAddQuestion">
        <q-card class="content_popup">
          <q-card-section>
            <div class="content_popup_title">Добавьте вопрос</div>
          </q-card-section>

          <q-card-section>
            
            <q-input v-model="newQuestion.title" label="Заголовок" outlined class="content_popup_value"
              :rules="[val => !!val || 'Обязательное поле']" />

            <q-input v-model="newQuestion.time" label="Время" outlined class="content_popup_value"
              :rules="[val => !!val || 'Обязательное поле']" />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Закрыть" class="content_popup_info" v-close-popup />
            <q-btn flat label="Добавить" class="content_popup_info" @click="addNewQuestion"
              :disable="!newQuestion.title || !newQuestion.time" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>

    <q-card flat class="col content_page_card ">
      <q-card-section class="q-pb-none">
        <div class="flex flex-center">
        <q-btn unelevated class="content_dv-btn-2_mobile" @click="handleAddQuestion = true">
        <q-icon class="q-mr-md" name="mdi-chat-plus-outline" />
        <span class="content_dv-btn-2_text">Добавить вопрос</span>
      </q-btn>
      </div>
       </q-card-section>
      <q-card-section class="q-bt-none">
        <q-list separator class="pages_list q-pa-md" v-if="questions.length > 0">
              <q-item v-for="(item, index) in questions" :key="index" class="q-pa-md" clickable v-ripple
                @click="handleQuestionClick(item)">
                <q-item-section avatar>
                  <q-icon name="account_circle" size="50px" class="content_questions_icons" />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="content_questions_title">{{ item.title }}</q-item-label>
                  <q-item-label caption class="content_questions_time">{{ item.time }}</q-item-label>
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

export default {
  name: 'support',
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
