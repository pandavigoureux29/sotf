"use strict";

/**
* Export a level.
*
* @class LevelExporter
* @constructor
*/
var LevelExporter = function() {

};

/**
* Export all the level.
*
* @method export
* @param {Phaser.Game} game The game of the level
* @return {Object} exported level
*/
LevelExporter.prototype.export = function(_game) {
	var level = new Object();

	level.assets = this.exportAssets(_game.cache);
	level.objects = this.exportObjects(_game.world);

	return level;
};

/***********
** ASSETS **
***********/

/**
* Export all the level's assets.
*
* @method exportAssets
* @param {Phaser.Cache} cache The game's cache of the level
* @return {Object} exportable level's assets
*/
LevelExporter.prototype.exportAssets = function(_cache) {
	var assets = new Object();

	assets.images = this.exportImages(_cache);

	return assets;
};

/***********
** IMAGES **
***********/

/**
* Export all the level's images.
*
* @method exportImages
* @param {Phaser.Cache} cache The game's cache of the level
* @return {Object} exportable level's images
*/
LevelExporter.prototype.exportImages = function(_cache) {
	var images = new Array();

		var keys = _cache.getKeys(Phaser.Cache.IMAGE);
		for (var i = 0; i < keys.length; i++) {
			var key = keys[i];
			var cachedImage = _cache.getImage(key);
			var frame = _cache.getFrameByIndex(key, 0);
			var image = this.exportImage(cachedImage, frame);
			images.push(image);
		};

		return images;
};

/**
* Export a cached image into an exportable image.
*
* @method exportImage
* @param {Image} cachedImage The cached image
* @param {Phaser.Frame} frame The default frame of the image
* @return {Object} exportable level's images
*/
LevelExporter.prototype.exportImage = function(_cachedImage, _frame) {
	var image = new Object();

	image.name = _cachedImage.name;
	image.src = _cachedImage.src;
	image.width = _cachedImage.width;
	image.height = _cachedImage.height;
	if (_frame) {
		image.frameWidth = _frame.width;
		image.frameHeight = _frame.height;
	}

	return image;
};

/************
** OBJECTS **
************/

/**
* Export all the level's objects.
*
* @method exportObjects
* @param {Phaser.Group | GameObject} parent The parent object
* @return {Phaser.Group | GameObject} the exported parent and its descendants
*/
LevelExporter.prototype.exportObjects = function(_parent) {
	var eObjects = null;

	//don't export editor's objects
	if (_parent.name !== "__editor") {
		// export parent
		eObjects = this.exportObject(_parent);

		// if parent has children
		if (_parent.children.length > 0) {
			eObjects.children = new Array();
			for (var i=0; i<_parent.children.length; i++) {
				var child = _parent.children[i];
				// export child
				var obj = this.exportObjects(child);
				// add exported child
				if (obj != null) {
					eObjects.children.push(obj);
				}
			}
		}
	}
	
	return eObjects;
};

/**
* Export all the level's objects.
*
* @method exportObject
* @param {Phaser.Group | GameObject} object The object to export
* @return {Phaser.Group | GameObject} the exported object
*/
LevelExporter.prototype.exportObject = function(_object) {
	var eObj = new Object();

	eObj.type = LevelUtilities.GetType(_object);

	for (var i = 0; i < LevelUtilities.OBJECT_ATTRIBUTES.length; i++) {
		var attr = LevelUtilities.OBJECT_ATTRIBUTES[i];
		eObj[attr] = _object[attr];
	};

	return eObj;
};
