<template>
  <div id="app">
    <chart @tryAgain="a" :score="score" :transparent="false" />
  </div>
</template>

<script>
import chart from './components/chart.vue';

export default {
  name: 'app',
  components: {
    chart
  },
  data() {
    return {
      score: 56
    };
  },
  methods: {
    a() {
      this.score = 86;
    }
  },
  beforeCreate() {
    document.documentElement.style.fontSize = '50px';
  }
};
</script>

<style></style>
