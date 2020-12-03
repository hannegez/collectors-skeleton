// KOPPLAS IHOP GENOM serve.js rad 53-55
// io.on('connection', function (socket) {
//     CollectorsSockets(this, socket, collectorsData);
// });
//
// så vi har alltså att data = collectorsData = / i serve.js rad 44 och 48 / = kommer åt dataHandlerCollectors.js

function sockets(io, socket, data) {
    socket.on('setupCollectors', function(d) {
      data.createRoom(d.roomId, d.playerCount, d.lang);
    })
    /**/
    socket.on('collectorsLoaded', function(d) {
      socket.join(d.roomId);
      if (data.joinGame(d.roomId, d.playerId)) {
         socket.emit('collectorsInitialize', {                //HÄR LÄR VI LÄGGA TILL/ÄNDRA VAD SOM SKA SÄNDAS UT NÄR NÅN JOINAR
             labels: data.getUILabels(d.roomId),              //OBJEKTET SOM SKICKAS SOM 2:A PARAMETER ÄR DET SOM KALLAS FÖR d I
             players: data.getPlayers(d.roomId),              //Collectors.vue: "this.$store.state.socket.on('collectorsInitialize',
             itemsOnSale: data.getItemsOnSale(d.roomId),      //  function(d) { ...... "
             marketValues: data.getMarketValues(d.roomId),
             //testMarketValues: data.getMarketValues(d.roomId),
             skillsOnSale: data.getSkillsOnSale(d.roomId),
             auctionCards: data.getAuctionCards(d.roomId),
             //NÅTT MED WORK
             placements: data.getPlacements(d.roomId)
           }
         );
       }
    });
    /**/
    socket.on('collectorsDrawCard', function(d) {
      io.to(d.roomId).emit('collectorsCardDrawn',
      data.drawCard(d.roomId, d.playerId)
    );
  });
  socket.on('collectorsBuyCard', function(d) {
    data.buyCard(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsCardBought', {
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        itemsOnSale: data.getItemsOnSale(d.roomId)
      }
    );
  });
  socket.on('collectorsPlaceBottle', function(d) {
    data.placeBottle(d.roomId, d.playerId, d.action, d.cost);
    io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId)
    );
    });

//testTESTTEST
  socket.on('collectorsTestRaiseValue', function(d) {
    data.getMarketValues(d.roomId, d.playerId, d.action, d.cost);
    io.to(d.roomId).emit('collectorsTestValueRaised', data.getMarketValues(d.roomId)
    );
  }
)


}

module.exports = sockets;
