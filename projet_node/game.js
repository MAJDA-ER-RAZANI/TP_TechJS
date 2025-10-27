const axios = require('axios');
const readline = require('readline');



// point de vie initial
const PLAYER_HP = 300;
const BOT_HP = 300;


// Fonction pour récupérer un Pokémon et ses moves

async function getPokemon(name) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`
    );
    return response.data;
  } catch (error) {
    console.log("❌ Erreur : Pokémon introuvable !");
    return null;
  }
}


// Fonction pour demander au joueur de choisir une attaque

function chooseMove(playerMoves, rl) {
  console.log("\nVoici les attaques disponibles :");
  playerMoves.forEach((m, i) => {
    console.log(`${i + 1}. ${m.move.name}`);
  });

  return new Promise((resolve) => {
    rl.question("Choisis ton attaque (1-5) : ", (input) => {
      const choice = parseInt(input);
      if (choice < 1 || choice > playerMoves.length || isNaN(choice)) {
        console.log("❌ Choix invalide ! Essaie encore.");
        resolve(chooseMove(playerMoves, rl)); // relance le choix
      } else {
        resolve(playerMoves[choice - 1]); // retourne l'objet move
      }
    });
  });
}


// Fonction pour attaquer

function attack(attacker, defender, move) {
  console.log(`\n👉 ${attacker.name.toUpperCase()} utilise ${move.move.name.toUpperCase()}!`);

  const hitChance = Math.random() * 100;
  if (hitChance > 80) { // 80% de chance de toucher
    console.log(`❌ ${attacker.name}'s attack missed!`);
    return 0;
  }

  const damage = Math.floor(Math.random() * 40) + 10; // dégâts aléatoires 10-50
  console.log(`💥 Coup réussi ! ${defender.name} perd ${damage} HP`);
  return damage;
}

// Boucle principale du combat

async function startBattle(player, bot, rl) {
  let playerHP = PLAYER_HP;
  let botHP = BOT_HP;

  const playerMoves = player.moves.slice(0, 5);
  const botMoves = bot.moves.slice(0, 5);

  console.log("\n⚔️ Le combat commence !");
  console.log("----------------------");

  while (playerHP > 0 && botHP > 0) {
    // Joueur choisit son attaque
    const playerMove = await chooseMove(playerMoves, rl);
    const dmgToBot = attack(player, bot, playerMove);
    botHP -= dmgToBot;
    if (botHP <= 0) break;

    // Bot attaque automatiquement
    const botMove = botMoves[Math.floor(Math.random() * botMoves.length)];
    const dmgToPlayer = attack(bot, player, botMove);
    playerHP -= dmgToPlayer;

    console.log(`\n❤️ ${player.name}: ${playerHP > 0 ? playerHP : 0} HP | 🤖 ${bot.name}: ${botHP > 0 ? botHP : 0} HP`);
  }

  // Résultat final
  if (playerHP <= 0 && botHP <= 0) {
    console.log("\n⚔️ Égalité !");
  } else if (playerHP <= 0) {
    console.log(`\n💀 ${player.name} est K.O. ! Le bot gagne !`);
  } else {
    console.log(`\n🏆 ${bot.name} est K.O. ! Tu gagnes !`);
  }
}

// Interface console pour choisir le Pokémon

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Choisis ton Pokémon : ", async (playerChoice) => {
  const player = await getPokemon(playerChoice);
  if (!player || player.moves.length === 0) {
    console.log("⚠️ Pokémon invalide ou aucune attaque disponible !");
    rl.close();
    return;
  }

  const botNames = ['charmander', 'bulbasaur', 'squirtle', 'eevee', 'pikachu'];
  const randomBot = botNames[Math.floor(Math.random() * botNames.length)];
  const bot = await getPokemon(randomBot);

  console.log(`\n🤖 Le bot choisit ${bot.name.toUpperCase()} !`);

  await startBattle(player, bot, rl);
  rl.close();
});
