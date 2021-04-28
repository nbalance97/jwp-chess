async function showResult() {
    await axios.get('/chessgame/' + roomId + '/result')
        .then(response => printResult(response.data))
        .catch(error => {
            alert(error.response.data);
            window.location = '/chessgame/' + roomId;
        });
}

function printResult(resultDTO) {
    const blackTeamScore = resultDTO.blackTeamScore;
    const whiteTeamScore = resultDTO.whiteTeamScore;
    document.getElementById('black-team-score').innerText = '흑팀 : ' + blackTeamScore + '점';
    document.getElementById('white-team-score').innerText = '백팀 : ' + whiteTeamScore + '점';
    document.getElementById('winner-team').innerText = '우승팀 : ' + resultDTO.winnerTeamType;
}

function addDeleteEvent() {
    const $deleteButton = document.getElementById('delete-button');
    $deleteButton.addEventListener('click', requestDeletion);
}

const requestDeletion = async () => {
    await axios.delete('/chessgame/' + roomId)
        .then(response => window.location.replace(response.data))
        .catch(error => alert(error.response.data));
}

showResult();
addDeleteEvent();