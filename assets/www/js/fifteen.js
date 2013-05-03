var moves = [[-1, 0], [1, 0], [0, 1], [0, -1]]; 
var puzzle_size = 400;
var num = 4;
var images = ['camel.png', 'sheep.png', 'goat.png', 'cow.png', 'horse.png'];
var imagesNum = 5;
var imageNum = Math.floor(Math.random() * imagesNum);
var side_length = puzzle_size / num;
var border_size = Math.floor(side_length / 20);
var tiles_num = num * num;  
var tiles = [];

$(document).ready(function(){
    "use strict";

    var i;
    for (i = 0; i < num; i++) {
        tiles[i] = [];
    }

    for(i = 0; i < tiles_num; i++)
    {
        $('#puzzle').append('<div class="tile"></div>');
    }
    
    $('.tile').each(function(i){
        tiles[Math.floor(i / num)][ i % num] = new Tile(this, i + 1, Math.floor(i / num), i % num);
    });
     
    $('#shuffle').click(function(){
        var i, x1, y1, x2, y2;
        for(i = 0; i < tiles_num; i++)
        {
            x1 = Math.floor(Math.random() * num);
            y1 = Math.floor(Math.random() * num);
            x2 = Math.floor(Math.random() * num);
            y2 = Math.floor(Math.random() * num);
            swapTiles(x1, y1, x2, y2);
        }
    });

});

function getTilesPos(obj)
{
    "use strict";
    var i, j;
    for(i = 0; i < num; i++)
    {
        for(j = 0; j < num; j++)
        {
            if(tiles[i][j].idx === parseInt($(obj).text(), 10))
            {
                return [i, j];
            }
        }
    }
   return false;     
}

function swapTiles(x1, y1, x2, y2)
{
    "use strict";
    var temp = tiles[x1][y1];
    tiles[x1][y1] = tiles[x2][y2];
    tiles[x2][y2] = temp;    

    temp = tiles[x1][y1].prow;
    tiles[x1][y1].prow = tiles[x2][y2].prow;
    tiles[x2][y2].prow = temp;

    temp = tiles[x1][y1].pcol;
    tiles[x1][y1].pcol = tiles[x2][y2].pcol;
    tiles[x2][y2].pcol = temp;
    
    reposTile(tiles[x1][y1]);
    reposTile(tiles[x2][y2]);    
}

function moveDir(obj){
    "use strict";
    if($(obj).text() !== '')
    {
        var res = getTilesPos(obj);
        obj = tiles[res[0]][res[1]];
            
        var xx, yy;
        for(var i = 0; i < moves.length; i++)
        {
            xx = res[0] + moves[i][0];
            yy = res[1] + moves[i][1];
            if(xx >= 0 && xx < num && yy >=0 && yy < num)
            {
                if(tiles[xx][yy].idx === tiles_num)
                {
                    return [xx, yy];
                }
            }
        }
    }
    return false;
}

function reposTile(obj)
{
    "use strict";
    if(obj.idx !== tiles_num)
    {
        $(obj.element).text(obj.idx);
    }
    $(obj.element).css('top', obj.prow + 'px ');
    $(obj.element).css('left', obj.pcol + 'px ');    
}

function Tile(obj, idx, row, col)
{
    "use strict";
    this.element = obj;
    this.idx = idx;
    this.prow = row * side_length;
    this.pcol = col * side_length; 

    $(this.element).css('border', border_size + 'px solid black');
    $(this.element).css('width', side_length - 2 * border_size + 'px');
    $(this.element).css('height', side_length - 2 * border_size + 'px');        
    
    if(idx !== tiles_num)
    {
        $(this.element).css('background-image', 'url(img/' + images[imageNum] +')');
        $(this.element).css('background-position', (puzzle_size - this.pcol) + 'px ' + (puzzle_size - this.prow) + 'px');
    }
    
    reposTile(this);
    
    $(this.element).hover(
        function () {
            var res = moveDir(this);
            if(res)
            {
                $(this).css("border-color", "red");
            }
        },
        function () {
            $(this).css("border-color", "black");
        }
    );
        
        
    $(this.element).click(function(){
        var res = moveDir(this);
        if(res)
        {
            var x2 = res[0];
            var y2 = res[1];
            
            res = getTilesPos(obj);
            
            var x1 = res[0];
            var y1 = res[1];  
           
            swapTiles(x1, y1, x2, y2);


        }        
    });

}
