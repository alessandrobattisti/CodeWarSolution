let battlefield = [[1, 0, 0, 0, 0, 1, 1, 0, 0, 0],
 [1, 0, 1, 0, 0, 0, 0, 0, 1, 0],
 [1, 0, 1, 0, 1, 1, 1, 0, 1, 0],
 [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
 [0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 1, 0],
 [0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
 [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

 function valid(n){
     return 9 >= n && n >= 0;
 }

let checked = [];
function Ship(initial, height, width){
    this.initial = initial;
    this.height = height;
    this.width = width;
    this.check_borders = function(field){
        let number = 0;
        let start_row = this.initial[0] - 1
        let end_row = this.initial[0] + this.height
        let start_col = this.initial[1] - 1
        let end_col = this.initial[1] + this.width
        for(let r = start_row; r <= end_row ; r++ ){
            for(let c = start_col; c <= end_col; c++){
                if(valid(c) && valid(r)){
                    if(field[r][c] == 1){
                        number += 1
                    }
                }
            }
        }
        if(number != this.kind_of_ship()){ return false }
        return true
    }
    this.kind_of_ship = function(){
        return Math.max(this.height, this.width)
    }
}

function find_ship( row, col, field, checked ){
    let in_row = row;
    let in_col = col;
    let width = 0;
    let height = 0;

    while(in_row < field.length && field[in_row][col] == 1){
        in_row += 1;
        height += 1;
        checked[in_row][col] = true
    }
    while(in_col < field.length && field[row][in_col] == 1){
        in_col += 1;
        width += 1;
        checked[row][in_col] = true
    }

    checked[row][col] = true
    return [checked, new Ship([row, col], height, width)]
}

function validateBattlefield(field) {

    let n = 0; //count the cells
    for(let row = 0; row < field.length; row++){
        for(let col = 0; col < field.length; col++){
            if(field[row][col] == 1){
                n += 1;
            }
        }
    }
    if(n != 20){return false;}//count the cells

    const ships = [];

    for(let i = 0; i < field.length; i++){
        checked.push( field[i].map(function(){return false;}) );
    }//build a copy of the board with all false

    for(let row = 0; row < field.length; row++){
        for(let col = 0; col < field.length; col++){
            if(field[row][col] == 1 && checked[row][col]==false){
                let res = find_ship( row, col, field, checked );
                checked = res[0];
                ships.push( res[1] );
            }
        }
    }//loop through the board and find ships

    //begin checks
    let ships_count = { 1:0 , 2:0, 3:0, 4:0 };
    let correct = { 1: 4, 2: 3, 3: 2, 4: 1 };
    for(let s = 0; s < ships.length; s++){
        if ( ships[s].width > 1 && ships[s].height>1 ) return false; //check ships shape
        if ( ships[s].check_borders( field ) == false ) return false; // check ships borders
        ships_count[ships[s].kind_of_ship()] += 1;
    }
    //check ships count
    if( JSON.stringify(ships_count) != JSON.stringify(correct) ) return false;

    return true
}
validateBattlefield(battlefield);
