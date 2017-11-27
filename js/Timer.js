class Timer {
  constructor() {
    this.time = 60;
  }

  start() {
   this.interval = setInterval(() => {
      this.time -= 1;
      this.render();

      if (this.time === 0) {
         this.endOfTime();
      }
   }, 1000);
  }

  reset() {
   this.time = 60;
 }

  endOfTime() {
     clearInterval(this.interval);
     console.log('End of time');
  }

  render() {
    document.querySelector('.seconds').innerHTML = `${this.time}`;
  }
}
