

var Powerup = Movable.extend({
	
	imgPos: null, 
	
	width: 16,
	height: 16,
	
	init: function(x, y, _imgPos) {
		this._super(x,y);
		this.imgPos = _imgPos;
		powerups.push(this);
	},
	
	move: function() {
		this._super(0, 0);
	},
	
	apply: function() {
		switch(this.imgPos) {
			case powerupType.wave:
				if(player.secondShotType == wave) 
					player.secondShotType = doublewave;
				else if(!player.secondShotType)
					player.secondShotType=wave;
				break;
			case powerupType.life:
				player.lives++;
				break;
			case powerupType.buff:
				player.maxSpeed += 0.05;
				player.autoShootSpeed -= 35;
				break;
			case powerupType.split:
				if(player.shotType == linear) {
					player.shotType = twice;
				} else if(player.shotType == twice) {
					player.shotType = thrice;
				} else if(player.shotType == thrice) {
					player.shotType = sice;
				}
				break;
		}
	},
	
	collidedWith: function(entity) {
		this.apply();
		this.clearMe();
	},
	
	getImgData: function() {
		return renderers.powerup.imgMap()[this.imgPos];
	},
	
	clearMe: function() {
		var removed = this;
		powerups = $.grep(powerups, function(val) {
			return val != removed;
		});
	},
});