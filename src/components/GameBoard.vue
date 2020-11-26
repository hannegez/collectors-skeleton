<!-- här testar jag att skapa själva brädet, har även infogat game-board.png i images
    copy paste från CollectorsCard.vue, sen försökt ändra och anpassa   -->

<template>
    <div id="game-board">
    </div>
</template>

<script>
export default {
  name: 'GameBoard',
  // props: {
  //   card: Object
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #game-board {
    color:red;
    user-select: none;
    width:50%;
    height:100em;
    background: url('/images/game-board2000px.png') top left no-repeat;
    background-size: contain;
    border-radius: 10px;
    margin-left: 1em;
  }

</style>
