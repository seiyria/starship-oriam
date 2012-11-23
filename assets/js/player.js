

var Player = Movable.extend({

	lives: 3,

	init: function() {
		this._super(96,32);
		this.bindMovementKeys();
		this.maxSpeed=0.5;
		this.autoShoot();		
	},
	
	//which keys the player has pressed
	keyPresses: new Array(),
	
	autoShootSpeed: 250,
	
	shotType: linear,
	
	secondShotType: null,
	
	autoShoot: function() {
		var player = this;
		var ticks = 0;
		this.autoShootInterval = setInterval(function() {
			if(Game.isPaused) return;
			if((ticks++>player.autoShootSpeed)) {
				ticks = 0;
				player.shoot();
			}
		}, 1);
	},
	
	shoot: function() {
		var bullet = new Bullet(this, this.getPx()+33, this.getPy()+(this.width/3), this.shotType, determineBulletTypeFromShot(this.shotType));
		bullet.setVelocityForDirection(dir.right);
		
		if(this.secondShotType) {
			bullet = new Bullet(this, this.getPx()+33, this.getPy()+(this.width/3), this.secondShotType, determineBulletTypeFromShot(this.secondShotType));
			bullet.setVelocityForDirection(dir.right);
		}
	},
	
	//bind the movement keys
	bindMovementKeys: function() {
	
		var player = this;
	
		$("#game, html").keydown(function (e) {
			var keyCode = e.keyCode || e.which;
			player.keyPresses[keyCode] = true;
		});
		$("#game, html").keyup(function (e) {
			var keyCode = e.keyCode || e.which;
			player.keyPresses[keyCode] = false;
		});
	},
	
	checkKeyPresses: function() {
			
		if(this.keyPresses[arrow.left]) {
			if(this.xVel > -this.maxSpeed)
				this.xVel -= this.moveSpeed;
		}
				
		if(this.keyPresses[arrow.right]) {
			if(this.xVel < this.maxSpeed)
				this.xVel += this.moveSpeed;
		}
				
		if(!this.keyPresses[arrow.left] && !this.keyPresses[arrow.right]) {
			if(this.xVel > 0) this.xVel -= this.moveSpeed;
			if(this.xVel < 0) this.xVel += this.moveSpeed;
		}
		
		if(this.keyPresses[arrow.down]) {
			if(this.yVel > -this.maxSpeed)
				this.yVel -= this.moveSpeed;
		}
		
		if(this.keyPresses[arrow.up]) {
			if(this.yVel < this.maxSpeed)
				this.yVel += this.moveSpeed;
		}
				
		if(!this.keyPresses[arrow.down] && !this.keyPresses[arrow.up]) {
			if(this.yVel > 0) this.yVel -= this.moveSpeed;
			if(this.yVel < 0) this.yVel += this.moveSpeed;
		}
	},
	
	movement: function() {
	
		var player = this;
	
		setInterval(function() {
			if(!player.canMove()) return;
			player.checkKeyPresses();
			player.changeDir();
			player.move(player.xVel, player.yVel);
		}, timeInterval);
	},
	
	getImgData: function() {
		return renderers.mob.imgMap()[mobs.player];
	}
	
});