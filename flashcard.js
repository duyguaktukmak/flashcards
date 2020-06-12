// TODO(you): Modify the class in whatever ways necessary to implement
// the flashcard app behavior.
//
// You may need to do things such as:
// - Changing the constructor parameters
// - Adding methods
// - Adding additional fields

var stillDragging = 0;

var originPoint = [];
var newPosition = [0, 0]; //represents the new position

var whichCard = 0;

var howMuchTurn = [0, 0];
var howMuchTotalTurn = [0, 0];
var rotate = 0;
const morePositive = "#97b7b7";
const backMiddleware = "#d0e6df";
var result;
var incorrectCards = [];

class Flashcard {
  constructor(containerElement, frontText, backText) {
    this.containerElement = containerElement;

    this._flipCard = this._flipCard.bind(this);
    this._start = this._start.bind(this);
    this._drag = this._drag.bind(this);
    this._finish = this._finish.bind(this);
    this._calculateAndTransform = this._calculateAndTransform.bind(this);
    this._calculateResult = this._calculateResult.bind(this);
    this._changeColor = this._changeColor.bind(this);
    this._goResults = this._goResults.bind(this);

    this.flashcardElement = this._createFlashcardDOM(frontText, backText);
    this.containerElement.append(this.flashcardElement);

    this.flashcardElement.addEventListener("pointerup", this._flipCard);
    this.flashcardElement.addEventListener("pointerdown", this._start);
    this.flashcardElement.addEventListener("pointermove", this._drag);
    this.flashcardElement.addEventListener("pointerup", this._finish);
  }

  // Creates the DOM object representing a flashcard with the given
  // |frontText| and |backText| strings to display on the front and
  // back of the card. Returns a reference to root of this DOM
  // snippet. Does not attach this to the page.
  //
  // More specifically, this creates the following HTML snippet in JS
  // as a DOM object:
  // <div class="flashcard-box show-word">
  //   <div class="flashcard word">frontText</div>
  //   <div class="flashcard definition">backText</div>
  // </div>
  // and returns a reference to the root of that snippet, i.e. the
  // <div class="flashcard-box">
  _createFlashcardDOM(frontText, backText) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("flashcard-box");
    cardContainer.classList.add("show-word");

    const wordSide = document.createElement("div");
    wordSide.classList.add("flashcard");
    wordSide.classList.add("word");
    wordSide.textContent = frontText;

    const definitionSide = document.createElement("div");
    definitionSide.classList.add("flashcard");
    definitionSide.classList.add("definition");
    definitionSide.textContent = backText;

    cardContainer.appendChild(wordSide);
    cardContainer.appendChild(definitionSide);
    return cardContainer;
  }

  _flipCard(event) {
    this.flashcardElement.classList.toggle("show-word");
  }

  _calculateAndTransform(event) {
    var transform =
      "translate(" + howMuchTurn[0] + "px," + howMuchTurn[1] + "px) ";
    event.currentTarget.style.transform = transform;

    rotate = 0.2 * (event.clientX - originPoint[0]);

    var rotateDeg = "rotate(" + rotate + "deg)";
    event.currentTarget.style.transform = transform + rotateDeg;
  }

  _start(event) {
    console.log(event);
    event.currentTarget.setPointerCapture(event.pointerId);
    originPoint[0] = event.clientX;
    originPoint[1] = event.clientY;
    
    stillDragging = 1;
  }

  _changeColor() {
    if (event.clientX - originPoint[0] <= 150) {
      if (event.clientX - originPoint[0] >= -150) {
        document.body.style.backgroundColor = backMiddleware;
      }
    } else {
      document.body.style.backgroundColor = morePositive;
    }
  }

  _drag(event) {
    if (stillDragging === 0) {
      return;
    }

    const movementX = newPosition[0] + event.clientX;
    const differenceX = movementX - originPoint[0];
    howMuchTurn[0] = differenceX;

    const movementY = newPosition[1] + event.clientY;
    const differenceY = movementY - originPoint[1];
    howMuchTurn[1] = differenceY;

    howMuchTotalTurn[0] = howMuchTotalTurn[0] + howMuchTurn[0];
    howMuchTotalTurn[1] = howMuchTotalTurn[1] + howMuchTurn[1];

    this._calculateAndTransform(event);
    this._changeColor(event);
  }

  _calculateResult(event) {
    console.log(event);
    if (event.clientX - originPoint[0] > 150) {
      result = document.querySelector(".correct");
    } else if (event.clientX - originPoint[0] < -150) {
      result = document.querySelector(".incorrect");
      var incorrectIndex = whichCard - 1;
      incorrectCards.push([
        app.flashcards.firstWords[incorrectIndex][0],
        app.flashcards.secondWords[incorrectIndex][0],
      ]);
    }
    console.log(result);
    console.log(incorrectCards);
  }

  _goResults() {
    app.results.show(
      document.querySelector(".correct").textContent,
      document.querySelector(".incorrect").textContent
    );
  }

  _finish(event) {
    stillDragging = 0;

    if (event.clientX - originPoint[0] <= 150) {
      if (event.clientX - originPoint[0] >= -150) {
        console.log(event.currentTarget);
        var transform = "translate(0px,0px)" + "rotate(0 deg)";
        event.currentTarget.style.transform = transform;
      }
    } else {
      whichCard = whichCard + 1;

      this._calculateResult(event);

      result.textContent = Number(result.textContent) + 1;
      console.log(app.flashcards.firstWords);
      console.log(app.flashcards.firstWords.length);
      if (whichCard === app.flashcards.firstWords[0].length) {
        //console.log(whichCard);
        //console.log(app.flashcards.firstWords);
        this._goResults();
        app.flashcards.hide();
      }
    }
  }
}
