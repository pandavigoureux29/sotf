"use strict";

var TutoState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("Tuto", this, false);
};


TutoState.prototype = Object.create(Phaser.State.prototype);
TutoState.prototype.constructor = TutoState;

TutoState.prototype.create = function() {
	this.game.input.onUp.add( this.onPlay , this);
	this.game.add.sprite(0,0,"tuto");
}


TutoState.prototype.onPlay = function() {	
	this.game.state.start("Play");
}