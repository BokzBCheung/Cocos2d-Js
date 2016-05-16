var AboutScene = cc.Scene.extend({

    ctor: function () {
        this._super();

        var layer = new cc.Layer();
        this.addChild(layer);
        var bg = new cc.Sprite(res.welcomeBG);
        layer.addChild(bg);
        var winSize = cc.winSize;
        bg.y = winSize.height / 2;
        bg.x = winSize.width / 2;

        var helloLabel = new  cc.LabelTTF("饥饿英雄游戏\n AnnoDomini", "Arial", 25);
        helloLabel.x = winSize.width / 2;
        helloLabel.y = winSize.height / 2 + 80;
        
        layer.addChild(helloLabel);
        helloLabel.setColor(cc.color(255,255,255));
        var backBtn = new cc.MenuItemImage("#about_backButton.png", "#about_backButton.png", this._back, this);
        var menu = new cc.Menu(backBtn);

        layer.addChild(menu);
        layer.bake();

    },
    _back:function()
    {
        cc.director.runScene(new MenuScene());
    }


});