var AboutScene = cc.Scene.extend({
    //增加注释测试新的Git
    ctor: function () {
        this._super();

        var layer = new cc.Layer();
        this.addChild(layer);
        var bg = new cc.Sprite(res.welcomeBG);
        layer.addChild(bg);
        var winSize = cc.winSize;
        bg.y = winSize.height / 2;
        bg.x = winSize.width / 2;//添加背景并初始化层

        var helloLabel = new  cc.LabelTTF("饥饿英雄游戏(HungryHeroGame)", "Arial", 25);
        helloLabel.x = winSize.width / 2;
        helloLabel.y = winSize.height / 2 + 80;

        var helloLabel1 = new cc.LabelTTF("By_Mamihlapinat", "Arial", 20);
        helloLabel1.x = winSize.width / 2 +50;
        helloLabel1.y = winSize.height / 2 + 50;//添加版本信息
        
        layer.addChild(helloLabel);
        layer.addChild(helloLabel1); 
        helloLabel.setColor(cc.color(255,255,255));
        var backBtn = new cc.MenuItemImage("#about_backButton.png", "#about_backButton.png", this._back);
        var menu = new cc.Menu(backBtn);

        layer.addChild(menu);
        // layer.bake();//添加返回事件
        return true;

    },
    _back:function()
    {
        Sound.playCoffee();
        cc.director.runScene(new MenuScene());
    }
});