// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Rewriting some of the existing methods, such as changing code in `show()`
// - Adding methods
// - Adding additional fields

class FlashcardScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.firstWords = [];
    this.secondWords = [];
  }

  fulfillCards(words) {
    this.firstWords = [Object.keys(words)];
    this.secondWords = [Object.values(words)];
  }

  show() {
    this.containerElement.classList.remove("inactive");
    const flashcardContainer = document.querySelector("#flashcard-container");
    const card = new Flashcard(
      flashcardContainer,
      this.firstWords[whichCard][0],
      this.secondWords[whichCard][0]
    );
  }

  hide() {
    this.containerElement.classList.add("inactive");
  }

  continue(){
    whichCard = 0;
    this.firstWords = [];
    this.secondWords = [];
  }

  backToMenu(){
    whichCard = 0;
  }

}
