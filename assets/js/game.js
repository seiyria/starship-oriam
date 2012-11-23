

var Game = {
	level: 0,
	isPaused: false,
	isDrawingLargeText: false,
	largeText: {endSize: 64, startSize: 12, curSize: 12, curTicks: 0, maxTicks: 128, text: ''},
	ticks: 0,
	state: state.mainmenu,
	
	pause: function() {
		Game.isPaused = true;
	},
	
	unpause: function() {
		Game.isPaused = false;
	},
	
	drawText: function(text, size, x, y) {
		ctx.scale(1, -1);
		ctx.lineWidth = 1;
		ctx.fillStyle = 'white';
		ctx.font = 'bold '+size+' Arial';
		ctx.fillText(text, x, y);
		ctx.scale(1, -1);
	},
	
	start: function() {
		Game.state = state.game;
		player = new Player();
		Game.beginDrawingText('START', true);
		
		setInterval(function() {
			if(Game.isPaused) return;
			Game.ticks++;
			MonsterSpawner.spawnNewMonster();
		}, 1);
	},
	
	beginDrawingText: function(_text, scaleDown) {
	
		if(Game.isDrawingLargeText) return;
	
		Game.isDrawingLargeText	=true;
		Game.largeText.text 	=_text;
		Game.largeText.curTicks	=(scaleDown ? Game.largeText.maxTicks/2 : 0);
		Game.largeText.curSize	=(scaleDown ? Game.largeText.endSize : Game.largeText.startSize);
		
		var interval = setInterval(function() {
			var stepSize = Math.floor(Game.largeText.maxTicks/(2*Game.largeText.endSize-Game.largeText.startSize));
			
			if(Game.largeText.curTicks<Game.largeText.maxTicks/2) {
				if(Game.largeText.curTicks%stepSize == 0) {
					Game.largeText.curSize = clamp(Game.largeText.curSize+1, Game.largeText.startSize, Game.largeText.endSize);
				}
				
			} else {
				if(Game.largeText.curTicks%stepSize == 0) {
					Game.largeText.curSize = clamp(Game.largeText.curSize-1, Game.largeText.startSize, Game.largeText.endSize);
				}
				if(Game.largeText.curSize == Game.largeText.startSize) {
					Game.doneDrawingText();
					clearInterval(interval);
				}
			}
			
			Game.largeText.curTicks++;
		}, (1000/Map.fps));
	},
	
	doneDrawingText: function() {
		Game.isDrawingLargeText=false;
	},
};

//http://www.wolframalpha.com/input/?i=5%2C15%2C30%2C100%2C250%2C600+to+function
var MonsterSpawner = {

	endOfMap: 630,
	
	spawnTicks: 1000,
	
	spawnNewMonster: function() {
		if(Game.ticks%MonsterSpawner.spawnTicks == 0){
			//MineEnemy.spawn(MonsterSpawner.endOfMap, 100);
		}
	},
};