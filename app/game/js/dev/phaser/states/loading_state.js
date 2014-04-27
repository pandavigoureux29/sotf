"use strict";

var LoadingState = function(_game) {
	Phaser.State.call(this, _game);
	_game.state.add("Loading", this, false);
};

LoadingState.prototype = Object.create(Phaser.State.prototype);
LoadingState.prototype.constructor = LoadingState;

LoadingState.prototype.preload = function() {

	this.game.load.image("bg", "assets/images/background.png");

	this.game.load.spritesheet("shark","assets/images/shark.png",74,64,2);
	this.game.load.image("tooth","assets/images/tooth.png");
	this.game.load.image("tooth_grey","assets/images/tooth_grey.png");
	this.game.load.spritesheet("ship","assets/images/ship.png",115,115,4);
	this.game.load.spritesheet("touky","assets/images/bird1.png",48,48,3);
	this.game.load.image("grip","assets/images/grip.png");
	this.game.load.image("wave","assets/images/wave.png");
}

LoadingState.prototype.create = function() {
	this.game.state.start("Landing");
	//this.game.state.start("Play);
}

LoadingState.prototype.update = function() {
}

LoadingState.prototype.render = function() {
}
