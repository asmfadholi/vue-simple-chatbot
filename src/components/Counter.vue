<template>
  <div class="counter">
    {{ msg }} counter {{ total }}
    <button @click="increaseTotal">Increase</button>
    <button @click="decreaseTotal" :disabled="!total" >Decrease</button>
  </div>
</template>

<script>
export default {
  name: 'Counter',
  props: {
    msg: String
  },
  data() {
    return {
      total: 0
    }
  },
  methods: {
    increaseTotal() {
      this.total++
    },

    decreaseTotal() {
      const equalToZero = this.total === 0
      if (!equalToZero) {
        this.total--
      }
    }
  }
}
</script>
