<template>
  <div class="vct-header-chatbot">
    {{ title }}
    <slot />
  </div>
</template>

<script>
export default {
  name: 'header-chatbot',
  props: {
    title: {
      type: String,
      default: 'Chat'
    },
  }
}
</script>

<style scoped>
.vct-header-chatbot {
    -webkit-box-align: center;
    align-items: center;
    background: var(--theme);
    color: rgb(255, 255, 255);
    display: flex;
    fill: rgb(255, 255, 255);
    height: 56px;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 16px;
}
</style>
