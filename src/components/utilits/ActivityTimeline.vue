<template>
  <div>
    <q-timeline color="secondary">
      <q-timeline-entry
        v-for="event in timelineEvents"
        :key="event.id"
        :title="event.title"
        :subtitle="formatSubtitle(event.timestamp)"
        :icon="event.icon"
        :color="getEventColor(event.category)"
      >
        <div class="text-h4">{{ event.description }}</div>
        <div class="text-h5 q-mt-xs">
          {{ formatDate(event.timestamp) }}
        </div>
        <q-btn class="q-mt-sm" size="sm" color="primary" label="" icon="delete" text-color="dark" padding="6px 30px" @click="deleteEvent(event.id)"> 

          <q-tooltip>Удалить событие</q-tooltip>
        </q-btn>
      </q-timeline-entry>
    </q-timeline>

    <!-- Пустой state -->
    <div v-if="timelineEvents.length === 0" class="text-center q-pa-lg">
      <q-icon name="history" size="xl" color="grey-5" />
      <div class="text-h6 q-mt-md text-grey-5">Нет событий</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ActivityTimeline',
  computed: {
    ...mapGetters('timeline', ['timelineEvents'])
  },
  methods: {
    ...mapActions('timeline', ['deleteEvent']),
    
    formatSubtitle(timestamp) {
      const now = new Date()
      const eventDate = new Date(timestamp)
      const diffMs = now - eventDate
      const diffMins = Math.floor(diffMs / 60000)
      const diffHours = Math.floor(diffMs / 3600000)
      const diffDays = Math.floor(diffMs / 86400000)

      if (diffMins < 60) {
        return `${diffMins} минут назад`
      } else if (diffHours < 24) {
        return `${diffHours} часов назад`
      } else {
        return `${diffDays} дней назад`
      }
    },

    formatDate(timestamp) {
      return new Date(timestamp).toLocaleString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },

    getEventColor(category) {
      const colors = {
        question: 'primary',
        device: 'secondary',
        profile: 'positive',
        auth: 'info'
      }
      return colors[category] || 'secondary'
    }
  }
}
</script>