<template>
  <div class="game-type">
    <div class="text">Wybierz jakie słowo chcesz odgadywać:</div>
    <div class="wrapper">
      <PrimaryButton @click="randomWord()">Losowe</PrimaryButton>
    </div>
    <div class="text">lub</div>
    <div class="wrapper">
      <input
        v-model="inputWord"
        type="text"
        placeholder="Wprowadź swoje słowo"
      />
      <PrimaryButton @click="customWord">Zdefiniowane</PrimaryButton>
    </div>
    <div class="input-error" v-if="v$.inputWord.$error">
      {{ v$.inputWord.$errors[0]?.$message }}
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import { required, helpers } from "@vuelidate/validators";
import useValidate from "@vuelidate/core";

export default {
  name: "GameType",
  components: {
    PrimaryButton,
  },
  data() {
    return {
      v$: useValidate(),
      word: "",
      inputWord: "",
      showInput: false,
    };
  },
  validations() {
    return {
      inputWord: {
        required: helpers.withMessage("To pole jest wymagane", required),
        minLength: helpers.withMessage("Minimalnie 2 znaki", (value) => {
          if (value.length < 2) {
            return false;
          }
          return true;
        }),
        maxLength: helpers.withMessage("Maksymalnie 255 znaków", (value) => {
          if (value.length > 255) {
            return false;
          }
          return true;
        }),
        regex: helpers.withMessage("Użyj tylko liter", (value) => {
          const regex = /^[A-Za-z]+$/;
          if (!regex.test(value)) {
            return false;
          }
          return true;
        }),
      },
    };
  },
  methods: {
    randomWord() {
      const randomWords = [
        "papuga",
        "koszula",
        "rabarbar",
        "nauczyciel",
        "żonkil",
      ];
      const randomIndex = Math.floor(Math.random() * randomWords.length);
      this.$emit("useWord", randomWords[randomIndex]);
    },
    customWord() {
      this.v$.$validate();
      if (!this.v$.$error) {
        this.$emit("useWord", this.inputWord.toLowerCase());
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.game-type {
  .text {
    font-size: $font-size-lg;
    color: $white;
    padding: 20px 0;
  }
  .wrapper {
    display: flex;
    align-items: center;
    height: 44px;
    input,
    button {
      height: 100%;
    }
    input {
      font-size: $font-size-md;
      border: none;
      padding: 0 8px;
      height: 44px;
    }
  }
  .input-error {
    margin-top: 8px;
    font-weight: 600;
    color: $red;
  }
}
@media screen and (max-width: 767px) {
  .game-type {
    .text {
      font-size: $font-size-md;
      text-align: center;
    }
    .wrapper {
      height: auto;
      flex-direction: column;
      input {
        width: 60%;
        margin-bottom: 10px;
        font-size: $font-size-sm;
      }
    }
    .input-error {
      text-align: center;
      margin-top: 4px;
      font-size: $font-size-sm;
    }
  }
}
</style>
