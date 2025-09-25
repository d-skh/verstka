<template> <q-page>
  <div>
    <q-page-header>
      <q-toolbar-title>Демонстрация карточек</q-toolbar-title>
    </q-page-header>

    <div class="q-gutter-md">
      <!-- Простая карточка -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Простая карточка</div>
          <div class="text-subtitle2">Подзаголовок</div>
        </q-card-section>

        <q-card-section>
          Это простая карточка с базовым содержимым. Она может содержать текст, изображения и другие элементы.
        </q-card-section>
      </q-card>

      <!-- Карточка с изображением -->
      <q-card class="my-card">
        <q-img
          src="https://cdn.quasar.dev/img/mountains.jpg"
          height="200px"
        />

        <q-card-section>
          <div class="text-h6">Карточка с изображением</div>
          <div class="text-subtitle2">Красивые горы</div>
        </q-card-section>

        <q-card-section>
          Эта карточка содержит изображение в верхней части. Изображение автоматически адаптируется под размер карточки.
        </q-card-section>
      </q-card>

      <!-- Карточка с действиями -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Карточка с действиями</div>
          <div class="text-subtitle2">Интерактивная карточка</div>
        </q-card-section>

        <q-card-section>
          Эта карточка содержит кнопки действий в нижней части.
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat>Отмена</q-btn>
          <q-btn color="primary">Сохранить</q-btn>
        </q-card-actions>
      </q-card>

      <!-- Карточка с аватаром -->
      <q-card class="my-card">
        <q-card-section horizontal>
          <q-card-section class="q-pt-xs">
            <div class="row items-center no-wrap">
              <div class="col">
                <div class="text-h6">Пользователь</div>
                <div class="text-subtitle2">user@example.com</div>
              </div>

              <div class="col-auto">
                <q-btn color="grey-7" round flat icon="more_vert">
                  <q-menu cover auto-close>
                    <q-list>
                      <q-item clickable>
                        <q-item-section>Редактировать</q-item-section>
                      </q-item>
                      <q-item clickable>
                        <q-item-section>Удалить</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
            </div>
          </q-card-section>

          <q-card-section class="col-5 flex flex-center">
            <q-avatar size="72px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-card-section>
        </q-card-section>
      </q-card>

      <!-- Карточка с вкладками -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Карточка с вкладками</div>
        </q-card-section>

        <q-separator />

        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="mails" label="Почта" />
          <q-tab name="alarms" label="Уведомления" />
          <q-tab name="movies" label="Фильмы" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">
            <div class="text-h6">Почта</div>
            У вас есть 3 новых сообщения в почте.
          </q-tab-panel>

          <q-tab-panel name="alarms">
            <div class="text-h6">Уведомления</div>
            У вас есть 2 активных уведомления.
          </q-tab-panel>

          <q-tab-panel name="movies">
            <div class="text-h6">Фильмы</div>
            Рекомендуемые фильмы для просмотра.
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <!-- Карточка с прогрессом -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Карточка с прогрессом</div>
          <div class="text-subtitle2">Загрузка проекта</div>
        </q-card-section>

        <q-card-section>
          <q-linear-progress :value="progress" color="primary" class="q-mb-sm" />
          <div class="text-caption">Прогресс: {{ Math.round(progress * 100) }}%</div>
        </q-card-section>

        <q-card-actions>
          <q-btn flat @click="progress = Math.min(1, progress + 0.1)">Увеличить</q-btn>
          <q-btn flat @click="progress = Math.max(0, progress - 0.1)">Уменьшить</q-btn>
        </q-card-actions>
      </q-card>

      <!-- Карточка с рейтингом -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Карточка с рейтингом</div>
          <div class="text-subtitle2">Оценка продукта</div>
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-sm">
            <q-rating
              v-model="rating"
              size="2em"
              color="orange"
              icon="star_border"
              icon-selected="star"
            />
            <div class="text-caption">Рейтинг: {{ rating }}/5</div>
          </div>
        </q-card-section>
      </q-card>

      <!-- Карточка с чекбоксами -->
      <q-card class="my-card">
        <q-card-section>
          <div class="text-h6">Карточка с чекбоксами</div>
          <div class="text-subtitle2">Список задач</div>
        </q-card-section>

        <q-card-section>
          <q-list>
            <q-item v-for="task in tasks" :key="task.id">
              <q-item-section avatar>
                <q-checkbox v-model="task.completed" />
              </q-item-section>
              <q-item-section>
                <q-item-label :class="{ 'text-strike': task.completed }">
                  {{ task.text }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </div>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'CardsDemo',
  data() {
    return {
      tab: 'mails',
      progress: 0.3,
      rating: 4,
      tasks: [
        { id: 1, text: 'Изучить Vue.js', completed: true },
        { id: 2, text: 'Изучить Quasar Framework', completed: true },
        { id: 3, text: 'Создать UI Kit', completed: false },
        { id: 4, text: 'Написать документацию', completed: false }
      ]
    }
  }
}
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 400px;
}
</style> 