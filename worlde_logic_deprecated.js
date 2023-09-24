inputs = [
  "l1",
  "l2",
  "l3",
  "l4",
  "l5",
  "l6",
  "l7",
  "l8",
  "l9",
  "l10",
  "l11",
  "l12",
  "l13",
  "l14",
  "l15",
  "l16",
  "l17",
  "l18",
  "l19",
  "l20",
  "l21",
  "l22",
  "l23",
  "l24",
  "l25",
  "l26",
  "l27",
  "l28",
  "l29",
  "l30",
];
rows = {
  1: ["l1", "l2", "l3", "l4", "l5"],
  2: ["l6", "l7", "l8", "l9", "l10"],
  3: ["l11", "l12", "l13", "l14", "l15"],
  4: ["l16", "l17", "l18", "l19", "l20"],
  5: ["l21", "l22", "l23", "l24", "l25"],
  6: ["l26", "l27", "l28", "l29", "l30"],
};

game_started = false;
last_active_cell_ix = 0;
active_row = [];
row_index = 1;
forbidden_l = "";
// const body = document.querySelector('body');
// body.onLoad = start;
window.addEventListener("load", start);

// alert(inputs);

function start() {
  game_started = true;
  // todays_word = words_dict[Math.floor(Math.random() * words_dict.length)];
  todays_word = small_dict[Math.floor(Math.random() * small_dict.length)];
  row_index = 1;
  forbidden_l = "";
  document.getElementById("l1").focus();
  for (el of inputs) {
    document.getElementById(el).value = "";
  }
  for (i = 0; i < inputs.length; i++) {
    document.getElementById(inputs[i]).style =
      "background-color: rgb(214, 212, 208)";
    if (i > 4) {
      document.getElementById(inputs[i]).disabled = true;
      document.getElementById(inputs[i]).style = "background-color: grey";
    } else {
      document.getElementById(inputs[i]).disabled = false;
    }
  }
  document.querySelectorAll("span").forEach((el) => {
    el.style = "background-color: rgb(191, 187, 183)";
  });

  document.getElementById("l1").focus();
  document.getElementById("m").scrollIntoView({ behavior: "smooth" });
  active_row = rows[row_index];
}

function restart_row() {
  for (el of active_row) {
    document.getElementById(el).value = "";
  }
  document.getElementById(active_row[0]).focus();
}
function l_change(active_cell) {
  if (!game_started) {
    l_input = document.getElementById(active_cell);
    document.getElementById(active_cell).value = "";
    return false;
  } else {
    l_input = document.getElementById(active_cell);
    l_input.addEventListener("keyup", function (event) {
      // alert(event.keyCode);
      code = event.keyCode;
      if ((code > 64 && code < 91) || (code > 96 && code < 123)) {
        // alert("now in " + inputs[0] + active_cell + (document.getElementById(inputs[0]) === active_cell))
        for (i = 0; i < active_row.length; i++) {
          if (active_row[i] == active_cell && active_row.length - 1 != i) {
            document.getElementById(active_row[i + 1]).focus();
            l_change(active_row[i + 1]);
          } else {
            // if (active_row.includes(active_cell)) {
            while ((last_active_cell_ix - 4) % 5 != 0) {
              last_active_cell_ix += 1;
            }
            last_active_cell_ix = inputs.indexOf(active_cell); // TODO: make sure last_active_cell_ix is 4, 9, 14 etc !!!!!
            // } else {
          }
        }
      } else if (
        code > 8 &&
        code <= 46 &&
        code != 32 &&
        document.getElementById(active_cell).value != ""
      ) {
        // alert("key special");
        document.getElementById(active_cell).focus();
        return;
      } else if (code == 8) {
        // check if backspace is pressed

        for (i = 1; i < active_row.length; i++) {
          if (active_row[i] == active_cell) {
            document.getElementById(active_cell).value = "";
            document.getElementById(active_row[i - 1]).focus();
          }
        }
      } else {
        // alert(code);
        document.getElementById(active_cell).value = "";
        document.getElementById(active_cell).focus();
      }
    });
  }
}
function check() {
  if (!game_started) {
    // check if game started
    return false;
  } else {
    full_word = false;
    for (el of active_row) {
      // check if full word
      if (document.getElementById(el).value != "") {
        full_word = true;
      } else {
        full_word = false;
        break;
      }
    }
    word = concat_word();
    valid_word = check_if_valid(word); //check if word valid
    if (valid_word) {
      compare_words(word);
    } else {
      restart_row();
    }
  }
}

