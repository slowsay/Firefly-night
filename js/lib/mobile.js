/**
 * @author slowsay
 */
var container, stats, camera, scene, renderer, material = [], mx = 0, my = 0, tmx = 0, tmy = 0, wid = 0, hei = 0, floormap, target3d, initmx, initmy, flag = false, obj3dclone, lightbox, directionalLight, arealight;
var mcan3d = {
	lastime : 0,
	lastfpsupdate : 0,
	lastimeupdate : 0,
	objarr : [],
	lightarr : [],
	init : function() {
		wid = $(window).width(), hei = $(window).height();
		container = document.createElement('div');
		container.setAttribute('id', 'container');
		document.body.appendChild(container);
		stats = document.createElement('div');
		document.body.appendChild(stats);
		stats.setAttribute('id', 'stats');
		stats.style.position = 'absolute';
		//init
		renderer = new THREE.CSS3DRenderer();
		renderer.setSize(wid, hei);
		camera = new THREE.PerspectiveCamera(60, wid / hei, 1, 1000);
		//scene
		scene = new THREE.Scene();
		renderer.domElement.style.position = 'absolute', renderer.domElement.style.top = 0;
		container.appendChild(renderer.domElement);

		target3d = new THREE.Object3D();
		scene.add(target3d);
		// material
		material = [{
			url : 'images/castle/px.jpg',
			pos : [-512 / 2, 0, 0],
			ro : [0, Math.PI / 2, 0]
		}, {
			url : 'images/castle/nx.jpg',
			pos : [512 / 2, 0, 0],
			ro : [0, -Math.PI / 2, 0]
		}, {
			url : 'images/castle/py.jpg',
			pos : [0, 512 / 2, 0],
			ro : [Math.PI / 2, 0, Math.PI]
		}, {
			url : 'images/castle/ny.jpg',
			pos : [0, -512 / 2, 0],
			ro : [-Math.PI / 2, 0, Math.PI]
		}, {
			url : 'images/castle/pz.jpg',
			pos : [0, 0, 512 / 2],
			ro : [0, Math.PI, 0]
		}, {
			url : 'images/castle/nz.jpg',
			pos : [0, 0, -512 / 2],
			ro : [0, 0, 0]
		}];
		var cube = new THREE.Object3D();
		scene.add(cube);
		for (var i = 0, j = material.length; i < j; i++) {
			var img = document.createElement('img');
			img.src = material[i].url;
			var obj = new THREE.CSS3DObject(img);
			obj.position.fromArray(material[i].pos);
			obj.rotation.fromArray(material[i].ro);
			cube.add(obj);
		};
		var pic = document.createElement('img');
		pic.addEventListener('load', function(e) {
			for (var i = 0, j = 100; i < j; i++) {
				var plane = new THREE.CSS3DSprite(pic.cloneNode());
				plane.position.set(Math.random() * 512 - 100, Math.abs(Math.random() * 512 - 100), Math.random() * 512 - 100);
				var scale = .1;
				plane.scale.set(scale, scale, scale);
				scene.add(plane);
				mcan3d.objarr.push(plane);
			};

		}, !1);
		pic.src = 'images/light.png';
		// mcan3d.createLight();
		//start
		mcan3d.addListener();
		mcan3d.update();
		mcan3d.Size();
	},
	createLight : function() {
		var cube = new THREE.Object3D();
		scene.add(cube);
		for (var i = 0; i < material.length; i++) {
			var img = document.createElement('img');
			img.src = 'images/nbg.png';
			var obj = new THREE.CSS3DObject(img);
			obj.position.fromArray(material[i].pos);
			obj.rotation.fromArray(material[i].ro);
			cube.add(obj);
		};
		var _scale = .1;
		cube.scale.set(_scale, _scale, _scale);

	},
	mouseHandle : function(e) {
		// $('#stats').html(e.type + '>>' + e.screenX + '>>' + e.clientX + '>>' + e.pageX + '>>');
		e.preventDefault();
		switch(e.type) {
		case 'mouseup':
			flag = !1;
			break;
		case 'mousedown':
			flag = !0;
			break;
		case 'mouseout':
			// flag = !1;

			break;
		case 'mousemove':
			if (flag) {
				initmx = e.movementX || e.mozMovementX || e.webkitMovementX || 0, initmy = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
				mx -= initmx * .1, my += initmy * .1;
			}
			break;
		case 'touchend':
			flag = !1;
			break;
		case 'touchstart':
			flag = !0;
			tmx = e.touches[0].clientX, tmy = e.touches[0].clientY;
			break;
		case 'touchmove':
			if (flag) {
				initmx = e.touches[0].clientX - tmx, initmy = e.touches[0].clientY - tmy;
				mx -= initmx * .1, my += initmy * .1;
				tmx = e.touches[0].clientX, tmy = e.touches[0].clientY;

			}
			break;
		}

	},
	update : function() {
		requestRender(mcan3d.update);
		mcan3d.render();
	},
	addListener : function() {
		window.addEventListener('resize', mcan3d.Size, !1);
		document.addEventListener('mouseup', mcan3d.mouseHandle, !1);
		document.addEventListener('mousedown', mcan3d.mouseHandle, !1);
		document.addEventListener('mousemove', mcan3d.mouseHandle, !1);
		document.addEventListener('mouseout', mcan3d.mouseHandle, !1);
		document.addEventListener('touchstart', mcan3d.mouseHandle, !1);
		document.addEventListener('touchend', mcan3d.mouseHandle, !1);
		document.addEventListener('touchmove', mcan3d.mouseHandle, !1);
	},
	render : function() {
		var timer = new Date() / 1000;
		my = Math.max(-90, Math.min(90, my));
		timer = THREE.Math.degToRad(90 - my);
		// mx += .1;
		camera.position.x = Math.sin(timer) * Math.cos(THREE.Math.degToRad(mx));
		camera.position.y = Math.cos(timer);
		camera.position.z = Math.sin(timer) * Math.sin(THREE.Math.degToRad(mx));
		target3d.position.x=camera.position.x;
		target3d.position.y=camera.position.y;
		target3d.position.z=camera.position.z;
		camera.lookAt(scene.position);
		renderer.render(scene, camera);
		mcan3d.fpsUpdate();
		mcan3d.lightUpdate();
	},
	lightUpdate : function() {
		for (var i = 0, j = mcan3d.objarr.length; i < j; i++) {
			var obj = mcan3d.objarr[i];
			var targety = obj.position.y;
			if (targety > 512 / 2)
				targety = 0;
			else
				targety += .1;
			obj.position.y = targety;
		}
	},
	fpsUpdate : function() {
		var _now = +new Date();
		var _fps = 1000 / (_now - this.lastime);
		this.lastime = _now;
		if ((+new Date - this.lastimeupdate) > 1000)
			this.lastimeupdate = +new Date, $('#stats').html(_fps.toFixed() + 'fps<br/>'+target3d.position.x);

	},
	Size : function() {
		wid = $(window).width(), hei = $(window).height();
		camera.aspect = wid / hei;
		camera.updateProjectionMatrix();
		renderer.setSize(wid, hei);
	}
};
