const X_CLASS='x';
const CIRCLE_CLASS='circle';
const WINNING_COMBINATION=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const winningMessageElement=document.getElementById('winningMessage');
const winningMessageTextElement=document.querySelector('[data-winning-message-text]');
const cellElements=document.querySelectorAll('[data-cell]');
const board=document.getElementById('board');
const restartButton =document.getElementById('restartButton');
let circleTurn;

startGame();
restartButton.addEventListener('click',startGame);

function handClick(e){
    const cell=e.target;
    const currentClass=circleTurn? CIRCLE_CLASS : X_CLASS;
    placeMark(cell,currentClass);

    if(checkWin(currentClass)){
        endGame(false);
    }else if(isDraw()){
        endGame(true);
    }else{
        swapTurns();
        setBoardHoverClass();
    }

    
   

}
function isDraw(){
    //we need to check every cell filled 
    // cellElements doesn't have every method so we destructure it into array 
    return [...cellElements].every(cell=>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    })
}

function endGame(draw){
 if(draw){
    winningMessageTextElement.innerHTML='Draw!';
 }else{
     winningMessageTextElement.innerHTML=`${circleTurn?"O's": "X's"} Wins!`;
 }

 winningMessageElement.classList.add('show');
}

function placeMark(cell,currentClass){
cell.classList.add(currentClass);
}

function swapTurns(){
 circleTurn=!circleTurn;
}

function startGame(){
    circleTurn=false;
    cellElements.forEach(cell=>{
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click',handClick);
        cell.addEventListener('click',handClick,{once:true}) //means fire event listner once 
    })
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
    
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS);
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS);
    }else{
        board.classList.add(X_CLASS)  ;
    }
}

function checkWin(currentClass){
    //below returns true if any of the value returns true 
    return WINNING_COMBINATION.some(combination=>{
        //if current class is in evry single cell of combination it returns true 
            return combination.every(index=>{
                return cellElements[index].classList.contains(currentClass)
            })

    });
}