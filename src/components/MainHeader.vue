<template>
  <div class="header-wrapper">
    <h1><slot /></h1>
  </div>
</template>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: center;
  align-content: center;
  h1 {
    font-family: $arcade-font;
    font-size: 60px;
    color: $orange;
    letter-spacing: 2px;
  }
}
</style>
