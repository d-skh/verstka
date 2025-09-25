<template>
        <q-footer> <!--v-if="showFooter"-->
      <div :class="[$q.screen.lt.sm ? 'column' : 'row', 'q-ma-lg']">
        <div class="col q-pa-sm">
          <div class="q-footer_logo_container q-mb-sm">
            <img class="q-footer_emblema" src="icons\VDH.svg" alt="Логотип" />
            <div class="text-h3">VEDA DRIVES HUB</div>
          </div>
          <div>
            <div>
              <p :class="[$q.screen.lt.sm ? 'q-mb-sm' : 'q-mb-xl', 'q-footer_geo']">Сервис для удаленной поддержки<br
                  class="gt-xs">по вопросам применения<br>приводной техники</p>
            </div>
            <div>
              <div>
                <p class="q-footer_rights">VEDA DRIVES HUB. 2025 Все права защищены</p>
                <div class="q-footer_projects">
                  <a :href="privacyPolicyUrl" target="_blank">Политика конфиденциальности</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col q-pa-sm">
          <div class="text-h3 q-mb-sm">Наши проекты</div>
          <q-list>
            <template v-for="link in externalLinks">
              <q-item class="q-pl-none" dense clickable v-ripple :href="link.url" target="_blank">
                <q-item-section class="q-footer_projects">
                  <q-item-label>{{ link.title }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-list>
        </div>

        <div class="col q-pa-sm">
          <div>
            <div class="text-h3 q-mb-sm">Контакты</div>
            <p class="q-footer_geo">
              Адрес: 143581, Московская обл.,<br />г. Истра, д. Лешково, 217<br />
              Телефон: (495) 644-43-32<br />E-mail: info@drives.ru
            </p>
          </div>
          <div>
            <a href="https://vk.com/vedamc" target="_blank">
              <q-icon name="fab fa-vk" color="blue-9" size="30px" />
            </a>
            <a href="https://t.me/veda_vfd" target="_blank">
              <q-icon name="mdi-telegram" color="blue-5" size="30px" />
            </a>
            <a href="https://dzen.ru/veda_mc" target="_blank">
              <q-icon name="fab fa-yandex" color="red-10" size="22px" />
            </a>
          </div>
        </div>
      </div>
    </q-footer>

</template>

<script>
import { mapGetters } from 'vuex'


export default {
  name: 'Footer',

  computed: {
    ...mapGetters('desktop', {
      externalLinks: 'appLinks',
      privacyPolicyUrl: 'appPrivacyPolicyUrls'
    })
  },
}
</script>