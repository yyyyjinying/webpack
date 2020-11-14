/* eslint-disable */
/*! hello world */
window.other = (function(r) {
  var n = {};
  function o(e) {
    if (n[e]) return n[e].exports;
    var t = (n[e] = { i: e, l: !1, exports: {} });
    return r[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
  }
  return (
    (o.m = r),
    (o.c = n),
    (o.d = function(e, t, r) {
      o.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (o.r = function(e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (o.t = function(t, e) {
      if ((1 & e && (t = o(t)), 8 & e)) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (
        (o.r(r),
        Object.defineProperty(r, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var n in t)
          o.d(
            r,
            n,
            function(e) {
              return t[e];
            }.bind(null, n)
          );
      return r;
    }),
    (o.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return o.d(t, "a", t), t;
    }),
    (o.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (o.p = ""),
    o((o.s = 19))
  );
})([
  function(e, t, r) {
    "use strict";
    e.exports = r(3);
  },
  function(e, t, r) {
    "use strict";
    /*
object-assign
(c) Sindre Sorhus
@license MIT
*/ var i =
        Object.getOwnPropertySymbols,
      l = Object.prototype.hasOwnProperty,
      a = Object.prototype.propertyIsEnumerable;
    e.exports = (function() {
      try {
        if (!Object.assign) return;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0])) return;
        for (var t = {}, r = 0; r < 10; r++)
          t["_" + String.fromCharCode(r)] = r;
        if (
          "0123456789" !==
          Object.getOwnPropertyNames(t)
            .map(function(e) {
              return t[e];
            })
            .join("")
        )
          return;
        var n = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function(e) {
            n[e] = e;
          }),
          "abcdefghijklmnopqrst" !== Object.keys(Object.assign({}, n)).join("")
            ? void 0
            : 1
        );
      } catch (e) {
        return;
      }
    })()
      ? Object.assign
      : function(e, t) {
          for (
            var r,
              n,
              o = (function(e) {
                if (null == e)
                  throw new TypeError(
                    "Object.assign cannot be called with null or undefined"
                  );
                return Object(e);
              })(e),
              u = 1;
            u < arguments.length;
            u++
          ) {
            for (var c in (r = Object(arguments[u])))
              l.call(r, c) && (o[c] = r[c]);
            if (i) {
              n = i(r);
              for (var f = 0; f < n.length; f++)
                a.call(r, n[f]) && (o[n[f]] = r[n[f]]);
            }
          }
          return o;
        };
  },
  function(t, e) {
    function r(e) {
      return (
        (t.exports = r = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(e) {
              return e.__proto__ || Object.getPrototypeOf(e);
            }),
        r(e)
      );
    }
    t.exports = r;
  },
  function(e, t, r) {
    "use strict";
    /** @license React v16.14.0
     * react.production.min.js
     *
     * Copyright (c) Facebook, Inc. and its affiliates.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */ var a = r(1),
      n = "function" == typeof Symbol && Symbol.for,
      s = n ? Symbol.for("react.element") : 60103,
      l = n ? Symbol.for("react.portal") : 60106,
      o = n ? Symbol.for("react.fragment") : 60107,
      u = n ? Symbol.for("react.strict_mode") : 60108,
      c = n ? Symbol.for("react.profiler") : 60114,
      f = n ? Symbol.for("react.provider") : 60109,
      i = n ? Symbol.for("react.context") : 60110,
      p = n ? Symbol.for("react.forward_ref") : 60112,
      r = n ? Symbol.for("react.suspense") : 60113,
      y = n ? Symbol.for("react.memo") : 60115,
      d = n ? Symbol.for("react.lazy") : 60116,
      b = "function" == typeof Symbol && Symbol.iterator;
    function h(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          r = 1;
        r < arguments.length;
        r++
      )
        t += "&args[]=" + encodeURIComponent(arguments[r]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    var v = {
        isMounted: function() {
          return !1;
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {},
      },
      m = {};
    function g(e, t, r) {
      (this.props = e),
        (this.context = t),
        (this.refs = m),
        (this.updater = r || v);
    }
    function S() {}
    function _(e, t, r) {
      (this.props = e),
        (this.context = t),
        (this.refs = m),
        (this.updater = r || v);
    }
    (g.prototype.isReactComponent = {}),
      (g.prototype.setState = function(e, t) {
        if ("object" != typeof e && "function" != typeof e && null != e)
          throw Error(h(85));
        this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (g.prototype.forceUpdate = function(e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (S.prototype = g.prototype);
    n = _.prototype = new S();
    (n.constructor = _), a(n, g.prototype), (n.isPureReactComponent = !0);
    var O = { current: null },
      j = Object.prototype.hasOwnProperty,
      w = { key: !0, ref: !0, __self: !0, __source: !0 };
    function x(e, t, r) {
      var n,
        o = {},
        u = null,
        c = null;
      if (null != t)
        for (n in (void 0 !== t.ref && (c = t.ref),
        void 0 !== t.key && (u = "" + t.key),
        t))
          j.call(t, n) && !w.hasOwnProperty(n) && (o[n] = t[n]);
      var f = arguments.length - 2;
      if (1 === f) o.children = r;
      else if (1 < f) {
        for (var i = Array(f), l = 0; l < f; l++) i[l] = arguments[l + 2];
        o.children = i;
      }
      if (e && e.defaultProps)
        for (n in (f = e.defaultProps)) void 0 === o[n] && (o[n] = f[n]);
      return {
        $$typeof: s,
        type: e,
        key: u,
        ref: c,
        props: o,
        _owner: O.current,
      };
    }
    function P(e) {
      return "object" == typeof e && null !== e && e.$$typeof === s;
    }
    var k = /\/+/g,
      E = [];
    function R(e, t, r, n) {
      if (E.length) {
        var o = E.pop();
        return (
          (o.result = e),
          (o.keyPrefix = t),
          (o.func = r),
          (o.context = n),
          (o.count = 0),
          o
        );
      }
      return { result: e, keyPrefix: t, func: r, context: n, count: 0 };
    }
    function C(e) {
      (e.result = null),
        (e.keyPrefix = null),
        (e.func = null),
        (e.context = null),
        (e.count = 0),
        E.length < 10 && E.push(e);
    }
    function $(e, t, r) {
      return null == e
        ? 0
        : (function e(t, r, n, o) {
            var u = typeof t;
            ("undefined" !== u && "boolean" !== u) || (t = null);
            var c = !1;
            if (null === t) c = !0;
            else
              switch (u) {
                case "string":
                case "number":
                  c = !0;
                  break;
                case "object":
                  switch (t.$$typeof) {
                    case s:
                    case l:
                      c = !0;
                  }
              }
            if (c) return n(o, t, "" === r ? "." + A(t, 0) : r), 1;
            if (((c = 0), (r = "" === r ? "." : r + ":"), Array.isArray(t)))
              for (var f = 0; f < t.length; f++) {
                var i = r + A((u = t[f]), f);
                c += e(u, i, n, o);
              }
            else if (
              "function" ==
              typeof (i =
                null !== t &&
                "object" == typeof t &&
                "function" == typeof (i = (b && t[b]) || t["@@iterator"])
                  ? i
                  : null)
            )
              for (t = i.call(t), f = 0; !(u = t.next()).done; )
                c += e((u = u.value), (i = r + A(u, f++)), n, o);
            else if ("object" === u)
              throw ((n = "" + t),
              Error(
                h(
                  31,
                  "[object Object]" === n
                    ? "object with keys {" + Object.keys(t).join(", ") + "}"
                    : n,
                  ""
                )
              ));
            return c;
          })(e, "", t, r);
    }
    function A(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? ((e = e.key),
          (r = { "=": "=0", ":": "=2" }),
          "$" +
            ("" + e).replace(/[=:]/g, function(e) {
              return r[e];
            }))
        : t.toString(36);
      var r;
    }
    function M(e, t) {
      e.func.call(e.context, t, e.count++);
    }
    function I(e, t, r) {
      var n = e.result,
        o = e.keyPrefix;
      (e = e.func.call(e.context, t, e.count++)),
        Array.isArray(e)
          ? T(e, n, r, function(e) {
              return e;
            })
          : null != e &&
            (P(e) &&
              ((r =
                o +
                (!(o = e).key || (t && t.key === e.key)
                  ? ""
                  : ("" + e.key).replace(k, "$&/") + "/") +
                r),
              (e = {
                $$typeof: s,
                type: o.type,
                key: r,
                ref: o.ref,
                props: o.props,
                _owner: o._owner,
              })),
            n.push(e));
    }
    function T(e, t, r, n, o) {
      var u = "";
      null != r && (u = ("" + r).replace(k, "$&/") + "/"),
        $(e, I, (t = R(t, u, n, o))),
        C(t);
    }
    var q = { current: null };
    function U() {
      var e = q.current;
      if (null === e) throw Error(h(321));
      return e;
    }
    n = {
      ReactCurrentDispatcher: q,
      ReactCurrentBatchConfig: { suspense: null },
      ReactCurrentOwner: O,
      IsSomeRendererActing: { current: !1 },
      assign: a,
    };
    (t.Children = {
      map: function(e, t, r) {
        if (null == e) return e;
        var n = [];
        return T(e, n, null, t, r), n;
      },
      forEach: function(e, t, r) {
        if (null == e) return e;
        $(e, M, (t = R(null, null, t, r))), C(t);
      },
      count: function(e) {
        return $(
          e,
          function() {
            return null;
          },
          null
        );
      },
      toArray: function(e) {
        var t = [];
        return (
          T(e, t, null, function(e) {
            return e;
          }),
          t
        );
      },
      only: function(e) {
        if (!P(e)) throw Error(h(143));
        return e;
      },
    }),
      (t.Component = g),
      (t.Fragment = o),
      (t.Profiler = c),
      (t.PureComponent = _),
      (t.StrictMode = u),
      (t.Suspense = r),
      (t.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = n),
      (t.cloneElement = function(e, t, r) {
        if (null == e) throw Error(h(267, e));
        var n,
          o = a({}, e.props),
          u = e.key,
          c = e.ref,
          f = e._owner;
        if (null != t)
          for (i in (void 0 !== t.ref && ((c = t.ref), (f = O.current)),
          void 0 !== t.key && (u = "" + t.key),
          e.type && e.type.defaultProps && (n = e.type.defaultProps),
          t))
            j.call(t, i) &&
              !w.hasOwnProperty(i) &&
              (o[i] = (void 0 === t[i] && void 0 !== n ? n : t)[i]);
        var i = arguments.length - 2;
        if (1 === i) o.children = r;
        else if (1 < i) {
          n = Array(i);
          for (var l = 0; l < i; l++) n[l] = arguments[l + 2];
          o.children = n;
        }
        return {
          $$typeof: s,
          type: e.type,
          key: u,
          ref: c,
          props: o,
          _owner: f,
        };
      }),
      (t.createContext = function(e, t) {
        return (
          void 0 === t && (t = null),
          ((e = {
            $$typeof: i,
            _calculateChangedBits: t,
            _currentValue: e,
            _currentValue2: e,
            _threadCount: 0,
            Provider: null,
            Consumer: null,
          }).Provider = { $$typeof: f, _context: e }),
          (e.Consumer = e)
        );
      }),
      (t.createElement = x),
      (t.createFactory = function(e) {
        var t = x.bind(null, e);
        return (t.type = e), t;
      }),
      (t.createRef = function() {
        return { current: null };
      }),
      (t.forwardRef = function(e) {
        return { $$typeof: p, render: e };
      }),
      (t.isValidElement = P),
      (t.lazy = function(e) {
        return { $$typeof: d, _ctor: e, _status: -1, _result: null };
      }),
      (t.memo = function(e, t) {
        return { $$typeof: y, type: e, compare: void 0 === t ? null : t };
      }),
      (t.useCallback = function(e, t) {
        return U().useCallback(e, t);
      }),
      (t.useContext = function(e, t) {
        return U().useContext(e, t);
      }),
      (t.useDebugValue = function() {}),
      (t.useEffect = function(e, t) {
        return U().useEffect(e, t);
      }),
      (t.useImperativeHandle = function(e, t, r) {
        return U().useImperativeHandle(e, t, r);
      }),
      (t.useLayoutEffect = function(e, t) {
        return U().useLayoutEffect(e, t);
      }),
      (t.useMemo = function(e, t) {
        return U().useMemo(e, t);
      }),
      (t.useReducer = function(e, t, r) {
        return U().useReducer(e, t, r);
      }),
      (t.useRef = function(e) {
        return U().useRef(e);
      }),
      (t.useState = function(e) {
        return U().useState(e);
      }),
      (t.version = "16.14.0");
  },
  function(e, t) {
    e.exports = function(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    };
  },
  function(e, t) {
    function n(e, t) {
      for (var r = 0; r < t.length; r++) {
        var n = t[r];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(e, n.key, n);
      }
    }
    e.exports = function(e, t, r) {
      return t && n(e.prototype, t), r && n(e, r), e;
    };
  },
  function(e, t, r) {
    var n = r(12);
    e.exports = function(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: { value: e, writable: !0, configurable: !0 },
      })),
        t && n(e, t);
    };
  },
  function(e, t, r) {
    var n = r(13),
      o = r(14);
    e.exports = function(e, t) {
      return !t || ("object" !== n(t) && "function" != typeof t) ? o(e) : t;
    };
  },
  ,
  ,
  ,
  ,
  function(r, e) {
    function n(e, t) {
      return (
        (r.exports = n =
          Object.setPrototypeOf ||
          function(e, t) {
            return (e.__proto__ = t), e;
          }),
        n(e, t)
      );
    }
    r.exports = n;
  },
  function(t, e) {
    function r(e) {
      return (
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? (t.exports = r = function(e) {
              return typeof e;
            })
          : (t.exports = r = function(e) {
              return e &&
                "function" == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? "symbol"
                : typeof e;
            }),
        r(e)
      );
    }
    t.exports = r;
  },
  function(e, t) {
    e.exports = function(e) {
      if (void 0 === e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return e;
    };
  },
  ,
  ,
  ,
  ,
  function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(4),
      o = r.n(n),
      n = r(5),
      u = r.n(n),
      n = r(6),
      c = r.n(n),
      n = r(7),
      f = r.n(n),
      n = r(2),
      i = r.n(n),
      n = r(0),
      l = r.n(n);
    function a(r) {
      var n = (function() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
          return (
            Date.prototype.toString.call(
              Reflect.construct(Date, [], function() {})
            ),
            !0
          );
        } catch (e) {
          return !1;
        }
      })();
      return function() {
        var e,
          t = i()(r);
        return (
          (t = n
            ? ((e = i()(this).constructor), Reflect.construct(t, arguments, e))
            : t.apply(this, arguments)),
          f()(this, t)
        );
      };
    }
    n = (function(e) {
      c()(r, e);
      var t = a(r);
      function r() {
        return o()(this, r), t.apply(this, arguments);
      }
      return (
        u()(r, [
          {
            key: "render",
            value: function() {
              return l.a.createElement(
                "div",
                null,
                l.a.createElement(
                  "div",
                  null,
                  l.a.createElement("h1", null, "other")
                )
              );
            },
          },
        ]),
        r
      );
    })(l.a.Component);
    t.default = n;
  },
]);
