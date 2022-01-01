<template>
  <div>
    <div>Hi {{ getName }}, Nice To meet you. :)</div>
    <br />
    <button @click="handleClick" :disabled="isDisabled">Reset here</button>
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
      const payload = { label: 'Reset', trigger: '1' }
      this.$emit('on-trigger-next', payload)
      this.isDisabled = true
    }
  }
}
</script>

<style>

</style>
