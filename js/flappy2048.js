/*
* 该对象负责直接调度几个角色对象，并提供如下几个方法：
* run: 对外开放的游戏开始方法
* draw: 绘制游戏画面
* start: 开始运行游戏
* end: 结束游戏
* pause：暂停继续游戏
* restart: 重新开始游戏
*
* */

/*
* @constructor { Function }  游戏主对象
* @param { container: string } 容器选择器
* */
function Flappy2048(container) {
    /*
    * 1、调用util里的getCtx方法，动态创建画布与绘制上下文
    * 2、利用imgLoad对象加载游戏所需的图像资源
    * 3、当图像资源加载完毕后，创建所有的角色对象
    * 4、创建好之后，就可以start了。
    * */
    this.ctx = util.getCtx(900, 500, container);
    this.isPause = false;
    //绑定事件
    this.bind();

}

Flappy2048.prototype = {

    //对外开发的游戏开始方法
    run:function(){
        //console.log(1);
        this.initRoles();
        var self=this;
        btn[0].addEventListener('click',function(){

            this.removeAttribute('class','active');
            this.parentNode.removeAttribute('class','black');
            self.start();
        });

        btn[1].addEventListener('click',function(){
            this.removeAttribute('class','active');
            this.parentNode.removeAttribute('class','black');
            self.restart();
        });


        //this.initRoles();
        //this.start();
    },



    /*
     * @根据角色占用宽度计算轮播时需要的数量
     * @param { width: Number } 角色占用宽度
     * @return 所需个数
     * */
    getRoleNumber: function(width) {
        return Math.ceil(this.ctx.canvas.width / width) + 1;
    },
    /*
    * @创建游戏所需的角色
    * @param { imgs: Object } 所有已加载完毕的图像资源
    * */
    initRoles: function() {
        this.roles = {
            background: [],
            pillar: [],
            land: [],
            number_d:[],
            diamond: [],
        };
        //方块
        this.roles.diamond.push(new Diamond({
            ctx: this.ctx,
            dd:{
                width: 40,
                height: 40
            },
            color:"blue"
        }));

        //背景
        tempTotle = this.getRoleNumber(900);
        //console.log(tempTotle);
        for (i = 0; i < tempTotle; i++) {
            this.roles.background.push(new Background({
                ctx: this.ctx,
                bg: {
                    width: 900,
                    height: 100
                }
            }));
        }

        //柱子
        tempTotle = this.getRoleNumber(500);
        for (i = 0; i < tempTotle; i++) {
            this.roles.pillar.push(new Pillar({
                ctx: this.ctx,
                pr: {
                    pillarDown: {
                        width: 60,
                        height: 300
                    },
                    pillarUp: {
                        width:60,
                        height: 300
                    }
                },
                LRSpace: 800,
                TBSpace: 200,
                color:'#BAAE9E',
                pillarViewHeight: this.ctx.canvas.height - 80
            }));
        }


        // 计算所需大地数量，然后创建
        tempTotle = this.getRoleNumber(900);
        //console.log(tempTotle);
        for (i = 0; i < tempTotle; i++) {
            this.roles.land.push(new Land({
                ctx: this.ctx,
                ld: {
                    width: 900,
                    height: 80
                },
                color:'#BAAE9E'
            }));
        }

        //中间数字方块
        tempTotle = this.getRoleNumber(900);
        //console.log(tempTotle);
        for (i = 0; i < tempTotle; i++) {
            this.roles.number_d.push(new Number_d({
                ctx: this.ctx,
                nd: {
                    width: 40,
                    height: 40
                },
                color:'yellow',
            }));
        }

    },

    //绘制游戏画面
    draw:function(){
      /*
      * 1.开启定时器
      * 2.清除当前游戏画面
      * 3.遍历得到所有的角色,依次更新数据与绘制
      * 3.1.遍历this.roles,取出每一种角色数组
      * 3.2.在遍历每一种角色数组,得到单个角色对象
      * 3.3.调用其update方法更新数据,调用draw方法进行绘制*/
        var key,self=this;
        //console.log(2);
        setInterval(function(){
            //没有暂停才进行角色绘制
            if(!self.isPause){
                //清除路径与画布渲染内容
                //self.ctx.beginPath();
                self.ctx.clearRect(0,0,self.ctx.canvas.width,self.ctx.canvas.height);
                //绘制所有角色
                for(key in self.roles){
                    self.roles[key].forEach(function(role){
                        //alert(1);
                        //peng=role.peng();
                        //console.log(peng);
                        role.update();
                        //console.log(role);
                        role.draw();
                        //判断碰撞
                        if(self.isDie()){
                            //console.log(role.peng());
                            if(role.peng()=='中间方块'){
                                //num();
                                //console.log(count);
                                self.ctx.beginPath();
                                return;
                            }
                            self.end();
                        }

                    });
                }
            }
        },1000/60);
    },

    //判断是否触碰
    isDie: function() {
        /*--------------------方块上点---------------*/
        var diamondCoreX1 = this.roles.diamond[0].x + this.roles.diamond[0].dd.width / 2;
        var diamondCoreY1 = this.roles.diamond[0].y;
        /*-------------------方块右点------------------------*/
        var diamondCoreX2 = this.roles.diamond[0].x + this.roles.diamond[0].dd.width;
        var diamondCoreY2 = this.roles.diamond[0].y + this.roles.diamond[0].dd.height/2;
        /*-------------------方块下点----------------------*/
        var diamondCoreX3 = this.roles.diamond[0].x + this.roles.diamond[0].dd.width/2;
        var diamondCoreY3 = this.roles.diamond[0].y + this.roles.diamond[0].dd.height;


        // 碰撞到了管道
        if(this.ctx.isPointInPath(diamondCoreX1, diamondCoreY1) || this.ctx.isPointInPath(diamondCoreX2, diamondCoreY2) || this.ctx.isPointInPath(diamondCoreX3, diamondCoreY3)) {
            return true;
        }
        return false;

    },
    // 开始游戏
    start: function() {
        this.draw();
    },
    //暂停或继续游戏
    pause: function() {

    },
    //结束游戏
    end: function() {
        this.isPause = true;

        function a (){
            //console.log(11);
            var div=document.getElementsByTagName('div');
            this.btn[1].parentNode.setAttribute('class','re');
            this.btn[1].setAttribute("class",'active');
        }
        a();
    },
    //重新开始
    restart: function() {
        window.location.reload();
    },

    //点击事件绑定
    bind:function(){
        var self=this;
        this.ctx.canvas.addEventListener('click',function(){
            self.roles.diamond[0].flyup();
        });
    }
}
