gsap.config({nullTargetWarn:false});

const Board = [];
const NextBlcok = [];

const WIDTH = 10;
const HEIGHT = 20;
const BLOCK_SIZE = 4;

class Tetris {
    constructor() {
        this.NeedBlock = true;
        this.interval = null;
        this.Level = 1;
        this.Point = 0;
        this.PointTable = [0, 100, 300, 500, 800];
        this.SpeedTable = [0, 1000, 895, 790, 690, 590, 490, 390, 290, 190, 100];

        this.Next = null;
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

        this.Next = this._RandomBlock();
    }

    _RandomBlock() {
        switch(Math.floor(Math.random() * 7)) {
            case 0:
                return new L_Block(this.GetSpeed(), this);
            case 1:
                return new J_Block(this.GetSpeed(), this);
            case 2:
                return new I_Block(this.GetSpeed(), this);
            case 3:
                return new O_Block(this.GetSpeed(), this);
            case 4:
                return new S_Block(this.GetSpeed(), this);
            case 5:
                return new T_Block(this.GetSpeed(), this);
            case 6:
                return new Z_Block(this.GetSpeed(), this);
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
    // Change Status Methods..
    _ChangeStatus() {
        this._NextShow(this.Next);
        this._ShowLevel();
        this._ShowPoint();
    }
    _ShowLevel() {
        document.querySelector(".level").innerHTML = `LEVEL : ${this.Level}`;
    }
    _ShowPoint() {
        document.querySelector(".point").innerHTML = `Point : ${this.Point}`;
    }
    //Public Field
    Run() {
        this._Init();
        this.interval = setInterval(()=> {
            if(this.NeedBlock) {
                this.NeedBlock = false;
                this.SetBlockSpeed(this.Next);
                let Unit = this.Next;
                this.Next = this._RandomBlock();
                this._ChangeStatus();
                Unit.Run();
            }
        }, 500);
    }
    ChangePoint(cnt) {
        if(cnt >= 5) cnt = 4;
        this.Point += this.PointTable[cnt];
    }
    SetBlockSpeed(block) {
        block.SPEED = this.SpeedTable[this.Level];
    }
    GetSpeed() {
        return this.SpeedTable[this.Level];
    }

    ChangeLevel() {
        if(this.Point >= 9000) {
            this.Level = 10;
        } else if(this.Point >= 8000) {
            this.Level = 9;
        } else if(this.Point >= 7000) {
            this.Level = 8;
        } else if(this.Point >= 6000) {
            this.Level = 7;
        } else if(this.Point >= 5000) {
            this.Level = 6;
        } else if(this.Point >= 4000) {
            this.Level = 5;
        } else if(this.Point >= 3000) {
            this.Level = 4;
        } else if(this.Point >= 2000) {
            this.Level = 3;
        } else if(this.Point >= 1000) {
            this.Level = 2;
        } 
    }
}

let Game = new Tetris();
Game.Run();


