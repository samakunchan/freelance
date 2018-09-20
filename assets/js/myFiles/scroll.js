//******************************************************************************************//
//*****************INITIALISATION DU POSITIONNEMENT DES PAGES******************************//
//****************************************************************************************//
let initPages = ()=>{
  if (document.querySelector('.part0').classList.contains('active-page')){
    for (let i = 0; i < document.getElementsByClassName('page').length; i++){
      document.querySelector('.part'+i).style.top = '0vh';
    }
  }
};
//******************************************************************************************//
//*****************CALLBACK DE L'EVENT SCROLL***********************************************//
//****************************************************************************************//
let pageAnimationScroll = (event)=> {
  //On détermine si la souris scroll up ou down
  let delta = ((event.deltaY || -event.wheelDelta || event.detail) >> 10) || 1;
  //On exécute l'action du scroll
  scrollDown(delta);
  scrollUp(delta);
};
//******************************************************************************************//
//*****************FONCTIONS UTILISEES PAR LE CALLBACK L'EVENT SCROLL**********************//
//****************************************************************************************//
let scrollDown = (delta)=> {
  for (let i = 0 ; i < document.getElementsByClassName('page').length ; i++){
    if (delta == 1 && document.querySelector('.part'+i).classList.contains('active-page')){
      if(i === (document.getElementsByClassName('page').length - 1)){
        return true;
      }else {
        //Pour la navbar
        document.getElementById('part'+i).classList.remove('menu-actif');
        //Pour les pages
        document.querySelector('.part'+i).classList.remove('active-page');
      }
      document.querySelector('.slideshow').style.top = '-'+100*(i+1)+'vh';
      document.querySelector('.slideshow').style.transitionDuration = '1s';
      setTimeout(function () {
        document.getElementById('part'+(i+1)).classList.add('menu-actif');
        document.querySelector('.part'+(i+1)).classList.add('active-page');
      },1000);
      return true;
    }
  }
};
let scrollUp = (delta)=> {
  for (let i = 0 ; i < document.getElementsByClassName('page').length ; i++){
    if (delta == -1 && document.querySelector('.part'+i).classList.contains('active-page')){
      if (i === 0){
        return true;
      }else {
        //Pour la navbar
        document.getElementById('part'+i).classList.remove('menu-actif');
        document.querySelector('.part'+i).classList.remove('active-page');
      }
      if (i === 1){
        document.querySelector('.slideshow').style.top = '0vh';
      }else if(i === 2){
        document.querySelector('.slideshow').style.top = '-100vh';
      }else {
        document.querySelector('.slideshow').style.top = '-200vh';
      }
      document.querySelector('.slideshow').style.transitionDuration = '1s';

      setTimeout(function () {
        document.getElementById('part'+(i-1)).classList.add('menu-actif');
        document.querySelector('.part'+(i-1)).classList.add('active-page');
      }, 1000);
      return true;
    }
  }
};
//***************************************************************************************//
//*****************INITIALISATION DES STYLES POUR LE MENU ET LES PAGES******************//
//*************************************************************************************//
let initSection = ()=> {
  for (let i = 0 ; i <= (document.getElementsByClassName('page').length - 1) ; i++) {
    if (document.querySelector('.part'+i).classList.contains('active-page')){
      document.querySelector('.part'+i).classList.remove('active-page');
    }
  }
};
let intMenu = ()=>{
  for (let i = 0 ; i <= (document.getElementsByClassName('page').length - 1) ; i++) {
    if (document.getElementById('part'+i).classList.contains('menu-actif')){
      document.getElementById('part'+i).classList.remove('menu-actif');
    }
  }
};

//**************************************************************************************//
//*****************CALLBACK DES EVENT CLICK********************************************//
//************************************************************************************//
let toHome = (event)=> {
  event.preventDefault();
  intMenu();
  initSection();
  document.querySelector('.slideshow').style.top = '0vh';
  document.querySelector('.slideshow').style.transitionDuration = '1s';
  document.querySelector('.part0').classList.add('active-page');
  document.getElementById('part0').classList.add('menu-actif');
};
let toCompetence = (event)=> {
  event.preventDefault();
  intMenu();
  initSection();
  document.querySelector('.slideshow').style.top = '-100vh';
  document.querySelector('.slideshow').style.transitionDuration = '1s';
  document.querySelector('.part1').classList.add('active-page');
  document.getElementById('part1').classList.add('menu-actif');
};
let toRealisation = (event)=> {
  event.preventDefault();
  intMenu();
  initSection();
  document.querySelector('.slideshow').style.top = '-200vh';
  document.querySelector('.slideshow').style.transitionDuration = '1s';
  document.querySelector('.part2').classList.add('active-page');
  document.getElementById('part2').classList.add('menu-actif');
};
let toContact = (event)=> {
  event.preventDefault();
  intMenu();
  initSection();
  document.querySelector('.slideshow').style.top = '-300vh';
  document.querySelector('.slideshow').style.transitionDuration = '1s';
  document.querySelector('.part3').classList.add('active-page');
  document.getElementById('part3').classList.add('menu-actif');
};
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//----------------------------DEBUT DE L'APPLICATION------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//La section qui contient active-page est activé dès le début
initPages();

//Au scroll de la souris pour presque tout les navigateurs
window.addEventListener('mousewheel', pageAnimationScroll);
//Au scroll de la souris pour FireFox
window.addEventListener('DOMMouseScroll', pageAnimationScroll);

document.getElementById('part0').addEventListener('click', toHome);
document.getElementById('part1').addEventListener('click', toCompetence);
document.getElementById('part2').addEventListener('click', toRealisation);
document.getElementById('part3').addEventListener('click', toContact);