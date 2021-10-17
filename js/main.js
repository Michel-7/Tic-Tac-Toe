function Game(){
    this.turn='X'
    this.board=new Array(9).fill(null);
    this.newTurn=()=>{
        if(this.turn=='X'){
            this.turn='O';
        }else{
            this.turn='X';
        }
    }
    this.makeMove=(i)=>{
        if(this.endOfGame()){
            return;
        }
        if(this.board[i]){
            return;
        }
        this.board[i]=this.turn;
        let winningComb=this.findWinningCombination();
        if(!winningComb){
            gameView.updateTurn();
            this.newTurn();  
        }
    }
    this.findWinningCombination=()=>{
        const winningCombinations=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [6,4,2]
        ]
        for(const combination of winningCombinations){
            const[a,b,c]=combination;
            if(this.board[a] &&
                this.board[a]==this.board[b] && this.board[a]==this.board[c]){
                    return combination
                }
        }
        return null;
    }
    this.endOfGame=()=>{
        let winningCombination=this.findWinningCombination();
        if(winningCombination){
            return true;
        }
        return false;
    }
}

function GameView(){
    this.updateBoard=()=>{
        const winningCombination = game.findWinningCombination();
        for(let i=0;i<game.board.length;i++){
            const tile=document.querySelector(`.board-tile[data-index='${i}']`);
            tile.classList.remove("tile-winner");
            const tileType=game.board[i]=='X'?'tile-x':'tile-o';  
            tile.innerHTML=`<span class="${tileType}">${game.board[i]?game.board[i]:""}</span>`

            if(winningCombination && winningCombination.includes(i)){
                tile.classList.add("tile-winner");
                if(tileType=='tile-o'){
                    this.updateTurn();
                }
            }  
        }

    }
    this.updateTurn=()=>{
        let playerX=document.querySelector('.player-x');
        let playerY=document.querySelector('.player-o');
        playerX.classList.toggle('active');
        playerY.classList.toggle('active');
    }
}

 let game=new Game();
 let gameView=new GameView();

 document.querySelector('.restart').addEventListener('click',()=>{
     newGame();
 })

 let tiles=document.querySelectorAll('.board-tile');
 tiles.forEach((tile)=>{
 tile.addEventListener('click',()=>{
     const index=tile.dataset.index;
     handleClick(index);
})
 })
 
function handleClick(i){
    game.makeMove(i);
    gameView.updateBoard();
    
}

function newGame(){
    game=new Game();
    gameView.updateBoard();
}
gameView.updateBoard();