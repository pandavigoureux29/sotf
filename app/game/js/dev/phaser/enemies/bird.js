"use strict";

var Bird = function(_gameobject){
	Enemy.call(this,_gameobject);

	this.gameobject.body.setRectangle(34,34,4,0);
	this.gameobject.enableEvents();
	this.gameobject.enableSensor();

	this.animFly = this.gameobject.animations.add("fly", [ 0, 1, 2 ]);
	this.gameobject.animations.play('fly', 5, true);
	//this.gameobject.body.debug = true;
	this.dying = false;

	this.emitter = this.gameobject.game.add.emitter(0, 0, 100);
	this.emitter.makeParticles('feather');
	this.emitter.gravity = 0;
	this.emitter.setXSpeed(-30,30);
	this.emitter.setYSpeed(-30,30);
}

Bird.prototype = Object.create(Enemy.prototype);
Bird.prototype.constructor = Bird;

Bird.prototype.hit = function(_dataOpponent){
	if( this.gameobject.exists){
		SCORE += this.points;
		this.dead = true;
		this.dying = true;
		//feed shark
		this.gameobject.game.state.getCurrentState().giveLife( 10 );		

		this.emitter.x = this.gameobject.body.x;
    	this.emitter.y = this.gameobject.body.y;

	    //  The first parameter sets the effect to "explode" which means all particles are emitted at once
	    //  The second gives each particle a 2000ms lifespan
	    //  The third is ignored when using burst/explode mode
	    //  The final parameter (10) is how many particles will be emitted in this single burst
	    this.emitter.start(true, 1400, null, 30);
	}
}

Bird.prototype.update = function(){
	if( this.dying ){
		this.gameobject.scale.y -= 6 * this.gameobject.game.time.elapsed * 0.001;
		if( this.gameobject.scale.y <= 0.1){
			this.gameobject.scale.y = 1;
			this.dying = false;
			this.gameobject.getBehaviour(Spawnable).unspawn();
			this.die();
		}
	}
}