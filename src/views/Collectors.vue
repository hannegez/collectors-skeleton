<template>
  <div>
    <main>

      <div class="buttons">
        <button @click="drawCard">
          {{ labels.draw }}
        </button>
      </div>


        <!--allt för popup-->
      <div class="popup" style= "position:relative; left:20%; top:18em;">
        <img src='/images/actions.PNG' alt="" width="300" height="60" @click="getInfo" >
        <span class="popuptext" id="myPopup"> buy action gör det här och det här</span>
      </div>




      <div class="my-cards">
        <CollectorsCard v-for="(card, index) in myCards" :card="card" :key="index"/>
      </div>


<!-- TESTAR HÄR ATT FÅ IN GAME BOARD -->
<body>

</body>
      <div id="collectors-board">
        <div id="left-board">
          <GameBoard/>
        </div>

        <div id="right-board">
          <PlayerBoard/>
        </div>

      </div>

    </main>
    <footer>
        <p>
          {{ labels.invite }}
          <input type="text" :value="publicPath + $route.path" @click="selectAll" readonly="readonly">
        </p>
    </footer>
  </div>
</template>

<script>
/*eslint no-unused-vars: ["error", { "varsIgnorePattern": "[iI]gnored" }]*/

import CollectorsCard from '@/components/CollectorsCard.vue'
import GameBoard from '@/components/GameBoard.vue'                            /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
import PlayerBoard from '@/components/PlayerBoard.vue'   /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
//import possibleActions from '@/components/infoBoxes.vue'                        /*testar att lägga till buyitem*/

/* VUE-objekt för spelet*/
export default {
  name: 'Collectors',
  components: {
    CollectorsCard,
    GameBoard,                                                                 /*TESTAR HÄR ATT FÅ IN GAME BOARD*/
    PlayerBoard,                                /*TESTAR HÄR ATT FÅ IN PLAYER BOARD*/
    //possibleActions                                                   /*testar att lägga till buyitem*/
  },
  data: function () {
    return {
      publicPath: "localhost:8080/#", //"collectors-groupxx.herokuapp.com/#",
      touchScreen: false,
      myCards: [],
      maxSizes: { x: 0,
                  y: 0 },
      labels: {},
      points: {}
    }

  },
  created: function () {
    this.$store.commit('SET_PLAYER_ID', this.$route.query.id)
    //TODO! Fix this ugly hack
    //background: https://github.com/quasarframework/quasar/issues/5672
    const newRoute = this.$route.params.id + "?id=" + this.$store.state.playerId;
    if (this.$route.params.id + "?id=" + this.$route.query.id !== newRoute)
      this.$router.push(newRoute);
    this.$store.state.socket.emit('collectorsLoaded',
      { roomId: this.$route.params.id,
        playerId: this.$store.state.playerId } );
    this.$store.state.socket.on('collectorsInitialize',
      function(d) {
        this.labels = d.labels;
        this.myCards = d.hand;
      }.bind(this));
    this.$store.state.socket.on('collectorsPointsUpdated', (d) => this.points = d );

    this.$store.state.socket.on('collectorsCardDrawn',
      function(d) {
        console.log(d);
        if(d.playerId === this.$route.query.id) {
          this.myCards = d.cards;
        }
        else {
          console.log("another player drew a card");
        }
      }.bind(this)
    );
  },
  methods: {
    selectAll: function (n) {
      n.target.select();
    },
    drawCard: function () {
      this.$store.state.socket.emit('collectorsDrawCard', { roomId: this.$route.params.id,
           playerId: this.$store.state.playerId });
    },
    getInfo: function(){
      console.log("bajs");
      var popup = document.getElementById("myPopup");
      popup.classList.toggle("show");



    }
  },
}



</script>


<style scoped>
  #collectors-board {
    display: grid;
    grid-gap: 0;
    grid-template-columns: 1fr 1fr;

    grid-template-areas:
      "game-board player-boards";

  }

  #left-board { grid-area: game-board; }
  #right-board { grid-area: player-boards; }


  header {
    user-select: none;
    position: fixed;
    width:100%;
    pointer-events: none;
  }
  main {

    user-select: none;

  }
  footer {
    margin-top: 5em auto;

  }
  footer a {
    text-decoration: none;
    border-bottom: 2px dotted ivory;
  }
  footer a:visited {
    color:ivory;
  }
  .my-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, 130px);
    grid-template-rows: repeat(auto-fill, 180px);
  }
  .my-cards div {
    transform: scale(0.5)translate(-50%,-50%);
    transition:0.2s;
    transition-timing-function: ease-out;
    z-index: 0;
  }
  .my-cards div:hover {
    transform: scale(1)translate(-25%,0);
    z-index: 1;
  }

  /*allt för popup*/
  .popup {
  position: relative;
  display: inline-block;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* The actual popup */
.popup .popuptext {
  visibility: hidden;
  width: 160px;
  background-color: pink;
  color: black;
  text-align: center;
  border-radius: 6px;
  padding: 8px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%;
  left: 50%;
  margin-left: -80px;
}

/* Popup arrow */
.popup .popuptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 10px;
  border-style: solid;
  border-color: pink transparent transparent transparent;
}

/* Toggle this class - hide and show the popup */
.popup .show {
  visibility: visible;
}
  @media screen and (max-width: 800px) {
    main {
      width:90vw;
    }
  }
</style>
