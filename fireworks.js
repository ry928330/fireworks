window.onload = function() {
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var animation;

	// var fire = {
	// 	x: 960,
	// 	y: 700,
	// 	radius: 3,
	// 	vx: 5,
	// 	vy: 5,
	// 	color: 'blue',
	// 	angel: 180,
	// 	trackRadius: Math.random()*200,
	// 	//color: 'rgb(255,255,255)',
	// 	draw: function() {

	// 		ctx.beginPath();
	// 		ctx.fillStyle = this.color;
	// 		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true),
	// 		ctx.fill();
	// 		ctx.closePath();
	// 	}
	// }
	function CreateFireObj(x, y, color, trackRadius, offsetValueX, offsetValueY) {
		this.initialX = x;
		this.initialY = y
		this.x = x;
		this.y = y;
		this.vx = 1;
		this.vy = 1;
		this.radius = 3;
		this.color = color;
		this.angel = 180;
		this.trackRadius = trackRadius;
		this.offsetValueX = offsetValueX;
		this.offsetValueY = offsetValueY;
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
	}
	function animate() {
		ctx.fillStyle = 'rgba(0,0,0,0.1)'; //产生拖尾效果
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		
		fire.draw();
		fire.move();
		fire2.draw();
		fire2.move();
		animation = window.requestAnimationFrame(animate);
	}
	// var index = 0;
	// setInterval(function(){
	// 	index++;
	// 	(new CreateFireObj(960, 700, 'blue', 100, Math.random()*3, Math.random()*3)).animate();
	// }, 5000)

	var fire = new CreateFireObj(960, 700, 'yellow', 100, Math.random()*3, Math.random()*3);
	// fire.animate();
	var fire2 = new CreateFireObj(960, 700, 'red', 200, Math.random()*3, Math.random()*3);
	// fire2.animate();
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
	animate();
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
}