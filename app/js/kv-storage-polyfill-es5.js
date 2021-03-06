"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

var t = function () {
  function t() {}

  return t.prototype.then = function (n, r) {
    var o = new t(),
        i = this.s;

    if (i) {
      var _t = 1 & i ? n : r;

      if (_t) {
        try {
          e(o, 1, _t(this.v));
        } catch (t) {
          e(o, 2, t);
        }

        return o;
      }

      return this;
    }

    return this.o = function (t) {
      try {
        var _i = t.v;
        1 & t.s ? e(o, 1, n ? n(_i) : _i) : r ? e(o, 1, r(_i)) : e(o, 2, _i);
      } catch (t) {
        e(o, 2, t);
      }
    }, o;
  }, t;
}();

function e(n, r, o) {
  if (!n.s) {
    if (_instanceof(o, t)) {
      if (!o.s) return void (o.o = e.bind(null, n, r));
      1 & r && (r = o.s), o = o.v;
    }

    if (o && o.then) return void o.then(e.bind(null, n, r), e.bind(null, n, 2));
    n.s = r, n.v = o;
    var _i2 = n.o;
    _i2 && _i2(n);
  }
}

var n = 0,
    r = "function" == typeof WeakMap ? WeakMap : function () {
  var t = "function" == typeof Symbol ? Symbol(0) : "__weak$" + ++n;
  this.set = function (e, n) {
    e[t] = n;
  }, this.get = function (e) {
    return e[t];
  };
};

function o(t, e) {
  return new Promise(function (n, r) {
    t.onsuccess = function () {
      var r = t.result;
      e && (r = e(r)), n(r);
    }, t.onerror = function () {
      r(t.error);
    };
  });
}

function i(t, e) {
  return o(t.openCursor(e), function (t) {
    return t ? [t.key, t.value] : [];
  });
}

function u(t) {
  return new Promise(function (e, n) {
    t.oncomplete = function () {
      e();
    }, t.onabort = function () {
      n(t.error);
    }, t.onerror = function () {
      n(t.error);
    };
  });
}

function c(t) {
  if (!function (t) {
    if ("number" == typeof t || "string" == typeof t) return !0;

    if ("object" == _typeof(t) && t) {
      if (Array.isArray(t)) return !0;
      if ("setUTCFullYear" in t) return !0;
      if ("function" == typeof ArrayBuffer && ArrayBuffer.isView(t)) return !0;
      if ("byteLength" in t && "length" in t) return !0;
    }

    return !1;
  }(t)) throw Error("kv-storage: The given value is not allowed as a key");
}

var f = {};

function s(t, e) {
  return i(t, a(e));
}

function a(t) {
  return t === f ? IDBKeyRange.lowerBound(-Infinity) : IDBKeyRange.lowerBound(t, !0);
}

var v = new r(),
    h = new r(),
    l = new r(),
    y = new r(),
    d = function d() {};

function p(n, r) {
  return r(function (r, o) {
    try {
      var _u = function _u() {
        return h.set(n, f), l.set(n, void 0), {
          value: d,
          done: void 0 === f
        };
      };

      var c = h.get(n);
      if (void 0 === c) return Promise.resolve({
        value: void 0,
        done: !0
      });

      var f,
          v,
          d,
          p = function (n, r) {
        var o,
            i = -1;

        t: {
          for (var u = 0; u < r.length; u++) {
            var c = r[u][0];

            if (c) {
              var f = c();
              if (f && f.then) break t;

              if (f === n) {
                i = u;
                break;
              }
            } else i = u;
          }

          if (-1 !== i) {
            do {
              for (var s = r[i][1]; !s;) {
                s = r[++i][1];
              }

              var a = s();

              if (a && a.then) {
                o = !0;
                break t;
              }

              var v = r[i][2];
              i++;
            } while (v && !v());

            return a;
          }
        }

        var h = new t(),
            l = e.bind(null, h, 2);
        return (o ? a.then(y) : f.then(function t(o) {
          for (;;) {
            if (o === n) {
              i = u;
              break;
            }

            if (++u === r.length) {
              if (-1 !== i) break;
              return void e(h, 1, s);
            }

            if (c = r[u][0]) {
              if ((o = c()) && o.then) return void o.then(t).then(void 0, l);
            } else i = u;
          }

          do {
            for (var f = r[i][1]; !f;) {
              f = r[++i][1];
            }

            var s = f();
            if (s && s.then) return void s.then(y).then(void 0, l);
            var a = r[i][2];
            i++;
          } while (a && !a());

          e(h, 1, s);
        })).then(void 0, l), h;

        function y(t) {
          for (;;) {
            var n = r[i][2];
            if (!n || n()) break;

            for (var o = r[++i][1]; !o;) {
              o = r[++i][1];
            }

            if ((t = o()) && t.then) return void t.then(y).then(void 0, l);
          }

          e(h, 1, t);
        }
      }(y.get(n), [[function () {
        return "keys";
      }, function () {
        return Promise.resolve(function (t, e) {
          return i(t, a(e)).then(function (t) {
            return t[0];
          });
        }(o, c)).then(function (t) {
          d = f = t;
        });
      }], [function () {
        return "values";
      }, function () {
        return Promise.resolve(s(o, c)).then(function (t) {
          var e;
          f = (e = t)[0], d = v = e[1];
        });
      }], [function () {
        return "entries";
      }, function () {
        return Promise.resolve(s(o, c)).then(function (t) {
          var e;
          v = (e = t)[1], d = void 0 === (f = e[0]) ? void 0 : [f, v];
        });
      }]]);

      return Promise.resolve(p && p.then ? p.then(_u) : _u());
    } catch (t) {
      return Promise.reject(t);
    }
  });
}

