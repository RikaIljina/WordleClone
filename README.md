# WordleClone
Wordle is a simple mastermind-like word guessing game (copyright with the New York Times). I am trying to build a simple clone in JavaScript. This is a learning project.

So far, I've been able to build the basic wordle mechanics, allow the user to input a word (restricting the input to letters only), check against a large non-curated dictionary whether the word is valid and compare it with a random secret word from a smaller dictionary. The comparison produces colors that indicate whether a letter is in the correct position (green) or present in the word but in the wrong position (yellow).

Originally, I had a bug resulting in the incorrect representation of double letters. I was able to fix this by implementing more loops that check for the presence of green letters and double letters in the words.

Note that the keyboard below the playing field is read-only; it cannot be used to enter the letters. Instead, the keyboard is used for input.

The keyboard input does not work on mobile devices, apparently because the character codes for latin letters are different on mobile. This issue needs to be fixed in the future.
