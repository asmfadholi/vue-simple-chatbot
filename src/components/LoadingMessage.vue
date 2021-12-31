<template>
  <div :style="style">
    <span class="vct-loading-message" v-for="id in 3" :key="id">.</span>
  </div>      
</template>

<script>
export default {
  name: 'loading-message',
  props: {
    color: {
      type: String,
      default: ''
    },
  },
  computed: {
    style() {
      return {
        color: this.color
      }
    }
  },
}
</script>

<style scoped>

.vct-loading-message {
  animation: 1.4s ease 0s infinite normal both running loadOpacity;
}

@keyframes loadOpacity {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}
</style>
