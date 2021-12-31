<template>
  <form class="vct-form-chatbot" @submit.prevent autocomplete="off" :class="{'vct-error-form-user' : isError}">
    <input class="vct-input-chatbot" name="vct-input-chatbot" v-model="inputUser" :placeholder="inputSettings.placeholder" :disabled="inputSettings.isDisabledInput" />
    <button class="vct-button-send-message" @click="handleSubmit" :disabled="inputSettings.isDisabledInput">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 500 500"><g><g><polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75"></polygon></g></g></svg>
    </button>
  </form>
</template>

<script>

export default {
  name: 'input-chatbot',
  props: {
    inputSettings: {
      type: Object,
      default: () => ({
        isDisabledInput: true,
        hideInput: false,
        placeholder: '',
        nextTrigger: 0,
        validator: () => {}
      })
    }
  },
  data() {
    return {
      inputUser: '',
      isError: false
    }
  },
  methods: {
    handleSubmit() {
      const input = this.inputUser
      const validate = this.validateInput()
      if (!input || !validate) return
      this.$emit('on-next-trigger', input)
      this.inputUser = ''
    },

    validateInput() {
      const res = this.inputSettings.validator(this.inputUser)
      const dataTypeBoolean = typeof res === 'boolean';

      if (res && dataTypeBoolean) return true;
      this.isError = true
      const currentInput = this.inputUser
      this.inputUser = res || 'Value is not valid'

      this.setFormToDefault(currentInput)
      return false
    },

    async setFormToDefault(currentInput) {
       
      await new Promise(resolve => {
        setTimeout(() => {
          this.inputUser = currentInput
          this.isError = false
          resolve()
        }, 1000)
      })
    }
  },
}
</script>

<style scoped>
.vct-form-chatbot {
  position: relative;
}

.vct-error-form-user input {
  box-shadow: rgb(229 57 53) 0 0 2px inset;
  box-sizing: border-box;
  color: rgb(229, 57, 53);
}

.vct-error-form-user button {
  fill: rgb(229, 57, 53);
}

.vct-input-chatbot {
    border-width: 1px 0 0;
    border-right-style: initial;
    border-bottom-style: initial;
    border-left-style: initial;
    border-right-color: initial;
    border-bottom-color: initial;
    border-left-color: initial;
    border-image: initial;
    border-radius: 0 0 10px 10px;
    border-top-style: solid;
    border-top-color: rgb(238, 238, 238);
    box-shadow: none;
    box-sizing: border-box;
    font-size: 16px;
    opacity: 0.5;
    outline: none;
    padding: 16px 52px 16px 10px;
    width: 100%;
    appearance: none;
}
.vct-button-send-message {
  cursor: pointer;
  background-color: transparent;
  border: 0;
  border-bottom-right-radius: 10px;
  box-shadow: none;
  fill: rgb(74, 74, 74);
  opacity: 0.5;
  outline: none;
  padding: 14px 16px 12px;
  position: absolute;
  right: 0;
  top: 0;
}
</style>
