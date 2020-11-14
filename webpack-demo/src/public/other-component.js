/*! hello world */
window.other = (function(n) {
  var r = {};
  function o(t) {
    if (r[t]) return r[t].exports;
    var e = (r[t] = { i: t, l: !1, exports: {} });
    return n[t].call(e.exports, e, e.exports, o), (e.l = !0), e.exports;
  }
  return (
    (o.m = n),
    (o.c = r),
    (o.d = function(t, e, n) {
      o.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (o.r = function(t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (o.t = function(e, t) {
      if ((1 & t && (e = o(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var n = Object.create(null);
      if (
        (o.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: e }),
        2 & t && "string" != typeof e)
      )
        for (var r in e)
          o.d(
            n,
            r,
            function(t) {
              return e[t];
            }.bind(null, r)
          );
      return n;
    }),
    (o.n = function(t) {
      var e =
        t && t.__esModule
          ? function() {
              return t.default;
            }
          : function() {
              return t;
            };
      return o.d(e, "a", e), e;
    }),
    (o.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (o.p = ""),
    o((o.s = 13))
  );
})([
  function(t, e, n) {
    t.exports = n(6)(0);
  },
  function(e, t) {
    function n(t) {
      return (
        (e.exports = n = Object.setPrototypeOf
          ? Object.getPrototypeOf
          : function(t) {
              return t.__proto__ || Object.getPrototypeOf(t);
            }),
        n(t)
      );
    }
    e.exports = n;
  },
  function(t, e) {
    t.exports = function(t, e) {
      if (!(t instanceof e))
        throw new TypeError("Cannot call a class as a function");
    };
  },
  function(t, e) {
    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var r = e[n];
        (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          "value" in r && (r.writable = !0),
          Object.defineProperty(t, r.key, r);
      }
    }
    t.exports = function(t, e, n) {
      return e && r(t.prototype, e), n && r(t, n), t;
    };
  },
  function(t, e, n) {
    var r = n(7);
    t.exports = function(t, e) {
      if ("function" != typeof e && null !== e)
        throw new TypeError(
          "Super expression must either be null or a function"
        );
      (t.prototype = Object.create(e && e.prototype, {
        constructor: { value: t, writable: !0, configurable: !0 },
      })),
        e && r(t, e);
    };
  },
  function(t, e, n) {
    var r = n(8),
      o = n(9);
    t.exports = function(t, e) {
      return !e || ("object" !== r(e) && "function" != typeof e) ? o(t) : e;
    };
  },
  function(t, e) {
    t.exports = _dll_vendor;
  },
  function(n, t) {
    function r(t, e) {
      return (
        (n.exports = r =
          Object.setPrototypeOf ||
          function(t, e) {
            return (t.__proto__ = e), t;
          }),
        r(t, e)
      );
    }
    n.exports = r;
  },
  function(e, t) {
    function n(t) {
      return (
        "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
          ? (e.exports = n = function(t) {
              return typeof t;
            })
          : (e.exports = n = function(t) {
              return t &&
                "function" == typeof Symbol &&
                t.constructor === Symbol &&
                t !== Symbol.prototype
                ? "symbol"
                : typeof t;
            }),
        n(t)
      );
    }
    e.exports = n;
  },
  function(t, e) {
    t.exports = function(t) {
      if (void 0 === t)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return t;
    };
  },
  ,
  ,
  ,
  function(t, e, n) {
    "use strict";
    n.r(e);
    var r = n(2),
      o = n.n(r),
      r = n(3),
      u = n.n(r),
      r = n(4),
      c = n.n(r),
      r = n(5),
      i = n.n(r),
      r = n(1),
      f = n.n(r),
      r = n(0),
      a = n.n(r);
    function l(n) {
      var r = (function() {
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
        } catch (t) {
          return !1;
        }
      })();
      return function() {
        var t,
          e = f()(n);
        return (
          (e = r
            ? ((t = f()(this).constructor), Reflect.construct(e, arguments, t))
            : e.apply(this, arguments)),
          i()(this, e)
        );
      };
    }
    r = (function(t) {
      c()(n, t);
      var e = l(n);
      function n(t) {
        return (
          o()(this, n),
          ((t = e.call(this, t)).state = { params: { age: 12 } }),
          t
        );
      }
      return (
        u()(n, [
          {
            key: "render",
            value: function() {
              var t = this,
                e = this.props,
                n = e.num,
                r = e.emitFn;
              return a.a.createElement(
                "div",
                null,
                a.a.createElement(
                  "div",
                  null,
                  a.a.createElement("h1", null, "other"),
                  a.a.createElement("span", null, n),
                  a.a.createElement(
                    "button",
                    {
                      onClick: function() {
                        return r(t.state.params, n);
                      },
                    },
                    "点击"
                  )
                )
              );
            },
          },
        ]),
        n
      );
    })(a.a.Component);
    (r.defaultProps = { num: -1, emitFn: function() {} }), (e.default = r);
  },
]);
