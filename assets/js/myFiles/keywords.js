let num = 0;

const texte= ['Création de site web', 'Responsive design', 'Wordpress', 'Architecture de site', 'Référencement naturel'];
const colors = ["#3CC157", "#2AA7FF", "#eb00b9", "#FCBC0F", "#F85F36"];

let move = ()=> {
  let spotNumber = Math.floor(Math.random() * texte.length);
  let colorNumber = Math.floor(Math.random() * (colors.length-1));
  setTimeout(()=> {
  document.getElementById("texte" + spotNumber).style.opacity = "1";
    //Faire attention a ce que la duration de 2s soit égale à 2000
  document.getElementById("texte" + spotNumber).style.transitionDuration = "2s";
  }, 2000);

  document.getElementById("texte" + spotNumber).textContent = texte[num];
  document.getElementById("texte" + spotNumber).style.color = colors[colorNumber];
  document.getElementById("texte" + spotNumber).style.opacity = "1";
  document.getElementById("texte" + spotNumber).style.transitionDuration = "2s";
  setTimeout(()=> {
  document.getElementById("texte" + spotNumber).style.opacity = "0";
  //Faire attention a ce que la duration de 3s soit égale à 3000
  document.getElementById("texte" + spotNumber).style.transitionDuration = "3s";
  }, 3000);
  if ( num >= (texte.length -1)) {
      num = 0;
  }
  num++;
  console.log(colorNumber);
};

setTimeout(()=> {setInterval(move, 5000);}, 500);