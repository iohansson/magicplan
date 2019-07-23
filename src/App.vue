<template lang="pug">
  #app
    buy
</template>

<script>
import Buy from './views/Buy.vue';

export default {
  name: 'app',
  components: {
    Buy,
  },
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

#app {
  font-family: Noto Sans, Helvetica Neue, Helvetica, Arial, sans-serif;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 30px;
  height: auto;
  min-height: 100%;
  background-color: #f6f6f6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.divider {
  height: 2px;
  border-top: 1px solid #f4f4f4;
  margin: 0 10px;
  border-bottom: 1px solid #979797;
  opacity: .3;
}
</style>
