<template>
  <div class="mobile-leaderboard">
    <ul>
      <li v-for="(player, index) in players" :key="player.id">
        <div class="leaderboard-place">{{ index + 1 }}</div>
        <div class="leaderboard-name">{{ player.user.name }}</div>
        <div class="leaderboard-score">{{ player.score }}</div>
        <div class="leaderboard-time">{{ player.gameTime || "0" }} sec</div>
      </li>
      <li v-if="players.length === 0" class="leaderboar-empty">Brak gier</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ListComponent",
  props: {
    players: {
      type: Array,
      default: () => [],
    },
  }
};
</script>

<style lang="scss" scoped>
.ranking-list {
  max-width: 100vw;
  .mobile-leaderboard {
    max-width: 100%;
    color: white;
    margin: 20px;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      border: 1px solid #ddd;
      margin-bottom: 10px;
    }

    .leaderboard-place {
      font-size: 1.2rem;
      font-weight: bold;
      margin-right: 10px;
    }

    .leaderboard-name {
      word-break: break-all;
      margin-right: 10px;
    }

    .leaderboard-score {
      margin-right: 10px;
    }

    .leaderboard-time {
      font-size: 0.8rem;
      color: $orange;
    }

    .leaderboard-empty {
      text-align: center;
      font-style: italic;
      color: $orange;
    }
    .leaderboard-place {
      color: $orange;
    }
  }
}
</style>
