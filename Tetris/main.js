gsap.config({nullTargetWarn:false});

const Board = [];
const NextBlcok = [];

const WIDTH = 10;
const HEIGHT = 20;
const BLOCK_SIZE = 4;

let NewBlock = true;

class Tetris {
    constructor() {
        this.queue = [];
        this.SPEED = 1000;
    }
    _Init() {
        const $table = document.querySelector('table');
        for(let i = 0; i < HEIGHT; i++) {
            Board.push([]);
            const $tr = document.createElement('tr');
            for(let j = 0; j < WIDTH; j++) {
                const $td = document.createElement('td');
                $td.className = "empty";
                Board[i].push($td);
                $tr.appendChild($td);
            }
            $table.appendChild($tr);
        }
        const $next = document.querySelector('.next table');
        for(let i = 0; i < BLOCK_SIZE; i++) {
            NextBlcok.push([]);
            const $tr = document.createElement('tr');
            for(let j = 0; j < BLOCK_SIZE; j++) {
                const $td = document.createElement('td');
                NextBlcok[i].push($td);
                $tr.appendChild($td);
            }
            $next.appendChild($tr);
        }
    }

    // Prepare Two Block..
    _RandomBlock() {
        switch(Math.floor(Math.random() * 7)) {
            case 0:
                return new L_Block(this.SPEED);
            case 1:
                return new J_Block(this.SPEED);
            case 2:
                return new I_Block(this.SPEED);
            case 3:
                return new O_Block(this.SPEED);
            case 4:
                return new S_Block(this.SPEED);
            case 5:
                return new T_Block(this.SPEED);
            case 6:
                return new Z_Block(this.SPEED);
        }
    }

    _NextShow(block) {
        for(let i = 0; i < BLOCK_SIZE; i++) {
            for(let j = 0; j < BLOCK_SIZE;j++) {
                NextBlcok[i][j].style.backgroundColor = "black";
            }
        }
        for(let i = 0; i < BLOCK_SIZE; i++) {
            for(let j = 0; j < BLOCK_SIZE;j++) {
                if(block.Configure[block.Rotate][i][j] === 1) {
                    NextBlcok[i][j].style.backgroundColor = "white";
                }
            }
        }
    }
    //Public Field
    Run() {
        this._Init();
        this.next = this._RandomBlock();
        setInterval(()=> {
            if(NewBlock) {
                let unit = this.next;
                this.next = this._RandomBlock();
                this._NextShow(this.next);
                NewBlock = false;
                unit.Show();
            }
        }, 1000);
    }
}

let Game = new Tetris();
Game.Run();


