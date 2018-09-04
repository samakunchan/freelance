let pageAnimationScroll = (event)=> {
    //On détermine si la souris scroll up ou down
    let delta = ((event.deltaY || -event.wheelDelta || event.detail) >> 10) || 1;
    //On exécute l'action du scroll
    scrollDown(delta);
    scrollUp(delta);
};
let scrollDown = (delta)=> {

    let i;
    for ( i = 0 ; i < document.getElementsByClassName("page").length ; i++){

        if (delta == 1 && document.querySelector(".part"+i).classList.contains("active-page")){
            if(i === (document.getElementsByClassName("page").length - 1)){
                return true;
            }else {
                document.querySelector(".part"+i).classList.remove("active-page");
            }
            document.querySelector(".part"+(i+1)).style.top = "-"+100*(i+1)+"vh";
            document.querySelector(".part"+(i+1)).style.transitionDuration = "1s";
            setTimeout(function () {
                document.querySelector(".part"+(i+1)).classList.add("active-page");
            },1000);
            return true;
        }

    }
};
let scrollUp = (delta)=> {

    for (let i = 0 ; i < document.getElementsByClassName("page").length ; i++){
        if (delta == -1 && document.querySelector(".part"+i).classList.contains("active-page")){

            if (i === 0){
                return true;
            }else {
                document.querySelector(".part"+i).classList.remove("active-page");
            }
            if (i === 1){
                document.querySelector(".part"+i).style.top = "0vh";
            }else {
                document.querySelector(".part"+i).style.top = "-100vh";
            }
            document.querySelector(".part"+i).style.transitionDuration = "1s";

            setTimeout(function () {
                document.querySelector(".part"+(i-1)).classList.add("active-page");
            }, 1000);
            return true;

        }
    }
};
let initSection = ()=> {
    for (let i = 0 ; i <= (document.getElementsByClassName("page").length - 1) ; i++) {
        if (document.querySelector(".part"+i).classList.contains("active-page")){
            document.querySelector(".part"+i).classList.remove("active-page");
        }
    }
};
let toHome= (event)=> {
    event.preventDefault();
    initSection();
    document.querySelector(".part0").style.top = "0vh";
    document.querySelector(".part0").style.transitionDuration = "1s";
    document.querySelector(".part0").classList.add("active-page");
    document.querySelector(".part1").style.top = "0vh";
    document.querySelector(".part2").style.top = "-100vh";
};
let toSection1 =(event)=> {
    event.preventDefault();
    initSection();
    document.querySelector(".part1").style.top = "-100vh";
    document.querySelector(".part1").style.transitionDuration = "1s";
    document.querySelector(".part1").classList.add("active-page");
    document.querySelector(".part2").style.top = "100vh";
};
let toSection2 = (event)=> {
    event.preventDefault();
    initSection();
    document.querySelector(".part2").style.top = "-200vh";
    document.querySelector(".part2").style.transitionDuration = "1s";
    document.querySelector(".part2").classList.add("active-page");
    document.querySelector(".part1").style.top = "-100vh";
}

//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//----------------------------DEBUT DE L'APPLICATION------------------------------------------------
//--------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------
//La section qui contient active-page est activé dès le début
if (document.querySelector(".part0").classList.contains("active-page"))document.querySelector(".part0").style.top = "0vh";

//Au scroll de la souris pour presque tout les navigateurs
window.addEventListener("mousewheel", pageAnimationScroll);
//Au scroll de la souris pour FireFox
window.addEventListener("DOMMouseScroll", pageAnimationScroll);

document.getElementById("part0").addEventListener("click", toHome);
document.getElementById("part1").addEventListener("click", toSection1);
document.getElementById("part2").addEventListener("click", toSection2);