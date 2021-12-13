'use stirct';

//0. 팀원코드를 보내서 진행상황을 전달받고  pedding, joining 일때는 경우 1, 답변 완료&&게임 미온료시 경우2, 게임완료(done)시에 경우3
let isBoardAvailable;
let allstatus;
let mname = JSON.parse(localStorage.getItem('recent'));
let Qarray; // 질문 목록
let Response; //임시저장 답변들 목록
mname = mname[mname.length-1].name; //팀원 이름
mcode = JSON.parse(localStorage.getItem('now')); // 팀원코드

window.onload= function() {
    //00팀 받아와서 출력하는 함수


    fetch(`http://3.145.74.164:5000/api/team/name?memberCode=${mcode}`)
        .then(res => res.text())
        .then(data => {document.getElementById('ex_t').innerText = `${data}팀`});

        // 현황 파악
    fetch(`http://3.145.74.164:5000/api/member/status/member?memberCode=${mcode}&memberName=${mname}`)
        .then(res => res.json())
        .then(data => allstatus = data)
        .then(allstatus => {if(allstatus.isGameDone) {
            document.getElementById("prog").style.visibility ='hidden';
            document.getElementById("qno").style.visibility ='hidden';
            document.getElementById("qq").style.visibility ='hidden';
            document.getElementById("responseform").style.visibility ='hidden';
            document.getElementById("manage_prev").style.display ='block';
            document.getElementById("manage_next").value = '결과 확인하기';
            location.href="game_resultboard.html";

    
            } else{
            if(allstatus.isBoardAvailable){
                location.href="../all/game_resultboard.html";
                document.getElementById("prog").style.visibility ='hidden';
                document.getElementById("qno").style.visibility ='hidden';
                document.getElementById("qq").style.visibility ='hidden';
                document.getElementById("responseform").style.visibility ='hidden';
                document.getElementById("manage_prev").style.display ='block';
                document.getElementById("manage_next").value = '게임 시작하기';
                document.getElementById("manage_next").addEventListener("click", "complete");
            }else {
                

                fetch(`http://3.145.74.164:5000/api/answers/member?memberCode=${mcode}&memberName=${mname}`) //임시저장 배열
                    .then(res => res.json())
                    .then(data =>  Response = data)
                    .then(() => {document.getElementById('responseform').value = Response[0]});


                    //3. 입력 칸
                    //(1) 질문 배열 받아오기
                fetch(`http://3.145.74.164:5000/api/questions/all?memberCode=${mcode}`)
                    .then(res => res.json())
                    .then(data => Qarray = data)
                    .then(() => {document.getElementById('qq').innerText = Qarray[0]})
                    .then(() => document.getElementById( 'prog' ).setAttribute('max', Qarray.length));
                    //저장된 첫 번째 질문의 답변을 가져와서 출력하기
                }
            }})}
let num = 1;

function preQ() {
    // 작성된 질문들 서버로 보내는 부분
    fetch(`http://3.145.74.164:5000/api/answers/member?memberCode=${mcode}&memberName=${mname}`, {
        method: "PUT", //method PUT으로 변경
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            "qNumber": num,
            "aText": document.getElementById("responseform").value
        })
    })
    
    if(document.getElementById('qq').innerText == Qarray[1]){
    document.getElementById('manage_prev').disabled = true;
    } else{
    document.getElementById('manage_next').value = '다음으로';
    }

    num = num-1;
    document.getElementById('qq').innerText = Qarray[num-1];
    document.getElementById('qno').innerText = num;

    fetch(`http://3.145.74.164:5000/api/answers/member?memberCode=${mcode}&memberName=${mname}`) //임시저장 배열
        .then(res => res.json())
        .then(data =>  Response = data)
        .then(()=> {document.getElementById('responseform').value= Response[num-1]});//작성 중이던 내용 가져와서 출력하는 부분
    document.getElementById( 'prog' ).value = document.getElementById( 'prog' ).value - 1 ;
}

function nextQ() {
    fetch(`http://3.145.74.164:5000/api/answers/member?memberCode=${mcode}&memberName=${mname}`, {
        method: "PUT", //method PUT으로 변경
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            "qNumber": num,
            "aText": document.getElementById("responseform").value
        })
    })// 작성된 질문들 서버로 보내는 부분
    document.getElementById('manage_prev').disabled = false;
    num =num+1
    document.getElementById('qno').innerText = num;

    if(num==Qarray.length){
        let all;
        let nn;
        document.getElementById('manage_next').value = '이동하기';
        document.getElementById('manage_next').addEventListener("click", checkR);
        // 작성 수 가져오기
        
    }

    document.getElementById('qq').innerText = Qarray[num-1];
    document.getElementById('responseform').value= Response[num-1];//작성 중이던 내용 가져와서 출력하는 부분
    document.getElementById( 'prog' ).value = document.getElementById( 'prog' ).value + 1 ;
}



function complete() {
    location.href="../all/answer_complete.html";

}

function done() {
    location.href="../all/game_score.html";
}

function checkR() {
    fetch(`http://3.145.74.164:5000/api/answers/member?memberCode=${mcode}&memberName=${mname}`, {
        method: "PUT", //method PUT으로 변경
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
            "qNumber": num,
            "aText": document.getElementById("responseform").value
        })
    })
    
    fetch(`http://3.145.74.164:5000/api/answers/progress?memberCode=${mcode}&memberName=${mname}`)
        .then(res => res.json())
        .then(data =>  {nn = data})
        .then(() => {console.log(nn)})
        .then(() => {
            if(nn.qCount<=nn.aLast) {
                all = true;
            }else {
                all = false; 
            }
            if(all){
                location.href = '../all/answer_complete.html';
    
            }else {
                alert('답변을 다 작성하세요!');
                location.href = "manage_write.html";
                return;
            }
        })
}
//부가 설명
//1. 다음으로, 이전으로 버튼을 누른 후에야 저장이 되므로 누르지 않고 작성 창을 나간다면 그 부분은 저장되지 않는다. 
