<!-- här testar jag att skapa player board, har även infogat player_board.png i images
copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
  <div class= "playerContainer">

    <div id="playerName">
      <h2>{{labels.playerInfo}} {{playerId}}</h2>
    </div>

    <!--  OBS: dessa item/skillsymboler och counters vill vi egentligen lösa med en for-loop och lagra counters i ett objekt
    istället så att vi kan komma åt dem på ett snyggare sätt. Men vi fick det inte att funka och gjorde denna
    tillfälliga och "osnygga" lösningen så länge. -->
    <div class="itemCounters">
      <div class="itemCounter">
        <img class="itemSymbol" src='/images/item_fastaval.png'>
        <span> {{ player.itemCounter[0] }} </span>
      </div>
      <div class="itemCounter">
        <img class="itemSymbol" src='/images/item_figures.png'>
        <span> {{ player.itemCounter[1] }} </span>
      </div>
      <div class="itemCounter">
        <img class="itemSymbol" src='/images/item_music.png'>
        <span> {{ player.itemCounter[2] }} </span>
      </div>
      <div class="itemCounter">
        <img class="itemSymbol" src='/images/item_movie.png'>
        <span> {{ player.itemCounter[3] }} </span>
      </div>
      <div class="itemCounter">
        <img class="itemSymbol" src='/images/item_technology.png'>
        <span> {{ player.itemCounter[4] }} </span>
      </div>
    </div>

    <div class="skillCounters">
      <div class="skillCounter">
        <img class="skillSymbol" src='/images/skills_workerIncome.png'>
        <span> {{ player.skillCounter[0] }} </span>
      </div>
      <div class="skillCounter">
        <img class="skillSymbol" src='/images/skills_workerCard.png'>
        <span> {{ player.skillCounter[1] }} </span>
      </div>
      <div class="skillCounter">
        <img class="skillSymbol" src='/images/skills_bottle.png'>
        <span> {{ player.skillCounter[2] }} </span>
      </div>
      <div class="skillCounter">
        <img class="skillSymbol" src='/images/skills_auctionIncome.png'>
        <span> {{ player.skillCounter[3] }} </span>
      </div>
      <div class="skillCounter hoverSkill">
        <div class="moreSkills moreSkillCounters">
          <div class="skillCounter">
            <img class="extraSkill" src='/images/skills_VP-fastaval.png'>
            <span> {{ player.skillCounter[3] }} </span>
          </div>
          <div class="skillCounter">
            <img class="extraSkill" src='/images/skills_VP-figures.png'>
            <span> {{ player.skillCounter[3] }} </span>
          </div>
          <div class="skillCounter">
            <img class="extraSkill" src='/images/skills_VP-music.png'>
            <span> {{ player.skillCounter[3] }} </span>
          </div>
          <div class="skillCounter">
            <img class="extraSkill" src='/images/skills_VP-movie.png'>
            <span> {{ player.skillCounter[3] }} </span>
          </div>
          <div class="skillCounter">
            <img class="extraSkill" src='/images/skills_VP-technology.png'>
            <span> {{ player.skillCounter[3] }} </span>
          </div>
        </div>
        <img class="skillSymbol" src='/images/skills_VP-.png'>
        <span> {{ player.skillCounter[4] }} </span>
      </div>
      <div class="skillCounter">
        <img class="skillSymbol" src='/images/skills_VP-all.png'>
        <span> {{ player.skillCounter[5] }} </span>
      </div>
    </div>

    <div class="clickToSee">
      <!-- <div class="yourSkills playerSymbols">
        <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/your_skills.png' alt="See your skills" width="20%" @click='getYourInfo("yourSkills")' >
          <div class="popuptext" id="yourSkillsPopup" style= "left:10em; top:-3em;">
            <h2>{{ labels.yourSkills }}</h2>
            <div class="playerslots Yskills">
              <CollectorsCard v-for="(card, index) in player.skills" :card="card" :key="'skill' +index"/>
            </div>
            <br>
            <button class="closeButton"  @click='getYourInfo("yourSkills")'>close</button>
          </div>
          <span>
            {{ player.skills.length }}
          </span>
        </div>
      </div> -->

      <div class="yourHand playerSymbols">
        <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/your_hand150.png' alt="See your hand" width="65%" @click='getYourInfo("yourHand")' >
          <div class="popuptext" id="yourHandPopup"  style= "left:10em; top:-3em;">
            <h2>{{ labels.yourHand }}</h2>
            <div class="playerslots Yhand" >
              <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(card)" :key="'hand'+ index"/>
            </div>
            <br>
            <button class="closeButton"  @click='getYourInfo("yourHand")'>close</button>
          </div>
          <span>
            {{ player.hand.length }}
          </span>
        </div>
      </div>

      <div class="yourBottles playerSymbols">
        <div class="popup" style= "position:relative; left:0em; top:0em;">
          <img src='/images/playerbottle_basic.png' alt="See complete bottle info" width="65%" @click='getYourInfo("yourBottles")' >
          <div class="popuptext" id="yourBottlesPopup"  style= "left:10em; top:-3em;">
            <h2>{{ labels.yourBottles }}</h2>
            <div class="textbottles">
              <p>{{ labels.totalBottles }} {{ player.totalBottles}}</p>
              <p>{{ labels.bottlesLeft }} {{ player.bottlesLeft}}</p>
            </div>
            <img src='/images/bottlemenu.png' width="90%">
            <p>{{ labels.bottleInfo }}</p>
            <br>
            <button class="closeButton"  @click='getYourInfo("yourBottles")'>close</button>
          </div>
          <span>
            {{ player.bottlesLeft }}
          </span>
        </div>

      </div>

    </div>

      <div id="yourMoneySymbols">
        <div class="yourCoins moneySymbols">
          <img src='/images/coin100px.png' alt="coin symbol" width="60%"><span> {{player.money}}</span>
        </div>

        <div class="yourIncome moneySymbols">
          <img src='/images/future_income100px.png' alt="income symbol" width="60%"><span> {{player.futureIncome}}</span>
        </div>
      </div>

    </div>


    <!-- DETTA KAN TAS BORT OM VI ÄR OK MED ITEMCOUNTERN, SKILLPOPUP OCH HANDPOPUP
    <div class="categoryHand">
    <h2>Your hand</h2>
  </div>
  <div class="playerslots Yhand" >

  <CollectorsCard v-for="(card, index) in player.hand" :card="card" :availableAction="card.available" @doAction="chooseAction(card)" :key="'hand'+ index"/>
