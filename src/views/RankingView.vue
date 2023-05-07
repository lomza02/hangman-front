<template>
  <div class="ranking-list">
    <MainHeader> Wisielec </MainHeader>
    <router-link to="/game">
      <PrimaryButton>Zagraj </PrimaryButton></router-link
    >
    <h1>Ranking graczy</h1>
    <TableComponent v-if="isWide" :players="players" />
    <ListComponent v-else :players="players" />
  </div>
</template>

<script>
import TableComponent from "@/components/TableComponent.vue";
import PrimaryButton from "@/components/PrimaryButton.vue";
import ListComponent from "@/components/ListComponent.vue";
import MainHeader from "@/components/MainHeader.vue";
import Game from "@/models/Game";
import api from "@/services/api";

export default {
  name: "RankingView",
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
    async getPlayers() {
      const response = await api.getPlayers();
      if (response.data.data) {
        this.players = response.data.data.map((player) => new Game(player));
      }
    },
  },
};
</script>
