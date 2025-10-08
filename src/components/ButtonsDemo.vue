<template> <q-page>
  <div>
    <q-page-header>
      <q-toolbar-title>Демонстрация кнопок</q-toolbar-title>
    </q-page-header>

    <div class="q-gutter-md">

      <q-card>
        <q-card-section>
          <div class="text-h5">Veda Buttons</div>
          <div class="text-h6">Default</div>
          <div>Big</div>
          <div class="q-gutter-sm q-my-md">
            <q-btn class="text-bold" color="accent" label="Кнопка" icon="memory" icon-right="send" padding="12px 24px" @click=""/>
            <q-btn class="text-bold" outline color="accent" label="Кнопка" icon="memory" icon-right="send" padding="12px 24px" @click=""/>
            <q-btn class="text-bold" color="primary" label="Кнопка" icon="memory" icon-right="send" text-color="dark" padding="12px 24px" @click=""/>
            <q-btn class="text-bold" outline label="Кнопка" icon="memory" icon-right="send" text-color="secondary" padding="12px 24px" @click=""/>
          </div>
          <div>Small</div>
          <div class="q-gutter-sm q-my-md">
            <q-btn size="md" color="accent" label="Кнопка" icon="memory" icon-right="send" padding="8px 12px" @click=""/>
            <q-btn size="md" outline color="accent" label="Кнопка" icon="memory" icon-right="send" padding="8px 12px" @click=""/>
            <q-btn size="md" color="primary" label="Кнопка" icon="memory" icon-right="send" text-color="dark" padding="8px 12px" @click=""/>
            <q-btn size="md" outline label="Кнопка" icon="memory" icon-right="send" text-color="secondary" padding="8px 12px" @click=""/>
          </div>
          <div class="text-h6">Disabled</div>
          <div>Big</div>
          <div class="q-gutter-sm q-my-md">
            <q-btn disabled class="text-bold" color="accent" label="Кнопка" icon="memory" icon-right="send" padding="12px 24px" @click=""/>
            <q-btn disabled class="text-bold" outline color="accent" label="Кнопка" icon="memory" icon-right="send" padding="12px 24px" @click=""/>
            <q-btn disabled class="text-bold" color="primary" label="Кнопка" icon="memory" icon-right="send" text-color="dark" padding="12px 24px" @click=""/>
            <q-btn disabled class="text-bold" outline label="Кнопка" icon="memory" icon-right="send" text-color="secondary" padding="12px 24px" @click=""/>
          </div>
          <div>Small</div>
          <div class="q-gutter-sm q-my-md">
            <q-btn disabled size="md" color="accent" label="Кнопка" icon="memory" icon-right="send" padding="8px 12px" @click=""/>
            <q-btn disabled size="md" outline color="accent" label="Кнопка" icon="memory" icon-right="send" padding="8px 12px" @click=""/>
            <q-btn disabled size="md" color="primary" label="Кнопка" icon="memory" icon-right="send" text-color="dark" padding="8px 12px" @click=""/>
            <q-btn disabled size="md" outline label="Кнопка" icon="memory" icon-right="send"h text-color="secondary" padding="8px 12px" @click=""/>
          </div>
        </q-card-section>
      </q-card>


      <q-card>
        <q-card-section>
          <div class="text-h6">Основные кнопки</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="primary" label="Primary" />
            <q-btn color="secondary" label="Secondary" />
            <q-btn color="tertiary" label="tertiary" />
            <q-btn color="quaternary" label="quaternary" />
            <q-btn color="accent" label="Accent" />

            <q-btn disabled color="accent" label="Accent" />
            <q-btn outline color="accent" label="Accent" />

            <q-btn outline disabled color="accent" label="Accent" />

            <q-btn color="positive" label="Positive" />
            <q-btn color="negative" label="Negative" />
            <q-btn color="info" label="Info" />
            <q-btn color="warning" label="Warning" />
            <q-btn color="abracadabra-bro" label="abracadabra-bro" />
            <q-btn color="background-light" label="background-light" class="text-black"/>
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Кнопки с иконками</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="primary" icon="add" label="Добавить" />
            <q-btn color="quaternary" icon="edit" label="Редактировать" />
            <q-btn color="negative" icon="delete" label="Удалить" />
            <q-btn color="info" icon="file_download" label="Скачать" />
            <q-btn color="warning" icon="warning" label="Предупреждение" />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Размеры кнопок</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn size="xs" color="primary" label="Очень маленькая" />
            <q-btn size="sm" color="primary" label="Маленькая" />
            <q-btn size="md" color="primary" label="Средняя" />
            <q-btn size="lg" color="primary" label="Большая" />
            <q-btn size="xl" color="primary" label="Очень большая" />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Стили кнопок</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn color="primary" label="Обычная" />
            <q-btn color="primary" outline label="Контурная" />
            <q-btn color="primary" flat label="Плоская" />
            <q-btn color="primary" unelevated label="Без тени" />
            <q-btn color="primary" round icon="favorite" />
            <q-btn color="primary" fab icon="add" />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Кнопки с загрузкой</div>
          <div class="q-gutter-sm q-mt-md">
            <q-btn 
              :loading="loading" 
              color="primary" 
              label="Загрузить данные"
              @click="simulateLoading"
            />
            <q-btn 
              :loading="loading2" 
              color="secondary" 
              icon="cloud_download"
              label="Скачать файл"
              @click="simulateLoading2"
            />
          </div>
        </q-card-section>
      </q-card>

      <q-card>
        <q-card-section>
          <div class="text-h6">Группа кнопок</div>
          <div class="q-mt-md">
            <q-btn-group flat>
              <q-btn color="primary" icon="format_align_left" />
              <q-btn color="primary" icon="format_align_center" />
              <q-btn color="primary" icon="format_align_right" />
            </q-btn-group>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'ButtonsDemo',
  data() {
    return {
      loading: false,
      loading2: false
    }
  },
  methods: {
    simulateLoading() {
      this.loading = true
      setTimeout(() => {
        this.loading = false
        this.$q.notify({
          type: 'positive',
          message: 'Данные загружены!'
        })
      }, 2000)
    },
    simulateLoading2() {
      this.loading2 = true
      setTimeout(() => {
        this.loading2 = false
        this.$q.notify({
          type: 'info',
          message: 'Файл скачан!'
        })
      }, 1500)
    }
  }
}
</script> 