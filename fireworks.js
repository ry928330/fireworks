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
		this.boomJudge = true;
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
			this.x += this.vx + this.offsetValueX;
			this.y -= this.vy + this.offsetValueY;
		}
		//烟花爆炸，产生碎片
		this.boom = function() {
			var scope = Math.round(getRandom(10, 40));
			//var scope = 1;
			for (var i=0; i<scope; i++) {
				var angel = getRandom(0, 2*Math.PI);
				var range = Math.round(getRandom(50, 300));
				var targetX = this.x + range*Math.cos(angel);
				var targetY = this.y + range*Math.sin(angel);
				var r = Math.round(getRandom(120, 255));
				var g = Math.round(getRandom(120, 255));
				var b = Math.round(getRandom(120, 255));
				var color = 'rgb(' + r + ',' + g + ',' + b + ')';
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
		}
		that.move = function() {
			that.ty = that.ty + 0.5;
			var dx = that.tx - that.x, dy = that.ty - that.y;
			that.x = Math.abs(dx) < 0.1 ? that.tx : (that.x + dx*0.01);
			that.y = Math.abs(dy) < 0.1 ? that.ty : (that.y + dy*0.01);
			if (dx == 0 || dy == 0 || that.y >= 700 || that.x <= 300 || that.x >= 1700) {
				that.fragDisappear = true;
			}
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
					fragments.push(removeFire);
					if (fragments.length) {
						fragments.forEach(function(item, index) {
							if (item[0].boomJudge) {
								item[0].boom();
								item[0].boomJudge = false;
							}
						})
					}
					fireArr.push(createRandomFire(CreateFireObj));
				}
			})
		}
		if (fragments.length) {
			fragments.forEach(function(item1, index1) {
				item1[0].fragArr.forEach(function(item2, index2) {
					if (item2.fragDisappear) {
						fragments.splice(index1, 1);
					}
					item2.draw();
					item2.move();
				})
			})
		}
		animation = window.requestAnimationFrame(animate);
	}
	function getRandom(a, b) {
		return Math.random()*(b - a) + a
	}

}

	function move() {
		ctx.fillStyle = 'rgba(0,0,0,0.1)';
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		fire.draw();
		fire.x = fire.trackRadius * Math.cos(Math.PI/180 * fire.angel) + fire.trackRadius + 960;
		fire.y = fire.trackRadius * Math.sin(Math.PI/180 * fire.angel) + 700;
		fire.angel += 2;
	}
	var button = document.getElementById('animationTest');
	button.addEventListener('click', function() {
		(new CreateFireObj(960, 700, 'blue', 100, Math.random()*3, Math.random()*3)).animate();
	})
