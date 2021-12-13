'use strict';

let team = JSON.parse(localStorage.getItem('team'));

window.onload  = function() {
    document.getElementById('name_leader').innerText = `${team.leaderName}`;
    document.getElementById('explain_name').innerText = `${team.teamName}팀의 팀원들을 알려주세요`;
}

function addList() {

    const addValue = document.createElement("addValue");
    const addValue2 = document.createElement("addValue2");
    const addValue3 = document.createElement("addValue3");

    addValue.innerHTML = "<img src='../../images/membericon.png' style='width:50px; height:50px;' alt='팀원아이콘'>";
    addValue2.innerHTML = "<span><input class='membername' type='text' id='member_name4' placeholder='이름'></span>";
    addValue3.innerHTML = "<button class='deletemember' type='button' onclick='deleteList2(this);'>X</button>";

    const li = document.createElement("li");

    li.className = "members";

    li.appendChild(addValue);
    li.appendChild(addValue2);
    li.appendChild(addValue3);

    li.setAttribute('id', addValue, addValue2, addValue3);

    document
        .getElementById('member_names')
        .appendChild(li);
}

function deleteList(obj) {
    var p = obj.parentNode;
    p.parentNode.removeChild(p);
}

function deleteList2(obj) {
    var p = obj.parentNode.parentNode;
    p.parentNode.removeChild(p);
}

function comT() {
    let codeArray;
    let team = JSON.parse(localStorage.getItem('team'));
    team.members = new Array();
    team.members.push(team.leaderName);
    for(let i=1;i<4;i++){
        if(team.members[i] != null||undefined)
        team.members[i] = document.getElementById(`member_name${i}`).value;
    }
    localStorage.setItem('team', JSON.stringify(team));

    //서버에 team 보내기
    fetch("http://3.145.74.164:5000/api/team/create", {
        method: "PUT", //method PUT으로 변경
        headers: {
            "Content-Type": "application/json",
        },
        body : JSON.stringify({
        teamName: team.teamName,
	    leaderName: team.leaderName,
	    teamColor: team.teamColor,
	    questions: team.questions,
	    members: team.members
        })}
        )
        .then((res) => res.text())
    .then((data) =>{
        codeArray = JSON.parse(data);
        console.log(codeArray.leaderCode);
        let recent = new Array();
        recent.push({code : codeArray.leaderCode , name : team.leaderName});
        let leader = new Array();
        leader.push({code : codeArray.leaderCode , name : team.leaderName});
        localStorage.setItem('recent', JSON.stringify(recent));
        localStorage.setItem('leader', JSON.stringify(leader));})
    .then( () => {
            
        
        localStorage.setItem('now', JSON.stringify(codeArray.memberCode));
            
    })
    .then(() => {location.href = "create_invitecode.html";});
}