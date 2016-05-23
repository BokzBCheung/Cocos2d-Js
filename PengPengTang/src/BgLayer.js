var BgLayer =cc.Layer.extend(
    {
        ctor: function ()
        {
            this._super();

            var size = cc.winSize;
            var bgSprite = new cc.Sprite(res.bg);
            bgSprite.x = size.width / 2;
            bgSprite.y = size.height / 2;
            // 调整位置并加入到BgLayer层
            this.addChild(bgSprite);
        }
    });