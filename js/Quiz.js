class Quiz {
	constructor() {
		this.questions = [];	// baza pytań
		this.currentQuestionIndex = 0; // indeks aktualnego pytania
	 	this.timer = new Timer();
		this.getQuestions();
		this.activateButtons();
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
         console.log('correct');
      } else {
         console.log('incorrect');
      }
			this.nextQuestion();
			this.timer.reset();
   }

   activateButtons() {
      document.querySelector('.answertrue').addEventListener('click', () => {
			this.checkAnswer('True');
		});
		document.querySelector('.answerfalse').addEventListener('click', () => {
			this.checkAnswer('False');
		});
   }

	nextQuestion() {
		this.currentQuestionIndex += 1;

		if (this.currentQuestionIndex >= 10) {
			console.log('Koniec quizu');

	// przeście między pytaniami
 	nextQuestion() {
		this.currentQuestionIndex += 1;

		if (this.currentQuestionIndex === 10) {
			this.endQuiz();
		} else {
			this.render();
		}
	}


	endQuiz() {
		alert("Gratulacje");
	}


	// wyswietla aktualne pytanie na stronie
	render() {
		document.querySelector('.question').innerHTML = this.questions[this.currentQuestionIndex].question;
		this.timer.start();
	}
}
