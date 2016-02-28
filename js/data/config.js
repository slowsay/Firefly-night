/**
 * @author slowsay
 */
var _wid = 0, _hei = 0, speeds = .7, _scale, _render, _stage, scene, _loaderw = 200, _loaderh = 2, fileloadprogess = 0, progresslen = 0;
var allpng = [{
	name : '',
	path : 'images/castle/nx.jpg'
}, {
	name : '',
	path : 'images/castle/ny.jpg'
}, {
	name : '',
	path : 'images/castle/nz.jpg'
}, {
	name : '',
	path : 'images/castle/px.jpg'
}, {
	name : '',
	path : 'images/castle/py.jpg'
}, {
	name : '',
	path : 'images/castle/pz.jpg'
}];
var alljs = [{
	name : 'three',
	path : 'js/plugin/three.js'
}, {
	name : 'requestrender',
	path : 'js/state/requestrender.js'
}, {
	name : 'OBJLoader',
	path : 'js/plugin/OBJLoader.js'
}, {
	name : 'CSS3DRenderer',
	path : 'js/plugin/CSS3DRenderer.js'
}, {
	name : 'timeFPS',
	path : 'js/state/timeFPS.js'
}, {
	name : 'stats',
	path : 'js/plugin/stats.min.js'
}, {
	name : 'common',
	path : 'js/utils/common.js'
}, {
	name : 'common',
	path : 'js/lib/pc.js'
}, {
	name : 'common',
	path : 'js/lib/mobile.js'
}];
var setting = {
	url : ''
};
var api = {
	doGetUserInfo : '/User/doGetUserInfo',
};
