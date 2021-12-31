<template>
  <div>
     Hello there {{ getName }}
     <button @click="handleClick" :disabled="isDisabled">Click here</button>
  </div>
</template>

<script>

export default {
  name: 'options',
  props: {
    currentData: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    getName() {
      const { name = {} } = this.currentData;
      return name.value
    }
  },
  data() {
    return {
      isDisabled: false
    }
  },
  methods: {
    handleClick() {
      const payload = { label: 'Betul Sekali', trigger: '1' }
      this.$emit('on-trigger-next', payload)
      this.isDisabled = true
    }
  }
}
</script>

<style>

</style>
