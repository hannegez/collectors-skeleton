<template>
  <div class="center">
    <div id="welcome-info">
      <h1>Welcome to Rich Collectors!</h1>
      <p> Collect items and become the richest player.</p>
      <p> Choose number of players:
        <input type="radio" id="twoPlayers" name="choosePlayers" value="2" checked>
        <label for="twoPlayers">2</label>
        <input type="radio" id="threePlayers" name="choosePlayers" value="3">
        <label for="threePlayers">3</label>
        <input type="radio" id="fourPlayers" name="choosePlayers" value="4">
        <label for="fourPlayers">4</label>
      </p>
      <p> Choose language:
        <input type="radio" id="english" name="chooseLanguage" value="en" checked>
        <label for="english">English</label>
        <input type="radio" id="svenska" name="chooseLanguage" value="se">
        <label for="svenska">Svenska</label>
      </p>

        <button v-on:click="setupCollectors(getPlayers(), getLanguage())">Play game</button>
        <button v-on:click="getPlayers()">Tutorial mode</button>  <!-- Här händer nått annat än @click="setupCollectors(i+1, 'en')", kanske en setupTutorial?? -->

<!-- DETTA KAN VI NU TA BORT PGA ERSATT MED PLAY GAME-KNAPP, OCH BEHÖVER VI ENS EN SVENSK VERSION.... ?
      <ul>
        <li v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'en')">Set up a game of Collectors for {{i+1}} players</a>.
        </li>
      </ul>

      <ul>
        <li v-for="i in 3" :key="i">
          <a @click="setupCollectors(i+1, 'se')">Spela Collectors med {{i+1}} spelare</a>.
        </li>
      </ul>
-->

    </div>
  </div>
</template>

<script>
// @ is an alias to /src

//VUE-objektet
export default {
  name: 'Home',
  created: function () {
    this.$store.commit('SET_ROOM_ID');
  },
  methods: {
    getPlayers: function() {
      const numberOfPlayers = document.querySelector('input[name=choosePlayers]:checked').value;
      return numberOfPlayers;
    },
    getLanguage: function() {
      const lang = document.querySelector('input[name=chooseLanguage]:checked').value;
    //  console.log(lang);
      console.log(typeof(lang));
      return lang;
    },
    setupCollectors: function (playerCount, lang) {
      console.log("Setting up Collectors with", playerCount, "players in", lang);
      this.$store.commit('SETUP_GAME', {roomId: this.$store.state.roomId,
        playerCount: playerCount,
        lang: lang });
      this.$router.push("/room/" + this.$store.state.roomId);
    },
  }
}
</script>

<style scoped>
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1em;
  }

#welcome-info {
  background: #DFECCC;
  border-radius: 10px;
  color: #292929;
  padding: 2em;
  box-shadow: 0 6px 5px 0 #C6C6C5;
}

button {
  color: #292929;
  font-size: 1.2em;
  font-weight: bold;
  background: #9BC658;
  border: solid thin #787975;
  border-radius: 5px;
  padding: 1em;
  margin: 5%;
  box-shadow: 2px 2px 3px #787975;
}

button:hover {
  box-shadow: inset 2px 2px 3px #787975;
  cursor: pointer;
}

/*OM VI VILL HA NÄR KNAPPEN ÄR NEDTRYCKT
button:focus {
} */

</style>
