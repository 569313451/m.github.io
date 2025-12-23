<script setup lang="ts">
import Header from './components/Header.vue';
import MainContent from './components/MainContent.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <Header />
  <MainContent />
  <Footer />
</template>

<style lang="scss">
/* 全局样式 */
body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f7f6;
  color: #333;
}

.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>
