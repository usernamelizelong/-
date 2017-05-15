/*
 * @Diamond类
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.speed: speed } 速度
 * @param { options.x: number } x轴起始坐标
 * @param { options.y: number } y轴起始坐标
 * */
function Diamond(options){
    this.ctx = options.ctx;
    this.dd = options.dd;
    this.speed = options.speed || 2;
    this.color=options.color;
    this.num=options.num || 2;
    this.width=options.dd.width;
    this.height=options.dd.height;

    // Diamond坐标
    this.x = options.x || 200;
    this.y = options.y || 100;

    // 加速度
    this.speedPlus = 0.2;
}
var selfY=[];
selfY.unshift(this.y);


//原型扩展
Diamond.prototype={
    peng:function(){

        //return false;
        return '飞行方块';
    },

    // 根据实例属性绘制
    draw:function (){
        //selfY=this.y;
        //console.log('selfY'+selfY+"this.y"+this.y);
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.font = '900 30px 微软雅黑';
        this.ctx.fillStyle ='yellow';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(''+Dnum[0],this.x+this.width/2, this.y+this.height/2);
        for(var i=1;i<Dnum.length;i++){
            this.ctx.fillStyle ='yellow';
            this.ctx.fillRect(this.x-50*i, selfY[i], this.dd.width, this.dd.height);
            this.ctx.fillStyle ='black';
            this.ctx.fillText(''+Dnum[i],this.x-50*i+this.width/2, selfY[i]+this.height/2);
        }
    },

    //更新下一帧数据
    update:function(){
        /*将每一次单击方块更新的Y值存储在数组中*/
        selfY.unshift(this.y);
        /*根据方块数组的长度,截取Y值数组*/
        selfY.splice(Dnum.length);
        //console.log(Dnum);
        //console.log(selfY);
        this.y+=this.speed;
        this.speed+=this.speedPlus;
    },
    // 向上动一下
    flyup: function() {
        this.speed = -5;
        if(this.y<0){
            this.speed = -2;
            this.y=0;
        }
    }
}