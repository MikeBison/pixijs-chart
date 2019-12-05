<template>
  <div id="app">
    <chart @tryAgain="a" :score="100" :transparent="false" />
  </div>
</template>

<script>
import chart from './components/chart.vue';

export default {
  name: 'app',
  components: {
    chart
  },
  methods: {
    a() {
      console.log(111);
    }
  },
  beforeCreate() {
    document.documentElement.style.fontSize = '50px';
  }
};
</script>

<style></style>
