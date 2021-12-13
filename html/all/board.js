


let mcode = JSON.parse(localStorage.getItem('now'));
let mname = JSON.parse(localStorage.getItem('leader'))[0].name;
console.log(mname);
let Qarray;
let Rarray;
let Rname;
let Rres;
let Qnum=1;


window.onload= function() {
    fetch(`http://3.145.74.164:5000/api/team/name?memberCode=${mcode}`)
    .then(res => res.text())
    .then(data => {document.getElementById('namet').innerText = `${data}팀`;});

    fetch(`http://3.145.74.164:5000/api/questions/all?memberCode=${mcode}`)
    .then(res => res.json())
    .then(data => Qarray = data)
    .then(()=> {
        console.log(Qarray);
        document.getElementById('ques').innerText = `질문${Qnum} : ${Qarray[Qnum-1]}`;});

    fetch(`http://3.145.74.164:5000/api/answers/all?memberCode=${mcode}&qNumber=1`)
    .then(res => res.json())
    .then(data => Rarray = data)
    .then(() => {
        Rname = Rarray[0].memberName;
        Rres = Rarray[0].aText;
    })
    .then( () => {document.getElementById('r1').innerText = `${mname} : ${Rres}`});
}

function nextS() {
    Qnum = Qnum+1;
    document.getElementById('ques').innerText = `질문${Qnum} : ${Qarray[Qnum-1]}`;
    fetch(`http://3.145.74.164:5000/api/answers/all?memberCode=${mcode}&qNumber=${Qnum}`)
    .then(res => res.json())
    .then(data => Rarray = data)
    .then(() => {
        if(Qnum > Qarray.length){
            location.href='home.html';
        }else{
        Rname = Rarray[0].memberName;
        Rres = Rarray[0].aText;}})
    .then( () => {document.getElementById('r1').innerText = `${mname} : ${Rres}`});

}

