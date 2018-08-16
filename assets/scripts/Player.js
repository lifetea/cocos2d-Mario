cc.Class({
    extends: cc.Component,
    
    properties: {
        // 主角跳跃高度
        jumpHeight: 0,
        // 主角跳跃持续时间
        jumpDuration: 0,
        // 最大移动速度
        maxMoveSpeed: 0,
        //speed
        moveSpeed:0,
        // 加速度
        accel: 0,
        //跑步状态
        isRun:false,
        //跳跃状态
        isJump:false,

	    direction:'right',
        // 跳跃音效资源
        jumpAudio: {
            default: null,
            type: cc.AudioClip
        },
        map:{
            default:null,
            type:cc.TiledMap,
        },
        pipLayer:{
            default:null,
            type:cc.TiledLayer,
        },
      	animState:null,
    },

    onKeyDown (event) {
        // set a flag when key pressed
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = true;
                this.moveSpeed = 200
                this.isRun = true
                this.direction = 'left'
                console.log('left')
                break;
            case cc.macro.KEY.w:
                this.startJump()
                console.log('up')
                break;    
            case cc.macro.KEY.d:
                this.accRight = true;
				this.moveSpeed = 200;
                this.isRun = true;
                this.direction = 'right'
                console.log('right')
                break;
        }
    },

    onKeyUp (event) {
        // unset a flag when key released
        switch(event.keyCode) {
            case cc.macro.KEY.a:
                this.accLeft = false;
	              this.moveSpeed = 0;
	              console.log('取消')
	              this.isRun = false
                break;  
            case cc.macro.KEY.d:
                  this.accRight = false;
	              this.moveSpeed = 0;
	              console.log('取消')
	              this.isRun = false
                break;
        }
    },
    start () {
		let pos = this.pipLayer.getPositionAt(cc.v2(0, 0));
		cc.log("Pos: " + pos);
		pos = this.pipLayer.getPositionAt(cc.v2(0, 13));

		cc.log("Pos: " + pos);
		pos = this.pipLayer.getPositionAt(cc.v2(0, 12));
		cc.log("Pos: " + pos);
		console.log(this.pipLayer.getPositionAt(0, 0))
		// if (this.pipLayer.getTileGIDAt(playerPosition)) {//tile不为空，返回
  //           cc.log('This way is blocked!');
  //       }
    },

    onLoad: function() {
        this.anim = this.getComponent(cc.Animation);



        // 加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        // 主角当前水平方向速度
        this.xSpeed = 0;

        // 初始化键盘输入监听
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);    
    },

    onDestroy () {
        // 取消键盘输入监听
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    },
     setJumpAction: function () {
        // 跳跃上升
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        // 下落
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        // 添加一个回调函数，用于在动作结束时调用我们定义的其他方法
        var callback = cc.callFunc(this.endJum, this);
        // 不断重复，而且每次完成落地动作后调用回调来播放声音
        return cc.sequence(jumpUp, jumpDown, callback);
    },
    startJump: function () {
        if(this.isJump == true){
            return false
        }
        this.isJump = true


        if(this.direction == 'right'){
        	this.anim.play("small-jump-right")
	        console.log('jump right')
        }

        if(this.direction == 'left'){
			this.anim.play("small-jump-left")
			console.log('jump left')
        }
        // 初始化跳跃动作
        this.playJumpSound()
        this.jumpAction = this.setJumpAction();

        this.node.runAction(this.jumpAction);
    },
    endJum: function(){
    	if(this.direction == 'left')
    		this.anim.play("small-left")
    	if(this.direction == 'right')
    		this.anim.play("small-right")	
    	console.log('jump end')
		
        this.isJump = false
    },
    playJumpSound: function () {
        // 调用声音引擎播放声音
        cc.audioEngine.playEffect(this.jumpAudio, false);
    },       

    update: function (dt) {
    	  // console.log('dt',dt)
        // 根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed = -this.moveSpeed;//this.accel * dt;
        }
        if (this.accRight) {
            this.xSpeed = this.moveSpeed;//this.accel * dt;
        }
        if (this.accRight != true && this.accLeft != true) {
            this.xSpeed = 1
        }
        // 限制主角的速度不能超过最大值
        // if ( Math.abs(this.xSpeed) > this.maxMoveSpeed ) {
        //     // if speed reach limit, use max speed with current direction
        //     this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        // }
        if(this.isRun == true){
			this.map.node.x -= this.xSpeed * dt;
        }
        if(this.isJump == true && (this.accRight == true || this.accLeft == true)){
			this.map.node.x -= this.xSpeed * dt/2;
        }
        // console.log('run',this.isRun)


        if(this.isRun == true && this.isJump == false){
        	if(this.accRight == true){
		        var name = this.animState != null ? this.animState.name: null;
		        var playing = this.animState != null ?this.animState.isPlaying : false;
                console.log('walk-right:',playing,name)
		        if(name == "small-walk-right" && playing == true){

		        }else{
			        this.animState = this.anim.play("small-walk-right")
		        }

	        }

            if(this.accLeft == true){
                var name = this.animState != null ? this.animState.name: null;
                var playing = this.animState != null ?this.animState.isPlaying : false;
                console.log(playing,name)
                if(name == "small-walk-left" && playing == true){

                }else{
                    this.animState = this.anim.play("small-walk-left")
                }

            }
			
	        // if(this.accLeft == true){
		       //  this.anim.play("samll-walk-left")
	        // }
	        // 根据当前速度更新主角的位置
	        
        }else{
            var name = this.animState != null ? this.animState.name: null;
            var playing = this.animState != null ?this.animState.isPlaying : false;
            if(name == "small-walk-right" || name == "samll-walk-left"){
            	this.anim.stop(name)
            }
            if(this.accRight == true){
                
            }
        }
		
        // if(this.node.x <=-461){
        //     this.node.x = -461
        // }
        // if(this.node.x >=461){
        //     this.node.x = 461
        // }
    },
});


