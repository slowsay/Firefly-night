/**
 * @author slowsay
 */
var Comm = {
	fixedlayer : function(obj, _w, _h, _left, _top) {
		$(obj).css({
			width : _w,
			height : _h,
			left : _left,
			top : _top
		});

	},
	getAwardsName : function(id) {
		var _obj;
		for (var j = 0; j < awardname.length; j++) {
			if (id == awardname[j].id) {
				_obj = awardname[j].name;
				break;
			}

		}
		return _obj;
	},
	pushImage : function(_arr) {
		var arr = [];
		for (var i = 0; i < _arr.length; i++) {
			arr.push(PIXI.Texture.fromImage(_arr[i]));
		};
		return arr;
	},
	imageLoader : function(arr, complete, progress) {
		var loader = new PIXI.AssetLoader(arr, false);
		loader.onComplete = complete;
		loader.onProgress = progress;
		loader.load();
	},
	buttonmode : function(_obj, flag) {
		_obj.buttonMode = flag, _obj.interactive = flag;
	},
	click : function(n, fun) {
		$(n).on('click', fun);
	},
	remove : function(n) {
		$(n).off();
	},
	movelayer : function(obj) {
		$(obj).css({
			left : $(document).scrollLeft() + _wid / 2,
			top : $(document).scrollTop() + _hei / 2
		});
	},
	clearObject : function(obj) {
		while (obj.children.length) {
			obj.removeChildAt(0);
		}
	},
	createGrapic : function(_color, _w, _h, _hitarea) {
		var mc = new PIXI.Graphics;
		with (mc) {
			beginFill(_color);
			drawRect(0, 0, _w, _h);
			endFill();
		}
		return mc;
	},
	drawRect : function(mc, _color, _alpha, _x, _y, _w, _h, _hitarea) {
		with (mc) {
			clear();
			beginFill(_color, _alpha);
			drawRect(_x, _y, _w, _h);
			endFill();
		}
	},
	wheel : function(n, fun) {
		$(n).on('mousewheel', fun);
	},
	mDown : function(n, fun) {
		$(n).on('mousedown', fun);
	},
	mUp : function(n, fun) {
		$(n).on('mouseup', fun);
	},
	focusIn : function(n, fun) {
		$(n).on('focusin', fun);

	},
	focusOut : function(n, fun) {
		$(n).on('focusout', fun);
	},
	mMove : function(n, fun) {
		$(n).on('mousemove', fun);
	},
	mouseOO : function(n, obj) {
		$(n).on('mouseover', function(e) {
			$(this).addClass(obj);
		});
		$(n).on('mouseout', function(e) {
			$(this).removeClass(obj);
		});
	},
	mouseOverOut : function(n, obj, obj2) {
		$(n).on('mouseover', function(e) {
			$(this).css(obj);
		});
		$(n).on('mouseout', function(e) {
			$(this).css(obj2);
		});
	},
	mouseOverOutTw : function(n) {
		$(n).on('mouseover', function(e) {
			Comm.Tw($(this), speeds, {
				alpha : 1
			});
		});

		$(n).on('mouseout', function(e) {
			Comm.Tw($(this), speeds, {
				alpha : 0
			});
		});
	},
	mouseOverOutList : function(n, n1, n2) {

		$(n).find(n1).on('mouseover', function(e) {
			var id = $(this).index();
			for (var i = 0; i < $(n).find(n1).length; i++) {
				if (id == i) {
					Comm.Tw($(n).find(n1).eq(id).find(n2), speeds, {
						alpha : 1
					});
				} else {
					Comm.Tw($(n).find(n1).eq(i).find(n2), speeds, {
						alpha : 0
					});
				}
			};

		});
		$(n).on('mouseout', function(e) {
			for (var i = 0; i < $(n).find(n1).length; i++) {
				Comm.Tw($(n).find(n1).eq(i).find(n2), speeds, {
					alpha : 0
				});
			}

		});

	},
	Tw : function(n, s, obj) {
		TweenMax.to(n, s, obj);
	},
	isNumonly : function(obj) {
		return /\d+/.test(obj);
	},
	searchAwardName : function(id) {
		for (var i = 0; i < awardname.length; i++) {
			if (id == awardname[i].id) {
				var s = awardname[i].name;
				break;
			}
		};
		return s;
	},
	snshare : function(obj) {
		if (obj.kind == 'qq') {
			window.open('http://v.t.qq.com/share/share.php?url=' + obj.url + '&title=' + obj.con + '&pic=' + obj.path);
		} else if (obj.kind == 'sina') {
			window.open('http://v.t.sina.com.cn/share/share.php?url=' + obj.url + '&title=' + obj.con + '&pic=' + obj.path);
		} else if (obj.kind == 'ren') {
			window.open('http://widget.renren.com/dialog/share?resourceUrl=' + obj.url + '&srcUrl=' + obj.url + '&title=' + obj.title + '&charset=UTF-8&description=' + obj.con + '&images=' + obj.path);
		} else if (obj.kind == 'happy') {
			window.open('http://www.kaixin001.com/repaste/share.php?rtitle=' + obj.con + ' &rurl=' + obj.url + '&pic=' + obj.path);
		}
	},
	trackQQ : function(v) {//qq
		$.ajax({
			url : v,
			cache : false,
			type : 'GET'
		});
	},
	tracking : function(page, v) {//sina
		setTimeout(function() {
			SUDA.click(v);
		}, 500);

	},
	trackevent : function(_send, _event, _Category, _Action, _Label, _Value) {//miaozhen&&GA
		if (_Category == 'homepage') {
		} else
			window._CiQ10279.push(['_trackEvent', {
				type : 2,
				labels : [{
					'按钮名称' : _Category
				}],
				values : [{
					'数量' : 1
				}]
			}]);
		// window.CClickiV3 && window.CClickiV3[10279] && window.CClickiV3[10279]._flushObserver(function() {
		// });
		// _gaq.push(['_trackEvent', page, v]);
		ga(_send, _event, _Category, _Action, _Label, _Value);
	},
	trackpage : function(page, v) {//miaozhen&&GA,page
		window._CiQ10279.push(['_trackPageView', {
			"urlPath" : page,
			"pageTitle" : v
		}]);
		_gaq.push(['_trackPageview', v]);
	},
	scrollAction : function(obj) {

		if (obj.targety < obj.inity) {
			obj.targety = obj.inity;
		}

		if (obj.targety > $(obj.barbg).height() - $(obj.bar).height()) {
			obj.targety = $(obj.barbg).height() - $(obj.bar).height();
		}

		$(obj.bar).css({
			top : obj.targety
		});
		Comm.Tw(obj.con, obj.speed, {
			top : obj.start - Math.ceil((obj.conH - obj.setmaskH) * (obj.targety / ($(obj.barbg).height() - $(obj.bar).height())))
		});
	},
	scrollMobile : function(obj) {
		Comm.Tw(obj.bar, obj.speed, {
			top : 0 - Math.ceil((obj.targety - obj.start) * (obj.barbgH - obj.barh) / (obj.conH - obj.setmaskH))
		});
	},
	checkMobileTools : function() {

		var ua = navigator.userAgent;
		if (/AppleWebKit.*Mobile/i.test(ua) || (/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/.test(ua))) {

			if (window.location.href.indexOf("?mobile") < 0) {

				if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(ua)) {
					// $('.mesbox').html('Android|webOS|iPhone|iPod|BlackBerry');

				} else if (/iPad/i.test(ua)) {
					// $('.mesbox').html('ipad');

				} else {
					// $('.mesbox').html('other');
				}
			}
			return true;

		} else {
			// $('.mesbox').html('pc');
			return false;
		}
	}
};