function m(t, e) {
  var n = new d();
  return y.set(n, t), v.set(n, e), h.set(n, f), l.set(n, void 0), n;
}

d.prototype.return = function () {
  h.set(this, void 0);
}, d.prototype.next = function () {
  var t = this,
      e = v.get(this);
  if (!e) return Promise.reject(new TypeError("Invalid this value"));
  var n,
      r = l.get(this);
  return n = void 0 !== r ? r.then(function () {
    return p(t, e);
  }) : p(this, e), l.set(this, n), n;
}, "function" == typeof Symbol && Symbol.asyncIterator && (d.prototype[Symbol.asyncIterator] = function () {
  return this;
});

var b = function b(t, e, n) {
  try {
    return null === w.get(t) && function (t) {
      var e = g.get(t);
      w.set(t, new Promise(function (n, r) {
        var o = self.indexedDB.open(e, 1);
        o.onsuccess = function () {
          var i = o.result;
          (function (t, e, n) {
            if (1 !== t.objectStoreNames.length) return n(j(e)), !1;
            if (t.objectStoreNames[0] !== P) return n(j(e)), !1;
            var r = t.transaction(P, "readonly").objectStore(P);
            return !(r.autoIncrement || r.keyPath || r.indexNames.length) || (n(j(e)), !1);
          })(i, e, r) && (i.onclose = function () {
            w.set(t, null);
          }, i.onversionchange = function () {
            i.close(), w.set(t, null);
          }, n(i));
        }, o.onerror = function () {
          return r(o.error);
        }, o.onupgradeneeded = function () {
          try {
            o.result.createObjectStore(P);
          } catch (t) {
            r(t);
          }
        };
      }));
    }(t), Promise.resolve(w.get(t)).then(function (t) {
      var r = t.transaction(P, e),
          o = r.objectStore(P);
      return n(r, o);
    });
  } catch (t) {
    return Promise.reject(t);
  }
},
    g = new r(),
    w = new r(),
    P = "store",
    k = function k(t) {
  var e = "kv-storage:" + t;
  w.set(this, null), g.set(this, e), this.backingStore = {
    database: e,
    store: P,
    version: 1
  };
};

k.prototype.set = function (t, e) {
  try {
    return c(t), b(this, "readwrite", function (n, r) {
      return void 0 === e ? r.delete(t) : r.put(e, t), u(n);
    });
  } catch (t) {
    return Promise.reject(t);
  }
}, k.prototype.get = function (t) {
  try {
    return c(t), b(this, "readonly", function (e, n) {
      return o(n.get(t));
    });
  } catch (t) {
    return Promise.reject(t);
  }
}, k.prototype.delete = function (t) {
  try {
    return c(t), b(this, "readwrite", function (e, n) {
      return n.delete(t), u(e);
    });
  } catch (t) {
    return Promise.reject(t);
  }
}, k.prototype.clear = function () {
  try {
    var _e = function _e() {
      function e() {
        return o(self.indexedDB.deleteDatabase(g.get(t)));
      }

      var r = function () {
        if (n) {
          try {
            n.close();
          } catch (t) {}

          return Promise.resolve(new Promise(setTimeout)).then(function () {});
        }
      }();

      return r && r.then ? r.then(e) : e();
    };

    var t = this;

    var n,
        r = w.get(t),
        i = function () {
      if (null !== r) {
        var _e2 = function _e2() {
          w.set(t, null);
        };

        var o = function (t, e) {
          try {
            var o = Promise.resolve(r).then(function (t) {
              n = t;
            });
          } catch (t) {
            return;
          }

          return o && o.then ? o.then(void 0, function () {}) : o;
        }();

        return o && o.then ? o.then(_e2) : _e2();
      }
    }();

    return i && i.then ? i.then(_e) : _e();
  } catch (t) {
    return Promise.reject(t);
  }
}, k.prototype.keys = function () {
  var t = this;
  return m("keys", function (e) {
    return b(t, "readonly", e);
  });
}, k.prototype.values = function () {
  var t = this;
  return m("values", function (e) {
    return b(t, "readonly", e);
  });
}, k.prototype.entries = function () {
  var t = this;
  return m("entries", function (e) {
    return b(t, "readonly", e);
  });
}, "function" == typeof Symbol && Symbol.asyncIterator && (k.prototype[Symbol.asyncIterator] = k.prototype.entries);
var S = new k("default");

function j(t) {
  return new Error('kv-storage: database "' + t + '" corrupted');
}

var StorageArea = k;
var storage = S;