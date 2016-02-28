/**
 * @author slowsay
 */
var fileloadprogess = 0;
var Fileloader = {
	load : function(data, fun) {
		var i = 0;
		var result = [];
		loader(data, i, fun, result);
		function loader(data, i, fun, result) {
			if (data.length > 0) {
				Fileloader.loadPage(data[i].path, function(e) {
					result[i] = data[i];
					if (i < data.length - 1) {
						i++, fileloadprogess = i, loader(data, i, fun, result);
					} else {
						fun(result);
					}
				});
			}
		};
	},
	getprogess : function() {
		return fileloadprogess;
	},
	loadimg : function(data, fun) {
		var i = 0;
		var result = [];
		loader(data, i, fun, result);
		function loader(data, i, fun, result) {
			if (data.length > 0) {
				Fileloader.loadIMG(data[i].path, function(e) {
					result[i] = data[i];
					if (i < data.length - 1) {
						i++, fileloadprogess = i, loader(data, i, fun, result);

					} else {
						fun(result);
					}
				});
			}
		};
	},
	loadIMG : function(path, fun) {
		var _img = new Image();
		_img.onload = fun;
		_img.src = path;
	},
	loadPage : function(path, fun) {
		$.ajax({
			url : path,
			dataType : 'script',
			cache : true,
			success : fun
		});
	}
};
