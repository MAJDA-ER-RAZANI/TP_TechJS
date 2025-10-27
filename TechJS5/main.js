console.log("Programme démarré");

const promesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("❌ Promesse rejetée après 2 secondes");
  }, 2000); // se rejette après 2 secondes

  setTimeout(() => {
    resolve("✅ Promesse résolue après 3 secondes");
  }, 3000); // se résout après 3 secondes
});

console.log("Programme en cours...");

promesse
  .then((message) => {
    console.log(message);
    console.log("Programme terminé");
  })
  .catch((erreur) => {
    console.log(erreur);
    console.log("Échec du programme");
  });