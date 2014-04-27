"use strict";

var Generator = function(_gameobject){
	Behaviour.call(this,_gameobject);

	this.objects = new Array();
	this.liveObjects = new Array();
	this.deadObjects = new Array();

	this.timeMin = 1;
	this.timeRange = 1;

	this.yMax = SEA_Y;
	this.yMin = 10;

	this.collisionManager = _gameobject.game.state.getCurrentState().collisionManager;
}

Generator.prototype = Object.create(Behaviour.prototype);
Generator.prototype.constructor = Generator;

Generator.prototype.create = function(_data){

	this.createObjects();

	if( _data.autostart == true){
		this.start();
	}
}

Generator.prototype.createObjects = function(_data){
	this.group = this.gameobject.game.add.group();
	for(var i = 0; i < 5; i ++ ){
		var bird = new GameObject(this.gameobject.game,400,100,"touky","touky");
		var BHbird = bird.addBehaviour(new Bird(bird));
		bird.addBehaviour( new Spawnable(bird));
		//Add to groups
		this.collisionManager.addGameObject(bird);
		this.group.add(bird);
		//kill it
		bird.kill();
		//add to arrays
		this.objects.push(bird);
		this.deadObjects.push(bird);
	}
}

Generator.prototype.start = function(){
	var time = this.timeMin + Math.random() * this.timeRange;
	this.gameobject.game.time.events.add(Phaser.Timer.SECOND * time, this.spawn, this);
}

Generator.prototype.spawn = function(){
	if( this.enabled == false)
		return;
	var spawnable = this.findFreeObject();
	if( spawnable == null)
		return;
	this.spawnObject(spawnable);

	var time = this.timeMin + Math.random() * this.timeRange;
	this.gameobject.game.time.events.add(Phaser.Timer.SECOND * time, this.spawn, this);
}


Generator.prototype.findFreeObject = function(){
	if(this.deadObjects.length == 0)
		return null;
	return this.deadObjects[0];
}

Generator.prototype.update = function(){

}

/**
* Override This to spawn your object the way you wish
*
* @method spawnObject
* @param {GameObject} gameobject Object to spawn
*/
Generator.prototype.spawnObject = function(_object){
	Utils.RemoveFromArray(_object,this.deadObjects);
	this.liveObjects.push(_object);
	_object.getBehaviour(Spawnable).spawn({y:120,direction:1, speed : 100});
}

Generator.prototype.recycleObject = function(_object){
	Utils.RemoveFromArray(_object,this.liveObjects);
	this.deadObjects.push(_object);
}