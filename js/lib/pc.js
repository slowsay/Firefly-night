/**
 * @author slowsay
 */
var container, stats, camera, scene, renderer, mx = 0, my = 0, wid = 0, hei = 0, floormap, target3d, initmx, initmy, flag = false, obj3dclone, lightbox, directionalLight, arealight;
var can3d = {
	init : function() {
		wid = $(window).width(), hei = $(window).height();
		// create div
		container = document.createElement('div');
		document.body.appendChild(container);
		// change render
		renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer() : new THREE.CanvasRenderer();
		container.appendChild(renderer.domElement);
		//stats
		stats = new Stats();
		stats.domElement.style.position = 'absolute', stats.domElement.style.top = '0px';
		container.appendChild(stats.domElement);
		/*@method camera
		 * @property aspect 纵横比例
		 */
		camera = new THREE.PerspectiveCamera(45, wid / hei, 1, 1000);
		scene = new THREE.Scene();
		// light
		lightbox = new THREE.Object3D();
		floormap = new THREE.Plane();
		//target
		target3d = new THREE.Object3D();

		//material,obj
		var material = [new THREE.MeshBasicMaterial({
			color : 0xff0000
		}), new THREE.MeshLambertMaterial({
			color : 0xffffff
		})];
		var obj3d = [new THREE.SphereGeometry(5, 10, 10), new THREE.PlaneGeometry(10, 10, 10, 10)];
		var light = new THREE.PointLight(0x00ffff, 1, 1000);
		var _sphere = new THREE.Object3D();
		var _mesh = new THREE.Mesh(obj3d[0], material[0]);
		// _sphere.add(_mesh);
		directionalLight = new THREE.DirectionalLight(0xffffff);
		lightbox.add(_sphere);
		lightbox.add(light);
		lightbox.add(directionalLight);
		// lightbox.position.set(0, 500, 500);
		scene.add(lightbox);
		scene.add(target3d);
		target3d.position.set(10, 10, 0);
		// texture
		var manager = new THREE.LoadingManager();
		manager.onProgress = function(item, loaded, total) {
			console.log(item, loaded, total);
		};
		var txture = new THREE.Texture();
		// objloader
		var imgloader = new THREE.ImageLoader(manager);
		imgloader.load('images/light.jpg', function(e) {
			txture.image = e;
			txture.needsUpdate = true;

		});
		var loader = new THREE.OBJLoader(manager);
		loader.load('images/male02.obj', function(e) {
			e.traverse(function(e) {
				if ( e instanceof THREE.Mesh) {
					// e.material.map = txture;
					obj3dclone = e;
					can3d.cloneObject();
				}
			});
		});

		//listener
		can3d.addListener();
		//size
		can3d.Size();
		// start
		can3d.update();
	},
	cloneObject : function() {
		for (var i = 0, j = 10; i < j; i++) {
			var obj = obj3dclone.clone();
			obj.position.x = Math.sin(i) * 500 + Math.random(200);
			obj.position.z = Math.cos(i) * 500 + Math.random(200);
			scene.add(obj);
		};
	},
	update : function() {
		requestRender(can3d.update);
		can3d.render();
		stats.update();
	},
	addListener : function() {
		window.addEventListener('resize', can3d.Size, !1);
		document.addEventListener('mouseup', can3d.moveHandle, !1);
		document.addEventListener('mousedown', can3d.moveHandle, !1);
		document.addEventListener('mousemove', can3d.moveHandle, !1);
		$(window).on('mousewheel', can3d.wheelHandle, !1);
	},
	wheelHandle : function(e, delta) {
		camera.fov -= delta * .005;
	},
	moveHandle : function(e) {
		e.preventDefault();
		switch(e.type) {
		case 'mouseup':
			// console.log('mouseup');
			flag = false;
			break;
		case 'mousedown':
			// console.log('mousedown');
			flag = true;
			break;
		case 'mousemove':
			// console.log('mousemove');
			if (flag) {
				initmx = e.movementX || e.mozMovementX || e.webkitMovementX || 0, initmy = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
				mx -= initmx * .1, my += initmy * .1;
			}
			break;
		}

	},
	render : function() {
		var timer = new Date() / 1000;
		my = Math.max(-90, Math.min(90, my));
		timer = THREE.Math.degToRad(90 - my);

		// camera.position.z = Math.cos(timer) * 1000;
		// camera.position.x = Math.sin(timer) * 1000;
		target3d.position.x = Math.sin(timer) * Math.cos(THREE.Math.degToRad(mx));
		target3d.position.z = Math.sin(timer) * Math.sin(THREE.Math.degToRad(mx));
		target3d.position.y = Math.cos(timer);
		//scene当前是第一视角
		camera.lookAt(target3d.position);
		renderer.render(scene, camera);
	},
	Size : function() {
		wid = $(window).width(), hei = $(window).height();
		camera.aspect = wid / hei;
		camera.updateProjectionMatrix();
		renderer.setSize(wid, hei);
	}
};
