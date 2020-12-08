<!-- här testar jag att skapa själva brädet, har även infogat game-board.png i images
    copy paste från CollectorsCard.vue, sen försökt ändra och anpassa   -->
<!--Här har jag lagt en fin kommentar för att testa push/pull-->
<!-- tjhooooo -->
<template>



    <div id="game-board" @click="click">
      <p>hej</p>

    </div>
</template>




<script>
export default {
  name: 'GameBoard',
  methods: {
    click:function(event){
      alert(event.x +", "+ event.y)

    }}
  // props: {
  //   card: Object
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #game-board {
    color:black;
    user-select: none;
/*   width:90%;*/
    height:500px;

    background: url('/images/game_board_redigerat.PNG') ;
  /*  background-size: contain; */
    border-radius: 10px;
/*    margin-left: 1em;*/
  }




</style>
