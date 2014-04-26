"use strict";

var Bird = function(_gameobject){
	Enemy.call(this,_gameobject);
	this.animFly = this.gameobject.animations.add("fly", [ 0, 1, 2 ]);
	this.gameobject.animations.play('fly', 5, true);
}

Bird.prototype = Object.create(Enemy.prototype);
Bird.prototype.constructor = Bird;