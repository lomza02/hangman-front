<template>
  <div v-if="isLoggedIn">
    <PrimaryButton class="menu-button" @handleClick="isMenuOpen = !isMenuOpen">
      Menu
    </PrimaryButton>
    <div class="menu-wrapper" :class="{ open: isMenuOpen }">
      <ul class="menu">
        <li>
          <router-link to="/game"> Gra </router-link>
        </li>
        <li>
          <router-link to="/"> Ranking </router-link>
        </li>
        <li>
          <router-link to="/my-records"> Moje rekordy </router-link>
        </li>
        <li>
          <div @click="handleLogout" class="logout">Wyloguj</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import api from "@/services/api";
import helper from "@/services/helper";

export default {
  name: "SideMenu",
  components: {
    PrimaryButton,
  },
  data() {
    return {
      isMenuOpen: false,
      isLoggedIn: false,
    };
  },
  watch: {
    $route: "checkLoggedIn",
  },
  methods: {
    checkLoggedIn() {
      this.isLoggedIn = helper.isLoggedIn();
      this.isMenuOpen = false;
    },
    async handleLogout() {
      try {
        const response = await api.logout();
        if (response.data) {
          helper.logout();
        }
      } catch {
        helper.logout();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.menu-button {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 3;
}

.menu-wrapper {
  position: fixed;
  top: 0;
  left: -400px;
  width: 400px;
  height: 100%;
  background-color: $black;
  z-index: 1;
  transition: left 0.3s ease-in-out;
  &.open {
    left: 0;
    z-index: 2;
  }
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    margin: 10px 0;
    a,
    .logout {
      text-transform: uppercase;
      font-weight: 600;
    }
    .logout {
      cursor: pointer;
      text-decoration: underline;
      color: $orange;
    }
    a {
      color: $white;
    }
  }
}
</style>
