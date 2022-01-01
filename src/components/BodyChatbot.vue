<template>
  <div class="vct-body-chatbot" ref="bodyChatbot">
    <template v-for="(step, idx) in steps" :key="step.id">
      <div v-if="!step.user">
        <div class="vct-inline-message-robot" :class="{'vct-have-margin-left': idx > 0 && !steps[idx - 1].user}" v-if="!step.options">
          <div class="vct-robot-image">
            <img :src="botAvatar" alt="robot" v-show="(idx > 0 && steps[idx - 1].user) || idx === 0">
          </div>
          <div class="vct-robot-message" v-if="step.message || step.id === 'loading'">
            <div>
              <span v-if="typeof step.message === 'string'">
                {{ step.message }}
              </span>
               <component :is="step.message" :component="step.message" v-else :currentData="currentData" />
            </div>
           
            <loading-message color="rgb(255, 255, 255)" v-if="step.id === 'loading'" />
          </div>
        </div>
        
        <div v-if="step.options && step.id !== 'loading'">
          <div v-if="Array.isArray(step.options)" class="vct-options-message">
            <template v-for="ops in step.options" :key="ops.id">
              <a class="vct-option-item" @click="() => handleTriggerByUser(ops, step.id)">{{ ops.label }}</a>
            </template>
          </div>
          
          <div v-else class="vct-custom-component">
            <component :is="step.options" :component="step.options" @on-trigger-next="(payload) => handleTriggerByUser(payload, step.id)" :currentData="currentData" />
          </div>
        </div>
    
      </div>

      <div v-else>
        <div class="vct-inline-message-user" :class="{'vct-have-margin-right': idx > 0 && steps[idx - 1].user}">
          <div class="vct-user-image">
            <img :src="userAvatar" alt="user" v-show="!steps[idx - 1].user">
          </div>
          <div class="vct-user-message" v-if="step.message || step.id === 'loading'">
            {{ step.message }}
            <loading-message color="rgb(74, 74, 74)" v-if="step.id === 'loading'" />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import LoadingMessage from './LoadingMessage.vue'

const sendLoadingUser = { id: 'loading', message: '', user: true }
const sendLoadingRobot = { id: 'loading', message: '' }
export default {
  name: 'body-chatbot',
  components: {
    LoadingMessage
  },
  props: {
    currentSteps: {
      type: Array,
      default: () => []
    },
    currentData: {
      type: Object,
      default: () => {}
    },
    delay: {
      type: Number,
      default: 1000
    },
    botAvatar: {
      type: String,
      default: ''
    },
    userAvatar: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      steps: [sendLoadingRobot],
      currentLength: 0,
    }
  },
  watch: {
    currentSteps: {
      handler(newData) {
        const sameLength = newData.length === this.currentLength
        if (sameLength) return

        this.currentLength = newData.length
        const nextStep = newData[newData.length - 1]
        const { user } = nextStep

        if (user) {
          this.processUserMessage(nextStep);
        } else {
          this.processRobotMessage(nextStep)
        }
      },
      deep: true
    }
  },
  created() {
    this.initStep()
  },
  methods: {
    initStep() {
      setTimeout(() => {
        this.steps = [...this.currentSteps]
        const lastStepData = this.currentSteps[this.currentSteps.length - 1]
        this.checkIsNext(lastStepData)
      }, this.delay);
    },

    checkIsNext(payload) {
      const { trigger = '', end = false } = payload
      if (!trigger || end) return
     
      this.$emit('on-next', payload)
    },

    async processRobotMessage(payload) {
      this.steps.push(sendLoadingRobot);
      await new Promise(resolve => setTimeout(() => {
        this.steps.splice(this.steps.length - 1, 1, payload)
        this.checkIsNext(payload)
        resolve()
      }, this.delay))

      this.scrollToDown()
    },

    scrollToDown() {
      this.$nextTick(() => {
        const element = this.$refs.bodyChatbot
        const top = element.scrollHeight
        element.scrollTo({
          top,
          behavior: 'smooth',
        })
      })
    },

    async processUserMessage(payload) {
      const { label = '', trigger = '' } = payload;
      const { options = [] } = this.steps[this.steps.length - 1]
      if (options?.length) {
        this.steps.splice(this.steps.length - 1, 1, sendLoadingUser)
      } else {
        this.steps.push(sendLoadingUser);
      }
      this.scrollToDown()
      await new Promise(resolve => setTimeout(() => {
        const newStep = { id: `user-${trigger}`, message: label, user: true };
        this.steps.splice(this.steps.length - 1, 1, newStep)
        this.$emit('on-next', payload)
        resolve()
      }, this.delay))

      this.scrollToDown()
    },

    handleTriggerByUser(payload, field) {
      const { label = '' } = payload;
      this.$emit('set-current-data', { ...payload, value: label, id: field })
      this.processUserMessage(payload)
    }
  }
}
</script>

