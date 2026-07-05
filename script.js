// ======================
// Green Point
// ======================

// 저장된 점수 불러오기
let score = Number(localStorage.getItem("score")) || 0;

// 저장된 퀴즈 여부
let quizSolved = localStorage.getItem("quizSolved") === "true";

// HTML 요소
const scoreText = document.getElementById("score");
const tree = document.getElementById("tree");
const result = document.getElementById("result");

const oBtn = document.getElementById("oBtn");
const xBtn = document.getElementById("xBtn");

const diary = document.getElementById("diary");
const saveDiary = document.getElementById("saveDiary");
const saveMessage = document.getElementById("saveMessage");

const missions = document.querySelectorAll(".mission");

// 화면 업데이트
function updateScreen(){

    scoreText.textContent = score;

    if(score >= 70){
        tree.textContent = "🌲";
    }
    else if(score >= 40){
        tree.textContent = "🌳";
    }
    else if(score >= 20){
        tree.textContent = "🌿";
    }
    else{
        tree.textContent = "🌱";
    }

}

updateScreen();


// ----------------------
// 퀴즈
// ----------------------

oBtn.onclick = function(){

    result.textContent = "❌ 틀렸습니다.";
}

xBtn.onclick = function(){

    if(quizSolved){

        result.textContent = "이미 퀴즈를 완료했습니다.";

        return;

    }

    score += 10;

    quizSolved = true;

    localStorage.setItem("score", score);

    localStorage.setItem("quizSolved","true");

    result.textContent = "✅ 정답! +10 Point";

    updateScreen();

}


// ----------------------
// 미션
// ----------------------

missions.forEach(function(box,index){

    const key = "mission"+index;

    if(localStorage.getItem(key)=="true"){
        box.checked = true;
    }

    box.addEventListener("change",function(){

        if(box.checked){

            score += 20;

            localStorage.setItem(key,"true");

        }else{

            score -=20;

            localStorage.removeItem(key);

        }

        localStorage.setItem("score",score);

        updateScreen();

    });

});


// ----------------------
// 환경 다짐
// ----------------------

diary.value = localStorage.getItem("diary") || "";

saveDiary.onclick = function(){

    localStorage.setItem("diary",diary.value);

    saveMessage.textContent = "✅ 저장되었습니다!";

}