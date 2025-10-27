console.log("Programme démarré")
const prom=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve("success")
    },3000)
})
console.log("Programme en cours...");
prom.then((message)=>{
    console.log(message);
  console.log("Programme terminé");
})