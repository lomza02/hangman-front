<template>
  <div class="ranking-list">
    <MainHeader> Wisielec </MainHeader>
    <router-link to="/game">
      <PrimaryButton>Zagraj </PrimaryButton></router-link
    >
    <h1>Moje rekordy</h1>
    <TableComponent v-if="isWide" :players="players" />
    <ListComponent v-else :players="players" />
  </div>
</template>

<script>
import PrimaryButton from "@/components/PrimaryButton.vue";
import TableComponent from "@/components/TableComponent.vue";
import MainHeader from "@/components/MainHeader.vue";
import Game from "@/models/Game";
import api from "@/services/api";
import helper from "@/services/helper";
import ListComponent from "@/components/ListComponent.vue";

export default {
  name: "MyRecordsView",
  components: {
    TableComponent,
    PrimaryButton,
    MainHeader,
    ListComponent,
  },
  data() {
    return {
      isWide: false,
      players: [],
    };
  },
  mounted() {
    this.isWide = window.innerWidth >= 768;
    window.addEventListener("resize", this.handleResize);
    this.getPlayers();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.isWide = window.innerWidth >= 768;
    },
    getWidth() {
      return window.innerWidth;
    },
    async getPlayers() {
      const user = helper.getUser();
      const response = await api.getMyRecords(user.id);
      if (response.data.data) {
        this.players = response.data.data.map((player) => new Game(player));
      }
    },
  },
};
</script>
