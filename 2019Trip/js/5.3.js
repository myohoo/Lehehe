/*! quc@5.3.0 2018-11-08T14:09:54+08:00 */ ! function(e) {
	function t(i) {
		if(n[i]) return n[i].exports;
		var o = n[i] = {
			exports: {},
			id: i,
			loaded: !1
		};
		return e[i].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
	}
	var n = {};
	return t.m = e, t.c = n, t.p = "", t(0)
}([function(e, t, n) {
	(function(e) {
		function t() {
			var t = n(141);
			e.isString(t) && $("head").append("<style>" + t + "</style>")
		} /*! DISABLE_QSTATIC_MIN */
		n(85), n(89), n(91), n(92), n(93), n(94), n(95), n(96), n(97), n(98), n(100), n(101), n(102), n(103), n(104), n(105), n(106), n(107), n(108), n(109), n(110), n(111), n(112), n(113), n(114), n(115), n(116), n(117), n(118), n(119), n(120), n(121), n(122), n(123), n(124), n(125), n(126), n(127), n(128), n(129), n(130), n(127), n(128), n(131), n(132), n(133), n(134), n(135), n(136), n(137), n(138), n(139), n(140), t()
	}).call(t, n(1))
}, function(e, t, n) {
	e.exports = n(2)
}, function(e, t, n) {
	(function(t) {
		function t(e) {
			return this instanceof t ? (this.__value = e, void(this.__chain = !1)) : new t(e)
		}
		var i = n(3);
		e.exports = i.extend(t, i), n(5)(t), n(6)(t), n(7)(t), n(8)(t), n(9)(t), n(11)(t), n(12)(t), t.mixin(t, t)
	}).call(t, n(1))
}, function(e, t, n) {
	function i(e) {
		if(null != e) return e.length
	}

	function o(e, t) {
		var n = i(e);
		if(n && f.fn(t))
			for(var o = 0; o < n && !1 !== t(e[o], o, e); o++);
		return e
	}

	function r(e, t) {
		var n = -1;
		return o(e, function(e, i, o) {
			if(t(e, i, o)) return n = i, !1
		}), n
	}

	function a(e) {
		var t = [];
		return o(e, function(e) {
			t.push(e)
		}), t
	}

	function c(e) {
		if(e) {
			var t = h.call(arguments, 1);
			o(t, function(t) {
				p(t, function(t, n) {
					f.undef(t) || (e[n] = t)
				})
			})
		}
		return e
	}

	function s(e) {
		return function() {
			return !e.apply(this, arguments)
		}
	}

	function u(e, t) {
		return f.string(e) ? e.indexOf(t) : r(e, function(e) {
			return t === e
		})
	}

	function l(e, t, n) {
		return o(e, function(i, o) {
			n = t(n, i, o, e)
		}), n
	}

	function p(e, t) {
		if(e)
			for(var n in e)
				if(f.owns(e, n) && !1 === t(e[n], n, e)) break;
		return e
	}

	function d(e) {
		var t = [];
		return p(e, function(e, n) {
			t.push(n)
		}), t
	}
	var f = n(4),
		h = [].slice,
		m = t;
	m.is = f, m.extend = m.assign = c, m.each = o, m.map = function(e, t) {
		var n = [];
		return o(e, function(e, i, o) {
			n[i] = t(e, i, o)
		}), n
	}, m.filter = function(e, t) {
		var n = [];
		return o(e, function(e, i, o) {
			var r = t(e, i, o);
			r && n.push(e)
		}), n
	}, m.some = function(e, t) {
		return -1 != r(e, t)
	}, m.every = function(e, t) {
		return -1 == r(e, s(t))
	}, m.reduce = l, m.findIndex = r, m.find = function(e, t) {
		var n = m.findIndex(e, t);
		if(-1 != n) return e[n]
	}, m.indexOf = u, m.includes = function(e, t) {
		return -1 != u(e, t)
	}, m.toArray = a, m.slice = function(e, t, n) {
		var o = [],
			r = i(e);
		return r >= 0 && (t = t || 0, 0 !== n && (n = n || r), f.fn(e.slice) || (e = a(e)), o = e.slice(t, n)), o
	}, m.negate = s, m.forIn = p, m.keys = d;
	var g = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
	m.trim = function(e) {
		return null == e ? "" : ("" + e).replace(g, "")
	}, m.noop = function() {}, m.len = i
}, function(e, t) {
	(function(e) {
		function n(e) {
			var t = a.toString.call(e);
			return t.substring(8, t.length - 1).toLowerCase()
		}

		function i(e) {
			return typeof e
		}

		function o(e, t) {
			return a.hasOwnProperty.call(e, t)
		}
		var r = t,
			a = Object.prototype;
		e = e || {};
		var c = e.navigator;
		r.browser = function() {
			return !(r.wechatApp() || !c || e.window != e)
		}, r.h5 = function() {
			return !(!r.browser() || !c.geolocation)
		}, r.mobile = function() {
			return !(!r.browser() || !/mobile/i.test(c.userAgent))
		}, r.wechatApp = function() {
			return !("object" != typeof wx || !wx || !r.fn(wx.createVideoContext))
		}, r._class = n, r._type = i, r.owns = o, r.nan = function(e) {
			return e !== e
		}, r.bool = function(e) {
			return "boolean" == n(e)
		}, r.infinite = function(e) {
			return e == 1 / 0 || e == -(1 / 0)
		}, r.number = function(e) {
			return !isNaN(e) && "number" == n(e)
		}, r.iod = function(e) {
			return !(!r.number(e) || r.infinite(e))
		}, r.decimal = function(e) {
			return !!r.iod(e) && 0 != e % 1
		}, r.integer = function(e) {
			return !!r.iod(e) && 0 == e % 1
		}, r.oof = function(e) {
			if(e) {
				var t = i(e);
				return "object" == t || "function" == t
			}
			return !1
		}, r.object = function(e) {
			return r.oof(e) && "function" != n(e)
		}, r.hash = r.plainObject = function(e) {
			return !(!e || "object" != n(e)) && (!e.nodeType && !e.setInterval)
		}, r.undef = function(e) {
			return "undefined" == i(e)
		}, r.fn = function(e) {
			return "function" == n(e)
		}, r.string = function(e) {
			return "string" == n(e)
		}, r.nos = function(e) {
			return r.iod(e) || r.string(e)
		}, r.array = function(e) {
			return "array" == n(e)
		}, r.arraylike = function(e) {
			if(!r.window(e) && r.object(e)) {
				var t = e.length;
				if(r.integer(t) && t >= 0) return !0
			}
			return !1
		}, r.window = function(e) {
			return !(!e || e.window != e)
		}, r.empty = function(e) {
			if(r.string(e) || r.arraylike(e)) return 0 === e.length;
			if(r.hash(e))
				for(var t in e)
					if(o(e, t)) return !1;
			return !0
		}, r.element = function(e) {
			return !(!e || 1 !== e.nodeType)
		}, r.regexp = function(e) {
			return "regexp" == n(e)
		}
	}).call(t, function() {
		return this
	}())
}, function(e, t) {
	e.exports = function(e) {
		var t = e.is;
		e.isString = t.string, e.isArray = t.array, e.isArrayLike = t.arraylike, e.isBoolean = t.bool, e.isElement = t.element, e.isEmpty = t.empty, e.isFunction = t.fn, e.isInteger = t.integer, e.isNaN = t.nan, e.isNumber = t.number, e.isObject = t.object, e.isPlainObject = t.plainObject, e.isRegExp = t.regexp, e.isString = t.string, e.isUndefined = t.undef
	}
}, function(e, t) {
	e.exports = function(e) {
		var t = e.is;
		e.now = function() {
			return +new Date
		}, e.constant = function(e) {
			return function() {
				return e
			}
		}, e.identity = function(e) {
			return e
		}, e.random = function(e, t) {
			return e + Math.floor(Math.random() * (t - e + 1))
		}, e.mixin = function(n, i, o) {
			var r = e.functions(i);
			if(n)
				if(t.fn(n)) {
					o = o || {};
					var a = n.prototype;
					e.each(r, function(e) {
						var t = i[e];
						a[e] = function() {
							var e = this,
								n = [e.__value];
							n.push.apply(n, arguments);
							var i = t.apply(e, n);
							return e.__chain ? (e.__value = i, e) : i
						}
					})
				} else e.each(r, function(e) {
					n[e] = i[e]
				});
			return n
		}, e.chain = function(t) {
			var n = e(t);
			return n.__chain = !0, n
		}, e.value = function() {
			return this.__chain = !1, this.__value
		}
	}
}, function(e, t) {
	e.exports = function(e) {
		function t(t, n) {
			var i = e.size(n);
			return t < 0 && (t += i), t < 0 && (t = 0), t > i && (t = i), t || 0
		}

		function n(t, n) {
			var i = [],
				o = e.len(n);
			if(o)
				for(n = n.sort(function(e, t) {
						return e - t
					}); o--;) {
					var r = n[o];
					i.push(a.splice.call(t, r, 1)[0])
				}
			return i.reverse(), i
		}
		var i = e.forEach = e.each,
			o = e.includes,
			r = e.is,
			a = Array.prototype;
		e.reject = function(t, n) {
			return e.filter(t, function(e, t, i) {
				return !n(e, t, i)
			})
		}, e.without = function(t) {
			var n = e.slice(arguments, 1);
			return e.difference(t, n)
		}, e.difference = function(t, n) {
			var i = [];
			return e.each(t, function(e) {
				o(n, e) || i.push(e)
			}), i
		}, e.pluck = function(t, n) {
			return e.map(t, function(e) {
				if(e) return e[n]
			})
		}, e.nth = function(n, i) {
			i = t(i, n), i = i || 0;
			var o;
			return o = e.isString(n) ? n.charAt(i) : n[i]
		}, e.first = function(t) {
			if(t) return e.nth(t, 0)
		}, e.last = function(t) {
			var n = e.len(t);
			if(n) return e.nth(t, n - 1)
		}, e.asyncMap = function(e, t, n) {
			var o, r, a = [],
				c = 0;
			i(e, function(i, s) {
				r = !0, t(i, function(t, i) {
					if(!o) {
						if(c++, t) return o = !0, n(t);
						a[s] = i, c == e.length && (o = !0, n(null, a))
					}
				})
			}), r || n(null)
		}, e.uniq = function(t) {
			return e.uniqBy(t)
		}, e.uniqBy = function(e, t) {
			var n = [],
				a = [];
			return r.fn(t) || (t = null), i(e, function(e) {
				var i = e;
				t && (i = t(e)), o(a, i) || (a.push(i), n.push(e))
			}), n
		}, e.flatten = function(e) {
			var t = [];
			return i(e, function(e) {
				r.arraylike(e) ? i(e, function(e) {
					t.push(e)
				}) : t.push(e)
			}), t
		}, e.union = function() {
			return e.uniq(e.flatten(arguments))
		}, e.sampleSize = function(t, n) {
			for(var i = e.toArray(t), o = i.length, r = Math.min(n || 1, o), a = 0; a < o; a++) {
				var c = e.random(a, o - 1),
					s = i[c];
				i[c] = i[a], i[a] = s
			}
			return i.length = r, i
		}, e.sample = function(t) {
			return e.first(e.sampleSize(t, 1))
		}, e.shuffle = function(t) {
			return e.sampleSize(t, 1 / 0)
		}, e.compact = function(t) {
			return e.filter(t, e.identity)
		}, e.rest = function(t) {
			return e.slice(t, 1)
		}, e.invoke = function() {
			var t = arguments,
				n = t[0],
				i = t[1],
				o = r.fn(i);
			return t = e.slice(t, 2), e.map(n, function(e) {
				if(o) return i.apply(e, t);
				if(null != e) {
					var n = e[i];
					if(r.fn(n)) return n.apply(e, t)
				}
			})
		}, e.partition = function(t, n) {
			var i = e.groupBy(t, function(e, t, i) {
				var o = n(e, t, i);
				return o ? 1 : 2
			});
			return [i[1] || [], i[2] || []]
		}, e.groupBy = function(t, n) {
			var i = {};
			return e.each(t, function(e, t, o) {
				var r = n(e, t, o);
				i[r] = i[r] || [], i[r].push(e)
			}), i
		}, e.range = function() {
			var t = arguments;
			if(t.length < 2) return e.range(t[1], t[0]);
			var n = t[0] || 0,
				i = t[1] || 0,
				o = t[2];
			r.number(o) || (o = 1);
			var a = i - n;
			0 != o && (a /= o);
			for(var c = [], s = n, u = 0; u < a; u++) c.push(s), s += o;
			return c
		}, e.pullAt = function(t) {
			var i = e.slice(arguments, 1);
			return n(t, i)
		}, e.remove = function(t, i) {
			for(var o = e.len(t) || 0, r = []; o--;) i(t[o], o, t) && r.push(o);
			return n(t, r)
		}, e.fill = function(n, i, o, r) {
			var a = e.size(n);
			o = t(o, n) || 0, r = t(r, n) || a;
			for(var c = o; c < r; c++) n[c] = i;
			return n
		}, e.size = function(t) {
			var n = 0;
			if(t) {
				var i = t.length;
				e.isInteger(i) && i >= 0 ? n = i : e.isObject(t) && (n = e.keys(t).length)
			}
			return n
		}
	}
}, function(e, t) {
	e.exports = function(e) {
		function t(t) {
			if(n.array(t)) return t;
			var i = [];
			return e.toString(t).replace(o, function(e, t, n, o) {
				var a = t || e;
				n && (a = o.replace(r, "$1")), i.push(a)
			}), i
		}
		var n = e.is,
			i = e.forIn;
		e.only = function(t, i) {
			return t = t || {}, n.string(i) && (i = i.split(/ +/)), e.reduce(i, function(e, n) {
				return null != t[n] && (e[n] = t[n]), e
			}, {})
		}, e.values = function(t) {
			return e.map(e.keys(t), function(e) {
				return t[e]
			})
		}, e.pick = function(t, o) {
			if(!n.fn(o)) return e.pick(t, function(e, t) {
				return t == o
			});
			var r = {};
			return i(t, function(e, t, n) {
				o(e, t, n) && (r[t] = e)
			}), r
		}, e.functions = function(t) {
			return e.keys(e.pick(t, function(e) {
				return n.fn(e)
			}))
		}, e.mapKeys = function(e, t) {
			var n = {};
			return i(e, function(e, i, o) {
				var r = t(e, i, o);
				n[r] = e
			}), n
		}, e.mapObject = e.mapValues = function(e, t) {
			var n = {};
			return i(e, function(e, i, o) {
				n[i] = t(e, i, o)
			}), n
		}, e.get = function(n, i) {
			if(i = t(i), i.length) {
				var o = e.every(i, function(e) {
					if(null != n) return n = n[e], !0
				});
				if(o) return n
			}
		}, e.has = function(i, o) {
			if(o = t(o), o.length) {
				var r = e.every(o, function(e) {
					if(null != i && n.owns(i, e)) return i = i[e], !0
				});
				if(r) return !0
			}
			return !1
		}, e.set = function(i, o, r) {
			o = t(o);
			var a = i;
			return e.every(o, function(e, t) {
				if(n.oof(a)) {
					if(t + 1 != o.length) {
						var i = a[e];
						if(null == i) {
							var i = {};
							~~e == e && (i = [])
						}
						return a = a[e] = i, !0
					}
					a[e] = r
				}
			}), i
		}, e.create = function() {
			function t() {}
			return function(n, i) {
				return "object" != typeof n && (n = null), t.prototype = n, e.extend(new t, i)
			}
		}(), e.defaults = function() {
			var t = arguments,
				i = t[0],
				o = e.slice(t, 1);
			return i && e.each(o, function(t) {
				e.mapObject(t, function(e, t) {
					n.undef(i[t]) && (i[t] = e)
				})
			}), i
		}, e.isMatch = function(e, t) {
			var n = !0;
			return e = e || {}, i(t, function(t, i) {
				if(t !== e[i]) return n = !1, !1
			}), n
		}, e.toPlainObject = function(e) {
			var t = {};
			return i(e, function(e, n) {
				t[n] = e
			}), t
		}, e.invert = function(e) {
			var t = {};
			return i(e, function(e, n) {
				t[e] = n
			}), t
		};
		var o = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,
			r = /\\(\\)?/g
	}
}, function(e, t, n) {
	e.exports = function(e) {
		function t(e) {
			function n() {
				var t = arguments,
					n = t[0];
				if(!i.has(n)) {
					var o = e.apply(this, t);
					i.set(n, o)
				}
				return i.get(n)
			}
			var i = new t.Cache;
			return n.cache = i, n
		}
		var i = e.is,
			o = e.slice;
		e.bind = function(t, n) {
			if(i.string(n)) {
				var r = t;
				t = r[n], n = r
			}
			if(!i.fn(t)) return t;
			var a = o(arguments, 2);
			return n = n || this,
				function() {
					return t.apply(n, e.flatten([a, arguments]))
				}
		}, e.inherits = function(t, n) {
			t.super_ = n, t.prototype = e.create(n.prototype, {
				constructor: t
			})
		}, e.delay = function(t, n) {
			var i = e.slice(arguments, 2);
			return setTimeout(function() {
				t.apply(this, i)
			}, n)
		}, e.before = function(e, t) {
			return function() {
				if(e > 1) return e--, t.apply(this, arguments)
			}
		}, e.once = function(t) {
			return e.before(2, t)
		}, e.after = function(e, t) {
			return function() {
				return e > 1 ? void e-- : t.apply(this, arguments)
			}
		}, e.throttle = function(t, n, i) {
			return n = n || 0, i = e.extend({
				leading: !0,
				trailing: !0,
				maxWait: n
			}, i), e.debounce(t, n, i)
		}, e.debounce = function(t, n, i) {
			function o() {
				return !(d - l > n) && !(u && d - p > u)
			}

			function r(t, n, i) {
				return l = e.now(), t.apply(n, i)
			}

			function a() {
				s && (clearTimeout(s), s = null)
			}

			function c() {
				d = e.now();
				var c = o();
				p = d;
				var u = this,
					l = arguments;
				a(), c ? i.trailing && (s = e.delay(function() {
					r(t, u, l)
				}, n)) : r(t, u, l)
			}
			n = n || 0, i = e.extend({
				leading: !1,
				trailing: !0
			}, i);
			var s, u = i.maxWait,
				l = 0,
				p = 0,
				d = e.now();
			return i.leading || (l = d), c.cancel = a, c
		}, t.Cache = n(10), e.memoize = t, e.wrap = function(e, t) {
			return function() {
				var n = [e];
				return n.push.apply(n, arguments), t.apply(this, n)
			}
		}, e.curry = function(t) {
			function n(o) {
				return function() {
					var r = o.concat(e.slice(arguments));
					return r.length >= i ? (r.length = i, t.apply(this, r)) : n(r)
				}
			}
			var i = t.length;
			return n([])
		}
	}
}, function(e, t, n) {
	function i() {
		this.data = {}
	}
	var o = n(3),
		r = o.is;
	e.exports = i;
	var a = i.prototype;
	a.has = function(e) {
		return r.owns(this.data, e)
	}, a.get = function(e) {
		return this.data[e]
	}, a.set = function(e, t) {
		this.data[e] = t
	}, a["delete"] = function(e) {
		delete this.data[e]
	}
}, function(e, t) {
	e.exports = function(e) {
		function t(t, i) {
			t = n(t) || " ";
			var o = Math.floor(i / t.length) + 1;
			return e.repeat(t, o).slice(0, i)
		}

		function n(e) {
			return e || 0 == e ? e + "" : ""
		}
		e.tostr = e.toString = n;
		var i = e.indexOf;
		e.split = function(e, t, i) {
			return e = n(e), e.split(t, i)
		}, e.capitalize = function(e) {
			return e = n(e), e.charAt(0).toUpperCase() + e.substr(1)
		}, e.decapitalize = function(e) {
			return e = n(e), e.charAt(0).toLowerCase() + e.substr(1)
		}, e.camelCase = function(t) {
			t = n(t);
			var i = t.split(/[^\w]|_+/);
			return i = e.map(i, function(t) {
				return e.capitalize(t)
			}), e.decapitalize(i.join(""))
		}, e.startsWith = function(e, t) {
			return 0 == i(e, t)
		}, e.endsWith = function(t, n) {
			return n += "", n == e.slice(t, e.len(t) - e.len(n))
		}, e.toLower = e.lower = function(e) {
			return n(e).toLowerCase()
		}, e.toUpper = e.upper = function(e) {
			return n(e).toUpperCase()
		}, e.repeat = function(t, n) {
			return e.map(e.range(n), function() {
				return t
			}).join("")
		}, e.padStart = function(e, i, o) {
			e = n(e), i = i || 0;
			var r = i - e.length;
			return t(o, r) + e
		}, e.padEnd = function(e, i, o) {
			e = n(e), i = i || 0;
			var r = i - e.length;
			return e + t(o, r)
		};
		var o = {
			"&": "&amp",
			"<": "&lt",
			">": "&gt",
			'"': "&quot",
			"'": "&#39"
		};
		e.escape = function(e) {
			return n(e).replace(/[&<>"']/g, function(e) {
				return o[e] || e
			})
		}, e.template = function(t) {
			function n(t) {
				var n = e.first(t);
				if("=" === n || "-" === n) {
					var i = e.slice(t, 1);
					"-" === n && (i = "_.escape(" + i + ")"), o.push("ret += " + i)
				} else o.push(t)
			}

			function i(e) {
				o.push('ret += "' + e.replace(/('|"|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + '"')
			}
			var o = ['with(data) {var ret = ""'];
			e.each(e.split(t, "<%"), function(t, o) {
				var r = t.split("%>");
				return r[1] ? (n(e.trim(r[0])), i(r[1])) : void i(r[0])
			}), o.push("return ret}");
			var r = new Function("data", o.join("\n")),
				a = {
					_: e
				},
				c = function(t) {
					return r(e.extend({}, a, t))
				};
			return c
		}
	}
}, function(e, t) {
	e.exports = function(e) {
		e.sum = function(t) {
			return e.reduce(t, function(e, t) {
				return e + t
			}, 0)
		}, e.max = function(t, n) {
			var i = -1,
				o = -(1 / 0);
			return n = n || e.identity, e.each(t, function(e, t) {
				e = n(e), e > o && (o = e, i = t)
			}), i > -1 ? t[i] : o
		}, e.min = function(t, n) {
			var i = -1,
				o = 1 / 0;
			return n = n || e.identity, e.each(t, function(e, t) {
				e = n(e), e < o && (o = e, i = t)
			}), i > -1 ? t[i] : o
		}
	}
}, function(e, t, n) {
	var i = n(14);
	e.exports = t = i.getLogger()
}, function(e, t, n) {
	function i(e) {
		var t = this;
		a.string(e) && (e = {
			name: e
		}), e = e || {};
		var n = e.name || "default";
		t.name = n, t.Level = c, t.sdk = p, t.enabled = p.isNameEnabled(n), t.color = e.color || t.sdk.getRandomColor(n), t.util = u, t._ = r, t.qs = l
	}

	function o(e) {
		var t = p.loggers,
			n = t[e];
		return n || (n = t[e] = new i(e)), n
	}
	var r = n(1),
		a = r.is,
		c = n(15),
		s = n(16),
		u = n(24),
		l = n(25),
		p = new s;
	e.exports = t = i;
	var d = r.map(r.keys(c), function(e) {
			return r.lower(e)
		}),
		f = i.prototype;
	f.getLogger = i.getLogger = o, f.output = function(e, t) {
		var n = this,
			i = {
				level: e,
				name: n.name,
				enabled: n.enabled,
				timestamp: r.now(),
				data: t,
				color: n.color,
				done: !1
			};
		p.output(i)
	}, r.each(d, function(e) {
		var t = c.toCode(e);
		f[e] = function() {
			this.output(t, arguments)
		};
		var n = "is" + r.capitalize(e) + "Enabled";
		f[n] = function() {
			return this.sdk.isLevelEnabled(t)
		}
	});
	var h = "setOptions setOutputer setName setLevel setHistorySize getHistory disableHistory clear save setColors".split(" ");
	r.each(h, function(e) {
		f[e] = function() {
			return this.sdk[e].apply(this.sdk, arguments)
		}
	}), f.getLevelFunction = function(e) {
		var t = this,
			n = c.toCode(e) || c.DEBUG;
		return function() {
			t.output(n, arguments)
		}
	}
}, function(e, t, n) {
	var i = n(1),
		o = "verbose debug log info warn error fatal off".split(" ");
	i.each(o, function(e, n) {
		t[i.upper(e)] = n + 1
	}), t.toCode = function(e) {
		return t[i.upper(e)] || e
	}, t.toName = function(e) {
		return i.find(o, function(n) {
			return t[i.upper(n)] === e
		})
	}
}, function(e, t, n) {
	function i() {
		var e = this;
		e.history = [], e.pendingItems = [], e.Level = r, e.loggers = {}, e.level = null, e.prefix = "", e.pattern = {}, e.lastItem = null, e.outputers = a, e.colorMap = {}, e.colors = "lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson".split(" "), e.colorIndex = 0, e.historySize = 3e3, e.setOutputer(u.noop), e.autoInit()
	}

	function o(e) {
		var t = [],
			n = [];
		return e && l.string(e) && u.each(e.split(/[\s,]+/), function(e) {
			e = e.replace(/\*/g, ".*?");
			var i = e.charAt(0);
			"-" === i ? t.push(new RegExp("^" + u.slice(e, 1) + "$")) : n.push(new RegExp("^" + e + "$"))
		}), {
			skips: t,
			names: n
		}
	}
	var r = n(15),
		a = n(17),
		c = n(19),
		s = n(24),
		u = n(1),
		l = u.is;
	e.exports = i;
	var p = i.prototype;
	p.autoInit = function() {
		var e = this,
			t = e.getDefaultOptions(),
			n = e.getUserOptions(),
			i = u.extend({}, t, n);
		e.setOptions(i)
	}, p.setOptions = function(e) {
		var t = this;
		t.setName(e.name), t.setLevel(e.level), t.setOutputer(e.outputer)
	}, p.getDefaultOptions = function() {
		var e = this,
			t = {
				level: r.INFO,
				outputer: e.autoChooseOutputer(),
				name: "*"
			};
		return t
	}, p.getUserOptions = function() {
		var e = s.getUserOptions("log_name log_level log_outputer".split(" "));
		return {
			name: e.log_name,
			level: e.log_level,
			outputer: e.log_outputer
		}
	}, p.autoChooseOutputer = function() {
		var e = u.noop;
		return c.hasConsole() && (e = s.supportBrowserColor() ? "browser_console" : "node_console"), e
	}, p.setOutputer = function(e) {
		var t = this,
			n = null;
		l.string(e) ? n = t.outputers[e] : l.fn(e) && (n = {
			handler: e
		}), n && (t.outputer = n, l.fn(n.init) && n.init(t), l.fn(n.ready) && n.ready(function() {
			u.each(t.pendingItems, function(e) {
				e.done === !1 && (n.handler(e), e.done = !0)
			}), t.pendingItems.length = 0
		}))
	}, p.output = function(e) {
		var t = this;
		if(e.enabled && t.isLevelEnabled(e.level)) {
			var n = t.outputer;
			n.isReady === !1 ? t.pendingItems.push(e) : (n.handler(e, t), e.done = !0), t.lastItem = e
		}
		t.appendHistory(e)
	}, p.setPrefix = function(e) {
		var t = this;
		t.prefix = e
	}, p.isLevelEnabled = function(e) {
		var t = this;
		return e >= t.level
	}, p.getRandomColor = function(e) {
		var t = this,
			n = t.colorMap[e];
		if(!n) {
			var i = t.colors;
			n = t.colorMap[e] = i[t.colorIndex++ % i.length]
		}
		return n
	}, p.setName = function(e) {
		return this.setNamePattern(e)
	}, p.setColors = function(e) {
		this.colors = e
	}, p.setNamePattern = function(e) {
		var t = this;
		t.pattern = o(e), u.forIn(t.loggers, function(e) {
			e.enabled = t.isNameEnabled(e.name)
		})
	}, p.isNameEnabled = function(e) {
		function t(t) {
			return t.test(e)
		}
		var n = this,
			i = n.pattern;
		return !u.some(i.skips, t) && !!u.some(i.names, t)
	}, p.setLevel = function(e) {
		this.level = r.toCode(e)
	}, p.appendHistory = function(e) {
		var t = this;
		t.history.push(e), t.history.length > t.historySize && t.history.shift()
	}, p.setHistorySize = function(e) {
		this.historySize = e
	}, p.getHistory = function() {
		return this.history
	}, p.disableHistory = function() {
		this.setHistorySize(0)
	}, p.clear = function() {
		this.history.length = 0
	}, p.save = function() {
		var e = this;
		return u.map(e.history, function(e) {
			return u.map(e.data, function(e) {
				var t = s.safeStringify(e);
				return t
			}).join(" ")
		}).join("\r\n")
	}
}, function(e, t, n) {
	t.console = n(18), t.browser_console = n(20), t.node_console = n(21), t.file = n(22), t.browser_html = n(23), t.vconsole = n(26), t.eruda = n(28)
}, function(e, t, n) {
	var i = n(15),
		o = n(19);
	t.handler = function(e) {
		var t = e.level;
		t < i.DEBUG ? t = i.DEBUG : t > i.ERROR && (t = i.ERROR);
		var n = i.toName(t);
		o.console(n, e.data)
	}
}, function(e, t) {
	(function(e) {
		t.getConsole = function() {
			if("undefined" != typeof e) return e.console
		};
		var n = t.globalConsole = t.getConsole();
		t.hasConsole = function() {
			return !!t.globalConsole
		}, t.console = function(e, t) {
			var i = Function.prototype.apply || n[e].apply;
			i.call(n[e], n, t)
		}
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	var i = n(1),
		o = n(19),
		r = "color:inherit";
	t.handler = function(e, t) {
		var n = t.lastItem || {},
			a = n.timestamp || e.timestamp,
			c = e.timestamp - a,
			s = "color:" + e.color,
			u = t.prefix + e.name,
			l = "%c" + u + "%c",
			p = [null, s, r];
		i.each(e.data, function(e) {
			p.push(e), l += " %o"
		}), p.push(s), l += "%c +" + c + "ms", p[0] = l, o.console("log", p)
	}
}, function(e, t, n) {
	var i = n(19);
	t.handler = function(e) {
		i.console("log", e.data)
	}
}, function(e, t) {}, function(e, t, n) {
	(function(t) {
		function i() {
			this.inited = !1, this.box = null
		}
		var o = n(1),
			r = n(24),
			a = i.prototype;
		a.init = function(e) {
			if(!this.inited) {
				this.inited = !0;
				var n = t.document;
				if(n) {
					this.box = n.createElement("div"), this.box.style.cssText = 'z-index:999;padding:16px;height:300px;overflow:auto;line-height:1.4;background:#242424;color:#fff;font-size:16px; font-family: monospace,consolas,"Hiragino Sans GB","Microsoft YaHei","\u5fae\u8f6f\u96c5\u9ed1",Arial,sans-serif;border:none;text-align:left';
					var i = n.body || n.documentElement;
					i.insertBefore(this.box, i.firstChild)
				}
			}
		}, a.handler = function(e, n) {
			if(t.document) {
				var i = n.lastItem || {},
					a = i.timestamp || e.timestamp,
					c = e.timestamp - a,
					s = n.prefix + e.name,
					u = [s];
				o.each(e.data, function(e) {
					u.push(r.safeStringify(e))
				}), u.push("+" + c + "ms");
				var l = document.createElement("div");
				r.text(l, u.join(" ")), l.style.color = e.color, this.box.appendChild(l)
			}
		}, e.exports = new i
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	(function(e) {
		function i() {
			return !(!p.browser() || !/Trident/i.test(navigator.userAgent))
		}

		function o(e, t) {
			var n = !1,
				i = l.now();
			e = e.replace("__now__", i);
			var o = document.createElement("script");
			o.onload = o.onreadystatechange = function() {
				n || "complete" !== this.readyState && this.readyState || (n = !0, t())
			}, o.type = "text/javascript", o.src = e, o.async = 1;
			var r = document.getElementsByTagName("script")[0];
			r.parentNode.insertBefore(o, r)
		}

		function r() {
			return !!p.wechatApp() || !i() && !!p.browser()
		}

		function a(e, t) {
			var n = "textContent";
			p.owns(e, n) || (n = "innerText"), e[n] = t
		}

		function c(e) {
			try {
				e = JSON.stringify(e, 0, 4)
			} catch(t) {
				e += ""
			}
			return e
		}

		function s(t) {
			var n = [];
			if(e.location) {
				var i = d.parse(l.slice(location.search, 1));
				n.push(i)
			}
			try {
				e.localStorage && n.push(localStorage)
			} catch(o) {}
			var r = l.get(e, ["process", "env"]);
			r && n.push(r);
			var a = l.find(n, function(e) {
				var n;
				try {
					n = u(e, t)
				} catch(i) {
					n = null
				}
				if(n) return n
			});
			return a || {}
		}

		function u(e, t) {
			var n = {},
				i = !1;
			if(l.each(t, function(t) {
					p.owns(e, t) && (i = !0, n[t] = e[t])
				}), i) return n
		}
		var l = n(1),
			p = l.is,
			d = n(25);
		t.isIE = i, t.supportBrowserColor = r, t.safeStringify = c, t.text = a, t.getUserOptions = s, t.loadScript = o
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	function i(e, t, n) {
		return n = o.find(arguments, function(e) {
			return r.object(e)
		}), e = r.nos(e) ? e : void 0, t = r.nos(t) ? t : void 0, n = o.extend({}, a, n, {
			sep: e,
			eq: t
		})
	}
	var o = n(1),
		r = o.is,
		a = {
			sep: "&",
			eq: "=",
			encode: encodeURIComponent,
			decode: decodeURIComponent,
			keepRaw: !1,
			sort: null,
			ignoreValues: [void 0]
		};
	t.parse = function(e, t, n, r) {
		e += "", r = i(t, n, r);
		var a = r.decode;
		return e = e.split(r.sep), o.reduce(e, function(e, t) {
			if(t = t.split(r.eq), 2 == t.length) {
				var n = t[0],
					i = t[1];
				if(!r.keepRaw) try {
					n = a(n), i = a(i)
				} catch(o) {}
				e[n] = i
			}
			return e
		}, {})
	}, t.stringify = function(e, t, n, a) {
		a = i(t, n, a);
		var c = o.keys(e),
			s = a.sort;
		s && (r.fn(s) ? c.sort(s) : c.sort());
		var u = a.encode,
			l = [];
		return o.each(c, function(t) {
			var n = e[t];
			o.includes(a.ignoreValues, n) || ((r.nan(n) || null == n) && (n = ""), a.keepRaw || (t = u(t), n = u(n)), l.push(t + a.eq + n))
		}), l.join(a.sep)
	}
}, function(e, t, n) {
	function i() {
		this.inited = !1, this.isReady = !1
	}
	var o = n(18),
		r = n(24),
		a = n(27)(),
		c = i.prototype;
	c.init = function() {
		var e = this;
		if(!e.inited) {
			e.inited = !0;
			var t = "//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js";
			r.loadScript(t, function() {
				e.run(), window.addEventListener("load", function() {
					e.run()
				})
			})
		}
	}, c.ready = function(e) {
		a.queue(e)
	}, c.run = function() {
		try {
			vConsole.show(), this.isReady = !0, a.open()
		} catch(e) {}
	}, c.handler = o.handler, e.exports = new i
}, function(e, t, n) {
	(function(t) {
		function i(e) {
			var t = this;
			return t instanceof i ? (t.queueList = e || [], void t.close()) : new i(e)
		}
		var o = n(1),
			r = o.is;
		e.exports = i;
		var a = i.prototype;
		a.queue = function() {
			var e = this,
				t = arguments;
			e.isOpen ? e.exec(t) : e.queueList.push(t)
		}, a.close = function() {
			this.isOpen = !1
		}, a.open = function() {
			this.isOpen = !0, this.execAll()
		}, a.execAll = function() {
			var e = this,
				t = e.queueList;
			o.each(t, function(t) {
				e.exec(t)
			}), t.length = 0
		}, a.exec = function(e) {
			var t, n = o.first(e),
				i = this.ctx;
			if(t = r.fn(n) ? n : o.get(i, n), r.fn(t)) try {
				t.apply(i, o.slice(e, 1))
			} catch(a) {}
		}, a.overwriteQueue = function(e) {
			var n = this;
			t[e] = function() {
				n.queue.apply(n, arguments)
			}
		}
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	function i() {
		this.inited = !1, this.isReady = !1
	}
	var o = n(18),
		r = n(24),
		a = n(27)(),
		c = i.prototype;
	c.init = function() {
		var e = this;
		if(!e.inited) {
			e.inited = !0;
			var t = "//cdn.jsdelivr.net/npm/eruda";
			r.loadScript(t, function() {
				try {
					e.run()
				} catch(t) {}
			})
		}
	}, c.ready = function(e) {
		a.queue(e)
	}, c.run = function() {
		try {
			eruda.init(), this.isReady = !0, a.open()
		} catch(e) {}
	}, c.handler = o.handler, e.exports = new i
}, function(e, t, n) {
	function i(e, t) {
		var n = "";
		return e = e.replace(t, function(e) {
			return n = e, ""
		}), [n, e]
	}

	function o(e, t) {
		var n = [],
			i = c.indexOf(e, t);
		return -1 == i ? n[0] = e : (n[0] = e.slice(0, i), n[1] = e.slice(i + t.length)), n
	}

	function r(e) {
		var t = o(e, "@"),
			n = t[0],
			i = t[1];
		return i || (i = t[0], n = null), [n, i]
	}
	var a = n(25),
		c = n(1);
	t.parse = function(e, t) {
		if("string" != typeof e) return e;
		var n, s, u = {};
		u.href = e, n = o(e, "#"), s = n[0], n[1] && (u.hash = "#" + n[1]), n = i(s, /^[a-zA-Z][a-zA-Z0-9+-.]*:/), s = n[1], u.protocol = n[0].toLowerCase(), n = o(s, "?"), s = n[0];
		var l = n[1];
		if(t && (l = a.parse(l)), u.query = l, "/" != s.charAt(0) && u.schema) return u.opaque = s, u;
		if(c.startsWith(s, "//")) {
			s = s.slice(2), n = o(s, "/"), u.pathname = "/" + unescape(n[1] || ""), n = r(n[0]), u.auth = n[0];
			var p = n[1];
			n = o(p, ":"), u.hostname = n[0], u.port = ~~n[1]
		}
		return u
	};
	var s = "http https ftp gopher file".split(" ");
	t.format = function(e) {
		if(!e || "object" != typeof e) return e;
		var t = e.protocol,
			n = [t];
		t && !c.includes(s, t.slice(0, t.length - 1)) || n.push("//"), e.auth && n.push(e.auth, "@"), n.push(e.hostname), e.port && n.push(":", e.port), n.push(e.pathname);
		var i = e.query;
		i && ("string" != typeof i && (i = a.stringify(i)), i && n.push("?", i)), n.push(e.hash);
		for(var o = [], r = 0; r < n.length; r++) n[r] && o.push(n[r]);
		return o.join("")
	}, t.appendQuery = function(e, t) {
		var n = o(e, "#");
		e = n[0];
		var i = n[1];
		return c.isObject(t) && (t = a.stringify(t)), c.includes(e, "?") ? c.endsWith(e, "&") || c.endsWith(e, "?") || t && (t = "&" + t) : t && (t = "?" + t), t && (e += t), i && (e += "#" + i), e
	}
}, function(e, t, n) {
	var i = n(1),
		o = n(31);
	o.resolve = n(33), o.reject = n(34), o.prototype["catch"] = o.prototype.caught = function(e) {
		return this.then(null, e)
	}, o.prototype.delay = function(e) {
		var t;
		return this.then(function(n) {
			return t = n, o.delay(e)
		}).then(function() {
			return t
		})
	}, o.delay = function(e) {
		return new o(function(t) {
			setTimeout(t, e)
		})
	}, o.all = function(e) {
		var t = [],
			n = i.size(e),
			r = 0;
		return new o(function(a, c) {
			0 === n && a(t), i.each(e, function(e, i) {
				o.resolve(e).then(function(e) {
					t[i] = e, r++, r === n && a(t)
				}, function(e) {
					c(e)
				})
			})
		})
	}, o.race = function(e) {
		return new o(function(t, n) {
			i.each(e, function(e) {
				o.resolve(e).then(function(e) {
					t(e)
				}, function(e) {
					n(e)
				})
			})
		})
	}, e.exports = o
}, function(e, t, n) {
	(function(t, i, o) {
		function t(e) {
			var t = this;
			t.handlers = {}, t.children = [], t.state = u, t.spread = !1;
			var n = f(t, l),
				i = m(t, p);
			if(!s.fn(e)) throw new TypeError("expecting a function");
			try {
				e(function(e) {
					n(e)
				}, function(e) {
					i(e)
				})
			} catch(o) {
				i(o)
			}
		}

		function r(e, t, n) {
			a(function() {
				var i = e.handlers[t];
				if(s.fn(i)) {
					var o;
					try {
						o = e.spread ? i.apply(null, n) : i(n)
					} catch(r) {
						return h(e, p, r)
					}
					d(e, l, o)
				} else d(e, t, n)
			})
		}

		function a(e) {
			i.process && o.nextTick ? o.nextTick(e) : setTimeout(e)
		}
		var c = n(1),
			s = c.is,
			u = 0,
			l = 1,
			p = -1;
		e.exports = t, t.prototype.then = function(e, n) {
			var i = this,
				o = new t(c.noop);
			o.spread = this.spread;
			var a = o.handlers;
			return a[l] = e, a[p] = n, u == i.state ? i.children.push(o) : r(o, i.state, i.result), o
		};
		var d = function(e, t, n) {
				if(e === n) return d(e, p, new TypeError("circle promise"));
				var i;
				if(s.oof(n)) try {
					i = n.then
				} catch(o) {
					return h(e, p, o)
				}
				if(s.fn(i)) {
					var r = c.once(function(t, n) {
						t == p ? h(e, t, n) : d(e, t, n)
					});
					try {
						i.call(n, function(e) {
							r(l, e)
						}, function(e) {
							r(p, e)
						})
					} catch(a) {
						r(p, a)
					}
				} else h(e, t, n)
			},
			f = c.curry(d),
			h = function(e, t, n) {
				e.state == u && (e.state = t, e.result = n, c.each(e.children, function(e) {
					r(e, t, n)
				}))
			},
			m = c.curry(h)
	}).call(t, n(30), function() {
		return this
	}(), n(32))
}, function(e, t) {
	function n() {
		throw new Error("setTimeout has not been defined")
	}

	function i() {
		throw new Error("clearTimeout has not been defined")
	}

	function o(e) {
		if(l === setTimeout) return setTimeout(e, 0);
		if((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(e, 0);
		try {
			return l(e, 0)
		} catch(t) {
			try {
				return l.call(null, e, 0)
			} catch(t) {
				return l.call(this, e, 0)
			}
		}
	}

	function r(e) {
		if(p === clearTimeout) return clearTimeout(e);
		if((p === i || !p) && clearTimeout) return p = clearTimeout, clearTimeout(e);
		try {
			return p(e)
		} catch(t) {
			try {
				return p.call(null, e)
			} catch(t) {
				return p.call(this, e)
			}
		}
	}

	function a() {
		m && f && (m = !1, f.length ? h = f.concat(h) : g = -1, h.length && c())
	}

	function c() {
		if(!m) {
			var e = o(a);
			m = !0;
			for(var t = h.length; t;) {
				for(f = h, h = []; ++g < t;) f && f[g].run();
				g = -1, t = h.length
			}
			f = null, m = !1, r(e)
		}
	}

	function s(e, t) {
		this.fun = e, this.array = t
	}

	function u() {}
	var l, p, d = e.exports = {};
	! function() {
		try {
			l = "function" == typeof setTimeout ? setTimeout : n
		} catch(e) {
			l = n
		}
		try {
			p = "function" == typeof clearTimeout ? clearTimeout : i
		} catch(e) {
			p = i
		}
	}();
	var f, h = [],
		m = !1,
		g = -1;
	d.nextTick = function(e) {
		var t = new Array(arguments.length - 1);
		if(arguments.length > 1)
			for(var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
		h.push(new s(e, t)), 1 !== h.length || m || o(c)
	}, s.prototype.run = function() {
		this.fun.apply(null, this.array)
	}, d.title = "browser", d.browser = !0, d.env = {}, d.argv = [], d.version = "", d.versions = {}, d.on = u, d.addListener = u, d.once = u, d.off = u, d.removeListener = u, d.removeAllListeners = u, d.emit = u, d.prependListener = u, d.prependOnceListener = u, d.listeners = function(e) {
		return []
	}, d.binding = function(e) {
		throw new Error("process.binding is not supported")
	}, d.cwd = function() {
		return "/"
	}, d.chdir = function(e) {
		throw new Error("process.chdir is not supported")
	}, d.umask = function() {
		return 0
	}
}, function(e, t, n) {
	var i = n(31);
	e.exports = function(e) {
		return new i(function(t, n) {
			t(e)
		})
	}
}, function(e, t, n) {
	var i = n(31);
	e.exports = function(e) {
		return new i(function(t, n) {
			n(e)
		})
	}
}, , , , , , , , , , , , , , , , , function(e, t, n) {
	function i() {
		var e = this;
		e.resources = {}, e.resource = {};
		var t = [];
		"object" == typeof navigator && (t = navigator.languages || [navigator.language]), e.setLocales(t)
	}
	var o = n(1),
		r = i.prototype;
	r.is = function(e) {
		return o.includes(o.lower(this.locale), o.lower(e))
	}, r.setResource = function(e, t) {
		this.resources[e] = t
	}, r.setResources = function(e) {
		o.extend(this.resources, e)
	}, r.setLocale = function(e) {
		var t = this;
		if(e) {
			t.locale = e;
			var n = i.matchLocale(o.keys(t.resources), e);
			return t.resource = t.resources[n] || {}, n
		}
	}, r.setLocales = function(e) {
		this.locales = e, this.setLocale(o.first(e))
	}, r.translate = function(e) {
		return this.resource[e] || e
	}, r.t = r.translate, i.matchLocale = function(e, t) {
		e = o.map(e, function(e) {
			return {
				raw: e,
				score: i.getSimilar(e, t)
			}
		}).sort(function(e, t) {
			return e.score - t.score
		});
		var n = o.last(e) || {};
		return n.raw
	}, i.getSimilar = function(e, t) {
		var n = 0;
		return e = i.parseLocale(o.lower(e)), t = i.parseLocale(o.lower(t)), e.language && e.language == t.language && (n += 50), e.country && e.country == t.country && (n += 40), e.language && e.language == t.country && (n += 20), t.language && t.language == e.country && (n += 20), n
	}, i.parseLocale = function(e) {
		var t = e.split(/[^a-zA-Z]+/),
			n = {
				language: t[0],
				country: t[1]
			};
		return n
	};
	var a = new i;
	e.exports = t = a
}, function(e, t, n) {
	(function(e) {
		function i(t) {
			e.isString(t) && r("head").append("<style>" + t + "</style>")
		}

		function o() {
			var e;
			try {
				window.top.document && window.top.QHPass && (e = window.top)
			} catch(t) {
				e = null
			}
			return e = e || window
		}
		var r = n(53);
		t.addStyle = i, t.getTopWindow = o
	}).call(t, n(1))
}, function(e, t, n) {
	(function(t) {
		var i = n(54),
			o = t.jQuery || i;
		e.exports = o
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	(function(i) {
		function o(e, t) {
			if(l.fn(e)) return o(u).ready(e);
			if(!(this instanceof o)) return new o(e, t);
			if(this.length = 0, e) {
				l.string(e) && (e = -1 == e.indexOf("<") ? c(e, t) : a.html(e)), l.arraylike(e) || (e = [e]);
				for(var n = e.length, i = 0; i < n; i++) this[i] = e[i];
				this.length = n
			}
		}
		var r = n(1),
			a = n(55),
			c = n(56),
			s = n(57);
		s.prefix = "minJQ-";
		var u = i.document,
			l = r.is;
		e.exports = t = o;
		var p = o.fn = o.prototype;
		o.extend = p.extend = function() {
			var e = arguments;
			return 1 == e.length ? r.extend(this, e[0]) : r.extend.apply(r, e)
		}, p.extend({
			jquery: !0
		}), n(58)
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	(function(e) {
		function i(e) {
			e = o.trim(e + "");
			var t, n, i = e.replace(c, function(e, i, o, r) {
				return n && i && (t = 0), (t = 0) ? e : (n = o || i, t += !r - !o, "")
			});
			if(i = o.trim(i)) throw new Error("Invalid JSON: " + e);
			return Function("return " + e)()
		}
		var o = n(1),
			r = o.is;
		t.html = function(e, t) {
			if(r.str(e)) {
				t = t || document;
				var n = t.createElement("div");
				return n.innerHTML = e + "", n.childNodes
			}
			return []
		}, t.xml = function(t, n) {
			t += "";
			var i, o;
			try {
				if(e.DOMParser) {
					var a = new DOMParser;
					i = a.parseFromString(t, "text/xml")
				} else i = new ActiveXObject("Microsoft.XMLDOM"), i.async = "false", i.loadXML(t)
			} catch(c) {
				o = c
			}
			if(!o)
				if(i)
					if(i.documentElement) {
						var s = i.getElementsByTagName("parsererror")[0];
						if(s) {
							var u = s.textContent;
							o = new Error(u)
						}
					} else {
						var l = i.parseError;
						l && (o = new Error("line " + l.line + ": " + l.reason))
					}
			else o = new Error("parse error");
			return r.fn(n) && n(o, i), i
		};
		var a = e.JSON || {};
		t.json = a.parse || i;
		var c = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g
	}).call(t, function() {
		return this
	}())
}, function(e, t) {
	(function(n) {
		function i(e, n) {
			n = n || a;
			var i, c = [];
			if(e && n.getElementsByTagName) {
				if(e += "", r.test(e)) i = n.getElementsByTagName(e);
				else {
					var s = e.substr(1);
					if(a == n && "#" == e.charAt(0) && r.test(s)) {
						var u = a.getElementById(s);
						if(u) return [u]
					} else {
						var l = t.custom || o;
						try {
							i = l(e, n)
						} catch(p) {}
					}
				}
				if(i)
					for(var d = i.length || 0, f = 0; f < d; f++) c.push(i[f])
			}
			return c
		}

		function o(e, t) {
			return t.querySelectorAll(e)
		}
		e.exports = t = i;
		var r = /^[-\w]+$/,
			a = n.document
	}).call(t, function() {
		return this
	}())
}, function(e, t) {
	function n(e) {
		e = e || 7;
		var n = Math.random().toString(35).substr(2, e);
		return t.prefix + n
	}
	e.exports = t = n, t.prefix = ""
}, function(e, t, n) {
	n(59), n(60), n(61), n(62), n(63), n(65), n(66), n(67), n(68), n(69), n(70)
}, function(e, t, n) {
	(function(e) {
		var t = n(54),
			i = n(1),
			o = n(55),
			r = i.is,
			a = "boolean number string function array date regexp object error".split(" ");
		t.extend({
			noop: i.noop,
			toArray: function(e, n) {
				return t.merge(n, e)
			},
			each: function(e, t) {
				return i.each(e, function(n, i) {
					return t.call(n, i, n, e)
				}), e
			},
			grep: i.filter,
			inArray: i.includes,
			isArray: r.arr,
			isEmptyObject: r.empty,
			isFunction: r.fn,
			isNumeric: r.num,
			isPlainObject: r.hash,
			isWindow: function(t) {
				return t == e
			},
			makeArray: i.slice,
			map: i.map,
			merge: function(e, t) {
				e = e || [];
				var n = e.length || 0;
				return i.each(t, function(t, i) {
					e.length++, e[n + i] = t
				}), e
			},
			now: i.now,
			parseHTML: o.html,
			parseJSON: o.json,
			parseXML: o.xml,
			proxy: i.bind,
			trim: i.trim,
			type: function(e) {
				var t = r._class(e);
				return i.includes(a, t) || (t = "object"), t
			}
		})
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	function i(e, t, n) {
		e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent && e.attachEvent("on" + t, n)
	}

	function o(e, t, n) {
		e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent && e.detachEvent("on" + t, n)
	}
	var r = n(54),
		a = n(1),
		c = a.is,
		s = "events";
	r.Event = function(e, t) {
		return this instanceof r.Event ? (e = e || {}, "string" == typeof e && (e = {
			type: e
		}), this.originalEvent = e, this.type = e.type, this.target = e.target || e.srcElement, void(t && r.extend(this, t))) : new r.Event(e, t)
	}, r.extend({
		one: function(e, t, n, i, o) {
			if(c.fn(n)) {
				var s = a.once(function() {
					r.off(e, t, s), s = null, n.apply(this, arguments)
				});
				return r.on(e, t, s, i, o)
			}
		},
		on: function(e, t, n, o, a) {
			var c = r._data(e, s),
				u = t.split(".");
			t = u[0];
			var l = u[1];
			c || (c = {}, r._data(e, s, c));
			var p = r._data(e, "handler");
			p || (p = function(t) {
				r.trigger(e, r.Event(t))
			}, r._data(e, "handler", p)), c[t] || (c[t] = [], i(e, t, p));
			var d = c[t],
				f = {
					handler: n,
					namespace: l,
					selector: a,
					type: t
				};
			d.push(f)
		},
		trigger: function(e, t) {
			var n = r._data(e, s);
			"string" == typeof t && (t = r.Event(t, {
				target: e
			}));
			var i = n[t.type];
			if(i) {
				i = i.slice();
				for(var o = i.length, a = 0; a < o; a++) {
					var c = i[a],
						u = c.handler.call(e, t);
					!1 === u && (t = t.originalEvent || t, t.preventDefault ? t.preventDefault() : t.returnValue = !1, t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
				}
			}
		},
		off: function(e, t, n) {
			var i = r._data(e, s);
			if(i)
				if(t = t || "", t && "." != t.charAt(0)) {
					var a = t.split("."),
						c = a[0],
						u = a[1],
						l = i[c];
					if(l) {
						for(var p = l.length - 1; p >= 0; p--) {
							var d = l[p],
								f = !0;
							u && u != d.namespace && (f = !1), n && n != d.handler && (f = !1), f && l.splice(p, 1)
						}
						i[c].length || (o(e, c, r._data(e, "handler")), i[c] = null)
					}
				} else
					for(var h in i) r.off(e, h + t, n)
		}
	}), r.fn.extend({
		eventHandler: function(e, t, n) {
			return e ? (e = e.split(" "), this.each(function() {
				for(var i = 0; i < e.length; i++) n(this, e[i], t)
			})) : this.each(function() {
				n(this)
			})
		},
		on: function(e, t) {
			return this.eventHandler(e, t, r.on)
		},
		one: function(e, t) {
			return this.eventHandler(e, t, r.one)
		},
		off: function(e, t) {
			return this.eventHandler(e, t, r.off)
		},
		trigger: function(e, t) {
			return this.eventHandler(e, t, r.trigger)
		}
	})
}, function(e, t, n) {
	(function(e) {
		function t() {
			return s && "complete" == s.readyState ? (r.ctx = o, r.open()) : (o(s).on(a, i), void o(e).on(c, i))
		}

		function i() {
			o(e).off(a, i), o(s).off(c, i), r.ctx = o, r.open()
		}
		var o = n(54),
			r = n(27)(),
			a = "DOMContentLoaded",
			c = "load",
			s = e.document;
		o.fn.extend({
			ready: function(e) {
				return r.queue(e), this
			}
		}), setTimeout(t)
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	var i = n(54),
		o = n(1),
		r = o.is;
	i.fn.extend({
		toArray: function() {
			return i.toArray(this)
		},
		pushStack: function(e) {
			var t = i(e);
			return t.prevObject = this, t.context = this.context, t
		},
		get: function(e) {
			return r.num(e) ? e > 0 ? this[e] : this.get(e + this.length) : this.toArray()
		},
		each: function(e) {
			return o.each(this, function(t, n) {
				return e.call(t, n, t, this)
			}), this
		},
		map: function(e) {
			var t = o.map(this, function(t, n) {
				return e.call(t, n, t, this)
			});
			return this.pushStack(t)
		},
		filter: function(e) {
			var t = o.filter(this, function(t, n) {
				return e.call(t, n, t, this)
			});
			return this.pushStack(t)
		},
		end: function() {
			return this.prevObject || i()
		},
		eq: function(e) {
			return e < 0 ? this.eq(e + this.length) : this.pushStack([this[e]])
		},
		first: function() {
			return this.eq(0)
		},
		last: function() {
			return this.eq(-1)
		},
		slice: function(e, t) {
			var n = o.slice(this, e, t);
			return this.pushStack(n)
		},
		find: function(e) {
			var t = o.map(this, function(t) {
				return i(e, t)
			});
			return this.pushStack(o.union.apply(o, t))
		}
	})
}, function(e, t, n) {
	(function(e) {
		var t = n(1),
			i = n(54),
			o = n(64),
			r = (n(57), t.is, new o),
			a = new o,
			c = e.getComputedStyle || function(e) {
				return e && e.currentStyle ? e.currentStyle : {}
			};
		i.extend({
			expando: a.expando,
			access: function(e, t, n, o, r) {
				var a = 0;
				if(n && "object" == typeof n)
					for(a in n) i.access(e, t, a, n[a], !0);
				else if(void 0 === o) {
					var c;
					if(e[0] && (c = t(e[0], n)), !r) return c
				} else
					for(a = 0; a < e.length; a++) t(e[a], n, o);
				return e
			},
			attr: function(e, t, n) {
				return void 0 === n ? e.getAttribute(t) : null === n ? e.removeAttribute(t) : void e.setAttribute(t, "" + n)
			},
			text: function(e, t, n) {
				if(void 0 !== n) return e.textContent = "" + n;
				var o = e.nodeType;
				if(3 == o || 4 == o) return e.nodeValue;
				if("string" == typeof e.textContent) return e.textContent;
				var r = "";
				for(e = e.firstChild; e; e = e.nextSibling) r += i.text(e);
				return r
			},
			html: function(e, t, n) {
				return void 0 === n ? e.innerHTML : void(e.innerHTML = "" + n)
			},
			prop: function(e, t, n) {
				return void 0 === n ? e[t] : void(e[t] = n)
			},
			css: function(e, t, n) {
				var i = e.style || {};
				if(void 0 === n) {
					var o = i[t];
					return o ? o : c(e, null)[t]
				}
				i[t] = n
			},
			data: function(e, t, n) {
				if(void 0 !== n) r.set(e, t, n);
				else {
					if(!t || "object" != typeof t) return t ? r.get(e, t) : r.getData(e, !0);
					for(var o in t) i.data(e, o, t[o])
				}
			},
			_data: function(e, t, n) {
				if(void 0 !== n) a.set(e, t, n);
				else {
					if(!t || "object" != typeof t) return a.get(e, t);
					for(var o in t) i._data(e, o, t[o])
				}
			},
			removeData: function(e, t) {
				r.remove(e, t)
			}
		}), i.fn.extend({
			text: function(e) {
				return i.access(this, i.text, null, e)
			},
			html: function(e) {
				return i.access(this, i.html, null, e)
			},
			attr: function(e, t) {
				return i.access(this, i.attr, e, t)
			},
			prop: function(e, t) {
				return i.access(this, i.prop, e, t)
			},
			css: function(e, t) {
				return i.access(this, i.css, e, t)
			},
			data: function(e, t) {
				return i.access(this, i.data, e, t)
			},
			_data: function(e, t) {
				return i.access(this, i.data, e, t)
			},
			removeData: function(e) {
				return i.access(this, i.removeData, e, void 0, !0)
			}
		})
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	function i() {
		this.expando = o(), this.cache = [null]
	}
	var o = n(57);
	e.exports = i;
	var r = i.prototype;
	r.get = function(e, t) {
		var n = this.getData(e);
		return null == t ? n : n[t]
	}, r.set = function(e, t, n) {
		var i = this.getData(e, !0);
		return i[t] = n, e
	}, r.remove = function(e, t) {
		if(void 0 === t) this.discard(e);
		else {
			var n = this.getData(e);
			delete n[t]
		}
		return e
	}, r.getData = function(e, t) {
		var n = {};
		if(e) {
			var i = e[this.expando],
				o = this.cache;
			if(i) return o[i];
			t && (e[this.expando] = o.length, o.push(n))
		}
		return n
	}, r.discard = function(e) {
		e && e[this.expando] && (e[this.expando] = void 0)
	}
}, function(e, t, n) {
	var i = (n(1), n(54));
	i.buildFragment = function(e, t) {
		t = t || document;
		for(var n, o = t.createDocumentFragment(), r = 0; n = e[r++];) {
			var a = [];
			if("string" == typeof n)
				if(n.indexOf("<") == -1) a.push(t.createTextNode(n));
				else {
					var c = document.createElement("div");
					c.innerHTML = n, i.toArray(c.childNodes, a)
				}
			else "object" == typeof n && (n.nodeType ? a.push(n) : i.toArray(n, a))
		}
		for(var s, r = 0; s = a[r++];) o.appendChild(s);
		return o
	}, i.fn.extend({
		domManip: function(e, t) {
			return this.each(function() {
				var n = i.buildFragment(e);
				t.call(this, n)
			})
		},
		remove: function() {
			return this.domManip(arguments, function() {
				this.parentNode && this.parentNode.removeChild(this)
			})
		},
		before: function() {
			return this.domManip(arguments, function(e) {
				e.parentNode && e.parentNode.insertBefore(e, this)
			})
		},
		after: function() {
			return this.domManip(arguments, function(e) {
				e.parentNode && e.parentNode.insertBefore(e, this.nextSibling)
			})
		},
		append: function() {
			return this.domManip(arguments, function(e) {
				this.appendChild(e)
			})
		}
	})
}, function(e, t, n) {
	var i = n(54),
		o = n(1),
		r = "display";
	o.each("show hide toggle".split(" "), function(e) {
		i.fn[e] = function() {
			return this.each(function(t, n) {
				var o = e,
					a = i.css(n, r),
					c = "none" == a;
				if("toggle" == e && (o = "hide", c && (o = "show")), "show" == o && c) {
					var s = i._data(n, r) || "";
					i.css(n, r, s)
				} else "hide" != o || c || (i._data(n, r, a), i.css(n, r, "none"))
			})
		}
	})
}, function(e, t, n) {
	(function(e) {
		function t(e, t, n) {
			function i(e) {
				if(a) {
					if(n) {
						var t = {
							status: 200
						};
						e && (t = {
							status: 0
						}), n(e, t)
					}
					a.onload = a.onerror = a.onreadystatechange = null, r.removeChild(a), a = null
				}
			}

			function o() {
				a.async = !0, a.src = e, a.onload = a.onerror = a.onreadystatechange = function(e) {
					var t = a.readyState;
					e && "error" == e.type ? i("error") : t && !/loaded|complete/.test(t) || i(null)
				}, r.appendChild(a)
			}
			var r = c("head")[0],
				a = document.createElement("script");
			return {
				abort: function() {
					n = null, i()
				},
				send: o
			}
		}

		function i(n, i, a) {
			"function" == typeof i && (a = i, i = {});
			var s, u = !1,
				p = function(e, t, n) {
					u || (a = a || c.noop, u = !0, a(e, t, n))
				},
				d = i.dataType || "text",
				f = !1;
			if("jsonp" == d) {
				f = !0;
				var h = i.jsonp || l.jsonp,
					m = i.jsonpCallback || [c.expando, c.now(), Math.random()].join("_");
				m = m.replace(/[^\w|$]/g, "");
				var g = h + "=?",
					v = c.extend({}, i.data);
				n.indexOf(g) != -1 ? n.replace(g, h + "=" + m) : v[h] = m, i.cache || (v._ = c.now()), n = r(n, v), d = "script", e[m] = function(t) {
					p(null, {
						status: 200
					}, t), e[m] = null
				}
			}
			"script" == d ? s = t(n, i, f ? null : p) : /html|text/.test(d) && (s = o(n, i, p)), s.send(), i.timeout && setTimeout(function() {
				s.abort(), p("timeout", {
					status: 0,
					readyState: 0,
					statusText: "timeout"
				}), f && (window[m] = c.noop)
			}, i.timeout)
		}

		function o(e, t, n) {
			function i() {
				if(a) {
					var i = t.type || "GET";
					e = r(e, t.data), a.open(i, e, !n.async), s in a && (u.cors = !0, a[s] = !0);
					var o = t.headers;
					if(o)
						for(var c in o) a.setRequestHeader(c, o[c]);
					a.send(t.data || null);
					var l = function() {
						l && 4 === a.readyState && (l = void 0, n && n(null, a, a.responseText))
					};
					!1 === t.async ? l() : 4 === a.readyState ? setTimeout(l) : a.onreadystatechange = l
				}
			}

			function o() {
				a && (n = null, a.abort())
			}
			var a = l.xhr();
			return {
				send: i,
				abort: o
			}
		}

		function r(e, t) {
			if(t = a.stringify(t)) {
				-1 == e.indexOf("?") && (e += "?");
				var n = e.charAt(e.length - 1);
				"&" != n && "?" != n && (e += "&"), e += t
			}
			return e
		}
		var a = n(25),
			c = n(54),
			s = (n(57), "withCredentials"),
			u = {};
		c.support = u;
		var l = {
			xhr: function() {
				try {
					return window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")
				} catch(e) {}
			},
			jsonp: "callback"
		};
		c.ajaxSetting = l, c.ajax = function(e) {
			var t = {};
			return e = e || {}, i(e.url, e, function(n, i, o) {
				i = i || {};
				var r = {
					status: i.status,
					statusText: i.statusText,
					readyState: i.readyState
				};
				c.extend(t, r);
				var a = "success";
				n || 200 != t.status ? (a = "error", "timeout" == n && (a = "timeout"), e.error && e.error(t, a, i.statusText)) : e.success && e.success(o || i.responseText, a, t), e.complete && e.complete(t, a)
			}), t
		}, c.each(["get", "post"], function(e, t) {
			c[t] = function(e, n, i, o) {
				"function" == typeof n && (o = i, i = n, n = void 0), c.ajax({
					url: e,
					type: t,
					dataType: o,
					data: n,
					success: i
				})
			}
		})
	}).call(t, function() {
		return this
	}())
}, function(e, t, n) {
	var i = n(54),
		o = n(1);
	o.each("width height".split(" "), function(e) {
		o.each(["inner", "outer", ""], function(t) {
			var n = e,
				o = e.charAt(0).toUpperCase() + e.substr(1);
			t && (n = t + o), i.fn[n] = function() {
				var e = this[0];
				if(e) {
					var n = 0;
					return n = "outer" == t ? e["offset" + o] : e["offset" + o], parseFloat(n) || 0
				}
			}
		})
	}), i.fn.offset = function() {
		var e = this[0];
		if(e) {
			var t = e.getBoundingClientRect();
			return o.only(t, "left top")
		}
	}
}, function(e, t, n) {
	function i(e) {}

	function o(e) {
		return r.trim(e.className).split(/\s+/)
	}
	var r = n(1),
		a = n(54),
		c = i.prototype;
	r.extend(c, {
		add: function() {
			var e = o(this);
			this.className = r.union(e, arguments).join(" ")
		},
		remove: function() {
			var e = o(this);
			this.className = r.difference(e, arguments).join(" ")
		},
		contains: function(e) {
			return r.includes(o(this), e)
		},
		toggle: function(e, t) {
			var n = c.contains.call(this, e),
				i = "add";
			1 != t && (n || 0 == t) && (i = "remove"), c[i].call(this, e)
		}
	}), r.each("add remove toggle".split(" "), function(e) {
		a.fn[e + "Class"] = function() {
			var t = arguments;
			return this.each(function() {
				c[e].apply(this, t)
			})
		}
	}), a.fn.hasClass = function(e) {
		return r.every(this, function(t) {
			return c.contains.call(t, e)
		})
	}
}, function(e, t, n) {
	function i(e) {
		return o.union.apply(null, e)
	}
	var o = n(1),
		r = n(54),
		a = {
			children: function(e) {
				for(var t = [], n = e.firstChild; n; n = n.nextSibling) 1 == n.nodeType && t.push(n);
				return t
			},
			parent: function(e) {
				return e.parentNode
			}
		};
	o.each("children parent".split(" "), function(e) {
		r.fn[e] = function() {
			return i(o.map(this, function(t) {
				return a[e].apply(null, arguments)
			}))
		}
	})
}, , , , , , , , , , , , function(e, t, n) {
	function i() {
		window._smConf = {
			organization: "BsHKz7OMBibZYAoy3ZCA",
			staticHost: "report.passport.360.cn",
			apiHost: "report.passport.360.cn",
			apiPath: ""
		};
		var e = function() {
				var e = _smConf.staticHost + "/static2",
					t = "https:" === document.location.protocol,
					n = t ? "https://" : "http://",
					i = "/fpv2.js",
					o = n + _smConf.staticHost + i,
					r = navigator.userAgent.toLowerCase(),
					a = /windows\s(?:nt\s5.1)|(?:xp)/.test(r),
					c = /msie\s[678]\.0/.test(r);
				return t && a && c && (o = n + e + i), o
			}(),
			t = document.createElement("script"),
			n = document.getElementsByTagName("script")[0];
		t.src = e, n.parentNode.insertBefore(t, n)
	}
	var o = n(13).getLogger("shumei"),
		r = !1;
	t.load = function() {
		r || (r = !0, o.debug("load"), i())
	}, t.getShumeiDeviceId = function() {
		var e;
		try {
			e = SMSdk.getDeviceId()
		} catch(t) {
			e = ""
		}
		return e
	}
}, , , function(e, t, n) {
	(function(e) {
		! function() {
			function t() {
				var e = i();
				e < 8 || setTimeout(function() {
					o.debug("addStatisticsForSafe");
					var e = document.createElement("iframe"),
						t = document.getElementsByTagName("body")[0];
					e.width = 0, e.height = 0, e.style.display = "none", e.id = "quc_hijack_monitor", e.src = location.protocol + "//s.360.cn/0kee/a.html", t.appendChild(e)
				}, 3e3)
			}

			function i(e) {
				var t = new RegExp("MSIE (\\d+\\.\\d+)");
				t.test(e || navigator.userAgent);
				var n = parseFloat(RegExp.$1);
				return n
			}
			var o = n(13).getLogger("core"),
				r = n(86);
			o.sdk.prefix = "quc:jssdk:";
			var a = window.QHPass = {
				VERSION: "5.3.0",
				RELEASE: "",
				$: jQuery,
				utils: {},
				plugin: {},
				ui: {},
				tool: r,
				log: o.getLogger("qhpass")
			};
			a.version = [a.VERSION, a.RELEASE].join("."), o.debug("version", a.version), a.isI360 = function() {
				return "i.360.cn" == location.hostname
			}, a.DEBUG = !1;
			var c = n(88);
			e.includes(["i.360.cn", "e.360.cn"], location.host) && c.init({
				id: 360,
				uin: "crash",
				random: 1,
				repeat: 2,
				url: "//i.360.cn/clogo.gif",
				offlineLog: !1
			}), window.QUC = window.QUC || {}, QUC.t6 = +new Date, a.init = function(e) {
				window.QUC = window.QUC || {}, QUC.t7 = +new Date, o.debug("init", e);
				var n = a.$;
				"string" == typeof e && (e = {
					src: e
				}), n.isPlainObject(e) && a.setConfig(e), a._isInit || (t(), a._isInit = !0, a.events.trigger("init.core"), a.events.on("afterShow.* DOMUpdated.*", function(e, t) {
					setTimeout(function() {
						a.utils.initPlaceholder(n(t).find("[placeholder]")), o.debug("try add placeholder")
					}, 0)
				}))
			}
		}()
	}).call(t, n(1))
}, function(e, t, n) {
	(function(e, i) {
		var o = n(13).getLogger("tool"),
			r = n(51),
			a = n(29),
			c = t;
		c.gotoPage = function(e) {
			o.debug("change location", e), location.href = e
		}, c.tryHandleAbnormalPassword = function(t, i) {
			return new e(function(e, a) {
				if(t) {
					var c = t.weakInfo;
					if(c) {
						if(i = c.password || i) {
							var s = QHPass.validate.checkPasswordFrontendSync({
								password: i
							});
							c.checkResult = s, c.password = i, s.reason && (c.isWeak = !0)
						}
						o.debug("weak info", c);
						var u = c.isLeak && c.noticeWhenLeak,
							l = c.isWeak && c.noticeWhenWeak;
						if(c.ignoreWeak && (l = !1), u || l) {
							var p, d = {
								onconfirm: function() {
									o.debug("confirm"), p.hide(!0), e({
										shouldChangePassword: !0
									})
								},
								oncancel: function() {
									o.debug("cancel"), p.hide(!0), u ? c.limitWhenLeak ? a(new Error("user reject change password and not login")) : e() : l && (c.limitWhenWeak ? a(new Error("user reject change password and not login")) : e())
								},
								confirmButtonText: r.t("\u4fee\u6539\u5bc6\u7801"),
								cancelButtonText: r.t("\u53d6\u6d88"),
								title: r.t("\u5e10\u53f7\u5f02\u5e38"),
								content: r.t("weak password warning")
							};
							u && (d.content = r.t("leak password warning"));
							var f = n(87);
							p = new QHPass.utils.Panel({
								title: d.title,
								content: f
							});
							var h = p.$el;
							return h.addClass("quc-confirm").addClass("quc-panel-sad"), h.find(".quc-panel-message").html('<i class="quc-icon quc-icon-sad"></i>' + d.content), h.find(".quc-panel-close").on("click", d.oncancel), h.find(".quc-button-cancel").text(d.cancelButtonText).on("click", d.oncancel), h.find(".quc-button-confirm").text(d.confirmButtonText).on("click", d.onconfirm), void p.show()
						}
					}
				}
				e()
			})
		}, c.checkBindMobile = function(t) {
			return e.resolve(QHPass.sync.bindMobileCheck(t)).then(function(t) {
				return o.debug("bind mobile check result", t), t = t || {}, new e(function(e, i) {
					function o() {
						s.hide(!0), i(new Error("user reject override mobile"))
					}
					if(0 == t.errno) {
						var a = t.status;
						if(2 == a) {
							var c = n(87),
								s = new QHPass.utils.Panel({
									title: " ",
									content: c
								}),
								u = s.$el;
							u.addClass("quc-confirm").addClass("quc-panel-sad"), u.find(".quc-panel-message").html(r.t("override phone warning")), u.find(".quc-panel-title").html(r.t("\u64cd\u4f5c\u63d0\u9192")), u.find(".quc-panel-close").on("click", o), u.find(".quc-button-cancel").text("\u53d6\u6d88").on("click", o), u.find(".quc-button-confirm").text("\u7ee7\u7eed\u7ed1\u5b9a").on("click", function() {
								s.hide(!0), e({
									condition: 0
								})
							}), s.show()
						} else 0 != a && 1 != a || e({
							condition: 2
						})
					}
				})
			})
		}, c.appendSearchParams = function(e) {
			var t = i.slice(location.search, 1);
			return a.appendQuery(e, t)
		}, c.gotoPageWithSearchParams = function(e) {
			return e = c.appendSearchParams(e), c.gotoPage(e)
		}
	}).call(t, n(30), n(1))
}, function(e, t) {
	e.exports = '<div class="quc-panel-main">\r\n  <div class="quc-panel-message">\r\n  </div>\r\n  <div class="quc-panel-btns">\r\n    <button class="quc-new-button quc-button-default quc-button-cancel"></button>\r\n    <button class="quc-new-button quc-button-primary quc-button-confirm"></button>\r\n  </div>\r\n</div>\r\n'
}, function(e, t, n) {
	var i = function(e) {
		if(e.BJ_REPORT) return e.BJ_REPORT;
		var t = [],
			n = {},
			o = {
				id: 0,
				uin: 0,
				url: "",
				offline_url: "",
				offline_auto_url: "",
				ext: null,
				level: 4,
				ignore: [],
				random: 1,
				delay: 1e3,
				submit: null,
				repeat: 5,
				offlineLog: !1,
				offlineLogExp: 5,
				offlineLogAuto: !1
			},
			r = {
				db: null,
				ready: function(e) {
					var t = this;
					if(!window.indexedDB || !o.offlineLog) return o.offlineLog = !1, e();
					if(this.db) return void setTimeout(function() {
						e(null, t)
					}, 0);
					var n = 1,
						i = window.indexedDB.open("badjs", n);
					return i ? (i.onerror = function(t) {
						return e(t), o.offlineLog = !1, console.log("indexdb request error"), !0
					}, i.onsuccess = function(n) {
						t.db = n.target.result, setTimeout(function() {
							e(null, t)
						}, 500)
					}, void(i.onupgradeneeded = function(e) {
						var t = e.target.result;
						t.objectStoreNames.contains("logs") || t.createObjectStore("logs", {
							autoIncrement: !0
						})
					})) : (o.offlineLog = !1, e())
				},
				insertToDB: function(e) {
					var t = this.getStore();
					t.add(e)
				},
				addLog: function(e) {
					this.db && this.insertToDB(e)
				},
				addLogs: function(e) {
					if(this.db)
						for(var t = 0; t < e.length; t++) this.addLog(e[t])
				},
				getLogs: function(e, t) {
					if(this.db) {
						var n = this.getStore(),
							i = n.openCursor(),
							o = [];
						i.onsuccess = function(n) {
							var i = n.target.result;
							i ? (i.value.time >= e.start && i.value.time <= e.end && i.value.id == e.id && i.value.uin == e.uin && o.push(i.value), i["continue"]()) : t(null, o)
						}, i.onerror = function(e) {
							return t(e), !0
						}
					}
				},
				clearDB: function(e) {
					if(this.db) {
						var t = this.getStore();
						if(!e) return void t.clear();
						var n = Date.now() - 24 * (e || 2) * 3600 * 1e3,
							i = t.openCursor();
						i.onsuccess = function(e) {
							var i = e.target.result;
							i && (i.value.time < n || !i.value.time) && (t["delete"](i.primaryKey), i["continue"]())
						}
					}
				},
				getStore: function() {
					var e = this.db.transaction("logs", "readwrite");
					return e.objectStore("logs")
				}
			},
			a = {
				isOBJByType: function(e, t) {
					return Object.prototype.toString.call(e) === "[object " + (t || "Object") + "]"
				},
				isOBJ: function(e) {
					var t = typeof e;
					return "object" === t && !!e
				},
				isEmpty: function(e) {
					return null === e || !a.isOBJByType(e, "Number") && !e
				},
				extend: function(e, t) {
					for(var n in t) e[n] = t[n];
					return e
				},
				processError: function(e) {
					try {
						if(e.stack) {
							var t = e.stack.match("https?://[^\n]+");
							t = t ? t[0] : "";
							var n = t.match(":(\\d+):(\\d+)");
							n || (n = [0, 0, 0]);
							var i = a.processStackMsg(e);
							return {
								msg: i,
								rowNum: n[1],
								colNum: n[2],
								target: t.replace(n[0], ""),
								_orgMsg: e.toString()
							}
						}
						return e.name && e.message && e.description ? {
							msg: JSON.stringify(e)
						} : e
					} catch(o) {
						return e
					}
				},
				processStackMsg: function(e) {
					var t = e.stack.replace(/\n/gi, "").split(/\bat\b/).slice(0, 9).join("@").replace(/\?[^:]+/gi, ""),
						n = e.toString();
					return t.indexOf(n) < 0 && (t = n + "@" + t), t
				},
				isRepeat: function(e) {
					if(!a.isOBJ(e)) return !0;
					var t = e.msg,
						i = n[t] = (parseInt(n[t], 10) || 0) + 1;
					return i > o.repeat
				}
			},
			c = e.onerror;
		e.onerror = function(t, n, i, o, r) {
			var s = t;
			r && r.stack && (s = a.processStackMsg(r)), a.isOBJByType(s, "Event") && (s += s.type ? "--" + s.type + "--" + (s.target ? s.target.tagName + "::" + s.target.src : "") : ""), g.push({
				msg: s,
				target: n,
				rowNum: i,
				colNum: o,
				_orgMsg: t
			}), m(), c && c.apply(e, arguments)
		};
		var s = function(e, t) {
				var n = [],
					i = [],
					r = [];
				if(a.isOBJ(e)) {
					e.level = e.level || o.level;
					for(var c in e) {
						var s = e[c];
						if(!a.isEmpty(s)) {
							if(a.isOBJ(s)) try {
								s = JSON.stringify(s)
							} catch(u) {
								s = "[BJ_REPORT detect value stringify error] " + u.toString()
							}
							r.push(c + ":" + s), n.push(c + "=" + encodeURIComponent(s)), i.push(c + "[" + t + "]=" + encodeURIComponent(s))
						}
					}
				}
				return [i.join("&"), r.join(","), n.join("&")]
			},
			u = [],
			l = function(e, t) {
				return t = a.extend({
					id: o.id,
					uin: o.uin,
					time: new Date - 0
				}, t), r.db ? void r.addLog(t) : (r.db || u.length || r.ready(function(e, t) {
					t && u.length && (t.addLogs(u), u = [])
				}), void u.push(t))
			},
			p = function() {
				var e = document.createElement("script");
				e.src = o.offline_auto_url || o.url.replace(/badjs$/, "offlineAuto") + "?id=" + o.id + "&uin=" + o.uin, window._badjsOfflineAuto = function(e) {
					e && i.reportOfflineLog()
				}, document.head.appendChild(e)
			},
			d = [],
			f = 0,
			h = function() {
				if(clearTimeout(f), d.length) {
					var e = o._reportUrl + d.join("&") + "&count=" + d.length + "&_t=" + +new Date;
					if(o.submit) o.submit(e);
					else {
						var t = new Image;
						t.src = e
					}
					f = 0, d = []
				}
			},
			m = function(e) {
				if(o._reportUrl) {
					for(var n = Math.random() >= o.random; t.length;) {
						var i = !1,
							r = t.shift();
						if(r.msg = (r.msg + "" || "").substr(0, 500), !a.isRepeat(r)) {
							var c = s(r, d.length);
							if(a.isOBJByType(o.ignore, "Array"))
								for(var u = 0, p = o.ignore.length; u < p; u++) {
									var m = o.ignore[u];
									if(a.isOBJByType(m, "RegExp") && m.test(c[1]) || a.isOBJByType(m, "Function") && m(r, c[1])) {
										i = !0;
										break
									}
								}
							i || (o.offlineLog && l("badjs_" + o.id + o.uin, r), n || 20 == r.level || (d.push(c[0]), o.onReport && o.onReport(o.id, r)))
						}
					}
					e ? h() : f || (f = setTimeout(h, o.delay))
				}
			},
			g = e.BJ_REPORT = {
				push: function(e) {
					var n = a.isOBJ(e) ? a.processError(e) : {
						msg: e
					};
					if(o.ext && !n.ext && (n.ext = o.ext), n.from || (n.from = location.href), n._orgMsg) {
						var i = n._orgMsg;
						delete n._orgMsg, n.level = 2;
						var r = a.extend({}, n);
						r.level = 4, r.msg = i, t.push(n), t.push(r)
					} else t.push(n);
					return m(), g
				},
				report: function(e, t) {
					return e && g.push(e), t && m(!0), g
				},
				info: function(e) {
					return e ? (a.isOBJ(e) ? e.level = 2 : e = {
						msg: e,
						level: 2
					}, g.push(e), g) : g
				},
				debug: function(e) {
					return e ? (a.isOBJ(e) ? e.level = 1 : e = {
						msg: e,
						level: 1
					}, g.push(e), g) : g
				},
				reportOfflineLog: function() {
					return window.indexedDB ? void r.ready(function(e, t) {
						if(t) {
							var n = new Date - 0 - 24 * o.offlineLogExp * 3600 * 1e3,
								i = new Date - 0;
							t.getLogs({
								start: n,
								end: i,
								id: o.id,
								uin: o.uin
							}, function(e, t) {
								var r = document.createElement("iframe");
								r.name = "badjs_offline_" + (new Date - 0), r.frameborder = 0, r.height = 0, r.width = 0, r.src = "javascript:false;", r.onload = function() {
									var e = document.createElement("form");
									e.style.display = "none", e.target = r.name, e.method = "POST", e.action = o.offline_url || o.url.replace(/badjs$/, "offlineLog"), e.enctype.method = "multipart/form-data";
									var a = document.createElement("input");
									a.style.display = "none", a.type = "hidden", a.name = "offline_log", a.value = JSON.stringify({
										logs: t,
										userAgent: navigator.userAgent,
										startDate: n,
										endDate: i,
										id: o.id,
										uin: o.uin
									}), r.contentDocument.body.appendChild(e), e.appendChild(a), e.submit(), setTimeout(function() {
										document.body.removeChild(r)
									}, 1e4), r.onload = null
								}, document.body.appendChild(r)
							})
						}
					}) : void i.info("unsupport offlineLog")
				},
				offlineLog: function(e) {
					return e ? (a.isOBJ(e) ? e.level = 20 : e = {
						msg: e,
						level: 20
					}, g.push(e), g) : g
				},
				init: function(e) {
					if(a.isOBJ(e))
						for(var n in e) o[n] = e[n];
					var i = parseInt(o.id, 10);
					return i && (/qq\.com$/gi.test(location.hostname) && (o.url || (o.url = "//badjs2.qq.com/badjs"), o.uin || (o.uin = parseInt((document.cookie.match(/\buin=\D+(\d+)/) || [])[1], 10))), o._reportUrl = (o.url || "/badjs") + "?id=" + i + "&uin=" + o.uin + "&"), t.length && m(), r._initing || (r._initing = !0, r.ready(function(e, t) {
						t && setTimeout(function() {
							t.clearDB(o.offlineLogExp), setTimeout(function() {
								o.offlineLogAuto && p()
							}, 5e3)
						}, 1e3)
					})), g
				},
				__onerror__: e.onerror
			};
		return "undefined" != typeof console && console.error && setTimeout(function() {
			var e = ((location.hash || "").match(/([#&])BJ_ERROR=([^&$]+)/) || [])[2];
			e && console.error("BJ_ERROR", decodeURIComponent(e).replace(/(:\d+:\d+)\s*/g, "$1\n"))
		}, 0), g
	}(window);
	e.exports = i
}, function(e, t, n) {
	(function(e) {
		var t = n(82),
			i = n(90);
		! function(o) {
			function r(t) {
				var n = e.get(t, "data") || {};
				return n.o + "." + n.m
			}

			function a(e) {
				return f.each(e, function(t, n) {
					"boolean" == f.type(n) && (e[t] = n ? 1 : 0)
				}), e
			}

			function c(e, t) {
				t.url && (t.action = t.url, delete t.url), t.method = "post";
				var n = f("<form>").attr(t).hide();
				return f.each(e, function(e, t) {
					f("<input>").attr({
						type: "hidden",
						name: e,
						value: t
					}).appendTo(n)
				}), n[0]
			}

			function s(e) {
				return e && 32 != e.length ? o.utils.md5(e) : e
			}

			function u(e) {
				return function(t) {
					var n = f.Deferred(),
						i = Object.prototype.toString.call(t).replace(/\[object (\w+)\]$/, "$1");
					return "Array" == i && (t = {
						errno: 0,
						data: t
					}), t.errno.toString().indexOf("login_captcha") == -1 ? t.errno = parseInt(t.errno, 10) : t.errno = o.ERROR.CAPTCHA_INVALID.errno, t.errno === e ? n.resolve(t) : (t.errmsg = o.utils.getErrorMsg(t.errno, t.errmsg || t.msg || ""), n.reject(t)), n.promise()
				}
			}

			function l(e, t) {
				f.each(t, function(t, n) {
					void 0 !== e[t] && (e[n] = e[t], delete e[t])
				})
			}

			function p() {
				v = null
			}
			var d = n(13).getLogger("request"),
				f = o.$,
				h = !1,
				m = ["360.cn", "360pay.cn", "so.com", "qiku.com", "360shouji.com"],
				g = function(e, t, n) {
					n = n || "https" == o.getConfig("protocol").toLowerCase();
					var i = this.protocol = n && !h ? "https" : "http",
						r = {
							src: o.getConfig("src"),
							from: o.getConfig("src"),
							charset: o.getConfig("charset"),
							requestScema: i
						},
						c = {
							url: i + "://login.360.cn",
							type: "GET",
							dataType: "jsonp",
							timeout: 2e4
						};
					e = e || {}, t = t || {}, this.protocol = i, this.param = f.extend(r, a(e)), this.ajaxOpt = f.extend({
						data: this.param
					}, c, t), this.I360 = i + "://i.360.cn"
				};
			f.extend(g.prototype, {
				get: function(e) {
					var t = this,
						n = f.ajax(e, this.ajaxOpt),
						i = this.ajaxOpt.data.m,
						o = QHPass.getConfig("mainDomain", []),
						a = e ? e.replace(/(http|https):\/\/login./gi, "") : "";
					return n.done(function(e) {
						d.debug("get", r(t.ajaxOpt), t.ajaxOpt, e)
					}), n.then(this.done, function(n) {
						if("setcookie" == i && f.inArray(a, o) == -1) {
							var r = {
								errno: 0,
								errmsg: "",
								domain: "not mainDomain"
							};
							return t.done(r)
						}
						return t.fail({
							method: "get",
							url: e,
							status: n
						})
					})
				},
				post: function(e) {
					var t = this,
						n = f.Deferred(),
						i = null,
						a = o.utils.getGuid(),
						s = "QiUserJsonp" + a,
						u = "QucI360Form" + a,
						l = "QucI360Iframe" + a,
						p = f('<iframe name="' + l + '">').hide(),
						h = f.extend({}, this.param, {
							proxy: o.getConfig("proxy"),
							callback: s,
							func: s
						}),
						m = c(h, {
							name: u,
							target: l,
							url: e || this.ajaxOpt.url
						});
					return window[s] = function(e) {
						clearTimeout(i);
						var o;
						for(var a in e) e.hasOwnProperty(a) && (o = decodeURIComponent(e[a]), o.match(/^(\{.*\})|(\[.*\])$/) && (o = f.parseJSON(o)), e[a] = o);
						n.resolve(e), d.debug("post", r(t.ajaxOpt), t.ajaxOpt, e)
					}, i = setTimeout(function() {
						n.reject({
							method: "post",
							url: e,
							status: {
								status: 0,
								statusText: "post \u8bf7\u6c42\u8d85\u65f6"
							}
						})
					}, this.ajaxOpt.timeout), n.always(function(e) {
						try {
							delete window[s]
						} catch(t) {
							window[s] = null
						}
					}), f(document.body).append(p).append(m), f(m).submit(), n.then(this.done, o.utils.bind(this.fail, this))
				},
				done: u(0),
				fail: function(e) {
					if("https" == this.protocol && "http:" == location.protocol && o.getConfig("retryWithHttp", !0)) return "sso" == this.ajaxOpt.data.o && "getToken" == this.ajaxOpt.data.m && (h = !0), this.retryHttp(e);
					var t = f.Deferred();
					return t.reject({
						errno: 999999,
						errmsg: "string" == f.type(e) ? e : "\u7f51\u7edc\u9519\u8bef"
					}), o.events.trigger("error.sync", e.url || this.ajaxOpt.url), t.promise()
				},
				getDomainApi: function(e) {
					return e = e || location.hostname.replace(/^(?:.+\.)?(\w+\.\w+)$/, "$1"), this.protocol + "://login." + e
				},
				retryHttp: function(e) {
					this.protocol = "http", this.ajaxOpt.url = this.ajaxOpt.url.replace(/^https/, "http"), this.I360 = "http://i.360.cn";
					var t = e.url && e.url.replace(/^https/, "http");
					return o.events.trigger("retryHttp.sync", t || this.ajaxOpt.url), this[e.method](t)
				}
			});
			var v = null;
			o.getUserInfoCache = function() {
				return v
			}, o.sync = {
				getRd: function() {
					var e = new g({
						o: "sso",
						m: "getRd"
					});
					return e.done = function(e) {
						var t = f.Deferred();
						return e.rd ? t.resolve(e) : t.reject({
							errno: "999999",
							errmsg: "\u8bf7\u767b\u5f55\u5e10\u53f7"
						}), t.promise()
					}, e.get()
				},
				getToken: function(e) {
					var t = new g({
						o: "sso",
						m: "getToken",
						userName: e
					}, {
						jsonp: "func"
					}, (!0));
					return t.get()
				},
				actualGetUserInfo: function(t) {
					t = e.extend({
						o: "sso",
						m: "info"
					}, t);
					var n = new g(t);
					return n.done = function(e) {
						var t = f.Deferred();
						return t.resolve(e)
					}, n.get()
				},
				getUserInfo: function(e, t) {
					var n = o.getConfig("headSize", "100_100"),
						i = o.getConfig("currentDomain", ""),
						r = {
							"20_20": "a",
							"48_48": "s",
							"50_50": "e",
							"64_64": "m",
							"70_70": "i",
							"100_100": "b",
							"150_150": "q"
						};
					if(void 0 === e ? e = !0 : "boolean" != f.type(e) && (t = e, e = !1), e && v && void 0 === t) return f.Deferred().resolve(v).promise();
					var a = new g({
						o: "sso",
						m: "info",
						show_name_flag: "1",
						head_type: r[n]
					});
					return a.done = function(e) {
						var n = f.Deferred();
						return e.qid ? (void 0 === t && (v = e), n.resolve(e)) : n.reject({
							errno: "999999",
							errmsg: "\u65e0\u6cd5\u83b7\u53d6\u767b\u5f55\u72b6\u6001"
						}), n.promise()
					}, o.getConfig("ignoreCookie") ? a.get() : i && o.utils.getCookie("Q") ? a.get(a.getDomainApi(i)) : o.utils.getCookie("Q") ? a.get(a.getDomainApi(t)) : f.Deferred().reject(o.ERROR.NOT_SIGNED_IN).promise()
				},
				getUserSecInfo: function(e) {
					var t = new g({
						crumb: e
					});
					return t.get(t.I360 + "/security/getUserSecInfo")
				},
				getIdentifyMethod: function(e, t) {
					var n = {
							o: "User",
							m: "getSecWays",
							crumb: e,
							sensop: t
						},
						i = new g(n);
					return i.post()
				},
				checkWeakPwd: function(e) {
					var t = new g({
						password: s(e)
					});
					return t.get(t.I360 + "/reg/checkWeakPwd")
				},
				modifyPassword: function(e, t) {
					var n = new g({
						o: "user",
						m: "modifyPwd",
						newPwd: s(t),
						rePwd: s(t),
						crumb: e
					}, {}, (!0));
					return n.post()
				},
				getCaptchaUrl: function(e) {
					var t = o.getConfig("captchaAppId", "i360"),
						n = new g({
							captchaScene: e,
							captchaApp: t
						});
					return n.get(n.I360 + "/QuCapt/getQuCaptUrl")
				},
				checkEmailExist: function(e) {
					var t = new g({
						o: "User",
						m: "checkemail",
						loginEmail: e
					});
					return t.done = u(202), t.get()
				},
				checkUsernameExist: function(e) {
					var t = new g({
						o: "User",
						m: "checkuser",
						userName: e
					});
					return t.done = u(1e4), t.get()
				},
				checkNicknameExist: function(e) {
					var t = new g({
						o: "User",
						m: "checknickname",
						nickName: e
					});
					return t.done = u(259), t.get()
				},
				checkMobileNumberExist: function(e, t, n) {
					e = t ? t + e : e, n = n || "";
					var i = new g({
						o: "User",
						m: "checkmobile",
						mobile: e,
						type: n
					});
					return i.get()
				},
				checkEmailStatus: function(e) {
					var t = new g({
						crumb: e
					});
					return t.get(t.I360 + "/active/checkLoginEmailStatus")
				},
				getMobileState: function() {
					var e = new g({
						o: "user",
						m: "getStateList",
						quc_lang: ""
					});
					return e.get()
				},
				checkMobileLogin: function(e) {
					var t = new g({
						o: "user",
						m: "checkLoginMethod",
						acctype: 2,
						lm: 1,
						account: e
					});
					return t.get()
				},
				checkSignUpCaptchaRequired: function() {
					var e = new g({
						captchaApp: o.getConfig("captchaAppId", "i360")
					});
					return e.get(e.I360 + "/reg/checkcap")
				},
				checkSignInCaptchaRequired: function(e) {
					var t = {
							o: "sso",
							m: "checkNeedCaptcha",
							account: e,
							captchaApp: o.getConfig("captchaAppId", "i360")
						},
						n = new g(t);
					return n.get()
				},
				identify: function(e, t, n, i, o) {
					var r = {
						o: "User",
						m: "checkSecWay",
						crumb: e,
						vtype: n,
						sensop: t
					};
					"pwd" == n && (i = s(i), r.captcha = o), r.vc = i;
					var a = new g(r, {}, (!0));
					return a.post()
				},
				setUsername: function(e, t) {
					var n = new g({
						o: "User",
						m: "modifyUserName",
						userName: t,
						crumb: e
					}, {}, (!0));
					return n.post().done(function() {
						p()
					})
				},
				setNickname: function(e, t) {
					var n = new g({
						o: "User",
						m: "modifyNickName",
						nickName: t,
						crumb: e
					}, {}, (!0));
					return n.post().done(function() {
						p()
					})
				},
				setEmail: function(e, t) {
					var n = new g({
						crumb: e,
						loginEmail: t
					}, {}, (!0));
					return n.post(n.I360 + "/active/doSetLoginEmail").done(function() {
						p()
					})
				},
				setSecEmail: function(e, t) {
					var n = new g({
						crumb: e,
						secemail: t
					}, {}, (!0));
					return n.post(n.I360 + "/profile/dosetsecemail").done(function() {
						p()
					})
				},
				setLoginMethod: function(e, t) {
					var n = new g({
						o: "user",
						m: "modifyLoginMethod",
						loginMethod: 1,
						crumb: e,
						toValue: t
					}, {}, (!0));
					return n.post().done(function() {
						p()
					})
				},
				setCookie: function(e, t) {
					d.debug("set cookie", e, t);
					var n = o.getConfig("supportHttps", m),
						i = "https" == o.getConfig("protocol", null).toLowerCase();
					e = decodeURIComponent(e), void 0 === t ? t = o.getConfig("domainList", []) : f.isArray(t) || (t = [t]);
					var r, a = [];
					return f.each(t, function(t, o) {
						f.inArray(o, n) > -1 ? (r = new g({
							o: "sso",
							m: "setcookie",
							s: e
						}, {
							jsonp: "func"
						}, (!0)), a.push(r.get(r.getDomainApi(o)))) : i || (r = new g({
							o: "sso",
							m: "setcookie",
							s: e
						}, {
							jsonp: "func"
						}), a.push(r.get(r.getDomainApi(o))))
					}), f.when.apply(f, a)
				},
				sendSmsTokenNeedPhrase: function(e, t, n, i, r, a) {
					var c = "";
					"boolean" == typeof e && (n = t, t = e, i = n, r = i, e = null), "login" == a ? c = 0 : "reg" == a && (c = 2);
					var s = t ? 1 : 2,
						u = {
							condition: s,
							account: n,
							crumb: e,
							sms_scene: c,
							captcha: i,
							vt: r
						};
					return o.sync.sendSmsCodeNew(u)
				},
				sendSmsCodeNew: function(t) {
					t = e.extend({
						o: "User",
						m: "sendSmsCodeNew"
					}, t);
					var n = new g(t);
					return n.post()
				},
				bindMobileCheck: function(e) {
					var t = {
							o: "User",
							mobile: e,
							m: "bindMobileCheck"
						},
						n = new g(t);
					return n.get()
				},
				sendSmsToken: function(t, n, o, r) {
					var a = "";
					"boolean" == typeof t && (o = n, n = t, t = null), "object" == typeof o && (o = o.areaCode + o.mobileNumber), "findpwd" == r ? a = i.SMS_SCENE_FINDPWD : "bindmobile" == r ? a = i.SMS_SCENE_BIND_MOBILE : "modifyPwd" == r ? a = i.SMS_SCENE_MODIFY_PASS : "setSecEmail" == r ? a = i.SMS_SCENE_SET_SECEMAIL : "setLoginEmail" == r ? a = i.SMS_SCENE_SET_EMAIL : "delMobile" == r ? a = i.SMS_SCENE_UNBIND_MOBILE : "modifyMobile" == r ? a = i.SMS_SCENE_MODIFY_MOBILE : "modifyLoginEmail" == r ? a = i.SMS_SCENE_MODIFY_EMAIL : "modifySecEmail" == r ? a = i.SMS_SCENE_MODIFY_SECEMAIL : "cancelAccount" == r && (a = i.SMS_SCENE_CANCEL_ACCOUNT);
					var c;
					c = e.isNumber(n) ? n : n ? 1 : 2;
					var s = {
							o: "User",
							m: "sendSmsCode",
							condition: c,
							account: o,
							crumb: t,
							sms_scene: a
						},
						u = new g(s);
					return u.post()
				},
				sendEmailToken: function(e, t) {
					var n = {
							o: "User",
							m: "sendEmsCode",
							condition: 1,
							crumb: e,
							vtype: t
						},
						i = new g(n);
					return i.post()
				},
				sendActivationEmail: function(e) {
					var t = new g({
						crumb: e
					});
					return t.post(t.I360 + "/active/doSendActiveEmail")
				},
				sendSecActivationEmail: function(e) {
					var t = new g({
						crumb: e
					});
					return t.post(t.I360 + "/profile/resendSecurityEmail")
				},
				sendSignUpActivationEmail: function(e) {
					var t = new g;
					return t.get(e)
				},
				bindMobile: function(e, t, n) {
					t = t.areaCode + t.mobileNumber;
					var i = new g({
						o: "user",
						m: "bindMobile",
						crumb: e,
						mobile: t,
						smscode: n
					}, {}, (!0));
					return i.post().done(function() {
						p()
					})
				},
				bindMobileNew: function(e, t, n, i) {
					t = t.areaCode + t.mobileNumber;
					var o = new g({
						o: "user",
						m: "bindMobileNew",
						crumb: e,
						mobile: t,
						smscode: n,
						force_bind: i ? 1 : 0
					}, {}, (!0));
					return o.post().done(function() {
						p()
					})
				},
				signUp: function(e) {
					var n = {
						captchaFlag: !0,
						captchaApp: o.getConfig("captchaAppId", "i360"),
						smDeviceId: t.getShumeiDeviceId()
					};
					e = f.extend(n, e), e.password = s(e.password), e.passwordAgain = s(e.passwordAgain) || e.password, l(e, {
						emailActiveFlag: "loginEmailActiveFlag",
						passwordAgain: "rePassword",
						smsToken: "smscode",
						nickname: "nickName",
						username: "userName",
						agreeLicence: "is_agree"
					});
					var i = new g(e, {}, (!0));
					return i.post(i.I360 + "/reg/doregAccount").done(function() {
						p()
					})
				},
				signIn: function(e) {
					var n = {
						o: "sso",
						m: "login",
						lm: "mobile" == e.type ? 1 : 0,
						captFlag: 1,
						rtype: "data",
						validatelm: o.getConfig("signIn.mobile.isMustUseMobileSignIn", !1) ? 1 : 0,
						isKeepAlive: !1,
						captchaApp: o.getConfig("captchaAppId", "i360"),
						userName: e.account,
						smDeviceId: t.getShumeiDeviceId()
					};
					return "mobile" == e.type ? e.acctype = 2 : e.password = s(e.password), f.when().then(function() {
						return e.token || o.sync.getToken(e.account).done(function(t) {
							e.token = t.token
						})
					}).then(function() {
						var t = new g(f.extend(n, e), {}, (!0));
						return t.post().done(function() {
							p()
						})
					})
				},
				signOut: function(e) {
					var t = o.getConfig("supportHttps", m),
						n = "https" == o.getConfig("protocol", null).toLowerCase();
					void 0 === e || e === !0 ? e = o.getConfig("domainList", []) : f.isArray(e) || (e = [e]);
					var i, r = [];
					return f.each(e, function(e, o) {
						f.inArray(o, t) > -1 ? (i = new g({
							o: "sso",
							m: "logout"
						}, {
							jsonp: "func"
						}, (!0)), r.push(i.get(i.getDomainApi(o)))) : n || (i = new g({
							o: "sso",
							m: "logout"
						}, {
							jsonp: "func"
						}), r.push(i.get(i.getDomainApi(o))))
					}), p(), f.when.apply(f, r)
				},
				fillProfile: function(e, t, n, i, o) {
					i = i || n;
					var r = new g({
						o: "User",
						m: "perfectInfo",
						crumb: e,
						userName: t,
						captcha: o,
						password: s(n),
						rePassword: s(i)
					}, {}, (!0));
					return r.post().done(function() {
						p()
					})
				},
				perfectMobile: function(e, t, n, i, o) {
					var r = new g({
						o: "user",
						m: "perfectMobile",
						crumb: e,
						mobile: t,
						password: s(n),
						rePassword: s(n),
						smscode: i,
						force_bind: o ? 1 : 0
					}, {});
					return r.post()
				},
				checkQrCodeSignInStatus: function() {
					var e = o.getConfig("currentDomain", ""),
						t = new g({
							o: "sso",
							m: "qrLogin"
						}, {
							jsonp: "func"
						});
					return t.get(t.getDomainApi(e))
				},
				getAuthenticationStatus: function(e) {
					var t = new g({
						o: "User",
						m: "getShiMingStatus",
						crumb: e
					});
					return t.get()
				},
				submitAuthenMobile: function(e, t, n) {
					var i = new g({
						o: "User",
						m: "verifyShiMingCaptcha",
						mobile: e,
						captcha: t,
						crumb: n
					}, {}, (!0));
					return i.post()
				},
				fillAuthenInfo: function(e, t, n) {
					var i = new g({
						o: "User",
						m: "verifyShiMingSmsCode",
						vt: e,
						vc: t,
						crumb: n
					}, {}, (!0));
					return i.post()
				},
				authSendSmsToken: function(e, t) {
					var n = new g({
						o: "User",
						m: "sendShiMingSmsCode",
						crumb: e,
						vt: t
					}, {}, (!0));
					return n.post()
				}
			};
			var q = {};
			f.each(o.sync, function(e, t) {
				var n = function() {
					var n = arguments[0],
						i = e + (f.isPlainObject(n) ? o.utils.JSON.stringify(n) : [].join.apply(arguments)),
						r = q[i];
					return r ? q[i] : (r = q[i] = t.apply(o.sync, arguments), r.always(function() {
						delete q[i]
					}), r)
				};
				n.funcName = t.funcName = "sync." + e, o.sync[e] = n
			})
		}(QHPass)
	}).call(t, n(1))
}, function(e, t) {
	t.SMS_CONDITION_ALWAYS = 0, t.SMS_CONDITION_EXIST = 1, t.SMS_CONDITION_NOT_EXIST = 2, t.SMS_SCENE_LOGIN = 0, t.SMS_SCENE_FINDPWD = 1, t.SMS_SCENE_REG = 2, t.SMS_SCENE_BIND_MOBILE = 5, t.SMS_SCENE_UNBIND_MOBILE = 6, t.SMS_SCENE_MODIFY_MOBILE = 7, t.SMS_SCENE_SET_EMAIL = 8, t.SMS_SCENE_MODIFY_EMAIL = 9, t.SMS_SCENE_MODIFY_PASS = 10, t.SMS_SCENE_CANCEL_ACCOUNT = 11, t.SMS_SCENE_OAUTH_BIND_MOBILE = 12, t.SMS_SCENE_MODIFY_SECEMAIL = 13, t.SMS_SCENE_SET_SECEMAIL = 14, t.SMS_SCENE_OTHER = 99
}, function(e, t, n) {
	! function(e) {
		var t = n(13).getLogger("config"),
			i = e.$,
			o = {
				charset: document.charset || document.defaultCharset || document.characterSet || "UTF-8",
				domainList: ["360pay.cn", "so.com", "haosou.com", "360.cn", "360.com", "qiku.com", "360shouji.com"],
				protocol: location.protocol.replace(":", ""),
				proxy: location.protocol + "//" + location.host + "/psp_jump.html",
				ignoreCookie: !1
			};
		e.getConfig = function(e, n) {
			n = void 0 !== n ? n : null;
			for(var r, a = o, c = e.split("."); c.length > 0;)
				if(r = c.shift(), 0 != r.length) {
					if(void 0 === a[r] || c.length > 0 && !i.isPlainObject(a[r])) return n;
					a = a[r]
				}
			var s = i.isPlainObject(a) ? i.extend({}, a) : a;
			return t.verbose("get config", {
				key: e,
				value: s
			}), s
		}, e.setConfig = function(t, n) {
			if(!t) return e.events.trigger("warn.config", "setConfig parameter key is null or undefined"), e;
			if(i.isPlainObject(t)) return r(!0, o, t), e;
			for(var a, c, s = o, u = t.split("."), l = !1; u.length > 0;) {
				if(c = u.shift(), void 0 === s[c] && (s[c] = {}), !i.isPlainObject(s[c]) && u.length > 0) {
					l = !0;
					break
				}
				a = s, s = s[c]
			}
			return l ? e.events.trigger("warn.config", "setConfig cannot be set on " + t) : a[c] = n, e
		};
		var r = function() {
			var e, t, n, o, a, c = arguments[0] || {},
				s = 1,
				u = arguments.length,
				l = !1;
			for("boolean" == typeof c && (l = c, c = arguments[1] || {}, s = 2), "object" == typeof c || i.isFunction(c) || (c = {}); s < u; s++)
				if(null != (o = arguments[s]))
					for(n in o) e = c[n], t = o[n], c !== t && (l && t && i.isPlainObject(t) ? (a = e && i.isPlainObject(e) ? e : {}, c[n] = r(l, a, t)) : void 0 !== t && (c[n] = t));
			return c
		}
	}(QHPass)
}, function(e, t, n) {
	! function(e) {
		var t = n(13).getLogger("events"),
			i = e.$,
			o = i({});
		e.events = {
			trigger: function(e, n) {
				t.debug("trigger", e), e = e.toLowerCase(), o.triggerHandler(e, n);
				var i = e.match(/^([^.]+)\.(.*)$/);
				i && (e = i[1] + ".\\*", n = {
					namespace: i[2],
					data: n
				}, o.triggerHandler(e, n))
			},
			getHandler: function(e) {
				e = e.toLowerCase(e + "");
				var t = e.split("."),
					n = t[0],
					r = i._data(o[0]).events,
					a = r[n];
				return a
			}
		}, i.each(["on", "off", "one"], function(t, n) {
			e.events[n] = function() {
				var t, r, a = [].slice.apply(arguments);
				a[0] = a[0].toLowerCase(), a[0].match(/\.\*$/) && (r = a.pop(), t = function(e, t) {
					e.namespace = e.namespace.replace(/\\\*/, t.namespace), e.isWildcard = !0, r.call(this, e, t.data)
				}, t.guid = r.guid || (r.guid = e.utils.getGuid()), a.push(t)), i.fn[n].apply(o, a)
			}
		})
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = e.utils,
			i = parseInt((new Date).getTime().toString().substr(4), 10);
		n.isExisted = function(e) {
			var t = e.length;
			return t > 0
		}, n.getGuid = function() {
			return i++
		};
		var o = "quc-ie-placeholder";
		if(n.initPlaceholder = function(e) {
				t(e).placeholder({
					customClass: o
				})
			}, n.resetPlaceholder = function(e) {
				t(e).each(function() {
					var e = t(this);
					e.hasClass(o) && (e.removeData("placeholderEnabled"), e.val(""), e.removeClass(o), e.data("placeholder-password") && e.remove())
				})
			}, n.parseCallback = function(e) {
				return "function" == t.type(e) ? e : e === !0 ? function() {
					location.reload()
				} : "string" == t.type(e) && 0 === e.indexOf("http") ? function() {
					location.href = e
				} : function() {}
			}, n.setCookie = function(e, t, n) {
				var i = new Date;
				n = void 0 !== n ? n : 2, i.setTime(i.getTime() + 864e5 * n), document.cookie = e + "=" + encodeURIComponent(t) + ";expires=" + i.toGMTString() + ";path=/"
			}, n.getCookie = function(e) {
				var t = null,
					n = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
					i = document.cookie.match(n);
				return i && (t = decodeURIComponent(i[2])), t
			}, n.throttle = function(e, t, n, i) {
				var o, r, a, c = +new Date,
					s = 0,
					u = 0,
					l = null,
					p = function() {
						u = c, e.apply(r, a)
					};
				return function() {
					c = +new Date, r = this, a = arguments, o = c - (i ? s : u) - t, clearTimeout(l), i ? n ? l = setTimeout(p, t) : o >= 0 && p() : o >= 0 ? p() : n && (l = setTimeout(p, -o)), s = c
				}
			}, n.debounce = function(e, t, i) {
				return n.throttle(e, t, i, !0)
			}, n.bind = function(e, n) {
				if(e.bind && e.bind === Function.prototype.bind) return e.bind(n);
				if(!t.isFunction(e)) throw new TypeError;
				var i = [].slice.call(arguments, 2),
					o = function() {
						var t = [].slice.apply(arguments);
						if(!(this instanceof o)) return e.apply(n, i.concat(t));
						var r = function() {};
						r.prototype = e.prototype;
						var a = new r;
						r.prototype = null;
						var c = e.apply(a, i.concat(t));
						return Object(c) === c ? c : a
					};
				return o
			}, n.initInputId = function(e) {
				t(e).find(".quc-input:not([id])").each(function(e, i) {
					var o = t(i),
						r = o.parent();
					if(r = "LABEL" == r[0].tagName ? r : r.siblings("label"), r.length) {
						var a = "quc_" + o.attr("name") + "_" + n.getGuid();
						o.attr("id", a), r.attr("for", a)
					}
				})
			}, n.selectText = function(e, n, i) {
				var o = t(e),
					r = o.val().length;
				for(n = parseInt(n) || 0, i = parseInt(i) || r; n < 0;) n += r;
				o.each(function(e, t) {
					if(t.createTextRange) {
						var o = t.createTextRange();
						o.collapse(!0), o.moveStart("character", n), o.moveEnd("character", i), o.select()
					} else if(t.setSelectionRange) t.setSelectionRange(n, i);
					else {
						if(!t.selectionStart) return !1;
						t.selectionStart = n, t.selectionEnd = i
					}
				}), o.focus()
			}, n.JSON = {
				parse: t.parseJSON,
				stringify: window.JSON && JSON.stringify ? JSON.stringify : function(e) {
					var n = function(e) {
							var i = typeof e,
								o = t.isArray(e);
							if("string" == i) return '"' + e.replace(/"/g, '"') + '"';
							if("number" == i || "boolean" == i) return e;
							if(o || t.isPlainObject(e)) {
								var r = t.map(e, function(e, t) {
									return o ? n(e) : '"' + t.toString().replace(/"/g, '"') + '":' + n(e)
								}).join();
								return o ? "[" + r + "]" : "{" + r + "}"
							}
							return null
						},
						i = n(e);
					return i && i.toString()
				}
			}, n.support = t.extend({
				fixed: !1
			}, t.support), t(function() {
				try {
					var e = t(document.body),
						i = t("<div>").height(3e3),
						o = t("<div>").css({
							position: "fixed",
							top: 100
						}).html("x").appendTo(i),
						r = e.scrollTop();
					i.appendTo(e);
					var a = t(document.documentElement).position().top;
					a = a > 0 ? a : 0, e.scrollTop(500);
					var c = o[0].offsetTop;
					n.support.fixed = c - a === 100, i.remove(), e.scrollTop(r)
				} catch(s) {}
			}), n.browser = function() {
				var e = window.navigator,
					t = e.userAgent.toLowerCase(),
					n = /(msie|webkit|gecko|presto|opera|safari|firefox|chrome|maxthon|android|ipad|iphone|webos|hpwos|trident)[ \/os]*([\d_.]+)/gi,
					i = {
						platform: e.platform
					};
				if(t.replace(n, function(e, t, n) {
						i[t] || (i[t] = n)
					}), i.opera && t.replace(/opera.*version\/([\d.]+)/, function(e, t) {
						i.opera = t
					}), !i.msie && i.trident && t.replace(/trident\/[0-9].*rv[ :]([0-9.]+)/gi, function(e, t) {
						i.msie = t
					}), i.msie) {
					i.ie = i.msie;
					var o = parseInt(i.msie, 10);
					i["ie" + o] = !0
				}
				return i
			}(), n.browser.ie && n.browser.ie6) try {
			document.execCommand("BackgroundImageCache", !1, !0)
		} catch(r) {}
		e.events.on("afterShow.* DOMUpdated.*", function(e, t) {
			n.initInputId(t)
		})
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = window.document,
			i = {
				set: function(e, t) {
					localStorage.setItem(e, t)
				},
				get: function(e, t) {
					var n = localStorage.getItem(e);
					return null !== n ? n : t
				},
				remove: function(e) {
					localStorage.removeItem(e)
				}
			},
			o = {
				set: function(e, t) {
					sessionStorage.setItem(e, t)
				},
				get: function(e, t) {
					var n = sessionStorage.getItem(e);
					return null !== n ? n : t
				},
				remove: function(e) {
					sessionStorage.removeItem(e)
				}
			},
			r = {
				set: function(e, t, i) {
					i = i || {};
					var o = i.expires;
					"number" == typeof o && (o = new Date, o.setTime(o.getTime() + i.expires));
					try {
						return n.cookie = e + "=" + escape(t) + (o ? ";expires=" + o.toGMTString() : "") + (i.path ? ";path=" + i.path : "") + (i.domain ? "; domain=" + i.domain : ""), !0
					} catch(r) {
						return !1
					}
				},
				get: function(e, t) {
					try {
						var i = new RegExp("(^| )" + e + "=([^;]*)(;|$)"),
							o = n.cookie.match(i);
						if(o) return unescape(o[2])
					} catch(r) {}
					return t
				},
				remove: function(e) {
					this.set(e, null, -100)
				}
			},
			a = e.utils.isCookieEnabled = function() {
				if(!n.cookie && !navigator.cookieEnabled) return !1;
				var e = "test_cookie_enable",
					t = "test" + Math.random(),
					i = r.set(e, t);
				if(!i) return !1;
				var o = r.get(e);
				return r.remove(e), t == o
			},
			c = {
				storeName: "qucUserDataStore",
				init: function() {
					var i = this;
					if(!i.isInit) {
						i.isInit = !0;
						var o = i.object = t.extend(!0, {}, s);
						o.init(), t(function() {
							var r = "QhpassUserData",
								a = e.getConfig("proxy") + "?fun=" + r,
								c = t("<iframe>").attr("src", a).hide();
							t(n.body).append(c), window[r] = function() {
								clearTimeout(s), delete i.object;
								var e = c[0].contentWindow,
									n = e.document,
									r = i.store = n.createElement("input");
								setTimeout(function() {
									r.addBehavior("#default#userData"), n.body.appendChild(r), r.load(i.storeName), t.each(o.data, function(e, t) {
										r.setAttribute(e, t)
									}), r.save(i.storeName)
								}, 30)
							};
							var s = setTimeout(function() {
								c.remove()
							}, 2e4)
						})
					}
				},
				set: function(e, t) {
					this.object ? this.object.set(e, t) : (this.store.load(this.storeName), this.store.setAttribute(e, t), this.store.save(this.storeName))
				},
				get: function(e, t) {
					if(this.object) return this.object.get(e, t);
					this.store.load(this.storeName);
					var n = this.store.getAttribute(e);
					return null !== n ? n : t
				},
				remove: function(e) {
					this.object ? this.object.remove(e) : this.store.removeAttribute(e)
				}
			},
			s = {
				init: function() {
					this.data = this.data || {}
				},
				set: function(e, t) {
					this.data[e] = t
				},
				get: function(e, t) {
					var n = this.data[e];
					return void 0 !== n ? n : t
				},
				remove: function(e) {
					delete this.data[e]
				}
			},
			u = navigator.userAgent.toLowerCase(),
			l = u.match(/msie ([\d.]+)/),
			p = l && l[1],
			d = 6 == p || 7 == p;
		e.utils.storage = function(e) {
			var t;
			switch(e) {
				default:
					case "local":
					try {
					t = window.localStorage ? i : d ? c : s
				} catch(n) {
					t = s
				}
				break;
				case "session":
						try {
						t = window.sessionStorage ? o : s
					} catch(n) {
						t = s
					}
					break;
				case "cookie":
						t = a() ? r : s;
					break;
				case "page":
						t = s
			}
			return t.init && t.init(), t
		}, d && c.init()
	}(QHPass)
}, function(e, t, n) {
	(function(e) {
		! function(t) {
			var n = t.$ || window.$,
				i = '<a class="quc-link quc-link-login" href="http://i.360.cn/login" target="_blank">\u7acb\u5373\u767b\u5f55</a>',
				o = {
					REALNAME_EMPTY: {
						errno: 204,
						errmsg: "\u8bf7\u8f93\u5165\u60a8\u7684\u771f\u5b9e\u59d3\u540d",
						errmsg_en: "Please enter actual name"
					},
					REALNAME_INVALID: {
						errno: 227,
						errmsg: "\u8bf7\u786e\u8ba4\u60a8\u8f93\u5165\u7684\u771f\u5b9e\u59d3\u540d\u662f\u5426\u6709\u8bef",
						errmsg_en: "Actual name error"
					},
					ACCOUNT_EMPTY: {
						errno: 1030,
						errmsg: "\u8bf7\u8f93\u5165360\u5e10\u53f7",
						errmsg_en: "Please enter your account"
					},
					ACCOUNT_INVALID: {
						errno: 1035,
						errmsg: "\u8bf7\u786e\u8ba4\u60a8\u7684\u5e10\u53f7\u8f93\u5165\u662f\u5426\u6709\u8bef",
						errmsg_en: "Account error"
					},
					ACCOUNT_DUPLICATE: {
						errno: 1037,
						errmsg: "\u8be5\u5e10\u53f7\u5df2\u7ecf\u6ce8\u518c\uff0c" + i,
						errmsg_en: "Account occupied"
					},
					USERNAME_DUPLICATE: {
						errno: 213,
						errmsg: "\u7528\u6237\u540d\u5df2\u7ecf\u88ab\u4f7f\u7528\uff0c" + i,
						errmsg_en: "Username occupied"
					},
					USERNAME_EMPTY: {
						errno: 215,
						errmsg: "\u8bf7\u8f93\u5165\u7528\u6237\u540d",
						errmsg_en: "Please enter username"
					},
					USERNAME_INAPPROPRIATE: {
						errno: 225,
						errmsg: "\u7528\u6237\u540d\u5305\u542b\u4e0d\u9002\u5f53\u5185\u5bb9",
						errmsg_en: ""
					},
					USERNAME_INVALID: {
						errno: 199,
						errmsg: '\u7528\u6237\u540d\u5e94\u4e3a2-14\u4e2a\u5b57\u7b26,\u652f\u6301\u4e2d\u82f1\u6587\u3001\u6570\u5b57\u6216"_"',
						errmsg_en: "Username error"
					},
					USERNAME_NUMBER: {
						errno: 200,
						errmsg: "\u7528\u6237\u540d\u4e0d\u80fd\u5168\u4e3a\u6570\u5b57",
						errmsg_en: ""
					},
					NICKNAME_EMPTY: {
						errno: 205,
						errmsg: "\u8bf7\u8f93\u5165\u6635\u79f0",
						errmsg_en: "Please enter nickname"
					},
					NICKNAME_DUPLICATE: {
						errno: 260,
						errmsg: "\u6635\u79f0\u5df2\u7ecf\u88ab\u4f7f\u7528",
						errmsg_en: "Nickname occupied"
					},
					NICKNAME_INAPPROPRIATE: {
						errno: 226,
						errmsg: "\u6635\u79f0\u5305\u542b\u4e0d\u9002\u5f53\u5185\u5bb9",
						errmsg_en: ""
					},
					NICKNAME_NUMBER: {
						errno: 262,
						errmsg: "\u6635\u79f0\u4e0d\u80fd\u5168\u90e8\u662f\u6570\u5b57",
						errmsg_en: ""
					},
					NICKNAME_INVALID: {
						errno: 15e3,
						errmsg: '\u6635\u79f0\u5e94\u4e3a2-14\u4e2a\u5b57\u7b26,\u652f\u6301\u4e2d\u82f1\u6587\u3001\u6570\u5b57\u3001"_"\u6216"."',
						errmsg_en: ""
					},
					EMAIL_EMPTY: {
						errno: 203,
						errmsg: "\u8bf7\u8f93\u5165\u90ae\u7bb1",
						errmsg_en: "Please enter mail address"
					},
					EMAIL_INVALID: {
						errno: 1532,
						errmsg: "\u90ae\u7bb1\u683c\u5f0f\u6709\u8bef",
						errmsg_en: "E-mail format error"
					},
					EMAIL_NOT_ACTIVATED: {
						errno: 2e4
					},
					MOBILE_EMPTY: {
						errno: 1107,
						errmsg: "\u8bf7\u8f93\u5165\u624b\u673a\u53f7",
						errmsg_en: "Please enter phone number"
					},
					MOBILE_INVALID: {
						errno: 1100,
						errmsg: "\u624b\u673a\u53f7\u683c\u5f0f\u6709\u8bef",
						errmsg_en: "Phone number error"
					},
					MOBILE_DUPLICATE: {
						errno: 1106,
						errmsg: "\u8be5\u624b\u673a\u53f7\u5df2\u7ecf\u6ce8\u518c\uff0c" + i,
						errmsg_en: "Phone number occupied"
					},
					CAPTCHA_INVALID: {
						errno: 78e3,
						errmsg: "\u9a8c\u8bc1\u7801\u9519\u8bef\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "Please enter the verification code"
					},
					CAPTCHA_INVALID_OLD: {
						errno: 1670,
						errmsg: "\u9a8c\u8bc1\u7801\u9519\u8bef\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "Please enter the verification code"
					},
					CAPTCHA_EMPTY: {
						errno: 78002,
						errmsg: "\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801",
						errmsg_en: "Please enter the verification code"
					},
					CAPTCHA_APPID_INVALID: {
						errno: 1300,
						errmsg: "\u9a8c\u8bc1\u7801\u683c\u5f0f\u6709\u8bef",
						errmsg_en: "Incorrect Verification Code"
					},
					SMS_TOKEN_EMPTY: {
						errno: 1350,
						errmsg: "\u8bf7\u8f93\u5165\u6821\u9a8c\u7801",
						errmsg_en: "Please enter the verification code"
					},
					SMS_TOKEN_INCORRECT: {
						errno: 1351,
						errmsg: "\u6821\u9a8c\u7801\u8f93\u5165\u6709\u8bef",
						errmsg_en: "Verification Code Error"
					},
					PASSWORD_TOO_SHORT: {
						errno: 51066,
						errmsg: "\u5bc6\u7801\u4e0d\u80fd\u5c11\u4e8e8\u4f4d\u5b57\u7b26\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "The password can't be less than 8 characters, please reenter"
					},
					PASSWORD_TOO_LONG: {
						errno: 51067,
						errmsg: "\u5bc6\u7801\u6700\u5927\u957f\u5ea6\u4e3a20\u4f4d\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "The password maximum length is 20 characters, please reenter"
					},
					PASSWORD_TOO_SIMPLE: {
						errno: 51068,
						errmsg: "\u81f3\u5c11\u5305\u542b\u6570\u5b57/\u5b57\u6bcd/\u5b57\u7b26\u4e24\u79cd\u7ec4\u5408\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "Contain at least two combinations of number/letter/character, please reenter"
					},
					PASSWORD_HAS_EMPTY: {
						errno: 51069,
						errmsg: "\u5bc6\u7801\u4e0d\u5141\u8bb8\u6709\u7a7a\u683c\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "The password isn't allowed to have Spaces, please reenter"
					},
					PASSWORD_CHAR_INVALID: {
						errno: 51070,
						errmsg: "\u4e0d\u80fd\u542b\u6709\u975e\u6cd5\u5b57\u7b26\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "Can't contain illegal characters, please reenter"
					},
					PASSWORD_ACCOUNT_INCLUDES: {
						errno: 51071,
						errmsg: "\u60a8\u7684\u5bc6\u7801\u4e0e\u7528\u6237\u540d\u8fc7\u4e8e\u76f8\u4f3c\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "Your password is too similar to the user name, please reenter"
					},
					PASSWORD_EMPTY: {
						errno: 211,
						errmsg: "\u8bf7\u8f93\u5165\u5bc6\u7801",
						errmsg_en: "You can't leave password empty"
					},
					PASSWORD_INVALID: {
						errno: 1065,
						errmsg: "\u5bc6\u7801\u957f\u5ea6\u5e94\u4e3a8-20\u4e2a\u5b57\u7b26",
						errmsg_en: "Use at least 8 characters"
					},
					PASSWORD_LEVEL_LOW: {
						errno: 54999,
						errmsg: "\u5bc6\u7801\u5b89\u5168\u7ea7\u522b\u8fc7\u4f4e",
						errmsg_en: "These passwords are easy to guess"
					},
					PASSWORD_WEAK: {
						errno: 54999,
						errmsg: "\u5bc6\u7801\u5f31\uff0c\u6709\u98ce\u9669\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "These passwords are easy to guess"
					},
					PASSWORD_ORDERED: {
						errno: 54999,
						errmsg: "\u5bc6\u7801\u4e0d\u80fd\u4e3a\u8fde\u7eed\u5b57\u7b26",
						errmsg_en: "These passwords are easy to guess"
					},
					PASSWORD_CHAR_REPEAT: {
						errno: 54999,
						errmsg: "\u5bc6\u7801\u4e0d\u80fd\u5168\u4e3a\u76f8\u540c\u5b57\u7b26",
						errmsg_en: "These passwords are easy to guess"
					},
					PASSWORD_WRONG: {
						errno: 220,
						errmsg: "\u767b\u5f55\u5bc6\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165",
						errmsg_en: "These passwords don't match"
					},
					PASSWORD_NOT_MATCH: {
						errno: 1091,
						errmsg: "\u4e24\u6b21\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4",
						errmsg_en: "These passwords don't match"
					},
					PASSWORD_FULL_SHARP: {
						errno: 54e3,
						errmsg: "\u5bc6\u7801\u4e0d\u80fd\u5305\u542b\u4e2d\u6587\u5b57\u7b26\uff0c\u8bf7\u91cd\u65b0\u8bbe\u7f6e",
						errmsg_en: "Please use only letters (a-z), numbers, and periods."
					},
					IDENTIFY_EXPIRE: {
						errno: 153e3
					},
					NOT_SIGNED_IN: {
						errno: 1501,
						errmsg: "\u7528\u6237\u672a\u767b\u9646",
						errmsg_en: ""
					},
					UNKNOWN_ERROR: {
						errno: 999999,
						errmsg: "\u672a\u77e5\u9519\u8bef",
						errmsg_en: ""
					},
					SUCCESS: {
						errno: 0,
						errmsg: "\u64cd\u4f5c\u6210\u529f",
						errmsg_en: ""
					},
					TIME_OUT: {
						errno: 1,
						errmsg: "\u7f51\u7edc\u8d85\u65f6",
						errmsg_en: ""
					}
				},
				r = "errmsg",
				a = window.i18n;
			a && a.is("en") && (r = "errmsg_en");
			var c = t.ERROR = e.forIn(o, function(e, t) {
					e.errmsg = e[r] || e.errmsg
				}),
				s = t.utils = t.utils || {},
				u = {
					1105: "\u8be5\u624b\u673a\u53f7\u672a\u6ce8\u518c360\u5e10\u53f7",
					1402: "\u624b\u673a\u53f7\u5f53\u5929\u53d1\u9001\u77ed\u4fe1\u6b21\u6570\u8d85\u9650",
					201: "\u8be5\u90ae\u7bb1\u5df2\u7ecf\u6ce8\u518c\uff0c" + i,
					3e4: "\u8be5\u624b\u673a\u53f7\u5df2\u7ecf\u6ce8\u518c\uff0c\u8bf7\u76f4\u63a5\u7528\u624b\u673a\u53f7\u767b\u5f55",
					30007: "\u8be5\u624b\u673a\u53f7\u5df2\u7ecf\u6ce8\u518c\uff0c\u8bf7\u76f4\u63a5\u7528\u624b\u673a\u53f7\u767b\u5f55",
					65002: '\u8be5\u5e10\u53f7\u672a\u5f00\u542f\u77ed\u4fe1\u767b\u5f55\u529f\u80fd\uff0c<a class="quc-link" href="http://i.360.cn/security/setloginmethod" target="_blank">\u7acb\u5373\u5f00\u542f</a>',
					65001: '\u8be5\u5e10\u53f7\u53ea\u80fd\u901a\u8fc7\u77ed\u4fe1\u767b\u5f55\uff0c<a class="quc-link quc-link-login" href="http://i.360.cn/security/setloginmethod" target="_blank">\u5173\u95ed\u6b64\u529f\u80fd</a>',
					221: '\u5e10\u53f7\u88ab\u5c01\u7981\uff0c<a class="quc-link quc-link-login" href="http://i.360.cn/complaint" target="_blank">\u70b9\u6b64\u8054\u7cfb\u5ba2\u670d</a>',
					78001: "\u63d0\u4ea4\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u91cd\u8bd5"
				};
			n.each(c, function(e, t) {
				t.errmsg && t.errmsg.length > 0 && (u[t.errno] = t.errmsg)
			}), s.isSameError = function(e, t) {
				return void 0 !== e.errno && void 0 !== t.errno && e.errno === t.errno
			}, s.defineError = function(e, t) {
				var n;
				for(var i in c) c.hasOwnProperty(i) && c[i].errno == e && (n = c[i], n.errmsg = t);
				u[e] = t
			}, s.getErrorMsg = function(e, t) {
				return n.isPlainObject(e) && (t = e.errmsg, e = e.errno), u[e] || t.replace(/\+/g, " ").replace(/class=(['"]).+?\1/, 'class="quc-link"')
			}, s.getErrorType = function(e) {
				switch(e = e.errno || e) {
					case c.MOBILE_EMPTY.errno:
					case c.MOBILE_INVALID.errno:
					case c.MOBILE_DUPLICATE.errno:
						return "mobile";
					case c.EMAIL_EMPTY.errno:
					case c.EMAIL_INVALID.errno:
						return "email";
					case c.USERNAME_EMPTY.errno:
					case c.USERNAME_INVALID.errno:
					case c.USERNAME_DUPLICATE.errno:
					case c.USERNAME_NUMBER.errno:
					case c.USERNAME_INAPPROPRIATE.errno:
						return "username";
					case c.NICKNAME_EMPTY.errno:
					case c.NICKNAME_INVALID.errno:
					case c.NICKNAME_DUPLICATE.errno:
					case c.NICKNAME_INAPPROPRIATE.errno:
					case c.NICKNAME_NUMBER.errno:
						return "nickname";
					case c.ACCOUNT_EMPTY.errno:
					case c.ACCOUNT_INVALID.errno:
					case c.ACCOUNT_DUPLICATE.errno:
						return "account";
					case c.PASSWORD_INVALID.errno:
					case c.PASSWORD_EMPTY.errno:
					case c.PASSWORD_CHAR_REPEAT.errno:
					case c.PASSWORD_ORDERED.errno:
					case c.PASSWORD_WEAK.errno:
					case c.PASSWORD_WRONG.errno:
					case c.PASSWORD_LEVEL_LOW.errno:
						return "password";
					case c.PASSWORD_NOT_MATCH.errno:
						return "password-again";
					case c.CAPTCHA_INVALID.errno:
					case c.CAPTCHA_EMPTY.errno:
					case c.CAPTCHA_APPID_INVALID.errno:
					case c.CAPTCHA_INVALID_OLD.errno:
						return "captcha";
					case c.SMS_TOKEN_EMPTY.errno:
					case c.SMS_TOKEN_INCORRECT.errno:
						return "sms-token"
				}
				return e -= e > 9e5 ? 9e5 : 0, e >= 1e4 && e < 15e3 ? "username" : e >= 15e3 && e < 2e4 ? "nickname" : e >= 2e4 && e < 3e4 ? "email" : e >= 3e4 && e < 45e3 ? "mobile" : e >= 5e4 && e < 55e3 || 1070 == e ? "password" : e >= 55e3 && e < 6e4 ? "sec-email" : e >= 65e3 && e < 75e3 ? "account" : e >= 78e3 && e < 79e3 ? "captcha" : "other"
			}
		}(QHPass)
	}).call(t, n(1))
}, function(e, t) {
	! function(e) {
		function t(e, t) {
			var n = (65535 & e) + (65535 & t),
				i = (e >> 16) + (t >> 16) + (n >> 16);
			return i << 16 | 65535 & n
		}

		function n(e, t) {
			return e << t | e >>> 32 - t
		}

		function i(e, i, o, r, a, c) {
			return t(n(t(t(i, e), t(r, c)), a), o)
		}

		function o(e, t, n, o, r, a, c) {
			return i(t & n | ~t & o, e, t, r, a, c)
		}

		function r(e, t, n, o, r, a, c) {
			return i(t & o | n & ~o, e, t, r, a, c)
		}

		function a(e, t, n, o, r, a, c) {
			return i(t ^ n ^ o, e, t, r, a, c)
		}

		function c(e, t, n, o, r, a, c) {
			return i(n ^ (t | ~o), e, t, r, a, c)
		}

		function s(e, n) {
			e[n >> 5] |= 128 << n % 32, e[(n + 64 >>> 9 << 4) + 14] = n;
			var i, s, u, l, p, d = 1732584193,
				f = -271733879,
				h = -1732584194,
				m = 271733878;
			for(i = 0; i < e.length; i += 16) s = d, u = f, l = h, p = m, d = o(d, f, h, m, e[i], 7, -680876936), m = o(m, d, f, h, e[i + 1], 12, -389564586), h = o(h, m, d, f, e[i + 2], 17, 606105819), f = o(f, h, m, d, e[i + 3], 22, -1044525330), d = o(d, f, h, m, e[i + 4], 7, -176418897), m = o(m, d, f, h, e[i + 5], 12, 1200080426), h = o(h, m, d, f, e[i + 6], 17, -1473231341), f = o(f, h, m, d, e[i + 7], 22, -45705983), d = o(d, f, h, m, e[i + 8], 7, 1770035416), m = o(m, d, f, h, e[i + 9], 12, -1958414417), h = o(h, m, d, f, e[i + 10], 17, -42063), f = o(f, h, m, d, e[i + 11], 22, -1990404162), d = o(d, f, h, m, e[i + 12], 7, 1804603682), m = o(m, d, f, h, e[i + 13], 12, -40341101), h = o(h, m, d, f, e[i + 14], 17, -1502002290), f = o(f, h, m, d, e[i + 15], 22, 1236535329), d = r(d, f, h, m, e[i + 1], 5, -165796510), m = r(m, d, f, h, e[i + 6], 9, -1069501632), h = r(h, m, d, f, e[i + 11], 14, 643717713), f = r(f, h, m, d, e[i], 20, -373897302), d = r(d, f, h, m, e[i + 5], 5, -701558691), m = r(m, d, f, h, e[i + 10], 9, 38016083), h = r(h, m, d, f, e[i + 15], 14, -660478335), f = r(f, h, m, d, e[i + 4], 20, -405537848), d = r(d, f, h, m, e[i + 9], 5, 568446438), m = r(m, d, f, h, e[i + 14], 9, -1019803690), h = r(h, m, d, f, e[i + 3], 14, -187363961), f = r(f, h, m, d, e[i + 8], 20, 1163531501), d = r(d, f, h, m, e[i + 13], 5, -1444681467), m = r(m, d, f, h, e[i + 2], 9, -51403784), h = r(h, m, d, f, e[i + 7], 14, 1735328473), f = r(f, h, m, d, e[i + 12], 20, -1926607734), d = a(d, f, h, m, e[i + 5], 4, -378558), m = a(m, d, f, h, e[i + 8], 11, -2022574463), h = a(h, m, d, f, e[i + 11], 16, 1839030562), f = a(f, h, m, d, e[i + 14], 23, -35309556), d = a(d, f, h, m, e[i + 1], 4, -1530992060), m = a(m, d, f, h, e[i + 4], 11, 1272893353), h = a(h, m, d, f, e[i + 7], 16, -155497632), f = a(f, h, m, d, e[i + 10], 23, -1094730640), d = a(d, f, h, m, e[i + 13], 4, 681279174), m = a(m, d, f, h, e[i], 11, -358537222), h = a(h, m, d, f, e[i + 3], 16, -722521979), f = a(f, h, m, d, e[i + 6], 23, 76029189), d = a(d, f, h, m, e[i + 9], 4, -640364487), m = a(m, d, f, h, e[i + 12], 11, -421815835), h = a(h, m, d, f, e[i + 15], 16, 530742520), f = a(f, h, m, d, e[i + 2], 23, -995338651), d = c(d, f, h, m, e[i], 6, -198630844), m = c(m, d, f, h, e[i + 7], 10, 1126891415), h = c(h, m, d, f, e[i + 14], 15, -1416354905), f = c(f, h, m, d, e[i + 5], 21, -57434055), d = c(d, f, h, m, e[i + 12], 6, 1700485571), m = c(m, d, f, h, e[i + 3], 10, -1894986606), h = c(h, m, d, f, e[i + 10], 15, -1051523), f = c(f, h, m, d, e[i + 1], 21, -2054922799), d = c(d, f, h, m, e[i + 8], 6, 1873313359), m = c(m, d, f, h, e[i + 15], 10, -30611744), h = c(h, m, d, f, e[i + 6], 15, -1560198380), f = c(f, h, m, d, e[i + 13], 21, 1309151649), d = c(d, f, h, m, e[i + 4], 6, -145523070), m = c(m, d, f, h, e[i + 11], 10, -1120210379), h = c(h, m, d, f, e[i + 2], 15, 718787259), f = c(f, h, m, d, e[i + 9], 21, -343485551), d = t(d, s), f = t(f, u), h = t(h, l), m = t(m, p);
			return [d, f, h, m]
		}

		function u(e) {
			var t, n = "";
			for(t = 0; t < 32 * e.length; t += 8) n += String.fromCharCode(e[t >> 5] >>> t % 32 & 255);
			return n
		}

		function l(e) {
			var t, n = [];
			for(n[(e.length >> 2) - 1] = void 0, t = 0; t < n.length; t += 1) n[t] = 0;
			for(t = 0; t < 8 * e.length; t += 8) n[t >> 5] |= (255 & e.charCodeAt(t / 8)) << t % 32;
			return n
		}

		function p(e) {
			return u(s(l(e), 8 * e.length))
		}

		function d(e, t) {
			var n, i, o = l(e),
				r = [],
				a = [];
			for(r[15] = a[15] = void 0, o.length > 16 && (o = s(o, 8 * e.length)), n = 0; n < 16; n += 1) r[n] = 909522486 ^ o[n], a[n] = 1549556828 ^ o[n];
			return i = s(r.concat(l(t)), 512 + 8 * t.length), u(s(a.concat(i), 640))
		}

		function f(e) {
			var t, n, i = "0123456789abcdef",
				o = "";
			for(n = 0; n < e.length; n += 1) t = e.charCodeAt(n), o += i.charAt(t >>> 4 & 15) + i.charAt(15 & t);
			return o
		}

		function h(e) {
			return unescape(encodeURIComponent(e))
		}

		function m(e) {
			return p(h(e))
		}

		function g(e) {
			return f(m(e))
		}

		function v(e, t) {
			return d(h(e), h(t))
		}

		function q(e, t) {
			return f(v(e, t))
		}
		e.utils.md5 = function(e, t) {
			return t ? q(t, e) : g(e)
		}
	}(QHPass)
}, function(e, t, n) {
	(function(e) {
		! function(t) {
			function i(e) {
				return String(e).replace(/[^\x00-\xff]/g, "--").length
			}

			function o(e, t, n) {
				var o = i(e);
				return t <= o && o <= n
			}

			function r(e) {
				return e = void 0 === e ? "" : e, 0 == e.length
			}

			function a(e) {
				e = String(e);
				for(var t, n = e.length, i = null, o = 1; o < n; o++) {
					if(t = e.charCodeAt(o) - e.charCodeAt(o - 1), null !== i && i !== t || Math.abs(t) > 1) return !1;
					i = t
				}
				return !0
			}

			function c(e) {
				e = String(e);
				var t, n = e.length,
					i = e.split(""),
					o = l.unique(i);
				if(n >= 21 || n <= 5) return -1;
				if(1 == o.length) return -2;
				if(a(e)) return -3;
				if(d.join("#").indexOf("#" + e + "#") > -1) return -4;
				var r = {
					d: 0,
					c: 0,
					o: 0
				};
				return l.each(o, function(e, t) {
					/\d/.test(t) ? r.d = 1 : /[a-zA-Z]/.test(t) ? r.c = 1 : r.o = 1
				}), t = r.d + r.c + r.o + (n > 9 ? 2 : 1), t = Math.max(3, t)
			}
			var s = window.logger || n(13),
				u = s.getLogger("validate"),
				l = t.$ || window.$,
				p = t.ERROR,
				d = ["", "abcabc", "abc123", "a1b2c3", "aaa111", "123abc", "123456abc", "abc123456", "qwerty", "qwertyuiop", "qweasd", "123qwe", "1qaz2wsx", "1q2w3e4r", "1q2w3e4r5t", "asdasd", "asdfgh", "asdfghjkl", "zxcvbn", "qazwsxedc", "qq123456", "admin", "password", "p@ssword", "passwd", "Password", "Passwd", "Iloveyou", "Woaini", "iloveyou", "Wodemima", "Woaiwojia", "tamade", "nimade", "123789", "1234560", "123465", "123321", "102030", "100200", "4655321", "987654", "123123", "123123123", "121212", "111222", "12301230", "168168", "456456", "321321", "521521", "5201314", "520520", "201314", "211314", "7758258", "7758521", "1314520", "1314521", "147258369", "147852369", "159357", "741852", "741852963", "654321", "852963", "963852741", "115415", "123000", ""],
				f = QHPass.validate = {
					checkRealName: function(e) {
						return e = l.trim(e), r(e) ? p.REALNAME_EMPTY : !/^[\u4e00-\u9fa5]{2,5}$/.test(e) && p.REALNAME_INVALID
					},
					checkUsername: function(e) {
						return e = l.trim(e), r(e) ? p.USERNAME_EMPTY : !/^[\w\u4e00-\u9fa5\.]{2,14}$/.test(e) && p.USERNAME_INVALID
					},
					checkNickname: function(e) {
						return e = l.trim(e), r(e) ? p.NICKNAME_EMPTY : o(e, 2, 14) ? !/^[\w\u4e00-\u9fa5\.]{2,14}$/.test(e) && p.NICKNAME_INVALID : p.NICKNAME_TOO_SHORT
					},
					checkEmail: function(e) {
						var t = /^[a-z0-9](?:[\w.\-+]*[a-z0-9])?@[a-z0-9][\w.-]*\.[a-z]{2,8}$/i;
						return e = l.trim(e), r(e) ? p.EMAIL_EMPTY : !t.test(e) && p.EMAIL_INVALID
					},
					checkMobile: function(e, t) {
						var n, i, o;
						return t ? (n = l.trim(e.mobileNumber), i = e.regExp || "^1\\d{10}$", o = new RegExp(i)) : (n = l.trim(e), o = /^0?1[3456789]\d{9}$/), r(n) ? p.MOBILE_EMPTY : !o.test(n) && p.MOBILE_INVALID
					},
					checkAccount: function(e) {
						return 0 == e.length ? p.ACCOUNT_EMPTY : !!(this.checkUsername(e) && this.checkEmail(e) && this.checkMobile(e)) && p.ACCOUNT_INVALID
					},
					checkCaptcha: function(e) {
						return e = l.trim(e), r(e) ? p.CAPTCHA_EMPTY : !/^([a-z0-9]{4,7}|\d{1,3}|[\u4E00-\u9FA5]{1,5})$/i.test(e) && p.CAPTCHA_INVALID
					},
					checkSmsToken: function(e) {
						return e = l.trim(e), r(e) ? p.SMS_TOKEN_EMPTY : !(6 == e.length && !isNaN(e)) && p.SMS_TOKEN_INCORRECT
					},
					isInWeakPasswordPool: function(t) {
						return e.includes(d, t)
					},
					checkPasswordFrontend: function(t, n) {
						e.isString(t) && (t = {
							password: t
						}), t = t || {};
						var i = t.password;
						f.checkWeakPasswordRule(t, function(o, r) {
							r.isInWeakPool = f.isInWeakPasswordPool(i), r.isInWeakPool && (o || (r.level = -4, o = r.reason = e.extend({
								detail: "\u5728\u5f31\u5bc6\u7801\u5e93\u4e2d"
							}, p.PASSWORD_WEAK))), u.debug("check password frontend", t, r), n(o, r)
						})
					},
					checkPasswordFrontendSync: function(e) {
						var t;
						return f.checkPasswordFrontend(e, function(e, n) {
							t = n
						}), t
					},
					checkWeakPasswordRule: function(t, n) {
						t = t || {};
						var i = t.password || "",
							o = null,
							r = 0,
							a = !1,
							c = i.length,
							s = {
								number: 0,
								letter: 0,
								other: 0
							};
						e.each(e.split(i, ""), function(e) {
							/\d/.test(e) ? s.number++ : /[a-zA-Z]/.test(e) ? s.letter++ : s.other++
						});
						var u = e.filter(e.keys(s), function(e) {
							return s[e] > 0
						});
						if(c < 8 ? o = p.PASSWORD_TOO_SHORT : c > 20 ? o = p.PASSWORD_TOO_LONG : / /.test(i) ? o = p.PASSWORD_HAS_EMPTY : /[^\x00-\xff]/.test(i) ? o = p.PASSWORD_CHAR_INVALID : u.length < 2 && (o = p.PASSWORD_TOO_SIMPLE), !o) {
							var l = t.username;
							if(l) {
								var d = Math.abs(l.length - i.length);
								d <= 1 && (e.includes(l, i) || e.includes(i, l)) && (o = p.PASSWORD_ACCOUNT_INCLUDES)
							}
						}
						o && (a = !0);
						var f = {
							isWeakRule: a,
							complexLevel: r,
							reason: o,
							charTypes: u,
							charCount: s
						};
						f.isWeakRule ? n(f.reason, f) : n(null, f)
					},
					checkPassword: function(e, t) {
						if(e = String(e), r(e)) return p.PASSWORD_EMPTY;
						if(e.match(/[^\x00-\xff]/)) return p.PASSWORD_FULL_SHARP;
						if(!t) return !1;
						switch(c(e)) {
							case -1:
								return p.PASSWORD_INVALID;
							case -2:
								return p.PASSWORD_CHAR_REPEAT;
							case -3:
								return p.PASSWORD_ORDERED;
							case -4:
								return p.PASSWORD_WEAK;
							default:
								return !1
						}
					},
					evaluatePassword: function(e) {
						return c(e)
					},
					checkPasswordConfirm: function(e, t) {
						return e !== t && p.PASSWORD_NOT_MATCH
					}
				}
		}(QHPass)
	}).call(t, n(1))
}, function(e, t, n) {
	(function(e) {
		! function(t) {
			var i = n(52),
				o = t.$,
				r = {
					title: "\u6b22\u8fce\u767b\u5f55360",
					content: "",
					width: "460",
					height: "auto",
					closeSelector: ".quc-panel-close",
					titleSelector: ".quc-panel-title",
					contentSelector: ".quc-panel-bd",
					closeRemove: !0,
					showMask: !0,
					fixed: !0,
					tpl: '<div class="quc-panel quc-wrapper"><div class="quc-panel-hd"><div class="quc-panel-title">{title}</div><a href="#" class="quc-panel-close"><i>\u5173\u95ed</i></a></div><div class="quc-panel-bd">{content}</div><!--[if lte IE 6]><iframe class="quc-ie6-iframe" src="about:blank" border="0" frameborder="0"></iframe><![endif]--></div>',
					maskTpl: '<div class="quc-mask quc-mask-panel"><!--[if lte IE 6]><iframe class="quc-ie6-iframe" src="about:blank" border="0" frameborder="0"></iframe><div class="quc-mask-inner"></div><![endif]--></div>'
				},
				a = function(e) {
					this.opt = o.extend({}, r, e), this._init(), this._initEvent()
				};
			o.extend(a.prototype, {
				_init: function() {
					var e = this.opt,
						t = e.tpl;
					e.title && (t = t.replace("{title}", e.title)), e.content && (t = t.replace("{content}", e.content)), this.$el = o(t), this.$hd = this.$el.find(e.titleSelector), this.$bd = this.$el.find(e.contentSelector)
				},
				_initEvent: function() {
					var e = this;
					this.$el.on("click", this.opt.closeSelector, function(t) {
						t.preventDefault(), e.hide(), o(e).triggerHandler("close")
					});
					var n = t.utils.throttle(e.adjustPosition, 10, !0);
					this._adjustPosition = function() {
						n.apply(e)
					};
					var r = o(i.getTopWindow());
					r.on("resize", this._adjustPosition), this.opt.fixed && !t.utils.support.fixed && r.on("scroll", this._adjustPosition), this.$el.on("DOMNodeInserted DOMNodeRemoved", this._adjustPosition)
				},
				setMask: function() {
					var e = i.getTopWindow();
					if(this.opt.showMask && (this.$mask = this.$mask || o(this.opt.maskTpl), o(e.document.body).append(this.$mask), !t.utils.support.fixed)) {
						var n = o(e.document.body);
						this.$mask.css({
							height: n.outerHeight(!0),
							width: n.outerWidth(!0)
						})
					}
					return this
				},
				removeMask: function() {
					return this.opt.showMask && this.$mask && this.$mask.remove(), this
				},
				removeClose: function() {
					return this.$el.find(this.opt.closeSelector).remove(), this
				},
				setTitle: function(e) {
					return "string" == o.type(e) && "<" != o.trim(e).substr(0, 1) ? this.$hd.html(e) : this.$hd.empty().append(o(e)), this
				},
				setContent: function(e) {
					var t = o(e);
					return this.$bd.empty().append(t), this.adjustPosition(), t.on("QucDOMUpdated", this._adjustPosition), this
				},
				setSize: function(e, t) {
					return e && this.$el.width(e), t && this.$bd.height(t), this.adjustPosition(), this
				},
				adjustPosition: function(e, n) {
					var r = i.getTopWindow(),
						a = o(r),
						c = this.opt.fixed && this.$el.outerHeight(!0) <= a.height(),
						s = t.utils.support.fixed;
					if(0 == this.$el.parents("body").length) return this;
					if(e && "center" != e ? e = parseInt(e, 10) : (e = (a.height() - this.$el.outerHeight(!0)) / 2, e = e < 0 ? 0 : e), n && "center" != n ? n = parseInt(n, 10) : (n = (a.width() - this.$el.outerWidth(!0)) / 2, n = n < 0 ? 0 : n), c && s || (e += a.scrollTop(), n += a.scrollLeft()), this.$el.css({
							top: e,
							left: n
						}), s) this.$el.css("position", c ? "fixed" : "absolute");
					else if(a.off("scroll", this._adjustPosition), c && a.on("scroll", this._adjustPosition), this.opt.showMask) {
						var u = o(r.document.body);
						this.$mask.css({
							height: u.outerHeight(!0),
							width: u.outerWidth(!0)
						})
					}
					return this
				},
				show: function() {
					this.setMask();
					var e = i.getTopWindow();
					return 0 == this.$el.parent().length && this.$el.appendTo(e.document.body), this.$el.show(), this.adjustPosition(), this
				},
				hide: function(e) {
					return this.removeMask(), e === !0 || this.opt.closeRemove ? this.remove() : e !== !1 && this.opt.closeRemove || this.$el.hide(), this
				},
				remove: function() {
					return this.$hd.detach(), this.$bd.detach(), this.$el.remove(), o(i.getTopWindow()).off("resize", this._adjustPosition), this
				}
			}), t.utils.Panel = a, t.$message = function(i) {
				return new e(function(e, o) {
					var r = n(99),
						a = new t.utils.Panel({
							title: i.title,
							content: r
						}),
						c = a.$el;
					c.addClass("quc-message"), c.find(".quc-panel-message").html(i.content), a.show(), setTimeout(function() {
						a.hide(!0), e()
					}, 3e3)
				})
			}, t.$alert = function() {}, t.$confirm = function() {}, t.$prompt = function() {}
		}(QHPass)
	}).call(t, n(30))
}, function(e, t) {
	e.exports = '<div class="quc-panel-main">\r\n  <div class="quc-panel-message">\r\n  </div>\r\n</div>\r\n'
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = function(e) {
				this.timeOut = e || 120, this.timeLeft = this.timeOut, this.timeStep = 1e3, this.running = !1
			};
		t.extend(n.prototype, {
			start: function() {
				t(this).trigger("timer_start", this.timeLeft), this.running || (this.running = !0, this.interval = setInterval(e.utils.bind(function() {
					this.timeLeft--, this.timeLeft <= 0 ? this.stop() : t(this).trigger("timer_tick", this.timeLeft)
				}, this), this.timeStep))
			},
			resume: function() {
				this.start()
			},
			pause: function() {
				this.running = !1, clearInterval(this.interval), t(this).trigger("timer_pause", this.timeLeft)
			},
			stop: function() {
				clearInterval(this.interval), this.running = !1, this.reset(), t(this).trigger("timer_stop")
			},
			reset: function() {
				this.timeLeft = this.timeOut
			},
			setTimeOut: function(e) {
				this.timeOut = e
			},
			isRunning: function() {
				return this.running
			},
			on: function() {
				t().on.apply(t(this), arguments)
			}
		});
		var i = {};
		e.utils.getTimer = function(e, t) {
			return i[e] || (i[e] = new n(t)), i[e]
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$;
		e.utils.changeRT = function(e, n, i) {
			var o = t(e);
			isNaN(n) && (i = n, n = 30), o.on("QucChangeRT", i), o.each(function(e, i) {
				function o() {
					var e = c.val();
					r !== e && (c.trigger("QucChangeRT", {
						oldValue: r,
						newValue: e
					}), r = e)
				}
				if("TEXTAREA" == i.tagName || "INPUT" == i.tagName) {
					var r, a, c = t(i);
					c.focus(function() {
						r = c.val(), a = setInterval(o, n)
					}), c.blur(function() {
						clearInterval(a), o(), r = null
					})
				}
			})
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		e(jQuery)
	}(function(e) {
		function t(t) {
			var n = {},
				i = /^jQuery\d+$/;
			return e.each(t.attributes, function(e, t) {
				t.specified && !i.test(t.name) && (n[t.name] = t.value)
			}), n
		}

		function n(t, n) {
			var i = this,
				r = e(this);
			if(i.value === r.attr(c ? "placeholder-x" : "placeholder") && r.hasClass(f.customClass))
				if(i.value = "", r.removeClass(f.customClass), r.data("placeholder-password")) {
					if(r = r.hide().nextAll('input[type="password"]:first').show().attr("id", r.removeAttr("id").data("placeholder-id")), t === !0) return r[0].value = n, n;
					r.focus()
				} else i == o() && i.select()
		}

		function i(i) {
			var o, r = this,
				a = e(this),
				s = r.id;
			if(!i || "blur" !== i.type || !a.hasClass(f.customClass))
				if("" === r.value) {
					if("password" === r.type) {
						if(!a.data("placeholder-textinput")) {
							try {
								o = a.clone().prop({
									type: "text"
								})
							} catch(u) {
								o = e("<input>").attr(e.extend(t(this), {
									type: "text"
								}))
							}
							o.removeAttr("name").data({
								"placeholder-enabled": !0,
								"placeholder-password": a,
								"placeholder-id": s
							}).bind("focus.placeholder", n), a.data({
								"placeholder-textinput": o,
								"placeholder-id": s
							}).before(o)
						}
						r.value = "", a = a.removeAttr("id").hide().prevAll('input[type="text"]:first').attr("id", a.data("placeholder-id")).show()
					} else {
						var l = a.data("placeholder-password");
						l && (l[0].value = "", a.attr("id", a.data("placeholder-id")).show().nextAll('input[type="password"]:last').hide().removeAttr("id"))
					}
					a.addClass(f.customClass), a[0].value = a.attr(c ? "placeholder-x" : "placeholder")
				} else a.removeClass(f.customClass)
		}

		function o() {
			try {
				return document.activeElement
			} catch(e) {}
		}
		var r, a, c = !1,
			s = "[object OperaMini]" === Object.prototype.toString.call(window.operamini),
			u = "placeholder" in document.createElement("input") && !s && !c,
			l = "placeholder" in document.createElement("textarea") && !s && !c,
			p = e.valHooks,
			d = e.propHooks,
			f = {};
		u && l ? (a = e.fn.placeholder = function() {
			return this
		}, a.input = !0, a.textarea = !0) : (a = e.fn.placeholder = function(t) {
			var o = {
				customClass: "placeholder"
			};
			return f = e.extend({}, o, t), this.filter((u ? "textarea" : ":input") + "[" + (c ? "placeholder-x" : "placeholder") + "]").not("." + f.customClass).not(":radio, :checkbox, [type=hidden]").bind({
				"focus.placeholder": n,
				"blur.placeholder": i
			}).data("placeholder-enabled", !0).trigger("blur.placeholder")
		}, a.input = u, a.textarea = l, r = {
			get: function(t) {
				var n = e(t),
					i = n.data("placeholder-password");
				return i ? i[0].value : n.data("placeholder-enabled") && n.hasClass(f.customClass) ? "" : t.value
			},
			set: function(t, r) {
				var a, c, s = e(t);
				return "" !== r && (a = s.data("placeholder-textinput"), c = s.data("placeholder-password"), a ? (n.call(a[0], !0, r) || (t.value = r), a[0].value = r) : c && (n.call(t, !0, r) || (c[0].value = r), t.value = r)), s.data("placeholder-enabled") ? ("" === r ? (t.value = r, t != o() && i.call(t)) : (s.hasClass(f.customClass) && n.call(t), t.value = r), s) : (t.value = r, s)
			}
		}, u || (p.input = r, d.value = r), l || (p.textarea = r, d.value = r), e(function() {
			e(document).delegate("form", "submit.placeholder", function() {
				var t = e("." + f.customClass, this).each(function() {
					n.call(this, !0, "")
				});
				setTimeout(function() {
					t.each(i)
				}, 10)
			})
		}), e(window).bind("beforeunload.placeholder", function() {
			var t = !0;
			try {
				"javascript:void(0)" === document.activeElement.toString() && (t = !1)
			} catch(n) {}
			t && e("." + f.customClass).each(function() {
				this.value = ""
			})
		}))
	})
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-email-hint-wrapper"><div class="quc-email-hint"></div></div>';
		e.utils.emailHint = function(i, o) {
			function r(e) {
				var i = t(n),
					o = i.find(".quc-email-hint");
				o.css({
					width: e.outerWidth()
				});
				var r = function() {
						var t = e.val();
						c && t.indexOf("@") < 0 || !t.match(/^[\w._]+@?[\w.]*$/) ? o.hide() : (o.show(), setTimeout(function() {
							0 == o.find(".quc-on:visible").length && (o.find(".quc-on").removeClass("quc-on"), o.children(":visible").first().addClass("quc-on"))
						}, 30))
					},
					a = function(e) {
						switch(e.which) {
							case 38:
								s(!0);
								break;
							case 40:
								s();
								break;
							case 13:
							case 32:
								var t = o.find(".quc-on");
								t.length > 0 && t.mousedown();
								break;
							case 27:
								l(0);
								break;
							default:
								return
						}
						e.preventDefault()
					},
					s = function(e) {
						var t = o.find(".quc-on");
						0 == t.length ? t = o.children(":visible").first() : t.removeClass("quc-on");
						var n = e ? t.prevAll(":visible").first() : t.nextAll(":visible").first();
						0 == n.length && (n = e ? o.children(":visible").last() : o.children(":visible").first()), n.addClass("quc-on")
					},
					l = function(t) {
						e.off("blur", l), setTimeout(function() {
							e.off("QucChangeRT", r), e.off("keydown", a), i.remove()
						}, isNaN(t) ? 100 : t)
					};
				e.on("QucChangeRT", r), e.on("keydown", a), e.on("blur", l), r(), t.each(u, function(n, i) {
					var r = t("<a>").attr("href", "#").attr("tabindex", -1).appendTo(o).click(function(e) {
							e.preventDefault()
						}).mousedown(function() {
							e.val(e.val().split("@")[0] + "@" + i), setTimeout(function() {
								e.parents(".quc-field").next(".quc-field").find(".quc-input,.quc-button").focus()
							}, 30), l(0)
						}).on("selectstart", function(e) {
							e.preventDefault()
						}).on("mouseover", function() {
							r.addClass("quc-on").siblings(".quc-on").removeClass("quc-on")
						}),
						a = function() {
							var t = e.val().split("@");
							r.html(t[0].replace(/^(.{10}).{2,}(.{7})$/, "$1...$2") + "@" + i), t[1] && i.indexOf("." + t[1]) == -1 && 0 !== i.indexOf(t[1]) ? (r.hide(), r.hasClass("quc-on") && (r.removeClass("quc-on"), o.children(":visible").first().addClass("quc-on"))) : r.css("display", "block")
						};
					e.on("QucChangeRT", a), e.one("blur", function() {
						e.off("QucChangeRT", a)
					}), a()
				}), e.after(i)
			}
			var a = t(i),
				c = "account" == o,
				s = a.filter(":text").add(a.find(":text")),
				u = e.getConfig("emailHint", ["sina.com", "163.com", "qq.com", "126.com", "vip.sina.com", "sina.cn", "hotmail.com", "gmail.com", "sohu.com", "yahoo.com", "139.com", "189.cn"]);
			0 != s.length && (e.utils.changeRT(s), s.on("focus", function(e) {
				r(t(e.target))
			}))
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = {
				wrapper: t("<div>").css({
					lineHeight: 1.2,
					fontSize: 12
				}),
				init: function() {
					var e = this;
					t(function() {
						var n = t("<div>").css({
							position: "absolute",
							right: 0,
							top: 0,
							zIndex: 2e5,
							background: "lightyellow",
							border: "1px orange solid",
							padding: 5
						}).appendTo(document.body);
						t("<a>").attr("href", "#").css({
							marginRight: 5,
							color: "blue"
						}).html("\u663e\u793a\u65e5\u5fd7").click(function(i) {
							i.preventDefault(), n.remove();
							var o = window.open("about:blank", "Quc_JS_SDK_Console", "width=800,height=600,location=0,menubar=0,status=0,toolbar=0");
							t(o.document.body).append(e.wrapper)
						}).appendTo(n), t("<a>").attr("href", "#").css({
							color: "blue"
						}).html("\u5173\u95ed").click(function(e) {
							e.preventDefault(), n.remove()
						}).appendTo(n)
					}), this.init = function() {}
				},
				log: function(e, n) {
					this.init(), n && (e = e.replace(/%c(.*)$/g, '<span style="' + n + '">$1</span>')), t("<p>").css({
						margin: 0,
						padding: 0
					}).html(e).appendTo(this.wrapper)
				},
				clear: function() {
					this.wrapper.clear()
				},
				trace: function() {}
			},
			i = window.console ? window.console : n,
			o = e.DEBUG_LEVEL = {
				ERROR: 1,
				FATAL: 1,
				WARN: 2,
				WARNING: 2,
				DEBUG: 4,
				INFO: 8,
				WARN_OR_UPPER: 3,
				WARNING_OR_UPPER: 3,
				DEBUG_OR_UPPER: 7,
				INFO_OR_UPPER: 15,
				ALL: 15
			},
			r = function() {
				var t = e.DEBUG;
				return isNaN(parseInt(t, 10)) ? t && o[t] || o.DEBUG_OR_UPPER : t
			},
			a = e.logger = {
				history: [],
				log: function(e, t) {
					if(QHPass.DEBUG) {
						t = t || null;
						var n = new Date,
							o = n.getHours(),
							r = n.getMinutes(),
							a = n.getSeconds(),
							c = n.getMilliseconds();
						e = (o < 10 ? "0" : "") + o + ":" + (r < 10 ? "0" : "") + r + ":" + (a < 10 ? "0" : "") + a + "." + (c < 100 ? c < 10 ? "00" : "0" : "") + c + " QHPASS " + e, t ? i.log("%c" + e, "color:" + t) : i.log("LOG: " + e)
					}
				},
				info: function(e) {
					this.history.push({
						time: new Date,
						level: o.INFO,
						message: e
					}), r() & o.INFO && this.log("INFO: " + e, "blue")
				},
				debug: function(e) {
					this.history.push({
						time: new Date,
						level: o.DEBUG,
						message: e
					}), r() & o.DEBUG && this.log("DEBUG: " + e, "green")
				},
				warn: function(e) {
					this.history.push({
						time: new Date,
						level: o.WARN,
						message: e
					}), r() & o.WARN && this.log("WARN: " + e, "orange")
				},
				error: function(e) {
					if(this.history.push({
							time: new Date,
							level: o.ERROR,
							message: e
						}), r() & o.ERROR) throw new Error(e)
				},
				download: function(e, n, i) {
					var o = this.history;
					n = n && n.getTime(), i = i && i.getTime(), o = e ? t.grep(o, function(t) {
						return t.level & e
					}) : o, o = n ? t.grep(o, function(e) {
						return n <= e.time.getTime()
					}) : o, o = i ? t.grep(o, function(e) {
						return i <= e.time.getTime()
					}) : o, o = t.map(o, function(e) {
						var t = e.time,
							n = t.getFullYear(),
							i = t.getMonth(),
							o = t.getDate(),
							r = t.getHours(),
							a = t.getMinutes(),
							c = t.getSeconds(),
							s = t.getMilliseconds();
						return n + "-" + (i < 10 ? "0" : "") + i + "-" + (o < 10 ? "0" : "") + o + " " + (r < 10 ? "0" : "") + r + ":" + (a < 10 ? "0" : "") + a + ":" + (c < 10 ? "0" : "") + c + "." + (s < 100 ? s < 10 ? "00" : "0" : "") + s + " " + e.message
					});
					try {
						var r = t("<a>").attr("download", "QHPass_log_" + (new Date).getTime() + ".txt").attr("href", URL.createObjectURL(new Blob([o.join("\r\n")]))).click(),
							a = document.createEvent("HTMLEvents");
						a.initEvent("click", !1, !1), r[0].dispatchEvent(a)
					} catch(c) {
						var s = window.open("about:blank", "QHPass Log");
						s.document.write(o.join("\r\n"))
					}
				}
			};
		e.events.on("init.core", function() {
			a.info("\u521d\u59cb\u5316")
		}), e.events.on("readConfig.config", function(t, n) {
			var i = n.value;
			a.info("\u8bfb\u53d6\u914d\u7f6e Key:" + n.key + " Value:" + e.utils.JSON.stringify(i))
		}), e.events.on("get.sync post.sync", function(t, n) {
			a.info("\u53d1\u9001\u6570\u636e Method:" + t.type + " Data:" + e.utils.JSON.stringify(n.opt.data) + " Url:" + (n.url || n.opt.url))
		}), e.events.on("receive.sync", function(t, n) {
			a.info("\u63a5\u6536\u6570\u636e Data:" + e.utils.JSON.stringify(n))
		}), e.events.on("error.sync", function(e, t) {
			a.warn("\u53d1\u9001\u6570\u636e\u5931\u8d25 Url:" + t)
		}), e.events.on("retryHttp.sync", function(e, t) {
			a.warn("https\u8bf7\u6c42\u5931\u8d25\uff0c\u964d\u7ea7\u81f3http\u91cd\u8bd5 Url:" + t)
		}), e.events.on("init.*", function(e) {
			a.info("\u6a21\u5757\u521d\u59cb\u5316 Module:" + e.namespace)
		}), e.events.on("show.*", function(e) {
			a.info("\u663e\u793a\u754c\u9762 Module:" + e.namespace)
		}), e.events.on("hide.*", function(e) {
			a.info("\u9690\u85cf\u754c\u9762 Module:" + e.namespace)
		}), e.events.on("showLoading.*", function(e) {
			a.info("\u51c6\u5907\u754c\u9762 Module:" + e.namespace)
		}), e.events.on("hideLoading.*", function(e) {
			a.info("\u754c\u9762\u51c6\u5907\u5b8c\u6bd5 Module:" + e.namespace)
		}), e.events.on("invalid.*", function(e, t) {
			a.debug("\u7528\u6237\u8f93\u5165\u6821\u9a8c\u9519\u8bef Module:" + e.namespace + " ErrorCode:" + t.errno + " ErrorMessage:" + t.errmsg)
		}), e.events.on("warn.* warning.*", function(e, t) {
			t.errno && (t = "(" + t.errno + ")" + t.errmsg), a.warn(" Module:" + e.namespace + " Message:" + t)
		}), e.events.on("error.* fatal.*", function(e, t) {
			t.errno && (t = "(" + t.errno + ")" + t.errmsg), a.error(" Module:" + e.namespace + " Message:" + t)
		}), e.debug = {
			exportLog: function() {
				a.download.apply(a, arguments)
			},
			clearLog: function() {
				a.history = []
			}
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$;
		t && t.fn && t.fn.jquery || e.logger.error("\u672a\u68c0\u6d4b\u5230jQuery\uff0cQHPass\u4f9d\u8d56jQuery\u5e93\uff0c\u8bf7\u52a0\u8f7djQuery 1.8+");
		var n = parseInt(t.fn.jquery.replace(/\.(\d+)/g, function(e, t) {
				return("0" + t).slice(-2)
			})),
			i = 10800;
		n < i && e.logger.error("jQuery\u7248\u672c\u8fc7\u4f4e\uff0c\u76ee\u524d\u52a0\u8f7d\u7684\u7248\u672c:" + t.fn.jquery + "\uff0c\u9700\u8981\u7248\u672c1.8.0+")
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = e.events,
			i = window,
			o = function() {
				function t(e) {
					var t = 0,
						n = 0,
						i = e.length - 1;
					for(i; i >= 0; i--) {
						var o = parseInt(e.charCodeAt(i), 10);
						t = (t << 6 & 268435455) + o + (o << 14), 0 != (n = 266338304 & t) && (t ^= n >> 21)
					}
					return t
				}

				function n() {
					for(var e = navigator, n = [e.appName, e.version, e.language || e.browserLanguage, e.platform, e.userAgent, screen.width, "x", screen.height, screen.colorDepth, document.referrer].join(""), o = n.length, r = i.history.length; r;) n += r-- ^ o++;
					return 2147483647 * (Math.round(2147483647 * Math.random()) ^ t(n))
				}
				var o = "__guid",
					r = e.utils.storage("cookie"),
					a = document.domain,
					c = r.get(o);
				if(!c) {
					c = [t(a), n(), +new Date + Math.random() + Math.random()].join(".");
					var s = {
						expires: 2592e7,
						path: "/",
						domain: a.toLowerCase().replace(/^(?:.+\.)?(\w+\.\w+)$/, ".$1")
					};
					r.set(o, c, s)
				}
				return function() {
					return c
				}
			}();
		e.utils.monitor = {};
		var r = i.__quc_moitor_imgs = {},
			a = e.utils.monitor.send = function(n) {
				if(!e.DEBUG && e.getConfig("useMonitor", !0)) {
					var i = e.getConfig("monitorUrl", e.getConfig("protocol") + "://s.360.cn/i360/qhpass.htm"),
						a = "moitor_img+" + e.utils.getGuid(),
						c = r[a] = new Image;
					n = t.param(t.extend({
						src: e.getConfig("src"),
						version: e.version,
						guid: o()
					}, n)), i += (i.indexOf("?") > 0 ? "&" : "?") + n, c.onload = c.onerror = function() {
						r && r[a] && (r[a] = null, delete r[a])
					}, c.src = i
				}
			};
		n.on("init.core", function() {
			var t = i.screen;
			a({
				action: "init",
				resolution: [t.width, t.height].join("x"),
				color: t.colorDepth,
				language: navigator.language,
				isCookieEnabled: e.utils.isCookieEnabled()
			})
		}), n.on("retryHttp.sync", function(e, t) {
			t = t.replace(/\?.*/, ""), a({
				action: "retryHttp",
				api: t
			})
		}), n.on("error.sync", function(e, t) {
			t = t.replace(/\?.*/, ""), a({
				action: "netError",
				api: t
			})
		}), n.on("show.*", function(e) {
			a({
				action: "show",
				module: e.namespace
			})
		}), n.on("beforeSubmit.*", function(e) {
			a({
				action: "submit",
				module: e.namespace
			})
		}), n.on("success.*", function(e) {
			a({
				action: "success",
				module: e.namespace
			})
		}), n.on("changeType.*", function(e, t) {
			var n = "change" + e.namespace.replace(/^./, function(e) {
				return e.toUpperCase()
			}) + "Type";
			a({
				action: n,
				module: e.namespace,
				type: t
			})
		}), n.on("invalid.*", function(e, t) {
			a({
				action: "invalid",
				module: e.namespace,
				errno: t.errno,
				errmsg: t.errmsg
			})
		}), n.on("warn.* warning.*", function(e, t) {
			t.errno && (t = "(" + t.errno + ")" + t.errmsg), a({
				action: "warn",
				module: e.namespace,
				message: t
			})
		}), n.on("error.* fatal.*", function(e, t) {
			t.errno && (t = "(" + t.errno + ")" + t.errmsg), a({
				action: "error",
				module: e.namespace,
				message: t
			})
		}), Math.random() < .01 && t.get(e.getConfig("proxy"), function(e) {
			var t = e.match(/version\s*=\s*['"]?([\d.]+)['"]?/i),
				n = t && t[1] || "old version";
			a({
				action: "pspJumpInit",
				jumpVersion: n
			})
		}, "text"), n.on("init.core", function() {
			e.getConfig("preventClickPenetrate", !0) && n.on("afterShow.*", function() {
				t(".quc-wrapper").mousedown(function(e) {
					e.stopPropagation()
				})
			}), n.on("afterShow.*", function(e) {
				t(".quc-wrapper").on("click", "a", function() {
					var n = this;
					n.href.match(/[^#]$/) && "_blank" == n.target && a({
						action: "click",
						module: e.namespace,
						title: t(n).text(),
						link: n.href
					})
				})
			})
		})
	}(QHPass)
}, function(e, t) {
	! function(e) {
		function t(e, t) {
			return !e || (o.isFunction(e) ? e(t) : t === e)
		}

		function n(e, t) {
			if(!e) return !1;
			var n = 0;
			return o.each(e.match(/(\d+[wdhms]?)/g), function(e, t) {
				var i = parseInt(t, 10),
					o = t.substr(t.length - 1);
				n += c[o] ? i * c[o] : i
			}), (new Date).getTime() - t >= n
		}

		function i(e) {
			return o.map(e, function(e) {
				return e.toString()
			}).join()
		}
		var o = e.$,
			r = "quc.funcCache",
			a = {};
		e.utils.cache = {
			read: function(c, s, u) {
				function l() {
					m[h] = m[h] || {}, m[h][g] = d, p.set(r, e.utils.JSON.stringify(m))
				}
				o.isPlainObject(s) && (u = s), u = u || {};
				var p, d, f, h = c.funcName;
				h ? p = e.utils.storage("local") : (h = c.qucGuid || (c.qucGuid = e.utils.getGuid()), p = e.utils.storage("page"));
				var m = e.utils.JSON.parse(p.get(r, "{}")),
					g = i(s);
				return(f = a[h] && a[h][g]) ? f : (d = m[h] && m[h][g], !d || n(u.expire, d.date) ? (d = {
					data: c.apply(u.context || null, s),
					date: (new Date).getTime()
				}, d.data.done && d.data.fail ? ((a[h] = a[h] || {})[g] = d, d.data.done(function(e) {
					t(u.condition, !0) && (d.data = e, d.promise = "resolve", l())
				}).fail(function(e) {
					t(u.condition, !1) && (d.data = e, d.promise = "reject", l())
				}).always(function() {
					delete a[h][g]
				})) : (t(u.condition, d.data) && l(), d.data)) : d.promise ? o.Deferred()[d.promise](d.data).promise() : d.data)
			},
			clear: function(t, n) {
				t ? cache[t] && n ? delete a[t][i(n)] : delete a[t] : (a = {}, e.utils.storage("page".remove(r)), e.utils.storage("local".remove(r)))
			}
		};
		var c = {
			s: 1e3,
			m: 6e4,
			h: 36e5,
			d: 864e5,
			w: 6048e5
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = null,
			i = function(t) {
				this.name = "func_" + e.utils.getGuid(), this.extend(t), this._initFlag = !1, this._data = {}
			};
		t.extend(i.prototype, {
			init: function() {
				var t = this;
				return t._initFlag ? t.reset() : (t._initFlag = !0, t.setUI(e.ui[t.name]), t.setDeferred(), t.trigger("init"), t.on("show", function() {
					t._isShown = !0
				}), t.on("hide", function() {
					t._isShown = !1
				})), t._passThrough = n, n = null, t
			},
			reset: function() {
				return this._isShown && this.trigger("hide"), this.setDeferred(), this
			},
			isInit: function() {
				return this._initFlag
			},
			get: function(e, t) {
				var n = this._data[e];
				return void 0 !== n ? n : t
			},
			set: function(e, n) {
				return t.isPlainObject(e) ? t.extend(this._data, e) : this._data[e] = n, this
			},
			setDeferred: function(n) {
				var i = this;
				return i._deferred = n || t.Deferred(), i._deferred.done(function(t) {
					i._callback && e.utils.parseCallback(i._callback)(t)
				}), i
			},
			resolve: function(e) {
				return this._deferred && this._deferred.resolve(e), this
			},
			getCallback: function() {
				return this._callback
			},
			setCallback: function(e) {
				return this._callback = e, this
			},
			clear: function() {
				return this._data = {}, this
			},
			getUI: function() {
				return this.ui
			},
			setUI: function(e) {
				return this.ui = e, e.init(this), this
			},
			getPassThrough: function() {
				return this._passThrough
			},
			setPassThrough: function(e) {
				n = e
			},
			reportError: function(t, n, i) {
				n = n ? "Msg:" + n + " " : "", t.errno ? n = n + "Error:(" + t.errno + ")" + t.errmsg : n += t.toString(), e.events.trigger((i ? "warn." : "error.") + this.name, n)
			},
			reportWarn: function(e, t) {
				this.reportError(e, t, !0)
			},
			extend: function() {
				var e = [].slice.apply(arguments);
				e.unshift(this), t.extend.apply(null, e)
			},
			setCaptchaUrl: function(e) {
				this._captchaUrl = e
			},
			getCaptchaUrl: function(n, i) {
				var o = this,
					r = o._captchaUrl,
					a = t.Deferred();
				return !i && r ? (r += "&_=" + (new Date).getTime(), a.resolve(r)) : e.sync.getCaptchaUrl(n).then(function(e) {
					r = o._captchaUrl = e.captchaUrl, r += "&_=" + (new Date).getTime(), a.resolve(r)
				}), a.promise()
			}
		}), t.each(["on", "one", "off", "trigger"], function(t, n) {
			i.prototype[n] = function() {
				return arguments[0] = arguments[0].replace(/( |$)/g, "." + this.name + "$1"), e.events[n].apply(null, arguments), this
			}
		}), e.getLogic = function(e) {
			return new i(e)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$;
		e.getUserInfo = function(n, i, o) {
			return "function" == t.type(n) && (o = i, i = n, n = void 0), e.sync.getUserInfo(n).done(function(e) {
				i && i(e)
			}).fail(function(e) {
				o && o(e)
			})
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		e.getUserSecInfo = function(t) {
			e.sync.getUserInfo().then(function(t) {
				return e.sync.getUserSecInfo(t.crumb)
			}).always(t)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		e.getEmailStatus = function(t) {
			e.sync.getUserInfo().then(function(t) {
				return e.sync.checkEmailStatus(t.crumb)
			}).always(t)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t, n = e.$;
		e.getQuickLoginStatus = function(i, o) {
			if(n.isFunction(i) && (o = i, i = 2e4), !t) {
				var r = e.getConfig("protocol"),
					a = r + "://axlogin.passport.360.cn/ptlogin.php",
					c = a + "?nextUrl=" + e.getConfig("proxy") + "&us=1&func=QHPass.getQuickLoginUserLength",
					s = n("<iframe>").attr("src", c).hide().appendTo(document.body);
				t = n.Deferred();
				var u = setTimeout(function() {
					t.reject()
				}, i);
				e.getQuickLoginUserLength = function(e) {
					t.resolve(e)
				}, t.always(function() {
					t = null, clearTimeout(u), s.remove()
				})
			}
			t.then(function(t) {
				o(n.extend({}, e.ERROR.SUCCESS, {
					status: t.us > 0 ? 1 : 2,
					userLength: t.us
				}))
			}, function() {
				o(n.extend({}, e.ERROR.TIME_OUT))
			})
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		e.signOut = function(t, n) {
			void 0 === n && (n = t, t = !0), e.sync.signOut(t).done(function() {
				e.events.trigger("success.signOut"), e.utils.parseCallback(n)()
			})
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-sign-in"><div class="quc-tip-wrapper"><p class="quc-tip"></p></div><div class="quc-main"></div><div class="quc-footer"><a class="quc-link quc-link-grey quc-link-normal-sign-in" href="#">\u4f7f\u7528\u5176\u4ed6\u5e10\u53f7\u767b\u5f55</a><a class="quc-link quc-link-grey quc-link-quick-sign-in" href="#">\u8fd4\u56de\u5feb\u901f\u767b\u5f55</a><a class="quc-link quc-link-grey quc-link-sign-up" href="#">\u6ce8\u518c\u65b0\u5e10\u53f7</a><a class="quc-link quc-link-about quc-link-about-normal" href="http://i.360.cn/findpwd/" target="_blank">\u5fd8\u8bb0\u5bc6\u7801\uff1f</a><a class="quc-link quc-link-about quc-link-about-mobile" href="http://i.360.cn/help/smscode" target="_blank">\u6821\u9a8c\u7801\u5e38\u89c1\u95ee\u9898</a><a class="quc-link quc-link-about quc-link-about-qrcode" href="http://i.360.cn/findpwd/customerhelper#qrcode" target="_blank">\u4ec0\u4e48\u662f\u4e8c\u7ef4\u7801\u767b\u5f55\uff1f</a><a class="quc-link quc-link-about quc-link-about-onekey" href="#">\u4ec0\u4e48\u662f\u4e00\u952e\u767b\u5f55\uff1f</a></div></div>',
			i = {
				normal: '<form method="POST" class="quc-form"><p class="quc-field quc-field-account quc-input-long"><label class="quc-label">\u5e10&nbsp;&nbsp;&nbsp;\u53f7</label><span class="quc-input-bg"><input class="quc-input quc-input-account" type="text" name="account" placeholder="\u624b\u673a\u53f7/\u7528\u6237\u540d/\u90ae\u7bb1" maxlength="50" autocomplete="off"/></span></p><p class="quc-field quc-field-password quc-input-long"><label class="quc-label">\u5bc6&nbsp;&nbsp;&nbsp;\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-password" type="password" name="password" maxlength="22" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u5bc6\u7801" /></span></p><p class="quc-field quc-field-captcha quc-input-short"><label class="quc-label">\u9a8c\u8bc1\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-captcha" type="text" name="phrase" maxlength="7" autocomplete="off" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801" /></span><img class="quc-captcha-img quc-captcha-change" alt="\u9a8c\u8bc1\u7801" title="\u70b9\u51fb\u66f4\u6362" tabindex="99" /> <a class="quc-link quc-captcha-change-link quc-captcha-change" href="#">\u6362\u4e00\u5f20</a></p><p class="quc-field quc-field-keep-alive"><label><input class="quc-checkbox quc-checkbox-keep-alive" type="checkbox" name="iskeepalive" checked="checked">\u4e0b\u6b21\u81ea\u52a8\u767b\u5f55</label></p><p class="quc-field quc-field-submit"><input type="submit" value="\u767b\u5f55" class="quc-submit quc-button quc-button-primary quc-button-sign-in" /> </p><p class="quc-field quc-field-third-part"><span>\u5176\u4ed6\u5e10\u53f7\u767b\u5f55\uff1a</span><span class="quc-third-part"></span></p></form>',
				mobile: '<form method="POST" class="quc-form"><p class="quc-field quc-field-mobile quc-input-long"><label class="quc-label">\u624b\u673a\u53f7</label><span class="quc-input-bg"><input type="tel" name="mobile" class="quc-input quc-input-mobile" maxlength="11" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7" /></span></p><p class="quc-field quc-field-captcha quc-input-short"><label class="quc-label">\u9a8c\u8bc1\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-captcha" type="text" name="captcha" maxlength="7" autocomplete="off" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801"/></span><img class="quc-captcha-img quc-captcha-change" alt="\u9a8c\u8bc1\u7801" title="\u70b9\u51fb\u66f4\u6362" tabindex="99" /><a class="quc-link quc-link-captcha-change quc-captcha-change" href="#">&nbsp;\u6362\u4e00\u5f20</a><i class="quc-tip-icon"></i></p><p class="quc-field quc-field-sms-token quc-input-middle"><label class="quc-label">\u6821\u9a8c\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-sms-token" type="tel" name="smscode" autocomplete="off" maxlength="6" placeholder="\u8bf7\u8f93\u5165\u77ed\u4fe1\u6821\u9a8c\u7801" /></span><a class="quc-button quc-button-blue quc-button-get-sms-token" href="#">\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801</a></p><p class="quc-field quc-field-keep-alive"><label><input class="quc-checkbox quc-checkbox-keep-alive" type="checkbox" name="iskeepalive" checked="checked">\u4e0b\u6b21\u81ea\u52a8\u767b\u5f55</label></p><p class="quc-field quc-field-submit"><input class="quc-submit quc-button quc-button-primary quc-button-sign-in" type="submit" value="\u767b\u5f55" /> </p></form>',
				qrcode: '<div class="quc-qrcode-wrapper"><div class="quc-qrcode-box"><img class="quc-qrcode" src="###"/><div class="quc-qrcode-mask"><i class="quc-qrcode-mask-bg"></i><div class="quc-qrcode-icon"><span class="quc-qrcode-tip-txt"></span><p class="quc-qrcode-refresh">\u5237\u65b0</p></div></div></div></div><p class="quc-title">\u4f7f\u7528 <a class="quc-link" href="http://i.360.cn/security/accountguard">360\u5e10\u53f7\u536b\u58eb</a>\u626b\u7801\u529f\u80fd\uff0c\u5b89\u5168\u767b\u5f55</p>',
				quick: '<div class="quc-loading"></div><iframe class="quc-sign-in-iframe" src="about:blank" frameborder="0" scrolling="no" allowtransparency></iframe>'
			},
			o = {
				sina: '<a href="#" class="quc-third-part-icon quc-third-part-icon-sina" title="\u65b0\u6d6a\u5fae\u535a\u767b\u5f55"></a>',
				renren: '<a href="#" class="quc-third-part-icon quc-third-part-icon-renren" title="\u4eba\u4eba\u767b\u5f55"></a>',
				tencent: '<a href="#" class="quc-third-part-icon quc-third-part-icon-tencent" title="QQ\u767b\u5f55"></a>',
				weixin: '<a href="#" class="quc-third-part-icon quc-third-part-icon-weixin" title="\u5fae\u4fe1\u767b\u5f55"></a>'
			},
			r = {
				quick: "\u5feb\u901f\u767b\u5f55",
				normal: "\u666e\u901a\u767b\u5f55",
				mobile: "\u77ed\u4fe1\u767b\u5f55",
				qrcode: "\u4e8c\u7ef4\u7801\u767b\u5f55",
				onekey: "\u4e00\u952e\u767b\u5f55"
			},
			a = {},
			c = 0,
			s = {
				init: function(e) {
					a = {}, this.model = e, this.$el = t(n), this.initForm(), this.initErrorTip(), this.initFooterLink(), this.initThirdPartSignIn(), this.initModelEvent(), this.initSmsToken(), this.initQrCode(), this.initCaptcha()
				},
				reset: function() {
					a = {}, this.initQuickSignIn(), c = 0, this.signInType = null, this.$el.find(".quc-tip").html("")
				},
				changeType: function(n) {
					var o, r = this,
						c = r.model,
						s = a[n];
					if(r.$el.attr("class", "quc-mod-sign-in quc-mod-" + n + "-sign-in"), !s) {
						s = a[n] = t(i[n]);
						var u = this.model.get("saveAccount");
						u && n == u.type && (o = s.find(".quc-input-account,.quc-input-mobile").val(u.account))
					}
					var l = r.$el.find(".quc-main");
					e.utils.resetPlaceholder(l.find("input, textarea")), l.empty().append(s), c.trigger("DOMUpdated", this.$el), r.signInType = n;
					var p = r.getTitle();
					r.$nav.replaceWith(p), r.$nav = p, s.find(".quc-input").each(function(e, n) {
						var i = t(n);
						if(!i.val()) return c.one("changeType afterShow", function() {
							o && o.focus(), i.focus()
						}), !1
					}), c.trigger("afterShow.changeType", r.$el[0]), c.trigger("changeType", n), c.trigger("changeType:" + n)
				},
				initQuickSignIn: function() {
					if(this.model.isQuickSignInAvailable()) {
						var e = t(i.quick);
						e.attr("src", this.model.getQuickSignInUrl()), a.quick = e
					}
				},
				initForm: function() {
					var n = this;
					n.model.on("changeType", function(i, o) {
						"quick" != o && (n.$el.find(".quc-checkbox-keep-alive").prop("checked", n.model.get("isKeepAlive")).change(function() {
							n.model.set("isKeepAlive", t(this).prop("checked"))
						}), n.$el.find(".quc-input").focus(function() {
							t(this).parent().addClass("quc-input-bg-focus")
						}).blur(function() {
							t(this).parent().removeClass("quc-input-bg-focus")
						}), n.$el.find(".quc-form").submit(function(e) {
							e.preventDefault();
							var i = t(this),
								r = n.model,
								a = i.find(".quc-button-sign-in");
							a.prop("disabled", !0).val("\u767b\u5f55\u4e2d..."), r.one("invalid", function() {
								a.prop("disabled", !1).val("\u767b\u5f55")
							}), "normal" == o ? (r.set("username", t.trim(i.find(".quc-input-account").val())), r.set("password", i.find(".quc-input-password").val()), r.set("captcha", t.trim(i.find(".quc-input-captcha").val())), r.set("isNeedCheckCaptcha", !!n.$el.find(".quc-field-captcha:visible")[0])) : "mobile" == o && (r.set("mobile", t.trim(i.find(".quc-input-mobile").val())), r.set("smsToken", t.trim(i.find(".quc-input-sms-token").val())), r.set("captcha", t.trim(i.find(".quc-input-captcha").val())), n.model.set("isNeedCheckCaptcha", !!n.$el.find(".quc-field-captcha:visible")[0])), n.model.submit(o)
						}), e.getConfig("signIn.showEmailHint", !0) && e.utils.emailHint(n.$el.find(".quc-input-account"), "account"))
					})
				},
				initFooterLink: function() {
					var e = this,
						t = this.$el.find(".quc-footer");
					t.find(".quc-link-sign-up").click(function(t) {
						t.preventDefault(), e.onSignUp()
					}).end().find(".quc-link-quick-sign-in").click(function(t) {
						t.preventDefault(), e.changeType("quick")
					}).end().find(".quc-link-normal-sign-in").click(function(t) {
						t.preventDefault(), e.changeType(e.model.getSignInTypes()[0])
					}), e.model.on("changeType", function(n, i) {
						"quick" == i ? 0 == e.model.getSignInTypes().length && t.hide() : e.model.isQuickSignInAvailable() || t.find(".quc-link-quick-sign-in").hide()
					})
				},
				initQrCode: function() {
					function n() {
						s.model.listenQrcodeLogin().done(function() {
							clearTimeout(d), clearInterval(p)
						})
					}

					function i() {
						o = s.model.getDomainApi(), a.show().find("span").html(l), r.hide(), r.off("load").on("load", function() {
							r.show(), a.hide(), c = (new Date).getTime(), p = setInterval(n, 2e3), d = setTimeout(function() {
								s.model.trigger("timeout"), clearInterval(p)
							}, u)
						}), r.off("error").on("error", function() {
							a.find("span").html("\u4e8c\u7ef4\u7801\u83b7\u53d6\u5931\u8d25"), a.find(".quc-qrcode-refresh").css("cursor", "pointer").show(), a.off("click").one("click", ".quc-qrcode-refresh", function() {
								a.find("span").html("\u4e8c\u7ef4\u7801\u52a0\u8f7d\u4e2d..."), t(this).hide(), i()
							}).show()
						}), r.attr("src", o)
					}
					var o, r, a, s = this,
						u = 1e3 * e.getConfig("signIn.qrCodeTTL", 120),
						l = "\u4e8c\u7ef4\u7801\u52a0\u8f7d\u4e2d...",
						p = 0,
						d = 0;
					s.model.on("changeType:qrcode", function() {
						r = s.$el.find(".quc-qrcode"), a = s.$el.find(".quc-qrcode-mask"), (new Date).getTime() - c >= u ? i() : (a.hide(), p = setInterval(n, 2e3)), s.model.on("changeType", function(e, t) {
							"qrcode" != t && clearInterval(p)
						})
					}).on("clearQrTime", function() {
						c = 0, clearTimeout(d), clearInterval(p)
					}).on("timeout", function() {
						clearInterval(p), a.find("span").html("\u4e8c\u7ef4\u7801\u5df2\u8fc7\u671f"), a.find(".quc-qrcode-refresh").css("cursor", "pointer").show(), a.off("click").one("click", ".quc-qrcode-refresh", function() {
							a.find("span").html("\u4e8c\u7ef4\u7801\u52a0\u8f7d\u4e2d..."), t(this).hide(), i()
						}).show()
					})
				},
				initSmsToken: function() {
					var t, n, i, o, r = this,
						a = e.utils.getTimer("sign_in");
					a.on("timer_start", function(e, t) {
						i.addClass("quc-button-disabled"), i.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), a.on("timer_tick", function(e, t) {
						i.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), a.on("timer_stop", function() {
						i.html("\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801"), i.removeClass("quc-button-disabled")
					});
					var c = function(e) {
						e.preventDefault(), i.hasClass("quc-button-disabled") || (r.model.set("mobile", t.val()), r.model.set("captcha", n.val()), i.html("\u53d1\u9001\u4e2d..."), i.addClass("quc-button-disabled"), r.model.sendSmsToken().done(function(e) {
							var t = r.$el.find(".quc-tip");
							t.removeClass("quc-tip-error").addClass("quc-tip-success").html("\u53d1\u9001\u6210\u529f").show(), o.find(".quc-input").one("change", function() {
								t.removeClass("quc-tip-success").html(t.attr("data-default-tip"))
							}), a.start(), r.model.set("token", e.vt), r.model.trigger("dealCaptcha")
						}).fail(function(e) {
							i.html("\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801"), i.removeClass("quc-button-disabled"), e.field = r.$el.find(".quc-field-mobile");
							var t = e.errdetail && e.errdetail.captchaUrl;
							t && (e.fromServer = !0, r.model.setCaptchaUrl(t)), r.model.trigger("invalid", e)
						}))
					};
					this.model.on("changeType:mobile", function() {
						o = r.$el.find(".quc-field-mobile"), t = o.find(".quc-input-mobile"), n = r.$el.find(".quc-input-captcha"), i = r.$el.find(".quc-button-get-sms-token"), i.off("click", c).on("click", c), a.isRunning() && a.resume()
					})
				},
				initThirdPartSignIn: function() {
					var e = this;
					e.model.on("changeType:normal", function() {
						var n = e.model.getThirdPartProviders();
						if(n = t.grep(n, function(t) {
								return !!o[t] || (e.model.trigger("warn", "\u9519\u8bef\u7684\u7b2c\u4e09\u65b9\u767b\u5f55\u7c7b\u578b\uff1a" + t), !1)
							}), n.length > 0) {
							var i = t("<span>").addClass("quc-third-part");
							t.each(n, function(n, r) {
								t(o[r]).click(function(t) {
									t.preventDefault(), e.model.thirdPartSignIn(r)
								}).appendTo(i)
							}), e.$el.find(".quc-third-part").replaceWith(i)
						} else e.$el.find(".quc-field-third-part").hide()
					})
				},
				initModelEvent: function() {
					var n = this;
					n.model.on("show", function(e, t) {
						n.show(t && t.wrapper)
					}).on("success", function() {
						var n = e.getConfig("signInBoxWrapper", ""),
							i = e.getConfig("signInBoxOpts", {});
						n && e.plugin.signInBox && t(n).empty().html(e.plugin.signInBox(i))
					}).on("hide", function() {
						n.hide()
					}).on("afterhide", function() {
						"qrcode" == n.getCurrentType() && n.model.trigger("clearQrTime")
					}).on("close", function() {
						"qrcode" == n.getCurrentType() && n.model.trigger("clearQrTime")
					}).on("dealCaptcha", function() {
						n.$el.find(".quc-field-captcha").hide(), n.$el.find(".quc-input-captcha").val(""), n.$el.find(".quc-input-mobile").off("change").on("change", function() {
							n.$el.find(".quc-field-captcha").show();
							try {
								n.$el.find(".quc-captcha-change").eq(0).trigger("click")
							} catch(e) {
								n.$el.find(".quc-captcha-img").attr("src", n.$el.find(".quc-captcha-img").attr("src") + "&_t=" + (new Date).getTime())
							}
							n.model.set("token", null), n.model.trigger("timer_stop")
						})
					})
				},
				initErrorTip: function() {
					var t = this;
					t.model.on("invalid", function(n, i) {
						var o = t.$el.find(".quc-tip");
						if(!i.signInType || t.signInType == i.signInType) {
							var r = t.$el.find(".quc-input-" + e.utils.getErrorType(i));
							"password" == e.utils.getErrorType(i) && e.utils.selectText(r), o.removeClass("quc-tip-success").addClass("quc-tip-error").html(i.errmsg), t.model.one("changeType", function() {
								o.html("")
							})
						}
					})
				},
				onSignUp: function() {
					this.model.signUp()
				},
				initCaptcha: function() {
					var n, i, o, r = this,
						a = !1,
						c = function(e) {
							r.model.getCaptchaUrl("login", !0).then(function(t) {
								n.find(".quc-captcha-img").attr("src", t);
								var i = n.find(".quc-input-captcha").val("");
								e && i.focus()
							})
						},
						s = function(t, i) {
							var o = "captcha" == e.utils.getErrorType(i);
							a && i.fromServer && r.signInType == i.signInType ? c(o) : o && (n.show(), a || c(!0), a = !0)
						},
						u = function(e) {
							l(e), i.show(), r.$el.find(".quc-captcha-change").off("click").off("mousedown").on("mousedown", function(e) {
								e.preventDefault()
							}).on("click", function(t) {
								t.preventDefault(), l(e), i.find(".quc-input-captcha").focus()
							})
						},
						l = function(e) {
							var n = "mobile" == e ? "strictreg" : "reg";
							r.model.getCaptchaUrl(n, !0).then(function(e) {
								i.find(".quc-captcha-img").attr("src", e), i.find(".quc-input-captcha").val(""), i.find(".quc-tip").removeClass("quc-tip-error").html(function() {
									return t(this).attr("data-default-tip")
								}), i.find(".quc-tip-icon").removeClass("quc-tip-icon-incorrect quc-tip-icon-correct")
							})
						},
						p = function(t, n) {
							var i = n.type || "mobile";
							o || "captcha" != e.utils.getErrorType(n) ? n.fromServer && l(i) : (o = !0, u(i))
						};
					r.model.on("changeType", function(e, o) {
						if(r.model.off("invalid", s), r.model.off("invalid", p), "normal" == o) n = r.$el.find(".quc-field-captcha"), r.$el.find(".quc-input-account").blur(function() {
							var e = t.trim(t(this).val());
							e && r.model.checkIsCaptchaRequired(e).done(function(e) {
								e ? (n.show(), c()) : n.hide(), a = e, r.$el.triggerHandler("QucDOMUpdated")
							})
						}), r.$el.find(".quc-captcha-change").off("click").off("mousedown").on("click", function(e) {
							e.preventDefault(), c()
						}).eq(0).trigger("click"), r.model.on("invalid", s);
						else if("mobile" == o) {
							if(r.model.set("token", null), i = r.$el.find(".quc-field-captcha"), 0 == i.length) return;
							u(o), r.model.on("invalid", p)
						}
					})
				},
				getCurrentType: function() {
					return this.signInType || (this.signInType = this.model.isQuickSignInAvailable() ? "quick" : this.model.getSignInTypes()[0]), this.signInType
				},
				getTitle: function() {
					var n, i = this,
						o = i.model.getSignInTypes(),
						a = i.getCurrentType();
					return "quick" == a || o.length < 2 ? n = t("<span>").html(e.getConfig("signIn.panelTitle", "\u6b22\u8fce\u767b\u5f55360")) : (n = t("<p>").addClass("quc-sign-in-nav quc-sign-in-nav-c" + o.length), t.each(o, function(e, o) {
						t("<a>").addClass(a == o ? "quc-current" : "").attr({
							href: "#",
							"data-type": o
						}).html(r[o] || "\u5176\u4ed6\u65b9\u5f0f").click(function(e) {
							e.preventDefault(), a != o && i.changeType(o)
						}).appendTo(n)
					})), n
				},
				show: function(n) {
					var i = this;
					if(this.reset(), this.$nav = this.getTitle(), this.changeType(this.getCurrentType()), n) this.model.trigger("beforeShow", this.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						var o = this.panel = new e.utils.Panel;
						o.setTitle(this.$nav), o.setContent(this.$el), this.model.trigger("beforeShow", this.$el[0]), o.show(), t(o).on("close", e.getConfig("signIn.panelCloseHandler", t.noop)), t(o).on("close", function() {
							i.model.trigger("close")
						})
					}
					this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforeHide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.signIn = {
			init: function() {
				s.init.apply(s, arguments)
			},
			changeType: function(e) {
				s.changeType(e)
			},
			setOnSignUpCallback: function(e) {
				s.onSignUp = e
			}
		}
	}(QHPass)
}, function(e, t, n) {
	(function(e, t) {
		var i = n(82);
		! function(o) {
			var r, a = o.$,
				c = n(13).getLogger("signIn"),
				s = n(86),
				u = n(90),
				l = o.getLogic({
					name: "signIn",
					validate: function(e, t) {
						var n = o.validate,
							i = !1;
						switch(t = t || this.get(e), e.toLowerCase()) {
							case "username":
								i = !t && n.checkAccount(t);
								break;
							case "password":
								i = n.checkPassword(t), i && (i = o.utils.isSameError(i, o.ERROR.PASSWORD_EMPTY) ? i : o.ERROR.PASSWORD_WRONG);
								break;
							case "mobile":
								i = n.checkMobile(t);
								break;
							case "smstoken":
								i = n.checkSmsToken(t);
								break;
							case "captcha":
								i = n.checkCaptcha(t)
						}
						return i
					},
					getSignInTypes: function() {
						return a.grep(o.getConfig("signIn.types"), function(e) {
							return "quick" != e
						})
					},
					getThirdPartProviders: function() {
						var e = o.getConfig("src"),
							t = ["pcw_so_wenda", "pcw_so_baike", "pcw_so_image", "pcw_so_music", "pcw_so", "pcw_so_map", "pcw_so_adunion", "pcw_so_zc", "pcw_so_zhanzhang", "pcw_open_app", "pcw_wan", "pcw_wan_youxi", "pcw_wan_tg"];
						return a.inArray(e, t) > -1 ? o.getConfig("signIn.thirdPart.providers", ["sina", "renren", "fetion", "telecom", "tencent", "weixin"]) || [] : o.getConfig("signIn.thirdPart.providers", ["sina", "renren", "fetion", "telecom"]) || []
					},
					prepareQuickSignIn: function(e) {
						var t = this,
							n = a.Deferred();
						return void 0 !== r && !e || a.inArray("quick", o.getConfig("signIn.types")) == -1 ? n.resolve() : (o.ptLogin = function(e) {
							0 == e.s ? o.sync.getRd().then(function(e) {
								return o.sync.setCookie(e.rd)
							}).then(function() {
								return o.getUserInfo(!1)
							}).then(function(e) {
								t.trigger("hide").trigger("success", e).resolve(e)
							}) : 2 == e.s && (r = !1, t.trigger("quickSignInFailed"), n.reject())
						}, o.getQuickLoginStatus(function(e) {
							r = 0 == e.errno && e.status < 2, n.resolve()
						})), n.promise()
					},
					isQuickSignInAvailable: function() {
						return !!r
					},
					sendSmsToken: function() {
						var e = this.get("mobile"),
							t = this.get("captcha"),
							n = this.get("token"),
							i = this.validate("mobile", e) || !n && this.validate("captcha", t);
						return i ? a.Deferred().reject(i).promise() : o.sync.sendSmsCodeNew({
							condition: u.SMS_CONDITION_EXIST,
							account: e,
							crumb: null,
							sms_scene: u.SMS_SCENE_LOGIN,
							captcha: t,
							vt: n
						})
					},
					run: function(e) {
						c.debug("sign in");
						var t = this;
						t.isInit() || t.set("isKeepAlive", o.getConfig("signIn.defaultKeepAlive")), t.init().trigger("showLoading");
						var n = o.utils.storage().get("lastSignInAccount", "").split(",");
						n[2] && (new Date).getTime() <= n[2] ? t.set("saveAccount", {
							type: n[1],
							account: n[0]
						}) : o.utils.storage().remove("lastSignInAccount"), t.prepareQuickSignIn().always(function() {
							t.trigger("hideLoading").trigger("show", {
								wrapper: e
							})
						})
					},
					submit: function(n) {
						var i, r = this,
							a = {
								type: n
							},
							u = r.get("isNeedCheckCaptcha", !1);
						return this.trigger("beforeSubmit"), "mobile" == n ? (a.account = r.get("mobile"), a.password = r.get("smsToken"), i = r.validate("mobile") || u && r.validate("captcha") || r.validate("smsToken")) : (u = r.get("isNeedCheckCaptcha"), a.account = r.get("username"), a.password = r.get("password"), a.captcha = r.get("captcha"), i = r.validate("username") || r.validate("password") || u && r.validate("captcha")), a.isKeepAlive = r.get("isKeepAlive"), i ? (i.signInType = n, void r.trigger("invalid", i)) : void e.resolve(o.sync.signIn(a)).then(function(t) {
							return t && 0 === t.errno ? (r.trigger("hide"), o.sync.setCookie(t.s).then(function() {
								return t.userinfo || {}
							})) : e.reject(new Error("login fail"))
						}).then(function(n) {
							var a;
							return a = o.isI360() && t.startsWith(location.pathname, "/oauth/bind") ? e.resolve() : s.tryHandleAbnormalPassword(n, r.get("password")), a.then(function(t) {
								if(t && t.shouldChangePassword) return o.isI360() ? (s.gotoPageWithSearchParams("/profile/chuserpwd?op=modifyPwd"), e.reject(new Error("auto goto change pwd page"))) : new e(function(e, t) {
									o.modifyPassword(function() {
										c.debug("change password success"), o.$message({
											title: "\u5bc6\u7801\u4fee\u6539\u6210\u529f",
											content: "\u5bc6\u7801\u4fee\u6539\u6210\u529f, \u8bf7\u60a8\u4f7f\u7528\u65b0\u5bc6\u7801\u767b\u5f55"
										}).then(function() {
											e()
										})
									}), r.trigger("invalid", i)
								})
							}).caught(function(t) {
								return /goto/i.test(t.message) || (c.debug("sign out"), o.signOut(function() {
									c.debug("sign out success")
								})), e.reject(t)
							})
						}).then(function() {
							return o.getUserInfo(!1)
						}).then(function(e) {
							var t = o.getConfig("signIn.saveAccount", 604800);
							if(t && "normal" == n) {
								var i = (new Date).getTime() + 1e3 * t;
								o.utils.storage().set("lastSignInAccount", [a.account, n, i].join(","))
							}
							r.trigger("success", e).resolve(e)
						}, function(e) {
							c.debug("login fail", e), e.fromServer = !0, e.signInType = n;
							var t = e.errdetail && e.errdetail.captchaUrl;
							t && r.setCaptchaUrl(t), r.trigger("invalid", e)
						})
					},
					checkIsCaptchaRequired: function(e) {
						var t = a.Deferred(),
							n = this;
						return o.sync.checkSignInCaptchaRequired(e).always(function(e) {
							e.captchaUrl && n.setCaptchaUrl(e.captchaUrl), t.resolve(!!e.captchaFlag)
						}), t.promise()
					},
					getQuickSignInUrl: function() {
						var e = a.map(o.getConfig("domainList", []), function(e) {
								return e.split(".")[0]
							}).join(","),
							t = o.getConfig("protocol"),
							n = o.getConfig("signIn.quick.showUserNum", 3),
							i = o.getConfig("signIn.quick.stylesheet", ""),
							r = o.getConfig("signIn.quick.mode", "picture");
						return t + "://axlogin.passport.360.cn/ptlogin.php?displayType=" + r + "&custUserNum=" + n + "&nextUrl=" + encodeURIComponent(o.getConfig("proxy")) + "&requestScema=" + t + "&custStyleUrl=" + encodeURIComponent(i) + "&src=" + o.getConfig("src") + "&domain_list=" + e + "&t=" + (new Date).getTime()
					},
					thirdPartSignIn: function(e, n) {
						var i, r = this,
							c = o.getConfig("signIn.thirdPart", {}),
							s = "jump" == c.mode,
							u = this.get("callback"),
							l = s && c.jumpUrl || s && "string" == typeof u && u || location.href,
							p = {
								sina: "Sina",
								renren: "RenRen",
								msn: "Msn",
								fetion: "Fetion",
								telecom: "Telecom",
								tencent: "qq",
								weixin: "weixin"
							};
						t.isFunction(n) && r.setCallback(n), l = s ? l.replace(/(?:http(s?):\/\/)?(.*)/, "http$1://$2") : l.replace(/((?:https?:\/\/)?[\w.:]*\/?).*/, "$1");
						var d = l,
							f = o.getConfig("protocol") + "://i.360.cn/oauth/loginByOauth?c=" + p[e] + "&type=" + (s ? "normal" : "pop") + "&destUrl=" + encodeURIComponent(d) + "&f=" + o.getConfig("src") + "&r=" + (new Date).getTime();
						if(s) location.href = f;
						else {
							var h = "";
							if("tab" != c.mode) {
								var m = a(window),
									g = 645,
									v = 875,
									q = Math.max(Math.round((m.outerWidth() - v) / 2), 0),
									b = Math.max(Math.round((m.outerHeight() - g) / 2), 0);
								h = "height=" + g + ",width=" + v + ",left=" + q + ",top=" + b + ",alwaysRaised=yes"
							}
							i = window.open(f, "oauthlogin", h)
						}
						o.thirdLoginSuccess = function() {
							o.sync.getRd().then(function(e) {
								return o.sync.setCookie(e.rd)
							}).then(function() {
								return o.getUserInfo(!1)
							}).then(function(e) {
								i.close();
								var t = r.trigger("hide").trigger("success", e);
								t.resolve(e)
							}, function(e) {
								o.reportWarn(e), r.trigger("invalid", e)
							})
						}
					},
					getDomainApi: function() {
						var e = o.getConfig("currentDomain", ""),
							t = e || location.hostname.replace(/^(?:.+\.)?(\w+\.\w+)$/, "$1"),
							n = o.getConfig("protocol") + "://login." + t + "/?o=sso&m=getLoginQrcode&s=3";
						return o.getConfig("signIn.qrCodeUrl", n) + "&t=" + Math.random()
					},
					signUp: function() {
						var e = this.getCallback();
						o.signUp ? (this.trigger("hide"), o.signUp(e)) : location.href = "http://i.360.cn/reg/?src=" + o.getConfig("src") + "&destUrl=" + encodeURIComponent("string" == typeof e ? e : location.href)
					},
					listenQrcodeLogin: function() {
						var e = this;
						if(o.utils.getCookie("i360QRKEY")) return o.sync.checkQrCodeSignInStatus().done(function(t) {
							return o.sync.setCookie(t.s).then(function() {
								return o.getUserInfo(!1)
							}).then(function(t) {
								e.trigger("hide").trigger("success", t).resolve(t)
							}, function(t) {
								o.reportWarn(t), e.trigger("invalid", t)
							})
						})
					}
				});
			o.thirdPartSignIn = function(e, t) {
				return l.init(), l.thirdPartSignIn(e, t)
			}, o.events.on("init.core", function() {
				o.getConfig("signIn.prepareQuick", !1) && l.prepareQuickSignIn()
			}), o.signIn = function(e, t) {
				i.load(), !e || 1 == e.nodeType || e instanceof a || (t = e, e = void 0), l.setCallback(t).run(e)
			}, o.setConfig({
				signIn: {
					types: ["quick", "normal"],
					defaultKeepAlive: !0
				}
			})
		}(QHPass)
	}).call(t, n(30), n(1))
}, function(e, t, n) {
	var i = n(13).getLogger("modifyPassword");
	! function(e) {
		"use strict";
		var t = e.$,
			n = '<div class="quc-mod-modify-password"><p class="quc-tip">&nbsp;</p><form class="quc-form"><p class="quc-field quc-input-long"><label class="quc-label">\u65b0\u5bc6\u7801</label><span class="quc-input-bg"><input type="password" name="password" class="quc-input quc-input-password" placeholder="\u8bf7\u8f93\u5165\u65b0\u5bc6\u7801"></span></p><p class="quc-field quc-input-long"><label class="quc-label">\u786e\u8ba4\u5bc6\u7801</label><span class="quc-input-bg"><input type="password" name="passwordAgain" class="quc-input  quc-input-passwordAgain" placeholder="\u8bf7\u518d\u8f93\u5165\u4e00\u904d\u65b0\u5bc6\u7801"></span></p><p class="quc-field"><input class="quc-button quc-button-primary quc-button-big quc-button-submit" value="\u63d0\u4ea4" type="submit"/></p></form></div>',
			o = {
				init: function(e) {
					this.model = e, this.$el = t(n), this._$el = this.$el, this.initModelEvent(), this.initElementEvent()
				},
				reset: function() {
					i.debug("reset"), this.$el = this._$el, this.$el.find(".quc-button-submit").prop("disabled", !1).val("\u63d0\u4ea4"), this.$el.find(".quc-tip").removeClass("quc-tip-error quc-tip-success").html(""), this.$el.find(".quc-input").val("").parent().removeClass("quc-input-bg-focus")
				},
				initElementEvent: function() {
					var e = this;
					e.$el.find(".quc-input").focus(function() {
						t(this).parent().addClass("quc-input-bg-focus")
					}).blur(function() {
						t(this).parent().removeClass("quc-input-bg-focus"), e.model.set("password", e.$el.find(".quc-input-password").val()), e.model.set("passwordAgain", e.$el.find(".quc-input-passwordAgain").val())
					}).blur(function() {
						var n, i = t(this).val(),
							o = t(this).attr("name");
						i.length > 0 && ("password" == o ? n = e.model.validate(o, !0).done(function(t) {
							e.model.set("weakError", !1), e.model.set("oldpwd", i)
						}).fail(function(t) {
							t && (e.model.set("weakError", t), e.showTip(t.errmsg, t.errno))
						}) : (n = e.model.validate(o), n ? e.showTip(n.errmsg, n.errno) : n = e.model.validate("password", !0).done(function(t) {
							e.model.set("weakError", !1), e.model.set("oldpwd", i)
						}).fail(function(t) {
							t && (e.model.set("weakError", t), e.showTip(t.errmsg, t.errno))
						})))
					}), e.$el.find(".quc-form").submit(function(t) {
						t.preventDefault(), e.submit()
					})
				},
				initModelEvent: function() {
					var t = this;
					t.model.on("show", function(e, n) {
						t.show(n && n.wrapper)
					}).on("hide", function() {
						t.hide()
					}).on("invalid", function(n, i) {
						e.utils.isSameError(i.errno, e.ERROR.IDENTIFY_EXPIRE) || t.showTip(i)
					}).on("reset", function() {
						t.$el.find(".quc-button-submit").prop("disabled", !1).val("\u63d0\u4ea4")
					})
				},
				showTip: function(e, t) {
					var n = this,
						i = this.$el.find(".quc-tip");
					e && e.errno && (t = e.errno, e = e.errmsg), t ? (i.addClass("quc-tip-error").removeClass("quc-tip-success"), setTimeout(function() {
						n.$el.one("focus", ".quc-input", function() {
							i.html("")
						})
					}, 30), n.$el.find(".quc-button-submit").prop("disabled", !1).val("\u63d0\u4ea4")) : i.addClass("quc-tip-success").removeClass("quc-tip-error"), i.html(e)
				},
				submit: function() {
					var e = this,
						t = e.$el.find(".quc-button-submit"),
						n = e.model.get("weakError");
					(!n || 50001 != n.errno && 1091 != n.errno) && (t.prop("disable", !0).val("\u63d0\u4ea4\u4e2d..."), e.model.one("invalid", function() {
						t.prop("disable", !1).val("\u63d0\u4ea4")
					}), e.model.set("password", e.$el.find(".quc-input-password").val()), e.model.set("passwordAgain", e.$el.find(".quc-input-passwordAgain").val()), e.model.submit())
				},
				show: function(n) {
					if(this.reset(), i.debug("show panel"), n) this.model.trigger("beforeShow", this.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						var o = this.panel = new e.utils.Panel;
						o.setTitle(e.getConfig("modifyPassword.panelTitle", "\u4fee\u6539\u5bc6\u7801")), o.setContent(this.$el), this.model.trigger("beforeShow", this.$el[0]), o.show(), t(o).on("close", e.getConfig("modifyPassword.panelCloseHandler", t.noop))
					}
					this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					i.debug("hide panel"), this.model.trigger("beforeHide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.modifyPassword = {
			init: function() {
				o.init.apply(o, arguments)
			}
		}
	}(QHPass),
	function(e) {
		"use strict";
		var t = e.getLogic({
			name: "modifyPassword",
			validate: function(t, n) {
				i.debug("validate", t, n);
				var o, r = this.get("password"),
					a = this.get("passwordAgain");
				switch(t) {
					case "password":
						var c = e.getUserInfoCache() || {},
							s = e.validate.checkPasswordFrontendSync({
								password: r,
								username: c.userName
							});
						o = s.reason, !o && a && (o = this.validate("passwordAgain"));
						break;
					case "passwordAgain":
						o = e.validate.checkPasswordConfirm(r, a)
				}
				if(!n) return o;
				var u = $.Deferred();
				if(o) return u.reject(o);
				switch(t.toLowerCase()) {
					case "password":
						return this.get("oldpwd") != r ? e.sync.checkWeakPwd(r) : u.resolve(this.get("weakError"))
				}
			},
			run: function(t) {
				var n = this;
				n.init().trigger("showLoading"), i.debug("show loading and identify"), e.identify(n).always(function() {
					n.trigger("hideLoading")
				}).done(function() {
					n.trigger("show", {
						wrapper: t
					})
				})
			},
			submit: function() {
				var t = this,
					n = !1;
				i.debug("submit"), this.trigger("beforeSubmit"), $.each(["password", "passwordAgain"], function(e, i) {
					if(n = t.validate(i)) return t.trigger("invalid", n), !1
				}), n || (i.debug("validate pass"), e.getUserInfo().then(function(n) {
					return e.sync.modifyPassword(n.crumb, t.get("password"))
				}).then(function(e) {
					t.trigger("hide").resolve(e), i.debug("success")
				}, function(e) {
					t.trigger("invalid", e), i.debug("error")
				}))
			}
		});
		e.modifyPassword = function(e, n) {
			i.debug("run"), "function" == typeof e && (n = e, e = void 0), t.setCallback(n).run(e)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-sign-up quc-clearfix"><div class="quc-left-bar"><ul class="quc-sign-up-type"></ul></div><div class="quc-main"><div class="quc-tip-wrapper quc-global-error"><p class="quc-tip quc-tip-error"></p></div><form class="quc-form" method="post" action="https://i.360.cn/signUp/dosignUpAccount"><p class="quc-field quc-field-submit"><input class="quc-button quc-button-primary quc-button-sign-up" type="submit" value="\u7acb\u5373\u6ce8\u518c" /></p><p class="quc-field quc-field-licence"><label><input class="quc-checkbox" type="checkbox" name="is_agree" data-name="agreeLicence"><span>\u9605\u8bfb\u5e76\u540c\u610f<a class="quc-link" href="//i.360.cn/pub/protocol.html" target="_blank">\u201c360\u7528\u6237\u534f\u8bae\u201d</a>\u548c<a class="quc-link" href="//i.360.cn/reg/privacy" target="_blank">\u201c360\u7528\u6237\u9690\u79c1\u653f\u7b56\u201d</a></span></label></p><p class="quc-login">\u5df2\u6709\u5e10\u53f7\uff0c<a href="#" class="quc-link quc-link-login">\u7acb\u5373\u767b\u5f55</a></p></form></div></div>',
			i = {
				mobile: '<p class="quc-field quc-field-mobile quc-input-long"><label class="quc-label">\u624b\u673a\u53f7</label><span class="quc-input-bg"><input class="quc-input quc-input-mobile" type="tel" name="account" data-name="mobile" maxlength="11" /></span><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7</span></p>',
				email: '<p class="quc-field quc-field-email quc-input-long"><label class="quc-label">\u90ae\u7bb1</label><span class="quc-input-bg"><input class="quc-input quc-input-email" type="text" name="account" data-name="email" autocomplete="off"/></span><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u8f93\u5165\u60a8\u7684\u5e38\u7528\u90ae\u7bb1\uff0c<a class="quc-link" href="http://email.163.com/" target="_blank" tabindex="99">\u6ca1\u6709\u90ae\u7bb1\uff1f</a></span></p>',
				username: '<p class="quc-field quc-field-username quc-input-long"><label class="quc-label">\u7528\u6237\u540d</label><span class="quc-input-bg"><input class="quc-input quc-input-username" type="text" name="userName" data-name="username" maxlength="14" /></span><i class="quc-tip-icon"></i><span class="quc-tip">2-14\u4e2a\u5b57\u7b26\uff1a\u82f1\u6587\u3001\u6570\u5b57\u6216\u4e2d\u6587</span></p>',
				nickname: '<p class="quc-field quc-field-nickname quc-input-long"><label class="quc-label">\u6635\u79f0</label><span class="quc-input-bg"><input class="quc-input quc-input-nickname" type="text" name="nickname" maxlength="14" /></span><i class="quc-tip-icon"></i><span class="quc-tip">2-14\u4e2a\u5b57\u7b26\uff1a\u82f1\u6587\u3001\u6570\u5b57\u6216\u4e2d\u6587</span></p>',
				password: '<p class="quc-field quc-field-password quc-input-long"><label class="quc-label">\u5bc6\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-password" type="password" name="password" maxlength="22" /></span><i class="quc-tip-icon"></i><span class="quc-tip">8-20\u4e2a\u5b57\u7b26(\u533a\u5206\u5927\u5c0f\u5199)</span></p>',
				passwordAgain: '<p class="quc-field quc-field-password-again quc-input-long"><label class="quc-label">\u786e\u8ba4\u5bc6\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-password-again" type="password" name="passwordAgain" maxlength="22" /></span><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801</span></p>',
				captcha: '<p class="quc-field quc-field-captcha quc-input-short"><label class="quc-label">\u9a8c\u8bc1\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-captcha" type="text" name="captcha" maxlength="7" autocomplete="off" /></span><img class="quc-captcha-img quc-captcha-change" alt="\u9a8c\u8bc1\u7801" title="\u70b9\u51fb\u66f4\u6362" tabindex="99" /><a class="quc-link quc-link-captcha-change quc-captcha-change" href="#">\u6362\u4e00\u5f20</a><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u8f93\u5165\u56fe\u4e2d\u7684\u5b57\u6bcd\u6216\u6570\u5b57\uff0c\u4e0d\u533a\u5206\u5927\u5c0f\u5199</span></p>',
				smsToken: '<p class="quc-field quc-field-sms-token quc-input-middle quc-clearfix"><label class="quc-label">\u6821\u9a8c\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-sms-token" type="text" name="smscode" data-name="smsToken" maxlength="6" /></span><a href="#" class="quc-button quc-button-blue quc-get-sms-token">\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801</a><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u8f93\u5165\u77ed\u4fe1\u4e2d6\u4f4d\u6570\u5b57\u6821\u9a8c\u7801</span><a class="quc-mobile-tip quc-link" href="http://i.360.cn/help/smscode" target="_blank" tabindex="99">\u6821\u9a8c\u7801\u5e38\u89c1\u95ee\u9898</a></p>'
			},
			o = {
				email: {
					name: "\u90ae\u7bb1\u6ce8\u518c",
					fields: ["email", "username", "nickname", "password", "passwordAgain", "captcha"]
				},
				mobile: {
					name: "\u624b\u673a\u6ce8\u518c",
					fields: ["mobile", "captcha", "smsToken", "username", "nickname", "password", "passwordAgain"]
				},
				username: {
					name: "\u7528\u6237\u540d\u6ce8\u518c",
					fields: ["username", "nickname", "password", "passwordAgain", "captcha"]
				}
			},
			r = {},
			a = {
				init: function(e) {
					this.model = e, this.initModelEvent(), this.initCaptcha(), this.initSmsToken(), this.initErrorTip()
				},
				setElement: function() {
					r = {};
					var e = this;
					e.$el && e.$el.remove(), e.$el = t(n), e.userType = null, e.initNav(), e.$el.on("click", ".quc-link-login,.quc-button-login", function(t) {
						t.preventDefault(), e.onSignIn()
					}), e.$el.find(".quc-form").submit(function(t) {
						t.preventDefault(), e.submit()
					}), e.$el.find(".quc-checkbox").on("click", function() {
						e.model.trigger("afterShow.changeType")
					})
				},
				initModelEvent: function() {
					var n = this;
					n.model.on("show", function(e, t) {
						n.show(t && t.wrapper)
					}).on("success", function() {
						var n = e.getConfig("signInBoxWrapper", ""),
							i = e.getConfig("signInBoxOpts", {});
						n && e.plugin.signInBox && t(n).empty().html(e.plugin.signInBox(i))
					}).on("hide", function() {
						n.hide()
					}).on("dealCaptcha", function() {
						n.$el.find(".quc-field-captcha").hide(), n.$el.find(".quc-input-captcha").val(""), n.$el.find(".quc-input-mobile").off("change").on("change", function() {
							n.$el.find(".quc-field-captcha").show(), n.$el.find(".quc-captcha-change").trigger("click"), n.model.set("token", null), n.model.trigger("timer_stop")
						})
					})
				},
				initCaptcha: function() {
					var n, i, o = this,
						r = function(e) {
							var n = "mobile" == e ? "strictreg" : "reg";
							o.model.getCaptchaUrl(n, !0).then(function(e) {
								i.find(".quc-captcha-img").attr("src", e), i.find(".quc-input-captcha").val(""), i.find(".quc-tip").removeClass("quc-tip-error").html(function() {
									return t(this).attr("data-default-tip")
								}), i.find(".quc-tip-icon").removeClass("quc-tip-icon-incorrect quc-tip-icon-correct")
							})
						},
						a = function(e) {
							r(e), i.show(), i.find(".quc-captcha-change").on("mousedown", function(e) {
								e.preventDefault()
							}).on("click", function(t) {
								t.preventDefault(), r(e), i.find(".quc-input-captcha").focus()
							})
						};
					o.model.on("changeType", function(e, t) {
						i = o.$el.find(".quc-field-captcha"), 0 != i.length && (n || (n = o.model.isCaptchaRequired()) || "mobile" == t) && a(t)
					}), this.model.on("invalid", function(t, i) {
						var o = i.type || "reg";
						n || "captcha" != e.utils.getErrorType(i) ? i.fromServer && r(o) : (n = !0, a(o))
					})
				},
				initSmsToken: function() {
					var t, n, i, o, r = this,
						a = "quc-button-disabled",
						c = e.utils.getTimer("sign_up");
					c.on("timer_start", function(e, t) {
						n.addClass(a), n.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), c.on("timer_tick", function(e, t) {
						n.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), c.on("timer_stop", function() {
						n.html("\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801"), n.removeClass(a)
					}), r.model.on("timer_stop", function() {
						c.stop()
					});
					var s = function(e) {
						e.preventDefault();
						var s = n.siblings(".quc-tip-icon");
						n.hasClass(a) || (r.model.set("mobile", t.val()), r.model.set("captcha", o.val()), n.html("\u53d1\u9001\u4e2d..."), n.addClass(a), s.hide(), r.model.trigger("afterShow.changeType"), r.model.sendSmsToken().done(function(e) {
							var t = i.find(".quc-tip");
							t.addClass("quc-tip-success").html("\u53d1\u9001\u6210\u529f").show(), i.find(".quc-input").one("change", function() {
								t.removeClass("quc-tip-success").html(t.attr("data-default-tip"))
							}), s.show(), c.start(), r.model.set("token", e.vt), r.model.trigger("dealCaptcha")
						}).fail(function(e) {
							s.show(), n.html("\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801"), n.removeClass(a), e.type = "mobile";
							var t = e.errdetail && e.errdetail.captchaUrl;
							t && (e.fromServer = !0, r.model.setCaptchaUrl(t)), r.model.trigger("invalid", e)
						}))
					};
					this.model.on("changeType", function() {
						i = r.$form.find(".quc-field-sms-token"), t = r.$form.find(".quc-input-mobile"), o = r.$form.find(".quc-input-captcha"), n = i.find(".quc-get-sms-token"), 0 != i.length && (n.off("click", s).on("click", s), c.isRunning() && c.resume())
					})
				},
				initErrorTip: function() {
					var e = this;
					e.model.on("invalid", function(t, n) {
						var i = n.field || e.getErrorField(n.errno),
							o = i.find(".quc-input-bg"),
							r = i.find(".quc-tip"),
							a = i.find(".quc-tip-icon");
						r.removeClass("quc-tip-success").addClass("quc-tip-error").html(n.errmsg).show(), a.removeClass("quc-tip-icon-incorrect").addClass("quc-tip-icon-incorrect"), o.addClass("quc-input-bg-incorrect"), i.find(".quc-input").one("focus quc-validate", function() {
							r.removeClass("quc-tip-error").html(r.attr("data-default-tip")), a.removeClass("quc-tip-icon-incorrect"), o.removeClass("quc-input-bg-incorrect")
						})
					}), e.model.on("afterShow.changeType", function() {
						e.$el.find(".quc-global-error .quc-tip").html("")
					})
				},
				initNav: function() {
					var e = this,
						n = this.model.getTypes(),
						i = this.$el.find(".quc-left-bar").show().find(".quc-sign-up-type").empty();
					t.each(n, function(n, r) {
						if(o[r]) {
							var a = t("<a>").attr("href", "#").html(o[r].name).prepend(t("<i>").addClass("quc-icon quc-icon-" + r)).click(function(t) {
								t.preventDefault(), e.changeType(r)
							});
							t("<li>").addClass("quc-type-" + r).append(a).appendTo(i)
						}
					}), this.changeType(n[0])
				},
				onSignIn: function() {
					this.model.signIn()
				},
				getFieldEl: function(e) {
					var n = this,
						o = i[e],
						r = t(o);
					return r.find(".quc-input").focus(function() {
						t(this).parent().addClass("quc-input-bg-focus"), n.model.trigger("afterShow.changeType")
					}).blur(function() {
						t(this).parent().removeClass("quc-input-bg-focus"), n.validate(r), r.hasClass("quc-field-password") && n.validate(r.siblings(".quc-field-password-again")), r.hasClass("quc-field-password-again") && n.validate(r.siblings(".quc-field-password"))
					}), r
				},
				getFormEl: function(n) {
					var i = this;
					if(!r[n]) {
						if(!o[n]) return void i.model.reportWarn("\u672a\u5b9a\u4e49\u7684\u7c7b\u522b typeConf:" + n);
						var a = t("<div>");
						t.each(o[n].fields, function(e, t) {
							i.model.isShowField(t, n) && a.append(i.getFieldEl(t))
						}), r[n] = a, e.utils.emailHint(a.find(".quc-input-email"))
					}
					return r[n][0]
				},
				getErrorField: function(t) {
					var n = e.utils.getErrorType(t);
					return "account" == n ? this.$form.find(".quc-field-" + this.userType) : "other" != n ? this.$form.find(".quc-field-" + n) : this.$el.find(".quc-global-error")
				},
				changeType: function(e) {
					var n = this.$el.find(".quc-sign-up-type .quc-type-" + e);
					n.length > 0 && this.userType != e && (n.addClass("quc-current"), n.siblings(".quc-current").removeClass("quc-current"), this.$form && this.$form.detach(), this.$form = t(this.getFormEl(e)), this.$form.prependTo(this.$el.find(".quc-form")), this.model.trigger("DOMUpdated", this.$el), this.$el.triggerHandler("QucDOMUpdated"), this.model.trigger("afterShow.changeType", this.$el[0]), this.model.trigger("changeType", e), this.userType = e, this.$form.find(".quc-field .quc-tip").attr("data-default-tip", function() {
						return t(this).html()
					}), this.model.clear())
				},
				validate: function(e) {
					var t = this,
						n = e.find(".quc-input"),
						i = n.attr("data-name") || n.attr("name"),
						o = n.val();
					0 != e.length && 0 != o.length && (n.trigger("quc-validate"), t.model.validate(i, o, !0).done(function() {
						var t = e.find(".quc-tip-icon");
						t.removeClass("quc-tip-icon-incorrect").addClass("quc-tip-icon-correct"), n.one("focus", function() {
							t.removeClass("quc-tip-icon-correct")
						})
					}).fail(function(n) {
						n.field = e, t.model.trigger("invalid", n)
					}))
				},
				submit: function() {
					var e = this,
						n = e.$el.find(".quc-button-sign-up");
					e.$el.find(".quc-form input:not(:submit, :button)").each(function(n, i) {
						var o = t(i),
							r = o.attr("data-name") || o.attr("name"),
							a = t.inArray(o.attr("type"), ["checkbox", "radio"]) >= 0 ? o.prop("checked") : o.val();
						e.model.set(r, a)
					});
					var i = e.model.get("agreeLicence");
					i === !1 && (e.$el.find("[name=is_agree]").is(":visible") || e.model.set("agreeLicence", !0)), n.prop("disabled", !0).val("\u63d0\u4ea4\u4e2d..."), e.model.one("invalid", function() {
						n.prop("disabled", !1).val("\u63d0\u4ea4")
					}), e.model.set("isNeedCheckCaptcha", !!e.$el.find(".quc-field-captcha:visible")[0]), e.model.set("userType", this.userType), e.model.submit()
				},
				show: function(n) {
					if(this.setElement(), n) this.model.trigger("beforeShow", this.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						var i = this.panel = new e.utils.Panel;
						i.setTitle(e.getConfig("signUp.panelTitle", "\u6b22\u8fce\u6ce8\u518c360\u5e10\u53f7")), i.setContent(this.$el), this.model.trigger("beforeShow", this.$el[0]), i.show(), t(i).on("close", e.getConfig("signUp.panelCloseHandler", t.noop));
						var o = e.utils.browser;
						(o.ie6 || o.ie7) && i.setSize(o.ie6 ? 564 : 544)
					}
					this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforeHide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.signUp = {
			init: function() {
				a.init.apply(a, arguments)
			},
			changeType: function(e) {
				a.changeType(e)
			}
		}
	}(QHPass)
}, function(e, t, n) {
	var i = n(82);
	! function(e) {
		var t, o = e.$,
			r = n(90),
			a = {
				email: 1,
				mobile: 2,
				username: 4
			},
			c = e.getLogic({
				name: "signUp",
				validate: function(t, n, i) {
					var r, a = e.validate;
					switch("boolean" == typeof n && (n = this.get(t)), t.toLowerCase()) {
						case "mobile":
							r = a.checkMobile(n);
							break;
						case "email":
							r = a.checkEmail(n);
							break;
						case "username":
							this.set("username", n), r = a.checkUsername(n);
							break;
						case "nickname":
							r = a.checkNickname(n);
							break;
						case "password":
							this.set("password", n);
							var c = a.checkPasswordFrontendSync({
								password: n,
								username: this.get("username")
							});
							r = c.reason;
							break;
						case "passwordagain":
							r = a.checkPasswordConfirm(this.get("password"), n);
							break;
						case "captcha":
							r = a.checkCaptcha(n);
							break;
						case "smstoken":
							r = a.checkSmsToken(n)
					}
					if(!i) return r;
					var s = e.sync,
						u = o.Deferred();
					if(r) return u.reject(r);
					switch(t.toLowerCase()) {
						case "mobile":
							return s.checkMobileNumberExist(n);
						case "email":
							return s.checkEmailExist(n);
						case "username":
							return s.checkUsernameExist(n);
						case "nickname":
							return s.checkNicknameExist(n);
						default:
							return u.resolve()
					}
				},
				isCaptchaRequired: function() {
					return t
				},
				prepareCaptcha: function() {
					var n = this;
					return e.sync.checkSignUpCaptchaRequired().then(function(e) {
						t = e.captchaFlag, n.setCaptchaUrl(e.captchaUrl)
					}, function() {
						return t = !0, o.Deferred().resolve().promise()
					})
				},
				isShowField: function(t, n) {
					var i = o.inArray(t, ["username", "nickname", "passwordAgain"]) >= 0,
						r = "signUp.hide" + t.substr(0, 1).toUpperCase() + t.substr(1);
					return !i || n == t || !e.getConfig(r, !1)
				},
				sendSmsToken: function() {
					var t = this.get("mobile"),
						n = this.get("captcha"),
						i = this.get("token"),
						a = this.validate("mobile", t) || !i && this.validate("captcha", n);
					return a ? o.Deferred().reject(a).promise() : e.sync.sendSmsCodeNew({
						condition: r.SMS_CONDITION_NOT_EXIST,
						account: t,
						crumb: null,
						sms_scene: r.SMS_SCENE_REG,
						captcha: n,
						vt: i
					})
				},
				run: function(t) {
					var n = this;
					n.init().trigger("showLoading"), n.prepareCaptcha().then(function() {
						return e.activeEmail.prepare(n, t)
					}).done(function() {
						n.trigger("hideLoading").trigger("show", {
							wrapper: t
						})
					})
				},
				getTypes: function() {
					return e.getConfig("signUp.types", ["mobile", "email"])
				},
				submit: function() {
					var n = this,
						i = n.get("userType"),
						r = n.get("isNeedCheckCaptcha", !1),
						c = a[i];
					if(!c) return void n.model.reportWarn("\u672a\u5b9a\u4e49\u7684\u7c7b\u522b typeConf:" + i);
					this.trigger("beforeSubmit");
					var s = {
						acctype: c,
						account: n.get(i),
						password: n.get("password")
					};
					s.emailActiveFlag = e.getConfig("signUp.sendActiveEmail", !0), o.each(["username", "nickname", "passwordAgain", "smsToken", "agreeLicence"], function(e, t) {
						var i = n.get(t, void 0);
						void 0 !== i && (s[t] = i)
					}), r && (s.captcha = n.get("captcha"));
					var u = !1,
						l = {
							mobile: n.get("mobile"),
							email: n.get("email")
						};
					o.each(o.extend({}, s, l), function(e, t) {
						var i = n.validate(e, t);
						i && n.trigger("invalid", i), u = u || i
					}), !u && e.sync.signUp(s).then(function(t) {
						var i = o.Deferred();
						return t.activeurl ? (t.email = n.get("email"), e.activeEmail(t, function() {
							e.sync.getRd().done(function(e) {
								i.resolve(e)
							}).fail(function() {
								n.signIn()
							})
						})) : (t.rd = encodeURIComponent(t.rd), i.resolve(t)), i.promise()
					}).then(function(t) {
						return e.sync.setCookie(t.rd)
					}).then(function() {
						return e.getUserInfo(!1)
					}).done(function(e) {
						n.trigger("hide").trigger("success", e).resolve(e)
					}).fail(function(e) {
						e.fromServer = !0;
						var i = e.errdetail && e.errdetail.captchaUrl;
						i && (t = !0, n.setCaptchaUrl(i)), n.trigger("invalid", e)
					})
				},
				signIn: function() {
					var t = this.getCallback();
					e.signIn ? (this.trigger("hide"), e.signIn(t)) : location.href = "http://i.360.cn/login/?src=" + e.getConfig("src") + "&destUrl=" + encodeURIComponent("string" == typeof t ? t : location.href)
				}
			});
		e.signUp = function(e, t) {
			i.load(), !e || 1 == e.nodeType || e instanceof o || (t = e, e = void 0), c.setCallback(t).run(e)
		}, e.setConfig("signUp.hideNickname", !0)
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-set-username"><form class="quc-form"><p class="quc-input-wrapper quc-input-long"><span class="quc-input-bg"><input type="text" name="username" class="quc-input quc-input-username" maxlength="14" autocomplete="off" placeholder="\u8bf7\u8f93\u5165\u7528\u6237\u540d\uff1a2-14\u4e2a\u5b57\u7b26,\u652f\u6301\u4e2d\u82f1\u6587"/></span><input type="submit" value="\u4fdd\u5b58" class="quc-submit quc-button quc-button-primary quc-button-save"/></p><p class="quc-tip"></p><div class="quc-alternative-wrapper"><p class="quc-tip-error">\u7528\u6237\u540d\u5df2\u7ecf\u88ab\u5360\u7528\uff0c\u6211\u4eec\u4e3a\u60a8\u63a8\u8350\u4ee5\u4e0b\u7528\u6237\u540d\uff1a</p><div class="quc-alternatives"></div></div></form></div> ',
			i = '<a href="#" class="quc-link"></a>',
			o = {
				init: function(e) {
					this.model = e, this.$el = t(n), this.initModelEvent(), this.initElementEvent()
				},
				reset: function() {
					this.$el.remove(), this.$el = t(n), this.initElementEvent()
				},
				initElementEvent: function() {
					var e = this;
					e.$el.find(".quc-input").focus(function() {
						t(this).parent().removeClass("quc-input-bg-incorrect").addClass("quc-input-bg-focus")
					}).blur(function() {
						t(this).parent().removeClass("quc-input-bg-focus")
					}), e.$el.find(".quc-form").submit(function(n) {
						var i = t(this),
							o = i.find(".quc-submit"),
							r = t.trim(i.find(".quc-input-username").val());
						n.preventDefault(), o.prop("disabled", !0).val("\u4fdd\u5b58\u4e2d..."), e.model.one("invalid", function() {
							o.prop("disabled", !1).val("\u4fdd\u5b58")
						}), e.model.set("username", r), e.model.submit()
					})
				},
				initModelEvent: function() {
					var e = this;
					e.model.on("show", function(t, n) {
						e.show(n && n.wrapper)
					}).on("hide", function() {
						e.hide()
					}).on("invalid", function(t, n) {
						e.showErrorTip(n)
					})
				},
				setUsername: function(e) {
					this.$el.find(".quc-input-username").val(e).focus()
				},
				showErrorTip: function(t) {
					var n = this.$el.find(".quc-input-username");
					if(e.utils.isSameError(t, e.ERROR.USERNAME_DUPLICATE) && this.model.get("alternatives", []).length > 0) this.showAlternatives();
					else {
						var i = this.$el.find(".quc-tip");
						this.$el.find(".quc-input-bg").addClass("quc-input-bg-incorrect"), i.addClass("quc-tip-error").html(t.errmsg).show(), n.one("focus", function() {
							i.html("")
						})
					}
					n.parent().addClass("quc-input-bg-incorrect")
				},
				showAlternatives: function() {
					var e, n = this,
						o = this.model.get("alternatives", []),
						r = this.$el.find(".quc-tip");
					if(!(o.length <= 0)) {
						var a = this.$el.find(".quc-alternatives"),
							c = function(e) {
								return function(t) {
									t.preventDefault(), n.setUsername(e)
								}
							};
						a.empty();
						for(var s = 0, u = o.length; s < u; s++) e = o[s], t(i).html(e).on("click", c(e)).appendTo(a);
						a.parent().show(), r.hide(), this.$el.find(".quc-input-username").on("change", function(e) {
							var n = t(this);
							t.inArray(n.val(), o) == -1 && (a.parent().hide(), r.show(), n.off(e))
						})
					}
				},
				show: function(n) {
					if(n) this.model.trigger("beforeShow", this.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						this.panel && this.reset();
						var i = this.panel = new e.utils.Panel;
						i.setTitle(e.getConfig("setUsername.panelTitle", "\u8bbe\u7f6e\u7528\u6237\u540d")), i.setContent(this.$el), this.model.trigger("beforeShow", this.$el[0]), i.show(), t(i).on("close", e.getConfig("setUsername.panelCloseHandler", t.noop))
					}
					this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforeHide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.setUsername = {
			init: function() {
				o.init.apply(o, arguments)
			}
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = e.getLogic({
				name: "setUsername",
				validate: function(t) {
					return t = t || this.get("username"), e.validate.checkUsername(t)
				},
				run: function(e) {
					this.init().trigger("show", {
						wrapper: e
					})
				},
				submit: function() {
					var n = this,
						i = t.Deferred(),
						o = n.validate();
					return this.trigger("beforeSubmit"), o ? i.reject(o) : i.resolve(), i.then(function() {
						return e.getUserInfo(!1)
					}).then(function(t) {
						return e.sync.setUsername(t.crumb, n.get("username"))
					}).done(function(e) {
						n.trigger("hide").trigger("success").resolve(e)
					}).fail(function(e) {
						n.set("alternatives", e.userinfo), n.trigger("invalid", e)
					})
				}
			});
		e.setUsername = function(e, i) {
			!e || 1 == e.nodeType || e instanceof t || (i = e, e = void 0), n.setCallback(i).run(e)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-authentication"><div class="quc-tip-wrapper quc-global-error"><p class="quc-tip quc-tip-error"></p></div><div class="quc-mod-authentication-captcha"><form method="post" class="quc-form quc-form-captcha"><p class="quc-field quc-input-long quc-field-mobile quc-clearfix"><label class="quc-label">\u624b\u673a\u53f7</label><span class="quc-input-bg"><input class="quc-input quc-input-mobile" type="tel" name="account" data-name="mobile" maxlength="11" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7" autocomplete="off"/></span></p><p class="quc-field quc-field-captcha quc-input-short"><label class="quc-label">\u9a8c\u8bc1\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-captcha" type="text" name="captcha" data-name="captcha" maxlength="7" autocomplete="off" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801" /></span><img class="quc-captcha-img quc-captcha-change" alt="\u9a8c\u8bc1\u7801" title="\u70b9\u51fb\u66f4\u6362" tabindex="99" /> <a class="quc-link quc-captcha-change-link quc-captcha-change" href="#">\u6362\u4e00\u5f20</a></p><p><input class="quc-button quc-button-primary quc-button-big quc-button-submit quc-button-check-captcha" type="submit" value="\u63d0\u4ea4" /></p></form></div><div class="quc-mod-authentication-token"><form method="post" class="quc-form quc-form-token"><div class="quc-field quc-clearfix"><p class="quc-field-send-smstoken"><span class="quc-input quc-input-method">\u6821\u9a8c\u7801\u5df2\u53d1\u9001\u81f3\uff1a<i class="quc-sec-mobile"></i></span><a href="#" class="quc-button quc-button-blue quc-get-sms-token">\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801</a></p><a class="quc-link quc-link-mobile-tip" href="http://i.360.cn/help/smscode" target="_blank" tabindex="99">\u6821\u9a8c\u7801\u5e38\u89c1\u95ee\u9898</a></div><p class="quc-field quc-field-sms-token quc-input-long"><label class="quc-label">\u6821\u9a8c\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-sms-token" type="text" name="smscode" data-name="smstoken" maxlength="6" placeholder="\u8bf7\u8f93\u5165\u516d\u4f4d\u6821\u9a8c\u7801" autocomplete="off"/></span></p><p><input class="quc-button quc-button-primary quc-button-big quc-button-submit quc-button-identify" type="submit" value="\u63d0\u4ea4" /><a href="###" class="quc-link quc-link-go-back">\u8fd4\u56de</a></p></form></div><div class="quc-mod-authentication-success"><p class="quc-field quc-field-success">\u8be5\u5e10\u53f7\u5df2\u5b8c\u6210\u8ba4\u8bc1\uff01</p><p class="quc-field quc-field-success"><input class="quc-button quc-button-blue quc-button-ensure" type="submit" value="\u786e\u8ba4" /></p></div></div>',
			i = {
				init: function(e) {
					this.model = e, this.$el = t(n), this.initModelEvent(), this.initElementEvent(), this.initSmsToken(), this.initCaptcha()
				},
				reset: function() {
					this.$el && this.$el.remove(), this.$el = t(n), this.initElementEvent(), this.initCaptcha()
				},
				initCaptcha: function() {
					var t = this,
						n = t.$el.find(".quc-field-captcha"),
						i = function(e) {
							t.model.getCaptchaUrl("shiming").then(function(t) {
								n.find(".quc-captcha-img").attr("src", t);
								var i = n.find(".quc-input-captcha").val("");
								e && i.focus()
							})
						},
						o = function(t, n) {
							var o = "captcha" == e.utils.getErrorType(n);
							n.fromServer && i(o)
						};
					t.$el.find(".quc-captcha-change").click(function(e) {
						e.preventDefault(), i()
					}), t.model.on("invalid", o), i()
				},
				initElementEvent: function() {
					var e = this,
						n = e.model;
					e.$el.find(".quc-input").focus(function() {
						t(this).parent().removeClass("quc-input-bg-incorrect").addClass("quc-input-bg-focus")
					}).blur(function() {
						var e = t(this);
						e.parent().removeClass("quc-input-bg-focus");
						var i = e.attr("data-name") || e.attr("name"),
							o = t.trim(e.val());
						if(0 != o.length) {
							var r = n.validate(i, o);
							r ? n.trigger("invalid", r) : n.trigger("clean")
						}
					}), e.$el.find(".quc-form-captcha").submit(function(e) {
						e.preventDefault();
						var i = t(this),
							o = i.find(".quc-button-check-captcha");
						o.prop("disabled", !0).val("\u63d0\u4ea4\u4e2d..."), n.one("invalid", function() {
							o.prop("disabled", !1).val("\u63d0\u4ea4")
						}), n.set("mobile", t.trim(i.find(".quc-input-mobile").val())), n.set("captcha", t.trim(i.find(".quc-input-captcha").val())), n.checkPhrase()
					}), e.$el.find(".quc-link-go-back").on("click", function(t) {
						t.preventDefault(), e.model.trigger("showCaptchaPanel")
					}), e.$el.find(".quc-form-token").submit(function(e) {
						e.preventDefault();
						var i = t(this),
							o = i.find(".quc-button-identify");
						o.prop("disabled", !0).val("\u63d0\u4ea4\u4e2d..."), n.one("invalid", function() {
							o.prop("disabled", !1).val("\u63d0\u4ea4")
						}), n.set("smstoken", t.trim(i.find(".quc-input-sms-token").val())), n.submit()
					})
				},
				initSmsToken: function() {
					var t, n = this,
						i = "quc-button-disabled",
						o = e.utils.getTimer("bind_mobile");
					o.on("timer_start", function(e, n) {
						t.addClass(i), t.html(n + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), o.on("timer_tick", function(e, n) {
						t.html(n + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), o.on("timer_stop", function() {
						t.html("\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801"), t.removeClass(i)
					});
					var r = function(e) {
						e.preventDefault(), t.hasClass(i) || (t.html("\u53d1\u9001\u4e2d..."), t.addClass(i), n.model.sendSmsToken().done(function() {
							o.start(), n.model.trigger("sendSmsTokenSuccess")
						}).fail(function(e) {
							t.html("\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801"), t.removeClass(i), n.model.trigger("invalid", e)
						}))
					};
					n.model.on("timerStop", function() {
						o.stop()
					}), n.model.on("afterCheckCaptcha", function(e, a) {
						t = n.$el.find(".quc-get-sms-token"), t.off("click", r).on("click", r), n.$el.find(".quc-sec-mobile").html(a.mobile), o.isRunning() && o.resume(), t.html("\u53d1\u9001\u4e2d..."), t.addClass(i), o.stop(), o.start()
					})
				},
				initModelEvent: function() {
					var e = this;
					e.model.on("show", function(t, n) {
						e.show(n && n.wrapper), e.model.trigger("showCaptchaPanel")
					}).on("hide", function() {
						e.model.trigger("beforeHide", e.$el[0]), e.panel && e.panel.hide(), e.model.trigger("afterHide", e.$el[0])
					}).on("sendSmsTokenSuccess", function() {
						var t = e.$el.find(".quc-tip");
						t.removeClass("quc-tip-error").addClass("quc-tip-success").html("\u53d1\u9001\u6210\u529f").show()
					}).on("invalid", function(t, n) {
						var i = e.$el.find(".quc-tip");
						i.removeClass("quc-tip-success").addClass("quc-tip-error").html(n.errmsg)
					}).on("clean", function() {
						var t = e.$el.find(".quc-tip");
						t.html("")
					}).on("showSuccessPanel", function() {
						var t = e.$el.find(".quc-mod-authentication-token"),
							n = e.$el.find(".quc-mod-authentication-success");
						t.hide(), n.show(), n.find(".quc-button-ensure").on("click", function(t) {
							var n = e.model.get("secMobile");
							t.preventDefault(), e.model.trigger("hide").trigger("success").resolve(n)
						})
					}).on("showSmsTokenPanel", function() {
						var t = e.$el.find(".quc-mod-authentication-captcha"),
							n = e.$el.find(".quc-mod-authentication-token");
						t.hide(), n.show(), n.find(".quc-input-sms-token").val("").focus(), e.$el.find(".quc-button-check-token").prop("disabled", !1).val("\u63d0\u4ea4"), e.model.trigger("clean"), e.model.trigger("sendSmsTokenSuccess")
					}).on("showCaptchaPanel", function() {
						var t = e.$el.find(".quc-mod-authentication-captcha"),
							n = e.$el.find(".quc-mod-authentication-token"),
							i = e.$el.find(".quc-mod-authentication-success");
						t.show(), n.hide(), i.hide(), t.find(".quc-input-mobile").val(""), t.find(".quc-input-captcha").val(""), t.find(".quc-captcha-change").trigger("click"), e.$el.find(".quc-button-check-captcha").prop("disabled", !1).val("\u63d0\u4ea4"), e.model.trigger("clean")
					}).on("reset", function() {
						e.$el.find(".quc-button-identify").prop("disabled", !1).val("\u63d0\u4ea4"), e.$el.find(".quc-input-sms-token").val(""), e.model.trigger("clean"), e.model.trigger("timerStop")
					})
				},
				show: function(n) {
					var i = this;
					if(n) i.model.trigger("beforeShow", i.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(i.$el);
					else {
						i.panel && i.reset();
						var o = i.panel = new e.utils.Panel;
						o.setTitle(e.getConfig("authenticate.panelTitle", "\u5b9e\u540d\u8ba4\u8bc1")), o.setContent(this.$el), i.model.trigger("beforeShow", i.$el[0]), o.show(), t(o).on("close", e.getConfig("authenticate.panelCloseHandler", t.noop))
					}
					i.model.trigger("afterShow", this.$el[0])
				}
			};
		e.ui.authenticate = {
			init: function() {
				i.init.apply(i, arguments)
			}
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = e.getLogic({
				name: "authenticate",
				validate: function(t, n) {
					var i, o = e.validate;
					switch(t.toLowerCase()) {
						case "mobile":
							i = o.checkMobile(n);
							break;
						case "captcha":
							i = o.checkCaptcha(n);
							break;
						case "smstoken":
							i = o.checkSmsToken(n)
					}
					return i
				},
				run: function(t) {
					var n = this;
					n.init(), n.trigger("showLoading"), e.getUserInfo(!1).then(function(t) {
						return n.set("crumb", t.crumb), e.sync.getAuthenticationStatus(t.crumb)
					}).always(function() {
						n.trigger("hideLoading")
					}).done(function(e) {
						e.details && e.details.isNeedAuthen ? (n.setCaptchaUrl(e.details.captchaUrl), n.trigger("show", {
							wrapper: t
						})) : n.trigger("success").resolve(e.details.mobile)
					})
				},
				checkPhrase: function() {
					var n = this,
						i = !1,
						o = {
							mobile: n.get("mobile"),
							captcha: n.get("captcha")
						},
						r = n.get("crumb");
					this.trigger("beforeCheckCaptcha"), t.each(t.extend({}, o), function(e, t) {
						var o = n.validate(e, t);
						if(i = i || o, o) return n.trigger("invalid", o), !1
					}), !i && e.sync.submitAuthenMobile(o.mobile, o.captcha, r).done(function(e) {
						var t = e.details && e.details.mobile,
							i = e.details && e.details.vt;
						n.set("token", i), n.trigger("afterCheckCaptcha", {
							mobile: t,
							vt: i
						}), n.trigger("showSmsTokenPanel")
					}).fail(function(e) {
						e.fromServer = !0;
						var t = e.errdetail && e.errdetail.captchaUrl;
						t && n.setCaptchaUrl(t), n.trigger("invalid", e)
					})
				},
				submit: function() {
					var t = this,
						n = t.get("token"),
						i = t.get("smstoken"),
						o = t.get("crumb"),
						r = t.validate("smstoken", i),
						a = e.getConfig("authenticate.hideSuccessPanel", !1);
					this.trigger("beforeSubmit"), r && t.trigger("invalid", r), !r && e.sync.fillAuthenInfo(n, i, o).done(function(e) {
						t.set("secMobile", e.details.mobile), t.trigger("reset"), a ? t.trigger("hide").trigger("success").resolve(e.details.mobile) : t.trigger("showSuccessPanel")
					}).fail(function(e) {
						t.trigger("invalid", e)
					})
				},
				sendSmsToken: function() {
					var n = this.get("mobile"),
						i = this.get("token"),
						o = this.get("crumb"),
						r = this.validate("mobile", n);
					return r ? t.Deferred().reject(r).promise() : e.sync.authSendSmsToken(o, i)
				}
			});
		e.authenticate = function(e, i) {
			!e || 1 == e.nodeType || e instanceof t || (i = e, e = void 0), n.setCallback(i).run(e)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-set-nickname"><form class="quc-form"><p class="quc-input-wrapper quc-input-long"><span class="quc-input-bg"><input type="text" name="nickname" class="quc-input quc-input-nickname" maxlength="14" autocomplete="off" placeholder="\u8bf7\u8f93\u5165\u6635\u79f0\uff1a2-14\u4e2a\u5b57\u7b26,\u652f\u6301\u4e2d\u82f1\u6587"/></span><input type="submit" value="\u4fdd\u5b58" class="quc-submit quc-button quc-button-primary quc-button-save"/></p><p class="quc-tip"></p><div class="quc-alternative-wrapper"><p class="quc-tip-error">\u6635\u79f0\u5df2\u7ecf\u88ab\u5360\u7528\uff0c\u6211\u4eec\u4e3a\u60a8\u63a8\u8350\u4ee5\u4e0b\u6635\u79f0\uff1a</p><div class="quc-alternatives"></div></div></form></div> ',
			i = '<a href="#" class="quc-link"></a>',
			o = {
				init: function(e) {
					this.model = e, this.$el = t(n), this.initModelEvent(), this.initElementEvent()
				},
				reset: function() {
					this.$el.remove(), this.$el = t(n), this.model.reset(), this.initElementEvent()
				},
				initElementEvent: function() {
					var e = this;
					e.$el.find(".quc-input").focus(function() {
						t(this).parent().removeClass("quc-input-bg-incorrect").addClass("quc-input-bg-focus")
					}).blur(function() {
						t(this).parent().removeClass("quc-input-bg-focus")
					}), e.$el.find(".quc-form").submit(function(n) {
						var i = t(this),
							o = i.find(".quc-submit"),
							r = t.trim(i.find(".quc-input-nickname").val());
						n.preventDefault(), o.prop("disabled", !0).val("\u4fdd\u5b58\u4e2d..."), e.model.one("invalid", function() {
							o.prop("disabled", !1).val("\u4fdd\u5b58")
						}), e.model.set("nickname", r), e.model.submit()
					})
				},
				initModelEvent: function() {
					var e = this;
					e.model.on("show", function(t, n) {
						e.show(n && n.wrapper)
					}).on("hide", function() {
						e.hide()
					}).on("invalid", function(t, n) {
						e.showErrorTip(n)
					})
				},
				setNickname: function(e) {
					this.$el.find(".quc-input-nickname").val(e).focus()
				},
				showErrorTip: function(t) {
					var n = this.$el.find(".quc-input-nickname");
					if(e.utils.isSameError(t, e.ERROR.NICKNAME_DUPLICATE) && this.model.get("alternatives", []).length > 0) this.showAlternatives();
					else {
						var i = this.$el.find(".quc-tip");
						this.$el.find(".quc-input-bg").addClass("quc-input-bg-incorrect"), i.addClass("quc-tip-error").html(t.errmsg).show(), n.one("focus", function() {
							i.html("")
						})
					}
					n.parent().addClass("quc-input-bg-incorrect")
				},
				showAlternatives: function() {
					var e, n = this,
						o = this.model.get("alternatives", []),
						r = this.$el.find(".quc-tip");
					if(!(o.length <= 0)) {
						var a = this.$el.find(".quc-alternatives"),
							c = function(e) {
								return function(t) {
									t.preventDefault(), n.setNickname(e)
								}
							};
						a.empty();
						for(var s = 0, u = o.length; s < u; s++) e = o[s], t(i).html(e).on("click", c(e)).appendTo(a);
						a.parent().show(), r.hide(), this.$el.find(".quc-input-nickname").on("change", function(e) {
							var n = t(this);
							t.inArray(n.val(), o) == -1 && (a.parent().hide(), r.show(), n.off(e))
						})
					}
				},
				show: function(n) {
					var i = this.model.get("nickname");
					if(n) this.model.trigger("beforeShow", this.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						this.panel && this.reset();
						var o = this.panel = new e.utils.Panel;
						o.setTitle(e.getConfig("setNickname.panelTitle", i ? "\u4fee\u6539\u6635\u79f0" : "\u8bbe\u7f6e\u6635\u79f0")), o.setContent(this.$el), this.model.trigger("beforeShow", this.$el[0]), o.show(), t(o).on("close", e.getConfig("setNickname.panelCloseHandler", t.noop))
					}
					this.$el.find(".quc-input-nickname").val(i), this.model.trigger("aftershow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforehide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterhide", this.$el[0])
				}
			};
		e.ui.setNickname = {
			init: function() {
				o.init.apply(o, arguments)
			}
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t, n = e.$,
			i = e.getLogic({
				name: "setNickname",
				validate: function(t) {
					return t = t || this.get("nickname"), e.validate.checkNickname(t)
				},
				run: function(n) {
					var i = this;
					i.init().trigger("showLoading"), e.getUserInfo().always(function() {
						i.trigger("hideLoading")
					}).done(function(e) {
						e.nickname && (i.set("nickname", e.nickname), t = e.nickname), i.trigger("show", {
							wrapper: n
						})
					})
				},
				submit: function() {
					var i = this,
						o = n.Deferred(),
						r = i.validate();
					return this.trigger("beforeSubmit"), r ? o.reject(r) : o.resolve(), o.then(function() {
						return e.getUserInfo()
					}).then(function(t) {
						return e.sync.setNickname(t.crumb, i.get("nickname"))
					}).done(function() {
						var e = {
							oldValue: t,
							newValue: i.get("nickname")
						};
						t = e.newValue, i.trigger("hide").trigger("success").resolve(e)
					}).fail(function(t) {
						e.utils.isSameError(e.ERROR.NICKNAME_DUPLICATE, t) && i.set("alternatives", t.userinfo), i.trigger("invalid", t)
					})
				}
			});
		e.setNickname = function(e, t) {
			!e || 1 == e.nodeType || e instanceof n || (t = e, e = void 0), i.setCallback(t).run(e)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-set-email"><p class="quc-tip">&nbsp;</p><form class="quc-form"><p class="quc-field quc-input-long"><label class="quc-label">\u767b\u5f55\u90ae\u7bb1</label><span class="quc-input-bg"><input type="text" name="email" class="quc-input quc-input-email" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u767b\u5f55\u90ae\u7bb1" autocomplete="off"></span></p><p class="quc-field"><input class="quc-button quc-button-primary quc-button-big quc-button-submit" value="\u63d0\u4ea4" type="submit"/></p><div class="quc-help"><p>\u70b9\u51fb\u201c\u63d0\u4ea4\u201d\u540e\uff0c\u6211\u4eec\u4f1a\u5411\u60a8\u7684\u90ae\u7bb1\u53d1\u9001\u4e00\u5c01\u9a8c\u8bc1\u90ae\u4ef6\uff0c\u8bf7\u6309\u7167\u90ae\u4ef6\u4e2d\u7684\u63d0\u793a\u5b8c\u6210\u64cd\u4f5c\u3002</p></div></form></div>',
			i = {
				init: function(i) {
					this.model = i, this.$el = t(n), this._$el = this.$el, this.initModelEvent(), this.initElementEvent(), e.utils.emailHint(this.$el.find(".quc-input-email"))
				},
				reset: function() {
					this.$el = this._$el, this.$el.find(".quc-button-submit").prop("disabled", !1).val("\u63d0\u4ea4"), this.$el.find(".quc-tip").removeClass("quc-tip-error quc-tip-success").html(""), this.$el.find(".quc-input").val("").parent().removeClass("quc-input-bg-focus")
				},
				initElementEvent: function() {
					var e = this;
					this.$el.find(".quc-input").focus(function() {
						t(this).parent().removeClass("quc-input-bg-incorrect").addClass("quc-input-bg-focus")
					}).blur(function() {
						t(this).parent().removeClass("quc-input-bg-focus")
					}).filter(".quc-input-email").blur(function() {
						var n = t(this).val();
						if(n.length > 0) {
							var i = e.model.validate(n);
							i && e.showTip(i.errmsg, i.errno)
						}
					}), e.$el.find(".quc-form").submit(function(t) {
						t.preventDefault(), e.submit()
					})
				},
				initModelEvent: function() {
					var t = this;
					this.model.on("show", function(e, n) {
						t.show(n && n.wrapper)
					}).on("hide", function() {
						t.hide()
					}).on("invalid", function(n, i) {
						e.utils.isSameError(i, e.ERROR.IDENTIFY_EXPIRE) || t.showTip(i)
					}).on("reset", function() {
						t.$el.find(".quc-button-submit").prop("disabled", !1).val("\u63d0\u4ea4")
					})
				},
				showTip: function(e, t) {
					var n = this,
						i = this.$el.find(".quc-tip");
					e.errno && (t = e.errno, e = e.errmsg), t ? (i.addClass("quc-tip-error").removeClass("quc-tip-success"), setTimeout(function() {
						n.$el.one("focus", ".quc-input", function() {
							i.html("")
						})
					}, 30)) : i.addClass("quc-tip-success").removeClass("quc-tip-error"), i.html(e)
				},
				submit: function() {
					var e = this,
						t = e.$el.find(".quc-button-submit");
					t.prop("disabled", !0).val("\u63d0\u4ea4\u4e2d..."), e.model.one("invalid", function() {
						t.prop("disabled", !1).val("\u63d0\u4ea4")
					}), e.model.set("email", e.$el.find(".quc-input-email").val()), e.model.submit(), e.model.one("next", function() {
						t.prop("disabled", !1).val("\u63d0\u4ea4")
					})
				},
				show: function(n) {
					if(this.reset(), n) this.model.trigger("beforeshow", this.$el[0]), n.addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						var i = this.panel = new e.utils.Panel;
						i.setTitle(e.getConfig("setEmail.panelTitle", "\u8bbe\u7f6e\u767b\u5f55\u90ae\u7bb1")), i.setContent(this.$el), this.model.trigger("beforeshow", this.$el[0]), i.show(), t(i).on("close", e.getConfig("setEmail.panelCloseHandler", t.noop))
					}
					this.model.trigger("aftershow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforehide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterhide", this.$el[0])
				}
			};
		e.ui.setEmail = {
			init: function() {
				i.init.apply(i, arguments)
			}
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = e.getLogic({
				name: "setEmail",
				validate: function(t) {
					return t = t || this.get("email"), e.validate.checkEmail(t)
				},
				run: function(t) {
					var n = this;
					n.init().trigger("showLoading"), e.identify(n).then(function() {
						return e.activeEmail.prepare(n)
					}).always(function() {
						n.trigger("hideLoading")
					}).done(function() {
						n.trigger("show", {
							wrapper: t
						})
					})
				},
				submit: function() {
					var n = this,
						i = t.Deferred(),
						o = n.validate();
					return this.trigger("beforeSubmit"), o ? i.reject(o) : i.resolve(), i.then(function() {
						return e.getUserInfo()
					}).then(function(t) {
						return e.sync.setEmail(t.crumb, n.get("email"))
					}).then(function(i) {
						n.trigger("next");
						var o = t.Deferred();
						return e.activeEmail(i, function() {
							o.resolve()
						}), o.promise()
					}).then(function(e) {
						n.trigger("hide").trigger("success").resolve(e)
					}, function(e) {
						n.trigger("invalid", e)
					})
				}
			});
		e.setEmail = function(e, i) {
			!e || 1 == e.nodeType || e instanceof t || (i = e, e = void 0), n.setCallback(i).run(e)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-set-sec-email"><p class="quc-tip">&nbsp;</p><form class="quc-form"><p class="quc-field quc-input-long"><label class="quc-label">\u5bc6\u4fdd\u90ae\u7bb1</label><span class="quc-input-bg"><input type="text" name="secEmail" class="quc-input quc-input-sec-email" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u5bc6\u4fdd\u90ae\u7bb1" autocomplete="off"></span></p><p class="quc-field"><input class="quc-button quc-button-primary quc-button-big quc-button-submit" value="\u63d0\u4ea4" type="submit"/></p></form></div>',
			i = {
				init: function(i) {
					this.model = i, this.$el = t(n), this._$el = this.$el, this.initModelEvent(), this.initElementEvent(), e.utils.emailHint(this.$el.find(".quc-input-sec-email"))
				},
				reset: function() {
					this.$el = this._$el, this.$el.find(".quc-button-submit").prop("disabled", !1).val("\u63d0\u4ea4"), this.$el.find(".quc-tip").removeClass("quc-tip-error quc-tip-success").html(""), this.$el.find(".quc-input").val("").parent().removeClass("quc-input-bg-focus")
				},
				initElementEvent: function() {
					var e = this;
					e.$el.find(".quc-input").focus(function() {
						t(this).parent().addClass("quc-input-bg-focus")
					}).blur(function() {
						t(this).parent().removeClass("quc-input-bg-focus")
					}).filter(".quc-input-sec-email").blur(function() {
						var n = t(this).val();
						if(n.length > 0) {
							var i = e.model.validate(n);
							i && e.showTip(i.errmsg, i.errno)
						}
					}), e.$el.find(".quc-form").submit(function(t) {
						t.preventDefault(), e.submit()
					})
				},
				initModelEvent: function() {
					var t = this;
					t.model.on("show", function(e, n) {
						t.show(n && n.wrapper)
					}).on("hide", function() {
						t.hide()
					}).on("invalid", function(n, i) {
						e.utils.isSameError(i, e.ERROR.IDENTIFY_EXPIRE) || t.showTip(i)
					}).on("reset", function() {
						t.$el.find(".quc-button-submit").prop("disabled", !1).val("\u63d0\u4ea4")
					})
				},
				showTip: function(e, t) {
					var n = this,
						i = this.$el.find(".quc-tip");
					e.errno && (t = e.errno, e = e.errmsg), t ? (i.addClass("quc-tip-error").removeClass("quc-tip-success"), setTimeout(function() {
						n.$el.one("focus", ".quc-input", function() {
							i.html("")
						})
					}, 30)) : i.addClass("quc-tip-success").removeClass("quc-tip-error"), i.html(e)
				},
				submit: function() {
					var e = this,
						t = e.$el.find(".quc-button-submit");
					t.prop("disable", !0).val("\u63d0\u4ea4\u4e2d..."), e.model.one("invalid", function() {
						t.prop("disable", !1).val("\u63d0\u4ea4")
					}), e.model.set("secemail", e.$el.find(".quc-input-sec-email").val()), e.model.submit(), e.model.one("next", function() {
						t.prop("disabled", !1).val("\u63d0\u4ea4")
					})
				},
				show: function(n) {
					if(this.reset(), n) this.model.trigger("beforeShow", this.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						var i = this.panel = new e.utils.Panel;
						i.setTitle(e.getConfig("setSecEmail.panelTitle", "\u8bbe\u7f6e\u5bc6\u4fdd\u90ae\u7bb1")), i.setContent(this.$el), this.model.trigger("beforeShow", this.$el[0]), i.show(), t(i).on("close", e.getConfig("setSecEmail.panelCloseHandler", t.noop))
					}
					this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforeHide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.setSecEmail = {
			init: function() {
				i.init.apply(i, arguments)
			}
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = e.getLogic({
				name: "setSecEmail",
				validate: function(t) {
					return t = t || this.get("secemail"), e.validate.checkEmail(t)
				},
				run: function(t) {
					var n = this;
					n.init().trigger("showLoading"), e.identify(n).then(function() {
						return e.activeEmail.prepare(n)
					}).always(function() {
						n.trigger("hideLoading")
					}).done(function() {
						n.trigger("show", {
							wrapper: t
						})
					})
				},
				submit: function() {
					var n = this,
						i = t.Deferred(),
						o = n.validate();
					return this.trigger("beforeSubmit"), o ? i.reject(o) : i.resolve(), i.then(function() {
						return e.getUserInfo()
					}).then(function(t) {
						return e.sync.setSecEmail(t.crumb, n.get("secemail"))
					}).then(function(i) {
						n.trigger("next");
						var o = t.Deferred();
						return e.activeEmail(i, function() {
							o.resolve()
						}), o.promise()
					}).then(function(e) {
						n.trigger("hide").trigger("success").resolve(e)
					}, function(e) {
						n.trigger("invalid", e)
					})
				}
			});
		e.setSecEmail = function(e, i) {
			!e || 1 == e.nodeType || e instanceof t || (i = e, e = void 0), n.setCallback(i).run(e)
		}
	}(QHPass)
}, function(e, t, n) {
	(function(e) {
		! function(t) {
			var i = n(13).getLogger("bindMobile"),
				o = t.$,
				r = '<div class="quc-mod-bind-mobile"><div class="quc-tip-wrapper quc-global-error"><p class="quc-tip quc-tip-error"></p></div><form method="post" class="quc-form"><div class="quc-field quc-field-mobile quc-input-middle quc-clearfix"><div class="quc-input-bg"><input class="quc-input quc-input-mobile" type="tel" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u624b\u673a\u53f7" name="account" data-name="mobile" /><div class="quc-state-wrapper"><div class="quc-area-arrow"></div><span class="quc-activeState">+86</span></div><ul class="quc-mobile-Statelist"></ul></div><i class="quc-tip-icon"></i><span class="quc-tip" data-default-tip=""></span></div><p class="quc-field quc-field-sms-token quc-input-middle"><span class="quc-input-bg"><input class="quc-input quc-input-sms-token" type="text" placeholder="\u77ed\u4fe1\u9a8c\u8bc1\u7801" name="smscode" data-name="smsToken" maxlength="6" /></span><a href="#" class="quc-button quc-button-blue quc-get-sms-token">\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801</a><i class="quc-tip-icon"></i><a class="quc-link quc-link-mobile-tip" href="http://i.360.cn/help/smscode" target="_blank" tabindex="99">\u6821\u9a8c\u7801\u5e38\u89c1\u95ee\u9898</a><span class="quc-tip" data-default-tip=""></span></p><p><input class="quc-button quc-button-primary quc-button-big quc-button-submit" type="submit" value="\u63d0\u4ea4" /></p></form></div>',
				a = {
					init: function(e) {
						this.model = e, this.$el = o(r), this.initModelEvent(), this.initMobileStates(), this.initElementEvent(), this.initSmsToken(), this.initErrorTip(), this.initTips()
					},
					reset: function() {
						i.debug("reset ui"), this.$el && this.$el.remove(), this.$el = o(r), this.initMobileStates(), this.initElementEvent(), this.initTips()
					},
					initTips: function() {
						this.$el.find(".quc-field .quc-tip").attr("data-default-tip", function() {
							return o(this).html()
						})
					},
					iePlaceholder: function() {
						t.utils.initPlaceholder(o("input[name=account],input[name=smscode]"))
					},
					initElementEvent: function() {
						var e = this,
							t = e.model;
						e.$el.find(".quc-input").focus(function() {
							o(this).parent().removeClass("quc-input-bg-incorrect").addClass("quc-input-bg-focus")
						}).blur(function() {
							var e = o(this);
							e.parent().removeClass("quc-input-bg-focus");
							var n = e.attr("data-name") || e.attr("name"),
								i = e.val(),
								r = o(".quc-activeState").html(),
								a = e.data("regexp");
							0 != i.length && (i = "mobile" == n ? {
								mobileNumber: i,
								regExp: a,
								areaCode: r
							} : i, t.validate(n, i, !0).done(function() {
								var t = e.parent(".quc-field").find(".quc-tip-icon");
								t.removeClass("quc-tip-icon-correct").addClass("quc-tip-icon-correct"), e.one("focus", function() {
									t.removeClass("quc-tip-icon-correct")
								})
							}).fail(function(n) {
								n.field = e.parents(".quc-field"), t.trigger("invalid", n)
							}))
						}), e.$el.find(".quc-form").submit(function(e) {
							i.debug("trigger submit"), e.preventDefault();
							var n, r = o(this),
								a = r.find(".quc-submit"),
								c = r.find(".quc-input-mobile");
							n = r.find(".quc-activeState").html(), a.prop("disabled", !0).val("\u63d0\u4ea4\u4e2d..."), t.one("invalid", function() {
								a.prop("disabled", !1).val("\u63d0\u4ea4")
							});
							var s = c.val(),
								u = c.data("regexp");
							t.set("mobile", {
								mobileNumber: s,
								regExp: u,
								areaCode: n
							}), t.set("smsToken", r.find(".quc-input-sms-token").val()), t.submit()
						})
					},
					initSmsToken: function() {
						var e, n, r = this,
							a = "quc-button-disabled",
							c = t.utils.getTimer("bind_mobile");
						c.on("timer_start", function(e, t) {
							n.addClass(a), n.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
						}), c.on("timer_tick", function(e, t) {
							n.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
						}), c.on("timer_stop", function() {
							n.html("\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801"), n.removeClass(a)
						});
						var s = function(t) {
							t.preventDefault();
							var s = e.val(),
								u = o(".quc-activeState").html(),
								l = e.data("regexp");
							r.model.set("mobile", {
								mobileNumber: s,
								regExp: l,
								areaCode: u
							}), n.hasClass(a) || (n.html("\u53d1\u9001\u4e2d..."), n.addClass(a), r.model.bindMobileCheck().then(function(e) {
								return r.model.sendSmsToken(e)
							}).then(function() {
								var e = r.$el.find(".quc-field-mobile"),
									t = e.find(".quc-tip");
								t.removeClass("quc-tip-error").addClass("quc-tip-success").html("\u53d1\u9001\u6210\u529f").show(), e.find(".quc-input").on("change", function() {
									t.removeClass("quc-tip-success").html(t.attr("data-default-tip")), e.find(".quc-tip-icon").removeClass("quc-tip-icon-correct")
								}).parent().removeClass("quc-input-bg-incorrect"), e.find(".quc-tip-icon").removeClass("quc-tip-icon-incorrect").addClass("quc-tip-icon-correct"), c.start()
							}).caught(function(e) {
								i.debug("get validate code fail", e), n.html("\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801"), n.removeClass(a), e.errmsg && (e.field = r.$el.find(".quc-field-mobile"), r.model.trigger("invalid", e))
							}))
						};
						r.model.on("show", function() {
							e = r.$el.find(".quc-input-mobile"), n = r.$el.find(".quc-get-sms-token"), n.off("click", s).on("click", s), c.isRunning() && c.resume()
						})
					},
					initModelEvent: function() {
						var e = this;
						e.model.on("show", function(t, n) {
							e.show(n && n.wrapper)
						}).on("hide", function() {
							e.panel && e.panel.hide()
						})
					},
					initMobileStates: function() {
						var t = this,
							n = t.$el;
						t.model.prepareMobileState().then(function(i) {
							var r = n.find(".quc-mobile-Statelist");
							e.each(i.data, function(e) {
								var t = o("<li>");
								t.addClass("quc-list-item").attr("data-regexp", e.pattern);
								var n = o("<span>").addClass("quc-left-tip").text(e.zone),
									i = o("<span>").addClass("quc-right-tip").text(e.state);
								t.append(n).append(i), r.append(t)
							}), t.$el.on("mouseenter", ".quc-list-item", function(e) {
								o(this).css({
									backgroundColor: "#2994fd",
									color: "#ffffff"
								})
							}).on("mouseleave", ".quc-list-item", function() {
								o(this).css({
									backgroundColor: "#ffffff",
									color: "#808080"
								})
							}), o(document).on("click", function(e) {
								var t = o(e.target);
								if(t.hasClass("quc-list-item") || t.hasClass("quc-left-tip") || t.hasClass("quc-right-tip")) {
									var n = t.hasClass("quc-list-item") ? t : t.closest("li"),
										i = n.find(".quc-left-tip").html(),
										r = n.data("regexp");
									o(".quc-activeState").html(i), o(".quc-activeState").parent().siblings("input").data("regexp", r)
								}
								t.hasClass("quc-activeState") || t.hasClass("quc-area-arrow") ? o(".quc-mobile-Statelist").show() : o(".quc-mobile-Statelist").hide()
							})
						}, function(e) {
							t.model.trigger("invalid", e)
						})
					},
					initErrorTip: function() {
						var e = this;
						e.model.on("invalid", function(n, i) {
							if(!t.utils.isSameError(i, t.ERROR.IDENTIFY_EXPIRE)) {
								var o = i.field || e.getErrorField(i.errno),
									r = o.find(".quc-input-bg"),
									a = o.find(".quc-tip"),
									c = o.find(".quc-tip-icon");
								a.removeClass("quc-tip-success").addClass("quc-tip-error").html(i.errmsg).show(), c.addClass("quc-tip-icon-incorrect"), r.addClass("quc-input-bg-incorrect"), o.find(".quc-input").one("focus", function() {
									a.removeClass("quc-tip-error").html(a.attr("data-default-tip")), c.removeClass("quc-tip-icon-incorrect"), r.removeClass("quc-input-bg-incorrect")
								})
							}
						})
					},
					getErrorField: function(e) {
						var n = t.utils.getErrorType(e);
						return "other" != n ? this.$el.find(".quc-field-" + n) : this.$el.find(".quc-global-error")
					},
					show: function(e) {
						var n = this;
						if(i.debug("show panel"), e) n.model.trigger("beforeShow", n.$el[0]), o(e).addClass("quc-wrapper quc-page").empty().append(n.$el);
						else {
							n.panel && n.reset();
							var r = n.panel = new t.utils.Panel;
							r.setTitle(t.getConfig("bindMobile.panelTitle", "\u7ed1\u5b9a\u624b\u673a\u53f7")), r.setContent(this.$el), n.model.trigger("beforeShow", n.$el[0]), r.show(), o(r).on("close", t.getConfig("bindMobile.panelCloseHandler", o.noop))
						}
						n.model.trigger("afterShow", this.$el[0])
					}
				};
			t.ui.bindMobile = {
				init: function() {
					a.init.apply(a, arguments)
				}
			}
		}(QHPass)
	}).call(t, n(1))
}, function(e, t, n) {
	(function(e, t) {
		! function(i) {
			var o = n(13).getLogger("bindMobile"),
				r = n(90),
				a = i.$,
				c = {},
				s = i.getLogic({
					name: "bindMobile",
					validate: function(e, t, n) {
						o.debug("validate");
						var r, s = i.validate;
						if("boolean" != typeof t && void 0 !== t || (t = this.get(e)), /mobile/i.test(e)) return !!n && a.Deferred().resolve();
						switch(e.toLowerCase()) {
							case "mobile":
								r = s.checkMobile(t, !0);
								break;
							case "smstoken":
								r = s.checkSmsToken(t)
						}
						if(n) {
							var u, l = i.sync;
							if(r) u = a.Deferred(), u.reject(r);
							else if("mobile" == e) {
								var p = t.mobileNumber,
									d = t.areaCode,
									f = c[p];
								if(f) return f;
								u = l.checkMobileNumberExist(p, d), c[p] = u.promise()
							} else u = a.Deferred(), u.resolve();
							return u.promise()
						}
						return r
					},
					run: function(e) {
						o.debug("run");
						var t = this;
						t.init(), t.trigger("showLoading"), o.debug("danger operator, identify first"), i.identify(t).then(function(n) {
							o.debug("prepare identify"), t.trigger("show", {
								wrapper: e
							})
						}, function(e) {
							if("1552" == e.errno) return o.debug("shadow account fill profile first"), i.fillProfile(function() {
								return t.trigger("hide").trigger("success").resolve()
							})
						}).always(function() {
							t.trigger("hideLoading")
						})
					},
					prepareMobileState: function() {
						return i.sync.getMobileState()
					},
					submit: function() {
						var e = this,
							t = a.Deferred();
						o.debug("logic submit"), this.trigger("beforeSubmit");
						var n = e.validate("mobile") || e.validate("smsToken");
						return n ? t.reject(n) : t.resolve(), t.then(function() {
							return i.getUserInfo()
						}).then(function(t) {
							return i.sync.bindMobileNew(t.crumb, e.get("mobile"), e.get("smsToken"), e.get("canForceBind"))
						}).done(function() {
							i.isI360() || i.$message({
								type: "success",
								title: "\u7ed1\u5b9a\u624b\u673a\u53f7\u6210\u529f",
								content: "\u7ed1\u5b9a\u624b\u673a\u53f7\u6210\u529f, \u60a8\u4ee5\u540e\u53ef\u4ee5\u4f7f\u7528\u8be5\u624b\u673a\u53f7\u8fdb\u884c\u767b\u5f55\u5566"
							}), e.trigger("hide").trigger("success").resolve()
						}).fail(function(t) {
							e.trigger("invalid", t)
						})
					},
					bindMobileCheck: function() {
						var t = this,
							n = t.get("mobile");
						o.debug("bind mobile check", n);
						var r = t.validate("mobile");
						if(r) return e.reject(r);
						var a = n.areaCode + n.mobileNumber;
						return t.set("canForceBind", !1), i.tool.checkBindMobile(a).then(function(e) {
							return 0 == e.condition && t.set("canForceBind", !0), e
						})
					},
					sendSmsToken: function(e) {
						o.debug("send sms token", e);
						var n = this,
							c = n.validate("mobile");
						return c ? a.Deferred().reject(c).promise() : i.getUserInfo().then(function(o) {
							var a = n.get("mobile");
							return i.sync.sendSmsCodeNew({
								condition: t.get(e, "condition"),
								account: "object" == typeof a ? a.areaCode + a.mobileNumber : a,
								crumb: o.crumb,
								sms_scene: r.SMS_SCENE_BIND_MOBILE,
								vt: n.get("smsToken"),
								m: "sendSmsCode"
							})
						})
					}
				});
			i.bindMobile = function(e, t) {
				!e || 1 == e.nodeType || e instanceof a || (t = e, e = void 0), s.setCallback(t).run(e)
			}
		}(QHPass)
	}).call(t, n(30), n(1))
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = "",
			i = {
				normal: '<div class="quc-mod-fill-profile"><div class="quc-tip-wrapper quc-global-error"><p class="quc-tip quc-tip-error"></p></div><form class="quc-form" method="post" action="https://i.360.cn/signUp/dosignUpAccount"><p class="quc-field quc-field-username quc-input-long"><label class="quc-label">\u7528\u6237\u540d</label><span class="quc-input-bg"><input type="text" name="userName" data-name="username" maxlength="14"  class="quc-input quc-input-username" /></span><i class="quc-tip-icon"></i><span class="quc-tip">2-14\u4e2a\u5b57\u7b26\uff1a\u82f1\u6587\u3001\u6570\u5b57\u6216\u4e2d\u6587</span></p><p class="quc-field quc-field-password quc-input-long"><label class="quc-label">\u5bc6\u7801</label><span class="quc-input-bg"><input type="password" name="password" class="quc-input quc-input-password" maxlength="20" /></span><i class="quc-tip-icon"></i><span class="quc-tip">8-20\u4e2a\u5b57\u7b26(\u533a\u5206\u5927\u5c0f\u5199)</span></p><p class="quc-field quc-field-password-again quc-input-long"><label class="quc-label">\u786e\u8ba4\u5bc6\u7801</label><span class="quc-input-bg"><input type="password" name="passwordAgain" class="quc-input quc-input-password-again" maxlength="20" /></span><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801</span></p><p class="quc-field quc-field-captcha quc-input-short"><label class="quc-label">\u9a8c\u8bc1\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-captcha" type="text" name="captcha" maxlength="7" autocomplete="off" /></span><img class="quc-captcha-img quc-captcha-change" alt="\u9a8c\u8bc1\u7801" title="\u70b9\u51fb\u66f4\u6362" tabindex="99" /><a class="quc-link quc-link-captcha-change quc-captcha-change" href="#">\u6362\u4e00\u5f20</a><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u8f93\u5165\u56fe\u4e2d\u7684\u5b57\u6bcd\u6216\u6570\u5b57\uff0c\u4e0d\u533a\u5206\u5927\u5c0f\u5199</span></p><p class="quc-field quc-field-submit"><input class="quc-button quc-button-primary quc-button-submit" type="submit" value="\u7acb\u5373\u6ce8\u518c" /></p></form></div>',
				mobile: '<div class="quc-mod-fill-profile"><div class="quc-tip-wrapper quc-global-error"><p class="quc-tip quc-tip-error"></p></div><form method="POST" class="quc-form"><div class="quc-field quc-field-mobile quc-input-middle quc-clearfix"><label class="quc-label">\u624b\u673a\u53f7</label><div class="quc-input-bg"><input class="quc-input quc-input-mobile" type="text" placeholder="" name="account" data-name="mobile" /><div class="quc-state-wrapper"><div class="quc-area-arrow"></div><span class="quc-activeState">+86</span></div><ul class="quc-mobile-Statelist"></ul></div><i class="quc-tip-icon"></i><span class="quc-tip" data-default-tip="\u8bf7\u8f93\u5165\u60a8\u8981\u7ed1\u5b9a\u7684\u624b\u673a\u53f7\u7801">\u8bf7\u8f93\u5165\u60a8\u8981\u7ed1\u5b9a\u7684\u624b\u673a\u53f7\u7801</span></div><p class="quc-field quc-field-captcha quc-input-short"><label class="quc-label">\u9a8c\u8bc1\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-captcha" type="text" name="captcha" maxlength="7" autocomplete="off"/></span><img class="quc-captcha-img quc-captcha-change" alt="\u9a8c\u8bc1\u7801" title="\u70b9\u51fb\u66f4\u6362" tabindex="99" /><a class="quc-link quc-link-captcha-change quc-captcha-change" href="#">&nbsp;\u6362\u4e00\u5f20</a><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u8f93\u5165\u56fe\u4e2d\u7684\u5b57\u6bcd\u6216\u6570\u5b57\uff0c\u4e0d\u533a\u5206\u5927\u5c0f\u5199</span></p><p class="quc-field quc-field-sms-token quc-input-middle"><label class="quc-label">\u6821\u9a8c\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-sms-token" type="text" name="smscode" autocomplete="off" maxlength="6" /></span><a class="quc-button quc-button-blue quc-button-get-sms-token" href="#">\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801</a><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u8f93\u5165\u77ed\u4fe1\u4e2d6\u4f4d\u6570\u5b57\u6821\u9a8c\u7801</span></p><input type="password" name="password" style="display:none"/><p class="quc-field quc-field-password quc-input-long"><label class="quc-label">\u5bc6\u7801</label><span class="quc-input-bg"><input type="password" name="password" class="quc-input quc-input-password" maxlength="20" /></span><i class="quc-tip-icon"></i><span class="quc-tip">8-20\u4e2a\u5b57\u7b26(\u533a\u5206\u5927\u5c0f\u5199)</span></p><p class="quc-field quc-field-password-again quc-input-long"><label class="quc-label">\u786e\u8ba4\u5bc6\u7801</label><span class="quc-input-bg"><input type="password" name="passwordAgain" class="quc-input quc-input-password-again" maxlength="20" /></span><i class="quc-tip-icon"></i><span class="quc-tip">\u8bf7\u518d\u6b21\u8f93\u5165\u5bc6\u7801</span></p><p class="quc-field quc-field-submit"><input class="quc-button quc-button-primary quc-button-submit" type="submit" value="\u7acb\u5373\u6ce8\u518c" /></p></form><a class="quc-link quc-go-signIn">\u4f7f\u7528\u5df2\u6709\u624b\u673a\u53f7\u767b\u5f55</a></div>'
			},
			o = {
				init: function(e) {
					this.model = e, this.initTpl(), this.initModelEvent(), this.initCaptcha(), this.initErrorTip(), this.initSmsToken()
				},
				initTpl: function() {
					var e = this.model.isFillProfileByMobile();
					n = e ? i.mobile : i.normal
				},
				initCaptcha: function() {
					var e, n = this,
						i = function() {
							n.model.getCaptchaUrl().then(function(n) {
								e.find(".quc-captcha-img").attr("src", n), e.find(".quc-input-captcha").val(""), e.find(".quc-tip").removeClass("quc-tip-error").html(function() {
									return t(this).attr("data-default-tip")
								}), e.find(".quc-tip-icon").removeClass("quc-tip-icon-incorrect")
							})
						},
						o = function() {
							i(), e.find(".quc-captcha-change").on("mousedown", function(e) {
								e.preventDefault()
							}).on("click", function(t) {
								t.preventDefault(), i(), e.find(".quc-input-captcha").focus()
							})
						};
					this.model.on("show", function() {
						e = n.$el.find(".quc-field-captcha"), o()
					}).on("invalid", function(e, t) {
						t.fromServer && i()
					}).on("dealCaptcha", function() {
						n.$el.find(".quc-field-captcha").hide(), n.$el.find(".quc-input-captcha").val(""), n.$el.find(".quc-input-mobile").off("change").on("change", function() {
							n.$el.find(".quc-field-captcha").show(), n.$el.find(".quc-captcha-change").trigger("click"), n.model.set("token", null), n.model.trigger("timer_stop")
						})
					})
				},
				initSmsToken: function() {
					var n, i, o, r, a = this,
						c = "quc-button-disabled",
						s = e.utils.getTimer("sign_up");
					s.on("timer_start", function(e, t) {
						i.addClass(c), i.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), s.on("timer_tick", function(e, t) {
						i.html(t + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), s.on("timer_stop", function() {
						i.html("\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801"), i.removeClass(c)
					}), a.model.on("timer_stop", function() {
						s.stop()
					});
					var u = function(e) {
						e.preventDefault();
						var u = i.siblings(".quc-tip-icon");
						if(!i.hasClass(c)) {
							var l = n.val(),
								p = t(".quc-activeState").html(),
								d = n.data("regexp");
							a.model.set("mobile", {
								mobileNumber: l,
								regExp: d,
								areaCode: p
							}), a.model.set("captcha", r.val()), i.html("\u53d1\u9001\u4e2d..."), i.addClass(c), u.hide(), a.model.trigger("afterShow.changeType"), a.model.sendSmsToken().done(function(e) {
								var t = o.find(".quc-tip"),
									n = o.find(".quc-tip-icon"),
									i = o.find(".quc-input-bg");
								t.addClass("quc-tip-success").html("\u53d1\u9001\u6210\u529f").show(), i.removeClass("quc-input-bg-incorrect"), n.removeClass("quc-tip-icon-incorrect").addClass("quc-tip-icon-correct"), o.find(".quc-input").one("change", function() {
									t.removeClass("quc-tip-success").html(t.attr("data-default-tip"))
								}), u.show(), s.start(), a.model.set("token", e.vt), a.model.trigger("dealCaptcha")
							}).fail(function(e) {
								u.show(), i.html("\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801"), i.removeClass(c), e.type = "mobile";
								var t = e.errdetail && e.errdetail.captchaUrl;
								t && (e.fromServer = !0, a.model.setCaptchaUrl(t), a.$el.find(".quc-field-captcha .quc-tip-icon").removeClass("quc-tip-icon-correct")), a.model.trigger("invalid", e)
							})
						}
					};
					this.model.on("show", function() {
						o = a.$el.find(".quc-field-sms-token"), n = a.$el.find(".quc-input-mobile"), r = a.$el.find(".quc-input-captcha"), i = o.find(".quc-button-get-sms-token"), 0 != o.length && (i.off("click", u).on("click", u), s.isRunning() && s.resume())
					})
				},
				setElement: function() {
					var i = this;
					i.$el && i.$el.remove(), i.$el = t(n), i.$el.find(".quc-form").submit(function(e) {
						e.preventDefault(), i.model.set("isNeedCheckCaptcha", !!i.$el.find(".quc-field-captcha:visible")[0]), i.submit()
					}), i.model.isShowPasswordAgain() || i.$el.find(".quc-field-password-again").remove(), i.$el.find(":text,:password").focus(function() {
						var e = t(this).parent(),
							n = e.siblings(".quc-tip"),
							o = i.$el.find(".quc-global-error .quc-tip");
						o.hide(), e.addClass("quc-input-bg-focus"), n.removeClass("quc-tip-success").html(n.attr("data-default-tip"))
					}).blur(function() {
						var n = t(this),
							o = n.parents(".quc-field"),
							r = o.siblings(".quc-field-password-again"),
							a = o.siblings(".quc-field-password");
						n.parent().removeClass("quc-input-bg-focus"), i.validate(o), o.hasClass("quc-field-password") && e.utils.isExisted(r) && i.validate(r), o.hasClass("quc-field-password-again") && e.utils.isExisted(a) && i.validate(a)
					}), i.$el.find(".quc-go-signIn").on("click", function() {
						i.model.signin()
					}), this.$el.find(".quc-field .quc-tip").attr("data-default-tip", function() {
						return t(this).html()
					})
				},
				validate: function(e) {
					var n = this,
						i = e.find(".quc-input"),
						o = i.attr("data-name") || i.attr("name"),
						r = t(".quc-activeState").html(),
						a = i.data("regexp"),
						c = "mobile" == o ? {
							mobileNumber: i.val(),
							regExp: a,
							areaCode: r
						} : i.val();
					0 == c.length || "mobile" == o && 0 == i.val().length || (i.trigger("quc-validate"), n.model.validate(o, c, !0).done(function() {
						var t = e.find(".quc-tip-icon");
						t.removeClass("quc-tip-icon-incorrect").addClass("quc-tip-icon-correct"), i.one("focus", function() {
							t.removeClass("quc-tip-icon-correct")
						})
					}).fail(function(t) {
						t.field = e, n.model.trigger("invalid", t)
					}))
				},
				initModelEvent: function() {
					var e = this;
					e.model.on("show", function(t, n) {
						e.show(n && n.wrapper)
					}).on("hide", function() {
						e.hide()
					})
				},
				initMobileStates: function() {
					var e = this,
						n = "";
					e.model.prepareMobileState().then(function(i) {
						for(var o = i.data, r = o.length, a = 0; a < r; a++) n += '<li class="quc-list-item" data-regexp=' + o[a].pattern + '><span class="quc-left-tip">' + o[a].zone + '</span><span class="quc-right-tip">' + o[a].state + "</span></li>";
						e.$el.find(".quc-mobile-Statelist").append(n), e.$el.on("mouseenter", ".quc-list-item", function(e) {
							t(this).css({
								backgroundColor: "#2994fd",
								color: "#ffffff"
							})
						}).on("mouseleave", ".quc-list-item", function() {
							t(this).css({
								backgroundColor: "#ffffff",
								color: "#808080"
							})
						}), t(document).on("click", function(e) {
							var n = t(e.target);
							if(n.hasClass("quc-list-item") || n.hasClass("quc-left-tip") || n.hasClass("quc-right-tip")) {
								var i = n.hasClass("quc-list-item") ? n : n.closest("li"),
									o = i.find(".quc-left-tip").html(),
									r = i.data("regexp");
								t(".quc-activeState").html(o), t(".quc-activeState").parent().siblings("input").data("regexp", r)
							}
							n.hasClass("quc-activeState") || n.hasClass("quc-area-arrow") ? t(".quc-mobile-Statelist").show() : t(".quc-mobile-Statelist").hide()
						})
					}, function(t) {
						e.model.trigger("invalid", t)
					})
				},
				initErrorTip: function() {
					var e = this;
					e.model.on("invalid", function(t, n) {
						var i = n.field || e.getErrorField(n.errno),
							o = i.find(".quc-input-bg"),
							r = i.find(".quc-tip"),
							a = i.find(".quc-tip-icon");
						r.removeClass("quc-tip-success").addClass("quc-tip-error").html(n.errmsg).show(), a.removeClass("quc-tip-icon-incorrect").addClass("quc-tip-icon-incorrect"), o.addClass("quc-input-bg-incorrect"), i.find(".quc-input").one("focus quc-validate", function() {
							r.removeClass("quc-tip-error").html(r.attr("data-default-tip")), a.removeClass("quc-tip-icon-incorrect"), o.removeClass("quc-input-bg-incorrect")
						})
					})
				},
				getErrorField: function(t) {
					var n = e.utils.getErrorType(t);
					return "other" != n ? this.$el.find(".quc-field-" + n) : this.$el.find(".quc-global-error")
				},
				submit: function() {
					var e = this,
						n = this.$el.find(".quc-button-submit");
					n.prop("disabled", !0).val("\u63d0\u4ea4\u4e2d..."), e.model.one("invalid", function() {
						n.prop("disabled", !1).val("\u63d0\u4ea4")
					}), e.$el.find(".quc-input").each(function(n, i) {
						var o = t(i),
							r = o.attr("data-name") || o.attr("name"),
							a = o.val();
						if("mobile" == r) {
							var c = e.$el.find(".quc-activeState").html(),
								s = o.data("regexp");
							e.model.set(r, {
								mobileNumber: a,
								regExp: s,
								areaCode: c
							})
						} else e.model.set(r, a)
					}), e.model.submit()
				},
				show: function(n) {
					if(this.setElement(), this.initMobileStates(), n) this.model.trigger("beforeShow", this.$el[0]), t(n).addClass("quc-wrapper quc-page").empty().append(this.$el);
					else {
						var i = this.panel = new e.utils.Panel;
						i.setTitle(e.getConfig("fillProfile.panelTitle", "\u5b8c\u5584\u5e10\u53f7\u8d44\u6599")), i.setContent(this.$el), this.model.trigger("beforeShow", this.$el[0]), i.show(), t(i).on("close", e.getConfig("fillProfile.panelCloseHandler", t.noop))
					}
					this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforeHide", this.$el[0]), this.panel && this.panel.hide(), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.fillProfile = {
			init: function() {
				o.init.apply(o, arguments)
			}
		}
	}(QHPass)
}, function(e, t, n) {
	! function(e) {
		var t = e.$,
			i = n(90),
			o = {},
			r = e.getLogic({
				name: "fillProfile",
				validate: function(n, i, r) {
					var a, c = e.validate;
					switch("boolean" != typeof i && void 0 !== i || (i = this.get(n)), n.toLowerCase()) {
						case "username":
							this.set("username", i), a = c.checkUsername(i);
							break;
						case "password":
							this.set("password", i);
							var s = c.checkPasswordFrontendSync({
								password: i,
								username: this.get("username")
							});
							a = s.reason;
							break;
						case "passwordagain":
							a = c.checkPasswordConfirm(this.get("password"), i);
							break;
						case "mobile":
							a = c.checkMobile(i, !0);
							break;
						case "smscode":
							a = c.checkSmsToken(i);
							break;
						case "captcha":
							a = c.checkCaptcha(i)
					}
					if(r) {
						var u, l = e.sync,
							p = t.Deferred();
						if(a) p = t.Deferred(), p.reject(a);
						else if("username" == n) {
							if(u = o[i]) return u;
							p = l.checkUsernameExist(i), o[i] = p.promise()
						} else if("mobile" == n) {
							var d = i.mobileNumber,
								f = i.areaCode;
							if(u = o[d]) return u;
							p = l.checkMobileNumberExist(d, f, "fillProfile"), o[d] = p.promise()
						} else p = t.Deferred(), p.resolve();
						return p.promise()
					}
					return a
				},
				sendSmsToken: function() {
					var n = this.get("mobile"),
						o = this.get("captcha"),
						r = this.get("token"),
						a = this.validate("mobile", n) || !r && this.validate("captcha", o);
					return a ? t.Deferred().reject(a).promise() : (n = n.areaCode + n.mobileNumber, e.getUserInfo().then(function(t) {
						return e.sync.sendSmsCodeNew({
							condition: i.SMS_CONDITION_NOT_EXIST,
							account: n,
							crumb: t.crumb,
							sms_scene: i.SMS_SCENE_OAUTH_BIND_MOBILE,
							captcha: o,
							vt: r
						})
					}))
				},
				prepareMobileState: function() {
					return e.sync.getMobileState()
				},
				prepareCaptcha: function() {
					var n = this,
						i = "",
						o = this.isFillProfileByMobile();
					return i = o ? "strictreg" : "", e.sync.getCaptchaUrl(i).then(function(e) {
						n.setCaptchaUrl(e.captchaUrl)
					}, function() {
						return t.Deferred().resolve().promise()
					})
				},
				run: function(e) {
					var t = this;
					t.init().trigger("showLoading"), t.prepareCaptcha().done(function() {
						t.trigger("hideLoading").trigger("show", {
							wrapper: e
						})
					})
				},
				submit: function() {
					var n, i = this,
						o = [],
						r = i.isFillProfileByMobile(),
						a = i.get("mobile"),
						c = i.get("smscode"),
						s = i.get("password"),
						u = i.get("captcha"),
						l = i.get("username");
					if(this.trigger("beforeSubmit"), r) {
						var p = i.get("isNeedCheckCaptcha", !1);
						o = ["mobile", "smscode", "password"], p && o.push("captcha")
					} else o = ["username", "password", "captcha"];
					i.isShowPasswordAgain() && o.push("passwordAgain"), t.each(o, function(e, t) {
						var o = i.validate(t);
						o && i.trigger("invalid", o), n = n || o
					}), !n && e.getUserInfo().then(function(t) {
						return r ? (a = a.areaCode + a.mobileNumber, e.sync.perfectMobile(t.crumb, a, s, c)) : e.sync.fillProfile(t.crumb, l, s, i.get("passwordAgain", void 0), u)
					}).done(function() {
						i.trigger("hide").trigger("success").resolve()
					}).fail(function(e) {
						e.fromServer = !0;
						var t = e.errdetail && e.errdetail.captchaUrl;
						t && i.setCaptchaUrl(t), i.trigger("invalid", e)
					})
				},
				signin: function() {
					var t = this.getCallback();
					e.signIn ? (this.trigger("hide"), e.signIn(t)) : location.href = "http://i.360.cn/reg/?src=" + e.getConfig("src") + "&destUrl=" + encodeURIComponent("string" == typeof t ? t : location.href)
				},
				isShowPasswordAgain: function() {
					return !e.getConfig("fillProfile.hidePasswordAgain", !1)
				},
				isFillProfileByMobile: function() {
					var t = e.getConfig("fillProfile.type", "username"),
						n = "mobile" == t;
					return n
				}
			});
		e.fillProfile = function(e, n) {
			!e || 1 == e.nodeType || e instanceof t || (n = e, e = void 0), r.setCallback(n).run(e)
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-identify"><form class="quc-form"><div class="quc-tip-wrapper"><p class="quc-tip">\u4e3a\u4e86\u4fdd\u62a4\u60a8\u7684\u5e10\u53f7\u5b89\u5168\uff0c\u64cd\u4f5c\u524d\u8bf7\u60a8\u8fdb\u884c\u5b89\u5168\u9a8c\u8bc1</p></div><div class="quc-other-wrapper"><p class="quc-field quc-field-method quc-clearfix"><label class="quc-label">\u9a8c\u8bc1\u65b9\u5f0f</label><select class="quc-select quc-select-method" name="secMethod"></select><span class="quc-input quc-input-method"></span><a class="quc-method-tip quc-link" href="http://i.360.cn/complaint" target="_blank" tabindex="99">\u9a8c\u8bc1\u65b9\u5f0f\u90fd\u4e0d\u80fd\u7528\u4e86\uff1f</a></p><p class="quc-field quc-field-token quc-input-middle quc-clearfix"><label class="quc-label">\u6821\u9a8c\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-token" type="tel" name="token" maxlength="6" placeholder="\u8bf7\u8f93\u51656\u4f4d\u6821\u9a8c\u7801" /></span><a href="#" class="quc-button quc-button-blue quc-get-token">\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801</a><span class="quc-tip"></span><a class="quc-token-tip quc-link" href="#" target="_blank" tabindex="99"></a></p></div><div class="quc-password-wrapper"><p class="quc-field quc-field-password quc-input-long quc-clearfix"><label class="quc-label">\u767b\u5f55\u5bc6\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-password" type="password" name="password" maxlength="20" placeholder="\u8bf7\u8f93\u5165\u60a8\u7684\u767b\u5f55\u5bc6\u7801" /></span><i class="quc-tip-icon"></i><a class="quc-token-tip quc-link" href="http://i.360.cn/findpwd/" target="_blank" tabindex="99">\u5fd8\u8bb0\u5bc6\u7801\uff1f</a></p><p class="quc-field quc-field-captcha quc-input-short"><label class="quc-label">\u9a8c\u8bc1\u7801</label><span class="quc-input-bg"><input class="quc-input quc-input-captcha" type="text" name="phrase" maxlength="7" autocomplete="off" placeholder="\u8bf7\u8f93\u5165\u9a8c\u8bc1\u7801" /></span><img class="quc-captcha-img quc-captcha-change" alt="\u9a8c\u8bc1\u7801" title="\u70b9\u51fb\u66f4\u6362" tabindex="99" /> <a class="quc-link quc-captcha-change-link quc-captcha-change" href="#">\u6362\u4e00\u5f20</a></p></div><p class="quc-field quc-field-submit"><input class="quc-button quc-button-primary quc-button-submit" type="submit" value="\u63d0\u4ea4" /></p></form></div>',
			i = {
				init: function(e) {
					this.model = e, this.initModelEvent(), this.initMethods(), this.initToken(), this.initErrorTip()
				},
				selElement: function() {
					this.$el && this.$el.remove(), this.$el = t(n), this.initElementEvent()
				},
				initToken: function() {
					var t, n = this,
						i = e.utils.getTimer("identify"),
						o = "quc-button-disabled";
					i.on("timer_start", function(e, n) {
						t.addClass(o), t.html(n + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), i.on("timer_tick", function(e, n) {
						t.html(n + "\u79d2\u540e\u53ef\u91cd\u65b0\u83b7\u53d6")
					}), i.on("timer_stop", function() {
						t.html("\u91cd\u65b0\u83b7\u53d6\u6821\u9a8c\u7801"), t.removeClass(o)
					});
					var r = function(e) {
						e.preventDefault(), t.hasClass(o) || (t.html("\u53d1\u9001\u4e2d..."), t.addClass(o), n.model.sendToken().done(function() {
							i.start(), n.$el.find(".quc-tip-wrapper .quc-tip").removeClass("quc-tip-error").addClass("quc-tip-success").html("\u53d1\u9001\u6210\u529f\uff0c\u8bf7\u67e5\u6536\uff01")
						}).fail(function(e) {
							t.html("\u514d\u8d39\u83b7\u53d6\u6821\u9a8c\u7801"), t.removeClass(o), n.model.trigger("invalid", e)
						}))
					};
					n.model.on("show", function() {
						t = n.$el.find(".quc-get-token"), t.on("click", r), i.isRunning() && i.resume()
					})
				},
				initElementEvent: function() {
					var e = this;
					this.$el.find(".quc-input").focus(function() {
						t(this).parent().addClass("quc-input-bg-focus")
					}).blur(function() {
						t(this).parent().removeClass("quc-input-bg-focus")
					}), this.$el.find(".quc-form").submit(function(t) {
						t.preventDefault(), e.submit()
					}), this.$el.find(".quc-select-method").on("change", function() {
						var n = t(this).val();
						"secMobile" == n ? e.$el.find(".quc-sec-help").children("a").attr("href", "http://i.360.cn/findpwd/customerhelper#mobiledisabled") : e.$el.find(".quc-sec-help").children("a").attr("href", "http://i.360.cn/findpwd/customerhelper#recieveemailcode")
					})
				},
				initMethods: function() {
					var e = this;
					this.model.on("show", function() {
						var n = e.$el.find(".quc-select-method"),
							i = !0,
							o = e.model.getMethods(),
							r = [];
						if(t.each(o, function(o, a) {
								i && (e.changeMethod(o, a.captchaUrl), i = !1), t("<option>").val(o).html(a.name + "(" + a.value + ")").appendTo(n), r.push(o)
							}), 1 == r.length) {
							var a = o[r[0]];
							e.$el.find(".quc-input-method").html(a.name + "(" + a.value + ")"), n.parent().addClass("quc-method-single")
						}
						n.change(function() {
							e.changeMethod(n.val())
						}), i && e.changeMethod("pwd")
					})
				},
				changeMethod: function(e, t) {
					var n = this.$el.find(".quc-token-tip"),
						i = this.$el.find(".quc-field-captcha"),
						o = this,
						r = function(e) {
							o.model.getCaptchaUrl("login").then(function(t) {
								i.find(".quc-captcha-img").attr("src", t);
								var n = i.find(".quc-input-captcha").val("");
								e && n.focus()
							})
						};
					"pwd" == e ? (this.$el.find(".quc-other-wrapper").hide(), this.$el.find(".quc-password-wrapper").children().show(), t && (this.model.setCaptchaUrl(t), r()), this.$el.find(".quc-captcha-change").click(function(e) {
						e.preventDefault(), r()
					})) : "secMobile" == e ? n.attr("href", "http://i.360.cn/findpwd/customerhelper#mobiledisabled").html("\u6536\u4e0d\u5230\u77ed\u4fe1\u6821\u9a8c\u7801\u600e\u4e48\u529e\uff1f") : n.attr("href", "http://i.360.cn/findpwd/customerhelper#recieveemailcode").html("\u6536\u4e0d\u5230\u90ae\u4ef6\u6821\u9a8c\u7801\u600e\u4e48\u529e\uff1f"), this.model.set("method", e), this.model.on("invalid", function(e, t) {
						t.fromServer && r()
					})
				},
				initModelEvent: function() {
					var e = this;
					e.model.on("show", function(t, n) {
						e.show(n)
					}).on("hide", function() {
						e.hide()
					})
				},
				submit: function() {
					var e = this,
						t = e.$el.find(".quc-button-submit"),
						n = e.$el.find(".quc-input-token").val(),
						i = e.$el.find(".quc-input-password").val(),
						o = e.$el.find(".quc-input-captcha").val();
					t.prop("disabled", !0).val("\u63d0\u4ea4\u4e2d..."), e.model.one("invalid", function() {
						t.prop("disabled", !1).val("\u63d0\u4ea4")
					}), e.model.set("token", n), e.model.set("password", i), e.model.set("captcha", o), e.model.submit()
				},
				initErrorTip: function() {
					var e = this;
					e.model.on("invalid", function(t, n) {
						var i = e.$el.find(".quc-tip-wrapper .quc-tip");
						i.removeClass("quc-tip-success").addClass("quc-tip-error").html(n.errmsg), e.$el.find(".quc-input, .quc-select").one("focus", function() {
							i.html("")
						})
					})
				},
				show: function(n) {
					if(this.$orgForm = t(n), this.selElement(), this.model.trigger("beforeShow", this.$el[0]), this.$orgForm.parents(".quc-panel").length > 0) this.$orgForm.hide().before(this.$el);
					else {
						var i = this.panel = new e.utils.Panel;
						i.setTitle(e.getConfig("identify.panelTitle", "\u9700\u8981\u6821\u9a8c\u60a8\u7684\u8eab\u4efd")).setContent(this.$el).show()
					}
					this.$orgForm.triggerHandler("QucDOMUpdated"), this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforeHide", this.$el[0]), this.panel ? this.panel.hide() : (this.$el.remove(), this.$orgForm.show()), this.$orgForm.triggerHandler("QucDOMUpdated"), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.identify = {
			init: function() {
				i.init.apply(i, arguments)
			}
		}
	}(QHPass)
}, function(e, t, n) {
	(function(e) {
		! function(t) {
			var i, o, r = n(13).getLogger("identify"),
				a = n(90),
				c = t.$,
				s = {},
				u = t.getLogic({
					name: "identify",
					validate: function(e, n) {
						var i, o = t.validate;
						switch(n = n || this.get(e), e.toLowerCase()) {
							case "token":
								i = o.checkSmsToken(n);
								break;
							case "password":
								i = o.checkPassword(n), i && (i = t.utils.isSameError(i, t.ERROR.PASSWORD_EMPTY) ? i : t.ERROR.PASSWORD_WRONG);
								break;
							case "captcha":
								i = o.checkCaptcha(n)
						}
						return i
					},
					getMethods: function() {
						return s[i]
					},
					prepareMethods: function(e) {
						return t.getUserInfo().then(function(n) {
							return t.sync.getIdentifyMethod(n.crumb, e)
						}).done(function(t) {
							s[e] = t.ways
						})
					},
					sendToken: function(e) {
						var n = this;
						return e = e || this.get("method"), t.getUserInfo().then(function(n) {
							return "secMobile" == e ? t.sync.sendSmsCodeNew({
								condition: a.SMS_CONDITION_EXIST,
								crumb: n.crumb,
								sms_scene: o,
								m: "sendSmsCode"
							}) : t.sync.sendEmailToken(n.crumb, e)
						}).fail(function(e) {
							n.trigger("invalid", e)
						})
					},
					run: function(t, n) {
						r.debug("run");
						var a = this;
						a.init(), i = t.sensop, o = t.scene;
						var c = a.getMethods(),
							s = e.keys(c);
						r.debug("identify ways", s), "bindMobile" === i && 1 === s.length && "pwd" === s[0] ? r.debug("no need identify") : (r.debug("need identify"), a.trigger("show", n))
					},
					submit: function() {
						r.debug("submit");
						var e = this,
							n = e.get("token"),
							o = e.get("method"),
							a = e.get("password"),
							s = e.get("captcha"),
							u = c.Deferred();
						this.trigger("beforeSubmit");
						var l = "pwd" == o ? e.validate("password") || e.validate("captcha") : e.validate("token");
						return l ? u.reject(l) : u.resolve(), u.then(function() {
							return t.getUserInfo();
						}).then(function(e) {
							var r = "pwd" == o ? a : n;
							return t.sync.identify(e.crumb, i, o, r, s)
						}).done(function() {
							r.debug("success"), e.trigger("hide").trigger("success")
						}).fail(function(t) {
							r.debug("fail");
							var n = t.errdetail && t.errdetail.captchaUrl;
							n && e.setCaptchaUrl(n), t.fromServer = !0, e.trigger("invalid", t)
						})
					}
				}),
				l = {
					bindMobile: {
						sensop: "bindMobile",
						scene: a.SMS_SCENE_BIND_MOBILE
					},
					modifyMobile: {
						sensop: "modifyMobile",
						scene: a.SMS_SCENE_MODIFY_MOBILE
					},
					delBindMobile: {
						sensop: "delMobile",
						scene: a.SMS_SCENE_UNBIND_MOBILE
					},
					setEmail: {
						sensop: "setLoginEmail",
						scene: a.SMS_SCENE_SET_EMAIL
					},
					modifyEmail: {
						sensop: "modifyLoginEmail",
						scene: a.SMS_SCENE_MODIFY_EMAIL
					},
					identifyEmail: {
						sensop: "verifyLoginEmail",
						scene: a.SMS_SCENE_OTHER
					},
					setSecEmail: {
						sensop: "setSecEmail",
						scene: a.SMS_SCENE_SET_SECEMAIL
					},
					modifySecEmail: {
						sensop: "modifySecEmail",
						scene: a.SMS_SCENE_MODIFY_SECEMAIL
					},
					modifyPassword: {
						sensop: "modifyPwd",
						scene: a.SMS_SCENE_MODIFY_PASS
					},
					setCommonArea: {
						sensop: "setComArea",
						scene: a.SMS_SCENE_OTHER
					},
					closeTextLogin: {
						sensop: "closeCodeLogin",
						scene: a.SMS_SCENE_OTHER
					},
					secwarnopen: {
						sensop: "secwarnopen",
						scene: a.SMS_SCENE_OTHER
					},
					secwarnclose: {
						sensop: "secwarnclose",
						scene: a.SMS_SCENE_OTHER
					},
					cancelAccount: {
						sensop: "cancelAccount",
						scene: a.SMS_SCENE_CANCEL_ACCOUNT
					}
				};
			t.identify = function(e) {
				var n, i = l[e.name];
				return e.one("beforeShow", function(e, t) {
					n = t, u.run(i, t)
				}), e.on("invalid", function(e, o) {
					t.utils.isSameError(o, t.ERROR.IDENTIFY_EXPIRE) && u.run(i, n)
				}), e.on("reset", function() {
					u.run(i, n)
				}), u.prepareMethods(i.sensop)
			}
		}(QHPass)
	}).call(t, n(1))
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-mod-active-email"><p class="quc-send-result">\u9a8c\u8bc1\u90ae\u4ef6\u5df2\u7ecf\u53d1\u9001\u5230\u60a8\u7684\u90ae\u7bb1:</p><p class="quc-email-address"><a href="#" class="quc-link quc-link-jump" target="_blank">\u53bb\u6fc0\u6d3b</a></p><p class="quc-tip">\u8bf7\u60a8\u572848\u5c0f\u65f6\u5185\u767b\u5f55\u90ae\u7bb1\u5b8c\u6210\u9a8c\u8bc1</p><p class="quc-button-wrapper"><a href="#" class="quc-button quc-button-blue quc-button-activated" target="_blank">\u5df2\u5b8c\u6210\u6fc0\u6d3b</a></p><div class="quc-resend"><p>\u6ca1\u6536\u5230\u90ae\u4ef6\u600e\u4e48\u529e\uff1f</p><p class="quc-modify-wrapper">&middot; \u90ae\u7bb1\u586b\u9519\u4e86\uff0c<a href="#" class="quc-link quc-link-modify">\u91cd\u65b0\u8bbe\u7f6e\u90ae\u7bb1</a></p><p>&middot; <a href="#" class="quc-link quc-link-resend">\u91cd\u65b0\u53d1\u9001</a>\u9a8c\u8bc1\u90ae\u4ef6&nbsp;<span class="quc-resend-result"></span></p><p>&middot; \u4f9d\u7136\u6536\u4e0d\u5230\u90ae\u4ef6\uff0c<a class="quc-link" href="http://i.360.cn/findpwd/customerhelper#recieveemailcode" target="_blank">\u67e5\u770b\u5e2e\u52a9</a></p></div></div>',
			i = {
				init: function(e) {
					this.model = e, this.initModelEvent()
				},
				initModelEvent: function() {
					var e = this;
					e.model.on("show", function(t, n) {
						e.show(n)
					}).on("hide", function() {
						e.hide()
					}).on("resendSuccess", function() {
						e.$el.find(".quc-resend-result").removeClass("quc-resending quc-tip-error").html("\u53d1\u9001\u6210\u529f\uff01").show()
					}).on("resendFail", function(t, n) {
						e.$el.find(".quc-resend-result").removeClass("quc-resending").addClass("quc-tip-error").html(n.errmsg).show()
					})
				},
				selElement: function() {
					var e = this;
					e.$el && e.$el.remove(), e.$el = t(n);
					var i = this.model.getEmailInfo();
					i.site && e.$el.find(".quc-link-jump").attr("href", i.site).show(), "signUp" == i.type && e.$el.find(".quc-modify-wrapper").hide(), e.$el.find(".quc-email-address").prepend(i.email), e.$el.find(".quc-link-resend").click(function(t) {
						t.preventDefault(), e.model.resend(), e.$el.find(".quc-resend-result").addClass("quc-resending").html("\u53d1\u9001\u4e2d...").show()
					}), e.$el.find(".quc-link-modify").click(function(t) {
						t.preventDefault(), e.hide(), e.model.modify()
					}), e.$el.find(".quc-button-activated").click(function(n) {
						n.preventDefault();
						var o = t(this);
						o.html("\u68c0\u67e5\u6fc0\u6d3b\u72b6\u6001...").addClass("quc-button-disabled"), e.model.checkActive().fail(function() {
							var t = i.site ? '<a class="quc-link" href="' + i.site + '" target="_blank">\u767b\u5f55\u90ae\u7bb1</a>' : "\u767b\u5f55\u90ae\u7bb1";
							e.$el.find(".quc-tip").addClass("quc-tip-error").html("\u60a8\u4f3c\u4e4e\u8fd8\u6ca1\u6709\u6fc0\u6d3b\uff0c\u8bf7" + t + "\uff0c\u5e76\u6309\u90ae\u4ef6\u5185\u7684\u63d0\u793a\u64cd\u4f5c\u3002"), o.html("\u5df2\u5b8c\u6210\u6fc0\u6d3b").removeClass("quc-button-disabled")
						})
					})
				},
				show: function() {
					if(this.$orgForm = t(this.model.getEmailInfo().el), this.selElement(), this.model.trigger("beforeShow", this.$el[0]), this.$orgForm.parents(".quc-panel").length > 0) this.$orgForm.hide().before(this.$el);
					else {
						var n = this.panel = new e.utils.Panel;
						n.setTitle("\u8bf7\u6fc0\u6d3b\u60a8\u7684\u90ae\u7bb1").setContent(this.$el).show()
					}
					this.$orgForm.triggerHandler("QucDOMUpdated"), this.model.trigger("afterShow", this.$el[0])
				},
				hide: function() {
					this.model.trigger("beforeHide", this.$el[0]), this.panel ? this.panel.hide() : (this.$el.remove(), this.$orgForm.show()), this.$orgForm.triggerHandler("QucDOMUpdated"), this.model.trigger("afterHide", this.$el[0])
				}
			};
		e.ui.activeEmail = {
			init: function() {
				i.init.apply(i, arguments)
			}
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = {},
			i = e.getLogic({
				name: "activeEmail",
				run: function(t) {
					var i = this,
						o = e.getConfig("activeEmail.destUrl", location.href);
					if(i.init(), "signUp" == n.type) {
						if(n.activeUrl = t.activeurl + "&destUrl=" + encodeURIComponent(o), n.email = t.email, n.wrapper) return void(location.href = n.activeUrl);
						e.sync.sendSignUpActivationEmail(n.activeUrl).then(function(e) {
							n.site = e.goToMail, i.trigger("show")
						})
					} else {
						if("setEmail" == n.type) n.email = t.loginEmailUnactivated;
						else {
							if("setSecEmail" != n.type) return void this.trigger("error", "");
							n.email = t.safeSecEmail
						}
						n.site = t.mailHostUrl, i.trigger("show")
					}
				},
				getEmailInfo: function() {
					return n
				},
				resend: function() {
					var i = this,
						o = t.when();
					return "signUp" == n.type ? o = e.sync.sendSignUpActivationEmail(n.activeUrl) : "setEmail" == n.type ? o = e.getUserInfo().then(function(t) {
						return e.sync.sendActivationEmail(t.crumb)
					}) : "setSecEmail" == n.type && (o = e.getUserInfo().then(function(t) {
						return e.sync.sendSecActivationEmail(t.crumb)
					})), o.done(function(e) {
						i.trigger("resendSuccess", e)
					}).fail(function(e) {
						i.trigger("resendFail", e)
					})
				},
				modify: function() {
					n.model.trigger("reset")
				},
				checkActive: function() {
					var i = this,
						o = t.Deferred();
					return "signUp" == n.type ? e.sync.checkEmailExist(n.email).always(function(t) {
						e.utils.isSameError(t, e.ERROR.EMAIL_NOT_ACTIVATED) ? o.reject() : o.resolve()
					}) : "setEmail" == n.type ? e.getEmailStatus(function(e) {
						e.loginEmail ? o.resolve() : o.reject()
					}) : e.getUserSecInfo(function(e) {
						e.safeSecEmail ? o.resolve() : o.reject()
					}), o.then(function() {
						i.trigger("hide").trigger("success").resolve()
					}), o.promise()
				}
			});
		e.activeEmail = function(e, t) {
			i.setCallback(t).run(e)
		}, e.activeEmail.prepare = function(e, t) {
			n.model = e, n.wrapper = t, n.type = e.name, e.on("beforeShow", function(e, t) {
				n.el = t
			})
		}
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$,
			n = '<div class="quc-loading"></div><div class="quc-mask quc-mask-loading"><!--[if lte IE 6]><iframe class="quc-ie6-iframe" src="about:blank" border="0" frameborder="0"></iframe><div class="quc-mask-inner"></div><![endif]--></div>',
			i = e.ui.loading = {
				$el: t(n),
				show: function() {
					if(i.$el.appendTo(document.body), !e.utils.support.fixed) {
						var n = t(window),
							o = t(document.body);
						i.$el.filter(".quc-mask").css({
							height: o.outerHeight(!0),
							width: o.outerWidth(!0),
							position: "absolute"
						}), i.$el.filter(".quc-loading").css({
							height: n.height(),
							width: n.width(),
							top: n.scrollTop(),
							left: n.scrollLeft(),
							position: "absolute"
						})
					}
				},
				hide: function() {
					i.$el.remove()
				}
			};
		e.events.on("showLoading.*", i.show), e.events.on("hideLoading.*", i.hide)
	}(QHPass)
}, function(e, t) {
	! function(e) {
		var t = e.$;
		e.when = {
			signIn: function(t) {
				var n = function(n) {
					"bind" == n.type && 0 == n.userName.indexOf("360U") ? e.fillProfile(function() {
						t(n)
					}) : t(n)
				};
				e.getUserInfo(!1, n, function() {
					e.signIn(n)
				})
			},
			username: function(t) {
				this.signIn(function(n) {
					0 == n.username.indexOf("360U") ? e.setUsername(t) : t()
				})
			},
			nickname: function(t) {
				this.signIn(function(n) {
					n.nickname ? t() : e.setNickname(t)
				})
			},
			email: function(t) {
				this.signIn(function() {
					e.getEmailStatus(function(n) {
						n.loginEmail ? t() : e.setEmail(t)
					})
				})
			},
			secEmail: function(t) {
				this.signIn(function() {
					e.getUserSecInfo(function(n) {
						n.safeSecEmail ? t() : e.setSecEmail(t)
					})
				})
			},
			mobile: function(t) {
				this.signIn(function() {
					e.getUserSecInfo(function(n) {
						n.safeSecMobile ? t() : e.bindMobile(t)
					})
				})
			},
			emailOrMobile: function(n, i) {
				this.signIn(function() {
					var o = t.Deferred(),
						r = t.Deferred();
					e.getUserSecInfo(function(e) {
						e.safeSecMobile ? r.reject() : r.resolve()
					}), e.getEmailStatus(function(e) {
						e.loginEmail ? o.reject() : o.resolve()
					}), t.when(o, r).then(function() {
						i ? e.bindMobile(n) : e.setEmail(n)
					}, n)
				})
			},
			mobileOrEmail: function(e, t) {
				this.emailOrMobile(e, !t)
			},
			authenticate: function(t) {
				this.signIn(function(n) {
					var i = n.crumb;
					e.sync.getAuthenticationStatus(i).then(function(n) {
						var i = n.details && n.details.mobile,
							o = n.details && n.details.isNeedAuthen;
						o ? e.authenticate(t) : t && t(i)
					})
				})
			}
		}
	}(QHPass)
}, function(e, t, n) {
	function i() {
		o.setResources(r), o.setLocale("zh_CN")
	}
	var o = n(51);
	e.exports = o;
	var r = {
		zh_CN: {
			"\u53d6\u6d88": "\u53d6\u6d88",
			"override phone warning": "\u8be5\u624b\u673a\u53f7\u5df2\u88ab\u4f7f\u7528\uff0c\u70b9\u51fb\u201c\u7ee7\u7eed\u7ed1\u5b9a\u201d\u6309\u94ae\uff0c\u624b\u673a\u53f7\u5c06\u4e0e\u539f\u5e10\u53f7\u89e3\u9664\u7ed1\u5b9a\uff0c<b>\u539f\u5e10\u53f7\u5c06\u65e0\u6cd5\u4f7f\u7528\u6b64\u624b\u673a\u53f7\u767b\u5f55\uff0c\u4e5f\u53ef\u80fd\u65e0\u6cd5\u518d\u6b21\u627e\u56de\u539f\u5e10\u53f7</b>\uff0c\u8bf7\u8c28\u614e\u64cd\u4f5c\u3002",
			"weak password warning": "\u7cfb\u7edf\u68c0\u6d4b\u5230\u60a8\u5e10\u53f7\u5b89\u5168\u7b49\u7ea7\u8f83\u4f4e\uff0c\u5efa\u8bae\u7acb\u5373\u4fee\u6539\u5bc6\u7801",
			"leak password warning": "\u7cfb\u7edf\u68c0\u6d4b\u5230\u60a8\u5e10\u53f7\u5b58\u5728\u5b89\u5168\u98ce\u9669\uff0c\u8bf7\u5148\u4fee\u6539\u5bc6\u7801"
		},
		en: {
			"\u53d6\u6d88": "Cancel",
			"\u4fee\u6539\u5bc6\u7801": "Set",
			"weak password warning": "Weak password, please change the password first",
			"leak password warning": "Your account has security risk, please change the password first",
			"\u7ee7\u7eed\u7ed1\u5b9a": "Continue",
			"override phone warning": 'This phone number has been associated with another 360 account, <b>click "continue" will disassociate it and associate with the current account</b>, operate with cautions.'
		}
	};
	i()
}, function(e, t, n) {
	(function(e, t) {
		function i() {
			var t = r.parse(e.slice(location.search, 1));
			if(QHPass.isI360() && "/" === location.pathname) {
				var n = s.parse(document.referrer, !0);
				if("/oauth/bind" === n.pathname && "dobind" !== n.query.a) return o();
				t.checkPwd && o()
			}
		}

		function o() {
			return t.resolve(QHPass.sync.actualGetUserInfo({
				need_weak_info: 1
			})).then(function(e) {
				return a.debug("check pwd", e), c.tryHandleAbnormalPassword(e)
			}).then(function(e) {
				e && e.shouldChangePassword && c.gotoPageWithSearchParams("/profile/chuserpwd?op=modifyPwd")
			}).caught(function() {
				a.debug("sign out"), QHPass.signOut(function() {
					QHPass.isI360() && "/login" !== location.pathname && c.gotoPage("/login")
				})
			})
		}
		var r = n(25),
			a = n(13).getLogger("request"),
			c = n(86),
			s = n(29);
		i()
	}).call(t, n(1), n(30))
}, function(e, t) {
	e.exports = '.quc-wrapper a:active,.quc-wrapper a:hover{outline-width:0}.quc-wrapper input,.quc-wrapper select,.quc-wrapper textarea{outline:0}.quc-icon-sad,.quc-mod-bind-mobile .quc-field-mobile .quc-input-bg,.quc-mod-bind-mobile .quc-field-mobile .quc-input-bg-focus,.quc-mod-bind-mobile .quc-field-mobile .quc-input-bg-incorrect,.quc-mod-bind-mobile .quc-state-wrapper,.quc-mod-bind-mobile .quc-state-wrapper .quc-area-arrow,.quc-mod-fill-profile .quc-field-mobile .quc-input-bg,.quc-mod-fill-profile .quc-field-mobile .quc-input-bg-focus,.quc-mod-fill-profile .quc-field-mobile .quc-input-bg-incorrect,.quc-mod-fill-profile .quc-state-wrapper,.quc-mod-fill-profile .quc-state-wrapper .quc-area-arrow,.quc-mod-sign-in .quc-third-part-icon,.quc-mod-sign-up .quc-left-bar .quc-icon,.quc-mod-sign-up .quc-left-bar .quc-sign-up-type li.quc-current,.quc-panel-sad .quc-panel-hd .quc-panel-title,.quc-panel .quc-panel-hd,.quc-panel .quc-panel-hd .quc-panel-close,.quc-panel .quc-panel-hd .quc-panel-title,.quc-wrapper .quc-input-bg,.quc-wrapper .quc-tip-icon{background-image:url(//p.ssl.qhimg.com/t01bc75514bf55a2f53.png);background-repeat:no-repeat}.quc-wrapper{font-size:12px;line-height:1em;font-family:Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,\u5fae\u8f6f\u96c5\u9ed1,Arial,SimSun,sans-serif;+line-height:14px}.quc-icon{vertical-align:middle}.quc-icon-sad{background-position:-403px -607px}.quc-wrapper dd,.quc-wrapper div,.quc-wrapper dl,.quc-wrapper dt,.quc-wrapper form,.quc-wrapper i,.quc-wrapper label,.quc-wrapper li,.quc-wrapper ol,.quc-wrapper p,.quc-wrapper ul{margin:0;padding:0;list-style:none;width:auto;height:auto;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box}.quc-wrapper a{text-decoration:none}.quc-clearfix{*zoom:1}.quc-clearfix:after{content:".";display:block;height:0;clear:both;visibility:hidden}.quc-wrapper .quc-button-save{width:75px;background-position:-270px -240px}.quc-wrapper .quc-button-save:focus,.quc-wrapper .quc-button-save:hover{background-position:-270px -280px}.quc-wrapper .quc-button-save:active{background-position:-270px -240px}.quc-wrapper .quc-button-saving,.quc-wrapper .quc-button-saving:hover{background-position:-270px -320px}.quc-wrapper .quc-button-sign-up{width:263px;background-position:0 -360px}.quc-wrapper .quc-button-sign-up:focus,.quc-wrapper .quc-button-sign-up:hover{background-position:0 -400px}.quc-wrapper .quc-button-sign-up:active{background-position:0 -360px}.quc-wrapper .quc-button-submit{width:263px;background-position:0 -240px}.quc-wrapper .quc-button-submit:focus,.quc-wrapper .quc-button-submit:hover{background-position:0 -280px}.quc-wrapper .quc-button-submitting,.quc-wrapper .quc-button-submitting:hover{width:263px;background-position:0 -320px;cursor:default}.quc-wrapper .quc-button-sign-in{width:263px;background-position:0 -120px}.quc-wrapper .quc-button-sign-in:focus,.quc-wrapper .quc-button-sign-in:hover{background-position:0 -160px}.quc-wrapper .quc-button-signing-in,.quc-wrapper .quc-button-signing-in:hover{width:263px;background-position:0 -200px;cursor:default}.quc-wrapper .quc-button-blue:focus,.quc-wrapper .quc-button-blue:hover{text-decoration:none;background-position:-270px -400px}.quc-wrapper .quc-button-disabled,.quc-wrapper .quc-button-disabled:focus,.quc-wrapper .quc-button-disabled:hover,.quc-wrapper .quc-button-disabled:visited{background-position:-350px -240px;color:#bababa;cursor:default;text-decoration:none}.quc-wrapper .quc-input{width:247px;height:21px;*height:20px;margin:5px 4px 3px;*margin-top:4px;padding:6px 7px;line-height:20px;color:grey;outline:none;border:none;background-color:#fff;font-size:14px;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box}.quc-wrapper .quc-input-bg{display:inline-block;*display:inline;*zoom:1;width:270px;height:42px;vertical-align:middle}.quc-wrapper .quc-input-bg-incorrect{background-position:0 -485px}.quc-wrapper .quc-input-bg-focus{background-position:0 -530px}.quc-input-long .quc-input-bg{width:270px;background-position:0 -440px}.quc-input-long .quc-input-bg-incorrect{background-position:0 -485px}.quc-input-long .quc-input-bg-focus{background-position:0 -530px}.quc-input-middle .quc-input-bg{width:145px;background-position:-270px -439px}.quc-input-middle .quc-input-bg-incorrect{background-position:-270px -484px}.quc-input-middle .quc-input-bg-focus{background-position:-270px -529px}.quc-input-middle .quc-input{width:123px}.quc-input-short .quc-input-bg{width:120px;background-position:0 -575px}.quc-input-short .quc-input-bg-incorrect{background-position:-120px -575px}.quc-input-short .quc-input-bg-focus{background-position:-240px -573px}.quc-input-short .quc-input{width:97px}.quc-wrapper .quc-select{width:266px;height:33px;margin:4px 3px;padding:6px;border:1px solid #b7b7b7;-webkit-border-radius:2px;-moz-border-radius:2px;border-radius:2px;line-height:33px;font-size:14px;color:grey;outline:none;vertical-align:middle;-webkit-box-shadow:inset 0 -2px 1px hsla(0,0%,71.8%,.2);-moz-box-shadow:inset 0 -2px 1px hsla(0,0%,71.8%,.2);box-shadow:inset 0 -2px 1px hsla(0,0%,71.8%,.2)}.quc-wrapper .quc-select:focus{border-color:#6ed42a;-webkit-box-shadow:0 0 3px 1px rgba(110,212,42,.4);-moz-box-shadow:0 0 3px 1px rgba(110,212,42,.4);box-shadow:0 0 3px 1px rgba(110,212,42,.4)}.quc-wrapper .quc-checkbox,.quc-wrapper .quc-radio{vertical-align:middle;margin-right:5px}.quc-wrapper .quc-tip{color:#959393}.quc-wrapper .quc-tip-error{color:red}.quc-wrapper .quc-tip-success{color:#64c82c}.quc-wrapper a.quc-link,.quc-wrapper a.quc-link:active{color:#0082cb}.quc-wrapper a.quc-link:hover{text-decoration:underline}.quc-wrapper a.quc-link-grey{color:#999}.quc-wrapper .quc-tip-icon{display:inline-block;width:17px;height:15px;margin:0 0 2px 4px;vertical-align:middle;background-position:999px}.quc-wrapper .quc-tip-icon-correct{background-position:-350px -330px}.quc-wrapper .quc-tip-icon-incorrect{background-position:-350px -345px}.quc-mask{background:#000;filter:alpha(opacity=40);opacity:.4;position:fixed;left:0;top:0;height:100%;width:100%;overflow:hidden;z-index:110000;*zoom:1}.quc-ie6-iframe,.quc-mask-inner{position:absolute;width:100%;height:100%;z-index:100000;background:#000}.quc-panel{min-width:200px;left:410px;padding:0;margin:0;position:absolute;z-index:130000;text-align:left;background-color:#fff;-webkit-box-shadow:2px 2px 10px rgba(0,0,0,.3);-moz-box-shadow:2px 2px 10px rgba(0,0,0,.3);box-shadow:2px 2px 10px rgba(0,0,0,.3)}.quc-panel .idt-bar{padding:0 .5em}.quc-confirm{width:460px}.quc-confirm .quc-panel-hd{width:100%}.quc-panel .quc-panel-hd{height:57px;background-repeat:repeat-x;overflow:hidden}.quc-panel .quc-panel-hd .quc-panel-title{height:38px;min-width:300px;margin-left:17px;padding:24px 40px 0 83px;color:#666;font-size:16px;background-position:0 -60px}.quc-panel .quc-panel-hd .quc-panel-close{position:absolute;top:16px;right:10px;width:29px;height:0;padding-top:24px;overflow:hidden;font-size:0;background-position:-350px -280px;cursor:pointer}.quc-panel .quc-panel-hd .quc-panel-close:hover{background-position:-350px -305px}.quc-panel-sad .quc-panel-hd .quc-panel-title{background-position:0 -754px}.quc-confirm .quc-panel-main,.quc-message .quc-panel-main{font-size:14px;line-height:24px;padding:40px;text-align:center;color:#666}.quc-confirm .quc-panel-main .quc-icon,.quc-message .quc-panel-main .quc-icon{height:24px;width:24px;display:inline-block;padding-left:5px}.quc-confirm .quc-panel-btns,.quc-message .quc-panel-btns{margin-top:26px;text-align:center}.quc-confirm .quc-panel-btns .quc-button-confirm,.quc-message .quc-panel-btns .quc-button-confirm{margin-left:10px}.quc-wrapper .quc-email-hint-wrapper{position:relative;width:0;height:0;z-index:130500}.quc-wrapper .quc-email-hint{position:absolute;z-index:130550;border:1px solid #d3d3d3;margin:-4px 0 0 3px;background:#fff}.quc-email-hint a{display:block;color:grey;font-size:14px;padding:0 5px;line-height:1.8em;outline:none;-webkit-user-select:none;-moz-user-select:none}.quc-email-hint a:hover{text-decoration:none}.quc-email-hint a.quc-on{background:#e8f8da;color:#000}.quc-wrapper .quc-ie-placeholder{color:#b4bccc!important}.quc-wrapper :-ms-input-placeholder{color:#b4bccc}.quc-wrapper ::-webkit-input-placeholder{color:#b4bccc}.quc-wrapper ::-moz-placeholder{color:#b4bccc}.quc-wrapper ::placeholder{color:#b4bccc}.quc-wrapper .quc-mod-set-nickname{padding:30px 0 20px 40px;min-height:60px}.quc-mod-set-nickname .quc-button-save{margin-left:20px}.quc-mod-set-nickname .quc-tip{margin:5px 0 10px 3px;height:20px}.quc-mod-set-nickname .quc-alternative-wrapper{display:none;margin:5px 0 15px 3px}.quc-mod-set-nickname .quc-alternatives{margin-top:10px}.quc-mod-set-nickname .quc-alternatives a{margin-right:10px}.quc-wrapper .quc-mod-set-username{padding:30px 0 20px 40px;min-height:60px}.quc-mod-set-username .quc-button-save{margin-left:20px}.quc-mod-set-username .quc-tip{margin:5px 0 10px 3px;height:20px}.quc-mod-set-username .quc-alternative-wrapper{display:none;margin:5px 0 15px 3px}.quc-mod-set-username .quc-alternatives{margin-top:10px}.quc-mod-set-username .quc-alternatives a{margin-right:10px}.quc-wrapper .quc-mod-authentication{padding:2px 20px 20px 30px;width:380px}.quc-mod-authentication .quc-tip-wrapper{height:21px;line-height:21px;padding:3px 0 0 75px;*padding-top:5px}.quc-mod-authentication .quc-label{display:inline-block;width:60px;margin-right:10px;line-height:31px;font-size:14px;text-align:right;color:#333}.quc-mod-authentication .quc-field .quc-button-blue{margin:0 4px 1px 1px}.quc-mod-authentication .quc-field-mobile .quc-link-mobile-tip{float:right;margin-right:50px}.quc-mod-authentication .quc-field .quc-input-bg{margin:3px 0 4px}.quc-mod-authentication .quc-field .quc-tip-icon{visibility:hidden}.quc-mod-authentication .quc-field .quc-tip-icon-correct,.quc-mod-authentication .quc-field .quc-tip-icon-incorrect{visibility:visible}.quc-mod-authentication .quc-field .quc-tip{margin-left:75px;line-height:1}.quc-mod-authentication .quc-button-submit{margin:10px 0 0 75px}.quc-mod-authentication .quc-captcha-img{height:35px;vertical-align:middle;outline:none;cursor:pointer}.quc-mod-authentication .quc-captcha-change-link{margin-left:11px}.quc-mod-authentication-token .quc-input-method{display:inline-block;+diaplay:inline;+zoom:1;vertical-align:middle}.quc-mod-authentication-token .quc-field-send-smstoken .quc-input{width:194px}.quc-mod-authentication-token .quc-field-send-smstoken{margin:3px 0}.quc-mod-authentication-token .quc-link-mobile-tip{margin-left:250px}.quc-mod-authentication-token .quc-link-go-back{display:inline-block;vertical-align:middle;margin-left:10px;margin-top:10px}.quc-mod-authentication .quc-mod-authentication-success,.quc-mod-authentication .quc-mod-authentication-token{display:none}.quc-mod-authentication-success .quc-field{text-align:center;padding:10px 0;font-size:14px}.quc-wrapper .quc-mod-set-email{padding:0 40px 10px;width:350px}.quc-mod-set-email .quc-tip{padding:15px 0 2px 75px;height:14px;line-height:14px}.quc-mod-set-email .quc-form p{padding:5px 0}.quc-mod-set-email .quc-label{display:inline-block;width:60px;height:41px;line-height:41px;color:#333;font-size:14px;padding-right:10px;text-align:right}.quc-mod-set-email .quc-button-submit{font-size:14px;color:#fff;margin-left:73px}.quc-mod-set-email .quc-help{border-top:1px solid #a2a2a2;color:#666;margin-top:10px;padding-top:10px;line-height:1.5em}.quc-wrapper .quc-sign-in-nav{margin:0 35px 0 -30px;text-align:center}.quc-wrapper .quc-sign-in-nav a{display:inline-block;height:36px;margin:0 2px;color:#666;vertical-align:bottom}.quc-wrapper .quc-sign-in-nav-c2 a{margin-right:20px;padding:0 15px}.quc-wrapper .quc-sign-in-nav-c3 a{padding:0 10px}.quc-wrapper .quc-sign-in-nav-c4 a{padding:0 5px;font-size:14px}.quc-wrapper .quc-sign-in-nav .quc-current{border-bottom:2px solid #41c42e;margin-bottom:-2px}.quc-mod-sign-in{overflow:hidden}.quc-mod-sign-in .quc-main{width:380px;min-height:190px;padding:0 0 10px 30px}.quc-mod-sign-in .quc-tip-wrapper{height:21px;line-height:21px;padding:13px 0 0 105px}.quc-mod-sign-in .quc-label{display:inline-block;width:60px;margin-right:10px;line-height:31px;font-size:14px;color:#333;text-align:right}.quc-mod-sign-in .quc-field{margin-bottom:10px}.quc-mod-sign-in .quc-field-third-part{padding-top:3px;color:#888;margin-bottom:0}.quc-mod-sign-in .quc-third-part{margin-left:5px}.quc-mod-sign-in .quc-third-part-icon{display:inline-block;width:31px;height:26px;vertical-align:middle;margin:-3px 0 0 -1px}.quc-mod-sign-in .quc-third-part-icon:focus,.quc-mod-sign-in .quc-third-part-icon:hover{position:relative}.quc-mod-sign-in .quc-third-part-icon-sina{background-position:-400px -280px}.quc-mod-sign-in .quc-third-part-icon-sina:hover{background-position:-430px -280px}.quc-mod-sign-in .quc-third-part-icon-renren{background-position:-400px -305px}.quc-mod-sign-in .quc-third-part-icon-renren:hover{background-position:-430px -305px}.quc-mod-sign-in .quc-third-part-icon-fetion{background-position:-400px -330px}.quc-mod-sign-in .quc-third-part-icon-fetion:hover{background-position:-430px -330px}.quc-mod-sign-in .quc-third-part-icon-msn{background-position:-400px -355px}.quc-mod-sign-in .quc-third-part-icon-msn:hover{background-position:-430px -355px}.quc-mod-sign-in .quc-third-part-icon-telecom{background-position:-400px -380px}.quc-mod-sign-in .quc-third-part-icon-telecom:hover{background-position:-430px -380px}.quc-mod-sign-in .quc-third-part-icon-tencent{background-position:-400px -355px}.quc-mod-sign-in .quc-third-part-icon-tencent:hover{background-position:-430px -355px}.quc-mod-sign-in .quc-third-part-icon-weixin{background-position:-400px -576px}.quc-mod-sign-in .quc-third-part-icon-weixin:hover{background-position:-430px -576px}.quc-mod-mobile-sign-in .quc-field-send-sms,.quc-mod-normal-sign-in .quc-field-third-part,.quc-mod-sign-in .quc-field-keep-alive,.quc-mod-sign-in .quc-field-submit{padding-left:75px}.quc-mod-mobile-sign-in .quc-link-mobile-tip{margin-left:53px}.quc-mod-sign-in .quc-captcha-img{height:35px;vertical-align:middle;outline:none;cursor:pointer}.quc-mod-sign-in .quc-field-captcha{display:none}.quc-mod-qrcode-sign-in .quc-title{font-size:14px;text-align:center;margin:20px 0}.quc-mod-qrcode-sign-in .quc-title .quc-link{color:#41c42e}.quc-mod-qrcode-sign-in .quc-qrcode-wrapper{position:relative;width:250px;height:180px;margin:0 auto}.quc-mod-qrcode-sign-in .quc-qrcode{display:block;position:relative;width:100%;margin:0 auto}.quc-mod-qrcode-sign-in .quc-qrcode-box{position:relative;background:url(//p.ssl.qhimg.com/d/quc/uc_qrcode_background.png);-moz-background-size:cover;-o-background-size:cover;background-size:cover;width:180px;height:180px;margin:0 auto;color:#fff;font-weight:bolder}.quc-mod-qrcode-sign-in .quc-qrcode-box .quc-qrcode-mask{display:none}.quc-mod-qrcode-sign-in .quc-qrcode-box .quc-qrcode-mask-bg{position:absolute;top:0;left:0;background:#000;opacity:.7;width:100%;height:100%;filter:alpha(opacity=70)}.quc-mod-qrcode-sign-in .quc-qrcode-box .quc-qrcode-refresh{position:relative;width:75px;height:20px;line-height:20px;margin:18px auto;color:#fff;background:#4ab91d;text-align:center;-webkit-border-radius:4px;-moz-border-radius:4px;border-radius:4px}.quc-mod-qrcode-sign-in .quc-qrcode-box .quc-qrcode-icon{position:absolute;width:100%;top:50%;margin-top:-42px;line-height:28px;text-align:center;-webkit-filter:glow(color=#ffffff,strength=1);filter:glow(color=#ffffff,strength=1)}.quc-mod-quick-sign-in .quc-loading,.quc-mod-quick-sign-in .quc-tip-wrapper{display:none}.quc-mod-quick-sign-in .quc-main{width:460px;height:262px;padding:0}.quc-mod-quick-sign-in .quc-sign-in-iframe{width:100%;height:100%}.quc-mod-sign-in .quc-footer{padding:10px 0 17px;text-align:center;border-top:1px solid #f7f7f7}.quc-mod-sign-in .quc-footer:before{content:"";position:absolute;display:block;width:100%;height:1px;margin-top:-11px;background:-webkit-gradient(linear,left top,right top,from(#f7f7f7),color-stop(#d5d5d5),to(#f7f7f7));background:-webkit-linear-gradient(left,#f7f7f7,#d5d5d5,#f7f7f7);background:-moz- oldlinear-gradient(left,#f7f7f7,#d5d5d5,#f7f7f7);background:-o-linear-gradient(left,#f7f7f7,#d5d5d5,#f7f7f7);background:linear-gradient(90deg,#f7f7f7,#d5d5d5,#f7f7f7)}.quc-mod-sign-in .quc-footer .quc-link{display:inline-block;padding:0 12px;border-right:1px solid #999}.quc-mod-qrcode-sign-in .quc-footer .quc-link-sign-up{border-right:0}.quc-mod-sign-in .quc-footer .quc-link-about{margin-right:-24px}.quc-mod-normal-sign-in .quc-footer .quc-link-about-normal{margin-right:0}.quc-mod-quick-sign-in .quc-footer .quc-link,.quc-mod-sign-in .quc-footer .quc-link-about,.quc-mod-sign-in .quc-footer .quc-link-normal-sign-in{display:none;border:none}.quc-mod-mobile-sign-in .quc-footer .quc-link-about-mobile,.quc-mod-normal-sign-in .quc-footer .quc-link-about-normal,.quc-mod-onekey-sign-in .quc-footer .quc-link-about-onekey,.quc-mod-quick-sign-in .quc-footer .quc-link-normal-sign-in{display:inline-block}.quc-wrapper .quc-mod-set-sec-email{padding:0 40px 30px}.quc-mod-set-sec-email .quc-tip{padding:15px 0 2px 75px;height:14px;line-height:14px}.quc-mod-set-sec-email .quc-form p{padding:5px 0}.quc-mod-set-sec-email .quc-label{display:inline-block;width:60px;height:41px;line-height:41px;color:#333;font-size:14px;padding-right:10px;text-align:right}.quc-mod-set-sec-email .quc-button-submit{font-size:14px;color:#fff;margin-left:73px}.quc-mod-sign-up .quc-left-bar{float:left;width:143px;background-color:#fbfefe}.quc-mod-sign-up .quc-left-bar .quc-sign-up-type{margin-top:20px;border-top:1px solid #e4ebec}.quc-mod-sign-up .quc-left-bar .quc-sign-up-type li{border-bottom:1px solid #e4ebec;font-size:16px;line-height:50px;*zoom:1}.quc-mod-sign-up .quc-left-bar .quc-sign-up-type li a{display:block;width:126px;height:50px;padding-left:17px;_padding-top:11px;_height:39px;color:#666;text-decoration:none}.quc-mod-sign-up .quc-left-bar .quc-sign-up-type li.quc-current{position:relative;top:-1px;height:52px;width:156px;_margin-right:-13px;background-position:-240px -280px;border:none}.quc-mod-sign-up .quc-left-bar .quc-sign-up-type .quc-current a{color:#fff;border:1px solid #88cde2;border-right:none;cursor:default;background:#a7deef;padding-left:16px;-webkit-box-shadow:inset 0 1px hsla(0,0%,100%,.35);-moz-box-shadow:inset 0 1px hsla(0,0%,100%,.35);box-shadow:inset 0 1px hsla(0,0%,100%,.35)}.quc-mod-sign-up .quc-left-bar .quc-icon{display:inline-block;width:20px;height:26px;margin:0 10px 4px 0;vertical-align:middle}.quc-mod-sign-up .quc-left-bar .quc-icon-email{background-position:-440px -490px}.quc-mod-sign-up .quc-left-bar .quc-icon-mobile{background-position:-440px -516px}.quc-mod-sign-up .quc-left-bar .quc-icon-username{background-position:-440px -542px}.quc-mod-sign-up .quc-left-bar .quc-current .quc-icon-email{background-position:-440px -410px}.quc-mod-sign-up .quc-left-bar .quc-current .quc-icon-mobile{background-position:-440px -436px}.quc-mod-sign-up .quc-left-bar .quc-current .quc-icon-username{background-position:-440px -462px}.quc-mod-sign-up .quc-main{float:left;width:380px;padding:0 0 20px 20px;border-left:1px solid #e4ebec;background:#fff;-webkit-box-shadow:-7px 0 5px -3px #f8f9f9;-moz-box-shadow:-7px 0 5px -3px #f8f9f9;box-shadow:-7px 0 5px -3px #f8f9f9}.quc-mod-sign-up .quc-main .quc-label{display:inline-block;width:60px;margin-right:10px;line-height:31px;font-size:14px;text-align:right;color:#333}.quc-mod-sign-up .quc-tip-wrapper{height:21px;line-height:21px;padding:3px 0 0 75px}.quc-mod-sign-up .quc-tip-wrapper .quc-tip{display:none}.quc-mod-sign-up .quc-field{color:#959393}.quc-mod-sign-up .quc-field .quc-input-bg{margin:3px 0 4px}.quc-mod-sign-up .quc-field .quc-tip-icon{visibility:hidden}.quc-mod-sign-up .quc-field .quc-tip-icon-correct,.quc-mod-sign-up .quc-field .quc-tip-icon-incorrect{visibility:visible}.quc-mod-sign-up .quc-field .quc-tip{margin-left:75px;line-height:1;*line-height:14px}.quc-mod-sign-up .quc-field-sms-token .quc-mobile-tip{float:right;margin-right:50px}.quc-mod-sign-up .quc-field-sms-token .quc-tip{*float:left}.quc-mod-sign-up .quc-field-mobile .quc-button{margin:0 4px 1px 1px}.quc-mod-sign-up .quc-field-captcha{display:none}.quc-mod-sign-up .quc-captcha-img{width:99px;height:36px;margin:3px 0 4px 2px;vertical-align:middle}.quc-mod-sign-up .quc-link-captcha-change{margin-left:10px}.quc-mod-sign-up .quc-captcha-change{cursor:pointer}.quc-mod-sign-up .quc-button-sign-up{margin:12px 0 0 74px}.quc-mod-sign-up .quc-field-licence{margin:9px 0 0 75px;line-height:18px}.quc-mod-sign-up .quc-field-licence label span{vertical-align:middle}.quc-mod-sign-up .quc-login{position:relative;width:120px;margin:-18px 0 0 -145px;line-height:18px}.quc-wrapper .quc-mod-bind-mobile{padding:2px 20px 20px 30px;width:380px}.quc-mod-bind-mobile .quc-tip-wrapper{height:21px;line-height:21px;padding:3px 0 0 75px}.quc-mod-bind-mobile .quc-field-mobile .quc-input-bg{width:267px;height:41px;background-position:-4px -622px}.quc-mod-bind-mobile .quc-field-mobile .quc-input-bg-focus{background-position:77px -666px}.quc-mod-bind-mobile .quc-field-mobile .quc-input-bg-incorrect{background-position:77px -709px}.quc-mod-bind-mobile .quc-field-mobile .quc-input-bg .quc-input{margin-left:85px;margin-top:3px;width:160px;height:20px}.quc-mod-bind-mobile .quc-label{display:inline-block;width:60px;margin-right:10px;line-height:31px;font-size:14px;text-align:right;color:#333}.quc-mod-bind-mobile .quc-field .quc-button-blue{margin:0 4px 1px 1px}.quc-mod-bind-mobile .quc-field-mobile{position:relative;z-index:130300}.quc-mod-bind-mobile .quc-field-sms-token .quc-link-mobile-tip{float:right;margin-right:50px}.quc-mod-bind-mobile .quc-field .quc-input-bg{margin:3px 0 4px 72px;*margin-top:4px}.quc-mod-bind-mobile .quc-field-sms-token .quc-input-bg{margin:3px 0 4px 71px}.quc-mod-bind-mobile .quc-field .quc-tip-icon{visibility:hidden}.quc-mod-bind-mobile .quc-field .quc-tip-icon-correct,.quc-mod-bind-mobile .quc-field .quc-tip-icon-incorrect{visibility:visible}.quc-mod-bind-mobile .quc-field .quc-tip{display:inline-block;*display:inline;*zoom:1;margin-left:75px;height:16px;width:250px;line-height:16px;overflow:hidden}.quc-mod-bind-mobile .quc-button-submit{margin:10px 0 0 74px}.quc-mod-bind-mobile .quc-state-wrapper{position:absolute;top:3px;*top:4px;left:72px;width:77px;height:40px;background-position:0 -622px}.quc-mod-bind-mobile .quc-state-wrapper .quc-area-arrow{position:absolute;cursor:pointer;top:16px;right:8px;width:7px;height:6px;background-position:-273px -622px}.quc-mod-bind-mobile .quc-state-wrapper .quc-activeState{display:inline-block;*display:inline;*zoom:1;color:grey;width:77px;height:40px;line-height:40px;font-size:16px;text-align:center;cursor:pointer}.quc-mod-bind-mobile .quc-mobile-Statelist{display:none;position:absolute;background:#fff;border:1px solid #d8d8d8;width:259px;height:150px;overflow-y:auto;overflow-x:hidden;top:41px;left:75px}.quc-mod-bind-mobile .quc-mobile-Statelist .quc-list-item{height:30px;line-height:30px;font-size:14px;color:grey}.quc-wrapper .quc-mod-fill-profile{width:380px;padding:0 0 20px 30px;background:#fff}.quc-mod-fill-profile .quc-label{display:inline-block;width:60px;margin-right:10px;line-height:31px;font-size:14px;color:#333;text-align:right}.quc-mod-fill-profile .quc-tip-wrapper{height:21px;line-height:21px;padding:3px 0 0 75px}.quc-mod-fill-profile .quc-tip-wrapper .quc-tip{display:none}.quc-mod-fill-profile .quc-field{color:#959393}.quc-mod-fill-profile .quc-field .quc-input-bg{margin:3px 0 4px;*margin-top:4px}.quc-mod-fill-profile .quc-field .quc-tip-icon{visibility:hidden}.quc-mod-fill-profile .quc-field .quc-tip-icon-correct,.quc-mod-fill-profile .quc-field .quc-tip-icon-incorrect{visibility:visible}.quc-mod-fill-profile .quc-captcha-img{width:99px;height:36px;margin:3px 0 4px 2px;vertical-align:middle}.quc-mod-fill-profile .quc-captcha-change{cursor:pointer}.quc-mod-fill-profile .quc-link-captcha-change{margin-left:6px}.quc-mod-fill-profile .quc-field .quc-tip{margin-left:75px;line-height:1}.quc-mod-fill-profile .quc-button-submit{margin:12px 0 0 74px}.quc-mod-fill-profile .quc-go-signIn{display:block;cursor:pointer;margin:10px 0 0;text-align:right}.quc-mod-fill-profile .quc-state-wrapper{position:absolute;top:3px;*top:4px;left:70px;width:77px;height:40px;background-position:0 -622px}.quc-mod-fill-profile .quc-state-wrapper .quc-area-arrow{position:absolute;cursor:pointer;top:16px;right:8px;width:7px;height:6px;background-position:-273px -622px}.quc-mod-fill-profile .quc-state-wrapper .quc-activeState{display:inline-block;*display:inline;*zoom:1;color:grey;width:77px;height:40px;line-height:40px;font-size:16px;text-align:center;cursor:pointer}.quc-mod-fill-profile .quc-mobile-Statelist{display:none;position:absolute;background:#fff;border:1px solid #d8d8d8;width:259px;height:150px;overflow:scroll;overflow-x:hidden;top:41px;left:73px}.quc-mod-fill-profile .quc-mobile-Statelist .quc-list-item{height:30px;line-height:30px;font-size:14px;color:grey}.quc-mobile-Statelist .quc-list-item .quc-left-tip,.quc-mobile-Statelist .quc-list-item .quc-right-tip{display:inline-block;*display:inline;*zoom:1}.quc-mobile-Statelist .quc-list-item .quc-left-tip{width:40px;margin-left:20px}.quc-mobile-Statelist .quc-list-item .quc-right-tip{margin-left:60px}.quc-mod-fill-profile .quc-field-mobile{position:relative;z-index:130300}.quc-mod-fill-profile .quc-field-mobile .quc-input-bg{width:267px;height:41px;background-position:-4px -622px}.quc-mod-fill-profile .quc-field-mobile .quc-input-bg-focus{background-position:77px -666px}.quc-mod-fill-profile .quc-field-mobile .quc-input-bg-incorrect{background-position:77px -709px}.quc-mod-fill-profile .quc-field-mobile .quc-input-bg .quc-input{margin-left:85px;margin-top:3px;width:160px;height:20px}.quc-wrapper .quc-mod-identify{width:380px;padding:0 0 10px 30px;color:#959393}.quc-mod-identify .quc-tip-wrapper{height:21px;line-height:21px;margin-top:10px;padding-left:74px}.quc-mod-identify .quc-label{display:inline-block;width:60px;margin-right:10px;line-height:31px;font-size:14px;color:#333;text-align:right}.quc-mod-identify .quc-field{margin-bottom:5px}.quc-mod-identify .quc-input-method,.quc-mod-identify .quc-method-single .quc-method-tip,.quc-mod-identify .quc-method-single .quc-select-method{display:none}.quc-mod-identify .quc-method-single .quc-input-method{display:inline-block;+diaplay:inline;+zoom:1;vertical-align:middle}.quc-mod-identify .quc-field .quc-link{float:right;margin:4px 43px 0}.quc-mod-identify .quc-captcha-img{height:35px;vertical-align:middle;outline:none;cursor:pointer}.quc-mod-identify .quc-field-captcha a.quc-link{margin:0;float:none}.quc-mod-identify .quc-field-captcha,.quc-mod-identify .quc-field-password{display:none}.quc-mod-identify .quc-field-submit{padding-left:75px;margin:10px 0}.quc-wrapper .quc-mod-active-email{padding:20px 40px;color:#a2a2a2;line-height:22px}.quc-mod-active-email .quc-send-result{font-size:14px;color:#000}.quc-mod-active-email .quc-email-address{font-size:16px;line-height:40px;color:#25b311}.quc-mod-active-email .quc-button-blue{margin:10px 10px 10px 0}.quc-mod-active-email .quc-link-jump{font-size:12px;margin-left:20px;display:none}.quc-mod-active-email .quc-resend{margin-top:5px;border-top:1px solid #e9e9e9;padding-top:5px;line-height:20px}.quc-mod-active-email .quc-resend-result{display:none;margin-left:20px;color:#25b311}.quc-mod-active-email .quc-resending{color:#0001b3}.quc-loading{background:url(//p.ssl.qhimg.com/d/quc/loading.gif) no-repeat 50%;left:0;top:0;position:fixed;height:100%;width:100%;overflow:hidden;z-index:120000;zoom:1}.quc-wrapper .quc-mod-modify-password{padding:0 40px 30px}.quc-mod-modify-password .quc-tip{padding:15px 0 2px 75px;height:14px;line-height:14px}.quc-mod-modify-password .quc-form p{padding:5px 0}.quc-mod-modify-password .quc-label{display:inline-block;width:60px;height:41px;line-height:41px;color:#333;font-size:14px;padding-right:10px;text-align:right}.quc-mod-modify-password .quc-button-submit{font-size:14px;color:#fff;margin-left:73px}.quc-new-button{-webkit-appearance:none;white-space:nowrap;text-align:center;outline:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.quc-button,.quc-new-button{outline:none;-webkit-border-radius:3px;-moz-border-radius:3px;border-radius:3px;font-size:16px;line-height:34px;cursor:pointer;text-align:center;background-position:0 0!important;display:inline-block;-webkit-transition:.1s;-o-transition:.1s;-moz-transition:.1s;transition:.1s}.quc-button-default{color:#6fbc44;border:1px solid #6fbc44;background:#fff;width:136px}.quc-button-primary{color:#fff;*background-image:none!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#81cd55),to(#66b33b))!important;background-image:-webkit-linear-gradient(top,#81cd55,#66b33b)!important;background-image:-moz- oldlinear-gradient(top,#81cd55 0,#66b33b 100%)!important;background-image:-o-linear-gradient(top,#81cd55 0,#66b33b 100%)!important;background-image:linear-gradient(180deg,#81cd55 0,#66b33b)!important;background-color:#81cd55!important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#ff81cd55,endColorstr=#ff66b33b,GradientType=0)!important;*-webkit-filter:chroma(color=#000000);*filter:chroma(color=#000000);border:1px solid #6fbc44;width:194px}.quc-button-primary:hover{*background-image:none!important;background-image:-webkit-gradient(linear,left top,left bottom,from(#86de4d),to(#6bcf2b))!important;background-image:-webkit-linear-gradient(top,#86de4d,#6bcf2b)!important;background-image:-moz- oldlinear-gradient(top,#86de4d 0,#6bcf2b 100%)!important;background-image:-o-linear-gradient(top,#86de4d 0,#6bcf2b 100%)!important;background-image:linear-gradient(180deg,#86de4d 0,#6bcf2b)!important;background-color:#86de4d!important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#ff86de4d,endColorstr=#ff6bcf2b,GradientType=0)!important;*-webkit-filter:chroma(color=#000000);*filter:chroma(color=#000000);border:1px solid #6bcf2b}.quc-button-blue{width:120px;font-size:12px;color:#2c7aa6;border:1px solid #a9d5ea;background-color:#def4fc;position:relative;top:1px}.quc-button-blue:hover{color:#4c8eb2;border-color:#bae0ef;background-color:#ecfafd}.quc-button-disabled{cursor:not-allowed!important;background-image:none}.quc-button-disabled,.quc-button-disabled:hover{background-color:#fff;border-color:#e6ebf5;color:#b4bccc}.login-page .quc-button-primary{border-color:#22ac69;background-image:none!important;background-color:#22ac69!important;filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#ff22ac69,endColorstr=#ff22ac69,GradientType=0)!important}.login-page .quc-button-default{border-color:#22ac69;color:#22ac69}';
}]);