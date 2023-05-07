<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "PrimaryButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => ["primary", "secondary", "danger"].includes(value),
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg"].includes(value),
    },
  },
  computed: {
    buttonClass() {
      return `button-${this.variant} button-${this.size}`;
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("handleClick", event);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  font-family: $arcade-font;
  letter-spacing: 2px;
  font-size: $font-size-lg;
  padding: 8px 16px;
  background-color: $orange;
  color: white;
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: $brown;
  }
}
</style>
