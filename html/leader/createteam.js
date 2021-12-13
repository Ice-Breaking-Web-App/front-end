

function nextP() {
    let Cteam = {
        "teamName": "소웨공 5조",
        "leaderName": "sohee",
        "teamColor": "red",
        "questions": new Array(),
        "members": new Array(),
    }
    
    Cteam.teamName = document.getElementById('team_name').value ;
    Cteam.leaderName = document.getElementById('leader_name').value ;
    var obj_length = document.getElementsByName("team_color").length;
        
    for (var i=0; i<obj_length; i++) {
        if (document.getElementsByName("team_color")[i].checked == true) {
            Cteam.teamColor = document.getElementsByName("team_color")[i].value;
        }
    }
    
    localStorage.setItem('team', JSON.stringify(Cteam));
}
