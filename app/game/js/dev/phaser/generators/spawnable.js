"use strict";

var Spawnable = function(_gameobject) {
	Behaviour.call(this,_gameobject);
	this.generator = null;
}

Spawnable.prototype = Object.create(Behaviour.prototype);
Spawnable.prototype.constructor = Spawnable;

Spawnable.prototype.create = function(_data){

}

Spawnable.prototype.spawn = function(_data){
	this.gameobject.revive();

	if( _data.speed )
		this.speed = _data.speed;

	this.gameobject.body.velocity.x = _data.direction * _data.speed;
	if( _data.direction > 0 )
		this.gameobject.body.x = - this.gameobject.width;
	else
		this.gameobject.body.x = this.gameobject.game.width;
	this.gameobject.body.y = _data.y;
}