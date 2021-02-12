function globalFunct() {
    let lettersContainer = document.querySelector('.letters-container'),
        container = document.querySelector('.container'),
        answerArrayBox = document.querySelector('.answerArrayBox'),
        hintBox = document.querySelector('.hintBox'),
        attemptsBox = document.querySelector('.attempts'),
        skipButton = document.querySelector('.skipButton');

        skipButton.onclick = globalFunct;

    let statusScreen = $('.statusScreen');
    statusScreen.hide();

    let winSound = new Audio('sounds/win-sound.mp3');
    let loseSound = new Audio('sounds/lose-sound.mp3');
    let clickSound = new Audio('sounds/click-sound.mp3');

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
    function pickWord() {
        let categories = [
            "Կենդանի",
            "Թռչուն",
            "Միրգ",
            "Բանջարեղեն",
            "Սպասք և կահույք",
            "Տեխնիկա",
            "Տրանսպորտ կամ մասեր",
            "ՀՀ քաղաք",
            "Հայ գրող"
        ];
        let words = [
            ["ւղտ", "բորենի", "առյւծ", "կով", "փորսւղ", "արջ", "աղվես", "գայլ", "շւն", "կատւ", "փիղ", "վագր", "ձի", "ճագար", "մւկ", "նապաստակ", "կոկորդիլոս", "ընձւղտ", "կենգուրու", "կապիկ",],
            ["արագիլ", "սոխակ", "կկւ", "բւ", "սիրամարգ", "ծիծեռնակ", "բադ", "կարապ", "ֆլամինգո", "բազե", "արծիվ", "ագռավ", "կիվի", "անգղ", "բվեճ", "կաքավ", "ալբատրոս", "կաչաղակ", "հավ", "հնդկահավ",],
            ["մանգո", "խնձոր", "դեղձ", "տանձ", "խաղող", "սերկևիլ", "կոկոս", "ավոկադո", "նւռ", "ծիրան", "նարինջ", "կիվի", "թւրինջ", "մանդարին", "սալոր", "կիտրոն", "լայմ", "թւզ", "արքայախնձոր", "արքայանարինջ",],
            ["պղպեղ","լոլիկ","շաղգամ","սխտոր","սոխ","դդւմ","սմբւկ","վարւնգ","կաղամբ","բողկ","կարտոֆիլ","բազւկ","գազար","ճակնդեղ",],
            ["կաթսա", "սկւտեղ", "թավա", "պատառաքաղ", "գդալ", "դանակ", "կճւճ", "կւժ", "բաժակ", "գավաթ", "ափսե", "աղաման", "շերեփ", "սեղան", "աթոռ", "պահարան", "բազմոց", "գրապահարան", "գրասեղան", "անկողին",],
            ["տպիչ", "բլենդեր", "ստեղնաշար", "հաշվիչ", "մոնիտոր", "տեսախցիկ", "մկնիկ", "արդւկ", "ֆոտոխցիկ", "ժամացւյց", "սմարթֆոն", "համակարգիչ", "թեյնիկ", "հեռախոս", "ռադիո", "փոշեկւլ", "օդորակիչ", "սառնարան", "մսաղաց", "սրճեփ",],
            ["ավտոբւս", "օդանավ", "դիմապակի", "անվադող", "սւզանավ", "ինքնաթիռ", "անիվ", "շարժիչ", "ավտոմեքենա", "ղեկ", "նավ", "ւղղաթիռ", "հեծանիվ", "տրոլեյբւս", "բեռնախցիկ", "մարդատար", "տրամվայ", "տաքսի", "նավախցիկ", "շարժիչ",],
            ["աբովյան","ագարակ","ալավերդի","ախթալա","այրւմ","աշտարակ","ապարան","արարատ","արթիկ","արմավիր","արտաշատ","բերդ","բյւրեղավան","գավառ","գյւմրի","գորիս","դաստակերտ","դիլիջան","եղեգնաձոր","եղվարդ","երևան","վաղարշապատ","թալին","թւմանյան","իջևան","ծաղկաձոր","կապան","հրազդան","ճամբարակ","մասիս","մարալիկ","մարտւնի","մեծամոր","մեղրի","նոյեմբերյան","շամլուղ","չարենցավան","ջերմւկ","սիսիան","սպիտակ","ստեփանավան","սևան","վայք","վանաձոր","վարդենիս","վեդի","տաշիր","քաջարան",],
            ["չարենց","իսահակյան","սևակ","տերյան","սւնդւկյան","թոթովենց","աբովյան","թւմանյան","մւրացան","մեծարենց","սիամանթո","շիրվանզադե","զորյան","քւչակ","դւրյան","շիրազ","նալբանդյան","ֆրիկ","պարոնյան","րաֆֆի","բակւնց","դաշտենց","պատկանյան",]
        ];
        let categoryIndex = Math.floor(Math.random() * words.length);
        let wordIndex = Math.floor(Math.random() * words[categoryIndex].length);

        let theWord = words[categoryIndex][wordIndex];
        let category = categories[categoryIndex];
        return [theWord, category];
    }
    function setupAnswerArray(word) {
        let answerArray = [];
        for (let i = 0; i < word.length; i++) {
            answerArray[i] = '_';
        }
        return answerArray;
    }
    function showAnswerAndCongratulate(answerArray) {
        statusScreen.html("<div class='winLose'> Կեցցե՛ս, պատասխանը՝ " + answerArray.join("").charAt(0).toUpperCase() + answerArray.join("").slice(1) + "</div>");
        winSound.play();
        statusScreen.fadeIn(500).delay(2000).fadeOut(500);
        setTimeout(globalFunct, 3000);
    }
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
    function insertArray(answerArray) {
        answerArrayBox.innerHTML = answerArray.charAt(0).toUpperCase() + answerArray.slice(1);
    }
    let wordAndHint = pickWord();
    let word = wordAndHint[0];
    let hint = wordAndHint[1];
    let answerArray = setupAnswerArray(word);
    let remainingLetters = word.length;
    let attempts = 8;
    let isOnce;
    hintBox.innerHTML = hint;
    attemptsBox.innerHTML = "Փորձեր՝ <b>" + attempts + "</b>";

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
            // lettersContainer.innerHTML = '';
        }
        this.style.background = '#c5ccbc';
        this.style.color = '#e6e6e6';
        this.style.transform = 'translate(-2px,4px)';
        this.style.boxShadow = 'none';
        this.setAttribute("disabled", "true");
    }

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
}