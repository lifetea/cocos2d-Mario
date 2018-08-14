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
	    }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        console.log(this.node.width)
	    // var a = this.node.getComponent(cc.Camera).getCameraToWorldMatrix()
	    // console.log(a)
    },

    update (dt) {
        // if(this.node.x <= (480/2.857))
	       //    this.node.x += 1
        if(this.player.x <= 16){
            this.node.x = 0
        }else {
            this.node.x = this.player.x/2.857
        }

	    console.log('play',this.player.x)
	    console.log('camera',this.node.x)

    },
});
