

var Enemy = Movable.extend({

	//keep track of where the bullet originated so we know whether to check it against the enemy list or the player
	origin: null,
	
	moveFlow: null, 
	
	imgPos: 3,
	
	shootFunction: null,

	init: function(origin, x, y, flow, _imgPos, shotFunc) {
		this._super(x,y);
		bullets.push(this);
		this.origin = origin;
		this.moveSpeed = 2;
		if(_imgPos != null)	this.imgPos = _imgPos;
		if(flow == null) 	this.moveFlow = linear;
		else this.moveFlow = flow;
		this.shootFunction = shotFunc;
	},
	
	collidedWith: function(entity) {
		this.clearMe();
	},
	
	modifyMovement: function() {
		if(this.origin != player) {
			if(this.intersects(player))
				this.collideWith(player);
		} else {
			var me = this;
			bullets.forEach(function(bullet) {
				if((me!=bullet) && (me.origin != bullet.origin) && me.origin!=bullet && bullet.origin!=me && me.intersects(bullet)) {
					me.collideWith(bullet);
				}
			});		
		}
	},
	
	move: function() {
		var moveVector = this.moveFlow.nextMove(this);
		this.xVel = moveVector.x;
		this.yVel = moveVector.y;
		if(typeof this.shootFunction === 'function')
			this.shootFunction();
		this._super(moveVector.x, moveVector.y);
	},
	
	collidedWith: function(entity) {
		this._super(entity);
	},
	
	collideWith: function(entity) {
		this._super(entity);
		this.clearMe();
	},
	
	hitBounds: function() {
		this.clearMe();
	},
	
	clearMe: function() {
		var removed = this;
		bullets = $.grep(bullets, function(val) {
			return val != removed;
		});
		clearInterval(removed.movementInterval);
	},
	
	getImgData: function() {
		return renderers.mob.imgMap()[this.imgPos];
	},
});