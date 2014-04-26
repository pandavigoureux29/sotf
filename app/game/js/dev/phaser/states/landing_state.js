"use strict";

var LandingState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("Landing", this, false);
};

LandingState.prototype = Object.create(Phaser.State.prototype);
LandingState.prototype.constructor = LandingState;

LandingState.prototype.preload = function() {
}

LandingState.prototype.create = function() {

	this.game.state.start("Play");
}

LandingState.prototype.update = function() {
}

LandingState.prototype.render = function() {
}
