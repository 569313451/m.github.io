<template>
  <header class="header">
    <div class="container">
      <h1 class="title">工具集</h1>
      <p class="subtitle">一个有用的基于网络的开发工具集合，可简化您的工作流程并提高生产力。</p>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Header',
});
</script>

<style lang="scss" scoped>
.header {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 1.5rem 0;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}

.header .title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.header .subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}
</style>