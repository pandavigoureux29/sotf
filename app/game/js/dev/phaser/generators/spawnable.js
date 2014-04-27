"use strict";

var Spawnable = function(_gameobject) {
	Behaviour.call(this,_gameobject);
	this.generator = null;
	this.direction = 1;
	this.spawned = false;
}

Spawnable.prototype = Object.create(Behaviour.prototype);
Spawnable.prototype.constructor = Spawnable;

Spawnable.prototype.create = function(_data){
	this.generator = _data.generator;
}

Spawnable.prototype.spawn = function(_data){
	this.spawned = true;
	this.gameobject.revive();

	if( _data.speed )
		this.speed = _data.speed;
	this.direction = _data.direction;

	this.gameobject.body.velocity.x = _data.direction * _data.speed;

	if( _data.direction > 0 ){
		this.gameobject.body.x = - this.gameobject.width;
	}else{
		this.gameobject.body.x = this.gameobject.game.width * 1.5;
	}
	this.gameobject.body.y = _data.y;

	this.gameobject.sendMessage("onSpawn");
}

Spawnable.prototype.unspawn = function(_data){
	if( this.spawned == false ){
		console.log("trying to unspawn " + this.gameobject.name);
		return;
	}
	this.spawned = false;
	console.log("unspawn " + this.gameobject.name);
	this.gameobject.body.setZeroVelocity();
	this.gameobject.kill();
	this.generator.unspawnObject(this.gameobject);
}

Spawnable.prototype.update = function(){
	if( this.spawned ){
		if( (  this.direction > 0 && this.gameobject.body.x > this.gameobject.game.width )
			|| ( this.direction < 0 && this.gameobject.body.x < 0 ) ){
			//console.log("unspawn from spanw update");
			this.unspawn();
		}
	}
}