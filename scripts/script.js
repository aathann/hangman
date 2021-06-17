// Game interface elements
let lettersContainer = document.querySelector('.letters-container'),
    container = document.querySelector('.container');

let preloader = $('.preload-screen');

let answerArrayBox = document.querySelector('.answerArrayBox'),
    hintBox = document.querySelector('.hintBox'),
    attemptsBox = document.querySelector('.attempts');

let skipButton = document.querySelector('.skipButton'),
    skipKeys = document.querySelector('.skipKeys');

let keys = 1;

let gameInfo = document.querySelector('.gameInfo'),
    aboutGameButton = document.querySelector('.aboutGameButton');

// Game Sounds
let winSound = new Audio('sounds/win-sound.mp3');
let loseSound = new Audio('sounds/lose-sound.mp3');
let clickSound = new Audio('sounds/click-sound.mp3');
let skipSound = new Audio('sounds/skip-sound.mp3');
let nokeySound = new Audio('sounds/nokey-sound.mp3');
let activatedSound = new Audio('sounds/activated-sound.mp3');

let statusScreen = $('.statusScreen');

// Global function
function globalFunct() {
    statusScreen.hide();

    let infoIsActive = true;
    function showInfo() {
        if (infoIsActive) {
            gameInfo.style.display = 'block';
            gameInfo.style.visibility = 'visible';
            aboutGameButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
            infoIsActive = false;
        } else if (!infoIsActive) {
            gameInfo.style.display = 'none';
            gameInfo.style.visibility = 'hidden';
            aboutGameButton.innerHTML = '<i class="fa fa-question" aria-hidden="true"></i>';
            infoIsActive = true;
        }
    }
    aboutGameButton.onclick = showInfo;

    // Add letters to game interface
    function addLetters() {

        let letters = ["Ա", "Բ", "Գ", "Դ", "Ե", "Զ", "Է", "Ը", "Թ", "Ժ", "Ի", "Լ", "Խ", "Ծ", "Կ", "Հ", "Ձ", "Ղ", "Ճ", "Մ", "Յ", "Ն", "Շ", "Ո", "Չ", "Պ", "Ջ", "Ռ", "Ս", "Վ", "Տ", "Ր", "Ց", "Ւ", "Փ", "Ք", "և", "Օ", "Ֆ"];

        lettersContainer.innerHTML = '';
        for (let i = 0; i < letters.length; i++) {
            let letterBox = document.createElement("button");
            letterBox.classList.add("letter");
            // letterBox.setAttribute("onclick", "getGuess('" + letters[i] + "')");
            letterBox.innerHTML = letters[i];
            lettersContainer.appendChild(letterBox);
        }
    }
    // The function of picking one of the words from categories
    function pickWord() {
        // Word categories
        let categories = [
            "Կենդանի",
            "Թռչուն",
            "Պետություն",
            "Միրգ",
            "Բանջարեղեն",
            "Օվկիանոս",
            "Սպասք",
            "Կահույք",
            "Տեխնիկա",
            "Տրանսպորտ կամ մասեր",
            "ՀՀ քաղաք",
            "Հայ գրող",
        ];
        // Words
        let words = [
            ["ւղտ", "բորենի", "առյւծ", "կով", "փորսւղ", "արջ", "աղվես", "գայլ", "շւն", "կատւ", "փիղ", "վագր", "ձի", "ճագար", "մւկ", "նապաստակ", "կոկորդիլոս", "ընձւղտ", "կենգւրւ", "կապիկ", "զեբր", "պանդա", "ռնգեղջյւր", "բիզոն", "չղջիկ", "եղնիկ", "գետազի", "հովազ", "սկյւռ", "ոզնի", "ընձառյւծ",],
            ["արագիլ", "սոխակ", "կկւ", "բւ", "սիրամարգ", "ծիծեռնակ", "բադ", "կարապ", "ֆլամինգո", "բազե", "արծիվ", "ագռավ", "կիվի", "անգղ", "բվեճ", "կաքավ", "ալբատրոս", "կաչաղակ", "հավ", "հնդկահավ",],
            ["նիդերլանդներ", "անդորրա", "հւնաստան", "սերբիա", "գերմանիա", "շվեյցարիա", "սլովակիա", "բելգիա", "հւնգարիա", "ռւմինիա", "լիխտենշտայն", "մալթա", "լեհաստան", "վատիկան", "ավստրիա", "լիտվա", "իռլանդիա", "խորվաթիա", "ւկրաինա", "մոլդովա", "դանիա", "պորտւգալիա", "սլովենիա", "լյւքսեմբւրգ", "իսպանիա", "բելառւս", "մոնակո", "ռւսաստան", "նորվեգիա", "ֆրանսիա", "չեխիա", "իսլանդիա", "լատվիա", "իտալիա", "բւլղարիա", "շվեդիա", "էստոնիա", "ալբանիա", "ֆինլանդիա", "չեռնոգորիա", "կոսովո", "հորդանան", "թւրքիա", "ղազախստան", "թւրքմենստան", "իրաք", "ադրբեջան", "թաիլանդ", "բրւնեյ", "լիբանան", "ղրղզստան", "լաոս", "բանգլադեշ", "սիրիա", "հնդկաստան", "ինդոնեզիա", "կատար", "տաջիկստան", "հայաստան", "իսրայել", "պակիստան", "աֆղանստան", "նեպալ", "մալայզիա", "մալդիվներ", "բահրեյն", "ֆիլիպիններ", "օման", "մյանմա", "կիպրոս", "չինաստան", "կամբոջա", "եմեն", "սինգապւր", "ւզբեկստան", "վրաստան", "իրան", "ճապոնիա", "բւթան", "մոնղոլիա", "վիետնամ", "քւվեյթ", "պաղեստին", "արցախ", "աբխազիա", "թայվան", "նիգերիա", "եթովպիա", "գանա", "ալժիր", "մադագասկար", "էրիտրեա", "մալի", "գամբիա", "բւրւնդի", "սեյշելներ", "նամիբիա", "բոտսվանա", "սենեգալ", "ջիբւթի", "տանզանիա", "եգիպտոս", "ւգանդա", "ռւանդա", "գվինեա", "գաբոն", "մալավի", "տոգո", "անգոլա", "զամբիա", "մոզամբիկ", "լեսոթո", "սվազիլենդ", "սոմալի", "լիբերիա", "կոմորներ", "քենիա", "չադ", "նիգեր", "մավրիտանիա", "մավրիկիոս", "բենին", "մարոկկո", "լիբիա", "թւնիս", "զիմբաբվե", "սւդան", "կամերւն", "սոմալիլենդ", "պարագվայ", "բելիզ", "կոլւմբիա", "բրազիլիա", "բարբադոս", "արգենտինա", "կւբա", "գվատեմալա", "գայանա", "վենեսւելա", "ճամայկա", "էկվադոր", "պերւ", "նիկարագւա", "մեքսիկա", "ւրւգվայ", "բահամներ", "կանադա", "պանամա", "սւրինամ", "հայիթի", "դոմինիկա", "սալվադոր", "չիլի", "գրենադա", "բոլիվիա", "հոնդւրաս", "սամոա", "ավստրալիա", "պալաւ", "տոնգա", "միկրոնեզիա", "վանւատւ", "ֆիջի", "տւվալւ", "կիրիբատի", "նաւրւ",],
            ["մանգո", "խնձոր", "դեղձ", "տանձ", "խաղող", "սերկևիլ", "կոկոս", "ավոկադո", "նւռ", "ծիրան", "նարինջ", "կիվի", "թւրինջ", "մանդարին", "սալոր", "կիտրոն", "լայմ", "թւզ", "արքայախնձոր", "արքայանարինջ",],
            ["պղպեղ", "լոլիկ", "շաղգամ", "սխտոր", "սոխ", "դդւմ", "սմբւկ", "վարւնգ", "կաղամբ", "բողկ", "կարտոֆիլ", "բազւկ", "գազար", "ճակնդեղ",],
            ["խաղաղ", "ատլանտյան", "հնդկական", "հարավային", "հյւսիսային"],
            ["կաթսա", "սկւտեղ", "թավա", "պատառաքաղ", "գդալ", "դանակ", "կճւճ", "կւժ", "բաժակ", "գավաթ", "ափսե", "շերեփ",],
            ["սեղան", "աթոռ", "պահարան", "բազմոց", "գրապահարան", "գրասեղան", "անկողին",],
            ["տպիչ", "բլենդեր", "ստեղնաշար", "հաշվիչ", "մոնիտոր", "տեսախցիկ", "մկնիկ", "արդւկ", "ֆոտոխցիկ", "ժամացւյց", "սմարթֆոն", "համակարգիչ", "թեյնիկ", "հեռախոս", "ռադիո", "փոշեկւլ", "օդորակիչ", "սառնարան", "մսաղաց", "սրճեփ",],
            ["ավտոբւս", "օդանավ", "դիմապակի", "անվադող", "սւզանավ", "ինքնաթիռ", "անիվ", "շարժիչ", "ավտոմեքենա", "ղեկ", "նավ", "ւղղաթիռ", "հեծանիվ", "տրոլեյբւս", "բեռնախցիկ", "մարդատար", "տրամվայ", "տաքսի", "նավախցիկ", "շարժիչ",],
            ["աբովյան", "ագարակ", "ալավերդի", "ախթալա", "այրւմ", "աշտարակ", "ապարան", "արարատ", "արթիկ", "արմավիր", "արտաշատ", "բերդ", "բյւրեղավան", "գավառ", "գյւմրի", "գորիս", "դաստակերտ", "դիլիջան", "եղեգնաձոր", "եղվարդ", "երևան", "վաղարշապատ", "թալին", "թւմանյան", "իջևան", "ծաղկաձոր", "կապան", "հրազդան", "ճամբարակ", "մասիս", "մարալիկ", "մարտւնի", "մեծամոր", "մեղրի", "նոյեմբերյան", "շամլւղ", "չարենցավան", "ջերմւկ", "սիսիան", "սպիտակ", "ստեփանավան", "սևան", "վայք", "վանաձոր", "վարդենիս", "վեդի", "տաշիր", "քաջարան",],
            ["չարենց", "իսահակյան", "սևակ", "տերյան", "սւնդւկյան", "թոթովենց", "աբովյան", "թւմանյան", "մւրացան", "մեծարենց", "սիամանթո", "շիրվանզադե", "զորյան", "քւչակ", "դւրյան", "շիրազ", "նալբանդյան", "ֆրիկ", "պարոնյան", "րաֆֆի", "բակւնց", "դաշտենց", "պատկանյան",],
        ];
        let categoryIndex = Math.floor(Math.random() * words.length);
        let wordIndex = Math.floor(Math.random() * words[categoryIndex].length);

        let theWord = words[categoryIndex][wordIndex];
        let category = categories[categoryIndex];
        return [theWord, category];
    }
    // Create an array by word length
    function setupAnswerArray(word) {
        let answerArray = [];
        for (let i = 0; i < word.length; i++) {
            answerArray[i] = '_';
        }
        return answerArray;
    }
    // Win screen function
    function showAnswerAndCongratulate(answerArray) {
        statusScreen.html("<div class='winLose'> Կեցցե՛ս, պատասխանը՝ " + answerArray.join("").charAt(0).toUpperCase() + answerArray.join("").slice(1) + "</div>");
        winSound.play();
        statusScreen.fadeIn(500).delay(2000).fadeOut(500);
        setTimeout(globalFunct, 3000);
    }
    // Lose screen function
    function showAnswerAndLoseScreen(word) {
        word = word.split("");
        for (let i = 0; i < word.length; i++) {
            if (word[i] === 'ւ') {
                word[i] = 'ու';
            }
        }
        word = word.join("");
        statusScreen.html("<div class='winLose'> Չգուշակեցիր, պատասխանը՝ " + word.charAt(0).toUpperCase() + word.slice(1) + "</div>");
        loseSound.play();
        statusScreen.fadeIn(500).delay(2000).fadeOut(500);
        setTimeout(globalFunct, 3000);
    }
    // The function of inserting an array into the game interface
    function insertArray(answerArray) {
        answerArrayBox.innerHTML = answerArray.charAt(0).toUpperCase() + answerArray.slice(1);
    }
    // Canvas animations function TODO:
    // function drawSegment() {};

    let wordAndHint = pickWord();
    let word = wordAndHint[0];
    let hint = wordAndHint[1];
    let answerArray = setupAnswerArray(word);
    let remainingLetters = word.length;
    let attempts = 8;
    let isOnce;
    skipKeys.innerHTML = keys;
    hintBox.innerHTML = hint;
    attemptsBox.innerHTML = "Փորձեր՝ <b>" + attempts + "</b>";

    // Function of pressing a button
    function getGuess() {
        clickSound.play();
        isOnce = true;
        let thisLetter = this.innerHTML.toLowerCase();
        if (thisLetter === 'ւ') {
            thisLetter = 'ու';
        }
        let apperances = 0;
        attempts--;

        for (let j = 0; j < word.length; j++) {
            if (thisLetter === word[j] || thisLetter === 'ո' + word[j]) {
                if (answerArray[j] === '_') {
                    answerArray[j] = thisLetter;
                    insertArray(answerArray.join(" "));
                    apperances++;
                }
                if (isOnce) {
                    attempts++;
                    isOnce = false;
                }
            }
        }
        attemptsBox.innerHTML = "Փորձեր՝ <b>" + attempts + "</b>";
        if (attempts <= 0) {
            showAnswerAndLoseScreen(word);
        }
        remainingLetters -= apperances;

        if (remainingLetters <= 0) {
            showAnswerAndCongratulate(answerArray);
            if (attempts == 8) {
                keys += 2;
                skipKeys.innerHTML = keys;
            } else {
                keys++;
                skipKeys.innerHTML = keys;
            }
        }
        // Chage button color, and disable
        this.style.background = '#c5ccbc';
        this.style.color = '#e6e6e6';
        this.style.transform = 'translate(-2px,4px)';
        this.style.boxShadow = 'none';
        this.setAttribute("disabled", "true");
    }
    // Skip the word
    skipButton.onclick = function () {
        if (keys > 0) {
            globalFunct();
            skipSound.play();
            keys--;
            skipKeys.innerHTML = keys;
        } else {
            nokeySound.play();
            skipKeys.style.color = "#ff8e71";
            setTimeout(function () {
                skipKeys.style.color = "#888";
            }, 200);
        }
    };

    function activateAll() {
        addLetters();
        insertArray(answerArray.join(" "));

        let letter = document.querySelectorAll('.letter');
        for (let i = 0, len = letter.length; i < len; i++) {
            letter[i].onclick = getGuess;

        }
    }
    activateAll();
    // by Narek Avanesyan
}
window.onload = function () {
    globalFunct();
    preloader.fadeOut();
}
window.onbeforeunload = function () {
    return confirm("Everything will be lost!");
};