</div>

<div class="categoryItems">
<h2>Your items </h2>
</div>

<div class="playerslots Yitems">

<CollectorsCard v-for="(card, index) in player.items" :card="card" :key="'item'+ index" />
</div>

<div class="categorySkill">
<h2>Your skills</h2>
</div>

<div class="playerslots Yskills">
<CollectorsCard v-for="(card, index) in player.skills" :card="card" :key="'skill' +index"/>
</div>
</div>-->


</template>

<script>
import CollectorsCard from '@/components/CollectorsCard.vue'

export default {
  name: 'CollectorsPlayerBoard',
  components: {
    CollectorsCard
  },
  props: {            //HÄR ÄR ALLA v-binds FRÅN ELEMENTET I Collectors.vue
    labels: Object,  //specify what kind of object
    player: Object,
    playerId: String,
    //NÅNTING MED WORK?
  },
  methods: {
    chooseAction(card){
      this.$emit('chooseAction', card);
    },
    getYourInfo: function(string){
      console.log("inne i getYourInfo", string);
      if (string=="yourSkills") {
        document.getElementById("yourSkillsPopup").classList.toggle("show");
      }
      else if (string=="yourHand") {
        document.getElementById("yourHandPopup").classList.toggle("show");
      }
      else if (string=="yourBottles") {
        document.getElementById("yourBottlesPopup").classList.toggle("show");
      }

      // if (string === 'work') {
      //   var popupwork = document.getElementById("myWorkPopup");
      //   popupwork.classList.toggle("show");
      // }
      // else if (string === 'auction') {
      //   var popupauction = document.getElementById("myAuctionPopup");
      //   popupauction.classList.toggle("show");
      //
      // }
      // else if (string === 'market') {
      //   var popupmarket = document.getElementById("myMarketPopup");
      //   popupmarket.classList.toggle("show");
      // }
      // else if (string === 'skill') {
      //   var popupskill = document.getElementById("mySkillPopup");
      //   popupskill.classList.toggle("show");
      // }
      // else if (string === 'item') {
      //   var popupitem = document.getElementById("myItemPopup");
      //   popupitem.classList.toggle("show");
      // }
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* =====================================
PLAYER BOARD (GRID)                 */

.playerContainer {
  background-color: #ececec;
  width: 90%;
  text-align: right;
  padding: 1% 0 5% 1%;
  display: grid;
  grid-gap: 5% 2.5%;
  grid-template-columns: 40% 40% 10%;
  grid-template-areas:
    "playerName clickToSee yourMoneySymbols"
    "itemCounters itemCounters itemCounters"
    "skillCounters skillCounters skillCounters";
}

#playerName, .clickToSee { text-align: left; }

#playerName { grid-area: playerName; }
#yourMoneySymbols { grid-area: yourMoneySymbols; }

.clickToSee {
  display: flex;
  grid-area: clickToSee;
}

.itemCounters, .skillCounters { display: grid; }

.itemCounters {
  grid-area: itemCounters;
  grid-template-columns: repeat(auto-fill, 20%);
}

.skillCounters {
  grid-area: skillCounters;
  grid-template-columns: repeat(auto-fill, 16.66%);
}

.moreSkillCounters {
  display: flex;
}

.itemSymbol {
  width: 65%;
}

.skillSymbol {
  width: 40%;
}

.extraSkill {
  width: 55%;
}

.hoverSkill {
  position:relative;
}

.moreSkills {
  /* hide and position tooltip */
  bottom: 120%;
  right: -100%;
  width: 400%;
  height: 100%;
  padding: 10%;
  background-color: #fff;
  border: solid thin #4E4E4E;
  color: #4E4E4E;
  border-radius: 5px;
  opacity: 0;
  position: absolute;
  -webkit-transition: opacity 0.5s;
  -moz-transition: opacity 0.5s;
  -ms-transition: opacity 0.5s;
  -o-transition: opacity 0.5s;
  transition: opacity 0.5s;
}

.hoverSkill:hover .moreSkills {
  /* display tooltip on hover */
  opacity: 1;
}

/* .hoverSkill:before {
  content: attr(data-text);
  position:absolute;

  right:-120%;
  bottom:115%;

  width:200px;
  padding:10px;
  border-radius:10px;
  background:#ececec;
  border: solid thin #4E4E4E;
  color: #4E4E4E;
  text-align:center;

  display:none;
}

.hoverSkill:hover:before {
  display:block;
} */

h2 { padding-left: 7%; }

p {
  margin: 1em;
}

span {
  font-size: 0.8em;
}

.playerslots {
  display: grid;
  grid-template-columns: repeat(auto-fill, 17px);
  grid-template-rows: repeat(10px, 180px);
}
.playerslots div {
  transform: scale(0.5)translate(-50%,-50%);
  transition:0.2s;
  transition-timing-function: ease-out;
  z-index: 0;
}
.playerslots div:hover {
  transform: scale(1)translate(-25%,0);
  z-index: 1;
}


</style>
