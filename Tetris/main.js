const Board = [];
const WIDTH = 10;
const HEIGHT = 20;

class Block {
    constructor(id, speed) {
        console.log("Block!");
        this.y = 0; this.x = 0;
        this.SPEED = speed;
        if(id === 1) {
            this.Rotate = 0;
            this.Configure = [
                [
                    [1, 1, 0],
                    [0, 1, 0],
                    [0, 1, 0],
                ],
                [
                    [0, 0, 1],
                    [1, 1, 1],
                    [0, 0, 0],
                ],
                [
                    [1, 0, 0],
                    [1, 0, 0],
                    [1, 1, 0],
                ], 
                [
                    [1, 1, 1],
                    [1, 0, 0],
                    [0, 0, 0],
                ],                       
            ]
            this.Color = "#00e640";
        }
    }

    // Public Field
    Display(y = this.y, x = this.x) {
        this.ClearBoard();
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.Configure[this.Rotate][i][j] === 1) this.Fill(y + i, x + j);
            }
        }
    }
    
    CollisonDetect(y, x) {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.Configure[this.Rotate][i][j] === 1) {
                    if(y + i >= HEIGHT) return true;
                    else if(x + i < 0) return true;
                    else if(x + i >= WIDTH) return true;
                }
            }
        }
        return false;
    }
    Keyboard(e) {
        console.log(this);
        if(e.key == 'd') {
            if(this.CollisonDetect(this.y, this.x + 1)) return;
            this.ClearBoard();
            this.x++;
            this.Display();
        }  
        else if(e.key == 'a') {
            if(this.CollisonDetect(this.y, this.x - 1)) return;
            this.ClearBoard();
            this.x--;
            this.Display();
        }  
        else if(e.key == 's') {
            if(this.CollisonDetect(this.y + 1, this.x)) return;
            this.ClearBoard();
            this.y++;
            this.Display();
        }
        else if(e.key == 'z') {
            let backup = this.Rotate;
            this.Rotate = (this.Rotate + 1) % 4;
            if(this.CollisonDetect()) {
                this.Rotate = backup;
                return;
            } 
            this.ClearBoard();
            this.Display();
        }
    }
    Controller() {
        let Control = this.Keyboard.bind(this);
        window.addEventListener("keydown", Control);
        let Gravity = setInterval(() => {
            if(this.CollisonDetect(this.y + 1, this.x)) {
                window.removeEventListener("keydown", Control);
                clearInterval(Gravity);
                return;
            }
            this.y++;
            this.Display(this.y, this.x);
        }, this.SPEED);
        
    }

    // Private Field
    Fill(y, x) {
        Board[y][x].className = "block";
        Board[y][x].style.backgroundColor = this.Color;
        Board[y][x].style.borderColor = this.Color;
    }

    ClearBoard() {
        for(let i = 0; i < HEIGHT; i++) {
            for(let j = 0; j < WIDTH; j++) {
                if(Board[i][j].className === "block") {
                    Board[i][j].className = "empty";
                    Board[i][j].style.backgroundColor = "black";
                    Board[i][j].style.borderColor = "black";
                }
            }
        }
    }
}

class Tetris {
    constructor() {
        console.log("Tetris Start!");
        this.SPEED = 1000;
    }
    Init() {
        const $table = document.querySelector('table');
        for(let i = 0; i < HEIGHT; i++) {
            Board.push([]);
            const $tr = document.createElement('tr');
            for(let j = 0; j < WIDTH; j++) {
                const $td = document.createElement('td');
                Board[i].push($td);
                $tr.appendChild($td);
            }
            $table.appendChild($tr);
        }
    }

    Controller() {
        
    }

    Run() {
        this.Init();
        let a = new Block(1, this.SPEED);
        a.Display();
        a.Controller();
    }
}

let Game = new Tetris();
Game.Run();


