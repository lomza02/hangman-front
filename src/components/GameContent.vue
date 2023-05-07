<template>
  <div class="hangman-game">
    <div class="hangman-game-header">
      <div><span class="color-caption">Gracz:</span> {{ user.name }}</div>
      <MainHeader>Wisielec</MainHeader>
      <div><span class="color-caption">Czas:</span> {{ time }} sec</div>
    </div>
    <div v-if="gameOver" class="hangman-game-body">
      <div class="game-over">
        <div class="game-over-header">Koniec gry</div>
        <div class="game-over-results">
          <div v-if="isWin" class="game-over-line">Wygrana</div>
          <div v-else class="game-over-line">
            <span class="color-lose">Przegrana</span>
          </div>
          <div class="game-over-line">
            Słowo: <span class="color">{{ word }}</span>
          </div>
          <div class="game-over-line">
            Czas: <span class="color">{{ time }} sec</span>
          </div>
          <div class="game-over-line">
            Punkty: <span class="color">{{ score }}</span>
          </div>
        </div>
        <PrimaryButton @click="handlePlayAgain">
          Zagraj ponownie
        </PrimaryButton>
      </div>
    </div>
    <div v-else class="hangman-game-body">
      <div class="word-display">
        <span class="word-caption">Definicja:</span>
        <div>
          <div v-for="(letter, index) in word" :key="index" class="letter">
            {{ guessedLetters.includes(letter) ? letter : "_" }}
          </div>
        </div>
      </div>
      <div class="chances">
        <span v-for="index in guessesLeft" :key="index">
          <img
            class="hearth"
            :src="require('@/assets/hearth.png')"
            alt="hearth"
          />
        </span>
      </div>
      <div class="guesses">
        <div class="guessed-letters">
          <span class="guessed-letters-caption">Nietrafione litery:</span>
          <div
            v-for="(letter, index) in missedLetters"
            :key="index"
            class="letter"
          >
            {{ letter }}
          </div>
        </div>
      </div>
      <form @submit.prevent="handleGuessLetter">
        <div class="form-body">
          <label> Litera: </label>
          <input v-model="inputLetter" type="text" maxlength="1" />
          <PrimaryButton type="submit"> Zgaduj </PrimaryButton>
        </div>
        <div class="input-error" v-if="v$.inputLetter.$error">
          {{ v$.inputLetter.$errors[0]?.$message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import { helpers } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";
import User from "@/models/User";
import api from "@/services/api";
import helper from "@/services/helper";

export default {
  name: "GameContent",
  components: {
    PrimaryButton,
    MainHeader,
  },
  props: {
    word: {
      type: String,
      default: "",
    },
    gameId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      v$: useValidate(),
      user: new User(helper.getUser()),
      guessesLeft: 6,
      guessedLetters: [],
      missedLetters: [],
      inputLetter: "",
      gameOver: false,
      isWin: false,
      timer: null,
      time: 0,
      score: 0,
    };
  },
  validations() {
    return {
      inputLetter: {
        regex: helpers.withMessage("Użyj tylko liter", (value) => {
          const regex = /^[A-Za-z]+$/;
          if (value.length > 0 && !regex.test(value)) {
            return false;
          }
          return true;
        }),
      },
    };
  },
  mounted() {
    if (!this.gameOver) {
      this.startTimer();
    }
  },
  methods: {
    async updateScore() {
      const response = await api.updateScore(this.gameId, this.time, this.word);
      if (response?.data?.data) {
        this.score = response.data.data.score;
      }
    },
    isGuessed() {
      return this.word
        .split("")
        .every((letter) => this.guessedLetters.includes(letter));
    },
    isMissed() {
      return this.guessesLeft == 0;
    },
    handlePlayAgain() {
      this.guessesLeft = 6;
      this.guessedLetters = [];
      this.missedLetters = [];
      this.inputLetter = "";
      this.gameOver = false;
      this.isWin = false;
      this.$emit("clearWord");
    },
    handleGuessLetter() {
      this.guessLetter();
      if (this.isGuessed()) {
        this.stopTimer();
        this.updateScore();
        this.gameOver = true;
        this.isWin = true;
      }

      if (this.isMissed()) {
        this.gameOver = true;
        this.isWin = false;
        this.stopTimer();
      }
    },
    guessLetter() {
      this.v$.$validate();
      if (!this.v$.$error) {
        const inputLetter = this.inputLetter.toLowerCase();
        if (this.guessedLetters.includes(inputLetter)) {
          this.inputLetter = "";
          return;
        }
        this.guessedLetters.push(inputLetter);
        if (!this.word.toLowerCase().includes(inputLetter)) {
          this.guessesLeft--;
          this.missedLetters.push(inputLetter);
        }
        this.inputLetter = "";
      }
    },
    startTimer() {
      this.timer = setInterval(() => {
        this.time++;
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.timer);
    },
  },
};
</script>

<style lang="scss" scoped>
.guessed-letters-caption {
  font-size: $font-size-xl;
}

.word-caption,
.guessed-letters-caption,
.hangman-game-header,
.game-over-header,
.game-over-line,
label {
  font-family: $arcade-font;
  letter-spacing: 2px;
}

.hangman-game {
  padding: 10% 0;
  color: white;
  background-color: $black;
  text-align: center;
  .hangman-game-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 30px;
    min-height: 200px;
    font-size: $font-size-lg;
    .color-caption {
      color: $orange;
    }
  }
}

.hangman-game-body {
  .word-display {
    font-size: $font-size-xxl;
    margin: 32px;
    .word-caption {
      font-size: $font-size-xxl;
      color: $white;
    }
  }

  .chances {
    display: flex;
    flex-direction: flex-start;
    gap: 10px;
    margin: 32px;
    .hearth {
      width: 40px;
    }
  }

  .guesses {
    display: flex;
    justify-content: space-between;
    margin: 32px;
    .guessed-letters {
      display: flex;
      justify-content: center;
      .letter {
        font-size: 30px;
        margin: 0 16px;
      }
    }
  }

  .letter {
    display: inline-block;
    width: 48px;
    height: 48px;
    border: $border;
    text-align: center;
    font-size: $font-size-xl;
    text-transform: uppercase;
    margin: 8px;
  }
  form {
    margin: 32px auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      font-size: $font-size-lg;
      padding: 8px;
      border-radius: 5px;
      border: $border;
    }
    label {
      font-size: $font-size-lg;
      margin-right: 16px;
    }
    .input-error {
      width: 100%;
      font-size: 16px;
      margin-top: 8px;
      font-weight: 600;
      color: $red;
    }
  }

  .game-over {
    .game-over-header {
      font-size: $font-size-xxl;
      margin-bottom: 40px;
    }
    .game-over-results {
      margin-bottom: 40px;
      .game-over-line {
        font-size: $font-size-xl;
        margin-bottom: 10px;
        .color {
          color: $orange;
        }

        .color-lose {
          color: $red;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .guessed-letters-caption {
      font-size: $font-size-md;
    }

    .word-caption,
    .guessed-letters-caption,
    .hangman-game-header,
    .game-over-header,
    .game-over-line,
    label {
      font-size: $font-size-md;
      letter-spacing: 1px;
    }

    .hangman-game {
      padding: 5% 0;
    }
    .hangman-game-body {
      .word-display {
        display: flex;
        font-size: $font-size-md;
        margin: 16px;
        .word-caption {
          font-size: $font-size-md;
        }
      }
    }
    .chances {
      display: flex;
      justify-content: center;
      margin: 16px;
      .hearth {
        width: 30px;
      }
    }

    .guesses {
      margin: 16px;
      .guessed-letters {
        display: flex;
        .letter {
          font-size: $font-size-sm;
          width: 30px;
          height: 30px;
          margin: 0 2px;
        }
      }
    }

    .letter {
      width: 40px;
      height: 40px;
      font-size: $font-size-md;
      margin: 4px;
    }

    form {
      margin: 16px auto;
      .form-body {
        display: flex;
        flex-direction: column;
        input {
          font-size: $font-size-md;
          padding: 6px;
        }
        label {
          font-size: $font-size-md;
          margin-right: 8px;
        }
      }
      .input-error {
        font-size: $font-size-sm;
      }
    }

    .game-over {
      .game-over-header {
        font-size: $font-size-xl;
        margin-bottom: 20px;
      }
      .game-over-results {
        margin-bottom: 20px;
        .game-over-line {
          font-size: $font-size-md;
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>
