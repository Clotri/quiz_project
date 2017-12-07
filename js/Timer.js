class Timer {
  constructor(checkAnswer) {
    this.time = 60;
    this.checkAnswer = checkAnswer;
    this.stopped = false;
    this.canvas = document.getElementById('timer');
    this.ctx = this.canvas.getContext('2d');
    this.deg = 0;
    this.rad = 0;
  }

  angRad(deg) {
     return deg * (Math.PI / 180);
 }

  start() {
   this.interval = setInterval(() => {
      if (!this.stopped) {
         this.deg += 6;
         this.rad = this.angRad(this.deg);
         this.ctx.beginPath();
         this.ctx.arc(75, 75, 70, 0, this.rad, false);
         this.ctx.lineWidth = 7;
         this.ctx.strokeStyle = '#2E8D5D';
         this.ctx.stroke();
         this.time -= 1;
         this.render();

         if (this.time === 0) {
            this.checkAnswer(null);
         }
      }
   }, 1000);
  }

  stopTimer(){
    clearInterval(this.interval);
    this.stopped = true;
  }

  reset() {
   clearInterval(this.interval);
   this.time = 60;
   this.deg = 0;
   this.rad = 0;
   this.ctx.clearRect(0, 0, 150, 150);
 }

  render() {
    document.querySelector('.seconds').innerHTML = `${this.time}`;
  }
}
