"use strict";

var Shark = function(_gameobject) {
	Behaviour.call(this,_gameobject);
	_gameobject.enablePhysics();
	this.gameobject.body.setRectangle(40,50,30,0);
	_gameobject.enableEvents();
	_gameobject.body.data.gravityScale = 0;
	_gameobject.body.setZeroVelocity();

	//_gameobject.body.debug = true;

	this.state = "IDLE";

	//attack
	this.attackCount = 0;
	this.biteAnim = this.gameobject.animations.add("bite", [ 1 ]);
	_gameobject.frame = 0;

	this.gameobject.game.input.onDown.add( this.attack , this);
}

Shark.prototype = Object.create(Behaviour.prototype);
Shark.prototype.constructor = Shark;

Shark.prototype.update = function(){
	switch( this.state ){
		case "launched" : if( this.gameobject.body.velocity.y < 10){
							this.gameobject.body.angle += 1.5;
						}
						break;
		default : break;
	}
		
	if( this.gameobject.y > this.gameobject.game.height * 1.1) 
		this.onOffscreen(); 
	
}

Shark.prototype.getCenter = function(){
	return new Phaser.Point(this.gameobject.x,this.gameobject.y);
}

Shark.prototype.place = function( _x, _y){
	this.state = "IDLE";
	this.gameobject.body.setZeroVelocity();
	//place shark
	this.gameobject.body.x = _x;
	this.gameobject.body.y = _y - 30;
	//scale it 
	if( _x < this.gameobject.game.width * 0.5)
		this.gameobject.scale.x = -1;
	else
		this.gameobject.scale.x = 1;
	//rotate it
	this.gameobject.body.angle = -90;
}

Shark.prototype.rotateFromGrip = function(_rotationAngle){
	this.gameobject.body.angle = - _rotationAngle;
}

Shark.prototype.launch = function( _speedX, _speedY){
	this.state = "launched";
	console.log(_speedX + " " + _speedY);
	this.gameobject.body.data.gravityScale = 2.4;
	this.gameobject.body.velocity.x = _speedX;
	this.gameobject.body.velocity.y = _speedY;
}

Shark.prototype.attack = function(){
	if( this.state != "launched" || this.attackCount > 0 )
		return;
	this.attackCount ++;
	this.state = "attacking";
	this.gameobject.animations.play('bite', 5, false);
	this.gameobject.game.time.events.add(Phaser.Timer.SECOND * 0.7, this.endAttack, this);
}

Shark.prototype.endAttack = function(){
	if( this.state == "attacking")
		this.state = "launched";
}

Shark.prototype.onOffscreen = function(){
	this.state = "offscreen";
	this.gameobject.body.setZeroVelocity();
	this.gameobject.body.data.gravityScale = 0;
	this.attackCount = 0;
	//call playstate
	this.gameobject.game.state.getCurrentState().sharkOffscreen();
}
