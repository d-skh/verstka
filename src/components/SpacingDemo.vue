<template>
  <div class="spacing-demo">
    <h1>Спейсинг в em: зачем и как использовать</h1>
    <p>
      <b>em</b> — это относительная единица измерения, которая зависит от размера шрифта родительского элемента. Использование <b>em</b> для отступов (margin, padding) позволяет делать интерфейс более гибким и адаптивным.
    </p>
    <h2>Пример настройки спейсинга</h2>
    <div class="example-block">
      <div class="box" style="margin-bottom: 2em;">Отступ снизу 2em</div>
      <div class="box" style="padding: 1.5em;">Внутренний отступ 1.5em</div>
    </div>
    <h2>Зачем использовать em?</h2>
    <ul>
      <li>Отступы и размеры адаптируются под размер шрифта — удобно для доступности и масштабирования.</li>
      <li>Легко поддерживать консистентность дизайна.</li>
      <li>Проще делать компоненты, которые выглядят хорошо при разных настройках пользователя.</li>
    </ul>
    <h2>Визуализация</h2>
    <div class="visual-demo">
      <div class="parent" style="font-size: 20px;">
        <div class="child" style="margin-top: 1em;">margin-top: 1em (20px)</div>
      </div>
      <div class="parent" style="font-size: 32px;">
        <div class="child" style="margin-top: 1em;">margin-top: 1em (32px)</div>
      </div>
    </div>
    <p style="margin-top:2em; color: #888; font-size: 0.95em;">
      Изменяя размер шрифта родителя, вы меняете и размер отступов в <b>em</b>.
    </p>
  </div>
</template>

<script>
export default {
  name: 'SpacingDemo'
}
</script>

<style scoped>
.spacing-demo {
  max-width: 600px;
  margin: 0 auto;
  padding: 2em 1em;
}
.example-block {
  background: #f5f5f5;
  padding: 1em;
  border-radius: 8px;
  margin-bottom: 2em;
}
.box {
  background: #e0e7ef;
  border-radius: 4px;
  margin-bottom: 1em;
  padding: 0.5em 1em;
}
.visual-demo {
  display: flex;
  gap: 2em;
  margin-top: 1em;
}
.parent {
  background: #f0f0f0;
  padding: 1em;
  border-radius: 6px;
}
.child {
  background: #b3c6e0;
  border-radius: 4px;
  padding: 0.5em 1em;
  margin-top: 1em;
}
</style> 