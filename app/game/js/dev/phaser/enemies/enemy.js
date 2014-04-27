"use strict";

var Enemy = function(_gameobject){
	Behaviour.call(this,_gameobject);
	this.gameobject.layer = "enemy";
	this.gameobject.isEnemy = true;
	this.speed = 10;
	this.direction = 1;

	this.gameobject.enablePhysics();
	this.gameobject.enableEvents();
	this.gameobject.enableSensor();
	this.gameobject.body.data.gravityScale = 0;

	this.dead = false;
	this.points = 10;
}

Enemy.prototype = Object.create(Behaviour.prototype);
Enemy.prototype.constructor = Enemy;

Enemy.prototype.create = function(_data){
	if( _data.direction )
		this.changeDirection(_data.direction)
	if( _data.speed )
		this.speed = _data.speed;
}

Enemy.prototype.changeDirection = function(_direction){
	this.direction = _direction;
	this.gameobject.scale.x = this.direction;
}

Enemy.prototype.update = function(){
	
}

Enemy.prototype.onSpawn = function(_dataOpponent){
	console.log("onSpawn " + this.gameobject.getBehaviour(Spawnable).direction);
	this.changeDirection(this.gameobject.getBehaviour(Spawnable).direction);
}

Enemy.prototype.hit = function(_dataOpponent){
	this.die();
}

Enemy.prototype.die = function(){
	SCORE += this.points;
	var spawnScript = this.gameobject.getBehaviour(Spawnable);
	if( spawnScript != null && spawnScript.spawned == true){
		spawnScript.unspawn();
	}
}