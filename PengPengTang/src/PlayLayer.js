var PlayLayer = cc.Layer.extend({

    mapArr: null,
    ctor: function () {
        this._super();


        this.mapLayer = new cc.Layer();
        var size = cc.winSize;
        this.x = (size.width - Constant.CANDY_WIDTH * Constant.MAP_SIZE) / 2;;
        this.y = (size.height - Constant.CANDY_WIDTH * Constant.MAP_SIZE) / 2;
        //地图位置的控制

        this.mapArr = [];

        for (var i = 0; i < Constant.MAP_SIZE; i++) {
            var column = [];

            for (var j = 0; j < Constant.MAP_SIZE; j++) {

                var candy = CandySprite.createRandomType(i, j);

                candy.x = i * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH / 2;
                candy.y = j * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH / 2;

                this.addChild(candy);
                column.push(candy);

            }
            //地图的生成
            this.mapArr.push(column);
        }

       
    }
});