'use strict';

//서버에서 teamname 받아와서 출력
let mcode = JSON.parse(localStorage.getItem('now'));

window.onload= function() {
    fetch(`http://3.145.74.164:5000/api/team/name?memberCode=${mcode}`)
    .then(res => res.text())
    .then(data => {document.getElementById('name_t').innerText = `${data}팀`});
    document.getElementById("invite_code").innerText = mcode;

}

function copyToClipBoard(){
    const valOfDIV = document.getElementById("invite_code").innerText;
    const textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.value = valOfDIV;
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

// 현황리스트 받아오기 
//let all;
fetch(`http://3.145.74.164:5000/api/member/status/all?memberCode=${code}`)
.then(res => res.json())
.then(data => console.log(data));

//let status = all.statusList;

// for문으로 리스트에 값 넣기