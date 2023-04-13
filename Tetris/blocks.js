class Block {
    constructor(speed) {
        if (this.constructor === Block) {
            throw new Error("Can't Create Instance By Abstract Class");
        }
        this.y = 0; this.x = 0;
        this.SPEED = speed;
        this.Rotate = 0;
    }

    // Public Field

    Show() {
        this.Display();
        this.Controller();
    }

    CollisonDetect(y = this.y, x = this.x) {
        for(let i = 0; i < BLOCK_SIZE; i++) {
            for(let j = 0; j < BLOCK_SIZE; j++) {
                if(this.Configure[this.Rotate][i][j] === 1) {
                    if(y + i >= HEIGHT) return true;
                    else if(x + j < 0) return true;
                    else if(x + j >= WIDTH) return true;
                    if(Board[y + i][x + j].className === "solid") return true;
                }
            }
        }
        return 0;
    }

    Keyboard(e) {
        if(e.key == 'd') {
            // Not End.. Just Can't Move
            if(this.CollisonDetect(this.y, this.x + 1)) {
                return;
            }
            this.ClearBoard();
            this.x++;
            this.Display();
        }  
        else if(e.key == 'a') {
            // Not End.. Just Can't Move
            if(this.CollisonDetect(this.y, this.x - 1)) {
                return;
            }
            this.ClearBoard();
            this.x--;
            this.Display();
        }  
        else if(e.key == 's') {
            // Not End.. Just Can't Move
            if(this.CollisonDetect(this.y + 1, this.x)) {
                return;
            }
            this.ClearBoard();
            this.y++;
            this.Display();
        }
        else if(e.key == 'z') {
            let backup = this.Rotate;
            this.Rotate = (this.Rotate + 1) % 4;
            // Not End.. Just Can't Move
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

            // End Controll Block..
            if(this.CollisonDetect(this.y + 1, this.x)) {
                NewBlock = true;
                this._BlockToSolid();
                this._PointCheck();    
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
    
    _BlockToSolid() {
        for(let i = 0; i < BLOCK_SIZE; i++) {
            for(let j = 0; j < BLOCK_SIZE; j++) {
                if(this.Configure[this.Rotate][i][j] === 1)
                    Board[this.y + i][this.x + j].className = "solid";
            }
        }
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

    Display(y = this.y, x = this.x) {
        this.ClearBoard();
        for(let i = 0; i < BLOCK_SIZE; i++) {
            for(let j = 0; j < BLOCK_SIZE; j++) {
                if(this.Configure[this.Rotate][i][j] === 1) this.Fill(y + i, x + j);
            }
        }
    }
    _PointCheck() {
        for(let i = 0; i < HEIGHT; i++) {
            let flag = 0;
            for(let j = 0; j < WIDTH; j++) if(Board[i][j].className === "solid") flag++;
            if(flag === WIDTH) {
                for(let j = 0; j < WIDTH; j++) Board[i][j].className = "boom";
            }
        }
        this._Explode();
        for(let i = 0; i < HEIGHT; i++) {
            for(let j = 0; j < WIDTH; j++) {
                if(Board[i][j].className === "boom") Board[i][j].className = "empty";
            }
        }
    }

    _Explode() {
        const blocksExplode = TweenLite.to('.boom', .35, {
            scale: 1.75,
            backgroundColor: 'white',
            borderWidth: 0,
        });
        const blocksImplode = TweenLite.to('.boom', .15, {
            scale: 0,
        });
        const original = TweenLite.to('.boom', 0, {
            scale: 1,
            backgroundColor: 'black',
            borderWidth: 5
        });
        const timeline = new TimelineMax();
        timeline.add(blocksExplode).add(blocksImplode).add(original);
    }

}
class L_Block extends Block {
    constructor(speed) {
        super(speed)
        this.Color = "#00e640";
        this.Configure = [
            [
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 0, 1, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
            ], 
            [
                [1, 1, 1, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],                       
        ]
    }
}
class J_Block extends Block {
    constructor(speed) {
        super(speed)
        this.Color = "#22a7f0";
        this.Configure = [
            [
                [0, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 1, 1, 0],
                [0, 0, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
            ], 
            [
                [1, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],                       
        ]
    }
}
class I_Block extends Block {
    constructor(speed) {
        super(speed)
        
        this.Color = "#663399";
        this.Configure = [
            [
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0]
            ],
            [
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            [
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
                [1, 0, 0, 0],
            ], 
            [
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],                       
        ]
    }
}
class O_Block extends Block {
    constructor(speed) {
        super(speed)
        this.Color = "#86e2d5";
        this.Configure = [
            [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],                    
        ]
    }
} 
class S_Block extends Block {
    constructor(speed) {
        super(speed)
        this.Color = "#f03434";
        this.Configure = [
            [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 1, 0],
                [1, 1, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],                    
        ]
    }
} 
class T_Block extends Block {
    constructor(speed) {
        super(speed)
        this.Color = "#d35400";
        this.Configure = [
            [
                [0, 1, 0, 0],
                [1, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [1, 0, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 0, 0, 0],
                [1, 1, 1, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 0, 0, 0]
            ],                    
        ]
    }
} 
class Z_Block extends Block {
    constructor(speed) {
        super(speed)
        this.Color = "#1f3a93";
        this.Configure = [
            [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [1, 1, 0, 0],
                [0, 1, 1, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]
            ],
            [
                [0, 1, 0, 0],
                [1, 1, 0, 0],
                [1, 0, 0, 0],
                [0, 0, 0, 0]
            ],                    
        ]
    }
} 