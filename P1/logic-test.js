// No editar
const teams = [
  { id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
  { id: 2, country: 'Italy', name: 'A.C. Milan' },
  { id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
  { id: 4, country: 'Germany', name: 'FC Bayern Munich' },
  { id: 5, country: 'England', name: 'Liverpool F.C.' },
  { id: 6, country: 'Netherlands', name: 'AFC Ajax' },
  { id: 7, country: 'Italy', name: 'Inter Milan' },
  { id: 8, country: 'England', name: 'Manchester United F.C.' },
  { id: 9, country: 'England', name: 'Chelsea F.C.' },
  { id: 10, country: 'Portugal', name: 'FC Porto' },
  { id: 11, country: 'Germany', name: 'Borussia Dortmund' },
  { id: 12, country: 'Italy', name: 'Juventus FC' },
  { id: 13, country: 'France', name: 'Olympique Marseille' }

]

const leagues = [
  { id: 1, country: 'England', name: 'Premier League' },
  { id: 2, country: 'Germany', name: 'Bundesliga' },
  { id: 3, country: 'Netherlands', name: 'Eredivisie' },
  { id: 4, country: 'Spain', name: 'La Liga' },
  { id: 5, country: 'Italy', name: 'Serie A' },
  { id: 6, country: 'Portugal', name: 'Liga NOS' },
  { id: 7, country: 'France', name: 'Lige 1' }
]

const teamsByLeague = [
  { teamId: 12, leagueId: 5 },
  { teamId: 6, leagueId: 3 },
  { teamId: 2, leagueId: 5 },
  { teamId: 3, leagueId: 4 },
  { teamId: 4, leagueId: 2 },
  { teamId: 8, leagueId: 1 },
  { teamId: 10, leagueId: 6 },
  { teamId: 5, leagueId: 1 },
  { teamId: 7, leagueId: 5 },
  { teamId: 9, leagueId: 1 },
  { teamId: 11, leagueId: 2 },
  { teamId: 1, leagueId: 4 },
  { teamId: 13, leagueId: 7 }
]

const winsByTeams = [
  { teamId: 10, wins: 2 },
  { teamId: 6, wins: 4 },
  { teamId: 5, wins: 5 },
  { teamId: 1, wins: 13 },
  { teamId: 7, wins: 3 },
  { teamId: 4, wins: 5 },
  { teamId: 8, wins: 3 },
  { teamId: 2, wins: 7 },
  { teamId: 9, wins: 1 },
  { teamId: 3, wins: 5 },
  { teamId: 11, wins: 1 },
  { teamId: 12, wins: 2 },
  { teamId: 13, wins: 1 }
]

/*
  SECCIÓN PROBLEMAS
    - Las siguientes son preguntas básicas de Javascript y manejo de datos. Se evaluará eficiencia, ORDEN y claridad del código entregado.
    - Se debe programar un algoritmo para cada método y que este retorne lo requerido.
    - Debe usar nombres explicativos para sus variables.
    - Usar sintaxis ES6.
    - Puede utilizar funciones auxiliares como apoyo para tener una descomposición de código mas clara al momento de lectura.
    - Su prueba debe ejecutarse sin errores con: node logic-test.js
*/



// 0 Arreglo con los ids de los equipos (función de ejemplo)
function listTeamsIds () {
  return teams.map((client) => client.id)
}

// 1 Arreglo con los nombres de los equipos y el país al que pertenecen, ordenados alfabéticamente por el nombre de su país de origen.
function listTeamsByCountry () {
  return teams.map((team) =>{
      let teamAux = Object.assign({},team)
      delete teamAux.id
      return teamAux 
  }).sort((itemA,itemB)=> {
      return (itemA.country > itemB.country) ? 1 : (itemA.country < itemB.country) ? -1 : 0;
   
  })
}

// 2 Arreglo con los nombres de los equipos ordenados de mayor a menor por la cantidad de victorias en champions league.
function sortTeamsByWins () {
  return winsByTeams.sort((itemA,itemB)=>  itemB.wins - itemA.wins )
  .map((winteam) =>{
      let team = teams.filter((team)=> { 
          return team.id == winteam.teamId 
      })

      return team[0].name
  })
}

// 3 Arreglo de objetos en donde se muestre el nombre de las ligas y la sumatoria de las victorias de los equipos que pertenecen a ellas.
function leaguesWithWins () {
  return leagues.map((league) => {

      let winsByLeague = { legue : league.name }
      let teamsLeague = teamsByLeague.filter((team) => team.leagueId == league.id)
      let sum = 0

      teamsLeague.map((teamLeague)=> {
          var teamWins =  winsByTeams.filter((winByTeam ) => winByTeam.teamId == teamLeague.teamId )

          if ( teamWins.length > 0)
              sum += teamWins[0].wins

          return teamLeague
        })

        winsByLeague.wins = sum
        return winsByLeague
   })
}

function getWinnerByLeague(theBest){

  return leagues.map((league) => {

    let winsByLeague = { league : league.name }
    let teamsLeague = teamsByLeague.filter((team) => team.leagueId == league.id)
    let teamsWins = []

    teamsLeague.map((teamLeague)=> {
        var teamWins =  winsByTeams.filter((winByTeam ) => winByTeam.teamId == teamLeague.teamId )
        if ( teamWins.length > 0)
            teamsWins.push(teamWins[0])
        return teamLeague
    })

    teamsWins.sort((itemA,itemB)=> theBest == true  ? itemB.wins - itemA.wins : itemA.wins  - itemB.wins  )

    if ( teamsWins.length > 0)
        winsByLeague.team =  teams.filter( (team) => team.id == teamsWins[0].teamId )[0].name 
      
    return winsByLeague
  })
}
// 4 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la menor cantidad de victorias en champions.
function leaguesWithTeamWithLestWins () {
  return getWinnerByLeague(false)
}


// 5 Objeto en que las claves sean los nombres de las ligas y los valores el nombre del equipo con la mayor cantidad de victorias en champions.
function leaguesWithTeamWithMostWins () {
  return getWinnerByLeague(true)
}

function getTeamWinsByLeague(){

  return leagues.map((league) => {

    let winsByLeague = { league : league.name }
    let teamsLeague = teamsByLeague.filter((team) => team.leagueId == league.id)
    let teamsWins = []

    teamsLeague.map((teamLeague)=> {
        var teamWins =  winsByTeams.filter((winByTeam ) => winByTeam.teamId == teamLeague.teamId )
        if( teamWins.length > 0)
            teamsWins.push(teamWins[0])

        return teamLeague
    })

      teamsWins.sort((itemA,itemB)=> itemB.wins - itemA.wins  )

      if(teamsWins.length > 0)
          winsByLeague.teams = teamsWins      

      return winsByLeague
    })
}
// 6 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de victorias de sus equipos.
function sortLeaguesByTeamsByWins () {
   let leagues = getTeamWinsByLeague().map(league => {
       var sum = league.teams.map((item )=> item.wins).reduce((wins ,plusWins)=>{
          return wins + plusWins
       })
       var item = { league : league.league , wins: sum}
       return item
   })
       
   return leagues
}

// 7 Arreglo con los nombres de las ligas ordenadas de mayor a menor por la cantidad de equipos que participan en ellas.
function sortLeaguesByTeams () {
    let league = getTeamWinsByLeague().sort((itemA,itemB)=> {
      return (itemA.teams.length > itemB.teams.length) ? -1 : (itemA.teams.length < itemB.teams.length) ? 1 : 0;
     
    }).map((league)=> league.league)

   return league
}

// ARRAYS AUXILIARES DE PREGUNTA 8 
const teamsAux = [
  { id: 1, country: 'Spain', name: 'Real Madrid C.F.' },
  { id: 2, country: 'Italy', name: 'A.C. Milan' },
  { id: 3, country: 'Spain', name: 'Futbol Club Barcelona' },
  { id: 4, country: 'Germany', name: 'FC Bayern Munich' },
  { id: 5, country: 'England', name: 'Liverpool F.C.' },
  { id: 6, country: 'Netherlands', name: 'AFC Ajax' },
  { id: 7, country: 'Italy', name: 'Inter Milan' },
  { id: 8, country: 'England', name: 'Manchester United F.C.' },
  { id: 9, country: 'England', name: 'Chelsea F.C.' },
  { id: 10, country: 'Portugal', name: 'FC Porto' },
  { id: 11, country: 'Germany', name: 'Borussia Dortmund' },
  { id: 12, country: 'Italy', name: 'Juventus FC' },
  { id: 13, country: 'France', name: 'Olympique Marseille' },
  { id: 14, country: 'France', name: 'Paris Saint-Germain' }

]


const winsByTeamsAux = [
  { teamId: 10, wins: 2 },
  { teamId: 6, wins: 4 },
  { teamId: 5, wins: 5 },
  { teamId: 1, wins: 13 },
  { teamId: 7, wins: 3 },
  { teamId: 4, wins: 5 },
  { teamId: 8, wins: 3 },
  { teamId: 2, wins: 7 },
  { teamId: 9, wins: 1 },
  { teamId: 3, wins: 5 },
  { teamId: 11, wins: 1 },
  { teamId: 12, wins: 2 },
  { teamId: 13, wins: 1 },
  { teamId: 14, wins: 4}
]
// 8 Agregar un nuevo equipo con datos ficticios a "teams", asociarlo a la liga de Francia y agregar un total de 4 victorias en champions.
// Luego devolver el lugar que ocupa este equipo en el ranking de la pregunta 2.
// No modificar arreglos originales para no alterar las respuestas anteriores al correr la solución
function newTeamRanking () {

  let position = winsByTeamsAux.sort((itemA,itemB)=>  itemB.wins - itemA.wins )
  .map((winteam) =>{
     
      let team = teamsAux.filter( team => { 
          return team.id == winteam.teamId 
      })

    return team[0].id

  }).indexOf(14)
  
  let wins =  winsByTeamsAux.filter(item => item.teamId == 14 )[0].wins
  let equalto = winsByTeamsAux.filter( (item) => item.wins == wins).length - 1
   
  if( equalto > 0 )
      return "Posicion Ranking : " + position + " Empatado con " + equalto + " equipo" 
   
  return  "Posicion Ranking : " + position
}

// 9 Realice una función que retorne una promesa con los nombres de los equipos en upper case.
// haga la llamada a la función creada desde esta función y asignarle la respuesta a la variable response.
// recuerde que debe esperar el retorno de función asíncrona para que su resultado pueda ser mostrado por el
// console.log. Utilice async await para la llamada asíncrona a la función.
// NOTA: solo debe crear la función asíncrona y agregar la llamada en la siguiente función.
async function getTeamsNamesAsUpperCase () {
  let response 
  // ------MAKE AWAIT CALL HERE------
  response =  await promeseUpper()
  // --------------------------------
  console.log('response:')
  console.log(response)
}

function promeseUpper(){
   return new Promise((resolve,reject) => {
      let teamUpper = teams.map(team => team.name.toUpperCase())
      resolve(teamUpper)
   })
}

// Impresión de soluciones. No modificar.
console.log('Pregunta 0')
console.log(listTeamsIds())
console.log('Pregunta 1')
console.log(listTeamsByCountry())
console.log('Pregunta 2')
console.log(sortTeamsByWins())
console.log('Pregunta 3')
console.log(leaguesWithWins())
console.log('Pregunta 4')
console.log((leaguesWithTeamWithLestWins()))
console.log('Pregunta 5')
console.log((leaguesWithTeamWithMostWins()))
console.log('Pregunta 6')
console.log((sortLeaguesByTeamsByWins()))
console.log('Pregunta 7')
console.log((sortLeaguesByTeams()))
console.log('Pregunta 8')
console.log((newTeamRanking()))
console.log('Pregunta 9')
console.log(getTeamsNamesAsUpperCase())