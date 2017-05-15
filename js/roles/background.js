/*
 * @背景类
 * @param { options: Object } 可配参数
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.bg: bg } 背景图
 * @param { options.speed: speed } 速度
 * */
function Background(options) {
    this.ctx = options.ctx;
    this.bg = options.bg;
    this.speed = options.speed || 2;

    // 根据Background的数量动态计算x轴坐标
    this.width = this.bg.width;
    this.height = this.bg.height;
    this.x = this.width * Background.len++;
    this.y = 0;
}
// 用来记录已创建的实例个数
Background.len = 0;

Background.prototype = {
    peng:function(){
        return null;
    },

    draw: function() {
        this.ctx.fillStyle = '#CCC0B2';
        this.ctx.fillRect(this.x, 0, 900, 600);
    },

    // 更新下一帧绘制数据
    update: function() {
        this.x -= this.speed;
        //console.log(this.x);
        // 走出画布，向右拼接
        if(this.x < -this.width) {
            this.x += this.width * Background.len;
        }
    },

}