/**
 * @author slowsay
 */
var _lastime = 0, _txt, _frame, lastFpsUpdateTime = 0, lastFpsUpdate = 0;
var Timefps = {
	init : function() {
		window.requestRender(Timefps.animate);
	},
	calculateFps : function() {
		var _now = +new Date();
		var fps = 1000 / (_now - _lastime);
		_lastime = _now;
		return fps;
	},
	animate : function(time) {
		var fps = 0;
		if (time == 'undefinded')
			time = +new Date();
		fps = Timefps.calculateFps();
		if (time - lastFpsUpdateTime > 1000) {
			lastFpsUpdateTime = time;
			lastFpsUpdate = fps;
		}
		_txt = '  ' + lastFpsUpdate.toFixed() + 'fps';
		// _frame.setText('  ' + Timefps.calculateFps().toFixed() + 'fps');
		window.requestRender(Timefps.animate);
	},
	getText : function() {
		return _txt;
	}
};
