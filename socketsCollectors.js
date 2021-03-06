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

  socket.on('collectorsLoaded', function(d) {
    socket.join(d.roomId);
    if (data.joinGame(d.roomId, d.playerId)) {
      socket.emit('collectorsInitialize', {
        labels: data.getUILabels(d.roomId),
        players: data.getPlayers(d.roomId),
        itemsOnSale: data.getItemsOnSale(d.roomId),
        marketValues: data.getMarketValues(d.roomId),
        market: data.getMarket(d.roomId),
        skillsOnSale: data.getSkillsOnSale(d.roomId),
        auctionCards: data.getAuctionCards(d.roomId),
        auctionSpot: data.getAuctionSpot(d.roomId),
        placements: data.getPlacements(d.roomId),
        currentQuarter:data.getQuarter(d.roomId)
      });
      }
  });

  socket.on('collectorsDrawCard', function(d) {
    io.to(d.roomId).emit('collectorsCardDrawn',
    data.drawCard(d.roomId, d.playerId)
  );
  });
  socket.on('collectorsGetMoney', function(d) {
    io.to(d.roomId).emit('collectorsGottenMoney',
    data.getMoney(d.roomId, d.playerId)
  );
  });
  //Initierar ett nytt kvartal när man trycker på next quarter knappen
  socket.on('collectorsNextQuarter', function(d) {
    data.nextQuarter(d.roomId)
    io.to(d.roomId).emit('collectorsInitialize', {
      labels: data.getUILabels(d.roomId),
      players: data.getPlayers(d.roomId),
      itemsOnSale: data.getItemsOnSale(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
      market: data.getMarket(d.roomId),
      skillsOnSale: data.getSkillsOnSale(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
      auctionSpot: data.getAuctionSpot(d.roomId),
      placements: data.getPlacements(d.roomId),
      currentQuarter:data.getQuarter(d.roomId)
    });
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

  socket.on('CollectorsStartWork', function(d) {
    data.startWork(d.roomId, d.playerId, d.card, d.cost, d.workAction, d.numberOfActions )
    io.to(d.roomId).emit('collectorsWorkStarted', {
      playerId: d.playerId,
      players: data.getPlayers(d.roomId),
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

      skillsOnSale: data.getSkillsOnSale(d.roomId),
      auctionCards: data.getAuctionCards(d.roomId),
      marketValues: data.getMarketValues(d.roomId),
      market: data.getMarket(d.roomId)
    }
  );
  });

  socket.on('collectorsPlaceBottle', function(d) {
    data.placeBottle(d.roomId, d.playerId, d.action, d.cost);
    io.to(d.roomId).emit('collectorsBottlePlaced', data.getPlacements(d.roomId)
  );
  });

  //försök till number of actions men har inte fått ihop det.
  socket.on('collectorsPlaceWorkBottle', function(d) {
    data.placeWorkBottle(d.roomId, d.playerId, d.cost, d.workAction, d.numberOfActions);
  //  d.numberOfActions -= 1;
    io.to(d.roomId).emit('collectorsWorkBottlePlaced', {
      players: data.getPlayers(d.roomId),
      playerId: d.playerId,
      placements: data.getPlacements(d.roomId),
      numberOfActions: d.numberOfActions,
    },
  );
  });
  }
  module.exports = sockets;
