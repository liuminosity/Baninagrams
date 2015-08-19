
var grid = [];
var lettersToCheck = ['I','N','T','D','E']
var startingX = lettersToCheck.length + 1;
var startingY = lettersToCheck.length + 1;

//size of board, aka # of row and column
var size = startingX * 2 + 2;

var Square = function() {
  this.letter = '',
  this.head = 0
}


//grid setup
for (var i = 0; i < size; i++) {
  var temp = [];
  for (var j = 0; j < size; j++) {
    temp.push(new Square());
  }
  grid.push(temp);
}

//  to access at (x,y), use grid[y][x]
//  grid[5][3] = 'a';
//  ===> (3,5) = 'a';







var startingPoint = [startingX, startingY];

//this is your current pool of letters
var letterBank = [];
var answer;

var checkForDirections = function(x,y) {
  var directions = "";
  if (grid[y][x + 1].letter !== '') {
    directions += "R"
  }
  if (grid[y+1][x].letter !== '') {
    directions += "D";
  }
  return directions;
}


var isXHead = function(x, y) {
  if (grid[y][x - 1].letter === '' && grid[y][x + 1].letter !== '') return true;
  return false;
}

var isYHead = function(x, y) {
  if (grid[y-1][x].letter === '' && grid[y + 1][x].letter !== '') return true;
  return false;
}

var allWordsAreWords = function() {
  for (var x = 0; x < size; x++) {
    for (var y = 0; y < size; y++) {
      if (grid[y][x].head > 0) {
        
        var directions = checkForDirections(x,y);

        //checks to the right and/or down
        for (var i = 0; i < directions.length; i++) {
          var isWord = false;
          var string = '';
          //right check
          if (directions[i] === "R") {
            for (var stringX = x; stringX < size; stringX++) {
              if (grid[y][stringX].letter === '') break;
              string += grid[y][stringX].letter;
            }
            

            if (lexicon(string[0]).indexOf(string) === -1) {
              return false;
              isWord = true;
              console.log(string);
              isWord = false;
            }

            //this is the endpoint for a right string

            //note to self: if it should break and just return false
          }
          

          //down check
          if (directions[i] === "D") {
            for (var stringY = y; stringY < size; stringY++) {
              if (grid[stringY][x].letter === '') break;
              string += grid[stringY][x].letter;
            }

            if (lexicon(string[0]).indexOf(string) === -1) {
              return false;
              isWord = true;
              console.log(string);
              isWord = false;
            }

            //this is the endpoint for a down string
          }
        }
      }
    }
  }
  return true;
}

var lexicon = function(letter) {
  if (letter === undefined) return [];
  var string = letter;
  string += "Array";
  return eval(string);
}



// var lexicon = [
//   "asdf",
//   "abcde",
//   "azg",
//   "basdf",
//   "cat",
//   "dog",
//   "dasd",
//   "fa",
//   'ab',
//   'bsf'

//   // 'be'


// ]


// grid[5][3] = {letter: 'a', head: 1};
// grid[6][3] = {letter: 'z', head: 1};
// grid[7][3] = {letter: 'g', head: 0};
// grid[5][4] = {letter: 'b', head: 1};
// grid[5][5] = {letter: 'c', head: 0};
// grid[5][6] = {letter: 'd', head: 0};
// grid[5][7] = {letter: 'e', head: 0};
// grid[6][4] = {letter: 'e', head: 0};
// grid[8][3] = {letter: 'e', head: 0};


var visibleGrid = function() {
  var visible = [];
  for (var i = 0; i < size; i++) {
    var temp = [];
    for (var j = 0; j < size; j++) {
      temp.push(grid[i][j].letter);
    }
    visible.push(temp);
  }
  return visible;
}



// allWordsAreWords();

// var breakUpLexicon = function() {
//   var superLexicon = {};
//   var alphabet = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

//   for (var i = 0; i < alphabet.length; i++) {
//     var allWordsForLetter = []
//     for (var j = 0; j < lexicon.length; j++) {
//       if (lexicon[j][0] === alphabet[i]) {
//         allWordsForLetter.push(lexicon[j]);
//       }
//     }
//     superLexicon[alphabet[i]] = allWordsForLetter;
//   }
//   return superLexicon;
// }

// console.dir(breakUpLexicon());







var found = false;


var counter = 0;




//recursively populate the board with letters in wordBank
var populateBoard = function(letters, currentX, currentY, currentLetter) {
  // console.log("checking (" + currentX + ', ' + currentY + ') with letter ' + currentLetter);
  grid[currentY][currentX].letter = currentLetter;
  counter++;
  // if (counter === 100000) {
  //   console.log("breaking");
  //   found = true;
  
  // console.table(visibleGrid());
  //might need to add a check if there is only 1 letter
  //base case
  if (letters.length === 0 && allWordsAreWords()) {
    console.log("FOUND!");
    console.table(visibleGrid());
    found = true;
    return;
  }


  if (!found) {
    for (var i = 0; i < letters.length; i++) {
      var tempLetters = letters.slice(0, i).concat(letters.slice(i+1));
      if (!found) {
        if (grid[currentY][currentX + 1].letter === '') {
          //recurse right
          grid[currentY][currentX + 1].head++;
          populateBoard(tempLetters, currentX + 1, currentY, letters[i])
          grid[currentY][currentX + 1].head--;
        }
      }
      if (!found) {
        if (grid[currentY + 1][currentX].letter === '') {
          //recurse down
          grid[currentY + 1][currentX].head++;
          populateBoard(tempLetters, currentX, currentY + 1, letters[i]);
          grid[currentY + 1][currentX].head--;
        }
      }
      if (!found) {
        //recurse left
          //check for space
          //make new head
        if (grid[currentY][currentX - 1].letter === '') {
          grid[currentY][currentX - 1].head++;
          populateBoard(tempLetters, currentX - 1, currentY, letters[i])
          grid[currentY][currentX - 1].head--;
        }
      }
      if (!found) {
        //recurse right
          //check for space
          //make new head
        if (grid[currentY - 1][currentX].letter === '') {
          grid[currentY - 1][currentX].head++;
          populateBoard(tempLetters, currentX, currentY - 1, letters[i])
          grid[currentY - 1][currentX].head--;
        }
      }
    }
  }

  grid[currentY][currentX].letter = '';


}

//efficiency:
//n = # of inputted Qs
//2: 41, 2.01ms
//3: 397, 10.8ms
//4: 4817, 100ms
//5: 68501, 1200ms
//6: 1164025, 21000ms

// grid[5][5].letter = 'a';
// console.table(visibleGrid());

grid[startingY][startingX].head = 1;
var t0 = performance.now();
populateBoard(lettersToCheck, startingX, startingY, '');
var t1 = performance.now();
console.log(t1-t0);
console.log(counter);