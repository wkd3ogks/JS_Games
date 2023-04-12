const Board = [];
const WIDTH = 10;
const HEIGHT = 20;

class Block {
    constructor(id) {
        console.log("Block!");
        this.y = 0; this.x = 0;
        if(id === 1) {
            this.rotate = 0;
            this.configure = [
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
            this.color = "#00e640";
        }
    }
    Display() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if(this.configure[this.rotate][i][j] === 1) this.Fill(this.y + i, this.x + j);
            }
        }
        
    }
    Fill(y, x) {
        Board[y][x].className = "block";
        Board[y][x].style.backgroundColor = this.color;
        Board[y][x].style.borderColor = this.color;
    }
}

class Tetris {
    constructor() {
        console.log("Tetris Start!");
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
    Run() {
        this.Init();
        let a = new Block(1);
        a.Display();
    }
}

let Game = new Tetris();
Game.Run();





