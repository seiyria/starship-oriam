

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
	},
	
	collidedWith: function(entity) {
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