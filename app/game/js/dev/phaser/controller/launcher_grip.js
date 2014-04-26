"use strict";

var LauncherGrip = function(_gameobject) {
	Behaviour.call(this,_gameobject);

	this.gameobject.inputEnabled = true;
	this.gameobject.input.enableDrag(true);

	this.force = 0;
	this.validShot = false;
	this.ready = true;
}

LauncherGrip.prototype = Object.create(Behaviour.prototype);
LauncherGrip.prototype.constructor = LauncherGrip;

LauncherGrip.prototype.create = function(_data){
	if( _data.shark ){
		this.shark = _data.shark;
	}
}

LauncherGrip.prototype.replace = function(_x, _y){
	this.gameobject.x = _x;
	this.gameobject.y = _y;
	this.shark.place( _x, _y)
	this.ready = true;
	this.gameobject.visible = true;
}

LauncherGrip.prototype.update = function(){
	if(this.ready == false)
		return;
	if( this.gameobject.input.isDragged ){
		this.processGrip();
	}else if( this.validShot == true){
		this.validShot = false;
		this.shark.launch( this.vectorDir.x * this.force, this.vectorDir.y * this.force );
		this.ready = false;
		this.gameobject.visible = false;
	}
}

LauncherGrip.prototype.processGrip = function(){
	//get vector from grip to shark center => this is the direction
	var centerGrip = new Phaser.Point(this.gameobject.x, this.gameobject.y)
	var centerShark = this.shark.getCenter();
	this.vectorDir = centerShark.subtract(centerGrip.x,centerGrip.y);

	if( this.vectorDir.y > 0 ){
		this.validShot = false;
		return;
	}else{
		this.validShot = true;
	}
	//store vector length
	this.force = this.vectorDir.getMagnitude() * 8
	//normalize
	this.vectorDir = this.vectorDir.normalize();
	//Get angle
	var ang = Math.acos( this.vectorDir.x );
	//Rotate shark
	this.shark.rotateFromGrip(ang / ( Math.PI / 180 ));
}