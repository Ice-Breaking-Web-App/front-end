
let mcode = JSON.parse(localStorage.getItem('now'));
window.onload= function() {
    fetch(`http://3.145.74.164:5000/api/team/name?memberCode=${mcode}`)
    .then(res => res.text())
    .then(data => {document.getElementById('tname').innerText = `${data}팀`;});
}