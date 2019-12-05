<template>
  <div class="chart" id="__chart"></div>
</template>

<script>
import * as PIXI from 'pixi.js';
export default {
  name: 'chart',
  props: {
    score: Number,
    transparent: Boolean
  },
  data() {
    return {
      scale: '0',
      radio: 0,
      stop: false,
      textStop: false
    };
  },
  methods: {
    createChart() {
      this.container = new PIXI.Container();

      this.chartCntainer = new PIXI.Container();
      var circle = new PIXI.Graphics();
      circle.lineStyle(12, 0xffffff, 0.5);
      circle.arc(110, 110, 98, 0.75 * Math.PI, 0.25 * Math.PI, false); //绘制圆
      circle.endFill();

      this.circleMove = new PIXI.Graphics();
      this.circleMove.lineStyle(12, 0xffffff, 1);
      this.circleMove.arc(110, 110, 98, 0.75 * Math.PI, 0.75 * Math.PI + 0 * Math.PI, false); //绘制圆
      this.circleMove.endFill();

      var circleS = new PIXI.Graphics();
      circleS.lineStyle(1, 0xffffff, 1);
      circleS.beginFill(0xffffff);
      circleS.drawCircle(40, 178, 5, 0.75 * Math.PI, 0.25 * Math.PI, false); //绘制圆
      circleS.endFill();

      var circleE = new PIXI.Graphics();
      circleE.lineStyle(1, 0xffffff, 0.5);
      circleE.beginFill(0xffffff, 0.5);
      circleE.arc(180, 179, 5, 0.26 * Math.PI, 1.18 * Math.PI, false); //绘制圆
      circleE.endFill();

      this.allScore = new PIXI.Graphics();
      this.allScore.visible = false;
      this.allScore.lineStyle(1, 0xffffff, 1);
      this.allScore.beginFill(0xffffff, 1);
      this.allScore.drawCircle(180, 179, 5); //绘制圆
      this.allScore.endFill();

      this.chartCntainer.addChild(circle, this.circleMove, circleS, circleE, this.allScore);

      this.button = new PIXI.Container();
      this.button.interactive = true;
      this.button.buttonMode = true;
      let button = new PIXI.Graphics();
      button.beginFill(0xffffff);
      button.drawRoundedRect(0, 0, 132, 42, 22);
      button.endFill();
      this.button.position.set(110 - 66, 184);
      this.button.addChild(button);

      // this.button.visible = false

      let textStyle = new PIXI.TextStyle({
        fontFamily: '微软雅黑',
        fontSize: 24,
        textAlign: 'center',
        fill: ['#3DA2FF']
      });
      let buttonText = new PIXI.Text(`再测一次`, textStyle);
      buttonText.position.set(66 - buttonText.width / 2, 21 - buttonText.height / 2);
      this.button.addChild(buttonText);

      let scoreContainer = new PIXI.Container();
      let scoreTextStyle = new PIXI.TextStyle({
        fontFamily: '微软雅黑',
        fontSize: 22,
        textAlign: 'center',
        fill: ['#ffffff']
      });
      let scoreText = new PIXI.Text(`健康指数`, scoreTextStyle);

      let scoreStyle = new PIXI.TextStyle({
        fontFamily: '微软雅黑',
        fontSize: 56,
        fontWeight: 'bold',
        textAlign: 'right',
        fill: ['#ffffff']
      });
      this.scoreNumText = new PIXI.Text(0, scoreStyle);
      // this.scoreNumText.width = 300;
      this.scoreNumText.y = -56;
      this.scoreNumText.x = 0;

      let unitStyle = new PIXI.TextStyle({
        fontFamily: '微软雅黑',
        fontSize: 26,
        fontWeight: 'bold',
        textAlign: 'center',
        fill: ['#ffffff']
      });
      this.unit = new PIXI.Text('分', unitStyle);
      this.unit.y = -30;
      this.unit.x = this.scoreNumText.width + 3;

      scoreContainer.position.set(110 - scoreText.width / 2, 130);
      scoreContainer.addChild(scoreText, this.unit, this.scoreNumText);

      this.button.on('touchstart', this.again);

      this.stage.addChild(this.container);
      this.container.addChild(this.button, this.chartCntainer, scoreContainer);

      this.loop();
    },
    again() {
      this.$emit('tryAgain');
    },
    loop() {
      this.showChart();
      this.showNumber();
      if (!(this.stop && this.textStop)) {
        requestAnimationFrame(this.loop);
      }
    },
    showNumber() {
      if (parseInt(this.scoreNumText.text) < this.score) {
        this.scoreNumText.text = parseInt(this.scoreNumText.text) + 1;
        this.unit.x = this.scoreNumText.x + this.scoreNumText.width + 3;
      } else {
        if (this.score === 100) {
          this.scoreNumText.x -= 20;
          this.unit.x = this.scoreNumText.x + this.scoreNumText.width + 3;
        }
        this.textStop = true;
      }
    },
    showChart() {
      this.chartCntainer.removeChild(this.circleMove);

      if (this.radio <= 1.5 * (this.score / 100)) {
        this.radio += 0.02;
      } else {
        if (this.score === 100) {
          this.allScore.visible = true;
        }
        this.stop = true;
      }

      this.circleMove = new PIXI.Graphics();
      this.circleMove.lineStyle(12, 0xffffff, 1);
      this.circleMove.arc(110, 110, 98, 0.75 * Math.PI, 0.75 * Math.PI + this.radio * Math.PI, false); //绘制圆
      this.circleMove.endFill();

      this.chartCntainer.addChild(this.circleMove);
    }
  },
  created() {
    this.app = new PIXI.Application({
      width: 220,
      height: 230,
      transparent: this.transparent
      // view: document.getElementById('game')
    });
    this.stage = this.app.stage;
    this.scale = parseInt(document.documentElement.style.fontSize) / 100;
  },
  mounted() {
    document.getElementById('__chart').appendChild(this.app.view);
    this.app.view.style.transform = `scale(${this.scale})`;
    // this.app.view.style.transform = `scale(1)`;
    this.app.view.style.transformOrigin = '0 0';
    this.createChart();
  }
};
</script>

<style scoped></style>
