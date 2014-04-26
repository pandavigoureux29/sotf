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

Enemy.prototype.spawn = function(_y,_speed){
	if( _speed )
		this.speed = _speed;
	this.gameobject.visible = true;
	this.gameobject.body.velocity.x = this.direction * this.speed;
	if( this.direction > 0 )
		this.gameobject.body.x = - this.gameobject.width;
	else
		this.gameobject.body.x = this.gameobject.game.width;
	this.gameobject.body.y = _y;
}

Enemy.prototype.update = function(){
}