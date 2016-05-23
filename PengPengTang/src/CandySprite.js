var CandySprite = cc.Sprite.extend({

    type: 0,//碰碰糖类型
    column: 0,
    row: 0, 

    ctor: function (type, column, row) {

        this._super("res/" + (type+1)+ ".png");//构造不同类型的碰碰糖样式

        this.type = type;
        this.column = column;
        this.row = row;
    }

});

CandySprite.createRandomType = function (column, row) {

    return new CandySprite(parseInt(Math.random() * Constant.CANDY_TYPE_COUNT), column, row);//随机生成不同类型的碰碰糖
};