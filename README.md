# WordleClone
Wordle is a simple mastermind-like word guessing game (copyright with the New York Times). I am trying to build a simple clone in JavaScript. This is a learning project.
<br> <br>
So far, I've been able to build the basic wordle mechanics, allow the user to input a word (restricting the input to letters only), check against a large non-curated dictionary whether the word is valid and compare it with a random secret word from a smaller dictionary. The comparison produces colors that indicate whether a letter is in the correct position (green) or present in the word but in the wrong position (yellow).<br>
The mechanics work up until the point where the user inputs a double letter. If both are in the wrong position, only one should be shown as yellow. If the letter is present more than once in the secret word, one of the user input letters should be green if in the right position while the other should be yellow.<br><br>
My code still contains a bug which results in wrong colors when double letters are involved.

## TODO:
- [] fix bug related to double letters
- [] remove all redundant code and comments
