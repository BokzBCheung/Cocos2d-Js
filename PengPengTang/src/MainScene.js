var MainScene =cc.Scene.extend(
    {
        playLayer: null,
        ctor:function()
        {
            this._super();
        },
        onEnter: function ()
        {
            this._super();

            //实例化BgLayer层
            var bgLayer = new BgLayer();
            this.addChild(bgLayer);

            //实例化UiLayer层
            var uiLayer = new UiLayer();
            this.addChild(uiLayer);
            
            //实例化PlayLayer层
            this.playLayer = new PlayLayer();
            this.addChild(this.playLayer);

            this._BindEvent();
        },
    _BindEvent: function ()
     {
        //    cc.eventManager.addListener({

        //        event: cc.EventListener.MOUSE,
        //        onMouseDown: this._onMouseDown.bind(this),

        //}, this.playLayer);

        if ("touches" in cc.sys.capabilities) {
            cc.eventManager.addListener({
                event: cc.EventListener.TOUCH_ONE_BY_ONE,
                onTouchBegan: this._onTouchBegan.bind(this)
            }, this.playLayer);
        } else {
            cc.eventManager.addListener({
                event: cc.EventListener.MOUSE,
                onMouseDown: this._onMouseDown.bind(this)
            }, this.playLayer);
        }
    },

     _onTouchBegan:function(touch,event)
        {
        var column = Math.floor((touch.getLocation().x - this.playLayer.x) / Constant.CANDY_WIDTH);
        var row = Math.floor((touch.getLocation().y - this.playLayer.y) / Constant.CANDY_WIDTH);

        this._popCandy(column, row);
        return true;
        },

        _onMouseDown: function (event) {

            var column = Math.floor((event.getLocation().x - this.playLayer.x) / Constant.CANDY_WIDTH);
            var row = Math.floor((event.getLocation().y - this.playLayer.y) / Constant.CANDY_WIDTH);

            this._popCandy(column, row);

        },

        _popCandy: function (column, row) {


            var joinCandys = [this.playLayer.mapArr[column][row]];
            var pushIntoCandys = function (element) {
                if (joinCandys.indexOf(element) < 0)
                    joinCandys.push(element);
            };


            var index = 0;
            while (index < joinCandys.length) {
                var candy = joinCandys[index];
                if (this._checkCandyExisit(candy.column + 1, candy.row) && candy.type == this.playLayer.mapArr[candy.column + 1][candy.row].type) {
                    pushIntoCandys(this.playLayer.mapArr[candy.column + 1][candy.row]);
                }
                if (this._checkCandyExisit(candy.column - 1, candy.row) && candy.type == this.playLayer.mapArr[candy.column - 1][candy.row].type) {
                    pushIntoCandys(this.playLayer.mapArr[candy.column - 1][candy.row]);
                }
                if (this._checkCandyExisit(candy.column, candy.row - 1) && candy.type == this.playLayer.mapArr[candy.column][candy.row - 1].type) {
                    pushIntoCandys(this.playLayer.mapArr[candy.column][candy.row - 1]);
                }
                if (this._checkCandyExisit(candy.column, candy.row + 1) && candy.type == this.playLayer.mapArr[candy.column][candy.row + 1].type) {
                    pushIntoCandys(this.playLayer.mapArr[candy.column][candy.row + 1]);
                }
                index++;
                candy.column = column;
                candy.row = row;
            }

            if (joinCandys.length <= 1) {
                return;
            }

            for (var i = 0; i < joinCandys.length; i++) {
                var candy = joinCandys[i];
                this.playLayer.removeChild(candy);
                this.playLayer.mapArr[candy.column][candy.row] = null;

            }
        },

        _checkCandyExisit: function (i, j) {

            if (i >= 0 && i < Constant.MAP_SIZE && j >= 0 && j < Constant.MAP_SIZE) {
                return true;
            }
            return false;
        }
});