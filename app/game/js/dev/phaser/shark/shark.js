"use strict";

var Shark = function(_gameobject) {
	Behaviour.call(this,_gameobject);
	_gameobject.enablePhysics();
	this.gameobject.body.setRectangle(40,50,30,0);
	_gameobject.enableEvents();
	_gameobject.body.data.gravityScale = 0;
	_gameobject.body.setZeroVelocity();

	this.gameobject.layer = "player";

	_gameobject.body.debug = true;
	this.timeAttack = 0.8;

	this.state = "IDLE";

	//attack
	this.attackCount = 0;
	this.biteAnim = this.gameobject.animations.add("bite", [ 1 ]);
	_gameobject.frame = 0;

	this.gameobject.game.input.onDown.add( this.attack , this);

	this.currentColliders = new Array();
}

Shark.prototype = Object.create(Behaviour.prototype);
Shark.prototype.constructor = Shark;

Shark.prototype.update = function(){
	switch( this.state ){
		case "launched" : if( this.gameobject.body.velocity.y < 10){
							this.gameobject.body.angle += 2;
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
	this.gameobject.body.data.gravityScale = 1;
	this.gameobject.body.velocity.x = _speedX;
	this.gameobject.body.velocity.y = _speedY;
}

//======================================================
//				ATTACK
//======================================================
Shark.prototype.attack = function(){
	if( this.state != "launched" || this.attackCount > 0 )
		return;
	this.attackCount ++;
	this.state = "attacking";
	this.gameobject.animations.play('bite', 3, false);
	this.gameobject.game.time.events.add(Phaser.Timer.SECOND * this.timeAttack, this.endAttack, this);
	//console.log(this.currentColliders.length);
	this.attackCurrentEnemies();
}

Shark.prototype.endAttack = function(){
	if( this.state == "attacking")
		this.state = "launched";
	this.gameobject.frame = 0;
}

//======================================================
//				HIT
//======================================================

Shark.prototype.hit = function(){
	if( this.state == "IDLE")
		return;
	console.log("hit shark");
	this.state = "hit";
	this.gameobject.body.velocity.y = 30;
	this.gameobject.body.velocity.x = 0;
}

Shark.prototype.onOffscreen = function(){
	this.state = "offscreen";
	this.gameobject.body.velocity.y = 0;
	this.gameobject.body.data.gravityScale = 0;
	this.attackCount = 0;
	//call playstate
	this.gameobject.game.state.getCurrentState().sharkOffscreen();
}

Shark.prototype.onBeginContact = function(_otherbody, _myshape, _othershape, _equation){
	if( _otherbody.gameobject.isEnemy ){
		if(this.state == "attacking"){
			this.state = "launched";
			_otherbody.gameobject.sendMessage("hit",{opponent: this, collshape:_othershape});
			this.endAttack();
		}else{
			this.currentColliders.push(_otherbody.gameobject);
		}
	}
}

Shark.prototype.onEndContact = function(_otherbody, _myshape, _othershape, _equation){
	if( _otherbody.gameobject.isEnemy ){
		this.removeEnemy(_otherbody.gameobject);		
	}
}

//=======================================================
//					CURRENT COLLIDERS ENEMIES
//=======================================================

Shark.prototype.removeEnemy = function(_gameobject){
	var found = false;
	var i;
	for( i=0; i < this.currentColliders.length; i++){
		//if the callback & context are the same
		if( this.currentColliders[i] === _gameobject ){
			//this is the object we are looking for
			found = true;
			break;
		}
	}
	if( found ){
		//console.log("removing " + this.currentColliders[i].name);
		this.currentColliders.splice(i,1);
	}
}

Shark.prototype.attackCurrentEnemies = function(_gameobject){
	var found = false;
	var i;
	for( i=0; i < this.currentColliders.length; i++){
		this.currentColliders[i].sendMessage("hit",{opponent: this});
		this.removeEnemy(this.currentColliders[i]);
	}
}

