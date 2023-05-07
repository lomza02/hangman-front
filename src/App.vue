<template>
  <div>
    <header>
      <nav>
        <side-menu />
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import SideMenu from "./components/SideMenu.vue";

export default {
  components: {
    SideMenu,
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  #app {
    font-family: "Montserrat", Helvetica, Arial, sans-serif;
    main {
      min-height: 100vh;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: black;
    }
  }
}
</style>
