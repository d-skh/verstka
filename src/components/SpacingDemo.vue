<template><q-page>
  <div class="spacing-demo">
    <div class="rem-settings">
      <label>
        Размер шрифта root (html):
        <button type="button" class="rem-incdec" @click="decrementRem" :disabled="rootFontSize <= 10">-</button>
        <input type="range" min="10" max="32" v-model.number="rootFontSize" />
        <button type="button" class="rem-incdec" @click="incrementRem" :disabled="rootFontSize >= 32">+</button>
        <span>{{ rootFontSize }}px</span>
      </label>
      <button @click="resetFontSize">Сбросить</button>
    </div>

    <div class="card-demo">
      <div class="card">
        <h2 class="card-title">Тестовая форма</h2>
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label for="name">Имя</label>
            <input id="name" v-model="form.name" type="text" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" type="email" required />
          </div>
          <div class="button-row">
            <button type="submit">Отправить</button>
            <button type="button" @click="onReset">Сбросить</button>
          </div>
        </form>
        <div v-if="submitted" class="result">
          <b>Данные отправлены:</b><br />
          Имя: {{ form.name }}<br />
          Email: {{ form.email }}
        </div>
      </div>

      <div class="product-card">
        <img class="product-image" src="https://images.unsplash.com/photo-1513708927688-890a1e2b6b33?auto=format&fit=crop&w=400&q=80" alt="Товар" />
        <div class="product-info">
          <h3 class="product-title">Стильный рюкзак</h3>
          <p class="product-desc">Удобный городской рюкзак для ноутбука и повседневных дел. Вместительный, лёгкий и современный дизайн.</p>
          <div class="product-bottom">
            <span class="product-price">4 990 ₽</span>
            <button class="product-btn">В корзину</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </q-page>
</template>

<script>
export default {
  name: 'SpacingDemo',
  data() {
    return {
      rootFontSize: 16,
      form: {
        name: '',
        email: ''
      },
      submitted: false
    }
  },
  watch: {
    rootFontSize(newSize) {
      document.documentElement.style.fontSize = newSize + 'px';
    }
  },
  mounted() {
    document.documentElement.style.fontSize = this.rootFontSize + 'px';
  },
  beforeDestroy() {
    document.documentElement.style.fontSize = '';
  },
  methods: {
    resetFontSize() {
      this.rootFontSize = 16;
    },
    incrementRem() {
      if (this.rootFontSize < 32) this.rootFontSize++;
    },
    decrementRem() {
      if (this.rootFontSize > 10) this.rootFontSize--;
    },
    onSubmit() {
      this.submitted = true;
    },
    onReset() {
      this.form.name = '';
      this.form.email = '';
      this.submitted = false;
    }
  }
}
</script>

<style scoped>
.spacing-demo {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.rem-settings {
  margin: 1.5rem 0 2rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}
.card-demo {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}
.card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);
  padding: 2rem;
  max-width: 350px;
  width: 100%;
}
.card-title {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  text-align: center;
}
.form-group {
  margin-bottom: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
label {
  font-size: 1rem;
  color: #333;
}
input[type="text"],
input[type="email"] {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid #b3c6e0;
  font-size: 1rem;
  outline: none;
  transition: border 0.2s;
}
input:focus {
  border-color: #5b8def;
}
.button-row {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
button {
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  background: #5b8def;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
button[type="button"] {
  background: #b3c6e0;
  color: #222;
}
button:hover, .product-btn:hover {
  background: #4177c2;
}
.result {
  margin-top: 2rem;
  font-size: 1rem;
  color: #2a4d7a;
  background: #eaf2fb;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: left;
}
.product-card {
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.10);
  max-width: 340px;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 0;
}
.product-image {
  width: 100%;
  height: 13rem;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
}
.product-info {
  padding: 1.5rem 1.25rem 1.25rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.product-title {
  font-size: 1.25rem;
  margin: 0;
  color: #1a2a3a;
}
.product-desc {
  font-size: 1rem;
  color: #4a5a6a;
  margin: 0;
}
.product-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.product-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2a4d7a;
}
.product-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  border: none;
  background: #5b8def;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;
}
.rem-incdec {
  width: 2.2rem;
  height: 2.2rem;
  font-size: 1.3rem;
  margin: 0 0.2rem;
  min-width: 2.2rem;
  min-height: 2.2rem;
  border-radius: 0;
  border: 1px solid #ccc;
  background: #f5f5f5;
  color: inherit;
  cursor: pointer;
  box-shadow: none;
  padding: 0;
  display: inline-block;
}
.rem-incdec:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style> 