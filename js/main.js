/**
 * @author slowsay
 */

$(function() {
	Fileloader.load(alljs, function(e) {
		Fileloader.loadimg(allpng, function(e) {
			mcan3d.init();
			// Comm.checkMobileTools() ? mcan3d.init() : can3d.init();
		});
	});

});
