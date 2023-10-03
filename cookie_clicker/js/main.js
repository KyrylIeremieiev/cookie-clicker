class Cookie{
    name = "";
    htmlElement = undefined;
    score = undefined;
    factor = 1;
    //constructor kun je een argument geven
    constructor(name, newHtmlElement, newScore){
        this.name = name;
        this.htmlElement = newHtmlElement;
        this.htmlElement.onclick = this.CookieClicked;
        this.score = newScore;
    }
    CookieClicked = () =>{
        this.score.CookieClicked(this.factor);
    }

    onStyleChange(){
        this.htmlElement.classList.add("cookie--choco");

    }

    onStyleChangeValvet(){
        this.htmlElement.classList.add("cookie--valvet")
    }
}

class Score{
    score = 0;
    name="";
    htmlElement = undefined;
    autoActive = false;
    baughtAuto = false;

    constructor(newScore, newName, newhtmlElement){
        this.score = newScore;
        this.name = newName;
        this.htmlElement = newhtmlElement;
        this.htmlElement.innerText = newScore;
    }

    CookieClicked(factorCookie){
        this.htmlElement.innerText = this.score+=factorCookie;
    }

    subtractScore(){
        this.score -= 100;
        this.htmlElement.innerText = this.score;
    }

    onAutoScoreClick = () =>{
        if(this.autoActive == false && this.baughtAuto ==false && window.localStorage.getItem("auto") != "true"){
            this.addAutoPoints();
            this.autoActive=true;
            this.baughtAuto=true;
            this.subtractScore()
            window.localStorage.setItem("auto", true);
        }
        else{
            console.log("active")
        }
    }

    addPoints(){
        this.score += 10000
        this.htmlElement.innerText = this.score;
    }

    scoreLoaded(newScore){
        this.score = newScore;
        this.htmlElement.innerText = this.score;
    }

    addAutoPoints(){
        setInterval(() =>{
            this.score += 500
            this.htmlElement.innerText = this.score;
        }, 10000)
    }
}

class Multiplier{
    factor = 100;
    htmlElement = undefined;
    cookie = undefined;
    baught = false;

    constructor(HtmlElement, cookie){
        this.htmlElement = HtmlElement
        this.htmlElement.onclick = this.onMultiClicked;
        this.cookie = cookie;
        this.OwnedMultiCheck();
    }

    onMultiClicked = () =>{
        if (this.baught == false && window.localStorage.getItem("multi") != "true"){
            window.localStorage.setItem("multi", true)
            console.log("nope")
            this.cookie.score.subtractScore()
            this.cookie.factor = this.factor;
            this.baught=true;
        }
    }

    OwnedMultiCheck(){
        if(window.localStorage.getItem("multi") == "true")
        {
            console.log("yes")
            this.cookie.factor = this.factor;
        }
    }

}

class AutoScore{
    htmlElement = undefined;
    score = undefined;
    constructor(htmlElement, score){
        this.htmlElement = htmlElement;
        this.score = score;
        this.htmlElement.onclick = this.onAutoScoreClick;
        this.AutoBaughtCheck();
    }

    onAutoScoreClick = () => {
        score.onAutoScoreClick();
    }

    AutoBaughtCheck(){
        if(window.localStorage.getItem("auto") == "true"){
            score.addAutoPoints()
        }
    }
}

class ChocolateCookie{
    htmlElement = undefined;
    baught = false;
    cookie = undefined;
    velvetCookie = false;

    constructor(htmlElement, cookie){
        this.htmlElement = htmlElement;
        this.cookie = cookie;
        this.htmlElement.onclick = this.onChocoCookieClicked;
    }

    onChocoCookieClicked = () =>{
        if(this.baught == false && window.localStorage.getItem("chocolateCookie") != "true"){
            this.baught = true
            window.localStorage.setItem("chocolateCookie", true)
            this.cookie.score.addPoints();
            this.TextChange();
        }
        else if(this.baught == true){
            if(this.velvetCookie == false){
                this.cookie.onStyleChangeValvet();
                this.cookie.score.addPoints();
                this.velvetCookie = true;
            }
        }
        this.cookie.onStyleChange()
    }

    TextChange(){
        this.htmlElement.innerText = "Red Valvet"
    }
}

class Save{
    htmlElement;
    constructor(newHtmlElement){
        this.htmlElement = newHtmlElement;
        this.htmlElement.onclick = this.onSaveBtnClick;
    }

    onSaveBtnClick = () =>{
        window.localStorage.setItem("score", score.score);
    }
}

class Load{
    score;

    constructor(score){
        this.score = score;

        this.onLoad();
    }

    onLoad = function(){
        const scoreFrmLclStrg = window.localStorage.getItem("score"); 
        if(scoreFrmLclStrg != null){
            this.score.scoreLoaded(parseInt(scoreFrmLclStrg));
        } 
    }
}

//set up score & cookie
const score = new Score(100, "Defualt Score", document.getElementById("js--score"))
const cookie = new Cookie("Defualt Cookie", document.getElementById("js--cookie"), score);

//setup desktop upgrades
const multiplier = new Multiplier(document.getElementById("js--multi"), cookie);
const auto = new AutoScore(document.getElementById("js--autoScore"),score);
const choco = new ChocolateCookie(document.getElementById("js--choco"), cookie);

const save = new Save(document.getElementById("js--save"));
const load = new Load(score);

//setup mobile
/* const mobileMulti = new Multiplier(document.getElementById("js--multi--mobile"),cookie);
const mobileAuto = new AutoScore(document.getElementById("js--auto--mobile"), score);
const mobileChoco = new ChocolateCookie(document.getElementById("js--choco--mobile"), cookie); */

/* 
widnow.localStorage.clear();
window.localStorage.setItem("name","Jeroen") */