
// 랜덤번호 지정
// 유저가 번호를 입력하고 go 라는 버튼을 누름
// 만약 유저가 랜덤번호를 맞추면, 맞췄습니다!
// 랜덤번호가 < 유저번호 Down !!!
// 랜덤번호가 > 유저번호 Up !!
// Reset 버튼을 누르면 게임이 리셋된다.
// 5번의 기회를 다 쓰면 게임이 끝난다 (더 이상 추측 불가, 버튼이 disable)
// 유저가 1 ~ 100  범위 밖 숫자를 입력하면 알려준다. 기회는 그대로 유지한다.
// 유저가 이미 입력한 숫자를 또 입력하면, 알려준다, 기회는 그대로 유지한다.


let randomNum = 0
let playButton = document.getElementById("playBtn")
let userInput = document.getElementById("userInput")
let resultArea = document.getElementById("resultArea")
let resetButton = document.getElementById("resetBtn")
let chances = 10
let gameOver = false
let chanceArea = document.getElementById("chanceArea")
let history=[]
let successArea = document.getElementById("successArea")
let btnArea = document.getElementById("btn")

// addEventListener (이벤트 이름, 이벤트 발생시 실행할 함수)
playButton.addEventListener("click",play) // 함수를 매개변수로 넘김 / 함수가 매개변수로 들어갈 땐 ()를 빼야 한다!
resetButton.addEventListener("click",reset)
userInput.addEventListener("focus",function(){ // (익명함수) 간단한 처리를 할 때는 함수 이름을 설정하지 않는 것도 가능하다.
    userInput.value="";
});

userInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        play();
        userInput.value=""
        userInput.focus()
    }
});


function pickRandomNum(){
    randomNum = Math.floor(Math.random() *100)+1; // 1 ~ 100까지 범위 설정
    console.log("정답",randomNum);
}

function play(){
    //유저가 입력한 값 가져오기
    let userValue = userInput.value

    //유저가 범위를 넘는 값을 입력할 시 처리
    if(userValue<1 || userValue>100){
        resultArea.textContent="1과 100 사이 숫자를 입력해주세요"
        resultArea.style.color = "black";
        resultArea.style.fontSize = "20px";
        userInput.value=""
        userInput.focus()
        return; // 남은 기회 줄어들지 않게 처리
    }

    //히스토리에 이미 같은 값이 존재한다면
    if(history.includes(userValue)){
        resultArea.innerHTML = "이미 입력했던 숫자입니다.<br>다른 숫자를 입력해주세요!";
        resultArea.style.color = "black";
        resultArea.style.fontSize = "20px";
        userInput.value = ""
        userInput.focus()
        return;
    }

    // 남은 찬스
    chances --;
    chanceArea.textContent=`남은 기회 : ${chances}번`; // 동적으로 값 보여줄 때 백틱으로 감싸고 동적값은${}안에 넣기
    console.log("남은 횟수 : ",chances)


    if(userValue < randomNum){
        resultArea.textContent = "Up !!!"
        resultArea.style.color = "#c91649";
        resultArea.style.fontSize = "40px";
    }else if(userValue > randomNum){
        resultArea.textContent = "Down !!!"
        resultArea.style.color = "blue";
        resultArea.style.fontSize = "40px";
    }else {
        //resultArea.textContent = "(~˘▾˘)~ 맞췄습니다 !!"
        //resultArea.style.color = "black";
        resultArea.textContent = ""
        showImage();
        gameOver = true
    }

    
    history.push(userValue)
    console.log(history)

    if(chances <1){
        gameOver = true
    }
    if(gameOver){
        playButton.disabled = true;
    }

}

function showImage() {
    var img = document.createElement("img");
    img.src = "https://i.pinimg.com/originals/f7/6c/30/f76c3072010716adda5a65f8bcb2f5d8.gif";

    var textNode = document.createTextNode("맞췄습니다!!!");

    var container = document.createElement("div");
    container.id = "successArea";

    var span = document.createElement("span");
    span.appendChild(textNode);

    container.appendChild(img);
    container.appendChild(span);

    successArea.innerHTML = "";
    successArea.appendChild(container);

 
}

function hideImage() {
    var img = document.querySelector("#successArea img");
    if (img) {
        img.remove(); // 이미지 요소 제거
        successArea.innerHTML = ""; // successArea 내용 제거
    }
}

function reset(){

    // 유저 입력창 reset / 새로운 랜덤번호 생성
    userInput.value = ""
    pickRandomNum()
    resultArea.textContent=" "
    chanceArea.textContent="남은 기회 : 10번"
    playButton.disabled = false;
    gameOver = false;
    chances =10;
    history =[];
    hideImage();

     // 오디오 초기화 및 텍스트 변경
     audio.pause();
     audio.currentTime = 0; // 오디오를 처음으로 되감기
     textAudio.textContent = "ON";
}


pickRandomNum()



// audio 재생
const audio = document.getElementById("myAudio"); // 오디오 요소 가져오기
const playPauseButton = document.getElementById("playPauseButton"); // 버튼 가져오기
//const text = document.getElementById("textAudio"); // 텍스트 가져오기

// 버튼 클릭 이벤트 리스너 추가
playPauseButton.addEventListener("click", function() {
    // 오디오가 일시 중지된 경우
    if (audio.paused) {
        // 재생 시작
        audio.play();
        // 텍스트 및 아이콘 변경
        textAudio.textContent = "OFF";
    } else { // 오디오가 재생 중인 경우
        // 일시 중지
        audio.pause();
        // 텍스트 및 아이콘 변경
        textAudio.textContent = "ON";
    }
});
