const gamecells= document.querySelectorAll('.cell');
const player1Display= document.querySelector('.player1');
const player2Display= document.querySelector('.player2');
const restartBtn= document.querySelector('.restartBtn');
const alertbox= document.querySelector('.alertbox');

//making varaiables
let currentPlayer= 'X';
let nextplayer= 'O';
let playerturn = currentPlayer;

player1Display.textContent= `Player 1: ${currentPlayer}`;
player2Display.textContent= `Player 2: ${nextplayer}`;

//function to start the game
const startGame= () => {
    gamecells.forEach(cell => {
        cell.addEventListener('click', handleclick);
        });
    };


const handleclick= (e) => {
     if(e.target.textContent=== ''){
            e.target.textContent= playerturn;
           if(wincheck()){
            //console.log(`${playerturn} is a Winner!`);
            showalert(`${playerturn} is a Winner!`);
            disablecells();
           }
           else if(checktie()){
            //console.log("It's a Tie!");
            showalert(`It's a Tie!`);
            disablecells();
           }
           else { 
           changeplayerturn();
           showalert(`Turn for player:${playerturn}`);
           }
        }
    }

//function to change player turn
const changeplayerturn= () => {
    if(playerturn === currentPlayer){
        playerturn= nextplayer;
    } else {
        playerturn= currentPlayer;
    }
}
//function to check win condition
const wincheck= () => {
    const winningconditions= [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i= 0; i< winningconditions.length; i++) {
        const [pos1, pos2, pos3]= winningconditions[i];
        if (gamecells[pos1].textContent === gamecells[pos2].textContent &&
            gamecells[pos2].textContent === gamecells[pos3].textContent &&
            gamecells[pos1].textContent !== '') {
                return true;
            }
        
        
    }
    return false;
}

    //function to check tie condition
const checktie= () => {
    let emptycellscount = 0;
    gamecells.forEach(cell => {
        if(cell.textContent === ''){
            emptycellscount++;
        }
    });
    emptycellscount === 0 && !checkwin(); // Corrected: chechwin() to checkwin()
}



//function to disable game-board cells after a win or tie
const disablecells= () => {
    gamecells.forEach(cell => {
        cell.removeEventListener('click', handleclick);
        cell.classList.add('disabled');
    });
}

//function restart game
const restartgame= () => {
    gamecells.forEach(cell => {
        cell.textContent= '';
        cell.classList.remove('disabled');
        cell.addEventListener('click', handleclick);
    });
    startGame();
}
//function to show alert 
const showalert= (message) => {
    // Assuming 'alertbox' is already defined and correctly references a DOM element,
    // for example, by using document.getElementById or document.querySelector.
    // Also, JavaScript uses 'style' (lowercase) to access CSS properties.
    alertbox.style.display="block"; // Corrected 'Style' to 'style'
    alertbox.textContent= message;
    setTimeout(() => {
        alertbox.style.display="none";
        
    }, 3000);
}

//adding event listener to restart button
restartBtn.addEventListener('click', restartgame);
//calling start gane function
startGame();