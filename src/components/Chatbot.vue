<template>
  <div class="vct-vue-chatbot" :style="theme">
    <header-chatbot />
    <body-chatbot :currentSteps="currentSteps" :delay="delay" @on-next="handleOnNextTriggerBySystem" :botAvatar="botAvatar" :userAvatar="userAvatar" :currentData="currentData" @set-current-data="setCurrentData" />
    <input-chatbot @on-next-trigger="handleOnNextTriggerByUserInput" :inputSettings="inputSettings" v-if="!inputSettings.hideInput" />
  </div>
</template>

<script>
import BodyChatbot from './BodyChatbot.vue'
import HeaderChatbot from './HeaderChatbot.vue'
import InputChatbot from './InputChatbot.vue'

import userAvatar from '../assets/user.png'
import botAvatar from '../assets/robot.png'


const defaultPlaceholder = 'Type message here...'
export default {
  name: 'vue-chatbot',
  components: {
    HeaderChatbot,
    InputChatbot,
    BodyChatbot
  },
  props: {
    steps: {
      type: Array,
      default: () => []
    },
    width: {
      type: String,
      default: '350px'
    },
    styleConfig: {
      type: Object,
      default: () => ({
        theme: 'rgb(110, 72, 170)'
      })
    },
    delay: {
      type: Number,
      default: 1000
    },
    botAvatar: {
      type: String,
      default: botAvatar
    },
    userAvatar: {
      type: String,
      default: userAvatar
    }
  },
  data() {
    return {
      // steps
      currentSteps: [],

      // current saved data
      currentData: {},

      // input state
      inputSettings: {
        currentId: 0,
        isDisabledInput: true,
        hideInput: false,
        placeholder: defaultPlaceholder,
        nextTrigger: 0,
        validator: () => {}
      }
    }
  },
  computed: {
    theme() {
      return {
        '--theme': this.styleConfig.theme,
        width: this.width
      }
    },
  },
  created() {
    this.initCurrentStep();
  },
  methods: {
    initCurrentStep() {
      const firstStep = this.steps?.[0] || {}
      this.validateInputSettings(firstStep)
      this.currentSteps.push(firstStep)
    },

    validateInputSettings(payload) {
      const { id = '', user = false, trigger: nextTrigger = '', validator = () => {},  placeholder = '', hideInput = false, isDisabledInput = false } = payload
      const defaultSettings = {
        currentId: id,
        hideInput,
        placeholder: placeholder || defaultPlaceholder,
        nextTrigger,
        validator
      }
      if (user) return this.inputSettings = { ...defaultSettings, isDisabledInput }
      this.inputSettings = { ...defaultSettings, isDisabledInput: true }
    },

    setCurrentData(payload) {
      this.currentData[payload.id] = payload
    },

    handleOnNextTriggerByUserInput(payload) {
      const nextStep = { user: true, trigger: this.inputSettings.nextTrigger, label: payload, isDisabledInput: true }
      this.setCurrentData({ id: this.inputSettings.currentId, value: payload })
      this.validateInputSettings(nextStep)
      this.currentSteps.push(nextStep)
    },

    handleOnNextTriggerBySystem(payload) {
      const { trigger = '' } = payload
      const findTriggerId = this.steps.filter(step => step.id === trigger)
      if (!findTriggerId.length) return

      const { user = false } = findTriggerId[0]
      this.validateInputSettings(findTriggerId[0])

      if (!user) return this.currentSteps.push(findTriggerId[0])
    }
  }
}
</script>

<style scoped>
.vct-vue-chatbot {
  background: rgb(245, 248, 251);
  border-radius: 10px;
  box-shadow: rgb(0 0 0 / 15%) 0 12px 24px 0;
  font-family: monospace;
  overflow: hidden;
  position: relative;
  inset: initial;
  height: 520px;
  z-index: 999;
  transform: scale(1);
  transform-origin: right bottom;
  transition: transform 0.3s ease 0s;
}
</style>
