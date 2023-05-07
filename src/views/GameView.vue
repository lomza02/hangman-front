<template>
  <div>
    <GameType v-if="!word" @useWord="useWord" />
    <GameContent v-else :word="word" :gameId="gameId" @clearWord="clearWord" />
  </div>
</template>

<script>
import GameType from "@/components/GameType.vue";
import GameContent from "@/components/GameContent.vue";
import api from "@/services/api";

export default {
  name: "GameView",
  components: {
    GameType,
    GameContent,
  },
  data() {
    return {
      word: "",
      gameId: null,
    };
  },
  methods: {
    clearWord() {
      this.word = "";
    },
    async useWord(word) {
      const response = await api.saveScore(word);
      if (response.data.data) {
        this.gameId = response.data.data.id;
        this.word = word;
      }
    },
  },
};
</script>
