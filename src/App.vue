<template>
  <div id="app">
    <h1>开始测试</h1>
    <router-link to="/compt3">compt3路由组件</router-link>
    
    <router-view></router-view>
  </div>
</template>

<script>

import Compt3 from './components/Compt3.vue';

export default {
  components: {
     Compt3
  }
}
</script>