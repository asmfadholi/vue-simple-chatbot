<template>
  <div class="wrapper-chatbot">
     <vue-chatbot :steps="steps">
       <template v-slot:header>
          <div>Hi, Chatbot Here</div>
       </template>
     </vue-chatbot>
  </div>
</template>

<script>
import Options from './components/Options.vue'

export default {
  name: 'App',
  data() {
    return {
      steps: [
        {
          id: '1',
          hideInput: true,
          message: 'Hello World!',
          trigger: '2'
        },
        {
          id: '2',
          hideInput: true,
          options: [
            { id: 1, label: 'Number 1', trigger: '1' },
            { id: 2, label: 'Number 2', trigger: '1' },
            { id: 3, label: 'Option component long and long and long', trigger: '5' },
            { id: 4, label: 'User input phone number', trigger: '4' },
          ],
        },
        {
            id: '4',
            message: 'What is your phone number?',
            trigger: 'phone',
        },
        {
            id: 'phone',
            user: true,
            validator: (value) => {
              if (isNaN(value)) {
                return 'value should be a number';
              }
              return true;
            },
            trigger: '2'
        },
        {
            id: '5',
            hideInput: true,
            options: Options,
        },
      ]
    }
  }
}
</script>

<style>
.wrapper-chatbot {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
