mw.loader.implement("ext.joymerecentchanges", function($, jQuery, require, module) {}, {
	"css": [
		".wiki-update{padding-top:0;border-radius:4px;background-color:#fff;width:100%;margin-left:0;float:left}.wiki-update .update-content{padding:0 20px 20px 0px;margin-left:0px}.wiki-update .update-content li{padding-bottom:7px;list-style:none;margin-left:0px}.wiki-update .update-content li em{font-style:normal}.wiki-update .update-content li span.update{display:inline-block;font-size:12px;line-height:20px;width:38px;height:20px;background-color:#fc6000;margin-right:10px;text-align:center;color:#fff;border-radius:4px;vertical-align:middle}.wiki-update .update-content li .li-line1 a{vertical-align:middle;height:23px;overflow:hidden;width:73%;display:inline-block;line-height:23px;text-overflow:ellipsis;white-space:nowrap}.wiki-update .update-content li span.newadd{background-color:#4fdb94}.wiki-update .update-content li em{float:right;text-align:right;color:#a7a7a7;padding-left:10px;height:23px;width:62px;line-height:23px}.wiki-update .update-content li\u003Ediv{padding:0px 0}@media (max-width:991px){.wiki-update .update-content li a{width:50%}}@media (max-width:767px){.wiki-update{width:100%;margin-left:0px;margin-top:1em}.wiki-update .update-content{margin-left:10px;padding-right:10px}}@media (max-width:374px){.wiki-update .update-content li a{width:37%}}"
	]
});
mw.loader.implement("ext.visualEditor.desktopArticleTarget.init", function($, jQuery, require, module) {
	(function() {
		var conf, tabMessages, uri, pageExists, viewUri, veEditUri, isViewPage, isEditPage, pageCanLoadVE, init, targetPromise, enable, tempdisable, autodisable, tabPreference, userPrefEnabled, userPrefPreferShow, initialWikitext, oldid, onlyTabIsVE, active = !1,
			progressStep = 0,
			progressSteps = [
				[30, 3000],
				[70, 2000],
				[100, 1000]
			],
			plugins = [];

		function showLoading() {
			var $content, contentRect, offsetTop, windowHeight, top, bottom, middle;
			$('html').addClass('ve-activated ve-loading');
			if(!init.$loading) {
				init.$loading = $('<div class="ve-init-mw-desktopArticleTarget-loading-overlay">' + '<div class="ve-init-mw-desktopArticleTarget-progress">' + '<div class="ve-init-mw-desktopArticleTarget-progress-bar" style="width: 0;"></div>' + '</div>' + '</div>');
			}
			$content = $('#content');
			contentRect = $content[0].getBoundingClientRect();
			offsetTop = $content.offset().top;
			windowHeight = $(window).height();
			top = Math.max(contentRect.top, 0);
			bottom = Math.min(
				contentRect.bottom, windowHeight);
			middle = (top + bottom) / 2;
			init.$loading.css('top', middle - offsetTop);
			$content.prepend(init.$loading);
		}

		function incrementLoadingProgress() {
			var step = progressSteps[progressStep];
			setLoadingProgress(step[0], step[1]);
			progressStep++;
		}

		function resetLoadingProgress() {
			progressStep = 0;
			setLoadingProgress(0, 0);
		}

		function setLoadingProgress(target, duration) {
			var $bar = init.$loading.find('.ve-init-mw-desktopArticleTarget-progress-bar').stop();
			$bar.css('transition', 'width ' + duration + 'ms ease-in');
			setTimeout(function() {
				$bar.css('width', target + '%');
			});
		}

		function hideLoading() {
			$('html').removeClass('ve-loading');
			if(init.$loading) {
				init.$loading.detach();
			}
		}

		function handleLoadFailure() {
			resetLoadingProgress();
			if($('#wpTextbox1').length || mw.config.get('wgAction') !== 'edit') {
				$('html').removeClass('ve-activated');
				hideLoading();
			} else {
				location.href = viewUri.clone().extend({
					action: 'edit',
					veswitched: 1
				});
			}
		}

		function getTarget() {
			if(!targetPromise) {
				targetPromise = mw.loader.using(
					'ext.visualEditor.targetLoader').then(function() {
					mw.libs.ve.targetLoader.addPlugin(function() {
						return mw.loader.using(['user', 'site']).then(null, function() {
							return $.Deferred().resolve();
						});
					});
					['ext.visualEditor.desktopArticleTarget', 'ext.visualEditor.mwimage', 'ext.visualEditor.mwmeta'].forEach(mw.libs.ve.targetLoader.addPlugin);
					plugins.forEach(mw.libs.ve.targetLoader.addPlugin);
					plugins = [];
					return mw.libs.ve.targetLoader.loadModules();
				}).then(function() {
					var target;
					target = ve.init.mw.targetFactory.create('article');
					target.connect(this, {
						transformPage: function() {
							if(onlyTabIsVE) {
								$('#ca-edit').addClass('selected');
							}
						},
						restorePage: function() {
							if(onlyTabIsVE) {
								$('#ca-edit').removeClass('selected');
							}
						},
						deactivate: function() {
							if(userPrefPreferShow && (!conf.singleEditTab || tabPreference === 'multi-tab')) {
								init.setupSectionLinks();
							}
						}
					});
					$('#content').append(target.$element);
					return target;
				}, function(e) {
					mw.log.warn('VisualEditor failed to load: ' + e);
				});
			}
			targetPromise.then(function() {
				setTimeout(function() {
					mw.
					loader.load('easy-deflate.deflate');
				}, 500);
			});
			return targetPromise;
		}

		function activatePageTarget(modified) {
			var key;
			trackActivateStart({
				type: 'page',
				mechanism: 'click'
			});
			if(!active) {
				if(mw.config.get('wgVisualEditorConfig').singleEditTab && tabPreference === 'remember-last') {
					key = pageExists ? 'edit' : 'create';
					if($('#ca-view-foreign').length) {
						key += '-local';
					}
					$('#ca-edit a').text(mw.msg(key));
				}
				if(uri.query.action !== 'edit' && uri.query.veaction !== 'edit') {
					if(history.pushState) {
						history.replaceState({
							tag: 'visualeditor'
						}, document.title, uri);
						history.pushState({
							tag: 'visualeditor'
						}, document.title, veEditUri);
					}
					uri = veEditUri;
				}
				activateTarget(null, modified);
			}
		}

		function activateTarget(targetPromise, modified) {
			var dataPromise = mw.loader.using('ext.visualEditor.targetLoader').then(function() {
				return mw.libs.ve.targetLoader.requestPageData(mw.config.get('wgRelevantPageName'), oldid, 'mwTarget', modified);
			}).done(incrementLoadingProgress).fail(handleLoadFailure);
			setEditorPreference('visualeditor');
			showLoading();
			incrementLoadingProgress();
			active = !0;
			targetPromise = targetPromise || getTarget();
			targetPromise.then(function(target) {
				incrementLoadingProgress();
				target.on('deactivate', function() {
					active = !1;
				});
				target.on('loadError', handleLoadFailure);
				return target.activate(dataPromise);
			}).then(function() {
				ve.track('mwedit.ready');
			}).always(function() {
				hideLoading();
				resetLoadingProgress();
			});
		}

		function trackActivateStart(initData) {
			ve.track('trace.activate.enter');
			ve.track('mwedit.init', initData);
			mw.libs.ve.activationStart = ve.now();
		}

		function setEditorPreference(editor) {
			if(editor !== 'visualeditor' && editor !== 'wikitext') {
				throw new Error('setEditorPreference called with invalid option: ', editor);
			}
			$.cookie('VEE', editor, {
				path: '/',
				expires: 30
			});
			if(mw.user.isAnon()) {
				return $.Deferred().resolve();
			}
			if(mw.user.options.get('visualeditor-editor') === editor) {
				return $.Deferred().resolve();
			}
			return new mw.Api().saveOption('visualeditor-editor', editor).then(function() {
				mw.user.options.set('visualeditor-editor', editor);
			});
		}

		function getLastEditor() {
			var editor = $.cookie('VEE');
			if(!mw.user.isAnon() || !editor || !(editor === 'visualeditor' || editor === 'wikitext')) {
				editor = mw.user.options.get('visualeditor-editor');
			}
			return editor;
		}
		conf = mw.config.get('wgVisualEditorConfig');
		tabMessages = conf.tabMessages;
		uri = new mw.Uri();
		oldid = uri.query.oldid || $('input[name=parentRevId]').val();
		pageExists = !!mw.config.get('wgRelevantArticleId');
		viewUri = new mw.Uri(mw.util.getUrl(mw.config.get('wgRelevantPageName')));
		isViewPage = mw.config.get('wgIsArticle') && !('diff' in uri.query);
		pageCanLoadVE = (isViewPage || mw.config.get('wgAction') === 'edit' || mw.config.get('wgAction') === 'submit');
		isEditPage = conf.singleEditTab && (uri.query.action === 'edit' || uri.query.action === 'submit');
		init = {
			blacklist: conf.blacklist,
			addPlugin: function(plugin) {
				plugins.push(plugin);
			},
			setupSkin: function() {
				init.setupTabs();
				init.setupSectionLinks();
			},
			setupTabs: function() {
				var caVeEdit, action = pageExists ? 'edit' : 'create',
					pTabsId = $('#p-views').length ? 'p-views' : 'p-cactions',
					$caSource = $(
						'#ca-viewsource'),
					$caEdit = $('#ca-edit'),
					$caVeEdit = $('#ca-ve-edit'),
					$caEditLink = $caEdit.find('a'),
					$caVeEditLink = $caVeEdit.find('a'),
					reverseTabOrder = $('body').hasClass('rtl') && pTabsId === 'p-views',
					caVeEditNextnode = (reverseTabOrder ^ conf.tabPosition === 'before') ? $caEdit.get(0) : $caEdit.next().get(0);
				if(mw.config.get('wgNamespaceIds')[true && 'education_program'] === mw.config.get('wgNamespaceNumber')) {
					return;
				}
				if(!$caVeEdit.length) {
					if($caEdit.length && !$caSource.length) {
						caVeEdit = mw.util.addPortletLink(pTabsId, veEditUri, tabMessages[action] !== null ? mw.msg(tabMessages[action]) : $caEditLink.text(), 'ca-ve-edit', mw.msg('tooltip-ca-ve-edit'), mw.msg('accesskey-ca-ve-edit'), caVeEditNextnode);
						$caVeEdit = $(caVeEdit);
						$caVeEditLink = $caVeEdit.find('a');
					}
				} else if($caEdit.length && $caVeEdit.length) {
					if(reverseTabOrder ^ conf.tabPosition === 'before') {
						if($caEdit[0].nextSibling === $caVeEdit[0]) {
							$caVeEdit.after($caEdit);
						}
					} else {
						if($caVeEdit[0].nextSibling === $caEdit[0]) {
							$caEdit.after($caVeEdit);
						}
					}
					if(tabMessages[action] !== null) {
						$caVeEditLink.text(mw.msg(tabMessages[action]));
					}
				}
				if(!(init.isAvailable && userPrefPreferShow)) {
					$caVeEdit.remove();
				} else if(pageCanLoadVE) {
					$caVeEdit.on('click', init.onEditTabClick);
				}
				if($('#ca-view-foreign').length) {
					if(tabMessages[action + 'localdescriptionsource'] !== null) {
						$caEditLink.text(mw.msg(tabMessages[action + 'localdescriptionsource']));
					}
				} else {
					if(tabMessages[action + 'source'] !== null) {
						$caEditLink.text(mw.msg(tabMessages[action + 'source']));
					}
				}
				if(init.isAvailable) {
					if(conf.tabPosition === 'before') {
						$caEdit.addClass('collapsible');
					} else {
						$caVeEdit.addClass('collapsible');
					}
				}
			},
			setupSectionLinks: function() {
				var $editsections = $('#mw-content-text .mw-editsection'),
					bodyDir = $('body').css('direction');
				if($editsections.css('direction') !== bodyDir) {
					$editsections.css('direction', bodyDir);
				}
				if($editsections.find('.mw-editsection-visualeditor').length === 0) {
					$editsections.each(function() {
						var $editsection = $(this),
							$editSourceLink = $editsection.find('a').eq(0),
							$editLink = $editSourceLink.clone(),
							$divider = $('<span>'),
							dividerText = mw.msg('pipe-separator');
						if(tabMessages.editsectionsource !== null) {
							$editSourceLink.text(mw.msg(tabMessages.editsectionsource));
						}
						if(tabMessages.editsection !== null) {
							$editLink.text(mw.msg(tabMessages.editsection));
						}
						$divider.addClass('mw-editsection-divider').text(dividerText);
						if(!$('#ca-view-foreign').length) {
							$editLink.attr('href', function(i, val) {
								return new mw.Uri(veEditUri).extend({
									vesection: new mw.Uri(val).query.section
								});
							}).addClass('mw-editsection-visualeditor');
							if(conf.tabPosition === 'before') {
								$editSourceLink.before($editLink, $divider);
							} else {
								$editSourceLink.after($divider, $editLink);
							}
						}
					});
				}
				if(pageCanLoadVE) {
					$editsections.find('.mw-editsection-visualeditor').on('click', init.onEditSectionLinkClick);
				}
			},
			onEditTabClick: function(e) {
				if((e.which && e.which !== 1) || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
					return;
				}
				e.preventDefault();
				init.activateVe();
			},
			activateVe: function() {
				var wikitext = $('#wpTextbox1').val(),
					wikitextModified = wikitext !== initialWikitext;
				if($.fn.dialog) {
					$(
						'.ui-dialog-content').dialog('close');
				}
				if(mw.config.get('wgAction') === 'submit' || (mw.config.get('wgAction') === 'edit' && wikitextModified) || $('input[name=wpSection]').val()) {
					mw.loader.using('ext.visualEditor.switching').done(function() {
						var windowManager = new OO.ui.WindowManager(),
							switchWindow = new mw.libs.ve.SwitchConfirmDialog();
						$('body').append(windowManager.$element);
						windowManager.addWindows([switchWindow]);
						windowManager.openWindow(switchWindow).then(function(opened) {
							return opened;
						}).then(function(closing) {
							return closing;
						}).then(function(data) {
							var oldUri;
							if(data && data.action === 'keep') {
								activatePageTarget(true);
							} else if(data && data.action === 'discard') {
								setEditorPreference('visualeditor');
								oldUri = veEditUri.clone();
								delete oldUri.query.veswitched;
								location.href = oldUri.extend({
									wteswitched: 1
								});
							}
						});
					});
				} else {
					activatePageTarget(false);
				}
			},
			onEditSectionLinkClick: function(e) {
				var targetPromise;
				if((e.which && e.which !== 1) || e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
					return;
				}
				trackActivateStart({
					type: 'section',
					mechanism: 'click'
				});
				if(history.pushState && uri.query.veaction !== 'edit') {
					history.replaceState({
						tag: 'visualeditor'
					}, document.title, uri);
					history.pushState({
						tag: 'visualeditor'
					}, document.title, this.href);
				}
				e.preventDefault();
				targetPromise = getTarget().then(function(target) {
					target.saveEditSection($(e.target).closest('h1, h2, h3, h4, h5, h6').get(0));
					return target;
				});
				activateTarget(targetPromise);
			}
		};
		enable = Number(mw.user.options.get('visualeditor-enable'));
		tempdisable = Number(mw.user.options.get('visualeditor-betatempdisable'));
		autodisable = Number(mw.user.options.get('visualeditor-autodisable'));
		tabPreference = mw.user.options.get('visualeditor-tabs');
		onlyTabIsVE = mw.config.get('wgVisualEditorConfig').singleEditTab && (tabPreference === 'prefer-ve' || (tabPreference === 'remember-last' && getLastEditor() !== 'wikitext'));
		if(onlyTabIsVE) {
			veEditUri = viewUri.clone().extend({
				action: 'edit'
			});
			delete veEditUri.query.veaction;
		} else {
			veEditUri = (pageCanLoadVE ? uri : viewUri).clone().extend({
				veaction: 'edit'
			});
			delete veEditUri.
			query.action;
		}
		if(oldid) {
			veEditUri.extend({
				oldid: oldid
			});
		}
		userPrefEnabled = (!(conf.disableForAnons && mw.config.get('wgUserName') === null) && enable && !tempdisable && !autodisable);
		userPrefPreferShow = (userPrefEnabled && (!conf.singleEditTab || tabPreference !== 'prefer-wt'));
		init.isAvailable = (VisualEditorSupportCheck() && (('vewhitelist' in uri.query) || !$.client.test(init.blacklist, null, true)) && conf.skins.indexOf(mw.config.get('skin')) !== -1 && conf.namespaces.indexOf(new mw.Title(mw.config.get('wgRelevantPageName')).getNamespaceId()) !== -1 && mw.config.get('wgNamespaceNumber') !== -1 && mw.config.get('wgTranslatePageTranslation') !== 'translation' && mw.config.get('wgPageContentModel') === 'wikitext');
		init.setEditorPreference = setEditorPreference;
		mw.libs.ve = $.extend(mw.libs.ve || {}, init);
		if(init.isAvailable && userPrefPreferShow) {
			$('html').addClass('ve-available');
		} else {
			$('html').addClass('ve-not-available');
		}
		$(function() {
			if(uri.query.action === 'edit' && $('#wpTextbox1').length) {
				initialWikitext = $('#wpTextbox1').val();
			}
			if(init
				.isAvailable) {
				if(uri.query.undo === undefined && uri.query.undoafter === undefined && uri.query.editintro === undefined && uri.query.preload === undefined && uri.query.preloadtitle === undefined && uri.query.preloadparams === undefined && uri.query.veswitched === undefined) {
					if((isViewPage && uri.query.veaction === 'edit') || (isEditPage && (uri.query.wteswitched === '1' || (tabPreference !== 'multi-tab' && userPrefPreferShow && !$('#ca-viewsource').length && ((tabPreference === 'prefer-ve' && mw.config.get('wgAction') !== 'submit') || (tabPreference === 'remember-last' && getLastEditor() !== 'wikitext')))))) {
						trackActivateStart({
							type: uri.query.vesection === undefined ? 'page' : 'section',
							mechanism: 'url'
						});
						activateTarget();
					} else if(pageCanLoadVE && userPrefEnabled) {
						$('body').append($('<a>').attr({
							accesskey: 'v',
							href: veEditUri
						}).hide());
					}
				}
				if(['edit', 'submit'].indexOf(mw.config.get('wgAction')) !== -1) {
					mw.loader.load('ext.visualEditor.switching');
					$('#wpTextbox1').on('wikiEditor-toolbar-doneInitialSections', function() {
						mw.loader.using(
							'ext.visualEditor.switching').done(function() {
							var $content, windowManager, editingTabDialog, showAgainCheckbox, showAgainLayout, switchButton, showPopup = uri.query.veswitched && !mw.user.options.get('visualeditor-hidesourceswitchpopup');
							if(showPopup) {
								$content = $('<p>').text(mw.msg('visualeditor-mweditmodeve-popup-body'));
								if(!mw.user.isAnon()) {
									showAgainCheckbox = new OO.ui.CheckboxInputWidget().on('change', function(value) {
										var configValue = value ? '1' : '';
										new mw.Api().saveOption('visualeditor-hidesourceswitchpopup', configValue);
										mw.user.options.set('visualeditor-hidesourceswitchpopup', configValue);
									});
									showAgainLayout = new OO.ui.FieldLayout(showAgainCheckbox, {
										align: 'inline',
										label: mw.msg('visualeditor-mweditmodeve-showagain')
									});
									$content = $content.add(showAgainLayout.$element);
								}
								switchButton = new OO.ui.PopupButtonWidget({
									framed: !1,
									icon: 'edit',
									title: mw.msg('visualeditor-mweditmodeve-tool'),
									classes: ['ve-init-mw-editSwitch'],
									popup: {
										label: mw.msg('visualeditor-mweditmodeve-popup-title'),
										$content: $content,
										padded:
											!0,
										head: !0
									}
								});
								switchButton.disconnect(switchButton, {
									click: 'onAction'
								});
							} else {
								switchButton = new OO.ui.ButtonWidget({
									framed: !1,
									icon: 'edit',
									title: mw.msg('visualeditor-mweditmodeve-tool'),
									classes: ['ve-init-mw-editSwitch']
								});
							}
							switchButton.on('click', init.activateVe);
							$('.wikiEditor-ui-toolbar').prepend(switchButton.$element);
							if(showPopup) {
								switchButton.getPopup().toggle(true);
							}
							if($('#ca-edit').hasClass('visualeditor-showtabdialog')) {
								windowManager = new OO.ui.WindowManager();
								$('body').append(windowManager.$element);
								editingTabDialog = new mw.libs.ve.EditingTabDialog();
								windowManager.addWindows([editingTabDialog]);
								windowManager.openWindow(editingTabDialog).then(function(opened) {
									return opened;
								}).then(function(closing) {
									return closing;
								}).then(function(data) {
									windowManager.destroy();
									if(data && data.action === 'prefer-ve') {
										location.href = veEditUri;
									} else if(data && data.action === 'multi-tab') {
										location.reload();
									}
								});
							}
						});
					});
					mw.libs.ve.setEditorPreference('wikitext');
				}
				if(userPrefPreferShow) {
					if(!conf.singleEditTab ||
						tabPreference === 'multi-tab') {
						init.setupSkin();
					} else if(pageCanLoadVE && onlyTabIsVE) {
						$('.mw-editsection a').on('click', function(e) {
							init.onEditSectionLinkClick(e);
						});
						$('#ca-edit').on('click', function(e) {
							trackActivateStart({
								type: 'page',
								mechanism: 'click'
							});
							activateTarget();
							e.preventDefault();
						});
					}
				}
			}
			if(uri.query.venotify) {
				mw.hook('postEdit').fire({
					message: mw.msg('postedit-confirmation-' + uri.query.venotify, mw.user)
				});
				delete uri.query.venotify;
			}
		});
	}());
}, {
	"css": [
		".ve-activated #toc,.ve-activated #siteNotice,.ve-activated .mw-indicators, .ve-active #bodyContent \u003E :not( #siteSub ):not( #contentSub ):not( .ve-ui-mwTocWidget ),.ve-activated #t-print,.ve-activated #t-permalink,.ve-activated #p-coll-print_export,.ve-activated #t-cite,.ve-deactivating .ve-ui-surface{display:none} .ve-activating .ve-ui-surface{height:0;overflow:hidden}.ve-activated #bodyContent,.ve-activated #firstHeading{opacity:0.6;pointer-events:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none} .ve-activated #content{position:relative}.ve-init-mw-desktopArticleTarget-loading-overlay{position:absolute;left:0;right:0;z-index:1;margin-top:-0.5em}.ve-init-mw-desktopArticleTarget-progress{height:1em;overflow:hidden;margin:0 25%}.ve-init-mw-desktopArticleTarget-progress-bar{height:1em;width:0} .mw-editsection{white-space:nowrap; unicode-bidi:-moz-isolate;unicode-bidi:-webkit-isolate;unicode-bidi:isolate}.mw-editsection-divider{color:#555}"
	]
}, {
	"accesskey-ca-editsource": "e",
	"accesskey-ca-ve-edit": "v",
	"accesskey-save": "s",
	"create": "\u521b\u5efa",
	"create-local": "\u6dfb\u52a0\u672c\u5730\u8bf4\u660e",
	"edit": "\u7f16\u8f91",
	"edit-local": "\u7f16\u8f91\u672c\u5730\u8bf4\u660e",
	"pipe-separator": " | ",
	"postedit-confirmation-created": "\u9875\u9762\u5df2\u521b\u5efa\u3002",
	"postedit-confirmation-restored": "\u9875\u9762\u5df2\u6062\u590d\u3002",
	"postedit-confirmation-saved": "\u60a8\u7684\u7f16\u8f91\u5df2\u4fdd\u5b58\u3002",
	"tooltip-ca-createsource": "\u521b\u5efa\u672c\u9875\u9762\u7684\u6e90\u4ee3\u7801",
	"tooltip-ca-edit": "\u7f16\u8f91\u672c\u9875",
	"tooltip-ca-editsource": "\u7f16\u8f91\u672c\u9875\u9762\u7684\u6e90\u4ee3\u7801",
	"tooltip-ca-ve-edit": "\u7f16\u8f91\u672c\u9875",
	"visualeditor-ca-createlocaldescriptionsource": "\u6dfb\u52a0\u672c\u5730\u8bf4\u660e\u6e90\u4ee3\u7801",
	"visualeditor-ca-createsource": "\u521b\u5efa\u6e90\u4ee3\u7801",
	"visualeditor-ca-editlocaldescriptionsource": "\u7f16\u8f91\u672c\u5730\u8bf4\u660e\u6765\u6e90",
	"visualeditor-ca-editsource": "\u6e90\u4ee3\u7801",
	"visualeditor-ca-editsource-section": "\u6e90\u4ee3\u7801",
	"visualeditor-mweditmodeve-tool": "\u5207\u6362\u4e3a\u53ef\u89c6\u5316\u7f16\u8f91"
});
mw.loader.implement("ext.visualEditor.supportCheck", function($, jQuery, require, module) {
	(function() {
		window.VisualEditorSupportCheck = function() {
			return(!!(Array.isArray && Array.prototype.filter && Array.prototype.indexOf && Array.prototype.map && Date.now && Date.prototype.toJSON && Object.create && Object.keys && String.prototype.trim && window.JSON && JSON.parse && JSON.stringify && Function.prototype.bind) && !!('contentEditable' in document.createElement('div')) && !!(document.createElementNS && document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect));
		};
	}());
});
mw.loader.implement("ext.visualEditor.track", function($, jQuery, require, module) {
	(function() {
		var callbacks = $.Callbacks('memory'),
			queue = [];
		ve.track = function(topic, data) {
			queue.push({
				topic: topic,
				timeStamp: ve.now(),
				data: data
			});
			callbacks.fire(queue);
		};
		ve.trackSubscribe = function(topic, callback) {
			var seen = 0;
			callbacks.add(function(queue) {
				var event;
				for(; seen < queue.length; seen++) {
					event = queue[seen];
					if(event.topic.indexOf(topic) === 0) {
						callback(event.topic, event.data, event.timeStamp);
					}
				}
			});
		};
		ve.trackSubscribeAll = function(callback) {
			ve.trackSubscribe('', callback);
		};
	}());
});
mw.loader.implement("ext.visualEditor.ve", function($, jQuery, require, module) {
	window.ve = {};
	ve.now = (function() {
		var perf = window.performance,
			navStart = perf && perf.timing && perf.timing.navigationStart;
		return navStart && typeof perf.now === 'function' ? function() {
			return navStart + perf.now();
		} : Date.now;
	}());
});
mw.loader.implement("jquery.accessKeyLabel", function($, jQuery, require, module) {
	(function($, mw) {
		var cachedAccessKeyModifiers, useTestPrefix = !1,
			labelable = 'button, input, textarea, keygen, meter, output, progress, select';

		function getAccessKeyModifiers(ua) {
			if(!ua && cachedAccessKeyModifiers) {
				return cachedAccessKeyModifiers;
			}
			var profile = $.client.profile(ua),
				accessKeyModifiers = ['alt'];
			if(profile.name === 'opera' && profile.versionNumber < 15) {
				accessKeyModifiers = ['shift', 'esc'];
			} else if(profile.name === 'chrome' || profile.name === 'opera') {
				accessKeyModifiers = (profile.platform === 'mac' ? ['ctrl', 'option'] : ['alt', 'shift']);
			} else if(profile.platform !== 'win' && profile.name === 'safari' && profile.layoutVersion > 526) {
				accessKeyModifiers = ['ctrl', 'alt'];
			} else if(!(profile.platform === 'win' && profile.name === 'safari') && (profile.name === 'safari' || profile.platform === 'mac' || profile.name === 'konqueror')) {
				accessKeyModifiers = ['ctrl'];
			} else if((profile.name === 'firefox' || profile.name === 'iceweasel') && profile.versionBase > '1') {
				accessKeyModifiers = ['alt', 'shift'];
			}
			if(!ua) {
				cachedAccessKeyModifiers = accessKeyModifiers;
			}
			return accessKeyModifiers;
		}

		function getAccessKeyLabel(element) {
			if(!element.accessKey) {
				return '';
			}
			if(!useTestPrefix && element.accessKeyLabel) {
				return element.accessKeyLabel;
			}
			return(useTestPrefix ? 'test' : getAccessKeyModifiers().join('-')) + '-' + element.accessKey;
		}

		function updateTooltipOnElement(element, titleElement) {
			var array = (mw.msg('word-separator') + mw.msg('brackets')).split('$1'),
				regexp = new RegExp($.map(array, mw.RegExp.escape).join('.*?') + '$'),
				oldTitle = titleElement.title,
				rawTitle = oldTitle.replace(regexp, ''),
				newTitle = rawTitle,
				accessKeyLabel = getAccessKeyLabel(element);
			if(!oldTitle) {
				return;
			}
			if(accessKeyLabel) {
				newTitle += mw.msg('word-separator') + mw.msg('brackets', accessKeyLabel);
			}
			if(oldTitle !== newTitle) {
				titleElement.title = newTitle;
			}
		}

		function updateTooltip(element) {
			var id, $element, $label, $labelParent;
			updateTooltipOnElement(element, element);
			$element = $(element);
			if($element.is(labelable)) {
				id = element.id.replace(
					/"/g, '\\"');
				if(id) {
					$label = $('label[for="' + id + '"]');
					if($label.length === 1) {
						updateTooltipOnElement(element, $label[0]);
					}
				}
				$labelParent = $element.parents('label');
				if($labelParent.length === 1) {
					updateTooltipOnElement(element, $labelParent[0]);
				}
			}
		}
		$.fn.updateTooltipAccessKeys = function() {
			return this.each(function() {
				updateTooltip(this);
			});
		};
		$.fn.updateTooltipAccessKeys.getAccessKeyModifiers = getAccessKeyModifiers;
		$.fn.updateTooltipAccessKeys.getAccessKeyLabel = getAccessKeyLabel;
		$.fn.updateTooltipAccessKeys.getAccessKeyPrefix = function(ua) {
			return getAccessKeyModifiers(ua).join('-') + '-';
		};
		$.fn.updateTooltipAccessKeys.setTestMode = function(mode) {
			useTestPrefix = mode;
		};
	}(jQuery, mediaWiki));
}, {}, {
	"brackets": "[$1]",
	"word-separator": ""
});
mw.loader.implement("jquery.byteLength", function($, jQuery, require, module) {
	jQuery.byteLength = function(str) {
		return str.replace(/[\u0080-\u07FF\uD800-\uDFFF]/g, '**').replace(/[\u0800-\uD7FF\uE000-\uFFFF]/g, '***').length;
	};;
});
mw.loader.implement("jquery.client", function($, jQuery, require, module) {
	(function($) {
		var profileCache = {};
		$.client = {
			profile: function(nav) {
				if(nav === undefined) {
					nav = window.navigator;
				}
				if(profileCache[nav.userAgent + '|' + nav.platform] !== undefined) {
					return profileCache[nav.userAgent + '|' + nav.platform];
				}
				var versionNumber, key = nav.userAgent + '|' + nav.platform,
					uk = 'unknown',
					x = 'x',
					wildUserAgents = ['Opera', 'Navigator', 'Minefield', 'KHTML', 'Chrome', 'PLAYSTATION 3', 'Iceweasel'],
					userAgentTranslations = [
						[/(Firefox|MSIE|KHTML,?\slike\sGecko|Konqueror)/, ''],
						['Chrome Safari', 'Chrome'],
						['KHTML', 'Konqueror'],
						['Minefield', 'Firefox'],
						['Navigator', 'Netscape'],
						['PLAYSTATION 3', 'PS3']
					],
					versionPrefixes = ['camino', 'chrome', 'firefox', 'iceweasel', 'netscape', 'netscape6', 'opera', 'version', 'konqueror', 'lynx', 'msie', 'safari', 'ps3', 'android'],
					versionSuffix = '(\\/|\\;?\\s|)([a-z0-9\\.\\+]*?)(\\;|dev|rel|\\)|\\s|$)',
					names = ['camino', 'chrome', 'firefox', 'iceweasel', 'netscape', 'konqueror', 'lynx', 'msie', 'opera', 'safari', 'ipod', 'iphone',
						'blackberry', 'ps3', 'rekonq', 'android'
					],
					nameTranslations = [],
					layouts = ['gecko', 'konqueror', 'msie', 'trident', 'edge', 'opera', 'webkit'],
					layoutTranslations = [
						['konqueror', 'khtml'],
						['msie', 'trident'],
						['opera', 'presto']
					],
					layoutVersions = ['applewebkit', 'gecko', 'trident', 'edge'],
					platforms = ['win', 'wow64', 'mac', 'linux', 'sunos', 'solaris', 'iphone'],
					platformTranslations = [
						['sunos', 'solaris'],
						['wow64', 'win']
					],
					translate = function(source, translations) {
						var i;
						for(i = 0; i < translations.length; i++) {
							source = source.replace(translations[i][0], translations[i][1]);
						}
						return source;
					},
					ua = nav.userAgent,
					match, name = uk,
					layout = uk,
					layoutversion = uk,
					platform = uk,
					version = x;
				if(match = new RegExp('(' + wildUserAgents.join('|') + ')').exec(ua)) {
					ua = translate(ua, userAgentTranslations);
				}
				ua = ua.toLowerCase();
				if(match = new RegExp('(' + names.join('|') + ')').exec(ua)) {
					name = translate(match[1], nameTranslations);
				}
				if(match = new RegExp('(' + layouts.join('|') + ')').exec(ua)) {
					layout = translate(match[1], layoutTranslations);
				}
				if(match = new RegExp('(' + layoutVersions.join('|') + ')\\\/(\\d+)').exec(ua)) {
					layoutversion = parseInt(match[2], 10);
				}
				if(match = new RegExp('(' + platforms.join('|') + ')').exec(nav.platform.toLowerCase())) {
					platform = translate(match[1], platformTranslations);
				}
				if(match = new RegExp('(' + versionPrefixes.join('|') + ')' + versionSuffix).exec(ua)) {
					version = match[3];
				}
				if(name === 'safari' && version > 400) {
					version = '2.0';
				}
				if(name === 'opera' && version >= 9.8) {
					match = ua.match(/\bversion\/([0-9\.]*)/);
					if(match && match[1]) {
						version = match[1];
					} else {
						version = '10';
					}
				}
				if(name === 'chrome' && (match = ua.match(/\bopr\/([0-9\.]*)/))) {
					if(match[1]) {
						name = 'opera';
						version = match[1];
					}
				}
				if(layout === 'trident' && layoutversion >= 7 && (match = ua.match(/\brv[ :\/]([0-9\.]*)/))) {
					if(match[1]) {
						name = 'msie';
						version = match[1];
					}
				}
				if(name === 'chrome' && (match = ua.match(/\bedge\/([0-9\.]*)/))) {
					name = 'edge';
					version = match[1];
					layout = 'edge';
					layoutversion = parseInt(match[1], 10);
				}
				if(match = ua.match(/\bsilk\/([0-9.\-_]*)/)) {
					if(match[1]) {
						name = 'silk';
						version = match[1];
					}
				}
				versionNumber = parseFloat(version, 10) || 0.0;
				return profileCache[key] = {
					name: name,
					layout: layout,
					layoutVersion: layoutversion,
					platform: platform,
					version: version,
					versionBase: (version !== x ? Math.floor(versionNumber).toString() : x),
					versionNumber: versionNumber
				};
			},
			test: function(map, profile, exactMatchOnly) {
				var conditions, dir, i, op, val, j, pieceVersion, pieceVal, compare;
				profile = $.isPlainObject(profile) ? profile : $.client.profile();
				if(map.ltr && map.rtl) {
					dir = $('body').is('.rtl') ? 'rtl' : 'ltr';
					map = map[dir];
				}
				if(typeof map !== 'object' || map[profile.name] === undefined) {
					return !exactMatchOnly;
				}
				conditions = map[profile.name];
				if(conditions === false) {
					return false;
				}
				if(conditions === null) {
					return true;
				}
				for(i = 0; i < conditions.length; i++) {
					op = conditions[i][0];
					val = conditions[i][1];
					if(typeof val === 'string') {
						pieceVersion = profile.version.toString().split('.');
						pieceVal = val.split('.');
						while(pieceVersion.length < pieceVal.length) {
							pieceVersion.push('0');
						}
						while(pieceVal.length < pieceVersion.length) {
							pieceVal.push('0');
						}
						compare = 0;
						for(j = 0; j < pieceVersion.length; j++) {
							if(Number(pieceVersion[j]) < Number(pieceVal[j])) {
								compare = -1;
								break;
							} else if(Number(pieceVersion[j]) > Number(pieceVal[j])) {
								compare = 1;
								break;
							}
						}
						if(!(eval(String(compare + op + '0')))) {
							return false;
						}
					} else if(typeof val === 'number') {
						if(!(eval('profile.versionNumber' + op + val))) {
							return false;
						}
					}
				}
				return true;
			}
		};
	}(jQuery));
});
mw.loader.implement("jquery.cookie", function($, jQuery, require, module) {
	(function($, document, undefined) {
		var pluses = /\+/g;

		function raw(s) {
			return s;
		}

		function decoded(s) {
			return unRfc2068(decodeURIComponent(s.replace(pluses, ' ')));
		}

		function unRfc2068(value) {
			if(value.indexOf('"') === 0) {
				value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
			}
			return value;
		}

		function fromJSON(value) {
			return config.json ? JSON.parse(value) : value;
		}
		var config = $.cookie = function(key, value, options) {
			if(value !== undefined) {
				options = $.extend({}, config.defaults, options);
				if(value === null) {
					options.expires = -1;
				}
				if(typeof options.expires === 'number') {
					var days = options.expires,
						t = options.expires = new Date();
					t.setDate(t.getDate() + days);
				}
				value = config.json ? JSON.stringify(value) : String(value);
				return(document.cookie = [encodeURIComponent(key), '=', config.raw ? value : encodeURIComponent(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '',
					options.secure ? '; secure' : ''
				].join(''));
			}
			var decode = config.raw ? raw : decoded;
			var cookies = document.cookie.split('; ');
			var result = key ? null : {};
			for(var i = 0, l = cookies.length; i < l; i++) {
				var parts = cookies[i].split('=');
				var name = decode(parts.shift());
				var cookie = decode(parts.join('='));
				if(key && key === name) {
					result = fromJSON(cookie);
					break;
				}
				if(!key) {
					result[name] = fromJSON(cookie);
				}
			}
			return result;
		};
		config.defaults = {};
		$.removeCookie = function(key, options) {
			if($.cookie(key) !== null) {
				$.cookie(key, null, options);
				return true;
			}
			return false;
		};
	})(jQuery, document);
});
mw.loader.implement("mediawiki.RegExp", function($, jQuery, require, module) {
	(function(mw) {
		mw.RegExp = {
			escape: function(str) {
				return str.replace(/([\\{}()|.?*+\-\^$\[\]])/g, '\\$1');
			}
		};
	}(mediaWiki));
});
mw.loader.implement("mediawiki.Title", function($, jQuery, require, module) {
	(function(mw, $) {
		function Title(title, namespace) {
			var parsed = parse(title, namespace);
			if(!parsed) {
				throw new Error('Unable to parse title');
			}
			this.namespace = parsed.namespace;
			this.title = parsed.title;
			this.ext = parsed.ext;
			this.fragment = parsed.fragment;
			return this;
		}
		var namespaceIds = mw.config.get('wgNamespaceIds'),
			NS_MAIN = namespaceIds[''],
			NS_TALK = namespaceIds.talk,
			NS_SPECIAL = namespaceIds.special,
			NS_MEDIA = namespaceIds.media,
			NS_FILE = namespaceIds.file,
			FILENAME_MAX_BYTES = 240,
			TITLE_MAX_BYTES = 255,
			getNsIdByName = function(ns) {
				var id;
				if(typeof ns !== 'string') {
					return false;
				}
				id = mw.config.get('wgNamespaceIds')[ns.toLowerCase()];
				if(id === undefined) {
					return false;
				}
				return id;
			},
			getNamespacePrefix = function(namespace) {
				return namespace === NS_MAIN ? '' : (mw.config.get('wgFormattedNamespaces')[namespace].replace(/ /g, '_') + ':');
			},
			rUnderscoreTrim = /^_+|_+$/g,
			rSplit = /^(.+?)_*:_*(.*)$/,
			rInvalid = new RegExp('[^' + mw.config.get('wgLegalTitleChars') + ']' +
				'|%[0-9A-Fa-f]{2}' + '|&[A-Za-z0-9\u0080-\uFFFF]+;' + '|&#[0-9]+;' + '|&#x[0-9A-Fa-f]+;'),
			rWhitespace = /[ _\u0009\u00A0\u1680\u180E\u2000-\u200A\u2028\u2029\u202F\u205F\u3000\s]+/g,
			sanitationRules = [{
				pattern: /~{3}/g,
				replace: '',
				generalRule: !0
			}, {
				pattern: rWhitespace,
				replace: ' ',
				generalRule: !0
			}, {
				pattern: /[\u200E\u200F\u202A-\u202E]/g,
				replace: '',
				generalRule: !0
			}, {
				pattern: /[\x00-\x1f\x7f]/g,
				replace: '',
				generalRule: !0
			}, {
				pattern: /%([0-9A-Fa-f]{2})/g,
				replace: '% $1',
				generalRule: !0
			}, {
				pattern: /&(([A-Za-z0-9\x80-\xff]+|#[0-9]+|#x[0-9A-Fa-f]+);)/g,
				replace: '& $1',
				generalRule: !0
			}, {
				pattern: /[:\/#]/g,
				replace: '-',
				fileRule: !0
			}, {
				pattern: /[\]\}>]/g,
				replace: ')',
				generalRule: !0
			}, {
				pattern: /[\[\{<]/g,
				replace: '(',
				generalRule: !0
			}, {
				pattern: new RegExp(rInvalid.source, 'g'),
				replace: '-',
				generalRule: !0
			}, {
				pattern: /^(\.|\.\.|\.\/.*|\.\.\/.*|.*\/\.\/.*|.*\/\.\.\/.*|.*\/\.|.*\/\.\.)$/g,
				replace: '',
				generalRule: !0
			}],
			parse = function(title, defaultNamespace) {
				var namespace, m, id, i, fragment, ext;
				namespace = defaultNamespace ===
					undefined ? NS_MAIN : defaultNamespace;
				title = title.replace(/[ _\s]+/g, '_').replace(rUnderscoreTrim, '');
				if(title !== '' && title[0] === ':') {
					namespace = NS_MAIN;
					title = title.slice(1).replace(rUnderscoreTrim, '');
				}
				if(title === '') {
					return false;
				}
				m = title.match(rSplit);
				if(m) {
					id = getNsIdByName(m[1]);
					if(id !== false) {
						namespace = id;
						title = m[2];
						if(namespace === NS_TALK && (m = title.match(rSplit))) {
							if(getNsIdByName(m[1]) !== false) {
								return false;
							}
						}
					}
				}
				i = title.indexOf('#');
				if(i === -1) {
					fragment = null;
				} else {
					fragment = title.slice(i + 1).replace(/_/g, ' ');
					title = title.slice(0, i).replace(rUnderscoreTrim, '');
				}
				if(title.match(rInvalid)) {
					return false;
				}
				if(title.indexOf('.') !== -1 && (title === '.' || title === '..' || title.indexOf('./') === 0 || title.indexOf('../') === 0 || title.indexOf('/./') !== -1 || title.indexOf('/../') !== -1 || title.slice(-2) === '/.' || title.slice(-3) === '/..')) {
					return false;
				}
				if(title.indexOf('~~~') !== -1) {
					return false;
				}
				if(namespace !== NS_SPECIAL && $.byteLength(title) > TITLE_MAX_BYTES) {
					return false;
				}
				if(title === '' && namespace !== NS_MAIN) {
					return false;
				}
				if(title[0] === ':') {
					return false;
				}
				i = title.lastIndexOf('.');
				if(i === -1 || title.length <= i + 1) {
					ext = null;
				} else {
					if(title.lastIndexOf('?') == -1) {
						ext = title.slice(i + 1);
					} else {
						ext = title.slice(i + 1, title.lastIndexOf('?'));
					}
					title = title.slice(0, i);
				}
				return {
					namespace: namespace,
					title: title,
					ext: ext,
					fragment: fragment
				};
			},
			text = function(s) {
				if(s !== null && s !== undefined) {
					return s.replace(/_/g, ' ');
				} else {
					return '';
				}
			},
			sanitize = function(s, filter) {
				var i, ruleLength, rule, m, filterLength, rules = sanitationRules;
				for(i = 0, ruleLength = rules.length; i < ruleLength; ++i) {
					rule = rules[i];
					for(m = 0, filterLength = filter.length; m < filterLength; ++m) {
						if(rule[filter[m]]) {
							s = s.replace(rule.pattern, rule.replace);
						}
					}
				}
				return s;
			},
			trimToByteLength = function(s, length) {
				var byteLength, chopOffChars, chopOffBytes;
				s = s.substr(0, length);
				while((byteLength = $.byteLength(s)) > length) {
					chopOffBytes = byteLength - length;
					chopOffChars = Math.max(1, Math.floor(chopOffBytes / 4));
					s = s.substr(0, s.length - chopOffChars);
				}
				return s;
			},
			trimFileNameToByteLength = function(name, extension) {
				return trimToByteLength(name, FILENAME_MAX_BYTES - extension.length - 1) + '.' + extension;
			},
			createObject = Object.create || (function() {
				return function(o) {
					function Title() {}
					if(o !== Object(o)) {
						throw new Error('Cannot inherit from a non-object');
					}
					Title.prototype = o;
					return new Title();
				};
			}());
		Title.newFromText = function(title, namespace) {
			var t, parsed = parse(title, namespace);
			if(!parsed) {
				return null;
			}
			t = createObject(Title.prototype);
			t.namespace = parsed.namespace;
			t.title = parsed.title;
			t.ext = parsed.ext;
			t.fragment = parsed.fragment;
			return t;
		};
		Title.makeTitle = function(namespace, title) {
			return mw.Title.newFromText(getNamespacePrefix(namespace) + title);
		};
		Title.newFromUserInput = function(title, defaultNamespace, options) {
			var namespace, m, id, ext, parts;
			if(arguments.length < 3 && $.type(defaultNamespace) === 'object') {
				options = defaultNamespace;
				defaultNamespace = undefined;
			}
			options = $.extend({
				forUploading: !0
			}, options);
			namespace = defaultNamespace === undefined ? NS_MAIN : defaultNamespace;
			title = $.trim(title.replace(rWhitespace, ' '));
			if(title !== '' && title[0] === ':') {
				namespace = NS_MAIN;
				title = title.substr(1).replace(rUnderscoreTrim, '');
			}
			m = title.match(rSplit);
			if(m) {
				id = getNsIdByName(m[1]);
				if(id !== false) {
					namespace = id;
					title = m[2];
				}
			}
			if(namespace === NS_MEDIA || (options.forUploading && (namespace === NS_FILE))) {
				title = sanitize(title, ['generalRule', 'fileRule']);
				parts = title.split('.');
				if(parts.length > 1) {
					ext = parts.pop();
					title = $.trim(parts.join('.'));
					title = trimFileNameToByteLength(title, ext);
				} else {
					title = $.trim(parts.join('.'));
					return null;
				}
			} else {
				title = sanitize(title, ['generalRule']);
				if(namespace !== NS_SPECIAL) {
					title = trimToByteLength(title, TITLE_MAX_BYTES);
				}
			}
			title = title.replace(/^\:+/, '');
			return Title.newFromText(title, namespace);
		};
		Title.newFromFileName = function(uncleanName) {
			return Title.newFromUserInput('File:' + uncleanName, {
				forUploading: !0
			});
		};
		Title.newFromImg = function(img) {
			var matches, i, regex, src, decodedSrc, thumbPhpRegex = /thumb\.php/,
				regexes = [/\/[a-f0-9]\/[a-f0-9]{2}\/([^\s\/]+)\/[^\s\/]+-[^\s\/]*$/, /\/([^\s\/]+)\/[^\s\/]+-(?:\1|thumbnail)[^\s\/]*$/,
					/\/[a-f0-9]\/[a-f0-9]{2}\/([^\s\/]+)$/, /\/([^\s\/]+)$/
				],
				recount = regexes.length;
			src = img.jquery ? img[0].src : img.src;
			matches = src.match(thumbPhpRegex);
			if(matches) {
				return mw.Title.newFromText('File:' + mw.util.getParamValue('f', src));
			}
			decodedSrc = decodeURIComponent(src);
			for(i = 0; i < recount; i++) {
				regex = regexes[i];
				matches = decodedSrc.match(regex);
				if(matches && matches[1]) {
					return mw.Title.newFromText('File:' + matches[1]);
				}
			}
			return null;
		};
		Title.exists = function(title) {
			var match, type = $.type(title),
				obj = Title.exist.pages;
			if(type === 'string') {
				match = obj[title];
			} else if(type === 'object' && title instanceof Title) {
				match = obj[title.toString()];
			} else {
				throw new Error('mw.Title.exists: title must be a string or an instance of Title');
			}
			if(typeof match === 'boolean') {
				return match;
			}
			return null;
		};
		Title.exist = {
			pages: {},
			set: function(titles, state) {
				titles = $.isArray(titles) ? titles : [titles];
				state = state === undefined ? true : !!state;
				var i, pages = this.pages,
					len = titles.length;
				for(i = 0; i < len; i++) {
					pages[titles[i]] = state;
				}
				return true;
			}
		};
		Title.
		normalizeExtension = function(extension) {
			var lower = extension.toLowerCase(),
				squish = {
					htm: 'html',
					jpeg: 'jpg',
					mpeg: 'mpg',
					tiff: 'tif',
					ogv: 'ogg'
				};
			if(squish.hasOwnProperty(lower)) {
				return squish[lower];
			} else if(/^[0-9a-z]+$/.test(lower)) {
				return lower;
			} else {
				return '';
			}
		};
		Title.prototype = {
			constructor: Title,
			getNamespaceId: function() {
				return this.namespace;
			},
			getNamespacePrefix: function() {
				return getNamespacePrefix(this.namespace);
			},
			getName: function() {
				if($.inArray(this.namespace, mw.config.get('wgCaseSensitiveNamespaces')) !== -1 || !this.title.length) {
					return this.title;
				}
				return this.title[0].toUpperCase() + this.title.slice(1);
			},
			getNameText: function() {
				return text(this.getName());
			},
			getExtension: function() {
				return this.ext;
			},
			getDotExtension: function() {
				return this.ext === null ? '' : '.' + this.ext;
			},
			getMain: function() {
				return this.getName() + this.getDotExtension();
			},
			getMainText: function() {
				return text(this.getMain());
			},
			getPrefixedDb: function() {
				return this.getNamespacePrefix() + this.getMain();
			},
			getPrefixedText: function() {
				return text(this.getPrefixedDb());
			},
			getRelativeText: function(namespace) {
				if(this.getNamespaceId() === namespace) {
					return this.getMainText();
				} else if(this.getNamespaceId() === NS_MAIN) {
					return ':' + this.getPrefixedText();
				} else {
					return this.getPrefixedText();
				}
			},
			getFragment: function() {
				return this.fragment;
			},
			getUrl: function(params) {
				var fragment = this.getFragment();
				if(fragment) {
					return mw.util.getUrl(this.toString() + '#' + fragment, params);
				} else {
					return mw.util.getUrl(this.toString(), params);
				}
			},
			exists: function() {
				return Title.exists(this);
			}
		};
		Title.prototype.toString = Title.prototype.getPrefixedDb;
		Title.prototype.toText = Title.prototype.getPrefixedText;
		mw.Title = Title;
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.Uri", function($, jQuery, require, module) {
	(function(mw, $) {
		function cat(pre, val, post, raw) {
			if(val === undefined || val === null || val === '') {
				return '';
			}
			return pre + (raw ? val : mw.Uri.encode(val)) + post;
		}
		var parser = {
				strict: mw.template.get('mediawiki.Uri', 'strict.regexp').render(),
				loose: mw.template.get('mediawiki.Uri', 'loose.regexp').render()
			},
			properties = ['protocol', 'user', 'password', 'host', 'port', 'path', 'query', 'fragment'];
		mw.UriRelative = function(documentLocation) {
			var getDefaultUri = (function() {
				var href, uri;
				return function() {
					var hrefCur = typeof documentLocation === 'string' ? documentLocation : documentLocation();
					if(href === hrefCur) {
						return uri;
					}
					href = hrefCur;
					uri = new Uri(href);
					return uri;
				};
			}());

			function Uri(uri, options) {
				var prop, defaultUri = getDefaultUri();
				options = typeof options === 'object' ? options : {
					strictMode: !!options
				};
				options = $.extend({
					strictMode: !1,
					overrideKeys: !1
				}, options);
				if(uri !== undefined && uri !== null && uri !== '') {
					if(typeof uri === 'string') {
						this.parse(uri, options);
					} else if(
						typeof uri === 'object') {
						for(prop in uri) {
							if(uri.hasOwnProperty(prop)) {
								if($.isArray(uri[prop]) || $.isPlainObject(uri[prop])) {
									this[prop] = $.extend(true, {}, uri[prop]);
								} else {
									this[prop] = uri[prop];
								}
							}
						}
						if(!this.query) {
							this.query = {};
						}
					}
				} else {
					return defaultUri.clone();
				}
				if(!this.protocol) {
					this.protocol = defaultUri.protocol;
				}
				if(!this.host) {
					this.host = defaultUri.host;
					if(!this.port) {
						this.port = defaultUri.port;
					}
				}
				if(this.path && this.path[0] !== '/') {
					throw new Error('Bad constructor arguments');
				}
				if(!(this.protocol && this.host && this.path)) {
					throw new Error('Bad constructor arguments');
				}
			}
			Uri.encode = function(s) {
				return encodeURIComponent(s).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
			};
			Uri.decode = function(s) {
				return decodeURIComponent(s.replace(/\+/g, '%20'));
			};
			Uri.prototype = {
				parse: function(str, options) {
					var q, matches, uri = this,
						hasOwn = Object.prototype.hasOwnProperty;
					matches = parser[options.strictMode ? 'strict' : 'loose'].exec(str);
					$.each(properties, function(i, property) {
						uri[property] = matches[i + 1];
					});
					q = {};
					if(uri.query) {
						uri.query.replace(/(?:^|&)([^&=]*)(?:(=)([^&]*))?/g, function($0, $1, $2, $3) {
							var k, v;
							if($1) {
								k = Uri.decode($1);
								v = ($2 === '' || $2 === undefined) ? null : Uri.decode($3);
								if(options.overrideKeys || !hasOwn.call(q, k)) {
									q[k] = v;
								} else {
									if(typeof q[k] === 'string') {
										q[k] = [q[k]];
									}
									if($.isArray(q[k])) {
										q[k].push(v);
									}
								}
							}
						});
					}
					uri.query = q;
				},
				getUserInfo: function() {
					return cat('', this.user, cat(':', this.password, ''));
				},
				getHostPort: function() {
					return this.host + cat(':', this.port, '');
				},
				getAuthority: function() {
					return cat('', this.getUserInfo(), '@') + this.getHostPort();
				},
				getQueryString: function() {
					var args = [];
					$.each(this.query, function(key, val) {
						var k = Uri.encode(key),
							vals = $.isArray(val) ? val : [val];
						$.each(vals, function(i, v) {
							if(v === null) {
								args.push(k);
							} else if(k === 'title') {
								args.push(k + '=' + mw.util.wikiUrlencode(v));
							} else {
								args.push(k + '=' + Uri.encode(v));
							}
						});
					});
					return args.join('&');
				},
				getRelativePath: function() {
					return this.path + cat('?', this.getQueryString(), '', true) + cat('#',
						this.fragment, '');
				},
				toString: function() {
					return this.protocol + '://' + this.getAuthority() + this.getRelativePath();
				},
				clone: function() {
					return new Uri(this);
				},
				extend: function(parameters) {
					$.extend(this.query, parameters);
					return this;
				}
			};
			return Uri;
		};
		mw.Uri = mw.UriRelative(function() {
			return location.href;
		});
	}(mediaWiki, jQuery));
}, {}, {}, {
	"strict.regexp": "^\n(?:(?\u003Cprotocol\u003E[^:/?#]+):)?\n(?://(?:\n\t(?:\n\t\t(?\u003Cuser\u003E[^:@/?#]*)\n\t\t(?::(?\u003Cpassword\u003E[^:@/?#]*))?\n\t)?@)?\n\t(?\u003Chost\u003E[^:/?#]*)\n\t(?::(?\u003Cport\u003E\\d*))?\n)?\n(?\u003Cpath\u003E(?:[^?#/]*/)*[^?#]*)\n(?:\\?(?\u003Cquery\u003E[^#]*))?\n(?:\\#(?\u003Cfragment\u003E.*))?\n",
	"loose.regexp": "^\n(?:\n\t(?![^:@]+:[^:@/]*@)\n\t(?\u003Cprotocol\u003E[^:/?#.]+):\n)?\n(?://)?\n(?:(?:\n\t(?\u003Cuser\u003E[^:@/?#]*)\n\t(?::(?\u003Cpassword\u003E[^:@/?#]*))?\n)?@)?\n(?\u003Chost\u003E[^:/?#]*)\n(?::(?\u003Cport\u003E\\d*))?\n(\n\t(?:/\n\t\t(?:[^?#]\n\t\t\t(?![^?#/]*\\.[^?#/.]+(?:[?#]|$))\n\t\t)*/?\n\t)?\n\t[^?#/]*\n)\n(?:\\?(?\u003Cquery\u003E[^#]*))?\n(?:\\#(?\u003Cfragment\u003E.*))?\n"
});
mw.loader.implement("mediawiki.api", function($, jQuery, require, module) {
	(function(mw, $) {
		var defaultOptions = {
				parameters: {
					action: 'query',
					format: 'json'
				},
				ajax: {
					url: mw.util.wikiScript('api'),
					timeout: 30 * 1000,
					dataType: 'json'
				}
			},
			promises = {};

		function mapLegacyToken(action) {
			var csrfActions = ['edit', 'delete', 'protect', 'move', 'block', 'unblock', 'email', 'import', 'options'];
			if($.inArray(action, csrfActions) !== -1) {
				mw.track('mw.deprecate', 'apitoken_' + action);
				mw.log.warn('Use of the "' + action + '" token is deprecated. Use "csrf" instead.');
				return 'csrf';
			}
			return action;
		}
		promises[defaultOptions.ajax.url] = {};
		$.each(mw.user.tokens.get(), function(key, value) {
			promises[defaultOptions.ajax.url][key] = $.Deferred().resolve(value).promise({
				abort: function() {}
			});
		});
		mw.Api = function(options) {
			options = options || {};
			if(options.ajax && options.ajax.url !== undefined) {
				options.ajax.url = String(options.ajax.url);
			}
			options.parameters = $.extend({}, defaultOptions.parameters, options.parameters);
			options.ajax = $.extend({}, defaultOptions.ajax, options.ajax);
			this.defaults = options;
			this.requests = [];
		};
		mw.Api.prototype = {
			abort: function() {
				$.each(this.requests, function(index, request) {
					if(request) {
						request.abort();
					}
				});
			},
			get: function(parameters, ajaxOptions) {
				ajaxOptions = ajaxOptions || {};
				ajaxOptions.type = 'GET';
				return this.ajax(parameters, ajaxOptions);
			},
			post: function(parameters, ajaxOptions) {
				ajaxOptions = ajaxOptions || {};
				ajaxOptions.type = 'POST';
				return this.ajax(parameters, ajaxOptions);
			},
			preprocessParameters: function(parameters) {
				var key;
				for(key in parameters) {
					if($.isArray(parameters[key])) {
						parameters[key] = parameters[key].join('|');
					}
					if(parameters[key] === false || parameters[key] === undefined) {
						delete parameters[key];
					}
				}
			},
			ajax: function(parameters, ajaxOptions) {
				var token, requestIndex, api = this,
					apiDeferred = $.Deferred(),
					xhr, key, formData;
				parameters = $.extend({}, this.defaults.parameters, parameters);
				ajaxOptions = $.extend({}, this.defaults.ajax, ajaxOptions);
				if(parameters.token) {
					token = parameters.token;
					delete parameters.token;
				}
				this.preprocessParameters(parameters);
				if(
					ajaxOptions.type === 'POST' && window.FormData && ajaxOptions.contentType === 'multipart/form-data') {
					formData = new FormData();
					for(key in parameters) {
						formData.append(key, parameters[key]);
					}
					if(token) {
						formData.append('token', token);
					}
					ajaxOptions.data = formData;
					ajaxOptions.processData = !1;
					ajaxOptions.contentType = !1;
				} else {
					ajaxOptions.data = $.param(parameters);
					if(token) {
						ajaxOptions.data += '&token=' + encodeURIComponent(token);
					}
					ajaxOptions.data = ajaxOptions.data.replace(/\./g, '%2E');
					if(ajaxOptions.contentType === 'multipart/form-data') {
						delete ajaxOptions.contentType;
					}
				}
				xhr = $.ajax(ajaxOptions).fail(function(xhr, textStatus, exception) {
					apiDeferred.reject('http', {
						xhr: xhr,
						textStatus: textStatus,
						exception: exception
					});
				}).done(function(result, textStatus, jqXHR) {
					if(result === undefined || result === null || result === '') {
						apiDeferred.reject('ok-but-empty', 'OK response but empty result (check HTTP headers?)', result, jqXHR);
					} else if(result.error) {
						var code = result.error.code === undefined ? 'unknown' : result.error.code;
						apiDeferred.reject(
							code, result, result, jqXHR);
					} else {
						apiDeferred.resolve(result, jqXHR);
					}
				});
				requestIndex = this.requests.length;
				this.requests.push(xhr);
				xhr.always(function() {
					api.requests[requestIndex] = null;
				});
				return apiDeferred.promise({
					abort: xhr.abort
				}).fail(function(code, details) {
					if(!(code === 'http' && details && details.textStatus === 'abort')) {
						mw.log('mw.Api error: ', code, details);
					}
				});
			},
			postWithToken: function(tokenType, params, ajaxOptions) {
				var api = this;
				return api.getToken(tokenType, params.assert).then(function(token) {
					params.token = token;
					return api.post(params, ajaxOptions).then(null, function(code) {
						if(code === 'badtoken') {
							api.badToken(tokenType);
							params.token = undefined;
							return api.getToken(tokenType, params.assert).then(function(token) {
								params.token = token;
								return api.post(params, ajaxOptions);
							});
						}
						return this;
					});
				});
			},
			getToken: function(type, assert) {
				var apiPromise, promiseGroup, d;
				type = mapLegacyToken(type);
				promiseGroup = promises[this.defaults.ajax.url];
				d = promiseGroup && promiseGroup[type + 'Token'];
				if(!d) {
					apiPromise = this.get({
						action: 'query',
						meta: 'tokens',
						type: type,
						assert: assert
					});
					d = apiPromise.then(function(res) {
						if(!res.query.tokens[type + 'token']) {
							return $.Deferred().reject('token-missing', res);
						}
						return res.query.tokens[type + 'token'];
					}, function() {
						delete promiseGroup[type + 'Token'];
						return this;
					}).promise({
						abort: apiPromise.abort
					});
					if(!promiseGroup) {
						promiseGroup = promises[this.defaults.ajax.url] = {};
					}
					promiseGroup[type + 'Token'] = d;
				}
				return d;
			},
			badToken: function(type) {
				var promiseGroup = promises[this.defaults.ajax.url];
				type = mapLegacyToken(type);
				if(promiseGroup) {
					delete promiseGroup[type + 'Token'];
				}
			}
		};
		mw.Api.errors = ['ok-but-empty', 'timeout', 'duplicate', 'duplicate-archive', 'noimageinfo', 'uploaddisabled', 'nomodule', 'mustbeposted', 'badaccess-groups', 'missingresult', 'missingparam', 'invalid-file-key', 'copyuploaddisabled', 'mustbeloggedin', 'empty-file', 'file-too-large', 'filetype-missing', 'filetype-banned', 'filetype-banned-type', 'filename-tooshort', 'illegal-filename', 'verification-error', 'hookaborted', 'unknown-error', 'internal-error',
			'overwrite', 'badtoken', 'fetchfileerror', 'fileexists-shared-forbidden', 'invalidtitle', 'notloggedin', 'autoblocked', 'blocked', 'stashfailed', 'stasherror', 'stashedfilenotfound', 'stashpathinvalid', 'stashfilestorage', 'stashzerolength', 'stashnotloggedin', 'stashwrongowner', 'stashnosuchfilekey'
		];
		mw.Api.warnings = ['duplicate', 'exists'];
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.cldr", function($, jQuery, require, module) {
	(function(mw) {
		'use strict';
		mw.cldr = {
			getPluralForm: function(number, pluralRules) {
				var i;
				for(i = 0; i < pluralRules.length; i++) {
					if(mw.libs.pluralRuleParser(pluralRules[i], number)) {
						break;
					}
				}
				return i;
			}
		};
	}(mediaWiki));
});
mw.loader.implement("mediawiki.cookie", function($, jQuery, require, module) {
	(function(mw, $) {
		'use strict';
		mw.cookie = {
			set: function(key, value, options) {
				var config, defaultOptions, date;
				config = mw.config.get(['wgCookiePrefix', 'wgCookieDomain', 'wgCookiePath', 'wgCookieExpiration']);
				defaultOptions = {
					prefix: config.wgCookiePrefix,
					domain: config.wgCookieDomain,
					path: config.wgCookiePath,
					secure: !1
				};
				if($.type(options) !== 'object') {
					defaultOptions.expires = options;
					options = defaultOptions;
				} else {
					options = $.extend(defaultOptions, options);
				}
				if(options.expires === undefined && config.wgCookieExpiration !== 0) {
					date = new Date();
					date.setTime(Number(date) + (config.wgCookieExpiration * 1000));
					options.expires = date;
				} else if(typeof options.expires === 'number') {
					date = new Date();
					date.setTime(Number(date) + (options.expires * 1000));
					options.expires = date;
				} else if(options.expires === null) {
					delete options.expires;
				}
				key = options.prefix + key;
				delete options.prefix;
				if(value !== null) {
					value = String(value);
				}
				$.cookie(key, value, options);
			},
			get: function(key, prefix, defaultValue) {
				var result;
				if(prefix === undefined || prefix === null) {
					prefix = mw.config.get('wgCookiePrefix');
				}
				if(arguments.length < 3) {
					defaultValue = null;
				}
				result = $.cookie(prefix + key);
				return result !== null ? result : defaultValue;
			}
		};
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.jqueryMsg", function($, jQuery, require, module) {
	(function(mw, $) {
		var oldParser, slice = Array.prototype.slice,
			parserDefaults = {
				magic: {
					SITENAME: mw.config.get('wgSiteName')
				},
				allowedHtmlElements: [],
				allowedHtmlCommonAttributes: ['id', 'class', 'style', 'lang', 'dir', 'title', 'role'],
				allowedHtmlAttributesByElement: {},
				messages: mw.messages,
				language: mw.language,
				format: 'parse'
			};

		function appendWithoutParsing($parent, children) {
			var i, len;
			if(!$.isArray(children)) {
				children = [children];
			}
			for(i = 0, len = children.length; i < len; i++) {
				if(typeof children[i] !== 'object') {
					children[i] = document.createTextNode(children[i]);
				}
				if(children[i] instanceof jQuery && children[i].hasClass('mediaWiki_htmlEmitter')) {
					children[i] = children[i].contents();
				}
			}
			return $parent.append(children);
		}

		function decodePrimaryHtmlEntities(encoded) {
			return encoded.replace(/&#039;/g, '\'').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
		}

		function textify(input) {
			if(input instanceof jQuery) {
				input = input
					.text();
			}
			return String(input);
		}

		function getFailableParserFn(options) {
			return function(args) {
				var fallback, parser = new mw.jqueryMsg.parser(options),
					key = args[0],
					argsArray = $.isArray(args[1]) ? args[1] : slice.call(args, 1);
				try {
					return parser.parse(key, argsArray);
				} catch(e) {
					fallback = parser.settings.messages.get(key);
					mw.log.warn('mediawiki.jqueryMsg: ' + key + ': ' + e.message);
					return $('<span>').text(fallback);
				}
			};
		}
		mw.jqueryMsg = {};
		mw.jqueryMsg.setParserDefaults = function(data) {
			$.extend(parserDefaults, data);
		};
		mw.jqueryMsg.getParserDefaults = function() {
			return $.extend({}, parserDefaults);
		};
		mw.jqueryMsg.getMessageFunction = function(options) {
			var failableParserFn, format;
			if(options && options.format !== undefined) {
				format = options.format;
			} else {
				format = parserDefaults.format;
			}
			return function() {
				if(!failableParserFn) {
					failableParserFn = getFailableParserFn(options);
				}
				var failableResult = failableParserFn(arguments);
				if(format === 'text' || format === 'escaped') {
					return failableResult.text();
				} else {
					return failableResult.html();
				}
			};
		};
		mw.
		jqueryMsg.getPlugin = function(options) {
			var failableParserFn;
			return function() {
				if(!failableParserFn) {
					failableParserFn = getFailableParserFn(options);
				}
				var $target = this.empty();
				appendWithoutParsing($target, failableParserFn(arguments));
				return $target;
			};
		};
		mw.jqueryMsg.parser = function(options) {
			this.settings = $.extend({}, parserDefaults, options);
			this.settings.onlyCurlyBraceTransform = (this.settings.format === 'text' || this.settings.format === 'escaped');
			this.astCache = {};
			this.emitter = new mw.jqueryMsg.htmlEmitter(this.settings.language, this.settings.magic);
		};
		mw.jqueryMsg.parser.prototype = {
			parse: function(key, replacements) {
				var ast = this.getAst(key);
				return this.emitter.emit(ast, replacements);
			},
			getAst: function(key) {
				var wikiText;
				if(!this.astCache.hasOwnProperty(key)) {
					wikiText = this.settings.messages.get(key);
					if(typeof wikiText !== 'string') {
						wikiText = '\\[' + key + '\\]';
					}
					this.astCache[key] = this.wikiTextToAst(wikiText);
				}
				return this.astCache[key];
			},
			wikiTextToAst: function(input) {
				var pos, regularLiteral,
					regularLiteralWithoutBar, regularLiteralWithoutSpace, regularLiteralWithSquareBrackets, doubleQuote, singleQuote, backslash, anyCharacter, asciiAlphabetLiteral, escapedOrLiteralWithoutSpace, escapedOrLiteralWithoutBar, escapedOrRegularLiteral, whitespace, dollar, digits, htmlDoubleQuoteAttributeValue, htmlSingleQuoteAttributeValue, htmlAttributeEquals, openHtmlStartTag, optionalForwardSlash, openHtmlEndTag, closeHtmlTag, openExtlink, closeExtlink, wikilinkContents, openWikilink, closeWikilink, templateName, pipe, colon, templateContents, openTemplate, closeTemplate, nonWhitespaceExpression, paramExpression, expression, curlyBraceTransformExpression, result, settings = this.settings,
					concat = Array.prototype.concat;
				pos = 0;

				function choice(ps) {
					return function() {
						var i, result;
						for(i = 0; i < ps.length; i++) {
							result = ps[i]();
							if(result !== null) {
								return result;
							}
						}
						return null;
					};
				}

				function sequence(ps) {
					var i, res, originalPos = pos,
						result = [];
					for(i = 0; i < ps.length; i++) {
						res = ps[i]();
						if(res === null) {
							pos = originalPos;
							return null;
						}
						result.push(res);
					}
					return result;
				}

				function nOrMore(n, p) {
					return function() {
						var originalPos = pos,
							result = [],
							parsed = p();
						while(parsed !== null) {
							result.push(parsed);
							parsed = p();
						}
						if(result.length < n) {
							pos = originalPos;
							return null;
						}
						return result;
					};
				}

				function transform(p, fn) {
					return function() {
						var result = p();
						return result === null ? null : fn(result);
					};
				}

				function makeStringParser(s) {
					var len = s.length;
					return function() {
						var result = null;
						if(input.substr(pos, len) === s) {
							result = s;
							pos += len;
						}
						return result;
					};
				}

				function makeRegexParser(regex) {
					return function() {
						var matches = input.slice(pos).match(regex);
						if(matches === null) {
							return null;
						}
						pos += matches[0].length;
						return matches[0];
					};
				}
				regularLiteral = makeRegexParser(/^[^{}\[\]$<\\]/);
				regularLiteralWithoutBar = makeRegexParser(/^[^{}\[\]$\\|]/);
				regularLiteralWithoutSpace = makeRegexParser(/^[^{}\[\]$\s]/);
				regularLiteralWithSquareBrackets = makeRegexParser(/^[^{}$\\]/);
				backslash = makeStringParser('\\');
				doubleQuote = makeStringParser('"');
				singleQuote = makeStringParser('\'');
				anyCharacter = makeRegexParser(/^./);
				openHtmlStartTag =
					makeStringParser('<');
				optionalForwardSlash = makeRegexParser(/^\/?/);
				openHtmlEndTag = makeStringParser('</');
				htmlAttributeEquals = makeRegexParser(/^\s*=\s*/);
				closeHtmlTag = makeRegexParser(/^\s*>/);

				function escapedLiteral() {
					var result = sequence([backslash, anyCharacter]);
					return result === null ? null : result[1];
				}
				escapedOrLiteralWithoutSpace = choice([escapedLiteral, regularLiteralWithoutSpace]);
				escapedOrLiteralWithoutBar = choice([escapedLiteral, regularLiteralWithoutBar]);
				escapedOrRegularLiteral = choice([escapedLiteral, regularLiteral]);

				function literalWithoutSpace() {
					var result = nOrMore(1, escapedOrLiteralWithoutSpace)();
					return result === null ? null : result.join('');
				}

				function literalWithoutBar() {
					var result = nOrMore(1, escapedOrLiteralWithoutBar)();
					return result === null ? null : result.join('');
				}

				function literal() {
					var result = nOrMore(1, escapedOrRegularLiteral)();
					return result === null ? null : result.join('');
				}

				function curlyBraceTransformExpressionLiteral() {
					var result = nOrMore(1, regularLiteralWithSquareBrackets)();
					return result ===
						null ? null : result.join('');
				}
				asciiAlphabetLiteral = makeRegexParser(/[A-Za-z]+/);
				htmlDoubleQuoteAttributeValue = makeRegexParser(/^[^"]*/);
				htmlSingleQuoteAttributeValue = makeRegexParser(/^[^']*/);
				whitespace = makeRegexParser(/^\s+/);
				dollar = makeStringParser('$');
				digits = makeRegexParser(/^\d+/);

				function replacement() {
					var result = sequence([dollar, digits]);
					if(result === null) {
						return null;
					}
					return ['REPLACE', parseInt(result[1], 10) - 1];
				}
				openExtlink = makeStringParser('[');
				closeExtlink = makeStringParser(']');

				function extlink() {
					var result, parsedResult, target;
					result = null;
					parsedResult = sequence([openExtlink, nOrMore(1, nonWhitespaceExpression), whitespace, nOrMore(1, expression), closeExtlink]);
					if(parsedResult !== null) {
						target = parsedResult[1].length === 1 ? parsedResult[1][0] : ['CONCAT'].concat(parsedResult[1]);
						result = ['EXTLINK', target, ['CONCAT'].concat(parsedResult[3])];
					}
					return result;
				}
				openWikilink = makeStringParser('[[');
				closeWikilink = makeStringParser(']]');
				pipe = makeStringParser('|');

				function template() {
					var result = sequence(
						[openTemplate, templateContents, closeTemplate]);
					return result === null ? null : result[1];
				}

				function pipedWikilink() {
					var result = sequence([nOrMore(1, paramExpression), pipe, nOrMore(1, expression)]);
					return result === null ? null : [
						['CONCAT'].concat(result[0]), ['CONCAT'].concat(result[2])
					];
				}

				function unpipedWikilink() {
					var result = sequence([nOrMore(1, paramExpression)]);
					return result === null ? null : [
						['CONCAT'].concat(result[0])
					];
				}
				wikilinkContents = choice([pipedWikilink, unpipedWikilink]);

				function wikilink() {
					var result, parsedResult, parsedLinkContents;
					result = null;
					parsedResult = sequence([openWikilink, wikilinkContents, closeWikilink]);
					if(parsedResult !== null) {
						parsedLinkContents = parsedResult[1];
						result = ['WIKILINK'].concat(parsedLinkContents);
					}
					return result;
				}

				function doubleQuotedHtmlAttributeValue() {
					var parsedResult = sequence([doubleQuote, htmlDoubleQuoteAttributeValue, doubleQuote]);
					return parsedResult === null ? null : parsedResult[1];
				}

				function singleQuotedHtmlAttributeValue() {
					var parsedResult = sequence([singleQuote,
						htmlSingleQuoteAttributeValue, singleQuote
					]);
					return parsedResult === null ? null : parsedResult[1];
				}

				function htmlAttribute() {
					var parsedResult = sequence([whitespace, asciiAlphabetLiteral, htmlAttributeEquals, choice([doubleQuotedHtmlAttributeValue, singleQuotedHtmlAttributeValue])]);
					return parsedResult === null ? null : [parsedResult[1], parsedResult[3]];
				}

				function isAllowedHtml(startTagName, endTagName, attributes) {
					var i, len, attributeName;
					startTagName = startTagName.toLowerCase();
					endTagName = endTagName.toLowerCase();
					if(startTagName !== endTagName || $.inArray(startTagName, settings.allowedHtmlElements) === -1) {
						return false;
					}
					for(i = 0, len = attributes.length; i < len; i += 2) {
						attributeName = attributes[i];
						if($.inArray(attributeName, settings.allowedHtmlCommonAttributes) === -1 && $.inArray(attributeName, settings.allowedHtmlAttributesByElement[startTagName] || []) === -1) {
							return false;
						}
					}
					return true;
				}

				function htmlAttributes() {
					var parsedResult = nOrMore(0, htmlAttribute)();
					return concat.apply(['HTMLATTRIBUTES'], parsedResult);
				}

				function html() {
					var parsedOpenTagResult, parsedHtmlContents, parsedCloseTagResult, wrappedAttributes, attributes, startTagName, endTagName, startOpenTagPos, startCloseTagPos, endOpenTagPos, endCloseTagPos, result = null;
					startOpenTagPos = pos;
					parsedOpenTagResult = sequence([openHtmlStartTag, asciiAlphabetLiteral, htmlAttributes, optionalForwardSlash, closeHtmlTag]);
					if(parsedOpenTagResult === null) {
						return null;
					}
					endOpenTagPos = pos;
					startTagName = parsedOpenTagResult[1];
					parsedHtmlContents = nOrMore(0, expression)();
					startCloseTagPos = pos;
					parsedCloseTagResult = sequence([openHtmlEndTag, asciiAlphabetLiteral, closeHtmlTag]);
					if(parsedCloseTagResult === null) {
						return ['CONCAT', input.slice(startOpenTagPos, endOpenTagPos)].concat(parsedHtmlContents);
					}
					endCloseTagPos = pos;
					endTagName = parsedCloseTagResult[1];
					wrappedAttributes = parsedOpenTagResult[2];
					attributes = wrappedAttributes.slice(1);
					if(isAllowedHtml(startTagName, endTagName, attributes)) {
						result = ['HTMLELEMENT', startTagName, wrappedAttributes].concat(parsedHtmlContents);
					} else {
						result = ['CONCAT', input.slice(
							startOpenTagPos, endOpenTagPos)].concat(parsedHtmlContents, input.slice(startCloseTagPos, endCloseTagPos));
					}
					return result;
				}
				templateName = transform(makeRegexParser(/^[ !"$&'()*,.\/0-9;=?@A-Z\^_`a-z~\x80-\xFF+\-]+/), function(result) {
					return result.toString();
				});

				function templateParam() {
					var expr, result;
					result = sequence([pipe, nOrMore(0, paramExpression)]);
					if(result === null) {
						return null;
					}
					expr = result[1];
					return expr.length > 1 ? ['CONCAT'].concat(expr) : expr[0];
				}

				function templateWithReplacement() {
					var result = sequence([templateName, colon, replacement]);
					return result === null ? null : [result[0], result[2]];
				}

				function templateWithOutReplacement() {
					var result = sequence([templateName, colon, paramExpression]);
					return result === null ? null : [result[0], result[2]];
				}

				function templateWithOutFirstParameter() {
					var result = sequence([templateName, colon]);
					return result === null ? null : [result[0], ''];
				}
				colon = makeStringParser(':');
				templateContents = choice([function() {
					var res = sequence([choice([templateWithReplacement, templateWithOutReplacement,
						templateWithOutFirstParameter
					]), nOrMore(0, templateParam)]);
					return res === null ? null : res[0].concat(res[1]);
				}, function() {
					var res = sequence([templateName, nOrMore(0, templateParam)]);
					if(res === null) {
						return null;
					}
					return [res[0]].concat(res[1]);
				}]);
				openTemplate = makeStringParser('{{');
				closeTemplate = makeStringParser('}}');
				nonWhitespaceExpression = choice([template, wikilink, extlink, replacement, literalWithoutSpace]);
				paramExpression = choice([template, wikilink, extlink, replacement, literalWithoutBar]);
				expression = choice([template, wikilink, extlink, replacement, html, literal]);
				curlyBraceTransformExpression = choice([template, replacement, curlyBraceTransformExpressionLiteral]);

				function start(rootExpression) {
					var result = nOrMore(0, rootExpression)();
					if(result === null) {
						return null;
					}
					return ['CONCAT'].concat(result);
				}
				result = start(this.settings.onlyCurlyBraceTransform ? curlyBraceTransformExpression : expression);
				if(result === null || pos !== input.length) {
					throw new Error('Parse error at position ' + pos.toString() + ' in input: ' + input);
				}
				return result;
			}
		};
		mw.jqueryMsg.htmlEmitter = function(language, magic) {
			this.language = language;
			var jmsg = this;
			$.each(magic, function(key, val) {
				jmsg[key.toLowerCase()] = function() {
					return val;
				};
			});
			this.emit = function(node, replacements) {
				var ret, subnodes, operation, jmsg = this;
				switch(typeof node) {
					case 'string':
					case 'number':
						ret = node;
						break;
					case 'object':
						subnodes = $.map(node.slice(1), function(n) {
							return jmsg.emit(n, replacements);
						});
						operation = node[0].toLowerCase();
						if(typeof jmsg[operation] === 'function') {
							ret = jmsg[operation](subnodes, replacements);
						} else {
							throw new Error('Unknown operation "' + operation + '"');
						}
						break;
					case 'undefined':
						ret = '';
						break;
					default:
						throw new Error('Unexpected type in AST: ' + typeof node);
				}
				return ret;
			};
		};
		mw.jqueryMsg.htmlEmitter.prototype = {
			concat: function(nodes) {
				var $span = $('<span>').addClass('mediaWiki_htmlEmitter');
				$.each(nodes, function(i, node) {
					appendWithoutParsing($span, node);
				});
				return $span;
			},
			replace: function(nodes, replacements) {
				var index = parseInt(nodes[0], 10);
				if(index < replacements.length) {
					return replacements[index];
				} else {
					return '$' + (index + 1);
				}
			},
			wikilink: function(nodes) {
				var page, anchor, url, $el;
				page = textify(nodes[0]);
				if(page.charAt(0) === ':') {
					page = page.slice(1);
				}
				url = mw.util.getUrl(page);
				if(nodes.length === 1) {
					anchor = page;
				} else {
					anchor = nodes[1];
				}
				$el = $('<a>').attr({
					title: page,
					href: url
				});
				return appendWithoutParsing($el, anchor);
			},
			htmlattributes: function(nodes) {
				var i, len, mapping = {};
				for(i = 0, len = nodes.length; i < len; i += 2) {
					mapping[nodes[i]] = decodePrimaryHtmlEntities(nodes[i + 1]);
				}
				return mapping;
			},
			htmlelement: function(nodes) {
				var tagName, attributes, contents, $element;
				tagName = nodes.shift();
				attributes = nodes.shift();
				contents = nodes;
				$element = $(document.createElement(tagName)).attr(attributes);
				return appendWithoutParsing($element, contents);
			},
			extlink: function(nodes) {
				var $el, arg = nodes[0],
					contents = nodes[1];
				if(arg instanceof jQuery && !arg.hasClass('mediaWiki_htmlEmitter')) {
					$el = arg;
				} else {
					$el = $('<a>');
					if(typeof arg === 'function') {
						$el.attr('href', '#').click(function(e) {
							e.preventDefault();
						}).click(arg);
					} else {
						$el.attr('href', textify(arg));
					}
				}
				return appendWithoutParsing($el.empty(), contents);
			},
			plural: function(nodes) {
				var forms, firstChild, firstChildText, explicitPluralFormNumber, formIndex, form, count, explicitPluralForms = {};
				count = parseFloat(this.language.convertNumber(nodes[0], true));
				forms = nodes.slice(1);
				for(formIndex = 0; formIndex < forms.length; formIndex++) {
					form = forms[formIndex];
					if(form instanceof jQuery && form.hasClass('mediaWiki_htmlEmitter')) {
						firstChild = form.contents().get(0);
						if(firstChild && firstChild.nodeType === Node.TEXT_NODE) {
							firstChildText = firstChild.textContent;
							if(/^\d+=/.test(firstChildText)) {
								explicitPluralFormNumber = parseInt(firstChildText.split(/=/)[0], 10);
								firstChild.textContent = firstChildText.slice(firstChildText.indexOf('=') + 1);
								explicitPluralForms[explicitPluralFormNumber] = form;
								forms[formIndex] = undefined;
							}
						}
					} else if(/^\d+=/.test(form)) {
						explicitPluralFormNumber = parseInt(form.split(/=/)[0], 10);
						explicitPluralForms[explicitPluralFormNumber] = form.slice(form.indexOf('=') + 1);
						forms[formIndex] = undefined;
					}
				}
				forms = $.map(forms, function(form) {
					return form;
				});
				return this.language.convertPlural(count, forms, explicitPluralForms);
			},
			gender: function(nodes) {
				var gender, maybeUser = nodes[0],
					forms = nodes.slice(1);
				if(maybeUser === '') {
					maybeUser = mw.user;
				}
				if(maybeUser && maybeUser.options instanceof mw.Map) {
					gender = maybeUser.options.get('gender');
				} else {
					gender = maybeUser;
				}
				return this.language.gender(gender, forms);
			},
			grammar: function(nodes) {
				var form = nodes[0],
					word = nodes[1];
				return word && form && this.language.convertGrammar(word, form);
			},
			'int': function(nodes) {
				var msg = nodes[0];
				return mw.jqueryMsg.getMessageFunction()(msg.charAt(0).toLowerCase() + msg.slice(1));
			},
			ns: function(nodes) {
				var ns = $.trim(textify(nodes[0]));
				if(!/^\d+$/.test(ns)) {
					ns = mw.config.get('wgNamespaceIds')[ns.replace(/ /g, '_').toLowerCase()];
				}
				ns = mw.config.get('wgFormattedNamespaces')[ns];
				return ns || '';
			},
			formatnum: function(nodes) {
				var isInteger = (nodes[1] && nodes[1] === 'R') ? true : !1,
					number = nodes[0];
				return this.language.convertNumber(number, isInteger);
			},
			lc: function(nodes) {
				return textify(nodes[0]).toLowerCase();
			},
			uc: function(nodes) {
				return textify(nodes[0]).toUpperCase();
			},
			lcfirst: function(nodes) {
				var text = textify(nodes[0]);
				return text.charAt(0).toLowerCase() + text.slice(1);
			},
			ucfirst: function(nodes) {
				var text = textify(nodes[0]);
				return text.charAt(0).toUpperCase() + text.slice(1);
			}
		};
		mw.log.deprecate(window, 'gM', mw.jqueryMsg.getMessageFunction(), 'Use mw.message( ... ).parse() instead.');
		$.fn.msg = mw.jqueryMsg.getPlugin();
		oldParser = mw.Message.prototype.parser;
		mw.Message.prototype.parser = function() {
			if(this.format === 'plain' || !/\{\{|[\[<>&]/.test(this.map.get(this.key))) {
				return oldParser.apply(this);
			}
			if(!this.map.hasOwnProperty(this.format)) {
				this.map[this.format] = mw.jqueryMsg.getMessageFunction({
					messages: this.map,
					format: this.format
				});
			}
			return this.map[this.format](this.key, this.parameters);
		};
		mw.Message.prototype.parseDom = (function() {
			var reusableParent = $('<div>');
			return function() {
				return reusableParent.msg(this.key, this.parameters).contents().detach();
			};
		})();
	}(mediaWiki, jQuery));
	mw.jqueryMsg.setParserDefaults({
		"allowedHtmlElements": ["b", "bdi", "del", "i", "ins", "u", "font", "big", "small", "sub", "sup", "h1", "h2", "h3", "h4", "h5", "h6", "cite", "code", "em", "s", "strike", "strong", "tt", "var", "div", "center", "blockquote", "ol", "ul", "dl", "table", "caption", "pre", "ruby", "rb", "rp", "rt", "rtc", "p", "span", "abbr", "dfn", "kbd", "samp", "data", "time", "mark", "li", "dt", "dd"]
	});
});
mw.loader.implement("mediawiki.language", function($, jQuery, require, module) {
	(function(mw, $) {
		$.extend(mw.language, {
			procPLURAL: function(template) {
				if(template.title && template.parameters && mw.language.convertPlural) {
					if(template.parameters.length === 0) {
						return '';
					}
					var count = mw.language.convertNumber(template.title, true);
					return mw.language.convertPlural(parseInt(count, 10), template.parameters);
				}
				if(template.parameters[0]) {
					return template.parameters[0];
				}
				return '';
			},
			convertPlural: function(count, forms, explicitPluralForms) {
				var pluralRules, pluralFormIndex = 0;
				if(explicitPluralForms && (explicitPluralForms[count] !== undefined)) {
					return explicitPluralForms[count];
				}
				if(!forms || forms.length === 0) {
					return '';
				}
				pluralRules = mw.language.getData(mw.config.get('wgUserLanguage'), 'pluralRules');
				if(!pluralRules) {
					return(count === 1) ? forms[0] : forms[1];
				}
				pluralFormIndex = mw.cldr.getPluralForm(count, pluralRules);
				pluralFormIndex = Math.min(pluralFormIndex, forms.length - 1);
				return forms[pluralFormIndex];
			},
			preConvertPlural: function(forms,
				count) {
				while(forms.length < count) {
					forms.push(forms[forms.length - 1]);
				}
				return forms;
			},
			gender: function(gender, forms) {
				if(!forms || forms.length === 0) {
					return '';
				}
				forms = mw.language.preConvertPlural(forms, 2);
				if(gender === 'male') {
					return forms[0];
				}
				if(gender === 'female') {
					return forms[1];
				}
				return(forms.length === 3) ? forms[2] : forms[0];
			},
			convertGrammar: function(word, form) {
				var grammarForms = mw.language.getData(mw.config.get('wgUserLanguage'), 'grammarForms');
				if(grammarForms && grammarForms[form]) {
					return grammarForms[form][word] || word;
				}
				return word;
			},
			listToText: function(list) {
				var text = '',
					i = 0;
				for(; i < list.length; i++) {
					text += list[i];
					if(list.length - 2 === i) {
						text += mw.msg('and') + mw.msg('word-separator');
					} else if(list.length - 1 !== i) {
						text += mw.msg('comma-separator');
					}
				}
				return text;
			},
			setSpecialCharacters: function(data) {
				this.specialCharacters = data;
			}
		});
	}(mediaWiki, jQuery));
	(function(mw, $) {
		function replicate(str, num) {
			if(num <= 0 || !str) {
				return '';
			}
			var buf = [];
			while(num--) {
				buf.push(str);
			}
			return buf.join('');
		}

		function pad(text, size, ch, end) {
			if(!ch) {
				ch = '0';
			}
			var out = String(text),
				padStr = replicate(ch, Math.ceil((size - out.length) / ch.length));
			return end ? out + padStr : padStr + out;
		}

		function commafyNumber(value, pattern, options) {
			options = options || {
				group: ',',
				decimal: '.'
			};
			if(isNaN(value)) {
				return value;
			}
			var padLength, patternDigits, index, whole, off, remainder, patternParts = pattern.split('.'),
				maxPlaces = (patternParts[1] || []).length,
				valueParts = String(Math.abs(value)).split('.'),
				fractional = valueParts[1] || '',
				groupSize = 0,
				groupSize2 = 0,
				pieces = [];
			if(patternParts[1]) {
				padLength = (patternParts[1] && patternParts[1].lastIndexOf('0') + 1);
				if(padLength > fractional.length) {
					valueParts[1] = pad(fractional, padLength, '0', true);
				}
				if(maxPlaces < fractional.length) {
					valueParts[1] = fractional.slice(0, maxPlaces);
				}
			} else {
				if(valueParts[1]) {
					valueParts.pop();
				}
			}
			patternDigits = patternParts[0].replace(',', '');
			padLength = patternDigits.indexOf('0');
			if(padLength !== -1) {
				padLength = patternDigits.length - padLength;
				if(padLength > valueParts[0].length) {
					valueParts[0] = pad(valueParts[0], padLength);
				}
				if(
					patternDigits.indexOf('#') === -1) {
					valueParts[0] = valueParts[0].slice(valueParts[0].length - padLength);
				}
			}
			index = patternParts[0].lastIndexOf(',');
			if(index !== -1) {
				groupSize = patternParts[0].length - index - 1;
				remainder = patternParts[0].slice(0, index);
				index = remainder.lastIndexOf(',');
				if(index !== -1) {
					groupSize2 = remainder.length - index - 1;
				}
			}
			for(whole = valueParts[0]; whole;) {
				off = groupSize ? whole.length - groupSize : 0;
				pieces.push((off > 0) ? whole.slice(off) : whole);
				whole = (off > 0) ? whole.slice(0, off) : '';
				if(groupSize2) {
					groupSize = groupSize2;
					groupSize2 = null;
				}
			}
			valueParts[0] = pieces.reverse().join(options.group);
			return valueParts.join(options.decimal);
		}
		$.extend(mw.language, {
			convertNumber: function(num, integer) {
				var i, tmp, transformTable, numberString, convertedNumber, pattern;
				pattern = mw.language.getData(mw.config.get('wgUserLanguage'), 'digitGroupingPattern') || '#,##0.###';
				transformTable = mw.language.getDigitTransformTable();
				if(!transformTable) {
					return num;
				}
				if(integer) {
					if(parseInt(num, 10) === num) {
						return num;
					}
					tmp = [];
					for(i in
						transformTable) {
						tmp[transformTable[i]] = i;
					}
					transformTable = tmp;
					numberString = String(num);
				} else {
					if(!mw.config.get('wgTranslateNumerals')) {
						transformTable = [];
					}
					numberString = mw.language.commafy(num, pattern);
				}
				convertedNumber = '';
				for(i = 0; i < numberString.length; i++) {
					if(transformTable[numberString[i]]) {
						convertedNumber += transformTable[numberString[i]];
					} else {
						convertedNumber += numberString[i];
					}
				}
				return integer ? parseInt(convertedNumber, 10) : convertedNumber;
			},
			getDigitTransformTable: function() {
				return mw.language.getData(mw.config.get('wgUserLanguage'), 'digitTransformTable') || [];
			},
			getSeparatorTransformTable: function() {
				return mw.language.getData(mw.config.get('wgUserLanguage'), 'separatorTransformTable') || [];
			},
			commafy: function(value, pattern) {
				var numberPattern, transformTable = mw.language.getSeparatorTransformTable(),
					group = transformTable[','] || ',',
					numberPatternRE = /[#0,]*[#0](?:\.0*#*)?/,
					decimal = transformTable['.'] || '.',
					patternList = pattern.split(';'),
					positivePattern = patternList[0];
				pattern = patternList[(value < 0) ? 1 : 0] ||
					('-' + positivePattern);
				numberPattern = positivePattern.match(numberPatternRE);
				if(!numberPattern) {
					throw new Error('unable to find a number expression in pattern: ' + pattern);
				}
				return pattern.replace(numberPatternRE, commafyNumber(value, numberPattern[0], {
					decimal: decimal,
					group: group
				}));
			}
		});
	}(mediaWiki, jQuery));
	(function(mw, $) {
		$.extend(mw.language, {
			getFallbackLanguages: function() {
				return mw.language.getData(mw.config.get('wgUserLanguage'), 'fallbackLanguages') || [];
			},
			getFallbackLanguageChain: function() {
				return [mw.config.get('wgUserLanguage')].concat(mw.language.getFallbackLanguages());
			}
		});
	}(mediaWiki, jQuery));
}, {}, {
	"and": "\u548c",
	"comma-separator": "\u3001",
	"word-separator": ""
});
mw.loader.implement("mediawiki.notify", function($, jQuery, require, module) {
	(function(mw) {
		'use strict';
		mw.notify = function(message, options) {
			return mw.loader.using('mediawiki.notification').then(function() {
				return mw.notification.notify(message, options);
			});
		};
	}(mediaWiki));
});
mw.loader.implement("mediawiki.template", function($, jQuery, require, module) {
	(function(mw, $) {
		var compiledTemplates = {},
			compilers = {};
		mw.template = {
			registerCompiler: function(name, compiler) {
				if(!compiler.compile) {
					throw new Error('Compiler must implement a compile method');
				}
				compilers[name] = compiler;
			},
			getCompilerName: function(templateName) {
				var nameParts = templateName.split('.');
				if(nameParts.length < 2) {
					throw new Error('Template name must have a suffix');
				}
				return nameParts[nameParts.length - 1];
			},
			getCompiler: function(name) {
				var compiler = compilers[name];
				if(!compiler) {
					throw new Error('Unknown compiler ' + name);
				}
				return compiler;
			},
			add: function(moduleName, templateName, templateBody) {
				var compiled = this.compile(templateBody, this.getCompilerName(templateName));
				if(!compiledTemplates[moduleName]) {
					compiledTemplates[moduleName] = {};
				}
				compiledTemplates[moduleName][templateName] = compiled;
				return compiled;
			},
			get: function(moduleName, templateName) {
				var moduleTemplates;
				if(compiledTemplates[moduleName] && compiledTemplates[
						moduleName][templateName]) {
					return compiledTemplates[moduleName][templateName];
				}
				moduleTemplates = mw.templates.get(moduleName);
				if(!moduleTemplates || !moduleTemplates[templateName]) {
					throw new Error('Template ' + templateName + ' not found in module ' + moduleName);
				}
				return this.add(moduleName, templateName, moduleTemplates[templateName]);
			},
			compile: function(templateBody, compilerName) {
				return this.getCompiler(compilerName).compile(templateBody);
			}
		};
		mw.template.registerCompiler('html', {
			compile: function(src) {
				return {
					render: function() {
						return $($.parseHTML($.trim(src)));
					}
				};
			}
		});
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.user", function($, jQuery, require, module) {
	(function(mw, $) {
		var i, userInfoPromise, byteToHex = [];

		function getUserInfo() {
			if(!userInfoPromise) {
				userInfoPromise = new mw.Api().getUserInfo();
			}
			return userInfoPromise;
		}
		for(i = 0; i < 256; i++) {
			byteToHex[i] = (i + 256).toString(16).slice(1);
		}
		$.extend(mw.user, {
			generateRandomSessionId: function() {
				var rnds, i, r, hexRnds = new Array(8),
					crypto = window.crypto || window.msCrypto;
				if(crypto && crypto.getRandomValues) {
					rnds = new Uint8Array(8);
					crypto.getRandomValues(rnds);
				} else {
					rnds = new Array(8);
					for(i = 0; i < 8; i++) {
						if((i & 3) === 0) {
							r = Math.random() * 0x100000000;
						}
						rnds[i] = r >>> ((i & 3) << 3) & 255;
					}
				}
				for(i = 0; i < 8; i++) {
					hexRnds[i] = byteToHex[rnds[i]];
				}
				return hexRnds.join('');
			},
			getId: function() {
				return mw.config.get('wgUserId', 0);
			},
			getName: function() {
				return mw.config.get('wgUserName');
			},
			getRegistration: function() {
				var registration = mw.config.get('wgUserRegistration');
				if(mw.user.isAnon()) {
					return false;
				}
				if(registration === null) {
					return null;
				}
				return new Date(registration);
			},
			isAnon: function() {
				return mw.user.getName() === null;
			},
			sessionId: function() {
				var sessionId = mw.cookie.get('mwuser-sessionId');
				if(sessionId === null) {
					sessionId = mw.user.generateRandomSessionId();
					mw.cookie.set('mwuser-sessionId', sessionId, {
						expires: null
					});
				}
				return sessionId;
			},
			id: function() {
				return mw.user.getName() || mw.user.sessionId();
			},
			bucket: function(key, options) {
				var cookie, parts, version, bucket, range, k, rand, total;
				options = $.extend({
					buckets: {},
					version: 0,
					expires: 30
				}, options || {});
				cookie = mw.cookie.get('mwuser-bucket:' + key);
				if(typeof cookie === 'string' && cookie.length > 2 && cookie.indexOf(':') !== -1) {
					parts = cookie.split(':');
					if(parts.length > 1 && Number(parts[0]) === options.version) {
						version = Number(parts[0]);
						bucket = String(parts[1]);
					}
				}
				if(bucket === undefined) {
					if(!$.isPlainObject(options.buckets)) {
						throw new Error('Invalid bucket. Object expected for options.buckets.');
					}
					version = Number(options.version);
					range = 0;
					for(k in options.buckets) {
						range += options.buckets[k];
					}
					rand = Math.random() * range;
					total = 0;
					for(k in options.buckets) {
						bucket = k;
						total += options.buckets[k];
						if(total >= rand) {
							break;
						}
					}
					mw.cookie.set('mwuser-bucket:' + key, version + ':' + bucket, {
						expires: Number(options.expires) * 86400
					});
				}
				return bucket;
			},
			getGroups: function(callback) {
				var userGroups = mw.config.get('wgUserGroups', []);
				return $.Deferred().resolve(userGroups).done(callback);
			},
			getRights: function(callback) {
				return getUserInfo().then(function(userInfo) {
					return userInfo.rights;
				}, function() {
					return [];
				}).done(callback);
			}
		});
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.util", function($, jQuery, require, module) {
	(function(mw, $) {
		'use strict';
		var util = {
			init: function() {
				util.$content = (function() {
					var i, l, $node, selectors;
					selectors = ['.mw-body-primary', '.mw-body', '#mw-content-text', 'body'];
					for(i = 0, l = selectors.length; i < l; i++) {
						$node = $(selectors[i]);
						if($node.length) {
							return $node.first();
						}
					}
					return util.$content;
				}());
			},
			rawurlencode: function(str) {
				str = String(str);
				return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/~/g, '%7E');
			},
			escapeId: function(str) {
				str = String(str);
				return util.rawurlencode(str.replace(/ /g, '_')).replace(/%3A/g, ':').replace(/%/g, '.');
			},
			wikiUrlencode: function(str) {
				return util.rawurlencode(str).replace(/%20/g, '_').replace(/%3B/g, ';').replace(/%40/g, '@').replace(/%24/g, '$').replace(/%21/g, '!').replace(/%2A/g, '*').replace(/%28/g, '(').replace(/%29/g, ')').replace(/%2C/g, ',').replace(/%2F/g, '/').replace(/%7E/g, '~').replace(/%3A/g, ':');
			},
			getUrl: function(pageName, params) {
				var titleFragmentStart, url, query, fragment = '',
					title = typeof pageName === 'string' ? pageName : mw.config.get('wgPageName');
				titleFragmentStart = title.indexOf('#');
				if(titleFragmentStart !== -1) {
					fragment = title.slice(titleFragmentStart + 1);
					title = title.slice(0, titleFragmentStart);
				}
				if(params) {
					query = $.param(params);
				}
				if(query) {
					url = title ? util.wikiScript() + '?title=' + util.wikiUrlencode(title) + '&' + query : util.wikiScript() + '?' + query;
				} else {
					url = mw.config.get('wgArticlePath').replace('$1', util.wikiUrlencode(title));
				}
				if(fragment.length) {
					url += '#' + util.escapeId(fragment);
				}
				return url;
			},
			wikiScript: function(str) {
				str = str || 'index';
				if(str === 'index') {
					return mw.config.get('wgScript');
				} else if(str === 'load') {
					return mw.config.get('wgLoadScript');
				} else {
					return mw.config.get('wgScriptPath') + '/' + str + '.php';
				}
			},
			addCSS: function(text) {
				var s = mw.loader.addStyleTag(text);
				return s.sheet || s.styleSheet || s;
			},
			getParamValue: function(param, url) {
				if(url === undefined) {
					url = location.href;
				}
				var re = new RegExp('^[^#]*[&?]' +
						mw.RegExp.escape(param) + '=([^&#]*)'),
					m = re.exec(url);
				if(m) {
					return decodeURIComponent(m[1].replace(/\+/g, '%20'));
				}
				return null;
			},
			$content: null,
			addPortletLink: function(portlet, href, text, id, tooltip, accesskey, nextnode) {
				var $item, $link, $portlet, $ul;
				if(arguments.length < 3) {
					return null;
				}
				$link = $('<a>').attr('href', href).text(text);
				if(tooltip) {
					$link.attr('title', tooltip);
				}
				$portlet = $('#' + portlet);
				if($portlet.length === 0) {
					return null;
				}
				$ul = $portlet.find('ul').eq(0);
				if($ul.length === 0) {
					$ul = $('<ul>');
					if($portlet.find('div:first').length === 0) {
						$portlet.append($ul);
					} else {
						$portlet.find('div').eq(-1).append($ul);
					}
				}
				if($ul.length === 0) {
					return null;
				}
				$portlet.removeClass('emptyPortlet');
				if($portlet.hasClass('vectorTabs')) {
					$item = $link.wrap('<li><span></span></li>').parent().parent();
				} else {
					$item = $link.wrap('<li></li>').parent();
				}
				if(id) {
					$item.attr('id', id);
				}
				if(accesskey) {
					$link.attr('accesskey', accesskey);
				}
				if(tooltip) {
					$link.attr('title', tooltip);
				}
				if(nextnode) {
					if(nextnode.nodeType || typeof nextnode === 'string') {
						nextnode
							= $ul.find(nextnode);
					} else if(!nextnode.jquery) {
						nextnode = undefined;
					}
					if(nextnode && (nextnode.length !== 1 || nextnode[0].parentNode !== $ul[0])) {
						nextnode = undefined;
					}
				}
				if(nextnode) {
					nextnode.before($item);
				} else {
					$ul.append($item);
				}
				$link.updateTooltipAccessKeys();
				return $item[0];
			},
			validateEmail: function(mailtxt) {
				var rfc5322Atext, rfc1034LdhStr, html5EmailRegexp;
				if(mailtxt === '') {
					return null;
				}
				rfc5322Atext = 'a-z0-9!#$%&\'*+\\-/=?^_`{|}~';
				rfc1034LdhStr = 'a-z0-9\\-';
				html5EmailRegexp = new RegExp('^' + '[' + rfc5322Atext + '\\.]+' + '@' + '[' + rfc1034LdhStr + ']+' + '(?:\\.[' + rfc1034LdhStr + ']+)*' + '$', 'i');
				return(mailtxt.match(html5EmailRegexp) !== null);
			},
			isIPv4Address: function(address, allowBlock) {
				if(typeof address !== 'string') {
					return false;
				}
				var block = allowBlock ? '(?:\\/(?:3[0-2]|[12]?\\d))?' : '',
					RE_IP_BYTE = '(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|0?[0-9]?[0-9])',
					RE_IP_ADD = '(?:' + RE_IP_BYTE + '\\.){3}' + RE_IP_BYTE;
				return address.search(new RegExp('^' + RE_IP_ADD + block + '$')) !== -1;
			},
			isIPv6Address: function(address, allowBlock) {
				if(typeof address !==
					'string') {
					return false;
				}
				var block = allowBlock ? '(?:\\/(?:12[0-8]|1[01][0-9]|[1-9]?\\d))?' : '',
					RE_IPV6_ADD = '(?:' + ':(?::|(?::' + '[0-9A-Fa-f]{1,4}' + '){1,7})' + '|' + '[0-9A-Fa-f]{1,4}' + '(?::' + '[0-9A-Fa-f]{1,4}' + '){0,6}::' + '|' + '[0-9A-Fa-f]{1,4}' + '(?::' + '[0-9A-Fa-f]{1,4}' + '){7}' + ')';
				if(address.search(new RegExp('^' + RE_IPV6_ADD + block + '$')) !== -1) {
					return true;
				}
				RE_IPV6_ADD = '[0-9A-Fa-f]{1,4}' + '(?:::?' + '[0-9A-Fa-f]{1,4}' + '){1,6}';
				return address.search(new RegExp('^' + RE_IPV6_ADD + block + '$')) !== -1 && address.search(/::/) !== -1 && address.search(/::.*::/) === -1;
			},
			isIPAddress: function(address, allowBlock) {
				return util.isIPv4Address(address, allowBlock) || util.isIPv6Address(address, allowBlock);
			},
			detectMobile: function() {
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
			}
		};
		mw.log.deprecate(util, 'wikiGetlink', util.getUrl, 'Use mw.util.getUrl instead.');
		mw.log.deprecate(util, 'tooltipAccessKeyPrefix', $.fn.updateTooltipAccessKeys.getAccessKeyPrefix(), 'Use jquery.accessKeyLabel instead.');
		mw.log.deprecate(util, 'tooltipAccessKeyRegexp', /\[(ctrl-)?(option-)?(alt-)?(shift-)?(esc-)?(.)\]$/, 'Use jquery.accessKeyLabel instead.');
		mw.log.deprecate(util, 'updateTooltipAccessKeys', function($nodes) {
			if(!$nodes) {
				if(document.querySelectorAll) {
					$nodes = $(document.querySelectorAll('[accesskey]'));
				} else {
					$nodes = $('#column-one a, #mw-head a, #mw-panel a, #p-logo a, input, label, button');
				}
			} else if(!($nodes instanceof $)) {
				$nodes = $($nodes);
			}
			$nodes.updateTooltipAccessKeys();
		}, 'Use jquery.accessKeyLabel instead.');
		mw.log.deprecate(util, 'jsMessage', function(message) {
			if(!
				arguments.length || message === '' || message === null) {
				return true;
			}
			if(typeof message !== 'object') {
				message = $.parseHTML(message);
			}
			mw.notify(message, {
				autoHide: !0,
				tag: 'legacy'
			});
			return true;
		}, 'Use mw.notify instead.');
		mw.util = util;
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.action.view.postEdit", function($, jQuery, require, module) {
	(function(mw, $) {
		'use strict';
		var config = mw.config.get(['wgAction', 'wgCurRevisionId']),
			cookieKey = 'PostEditRevision' + config.wgCurRevisionId,
			cookieVal = mw.cookie.get(cookieKey),
			$div, id;

		function removeConfirmation() {
			$div.remove();
			mw.hook('postEdit.afterRemoval').fire();
		}

		function fadeOutConfirmation() {
			clearTimeout(id);
			$div.find('.postedit').addClass('postedit postedit-faded');
			setTimeout(removeConfirmation, 500);
			return false;
		}

		function showConfirmation(data) {
			data = data || {};
			if(data.message === undefined) {
				data.message = $.parseHTML(mw.message('postedit-confirmation-saved', data.user || mw.user).escaped());
			}
			$div = mw.template.get('mediawiki.action.view.postEdit', 'postEdit.html').render();
			if(typeof data.message === 'string') {
				$div.find('.postedit-content').text(data.message);
			} else if(typeof data.message === 'object') {
				$div.find('.postedit-content').append(data.message);
			}
			$div.click(fadeOutConfirmation).prependTo('body');
			id =
				setTimeout(fadeOutConfirmation, 3000);
		}
		mw.hook('postEdit').add(showConfirmation);
		if(config.wgAction === 'view' && cookieVal) {
			mw.config.set('wgPostEdit', true);
			mw.hook('postEdit').fire({
				message: mw.msg('postedit-confirmation-' + cookieVal, mw.user)
			});
			mw.cookie.set(cookieKey, null);
		}
	}(mediaWiki, jQuery));
}, {
	"css": [
		".postedit-container{margin:0 auto;position:fixed;top:0;height:0;left:50%;z-index:1000;font-size:13px}.postedit-container:hover{cursor:pointer}.postedit{position:relative;top:0.6em;left:-50%;padding:.6em 3.6em .6em 1.1em;line-height:1.5625em;color:#626465;background-color:#f4f4f4;border:1px solid #dcd9d9;text-shadow:0 0.0625em 0 rgba(255,255,255,0.5);border-radius:5px;box-shadow:0 2px 5px 0 #ccc;-webkit-transition:all 0.25s ease-in-out;-moz-transition:all 0.25s ease-in-out;-ms-transition:all 0.25s ease-in-out;-o-transition:all 0.25s ease-in-out;transition:all 0.25s ease-in-out}.skin-monobook .postedit{top:6em !important}.postedit-faded{opacity:0}.postedit-icon{padding-left:41px;  line-height:25px;background-repeat:no-repeat;background-position:8px 50%}.postedit-icon-checkmark{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB9ElEQVR4AZWRA3AYURQArxrVHtW2bdu2bdu2zdi2bdu2bWxs7zeehZaw4f70kbs+zI3e/nWK+RWx3aOFlrL56Sy5SxrruG69hlv6OyK+mz+8KDSXdXembj0ispT7tjs4ZTIbpYBvxGSGKzZTeFrb7W/meN002swFs0U8ttpHTkF2BvCqWQrW35929bTsKm5Zb+SEwWwcY8wAngB9m7Z+d+rIPZ/npdy12M5p47n8dXsCYAf0qPy06eGMdktuDu9Qf+JmKl3SWM91qzVcN9tAbEYkwMaq0tyb1m/To5kP170el/BK8/qa6sJr70ydf+T/Uu5ab+Oo/lS0AkUBpIFWlZ9WPhxpse/PHO7YbOOczjL0vZV2lNxPPtG73dYXM+xvm2znrOl83tidoqCwMBgYXsPFB0on5S6pr+eK5TKuW67lgvaKvF8mL1dtfTL32FHxRdyx3cQpg7m4x9sCXKkTIzA4LDH44zWdzaUf71hv5rTG4uyzcusybxSX7aThbMQ8XgCYAp3rzTTQOiIh9PNlzY3FSuZxrzjme1Y7uGS6kjsWO4jPjM4FVjRZsvD4kO9XtTZzQn82NyzWc0B7AmZh6gA/hOYSGhfw9YbOVnarj+S7800AL2BIsxUAbWNToj7bhBuQmZcOsFdoKUC74rGheCwXmqAIQTc9jQcrADIAAAAASUVORK5CYII=);background-image:url(//wikicdn.joyme.com/resources/src/mediawiki.action/images/green-checkmark.png?d94f1)!ie;background-position:left}.postedit-close{position:absolute;padding:0 .8em;right:0;top:0;font-size:1.25em;font-weight:bold;line-height:2.3em;color:black;text-shadow:0 0.0625em 0 white;text-decoration:none;opacity:0.2;filter:alpha(opacity=20)}.postedit-close:hover{color:black;text-decoration:none;opacity:0.4;filter:alpha(opacity=40)}"
	]
}, {
	"postedit-confirmation-created": "\u9875\u9762\u5df2\u521b\u5efa\u3002",
	"postedit-confirmation-restored": "\u9875\u9762\u5df2\u6062\u590d\u3002",
	"postedit-confirmation-saved": "\u60a8\u7684\u7f16\u8f91\u5df2\u4fdd\u5b58\u3002"
}, {
	"postEdit.html": "\u003Cdiv class=\"postedit-container\"\u003E\n\t\u003Cdiv class=\"postedit\"\u003E\n\t\t\u003Cdiv class=\"postedit-icon postedit-icon-checkmark postedit-content\"\u003E\u003C/div\u003E\n\t\t\u003Ca href=\"#\" class=\"postedit-close\"\u003E\u0026times;\u003C/a\u003E\n\t\u003C/div\u003E\n\u003C/div\u003E\n"
});
mw.loader.implement("mediawiki.api.options", function($, jQuery, require, module) {
	(function(mw, $) {
		$.extend(mw.Api.prototype, {
			saveOption: function(name, value) {
				var param = {};
				param[name] = value;
				return this.saveOptions(param);
			},
			saveOptions: function(options) {
				var name, value, bundleable, grouped = [],
					deferreds = [];
				for(name in options) {
					value = options[name] === null ? null : String(options[name]);
					bundleable = (value === null || value.indexOf('|') === -1) && (name.indexOf('|') === -1 && name.indexOf('=') === -1);
					if(bundleable) {
						if(value !== null) {
							grouped.push(name + '=' + value);
						} else {
							grouped.push(name);
						}
					} else {
						if(value !== null) {
							deferreds.push(this.postWithToken('csrf', {
								formatversion: 2,
								action: 'options',
								optionname: name,
								optionvalue: value
							}));
						} else {
							deferreds.push(this.postWithToken('csrf', {
								formatversion: 2,
								action: 'options',
								optionname: name
							}));
						}
					}
				}
				if(grouped.length) {
					deferreds.push(this.postWithToken('csrf', {
						formatversion: 2,
						action: 'options',
						change: grouped
					}));
				}
				return $.when.apply($, deferreds);
			}
		});
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.api.user", function($, jQuery, require, module) {
	(function(mw, $) {
		$.extend(mw.Api.prototype, {
			getUserInfo: function() {
				return this.get({
					action: 'query',
					meta: 'userinfo',
					uiprop: ['groups', 'rights']
				}).then(function(data) {
					if(data.query && data.query.userinfo) {
						return data.query.userinfo;
					}
					return $.Deferred().reject().promise();
				});
			}
		});
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.language.data", function($, jQuery, require, module) {
	mw.language.setData("zh-hans", {
		"digitTransformTable": null,
		"separatorTransformTable": null,
		"grammarForms": [],
		"pluralRules": ["i = 1 and v = 0 @integer 1"],
		"digitGroupingPattern": null,
		"fallbackLanguages": ["en"]
	});
});
mw.loader.implement("mediawiki.language.init", function($, jQuery, require, module) {
	(function(mw) {
		mw.language = {
			data: {},
			getData: function(langCode, dataKey) {
				var langData = mw.language.data;
				langCode = langCode.toLowerCase();
				if(langData && langData[langCode] instanceof mw.Map) {
					return langData[langCode].get(dataKey);
				}
				return undefined;
			},
			setData: function(langCode, dataKey, value) {
				var langData = mw.language.data;
				langCode = langCode.toLowerCase();
				if(!(langData[langCode] instanceof mw.Map)) {
					langData[langCode] = new mw.Map();
				}
				langData[langCode].set(dataKey, value);
			}
		};
	}(mediaWiki));
});
mw.loader.implement("mediawiki.libs.pluralruleparser", function($, jQuery, require, module) {
	(function(mw) {
		function pluralRuleParser(rule, number) {
			'use strict';
			rule = rule.split('@')[0].replace(/^\s*/, '').replace(/\s*$/, '');
			if(!rule.length) {
				return true;
			}
			var pos = 0,
				operand, expression, relation, result, whitespace = makeRegexParser(/^\s+/),
				value = makeRegexParser(/^\d+/),
				_n_ = makeStringParser('n'),
				_i_ = makeStringParser('i'),
				_f_ = makeStringParser('f'),
				_t_ = makeStringParser('t'),
				_v_ = makeStringParser('v'),
				_w_ = makeStringParser('w'),
				_is_ = makeStringParser('is'),
				_isnot_ = makeStringParser('is not'),
				_isnot_sign_ = makeStringParser('!='),
				_equal_ = makeStringParser('='),
				_mod_ = makeStringParser('mod'),
				_percent_ = makeStringParser('%'),
				_not_ = makeStringParser('not'),
				_in_ = makeStringParser('in'),
				_within_ = makeStringParser('within'),
				_range_ = makeStringParser('..'),
				_comma_ = makeStringParser(','),
				_or_ = makeStringParser('or'),
				_and_ = makeStringParser('and');

			function debug() {}
			debug('pluralRuleParser', rule, number);

			function choice(parserSyntax) {
				return function() {
					var i, result;
					for(i = 0; i < parserSyntax.length; i++) {
						result = parserSyntax[i]();
						if(result !== null) {
							return result;
						}
					}
					return null;
				};
			}

			function sequence(parserSyntax) {
				var i, parserRes, originalPos = pos,
					result = [];
				for(i = 0; i < parserSyntax.length; i++) {
					parserRes = parserSyntax[i]();
					if(parserRes === null) {
						pos = originalPos;
						return null;
					}
					result.push(parserRes);
				}
				return result;
			}

			function nOrMore(n, p) {
				return function() {
					var originalPos = pos,
						result = [],
						parsed = p();
					while(parsed !== null) {
						result.push(parsed);
						parsed = p();
					}
					if(result.length < n) {
						pos = originalPos;
						return null;
					}
					return result;
				};
			}

			function makeStringParser(s) {
				var len = s.length;
				return function() {
					var result = null;
					if(rule.substr(pos, len) === s) {
						result = s;
						pos += len;
					}
					return result;
				};
			}

			function makeRegexParser(regex) {
				return function() {
					var matches = rule.substr(pos).match(regex);
					if(matches === null) {
						return null;
					}
					pos += matches[0].length;
					return matches[0];
				};
			}

			function i() {
				var result = _i_();
				if(result === null) {
					debug(' -- failed i', parseInt(number, 10));
					return result;
				}
				result =
					parseInt(number, 10);
				debug(' -- passed i ', result);
				return result;
			}

			function n() {
				var result = _n_();
				if(result === null) {
					debug(' -- failed n ', number);
					return result;
				}
				result = parseFloat(number, 10);
				debug(' -- passed n ', result);
				return result;
			}

			function f() {
				var result = _f_();
				if(result === null) {
					debug(' -- failed f ', number);
					return result;
				}
				result = (number + '.').split('.')[1] || 0;
				debug(' -- passed f ', result);
				return result;
			}

			function t() {
				var result = _t_();
				if(result === null) {
					debug(' -- failed t ', number);
					return result;
				}
				result = (number + '.').split('.')[1].replace(/0$/, '') || 0;
				debug(' -- passed t ', result);
				return result;
			}

			function v() {
				var result = _v_();
				if(result === null) {
					debug(' -- failed v ', number);
					return result;
				}
				result = (number + '.').split('.')[1].length || 0;
				debug(' -- passed v ', result);
				return result;
			}

			function w() {
				var result = _w_();
				if(result === null) {
					debug(' -- failed w ', number);
					return result;
				}
				result = (number + '.').split('.')[1].replace(/0$/, '').length || 0;
				debug(' -- passed w ', result);
				return result;
			}
			operand = choice([n, i,
				f, t, v, w
			]);
			expression = choice([mod, operand]);

			function mod() {
				var result = sequence([operand, whitespace, choice([_mod_, _percent_]), whitespace, value]);
				if(result === null) {
					debug(' -- failed mod');
					return null;
				}
				debug(' -- passed ' + parseInt(result[0], 10) + ' ' + result[2] + ' ' + parseInt(result[4], 10));
				return parseInt(result[0], 10) % parseInt(result[4], 10);
			}

			function not() {
				var result = sequence([whitespace, _not_]);
				if(result === null) {
					debug(' -- failed not');
					return null;
				}
				return result[1];
			}

			function is() {
				var result = sequence([expression, whitespace, choice([_is_]), whitespace, value]);
				if(result !== null) {
					debug(' -- passed is : ' + result[0] + ' == ' + parseInt(result[4], 10));
					return result[0] === parseInt(result[4], 10);
				}
				debug(' -- failed is');
				return null;
			}

			function isnot() {
				var result = sequence([expression, whitespace, choice([_isnot_, _isnot_sign_]), whitespace, value]);
				if(result !== null) {
					debug(' -- passed isnot: ' + result[0] + ' != ' + parseInt(result[4], 10));
					return result[0] !== parseInt(result[4], 10);
				}
				debug(' -- failed isnot');
				return null;
			}

			function not_in() {
				var i, range_list, result = sequence([expression, whitespace, _isnot_sign_, whitespace, rangeList]);
				if(result !== null) {
					debug(' -- passed not_in: ' + result[0] + ' != ' + result[4]);
					range_list = result[4];
					for(i = 0; i < range_list.length; i++) {
						if(parseInt(range_list[i], 10) === parseInt(result[0], 10)) {
							return false;
						}
					}
					return true;
				}
				debug(' -- failed not_in');
				return null;
			}

			function rangeList() {
				var result = sequence([choice([range, value]), nOrMore(0, rangeTail)]),
					resultList = [];
				if(result !== null) {
					resultList = resultList.concat(result[0]);
					if(result[1][0]) {
						resultList = resultList.concat(result[1][0]);
					}
					return resultList;
				}
				debug(' -- failed rangeList');
				return null;
			}

			function rangeTail() {
				var result = sequence([_comma_, rangeList]);
				if(result !== null) {
					return result[1];
				}
				debug(' -- failed rangeTail');
				return null;
			}

			function range() {
				var i, array, left, right, result = sequence([value, _range_, value]);
				if(result !== null) {
					debug(' -- passed range');
					array = [];
					left = parseInt(result[0], 10);
					right = parseInt(result[2], 10);
					for(i = left; i <= right; i++) {
						array.push(i);
					}
					return array;
				}
				debug(' -- failed range');
				return null;
			}

			function _in() {
				var result, range_list, i;
				result = sequence([expression, nOrMore(0, not), whitespace, choice([_in_, _equal_]), whitespace, rangeList]);
				if(result !== null) {
					debug(' -- passed _in:' + result);
					range_list = result[5];
					for(i = 0; i < range_list.length; i++) {
						if(parseInt(range_list[i], 10) === parseInt(result[0], 10)) {
							return(result[1][0] !== 'not');
						}
					}
					return(result[1][0] === 'not');
				}
				debug(' -- failed _in ');
				return null;
			}

			function within() {
				var range_list, result;
				result = sequence([expression, nOrMore(0, not), whitespace, _within_, whitespace, rangeList]);
				if(result !== null) {
					debug(' -- passed within');
					range_list = result[5];
					if((result[0] >= parseInt(range_list[0], 10)) && (result[0] < parseInt(range_list[range_list.length - 1], 10))) {
						return(result[1][0] !== 'not');
					}
					return(result[1][0] === 'not');
				}
				debug(' -- failed within ');
				return null;
			}
			relation = choice([is, not_in, isnot, _in, within]);

			function and() {
				var i, result = sequence([relation, nOrMore(0, andTail)]);
				if(result) {
					if(!result[0]) {
						return false;
					}
					for(i = 0; i < result[1].length; i++) {
						if(!result[1][i]) {
							return false;
						}
					}
					return true;
				}
				debug(' -- failed and');
				return null;
			}

			function andTail() {
				var result = sequence([whitespace, _and_, whitespace, relation]);
				if(result !== null) {
					debug(' -- passed andTail' + result);
					return result[3];
				}
				debug(' -- failed andTail');
				return null;
			}

			function orTail() {
				var result = sequence([whitespace, _or_, whitespace, and]);
				if(result !== null) {
					debug(' -- passed orTail: ' + result[3]);
					return result[3];
				}
				debug(' -- failed orTail');
				return null;
			}

			function condition() {
				var i, result = sequence([and, nOrMore(0, orTail)]);
				if(result) {
					for(i = 0; i < result[1].length; i++) {
						if(result[1][i]) {
							return true;
						}
					}
					return result[0];
				}
				return false;
			}
			result = condition();
			if(result === null) {
				throw new Error('Parse error at position ' + pos.toString() + ' for rule: ' + rule);
			}
			if(pos !== rule.length) {
				debug('Warning: Rule not parsed completely. Parser stopped at ' + rule.substr(0, pos) + ' for rule: ' + rule);
			}
			return result;
		}
		mw.libs.pluralRuleParser = pluralRuleParser;
		module.exports =
			pluralRuleParser;
	})(mediaWiki);
});
mw.loader.implement("mediawiki.page.startup", function($, jQuery, require, module) {
	(function(mw, $) {
		document.documentElement.className = document.documentElement.className.replace(/(^|\s)client-nojs(\s|$)/, '$1client-js$2');
		mw.page = {};
		$(function() {
			mw.util.init();
			mw.hook('wikipage.content').fire($('#mw-content-text'));
			var $diff = $('table.diff[data-mw="interface"]');
			if($diff.length) {
				mw.hook('wikipage.diff').fire($diff.eq(0));
			}
		});
	}(mediaWiki, jQuery));
});
mw.loader.implement("mediawiki.template.regexp", function($, jQuery, require, module) {
	mediaWiki.template.registerCompiler('regexp', {
		compile: function(src) {
			return {
				render: function() {
					return new RegExp(src.replace(/\s+/g, '').replace(/\?<\w+?>/g, ''));
				}
			};
		}
	});
});
mw.loader.implement("mmv.head", function($, jQuery, require, module) {
	(function(mw) {
		mw.mmv = {
			isBrowserSupported: function() {
				var ns = {
					'svg': 'http://www.w3.org/2000/svg'
				};
				return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
			}
		};
	}(mediaWiki));
	(function(mw, $) {
		var $document = $(document),
			start;
		if(!mw.mmv.isBrowserSupported()) {
			return;
		}
		try {
			if(mw.config.get('wgMediaViewerOnClick') !== true || mw.user.isAnon() && window.localStorage && localStorage.getItem('wgMediaViewerOnClick') === false) {
				return;
			}
		} catch(e) {
			mw.log('Could not check value of wgMediaViewerOnClick in localStorage');
		}
		$document.on('click.mmv-head', 'a.image', function(e) {
			if((e.button !== 0 && e.which !== 1) || e.altKey || e.ctrlKey || e.shiftKey || e.metaKey || e.replayed) {
				return;
			}
			start = $.now();
			$document.ready(function() {
				mw.loader.using(['mmv.bootstrap.autostart'], function() {
					mw.mmv.bootstrap.whenThumbsReady().then(function() {
						mw.mmv.durationLogger.stop('early-click-to-replay-click', start).record('early-click-to-replay-click');
						$(e.target).trigger({
							type: 'click',
							which: 1,
							replayed: !0
						});
					});
				});
			});
			e.preventDefault();
		});
	}(mediaWiki, jQuery));
});
mw.loader.implement("user.defaults", function($, jQuery, require, module) {
	mw.user.options.set({
		"visualeditor-enable": 1,
		"visualeditor-betatempdisable": 0,
		"visualeditor-enable-experimental": 0,
		"visualeditor-enable-language": 0,
		"visualeditor-hidebetawelcome": 0,
		"visualeditor-autodisable": 0,
		"visualeditor-tabs": "remember-last",
		"visualeditor-editor": "wikitext",
		"visualeditor-hidetabdialog": 0,
		"ccmeonemails": 0,
		"cols": 80,
		"date": "default",
		"diffonly": 0,
		"disablemail": 0,
		"editfont": "default",
		"editondblclick": 0,
		"editsectiononrightclick": 0,
		"enotifminoredits": 0,
		"enotifrevealaddr": 0,
		"enotifusertalkpages": 1,
		"enotifwatchlistpages": 1,
		"extendwatchlist": 1,
		"fancysig": 0,
		"forceeditsummary": 0,
		"gender": "unknown",
		"hideminor": 0,
		"hidepatrolled": 0,
		"hidecategorization": 1,
		"imagesize": 2,
		"math": 1,
		"minordefault": 0,
		"newpageshidepatrolled": 0,
		"nickname": "",
		"norollbackdiff": 0,
		"numberheadings": 0,
		"previewonfirst": 0,
		"previewontop": 1,
		"rcdays": 7,
		"rclimit": 50,
		"rows": 25,
		"showhiddencats": 0,
		"shownumberswatching": 1,
		"showtoolbar": 1,
		"skin": "mediawikibootstrap",
		"stubthreshold": 0,
		"thumbsize": 5,
		"underline": 2,
		"uselivepreview": 0,
		"usenewrc": 1,
		"watchcreations": 1,
		"watchdefault": 1,
		"watchdeletion": 0,
		"watchuploads": 1,
		"watchlistdays": 3,
		"watchlisthideanons": 0,
		"watchlisthidebots": 0,
		"watchlisthideliu": 0,
		"watchlisthideminor": 0,
		"watchlisthideown": 0,
		"watchlisthidepatrolled": 0,
		"watchlisthidecategorization": 1,
		"watchlistreloadautomatically": 0,
		"watchmoves": 0,
		"watchrollback": 0,
		"wllimit": 250,
		"useeditwarning": 1,
		"prefershttps": 1,
		"usebetatoolbar": 1,
		"usebetatoolbar-cgd": 1,
		"wikieditor-preview": 0,
		"wikieditor-publish": 0,
		"multimediaviewer-enable": !0,
		"language": "zh-hans",
		"variant-gan": "gan",
		"variant-iu": "iu",
		"variant-kk": "kk",
		"variant-ku": "ku",
		"variant-shi": "shi",
		"variant-sr": "sr",
		"variant-tg": "tg",
		"variant-uz": "uz",
		"variant-zh": "zh",
		"searchNs0": !0,
		"searchNs1": !1,
		"searchNs2": !1,
		"searchNs3": !1,
		"searchNs4": !1,
		"searchNs5": !1,
		"searchNs6": !1,
		"searchNs7": !1,
		"searchNs8": !1,
		"searchNs9": !1,
		"searchNs10": !1,
		"searchNs11": !1,
		"searchNs12": !1,
		"searchNs13": !1,
		"searchNs14": !1,
		"searchNs15": !1,
		"searchNs102": !1,
		"searchNs103": !1,
		"searchNs104": !1,
		"searchNs105": !1,
		"searchNs106": !1,
		"searchNs107": !1,
		"searchNs108": !1,
		"searchNs109": !1,
		"searchNs828": !1,
		"searchNs829": !1,
		"searchNs2300": !1,
		"searchNs2301": !1,
		"searchNs2302": !1,
		"searchNs2303": !1,
		"searchNs3000": !1
	});
});