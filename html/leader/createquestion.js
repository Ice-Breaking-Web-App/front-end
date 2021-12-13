'use stirct';

let team = JSON.parse(localStorage.getItem('team'));
let keywordArray = ['영화' ,'MBTI', '음식'];

window.onload  = function() {
    document.getElementById('exlain_team').innerText = `${team.teamName}팀이 서로 친해질 수 있도록`;

    fetch('http://3.145.74.164:5000/api/recommend/tags')
    .then(res => res.json())
    .then(data => keywordArray = data);

    for(i=0 ; i<3; i++) {
        var btnElement = document.getElementById(`keyword${i+1}`);
        btnElement.value = keywordArray[i];
    };

}



//3. 키워드를 누르면 키워드릐 태그를 db로 보내 랜덤 질문을 text의 value로 할당한다.
function autofill(id) {
    let tag = document.getElementById(id).value;//키워드value

    fetch(`http://3.145.74.164:5000/api/recommend/question?tag=${tag}`)
        .then(res => res.text())
        .then(data => {
            document.getElementById("question1").value = data;});
        /*var btnElement = document.getElementById("question1");
        btnElement.value = JSON.parse(a);*/
}

//4. 키워드 새로고침 누르면 새로운 키워드들이 나온다.
//서버에서 리스트 받아오기
function refreshRecommendations() {
    //전송 부분
    fetch('http://3.145.74.164:5000/api/recommend/tags')
    .then(res => res.json())
    .then(data => keywordArray = data);

    for(i=0 ; i<3; i++) {
        var btnElement = document.getElementById(`keyword${i+1}`);
        btnElement.value = keywordArray[i];
    };
}

function nextM() {
    //로컬에서 팀 정보 꺼내와서 객체로 변환
    team.questions = new Array();
    for(i=0;i<3;i++){
        team.questions[i] = document.getElementById(`question${i+1}`).value;
    }
    //string으로 변환해서 local에 올리기 
    localStorage.setItem('team', JSON.stringify(team));
}

