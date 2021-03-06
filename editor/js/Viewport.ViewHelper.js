/**
 * @author Mugen87 / https://github.com/Mugen87
 */

import * as THREE from '../../build/three.module.js';

function ViewHelper() {

	THREE.Object3D.call( this );

	var color1 = new THREE.Color( '#ff3653' );
	var color2 = new THREE.Color( '#8adb00' );
	var color3 = new THREE.Color( '#2c8fff' );

	var camera = new THREE.OrthographicCamera( - 2, 2, 2, - 2, 0, 4 );
	camera.position.set( 0, 0, 2 );

	var axesHelper = new THREE.AxesHelper();
	color1.toArray( axesHelper.geometry.attributes.color.array, 0 );
	color1.toArray( axesHelper.geometry.attributes.color.array, 3 );
	color2.toArray( axesHelper.geometry.attributes.color.array, 6 );
	color2.toArray( axesHelper.geometry.attributes.color.array, 9 );
	color3.toArray( axesHelper.geometry.attributes.color.array, 12 );
	color3.toArray( axesHelper.geometry.attributes.color.array, 15 );
	this.add( axesHelper );

	var posXAxisHelper = new THREE.Sprite( getAxisMaterial( color1, 'X' ) );
	var posYAxisHelper = new THREE.Sprite( getAxisMaterial( color2, 'Y' ) );
	var posZAxisHelper = new THREE.Sprite( getAxisMaterial( color3, 'Z' ) );
	var negXAxisHelper = new THREE.Sprite( getAxisMaterial( color1 ) );
	var negYAxisHelper = new THREE.Sprite( getAxisMaterial( color2 ) );
	var negZAxisHelper = new THREE.Sprite( getAxisMaterial( color3 ) );

	posXAxisHelper.position.x = 1;
	posYAxisHelper.position.y = 1;
	posZAxisHelper.position.z = 1;
	negXAxisHelper.position.x = - 1;
	negXAxisHelper.scale.setScalar( 0.8 );
	negYAxisHelper.position.y = - 1;
	negYAxisHelper.scale.setScalar( 0.8 );
	negZAxisHelper.position.z = - 1;
	negZAxisHelper.scale.setScalar( 0.8 );

	axesHelper.add( posXAxisHelper );
	axesHelper.add( posYAxisHelper );
	axesHelper.add( posZAxisHelper );
	axesHelper.add( negXAxisHelper );
	axesHelper.add( negYAxisHelper );
	axesHelper.add( negZAxisHelper );

	var point = new THREE.Vector3();
	var dim = 128;

	this.render = function ( renderer, editorCamera, container ) {

		this.quaternion.copy( editorCamera.quaternion ).inverse();
		this.updateMatrixWorld();

		point.set( 0, 0, 1 );
		point.applyQuaternion( editorCamera.quaternion );

		if ( point.x >= 0 ) {

			posXAxisHelper.material.opacity = 1;
			negXAxisHelper.material.opacity = 0.5;

		} else {

			posXAxisHelper.material.opacity = 0.5;
			negXAxisHelper.material.opacity = 1;

		}

		if ( point.y >= 0 ) {

			posYAxisHelper.material.opacity = 1;
			negYAxisHelper.material.opacity = 0.5;

		} else {

			posYAxisHelper.material.opacity = 0.5;
			negYAxisHelper.material.opacity = 1;

		}

		if ( point.z >= 0 ) {

			posZAxisHelper.material.opacity = 1;
			negZAxisHelper.material.opacity = 0.5;

		} else {

			posZAxisHelper.material.opacity = 0.5;
			negZAxisHelper.material.opacity = 1;

		}

		//

		var x = container.dom.offsetWidth - dim;

		renderer.clearDepth();
		renderer.setViewport( x, 0, dim, dim );
		renderer.render( this, camera );

	};

	function getAxisMaterial( color, text = null ) {

		var canvas = document.createElement( 'canvas' );
		canvas.width = 64;
		canvas.height = 64;

		var context = canvas.getContext( '2d' );
		context.beginPath();
		context.arc( 32, 32, 16, 0, 2 * Math.PI );
		context.closePath();
		context.fillStyle = color.getStyle();
		context.fill();

		if ( text !== null ) {

			context.font = '24px Arial';
			context.textAlign = 'center';
			context.fillStyle = '#000000';
			context.fillText( text, 32, 41 );

		}

		return new THREE.SpriteMaterial( {
			map: new THREE.CanvasTexture( canvas ),
			toneMapped: false
		} );

	}

}

ViewHelper.prototype = Object.assign( Object.create( THREE.Object3D.prototype ), {

	constructor: ViewHelper,

	isViewHelper: true

} );

export { ViewHelper };
