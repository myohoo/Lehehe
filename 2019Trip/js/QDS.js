mw.loader.implement("ext.QDas", function($, jQuery, require, module) {
	if(typeof mw.util.detectMobile === 'undefined') {
		mw.util.detectMobile = function() {
			var res, ua = navigator.userAgent.toLowerCase();
			var m = new RegExp('ipad|ipod|iphone|android');
			if((res = ua.match(m))) {
				return res[0];
			}
			m = new RegExp('opera mini|blackberry|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce; iemobile');
			if((res = ua.match(m))) {
				return res[0];
			}
			m = new RegExp('mmp|symbian|smartphone|midp|wap|vodafone|o2|pocket|kindle|mobile|psp|treo|kddi|phone|lg |sonyericsson|samsung|motorola|nokia');
			if((res = ua.match(m))) {
				return res[0];
			}
			return false;
		};
	}
	jQuery.getScript('http://s0.qhimg.com/static/32ea1a8972889917/monitor_analytic.js', function() {
		var siteName = mw.config.get('wgSiteGameTitle');
		var pageTitle = mw.config.get('wgPageName');
		monitor.setProject('QH_265_2').setUrl(siteName ? siteName : 'unknown').getTrack(null, {
			'page': pageTitle ? pageTitle : 'unknown'
		});
		var ismobile = mw.util.detectMobile() || window.location.host.substr(0, 2) == 'm.';
		monitor.setProject('QH_265_1#' + (ismobile ? '2' : '1')).setUrl(window.location.href).getTrack().getClickAndKeydown().getClickHeatmap(10, 1);
	});
});
mw.loader.implement("ext.QUser", function($, jQuery, require, module) {
	(function(win) {
		window.loginDiv = function() {
			$('#signIn').click();
		}
		if(!win.QHPass) {
			console.log('QHPass is not defined ReferenceError');
			return false;
		}
		var src = 'pcw_joyme',
			sso_url = "https://login.360.cn/?o=sso&m=info&func=?&show_name_flag=1&from=" + src;
		var opts = {
			src: src,
			charset: document.charset || document.defaultCharset || document.characterSet || "UTF-8",
			domainList: ['360.cn', '360.com'],
			supportHttps: ['360.com', '360.cn'],
			protocol: location.protocol.replace(":", ""),
			proxy: location.protocol + "//" + location.hostname + "/psp_jump.html",
			ignoreCookie: !0,
			headSize: '100_100',
			signIn: {
				types: ['normal'],
				panelTitle: '欢迎登录着迷网',
				thirdPart: {
					providers: ['sina', 'renren', 'tencent']
				}
			},
			signUp: {
				types: ['mobile'],
				panelTitle: '欢迎注册360帐号',
				hideUsername: !1,
				hideNickname: !1,
				hidePasswordAgain: !1
			}
		};
		if(!QHPass._isInit) {
			QHPass.init(opts);
		}
		if(typeof mw.util.detectMobile === 'undefined') {
			mw.util.detectMobile = function() {
				var res, ua = navigator.userAgent.toLowerCase();
				var m = new RegExp('ipad|ipod|iphone|android');
				if((res = ua.match(m))) {
					return res[0];
				}
				m = new RegExp(
					'opera mini|blackberry|palm|hiptop|avantgo|plucker|xiino|blazer|elaine|iris|3g_t|windows ce|opera mobi|windows ce; smartphone;|windows ce; iemobile');
				if((res = ua.match(m))) {
					return res[0];
				}
				m = new RegExp('mmp|symbian|smartphone|midp|wap|vodafone|o2|pocket|kindle|mobile|psp|treo|kddi|phone|lg |sonyericsson|samsung|motorola|nokia');
				if((res = ua.match(m))) {
					return res[0];
				}
				return false;
			};
		}
		var isMobile = mw.util.detectMobile();
		var myalert = function(msg, cb) {
			if(typeof mw.ugcwikiutil !== 'undefined' && typeof mw.ugcwikiutil.autoCloseDialog === 'function') {
				mw.ugcwikiutil.autoCloseDialog(msg);
				if(typeof cb === 'function') {
					mw.closeCallback = function(type) {
						mw.closeCallback = null;
						cb(type);
					};
				}
			} else {
				alert(msg);
			}
			console.log(msg);
		};
		var isSpecialPage = function() {
			return win.quser_page == 'SpecialPage:Userlogin' || win.quser_page == 'SpecialPage:Userlogout' || win.quser_page == 'SpecialPage:CreateAccount';
		};
		var myJump = function() {
			var returnto = mw.util.getParamValue('returnto') ? mw.util.getParamValue('returnto') : (mw.util.getParamValue(
				'returntoquery') ? mw.util.getParamValue('returntoquery') : '首页');
			if(isSpecialPage()) {
				win.location.href = returnto;
			} else {
				win.location.reload();
			}
		};
		var synLogin = function(data) {
			$.ajax({
				url: mediaWiki.util.wikiScript('api') + '?action=query&meta=tokens&type=login&format=json',
				dataType: 'json',
				type: 'GET',
				headers: {
					'Api-User-Agent': 'QUser/1.0'
				},
				success: function(res) {
					var token = res['query']['tokens']['logintoken'];
					if(!token) {
						console.log('get token failed');
						return false;
					}
					data.login_token = token;
					$.ajax({
						url: mediaWiki.util.wikiScript('api') + '?action=quserlogin&format=json',
						data: data,
						dataType: 'json',
						type: 'POST',
						headers: {
							'Api-User-Agent': 'QUser/1.0'
						},
						success: function(res) {
							if(res.error) {
								myalert(res.error.info);
								return;
							}
							myJump();
							return;
						}
					});
					return true;
				}
			});
		};
		var qlogout = function() {
			QHPass.signOut(function() {
				$.ajax({
					url: mediaWiki.util.wikiScript('api') + '?action=logout&format=json',
					dataType: 'json',
					type: 'get',
					headers: {
						'Api-User-Agent': 'QUser/1.0'
					},
					success: function(res) {
						myJump();
					}
				});
			});
		};
		var getName = function() {
			return win.mw.config.get('wgUserName');
		};
		var parseName = function(data) {
			if(!data || !data.qid) {
				return null;
			}
			return data.nickname ? data.nickname : ('360N' + data.qid);
		};
		var checkAndReg = function() {
			$.getJSON(sso_url, function(data) {
				if(!data || !data.qid || parseInt(data.qid, 10) === 0) {
					return false;
				}
				if(getName() && parseName(data) != getName()) {
					qlogout();
					return false;
				}
				synLogin(data);
				return true;
			});
		};
		var myDest = function(u) {
			return encodeURIComponent('http://u.360.cn/index/jump/?dest=' + encodeURIComponent(u));
		};
		var mySignup = function(u) {
			if(isMobile) {
				win.location.href = 'https://i.360.cn/reg/wap?src=' + src + '&destUrl=' + myDest(u ? u : win.location.href);
				return;
			}
			QHPass.signUp(function(res) {
				console.log(res);
				myJump();
			});
			return;
		};
		var mySignin = function(u) {
			if(isMobile) {
				win.location.href = 'https://i.360.cn/login/wap?src=' + src + '&destUrl=' + myDest(u ? u : win.location.href);
				return;
			}
			QHPass.signIn(function(uinfo) {
				myJump();
			});
			return;
		};
		var returnto = mw.util.getParamValue('returnto') ? mw.util.getParamValue('returnto') : (mw.util.getParamValue(
			'returntoquery') ? mw.util.getParamValue('returntoquery') : '首页');
		if(win.quser_page == 'SpecialPage:Userlogin') {
			if($('#userloginForm').length > 0) {
				$('#userloginForm').hide();
			}
			QHPass.when.signIn(function() {
				checkAndReg();
			});
		} else if(win.quser_page == 'SpecialPage:Userlogout') {
			QHPass.signOut(function() {
				myJump();
			});
			return false;
		} else if(win.quser_page == 'SpecialPage:CreateAccount') {
			mySignup(returnto);
		}
		if(!getName()) {
			$('#signIn, .signIn-btn').click(function() {
				QHPass.getUserInfo(false, function(userInfo) {
					if(getName() && parseName(userInfo) != getName()) {
						qlogout();
						return false;
					}
				}, function(error) {
					mySignin();
				});
			});
			$('#register, .register-btn').click(function() {
				mySignup();
			});
			checkAndReg();
		} else {
			$('#signout, .signout-btn').click(function(ev) {
				ev && ev.preventDefault();
				ev && ev.stopPropagation();
				qlogout();
				return false;
			});
			$('#username').click(function(ev) {
				ev && ev.preventDefault();
				ev && ev.stopPropagation();
				var uname = $('#username').data('uname');
				var home = isMobile ? 'https://i.360.cn/profile/index?show_index=1' :
					'https://i.360.cn/';
				if(/^360N\d+$/.test(uname)) {
					if(isMobile) {
						win.location.href = 'https://i.360.cn/profile/index?show_index=1&src=' + src;
						return false;
					}
					QHPass.setNickname(function(data) {
						if(data.oldValue != data.newValue) {
							win.mw.config.set('wgUserName', data.newValue);
							checkAndReg();
							return;
						}
						win.location.href = home;
						return;
					});
				} else {
					win.location.href = home;
				}
				return false;
			});
		}
		return true;
	})(window);
});
mw.loader.implement("ext.visualEditor.targetLoader", function($, jQuery, require, module) {
	(function() {
		var prefName, prefValue, conf = mw.config.get('wgVisualEditorConfig'),
			pluginCallbacks = [],
			modules = ['ext.visualEditor.mwcore', 'ext.visualEditor.mwlink', 'ext.visualEditor.mwformatting', 'ext.visualEditor.data', 'ext.visualEditor.mwtransclusion', 'ext.visualEditor.mwgallery', 'ext.visualEditor.mwalienextension', 'ext.visualEditor.language', 'ext.visualEditor.icons', 'ext.visualEditor.mytool'].concat(conf.pluginModules);
		if(conf.signatureNamespaces.length) {
			modules.push('ext.visualEditor.mwsignature');
		}
		for(prefName in conf.preferenceModules) {
			prefValue = mw.user.options.get(prefName);
			if(prefValue && prefValue !== '0') {
				modules.push(conf.preferenceModules[prefName]);
			}
		}
		mw.libs.ve = mw.libs.ve || {};
		mw.libs.ve.targetLoader = {
			addPlugin: function(plugin) {
				if(typeof plugin === 'string') {
					modules.push(plugin);
				} else if($.isFunction(plugin)) {
					pluginCallbacks.push(plugin);
				}
			},
			loadModules: function() {
				ve.track('trace.moduleLoad.enter');
				return mw.loader.using(modules).then(function() {
					ve.track('trace.moduleLoad.exit');
					pluginCallbacks.push(ve.init.platform.getInitializedPromise.bind(ve.init.platform));
					return $.when.apply($, pluginCallbacks.map(function(callback) {
						return callback();
					}));
				});
			},
			requestPageData: function(pageName, oldid, targetName, modified) {
				var start, apiXhr, restbaseXhr, apiPromise, restbasePromise, dataPromise, pageHtmlUrl, switched = !1,
					fromEditedState = !1,
					data = {
						action: 'visualeditor',
						paction: (conf.fullRestbaseUrl || conf.restbaseUrl) ? 'metadata' : 'parse',
						page: pageName,
						uselang: mw.config.get('wgUserLanguage')
					};
				if(oldid !== undefined) {
					data.oldid = oldid;
				}
				start = ve.now();
				ve.track('trace.apiLoad.enter');
				apiXhr = new mw.Api().get(data);
				apiPromise = apiXhr.then(function(data, jqxhr) {
					ve.track('trace.apiLoad.exit');
					ve.track('mwtiming.performance.system.apiLoad', {
						bytes: $.byteLength(jqxhr.responseText),
						duration: ve.now() - start,
						cacheHit: /hit/i.test(jqxhr.getResponseHeader('X-Cache')),
						targetName: targetName
					});
					return data;
				});
				if(conf.fullRestbaseUrl || conf.restbaseUrl) {
					ve.track('trace.restbaseLoad.enter');
					if(conf.fullRestbaseUrl && $('#wpTextbox1').val() && !$('[name=wpSection]').val()) {
						switched = !0;
						fromEditedState = modified;
						window.onbeforeunload = null;
						$(window).off('beforeunload');
						restbaseXhr = $.ajax({
							url: conf.fullRestbaseUrl + 'v1/transform/wikitext/to/html/' + encodeURIComponent(pageName) + (oldid === undefined ? '' : '/' + oldid),
							type: 'POST',
							data: {
								title: pageName,
								oldid: oldid,
								wikitext: $('#wpTextbox1').val(),
								stash: 'true'
							},
							headers: {
								Accept: 'text/html; charset=utf-8; profile="mediawiki.org/specs/html/1.2.0"'
							},
							dataType: 'text'
						});
					} else {
						if(conf.fullRestbaseUrl) {
							pageHtmlUrl = conf.fullRestbaseUrl + 'v1/page/html/';
						} else {
							pageHtmlUrl = conf.restbaseUrl;
						}
						restbaseXhr = $.ajax({
							url: pageHtmlUrl + encodeURIComponent(pageName) + (oldid === undefined ? '' : '/' + oldid) + '?redirect=false',
							type: 'GET',
							headers: {
								Accept: 'text/html; charset=utf-8; profile="mediawiki.org/specs/html/1.2.0"'
							},
							dataType: 'text'
						});
					}
					restbasePromise = restbaseXhr.then(function(data, status, jqxhr) {
						ve.track(
							'trace.restbaseLoad.exit');
						ve.track('mwtiming.performance.system.restbaseLoad', {
							bytes: $.byteLength(jqxhr.responseText),
							duration: ve.now() - start,
							targetName: targetName
						});
						return [data, jqxhr.getResponseHeader('etag')];
					}, function(response) {
						if(response.status === 404) {
							return $.Deferred().resolve(['', undefined]).promise();
						} else {
							window.alert(mw.msg('visualeditor-loaderror-message', 'HTTP ' + response.status));
							mw.log.warn('RESTBase load failed: ' + response.statusText);
						}
					});
					dataPromise = $.when(apiPromise, restbasePromise).then(function(apiData, restbaseData) {
						if(apiData.visualeditor) {
							apiData.visualeditor.content = restbaseData[0];
							apiData.visualeditor.etag = restbaseData[1];
							apiData.visualeditor.switched = switched;
							apiData.visualeditor.fromEditedState = fromEditedState;
						}
						return apiData;
					}).promise({
						abort: function() {
							apiXhr.abort();
							restbaseXhr.abort();
						}
					});
				} else {
					dataPromise = apiPromise.promise({
						abort: apiXhr.abort
					});
				}
				return dataPromise;
			}
		};
	}());
}, {}, {
	"visualeditor-loaderror-message": "\u4ece\u670d\u52a1\u5668\u52a0\u8f7d\u6570\u636e\u65f6\u51fa\u9519\uff1a$1\u3002",
	"visualeditor-loaderror-title": "\u7f16\u8f91\u5668\u65e0\u6cd5\u52a0\u8f7d"
});
mw.loader.implement("jquery.checkboxShiftClick", function($, jQuery, require, module) {
	(function($) {
		$.fn.checkboxShiftClick = function() {
			var prevCheckbox = null,
				$box = this;
			$box.click(function(e) {
				if(prevCheckbox !== null && e.shiftKey) {
					$box.slice(Math.min($box.index(prevCheckbox), $box.index(e.target)), Math.max($box.index(prevCheckbox), $box.index(e.target)) + 1).filter(function() {
						return !this.disabled;
					}).prop('checked', !!e.target.checked);
				}
				prevCheckbox = e.target;
			});
			return $box;
		};
	}(jQuery));
});
mw.loader.implement("jquery.getAttrs", function($, jQuery, require, module) {
	function serializeControls(controls) {
		var i, data = {},
			len = controls.length;
		for(i = 0; i < len; i++) {
			data[controls[i].name] = controls[i].value;
		}
		return data;
	}
	jQuery.fn.getAttrs = function() {
		return serializeControls(this[0].attributes);
	};
	jQuery.fn.serializeObject = function() {
		return serializeControls(this.serializeArray());
	};;
});
mw.loader.implement("jquery.highlightText", function($, jQuery, require, module) {
	(function($, mw) {
		$.highlightText = {
			splitAndHighlight: function(node, pat) {
				var i, patArray = pat.split(' ');
				for(i = 0; i < patArray.length; i++) {
					if(patArray[i].length === 0) {
						continue;
					}
					$.highlightText.innerHighlight(node, patArray[i]);
				}
				return node;
			},
			innerHighlight: function(node, pat) {
				var i, match, pos, spannode, middlebit, middleclone;
				if(node.nodeType === Node.TEXT_NODE) {
					match = node.data.match(new RegExp('(^|\\s)' + mw.RegExp.escape(pat), 'i'));
					if(match) {
						pos = match.index + match[1].length;
						spannode = document.createElement('span');
						spannode.className = 'highlight';
						middlebit = node.splitText(pos);
						middlebit.splitText(pat.length);
						middleclone = middlebit.cloneNode(true);
						spannode.appendChild(middleclone);
						middlebit.parentNode.replaceChild(spannode, middlebit);
					}
				} else if(node.nodeType === Node.ELEMENT_NODE && node.childNodes && !/(script|style)/i.test(node.tagName) && !(node.tagName.toLowerCase() === 'span' && node.className.match(/\bhighlight/))) {
					for(i = 0; i < node.childNodes
						.length; ++i) {
						$.highlightText.innerHighlight(node.childNodes[i], pat);
					}
				}
			}
		};
		$.fn.highlightText = function(matchString) {
			return this.each(function() {
				var $el = $(this);
				$el.data('highlightText', {
					originalText: $el.text()
				});
				$.highlightText.splitAndHighlight(this, matchString);
			});
		};
	}(jQuery, mediaWiki));
});
mw.loader.implement("jquery.makeCollapsible", function($, jQuery, require, module) {
	(function($, mw) {
		function toggleElement($collapsible, action, $defaultToggle, options) {
			var $collapsibleContent, $containers, hookCallback;
			options = options || {};
			if(!$collapsible.jquery) {
				return;
			}
			if(action !== 'expand' && action !== 'collapse') {
				return;
			}
			if($defaultToggle === undefined) {
				$defaultToggle = null;
			}
			if($defaultToggle !== null && !$defaultToggle.jquery) {
				return;
			}
			$collapsible.trigger(action === 'expand' ? 'beforeExpand.mw-collapsible' : 'beforeCollapse.mw-collapsible');
			hookCallback = function() {
				$collapsible.trigger(action === 'expand' ? 'afterExpand.mw-collapsible' : 'afterCollapse.mw-collapsible');
			};
			if(!options.plainMode && $collapsible.is('table')) {
				if($collapsible.find('> caption').length) {
					$containers = $collapsible.find('> * > tr');
				} else {
					$containers = $collapsible.find('> tbody > tr');
				}
				if($defaultToggle) {
					$containers = $containers.not($defaultToggle.closest('tr'));
				}
				if(action === 'collapse') {
					if(options.instantHide) {
						$containers.hide();
						hookCallback();
					} else {
						$containers.stop(true, true).fadeOut().promise().done(hookCallback);
					}
				} else {
					$containers.stop(true, true).fadeIn().promise().done(hookCallback);
				}
			} else if(!options.plainMode && ($collapsible.is('ul') || $collapsible.is('ol'))) {
				$containers = $collapsible.find('> li');
				if($defaultToggle) {
					$containers = $containers.not($defaultToggle.parent());
				}
				if(action === 'collapse') {
					if(options.instantHide) {
						$containers.hide();
						hookCallback();
					} else {
						$containers.stop(true, true).slideUp().promise().done(hookCallback);
					}
				} else {
					$containers.stop(true, true).slideDown().promise().done(hookCallback);
				}
			} else {
				$collapsibleContent = $collapsible.find('> .mw-collapsible-content');
				if(!options.plainMode && $collapsibleContent.length) {
					if(action === 'collapse') {
						if(options.instantHide) {
							$collapsibleContent.hide();
							hookCallback();
						} else {
							$collapsibleContent.slideUp().promise().done(hookCallback);
						}
					} else {
						$collapsibleContent.slideDown().promise().done(hookCallback);
					}
				} else {
					if(action === 'collapse') {
						if(options.instantHide) {
							$collapsible.hide();
							hookCallback
								();
						} else {
							if($collapsible.is('tr') || $collapsible.is('td') || $collapsible.is('th')) {
								$collapsible.fadeOut().promise().done(hookCallback);
							} else {
								$collapsible.slideUp().promise().done(hookCallback);
							}
						}
					} else {
						if($collapsible.is('tr') || $collapsible.is('td') || $collapsible.is('th')) {
							$collapsible.fadeIn().promise().done(hookCallback);
						} else {
							$collapsible.slideDown().promise().done(hookCallback);
						}
					}
				}
			}
		}

		function togglingHandler($toggle, $collapsible, e, options) {
			var wasCollapsed, $textContainer, collapseText, expandText;
			options = options || {};
			if(e) {
				if(e.type === 'click' && options.linksPassthru && $.nodeName(e.target, 'a') && $(e.target).attr('href') && $(e.target).attr('href') !== '#') {
					return;
				} else if(e.type === 'keypress' && e.which !== 13 && e.which !== 32) {
					return;
				} else {
					e.preventDefault();
					e.stopPropagation();
				}
			}
			if(options.wasCollapsed !== undefined) {
				wasCollapsed = options.wasCollapsed;
			} else {
				wasCollapsed = $collapsible.hasClass('mw-collapsed');
			}
			$collapsible.toggleClass('mw-collapsed', !wasCollapsed);
			if(options.toggleClasses) {
				$toggle.
				toggleClass('mw-collapsible-toggle-collapsed', !wasCollapsed).toggleClass('mw-collapsible-toggle-expanded', wasCollapsed);
			}
			if(options.toggleText) {
				collapseText = options.toggleText.collapseText;
				expandText = options.toggleText.expandText;
				$textContainer = $toggle.find('> a');
				if(!$textContainer.length) {
					$textContainer = $toggle;
				}
				$textContainer.text(wasCollapsed ? collapseText : expandText);
			}
			toggleElement($collapsible, wasCollapsed ? 'expand' : 'collapse', $toggle, options);
		}
		$.fn.makeCollapsible = function(options) {
			options = options || {};
			this.each(function() {
				var $collapsible, collapseText, expandText, $caption, $toggle, actionHandler, buildDefaultToggleLink, premadeToggleHandler, $toggleLink, $firstItem, collapsibleId, $customTogglers, firstval;
				$collapsible = $(this).addClass('mw-collapsible');
				if($collapsible.data('mw-made-collapsible')) {
					return;
				} else {
					$collapsible.data('mw-made-collapsible', true);
				}
				collapseText = options.collapseText || $collapsible.attr('data-collapsetext') || mw.msg('collapsible-collapse');
				expandText = options.expandText ||
					$collapsible.attr('data-expandtext') || mw.msg('collapsible-expand');
				actionHandler = function(e, opts) {
					var defaultOpts = {
						toggleClasses: !0,
						toggleText: {
							collapseText: collapseText,
							expandText: expandText
						}
					};
					opts = $.extend(defaultOpts, options, opts);
					togglingHandler($(this), $collapsible, e, opts);
				};
				buildDefaultToggleLink = function() {
					return $('<a href="#"></a>').text(collapseText).wrap('<span class="mw-collapsible-toggle"></span>').parent().prepend('<span class="mw-collapsible-bracket">[</span>').append('<span class="mw-collapsible-bracket">]</span>').on('click.mw-collapsible keypress.mw-collapsible', actionHandler);
				};
				premadeToggleHandler = function(e, opts) {
					var defaultOpts = {
						toggleClasses: !0,
						linksPassthru: !0
					};
					opts = $.extend(defaultOpts, options, opts);
					togglingHandler($(this), $collapsible, e, opts);
				};
				if(options.$customTogglers) {
					$customTogglers = $(options.$customTogglers);
				} else {
					collapsibleId = $collapsible.attr('id') || '';
					if(collapsibleId.indexOf('mw-customcollapsible-') === 0) {
						$customTogglers = $('.' + collapsibleId.replace('mw-customcollapsible', 'mw-customtoggle')).addClass('mw-customtoggle');
					}
				}
				if($customTogglers && $customTogglers.length) {
					actionHandler = function(e, opts) {
						var defaultOpts = {};
						opts = $.extend(defaultOpts, options, opts);
						togglingHandler($(this), $collapsible, e, opts);
					};
					$toggleLink = $customTogglers.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0);
				} else {
					if($collapsible.is('table')) {
						$caption = $collapsible.find('> caption');
						if($caption.length) {
							$toggle = $caption.find('> .mw-collapsible-toggle');
							if(!$toggle.length) {
								$toggleLink = buildDefaultToggleLink().appendTo($caption);
							} else {
								actionHandler = premadeToggleHandler;
								$toggleLink = $toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0);
							}
						} else {
							$firstItem = $collapsible.find('tr:first th, tr:first td');
							$toggle = $firstItem.find('> .mw-collapsible-toggle');
							if(!$toggle.length) {
								$toggleLink = buildDefaultToggleLink().prependTo($firstItem.eq(-1));
							} else {
								actionHandler = premadeToggleHandler;
								$toggleLink =
									$toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0);
							}
						}
					} else if($collapsible.is('ul') || $collapsible.is('ol')) {
						$firstItem = $collapsible.find('li:first');
						$toggle = $firstItem.find('> .mw-collapsible-toggle');
						if(!$toggle.length) {
							firstval = $firstItem.prop('value');
							if(firstval === undefined || !firstval || firstval === '-1' || firstval === -1) {
								$firstItem.prop('value', '1');
							}
							$toggleLink = buildDefaultToggleLink();
							$toggleLink.wrap('<li class="mw-collapsible-toggle-li"></li>').parent().prependTo($collapsible);
						} else {
							actionHandler = premadeToggleHandler;
							$toggleLink = $toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0);
						}
					} else {
						$toggle = $collapsible.find('> .mw-collapsible-toggle');
						if(!$collapsible.find('> .mw-collapsible-content').length) {
							$collapsible.wrapInner('<div class="mw-collapsible-content"></div>');
						}
						if(!$toggle.length) {
							$toggleLink = buildDefaultToggleLink().prependTo($collapsible);
						} else {
							actionHandler = premadeToggleHandler;
							$toggleLink =
								$toggle.on('click.mw-collapsible keypress.mw-collapsible', actionHandler).prop('tabIndex', 0);
						}
					}
				}
				$(this).data('mw-collapsible', {
					collapse: function() {
						actionHandler.call($toggleLink.get(0), null, {
							instantHide: !0,
							wasCollapsed: !1
						});
					},
					expand: function() {
						actionHandler.call($toggleLink.get(0), null, {
							instantHide: !0,
							wasCollapsed: !0
						});
					},
					toggle: function() {
						actionHandler.call($toggleLink.get(0), null, null);
					}
				});
				if(options.collapsed || $collapsible.hasClass('mw-collapsed')) {
					actionHandler.call($toggleLink.get(0), null, {
						instantHide: !0,
						wasCollapsed: !1
					});
				}
			});
			mw.hook('wikipage.collapsibleContent').fire(this);
			return this;
		};
	}(jQuery, mediaWiki));
}, {
	"css": [
		".mw-collapsible-toggle{float:right;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;user-select:none}  .mw-content-ltr .mw-collapsible-toggle,.mw-content-rtl .mw-content-ltr .mw-collapsible-toggle{float:right} .mw-content-rtl .mw-collapsible-toggle,.mw-content-ltr .mw-content-rtl .mw-collapsible-toggle{float:left}.mw-customtoggle,.mw-collapsible-toggle{cursor:pointer} caption .mw-collapsible-toggle,.mw-content-ltr caption .mw-collapsible-toggle,.mw-content-rtl caption .mw-collapsible-toggle,.mw-content-rtl .mw-content-ltr caption .mw-collapsible-toggle,.mw-content-ltr .mw-content-rtl caption .mw-collapsible-toggle{float:none} li .mw-collapsible-toggle,.mw-content-ltr li .mw-collapsible-toggle,.mw-content-rtl li .mw-collapsible-toggle,.mw-content-rtl .mw-content-ltr li .mw-collapsible-toggle,.mw-content-ltr .mw-content-rtl li .mw-collapsible-toggle{float:none} .mw-collapsible-toggle-li{list-style:none}"
	]
}, {
	"collapsible-collapse": "\u6298\u53e0",
	"collapsible-expand": "\u5c55\u5f00"
});
mw.loader.implement("jquery.mw-jump", function($, jQuery, require, module) {
	jQuery(function($) {
		$('.mw-jump').on('focus blur', 'a', function(e) {
			if(e.type === 'blur' || e.type === 'focusout') {
				$(this).closest('.mw-jump').css({
					height: 0
				});
			} else {
				$(this).closest('.mw-jump').css({
					height: 'auto'
				});
			}
		});
	});
});
mw.loader.implement("jquery.placeholder", function($, jQuery, require, module) {
	(function($) {
		var isInputSupported = 'placeholder' in document.createElement('input'),
			isTextareaSupported = 'placeholder' in document.createElement('textarea'),
			prototype = $.fn,
			valHooks = $.valHooks,
			propHooks = $.propHooks,
			hooks, placeholder;

		function safeActiveElement() {
			try {
				return document.activeElement;
			} catch(err) {}
		}

		function args(elem) {
			var newAttrs = {},
				rinlinejQuery = /^jQuery\d+$/;
			$.each(elem.attributes, function(i, attr) {
				if(attr.specified && !rinlinejQuery.test(attr.name)) {
					newAttrs[attr.name] = attr.value;
				}
			});
			return newAttrs;
		}

		function clearPlaceholder(event, value) {
			var input = this,
				$input = $(input);
			if(input.value === $input.attr('placeholder') && $input.hasClass('placeholder')) {
				if($input.data('placeholder-password')) {
					$input = $input.hide().next().show().attr('id', $input.removeAttr('id').data('placeholder-id'));
					if(event === true) {
						$input[0].value = value;
						return value;
					}
					$input.focus();
				} else {
					input.value = '';
					$input.removeClass('placeholder');
					if(input ===
						safeActiveElement()) {
						input.select();
					}
				}
			}
		}

		function setPlaceholder() {
			var $replacement, input = this,
				$input = $(input),
				id = this.id;
			if(!input.value) {
				if(input.type === 'password') {
					if(!$input.data('placeholder-textinput')) {
						try {
							$replacement = $input.clone().attr({
								type: 'text'
							});
						} catch(e) {
							$replacement = $('<input>').attr($.extend(args(this), {
								type: 'text'
							}));
						}
						$replacement.removeAttr('name').data({
							'placeholder-password': $input,
							'placeholder-id': id
						}).bind('focus.placeholder drop.placeholder', clearPlaceholder);
						$input.data({
							'placeholder-textinput': $replacement,
							'placeholder-id': id
						}).before($replacement);
					}
					$input = $input.removeAttr('id').hide().prev().attr('id', id).show();
				}
				$input.addClass('placeholder');
				$input[0].value = $input.attr('placeholder');
			} else {
				$input.removeClass('placeholder');
			}
		}

		function changePlaceholder(text) {
			var hasArgs = arguments.length,
				$input = this;
			if(hasArgs) {
				if($input.attr('placeholder') !== text) {
					$input.prop('placeholder', text);
					if($input.hasClass('placeholder')) {
						$input[0].value = text;
					}
				}
			}
		}
		if(
			isInputSupported && isTextareaSupported) {
			placeholder = prototype.placeholder = function(text) {
				var hasArgs = arguments.length;
				if(hasArgs) {
					changePlaceholder.call(this, text);
				}
				return this;
			};
			placeholder.input = placeholder.textarea = !0;
		} else {
			placeholder = prototype.placeholder = function(text) {
				var $this = this,
					hasArgs = arguments.length;
				if(hasArgs) {
					changePlaceholder.call(this, text);
				}
				$this.filter((isInputSupported ? 'textarea' : ':input') + '[placeholder]').filter(function() {
					return !$(this).data('placeholder-enabled');
				}).bind({
					'focus.placeholder drop.placeholder': clearPlaceholder,
					'blur.placeholder': setPlaceholder
				}).data('placeholder-enabled', true).trigger('blur.placeholder');
				return $this;
			};
			placeholder.input = isInputSupported;
			placeholder.textarea = isTextareaSupported;
			hooks = {
				get: function(element) {
					var $element = $(element),
						$passwordInput = $element.data('placeholder-password');
					if($passwordInput) {
						return $passwordInput[0].value;
					}
					return $element.data('placeholder-enabled') && $element.hasClass('placeholder') ? '' : element.value;
				},
				set: function(element, value) {
					var $element = $(element),
						$passwordInput = $element.data('placeholder-password');
					if($passwordInput) {
						$passwordInput[0].value = value;
						return value;
					}
					if(!$element.data('placeholder-enabled')) {
						element.value = value;
						return value;
					}
					if(!value) {
						element.value = value;
						if(element !== safeActiveElement()) {
							setPlaceholder.call(element);
						}
					} else if($element.hasClass('placeholder')) {
						if(!clearPlaceholder.call(element, true, value)) {
							element.value = value;
						}
					} else {
						element.value = value;
					}
					return $element;
				}
			};
			if(!isInputSupported) {
				valHooks.input = hooks;
				propHooks.value = hooks;
			}
			if(!isTextareaSupported) {
				valHooks.textarea = hooks;
				propHooks.value = hooks;
			}
			$(function() {
				$(document).delegate('form', 'submit.placeholder', function() {
					var $inputs = $('.placeholder', this).each(clearPlaceholder);
					setTimeout(function() {
						$inputs.each(setPlaceholder);
					}, 10);
				});
			});
			$(window).bind('beforeunload.placeholder', function() {
				$('.placeholder').each(function() {
					this.value = '';
				});
			});
		}
	}(jQuery));
});
mw.loader.implement("jquery.suggestions", function($, jQuery, require, module) {
	(function($) {
		var hasOwn = Object.hasOwnProperty;
		$.suggestions = {
			cancel: function(context) {
				if(context.data.timerID !== null) {
					clearTimeout(context.data.timerID);
				}
				if($.isFunction(context.config.cancel)) {
					context.config.cancel.call(context.data.$textbox);
				}
			},
			hide: function(context) {
				context.data.$container.find('.suggestions-result-current').removeClass('suggestions-result-current');
				context.data.$container.hide();
			},
			restore: function(context) {
				context.data.$textbox.val(context.data.prevText);
			},
			update: function(context, delayed) {
				function maybeFetch() {
					var val = context.data.$textbox.val(),
						cache = context.data.cache,
						cacheHit;
					if(typeof context.config.update.before === 'function') {
						context.config.update.before.call(context.data.$textbox);
					}
					if(val.length === 0) {
						$.suggestions.hide(context);
						context.data.prevText = '';
					} else if(val !== context.data.prevText || !context.data.$container.is(':visible')) {
						context.data.prevText = val;
						if(context.config.cache &&
							hasOwn.call(cache, val)) {
							if(+new Date() - cache[val].timestamp < context.config.cacheMaxAge) {
								context.data.$textbox.suggestions('suggestions', cache[val].suggestions);
								if(typeof context.config.update.after === 'function') {
									context.config.update.after.call(context.data.$textbox, cache[val].metadata);
								}
								cacheHit = !0;
							} else {
								delete cache[val];
							}
						}
						if(!cacheHit && typeof context.config.fetch === 'function') {
							context.config.fetch.call(context.data.$textbox, val, function(suggestions, metadata) {
								suggestions = suggestions.slice(0, context.config.maxRows);
								context.data.$textbox.suggestions('suggestions', suggestions);
								if(typeof context.config.update.after === 'function') {
									context.config.update.after.call(context.data.$textbox, metadata);
								}
								if(context.config.cache) {
									cache[val] = {
										suggestions: suggestions,
										metadata: metadata,
										timestamp: +new Date()
									};
								}
							}, context.config.maxRows);
						}
					}
					$.suggestions.special(context);
				}
				$.suggestions.cancel(context);
				if(delayed) {
					context.data.timerID = setTimeout(maybeFetch, context.config.delay);
				} else {
					maybeFetch();
				}
			},
			special: function(context) {
				if(typeof context.config.special.render === 'function') {
					setTimeout(function() {
						var $special = context.data.$container.find('.suggestions-special');
						context.config.special.render.call($special, context.data.$textbox.val(), context);
					}, 1);
				}
			},
			configure: function(context, property, value) {
				var newCSS, $result, $results, $spanForWidth, childrenWidth, i, expWidth, maxWidth, text;
				switch(property) {
					case 'fetch':
					case 'cancel':
					case 'special':
					case 'result':
					case 'update':
					case '$region':
					case 'expandFrom':
						context.config[property] = value;
						break;
					case 'suggestions':
						context.config[property] = value;
						if(context.data !== undefined) {
							if(context.data.$textbox.val().length === 0) {
								$.suggestions.hide(context);
							} else {
								context.data.$container.show();
								newCSS = {
									top: context.config.$region.offset().top + context.config.$region.outerHeight(),
									bottom: 'auto',
									width: context.config.$region.outerWidth(),
									height: 'auto'
								};
								context.config.expandFrom = (function(expandFrom) {
									var regionWidth, docWidth, regionCenter, docCenter, docDir = $(document.documentElement).css('direction'),
										$region = context.config.$region;
									if(context.config.positionFromLeft) {
										expandFrom = 'left';
									} else if($.inArray(expandFrom, ['left', 'right', 'start', 'end', 'auto']) === -1) {
										expandFrom = 'auto';
									}
									if(expandFrom === 'auto') {
										if($region.data('searchsuggest-expand-dir')) {
											expandFrom = $region.data('searchsuggest-expand-dir');
										} else {
											regionWidth = $region.outerWidth();
											docWidth = $(document).width();
											if(regionWidth > (0.85 * docWidth)) {
												expandFrom = 'start';
											} else {
												regionCenter = $region.offset().left + regionWidth / 2;
												docCenter = docWidth / 2;
												if(Math.abs(regionCenter - docCenter) < (0.10 * docCenter)) {
													expandFrom = 'start';
												} else {
													expandFrom = regionCenter > docCenter ? 'right' : 'left';
												}
											}
										}
									}
									if(expandFrom === 'start') {
										expandFrom = docDir === 'rtl' ? 'right' : 'left';
									} else if(expandFrom === 'end') {
										expandFrom = docDir === 'rtl' ? 'left' : 'right';
									}
									return expandFrom;
								}(context.config.expandFrom));
								if(context.config.expandFrom === 'left') {
									newCSS.left = context.config.$region.offset().left;
									newCSS.right = 'auto';
								} else {
									newCSS.left = 'auto';
									newCSS.right = $('body').width() - (context.config.$region.offset().left + context.config.$region.outerWidth());
								}
								context.data.$container.css(newCSS);
								$results = context.data.$container.children('.suggestions-results');
								$results.empty();
								expWidth = -1;
								for(i = 0; i < context.config.suggestions.length; i++) {
									text = context.config.suggestions[i];
									$result = $('<div>').addClass('suggestions-result').attr('rel', i).data('text', context.config.suggestions[i]).mousemove(function() {
										context.data.selectedWithMouse = !0;
										$.suggestions.highlight(context, $(this).closest('.suggestions-results .suggestions-result'), false);
									}).appendTo($results);
									if(typeof context.config.result.render === 'function') {
										context.config.result.render.call($result, context.config.suggestions[i], context);
									} else {
										$result.text(text);
									}
									if(context.config.highlightInput) {
										$result.highlightText(context.data.prevText);
									}
									$spanForWidth = $result.wrapInner('<span>').children();
									childrenWidth = $spanForWidth.css('position', 'absolute').outerWidth();
									$spanForWidth.contents().unwrap();
									if(childrenWidth >
										$result.width() && childrenWidth > expWidth) {
										expWidth = childrenWidth + (context.data.$container.width() - $result.width());
									}
								}
								if(expWidth > context.data.$container.width()) {
									maxWidth = context.config.maxExpandFactor * context.data.$textbox.width();
									context.data.$container.width(Math.min(expWidth, maxWidth));
								}
							}
						}
						break;
					case 'maxRows':
						context.config[property] = Math.max(1, Math.min(100, value));
						break;
					case 'delay':
						context.config[property] = Math.max(0, Math.min(1200, value));
						break;
					case 'cacheMaxAge':
						context.config[property] = Math.max(1, value);
						break;
					case 'maxExpandFactor':
						context.config[property] = Math.max(1, value);
						break;
					case 'cache':
					case 'submitOnClick':
					case 'positionFromLeft':
					case 'highlightInput':
						context.config[property] = !!value;
						break;
				}
			},
			highlight: function(context, result, updateTextbox) {
				var selected = context.data.$container.find('.suggestions-result-current');
				if(!result.get || selected.get(0) !== result.get(0)) {
					if(result === 'prev') {
						if(selected.hasClass('suggestions-special')) {
							result = context.data.$container.find(
								'.suggestions-result:last');
						} else {
							result = selected.prev();
							if(!(result.length && result.hasClass('suggestions-result'))) {
								result = selected.parents('.suggestions-results > *').prev().find('.suggestions-result').eq(0);
							}
							if(selected.length === 0) {
								if(context.data.$container.find('.suggestions-special').html() !== '') {
									result = context.data.$container.find('.suggestions-special');
								} else {
									result = context.data.$container.find('.suggestions-results .suggestions-result:last');
								}
							}
						}
					} else if(result === 'next') {
						if(selected.length === 0) {
							result = context.data.$container.find('.suggestions-results .suggestions-result:first');
							if(result.length === 0 && context.data.$container.find('.suggestions-special').html() !== '') {
								result = context.data.$container.find('.suggestions-special');
							}
						} else {
							result = selected.next();
							if(!(result.length && result.hasClass('suggestions-result'))) {
								result = selected.parents('.suggestions-results > *').next().find('.suggestions-result').eq(0);
							}
							if(selected.hasClass('suggestions-special')) {
								result = $([]);
							} else if(result.length === 0 && context.data.$container.find('.suggestions-special').html() !== '') {
								result = context.data.$container.find('.suggestions-special');
							}
						}
					}
					selected.removeClass('suggestions-result-current');
					result.addClass('suggestions-result-current');
				}
				if(updateTextbox) {
					if(result.length === 0 || result.is('.suggestions-special')) {
						$.suggestions.restore(context);
					} else {
						context.data.$textbox.val(result.data('text'));
						context.data.$textbox.change();
					}
					context.data.$textbox.trigger('change');
				}
			},
			keypress: function(e, context, key) {
				var selected, wasVisible = context.data.$container.is(':visible'),
					preventDefault = !1;
				switch(key) {
					case 40:
						if(wasVisible) {
							$.suggestions.highlight(context, 'next', true);
							context.data.selectedWithMouse = !1;
						} else {
							$.suggestions.update(context, false);
						}
						preventDefault = !0;
						break;
					case 38:
						if(wasVisible) {
							$.suggestions.highlight(context, 'prev', true);
							context.data.selectedWithMouse = !1;
						}
						preventDefault = wasVisible;
						break;
					case 27:
						$.suggestions.hide(context);
						$.suggestions.restore(context);
						$.suggestions.
						cancel(context);
						context.data.$textbox.trigger('change');
						preventDefault = wasVisible;
						break;
					case 13:
						preventDefault = wasVisible;
						selected = context.data.$container.find('.suggestions-result-current');
						$.suggestions.hide(context);
						if(selected.length === 0 || context.data.selectedWithMouse) {
							$.suggestions.cancel(context);
							preventDefault = !1;
						} else if(selected.is('.suggestions-special')) {
							if(typeof context.config.special.select === 'function') {
								if(context.config.special.select.call(selected, context.data.$textbox) === true) {
									preventDefault = !1;
								}
							}
						} else {
							if(typeof context.config.result.select === 'function') {
								if(context.config.result.select.call(selected, context.data.$textbox) === true) {
									preventDefault = !1;
								}
							}
						}
						break;
					default:
						$.suggestions.update(context, true);
						break;
				}
				if(preventDefault) {
					e.preventDefault();
					e.stopPropagation();
				}
			}
		};
		$.fn.suggestions = function() {
			var returnValue, args = arguments;
			$(this).each(function() {
				var context, key;
				context = $(this).data('suggestions-context');
				if(context === undefined || context === null) {
					context = {
						config: {
							fetch: function() {},
							cancel: function() {},
							special: {},
							result: {},
							update: {},
							$region: $(this),
							suggestions: [],
							maxRows: 10,
							delay: 120,
							cache: !1,
							cacheMaxAge: 60000,
							submitOnClick: !1,
							maxExpandFactor: 3,
							expandFrom: 'auto',
							highlightInput: !1
						}
					};
				}
				if(args.length > 0) {
					if(typeof args[0] === 'object') {
						for(key in args[0]) {
							$.suggestions.configure(context, key, args[0][key]);
						}
					} else if(typeof args[0] === 'string') {
						if(args.length > 1) {
							$.suggestions.configure(context, args[0], args[1]);
						} else if(returnValue === null || returnValue === undefined) {
							returnValue = (args[0] in context.config ? undefined : context.config[args[0]]);
						}
					}
				}
				if(context.data === undefined) {
					context.data = {
						timerID: null,
						prevText: null,
						cache: {},
						visibleResults: 0,
						mouseDownOn: $([]),
						$textbox: $(this),
						selectedWithMouse: !1
					};
					context.data.$container = $('<div>').css('display', 'none').addClass('suggestions').append($('<div>').addClass('suggestions-results').mousedown(function(e) {
						context.data.mouseDownOn = $(e.target).closest('.suggestions-results .suggestions-result');
					}).mouseup(function(e) {
						var $result = $(e.target).closest('.suggestions-results .suggestions-result'),
							$other = context.data.mouseDownOn;
						context.data.mouseDownOn = $([]);
						if($result.get(0) !== $other.get(0)) {
							return;
						}
						if(!(e.which !== 1 || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)) {
							$.suggestions.highlight(context, $result, true);
							if(typeof context.config.result.select === 'function') {
								context.config.result.select.call($result, context.data.$textbox);
							}
							setTimeout(function() {
								$.suggestions.hide(context);
							}, 0);
						}
						context.data.$textbox.focus();
					})).append($('<div>').addClass('suggestions-special').mousedown(function(e) {
						context.data.mouseDownOn = $(e.target).closest('.suggestions-special');
					}).mouseup(function(e) {
						var $special = $(e.target).closest('.suggestions-special'),
							$other = context.data.mouseDownOn;
						context.data.mouseDownOn = $([]);
						if($special.get(0) !== $other.get(0)) {
							return;
						}
						if(!(e.which !== 1 || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey)) {
							if(typeof context.config.special.select === 'function') {
								context.config.special.select.call(
									$special, context.data.$textbox);
							}
							setTimeout(function() {
								$.suggestions.hide(context);
							}, 0);
						}
						context.data.$textbox.focus();
					}).mousemove(function(e) {
						context.data.selectedWithMouse = !0;
						$.suggestions.highlight(context, $(e.target).closest('.suggestions-special'), false);
					})).appendTo($('body'));
					$(this).attr('autocomplete', 'off').keydown(function(e) {
						context.data.keypressed = e.which;
						context.data.keypressedCount = 0;
					}).keypress(function(e) {
						context.data.keypressedCount++;
						$.suggestions.keypress(e, context, context.data.keypressed);
					}).keyup(function(e) {
						if(context.data.keypressedCount === 0) {
							$.suggestions.keypress(e, context, context.data.keypressed);
						}
					}).blur(function() {
						if(context.data.mouseDownOn.length > 0) {
							return;
						}
						$.suggestions.hide(context);
						$.suggestions.cancel(context);
					});
				}
				$(this).data('suggestions-context', context);
			});
			return returnValue !== undefined ? returnValue : $(this);
		};
	}(jQuery));
}, {
	"css": [
		".suggestions{overflow:hidden;position:absolute;top:0;left:0;width:0;border:none;z-index:1099;padding:0;margin:-1px 0 0 0}.suggestions-special{position:relative;background-color:white;cursor:pointer;border:solid 1px #aaaaaa;padding:0;margin:0;margin-top:-2px;display:none;padding:0.25em 0.25em;line-height:1.25em}.suggestions-results{background-color:white;cursor:pointer;border:solid 1px #aaaaaa;padding:0;margin:0}.suggestions-result{color:black;margin:0;line-height:1.5em;padding:0.01em 0.25em;text-align:left; overflow:hidden;-o-text-overflow:ellipsis; text-overflow:ellipsis;white-space:nowrap}.suggestions-result-current{background-color:#4C59A6;color:white}.suggestions-special .special-label{color:gray;text-align:left}.suggestions-special .special-query{color:black;font-style:italic;text-align:left}.suggestions-special .special-hover{background-color:silver}.suggestions-result-current .special-label,.suggestions-result-current .special-query{color:white}.highlight{font-weight:bold}"
	]
});
mw.loader.implement("mediawiki.page.ready", function($, jQuery, require, module) {
	(function(mw, $) {
		var supportsPlaceholder = 'placeholder' in document.createElement('input');
		if(mw.config.get('wgBreakFrames')) {
			if(window.top !== window.self) {
				window.top.location.href = location.href;
			}
		}
		mw.hook('wikipage.content').add(function($content) {
			var $sortableTables;
			if(!supportsPlaceholder) {
				$content.find('input[placeholder]').placeholder();
			}
			$content.find('.mw-collapsible').makeCollapsible();
			$sortableTables = $content.find('table.sortable');
			if($sortableTables.length) {
				mw.loader.using('jquery.tablesorter', function() {
					$sortableTables.tablesorter();
				});
			}
			$content.find('input[type="checkbox"]:not(.noshiftselect)').checkboxShiftClick();
		});
		$(function() {
			var $nodes, $oouiNodes;
			if(!supportsPlaceholder) {
				$('input[placeholder]').not('#mw-content-text input').placeholder();
			}
			if(document.querySelectorAll) {
				$nodes = $(document.querySelectorAll('[accesskey]'));
			} else {
				$nodes = $(
					'#column-one a, #mw-head a, #mw-panel a, #p-logo a, input, label, button');
			}
			$nodes.updateTooltipAccessKeys();
			$oouiNodes = $('[data-ooui]');
			if($oouiNodes.length) {
				mw.loader.using(['mediawiki.widgets', 'mediawiki.widgets.UserInputWidget', 'mediawiki.widgets.SearchInputWidget']).done(function() {
					$oouiNodes.each(function() {
						OO.ui.infuse(this);
					});
				});
			}
			$nodes = $('.catlinks[data-mw="interface"]');
			if($nodes.length) {
				mw.hook('wikipage.categories').fire($nodes);
			}
		});
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.searchSuggest", function($, jQuery, require, module) {
	(function(mw, $) {
		mw.searchSuggest = {
			request: function(api, query, response, maxRows) {
				return api.get({
					formatversion: 2,
					action: 'opensearch',
					search: query,
					namespace: 0,
					limit: maxRows,
					suggest: !0
				}).done(function(data, jqXHR) {
					response(data[1], {
						type: jqXHR.getResponseHeader('X-OpenSearch-Type'),
						query: query
					});
				});
			}
		};
		$(function() {
			var api, map, searchboxesSelectors, $searchRegion = $('#simpleSearch, #searchInput').first(),
				$searchInput = $('#searchInput'),
				previousSearchText = $searchInput.val();
			map = {
				opera: [
					['>=', 9.6]
				],
				konqueror: [
					['>=', '4.11']
				],
				docomo: !1,
				blackberry: !1,
				ipod: [
					['>=', 6]
				],
				iphone: [
					['>=', 6]
				]
			};
			if(!$.client.test(map)) {
				return;
			}

			function getFormData(context) {
				var $form, baseHref, linkParams;
				if(!context.formData) {
					$form = context.config.$region.closest('form');
					baseHref = $form.attr('action');
					baseHref += baseHref.indexOf('?') > -1 ? '&' : '?';
					linkParams = $form.serializeObject();
					context.formData = {
						textParam: context.data.$textbox.attr('name'),
						linkParams: linkParams,
						baseHref: baseHref
					};
				}
				return context.formData;
			}

			function onBeforeUpdate() {
				var searchText = this.val();
				if(searchText && searchText !== previousSearchText) {
					mw.track('mediawiki.searchSuggest', {
						action: 'session-start'
					});
				}
				previousSearchText = searchText;
			}

			function getInputLocation(context) {
				return context.config.$region.closest('form').find('[data-search-loc]').data('search-loc') || 'header';
			}

			function onAfterUpdate(metadata) {
				var context = this.data('suggestionsContext');
				mw.track('mediawiki.searchSuggest', {
					action: 'impression-results',
					numberOfResults: context.config.suggestions.length,
					resultSetType: metadata.type || 'unknown',
					query: metadata.query,
					inputLocation: getInputLocation(context)
				});
			}

			function renderFunction(text, context) {
				var formData = getFormData(context),
					textboxConfig = context.data.$textbox.data('mw-searchsuggest') || {};
				formData.linkParams[formData.textParam] = text;
				mw.track('mediawiki.searchSuggest', {
					action: 'render-one',
					formData: formData,
					index: context.config.suggestions.indexOf(text) + 1
				});
				this.text(text);
				if(textboxConfig.wrapAsLink !== false) {
					this.wrap($('<a>').attr('href', formData.baseHref + $.param(formData.linkParams)).attr('title', text).addClass('mw-searchSuggest-link'));
				}
			}

			function selectFunction($input) {
				var context = $input.data('suggestionsContext'),
					text = $input.val();
				mw.track('mediawiki.searchSuggest', {
					action: 'click-result',
					numberOfResults: context.config.suggestions.length,
					clickIndex: context.config.suggestions.indexOf(text) + 1
				});
				return true;
			}

			function specialRenderFunction(query, context) {
				var $el = this,
					formData = getFormData(context);
				formData.linkParams[formData.textParam] = query;
				if($el.children().length === 0) {
					$el.append($('<div>').addClass('special-label').text(mw.msg('searchsuggest-containing')), $('<div>').addClass('special-query').text(query)).show();
				} else {
					$el.find('.special-query').text(query);
				}
				if($el.parent().hasClass('mw-searchSuggest-link')) {
					$el.parent().attr('href', formData.baseHref + $.param(formData.linkParams) + '&fulltext=1');
				} else {
					$el.wrap($('<a>').attr('href', formData
						.baseHref + $.param(formData.linkParams) + '&fulltext=1').addClass('mw-searchSuggest-link'));
				}
			}
			searchboxesSelectors = ['#searchInput', '.mw-searchInput'];
			$(searchboxesSelectors.join(', ')).suggestions({
				fetch: function(query, response, maxRows) {
					var node = this[0];
					api = api || new mw.Api();
					$.data(node, 'request', mw.searchSuggest.request(api, query, response, maxRows));
				},
				cancel: function() {
					var node = this[0],
						request = $.data(node, 'request');
					if(request) {
						request.abort();
						$.removeData(node, 'request');
					}
				},
				result: {
					render: renderFunction,
					select: function() {
						return true;
					}
				},
				update: {
					before: onBeforeUpdate,
					after: onAfterUpdate
				},
				cache: !0,
				highlightInput: !0
			}).bind('paste cut drop', function() {
				$(this).trigger('keypress');
			}).each(function() {
				var $this = $(this);
				$this.data('suggestions-context').data.$container.css('fontSize', $this.css('fontSize'));
			});
			if($searchRegion.length === 0) {
				return;
			}
			$searchInput.suggestions({
				update: {
					before: onBeforeUpdate,
					after: onAfterUpdate
				},
				result: {
					render: renderFunction,
					select: selectFunction
				},
				special: {
					render: specialRenderFunction,
					select: function($input) {
						$input.closest('form').append($('<input type="hidden" name="fulltext" value="1"/>'));
						return true;
					}
				},
				$region: $searchRegion
			});
			$searchInput.closest('form').on('submit', function() {
				var context = $searchInput.data('suggestionsContext');
				mw.track('mediawiki.searchSuggest', {
					action: 'submit-form',
					numberOfResults: context.config.suggestions.length,
					$form: context.config.$region.closest('form'),
					inputLocation: getInputLocation(context)
				});
			}).find('.mw-fallbackSearchButton').remove();
		});
	}(mediaWiki, jQuery));
}, {
	"css": [
		".suggestions a.mw-searchSuggest-link,.suggestions a.mw-searchSuggest-link:hover,.suggestions a.mw-searchSuggest-link:active,.suggestions a.mw-searchSuggest-link:focus{color:black;text-decoration:none}.suggestions-result-current a.mw-searchSuggest-link,.suggestions-result-current a.mw-searchSuggest-link:hover,.suggestions-result-current a.mw-searchSuggest-link:active,.suggestions-result-current a.mw-searchSuggest-link:focus{color:white}.suggestions a.mw-searchSuggest-link .special-query{ overflow:hidden;-o-text-overflow:ellipsis; text-overflow:ellipsis;white-space:nowrap}"
	]
}, {
	"searchsuggest-containing": "\u542b\u6709...",
	"searchsuggest-search": "\u641c\u7d22"
});
mw.loader.implement("mediawiki.ui.button", function($, jQuery, require, module) {}, {
	"css": [
		".mw-ui-button{font-family:inherit;font-size:1em;display:inline-block;min-width:4em;max-width:28.75em;padding:.5em 1em;margin:0;border-radius:2px;-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;*display:inline;zoom:1;vertical-align:middle;background:#ffffff;color:#555555;border:1px solid #cccccc;text-align:center;font-weight:bold;cursor:pointer}.mw-ui-button:hover{background-color:#cccccc}.mw-ui-button:focus{border-color:#ffffff;box-shadow:0 0 0 1px #cccccc;outline:none}.mw-ui-button:focus::-moz-focus-inner{border-color:transparent}.mw-ui-button:active,.mw-ui-button.is-on,.mw-ui-button.mw-ui-checked{background:#777777;box-shadow:none}.mw-ui-button:hover,.mw-ui-button:active,.mw-ui-button:visited{color:#555555}.mw-ui-button:focus{background-color:#cccccc}.mw-ui-button:disabled{color:#cccccc}.mw-ui-button:disabled:hover,.mw-ui-button:disabled:active{background:#ffffff;box-shadow:none}.mw-ui-button:disabled{text-shadow:none;cursor:default}.mw-ui-button.mw-ui-big{font-size:1.3em}.mw-ui-button.mw-ui-block{display:block;width:100%;margin-left:auto;margin-right:auto}.mw-ui-button.mw-ui-progressive,.mw-ui-button.mw-ui-primary{background:#347bff;color:#fff;border:1px solid #347bff;text-shadow:0 1px rgba(0,0,0,0.1)}.mw-ui-button.mw-ui-progressive:hover,.mw-ui-button.mw-ui-primary:hover{background-color:#2962cc}.mw-ui-button.mw-ui-progressive:focus,.mw-ui-button.mw-ui-primary:focus{border-color:#ffffff;box-shadow:0 0 0 1px #2962cc;outline:none}.mw-ui-button.mw-ui-progressive:focus::-moz-focus-inner,.mw-ui-button.mw-ui-primary:focus::-moz-focus-inner{border-color:transparent}.mw-ui-button.mw-ui-progressive:active,.mw-ui-button.mw-ui-primary:active,.mw-ui-button.mw-ui-progressive.is-on,.mw-ui-button.mw-ui-primary.is-on,.mw-ui-button.mw-ui-progressive.mw-ui-checked,.mw-ui-button.mw-ui-primary.mw-ui-checked{background:#2962cc;box-shadow:none}.mw-ui-button.mw-ui-progressive:disabled,.mw-ui-button.mw-ui-primary:disabled{background:#dddddd;border-color:#dddddd}.mw-ui-button.mw-ui-progressive:disabled:hover,.mw-ui-button.mw-ui-primary:disabled:hover,.mw-ui-button.mw-ui-progressive:disabled:active,.mw-ui-button.mw-ui-primary:disabled:active,.mw-ui-button.mw-ui-progressive:disabled.mw-ui-checked,.mw-ui-button.mw-ui-primary:disabled.mw-ui-checked{box-shadow:none}.mw-ui-button.mw-ui-progressive.mw-ui-quiet,.mw-ui-button.mw-ui-primary.mw-ui-quiet{color:#555555}.mw-ui-button.mw-ui-progressive.mw-ui-quiet:hover,.mw-ui-button.mw-ui-primary.mw-ui-quiet:hover,.mw-ui-button.mw-ui-progressive.mw-ui-quiet:focus,.mw-ui-button.mw-ui-primary.mw-ui-quiet:focus{background:transparent;color:#347bff}.mw-ui-button.mw-ui-progressive.mw-ui-quiet:active,.mw-ui-button.mw-ui-primary.mw-ui-quiet:active,.mw-ui-button.mw-ui-progressive.mw-ui-quiet.mw-ui-checked,.mw-ui-button.mw-ui-primary.mw-ui-quiet.mw-ui-checked{color:#2962cc}.mw-ui-button.mw-ui-progressive.mw-ui-quiet:disabled,.mw-ui-button.mw-ui-primary.mw-ui-quiet:disabled{color:#cccccc}.mw-ui-button.mw-ui-constructive{background:#347bff;color:#fff;border:1px solid #347bff;text-shadow:0 1px rgba(0,0,0,0.1)}.mw-ui-button.mw-ui-constructive:hover{background-color:#2962cc}.mw-ui-button.mw-ui-constructive:focus{border-color:#ffffff;box-shadow:0 0 0 1px #2962cc;outline:none}.mw-ui-button.mw-ui-constructive:focus::-moz-focus-inner{border-color:transparent}.mw-ui-button.mw-ui-constructive:active,.mw-ui-button.mw-ui-constructive.is-on,.mw-ui-button.mw-ui-constructive.mw-ui-checked{background:#2962cc;box-shadow:none}.mw-ui-button.mw-ui-constructive:disabled{background:#dddddd;border-color:#dddddd}.mw-ui-button.mw-ui-constructive:disabled:hover,.mw-ui-button.mw-ui-constructive:disabled:active,.mw-ui-button.mw-ui-constructive:disabled.mw-ui-checked{box-shadow:none}.mw-ui-button.mw-ui-constructive.mw-ui-quiet{color:#555555}.mw-ui-button.mw-ui-constructive.mw-ui-quiet:hover,.mw-ui-button.mw-ui-constructive.mw-ui-quiet:focus{background:transparent;color:#347bff}.mw-ui-button.mw-ui-constructive.mw-ui-quiet:active,.mw-ui-button.mw-ui-constructive.mw-ui-quiet.mw-ui-checked{color:#2962cc}.mw-ui-button.mw-ui-constructive.mw-ui-quiet:disabled{color:#cccccc}.mw-ui-button.mw-ui-destructive{background:#d11d13;color:#fff;border:1px solid #d11d13;text-shadow:0 1px rgba(0,0,0,0.1)}.mw-ui-button.mw-ui-destructive:hover{background-color:#a7170f}.mw-ui-button.mw-ui-destructive:focus{border-color:#ffffff;box-shadow:0 0 0 1px #a7170f;outline:none}.mw-ui-button.mw-ui-destructive:focus::-moz-focus-inner{border-color:transparent}.mw-ui-button.mw-ui-destructive:active,.mw-ui-button.mw-ui-destructive.is-on,.mw-ui-button.mw-ui-destructive.mw-ui-checked{background:#a7170f;box-shadow:none}.mw-ui-button.mw-ui-destructive:disabled{background:#dddddd;border-color:#dddddd}.mw-ui-button.mw-ui-destructive:disabled:hover,.mw-ui-button.mw-ui-destructive:disabled:active,.mw-ui-button.mw-ui-destructive:disabled.mw-ui-checked{box-shadow:none}.mw-ui-button.mw-ui-destructive.mw-ui-quiet{color:#555555}.mw-ui-button.mw-ui-destructive.mw-ui-quiet:hover,.mw-ui-button.mw-ui-destructive.mw-ui-quiet:focus{background:transparent;color:#d11d13}.mw-ui-button.mw-ui-destructive.mw-ui-quiet:active,.mw-ui-button.mw-ui-destructive.mw-ui-quiet.mw-ui-checked{color:#a7170f}.mw-ui-button.mw-ui-destructive.mw-ui-quiet:disabled{color:#cccccc}.mw-ui-button.mw-ui-quiet{background:transparent;border:0;text-shadow:none;color:#555555}.mw-ui-button.mw-ui-quiet:hover,.mw-ui-button.mw-ui-quiet:focus{background:transparent;color:#555555}.mw-ui-button.mw-ui-quiet:active,.mw-ui-button.mw-ui-quiet.mw-ui-checked{color:#777777}.mw-ui-button.mw-ui-quiet:disabled{color:#cccccc}.mw-ui-button.mw-ui-quiet:hover,.mw-ui-button.mw-ui-quiet:focus{box-shadow:none}.mw-ui-button.mw-ui-quiet:active,.mw-ui-button.mw-ui-quiet:disabled{background:transparent}a.mw-ui-button{text-decoration:none;line-height:normal}a.mw-ui-button:hover,a.mw-ui-button:focus{text-decoration:none}.mw-ui-button-group \u003E *{min-width:48px;border-radius:0;float:left}.mw-ui-button-group \u003E *:first-child{border-top-left-radius:2px;border-bottom-left-radius:2px}.mw-ui-button-group \u003E *:not( :first-child ){border-left:0}.mw-ui-button-group \u003E *:last-child{border-top-right-radius:2px;border-bottom-right-radius:2px}.mw-ui-button-group .is-on .button{cursor:default}"
	]
});
mw.loader.implement("mediawiki.ui.icon", function($, jQuery, require, module) {}, {
	"css": [".mw-ui-icon{position:relative;min-height:1.5em;min-width:1.5em}.mw-ui-icon.mw-ui-icon-element{text-indent:-999px;overflow:hidden;width:3.5em;min-width:3.5em;max-width:3.5em}.mw-ui-icon.mw-ui-icon-element:before{left:0;right:0;position:absolute;margin:0 1em}.mw-ui-icon.mw-ui-icon-before:before,.mw-ui-icon.mw-ui-icon-element:before{background-position:50% 50%;background-repeat:no-repeat;background-size:100% auto;float:left;display:block;min-height:1.5em;content:''}.mw-ui-icon.mw-ui-icon-before:before{position:relative;width:1.5em;margin-right:1em}"]
});
mw.loader.implement("mmv.bootstrap", function($, jQuery, require, module) {
	(function(mw, $) {
		var CP;

		function Config(viewerConfig, mwConfig, mwUser, api, localStorage) {
			this.viewerConfig = viewerConfig;
			this.mwConfig = mwConfig;
			this.mwUser = mwUser;
			this.api = api;
			this.localStorage = localStorage;
		}
		CP = Config.prototype;
		CP.getFromLocalStorage = function(key, fallback) {
			var value = null;
			if(this.localStorage) {
				try {
					value = this.localStorage.getItem(key);
				} catch(e) {
					mw.log('Failed to fetch item ' + key + ' from localStorage', e);
				}
			}
			if(value === null && fallback !== undefined) {
				value = fallback;
			}
			return value;
		};
		CP.setInLocalStorage = function(key, value) {
			var success = !1;
			if(this.localStorage) {
				try {
					this.localStorage.setItem(key, value);
					success = !0;
				} catch(e) {}
			}
			return success;
		};
		CP.removeFromLocalStorage = function(key) {
			if(this.localStorage) {
				try {
					this.localStorage.removeItem(key);
					return true;
				} catch(e) {
					return false;
				}
			}
			return true;
		};
		CP.setUserPreference = function(key, value) {
			return this.api.postWithToken('options', {
				action: 'options',
				optionname: key,
				optionvalue: value
			});
		};
		CP.isMediaViewerEnabledOnClick = function() {
			return this.mwConfig.get('wgMediaViewer') && this.mwConfig.get('wgMediaViewerOnClick') && (!this.mwUser.isAnon() || this.getFromLocalStorage('wgMediaViewerOnClick', 1) === 1);
		};
		CP.setMediaViewerEnabledOnClick = function(enabled) {
			var deferred, newPrefValue, defaultPrefValue = this.mwConfig.get('wgMediaViewerEnabledByDefault'),
				config = this,
				success = !0;
			if(this.mwUser.isAnon()) {
				if(!enabled) {
					success = this.setInLocalStorage('wgMediaViewerOnClick', '0');
				} else {
					success = this.removeFromLocalStorage('wgMediaViewerOnClick');
				}
				if(success) {
					deferred = $.Deferred().resolve();
				} else {
					deferred = $.Deferred().reject();
				}
			} else {
				if(defaultPrefValue === true) {
					newPrefValue = enabled ? '1' : '';
				} else {
					newPrefValue = enabled ? '1' : undefined;
				}
				deferred = this.setUserPreference('multimediaviewer-enable', newPrefValue);
			}
			return deferred.done(function() {
				config.mwConfig.set('wgMediaViewerOnClick', enabled);
				if(!enabled) {
					config.maybeEnableStatusInfo();
				}
			});
		};
		CP.canSetMediaViewerEnabledOnClick = function() {
			return !this
				.mwUser.isAnon() || !!this.localStorage;
		};
		CP.shouldShowStatusInfo = function() {
			return !this.isMediaViewerEnabledOnClick() && this.getFromLocalStorage('mmv-showStatusInfo') === '1';
		};
		CP.maybeEnableStatusInfo = function() {
			var currentShowStatusInfo = this.getFromLocalStorage('mmv-showStatusInfo');
			if(currentShowStatusInfo === null) {
				this.setInLocalStorage('mmv-showStatusInfo', '1');
			}
		};
		CP.disableStatusInfo = function() {
			this.setInLocalStorage('mmv-showStatusInfo', '0');
		};
		mw.mmv.Config = Config;
	}(mediaWiki, jQuery));
	(function(mw, $) {
		var HUP, cache;
		cache = {
			text: {},
			textWithLinks: {},
			textWithTags: {}
		};

		function HtmlUtils() {}
		HUP = HtmlUtils.prototype;
		HUP.wrapAndJquerify = function(html) {
			if(this.isJQueryOrHTMLElement(html)) {
				return $('<div>').append($(html).clone());
			} else if(typeof html === 'string') {
				return $('<div>' + html + '</div>');
			} else {
				mw.log.warn('wrapAndJquerify: unknown type', html);
				throw 'wrapAndJquerify: unknown type';
			}
		};
		HUP.isJQueryOrHTMLElement = function(html) {
			if(html instanceof jQuery) {
				return true;
			}
			if(window.HTMLElement) {
				if(
					html instanceof HTMLElement) {
					return true;
				}
			} else {
				if(html.nodeType && html.nodeType === 1) {
					return true;
				}
			}
			return false;
		};
		HUP.filterInvisible = function($jq) {
			$jq.find('[style]').filter(function() {
				return this.style.display === 'none';
			}).remove();
		};
		HUP.whitelistHtml = function($el, whitelist) {
			var child, $prev, $child = $el.children().first();
			while($child && $child.length) {
				child = $child.get(0);
				if(child.nodeType !== child.ELEMENT_NODE) {
					return;
				}
				this.whitelistHtml($child, whitelist);
				if(!$child.is(whitelist)) {
					$prev = $child.prev();
					$child.replaceWith($child.contents());
				} else {
					$prev = $child;
				}
				if($prev && $prev.length === 1) {
					$child = $prev.next();
				} else {
					$child = $el.children().first();
				}
			}
		};
		HUP.appendWhitespaceToBlockElements = function($el) {
			$el.find('blockquote, dd, dl, dt, li, td').before(' ').after(' ');
			$el.find('br, tr, p').before('\n').after('\n');
		};
		HUP.jqueryToHtml = function($el) {
			return $('<div>').append($el).html();
		};
		HUP.mergeWhitespace = function(html) {
			html = html.replace(/^\s+|\s+$/g, '');
			html = html.replace(/\s*\n\s*/g, '\n');
			html = html.
			replace(/ {2,}/g, ' ');
			return html;
		};
		HUP.htmlToText = function(html) {
			var $html;
			if(!cache.text[html]) {
				$html = this.wrapAndJquerify(html);
				this.filterInvisible($html);
				this.appendWhitespaceToBlockElements($html);
				cache.text[html] = this.mergeWhitespace($html.text());
			}
			return cache.text[html];
		};
		HUP.htmlToTextWithTags = function(html) {
			var $html;
			if(!cache.textWithTags[html]) {
				$html = this.wrapAndJquerify(html);
				this.filterInvisible($html);
				this.appendWhitespaceToBlockElements($html);
				this.whitelistHtml($html, 'a, span, i, b');
				cache.textWithTags[html] = this.mergeWhitespace($html.html());
			}
			return cache.textWithTags[html];
		};
		HUP.htmlToTextWithLinks = function(html) {
			var $html;
			if(!cache.textWithLinks[html]) {
				$html = this.wrapAndJquerify(html);
				this.filterInvisible($html);
				this.appendWhitespaceToBlockElements($html);
				this.whitelistHtml($html, 'a, span');
				cache.textWithLinks[html] = this.mergeWhitespace($html.html());
			}
			return cache.textWithLinks[html];
		};
		mw.mmv.HtmlUtils = HtmlUtils;
	}(mediaWiki, jQuery));
	(function(mw, $) {
		var MMVB;

		function MultimediaViewerBootstrap() {
			var localStorage = !1;
			try {
				localStorage = window.localStorage || !1;
			} catch(e) {}
			this.validExtensions = {
				'jpg': !0,
				'jpeg': !0,
				'gif': !0,
				'svg': !0,
				'png': !0,
				'tiff': !0,
				'tif': !0
			};
			this.hoverWaitDuration = 200;
			this.config = new mw.mmv.Config(mw.config.get('wgMultimediaViewer', {}), mw.config, mw.user, new mw.Api(), localStorage);
			this.htmlUtils = new mw.mmv.HtmlUtils();
			this.viewerIsBroken = !1;
			this.thumbsReadyDeferred = $.Deferred();
			this.thumbs = [];
			this.$thumbs = null;
			mw.hook('wikipage.content').add($.proxy(this, 'processThumbs'));
			this.browserHistory = window.history;
		}
		MMVB = MultimediaViewerBootstrap.prototype;
		MMVB.hashTimes = 0;
		MMVB.loadViewer = function(setupOverlay) {
			var deferred = $.Deferred(),
				bs = this,
				viewer, message;
			if(mw.config.get('wgMediaViewer') !== true) {
				return deferred.reject();
			}
			if(setupOverlay) {
				bs.setupOverlay();
			}
			mw.loader.using('mmv', function() {
				try {
					viewer = bs.getViewer();
				} catch(e) {
					message = e.message;
					if(e.stack) {
						message += '\n' + e.stack;
					}
					deferred.reject(message);
					return;
				}
				deferred.resolve(viewer);
			}, function(error) {
				deferred.reject(error.message);
			});
			return deferred.done(function(viewer) {
				if(!bs.viewerInitialized) {
					if(bs.thumbs.length) {
						viewer.initWithThumbs(bs.thumbs);
					}
					bs.viewerInitialized = !0;
				}
			}).fail(function(message) {
				mw.log.warn(message);
				bs.cleanupOverlay();
				bs.viewerIsBroken = !0;
				mw.notify('Error loading MediaViewer: ' + message);
			});
		};
		MMVB.processThumbs = function() {
			var bs = this;
			this.$thumbs = $('.gallery .image img, a.image img, #file a img');
			try {
				this.$thumbs.each(function(i, thumb) {
					bs.processThumb(thumb);
				});
			} finally {
				this.thumbsReadyDeferred.resolve();
				$(document).off('click.mmv-head');
			}
		};
		MMVB.isAllowedThumb = function($thumb) {
			return $thumb.closest('.metadata, .noviewer, .noarticletext, #siteNotice').length === 0;
		};
		MMVB.processThumb = function(thumb) {
			var bs = this,
				$thumb = $(thumb),
				$link = $thumb.closest('a.image'),
				$thumbContain = $link.closest('.thumb'),
				$enlarge = $thumbContain.find('.magnify a'),
				title = mw.Title.newFromText('File:' + $(thumb).attr('data-file-name')),
				link = $link.
			prop('href'), alt = $thumb.attr('alt');
			if(!bs.validExtensions[title.getExtension().toLowerCase()]) {
				return;
			}
			if(!bs.isAllowedThumb($thumb)) {
				return;
			}
			if($thumbContain.length !== 0 && $thumbContain.is('.thumb')) {
				$thumbContain.mouseenter(function() {
					if(!bs.config.isMediaViewerEnabledOnClick()) {
						return;
					}
					bs.preloadOnHoverTimer = setTimeout(function() {
						mw.loader.load('mmv');
					}, bs.hoverWaitDuration);
				}).mouseleave(function() {
					if(bs.preloadOnHoverTimer) {
						clearTimeout(bs.preloadOnHoverTimer);
					}
				});
			}
			if($thumb.closest('#file').length > 0) {
				this.processFilePageThumb($thumb, title);
				return;
			}
			this.thumbs.push({
				thumb: thumb,
				$thumb: $thumb,
				title: title,
				link: link,
				alt: alt,
				caption: this.findCaption($thumbContain, $link)
			});
			$link.add($enlarge).click(function(e) {
				return bs.click(this, e, title);
			});
		};
		MMVB.processFilePageThumb = function($thumb, title) {
			var $link, $configLink, $filepageButtons, bs = this,
				link = $thumb.closest('a').prop('href');
			$('.mw-mmv-filepage-buttons').next().addBack().remove();
			$link = $('<a>').prop('href', link).addClass(
				'mw-mmv-view-expanded mw-ui-button mw-ui-icon mw-ui-icon-before').text(mw.message('multimediaviewer-view-expanded').text());
			$configLink = $('<a>').prop('href', $thumb.closest('a').prop('href')).addClass('mw-mmv-view-config mw-ui-button mw-ui-icon mw-ui-icon-element').text(mw.message('multimediaviewer-view-config').text());
			$filepageButtons = $('<div>').addClass('mw-ui-button-group mw-mmv-filepage-buttons').append($link, $configLink);
			$('.fullMedia').append($filepageButtons, $('<div>').css('clear', 'both'));
			this.thumbs.push({
				thumb: $thumb.get(0),
				$thumb: $thumb,
				title: title,
				link: link
			});
			$link.click(function() {
				if(bs.statusInfoDialog) {
					bs.statusInfoDialog.close();
				}
				bs.openImage(this, title);
				return false;
			});
			$configLink.click(function() {
				if(bs.statusInfoDialog) {
					bs.statusInfoDialog.close();
				}
				bs.openImage(this, title).then(function() {
					$(document).trigger('mmv-options-open');
				});
				return false;
			});
			if(this.config.shouldShowStatusInfo()) {
				this.config.disableStatusInfo();
				this.showStatusInfo();
			}
		};
		MMVB.showStatusInfo =
			function() {
				var bs = this;
				mw.loader.using('mmv.ui.tipsyDialog').done(function() {
					bs.statusInfoDialog = new mw.mmv.ui.TipsyDialog($('.mw-mmv-view-expanded'), {
						gravity: 'sw'
					});
					bs.statusInfoDialog.setContent(mw.message('multimediaviewer-disable-info-title').plain(), mw.message('multimediaviewer-disable-info').escaped());
					window.setTimeout(function() {
						bs.statusInfoDialog.open();
					}, 1000);
				});
			};
		MMVB.findCaption = function($thumbContain, $link) {
			var $thumbCaption;
			if($thumbContain.length !== 0 && $thumbContain.is('.thumb')) {
				$thumbCaption = $link.closest(':has(> .thumbcaption)', $thumbContain).find('> .thumbcaption').clone();
				if(!$thumbCaption.length) {
					$thumbCaption = $thumbContain.find('.thumbcaption').clone();
				}
				$thumbCaption.find('.magnify').remove();
				if(!$thumbCaption.length) {
					$thumbCaption = $thumbContain.closest('.gallerybox').not(function() {
						return $thumbContain.closest('#mw-category-media').length;
					}).not(function() {
						var $specialFileRelatedPages = $(
							'.page-Special_NewFiles, .page-Special_MostLinkedFiles\
									, .page-Special_MostGloballyLinkedFiles\
									, .page-Special_UncategorizedFiles, .page-Special_UnusedFiles');
						return $thumbContain.closest($specialFileRelatedPages).length;
					}).find('.gallerytext').clone();
				}
				return this.htmlUtils.htmlToTextWithTags($thumbCaption.html() || '');
			} else if($link.prop('title')) {
				return $link.prop('title');
			}
		};
		MMVB.openImage = function(element, title) {
			var $element = $(element);
			mw.mmv.durationLogger.start(['click-to-first-image', 'click-to-first-metadata']);
			if($element.is('a.image')) {
				mw.mmv.actionLogger.log('thumbnail');
			} else if($element.is('.magnify a')) {
				mw.mmv.actionLogger.log('enlarge');
			}
			this.ensureEventHandlersAreSetUp();
			return this.loadViewer(true).then(function(viewer) {
				viewer.loadImageByTitle(title, true);
			});
		};
		MMVB.click = function(element, e, title) {
			if((e.button !== 0 && e.which !== 1) || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
				return true;
			}
			if(!this.config.isMediaViewerEnabledOnClick()) {
				return true;
			}
			if(this
				.viewerIsBroken) {
				return true;
			}
			this.openImage(element, title);
			e.preventDefault();
			return false;
		};
		MMVB.isViewerHash = function() {
			return window.location.hash.indexOf('#mediaviewer/') === 0 || window.location.hash.indexOf('#/media/') === 0;
		};
		MMVB.hash = function(initialHash) {
			var bootstrap = this;
			if(!this.viewerInitialized && !this.isViewerHash()) {
				return;
			}
			if(this.skipNextHashHandling) {
				this.skipNextHashHandling = !1;
				return;
			}
			this.loadViewer(this.isViewerHash()).then(function(viewer) {
				viewer.hash();
				if(!viewer.isOpen) {
					bootstrap.cleanupOverlay();
				} else if(initialHash) {
					mw.mmv.actionLogger.log('hash-load');
				} else {
					mw.mmv.actionLogger.log('history-navigation');
				}
			});
		};
		MMVB.internalHashChange = function(e) {
			var hash = e.hash,
				title = e.title;
			var browser = {
				versions: function() {
					var u = navigator.userAgent,
						app = navigator.appVersion;
					return {
						trident: u.indexOf('Trident') > -1,
						presto: u.indexOf('Presto') > -1,
						webKit: u.indexOf('AppleWebKit') > -1,
						gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,
						mobile: !!u.match(/AppleWebKit.*Mobile.*/) || !!u.
						match(/AppleWebKit/),
						ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
						android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1,
						iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1,
						iPad: u.indexOf('iPad') > -1,
						webApp: u.indexOf('Safari') == -1,
						weixin: u.indexOf('MicroMessenger') > -1,
						weibo: u.indexOf('Weibo') > -1
					};
				}(),
				language: (navigator.browserLanguage || navigator.language).toLowerCase()
			}
			if(this.browserHistory && this.browserHistory.pushState) {
				if(hash === '#') {
					hash = window.location.href.replace(/#.*$/, '');
					if(browser.versions.android || browser.versions.ios) {
						history.go(-this.hashTimes);
						this.hashTimes = 0;
						return;
					}
				}
				console.log(this.hashTimes);
				this.hashTimes++
					window.history.pushState(null, title, hash);
			} else {
				this.skipNextHashHandling = !0;
				window.location.hash = hash;
			}
			document.title = title;
		};
		MMVB.getViewer = function() {
			if(this.viewer === undefined) {
				this.viewer = new mw.mmv.MultimediaViewer(mw.config);
				this.viewer.setupEventHandlers();
				mw.mmv.viewer = this.viewer;
			}
			return this.viewer;
		};
		MMVB.setupEventHandlers = function() {
			var self = this;
			this.eventHandlersHaveBeenSetUp = !0;
			$(window).on(this.browserHistory && this.browserHistory.pushState ? 'popstate.mmvb' : 'hashchange', function() {
				self.hash();
			});
			self.hash(true);
			$(document).on('mmv-hash', function(e) {
				self.internalHashChange(e);
			}).on('mmv-cleanup-overlay', function() {
				self.cleanupOverlay();
			});
		};
		MMVB.cleanupEventHandlers = function() {
			$(window).off('hashchange popstate.mmvb');
			$(document).off('mmv-hash');
			this.eventHandlersHaveBeenSetUp = !1;
		};
		MMVB.ensureEventHandlersAreSetUp = function() {
			if(!this.eventHandlersHaveBeenSetUp) {
				this.setupEventHandlers();
			}
		};
		MMVB.setupOverlay = function() {
			var $scrollTo = $.scrollTo(),
				$body = $(document.body);
			if($body.hasClass('mw-mmv-lightbox-open')) {
				return;
			}
			if(!this.$overlay) {
				this.$overlay = $('<div>').addClass('mw-mmv-overlay');
			}
			this.savedScroll = {
				top: $scrollTo.scrollTop(),
				left: $scrollTo.scrollLeft()
			};
			$body.addClass('mw-mmv-lightbox-open').append(this.$overlay);
		};
		MMVB.cleanupOverlay = function() {
			var bootstrap = this;
			$(document.body).removeClass('mw-mmv-lightbox-open');
			if(this.$overlay) {
				this.$overlay.remove();
			}
			if(this.savedScroll) {
				setTimeout(function() {
					$.scrollTo(bootstrap.savedScroll, 0);
					bootstrap.savedScroll = undefined;
				}, 0);
			}
		};
		MMVB.whenThumbsReady = function() {
			return this.thumbsReadyDeferred.promise();
		};
		mw.mmv.MultimediaViewerBootstrap = MultimediaViewerBootstrap;
	}(mediaWiki, jQuery));
	(function(mw, $) {
		var L;

		function Logger() {
			this.Geo = undefined;
			this.eventLog = undefined;
		}
		L = Logger.prototype;
		L.samplingFactor = 0;
		L.schema = '';
		L.setGeo = function(Geo) {
			this.Geo = Geo;
		};
		L.setEventLog = function(eventLog) {
			this.eventLog = eventLog;
		};
		L.loadDependencies = function() {
			var self = this,
				waitForEventLog = $.Deferred();
			$(document).
			ready(function() {
				if(window.Geo) {
					self.setGeo(window.Geo);
				}
				try {
					mw.loader.using(['ext.eventLogging', 'schema.' + self.schema], function() {
						self.setEventLog(mw.eventLog);
						waitForEventLog.resolve();
					});
				} catch(e) {
					waitForEventLog.reject();
				}
			});
			return waitForEventLog;
		};
		L.isInSample = function() {
			if(!$.isNumeric(this.samplingFactor) || this.samplingFactor < 1) {
				return false;
			}
			return Math.floor(Math.random() * this.samplingFactor) === 0;
		};
		L.isEnabled = function() {
			return $.isNumeric(this.samplingFactor) && this.samplingFactor >= 1;
		};
		L.schemaSupportsCountry = function() {
			return this.eventLog && this.eventLog.schemas && this.schema in this.eventLog.schemas && 'country' in this.eventLog.schemas[this.schema].schema.properties;
		};
		L.log = function(data) {
			var self = this;
			if(self.isInSample()) {
				return this.loadDependencies().then(function() {
					if(self.Geo && self.Geo.country !== undefined && self.schemaSupportsCountry()) {
						data.country = self.Geo.country;
					}
					self.eventLog.logEvent(self.schema, data);
				});
			} else {
				return $.Deferred().resolve();
			}
		};
		mw.mmv.logging = {};
		mw.
		mmv.logging.Logger = Logger;
	}(mediaWiki, jQuery));
	(function(mw, $, oo) {
		var L;

		function ActionLogger() {}
		oo.inheritClass(ActionLogger, mw.mmv.logging.Logger);
		L = ActionLogger.prototype;
		L.samplingFactorMap = mw.config.get('wgMultimediaViewer').actionLoggingSamplingFactorMap;
		L.schema = 'MediaViewer';
		L.logActions = {
			'thumbnail': 'User clicked on a thumbnail to open Media Viewer.',
			'enlarge': 'User clicked on an enlarge link to open Media Viewer.',
			'fullscreen': 'User entered fullscreen mode.',
			'defullscreen': 'User exited fullscreen mode.',
			'close': 'User closed Media Viewer.',
			'view-original-file': 'User clicked on the direct link to the original file',
			'file-description-page': 'User opened the file description page.',
			'file-description-page-abovefold': 'User opened the file description page via the above-the-fold button.',
			'use-this-file-open': 'User opened the dialog to use this file.',
			'image-view': 'User viewed an image.',
			'metadata-open': 'User opened the metadata panel.',
			'metadata-close': 'User closed the metadata panel.',
			'metadata-scroll-open': 'User opened the metadata panel by scrolling.',
			'metadata-scroll-close': 'User closed the metadata panel by scrolling.',
			'next-image': 'User viewed the next image.',
			'prev-image': 'User viewed the previous image.',
			'terms-open': 'User opened the usage terms.',
			'license-page': 'User opened the license page.',
			'author-page': 'User opened the author page.',
			'source-page': 'User opened the source page.',
			'hash-load': 'User loaded the image via a hash on pageload.',
			'history-navigation': 'User navigated with the browser history.',
			'optout-loggedin': 'opt-out (via quick link at bottom of metadata panel) by logged-in user',
			'optout-anon': 'opt-out by anonymous user',
			'optin-loggedin': 'opt-in (via quick link at bottom of metadata panel) by logged-in user',
			'optin-anon': 'opt-in by anonymous user',
			'about-page': 'User opened the about page.',
			'discuss-page': 'User opened the discuss page.',
			'help-page': 'User opened the help page.',
			'location-page': 'User opened the location page.',
			'download-select-menu-original': 'User selected the original size in the download dropdown menu.',
			'download-select-menu-small': 'User selected the small size in the download dropdown menu.',
			'download-select-menu-medium': 'User selected the medium size in the download dropdown menu.',
			'download-select-menu-large': 'User selected the large size in the download dropdown menu.',
			'download': 'User clicked on the button to download a file.',
			'download-view-in-browser': 'User clicked on the link to view the image in the browser in the download tab.',
			'right-click-image': 'User right-clicked on the image.',
			'share-page': 'User opened the link to the current image.',
			'share-link-copied': 'User copied the share link.',
			'embed-html-copied': 'User copied the HTML embed code.',
			'embed-wikitext-copied': 'User copied the wikitext embed code.',
			'embed-switched-to-html': 'User switched to the HTML embed code.',
			'embed-switched-to-wikitext': 'User switched to the wikitext embed code.',
			'embed-select-menu-wikitext-default': 'User switched to the default thumbnail size on wikitext.',
			'embed-select-menu-wikitext-small': 'User switched to the small thumbnail size on wikitext.',
			'embed-select-menu-wikitext-medium': 'User switched to the medium thumbnail size on wikitext.',
			'embed-select-menu-wikitext-large': 'User switched to the large thumbnail size on wikitext.',
			'embed-select-menu-html-original': 'User switched to the original thumbnail size on html.',
			'embed-select-menu-html-small': 'User switched to the small thumbnail size on html.',
			'embed-select-menu-html-medium': 'User switched to the medium thumbnail size on html.',
			'embed-select-menu-html-large': 'User switched to the large thumbnail size on html.',
			'use-this-file-close': 'User closed the dialog to use this file.',
			'download-open': 'User opened the dialog to download this file.',
			'download-close': 'User closed the dialog to download this file.',
			'options-open': 'User opened the enable/disable dialog.',
			'options-close': 'User either canceled an enable/disable action or closed a confirmation window.',
			'disable-about-link': 'User clicked on the "Learn more" link in the disable window.',
			'enable-about-link': 'User clicked on the "Learn more" link in the enable window.',
			'image-unview': 'User stopped looking at the current image.'
		};
		L.log = function(action, forceEventLog) {
			var actionText = this.logActions[action] || action,
				self = this;
			if(this.isEnabled(action)) {
				mw.log(actionText);
			}
			if(forceEventLog || self.isInSample(action)) {
				return this.loadDependencies().then(function() {
					self.eventLog.logEvent(self.schema, {
						action: action,
						samplingFactor: self.getActionFactor(action)
					});
					return true;
				});
			} else {
				return $.Deferred().resolve(false);
			}
		};
		L.getActionFactor = function(action) {
			return this.samplingFactorMap[action] || this.samplingFactorMap['default'];
		};
		L.isInSample = function(action) {
			var factor = this.getActionFactor(action);
			if(!$.isNumeric(factor) || factor < 1) {
				return false;
			}
			return Math.floor(Math.random() * factor) === 0;
		};
		L.isEnabled = function(action) {
			var factor = this.getActionFactor(action);
			return $.isNumeric(factor) && factor >= 1;
		};
		mw.mmv.logging.ActionLogger = ActionLogger;
		mw.mmv.actionLogger = new ActionLogger();
	}(mediaWiki, jQuery, OO));
	(function(mw, $, oo) {
		var L;

		function DurationLogger() {
			this.starts = {};
			this.stops = {};
		}
		oo.inheritClass(DurationLogger, mw.mmv.logging.Logger);
		L = DurationLogger.prototype;
		L.samplingFactor = mw.config.get('wgMultimediaViewer').durationSamplingFactor;
		if(mw.config.get('wgMultimediaViewer').durationSamplingFactorLoggedin && !mw.user.isAnon()) {
			L.samplingFactor = mw.config.get('wgMultimediaViewer').durationSamplingFactorLoggedin;
		}
		L.schema = 'MultimediaViewerDuration';
		L.start = function(typeOrTypes) {
			var i, start = $.now();
			if(!typeOrTypes) {
				throw 'Must specify type';
			}
			if(!$.isArray(typeOrTypes)) {
				typeOrTypes = [typeOrTypes];
			}
			for(i = 0; i < typeOrTypes.length; i++) {
				if(!this.starts.hasOwnProperty(typeOrTypes[i])) {
					this.starts[typeOrTypes[i]] = start;
				}
			}
			return this;
		};
		L.stop = function(type, start) {
			var stop = $.now();
			if(!type) {
				throw 'Must specify type';
			}
			if(!
				this.stops.hasOwnProperty(type)) {
				this.stops[type] = stop;
			}
			if(start !== undefined && !this.starts.hasOwnProperty(type)) {
				this.starts[type] = start;
			}
			return this;
		};
		L.record = function(type, extraData) {
			var e, duration;
			if(!type) {
				throw 'Must specify type';
			}
			if(!this.starts.hasOwnProperty(type) || this.starts[type] === undefined) {
				return;
			}
			if(!this.stops.hasOwnProperty(type) || this.stops[type] === undefined) {
				return;
			}
			duration = this.stops[type] - this.starts[type];
			e = {
				type: type,
				duration: duration,
				loggedIn: !mw.user.isAnon(),
				samplingFactor: this.samplingFactor
			};
			if(extraData) {
				$.each(extraData, function(key, value) {
					e[key] = value;
				});
			}
			if(this.isEnabled()) {
				mw.log('mw.mmw.logger.DurationLogger', e);
			}
			this.log(e);
			delete this.starts[type];
			delete this.stops[type];
			return this;
		};
		mw.mmv.durationLogger = new DurationLogger();
	}(mediaWiki, jQuery, OO));
	(function($, window, undefined) {
		'$:nomunge';
		var str_hashchange = 'hashchange',
			doc = document,
			fake_onhashchange, special = $.event.special,
			doc_mode = doc.documentMode,
			supports_onhashchange = 'on' + str_hashchange in
			window && (doc_mode === undefined || doc_mode > 7);

		function get_fragment(url) {
			url = url || location.href;
			return '#' + url.replace(/^[^#]*#?(.*)$/, '$1');
		};
		$.fn[str_hashchange] = function(fn) {
			return fn ? this.bind(str_hashchange, fn) : this.trigger(str_hashchange);
		};
		$.fn[str_hashchange].delay = 50;
		special[str_hashchange] = $.extend(special[str_hashchange], {
			setup: function() {
				if(supports_onhashchange) {
					return false;
				}
				$(fake_onhashchange.start);
			},
			teardown: function() {
				if(supports_onhashchange) {
					return false;
				}
				$(fake_onhashchange.stop);
			}
		});
		fake_onhashchange = (function() {
			var self = {},
				timeout_id, last_hash = get_fragment(),
				fn_retval = function(val) {
					return val;
				},
				history_set = fn_retval,
				history_get = fn_retval;
			self.start = function() {
				timeout_id || poll();
			};
			self.stop = function() {
				timeout_id && clearTimeout(timeout_id);
				timeout_id = undefined;
			};

			function poll() {
				var hash = get_fragment(),
					history_hash = history_get(last_hash);
				if(hash !== last_hash) {
					history_set(last_hash = hash, history_hash);
					$(window).trigger(str_hashchange);
				} else if(history_hash !== last_hash) {
					location.href = location.href.replace(/#.*/, '') + history_hash;
				}
				timeout_id = setTimeout(poll, $.fn[str_hashchange].delay);
			};
			!supports_onhashchange && (function() {
				var iframe, iframe_src;
				self.start = function() {
					if(!iframe) {
						iframe_src = $.fn[str_hashchange].src;
						iframe_src = iframe_src && iframe_src + get_fragment();
						iframe = $('<iframe tabindex="-1" title="empty"/>').hide().one('load', function() {
							iframe_src || history_set(get_fragment());
							poll();
						}).attr('src', iframe_src || 'javascript:0').insertAfter('body')[0].contentWindow;
						doc.onpropertychange = function() {
							try {
								if(event.propertyName === 'title') {
									iframe.document.title = doc.title;
								}
							} catch(e) {}
						};
					}
				};
				self.stop = fn_retval;
				history_get = function() {
					return get_fragment(iframe.location.href);
				};
				history_set = function(hash, history_hash) {
					var iframe_doc = iframe.document,
						domain = $.fn[str_hashchange].domain;
					if(hash !== history_hash) {
						iframe_doc.title = doc.title;
						iframe_doc.open();
						domain && iframe_doc.write('<script>document.domain="' + domain + '"</script>');
						iframe_doc.close();
						iframe.location.hash = hash;
					}
				};
			})();
			return self;
		})();
	})(jQuery, this);;
	(function(factory) {
		if(typeof define === 'function' && define.amd) {
			define(['jquery'], factory);
		} else {
			factory(jQuery);
		}
	}(function($) {
		var $scrollTo = $.scrollTo = function(target, duration, settings) {
			return $(window).scrollTo(target, duration, settings);
		};
		$scrollTo.defaults = {
			axis: 'xy',
			duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1,
			limit: !0
		};
		$scrollTo.window = function(scope) {
			return $(window)._scrollable();
		};
		$.fn._scrollable = function() {
			return this.map(function() {
				var elem = this,
					isWin = !elem.nodeName || $.inArray(elem.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1;
				if(!isWin) return elem;
				var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
				return /webkit/i.test(navigator.userAgent) || doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;
			});
		};
		$.fn.scrollTo = function(target, duration, settings) {
			if(typeof duration == 'object') {
				settings = duration;
				duration = 0;
			}
			if(typeof settings == 'function') settings = {
				onAfter: settings
			};
			if(target == 'max') target = 9e9;
			settings = $.extend({}, $scrollTo.defaults, settings);
			duration = duration || settings.duration;
			settings.queue = settings.queue && settings.axis.length > 1;
			if(settings.queue) duration /= 2;
			settings.offset = both(settings.offset);
			settings.over = both(settings.over);
			return this._scrollable().each(function() {
				if(target == null) return;
				var elem = this,
					$elem = $(elem),
					targ = target,
					toff, attr = {},
					win = $elem.is('html,body');
				switch(typeof targ) {
					case 'number':
					case 'string':
						if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)) {
							targ = both(targ);
							break;
						}
						targ = $(targ, this);
						if(!targ.length) return;
					case 'object':
						if(targ.is || targ.style) toff = (targ = $(targ)).offset();
				}
				var offset = $.isFunction(settings.offset) && settings.offset(elem, targ) || settings.offset;
				$.each(settings.axis.split(''), function(i, axis) {
					var Pos = axis == 'x' ? 'Left' : 'Top',
						pos = Pos.toLowerCase(),
						key = 'scroll' + Pos,
						old = elem[key],
						max = $scrollTo.max(elem, axis);
					if(toff) {
						attr[key] = toff[pos] + (win ? 0 : old - $elem.offset()[pos]);
						if(settings.margin) {
							attr[key] -= parseInt(targ.css('margin' + Pos)) || 0;
							attr[key] -=
								parseInt(targ.css('border' + Pos + 'Width')) || 0;
						}
						attr[key] += offset[pos] || 0;
						if(settings.over[pos]) attr[key] += targ[axis == 'x' ? 'width' : 'height']() * settings.over[pos];
					} else {
						var val = targ[pos];
						attr[key] = val.slice && val.slice(-1) == '%' ? parseFloat(val) / 100 * max : val;
					}
					if(settings.limit && /^\d+$/.test(attr[key])) attr[key] = attr[key] <= 0 ? 0 : Math.min(attr[key], max);
					if(!i && settings.queue) {
						if(old != attr[key]) animate(settings.onAfterFirst);
						delete attr[key];
					}
				});
				animate(settings.onAfter);

				function animate(callback) {
					$elem.animate(attr, duration, settings.easing, callback && function() {
						callback.call(this, targ, settings);
					});
				};
			}).end();
		};
		$scrollTo.max = function(elem, axis) {
			var Dim = axis == 'x' ? 'Width' : 'Height',
				scroll = 'scroll' + Dim;
			if(!$(elem).is('html,body')) return elem[scroll] - $(elem)[Dim.toLowerCase()]();
			var size = 'client' + Dim,
				html = elem.ownerDocument.documentElement,
				body = elem.ownerDocument.body;
			return Math.max(html[scroll], body[scroll]) - Math.min(html[size], body[size]);
		};

		function both(val) {
			return $.isFunction(val) || typeof val ==
				'object' ? val : {
					top: val,
					left: val
				};
		};
		return $scrollTo;
	}));
}, {
	"css": [
		".mw-mmv-overlay{position:fixed;top:0px;left:0px;right:0px;bottom:0px;z-index:1000;background-color:#000000}body.mw-mmv-lightbox-open{overflow-y:auto}body.mw-mmv-lightbox-open #mw-page-base,body.mw-mmv-lightbox-open #mw-head-base,body.mw-mmv-lightbox-open #mw-navigation,body.mw-mmv-lightbox-open #content,body.mw-mmv-lightbox-open #footer,body.mw-mmv-lightbox-open #globalWrapper{ display:none}body.mw-mmv-lightbox-open \u003E *{ display:none}body.mw-mmv-lightbox-open \u003E .mw-mmv-overlay,body.mw-mmv-lightbox-open \u003E .mw-mmv-wrapper{display:block}.mw-mmv-filepage-buttons{margin-top:5px}.mw-mmv-filepage-buttons .mw-mmv-view-expanded,.mw-mmv-filepage-buttons .mw-mmv-view-config{display:block;line-height:inherit}.mw-mmv-filepage-buttons .mw-mmv-view-expanded.mw-ui-icon:before{background-image:url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201024%20768%22%3E%0A%20%20%20%20%3Cg%20fill%3D%22%23777%22%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M851.2%2071.6L690.7%20232.1l-40.1-40.3-9.6%20164.8%20164.8-9.3-40.3-40.4L926%20146.4l58.5%2058.5L997.6%200%20792.7%2013.1%22%2F%3E%0A%20%20%20%20%20%20%20%20%3Cpath%20d%3D%22M769.6%2089.3H611.9l70.9%2070.8%207.9%207.5m-47.1%20234.6l-51.2%203%203-51.2%209.4-164.4%205.8-100.3H26.4V768h883.1V387l-100.9%205.8-165%209.4zM813.9%20678H113.6l207.2-270.2%2031.5-12.9L548%20599.8l105.9-63.2%20159.8%20140.8.2.6zm95.6-291.9V228l-79.1%2078.9%207.8%207.9%22%2F%3E%0A%20%20%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E%0A);background-image:url(//wikicdn.joyme.com/extensions/MultimediaViewer/resources/mmv/img/expand.svg?b714e)!ie}.mw-mmv-filepage-buttons .mw-mmv-view-config.mw-ui-icon:before{background-image:url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22UTF-8%22%20standalone%3D%22no%22%3F%3E%0A%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201024%20768%22%3E%0A%20%20%20%20%3Cpath%20d%3D%22M897%20454.6V313.4L810.4%20299c-6.4-23.3-16-45.7-27.3-65.8l50.5-71.4-99.4-100.2-71.4%2050.5c-20.9-11.2-42.5-20.9-65.8-27.3L582.6-1H441.4L427%2085.6c-23.3%206.4-45.7%2016-65.8%2027.3l-71.4-50.5-100.3%2099.5%2050.5%2071.4c-11.2%2020.9-20.9%2042.5-27.3%2066.6L127%20313.4v141.2l85.8%2014.4c6.4%2023.3%2016%2045.7%2027.3%2066.6L189.6%20607l99.5%2099.5%2071.4-50.5c20.9%2011.2%2042.5%2020.9%2066.6%2027.3l14.4%2085.8h141.2l14.4-86.6c23.3-6.4%2045.7-16%2065.8-27.3l71.4%2050.5%2099.5-99.5-50.5-71.4c11.2-20.9%2020.9-42.5%2027.3-66.6l86.4-13.6zm-385%2077c-81.8%200-147.6-66.6-147.6-147.6%200-81.8%2066.6-147.6%20147.6-147.6S659.6%20302.2%20659.6%20384%20593.8%20531.6%20512%20531.6z%22%20fill%3D%22%23777%22%2F%3E%0A%3C%2Fsvg%3E%0A);background-image:url(//wikicdn.joyme.com/extensions/MultimediaViewer/resources/mmv/img/gear_gray.svg?330ae)!ie;opacity:0.75}.mw-mmv-filepage-buttons .mw-mmv-view-config.mw-ui-icon:before:hover{opacity:1}"
	]
}, {
	"multimediaviewer-disable-info": "\u60a8\u4ecd\u53ef\u901a\u8fc7\u5a92\u4f53\u67e5\u770b\u5668\u67e5\u770b\u4e2a\u522b\u6587\u4ef6\u3002",
	"multimediaviewer-disable-info-title": "\u60a8\u5df2\u7981\u7528\u5a92\u4f53\u67e5\u770b\u5668",
	"multimediaviewer-view-config": "\u914d\u7f6e",
	"multimediaviewer-view-expanded": "\u5728\u5a92\u4f53\u67e5\u770b\u5668\u4e2d\u6253\u5f00"
});
mw.loader.implement("mmv.bootstrap.autostart", function($, jQuery, require, module) {
	(function(mw, $) {
		if(!mw.mmv.isBrowserSupported()) {
			return;
		}
		var bootstrap = new mw.mmv.MultimediaViewerBootstrap();
		$(document).ready(function() {
			bootstrap.setupEventHandlers();
		});
		mw.mmv.bootstrap = bootstrap;
	}(mediaWiki, jQuery));
});
mw.loader.implement("oojs", function($, jQuery, require, module) {
	(function(global) {
		'use strict';
		var oo = {},
			hasOwn = oo.hasOwnProperty,
			toString = oo.toString,
			createObject = Object.create || (function() {
				function Empty() {}
				return function(prototype, properties) {
					var obj;
					Empty.prototype = prototype;
					obj = new Empty();
					if(properties && hasOwn.call(properties, 'constructor')) {
						obj.constructor = properties.constructor.value;
					}
					return obj;
				};
			})();
		oo.initClass = function(fn) {
			fn.static = fn.static || {};
		};
		oo.inheritClass = function(targetFn, originFn) {
			var targetConstructor;
			if(targetFn.prototype instanceof originFn) {
				throw new Error('Target already inherits from origin');
			}
			targetConstructor = targetFn.prototype.constructor;
			targetFn['super'] = targetFn.parent = originFn;
			targetFn.prototype = createObject(originFn.prototype, {
				constructor: {
					value: targetConstructor,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			});
			oo.initClass(originFn);
			targetFn.static = createObject(originFn.static);
		};
		oo.mixinClass = function(targetFn, originFn) {
			var key;
			for(key in
				originFn.prototype) {
				if(key !== 'constructor' && hasOwn.call(originFn.prototype, key)) {
					targetFn.prototype[key] = originFn.prototype[key];
				}
			}
			oo.initClass(targetFn);
			if(originFn.static) {
				for(key in originFn.static) {
					if(hasOwn.call(originFn.static, key)) {
						targetFn.static[key] = originFn.static[key];
					}
				}
			} else {
				oo.initClass(originFn);
			}
		};
		oo.getProp = function(obj) {
			var i, retval = obj;
			for(i = 1; i < arguments.length; i++) {
				if(retval === undefined || retval === null) {
					return undefined;
				}
				retval = retval[arguments[i]];
			}
			return retval;
		};
		oo.setProp = function(obj) {
			var i, prop = obj;
			if(Object(obj) !== obj) {
				return;
			}
			for(i = 1; i < arguments.length - 2; i++) {
				if(prop[arguments[i]] === undefined) {
					prop[arguments[i]] = {};
				}
				if(Object(prop[arguments[i]]) !== prop[arguments[i]]) {
					return;
				}
				prop = prop[arguments[i]];
			}
			prop[arguments[arguments.length - 2]] = arguments[arguments.length - 1];
		};
		oo.cloneObject = function(origin) {
			var key, r;
			r = createObject(origin.constructor.prototype);
			for(key in origin) {
				if(hasOwn.call(origin, key)) {
					r[key] = origin[key];
				}
			}
			return r;
		};
		oo.getObjectValues = function(
			obj) {
			var key, values;
			if(obj !== Object(obj)) {
				throw new TypeError('Called on non-object');
			}
			values = [];
			for(key in obj) {
				if(hasOwn.call(obj, key)) {
					values[values.length] = obj[key];
				}
			}
			return values;
		};
		oo.binarySearch = function(arr, searchFunc, forInsertion) {
			var mid, cmpResult, left = 0,
				right = arr.length;
			while(left < right) {
				mid = (left + right) >> 1;
				cmpResult = searchFunc(arr[mid]);
				if(cmpResult < 0) {
					right = mid;
				} else if(cmpResult > 0) {
					left = mid + 1;
				} else {
					return mid;
				}
			}
			return forInsertion ? right : null;
		};
		oo.compare = function(a, b, asymmetrical) {
			var aValue, bValue, aType, bType, k;
			if(a === b) {
				return true;
			}
			a = a || {};
			b = b || {};
			if(typeof a.nodeType === 'number' && typeof a.isEqualNode === 'function') {
				return a.isEqualNode(b);
			}
			for(k in a) {
				if(!hasOwn.call(a, k) || a[k] === undefined || a[k] === b[k]) {
					continue;
				}
				aValue = a[k];
				bValue = b[k];
				aType = typeof aValue;
				bType = typeof bValue;
				if(aType !== bType || ((aType === 'string' || aType === 'number' || aType === 'boolean') && aValue !== bValue) || (aValue === Object(aValue) && !oo.compare(aValue, bValue, true))) {
					return false;
				}
			}
			return asymmetrical ? true : oo
				.compare(b, a, true);
		};
		oo.copy = function(source, leafCallback, nodeCallback) {
			var key, destination;
			if(nodeCallback) {
				destination = nodeCallback(source);
				if(destination !== undefined) {
					return destination;
				}
			}
			if(Array.isArray(source)) {
				destination = new Array(source.length);
			} else if(source && typeof source.clone === 'function') {
				return leafCallback ? leafCallback(source.clone()) : source.clone();
			} else if(source && typeof source.cloneNode === 'function') {
				return leafCallback ? leafCallback(source.cloneNode(true)) : source.cloneNode(true);
			} else if(oo.isPlainObject(source)) {
				destination = {};
			} else {
				return leafCallback ? leafCallback(source) : source;
			}
			for(key in source) {
				destination[key] = oo.copy(source[key], leafCallback, nodeCallback);
			}
			return destination;
		};
		oo.getHash = function(val) {
			return JSON.stringify(val, oo.getHash.keySortReplacer);
		};
		oo.getHash.keySortReplacer = function(key, val) {
			var normalized, keys, i, len;
			if(val && typeof val.getHashObject === 'function') {
				val = val.getHashObject();
			}
			if(!Array.isArray(val) && Object(val) === val) {
				normalized = {};
				keys =
					Object.keys(val).sort();
				i = 0;
				len = keys.length;
				for(; i < len; i += 1) {
					normalized[keys[i]] = val[keys[i]];
				}
				return normalized;
			} else {
				return val;
			}
		};
		oo.unique = function(arr) {
			return arr.reduce(function(result, current) {
				if(result.indexOf(current) === -1) {
					result.push(current);
				}
				return result;
			}, []);
		};
		oo.simpleArrayUnion = function() {
			var i, ilen, arr, j, jlen, obj = {},
				result = [];
			for(i = 0, ilen = arguments.length; i < ilen; i++) {
				arr = arguments[i];
				for(j = 0, jlen = arr.length; j < jlen; j++) {
					if(!obj[arr[j]]) {
						obj[arr[j]] = !0;
						result.push(arr[j]);
					}
				}
			}
			return result;
		};

		function simpleArrayCombine(a, b, includeB) {
			var i, ilen, isInB, bObj = {},
				result = [];
			for(i = 0, ilen = b.length; i < ilen; i++) {
				bObj[b[i]] = !0;
			}
			for(i = 0, ilen = a.length; i < ilen; i++) {
				isInB = !!bObj[a[i]];
				if(isInB === includeB) {
					result.push(a[i]);
				}
			}
			return result;
		}
		oo.simpleArrayIntersection = function(a, b) {
			return simpleArrayCombine(a, b, true);
		};
		oo.simpleArrayDifference = function(a, b) {
			return simpleArrayCombine(a, b, false);
		};
		oo.isPlainObject = $.isPlainObject;
		(function() {
			oo.EventEmitter = function OoEventEmitter() {
				this
					.bindings = {};
			};
			oo.initClass(oo.EventEmitter);

			function validateMethod(method, context) {
				if(typeof method === 'string') {
					if(context === undefined || context === null) {
						throw new Error('Method name "' + method + '" has no context.');
					}
					if(typeof context[method] !== 'function') {
						throw new Error('Property "' + method + '" is not a function');
					}
				} else if(typeof method !== 'function') {
					throw new Error('Invalid callback. Function or method name expected.');
				}
			}
			oo.EventEmitter.prototype.on = function(event, method, args, context) {
				var bindings;
				validateMethod(method, context);
				if(hasOwn.call(this.bindings, event)) {
					bindings = this.bindings[event];
				} else {
					bindings = this.bindings[event] = [];
				}
				bindings.push({
					method: method,
					args: args,
					context: (arguments.length < 4) ? null : context
				});
				return this;
			};
			oo.EventEmitter.prototype.once = function(event, listener) {
				var eventEmitter = this,
					wrapper = function() {
						eventEmitter.off(event, wrapper);
						return listener.apply(this, arguments);
					};
				return this.on(event, wrapper);
			};
			oo.EventEmitter.prototype.off = function(event, method, context) {
				var i, bindings;
				if(arguments.length === 1) {
					delete this.bindings[event];
					return this;
				}
				validateMethod(method, context);
				if(!hasOwn.call(this.bindings, event) || !this.bindings[event].length) {
					return this;
				}
				if(arguments.length < 3) {
					context = null;
				}
				bindings = this.bindings[event];
				i = bindings.length;
				while(i--) {
					if(bindings[i].method === method && bindings[i].context === context) {
						bindings.splice(i, 1);
					}
				}
				if(bindings.length === 0) {
					delete this.bindings[event];
				}
				return this;
			};
			oo.EventEmitter.prototype.emit = function(event) {
				var args = [],
					i, len, binding, bindings, method;
				if(hasOwn.call(this.bindings, event)) {
					bindings = this.bindings[event].slice();
					for(i = 1, len = arguments.length; i < len; i++) {
						args.push(arguments[i]);
					}
					for(i = 0, len = bindings.length; i < len; i++) {
						binding = bindings[i];
						if(typeof binding.method === 'string') {
							method = binding.context[binding.method];
						} else {
							method = binding.method;
						}
						method.apply(binding.context, binding.args ? binding.args.concat(args) : args);
					}
					return true;
				}
				return false;
			};
			oo.EventEmitter.prototype.connect = function(context, methods) {
				var method, args, event;
				for(event in methods) {
					method = methods[event];
					if(Array.isArray(method)) {
						args = method.slice(1);
						method = method[0];
					} else {
						args = [];
					}
					this.on(event, method, args, context);
				}
				return this;
			};
			oo.EventEmitter.prototype.disconnect = function(context, methods) {
				var i, event, method, bindings;
				if(methods) {
					for(event in methods) {
						method = methods[event];
						if(Array.isArray(method)) {
							method = method[0];
						}
						this.off(event, method, context);
					}
				} else {
					for(event in this.bindings) {
						bindings = this.bindings[event];
						i = bindings.length;
						while(i--) {
							if(bindings[i] && bindings[i].context === context) {
								this.off(event, bindings[i].method, context);
							}
						}
					}
				}
				return this;
			};
		}());
		(function() {
			oo.EmitterList = function OoEmitterList() {
				this.items = [];
				this.aggregateItemEvents = {};
			};

			function normalizeArrayIndex(arr, index) {
				return(index === undefined || index < 0 || index >= arr.length) ? arr.length : index;
			}
			oo.EmitterList.prototype.getItems = function() {
				return this.items.slice(0);
			};
			oo.EmitterList.prototype.getItemIndex = function(item) {
				return this.items.indexOf(item);
			};
			oo.
			EmitterList.prototype.getItemCount = function() {
				return this.items.length;
			};
			oo.EmitterList.prototype.isEmpty = function() {
				return !this.items.length;
			};
			oo.EmitterList.prototype.aggregate = function(events) {
				var i, item, add, remove, itemEvent, groupEvent;
				for(itemEvent in events) {
					groupEvent = events[itemEvent];
					if(Object.prototype.hasOwnProperty.call(this.aggregateItemEvents, itemEvent)) {
						if(groupEvent) {
							throw new Error('Duplicate item event aggregation for ' + itemEvent);
						}
						for(i = 0; i < this.items.length; i++) {
							item = this.items[i];
							if(item.connect && item.disconnect) {
								remove = {};
								remove[itemEvent] = ['emit', this.aggregateItemEvents[itemEvent], item];
								item.disconnect(this, remove);
							}
						}
						delete this.aggregateItemEvents[itemEvent];
					}
					if(groupEvent) {
						this.aggregateItemEvents[itemEvent] = groupEvent;
						for(i = 0; i < this.items.length; i++) {
							item = this.items[i];
							if(item.connect && item.disconnect) {
								add = {};
								add[itemEvent] = ['emit', groupEvent, item];
								item.connect(this, add);
							}
						}
					}
				}
			};
			oo.EmitterList.prototype.addItems = function(items, index) {
				var i, oldIndex;
				if(!Array.isArray(items)) {
					items = [items];
				}
				if(items.length === 0) {
					return this;
				}
				index = normalizeArrayIndex(this.items, index);
				for(i = 0; i < items.length; i++) {
					oldIndex = this.items.indexOf(items[i]);
					if(oldIndex !== -1) {
						index = this.moveItem(items[i], index);
						this.emit('move', items[i], index, oldIndex);
					} else {
						index = this.insertItem(items[i], index);
						this.emit('add', items[i], index);
					}
					index++;
				}
				return this;
			};
			oo.EmitterList.prototype.moveItem = function(item, newIndex) {
				var existingIndex = this.items.indexOf(item);
				if(existingIndex === -1) {
					throw new Error('Item cannot be moved, because it is not in the list.');
				}
				newIndex = normalizeArrayIndex(this.items, newIndex);
				this.items.splice(existingIndex, 1);
				newIndex--;
				this.items.splice(newIndex, 0, item);
				return newIndex;
			};
			oo.EmitterList.prototype.insertItem = function(item, index) {
				var events, event;
				if(item.connect && item.disconnect) {
					events = {};
					for(event in this.aggregateItemEvents) {
						events[event] = ['emit', this.aggregateItemEvents[event], item];
					}
					item.connect(this, events);
				}
				index = normalizeArrayIndex(this.items,
					index);
				this.items.splice(index, 0, item);
				return index;
			};
			oo.EmitterList.prototype.removeItems = function(items) {
				var i, item, index;
				if(!Array.isArray(items)) {
					items = [items];
				}
				if(items.length === 0) {
					return this;
				}
				for(i = 0; i < items.length; i++) {
					item = items[i];
					index = this.items.indexOf(item);
					if(index !== -1) {
						if(item.connect && item.disconnect) {
							item.disconnect(this);
						}
						this.items.splice(index, 1);
						this.emit('remove', item, index);
					}
				}
				return this;
			};
			oo.EmitterList.prototype.clearItems = function() {
				var i, item, cleared = this.items.splice(0, this.items.length);
				for(i = 0; i < cleared.length; i++) {
					item = cleared[i];
					if(item.connect && item.disconnect) {
						item.disconnect(this);
					}
				}
				this.emit('clear');
				return this;
			};
		}());
		oo.SortedEmitterList = function OoSortedEmitterList(sortingCallback) {
			oo.EmitterList.call(this);
			this.sortingCallback = sortingCallback;
			this.aggregate({
				sortChange: 'itemSortChange'
			});
			this.connect(this, {
				itemSortChange: 'onItemSortChange'
			});
		};
		oo.mixinClass(oo.SortedEmitterList, oo.EmitterList);
		oo.SortedEmitterList.prototype.onItemSortChange =
			function(item) {
				this.removeItems(item);
				this.addItems(item);
			};
		oo.SortedEmitterList.prototype.setSortingCallback = function(sortingCallback) {
			var items = this.getItems();
			this.sortingCallback = sortingCallback;
			this.clearItems();
			this.addItems(items);
		};
		oo.SortedEmitterList.prototype.addItems = function(items) {
			var index, i, insertionIndex;
			if(!Array.isArray(items)) {
				items = [items];
			}
			if(items.length === 0) {
				return this;
			}
			for(i = 0; i < items.length; i++) {
				insertionIndex = this.findInsertionIndex(items[i]);
				if(insertionIndex <= this.items.length && this.items[insertionIndex] && this.sortingCallback(this.items[insertionIndex], items[i]) === 0) {
					this.removeItems(this.items[insertionIndex]);
				}
				index = this.insertItem(items[i], insertionIndex);
				this.emit('add', items[i], insertionIndex);
			}
			return this;
		};
		oo.SortedEmitterList.prototype.findInsertionIndex = function(item) {
			var list = this;
			return oo.binarySearch(this.items, function(otherItem) {
				return list.sortingCallback(item, otherItem);
			}, true);
		};
		oo.Registry = function OoRegistry() {
			oo.EventEmitter.call(this);
			this.registry = {};
		};
		oo.mixinClass(oo.Registry, oo.EventEmitter);
		oo.Registry.prototype.register = function(name, data) {
			var i, len;
			if(typeof name === 'string') {
				this.registry[name] = data;
				this.emit('register', name, data);
			} else if(Array.isArray(name)) {
				for(i = 0, len = name.length; i < len; i++) {
					this.register(name[i], data);
				}
			} else {
				throw new Error('Name must be a string or array, cannot be a ' + typeof name);
			}
		};
		oo.Registry.prototype.unregister = function(name) {
			var i, len, data;
			if(typeof name === 'string') {
				data = this.lookup(name);
				if(data !== undefined) {
					delete this.registry[name];
					this.emit('unregister', name, data);
				}
			} else if(Array.isArray(name)) {
				for(i = 0, len = name.length; i < len; i++) {
					this.unregister(name[i]);
				}
			} else {
				throw new Error('Name must be a string or array, cannot be a ' + typeof name);
			}
		};
		oo.Registry.prototype.lookup = function(name) {
			if(hasOwn.call(this.registry, name)) {
				return this.registry[name];
			}
		};
		oo.Factory = function OoFactory() {
			oo.Factory.parent.call(this);
		};
		oo.inheritClass(oo.Factory, oo.Registry);
		oo.Factory.prototype.
		register = function(constructor) {
			var name;
			if(typeof constructor !== 'function') {
				throw new Error('constructor must be a function, cannot be a ' + typeof constructor);
			}
			name = constructor.static && constructor.static.name;
			if(typeof name !== 'string' || name === '') {
				throw new Error('Name must be a string and must not be empty');
			}
			oo.Factory.parent.prototype.register.call(this, name, constructor);
		};
		oo.Factory.prototype.unregister = function(constructor) {
			var name;
			if(typeof constructor !== 'function') {
				throw new Error('constructor must be a function, cannot be a ' + typeof constructor);
			}
			name = constructor.static && constructor.static.name;
			if(typeof name !== 'string' || name === '') {
				throw new Error('Name must be a string and must not be empty');
			}
			oo.Factory.parent.prototype.unregister.call(this, name);
		};
		oo.Factory.prototype.create = function(name) {
			var obj, i, args = [],
				constructor = this.lookup(name);
			if(!constructor) {
				throw new Error('No class registered by that name: ' + name);
			}
			for(i = 1; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			obj =
				createObject(constructor.prototype);
			constructor.apply(obj, args);
			return obj;
		};
		if(typeof module !== 'undefined' && module.exports) {
			module.exports = oo;
		} else {
			global.OO = oo;
		}
	}(this));
	window.OO = module.exports;
});
mw.loader.implement("site",
	"(function(){var mod={events:null,IsPC:function(){var userAgentInfo=navigator.userAgent;var Agents=new Array(\"Android\",\"iPhone\",\"SymbianOS\",\"Windows Phone\",\"iPad\",\"iPod\");var flag=!0;for(var v=0;v\u003CAgents.length;v++){if(userAgentInfo.indexOf(Agents[v])\u003E0){flag=!1;break;}}return flag;},int:function(submitBtn){mod.sub=submitBtn;if(mod.IsPC()){mod.events='click';}else{mod.events='touchstart';};mod.checks();},checks:function(){var ev=mod.events,btn=mod.sub;$('.input-lg').attr('contenteditable','true');$('.detection-text').on(\"keydown\",function(e){var keyCode=0,e=e||event;if(e.keyCode==13){e.preventDefault();}});btn.on(ev,function(){var vals=$.trim($('.input-lg').text());if(vals===''){$('.result').html('');$('.result').html('\u003Ch3\u003E请您输入要诊断的内容\u003C/h3\u003E');}else{var len=$('#data span').length-1;if(len\u003C0){alert('页面标签错误');return false;}var newurl='/'+window.wgWikiname+\"/joyme_api.php?action=InterestTesting\";$.ajax({url:newurl,type:\"get\",async:!1,data:{\"vals\":vals,\n\"len\":len},success:function(msg){var data=eval('('+msg+')');if(data['rs']==1){$('.result').html('');var title=$('#data span').eq(data['result']).attr('title');img_url=$('#data span').eq(data['result']).attr('data-img');url=$('#data span').eq(data['result']).attr('data-url');var html='\u003Cspan\u003E'+vals+title+'\u003C/span\u003E\u003Ca href=\"'+url+'\"\u003E\u003Cimg src=\"'+img_url+'\"\u003E\u003C/a\u003E';$('.result').html(html);}else{alert('程序异常');}}})}});}};mod.int($('.submit'));});var now_num=0;var num_count=$(\".change_img\").length-1;$(\"#chara_change\").click(function(){now_num=now_num+1;$(\".change_img\").hide();$(\".change_img:eq(\"+now_num+\")\").fadeIn();$(\".change_name\").hide();$(\".change_name:eq(\"+now_num+\")\").fadeIn();$(\".change_illust\").hide();$(\".change_illust:eq(\"+now_num+\")\").fadeIn();if(now_num==num_count){now_num=-1;}});$(\"#vote_reason_open\").click(function(){$(this).hide();$(\".vote_reason\").show();$(\"#vote_reason_close\").show();});$(\"#vote_reason_close\").click(function(){$(this).hide();$(\".vote_reason\").hide();$(\n\"#vote_reason_open\").show();});var now_date=$(\"#now_date\").text();if($(\"#create_date\").html()!=\"\"){$(\".get_date\").each(function(){var texta=$(this).find(\"textarea\").val();$(this).attr(\"temp\",texta);});$(\".get_date_score\").each(function(){var s_text=$(this).find(\"textarea\").val();var s_num=getRadio($(this).find(\"input\"));$(this).attr(\"temp\",s_num+s_text);$(this).attr(\"num_temp\",s_num);});}function j_date(condition,date_id){if(condition){if(date_id.attr(\"old_date\")==null){var old_date=date_id.find(\"textarea\").val();date_id.attr(\"old_date\",old_date);}date_id.find(\"textarea\").val(now_date);}else{var old_date=date_id.attr(\"old_date\");date_id.find(\"textarea\").val(old_date);}}$(\"textarea\").parents(\"div .get_date\").change(function(){var now_text=$(this).find(\"textarea\").val();var id_name=$(this).attr(\"id\");var date_id=$(\"#\"+id_name+\"_date\");var bef_text=$(this).attr(\"temp\");j_date(now_text!=bef_text,date_id);});$(\"textarea\").parents(\"div .get_date_score\").change(function(){contentChange($(this\n));});$(\"input\").change(function(){var id_name=$(this).parents(\".get_date_score\").attr(\"id\");var s_num=$(this).attr(\"value\");$(\"#\"+id_name).attr(\"num_temp\",s_num);contentChange($(this).parents(\".get_date_score\"));});function contentChange(aid){var s_text=aid.find(\"textarea\").val();var s_num=aid.attr(\"num_temp\");var now_text=s_num+s_text;var id_name=aid.attr(\"id\");var date_id=$(\"#\"+id_name+\"_date\");var bef_text=aid.attr(\"temp\");j_date(now_text!=bef_text,date_id);}function getRadio(score_id){var r_num=999;score_id.each(function(){var ck=$(this).attr(\"checked\");var num=$(this).attr(\"value\");if(typeof(ck)!=\"undefined\"){r_num=num;}});return r_num;}var now_champ_level=7;$(\"#champ_lv1_btn\").click(function(){changeLevel(1)});$(\"#champ_lv2_btn\").click(function(){changeLevel(2)});$(\"#champ_lv3_btn\").click(function(){changeLevel(3)});$(\"#champ_lv4_btn\").click(function(){changeLevel(4)});$(\"#champ_lv5_btn\").click(function(){changeLevel(5)});$(\"#champ_lv6_btn\").click(function(){changeLevel(6)});$(\n\"#champ_lv7_btn\").click(function(){changeLevel(7)});function changeLevel(levelNum){if(now_champ_level==levelNum){return;}$(\".level_btn\").css({\"color\":\"#7b6855\",\"background-color\":\"#403830\"});$(\"#champ_lv\"+levelNum+\"_btn\").css({\"color\":\"#2b251f\",\"background-color\":\"#af9983\"});$(\".cl_val\").css(\"display\",\"none\");$(\".cl\"+levelNum+\"val\").css(\"display\",\"\");now_champ_level=levelNum;}$(\".box_type_a_title div\").mouseover(function(){var divindex=$(this).index();$(\".box_type_a_title div\").css({\"border-bottom\":\"0px solid #A79585\",\"color\":\"#6B5847\"});$(this).css({\"border-bottom\":\"3px solid #A79585\",\"color\":\"#C11E1E\"});$(\".box_type_a_content .a_c\").css(\"display\",\"none\");$(\".box_type_a_content .a_c\").eq(divindex).css(\"display\",\"\");});$(\".box_type_c_title div\").mouseover(function(){var divindex=$(this).index();$(\".box_type_c_title div\").css({\"border-bottom\":\"0px solid #A79585\",\"color\":\"#6B5847\"});$(this).css({\"border-bottom\":\"3px solid #A79585\",\"color\":\"#C11E1E\"});$(\".box_type_c_content .c_c\").css(\n\"display\",\"none\");$(\".box_type_c_content .c_c\").eq(divindex).css(\"display\",\"\");});var imgcount=0;var nowNum=0;var imgtime;var get_num=Math.floor(Math.random()*20);var onLeft=0;var onTop=36*get_num*-1;var offLeft=-32;var offTop=onTop;function imgplay(){if(nowNum\u003Cimgcount){nowNum=nowNum+1;}else{nowNum=0;}nowimg(nowNum);barplay();}function play(){imgtime=window.setInterval(\"imgplay()\",8000);}function barplay(){$(\"#imgbar\").stop().animate({width:\"0%\"});$(\"#imgbar\").animate({width:\"100%\"},8000);}function nowimg(listID){$(\".timg\").removeAttr(\"id\");$(\".timg\").eq(listID).attr(\"id\",\"ti_on\");$(\".timg\").css(\"background-position\",offLeft+'px '+offTop+'px');$(\".timg\").eq(listID).css(\"background-position\",onLeft+'px '+onTop+'px');$(\"#topimg a\").css(\"display\",\"none\");$(\"#topimg a\").eq(listID).fadeIn();}$(\"#imglist\").on(\"click\",\".timg\",function(){var listNum=$(this).index();nowimg(listNum);nowNum=listNum;window.clearInterval(imgtime);play();barplay();});function indexPlay(){if($(\"#topimg\").length!=0){\nvar imgHtml=$(\"#topimg p\").html();$(\"#topimg p\").remove();$(\"#topimg\").prepend(imgHtml);imgcount=$(\"#topimg a:last\").index();if(imgcount\u003C=0){$(\"#imglist\").css(\"display\",\"none\");$(\"#imgbar\").css(\"display\",\"none\");window.clearInterval(imgtime);return;}$(\".timg\").css(\"background-position\",offLeft+'px '+offTop+'px');$(\".timg:first\").css(\"background-position\",onLeft+'px '+onTop+'px');$(\".timg:first\").attr(\"id\",\"ti_on\");play();barplay();}}$(\".GL_btn\").click(function(){var pageindex=$(this).index();$(\".GL_btn\").removeClass(\"GL_btn_on\");$(this).addClass(\"GL_btn_on\");$(\".GL_page\").hide();$(\".GL_page\").eq(pageindex).fadeIn();});$(\".growtable\").each(function(){var trCount=$(this).find(\"tr\").length;var thCount=$(this).find(\"th\").length;for(var i=0;i\u003CthCount-1;i++){var hb_attr=0;for(var j=0;j\u003CtrCount-1;j++){var b_attr=$(this).find(\"tr\").eq(j+1).find(\"td:eq(\"+(i+1)+\")\");var nhp=parseFloat(b_attr.text());var cz=nhp-hb_attr;console.log(nhp);if(nhp\u003Ehb_attr){if(j\u003E0){b_attr.css(\"background-color\",\n\"#ffcf7b\");b_attr.append(\"\u003Cdiv style='font-size:9px;color: #ad7438;line-height: 14px;'\u003E+\"+parseFloat(cz.toFixed(1))+\"\u003C/div\u003E\");}hb_attr=nhp;}}}});$(document).click(function(e){var v_cl=$(e.target).attr('class');var v_id=$(e.target).attr('id');if(v_cl!=null\u0026\u0026v_cl==\"xbtn\"){$(\".xbtn2\").hide();$(\".xbtn\").css(\"opacity\",\"0.5\");$(\"#\"+v_id+\"b\").show();$(\"#\"+v_id+\"a\").css(\"opacity\",\"1\");$(\"#\"+v_id).css(\"opacity\",\"1\");}});$(\".flip\").click(function(){$(\".panel\").slideToggle(\"fast\");});$(\".show_btn\").click(function(e){var my_id=$(e.target).attr('id');$(\"#\"+my_id+\"b\").show();$(\"#\"+my_id).hide();});$(\".hide_btn\").click(function(e){var my_id=$(e.target).attr('id');$(\"#\"+my_id+\"_hb\").hide();$(\"#\"+my_id+\"_h\").show();});$(\".sh_hide_btn\").click(function(){$(this).parent(\".sh_content\").hide();$(this).parent(\".sh_content\").siblings(\".sh_show_btn\").show();});$(\".sh_show_btn\").click(function(){$(this).parent(\".sh_box\").find(\".sh_content\").show();$(this).hide();});$(\".team_box_show_btn\").click(function(){var\nnow_team=$(this).parents(\".team_box\");now_team.find(\".team_box_info\").show();now_team.find(\".team_box_hide_btn\").show();$(this).hide();});$(\".team_box_hide_btn\").click(function(){var now_team=$(this).parents(\".team_box\");now_team.find(\".team_box_info\").hide();now_team.find(\".team_box_show_btn\").show();$(this).hide();});$(\".carvestone_pos\").click(function(){$(\".c_target\").remove();var title=\"div[title=C_\"+$(this).attr(\"title\")+\"]\";var top_pos=$(title).offset().top-$(window).height()/2;var left_pos=$(title).offset().left;$(title).prepend('\u003Cdiv class=\"c_target\" title=\"点击清除定位提示\" style=\"margin-right:4px;cursor:pointer;background-color:red;border-radius:20px;padding:0px 6px 0px 6px;font-size:9px;color:#fff;display:inline-block\"\u003EHERE\u003C/div\u003E');$(\"html,body\").animate({scrollTop:top_pos},100);return false;});$(\"div\").on(\"click\",\".c_target\",function(){$(this).remove();});function getUrlParam(name){var reg=new RegExp(\"(^|\u0026)\"+name+\"=([^\u0026]*)(\u0026|$)\");var r=window.location.search.substr(\n1).match(reg);if(r!=null)return unescape(r[2]);return null;}function ec(content){return encodeURI(content).replace(/%/g,\"@\");}function dc(content){return decodeURI(content.replace(/@/g,\"%\"));}$(\".nclink\").each(function(){var nctitle=$(this).attr(\"title\");var nctext=$(this).html();var ecnc=ec(nctext);var repnc=ecnc.replace(/@3Cp@3E/g,\"\")\nvar repnc2=repnc.replace(/@3C\\/p@3E@0A/g,\"\")\n$(this).replaceWith('\u003Ca href=\"http://wiki.joyme.com/cq/index.php?title='+nctitle+'\u0026action=edit\u0026nclink='+repnc2+'\" target=\"_blank\"\u003E'+nctitle+'\u003C/a\u003E');})\nvar ncval=getUrlParam(\"nclink\");if(ncval!=null){var historytext=$(\"#wpTextbox1\").val();if(historytext!=\"\"){alert(\"此页面已被创建，若需继续创建，请先删除本页面内容再重试。\")}else{var dcncval=dc(getUrlParam(\"nclink\"));$(\"#wpTextbox1\").val(dcncval);}}var get_text_f=$(\"#text_to_html\").text();if(get_text_f!=\"\"){$(\"#text_to_html\").html(get_text_f);$(\"#text_to_html\").show();}$('#createPage').hide();var show_p=getUrlParam(\"showpage\");if(show_p==\"true\"){$('#createPage').show();}$(\".eclink\").each(function(){var eclink=$(this);var eclinkUrl=eclink.attr(\"href\");eclink.attr(\"href\",eclinkUrl+ec(eclink.attr(\"title\")));eclink.attr(\"title\",eclink.text());});var changeAttr=getUrlParam(\"changeAttr\");if(changeAttr!=null){changeAttr=dc(changeAttr);var textbox=$('#wpTextbox1');var attrArray=changeAttr.split('-');for(var i=0;i\u003CattrArray.length;i++){var thisAttr=attrArray[i].split('_');var attrName=\"|\"+thisAttr[0]+\"=\";var startIndex=textbox.html().indexOf(attrName,0);if(startIndex\n\u003E=0){var endIndex=textbox.html().indexOf(\"|\",startIndex+1);if(endIndex==-1){endIndex=textbox.html().indexOf(\"}}\",startIndex+1);}var getStr=textbox.html().substr(startIndex,endIndex-startIndex);var regx=new RegExp('\\\\'+getStr,'g');textbox.html(textbox.html().replace(regx,attrName+thisAttr[1]+'\\n'));}else{textbox.html(textbox.html().replace(/\\}\\}/ig,attrName+thisAttr[1]+'\\n'+'}}'));}}}var changeRemark=getUrlParam(\"changeRemark\");if(changeRemark!=null){$(\"#wpSummary\").val(dc(changeRemark));}var autoSave=getUrlParam(\"autoSave\");if(autoSave==\"true\"){$(\"#wpSave\").click();}var delRemark=getUrlParam(\"delRemark\");if(delRemark!=null){$(\"#wpReason\").val(dc(delRemark));}var autoDel=getUrlParam(\"autoDel\");if(autoDel==\"true\"){$(\"#wpConfirmB\").click();}$(\".target_blank\").each(function(){$(this).attr(\"target\",\"_blank\");});$(\".showbox\").each(function(){var max_h=parseInt($(this).attr(\"title\"));if(max_h\u003E0){var box_h=$(this).height();if(box_h\u003Emax_h){$(this).css(\"height\",max_h);$(this).find(\".openbox\").\nshow();$(this).find(\".moretext\").show();$(this).attr(\"target\",\"false\");$(this).attr(\"val\",max_h);}$(this).attr(\"title\",\"\");}});$(\".openbox\").click(function(){var parCla=$(this).parents(\".showbox\");var boxopen=parCla.attr(\"target\");var boxheight=parCla.attr(\"val\");if(boxopen==\"false\"){parCla.attr(\"target\",\"true\");$(this).text(\"折叠\");parCla.css(\"height\",\"auto\");parCla.find(\".moretext\").hide();parCla.css(\"margin-bottom\",\"2px\");}else{parCla.attr(\"target\",\"false\");$(this).text(\"展开\");parCla.css(\"height\",boxheight+\"px\");parCla.find(\".moretext\").show();parCla.css(\"margin-bottom\",\"18px\");}});$(function(){IMAGE_LIST=[];if($(window).width()\u003C=750){var html=$(\"#hero_move_frame\").html();$(\"#hero_move_frame_go\").html(html);$(\"#hero_move_frame\").html('');}if($(window).width()\u003E750){$(\".cqtt a\").each(function(e){$(this).attr('title',\"\");});$(\".cqtt\").mouseover(cqtt_process);$(\".cqtt\").mouseout(tthide);}else{$(\".cq_main_page\").css('min-height',$(window).height()-5-35-45);$(\".main_page_m_nav ul li\"\n).click(main_page_switch);}$(\"ul.cq_class_nav li\").click(class_nav_switch);if($('body').hasClass('page-沙盒')){if($('#joyme_canvas').length\u003E0){var canvas='\u003Ccanvas id=\"canvas\" height=\"200\" width=\"225\" data-msg=\"255_攻击力|255_体力|255_暴击率|255_物理防御|255_魔法防御\" data-bgcolor=\"221,94,0,0.4\" data-color=\"0,0,0,0.6\" data-size=\"200\"\u003Ecanvas\u003C/canvas\u003E'\n$('#joyme_canvas').html(canvas);$.getScript('http://cq.joyme.com/extensions/jsscripts/canvas.js',function(){var radarTest=new RadarChart(\"canvas\");radarTest.draw();});}}function tthide(){var type=getTTdata(this,'type');if(type==\"\"){return false}var name=getTTdata(this,'name');if(name==\"\"){return false}var hero=getTTdata(this,'hero');var ttid;if(hero==\"\"){ttid=type+'-'+name;}else{ttid=type+'-'+hero;}ttid=ttid.replace('.','-');$('#'+ttid).hide();}function ttshow(obj,ttid){var tt=$('#'+ttid);var window_h=$(window).height();var window_w=$(window).width();var top,left;left=$(obj).offset().left;if(left\u003Ewindow_w/2){left-=tooltips.outerWidth()+10;}else{left+=obj.offsetWidth+10;}top=$(obj).offset().top-$(document).scrollTop();;if(tooltips.outerHeight()\u003Ewindow_h){top=10;}else if(top+tooltips.outerHeight()\u003Ewindow_h){top=window_h-tooltips.outerHeight()-10;}tooltips.css(\"top\",top);tooltips.css(\"left\",left);tooltips.show();}function cqtt_process(){var type=getTTdata(this,'type');if(type==\"\"){return false\n}var name=getTTdata(this,'name');if(name==\"\"){return false}var hero=getTTdata(this,'hero');var ttid;if(hero==\"\"){ttid=type+'-'+name;}else{ttid=type+'-'+hero;}ttid=ttid.replace('.','-');if($('#'+ttid).length==0){var text='\u003Cdiv id=\"'+ttid+'\" class=\"cqtooltip\"\u003E\u003C/div\u003E'\n$(\"body\").append(text);var tt=$('#'+ttid);var html='';switch(type){case\"weapon\":html=getWeaponhtml(this);break;case\"skill\":html=getSkillhtml(this);break;case\"spskill\":html=getSpskillhtml(this);break;default:return false;}tooltips.html(html);ttshow(this,ttid);}else{ttshow(this,ttid);}}function getWeaponhtml(obj,name){var html='';var name=getTTdata(obj,'name');var star=getTTdata(obj,'star');var job=getTTdata(obj,'job');var atk=getTTdata(obj,'atk');var spd=getTTdata(obj,'spd');var effect=getTTdata(obj,'effect');var score=getTTdata(obj,'score');var image_html;html+='\u003Cdiv class=\"tt_weapon\"\u003E';html+='\u003Cdiv class=\"weapon_icon';html+=get_wiki_image_html(name+'.png',45,45);html+='\u003C/div\u003E';html+='\u003Cdiv class=\"name\"\u003E'+name+'\u003C/div\u003E';html+='\u003Cdiv class=\"star\"\u003E'+star+'\u003C/div\u003E';html+='\u003Cdiv class=\"job';html+=get_wiki_image_html(job+'_icon_s.png');html+='\u003C/div\u003E';html+='\u003Cdiv class=\"attack\"\u003E攻击力\u003Cspan\u003E'+atk+'\u003C/span\u003E\u003C/div\u003E';html+='\u003Cdiv class=\"speed\"\u003E攻击速度\u003Cspan\u003E'+spd+'\u003C/span\u003E\u003C/div\u003E';html+=\n'\u003Cdiv class=\"effect\"\u003E\u003Cdiv class=\"title\"\u003E专属特效\u003C/div\u003E\u003Cspan\u003E'+effect+'\u003C/span\u003E\u003C/div\u003E';if(score!=''){html+='\u003Cdiv class=\"score\"\u003E\u003Cdiv class=\"title\"\u003E专武评级\u003C/div\u003E\u003Cspan\u003E\u003Cspan class=\"star_icon\"\u003E';for(var i=1;i\u003C=score;i++){html+='\u003Cspan class=\"';html+=get_wiki_image_html('Star.png');html+='\u003C/span\u003E';}html+='\u003C/span\u003E\u003C/span\u003E\u003C/div\u003E';}html+='\u003C/div\u003E';return html;}function getSkillhtml(obj){var html='';var name=getTTdata(obj,'name');var type=getTTdata(obj,'passive-type');var desc=getTTdata(obj,'desc');var passive=getTTdata(obj,'passive');var image_html;html+='\u003Cdiv class=\"tt_skill\"\u003E';html+='\u003Cdiv class=\"icon';html+=get_wiki_image_html(name+'.png',51,51);html+='\u003C/div\u003E';if(type==''){html+='\u003Cdiv class=\"name\"\u003E';}else{html+='\u003Cdiv class=\"name havepassive\"\u003E';html+='\u003Cspan class=\"main\"\u003E【'+type+'】\u003C/span\u003E\u003Cbr\u003E';}html+=name+'\u003C/div\u003E';html+='\u003Cdiv class=\"description\"\u003E'+desc+'\u003C/div\u003E';if(type!=''){html+='\u003Cdiv class=\"passive\"\u003E被动（'+type+'）：'+passive+'\u003C/div\u003E';}html+='\u003C/div\u003E';return html;}function\ngetSpskillhtml(obj){var html='';var name=getTTdata(obj,'name');var type=getTTdata(obj,'passive-type');var desc=getTTdata(obj,'desc');var passive=getTTdata(obj,'passive');var image_html;html+='\u003Cdiv class=\"tt_spskill\"\u003E';html+='\u003Cdiv class=\"icon';html+=get_wiki_image_html(name+'.png',51,51);html+='\u003C/div\u003E';html+='\u003Cspan class=\"name\"\u003E'+name+'\u003C/span\u003E';html+='\u003Cdiv class=\"description\"\u003E'+desc+'\u003C/div\u003E';html+='\u003C/div\u003E';return html;}function getTTdata(obj,name){var text=$(obj).attr(\"data-\"+name);if(typeof(text)==\"undefined\"){text=\"\"}return text;}function get_wiki_image_html(image_name,width,height){var image_id=$.inArray(image_name,IMAGE_LIST);if(image_id==-1){image_id=IMAGE_LIST.push(image_name);image_id-=1;}var image_name=IMAGE_LIST[image_id]\nif($('#ttimage').length==0){var text='\u003Cdiv id=\"ttimage\"\u003E\u003C/div\u003E';$(\"body\").append(text);}if($('#img-'+image_id).length==0){var text='\u003Cdiv id=\"img-'+image_id+'\"\u003E\u003C/div\u003E';$(\"#ttimage\").append(text);var url='http://wiki.joyme.com/cq/api.php?format=json\u0026action=query\u0026prop=imageinfo\u0026iiprop=url\u0026titles=File:'+image_name\n$.get(url,function(result){var page=result['query']['pages'];var url='';if(typeof(page[-1])!=\"undefined\"){return'';}for(var num in page){url=page[num]['imageinfo'][0]['url'];}var html='\u003Cimg src=\"'+url+'\" ';if(typeof(width)!=\"undefined\"){html+='width=\"'+width+'\"';}if(typeof(height)!=\"undefined\"){html+='height=\"'+height+'\"';}html+='\u003E';$('#img-'+image_id).html(html);$('.img_loading.img-'+image_id).each(function(){$(this).html(html);$(this).removeClass('img_loading');$(this).removeClass('img-'+image_id);});});return' img_loading img-'+image_id+'\"\u003E';}else{var html=$('#img-'+image_id).html();if(html==''){return' img_loading img-'+image_id+'\"\u003E';}else{return'\"\u003E'+$('#img-'+image_id).html();}}}});function main_page_switch(){if($(this).hasClass('current')){return false}var id=getTTdata(this,'id');console.log(id);$('.current').removeClass('current');$(this).addClass('current');$('.cq_menu_item').each(function(){$(this).hide()});var new_page=$('#'+id);new_page.show();}function class_nav_switch(){if\n(!$(this).hasClass('force')){if($(this).hasClass('current')){return false}}var type=getTTdata($(this).parent(),'type');var name=$(this).text();var url='http://wiki.joyme.com/cq/'+name+type;window.location.href=url;}$(function(){$(\".joymewiki-tooltips\").each(function(){$(this).find('a').attr('title',\"\");$(this).mouseover(joymewiki_tooltips_show);$(this).mouseout(joymewiki_tooltips_hide);});function joymewiki_tooltips_hide(){$(this).children('.joymewiki-tooltips-sub').hide();}function joymewiki_tooltips_show(){tooltips=$(this).children('.joymewiki-tooltips-sub');var window_h=$(window).height();var window_w=$(window).width();var top,left;left=$(this).offset().left;if(left\u003Ewindow_w/2){left-=tooltips.outerWidth()+10;}else{left+=$(this)[0].offsetWidth+10;}top=$(this).offset().top-$(document).scrollTop();if(tooltips.outerHeight()\u003Ewindow_h){top=10;}else if(top+tooltips.outerHeight()\u003Ewindow_h){top=window_h-tooltips.outerHeight()-10;}tooltips.css(\"top\",top);tooltips.css(\"left\",left);tooltips.\nshow();}});$(function(){$('.edit-button a').each(function(){$(this).attr('target','_self')});});$(function(){document.domain=\"wiki.joyme.com\";function isPC(){var userAgentInfo=navigator.userAgent;var Agents=new Array(\"Android\",\"iPhone\",\"SymbianOS\",\"Windows Phone\",\"iPad\",\"iPod\");var flag=!0;for(var v=0;v\u003CAgents.length;v++){if(userAgentInfo.indexOf(Agents[v])\u003E0){flag=!1;break;}}return flag;}function getEventLayerHTML(){html='\u003Cdiv class=\"eventBG\"\u003E\u003Cdiv class=\"eventBox\"\u003E'+'\u003Ciframe frameborder=\"0\" scrolling=\"auto\" src=\"http://hezuo.joyme.com/new/?c=cq\u0026a=index\"\u003E\u003C/iframe\u003E'+'\u003C/div\u003E\u003C/div\u003E';return html;}var window_width=$(window).width();function getLoginStatus(){var userid=mw.config.get('wgUserId');return(userid==null);}if(window_width\u003E=768){function set_height(){var window_height=$(window).height();if(window_height\u003C627){$('.eventBox').css('top','0');$('.eventBox iframe').height(window_height);}else{var padding_top=(window_height-627)/2;if(padding_top\u003E100){padding_top=100;}$('.eventBox').\ncss('top',padding_top);}}$(\"#event_0909\").click(function(){if(getLoginStatus()){alert(\"请先登录着迷网！\");return;}console.log('PC端');$(\"body\").find('.eventBG').remove();$(\"body\").append(getEventLayerHTML);$(\"body\").addClass('eventDivOn');set_height();$(window).scroll(function(){set_height();});});}else{$(\"#event_0909\").click(function(){if(getLoginStatus()){alert(\"请先登录着迷网！\");return;}console.log('移动端');$(\"body\").find('.eventBG').remove();$(\"body\").append(getEventLayerHTML);$(\"body\").addClass('eventDivOn');$('.eventBox').css('width',$(window).width());$('.eventBox').css('height',$(window).height());});}});var hid=\"box1\";function sorh(nid){if(hid==nid){return;}document.getElementById(nid).style.display=\"\";document.getElementById(hid).style.display=\"none\";hid=nid;}if(mw.config.get('wgPageName')==='沙盒'){mw.loader.load('/cq/index.php?title=沙盒/css\u0026action=raw\u0026ctype=text/css','text/css');}$.getScript(\n\"index.php?title=MediaWiki:%E5%8A%A0%E5%BC%BA%E6%A8%A1%E5%9D%97.js\u0026action=raw\u0026ctype=text/javascript\",function(){DQX.DQX_MODULE();});mw.loader.load(\"/cq/index.php?title=MediaWiki:tools.js\u0026action=raw\u0026ctype=text/javascript\");", {
		"css": [
			"body{background-color:#182e39;background-image:url(http://p7.qhimg.com/dr/2560__/t0131eceb33dc21a057.jpg);background-repeat:no-repeat;background-attachment:fixed;background-position:50% 0} .wiki-person h2{font-size:18px}.wiki-person h2 b{width:68%}.wiki-person{padding:30px 20px 0px 20px}.section-left2{height:740px !important;min-height:630px !important}.section-left2 .wiki-nav{margin-bottom:20px}.wiki-action{padding:5px 0 5px 5px;line-height:22px;border-bottom:1px solid #2a3443;border-top:1px solid #434e5e;margin:0px 20px}.wiki-action .fl{padding-right:1em;font-size:16px;color:#c5d0dd}.wiki-action li{padding-top:0px;font-size:14px;list-style:none; margin-left:0px;padding-left:12px} .wiki-nav a[href$=\"/cq/\"] em{background:url(//p2.qhimg.com/dr/15__/t01a8b9c9efb053eeeb.png)}.wiki-nav a[href*=\"勇士图鉴\"] em{background:url(//p7.qhimg.com/dr/15__/t01957d4cddf3d29f74.png)}.wiki-nav a[href*=\"装备辅助\"] em{background:url(//p0.qhimg.com/dr/15__/t0166ee119b763b0c31.png)}.wiki-nav a[href*=\"技能图鉴\"] em{background:url(//p6.qhimg.com/dr/15__/t019166715d29b7ef3e.png)}.wiki-nav a[href*=\"使徒的复活\"] em{background:url(//p7.qhimg.com/dr/15__/t018aa98df2e69553eb.png)}.wiki-nav a[href*=\"游戏工具\"] em{background:url(//p8.qhimg.com/dr/15__/t016c7e5445e3305e95.png)}.wiki-nav a[href*=\"玩家专区\"] em{background:url(//p9.qhimg.com/dr/15__/t01f76e20cc7937cee2.png)}.wiki-nav .fl em{background-repeat:no-repeat !important;background-position-y:center !important;background-position-x:0em !important;padding-left:1.3em;transition:.15s;-moz-transition:.15s;-webkit-transition:.15s;-o-transition:.15s}.wiki-nav .fl em:hover{//padding-left:1.8em;//background-position-x:0.5em !important;color:#8297b7 !important}.ej a[href*=\"剑士\"]{background:url(//p1.qhimg.com/dr/15__/t012761801fe038deda.png)}.ej a[href*=\"骑士\"]{background:url(//p1.qhimg.com/dr/15__/t015b0f2571edd2f2db.png)}.ej a[href*=\"弓手\"]{background:url(//p4.qhimg.com/dr/15__/t0184e951b295dc80e9.png)}.ej a[href*=\"猎人\"]{background:url(//p0.qhimg.com/dr/15__/t0128e110b9cc0ddef3.png)}.ej a[href*=\"法师\"]{background:url(//p3.qhimg.com/dr/15__/t01c6c541f1bed4acc8.png)}.ej a[href*=\"祭司\"]{background:url(//p4.qhimg.com/dr/15__/t01502a750e9083982a.png)}.ej a[href*=\"精淬武器\"]{background:url(//p5.qhimg.com/dr/15__/t0189f9888cb7c812b2.png)}.ej a[href*=\"戒指\"]{background:url(//p0.qhimg.com/dr/15__/t0133a8e6987d4f3ba5.png)}.ej a[href*=\"服装\"]{background:url(//p2.qhimg.com/dr/15__/t012bdeca5fdcb725fe.png)}.ej a[href*=\"符文\"]{background:url(//p0.qhimg.com/dr/15__/t01d62699316fc7ae8e.png)}.ej a[href*=\"女神\"]{background:url(//p2.qhimg.com/dr/15__/t01d22a448387d9d4f2.png)}.ej a[href*=\"领主\"]{background:url(//p6.qhimg.com/dr/15__/t0194843733e9360501.png)}.ej a[href*=\"勇士标签检索工具\"]{background:url(//p7.qhimg.com/dr/15__/t018aa98df2e69553eb.png)}.ej a[href*=\"克鲁赛德战记技能图鉴\"]{background:url(//p6.qhimg.com/dr/15__/t01e66deea0a0ac5ba6.png)}.ej a[href*=\"影子与少女\"]{background:url(//p5.qhimg.com/dr/18__/t01117007105c84625a.png)}.ej a[href*=\"倒塌的幻想神殿\"]{background:url(//p3.qhimg.com/dr/18__/t014df585703b1aaf84.png)}.ej a[href*=\"愤怒的灵魂要塞\"]{background:url(//p7.qhimg.com/dr/18__/t010cd2360a88ed44e1.png)}.ej a[href*=\"英雄传说地牢黑与白攻略\"]{background:url(//p2.qhimg.com/dr/18__/t01c9995edec3fbad34.png)}.ej a[href*=\"遗迹的守护者\"]{background:url(//p3.qhimg.com/dr/18__/t01e494dd0d0951af40.png)}.ej a[href*=\"排位竞技场攻略\"]{background:url(//p6.qhimg.com/dr/18__/t01cbd94c6fde476654.png)}.ej a{background-repeat:no-repeat !important;background-position-y:10px !important;background-position-x:center !important;background-color:#202835 !important;width:55px !important;display:block;height:50px;padding:27px 0 0 0 !important;border-radius:4px;font-size:9px !important;transition:.15s;-moz-transition:.15s;-webkit-transition:.15s;-o-transition:.15s}.ej a:hover{background-position-y:6px !important;background-color:#3a4658 !important;color:#cdd5e2 !important}.ej{width:55px !important;display:inline-block;margin:6px;padding:0 !important;text-align:center}  .dz-detail .nr-dp .dp-des span.tbb{border:0px solid #1d1d1d;color:#ffffff;padding-left:54px;background:no-repeat #61afc5 url(http://p2.qhimg.com/dr/43__/t01f55e47bb4673a269.png) 0 center}.dz-detail .nr-dp .dp-des span.tbzb{border:0px solid #1d1d1d;color:#ffffff;padding-left:54px;background:no-repeat #efb259 url(http://p2.qhimg.com/dr/43__/t0199384c93076249f9.png) 0 center}.dz-detail .nr-dp .dp-des span.jgl{border:0px solid #1d1d1d;color:#ffffff;padding-left:54px;background:no-repeat #78b976 url(http://p0.qhimg.com/dr/43__/t01e4fa905cf7ac25c2.png) 0 center}.dz-detail .nr-dp .dp-des span.zb{border:0px solid #1d1d1d;color:#ffffff;padding-left:54px;background:no-repeat #dc777a url(http://p8.qhimg.com/dr/43__/t013d718f6730984e48.png) 0 center}.dz-icon{cursor:pointer;display:inline-block;margin-top:10px;position:relative;height:84px;width:82px;background-position:0px;background-repeat:no-repeat;background-image:url(//p4.qhimg.com/dr/82__/t019058403c6699423f.png)}.dz-icon:hover{background-image:url(http://p0.qhimg.com/dr/117__/t01e7a907a558bce944.png)}.dz-icon .dz-num:hover{opacity:0.8}.dz-icon .dz-num{white-space:nowrap;position:absolute;margin:53px 0 0 58px;display:inline-block;text-align:center;color:#fff;height:28px;line-height:28px;background-color:#a87b6d;border-radius:4px;padding-right:0px;text-indent:0px;padding:0px 10px}.dz-icon .dz-num::before{content:\"赞 \"}.dz-icon .dz{width:50px;height:40px;position:absolute;top:0;left:0;background-color:#00000000;background-image:url(/cq/);background-position:center;background-repeat:no-repeat;border-radius:4px}.dz{display:none}  #firstHeading2 .info0{margin-bottom:0px}#firstHeading2 .h1-left{margin-left:0px} .zxgl ul li{list-style-type:disc} .wiki-update{padding-top:0px;border-radius:4px;background-color:rgba(255,255,255,0);width:100%;margin-left:0px;float:left}.mainpage-block-style .fn-clear{margin-top:-20px}.mainpage-block-style .clearfix{margin-top:-30px}.wiki-update .update-content li span.update{background-color:#8C5D34}.wiki-update .update-content{padding:0px 0px 0px 0px;margin-left:0px}.rot img:hover{animation:rot 1s}.page-首页 #firstHeading{display:none}@keyframes rot{from{transform:rotate(0deg) }to{transform:rotate(360deg) }}.page-百年好合 #firstHeading .h1-top{border-bottom:1px solid #fff !important;box-shadow:0 1px #fff;padding-top:0;margin:0 -10px;height:95px}.page-百年好合 #firstHeading{display:none}.page-百年好合 body{background:rgba(0,0,0,0) url(http://p6.qhimg.com/t01d12a67a333ad92c0.jpg) repeat fixed 60% 0} #main{width:810px;min-height:700px;position:relative;padding:20px 20px 40px;background:transparent}#main.wauto{margin:150px auto 50px;background:rgba(189,189,189,0.8);padding:12px}.mw-search-results{margin-left:0.4em;float:none} .defaultBtn{transition:.2s;-moz-transition:.2s; -webkit-transition:.2s; -o-transition:.2s; }.defaultBtn:hover{opacity:0.6}.defaultBtn:active{opacity:0.8} #cosbox{background-image:url(http://p3.qhimg.com/t011e6e35b15a86be1d.png);background-repeat:no-repeat;background-position:top center } table.herolvtable{font-family:微软雅黑;font-size:13px;border-width:3px 0px 3px 0px;border-color:#554432;border-collapse:collapse}table.herolvtable th{color:#e2decd;border-width:3px 0px 3px 0px;padding:5px 21px 5px 21px;border-style:solid;border-color:#554432;background-color:#000000}table.herolvtable td{color:#ffcb20;border-width:3px 0px 3px 0px;padding:5px 21px 5px 21px;border-style:solid;border-color:#554432;background-color:#000000;text-align:right;white-space:nowrap}#lvtitle tr th{text-align:right;color:#ff80b3;background-color:#000000}#info_scrollbar_style::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);border-radius:10px;background-color:#3c2d1d}#info_scrollbar_style::-webkit-scrollbar{height:12px;background-color:#554432}#info_scrollbar_style::-webkit-scrollbar-thumb:horizontal{border-radius:10px;-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);background-color:#1f150f;height:5px} .jobicon{border-radius:30px;display:inline-block;height:30px;width:30px;background-color:#554432} .level_btn{font-size:9px;cursor:pointer;border-right-style:solid;border-width:1px;border-color:#332b23} .cos_img_title a,.cos_hero_title a{color:#fff !important}.cos_h_title a{color:#eff1ba !important}.cos_box,.cos_box1{display:inline-block;background-color:#7E6F60;width:210px;height:240px;border-radius:14px;overflow:hidden;color:#FCFCFC}.cos_box{margin:12px}.cos_box1{border:4px solid #b3a296;box-sizing:content-box}.cos_img{background-image:url(\"/cq/\u003Cnowiki\u003Ehttp://p5.qhimg.com/dr/210__/t0169701aa606b0edda.png\u003C/nowiki\u003E\");width:210px;height:180px}.cos_img_title{position:absolute;text-align:center;text-shadow:2px 1px 1px #403326;width:210px;margin-top:6px}.cos_hero_title{position:absolute;text-align:center;text-shadow:2px 1px 1px #403326;width:210px;margin-top:24px;font-size:9px}.cos_img_class{position:absolute;width:24px;height:24px;text-align:center;background-color:#4A372E;border-radius:4px;margin:145px 0 0 175px}.cos_type{position:absolute;margin-left:165px}.cos_info{width:210px;height:60px;background-color:#675447;padding:0 4px;font-size:9px;overflow:hidden;text-align:left}.cos_info_val{position:relative;background-color:#4A372E;width:90px;border-radius:4px;display:inline-block;padding:1px 6px;margin:8px 4px 0 4px}.cos_num{float:right;color:#00FF24}.cos_info_text{color:#D0B5A2;padding:3px 6px} .show_btn{padding:10px;text-align:center;background:#ecc6c6;border-radius:20px;cursor:pointer;color:#862d59;margin-top:25px;margin-bottom:25px;margin-left:30%;margin-right:30%}.show_btn:hover{background:#f2d9d9;color:#864a67 }.hide_btn{float:right;width:37px;height:37px;background:transparent url(http://p1.qhimg.com/t0128406514c2318eae.png) no-repeat scroll 0 0;cursor:pointer;overflow:hidden}.hide_btn:hover{background:transparent url(http://p1.qhimg.com/t0128406514c2318eae.png) no-repeat scroll -37px 0}.hide_box{display:none;padding:20px;background-color:#e6d6c8;border-radius:20px;margin-top:25px;margin-bottom:25px;margin-left:0px;margin-right:0px}  .float_b{display:inline-block;cursor:pointer}.float_c{position:fixed;z-index:999}  #hero_data,#scroll_setting1{display:none}.hero_frame{display:inline-block;width:80px;height:92px;margin:7px 9px}.hf{background-color:#756a54;border-radius:8px;width:80px;height:92px;overflow:hidden}.hf img{position:relative;margin-left:-23px;margin-top:-23px}.ht{position:relative;width:24px;height:24px;margin-top:-50px;margin-left:2px}.ht_37{background:transparent url(http://p7.qhimg.com/t016c5f80a4964d1422.png) no-repeat scroll 0 0}.ht_1{background:transparent url(http://p7.qhimg.com/t01dc30e28a5a6513f2.png) no-repeat scroll 0 0}.rk{width:80px;height:21px;position:relative;margin-top:-9px;background-color:#54483c;background-repeat:no-repeat}.rk_1{background-image:url(http://p7.qhimg.com/dr/80__/t011d73a062f5888761.png)}.rk_2{background-image:url(http://p2.qhimg.com/dr/80__/t01889dfd9288371dc9.png)}.rk_3{background-image:url(http://p4.qhimg.com/dr/80__/t01964682dc58be145a.png)}.rk_4{background-image:url(http://p5.qhimg.com/dr/80__/t0186719f348b9e4098.png)}.rk_5{background-image:url(http://p2.qhimg.com/dr/80__/t0159013bba3efe3476.png)}.rk_6{background-image:url(http://p6.qhimg.com/dr/80__/t01dc1f438b9cdfe7f4.png)}.jb{width:13px;height:13px;position:relative;margin-left:62px;margin-top:-17px}.jb_1{background:transparent url(http://p2.qhimg.com/t01c46529449803cdd2.png) no-repeat scroll 0 0}.jb_2{background:transparent url(http://p4.qhimg.com/t016e51b717f4749cb5.png) no-repeat scroll 0 0}.jb_3{background:transparent url(http://p0.qhimg.com/t015bf958f178467bf4.png) no-repeat scroll 0 0}.jb_4{background:transparent url(http://p1.qhimg.com/t012f59e7ec9206b2b8.png) no-repeat scroll 0 0}.jb_5{background:transparent url(http://p5.qhimg.com/t018c70fe30d0b9fb3c.png) no-repeat scroll 0 0}.jb_6{background:transparent url(http://p5.qhimg.com/t012d3585d65c4438db.png) no-repeat scroll 0 0}.new_icon{position:relative;z-index:99;width:25px;height:26px;margin-left:61px;margin-top:-100px;background:url(http://p5.qhimg.com/dr/25__/t01996f6c413eedf362.png) no-repeat}#hero_box{background-color:#e9ceb3;padding:10px;height:420px;overflow:auto}.hero_frame:hover{opacity:0.8}.pre_frame:hover{opacity:0.8}#pre_box{background-color:#352F2A;padding:10px;height:420px;text-align:center}.hero_name{width:80px;height:40px;color:#fff;font-size:9px;position:relative;top:-90px;display:inline-table}.pre_frame{display:inline-block;width:17%;margin-top:45px}.pjb{width:13px;height:13px;position:relative;margin-left:62px;margin-top:-17px}.prk{width:80px;height:21px;position:relative;margin-left:0;margin-top:-13px;background-repeat:no-repeat}.pht{position:relative;width:24px;height:24px;margin-top:-50px;margin-left:2px}.phf{border-radius:8px;width:80px;height:92px}.phf img{position:relative;margin-left:-50px;margin-top:-86px}.pre_frame_center{width:80px;height:92px;display:inline-block}.pre_light{position:relative;width:102px;height:102px;top:30px;left:-10px;opacity:0.5}.pre_light_1,.pre_light_37{background:transparent url(http://p3.qhimg.com/t01bc67253bcefa479b.png) no-repeat scroll 0 0}.pre_last{position:relative;top:30px;left:-10px;width:100px;height:22px;top:-14px;background:transparent url(http://p8.qhimg.com/t01a945094fda5598f4.png) no-repeat scroll 0 0}.scroll_btn{display:inline-block;width:70px;height:90px;margin:4px;cursor:pointer;overflow:hidden;background:transparent url(http://p1.qhimg.com/t01a99b7cea331853b1.png) no-repeat scroll 0 0}.scroll_btn:hover{opacity:0.8;z-index:999}.scroll_btn:active{padding-top:2px;opacity:0.9;background:transparent url(http://p3.qhimg.com/t0114f8024c7771cb3a.png) no-repeat scroll 0 0}#mode_btn1,#mode_btn2,#box_reset,#prob_btn1,#prob_btn2{float:right;font-size:9px;padding:2px 8px;border-radius:4px;background-color:#5f4c3a;cursor:pointer}#box_reset{margin-left:6px;background-color:#823933}#prob_btn1,#prob_btn2{margin-left:6px}.f_btn,.f_btn1{background-color:#a0866d;display:inline-block;padding:1px 8px;border-radius:4px;font-size:9px;cursor:pointer}#add_hero{float:right;font-size:9px;padding:2px 8px;border-radius:4px;background-color:#5f4c3a;cursor:pointer}#up_4{background-color:#e9ceb3;padding:10px;height:158px;overflow:auto;white-space:nowrap}.set_frame{background-color:#bfa489;color:#fff4e9;padding:8px;font-size:14px;text-align:center;font-size:9px;display:none}#addHeroBtn,#cleanHeroBtn{display:inline-block;background-color:#a0866d;padding:2px 10px;margin-left:4px;border-radius:4px;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none}.uphero{width:90px;height:110px;overflow:hidden;display:inline-block;background-color:#906772;margin:2px;border-radius:8px}.uphero img{position:relative;margin-top:-10px;margin-left:-18px}.up_name{position:relative;display:inline-block;top:-10px;left:0px;font-size:9px;color:white;text-align:center;width:90px;font-weight:bold}.del_hero{position:relative;top:-108px;left:68px;width:15px;height:15px;background:transparent url(http://p4.qhimg.com/dr/15__/t017dbdc4d5323b4a2f.png) no-repeat scroll 0 0;cursor:pointer}select#job_sel{color:#5f4c3a;border-radius:4px;padding:3px;border:0px;margin-right:6px}select#hero_sel{color:#5f4c3a;border-radius:4px;padding:3px;border:0px}#prob_table{background-color:#e9ceb3;padding:20px;overflow:auto}.table_title{font-weight:bold;color:#826a53;margin:6px}#prob_table table{text-align:center;border-top:1px solid #826a53;border-right:1px solid #826a53;width:100%;border-spacing:0px;margin-bottom:20px;color:#4e3d2d}#prob_table table td{border-left:1px solid #826a53;border-bottom:1px solid #826a53;padding:2px}#prob_table table th{border-left:1px solid #826a53;border-bottom:1px solid #826a53;background-color:#ccb094}.probVal{font-size:9px;color:#af4545;margin:4px}#type_8{background:url(http://p5.qhimg.com/dr/24__/t01a050f40d08eb8ab5.png) 0px center no-repeat;padding-left:24px}#type_8.ontap{background:url(http://p9.qhimg.com/dr/24__/t01e7d76dbb6aaffa1b.png) 0px center no-repeat}#type_0{background:url(http://p0.qhimg.com/dr/24__/t01c4a305469968ffac.png) 0px center no-repeat;padding-left:24px}#type_0.ontap{background:url(http://p5.qhimg.com/dr/24__/t01676628a3e35fd718.png) 0px center no-repeat}#type_1{background:url(http://p6.qhimg.com/dr/24__/t01f57c34adcb4453e2.png) 0px center no-repeat;padding-left:24px}#type_1.ontap{background:url(http://p1.qhimg.com/dr/24__/t0122800ce191c921f7.png) 0px center no-repeat}#type_37{background:url(http://p0.qhimg.com/dr/24__/t01f4f2f3fbdf53e222.png) 0px center no-repeat;padding-left:24px}#type_37.ontap{background:url(http://p3.qhimg.com/dr/24__/t012572161298d02aff.png) 0px center no-repeat}#type_dm{background:url(http://p4.qhimg.com/dr/24__/t0132acbaec33635f9a.png) 0px center no-repeat;padding-left:24px}#type_hero{background:url(http://p5.qhimg.com/dr/16__/t01d599000c0f990164.png) 0px center no-repeat;padding-left:24px} @media only screen and (max-width:759px){#mw-content-text h2 span.mw-headline,#mw-content-text h2 span.mw-editsection{font-size:18px}.nry-h1 .h1{width:auto;overflow:visible;text-overflow:inherit;white-space:normal}.nry-h1 .shouc{text-indent:-9999px;position:inherit;right:0px;top:4px;width:86px;height:32px;background:url(http://wikicdn.joyme.com/skins/MediaWikiBootstrap/images/wiki-nry_03.png?26ecf) no-repeat;display:inline-block;float:right}.nry-h1 .shouc{margin:0px 0px 10px 0px!important}#main{width:100%}img{vertical-align:middle;max-width:100%;max-height:100%;width:auto;height:auto}}   @media only screen and (max-width:449px){.index_block{width:100%}.index_block_right{padding:8px 0 8px 0}} @media only screen and (min-width:450px){.index_block{width:100%}.index_block_right{padding:8px 0 8px 0}} @media only screen and (min-width:450px) and (max-width:767px){.index_block{width:100%}.index_block_right{padding:8px 0 8px 0}} @media only screen and (min-width:768px){.index_block{width:49%;vertical-align:top}.index_block_left{padding:8px 5px 8px 0}.index_block_right{padding:8px 0 8px 5px}}.block_style_a{box-shadow:0px 1px 2px #B7A08B;overflow:hidden}.index_block_frame{width:100%;text-align:center}.box_type_b_title{width:100%;height:45px;background-color:#d0af8d;text-align:left;font-size:18px;color:#413224;line-height:44px;font-weight:bold;text-indent:20px}.box_type_a_title,.box_type_c_title{height:49px;font-size:16px;color:#6B5847;line-height:36px;border-bottom:1px solid #A79585;margin:0px 12px 0 12px;padding:10px 0 0 0;cursor:default}.box_type_a_title div,.box_type_c_title div{display:inline-block;width:18%}.box_type_a_content,.box_type_c_content{text-align:left}.c_c,.a_c{padding:8px 12px 8px 12px}#ti_on,.timg{list-style-type:none;height:36px;display:inline-block;overflow:hidden;background-image:url(http://p1.qhimg.com/t010e6842bbc41fa20e.png) }#ti_on{width:32px;cursor:default}#ti_on:hover{opacity:1}.timg{width:24px;cursor:pointer;transition:opacity .2s;-moz-transition:opacity .2s; -webkit-transition:opacity .2s; -o-transition:opacity .2s; }.timg:hover{opacity:0.7}#topimg img{width:100%;height:100%}#imgbar{opacity:0.8}  .h_tag_def,.h_tag_sel{cursor:pointer;display:inline-block;font-size:9px;padding:1px 6px;border-radius:4px;margin:3px }.h_tag_def{color:#8c6849;background-color:none}.h_tag_sel{color:#fff;background-color:#ad9077}.h_tag_n{cursor:default;display:inline-block;font-size:9px;padding:1px 6px;border-radius:4px;margin:3px;color:#fff;background-color:#ad9077}  .herotable td{padding:8px 0;border-top:1px solid #2d2d2d}  .ft_tag{cursor:pointer;display:inline-block;font-size:9px;padding:1px 6px;border-radius:4px;margin:3px;color:#8c6849}.ft_tag_on{color:#fff;background-color:#ad9077} #quickbar:after{content:\"\";display:none}.headnav-bg{width:100%;height:32px;position:absolute;top:28px;left:0;z-index:9;background:#614c3a}.headnav \u003E ul li a{display:block;padding:0 15px;font-size:14px;color:#FFFFFF;text-decoration:none;position:relative;z-index:10}.action h3{position:relative;z-index:10;margin-top:0px;color:#fff;background:#614c3a}.action h3 span{line-height:28px;background:#614c3a}.action h3 span a{color:#fff;text-decoration:none}.action h3 span a:hover{color:#fff}.action \u003E ul{display:block}#firstHeading .head-menu ul li a:hover,.head-contributemenu ul li a:hover{background:#b2996d;color:#fff}.headnav \u003E ul li ul li a:hover{background:#b2996d!important;color:#fff!important;-webkit-border-radius:0!important;-moz-border-radius:0!important;-ms-border-radius:0!important;-o-border-radius:0!important;border-radius:0!important}.headnav \u003E ul li ul{display:none;position:absolute;top:29px;left:-1px;min-width:50px;background:#fff;border:1px solid #312818;border-top:none;-webkit-box-shadow:0 3px 10px rgba(4,0,0,.5);-moz-box-shadow:0 3px 10px rgba(4,0,0,.5);-ms-box-shadow:0 3px 10px rgba(4,0,0,.5);-o-box-shadow:0 3px 10px rgba(4,0,0,.5);box-shadow:0 3px 10px rgba(4,0,0,.5);z-index:9}.headnav \u003E ul li.sel\u003Ea{background:url(http://joymepic.joyme.com/wiki/images/gfol/1/14/Tagmenu-bg.png?v=201508180936) no-repeat right -17px}.headnav \u003E ul li.sel:hover\u003Ea{background:#fff url(http://joymepic.joyme.com/wiki/images/gfol/1/14/Tagmenu-bg.png?v=201508180936) no-repeat right 14px;color:#3a3a3a;-webkit-border-radius:3px 3px 0 0;-moz-border-radius:3px 3px 0 0;-ms-border-radius:3px 3px 0 0;-o-border-radius:3px 3px 0 0;border-radius:3px 3px 0 0;text-decoration:none}    #mw-content-text h3{margin-bottom:0.3em;border-bottom:1px solid #006cb0;border-left:0.4em solid #006cb0;padding-left:0.5em;color:#555;margin-top:5px;height:20px;line-height:20px;clear:both} .mw-editsection{float:right;margin-right:1em}h2 .mw-editsection{line-height:35px}h3 .mw-editsection{line-height:20px}.mw-editsection a,.mw-editsection a:link,.mw-editsection a:visited{color:#d6c394}ol,ul,li{margin:inherit;line-height:inherit} @media only screen and (max-width:750px){ #firstHeading .pageTime-bar{display:none}#mw-content-text h2{font-size:14px;height:25px;line-height:25px} .mw-editsection{display:none}.wiki-content ul{font-size:12px;margin:0.5em 0 0 0.8em}#article p{line-height:inherit;padding:0}dl{margin:10px 0 0 0}.m_clear_float{clear:both}.m_center{width:100%;text-align:center}*.m_center *{margin-left:auto !important;margin-right:auto !important}.m_center \u003E div{float:none;margin-left:auto;margin-right:auto}} .gltable{text-align:center}.gltable th{background:rgb(255,247,226) !important;font-weight:bold}table{border-collapse:separate;border-spacing:0}.wiki-logo{background-image:url(http://p2.qhimg.com/t01b503ce1a19b929d0.png)}#zhenrong_create{width:200px;height:48px;background:url(http://p6.qhimg.com/t011ebb6c5535816bd0.jpg) no-repeat center !important;cursor:pointer;display:block;float:left;margin-right:20px;border:none !important}#zhenrong_clear{width:200px;height:48px;background:url(http://p2.qhimg.com/t01160381e89afe4943.jpg) no-repeat center !important;cursor:pointer;display:block;float:left;border:none !important}  .clearfix:after{content:\"\";display:block;clear:both;height:0;font-size:0}.clearfix{zoom:1}.mt20{margin-top:20px} .wrapper{width:100%;height:auto}.banner{text-align:center;margin-top:15px} .anchor{padding:30px 0}.anchor-main{width:648px;margin:0 auto}.anchor-main2{width:490px;margin:5px auto}.anchor a{display:block;width:142px;height:44px;float:left;margin-right:20px;background:url(http://p3.qhimg.com/t018f2eecbe8e0c5cc0.png) no-repeat 0 0;color:#fff!important;;font-size:18px;line-height:44px;text-align:center;text-shadow:1px 1px #d26666;margin-bottom:5px}.anchor a:hover{background-position:0 -44px}.anchor a:nth-child(2){background-position:0 -88px;text-shadow:1px 1px #578dc9}.anchor a:nth-child(2):hover{background-position:0 -132px}.anchor a:nth-child(3){background-position:0 -176px;text-shadow:1px 1px #528c45}.anchor a:nth-child(3):hover{background-position:0 -220px}.anchor a:nth-child(4){background-position:0 -264px;text-shadow:1px 1px #af7e3c}.anchor a:nth-child(4):hover{background-position:0 -308px}.anchor a:nth-child(5){background-position:0 -352px;text-shadow:1px 1px #9a6c9b}.anchor a:nth-child(5):hover{background-position:0 -396px}.anchor a:nth-child(6){background-position:0 -440px;margin:0;text-shadow:1px 1px #cf6a8b}.anchor a:nth-child(6):hover{background-position:0 -484px} .anchor a+a{background-position:0 -88px;text-shadow:1px 1px #578dc9}.anchor a+a:hover{background-position:0 -132px}.anchor a+a+a{background-position:0 -176px;text-shadow:1px 1px #528c45}.anchor a+a+a:hover{background-position:0 -220px}.anchor a+a+a+a{background-position:0 -264px;text-shadow:1px 1px #af7e3c}.anchor a+a+a+a:hover{background-position:0 -308px}.anchor a+a+a+a+a{background-position:0 -352px;text-shadow:1px 1px #9a6c9b}.anchor a+a+a+a+a:hover{background-position:0 -396px}.anchor a+a+a+a+a+a{background-position:0 -440px;margin:0;text-shadow:1px 1px #cf6a8b}.anchor a+a+a+a+a+a:hover{background-position:0 -484px}@media only screen and (max-width:480px){.anchor-main,.anchor-main2{width:auto}.anchor a{margin-right:5px;margin-bottom:5px}}.down-main{padding:40px;border:20px solid #e7e7e7;margin-top:20px}.down-main-left{width:266px;padding-right:40px;color:#6a6b6c;line-height:26px;text-align:center}.down-main-left p{text-align:left}.download-title{font-size:20px;color:#333;height:40px}.download-title span{color:#666;padding-left:10px}.downloadbtn{background:#7d6a58 none repeat scroll 0 0;color:#fff !important;display:block;font-size:18px;height:40px;line-height:40px;margin:10px 0;outline:2px outset #a99580;outline-offset:0;text-align:center;width:82px}.downloadbtn:hover{background:#4ca046;outline:#72cb6b outset 2px;text-decoration:none !important}.appdownload{display:block;width:253px;height:54px;background:url(http://joymepic.joyme.com/wiki/images/cq/f/fd/%E8%8B%B9%E6%9E%9C%E4%B8%8B%E8%BD%BD1.jpg?v=201512021623) no-repeat 0 0;text-indent:-999em;margin-bottom:35px}.appdownload:hover{background-position:0 -54px}.wiki_hide .appdownload{margin:0 auto 35px}.wiki_hide .downloadbtn{margin:10px auto} .version{width:auto;border-top:1px solid #d4d6d7;padding:20px 0 35px}.version-title{width:100%;font-size:28px;font-weight:bold;color:#ffce0a;height:35px;line-height:35px;margin-bottom:20px;text-indent:124px}.ver1{background:url(http://joymepic.joyme.com/wiki/images/cq/1/16/Version-22.png?v=201510221751) no-repeat 0 0}.ver2{background:url(http://joymepic.joyme.com/wiki/images/cq/1/16/Version-22.png?v=201510221751) no-repeat 0 -35px}.ver3{background:url(http://joymepic.joyme.com/wiki/images/cq/1/16/Version-22.png?v=201510221751) no-repeat 0 -70px}.ver4{background:url(http://joymepic.joyme.com/wiki/images/cq/1/16/Version-22.png?v=201510221751) no-repeat 0 -105px}.ver-detail{width:100%;float:left;text-align:center}.detail-video{width:100%;position:relative;margin-top:10px}.detail-video:hover cite{width:286px;height:166px;background:#ff4d1e;padding:4px}.detail-video:hover cite img{width:286px;height:166px}.detail-video:hover li{color:#7d6a58}.detail-video cite{display:block;width:290px;height:170px;background:#685a4c;padding:2px}.detail-video cite img{width:290px;height:170px}.detail-video span{display:block;width:62px;height:62px;position:absolute;top:85px;left:145px;margin:-31px 0 0 -31px;background:url(http://p3.qhimg.com/t0157ac554ffe6fcf1b.png) no-repeat 0 0}.detail-video:hover span{background-position:0 -62px}.detail-video li{color:#343434;text-align:center;line-height:35px}.detail-main{width:auto;margin-left:auto;text-align:left;line-height:24px}.detail-title{font-size:20px;color:#333;text-indent:50px;height:44px;line-height:44px}.title1{background:url(http://joymepic.joyme.com/wiki/images/cq/9/96/Icon.png?v=201510191721) no-repeat -7px 0}.title2{background:url(http://joymepic.joyme.com/wiki/images/cq/9/96/Icon.png?v=201510191721) no-repeat -7px -45px;padding-top:22px}.detail-main li{text-indent:2em;padding:0 30px 0 50px}.detail-main p{padding:0 30px 0 50px}.detail-main a{display:block;width:108px;height:31px;line-height:31px;color:#fff;text-align:center;font-size:12px;background:#53aee2;margin:20px 30px 0 0;float:right}.detail-main a:hover{background:#73c2f0} .ver-update{color:#555;padding:20px;background:#e7e7e7;margin-top:10px}.ver-update div{font-size:16px;color:#333;text-indent:20px}.ver-update .update-title{font-size:20px;background:url(http://joymepic.joyme.com/wiki/images/cq/9/96/Icon.png?v=201510191721) no-repeat -19px -115px}.ver-update ul{margin-bottom:30px}.ver-update li{padding-left:20px}#wind,#wind1,#wind2,#wind3{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.4);z-index:999}.video-main{width:600px;height:355px;position:absolute;left:50%;top:50%;margin-top:-177px;margin-left:-300px;z-index:3}.video-main i{display:block;width:51px;height:52px;background:url(http://p7.qhimg.com/t01b98db7943d9d665a.jpg) no-repeat 0 0;position:absolute;top:0;right:-51px;cursor:pointer} .b-bottom{border-bottom:1px dashed #d4d6d7;margin-bottom:10px}.m-detail-video{width:294px;margin:0 auto;position:relative}.m-detail-video cite{display:block;width:290px;height:170px;background:#685a4c;padding:2px}.m-detail-video cite img{width:290px;height:170px}.m-detail-video span{display:block;width:31px;height:31px;position:absolute;top:85px;left:145px;margin:-16px 0 0 -16px;background:url(http://p3.qhimg.com/t0157ac554ffe6fcf1b.png) no-repeat 0 0;background-size:100% auto}.m-detail-video li{color:#343434;text-align:center;line-height:35px}.m-detail-main{width:auto;text-align:left;line-height:24px}.m-detail-title{font-size:14px;color:#333;text-indent:25px;height:22px;line-height:22px}.m-detail-main li{text-indent:2em;line-height:24px}.m-detail-main p{padding:0 30px 0 50px}.m-detail-main a{display:block;width:108px;height:31px;line-height:31px;color:#fff;text-align:center;font-size:12px;background:#53aee2;margin:10px auto}.m-detail-main a:hover{background:#73c2f0}.m-ver-update{width:auto;color:#555;padding:10px;background:#e7e7e7;margin-top:10px}.m-ver-update div{font-size:16px;color:#333;text-indent:20px}.m-ver-update .update-title{font-size:20px;background:url(http://joymepic.joyme.com/wiki/images/cq/9/96/Icon.png?v=201510191721) no-repeat -19px -115px}.m-ver-update ul{margin:0 0 30px 0}.m-ver-update li{padding-left:20px;line-height:24px}.m-version{border-top:1px solid #d4d6d7;padding:20px 0 18px}.m-version-title{width:100%;font-size:28px;font-weight:bold;color:#ffce0a;height:20px;line-height:20px;margin-bottom:10px;text-indent:70px}.m-ver1,.m-ver2,.m-ver3,.m-ver4{background:url(http://p8.qhimg.com/t01e729f094c9438f98.png) no-repeat 0 0;background-size:65px auto}.m-ver2{background-position:0 -20px}.m-ver3{background-position:0 -40px}.m-ver4{background-position:0 -60px}.m-version-title img{width:auto;height:100% !important}.tt-style cite{font-style:normal;width:115px;text-align:center;line-height:35px;color:#cbb791;font-weight:bolder;font-size:18px;background:url(http://p1.qhimg.com/t01ab4fe3f64e68f3dc.png) center no-repeat;padding:15px;-webkit-text-shadow:2px 0 2px #574738;-moz-text-shadow:2px 0 2px #574738;text-shadow:2px 0 2px #574738;filter:Glow(Color=#5d2b08,Strength=1)}.tt-style span{color:#ffce0a;font-weight:bolder;text-shadow:0.08em 0.07em 0px #5D2B09;font-size:26px;padding-left:10px;line-height:35px;-webkit-text-shadow:#763c12 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#763c12 0 3px 0;-moz-text-shadow:#763c12 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#763c12 0 3px 0;text-shadow:#763c12 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#763c12 0 3px 0;filter:Glow(Color=#5d2b08,Strength=1)}.tt-style-m cite{width:58px;text-align:center;line-height:35px;color:#cbb791;font-weight:bolder;font-size:10px;background:url(http://p1.qhimg.com/t01ab4fe3f64e68f3dc.png) center no-repeat;background-size:80px auto;padding:15px;-webkit-text-shadow:2px 0 2px #574738;-moz-text-shadow:2px 0 2px #574738;text-shadow:2px 0 2px #574738;filter:Glow(Color=#5d2b08,Strength=1)}.tt-style-m span{color:#ffce0a;font-weight:bolder;text-shadow:0.08em 0.07em 0px #5D2B09;font-size:13px;padding-left:5px;line-height:35px;-webkit-text-shadow:#763c12 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#763c12 0 1px 0;-moz-text-shadow:#763c12 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#763c12 0 1px 0;text-shadow:#763c12 -1px 0 0,#763c12 0 -1px 0,#5d2b08 1px 0 0,#763c12 0 1px 0;filter:Glow(Color=#5d2b08,Strength=1)} .marked{color:#ff7563}@media only screen and (max-width:750px){.hidden{display:none!important}.nodisplay{display:inherit!important;}}@media only screen and (min-width:751px){.nodisplay{display:none!important;}.hidden{display:inherit!important;}}.weapon_icon{width:51px;margin:0 auto;height:51px;line-height:51px;text-align:center;background-color:#776755;border-top:1px solid #8a7865;border-left:1px solid #8a7865;border-right:1px solid #5e5141;border-bottom:1px solid #5e5141;border-radius:5px}.weapon_icon img{vertical-align:middle;margin-top:-3px}.star_icon{margin:0 1px 0 2px}.star_icon img:nth-child(n+2){margin-left:-3px}.class_icon .class_name{margin-left:3px}.class_icon .bg{display:inline-block;background-color:rgba(34,34,34,0.9);border-radius:4px;text-align:center}.class_icon .bg.icon_s{height:21px;line-height:21px;width:20px}.class_icon .bg.icon_m{height:31px;line-height:31px;width:31px}.class_icon .bg.icon_l{height:44px;line-height:44px;width:42px}.class_icon .bg img{margin-top:-1px}.hero_icon{position:relative;display:inline-block;height:72px;width:72px;margin:0 auto}.hero_icon .star{background:url(http://joymepic.joyme.com/wiki/images/cq/2/28/Char_star.png?v=201510201136) no-repeat;position:absolute;left:5px;top:50px;padding-left:23px;line-height:22px;font-weight:bold;color:#ffcb42;text-shadow:0px -1px 1px #000,2px 1px 1px #000,-1px 0px 1px #000,0px 1px 1px #000,0px 1px 1px #000}.hero_icon .class_icon{position:absolute;right:0;margin-top:48px;margin-right:4px;height:21px;line-height:21px;width:20px;text-align:center;background-color:rgba(34,34,34,0.9);border-radius:4px}.hero_icon .class_icon img{padding:0;margin:-3px 0 0 0}.res_icon{margin:0 2px}.res_icon img{margin-top:-3px}.striking{color:#FF6EB4} .cq_frame{width:auto;max-width:1000px;margin:10px auto;overflow:hidden}.cq_frame.jp{font-family:'Hiragino Kaku Gothic ProN',Meiryo,sans-serif}   @media only screen and (max-width:750px){} .cqtable{color:#3a3a3a;margin:1em 1em 1em 0;border-spacing:0;border-radius:5px}.cqtable \u003E * \u003E tr \u003E td,.cqtable \u003E tr \u003E td{padding:2px 4px;background-color:#feefda}.cqtable tr:first-child td:first-child,.cqtable tr:first-child th:first-child{border-top-left-radius:5px}.cqtable tr:first-child td:nth-last-child(1),.cqtable tr:first-child th:nth-last-child(1){border-top-right-radius:5px}.cqtable tr:nth-last-child(1) td:first-child{border-bottom-left-radius:5px}.cqtable tr:nth-last-child(1) td:nth-last-child(1){border-bottom-right-radius:5px}.cqtable tr:first-child td.right,.cqtable tr:first-child th.right{border-top-right-radius:5px}.cqtable tr td.bottom:first-child,.cqtable tr:nth-last-child(1) td.left,.cqtable tr th.bottom:first-child,.cqtable tr:nth-last-child(1) th.left{border-bottom-left-radius:5px}.cqtable tr:nth-last-child(1) td.right,.cqtable tr td.bottom:nth-last-child(1),.cqtable tr:nth-last-child(1) th.right,.cqtable tr th.bottom:nth-last-child(1){border-bottom-right-radius:5px}.cqtable td.clear_top,.cqtable th.clear_top{border-top:none !important;border-top-left-radius:0 !important;border-top-right-radius:0 !important}.cqtable td.clear_left,.cqtable th.clear_left{border-left:none !important;border-top-left-radius:0 !important;border-bottom-left-radius:0 !important}.cqtable td.clear_right,.cqtable th.clear_right{border-right:none !important;border-top-right-radius:0 !important;border-bottom-right-radius:0 !important}.cqtable td.clear_bottom,.cqtable th.clear_bottom{border-bottom:none !important;border-bottom-left-radius:0 !important;border-bottom-right-radius:0 !important}.cqtable td.clear_all,.cqtable th.clear_all{border:none !important;border-radius:0 !important}@media only screen and (max-width:750px){.cqtable{font-size:12px !important;margin:0}} .cqtable.sortable tbody tr:nth-child(1) td{border-top:none}.cqtable.sortable tbody tr:nth-child(1) td:nth-child(1){border-top-left-radius:0}.cqtable.sortable tbody tr:nth-child(1) td:nth-last-child(1){border-top-right-radius:0} .cqtable tr:first-child td{border-top:1px solid #fffaf2}.cqtable tr td:first-child{border-left:1px solid #fffaf2}.cqtable tr:nth-last-child(1) td{border-bottom:1px solid #e5d0b3}.cqtable tr td:nth-last-child(1){border-right:1px solid #e5d0b3}.cqtable tr:not(:first-child) td{border-top:1px solid #decc9c}.cqtable tr td:not(:first-child){border-left:1px solid #decc9c}.cqtable td.top{border-top:1px solid #fffaf2 !important}.cqtable td.left{border-left:1px solid #fffaf2 !important}.cqtable td.bottom{border-bottom:1px solid #e5d0b3 !important}.cqtable td.right{border-right:1px solid #e5d0b3 !important}.cqtable td.top_line{border-top:1px solid #decc9c !important}.cqtable td.left_line{border-left:1px solid #decc9c !important} .cqtable.odd tr:nth-child(odd) td{background-color:#FFE7C7}.cqtable.even tr:nth-child(even) td{background-color:#FFE7C7} .cqtable th{background-color:#614c3a;color:#d6c394;text-align:center;font-weight:bold}.cqtable tr:first-child th{border-top:1px solid #735841}.cqtable tr th:first-child{border-left:1px solid #735841}.cqtable tr:nth-last-child(1) th{border-bottom:1px solid #473a2e}.cqtable tr th:nth-last-child(1){border-right:1px solid #473a2e}.cqtable tr:not(:first-child) th{border-top:1px solid #342211}.cqtable tr th:not(:first-child){border-left:1px solid #342211}.cqtable th.top{border-top:1px solid #735841 !important}.cqtable th.left{border-left:1px solid #735841 !important}.cqtable th.bottom{border-bottom:1px solid #473a2e !important}.cqtable th.right{border-right:1px solid #473a2e !important}.cqtable th.top_line{border-top:1px solid #342211 !important}.cqtable th.left_line{border-left:1px solid #342211 !important} .cqtable td.light{background-color:#decc9c !important;color:#3a3a3a}.cqtable tr:first-child td.light{border-top:1px solid #f2e5c2}.cqtable tr td:first-child.light{border-left:1px solid #f2e5c2}.cqtable tr:nth-last-child(1) td.light{border-bottom:1px solid #c9b57d}.cqtable tr td.light:nth-last-child(1){border-right:1px solid #c9b57d}.cqtable tr:not(:first-child) td.light{border-top:1px solid #f2e5c2}.cqtable tr td.light:not(:first-child){border-left:1px solid #f2e5c2}.cqtable td.top.light{border-top:1px solid #f2e5c2 !important}.cqtable td.left.light{border-left:1px solid #f2e5c2 !important}.cqtable td.bottom.light{border-bottom:1px solid #c9b57d !important}.cqtable td.right.light{border-right:1px solid #c9b57d !important}.cqtable td.top_line.light{border-top:1px solid #f2e5c2 !important}.cqtable td.left_line.light{border-left:1px solid #f2e5c2 !important} .cqtable td.light2{background-color:#FFE7C7 !important;;color:#3a3a3a}.cqtable tr:first-child td.light2{border-top:1px solid #fff4e5}.cqtable tr td:first-child.light2{border-left:1px solid #fff4e5}.cqtable tr:nth-last-child(1) td.light2{border-bottom:1px solid #e5caa5}.cqtable tr td.light2:nth-last-child(1){border-right:1px solid #e5caa5}.cqtable tr:not(:first-child) td.light2{border-top:1px solid #decc9c}.cqtable tr td.light2:not(:first-child){border-left:1px solid #decc9c}.cqtable td.top.light2{border-top:1px solid #fff4e5 !important}.cqtable td.left.light2{border-left:1px solid #fff4e5 !important}.cqtable td.bottom.light2{border-bottom:1px solid #e5caa5 !important}.cqtable td.right.light2{border-right:1px solid #e5caa5 !important}.cqtable td.top_line.light2{border-top:1px solid #decc9c !important}.cqtable td.left_line.light2{border-left:1px solid #decc9c !important} .cqtable td.deep{background-color:#776755 !important;;color:#d6c394}.cqtable tr:first-child td.deep{border-top:1px solid #8a7865}.cqtable tr td:first-child.deep{border-left:1px solid #8a7865}.cqtable tr:nth-last-child(1) td.deep{border-bottom:1px solid #5e5141}.cqtable tr td.deep:nth-last-child(1){border-right:1px solid #5e5141}.cqtable tr:not(:first-child) td.deep{border-top:0}.cqtable tr td.deep:not(:first-child){border-left:0}.cqtable td.top.deep{border-top:1px solid #8a7865 !important}.cqtable td.left.deep{border-left:1px solid #8a7865 !important}.cqtable td.bottom.deep{border-bottom:1px solid #5e5141 !important}.cqtable td.right.deep{border-right:1px solid #5e5141 !important}.cqtable td.top_line.deep{border-top:0 !important}.cqtable td.left_line.deep{border-left:0 !important} .cqtable td.deep2{background-color:#554435 !important;;color:#d6c394}.cqtable tr:first-child td.deep2{border-top:1px solid #66503d}.cqtable tr td:first-child.deep2{border-left:1px solid #66503d}.cqtable tr:nth-last-child(1) td.deep2{border-bottom:1px solid #40362d}.cqtable tr td.deep2:nth-last-child(1){border-right:1px solid #40362d}.cqtable tr:not(:first-child) td.deep2{border-top:0}.cqtable tr td.deep2:not(:first-child){border-left:0}.cqtable td.top.deep2{border-top:1px solid #66503d !important}.cqtable td.left.deep2{border-left:1px solid #66503d !important}.cqtable td.bottom.deep2{border-bottom:1px solid #40362d !important}.cqtable td.right.deep2{border-right:1px solid #40362d !important}.cqtable td.top_line.deep2{border-top:0 !important}.cqtable td.left_line.deep2{border-left:0 !important} .cqtable td.deep3{background-color:#342211 !important;;color:#d6c394}.cqtable tr:first-child td.deep3{border-top:1px solid #4d3015}.cqtable tr td:first-child.deep3{border-left:1px solid #4d3015}.cqtable tr:nth-last-child(1) td.deep3{border-bottom:1px solid #261a0f}.cqtable tr td.deep3:nth-last-child(1){border-right:1px solid #261a0f}.cqtable tr:not(:first-child) td.deep3{border-top:0}.cqtable tr td.deep3:not(:first-child){border-left:0}.cqtable td.top.deep3{border-top:1px solid #4d3015 !important}.cqtable td.left.deep3{border-left:1px solid #4d3015 !important}.cqtable td.bottom.deep3{border-bottom:1px solid #261a0f !important}.cqtable td.right.deep3{border-right:1px solid #261a0f !important}.cqtable td.top_line.deep3{border-top:0 !important}.cqtable td.left_line.deep3{border-left:0 !important} .cqtable td.deep4{background-color:#614c3a !important;;color:#d6c394}.cqtable tr:first-child td.deep4{border-top:1px solid #735841}.cqtable tr td:first-child.deep4{border-left:1px solid #735841}.cqtable tr:nth-last-child(1) td.deep4{border-bottom:1px solid #473a2e}.cqtable tr td.deep4:nth-last-child(1){border-right:1px solid #473a2e}.cqtable tr:not(:first-child) td.deep4{border-top:0}.cqtable tr td.deep4:not(:first-child){border-left:0}.cqtable td.top.deep4{border-top:1px solid #735841 !important}.cqtable td.left.deep4{border-left:1px solid #735841 !important}.cqtable td.bottom.deep4{border-bottom:1px solid #473a2e !important}.cqtable td.right.deep4{border-right:1px solid #473a2e !important}.cqtable td.top_line.deep4{border-top:0 !important}.cqtable td.left_line.deep4{border-left:0 !important} .cqtable .contents{padding:1px;height:26px;line-height:26px}.cqtable .contents table{width:calc(100% - 2px);height:100%;border-spacing:0;padding:0;margin:1px;background-color:#000;text-align:left}.cqtable .contents table .star{text-align:left;width:90px;margin:0 auto}.cqtable .contents table .star img{vertical-align:middle;margin-left:-3px}.cqtable .contents table td{padding:0 5px;border:none}.cqtable .contents.top.left table{border-top-left-radius:3px}.cqtable .contents.top.right table{border-top-right-radius:3px}.cqtable .contents.bottom.left table{border-bottom-left-radius:3px}.cqtable .contents.bottom.right table{border-bottom-right-radius:3px}   .cqtable.weapon_upgrade{margin:0 auto}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(1){width:80px}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(2){width:100px}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(3){width:200px}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(4){width:200px}@media only screen and (max-width:750px){.cqtable.weapon_upgrade{padding:0}.cqtable.weapon_upgrade tr:nth-child(1) th{height:25px;line-height:25px}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(1){width:60px}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(2){width:60px}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(3){width:Calc((100% - 120px)/2)}.cqtable.weapon_upgrade tr:nth-child(1) th:nth-child(4){width:Calc((100% - 120px)/2)}}  ul.cq_nav{display:block;margin:3px 0 6px 0;padding:0;height:30px;border:1px solid #ddd;background-color:#f5f5f5;font-size:13px;line-height:30px;overflow:hidden}ul.cq_nav li{position:relative;float:left;display:inline-block;padding:0 5px;margin:0;list-style:none;line-height:30px}ul.cq_nav li:nth-child(1){padding-left:8px;background-color:#342211}ul.cq_nav li:nth-child(1):before{border-left:15px solid #342211}ul.cq_nav li:nth-child(2){background-color:#614c3a}ul.cq_nav li:nth-child(2):before{border-left:15px solid #614c3a}ul.cq_nav li:nth-child(3){background-color:#776755}ul.cq_nav li:nth-child(3):before{border-left:15px solid #776755}ul.cq_nav li:nth-child(4){background-color:#decc9c}ul.cq_nav li:nth-child(4):before{border-left:15px solid #decc9c}ul.cq_nav li:nth-child(5){background-color:#FFE7C7}ul.cq_nav li:nth-child(5):before{border-left:15px solid #FFE7C7}ul.cq_nav li:nth-child(6){background-color:#feefda}ul.cq_nav li:nth-child(6):before{border-left:15px solid #feefda}ul.cq_nav li:nth-child(n+2){padding-left:23px}ul.cq_nav li:nth-child(-n+3),ul.cq_nav li:nth-child(-n+3) a,ul.cq_nav li:nth-child(-n+3) a:visited{color:#d6c394;text-decoration:none}ul.cq_nav li:nth-child(n+4),ul.cq_nav li:nth-child(n+4) a,ul.cq_nav li:nth-child(n+4) a:visited{color:#3a3a3a;text-decoration:none}ul.cq_nav li a.external{padding-right:0;background:0 0}ul.cq_nav li:nth-child(1) a:hover{text-shadow:0 1px 0 rgba(150,150,150,0.7),0 -1px 0 rgba(150,150,150,0.7),1px 0 0 rgba(150,150,150,0.7),-1px 0 0 rgba(150,150,150,0.7)}ul.cq_nav li:nth-child(2) a:hover,ul.cq_nav li:nth-child(3) a:hover{text-shadow:0 1px 0 rgba(34,34,34,0.8),0 -1px 0 rgba(34,34,34,0.8),1px 0 0 rgba(34,34,34,0.8),-1px 0 0 rgba(34,34,34,0.8)}ul.cq_nav li:nth-child(n+4) a:hover{text-shadow:0 1px 0 rgba(221,221,221,0.7),0 -1px 0 rgba(221,221,221,0.7),1px 0 0 rgba(221,221,221,0.7),-1px 0 0 rgba(221,221,221,0.7)}ul.cq_nav li::before{position:absolute;right:-15px;z-index:2;width:0;height:0;border-top:15px solid rgba(0,0,0,0);border-right:none;border-bottom:15px solid rgba(0,0,0,0);content:\"\"}ul.cq_nav li::after{position:absolute;top:-1px;right:-16px;z-index:1;width:0;height:0;border-top:16px solid rgba(0,0,0,0);border-bottom:16px solid rgba(0,0,0,0);border-left:16px solid rgba(150,150,150,0.5);content:\"\"}@media only screen and (max-width:750px){ul.cq_nav{height:auto;background:none;border:none}ul.cq_nav li{border-top:1px solid rgba(150,150,150,0.5);border-bottom:1px solid rgba(150,150,150,0.5);margin-bottom:0.2em}}  ul.cq_class_nav{position:relative;display:block;overflow:hidden;margin:10px 0 0 0;padding:0;font-size:13px;line-height:30px}ul.cq_class_nav li{float:left;display:inline-block;padding:0 5px;height:33px;border-top:2px solid #aa9977;border-right:2px solid #554433;border-bottom:2px solid #554433;border-left:2px solid #aa9977;background-color:#887766;color:#e2dbc9;list-style:none;line-height:33px;cursor:pointer}ul.cq_class_nav li:nth-child(n+2){margin-left:5px}ul.cq_class_nav li img{margin-top:-2px;vertical-align:middle}ul.cq_class_nav li .class_name{margin-left:5px}ul.cq_class_nav li.current,ul.cq_class_nav li:hover.current{border-top:2px solid #ffffff;border-right:2px solid #bcbb99;border-bottom:2px solid #bcbb99;border-left:2px solid #ffffff;background-color:#ffeedd;color:#716254;cursor:default}ul.cq_class_nav li.current.force,ul.cq_class_nav li:hover.current.force{cursor:pointer}@media only screen and (min-width:751px){ul.cq_class_nav li:hover{border-top:2px solid #f3e8dd;border-right:2px solid #ae9c93;border-bottom:2px solid #ae9c93;border-left:2px solid #f3e8dd;background-color:#c3b19f;color:#716254}}@media only screen and (max-width:750px){ul.cq_class_nav{height:75px;margin:3px 0 0 0}ul.cq_class_nav li{margin-top:15px;height:35px;border-bottom:1px solid #464543;border-top-right-radius:3px;border-top-left-radius:3px;box-shadow:1px 0 2px rgba(0,0,0,0.4),0 -15px 6px #776556 inset;text-align:center;line-height:20px}ul.cq_class_nav li.current{z-index:2;margin-top:0;height:50px;border-bottom:1px solid #ffefde;;box-shadow:1px 0 2px rgba(0,0,0,0.4)}ul.cq_class_nav li img{margin:2px}ul.cq_class_nav li .class_name{display:block;margin:-15px 0 0 0}ul.cq_class_nav li.current .class_name{margin-top:0}ul.cq_class_nav::after{position:absolute;top:53px;left:0;z-index:0;display:block;width:100%;height:25px;background:linear-gradient(#ffefde,#fff);content:\"\";border-top-right-radius:5px}}   .hero_info_left{width:345px;float:left}.hero_info_right{width:calc(100% - 350px);float:right}@media only screen and (max-width:750px){.hero_info_left{width:100%;float:left}.hero_info_right{width:100%;float:left}} .hero_info_frame_title{font-size:14px;height:30px;line-height:30px;font-weight:700;color:#e2decd;padding-left:28px;margin:5px 0;background:#1f3234 url(http://p0.qhimg.com/t014bdb7fa95aa5808a.png) no-repeat left;background-position-x:10px}.hero_info_frame{background-color:#554432;margin-top:5px;padding:0;border:5px solid #decb9c}.hero_info_frame .background{background-color:#000;position:relative;color:#d6c394;font-size:15px;margin:9px;padding:5px 0}.hero_info_frame .title{font-size:14px;font-weight:bold;color:#e2decd;text-align:center}.hero_info_frame .cqtable{width:95%}@media only screen and (max-width:750px){.hero_info_frame{margin-top:0;border:none;background:none}.hero_info_frame .background{margin:0;border-radius:5px;background-color:#222}.hero_info_frame .cqtable{width:100%}}  .hero_info_image{width:auto;min-width:240px;height:252px;position:relative}.hero_info_image .image_left{width:18px;height:252px;background:url(http://p5.qhimg.com/t011b2afa40d06ad05b.png) no-repeat;position:absolute}.hero_info_image .image_middle{width:calc(100% - 36px);height:252px;background:url(http://p7.qhimg.com/t019271894c3ae792fd.png);position:absolute;margin-left:18px;text-align:center}.hero_info_image .image_middle .back{width:210px;height:252px;background:url(http://p5.qhimg.com/t0171e2fe5f33296f16.png) no-repeat;position:absolute;left:50%;margin-left:-105px;z-index:1}.hero_info_image .image_middle .hero_image{width:210px;margin-top:20px;position:absolute;left:50%;margin-left:-105px;z-index:2}.hero_info_image .image_middle .name{width:210px;margin-top:20px;position:absolute;left:50%;margin-left:-105px;z-index:2;color:#efebd6;font-weight:bold;font-family:'微软雅黑','宋体',sans-serif;text-shadow:0 2px 1px #393421;font-size:16px}.hero_info_image .image_middle .star{width:210px;margin-top:216px;position:absolute;left:50%;margin-left:-105px;z-index:2}.hero_info_image .image_middle .star img{margin-left:-3px}.hero_info_image .image_right{width:18px;height:252px;background:url(http://p4.qhimg.com/t01e768d17fffb3d462.png) no-repeat;position:absolute;right:0;top:0}.hero_info_image .gotcha_only{background:url(http://p0.qhimg.com/t011fad43184c7820aa.png) no-repeat;z-index:4;height:40px;width:100px;line-height:40px;color:#ffef94;font-size:.9em;font-weight:700;text-shadow:-1px 0 #000,1px 0 #000,0 1px #000,0 -1px #000;padding-left:20px;margin-left:-5px;margin-top:167px;position:absolute} .hero_info_score{width:100%}.hero_info_score .cqtable{margin:5px 0 0 0;width:100%;text-align:center;font-size:12px}.hero_info_score .star_icon{margin:0}@media only screen and (max-width:750px){.hero_info_score{width:100%;height:90px;padding:5px 0;margin:0}} .hero_info_comment{width:auto;padding:5px;background-color:#decf9c}.hero_info_comment .title{display:block;width:auto;height:17px;line-height:17px;margin-top:0;margin-left:15px;background:url(http://p2.qhimg.com/t0160f5f3ab6a15bf8d.png) no-repeat top;font-size:14px;font-weight:bold;color:#524939;text-shadow:0 1px 0 #948263;text-align:center}.hero_info_comment .comment{font-size:14px;color:#736952;margin:5px}@media only screen and (max-width:750px){.hero_info_comment{margin-top:0;background:none;padding:5px 0}.hero_info_comment .title{display:none}.hero_info_comment .comment{color:#3a3a3a}} .hero_info_stat{background-color:#554432;padding:0}.hero_info_stat .data{text-align:right;color:#ffcb39}.hero_info_stat .data.rightmost{border-right:solid 3px #5a4531}.hero_info_stat table{width:100%;border-spacing:0 3px;color:#efebde;font-size:15px;border:5px solid #decb9c;padding:6px 6px 6px 9px}.hero_info_stat table tr{background-color:#000;height:27px;line-height:27px}.hero_info_stat table td{padding:0 0.5em;width:25%}.hero_info_stat table .plus_stat{color:#9cdb52}@media only screen and (min-width:681px){.hero_info_stat .to_left{padding-right:45px}}@media only screen and (max-width:750px){.hero_info_stat{background:none}.hero_info_stat table{border:none;background-color:#554432;border-radius:5px;padding:0 2px}.hero_info_stat table tr{background-color:#222}.hero_info_stat .data.rightmost{border-right:none}.hero_info_stat table td{padding:0 0.3em}} .hero_info_promote{width:335px;text-align:center}.hero_info_promote .title{font-size:14px;font-weight:bold;color:#efebd6;text-shadow:0 1px 0 #000;text-align:center;margin-top:5px}.hero_info_promote .hero_icon{margin-top:5px;margin-left:1px;border:2px solid #5a4531}.hero_info_promote .hero_icon.current{border-color:#decf9c}.hero_info_promote .info{margin:3px auto 9px auto}.hero_info_promote .arrow{width:39px;height:39px;display:inline-block;background:url(http://p4.qhimg.com/t01f90ba1b24b4f32c1.png) no-repeat;vertical-align:top;margin-top:26px;margin-left:3px}.hero_info_promote .heroinfo_hero_icon{position:relative;display:inline-block;height:72px;width:72px;margin:0 auto}.hero_info_promote .heroinfo_hero_icon:nth-of-type(n+6){margin-top:10px}.hero_info_promote .heroinfo_hero_icon .star{position:absolute;left:5px;top:50px;line-height:22px;font-weight:bold;color:#ffcb42;text-shadow:0 -1px 1px #000,2px 1px 1px #000,-1px 0 1px #000,0 1px 1px #000,0 1px 1px #000}.hero_info_promote .heroinfo_hero_icon .star a,.hero_info_promote .heroinfo_hero_icon .star a:visited,.hero_info_promote .heroinfo_hero_icon .star a:hover{color:#ffcb42;text-decoration:none}.hero_info_promote .heroinfo_hero_icon .star img{vertical-align:middle;margin-top:-4px;margin-right:1px}@media only screen and (max-width:750px){.hero_info_promote{width:auto}.hero_info_promote .info{margin:0 auto;max-width:320px;background-color:#554432;border-radius:5px;padding:5px 0 7px 9px}.hero_info_promote .arrow{margin-left:0}}@media only screen and (max-width:350px){.hero_info_promote .heroinfo_hero_icon{margin:0 5px 0 5px}.hero_info_promote .info{margin:0 auto;max-width:260px;background-color:#554432;border-radius:5px;padding:5px 10px 7px 0}.hero_info_promote .hero_icon{margin-left:10px}.hero_info_promote .arrow{display:none}} .hero_info_acquire{width:335px}.hero_info_acquire .title{font-size:14px;font-weight:bold;color:#efebd6;text-shadow:0 1px 0 #000;text-align:center;margin-top:5px}.hero_info_acquire .info{margin:3px 7px 8px 4px}.hero_info_acquire .acquire{width:104px;height:156px;display:inline-block;background:url(http://p6.qhimg.com/t0130d2bfa8b1f8dfe8.png) no-repeat;vertical-align:top;margin-top:4px;margin-left:4px;position:relative;text-align:center}.hero_info_acquire .acquire img{position:absolute;margin-top:18px;width:98px;margin-left:-49px;left:50%}.hero_info_acquire .acquire .a_title{position:absolute;margin-top:130px;left:50%;width:104px;margin-left:-52px;font-size:13px;color:#ffcb39}.hero_info_acquire .acquire .desc{color:#efebd6;text-shadow:0px 1px 0 #000,0px -1px 0 #000,1px 0px 0 #000,-1px 0px 0 #000;position:absolute;margin-top:13px;left:50%;width:80px;margin-left:-40px;font-size:13px;line-height:17px}@media only screen and (max-width:750px){.hero_info_acquire{width:auto}.hero_info_acquire.hero_info_frame{padding:0 3px}.hero_info_acquire .info{margin:0 auto;max-width:325px}}@media only screen and (max-width:350px){.hero_info_acquire .acquire{margin-left:0}} .hero_info_skill img{position:absolute;margin-top:9px;margin-left:9px;display:inline-block}.hero_info_skill .name{line-height:23px;color:#efebd6;position:absolute;margin-top:25px;margin-left:70px;display:inline-block}.hero_info_skill .name.havepassive{margin-top:12px}.hero_info_skill .name a,.hero_info_skill .name a:visited{color:#efebd6}.hero_info_skill .name .main{color:#f7725b}.hero_info_skill .name .support{color:#557fd5}.hero_info_skill .description{display:inline-block;margin:70px 9px 0 9px;word-break:break-all}.hero_info_skill .passive{color:#6b96ff;display:inline-block;margin:9px 9px 0 9px;word-break:break-all}.hero_info_skill .passive.off{color:#444}.hero_info_skill .comment{color:#a0a7c9;display:inline-block;width:96%;margin:9px 9px 0 9px;word-break:break-all} #mw-content-text.mw-content-ltr .hero_info_skill.hero_info_frame\u003Ediv\u003Ea:nth-of-type(1){display:block}@media only screen and (max-width:750px){.hero_info_skill .passive.off{color:#555}} .hero_sp_skill img{position:absolute;margin-top:9px;margin-left:9px;display:inline-block}.hero_sp_skill .name{color:#efebd6;position:absolute;margin-top:25px;margin-left:70px;display:inline-block}.hero_sp_skill .name a,.hero_sp_skill .name a:visited{color:#efebd6}.hero_sp_skill .description{display:inline-block;width:96%;margin:70px 9px 0 9px;word-break:break-all}.hero_sp_skill .comment{color:#a0a7c9;width:96%;display:inline-block;margin:9px 9px 0 9px;word-break:break-all;font-style:normal} .hero_info_sbweapon .cqtable{text-align:center;font-size:12px}.hero_info_sbweapon .cqtable .sbw_name{height:26px;line-height:26px;width:160px}.hero_info_sbweapon .cqtable .sbw_stat span.stat{vertical-align:middle;line-height:20px;position:relative;width:99%;display:inline-block;color:#efebde;font-size:12px}.hero_info_sbweapon .cqtable .sbw_stat span span.num{color:#ffcb39;position:absolute;right:2px}.hero_info_sbweapon .cqtable .sp{color:#c98a0a !important;font-size:12px !important}.hero_info_sbweapon .cqtable .atk{color:#df6853;!important}.hero_info_sbweapon .cqtable .def{color:#5e87de;!important}.hero_info_sbweapon .cqtable .func{color:#ccbd75;!important}.hero_info_sbweapon .cqtable .other{color:#888;!important}@media only screen and (min-width:751px){.hero_info_sbweapon .cqtable{margin:5px auto}}@media only screen and (max-width:750px){.hero_info_sbweapon .cqtable:nth-child(n+3){margin-top:5px}.hero_info_sbweapon .background{background:none}.hero_info_sbweapon .cqtable .sbw_name{width:135px;font-size:15px}} .hero_weapon_upgrade .cqtable{text-align:center;font-size:12px;margin:0 auto}.hero_weapon_upgrade .ittext-shadow:-1px 0 #000,1px 0 #000,0 1px #000,0 -1px #000}.hero_weapon_upgrade .atk{color:#df6853 !important}.hero_weapon_upgrade .def{color:#5e87de !important}.hero_weapon_upgrade .func{color:#ccbd75 !important}@media only screen and (max-width:750px){.hero_weapon_upgrade .background{background:none}} @media only screen and (max-width:750px){#hero_move_frame{display:none}} .hero_info_edit{font-size:75%;text-align:right}@media only screen and (max-width:750px){.hero_info_left .cqtable .contents table,.hero_info_right .cqtable .contents table{background-color:#222}}  .cqtable.hero_list{text-align:center;font-size:15px;width:100%;margin:0 auto}.cqtable.hero_list .name_header{width:17em}.cqtable.hero_list .data_header{width:55px}.cqtable.hero_list .score_header{width:110px}.cqtable.hero_list .desc_header{width:Calc(100% - 17em - 220px)}.cqtable.hero_list .acquire_header,.cqtable.hero_list .acquire_header_short{width:135px}.cqtable.hero_list .icon{text-align:left;padding-left:0.5em;height:80px}.cqtable.hero_list .star_icon{background-color:#222;height:26px;line-height:26px;display:block;margin:0;padding:0 0 0 7px;border-radius:5px;width:95px;text-align:left}@media only screen and (min-width:751px){.cqtable.hero_list .total_score{color:red}}@media only screen and (max-width:750px){.cqtable.hero_list{padding:0 5px}.cqtable.hero_list .class_header{width:25px}.cqtable.hero_list .m_score_header{width:50px}.cqtable.hero_list .gotcha_header{width:30px}.cqtable.hero_list .name_header{width:Calc(100% - 155px)}.cqtable.hero_list .icon{height:auto}.cqtable.hero_list .icon .hero_icon,.cqtable.hero_list .icon .hero_icon img{height:36px;width:36px}.cqtable.hero_list .icon .hero_icon .star{display:none}.cqtable.hero_list .icon .hero_icon .class_icon{display:none}.cqtable.hero_list .icon .gotcha{display:none}.cqtable.hero_list .icon_alone .class_icon{position:inherit;display:block;margin:0}.cqtable.hero_list.r3 .name_header{width:Calc(100% - 165px)}.cqtable.hero_list .acquire_header{width:35px}.cqtable.hero_list .acquire_header_short{width:30px}.cqtable.hero_list.sortable th{background-image:none !important;padding-right:inherit !important}} .cqtable.skill{text-align:center;font-size:12px;margin:0 auto}.cqtable.skill td{height:20px;line-height:20px}.cqtable.skill .skill_img{width:80px;height:80px;line-height:80px;text-align:center}.cqtable.skill .skill_img img{vertical-align:middle}.cqtable.skill .skill_name{font-size:18px;font-family:\"微软雅黑\",\"宋体\",sans-serif;font-weight:bold;color:white;line-height:33px}.cqtable.skill .skill_itheight:50px}.cqtable.belong_list .skill_ittext-align:left;padding-left:0.5em;height:40px}.class_name a,.class_name a:link,.class_name a:visited{color:inherit}@media only screen and (max-width:750px){.skill_info{width:100%;margin:0}.skill_info .cqtable{width:100%}.cqtable.skill .skill_img{width:60px;height:60px;line-height:60px;padding:0}.cqtable.skill .requires{display:none}.cqtable.skill .right_border{border-right:1px solid #e5d0b3}} @media only screen and (min-width:751px){.cqtable.skill{font-size:inherit;padding:4px;border:5px double grey;border-radius:6px;width:80%}.cqtable.skill td.skill_img{width:80px;height:80px;border-right:5px solid #FEEFDA;border-bottom:5px solid #FEEFDA;border-left:none !important;border-top:none !important;background:none !important}.cqtable.skill td.skill_img div{height:80px;line-height:80px;width:80px;background-color:#776755;border-radius:10px}.cqtable.skill .skill_name{font-size:25px;line-height:125%;border:1px solid grey;border-radius:3px 3px 0 0}.cqtable.skill .item.skill_itborder:none;border-radius:0;height:50px}.cqtable.skill .item.skill_desc{border:none;border-radius:0;padding:5px 8px}.cqtable.skill .item.skill_desc.top_border{border-top:1px solid #decc9c}.cqtable.skill .item.skill_desc.left_border{border-left:1px solid #decc9c}.cqtable.skill.sp{width:100%}.cqtable.skill .requires{width:190px}}  .cqtable.skill_list .class_icon{height:31px;line-height:31px;width:31px;text-align:center;background-color:rgba(34,34,34,0.9);border-radius:4px;display:inline-block}.cqtable.skill_list .class_icon img{margin-top:-1px}@media only screen and (min-width:751px){.cqtable.skill_list tr td:nth-child(1){width:200px}.cqtable.skill_list tr th:nth-child(2){width:50px}.cqtable.skill_list tr th:nth-child(3){width:120px}.cqtable.skill_list tr th:nth-child(4){width:Calc(100% - 370px)}}@media only screen and (max-width:750px){.cqtable.skill_list tr th:nth-child(1){width:70px}.cqtable.skill_list tr th:nth-child(2){width:40px}.cqtable.skill_list tr th:nth-child(3){width:40px}.cqtable.skill_list tr th:nth-child(4){width:Calc(100% - 150px)}.cqtable.skill_list tr td:nth-child(1){text-align:center}}  .cqtt{display:inline-block}.cqtooltip{position:fixed;display:none;z-index:100;opacity:1;box-sizing:content-box}.cqtooltip *{box-sizing:content-box}#ttimage{display:none} .tt_skill{background-color:#000;width:320px;position:relative;color:#d6c394;font-size:13px;padding:8px 8px 10px 8px;border-radius:5px;border:3px solid #444}.tt_skill img{position:absolute}.tt_skill .name{line-height:23px;font-size:15px;color:#efebd6;position:absolute;margin-top:15px;margin-left:60px;display:inline-block}.tt_skill .name.havepassive{margin-top:3px}.tt_skill .name a,.hero_info_skill .name a:visited{color:#efebd6}.tt_skill .name .main{color:#f7725b}.tt_skill .name .support{color:#557fd5}.tt_skill .description{display:inline-block;margin:65px 2px 0 2px}.tt_skill .passive{color:#6b96ff;display:inline-block;margin:9px 2px 0 2px}.tt_skill .passive.off{color:#444} .tt_spskill{background-color:#000;width:320px;position:relative;color:#d6c394;font-size:13px;padding:8px 8px 10px 8px;border-radius:5px;border:3px solid #444}.tt_spskill img{position:absolute}.tt_spskill .name{line-height:23px;font-size:15px;color:#efebd6;position:absolute;margin-top:15px;margin-left:60px;display:inline-block}.tt_spskill .name a,.tt_spskill .name a:visited{color:#efebd6}.tt_spskill .description{display:inline-block;margin:65px 2px 0 2px} .tt_weapon{width:270px;background-color:#554432;border:3px solid #999a77;font-size:13px;padding:8px 8px 10px 8px;border-radius:5px;position:relative;color:#e6e0cd}.tt_weapon .weapon_icon{margin:0;position:absolute}.tt_weapon .name{font-size:15px;font-weight:bold;position:absolute;margin-top:7px;margin-left:69px}.tt_weapon .star{background:url(http://joymepic.joyme.com/wiki/images/cq/2/28/Char_star.png?v=201801171714) no-repeat;background-position:left;line-height:22px;font-weight:bold;font-size:15px;color:#ffcb42;text-shadow:0px -1px 1px #000,2px 1px 1px #000,-1px 0px 1px #000,0px 1px 1px #000,0px 1px 1px #000;position:absolute;right:0;margin-top:4px;margin-right:38px;padding-left:23px}.tt_weapon .job{position:absolute;right:0;margin-top:5px;margin-right:10px;height:21px;width:20px;text-align:center;background-color:#000;border-radius:4px}.tt_weapon .job img{vertical-align:middle}.tt_weapon .attack,.tt_weapon .speed{height:16px;line-height:16px;width:92px;background-color:#2d241b;position:absolute;padding:4px}.tt_weapon .attack{margin-top:30px;margin-left:65px}.tt_weapon .speed{margin-top:30px;margin-left:170px}.tt_weapon .attack span,.tt_weapon .speed span{position:absolute;right:0;margin-right:8px;color:#d4b643}.tt_weapon .effect{width:260px;background-color:#000;margin-left:0;margin-top:65px;padding:5px;border-radius:3px;color:#c98a0a}.tt_weapon .effect .title{width:80px;height:23px;line-height:23px;text-align:center;background-color:#2d241b;position:absolute;margin-left:-5px;margin-top:-5px;border-top-left-radius:3px;border-bottom-right-radius:3px}.tt_weapon .effect span{display:block;margin-top:25px}.tt_weapon .score{width:270px;height:23px;background-color:#000;margin-left:0;margin-top:5px;border-radius:3px;color:#c98a0a}.tt_weapon .score .title{width:80px;height:23px;line-height:23px;text-align:center;background-color:#2d241b;position:absolute;border-radius:3px}.tt_weapon .score \u003E span{display:block;margin-left:88px;line-height:20px;height:20px}.tt_weapon .score \u003E span \u003E span.star_icon{display:block;padding-top:0} .tt_score{width:270px;background-color:#554432;border:3px solid #999a77;font-size:13px;padding:8px 8px 10px 8px;border-radius:5px;color:#e6e0cd}.tt_score .title{font-size:15px;font-weight:bold}.tt_score .desc{width:260px;background-color:#000;margin-left:0;margin-top:5px;padding:5px;;border-radius:3px;color:#d6c394;}.tt_score .desc_nobg{width:260px;margin-left:0;margin-top:5px;padding:5px}.tt_score .cqtable .star_icon{background-color:#222;height:26px;line-height:26px;display:block;margin:0;padding:0 0 0 7px;border-radius:5px;width:95px;text-align:left}.tt_score .cqtable .star_icon img{margin-top:-1px}   .cq_main_page{width:100%}.cq_main_page .class_icon{display:inline-block;height:21px;line-height:20px;width:20px;text-align:center;background-color:rgba(34,34,34,0.9);border-radius:4px}.cq_main_page .class_icon img{vertical-align:middle;margin-top:-3px}.cq_main_page #zukan .class_icon{margin-left:5px}.cq_main_page .cq_menu.left{float:left;width:220px}.cq_main_page .cq_menu.center{float:left;width:Calc(100% - 440px);margin-left:10px;text-align:inherit}.cq_main_page .cq_menu.right{float:left;width:200px;margin-left:10px}.cq_main_page .cq_menu .title{color:#d6c394;font-weight:bold;line-height:40px;height:40px;font-size:17px;border-top-left-radius:3px;border-top-right-radius:3px;background:#614c3a no-repeat 3px center;padding-left:54px}.cq_main_page .book1{background-image:url(http://p8.qhimg.com/t0161ed45b1d2baac19.png) !important}.cq_main_page .book2{background-image:url(http://p3.qhimg.com/t01b02be2a55328773f.png) !important}.cq_main_page .book3{background-image:url(http://p0.qhimg.com/t01f50d94123df023ac.png) !important}.cq_main_page .book4{background-image:url(http://p6.qhimg.com/t01e83be7c57da3d56f.png) !important}.cq_main_page .book5{background-image:url(http://p9.qhimg.com/t01b41a5f0d80f22d24.png) !important}.cq_main_page .cq_menu h2{margin:0 !important;border-left:1px solid #2e5559;border-right:1px solid #12191a}.cq_main_page .cq_menu ul{margin:0;padding:0;overflow:hidden;background-color:rgb(254,239,218)}.cq_main_page .cq_menu ul.menu_list li{margin:0;padding:0;height:30px;line-height:30px;font-size:12px}.cq_main_page .cq_menu ul.menu_list li a{margin-left:10px}.cq_main_page .cq_menu ul.menu_list li .class_icon a{margin-left:0}.cq_main_page .cq_menu ul.menu_list li{background-color:#feefda}.cq_main_page .cq_menu ul.menu_list li:nth-child(odd){background-color:#decc9c}.cq_main_page .cq_menu .cq_menu_item:nth-child(n+2){margin-top:10px}.cq_main_page .cq_menu .cq_menu_item .update_list{background-color:rgb(254,239,218);border-left:1px solid #decc9c;border-right:1px solid #e5d0b3;border-bottom:1px solid #e5d0b3;padding:10px 5px}.cq_main_page .cq_menu_item{border:1px solid #402909;border-radius:3px} .cq_main_page #update.cq_menu_item{border:inherit}.cq_main_page #update.cq_menu_item .title{border-left:1px solid #735841;border-top:1px solid #735841;border-right:1px solid #473a2e}.cq_main_page .update_list{border-bottom-left-radius:3px;border-bottom-right-radius:3px}.cq_main_page .update_list .update_item{overflow:hidden}.cq_main_page .update_list .update_item:nth-child(n+2){margin-top:10px}.cq_main_page .update_list .update_item div{float:left}.cq_main_page .update_list .update_item div span{display:block}.cq_main_page .update_list .update_item div:nth-child(2){width:Calc(100% - 55px);margin-left:12px;border:1px solid #D8BC96;background-color:#decc9c;border-radius:3px;padding:3px;position:relative;font-size:15px}.cq_main_page .update_list .update_item div:nth-child(2) .date{font-size:12px;color:red;margin-bottom:5px}.cq_main_page .update_list .update_item div:nth-child(2) span.sc1{left:-9px;top:9px;border-left:0;border-top:4px solid rgba(0,0,0,0);border-right:8px solid #D8BC96;border-bottom:4px solid rgba(0,0,0,0)}.cq_main_page .update_list .update_item div:nth-child(2) span.sc2{left:5px;top:-3px;border-left:0;border-top:3px solid #D8BC96;border-right:5px solid #decc9c;border-bottom:3px solid #D8BC96}.cq_main_page .update_list .update_item div:nth-child(2) span.sc1,.update_list .update_item div:nth-child(2) span.sc2{display:block;height:0;width:0;position:absolute;font-size:0;line-height:0} .cq_main_page .event_list{background-color:rgb(254,239,218)}.cq_main_page .event_list .event_item:nth-child(odd){background-color:#decc9c}.cq_main_page .event_list .event_item{height:55px;margin:0;padding:0;overflow:hidden}.cq_main_page .event_list .event_item div{float:left}.cq_main_page .event_list .event_item div:nth-child(2){width:Calc(100% - 81px)}.cq_main_page .event_list .event_item div:nth-child(2) \u003E *{display:block;font-size:12px;height:16px;line-height:16px}.cq_main_page .event_list .event_item div:nth-child(2) img{vertical-align:middle;margin-top:-3px}.cq_main_page .event_list .event_item div:nth-child(2) a{background-color:#614c3a;color:#d6c394;text-align:center}.cq_main_page .event_list .event_item div:nth-child(2) span{padding:0 5px}.cq_main_page .event_list .event_item div:nth-child(2) span.class_icon{padding:0}.cq_main_page .event_list .event_item div:nth-child(2) span.bonus{margin-top:1px}.cq_main_page #event .event_list:nth-last-child(1),.cq_main_page #event .event_list:nth-last-child(1) .event_item:nth-last-child(1){border-bottom-left-radius:3px;border-bottom-right-radius:3px} .cq_main_page .guide_list{background-color:rgb(254,239,218)}.cq_main_page .guide_list .guide_item{padding:5px;display:block}.cq_main_page .guide_list .guide_item:nth-child(odd){background-color:#decc9c}.cq_main_page .guide_list .guide_item .guide_img{float:left;margin-right:5px}.cq_main_page .guide_list .guide_item .guide_title{font-size:15px;color:red}.cq_main_page .guide_list .guide_item .guide_desc{font-size:12px;clear:both} .main_page_m_nav{display:none}@media only screen and (max-width:750px){.main_page_m_nav{display:block}.main_page_m_nav ul{margin:0;padding:0;overflow:hidden;background-color:#a5aead;margin-bottom:9px;padding-top:5px}.main_page_m_nav ul li{display:inline-block;float:left;color:#FEEFDA;font-weight:bold;line-height:20px;height:20px;width:65px;text-align:center;font-size:17px;border-top-left-radius:3px;border-top-right-radius:3px;background:#887766 no-repeat center 3px;padding:25px 0 0 0;margin-top:15px;margin-left:3px;list-style:none;box-shadow:1px 0 2px rgba(0,0,0,0.4),0 -15px 6px #776556 inset;border-left:2px solid #ad9673;border-top:2px solid #ad9673;border-right:2px solid #524539;border-bottom:1px solid #464543}.main_page_m_nav ul li.current{background-color:#ffefde;border-left:2px solid #fff;border-top:2px solid #fff;border-right:2px solid #bdba94;border-bottom:1px solid #ffefde;color:#524939;padding:40px 0 0 0;margin-top:0;box-shadow:1px 0 2px rgba(0,0,0,0.4)}.cq_main_page{overflow:hidden;background-color:#ffefde;padding-bottom:5px}.cq_main_page .cq_menu{width:Calc(100% - 10px) !important;margin:0 5px !important}.cq_main_page .cq_menu .cq_menu_item{display:none}#update{display:block}.cq_main_page .cq_menu .cq_menu_item:nth-child(n+2){margin-top:0}.cq_main_page .cq_menu_item .title{display:none}.cq_main_page .cq_menu .cq_menu_item .update_list{border:0;padding:0 5px}}@media only screen and (max-width:320px){.main_page_m_nav ul li{width:55px}} .tag{min-height:80px;position:relative;background-color:#E7E3C6;-moz-border-radius:6px;-webkit-border-radius:6px;border-radius:6px;padding:5px}.tag:before,.tag:after{content:\"\";display:block;border-width:15px;position:absolute;top:1px;left:-31px;font-size:0;line-height:0}.tag:after{left:-28px} .ad-box{position:fixed;bottom:50px;cursor:pointer;z-index:9}.ad-box.left-ad{left:0}.ad-box.right-ad{right:0}.ad-box a{display:block;width:130px;height:190px;position:relative;z-index:9}.ad-box .close-icon{display:block;position:absolute;top:0;right:0;width:20px;height:20px;line-height:20px;z-index:99;font-style:normal;font-size:16px;color:#fff;background:rgba(0,0,0,.5);text-align:center}.ajaxpoll .ajaxpoll-id-info{display:none}.ajaxpoll{border:1px solid RGBA(97,76,58,0) !important;background:none repeat scroll 0 0 #ffe7c7 !important;width:auto;margin-top:5px;margin-left:3px;padding:10px 22px 10px 10px !important}.hero_sbweapon_gif{background-color:#554432;margin-top:5px;padding:0;border:5px solid #decb9c;text-align:center;padding:10px auto}    .wiki-navbox{ box-sizing:border-box;border:1px solid #aaa;width:100%;clear:both;font-size:88%;text-align:center;padding:1px;margin:1em auto 0; }.wiki-navbox .wiki-navbox{margin-top:0; }.wiki-navbox + .wiki-navbox{margin-top:-1px; }.wiki-navbox-inner,.wiki-navbox-subgroup{width:100%}.wiki-navbox-group,.wiki-navbox-title,.wiki-navbox-abovebelow{padding:0.25em 1em; line-height:1.5em;text-align:center}th.wiki-navbox-group{ white-space:nowrap; text-align:right}.wiki-navbox,.wiki-navbox-subgroup{background:#fdfdfd; }.wiki-navbox-list{line-height:1.5em;border-color:#fdfdfd; }.wiki-navbox th,.wiki-navbox-title{background:#ccccff; }.wiki-navbox-abovebelow,th.wiki-navbox-group,.wiki-navbox-subgroup .wiki-navbox-title{background:#ddddff; }.wiki-navbox-subgroup .wiki-navbox-group,.wiki-navbox-subgroup .wiki-navbox-abovebelow{background:#e6e6ff; background-color:#FFE7C7;color:#000}.wiki-navbox-even{background:#f7f7f7; }.wiki-navbox-odd{background:transparent; }.wiki-navbox .hlist td dl,.wiki-navbox .hlist td ol,.wiki-navbox .hlist td ul,.wiki-navbox td.hlist dl,.wiki-navbox td.hlist ol,.wiki-navbox td.hlist ul{padding:0.125em 0; } .wiki-navbar{display:inline;font-size:88%;font-weight:normal}.wiki-navbar ul{display:inline;white-space:nowrap}.mw-body-content .wiki-navbar ul{line-height:inherit}.wiki-navbar li{word-spacing:-0.125em}.wiki-navbar.mini li abbr[title]{font-variant:small-caps;border-bottom:none;text-decoration:none;cursor:inherit} .infobox .wiki-navbar{font-size:100%}.wiki-navbox .wiki-navbar{display:block;font-size:100%}.wiki-navbox-title .wiki-navbar{ float:left; text-align:left; margin-right:0.5em;width:6em} .collapseButton{ float:right;font-weight:normal; margin-left:0.5em; text-align:right;width:auto} .wiki-navbox .collapseButton{width:6em} .mw-collapsible-toggle{font-weight:normal; text-align:right}.wiki-navbox .mw-collapsible-toggle{width:6em} .hlist dl,.hlist ol,.hlist ul{margin:0;padding:0} .hlist dd,.hlist dt,.hlist li{margin:0;display:inline} .hlist.inline,.hlist.inline dl,.hlist.inline ol,.hlist.inline ul,.hlist dl dl,.hlist dl ol,.hlist dl ul,.hlist ol dl,.hlist ol ol,.hlist ol ul,.hlist ul dl,.hlist ul ol,.hlist ul ul{display:inline} .hlist .mw-empty-li{display:none} .hlist dt:after{content:\":\"}.hlist dd:after,.hlist li:after{content:\" · \";font-weight:bold}.hlist dd:last-child:after,.hlist dt:last-child:after,.hlist li:last-child:after{content:none} .hlist dd dd:first-child:before,.hlist dd dt:first-child:before,.hlist dd li:first-child:before,.hlist dt dd:first-child:before,.hlist dt dt:first-child:before,.hlist dt li:first-child:before,.hlist li dd:first-child:before,.hlist li dt:first-child:before,.hlist li li:first-child:before{content:\" (\";font-weight:normal}.hlist dd dd:last-child:after,.hlist dd dt:last-child:after,.hlist dd li:last-child:after,.hlist dt dd:last-child:after,.hlist dt dt:last-child:after,.hlist dt li:last-child:after,.hlist li dd:last-child:after,.hlist li dt:last-child:after,.hlist li li:last-child:after{content:\")\";font-weight:normal} .hlist ol{counter-reset:listitem}.hlist ol \u003E li{counter-increment:listitem}.hlist ol \u003E li:before{content:\" \" counter(listitem) \"\\a0\"}.hlist dd ol \u003E li:first-child:before,.hlist dt ol \u003E li:first-child:before,.hlist li ol \u003E li:first-child:before{content:\" (\" counter(listitem) \"\\a0\"}      .nry-section1{background:#ffeede;color:#211812;font-size:14px;line-height:1.5em}#article{font-size:inherit;line-height:inherit;color:inherit}#article p{line-height:inherit}#mw-content-text p,pre,.mw-code,td,th,li,dd,dt{line-height:inherit;padding-top:0;clear:inherit}pre,.mw-code{font-size:inherit;line-height:inherit;color:inherit;background-color:#feefda;border:2px solid #4e4e4c;border-radius:5px;padding:1em;margin:10px 0} .table{display:table;border:1px solid #000}.table .table-row{display:table-row}.table .table-row .table-cell{display:table-cell;border-right:1px solid #000;padding:3px;border-bottom:1px solid #000;border-collapse:collapse}.table .table-row .table-cell:nth-last-child(1){border-right:none}.table .table-row:nth-last-child(1) .table-cell{border-bottom:none} a,a:visited,a:link{color:#36b}a.new,a.new:visited,a.new:link{color:#aaaaaa}a.external,a.external:visited,a.external:link{color:#36b}a:hover{text-decoration:underline} .headnav{border-right:1px solid #bfac8c;background:#ffeede}#p-cactions{display:none}#header{position:absolute;top:-90px;width:100%;margin:0 0 0 -10px}#p-search{top:0;right:0}.wiki-logo{top:0;left:0} #firstHeading{color:#5b493d}#head-comments,#head-more,#head-contributebox{margin:13px 0 0 15px} #mw-content-text h2{background:#614c3a;color:#f7f8e8;font-size:1.5em;font-weight:bold;line-height:1.5em;height:1.5em;padding:2px 0 2px 12px;border:none;box-sizing:content-box;margin:16px 0}h2 .mw-headline{box-shadow:none}.client-js .mw-content-ltr h2 .mw-editsection-bracket:first-of-type,.client-js .mw-content-rtl h2 .mw-editsection-bracket:not(:first-of-type),.client-js .mw-content-ltr h2 .mw-editsection-divider,.client-js .mw-content-rtl h2 .mw-editsection-bracket:first-of-type,.client-js .mw-content-ltr h2 .mw-editsection-bracket:not(:first-of-type){color:#f7f8e8} #mw-content-text h3{font-size:1.3em;width:auto;line-height:1.5em;height:1.5em;font-weight:bold;border:0;padding:0 0 0 17px;margin:16px 0;color:#555;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAPCAYAAADQ4S5JAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RTc5N0QwNUI1RTE4MTFFNjkwQkZGMkMyRkEwREVBRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RTc5N0QwNUE1RTE4MTFFNjkwQkZGMkMyRkEwREVBRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjQ4N0MyNzA3NzdDMTExRTU4MzdERkRCNTJBNjBGMUY2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjQ4N0MyNzA4NzdDMTExRTU4MzdERkRCNTJBNjBGMUY2Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+BZ3WuAAAAEVJREFUeNpi/P//PwMMhIWFwTmrVq1iZMACmBhIBCRrYMElgct5tHcSY2hoKFarkZ1E31BixBVxyIC+oYQz4gYuLQEEGAAcyhoXlpwu2AAAAABJRU5ErkJggg==) no-repeat left 5px;box-sizing:content-box;border-bottom:1px solid #614C3A}#mw-content-text h3 span.mw-headline{font-size:inherit;line-height:inherit} #mw-content-text h4 span.mw-headline{font-size:inherit}#mw-content-text h4{font-size:1.2em;line-height:1.5em;font-weight:bold;margin:0.3em 0;padding:0} #toc{background:#feefda}.mw-content-ltr .toc ul ul,.mw-content-ltr #toc ul ul,.mw-content-rtl .mw-content-ltr .toc ul ul,.mw-content-rtl .mw-content-ltr #toc ul ul{margin:0 0 0 0.8em}.toc .tocnumber::after{content:\".\"}#toc ul,.toc ul,#toc ul li,.toc ul li{list-style:none;margin:0.1em}#toc{margin:10px 0}#mw-content-text .toc h2{font-size:inherit;color:inherit;background:inherit;border:none;padding:inherit;margin:inherit;font-weight:inherit;height:inherit;line-height:inherit} .dqnavbox{width:100%;box-shadow:0 0 1px #555;margin:10px 0}.dqnav_list{background:#f9e7cc}.dqnav_title{text-align:center;vertical-align:middle;width:100px;background:#614c3a;color:#fff;text-shadow:1px 0 0 #000,-1px 0 0 #000,0 -1px 0 #000,0 1px 0 #000;box-shadow:inset 0 1px #b9965e,inset 1px 0 #b09163,inset 0 -1px #6d5935,inset -1px 0 #6d5935}.mw-content-ltr ul.zynav{margin:0}.mw-content-ltr ul.zynav li{display:inline-block;margin:0;list-style:none}.mw-content-ltr ul.zynav li .selflink{background:#AC9C83 url(http://joymepic.joyme.com/wiki/images/dq10/d/db/Ico_subnavi.gif?v=201608031146) no-repeat 5px 4px;color:#FFF;cursor:default;text-decoration:none;padding:2px 5px 2px 21px}.mw-content-ltr ul.zynav li a{padding:0 0 0 22px;background:url(http://joymepic.joyme.com/wiki/images/dq10/d/db/Ico_subnavi.gif?v=201608031146) no-repeat 5px -31px} table.wikitable{margin:5px 0}table.wikitable \u003E tr \u003E th,table.wikitable \u003E tr \u003E td,table.wikitable \u003E * \u003E tr \u003E th,table.wikitable \u003E * \u003E tr \u003E td{border:1px solid #948B54;background:#feefda;padding:3px 6px;height:auto}table.wikitable \u003E tr \u003E th,table.wikitable \u003E * \u003E tr \u003E th{background-color:#614c3a;color:#f7f8e8;text-align:center}table.wikitable \u003E tr:nth-child(odd) \u003E td,table.wikitable \u003E * \u003E tr:nth-child(odd) \u003E td{background-color:#FFE7C7}table.wikitable th a,table.wikitable th a:link,table.wikitable th a:visited{color:inherit} .mw-content-ltr ul,.mw-content-rtl .mw-content-ltr ul{margin:0.4em 0;list-style-type:disc}ul ul{margin:0}ul li{margin:0 0 0 20px}.gl-tool-con ul li{margin:0} #catlinks{margin:10px -10px;background:transparent;padding:0;border:0}.mw-normal-catlinks{background:#FFE7C7;font-size:inherit;line-height:inherit;color:inherit;padding:5px 10px;margin:0;box-shadow:0 0 3px #222;border-radius:3px}#footer-info{display:none}.wiki_comment_box{padding:10px 20px;margin:0;border:0}.blog_comment{margin:0 !important;border:0 !important;padding:0 !important;font-size:inherit !important}.hot-tag{padding:10px 20px;margin:0;border:0;line-height:1em}.con-banner{padding:10px 0 20px;margin:0;border:0}.hot-wikiList{padding:10px;line-height:1em;box-shadow:0 0 3px #222;border-radius:3px}.hot-wikiList a+a{margin-left:1%}.hot-wikiList a{width:19.2%;height:auto}.hot-wikiList a span{width:100%}.con-banner a img{box-shadow:0 0 3px #222;border-radius:3px;display:block;margin:0 auto}.blog_comment\u003E.clearfix{font-size:1.2em;line-height:1.5em;font-weight:bold;margin:0.3em 0;padding:0 !important}.hot-tag h6{font-size:1.2em;line-height:1.5em;font-weight:bold;margin:0.3em 0;padding:0;text-indent:0} .wiki-navbox{margin:30px -10px 0;width:auto;box-shadow:0 0 3px #222;border-radius:3px}.wiki-navbox th,.wiki-navbox-title{background:#614c3a;color:#f7f8e8}.wiki-navbox-subgroup .wiki-navbox-group,.wiki-navbox-subgroup .wiki-navbox-abovebelow{background-color:#fdd198;color:#000}.wiki-navbox-even{background:#FFE7C7}.wiki-navbox,.wiki-navbox-subgroup{background:#ffeede}.wiki-navbox-title a.external,.wiki-navbox-title a.external:visited,.wiki-navbox-title a.external:link,.wiki-navbox-title a,.wiki-navbox-title a:visited,.wiki-navbox-title a:link{color:#d6c394}.wiki-navbox-title .wiki-navbox-title-block{font-size:1.4em;line-height:1.4em}.wiki-navbox-title .wiki-navbar{margin-top:0.3em} .mainpage_img{width:auto;box-shadow:0 0 3px #222;border-radius:3px}.mainpage_img img{border-radius:3px;width:100% !important;height:100% !important}.mainpage_box{margin:16px -10px}.mainpage_box_left{display:table-cell;width:75%;vertical-align:top}.mainpage_box_right{display:table-cell;vertical-align:top;width:25%} .mainpage-block-style{background:#ffeede;box-shadow:0 0 3px #222;border-radius:3px;padding:4px 4px 6px}.mainpage-block+.mainpage-block,.mainpage-block+.wiki-navbox,.wiki-navbox+.wiki-navbox,.wiki-navbox+.mainpage-block{margin-top:16px}#mw-content-text .mainpage_box h2:first-child{margin-top:0;border-radius:3px 3px 0 0}#mw-content-text .mainpage_box h2{margin:5px 0;font-size:1.2em}.mainpage-block div.mainpage-block-text{padding:0 10px}.mainpage-block_div{display:table;border-collapse:separate;border-spacing:8px;margin:-8px;padding:0 !important}.mainpage-block_left{display:table-cell;width:75%}.mainpage-block_right{display:table-cell;width:25%}.mainpage-two-col{display:table;border-collapse:separate;border-spacing:16px;margin:0 -32px -16px -16px !important}.mainpage-two-col-left{display:table-cell;float:none;width:50%;margin:-16px}.mainpage-two-col-right{display:table-cell;float:none;width:50%} .mainpage_box .wiki-navbox{margin-left:0;margin-right:0;border:0}.mainpage_box .wiki-navbox-title{font-size:1.2em;font-weight:bold;line-height:1.5em;height:1.5em;text-align:left;padding:2px 10px;border-radius:3px 3px 0 0}.mainpage_box .collapseButton{display:none}.mainpage_box .wiki-navbox .wiki-navbar{display:none}.mainpage_box .wiki-navbox-title .wiki-navbox-title-block{font-size:inherit;line-height:inherit}.mainpage_box .wiki-navbox{font-size:100%} .nry-section1 .mainpage_herolist a:hover{text-decoration:none}ul.mainpage_herolist{list-style:none}ul.mainpage_herolist\u003Eli{padding:0;margin:5px 0;display:inline-block;width:15.1%}ul.mainpage_herolist\u003Eli:nth-last-child(1){margin-right:0}ul.mainpage_herolist\u003Eli\u003Ea{display:block;width:100%;background:#887767;border-top:2px solid #a19c89;border-left:2px solid #a19c89;border-right:2px solid #56412e;border-bottom:2px solid #56412e;padding:5px 10px;text-align:center;text-decoration:none;box-sizing:border-box;color:#ffeede !important;text-shadow:1px 1px 0 #000}ul.mainpage_herolist\u003Eli\u003Ea:hover{background:#ffeede;border-top:2px solid #fffdfe;border-left:2px solid #fffdfe;border-right:2px solid #bfbc9d;border-bottom:2px solid #bfbc9d;box-shadow:0 0 1px #000;color:#59493a !important;text-shadow:1px 1px 0 #948274} ul.mainpage-editor-list{list-style:none;padding:0 10px}ul.mainpage-editor-list\u003Eli{margin:0 0 5px}ul.mainpage-editor-list\u003Eli\u003Ediv{display:inline-block}ul.mainpage-editor-list .editor-image{margin-right:5px}ul.mainpage-editor-list .editor-image img{width:32px;height:32px;box-shadow:0 0 1px #000}ul.mainpage-editor-list .editor-name{font-size:0.86em;font-weight:bold}ul.mainpage-editor-list\u003Eli{display:inline-block;width:49%}.sy-wikibox-n{margin:10px;border-radius:8px;border:1px solid #D1D1D1;padding:10px}.sy-wikibox{background-color:rgba(255,255,255,0.85);margin-top:10px;width:100%;padding:0px;overflow:hidden;border:2px solid #ab9350;border-radius:6px}.sy-wikibox-n ul \u003E li:hover{background:url(http://joymepic.joyme.com/wiki/images/ro/8/85/Libg.gif?v=201701201512) no-repeat left center;background-size:23px 20px}}.sy-wikibox-n ul \u003E li,.sy-wikibox ul \u003E li{background:transparent url(http://joymepic.joyme.com/wiki/images/ro/9/97/B%E6%A0%87%E7%AD%BE.png?v=201701171733) no-repeat scroll 0px 0px;margin-left:-10px;padding-left:30px;list-style:outside none none;margin-bottom:5px;line-height:20px} .section-right2{padding:12px;background:rgba(189,189,189,0.8)}.nry-section1{margin:0;padding:20px 30px;border-radius:0}#firstHeading .h1-top{border-bottom:1px solid #5b493d !important;box-shadow:0 1px #ccb889;padding-top:0;margin:0 -10px}#firstHeading .info1{margin-left:0}#firstHeading .shouc{top:0;right:10px}#firstHeading .shouc-done{font-size:14px}#firstHeading .select-choose{margin-right:0}#firstHeading .djd .pf{display:none}#mw-content-text{background:transparent;margin:0;padding:0 !important;border-radius:0}table.wikitable tr td:nth-child(1){text-align:inherit;background:#feefda}table.wikitable tr:nth-child(odd) td:nth-child(1){background-color:#FFE7C7}.mw-content-ltr .mw-editsection{line-height:inherit}.mw-content-ltr{padding:0 !important}#mw-content-text h2 span.mw-headline,#mw-content-text h2 span.mw-editsection{line-height:inherit}ul.nav li{margin:0}.nry-main-content a img{width:auto} .cnxh-bg{display:none}#wrapper{margin-bottom:60px} #innerbodycontent{display:block;width:100%}.section-right2{min-height:1000px}.nry-section1{min-height:976px} @media only screen and (max-width:759px){ body{background:none !important}#wrapper{margin:0;padding:0}.row{margin:0}.section-right{width:100%}.section-right2{background:transparent;padding:0}.nry-section1{padding:10px}#firstHeading\u003Ediv:nth-of-type(3){margin:5px 0}.nry-h1 .shouc{right:10px}.setting-con\u003Ediv.col-md-3{display:none}.setting-con\u003Ediv.col-md-3.dh-change{display:block} .mainpage_img{margin:0}.mainpage_box{margin:16px 0;display:block}.mainpage_box_left,.mainpage_box_right{display:block;width:100%}.mainpage_box_right,.mainpage_box_left,.mainpage-block+.mainpage-block,.mainpage-block+.wiki-navbox,.wiki-navbox+.wiki-navbox,.wiki-navbox+.mainpage-block{margin-top:10px}.mainpage-two-col{display:block;margin:inherit !important}.mainpage-two-col-left{display:block;float:none;width:96.2%;margin:10px 0 0 0;height:auto;overflow:hidden}.mainpage-two-col-right{display:block;float:none;width:100%;margin-top:16px} #mw-content-text h2{margin:10px 0}#catlinks{padding:10px}.dianzan{margin:1 0} .wiki-navbox{margin:30px 0 0} }@media only screen and (min-width:759px){.wiki_hide{display:none}}@media only screen and (max-width:759px){.mwiki_hide{display:none}} .page_box{display:block;width:130px;height:30px;float:left;background:#887767 none repeat scroll 0% 0%;border-color:#999278 #56412E #56412E #A19C89;text-align:center;font-size:14px;line-height:30px;padding:0px 0px 0px;box-shadow:1px 2px 0px #A8A8A8;margin:5px 10px 5px 0px;color:#FFEEDE !important;font-weight:bold;text-shadow:0px 1px 1px #000,1px 0px 1px #000;border:2px solid #7A3924}.page_box:hover{background:transparent linear-gradient(#FFFCD6,#F2EA9B) repeat scroll 0% 0%}.page_box1{display:block;width:130px;height:30px;float:left;background:#887767 none repeat scroll 0% 0%;border-color:#999278 #56412E #56412E #A19C89;text-align:center;font-size:14px;line-height:30px;padding:0px 0px 0px;box-shadow:1px 2px 0px #A8A8A8;margin:5px 10px 5px 0px;color:#FFEEDE !important;font-weight:bold;text-shadow:0px 1px 1px #000,1px 0px 1px #000;border:2px solid #7A3924} .wikibox_css{margin:10px 5px;border:3px solid #66615B;border-radius:4px;padding:10px;background-color:#FFE5C6;color:#635239;overflow:hidden}.wikibox_left1{float:left;width:48%;height:280px}.wikibox_left2{float:left;width:calc(100% - 380px)}.wikibox_left3{float:left;width:360px}.height_limit{overflow:hidden;text-overflow:clip}.sybtt{border-radius:7px;display:inline-block;height:28px;line-height:20px;padding:3px;text-align:center;width:28px;background:#565656 none repeat scroll 0% 0%;margin-top:1px}@media only screen and (max-width:759px){.wikibox_left1{float:none;width:100%}.wikibox_left2{float:none;width:100%}.wikibox_left3{float:none;width:100%}.wikibox_css{margin:10px 0px 0px 0px;border:3px solid #EEE9E3;border-radius:7px;padding:10px;background-color:#FFE5C6;color:#635239}} @media only screen and (min-width:450px){.div-table{display:table}.div-table-row{display:table}.div-table-cell{display:table-cell}.c1-2{width:50% }.c1-1{width:100%}} .hero-info{margin:0 -5px 1}.hero-info\u003Ediv+div,.hero-info-block+.hero-info-block{margin-top:5px}.char-star\u003Eimg+img{margin-left:-3px}.hero-info a,.hero-info a:visited,.hero-info a:link{color:inherit}.hero-info a.new,.hero-info a.new:visited,.hero-info a.new:link{color:#aaaaaa}.hero-info a.external,.hero-info a.external:visited,.hero-info a.external:link{color:inherit}.marked{color:#ff7563}.hero-info-block-frame hr{margin:10px 9px;height:1px;background:#534334;border-top:none;border-bottom:#3f3124 1px solid}.hero-info-block-frame .comment{color:#DECF9C}.hero-info-block-frame .comment b{color:#e2decd} .edit-button a{background:url(http://p4.qhimg.com/t01d90649d28f7a4225.png) no-repeat center;z-index:4;height:40px;line-height:40px;color:#936a46 !important;font-size:.9em;font-weight:700;text-shadow:-1px 0 1px #ffffbe,1px 0 1px #ffffbe,0 1px 1px #ffffbe,0 -1px 1px #ffffbe;padding-top:25px;right:16px;top:150px;position:absolute;text-decoration:none}.edit-button a:hover{color:#ea8831 !important;text-shadow:-1px 0 1px #000000,1px 0 1px #000,0 1px 1px #000,0 -1px 1px #000;text-decoration:none} .hero-info-avatar{background:url(http://p5.qhimg.com/t011b2afa40d06ad05b.png) no-repeat left top,url(http://p4.qhimg.com/t01e768d17fffb3d462.png) no-repeat right top,url(http://p5.qhimg.com/t0171e2fe5f33296f16.png) no-repeat center top,url(http://p7.qhimg.com/t019271894c3ae792fd.png);height:252px;text-align:center}.hero-info-name{width:8em;position:absolute;top:36px;left:50%;margin-left:-4em;text-align:center;z-index:2;color:#efebd6;font-weight:bold;font-family:'微软雅黑','宋体',sans-serif;text-shadow:0 2px 1px #393421;font-size:16px}.hero-info-champ_name{width:8em;position:absolute;top:20px;left:50%;margin-left:-4em;text-align:center;z-index:2;color:#ffad33;font-weight:bold;font-family:'微软雅黑','宋体',sans-serif;text-shadow:0 1px 1px #393421;font-size:12px}.hero-info-star{width:210px;top:215px;position:absolute;left:50%;margin-left:-105px;z-index:2}.hero-info-image{position:absolute;top:20px;left:50%;width:210px;margin-left:-105px;z-index:2}.hero-info-gotcha-only{z-index:4;height:40px;width:150px;line-height:40px;color:#ffef94;font-size:.9em;font-weight:700;text-shadow:-1px 0 #000,1px 0 #000,0 1px #000,0 -1px #000;margin-left:10px;margin-top:167px;position:absolute;text-align:left} .hero-info-vote{background-color:#614c3a !important;color:#d6c394;font-size:12px;line-height:2em;text-align:center}.hero-info-block-frame.hero-info-vote{padding:0 7px 7px}.hero-info-vote.hero-info-block-frame\u003Ediv{background:none;padding:0}.hero-info-vote .row{margin:0}.hero-info-vote .row:nth-child(1){border-top:7px solid #554432}.hero-info-vote .row:nth-of-type(even)\u003Ediv:nth-of-type(1){background-color:#554435}.hero-info-vote .row\u003Ediv:nth-of-type(2){background-color:#000;height:26px}.hero-info-vote .row\u003Ediv{border:0 solid #776755;border-width:2px 0 0 2px}.hero-info-vote .row\u003Ediv:nth-of-type(2){border-right:2px solid #776755}.hero-info-vote .row:nth-last-child(1)\u003Ediv{border-bottom:2px solid #776755;height:28px} .hero-info-stat{background-color:#554432;color:#ffcb39;padding:9px;font-size:15px;line-height:2em;text-align:right}.hero-info-stat .row{background-color:#000;margin:0;padding:0 5px}.hero-info-stat .row+.row{margin-top:3px}.hero-info-stat .row\u003Ediv:nth-of-type(1){text-align:left;color:#efebde;font-size:13px}.plus-stat{display:none} .hero-info-block-frame{background-color:black;color:#d6c394;padding:0;border:5px solid #decb9c}.hero-info-block-frame\u003Ediv{background-color:#000;padding:5px 9px}.hero-info-block-frame .title{font-weight:bold;color:#e2decd;text-align:center} .hero-promote\u003E.promote{padding:0 9px 5px;overflow:hidden;clear:both}.hero-promote\u003E.promote\u003Ediv{float:left}.hero-promote\u003E.promote\u003E.image img{width:32px;height:32px}.hero-promote\u003E.promote\u003E.name{width:100%;width:Calc(100% - 32px)}.hero-promote\u003E.promote\u003E.name\u003Ea,.hero-promote\u003E.promote\u003E.name\u003E.selflink{width:100%;padding-left:10px;line-height:30px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.hero-promote\u003E.promote\u003E.name\u003E.selflink{color:#fff} .hero-comment{padding:5px;background-color:#decf9c;color:#736952}.hero-comment .title{display:block;width:auto;height:17px;line-height:17px;margin:3px 0;background:url(http://p2.qhimg.com/t0160f5f3ab6a15bf8d.png) no-repeat top;color:#524939;text-shadow:0 1px 0 #948263;text-align:center;font-weight:bold}.hero-comment .comment{margin:0 5px} .hero-acquire{padding:5px}.hero-info-block-frame.hero-acquire{padding-top:0}.hero-acquire\u003E.title{background:inherit}.hero-acquire .acquire{width:104px;height:156px;margin:0 1px;display:inline-block;background:url(http://p6.qhimg.com/t0130d2bfa8b1f8dfe8.png) no-repeat;padding:0;text-align:center;position:relative}.hero-acquire .acquire div.image{position:absolute;margin-top:18px;width:98px;margin-left:-49px;left:50%}.hero-acquire .acquire .desc{color:#efebd6;text-shadow:0px 1px 0 #000,0px -1px 0 #000,1px 0px 0 #000,-1px 0px 0 #000;position:absolute;margin-top:13px;left:50%;width:80px;margin-left:-40px;font-size:13px;line-height:17px}.hero-acquire .acquire .a_title{position:absolute;margin-top:127px;left:50%;width:104px;margin-left:-52px;font-size:13px;color:#ffcb39} .hero-info-skill{word-break:break-all}.hero-info-skill .skill-info\u003Ediv{float:left}.hero-info-skill .skill-info .name-block{padding:5px}.hero-info-skill .skill-info .name-block.nopassive{padding:13px 5px}.hero-info-skill .skill-info .type.main{color:#f7725b}.hero-info-skill .skill-info .type.support{color:#557fd5}.hero-info-block .passive{color:#6b96ff}.hero-info-block .passive.off{color:#444} .hero-info-spskill .skill-info\u003Ediv{float:left}.hero-info-spskill .skill-info .name{padding:13px 5px}.hero-info-spskill .description{padding:5px 0}.hero-info-spskill .comment{padding:5px 0} .hero-sbw .sbw{overflow:hidden}.hero-sbw .sbw-info\u003Ediv.image,.hero-sbw .sbw-info\u003Ediv.name-block{float:left}.hero-sbw .sbw-info\u003Ediv.name-block{padding:5px;min-width:40%}.hero-sbw .sbw-info div.image{width:51px;height:51px;padding:3px;background:#776656;border-radius:3px}.hero-sbw .sbw-info:after,.hero-sbw .attr-info:after{content:\"\";display:block;clear:both;height:0;font-size:0}.hero-sbw .attr-info\u003Ediv{float:left}.hero-sbw .attr-info div.attr-name{width:51px;font-size:12px;color:#efebde;text-align:right}.hero-sbw .attr-info div.attr-value{padding-left:5px;color:#ffcb39;width:Calc(100% - 51px)}.hero-sbw .attr-info.effect{width:100%}.hero-sbw .attr-info.effect div{color:#c98a0a}.hero-sbw .sbw-gif{text-align:center}.hero-sbw .sbw+.sbw:before{content:\" \";display:block;margin-bottom:10px;height:2px;background:#534334;border-bottom:#3f3124 1px solid} .div-table.hero-comment .div-table-row+.div-table-row,.div-table.hero-comment .div-table-cell+.div-table-cell{margin-top:5px} .joymewiki-tooltips{display:inline-block}.joymewiki-tooltips .joymewiki-tooltips-sub{display:none;position:fixed;z-index:999}.joymewiki-tooltips .joymewiki-tooltips-sub .joymewiki-tooltips-shift-in{padding:10px;margin:-10px} .joymewiki-tooltips{vertical-align:middle}.tt_skill,.tt_spskill,.tt_weapon{text-align:left}.tt_skill,.tt_skill *,.tt_spskill,.tt_spskill *,.tt_weapon,.tt_weapon *{box-sizing:content-box} @media only screen and (min-width:450px){.hero-info-stat .row\u003Ediv:nth-of-type(1){font-size:inherit}.hero-info-stat .col-md-2{width:16.66666667%}.hero-info-stat .col-md-4{width:33.333333%}.plus-stat{color:#9cdb52;display:inline-block}.hero-sbw .sbw-info:after,.hero-sbw .attr-info:after{display:none}.attr-info{float:left}.attr-info.atk,.attr-info.speed{padding:15px}.hero-sbw .attr-info.effect div.attr-name{color:transparent} .div-table.hero-comment .div-table-row{border-collapse:separate;border-spacing:10px;margin:0 -10px}.div-table.hero-comment .div-table-row+.div-table-row,.div-table.hero-comment .div-table-cell+.div-table-cell{margin-top:-10px}} @media only screen and (min-width:450px) and (max-width:767px){.hero-info-vote{overflow:hidden}.hero-info-vote\u003Ediv.row{width:50%;float:left}.hero-info-vote .row:nth-child(even)\u003Ediv:nth-of-type(2){border-right:0}.hero-info-vote .row:nth-last-child(-n+2)\u003Ediv{border-bottom:2px solid #776755}.hero-promote{overflow:hidden}.hero-promote\u003E.promote{width:33.33333333%;float:left;clear:none}} @media only screen and (min-width:768px){.hero-info\u003Ediv+div{margin-top:inherit}.hero-info-stat{border:5px solid #decb9c}} .hero-icon{position:relative;display:inline-block;height:36px;width:36px;margin:0 auto}.hero-icon .star{background:url(http://p2.qhimg.com/t01bbfc950e7efb3acb.png) no-repeat;position:absolute;left:5px;top:50px;padding-left:23px;line-height:22px;font-weight:bold;color:#ffcb42;text-shadow:0px -1px 1px #000,2px 1px 1px #000,-1px 0px 1px #000,0px 1px 1px #000,0px 1px 1px #000}.hero-icon .class-icon{position:absolute;right:4px;top:48px;height:21px;line-height:21px;width:20px;text-align:center;background-color:rgba(34,34,34,0.9);border-radius:4px}.hero-icon .class-icon img{padding:0;margin:-3px 0 0 0}.hero-list .name-header{width:auto}.hero-list .icon-header{width:70px}.hero-list .score-header{width:45px}.hero-list .short-data-header{width:30px}.hero-list .data-header{width:35px} @media only screen and (max-width:449px){.mwiki-hide{display:none}.padwiki-hide{display:none}} @media only screen and (min-width:450px){.wiki-hide{display:none}.hero-list .short-data-header{width:30px}.hero-list .data-header{width:35px}} @media only screen and (min-width:450px) and (max-width:767px){.padwiki-hide{display:none}.pcwiki-hide{display:none}} @media only screen and (min-width:768px){.hero-list .hero-icon{height:72px;width:72px}.pcwiki-hide{display:none}} body.eventDivOn{overflow:hidden;-webkit-overflow-scrolling:touch}.eventBG{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);z-index:9900}.eventBox{position:fixed;top:0;left:0;z-index:9999;display:block;overflow-x:hidden;overflow-y:auto}.eventBox iframe{width:100%;height:100%}@media only screen and (min-width:768px){.eventBox{top:100px;left:45%;left:Calc(50% - 200px);width:400px;height:627px}.eventBox iframe{}} #firstHeading h1{width:100%;font-size:20px;overflow:inherit;text-overflow:inherit;white-space:inherit;max-width:inherit;line-height:1.2em}#firstHeading .djd{margin-left:12px}#firstHeading .shouc-done{font-size:14px;color:#fff !important;text-decoration:none}@media only screen and (min-width:768px){#firstHeading h1{font-size:inherit}} .hdqq a{background:#514441 none repeat scroll 0 0 !important;border:1px solid #505050 !important;border-radius:10px !important;box-shadow:0.5px 0.5px 0.5px #575757 !important;color:#fff!important;display:inline-block !important;font-weight:bold;margin:5px !important;text-align:0.5px 0.5px 0.5px #000 !important;width:165px;text-align:center;height:30px;line-height:28px}.hdqq a:hover{background:#eac26e none repeat scroll 0 0 !important;text-decoration:none}.hdbm2 a{background:#76c056 none repeat scroll 0 0;border:2px solid #4a9d33;border-radius:10px;box-shadow:1px 1px 1px #ccc;color:#fff;display:block;font-size:20px;height:102px;line-height:102px;margin-top:35px;text-align:center;width:115px}.hdbm2 a:hover{background:#a6d397 none repeat scroll 0 0!important;text-decoration:none!important}@media only screen and (max-width:759px){.hdqq a{width:120px}.hdbm{float:none!important;width:100%!important}.hdbm2{float:none!important;width:100%!important;height:auto!important}.hdbm2 a{margin-top:5px}}.hdbm{float:left;width:80%}.hdbm2{float:right;height:167px;line-height:167px;width:19%;text-align:center}@media only screen and (max-width:759px){#firstHeading .h1{font-size:inherit;font-style:normal;margin:0px;display:block;font-size:18px;border:0px none;font-style:normal;line-height:1;margin:0px 0px 0px 10px;display:block;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}} .page-Download #firstHeading2{margin-bottom:12px;overflow:visible;font-weight:normal;display:none}.page-Download .dianzan{padding:1em;margin:15px 10px;border-radius:4px;display:none}.page-Download .wiki-xiazai1{display:block;height:36px;width:200px;background:transparent url(http://p6.qhimg.com/t018efea4403d9e4363.png) no-repeat scroll 0% 0%;text-align:center;font-size:14px;line-height:36px;margin:5px 0px 5px 0px;color:#FF570D;font-weight:bold}.page-Download .wiki-xiazai1:hover{background:url(http://p3.qhimg.com/t016d5a97a141c0fd22.png) no-repeat scroll 0% 0%}.page-Download .wiki-xiazai2{display:block;height:36px;width:150px;background:transparent url(http://p7.qhimg.com/t0194a90394550c231c.png) no-repeat scroll 0% 0%;text-align:center;font-size:14px;line-height:36px;margin:5px 0px 5px 0px;color:#FF570D;font-weight:bold}.page-Download .wiki-xiazai2:hover{background:url(http://p0.qhimg.com/t01feec275f131cc3eb.png) no-repeat scroll 0% 0%}@media only screen and (max-width:759px){.page-Download .nry-section1{padding:0px;min-height:0px}}.page-樱雪sakura #firstHeading2{margin-bottom:12px;overflow:visible;font-weight:normal;display:none}.page-鱿鱼涂克鲁 #firstHeading2{margin-bottom:12px;overflow:visible;font-weight:normal;display:none}.page-Bison仓鼠 #firstHeading2{margin-bottom:12px;overflow:visible;font-weight:normal;display:none}.page-VentureC #firstHeading2{margin-bottom:12px;overflow:visible;font-weight:normal;display:none}.page-画之刃 #firstHeading2{margin-bottom:12px;overflow:visible;font-weight:normal;display:none}.page-木酱酱的小窝 #firstHeading2{margin-bottom:12px;overflow:visible;font-weight:normal;display:none}"
		]
	});