let isWinner = false;
const restart = document.querySelector('#restart');
const start = document.querySelector('#start');
const exit = document.querySelector('#exit');

function updateAnnouncement(message) {
    const messageBox = document.querySelector('#message p:first-child');
    messageBox.textContent = message
}

function Gameboard() {
    const row = 3;
    const column = 3;
    const board = [];
    const setBoard = () => {
        for (let i = 0; i < row; i++) {
            board[i] = [];
            for(j = 0; j < column; j++) {
                board[i].push(null)
            }
            
        }
    }
    setBoard();
    const getBoard = () => board;

    const fillColumn = (row, column, player) => {
            board[row][column] = player.token
    }

    return {
        setBoard, getBoard, fillColumn
    }
}



function displayController() {

    let playersNames = {
        player1: 'player one',
        player2: 'player two'
    }

    const getPlayersNames = () => {
        const form = document.querySelector('.gameboard form');
        const boolean = document.body.contains(form);
  
        if(boolean) {
            const player1 = document.querySelector('#player1').value;
            const player2 = document.querySelector('#player2').value;
            console.log(Boolean(player1))
            if (player1) {
                playersNames.player1 = player1
            }

            if(player2) {
                playersNames.player2 = player2
            }

            form.remove();       
        }
        return playersNames
    }
    playersNames = getPlayersNames();
    const game = GameController(playersNames.player1, playersNames.player2);
    (function(){
    updateAnnouncement('The game has just started! - X turn now`')

    const container = document.querySelector('.gameboard');
    const rows = 3;
    const columns = 3;

    for(i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.setAttribute('class', 'row');
        row.setAttribute('data-row', i)
        for(j = 0; j < columns; j++) {
            const column = document.createElement('div');
            column.classList = "column"
            column.setAttribute('data-row',i);
            column.setAttribute('data-column',j);
            row.appendChild(column);
        }
        container.appendChild(row);
    }

    
    start.style.display = 'none';
    restart.style.display = 'unset';

    (function(){
        const columns = document.querySelectorAll('.column');
        
        columns.forEach(item => {
            item.addEventListener('click', game.playRound);


        })
    })()


    allowRestart = true
    })()

    const restartGame = () => {
        game.setBoard();
        game.resetGame();
        const columns = document.querySelectorAll('.column')
        columns.forEach((column) => column.innerHTML = '') 
        updateAnnouncement('The game has just started! - X turn now')
        isWinner = false;
}
    restart.addEventListener('click', restartGame);
    const exitGame  = () => {
        const gameboard = document.querySelector('.gameboard');
        const formDom = `<form id="players">
                <ul>
                    <li>
                        <label for="player1">Enter Player One's name :</label>
                        <input type="text" name="player1" id="player1">
                    </li>
                    <li>
                        <label for="player2">Enter Player Two's name :</label>
                        <input type="text" name="player2" id="player2">
                    </li>
                </ul>
            </form>`
        gameboard.innerHTML = formDom;
        start.style.display = 'unset';
        restart.style.display = 'none';
        updateAnnouncement('Are you ready? Click \'Start\'!')
        
    }
    exit.addEventListener('click', exitGame)

}
function checkWinner(player, playerMove, board) {
    let token = player.token;
    let winner = {
        name: null,
        message: null
    };
    if(
       (board[playerMove.row][0] === token && board[playerMove.row][1] === token && board[playerMove.row][2]=== token)
    || (board[0][playerMove.column] === token && board[1][playerMove.column] === token && board[2][playerMove.column] === token) 
    || (board[0][0] === token && board[1][1] === token && board[2][2] === token)
    || (board[0][2] === token && board[1][1] === token && board[2][0] === token)
){
    isWinner = true;
    winner = {
        name: player.name,
        message: `${player.name} is winner`
    }
    const getWinner = () => winner;

    return { getWinner, isWinner }
}else {
    return { isWinner };
}
}

