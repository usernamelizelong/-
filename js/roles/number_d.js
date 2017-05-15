/*
 * @方块类
 * @param { options: Object } 可配参数
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.speed: speed } 速度
 * */
function Number_d(options) {
    this.ctx = options.ctx;
    this.nd = options.nd;
    this.initSpace = options.initSpace || 800;
    this.LRSpace = options.LRSpace || 800;
    this.speed = options.speed || 2;
    this.color=options.color || 'yellow';

    // 动态计算x轴坐标
    this.width = options.nd.width || 40;
    this.height = options.nd.height ||  40;

    this.x = (this.width + this.LRSpace) * Number_d.len++ +this.initSpace;
    this.y = this.ctx.canvas.height/2;

    // 加速度
    this.speedPlus = 0.001;

}
var Dnum=[2],num= 2,_num;
// 用来记录已创建的实例个数
Number_d.len = 0;
//创建标识,判断是否碰撞清除
var flag=true,count=0;
//console.log(num);
Number_d.prototype = {
    peng:function(){
        //return false;
        //console.log(1);
        flag=false;
        Dnum.unshift(_num);
        for(var i=0;i<Dnum.length;i++){
//            console.log(arr.length);
            for(var k=0;k<Dnum.length;k++){
                if(Dnum[k]==Dnum[k+1]){
                    Dnum[k+1]+=Dnum[k];
                    Dnum.splice(k,1);
                    i--;
                    break;
                }
            }
        }
        return '中间方块';
    },


    // 根据实例的属性值绘制
    draw: function() {


        //console.log(selfN);
            if(flag){
                this.ctx.beginPath();
                this.ctx.fillStyle = this.color;
                this.ctx.fillRect(this.x, this.y, this.width, this.height);
                this.ctx.rect(this.x, this.y, this.width, this.height);
                this.ctx.font = '900 30px 微软雅黑';
                this.ctx.fillStyle ='white';
                this.ctx.textAlign = 'center';
                this.ctx.textBaseline = 'middle';
                //console.log(num());
                _num=num;
                this.ctx.fillText(''+num,this.x+this.width/2, this.y+this.height/2);
            }
        //this.ctx.fillRect(this.x, this.y, this.width, this.height);

        //alert(1);
    },

    // 更新下一帧绘制数据
    update: function() {
        this.x -= this.speed;
        this.speed += this.speedPlus;
        // 走出画布，向右拼接
        if(this.x < -this.width) {
            flag=true;
            this.x += (this.width + this.LRSpace+20) * Number_d.len;
            num=(function(){
                return Math.random()<0.5?2:Math.random()<0.8?4:8;
            })();
        }

    }
}