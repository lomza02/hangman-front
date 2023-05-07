<template>
  <table>
    <thead>
      <tr>
        <th>Miejsce</th>
        <th>Nickname</th>
        <th>Punkty</th>
        <th>Czas gry</th>
      </tr>
    </thead>
    <tbody v-if="players.length === 0">
      <tr>
        <td colspan="4">Brak Gier</td>
      </tr>
    </tbody>
    <tbody v-else>
      <tr v-for="(player, index) in players" :key="player.id">
        <td>{{ index + 1 }}</td>
        <td>{{ player.user.name }}</td>
        <td>{{ player.score }}</td>
        <td>{{ player.gameTime || "0" }} sec</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "TableComponent",
  props: {
    players: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style lang="scss">
.ranking-list {
  font-family: $arcade-font;
  font-size: $font-size-lg;
  margin: 0 auto;
  text-align: center;
  padding-top: 20px;
  letter-spacing: 2px;

  h1 {
    color: $white;
    letter-spacing: 2px;
  }

  table {
    border-collapse: collapse;
    margin: 0 auto;
  }

  button {
    a {
      color: $white;
      text-decoration: none;
    }
  }

  th,
  td {
    padding: 10px;
    border: 2px solid $black;
    background-color: $orange;
  }

  th {
    background-color: $brown;
    color: $white;
  }

  tr:nth-child(even) {
    background-color: $white;
  }

  tr:hover {
    background-color: $orange;
  }
}
</style>
