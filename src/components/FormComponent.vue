<template>
  <div class="form-container">
    <form @submit.prevent="submitForm($event)">
      <slot></slot>
    </form>
  </div>
</template>

<script>
export default {
  name: "FormComponent",
  methods: {
    submitForm(event) {
      const formData = new FormData(event.target);
      const formValues = {};
      for (let [key, value] of formData.entries()) {
        formValues[key] = value;
      }
      this.$emit("submitForm", formValues);
    },
  },
};
</script>

<style lang="scss">
.form-container {
  background-color: black;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  form {
    display: flex;
    flex-direction: column;
    background-color: $white;
    border-radius: 10px;
    padding: 40px;
    box-shadow: 0px 0px 10px $black;
    .title {
      color: $light-gray;
      font-size: $font-size-xxl;
      text-align: center;
      text-shadow: 2px 2px $black;
    }
    .input-group {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      .input-error {
        font-weight: 600;
        color: $red;
      }

      label {
        color: $black;
        font-size: 20px;
        margin-bottom: 10px;
      }

      input {
        height: 30px;
        border-radius: 5px;
        border: $border;
        font-size: $font-size-md;
        padding: 5px;
      }
    }
    .backend-error {
      padding: 20px 0;
      font-weight: 600;
      color: $red;
    }
  }
}
</style>
