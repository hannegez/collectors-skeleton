<!-- här testar jag att skapa player board, har även infogat player_board.png i images
    copy paste från GameBoard.vue, sen försökt ändra och anpassa   -->

<template>
    <div class="player-board">
      <p>HEJHEJ</p>
    </div>
</template>

<script>
export default {
  name: 'PlayerBoard',
  // props: {
  //   card: Object
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .player-board {
    color:red;
    user-select: none;
    width:50%;
    height:100em;
    background: url('/images/player_board2000px.png') top left no-repeat;
    background-size: contain;
    border-radius: 10px;
    margin-left: 1em;
  }

</style>
