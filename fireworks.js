window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var animation;
	var fireArr = [];
	var fragments = [];
	//animate();
	////初始化烟花数：5
	for (var i=0; i<5; i++) {
		fireArr.push(createRandomFire(CreateFireObj));
	}
	if (fireArr.length) {
		animate();
	}
	function CreateFireObj(x, y, color, offsetValueX, offsetValueY) {
		this.fragArr = [];
		this.initialX = x;
		this.initialY = y
		this.x = x;
		this.y = y;
		this.vx = 2;
		this.vy = 2;
		this.radius = 4;
		this.color = color;
		this.angel = 180;
		this.offsetValueX = offsetValueX;
		this.offsetValueY = offsetValueY;
		this.disappear = false;
		this.draw = function() {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = this.color;
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true),
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
		this.move = function() {
			//console.log(this.offsetValueX, this.offsetValueY)
			this.x += this.vx + this.offsetValueX;
			this.y -= this.vy + this.offsetValueY;
		}
		//烟花爆炸，产生碎片
		this.boom = function() {
			var scope = getRandom(200, 300);
			for (var i=0; i<scope; i++) {
				var angel = Math.PI/180 * getRandom(0, 2*Math.PI);
				var targetX = this.x + scope*Math.cos(angel);
				var targetY = this.y + scope*Math.sin(angel);
				var r = Math.round(getRandom(120, 255));
				var g = Math.round(getRandom(120, 255));
				var b = Math.round(getRandom(120, 255));
				var color = 'rgb(' + r + ',' + g + ',' + b + ')';
				//console.log(this.x, this.y)
				var frag = new CreateFrag(this.x, this.y, color, targetX, targetY);
				this.fragArr.push(frag);
			}
		}
	}
	function CreateFrag(x, y, color, tx, ty) {
		var that = this
		that.x = x;
		that.y = y;
		that.ty = ty;
		that.tx = tx;
		that.color = color;
		that.disappear = false;
		that.draw = function() {
			ctx.save();
			ctx.beginPath();
			ctx.fillStyle = that.color;
			ctx.fillRect(that.x, that.y, 2, 2);
			ctx.restore();
			// console.log('fragDraw1')
		}
		that.move = function() {
			//console.log(that.x, that.y, that.tx, that.ty)
			var dx = that.tx - that.x, dy = that.ty - that.y;
			that.x = Math.abs(dx) < 0.1 ? that.tx : (that.x + dx*0.1);
			that.y = Math.abs(dy) < 0.1 ? that.ty : (that.y + dy*0.1);
			// console.log(dx,dy)
			//console.log(that.x, that.y)
			if (dx == 0 || dy == 0) {
				that.disappear = true; 
				console.log(1111111111111)
			}
			// console.log('fragDraw2')
		}
	}
	function createRandomFire(func) {
		var r = Math.round(getRandom(200, 255));
		var g = Math.round(getRandom(200, 255));
		var b = Math.round(getRandom(0, 255));
		var color = 'rgb(' + r + ',' + g + ',' + b + ')';
		var fire = new func(960 + getRandom(-300, 300), 800, color, getRandom(-5, 5), getRandom(0, 3));
		return fire;
	}

	function animate() {
		ctx.fillStyle = 'rgba(0,0,0,0.05)'; //产生拖尾效果
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		if (fireArr.length) {
			fireArr.forEach(function(item, index) {
				var marginWidthLeft =  parseInt(getRandom(0, canvas.width/5), 10);
				var marginWidthRight = parseInt(getRandom(1500, canvas.width), 10);
				var marginHeight = parseInt(getRandom(0, 300), 10);
				if (item.x >= marginWidthRight || item.x <=  marginWidthLeft || item.y <= marginHeight) {
					item.disappear = true;
				}
				if (!item.disappear) {
					item.draw();
					item.move();
				} else {
					var removeFire = fireArr.splice(index, 1);
					//console.log(removeFire[0].x, removeFire[0].y)
					removeFire[0].boom();
					//console.log(removeFire[0].fragArr.length)
					removeFire[0].fragArr.forEach(function(item, index) {
						
						item.draw();
						item.move();
					})
					fireArr.push(createRandomFire(CreateFireObj));
				}
				
			})
		}
		animation = window.requestAnimationFrame(animate);
	}
	function getRandom(a, b) {
		return Math.random()*(b - a) + a
	}

}

	// var fireArr = [];
	// setInterval(function(){
	// 	var r = Math.round(getRandom(200, 255));
	// 	var g = Math.round(getRandom(200, 255));
	// 	var b = Math.round(getRandom(0, 255));
	// 	var color = 'rgb(' + r + ',' + g + ',' + b + ')';

	// 	fireArr[fireArr.length] = new CreateFireObj(960 + getRandom(-300, 300), 800, color, getRandom(-5, 5), getRandom(0, 3));
	// }, 3000)                                                

	// 作圆周运动轨迹
	// function animate() {
	// 	console.log(arguments[0])
	// 	ctx.fillStyle = 'rgba(0,0,0,0.1)'; //产生拖尾效果
	// 	ctx.fillRect(0, 0, canvas.width, canvas.height);
		
	// 	fire.draw();
	// 	fire.x = fire.trackRadius * Math.cos(Math.PI/180 * fire.angel) + fire.trackRadius + fire.initialX;
	// 	fire.y = fire.trackRadius * Math.sin(Math.PI/180 * fire.angel) + fire.initialY;
	// 	fire.angel += 2;
	// 	animation = window.requestAnimationFrame(animate);

	// }
	//animate();
	function move() {
		ctx.fillStyle = 'rgba(0,0,0,0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		//ctx.clearRect(0, 0, canvas.width, canvas.height);
		fire.draw();
		fire.x = fire.trackRadius * Math.cos(Math.PI/180 * fire.angel) + fire.trackRadius + 960;
		fire.y = fire.trackRadius * Math.sin(Math.PI/180 * fire.angel) + 700;
		fire.angel += 2;
	}
	var button = document.getElementById('animationTest');
	button.addEventListener('click', function() {
		(new CreateFireObj(960, 700, 'blue', 100, Math.random()*3, Math.random()*3)).animate();
	})
