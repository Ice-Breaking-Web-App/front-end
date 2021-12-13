'use strict';
let code;
let tname;


window.onload = function() {
    code = localStorage.getItem('now');
    tname = JSON.parse(localStorage.getItem('team')).teamName;
    document.getElementById('exp_name').innerText = `${tname}팀의 팀원들을 초대해 주세요. `;
    localStorage.removeItem('team');
    document.getElementById('invite_code').innerText = code;
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
