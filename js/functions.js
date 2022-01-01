body.onload = () => {
    let words;
//Fill text
    const fillText = (n) => {
        textElement.innerHTML = "";
        for (let i = 0; i < n; i++) {
            const word = getElement("div", {
                className: "word",
            }, textElement);

            let wordFromArr = wordsArr[getRandnum(wordsArr.length - 1)];
            if (wordFromArr === lastWord) {
                wordFromArr = wordsArr[getRandnum(wordsArr.length - 1)];
            }
            lastWord = wordFromArr;

            for (const wordFromArrElement of wordFromArr) {
                const letter = getElement("letter", {
                    innerHTML: wordFromArrElement,
                }, word);
            }
        }
    }

//Get Date
    const getDate = () => {
        const date = new Date();
        return (`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} (${date.getHours()} : ${date.getMinutes()})`);
    }

//creat element
    const getElement = (elementName, attrs = {}, father) => {
        const element = document.createElement(elementName);

        for (const attrsKey in attrs) {
            element[attrsKey] = attrs[attrsKey];
        }

        father && father.append(element);

        return element;
    }

//Rand number
    const getRandnum = (max, min = 0) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

//Keyboard
    mainBox.addEventListener('keydown', () => audio.play());

    //Render Scores
    const renderScores = (record, num) => {
        const resultData = JSON.parse(localStorage.getItem("resultData"));

        userScore.innerHTML = "";
        const p = getElement("p", {className: "info"}, userScore);
        const span = getElement("span", {}, p);

        getElement("span", {className: "green", innerHTML: "Your Record: "}, span);
        getElement("span", {className: "date", innerText: record.time}, span);
        const span1 = getElement("span", {className: "green"}, p)
        getElement("span", {className: "pe-2", innerHTML: record.speed + "wpm"}, span1);
        getElement("span", {innerHTML: record.present}, span1);

        let i = num;
        for (const resultDataElement of resultData.reverse())   {
            i--;
            const p = getElement("p", {className: "info"}, userScore);
            getElement("span", {className: "date", innerHTML: resultDataElement.time}, p);
            const span1 = getElement("span", {}, p)
            getElement("span", {className: "pe-2", innerHTML: resultDataElement.speed + "wpm"}, span1);
            getElement("span", {innerHTML: resultDataElement.present}, span1);
            if(i === 0)break;
        }
    }

    //ASOSIY
    const asosiy = (n = 25, stoped = false) =>
     {
        let isTimiStart = false;

        let successWord = 0;
        let wrongWord = 0;
        let successKey = 0;
        let wrongKey = 0;

        fillText(25);

        timeBox.innerHTML = "0 : 0";
        time = 0;
        function startTime() {
            isTimiStart = true;
            interVal = setInterval(() => {
                timeBox.innerHTML = `${Math.trunc(time / 60)} : ${time % 60}`;
                time++;
            }, 1000);
        }
        if(stoped === true) {
            clearInterval(interVal);
            return;
        }
        words = document.querySelectorAll(".word");

        let count = 0;
        let lastActiveWord = words[0];

        lastActiveWord.classList.add("active");
        let isFirst = true;
        const inputKeyup = (item) => {
            if(isFirst) {
                startTime();
                input.focus();
            }
            isFirst = false;
            //Word finish

            if(item.key === ' ') {
                if (input.value === " " || input.value === "") {
                    input.value = "";
                    return
                }
                count ++
                const activeWord = words[count];
                if (count === words.length) {
                    finishGame({
                        successWord: successWord,
                        successKey: successKey,
                        wrongWord: wrongWord,
                        wrongKey: wrongKey,
                        time: time,
                    }, interVal);
                    return;
                }

                if (lastActiveWord.innerText + " " === input.value){
                    lastActiveWord.classList.add("green");
                    ++successWord;
                    successKey += lastActiveWord.innerText.length;
                }
                else {
                    lastActiveWord.classList.add("danger");
                    ++wrongWord;
                    wrongKey += lastActiveWord.innerText.length;
                }

                lastActiveWord.classList.remove("active");
                lastActiveWord.classList.remove("dangerBg");

                activeWord.classList.add("active");
                lastActiveWord = activeWord;
                input.value = "";
            }

            // Letter
            else{
                if(input.value.trim() !== lastActiveWord.innerText.slice(0, input.value.length)){
                    lastActiveWord.classList.add("dangerBg")
                }else(
                    lastActiveWord.classList.remove("dangerBg")
                )
            }
        };
        input.addEventListener("keyup", inputKeyup)
    }

    refresh.addEventListener('click', startGame)


//IsRegister
    let isHaveUser = false;
    const haveUser = () => {
        const userData = JSON.parse(localStorage.getItem("userData"));
        if(userData){
            const recordS = JSON.parse(localStorage.getItem("recordTypeSpeed")) || {speed: 0};
            user.innerHTML = userData.userName;
            isHaveUser = true;
            userInfo.innerHTML = "";
            getElement("i", {className: "times fas fa fa-times", onclick: hideAside}, userInfo);
            getElement("h3", {
                innerHTML: userData.userName || "",
                className: "green",
            }, userInfo);
            const center = getElement("div", {className: "text-center"}, userInfo);

            const imgBox = getElement("div", {className: "img my-4 mx-auto"}, center)
            getElement("img", {src: userData.imgSrc ||"https://icon-library.com/images/user-image-icon/user-image-icon-11.jpg", className: "img-fluid"}, imgBox);
            getElement("h4", {innerHTML: userData.firstName + " " +  userData.lastName, className: "light"}, center);
            getElement("div", {className: "editBtn", innerHTML: ""});
            const recordP = getElement("p", {className: "green mt-4 d-flex justify-content-between", innerHTML: "Your Record: "}, userInfo);
            getElement("span", {className: "light", innerHTML: recordS.speed + " wpm"}, recordP);

            getElement("i", {
                className: "edit fas fa-user-edit pt-4",
                onclick: editUserDate,
            }, center);
            getElement("p", {
                className: "ovner",
                innerHTML: `&copy; Copyright by <a href="https://t.me/alisher_dev">AliwerDev</a>`
            }, userInfo)
        }
    }
    haveUser();

    function creatForm (info){
        if(!isHaveUser){
            getInfo(info);
            const save = document.querySelector(".save");
            save.addEventListener('click', getDataUser)
        }
        else{
            userInfo.style.right = "0";
            bgHind.classList.remove("d-none")
        }
    }
    function editUserDate(){
        hideAside();
        getInfo(JSON.parse(localStorage.getItem("userData")));

        const save = document.querySelector(".save");
        save.addEventListener('click', getDataUser)
    }
    user.addEventListener('click', creatForm);

    function getDataUser(){
        const form = document.querySelector("#formUser");
        const userName = form.querySelector("#userName");
        const firstName = form.querySelector("#firstName");
        const lastName = form.querySelector("#lastName");
        const imgSrc = form.querySelector("#imgSrc");

        for (const formElement of form) {
            if(formElement.value === "" && formElement.required === true) {
                alert(`${formElement.name} ni kiriting!`);
                return;
            }
        }

        let userData = {
            userName: userName.value,
            firstName: firstName.value,
            lastName: lastName.value,
            imgSrc: imgSrc.value,
        }
        userData = JSON.stringify(userData);

        modal.classList.add("d-none");
        modal.innerHTML = "";

        localStorage.setItem("userData", userData);
        haveUser();
    };


//Hide User date
    function hideAside(){
        userInfo.style.right = "-300px";
        bgHind.classList.add("d-none")
    }

    const getInfo = (editDate = {}) => {
        modal.classList.remove("d-none");
        modal.innerHTML = `<form action="" id="formUser">
                        <div class="mb-4 input-block">
                            <label for="userName">User name <span class="danger">*</span></label>
                            <input required value="${editDate.userName || ""}" placeholder="..." type="text" name="User Name" id="userName">
                        </div>
                        <div class="mb-4 input-block">
                            <label for="firstName">First name <span class="danger">*</span></label>
                            <input required value="${editDate.firstName || ""}" placeholder="..." type="text" name="First Name" id="firstName">
                        </div>
                        <div class="mb-4 input-block">
                            <label for="lastName">Last name <span class="danger">*</span></label>
                            <input required value="${editDate.lastName || ""}" placeholder="..." type="text" name="Last Name" id="lastName">
                        </div>
                        <div class="mb-4 input-block">
                            <label for="imgSrc">Your Img</label>
                            <input value="${editDate.imgSrc || ""}" placeholder="Img linkini yuklang.." type="text" name="Your Img" id="imgSrc">
                        </div>
                        <div class="input-block save-box">
                            <button value="button" class="save" type="button">Save</button>
                        </div>
                    </form>`;
    }

//Finish game
    const finishGame = (result, interVal) => {
        console.log(result)
        //User scorelarini chiqarish

        timeBox.innerHTML = "0 : 0";
        clearInterval(interVal);
        if (result === undefined) {
            return;
        }
        mainBox.classList.add("d-none");
        finishingBox.classList.remove("d-none");
        useTime.innerHTML = result.time + " S";
        let speedResult = Math.trunc((result.successKey / 5) / (result.time / 60));
        speed.innerHTML = speedResult;
        keys.innerHTML = `(<span class="mini green">${result.successKey}</span>, <span class="mini danger">${result.wrongKey}</span>) ${result.successKey + result.wrongKey}`;
        const getPresent = Math.trunc((result.successKey / (result.successKey + result.wrongKey)) * 100) + "%";
        present.innerHTML = getPresent;
        correctWords.innerHTML = result.successWord;
        wrongWords.innerHTML = result.wrongWord;


        if (isHaveUser){
            userScores.classList.remove("d-none");
            alertResult.classList.add("d-none");
            let resultData = JSON.parse(localStorage.getItem("resultData")) || [];
            let recordSpeed = JSON.parse(localStorage.getItem("recordTypeSpeed")) || {speed: 0, time: 0, present: 0};

            result.date = getDate();
            const newElement = {
                time: result.date,
                speed: speedResult,
                present: getPresent,
            };
            if(newElement.speed > recordSpeed.speed) {
                recordSpeed = newElement;
            }else if(newElement.speed === recordSpeed.speed && newElement.speed > recordSpeed.speed){
                recordSpeed = newElement;
            }
            localStorage.setItem("recordTypeSpeed", JSON.stringify(recordSpeed))

            resultData.forEach((item, index) => {
                if(item.speed === newElement.speed && item.present === recordSpeed.present){
                    resultData.splice(index, 1);
                }
            })

            resultData = [...resultData, newElement]
            localStorage.setItem("resultData", JSON.stringify(resultData));
            renderScores(recordSpeed, 4);
            if(resultData.length > 4)more.classList.remove("d-none");
        }else {
            alertResult.classList.remove("d-none");
        }
        haveUser();
    }

//    More info
    more.addEventListener('click', () => {
        const record = JSON.parse(localStorage.getItem("recordTypeSpeed"));
        renderScores(record, 30);
        more.classList.add("d-none");
    })

//StartGame
    function startGame() {
        asosiy(25);
        startingBox.classList.add("d-none")
        finishingBox.classList.add("d-none")
        mainBox.classList.remove("d-none");
        input.value = "";
        input.focus();
    }

//Start btn
    play.addEventListener("click", startGame);

//Reload Game
    reload.addEventListener('click', () => {
        window.location.reload();
    });

}