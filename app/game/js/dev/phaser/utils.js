"use strict"

var Utils = function(){

}

/**
* Remove an object from the specified array and return it
*
* @method removeFromArray
* @param {Object} object Object to be removed
* @param {Array} array The array containing the object
* @return null if not found
*/
Utils.RemoveFromArray = function(_object,_array){
	var found = false;
	var i;
	for( i=0; i < _array.length; i++){
		//if the callback & context are the same
		if( _array[i] === _object ){
			//this is the object we are looking for
			found = true;
			break;
		}
	}
	if( found ){
		var objectRemoved = _array[i];
		//console.log("removing " + this.currentColliders[i].name);
		_array.splice(i,1);
		return objectRemoved;
	}
	return null;
}