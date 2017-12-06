class Quiz {
	constructor() {
		this.questions = [];	// baza pytań
		this.currentQuestionIndex = 0; // indeks aktualnego pytania
	 	this.timer = new Timer(this.checkAnswer.bind(this));
		this.getQuestions();
		this.activateButtons();
		this.points = 0;
	}

	// Przypisanie pytań do this.questions
	getQuestions() {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', 'https://opentdb.com/api.php?amount=10&type=boolean', true);
		xhr.send();

		xhr.onload = () => {
			if (xhr.status === 200) {
            const responseObject = JSON.parse(xhr.responseText);
		      this.questions = responseObject.results;
            console.log(this.questions);
				this.render();
			}
		}
	}

   checkAnswer(answer) {
      if (answer === this.questions[this.currentQuestionIndex].correct_answer) {
         this.addPoint();
      } else {
         console.log('incorrect');
      }
			this.nextQuestion();
			this.timer.reset();
   }

	 addPoint() {
		this.points += 1;
	 }

	 renderPoints() {
		document.querySelector('.number').innerHTML = this.points;
	 }

   activateButtons() {
      document.querySelector('.answertrue').addEventListener('click', () => {
			this.checkAnswer('True');
		});
		document.querySelector('.answerfalse').addEventListener('click', () => {
			this.checkAnswer('False');
		});
   }

	// przeście między pytaniami
 	nextQuestion() {
		this.currentQuestionIndex += 1;

		if (this.currentQuestionIndex === 10) {
			this.endQuiz();
		} else {
			this.render();
			this.renderPoints();
		}
	}

	endQuiz() {
		this.timer.stopTimer();
		document.querySelector('.middle').innerHTML = `
		 <div class="congrats">
			 Congratulations!
		 </div>
		 <div class="result">
			Your Score: ${this.points} pkt
		 </div>
		 <div class="pointline">
			 <div class="redline" style="left:${this.points*10}%;"></div>
		 </div>
		 <div class="undertheline">
			 <div class="pointleft">0</div>
			 <div class="timeresults" style="display: none;">Your time:</div>
			 <div class="pointright">10</div>
		 </div>
		`;
	}

	// wyswietla aktualne pytanie na stronie
	render() {
		document.querySelector('.question').innerHTML = this.questions[this.currentQuestionIndex].question;
		this.timer.start();
	}
}
