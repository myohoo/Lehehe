(window.RLQ = window.RLQ || []).push(function() {
				mw.config.set({
					"wgCanonicalNamespace": "",
					"wgCanonicalSpecialPageName": false,
					"wgNamespaceNumber": 0,
					"wgPageName": "首页",
					"wgTitle": "首页",
					"wgCurRevisionId": 59056,
					"wgRevisionId": 59056,
					"wgArticleId": 1,
					"wgIsArticle": true,
					"wgIsRedirect": false,
					"wgAction": "view",
					"wgUserName": null,
					"wgUserGroups": ["*"],
					"wgCategories": [],
					"wgBreakFrames": false,
					"wgPageContentLanguage": "zh-hans",
					"wgPageContentModel": "wikitext",
					"wgSeparatorTransformTable": ["", ""],
					"wgDigitTransformTable": ["", ""],
					"wgDefaultDateFormat": "zh",
					"wgMonthNames": ["", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					"wgMonthNamesShort": ["", "1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
					"wgRelevantPageName": "首页",
					"wgRelevantArticleId": 1,
					"wgRequestId": "5a23042c7670af4b7265b33e",
					"wgIsProbablyEditable": false,
					"wgRestrictionEdit": [],
					"wgRestrictionMove": [],
					"wgIsMainPage": true,
					"wgWikiEditorEnabledModules": {
						"toolbar": true,
						"dialogs": true,
						"preview": false,
						"publish": false
					},
					"wgUserQId": 0,
					"wgMediaViewerOnClick": true,
					"wgMediaViewerEnabledByDefault": true,
					"sfgAutocompleteValues": [],
					"sfgAutocompleteOnAllChars": false,
					"sfgFieldProperties": [],
					"sfgCargoFields": [],
					"sfgDependentFields": [],
					"sfgGridValues": [],
					"sfgGridParams": [],
					"sfgShowOnSelect": [],
					"sfgScriptPath": "/cq/extensions/SemanticForms",
					"edgValues": null,
					"sfgEDSettings": null,
					"wgVisualEditor": {
						"pageLanguageCode": "zh-Hans",
						"pageLanguageDir": "ltr",
						"usePageImages": false,
						"usePageDescriptions": false
					},
					"wgVisualEditorToolbarScrollOffset": 0
				});
				mw.loader.implement("user.options", function($, jQuery, require, module) {
					mw.user.options.set({
						"variant": "zh-hans"
					});
				});
				mw.loader.implement("user.tokens", function($, jQuery, require, module) {
					mw.user.tokens.set({
						"editToken": "+\\",
						"patrolToken": "+\\",
						"watchToken": "+\\",
						"csrfToken": "+\\"
					}); /*@nomin*/ ;

				});
				mw.loader.load(["ext.joymerecentchanges", "ext.smw.style", "mediawiki.page.startup", "mmv.head", "ext.visualEditor.desktopArticleTarget.init"]);
				mw.loader.load("//wikicdn.joyme.com/cq/load.php?debug=false\u0026lang=zh-hans\u0026modules=skins.mediawikibootstrap\u0026only=scripts\u0026skin=mediawikibootstrap");
			});