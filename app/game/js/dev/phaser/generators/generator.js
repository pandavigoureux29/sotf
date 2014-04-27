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

	this.speedMin = 100;
	this.speedMax = 300;

	this.poolCount = 1;
	this.maxAlive = 50;

	this.collisionManager = _gameobject.game.state.getCurrentState().collisionManager;
}

Generator.prototype = Object.create(Behaviour.prototype);
Generator.prototype.constructor = Generator;

Generator.prototype.create = function(_data){

	if( _data.poolCount )
		this.poolCount = _data.poolCount;
	if( _data.speedMin )
		this.speedMin = _data.speedMin;
	if( _data.speedMax )
		this.speedMax = _data.speedMax;

	if( _data.yMax )
		this.yMax = _data.yMax;
	if( _data.yMax )
		this.yMin = _data.yMin;

	this.createObjects(_data);

	if( _data.autostart == true){
		this.start();
	}

	this.classType = _data.classType;
}

Generator.prototype.createObjects = function(_data){
	var go , spawnable ;
	this.group = this.gameobject.game.add.group();
	for(var i = 0; i < this.poolCount; i ++ ){
		go = new GameObject(this.gameobject.game,400,100,_data.textureKey,_data.textureKey+i);

		//create behaviour from data
		var bh = Object.create( _data.classType.prototype );
		_data.classType.prototype.constructor.call(bh,go);

		go.addBehaviour(bh);
		//bh.create(_data.createData);

		//spawnable
		spawnable = go.addBehaviour( new Spawnable(go));
		spawnable.create({generator : this});
		//Add to groups
		this.collisionManager.addGameObject(go);
		this.group.add(go);
		//kill it
		go.kill();
		//add to arrays
		this.objects.push(go);
		this.deadObjects.push(go);
	}
}

Generator.prototype.start = function(){
	var time = this.timeMin + Math.random() * this.timeRange;
	this.gameobject.game.time.events.add(Phaser.Timer.SECOND * time, this.spawn, this);
}

Generator.prototype.spawn = function(){
	if( this.enabled == false)
		return;

	var time = this.timeMin + Math.random() * this.timeRange;
	this.gameobject.game.time.events.add(Phaser.Timer.SECOND * time, this.spawn, this);

	var spawnable = this.findFreeObject();
	if( spawnable == null)
		return;
	this.spawnObject(spawnable);
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
	//randomize y
	var yRand = this.yMin + ( Math.random() * (this.yMax - this.yMin ));
	//randomize speed
	var speedRand = this.speedMin + ( Math.random() * (this.speedMax - this.speedMin ));
	//randomize direction
	var d = Math.random();
	if( d > 0.5 )
		d = 1;
	else
		d = -1;
	//randomize direction
	_object.getBehaviour(Spawnable).spawn({y:yRand,direction:d, speed : speedRand});
}

Generator.prototype.unspawnObject = function(_object){
	Utils.RemoveFromArray(_object,this.liveObjects);
	this.deadObjects.push(_object);
}