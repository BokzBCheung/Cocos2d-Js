var MainScene =cc.Scene.extend(
    {
        playLayer: null,

        ctor:function()
        {
            this._super();

            var clippingPanel = new cc.ClippingNode();
            this.addChild(clippingPanel, 2);

            //实例化PlayLayer层
            this.playLayer = new PlayLayer();
            clippingPanel.addChild(this.playLayer, 1);

            var stencil = new cc.DrawNode();
            stencil.drawRect(cc.p(this.playLayer.x, this.playLayer.y),
                cc.p(this.playLayer.x + Constant.CANDY_WIDTH * Constant.MAP_SIZE, this.playLayer.y + Constant.CANDY_WIDTH * Constant.MAP_SIZE),
                cc.color(0, 0, 0),
                1,
                cc.color(0, 0, 0)
                );

            clippingPanel.stencil = stencil;

            this._BindEvent();
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
            
            
        },
        _BindEvent: function ()
        {
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
                column = candy.column;
                row = candy.row;
                if (this._checkCandyExisit(column + 1,row) && candy.type == this.playLayer.mapArr[column + 1][row].type) {
                    pushIntoCandys(this.playLayer.mapArr[column + 1][row]);
                }
                if (this._checkCandyExisit(column - 1, row) && candy.type == this.playLayer.mapArr[column - 1][row].type) {
                    pushIntoCandys(this.playLayer.mapArr[column - 1][row]);
                }
                if (this._checkCandyExisit(column, row - 1) && candy.type == this.playLayer.mapArr[column][row - 1].type) {
                    pushIntoCandys(this.playLayer.mapArr[column][row - 1]);
                }
                if (this._checkCandyExisit(column, row + 1) && candy.type == this.playLayer.mapArr[column][row + 1].type) {
                    pushIntoCandys(this.playLayer.mapArr[column][row + 1]);
                }
                index++;

            }

            if (joinCandys.length <= 1) {
                return;
            }

            for (var i = 0; i < joinCandys.length; i++) {
                var candy = joinCandys[i];
                this.playLayer.removeChild(candy);
                this.playLayer.mapArr[candy.column][candy.row] = null;

            }
            //生成新的Candy
            this._generateCandy();
        },

        _checkCandyExisit: function (i, j) {

            if (i >= 0 && i < Constant.MAP_SIZE && j >= 0 && j < Constant.MAP_SIZE) {
                return true;
            }
            return false;
        },
        _generateCandy: function () {

            for (var i = 0; i < Constant.MAP_SIZE; i++) {

                var missCount = 0;
                for (var j = 0; j < this.playLayer.mapArr[i].length; j++) {
                    var candy = this.playLayer.mapArr[i][j];
                    if (!candy) {
                        var candy = new CandySprite.createRandomType();
                        candy.column = i;
                        candy.row = Constant.MAP_SIZE + missCount;


                        this.playLayer.addChild(candy);
                        candy.x = candy.column * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH / 2;
                        candy.y = candy.row * Constant.CANDY_WIDTH + Constant.CANDY_WIDTH / 2;
                        this.playLayer.mapArr[i][candy.row] = candy;
                        missCount++;
                    } else {
                        var fallLength = missCount;
                        if (fallLength > 0) {
                            var duration = 1;
                            var move = cc.moveTo(duration, candy.x, candy.y - Constant.CANDY_WIDTH * fallLength).easing(cc.easeIn(2));
                            candy.runAction(move);
                            candy.row -= fallLength;
                            this.playLayer.mapArr[i][j] = null;
                            this.playLayer.mapArr[i][candy.row] = candy;
                        }
                    }
                }
                for (var j = this.playLayer.mapArr[i].length; j >= Constant.MAP_SIZE; j--) {
                    this.playLayer.mapArr[i].splice(j, 1);
                }
            }
        }
});