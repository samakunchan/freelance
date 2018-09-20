//Initialisation des couleurs
const colors = ['#3CC157', '#2AA7FF', '#1B1B1B', '#FCBC0F', '#F85F36'];
//Initialisation du nombre de boules
const numBalls = 50;

//Ce tableau vide contiendra des 50 div.ball avec différents styles.
const balls = [];
//Les 50 boules deviennent des div.ball avec un bg-color au hasard dans le tableau colors et un position au hasard
for (let i = 0; i < numBalls; i++) {
  let ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.background = colors[Math.floor(Math.random() * colors.length)];
  ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
  ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
  ball.style.transform = `scale(${Math.random()})`;
  ball.style.width = `${Math.random()}em`;
  ball.style.height = ball.style.width;

  balls.push(ball);
  document.getElementById('home').append(ball);
}

// Keyframes
//Chaques boules dans le tableau balls subira une transformation(x,y) avec une itération infinite
balls.forEach((el, i)=>{
  let to = {
    x: Math.random() * (i % 2 === 0 ? -11 : 11),
    y: Math.random() * 12
  };

  let anim = el.animate(
    [
      { transform: 'translate(0, 0)' },
      { transform: `translate(${to.x}rem, ${to.y}rem)` }
    ],
    {
      duration: (Math.random() + 1) * 2000, // random duration
      direction: 'alternate',
      fill: 'both',
      iterations: Infinity,
      easing: 'ease-in-out'
    }
  );
});
