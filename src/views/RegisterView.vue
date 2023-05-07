<template>
  <div>
    <MainHeader>Wisielec</MainHeader>
    <FormComponent @submitForm="handleSubmitForm">
      <h1 class="title">Rejestracja</h1>
      <div class="input-group">
        <label for="name">Nazwa użytkownika:</label>
        <input id="name" v-model="name" type="text" name="name" />
        <div class="input-error" v-if="v$.name.$error">
          {{ v$.name.$errors[0]?.$message }}
        </div>
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="text" name="email" />
        <div class="input-error" v-if="v$.email.$error">
          {{ v$.email.$errors[0]?.$message }}
        </div>
      </div>
      <div class="input-group">
        <label for="password">Hasło:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          name="password"
        />
        <div class="input-error" v-if="v$.password.$error">
          {{ v$.password.$errors[0]?.$message }}
        </div>
      </div>
      <div class="input-group">
        <label for="repeat-password">Powtórz Hasło:</label>
        <input
          id="repeat-password"
          v-model="repeatPassword"
          type="password"
          name="repeat-password"
        />
        <div class="input-error" v-if="v$.repeatPassword.$error">
          {{ v$.repeatPassword.$errors[0]?.$message }}
        </div>
      </div>
      <PrimaryButton type="submit"> Zarejestruj </PrimaryButton>
      <div class="backend-error">{{ backendError }}</div>
      <div><router-link to="/login"> Logowanie </router-link></div>
    </FormComponent>
  </div>
</template>

<script>
import FormComponent from "@/components/FormComponent.vue";
import MainHeader from "@/components/MainHeader.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import useValidate from "@vuelidate/core";
import api from "@/services/api";
import helper from "@/services/helper";
import { required, helpers, email } from "@vuelidate/validators";

export default {
  name: "RegisterView",
  created() {
    helper.redirectToMainPage();
  },
  components: {
    PrimaryButton,
    MainHeader,
    FormComponent,
  },
  data() {
    return {
      v$: useValidate(),
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
      backendError: "",
    };
  },
  validations() {
    return {
      name: {
        required: helpers.withMessage("To pole jest wymagane", required),
        minLength: helpers.withMessage("Minimalnie 3 znaki", (value) => {
          if (value.length < 3) {
            return false;
          }
          return true;
        }),
        maxLength: helpers.withMessage("Maksymalnie 64 znaki", (value) => {
          if (value.length > 64) {
            return false;
          }
          return true;
        }),
      },
      email: {
        required: helpers.withMessage("To pole jest wymagane", required),
        email: helpers.withMessage("Pole musi być adresem email", email),
        maxLength: helpers.withMessage("Maksymalnie 255 znaków", (value) => {
          if (value.length > 255) {
            return false;
          }
          return true;
        }),
      },
      password: {
        required: helpers.withMessage("To pole jest wymagane", required),
        minLength: helpers.withMessage("Minimalnie 8 znaków", (value) => {
          if (value.length < 8) {
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
      },
      repeatPassword: {
        required: helpers.withMessage("To pole jest wymagane", required),
        sameAsPassword: helpers.withMessage(
          "Hasła muszą być identyczne",
          (value) => {
            if (value !== this.password) {
              return false;
            }
            return true;
          }
        ),
      },
    };
  },
  methods: {
    async handleSubmitForm(data) {
      this.name = data.name;
      this.email = data.email;
      this.password = data.password;
      await this.submitForm();
    },
    async submitForm() {
      try {
        this.backendError = "";
        this.v$.$validate();
        if (!this.v$.$error) {
          const response = await api.register(
            this.name,
            this.email,
            this.password
          );
          if (response.data.token) {
            localStorage.setItem("hangman_token", response.data.token);
            localStorage.setItem(
              "hangman_user",
              JSON.stringify(response.data.user)
            );
            helper.redirectToMainPage();
          }
          if (response.data.errors) {
            this.backendError = response.data.message;
          }
        }
      } catch (error) {
        if (error.response.data.errors) {
          this.backendError = error.response.data.message;
        }
      }
    },
  },
};
</script>
