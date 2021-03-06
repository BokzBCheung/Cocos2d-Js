﻿var UiLayer = cc.Layer.extend(
    {
        txtScore: null,
        txtLevel:null,
        gameLayer: null,

        ctor: function (gameLayer)
        {
            this._super();
            this.gameLayer = gameLayer;
            //面板数据显示
            this._initInforPanel();
            this.scheduleUpdate();

        },
        _initInforPanel: function () {
            //加入相应的ui展示
            var size = cc.winSize;
            var lblScore = new cc.LabelTTF("分数", "arial", 40);
            lblScore.setFontFillColor(cc.color.RED);
            lblScore.x = 100;
            lblScore.y = size.height - 50;
            this.addChild(lblScore);

            var txtScore = new cc.LabelTTF("100", "arial", 40);
            txtScore.x = 200;
            txtScore.y = size.height - 50;
            this.addChild(txtScore);
            this.txtScore = txtScore;

            var size = cc.winSize;
            var lblLevel = new cc.LabelTTF("关卡", "arial", 40);
            lblLevel.setFontFillColor(cc.color.RED);
            lblLevel.x = 300;
            lblLevel.y = size.height - 50;
            this.addChild(lblLevel);

            var txtLevel = new cc.LabelTTF("1", "arial", 40);
            txtLevel.x = 400;
            txtLevel.y = size.height - 50;
            this.addChild(txtLevel);
            this.txtLevel = txtLevel;
        },
        update: function () {
            //this.txtScore.setString("" + this.gameLayer.txtScore);
            //this.txtLevel.setString("" + (this.gameLayer.txtLevel + 1));
        },

});