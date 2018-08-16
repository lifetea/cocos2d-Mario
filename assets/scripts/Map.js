// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // player 节点，用于获取主角弹跳的高度，和控制主角行动开关
        player: {
            default: null,
            type: cc.Node
        },
        curMap: {
            default:null,
            type: cc.TiledMap
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.loadmap()
    },

    start () {

    },
    loadmap(){
        console.log("loading");
        var theMap = this.curMap.getComponent(cc.TiledMap);
        var groups = theMap.getObjectGroups();
        console.log(groups.length);
        // console.log(theMap.allLayers());
        // groups.forEach(function (t) {
        //     console.log(t)
        // })
        // console.log(groups[0]);

    },

    // update (dt) {
    //
    // },
});
