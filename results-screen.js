// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class ResultsScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
  }

  continueClick() {
    app.flashcards.continue();
    app.flashcards.show();
    app.results.hide();
  }

  backToMenuClick() {
    app.flashcards.backToMenu();
    app.flashcards.show();
    app.results.hide();
  }

  continue() {
    var div = document.querySelector(".continue");
    div.addEventListener("click", this.continueClick);
  }

  backToMenu() {
    var div = document.querySelector(".to-menu");
    div.addEventListener("click", this.backToMenuClick);
  }

  showResults(numberCorrect, numberWrong) {
    console.log(numberCorrect);
    console.log(numberWrong);

    document.querySelector(".percent").textContent =
      (numberCorrect / (numberCorrect + numberWrong)) * 100;
    document.querySelectorAll("#results .correct").textContent = numberCorrect;
    document.querySelectorAll("#results .incorrect").textContent = numberWrong;

    this.continue();
    this.backToMenu();
  }

  show(numberCorrect, numberWrong) {
    this.containerElement.classList.remove("inactive");
    this.showResults(numberCorrect, numberWrong);
  }

  hide() {
    this.containerElement.classList.add("inactive");
  }
}
