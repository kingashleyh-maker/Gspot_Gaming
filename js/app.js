/* G Spot kiosk application and bundled third-party runtime.
 * Formatted from the supplied compiled HTML; original component sources are not included.
 * Images are in assets/images. Retain the bundled license notices.
 */
(() => {
  var bO = Object.create;
  var gq = Object.defineProperty;
  var OO = Object.getOwnPropertyDescriptor;
  var VO = Object.getOwnPropertyNames;
  var HO = Object.getPrototypeOf,
    EO = Object.prototype.hasOwnProperty;
  var z = (A, t, a) => () => {
    if (a) throw a[0];
    try {
      return A && (t = A(A = 0)), t
    } catch (c) {
      throw a = [c], c
    }
  };
  var xt = (A, t) => () => {
    try {
      return t || A((t = {
        exports: {}
      }).exports, t), t.exports
    } catch (a) {
      throw t = 0, a
    }
  };
  var SO = (A, t, a, c) => {
    if (t && typeof t == "object" || typeof t == "function")
      for (let u of VO(t)) !EO.call(A, u) && u !== a && gq(A, u, {
        get: () => t[u],
        enumerable: !(c = OO(t, u)) || c.enumerable
      });
    return A
  };
  var GA = (A, t, a) => (a = A != null ? bO(HO(A)) : {}, SO(t || !A || !A.__esModule ? gq(a,
    "default", {
      value: A,
      enumerable: !0
    }) : a, A));
  var _q = xt(lA => {
    "use strict";

    function Pi(A, t) {
      var a = A.length;
      A.push(t);
      A: for (; 0 < a;) {
        var c = a - 1 >>> 1,
          u = A[c];
        if (0 < fe(u, t)) A[c] = t, A[a] = u, a = c;
        else break A
      }
    }

    function Tt(A) {
      return A.length === 0 ? null : A[0]
    }

    function Ke(A) {
      if (A.length === 0) return null;
      var t = A[0],
        a = A.pop();
      if (a !== t) {
        A[0] = a;
        A: for (var c = 0, u = A.length, e = u >>> 1; c < e;) {
          var l = 2 * (c + 1) - 1,
            n = A[l],
            r = l + 1,
            I = A[r];
          if (0 > fe(n, a)) r < u && 0 > fe(I, n) ? (A[c] = I, A[r] = a, c = r) : (A[c] = n,
            A[l] = a, c = l);
          else if (r < u && 0 > fe(I, a)) A[c] = I, A[r] = a, c = r;
          else break A
        }
      }
      return t
    }

    function fe(A, t) {
      var a = A.sortIndex - t.sortIndex;
      return a !== 0 ? a : A.id - t.id
    }
    lA.unstable_now = void 0;
    typeof performance == "object" && typeof performance.now == "function" ? (Jq =
      performance, lA.unstable_now = function() {
        return Jq.now()
      }) : (si = Date, Qq = si.now(), lA.unstable_now = function() {
      return si.now() - Qq
    });
    var Jq, si, Qq, Ct = [],
      da = [],
      NO = 1,
      Rt = null,
      XA = 3,
      ki = !1,
      Nu = !1,
      xu = !1,
      Wi = !1,
      vq = typeof setTimeout == "function" ? setTimeout : null,
      Cq = typeof clearTimeout == "function" ? clearTimeout : null,
      Bq = typeof setImmediate < "u" ? setImmediate : null;

    function ze(A) {
      for (var t = Tt(da); t !== null;) {
        if (t.callback === null) Ke(da);
        else if (t.startTime <= A) Ke(da), t.sortIndex = t.expirationTime, Pi(Ct, t);
        else break;
        t = Tt(da)
      }
    }

    function Ti(A) {
      if (xu = !1, ze(A), !Nu)
        if (Tt(Ct) !== null) Nu = !0, Nc || (Nc = !0, Sc());
        else {
          var t = Tt(da);
          t !== null && mi(Ti, t.startTime - A)
        }
    }
    var Nc = !1,
      ou = -1,
      Mq = 5,
      Fq = -1;

    function Yq() {
      return Wi ? !0 : !(lA.unstable_now() - Fq < Mq)
    }

    function Ui() {
      if (Wi = !1, Nc) {
        var A = lA.unstable_now();
        Fq = A;
        var t = !0;
        try {
          A: {
            Nu = !1,
            xu && (xu = !1, Cq(ou), ou = -1),
            ki = !0;
            var a = XA;
            try {
              t: {
                for (ze(A), Rt = Tt(Ct); Rt !== null && !(Rt.expirationTime > A && Yq());) {
                  var c = Rt.callback;
                  if (typeof c == "function") {
                    Rt.callback = null, XA = Rt.priorityLevel;
                    var u = c(Rt.expirationTime <= A);
                    if (A = lA.unstable_now(), typeof u == "function") {
                      Rt.callback = u, ze(A), t = !0;
                      break t
                    }
                    Rt === Tt(Ct) && Ke(Ct), ze(A)
                  } else Ke(Ct);
                  Rt = Tt(Ct)
                }
                if (Rt !== null) t = !0;
                else {
                  var e = Tt(da);
                  e !== null && mi(Ti, e.startTime - A), t = !1
                }
              }
              break A
            }
            finally {
              Rt = null, XA = a, ki = !1
            }
            t = void 0
          }
        }
        finally {
          t ? Sc() : Nc = !1
        }
      }
    }
    var Sc;
    typeof Bq == "function" ? Sc = function() {
      Bq(Ui)
    } : typeof MessageChannel < "u" ? (yi = new MessageChannel, hq = yi.port2, yi.port1
      .onmessage = Ui, Sc = function() {
        hq.postMessage(null)
      }) : Sc = function() {
      vq(Ui, 0)
    };
    var yi, hq;

    function mi(A, t) {
      ou = vq(function() {
        A(lA.unstable_now())
      }, t)
    }
    lA.unstable_IdlePriority = 5;
    lA.unstable_ImmediatePriority = 1;
    lA.unstable_LowPriority = 4;
    lA.unstable_NormalPriority = 3;
    lA.unstable_Profiling = null;
    lA.unstable_UserBlockingPriority = 2;
    lA.unstable_cancelCallback = function(A) {
      A.callback = null
    };
    lA.unstable_forceFrameRate = function(A) {
      0 > A || 125 < A ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
        ) : Mq = 0 < A ? Math.floor(1e3 / A) : 5
    };
    lA.unstable_getCurrentPriorityLevel = function() {
      return XA
    };
    lA.unstable_next = function(A) {
      switch (XA) {
        case 1:
        case 2:
        case 3:
          var t = 3;
          break;
        default:
          t = XA
      }
      var a = XA;
      XA = t;
      try {
        return A()
      } finally {
        XA = a
      }
    };
    lA.unstable_requestPaint = function() {
      Wi = !0
    };
    lA.unstable_runWithPriority = function(A, t) {
      switch (A) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          A = 3
      }
      var a = XA;
      XA = A;
      try {
        return t()
      } finally {
        XA = a
      }
    };
    lA.unstable_scheduleCallback = function(A, t, a) {
      var c = lA.unstable_now();
      switch (typeof a == "object" && a !== null ? (a = a.delay, a = typeof a == "number" &&
          0 < a ? c + a : c) : a = c, A) {
        case 1:
          var u = -1;
          break;
        case 2:
          u = 250;
          break;
        case 5:
          u = 1073741823;
          break;
        case 4:
          u = 1e4;
          break;
        default:
          u = 5e3
      }
      return u = a + u, A = {
        id: NO++,
        callback: t,
        priorityLevel: A,
        startTime: a,
        expirationTime: u,
        sortIndex: -1
      }, a > c ? (A.sortIndex = a, Pi(da, A), Tt(Ct) === null && A === Tt(da) && (xu ? (
        Cq(ou), ou = -1) : xu = !0, mi(Ti, a - c))) : (A.sortIndex = u, Pi(Ct, A), Nu ||
        ki || (Nu = !0, Nc || (Nc = !0, Sc()))), A
    };
    lA.unstable_shouldYield = Yq;
    lA.unstable_wrapCallback = function(A) {
      var t = XA;
      return function() {
        var a = XA;
        XA = t;
        try {
          return A.apply(this, arguments)
        } finally {
          XA = a
        }
      }
    }
  });
  var Ap = xt((m0, $q) => {
    "use strict";
    $q.exports = _q()
  });
  var rp = xt(K => {
    "use strict";
    var Ki = Symbol.for("react.transitional.element"),
      xO = Symbol.for("react.portal"),
      oO = Symbol.for("react.fragment"),
      sO = Symbol.for("react.strict_mode"),
      UO = Symbol.for("react.profiler"),
      yO = Symbol.for("react.consumer"),
      PO = Symbol.for("react.context"),
      kO = Symbol.for("react.forward_ref"),
      WO = Symbol.for("react.suspense"),
      TO = Symbol.for("react.memo"),
      ep = Symbol.for("react.lazy"),
      mO = Symbol.for("react.activity"),
      fO = Symbol.for("react.view_transition"),
      tp = Symbol.iterator;

    function zO(A) {
      return A === null || typeof A != "object" ? null : (A = tp && A[tp] || A["@@iterator"],
        typeof A == "function" ? A : null)
    }
    var lp = {
        isMounted: function() {
          return !1
        },
        enqueueForceUpdate: function() {},
        enqueueReplaceState: function() {},
        enqueueSetState: function() {}
      },
      ip = Object.assign,
      np = {};

    function oc(A, t, a) {
      this.props = A, this.context = t, this.refs = np, this.updater = a || lp
    }
    oc.prototype.isReactComponent = {};
    oc.prototype.setState = function(A, t) {
      if (typeof A != "object" && typeof A != "function" && A != null) throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, A, t, "setState")
    };
    oc.prototype.forceUpdate = function(A) {
      this.updater.enqueueForceUpdate(this, A, "forceUpdate")
    };

    function Ip() {}
    Ip.prototype = oc.prototype;

    function Gi(A, t, a) {
      this.props = A, this.context = t, this.refs = np, this.updater = a || lp
    }
    var Xi = Gi.prototype = new Ip;
    Xi.constructor = Gi;
    ip(Xi, oc.prototype);
    Xi.isPureReactComponent = !0;
    var ap = Array.isArray;

    function zi() {}
    var aA = {
        H: null,
        A: null,
        T: null,
        S: null
      },
      qp = Object.prototype.hasOwnProperty;

    function Li(A, t, a) {
      var c = a.ref;
      return {
        $$typeof: Ki,
        type: A,
        key: t,
        ref: c !== void 0 ? c : null,
        props: a
      }
    }

    function KO(A, t) {
      return Li(A.type, t, A.props)
    }

    function Zi(A) {
      return typeof A == "object" && A !== null && A.$$typeof === Ki
    }

    function GO(A) {
      var t = {
        "=": "=0",
        ":": "=2"
      };
      return "$" + A.replace(/[=:]/g, function(a) {
        return t[a]
      })
    }
    var cp = /\/+/g;

    function fi(A, t) {
      return typeof A == "object" && A !== null && A.key != null ? GO("" + A.key) : t
        .toString(36)
    }

    function XO(A) {
      switch (A.status) {
        case "fulfilled":
          return A.value;
        case "rejected":
          throw A.reason;
        default:
          switch (typeof A.status == "string" ? A.then(zi, zi) : (A.status = "pending", A
              .then(function(t) {
                A.status === "pending" && (A.status = "fulfilled", A.value = t)
              }, function(t) {
                A.status === "pending" && (A.status = "rejected", A.reason = t)
              })), A.status) {
            case "fulfilled":
              return A.value;
            case "rejected":
              throw A.reason
          }
      }
      throw A
    }

    function xc(A, t, a, c, u) {
      var e = typeof A;
      (e === "undefined" || e === "boolean") && (A = null);
      var l = !1;
      if (A === null) l = !0;
      else switch (e) {
        case "bigint":
        case "string":
        case "number":
          l = !0;
          break;
        case "object":
          switch (A.$$typeof) {
            case Ki:
            case xO:
              l = !0;
              break;
            case ep:
              return l = A._init, xc(l(A._payload), t, a, c, u)
          }
      }
      if (l) return u = u(A), l = c === "" ? "." + fi(A, 0) : c, ap(u) ? (a = "", l != null &&
        (a = l.replace(cp, "$&/") + "/"), xc(u, t, a, "", function(I) {
          return I
        })) : u != null && (Zi(u) && (u = KO(u, a + (u.key == null || A && A.key === u
        .key ? "" : ("" + u.key).replace(cp, "$&/") + "/") + l)), t.push(u)), 1;
      l = 0;
      var n = c === "" ? "." : c + ":";
      if (ap(A))
        for (var r = 0; r < A.length; r++) c = A[r], e = n + fi(c, r), l += xc(c, t, a, e, u);
      else if (r = zO(A), typeof r == "function")
        for (A = r.call(A), r = 0; !(c = A.next()).done;) c = c.value, e = n + fi(c, r++),
          l += xc(c, t, a, e, u);
      else if (e === "object") {
        if (typeof A.then == "function") return xc(XO(A), t, a, c, u);
        throw t = String(A), Error("Objects are not valid as a React child (found: " + (t ===
            "[object Object]" ? "object with keys {" + Object.keys(A).join(", ") + "}" : t
            ) + "). If you meant to render a collection of children, use an array instead.")
      }
      return l
    }

    function Ge(A, t, a) {
      if (A == null) return A;
      var c = [],
        u = 0;
      return xc(A, c, "", "", function(e) {
        return t.call(a, e, u++)
      }), c
    }

    function LO(A) {
      if (A._status === -1) {
        var t = A._result,
          a = t();
        a.then(function(c) {
          (A._status === 0 || A._status === -1) && (A._status = 1, A._result = c, a
            .status === void 0 && (a.status = "fulfilled", a.value = c))
        }, function(c) {
          (A._status === 0 || A._status === -1) && (A._status = 2, A._result = c, a
            .status === void 0 && (a.status = "rejected", a.reason = c))
        }), A._status === -1 && (A._status = 0, A._result = a)
      }
      if (A._status === 1) return A._result.default;
      throw A._result
    }
    var up = typeof reportError == "function" ? reportError : function(A) {
      if (typeof window == "object" && typeof window.ErrorEvent == "function") {
        var t = new window.ErrorEvent("error", {
          bubbles: !0,
          cancelable: !0,
          message: typeof A == "object" && A !== null && typeof A.message == "string" ?
            String(A.message) : String(A),
          error: A
        });
        if (!window.dispatchEvent(t)) return
      } else if (typeof process == "object" && typeof process.emit == "function") {
        process.emit("uncaughtException", A);
        return
      }
      console.error(A)
    };

    function pp(A) {
      var t = aA.T,
        a = {};
      a.types = t !== null ? t.types : null, aA.T = a;
      try {
        var c = A(),
          u = aA.S;
        u !== null && u(a, c), typeof c == "object" && c !== null && typeof c.then ==
          "function" && c.then(zi, up)
      } catch (e) {
        up(e)
      } finally {
        t !== null && a.types !== null && (t.types = a.types), aA.T = t
      }
    }

    function Rp(A) {
      var t = aA.T;
      if (t !== null) {
        var a = t.types;
        a === null ? t.types = [A] : a.indexOf(A) === -1 && a.push(A)
      } else pp(Rp.bind(null, A))
    }
    var ZO = {
      map: Ge,
      forEach: function(A, t, a) {
        Ge(A, function() {
          t.apply(this, arguments)
        }, a)
      },
      count: function(A) {
        var t = 0;
        return Ge(A, function() {
          t++
        }), t
      },
      toArray: function(A) {
        return Ge(A, function(t) {
          return t
        }) || []
      },
      only: function(A) {
        if (!Zi(A)) throw Error(
          "React.Children.only expected to receive a single React element child.");
        return A
      }
    };
    K.Activity = mO;
    K.Children = ZO;
    K.Component = oc;
    K.Fragment = oO;
    K.Profiler = UO;
    K.PureComponent = Gi;
    K.StrictMode = sO;
    K.Suspense = WO;
    K.ViewTransition = fO;
    K.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = aA;
    K.__COMPILER_RUNTIME = {
      __proto__: null,
      c: function(A) {
        return aA.H.useMemoCache(A)
      }
    };
    K.addTransitionType = Rp;
    K.cache = function(A) {
      return function() {
        return A.apply(null, arguments)
      }
    };
    K.cacheSignal = function() {
      return null
    };
    K.cloneElement = function(A, t, a) {
      if (A == null) throw Error("The argument must be a React element, but you passed " +
        A + ".");
      var c = ip({}, A.props),
        u = A.key;
      if (t != null)
        for (e in t.key !== void 0 && (u = "" + t.key), t) !qp.call(t, e) || e === "key" ||
          e === "__self" || e === "__source" || e === "ref" && t.ref === void 0 || (c[e] =
            t[e]);
      var e = arguments.length - 2;
      if (e === 1) c.children = a;
      else if (1 < e) {
        for (var l = Array(e), n = 0; n < e; n++) l[n] = arguments[n + 2];
        c.children = l
      }
      return Li(A.type, u, c)
    };
    K.createContext = function(A) {
      return A = {
        $$typeof: PO,
        _currentValue: A,
        _currentValue2: A,
        _threadCount: 0,
        Provider: null,
        Consumer: null
      }, A.Provider = A, A.Consumer = {
        $$typeof: yO,
        _context: A
      }, A
    };
    K.createElement = function(A, t, a) {
      var c, u = {},
        e = null;
      if (t != null)
        for (c in t.key !== void 0 && (e = "" + t.key), t) qp.call(t, c) && c !== "key" &&
          c !== "__self" && c !== "__source" && (u[c] = t[c]);
      var l = arguments.length - 2;
      if (l === 1) u.children = a;
      else if (1 < l) {
        for (var n = Array(l), r = 0; r < l; r++) n[r] = arguments[r + 2];
        u.children = n
      }
      if (A && A.defaultProps)
        for (c in l = A.defaultProps, l) u[c] === void 0 && (u[c] = l[c]);
      return Li(A, e, u)
    };
    K.createRef = function() {
      return {
        current: null
      }
    };
    K.forwardRef = function(A) {
      return {
        $$typeof: kO,
        render: A
      }
    };
    K.isValidElement = Zi;
    K.lazy = function(A) {
      return {
        $$typeof: ep,
        _payload: {
          _status: -1,
          _result: A
        },
        _init: LO
      }
    };
    K.memo = function(A, t) {
      return {
        $$typeof: TO,
        type: A,
        compare: t === void 0 ? null : t
      }
    };
    K.startTransition = pp;
    K.unstable_useCacheRefresh = function() {
      return aA.H.useCacheRefresh()
    };
    K.use = function(A) {
      return aA.H.use(A)
    };
    K.useActionState = function(A, t, a) {
      return aA.H.useActionState(A, t, a)
    };
    K.useCallback = function(A, t) {
      return aA.H.useCallback(A, t)
    };
    K.useContext = function(A) {
      return aA.H.useContext(A)
    };
    K.useDebugValue = function() {};
    K.useDeferredValue = function(A, t) {
      return aA.H.useDeferredValue(A, t)
    };
    K.useEffect = function(A, t) {
      return aA.H.useEffect(A, t)
    };
    K.useEffectEvent = function(A) {
      return aA.H.useEffectEvent(A)
    };
    K.useId = function() {
      return aA.H.useId()
    };
    K.useImperativeHandle = function(A, t, a) {
      return aA.H.useImperativeHandle(A, t, a)
    };
    K.useInsertionEffect = function(A, t) {
      return aA.H.useInsertionEffect(A, t)
    };
    K.useLayoutEffect = function(A, t) {
      return aA.H.useLayoutEffect(A, t)
    };
    K.useMemo = function(A, t) {
      return aA.H.useMemo(A, t)
    };
    K.useOptimistic = function(A, t) {
      return aA.H.useOptimistic(A, t)
    };
    K.useReducer = function(A, t, a) {
      return aA.H.useReducer(A, t, a)
    };
    K.useRef = function(A) {
      return aA.H.useRef(A)
    };
    K.useState = function(A) {
      return aA.H.useState(A)
    };
    K.useSyncExternalStore = function(A, t, a) {
      return aA.H.useSyncExternalStore(A, t, a)
    };
    K.useTransition = function() {
      return aA.H.useTransition()
    };
    K.version = "19.3.1"
  });
  var ja = xt((z0, dp) => {
    "use strict";
    dp.exports = rp()
  });
  var Op = xt(LA => {
    "use strict";
    var DO = ja();

    function bp(A) {
      var t = "https://react.dev/errors/" + A;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var a = 2; a < arguments.length; a++) t += "&args[]=" + encodeURIComponent(
          arguments[a])
      }
      return "Minified React error #" + A + "; visit " + t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function ba() {}
    var gA = {
        d: {
          f: ba,
          r: function() {
            throw Error(bp(522))
          },
          D: ba,
          C: ba,
          L: ba,
          m: ba,
          X: ba,
          S: ba,
          M: ba
        },
        p: 0,
        findDOMNode: null
      },
      wO = Symbol.for("react.portal"),
      gO = Symbol.for("react.recoverable"),
      jp = Symbol.for("react.optimistic_key");

    function JO(A, t, a) {
      var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
      return {
        $$typeof: wO,
        key: c == null ? null : c === jp ? jp : "" + c,
        children: A,
        containerInfo: t,
        implementation: a
      }
    }
    var su = DO.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;

    function Xe(A, t) {
      if (A === "font") return "";
      if (typeof t == "string") return t === "use-credentials" ? t : ""
    }
    LA.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = gA;
    LA.browser = function(A) {
      return {
        $$typeof: gO,
        _reason: A
      }
    };
    LA.createPortal = function(A, t) {
      var a = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(bp(
        299));
      return JO(A, t, null, a)
    };
    LA.flushSync = function(A) {
      var t = su.T,
        a = gA.p;
      try {
        if (su.T = null, gA.p = 2, A) return A()
      } finally {
        su.T = t, gA.p = a, gA.d.f()
      }
    };
    LA.preconnect = function(A, t) {
      typeof A == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t ===
        "use-credentials" ? t : "" : void 0) : t = null, gA.d.C(A, t))
    };
    LA.prefetchDNS = function(A) {
      typeof A == "string" && gA.d.D(A)
    };
    LA.preinit = function(A, t) {
      if (typeof A == "string" && t && typeof t.as == "string") {
        var a = t.as,
          c = Xe(a, t.crossOrigin),
          u = typeof t.integrity == "string" ? t.integrity : void 0,
          e = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
        a === "style" ? gA.d.S(A, typeof t.precedence == "string" ? t.precedence : void 0, {
          crossOrigin: c,
          integrity: u,
          fetchPriority: e
        }) : a === "script" && gA.d.X(A, {
          crossOrigin: c,
          integrity: u,
          fetchPriority: e,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0
        })
      }
    };
    LA.preinitModule = function(A, t) {
      if (typeof A == "string")
        if (typeof t == "object" && t !== null) {
          if (t.as == null || t.as === "script") {
            var a = Xe(t.as, t.crossOrigin);
            gA.d.M(A, {
              crossOrigin: a,
              integrity: typeof t.integrity == "string" ? t.integrity : void 0,
              nonce: typeof t.nonce == "string" ? t.nonce : void 0,
              fetchPriority: typeof t.fetchPriority == "string" ? t
                .fetchPriority : void 0
            })
          }
        } else t == null && gA.d.M(A)
    };
    LA.preload = function(A, t) {
      if (typeof A == "string" && typeof t == "object" && t !== null && typeof t.as ==
        "string") {
        var a = t.as,
          c = Xe(a, t.crossOrigin);
        gA.d.L(A, a, {
          crossOrigin: c,
          integrity: typeof t.integrity == "string" ? t.integrity : void 0,
          nonce: typeof t.nonce == "string" ? t.nonce : void 0,
          type: typeof t.type == "string" ? t.type : void 0,
          fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
          referrerPolicy: typeof t.referrerPolicy == "string" ? t
            .referrerPolicy : void 0,
          imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
          imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
          media: typeof t.media == "string" ? t.media : void 0
        })
      }
    };
    LA.preloadModule = function(A, t) {
      if (typeof A == "string")
        if (t) {
          var a = Xe(t.as, t.crossOrigin);
          gA.d.m(A, {
            as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
            crossOrigin: a,
            integrity: typeof t.integrity == "string" ? t.integrity : void 0,
            nonce: typeof t.nonce == "string" ? t.nonce : void 0,
            fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0
          })
        } else gA.d.m(A)
    };
    LA.requestFormReset = function(A) {
      gA.d.r(A)
    };
    LA.unstable_batchedUpdates = function(A, t) {
      return A(t)
    };
    LA.useFormState = function(A, t, a) {
      return su.H.useFormState(A, t, a)
    };
    LA.useFormStatus = function() {
      return su.H.useHostTransitionStatus()
    };
    LA.version = "19.3.1"
  });
  var Ep = xt((G0, Hp) => {
    "use strict";

    function Vp() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Vp)
      } catch (A) {
        console.error(A)
      }
    }
    Vp(), Hp.exports = Op()
  });
  var lj = xt(Vi => {
    "use strict";
    var SA = Ap(),
      er = ja(),
      QO = Ep();

    function U(A) {
      var t = "https://react.dev/errors/" + A;
      if (1 < arguments.length) {
        t += "?args[]=" + encodeURIComponent(arguments[1]);
        for (var a = 2; a < arguments.length; a++) t += "&args[]=" + encodeURIComponent(
          arguments[a])
      }
      return "Minified React error #" + A + "; visit " + t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    }

    function lr(A) {
      return !(!A || A.nodeType !== 1 && A.nodeType !== 9 && A.nodeType !== 11)
    }

    function Re(A) {
      for (var t = A, a = t; a && !a.alternate;) t = a, (t.flags & 4098) !== 0 && (A = t
        .return), a = t.return;
      for (; t.return;) t = t.return;
      return t.tag === 3 ? A : null
    }

    function ir(A) {
      if (A.tag === 13) {
        var t = A.memoizedState;
        if (t === null && (A = A.alternate, A !== null && (t = A.memoizedState)), t !== null)
          return t.dehydrated
      }
      return null
    }

    function nr(A) {
      if (A.tag === 31) {
        var t = A.memoizedState;
        if (t === null && (A = A.alternate, A !== null && (t = A.memoizedState)), t !== null)
          return t.dehydrated
      }
      return null
    }

    function Sp(A) {
      if (Re(A) !== A) throw Error(U(188))
    }

    function BO(A) {
      var t = A.alternate;
      if (!t) {
        if (t = Re(A), t === null) throw Error(U(188));
        return t !== A ? null : A
      }
      for (var a = A, c = t;;) {
        var u = a.return;
        if (u === null) break;
        var e = u.alternate;
        if (e === null) {
          if (c = u.return, c !== null) {
            a = c;
            continue
          }
          break
        }
        if (u.child === e.child) {
          for (e = u.child; e;) {
            if (e === a) return Sp(u), A;
            if (e === c) return Sp(u), t;
            e = e.sibling
          }
          throw Error(U(188))
        }
        if (a.return !== c.return) a = u, c = e;
        else {
          for (var l = !1, n = u.child; n;) {
            if (n === a) {
              l = !0, a = u, c = e;
              break
            }
            if (n === c) {
              l = !0, c = u, a = e;
              break
            }
            n = n.sibling
          }
          if (!l) {
            for (n = e.child; n;) {
              if (n === a) {
                l = !0, a = e, c = u;
                break
              }
              if (n === c) {
                l = !0, c = e, a = u;
                break
              }
              n = n.sibling
            }
            if (!l) throw Error(U(189))
          }
        }
        if (a.alternate !== c) throw Error(U(190))
      }
      if (a.tag !== 3) throw Error(U(188));
      return a.stateNode.current === a ? A : t
    }

    function Ir(A) {
      var t = A.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return A;
      for (A = A.child; A !== null;) {
        if (t = Ir(A), t !== null) return t;
        A = A.sibling
      }
      return null
    }

    function _A(A, t, a, c, u, e) {
      for (; A !== null;) {
        if ((A.tag === 5 || A.tag === 27 || A.tag === 6) && a(A, c, u, e) || (A.tag !== 22 ||
            A.memoizedState === null) && (t || A.tag !== 5 && A.tag !== 27) && _A(A.child, t,
            a, c, u, e)) return !0;
        A = A.sibling
      }
      return !1
    }

    function jc(A) {
      for (A = A.return; A !== null;) {
        if (A.tag === 3 || A.tag === 5 || A.tag === 27) return A;
        A = A.return
      }
      return null
    }

    function Np(A) {
      var t = !1;
      for (A = A.return; A !== null && (A.tag === 4 && (t = !0), !(A.tag === 3 || A.tag ===
          5 || A.tag === 27));) A = A.return;
      return t
    }

    function qr(A) {
      var t = [null, null],
        a = jc(A);
      return a === null || pr(t, A, a.child, {
        foundSelf: !1
      }), t
    }

    function pr(A, t, a, c) {
      for (; a !== null;) {
        if (a === t) c.foundSelf = !0;
        else if (a.tag === 5 || a.tag === 27 || a.tag === 6) {
          if (c.foundSelf) return A[1] = a, !0;
          A[0] = a
        } else if ((a.tag !== 22 || a.memoizedState === null) && pr(A, t, a.child, c))
        return !0;
        a = a.sibling
      }
      return !1
    }

    function EA(A) {
      switch (A.tag) {
        case 5:
        case 27:
        case 6:
          return A.stateNode;
        case 3:
          return A.stateNode.containerInfo;
        default:
          throw Error(U(559))
      }
    }
    var Tc = null,
      Vn = null;

    function hO(A, t, a) {
      return A === a ? !0 : A === t ? (Tc = A, !0) : !1
    }

    function vO(A, t, a) {
      return A === a ? (Vn = A, !1) : A === t ? (Vn !== null && (Tc = A), !0) : !1
    }

    function xp(A) {
      if (A === null) return null;
      do A = A === null ? null : A.return; while (A && A.tag !== 5 && A.tag !== 27 && A
        .tag !== 3);
      return A || null
    }

    function Hn(A, t, a) {
      for (var c = 0, u = A; u; u = a(u)) c++;
      u = 0;
      for (var e = t; e; e = a(e)) u++;
      for (; 0 < c - u;) A = a(A), c--;
      for (; 0 < u - c;) t = a(t), u--;
      for (; c--;) {
        if (A === t || t !== null && A === t.alternate) return A;
        A = a(A), t = a(t)
      }
      return null
    }
    var AA = Object.assign,
      CO = Symbol.for("react.element"),
      Le = Symbol.for("react.transitional.element"),
      mu = Symbol.for("react.portal"),
      mc = Symbol.for("react.fragment"),
      Rr = Symbol.for("react.strict_mode"),
      En = Symbol.for("react.profiler"),
      rr = Symbol.for("react.consumer"),
      Xt = Symbol.for("react.context"),
      kI = Symbol.for("react.forward_ref"),
      Sn = Symbol.for("react.suspense"),
      Nn = Symbol.for("react.suspense_list"),
      WI = Symbol.for("react.memo"),
      Ea = Symbol.for("react.lazy"),
      xn = Symbol.for("react.activity"),
      MO = Symbol.for("react.legacy_hidden"),
      FO = Symbol.for("react.memo_cache_sentinel"),
      on = Symbol.for("react.view_transition"),
      YO = Symbol.for("react.recoverable"),
      op = Symbol.iterator;

    function Uu(A) {
      return A === null || typeof A != "object" ? null : (A = op && A[op] || A["@@iterator"],
        typeof A == "function" ? A : null)
    }
    var _O = Symbol.for("react.client.reference");

    function sn(A) {
      if (A == null) return null;
      if (typeof A == "function") return A.$$typeof === _O ? null : A.displayName || A.name ||
        null;
      if (typeof A == "string") return A;
      switch (A) {
        case mc:
          return "Fragment";
        case En:
          return "Profiler";
        case Rr:
          return "StrictMode";
        case Sn:
          return "Suspense";
        case Nn:
          return "SuspenseList";
        case xn:
          return "Activity";
        case on:
          return "ViewTransition"
      }
      if (typeof A == "object") switch (A.$$typeof) {
        case mu:
          return "Portal";
        case Xt:
          return A.displayName || "Context";
        case rr:
          return (A._context.displayName || "Context") + ".Consumer";
        case kI:
          var t = A.render;
          return A = A.displayName, A || (A = t.displayName || t.name || "", A = A !== "" ?
            "ForwardRef(" + A + ")" : "ForwardRef"), A;
        case WI:
          return t = A.displayName || null, t !== null ? t : sn(A.type) || "Memo";
        case Ea:
          t = A._payload, A = A._init;
          try {
            return sn(A(t))
          } catch {}
      }
      return null
    }
    var fu = Array.isArray,
      m = er.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      v = QO.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,
      ac = {
        pending: !1,
        data: null,
        method: null,
        action: null
      },
      Un = [],
      fc = -1;

    function Qt(A) {
      return {
        current: A
      }
    }

    function TA(A) {
      0 > fc || (A.current = Un[fc], Un[fc] = null, fc--)
    }

    function eA(A, t) {
      fc++, Un[fc] = A.current, A.current = t
    }
    var wt = Qt(null),
      Fu = Qt(null),
      ka = Qt(null),
      ol = Qt(null);

    function sl(A, t) {
      switch (eA(ka, t), eA(Fu, A), eA(wt, null), t.nodeType) {
        case 9:
        case 11:
          A = (A = t.documentElement) && (A = A.namespaceURI) ? LR(A) : 0;
          break;
        default:
          if (A = t.tagName, t = t.namespaceURI) t = LR(t), A = K1(t, A);
          else switch (A) {
            case "svg":
              A = 1;
              break;
            case "math":
              A = 2;
              break;
            default:
              A = 0
          }
      }
      TA(wt), eA(wt, A)
    }

    function $c() {
      TA(wt), TA(Fu), TA(ka)
    }

    function yn(A) {
      var t = A.memoizedState;
      t !== null && (Iu._currentValue = t.memoizedState, eA(ol, A)), t = wt.current;
      var a = K1(t, A.type);
      t !== a && (eA(Fu, A), eA(wt, a))
    }

    function Ul(A) {
      Fu.current === A && (TA(wt), TA(Fu)), ol.current === A && (TA(ol), Iu._currentValue =
        ac)
    }
    var Di, sp;

    function Va(A) {
      if (Di === void 0) try {
        throw Error()
      } catch (a) {
        var t = a.stack.trim().match(/\n( *(at )?)/);
        Di = t && t[1] || "", sp = -1 < a.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < a.stack.indexOf("@") ? "@unknown:0:0" : ""
      }
      return `
` + Di + A + sp
    }
    var wi = !1;

    function gi(A, t) {
      if (!A || wi) return "";
      wi = !0;
      var a = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      try {
        var c = {
          DetermineComponentFrameRoot: function() {
            try {
              if (t) {
                var q = function() {
                  throw Error()
                };
                if (Object.defineProperty(q.prototype, "props", {
                    set: function() {
                      throw Error()
                    }
                  }), typeof Reflect == "object" && Reflect.construct) {
                  try {
                    Reflect.construct(q, [])
                  } catch (S) {
                    var R = S
                  }
                  Reflect.construct(A, [], q)
                } else {
                  try {
                    q.call()
                  } catch (S) {
                    R = S
                  }
                  q = !1;
                  try {
                    var d = Object.getOwnPropertyDescriptor(A.prototype, "props");
                    Object.defineProperty(A.prototype, "props", {
                      configurable: !0,
                      set: function() {
                        throw Error()
                      }
                    }), q = !0, new A
                  } finally {
                    q && (d !== void 0 ? Object.defineProperty(A.prototype, "props", d) :
                      delete A.prototype.props)
                  }
                }
              } else {
                try {
                  throw Error()
                } catch (S) {
                  R = S
                }(q = A()) && typeof q.catch == "function" && q.catch(function() {})
              }
            } catch (S) {
              if (S && R && typeof S.stack == "string") return [S.stack, R.stack]
            }
            return [null, null]
          }
        };
        c.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
        var u = Object.getOwnPropertyDescriptor(c.DetermineComponentFrameRoot, "name");
        u && u.configurable && Object.defineProperty(c.DetermineComponentFrameRoot, "name", {
          value: "DetermineComponentFrameRoot"
        });
        var e = c.DetermineComponentFrameRoot(),
          l = e[0],
          n = e[1];
        if (l && n) {
          var r = l.split(`
`),
            I = n.split(`
`);
          for (u = c = 0; c < r.length && !r[c].includes("DetermineComponentFrameRoot");) c++;
          for (; u < I.length && !I[u].includes("DetermineComponentFrameRoot");) u++;
          if (c === r.length || u === I.length)
            for (c = r.length - 1, u = I.length - 1; 1 <= c && 0 <= u && r[c] !== I[u];) u--;
          for (; 1 <= c && 0 <= u; c--, u--)
            if (r[c] !== I[u]) {
              if (c !== 1 || u !== 1)
                do
                  if (c--, u--, 0 > u || r[c] !== I[u]) {
                    var p = `
` + r[c].replace(" at new ", " at ");
                    return A.displayName && p.includes("<anonymous>") && (p = p.replace(
                      "<anonymous>", A.displayName)), p
                  } while (1 <= c && 0 <= u);
              break
            }
        }
      } finally {
        wi = !1, Error.prepareStackTrace = a
      }
      return (a = A ? A.displayName || A.name : "") ? Va(a) : ""
    }

    function $O(A, t) {
      switch (A.tag) {
        case 26:
        case 27:
        case 5:
          return Va(A.type);
        case 16:
          return Va("Lazy");
        case 13:
          return A.child !== t && t !== null ? Va("Suspense Fallback") : Va("Suspense");
        case 19:
          return Va("SuspenseList");
        case 0:
        case 15:
          return gi(A.type, !1);
        case 11:
          return gi(A.type.render, !1);
        case 1:
          return gi(A.type, !0);
        case 31:
          return Va("Activity");
        case 30:
          return Va("ViewTransition");
        default:
          return ""
      }
    }

    function Up(A) {
      try {
        var t = "",
          a = null;
        do t += $O(A, a), a = A, A = A.return; while (A);
        return t
      } catch (c) {
        return `
Error generating stack: ` + c.message + `
` + c.stack
      }
    }
    var Pn = Object.prototype.hasOwnProperty,
      TI = SA.unstable_scheduleCallback,
      Ji = SA.unstable_cancelCallback,
      AV = SA.unstable_shouldYield,
      tV = SA.unstable_requestPaint,
      lt = SA.unstable_now,
      aV = SA.unstable_getCurrentPriorityLevel,
      dr = SA.unstable_ImmediatePriority,
      jr = SA.unstable_UserBlockingPriority,
      yl = SA.unstable_NormalPriority,
      cV = SA.unstable_LowPriority,
      br = SA.unstable_IdlePriority,
      uV = SA.log,
      eV = SA.unstable_setDisableYieldValue,
      re = null,
      it = null;

    function xa(A) {
      if (typeof uV == "function" && eV(A), it && typeof it.setStrictMode == "function") try {
        it.setStrictMode(re, A)
      } catch {}
    }
    var nt = Math.clz32 ? Math.clz32 : nV,
      lV = Math.log,
      iV = Math.LN2;

    function nV(A) {
      return A >>>= 0, A === 0 ? 32 : 31 - (lV(A) / iV | 0) | 0
    }
    var Ze = 256,
      De = 262144,
      we = 4194304;

    function Ya(A) {
      var t = A & 42;
      if (t !== 0) return t;
      switch (A & -A) {
        case 1:
          return 1;
        case 2:
          return 2;
        case 4:
          return 4;
        case 8:
          return 8;
        case 16:
          return 16;
        case 32:
          return 32;
        case 64:
          return 64;
        case 128:
          return 128;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
          return A & -A;
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return A & 3932160;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return A & 62914560;
        case 67108864:
          return 67108864;
        case 134217728:
          return 134217728;
        case 268435456:
          return 268435456;
        case 536870912:
          return 536870912;
        case 1073741824:
          return 0;
        default:
          return A
      }
    }

    function $l(A, t, a) {
      var c = A.pendingLanes;
      if (c === 0) return 0;
      var u = 0,
        e = A.suspendedLanes,
        l = A.pingedLanes;
      A = A.warmLanes;
      var n = c & 134217727;
      return n !== 0 ? (c = n & ~e, c !== 0 ? u = Ya(c) : (l &= n, l !== 0 ? u = Ya(l) : a ||
          (a = n & ~A, a !== 0 && (u = Ya(a))))) : (n = c & ~e, n !== 0 ? u = Ya(n) : l !==
          0 ? u = Ya(l) : a || (a = c & ~A, a !== 0 && (u = Ya(a)))), u === 0 ? 0 : t !== 0 &&
        t !== u && (t & e) === 0 && (e = u & -u, a = t & -t, e >= a || e === 32 && (a &
          4194048) !== 0) ? t : u
    }

    function de(A, t) {
      return (A.pendingLanes & ~(A.suspendedLanes & ~A.pingedLanes) & t) === 0
    }

    function Or(A, t) {
      (t & 8) !== 0 && (t |= t & 32);
      var a = A.entangledLanes;
      if (a !== 0)
        for (A = A.entanglements, a &= t; 0 < a;) {
          var c = 31 - nt(a),
            u = 1 << c;
          t |= A[c], a &= ~u
        }
      return t
    }

    function IV(A, t) {
      switch (A) {
        case 1:
        case 2:
        case 4:
        case 8:
        case 64:
          return t + 250;
        case 16:
        case 32:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
          return t + 5e3;
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          return -1;
        case 67108864:
        case 134217728:
        case 268435456:
        case 536870912:
        case 1073741824:
          return -1;
        default:
          return -1
      }
    }

    function Vr() {
      var A = we;
      return we <<= 1, (we & 62914560) === 0 && (we = 4194304), A
    }

    function Qi(A) {
      for (var t = [], a = 0; 31 > a; a++) t.push(A);
      return t
    }

    function je(A, t) {
      A.pendingLanes |= t, t !== 268435456 && (A.suspendedLanes = 0, A.pingedLanes = 0, A
        .warmLanes = 0)
    }

    function qV(A, t, a, c, u, e) {
      var l = A.pendingLanes;
      A.pendingLanes = a, A.suspendedLanes = 0, A.pingedLanes = 0, A.warmLanes = 0, A
        .expiredLanes &= a, A.entangledLanes &= a, A.errorRecoveryDisabledLanes &= a, A
        .shellSuspendCounter = 0;
      var n = A.entanglements,
        r = A.expirationTimes,
        I = A.hiddenUpdates;
      for (a = l & ~a; 0 < a;) {
        var p = 31 - nt(a),
          q = 1 << p;
        n[p] = 0, r[p] = -1;
        var R = I[p];
        if (R !== null)
          for (I[p] = null, p = 0; p < R.length; p++) {
            var d = R[p];
            d !== null && (d.lane &= -536870913)
          }
        a &= ~q
      }
      c !== 0 && Hr(A, c, 0), e !== 0 && u === 0 && A.tag !== 0 && (A.suspendedLanes |= e & ~(
        l & ~t))
    }

    function Hr(A, t, a) {
      A.pendingLanes |= t, A.suspendedLanes &= ~t;
      var c = 31 - nt(t);
      A.entangledLanes |= t, A.entanglements[c] = A.entanglements[c] | 1073741824 | a & 261930
    }

    function Er(A, t) {
      var a = A.entangledLanes |= t;
      for (A = A.entanglements; a;) {
        var c = 31 - nt(a),
          u = 1 << c;
        u & t | A[c] & t && (A[c] |= t), a &= ~u
      }
    }

    function Sr(A, t) {
      var a = t & -t;
      return a = (a & 42) !== 0 ? 1 : mI(a), (a & (A.suspendedLanes | t)) !== 0 ? 0 : a
    }

    function mI(A) {
      switch (A) {
        case 2:
          A = 1;
          break;
        case 8:
          A = 4;
          break;
        case 32:
          A = 16;
          break;
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
          A = 128;
          break;
        case 268435456:
          A = 134217728;
          break;
        default:
          A = 0
      }
      return A
    }

    function fI(A) {
      return A &= -A, 2 < A ? 8 < A ? (A & 134217727) !== 0 ? 32 : 268435456 : 8 : 2
    }

    function Nr() {
      var A = v.p;
      return A !== 0 ? A : (A = window.event, A === void 0 ? 32 : cj(A.type))
    }

    function yp(A, t) {
      var a = v.p;
      try {
        return v.p = A, t()
      } finally {
        v.p = a
      }
    }
    var ia = Math.random().toString(36).slice(2),
      kA = "__reactFiber$" + ia,
      $A = "__reactProps$" + ia,
      Ru = "__reactContainer$" + ia,
      Pp = "__reactEvents$" + ia,
      pV = "__reactListeners$" + ia,
      RV = "__reactHandles$" + ia,
      kp = "__reactResources$" + ia,
      be = "__reactMarker$" + ia,
      Pl = "__reactLoad$" + ia;

    function Ai(A) {
      delete A[kA], delete A[$A], delete A[pV], delete A[RV]
    }

    function Ac(A) {
      var t;
      if (t = A[kA]) return t;
      for (var a = A.parentNode; a;) {
        if (t = a[Ru] || a[kA]) {
          if (a = t.alternate, t.child !== null || a !== null && a.child !== null)
            for (A = hR(A); A !== null;) {
              if (a = A[kA]) return a;
              A = hR(A)
            }
          return t
        }
        A = a, a = A.parentNode
      }
      return null
    }

    function ru(A) {
      if (A = A[kA] || A[Ru]) {
        var t = A.tag;
        if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3)
          return A
      }
      return null
    }

    function zu(A) {
      var t = A.tag;
      if (t === 5 || t === 26 || t === 27 || t === 6) return A.stateNode;
      throw Error(U(33))
    }

    function Jc(A) {
      var t = A[kp];
      return t || (t = A[kp] = {
        hoistableStyles: new Map,
        hoistableScripts: new Map
      }), t
    }

    function sA(A) {
      A[be] = !0
    }

    function xr(A) {
      A[Pl] = void 0
    }
    var or = new Set,
      sr = {};

    function bc(A, t) {
      Au(A, t), Au(A + "Capture", t)
    }

    function Au(A, t) {
      for (sr[A] = t, A = 0; A < t.length; A++) or.add(t[A])
    }
    var rV = RegExp(
        "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
        ),
      Wp = {},
      Tp = {};

    function dV(A) {
      return Pn.call(Tp, A) ? !0 : Pn.call(Wp, A) ? !1 : rV.test(A) ? Tp[A] = !0 : (Wp[A] = !
        0, !1)
    }
    var B = !1;

    function mp() {
      var A = B;
      return B = !1, A
    }

    function el(A, t, a) {
      if (dV(t))
        if (a === null) A.removeAttribute(t);
        else {
          switch (typeof a) {
            case "undefined":
            case "function":
            case "symbol":
              A.removeAttribute(t);
              return;
            case "boolean":
              var c = t.toLowerCase().slice(0, 5);
              if (c !== "data-" && c !== "aria-") {
                A.removeAttribute(t);
                return
              }
          }
          A.setAttribute(t, a)
        }
    }

    function ge(A, t, a) {
      if (a === null) A.removeAttribute(t);
      else {
        switch (typeof a) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            A.removeAttribute(t);
            return
        }
        A.setAttribute(t, a)
      }
    }

    function Mt(A, t, a, c) {
      if (c === null) A.removeAttribute(a);
      else {
        switch (typeof c) {
          case "undefined":
          case "function":
          case "symbol":
          case "boolean":
            A.removeAttribute(a);
            return
        }
        A.setAttributeNS(t, a, c)
      }
    }

    function at(A) {
      switch (typeof A) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return A;
        case "object":
          return A;
        default:
          return ""
      }
    }

    function Ur(A) {
      var t = A.type;
      return (A = A.nodeName) && A.toLowerCase() === "input" && (t === "checkbox" || t ===
        "radio")
    }

    function jV(A, t, a) {
      var c = Object.getOwnPropertyDescriptor(A.constructor.prototype, t);
      if (!A.hasOwnProperty(t) && typeof c < "u" && typeof c.get == "function" && typeof c
        .set == "function") {
        var u = c.get,
          e = c.set;
        return Object.defineProperty(A, t, {
          configurable: !0,
          get: function() {
            return u.call(this)
          },
          set: function(l) {
            a = "" + l, e.call(this, l)
          }
        }), Object.defineProperty(A, t, {
          enumerable: c.enumerable
        }), {
          getValue: function() {
            return a
          },
          setValue: function(l) {
            a = "" + l
          },
          stopTracking: function() {
            A._valueTracker = null, delete A[t]
          }
        }
      }
    }

    function kn(A) {
      if (!A._valueTracker) {
        var t = Ur(A) ? "checked" : "value";
        A._valueTracker = jV(A, t, "" + A[t])
      }
    }

    function yr(A) {
      if (!A) return !1;
      var t = A._valueTracker;
      if (!t) return !0;
      var a = t.getValue(),
        c = "";
      return A && (c = Ur(A) ? A.checked ? "true" : "false" : A.value), A = c, A !== a ? (t
        .setValue(A), !0) : !1
    }
    var bV = /[\n"\\]/g;

    function Ot(A) {
      return A.replace(bV, function(t) {
        return "\\" + t.charCodeAt(0).toString(16) + " "
      })
    }

    function Wn(A, t, a, c, u, e, l, n) {
      A.name = "", l != null && typeof l != "function" && typeof l != "symbol" && typeof l !=
        "boolean" ? A.type = l : A.removeAttribute("type"), t != null ? l === "number" ? (
          t === 0 && A.value === "" || A.value != t) && (A.value = "" + at(t)) : A.value !==
        "" + at(t) && (A.value = "" + at(t)) : l !== "submit" && l !== "reset" || A
        .removeAttribute("value"), t != null ? l === "number" && A.value == t ? Bi(A, at(A
          .value)) : Bi(A, at(t)) : a != null ? Bi(A, at(a)) : c != null && A.removeAttribute(
          "value"), u == null && e != null && (A.defaultChecked = !!e), u != null && (A
          .checked = u && typeof u != "function" && typeof u != "symbol"), n != null &&
        typeof n != "function" && typeof n != "symbol" && typeof n != "boolean" ? A.name =
        "" + at(n) : A.removeAttribute("name")
    }

    function Pr(A, t, a, c, u, e, l, n) {
      if (e != null && typeof e != "function" && typeof e != "symbol" && typeof e !=
        "boolean" && (A.type = e), t != null || a != null) {
        if (!(e !== "submit" && e !== "reset" || t != null)) {
          kn(A);
          return
        }
        a = a != null ? "" + at(a) : "", t = t != null ? "" + at(t) : a, n || t === A.value ||
          (A.value = t), A.defaultValue = t
      }
      c = c ?? u, c = typeof c != "function" && typeof c != "symbol" && !!c, A.checked = n ? A
        .checked : !!c, A.defaultChecked = !!c, l != null && typeof l != "function" &&
        typeof l != "symbol" && typeof l != "boolean" && (A.name = l), kn(A)
    }

    function Bi(A, t) {
      A.defaultValue !== "" + t && (A.defaultValue = "" + t)
    }

    function Qc(A, t, a, c) {
      if (A = A.options, t) {
        t = {};
        for (var u = 0; u < a.length; u++) t["$" + a[u]] = !0;
        for (a = 0; a < A.length; a++) u = t.hasOwnProperty("$" + A[a].value), A[a]
          .selected !== u && (A[a].selected = u), u && c && (A[a].defaultSelected = !0)
      } else {
        for (a = "" + at(a), t = null, u = 0; u < A.length; u++) {
          if (A[u].value === a) {
            A[u].selected = !0, c && (A[u].defaultSelected = !0);
            return
          }
          t !== null || A[u].disabled || (t = A[u])
        }
        t !== null && (t.selected = !0)
      }
    }

    function kr(A, t, a) {
      if (t != null && (t = "" + at(t), t !== A.value && (A.value = t), a == null)) {
        A.defaultValue !== t && (A.defaultValue = t);
        return
      }
      A.defaultValue = a != null ? "" + at(a) : ""
    }

    function Wr(A, t, a, c) {
      if (t == null) {
        if (c != null) {
          if (a != null) throw Error(U(92));
          if (fu(c)) {
            if (1 < c.length) throw Error(U(93));
            c = c[0]
          }
          a = c
        }
        a == null && (a = ""), t = a
      }
      a = at(t), A.defaultValue = a, c = A.textContent, c === a && c !== "" && c !== null && (
        A.value = c), kn(A)
    }

    function tu(A, t) {
      if (t) {
        var a = A.firstChild;
        if (a && a === A.lastChild && a.nodeType === 3) {
          a.nodeValue = t;
          return
        }
      }
      A.textContent = t
    }
    var OV = new Set(
      "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp"
      .split(" "));

    function fp(A, t, a) {
      var c = t.indexOf("--") === 0;
      a == null || typeof a == "boolean" || a === "" ? c ? A.setProperty(t, "") : t ===
        "float" ? A.cssFloat = "" : A[t] = "" : c ? A.setProperty(t, a) : typeof a !=
        "number" || a === 0 || OV.has(t) ? t === "float" ? A.cssFloat = a : A[t] = ("" + a)
        .trim() : A[t] = a + "px"
    }

    function Tr(A, t, a) {
      if (t != null && typeof t != "object") throw Error(U(62));
      if (A = A.style, a != null) {
        for (var c in a) !a.hasOwnProperty(c) || t != null && t.hasOwnProperty(c) || (c
          .indexOf("--") === 0 ? A.setProperty(c, "") : c === "float" ? A.cssFloat = "" : A[
            c] = "", B = !0);
        for (var u in t) c = t[u], t.hasOwnProperty(u) && a[u] !== c && (fp(A, u, c), B = !0)
      } else
        for (var e in t) t.hasOwnProperty(e) && fp(A, e, t[e])
    }

    function zI(A) {
      if (A.indexOf("-") === -1) return !1;
      switch (A) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0
      }
    }
    var VV = new Map([
        ["acceptCharset", "accept-charset"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
        ["crossOrigin", "crossorigin"],
        ["accentHeight", "accent-height"],
        ["alignmentBaseline", "alignment-baseline"],
        ["arabicForm", "arabic-form"],
        ["baselineShift", "baseline-shift"],
        ["capHeight", "cap-height"],
        ["clipPath", "clip-path"],
        ["clipRule", "clip-rule"],
        ["colorInterpolation", "color-interpolation"],
        ["colorInterpolationFilters", "color-interpolation-filters"],
        ["colorProfile", "color-profile"],
        ["colorRendering", "color-rendering"],
        ["dominantBaseline", "dominant-baseline"],
        ["enableBackground", "enable-background"],
        ["fillOpacity", "fill-opacity"],
        ["fillRule", "fill-rule"],
        ["floodColor", "flood-color"],
        ["floodOpacity", "flood-opacity"],
        ["fontFamily", "font-family"],
        ["fontSize", "font-size"],
        ["fontSizeAdjust", "font-size-adjust"],
        ["fontStretch", "font-stretch"],
        ["fontStyle", "font-style"],
        ["fontVariant", "font-variant"],
        ["fontWeight", "font-weight"],
        ["glyphName", "glyph-name"],
        ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
        ["glyphOrientationVertical", "glyph-orientation-vertical"],
        ["horizAdvX", "horiz-adv-x"],
        ["horizOriginX", "horiz-origin-x"],
        ["imageRendering", "image-rendering"],
        ["letterSpacing", "letter-spacing"],
        ["lightingColor", "lighting-color"],
        ["markerEnd", "marker-end"],
        ["markerMid", "marker-mid"],
        ["markerStart", "marker-start"],
        ["maskType", "mask-type"],
        ["overlinePosition", "overline-position"],
        ["overlineThickness", "overline-thickness"],
        ["paintOrder", "paint-order"],
        ["panose-1", "panose-1"],
        ["pointerEvents", "pointer-events"],
        ["renderingIntent", "rendering-intent"],
        ["shapeRendering", "shape-rendering"],
        ["stopColor", "stop-color"],
        ["stopOpacity", "stop-opacity"],
        ["strikethroughPosition", "strikethrough-position"],
        ["strikethroughThickness", "strikethrough-thickness"],
        ["strokeDasharray", "stroke-dasharray"],
        ["strokeDashoffset", "stroke-dashoffset"],
        ["strokeLinecap", "stroke-linecap"],
        ["strokeLinejoin", "stroke-linejoin"],
        ["strokeMiterlimit", "stroke-miterlimit"],
        ["strokeOpacity", "stroke-opacity"],
        ["strokeWidth", "stroke-width"],
        ["textAnchor", "text-anchor"],
        ["textDecoration", "text-decoration"],
        ["textRendering", "text-rendering"],
        ["transformOrigin", "transform-origin"],
        ["underlinePosition", "underline-position"],
        ["underlineThickness", "underline-thickness"],
        ["unicodeBidi", "unicode-bidi"],
        ["unicodeRange", "unicode-range"],
        ["unitsPerEm", "units-per-em"],
        ["vAlphabetic", "v-alphabetic"],
        ["vHanging", "v-hanging"],
        ["vIdeographic", "v-ideographic"],
        ["vMathematical", "v-mathematical"],
        ["vectorEffect", "vector-effect"],
        ["vertAdvY", "vert-adv-y"],
        ["vertOriginX", "vert-origin-x"],
        ["vertOriginY", "vert-origin-y"],
        ["wordSpacing", "word-spacing"],
        ["writingMode", "writing-mode"],
        ["xmlnsXlink", "xmlns:xlink"],
        ["xHeight", "x-height"]
      ]),
      HV =
      /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;

    function ll(A) {
      return HV.test("" + A) ?
        "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" :
        A
    }

    function Lt() {}
    var Tn = null;

    function KI(A) {
      return A = A.target || A.srcElement || window, A.correspondingUseElement && (A = A
        .correspondingUseElement), A.nodeType === 3 ? A.parentNode : A
    }
    var zc = null,
      Bc = null;

    function zp(A) {
      var t = ru(A);
      if (t && (A = t.stateNode)) {
        var a = A[$A] || null;
        A: switch (A = t.stateNode, t.type) {
          case "input":
            if (Wn(A, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked,
                a.type, a.name), t = a.name, a.type === "radio" && t != null) {
              for (a = A; a.parentNode;) a = a.parentNode;
              for (a = a.querySelectorAll('input[name="' + Ot("" + t) + '"][type="radio"]'),
                t = 0; t < a.length; t++) {
                var c = a[t];
                if (c !== A && c.form === A.form) {
                  var u = c[$A] || null;
                  if (!u) throw Error(U(90));
                  Wn(c, u.value, u.defaultValue, u.defaultValue, u.checked, u
                    .defaultChecked, u.type, u.name)
                }
              }
              for (t = 0; t < a.length; t++) c = a[t], c.form === A.form && yr(c)
            }
            break A;
          case "textarea":
            kr(A, a.value, a.defaultValue);
            break A;
          case "select":
            t = a.value, t != null && Qc(A, !!a.multiple, t, !1)
        }
      }
    }
    var hi = !1;

    function mr(A, t, a) {
      if (hi) return A(t, a);
      hi = !0;
      try {
        var c = A(t);
        return c
      } finally {
        if (hi = !1, (zc !== null || Bc !== null) && (di(), zc && (t = zc, A = Bc, Bc = zc =
            null, zp(t), A)))
          for (t = 0; t < A.length; t++) zp(A[t])
      }
    }

    function Yu(A, t) {
      var a = A.stateNode;
      if (a === null) return null;
      var c = a[$A] || null;
      if (c === null) return null;
      a = c[t];
      A: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          (c = !c.disabled) || (A = A.type, c = !(A === "button" || A === "input" || A ===
            "select" || A === "textarea")), A = !c;
          break A;
        default:
          A = !1
      }
      if (A) return null;
      if (a && typeof a != "function") throw Error(U(231, t, typeof a));
      return a
    }
    var ta = !(typeof window > "u" || typeof window.document > "u" || typeof window.document
        .createElement > "u"),
      mn = !1;
    if (ta) try {
      sc = {}, Object.defineProperty(sc, "passive", {
        get: function() {
          mn = !0
        }
      }), window.addEventListener("test", sc, sc), window.removeEventListener("test", sc,
        sc)
    } catch {
      mn = !1
    }
    var sc, oa = null,
      GI = null,
      il = null;

    function fr() {
      if (il) return il;
      var A, t = GI,
        a = t.length,
        c, u = "value" in oa ? oa.value : oa.textContent,
        e = u.length;
      for (A = 0; A < a && t[A] === u[A]; A++);
      var l = a - A;
      for (c = 1; c <= l && t[a - c] === u[e - c]; c++);
      return il = u.slice(A, 1 < c ? 1 - c : void 0)
    }

    function nl(A) {
      var t = A.keyCode;
      return "charCode" in A ? (A = A.charCode, A === 0 && t === 13 && (A = 13)) : A = t,
        A === 10 && (A = 13), 32 <= A || A === 13 ? A : 0
    }

    function Je() {
      return !0
    }

    function Kp() {
      return !1
    }

    function hA(A) {
      function t(a, c, u, e, l) {
        this._reactName = a, this._targetInst = u, this.type = c, this.nativeEvent = e, this
          .target = l, this.currentTarget = null;
        for (var n in A) A.hasOwnProperty(n) && (a = A[n], this[n] = a ? a(e) : e[n]);
        return this.isDefaultPrevented = (e.defaultPrevented != null ? e.defaultPrevented : e
          .returnValue === !1) ? Je : Kp, this.isPropagationStopped = Kp, this
      }
      return AA(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue !=
            "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Je)
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble !=
            "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Je)
        },
        persist: function() {},
        isPersistent: Je
      }), t
    }
    var Qa = {
        eventPhase: 0,
        bubbles: 0,
        cancelable: 0,
        timeStamp: function(A) {
          return A.timeStamp || Date.now()
        },
        defaultPrevented: 0,
        isTrusted: 0
      },
      ti = hA(Qa),
      Oe = AA({}, Qa, {
        view: 0,
        detail: 0
      }),
      EV = hA(Oe),
      vi, Ci, yu, ai = AA({}, Oe, {
        screenX: 0,
        screenY: 0,
        clientX: 0,
        clientY: 0,
        pageX: 0,
        pageY: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        getModifierState: XI,
        button: 0,
        buttons: 0,
        relatedTarget: function(A) {
          return A.relatedTarget === void 0 ? A.fromElement === A.srcElement ? A
            .toElement : A.fromElement : A.relatedTarget
        },
        movementX: function(A) {
          return "movementX" in A ? A.movementX : (A !== yu && (yu && A.type ===
            "mousemove" ? (vi = A.screenX - yu.screenX, Ci = A.screenY - yu.screenY) :
            Ci = vi = 0, yu = A), vi)
        },
        movementY: function(A) {
          return "movementY" in A ? A.movementY : Ci
        }
      }),
      Gp = hA(ai),
      SV = AA({}, ai, {
        dataTransfer: 0
      }),
      NV = hA(SV),
      xV = AA({}, Oe, {
        relatedTarget: 0
      }),
      Mi = hA(xV),
      oV = AA({}, Qa, {
        animationName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }),
      sV = hA(oV),
      UV = AA({}, Qa, {
        clipboardData: function(A) {
          return "clipboardData" in A ? A.clipboardData : window.clipboardData
        }
      }),
      yV = hA(UV),
      PV = AA({}, Qa, {
        data: 0
      }),
      Xp = hA(PV),
      kV = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      },
      WV = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      },
      TV = {
        Alt: "altKey",
        Control: "ctrlKey",
        Meta: "metaKey",
        Shift: "shiftKey"
      };

    function mV(A) {
      var t = this.nativeEvent;
      return t.getModifierState ? t.getModifierState(A) : (A = TV[A]) ? !!t[A] : !1
    }

    function XI() {
      return mV
    }
    var fV = AA({}, Oe, {
        key: function(A) {
          if (A.key) {
            var t = kV[A.key] || A.key;
            if (t !== "Unidentified") return t
          }
          return A.type === "keypress" ? (A = nl(A), A === 13 ? "Enter" : String
            .fromCharCode(A)) : A.type === "keydown" || A.type === "keyup" ? WV[A
            .keyCode] || "Unidentified" : ""
        },
        code: 0,
        location: 0,
        ctrlKey: 0,
        shiftKey: 0,
        altKey: 0,
        metaKey: 0,
        repeat: 0,
        locale: 0,
        getModifierState: XI,
        charCode: function(A) {
          return A.type === "keypress" ? nl(A) : 0
        },
        keyCode: function(A) {
          return A.type === "keydown" || A.type === "keyup" ? A.keyCode : 0
        },
        which: function(A) {
          return A.type === "keypress" ? nl(A) : A.type === "keydown" || A.type ===
            "keyup" ? A.keyCode : 0
        }
      }),
      zV = hA(fV),
      KV = AA({}, ai, {
        pointerId: 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        pointerType: 0,
        isPrimary: 0
      }),
      Lp = hA(KV),
      GV = AA({}, Qa, {
        submitter: 0
      }),
      XV = hA(GV),
      LV = AA({}, Oe, {
        touches: 0,
        targetTouches: 0,
        changedTouches: 0,
        altKey: 0,
        metaKey: 0,
        ctrlKey: 0,
        shiftKey: 0,
        getModifierState: XI
      }),
      ZV = hA(LV),
      DV = AA({}, Qa, {
        propertyName: 0,
        elapsedTime: 0,
        pseudoElement: 0
      }),
      wV = hA(DV),
      gV = AA({}, ai, {
        deltaX: function(A) {
          return "deltaX" in A ? A.deltaX : "wheelDeltaX" in A ? -A.wheelDeltaX : 0
        },
        deltaY: function(A) {
          return "deltaY" in A ? A.deltaY : "wheelDeltaY" in A ? -A.wheelDeltaY :
            "wheelDelta" in A ? -A.wheelDelta : 0
        },
        deltaZ: 0,
        deltaMode: 0
      }),
      JV = hA(gV),
      QV = AA({}, Qa, {
        newState: 0,
        oldState: 0,
        source: 0
      }),
      BV = hA(QV),
      hV = [9, 13, 27, 32],
      LI = ta && "CompositionEvent" in window,
      Xu = null;
    ta && "documentMode" in document && (Xu = document.documentMode);
    var vV = ta && "TextEvent" in window && !Xu,
      zr = ta && (!LI || Xu && 8 < Xu && 11 >= Xu),
      Zp = " ",
      Dp = !1;

    function Kr(A, t) {
      switch (A) {
        case "keyup":
          return hV.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== 229;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1
      }
    }

    function Gr(A) {
      return A = A.detail, typeof A == "object" && "data" in A ? A.data : null
    }
    var Kc = !1;

    function CV(A, t) {
      switch (A) {
        case "compositionend":
          return Gr(t);
        case "keypress":
          return t.which !== 32 ? null : (Dp = !0, Zp);
        case "textInput":
          return A = t.data, A === Zp && Dp ? null : A;
        default:
          return null
      }
    }

    function MV(A, t) {
      if (Kc) return A === "compositionend" || !LI && Kr(A, t) ? (A = fr(), il = GI = oa =
        null, Kc = !1, A) : null;
      switch (A) {
        case "paste":
          return null;
        case "keypress":
          if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which)
          }
          return null;
        case "compositionend":
          return zr && t.locale !== "ko" ? null : t.data;
        default:
          return null
      }
    }
    var FV = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };

    function wp(A) {
      var t = A && A.nodeName && A.nodeName.toLowerCase();
      return t === "input" ? !!FV[A.type] : t === "textarea"
    }

    function Xr(A, t, a, c) {
      zc ? Bc ? Bc.push(c) : Bc = [c] : zc = c, t = Fl(t, "onChange"), 0 < t.length && (a =
        new ti("onChange", "change", null, a, c), A.push({
          event: a,
          listeners: t
        }))
    }
    var Lu = null,
      _u = null;

    function YV(A) {
      m1(A, 0)
    }

    function ci(A) {
      var t = zu(A);
      if (yr(t)) return A
    }

    function gp(A, t) {
      if (A === "change") return t
    }
    var Lr = !1;
    ta && (ta ? (Be = "oninput" in document, Be || (Fi = document.createElement("div"), Fi
        .setAttribute("oninput", "return;"), Be = typeof Fi.oninput == "function"), Qe =
      Be) : Qe = !1, Lr = Qe && (!document.documentMode || 9 < document.documentMode));
    var Qe, Be, Fi;

    function Jp() {
      Lu && (Lu.detachEvent("onpropertychange", Zr), _u = Lu = null)
    }

    function Zr(A) {
      if (A.propertyName === "value" && ci(_u)) {
        var t = [];
        Xr(t, _u, A, KI(A)), mr(YV, t)
      }
    }

    function _V(A, t, a) {
      A === "focusin" ? (Jp(), Lu = t, _u = a, Lu.attachEvent("onpropertychange", Zr)) : A ===
        "focusout" && Jp()
    }

    function $V(A) {
      if (A === "selectionchange" || A === "keyup" || A === "keydown") return ci(_u)
    }

    function A2(A, t) {
      if (A === "click") return ci(t)
    }

    function t2(A, t) {
      if (A === "input" || A === "change") return ci(t)
    }

    function a2(A, t) {
      return A === t && (A !== 0 || 1 / A === 1 / t) || A !== A && t !== t
    }
    var qt = typeof Object.is == "function" ? Object.is : a2;

    function $u(A, t) {
      if (qt(A, t)) return !0;
      if (typeof A != "object" || A === null || typeof t != "object" || t === null) return !1;
      var a = Object.keys(A),
        c = Object.keys(t);
      if (a.length !== c.length) return !1;
      for (c = 0; c < a.length; c++) {
        var u = a[c];
        if (!Pn.call(t, u) || !qt(A[u], t[u])) return !1
      }
      return !0
    }

    function fn(A) {
      if (A = A || (typeof document < "u" ? document : void 0), typeof A > "u") return null;
      try {
        return A.activeElement || A.body
      } catch {
        return A.body
      }
    }

    function Qp(A) {
      for (; A && A.firstChild;) A = A.firstChild;
      return A
    }

    function Bp(A, t) {
      var a = Qp(A);
      A = 0;
      for (var c; a;) {
        if (a.nodeType === 3) {
          if (c = A + a.textContent.length, A <= t && c >= t) return {
            node: a,
            offset: t - A
          };
          A = c
        }
        A: {
          for (; a;) {
            if (a.nextSibling) {
              a = a.nextSibling;
              break A
            }
            a = a.parentNode
          }
          a = void 0
        }
        a = Qp(a)
      }
    }

    function Dr(A, t) {
      return A && t ? A === t ? !0 : A && A.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Dr(
        A, t.parentNode) : "contains" in A ? A.contains(t) : A.compareDocumentPosition ? !!(
        A.compareDocumentPosition(t) & 16) : !1 : !1
    }

    function wr(A) {
      A = A != null && A.ownerDocument != null && A.ownerDocument.defaultView != null ? A
        .ownerDocument.defaultView : window;
      for (var t = fn(A.document); t instanceof A.HTMLIFrameElement;) {
        try {
          var a = typeof t.contentWindow.location.href == "string"
        } catch {
          a = !1
        }
        if (a) A = t.contentWindow;
        else break;
        t = fn(A.document)
      }
      return t
    }

    function ZI(A) {
      var t = A && A.nodeName && A.nodeName.toLowerCase();
      return t && (t === "input" && (A.type === "text" || A.type === "search" || A.type ===
          "tel" || A.type === "url" || A.type === "password") || t === "textarea" || A
        .contentEditable === "true")
    }
    var c2 = ta && "documentMode" in document && 11 >= document.documentMode,
      Gc = null,
      zn = null,
      Zu = null,
      Kn = !1;

    function hp(A, t, a) {
      var c = a.window === a ? a.document : a.nodeType === 9 ? a : a.ownerDocument;
      Kn || Gc == null || Gc !== fn(c) || (c = Gc, "selectionStart" in c && ZI(c) ? c = {
        start: c.selectionStart,
        end: c.selectionEnd
      } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(),
        c = {
          anchorNode: c.anchorNode,
          anchorOffset: c.anchorOffset,
          focusNode: c.focusNode,
          focusOffset: c.focusOffset
        }), Zu && $u(Zu, c) || (Zu = c, c = Fl(zn, "onSelect"), 0 < c.length && (t =
        new ti("onSelect", "select", null, t, a), A.push({
          event: t,
          listeners: c
        }), t.target = Gc)))
    }

    function Ma(A, t) {
      var a = {};
      return a[A.toLowerCase()] = t.toLowerCase(), a["Webkit" + A] = "webkit" + t, a["Moz" +
        A] = "moz" + t, a
    }
    var Xc = {
        animationend: Ma("Animation", "AnimationEnd"),
        animationiteration: Ma("Animation", "AnimationIteration"),
        animationstart: Ma("Animation", "AnimationStart"),
        transitionrun: Ma("Transition", "TransitionRun"),
        transitionstart: Ma("Transition", "TransitionStart"),
        transitioncancel: Ma("Transition", "TransitionCancel"),
        transitionend: Ma("Transition", "TransitionEnd")
      },
      Yi = {},
      gr = {};
    ta && (gr = document.createElement("div").style, "AnimationEvent" in window || (delete Xc
        .animationend.animation, delete Xc.animationiteration.animation, delete Xc
        .animationstart.animation), "TransitionEvent" in window || delete Xc.transitionend
      .transition);

    function Oc(A) {
      if (Yi[A]) return Yi[A];
      if (!Xc[A]) return A;
      var t = Xc[A],
        a;
      for (a in t)
        if (t.hasOwnProperty(a) && a in gr) return Yi[A] = t[a];
      return A
    }
    var Jr = Oc("animationend"),
      Qr = Oc("animationiteration"),
      Br = Oc("animationstart"),
      u2 = Oc("transitionrun"),
      e2 = Oc("transitionstart"),
      l2 = Oc("transitioncancel"),
      hr = Oc("transitionend"),
      vr = new Map,
      Gn =
      "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel"
      .split(" ");
    Gn.push("scrollEnd");

    function kt(A, t) {
      vr.set(A, t), bc(t, [A])
    }
    var i2 = 0;

    function aa(A, t) {
      if (A.name != null && A.name !== "auto") return A.name;
      if (t.autoName !== null) return t.autoName;
      A = Pt.identifierPrefix;
      var a = i2++;
      return A = "_" + A + "t_" + a.toString(32) + "_", t.autoName = A
    }

    function vp(A) {
      if (A == null || typeof A == "string") return A;
      var t = null,
        a = _c;
      if (a !== null)
        for (var c = 0; c < a.length; c++) {
          var u = A[a[c]];
          if (u != null) {
            if (u === "none") return "none";
            t = t == null ? u : t + (" " + u)
          }
        }
      return t ?? A.default
    }

    function na(A, t) {
      return A = vp(A), t = vp(t), t == null ? A === "auto" ? null : A : t === "auto" ? null :
        t
    }
    var kl = typeof reportError == "function" ? reportError : function(A) {
        if (typeof window == "object" && typeof window.ErrorEvent == "function") {
          var t = new window.ErrorEvent("error", {
            bubbles: !0,
            cancelable: !0,
            message: typeof A == "object" && A !== null && typeof A.message == "string" ?
              String(A.message) : String(A),
            error: A
          });
          if (!window.dispatchEvent(t)) return
        } else if (typeof process == "object" && typeof process.emit == "function") {
          process.emit("uncaughtException", A);
          return
        }
        console.error(A)
      },
      dt = [],
      Lc = 0,
      DI = 0;

    function ui() {
      for (var A = Lc, t = DI = Lc = 0; t < A;) {
        var a = dt[t];
        dt[t++] = null;
        var c = dt[t];
        dt[t++] = null;
        var u = dt[t];
        dt[t++] = null;
        var e = dt[t];
        if (dt[t++] = null, c !== null && u !== null) {
          var l = c.pending;
          l === null ? u.next = u : (u.next = l.next, l.next = u), c.pending = u
        }
        e !== 0 && Cr(a, u, e)
      }
    }

    function ei(A, t, a, c) {
      dt[Lc++] = A, dt[Lc++] = t, dt[Lc++] = a, dt[Lc++] = c, DI |= c, A.lanes |= c, A = A
        .alternate, A !== null && (A.lanes |= c)
    }

    function wI(A, t, a, c) {
      return ei(A, t, a, c), Wl(A)
    }

    function Vc(A, t) {
      return ei(A, null, null, t), Wl(A)
    }

    function Cr(A, t, a) {
      A.lanes |= a;
      var c = A.alternate;
      c !== null && (c.lanes |= a);
      for (var u = !1, e = A.return; e !== null;) e.childLanes |= a, c = e.alternate, c !==
        null && (c.childLanes |= a), e.tag === 22 && (A = e.stateNode, A === null || A
          ._visibility & 1 || (u = !0)), A = e, e = e.return;
      return A.tag === 3 ? (e = A.stateNode, u && t !== null && (u = 31 - nt(a), A = e
        .hiddenUpdates, c = A[u], c === null ? A[u] = [t] : c.push(t), t.lane = a |
        536870912), e) : null
    }

    function Wl(A) {
      if (50 < Mu) throw Mu = 0, Vl = null, Error(U(185));
      for (var t = A.return; t !== null;) A = t, t = A.return;
      return A.tag === 3 ? A.stateNode : null
    }
    var Zc = {};

    function n2(A, t, a, c) {
      this.tag = A, this.key = a, this.sibling = this.child = this.return = this.stateNode =
        this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref =
        null, this.pendingProps = t, this.dependencies = this.memoizedState = this
        .updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this
        .flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate =
        null
    }

    function FA(A, t, a, c) {
      return new n2(A, t, a, c)
    }

    function gI(A) {
      return A = A.prototype, !(!A || !A.isReactComponent)
    }

    function $t(A, t) {
      var a = A.alternate;
      return a === null ? (a = FA(A.tag, t, A.key, A.mode), a.elementType = A.elementType, a
          .type = A.type, a.stateNode = A.stateNode, a.alternate = A, A.alternate = a) : (a
          .pendingProps = t, a.type = A.type, a.flags = 0, a.subtreeFlags = 0, a.deletions =
          null), a.flags = A.flags & 1206910976, a.childLanes = A.childLanes, a.lanes = A
        .lanes, a.child = A.child, a.memoizedProps = A.memoizedProps, a.memoizedState = A
        .memoizedState, a.updateQueue = A.updateQueue, t = A.dependencies, a.dependencies =
        t === null ? null : {
          lanes: t.lanes,
          firstContext: t.firstContext
        }, a.sibling = A.sibling, a.index = A.index, a.ref = A.ref, a.refCleanup = A
        .refCleanup, a
    }

    function Mr(A, t) {
      A.flags &= 1206910978;
      var a = A.alternate;
      return a === null ? (A.childLanes = 0, A.lanes = t, A.child = null, A.subtreeFlags = 0,
        A.memoizedProps = null, A.memoizedState = null, A.updateQueue = null, A
        .dependencies = null, A.stateNode = null) : (A.childLanes = a.childLanes, A.lanes =
        a.lanes, A.child = a.child, A.subtreeFlags = 0, A.deletions = null, A
        .memoizedProps = a.memoizedProps, A.memoizedState = a.memoizedState, A.updateQueue =
        a.updateQueue, A.type = a.type, t = a.dependencies, A.dependencies = t === null ?
        null : {
          lanes: t.lanes,
          firstContext: t.firstContext
        }), A
    }

    function Il(A, t, a, c, u, e) {
      var l = 0;
      if (c = A, typeof c == "function") gI(c) && (l = 1);
      else if (typeof c == "string") l = zH(A, a, wt.current) ? 26 : A === "html" || A ===
        "head" || A === "body" ? 27 : 5;
      else A: switch (c) {
        case xn:
          return A = FA(31, a, t, u), A.elementType = xn, A.lanes = e, A;
        case mc:
          return cc(a.children, u, e, t);
        case Rr:
          l = 8, u |= 24;
          break;
        case En:
          return A = FA(12, a, t, u | 2), A.elementType = En, A.lanes = e, A;
        case Sn:
          return A = FA(13, a, t, u), A.elementType = Sn, A.lanes = e, A;
        case Nn:
          return A = FA(19, a, t, u), A.elementType = Nn, A.lanes = e, A;
        case MO:
        case on:
          return A = u | 32, A = FA(30, a, t, A), A.elementType = on, A.lanes = e, A
            .stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null
            }, A;
        default:
          if (typeof c == "object" && c !== null) switch (c.$$typeof) {
            case Xt:
              l = 10;
              break A;
            case rr:
              l = 9;
              break A;
            case kI:
              l = 11;
              break A;
            case WI:
              l = 14;
              break A;
            case Ea:
              l = 16, c = null;
              break A
          }
          l = 29, a = Error(U(130, A === null ? "null" : typeof A, "")), c = null
      }
      return t = FA(l, a, t, u), t.elementType = A, t.type = c, t.lanes = e, t
    }

    function cc(A, t, a, c) {
      return A = FA(7, A, c, t), A.lanes = a, A
    }

    function _i(A, t, a) {
      return A = FA(6, A, null, t), A.lanes = a, A
    }

    function Fr(A) {
      var t = FA(18, null, null, 0);
      return t.stateNode = A, t
    }

    function $i(A, t, a) {
      return t = FA(4, A.children !== null ? A.children : [], A.key, t), t.lanes = a, t
        .stateNode = {
          containerInfo: A.containerInfo,
          pendingChildren: null,
          implementation: A.implementation
        }, t
    }
    var Cp = new WeakMap;

    function Vt(A, t) {
      if (typeof A == "object" && A !== null) {
        var a = Cp.get(A);
        return a !== void 0 ? a : (t = {
          value: A,
          source: t,
          stack: Up(t)
        }, Cp.set(A, t), t)
      }
      return {
        value: A,
        source: t,
        stack: Up(t)
      }
    }
    var Dc = [],
      wc = 0,
      Tl = null,
      Ae = 0,
      jt = [],
      bt = 0,
      Za = null,
      Zt = 1,
      Dt = "";

    function Yt(A, t) {
      Dc[wc++] = Ae, Dc[wc++] = Tl, Tl = A, Ae = t
    }

    function Yr(A, t, a) {
      jt[bt++] = Zt, jt[bt++] = Dt, jt[bt++] = Za, Za = A;
      var c = Zt;
      A = Dt;
      var u = 32 - nt(c) - 1;
      c &= ~(1 << u), a += 1;
      var e = 32 - nt(t) + u;
      if (30 < e) {
        var l = u - u % 5;
        e = (c & (1 << l) - 1).toString(32), c >>= l, u -= l, Zt = 1 << 32 - nt(t) + u | a <<
          u | c, Dt = e + A
      } else Zt = 1 << e | a << u | c, Dt = A
    }

    function li(A) {
      A.return !== null && (Yt(A, 1), Yr(A, 1, 0))
    }

    function JI(A) {
      for (; A === Tl;) Tl = Dc[--wc], Dc[wc] = null, Ae = Dc[--wc], Dc[wc] = null;
      for (; A === Za;) Za = jt[--bt], jt[bt] = null, Dt = jt[--bt], jt[bt] = null, Zt = jt[--
        bt], jt[bt] = null
    }

    function _r(A, t) {
      jt[bt++] = Zt, jt[bt++] = Dt, jt[bt++] = Za, Zt = t.id, Dt = t.overflow, Za = A
    }
    var UA = null,
      uA = null,
      L = !1,
      Wa = null,
      Ht = !1,
      Xn = Error(U(519));

    function Da(A) {
      var t = Error(U(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ?
        "text" : "HTML", ""));
      throw te(Vt(t, A)), Xn
    }

    function Mp(A) {
      var t = A.stateNode,
        a = A.type,
        c = A.memoizedProps;
      switch (t[kA] = A, t[$A] = c, a) {
        case "dialog":
          Z("cancel", t), Z("close", t);
          break;
        case "iframe":
        case "object":
        case "embed":
          Z("load", t);
          break;
        case "video":
        case "audio":
          for (a = 0; a < ee.length; a++) Z(ee[a], t);
          break;
        case "source":
          Z("error", t);
          break;
        case "img":
        case "image":
        case "link":
          Z("error", t), Z("load", t);
          break;
        case "details":
          Z("toggle", t);
          break;
        case "input":
          Z("invalid", t), Pr(t, c.value, c.defaultValue, c.checked, c.defaultChecked, c.type,
            c.name, !0);
          break;
        case "select":
          Z("invalid", t);
          break;
        case "textarea":
          Z("invalid", t), Wr(t, c.value, c.defaultValue, c.children)
      }
      a = c.children, typeof a != "string" && typeof a != "number" && typeof a != "bigint" ||
        t.textContent === "" + a || c.suppressHydrationWarning === !0 || z1(t.textContent,
        a) ? (c.popover != null && (Z("beforetoggle", t), Z("toggle", t)), c.onScroll !=
          null && Z("scroll", t), c.onScrollEnd != null && Z("scrollend", t), c.onClick !=
          null && (t.onclick = Lt), t = !0) : t = !1, t || Da(A, !0)
    }

    function ml(A) {
      for (UA = A.return; UA;) switch (UA.tag) {
        case 5:
        case 31:
        case 13:
          Ht = !1;
          return;
        case 27:
        case 3:
          Ht = !0;
          return;
        default:
          UA = UA.return
      }
    }

    function Uc(A) {
      if (A !== UA) return !1;
      if (!L) return ml(A), L = !0, !1;
      var t = A.tag,
        a;
      if ((a = t !== 3 && t !== 27) && ((a = t === 5) && (a = A.type, a = !(a !== "form" &&
          a !== "button") || SI(A.type, A.memoizedProps)), a = !a), a && uA && Da(A), ml(A),
        t === 13) {
        if (A = A.memoizedState, A = A !== null ? A.dehydrated : null, !A) throw Error(U(
        317));
        uA = BR(A)
      } else if (t === 31) {
        if (A = A.memoizedState, A = A !== null ? A.dehydrated : null, !A) throw Error(U(
        317));
        uA = BR(A)
      } else t === 27 ? (t = uA, Ba(A.type) ? (A = sI, sI = null, uA = A) : uA = t) : uA =
        UA ? Et(A.stateNode.nextSibling) : null;
      return !0
    }

    function ic() {
      uA = UA = null, L = !1
    }

    function An() {
      var A = Wa;
      return A !== null && (CA === null ? CA = A : CA.push.apply(CA, A), Wa = null), A
    }

    function te(A) {
      Wa === null ? Wa = [A] : Wa.push(A)
    }
    var Ln = Qt(null),
      Hc = null,
      _t = null;

    function sa(A, t, a) {
      eA(Ln, t._currentValue), t._currentValue = a
    }

    function Aa(A) {
      A._currentValue = Ln.current, TA(Ln)
    }

    function ql(A, t, a) {
      for (; A !== null;) {
        var c = A.alternate;
        if ((A.childLanes & t) !== t ? (A.childLanes |= t, c !== null && (c.childLanes |=
          t)) : c !== null && (c.childLanes & t) !== t && (c.childLanes |= t), A === a) break;
        A = A.return
      }
    }

    function Zn(A, t, a, c) {
      var u = A.child;
      for (u !== null && (u.return = A); u !== null;) {
        var e = u.dependencies;
        if (e !== null) {
          var l = u.child;
          e = e.firstContext;
          A: for (; e !== null;) {
            var n = e;
            e = u;
            for (var r = 0; r < t.length; r++)
              if (n.context === t[r]) {
                e.lanes |= a, n = e.alternate, n !== null && (n.lanes |= a), ql(e.return, a,
                  A), c || (l = null);
                break A
              } e = n.next
          }
        } else if (u.tag === 18) {
          if (l = u.return, l === null) throw Error(U(341));
          l.lanes |= a, e = l.alternate, e !== null && (e.lanes |= a), ql(l, a, A), l = null
        } else u.tag === 13 && u.memoizedState !== null && u.memoizedState.dehydrated ===
          null ? (u.lanes |= a, l = u.alternate, l !== null && (l.lanes |= a), ql(u.return, a,
            A), l = u.child, l = l !== null ? l.sibling : null) : l = u.child;
        if (l !== null) l.return = u;
        else
          for (l = u; l !== null;) {
            if (l === A) {
              l = null;
              break
            }
            if (u = l.sibling, u !== null) {
              u.return = l.return, l = u;
              break
            }
            l = l.return
          }
        u = l
      }
    }

    function nc(A, t, a, c) {
      A = null;
      for (var u = t, e = !1; u !== null;) {
        if (!e) {
          if ((u.flags & 524288) !== 0) e = !0;
          else if ((u.flags & 262144) !== 0) break
        }
        if (u.tag === 10) {
          var l = u.alternate;
          if (l === null) throw Error(U(387));
          if (l = l.memoizedProps, l !== null) {
            var n = u.type;
            qt(u.pendingProps.value, l.value) || (A !== null ? A.push(n) : A = [n])
          }
        } else if (u === ol.current) {
          if (l = u.alternate, l === null) throw Error(U(387));
          l.memoizedState.memoizedState !== u.memoizedState.memoizedState && (A !== null ? A
            .push(Iu) : A = [Iu])
        }
        u = u.return
      }
      return A !== null && Zn(t, A, a, c), t.flags |= 262144, A !== null
    }

    function fl(A) {
      for (A = A.firstContext; A !== null;) {
        if (!qt(A.context._currentValue, A.memoizedValue)) return !0;
        A = A.next
      }
      return !1
    }

    function Ic(A) {
      Hc = A, _t = null, A = A.dependencies, A !== null && (A.firstContext = null)
    }

    function WA(A) {
      return $r(Hc, A)
    }

    function he(A, t) {
      return Hc === null && Ic(A), $r(A, t)
    }

    function $r(A, t) {
      var a = t._currentValue;
      if (t = {
          context: t,
          memoizedValue: a,
          next: null
        }, _t === null) {
        if (A === null) throw Error(U(308));
        _t = t, A.dependencies = {
          lanes: 0,
          firstContext: t
        }, A.flags |= 524288
      } else _t = _t.next = t;
      return a
    }
    var I2 = typeof AbortController < "u" ? AbortController : function() {
        var A = [],
          t = this.signal = {
            aborted: !1,
            addEventListener: function(a, c) {
              A.push(c)
            }
          };
        this.abort = function() {
          t.aborted = !0, A.forEach(function(a) {
            return a()
          })
        }
      },
      q2 = SA.unstable_scheduleCallback,
      p2 = SA.unstable_NormalPriority,
      bA = {
        $$typeof: Xt,
        Consumer: null,
        Provider: null,
        _currentValue: null,
        _currentValue2: null,
        _threadCount: 0
      };

    function QI() {
      return {
        controller: new I2,
        data: new Map,
        refCount: 0
      }
    }

    function Ve(A) {
      A.refCount--, A.refCount === 0 && q2(p2, function() {
        A.controller.abort()
      })
    }

    function Fp(A, t) {
      if ((A.pendingLanes & 4194048) !== 0) {
        var a = A.transitionTypes;
        for (a === null && (a = A.transitionTypes = []), A = 0; A < t.length; A++) {
          var c = t[A];
          a.indexOf(c) === -1 && a.push(c)
        }
      }
    }
    var Ku = null;

    function R2(A) {
      var t = A.transitionTypes;
      return A.transitionTypes = null, t
    }
    var Du = null,
      Dn = 0,
      qc = 0,
      hc = null;

    function r2(A, t) {
      if (Du === null) {
        var a = Du = [];
        Dn = 0, qc = Vq(), hc = {
          status: "pending",
          value: void 0,
          then: function(c) {
            a.push(c)
          }
        }
      }
      return Dn++, t.then(Yp, Yp), t
    }

    function Yp() {
      if (--Dn === 0 && (Ku = null, Du !== null)) {
        hc !== null && (hc.status = "fulfilled");
        var A = Du;
        Du = null, qc = 0, hc = null;
        for (var t = 0; t < A.length; t++)(0, A[t])()
      }
    }

    function d2(A, t) {
      var a = [],
        c = {
          status: "pending",
          value: null,
          reason: null,
          then: function(u) {
            a.push(u)
          }
        };
      return A.then(function() {
        c.status = "fulfilled", c.value = t;
        for (var u = 0; u < a.length; u++)(0, a[u])(t)
      }, function(u) {
        for (c.status = "rejected", c.reason = u, u = 0; u < a.length; u++)(0, a[u])(
          void 0)
      }), c
    }
    var _p = m.S;
    m.S = function(A, t) {
      if (O1 = lt(), typeof t == "object" && t !== null && typeof t.then == "function" &&
        r2(A, t), Ku !== null)
        for (var a = lu; a !== null;) Fp(a, Ku), a = a.next;
      if (a = A.types, a !== null) {
        for (var c = lu; c !== null;) Fp(c, a), c = c.next;
        if (qc !== 0) {
          c = Ku, c === null && (c = Ku = []);
          for (var u = 0; u < a.length; u++) {
            var e = a[u];
            c.indexOf(e) === -1 && c.push(e)
          }
        }
      }
      _p !== null && _p(A, t)
    };
    var uc = Qt(null);

    function BI() {
      var A = uc.current;
      return A !== null ? A : $.pooledCache
    }

    function pl(A, t) {
      t === null ? eA(uc, uc.current) : eA(uc, t.pool)
    }

    function Ad() {
      var A = BI();
      return A === null ? null : {
        parent: bA._currentValue,
        pool: A
      }
    }
    var du = Error(U(460)),
      hI = Error(U(474)),
      ii = Error(U(542)),
      zl = {
        then: function() {}
      };

    function $p(A) {
      return A = A.status, A === "fulfilled" || A === "rejected"
    }

    function td(A, t, a) {
      switch (a = A[a], a === void 0 ? A.push(t) : a !== t && (t.then(Lt, Lt), t = a), t
        .status) {
        case "fulfilled":
          return t.value;
        case "rejected":
          throw A = t.reason, tR(A), A === void 0 && !("reason" in t) ? Error(U(600)) : A;
        default:
          if (typeof t.status == "string") t.then(Lt, Lt);
          else {
            if (A = $, A !== null && 100 < A.shellSuspendCounter) throw Error(U(482));
            A = t, A.status = "pending", A.then(function(c) {
              if (t.status === "pending") {
                var u = t;
                u.status = "fulfilled", u.value = c
              }
            }, function(c) {
              if (t.status === "pending") {
                var u = t;
                u.status = "rejected", u.reason = c
              }
            })
          }
          switch (t.status) {
            case "fulfilled":
              return t.value;
            case "rejected":
              throw A = t.reason, tR(A), A
          }
          throw ec = t, du
      }
    }

    function _a(A) {
      try {
        var t = A._init;
        return t(A._payload)
      } catch (a) {
        throw a !== null && typeof a == "object" && typeof a.then == "function" ? (ec = a,
          du) : a
      }
    }
    var ec = null;

    function AR() {
      if (ec === null) throw Error(U(459));
      var A = ec;
      return ec = null, A
    }

    function tR(A) {
      if (A === du || A === ii) throw Error(U(483))
    }
    var vc = null,
      ae = 0;

    function ve(A) {
      var t = ae;
      return ae += 1, vc === null && (vc = []), td(vc, A, t)
    }

    function Oa(A, t) {
      t = t.props.ref, A.ref = t !== void 0 ? t : null
    }

    function Ce(A, t) {
      throw t.$$typeof === CO ? Error(U(525)) : (A = Object.prototype.toString.call(t), Error(
        U(31, A === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") +
          "}" : A)))
    }

    function ad(A) {
      function t(O, j) {
        if (A) {
          var H = O.deletions;
          H === null ? (O.deletions = [j], O.flags |= 16) : H.push(j)
        }
      }

      function a(O, j) {
        if (!A) return null;
        for (; j !== null;) t(O, j), j = j.sibling;
        return null
      }

      function c(O) {
        for (var j = new Map; O !== null;) O.key === null ? j.set(O.index, O) : j.set(O.key,
          O), O = O.sibling;
        return j
      }

      function u(O, j) {
        return O = $t(O, j), O.index = 0, O.sibling = null, O
      }

      function e(O, j, H) {
        return O.index = H, A ? (H = O.alternate, H !== null ? (H = H.index, H < j ? (O
          .flags |= 2, j) : H) : (O.flags |= 134217730, j)) : (O.flags |= 1048576, j)
      }

      function l(O) {
        return A && O.alternate === null && (O.flags |= 134217730), O
      }

      function n(O, j, H, E) {
        return j === null || j.tag !== 6 ? (j = _i(H, O.mode, E), j.return = O, j) : (j = u(j,
          H), j.return = O, j)
      }

      function r(O, j, H, E) {
        var s = H.type;
        return s === mc ? (O = p(O, j, H.props.children, E, H.key), Oa(O, H), O) : j !==
          null && (j.elementType === s || typeof s == "object" && s !== null && s.$$typeof ===
            Ea && _a(s) === j.type) ? (j = u(j, H.props), Oa(j, H), j.return = O, j) : (j =
            Il(H.type, H.key, H.props, null, O.mode, E), Oa(j, H), j.return = O, j)
      }

      function I(O, j, H, E) {
        return j === null || j.tag !== 4 || j.stateNode.containerInfo !== H.containerInfo || j
          .stateNode.implementation !== H.implementation ? (j = $i(H, O.mode, E), j.return =
            O, j) : (j = u(j, H.children || []), j.return = O, j)
      }

      function p(O, j, H, E, s) {
        return j === null || j.tag !== 7 ? (j = cc(H, O.mode, E, s), j.return = O, j) : (j =
          u(j, H), j.return = O, j)
      }

      function q(O, j, H) {
        if (typeof j == "string" && j !== "" || typeof j == "number" || typeof j == "bigint")
          return j = _i("" + j, O.mode, H), j.return = O, j;
        if (typeof j == "object" && j !== null) {
          switch (j.$$typeof) {
            case Le:
              return H = Il(j.type, j.key, j.props, null, O.mode, H), Oa(H, j), H.return = O,
                H;
            case mu:
              return j = $i(j, O.mode, H), j.return = O, j;
            case Ea:
              return j = _a(j), q(O, j, H)
          }
          if (fu(j) || Uu(j)) return j = cc(j, O.mode, H, null), j.return = O, j;
          if (typeof j.then == "function") return q(O, ve(j), H);
          if (j.$$typeof === Xt) return q(O, he(O, j), H);
          Ce(O, j)
        }
        return null
      }

      function R(O, j, H, E) {
        var s = j !== null ? j.key : null;
        if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
          return s !== null ? null : n(O, j, "" + H, E);
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case Le:
              return H.key === s ? r(O, j, H, E) : null;
            case mu:
              return H.key === s ? I(O, j, H, E) : null;
            case Ea:
              return H = _a(H), R(O, j, H, E)
          }
          if (fu(H) || Uu(H)) return s !== null ? null : p(O, j, H, E, null);
          if (typeof H.then == "function") return R(O, j, ve(H), E);
          if (H.$$typeof === Xt) return R(O, j, he(O, H), E);
          Ce(O, H)
        }
        return null
      }

      function d(O, j, H, E, s) {
        if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint")
          return O = O.get(H) || null, n(j, O, "" + E, s);
        if (typeof E == "object" && E !== null) {
          switch (E.$$typeof) {
            case Le:
              return O = O.get(E.key === null ? H : E.key) || null, r(j, O, E, s);
            case mu:
              return O = O.get(E.key === null ? H : E.key) || null, I(j, O, E, s);
            case Ea:
              return E = _a(E), d(O, j, H, E, s)
          }
          if (fu(E) || Uu(E)) return O = O.get(H) || null, p(j, O, E, s, null);
          if (typeof E.then == "function") return d(O, j, H, ve(E), s);
          if (E.$$typeof === Xt) return d(O, j, H, he(j, E), s);
          Ce(j, E)
        }
        return null
      }

      function S(O, j, H, E) {
        for (var s = null, P = null, k = j, o = j = 0, T = null; k !== null && o < H
          .length; o++) {
          k.index > o ? (T = k, k = null) : T = k.sibling;
          var y = R(O, k, H[o], E);
          if (y === null) {
            k === null && (k = T);
            break
          }
          A && k && y.alternate === null && t(O, k), j = e(y, j, o), P === null ? s = y : P
            .sibling = y, P = y, k = T
        }
        if (o === H.length) return a(O, k), L && Yt(O, o), s;
        if (k === null) {
          for (; o < H.length; o++) k = q(O, H[o], E), k !== null && (j = e(k, j, o), P ===
            null ? s = k : P.sibling = k, P = k);
          return L && Yt(O, o), s
        }
        for (k = c(k); o < H.length; o++) T = d(k, O, o, H[o], E), T !== null && (A && (y = T
            .alternate, y !== null && k.delete(y.key === null ? o : y.key)), j = e(T, j, o),
          P === null ? s = T : P.sibling = T, P = T);
        return A && k.forEach(function(G) {
          return t(O, G)
        }), L && Yt(O, o), s
      }

      function N(O, j, H, E) {
        if (H == null) throw Error(U(151));
        for (var s = null, P = null, k = j, o = j = 0, T = null, y = H.next(); k !== null && !
          y.done; o++, y = H.next()) {
          k.index > o ? (T = k, k = null) : T = k.sibling;
          var G = R(O, k, y.value, E);
          if (G === null) {
            k === null && (k = T);
            break
          }
          A && k && G.alternate === null && t(O, k), j = e(G, j, o), P === null ? s = G : P
            .sibling = G, P = G, k = T
        }
        if (y.done) return a(O, k), L && Yt(O, o), s;
        if (k === null) {
          for (; !y.done; o++, y = H.next()) y = q(O, y.value, E), y !== null && (j = e(y, j,
            o), P === null ? s = y : P.sibling = y, P = y);
          return L && Yt(O, o), s
        }
        for (k = c(k); !y.done; o++, y = H.next()) y = d(k, O, o, y.value, E), y !== null && (
          A && (T = y.alternate, T !== null && k.delete(T.key === null ? o : T.key)), j = e(
            y, j, o), P === null ? s = y : P.sibling = y, P = y);
        return A && k.forEach(function(DA) {
          return t(O, DA)
        }), L && Yt(O, o), s
      }

      function x(O, j, H, E) {
        if (typeof H == "object" && H !== null && H.type === mc && H.key === null && H.props
          .ref === void 0 && (H = H.props.children), typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case Le:
              A: {
                for (var s = H.key; j !== null;) {
                  if (j.key === s) {
                    if (s = H.type, s === mc) {
                      if (j.tag === 7) {
                        a(O, j.sibling), E = u(j, H.props.children), Oa(E, H), E.return = O,
                          O = E;
                        break A
                      }
                    } else if (j.elementType === s || typeof s == "object" && s !== null &&
                      s.$$typeof === Ea && _a(s) === j.type) {
                      a(O, j.sibling), E = u(j, H.props), Oa(E, H), E.return = O, O = E;
                      break A
                    }
                    a(O, j);
                    break
                  } else t(O, j);
                  j = j.sibling
                }
                H.type === mc ? (E = cc(H.props.children, O.mode, E, H.key), Oa(E, H), E
                  .return = O, O = E) : (E = Il(H.type, H.key, H.props, null, O.mode, E),
                  Oa(E, H), E.return = O, O = E)
              }
              return l(O);
            case mu:
              A: {
                for (s = H.key; j !== null;) {
                  if (j.key === s)
                    if (j.tag === 4 && j.stateNode.containerInfo === H.containerInfo && j
                      .stateNode.implementation === H.implementation) {
                      a(O, j.sibling), E = u(j, H.children || []), E.return = O, O = E;
                      break A
                    } else {
                      a(O, j);
                      break
                    }
                  else t(O, j);
                  j = j.sibling
                }
                E = $i(H, O.mode, E),
                E.return = O,
                O = E
              }
              return l(O);
            case Ea:
              return H = _a(H), x(O, j, H, E)
          }
          if (fu(H)) return S(O, j, H, E);
          if (Uu(H)) {
            if (s = Uu(H), typeof s != "function") throw Error(U(150));
            return H = s.call(H), N(O, j, H, E)
          }
          if (typeof H.then == "function") return x(O, j, ve(H), E);
          if (H.$$typeof === Xt) return x(O, j, he(O, H), E);
          Ce(O, H)
        }
        return typeof H == "string" && H !== "" || typeof H == "number" || typeof H ==
          "bigint" ? (H = "" + H, j !== null && j.tag === 6 ? (a(O, j.sibling), E = u(j, H), E
              .return = O, O = E) : (a(O, j), E = _i(H, O.mode, E), E.return = O, O = E), l(
            O)) : a(O, j)
      }
      return function(O, j, H, E) {
        try {
          ae = 0;
          var s = x(O, j, H, E);
          return vc = null, s
        } catch (k) {
          if (k === du || k === ii) throw k;
          var P = FA(29, k, null, O.mode);
          return P.lanes = E, P.return = O, P
        }
      }
    }
    var pc = ad(!0),
      cd = ad(!1),
      Sa = !1;

    function vI(A) {
      A.updateQueue = {
        baseState: A.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          lanes: 0,
          hiddenCallbacks: null
        },
        callbacks: null
      }
    }

    function wn(A, t) {
      A = A.updateQueue, t.updateQueue === A && (t.updateQueue = {
        baseState: A.baseState,
        firstBaseUpdate: A.firstBaseUpdate,
        lastBaseUpdate: A.lastBaseUpdate,
        shared: A.shared,
        callbacks: null
      })
    }

    function Ta(A) {
      return {
        lane: A,
        tag: 0,
        payload: null,
        callback: null,
        next: null
      }
    }

    function ma(A, t, a) {
      var c = A.updateQueue;
      if (c === null) return null;
      if (c = c.shared, (h & 2) !== 0) {
        var u = c.pending;
        return u === null ? t.next = t : (t.next = u.next, u.next = t), c.pending = t, t = Wl(
          A), Cr(A, null, a), t
      }
      return ei(A, c, t, a), Wl(A)
    }

    function wu(A, t, a) {
      if (t = t.updateQueue, t !== null && (t = t.shared, (a & 4194048) !== 0)) {
        var c = t.lanes;
        c &= A.pendingLanes, a |= c, t.lanes = a, Er(A, a)
      }
    }

    function tn(A, t) {
      var a = A.updateQueue,
        c = A.alternate;
      if (c !== null && (c = c.updateQueue, a === c)) {
        var u = null,
          e = null;
        if (a = a.firstBaseUpdate, a !== null) {
          do {
            var l = {
              lane: a.lane,
              tag: a.tag,
              payload: a.payload,
              callback: null,
              next: null
            };
            e === null ? u = e = l : e = e.next = l, a = a.next
          } while (a !== null);
          e === null ? u = e = t : e = e.next = t
        } else u = e = t;
        a = {
          baseState: c.baseState,
          firstBaseUpdate: u,
          lastBaseUpdate: e,
          shared: c.shared,
          callbacks: c.callbacks
        }, A.updateQueue = a;
        return
      }
      A = a.lastBaseUpdate, A === null ? a.firstBaseUpdate = t : A.next = t, a
        .lastBaseUpdate = t
    }
    var gn = !1;

    function gu() {
      if (gn) {
        var A = hc;
        if (A !== null) throw A
      }
    }

    function Ju(A, t, a, c) {
      gn = !1;
      var u = A.updateQueue;
      Sa = !1;
      var e = u.firstBaseUpdate,
        l = u.lastBaseUpdate,
        n = u.shared.pending;
      if (n !== null) {
        u.shared.pending = null;
        var r = n,
          I = r.next;
        r.next = null, l === null ? e = I : l.next = I, l = r;
        var p = A.alternate;
        p !== null && (p = p.updateQueue, n = p.lastBaseUpdate, n !== l && (n === null ? p
          .firstBaseUpdate = I : n.next = I, p.lastBaseUpdate = r))
      }
      if (e !== null) {
        var q = u.baseState;
        l = 0, p = I = r = null, n = e;
        do {
          var R = n.lane & -536870913,
            d = R !== n.lane;
          if (d ? (g & R) === R : (c & R) === R) {
            R !== 0 && R === qc && (gn = !0), p !== null && (p = p.next = {
              lane: 0,
              tag: n.tag,
              payload: n.payload,
              callback: null,
              next: null
            });
            A: {
              var S = A,
                N = n;R = t;
              var x = a;
              switch (N.tag) {
                case 1:
                  if (S = N.payload, typeof S == "function") {
                    q = S.call(x, q, R);
                    break A
                  }
                  q = S;
                  break A;
                case 3:
                  S.flags = S.flags & -65537 | 128;
                case 0:
                  if (S = N.payload, R = typeof S == "function" ? S.call(x, q, R) : S, R ==
                    null) break A;
                  q = AA({}, q, R);
                  break A;
                case 2:
                  Sa = !0
              }
            }
            R = n.callback, R !== null && (A.flags |= 64, d && (A.flags |= 8192), d = u
              .callbacks, d === null ? u.callbacks = [R] : d.push(R))
          } else d = {
            lane: R,
            tag: n.tag,
            payload: n.payload,
            callback: n.callback,
            next: null
          }, p === null ? (I = p = d, r = q) : p = p.next = d, l |= R;
          if (n = n.next, n === null) {
            if (n = u.shared.pending, n === null) break;
            d = n, n = d.next, d.next = null, u.lastBaseUpdate = d, u.shared.pending = null
          }
        } while (!0);
        p === null && (r = q), u.baseState = r, u.firstBaseUpdate = I, u.lastBaseUpdate = p,
          e === null && (u.shared.lanes = 0), Ja |= l, A.lanes = l, A.memoizedState = q
      }
    }

    function ud(A, t) {
      if (typeof A != "function") throw Error(U(191, A));
      A.call(t)
    }

    function ed(A, t) {
      var a = A.callbacks;
      if (a !== null)
        for (A.callbacks = null, A = 0; A < a.length; A++) ud(a[A], t)
    }
    var wa = Qt(null),
      Kl = Qt(0);

    function aR(A, t) {
      A = la, eA(Kl, A), eA(wa, t), la = A | t.baseLanes
    }

    function Jn() {
      eA(Kl, la), eA(wa, wa.current)
    }

    function CI() {
      la = Kl.current, TA(wa), TA(Kl)
    }
    var zA = Qt(null),
      ZA = null;

    function fa(A) {
      var t = A.alternate;
      eA(mA, mA.current & 1), eA(zA, A), ZA === null && (t === null || wa.current !== null ||
        t.memoizedState !== null) && (ZA = A)
    }

    function Qn(A) {
      eA(mA, mA.current), eA(zA, A), ZA === null && (ZA = A)
    }

    function ld(A) {
      A.tag === 22 ? (eA(mA, mA.current), eA(zA, A), ZA === null && (ZA = A)) : za()
    }

    function za() {
      eA(mA, mA.current), eA(zA, zA.current)
    }

    function ct(A) {
      TA(zA), ZA === A && (ZA = null), TA(mA)
    }
    var mA = Qt(0);

    function ce(A, t) {
      eA(zA, zA.current), eA(mA, t)
    }

    function MI(A) {
      TA(mA), TA(zA), ZA === A && (ZA = null)
    }

    function Gl(A) {
      for (var t = A; t !== null;) {
        if (t.tag === 13) {
          var a = t.memoizedState;
          if (a !== null && (a = a.dehydrated, a === null || oI(a) || Nq(a))) return t
        } else if (t.tag === 19 && t.memoizedProps.revealOrder !== "independent") {
          if ((t.flags & 128) !== 0) return t
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue
        }
        if (t === A) break;
        for (; t.sibling === null;) {
          if (t.return === null || t.return === A) return null;
          t = t.return
        }
        t.sibling.return = t.return, t = t.sibling
      }
      return null
    }
    var ca = 0,
      X = null,
      _ = null,
      jA = null,
      Xl = !1,
      Cc = !1,
      Rc = !1,
      Ll = 0,
      ue = 0,
      Mc = null,
      j2 = 0;

    function pA() {
      throw Error(U(321))
    }

    function FI(A, t) {
      if (t === null) return !1;
      for (var a = 0; a < t.length && a < A.length; a++)
        if (!qt(A[a], t[a])) return !1;
      return !0
    }

    function YI(A, t, a, c, u, e) {
      return ca = e, X = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, m.H =
        A === null || A.memoizedState === null ? Xd : Ld, Rc = !1, e = a(c, u), Rc = !1, Cc &&
        (e = nd(t, a, c, u)), id(A), e
    }

    function id(A) {
      m.H = Zl;
      var t = _ !== null && _.next !== null;
      if (ca = 0, jA = _ = X = null, Xl = !1, ue = 0, Mc = null, t) throw Error(U(300));
      A === null || OA || (A = A.dependencies, A !== null && fl(A) && (OA = !0))
    }

    function nd(A, t, a, c) {
      X = A;
      var u = 0;
      do {
        if (Cc && (Mc = null), ue = 0, Cc = !1, 25 <= u) throw Error(U(301));
        if (u += 1, jA = _ = null, A.updateQueue != null) {
          var e = A.updateQueue;
          e.lastEffect = null, e.events = null, e.stores = null, e.memoCache != null && (e
            .memoCache.index = 0)
        }
        m.H = x2, e = t(a, c)
      } while (Cc);
      return e
    }

    function b2() {
      var A = m.H,
        t = A.useState()[0];
      return t = typeof t.then == "function" ? He(t) : t, A = A.useState()[0], (_ !== null ? _
        .memoizedState : null) !== A && (X.flags |= 1024), t
    }

    function _I() {
      var A = Ll !== 0;
      return Ll = 0, A
    }

    function $I(A, t, a) {
      t.updateQueue = A.updateQueue, t.flags &= -2053, A.lanes &= ~a
    }

    function Aq(A) {
      if (Xl) {
        for (A = A.memoizedState; A !== null;) {
          var t = A.queue;
          t !== null && (t.pending = null), A = A.next
        }
        Xl = !1
      }
      ca = 0, jA = _ = X = null, Cc = !1, ue = Ll = 0, Mc = null
    }

    function BA() {
      var A = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return jA === null ? X.memoizedState = jA = A : jA = jA.next = A, jA
    }

    function dA() {
      if (_ === null) {
        var A = X.alternate;
        A = A !== null ? A.memoizedState : null
      } else A = _.next;
      var t = jA === null ? X.memoizedState : jA.next;
      if (t !== null) jA = t, _ = A;
      else {
        if (A === null) throw X.alternate === null ? Error(U(467)) : Error(U(310));
        _ = A, A = {
          memoizedState: _.memoizedState,
          baseState: _.baseState,
          baseQueue: _.baseQueue,
          queue: _.queue,
          next: null
        }, jA === null ? X.memoizedState = jA = A : jA = jA.next = A
      }
      return jA
    }

    function ni() {
      return {
        lastEffect: null,
        events: null,
        stores: null,
        memoCache: null
      }
    }

    function He(A) {
      var t = ue;
      return ue += 1, Mc === null && (Mc = []), A = td(Mc, A, t), t = X, (jA === null ? t
        .memoizedState : jA.next) === null && (t = t.alternate, m.H = t === null || t
        .memoizedState === null ? Xd : Ld), A
    }

    function Ii(A) {
      if (A !== null && typeof A == "object") {
        if (typeof A.then == "function") return He(A);
        if (A.$$typeof === YO) return;
        if (A.$$typeof === Xt) return WA(A)
      }
      throw Error(U(438, String(A)))
    }

    function tq(A) {
      var t = null,
        a = X.updateQueue;
      if (a !== null && (t = a.memoCache), t == null) {
        var c = X.alternate;
        c !== null && (c = c.updateQueue, c !== null && (c = c.memoCache, c != null && (t = {
          data: c.data.map(function(u) {
            return u.slice()
          }),
          index: 0
        })))
      }
      if (t == null && (t = {
          data: [],
          index: 0
        }), a === null && (a = ni(), X.updateQueue = a), a.memoCache = t, a = t.data[t.index],
        a === void 0)
        for (a = t.data[t.index] = Array(A), c = 0; c < A; c++) a[c] = FO;
      return t.index++, a
    }

    function ua(A, t) {
      return typeof t == "function" ? t(A) : t
    }

    function Rl(A) {
      var t = dA();
      return aq(t, _, A)
    }

    function aq(A, t, a) {
      var c = A.queue;
      if (c === null) throw Error(U(311));
      c.lastRenderedReducer = a;
      var u = A.baseQueue,
        e = c.pending;
      if (e !== null) {
        if (u !== null) {
          var l = u.next;
          u.next = e.next, e.next = l
        }
        t.baseQueue = u = e, c.pending = null
      }
      if (e = A.baseState, u === null) A.memoizedState = e;
      else {
        t = u.next;
        var n = l = null,
          r = null,
          I = t,
          p = !1;
        do {
          var q = I.lane & -536870913;
          if (q !== I.lane ? (g & q) === q : (ca & q) === q) {
            var R = I.revertLane;
            if (R === 0) r !== null && (r = r.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }), q === qc && (p = !0);
            else if ((ca & R) === R) {
              I = I.next, R === qc && (p = !0);
              continue
            } else q = {
              lane: 0,
              revertLane: I.revertLane,
              gesture: null,
              action: I.action,
              hasEagerState: I.hasEagerState,
              eagerState: I.eagerState,
              next: null
            }, r === null ? (n = r = q, l = e) : r = r.next = q, X.lanes |= R, Ja |= R;
            q = I.action, Rc && a(e, q), e = I.hasEagerState ? I.eagerState : a(e, q)
          } else R = {
            lane: q,
            revertLane: I.revertLane,
            gesture: I.gesture,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          }, r === null ? (n = r = R, l = e) : r = r.next = R, X.lanes |= q, Ja |= q;
          I = I.next
        } while (I !== null && I !== t);
        if (r === null ? l = e : r.next = n, !qt(e, A.memoizedState) && (OA = !0, p && (a =
            hc, a !== null))) throw a;
        A.memoizedState = e, A.baseState = l, A.baseQueue = r, c.lastRenderedState = e
      }
      return u === null && (c.lanes = 0), [A.memoizedState, c.dispatch]
    }

    function an(A) {
      var t = dA(),
        a = t.queue;
      if (a === null) throw Error(U(311));
      a.lastRenderedReducer = A;
      var c = a.dispatch,
        u = a.pending,
        e = t.memoizedState;
      if (u !== null) {
        a.pending = null;
        var l = u = u.next;
        do e = A(e, l.action), l = l.next; while (l !== u);
        qt(e, t.memoizedState) || (OA = !0), t.memoizedState = e, t.baseQueue === null && (t
          .baseState = e), a.lastRenderedState = e
      }
      return [e, c]
    }

    function Id(A, t, a) {
      var c = X,
        u = dA(),
        e = L;
      if (e) {
        if (a === void 0) throw Error(U(407));
        a = a()
      } else a = t();
      var l = !qt((_ || u).memoizedState, a);
      if (l && (u.memoizedState = a, OA = !0), u = u.queue, cq(Rd.bind(null, c, u, A), [A]),
        A = u.getSnapshot !== t || l || jA !== null && (jA.memoizedState.tag & 1) !== 0, au(
          A ? 9 : 8, {
            destroy: void 0
          }, pd.bind(null, c, u, a, t), null), A) {
        if (c.flags |= 2048, $ === null) throw Error(U(349));
        e || (ca & 127) !== 0 || qd(c, t, a)
      }
      return a
    }

    function qd(A, t, a) {
      A.flags |= 16384, A = {
        getSnapshot: t,
        value: a
      }, t = X.updateQueue, t === null ? (t = ni(), X.updateQueue = t, t.stores = [A]) : (
        a = t.stores, a === null ? t.stores = [A] : a.push(A))
    }

    function pd(A, t, a, c) {
      t.value = a, t.getSnapshot = c, rd(t) && dd(A)
    }

    function Rd(A, t, a) {
      return a(function() {
        rd(t) && dd(A)
      })
    }

    function rd(A) {
      var t = A.getSnapshot;
      A = A.value;
      try {
        var a = t();
        return !qt(A, a)
      } catch {
        return !0
      }
    }

    function dd(A) {
      var t = Vc(A, 2);
      t !== null && YA(t, A, 2)
    }

    function Bn(A) {
      var t = BA();
      if (typeof A == "function") {
        var a = A;
        if (A = a(), Rc) {
          xa(!0);
          try {
            a()
          } finally {
            xa(!1)
          }
        }
      }
      return t.memoizedState = t.baseState = A, t.queue = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ua,
        lastRenderedState: A
      }, t
    }

    function jd(A, t, a, c) {
      return A.baseState = a, aq(A, _, typeof c == "function" ? c : ua)
    }

    function O2(A, t, a, c, u) {
      if (pi(A)) throw Error(U(485));
      if (A = t.action, A !== null) {
        var e = {
          payload: u,
          action: A,
          next: null,
          isTransition: !0,
          status: "pending",
          value: null,
          reason: null,
          listeners: [],
          then: function(l) {
            e.listeners.push(l)
          }
        };
        m.T !== null ? a(!0) : e.isTransition = !1, c(e), a = t.pending, a === null ? (e
          .next = t.pending = e, bd(t, e)) : (e.next = a.next, t.pending = a.next = e)
      }
    }

    function bd(A, t) {
      var a = t.action,
        c = t.payload,
        u = A.state;
      if (t.isTransition) {
        var e = m.T,
          l = {};
        l.types = e !== null ? e.types : null, m.T = l;
        try {
          var n = a(u, c),
            r = m.S;
          r !== null && r(l, n), cR(A, t, n)
        } catch (I) {
          hn(A, t, I)
        } finally {
          e !== null && l.types !== null && (e.types = l.types), m.T = e
        }
      } else try {
        e = a(u, c), cR(A, t, e)
      } catch (I) {
        hn(A, t, I)
      }
    }

    function cR(A, t, a) {
      a !== null && typeof a == "object" && typeof a.then == "function" ? a.then(function(c) {
        uR(A, t, c)
      }, function(c) {
        return hn(A, t, c)
      }) : uR(A, t, a)
    }

    function uR(A, t, a) {
      t.status = "fulfilled", t.value = a, Od(t), A.state = a, t = A.pending, t !== null && (
        a = t.next, a === t ? A.pending = null : (a = a.next, t.next = a, bd(A, a)))
    }

    function hn(A, t, a) {
      var c = A.pending;
      if (A.pending = null, c !== null) {
        c = c.next;
        do t.status = "rejected", t.reason = a, Od(t), t = t.next; while (t !== c)
      }
      A.action = null
    }

    function Od(A) {
      A = A.listeners;
      for (var t = 0; t < A.length; t++)(0, A[t])()
    }

    function Vd(A, t) {
      return t
    }

    function eR(A, t) {
      if (L) {
        var a = $.formState;
        if (a !== null) {
          A: {
            var c = X;
            if (L) {
              if (uA) {
                t: {
                  for (var u = uA, e = Ht; u.nodeType !== 8;) {
                    if (!e) {
                      u = null;
                      break t
                    }
                    if (u = Et(u.nextSibling), u === null) {
                      u = null;
                      break t
                    }
                  }
                  e = u.data,
                  u = e === "F!" || e === "F" ? u : null
                }
                if (u) {
                  uA = Et(u.nextSibling), c = u.data === "F!";
                  break A
                }
              }
              Da(c)
            }
            c = !1
          }
          c && (t = a[0])
        }
      }
      return a = BA(), a.memoizedState = a.baseState = t, c = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Vd,
        lastRenderedState: t
      }, a.queue = c, a = zd.bind(null, X, c), c.dispatch = a, c = Bn(!1), e = iq.bind(null,
        X, !1, c.queue), c = BA(), u = {
        state: t,
        dispatch: null,
        action: A,
        pending: null
      }, c.queue = u, a = O2.bind(null, X, u, e, a), u.dispatch = a, c.memoizedState = A, [
        t, a, !1
      ]
    }

    function lR(A) {
      var t = dA();
      return Hd(t, _, A)
    }

    function Hd(A, t, a) {
      if (t = aq(A, t, Vd)[0], A = Rl(ua)[0], typeof t == "object" && t !== null && typeof t
        .then == "function") try {
        var c = He(t)
      } catch (l) {
        throw l === du ? ii : l
      } else c = t;
      t = dA();
      var u = t.queue,
        e = u.dispatch;
      return a !== t.memoizedState && (X.flags |= 2048, au(9, {
        destroy: void 0
      }, V2.bind(null, u, a), null)), [c, e, A]
    }

    function V2(A, t) {
      A.action = t
    }

    function iR(A) {
      var t = dA(),
        a = _;
      if (a !== null) return Hd(t, a, A);
      dA(), t = t.memoizedState, a = dA();
      var c = a.queue.dispatch;
      return a.memoizedState = A, [t, c, !1]
    }

    function au(A, t, a, c) {
      return A = {
          tag: A,
          create: a,
          deps: c,
          inst: t,
          next: null
        }, t = X.updateQueue, t === null && (t = ni(), X.updateQueue = t), a = t.lastEffect,
        a === null ? t.lastEffect = A.next = A : (c = a.next, a.next = A, A.next = c, t
          .lastEffect = A), A
    }

    function Ed() {
      return dA().memoizedState
    }

    function rl(A, t, a, c) {
      var u = BA();
      X.flags |= A, u.memoizedState = au(1 | t, {
        destroy: void 0
      }, a, c === void 0 ? null : c)
    }

    function qi(A, t, a, c) {
      var u = dA();
      c = c === void 0 ? null : c;
      var e = u.memoizedState.inst;
      _ !== null && c !== null && FI(c, _.memoizedState.deps) ? u.memoizedState = au(t, e, a,
        c) : (X.flags |= A, u.memoizedState = au(1 | t, e, a, c))
    }

    function nR(A, t) {
      rl(8390656, 8, A, t)
    }

    function cq(A, t) {
      qi(2048, 8, A, t)
    }

    function H2(A) {
      X.flags |= 4;
      var t = X.updateQueue;
      if (t === null) t = ni(), X.updateQueue = t, t.events = [A];
      else {
        var a = t.events;
        a === null ? t.events = [A] : a.push(A)
      }
    }

    function Sd(A) {
      var t = dA().memoizedState;
      return H2({
          ref: t,
          nextImpl: A
        }),
        function() {
          if ((h & 2) !== 0) throw Error(U(440));
          return t.impl.apply(void 0, arguments)
        }
    }

    function Nd(A, t) {
      return qi(4, 2, A, t)
    }

    function xd(A, t) {
      return qi(4, 4, A, t)
    }

    function od(A, t) {
      if (typeof t == "function") {
        A = A();
        var a = t(A);
        return function() {
          typeof a == "function" ? a() : t(null)
        }
      }
      if (t != null) return A = A(), t.current = A,
        function() {
          t.current = null
        }
    }

    function sd(A, t, a) {
      a = a != null ? a.concat([A]) : null, qi(4, 4, od.bind(null, t, A), a)
    }

    function uq() {}

    function Ud(A, t) {
      var a = dA();
      t = t === void 0 ? null : t;
      var c = a.memoizedState;
      return t !== null && FI(t, c[1]) ? c[0] : (a.memoizedState = [A, t], A)
    }

    function yd(A, t) {
      var a = dA();
      t = t === void 0 ? null : t;
      var c = a.memoizedState;
      if (t !== null && FI(t, c[1])) return c[0];
      if (c = A(), Rc) {
        xa(!0);
        try {
          A()
        } finally {
          xa(!1)
        }
      }
      return a.memoizedState = [c, t], c
    }

    function eq(A, t, a) {
      return a === void 0 || (ca & 1073741824) !== 0 && (g & 261930) === 0 ? A.memoizedState =
        t : (A.memoizedState = a, A = H1(), X.lanes |= A, Ja |= A, a)
    }

    function Pd(A, t, a, c) {
      return qt(a, t) ? a : wa.current !== null ? (A = eq(A, a, c), qt(A, t) || (OA = !0),
        A) : (ca & 106) === 0 || (ca & 1073741824) !== 0 && (g & 261930) === 0 ? (OA = !0, A
          .memoizedState = a) : (A = H1(), X.lanes |= A, Ja |= A, t)
    }

    function kd(A, t, a, c, u) {
      var e = v.p;
      v.p = e !== 0 && 8 > e ? e : 8;
      var l = m.T,
        n = {};
      n.types = l !== null ? l.types : null, m.T = n, iq(A, !1, t, a);
      try {
        var r = u(),
          I = m.S;
        if (I !== null && I(n, r), r !== null && typeof r == "object" && typeof r.then ==
          "function") {
          var p = d2(r, c);
          Qu(A, t, p, It(A))
        } else Qu(A, t, c, It(A))
      } catch (q) {
        Qu(A, t, {
          then: function() {},
          status: "rejected",
          reason: q
        }, It())
      } finally {
        v.p = e, l !== null && n.types !== null && (l.types = n.types), m.T = l
      }
    }

    function E2() {}

    function vn(A, t, a, c) {
      if (A.tag !== 5) throw Error(U(476));
      var u = Wd(A).queue;
      kd(A, u, t, ac, a === null ? E2 : function() {
        return Td(A), a(c)
      })
    }

    function Wd(A) {
      var t = A.memoizedState;
      if (t !== null) return t;
      t = {
        memoizedState: ac,
        baseState: ac,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ua,
          lastRenderedState: ac
        },
        next: null
      };
      var a = {};
      return t.next = {
        memoizedState: a,
        baseState: a,
        baseQueue: null,
        queue: {
          pending: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: ua,
          lastRenderedState: a
        },
        next: null
      }, A.memoizedState = t, A = A.alternate, A !== null && (A.memoizedState = t), t
    }

    function Td(A) {
      var t = Wd(A);
      t.next === null && (t = A.alternate.memoizedState), Qu(A, t.next.queue, {}, It())
    }

    function lq() {
      return WA(Iu)
    }

    function md() {
      return dA().memoizedState
    }

    function fd() {
      return dA().memoizedState
    }

    function S2(A) {
      for (var t = A.return; t !== null;) {
        switch (t.tag) {
          case 24:
          case 3:
            var a = It();
            A = Ta(a);
            var c = ma(t, A, a);
            c !== null && (YA(c, t, a), wu(c, t, a)), t = {
              cache: QI()
            }, A.payload = t;
            return
        }
        t = t.return
      }
    }

    function N2(A, t, a) {
      var c = It();
      a = {
        lane: c,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      }, pi(A) ? Kd(t, a) : (a = wI(A, t, a, c), a !== null && (YA(a, A, c), Gd(a, t, c)))
    }

    function zd(A, t, a) {
      var c = It();
      Qu(A, t, a, c)
    }

    function Qu(A, t, a, c) {
      var u = {
        lane: c,
        revertLane: 0,
        gesture: null,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (pi(A)) Kd(t, u);
      else {
        var e = A.alternate;
        if (A.lanes === 0 && (e === null || e.lanes === 0) && (e = t.lastRenderedReducer,
            e !== null)) try {
          var l = t.lastRenderedState,
            n = e(l, a);
          if (u.hasEagerState = !0, u.eagerState = n, qt(n, l)) return ei(A, t, u, 0), $ ===
            null && ui(), !1
        } catch {}
        if (a = wI(A, t, u, c), a !== null) return YA(a, A, c), Gd(a, t, c), !0
      }
      return !1
    }

    function iq(A, t, a, c) {
      if (c = {
          lane: 2,
          revertLane: Vq(),
          gesture: null,
          action: c,
          hasEagerState: !1,
          eagerState: null,
          next: null
        }, pi(A)) {
        if (t) throw Error(U(479))
      } else t = wI(A, a, c, 2), t !== null && YA(t, A, 2)
    }

    function pi(A) {
      var t = A.alternate;
      return A === X || t !== null && t === X
    }

    function Kd(A, t) {
      Cc = Xl = !0;
      var a = A.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), A.pending = t
    }

    function Gd(A, t, a) {
      if ((a & 4194048) !== 0) {
        var c = t.lanes;
        c &= A.pendingLanes, a |= c, t.lanes = a, Er(A, a)
      }
    }
    var Zl = {
        readContext: WA,
        use: Ii,
        useCallback: pA,
        useContext: pA,
        useEffect: pA,
        useImperativeHandle: pA,
        useLayoutEffect: pA,
        useInsertionEffect: pA,
        useMemo: pA,
        useReducer: pA,
        useRef: pA,
        useState: pA,
        useDebugValue: pA,
        useDeferredValue: pA,
        useTransition: pA,
        useSyncExternalStore: pA,
        useId: pA,
        useHostTransitionStatus: pA,
        useFormState: pA,
        useActionState: pA,
        useOptimistic: pA,
        useMemoCache: pA,
        useCacheRefresh: pA,
        useEffectEvent: pA
      },
      Xd = {
        readContext: WA,
        use: Ii,
        useCallback: function(A, t) {
          return BA().memoizedState = [A, t === void 0 ? null : t], A
        },
        useContext: WA,
        useEffect: nR,
        useImperativeHandle: function(A, t, a) {
          a = a != null ? a.concat([A]) : null, rl(4194308, 4, od.bind(null, t, A), a)
        },
        useLayoutEffect: function(A, t) {
          return rl(4194308, 4, A, t)
        },
        useInsertionEffect: function(A, t) {
          rl(4, 2, A, t)
        },
        useMemo: function(A, t) {
          var a = BA();
          t = t === void 0 ? null : t;
          var c = A();
          if (Rc) {
            xa(!0);
            try {
              A()
            } finally {
              xa(!1)
            }
          }
          return a.memoizedState = [c, t], c
        },
        useReducer: function(A, t, a) {
          var c = BA();
          if (a !== void 0) {
            var u = a(t);
            if (Rc) {
              xa(!0);
              try {
                a(t)
              } finally {
                xa(!1)
              }
            }
          } else u = t;
          return c.memoizedState = c.baseState = u, A = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: A,
            lastRenderedState: u
          }, c.queue = A, A = A.dispatch = N2.bind(null, X, A), [c.memoizedState, A]
        },
        useRef: function(A) {
          var t = BA();
          return A = {
            current: A
          }, t.memoizedState = A
        },
        useState: function(A) {
          A = Bn(A);
          var t = A.queue,
            a = zd.bind(null, X, t);
          return t.dispatch = a, [A.memoizedState, a]
        },
        useDebugValue: uq,
        useDeferredValue: function(A, t) {
          var a = BA();
          return eq(a, A, t)
        },
        useTransition: function() {
          var A = Bn(!1);
          return A = kd.bind(null, X, A.queue, !0, !1), BA().memoizedState = A, [!1, A]
        },
        useSyncExternalStore: function(A, t, a) {
          var c = X,
            u = BA();
          if (L) {
            if (a === void 0) throw Error(U(407));
            a = a()
          } else {
            if (a = t(), $ === null) throw Error(U(349));
            (g & 127) !== 0 || qd(c, t, a)
          }
          u.memoizedState = a;
          var e = {
            value: a,
            getSnapshot: t
          };
          return u.queue = e, nR(Rd.bind(null, c, e, A), [A]), c.flags |= 2048, au(9, {
            destroy: void 0
          }, pd.bind(null, c, e, a, t), null), a
        },
        useId: function() {
          var A = BA(),
            t = $.identifierPrefix;
          if (L) {
            var a = Dt,
              c = Zt;
            a = (c & ~(1 << 32 - nt(c) - 1)).toString(32) + a, t = "_" + t + "R_" + a, a =
              Ll++, 0 < a && (t += "H" + a.toString(32)), t += "_"
          } else a = j2++, t = "_" + t + "r_" + a.toString(32) + "_";
          return A.memoizedState = t
        },
        useHostTransitionStatus: lq,
        useFormState: eR,
        useActionState: eR,
        useOptimistic: function(A) {
          var t = BA();
          t.memoizedState = t.baseState = A;
          var a = {
            pending: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: null,
            lastRenderedState: null
          };
          return t.queue = a, t = iq.bind(null, X, !0, a), a.dispatch = t, [A, t]
        },
        useMemoCache: tq,
        useCacheRefresh: function() {
          return BA().memoizedState = S2.bind(null, X)
        },
        useEffectEvent: function(A) {
          var t = BA(),
            a = {
              impl: A
            };
          return t.memoizedState = a,
            function() {
              if ((h & 2) !== 0) throw Error(U(440));
              return a.impl.apply(void 0, arguments)
            }
        }
      },
      Ld = {
        readContext: WA,
        use: Ii,
        useCallback: Ud,
        useContext: WA,
        useEffect: cq,
        useImperativeHandle: sd,
        useInsertionEffect: Nd,
        useLayoutEffect: xd,
        useMemo: yd,
        useReducer: Rl,
        useRef: Ed,
        useState: function() {
          return Rl(ua)
        },
        useDebugValue: uq,
        useDeferredValue: function(A, t) {
          var a = dA();
          return Pd(a, _.memoizedState, A, t)
        },
        useTransition: function() {
          var A = Rl(ua)[0],
            t = dA().memoizedState;
          return [typeof A == "boolean" ? A : He(A), t]
        },
        useSyncExternalStore: Id,
        useId: md,
        useHostTransitionStatus: lq,
        useFormState: lR,
        useActionState: lR,
        useOptimistic: function(A, t) {
          var a = dA();
          return jd(a, _, A, t)
        },
        useMemoCache: tq,
        useCacheRefresh: fd,
        useEffectEvent: Sd
      },
      x2 = {
        readContext: WA,
        use: Ii,
        useCallback: Ud,
        useContext: WA,
        useEffect: cq,
        useImperativeHandle: sd,
        useInsertionEffect: Nd,
        useLayoutEffect: xd,
        useMemo: yd,
        useReducer: an,
        useRef: Ed,
        useState: function() {
          return an(ua)
        },
        useDebugValue: uq,
        useDeferredValue: function(A, t) {
          var a = dA();
          return _ === null ? eq(a, A, t) : Pd(a, _.memoizedState, A, t)
        },
        useTransition: function() {
          var A = an(ua)[0],
            t = dA().memoizedState;
          return [typeof A == "boolean" ? A : He(A), t]
        },
        useSyncExternalStore: Id,
        useId: md,
        useHostTransitionStatus: lq,
        useFormState: iR,
        useActionState: iR,
        useOptimistic: function(A, t) {
          var a = dA();
          return _ !== null ? jd(a, _, A, t) : (a.baseState = A, [A, a.queue.dispatch])
        },
        useMemoCache: tq,
        useCacheRefresh: fd,
        useEffectEvent: Sd
      };

    function cn(A, t, a, c) {
      t = A.memoizedState, a = a(c, t), a = a == null ? t : AA({}, t, a), A.memoizedState = a,
        A.lanes === 0 && (A.updateQueue.baseState = a)
    }
    var Cn = {
      enqueueSetState: function(A, t, a) {
        A = A._reactInternals;
        var c = It(),
          u = Ta(c);
        u.payload = t, a != null && (u.callback = a), t = ma(A, u, c), t !== null && (YA(
          t, A, c), wu(t, A, c))
      },
      enqueueReplaceState: function(A, t, a) {
        A = A._reactInternals;
        var c = It(),
          u = Ta(c);
        u.tag = 1, u.payload = t, a != null && (u.callback = a), t = ma(A, u, c), t !==
          null && (YA(t, A, c), wu(t, A, c))
      },
      enqueueForceUpdate: function(A, t) {
        A = A._reactInternals;
        var a = It(),
          c = Ta(a);
        c.tag = 2, t != null && (c.callback = t), t = ma(A, c, a), t !== null && (YA(t, A,
          a), wu(t, A, a))
      }
    };

    function IR(A, t, a, c, u, e, l) {
      return A = A.stateNode, typeof A.shouldComponentUpdate == "function" ? A
        .shouldComponentUpdate(c, e, l) : t.prototype && t.prototype.isPureReactComponent ? !
        $u(a, c) || !$u(u, e) : !0
    }

    function qR(A, t, a, c) {
      A = t.state, typeof t.componentWillReceiveProps == "function" && t
        .componentWillReceiveProps(a, c), typeof t.UNSAFE_componentWillReceiveProps ==
        "function" && t.UNSAFE_componentWillReceiveProps(a, c), t.state !== A && Cn
        .enqueueReplaceState(t, t.state, null)
    }

    function rc(A, t) {
      var a = t;
      if ("ref" in t) {
        a = {};
        for (var c in t) c !== "ref" && (a[c] = t[c])
      }
      if (A = A.defaultProps) {
        a === t && (a = AA({}, a));
        for (var u in A) a[u] === void 0 && (a[u] = A[u])
      }
      return a
    }

    function Zd(A) {
      kl(A)
    }

    function Dd(A) {
      console.error(A)
    }

    function wd(A) {
      kl(A)
    }

    function Dl(A, t) {
      try {
        var a = A.onUncaughtError;
        a(t.value, {
          componentStack: t.stack
        })
      } catch (c) {
        setTimeout(function() {
          throw c
        })
      }
    }

    function pR(A, t, a) {
      try {
        var c = A.onCaughtError;
        c(a.value, {
          componentStack: a.stack,
          errorBoundary: t.tag === 1 ? t.stateNode : null
        })
      } catch (u) {
        setTimeout(function() {
          throw u
        })
      }
    }

    function Mn(A, t, a) {
      return a = Ta(a), a.tag = 3, a.payload = {
        element: null
      }, a.callback = function() {
        Dl(A, t)
      }, a
    }

    function gd(A) {
      return A = Ta(A), A.tag = 3, A
    }

    function Jd(A, t, a, c) {
      var u = a.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var e = c.value;
        A.payload = function() {
          return u(e)
        }, A.callback = function() {
          pR(t, a, c)
        }
      }
      var l = a.stateNode;
      l !== null && typeof l.componentDidCatch == "function" && (A.callback = function() {
        pR(t, a, c), typeof u != "function" && (Ka === null ? Ka = new Set([this]) : Ka
          .add(this));
        var n = c.stack;
        this.componentDidCatch(c.value, {
          componentStack: n !== null ? n : ""
        })
      })
    }

    function o2(A, t, a, c, u) {
      if (a.flags |= 32768, c !== null && typeof c == "object" && typeof c.then ==
        "function") {
        if (t = a.alternate, t !== null && nc(t, a, u, !0), a = zA.current, a !== null) {
          switch (a.tag) {
            case 31:
            case 13:
            case 19:
              return ZA === null ? Cl() : a.alternate === null && RA === 0 && (RA = 3), a
                .flags &= -257, a.flags |= 65536, a.lanes = u, c === zl ? a.flags |= 16384 : (
                  t = a.updateQueue, t === null ? a.updateQueue = new Set([c]) : t.add(c), pn(
                    A, c, u)), !1;
            case 22:
              return a.flags |= 65536, c === zl ? a.flags |= 16384 : (t = a.updateQueue, t ===
                null ? (t = {
                  transitions: null,
                  markerInstances: null,
                  retryQueue: new Set([c])
                }, a.updateQueue = t) : (a = t.retryQueue, a === null ? t.retryQueue =
                  new Set([c]) : a.add(c)), pn(A, c, u)), !1
          }
          throw Error(U(435, a.tag))
        }
        return pn(A, c, u), Cl(), !1
      }
      if (L) return t = zA.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256),
        t.flags |= 65536, t.lanes = u, c !== Xn && (A = Error(U(422), {
          cause: c
        }), te(Vt(A, a)))) : (c !== Xn && (t = Error(U(423), {
          cause: c
        }), te(Vt(t, a))), A = A.current.alternate, A.flags |= 65536, u &= -u, A.lanes |=
        u, c = Vt(c, a), u = Mn(A.stateNode, c, u), tn(A, u), RA !== 4 && (RA = 2)), !1;
      var e = Error(U(520), {
        cause: c
      });
      if (e = Vt(e, a), Cu === null ? Cu = [e] : Cu.push(e), RA !== 4 && (RA = 2), t === null)
        return !0;
      c = Vt(c, a), a = t;
      do {
        switch (a.tag) {
          case 3:
            return a.flags |= 65536, A = u & -u, a.lanes |= A, A = Mn(a.stateNode, c, A), tn(
              a, A), !1;
          case 1:
            if (t = a.type, e = a.stateNode, (a.flags & 128) === 0 && (typeof t
                .getDerivedStateFromError == "function" || e !== null && typeof e
                .componentDidCatch == "function" && (Ka === null || !Ka.has(e)))) return a
              .flags |= 65536, u &= -u, a.lanes |= u, u = gd(u), Jd(u, A, a, c), tn(a, u), !
              1;
            break;
          case 22:
            if (a.memoizedState !== null) return a.flags |= 65536, !1
        }
        a = a.return
      } while (a !== null);
      return !1
    }
    var nq = Error(U(461)),
      OA = !1;

    function HA(A, t, a, c) {
      t.child = A === null ? cd(t, null, a, c) : pc(t, A.child, a, c)
    }

    function RR(A, t, a, c, u) {
      a = a.render;
      var e = t.ref;
      if ("ref" in c) {
        var l = {};
        for (var n in c) n !== "ref" && (l[n] = c[n])
      } else l = c;
      return Ic(t), c = YI(A, t, a, l, e, u), n = _I(), A !== null && !OA ? ($I(A, t, u), ea(
        A, t, u)) : (L && n && li(t), t.flags |= 1, HA(A, t, c, u), t.child)
    }

    function rR(A, t, a, c, u) {
      if (A === null) {
        var e = a.type;
        return typeof e == "function" && !gI(e) && e.defaultProps === void 0 && a.compare ===
          null ? (t.tag = 15, t.type = e, Qd(A, t, e, c, u)) : (A = Il(a.type, null, c, t, t
            .mode, u), A.ref = t.ref, A.return = t, t.child = A)
      }
      if (e = A.child, !qq(A, u)) {
        var l = e.memoizedProps;
        if (a = a.compare, a = a !== null ? a : $u, a(l, c) && A.ref === t.ref) return ea(A,
          t, u)
      }
      return t.flags |= 1, A = $t(e, c), A.ref = t.ref, A.return = t, t.child = A
    }

    function Qd(A, t, a, c, u) {
      if (A !== null) {
        var e = A.memoizedProps;
        if ($u(e, c) && A.ref === t.ref)
          if (OA = !1, t.pendingProps = c = e, qq(A, u))(A.flags & 131072) !== 0 && (OA = !0);
          else return t.lanes = A.lanes, ea(A, t, u)
      }
      return Fn(A, t, a, c, u)
    }

    function Bd(A, t, a, c) {
      var u = c.children,
        e = A !== null ? A.memoizedState : null;
      if (A === null && t.stateNode === null && (t.stateNode = {
          _visibility: 1,
          _pendingMarkers: null,
          _retryCache: null,
          _transitions: null
        }), c.mode === "hidden") {
        if ((t.flags & 128) !== 0) {
          if (e = e !== null ? e.baseLanes | a : a, A !== null) {
            for (c = t.child = A.child, u = 0; c !== null;) u = u | c.lanes | c.childLanes,
              c = c.sibling;
            c = u & ~e
          } else c = 0, t.child = null;
          return dR(A, t, e, a, c)
        }
        if ((a & 536870912) !== 0) t.memoizedState = {
          baseLanes: 0,
          cachePool: null
        }, A !== null && pl(t, e !== null ? e.cachePool : null), e !== null ? aR(t, e) :
        Jn(), ld(t);
        else return c = t.lanes = 536870912, dR(A, t, e !== null ? e.baseLanes | a : a, a, c)
      } else e !== null ? (pl(t, e.cachePool), aR(t, e), za(), t.memoizedState = null) : (
        A !== null && pl(t, null), Jn(), za());
      return HA(A, t, u, a), t.child
    }

    function Bu(A, t) {
      return A !== null && A.tag === 22 || t.stateNode !== null || (t.stateNode = {
        _visibility: 1,
        _pendingMarkers: null,
        _retryCache: null,
        _transitions: null
      }), t.sibling
    }

    function dR(A, t, a, c, u) {
      var e = BI();
      return e = e === null ? null : {
          parent: bA._currentValue,
          pool: e
        }, t.memoizedState = {
          baseLanes: a,
          cachePool: e
        }, A !== null && pl(t, null), Jn(), ld(t), A !== null && nc(A, t, c, !0), t
        .childLanes = u, null
    }

    function dl(A, t) {
      return t = Ri({
        mode: t.mode,
        children: t.children
      }, A.mode), t.ref = A.ref, A.child = t, t.return = A, t
    }

    function jR(A, t, a) {
      return pc(t, A.child, null, a), A = dl(t, t.pendingProps), A.flags |= 2, ct(t), t
        .memoizedState = null, A
    }

    function s2(A, t, a) {
      var c = t.pendingProps,
        u = (t.flags & 128) !== 0;
      if (t.flags &= -129, A === null) {
        if (L) {
          if (c.mode === "hidden") return A = dl(t, c), t.lanes = 536870912, A
          .memoizedState = {
            baseLanes: 0,
            cachePool: null
          }, Bu(null, A);
          if (Qn(t), (A = uA) ? (A = B1(A, Ht), A = A !== null && A.data === "&" ? A : null,
              A !== null && (t.memoizedState = {
                dehydrated: A,
                treeContext: Za !== null ? {
                  id: Zt,
                  overflow: Dt
                } : null,
                retryLane: 536870912,
                hydrationErrors: null
              }, a = Fr(A), a.return = t, t.child = a, UA = t, uA = null)) : A = null, A ===
            null) throw Da(t);
          return t.lanes = 536870912, null
        }
        return dl(t, c)
      }
      var e = A.memoizedState;
      if (e !== null) {
        var l = e.dehydrated;
        if (Qn(t), u)
          if (t.flags & 256) t.flags &= -257, t = jR(A, t, a);
          else if (t.memoizedState !== null) t.child = A.child, t.flags |= 128, t = null;
        else throw Error(U(558));
        else if (OA || nc(A, t, a, !1), u = (a & A.childLanes) !== 0, OA || u) {
          if (wa.current === null) {
            if (c = $, c !== null && (l = Sr(c, a), l !== 0 && l !== e.retryLane)) throw e
              .retryLane = l, Vc(A, l), YA(c, A, l), nq;
            Cl()
          }
          t = jR(A, t, a)
        } else A = e.treeContext, uA = Et(l.nextSibling), UA = t, L = !0, Wa = null, Ht = !1,
          A !== null && _r(t, A), t = dl(t, c), t.flags |= 134221824;
        return t
      }
      return A = $t(A.child, {
        mode: c.mode,
        children: c.children
      }), A.ref = t.ref, t.child = A, A.return = t, A
    }

    function Pc(A, t) {
      var a = t.ref;
      if (a === null) A !== null && A.ref !== null && (t.flags |= 4194816);
      else {
        if (typeof a != "function" && typeof a != "object") throw Error(U(284));
        (A === null || A.ref !== a) && (t.flags |= 4194816)
      }
    }

    function Fn(A, t, a, c, u) {
      return Ic(t), a = YI(A, t, a, c, void 0, u), c = _I(), A !== null && !OA ? ($I(A, t, u),
        ea(A, t, u)) : (L && c && li(t), t.flags |= 1, HA(A, t, a, u), t.child)
    }

    function bR(A, t, a, c, u, e) {
      return Ic(t), t.updateQueue = null, a = nd(t, c, a, u), id(A), c = _I(), A !== null && !
        OA ? ($I(A, t, e), ea(A, t, e)) : (L && c && li(t), t.flags |= 1, HA(A, t, a, e), t
          .child)
    }

    function OR(A, t, a, c, u) {
      if (Ic(t), t.stateNode === null) {
        var e = Zc,
          l = a.contextType;
        typeof l == "object" && l !== null && (e = WA(l)), e = new a(c, e), t.memoizedState =
          e.state !== null && e.state !== void 0 ? e.state : null, e.updater = Cn, t
          .stateNode = e, e._reactInternals = t, e = t.stateNode, e.props = c, e.state = t
          .memoizedState, e.refs = {}, vI(t), l = a.contextType, e.context = typeof l ==
          "object" && l !== null ? WA(l) : Zc, e.state = t.memoizedState, l = a
          .getDerivedStateFromProps, typeof l == "function" && (cn(t, a, l, c), e.state = t
            .memoizedState), typeof a.getDerivedStateFromProps == "function" || typeof e
          .getSnapshotBeforeUpdate == "function" || typeof e.UNSAFE_componentWillMount !=
          "function" && typeof e.componentWillMount != "function" || (l = e.state, typeof e
            .componentWillMount == "function" && e.componentWillMount(), typeof e
            .UNSAFE_componentWillMount == "function" && e.UNSAFE_componentWillMount(), l !== e
            .state && Cn.enqueueReplaceState(e, e.state, null), Ju(t, c, e, u), gu(), e
            .state = t.memoizedState), typeof e.componentDidMount == "function" && (t.flags |=
            4194308), c = !0
      } else if (A === null) {
        e = t.stateNode;
        var n = t.memoizedProps,
          r = rc(a, n);
        e.props = r;
        var I = e.context,
          p = a.contextType;
        l = Zc, typeof p == "object" && p !== null && (l = WA(p));
        var q = a.getDerivedStateFromProps;
        p = typeof q == "function" || typeof e.getSnapshotBeforeUpdate == "function", n = t
          .pendingProps !== n, p || typeof e.UNSAFE_componentWillReceiveProps != "function" &&
          typeof e.componentWillReceiveProps != "function" || (n || I !== l) && qR(t, e, c,
          l), Sa = !1;
        var R = t.memoizedState;
        e.state = R, Ju(t, c, e, u), gu(), I = t.memoizedState, n || R !== I || Sa ? (
          typeof q == "function" && (cn(t, a, q, c), I = t.memoizedState), (r = Sa || IR(t,
            a, r, c, R, I, l)) ? (p || typeof e.UNSAFE_componentWillMount != "function" &&
            typeof e.componentWillMount != "function" || (typeof e.componentWillMount ==
              "function" && e.componentWillMount(), typeof e.UNSAFE_componentWillMount ==
              "function" && e.UNSAFE_componentWillMount()), typeof e.componentDidMount ==
            "function" && (t.flags |= 4194308)) : (typeof e.componentDidMount ==
            "function" && (t.flags |= 4194308), t.memoizedProps = c, t.memoizedState = I), e
          .props = c, e.state = I, e.context = l, c = r) : (typeof e.componentDidMount ==
          "function" && (t.flags |= 4194308), c = !1)
      } else {
        e = t.stateNode, wn(A, t), l = t.memoizedProps, p = rc(a, l), e.props = p, q = t
          .pendingProps, R = e.context, I = a.contextType, r = Zc, typeof I == "object" &&
          I !== null && (r = WA(I)), n = a.getDerivedStateFromProps, (I = typeof n ==
            "function" || typeof e.getSnapshotBeforeUpdate == "function") || typeof e
          .UNSAFE_componentWillReceiveProps != "function" && typeof e
          .componentWillReceiveProps != "function" || (l !== q || R !== r) && qR(t, e, c, r),
          Sa = !1, R = t.memoizedState, e.state = R, Ju(t, c, e, u), gu();
        var d = t.memoizedState;
        l !== q || R !== d || Sa || A !== null && A.dependencies !== null && fl(A
          .dependencies) ? (typeof n == "function" && (cn(t, a, n, c), d = t.memoizedState),
          (p = Sa || IR(t, a, p, c, R, d, r) || A !== null && A.dependencies !== null && fl(
            A.dependencies)) ? (I || typeof e.UNSAFE_componentWillUpdate != "function" &&
            typeof e.componentWillUpdate != "function" || (typeof e.componentWillUpdate ==
              "function" && e.componentWillUpdate(c, d, r), typeof e
              .UNSAFE_componentWillUpdate == "function" && e.UNSAFE_componentWillUpdate(c,
                d, r)), typeof e.componentDidUpdate == "function" && (t.flags |= 4),
            typeof e.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof e
            .componentDidUpdate != "function" || l === A.memoizedProps && R === A
            .memoizedState || (t.flags |= 4), typeof e.getSnapshotBeforeUpdate !=
            "function" || l === A.memoizedProps && R === A.memoizedState || (t.flags |=
              1024), t.memoizedProps = c, t.memoizedState = d), e.props = c, e.state = d, e
          .context = r, c = p) : (typeof e.componentDidUpdate != "function" || l === A
          .memoizedProps && R === A.memoizedState || (t.flags |= 4), typeof e
          .getSnapshotBeforeUpdate != "function" || l === A.memoizedProps && R === A
          .memoizedState || (t.flags |= 1024), c = !1)
      }
      return e = c, Pc(A, t), c = (t.flags & 128) !== 0, e || c ? (e = t.stateNode, a = c &&
        typeof a.getDerivedStateFromError != "function" ? null : e.render(), t.flags |= 1,
        A !== null && c ? (t.child = pc(t, A.child, null, u), t.child = pc(t, null, a, u)) :
        HA(A, t, a, u), t.memoizedState = e.state, A = t.child) : A = ea(A, t, u), A
    }

    function VR(A, t, a, c) {
      return ic(), t.flags |= 256, HA(A, t, a, c), t.child
    }
    var Yn = {
      dehydrated: null,
      treeContext: null,
      retryLane: 0,
      hydrationErrors: null
    };

    function _n(A) {
      return {
        baseLanes: A,
        cachePool: Ad()
      }
    }

    function $n(A, t, a) {
      return A = A !== null ? A.childLanes & ~a : 0, t && (A |= et), A
    }

    function hd(A, t, a) {
      var c = t.pendingProps,
        u = !1,
        e = (t.flags & 128) !== 0,
        l;
      if ((l = e) || (l = A !== null && A.memoizedState === null ? !1 : (mA.current & 2) !==
          0), l && (u = !0, t.flags &= -129), l = (t.flags & 32) !== 0, t.flags &= -33, A ===
        null) {
        if (L) {
          if (u ? fa(t) : za(), (A = uA) ? (A = B1(A, Ht), A = A !== null && A.data !== "&" ?
              A : null, A !== null && (t.memoizedState = {
                dehydrated: A,
                treeContext: Za !== null ? {
                  id: Zt,
                  overflow: Dt
                } : null,
                retryLane: 536870912,
                hydrationErrors: null
              }, a = Fr(A), a.return = t, t.child = a, UA = t, uA = null)) : A = null, A ===
            null) throw Da(t);
          return Nq(A) ? t.lanes = 32 : t.lanes = 536870912, null
        }
        return e = c.children, c = c.fallback, u ? (za(), u = t.mode, e = Ri({
            mode: "hidden",
            children: e
          }, u), c = cc(c, u, a, null), e.return = t, c.return = t, e.sibling = c, t.child =
          e, c = t.child, c.memoizedState = _n(a), c.childLanes = $n(A, l, a), t
          .memoizedState = Yn, Bu(null, c)) : (fa(t), Iq(t, e))
      }
      var n = A.memoizedState;
      if (n !== null) {
        var r = n.dehydrated;
        if (r !== null) return U2(A, t, e, l, c, r, n, a)
      }
      return u ? (za(), u = c.fallback, e = t.mode, n = A.child, r = n.sibling, c = $t(n, {
          mode: "hidden",
          children: c.children
        }), c.subtreeFlags = n.subtreeFlags & 1206910976, r !== null ? u = $t(r, u) : (u =
          cc(u, e, a, null), u.flags |= 2), u.return = t, c.return = t, c.sibling = u, t
        .child = c, Bu(null, c), c = t.child, u = A.child.memoizedState, u === null ? u =
        _n(a) : (e = u.cachePool, e !== null ? (n = bA._currentValue, e = e.parent !== n ? {
          parent: n,
          pool: n
        } : e) : e = Ad(), u = {
          baseLanes: u.baseLanes | a,
          cachePool: e
        }), c.memoizedState = u, c.childLanes = $n(A, l, a), t.memoizedState = Yn, Bu(A
          .child, c)) : (fa(t), a = A.child, A = a.sibling, a = $t(a, {
          mode: "visible",
          children: c.children
        }), a.return = t, a.sibling = null, A !== null && (l = t.deletions, l === null ? (t
          .deletions = [A], t.flags |= 16) : l.push(A)), t.child = a, t.memoizedState =
        null, a)
    }

    function Iq(A, t) {
      return t = Ri({
        mode: "visible",
        children: t
      }, A.mode), t.return = A, A.child = t
    }

    function Ri(A, t) {
      return A = FA(22, A, null, t), A.lanes = 0, A
    }

    function Me(A, t, a) {
      return pc(t, A.child, null, a), A = Iq(t, t.pendingProps.children), A.flags |= 2, t
        .memoizedState = null, A
    }

    function U2(A, t, a, c, u, e, l, n) {
      if (a) return t.flags & 256 ? (fa(t), t.flags &= -257, Me(A, t, n)) : t
        .memoizedState !== null ? (za(), t.child = A.child, t.flags |= 128, null) : (za(),
          e = u.fallback, l = t.mode, u = Ri({
            mode: "visible",
            children: u.children
          }, l), e = cc(e, l, n, null), e.flags |= 2, u.return = t, e.return = t, u
          .sibling = e, t.child = u, pc(t, A.child, null, n), u = t.child, u.memoizedState =
          _n(n), u.childLanes = $n(A, c, n), t.memoizedState = Yn, Bu(null, u));
      if (fa(t), Nq(e)) {
        if (c = e.nextSibling && e.nextSibling.dataset, c) var r = c.dgst;
        return c = r, c !== "" && (u = Error(U(419)), u.stack = "", u.digest = c, te({
          value: u,
          source: null,
          stack: null
        })), Me(A, t, n)
      }
      if (OA || nc(A, t, n, !1), c = (n & A.childLanes) !== 0, OA || c) {
        if (wa.current !== null) return Me(A, t, n);
        if (c = $, c !== null && (u = Sr(c, n), u !== 0 && u !== l.retryLane)) throw l
          .retryLane = u, Vc(A, u), YA(c, A, u), nq;
        return oI(e) || Cl(), Me(A, t, n)
      }
      return oI(e) ? (t.flags |= 192, t.child = A.child, null) : (A = l.treeContext, uA = Et(e
        .nextSibling), UA = t, L = !0, Wa = null, Ht = !1, A !== null && _r(t, A), t = Iq(
        t, u.children), t.flags |= 134221824, t)
    }

    function HR(A, t, a) {
      A.lanes |= t;
      var c = A.alternate;
      c !== null && (c.lanes |= t), ql(A.return, t, a)
    }

    function ER(A) {
      for (var t = null; A !== null;) {
        var a = A.alternate;
        a !== null && Gl(a) === null && (t = A), A = A.sibling
      }
      return t
    }

    function Fe(A, t, a, c, u, e) {
      var l = A.memoizedState;
      l === null ? A.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: c,
        tail: a,
        tailMode: u,
        treeForkCount: e
      } : (l.isBackwards = t, l.rendering = null, l.renderingStartTime = 0, l.last = c, l
        .tail = a, l.tailMode = u, l.treeForkCount = e)
    }

    function un(A) {
      var t = A.child;
      for (A.child = null; t !== null;) {
        var a = t.sibling;
        t.sibling = A.child, A.child = t, t = a
      }
    }

    function AI(A, t, a) {
      var c = t.pendingProps,
        u = c.revealOrder,
        e = c.tail;
      c = c.children;
      var l = mA.current;
      if (t.flags & 128) return ce(t, l), null;
      var n = (l & 2) !== 0;
      if (n ? (l = l & 1 | 2, t.flags |= 128) : l &= 1, ce(t, l), u === "backwards" && A !==
        null ? (un(A), HA(A, t, c, a), un(A)) : HA(A, t, c, a), c = L ? Ae : 0, !n && A !==
        null && (A.flags & 128) !== 0) A: for (A = t.child; A !== null;) {
        if (A.tag === 13) A.memoizedState !== null && HR(A, a, t);
        else if (A.tag === 19) HR(A, a, t);
        else if (A.child !== null) {
          A.child.return = A, A = A.child;
          continue
        }
        if (A === t) break A;
        for (; A.sibling === null;) {
          if (A.return === null || A.return === t) break A;
          A = A.return
        }
        A.sibling.return = A.return, A = A.sibling
      }
      switch (u) {
        case "backwards":
          a = ER(t.child), a === null ? (u = t.child, t.child = null) : (u = a.sibling, a
            .sibling = null, un(t)), Fe(t, !0, u, null, e, c);
          break;
        case "unstable_legacy-backwards":
          for (a = null, u = t.child, t.child = null; u !== null;) {
            if (A = u.alternate, A !== null && Gl(A) === null) {
              t.child = u;
              break
            }
            A = u.sibling, u.sibling = a, a = u, u = A
          }
          Fe(t, !0, a, null, e, c);
          break;
        case "together":
          Fe(t, !1, null, null, void 0, c);
          break;
        case "independent":
          t.memoizedState = null;
          break;
        default:
          a = ER(t.child), a === null ? (u = t.child, t.child = null) : (u = a.sibling, a
            .sibling = null), Fe(t, !1, u, a, e, c)
      }
      return t.child
    }

    function SR(A, t, a) {
      var c = t.pendingProps;
      return sa(t, t.type, c.value), HA(A, t, c.children, a), t.child
    }

    function ea(A, t, a) {
      if (A !== null && (t.dependencies = A.dependencies), Ja |= t.lanes, (a & t
        .childLanes) === 0)
        if (A !== null) {
          if (nc(A, t, a, !1), (a & t.childLanes) === 0) return null
        } else return null;
      if (A !== null && t.child !== A.child) throw Error(U(153));
      if (t.child !== null) {
        for (A = t.child, a = $t(A, A.pendingProps), t.child = a, a.return = t; A.sibling !==
          null;) A = A.sibling, a = a.sibling = $t(A, A.pendingProps), a.return = t;
        a.sibling = null
      }
      return t.child
    }

    function qq(A, t) {
      return (A.lanes & t) !== 0 ? !0 : (A = A.dependencies, !!(A !== null && fl(A)))
    }

    function y2(A, t, a) {
      switch (t.tag) {
        case 3:
          sl(t, t.stateNode.containerInfo), sa(t, bA, A.memoizedState.cache), ic();
          break;
        case 27:
        case 5:
          yn(t);
          break;
        case 4:
          sl(t, t.stateNode.containerInfo);
          break;
        case 10:
          sa(t, t.type, t.memoizedProps.value);
          break;
        case 31:
          if (t.memoizedState !== null) return t.flags |= 128, Qn(t), null;
          break;
        case 13:
          var c = t.memoizedState;
          if (c !== null) {
            if (c.dehydrated !== null) return fa(t), t.flags |= 128, null;
            c = nc(A, t, a, !1);
            var u = t.child.childLanes;
            return c || (a & u) !== 0 ? hd(A, t, a) : (fa(t), A = ea(A, t, a), A !== null ? A
              .sibling : null)
          }
          fa(t);
          break;
        case 19:
          if (t.flags & 128) return AI(A, t, a);
          if (u = (A.flags & 128) !== 0, c = (a & t.childLanes) !== 0, c || (nc(A, t, a, !1),
              c = (a & t.childLanes) !== 0), u) {
            if (c) return AI(A, t, a);
            t.flags |= 128
          }
          if (u = t.memoizedState, u !== null && (u.rendering = null, u.tail = null, u
              .lastEffect = null), ce(t, mA.current), c) break;
          return null;
        case 22:
          return t.lanes = 0, Bd(A, t, a, t.pendingProps);
        case 24:
          sa(t, bA, A.memoizedState.cache)
      }
      return ea(A, t, a)
    }

    function vd(A, t, a) {
      if (A !== null)
        if (A.memoizedProps !== t.pendingProps) OA = !0;
        else {
          if (!qq(A, a) && (t.flags & 128) === 0) return OA = !1, y2(A, t, a);
          OA = (A.flags & 131072) !== 0
        }
      else OA = !1, L && (t.flags & 1048576) !== 0 && Yr(t, Ae, t.index);
      switch (t.lanes = 0, t.tag) {
        case 16:
          A: {
            var c = t.pendingProps;
            if (A = _a(t.elementType), t.type = A, typeof A == "function") gI(A) ? (c = rc(
              A, c), t.tag = 1, t = OR(null, t, A, c, a)) : (t.tag = 0, t = Fn(null, t, A,
              c, a));
            else {
              if (A != null) {
                var u = A.$$typeof;
                if (u === kI) {
                  t.tag = 11, t = RR(null, t, A, c, a);
                  break A
                } else if (u === WI) {
                  t.tag = 14, t = rR(null, t, A, c, a);
                  break A
                } else if (u === Xt) {
                  t.tag = 10, t.type = A, t = SR(null, t, a);
                  break A
                }
              }
              throw t = sn(A) || A, Error(U(306, t, ""))
            }
          }
          return t;
        case 0:
          return Fn(A, t, t.type, t.pendingProps, a);
        case 1:
          return c = t.type, u = rc(c, t.pendingProps), OR(A, t, c, u, a);
        case 3:
          A: {
            if (sl(t, t.stateNode.containerInfo), A === null) throw Error(U(387));c = t
            .pendingProps;
            var e = t.memoizedState;u = e.element,
            wn(A, t),
            Ju(t, c, null, a);
            var l = t.memoizedState;
            if (c = l.cache, sa(t, bA, c), c !== e.cache && Zn(t, [bA], a, !0), gu(), c = l
              .element, e.isDehydrated)
              if (e = {
                  element: c,
                  isDehydrated: !1,
                  cache: l.cache
                }, t.updateQueue.baseState = e, t.memoizedState = e, t.flags & 256) {
                t = VR(A, t, c, a);
                break A
              } else if (c !== u) {
              u = Vt(Error(U(424)), t), te(u), t = VR(A, t, c, a);
              break A
            } else
              for (A = t.stateNode.containerInfo, A.nodeType === 9 ? A = A.body : A = A
                .nodeName === "HTML" ? A.ownerDocument.body : A, uA = Et(A.firstChild), UA =
                t, L = !0, Wa = null, Ht = !0, a = cd(t, null, c, a), t.child = a; a;) a
                .flags = a.flags & -3 | 134221824, a = a.sibling;
            else {
              if (ic(), c === u) {
                t = ea(A, t, a);
                break A
              }
              HA(A, t, c, a)
            }
            t = t.child
          }
          return t;
        case 26:
          return Pc(A, t), A === null ? (a = CR(t.type, null, t.pendingProps, null)) ? t
            .memoizedState = a : L || (t.stateNode = G1(t.type, t.pendingProps, ka.current,
              t)) : t.memoizedState = CR(t.type, A.memoizedProps, t.pendingProps, A
              .memoizedState), null;
        case 27:
          return yn(t), A === null && L && (c = t.stateNode = h1(t.type, t.pendingProps, ka
              .current), UA = t, Ht = !0, u = uA, Ba(t.type) ? (sI = u, uA = Et(c
              .firstChild)) : uA = u), HA(A, t, t.pendingProps.children, a), Pc(A, t), A ===
            null && (t.flags |= 4194304), t.child;
        case 5:
          return A === null && L && ((u = c = uA) && (c = HH(c, t.type, t.pendingProps, Ht),
              c !== null ? (t.stateNode = c, UA = t, uA = Et(c.firstChild), Ht = !1, u = !
              0) : u = !1), u || Da(t)), yn(t), u = t.type, e = t.pendingProps, l = A !==
            null ? A.memoizedProps : null, c = e.children, SI(u, e) ? c = null : l !== null &&
            SI(u, l) && (t.flags |= 32), t.memoizedState !== null && (u = YI(A, t, b2, null,
              null, a), Iu._currentValue = u), Pc(A, t), HA(A, t, c, a), t.child;
        case 6:
          return A === null && L && ((A = a = uA) && (a = EH(a, t.pendingProps, Ht), a !==
            null ? (t.stateNode = a, UA = t, uA = null, A = !0) : A = !1), A || Da(t)), null;
        case 13:
          return hd(A, t, a);
        case 4:
          return sl(t, t.stateNode.containerInfo), c = t.pendingProps, A === null ? t.child =
            pc(t, null, c, a) : HA(A, t, c, a), t.child;
        case 11:
          return RR(A, t, t.type, t.pendingProps, a);
        case 7:
          return c = t.pendingProps, Pc(A, t), HA(A, t, c, a), t.child;
        case 8:
          return HA(A, t, t.pendingProps.children, a), t.child;
        case 12:
          return HA(A, t, t.pendingProps.children, a), t.child;
        case 10:
          return SR(A, t, a);
        case 9:
          return u = t.type._context, c = t.pendingProps.children, Ic(t), u = WA(u), c = c(u),
            t.flags |= 1, HA(A, t, c, a), t.child;
        case 14:
          return rR(A, t, t.type, t.pendingProps, a);
        case 15:
          return Qd(A, t, t.type, t.pendingProps, a);
        case 19:
          return AI(A, t, a);
        case 31:
          return s2(A, t, a);
        case 22:
          return Bd(A, t, a, t.pendingProps);
        case 24:
          return Ic(t), c = WA(bA), A === null ? (u = BI(), u === null && (u = $, e = QI(), u
            .pooledCache = e, e.refCount++, e !== null && (u.pooledCacheLanes |= a), u = e
            ), t.memoizedState = {
            parent: c,
            cache: u
          }, vI(t), sa(t, bA, u)) : ((A.lanes & a) !== 0 && (wn(A, t), Ju(t, null, null, a),
            gu()), u = A.memoizedState, e = t.memoizedState, u.parent !== c ? (u = {
            parent: c,
            cache: c
          }, t.memoizedState = u, t.lanes === 0 && (t.memoizedState = t.updateQueue
            .baseState = u), sa(t, bA, c)) : (c = e.cache, sa(t, bA, c), c !== u.cache &&
            Zn(t, [bA], a, !0))), HA(A, t, t.pendingProps.children, a), t.child;
        case 30:
          return t.stateNode === null && (t.stateNode = {
              autoName: null,
              paired: null,
              clones: null,
              ref: null
            }), c = t.pendingProps, c.name != null && c.name !== "auto" ? t.flags |= A ===
            null ? 18882560 : 18874368 : L && li(t), A !== null && A.memoizedProps.name !== c
            .name ? t.flags |= 4194816 : Pc(A, t), HA(A, t, c.children, a), t.child;
        case 29:
          throw t.pendingProps
      }
      throw Error(U(156, t.tag))
    }

    function Ft(A) {
      A.flags |= 4
    }

    function en(A, t, a, c, u) {
      var e;
      if ((e = (A.mode & 32) !== 0) && (e = a === null ? YR(t, c) : YR(t, c) && (c.src !== a
          .src || c.srcSet !== a.srcSet)), e) {
        if (A.flags |= 16777216, (u & 335544128) === u)
          if (A.stateNode.complete) A.flags |= 8192;
          else if (N1()) A.flags |= 8192;
        else throw ec = zl, hI
      } else A.flags &= -16777217
    }

    function NR(A, t) {
      if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) A.flags &= -16777217;
      else if (A.flags |= 16777216, !F1(t))
        if (N1()) A.flags |= 8192;
        else throw ec = zl, hI
    }

    function Ye(A, t) {
      t !== null && (A.flags |= 4), A.flags & 16384 && (t = A.tag !== 22 ? Vr() : 536870912, A
        .lanes |= t, cu |= t)
    }

    function Pu(A, t) {
      if (!L) switch (A.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var a = A.tail, c = null; a !== null;) a.alternate !== null && (c = a), a = a
            .sibling;
          c === null ? t || A.tail === null ? A.tail = null : A.tail.sibling = null : c
            .sibling = null;
          break;
        default:
          for (t = A.tail, a = null; t !== null;) t.alternate !== null && (a = t), t = t
            .sibling;
          a === null ? A.tail = null : a.sibling = null
      }
    }

    function cA(A) {
      var t = A.alternate !== null && A.alternate.child === A.child,
        a = 0,
        c = 0;
      if (t)
        for (var u = A.child; u !== null;) a |= u.lanes | u.childLanes, c |= u.subtreeFlags &
          1206910976, c |= u.flags & 1206910976, u.return = A, u = u.sibling;
      else
        for (u = A.child; u !== null;) a |= u.lanes | u.childLanes, c |= u.subtreeFlags, c |=
          u.flags, u.return = A, u = u.sibling;
      return A.subtreeFlags |= c, A.childLanes = a, t
    }

    function P2(A, t, a) {
      var c = t.pendingProps;
      switch (JI(t), t.tag) {
        case 16:
        case 15:
        case 0:
        case 11:
        case 7:
        case 8:
        case 12:
        case 9:
        case 14:
          return cA(t), null;
        case 1:
          return cA(t), null;
        case 3:
          return a = t.stateNode, c = null, A !== null && (c = A.memoizedState.cache), t
            .memoizedState.cache !== c && (t.flags |= 2048), Aa(bA), $c(), a.pendingContext &&
            (a.context = a.pendingContext, a.pendingContext = null), (A === null || A
              .child === null) && (Uc(t) ? Ft(t) : A === null || A.memoizedState
              .isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, An())), cA(t), null;
        case 26:
          var u = t.type,
            e = t.memoizedState;
          return A === null ? (Ft(t), e !== null ? (cA(t), NR(t, e)) : (cA(t), en(t, u, null,
            c, a))) : e ? e !== A.memoizedState ? (Ft(t), cA(t), NR(t, e)) : (cA(t), t
            .flags &= -16777217) : (A = A.memoizedProps, A !== c && Ft(t), cA(t), en(t, u,
            A, c, a)), null;
        case 27:
          if (Ul(t), a = ka.current, u = t.type, A !== null && t.stateNode != null) A
            .memoizedProps !== c && Ft(t);
          else {
            if (!c) {
              if (t.stateNode === null) throw Error(U(166));
              return cA(t), t.subtreeFlags &= -33554433, null
            }
            A = wt.current, Uc(t) ? Mp(t, A) : (A = h1(u, c, a), t.stateNode = A, Ft(t))
          }
          return cA(t), t.subtreeFlags &= -33554433, null;
        case 5:
          if (Ul(t), u = t.type, A !== null && t.stateNode != null) A.memoizedProps !== c &&
            Ft(t);
          else {
            if (!c) {
              if (t.stateNode === null) throw Error(U(166));
              return cA(t), t.subtreeFlags &= -33554433, null
            }
            if (e = wt.current, Uc(t)) Mp(t, e);
            else {
              var l = ie(ka.current);
              switch (e) {
                case 1:
                  e = l.createElementNS("http://www.w3.org/2000/svg", u);
                  break;
                case 2:
                  e = l.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                  break;
                default:
                  switch (u) {
                    case "svg":
                      e = l.createElementNS("http://www.w3.org/2000/svg", u);
                      break;
                    case "math":
                      e = l.createElementNS("http://www.w3.org/1998/Math/MathML", u);
                      break;
                    case "script":
                      e = l.createElement("div"), e.innerHTML = "<script><\/script>", e = e
                        .removeChild(e.firstChild);
                      break;
                    case "select":
                      e = typeof c.is == "string" ? l.createElement("select", {
                          is: c.is
                        }) : l.createElement("select"), c.multiple ? e.multiple = !0 : c
                        .size && (e.size = c.size);
                      break;
                    default:
                      e = typeof c.is == "string" ? l.createElement(u, {
                        is: c.is
                      }) : l.createElement(u)
                  }
              }
              e[kA] = t, e[$A] = c;
              A: for (l = t.child; l !== null;) {
                if (l.tag === 5 || l.tag === 6) e.appendChild(l.stateNode);
                else if (l.tag !== 4 && l.tag !== 27 && l.child !== null) {
                  l.child.return = l, l = l.child;
                  continue
                }
                if (l === t) break A;
                for (; l.sibling === null;) {
                  if (l.return === null || l.return === t) break A;
                  l = l.return
                }
                l.sibling.return = l.return, l = l.sibling
              }
              t.stateNode = e;
              A: switch (fA(e, u, c), u) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c = !!c.autoFocus;
                  break A;
                case "img":
                  c = !0;
                  break A;
                default:
                  c = !1
              }
              c && Ft(t)
            }
          }
          return cA(t), t.subtreeFlags &= -33554433, en(t, t.type, A === null ? null : A
            .memoizedProps, t.pendingProps, a), null;
        case 6:
          if (A && t.stateNode != null) A.memoizedProps !== c && Ft(t);
          else {
            if (typeof c != "string" && t.stateNode === null) throw Error(U(166));
            if (A = ka.current, Uc(t)) {
              if (A = t.stateNode, a = t.memoizedProps, c = null, u = UA, u !== null) switch (
                u.tag) {
                case 27:
                case 5:
                  c = u.memoizedProps
              }
              A[kA] = t, A = !!(A.nodeValue === a || c !== null && c
                .suppressHydrationWarning === !0 || z1(A.nodeValue, a)), A || Da(t, !0)
            } else A = ie(A).createTextNode(c), A[kA] = t, t.stateNode = A
          }
          return cA(t), null;
        case 31:
          if (a = t.memoizedState, A === null || A.memoizedState !== null) {
            if (c = Uc(t), a !== null) {
              if (A === null) {
                if (!c) throw Error(U(318));
                if (A = t.memoizedState, A = A !== null ? A.dehydrated : null, !A)
                throw Error(U(557));
                A[kA] = t
              } else ic(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              cA(t), A = !1
            } else a = An(), A !== null && A.memoizedState !== null && (A.memoizedState
              .hydrationErrors = a), A = !0;
            if (!A) return t.flags & 256 ? (ct(t), t) : (ct(t), null);
            if ((t.flags & 128) !== 0) throw Error(U(558))
          }
          return cA(t), null;
        case 13:
          if (c = t.memoizedState, A === null || A.memoizedState !== null && A.memoizedState
            .dehydrated !== null) {
            if (u = Uc(t), c !== null && c.dehydrated !== null) {
              if (A === null) {
                if (!u) throw Error(U(318));
                if (u = t.memoizedState, u = u !== null ? u.dehydrated : null, !u)
                throw Error(U(317));
                u[kA] = t
              } else ic(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
              cA(t), u = !1
            } else u = An(), A !== null && A.memoizedState !== null && (A.memoizedState
              .hydrationErrors = u), u = !0;
            if (!u) return t.flags & 256 ? (ct(t), t) : (ct(t), null)
          }
          return ct(t), (t.flags & 128) !== 0 ? (t.lanes = a, t) : (a = c !== null, A = A !==
            null && A.memoizedState !== null, a && (c = t.child, u = null, c.alternate !==
              null && c.alternate.memoizedState !== null && c.alternate.memoizedState
              .cachePool !== null && (u = c.alternate.memoizedState.cachePool.pool), e =
              null, c.memoizedState !== null && c.memoizedState.cachePool !== null && (e = c
                .memoizedState.cachePool.pool), e !== u && (c.flags |= 2048)), a !== A &&
            a && (t.child.flags |= 8192), Ye(t, t.updateQueue), cA(t), null);
        case 4:
          return $c(), A === null && Hq(t.stateNode.containerInfo), t.flags |= 67108864, cA(
            t), null;
        case 10:
          return Aa(t.type), cA(t), null;
        case 19:
          if (MI(t), c = t.memoizedState, c === null) return cA(t), null;
          if (u = (t.flags & 128) !== 0, e = c.rendering, e === null)
            if (u) Pu(c, !1);
            else {
              if (RA !== 0 || A !== null && (A.flags & 128) !== 0)
                for (A = t.child; A !== null;) {
                  if (e = Gl(A), e !== null) {
                    for (t.flags |= 128, Pu(c, !1), A = e.updateQueue, t.updateQueue = A, Ye(
                        t, A), t.subtreeFlags = 0, A = a, a = t.child; a !== null;) Mr(a, A),
                      a = a.sibling;
                    return ce(t, mA.current & 1 | 2), L && Yt(t, c.treeForkCount), t.child
                  }
                  A = A.sibling
                }
              c.tail !== null && lt() > hl && (t.flags |= 128, u = !0, Pu(c, !1), t.lanes =
                4194304)
            }
          else {
            if (!u)
              if (A = Gl(e), A !== null) {
                if (t.flags |= 128, u = !0, A = A.updateQueue, t.updateQueue = A, Ye(t, A),
                  Pu(c, !0), c.tail === null && c.tailMode !== "collapsed" && c.tailMode !==
                  "visible" && !e.alternate && !L) return cA(t), null
              } else 2 * lt() - c.renderingStartTime > hl && a !== 536870912 && (t.flags |=
                128, u = !0, Pu(c, !1), t.lanes = 4194304);
            c.isBackwards ? (e.sibling = t.child, t.child = e) : (A = c.last, A !== null ? A
              .sibling = e : t.child = e, c.last = e)
          }
          if (c.tail !== null) {
            A = c.tail;
            A: {
              for (a = A; a !== null;) {
                if (a.alternate !== null) {
                  a = !1;
                  break A
                }
                a = a.sibling
              }
              a = !0
            }
            return c.rendering = A, c.tail = A.sibling, c.renderingStartTime = lt(), A
              .sibling = null, e = mA.current, e = u ? e & 1 | 2 : e & 1, c.tailMode ===
              "visible" || c.tailMode === "collapsed" || !a || L ? ce(t, e) : (a = e, eA(zA,
                t), eA(mA, a), ZA === null && (ZA = t)), L && Yt(t, c.treeForkCount), A
          }
          return cA(t), null;
        case 22:
        case 23:
          return ct(t), CI(), c = t.memoizedState !== null, A !== null ? A.memoizedState !==
            null !== c && (t.flags |= 8192) : c && (t.flags |= 8192), c ? (a & 536870912) !==
            0 && (t.flags & 128) === 0 && (cA(t), t.subtreeFlags & 6 && (t.flags |= 8192)) :
            cA(t), a = t.updateQueue, a !== null && Ye(t, a.retryQueue), a = null, A !==
            null && A.memoizedState !== null && A.memoizedState.cachePool !== null && (a = A
              .memoizedState.cachePool.pool), c = null, t.memoizedState !== null && t
            .memoizedState.cachePool !== null && (c = t.memoizedState.cachePool.pool), c !==
            a && (t.flags |= 2048), A !== null && TA(uc), null;
        case 24:
          return a = null, A !== null && (a = A.memoizedState.cache), t.memoizedState
            .cache !== a && (t.flags |= 2048), Aa(bA), cA(t), null;
        case 25:
          return null;
        case 30:
          return t.flags |= 33554432, cA(t), null
      }
      throw Error(U(156, t.tag))
    }

    function k2(A, t) {
      switch (JI(t), t.tag) {
        case 1:
          return A = t.flags, A & 65536 ? (t.flags = A & -65537 | 128, t) : null;
        case 3:
          return Aa(bA), $c(), A = t.flags, (A & 65536) !== 0 && (A & 128) === 0 ? (t.flags =
            A & -65537 | 128, t) : null;
        case 26:
        case 27:
        case 5:
          return Ul(t), null;
        case 31:
          if (t.memoizedState !== null) {
            if (ct(t), t.alternate === null) throw Error(U(340));
            ic()
          }
          return A = t.flags, A & 65536 ? (t.flags = A & -65537 | 128, t) : null;
        case 13:
          if (ct(t), A = t.memoizedState, A !== null && A.dehydrated !== null) {
            if (t.alternate === null) throw Error(U(340));
            ic()
          }
          return A = t.flags, A & 65536 ? (t.flags = A & -65537 | 128, t) : null;
        case 19:
          return MI(t), A = t.flags, A & 65536 ? (t.flags = A & -65537 | 128, A = t
            .memoizedState, A !== null && (A.rendering = null, A.tail = null), t.flags |= 4,
            t) : null;
        case 4:
          return $c(), null;
        case 10:
          return Aa(t.type), null;
        case 22:
        case 23:
          return ct(t), CI(), A !== null && TA(uc), A = t.flags, A & 65536 ? (t.flags = A & -
            65537 | 128, t) : null;
        case 24:
          return Aa(bA), null;
        case 25:
          return null;
        default:
          return null
      }
    }

    function Cd(A, t) {
      switch (JI(t), t.tag) {
        case 3:
          Aa(bA), $c();
          break;
        case 26:
        case 27:
        case 5:
          Ul(t);
          break;
        case 4:
          $c();
          break;
        case 31:
          t.memoizedState !== null && ct(t);
          break;
        case 13:
          ct(t);
          break;
        case 19:
          MI(t);
          break;
        case 10:
          Aa(t.type);
          break;
        case 22:
        case 23:
          ct(t), CI(), A !== null && TA(uc);
          break;
        case 24:
          Aa(bA)
      }
    }

    function Ee(A, t) {
      try {
        var a = t.updateQueue,
          c = a !== null ? a.lastEffect : null;
        if (c !== null) {
          var u = c.next;
          a = u;
          do {
            if ((a.tag & A) === A) {
              c = void 0;
              var e = a.create,
                l = a.inst;
              c = e(), l.destroy = c
            }
            a = a.next
          } while (a !== u)
        }
      } catch (n) {
        Y(t, t.return, n)
      }
    }

    function ga(A, t, a) {
      try {
        var c = t.updateQueue,
          u = c !== null ? c.lastEffect : null;
        if (u !== null) {
          var e = u.next;
          c = e;
          do {
            if ((c.tag & A) === A) {
              var l = c.inst,
                n = l.destroy;
              if (n !== void 0) {
                l.destroy = void 0, u = t;
                var r = a,
                  I = n;
                try {
                  I()
                } catch (p) {
                  Y(u, r, p)
                }
              }
            }
            c = c.next
          } while (c !== e)
        }
      } catch (p) {
        Y(t, t.return, p)
      }
    }

    function Md(A) {
      var t = A.updateQueue;
      if (t !== null) {
        var a = A.stateNode;
        try {
          ed(t, a)
        } catch (c) {
          Y(A, A.return, c)
        }
      }
    }

    function Fd(A, t, a) {
      a.props = rc(A.type, A.memoizedProps), a.state = A.memoizedState;
      try {
        a.componentWillUnmount()
      } catch (c) {
        Y(A, t, c)
      }
    }

    function Kt(A, t) {
      try {
        var a = A.ref;
        if (a !== null) {
          switch (A.tag) {
            case 26:
            case 27:
            case 5:
              var c = A.stateNode;
              break;
            case 30:
              var u = A.stateNode,
                e = aa(A.memoizedProps, u);
              (u.ref === null || u.ref.name !== e) && (u.ref = D1(e)), c = u.ref;
              break;
            case 7:
              if (A.stateNode === null) {
                var l = new pt(A);
                _A(A.child, !1, OH, l, void 0, void 0), A.stateNode = l
              }
              c = A.stateNode;
              break;
            default:
              c = A.stateNode
          }
          typeof a == "function" ? A.refCleanup = a(c) : a.current = c
        }
      } catch (n) {
        Y(A, t, n)
      }
    }

    function PA(A, t) {
      var a = A.ref,
        c = A.refCleanup;
      if (a !== null)
        if (typeof c == "function") try {
          c()
        } catch (u) {
          Y(A, t, u)
        } finally {
          A.refCleanup = null, A = A.alternate, A != null && (A.refCleanup = null)
        } else if (typeof a == "function") try {
          a(null)
        } catch (u) {
          Y(A, t, u)
        } else a.current = null
    }

    function wl(A, t) {
      if ((A.tag === 5 || A.tag === 27 || A.tag === 6) && A.alternate === null && t !== null)
        for (var a = 0; a < t.length; a++) Q1(A.stateNode, t[a])
    }

    function xR(A) {
      for (var t = A.return; t !== null && (Rq(t) && Q1(A.stateNode, t.stateNode), !pq(t));)
        t = t.return
    }

    function hu(A) {
      for (var t = A.return; t !== null && (Rq(t) && VH(A.stateNode, t.stateNode), !pq(t));)
        t = t.return
    }

    function pq(A) {
      return A.tag === 5 || A.tag === 3 || A.tag === 27
    }

    function Rq(A) {
      return A && A.tag === 7 && A.stateNode !== null
    }

    function tI(A) {
      var t = A.type,
        a = A.memoizedProps,
        c = A.stateNode;
      try {
        A: switch (t) {
          case "button":
          case "input":
          case "select":
          case "textarea":
            a.autoFocus && c.focus();
            break A;
          case "img":
            a.src ? c.src = a.src : a.srcSet && (c.srcset = a.srcSet)
        }
      }
      catch (u) {
        Y(A, A.return, u)
      }
    }

    function ln(A, t, a) {
      try {
        var c = A.stateNode;
        $2(c, A.type, a, t), c[$A] = t
      } catch (u) {
        Y(A, A.return, u)
      }
    }

    function Yd(A) {
      return A.tag === 5 || A.tag === 3 || A.tag === 26 || A.tag === 27 && Ba(A.type) || A
        .tag === 4
    }

    function nn(A) {
      A: for (;;) {
        for (; A.sibling === null;) {
          if (A.return === null || Yd(A.return)) return null;
          A = A.return
        }
        for (A.sibling.return = A.return, A = A.sibling; A.tag !== 5 && A.tag !== 6 && A
          .tag !== 18;) {
          if (A.tag === 27 && Ba(A.type) || A.flags & 2 || A.child === null || A.tag === 4)
            continue A;
          A.child.return = A, A = A.child
        }
        if (!(A.flags & 2)) return A.stateNode
      }
    }

    function aI(A, t, a, c) {
      var u = A.tag;
      if (u === 5 || u === 6) u = A.stateNode, t ? (a.nodeType === 9 ? a.body : a.nodeName ===
          "HTML" ? a.ownerDocument.body : a).insertBefore(u, t) : (t = a.nodeType === 9 ? a
          .body : a.nodeName === "HTML" ? a.ownerDocument.body : a, t.appendChild(u), a = a
          ._reactRootContainer, a != null || t.onclick !== null || (t.onclick = Lt)), wl(A,
        c), B = !0;
      else if (u !== 4 && (u === 27 && (wl(A, c), c = null, Ba(A.type) && (a = A.stateNode,
          t = null)), A = A.child, A !== null))
        for (aI(A, t, a, c), A = A.sibling; A !== null;) aI(A, t, a, c), A = A.sibling
    }

    function gl(A, t, a, c) {
      var u = A.tag;
      if (u === 5 || u === 6) u = A.stateNode, t ? a.insertBefore(u, t) : a.appendChild(u),
        wl(A, c), B = !0;
      else if (u !== 4 && (u === 27 && (wl(A, c), c = null, Ba(A.type) && (a = A.stateNode)),
          A = A.child, A !== null))
        for (gl(A, t, a, c), A = A.sibling; A !== null;) gl(A, t, a, c), A = A.sibling
    }

    function _d(A) {
      var t = A.stateNode,
        a = A.memoizedProps;
      try {
        for (var c = A.type, u = t.attributes; u.length;) t.removeAttributeNode(u[0]);
        fA(t, c, a), t[kA] = A, t[$A] = a
      } catch (e) {
        Y(A, A.return, e)
      }
    }
    var Jl = !1,
      ut = null;

    function oR(A) {
      (A.tag === 30 || (A.subtreeFlags & 33554432) !== 0) && (Jl = !0)
    }
    var Gt = null;

    function sR() {
      var A = Gt;
      return Gt = null, A
    }
    var MA = 0;

    function ju(A, t, a, c, u) {
      return MA = 0, $d(A.child, t, a, c, u)
    }

    function $d(A, t, a, c, u) {
      for (var e = !1; A !== null;) {
        if (A.tag === 5) {
          var l = A.stateNode;
          if (c !== null) {
            var n = NI(l);
            c.push(n), n.view && (e = !0)
          } else e || NI(l).view && (e = !0);
          Jl = !0, X1(l, MA === 0 ? t : t + "_" + MA, a), MA++
        } else(A.tag !== 22 || A.memoizedState === null) && (A.tag === 30 && u || $d(A.child,
          t, a, c, u) && (e = !0));
        A = A.sibling
      }
      return e
    }

    function Jt(A, t) {
      for (; A !== null;) A.tag === 5 ? L1(A.stateNode, A.memoizedProps) : (A.tag !== 22 || A
        .memoizedState === null) && (A.tag === 30 && t || Jt(A.child, t)), A = A.sibling
    }

    function jl(A) {
      if ((A.subtreeFlags & 18874368) !== 0)
        for (A = A.child; A !== null;) {
          if ((A.tag !== 22 || A.memoizedState === null) && (jl(A), A.tag === 30 && (A.flags &
              18874368) !== 0 && A.stateNode.paired)) {
            var t = A.memoizedProps;
            if (t.name == null || t.name === "auto") throw Error(U(544));
            var a = t.name;
            t = na(t.default, t.share), t !== "none" && (ju(A, a, t, null, !1) || Jt(A.child,
              !1))
          }
          A = A.sibling
        }
    }

    function cI(A, t) {
      if (A.tag === 30) {
        var a = A.stateNode,
          c = A.memoizedProps,
          u = aa(c, a),
          e = na(c.default, a.paired ? c.share : c.enter);
        e !== "none" ? ju(A, u, e, null, !1) ? (jl(A), a.paired || t || uu(A, c.onEnter)) :
          Jt(A.child, !1) : jl(A)
      } else if ((A.subtreeFlags & 33554432) !== 0)
        for (A = A.child; A !== null;) cI(A, t), A = A.sibling;
      else jl(A)
    }

    function uI(A) {
      if (ut !== null && ut.size !== 0) {
        var t = ut;
        if ((A.subtreeFlags & 18874368) !== 0)
          for (A = A.child; A !== null;) {
            if (A.tag !== 22 || A.memoizedState === null) {
              if (A.tag === 30 && (A.flags & 18874368) !== 0) {
                var a = A.memoizedProps,
                  c = a.name;
                if (c != null && c !== "auto") {
                  var u = t.get(c);
                  if (u !== void 0) {
                    var e = na(a.default, a.share);
                    if (e !== "none" && (ju(A, c, e, null, !1) ? (e = A.stateNode, u.paired =
                        e, e.paired = u, uu(A, a.onShare)) : Jt(A.child, !1)), t.delete(c), t
                      .size === 0) break
                  }
                }
              }
              uI(A)
            }
            A = A.sibling
          }
      }
    }

    function eI(A) {
      if (A.tag === 30) {
        var t = A.memoizedProps,
          a = aa(t, A.stateNode),
          c = ut !== null ? ut.get(a) : void 0,
          u = na(t.default, c !== void 0 ? t.share : t.exit);
        u !== "none" && (ju(A, a, u, null, !1) ? c !== void 0 ? (u = A.stateNode, c.paired =
          u, u.paired = c, ut.delete(a), uu(A, t.onShare)) : uu(A, t.onExit) : Jt(A.child,
          !1)), ut !== null && uI(A)
      } else if ((A.subtreeFlags & 33554432) !== 0)
        for (A = A.child; A !== null;) eI(A), A = A.sibling;
      else ut !== null && uI(A)
    }

    function A1(A) {
      for (A = A.child; A !== null;) {
        if (A.tag === 30) {
          var t = A.memoizedProps,
            a = aa(t, A.stateNode);
          t = na(t.default, t.update), A.flags &= -5, t !== "none" && ju(A, a, t, A
            .memoizedState = [], !1)
        } else(A.subtreeFlags & 33554432) !== 0 && A1(A);
        A = A.sibling
      }
    }

    function lI(A) {
      if ((A.subtreeFlags & 18874368) !== 0)
        for (A = A.child; A !== null;) {
          if (A.tag !== 22 || A.memoizedState === null) {
            if (A.tag === 30 && (A.flags & 18874368) !== 0) {
              var t = A.stateNode;
              t.paired !== null && (t.paired = null, Jt(A.child, !1))
            }
            lI(A)
          }
          A = A.sibling
        }
    }

    function bl(A) {
      if (A.tag === 30) A.stateNode.paired = null, Jt(A.child, !1), lI(A);
      else if ((A.subtreeFlags & 33554432) !== 0)
        for (A = A.child; A !== null;) bl(A), A = A.sibling;
      else lI(A)
    }

    function t1(A) {
      for (A = A.child; A !== null;) A.tag === 30 ? Jt(A.child, !1) : (A.subtreeFlags &
        33554432) !== 0 && t1(A), A = A.sibling
    }

    function rq(A, t, a, c, u, e, l) {
      for (var n = !1; t !== null;) {
        if (t.tag === 5) {
          var r = t.stateNode;
          if (e !== null && MA < e.length) {
            var I = e[MA],
              p = NI(r);
            (I.view || p.view) && (n = !0);
            var q;
            if (q = (A.flags & 4) === 0)
              if (p.clip) q = !0;
              else {
                q = I.rect;
                var R = p.rect;
                q = q.y !== R.y || q.x !== R.x || q.height !== R.height || q.width !== R.width
              } q && (A.flags |= 4), p.abs ? p = !I.abs : (I = I.rect, p = p.rect, p = I
              .height !== p.height || I.width !== p.width), p && (A.flags |= 32)
          } else A.flags |= 32;
          (A.flags & 4) !== 0 && X1(r, MA === 0 ? a : a + "_" + MA, u), n && (A.flags & 4) !==
            0 || (Gt === null && (Gt = []), Gt.push(r, MA === 0 ? c : c + "_" + MA, t
              .memoizedProps)), MA++
        } else(t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && l ? A.flags |= t
          .flags & 32 : rq(A, t.child, a, c, u, e, l) && (n = !0));
        t = t.sibling
      }
      return n
    }

    function a1(A, t) {
      for (A = A.child; A !== null;) {
        if (A.tag === 30) {
          var a = A.memoizedProps,
            c = A.stateNode,
            u = aa(a, c),
            e = na(a.default, a.update);
          if (t) {
            c = c.clones;
            var l = c === null ? null : c.map(eH)
          } else l = A.memoizedState, A.memoizedState = null;
          c = A;
          var n = A.child;
          MA = 0, u = rq(c, n, u, u, e, l, !1), (A.flags & 4) !== 0 && u && (t || uu(A, a
            .onUpdate))
        } else(A.subtreeFlags & 33554432) !== 0 && a1(A, t);
        A = A.sibling
      }
    }
    var xA = !1,
      C = !1,
      mt = !1,
      In = !1,
      UR = typeof WeakSet == "function" ? WeakSet : Set,
      oA = null,
      ft = !1,
      Gu = !1,
      Ql = !1,
      iI = !1;

    function W2(A, t, a) {
      if (A = A.containerInfo, HI = qu, A = wr(A), ZI(A)) {
        if ("selectionStart" in A) var c = {
          start: A.selectionStart,
          end: A.selectionEnd
        };
        else A: {
          c = (c = A.ownerDocument) && c.defaultView || window;
          var u = c.getSelection && c.getSelection();
          if (u && u.rangeCount !== 0) {
            c = u.anchorNode;
            var e = u.anchorOffset,
              l = u.focusNode;
            u = u.focusOffset;
            try {
              c.nodeType, l.nodeType
            } catch {
              c = null;
              break A
            }
            var n = 0,
              r = -1,
              I = -1,
              p = 0,
              q = 0,
              R = A,
              d = null;
            t: for (;;) {
              for (var S; R !== c || e !== 0 && R.nodeType !== 3 || (r = n + e), R !==
                l || u !== 0 && R.nodeType !== 3 || (I = n + u), R.nodeType === 3 && (n +=
                  R.nodeValue.length), (S = R.firstChild) !== null;) d = R, R = S;
              for (;;) {
                if (R === A) break t;
                if (d === c && ++p === e && (r = n), d === l && ++q === u && (I = n), (S =
                    R.nextSibling) !== null) break;
                R = d, d = R.parentNode
              }
              R = S
            }
            c = r === -1 || I === -1 ? null : {
              start: r,
              end: I
            }
          } else c = null
        }
        c = c || {
          start: 0,
          end: 0
        }
      } else c = null;
      for (EI = {
          focusedElem: A,
          selectionRange: c
        }, qu = !1, a = (a & 335544064) === a, oA = t, t = a ? 9270 : 1024; oA !== null;) {
        if (A = oA, a && (c = A.deletions, c !== null))
          for (e = 0; e < c.length; e++) a && eI(c[e]);
        if (A.alternate === null && (A.flags & 2) !== 0) a && oR(A), _e(a);
        else {
          if (A.tag === 22) {
            if (c = A.alternate, A.memoizedState !== null) {
              c !== null && c.memoizedState === null && a && eI(c), _e(a);
              continue
            } else if (c !== null && c.memoizedState !== null) {
              a && oR(A), _e(a);
              continue
            }
          }
          c = A.child, (A.subtreeFlags & t) !== 0 && c !== null ? (c.return = A, oA = c) : (
            a && A1(A), _e(a))
        }
      }
      ut = null
    }

    function _e(A) {
      for (; oA !== null;) {
        var t = oA,
          a = A,
          c = t.alternate,
          u = t.flags;
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if ((u & 1024) !== 0 && c !== null) {
              a = void 0, u = c.memoizedProps, c = c.memoizedState;
              var e = t.stateNode;
              try {
                var l = rc(t.type, u);
                a = e.getSnapshotBeforeUpdate(l, c), e.__reactInternalSnapshotBeforeUpdate = a
              } catch (n) {
                Y(t, t.return, n)
              }
            }
            break;
          case 3:
            if ((u & 1024) !== 0) {
              if (c = t.stateNode.containerInfo, a = c.nodeType, a === 9) xI(c);
              else if (a === 1) switch (c.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  xI(c);
                  break;
                default:
                  c.textContent = ""
              }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          case 30:
            a && c !== null && (a = aa(c.memoizedProps, c.stateNode), u = t.memoizedProps, u =
              na(u.default, u.update), u !== "none" && ju(c, a, u, c.memoizedState = [], !0)
              );
            break;
          default:
            if ((u & 1024) !== 0) throw Error(U(163))
        }
        if (c = t.sibling, c !== null) {
          c.return = t.return, oA = c;
          break
        }
        oA = t.return
      }
    }

    function c1(A, t, a) {
      var c = a.flags;
      switch (a.tag) {
        case 0:
        case 11:
        case 15:
          zt(A, a), c & 4 && Ee(5, a);
          break;
        case 1:
          if (zt(A, a), c & 4)
            if (A = a.stateNode, t === null) try {
              A.componentDidMount()
            } catch (l) {
              Y(a, a.return, l)
            } else {
              var u = rc(a.type, t.memoizedProps);
              t = t.memoizedState;
              try {
                A.componentDidUpdate(u, t, A.__reactInternalSnapshotBeforeUpdate)
              } catch (l) {
                Y(a, a.return, l)
              }
            }
          c & 64 && Md(a), c & 512 && Kt(a, a.return);
          break;
        case 3:
          if (zt(A, a), c & 64 && (A = a.updateQueue, A !== null)) {
            if (t = null, a.child !== null) switch (a.child.tag) {
              case 27:
              case 5:
                t = a.child.stateNode;
                break;
              case 1:
                t = a.child.stateNode
            }
            try {
              ed(A, t)
            } catch (l) {
              Y(a, a.return, l)
            }
          }
          break;
        case 27:
          t === null && c & 4 && _d(a);
        case 26:
        case 5:
          zt(A, a), t === null && c & 4 && tI(a), c & 512 && Kt(a, a.return);
          break;
        case 12:
          zt(A, a);
          break;
        case 31:
          zt(A, a), c & 4 && i1(A, a);
          break;
        case 13:
          zt(A, a), c & 4 && n1(A, a), c & 64 && (A = a.memoizedState, A !== null && (A = A
            .dehydrated, A !== null && (a = g2.bind(null, a), SH(A, a))));
          break;
        case 22:
          if (c = a.memoizedState !== null || xA, !c) {
            var e = t !== null && t.memoizedState !== null || C;
            t = xA, u = C, xA = c, (C = e) && !u ? (c = 2, (a.subtreeFlags & 8772) !== 0 && (
              c |= 1), st(A, a, c)) : zt(A, a), xA = t, C = u
          }
          break;
        case 30:
          zt(A, a), c & 512 && Kt(a, a.return);
          break;
        case 7:
          c & 512 && Kt(a, a.return);
        default:
          zt(A, a)
      }
    }

    function nI(A, t) {
      for (A = A.child; A !== null;) u1(A, t), A = A.sibling
    }

    function u1(A, t) {
      switch (A.tag) {
        case 5:
        case 26:
          try {
            var a = A.stateNode;
            if (t) {
              var c = a.style;
              typeof c.setProperty == "function" ? c.setProperty("display", "none",
                "important") : c.display = "none"
            } else {
              var u = A.stateNode,
                e = A.memoizedProps.style,
                l = e != null && e.hasOwnProperty("display") ? e.display : null;
              u.style.display = l == null || typeof l == "boolean" ? "" : ("" + l).trim()
            }
          } catch (r) {
            Y(A, A.return, r)
          }
          II(A, t);
          break;
        case 6:
          try {
            A.stateNode.nodeValue = t ? "" : A.memoizedProps, B = !0
          } catch (r) {
            Y(A, A.return, r)
          }
          break;
        case 18:
          try {
            var n = A.stateNode;
            t ? gR(n, !0) : gR(A.stateNode, !1)
          } catch (r) {
            Y(A, A.return, r)
          }
          break;
        case 22:
        case 23:
          A.memoizedState === null && nI(A, t);
          break;
        default:
          nI(A, t)
      }
    }

    function II(A, t) {
      if (A.subtreeFlags & 67108864)
        for (A = A.child; A !== null;) {
          A: {
            var a = A,
              c = t;
            switch (a.tag) {
              case 4:
                u1(a, c);
                break A;
              case 22:
                a.memoizedState === null && II(a, c);
                break A;
              default:
                II(a, c)
            }
          }
          A = A.sibling
        }
    }

    function e1(A) {
      var t = A.alternate;
      t !== null && (A.alternate = null, e1(t)), A.child = null, A.deletions = null, A
        .sibling = null, A.tag === 5 && (t = A.stateNode, t !== null && Ai(t)), A.stateNode =
        null, A.return = null, A.dependencies = null, A.memoizedProps = null, A
        .memoizedState = null, A.pendingProps = null, A.stateNode = null, A.updateQueue = null
    }
    var iA = null,
      vA = !1;

    function ot(A, t, a) {
      for (a = a.child; a !== null;) l1(A, t, a), a = a.sibling
    }

    function l1(A, t, a) {
      if (it && typeof it.onCommitFiberUnmount == "function") try {
        it.onCommitFiberUnmount(re, a)
      } catch {}
      switch (a.tag) {
        case 26:
          C || PA(a, t), ot(A, t, a), a.memoizedState ? a.memoizedState.count-- : a
            .stateNode && !C && (a = a.stateNode, a.parentNode.removeChild(a));
          break;
        case 27:
          C || PA(a, t), hu(a);
          var c = iA,
            u = vA;
          Ba(a.type) && (iA = a.stateNode, vA = !1), ot(A, t, a), v1(a.stateNode, a.type, a
            .memoizedProps), iA = c, vA = u;
          break;
        case 5:
          C || PA(a, t), hu(a);
        case 6:
          if (a.tag === 6 && hu(a), c = iA, u = vA, iA = null, ot(A, t, a), iA = c, vA = u,
            iA !== null)
            if (vA) try {
              (iA.nodeType === 9 ? iA.body : iA.nodeName === "HTML" ? iA.ownerDocument
                .body : iA).removeChild(a.stateNode), B = !0
            } catch (e) {
              Y(a, t, e)
            } else try {
              iA.removeChild(a.stateNode), B = !0
            } catch (e) {
              Y(a, t, e)
            }
          break;
        case 18:
          iA !== null && (vA ? (A = iA, wR(A.nodeType === 9 ? A.body : A.nodeName === "HTML" ?
            A.ownerDocument.body : A, a.stateNode), pu(A)) : wR(iA, a.stateNode));
          break;
        case 4:
          c = iA, u = vA, iA = a.stateNode.containerInfo, vA = !0, ot(A, t, a), iA = c, vA =
          u;
          break;
        case 0:
        case 11:
        case 14:
        case 15:
          ga(2, a, t), C || ga(4, a, t), ot(A, t, a);
          break;
        case 1:
          C || (PA(a, t), c = a.stateNode, typeof c.componentWillUnmount == "function" && Fd(
            a, t, c)), ot(A, t, a);
          break;
        case 21:
          ot(A, t, a);
          break;
        case 22:
          C = (c = C) || a.memoizedState !== null, ot(A, t, a), C = c;
          break;
        case 30:
          PA(a, t), ot(A, t, a);
          break;
        case 7:
          C || PA(a, t), ot(A, t, a);
          break;
        default:
          ot(A, t, a)
      }
    }

    function i1(A, t) {
      if (t.memoizedState === null && (A = t.alternate, A !== null && (A = A.memoizedState,
          A !== null))) {
        A = A.dehydrated;
        try {
          pu(A)
        } catch (a) {
          Y(t, t.return, a)
        }
      }
    }

    function n1(A, t) {
      if (t.memoizedState === null && (A = t.alternate, A !== null && (A = A.memoizedState,
          A !== null && (A = A.dehydrated, A !== null)))) try {
        pu(A)
      } catch (a) {
        Y(t, t.return, a)
      }
    }

    function T2(A) {
      switch (A.tag) {
        case 31:
        case 13:
        case 19:
          var t = A.stateNode;
          return t === null && (t = A.stateNode = new UR), t;
        case 22:
          return A = A.stateNode, t = A._retryCache, t === null && (t = A._retryCache =
            new UR), t;
        default:
          throw Error(U(435, A.tag))
      }
    }

    function $e(A, t) {
      var a = T2(A);
      t.forEach(function(c) {
        if (!a.has(c)) {
          a.add(c);
          var u = J2.bind(null, A, c);
          c.then(u, u)
        }
      })
    }

    function JA(A, t, a) {
      var c = t.deletions;
      if (c !== null)
        for (var u = 0; u < c.length; u++) {
          var e = c[u],
            l = A,
            n = t,
            r = n;
          A: for (; r !== null;) {
            switch (r.tag) {
              case 27:
                if (Ba(r.type)) {
                  iA = r.stateNode, vA = !1;
                  break A
                }
                break;
              case 5:
                iA = r.stateNode, vA = !1;
                break A;
              case 3:
              case 4:
                iA = r.stateNode.containerInfo, vA = !0;
                break A
            }
            r = r.return
          }
          if (iA === null) throw Error(U(160));
          l1(l, n, e), iA = null, vA = !1, l = e.alternate, l !== null && (l.return = null), e
            .return = null
        }
      if (t.subtreeFlags & 13886)
        for (t = t.child; t !== null;) I1(t, A, a), t = t.sibling
    }
    var Ut = null;

    function I1(A, t, a) {
      var c = A.alternate,
        u = A.flags;
      switch (A.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (u & 4 && (c = A.updateQueue, c = c !== null ? c.events : null, c !== null))
            for (var e = 0; e < c.length; e++) {
              var l = c[e];
              l.ref.impl = l.nextImpl
            }
          JA(t, A, a), QA(A), u & 4 && (ga(3, A, A.return), Ee(3, A), ga(5, A, A.return));
          break;
        case 1:
          JA(t, A, a), QA(A), u & 512 && (C || c === null || PA(c, c.return)), u & 64 && xA &&
            (A = A.updateQueue, A !== null && (t = A.callbacks, t !== null && (a = A.shared
              .hiddenCallbacks, A.shared.hiddenCallbacks = a === null ? t : a.concat(t))));
          break;
        case 26:
          if (e = Ut, JA(t, A, a), QA(A), u & 512 && (C || c === null || PA(c, c.return)), u &
            4)
            if (u = c !== null ? c.memoizedState : null, a = A.memoizedState, c === null)
              if (a === null)
                if (A.stateNode === null)
                  if (xA) A.stateNode = G1(A.type, A.memoizedProps, t.containerInfo, A);
                  else {
                    A: {
                      t = A.type,
                      a = A.memoizedProps,
                      u = e.ownerDocument || e;t: switch (t) {
                        case "title":
                          c = u.getElementsByTagName("title")[0], (!c || c[be] || c[kA] || c
                            .namespaceURI === "http://www.w3.org/2000/svg" || c
                            .hasAttribute("itemprop")) && (c = u.createElement(t), u.head
                            .insertBefore(c, u.querySelector("head > title"))), fA(c, t,
                            a), c[kA] = A, sA(c), t = c;
                          break A;
                        case "link":
                          if (e = FR("link", "href", u).get(t + (a.href || ""))) {
                            for (l = 0; l < e.length; l++)
                              if (c = e[l], c.getAttribute("href") === (a.href == null || a
                                  .href === "" ? null : a.href) && c.getAttribute("rel") ===
                                (a.rel == null ? null : a.rel) && c.getAttribute(
                                "title") === (a.title == null ? null : a.title) && c
                                .getAttribute("crossorigin") === (a.crossOrigin == null ?
                                  null : a.crossOrigin)) {
                                e.splice(l, 1);
                                break t
                              }
                          }
                          c = u.createElement(t), fA(c, t, a), u.head.appendChild(c);
                          break;
                        case "meta":
                          if (e = FR("meta", "content", u).get(t + (a.content || ""))) {
                            for (l = 0; l < e.length; l++)
                              if (c = e[l], c.getAttribute("content") === (a.content ==
                                  null ? null : "" + a.content) && c.getAttribute(
                                "name") === (a.name == null ? null : a.name) && c
                                .getAttribute("property") === (a.property == null ? null : a
                                  .property) && c.getAttribute("http-equiv") === (a
                                  .httpEquiv == null ? null : a.httpEquiv) && c
                                .getAttribute("charset") === (a.charSet == null ? null : a
                                  .charSet)) {
                                e.splice(l, 1);
                                break t
                              }
                          }
                          c = u.createElement(t), fA(c, t, a), u.head.appendChild(c);
                          break;
                        default:
                          throw Error(U(468, t))
                      }
                      c[kA] = A,
                      sA(c),
                      t = c
                    }
                    A.stateNode = t
                  }
          else xA || UI(e, A.type, A.stateNode);
          else A.stateNode = MR(e, a, A.memoizedProps);
          else u !== a ? (u === null ? (t = c.stateNode, t === null || C || t.parentNode
              .removeChild(t)) : u.count--, a === null ? xA || UI(e, A.type, A.stateNode) :
            MR(e, a, A.memoizedProps)) : a === null && A.stateNode !== null && ln(A, A
            .memoizedProps, c.memoizedProps);
          break;
        case 27:
          JA(t, A, a), QA(A), u & 512 && (C || c === null || PA(c, c.return)), c !== null &&
            u & 4 && ln(A, A.memoizedProps, c.memoizedProps);
          break;
        case 5:
          if (e = mt, mt = !1, JA(t, A, a), mt = e, QA(A), u & 512 && (C || c === null || PA(
              c, c.return)), A.flags & 32) {
            t = A.stateNode;
            try {
              tu(t, ""), B = !0
            } catch (p) {
              Y(A, A.return, p)
            }
          }
          u & 4 && A.stateNode != null && (t = A.memoizedProps, ln(A, t, c !== null ? c
            .memoizedProps : t)), u & 1024 && (In = !0);
          break;
        case 6:
          if (JA(t, A, a), QA(A), u & 4) {
            if (A.stateNode === null) throw Error(U(162));
            t = A.memoizedProps, a = A.stateNode;
            try {
              a.nodeValue = t, B = !0
            } catch (p) {
              Y(A, A.return, p)
            }
          }
          break;
        case 3:
          if (B = !1, El = null, e = Ut, Ut = ne(t.containerInfo), JA(t, A, a), Ut = e, QA(A),
            u & 4 && c !== null && c.memoizedState.isDehydrated) try {
            pu(t.containerInfo)
          } catch (p) {
            Y(A, A.return, p)
          }
          In && (In = !1, q1(A)), B = !1;
          break;
        case 4:
          u = mt, mt = xA, c = mp(), e = Ut, Ut = ne(A.stateNode.containerInfo), JA(t, A, a),
            QA(A), Ut = e, B && Gu && (Ql = !0), B = c, mt = u;
          break;
        case 12:
          JA(t, A, a), QA(A);
          break;
        case 31:
          JA(t, A, a), QA(A), u & 4 && (t = A.updateQueue, t !== null && (A.updateQueue =
            null, $e(A, t)));
          break;
        case 13:
          JA(t, A, a), QA(A), A.child.flags & 8192 && A.memoizedState !== null != (c !==
            null && c.memoizedState !== null) && (ri = lt()), u & 4 && (t = A.updateQueue,
            t !== null && (A.updateQueue = null, $e(A, t)));
          break;
        case 22:
          e = A.memoizedState !== null, l = c !== null && c.memoizedState !== null;
          var n = xA,
            r = C,
            I = mt;
          xA = n || e, mt = I || e, C = r || l, JA(t, A, a), C = r, mt = I, xA = n, QA(A), u &
            8192 && (t = A.stateNode, t._visibility = e ? t._visibility & -2 : t._visibility |
              1, !e || c === null || l || xA || C || (t = l || C, a = xA, c = C, xA = e || xA,
                C = t, Ha(A, 2), xA = a, C = c), !e && mt || nI(A, e)), u & 4 && (t = A
              .updateQueue, t !== null && (a = t.retryQueue, a !== null && (t.retryQueue =
                null, $e(A, a))));
          break;
        case 19:
          JA(t, A, a), QA(A), u & 4 && (t = A.updateQueue, t !== null && (A.updateQueue =
            null, $e(A, t)));
          break;
        case 30:
          u & 512 && (C || c === null || PA(c, c.return)), u = mp(), e = Gu, l = (a &
              335544064) === a, n = A.memoizedProps, Gu = l && na(n.default, n.update) !==
            "none", JA(t, A, a), QA(A), l && c !== null && B && (A.flags |= 4), Gu = e, B = u;
          break;
        case 21:
          break;
        case 7:
          u & 512 && (C || c === null || PA(c, c.return)), c && c.stateNode !== null && (c
            .stateNode._fragmentFiber = A);
        default:
          JA(t, A, a), QA(A)
      }
    }

    function QA(A) {
      var t = A.flags;
      if (t & 2) {
        try {
          for (var a, c = A.return; c !== null;) {
            if (Yd(c)) {
              a = c;
              break
            }
            c = c.return
          }
          c = null;
          for (var u = A.return; u !== null;) {
            if (Rq(u)) {
              var e = u.stateNode;
              c === null ? c = [e] : c.push(e)
            }
            if (pq(u)) break;
            u = u.return
          }
          var l = c;
          if (a == null) throw Error(U(160));
          switch (a.tag) {
            case 27:
              var n = a.stateNode,
                r = nn(A);
              gl(A, r, n, l);
              break;
            case 5:
              var I = a.stateNode;
              a.flags & 32 && (tu(I, ""), a.flags &= -33);
              var p = nn(A);
              gl(A, p, I, l);
              break;
            case 3:
            case 4:
              var q = a.stateNode.containerInfo,
                R = nn(A);
              aI(A, R, q, l);
              break;
            default:
              throw Error(U(161))
          }
        } catch (d) {
          Y(A, A.return, d)
        }
        A.flags &= -3
      }
      t & 4096 && (A.flags &= -4097)
    }

    function q1(A) {
      if (A.subtreeFlags & 1024)
        for (A = A.child; A !== null;) {
          var t = A;
          q1(t), t.tag === 5 && t.flags & 1024 && (t = t.stateNode, qu = !0, t.reset(), qu = !
            1), A = A.sibling
        }
    }

    function yc(A, t) {
      if (t.subtreeFlags & 9270)
        for (t = t.child; t !== null;) p1(t, A), t = t.sibling;
      else a1(t, !1)
    }

    function p1(A, t) {
      var a = A.alternate;
      if (a === null) cI(A, !1);
      else switch (A.tag) {
        case 3:
          if (iI = ft = !1, sR(), yc(t, A), !ft && !Ql) {
            if (A = Gt, A !== null)
              for (var c = 0; c < A.length; c += 3) {
                a = A[c];
                var u = A[c + 1];
                L1(a, A[c + 2]), a = a.ownerDocument.documentElement, a !== null && a
                  .animate({
                    opacity: [0, 0],
                    pointerEvents: ["none", "none"]
                  }, {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + u + ")"
                  })
              }
            A = t.containerInfo, A = A.nodeType === 9 ? A.documentElement : A.ownerDocument
              .documentElement, A !== null && A.style.viewTransitionName === "" && (A.style
                .viewTransitionName = "none", A.animate({
                  opacity: [0, 0],
                  pointerEvents: ["none", "none"]
                }, {
                  duration: 0,
                  fill: "forwards",
                  pseudoElement: "::view-transition-group(root)"
                }), A.animate({
                  width: [0, 0],
                  height: [0, 0]
                }, {
                  duration: 0,
                  fill: "forwards",
                  pseudoElement: "::view-transition"
                })), iI = !0
          }
          Gt = null;
          break;
        case 5:
          yc(t, A);
          break;
        case 4:
          c = ft, ft = !1, yc(t, A), ft && (Ql = !0), ft = c;
          break;
        case 22:
          A.memoizedState === null && (a.memoizedState !== null ? cI(A, !1) : yc(t, A));
          break;
        case 30:
          c = ft, u = sR(), ft = !1, yc(t, A), ft && (A.flags |= 4);
          var e = A.memoizedProps,
            l = A.stateNode;
          t = aa(e, l), l = aa(a.memoizedProps, l);
          var n = na(e.default, e.update);
          n === "none" ? t = !1 : (e = a.memoizedState, a.memoizedState = null, a = A.child,
              MA = 0, t = rq(A, a, t, l, n, e, !0), MA !== (e === null ? 0 : e.length) && (A
                .flags |= 32)), (A.flags & 4) !== 0 && t ? (uu(A, A.memoizedProps.onUpdate),
              Gt = u) : u !== null && (u.push.apply(u, Gt), Gt = u), ft = (A.flags & 32) !==
            0 ? !0 : c;
          break;
        default:
          yc(t, A)
      }
    }

    function zt(A, t) {
      if (t.subtreeFlags & 8772)
        for (t = t.child; t !== null;) c1(A, t.alternate, t), t = t.sibling
    }

    function Ha(A, t) {
      for (A = A.child; A !== null;) {
        var a = A,
          c = t;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ga(4, a, a.return), Ha(a, c);
            break;
          case 1:
            PA(a, a.return);
            var u = a.stateNode;
            typeof u.componentWillUnmount == "function" && Fd(a, a.return, u), Ha(a, c);
            break;
          case 27:
            (c & 2) !== 0 && v1(a.stateNode, a.type, a.memoizedProps);
          case 5:
            PA(a, a.return), a.tag !== 5 && a.tag !== 27 || hu(a), Ha(a, c);
            break;
          case 6:
            hu(a);
            break;
          case 26:
            PA(a, a.return), u = a.stateNode, a.memoizedState !== null || u === null || C || u
              .parentNode.removeChild(u), Ha(a, c);
            break;
          case 22:
            a.memoizedState === null && Ha(a, c);
            break;
          case 30:
            PA(a, a.return), Ha(a, c);
            break;
          case 7:
            PA(a, a.return);
          default:
            Ha(a, c)
        }
        A = A.sibling
      }
    }

    function st(A, t, a) {
      for (a = (t.subtreeFlags & 8772) !== 0 ? a : a & -2, t = t.child; t !== null;) {
        var c = t.alternate,
          u = A,
          e = t,
          l = e.flags,
          n = (a & 1) !== 0;
        switch (e.tag) {
          case 0:
          case 11:
          case 15:
            st(u, e, a), Ee(4, e);
            break;
          case 1:
            if (st(u, e, a), c = e, u = c.stateNode, typeof u.componentDidMount == "function")
              try {
                u.componentDidMount()
              } catch (p) {
                Y(c, c.return, p)
              }
            if (c = e, u = c.updateQueue, u !== null) {
              var r = c.stateNode;
              try {
                var I = u.shared.hiddenCallbacks;
                if (I !== null)
                  for (u.shared.hiddenCallbacks = null, u = 0; u < I.length; u++) ud(I[u], r)
              } catch (p) {
                Y(c, c.return, p)
              }
            }
            n && l & 64 && Md(e), Kt(e, e.return);
            break;
          case 27:
            (a & 2) !== 0 && _d(e);
          case 5:
            e.tag !== 5 && e.tag !== 27 || xR(e), st(u, e, a), n && c === null && l & 4 && tI(
              e), Kt(e, e.return);
            break;
          case 6:
            xR(e);
            break;
          case 26:
            r = e.stateNode, e.memoizedState !== null || r === null || xA || UI(ne(r
                .ownerDocument), e.type, r), st(u, e, a), n && c === null && l & 4 && tI(e),
              Kt(e, e.return);
            break;
          case 12:
            st(u, e, a);
            break;
          case 31:
            st(u, e, a), n && l & 4 && i1(u, e);
            break;
          case 13:
            st(u, e, a), n && l & 4 && n1(u, e);
            break;
          case 22:
            e.memoizedState === null && st(u, e, a), Kt(e, e.return);
            break;
          case 30:
            st(u, e, a), Kt(e, e.return);
            break;
          case 7:
            Kt(e, e.return);
          default:
            st(u, e, a)
        }
        t = t.sibling
      }
    }

    function dq(A, t) {
      var a = null;
      A !== null && A.memoizedState !== null && A.memoizedState.cachePool !== null && (a = A
          .memoizedState.cachePool.pool), A = null, t.memoizedState !== null && t
        .memoizedState.cachePool !== null && (A = t.memoizedState.cachePool.pool), A !== a &&
        (A != null && A.refCount++, a != null && Ve(a))
    }

    function jq(A, t) {
      A = null, t.alternate !== null && (A = t.alternate.memoizedState.cache), t = t
        .memoizedState.cache, t !== A && (t.refCount++, A != null && Ve(A))
    }

    function rt(A, t, a, c) {
      var u = (a & 335544064) === a;
      if (t.subtreeFlags & (u ? 10262 : 10256))
        for (t = t.child; t !== null;) R1(A, t, a, c), t = t.sibling;
      else u && t1(t)
    }

    function R1(A, t, a, c) {
      var u = (a & 335544064) === a;
      u && t.alternate === null && t.return !== null && t.return.alternate !== null && bl(t);
      var e = t.flags;
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          rt(A, t, a, c), e & 2048 && Ee(9, t);
          break;
        case 1:
          rt(A, t, a, c);
          break;
        case 3:
          rt(A, t, a, c), u && iI && (A = A.containerInfo, A = A.nodeType === 9 ? A.body : A
            .nodeName === "HTML" ? A.ownerDocument.body : A, A.style.viewTransitionName ===
            "root" && (A.style.viewTransitionName = ""), A = A.ownerDocument
            .documentElement, A !== null && A.style.viewTransitionName === "none" && (A
              .style.viewTransitionName = "")), e & 2048 && (e = null, t.alternate !==
            null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !==
            e && (t.refCount++, e != null && Ve(e)));
          break;
        case 12:
          if (e & 2048) {
            rt(A, t, a, c), e = t.stateNode;
            try {
              var l = t.memoizedProps,
                n = l.id,
                r = l.onPostCommit;
              typeof r == "function" && r(n, t.alternate === null ? "mount" : "update", e
                .passiveEffectDuration, -0)
            } catch (I) {
              Y(t, t.return, I)
            }
          } else rt(A, t, a, c);
          break;
        case 31:
          rt(A, t, a, c);
          break;
        case 13:
          rt(A, t, a, c);
          break;
        case 23:
          break;
        case 22:
          l = t.stateNode, n = t.alternate, t.memoizedState !== null ? (u && n !== null && n
              .memoizedState === null && bl(n), l._visibility & 2 ? rt(A, t, a, c) : vu(A, t)
              ) : (u && n !== null && n.memoizedState !== null && bl(t), l._visibility & 2 ?
              rt(A, t, a, c) : (l._visibility |= 2, kc(A, t, a, c, (t.subtreeFlags &
                10256) !== 0 || !1))), e & 2048 && dq(n, t);
          break;
        case 24:
          rt(A, t, a, c), e & 2048 && jq(t.alternate, t);
          break;
        case 30:
          u && (e = t.alternate, e !== null && (Jt(e.child, !0), Jt(t.child, !0))), rt(A, t,
            a, c);
          break;
        default:
          rt(A, t, a, c)
      }
    }

    function kc(A, t, a, c, u) {
      for (u = u && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null;) {
        var e = A,
          l = t,
          n = a,
          r = c,
          I = l.flags;
        switch (l.tag) {
          case 0:
          case 11:
          case 15:
            kc(e, l, n, r, u), Ee(8, l);
            break;
          case 23:
            break;
          case 22:
            var p = l.stateNode;
            l.memoizedState !== null ? p._visibility & 2 ? kc(e, l, n, r, u) : vu(e, l) : (p
              ._visibility |= 2, kc(e, l, n, r, u)), u && I & 2048 && dq(l.alternate, l);
            break;
          case 24:
            kc(e, l, n, r, u), u && I & 2048 && jq(l.alternate, l);
            break;
          default:
            kc(e, l, n, r, u)
        }
        t = t.sibling
      }
    }

    function vu(A, t) {
      if (t.subtreeFlags & 10256)
        for (t = t.child; t !== null;) {
          var a = A,
            c = t,
            u = c.flags;
          switch (c.tag) {
            case 22:
              vu(a, c), u & 2048 && dq(c.alternate, c);
              break;
            case 24:
              vu(a, c), u & 2048 && jq(c.alternate, c);
              break;
            default:
              vu(a, c)
          }
          t = t.sibling
        }
    }
    var $a = 8192;

    function Fa(A, t, a) {
      if (A.subtreeFlags & $a)
        for (A = A.child; A !== null;) r1(A, t, a), A = A.sibling
    }

    function r1(A, t, a) {
      switch (A.tag) {
        case 26:
          Fa(A, t, a), A.flags & $a && (A.memoizedState !== null ? KH(a, Ut, A.memoizedState,
            A.memoizedProps) : (A = A.stateNode, (t & 335544128) === t && _R(a, A)));
          break;
        case 5:
          Fa(A, t, a), A.flags & $a && (A = A.stateNode, (t & 335544128) === t && _R(a, A));
          break;
        case 3:
        case 4:
          var c = Ut;
          Ut = ne(A.stateNode.containerInfo), Fa(A, t, a), Ut = c;
          break;
        case 22:
          A.memoizedState === null && (c = A.alternate, c !== null && c.memoizedState !==
            null ? (c = $a, $a = 16777216, Fa(A, t, a), $a = c) : Fa(A, t, a));
          break;
        case 30:
          if ((A.flags & $a) !== 0 && (c = A.memoizedProps.name, c != null && c !== "auto")) {
            var u = A.stateNode;
            u.paired = null, ut === null && (ut = new Map), ut.set(c, u)
          }
          Fa(A, t, a);
          break;
        default:
          Fa(A, t, a)
      }
    }

    function d1(A) {
      var t = A.alternate;
      if (t !== null && (A = t.child, A !== null)) {
        t.child = null;
        do t = A.sibling, A.sibling = null, A = t; while (A !== null)
      }
    }

    function ku(A) {
      var t = A.deletions;
      if ((A.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var c = t[a];
            oA = c, b1(c, A)
          }
        d1(A)
      }
      if (A.subtreeFlags & 10256)
        for (A = A.child; A !== null;) j1(A), A = A.sibling
    }

    function j1(A) {
      switch (A.tag) {
        case 0:
        case 11:
        case 15:
          ku(A), A.flags & 2048 && ga(9, A, A.return);
          break;
        case 3:
          ku(A);
          break;
        case 12:
          ku(A);
          break;
        case 22:
          var t = A.stateNode;
          A.memoizedState !== null && t._visibility & 2 && (A.return === null || A.return
            .tag !== 13) ? (t._visibility &= -3, Ol(A)) : ku(A);
          break;
        default:
          ku(A)
      }
    }

    function Ol(A) {
      var t = A.deletions;
      if ((A.flags & 16) !== 0) {
        if (t !== null)
          for (var a = 0; a < t.length; a++) {
            var c = t[a];
            oA = c, b1(c, A)
          }
        d1(A)
      }
      for (A = A.child; A !== null;) {
        switch (t = A, t.tag) {
          case 0:
          case 11:
          case 15:
            ga(8, t, t.return), Ol(t);
            break;
          case 22:
            a = t.stateNode, a._visibility & 2 && (a._visibility &= -3, Ol(t));
            break;
          default:
            Ol(t)
        }
        A = A.sibling
      }
    }

    function b1(A, t) {
      for (; oA !== null;) {
        var a = oA;
        switch (a.tag) {
          case 0:
          case 11:
          case 15:
            ga(8, a, t);
            break;
          case 23:
          case 22:
            if (a.memoizedState !== null && a.memoizedState.cachePool !== null) {
              var c = a.memoizedState.cachePool.pool;
              c != null && c.refCount++
            }
            break;
          case 24:
            Ve(a.memoizedState.cache)
        }
        if (c = a.child, c !== null) c.return = a, oA = c;
        else A: for (a = A; oA !== null;) {
          c = oA;
          var u = c.sibling,
            e = c.return;
          if (e1(c), c === a) {
            oA = null;
            break A
          }
          if (u !== null) {
            u.return = e, oA = u;
            break A
          }
          oA = e
        }
      }
    }
    var m2 = {
        getCacheForType: function(A) {
          var t = WA(bA),
            a = t.data.get(A);
          return a === void 0 && (a = A(), t.data.set(A, a)), a
        },
        cacheSignal: function() {
          return WA(bA).controller.signal
        }
      },
      f2 = typeof WeakMap == "function" ? WeakMap : Map,
      h = 0,
      $ = null,
      D = null,
      g = 0,
      M = 0,
      tt = null,
      Ua = !1,
      bu = !1,
      bq = !1,
      la = 0,
      RA = 0,
      Ja = 0,
      lc = 0,
      Bl = 0,
      et = 0,
      cu = 0,
      Cu = null,
      CA = null,
      qI = !1,
      ri = 0,
      O1 = 0,
      hl = 1 / 0,
      vl = null,
      Ka = null,
      qA = 0,
      Pt = null,
      dc = null,
      gt = 0,
      pI = 0,
      RI = null,
      V1 = null,
      Fc = null,
      Yc = null,
      _c = null,
      Mu = 0,
      Vl = null;

    function It() {
      return (h & 2) !== 0 && g !== 0 ? g & -g : m.T !== null ? Vq() : Nr()
    }

    function H1() {
      if (et === 0)
        if ((g & 536870912) === 0 || L) {
          var A = De;
          De <<= 1, (De & 3932160) === 0 && (De = 262144), et = A
        } else et = 536870912;
      return A = zA.current, A !== null && (A.flags |= 32), et
    }

    function uu(A, t) {
      if (t != null) {
        var a = A.stateNode,
          c = a.ref;
        c === null && (c = a.ref = D1(aa(A.memoizedProps, a))), Yc === null && (Yc = []), Yc
          .push(t.bind(null, c))
      }
    }

    function YA(A, t, a) {
      (A === $ && (M === 2 || M === 9) || A.cancelPendingCommit !== null) && (eu(A, 0), ya(A,
        g, et, !1)), je(A, a), ((h & 2) === 0 || A !== $) && (A === $ && ((h & 2) === 0 && (
        lc |= a), RA === 4 && ya(A, g, et, !1)), Bt(A))
    }

    function E1(A, t, a) {
      if ((h & 6) !== 0) throw Error(U(327));
      var c = !a && (t & 127) === 0 && (t & A.expiredLanes) === 0 || de(A, t),
        u = c ? G2(A, t) : qn(A, t, !0),
        e = c;
      do {
        if (u === 0) {
          bu && !c && ya(A, t, 0, !1);
          break
        } else {
          if (a = A.current.alternate, e && !z2(a)) {
            u = qn(A, t, !1), e = !1;
            continue
          }
          if (u === 2) {
            if (e = t, A.errorRecoveryDisabledLanes & e) var l = 0;
            else l = A.pendingLanes & -536870913, l = l !== 0 ? l : l & 536870912 ?
              536870912 : 0;
            if (l !== 0) {
              t = l;
              A: {
                var n = A;u = Cu;
                var r = n.current.memoizedState.isDehydrated;
                if (r && (eu(n, l).flags |= 256), l = qn(n, l, !1), l !== 2 && l !== 6) {
                  if (bq && !r) {
                    n.errorRecoveryDisabledLanes |= e, lc |= e, u = 4;
                    break A
                  }
                  e = CA, CA = u, e !== null && (CA === null ? CA = e : CA.push.apply(CA,
                    e))
                }
                u = l
              }
              if (e = !1, u !== 2) continue
            }
          }
          if (u === 1) {
            eu(A, 0), ya(A, t, 0, !0);
            break
          }
          A: {
            switch (c = A, e = u, e) {
              case 0:
              case 1:
                throw Error(U(345));
              case 4:
                if ((t & 4194048) !== t && (t & 62914560) !== t) break;
              case 6:
                ya(c, t, et, !Ua);
                break A;
              case 2:
                CA = null;
                break;
              case 3:
              case 5:
                break;
              default:
                throw Error(U(329))
            }
            if ((t & 62914560) === t && (u = ri + 300 - lt(), 10 < u)) {
              if (ya(c, t, et, !Ua), $l(c, 0, !0) !== 0) break A;
              gt = t, c.timeoutHandle = Eq(yR.bind(null, c, a, CA, vl, qI, t, et, lc, cu,
                Ua, e, "Throttled", -0, 0), u);
              break A
            }
            yR(c, a, CA, vl, qI, t, et, lc, cu, Ua, e, null, -0, 0)
          }
        }
        break
      } while (!0);
      Bt(A)
    }

    function yR(A, t, a, c, u, e, l, n, r, I, p, q, R, d) {
      A.timeoutHandle = -1;
      var S = t.subtreeFlags,
        N = (e & 335544064) === e;
      if (q = null, (N || S & 8192 || (S & 16785408) === 16785408) && (q = {
            stylesheets: null,
            count: 0,
            imgCount: 0,
            imgBytes: 0,
            suspenseyImages: [],
            waitingForImages: !0,
            waitingForViewTransition: !1,
            unsuspend: Lt
          }, ut = null, r1(t, e, q), N && (S = q, N = A.containerInfo, N = (N.nodeType === 9 ?
            N : N.ownerDocument).__reactViewTransition, N != null && (S.count++, S
            .waitingForViewTransition = !0, S = Ie.bind(S), N.finished.then(S, S))), S = (e &
            62914560) === e ? ri - lt() : (e & 4194048) === e ? O1 - lt() : 0, S = GH(q, S),
          S !== null)) {
        gt = e, A.cancelPendingCommit = S(kR.bind(null, A, t, e, a, c, u, l, n, r, I, p, q,
          null, R, d)), ya(A, e, l, !I);
        return
      }
      kR(A, t, e, a, c, u, l, n, r, I, p, q)
    }

    function z2(A) {
      for (var t = A;;) {
        var a = t.tag;
        if ((a === 0 || a === 11 || a === 15) && t.flags & 16384 && (a = t.updateQueue, a !==
            null && (a = a.stores, a !== null)))
          for (var c = 0; c < a.length; c++) {
            var u = a[c],
              e = u.getSnapshot;
            u = u.value;
            try {
              if (!qt(e(), u)) return !1
            } catch {
              return !1
            }
          }
        if (a = t.child, t.subtreeFlags & 16384 && a !== null) a.return = t, t = a;
        else {
          if (t === A) break;
          for (; t.sibling === null;) {
            if (t.return === null || t.return === A) return !0;
            t = t.return
          }
          t.sibling.return = t.return, t = t.sibling
        }
      }
      return !0
    }

    function ya(A, t, a, c) {
      t = Or(A, t), t &= ~Bl, t &= ~lc, A.suspendedLanes |= t, A.pingedLanes &= ~t, c && (A
        .warmLanes |= t), c = A.expirationTimes;
      for (var u = t; 0 < u;) {
        var e = 31 - nt(u),
          l = 1 << e;
        c[e] = -1, u &= ~l
      }
      a !== 0 && Hr(A, a, t)
    }

    function di() {
      return (h & 6) === 0 ? (Se(0, !1), !1) : !0
    }

    function Oq() {
      if (D !== null) {
        if (M === 0) var A = D.return;
        else A = D, _t = Hc = null, Aq(A), vc = null, ae = 0, A = D;
        for (; A !== null;) Cd(A.alternate, A), A = A.return;
        D = null
      }
    }

    function eu(A, t) {
      var a = A.timeoutHandle;
      return a !== -1 && (A.timeoutHandle = -1, aH(a)), a = A.cancelPendingCommit, a !==
        null && (A.cancelPendingCommit = null, a()), gt = 0, Oq(), $ = A, D = a = $t(A
          .current, null), g = t, M = 0, tt = null, Ua = !1, bu = de(A, t), bq = !1, cu = et =
        Bl = lc = Ja = RA = 0, CA = Cu = null, qI = !1, la = Or(A, t), ui(), a
    }

    function S1(A, t) {
      X = null, m.H = Zl, t === du || t === ii ? (t = AR(), M = 3) : t === hI ? (t = AR(), M =
          4) : M = t === nq ? 8 : t !== null && typeof t == "object" && typeof t.then ==
        "function" ? 6 : 1, tt = t, D === null && (RA = 1, Dl(A, Vt(t, A.current)))
    }

    function N1() {
      var A = zA.current;
      return A === null ? !0 : (g & 4194048) === g ? ZA === null : (g & 62914560) === g || (
        g & 536870912) !== 0 ? A === ZA : !1
    }

    function x1() {
      var A = m.H;
      return m.H = Zl, A === null ? Zl : A
    }

    function o1() {
      var A = m.A;
      return m.A = m2, A
    }

    function Cl() {
      RA = 4, Ua || (g & 4194048) !== g && zA.current !== null || (bu = !0), (Ja &
        134217727) === 0 && (lc & 134217727) === 0 || $ === null || ya($, g, et, !1)
    }

    function qn(A, t, a) {
      var c = h;
      h |= 2;
      var u = x1(),
        e = o1();
      ($ !== A || g !== t) && (vl = null, eu(A, t)), t = !1;
      var l = RA;
      A: do try {
          if (M !== 0 && D !== null) {
            var n = D,
              r = tt;
            switch (M) {
              case 8:
                Oq(), l = 6;
                break A;
              case 3:
              case 2:
              case 9:
              case 6:
                zA.current === null && (t = !0);
                var I = M;
                if (M = 0, tt = null, gc(A, n, r, I), a && bu) {
                  l = 0;
                  break A
                }
                break;
              default:
                I = M, M = 0, tt = null, gc(A, n, r, I)
            }
          }
          K2(), l = RA;
          break
        } catch (p) {
          S1(A, p)
        }
        while (!0);
        return t && A.shellSuspendCounter++, _t = Hc = null, h = c, m.H = u, m.A = e, D ===
          null && ($ = null, g = 0, ui()), l
    }

    function K2() {
      for (; D !== null;) s1(D)
    }

    function G2(A, t) {
      var a = h;
      h |= 2;
      var c = x1(),
        u = o1();
      $ !== A || g !== t ? (vl = null, hl = lt() + 500, eu(A, t)) : bu = de(A, t);
      A: do try {
          if (M !== 0 && D !== null) {
            t = D;
            var e = tt;
            t: switch (M) {
              case 1:
                M = 0, tt = null, gc(A, t, e, 1);
                break;
              case 2:
              case 9:
                if ($p(e)) {
                  M = 0, tt = null, PR(t);
                  break
                }
                t = function() {
                  M !== 2 && M !== 9 || $ !== A || (M = 7), Bt(A)
                }, e.then(t, t);
                break A;
              case 3:
                M = 7;
                break A;
              case 4:
                M = 5;
                break A;
              case 7:
                $p(e) ? (M = 0, tt = null, PR(t)) : (M = 0, tt = null, gc(A, t, e, 7));
                break;
              case 5:
                var l = null;
                switch (D.tag) {
                  case 26:
                    l = D.memoizedState;
                  case 5:
                  case 27:
                    var n = D;
                    if (l ? F1(l) : n.stateNode.complete) {
                      M = 0, tt = null;
                      var r = n.sibling;
                      if (r !== null) D = r;
                      else {
                        var I = n.return;
                        I !== null ? (D = I, ji(I)) : D = null
                      }
                      break t
                    }
                }
                M = 0, tt = null, gc(A, t, e, 5);
                break;
              case 6:
                M = 0, tt = null, gc(A, t, e, 6);
                break;
              case 8:
                Oq(), RA = 6;
                break A;
              default:
                throw Error(U(462))
            }
          }
          X2();
          break
        } catch (p) {
          S1(A, p)
        }
        while (!0);
        return _t = Hc = null, m.H = c, m.A = u, h = a, D !== null ? 0 : ($ = null, g = 0,
        ui(), RA)
    }

    function X2() {
      for (; D !== null && !AV();) s1(D)
    }

    function s1(A) {
      var t = vd(A.alternate, A, la);
      A.memoizedProps = A.pendingProps, t === null ? ji(A) : D = t
    }

    function PR(A) {
      var t = A,
        a = t.alternate;
      switch (t.tag) {
        case 15:
        case 0:
          t = bR(a, t, t.pendingProps, t.type, void 0, g);
          break;
        case 11:
          t = bR(a, t, t.pendingProps, t.type.render, t.ref, g);
          break;
        case 5:
          Aq(t);
          var c = t;
          c === UA && (L ? (ml(c), c.tag === 5 && c.stateNode != null && (uA = c.stateNode)) :
            (ml(c), L = !0));
        default:
          Cd(a, t), t = D = Mr(t, la), t = vd(a, t, la)
      }
      A.memoizedProps = A.pendingProps, t === null ? ji(A) : D = t
    }

    function gc(A, t, a, c) {
      _t = Hc = null, Aq(t), vc = null, ae = 0;
      var u = t.return;
      try {
        if (o2(A, u, t, a, g)) {
          RA = 1, Dl(A, Vt(a, A.current)), D = null;
          return
        }
      } catch (e) {
        if (u !== null) throw D = u, e;
        RA = 1, Dl(A, Vt(a, A.current)), D = null;
        return
      }
      t.flags & 32768 ? (L || c === 1 ? A = !0 : bu || (g & 536870912) !== 0 ? A = !1 : (Ua =
        A = !0, (c === 2 || c === 9 || c === 3 || c === 6) && (c = zA.current, c !==
          null && c.tag === 13 && (c.flags |= 16384))), U1(t, A)) : ji(t)
    }

    function ji(A) {
      var t = A;
      do {
        if ((t.flags & 32768) !== 0) {
          U1(t, Ua);
          return
        }
        A = t.return;
        var a = P2(t.alternate, t, la);
        if (a !== null) {
          D = a;
          return
        }
        if (t = t.sibling, t !== null) {
          D = t;
          return
        }
        D = t = A
      } while (t !== null);
      RA === 0 && (RA = 5)
    }

    function U1(A, t) {
      do {
        var a = k2(A.alternate, A);
        if (a !== null) {
          a.flags &= 32767, D = a;
          return
        }
        if (a = A.return, a !== null && (a.flags |= 32768, a.subtreeFlags = 0, a.deletions =
            null), !t && (A = A.sibling, A !== null)) {
          D = A;
          return
        }
        D = A = a
      } while (A !== null);
      RA = 6, D = null
    }

    function kR(A, t, a, c, u, e, l, n, r, I, p, q) {
      A.cancelPendingCommit = null;
      do bi(); while (qA !== 0);
      if ((h & 6) !== 0) throw Error(U(327));
      if (t !== null) {
        if (t === A.current) throw Error(U(177));
        A === $ && (D = $ = null, g = 0), dc = t, Pt = A, gt = a, RI = u, V1 = c, L2(A, t, a,
          l, n, r, q)
      }
    }

    function L2(A, t, a, c, u, e, l) {
      var n = t.lanes | t.childLanes;
      if (pI = n, n |= DI, qV(A, a, n, c, u, e), Yc = null, (a & 335544064) === a ? (_c = R2(
          A), c = 10262) : (_c = null, c = 10256), (t.subtreeFlags & c) !== 0 || (t.flags &
        c) !== 0 ? (A.callbackNode = null, A.callbackPriority = 0, Q2(yl, function() {
          return bI(), null
        })) : (A.callbackNode = null, A.callbackPriority = 0), Jl = !1, c = (t.flags &
        13878) !== 0, (t.subtreeFlags & 13878) !== 0 || c) {
        c = m.T, m.T = null, u = v.p, v.p = 2, e = h, h |= 4;
        try {
          W2(A, t, a)
        } finally {
          h = e, v.p = u, m.T = c
        }
      }
      qA = 1, Jl ? Fc = nH(l, A.containerInfo, _c, rI, dI, D2, jI, bI, Z2, null, null) : (
      rI(), dI(), jI())
    }

    function Z2(A) {
      if (qA !== 0) {
        var t = Pt.onRecoverableError;
        t(A, {
          componentStack: null
        })
      }
    }

    function D2() {
      qA === 3 && (qA = 0, p1(dc, Pt), qA = 4)
    }

    function rI() {
      if (qA === 1) {
        qA = 0;
        var A = Pt,
          t = dc,
          a = gt,
          c = (t.flags & 13878) !== 0;
        if ((t.subtreeFlags & 13878) !== 0 || c) {
          c = m.T, m.T = null;
          var u = v.p;
          v.p = 2;
          var e = h;
          h |= 4;
          try {
            Gu = Ql = !1, I1(t, A, a), a = EI;
            var l = wr(A.containerInfo),
              n = a.focusedElem,
              r = a.selectionRange;
            if (l !== n && n && n.ownerDocument && Dr(n.ownerDocument.documentElement, n)) {
              if (r !== null && ZI(n)) {
                var I = r.start,
                  p = r.end;
                if (p === void 0 && (p = I), "selectionStart" in n) n.selectionStart = I, n
                  .selectionEnd = Math.min(p, n.value.length);
                else {
                  var q = n.ownerDocument || document,
                    R = q && q.defaultView || window;
                  if (R.getSelection) {
                    var d = R.getSelection(),
                      S = n.textContent.length,
                      N = Math.min(r.start, S),
                      x = r.end === void 0 ? N : Math.min(r.end, S);
                    !d.extend && N > x && (l = x, x = N, N = l);
                    var O = Bp(n, N),
                      j = Bp(n, x);
                    if (O && j && (d.rangeCount !== 1 || d.anchorNode !== O.node || d
                        .anchorOffset !== O.offset || d.focusNode !== j.node || d
                        .focusOffset !== j.offset)) {
                      var H = q.createRange();
                      H.setStart(O.node, O.offset), d.removeAllRanges(), N > x ? (d.addRange(
                        H), d.extend(j.node, j.offset)) : (H.setEnd(j.node, j.offset), d
                        .addRange(H))
                    }
                  }
                }
              }
              for (q = [], d = n; d = d.parentNode;) d.nodeType === 1 && q.push({
                element: d,
                left: d.scrollLeft,
                top: d.scrollTop
              });
              for (typeof n.focus == "function" && n.focus(), n = 0; n < q.length; n++) {
                var E = q[n];
                E.element.scrollLeft = E.left, E.element.scrollTop = E.top
              }
            }
            qu = !!HI, EI = HI = null
          } finally {
            h = e, v.p = u, m.T = c
          }
        }
        A.current = t, qA = 2
      }
    }

    function dI() {
      if (qA === 2) {
        qA = 0;
        var A = Pt,
          t = dc,
          a = (t.flags & 8772) !== 0;
        if ((t.subtreeFlags & 8772) !== 0 || a) {
          a = m.T, m.T = null;
          var c = v.p;
          v.p = 2;
          var u = h;
          h |= 4;
          try {
            c1(A, t.alternate, t)
          } finally {
            h = u, v.p = c, m.T = a
          }
        }
        qA = 3
      }
    }

    function jI() {
      if (qA === 4 || qA === 3) {
        qA = 0;
        var A = Fc;
        Fc = null, tV();
        var t = Pt,
          a = dc,
          c = gt,
          u = V1,
          e = (c & 335544064) === c ? 10262 : 10256;
        if ((a.subtreeFlags & e) !== 0 || (a.flags & e) !== 0 ? qA = 5 : (qA = 0, dc = Pt =
            null, y1(t, t.pendingLanes)), e = t.pendingLanes, e === 0 && (Ka = null), fI(c),
          a = a.stateNode, it && typeof it.onCommitFiberRoot == "function") try {
          it.onCommitFiberRoot(re, a, void 0, (a.current.flags & 128) === 128)
        } catch {}
        if (u !== null) {
          a = m.T, e = v.p, v.p = 2, m.T = null;
          try {
            for (var l = t.onRecoverableError, n = 0; n < u.length; n++) {
              var r = u[n];
              l(r.value, {
                componentStack: r.stack
              })
            }
          } finally {
            m.T = a, v.p = e
          }
        }
        if (u = Yc, l = _c, _c = null, u !== null && (Yc = null, l === null && (l = []), A !==
            null))
          for (r = 0; r < u.length; r++) a = (0, u[r])(l), a !== void 0 && A.finished.finally(
            a);
        (gt & 3) !== 0 && bi(), Bt(t), e = t.pendingLanes, (c & 261930) !== 0 && (e & 42) !==
          0 ? t === Vl ? Mu++ : (Mu = 0, Vl = t) : (Mu = 0, Vl = null), Se(0, !1)
      }
    }

    function y1(A, t) {
      (A.pooledCacheLanes &= t) === 0 && (t = A.pooledCache, t != null && (A.pooledCache =
        null, Ve(t)))
    }

    function bi() {
      return Fc !== null && (Fc.skipTransition(), Fc = null), rI(), dI(), jI(), bI()
    }

    function bI() {
      if (qA !== 5) return !1;
      var A = Pt,
        t = pI;
      pI = 0;
      var a = fI(gt),
        c = m.T,
        u = v.p;
      try {
        v.p = 32 > a ? 32 : a, m.T = null, a = RI, RI = null;
        var e = Pt,
          l = gt;
        if (qA = 0, dc = Pt = null, gt = 0, (h & 6) !== 0) throw Error(U(331));
        var n = h;
        if (h |= 4, j1(e.current), R1(e, e.current, l, a), h = n, Se(0, !1), it && typeof it
          .onPostCommitFiberRoot == "function") try {
          it.onPostCommitFiberRoot(re, e)
        } catch {}
        return !0
      } finally {
        v.p = u, m.T = c, y1(A, t)
      }
    }

    function WR(A, t, a) {
      t = Vt(a, t), t = Mn(A.stateNode, t, 2), A = ma(A, t, 2), A !== null && (je(A, 2), Bt(
        A))
    }

    function Y(A, t, a) {
      if (A.tag === 3) WR(A, A, a);
      else
        for (; t !== null;) {
          if (t.tag === 3) {
            WR(t, A, a);
            break
          } else if (t.tag === 1) {
            var c = t.stateNode;
            if (typeof t.type.getDerivedStateFromError == "function" || typeof c
              .componentDidCatch == "function" && (Ka === null || !Ka.has(c))) {
              A = Vt(a, A), a = gd(2), c = ma(t, a, 2), c !== null && (Jd(a, c, t, A), je(c,
                2), Bt(c));
              break
            }
          }
          t = t.return
        }
    }

    function pn(A, t, a) {
      var c = A.pingCache;
      if (c === null) {
        c = A.pingCache = new f2;
        var u = new Set;
        c.set(t, u)
      } else u = c.get(t), u === void 0 && (u = new Set, c.set(t, u));
      u.has(a) || (bq = !0, u.add(a), A = w2.bind(null, A, t, a), t.then(A, A))
    }

    function w2(A, t, a) {
      var c = A.pingCache;
      c !== null && c.delete(t), A.pingedLanes |= A.suspendedLanes & a, A.warmLanes &= ~a,
        $ === A && (g & a) === a && ((RA === 4 || RA === 3 && (g & 62914560) === g && 300 >
          lt() - ri) && (h & 2) === 0 ? eu(A, 0) : Bl |= a, cu === g && (cu = 0)), Bt(A)
    }

    function P1(A, t) {
      t === 0 && (t = Vr()), A = Vc(A, t), A !== null && (je(A, t), Bt(A))
    }

    function g2(A) {
      var t = A.memoizedState,
        a = 0;
      t !== null && (a = t.retryLane), P1(A, a)
    }

    function J2(A, t) {
      var a = 0;
      switch (A.tag) {
        case 31:
        case 13:
          var c = A.stateNode,
            u = A.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case 19:
          c = A.stateNode;
          break;
        case 22:
          c = A.stateNode._retryCache;
          break;
        default:
          throw Error(U(314))
      }
      c !== null && c.delete(t), P1(A, a)
    }

    function Q2(A, t) {
      return TI(A, t)
    }
    var lu = null,
      Wc = null,
      OI = !1,
      Ml = !1,
      Rn = !1,
      Pa = 0;

    function Bt(A) {
      A !== Wc && A.next === null && (Wc === null ? lu = Wc = A : Wc = Wc.next = A), Ml = !0,
        OI || (OI = !0, h2())
    }

    function Se(A, t) {
      if (!Rn && Ml) {
        Rn = !0;
        do
          for (var a = !1, c = lu; c !== null;) {
            if (!t)
              if (A !== 0) {
                var u = c.pendingLanes;
                if (u === 0) var e = 0;
                else {
                  var l = c.suspendedLanes,
                    n = c.pingedLanes;
                  e = (1 << 31 - nt(42 | A) + 1) - 1, e &= u & ~(l & ~n), e = e & 201326741 ?
                    e & 201326741 | 1 : e ? e | 2 : 0
                }
                e !== 0 && (a = !0, TR(c, e))
              } else e = g, e = $l(c, c === $ ? e : 0, c.cancelPendingCommit !== null || c
                .timeoutHandle !== -1), (e & 3) === 0 || de(c, e) || (a = !0, TR(c, e));
            c = c.next
          }
        while (a);
        Rn = !1
      }
    }

    function B2() {
      k1()
    }

    function k1() {
      Ml = OI = !1;
      var A = 0;
      Pa !== 0 && tH() && (A = Pa);
      for (var t = lt(), a = null, c = lu; c !== null;) {
        var u = c.next,
          e = W1(c, t);
        e === 0 ? (c.next = null, a === null ? lu = u : a.next = u, u === null && (Wc = a)) :
          (a = c, (A !== 0 || (e & 3) !== 0) && (Ml = !0)), c = u
      }
      qA !== 0 && qA !== 5 || Se(A, !1), Pa !== 0 && (Pa = 0)
    }

    function W1(A, t) {
      for (var a = A.suspendedLanes, c = A.pingedLanes, u = A.expirationTimes, e = A
          .pendingLanes & -62914561; 0 < e;) {
        var l = 31 - nt(e),
          n = 1 << l,
          r = u[l];
        r === -1 ? ((n & a) === 0 || (n & c) !== 0) && (u[l] = IV(n, t)) : r <= t && (A
          .expiredLanes |= n), e &= ~n
      }
      if (t = $, a = g, a = $l(A, A === t ? a : 0, A.cancelPendingCommit !== null || A
          .timeoutHandle !== -1), c = A.callbackNode, a === 0 || A === t && (M === 2 || M ===
          9) || A.cancelPendingCommit !== null) return c !== null && c !== null && Ji(c), A
        .callbackNode = null, A.callbackPriority = 0;
      if ((a & 3) === 0 || de(A, a)) {
        if (t = a & -a, t === A.callbackPriority) return t;
        switch (c !== null && Ji(c), fI(a)) {
          case 2:
          case 8:
            a = jr;
            break;
          case 32:
            a = yl;
            break;
          case 268435456:
            a = br;
            break;
          default:
            a = yl
        }
        return c = T1.bind(null, A), a = TI(a, c), A.callbackPriority = t, A.callbackNode = a,
          t
      }
      return c !== null && c !== null && Ji(c), A.callbackPriority = 2, A.callbackNode = null,
        2
    }

    function T1(A, t) {
      if (qA !== 0 && qA !== 5) return A.callbackNode = null, A.callbackPriority = 0, null;
      var a = A.callbackNode;
      if (bi() && A.callbackNode !== a) return null;
      var c = g;
      return c = $l(A, A === $ ? c : 0, A.cancelPendingCommit !== null || A.timeoutHandle !==
        -1), c === 0 ? null : (E1(A, c, t), W1(A, lt()), A.callbackNode != null && A
        .callbackNode === a ? T1.bind(null, A) : null)
    }

    function TR(A, t) {
      if (bi()) return null;
      E1(A, t, !0)
    }

    function h2() {
      cH(function() {
        (h & 6) !== 0 ? TI(dr, B2) : k1()
      })
    }

    function Vq() {
      if (Pa === 0) {
        var A = qc;
        A === 0 && (A = Ze, Ze <<= 1, (Ze & 261888) === 0 && (Ze = 256)), Pa = A
      }
      return Pa
    }

    function mR(A) {
      return A == null || typeof A == "symbol" || typeof A == "boolean" ? null : typeof A ==
        "function" ? A : ll(A)
    }

    function v2(A, t, a, c, u) {
      if (t === "submit" && a && a.stateNode === u) {
        var e = mR((u[$A] || null).action),
          l = c.submitter;
        l && (t = (t = l[$A] || null) ? mR(t.formAction) : l.getAttribute("formAction"), t !==
          null && (e = t, l = null));
        var n = new ti("action", "action", null, c, u);
        A.push({
          event: n,
          listeners: [{
            instance: null,
            listener: function() {
              if (c.defaultPrevented) {
                if (Pa !== 0) {
                  var r = new FormData(u, l);
                  vn(a, {
                    pending: !0,
                    data: r,
                    method: u.method,
                    action: e
                  }, null, r)
                }
              } else typeof e == "function" && (n.preventDefault(), r =
                new FormData(u, l), vn(a, {
                  pending: !0,
                  data: r,
                  method: u.method,
                  action: e
                }, e, r))
            },
            currentTarget: u
          }]
        })
      }
    }
    for (Al = 0; Al < Gn.length; Al++) tl = Gn[Al], fR = tl.toLowerCase(), zR = tl[0]
      .toUpperCase() + tl.slice(1), kt(fR, "on" + zR);
    var tl, fR, zR, Al;
    kt(Jr, "onAnimationEnd");
    kt(Qr, "onAnimationIteration");
    kt(Br, "onAnimationStart");
    kt("dblclick", "onDoubleClick");
    kt("focusin", "onFocus");
    kt("focusout", "onBlur");
    kt(u2, "onTransitionRun");
    kt(e2, "onTransitionStart");
    kt(l2, "onTransitionCancel");
    kt(hr, "onTransitionEnd");
    Au("onMouseEnter", ["mouseout", "mouseover"]);
    Au("onMouseLeave", ["mouseout", "mouseover"]);
    Au("onPointerEnter", ["pointerout", "pointerover"]);
    Au("onPointerLeave", ["pointerout", "pointerover"]);
    bc("onChange", "change click focusin focusout input keydown keyup selectionchange".split(
      " "));
    bc("onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange"
      .split(" "));
    bc("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
    bc("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(
      " "));
    bc("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown"
      .split(" "));
    bc("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown"
      .split(" "));
    var ee =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting"
      .split(" "),
      C2 = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ")
        .concat(ee));

    function m1(A, t) {
      t = (t & 4) !== 0;
      for (var a = 0; a < A.length; a++) {
        var c = A[a],
          u = c.event;
        c = c.listeners;
        A: {
          var e = void 0;
          if (t)
            for (var l = c.length - 1; 0 <= l; l--) {
              var n = c[l],
                r = n.instance,
                I = n.currentTarget;
              if (n = n.listener, r !== e && u.isPropagationStopped()) break A;
              e = n, u.currentTarget = I;
              try {
                e(u)
              } catch (p) {
                kl(p)
              }
              u.currentTarget = null, e = r
            } else
              for (l = 0; l < c.length; l++) {
                if (n = c[l], r = n.instance, I = n.currentTarget, n = n.listener, r !==
                  e && u.isPropagationStopped()) break A;
                e = n, u.currentTarget = I;
                try {
                  e(u)
                } catch (p) {
                  kl(p)
                }
                u.currentTarget = null, e = r
              }
        }
      }
    }

    function Z(A, t) {
      var a = t[Pp];
      a === void 0 && (a = t[Pp] = new Set);
      var c = A + "__bubble";
      a.has(c) || (f1(t, A, 2, !1), a.add(c))
    }

    function rn(A, t, a) {
      var c = 0;
      t && (c |= 4), f1(a, A, c, t)
    }
    var al = "_reactListening" + Math.random().toString(36).slice(2);

    function Hq(A) {
      if (!A[al]) {
        A[al] = !0, or.forEach(function(a) {
          a !== "selectionchange" && (C2.has(a) || rn(a, !1, A), rn(a, !0, A))
        });
        var t = A.nodeType === 9 ? A : A.ownerDocument;
        t === null || t[al] || (t[al] = !0, rn("selectionchange", !1, t))
      }
    }

    function f1(A, t, a, c) {
      switch (cj(t)) {
        case 2:
          var u = DH;
          break;
        case 8:
          u = wH;
          break;
        default:
          u = Uq
      }
      a = u.bind(null, t, a, A), u = void 0, !mn || t !== "touchstart" && t !== "touchmove" &&
        t !== "wheel" || (u = !0), c ? u !== void 0 ? A.addEventListener(t, a, {
          capture: !0,
          passive: u
        }) : A.addEventListener(t, a, !0) : u !== void 0 ? A.addEventListener(t, a, {
          passive: u
        }) : A.addEventListener(t, a, !1)
    }

    function dn(A, t, a, c, u) {
      var e = c;
      if ((t & 1) === 0 && (t & 2) === 0 && c !== null) A: for (;;) {
        if (c === null) return;
        var l = c.tag;
        if (l === 3 || l === 4) {
          var n = c.stateNode.containerInfo;
          if (n === u) break;
          if (l === 4)
            for (l = c.return; l !== null;) {
              var r = l.tag;
              if ((r === 3 || r === 4) && l.stateNode.containerInfo === u) return;
              l = l.return
            }
          for (; n !== null;) {
            if (l = Ac(n), l === null) return;
            if (r = l.tag, r === 5 || r === 6 || r === 26 || r === 27) {
              c = e = l;
              continue A
            }
            n = n.parentNode
          }
        }
        c = c.return
      }
      mr(function() {
        var I = e,
          p = KI(a),
          q = [];
        A: {
          var R = vr.get(A);
          if (R !== void 0) {
            var d = ti,
              S = A;
            switch (A) {
              case "keypress":
                if (nl(a) === 0) break A;
              case "keydown":
              case "keyup":
                d = zV;
                break;
              case "focusin":
                S = "focus", d = Mi;
                break;
              case "focusout":
                S = "blur", d = Mi;
                break;
              case "beforeblur":
              case "afterblur":
                d = Mi;
                break;
              case "click":
                if (a.button === 2) break A;
              case "auxclick":
              case "dblclick":
              case "mousedown":
              case "mousemove":
              case "mouseup":
              case "mouseout":
              case "mouseover":
              case "contextmenu":
                d = Gp;
                break;
              case "drag":
              case "dragend":
              case "dragenter":
              case "dragexit":
              case "dragleave":
              case "dragover":
              case "dragstart":
              case "drop":
                d = NV;
                break;
              case "touchcancel":
              case "touchend":
              case "touchmove":
              case "touchstart":
                d = ZV;
                break;
              case Jr:
              case Qr:
              case Br:
                d = sV;
                break;
              case hr:
                d = wV;
                break;
              case "scroll":
              case "scrollend":
                d = EV;
                break;
              case "wheel":
                d = JV;
                break;
              case "copy":
              case "cut":
              case "paste":
                d = yV;
                break;
              case "gotpointercapture":
              case "lostpointercapture":
              case "pointercancel":
              case "pointerdown":
              case "pointermove":
              case "pointerout":
              case "pointerover":
              case "pointerup":
                d = Lp;
                break;
              case "submit":
                d = XV;
                break;
              case "toggle":
              case "beforetoggle":
                d = BV
            }
            var N = (t & 4) !== 0,
              x = !N && (A === "scroll" || A === "scrollend"),
              O = N ? R !== null ? R + "Capture" : null : R;
            N = [];
            for (var j = I, H; j !== null;) {
              var E = j;
              if (H = E.stateNode, E = E.tag, E !== 5 && E !== 26 && E !== 27 || H ===
                null || O === null || (E = Yu(j, O), E != null && N.push(le(j, E, H))),
                x) break;
              j = j.return
            }
            0 < N.length && (R = new d(R, S, null, a, p), q.push({
              event: R,
              listeners: N
            }))
          }
        }
        if ((t & 7) === 0) {
          A: {
            if (d = A === "mouseover" || A === "pointerover", R = A === "mouseout" ||
              A === "pointerout", d && a !== Tn && (S = a.relatedTarget || a
              .fromElement) && (Ac(S) || S[Ru])) break A;
            (R || d) && (S = p.window === p ? p : (d = p.ownerDocument) ? d.defaultView ||
              d.parentWindow : window, R ? (d = a.relatedTarget || a.toElement, R = I, d =
                d ? Ac(d) : null, d !== null && (x = Re(d), N = d.tag, d !== x || N !==
                  5 && N !== 27 && N !== 6) && (d = null)) : (R = null, d = I), R !== d &&
              (N = Gp, E = "onMouseLeave", O = "onMouseEnter", j = "mouse", (A ===
                  "pointerout" || A === "pointerover") && (N = Lp, E = "onPointerLeave",
                  O = "onPointerEnter", j = "pointer"), x = R == null ? S : zu(R), H =
                d == null ? S : zu(d), S = new N(E, j + "leave", R, a, p), S.target = x, S
                .relatedTarget = H, E = null, Ac(p) === I && (N = new N(O, j + "enter", d,
                  a, p), N.target = H, N.relatedTarget = x, E = N), x = E, N = R && d ?
                Hn(R, d, M2) : null, R !== null && KR(q, S, R, N, !1), d !== null && x !==
                null && KR(q, x, d, N, !0)))
          }
          A: {
            if (R = I ? zu(I) : window, d = R.nodeName && R.nodeName.toLowerCase(), d ===
              "select" || d === "input" && R.type === "file") var s = gp;
            else if (wp(R))
              if (Lr) s = t2;
              else {
                s = $V;
                var P = _V
              }
            else d = R.nodeName,
            !d || d.toLowerCase() !== "input" || R.type !== "checkbox" && R.type !==
            "radio" ? I && zI(I.elementType) && (s = gp) : s = A2;
            if (s && (s = s(A, I))) {
              Xr(q, s, a, p);
              break A
            }
            P && P(A, R, I)
          }
          switch (P = I ? zu(I) : window, A) {
            case "focusin":
              (wp(P) || P.contentEditable === "true") && (Gc = P, zn = I, Zu = null);
              break;
            case "focusout":
              Zu = zn = Gc = null;
              break;
            case "mousedown":
              Kn = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              Kn = !1, hp(q, a, p);
              break;
            case "selectionchange":
              if (c2) break;
            case "keydown":
            case "keyup":
              hp(q, a, p)
          }
          var k;
          if (LI) A: {
            switch (A) {
              case "compositionstart":
                var o = "onCompositionStart";
                break A;
              case "compositionend":
                o = "onCompositionEnd";
                break A;
              case "compositionupdate":
                o = "onCompositionUpdate";
                break A
            }
            o = void 0
          }
          else Kc ? Kr(A, a) && (o = "onCompositionEnd") : A === "keydown" && a
            .keyCode === 229 && (o = "onCompositionStart");o && (zr && a.locale !==
            "ko" && (Kc || o !== "onCompositionStart" ? o === "onCompositionEnd" && Kc &&
              (k = fr()) : (oa = p, GI = "value" in oa ? oa.value : oa.textContent, Kc = !
                0)), P = Fl(I, o), 0 < P.length && (o = new Xp(o, A, null, a, p), q.push({
              event: o,
              listeners: P
            }), k ? o.data = k : (k = Gr(a), k !== null && (o.data = k)))),
          (k = vV ? CV(A, a) : MV(A, a)) && (o = Fl(I, "onBeforeInput"), 0 < o.length && (
            P = new Xp("onBeforeInput", "beforeinput", null, a, p), q.push({
              event: P,
              listeners: o
            }), P.data = k)),
          v2(q, A, I, a, p)
        }
        m1(q, t)
      })
    }

    function le(A, t, a) {
      return {
        instance: A,
        listener: t,
        currentTarget: a
      }
    }

    function Fl(A, t) {
      for (var a = t + "Capture", c = []; A !== null;) {
        var u = A,
          e = u.stateNode;
        if (u = u.tag, u !== 5 && u !== 26 && u !== 27 || e === null || (u = Yu(A, a), u !=
            null && c.unshift(le(A, u, e)), u = Yu(A, t), u != null && c.push(le(A, u, e))), A
          .tag === 3) return c;
        A = A.return
      }
      return []
    }

    function M2(A) {
      if (A === null) return null;
      do A = A.return; while (A && A.tag !== 5 && A.tag !== 27);
      return A || null
    }

    function KR(A, t, a, c, u) {
      for (var e = t._reactName, l = []; a !== null && a !== c;) {
        var n = a,
          r = n.alternate,
          I = n.stateNode;
        if (n = n.tag, r !== null && r === c) break;
        n !== 5 && n !== 26 && n !== 27 || I === null || (r = I, u ? (I = Yu(a, e), I !=
          null && l.unshift(le(a, I, r))) : u || (I = Yu(a, e), I != null && l.push(le(a,
          I, r)))), a = a.return
      }
      l.length !== 0 && A.push({
        event: t,
        listeners: l
      })
    }
    var F2 = /\r\n?/g,
      Y2 = /\u0000|\uFFFD/g;

    function GR(A) {
      return (typeof A == "string" ? A : "" + A).replace(F2, `
`).replace(Y2, "")
    }

    function z1(A, t) {
      return t = GR(t), GR(A) === t
    }

    function F(A, t, a, c, u, e) {
      switch (a) {
        case "children":
          if (typeof c == "string") t === "body" || t === "textarea" && c === "" || tu(A, c);
          else if (typeof c == "number" || typeof c == "bigint") t !== "body" && tu(A, "" +
          c);
          else return;
          break;
        case "className":
          ge(A, "class", c);
          break;
        case "tabIndex":
          ge(A, "tabindex", c);
          break;
        case "dir":
        case "role":
        case "viewBox":
        case "width":
        case "height":
          ge(A, a, c);
          break;
        case "style":
          Tr(A, c, e);
          return;
        case "data":
          if (t !== "object") {
            ge(A, "data", c);
            break
          }
        case "src":
        case "href":
          if (c === "" && (t !== "a" || a !== "href")) {
            A.removeAttribute(a);
            break
          }
          if (c == null || typeof c == "function" || typeof c == "symbol" || typeof c ==
            "boolean") {
            A.removeAttribute(a);
            break
          }
          c = ll(c), A.setAttribute(a, c);
          break;
        case "action":
        case "formAction":
          if (typeof c == "function") {
            A.setAttribute(a,
              "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
              );
            break
          } else typeof e == "function" && (a === "formAction" ? (t !== "input" && F(A, t,
            "name", u.name, u, null), F(A, t, "formEncType", u.formEncType, u, null), F(
            A, t, "formMethod", u.formMethod, u, null), F(A, t, "formTarget", u
            .formTarget, u, null)) : (F(A, t, "encType", u.encType, u, null), F(A, t,
            "method", u.method, u, null), F(A, t, "target", u.target, u, null)));
          if (c == null || typeof c == "symbol" || typeof c == "boolean") {
            A.removeAttribute(a);
            break
          }
          c = ll(c), A.setAttribute(a, c);
          break;
        case "onClick":
          c != null && (A.onclick = Lt);
          return;
        case "onScroll":
          c != null && Z("scroll", A);
          return;
        case "onScrollEnd":
          c != null && Z("scrollend", A);
          return;
        case "dangerouslySetInnerHTML":
          if (c != null) {
            if (typeof c != "object" || !("__html" in c)) throw Error(U(61));
            if (a = c.__html, a != null) {
              if (u.children != null) throw Error(U(60));
              e?.__html !== a && (A.innerHTML = a)
            }
          }
          break;
        case "multiple":
          A.multiple = c && typeof c != "function" && typeof c != "symbol";
          break;
        case "muted":
          A.muted = c && typeof c != "function" && typeof c != "symbol";
          break;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "ref":
          break;
        case "autoFocus":
          break;
        case "xlinkHref":
          if (c == null || typeof c == "function" || typeof c == "boolean" || typeof c ==
            "symbol") {
            A.removeAttribute("xlink:href");
            break
          }
          a = ll(c), A.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", a);
          break;
        case "contentEditable":
        case "spellCheck":
        case "draggable":
        case "value":
        case "autoReverse":
        case "externalResourcesRequired":
        case "focusable":
        case "preserveAlpha":
          c != null && typeof c != "function" && typeof c != "symbol" ? A.setAttribute(a, c) :
            A.removeAttribute(a);
          break;
        case "inert":
        case "allowFullScreen":
        case "async":
        case "autoPlay":
        case "controls":
        case "credentialless":
        case "default":
        case "defer":
        case "disabled":
        case "disablePictureInPicture":
        case "disableRemotePlayback":
        case "formNoValidate":
        case "hidden":
        case "loop":
        case "noModule":
        case "noValidate":
        case "open":
        case "playsInline":
        case "readOnly":
        case "required":
        case "reversed":
        case "scoped":
        case "seamless":
        case "itemScope":
          c && typeof c != "function" && typeof c != "symbol" ? A.setAttribute(a, "") : A
            .removeAttribute(a);
          break;
        case "capture":
        case "download":
          c === !0 ? A.setAttribute(a, "") : c !== !1 && c != null && typeof c !=
            "function" && typeof c != "symbol" ? A.setAttribute(a, c) : A.removeAttribute(a);
          break;
        case "cols":
        case "rows":
        case "size":
        case "span":
          c != null && typeof c != "function" && typeof c != "symbol" && !isNaN(c) && 1 <= c ?
            A.setAttribute(a, c) : A.removeAttribute(a);
          break;
        case "rowSpan":
        case "start":
          c == null || typeof c == "function" || typeof c == "symbol" || isNaN(c) ? A
            .removeAttribute(a) : A.setAttribute(a, c);
          break;
        case "popover":
          Z("beforetoggle", A), Z("toggle", A), el(A, "popover", c);
          break;
        case "xlinkActuate":
          Mt(A, "http://www.w3.org/1999/xlink", "xlink:actuate", c);
          break;
        case "xlinkArcrole":
          Mt(A, "http://www.w3.org/1999/xlink", "xlink:arcrole", c);
          break;
        case "xlinkRole":
          Mt(A, "http://www.w3.org/1999/xlink", "xlink:role", c);
          break;
        case "xlinkShow":
          Mt(A, "http://www.w3.org/1999/xlink", "xlink:show", c);
          break;
        case "xlinkTitle":
          Mt(A, "http://www.w3.org/1999/xlink", "xlink:title", c);
          break;
        case "xlinkType":
          Mt(A, "http://www.w3.org/1999/xlink", "xlink:type", c);
          break;
        case "xmlBase":
          Mt(A, "http://www.w3.org/XML/1998/namespace", "xml:base", c);
          break;
        case "xmlLang":
          Mt(A, "http://www.w3.org/XML/1998/namespace", "xml:lang", c);
          break;
        case "xmlSpace":
          Mt(A, "http://www.w3.org/XML/1998/namespace", "xml:space", c);
          break;
        case "is":
          el(A, "is", c);
          break;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!(2 < a.length) || a[0] !== "o" && a[0] !== "O" || a[1] !== "n" && a[1] !== "N")
            a = VV.get(a) || a, el(A, a, c);
          else return
      }
      B = !0
    }

    function VI(A, t, a, c, u, e) {
      switch (a) {
        case "style":
          Tr(A, c, e);
          return;
        case "dangerouslySetInnerHTML":
          if (c != null) {
            if (typeof c != "object" || !("__html" in c)) throw Error(U(61));
            if (a = c.__html, a != null) {
              if (u.children != null) throw Error(U(60));
              e?.__html !== a && (A.innerHTML = a)
            }
          }
          break;
        case "children":
          if (typeof c == "string") tu(A, c);
          else if (typeof c == "number" || typeof c == "bigint") tu(A, "" + c);
          else return;
          break;
        case "onScroll":
          c != null && Z("scroll", A);
          return;
        case "onScrollEnd":
          c != null && Z("scrollend", A);
          return;
        case "onClick":
          c != null && (A.onclick = Lt);
          return;
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
        case "innerHTML":
        case "ref":
          return;
        case "innerText":
        case "textContent":
          return;
        default:
          if (!sr.hasOwnProperty(a)) A: {
            if (a[0] === "o" && a[1] === "n" && (u = a.endsWith("Capture"), e = a.slice(2,
                  u ? a.length - 7 : void 0), t = A[$A] || null, t = t != null ? t[a] :
                null, typeof t == "function" && A.removeEventListener(e, t, u), typeof c ==
                "function")) {
              typeof t != "function" && t !== null && (a in A ? A[a] = null : A
                .hasAttribute(a) && A.removeAttribute(a)), A.addEventListener(e, c, u);
              break A
            }
            B = !0,
            a in A ? A[a] = c : c === !0 ? A.setAttribute(a, "") : el(A, a, c)
          }
          return
      }
      B = !0
    }

    function fA(A, t, a) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "img":
          Z("error", A), Z("load", A);
          var c = !1,
            u = !1,
            e;
          for (e in a)
            if (a.hasOwnProperty(e)) {
              var l = a[e];
              if (l != null) switch (e) {
                case "src":
                  c = !0;
                  break;
                case "srcSet":
                  u = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(U(137, t));
                default:
                  F(A, t, e, l, a, null)
              }
            } u && F(A, t, "srcSet", a.srcSet, a, null), c && F(A, t, "src", a.src, a, null);
          return;
        case "input":
          Z("invalid", A);
          var n = e = l = u = null,
            r = null,
            I = null;
          for (c in a)
            if (a.hasOwnProperty(c)) {
              var p = a[c];
              if (p != null) switch (c) {
                case "name":
                  u = p;
                  break;
                case "type":
                  l = p;
                  break;
                case "checked":
                  r = p;
                  break;
                case "defaultChecked":
                  I = p;
                  break;
                case "value":
                  e = p;
                  break;
                case "defaultValue":
                  n = p;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (p != null) throw Error(U(137, t));
                  break;
                default:
                  F(A, t, c, p, a, null)
              }
            } Pr(A, e, n, r, I, l, u, !1);
          return;
        case "select":
          Z("invalid", A), c = l = e = null;
          for (u in a)
            if (a.hasOwnProperty(u) && (n = a[u], n != null)) switch (u) {
              case "value":
                e = n;
                break;
              case "defaultValue":
                l = n;
                break;
              case "multiple":
                c = n;
              default:
                F(A, t, u, n, a, null)
            }
          t = e, a = l, A.multiple = !!c, t != null ? Qc(A, !!c, t, !1) : a != null && Qc(A, !
            !c, a, !0);
          return;
        case "textarea":
          Z("invalid", A), e = u = c = null;
          for (l in a)
            if (a.hasOwnProperty(l) && (n = a[l], n != null)) switch (l) {
              case "value":
                c = n;
                break;
              case "defaultValue":
                u = n;
                break;
              case "children":
                e = n;
                break;
              case "dangerouslySetInnerHTML":
                if (n != null) throw Error(U(91));
                break;
              default:
                F(A, t, l, n, a, null)
            }
          Wr(A, c, u, e);
          return;
        case "option":
          for (r in a) a.hasOwnProperty(r) && (c = a[r], c != null) && (r === "selected" ? A
            .selected = c && typeof c != "function" && typeof c != "symbol" : F(A, t, r, c,
              a, null));
          return;
        case "dialog":
          Z("beforetoggle", A), Z("toggle", A), Z("cancel", A), Z("close", A);
          break;
        case "iframe":
        case "object":
          Z("load", A);
          break;
        case "video":
        case "audio":
          for (c = 0; c < ee.length; c++) Z(ee[c], A);
          break;
        case "image":
          Z("error", A), Z("load", A);
          break;
        case "details":
          Z("toggle", A);
          break;
        case "embed":
        case "source":
        case "link":
          Z("error", A), Z("load", A);
        case "area":
        case "base":
        case "br":
        case "col":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "track":
        case "wbr":
        case "menuitem":
          for (I in a)
            if (a.hasOwnProperty(I) && (c = a[I], c != null)) switch (I) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(U(137, t));
              default:
                F(A, t, I, c, a, null)
            }
          return;
        default:
          if (zI(t)) {
            for (p in a) a.hasOwnProperty(p) && (c = a[p], c !== void 0 && VI(A, t, p, c, a,
              void 0));
            return
          }
      }
      for (n in a) a.hasOwnProperty(n) && (c = a[n], c != null && F(A, t, n, c, a, null))
    }
    var _2 = {};

    function $2(A, t, a, c) {
      switch (t) {
        case "div":
        case "span":
        case "svg":
        case "path":
        case "a":
        case "g":
        case "p":
        case "li":
          break;
        case "input":
          var u = null,
            e = null,
            l = null,
            n = null,
            r = null,
            I = null,
            p = null;
          for (d in a) {
            var q = a[d];
            if (a.hasOwnProperty(d) && q != null) switch (d) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                r = q;
              default:
                c.hasOwnProperty(d) || F(A, t, d, null, c, q)
            }
          }
          for (var R in c) {
            var d = c[R];
            if (q = a[R], c.hasOwnProperty(R) && (d != null || q != null)) switch (R) {
              case "type":
                d !== q && (B = !0), e = d;
                break;
              case "name":
                d !== q && (B = !0), u = d;
                break;
              case "checked":
                d !== q && (B = !0), I = d;
                break;
              case "defaultChecked":
                d !== q && (B = !0), p = d;
                break;
              case "value":
                d !== q && (B = !0), l = d;
                break;
              case "defaultValue":
                d !== q && (B = !0), n = d;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (d != null) throw Error(U(137, t));
                break;
              default:
                d !== q && F(A, t, R, d, c, q)
            }
          }
          Wn(A, l, n, r, I, p, e, u);
          return;
        case "select":
          d = l = n = R = null;
          for (e in a)
            if (r = a[e], a.hasOwnProperty(e) && r != null) switch (e) {
              case "value":
                break;
              case "multiple":
                d = r;
              default:
                c.hasOwnProperty(e) || F(A, t, e, null, c, r)
            }
          for (u in c)
            if (e = c[u], r = a[u], c.hasOwnProperty(u) && (e != null || r != null)) switch (
              u) {
              case "value":
                e !== r && (B = !0), R = e;
                break;
              case "defaultValue":
                e !== r && (B = !0), n = e;
                break;
              case "multiple":
                e !== r && (B = !0), l = e;
              default:
                e !== r && F(A, t, u, e, c, r)
            }
          t = n, a = l, c = d, R != null ? Qc(A, !!a, R, !1) : !!c != !!a && (t != null ? Qc(
            A, !!a, t, !0) : Qc(A, !!a, a ? [] : "", !1));
          return;
        case "textarea":
          d = R = null;
          for (n in a)
            if (u = a[n], a.hasOwnProperty(n) && u != null && !c.hasOwnProperty(n)) switch (
              n) {
              case "value":
                break;
              case "children":
                break;
              default:
                F(A, t, n, null, c, u)
            }
          for (l in c)
            if (u = c[l], e = a[l], c.hasOwnProperty(l) && (u != null || e != null)) switch (
              l) {
              case "value":
                u !== e && (B = !0), R = u;
                break;
              case "defaultValue":
                u !== e && (B = !0), d = u;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (u != null) throw Error(U(91));
                break;
              default:
                u !== e && F(A, t, l, u, c, e)
            }
          kr(A, R, d);
          return;
        case "option":
          for (var S in a) R = a[S], a.hasOwnProperty(S) && R != null && !c.hasOwnProperty(
            S) && (S === "selected" ? A.selected = !1 : F(A, t, S, null, c, R));
          for (r in c) R = c[r], d = a[r], c.hasOwnProperty(r) && R !== d && (R != null ||
            d != null) && (r === "selected" ? (R !== d && (B = !0), A.selected = R &&
            typeof R != "function" && typeof R != "symbol") : F(A, t, r, R, c, d));
          return;
        case "img":
        case "link":
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "keygen":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
        case "menuitem":
          for (var N in a) R = a[N], a.hasOwnProperty(N) && R != null && !c.hasOwnProperty(
            N) && F(A, t, N, null, c, R);
          for (I in c)
            if (R = c[I], d = a[I], c.hasOwnProperty(I) && R !== d && (R != null || d !=
              null)) switch (I) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (R != null) throw Error(U(137, t));
                break;
              default:
                F(A, t, I, R, c, d)
            }
          return;
        default:
          if (zI(t)) {
            for (var x in a) R = a[x], a.hasOwnProperty(x) && R !== void 0 && !c
              .hasOwnProperty(x) && VI(A, t, x, void 0, c, R);
            for (p in c) R = c[p], d = a[p], !c.hasOwnProperty(p) || R === d || R ===
              void 0 && d === void 0 || VI(A, t, p, R, c, d);
            return
          }
      }
      for (var O in a) R = a[O], a.hasOwnProperty(O) && R != null && !c.hasOwnProperty(O) &&
        F(A, t, O, null, c, R);
      for (q in c) R = c[q], d = a[q], !c.hasOwnProperty(q) || R === d || R == null && d ==
        null || F(A, t, q, R, c, d)
    }

    function XR(A) {
      switch (A) {
        case "css":
        case "script":
        case "font":
        case "img":
        case "image":
        case "input":
        case "link":
          return !0;
        default:
          return !1
      }
    }

    function AH() {
      if (typeof performance.getEntriesByType == "function") {
        for (var A = 0, t = 0, a = performance.getEntriesByType("resource"), c = 0; c < a
          .length; c++) {
          var u = a[c],
            e = u.transferSize,
            l = u.initiatorType,
            n = u.duration;
          if (e && n && XR(l)) {
            for (l = 0, n = u.responseEnd, c += 1; c < a.length; c++) {
              var r = a[c],
                I = r.startTime;
              if (I > n) break;
              var p = r.transferSize,
                q = r.initiatorType;
              p && XR(q) && (r = r.responseEnd, l += p * (r < n ? 1 : (n - I) / (r - I)))
            }
            if (--c, t += 8 * (e + l) / (u.duration / 1e3), A++, 10 < A) break
          }
        }
        if (0 < A) return t / A / 1e6
      }
      return navigator.connection && (A = navigator.connection.downlink, typeof A ==
        "number") ? A : 5
    }
    var HI = null,
      EI = null;

    function ie(A) {
      return A.nodeType === 9 ? A : A.ownerDocument
    }

    function LR(A) {
      switch (A) {
        case "http://www.w3.org/2000/svg":
          return 1;
        case "http://www.w3.org/1998/Math/MathML":
          return 2;
        default:
          return 0
      }
    }

    function K1(A, t) {
      if (A === 0) switch (t) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0
      }
      return A === 1 && t === "foreignObject" ? 0 : A
    }

    function G1(A, t, a, c) {
      return a = ie(a).createElement(A), a[kA] = c, a[$A] = t, fA(a, A, t), sA(a), a
    }

    function SI(A, t) {
      return A === "textarea" || A === "noscript" || typeof t.children == "string" || typeof t
        .children == "number" || typeof t.children == "bigint" || typeof t
        .dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t
        .dangerouslySetInnerHTML.__html != null
    }
    var jn = null;

    function tH() {
      var A = window.event;
      return A && A.type === "popstate" ? A === jn ? !1 : (jn = A, !0) : (jn = null, !1)
    }
    var Eq = typeof setTimeout == "function" ? setTimeout : void 0,
      aH = typeof clearTimeout == "function" ? clearTimeout : void 0,
      ZR = typeof Promise == "function" ? Promise : void 0,
      DR = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Eq,
      cH = typeof queueMicrotask == "function" ? queueMicrotask : typeof ZR < "u" ? function(
        A) {
        return ZR.resolve(null).then(A).catch(uH)
      } : Eq;

    function uH(A) {
      setTimeout(function() {
        throw A
      })
    }

    function Ba(A) {
      return A === "head"
    }

    function wR(A, t) {
      var a = t,
        c = 0;
      do {
        var u = a.nextSibling;
        if (A.removeChild(a), u && u.nodeType === 8)
          if (a = u.data, a === "/$" || a === "/&") {
            if (c === 0) {
              A.removeChild(u), pu(t);
              return
            }
            c--
          } else if (a === "$" || a === "$?" || a === "$~" || a === "$!" || a === "&") c++;
        else if (a === "html") On(A.ownerDocument.documentElement);
        else if (a === "head") {
          a = A.ownerDocument.head, On(a);
          for (var e = a.firstChild; e;) {
            var l = e.nextSibling,
              n = e.nodeName;
            e[be] || n === "SCRIPT" || n === "STYLE" || n === "LINK" && e.rel
            .toLowerCase() === "stylesheet" || a.removeChild(e), e = l
          }
        } else a === "body" && On(A.ownerDocument.body);
        a = u
      } while (a);
      pu(t)
    }

    function gR(A, t) {
      var a = A;
      A = 0;
      do {
        var c = a.nextSibling;
        if (a.nodeType === 1 ? t ? (a._stashedDisplay = a.style.display, a.style.display =
            "none") : (a.style.display = a._stashedDisplay || "", a.getAttribute("style") ===
            "" && a.removeAttribute("style")) : a.nodeType === 3 && (t ? (a._stashedText = a
            .nodeValue, a.nodeValue = "") : a.nodeValue = a._stashedText || ""), c && c
          .nodeType === 8)
          if (a = c.data, a === "/$") {
            if (A === 0) break;
            A--
          } else a !== "$" && a !== "$?" && a !== "$~" && a !== "$!" || A++;
        a = c
      } while (a)
    }

    function X1(A, t, a) {
      if (t = CSS.escape(t) !== t ? "r-" + btoa(t).replace(/=/g, "") : t, A.style
        .viewTransitionName = t, a != null && (A.style.viewTransitionClass = a), a =
        getComputedStyle(A), a.display === "inline") {
        if (t = A.getClientRects(), t.length === 1) var c = 1;
        else
          for (var u = c = 0; u < t.length; u++) {
            var e = t[u];
            0 < e.width && 0 < e.height && c++
          }
        c === 1 && (A = A.style, A.display = t.length === 1 ? "inline-block" : "block", A
          .marginTop = "-" + a.paddingTop, A.marginBottom = "-" + a.paddingBottom)
      }
    }

    function L1(A, t) {
      A = A.style, t = t.style;
      var a = t != null ? t.hasOwnProperty("viewTransitionName") ? t.viewTransitionName : t
        .hasOwnProperty("view-transition-name") ? t["view-transition-name"] : null : null;
      A.viewTransitionName = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), a =
        t != null ? t.hasOwnProperty("viewTransitionClass") ? t.viewTransitionClass : t
        .hasOwnProperty("view-transition-class") ? t["view-transition-class"] : null : null, A
        .viewTransitionClass = a == null || typeof a == "boolean" ? "" : ("" + a).trim(), A
        .display === "inline-block" && (t == null ? A.display = A.margin = "" : (a = t
          .display, A.display = a == null || typeof a == "boolean" ? "" : a, a = t.margin,
          a != null ? A.margin = a : (a = t.hasOwnProperty("marginTop") ? t.marginTop : t[
              "margin-top"], A.marginTop = a == null || typeof a == "boolean" ? "" : a, t =
            t.hasOwnProperty("marginBottom") ? t.marginBottom : t["margin-bottom"], A
            .marginBottom = t == null || typeof t == "boolean" ? "" : t)))
    }

    function Z1(A, t, a) {
      return a = a.ownerDocument.defaultView, {
        rect: A,
        abs: t.position === "absolute" || t.position === "fixed",
        clip: t.clipPath !== "none" || t.overflow !== "visible" || t.filter !== "none" || t
          .mask !== "none" || t.mask !== "none" || t.borderRadius !== "0px",
        view: 0 <= A.bottom && 0 <= A.right && A.top <= a.innerHeight && A.left <= a
          .innerWidth
      }
    }

    function NI(A) {
      var t = A.getBoundingClientRect(),
        a = getComputedStyle(A);
      return Z1(t, a, A)
    }

    function eH(A) {
      var t = A.getBoundingClientRect();
      t = new DOMRect(t.x + 2e4, t.y + 2e4, t.width, t.height);
      var a = getComputedStyle(A);
      return Z1(t, a, A)
    }

    function lH(A) {
      return A.documentElement.clientHeight
    }

    function iH(A) {
      this.addEventListener("load", A), this.addEventListener("error", A)
    }

    function nH(A, t, a, c, u, e, l, n, r) {
      var I = t.nodeType === 9 ? t : t.ownerDocument;
      try {
        var p = I.startViewTransition({
          update: function() {
            var R = I.defaultView,
              d = R.navigation && R.navigation.transition,
              S = I.fonts.status;
            c();
            var N = [];
            if (S === "loaded" && (lH(I), I.fonts.status === "loading" && N.push(I.fonts
                .ready)), S = N.length, A !== null)
              for (var x = A.suspenseyImages, O = 0, j = 0; j < x.length; j++) {
                var H = x[j];
                if (!H.complete) {
                  var E = H.getBoundingClientRect();
                  if (0 < E.bottom && 0 < E.right && E.top < R.innerHeight && E.left < R
                    .innerWidth) {
                    if (O += Y1(H), O > Sl) {
                      N.length = S;
                      break
                    }
                    H = new Promise(iH.bind(H)), N.push(H)
                  }
                }
              }
            if (0 < N.length) return R = Promise.race([Promise.all(N), new Promise(
              function(s) {
                return setTimeout(s, 500)
              })]).then(u, u), (d ? Promise.allSettled([d.finished, R]) : R).then(e,
              e);
            if (u(), d) return d.finished.then(e, e);
            e()
          },
          types: a
        });
        I.__reactViewTransition = p;
        var q = [];
        return p.ready.then(function() {
          for (var R = I.documentElement.getAnimations({
              subtree: !0
            }), d = 0; d < R.length; d++) {
            var S = R[d],
              N = S.effect,
              x = N.pseudoElement;
            if (x != null && x.startsWith("::view-transition")) {
              q.push(S), S = N.getKeyframes();
              for (var O = x = void 0, j = !0, H = 0; H < S.length; H++) {
                var E = S[H],
                  s = E.width;
                if (x === void 0) x = s;
                else if (x !== s) {
                  j = !1;
                  break
                }
                if (s = E.height, O === void 0) O = s;
                else if (O !== s) {
                  j = !1;
                  break
                }
                delete E.width, delete E.height, E.transform === "none" && delete E
                  .transform
              }
              j && x !== void 0 && O !== void 0 && (N.setKeyframes(S), j =
                getComputedStyle(N.target, N.pseudoElement), j.width !== x || j
                .height !== O) && (j = S[0], j.width = x, j.height = O, j = S[S.length -
                1], j.width = x, j.height = O, N.setKeyframes(S))
            }
          }
          l()
        }, function(R) {
          I.__reactViewTransition === p && (I.__reactViewTransition = null);
          try {
            typeof R == "object" && R !== null && R.name === "InvalidStateError" && (R
              .message ===
              "View transition was skipped because document visibility state is hidden." ||
              R.message ===
              "Skipping view transition because document visibility state has become hidden." ||
              R.message === "Skipping view transition because viewport size changed." ||
              R.message === "Transition was aborted because of invalid state") && (R =
              null), R !== null && r(R)
          } finally {
            c(), u(), l()
          }
        }), p.finished.finally(function() {
          for (var R = 0; R < q.length; R++) q[R].cancel();
          I.__reactViewTransition === p && (I.__reactViewTransition = null), n()
        }), p
      } catch {
        return c(), u(), l(), null
      }
    }

    function tc(A, t) {
      this._scope = document.documentElement, this._selector = "::view-transition-" + A +
        "(" + t + ")"
    }
    tc.prototype.animate = function(A, t) {
      return t = typeof t == "number" ? {
        duration: t
      } : AA({}, t), t.pseudoElement = this._selector, this._scope.animate(A, t)
    };
    tc.prototype.getAnimations = function() {
      for (var A = this._scope, t = this._selector, a = A.getAnimations({
          subtree: !0
        }), c = [], u = 0; u < a.length; u++) {
        var e = a[u].effect;
        e !== null && e.target === A && e.pseudoElement === t && c.push(a[u])
      }
      return c
    };
    tc.prototype.getComputedStyle = function() {
      return getComputedStyle(this._scope, this._selector)
    };

    function D1(A) {
      return {
        name: A,
        group: new tc("group", A),
        imagePair: new tc("image-pair", A),
        old: new tc("old", A),
        new: new tc("new", A)
      }
    }

    function pt(A) {
      this._fragmentFiber = A, this._observers = this._eventListeners = null
    }
    pt.prototype.addEventListener = function(A, t, a) {
      var c = null,
        u = null;
      if (!(a != null && typeof a != "boolean" && (c = a.signal || null, c !== null && c
          .aborted))) {
        this._eventListeners === null && (this._eventListeners = []);
        var e = this._eventListeners;
        if (w1(e, A, t, a) === -1) {
          var l = this,
            n = t;
          a != null && typeof a != "boolean" && a.once === !0 && (n = function(r) {
            l.removeEventListener(A, t, a), typeof t == "function" ? t.call(this, r) : t
              .handleEvent(r)
          }), c !== null && (u = l.removeEventListener.bind(l, A, t, a), c
            .addEventListener("abort", u, {
              once: !0
            }), u = c.removeEventListener.bind(c, "abort", u)), c = iu(a), e.push({
            type: A,
            listener: t,
            optionsOrUseCapture: a,
            attachedListener: n,
            cleanup: u
          }), _A(this._fragmentFiber.child, !1, IH, A, n, c)
        }
        this._eventListeners = e
      }
    };

    function IH(A, t, a, c) {
      return EA(A).addEventListener(t, a, c), !1
    }
    pt.prototype.removeEventListener = function(A, t, a) {
      var c = this._eventListeners;
      if (c !== null && (t = w1(c, A, t, a), t !== -1)) {
        var u = c[t];
        a = u.attachedListener;
        var e = u.cleanup;
        u = iu(u.optionsOrUseCapture), _A(this._fragmentFiber.child, !1, qH, A, a, u), c
          .splice(t, 1), e !== null && e()
      }
    };

    function qH(A, t, a, c) {
      return EA(A).removeEventListener(t, a, c), !1
    }

    function iu(A) {
      return A != null && typeof A != "boolean" && (A.once === !0 || A
        .signal instanceof AbortSignal) ? {
        capture: A.capture,
        passive: A.passive
      } : A
    }

    function JR(A) {
      return A == null ? "c=0" : typeof A == "boolean" ? "c=" + (A ? "1" : "0") : "c=" + (A
        .capture ? "1" : "0")
    }

    function w1(A, t, a, c) {
      if (A.length === 0) return -1;
      c = JR(c);
      for (var u = 0; u < A.length; u++) {
        var e = A[u];
        if (e.type === t && e.listener === a && JR(e.optionsOrUseCapture) === c) return u
      }
      return -1
    }
    pt.prototype.dispatchEvent = function(A) {
      var t = jc(this._fragmentFiber);
      if (t === null) return !0;
      t = EA(t);
      var a = this._eventListeners;
      if (a !== null && 0 < a.length || !A.bubbles) {
        var c = t.nodeType === 9 ? t.createComment("") : document.createTextNode("");
        if (a)
          for (var u = 0; u < a.length; u++) {
            var e = a[u];
            c.addEventListener(e.type, e.attachedListener, iu(e.optionsOrUseCapture))
          }
        if (t.appendChild(c), A = c.dispatchEvent(A), a)
          for (u = 0; u < a.length; u++) e = a[u], c.removeEventListener(e.type, e
            .attachedListener, iu(e.optionsOrUseCapture));
        return t.removeChild(c), A
      }
      return t.dispatchEvent(A)
    };
    pt.prototype.focus = function(A) {
      _A(this._fragmentFiber.child, !0, g1, A, void 0, void 0)
    };

    function g1(A, t) {
      return A.tag === 6 ? !1 : (A = EA(A), NH(A, t))
    }
    pt.prototype.focusLast = function(A) {
      var t = [];
      _A(this._fragmentFiber.child, !0, Sq, t, void 0, void 0);
      for (var a = t.length - 1; 0 <= a && !g1(t[a], A); a--);
    };

    function Sq(A, t) {
      return t.push(A), !1
    }
    pt.prototype.blur = function() {
      var A = jc(this._fragmentFiber);
      A !== null && (A = EA(A), A = ie(A).activeElement, A !== null && _A(this
        ._fragmentFiber.child, !1, pH, A, void 0, void 0))
    };

    function pH(A, t) {
      return A.tag === 6 ? !1 : (A = EA(A), A === t || A.contains(t) ? (t.blur(), !0) : !1)
    }
    pt.prototype.observeUsing = function(A) {
      this._observers === null && (this._observers = new Set), this._observers.add(A), _A(
        this._fragmentFiber.child, !1, RH, A, void 0, void 0)
    };

    function RH(A, t) {
      return A.tag === 6 || (A = EA(A), t.observe(A)), !1
    }
    pt.prototype.unobserveUsing = function(A) {
      var t = this._observers;
      if (t !== null && t.has(A)) {
        t.delete(A), _A(this._fragmentFiber.child, !1, rH, A, void 0, void 0);
        for (var a = t = 0; a < yt.length; a++) {
          var c = yt[a];
          c.fragmentInstance === this && c.observer === A ? A.unobserve(c.instance) : yt[
            t++] = c
        }
        yt.length = t
      }
    };

    function rH(A, t) {
      return A.tag === 6 || (A = EA(A), t.unobserve(A)), !1
    }
    var yt = [],
      bn = !1;

    function dH(A, t, a) {
      yt.push({
        fragmentInstance: A,
        observer: t,
        instance: a
      }), bn || (bn = !0, xH(function() {
        bn = !1;
        var c = yt;
        yt = [];
        for (var u = 0; u < c.length; u++) {
          var e = c[u];
          e.observer.unobserve(e.instance)
        }
      }))
    }
    pt.prototype.getClientRects = function() {
      var A = [];
      return _A(this._fragmentFiber.child, !1, jH, A, void 0, void 0), A
    };

    function jH(A, t) {
      if (A.tag === 6) {
        A = A.stateNode;
        var a = A.ownerDocument.createRange();
        a.selectNodeContents(A), t.push.apply(t, a.getClientRects())
      } else A = EA(A), t.push.apply(t, A.getClientRects());
      return !1
    }
    pt.prototype.getRootNode = function(A) {
      var t = jc(this._fragmentFiber);
      return t === null ? this : EA(t).getRootNode(A)
    };
    pt.prototype.compareDocumentPosition = function(A) {
      var t = jc(this._fragmentFiber);
      if (t === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      var a = [];
      _A(this._fragmentFiber.child, !1, Sq, a, void 0, void 0);
      var c = EA(t);
      if (a.length === 0) {
        if (a = c, Np(this._fragmentFiber)) {
          A: {
            for (t = this._fragmentFiber.return; t !== null;) {
              if (t.tag === 4) {
                t = t.stateNode.containerInfo;
                break A
              }
              if (t.tag === 3 || t.tag === 5 || t.tag === 27) break;
              t = t.return
            }
            t = null
          }
          t != null && (a = t)
        }
        t = this._fragmentFiber;
        var u = c = a.compareDocumentPosition(A);
        return a === A ? u = Node.DOCUMENT_POSITION_CONTAINS : c & Node
          .DOCUMENT_POSITION_CONTAINED_BY && (a = qr(t)[1], a === null ? u = Node
            .DOCUMENT_POSITION_PRECEDING : (A = EA(a).compareDocumentPosition(A), u = A ===
              0 || A & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING :
              Node.DOCUMENT_POSITION_PRECEDING)), u |= Node
          .DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
      }
      t = EA(a[0]), u = EA(a[a.length - 1]);
      var e = Np(this._fragmentFiber) ? t.parentElement : c;
      if (e == null) return Node.DOCUMENT_POSITION_DISCONNECTED;
      c = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_CONTAINED_BY, e = e
        .compareDocumentPosition(u) & Node.DOCUMENT_POSITION_CONTAINED_BY;
      var l = t.compareDocumentPosition(A),
        n = u.compareDocumentPosition(A),
        r = l & Node.DOCUMENT_POSITION_CONTAINED_BY || n & Node
        .DOCUMENT_POSITION_CONTAINED_BY;
      return n = c && e && l & Node.DOCUMENT_POSITION_FOLLOWING && n & Node
        .DOCUMENT_POSITION_PRECEDING, t = c && t === A || e && u === A || r || n ? Node
        .DOCUMENT_POSITION_CONTAINED_BY : !c && t === A || !e && u === A ? Node
        .DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : l, t & Node
        .DOCUMENT_POSITION_DISCONNECTED || t & Node
        .DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || bH(t, this._fragmentFiber, a[0], a[a
          .length - 1], A) ? t : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC
    };

    function bH(A, t, a, c, u) {
      var e = Ac(u);
      if (A & Node.DOCUMENT_POSITION_CONTAINED_BY) {
        if (a = !!e) A: {
          for (; e !== null;) {
            if (e.tag === 7 && (e === t || e.alternate === t)) {
              a = !0;
              break A
            }
            e = e.return
          }
          a = !1
        }
        return a
      }
      if (A & Node.DOCUMENT_POSITION_CONTAINS) {
        if (e === null) return e = u.ownerDocument, u === e || u === e.documentElement ||
          u === e.body;
        A: {
          for (e = t, t = jc(t); e !== null;) {
            if (!(e.tag !== 5 && e.tag !== 3 && e.tag !== 27 || e !== t && e.alternate !==
                t)) {
              e = !0;
              break A
            }
            e = e.return
          }
          e = !1
        }
        return e
      }
      return A & Node.DOCUMENT_POSITION_PRECEDING ? ((t = !!e) && !(t = e === a) && (t = Hn(a,
        e, xp), t === null ? t = !1 : (_A(t, !0, hO, e, a), e = Tc, Tc = null, t = e !==
        null)), t) : A & Node.DOCUMENT_POSITION_FOLLOWING ? ((t = !!e) && !(t = e === c) &&
        (t = Hn(c, e, xp), t === null ? t = !1 : (_A(t, !0, vO, e, c), e = Tc, Vn = Tc =
          null, t = e !== null)), t) : !1
    }

    function QR(A, t) {
      var a = A.ownerDocument.createRange();
      a.selectNodeContents(A), A = a.getBoundingClientRect(), window.scrollTo(window.scrollX +
        A.left, t ? window.scrollY + A.top : window.scrollY + A.bottom - window.innerHeight)
    }
    pt.prototype.scrollIntoView = function(A) {
      if (typeof A == "object") throw Error(U(566));
      var t = [];
      _A(this._fragmentFiber.child, !1, Sq, t, void 0, void 0);
      var a = A !== !1;
      if (t.length === 0) {
        var c = qr(this._fragmentFiber);
        if (c = a ? c[1] || c[0] || jc(this._fragmentFiber) : c[0] || c[1], c === null)
          return;
        if (c.tag === 6) {
          A = EA(c), QR(A, a);
          return
        }
        if (c = EA(c), c.nodeType !== 9) {
          if (c.nodeType === 11) {
            a = "host" in c ? c.host : null, a !== null && a.scrollIntoView(A);
            return
          }
          c.scrollIntoView(A)
        }
      }
      for (c = a ? t.length - 1 : 0; c !== (a ? -1 : t.length);) {
        var u = t[c];
        u.tag === 6 ? (u = EA(u), QR(u, a)) : EA(u).scrollIntoView(A), c += a ? -1 : 1
      }
    };

    function OH(A, t) {
      return A = EA(A), J1(A, t), !1
    }

    function J1(A, t) {
      A.reactFragments == null && (A.reactFragments = new Set), A.reactFragments.add(t)
    }

    function Q1(A, t) {
      var a = t._eventListeners;
      if (a !== null)
        for (var c = 0; c < a.length; c++) {
          var u = a[c];
          A.addEventListener(u.type, u.attachedListener, iu(u.optionsOrUseCapture))
        }
      A.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(e) {
        for (var l = 0, n = 0; n < yt.length; n++) {
          var r = yt[n];
          (r.fragmentInstance !== t || r.observer !== e || r.instance !== A) && (yt[
            l++] = r)
        }
        yt.length = l, e.observe(A)
      }), J1(A, t))
    }

    function VH(A, t) {
      var a = t._eventListeners;
      if (a !== null)
        for (var c = 0; c < a.length; c++) {
          var u = a[c];
          A.removeEventListener(u.type, u.attachedListener, iu(u.optionsOrUseCapture))
        }
      A.nodeType !== 3 && (a = t._observers, a !== null && a.forEach(function(e) {
        typeof e.rootMargin == "string" ? dH(t, e, A) : e.unobserve(A)
      }), A.reactFragments != null && A.reactFragments.delete(t))
    }

    function xI(A) {
      var t = A.firstChild;
      for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
        var a = t;
        switch (t = t.nextSibling, a.nodeName) {
          case "HTML":
          case "HEAD":
          case "BODY":
            xI(a), Ai(a);
            continue;
          case "SCRIPT":
          case "STYLE":
            continue;
          case "LINK":
            if (a.rel.toLowerCase() === "stylesheet") continue
        }
        A.removeChild(a)
      }
    }

    function HH(A, t, a, c) {
      for (; A.nodeType === 1;) {
        var u = a;
        if (A.nodeName.toLowerCase() !== t.toLowerCase()) {
          if (!c && (A.nodeName !== "INPUT" || A.type !== "hidden")) break
        } else if (c) {
          if (!A[be]) switch (t) {
            case "meta":
              if (!A.hasAttribute("itemprop")) break;
              return A;
            case "link":
              if (e = A.getAttribute("rel"), e === "stylesheet" && A.hasAttribute(
                  "data-precedence")) break;
              if (e !== u.rel || A.getAttribute("href") !== (u.href == null || u.href ===
                  "" ? null : u.href) || A.getAttribute("crossorigin") !== (u.crossOrigin ==
                  null ? null : u.crossOrigin) || A.getAttribute("title") !== (u.title ==
                  null ? null : u.title)) break;
              return A;
            case "style":
              if (A.hasAttribute("data-precedence")) break;
              return A;
            case "script":
              if (e = A.getAttribute("src"), (e !== (u.src == null ? null : u.src) || A
                  .getAttribute("type") !== (u.type == null ? null : u.type) || A
                  .getAttribute("crossorigin") !== (u.crossOrigin == null ? null : u
                    .crossOrigin)) && e && A.hasAttribute("async") && !A.hasAttribute(
                  "itemprop")) break;
              return A;
            default:
              return A
          }
        } else if (t === "input" && A.type === "hidden") {
          var e = u.name == null ? null : "" + u.name;
          if (u.type === "hidden" && A.getAttribute("name") === e) return A
        } else return A;
        if (A = Et(A.nextSibling), A === null) break
      }
      return null
    }

    function EH(A, t, a) {
      if (t === "") return null;
      for (; A.nodeType !== 3;)
        if ((A.nodeType !== 1 || A.nodeName !== "INPUT" || A.type !== "hidden") && !a || (A =
            Et(A.nextSibling), A === null)) return null;
      return A
    }

    function B1(A, t) {
      for (; A.nodeType !== 8;)
        if ((A.nodeType !== 1 || A.nodeName !== "INPUT" || A.type !== "hidden") && !t || (A =
            Et(A.nextSibling), A === null)) return null;
      return A
    }

    function oI(A) {
      return A.data === "$?" || A.data === "$~"
    }

    function Nq(A) {
      return A.data === "$!" || A.data === "$?" && A.ownerDocument.readyState !== "loading"
    }

    function SH(A, t) {
      var a = A.ownerDocument;
      if (A.data === "$~") A._reactRetry = t;
      else if (A.data !== "$?" || a.readyState !== "loading") t();
      else {
        var c = function() {
          t(), a.removeEventListener("DOMContentLoaded", c)
        };
        a.addEventListener("DOMContentLoaded", c), A._reactRetry = c
      }
    }

    function Et(A) {
      for (; A != null; A = A.nextSibling) {
        var t = A.nodeType;
        if (t === 1 || t === 3) break;
        if (t === 8) {
          if (t = A.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" ||
            t === "F!" || t === "F") break;
          if (t === "/$" || t === "/&") return null
        }
      }
      return A
    }
    var sI = null;

    function BR(A) {
      A = A.nextSibling;
      for (var t = 0; A;) {
        if (A.nodeType === 8) {
          var a = A.data;
          if (a === "/$" || a === "/&") {
            if (t === 0) return Et(A.nextSibling);
            t--
          } else a !== "$" && a !== "$!" && a !== "$?" && a !== "$~" && a !== "&" || t++
        }
        A = A.nextSibling
      }
      return null
    }

    function hR(A) {
      A = A.previousSibling;
      for (var t = 0; A;) {
        if (A.nodeType === 8) {
          var a = A.data;
          if (a === "$" || a === "$!" || a === "$?" || a === "$~" || a === "&") {
            if (t === 0) return A;
            t--
          } else a !== "/$" && a !== "/&" || t++
        }
        A = A.previousSibling
      }
      return null
    }

    function NH(A, t) {
      function a() {
        c = !0
      }
      if (A.ownerDocument.activeElement === A) return !0;
      var c = !1;
      try {
        A.ownerDocument.addEventListener("focus", a, !0), (A.focus || HTMLElement.prototype
          .focus).call(A, t)
      } finally {
        A.ownerDocument.removeEventListener("focus", a, !0)
      }
      return c
    }

    function xH(A) {
      DR(function() {
        DR(function(t) {
          return A(t)
        })
      })
    }

    function h1(A, t, a) {
      switch (t = ie(a), A) {
        case "html":
          if (A = t.documentElement, !A) throw Error(U(452));
          return A;
        case "head":
          if (A = t.head, !A) throw Error(U(453));
          return A;
        case "body":
          if (A = t.body, !A) throw Error(U(454));
          return A;
        default:
          throw Error(U(451))
      }
    }

    function v1(A, t, a) {
      for (var c in a) {
        var u = a[c];
        a.hasOwnProperty(c) && u != null && F(A, t, c, null, _2, u)
      }
      a.dangerouslySetInnerHTML != null && (A.textContent = ""), A.onclick === Lt && (A
        .onclick = null), Ai(A)
    }

    function On(A) {
      for (var t = A.attributes; t.length;) A.removeAttributeNode(t[0]);
      Ai(A)
    }
    var St = new Map,
      vR = new Set;

    function ne(A) {
      if (typeof A.getRootNode == "function") {
        var t = A.getRootNode();
        if (t.nodeType === 9 || t.nodeType === 11) return t
      }
      return A.nodeType === 9 ? A : A.ownerDocument
    }
    var Ia = v.d;
    v.d = {
      f: oH,
      r: sH,
      D: UH,
      C: yH,
      L: PH,
      m: kH,
      X: TH,
      S: WH,
      M: mH
    };

    function oH() {
      var A = Ia.f(),
        t = di();
      return A || t
    }

    function sH(A) {
      var t = ru(A);
      t !== null && t.tag === 5 && t.type === "form" ? Td(t) : Ia.r(A)
    }
    var Ou = typeof document > "u" ? null : document;

    function C1(A, t, a) {
      var c = Ou;
      if (c && typeof t == "string" && t) {
        var u = Ot(t);
        u = 'link[rel="' + A + '"][href="' + u + '"]', typeof a == "string" && (u +=
          '[crossorigin="' + a + '"]'), vR.has(u) || (vR.add(u), A = {
          rel: A,
          crossOrigin: a,
          href: t
        }, c.querySelector(u) === null && (t = c.createElement("link"), fA(t, "link", A),
          sA(t), c.head.appendChild(t)))
      }
    }

    function UH(A) {
      Ia.D(A), C1("dns-prefetch", A, null)
    }

    function yH(A, t) {
      Ia.C(A, t), C1("preconnect", A, t)
    }

    function PH(A, t, a) {
      Ia.L(A, t, a);
      var c = Ou;
      if (c && A && t) {
        var u = 'link[rel="preload"][as="' + Ot(t) + '"]';
        t === "image" && a && a.imageSrcSet ? (u += '[imagesrcset="' + Ot(a.imageSrcSet) +
          '"]', typeof a.imageSizes == "string" && (u += '[imagesizes="' + Ot(a
            .imageSizes) + '"]')) : u += '[href="' + Ot(A) + '"]';
        var e = u;
        switch (t) {
          case "style":
            e = nu(A);
            break;
          case "script":
            e = Vu(A)
        }
        if (!(St.has(e) || (A = AA({
              rel: "preload",
              href: t === "image" && a && a.imageSrcSet ? void 0 : A,
              as: t
            }, a), St.set(e, A), c.querySelector(u) !== null || t === "style" && c
            .querySelector(Ne(e)) || t === "script" && c.querySelector(xe(e))))) {
          var l = c.createElement("link");
          fA(l, "link", A), t === "style" && (l[Pl] = !0, l.onload = l.onerror = function() {
            xr(l)
          }), sA(l), c.head.appendChild(l)
        }
      }
    }

    function kH(A, t) {
      Ia.m(A, t);
      var a = Ou;
      if (a && A) {
        var c = t && typeof t.as == "string" ? t.as : "script",
          u = 'link[rel="modulepreload"][as="' + Ot(c) + '"][href="' + Ot(A) + '"]',
          e = u;
        switch (c) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            e = Vu(A)
        }
        if (!St.has(e) && (A = AA({
            rel: "modulepreload",
            href: A
          }, t), St.set(e, A), a.querySelector(u) === null)) {
          switch (c) {
            case "audioworklet":
            case "paintworklet":
            case "serviceworker":
            case "sharedworker":
            case "worker":
            case "script":
              if (a.querySelector(xe(e))) return
          }
          c = a.createElement("link"), fA(c, "link", A), sA(c), a.head.appendChild(c)
        }
      }
    }

    function WH(A, t, a) {
      Ia.S(A, t, a);
      var c = Ou;
      if (c && A) {
        var u = Jc(c).hoistableStyles,
          e = nu(A);
        t = t || "default";
        var l = u.get(e);
        if (!l) {
          var n = {
            loading: 0,
            preload: null
          };
          if (l = c.querySelector(Ne(e))) n.loading = 5;
          else {
            A = AA({
              rel: "stylesheet",
              href: A,
              "data-precedence": t
            }, a), (a = St.get(e)) && xq(A, a);
            var r = l = c.createElement("link");
            sA(r), fA(r, "link", A), r._p = new Promise(function(I, p) {
              r.onload = I, r.onerror = p
            }), r.addEventListener("load", function() {
              n.loading |= 1
            }), r.addEventListener("error", function() {
              n.loading |= 2
            }), n.loading |= 4, Hl(l, t, c)
          }
          l = {
            type: "stylesheet",
            instance: l,
            count: 1,
            state: n
          }, u.set(e, l)
        }
      }
    }

    function TH(A, t) {
      Ia.X(A, t);
      var a = Ou;
      if (a && A) {
        var c = Jc(a).hoistableScripts,
          u = Vu(A),
          e = c.get(u);
        e || (e = a.querySelector(xe(u)), e || (A = AA({
          src: A,
          async: !0
        }, t), (t = St.get(u)) && oq(A, t), e = a.createElement("script"), sA(e), fA(e,
          "link", A), a.head.appendChild(e)), e = {
          type: "script",
          instance: e,
          count: 1,
          state: null
        }, c.set(u, e))
      }
    }

    function mH(A, t) {
      Ia.M(A, t);
      var a = Ou;
      if (a && A) {
        var c = Jc(a).hoistableScripts,
          u = Vu(A),
          e = c.get(u);
        e || (e = a.querySelector(xe(u)), e || (A = AA({
          src: A,
          async: !0,
          type: "module"
        }, t), (t = St.get(u)) && oq(A, t), e = a.createElement("script"), sA(e), fA(e,
          "link", A), a.head.appendChild(e)), e = {
          type: "script",
          instance: e,
          count: 1,
          state: null
        }, c.set(u, e))
      }
    }

    function CR(A, t, a, c) {
      var u = (u = ka.current) ? ne(u) : null;
      if (!u) throw Error(U(446));
      switch (A) {
        case "meta":
        case "title":
          return null;
        case "style":
          return typeof a.precedence == "string" && typeof a.href == "string" ? (a = nu(a
            .href), t = Jc(u).hoistableStyles, c = t.get(a), c || (c = {
            type: "style",
            instance: null,
            count: 0,
            state: null
          }, t.set(a, c)), c) : {
            type: "void",
            instance: null,
            count: 0,
            state: null
          };
        case "link":
          if (a.rel === "stylesheet" && typeof a.href == "string" && typeof a.precedence ==
            "string") {
            A = nu(a.href);
            var e = Jc(u).hoistableStyles,
              l = e.get(A);
            if (l || (u = u.ownerDocument || u, l = {
                type: "stylesheet",
                instance: null,
                count: 0,
                state: {
                  loading: 0,
                  preload: null
                }
              }, e.set(A, l), (e = u.querySelector(Ne(A))) ? e._p || (l.instance = e, l
                .state.loading = 5) : (e = St.get(A), e || (e = {
                rel: "preload",
                as: "style",
                href: a.href,
                crossOrigin: a.crossOrigin,
                integrity: a.integrity,
                media: a.media,
                hrefLang: a.hrefLang,
                referrerPolicy: a.referrerPolicy
              }, St.set(A, e)), fH(u, A, e, l.state))), t && c === null) throw Error(U(528,
              ""));
            return l
          }
          if (t && c !== null) throw Error(U(529, ""));
          return null;
        case "script":
          return t = a.async, a = a.src, typeof a == "string" && t && typeof t !=
            "function" && typeof t != "symbol" ? (a = Vu(a), t = Jc(u).hoistableScripts, c = t
              .get(a), c || (c = {
                type: "script",
                instance: null,
                count: 0,
                state: null
              }, t.set(a, c)), c) : {
              type: "void",
              instance: null,
              count: 0,
              state: null
            };
        default:
          throw Error(U(444, A))
      }
    }

    function nu(A) {
      return 'href="' + Ot(A) + '"'
    }

    function Ne(A) {
      return 'link[rel="stylesheet"][' + A + "]"
    }

    function M1(A) {
      return AA({}, A, {
        "data-precedence": A.precedence,
        precedence: null
      })
    }

    function fH(A, t, a, c) {
      if (t = A.querySelector('link[rel="preload"][as="style"][' + t + "]")) {
        if (t[Pl] !== !0) {
          c.loading = 1;
          return
        }
      } else t = A.createElement("link"), t[Pl] = !0, t.onload = t.onerror = xr.bind(null, t),
        fA(t, "link", a), sA(t), A.head.appendChild(t);
      c.preload = t, t.addEventListener("load", function() {
        return c.loading |= 1
      }), t.addEventListener("error", function() {
        return c.loading |= 2
      })
    }

    function Vu(A) {
      return '[src="' + Ot(A) + '"]'
    }

    function xe(A) {
      return "script[async]" + A
    }

    function MR(A, t, a) {
      if (t.count++, t.instance === null) switch (t.type) {
        case "style":
          var c = A.querySelector('style[data-href~="' + Ot(a.href) + '"]');
          if (c) return t.instance = c, sA(c), c;
          var u = AA({}, a, {
            "data-href": a.href,
            "data-precedence": a.precedence,
            href: null,
            precedence: null
          });
          return c = (A.ownerDocument || A).createElement("style"), sA(c), fA(c, "style",
            u), Hl(c, a.precedence, A), t.instance = c;
        case "stylesheet":
          u = nu(a.href);
          var e = A.querySelector(Ne(u));
          if (e) return t.state.loading |= 4, t.instance = e, sA(e), e;
          c = M1(a), (u = St.get(u)) && xq(c, u), e = (A.ownerDocument || A).createElement(
            "link"), sA(e);
          var l = e;
          return l._p = new Promise(function(n, r) {
              l.onload = n, l.onerror = r
            }), fA(e, "link", c), t.state.loading |= 4, Hl(e, a.precedence, A), t.instance =
            e;
        case "script":
          return e = Vu(a.src), (u = A.querySelector(xe(e))) ? (t.instance = u, sA(u), u) :
            (c = a, (u = St.get(e)) && (c = AA({}, a), oq(c, u)), A = A.ownerDocument || A,
              u = A.createElement("script"), sA(u), fA(u, "link", c), A.head.appendChild(u),
              t.instance = u);
        case "void":
          return null;
        default:
          throw Error(U(443, t.type))
      } else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (c = t.instance, t
        .state.loading |= 4, Hl(c, a.precedence, A));
      return t.instance
    }

    function Hl(A, t, a) {
      for (var c = a.querySelectorAll(
            'link[rel="stylesheet"][data-precedence],style[data-precedence]'), u = c.length ?
          c[c.length - 1] : null, e = u, l = 0; l < c.length; l++) {
        var n = c[l];
        if (n.dataset.precedence === t) e = n;
        else if (e !== u) break
      }
      e ? e.parentNode.insertBefore(A, e.nextSibling) : (t = a.nodeType === 9 ? a.head : a, t
        .insertBefore(A, t.firstChild))
    }

    function xq(A, t) {
      A.crossOrigin == null && (A.crossOrigin = t.crossOrigin), A.referrerPolicy == null && (A
        .referrerPolicy = t.referrerPolicy), A.title == null && (A.title = t.title)
    }

    function oq(A, t) {
      A.crossOrigin == null && (A.crossOrigin = t.crossOrigin), A.referrerPolicy == null && (A
        .referrerPolicy = t.referrerPolicy), A.integrity == null && (A.integrity = t
        .integrity)
    }
    var El = null;

    function FR(A, t, a) {
      if (El === null) {
        var c = new Map,
          u = El = new Map;
        u.set(a, c)
      } else u = El, c = u.get(a), c || (c = new Map, u.set(a, c));
      if (c.has(A)) return c;
      for (c.set(A, null), a = a.getElementsByTagName(A), u = 0; u < a.length; u++) {
        var e = a[u];
        if (!(e[be] || e[kA] || A === "link" && e.getAttribute("rel") === "stylesheet") && e
          .namespaceURI !== "http://www.w3.org/2000/svg") {
          var l = e.getAttribute(t) || "";
          l = A + l;
          var n = c.get(l);
          n ? n.push(e) : c.set(l, [e])
        }
      }
      return c
    }

    function UI(A, t, a) {
      A = A.ownerDocument || A, A.head.insertBefore(a, t === "title" ? A.querySelector(
        "head > title") : null)
    }

    function zH(A, t, a) {
      if (a === 1 || t.itemProp != null) return !1;
      switch (A) {
        case "meta":
        case "title":
          return !0;
        case "style":
          if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "")
            break;
          return !0;
        case "link":
          if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t
            .onLoad || t.onError) break;
          return t.rel === "stylesheet" ? (A = t.disabled, typeof t.precedence == "string" &&
            A == null) : !0;
        case "script":
          if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t
            .onLoad && !t.onError && t.src && typeof t.src == "string") return !0
      }
      return !1
    }

    function YR(A, t) {
      return A === "img" && t.src != null && t.src !== "" && t.onLoad == null && t.loading !==
        "lazy"
    }

    function F1(A) {
      return !(A.type === "stylesheet" && (A.state.loading & 3) === 0)
    }

    function Y1(A) {
      return (A.width || 100) * (A.height || 100) * (typeof devicePixelRatio == "number" ?
        devicePixelRatio : 1) * .25
    }

    function _R(A, t) {
      typeof t.decode == "function" && (A.imgCount++, t.complete || (A.imgBytes += Y1(t), A
        .suspenseyImages.push(t)), A = XH.bind(A), t.decode().then(A, A))
    }

    function KH(A, t, a, c) {
      if (a.type === "stylesheet" && (typeof c.media != "string" || matchMedia(c.media)
          .matches !== !1) && (a.state.loading & 4) === 0) {
        if (a.instance === null) {
          var u = nu(c.href),
            e = t.querySelector(Ne(u));
          if (e) {
            t = e._p, t !== null && typeof t == "object" && typeof t.then == "function" && (A
                .count++, A = Ie.bind(A), t.then(A, A)), a.state.loading |= 4, a.instance = e,
              sA(e);
            return
          }
          e = t.ownerDocument || t, c = M1(c), (u = St.get(u)) && xq(c, u), e = e
            .createElement("link"), sA(e);
          var l = e;
          l._p = new Promise(function(n, r) {
            l.onload = n, l.onerror = r
          }), fA(e, "link", c), a.instance = e
        }
        A.stylesheets === null && (A.stylesheets = new Map), A.stylesheets.set(a, t), (t = a
          .state.preload) && (a.state.loading & 3) === 0 && (A.count++, a = Ie.bind(A), t
          .addEventListener("load", a), t.addEventListener("error", a))
      }
    }
    var Sl = 0;

    function GH(A, t) {
      return A.stylesheets && A.count === 0 && Nl(A, A.stylesheets), 0 < A.count || 0 < A
        .imgCount ? function(a) {
          var c = setTimeout(function() {
            if (A.stylesheets && Nl(A, A.stylesheets), A.unsuspend) {
              var e = A.unsuspend;
              A.unsuspend = null, e()
            }
          }, 6e4 + t);
          0 < A.imgBytes && Sl === 0 && (Sl = 62500 * AH());
          var u = setTimeout(function() {
            if (A.waitingForImages = !1, A.count === 0 && (A.stylesheets && Nl(A, A
                .stylesheets), A.unsuspend)) {
              var e = A.unsuspend;
              A.unsuspend = null, e()
            }
          }, (A.imgBytes > Sl ? 50 : 800) + t);
          return A.unsuspend = a,
            function() {
              A.unsuspend = null, clearTimeout(c), clearTimeout(u)
            }
        } : null
    }

    function _1(A) {
      if (A.count === 0 && (A.imgCount === 0 || !A.waitingForImages)) {
        if (A.stylesheets) Nl(A, A.stylesheets);
        else if (A.unsuspend) {
          var t = A.unsuspend;
          A.unsuspend = null, t()
        }
      }
    }

    function Ie() {
      this.count--, _1(this)
    }

    function XH() {
      this.imgCount--, _1(this)
    }
    var Yl = null;

    function Nl(A, t) {
      A.stylesheets = null, A.unsuspend !== null && (A.count++, Yl = new Map, t.forEach(LH,
        A), Yl = null, Ie.call(A))
    }

    function LH(A, t) {
      if (!(t.state.loading & 4)) {
        var a = Yl.get(A);
        if (a) var c = a.get(null);
        else {
          a = new Map, Yl.set(A, a);
          for (var u = A.querySelectorAll("link[data-precedence],style[data-precedence]"), e =
              0; e < u.length; e++) {
            var l = u[e];
            (l.nodeName === "LINK" || l.getAttribute("media") !== "not all") && (a.set(l
              .dataset.precedence, l), c = l)
          }
          c && a.set(null, c)
        }
        u = t.instance, l = u.getAttribute("data-precedence"), e = a.get(l) || c, e === c && a
          .set(null, u), a.set(l, u), this.count++, c = Ie.bind(this), u.addEventListener(
            "load", c), u.addEventListener("error", c), e ? e.parentNode.insertBefore(u, e
            .nextSibling) : (A = A.nodeType === 9 ? A.head : A, A.insertBefore(u, A
            .firstChild)), t.state.loading |= 4
      }
    }
    var Iu = {
      $$typeof: Xt,
      Provider: null,
      Consumer: null,
      _currentValue: ac,
      _currentValue2: ac,
      _threadCount: 0
    };

    function ZH(A, t, a, c, u, e, l, n, r) {
      this.tag = 1, this.containerInfo = A, this.pingCache = this.current = this
        .pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this
        .pendingContext = this.context = this.cancelPendingCommit = null, this
        .callbackPriority = 0, this.expirationTimes = Qi(-1), this.entangledLanes = this
        .shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this
        .warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this
        .entanglements = Qi(0), this.hiddenUpdates = Qi(null), this.identifierPrefix = c, this
        .onUncaughtError = u, this.onCaughtError = e, this.onRecoverableError = l, this
        .pooledCache = null, this.pooledCacheLanes = 0, this.formState = r, this
        .transitionTypes = null, this.incompleteTransitions = new Map
    }

    function $1(A, t, a, c, u, e, l, n, r, I, p, q) {
      return A = new ZH(A, t, a, l, r, I, p, q, n), t = 1, e === !0 && (t |= 24), e = FA(3,
          null, null, t), A.current = e, e.stateNode = A, t = QI(), t.refCount++, A
        .pooledCache = t, t.refCount++, e.memoizedState = {
          element: c,
          isDehydrated: a,
          cache: t
        }, vI(e), A
    }

    function Aj(A) {
      return A ? (A = Zc, A) : Zc
    }

    function tj(A, t, a, c, u, e) {
      u = Aj(u), c.context === null ? c.context = u : c.pendingContext = u, c = Ta(t), c
        .payload = {
          element: a
        }, e = e === void 0 ? null : e, e !== null && (c.callback = e), a = ma(A, c, t), a !==
        null && (YA(a, A, t), wu(a, A, t))
    }

    function $R(A, t) {
      if (A = A.memoizedState, A !== null && A.dehydrated !== null) {
        var a = A.retryLane;
        A.retryLane = a !== 0 && a < t ? a : t
      }
    }

    function sq(A, t) {
      $R(A, t), (A = A.alternate) && $R(A, t)
    }

    function aj(A) {
      if (A.tag === 13 || A.tag === 31) {
        var t = Vc(A, 67108864);
        t !== null && YA(t, A, 67108864), sq(A, 67108864)
      }
    }

    function Ar(A) {
      if (A.tag === 13 || A.tag === 31) {
        var t = It();
        t = mI(t);
        var a = Vc(A, t);
        a !== null && YA(a, A, t), sq(A, t)
      }
    }
    var qu = !0;

    function DH(A, t, a, c) {
      var u = m.T;
      m.T = null;
      var e = v.p;
      try {
        v.p = 2, Uq(A, t, a, c)
      } finally {
        v.p = e, m.T = u
      }
    }

    function wH(A, t, a, c) {
      var u = m.T;
      m.T = null;
      var e = v.p;
      try {
        v.p = 8, Uq(A, t, a, c)
      } finally {
        v.p = e, m.T = u
      }
    }

    function Uq(A, t, a, c) {
      if (qu) {
        var u = yI(c);
        if (u === null) dn(A, t, c, _l, a), tr(A, c);
        else if (JH(u, A, t, a, c)) c.stopPropagation();
        else if (tr(A, c), t & 4 && -1 < gH.indexOf(A)) {
          for (; u !== null;) {
            var e = ru(u);
            if (e !== null) switch (e.tag) {
              case 3:
                if (e = e.stateNode, e.current.memoizedState.isDehydrated) {
                  var l = Ya(e.pendingLanes);
                  if (l !== 0) {
                    var n = e;
                    for (n.pendingLanes |= 2, n.entangledLanes |= 2; l;) {
                      var r = 1 << 31 - nt(l);
                      n.entanglements[1] |= r, l &= ~r
                    }
                    Bt(e), (h & 6) === 0 && (hl = lt() + 500, Se(0, !1))
                  }
                }
                break;
              case 31:
              case 13:
                n = Vc(e, 2), n !== null && YA(n, e, 2), di(), sq(e, 2)
            }
            if (e = yI(c), e === null && dn(A, t, c, _l, a), e === u) break;
            u = e
          }
          u !== null && c.stopPropagation()
        } else dn(A, t, c, null, a)
      }
    }

    function yI(A) {
      return A = KI(A), yq(A)
    }
    var _l = null;

    function yq(A) {
      if (_l = null, A = Ac(A), A !== null) {
        var t = Re(A);
        if (t === null) A = null;
        else {
          var a = t.tag;
          if (a === 13) {
            if (A = ir(t), A !== null) return A;
            A = null
          } else if (a === 31) {
            if (A = nr(t), A !== null) return A;
            A = null
          } else if (a === 3) {
            if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t
              .stateNode.containerInfo : null;
            A = null
          } else t !== A && (A = null)
        }
      }
      return _l = A, null
    }

    function cj(A) {
      switch (A) {
        case "beforetoggle":
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "seeked":
        case "submit":
        case "toggle":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "fullscreenerror":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return 2;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "resize":
        case "scroll":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return 8;
        case "message":
          switch (aV()) {
            case dr:
              return 2;
            case jr:
              return 8;
            case yl:
            case cV:
              return 32;
            case br:
              return 268435456;
            default:
              return 32
          }
        default:
          return 32
      }
    }
    var PI = !1,
      Ga = null,
      Xa = null,
      La = null,
      qe = new Map,
      pe = new Map,
      Na = [],
      gH =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset"
      .split(" ");

    function tr(A, t) {
      switch (A) {
        case "focusin":
        case "focusout":
          Ga = null;
          break;
        case "dragenter":
        case "dragleave":
          Xa = null;
          break;
        case "mouseover":
        case "mouseout":
          La = null;
          break;
        case "pointerover":
        case "pointerout":
          qe.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          pe.delete(t.pointerId)
      }
    }

    function Wu(A, t, a, c, u, e) {
      return A === null || A.nativeEvent !== e ? (A = {
        blockedOn: t,
        domEventName: a,
        eventSystemFlags: c,
        nativeEvent: e,
        targetContainers: [u]
      }, t !== null && (t = ru(t), t !== null && aj(t)), A) : (A.eventSystemFlags |= c, t =
        A.targetContainers, u !== null && t.indexOf(u) === -1 && t.push(u), A)
    }

    function JH(A, t, a, c, u) {
      switch (t) {
        case "focusin":
          return Ga = Wu(Ga, A, t, a, c, u), !0;
        case "dragenter":
          return Xa = Wu(Xa, A, t, a, c, u), !0;
        case "mouseover":
          return La = Wu(La, A, t, a, c, u), !0;
        case "pointerover":
          var e = u.pointerId;
          return qe.set(e, Wu(qe.get(e) || null, A, t, a, c, u)), !0;
        case "gotpointercapture":
          return e = u.pointerId, pe.set(e, Wu(pe.get(e) || null, A, t, a, c, u)), !0
      }
      return !1
    }

    function uj(A) {
      var t = Ac(A.target);
      if (t !== null) {
        var a = Re(t);
        if (a !== null) {
          if (t = a.tag, t === 13) {
            if (t = ir(a), t !== null) {
              A.blockedOn = t, yp(A.priority, function() {
                Ar(a)
              });
              return
            }
          } else if (t === 31) {
            if (t = nr(a), t !== null) {
              A.blockedOn = t, yp(A.priority, function() {
                Ar(a)
              });
              return
            }
          } else if (t === 3 && a.stateNode.current.memoizedState.isDehydrated) {
            A.blockedOn = a.tag === 3 ? a.stateNode.containerInfo : null;
            return
          }
        }
      }
      A.blockedOn = null
    }

    function xl(A) {
      if (A.blockedOn !== null) return !1;
      for (var t = A.targetContainers; 0 < t.length;) {
        var a = yI(A.nativeEvent);
        if (a === null) {
          a = A.nativeEvent;
          var c = new a.constructor(a.type, a);
          Tn = c, a.target.dispatchEvent(c), Tn = null
        } else return t = ru(a), t !== null && aj(t), A.blockedOn = a, !1;
        t.shift()
      }
      return !0
    }

    function ar(A, t, a) {
      xl(A) && a.delete(t)
    }

    function QH() {
      PI = !1, Ga !== null && xl(Ga) && (Ga = null), Xa !== null && xl(Xa) && (Xa = null),
        La !== null && xl(La) && (La = null), qe.forEach(ar), pe.forEach(ar)
    }

    function cl(A, t) {
      A.blockedOn === t && (A.blockedOn = null, PI || (PI = !0, SA.unstable_scheduleCallback(
        SA.unstable_NormalPriority, QH)))
    }
    var ul = null;

    function cr(A) {
      ul !== A && (ul = A, SA.unstable_scheduleCallback(SA.unstable_NormalPriority,
    function() {
        ul === A && (ul = null);
        for (var t = 0; t < A.length; t += 3) {
          var a = A[t],
            c = A[t + 1],
            u = A[t + 2];
          if (typeof c != "function") {
            if (yq(c || a) === null) continue;
            break
          }
          var e = ru(a);
          e !== null && (A.splice(t, 3), t -= 3, vn(e, {
            pending: !0,
            data: u,
            method: a.method,
            action: c
          }, c, u))
        }
      }))
    }

    function pu(A) {
      function t(r) {
        return cl(r, A)
      }
      Ga !== null && cl(Ga, A), Xa !== null && cl(Xa, A), La !== null && cl(La, A), qe
        .forEach(t), pe.forEach(t);
      for (var a = 0; a < Na.length; a++) {
        var c = Na[a];
        c.blockedOn === A && (c.blockedOn = null)
      }
      for (; 0 < Na.length && (a = Na[0], a.blockedOn === null);) uj(a), a.blockedOn ===
        null && Na.shift();
      if (a = (A.ownerDocument || A).$$reactFormReplay, a != null)
        for (c = 0; c < a.length; c += 3) {
          var u = a[c],
            e = a[c + 1],
            l = u[$A] || null;
          if (typeof e == "function") l || cr(a);
          else if (l) {
            var n = null;
            if (e && e.hasAttribute("formAction")) {
              if (u = e, l = e[$A] || null) n = l.formAction;
              else if (yq(u) !== null) continue
            } else n = l.action;
            typeof n == "function" ? a[c + 1] = n : (a.splice(c, 3), c -= 3), cr(a)
          }
        }
    }

    function ej() {
      function A(e) {
        e.canIntercept && e.info === "react-transition" && e.intercept({
          handler: function() {
            return new Promise(function(l) {
              return u = l
            })
          },
          focusReset: "manual",
          scroll: "manual"
        })
      }

      function t() {
        u !== null && (u(), u = null), c || setTimeout(a, 20)
      }

      function a() {
        if (!c && !navigation.transition) {
          var e = navigation.currentEntry;
          e && e.url != null && navigation.navigate(e.url, {
            state: e.getState(),
            info: "react-transition",
            history: "replace"
          })
        }
      }
      if (typeof navigation == "object") {
        var c = !1,
          u = null;
        return navigation.addEventListener("navigate", A), navigation.addEventListener(
            "navigatesuccess", t), navigation.addEventListener("navigateerror", t),
          setTimeout(a, 100),
          function() {
            c = !0, navigation.removeEventListener("navigate", A), navigation
              .removeEventListener("navigatesuccess", t), navigation.removeEventListener(
                "navigateerror", t), u !== null && (u(), u = null)
          }
      }
    }

    function Pq(A) {
      this._internalRoot = A
    }
    Oi.prototype.render = Pq.prototype.render = function(A) {
      var t = this._internalRoot;
      if (t === null) throw Error(U(409));
      var a = t.current,
        c = It();
      tj(a, c, A, t, null, null)
    };
    Oi.prototype.unmount = Pq.prototype.unmount = function() {
      var A = this._internalRoot;
      if (A !== null) {
        this._internalRoot = null;
        var t = A.containerInfo;
        tj(A.current, 2, null, A, null, null), di(), t[Ru] = null
      }
    };

    function Oi(A) {
      this._internalRoot = A
    }
    Oi.prototype.unstable_scheduleHydration = function(A) {
      if (A) {
        var t = Nr();
        A = {
          blockedOn: null,
          target: A,
          priority: t
        };
        for (var a = 0; a < Na.length && t !== 0 && t < Na[a].priority; a++);
        Na.splice(a, 0, A), a === 0 && uj(A)
      }
    };
    var ur = er.version;
    if (ur !== "19.3.1") throw Error(U(527, ur, "19.3.1"));
    v.findDOMNode = function(A) {
      var t = A._reactInternals;
      if (t === void 0) throw typeof A.render == "function" ? Error(U(188)) : (A = Object
        .keys(A).join(","), Error(U(268, A)));
      return A = BO(t), A = A !== null ? Ir(A) : null, A = A === null ? null : A.stateNode,
        A
    };
    var BH = {
      bundleType: 0,
      version: "19.3.1",
      rendererPackageName: "react-dom",
      currentDispatcherRef: m,
      reconcilerVersion: "19.3.1"
    };
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && (Tu = __REACT_DEVTOOLS_GLOBAL_HOOK__, !
        Tu.isDisabled && Tu.supportsFiber)) try {
      re = Tu.inject(BH), it = Tu
    } catch {}
    var Tu;
    Vi.createRoot = function(A, t) {
      if (!lr(A)) throw Error(U(299));
      var a = !1,
        c = "",
        u = Zd,
        e = Dd,
        l = wd;
      return t != null && (t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !==
        void 0 && (c = t.identifierPrefix), t.onUncaughtError !== void 0 && (u = t
          .onUncaughtError), t.onCaughtError !== void 0 && (e = t.onCaughtError), t
        .onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = $1(A, 1, !1,
        null, null, a, c, null, u, e, l, ej), A[Ru] = t.current, Hq(A), new Pq(t)
    };
    Vi.hydrateRoot = function(A, t, a) {
      if (!lr(A)) throw Error(U(299));
      var c = !1,
        u = "",
        e = Zd,
        l = Dd,
        n = wd,
        r = null;
      return a != null && (a.unstable_strictMode === !0 && (c = !0), a.identifierPrefix !==
          void 0 && (u = a.identifierPrefix), a.onUncaughtError !== void 0 && (e = a
            .onUncaughtError), a.onCaughtError !== void 0 && (l = a.onCaughtError), a
          .onRecoverableError !== void 0 && (n = a.onRecoverableError), a.formState !==
          void 0 && (r = a.formState)), t = $1(A, 1, !0, t, a ?? null, c, u, r, e, l, n,
        ej), t.context = Aj(null), a = t.current, c = It(), c = mI(c), u = Ta(c), u
        .callback = null, ma(a, u, c), a = c, t.current.lanes = a, je(t, a), Bt(t), A[Ru] =
        t.current, Hq(A), new Oi(t)
    };
    Vi.version = "19.3.1"
  });
  var Ij = xt((L0, nj) => {
    "use strict";

    function ij() {
      if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
          typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ij)
      } catch (A) {
        console.error(A)
      }
    }
    ij(), nj.exports = lj()
  });

  function Hj(A, t = 0) {
    let a = [];
    return A.forEach(function(c, u) {
      let e = null;
      c.forEach(function(l, n) {
        if (!l && e !== null) {
          a.push(`M${e+t} ${u+t}h${n-e}v1H${e+t}z`), e = null;
          return
        }
        if (n === c.length - 1) {
          if (!l) return;
          e === null ? a.push(`M${n+t},${u+t} h1v1H${n+t}z`) : a.push(
            `M${e+t},${u+t} h${n+1-e}v1H${e+t}z`);
          return
        }
        l && e === null && (e = n)
      })
    }), a.join("")
  }

  function Ej(A, t) {
    return A.slice().map((a, c) => c < t.y || c >= t.y + t.h ? a : a.map((u, e) => e < t.x || e >=
      t.x + t.w ? u : !1))
  }

  function YH(A, t, a, c) {
    if (c == null) return null;
    let u = A.length + a * 2,
      e = Math.floor(t * FH),
      l = u / t,
      n = (c.width || e) * l,
      r = (c.height || e) * l,
      I = c.x == null ? A.length / 2 - n / 2 : c.x * l,
      p = c.y == null ? A.length / 2 - r / 2 : c.y * l,
      q = c.opacity == null ? 1 : c.opacity,
      R = null;
    if (c.excavate) {
      let S = Math.floor(I),
        N = Math.floor(p),
        x = Math.ceil(n + I - S),
        O = Math.ceil(r + p - N);
      R = {
        x: S,
        y: N,
        w: x,
        h: O
      }
    }
    let d = c.crossOrigin;
    return {
      x: I,
      y: p,
      h: r,
      w: n,
      excavation: R,
      opacity: q,
      crossOrigin: d
    }
  }

  function _H(A, t) {
    return t != null ? Math.max(Math.floor(t), 0) : A ? CH : MH
  }

  function Sj({
    value: A,
    level: t,
    minVersion: a,
    includeMargin: c,
    marginSize: u,
    imageSettings: e,
    size: l,
    boostLevel: n
  }) {
    let r = VA.default.useMemo(() => {
        let S = (Array.isArray(A) ? A : [A]).reduce((N, x) => (N.push(...Hu.QrSegment
          .makeSegments(x)), N), []);
        return Hu.QrCode.encodeSegments(S, vH[t], a, void 0, void 0, n)
      }, [A, t, a, n]),
      {
        cells: I,
        margin: p,
        numCells: q,
        calculatedImageSettings: R
      } = VA.default.useMemo(() => {
        let d = r.getModules(),
          S = _H(c, u),
          N = d.length + S * 2,
          x = YH(d, l, S, e);
        return {
          cells: d,
          margin: S,
          numCells: N,
          calculatedImageSettings: x
        }
      }, [r, l, e, c, u]);
    return {
      qrcode: r,
      margin: p,
      cells: I,
      numCells: q,
      calculatedImageSettings: R
    }
  }
  var VA, hH, Hi, pj, Rj, qj, kq, Wq, Ec, Hu, vH, rj, dj, jj, bj, Oj, Vj, CH, MH, FH, $H, A0, oe,
    Tq = z(() => {
      VA = GA(ja(), 1), hH = Object.defineProperty, Hi = Object.getOwnPropertySymbols, pj =
        Object.prototype.hasOwnProperty, Rj = Object.prototype.propertyIsEnumerable, qj = (A, t,
          a) => t in A ? hH(A, t, {
          enumerable: !0,
          configurable: !0,
          writable: !0,
          value: a
        }) : A[t] = a, kq = (A, t) => {
          for (var a in t || (t = {})) pj.call(t, a) && qj(A, a, t[a]);
          if (Hi)
            for (var a of Hi(t)) Rj.call(t, a) && qj(A, a, t[a]);
          return A
        }, Wq = (A, t) => {
          var a = {};
          for (var c in A) pj.call(A, c) && t.indexOf(c) < 0 && (a[c] = A[c]);
          if (A != null && Hi)
            for (var c of Hi(A)) t.indexOf(c) < 0 && Rj.call(A, c) && (a[c] = A[c]);
          return a
        };
      (A => {
        let t = class w {
          constructor(I, p, q, R) {
            if (this.version = I, this.errorCorrectionLevel = p, this.modules = [], this
              .isFunction = [], I < w.MIN_VERSION || I > w.MAX_VERSION)
            throw new RangeError("Version value out of range");
            if (R < -1 || R > 7) throw new RangeError("Mask value out of range");
            this.size = I * 4 + 17;
            let d = [];
            for (let N = 0; N < this.size; N++) d.push(!1);
            for (let N = 0; N < this.size; N++) this.modules.push(d.slice()), this
              .isFunction.push(d.slice());
            this.drawFunctionPatterns();
            let S = this.addEccAndInterleave(q);
            if (this.drawCodewords(S), R == -1) {
              let N = 1e9;
              for (let x = 0; x < 8; x++) {
                this.applyMask(x), this.drawFormatBits(x);
                let O = this.getPenaltyScore();
                O < N && (R = x, N = O), this.applyMask(x)
              }
            }
            e(0 <= R && R <= 7), this.mask = R, this.applyMask(R), this.drawFormatBits(R),
              this.isFunction = []
          }
          static encodeText(I, p) {
            let q = A.QrSegment.makeSegments(I);
            return w.encodeSegments(q, p)
          }
          static encodeBinary(I, p) {
            let q = A.QrSegment.makeBytes(I);
            return w.encodeSegments([q], p)
          }
          static encodeSegments(I, p, q = 1, R = 40, d = -1, S = !0) {
            if (!(w.MIN_VERSION <= q && q <= R && R <= w.MAX_VERSION) || d < -1 || d > 7)
              throw new RangeError("Invalid value");
            let N, x;
            for (N = q;; N++) {
              let E = w.getNumDataCodewords(N, p) * 8,
                s = n.getTotalBits(I, N);
              if (s <= E) {
                x = s;
                break
              }
              if (N >= R) throw new RangeError("Data too long")
            }
            for (let E of [w.Ecc.MEDIUM, w.Ecc.QUARTILE, w.Ecc.HIGH]) S && x <= w
              .getNumDataCodewords(N, E) * 8 && (p = E);
            let O = [];
            for (let E of I) {
              c(E.mode.modeBits, 4, O), c(E.numChars, E.mode.numCharCountBits(N), O);
              for (let s of E.getData()) O.push(s)
            }
            e(O.length == x);
            let j = w.getNumDataCodewords(N, p) * 8;
            e(O.length <= j), c(0, Math.min(4, j - O.length), O), c(0, (8 - O.length %
              8) % 8, O), e(O.length % 8 == 0);
            for (let E = 236; O.length < j; E ^= 253) c(E, 8, O);
            let H = [];
            for (; H.length * 8 < O.length;) H.push(0);
            return O.forEach((E, s) => H[s >>> 3] |= E << 7 - (s & 7)), new w(N, p, H, d)
          }
          getModule(I, p) {
            return 0 <= I && I < this.size && 0 <= p && p < this.size && this.modules[p][
              I]
          }
          getModules() {
            return this.modules
          }
          drawFunctionPatterns() {
            for (let q = 0; q < this.size; q++) this.setFunctionModule(6, q, q % 2 == 0),
              this.setFunctionModule(q, 6, q % 2 == 0);
            this.drawFinderPattern(3, 3), this.drawFinderPattern(this.size - 4, 3), this
              .drawFinderPattern(3, this.size - 4);
            let I = this.getAlignmentPatternPositions(),
              p = I.length;
            for (let q = 0; q < p; q++)
              for (let R = 0; R < p; R++) q == 0 && R == 0 || q == 0 && R == p - 1 || q ==
                p - 1 && R == 0 || this.drawAlignmentPattern(I[q], I[R]);
            this.drawFormatBits(0), this.drawVersion()
          }
          drawFormatBits(I) {
            let p = this.errorCorrectionLevel.formatBits << 3 | I,
              q = p;
            for (let d = 0; d < 10; d++) q = q << 1 ^ (q >>> 9) * 1335;
            let R = (p << 10 | q) ^ 21522;
            e(R >>> 15 == 0);
            for (let d = 0; d <= 5; d++) this.setFunctionModule(8, d, u(R, d));
            this.setFunctionModule(8, 7, u(R, 6)), this.setFunctionModule(8, 8, u(R, 7)),
              this.setFunctionModule(7, 8, u(R, 8));
            for (let d = 9; d < 15; d++) this.setFunctionModule(14 - d, 8, u(R, d));
            for (let d = 0; d < 8; d++) this.setFunctionModule(this.size - 1 - d, 8, u(R,
              d));
            for (let d = 8; d < 15; d++) this.setFunctionModule(8, this.size - 15 + d, u(
              R, d));
            this.setFunctionModule(8, this.size - 8, !0)
          }
          drawVersion() {
            if (this.version < 7) return;
            let I = this.version;
            for (let q = 0; q < 12; q++) I = I << 1 ^ (I >>> 11) * 7973;
            let p = this.version << 12 | I;
            e(p >>> 18 == 0);
            for (let q = 0; q < 18; q++) {
              let R = u(p, q),
                d = this.size - 11 + q % 3,
                S = Math.floor(q / 3);
              this.setFunctionModule(d, S, R), this.setFunctionModule(S, d, R)
            }
          }
          drawFinderPattern(I, p) {
            for (let q = -4; q <= 4; q++)
              for (let R = -4; R <= 4; R++) {
                let d = Math.max(Math.abs(R), Math.abs(q)),
                  S = I + R,
                  N = p + q;
                0 <= S && S < this.size && 0 <= N && N < this.size && this
                  .setFunctionModule(S, N, d != 2 && d != 4)
              }
          }
          drawAlignmentPattern(I, p) {
            for (let q = -2; q <= 2; q++)
              for (let R = -2; R <= 2; R++) this.setFunctionModule(I + R, p + q, Math.max(
                Math.abs(R), Math.abs(q)) != 1)
          }
          setFunctionModule(I, p, q) {
            this.modules[p][I] = q, this.isFunction[p][I] = !0
          }
          addEccAndInterleave(I) {
            let p = this.version,
              q = this.errorCorrectionLevel;
            if (I.length != w.getNumDataCodewords(p, q)) throw new RangeError(
              "Invalid argument");
            let R = w.NUM_ERROR_CORRECTION_BLOCKS[q.ordinal][p],
              d = w.ECC_CODEWORDS_PER_BLOCK[q.ordinal][p],
              S = Math.floor(w.getNumRawDataModules(p) / 8),
              N = R - S % R,
              x = Math.floor(S / R),
              O = [],
              j = w.reedSolomonComputeDivisor(d);
            for (let E = 0, s = 0; E < R; E++) {
              let P = I.slice(s, s + x - d + (E < N ? 0 : 1));
              s += P.length;
              let k = w.reedSolomonComputeRemainder(P, j);
              E < N && P.push(0), O.push(P.concat(k))
            }
            let H = [];
            for (let E = 0; E < O[0].length; E++) O.forEach((s, P) => {
              (E != x - d || P >= N) && H.push(s[E])
            });
            return e(H.length == S), H
          }
          drawCodewords(I) {
            if (I.length != Math.floor(w.getNumRawDataModules(this.version) / 8))
            throw new RangeError("Invalid argument");
            let p = 0;
            for (let q = this.size - 1; q >= 1; q -= 2) {
              q == 6 && (q = 5);
              for (let R = 0; R < this.size; R++)
                for (let d = 0; d < 2; d++) {
                  let S = q - d,
                    x = (q + 1 & 2) == 0 ? this.size - 1 - R : R;
                  !this.isFunction[x][S] && p < I.length * 8 && (this.modules[x][S] = u(I[
                    p >>> 3], 7 - (p & 7)), p++)
                }
            }
            e(p == I.length * 8)
          }
          applyMask(I) {
            if (I < 0 || I > 7) throw new RangeError("Mask value out of range");
            for (let p = 0; p < this.size; p++)
              for (let q = 0; q < this.size; q++) {
                let R;
                switch (I) {
                  case 0:
                    R = (q + p) % 2 == 0;
                    break;
                  case 1:
                    R = p % 2 == 0;
                    break;
                  case 2:
                    R = q % 3 == 0;
                    break;
                  case 3:
                    R = (q + p) % 3 == 0;
                    break;
                  case 4:
                    R = (Math.floor(q / 3) + Math.floor(p / 2)) % 2 == 0;
                    break;
                  case 5:
                    R = q * p % 2 + q * p % 3 == 0;
                    break;
                  case 6:
                    R = (q * p % 2 + q * p % 3) % 2 == 0;
                    break;
                  case 7:
                    R = ((q + p) % 2 + q * p % 3) % 2 == 0;
                    break;
                  default:
                    throw new Error("Unreachable")
                }!this.isFunction[p][q] && R && (this.modules[p][q] = !this.modules[p][q])
              }
          }
          getPenaltyScore() {
            let I = 0;
            for (let d = 0; d < this.size; d++) {
              let S = !1,
                N = 0,
                x = [0, 0, 0, 0, 0, 0, 0];
              for (let O = 0; O < this.size; O++) this.modules[d][O] == S ? (N++, N == 5 ?
                I += w.PENALTY_N1 : N > 5 && I++) : (this.finderPenaltyAddHistory(N, x),
                S || (I += this.finderPenaltyCountPatterns(x) * w.PENALTY_N3), S = this
                .modules[d][O], N = 1);
              I += this.finderPenaltyTerminateAndCount(S, N, x) * w.PENALTY_N3
            }
            for (let d = 0; d < this.size; d++) {
              let S = !1,
                N = 0,
                x = [0, 0, 0, 0, 0, 0, 0];
              for (let O = 0; O < this.size; O++) this.modules[O][d] == S ? (N++, N == 5 ?
                I += w.PENALTY_N1 : N > 5 && I++) : (this.finderPenaltyAddHistory(N, x),
                S || (I += this.finderPenaltyCountPatterns(x) * w.PENALTY_N3), S = this
                .modules[O][d], N = 1);
              I += this.finderPenaltyTerminateAndCount(S, N, x) * w.PENALTY_N3
            }
            for (let d = 0; d < this.size - 1; d++)
              for (let S = 0; S < this.size - 1; S++) {
                let N = this.modules[d][S];
                N == this.modules[d][S + 1] && N == this.modules[d + 1][S] && N == this
                  .modules[d + 1][S + 1] && (I += w.PENALTY_N2)
              }
            let p = 0;
            for (let d of this.modules) p = d.reduce((S, N) => S + (N ? 1 : 0), p);
            let q = this.size * this.size,
              R = Math.ceil(Math.abs(p * 20 - q * 10) / q) - 1;
            return e(0 <= R && R <= 9), I += R * w.PENALTY_N4, e(0 <= I && I <= 2568888),
              I
          }
          getAlignmentPatternPositions() {
            if (this.version == 1) return [];
            {
              let I = Math.floor(this.version / 7) + 2,
                p = this.version == 32 ? 26 : Math.ceil((this.version * 4 + 4) / (I * 2 -
                  2)) * 2,
                q = [6];
              for (let R = this.size - 7; q.length < I; R -= p) q.splice(1, 0, R);
              return q
            }
          }
          static getNumRawDataModules(I) {
            if (I < w.MIN_VERSION || I > w.MAX_VERSION) throw new RangeError(
              "Version number out of range");
            let p = (16 * I + 128) * I + 64;
            if (I >= 2) {
              let q = Math.floor(I / 7) + 2;
              p -= (25 * q - 10) * q - 55, I >= 7 && (p -= 36)
            }
            return e(208 <= p && p <= 29648), p
          }
          static getNumDataCodewords(I, p) {
            return Math.floor(w.getNumRawDataModules(I) / 8) - w.ECC_CODEWORDS_PER_BLOCK[p
              .ordinal][I] * w.NUM_ERROR_CORRECTION_BLOCKS[p.ordinal][I]
          }
          static reedSolomonComputeDivisor(I) {
            if (I < 1 || I > 255) throw new RangeError("Degree out of range");
            let p = [];
            for (let R = 0; R < I - 1; R++) p.push(0);
            p.push(1);
            let q = 1;
            for (let R = 0; R < I; R++) {
              for (let d = 0; d < p.length; d++) p[d] = w.reedSolomonMultiply(p[d], q),
                d + 1 < p.length && (p[d] ^= p[d + 1]);
              q = w.reedSolomonMultiply(q, 2)
            }
            return p
          }
          static reedSolomonComputeRemainder(I, p) {
            let q = p.map(R => 0);
            for (let R of I) {
              let d = R ^ q.shift();
              q.push(0), p.forEach((S, N) => q[N] ^= w.reedSolomonMultiply(S, d))
            }
            return q
          }
          static reedSolomonMultiply(I, p) {
            if (I >>> 8 || p >>> 8) throw new RangeError("Byte out of range");
            let q = 0;
            for (let R = 7; R >= 0; R--) q = q << 1 ^ (q >>> 7) * 285, q ^= (p >>> R &
              1) * I;
            return e(q >>> 8 == 0), q
          }
          finderPenaltyCountPatterns(I) {
            let p = I[1];
            e(p <= this.size * 3);
            let q = p > 0 && I[2] == p && I[3] == p * 3 && I[4] == p && I[5] == p;
            return (q && I[0] >= p * 4 && I[6] >= p ? 1 : 0) + (q && I[6] >= p * 4 && I[
              0] >= p ? 1 : 0)
          }
          finderPenaltyTerminateAndCount(I, p, q) {
            return I && (this.finderPenaltyAddHistory(p, q), p = 0), p += this.size, this
              .finderPenaltyAddHistory(p, q), this.finderPenaltyCountPatterns(q)
          }
          finderPenaltyAddHistory(I, p) {
            p[0] == 0 && (I += this.size), p.pop(), p.unshift(I)
          }
        };
        t.MIN_VERSION = 1, t.MAX_VERSION = 40, t.PENALTY_N1 = 3, t.PENALTY_N2 = 3, t
          .PENALTY_N3 = 40, t.PENALTY_N4 = 10, t.ECC_CODEWORDS_PER_BLOCK = [
            [-1, 7, 10, 15, 20, 26, 18, 20, 24, 30, 18, 20, 24, 26, 30, 22, 24, 28, 30, 28,
              28, 28, 28, 30, 30, 26, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
              30
            ],
            [-1, 10, 16, 26, 18, 24, 16, 18, 22, 22, 26, 30, 22, 22, 24, 24, 28, 28, 26, 26,
              26, 26, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28, 28,
              28
            ],
            [-1, 13, 22, 18, 26, 18, 24, 18, 22, 20, 24, 28, 26, 24, 20, 30, 24, 28, 28, 26,
              30, 28, 30, 30, 30, 30, 28, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
              30
            ],
            [-1, 17, 28, 22, 16, 22, 28, 26, 26, 24, 28, 24, 28, 22, 24, 24, 30, 28, 28, 26,
              28, 30, 24, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,
              30
            ]
          ], t.NUM_ERROR_CORRECTION_BLOCKS = [
            [-1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 4, 4, 4, 4, 4, 6, 6, 6, 6, 7, 8, 8, 9, 9, 10, 12,
              12, 12, 13, 14, 15, 16, 17, 18, 19, 19, 20, 21, 22, 24, 25
            ],
            [-1, 1, 1, 1, 2, 2, 4, 4, 4, 5, 5, 5, 8, 9, 9, 10, 10, 11, 13, 14, 16, 17, 17, 18,
              20, 21, 23, 25, 26, 28, 29, 31, 33, 35, 37, 38, 40, 43, 45, 47, 49
            ],
            [-1, 1, 1, 2, 2, 4, 4, 6, 6, 8, 8, 8, 10, 12, 16, 12, 17, 16, 18, 21, 20, 23, 23,
              25, 27, 29, 34, 34, 35, 38, 40, 43, 45, 48, 51, 53, 56, 59, 62, 65, 68
            ],
            [-1, 1, 1, 2, 4, 4, 4, 5, 6, 8, 8, 11, 11, 16, 16, 18, 16, 19, 21, 25, 25, 25, 34,
              30, 32, 35, 37, 40, 42, 45, 48, 51, 54, 57, 60, 63, 66, 70, 74, 77, 81
            ]
          ];
        let a = t;
        A.QrCode = t;

        function c(r, I, p) {
          if (I < 0 || I > 31 || r >>> I) throw new RangeError("Value out of range");
          for (let q = I - 1; q >= 0; q--) p.push(r >>> q & 1)
        }

        function u(r, I) {
          return (r >>> I & 1) != 0
        }

        function e(r) {
          if (!r) throw new Error("Assertion error")
        }
        let l = class rA {
          constructor(I, p, q) {
            if (this.mode = I, this.numChars = p, this.bitData = q, p < 0)
            throw new RangeError("Invalid argument");
            this.bitData = q.slice()
          }
          static makeBytes(I) {
            let p = [];
            for (let q of I) c(q, 8, p);
            return new rA(rA.Mode.BYTE, I.length, p)
          }
          static makeNumeric(I) {
            if (!rA.isNumeric(I)) throw new RangeError(
              "String contains non-numeric characters");
            let p = [];
            for (let q = 0; q < I.length;) {
              let R = Math.min(I.length - q, 3);
              c(parseInt(I.substring(q, q + R), 10), R * 3 + 1, p), q += R
            }
            return new rA(rA.Mode.NUMERIC, I.length, p)
          }
          static makeAlphanumeric(I) {
            if (!rA.isAlphanumeric(I)) throw new RangeError(
              "String contains unencodable characters in alphanumeric mode");
            let p = [],
              q;
            for (q = 0; q + 2 <= I.length; q += 2) {
              let R = rA.ALPHANUMERIC_CHARSET.indexOf(I.charAt(q)) * 45;
              R += rA.ALPHANUMERIC_CHARSET.indexOf(I.charAt(q + 1)), c(R, 11, p)
            }
            return q < I.length && c(rA.ALPHANUMERIC_CHARSET.indexOf(I.charAt(q)), 6, p),
              new rA(rA.Mode.ALPHANUMERIC, I.length, p)
          }
          static makeSegments(I) {
            return I == "" ? [] : rA.isNumeric(I) ? [rA.makeNumeric(I)] : rA
              .isAlphanumeric(I) ? [rA.makeAlphanumeric(I)] : [rA.makeBytes(rA
                .toUtf8ByteArray(I))]
          }
          static makeEci(I) {
            let p = [];
            if (I < 0) throw new RangeError("ECI assignment value out of range");
            if (I < 128) c(I, 8, p);
            else if (I < 16384) c(2, 2, p), c(I, 14, p);
            else if (I < 1e6) c(6, 3, p), c(I, 21, p);
            else throw new RangeError("ECI assignment value out of range");
            return new rA(rA.Mode.ECI, 0, p)
          }
          static isNumeric(I) {
            return rA.NUMERIC_REGEX.test(I)
          }
          static isAlphanumeric(I) {
            return rA.ALPHANUMERIC_REGEX.test(I)
          }
          getData() {
            return this.bitData.slice()
          }
          static getTotalBits(I, p) {
            let q = 0;
            for (let R of I) {
              let d = R.mode.numCharCountBits(p);
              if (R.numChars >= 1 << d) return 1 / 0;
              q += 4 + d + R.bitData.length
            }
            return q
          }
          static toUtf8ByteArray(I) {
            I = encodeURI(I);
            let p = [];
            for (let q = 0; q < I.length; q++) I.charAt(q) != "%" ? p.push(I.charCodeAt(
              q)) : (p.push(parseInt(I.substring(q + 1, q + 3), 16)), q += 2);
            return p
          }
        };
        l.NUMERIC_REGEX = /^[0-9]*$/, l.ALPHANUMERIC_REGEX = /^[A-Z0-9 $%*+.\/:-]*$/, l
          .ALPHANUMERIC_CHARSET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:";
        let n = l;
        A.QrSegment = l
      })(Ec || (Ec = {}));
      (A => {
        let t;
        (a => {
          let c = class {
            constructor(l, n) {
              this.ordinal = l, this.formatBits = n
            }
          };
          c.LOW = new c(0, 1), c.MEDIUM = new c(1, 0), c.QUARTILE = new c(2, 3), c.HIGH =
            new c(3, 2);
          let u = c;
          a.Ecc = c
        })(t = A.QrCode || (A.QrCode = {}))
      })(Ec || (Ec = {}));
      (A => {
        let t;
        (a => {
          let c = class {
            constructor(l, n) {
              this.modeBits = l, this.numBitsCharCount = n
            }
            numCharCountBits(l) {
              return this.numBitsCharCount[Math.floor((l + 7) / 17)]
            }
          };
          c.NUMERIC = new c(1, [10, 12, 14]), c.ALPHANUMERIC = new c(2, [9, 11, 13]), c
            .BYTE = new c(4, [8, 16, 16]), c.KANJI = new c(8, [8, 10, 12]), c.ECI = new c(7,
              [0, 0, 0]);
          let u = c;
          a.Mode = c
        })(t = A.QrSegment || (A.QrSegment = {}))
      })(Ec || (Ec = {}));
      Hu = Ec;
      vH = {
          L: Hu.QrCode.Ecc.LOW,
          M: Hu.QrCode.Ecc.MEDIUM,
          Q: Hu.QrCode.Ecc.QUARTILE,
          H: Hu.QrCode.Ecc.HIGH
        }, rj = 128, dj = "L", jj = "#FFFFFF", bj = "#000000", Oj = !1, Vj = 1, CH = 4, MH = 0,
        FH = .1;
      $H = (function() {
        try {
          new Path2D().addPath(new Path2D)
        } catch {
          return !1
        }
        return !0
      })(), A0 = VA.default.forwardRef(function(t, a) {
        let c = t,
          {
            value: u,
            size: e = rj,
            level: l = dj,
            bgColor: n = jj,
            fgColor: r = bj,
            includeMargin: I = Oj,
            minVersion: p = Vj,
            boostLevel: q,
            marginSize: R,
            imageSettings: d
          } = c,
          N = Wq(c, ["value", "size", "level", "bgColor", "fgColor", "includeMargin",
            "minVersion", "boostLevel", "marginSize", "imageSettings"
          ]),
          {
            style: x
          } = N,
          O = Wq(N, ["style"]),
          j = d?.src,
          H = VA.default.useRef(null),
          E = VA.default.useRef(null),
          s = VA.default.useCallback(nA => {
            H.current = nA, typeof a == "function" ? a(nA) : a && (a.current = nA)
          }, [a]),
          [P, k] = VA.default.useState(!1),
          {
            margin: o,
            cells: T,
            numCells: y,
            calculatedImageSettings: G
          } = Sj({
            value: u,
            level: l,
            minVersion: p,
            boostLevel: q,
            includeMargin: I,
            marginSize: R,
            imageSettings: d,
            size: e
          });
        VA.default.useEffect(() => {
          if (H.current != null) {
            let nA = H.current,
              wA = nA.getContext("2d");
            if (!wA) return;
            let ht = T,
              Ra = E.current,
              ra = G != null && Ra !== null && Ra.complete && Ra.naturalHeight !== 0 &&
              Ra.naturalWidth !== 0;
            ra && G.excavation != null && (ht = Ej(T, G.excavation));
            let Te = window.devicePixelRatio || 1;
            nA.height = nA.width = e * Te;
            let me = e / y * Te;
            wA.scale(me, me), wA.fillStyle = n, wA.fillRect(0, 0, y, y), wA.fillStyle =
              r, $H ? wA.fill(new Path2D(Hj(ht, o))) : T.forEach(function(Q, IA) {
                Q.forEach(function(At, KA) {
                  At && wA.fillRect(KA + o, IA + o, 1, 1)
                })
              }), G && (wA.globalAlpha = G.opacity), ra && wA.drawImage(Ra, G.x + o, G
                .y + o, G.w, G.h)
          }
        }), VA.default.useEffect(() => {
          k(!1)
        }, [j]);
        let DA = kq({
            height: e,
            width: e
          }, x),
          J = null;
        return j != null && (J = VA.default.createElement("img", {
          src: j,
          key: j,
          style: {
            display: "none"
          },
          onLoad: () => {
            k(!0)
          },
          ref: E,
          crossOrigin: G?.crossOrigin
        })), VA.default.createElement(VA.default.Fragment, null, VA.default.createElement(
          "canvas", kq({
            style: DA,
            height: e,
            width: e,
            ref: s,
            role: "img"
          }, O)), J)
      });
      A0.displayName = "QRCodeCanvas";
      oe = VA.default.forwardRef(function(t, a) {
        let c = t,
          {
            value: u,
            size: e = rj,
            level: l = dj,
            bgColor: n = jj,
            fgColor: r = bj,
            includeMargin: I = Oj,
            minVersion: p = Vj,
            boostLevel: q,
            title: R,
            marginSize: d,
            imageSettings: S
          } = c,
          N = Wq(c, ["value", "size", "level", "bgColor", "fgColor", "includeMargin",
            "minVersion", "boostLevel", "title", "marginSize", "imageSettings"
          ]),
          {
            margin: x,
            cells: O,
            numCells: j,
            calculatedImageSettings: H
          } = Sj({
            value: u,
            level: l,
            minVersion: p,
            boostLevel: q,
            includeMargin: I,
            marginSize: d,
            imageSettings: S,
            size: e
          }),
          E = O,
          s = null;
        S != null && H != null && (H.excavation != null && (E = Ej(O, H.excavation)), s = VA
          .default.createElement("image", {
            href: S.src,
            height: H.h,
            width: H.w,
            x: H.x + x,
            y: H.y + x,
            preserveAspectRatio: "none",
            opacity: H.opacity,
            crossOrigin: H.crossOrigin
          }));
        let P = Hj(E, x);
        return VA.default.createElement("svg", kq({
            height: e,
            width: e,
            viewBox: `0 0 ${j} ${j}`,
            ref: a,
            role: "img"
          }, N), !!R && VA.default.createElement("title", null, R), VA.default
          .createElement("path", {
            fill: n,
            d: `M0,0 h${j}v${j}H0z`,
            shapeRendering: "crispEdges"
          }), VA.default.createElement("path", {
            fill: r,
            d: P,
            shapeRendering: "crispEdges"
          }), s)
      });
      oe.displayName = "QRCodeSVG"
    });
  var Nj, xj = z(() => {
    Nj = {
      src: "assets/images/image-01.jpg"
    }
  });
  var oj, sj = z(() => {
    oj = {
      src: "assets/images/image-02.jpg"
    }
  });
  var Uj, yj = z(() => {
    Uj = {
      src: "assets/images/image-03.jpg"
    }
  });
  var Pj, kj = z(() => {
    Pj = {
      src: "assets/images/image-04.jpg"
    }
  });
  var Wj, Tj = z(() => {
    Wj = {
      src: "assets/images/image-05.jpg"
    }
  });
  var mj, fj = z(() => {
    mj = {
      src: "assets/images/image-06.jpg"
    }
  });
  var zj, Kj = z(() => {
    zj = {
      src: "assets/images/image-07.jpg"
    }
  });
  var Gj, Xj = z(() => {
    Gj = {
      src: "assets/images/image-08.jpg"
    }
  });
  var Lj, Zj = z(() => {
    Lj = {
      src: "assets/images/image-09.jpg"
    }
  });
  var Dj, wj = z(() => {
    Dj = {
      src: "assets/images/image-10.jpg"
    }
  });
  var gj, Jj = z(() => {
    gj = {
      src: "assets/images/image-11.jpg"
    }
  });
  var Qj, Bj = z(() => {
    Qj = {
      src: "assets/images/image-12.jpg"
    }
  });
  var hj, vj = z(() => {
    hj = {
      src: "assets/images/image-13.jpg"
    }
  });
  var Cj, Mj = z(() => {
    Cj = {
      src: "assets/images/image-14.jpg"
    }
  });
  var Fj, Yj = z(() => {
    Fj = {
      src: "assets/images/image-15.jpg"
    }
  });
  var _j, $j = z(() => {
    _j = {
      src: "assets/images/image-16.jpg"
    }
  });
  var Ab, tb = z(() => {
    Ab = {
      src: "assets/images/image-17.jpg"
    }
  });
  var ab, cb = z(() => {
    ab = {
      src: "assets/images/image-18.jpg"
    }
  });
  var ub, eb = z(() => {
    ub = {
      src: "assets/images/image-19.jpg"
    }
  });
  var lb, ib = z(() => {
    lb = {
      src: "assets/images/image-20.jpg"
    }
  });
  var nb, Ib = z(() => {
    nb = {
      src: "assets/images/image-21.jpg"
    }
  });
  var qb, pb = z(() => {
    qb = {
      src: "assets/images/image-22.jpg"
    }
  });
  var Rb, rb = z(() => {
    Rb = {
      src: "assets/images/image-23.jpg"
    }
  });
  var db, jb = z(() => {
    db = {
      src: "assets/images/image-24.jpg"
    }
  });
  var bb, Ob = z(() => {
    bb = {
      src: "assets/images/image-25.jpg"
    }
  });
  var Vb, Hb = z(() => {
    Vb = {
      src: "assets/images/image-26.jpg"
    }
  });
  var Eb, Sb = z(() => {
    Eb = {
      src: "assets/images/image-27.jpg"
    }
  });
  var Nb, xb = z(() => {
    Nb = {
      src: "assets/images/image-28.jpg"
    }
  });
  var ob, sb = z(() => {
    ob = {
      src: "assets/images/image-29.jpg"
    }
  });
  var Ub, yb = z(() => {
    Ub = {
      src: "assets/images/image-30.jpg"
    }
  });
  var Pb, kb = z(() => {
    Pb = {
      src: "assets/images/image-31.jpg"
    }
  });
  var Wb, Tb = z(() => {
    Wb = {
      src: "assets/images/image-32.jpg"
    }
  });
  var mb, fb = z(() => {
    mb = {
      src: "assets/images/image-33.jpg"
    }
  });
  var zb, Kb = z(() => {
    zb = {
      src: "assets/images/image-34.jpg"
    }
  });
  var Nt, ha, NA, Gb, Xb, Lb, se = z(() => {
    xj();
    sj();
    yj();
    kj();
    Tj();
    fj();
    Kj();
    Xj();
    Zj();
    wj();
    Jj();
    Bj();
    vj();
    Mj();
    Yj();
    $j();
    tb();
    cb();
    eb();
    ib();
    Ib();
    pb();
    rb();
    jb();
    Ob();
    Hb();
    Sb();
    xb();
    sb();
    yb();
    kb();
    Tb();
    fb();
    Kb();
    Nt = [{
      id: "s1",
      name: "Oil Change",
      price: 850,
      duration: "45 min",
      category: "service",
      description: "Full synthetic or conventional oil change with filter replacement",
      image: bb.src
    }, {
      id: "s2",
      name: "Brake Inspection",
      price: 500,
      duration: "30 min",
      category: "service",
      description: "Complete brake system inspection including pads, rotors and brake lines",
      image: mb.src
    }, {
      id: "s3",
      name: "Brake Repair",
      price: 3500,
      duration: "90 min",
      category: "service",
      description: "Full brake repair including pad replacement and rotor resurfacing",
      image: Wb.src
    }, {
      id: "s4",
      name: "Tire Replacement",
      price: 4500,
      duration: "60 min",
      category: "service",
      description: "Remove and replace up to 4 tires including wheel balancing",
      image: Vb.src
    }, {
      id: "s5",
      name: "Tire Rotation",
      price: 400,
      duration: "20 min",
      category: "service",
      description: "Rotate all four tires to ensure even tread wear and longer tire life",
      image: Eb.src
    }, {
      id: "s6",
      name: "Battery Check",
      price: 350,
      duration: "15 min",
      category: "service",
      description: "Battery load test, terminal cleaning and charging system inspection",
      image: Nb.src
    }, {
      id: "s7",
      name: "Battery Replacement",
      price: 5500,
      duration: "30 min",
      category: "service",
      description: "Supply and fit a new OEM-spec 12V battery with 1-year warranty",
      image: ob.src
    }, {
      id: "s8",
      name: "Engine Check",
      price: 1e3,
      duration: "45 min",
      category: "service",
      description: "Full OBD-II engine diagnostic scan with printed condition report",
      image: zb.src
    }, {
      id: "s9",
      name: "Air Conditioning Service",
      price: 2500,
      duration: "90 min",
      category: "service",
      description: "AC system inspection, refrigerant recharge and leak detection",
      image: Pb.src
    }, {
      id: "s10",
      name: "General Vehicle Inspection",
      price: 1200,
      duration: "60 min",
      category: "service",
      description: "Comprehensive 50-point vehicle health check with full condition report",
      image: Ub.src
    }, {
  "id": "s11",
  "name": "Oil and Filter Service \u2014 Premium",
  "price": 1450,
  "duration": "45 min",
  "description": "Premium synthetic oil service with an oil filter replacement.",
  "category": "service",
  "serviceCategory": "Maintenance",
  "image": bb.src
}, {
  "id": "s12",
  "name": "Brake Fluid Replacement",
  "price": 950,
  "duration": "45 min",
  "description": "Drain and replace brake fluid and bleed the brake system.",
  "category": "service",
  "serviceCategory": "Brakes",
  "image": mb.src
}, {
  "id": "s13",
  "name": "Brake Pad Installation",
  "price": 1200,
  "duration": "60 min",
  "description": "Install replacement brake pads and inspect braking operation. Parts charged separately.",
  "category": "service",
  "serviceCategory": "Brakes",
  "image": Wb.src
}, {
  "id": "s14",
  "name": "Wheel Balancing",
  "price": 650,
  "duration": "40 min",
  "description": "Balance four wheels to help reduce vibration.",
  "category": "service",
  "serviceCategory": "Tires",
  "image": Vb.src
}, {
  "id": "s15",
  "name": "Tire Puncture Repair",
  "price": 250,
  "duration": "30 min",
  "description": "Inspect and repair an eligible tread puncture.",
  "category": "service",
  "serviceCategory": "Tires",
  "image": Eb.src
}, {
  "id": "s16",
  "name": "Battery Terminal Cleaning",
  "price": 250,
  "duration": "20 min",
  "description": "Clean terminals and inspect battery cable connections.",
  "category": "service",
  "serviceCategory": "Batteries",
  "image": Nb.src
}, {
  "id": "s17",
  "name": "Charging System Test",
  "price": 450,
  "duration": "30 min",
  "description": "Check battery voltage and alternator charging performance.",
  "category": "service",
  "serviceCategory": "Batteries",
  "image": ob.src
}, {
  "id": "s18",
  "name": "Check Engine Light Scan",
  "price": 650,
  "duration": "30 min",
  "description": "Read stored diagnostic codes and explain scan results.",
  "category": "service",
  "serviceCategory": "Diagnostics",
  "image": zb.src
}, {
  "id": "s19",
  "name": "AC Performance Check",
  "price": 750,
  "duration": "40 min",
  "description": "Check vent temperature and inspect air conditioning operation.",
  "category": "service",
  "serviceCategory": "Air Conditioning",
  "image": Pb.src
}, {
  "id": "s20",
  "name": "Pre-Trip Safety Inspection",
  "price": 900,
  "duration": "45 min",
  "description": "Inspect tires, lights, fluids and visible safety components before a trip.",
  "category": "service",
  "serviceCategory": "Diagnostics",
  "image": Ub.src
}], ha = [{
      id: "all",
      label: "All Parts"
    }, {
      id: "engine",
      label: "Engine"
    }, {
      id: "brakes",
      label: "Brakes"
    }, {
      id: "tires",
      label: "Tires"
    }, {
      id: "batteries",
      label: "Batteries"
    }, {
      id: "filters",
      label: "Filters"
    }, {
      id: "lights",
      label: "Lights"
    }, {
      id: "suspension",
      label: "Suspension"
    }, {
      id: "fluids",
      label: "Fluids"
    }, {
      id: "accessories",
      label: "Accessories"
    }], NA = [{
      id: "p1",
      name: "Engine Oil 5W-30",
      price: 850,
      duration: "",
      category: "part",
      partCategory: "fluids",
      stock: 48,
      description: "Full synthetic motor oil, 4-liter jug",
      image: qb.src
    }, {
      id: "p2",
      name: "Oil Filter",
      price: 320,
      duration: "",
      category: "part",
      partCategory: "filters",
      stock: 62,
      description: "OEM-grade spin-on oil filter",
      image: Dj.src
    }, {
      id: "p3",
      name: "Air Filter",
      price: 650,
      duration: "",
      category: "part",
      partCategory: "filters",
      stock: 35,
      description: "High-flow engine air filter",
      image: gj.src
    }, {
      id: "p4",
      name: "Fuel Filter",
      price: 480,
      duration: "",
      category: "part",
      partCategory: "filters",
      stock: 28,
      description: "In-line fuel filter, OEM replacement",
      image: Qj.src
    }, {
      id: "p5",
      name: "Spark Plugs \xD74",
      price: 1200,
      duration: "",
      category: "part",
      partCategory: "engine",
      stock: 20,
      description: "Iridium tip spark plugs, set of 4",
      image: Nj.src
    }, {
      id: "p6",
      name: "Brake Pads \u2014 Front",
      price: 2200,
      duration: "",
      category: "part",
      partCategory: "brakes",
      stock: 18,
      description: "Ceramic front brake pad set",
      image: Pj.src
    }, {
      id: "p7",
      name: "Brake Pads \u2014 Rear",
      price: 1900,
      duration: "",
      category: "part",
      partCategory: "brakes",
      stock: 15,
      description: "Ceramic rear brake pad set",
      image: Wj.src
    }, {
      id: "p8",
      name: "Brake Discs / Rotors",
      price: 3800,
      duration: "",
      category: "part",
      partCategory: "brakes",
      stock: 10,
      description: "Slotted and drilled rotors, per axle",
      image: mj.src
    }, {
      id: "p9",
      name: "Brake Fluid DOT 4",
      price: 380,
      duration: "",
      category: "part",
      partCategory: "brakes",
      stock: 40,
      description: "500 ml DOT 4 high-performance brake fluid",
      image: zj.src
    }, {
      id: "p10",
      name: "Car Battery 12V 60Ah",
      price: 4500,
      duration: "",
      category: "part",
      partCategory: "batteries",
      stock: 12,
      description: "MF battery, 1-year warranty included",
      image: Lj.src
    }, {
      id: "p11",
      name: "Tire \u2014 All-Season",
      price: 3200,
      duration: "",
      category: "part",
      partCategory: "tires",
      stock: 24,
      description: "All-season radial tire, standard fitment (per piece)",
      image: Gj.src
    }, {
      id: "p12",
      name: "Wiper Blades \u2014 Pair",
      price: 650,
      duration: "",
      category: "part",
      partCategory: "accessories",
      stock: 30,
      description: "Beam-style wiper blade set for front windscreen",
      image: lb.src
    }, {
      id: "p13",
      name: "Coolant / Antifreeze",
      price: 420,
      duration: "",
      category: "part",
      partCategory: "fluids",
      stock: 55,
      description: "1-liter concentrated coolant, mix 50/50 with water",
      image: ub.src
    }, {
      id: "p14",
      name: "Transmission Fluid ATF",
      price: 750,
      duration: "",
      category: "part",
      partCategory: "fluids",
      stock: 32,
      description: "Automatic transmission fluid, 1-liter bottle",
      image: nb.src
    }, {
      id: "p15",
      name: "Serpentine Drive Belt",
      price: 1100,
      duration: "",
      category: "part",
      partCategory: "engine",
      stock: 14,
      description: "OEM-spec multi-rib drive belt",
      image: oj.src
    }, {
      id: "p16",
      name: "Timing Belt Kit",
      price: 4200,
      duration: "",
      category: "part",
      partCategory: "engine",
      stock: 8,
      description: "Timing belt kit with tensioner and idler pulleys",
      image: Uj.src
    }, {
      id: "p17",
      name: "Shock Absorbers \u2014 Pair",
      price: 5500,
      duration: "",
      category: "part",
      partCategory: "suspension",
      stock: 10,
      description: "Gas-filled shock absorber pair (front or rear)",
      image: Cj.src
    }, {
      id: "p18",
      name: "Suspension Bushings Set",
      price: 1800,
      duration: "",
      category: "part",
      partCategory: "suspension",
      stock: 16,
      description: "Polyurethane control arm bushing set",
      image: ab.src
    }, {
      id: "p19",
      name: "Wheel Bearing Assembly",
      price: 2400,
      duration: "",
      category: "part",
      partCategory: "suspension",
      stock: 12,
      description: "Hub bearing assembly, per wheel",
      image: Ab.src
    }, {
      id: "p20",
      name: "Headlight Bulbs \u2014 Pair",
      price: 580,
      duration: "",
      category: "part",
      partCategory: "lights",
      stock: 38,
      description: "H4 halogen bulb pair or LED equivalent",
      image: _j.src
    }, {
      id: "p21",
      name: "Fuses Assortment Box",
      price: 150,
      duration: "",
      category: "part",
      partCategory: "lights",
      stock: 50,
      description: "Blade fuse assortment, 100-piece box",
      image: Rb.src
    }, {
      id: "p22",
      name: "Cabin Air Filter",
      price: 550,
      duration: "",
      category: "part",
      partCategory: "filters",
      stock: 40,
      description: "Cabin pollen and dust filter replacement",
      image: hj.src
    }, {
      id: "p23",
      name: "Power Steering Fluid",
      price: 320,
      duration: "",
      category: "part",
      partCategory: "fluids",
      stock: 44,
      description: "500 ml power steering fluid, universal type",
      image: db.src
    }, {
      id: "p24",
      name: "LED Turn Signal Bulbs \xD72",
      price: 480,
      duration: "",
      category: "part",
      partCategory: "lights",
      stock: 25,
      description: "Bright LED turn signal replacement pair",
      image: Fj.src
    }, {
  "id": "p25",
  "name": "Engine Oil 10W-40 \u2014 4 L",
  "price": 780,
  "duration": "",
  "description": "Conventional motor oil; confirm required viscosity before purchase.",
  "category": "part",
  "partCategory": "fluids",
  "stock": 30,
  "image": qb.src
}, {
  "id": "p26",
  "name": "Oil Filter \u2014 Compact Car",
  "price": 280,
  "duration": "",
  "description": "Replacement spin-on oil filter; confirm thread and vehicle fitment.",
  "category": "part",
  "partCategory": "filters",
  "stock": 42,
  "image": Dj.src
}, {
  "id": "p27",
  "name": "Engine Air Filter \u2014 Compact Car",
  "price": 520,
  "duration": "",
  "description": "Replacement engine air filter; confirm housing dimensions.",
  "category": "part",
  "partCategory": "filters",
  "stock": 26,
  "image": gj.src
}, {
  "id": "p28",
  "name": "Fuel Filter \u2014 Diesel",
  "price": 650,
  "duration": "",
  "description": "Replacement diesel fuel filter; confirm vehicle compatibility.",
  "category": "part",
  "partCategory": "filters",
  "stock": 20,
  "image": Qj.src
}, {
  "id": "p29",
  "name": "Spark Plugs \u2014 Standard Set of 4",
  "price": 680,
  "duration": "",
  "description": "Standard replacement spark plug set; confirm heat range and thread.",
  "category": "part",
  "partCategory": "engine",
  "stock": 32,
  "image": Nj.src
}, {
  "id": "p30",
  "name": "Brake Pads \u2014 Front Economy",
  "price": 1650,
  "duration": "",
  "description": "Front replacement brake pad set; confirm vehicle fitment.",
  "category": "part",
  "partCategory": "brakes",
  "stock": 22,
  "image": Pj.src
}, {
  "id": "p31",
  "name": "Brake Pads \u2014 Rear Premium",
  "price": 2450,
  "duration": "",
  "description": "Premium rear pad set; confirm vehicle fitment.",
  "category": "part",
  "partCategory": "brakes",
  "stock": 16,
  "image": Wj.src
}, {
  "id": "p32",
  "name": "Brake Rotor \u2014 Single",
  "price": 1950,
  "duration": "",
  "description": "Single replacement brake rotor; confirm diameter and bolt pattern.",
  "category": "part",
  "partCategory": "brakes",
  "stock": 14,
  "image": mj.src
}, {
  "id": "p33",
  "name": "Brake Fluid DOT 4 \u2014 1 L",
  "price": 650,
  "duration": "",
  "description": "One-liter DOT 4 brake fluid; use only where specified by the vehicle.",
  "category": "part",
  "partCategory": "brakes",
  "stock": 35,
  "image": zj.src
}, {
  "id": "p34",
  "name": "Car Battery 12V 45Ah",
  "price": 3800,
  "duration": "",
  "description": "Maintenance-free battery; confirm dimensions and terminal position.",
  "category": "part",
  "partCategory": "batteries",
  "stock": 15,
  "image": Lj.src
}, {
  "id": "p35",
  "name": "Touring Tire \u2014 Standard",
  "price": 3600,
  "duration": "",
  "description": "Touring radial tire, per piece; confirm size and load rating.",
  "category": "part",
  "partCategory": "tires",
  "stock": 24,
  "image": Gj.src
}, {
  "id": "p36",
  "name": "Wiper Blades \u2014 Compact Pair",
  "price": 480,
  "duration": "",
  "description": "Replacement front wiper pair; confirm blade lengths and connector.",
  "category": "part",
  "partCategory": "accessories",
  "stock": 38,
  "image": lb.src
}], Gb = ["Acura", "Audi", "BMW", "Chevrolet", "Dodge", "Ford", "Honda", "Hyundai",
      "Jeep", "Kia", "Lexus", "Mazda", "Mercedes-Benz", "Mitsubishi", "Nissan", "Subaru",
      "Suzuki", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other"
    ], Xb = ["Black", "White", "Silver", "Gray", "Red", "Blue", "Green", "Yellow", "Orange",
      "Brown", "Other"
    ], Lb = [{
      ticketNumber: "SVC-2026-0041",
      carInfo: {
        ownerName: "James Kowalski",
        phone: "555-0192",
        email: "j.kowalski@email.com",
        make: "Toyota",
        model: "Camry",
        year: "2019",
        plate: "XRT-4821",
        color: "Silver",
        mileage: "62,400",
        vin: "4T1BF1FK5KU294710"
      },
      services: [Nt[0], Nt[1]],
      parts: [],
      status: "in-progress",
      createdAt: new Date(Date.now() - 36e5).toISOString(),
      notes: "Customer mentioned squeaking noise on braking.",
      estimatedTotal: 1350,
      paymentMethod: "cash",
      mode: "service"
    }, {
      ticketNumber: "SVC-2026-0040",
      carInfo: {
        ownerName: "Priya Nair",
        phone: "555-0274",
        email: "priya.n@email.com",
        make: "Honda",
        model: "Civic",
        year: "2021",
        plate: "LMK-7733",
        color: "Blue",
        mileage: "28,100",
        vin: "2HGFC2F69MH573201"
      },
      services: [Nt[9]],
      parts: [],
      status: "pending",
      createdAt: new Date(Date.now() - 18e5).toISOString(),
      notes: "",
      estimatedTotal: 1200,
      paymentMethod: "kiosk",
      mode: "service"
    }, {
      ticketNumber: "PRT-2026-0039",
      carInfo: {
        ownerName: "Carlos Reyes",
        phone: "555-0318",
        email: "c.reyes@email.com",
        make: "Ford",
        model: "Ranger",
        year: "2020",
        plate: "BCG-2251",
        color: "Black",
        mileage: "45,200",
        vin: ""
      },
      services: [],
      parts: [{
        ...NA[5],
        qty: 1
      }, {
        ...NA[8],
        qty: 2
      }],
      status: "ready",
      createdAt: new Date(Date.now() - 72e5).toISOString(),
      notes: "Parts ready at the counter.",
      estimatedTotal: 2960,
      paymentMethod: "cash",
      mode: "parts"
    }]
  });
  var Db = xt(Ei => {
    "use strict";
    var t0 = Symbol.for("react.transitional.element"),
      a0 = Symbol.for("react.fragment");

    function Zb(A, t, a) {
      var c = null;
      if (a !== void 0 && (c = "" + a), t.key !== void 0 && (c = "" + t.key), "key" in t) {
        a = {};
        for (var u in t) u !== "key" && (a[u] = t[u])
      } else a = t;
      return t = a.ref, {
        $$typeof: t0,
        type: A,
        key: c,
        ref: t !== void 0 ? t : null,
        props: a
      }
    }
    Ei.Fragment = a0;
    Ei.jsx = Zb;
    Ei.jsxs = Zb
  });
  var Wt = xt((uE, wb) => {
    "use strict";
    wb.exports = Db()
  });

  function c0(A) {
    return `${A==="parts"?"PRT":"SVC"}-${new Date().getFullYear()}-${String(Math.floor(Math.random()*9e3)+1e3)}`
  }

  function mq({
    onNewTicket: A,
    inventory: t,
    initialMode: a,
    onViewOrders: c,
    onExit: exitKiosk
  }) {
    let [u, e] = (0, f.useState)(a === "parts" ? "parts-browse" : "service-list"), [l, n] = (0, f
      .useState)(a ?? "service"), [r, I] = (0, f.useState)(gb), [p, q] = (0, f.useState)(null), [
      R, d
    ] = (0, f.useState)(null), [S, N] = (0, f.useState)([]), [x, O] = (0, f.useState)(null), [j,
      H] = (0, f.useState)(null), [E, s] = (0, f.useState)(!1), [P, k] = (0, f.useState)(!1), o =
      S.reduce((Q, IA) => Q + IA.item.price * IA.qty, 0), T = S.reduce((Q, IA) => Q + IA.qty, 0),
      y = S.length * 500, G = o + (P ? y : 0), DA = l === "service" ? o : G, J =
      Q => {
        N(IA => IA.find(KA => KA.item.id === Q.id) ? IA.map(KA => KA.item.id === Q.id ? {
          ...KA,
          qty: KA.qty + 1
        } : KA) : [...IA, {
          item: Q,
          qty: 1
        }])
      }, nA = (Q, IA) => {
        N(At => At.find(vt => vt.item.id === Q.id) ? At.map(vt => vt.item.id === Q.id ? {
          ...vt,
          qty: vt.qty + IA
        } : vt) : [...At, {
          item: Q,
          qty: IA
        }])
      }, wA = Q => N(IA => IA.filter(At => At.item.id !== Q)), ht = (Q, IA) => {
        if (IA <= 0) return wA(Q);
        N(At => At.map(KA => KA.item.id === Q ? {
          ...KA,
          qty: IA
        } : KA))
      }, Ra = Q => {
        let IA = S.map(vt => ({
            ...vt.item,
            qty: vt.qty
          })),
          At = P && l === "parts" ? {
            id: "install",
            name: "Parts Installation & Fitting",
            price: y,
            duration: "varies",
            category: "service",
            description: `Labor for installing ${S.length} part type${S.length!==1?"s":""}`
          } : null,
          KA = {
            ticketNumber: c0(l),
            carInfo: r,
            services: l === "service" ? IA.map(service => ({ ...service, price: service.price * service.qty })) : At ? [At] : [],
            parts: l === "parts" ? IA : [],
            status: "pending",
            createdAt: new Date().toISOString(),
            notes: P && l === "parts" ? "Customer requested parts installation." : "",
            estimatedTotal: DA,
            paymentMethod: Q,
            mode: l ?? "service"
          };
        H(KA), A(KA), e("ticket")
      }, ra = () => {
        let Q = a ?? "service";
        e(Q === "parts" ? "parts-browse" : "service-list"), n(Q), I(gb), q(null), d(null), N([]),
          O(null), H(null), k(!1)
      }, Te = !!(r.make && r.model && r.year && r.plate), me = () => {
        e("service-confirm")
      };
    return (0, i.jsxs)("div", {
      className: "h-full min-h-0 bg-[#0a0a0a] flex flex-col relative overflow-hidden storefront-theme",
      children: [(0, i.jsx)("div", {
        className: "pointer-events-none fixed inset-0 z-0",
        style: {
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,85,0,0.012) 2px, rgba(255,85,0,0.012) 4px)"
        }
      }), u !== "ticket" && (0, i.jsxs)("header", {
        className: "relative z-50 border-b border-[#2e2e2e] bg-[#0a0a0a] px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-shrink-0",
        children: [(0, i.jsxs)("div", {
          className: "flex items-center gap-2 sm:gap-4 min-w-0",
          children: [(0, i.jsx)("button", {
            onClick: exitKiosk,
            className: "font-mono text-[#cc0000] text-lg font-bold tracking-widest hover:text-[#e00000] transition-colors",
            children: "G SPOT"
          }), (0, i.jsx)("span", {
            className: "text-[#2e2e2e]",
            children: "|"
          }), (0, i.jsx)("span", {
            className: "font-mono text-[#555555] text-[10px] sm:text-xs tracking-widest truncate",
            children: l === "service" ? "AUTOMOTIVE SERVICES" : "BUY PARTS"
          })]
        }), (0, i.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [c && (0, i.jsx)("button", {
            onClick: c,
            className: "hidden sm:inline-flex font-mono text-xs tracking-widest px-3 sm:px-4 py-2 border border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white transition-colors",
            children: "MY ORDERS"
          }), T > 0 && u !== "cart" && (0, i.jsxs)("div", {
            className: "relative group",
            children: [(0, i.jsxs)("button", {
              onClick: () => e("cart"),
              className: "font-mono text-xs tracking-widest px-3 sm:px-4 py-2.5 bg-[#cc0000] text-white flex items-center gap-2 hover:bg-[#e00000] transition-colors",
              children: [(0, i.jsx)(fq, {}), (0, i.jsxs)("span", {
                className: "hidden sm:inline",
                children: ["CART (", T, ")"]
              }), (0, i.jsxs)("span", {
                className: "sm:border-l border-[#ffffff30] sm:pl-2",
                children: ["\u20B1", o.toLocaleString()]
              })]
            }), (0, i.jsxs)("div", {
              className: "hidden md:group-hover:block md:group-focus-within:block absolute right-0 top-full pt-3 w-[390px] z-50",
              children: [(0, i.jsx)("div", {
                className: "absolute right-8 top-1.5 w-4 h-4 rotate-45 bg-white border-l border-t border-[#dddddd]"
              }), (0, i.jsxs)("div", {
                className: "relative bg-white border border-[#dddddd] shadow-2xl text-[#171717]",
                children: [(0, i.jsx)("p", {
                  className: "px-4 pt-4 pb-3 font-sans text-xs text-[#999999]",
                  children: "Recently Added Products"
                }), (0, i.jsx)("div", {
                  children: S.slice(-5).reverse().map(({
                    item: Q,
                    qty: IA
                  }) => (0, i.jsxs)("div", {
                    className: "px-4 py-2.5 flex items-center gap-3 hover:bg-[#fafafa]",
                    children: [(0, i.jsx)("div", {
                      className: "w-12 h-12 bg-white border border-[#eeeeee] flex-shrink-0",
                      children: Q.image ? (0,
                        i.jsx)("img", {
                        src: Q.image,
                        alt: "",
                        className: "w-full h-full object-contain p-1"
                      }) : (0, i.jsx)(Su, {
                        category: Q
                          .partCategory ??
                          "",
                        color: "#cc0000",
                        size: 22
                      })
                    }), (0, i.jsxs)("div", {
                      className: "min-w-0 flex-1",
                      children: [(0, i.jsx)(
                        "p", {
                          className: "font-sans text-sm truncate",
                          children: Q.name
                        }), (0, i.jsxs)(
                        "p", {
                          className: "font-sans text-[10px] text-[#999999] mt-1",
                          children: [
                            "Qty: ", IA
                          ]
                        })]
                    }), (0, i.jsxs)("p", {
                      className: "font-sans text-sm text-[#ee2d24] whitespace-nowrap",
                      children: ["\u20B1", (Q
                          .price * IA)
                        .toLocaleString()
                      ]
                    })]
                  }, `preview-${Q.id}`))
                }), (0, i.jsxs)("div", {
                  className: "px-4 py-3.5 mt-2 bg-[#fafafa] flex items-center justify-between gap-4",
                  children: [(0, i.jsx)("span", {
                    className: "font-sans text-xs text-[#666666]",
                    children: S.length > 5 ?
                      `${S.length-5} more product${S.length-5!==1?"s":""}` : `${T} item${T!==1?"s":""} in cart`
                  }), (0, i.jsx)("button", {
                    onClick: () => e("cart"),
                    className: "bg-[#ee2d24] text-white px-5 py-2.5 font-sans text-xs font-bold hover:bg-[#cc0000]",
                    children: "View My Shopping Cart"
                  })]
                })]
              })]
            })]
          }), (0, i.jsx)("button", {
            onClick: () => s(!0),
            className: "font-mono text-xs tracking-widest px-3 sm:px-4 py-2 border border-[#e8e8e8] text-[#e8e8e8] hover:bg-[#e8e8e8] hover:text-[#0a0a0a] transition-colors",
            children: "HELP"
          })]
        })]
      }), (0, i.jsxs)("main", {
        className: "relative z-0 flex-1 overflow-y-auto",
        children: [u === "service-list" && (0, i.jsx)(u0, {
          services: Nt,
          selected: S.length ? { name: `${T} services in cart`, price: o } : null,
          onSelect: service => { q(service); J(service); },
          onBack: exitKiosk,
          onNext: () => e("cart")
        }), u === "vehicle-info" && (0, i.jsx)(e0, {
          title: "YOUR DETAILS",
          subtitle: "Enter your information and vehicle details",
          carInfo: r,
          onChange: I,
          onBack: () => e("cart"),
          onNext: () => e("payment"),
          valid: Te
        }), u === "service-confirm" && p && (0, i.jsx)(l0, {
          service: p,
          carInfo: r,
          onModify: () => e("service-list"),
          onBack: () => e("vehicle-info"),
          onConfirm: () => e("payment"),
          onCancel: ra
        }), u === "parts-browse" && (0, i.jsx)(n0, {
          parts: NA,
          inventory: t,
          cart: S,
          onAddToCart: J,
          onBack: exitKiosk,
          onViewCart: () => e("cart"),
          cartCount: T,
          cartTotal: o,
          onViewPart: Q => {
            d(Q), e("part-detail")
          }
        }), u === "part-detail" && R && (0, i.jsx)(I0, {
          part: R,
          stock: t[R.id] ?? 0,
          cartQty: S.find(Q => Q.item.id === R.id)?.qty ?? 0,
          onAddToCart: nA,
          onBack: () => e("parts-browse"),
          onViewCart: () => e("cart")
        }), u === "cart" && (0, i.jsx)(q0, {
          cart: S,
          onUpdateQty: ht,
          onRemove: wA,
          onBack: () => e(l === "service" ? "service-list" : "parts-browse"),
          mode: l,
          onCheckout: () => { if (S.length) e(l === "service" ? "vehicle-info" : "parts-checkout"); }
        }), u === "parts-checkout" && (0, i.jsx)(Jb, {
          cart: S,
          onBack: () => e("cart"),
          onPay: Ra
        }), u === "payment" && S.length > 0 && (0, i.jsx)(Jb, {
          cart: S,
          serviceInfo: r,
          onContactChange: I,
          onBack: () => e("vehicle-info"),
          onPay: Ra
        }), u === "ticket" && j && (0, i.jsx)(R0, {
          ticket: j,
          onDone: ra
        })]
      }), E && (0, i.jsx)(b0, {
        onClose: () => s(!1)
      })]
    })
  }

  function u0({
    services: A,
    selected: t,
    onSelect: a,
    onBack: c,
    onNext: u
  }) {
    let [e, l] = (0, f.useState)(""), [n, r] = (0, f.useState)("All Services"), I = [
      "All Services", "Maintenance", "Brakes", "Tires", "Batteries", "Diagnostics",
      "Air Conditioning"
    ], p = R => ({
      s1: "Maintenance",
      s2: "Brakes",
      s3: "Brakes",
      s4: "Tires",
      s5: "Tires",
      s6: "Batteries",
      s7: "Batteries",
      s8: "Diagnostics",
      s9: "Air Conditioning",
      s10: "Diagnostics"
    })[R] ?? "Maintenance", q = A.filter(R => (n === "All Services" || (R.serviceCategory ?? p(R.id)) === n) &&
      `${R.name} ${R.description}`.toLowerCase().includes(e.trim().toLowerCase()));
    return (0, i.jsxs)("div", {
      className: "h-full flex flex-col",
      children: [(0, i.jsxs)("div", {
        className: "border-b border-[#dedede] bg-[#f4f4f4] px-3 sm:px-6 pt-3 sm:pt-5 flex-shrink-0",
        children: [(0, i.jsxs)("div", {
          className: "relative mb-4",
          children: [(0, i.jsxs)("svg", {
            className: "absolute left-4 top-1/2 -translate-y-1/2 text-[#555555]",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            children: [(0, i.jsx)("circle", {
              cx: "10",
              cy: "10",
              r: "7"
            }), (0, i.jsx)("path", {
              d: "m15 15 6 6"
            })]
          }), (0, i.jsx)("input", {
            "aria-label": "Search services",
            value: e,
            onChange: R => l(R.target.value),
            placeholder: "Search services by name or description\u2026",
            className: "w-full bg-white border border-[#cfcfcf] text-[#171717] font-sans pl-10 pr-12 py-3 focus:outline-none focus:border-[#cc0000] text-sm"
          }), e && (0, i.jsx)("button", {
            "aria-label": "Clear service search",
            onClick: () => l(""),
            className: "absolute right-4 top-1/2 -translate-y-1/2 text-[#555555]",
            children: "\u2715"
          })]
        }), (0, i.jsx)("div", {
          className: "flex gap-1 overflow-x-auto -mx-1 px-1",
          style: {
            scrollbarWidth: "none"
          },
          children: I.map(R => (0, i.jsx)("button", {
            onClick: () => r(R),
            "aria-pressed": n === R,
            className: `flex-shrink-0 font-mono text-xs tracking-widest px-3 py-2.5 border-b-2 whitespace-nowrap transition-colors ${n===R?"border-[#cc0000] text-[#cc0000]":"border-transparent text-[#555555] hover:text-[#cc0000]"}`,
            children: R.toUpperCase()
          }, R))
        })]
      }), (0, i.jsx)("div", {
        className: "flex-1 overflow-y-auto min-h-0 px-3 sm:px-6 py-4 sm:py-5",
        children: q.length ? (0, i.jsx)("div", {
          className: "grid grid-cols-1 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4",
          children: q.map(R => {
            let d = t?.id === R.id;
            return (0, i.jsxs)("article", {
              "data-service-card": R.id,
              className: `border bg-white flex flex-col overflow-hidden transition-colors ${d?"border-[#cc0000] ring-1 ring-[#cc0000]":"border-[#dedede] hover:border-[#bcbcbc]"}`,
              children: [(0, i.jsxs)("button", {
                onClick: () => a(R),
                "aria-label": `Select ${R.name}`,
                "aria-pressed": d,
                className: "h-36 w-full relative overflow-hidden bg-white",
                children: [R.image && (0, i.jsx)("img", {
                  src: R.image,
                  alt: R.name,
                  className: "h-full w-full object-cover hover:scale-105 transition-transform"
                }), (0, i.jsx)("div", {
                  className: "absolute top-0 left-0 w-full h-0.5 bg-[#cc0000]"
                }), (0, i.jsx)("span", {
                  className: "absolute top-2 right-2 font-mono text-[10px] px-2 py-1 bg-white text-[#555555] border border-[#dedede]",
                  children: (R.serviceCategory ?? p(R.id)).toUpperCase()
                }), d && (0, i.jsx)("span", {
                  className: "absolute bottom-2 left-2 bg-[#cc0000] text-white px-2 py-1 font-mono text-[10px]",
                  children: "\u2713 SELECTED"
                })]
              }), (0, i.jsxs)("div", {
                className: "p-3 flex flex-col flex-1",
                children: [(0, i.jsx)("h3", {
                  className: "font-sans font-semibold text-sm leading-tight mb-1 text-[#171717]",
                  children: R.name
                }), (0, i.jsx)("p", {
                  className: "font-sans text-[#555555] text-xs leading-snug mb-3 flex-1",
                  children: R.description
                }), (0, i.jsxs)("div", {
                  className: "flex items-center justify-between gap-2 mb-3",
                  children: [(0, i.jsxs)("span", {
                    className: "font-mono text-[#cc0000] font-bold text-base",
                    children: ["\u20B1", R.price
                      .toLocaleString()
                    ]
                  }), (0, i.jsxs)("span", {
                    className: "font-mono text-[10px] text-[#555555]",
                    children: ["EST. ", R.duration]
                  })]
                }), (0, i.jsx)("button", {
                  onClick: () => a(R),
                  "aria-pressed": d,
                  className: `w-full py-2 font-mono text-xs tracking-widest font-bold border transition-colors ${d?"bg-[#cc0000] border-[#cc0000] text-white":"border-[#c8c8c8] text-[#555555] hover:border-[#cc0000] hover:text-[#cc0000] hover:bg-[#fff3f3]"}`,
                  children: d ?
                    "\u2713 SERVICE SELECTED" : "+ ADD TO CART"
                })]
              })]
            }, R.id)
          })
        }) : (0, i.jsxs)("div", {
          className: "flex flex-col items-center justify-center h-64 text-center",
          children: [(0, i.jsx)("p", {
            className: "font-mono text-sm text-[#555555]",
            children: "NO SERVICES FOUND"
          }), (0, i.jsx)("button", {
            onClick: () => {
              l(""), r("All Services")
            },
            className: "mt-3 font-mono text-xs text-[#cc0000]",
            children: "CLEAR FILTERS"
          })]
        })
      }), (0, i.jsxs)("div", {
        className: "border-t border-[#dedede] bg-[#f4f4f4] py-3 sm:py-4 px-3 sm:px-6 flex flex-wrap items-center justify-between gap-2 flex-shrink-0",
        children: [(0, i.jsx)("button", {
          onClick: c,
          className: "font-mono text-[#555555] text-xs tracking-widest px-3 sm:px-6 py-3 border border-[#c8c8c8] hover:border-[#cc0000]",
          children: "\u2190 BACK"
        }), (0, i.jsx)("span", {
          className: "hidden sm:inline font-mono text-xs text-[#555555]",
          children: t ?
            `${t.name} \xB7 \u20B1${t.price.toLocaleString()}` : `${q.length} services shown`
        }), (0, i.jsx)("button", {
          onClick: u,
          disabled: !t,
          className: "font-mono font-bold text-xs sm:text-base tracking-widest px-3 sm:px-8 py-3 bg-[#cc0000] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e00000] transition-colors",
          children: "VIEW SERVICE CART \u2192"
        })]
      })]
    })
  }

  function e0({
    title: A,
    subtitle: t,
    carInfo: a,
    onChange: c,
    onBack: u,
    onNext: e,
    valid: l
  }) {
    let n = r => I => c({
      ...a,
      [r]: I.target.value
    });
    return (0, i.jsxs)("div", {
      className: "max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-10",
      children: [(0, i.jsx)(hb, {
        title: A,
        sub: t
      }), (0, i.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-4",
        children: [(0, i.jsx)("div", {
          className: "md:col-span-2 mt-2 border-t border-[#1e1e1e] pt-5",
          children: (0, i.jsx)("p", {
            className: "font-mono text-[#555555] text-xs tracking-widest mb-4",
            children: "VEHICLE DETAILS"
          })
        }), (0, i.jsxs)("div", {
          className: "md:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4",
          children: [(0, i.jsx)(Bb, {
            label: "VEHICLE BRAND *",
            value: a.make,
            onChange: n("make"),
            options: Gb
          }), (0, i.jsx)(Ue, {
            label: "MODEL *",
            value: a.model,
            onChange: n("model"),
            placeholder: "Vios"
          }), (0, i.jsx)(Ue, {
            label: "YEAR *",
            value: a.year,
            onChange: n("year"),
            placeholder: "2022",
            maxLength: 4
          })]
        }), (0, i.jsx)(Bb, {
          label: "COLOR",
          value: a.color,
          onChange: n("color"),
          options: Xb
        }), (0, i.jsx)(Ue, {
          label: "PLATE NUMBER *",
          value: a.plate,
          onChange: n("plate"),
          placeholder: "AAA 1234"
        }), (0, i.jsx)(Ue, {
          label: "VEHICLE TYPE / BODY",
          value: a.mileage,
          onChange: n("mileage"),
          placeholder: "Sedan / SUV / Pickup"
        }), (0, i.jsx)(Ue, {
          label: "VIN (OPTIONAL)",
          value: a.vin,
          onChange: n("vin"),
          placeholder: "17-character VIN"
        })]
      }), (0, i.jsxs)("div", {
        className: "flex justify-between gap-2 mt-8",
        children: [(0, i.jsx)("button", {
          onClick: u,
          className: "font-mono text-[#555555] text-xs sm:text-base tracking-widest px-3 sm:px-6 py-3 sm:py-4 border border-[#2e2e2e] hover:border-[#444444] transition-colors",
          children: "\u2190 BACK"
        }), (0, i.jsx)("button", {
          onClick: e,
          disabled: !l,
          className: "font-mono font-bold text-xs sm:text-base tracking-widest px-4 sm:px-10 py-3 sm:py-4 bg-[#cc0000] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e00000] active:scale-[0.98] transition-all",
          children: "NEXT: CONFIRM \u2192"
        })]
      })]
    })
  }

  function l0({
    service: A,
    carInfo: t,
    onModify: a,
    onBack: c,
    onConfirm: u,
    onCancel: e
  }) {
    return (0, i.jsxs)("div", {
      className: "max-w-xl mx-auto px-4 sm:px-6 py-6 sm:py-10",
      children: [(0, i.jsx)(hb, {
        title: "CONFIRM SERVICE",
        sub: "Review your booking before proceeding to payment"
      }), (0, i.jsxs)("div", {
        className: "border-2 border-[#cc0000] bg-[#120600] p-6 mb-4",
        children: [(0, i.jsx)("p", {
          className: "font-mono text-[#cc0000] text-xs tracking-widest mb-3",
          children: "SELECTED SERVICE"
        }), (0, i.jsx)("h3", {
          className: "font-sans text-2xl font-bold text-[#f0f0f0] mb-2",
          children: A.name
        }), (0, i.jsx)("p", {
          className: "font-sans text-[#888888] text-sm mb-5",
          children: A.description
        }), (0, i.jsxs)("div", {
          className: "flex items-center justify-between",
          children: [(0, i.jsxs)("div", {
            children: [(0, i.jsx)("p", {
              className: "font-mono text-[#555555] text-xs mb-1",
              children: "ESTIMATED TIME"
            }), (0, i.jsx)("p", {
              className: "font-mono text-[#cccccc]",
              children: A.duration
            })]
          }), (0, i.jsxs)("div", {
            className: "text-right",
            children: [(0, i.jsx)("p", {
              className: "font-mono text-[#555555] text-xs mb-1",
              children: "PRICE"
            }), (0, i.jsxs)("p", {
              className: "font-mono text-[#cc0000] text-3xl font-black",
              children: ["\u20B1", A.price.toLocaleString()]
            })]
          })]
        })]
      }), (0, i.jsxs)("div", {
        className: "border border-[#2e2e2e] bg-[#141414] p-5 mb-6",
        children: [(0, i.jsx)("p", {
          className: "font-mono text-[#555555] text-xs tracking-widest mb-4",
          children: "CUSTOMER & VEHICLE"
        }), (0, i.jsxs)("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm",
          children: [(0, i.jsx)(Eu, {
            label: "Name",
            value: t.ownerName
          }), (0, i.jsx)(Eu, {
            label: "Contact",
            value: t.phone
          }), (0, i.jsx)(Eu, {
            label: "Vehicle",
            value: `${t.year} ${t.make} ${t.model}`
          }), (0, i.jsx)(Eu, {
            label: "Plate",
            value: t.plate,
            accent: !0
          }), t.color && (0, i.jsx)(Eu, {
            label: "Color",
            value: t.color
          }), t.mileage && (0, i.jsx)(Eu, {
            label: "Body Type",
            value: t.mileage
          })]
        })]
      }), (0, i.jsxs)("div", {
        className: "flex flex-col gap-3",
        children: [(0, i.jsx)("button", {
          onClick: u,
          className: "w-full py-5 bg-[#cc0000] text-white font-mono font-bold text-base tracking-widest hover:bg-[#e00000] active:scale-[0.98] transition-all",
          children: "CONTINUE TO PAYMENT \u2192"
        }), (0, i.jsxs)("div", {
          className: "grid grid-cols-2 gap-3",
          children: [(0, i.jsx)("button", {
            onClick: a,
            className: "py-3 font-mono text-sm tracking-widest border border-[#444444] text-[#888888] hover:border-[#cc0000] hover:text-[#cc0000] transition-colors",
            children: "MODIFY"
          }), (0, i.jsx)("button", {
            onClick: c,
            className: "py-3 font-mono text-sm tracking-widest border border-[#2e2e2e] text-[#555555] hover:border-[#444444] transition-colors",
            children: "\u2190 BACK"
          })]
        }), (0, i.jsx)("button", {
          onClick: e,
          className: "py-3 font-mono text-xs tracking-widest text-[#444444] hover:text-[#ef4444] transition-colors",
          children: "CANCEL \u2014 START OVER"
        })]
      })]
    })
  }

  function n0({
    parts: A,
    inventory: t,
    cart: a,
    onAddToCart: c,
    onBack: u,
    onViewCart: e,
    onViewPart: l,
    cartCount: n,
    cartTotal: r
  }) {
    let [I, p] = (0, f.useState)(""), [q, R] = (0, f.useState)("all"), d = A.filter(x => {
      let O = q === "all" || x.partCategory === q,
        j = I === "" || x.name.toLowerCase().includes(I.toLowerCase()) || x.description
        .toLowerCase().includes(I.toLowerCase());
      return O && j
    }), S = x => a.find(O => O.item.id === x)?.qty ?? 0, N = x => t[x] ?? 0;
    return (0, i.jsxs)("div", {
      className: "h-full flex flex-col",
      children: [(0, i.jsxs)("div", {
        className: "border-b border-[#1e1e1e] bg-[#0d0d0d] px-3 sm:px-6 pt-3 sm:pt-5 pb-0 flex-shrink-0",
        children: [(0, i.jsxs)("div", {
          className: "relative mb-4",
          children: [(0, i.jsx)("svg", {
            className: "absolute left-4 top-1/2 -translate-y-1/2 text-[#444444]",
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "currentColor",
            children: (0, i.jsx)("path", {
              d: "M6.5 1a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM0 6.5a6.5 6.5 0 1111.593 4.036l3.685 3.686a.5.5 0 01-.708.707l-3.686-3.685A6.5 6.5 0 010 6.5z"
            })
          }), (0, i.jsx)("input", {
            type: "text",
            value: I,
            onChange: x => p(x.target.value),
            placeholder: "Search parts by name or description\u2026",
            className: "w-full bg-[#141414] border border-[#2e2e2e] text-[#f0f0f0] font-sans pl-10 pr-4 py-3 focus:outline-none focus:border-[#cc0000] transition-colors placeholder:text-[#333333] text-sm"
          }), I && (0, i.jsx)("button", {
            onClick: () => p(""),
            className: "absolute right-4 top-1/2 -translate-y-1/2 text-[#444444] hover:text-[#888888]",
            children: "\u2715"
          })]
        }), (0, i.jsx)("div", {
          className: "flex gap-1 overflow-x-auto pb-0 -mx-1 px-1",
          style: {
            scrollbarWidth: "none"
          },
          children: [{
            id: "all",
            label: "All Parts"
          }, ...ha.slice(1)].map(x => (0, i.jsx)("button", {
            onClick: () => R(x.id),
            className: `flex-shrink-0 font-mono text-xs tracking-widest px-3 py-2.5 border-b-2 transition-colors whitespace-nowrap ${q===x.id?"border-[#cc0000] text-[#cc0000]":"border-transparent text-[#444444] hover:text-[#888888]"}`,
            children: x.label.toUpperCase()
          }, x.id))
        })]
      }), (0, i.jsx)("div", {
        className: "flex-1 overflow-y-auto min-h-0 px-3 sm:px-6 py-4 sm:py-5",
        children: d.length === 0 ? (0, i.jsxs)("div", {
          className: "flex flex-col items-center justify-center h-64 text-center",
          children: [(0, i.jsx)("p", {
            className: "font-mono text-[#333333] text-sm tracking-widest",
            children: "NO PARTS FOUND"
          }), (0, i.jsx)("button", {
            onClick: () => {
              p(""), R("all")
            },
            className: "mt-3 font-mono text-xs text-[#555555] hover:text-[#cc0000] transition-colors",
            children: "CLEAR FILTERS"
          })]
        }) : (0, i.jsx)("div", {
          className: "grid grid-cols-1 min-[430px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4",
          children: d.map((x, O) => {
            let j = S(x.id),
              H = i0[x.partCategory ?? ""] ?? "#555555",
              E = N(x.id),
              s = E > 0,
              P = S(x.id),
              k = Math.max(0, E - P);
            return (0, i.jsxs)("div", {
              className: "border border-[#2e2e2e] bg-[#141414] flex flex-col overflow-hidden hover:border-[#3e3e3e] transition-colors",
              children: [(0, i.jsxs)("button", {
                onClick: () => l(x),
                className: "h-36 w-full flex items-center justify-center relative overflow-hidden text-left",
                style: {
                  backgroundColor: x.image ? "#ffffff" : `${H}10`
                },
                children: [(0, i.jsx)("div", {
                  className: "absolute top-0 left-0 w-full h-0.5",
                  style: {
                    backgroundColor: H
                  }
                }), x.image ? (0, i.jsx)("img", {
                  src: x.image,
                  alt: x.name,
                  className: "h-full w-full object-contain p-2 hover:scale-105 transition-transform"
                }) : (0, i.jsx)(Su, {
                  category: x.partCategory ?? "",
                  color: H
                }), (0, i.jsx)("div", {
                  className: "absolute top-2 right-2 font-mono text-[10px] px-1.5 py-0.5",
                  style: {
                    color: x.image ? "#555555" : H,
                    border: `1px solid ${x.image?"#33333350":`${H}40`}`,
                    backgroundColor: x.image ?
                      "#00000088" : `${H}15`
                  },
                  children: x.partCategory?.toUpperCase() ??
                    "PART"
                })]
              }), (0, i.jsxs)("div", {
                className: "p-3 flex flex-col flex-1",
                children: [(0, i.jsx)("button", {
                  onClick: () => l(x),
                  className: "text-left hover:text-[#cc0000] transition-colors",
                  children: (0, i.jsx)("h3", {
                    className: "font-sans font-semibold text-sm leading-tight mb-1",
                    children: x.name
                  })
                }), (0, i.jsx)("p", {
                  className: "font-sans text-[#555555] text-xs leading-snug mb-3 flex-1",
                  children: x.description
                }), (0, i.jsxs)("div", {
                  className: "flex items-center justify-between mb-2",
                  children: [(0, i.jsxs)("span", {
                    className: "font-mono text-[#e8a0a0] font-bold text-base",
                    children: ["\u20B1", x.price
                      .toLocaleString()
                    ]
                  }), (0, i.jsx)("span", {
                    className: `font-mono text-[10px] ${E<=0?"text-[#ef4444]":E<=5?"text-[#f59e0b]":"text-[#22c55e]"}`,
                    children: E <= 0 ?
                      "OUT OF STOCK" : `${E} in stock`
                  })]
                }), P > 0 ? (0, i.jsxs)("div", {
                  className: "flex items-center justify-between border border-[#cc0000] bg-[#1a0000]",
                  children: [(0, i.jsxs)("span", {
                    className: "font-mono text-[#cc0000] text-xs px-2 py-1.5",
                    children: [P, " in cart"]
                  }), (0, i.jsx)("button", {
                    onClick: () => c(x),
                    disabled: k <= 0,
                    className: "px-3 py-1.5 bg-[#cc0000] text-white font-mono text-xs font-bold hover:bg-[#e00000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                    children: "+ ADD"
                  })]
                }) : (0, i.jsx)("button", {
                  onClick: () => c(x),
                  disabled: !s,
                  className: "w-full py-2 font-mono text-xs tracking-widest font-bold border border-[#3e3e3e] text-[#888888] hover:border-[#cc0000] hover:text-[#cc0000] hover:bg-[#1a0000] disabled:opacity-40 disabled:cursor-not-allowed transition-all",
                  children: s ? "+ ADD TO CART" : "OUT OF STOCK"
                })]
              })]
            }, `${x.id}-${O}`)
          })
        })
      }), (0, i.jsxs)("div", {
        className: "border-t border-[#1e1e1e] bg-[#0a0a0a] py-3 sm:py-4 px-3 sm:px-6 flex items-center justify-between gap-2 flex-shrink-0",
        children: [(0, i.jsx)("button", {
          onClick: u,
          className: "font-mono text-[#555555] text-xs tracking-widest px-3 sm:px-6 py-3 border border-[#2e2e2e] hover:border-[#444444] transition-colors",
          children: "\u2190 BACK"
        }), (0, i.jsxs)("span", {
          className: "hidden sm:inline font-mono text-[#444444] text-xs",
          children: [d.length, " part", d.length !== 1 ? "s" : "", " shown"]
        }), (0, i.jsxs)("button", {
          onClick: e,
          disabled: n === 0,
          className: "font-mono font-bold text-xs sm:text-base tracking-widest px-3 sm:px-8 py-3 bg-[#cc0000] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#e00000] active:scale-[0.98] transition-all flex items-center gap-2",
          children: [(0, i.jsx)(fq, {}), (0, i.jsxs)("span", {
            children: [(0, i.jsx)("span", {
              className: "hidden sm:inline",
              children: "VIEW "
            }), "CART (", n, ") \xB7 \u20B1", r.toLocaleString()]
          })]
        })]
      })]
    })
  }

  function I0({
    part: A,
    stock: t,
    cartQty: a,
    onAddToCart: c,
    onBack: u,
    onViewCart: e
  }) {
    let l = Math.max(0, t - a),
      [n, r] = (0, f.useState)(1),
      [I, p] = (0, f.useState)(!1),
      q = ha.find(S => S.id === A.partCategory)?.label ?? "Automotive Part",
      R = l > 0,
      d = (S = !1) => {
        let N = Math.min(n, l);
        N <= 0 || (c(A, N), p(!0), S && e())
      };
    return (0, i.jsx)("div", {
      className: "min-h-full bg-white text-[#111111]",
      children: (0, i.jsxs)("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8",
        children: [(0, i.jsxs)("button", {
          onClick: u,
          className: "font-sans text-xs font-bold text-[#666666] hover:text-[#cc0000] transition-colors mb-5",
          children: ["\u2190 BACK TO ", q.toUpperCase()]
        }), (0, i.jsxs)("div", {
          className: "grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] gap-8 lg:gap-14 items-start",
          children: [(0, i.jsxs)("div", {
            children: [(0, i.jsxs)("div", {
              className: "border-[18px] sm:border-[24px] border-[#ed1c24] bg-white",
              children: [(0, i.jsxs)("div", {
                className: "h-20 sm:h-28 bg-[#111111] border-b-[10px] border-[#ed1c24] flex items-center justify-center text-white relative overflow-hidden",
                children: [(0, i.jsx)("span", {
                  className: "absolute inset-x-[18%] top-0 h-5 bg-[#ed1c24] skew-x-[-12deg]"
                }), (0, i.jsx)("span", {
                  className: "relative font-display text-4xl sm:text-6xl font-black italic tracking-tight",
                  children: "G SPOT"
                }), (0, i.jsx)("span", {
                  className: "relative ml-3 font-sans text-[9px] sm:text-xs font-black tracking-[0.2em]",
                  children: "OFFICIAL STORE"
                })]
              }), (0, i.jsx)("div", {
                className: "aspect-square sm:aspect-[1.08/1] flex items-center justify-center p-6 sm:p-10",
                children: A.image ? (0, i.jsx)("img", {
                  src: A.image,
                  alt: A.name,
                  className: "w-full h-full object-contain"
                }) : (0, i.jsx)(Su, {
                  category: A.partCategory ?? "",
                  color: "#cc0000",
                  size: 140
                })
              }), (0, i.jsx)("div", {
                className: "min-h-20 bg-[#111111] text-white flex items-center justify-center px-5 py-4 border-t-[10px] border-[#ed1c24]",
                children: (0, i.jsx)("p", {
                  className: "font-display text-xl sm:text-3xl font-black uppercase italic text-center leading-none",
                  children: A.name
                })
              })]
            }), (0, i.jsx)("div", {
              className: "grid grid-cols-3 gap-3 mt-3 max-w-md",
              children: [0, 1, 2].map(S => (0, i.jsx)("button", {
                className: `aspect-square bg-white p-2 ${S===0?"border-4 border-[#ed1c24]":"border border-[#bbbbbb]"}`,
                children: A.image ? (0, i.jsx)("img", {
                  src: A.image,
                  alt: S === 0 ? A.name : "",
                  className: `w-full h-full object-contain ${S===1?"scale-90":S===2?"scale-75":""}`
                }) : (0, i.jsx)(Su, {
                  category: A.partCategory ?? "",
                  color: "#cc0000",
                  size: 46
                })
              }, S))
            })]
          }), (0, i.jsxs)("div", {
            children: [(0, i.jsxs)("p", {
              className: "font-sans text-[#ed1c24] text-xs font-black uppercase tracking-[0.16em] mb-2",
              children: ["G Spot \xB7 ", q]
            }), (0, i.jsx)("h1", {
              className: "font-display text-4xl sm:text-5xl lg:text-[52px] font-black uppercase italic leading-[0.92] tracking-tight",
              children: A.name
            }), (0, i.jsx)("button", {
              className: "font-sans text-xs underline text-[#555555] mt-4 hover:text-[#ed1c24]",
              children: "Ask a question"
            }), (0, i.jsxs)("div", {
              className: "border border-[#d2d2d2] bg-[#f7f7f5] px-4 py-4 mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs",
              children: [(0, i.jsx)("span", {
                children: "Add your vehicle to check this part fits."
              }), (0, i.jsx)("button", {
                className: "font-black underline hover:text-[#ed1c24]",
                children: "ADD VEHICLE"
              })]
            }), (0, i.jsxs)("div", {
              className: "flex items-end justify-between gap-4 mt-5",
              children: [(0, i.jsxs)("p", {
                className: "font-sans text-4xl font-black",
                children: ["\u20B1", A.price.toLocaleString()]
              }), (0, i.jsx)("p", {
                className: `font-sans text-xs font-bold ${l>0?"text-[#238044]":"text-[#cc0000]"}`,
                children: l > 0 ? `${l} IN STOCK` : "OUT OF STOCK"
              })]
            }), (a > 0 || I) && (0, i.jsx)("div", {
              className: "mt-4 px-4 py-3 bg-[#fff3f3] border border-[#f0c7c7] font-sans text-xs text-[#99151a]",
              children: I ?
                "Added to cart successfully." : `${a} already in your cart.`
            }), (0, i.jsxs)("div", {
              className: "grid grid-cols-[118px_1fr] gap-3 mt-5",
              children: [(0, i.jsxs)("div", {
                className: "h-14 flex items-center border border-[#cccccc]",
                children: [(0, i.jsx)("button", {
                  onClick: () => r(S => Math.max(1, S - 1)),
                  className: "w-10 h-full font-sans text-lg hover:bg-[#f2f2f2]",
                  children: "\u2212"
                }), (0, i.jsx)("span", {
                  className: "flex-1 h-full flex items-center justify-center font-sans font-bold",
                  children: n
                }), (0, i.jsx)("button", {
                  onClick: () => r(S => Math.min(Math.max(1,
                    l), S + 1)),
                  disabled: !R || n >= l,
                  className: "w-10 h-full font-sans text-lg hover:bg-[#f2f2f2] disabled:opacity-30",
                  children: "+"
                })]
              }), (0, i.jsx)("button", {
                onClick: () => d(!1),
                disabled: !R,
                className: "h-14 bg-[#f61212] text-white font-sans text-sm font-black tracking-wide hover:bg-[#c90000] disabled:bg-[#bdbdbd] transition-colors",
                children: R ? "ADD TO CART" : "OUT OF STOCK"
              })]
            }), (0, i.jsx)("div", {
              className: "flex flex-wrap items-center gap-2 mt-3",
              children: ["GCash", "Maya", "VISA", "Mastercard", "BDO",
                "BPI"
              ].map(S => (0, i.jsx)("span", {
                className: "border border-[#dddddd] bg-white px-2 py-1 font-sans text-[8px] font-black text-[#37639a]",
                children: S
              }, S))
            }), (0, i.jsx)("div", {
              className: "grid sm:grid-cols-2 gap-3 mt-6",
              children: [
                ["AVAILABLE FOR STORE PICK UP",
                  "Call the branch to confirm stock"
                ],
                ["FAST LOCAL FULFILLMENT",
                  "Prepared by our parts counter"
                ],
                ["TOP-NOTCH CUSTOMER SERVICE",
                  "Chat or call us for assistance"
                ],
                ["SECURE PAYMENT",
                  "Cash and secure digital payment supported"
                ]
              ].map(([S, N]) => (0, i.jsxs)("div", {
                className: "bg-[#f5f5f2] min-h-28 p-4",
                children: [(0, i.jsxs)("svg", {
                  className: "text-[#ed1c24] mb-3",
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  "aria-hidden": "true",
                  children: [(0, i.jsx)("circle", {
                    cx: "12",
                    cy: "12",
                    r: "8",
                    stroke: "currentColor",
                    strokeWidth: "2"
                  }), (0, i.jsx)("path", {
                    d: "m8.5 12 2.2 2.2 4.8-5",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })]
                }), (0, i.jsx)("h2", {
                  className: "font-sans text-sm font-black leading-tight",
                  children: S
                }), (0, i.jsx)("p", {
                  className: "font-sans text-xs text-[#666666] leading-relaxed mt-1",
                  children: N
                })]
              }, S))
            }), (0, i.jsxs)("section", {
              className: "border-t border-[#d8d8d8] mt-7 pt-5",
              children: [(0, i.jsxs)("div", {
                className: "flex items-center justify-between border-b border-[#eeeeee] pb-4",
                children: [(0, i.jsx)("h2", {
                  className: "font-sans text-sm font-black tracking-wide",
                  children: "DESCRIPTION"
                }), (0, i.jsx)("span", {
                  className: "font-sans text-[#ed1c24] font-black",
                  children: "\xD7"
                })]
              }), (0, i.jsxs)("div", {
                className: "pt-6",
                children: [(0, i.jsx)("h3", {
                  className: "font-sans text-base font-black",
                  children: A.name
                }), (0, i.jsxs)("ul", {
                  className: "font-sans text-[#555555] text-sm leading-7 mt-2 list-disc pl-5",
                  children: [(0, i.jsx)("li", {
                    children: A.description
                  }), (0, i.jsx)("li", {
                    children: "Quality-inspected automotive replacement part"
                  }), (0, i.jsx)("li", {
                    children: "Professional installation available at our service center"
                  }), (0, i.jsx)("li", {
                    children: "Live inventory shown before checkout"
                  }), (0, i.jsx)("li", {
                    children: "Fitment assistance available from G Spot manager"
                  })]
                }), (0, i.jsx)("p", {
                  className: "font-sans text-sm font-bold text-[#555555] mt-7",
                  children: "Reminders:"
                }), (0, i.jsxs)("ul", {
                  className: "font-sans text-[#666666] text-sm leading-7 mt-2 list-disc pl-5",
                  children: [(0, i.jsx)("li", {
                    children: "Actual product appearance may vary slightly from the image shown."
                  }), (0, i.jsx)("li", {
                    children: "Please confirm compatibility with your vehicle before installation."
                  }), (0, i.jsx)("li", {
                    children: "For questions, contact our service team before placing your order."
                  })]
                })]
              })]
            }), (0, i.jsxs)("div", {
              className: "flex flex-wrap gap-3 mt-7 pb-8",
              children: [(0, i.jsx)("button", {
                onClick: u,
                className: "px-5 py-3 border border-[#cccccc] font-sans text-xs font-bold hover:border-[#ed1c24] hover:text-[#ed1c24]",
                children: "\u2190 CONTINUE SHOPPING"
              }), a > 0 && (0, i.jsx)("button", {
                onClick: e,
                className: "px-5 py-3 bg-[#111111] text-white font-sans text-xs font-bold hover:bg-[#ed1c24]",
                children: "VIEW CART \u2192"
              }), (0, i.jsx)("button", {
                onClick: () => d(!0),
                disabled: !R,
                className: "px-5 py-3 border border-[#111111] font-sans text-xs font-bold hover:bg-[#111111] hover:text-white disabled:opacity-30",
                children: "BUY NOW"
              })]
            })]
          })]
        })]
      })
    })
  }

  function q0({
    cart: A,
    onUpdateQty: t,
    onRemove: a,
    onBack: c,
    onCheckout: u,
    mode = "parts"
  }) {
    let e = A.reduce((n, r) => n + r.item.price * r.qty, 0),
      l = A.reduce((n, r) => n + r.qty, 0);
    return (0, i.jsx)("div", {
      className: "h-full bg-[#f5f5f5] overflow-y-auto",
      children: (0, i.jsxs)("div", {
        className: "max-w-7xl mx-auto px-3 sm:px-6 py-5 sm:py-8 min-h-full flex flex-col",
        children: [(0, i.jsxs)("div", {
          className: "flex items-end justify-between gap-4 mb-5",
          children: [(0, i.jsxs)("div", {
            children: [(0, i.jsx)("p", {
              className: "font-sans text-[#cc0000] text-[10px] font-black tracking-[0.2em]",
              children: mode === "service" ? "G SPOT SERVICES" : "G SPOT PARTS MARKETPLACE"
            }), (0, i.jsx)("h1", {
              className: "font-display text-3xl sm:text-4xl font-black uppercase italic mt-1",
              children: "Shopping cart"
            })]
          }), (0, i.jsx)("button", {
            onClick: c,
            className: "font-sans text-xs font-bold text-[#555555] hover:text-[#cc0000]",
            children: "\u2190 CONTINUE SHOPPING"
          })]
        }), A.length === 0 ? (0, i.jsxs)("div", {
          className: "flex-1 bg-white border border-[#e2e2e2] flex flex-col items-center justify-center text-center py-20",
          children: [(0, i.jsx)(fq, {
            className: "text-[#cccccc] mb-4",
            size: 48
          }), (0, i.jsx)("p", {
            className: "font-sans text-[#777777] text-sm font-bold mb-4",
            children: "Your shopping cart is empty"
          }), (0, i.jsx)("button", {
            onClick: c,
            className: "font-sans text-xs text-[#cc0000] font-bold border border-[#cc0000] px-6 py-3 hover:bg-[#cc0000] hover:text-white transition-colors",
            children: mode === "service" ? "BROWSE SERVICES" : "BROWSE PARTS"
          })]
        }) : (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsxs)("div", {
            className: "hidden md:grid grid-cols-[minmax(0,2fr)_0.65fr_0.75fr_0.7fr_0.55fr] gap-4 items-center bg-white border border-[#e3e3e3] px-6 py-4 font-sans text-xs text-[#777777]",
            children: [(0, i.jsx)("span", {
              children: mode === "service" ? "Service" : "Product"
            }), (0, i.jsx)("span", {
              className: "text-center",
              children: "Unit Price"
            }), (0, i.jsx)("span", {
              className: "text-center",
              children: "Quantity"
            }), (0, i.jsx)("span", {
              className: "text-center",
              children: "Total Price"
            }), (0, i.jsx)("span", {
              className: "text-center",
              children: "Actions"
            })]
          }), (0, i.jsxs)("section", {
            className: "bg-white border border-[#e3e3e3] mt-3",
            children: [(0, i.jsxs)("div", {
              className: "px-4 sm:px-6 py-4 border-b border-[#e8e8e8] flex items-center gap-3",
              children: [(0, i.jsx)("span", {
                className: "bg-[#ee2d24] text-white px-2 py-1 font-sans text-[9px] font-black",
                children: "OFFICIAL"
              }), (0, i.jsx)("span", {
                className: "font-sans text-sm font-bold",
                children: "G Spot Automotive Official Store"
              }), (0, i.jsx)("span", {
                className: "text-[#ee2d24]",
                "aria-hidden": "true",
                children: "\u25B0"
              })]
            }), A.map(({
              item: n,
              qty: r
            }, I) => (0, i.jsxs)("div", {
              className: "grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_0.65fr_0.75fr_0.7fr_0.55fr] gap-4 md:items-center px-4 sm:px-6 py-5 border-b border-[#eeeeee] last:border-b-0",
              children: [(0, i.jsxs)("div", {
                className: "flex items-center gap-4 min-w-0",
                children: [(0, i.jsx)("div", {
                  className: "w-20 h-20 sm:w-24 sm:h-24 bg-white border border-[#eeeeee] flex-shrink-0",
                  children: n.image ? (0, i.jsx)("img", {
                    src: n.image,
                    alt: n.name,
                    className: "w-full h-full object-contain p-1.5"
                  }) : (0, i.jsx)(Su, {
                    category: n.partCategory ?? "",
                    color: "#cc0000",
                    size: 36
                  })
                }), (0, i.jsxs)("div", {
                  className: "min-w-0",
                  children: [(0, i.jsx)("p", {
                    className: "font-sans font-semibold text-[#171717] text-sm leading-snug",
                    children: n.name
                  }), (0, i.jsx)("p", {
                    className: "font-sans text-[#888888] text-xs mt-2",
                    children: ha.find(p => p.id ===
                        n.partCategory)?.label ??
                      "Automotive Part"
                  }), (0, i.jsx)("span", {
                    className: "inline-block border border-[#ee2d24] text-[#ee2d24] px-1.5 py-0.5 font-sans text-[8px] mt-2",
                    children: "QUALITY CHECKED"
                  })]
                })]
              }), (0, i.jsxs)("div", {
                className: "flex md:block justify-between font-sans text-sm md:text-center",
                children: [(0, i.jsx)("span", {
                  className: "md:hidden text-[#888888]",
                  children: "Unit Price"
                }), (0, i.jsxs)("span", {
                  children: ["\u20B1", n.price
                    .toLocaleString()
                  ]
                })]
              }), (0, i.jsxs)("div", {
                className: "flex md:justify-center items-center justify-between",
                children: [(0, i.jsx)("span", {
                  className: "md:hidden font-sans text-sm text-[#888888]",
                  children: "Quantity"
                }), (0, i.jsxs)("div", {
                  className: "flex items-center border border-[#dddddd]",
                  children: [(0, i.jsx)("button", {
                    onClick: () => t(n.id, r - 1),
                    className: "w-9 h-9 flex items-center justify-center font-sans text-lg text-[#777777] hover:text-[#cc0000] hover:bg-[#fff3f3]",
                    children: "\u2212"
                  }), (0, i.jsx)("span", {
                    className: "w-12 h-9 flex items-center justify-center font-sans text-sm border-x border-[#dddddd]",
                    children: r
                  }), (0, i.jsx)("button", {
                    onClick: () => t(n.id, r + 1),
                    className: "w-9 h-9 flex items-center justify-center font-sans text-lg text-[#777777] hover:text-[#cc0000] hover:bg-[#fff3f3]",
                    children: "+"
                  })]
                })]
              }), (0, i.jsxs)("div", {
                className: "flex md:block justify-between font-sans text-sm text-[#ee2d24] md:text-center",
                children: [(0, i.jsx)("span", {
                  className: "md:hidden text-[#888888]",
                  children: "Total Price"
                }), (0, i.jsxs)("span", {
                  children: ["\u20B1", (n.price * r)
                    .toLocaleString()
                  ]
                })]
              }), (0, i.jsxs)("div", {
                className: "flex md:flex-col items-center justify-end md:justify-center gap-3",
                children: [(0, i.jsx)("button", {
                  onClick: () => a(n.id),
                  className: "font-sans text-xs text-[#333333] hover:text-[#ee2d24]",
                  children: "Delete"
                }), (0, i.jsx)("button", {
                  onClick: c,
                  className: "font-sans text-xs text-[#ee2d24]",
                  children: "Find Similar"
                })]
              })]
            }, `cart-${n.id}-${I}`)), (0, i.jsxs)("div", {
              className: "px-4 sm:px-6 py-4 flex items-center gap-3 font-sans text-xs text-[#1769aa]",
              children: [(0, i.jsxs)("svg", {
                className: "text-[#ee2d24]",
                width: "17",
                height: "17",
                viewBox: "0 0 24 24",
                fill: "none",
                "aria-hidden": "true",
                children: [(0, i.jsx)("path", {
                  d: "M4 7h16v10H4V7Z",
                  stroke: "currentColor",
                  strokeWidth: "1.8"
                }), (0, i.jsx)("path", {
                  d: "M8 7c0 2-1 3-3 3m11-3c0 2 1 3 3 3M8 17c0-2-1-3-3-3m11 3c0-2 1-3 3-3",
                  stroke: "currentColor",
                  strokeWidth: "1.8"
                })]
              }), (0, i.jsx)("button", {
                children: "Apply store voucher code"
              })]
            })]
          }), (0, i.jsxs)("div", {
            className: "sticky bottom-0 bg-white border border-[#e0e0e0] shadow-[0_-6px_24px_rgba(0,0,0,0.08)] mt-4 px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4",
            children: [(0, i.jsxs)("div", {
              className: "flex items-center gap-5",
              children: [(0, i.jsx)("button", {
                onClick: c,
                className: "font-sans text-sm text-[#333333] hover:text-[#ee2d24]",
                children: "Continue Shopping"
              }), (0, i.jsx)("span", {
                className: "hidden sm:block h-5 w-px bg-[#dddddd]"
              }), (0, i.jsxs)("p", {
                className: "font-sans text-xs text-[#777777]",
                children: [l, " item", l !== 1 ? "s" : "",
                  " selected"
                ]
              })]
            }), (0, i.jsxs)("div", {
              className: "flex items-center justify-between sm:justify-end gap-5 sm:gap-8",
              children: [(0, i.jsxs)("p", {
                className: "font-sans text-sm",
                children: ["Total (", l, " item", l !== 1 ? "s" :
                  "", "): ", (0, i.jsxs)("span", {
                    className: "text-[#ee2d24] text-2xl font-medium ml-2",
                    children: ["\u20B1", e.toLocaleString()]
                  })
                ]
              }), (0, i.jsx)("button", {
                onClick: u,
                className: "px-8 sm:px-14 py-3.5 font-sans font-bold text-sm bg-[#ee2d24] text-white hover:bg-[#cc0000] active:scale-[0.98] transition-all",
                children: "Check Out"
              })]
            })]
          })]
        })]
      })
    })
  }

  function Jb({
    cart: A,
    onBack: t,
    onPay: a,
    serviceInfo: c,
    onContactChange: u
  }) {
    let e = A.reduce((o, T) => o + T.item.price * T.qty, 0),
      [l, n] = (0, f.useState)({
        email: "",
        firstName: "",
        lastName: "",
        company: "",
        address: "",
        apartment: "",
        barangay: "",
        postalCode: "",
        city: "",
        region: "Metro Manila",
        phone: ""
      }),
      [r, I] = (0, f.useState)("delivery"),
      [p, q] = (0, f.useState)("paymongo"),
      [R, d] = (0, f.useState)(!1),
      [S, N] = (0, f.useState)(!0),
      [x, O] = (0, f.useState)(""),
      [j, H] = (0, f.useState)(""),
      E =
      "w-full rounded-lg border border-[#d7d7d7] bg-white px-3 py-3.5 font-sans text-sm text-[#171717] outline-none focus:border-[#171717] placeholder:text-[#777777]",
      s = c ? !!(c.ownerName.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email) && c.phone
      .trim()) : l.email.includes("@") && l.firstName && l.lastName && l.address && l.barangay &&
      l.postalCode && l.city && l.phone,
      P = o => T => {
        n(y => ({
          ...y,
          [o]: T.target.value
        }))
      },
      k = () => {
        if (s) {
          if (p === "card") {
            d(!0);
            return
          }
          a(p === "cod" ? "cash" : "kiosk")
        }
      };
    return (0, i.jsxs)("div", {
      className: "min-h-full bg-white text-[#111111]",
      children: [R && (0, i.jsx)(p0, {
        total: e,
        onBack: () => d(!1),
        onComplete: () => a("card")
      }), (0, i.jsxs)("div", {
        className: "max-w-7xl mx-auto grid lg:grid-cols-[1.12fr_0.88fr] min-h-full",
        children: [(0, i.jsxs)("div", {
          className: "px-4 sm:px-8 lg:px-12 py-7 sm:py-10 lg:border-r border-[#e5e5e5]",
          children: [(0, i.jsx)("button", {
            onClick: t,
            className: "font-sans text-xs text-[#555555] hover:text-[#cc0000] mb-7",
            children: c ?
              "\u2190 Return to service confirmation" : "\u2190 Return to cart"
          }), c ? (0, i.jsxs)("section", {
            children: [(0, i.jsx)("h1", {
              className: "font-sans text-xl font-bold mb-4",
              children: "Contact"
            }), (0, i.jsxs)("div", {
              className: "space-y-3",
              children: [(0, i.jsx)("input", {
                "aria-label": "Full name",
                autoComplete: "name",
                value: c.ownerName,
                onChange: o => u?.({
                  ...c,
                  ownerName: o.target.value
                }),
                placeholder: "Full name",
                className: E
              }), (0, i.jsx)("input", {
                "aria-label": "Email",
                type: "email",
                autoComplete: "email",
                value: c.email,
                onChange: o => u?.({
                  ...c,
                  email: o.target.value
                }),
                placeholder: "Email",
                className: E
              }), (0, i.jsx)("input", {
                "aria-label": "Phone",
                type: "tel",
                autoComplete: "tel",
                value: c.phone,
                onChange: o => u?.({
                  ...c,
                  phone: o.target.value
                }),
                placeholder: "Phone",
                className: E
              })]
            }), (0, i.jsxs)("div", {
              className: "mt-6 rounded-lg border border-[#dddddd] p-4 bg-[#fafafa]",
              children: [(0, i.jsx)("h2", {
                className: "font-sans text-sm font-bold mb-2",
                children: "Vehicle details"
              }), (0, i.jsxs)("p", {
                className: "font-sans text-sm text-[#555555]",
                children: [c.year, " ", c.make, " ", c.model]
              }), (0, i.jsxs)("p", {
                className: "font-sans text-xs text-[#777777] mt-1",
                children: ["Plate: ", c.plate]
              })]
            })]
          }) : (0, i.jsxs)(i.Fragment, {
            children: [(0, i.jsxs)("section", {
              children: [(0, i.jsxs)("div", {
                className: "flex items-center justify-between gap-4 mb-3",
                children: [(0, i.jsx)("h1", {
                  className: "font-sans text-xl font-bold",
                  children: "Contact"
                }), (0, i.jsx)("button", {
                  className: "font-sans text-xs underline",
                  children: "Sign in"
                })]
              }), (0, i.jsx)("input", {
                type: "email",
                value: l.email,
                onChange: P("email"),
                placeholder: "Email",
                className: E
              }), (0, i.jsxs)("label", {
                className: "flex items-center gap-2 mt-3 font-sans text-xs cursor-pointer",
                children: [(0, i.jsx)("input", {
                  type: "checkbox",
                  className: "min-h-0 w-4 h-4 accent-[#111111]"
                }), "Email me with news and offers"]
              })]
            }), (0, i.jsxs)("section", {
              className: "mt-8",
              children: [(0, i.jsx)("h2", {
                className: "font-sans text-xl font-bold mb-4",
                children: "Delivery"
              }), (0, i.jsxs)("label", {
                className: "block relative",
                children: [(0, i.jsx)("span", {
                  className: "absolute left-3 top-1.5 font-sans text-[10px] text-[#666666] z-10",
                  children: "Country/Region"
                }), (0, i.jsx)("select", {
                  className: `${E} pt-5`,
                  defaultValue: "Philippines",
                  children: (0, i.jsx)("option", {
                    children: "Philippines"
                  })
                })]
              }), (0, i.jsxs)("div", {
                className: "grid sm:grid-cols-2 gap-3 mt-3",
                children: [(0, i.jsx)("input", {
                  value: l.firstName,
                  onChange: P("firstName"),
                  placeholder: "First name",
                  className: E
                }), (0, i.jsx)("input", {
                  value: l.lastName,
                  onChange: P("lastName"),
                  placeholder: "Last name",
                  className: E
                })]
              }), (0, i.jsx)("input", {
                value: l.company,
                onChange: P("company"),
                placeholder: "Company (optional)",
                className: `${E} mt-3`
              }), (0, i.jsx)("input", {
                value: l.address,
                onChange: P("address"),
                placeholder: "Address",
                className: `${E} mt-3`
              }), (0, i.jsxs)("div", {
                className: "grid sm:grid-cols-2 gap-3 mt-3",
                children: [(0, i.jsx)("input", {
                  value: l.apartment,
                  onChange: P("apartment"),
                  placeholder: "Apartment, suite, etc. (optional)",
                  className: E
                }), (0, i.jsx)("input", {
                  value: l.barangay,
                  onChange: P("barangay"),
                  placeholder: "Barangay",
                  className: E
                })]
              }), (0, i.jsxs)("div", {
                className: "grid sm:grid-cols-2 gap-3 mt-3",
                children: [(0, i.jsx)("input", {
                  value: l.postalCode,
                  onChange: P("postalCode"),
                  placeholder: "Postal code",
                  className: E
                }), (0, i.jsx)("input", {
                  value: l.city,
                  onChange: P("city"),
                  placeholder: "City",
                  className: E
                })]
              }), (0, i.jsxs)("label", {
                className: "block relative mt-3",
                children: [(0, i.jsx)("span", {
                  className: "absolute left-3 top-1.5 font-sans text-[10px] text-[#666666] z-10",
                  children: "Region"
                }), (0, i.jsxs)("select", {
                  value: l.region,
                  onChange: P("region"),
                  className: `${E} pt-5`,
                  children: [(0, i.jsx)("option", {
                    children: "Metro Manila"
                  }), (0, i.jsx)("option", {
                    children: "CALABARZON"
                  }), (0, i.jsx)("option", {
                    children: "Central Luzon"
                  }), (0, i.jsx)("option", {
                    children: "Other Region"
                  })]
                })]
              }), (0, i.jsx)("input", {
                type: "tel",
                value: l.phone,
                onChange: P("phone"),
                placeholder: "Phone",
                className: `${E} mt-3`
              }), (0, i.jsxs)("label", {
                className: "flex items-center gap-2 mt-3 font-sans text-xs cursor-pointer",
                children: [(0, i.jsx)("input", {
                  type: "checkbox",
                  className: "min-h-0 w-4 h-4 accent-[#111111]"
                }), "Save this information for next time"]
              })]
            }), (0, i.jsxs)("section", {
              className: "mt-8",
              children: [(0, i.jsx)("h2", {
                className: "font-sans text-sm font-bold mb-3",
                children: "Shipping method"
              }), (0, i.jsxs)("div", {
                className: "rounded-xl border border-[#d7d7d7] overflow-hidden",
                children: [(0, i.jsxs)("button", {
                  onClick: () => I("delivery"),
                  className: `w-full px-4 py-4 flex items-center justify-between gap-4 font-sans text-sm border-b border-[#e4e4e4] ${r==="delivery"?"bg-[#f5f5f5]":"bg-white"}`,
                  children: [(0, i.jsxs)("span", {
                    className: "flex items-center gap-3",
                    children: [(0, i.jsx)("span", {
                      className: `w-4 h-4 rounded-full border flex items-center justify-center ${r==="delivery"?"border-[#111111]":"border-[#bbbbbb]"}`,
                      children: r ===
                        "delivery" && (0, i
                          .jsx)("span", {
                          className: "w-2 h-2 bg-[#111111] rounded-full"
                        })
                    }), "Local delivery"]
                  }), (0, i.jsx)("strong", {
                    children: "FREE"
                  })]
                }), (0, i.jsxs)("button", {
                  onClick: () => I("pickup"),
                  className: `w-full px-4 py-4 flex items-center justify-between gap-4 font-sans text-sm ${r==="pickup"?"bg-[#f5f5f5]":"bg-white"}`,
                  children: [(0, i.jsxs)("span", {
                    className: "flex items-center gap-3",
                    children: [(0, i.jsx)("span", {
                        className: `w-4 h-4 rounded-full border flex items-center justify-center ${r==="pickup"?"border-[#111111]":"border-[#bbbbbb]"}`,
                        children: r ===
                          "pickup" && (0, i.jsx)
                          ("span", {
                            className: "w-2 h-2 bg-[#111111] rounded-full"
                          })
                      }),
                      "Pick up at G Spot Automotive"
                    ]
                  }), (0, i.jsx)("strong", {
                    children: "FREE"
                  })]
                })]
              })]
            })]
          }), (0, i.jsxs)("section", {
            className: "mt-8",
            children: [(0, i.jsx)("h2", {
              className: "font-sans text-xl font-bold",
              children: "Payment"
            }), (0, i.jsx)("p", {
              className: "font-sans text-xs text-[#666666] mt-1 mb-3",
              children: "Demo payment only \u2014 no money is charged. Do not enter real card details."
            }), (0, i.jsx)("div", {
              className: "rounded-xl border border-[#222222] overflow-hidden",
              children: [{
                id: "card",
                title: "Dragonpay \u2014 Credit / Debit Card",
                detail: "Visa, Mastercard, American Express and JCB",
                marks: ["MC", "VISA", "AMEX", "JCB"]
              }, {
                id: "paymongo",
                title: "Secure Payments via PayMongo",
                detail: "Cards, GCash and Maya",
                marks: ["MC", "VISA", "GCash"]
              }, {
                id: "cod",
                title: c ?
                  "Cash \u2014 Pay at counter" : "Cash on Delivery (COD)",
                detail: c ?
                  "Pay at G Spot Automotive when your service is ready" : "Pay when your order arrives",
                marks: []
              }].map((o, T) => (0, i.jsxs)("button", {
                onClick: () => q(o.id),
                className: `w-full text-left px-4 py-4 border-b last:border-b-0 border-[#dddddd] ${p===o.id?"bg-[#f4f4f4]":"bg-white"}`,
                children: [(0, i.jsxs)("div", {
                  className: "flex items-center justify-between gap-3",
                  children: [(0, i.jsxs)("span", {
                    className: "flex items-center gap-3 font-sans text-sm font-bold",
                    children: [(0, i.jsx)("span", {
                      className: `w-4 h-4 rounded-full border flex items-center justify-center ${p===o.id?"border-[#111111]":"border-[#bbbbbb]"}`,
                      children: p === o.id &&
                        (0, i.jsx)("span", {
                          className: "w-2 h-2 bg-[#111111] rounded-full"
                        })
                    }), o.title]
                  }), (0, i.jsx)("span", {
                    className: "flex gap-1",
                    children: o.marks.map(y => (0, i
                      .jsx)("span", {
                      className: "border border-[#dddddd] bg-white px-1.5 py-1 font-sans text-[8px] font-black text-[#245cb2]",
                      children: y
                    }, y))
                  })]
                }), p === o.id && (0, i.jsxs)("p", {
                  className: "font-sans text-xs text-[#666666] text-center mt-4 px-5",
                  children: [o.detail, ". ", c ?
                    "Confirm your service booking below. No real payment will be processed." :
                    "Demo checkout only; no real payment will be processed."
                  ]
                })]
              }, o.id))
            })]
          }), !c && (0, i.jsxs)("section", {
            className: "mt-8",
            children: [(0, i.jsx)("h2", {
              className: "font-sans text-sm font-bold mb-3",
              children: "Billing address"
            }), (0, i.jsxs)("div", {
              className: "rounded-xl border border-[#222222] overflow-hidden",
              children: [(0, i.jsxs)("button", {
                onClick: () => N(!0),
                className: `w-full px-4 py-4 flex items-center gap-3 font-sans text-sm font-bold border-b border-[#dddddd] ${S?"bg-[#f4f4f4]":"bg-white"}`,
                children: [(0, i.jsx)("span", {
                  className: `w-4 h-4 rounded-full border flex items-center justify-center ${S?"border-[#111111]":"border-[#bbbbbb]"}`,
                  children: S && (0, i.jsx)("span", {
                    className: "w-2 h-2 bg-[#111111] rounded-full"
                  })
                }), "Same as shipping address"]
              }), (0, i.jsxs)("button", {
                onClick: () => N(!1),
                className: `w-full px-4 py-4 flex items-center gap-3 font-sans text-sm font-bold ${S?"bg-white":"bg-[#f4f4f4]"}`,
                children: [(0, i.jsx)("span", {
                  className: `w-4 h-4 rounded-full border flex items-center justify-center ${S?"border-[#bbbbbb]":"border-[#111111]"}`,
                  children: !S && (0, i.jsx)("span", {
                    className: "w-2 h-2 bg-[#111111] rounded-full"
                  })
                }), "Use a different billing address"]
              })]
            })]
          }), (0, i.jsx)("button", {
            onClick: k,
            disabled: !s,
            className: "w-full mt-8 rounded-xl bg-[#111111] text-white py-4 font-sans text-sm font-bold hover:bg-[#cc0000] disabled:bg-[#bbbbbb] disabled:cursor-not-allowed transition-colors",
            children: c && p === "cod" ? "Confirm booking" : "Pay now"
          }), !s && (0, i.jsx)("p", {
            className: "font-sans text-[11px] text-[#888888] text-center mt-2",
            children: c ?
              "Complete your name, valid email and phone to continue." : "Complete the required contact and delivery fields to continue."
          })]
        }), (0, i.jsxs)("aside", {
          className: "bg-[#f7f7f7] px-4 sm:px-8 lg:px-10 py-7 sm:py-10 lg:sticky lg:top-0 lg:self-start lg:min-h-full",
          children: [(0, i.jsx)("div", {
            className: "space-y-4",
            children: A.map(({
              item: o,
              qty: T
            }) => (0, i.jsxs)("div", {
              className: "flex items-center gap-3",
              children: [(0, i.jsxs)("div", {
                className: "relative w-16 h-16 bg-white border border-[#dddddd] rounded-lg flex-shrink-0",
                children: [o.image ? (0, i.jsx)("img", {
                  src: o.image,
                  alt: "",
                  className: "w-full h-full object-contain p-1"
                }) : (0, i.jsx)(Su, {
                  category: o.partCategory ?? "",
                  color: "#cc0000",
                  size: 30
                }), (0, i.jsx)("span", {
                  className: "absolute -right-2 -top-2 w-5 h-5 bg-[#333333] text-white rounded-full flex items-center justify-center font-sans text-[10px]",
                  children: T
                })]
              }), (0, i.jsxs)("div", {
                className: "min-w-0 flex-1",
                children: [(0, i.jsx)("p", {
                  className: "font-sans text-sm leading-snug",
                  children: o.name
                }), (0, i.jsx)("p", {
                  className: "font-sans text-[10px] text-[#777777] mt-1",
                  children: c ?
                    `Automotive service \xB7 ${o.duration}` : ha
                    .find(y => y.id === o.partCategory)
                    ?.label
                })]
              }), (0, i.jsxs)("p", {
                className: "font-sans text-sm whitespace-nowrap",
                children: ["\u20B1", (o.price * T)
                  .toLocaleString()
                ]
              })]
            }, `checkout-${o.id}`))
          }), (0, i.jsxs)("div", {
            className: "flex gap-2 mt-7",
            children: [(0, i.jsx)("input", {
              value: x,
              onChange: o => {
                O(o.target.value), H("")
              },
              placeholder: "Discount code",
              className: "flex-1 min-w-0 rounded-lg border border-[#d7d7d7] bg-white px-3 py-3 font-sans text-sm outline-none focus:border-[#111111]"
            }), (0, i.jsx)("button", {
              onClick: () => H(x ?
                "This code is not available for the current order." :
                "Enter a discount code first."),
              className: "rounded-lg bg-[#e9e9e9] px-4 font-sans text-sm font-bold text-[#666666] hover:bg-[#dddddd]",
              children: "Apply"
            })]
          }), j && (0, i.jsx)("p", {
            className: "font-sans text-[11px] text-[#777777] mt-2",
            children: j
          }), (0, i.jsxs)("div", {
            className: "border-t border-[#dddddd] mt-7 pt-5 space-y-3",
            children: [(0, i.jsxs)("div", {
              className: "flex justify-between font-sans text-sm",
              children: [(0, i.jsxs)("span", {
                children: ["Subtotal \xB7 ", A.reduce((o, T) =>
                  o + T.qty, 0), " items"]
              }), (0, i.jsxs)("span", {
                children: ["\u20B1", e.toLocaleString()]
              })]
            }), (0, i.jsxs)("div", {
              className: "flex justify-between font-sans text-sm",
              children: [(0, i.jsx)("span", {
                children: c ? "Service location" : "Shipping"
              }), (0, i.jsx)("span", {
                className: "text-[#666666]",
                children: c ? "G Spot Automotive" : "Free"
              })]
            }), (0, i.jsxs)("div", {
              className: "border-t border-[#dddddd] pt-4 flex justify-between items-end font-sans",
              children: [(0, i.jsx)("strong", {
                className: "text-lg",
                children: "Total"
              }), (0, i.jsxs)("span", {
                children: [(0, i.jsx)("span", {
                  className: "text-xs text-[#777777] mr-2",
                  children: "PHP"
                }), (0, i.jsxs)("strong", {
                  className: "text-xl",
                  children: ["\u20B1", e.toLocaleString()]
                })]
              })]
            })]
          })]
        })]
      })]
    })
  }

  function p0({
    total: A,
    onBack: t,
    onComplete: a
  }) {
    let [c, u] = (0, f.useState)(""), [e, l] = (0, f.useState)(""), [n, r] = (0, f.useState)(""),
    [I, p] = (0, f.useState)(""), [q, R] = (0, f.useState)(!1), d = (0, f.useRef)(null), S = (0, f
      .useRef)(null), N = (0, f.useRef)(null);
    (0, f.useEffect)(() => (S.current?.focus(), () => {
      d.current && clearTimeout(d.current)
    }), []);
    let x = j => {
      if (j.preventDefault(), q) return;
      let H = c.replace(/\D/g, "");
      if (!["4242424242424242", "5555555555554444", "378282246310005", "3530111333300000"]
        .includes(H)) {
        p("Use a demo card, such as 4242 4242 4242 4242. Real cards are not accepted.");
        return
      }
      let E = e.match(/^(\d{2})\/(\d{2})$/),
        s = new Date;
      if (!E || +E[1] < 1 || +E[1] > 12 || (2e3 + +E[2]) * 12 + +E[1] < s.getFullYear() * 12 + s
        .getMonth() + 1) {
        p("Enter a valid future expiry date (MM/YY).");
        return
      }
      if (!new RegExp(H.startsWith("37") ? "^\\d{4}$" : "^\\d{3}$").test(n)) {
        p(H.startsWith("37") ? "Enter a 4-digit test security code." :
          "Enter a 3-digit test security code.");
        return
      }
      p(""), R(!0), d.current = setTimeout(() => {
        u(""), l(""), r(""), a()
      }, 1e3)
    };
    return (0, i.jsx)("div", {
      className: "fixed inset-0 z-[10000] bg-black/70 flex items-center justify-center p-4",
      onKeyDown: j => {
        if (j.key === "Escape" && !q) {
          t();
          return
        }
        if (j.key !== "Tab") return;
        let H = N.current?.querySelectorAll("button:not(:disabled),input:not(:disabled)");
        if (!H?.length) return;
        let E = H[0],
          s = H[H.length - 1];
        j.shiftKey && document.activeElement === E ? (j.preventDefault(), s.focus()) : !j
          .shiftKey && document.activeElement === s && (j.preventDefault(), E.focus())
      },
      children: (0, i.jsxs)("div", {
        ref: N,
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "card-title",
        className: "w-full max-w-lg rounded-2xl bg-[#111111] text-white p-5 sm:p-7 shadow-2xl max-h-[90dvh] overflow-y-auto",
        children: [(0, i.jsxs)("div", {
          className: "flex items-center justify-between gap-4 mb-2",
          children: [(0, i.jsx)("h2", {
            id: "card-title",
            className: "font-sans text-xl font-bold",
            children: "Card payment"
          }), (0, i.jsx)("button", {
            type: "button",
            "aria-label": "Close card payment",
            onClick: t,
            disabled: q,
            className: "text-white text-xl px-2 disabled:opacity-30",
            children: "\xD7"
          })]
        }), (0, i.jsxs)("p", {
          className: "text-sm !text-[#bbbbbb] mb-5",
          children: ["Amount due ", (0, i.jsxs)("strong", {
            className: "text-white",
            children: ["\u20B1", A.toLocaleString()]
          })]
        }), (0, i.jsx)("p", {
          className: "text-xs !text-[#cccccc] mb-5",
          children: "Demo only \u2014 no charge. Use 4242 4242 4242 4242, a future expiry date, and 123. Do not enter real card details."
        }), (0, i.jsxs)("form", {
          onSubmit: x,
          noValidate: !0,
          children: [(0, i.jsx)("label", {
            className: "block text-xs !text-[#cccccc] mb-2",
            htmlFor: "card-number",
            children: "Card number"
          }), (0, i.jsxs)("div", {
            className: "relative mb-4",
            children: [(0, i.jsx)("input", {
              ref: S,
              id: "card-number",
              "aria-label": "Card number",
              autoComplete: "off",
              inputMode: "numeric",
              disabled: q,
              value: c,
              onChange: j => u(j.target.value.replace(/\D/g, "").slice(
                0, 16).replace(/(.{4})/g, "$1 ").trim()),
              placeholder: "Card number",
              className: "w-full rounded-2xl border border-[#444444] !bg-[#303030] !text-white px-4 pt-4 pb-11 text-sm outline-none focus:!border-white"
            }), (0, i.jsx)("div", {
              className: "absolute bottom-3 left-4 flex gap-1",
              "aria-hidden": "true",
              children: ["Mastercard", "VISA", "AMEX", "JCB"].map(j => (
                0, i.jsx)("span", {
                className: "rounded bg-[#135c91] px-2 py-0.5 text-[9px] font-bold text-white",
                children: j
              }, j))
            })]
          }), (0, i.jsxs)("div", {
            className: "grid grid-cols-2 gap-3",
            children: [(0, i.jsxs)("div", {
              children: [(0, i.jsx)("label", {
                className: "block text-xs !text-[#cccccc] mb-2",
                htmlFor: "card-expiry",
                children: "Expiry date"
              }), (0, i.jsx)("input", {
                id: "card-expiry",
                autoComplete: "off",
                inputMode: "numeric",
                disabled: q,
                value: e,
                onChange: j => {
                  let H = j.target.value.replace(/\D/g, "")
                    .slice(0, 4);
                  l(H.length > 2 ? H.slice(0, 2) + "/" + H
                    .slice(2) : H)
                },
                placeholder: "MM/YY",
                className: "w-full rounded-2xl border border-[#444444] !bg-[#303030] !text-white p-4 text-sm outline-none focus:!border-white"
              })]
            }), (0, i.jsxs)("div", {
              children: [(0, i.jsx)("label", {
                className: "block text-xs !text-[#cccccc] mb-2",
                htmlFor: "card-code",
                children: "Security code"
              }), (0, i.jsx)("input", {
                id: "card-code",
                autoComplete: "off",
                type: "password",
                inputMode: "numeric",
                disabled: q,
                value: n,
                onChange: j => r(j.target.value.replace(/\D/g, "")
                  .slice(0, 4)),
                placeholder: "CVC / CVV",
                className: "w-full rounded-2xl border border-[#444444] !bg-[#303030] !text-white p-4 text-sm outline-none focus:!border-white"
              })]
            })]
          }), (0, i.jsx)("p", {
            className: "mt-4 text-xs text-[#aaaaaa]",
            children: "Card details are not saved. Saving a payment method requires a connected payment provider."
          }), I && (0, i.jsx)("p", {
            role: "alert",
            className: "mt-4 text-sm text-[#fca5a5]",
            children: I
          }), (0, i.jsx)("button", {
            type: "submit",
            disabled: q,
            className: "w-full mt-6 rounded-xl bg-[#cc0000] py-4 text-white text-sm font-bold hover:bg-[#a90000] disabled:opacity-50",
            children: q ?
              "Processing demo payment\u2026" : `Pay \u20B1${A.toLocaleString()} \xB7 Demo`
          }), (0, i.jsx)("button", {
            type: "button",
            onClick: t,
            disabled: q,
            className: "w-full mt-3 py-2 text-sm !text-[#cccccc] disabled:opacity-30",
            children: "Back to payment options"
          })]
        })]
      })
    })
  }

  function R0({
    ticket: A,
    onDone: t
  }) {
    let [a, c] = (0, f.useState)(A.carInfo.email || ""), [u, e] = (0, f.useState)("idle"), l = A
      .mode === "service" || A.services.length > 0, n = JSON.stringify({
        ticket: A.ticketNumber,
        owner: A.carInfo.ownerName,
        vehicle: `${A.carInfo.year} ${A.carInfo.make} ${A.carInfo.model}`,
        plate: A.carInfo.plate,
        type: l ? "service" : "parts",
        items: l ? A.services.map(p => p.name) : [...new Set(A.parts.map(p => p.name))],
        total: A.estimatedTotal,
        date: A.createdAt
      }), r = () => {
        !a || u === "sending" || u === "sent" || (e("sending"), setTimeout(() => {
          a.includes("@") ? e("sent") : e("error")
        }, 1800))
      }, I = A.parts;
    return (0, i.jsx)("div", {
      className: "flex flex-col items-center justify-start sm:justify-center min-h-full px-4 sm:px-8 py-8 sm:py-12 text-center",
      children: (0, i.jsxs)("div", {
        className: "w-full max-w-sm",
        children: [(0, i.jsxs)("div", {
          className: "mb-6",
          children: [(0, i.jsx)("div", {
            className: "w-16 h-16 bg-[#22c55e] flex items-center justify-center mx-auto mb-4",
            children: (0, i.jsx)("svg", {
              width: "32",
              height: "32",
              viewBox: "0 0 32 32",
              fill: "none",
              children: (0, i.jsx)("path", {
                d: "M6 16l8 8L26 8",
                stroke: "white",
                strokeWidth: "3",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })
          }), (0, i.jsx)("p", {
            className: "font-mono text-[#22c55e] tracking-widest text-sm mb-2",
            children: "TICKET CREATED SUCCESSFULLY"
          }), (0, i.jsx)("h2", {
            className: "font-mono text-5xl font-black text-[#f0f0f0] mb-1 print-ticket-number",
            children: A.ticketNumber
          }), (0, i.jsx)("p", {
            className: "font-sans text-[#555555] text-sm",
            children: "Show this ticket number or QR code at the counter"
          })]
        }), (0, i.jsx)("div", {
          className: "bg-white p-6 mb-5 inline-block print-qr",
          children: (0, i.jsx)(oe, {
            value: n,
            size: 180,
            level: "M"
          })
        }), (0, i.jsxs)("div", {
          className: "border border-[#2e2e2e] bg-[#141414] p-5 text-left mb-5 print-summary",
          children: [(0, i.jsx)("p", {
            className: "font-mono text-[#555555] text-xs tracking-widest mb-3",
            children: "TICKET SUMMARY"
          }), (0, i.jsxs)("div", {
            className: "space-y-2 text-sm",
            children: [(0, i.jsx)(va, {
              label: "TYPE",
              value: l ? "Automotive Service" : "Parts Purchase"
            }), l && (0, i.jsxs)(i.Fragment, {
              children: [(0, i.jsx)(va, {
                label: "CUSTOMER",
                value: A.carInfo.ownerName
              }), (0, i.jsx)(va, {
                label: "VEHICLE",
                value: `${A.carInfo.year} ${A.carInfo.make} ${A.carInfo.model}`
              }), (0, i.jsx)(va, {
                label: "PLATE",
                value: A.carInfo.plate
              })]
            }), l && A.services.length > 0 && (0, i.jsx)(va, {
              label: "SERVICE",
              value: A.services[0].name
            }), !l && I.length > 0 && (0, i.jsx)(va, {
              label: "PARTS",
              value: `${I.length} item${I.length!==1?"s":""}`
            }), (0, i.jsx)(va, {
              label: "PAYMENT",
              value: A.paymentMethod === "card" ?
                "Card \u2014 demo payment" : A.paymentMethod ===
                "kiosk" ? "Paid digitally" : "Cash at Counter"
            }), (0, i.jsx)(va, {
              label: "DATE",
              value: new Date(A.createdAt).toLocaleString()
            }), (0, i.jsxs)("div", {
              className: "border-t border-[#2e2e2e] pt-2 mt-2 flex justify-between",
              children: [(0, i.jsx)("span", {
                className: "font-mono text-[#555555] text-xs",
                children: "TOTAL"
              }), (0, i.jsxs)("span", {
                className: "font-mono text-[#cc0000] font-bold",
                children: ["\u20B1", A.estimatedTotal
                  .toLocaleString()
                ]
              })]
            }), (0, i.jsxs)("div", {
              className: "flex justify-between items-center",
              children: [(0, i.jsx)("span", {
                className: "font-mono text-[#555555] text-xs",
                children: "STATUS"
              }), (0, i.jsx)("span", {
                className: "font-mono text-[#f59e0b] text-xs px-2 py-0.5 bg-[#1a1000] border border-[#7a4a00]",
                children: "WAITING"
              })]
            })]
          })]
        }), (0, i.jsxs)("div", {
          className: "flex flex-col gap-3 mb-5 no-print",
          children: [(0, i.jsxs)("div", {
            className: "border border-[#2e2e2e] bg-[#141414] p-4",
            children: [(0, i.jsx)("p", {
              className: "font-mono text-[#555555] text-xs tracking-widest mb-3 text-left",
              children: "SEND TO EMAIL"
            }), (0, i.jsxs)("div", {
              className: "flex gap-2",
              children: [(0, i.jsx)("input", {
                type: "email",
                value: a,
                onChange: p => {
                  c(p.target.value), e("idle")
                },
                placeholder: "your@email.com",
                disabled: u === "sent",
                className: "flex-1 bg-[#0a0a0a] border border-[#2e2e2e] text-[#f0f0f0] font-sans px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000] transition-colors placeholder:text-[#333333] disabled:opacity-50"
              }), (0, i.jsx)("button", {
                onClick: r,
                disabled: !a || u === "sending" || u === "sent",
                className: `px-4 py-2.5 font-mono text-xs tracking-widest font-bold transition-all disabled:cursor-not-allowed whitespace-nowrap ${u==="sent"?"bg-[#22c55e] text-white":u==="error"?"bg-[#ef4444] text-white":"bg-[#cc0000] text-white hover:bg-[#e00000] disabled:opacity-40"}`,
                children: u === "sending" ?
                  "SENDING\u2026" : u === "sent" ?
                  "\u2713 SENT" : u === "error" ?
                  "RETRY" : "SEND \u2192"
              })]
            }), u === "sent" && (0, i.jsxs)("p", {
              className: "font-sans text-[#22c55e] text-xs mt-2 text-left",
              children: ["Ticket sent to ", a]
            }), u === "error" && (0, i.jsx)("p", {
              className: "font-sans text-[#ef4444] text-xs mt-2 text-left",
              children: "Invalid email address. Please try again."
            })]
          }), (0, i.jsxs)("button", {
            onClick: () => window.print(),
            className: "w-full py-3.5 font-mono font-bold tracking-widest text-[#e8e8e8] border border-[#e8e8e8] hover:bg-[#e8e8e8] hover:text-[#0a0a0a] active:scale-[0.98] transition-all flex items-center justify-center gap-2",
            children: [(0, i.jsx)("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "currentColor",
              children: (0, i.jsx)("path", {
                d: "M4 1h8v3H4V1zM2 5h12a1 1 0 011 1v5a1 1 0 01-1 1h-1v2H3v-2H2a1 1 0 01-1-1V6a1 1 0 011-1zm1 2v2h10V7H3zm9 4H4v2h8v-2z"
              })
            }), "PRINT TICKET"]
          })]
        }), (0, i.jsx)("p", {
          className: "font-sans text-[#444444] text-sm mb-6 no-print",
          children: l ?
            "Your service request has been sent to the manager. You will be notified when your vehicle is ready." : "Your parts order has been sent to the counter. Manager will prepare your items shortly."
        }), (0, i.jsx)("button", {
          onClick: t,
          className: "w-full py-5 font-mono font-bold tracking-widest text-[#cc0000] border-2 border-[#cc0000] hover:bg-[#cc0000] hover:text-white transition-colors no-print",
          children: "DONE \u2014 START NEW"
        })]
      })
    })
  }

  function j0(A) {
    let t = A.toLowerCase();
    for (let a of r0)
      if (a.match.some(c => t.includes(c))) return a.reply;
    return d0
  }

  function b0({
    onClose: A
  }) {
    let [t, a] = (0, f.useState)("call"), [c, u] = (0, f.useState)(!1), [e, l] = (0, f.useState)(
  [{
      id: 0,
      from: "bot",
      text: `Hi! I'm ${Qb}, your G Spot assistant. Ask me anything about our services, pricing, wait times, or payments.`
    }]), [n, r] = (0, f.useState)(""), [I, p] = (0, f.useState)(!1), q = (0, f.useRef)(null), R =
      (0, f.useRef)(null), d = (0, f.useRef)(1);
    (0, f.useEffect)(() => {
      q.current?.scrollIntoView({
        behavior: "smooth"
      })
    }, [e, I]);
    let S = () => {
      let N = n.trim();
      !N || I || (r(""), l(x => [...x, {
        id: d.current++,
        from: "user",
        text: N
      }]), p(!0), setTimeout(() => {
        l(x => [...x, {
          id: d.current++,
          from: "bot",
          text: j0(N)
        }]), p(!1), setTimeout(() => R.current?.focus(), 50)
      }, 900 + Math.random() * 600))
    };
    return (0, i.jsx)("div", {
      className: "fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4",
      onClick: A,
      children: (0, i.jsxs)("div", {
        className: "bg-[#141414] border border-[#e8e8e8] w-full max-w-sm flex flex-col",
        style: {
          maxHeight: "90vh"
        },
        onClick: N => N.stopPropagation(),
        children: [(0, i.jsxs)("div", {
          className: "flex items-center justify-between px-5 py-4 border-b border-[#2e2e2e]",
          children: [(0, i.jsx)("span", {
            className: "font-mono text-[#e8e8e8] tracking-widest font-bold text-sm",
            children: "CUSTOMER SERVICE"
          }), (0, i.jsx)("button", {
            onClick: A,
            className: "text-[#555555] hover:text-[#f0f0f0] font-mono text-lg leading-none",
            children: "\u2715"
          })]
        }), (0, i.jsx)("div", {
          className: "flex border-b border-[#2e2e2e]",
          children: ["call", "chat"].map(N => (0, i.jsx)("button", {
            onClick: () => a(N),
            className: `flex-1 font-mono text-xs tracking-widest py-3 transition-colors ${t===N?"text-[#e8e8e8] border-b-2 border-[#e8e8e8] bg-[#1a1a1a]":"text-[#444444] hover:text-[#888888]"}`,
            children: N === "call" ? "CALL MANAGER" : "AI CHAT"
          }, N))
        }), t === "call" && (0, i.jsxs)("div", {
          className: "p-6 text-center",
          children: [(0, i.jsx)("div", {
            className: "text-5xl mb-4",
            children: "\u{1F4DE}"
          }), (0, i.jsx)("p", {
            className: "font-sans text-[#f0f0f0] text-lg font-semibold mb-1",
            children: "Need assistance?"
          }), (0, i.jsx)("p", {
            className: "font-sans text-[#888888] text-sm mb-6",
            children: "A service advisor will come to help you right away."
          }), (0, i.jsxs)("div", {
            className: "bg-[#0a0a0a] border border-[#2e2e2e] p-4 mb-5",
            children: [(0, i.jsx)("p", {
              className: "font-mono text-[#555555] text-xs tracking-widest mb-1",
              children: "FRONT DESK"
            }), (0, i.jsx)("p", {
              className: "font-mono text-[#e8e8e8] text-2xl font-bold",
              children: "EXT. 100"
            })]
          }), c ? (0, i.jsx)("div", {
            className: "py-3 border border-[#22c55e] bg-[#001a0a] font-mono text-[#22c55e] text-sm tracking-widest",
            children: "\u2713 MANAGER ALERTED"
          }) : (0, i.jsx)("button", {
            onClick: () => u(!0),
            className: "w-full py-4 bg-[#e8e8e8] text-[#0a0a0a] font-mono font-bold tracking-widest hover:bg-[#ffe033] active:scale-[0.98] transition-all",
            children: "ALERT MANAGER \u2192"
          })]
        }), t === "chat" && (0, i.jsxs)("div", {
          className: "flex flex-col flex-1 min-h-0",
          children: [(0, i.jsxs)("div", {
            className: "flex items-center gap-2.5 px-4 py-2.5 border-b border-[#1e1e1e] bg-[#0f0f0f]",
            children: [(0, i.jsx)("div", {
              className: "w-7 h-7 bg-[#cc0000] flex items-center justify-center font-mono text-white text-xs font-bold",
              children: "AI"
            }), (0, i.jsxs)("div", {
              children: [(0, i.jsx)("p", {
                className: "font-mono text-[#f0f0f0] text-xs font-bold",
                children: Qb
              }), (0, i.jsx)("p", {
                className: "font-sans text-[#22c55e] text-[10px]",
                children: "\u25CF Online"
              })]
            })]
          }), (0, i.jsxs)("div", {
            className: "flex-1 overflow-y-auto px-4 py-4 space-y-3",
            style: {
              minHeight: 0
            },
            children: [e.map(N => (0, i.jsxs)("div", {
              className: `flex ${N.from==="user"?"justify-end":"justify-start"}`,
              children: [N.from === "bot" && (0, i.jsx)("div", {
                className: "w-6 h-6 bg-[#cc0000] flex items-center justify-center font-mono text-white text-[9px] font-bold mr-2 mt-0.5 flex-shrink-0",
                children: "AI"
              }), (0, i.jsx)("div", {
                className: `max-w-[78%] px-3 py-2.5 text-sm font-sans leading-relaxed ${N.from==="user"?"bg-[#cc0000] text-white":"bg-[#1e1e1e] text-[#cccccc] border border-[#2e2e2e]"}`,
                children: N.text
              })]
            }, N.id)), I && (0, i.jsxs)("div", {
              className: "flex justify-start items-center gap-2",
              children: [(0, i.jsx)("div", {
                className: "w-6 h-6 bg-[#cc0000] flex items-center justify-center font-mono text-white text-[9px] font-bold flex-shrink-0",
                children: "AI"
              }), (0, i.jsx)("div", {
                className: "bg-[#1e1e1e] border border-[#2e2e2e] px-4 py-3 flex gap-1",
                children: [0, 1, 2].map(N => (0, i.jsx)("div", {
                  className: "w-1.5 h-1.5 bg-[#555555] rounded-full animate-bounce",
                  style: {
                    animationDelay: `${N*.15}s`
                  }
                }, N))
              })]
            }), (0, i.jsx)("div", {
              ref: q
            })]
          }), (0, i.jsx)("div", {
            className: "px-4 pb-2 flex gap-1.5 flex-wrap",
            children: ["Wait time?", "Pricing?", "Hours?", "Payment options?"]
              .map(N => (0, i.jsx)("button", {
                onClick: () => {
                  r(N), setTimeout(() => R.current?.focus(), 0)
                },
                className: "font-mono text-[10px] tracking-wide px-2.5 py-1 border border-[#2e2e2e] text-[#555555] hover:border-[#cc0000] hover:text-[#cc0000] transition-colors",
                children: N
              }, N))
          }), (0, i.jsxs)("div", {
            className: "flex border-t border-[#2e2e2e]",
            children: [(0, i.jsx)("input", {
              ref: R,
              type: "text",
              value: n,
              onChange: N => r(N.target.value),
              onKeyDown: N => N.key === "Enter" && S(),
              placeholder: "Type a question\u2026",
              className: "flex-1 bg-[#0a0a0a] text-[#f0f0f0] font-sans text-sm px-4 py-3.5 focus:outline-none placeholder:text-[#333333]"
            }), (0, i.jsx)("button", {
              onClick: S,
              disabled: !n.trim() || I,
              className: "px-5 bg-[#cc0000] text-white font-mono text-xs font-bold tracking-widest hover:bg-[#e00000] disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
              children: "SEND"
            })]
          })]
        })]
      })
    })
  }

  function Ue({
    label: A,
    value: t,
    onChange: a,
    placeholder: c,
    type: u = "text",
    maxLength: e,
    className: l = ""
  }) {
    return (0, i.jsxs)("div", {
      className: l,
      children: [(0, i.jsx)("label", {
        className: "block font-mono text-[#555555] text-xs tracking-widest mb-1.5",
        children: A
      }), (0, i.jsx)("input", {
        type: u,
        value: t,
        onChange: a,
        placeholder: c,
        maxLength: e,
        className: "w-full bg-[#141414] border border-[#2e2e2e] text-[#f0f0f0] font-sans px-4 py-3 focus:outline-none focus:border-[#cc0000] transition-colors placeholder:text-[#333333] text-base"
      })]
    })
  }

  function Bb({
    label: A,
    value: t,
    onChange: a,
    options: c
  }) {
    return (0, i.jsxs)("div", {
      children: [(0, i.jsx)("label", {
        className: "block font-mono text-[#555555] text-xs tracking-widest mb-1.5",
        children: A
      }), (0, i.jsxs)("select", {
        value: t,
        onChange: a,
        className: "w-full bg-[#141414] border border-[#2e2e2e] text-[#f0f0f0] font-sans px-4 py-3 focus:outline-none focus:border-[#cc0000] transition-colors appearance-none text-base",
        children: [(0, i.jsx)("option", {
          value: "",
          children: "Select\u2026"
        }), c.map(u => (0, i.jsx)("option", {
          value: u,
          children: u
        }, u))]
      })]
    })
  }

  function hb({
    title: A,
    sub: t
  }) {
    return (0, i.jsxs)("div", {
      className: "mb-6 sm:mb-8",
      children: [(0, i.jsx)("h2", {
        className: "font-mono text-2xl sm:text-3xl font-black text-[#f0f0f0] tracking-tight mb-1",
        children: A
      }), (0, i.jsx)("p", {
        className: "font-sans text-[#666666]",
        children: t
      }), (0, i.jsx)("div", {
        className: "mt-3 w-12 h-0.5 bg-[#cc0000]"
      })]
    })
  }

  function Eu({
    label: A,
    value: t,
    accent: a
  }) {
    return t ? (0, i.jsxs)("div", {
      className: "flex gap-2",
      children: [(0, i.jsxs)("span", {
        className: "font-mono text-[#444444] text-xs w-20 flex-shrink-0",
        children: [A, ":"]
      }), (0, i.jsx)("span", {
        className: `text-sm ${a?"font-mono text-[#cc0000] font-bold":"font-sans text-[#cccccc]"}`,
        children: t
      })]
    }) : null
  }

  function va({
    label: A,
    value: t
  }) {
    return (0, i.jsxs)("div", {
      className: "flex justify-between gap-3",
      children: [(0, i.jsx)("span", {
        className: "font-mono text-[#555555] text-xs",
        children: A
      }), (0, i.jsx)("span", {
        className: "font-sans text-[#cccccc] text-sm text-right",
        children: t
      })]
    })
  }

  function fq({
    className: A = "",
    size: t = 16
  }) {
    return (0, i.jsx)("svg", {
      width: t,
      height: t,
      viewBox: "0 0 16 16",
      fill: "currentColor",
      className: A,
      children: (0, i.jsx)("path", {
        d: "M0 1.5A.5.5 0 01.5 1H2a.5.5 0 01.485.379L2.89 3H14.5a.5.5 0 01.491.592l-1.5 8A.5.5 0 0113 12H4a.5.5 0 01-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 01-.5-.5zM5 13a1 1 0 100 2 1 1 0 000-2zm-2.987 0H3.5a1 1 0 011 1h3a1 1 0 011-1H12a1 1 0 110 2H3a1 1 0 01-1-1 1 1 0 110-2h.013z"
      })
    })
  }

  function Su({
    category: A,
    color: t,
    size: a = 28
  }) {
    let c = a;
    return (0, i.jsx)("svg", {
      width: c,
      height: c,
      viewBox: "0 0 24 24",
      fill: "none",
      children: {
        engine: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("path", {
            d: "M4 10h2v4H4zM10 10h2v4h-2zM6 8h4M6 16h4M14 10h2v4h-2zM2 12h2M14 12h2",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }), (0, i.jsx)("rect", {
            x: "4",
            y: "6",
            width: "10",
            height: "12",
            rx: "1",
            stroke: t,
            strokeWidth: "1.5"
          })]
        }),
        brakes: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("circle", {
            cx: "12",
            cy: "12",
            r: "8",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("circle", {
            cx: "12",
            cy: "12",
            r: "4",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("path", {
            d: "M12 4v4M12 16v4M4 12h4M16 12h4",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinecap: "round"
          })]
        }),
        tires: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("circle", {
            cx: "12",
            cy: "12",
            r: "8",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("circle", {
            cx: "12",
            cy: "12",
            r: "3",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("path", {
            d: "M12 4v2M12 18v2M4 12h2M18 12h2M6.34 6.34l1.42 1.42M16.24 16.24l1.42 1.42M6.34 17.66l1.42-1.42M16.24 7.76l1.42-1.42",
            stroke: t,
            strokeWidth: "1.2",
            strokeLinecap: "round"
          })]
        }),
        batteries: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("rect", {
            x: "3",
            y: "7",
            width: "14",
            height: "10",
            rx: "1",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("path", {
            d: "M17 10h3M7 4v3M11 4v3M7 17v3M11 17v3M7 12h4M9 10v4",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinecap: "round"
          })]
        }),
        filters: (0, i.jsx)(i.Fragment, {
          children: (0, i.jsx)("path", {
            d: "M4 5h14l-5 7v5l-4-2v-3L4 5z",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinejoin: "round"
          })
        }),
        lights: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("circle", {
            cx: "12",
            cy: "10",
            r: "4",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("path", {
            d: "M12 14v4M9 17h6M8.5 6.5L6 4M15.5 6.5L18 4M5 10H2M19 10h3M12 2V0",
            stroke: t,
            strokeWidth: "1.2",
            strokeLinecap: "round"
          })]
        }),
        suspension: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("path", {
            d: "M8 4v6M14 4v6M6 10h10M7 14h8M12 10v4",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinecap: "round"
          }), (0, i.jsx)("circle", {
            cx: "8",
            cy: "16",
            r: "2",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("circle", {
            cx: "14",
            cy: "16",
            r: "2",
            stroke: t,
            strokeWidth: "1.5"
          })]
        }),
        fluids: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("path", {
            d: "M12 3L8 9h8L12 3z",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinejoin: "round"
          }), (0, i.jsx)("rect", {
            x: "9",
            y: "9",
            width: "6",
            height: "9",
            rx: "2",
            stroke: t,
            strokeWidth: "1.5"
          }), (0, i.jsx)("path", {
            d: "M10 13h4",
            stroke: t,
            strokeWidth: "1.2",
            strokeLinecap: "round"
          })]
        }),
        accessories: (0, i.jsxs)(i.Fragment, {
          children: [(0, i.jsx)("path", {
            d: "M5 5l2 2 3-3M5 12l2 2 3-3M5 19l2 2 3-3",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), (0, i.jsx)("path", {
            d: "M13 6h6M13 13h6M13 20h6",
            stroke: t,
            strokeWidth: "1.5",
            strokeLinecap: "round"
          })]
        })
      } [A] ?? (0, i.jsx)("circle", {
        cx: "12",
        cy: "12",
        r: "6",
        stroke: t,
        strokeWidth: "1.5"
      })
    })
  }
  var f, i, gb, i0, Qb, r0, d0, vb = z(() => {
    f = GA(ja());
    Tq();
    se();
    i = GA(Wt()), gb = {
      ownerName: "",
      phone: "",
      email: "",
      make: "",
      model: "",
      year: "",
      plate: "",
      color: "",
      mileage: "",
      vin: ""
    };
    i0 = {
      engine: "#cc0000",
      brakes: "#ef4444",
      tires: "#888888",
      batteries: "#e8c832",
      filters: "#22c55e",
      lights: "#3b82f6",
      suspension: "#a855f7",
      fluids: "#06b6d4",
      accessories: "#f59e0b"
    };
    Qb = "SERV-AI", r0 = [{
        match: ["hour", "open", "close", "time"],
        reply: "We are open Monday\u2013Saturday 7 AM \u2013 6 PM and Sunday 9 AM \u2013 3 PM."
      }, {
        match: ["price", "cost", "how much", "fee", "charge"],
        reply: "Pricing varies by service or part. You can view all prices during check-in, or ask a manager member for a custom quote."
      }, {
        match: ["wait", "long", "how long", "duration"],
        reply: "Most services take 1\u20133 hours. Oil changes are typically done within 45 minutes. We will notify you when your vehicle is ready."
      }, {
        match: ["cancel", "reschedule"],
        reply: "To cancel or reschedule, please speak with a manager member at the front desk or call EXT. 100."
      }, {
        match: ["pay", "payment", "cash", "card"],
        reply: "We accept credit/debit cards and cash. You can also pay securely using the contactless payment reader."
      }, {
        match: ["part", "parts", "stock"],
        reply: "We stock OEM and aftermarket parts. Browse our full catalog in the Buy Parts section. If a part needs ordering, our team will notify you."
      }, {
        match: ["hello", "hi", "hey", "good"],
        reply: "Hello! I'm SERV-AI, your G Spot assistant. How can I help you today?"
      }, {
        match: ["thank", "thanks"],
        reply: "You're welcome! Is there anything else I can help you with?"
      }, {
        match: ["bye", "done", "goodbye"],
        reply: "Thanks for visiting G Spot. Have a great day!"
      }], d0 =
      "I'm not sure about that one. For complex questions, please alert a manager member \u2014 they'll be happy to assist you right away."
  });
  var Cb, Mb = z(() => {
    Cb = {
      src: "assets/images/image-35.jpg"
    }
  });

  function zq({
    liveTickets: A,
    inventory: t,
    setInventory: a,
    ticketStatusOverrides: c,
    onTicketStatusChange: u,
    initialManagerId: e,
    onSignOut: l
  }) {
    let [n, r] = (0, tA.useState)(() => Fb.find(y => y.id === e) ?? null), [I, p] = (0, tA
      .useState)([...Lb]), [q, R] = (0, tA.useState)(null), [d, S] = (0, tA.useState)("all"), [N,
      x
    ] = (0, tA.useState)("tickets"), [O, j] = (0, tA.useState)(!1);
    if (!n) return (0, V.jsx)(x0, {
      onLogin: r
    });
    let H = y => c[y.ticketNumber] ? {
        ...y,
        status: c[y.ticketNumber]
      } : y,
      E = [...A.filter(y => !I.find(G => G.ticketNumber === y.ticketNumber)), ...I].map(H),
      s = d === "all" ? E : E.filter(y => y.status === d),
      P = {
        all: E.length,
        pending: E.filter(y => y.status === "pending").length,
        "in-progress": E.filter(y => y.status === "in-progress").length,
        ready: E.filter(y => y.status === "ready").length,
        completed: E.filter(y => y.status === "completed").length
      },
      k = y => {
        p(G => G.map(DA => DA.ticketNumber === y.ticketNumber ? y : DA)), R(y)
      },
      o = (y, G) => {
        let DA = {
          ...y,
          status: G
        };
        k(DA), u(y.ticketNumber, G)
      },
      T = q ? E.find(y => y.ticketNumber === q.ticketNumber) ?? q : null;
    return (0, V.jsxs)("div", {
      className: "h-full bg-[#0a0a0a] flex flex-col overflow-hidden",
      children: [(0, V.jsxs)("header", {
        className: "border-b border-[#2e2e2e] bg-[#0d0d0d] px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between gap-3 flex-shrink-0",
        children: [(0, V.jsxs)("div", {
          className: "flex items-center gap-2 sm:gap-4 min-w-0",
          children: [(0, V.jsx)("span", {
            className: "font-mono text-[#cc0000] font-black text-lg tracking-widest",
            children: "G SPOT"
          }), (0, V.jsx)("span", {
            className: "hidden sm:inline text-[#2e2e2e]",
            children: "|"
          }), (0, V.jsx)("span", {
            className: "hidden sm:inline font-mono text-[#555555] text-xs tracking-widest",
            children: "MANAGER DASHBOARD"
          })]
        }), (0, V.jsxs)("div", {
          className: "flex items-center gap-2 lg:gap-6",
          children: [(0, V.jsxs)("div", {
            className: "hidden xl:contents",
            children: [(0, V.jsx)(Si, {
              label: "WAITING",
              value: P.pending,
              color: "#f59e0b"
            }), (0, V.jsx)(Si, {
              label: "IN PROGRESS",
              value: P["in-progress"],
              color: "#3b82f6"
            }), (0, V.jsx)(Si, {
              label: "READY",
              value: P.ready,
              color: "#22c55e"
            }), (0, V.jsx)(Si, {
              label: "DONE",
              value: P.completed,
              color: "#888888"
            })]
          }), (0, V.jsxs)("div", {
            className: "flex gap-1 lg:ml-4",
            children: [(0, V.jsx)("button", {
              onClick: () => x("tickets"),
              className: `font-mono text-[10px] tracking-widest px-3 py-1.5 border transition-colors ${N==="tickets"?"bg-[#cc0000] text-white border-[#cc0000]":"border-[#2e2e2e] text-[#555555] hover:text-[#888888]"}`,
              children: "TICKETS"
            }), (0, V.jsxs)("button", {
              onClick: () => x("inventory"),
              className: `font-mono text-[10px] tracking-widest px-3 py-1.5 border transition-colors ${N==="inventory"?"bg-[#cc0000] text-white border-[#cc0000]":"border-[#2e2e2e] text-[#555555] hover:text-[#888888]"}`,
              children: ["INVENTORY", Object.entries(t).some(([y,
                G]) => G <= 5 && NA.find(DA => DA.id === y)) && (
                0, V.jsx)("span", {
                className: "ml-1.5 bg-[#f59e0b] text-[#0a0a0a] text-[8px] px-1 py-0.5 font-black",
                children: "LOW"
              })]
            })]
          }), (0, V.jsx)("span", {
            className: "hidden lg:inline font-mono text-[#333333] text-xs",
            children: new Date().toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })
          }), (0, V.jsxs)("button", {
            onClick: () => {
              j(y => !y)
            },
            className: "flex items-center gap-2 pl-3 border-l border-[#2e2e2e] hover:opacity-80 transition-opacity",
            children: [(0, V.jsx)("div", {
              className: "w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-black text-[#0a0a0a]",
              style: {
                backgroundColor: n.color
              },
              children: n.initials
            }), (0, V.jsxs)("div", {
              className: "text-left hidden sm:block",
              children: [(0, V.jsx)("p", {
                className: "font-mono text-[#e8e8e8] text-xs leading-none",
                children: n.name.split(" ")[0]
              }), (0, V.jsx)("p", {
                className: "font-mono text-[#555555] text-[10px] leading-none mt-0.5",
                children: n.role
              })]
            })]
          })]
        })]
      }), O && (0, V.jsxs)("div", {
        className: "fixed top-[92px] sm:top-[52px] right-3 z-50 w-[calc(100vw-1.5rem)] max-w-64 bg-[#131313] border border-[#2e2e2e] shadow-2xl",
        children: [(0, V.jsx)("div", {
          className: "p-4 border-b border-[#2e2e2e]",
          children: (0, V.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [(0, V.jsx)("div", {
              className: "w-12 h-12 rounded-full flex items-center justify-center font-mono text-lg font-black text-[#0a0a0a]",
              style: {
                backgroundColor: n.color
              },
              children: n.initials
            }), (0, V.jsxs)("div", {
              children: [(0, V.jsx)("p", {
                className: "font-sans font-semibold text-[#f0f0f0] text-sm",
                children: n.name
              }), (0, V.jsx)("p", {
                className: "font-mono text-xs mt-0.5",
                style: {
                  color: n.color
                },
                children: n.role.toUpperCase()
              })]
            })]
          })
        }), (0, V.jsxs)("div", {
          className: "p-2",
          children: [(0, V.jsxs)("div", {
            className: "px-3 py-2 font-mono text-[#555555] text-[10px] tracking-widest",
            children: ["MANAGER ID: ", n.id.toUpperCase()]
          }), (0, V.jsxs)("button", {
            onClick: () => {
              j(!1), R(null), l ? l() : r(null)
            },
            className: "w-full text-left px-3 py-2.5 font-mono text-xs text-[#ef4444] hover:bg-[#1a0000] transition-colors tracking-widest flex items-center gap-2",
            children: [(0, V.jsx)("span", {
              children: "\u23FB"
            }), " SIGN OUT"]
          })]
        })]
      }), O && (0, V.jsx)("div", {
        className: "fixed inset-0 z-40",
        onClick: () => j(!1)
      }), N === "inventory" && (0, V.jsx)(S0, {
        inventory: t,
        setInventory: a
      }), (0, V.jsxs)("div", {
        className: `flex flex-1 overflow-hidden ${N==="inventory"?"hidden":""}`,
        children: [(0, V.jsxs)("aside", {
          className: `${T?"hidden md:flex":"flex"} w-full md:w-72 border-r border-[#2e2e2e] flex-col overflow-hidden flex-shrink-0`,
          children: [(0, V.jsx)("div", {
            className: "border-b border-[#2e2e2e] px-3 py-2 flex gap-1 flex-wrap",
            children: ["all", "pending", "in-progress", "ready",
              "completed"].map(y => (0, V.jsx)("button", {
              onClick: () => S(y),
              className: `font-mono text-[10px] px-2 py-1 tracking-wider transition-colors ${d===y?"bg-[#cc0000] text-white":"text-[#555555] hover:text-[#888888]"}`,
              children: y === "all" ? `ALL (${P.all})` : y ===
                "in-progress" ? `ACTIVE (${P["in-progress"]})` : y ===
                "ready" ?
                `READY (${P.ready})` : `${y.toUpperCase()} (${P[y]??0})`
            }, y))
          }), (0, V.jsxs)("div", {
            className: "flex-1 overflow-y-auto",
            children: [s.length === 0 && (0, V.jsx)("div", {
              className: "p-8 text-center font-mono text-[#333333] text-sm",
              children: "NO TICKETS"
            }), s.map(y => {
              let G = Ni[y.status],
                DA = T?.ticketNumber === y.ticketNumber;
              return (0, V.jsxs)("button", {
                onClick: () => R(y),
                className: `w-full text-left p-4 border-b border-[#1e1e1e] transition-colors ${DA?"bg-[#1a0000] border-l-2 border-l-[#cc0000]":"hover:bg-[#141414]"}`,
                children: [(0, V.jsxs)("div", {
                  className: "flex items-start justify-between mb-1",
                  children: [(0, V.jsx)("span", {
                    className: "font-mono text-[#f0f0f0] text-sm font-bold",
                    children: y.ticketNumber
                  }), (0, V.jsx)("span", {
                    className: "font-mono text-[10px] px-1.5 py-0.5",
                    style: {
                      color: G.color,
                      background: G.bg,
                      border: `1px solid ${G.border}`
                    },
                    children: G.label
                  })]
                }), (0, V.jsx)("div", {
                  className: "font-sans text-[#888888] text-sm",
                  children: y.carInfo.ownerName
                }), (0, V.jsxs)("div", {
                  className: "font-sans text-[#555555] text-xs mt-0.5",
                  children: [y.carInfo.year, " ", y.carInfo
                    .make, " ", y.carInfo.model
                  ]
                }), (0, V.jsx)("div", {
                  className: "font-mono text-[#333333] text-xs mt-1.5",
                  children: xi(y.createdAt)
                })]
              }, y.ticketNumber)
            })]
          })]
        }), (0, V.jsx)("main", {
          className: `${T?"flex":"hidden md:flex"} flex-1 overflow-hidden flex-col min-w-0`,
          children: T ? (0, V.jsxs)(V.Fragment, {
            children: [(0, V.jsx)("button", {
              onClick: () => R(null),
              className: "md:hidden flex-shrink-0 text-left px-4 py-3 border-b border-[#2e2e2e] font-mono text-xs tracking-widest text-[#888888] bg-[#0d0d0d]",
              children: "\u2190 BACK TO TICKETS"
            }), (0, V.jsx)(V0, {
              ticket: T,
              onUpdate: k,
              onSaveStatus: o
            }, T.ticketNumber)]
          }) : (0, V.jsx)(N0, {})
        })]
      })]
    })
  }

  function V0({
    ticket: A,
    onUpdate: t,
    onSaveStatus: a
  }) {
    let [c, u] = (0, tA.useState)("overview"), [e, l] = (0, tA.useState)(A.notes), [n, r] = (0, tA
      .useState)(A.status), [I, p] = (0, tA.useState)(!1), [q, R] = (0, tA.useState)([]), [d, S] =
    (0, tA.useState)(!1), N = Ni[A.status], x = n !== A.status, O = (o = n) => {
      a(A, o), p(!0), window.setTimeout(() => p(!1), 2e3)
    }, j = () => t({
      ...A,
      notes: e
    });
    (0, tA.useEffect)(() => {
      r(A.status)
    }, [A.status]);
    let H = q.filter(o => o.type === "approval-required" && !o.customerResponse),
      E = JSON.stringify({
        ticket: A.ticketNumber,
        owner: A.carInfo.ownerName,
        plate: A.carInfo.plate
      }),
      s = (o, T) => {
        let y = {
          id: Date.now().toString(),
          message: o,
          type: T,
          sentAt: new Date().toISOString()
        };
        R(G => [y, ...G]), T === "approval-required" && S(!0)
      },
      P = (o, T) => {
        R(y => y.map(G => G.id === T ? {
          ...G,
          customerResponse: o,
          respondedAt: new Date().toISOString()
        } : G)), S(!1)
      },
      k = [{
        id: "overview",
        label: "OVERVIEW"
      }, {
        id: "notifications",
        label: "NOTIFY",
        badge: H.length > 0 ? H.length : void 0
      }];
    return (0, V.jsxs)("div", {
      className: "flex flex-col h-full overflow-hidden",
      children: [(0, V.jsxs)("div", {
        className: "border-b border-[#2e2e2e] bg-[#0d0d0d] px-4 sm:px-6 py-3 sm:py-4 flex items-start sm:items-center justify-between gap-3 flex-shrink-0",
        children: [(0, V.jsxs)("div", {
          children: [(0, V.jsxs)("div", {
            className: "flex items-center gap-3 mb-0.5",
            children: [(0, V.jsx)("h2", {
              className: "font-mono text-lg sm:text-2xl font-black text-[#f0f0f0]",
              children: A.ticketNumber
            }), (0, V.jsx)("span", {
              className: "font-mono text-xs px-2 py-1",
              style: {
                color: N.color,
                background: N.bg,
                border: `1px solid ${N.border}`
              },
              children: N.label
            }), d && (0, V.jsx)("span", {
              className: "font-mono text-xs px-2 py-1 bg-[#1a1500] border border-[#7a6500] text-[#ffd600] animate-pulse",
              children: "AWAITING APPROVAL"
            })]
          }), (0, V.jsxs)("p", {
            className: "font-mono text-[#444444] text-xs line-clamp-2",
            children: [A.carInfo.ownerName, " \xB7 ", A.carInfo.year, " ", A
              .carInfo.make, " ", A.carInfo.model, " \xB7 ", A.carInfo
              .plate, " \xB7 ", xi(A.createdAt)
            ]
          })]
        }), (0, V.jsxs)("div", {
          className: "flex items-center gap-4",
          children: [(0, V.jsxs)("div", {
            className: "text-right",
            children: [(0, V.jsx)("p", {
              className: "font-mono text-[#444444] text-[10px] tracking-widest",
              children: "TOTAL"
            }), (0, V.jsxs)("p", {
              className: "font-mono text-[#cc0000] text-xl font-black",
              children: ["\u20B1", A.estimatedTotal.toLocaleString()]
            })]
          }), (0, V.jsx)("div", {
            className: "hidden sm:block bg-white p-2",
            children: (0, V.jsx)(oe, {
              value: E,
              size: 60,
              level: "M"
            })
          })]
        })]
      }), (0, V.jsx)("div", {
        className: "border-b border-[#2e2e2e] bg-[#0a0a0a] flex flex-shrink-0 overflow-x-auto",
        children: k.map(o => (0, V.jsxs)("button", {
          onClick: () => u(o.id),
          className: `relative font-mono text-xs tracking-widest px-6 py-3 border-b-2 transition-colors flex items-center gap-2 ${c===o.id?"border-[#cc0000] text-[#cc0000] bg-[#0d0d0d]":"border-transparent text-[#444444] hover:text-[#888888]"}`,
          children: [o.label, o.badge !== void 0 && (0, V.jsx)("span", {
            className: "text-[9px] px-1.5 py-0.5 font-black bg-[#cc0000] text-white",
            children: o.badge
          })]
        }, o.id))
      }), (0, V.jsxs)("div", {
        className: "flex-1 overflow-y-auto",
        children: [c === "overview" && (0, V.jsx)(H0, {
          ticket: A,
          notes: e,
          setNotes: l,
          saveNotes: j,
          draftStatus: n,
          setDraftStatus: o => {
            r(o), p(!1)
          },
          saveStatus: () => O(),
          statusDirty: x,
          statusSaved: I,
          baseTotal: A.estimatedTotal
        }), c === "notifications" && (0, V.jsx)(E0, {
          ticket: A,
          notifications: q,
          awaitingApproval: d,
          pendingCount: H.length,
          onSend: s,
          onCustomerResponse: P,
          onUpdateStatus: O
        })]
      })]
    })
  }

  function H0({
    ticket: A,
    notes: t,
    setNotes: a,
    saveNotes: c,
    draftStatus: u,
    setDraftStatus: e,
    saveStatus: l,
    statusDirty: n,
    statusSaved: r,
    baseTotal: I
  }) {
    let p = Ni[A.status];
    return (0, V.jsxs)("div", {
      className: "p-3 sm:p-5 grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-4xl",
      children: [(0, V.jsxs)("div", {
        className: "border border-[#2e2e2e] bg-[#141414] p-5",
        children: [(0, V.jsx)("p", {
          className: "font-mono text-[#555555] text-xs tracking-widest mb-4",
          children: "VEHICLE & CUSTOMER"
        }), (0, V.jsxs)("dl", {
          className: "space-y-2.5",
          children: [(0, V.jsx)(qa, {
            label: "Owner",
            value: A.carInfo.ownerName
          }), (0, V.jsx)(qa, {
            label: "Phone",
            value: A.carInfo.phone
          }), A.carInfo.email && (0, V.jsx)(qa, {
            label: "Email",
            value: A.carInfo.email
          }), (0, V.jsx)("div", {
            className: "border-t border-[#1e1e1e] pt-2"
          }), (0, V.jsx)(qa, {
            label: "Vehicle",
            value: `${A.carInfo.year} ${A.carInfo.make} ${A.carInfo.model}`
          }), (0, V.jsx)(qa, {
            label: "Color",
            value: A.carInfo.color
          }), (0, V.jsx)(qa, {
            label: "Plate",
            value: A.carInfo.plate,
            accent: !0
          }), A.carInfo.mileage && (0, V.jsx)(qa, {
            label: "Body/KM",
            value: A.carInfo.mileage
          }), A.carInfo.vin && (0, V.jsx)(qa, {
            label: "VIN",
            value: A.carInfo.vin,
            mono: !0
          }), (0, V.jsx)("div", {
            className: "border-t border-[#1e1e1e] pt-2"
          }), (0, V.jsx)(qa, {
            label: "Payment",
            value: A.paymentMethod === "card" ?
              "Card \u2014 demo payment" : A.paymentMethod === "kiosk" ?
              "Paid \u2014 Digital" : "Cash at Counter"
          })]
        })]
      }), (0, V.jsx)("div", {
        className: "border border-[#2e2e2e] bg-[#141414] p-5 flex flex-col gap-5",
        children: (0, V.jsxs)("div", {
          children: [(0, V.jsxs)("div", {
            className: "flex items-center justify-between gap-3 mb-3",
            children: [(0, V.jsx)("p", {
              className: "font-mono text-[#555555] text-xs tracking-widest",
              children: "JOB ORDER STATUS"
            }), (0, V.jsxs)("span", {
              className: "font-mono text-[10px] px-2 py-1 border",
              style: {
                color: p.color,
                background: p.bg,
                borderColor: p.border
              },
              children: ["CURRENT: ", p.label]
            })]
          }), (0, V.jsx)("div", {
            className: "grid grid-cols-2 gap-2",
            children: ["pending", "in-progress", "ready", "completed",
              "cancelled"
            ].map(q => {
              let R = Ni[q];
              return (0, V.jsx)("button", {
                onClick: () => e(q),
                className: "font-mono text-xs px-3 py-2 tracking-wider border transition-all",
                style: u === q ? {
                  color: R.color,
                  background: R.bg,
                  borderColor: R.border
                } : {
                  color: "#555555",
                  borderColor: "#2e2e2e"
                },
                children: R.label
              }, q)
            })
          }), (0, V.jsxs)("div", {
            className: "mt-3 flex items-center gap-3",
            children: [(0, V.jsx)("button", {
              onClick: l,
              disabled: !n,
              className: "flex-1 bg-[#cc0000] text-white font-mono text-xs font-bold tracking-widest px-4 py-2.5 hover:bg-[#e00000] transition-colors disabled:bg-[#1e1e1e] disabled:text-[#444444] disabled:cursor-not-allowed",
              children: "SAVE JOB STATUS"
            }), r && !n && (0, V.jsx)("span", {
              className: "font-mono text-[#22c55e] text-[10px] tracking-widest",
              children: "JOB STATUS SAVED"
            })]
          })]
        })
      }), (0, V.jsxs)("div", {
        className: "border border-[#2e2e2e] bg-[#141414] p-5",
        children: [(0, V.jsx)("p", {
          className: "font-mono text-[#555555] text-xs tracking-widest mb-4",
          children: "REQUESTED SERVICES"
        }), A.services.length === 0 ? (0, V.jsx)("p", {
          className: "font-sans text-[#333333] text-sm",
          children: "None"
        }) : A.services.map((q, R) => (0, V.jsxs)("div", {
          className: "flex justify-between py-2.5 border-b border-[#1e1e1e] last:border-0",
          children: [(0, V.jsxs)("div", {
            children: [(0, V.jsx)("div", {
              className: "font-sans text-[#f0f0f0] text-sm",
              children: q.name
            }), q.duration && (0, V.jsx)("div", {
              className: "font-mono text-[#444444] text-xs",
              children: q.duration
            })]
          }), (0, V.jsxs)("span", {
            className: "font-mono text-[#cc0000] font-bold",
            children: ["\u20B1", q.price.toLocaleString()]
          })]
        }, `svc-${q.id}-${R}`))]
      }), (0, V.jsxs)("div", {
        className: "border border-[#2e2e2e] bg-[#141414] p-5",
        children: [(0, V.jsx)("p", {
          className: "font-mono text-[#555555] text-xs tracking-widest mb-4",
          children: "REQUESTED PARTS"
        }), A.parts.length === 0 ? (0, V.jsx)("p", {
          className: "font-sans text-[#333333] text-sm",
          children: "None"
        }) : A.parts.map((q, R) => (0, V.jsxs)("div", {
          className: "flex justify-between py-2.5 border-b border-[#1e1e1e] last:border-0",
          children: [(0, V.jsxs)("div", {
            children: [(0, V.jsx)("span", {
              className: "font-sans text-[#f0f0f0] text-sm",
              children: q.name
            }), (q.qty ?? 1) > 1 && (0, V.jsxs)("span", {
              className: "font-mono text-[#555555] text-xs ml-2",
              children: ["\xD7", q.qty]
            })]
          }), (0, V.jsxs)("span", {
            className: "font-mono text-[#cc0000] font-bold",
            children: ["\u20B1", (q.price * (q.qty ?? 1))
            .toLocaleString()]
          })]
        }, `part-${q.id}-${R}`))]
      }), (0, V.jsxs)("div", {
        className: "lg:col-span-2 border border-[#2e2e2e] bg-[#141414] p-5",
        children: [(0, V.jsx)("p", {
          className: "font-mono text-[#555555] text-xs tracking-widest mb-3",
          children: "ORDER NOTES"
        }), (0, V.jsx)("textarea", {
          value: t,
          onChange: q => a(q.target.value),
          rows: 3,
          placeholder: "Add internal notes about this service\u2026",
          className: "w-full bg-[#0a0a0a] border border-[#2e2e2e] text-[#f0f0f0] font-sans px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000] resize-none transition-colors"
        }), (0, V.jsxs)("div", {
          className: "flex items-center justify-between mt-3",
          children: [(0, V.jsx)("button", {
            onClick: c,
            className: "font-mono text-xs tracking-widest px-4 py-2 border border-[#cc0000] text-[#cc0000] hover:bg-[#cc0000] hover:text-white transition-colors",
            children: "SAVE NOTES"
          }), (0, V.jsxs)("div", {
            className: "flex items-center gap-3",
            children: [(0, V.jsx)("span", {
              className: "font-mono text-[#444444] text-sm",
              children: "TOTAL"
            }), (0, V.jsxs)("span", {
              className: "font-mono text-[#cc0000] text-2xl font-black",
              children: ["\u20B1", I.toLocaleString()]
            })]
          })]
        })]
      })]
    })
  }

  function E0({
    ticket: A,
    notifications: t,
    awaitingApproval: a,
    pendingCount: c,
    onSend: u,
    onCustomerResponse: e,
    onUpdateStatus: l
  }) {
    let [n, r] = (0, tA.useState)("update"), [I, p] = (0, tA.useState)(""), [q, R] = (0, tA
      .useState)(!0), d = t.filter(x => x.type === "approval-required" && !x.customerResponse),
      S = ["Your vehicle is now in service. We will update you shortly.",
        "Inspection complete. We have identified some issues \u2014 please review the approval request.",
        "Your vehicle is ready for pickup. Please proceed to the counter.",
        "We found additional issues that require your approval before we proceed."
      ], N = () => {
        I.trim() && (u(I.trim(), n), p(""), R(!1), n === "update" && R(!1))
      };
    return (0, V.jsxs)("div", {
      className: "p-3 sm:p-5 max-w-3xl",
      children: [a && c > 0 && (0, V.jsxs)("div", {
        className: "border-2 border-[#ffd600] bg-[#0f0d00] p-5 mb-5",
        children: [(0, V.jsxs)("div", {
          className: "flex items-center gap-3 mb-3",
          children: [(0, V.jsx)("div", {
            className: "w-3 h-3 rounded-full bg-[#ffd600] animate-pulse"
          }), (0, V.jsx)("p", {
            className: "font-mono text-[#ffd600] font-bold tracking-widest",
            children: "WAITING FOR CUSTOMER APPROVAL"
          })]
        }), (0, V.jsxs)("p", {
          className: "font-sans text-[#888888] text-sm mb-4",
          children: [c, " item", c !== 1 ? "s" : "",
            " require customer approval before proceeding. The customer has been notified."
          ]
        }), (0, V.jsxs)("div", {
          className: "border border-[#2e2e2e] bg-[#0a0a0a] p-4",
          children: [(0, V.jsx)("p", {
            className: "font-mono text-[#555555] text-xs tracking-widest mb-3",
            children: "SIMULATE CUSTOMER RESPONSE"
          }), (0, V.jsx)("p", {
            className: "font-sans text-[#555555] text-xs mb-4",
            children: "In a live system, the customer responds via SMS or the app. Use the buttons below to simulate their response."
          }), d.map(x => (0, V.jsxs)("div", {
            className: "mb-3",
            children: [(0, V.jsxs)("p", {
              className: "font-sans text-[#888888] text-xs mb-3 italic",
              children: ['"', x.message, '"']
            }), (0, V.jsxs)("div", {
              className: "flex gap-3",
              children: [(0, V.jsx)("button", {
                onClick: () => {
                  e("approved", x.id), l("in-progress")
                },
                className: "flex-1 py-3 font-mono text-sm tracking-widest border-2 border-[#22c55e] text-[#22c55e] bg-[#001a09] hover:bg-[#22c55e] hover:text-white transition-colors",
                children: "\u2713 CUSTOMER APPROVES"
              }), (0, V.jsx)("button", {
                onClick: () => {
                  e("rejected", x.id)
                },
                className: "flex-1 py-3 font-mono text-sm tracking-widest border-2 border-[#ef4444] text-[#ef4444] bg-[#1a0000] hover:bg-[#ef4444] hover:text-white transition-colors",
                children: "\u2715 CUSTOMER REJECTS"
              })]
            })]
          }, x.id))]
        })]
      }), (0, V.jsxs)("div", {
        className: "border border-[#2e2e2e] bg-[#141414] p-5 mb-5",
        children: [(0, V.jsxs)("div", {
          className: "flex items-center justify-between mb-4",
          children: [(0, V.jsx)("p", {
            className: "font-mono text-[#f0f0f0] text-sm font-bold tracking-widest",
            children: "SEND CUSTOMER NOTIFICATION"
          }), (0, V.jsx)("button", {
            onClick: () => R(!q),
            className: "font-mono text-xs text-[#444444] hover:text-[#888888]",
            children: q ? "HIDE \u25B2" : "COMPOSE \u25BC"
          })]
        }), q && (0, V.jsxs)(V.Fragment, {
          children: [(0, V.jsxs)("div", {
            className: "flex gap-2 mb-4",
            children: [(0, V.jsx)("button", {
              onClick: () => r("update"),
              className: `flex-1 py-2.5 font-mono text-xs tracking-widest border-2 transition-colors ${n==="update"?"border-[#3b82f6] text-[#3b82f6] bg-[#00101a]":"border-[#2e2e2e] text-[#555555] hover:border-[#444444]"}`,
              children: "GENERAL UPDATE"
            }), (0, V.jsx)("button", {
              onClick: () => r("approval-required"),
              className: `flex-1 py-2.5 font-mono text-xs tracking-widest border-2 transition-colors ${n==="approval-required"?"border-[#ffd600] text-[#ffd600] bg-[#0f0d00]":"border-[#2e2e2e] text-[#555555] hover:border-[#444444]"}`,
              children: "REQUIRES APPROVAL"
            })]
          }), (0, V.jsxs)("div", {
            className: "mb-3",
            children: [(0, V.jsx)("p", {
              className: "font-mono text-[#444444] text-[10px] tracking-widest mb-2",
              children: "QUICK TEMPLATES"
            }), (0, V.jsx)("div", {
              className: "space-y-1.5",
              children: S.map((x, O) => (0, V.jsx)("button", {
                onClick: () => p(x),
                className: "w-full text-left font-sans text-xs text-[#555555] px-3 py-2 border border-[#1e1e1e] hover:border-[#cc0000] hover:text-[#cccccc] transition-colors",
                children: x
              }, O))
            })]
          }), (0, V.jsxs)("div", {
            className: "mb-3",
            children: [(0, V.jsx)("label", {
              className: "font-mono text-[#555555] text-xs tracking-widest block mb-1.5",
              children: "MESSAGE TO CUSTOMER"
            }), (0, V.jsx)("textarea", {
              value: I,
              onChange: x => p(x.target.value),
              rows: 4,
              placeholder: "Type your message to the customer\u2026",
              className: "w-full bg-[#0a0a0a] border border-[#2e2e2e] text-[#f0f0f0] font-sans px-3 py-2.5 text-sm focus:outline-none focus:border-[#cc0000] resize-none placeholder:text-[#333333]"
            })]
          }), I && (0, V.jsxs)("div", {
            className: "border border-[#2e2e2e] bg-[#0a0a0a] p-3 mb-3 text-xs",
            children: [(0, V.jsxs)("p", {
              className: "font-mono text-[#444444] tracking-widest mb-1",
              children: ["PREVIEW \u2014 To: ", A.carInfo.ownerName,
                " (", A.carInfo.phone, ")"
              ]
            }), (0, V.jsxs)("p", {
              className: "font-sans text-[#888888]",
              children: [(0, V.jsx)("span", {
                  className: "text-[#cc0000]",
                  children: "[G SPOT]"
                }), " Ticket ", A.ticketNumber, ": ", I, n ===
                "approval-required" &&
                " \u2014 Please reply APPROVE or REJECT."
              ]
            })]
          }), (0, V.jsx)("button", {
            onClick: N,
            disabled: !I.trim() || a,
            className: "w-full py-3 font-mono text-sm tracking-widest font-bold bg-[#cc0000] text-white hover:bg-[#e00000] disabled:opacity-30 disabled:cursor-not-allowed transition-colors",
            children: n === "approval-required" ?
              "SEND & REQUEST APPROVAL \u2192" : "SEND NOTIFICATION \u2192"
          }), a && (0, V.jsx)("p", {
            className: "font-mono text-[#ffd600] text-xs mt-2 text-center",
            children: "Cannot send new notifications while awaiting customer approval."
          })]
        })]
      }), (0, V.jsxs)("div", {
        className: "border border-[#2e2e2e] bg-[#141414] p-5",
        children: [(0, V.jsx)("p", {
          className: "font-mono text-[#f0f0f0] text-sm font-bold tracking-widest mb-4",
          children: "NOTIFICATION HISTORY"
        }), t.length === 0 ? (0, V.jsx)("p", {
          className: "font-sans text-[#333333] text-sm",
          children: "No notifications sent yet."
        }) : (0, V.jsx)("div", {
          className: "space-y-4",
          children: t.map(x => (0, V.jsxs)("div", {
            className: `border p-4 ${x.customerResponse==="approved"?"border-[#22c55e]/30 bg-[#001a09]":x.customerResponse==="rejected"?"border-[#ef4444]/30 bg-[#1a0000]":x.type==="approval-required"?"border-[#ffd600]/30 bg-[#0f0d00]":"border-[#2e2e2e] bg-[#0d0d0d]"}`,
            children: [(0, V.jsxs)("div", {
              className: "flex items-start justify-between gap-3 mb-2",
              children: [(0, V.jsxs)("div", {
                className: "flex items-center gap-2 flex-wrap",
                children: [(0, V.jsx)("span", {
                    className: `font-mono text-[10px] px-1.5 py-0.5 border ${x.type==="approval-required"?"text-[#ffd600] border-[#7a6500]":"text-[#3b82f6] border-[#004080]"}`,
                    children: x.type ===
                      "approval-required" ?
                      "APPROVAL REQUEST" : "GENERAL UPDATE"
                  }), x.customerResponse && (0, V.jsxs)(
                    "span", {
                      className: `font-mono text-[10px] px-1.5 py-0.5 border ${x.customerResponse==="approved"?"text-[#22c55e] border-[#006b24]":"text-[#ef4444] border-[#6b0000]"}`,
                      children: ["CUSTOMER ", x
                        .customerResponse.toUpperCase()
                      ]
                    }), x.type === "approval-required" && !x
                  .customerResponse && (0, V.jsx)("span", {
                    className: "font-mono text-[10px] px-1.5 py-0.5 border border-[#7a6500] text-[#ffd600] animate-pulse",
                    children: "WAITING\u2026"
                  })
                ]
              }), (0, V.jsx)("span", {
                className: "font-mono text-[#444444] text-[10px] flex-shrink-0",
                children: xi(x.sentAt)
              })]
            }), (0, V.jsxs)("p", {
              className: "font-sans text-[#888888] text-sm leading-relaxed",
              children: ['"', x.message, '"']
            }), x.respondedAt && (0, V.jsxs)("p", {
              className: "font-mono text-[#444444] text-[10px] mt-2",
              children: ["Responded ", xi(x.respondedAt)]
            })]
          }, x.id))
        })]
      })]
    })
  }

  function S0({
    inventory: A,
    setInventory: t
  }) {
    let [a, c] = (0, tA.useState)(""), [u, e] = (0, tA.useState)(null), [l, n] = (0, tA.useState)(
      ""), [r, I] = (0, tA.useState)(!1), p = 5, q = NA.filter(j => {
        let H = a === "" || j.name.toLowerCase().includes(a.toLowerCase()) || (j.partCategory ??
            "").includes(a.toLowerCase()),
          E = !r || (A[j.id] ?? 0) <= p;
        return H && E
      }), R = NA.filter(j => (A[j.id] ?? 0) <= p).length, d = NA.filter(j => (A[j.id] ?? 0) === 0)
      .length, S = Object.values(A).reduce((j, H) => j + H, 0), N = j => {
        let H = parseInt(l);
        !isNaN(H) && H >= 0 && t({
          ...A,
          [j]: H
        }), e(null)
      }, x = j => j === 0 ? "#ef4444" : j <= p ? "#f59e0b" : "#22c55e", O = j => j === 0 ? "OUT" :
      j <= p ? "LOW" : "OK";
    return (0, V.jsxs)("div", {
      className: "flex-1 overflow-hidden flex flex-col bg-[#0a0a0a]",
      children: [(0, V.jsxs)("div", {
        className: "border-b border-[#2e2e2e] bg-[#0d0d0d] px-3 sm:px-6 py-3 flex flex-wrap items-center gap-4 sm:gap-8 flex-shrink-0",
        children: [(0, V.jsxs)("div", {
          children: [(0, V.jsx)("p", {
            className: "font-mono text-[#444444] text-[10px] tracking-widest",
            children: "TOTAL UNITS"
          }), (0, V.jsx)("p", {
            className: "font-mono text-[#f0f0f0] text-xl font-black",
            children: S
          })]
        }), (0, V.jsxs)("div", {
          children: [(0, V.jsx)("p", {
            className: "font-mono text-[#f59e0b] text-[10px] tracking-widest",
            children: "LOW STOCK"
          }), (0, V.jsx)("p", {
            className: "font-mono text-[#f59e0b] text-xl font-black",
            children: R
          })]
        }), (0, V.jsxs)("div", {
          children: [(0, V.jsx)("p", {
            className: "font-mono text-[#ef4444] text-[10px] tracking-widest",
            children: "OUT OF STOCK"
          }), (0, V.jsx)("p", {
            className: "font-mono text-[#ef4444] text-xl font-black",
            children: d
          })]
        }), (0, V.jsxs)("div", {
          className: "w-full sm:w-auto sm:ml-auto flex items-center gap-2 sm:gap-3",
          children: [(0, V.jsx)("button", {
            onClick: () => I(j => !j),
            className: `font-mono text-[10px] tracking-widest px-3 py-1.5 border transition-colors ${r?"border-[#f59e0b] text-[#f59e0b] bg-[#1a1000]":"border-[#2e2e2e] text-[#555555] hover:border-[#444444]"}`,
            children: r ? "SHOW ALL" : "LOW STOCK ONLY"
          }), (0, V.jsx)("div", {
            className: "relative",
            children: (0, V.jsx)("input", {
              type: "text",
              value: a,
              onChange: j => c(j.target.value),
              placeholder: "Search parts\u2026",
              className: "bg-[#141414] border border-[#2e2e2e] text-[#f0f0f0] font-sans px-3 py-1.5 text-sm focus:outline-none focus:border-[#cc0000] placeholder:text-[#333333] w-full sm:w-48"
            })
          })]
        })]
      }), (0, V.jsxs)("div", {
        className: "flex-1 overflow-auto",
        children: [(0, V.jsxs)("table", {
          className: "w-full min-w-[760px] border-collapse",
          children: [(0, V.jsx)("thead", {
            className: "sticky top-0 bg-[#0d0d0d] border-b border-[#2e2e2e]",
            children: (0, V.jsxs)("tr", {
              children: [(0, V.jsx)("th", {
                className: "font-mono text-[#444444] text-[10px] tracking-widest text-left px-5 py-3",
                children: "PART NAME"
              }), (0, V.jsx)("th", {
                className: "font-mono text-[#444444] text-[10px] tracking-widest text-left px-4 py-3",
                children: "CATEGORY"
              }), (0, V.jsx)("th", {
                className: "font-mono text-[#444444] text-[10px] tracking-widest text-left px-4 py-3",
                children: "UNIT PRICE"
              }), (0, V.jsx)("th", {
                className: "font-mono text-[#444444] text-[10px] tracking-widest text-center px-4 py-3",
                children: "STATUS"
              }), (0, V.jsx)("th", {
                className: "font-mono text-[#444444] text-[10px] tracking-widest text-center px-4 py-3",
                children: "QTY IN STOCK"
              }), (0, V.jsx)("th", {
                className: "font-mono text-[#444444] text-[10px] tracking-widest text-center px-4 py-3",
                children: "ADJUST"
              })]
            })
          }), (0, V.jsx)("tbody", {
            children: q.map((j, H) => {
              let E = A[j.id] ?? 0,
                s = x(E),
                P = O(E),
                k = u === j.id;
              return (0, V.jsxs)("tr", {
                className: `border-b border-[#1a1a1a] ${H%2===0?"bg-[#0a0a0a]":"bg-[#0d0d0d]"} hover:bg-[#141414] transition-colors`,
                children: [(0, V.jsxs)("td", {
                  className: "px-5 py-3",
                  children: [(0, V.jsx)("p", {
                    className: "font-sans text-[#f0f0f0] text-sm",
                    children: j.name
                  }), (0, V.jsx)("p", {
                    className: "font-sans text-[#444444] text-xs mt-0.5",
                    children: j.description
                  })]
                }), (0, V.jsx)("td", {
                  className: "px-4 py-3",
                  children: (0, V.jsx)("span", {
                    className: "font-mono text-[10px] text-[#888888] tracking-wider",
                    children: (j.partCategory ?? "\u2014")
                      .toUpperCase()
                  })
                }), (0, V.jsx)("td", {
                  className: "px-4 py-3",
                  children: (0, V.jsxs)("span", {
                    className: "font-mono text-[#cc0000] text-sm font-bold",
                    children: ["\u20B1", j.price
                      .toLocaleString()
                    ]
                  })
                }), (0, V.jsx)("td", {
                  className: "px-4 py-3 text-center",
                  children: (0, V.jsx)("span", {
                    className: "font-mono text-[10px] px-2 py-0.5 font-black border",
                    style: {
                      color: s,
                      borderColor: `${s}50`,
                      backgroundColor: `${s}15`
                    },
                    children: P
                  })
                }), (0, V.jsx)("td", {
                  className: "px-4 py-3 text-center",
                  children: k ? (0, V.jsxs)("div", {
                    className: "flex items-center justify-center gap-1",
                    children: [(0, V.jsx)("input", {
                      type: "number",
                      value: l,
                      onChange: o => n(o.target
                        .value),
                      onKeyDown: o => {
                        o.key === "Enter" && N(j
                            .id), o.key ===
                          "Escape" && e(null)
                      },
                      className: "w-16 bg-[#0a0a0a] border border-[#cc0000] text-[#f0f0f0] font-mono text-center py-1 text-sm focus:outline-none",
                      autoFocus: !0,
                      min: 0
                    }), (0, V.jsx)("button", {
                      onClick: () => N(j.id),
                      className: "font-mono text-[10px] px-2 py-1 bg-[#cc0000] text-white",
                      children: "\u2713"
                    }), (0, V.jsx)("button", {
                      onClick: () => e(null),
                      className: "font-mono text-[10px] px-2 py-1 border border-[#2e2e2e] text-[#555555]",
                      children: "\u2715"
                    })]
                  }) : (0, V.jsx)("span", {
                    className: "font-mono font-bold text-lg",
                    style: {
                      color: s
                    },
                    children: E
                  })
                }), (0, V.jsx)("td", {
                  className: "px-4 py-3 text-center",
                  children: !k && (0, V.jsxs)("div", {
                    className: "flex items-center justify-center gap-1",
                    children: [(0, V.jsx)("button", {
                      onClick: () => t({
                        ...A,
                        [j.id]: Math.max(0, E -
                          1)
                      }),
                      className: "w-7 h-7 border border-[#2e2e2e] text-[#555555] font-mono hover:border-[#ef4444] hover:text-[#ef4444] transition-colors",
                      children: "\u2212"
                    }), (0, V.jsx)("button", {
                      onClick: () => t({
                        ...A,
                        [j.id]: E + 1
                      }),
                      className: "w-7 h-7 border border-[#2e2e2e] text-[#555555] font-mono hover:border-[#22c55e] hover:text-[#22c55e] transition-colors",
                      children: "+"
                    }), (0, V.jsx)("button", {
                      onClick: () => {
                        e(j.id), n(String(E))
                      },
                      className: "font-mono text-[9px] px-2 py-1 border border-[#2e2e2e] text-[#444444] hover:border-[#cc0000] hover:text-[#cc0000] transition-colors ml-1",
                      children: "SET"
                    })]
                  })
                })]
              }, j.id)
            })
          })]
        }), q.length === 0 && (0, V.jsx)("div", {
          className: "p-12 text-center",
          children: (0, V.jsx)("p", {
            className: "font-mono text-[#333333] text-sm tracking-widest",
            children: "NO PARTS FOUND"
          })
        })]
      })]
    })
  }

  function qa({
    label: A,
    value: t,
    accent: a,
    mono: c
  }) {
    return t ? (0, V.jsxs)("div", {
      className: "flex items-baseline gap-3",
      children: [(0, V.jsx)("span", {
        className: "font-mono text-[#444444] text-xs w-16 flex-shrink-0",
        children: A
      }), (0, V.jsx)("span", {
        className: `text-sm ${a?"font-mono text-[#cc0000] font-bold":c?"font-mono text-[#cccccc]":"font-sans text-[#cccccc]"}`,
        children: t
      })]
    }) : null
  }

  function Si({
    label: A,
    value: t,
    color: a
  }) {
    return (0, V.jsxs)("div", {
      className: "flex items-center gap-2",
      children: [(0, V.jsx)("span", {
        className: "font-mono text-sm font-bold",
        style: {
          color: a
        },
        children: t
      }), (0, V.jsx)("span", {
        className: "font-mono text-[#333333] text-xs",
        children: A
      })]
    })
  }

  function N0() {
    return (0, V.jsxs)("div", {
      className: "flex flex-col items-center justify-center h-full text-center px-8",
      children: [(0, V.jsx)("div", {
        className: "font-mono text-[#222222] text-6xl mb-4",
        children: "\u25FB"
      }), (0, V.jsx)("p", {
        className: "font-mono text-[#333333] tracking-widest text-sm",
        children: "SELECT A TICKET"
      })]
    })
  }

  function xi(A) {
    let t = Date.now() - new Date(A).getTime(),
      a = Math.floor(t / 6e4);
    if (a < 1) return "just now";
    if (a < 60) return `${a}m ago`;
    let c = Math.floor(a / 60);
    return c < 24 ? `${c}h ago` : `${Math.floor(c/24)}d ago`
  }

  function x0({
    onLogin: A
  }) {
    let [t, a] = (0, tA.useState)(""), [c, u] = (0, tA.useState)(""), [e, l] = (0, tA.useState)(!
      1), [n, r] = (0, tA.useState)(""), [I, p] = (0, tA.useState)(!1), q = R => {
      R.preventDefault(), r(""), p(!0), setTimeout(() => {
        let d = O0[t.toLowerCase().trim()];
        if (!d) {
          r("Account not found. Check your username."), p(!1);
          return
        }
        if (c !== d) {
          r("Incorrect password. Please try again."), p(!1);
          return
        }
        let S = t.toLowerCase().trim(),
          N = Fb.find(x => x.name.toLowerCase().replace(" ", ".") === S || S === "admin" &&
            x.id === "sp6");
        N && A(N), p(!1)
      }, 600)
    };
    return (0, V.jsxs)("div", {
      className: "h-full w-full relative overflow-y-auto flex items-center justify-center",
      children: [(0, V.jsx)("img", {
        src: Cb.src,
        alt: "",
        className: "absolute inset-0 w-full h-full object-cover"
      }), (0, V.jsx)("div", {
        className: "absolute inset-0 bg-black/70"
      }), (0, V.jsxs)("div", {
        className: "absolute top-0 left-0 right-0 px-4 sm:px-6 py-4 flex items-center justify-between z-10",
        children: [(0, V.jsxs)("div", {
          className: "flex items-center gap-3",
          children: [(0, V.jsx)("span", {
            className: "font-mono text-[#cc0000] font-black text-xl tracking-widest",
            children: "G SPOT"
          }), (0, V.jsx)("span", {
            className: "text-[#ffffff30]",
            children: "|"
          }), (0, V.jsx)("span", {
            className: "hidden sm:inline font-mono text-[#ffffff60] text-xs tracking-widest",
            children: "AUTOMOTIVE SERVICE CENTER"
          })]
        }), (0, V.jsx)("span", {
          className: "hidden sm:inline font-mono text-[#ffffff40] text-xs tracking-widest",
          children: "MANAGER PORTAL"
        })]
      }), (0, V.jsx)("div", {
        className: "relative z-10 w-full max-w-sm mx-4",
        children: (0, V.jsxs)("div", {
          className: "bg-[#0d0d0d]/95 border border-[#2e2e2e] shadow-2xl backdrop-blur-sm",
          children: [(0, V.jsxs)("div", {
            className: "px-5 sm:px-8 pt-6 sm:pt-8 pb-5 sm:pb-6 border-b border-[#1e1e1e] text-center",
            children: [(0, V.jsx)("div", {
              className: "w-12 h-12 bg-[#cc0000] flex items-center justify-center mx-auto mb-4",
              children: (0, V.jsx)("span", {
                className: "font-mono text-white font-black text-lg",
                children: "G"
              })
            }), (0, V.jsx)("h1", {
              className: "font-mono text-xl font-black text-[#f0f0f0] tracking-tight",
              children: "MANAGER LOGIN"
            }), (0, V.jsx)("p", {
              className: "font-sans text-[#555555] text-xs mt-1",
              children: "Sign in to access the dashboard"
            })]
          }), (0, V.jsxs)("form", {
            onSubmit: q,
            className: "px-5 sm:px-8 py-5 sm:py-6 flex flex-col gap-4",
            children: [(0, V.jsxs)("div", {
              children: [(0, V.jsx)("label", {
                className: "font-mono text-[#555555] text-[10px] tracking-widest block mb-2",
                children: "USERNAME"
              }), (0, V.jsx)("input", {
                type: "text",
                value: t,
                onChange: R => {
                  a(R.target.value), r("")
                },
                placeholder: "e.g. mike.rodriguez",
                autoComplete: "username",
                className: "w-full bg-[#131313] border border-[#2e2e2e] text-[#f0f0f0] font-sans text-sm px-4 py-3 placeholder-[#333333] focus:outline-none focus:border-[#cc0000] transition-colors"
              })]
            }), (0, V.jsxs)("div", {
              children: [(0, V.jsx)("label", {
                className: "font-mono text-[#555555] text-[10px] tracking-widest block mb-2",
                children: "PASSWORD"
              }), (0, V.jsxs)("div", {
                className: "relative",
                children: [(0, V.jsx)("input", {
                  type: e ? "text" : "password",
                  value: c,
                  onChange: R => {
                    u(R.target.value), r("")
                  },
                  placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022",
                  autoComplete: "current-password",
                  className: "w-full bg-[#131313] border border-[#2e2e2e] text-[#f0f0f0] font-sans text-sm px-4 py-3 placeholder-[#333333] focus:outline-none focus:border-[#cc0000] transition-colors pr-12"
                }), (0, V.jsx)("button", {
                  type: "button",
                  onClick: () => l(R => !R),
                  className: "absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[#555555] hover:text-[#888888] text-xs transition-colors",
                  children: e ? "HIDE" : "SHOW"
                })]
              })]
            }), n && (0, V.jsx)("div", {
              className: "border border-[#6b0000] bg-[#1a0000] px-4 py-2.5",
              children: (0, V.jsx)("p", {
                className: "font-sans text-[#ef4444] text-xs",
                children: n
              })
            }), (0, V.jsx)("button", {
              type: "submit",
              disabled: !t || !c || I,
              className: "w-full py-3.5 font-mono font-black text-sm tracking-widest bg-[#cc0000] text-white hover:bg-[#e00000] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98] transition-all mt-1",
              children: I ? "SIGNING IN\u2026" : "SIGN IN \u2192"
            }), (0, V.jsx)("p", {
              className: "font-mono text-[#333333] text-[10px] text-center tracking-widest",
              children: "Contact your manager if you forgot your credentials"
            })]
          }), (0, V.jsxs)("div", {
            className: "px-8 py-3 border-t border-[#1e1e1e] flex items-center justify-between",
            children: [(0, V.jsx)("span", {
              className: "font-mono text-[#2e2e2e] text-[10px] tracking-widest",
              children: "G SPOT \xA9 2026"
            }), (0, V.jsx)("span", {
              className: "font-mono text-[#2e2e2e] text-[10px]",
              children: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit"
              })
            })]
          })]
        })
      })]
    })
  }
  var tA, V, Fb, O0, Ni, Yb = z(() => {
    tA = GA(ja());
    se();
    Tq();
    Mb();
    V = GA(Wt()), Fb = [{
      id: "sp2",
      name: "Sarah Chen",
      role: "Manager",
      pin: "sarah2345",
      color: "#3b82f6",
      initials: "SC"
    }, {
      id: "sp4",
      name: "Ana Martinez",
      role: "Manager",
      pin: "ana4567",
      color: "#f59e0b",
      initials: "AM"
    }, {
      id: "sp6",
      name: "Admin",
      role: "Shop Manager",
      pin: "admin0000",
      color: "#e8e8e8",
      initials: "AD"
    }], O0 = {
      "sarah.chen": "sarah2345",
      "ana.martinez": "ana4567",
      admin: "admin0000"
    }, Ni = {
      pending: {
        label: "WAITING",
        color: "#f59e0b",
        bg: "#1a1000",
        border: "#7a4a00"
      },
      "in-progress": {
        label: "IN PROGRESS",
        color: "#3b82f6",
        bg: "#00101a",
        border: "#004080"
      },
      ready: {
        label: "READY",
        color: "#22c55e",
        bg: "#001a09",
        border: "#006b24"
      },
      completed: {
        label: "COMPLETED",
        color: "#888888",
        bg: "#111111",
        border: "#333333"
      },
      cancelled: {
        label: "CANCELLED",
        color: "#ef4444",
        bg: "#1a0000",
        border: "#6b0000"
      }
    }
  });

  function ye() {
    try {
      return JSON.parse(localStorage.getItem(_b) || "null") || Kq
    } catch {
      return Kq
    }
  }

  function Gq(A) {
    Kq = A;
    try {
      localStorage.setItem(_b, JSON.stringify(A))
    } catch {}
  }
  async function $b(A) {
    let t = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(A));
    return Array.from(new Uint8Array(t), a => a.toString(16).padStart(2, "0")).join("")
  }
  async function AO(A, t, a) {
    if (window.GSpotBackend?.enabled()) {
      const result = await window.GSpotBackend.signup(A, t, a);
      if (result.success) { pa = result.customer; return { ...result, orders: ye().orders.filter(order => order.owner === pa.id) }; }
      return result;
    }
    let c = ye();
    if (t = t.trim().toLowerCase(), !A.trim() || !t.includes("@") || a.length < 8) return {
      success: !1,
      error: "Enter a name, valid email and at least 8 password characters."
    };
    if (c.users.some(n => n.email === t)) return {
      success: !1,
      error: "This demo account already exists."
    };
    let u = crypto.randomUUID(),
      e = crypto.randomUUID(),
      l = {
        id: u,
        salt: e,
        name: A.trim(),
        email: t,
        hash: await $b(e + a)
      };
    return c.users.push(l), Gq(c), pa = l, {
      success: !0,
      customer: Xq(l),
      orders: []
    }
  }
  async function tO(A, t) {
    if (window.GSpotBackend?.enabled()) {
      const result = await window.GSpotBackend.login(A, t);
      if (result.success) { pa = result.customer; return { ...result, orders: ye().orders.filter(order => order.owner === pa.id) }; }
      return result;
    }
    let a = ye(),
      c = a.users.find(u => u.email === A.trim().toLowerCase());
    return !c || c.hash !== await $b(c.salt + t) ? {
      success: !1,
      error: "Incorrect demo login. Create a demo account first."
    } : (pa = c, {
      success: !0,
      customer: Xq(c),
      orders: a.orders.filter(u => u.owner === c.id)
    })
  }
  async function aO() {
    if (window.GSpotBackend?.enabled()) { try { await window.GSpotBackend.logout(); } catch {} }
    return pa = null, {
      success: !0
    }
  }
  async function cO() {
    return pa ? {
      success: !0,
      customer: Xq(pa),
      orders: ye().orders.filter(A => A.owner === pa.id)
    } : {
      success: !1,
      error: "Sign in first."
    }
  }
  async function uO(A) {
    if (!pa) return {
      success: !1,
      error: "Sign in first."
    };
    let t = {
        id: crypto.randomUUID(),
        owner: pa.id,
        orderNumber: A.ticketNumber,
        status: "to-pay",
        total: A.estimatedTotal,
        createdAt: new Date().toISOString(),
        items: (A.mode === "parts" ? A.parts : A.services).map(c => ({
          catalogItemId: c.id,
          name: c.name,
          description: c.description,
          price: c.price,
          quantity: c.qty || 1,
          variation: A.mode === "parts" ? "Automotive Part" : "Automotive Service"
        }))
      },
      a = ye();
    return a.orders.unshift(t), Gq(a), {
      success: !0,
      order: t
    }
  }
  async function eO(A) {
    let t = ye(),
      a = t.orders.find(c => c.id === A && c.owner === pa?.id);
    return !a || a.status !== "to-pay" ? {
      success: !1,
      error: "This order cannot be cancelled."
    } : (a.status = "cancelled", Gq(t), {
      success: !0,
      order: a
    })
  }
  var _b, Kq, pa, Xq, Lq = z(() => {
    _b = "gspot-offline-demo-v1", Kq = {
      users: [],
      orders: []
    };
    pa = null;
    Xq = A => ({
      id: A.id,
      name: A.name,
      email: A.email
    })
  });

  function Zq({
    customerName: A,
    initialOrders: t,
    onShopParts: a,
    onBookService: c,
    onLoggedOut: u
  }) {
    let [e, l] = (0, Ca.useState)(t), [n, r] = (0, Ca.useState)("all"), [I, p] = (0, Ca.useState)(
      ""), [q, R] = (0, Ca.useTransition)(), d = (0, Ca.useMemo)(() => n === "all" ? e : e.filter(
      O => O.status === n), [n, e]), S = () => {
      R(async () => {
        let O = await cO();
        O.success ? l(O.orders) : p(O.error)
      })
    }, N = O => {
      R(async () => {
        let j = await eO(O);
        j.success ? (l(H => H.map(E => E.id === O ? j.order : E)), p(
          "Order cancelled.")) : p(j.error)
      })
    };
    return (0, W.jsxs)("div", {
      className: "h-full overflow-y-auto bg-[#f5f5f5] text-[#171717]",
      children: [(0, W.jsx)("header", {
        className: "sticky top-0 z-30 bg-white border-b border-[#e4e4e4] shadow-sm",
        children: (0, W.jsxs)("div", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 flex items-center justify-between gap-4",
          children: [(0, W.jsxs)("button", {
            onClick: a,
            className: "flex items-center gap-3",
            children: [(0, W.jsx)("span", {
              className: "w-11 h-11 rounded-full bg-[#d71920] text-white font-display text-3xl font-black italic flex items-center justify-center",
              children: "G"
            }), (0, W.jsxs)("span", {
              className: "text-left",
              children: [(0, W.jsx)("span", {
                className: "block font-display text-2xl font-black italic leading-none",
                children: "G SPOT"
              }), (0, W.jsx)("span", {
                className: "block font-sans text-[8px] tracking-[0.2em] text-[#777] mt-1",
                children: "MY ORDERS"
              })]
            })]
          }), (0, W.jsxs)("div", {
            className: "flex items-center gap-2 sm:gap-3",
            children: [(0, W.jsxs)("span", {
              className: "hidden md:block font-sans text-sm text-[#666]",
              children: ["Welcome, ", (0, W.jsx)("strong", {
                className: "text-[#171717]",
                children: A
              })]
            }), (0, W.jsx)("button", {
              onClick: S,
              disabled: q,
              className: "border border-[#d5d5d5] px-3 sm:px-4 py-2.5 font-sans text-xs font-bold hover:border-[#d71920] hover:text-[#d71920] disabled:opacity-50",
              children: "Refresh"
            }), (0, W.jsx)("button", {
              onClick: () => {
                R(async () => {
                  await aO(), u()
                })
              },
              disabled: q,
              className: "bg-[#171717] text-white px-3 sm:px-4 py-2.5 font-sans text-xs font-bold hover:bg-[#d71920] disabled:opacity-50",
              children: "Log out"
            })]
          })]
        })
      }), (0, W.jsxs)("main", {
        className: "max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-10",
        children: [(0, W.jsxs)("div", {
          className: "flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6",
          children: [(0, W.jsxs)("div", {
            children: [(0, W.jsx)("p", {
              className: "font-sans text-[#d71920] text-[10px] font-black tracking-[0.2em]",
              children: "CUSTOMER ACCOUNT"
            }), (0, W.jsx)("h1", {
              className: "font-display text-3xl sm:text-4xl font-black uppercase italic mt-1",
              children: "My purchases"
            })]
          }), (0, W.jsxs)("div", {
            className: "flex gap-2",
            children: [(0, W.jsx)("button", {
              onClick: a,
              className: "bg-[#d71920] text-white px-5 py-3 font-sans text-xs font-black",
              children: "SHOP PARTS"
            }), (0, W.jsx)("button", {
              onClick: c,
              className: "border border-[#171717] px-5 py-3 font-sans text-xs font-black hover:bg-[#171717] hover:text-white",
              children: "BOOK SERVICE"
            })]
          })]
        }), (0, W.jsx)("div", {
          className: "bg-white border border-[#e2e2e2] overflow-x-auto",
          children: (0, W.jsx)("div", {
            className: "min-w-max grid grid-flow-col auto-cols-[145px] lg:auto-cols-fr lg:grid-cols-7",
            children: o0.map(O => {
              let j = O.value === "all" ? e.length : e.filter(H => H
                .status === O.value).length;
              return (0, W.jsxs)("button", {
                onClick: () => r(O.value),
                className: `px-4 py-4 font-sans text-sm border-b-2 ${n===O.value?"border-[#ef3b2d] text-[#ef3b2d]":"border-transparent hover:text-[#ef3b2d]"}`,
                children: [O.label, j > 0 && O.value !== "all" ?
                  ` (${j})` : ""
                ]
              }, O.value)
            })
          })
        }), I && (0, W.jsx)("div", {
          className: "mt-4 bg-white border border-[#e2e2e2] px-4 py-3 font-sans text-sm text-[#666]",
          children: I
        }), (0, W.jsx)("div", {
          className: "space-y-4 mt-4",
          children: d.length === 0 ? (0, W.jsxs)("div", {
            className: "bg-white border border-[#e2e2e2] py-20 text-center",
            children: [(0, W.jsx)("div", {
              className: "w-16 h-16 rounded-full bg-[#f3f3f3] flex items-center justify-center mx-auto text-[#bbb]",
              children: (0, W.jsxs)("svg", {
                width: "30",
                height: "30",
                viewBox: "0 0 24 24",
                fill: "none",
                "aria-hidden": "true",
                children: [(0, W.jsx)("path", {
                  d: "M5 8h14l-1 12H6L5 8Z",
                  stroke: "currentColor",
                  strokeWidth: "1.7"
                }), (0, W.jsx)("path", {
                  d: "M9 9V6a3 3 0 0 1 6 0v3",
                  stroke: "currentColor",
                  strokeWidth: "1.7"
                })]
              })
            }), (0, W.jsx)("h2", {
              className: "font-sans text-lg font-bold mt-4",
              children: "No orders in this section"
            }), (0, W.jsx)("p", {
              className: "font-sans text-sm text-[#777] mt-1",
              children: "Your purchases and service bookings will appear here."
            }), (0, W.jsx)("button", {
              onClick: a,
              className: "mt-5 bg-[#d71920] text-white px-6 py-3 font-sans text-xs font-bold",
              children: "START SHOPPING"
            })]
          }) : d.map(O => (0, W.jsxs)("article", {
            className: "bg-white border border-[#e2e2e2]",
            children: [(0, W.jsxs)("div", {
              className: "px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#ececec]",
              children: [(0, W.jsxs)("div", {
                className: "flex items-center gap-3",
                children: [(0, W.jsx)("span", {
                  className: "bg-[#d71920] text-white px-2 py-1 font-sans text-[9px] font-black",
                  children: "OFFICIAL"
                }), (0, W.jsx)("strong", {
                  className: "font-sans text-sm",
                  children: "G Spot Automotive"
                }), (0, W.jsx)("span", {
                  className: "font-sans text-[10px] text-[#999]",
                  children: O.orderNumber
                })]
              }), (0, W.jsx)("span", {
                className: `font-sans text-xs font-bold ${O.status==="cancelled"?"text-[#777]":"text-[#ef3b2d]"}`,
                children: s0[O.status]
              })]
            }), (0, W.jsx)("div", {
              className: "divide-y divide-[#eeeeee]",
              children: O.items.map((j, H) => {
                let E = [...NA, ...Nt].find(s => s.id === j
                  .catalogItemId);
                return (0, W.jsxs)("div", {
                  className: "p-4 sm:px-6 flex items-center gap-4",
                  children: [(0, W.jsx)("div", {
                    className: "w-20 h-20 sm:w-24 sm:h-24 border border-[#e4e4e4] bg-white flex-shrink-0",
                    children: E?.image ? (0, W.jsx)(
                      "img", {
                        src: E.image,
                        alt: "",
                        className: "w-full h-full object-contain p-1"
                      }) : (0, W.jsx)("div", {
                      className: "w-full h-full bg-[#f5f5f5]"
                    })
                  }), (0, W.jsxs)("div", {
                    className: "min-w-0 flex-1",
                    children: [(0, W.jsx)("h3", {
                      className: "font-sans text-sm sm:text-base leading-snug",
                      children: j.name
                    }), (0, W.jsx)("p", {
                      className: "font-sans text-xs text-[#888] mt-1",
                      children: j.variation ?? j
                        .description
                    }), (0, W.jsxs)("p", {
                      className: "font-sans text-sm mt-2",
                      children: ["\xD7", j
                        .quantity
                      ]
                    })]
                  }), (0, W.jsxs)("p", {
                    className: "font-sans text-sm text-[#ef3b2d] whitespace-nowrap",
                    children: ["\u20B1", (j.price * j
                      .quantity).toLocaleString()]
                  })]
                }, `${O.id}-${j.catalogItemId}-${H}`)
              })
            }), (0, W.jsxs)("div", {
              className: "bg-[#fffdfb] border-t border-[#ececec] px-4 sm:px-6 py-5",
              children: [(0, W.jsxs)("div", {
                className: "flex justify-end items-center gap-3 font-sans text-sm",
                children: ["Amount Payable: ", (0, W.jsxs)(
                  "strong", {
                    className: "text-[#ef3b2d] text-2xl",
                    children: ["\u20B1", O.total
                      .toLocaleString()
                    ]
                  })]
              }), (0, W.jsxs)("div", {
                className: "flex flex-wrap justify-end gap-2 mt-5",
                children: [(0, W.jsx)("button", {
                  className: "border border-[#d8d8d8] min-w-36 px-5 py-3 font-sans text-sm hover:border-[#ef3b2d] hover:text-[#ef3b2d]",
                  children: "Contact Seller"
                }), O.status === "to-pay" && (0, W.jsx)(
                  "button", {
                    onClick: () => N(O.id),
                    disabled: q,
                    className: "border border-[#d8d8d8] min-w-36 px-5 py-3 font-sans text-sm hover:border-[#ef3b2d] hover:text-[#ef3b2d] disabled:opacity-50",
                    children: "Cancel Order"
                  }), O.status === "to-receive" && (0, W
                  .jsx)("button", {
                  className: "bg-[#ef3b2d] text-white min-w-36 px-5 py-3 font-sans text-sm font-bold",
                  children: "Order Received"
                })]
              })]
            })]
          }, O.id))
        })]
      })]
    })
  }
  var Ca, W, o0, s0, lO = z(() => {
    "use client";
    Ca = GA(ja());
    Lq();
    se();
    W = GA(Wt()), o0 = [{
      label: "All",
      value: "all"
    }, {
      label: "To Pay",
      value: "to-pay"
    }, {
      label: "To Ship",
      value: "to-ship"
    }, {
      label: "To Receive",
      value: "to-receive"
    }, {
      label: "Completed",
      value: "completed"
    }, {
      label: "Cancelled",
      value: "cancelled"
    }, {
      label: "Return / Refund",
      value: "return-refund"
    }], s0 = {
      "to-pay": "TO PAY",
      "to-ship": "TO SHIP",
      "to-receive": "TO RECEIVE",
      completed: "COMPLETED",
      cancelled: "CANCELLED",
      "return-refund": "RETURN / REFUND"
    }
  });
  var iO, nO = z(() => {
    iO = {
      src: "assets/images/image-36.jpg"
    }
  });
  var IO, qO = z(() => {
    IO = {
      src: "assets/images/image-37.jpg"
    }
  });
  var pO, RO = z(() => {
    pO = {
      src: "assets/images/image-38.jpg"
    }
  });

  function wq() {
    let [A, t] = (0, yA.useState)(null), [a, c] = (0, yA.useState)(!1), u = A?.view ?? null, [e,
      l] = (0, yA.useState)([]), [n, r] = (0, yA.useState)(() => Object.fromEntries(NA.map(
      d => [d.id, d.stock ?? 0]))), [I, p] = (0, yA.useState)({}), q = (d, S) => {
      p(N => ({
        ...N,
        [d]: S
      }))
    }, R = d => {
      l(S => [d, ...S]), A?.customer && uO(d).then(S => {
        S.success && t(N => N?.customer ? {
          ...N,
          customer: {
            ...N.customer,
            orders: [S.order, ...N.customer.orders]
          }
        } : N)
      }), d.parts.length > 0 && r(S => {
        let N = {
          ...S
        };
        for (let x of d.parts) N[x.id] = Math.max(0, (N[x.id] ?? 0) - (x.qty ?? 1));
        return N
      })
    };
    return (0, b.jsx)("div", {
      className: "h-dvh w-full overflow-hidden bg-[#0a0a0a] relative",
      children: u === null ? (0, b.jsxs)(b.Fragment, {
        children: [(0, b.jsx)(U0, {
          onLogin: () => c(!0),
          onStart: d => t({
            view: "kiosk",
            kioskMode: d
          })
        }), a && (0, b.jsx)(y0, {
          onLogin: result => { c(!1); t(result.view === "customer" ? { ...result, view: "storefront" } : result); },
          onBack: () => c(!1)
        })]
      }) : (0, b.jsx)(b.Fragment, {
        children: (0, b.jsxs)("div", {
          className: "h-full",
          children: [u === "storefront" && A?.customer && (0, b.jsx)(U0, {
            customer: A.customer,
            onAccount: tab => t(current => ({ ...current, view: "customer", accountTab: tab })),
            onLogout: async () => { await aO(); t(null); },
            onStart: mode => t(current => ({ ...current, view: "kiosk", kioskMode: mode }))
          }), u === "customer" && A?.customer && (0, b.jsx)(window.GSpotProfile, { React: yA, customer: A.customer, initialTab: A.accountTab, onHome: () => t(current => ({ ...current, view: "storefront" })), children: (0, b.jsx)(Zq, {
            customerName: A.customer.name,
            initialOrders: A.customer.orders,
            onShopParts: () => t(d => d?.customer ? {
              ...d,
              view: "kiosk",
              kioskMode: "parts"
            } : d),
            onBookService: () => t(d => d?.customer ? {
              ...d,
              view: "kiosk",
              kioskMode: "service"
            } : d),
            onLoggedOut: () => t(null)
          }) }), u === "kiosk" && (0, b.jsx)(mq, {
            onNewTicket: R,
            inventory: n,
            initialMode: A?.kioskMode,
            onExit: () => t(current => current?.customer ? { ...current, view: "storefront" } : null),
            onViewOrders: A?.customer ? () => t(d => d?.customer ? {
              ...d,
              view: "customer"
            } : d) : void 0
          }), u === "manager" && (0, b.jsx)(zq, {
            liveTickets: e,
            inventory: n,
            setInventory: r,
            ticketStatusOverrides: I,
            onTicketStatusChange: q,
            initialManagerId: A?.managerId,
            onSignOut: () => t(null)
          })]
        })
      })
    })
  }

  function U0({
    customer, onAccount, onLogout,
    onLogin: A,
    onStart: t
  }) {
    let [a, c] = (0, yA.useState)(""), u = a.trim().toLowerCase(), e = NA.filter(q => !u ||
        `${q.name} ${q.description}`.toLowerCase().includes(u)), l = Nt.filter(q => !u ||
        `${q.name} ${q.description}`.toLowerCase().includes(u)), n = (u ? e : NA).slice(0, 8), r =
      (u ? l : Nt).slice(0, 6), I = ["TOYOTA", "HONDA", "MITSUBISHI", "NISSAN", "FORD", "MAZDA"],
      p = q => document.getElementById(q)?.scrollIntoView({
        behavior: "smooth"
      });
    return (0, b.jsxs)("div", {
      className: "h-full w-full overflow-y-auto bg-[#f4f4f4] text-[#181818]",
      children: [(0, b.jsxs)("header", {
        className: `sticky top-0 z-40 shadow-sm ${customer ? "gs-signed-header" : ""}`,
        children: [(0, b.jsx)("div", {
          className: "bg-[#d71920] text-white",
          children: (0, b.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-9 flex items-center justify-between gap-4 text-[10px] sm:text-xs font-sans",
            children: [(0, b.jsx)("p", {
              className: "font-semibold tracking-wide",
              children: "Professional car care and genuine parts in Metro Manila"
            }), (0, b.jsxs)("div", {
              className: "hidden sm:flex items-center gap-5 text-white/90",
              children: [(0, b.jsx)("span", {
                children: "Mon\u2013Sat 8AM\u20136PM"
              }), (0, b.jsx)("a", {
                href: "tel:+63281234789",
                className: "hover:text-white",
                children: "(02) 8123-4789"
              })]
            })]
          })
        }), (0, b.jsx)("div", {
          className: "bg-white",
          children: (0, b.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-20 flex items-center gap-3 sm:gap-6",
            children: [(0, b.jsxs)("button", {
              onClick: () => window.scrollTo({
                top: 0,
                behavior: "smooth"
              }),
              className: "flex-shrink-0 flex items-center gap-2.5",
              "aria-label": "G Spot home",
              children: [(0, b.jsx)("span", {
                className: "w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#d71920] text-white font-display text-3xl font-black italic flex items-center justify-center",
                children: "G"
              }), (0, b.jsxs)("span", {
                className: "hidden sm:block text-left",
                children: [(0, b.jsx)("span", {
                  className: "block font-display text-2xl font-black italic tracking-tight leading-none",
                  children: "G SPOT"
                }), (0, b.jsx)("span", {
                  className: "block font-sans text-[8px] font-bold tracking-[0.24em] text-[#777777] mt-1",
                  children: "AUTOMOTIVE CENTER"
                })]
              })]
            }), (0, b.jsxs)("div", {
              className: "relative flex-1 max-w-2xl lg:mx-auto",
              children: [(0, b.jsx)("input", {
                value: a,
                onChange: q => c(q.target.value),
                onKeyDown: q => {
                  q.key === "Enter" && p(e.length ? "parts" :
                    "services")
                },
                placeholder: "Search parts or services...",
                "aria-label": "Search parts or services",
                className: "w-full rounded-md bg-[#f5f5f5] border border-[#d6d6d6] text-[#181818] pl-4 pr-12 py-3 font-sans text-sm focus:outline-none focus:border-[#d71920] focus:bg-white transition-colors placeholder:text-[#8b8b8b]"
              }), (0, b.jsx)("button", {
                onClick: () => p(e.length ? "parts" : "services"),
                "aria-label": "Search",
                className: "absolute right-0 top-0 h-full w-12 bg-[#d71920] text-white rounded-r-md flex items-center justify-center hover:bg-[#b80f16] transition-colors",
                children: (0, b.jsxs)("svg", {
                  width: "19",
                  height: "19",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  "aria-hidden": "true",
                  children: [(0, b.jsx)("circle", {
                    cx: "11",
                    cy: "11",
                    r: "6.5",
                    stroke: "currentColor",
                    strokeWidth: "2"
                  }), (0, b.jsx)("path", {
                    d: "m16 16 4 4",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round"
                  })]
                })
              })]
            }), customer ? (0, b.jsx)(window.GSpotAccountMenu, { React: yA, customer, onAccount, onLogout }) : (0, b.jsxs)("button", {
              onClick: A,
              className: "font-sans text-sm font-bold",
              children: "Log in"
            })]
          })
        }), (0, b.jsx)("nav", {
          className: "bg-[#151515] text-white overflow-x-auto",
          children: (0, b.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-11 flex items-center gap-7 min-w-max font-sans text-xs font-bold tracking-wide",
            children: [(0, b.jsx)("button", {
              onClick: () => t("parts"),
              className: "h-full px-5 -ml-5 bg-[#d71920] hover:bg-[#b80f16] transition-colors",
              children: "SHOP ALL PARTS"
            }), (0, b.jsx)("button", {
              onClick: () => p("categories"),
              className: "hover:text-[#ef3a40] transition-colors",
              children: "CATEGORIES"
            }), (0, b.jsx)("button", {
              onClick: () => p("parts"),
              className: "hover:text-[#ef3a40] transition-colors",
              children: "BEST SELLERS"
            }), (0, b.jsx)("button", {
              onClick: () => p("services"),
              className: "hover:text-[#ef3a40] transition-colors",
              children: "SERVICES"
            }), (0, b.jsx)("button", {
              onClick: () => t("service"),
              className: "hover:text-[#ef3a40] transition-colors",
              children: "BOOK A SERVICE"
            }), (0, b.jsx)("button", {
              onClick: () => p("about"),
              className: "hover:text-[#ef3a40] transition-colors",
              children: "ABOUT US"
            }), (0, b.jsx)("button", {
              onClick: () => p("contact"),
              className: "hover:text-[#ef3a40] transition-colors",
              children: "CONTACT"
            })]
          })
        })]
      }), (0, b.jsxs)("main", {
        children: [(0, b.jsxs)("section", {
          className: "relative min-h-[430px] sm:min-h-[510px] overflow-hidden bg-[#171717]",
          children: [(0, b.jsx)("img", {
            src: pO.src,
            alt: "G Spot Automotive workshop",
            className: "absolute inset-0 h-full w-full object-cover object-center"
          }), (0, b.jsx)("div", {
            className: "absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/10"
          }), (0, b.jsx)("div", {
            className: "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 min-h-[430px] sm:min-h-[510px] flex items-center",
            children: (0, b.jsxs)("div", {
              className: "max-w-2xl text-white",
              children: [(0, b.jsx)("p", {
                className: "font-sans text-[#ff3b42] text-xs sm:text-sm font-black tracking-[0.22em] mb-4",
                children: "G SPOT AUTOMOTIVE SERVICE CENTER"
              }), (0, b.jsxs)("h1", {
                className: "font-display text-5xl sm:text-7xl lg:text-8xl leading-[0.88] font-black uppercase italic tracking-tight",
                children: ["Everything", (0, b.jsx)("br", {}),
                  "your car needs."
                ]
              }), (0, b.jsx)("p", {
                className: "font-sans text-white/80 text-sm sm:text-lg leading-relaxed mt-6 max-w-xl",
                children: "Shop quality parts, book trusted automotive services, and keep your vehicle road-ready\u2014all in one place."
              }), (0, b.jsxs)("div", {
                className: "flex flex-wrap gap-3 mt-8",
                children: [(0, b.jsx)("button", {
                  onClick: () => t("parts"),
                  className: "bg-[#d71920] text-white px-7 py-3.5 font-sans text-xs font-black tracking-wider hover:bg-white hover:text-[#d71920] transition-colors",
                  children: "SHOP CAR PARTS"
                }), (0, b.jsx)("button", {
                  onClick: () => t("service"),
                  className: "bg-white text-[#171717] px-7 py-3.5 font-sans text-xs font-black tracking-wider hover:bg-[#171717] hover:text-white transition-colors",
                  children: "BOOK A SERVICE"
                })]
              })]
            })
          }), (0, b.jsxs)("div", {
            className: "absolute right-4 sm:right-8 bottom-5 bg-[#d71920] text-white px-4 py-3 shadow-xl",
            children: [(0, b.jsx)("p", {
              className: "font-display text-2xl font-black italic leading-none",
              children: "4.9 / 5"
            }), (0, b.jsx)("p", {
              className: "font-sans text-[9px] font-bold tracking-widest mt-1",
              children: "LOCAL DRIVER RATING"
            })]
          })]
        }), (0, b.jsx)("section", {
          className: "bg-white border-b border-[#dedede]",
          children: (0, b.jsx)("div", {
            className: "max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4",
            children: [
              ["24", "QUALITY PARTS", "Live stock, clear pricing"],
              ["10", "AUTO SERVICES", "From maintenance to repair"],
              ["7 DAYS", "OPEN WEEKLY", "Convenient service hours"],
              ["ONE STOP", "CAR CARE", "Parts, booking and support"]
            ].map(([q, R, d], S) => (0, b.jsxs)("div", {
              className: `px-5 sm:px-7 py-5 flex items-center gap-4 ${S%2===0?"border-r":""} lg:border-r lg:last:border-r-0 border-b lg:border-b-0 border-[#e5e5e5]`,
              children: [(0, b.jsx)("span", {
                className: "font-display text-2xl sm:text-3xl font-black italic text-[#d71920] whitespace-nowrap",
                children: q
              }), (0, b.jsxs)("span", {
                children: [(0, b.jsx)("span", {
                  className: "block font-sans text-[10px] font-black tracking-wider",
                  children: R
                }), (0, b.jsx)("span", {
                  className: "block font-sans text-[9px] text-[#8a8a8a] mt-1",
                  children: d
                })]
              })]
            }, R))
          })
        }), (0, b.jsxs)("section", {
          id: "categories",
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16",
          children: [(0, b.jsxs)("div", {
            className: "text-center mb-7",
            children: [(0, b.jsx)("p", {
              className: "font-sans text-[#d71920] text-[10px] font-black tracking-[0.24em]",
              children: "START HERE"
            }), (0, b.jsx)("h2", {
              className: "font-display text-3xl sm:text-4xl font-black uppercase italic mt-1",
              children: "What are you looking for?"
            })]
          }), (0, b.jsxs)("div", {
            className: "grid grid-cols-2 lg:grid-cols-4 lg:grid-rows-2 gap-3 lg:h-[520px]",
            children: [(0, b.jsxs)("button", {
              onClick: () => t("service"),
              className: "relative min-h-64 lg:row-span-2 lg:col-span-2 overflow-hidden group text-left bg-[#222222]",
              children: [(0, b.jsx)("img", {
                src: IO.src,
                alt: "Automotive services",
                className: "absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              }), (0, b.jsx)("div", {
                className: "absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10"
              }), (0, b.jsxs)("span", {
                className: "absolute inset-x-0 bottom-0 p-5 sm:p-7 text-white",
                children: [(0, b.jsx)("span", {
                  className: "block font-display text-3xl sm:text-4xl font-black uppercase italic",
                  children: "Automotive Services"
                }), (0, b.jsx)("span", {
                  className: "block font-sans text-xs text-white/75 mt-2",
                  children: "Book expert care for your vehicle"
                }), (0, b.jsx)("span", {
                  className: "inline-block font-sans text-[10px] font-black tracking-widest mt-4 border-b-2 border-[#d71920] pb-1",
                  children: "BOOK NOW \u2192"
                })]
              })]
            }), [{
              title: "Engine & Fluids",
              part: NA[0]
            }, {
              title: "Brakes & Safety",
              part: NA[5]
            }, {
              title: "Tires & Suspension",
              part: NA[10]
            }, {
              title: "Batteries & Lights",
              part: NA[9]
            }].map(q => (0, b.jsxs)("button", {
              onClick: () => t("parts"),
              className: "relative min-h-48 lg:min-h-0 overflow-hidden group bg-white border border-[#dedede] text-left",
              children: [q.part.image && (0, b.jsx)("img", {
                src: q.part.image,
                alt: "",
                className: "absolute right-0 bottom-0 w-[68%] h-[78%] object-contain group-hover:scale-110 transition-transform duration-300"
              }), (0, b.jsx)("span", {
                className: "absolute inset-0 bg-gradient-to-r from-white via-white/85 to-transparent"
              }), (0, b.jsxs)("span", {
                className: "absolute left-4 top-4 max-w-[55%]",
                children: [(0, b.jsx)("span", {
                  className: "block font-display text-xl sm:text-2xl font-black uppercase italic leading-none",
                  children: q.title
                }), (0, b.jsx)("span", {
                  className: "block font-sans text-[10px] font-bold text-[#d71920] mt-3",
                  children: "SHOP NOW \u2192"
                })]
              })]
            }, q.title))]
          })]
        }), (0, b.jsx)("section", {
          id: "parts",
          className: "bg-white border-y border-[#dedede] py-12 sm:py-16",
          children: (0, b.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [(0, b.jsxs)("div", {
              className: "flex items-end justify-between gap-4 mb-7",
              children: [(0, b.jsxs)("div", {
                children: [(0, b.jsx)("p", {
                  className: "font-sans text-[#d71920] text-[10px] font-black tracking-[0.24em]",
                  children: "POPULAR PICKS"
                }), (0, b.jsx)("h2", {
                  className: "font-display text-3xl sm:text-4xl font-black uppercase italic mt-1",
                  children: "Shop best sellers"
                })]
              }), (0, b.jsx)("button", {
                onClick: () => t("parts"),
                className: "font-sans text-[10px] sm:text-xs font-black tracking-wider border-b-2 border-[#d71920] pb-1",
                children: "VIEW ALL PARTS \u2192"
              })]
            }), n.length > 0 ? (0, b.jsx)("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-px bg-[#dedede] border border-[#dedede]",
              children: n.map((q, R) => (0, b.jsxs)("button", {
                onClick: () => t("parts"),
                className: "group bg-white text-left p-4 sm:p-5 hover:shadow-xl hover:relative hover:z-10 transition-shadow",
                children: [(0, b.jsxs)("div", {
                  className: "relative aspect-square bg-[#f7f7f7] overflow-hidden",
                  children: [q.image && (0, b.jsx)("img", {
                    src: q.image,
                    alt: q.name,
                    className: "w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  }), R < 2 && (0, b.jsx)("span", {
                    className: "absolute top-2 left-2 bg-[#d71920] text-white px-2 py-1 font-sans text-[8px] font-black tracking-wider",
                    children: "BEST SELLER"
                  })]
                }), (0, b.jsx)("p", {
                  className: "font-sans text-[#777777] text-[9px] font-bold tracking-wider uppercase mt-4",
                  children: ha.find(d => d.id === q
                    .partCategory)?.label
                }), (0, b.jsx)("h3", {
                  className: "font-sans text-sm font-bold leading-snug mt-1 min-h-10",
                  children: q.name
                }), (0, b.jsxs)("div", {
                  className: "flex items-center justify-between mt-3",
                  children: [(0, b.jsxs)("span", {
                    className: "font-sans text-[#d71920] text-base font-black",
                    children: ["\u20B1", q.price
                      .toLocaleString()
                    ]
                  }), (0, b.jsxs)("span", {
                    className: "font-sans text-[9px] text-[#258045]",
                    children: [q.stock, " in stock"]
                  })]
                })]
              }, q.id))
            }) : (0, b.jsxs)("div", {
              className: "border border-dashed border-[#cfcfcf] bg-[#f8f8f8] py-16 text-center",
              children: [(0, b.jsxs)("p", {
                className: "font-sans text-[#777777]",
                children: ["No parts match \u201C", a, "\u201D."]
              }), (0, b.jsx)("button", {
                onClick: () => c(""),
                className: "mt-3 text-[#d71920] font-sans text-sm font-bold",
                children: "Clear search"
              })]
            })]
          })
        }), (0, b.jsx)("section", {
          className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16",
          children: (0, b.jsxs)("div", {
            className: "grid lg:grid-cols-[1.15fr_0.85fr] gap-5",
            children: [(0, b.jsxs)("button", {
              onClick: () => t("parts"),
              className: "relative min-h-72 overflow-hidden text-left group bg-[#d71920]",
              children: [(0, b.jsx)("img", {
                src: iO.src,
                alt: "Automotive parts marketplace",
                className: "absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-60 group-hover:scale-105 transition-transform duration-500"
              }), (0, b.jsx)("div", {
                className: "absolute inset-0 bg-gradient-to-r from-[#d71920] via-[#d71920]/75 to-transparent"
              }), (0, b.jsxs)("div", {
                className: "relative p-7 sm:p-10 text-white max-w-lg",
                children: [(0, b.jsx)("p", {
                  className: "font-sans text-[10px] font-black tracking-[0.24em]",
                  children: "G SPOT PARTS MARKETPLACE"
                }), (0, b.jsx)("h2", {
                  className: "font-display text-4xl sm:text-5xl font-black uppercase italic leading-none mt-3",
                  children: "Drive-ready deals"
                }), (0, b.jsx)("p", {
                  className: "font-sans text-sm text-white/85 mt-4",
                  children: "Quality automotive parts with transparent prices and optional professional installation."
                }), (0, b.jsx)("span", {
                  className: "inline-block bg-white text-[#d71920] px-5 py-3 font-sans text-[10px] font-black tracking-wider mt-6",
                  children: "SHOP ALL PARTS \u2192"
                })]
              })]
            }), (0, b.jsxs)("div", {
              className: "bg-[#171717] text-white p-7 sm:p-9",
              children: [(0, b.jsx)("p", {
                className: "font-sans text-[#ef3a40] text-[10px] font-black tracking-[0.24em]",
                children: "SHOP BY VEHICLE"
              }), (0, b.jsx)("h2", {
                className: "font-display text-3xl font-black uppercase italic mt-2",
                children: "Popular car brands"
              }), (0, b.jsx)("div", {
                className: "grid grid-cols-3 gap-px bg-white/15 mt-6",
                children: I.map(q => (0, b.jsx)("button", {
                  onClick: () => t("parts"),
                  className: "bg-[#171717] px-3 py-5 font-display text-base font-black italic hover:bg-[#d71920] transition-colors",
                  children: q
                }, q))
              }), (0, b.jsx)("p", {
                className: "font-sans text-white/50 text-xs mt-5",
                children: "Not sure what fits? Our team can help match the right part to your vehicle."
              })]
            })]
          })
        }), (0, b.jsx)("section", {
          id: "services",
          className: "bg-[#e9e9e9] border-y border-[#d7d7d7] py-12 sm:py-16",
          children: (0, b.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
            children: [(0, b.jsxs)("div", {
              className: "flex items-end justify-between gap-4 mb-7",
              children: [(0, b.jsxs)("div", {
                children: [(0, b.jsx)("p", {
                  className: "font-sans text-[#d71920] text-[10px] font-black tracking-[0.24em]",
                  children: "EXPERT CAR CARE"
                }), (0, b.jsx)("h2", {
                  className: "font-display text-3xl sm:text-4xl font-black uppercase italic mt-1",
                  children: "Popular services"
                })]
              }), (0, b.jsx)("button", {
                onClick: () => t("service"),
                className: "font-sans text-[10px] sm:text-xs font-black tracking-wider border-b-2 border-[#d71920] pb-1",
                children: "BOOK SERVICE \u2192"
              })]
            }), r.length > 0 ? (0, b.jsx)("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4",
              children: r.map(q => (0, b.jsxs)("button", {
                onClick: () => t("service"),
                className: "group bg-white text-left border border-[#d8d8d8] overflow-hidden hover:border-[#d71920] transition-colors",
                children: [(0, b.jsxs)("div", {
                  className: "relative aspect-[16/9] overflow-hidden bg-[#ddd]",
                  children: [q.image && (0, b.jsx)("img", {
                    src: q.image,
                    alt: q.name,
                    className: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  }), (0, b.jsxs)("span", {
                    className: "absolute top-3 right-3 bg-white text-[#d71920] px-3 py-1.5 font-sans text-xs font-black",
                    children: ["FROM \u20B1", q.price
                      .toLocaleString()
                    ]
                  })]
                }), (0, b.jsxs)("div", {
                  className: "p-5",
                  children: [(0, b.jsxs)("div", {
                    className: "flex items-start justify-between gap-3",
                    children: [(0, b.jsx)("h3", {
                      className: "font-display text-2xl font-black uppercase italic",
                      children: q.name
                    }), (0, b.jsx)("span", {
                      className: "font-sans text-[9px] text-[#777] whitespace-nowrap pt-1",
                      children: q.duration
                    })]
                  }), (0, b.jsx)("p", {
                    className: "font-sans text-[#777] text-xs leading-relaxed mt-2 line-clamp-2",
                    children: q.description
                  }), (0, b.jsx)("span", {
                    className: "inline-block font-sans text-[10px] font-black text-[#d71920] mt-4",
                    children: "BOOK NOW \u2192"
                  })]
                })]
              }, q.id))
            }) : (0, b.jsxs)("div", {
              className: "border border-dashed border-[#c5c5c5] bg-white py-16 text-center",
              children: [(0, b.jsxs)("p", {
                className: "font-sans text-[#777777]",
                children: ["No services match \u201C", a,
                  "\u201D."
                ]
              }), (0, b.jsx)("button", {
                onClick: () => c(""),
                className: "mt-3 text-[#d71920] font-sans text-sm font-bold",
                children: "Clear search"
              })]
            })]
          })
        }), (0, b.jsx)("section", {
          id: "about",
          className: "bg-[#d71920] text-white",
          children: (0, b.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col md:flex-row md:items-center justify-between gap-7",
            children: [(0, b.jsxs)("div", {
              children: [(0, b.jsx)("p", {
                className: "font-sans text-white/70 text-[10px] font-black tracking-[0.24em]",
                children: "PARTS. SERVICE. PEACE OF MIND."
              }), (0, b.jsx)("h2", {
                className: "font-display text-3xl sm:text-5xl font-black uppercase italic mt-2",
                children: "Ready to take care of your car?"
              }), (0, b.jsx)("p", {
                className: "font-sans text-white/80 text-sm mt-2",
                children: "Book online, track your ticket, and get back on the road."
              })]
            }), (0, b.jsx)("button", {
              onClick: () => t("service"),
              className: "bg-white text-[#d71920] px-8 py-4 font-sans font-black text-xs tracking-wider hover:bg-[#171717] hover:text-white transition-colors whitespace-nowrap",
              children: "START YOUR BOOKING \u2192"
            })]
          })
        }), (0, b.jsx)("footer", {
          id: "contact",
          className: "bg-[#111111] text-white",
          children: (0, b.jsxs)("div", {
            className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8",
            children: [(0, b.jsxs)("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_0.8fr_1.15fr_0.9fr] gap-9 lg:gap-8",
              children: [(0, b.jsxs)("div", {
                children: [(0, b.jsxs)("button", {
                  onClick: () => window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                  }),
                  className: "flex items-center gap-3 mb-5",
                  children: [(0, b.jsx)("span", {
                    className: "w-14 h-14 rounded-full bg-[#d71920] text-white font-display text-4xl font-black italic flex items-center justify-center",
                    children: "G"
                  }), (0, b.jsxs)("span", {
                    children: [(0, b.jsx)("span", {
                      className: "block font-display text-3xl font-black italic tracking-tight leading-none",
                      children: "G SPOT"
                    }), (0, b.jsx)("span", {
                      className: "block font-sans text-white/45 text-[8px] font-bold tracking-[0.24em] mt-1",
                      children: "AUTOMOTIVE CENTER"
                    })]
                  })]
                }), (0, b.jsx)("p", {
                  className: "font-sans text-white/60 text-sm leading-6 max-w-sm",
                  children: "Quality automotive maintenance, repairs, genuine parts, and professional customer care in Metro Manila."
                }), (0, b.jsxs)("div", {
                  className: "flex items-center gap-3 mt-6",
                  children: [(0, b.jsx)(Dq, {
                    label: "Facebook",
                    type: "facebook"
                  }), (0, b.jsx)(Dq, {
                    label: "Instagram",
                    type: "instagram"
                  }), (0, b.jsx)(Dq, {
                    label: "YouTube",
                    type: "youtube"
                  })]
                })]
              }), (0, b.jsxs)(oi, {
                title: "Shop",
                children: [(0, b.jsx)("button", {
                  onClick: () => t("parts"),
                  className: "block text-left text-white/60 hover:text-white",
                  children: "All Parts"
                }), ha.slice(1, 6).map(q => (0, b.jsx)(
                  "button", {
                    onClick: () => t("parts"),
                    className: "block text-left text-white/60 hover:text-white",
                    children: q.label
                  }, q.id))]
              }), (0, b.jsxs)(oi, {
                title: "Services",
                children: [(0, b.jsx)("button", {
                  onClick: () => t("service"),
                  className: "block text-left text-white/60 hover:text-white",
                  children: "Book a Service"
                }), Nt.slice(0, 5).map(q => (0, b.jsx)(
                  "button", {
                    onClick: () => t("service"),
                    className: "block text-left text-white/60 hover:text-white",
                    children: q.name
                  }, q.id))]
              }), (0, b.jsxs)(oi, {
                title: "Contact",
                children: [(0, b.jsxs)("div", {
                  className: "flex items-start gap-3 text-white/60",
                  children: [(0, b.jsx)(Pe, {
                    type: "location"
                  }), (0, b.jsxs)("p", {
                    children: [
                      "Unit 5, 123 J.P. Rizal Street,",
                      (0, b.jsx)("br", {}),
                      "Mandaluyong City, 1550", (0,
                        b.jsx)("br", {}),
                      "Metro Manila, Philippines"
                    ]
                  })]
                }), (0, b.jsxs)("div", {
                  className: "flex items-center gap-3 text-white/60",
                  children: [(0, b.jsx)(Pe, {
                    type: "phone"
                  }), (0, b.jsx)("a", {
                    href: "tel:+63281234789",
                    className: "hover:text-white",
                    children: "(02) 8123-4789"
                  })]
                }), (0, b.jsxs)("div", {
                  className: "flex items-center gap-3 text-white/60",
                  children: [(0, b.jsx)(Pe, {
                    type: "email"
                  }), (0, b.jsx)("a", {
                    href: "mailto:service@gspotauto.ph",
                    className: "hover:text-white break-all",
                    children: "service@gspotauto.ph"
                  })]
                })]
              }), (0, b.jsxs)(oi, {
                title: "Store Hours",
                children: [(0, b.jsxs)("div", {
                  className: "flex items-start gap-3 text-white/60",
                  children: [(0, b.jsx)(Pe, {
                    type: "clock"
                  }), (0, b.jsxs)("p", {
                    children: [(0, b.jsx)("span", {
                        className: "text-white",
                        children: "Monday \u2013 Saturday"
                      }), (0, b.jsx)("br", {}),
                      "8:00 AM \u2013 6:00 PM"
                    ]
                  })]
                }), (0, b.jsxs)("div", {
                  className: "flex items-start gap-3 text-white/60",
                  children: [(0, b.jsx)(Pe, {
                    type: "clock"
                  }), (0, b.jsxs)("p", {
                    children: [(0, b.jsx)("span", {
                        className: "text-white",
                        children: "Sunday"
                      }), (0, b.jsx)("br", {}),
                      "9:00 AM \u2013 4:00 PM"
                    ]
                  })]
                }), (0, b.jsx)("button", {
                  onClick: () => t("service"),
                  className: "mt-2 w-full border border-[#d71920] bg-[#d71920] px-4 py-2.5 font-sans text-xs font-bold hover:bg-white hover:text-[#d71920] transition-colors",
                  children: "BOOK APPOINTMENT"
                })]
              })]
            }), (0, b.jsxs)("div", {
              className: "mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 font-sans text-white/35 text-xs",
              children: [(0, b.jsx)("p", {
                children: "\xA9 2026 G Spot Automotive Service Center. All rights reserved."
              }), (0, b.jsx)("p", {
                children: "Professional care for every drive."
              })]
            })]
          })
        })]
      })]
    })
  }

  function oi({
    title: A,
    children: t
  }) {
    return (0, b.jsxs)("div", {
      children: [(0, b.jsx)("h3", {
        className: "font-sans text-lg font-bold mb-5",
        children: A
      }), (0, b.jsx)("div", {
        className: "font-sans text-sm leading-6 space-y-2.5",
        children: t
      })]
    })
  }

  function Pe({
    type: A
  }) {
    return (0, b.jsxs)("span", {
      className: "text-[#e24949] flex-shrink-0 mt-1",
      children: [A === "location" && (0, b.jsxs)("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [(0, b.jsx)("path", {
          d: "M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z",
          stroke: "currentColor",
          strokeWidth: "1.8"
        }), (0, b.jsx)("circle", {
          cx: "12",
          cy: "10",
          r: "2",
          stroke: "currentColor",
          strokeWidth: "1.8"
        })]
      }), A === "phone" && (0, b.jsx)("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: (0, b.jsx)("path", {
          d: "M7 4 4.5 6.5c.7 6.4 6.6 12.3 13 13L20 17l-4-3-2 2c-2.5-1-5-3.5-6-6l2-2-3-4Z",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinejoin: "round"
        })
      }), A === "email" && (0, b.jsxs)("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [(0, b.jsx)("rect", {
          x: "3",
          y: "5",
          width: "18",
          height: "14",
          stroke: "currentColor",
          strokeWidth: "1.8"
        }), (0, b.jsx)("path", {
          d: "m4 7 8 6 8-6",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinejoin: "round"
        })]
      }), A === "clock" && (0, b.jsxs)("svg", {
        width: "16",
        height: "16",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [(0, b.jsx)("circle", {
          cx: "12",
          cy: "12",
          r: "8.5",
          stroke: "currentColor",
          strokeWidth: "1.8"
        }), (0, b.jsx)("path", {
          d: "M12 7v5l3 2",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round"
        })]
      })]
    })
  }

  function Dq({
    label: A,
    type: t
  }) {
    return (0, b.jsxs)("a", {
      href: "#",
      "aria-label": A,
      className: "w-9 h-9 rounded-full bg-white text-[#123550] flex items-center justify-center hover:bg-[#cc0000] hover:text-white transition-colors",
      children: [t === "facebook" && (0, b.jsx)("span", {
        className: "font-sans font-black text-base",
        children: "f"
      }), t === "instagram" && (0, b.jsxs)("svg", {
        width: "17",
        height: "17",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [(0, b.jsx)("rect", {
          x: "4",
          y: "4",
          width: "16",
          height: "16",
          rx: "4",
          stroke: "currentColor",
          strokeWidth: "2"
        }), (0, b.jsx)("circle", {
          cx: "12",
          cy: "12",
          r: "3.5",
          stroke: "currentColor",
          strokeWidth: "2"
        }), (0, b.jsx)("circle", {
          cx: "17",
          cy: "7",
          r: "1",
          fill: "currentColor"
        })]
      }), t === "youtube" && (0, b.jsxs)("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 24 24",
        fill: "none",
        "aria-hidden": "true",
        children: [(0, b.jsx)("path", {
          d: "M21 12c0 4-1 6-1 6s-2 1-8 1-8-1-8-1-1-2-1-6 1-6 1-6 2-1 8-1 8 1 8 1 1 2 1 6Z",
          stroke: "currentColor",
          strokeWidth: "1.8"
        }), (0, b.jsx)("path", {
          d: "m10 9 5 3-5 3V9Z",
          fill: "currentColor"
        })]
      })]
    })
  }

  function y0({
    onLogin: A,
    onBack: t
  }) {
    let [a, c] = (0, yA.useState)("login"), [u, e] = (0, yA.useState)(""), [l, n] = (0, yA
      .useState)(""), [r, I] = (0, yA.useState)(""), [p, q] = (0, yA.useState)(""), [R, d] = (0,
      yA.useState)(!1), [S, N] = (0, yA.useState)(!0), [x, O] = (0, yA.useState)(!1), [j, H] = (0,
      yA.useState)(""), [E, s] = (0, yA.useState)(""), [P, k] = (0, yA.useState)(!1), o = () => {
      H(""), s("")
    }, T = J => {
      c(J), o(), n(""), q(""), O(!1)
    };
    return (0, b.jsx)("div", {
      className: "fixed inset-0 z-50 bg-black/25 lg:bg-transparent",
      onClick: t,
      children: (0, b.jsx)("aside", {
        "aria-label": "Account login",
        className: "absolute inset-y-0 right-0 w-full sm:w-[430px] lg:top-20 bg-[#f7f7f5] border-l border-[#e4e4e1] shadow-2xl overflow-y-auto",
        onClick: J => J.stopPropagation(),
        children: (0, b.jsxs)("div", {
          className: "min-h-full px-4 sm:px-6 py-5 sm:py-7 flex flex-col",
          children: [(0, b.jsxs)("div", {
            className: "flex items-center justify-between mb-5",
            children: [(0, b.jsxs)("div", {
              className: "flex items-center gap-2.5",
              children: [(0, b.jsx)("span", {
                className: "w-9 h-9 bg-[#cc0000] text-white font-mono text-lg font-black flex items-center justify-center",
                children: "G"
              }), (0, b.jsxs)("div", {
                children: [(0, b.jsx)("p", {
                  className: "font-mono text-[#171717] text-sm font-black tracking-widest leading-none",
                  children: "G SPOT"
                }), (0, b.jsx)("p", {
                  className: "font-mono text-[#8a8a86] text-[8px] tracking-widest mt-1",
                  children: "ACCOUNT ACCESS"
                })]
              })]
            }), (0, b.jsx)("button", {
              onClick: t,
              "aria-label": "Close login",
              className: "w-10 h-10 rounded-full border border-[#dededb] bg-white text-[#777773] hover:border-[#cc0000] hover:text-[#cc0000] transition-colors",
              children: "\xD7"
            })]
          }), (0, b.jsxs)("div", {
            className: "bg-white border border-[#dfdfdc] shadow-lg p-5 sm:p-7",
            children: [(0, b.jsxs)("div", {
              className: "flex items-center justify-between gap-4 mb-6",
              children: [(0, b.jsxs)("div", {
                children: [(0, b.jsx)("p", {
                  className: "font-sans text-2xl font-semibold text-[#171717]",
                  children: a === "login" ? "Log In" : a ===
                    "create" ? "Sign Up" : "Forgot Password"
                }), (0, b.jsx)("p", {
                  className: "font-sans text-[#8a8a86] text-xs mt-1",
                  children: a === "login" ?
                    "Access your G Spot account" : a ===
                    "create" ?
                    "Create your customer account" : "We\u2019ll help you recover access"
                })]
              }), a === "login" && (0, b.jsx)("button", {
                onClick: () => O(J => !J),
                className: "border border-[#cc0000] text-[#cc0000] px-3 py-2 font-sans text-[10px] font-bold hover:bg-[#fff3f3] transition-colors whitespace-nowrap",
                children: x ? "USE PASSWORD" : "LOG IN WITH QR"
              })]
            }), a === "login" && x ? (0, b.jsxs)("div", {
              className: "text-center py-4",
              children: [(0, b.jsx)("div", {
                className: "w-44 h-44 mx-auto border-8 border-white outline outline-1 outline-[#ddddda] bg-white p-2 grid grid-cols-7 gap-1",
                children: Array.from({
                  length: 49
                }).map((J, nA) => (0, b.jsx)("span", {
                  className: (nA * 7 + nA * nA) % 5 < 2 ?
                    "bg-[#171717]" : "bg-white"
                }, nA))
              }), (0, b.jsx)("p", {
                className: "font-sans text-[#444440] text-sm font-semibold mt-5",
                children: "QR login preview only"
              }), (0, b.jsx)("p", {
                className: "font-sans text-[#8a8a86] text-xs mt-1",
                children: "QR authentication needs a connected server. Use email below."
              }), (0, b.jsx)("button", {
                onClick: () => O(!1),
                className: "mt-5 text-[#cc0000] font-sans text-xs font-bold",
                children: "Use email and password instead"
              })]
            }) : a === "login" ? (0, b.jsxs)("form", {
              onSubmit: J => {
                J.preventDefault(), o(), k(!0), window.setTimeout(
                async () => {
                    let nA = u.trim().toLowerCase(),
                      wA = {
                        "admin@gspot.com": {
                          password: "admin0000",
                          managerId: "sp6"
                        },
                        "sarah.chen@gspot.com": {
                          password: "sarah2345",
                          managerId: "sp2"
                        },
                        "ana.martinez@gspot.com": {
                          password: "ana4567",
                          managerId: "sp4"
                        }
                      };
                    if (!window.GSpotBackend?.enabled() && wA[nA]?.password === l) A({
                      view: "manager",
                      managerId: wA[nA].managerId
                    });
                    else {
                      let ht = await tO(nA, l);
                      ht.success ? A({
                        view: "customer",
                        customer: {
                          ...ht.customer,
                          orders: ht.orders
                        }
                      }) : H(ht.error)
                    }
                    k(!1)
                  }, 500)
              },
              className: "space-y-4",
              children: [(0, b.jsx)("input", {
                type: "email",
                value: u,
                onChange: J => {
                  e(J.target.value), o()
                },
                placeholder: "Phone number / Username / Email",
                autoComplete: "email",
                className: "w-full bg-white border border-[#d8d8d5] text-[#171717] font-sans px-4 py-3.5 placeholder:text-[#b0b0ac] focus:outline-none focus:border-[#cc0000] transition-colors"
              }), (0, b.jsxs)("div", {
                className: "flex border border-[#d8d8d5] focus-within:border-[#cc0000] transition-colors",
                children: [(0, b.jsx)("input", {
                  type: R ? "text" : "password",
                  value: l,
                  onChange: J => {
                    n(J.target.value), o()
                  },
                  placeholder: "Password",
                  autoComplete: "current-password",
                  className: "min-w-0 flex-1 bg-white text-[#171717] font-sans px-4 py-3.5 placeholder:text-[#b0b0ac] focus:outline-none"
                }), (0, b.jsx)("button", {
                  type: "button",
                  onClick: () => d(J => !J),
                  className: "px-3 text-[#777773] hover:text-[#cc0000] font-sans text-[10px] transition-colors",
                  children: R ? "HIDE" : "SHOW"
                }), (0, b.jsx)("button", {
                  type: "button",
                  onClick: () => T("recover"),
                  className: "px-3 border-l border-[#e2e2df] text-[#cc0000] font-sans text-xs hover:bg-[#fff5f5] transition-colors",
                  children: "Forgot?"
                })]
              }), j && (0, b.jsx)(We, {
                type: "error",
                text: j
              }), (0, b.jsx)("button", {
                type: "submit",
                disabled: !u || !l || P,
                className: "w-full py-3.5 bg-[#cc0000] text-white font-sans font-bold text-sm hover:bg-[#a90000] disabled:opacity-40 disabled:cursor-not-allowed transition-colors",
                children: P ? "SIGNING IN\u2026" : "LOG IN"
              }), (0, b.jsxs)("label", {
                className: "flex items-center gap-2 font-sans text-[#4f4f4b] text-xs cursor-pointer",
                children: [(0, b.jsx)("input", {
                  type: "checkbox",
                  checked: S,
                  onChange: J => N(J.target.checked),
                  className: "w-4 h-4 min-h-0 accent-[#cc0000]"
                }), "Stay Signed In", (0, b.jsx)("span", {
                  className: "w-4 h-4 rounded-full border border-[#a9a9a5] text-[9px] flex items-center justify-center text-[#777773]",
                  children: "?"
                })]
              }), (0, b.jsxs)("div", {
                className: "flex items-center gap-3 py-1",
                children: [(0, b.jsx)("span", {
                  className: "h-px bg-[#dfdfdc] flex-1"
                }), (0, b.jsx)("span", {
                  className: "font-sans text-[#b0b0ac] text-[10px]",
                  children: "OR"
                }), (0, b.jsx)("span", {
                  className: "h-px bg-[#dfdfdc] flex-1"
                })]
              }), (0, b.jsxs)("div", {
                className: "grid grid-cols-2 gap-3",
                children: [(0, b.jsxs)("button", {
                  type: "button",
                  onClick: () => s(
                    "Facebook login is unavailable in this offline demo."
                    ),
                  className: "border border-[#cfcfcc] py-2.5 flex items-center justify-center gap-2 font-sans text-xs text-[#333330] hover:bg-[#f7f7f5] transition-colors",
                  children: [(0, b.jsx)("span", {
                    className: "w-5 h-5 rounded-full bg-[#1877f2] text-white font-sans font-black flex items-center justify-center",
                    children: "f"
                  }), "Facebook"]
                }), (0, b.jsxs)("button", {
                  type: "button",
                  onClick: () => s(
                    "Google login is unavailable in this offline demo."
                    ),
                  className: "border border-[#cfcfcc] py-2.5 flex items-center justify-center gap-2 font-sans text-xs text-[#333330] hover:bg-[#f7f7f5] transition-colors",
                  children: [(0, b.jsx)("span", {
                    className: "font-sans text-base font-black text-[#4285f4]",
                    children: "G"
                  }), "Google"]
                })]
              }), E && (0, b.jsx)(We, {
                type: "success",
                text: E
              }), (0, b.jsxs)("p", {
                className: "font-sans text-[#777773] text-[10px] text-center leading-relaxed px-2",
                children: [
                  "By logging in, you agree to G Spot\u2019s ", (
                    0, b.jsx)("button", {
                    type: "button",
                    className: "text-[#cc0000]",
                    children: "Terms of Service"
                  }), " and ", (0, b.jsx)("button", {
                    type: "button",
                    className: "text-[#cc0000]",
                    children: "Privacy Policy"
                  }), "."
                ]
              }), (0, b.jsxs)("p", {
                className: "font-sans text-[#aaaaa6] text-sm text-center pt-2",
                children: ["New to G Spot? ", (0, b.jsx)("button", {
                  type: "button",
                  onClick: () => T("create"),
                  className: "text-[#cc0000] font-semibold",
                  children: "Sign Up"
                })]
              }), (0, b.jsx)(P0, {})]
            }) : a === "create" ? (0, b.jsxs)("form", {
              onSubmit: async J => {
                if (J.preventDefault(), o(), l.length < 8) {
                  H("Use at least 8 characters for your password.");
                  return
                }
                if (l !== p) {
                  H("The passwords do not match.");
                  return
                }
                k(!0);
                let nA = await AO(r, u, l);
                k(!1), nA.success ? A({
                  view: "customer",
                  customer: {
                    ...nA.customer,
                    orders: nA.orders
                  }
                }) : H(nA.error)
              },
              className: "space-y-4",
              children: [(0, b.jsx)(ke, {
                label: "FULL NAME",
                type: "text",
                value: r,
                onChange: J => {
                  I(J), o()
                },
                placeholder: "Full name",
                autoComplete: "name"
              }), (0, b.jsx)(ke, {
                label: "EMAIL",
                type: "email",
                value: u,
                onChange: J => {
                  e(J), o()
                },
                placeholder: "Email address",
                autoComplete: "email"
              }), (0, b.jsx)(ke, {
                label: "PASSWORD",
                type: "password",
                value: l,
                onChange: J => {
                  n(J), o()
                },
                placeholder: "Password",
                autoComplete: "new-password"
              }), (0, b.jsx)(ke, {
                label: "CONFIRM PASSWORD",
                type: "password",
                value: p,
                onChange: J => {
                  q(J), o()
                },
                placeholder: "Confirm password",
                autoComplete: "new-password"
              }), j && (0, b.jsx)(We, {
                type: "error",
                text: j
              }), E && (0, b.jsx)(We, {
                type: "success",
                text: E
              }), (0, b.jsx)("button", {
                type: "submit",
                disabled: !r || !u || !l || !p || P,
                className: "w-full py-3.5 bg-[#cc0000] text-white font-sans font-bold text-sm hover:bg-[#a90000] disabled:opacity-40 transition-colors",
                children: P ? "CREATING ACCOUNT\u2026" : "SIGN UP"
              }), (0, b.jsx)("button", {
                type: "button",
                onClick: () => T("login"),
                className: "w-full font-sans text-[#777773] text-xs hover:text-[#cc0000] transition-colors",
                children: "\u2190 Back to Log In"
              })]
            }) : (0, b.jsxs)("form", {
              onSubmit: J => {
                J.preventDefault(), o(), s(
                  "Offline demo: email recovery is unavailable. No message was sent."
                  )
              },
              className: "space-y-4",
              children: [(0, b.jsx)(ke, {
                label: "EMAIL",
                type: "email",
                value: u,
                onChange: J => {
                  e(J), o()
                },
                placeholder: "Email address",
                autoComplete: "email"
              }), E && (0, b.jsx)(We, {
                type: "success",
                text: E
              }), (0, b.jsx)("button", {
                type: "submit",
                disabled: !u,
                className: "w-full py-3.5 bg-[#cc0000] text-white font-sans font-bold text-sm hover:bg-[#a90000] disabled:opacity-40 transition-colors",
                children: "SEND RESET LINK"
              }), (0, b.jsx)("button", {
                type: "button",
                onClick: () => T("login"),
                className: "w-full font-sans text-[#777773] text-xs hover:text-[#cc0000] transition-colors",
                children: "\u2190 Back to Log In"
              })]
            })]
          }), (0, b.jsx)("button", {
            onClick: t,
            className: "mt-5 mx-auto font-sans text-[#777773] text-xs hover:text-[#cc0000] transition-colors",
            children: "Need help? Return to the website"
          })]
        })
      })
    })
  }

  function ke({
    label: A,
    type: t,
    value: a,
    onChange: c,
    placeholder: u,
    autoComplete: e
  }) {
    return (0, b.jsxs)("label", {
      className: "block",
      children: [(0, b.jsx)("span", {
        className: "font-sans text-[#666662] text-[10px] font-semibold tracking-widest block mb-2",
        children: A
      }), (0, b.jsx)("input", {
        type: t,
        value: a,
        onChange: l => c(l.target.value),
        placeholder: u,
        autoComplete: e,
        className: "w-full bg-white border border-[#d8d8d5] text-[#171717] font-sans px-4 py-3.5 placeholder:text-[#b0b0ac] focus:outline-none focus:border-[#cc0000] transition-colors"
      })]
    })
  }

  function We({
    type: A,
    text: t
  }) {
    return (0, b.jsx)("div", {
      className: `border px-4 py-3 font-sans text-xs leading-relaxed ${A==="error"?"border-[#f0b0b0] bg-[#fff3f3] text-[#b50000]":"border-[#a8dcc0] bg-[#effbf4] text-[#147a3f]"}`,
      children: t
    })
  }

  function P0() {
    return (0, b.jsxs)("details", {
      className: "border-t border-[#e2e2df] pt-4 mt-5",
      children: [(0, b.jsx)("summary", {
        className: "font-sans text-[#8a8a86] text-[10px] font-semibold tracking-widest cursor-pointer text-center hover:text-[#cc0000]",
        children: "VIEW DEMO ACCOUNTS"
      }), (0, b.jsxs)("div", {
        className: "mt-3 bg-[#f7f7f5] border border-[#e2e2df] p-3 space-y-1.5 font-mono text-[9px] text-[#777773]",
        children: [(0, b.jsxs)("p", {
          children: [(0, b.jsx)("span", {
            className: "text-[#333330]",
            children: "CUSTOMER:"
          }), " customer@gspot.com / customer123"]
        }), (0, b.jsxs)("p", {
          children: [(0, b.jsx)("span", {
            className: "text-[#333330]",
            children: "MANAGER:"
          }), " admin@gspot.com / admin0000"]
        })]
      })]
    })
  }
  var yA, b, rO = z(() => {
    "use client";
    yA = GA(ja());
    vb();
    Yb();
    lO();
    Lq();
    se();
    nO();
    qO();
    RO();
    b = GA(Wt())
  });
  var k0 = xt(() => {
    var dO = GA(Ij());
    rO();
    var jO = GA(Wt());
    (0, dO.createRoot)(document.getElementById("root")).render((0, jO.jsx)(wq, {}))
  });
  k0();
})();
/*! Bundled license information:

scheduler/cjs/scheduler.production.js:
  (**
   * @license React
   * scheduler.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.js:
  (**
   * @license React
   * react-dom.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom-client.production.js:
  (**
   * @license React
   * react-dom-client.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

qrcode.react/lib/esm/index.js:
  (**
   * @license QR Code generator library (TypeScript)
   * Copyright (c) Project Nayuki.
   * SPDX-License-Identifier: MIT
   *)
  (**
   * @license qrcode.react
   * Copyright (c) Paul O'Shannessy
   * SPDX-License-Identifier: ISC
   *)

react/cjs/react-jsx-runtime.production.js:
  (**
   * @license React
   * react-jsx-runtime.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
