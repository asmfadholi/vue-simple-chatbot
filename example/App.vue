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
import DetailData from './components/DetailData.vue'

export default {
  name: 'App',
  data() {
    return {
      steps: [
        {
          id: '1',
          hideInput: true,
          message: 'Hi There, May I know you?',
          trigger: '2'
        },
        {
          id: '2',
          hideInput: true,
          options: [
            { id: 1, label: 'Yes, of course', trigger: 'yes' },
            { id: 2, label: 'No', trigger: 'no' }
          ],
        },
        {
          id: 'no',
          hideInput: true,
          end: true,
          message: 'Oke fine, enjoy your activities!'
        },
        {
            id: 'yes',
            message: 'Ok, What is your name?',
            trigger: 'name',
        },
        {
            id: 'name',
            user: true,
            trigger: 'question-gender',
        },
        {
            id: 'question-gender',
            message: 'What is your gender?',
            trigger: 'gender',
        },
        {
            id: 'gender',
            options: [
              { id: 1, label: 'Male', trigger: '5' },
              { id: 2, label: 'Female', trigger: '5' }
            ],
        },
        {
            id: '5',
            hideInput: true,
            options: DetailData,
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
