# Vue Simple Chatbot

## Getting Start

```bash
npm install vue-simple-chatbot --save

# or use yarn

yarn add vue-simple-chatbot
```

## Usage

### Import as local component

``` javascript
import VueChatbot from 'vue-simple-chatbot';
import 'vue-simple-chatbot/dist/vue-simple-chatbot.css'

export default {
  name: 'App',
  components: {
    VueChatbot
  }
}
```

### Import as global component

``` javascript
import { createApp } from 'vue'
import VueChatbot from 'vue-simple-chatbot';
import App from './App.vue'
import 'vue-simple-chatbot/dist/vue-simple-chatbot.css'

const app = createApp(App)

app.use(VueChatbot)

app.mount('#app')

```

### Use the component

``` vue
<template>
   <vue-chatbot :steps="steps" />
</template>

<script>

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
                        { id: 1, label: 'Option 1', trigger: '1' },
                        { id: 2, label: 'Option 2', trigger: '3' },
                    ],
                },
                {
                    id: '3',
                    hideInput: true,
                    message: 'Bye',
                    end: true
                },
            ]
        }
    }
}

</script>

```
## License

Inspired by [React Simple Chatbot](https://lucasbassetti.com.br/react-simple-chatbot/)