function concat_word() {
  word = "";
  for (el of active_row) {
    word += document.getElementById(el).value;
  }
  return word;
}

function check_if_valid(word) {
  if (words_dict.includes(word)) {
    return true;
  } else {
    return false;
  }
}

function compare_words(word) {
  if (word == todays_word) {
    // alert("Congrats! You got it!");
    for (i = last_active_cell_ix - 4; i <= last_active_cell_ix; i++) {
      // word_ix = i % 5;
      document.getElementById(inputs[i]).style =
        "background-color: rgb(68, 185, 66)";
    }
    game_started = false;
    return;
  } else {
    // alert("Wrong! Try again");
    if (last_active_cell_ix == 29) {
      alert("You lost, the word was " + todays_word);
      game_started = false;
      return;
    } else {
      for (i = last_active_cell_ix - 4; i <= last_active_cell_ix; i++) {
        word_ix = i % 5;
        // var last_letter;
        if (word[word_ix] == todays_word[word_ix]) {
          // make green if correct letter
          document.getElementById(inputs[i]).style =
            "background-color: rgb(68, 185, 66)";
          document.getElementById(word[word_ix]).style =
            "background-color: rgb(68, 185, 66)";
        } else if (todays_word.includes(word[word_ix])) {
          //if letter in word, check for doubles

          if (check_double_letter(word, word_ix)) {
            // if no doubles or doubles in todays word, make yellow
            document.getElementById(inputs[i]).style =
              "background-color: yellow";
            document.getElementById(word[word_ix]).style =
              "background-color: yellow";
          } else {
            // alert("forbidden loop for letter " + word[word_ix]);
            if (forbidden_l == word[word_ix]) {
              // if double letter in input word only, check if already yellowed
              document.getElementById(inputs[i]).style =
                "background-color: rgb(214, 212, 208)";
              document.getElementById(word[word_ix]).style =
                "background-color: rgb(214, 212, 208)";
              // alert("forb eq");
            } else {
              document.getElementById(inputs[i]).style =
                "background-color: yellow";
              document.getElementById(word[word_ix]).style =
                "background-color: yellow";
              forbidden_l = word[word_ix];
              // alert("end: forbidden letter " + forbidden_l);
            }
          }
        } else {
          // alert("not included: " + word[word_ix]);
          document.getElementById(inputs[i]).style =
            "background-color: rgb(214, 212, 208)";
          document.getElementById(word[word_ix]).style =
            "background-color: grey";
        }
        // last_letter = word[word_ix];
      }
    }

    next_row();
  }
}
String.prototype.count = function (l) {
  //count the number of occurrences of a character in a string
  var result = 0,
    i = 0;
  for (i; i < this.length; i++) {
    if (this[i] == l) {
      result++;
    }
  }
  return result;
};

function check_double_letter(word, i) {
  if (word.count(word[i]) > 1) {
    alert("You have double letters in the word!");
    if (todays_word.count(word[i]) > 1) {
      alert("the double letters are double in todays word!");
      return true;
    } else {
      alert("double letters in your word but only one in todays word!");
      for (j = last_active_cell_ix - 4; j <= last_active_cell_ix; j++) {
        word_ix = j % 5;
        // var last_letter;
        if (word[word_ix] == todays_word[word_ix]) {
          // if the letter would be green
          forbidden_l = word[i];
          return false;
        }
        //else {forbidden_l = word[i]; alert(forbidden_l); return false; }
      }
      
      return false;
    }
  } else {
    return true;
  }
}

function next_row() {
  row_index += 1;
  active_row = rows[row_index];
  for (i = 0; i < inputs.length; i++) {
    //disable all
    document.getElementById(inputs[i]).disabled = true;
  }
  for (i = row_index * 5 - 5; i < row_index * 5; i++) {
    //enable new active
    document.getElementById(inputs[i]).disabled = false;
    document.getElementById(inputs[i]).style =
      "background-color: rgb(214, 212, 208)";
  }
  document.getElementById(active_row[0]).focus();
  // alert(todays_word);
}

//TODO: Tastatusanzeige!!! und double letters rausschmeißen
