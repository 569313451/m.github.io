<template>
  <footer class="footer">
    <div class="container">
      <p>&copy; 2023 工具集. 保留所有权利.</p>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style lang="scss" scoped>
.footer {
  background-color: #2c3e50;
  color: #ffffff;
  text-align: center;
  padding: 1.5rem 0;
  margin-top: 2rem;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
}

.footer .container {
  max-width: 960px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>