function GameController (playerOne = 'player one', playerTwo = 'player two') {
    const announcement = document.querySelector('#message p:nth-child(1)');
    const results = document.querySelector('#result');
    const x = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>'
    const o = '<svg fill="#000000" width="24" height="24" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 595.021 595.021" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M507.529,87.493c-27.264-27.264-59.022-48.672-94.396-63.635C376.489,8.358,337.588,0.5,297.511,0.5 c-40.078,0-78.979,7.858-115.624,23.358c-35.373,14.961-67.132,36.371-94.395,63.635c-27.264,27.263-48.673,59.022-63.635,94.395 C8.358,218.532,0.5,257.434,0.5,297.511c0,40.077,7.858,78.979,23.358,115.623c14.961,35.373,36.371,67.132,63.635,94.396 c27.263,27.263,59.022,48.672,94.395,63.634c36.645,15.5,75.546,23.358,115.624,23.358c40.077,0,78.979-7.858,115.623-23.358 c35.373-14.961,67.133-36.371,94.396-63.634c27.263-27.264,48.673-59.022,63.634-94.396 c15.499-36.645,23.358-75.546,23.358-115.623c0-40.077-7.858-78.979-23.358-115.624 C556.202,146.515,534.792,114.756,507.529,87.493z M297.511,551.682c-140.375,0-254.171-113.797-254.171-254.171 c0-140.375,113.796-254.171,254.171-254.171c140.374,0,254.171,113.796,254.171,254.171 C551.682,437.885,437.885,551.682,297.511,551.682z"></path> <path d="M297.511,595.021c-40.146,0-79.112-7.872-115.818-23.397c-35.433-14.988-67.245-36.434-94.553-63.741 c-27.31-27.31-48.755-59.122-63.742-94.555C7.872,376.623,0,337.656,0,297.511c0-40.145,7.872-79.112,23.397-115.818 c14.987-35.432,36.433-67.245,63.742-94.553c27.308-27.309,59.12-48.755,94.553-63.742C218.399,7.872,257.366,0,297.511,0 c40.146,0,79.112,7.872,115.817,23.397c35.435,14.988,67.247,36.434,94.555,63.742c27.31,27.31,48.755,59.123,63.741,94.553 c15.525,36.706,23.397,75.673,23.397,115.818c0,40.144-7.872,79.11-23.397,115.817c-14.985,35.432-36.432,67.244-63.741,94.555 c-27.31,27.31-59.122,48.755-94.555,63.741C376.623,587.149,337.656,595.021,297.511,595.021z M297.511,1 C257.5,1,218.665,8.845,182.082,24.318c-35.314,14.937-67.02,36.311-94.236,63.528c-27.218,27.217-48.591,58.923-63.528,94.236 C8.845,218.665,1,257.5,1,297.511s7.845,78.847,23.318,115.429c14.936,35.312,36.31,67.019,63.528,94.236 c27.217,27.216,58.922,48.59,94.236,63.526c36.582,15.474,75.417,23.319,115.429,23.319c40.011,0,78.847-7.846,115.429-23.319 c35.312-14.936,67.019-36.309,94.236-63.526c27.219-27.22,48.592-58.925,63.526-94.236 c15.474-36.584,23.319-75.42,23.319-115.429c0-40.011-7.846-78.847-23.319-115.429c-14.935-35.312-36.309-67.017-63.526-94.236 c-27.217-27.216-58.922-48.59-94.236-63.528C376.357,8.845,337.521,1,297.511,1z M297.511,552.182 c-68.025,0-131.979-26.49-180.08-74.592C69.33,429.489,42.84,365.535,42.84,297.511c0-68.025,26.49-131.979,74.591-180.08 S229.486,42.84,297.511,42.84c68.024,0,131.979,26.49,180.079,74.591c48.102,48.101,74.592,112.055,74.592,180.08 c0,68.024-26.49,131.979-74.592,180.079C429.489,525.691,365.535,552.182,297.511,552.182z M297.511,43.84 c-67.758,0-131.46,26.386-179.373,74.298S43.84,229.753,43.84,297.511s26.386,131.46,74.298,179.372 c47.913,47.912,111.615,74.299,179.373,74.299s131.46-26.387,179.372-74.299s74.299-111.614,74.299-179.372 s-26.387-131.46-74.299-179.373C428.971,70.226,365.269,43.84,297.511,43.84z"></path> </g> </g> </g> </g></svg>'
    const players = [
        {name: playerOne, token: 'X', score : 0},
        {name: playerTwo, token: 'O', score : 0}
    ]
    results.textContent =  players[0].name + ' ' + players[0].score + ' - ' + players[1].score + ' ' + players[1].name;
    const board = Gameboard();
    const printBoard = board.getBoard()
    const setBoard = board.setBoard
    let activePlayer = players[0];
    const switchActivePlayer = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
        announcement.textContent = `${activePlayer.name} turn now - ${activePlayer.token}`
    }

    const playRound = (event) => {
        if(isWinner) return;
        const row = event.currentTarget.getAttribute('data-row');
        const column = event.currentTarget.getAttribute('data-column');
        if(printBoard[row][column]) return;        
        board.fillColumn(row, column, activePlayer);
        event.currentTarget.innerHTML = (activePlayer.token === 'X') ? x : o;
        const winner = checkWinner(activePlayer, {row, column}, printBoard);
        if(winner.isWinner){ 
            const theWinner = winner.getWinner()
            announcement.textContent = theWinner.message;
            activePlayer.score++;
            results.textContent =  players[0].name + ' ' + players[0].score + ' - ' + players[1].score + ' ' + players[1].name;
            return
         }
         if(printBoard.every((row) => row.every(column => (column) ? true : false))) {
            announcement.textContent = "It's a draw - Click on 'Restart' for a new game!"
            console.log(printBoard);
            return
         }
        switchActivePlayer();
        console.log(printBoard);
    }

    const resetGame = () => {
        activePlayer = players[0]
        updateAnnouncement(`${activePlayer.name} turn now - ${activePlayer.token}`);
    }
    return { playRound, setBoard, resetGame }
}

start.addEventListener('click', displayController);


