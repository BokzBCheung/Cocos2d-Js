var res = {
    HelloWorld_png : "res/HelloWorld.png",
    MainScene_json: "res/MainScene.json",
    welcomeBG: "res/graphics/bgWelcome.jpg",
    textureJpg: "res/graphics/texture.png",
    texturePlist: "res/graphics/texture.plist",
    bgLayer_png:"res/graphics/bgLayer.jpg",
    font_fnt:"res/fonts/font.fnt",
    font_png:"res/fonts/font.png"
    

};

var g_resources = [];
for (var i in res) {
    g_resources.push(res[i]);
}
