const { response, request } = require('express');
var axios = require("axios");

const getPairsOfPlayers = async (req = request, resp = response, next) => {
  const { friends } = await axios(
    `https://mauvelous-leopard-5257.twil.io/friend-detail?username=${req.query.input}`
  );
  const listaAmigos = friends.friends;

  let rspta= [];

  let numAmigos = listaAmigos.amigos.length+1;
  
  
  const { playsData } = await axios(
    `https://mauvelous-leopard-5257.twil.io/plays-detail?username=${req.query.input}`
  );

  const plays = playsData.plays;
  //Filtra el arreglo para quitar los repetidos
  let arregloNoRepetido = plays.reproducciones.filter((item, index)=>{
    return plays.reproducciones.indexOf(item) ===index;
  })

  //Saca el numero de plays que hay
  let numeroDePlays = plays.reproducciones.length + 1;
  let uri=  `/users/${req.query.input} `

  rspta.push({
    username: req.query.input,
    plays: numeroDePlays,
    friends: numAmigos,
    tracks: arregloNoRepetido,
    uri: uri,
  })


  
   resp.json(rspta);
  


};

module.exports = { getPairsOfPlayers };
