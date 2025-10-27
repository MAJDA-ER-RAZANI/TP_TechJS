console.log("Programme démarré");

const promesse = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("✅ Promesse 1 résolue après 3 secondes");
  }, 3000); // se résout après 3 secondes
});

console.log("Programme en cours...");

promesse
  .then((message) => {
    console.log(message);
    console.log("Programme 1 terminé");
    return new Promise ((resolve, reject) => {
  setTimeout(() => {
    resolve("✅ Promesse 2 résolue après 3 secondes");
  }, 3000); // se résout après 3 secondes
}).then((message)=>{
console.log(message);
    console.log("Programme 2 terminé");
})
  })