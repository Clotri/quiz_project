class Quiz {
	constructor() {
		this.questions = [];	// baza pytań
		this.currentQuestionIndex = 0; // indeks aktualnego pytania
		this.getQuestions();
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
	}
}
