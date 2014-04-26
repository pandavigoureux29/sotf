"use strict";

var Generator = function(_gameobject){
	Behaviour.call(this,_gameobject);
	this.objects = new Array();
}

Generator.prototype = Object.create(Behaviour.prototype);
Generator.prototype.constructor = Generator;