/*
 * @大地类
 * @param { options: Object } 可配参数
 * @param { options.ctx: Context } 绘图上下文
 * @param { options.img: Image } 大地图
 * @param { options.speed: speed } 速度
 * */
function Land(options) {
    this.ctx = options.ctx;
    this.ld = options.ld;
    this.speed = options.speed || 2;
    this.color=options.color;

    // 根据Land的数量动态计算x轴坐标
    this.width = options.ld.width;
    this.height = options.ld.height;
    this.x = this.width * Land.len++;
    this.y = this.ctx.canvas.height - this.height;

}

// 用来记录已创建的实例个数
Land.len = 0;

Land.prototype = {
    peng:function(){

        //return false;
        return '大地';
    },

    // 根据实例的属性值绘制
    draw: function() {
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
        this.ctx.rect(this.x, this.y, this.width, this.height);
        //this.ctx.fillStyle = '#BAAE9E';
        //alert(1);
    },

    // 更新下一帧绘制数据
    update: function() {
        this.x -= this.speed;

        // 走出画布，向右拼接
        if(this.x < -this.width) {
            this.x += this.width * Land.len;
        }
    }
}