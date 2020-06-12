// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

class MenuScreen {
  constructor(containerElement) {
    this.containerElement = containerElement;
    this.createMenuElements();
  }

  createMenuElements() {
    let lengthOfMenu = FLASHCARD_DECKS.length;
    const containDiv = document.getElementById("choices");

    for (let i = 0; i < lengthOfMenu; i++) {
      const div = document.createElement("div");
      var div_text = document.createTextNode(FLASHCARD_DECKS[i].title);
      div.appendChild(div_text);
      containDiv.appendChild(div);
    }

    const clickDivs = document.querySelectorAll("#choices");
    for (const div of clickDivs) {
      div.addEventListener("click", this.changeToClicked);
    }
  }

  changeToClicked(event) {
    
    console.log(event.target.innerText);

    var whichWords = FLASHCARD_DECKS.find(x => x.title === event.target.innerText).words;
    console.log(whichWords);

    app.flashcards.fulfillCards(whichWords);

    app.flashcards.show();
    app.menu.hide();
  }

  show() {
    this.containerElement.classList.remove("inactive");
  }

  hide() {
    this.containerElement.classList.add("inactive");
  }
}
