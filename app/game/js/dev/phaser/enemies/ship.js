"use strict ";

var Ship = function(_gameobject){
	Enemy.call(this,_gameobject);
	this.gameobject.layer = "ship";
	this.gameobject.isEnemy = true;
	this.speed = 10;
	this.direction = 1;

	this.gameobject.enablePhysics();

	this.gameobject.body.setRectangle(60,40,0,0);
	//Death SENSOR
	this.deathSensor = this.gameobject.body.addRectangle(100, 40, 0, 40, 0)
	this.deathSensor.sensor = true;	

	this.gameobject.enableEvents();
	this.gameobject.enableSensor();
	this.gameobject.body.data.gravityScale = 0;

	this.gameobject.body.setZeroDamping();

	this.gameobject.scale.setTo(1.2,1.2);

	this.animCrash = this.gameobject.animations.add("crash", [ 1, 2, 3 ]);

	//this.gameobject.body.debug = true;
	this.countSinus = 0;

	this.dead = false;
	this.points = 100;
}

Ship.prototype = Object.create(Enemy.prototype);
Ship.prototype.constructor = Ship;

Ship.prototype.onSpawn = function(_dataOpponent){
	this.changeDirection(this.gameobject.getBehaviour(Spawnable).direction);
	this.gameobject.body.y -= 30;
	console.log(this.gameobject.body);
	this.dead = false;
	this.gameobject.frame = 0;
	this.sunk = false;
	this.baseY = this.gameobject.body.y;
}

Ship.prototype.onBeginContact = function(_otherbody, _myshape, _othershape, _equation){
	if( _otherbody.gameobject.layer == "player"){
		if( _myshape === this.deathSensor && !this.sunk){
			_otherbody.gameobject.sendMessage("hit");
		}
	}
}

Ship.prototype.hit = function(_dataOpponent){
	if( _dataOpponent.collshape === this.gameobject.body.data.shapes[0] ){
		this.gameobject.animations.play('crash', 10, false);
		this.gameobject.body.setZeroVelocity();
		this.gameobject.body.y += 5;
		this.gameobject.body.velocity.y = 90;
		//this.gameobject.body.data.gravityScale = 0.1;
		this.sunk = true;
	}
}


Ship.prototype.update = function(){
	if( this.sunk ){
		if( this.gameobject.body.y > this.gameobject.game.height + 100){
			this.gameobject.body.velocity.y = 0;
			this.sunk = false;
			this.die();
		}
	}else{
		this.countSinus += 0.07;
		this.gameobject.body.y = this.baseY +  Math.cos(this.countSinus)*3;
	}
}