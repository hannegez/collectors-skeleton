<template>
  <div class="center">
    <div id="welcome-info">
      <h1>Welcome to Rich Collectors!</h1>
      <p> Collect items and become the richest player.</p>


      <button class="buttons homeButton" v-on:click="getHowToInfo()">How to play?</button>
      <div class="popupInfo" style= "position:relative; left:0em; top:0em;">
      <span class="popupHowToInfoText" id="myHowToInfoPopup"  style= "left:0em; top:-30em;">
        <!-- <a href="/images/rules_collectors.pdf" >Click here to open rules</a> -->
        <embed src="/images/rules_collectors.pdf" width="2000em" height="950em"/>
        <br>
        <button class="closeButton" v-on:click="getHowToInfo()" >close</button>
      </span>
      </div>


      <h2> Choose number of players: </h2>
      <p>
        <input type="radio" id="twoPlayers" name="choosePlayers" value="2" checked>
        <label for="twoPlayers">2</label>
        <input type="radio" id="threePlayers" name="choosePlayers" value="3">
        <label for="threePlayers">3</label>
        <input type="radio" id="fourPlayers" name="choosePlayers" value="4">
        <label for="fourPlayers">4</label>
      </p>
      <h2> Choose language: </h2>
      <p>
        <input type="radio" id="english" name="chooseLanguage" value="en" checked>
        <label for="english">English</label>
        <input type="radio" id="svenska" name="chooseLanguage" value="se">
        <label for="svenska">Svenska</label>
      </p>

      <div id="homeButtons">
        <button class="buttons homeButton" v-on:click="setupCollectors(getPlayers(), getLanguage())">Play game</button>
        <button class="buttons homeButton" v-on:click="getPlayers()">Tutorial mode</button>  <!-- Här händer nått annat än @click="setupCollectors(i+1, 'en')", kanske en setupTutorial?? -->
      </div>

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
      getHowToInfo:function(){
            var popupwork = document.getElementById("myHowToInfoPopup");
            popupwork.classList.toggle("show");
      },

    }
  }
  </script>

  <style scoped>
  #welcome-info {
    background: #DFECCC;
    border-radius: 10px;
    color: #292929;
    padding: 2em;
    box-shadow: 0 6px 5px 0 #C6C6C5;
  }

  .center {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    padding: 1em;
  }

  h2 {
    font-size: 1.2em;
    margin: 1em 0;
  }

  p {
    font-size: 1em;
    font-weight: normal;
  }

  /*  ======================================================
   BUTTONS PÅ HOME-SIDAN
   OBS: Övrig (allmän) style ligger i Collectors.VUE    */

  #homeButtons {
    margin: 5% 0;
  }

  .homeButton {
    font-size: 1.2em;
    background: #9BC658;
  }


/* ======================================================= */
.popupHowToInfoText {
  position: absolute;
  display: none;
  cursor: pointer;
  user-select: none;
  width: 650%;
  background-color: lightgrey; /*bakgrund popup*/
  color: black; /*textfärg popup*/
  text-align: center;
  border-radius: 0px;
  padding: 20px 20px;  /*padding popup*/
  z-index: 1;
  margin-left: -300%;
  border-color: grey;
  border-width: 1px;
  border-style:solid;
  overflow-y: scroll;
}


.popupInfo .popuptext::after {
  content: "";
  position: absolute;
}
.popupInfo:hover {
  cursor: pointer;
}


.popupInfo .show {
  display: block;
}

  </style>
