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
             raiseValueOnSale: data.getRaiseValueOnSale(d.roomId),
             market: data.getMarket(d.roomId),
             skillsOnSale: data.getSkillsOnSale(d.roomId),
             auctionCards: data.getAuctionCards(d.roomId),
             auctionSpot: data.getAuctionSpot(d.roomId), // TEST ???
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
  socket.on('collectorsGainSkill', function(d) {
    data.gainSkill(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsSkillGained', {
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId)
      }
    );
  });

  socket.on('CollectorsStartAuction', function(d) {
    data.startAuction(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsAuctionStarted', {
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId),
        auctionSpot: data.getAuctionSpot(d.roomId)
      }
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

  socket.on('collectorsRaiseValue', function(d) {
    data.raiseValue(d.roomId, d.playerId, d.card, d.cost)
    io.to(d.roomId).emit('collectorsValueRaised', {
        playerId: d.playerId,
        players: data.getPlayers(d.roomId),
        raiseValueOnSale: data.getRaiseValueOnSale(d.roomId),
        market: data.getMarket(d.roomId)
      }
    );
  });

  socket.on('collectorsPlaceBottle', function(d) {
    data.placeBottle(d.roomId, d.playerId, d.action, d.cost);
    io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId)
    );
    });



}

module.exports = sockets;