<style scoped>
.vct-body-chatbot {
  height: calc(408px);
  overflow-y: scroll;
  padding-top: 6px;
}

.vct-options-message {
  padding: 0 5px;
  gap: 8px;
  display: inline-flex;
  flex-wrap: wrap;
}

.vct-option-item {
  background: var(--theme);
  border-radius: 22px;
  box-shadow: rgb(0 0 0 / 15%) 0 1px 2px 0;
  color: rgb(255, 255, 255);
  cursor: pointer;
  font-size: 14px;
  padding: 12px;
}

.vct-inline-message-robot {
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.vct-inline-message-user {
  align-items: flex-end;
  display: flex;
  -webkit-box-pack: start;
  justify-content: flex-end;
}

.vct-robot-image {
  display: inline-block;
  order: 0;
  padding: 6px;
}

.vct-robot-image img {
  animation: 0.3s ease 0s 1 normal forwards running Lmuha;
  border-radius: 50% 50% 0;
  box-shadow: rgb(0 0 0 / 15%) 0 1px 2px 0;
  height: 40px;
  min-width: 40px;
  padding: 3px;
  transform-origin: right bottom;
}

.vct-robot-message {
  animation: 0.3s ease 0s 1 normal forwards running Lmuha;
  background: var(--theme);
  border-radius: 18px 18px 18px 0;
  box-shadow: rgb(0 0 0 / 15%) 0 1px 2px 0;
  color: rgb(255, 255, 255);
  display: inline-block;
  font-size: 14px;
  max-width: 50%;
  margin: 0 0 10px;
  overflow: hidden;
  position: relative;
  padding: 12px;
  transform-origin: left bottom;
}

.vct-have-margin-left {
  margin-left: 47px;
}

.vct-have-margin-left .vct-robot-message {
  border-radius: 0 18px 18px 18px;
}

.vct-user-message {
  background: rgb(255, 255, 255);
  border-radius: 18px 18px 0;
  box-shadow: rgb(0 0 0 / 15%) 0 1px 2px 0;
  color: rgb(74, 74, 74);
  display: inline-block;
  font-size: 14px;
  max-width: 50%;
  margin: 0 0 10px;
  overflow: hidden;
  position: relative;
  padding: 12px;
  transform-origin: right bottom;
}

.vct-have-margin-right {
  margin-right: 47px;
}

.vct-have-margin-right .vct-user-message {
  border-radius: 18px 0 18px 18px;
}

.vct-user-image {
  display: inline-block;
  order: 1;
  padding: 6px;
}

.vct-custom-component {
  background: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 15%) 0 1px 2px 0;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0 6px 10px;
  padding: 16px;
}

.vct-user-image img {
  border-radius: 50% 50% 50% 0;
  box-shadow: rgb(0 0 0 / 15%) 0 1px 2px 0;
  height: 40px;
  min-width: 40px;
  padding: 3px;
  transform-origin: left bottom;
}

</style>
