function lt(t, e) {
  t.x = e.x, t.y = e.y;
}
function ht(t, e) {
  return {
    x: t.x + e.x,
    y: t.y + e.y
  };
}
function gt(t, e) {
  return {
    x: t.x - e.x,
    y: t.y - e.y
  };
}
function pt(t, e) {
  return {
    x: e.x * t,
    y: e.y * t
  };
}
function U(t) {
  const e = document.getElementById(t);
  if (e.width = 320, e.height = 200, e.style.imageRendering = "pixelated", e.parentElement) {
    const i = Math.floor(e.parentElement.clientWidth * devicePixelRatio / e.width);
    e.style.width = `${e.width / devicePixelRatio * i}px`, e.style.height = `${e.height / devicePixelRatio * i}px`;
  }
  const n = e.getContext("2d");
  return [e, n];
}
function J(t, e) {
  const n = Array(120);
  let i = 0, o = !0, s = 0;
  function c(l) {
    const a = (l - s) / 1e3;
    s = l;
    const h = performance.now();
    if (e(a), n[i++] = performance.now() - h, i >= n.length) {
      const f = n.reduce((d, u) => d + u) / n.length;
      console.log(`Average frame time: ${f}ms (~${Math.floor(1e3 / f)} fps)`), i = 0;
    }
    document.activeElement === t ? requestAnimationFrame(c) : o = !1;
  }
  function r() {
    o || (o = !0, s = +(document.timeline.currentTime ?? s), requestAnimationFrame(c));
  }
  return t.addEventListener("focus", r), requestAnimationFrame(c), r;
}
function bt(t) {
  return new Promise((e) => setTimeout(e, t));
}
const Vt = /* @__PURE__ */ new Map();
function vt(t) {
  let e = Vt.get(t);
  if (!e) {
    const n = new Image();
    n.src = t, e = new Promise((i, o) => {
      n.onload = () => {
        i(n);
      }, n.onerror = o;
    });
  }
  return e;
}
async function w(t) {
  const e = await vt(t), n = document.createElement("canvas"), i = n.getContext("2d");
  return n.width = e.width, n.height = e.height, i.drawImage(e, 0, 0), i.getImageData(0, 0, n.width, n.height);
}
const z = [
  "XXXXXXXXXXXXXXXXXXXX",
  "X        X         X",
  "X        X         X",
  "X      X X   X     X",
  "X     XX X   X     X",
  "X        X   X     X",
  "X     XXXXXXXX     X",
  "X                  X",
  "X                  X",
  "X                  X",
  "XXXXXXXXXXXXXXXXXXXX"
].map((t) => t.split("").map((e) => ({
  solid: e === "X"
}))), B = {
  x: z[0].length,
  y: z.length
};
function te() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (l) => _(t, l, z, B), [o, s] = U("canvas1"), c = o.width / o.height, r = J(o, (l) => {
    O(l, n, t, e, i), ee(o, s), oe(o, s, c, t, e);
  });
  N(o, n), Q(o, r, t, e, i), V(o, r, t, e, i);
}
function _(t, e, n, i) {
  Rt(e, n, i) && lt(t, e);
}
function O(t, e, n, i, o) {
  if (e.moveForward || e.moveBackward) {
    const s = t * 3, c = { ...n };
    e.moveForward ? (c.x += s * i.x, c.y += s * i.y) : (c.x -= s * i.x, c.y -= s * i.y), o(c);
  }
  if (e.turnLeft || e.turnRight) {
    const s = t * 3, c = t * 0.6;
    e.turnLeft ? e.rotationSpeed = Math.max(-s, Math.min(0, e.rotationSpeed) - c) : e.rotationSpeed = Math.min(s, Math.max(0, e.rotationSpeed) + c), lt(i, {
      x: i.x * Math.cos(e.rotationSpeed) - i.y * Math.sin(e.rotationSpeed),
      y: i.x * Math.sin(e.rotationSpeed) + i.y * Math.cos(e.rotationSpeed)
    });
  } else
    e.rotationSpeed = 0;
}
function Rt(t, e, n) {
  const i = { x: Math.floor(t.x), y: Math.floor(t.y) };
  return i.x < 0 || i.x >= n.x || i.y < 0 || i.y >= n.y ? !1 : !e[i.y][i.x].solid;
}
function N(t, e) {
  t.addEventListener("keydown", (n) => kt(n, !0, e)), t.addEventListener("keyup", (n) => kt(n, !1, e));
}
function kt(t, e, n) {
  switch (t.key) {
    case "ArrowLeft":
    case "a":
      n.turnLeft = e;
      break;
    case "ArrowRight":
    case "d":
      n.turnRight = e;
      break;
    case "ArrowUp":
    case "w":
      n.moveForward = e;
      break;
    case "ArrowDown":
    case "s":
      n.moveBackward = e;
      break;
    default:
      return;
  }
  t.preventDefault();
}
function Q(t, e, n, i, o) {
  let s = !1;
  t.addEventListener("mousedown", (c) => {
    c.button === 0 && (s = !0);
  }), document.addEventListener("mousemove", (c) => {
    if (!s || c.button !== 0)
      return;
    const r = -5e-3 * c.movementY, l = ht(n, pt(r, i));
    o(l);
    const a = 5e-3 * c.movementX;
    lt(i, {
      x: i.x * Math.cos(a) - i.y * Math.sin(a),
      y: i.x * Math.sin(a) + i.y * Math.cos(a)
    }), e();
  }), document.addEventListener("mouseup", (c) => {
    c.button === 0 && (s = !1);
  }), t.addEventListener("dblclick", () => {
    document.fullscreenElement === t ? document.exitFullscreen() : t.requestFullscreen();
  });
}
function V(t, e, n, i, o) {
  let s;
  t.addEventListener("touchstart", (c) => {
    c.changedTouches.length && (c.preventDefault(), s = c.changedTouches[0], t.focus());
  }), document.addEventListener("touchmove", (c) => {
    if (!s)
      return;
    const r = { x: 0, y: 0 };
    for (const f of c.changedTouches)
      if (f.identifier === s.identifier) {
        r.x = f.pageX - s.pageX, r.y = f.pageY - s.pageY, s = f;
        break;
      }
    const l = 5e-3 * r.y, a = ht(n, pt(l, i));
    o(a);
    const h = -5e-3 * r.x;
    lt(i, {
      x: i.x * Math.cos(h) - i.y * Math.sin(h),
      y: i.x * Math.sin(h) + i.y * Math.cos(h)
    }), e();
  }), document.addEventListener("touchend", () => {
    s = void 0;
  }), document.addEventListener("touchcancel", () => {
    s = void 0;
  });
}
function ee(t, e) {
  e.fillStyle = "#333", e.fillRect(0, 0, t.width, t.height / 2), e.fillStyle = "#666", e.fillRect(0, t.height / 2, t.width, t.height / 2);
}
function oe(t, e, n, i, o) {
  const s = $(o);
  for (let c = 0; c < t.width; c++) {
    const r = Y(t, n, i, o, c, s);
    for (; ; ) {
      G(r);
      const l = k(z, r.mapPos, B);
      if (l) {
        if (l.solid) {
          ie(t, e, r);
          break;
        }
      } else break;
    }
  }
}
function $(t) {
  return {
    x: -t.y,
    y: t.x
  };
}
function k(t, e, n) {
  if (!(e.x < 0 || e.x >= n.x || e.y < 0 || e.y >= n.y))
    return t[e.y][e.x];
}
function Y(t, e, n, i, o, s) {
  const c = e * o / t.width - e / 2, r = ht(i, pt(c, s)), l = { x: Math.floor(n.x), y: Math.floor(n.y) }, a = {
    x: Math.abs(1 / r.x),
    y: Math.abs(1 / r.y)
  }, h = { x: 0, y: 0 }, f = { x: 0, y: 0 };
  return r.x < 0 ? (f.x = -1, h.x = (n.x - l.x) * a.x) : (f.x = 1, h.x = (1 - n.x + l.x) * a.x), r.y < 0 ? (f.y = -1, h.y = (n.y - l.y) * a.y) : (f.y = 1, h.y = (1 - n.y + l.y) * a.y), { x: o, rayDir: r, mapPos: l, deltaDist: a, sideDist: h, step: f, side: 0, perpWallDist: 0 };
}
function G(t) {
  t.sideDist.x < t.sideDist.y ? (t.perpWallDist = t.sideDist.x, t.sideDist.x += t.deltaDist.x, t.mapPos.x += t.step.x, t.side = 0) : (t.perpWallDist = t.sideDist.y, t.sideDist.y += t.deltaDist.y, t.mapPos.y += t.step.y, t.side = 1);
}
function Ft(t, e) {
  const n = Math.ceil(t / e), i = Math.floor((t - n) / 2);
  return { wallHeight: n, wallY: i };
}
function ie(t, e, n) {
  const { wallHeight: i, wallY: o } = Ft(t.height, n.perpWallDist);
  e.strokeStyle = n.side ? "#005566" : "#003F4C", e.beginPath(), e.moveTo(n.x + 0.5, Math.max(o, 0)), e.lineTo(n.x + 0.5, Math.min(o + i + 1, t.height)), e.stroke();
}
const ut = [
  "XXXXXXXXXX",
  "X        X",
  "X        X",
  "X      X X",
  "X     XX X",
  "X        X",
  "X     XXXX"
].map((t) => t.split("").map((e) => ({
  solid: e === "X"
}))), rt = {
  x: ut[0].length,
  y: ut.length
};
function ne() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = document.getElementById("canvas1b");
  if (n.parentElement) {
    const c = n.parentElement.clientWidth;
    n.width = n.parentElement.clientWidth * devicePixelRatio, n.style.width = `${c}px`;
  }
  const i = n.width / rt.x;
  n.height = rt.y * i;
  const o = n.getContext("2d");
  $t(o, ut, rt, i), Ht(o, t, i);
  const s = 320 / 200;
  se(o, s, t, e, i);
}
function Ht(t, e, n) {
  t.fillStyle = "#F60", t.beginPath(), t.arc(
    e.x * n,
    e.y * n,
    n / 4,
    0,
    Math.PI * 2
  ), t.fill(), t.strokeStyle = "#F60";
}
function $t(t, e, n, i) {
  t.strokeStyle = "#333";
  for (let o = 0; o < n.y; o++)
    for (let s = 0; s < n.x; s++)
      e[o][s].solid ? t.fillStyle = "#056" : t.fillStyle = "#666", t.fillRect(s * i, o * i, i, i), t.strokeRect(s * i, o * i, i, i);
}
async function se(t, e, n, i, o) {
  for (; ; ) {
    const s = { x: 0, y: 0 };
    let c = 0, r = { x: 0, y: 0 };
    const l = {
      x: -i.y,
      y: i.x
    }, a = [];
    for (let h = 0; h < 32; h++) {
      const f = e * h / 32 - e / 2, d = ht(i, pt(f, l)), u = { x: Math.floor(n.x), y: Math.floor(n.y) }, W = {
        x: Math.abs(1 / d.x),
        y: Math.abs(1 / d.y)
      };
      d.x < 0 ? (r.x = -1, s.x = (n.x - u.x) * W.x) : (r.x = 1, s.x = (1 - n.x + u.x) * W.x), d.y < 0 ? (r.y = -1, s.y = (n.y - u.y) * W.y) : (r.y = 1, s.y = (1 - n.y + u.y) * W.y), t.strokeStyle = "#fff";
      let x = {
        x: n.x * o,
        y: n.y * o
      };
      for (; ; ) {
        let g = 0;
        if (s.x < s.y ? (c = s.x, s.x += W.x, u.x += r.x) : (c = s.y, s.y += W.y, u.y += r.y, g = 1), u.x < 0 || u.x >= rt.x || u.y < 0 || u.y >= rt.y)
          break;
        if (c === 0)
          continue;
        const m = {
          x: (n.x + d.x * c) * o,
          y: (n.y + d.y * c) * o
        };
        if (t.beginPath(), t.moveTo(x.x, x.y), t.lineTo(m.x, m.y), t.stroke(), x = m, await bt(100), ut[u.y][u.x].solid) {
          t.fillStyle = "#F00", t.beginPath(), t.arc(
            m.x,
            m.y,
            3,
            0,
            Math.PI * 2
          ), t.fill(), a.push(m);
          break;
        } else
          t.fillStyle = g ? "#0F0" : "#00F", t.beginPath(), t.arc(
            m.x,
            m.y,
            3,
            0,
            Math.PI * 2
          ), t.fill();
      }
      await bt(200), $t(t, ut, rt, o), Ht(t, n, o);
      for (const g of a)
        t.fillStyle = "#F00", t.beginPath(), t.arc(
          g.x,
          g.y,
          3,
          0,
          Math.PI * 2
        ), t.fill();
    }
  }
}
function re() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (a) => _(t, a, z, B), [o, s] = U("canvas2"), c = o.width / o.height, r = v(o, s), l = J(o, (a) => {
    O(a, n, t, e, i), P(o, s, r), ce(o, s, c, t, e);
  });
  N(o, n), Q(o, l, t, e, i), V(o, l, t, e, i);
}
function v(t, e) {
  const n = e.createLinearGradient(0, 0, 0, t.height);
  return n.addColorStop(0, "#333"), n.addColorStop(0.5, "#111"), n.addColorStop(0.5, "#222"), n.addColorStop(1, "#666"), n;
}
function P(t, e, n) {
  e.fillStyle = n, e.fillRect(0, 0, t.width, t.height);
}
function ce(t, e, n, i, o) {
  const s = $(o);
  for (let c = 0; c < t.width; c++) {
    const r = Y(t, n, i, o, c, s);
    for (; ; ) {
      G(r);
      const l = k(z, r.mapPos, B);
      if (l) {
        if (l.solid) {
          le(t, e, r);
          break;
        }
      } else break;
    }
  }
}
function I(t, e = 0) {
  return 1 - Math.min(0.8, Math.max(0, (t - e) / 10));
}
function le(t, e, n) {
  const { wallHeight: i, wallY: o } = Ft(t.height, n.perpWallDist), s = I(n.perpWallDist, n.side);
  e.strokeStyle = `rgb(0, ${85 * s}, ${102 * s})`, e.beginPath(), e.moveTo(n.x + 0.5, Math.max(o, 0)), e.lineTo(n.x + 0.5, Math.min(o + i + 1, t.height)), e.stroke();
}
const F = { x: 64, y: 64 };
async function ae() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (h) => _(t, h, z, B), o = await w("/assets/content/misc/textures/wall.png"), [s, c] = U("canvas3"), r = s.width / s.height, l = v(s, c), a = J(s, (h) => {
    O(h, n, t, e, i), P(s, c, l), he(s, c, r, t, e, o);
  });
  N(s, n), Q(s, a, t, e, i), V(s, a, t, e, i);
}
function he(t, e, n, i, o, s) {
  const c = $(o);
  for (let r = 0; r < t.width; r++) {
    const l = Y(t, n, i, o, r, c), a = e.getImageData(r, 0, 1, t.height);
    for (; ; ) {
      G(l);
      const h = k(z, l.mapPos, B);
      if (h) {
        if (h.solid) {
          const f = tt(l, t.height, i);
          et(t, a, l, f, s);
          break;
        }
      } else break;
    }
    e.putImageData(a, r, 0);
  }
}
function tt(t, e, n) {
  const { wallHeight: i, wallY: o } = Ft(e, t.perpWallDist);
  let s;
  return t.side === 0 ? s = n.y + t.perpWallDist * t.rayDir.y - t.mapPos.y : s = n.x + t.perpWallDist * t.rayDir.x - t.mapPos.x, { wallHeight: i, wallX: s, wallY: o };
}
function et(t, e, n, i, o) {
  const s = I(n.perpWallDist, n.side), c = i.wallX * F.x & F.x - 1, r = Math.max(i.wallY, 0), l = Math.min(i.wallY + i.wallHeight, t.height), a = F.y / i.wallHeight;
  let h = i.wallY < r ? (r - i.wallY) * a : 0;
  for (let f = r; f < l; f++) {
    const d = f * 4, u = h & F.y - 1;
    if (h += a, o) {
      const W = (u * F.x + c) * 4;
      e.data[d] = o.data[W] * s, e.data[d + 1] = o.data[W + 1] * s, e.data[d + 2] = o.data[W + 2] * s, e.data[d + 3] = 255;
    } else
      e.data[d] = 0, e.data[d + 1] = 85 * s, e.data[d + 2] = 102 * s, e.data[d + 3] = 255;
  }
}
async function fe() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (f) => _(t, f, z, B), o = await w("/assets/content/misc/textures/wall.png"), s = await w("/assets/content/misc/textures/floor.png"), [c, r] = U("canvas5"), l = c.width / c.height, a = v(c, r), h = J(c, (f) => {
    O(f, n, t, e, i), P(c, r, a), de(c, r, l, t, e, o, s);
  });
  N(c, n), Q(c, h, t, e, i), V(c, h, t, e, i);
}
function de(t, e, n, i, o, s, c) {
  const r = $(o);
  for (let l = 0; l < t.width; l++) {
    const a = Y(t, n, i, o, l, r), h = e.getImageData(l, 0, 1, t.height);
    let f = 0;
    for (; ; ) {
      G(a);
      const d = k(z, a.mapPos, B);
      if (!d)
        break;
      const u = tt(a, t.height, i), W = Math.ceil((t.height - u.wallHeight) * 0.5), x = ot(a, u.wallX);
      if (f = Yt(t, h, x, W, i, f, a.perpWallDist, c), d.solid) {
        et(t, h, a, u, s);
        break;
      }
    }
    e.putImageData(h, l, 0);
  }
}
function ot(t, e) {
  let n, i;
  return t.side === 0 ? (n = t.mapPos.x, i = t.mapPos.y + e, t.rayDir.x < 0 && (n += 1)) : (n = t.mapPos.x + e, i = t.mapPos.y, t.rayDir.y < 0 && (i += 1)), { floorXWall: n, floorYWall: i };
}
function Yt(t, e, n, i, o, s, c, r) {
  if (!r)
    return Math.max(s, i);
  for (; s < i; ) {
    const l = t.height - s - 1;
    Gt(t, e, l, n, o, s, c, r), s++;
  }
  return s;
}
function Gt(t, e, n, i, o, s, c, r) {
  const l = t.height / (t.height - 2 * s), a = l / c, h = a * i.floorXWall + (1 - a) * o.x, f = a * i.floorYWall + (1 - a) * o.y;
  let d = F.x * h & F.x - 1;
  const W = ((F.y * f & F.y - 1) * F.x + d) * 4, x = I(l), g = n * 4;
  e.data[g] = r.data[W] * x, e.data[g + 1] = r.data[W + 1] * x, e.data[g + 2] = r.data[W + 2] * x, e.data[g + 3] = 255;
}
async function ue() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (d) => _(t, d, z, B), o = await w("/assets/content/misc/textures/wall.png"), s = await w("/assets/content/misc/textures/floor.png"), c = await w("/assets/content/misc/textures/ceiling.png"), [r, l] = U("canvas6"), a = v(r, l), h = r.width / r.height, f = J(r, (d) => {
    O(d, n, t, e, i), P(r, l, a), We(r, l, h, t, e, o, s, c);
  });
  N(r, n), Q(r, f, t, e, i), V(r, f, t, e, i);
}
function We(t, e, n, i, o, s, c, r) {
  const l = $(o);
  for (let a = 0; a < t.width; a++) {
    const h = Y(t, n, i, o, a, l), f = e.getImageData(a, 0, 1, t.height);
    let d = 0, u = 0;
    for (; ; ) {
      G(h);
      const W = k(z, h.mapPos, B);
      if (!W)
        break;
      const x = tt(h, t.height, i), g = ot(h, x.wallX);
      if ([d, u] = ft(
        t,
        f,
        x,
        g,
        i,
        h.perpWallDist,
        d,
        u,
        c,
        r
      ), W.solid) {
        et(t, f, h, x, s);
        break;
      }
    }
    e.putImageData(f, a, 0);
  }
}
function ft(t, e, n, i, o, s, c, r, l, a) {
  const h = Math.ceil((t.height - n.wallHeight) * 0.5);
  return c = Yt(t, e, i, h, o, c, s, l), r = xe(t, e, i, o, h, r, s, a), [c, r];
}
function xe(t, e, n, i, o, s, c, r) {
  if (!r)
    return Math.max(s, o);
  for (; s < o; )
    Gt(t, e, s, n, i, s, c, r), s++;
  return s;
}
const ge = [
  "WWWWWRWWWRRRRRWWWWWW",
  "W        R         W",
  "W        R         W",
  "W      W R   R     W",
  "W     WW R   R     W",
  "W        R   R     W",
  "W     RRRRRRRR     W",
  "W                  W",
  "W                  W",
  "W                  W",
  "WWWWWWWWWWWWWWWWWWWW"
], me = [
  "FFFFFFFFFFFFFFFFFFFF",
  "FFFFFFFFFFFFFFFFFFFF",
  "FFFFFFFFFFFFFFFFFFFF",
  "FFFFGGGGGGGGGFFFFFFF",
  "FFFFGGGGGGGGGFFFFFFF",
  "FFFFGGGGGGGGGFFFFFFF",
  "FFFFFFFFFFFFFFFFFFFF",
  "FFFFFFFFFFFFFFFFFFFF",
  "FFFFFFFFFFFFFFFFFFFF",
  "FFFFFFFFFFFFFFFFFFFF",
  "FFFFFFFFFFFFFFFFFFFF"
], pe = [
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCFFFCCCCCCCCCC",
  "CCCCCCCFFFCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC",
  "CCCCCCCCCCCCCCCCCCCC"
], at = ge.map((t, e) => {
  const n = me[e].split(""), i = pe[e].split("");
  return t.split("").map((o, s) => ({
    solid: o !== " ",
    wallType: o,
    floorType: n[s],
    ceilingType: i[s]
  }));
}), Mt = {
  x: at[0].length,
  y: at.length
};
async function Fe() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (h) => _(t, h, at, Mt), o = Object.fromEntries(await Promise.all(Object.entries({
    W: w("/assets/content/misc/textures/wall.png"),
    R: w("/assets/content/misc/textures/wall-red.png"),
    F: w("/assets/content/misc/textures/floor.png"),
    G: w("/assets/content/misc/textures/floor-green.png"),
    C: w("/assets/content/misc/textures/ceiling.png")
  }).map(async ([h, f]) => [h, await f])));
  Ce(at, o);
  const [s, c] = U("canvas7"), r = v(s, c), l = s.width / s.height, a = J(s, (h) => {
    O(h, n, t, e, i), P(s, c, r), we(s, c, l, t, e);
  });
  N(s, n), Q(s, a, t, e, i), V(s, a, t, e, i);
}
function Ce(t, e) {
  t.forEach((n) => n.forEach((i) => {
    i.wallTexture = e[i.wallType], i.floorTexture = e[i.floorType], i.ceilingTexture = e[i.ceilingType];
  }));
}
function we(t, e, n, i, o) {
  const s = $(o);
  for (let c = 0; c < t.width; c++) {
    const r = Y(t, n, i, o, c, s), l = e.getImageData(c, 0, 1, t.height);
    let a = 0, h = 0, f = k(at, r.mapPos, Mt);
    for (; ; ) {
      G(r);
      const d = k(at, r.mapPos, Mt);
      if (!d)
        break;
      const u = tt(r, t.height, i), W = ot(r, u.wallX);
      if ([a, h] = ft(
        t,
        l,
        u,
        W,
        i,
        r.perpWallDist,
        a,
        h,
        f == null ? void 0 : f.floorTexture,
        f == null ? void 0 : f.ceilingTexture
      ), d.solid) {
        et(t, l, r, u, d.wallTexture);
        break;
      }
      f = d;
    }
    e.putImageData(l, c, 0);
  }
}
const L = [
  "WWWWWWWWWWWWWWWWWWWW",
  "W        W         W",
  "W        D         W",
  "W      W W   W     W",
  "W     WW W   W     W",
  "W        W   W     W",
  "W     WDWWWWWW     W",
  "W                  W",
  "W                  W",
  "W                  W",
  "WWWWWWWWWWWWWWWWWWWW"
].map((t) => t.split("").map((e) => ({
  solid: e !== " ",
  door: e === "D" ? {
    offset: 0,
    active: !1
  } : void 0,
  wallType: e,
  floorType: "F",
  ceilingType: "C"
}))), q = {
  x: L[0].length,
  y: L.length
}, Lt = 1 / 8, A = 0.5 - Lt / 2, j = A + Lt;
async function De() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (f) => _(t, f, L, q), o = Object.fromEntries(await Promise.all(Object.entries({
    W: w("/assets/content/misc/textures/wall.png"),
    F: w("/assets/content/misc/textures/floor.png"),
    C: w("/assets/content/misc/textures/ceiling.png"),
    D: w("/assets/content/misc/textures/door.png"),
    d: w("/assets/content/misc/textures/door-side.png")
  }).map(async ([f, d]) => [f, await d])));
  Xt(L, o);
  const s = [], [c, r] = U("canvas8"), l = v(c, r), a = c.width / c.height, h = J(c, (f) => {
    O(f, n, t, e, i), xt(s, f), P(c, r, l), Xe(c, r, a, t, e);
  });
  Zt(c, a, n, h, t, e, i, L, q, s);
}
function Xt(t, e) {
  t.forEach((n) => n.forEach((i) => {
    i.door && (i.door.sideTexture = e[i.wallType.toLowerCase()]), i.wallTexture = e[i.wallType], i.floorTexture = e[i.floorType], i.ceilingTexture = e[i.ceilingType];
  }));
}
function xt(t, e) {
  for (let n = t.length - 1; n >= 0; n--)
    t[n](e) || t.splice(n, 1);
}
function Zt(t, e, n, i, o, s, c, r, l, a) {
  N(t, n), Q(t, i, o, s, c), V(t, i, o, s, c), Me(t, e, o, s, r, l, a);
}
function Me(t, e, n, i, o, s, c) {
  t.addEventListener("keypress", (r) => {
    if (r.key === "e") {
      r.preventDefault();
      const l = It(t, e, n, i, Math.floor(t.width / 2), o, s);
      l != null && l.cell.door && l.dist < 1.5 && wt(l.pos, l.cell, l.cell.door, n, c);
    }
  }), t.addEventListener("click", (r) => {
    const l = t.getBoundingClientRect(), a = Math.floor((r.clientX - l.left) / l.width * t.width), h = Math.floor((r.clientY - l.top) / l.height * t.height);
    if (a >= 0 && a < t.width) {
      const f = Et(t, e, n, i, a, h, o, s);
      f != null && f.cell.door && f.dist < 1.5 && wt(f.pos, f.cell, f.cell.door, n, c);
    }
  }), t.addEventListener("touchend", (r) => {
    if (r.changedTouches.length) {
      const l = r.changedTouches[0], a = t.getBoundingClientRect(), h = Math.floor((l.clientX - a.left) / a.width * t.width), f = Math.floor((l.clientY - a.top) / a.height * t.height);
      if (h >= 0 && h < t.width) {
        const d = Et(t, e, n, i, h, f, o, s);
        d != null && d.cell.door && d.dist < 1.5 && wt(d.pos, d.cell, d.cell.door, n, c);
      }
    }
  });
}
function wt(t, e, n, i, o) {
  n.active || (n.active = !0, o.push((s) => (n.offset += s, n.offset >= 62 / 64 ? (n.offset = 62 / 64, n.active = !1, e.solid = !1, setTimeout(() => zt(t, e, n, i, o), 3e3), !1) : !0)));
}
function zt(t, e, n, i, o) {
  if (!n.active) {
    if (Math.floor(i.x) === t.x && Math.floor(i.y) === t.y) {
      setTimeout(() => zt(t, e, n, i, o), 1e3);
      return;
    }
    n.active = !0, e.solid = !0, o.push((s) => (n.offset -= s, n.offset <= 0 ? (n.offset = 0, n.active = !1, !1) : !0));
  }
}
function Et(t, e, n, i, o, s, c, r) {
  const l = It(t, e, n, i, o, c, r);
  if (l) {
    const { wallHeight: a, wallY: h } = Ft(t.height, l.dist);
    if (s >= h && s < h + a)
      return l;
  }
}
function It(t, e, n, i, o, s, c) {
  const r = $(i), l = Y(t, e, n, i, o, r);
  for (; ; ) {
    G(l);
    const a = k(s, l.mapPos, c);
    if (!a)
      return;
    if (a.solid)
      return {
        pos: l.mapPos,
        cell: a,
        dist: l.perpWallDist
      };
  }
}
function Xe(t, e, n, i, o) {
  const s = $(o);
  for (let c = 0; c < t.width; c++) {
    const r = Y(t, n, i, o, c, s), l = e.getImageData(c, 0, 1, t.height);
    let a = 0, h = 0, f = k(L, r.mapPos, q);
    for (; ; ) {
      G(r);
      const d = k(L, r.mapPos, q);
      if (!d)
        break;
      const u = tt(r, t.height, i), W = ot(r, u.wallX);
      if ([a, h] = ft(
        t,
        l,
        u,
        W,
        i,
        r.perpWallDist,
        a,
        h,
        f == null ? void 0 : f.floorTexture,
        f == null ? void 0 : f.ceilingTexture
      ), d.door) {
        if (Tt(t, l, d, d.door, r, i, W, a, h))
          break;
      } else if (d.solid) {
        et(t, l, r, u, d.wallTexture);
        break;
      }
      f = d;
    }
    e.putImageData(l, c, 0);
  }
}
function Tt(t, e, n, i, o, s, c, r, l) {
  const a = o.perpWallDist;
  let h;
  if (o.side === 0 ? h = s.y + (o.perpWallDist + o.deltaDist.x * A) * o.rayDir.y - o.mapPos.y : h = s.x + (o.perpWallDist + o.deltaDist.y * A) * o.rayDir.x - o.mapPos.x, h < 0 || h >= 1)
    return !1;
  let f = !1;
  if (h < i.offset) {
    f = !0;
    let u;
    if (o.side === 0) {
      if (o.rayDir.y < 0)
        return !1;
      u = s.x + (o.sideDist.y - o.deltaDist.y * (1 - i.offset)) * o.rayDir.x - o.mapPos.x;
    } else {
      if (o.rayDir.x < 0)
        return !1;
      u = s.y + (o.sideDist.x - o.deltaDist.x * (1 - i.offset)) * o.rayDir.y - o.mapPos.y;
    }
    if (u < A || u > j)
      return !1;
    o.side === 0 ? (o.side = 1, o.perpWallDist = o.sideDist.y - o.deltaDist.y * (1 - i.offset)) : (o.side = 0, o.perpWallDist = o.sideDist.x - o.deltaDist.x * (1 - i.offset));
  } else o.side === 0 ? o.perpWallDist = o.sideDist.x - o.deltaDist.x * j : o.perpWallDist = o.sideDist.y - o.deltaDist.y * j;
  const d = tt(o, t.height, s);
  return f || (d.wallX -= i.offset), ft(
    t,
    e,
    d,
    c,
    s,
    a,
    r,
    l,
    n.floorTexture,
    n.ceilingTexture
  ), et(t, e, o, d, f ? i.sideTexture : n.wallTexture), !0;
}
async function Ze() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (u) => _(t, u, L, q), o = Object.fromEntries(await Promise.all(Object.entries({
    W: w("/assets/content/misc/textures/wall.png"),
    F: w("/assets/content/misc/textures/floor.png"),
    C: w("/assets/content/misc/textures/ceiling.png"),
    D: w("/assets/content/misc/textures/door.png"),
    d: w("/assets/content/misc/textures/door-side.png")
  }).map(async ([u, W]) => [u, await W])));
  Xt(L, o);
  const s = [], c = [], r = await w("/assets/content/misc/textures/barrel.png");
  c.push(mt({ x: 4, y: 3 }, r)), c.push(mt({ x: 5, y: 2.75 }, r));
  const [l, a] = U("canvas9"), h = v(l, a), f = l.width / l.height, d = J(l, (u) => {
    O(u, n, t, e, i), xt(s, u), P(l, a, h);
    const W = $(e), x = Te(l, a, f, t, e, W);
    yt(c, t), Ut(l, a, f, c, x, W);
  });
  Zt(l, f, n, d, t, e, i, L, q, s);
}
function mt(t, e) {
  return {
    pos: t,
    texture: e,
    relPos: {
      x: 0,
      y: 0
    },
    relDist: 0
  };
}
function Te(t, e, n, i, o, s) {
  const c = Array(t.width);
  for (let r = 0; r < t.width; r++) {
    const l = Y(t, n, i, o, r, s), a = e.getImageData(r, 0, 1, t.height);
    let h = 0, f = 0, d = k(L, l.mapPos, q);
    for (; ; ) {
      G(l);
      const u = k(L, l.mapPos, q);
      if (!u)
        break;
      const W = tt(l, t.height, i), x = ot(l, W.wallX);
      if ([h, f] = ft(
        t,
        a,
        W,
        x,
        i,
        l.perpWallDist,
        h,
        f,
        d == null ? void 0 : d.floorTexture,
        d == null ? void 0 : d.ceilingTexture
      ), u.door) {
        if (Tt(t, a, u, u.door, l, i, x, h, f))
          break;
      } else if (u.solid) {
        et(t, a, l, W, u.wallTexture);
        break;
      }
      d = u;
    }
    e.putImageData(a, r, 0), c[r] = l.perpWallDist;
  }
  return c;
}
function yt(t, e) {
  for (const n of t)
    n.relPos = gt(n.pos, e), n.relDist = n.relPos.x * n.relPos.x + n.relPos.y * n.relPos.y;
  t.sort((n, i) => i.relDist - n.relDist);
}
function Ut(t, e, n, i, o, s) {
  for (const c of i) {
    const r = {
      x: s.x * c.relPos.x + s.y * c.relPos.y,
      y: s.y * c.relPos.x - s.x * c.relPos.y
    };
    if (r.y <= 0)
      continue;
    const l = Math.floor(t.height / r.y), a = Math.floor(t.width * (0.5 + r.x / (n * r.y))), h = Math.max(0, Math.floor(a - l / 2)), d = Math.min(t.width, Math.floor(a + l / 2)) - h;
    if (d < 1)
      continue;
    const u = l, W = Math.floor(t.height / 2 - u / 2), x = Math.max(0, W), m = Math.min(t.height, W + u) - x, p = I(r.y), M = e.getImageData(h, x, d, m);
    for (let T = 0; T < d; T++) {
      const X = T + h, E = Math.floor((X + l / 2 - a) / l * F.x);
      if (!(r.y >= o[X]))
        for (let y = 0; y < m; y++) {
          const D = (Math.floor((y + x - W) / u * F.y) * F.x + E) * 4;
          if (c.texture.data[D + 3]) {
            const C = (y * M.width + T) * 4;
            M.data[C] = c.texture.data[D] * p, M.data[C + 1] = c.texture.data[D + 1] * p, M.data[C + 2] = c.texture.data[D + 2] * p, M.data[C + 3] = c.texture.data[D + 3];
          }
        }
    }
    e.putImageData(M, h, x);
  }
}
const S = [
  "WWWWWWWWWWWWWWWWWWWW",
  "W      WWWWWWWW    W",
  "W      WWWWWWWW    W",
  "W     WWWWWWWWWWW  W",
  "W                  W",
  "W                  W",
  "WWWWWWWWWWWWWWWWWWWW"
].map((t) => t.split("").map((e) => ({
  solid: e !== " ",
  door: e === "D" ? {
    offset: 0,
    active: !1
  } : void 0,
  wallType: e,
  floorType: "F",
  ceilingType: "C",
  sprites: []
})));
S[1][6].portal = { x: 16, y: 1 };
S[2][6].portal = { x: 16, y: 2 };
S[1][15].portal = { x: 5, y: 1 };
S[2][15].portal = { x: 5, y: 2 };
const dt = {
  x: S[0].length,
  y: S.length
};
async function ye() {
  const t = { x: 2, y: 3 }, e = { x: 1, y: 0 }, n = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, i = (d) => be(t, d, S, dt), o = Object.fromEntries(await Promise.all(Object.entries({
    W: w("/assets/content/misc/textures/wall.png"),
    F: w("/assets/content/misc/textures/floor.png"),
    C: w("/assets/content/misc/textures/ceiling.png"),
    D: w("/assets/content/misc/textures/door.png"),
    d: w("/assets/content/misc/textures/door-side.png")
  }).map(async ([d, u]) => [d, await u])));
  Xt(S, o);
  const s = [], c = await w("/assets/content/misc/textures/barrel.png");
  S[3][4].sprites.push(mt({ x: 4, y: 3 }, c)), S[2][5].sprites.push(mt({ x: 5, y: 2.75 }, c));
  const [r, l] = U("canvas10"), a = v(r, l), h = r.width / r.height, f = J(r, (d) => {
    O(d, n, t, e, i), xt(s, d), P(r, l, a);
    const u = $(e), [W, x] = ke(r, l, h, t, e, u);
    Ut(r, l, h, x, W, u);
  });
  Zt(r, h, n, f, t, e, i, S, dt, s);
}
function be(t, e, n, i) {
  if (Rt(e, n, i)) {
    const o = { x: Math.floor(t.x), y: Math.floor(t.y) }, s = { x: Math.floor(e.x), y: Math.floor(e.y) };
    if (o.x !== s.x || o.y !== s.y) {
      const c = k(n, s, i);
      if (c != null && c.portal) {
        lt(t, ht(e, gt(c.portal, s)));
        return;
      }
    }
    lt(t, e);
  }
}
function ke(t, e, n, i, o, s) {
  const c = Array(t.width), r = /* @__PURE__ */ new Map();
  for (let a = 0; a < t.width; a++) {
    const h = Y(t, n, i, o, a, s), f = e.getImageData(a, 0, 1, t.height);
    let d = i, u = 0, W = 0, x = k(S, h.mapPos, dt);
    for (; ; ) {
      x && r.set(x, d), G(h);
      let g = k(S, h.mapPos, dt);
      if (!g)
        break;
      const m = tt(h, t.height, d), p = ot(h, m.wallX);
      if ([u, W] = ft(
        t,
        f,
        m,
        p,
        d,
        h.perpWallDist,
        u,
        W,
        x == null ? void 0 : x.floorTexture,
        x == null ? void 0 : x.ceilingTexture
      ), g.portal)
        d = ht(d, gt(g.portal, h.mapPos)), h.mapPos = { ...g.portal }, g = k(S, h.mapPos, dt);
      else if (g.door) {
        if (Tt(t, f, g, g.door, h, d, p, u, W))
          break;
      } else if (g.solid) {
        et(t, f, h, m, g.wallTexture);
        break;
      }
      x = g;
    }
    e.putImageData(f, a, 0), c[a] = h.perpWallDist;
  }
  const l = [];
  return r.forEach((a, h) => {
    h.sprites.forEach((f) => {
      f.relPos = gt(f.pos, a), f.relDist = f.relPos.x * f.relPos.x + f.relPos.y * f.relPos.y, l.push(f);
    });
  }), l.sort((a, h) => h.relDist - a.relDist), [c, l];
}
const Ee = [
  "WWWWWWWWWWW",
  "WWWWWWWWWWW",
  "WWWWWWWWWWW",
  "WWWWWWWWWWW",
  "WWWWWWWWWWW",
  "WWWWWCWWWWW",
  "WWWWWWWWWWW",
  "WWWWWWWWWWW",
  "WWWWWWWWWWW",
  "WWWWWWWWWWW",
  "WWWWWWWWWWW"
], Se = [
  "WWWWWWWWWWW",
  "WFFFFFFFFFW",
  "WFFFFFFFFFW",
  "WFFFFFFFFFW",
  "WFFFFFFFFFW",
  "WFFFFCFFFFW",
  "WFFFFFFFFFW",
  "WFFFFFFFFFW",
  "WFFFFFFFFFW",
  "WFFFFFFFFFW",
  "WFFFFFFFFFW"
], Re = [
  "           ",
  "           ",
  "           ",
  "           ",
  "           ",
  "           ",
  "CCWCCCCWCCC",
  "CCCCCCCCCCC",
  "CCCCCCCCCCC",
  "CCCCCCCCCCC",
  "CCCCCCCCCCC"
], He = [
  "JJJJJJJJJJJ",
  "J888888888J",
  "J889ABCD88J",
  "J888888E88J",
  "J888888F88J",
  "J8888C8G88J",
  "ZZ8ZZZZGZZZ",
  "Z88888GGJJZ",
  "Z88888GGJJZ",
  "Z88888GGJJZ",
  "ZZZZZZZZZZZ"
], $e = [
  "ZZZZZZZZZZZ",
  "ZZZZZZZZZZZ",
  "ZZZZZZZZZZZ",
  "ZZZZZZZZZZZ",
  "ZZZZZZZZZZZ",
  "ZZZZZZZZZZZ",
  "ZSGSSSSOSSZ",
  "ZUUUUUUUUUZ",
  "ZUUUUUUUUUZ",
  "ZUUUUUUUUUZ",
  "ZZZZZZZZZZZ"
], Ye = 1 / 8, Wt = 5 / 8, Ge = 9.82, H = Ee.map((t, e) => {
  const n = Se[e].split(""), i = Re[e].split(""), o = He[e].split(""), s = $e[e].split("");
  return t.split("").map((c, r) => ({
    wallType: c,
    floorType: n[r],
    ceilingType: i[r],
    cellHeight: 4,
    floorHeight: parseInt(o[r], 36) / 8,
    ceilingHeight: parseInt(s[r], 36) / 8
  }));
}), K = {
  x: H[0].length,
  y: H.length
};
async function Le() {
  const t = { x: 2, y: 3, z: 1 }, e = { x: 1, y: 0 }, n = { x: 0, y: 0, z: 0 }, i = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, o = (x) => jt(t, x, H, K), s = Object.fromEntries(await Promise.all(Object.entries({
    W: w("/assets/content/misc/textures/wall.png"),
    F: w("/assets/content/misc/textures/floor.png"),
    C: w("/assets/content/misc/textures/ceiling.png"),
    D: w("/assets/content/misc/textures/door.png"),
    d: w("/assets/content/misc/textures/door-side.png")
  }).map(async ([x, g]) => [x, await g])));
  Ot(H, s), H[6][2].door = {
    doorTexture: s.D,
    sideTexture: s.d,
    offset: 0,
    active: !1,
    open: !1
  };
  const c = [], r = [], l = await w("/assets/content/misc/textures/barrel.png");
  r.push(ct({ x: 3, y: 4, z: 1 }, l)), r.push(ct({ x: 4, y: 3.75, z: 1 }, l)), r.push(ct({ x: 7.5, y: 9.5, z: 2 }, l));
  const [a, h] = U("canvas11"), f = Array(a.width * a.height), d = a.width / a.height, u = Jt(a, h), W = J(a, (x) => {
    O(x, i, t, e, o), xt(c, x), qt(t, n, H, x);
    const g = $(e);
    P(a, h, u), Ue(a, h, d, t, e, g, f), yt(r, t), Pe(a, h, d, r, f, t, g);
  });
  At(a, d, i, W, t, e, n, o, H, K, c);
}
function Jt(t, e) {
  const n = e.createLinearGradient(0, 0, 0, t.height);
  return n.addColorStop(0, "#000"), n.addColorStop(1, "#333"), n;
}
function ct(t, e) {
  return {
    pos: t,
    texture: e,
    relPos: {
      x: 0,
      y: 0
    },
    relDist: 0
  };
}
function Ot(t, e) {
  t.forEach((n) => n.forEach((i) => {
    i.wallTexture = e[i.wallType], i.floorTexture = e[i.floorType], i.ceilingTexture = e[i.ceilingType];
  }));
}
function At(t, e, n, i, o, s, c, r, l, a, h) {
  N(t, n), Q(t, i, o, s, r), V(t, i, o, s, r), ze(t, e, o, s, l, a, h), Ie(t, o, c);
}
function ze(t, e, n, i, o, s, c) {
  t.addEventListener("keypress", (r) => {
    if (r.key === "e") {
      r.preventDefault();
      const l = Pt(t, e, n, i, Math.floor(t.width / 2), o, s);
      l != null && l.cell.door && l.dist < 1.5 && Dt(l.pos, l.cell.door, n, c);
    }
  }), t.addEventListener("click", (r) => {
    const l = t.getBoundingClientRect(), a = Math.floor((r.clientX - l.left) / l.width * t.width), h = Math.floor((r.clientY - l.top) / l.height * t.height);
    if (a >= 0 && a < t.width) {
      const f = St(t, e, n, i, a, h, o, s);
      f != null && f.cell.door && f.dist < 1.5 && Dt(f.pos, f.cell.door, n, c);
    }
  }), t.addEventListener("touchend", (r) => {
    if (r.changedTouches.length) {
      const l = r.changedTouches[0], a = t.getBoundingClientRect(), h = Math.floor((l.clientX - a.left) / a.width * t.width), f = Math.floor((l.clientY - a.top) / a.height * t.height);
      if (h >= 0 && h < t.width) {
        const d = St(t, e, n, i, h, f, o, s);
        d != null && d.cell.door && d.dist < 1.5 && Dt(d.pos, d.cell.door, n, c);
      }
    }
  });
}
function Dt(t, e, n, i) {
  e.active || (e.active = !0, i.push((o) => (e.offset += o, e.offset >= 62 / 64 ? (e.offset = 62 / 64, e.active = !1, e.open = !0, setTimeout(() => Bt(t, e, n, i), 3e3), !1) : !0)));
}
function Bt(t, e, n, i) {
  if (!e.active) {
    if (Math.floor(n.x) === t.x && Math.floor(n.y) === t.y) {
      setTimeout(() => Bt(t, e, n, i), 1e3);
      return;
    }
    e.active = !0, e.open = !1, i.push((o) => (e.offset -= o, e.offset <= 0 ? (e.offset = 0, e.active = !1, !1) : !0));
  }
}
function St(t, e, n, i, o, s, c, r) {
  const l = Pt(t, e, n, i, o, c, r);
  if (l)
    return l;
}
function Pt(t, e, n, i, o, s, c) {
  const r = $(i), l = Y(t, e, n, i, o, r);
  for (; ; ) {
    G(l);
    const a = k(s, l.mapPos, c);
    if (!a)
      return;
    if (a.floorHeight >= n.z + Wt || a.ceilingHeight <= n.z + Wt || a.door && !a.door.open)
      return {
        pos: l.mapPos,
        cell: a,
        dist: l.perpWallDist
      };
  }
}
function Ie(t, e, n) {
  t.addEventListener("keypress", (s) => {
    if (s.key === " ") {
      s.preventDefault();
      const c = H[Math.floor(e.y)][Math.floor(e.x)];
      c && e.z === c.floorHeight && (n.z = 3);
    }
  }), t.addEventListener("contextmenu", (s) => {
    s.preventDefault(), t.focus();
    const c = H[Math.floor(e.y)][Math.floor(e.x)];
    c && e.z === c.floorHeight && (n.z = 3);
  });
  let i, o;
  t.addEventListener("touchstart", (s) => {
    if (s.changedTouches.length) {
      const c = s.changedTouches[0];
      if (i) {
        const r = c.pageX - i.pageX, l = c.pageY - i.pageY;
        if (r * r + l * l < 400) {
          const h = H[Math.floor(e.y)][Math.floor(e.x)];
          h && e.z === h.floorHeight && (n.z = 3);
        }
        i = void 0;
      } else
        i = c, o = setTimeout(() => i = void 0, 500);
    }
  }), t.addEventListener("touchmove", (s) => {
    if (i) {
      for (const c of s.changedTouches)
        if (c.identifier === i.identifier) {
          const r = c.pageX - i.pageX, l = c.pageY - i.pageY;
          r * r + l * l >= 400 && (i = void 0, clearTimeout(o));
          break;
        }
    }
  });
}
function jt(t, e, n, i) {
  const o = { x: Math.floor(e.x), y: Math.floor(e.y) };
  if (o.x < 0 || o.x >= i.x || o.y < 0 || o.y >= i.y)
    return;
  const s = n[o.y][o.x];
  s.door && !s.door.open || s.floorHeight <= t.z + Ye && s.ceilingHeight > Math.max(t.z, s.floorHeight) + Wt && (t.x = e.x, t.y = e.y, t.z < s.floorHeight && (t.z = s.floorHeight));
}
function qt(t, e, n, i) {
  const o = n[Math.floor(t.y)][Math.floor(t.x)];
  o && (e.z !== 0 || t.z > o.floorHeight) && (t.z += e.z * i, e.z -= Ge * i, t.z <= o.floorHeight ? (t.z = o.floorHeight, e.z = 0) : t.z > o.ceilingHeight - Wt && (t.z = o.ceilingHeight - Wt, e.z = 0));
}
function Ue(t, e, n, i, o, s, c) {
  for (let r = 0; r < t.width; r++) {
    const l = r * t.height, a = Y(t, n, i, o, r, s), h = e.getImageData(r, 0, 1, t.height);
    let f = 0, d = 0, u = t.height / 2, W = t.height / 2, x = k(H, a.mapPos, K);
    for (; G(a), !(t.height - f < d); ) {
      if (!a.perpWallDist)
        continue;
      const g = Ct(a, t.height, i), m = ot(a, g.wallX);
      x && ([f, d] = Kt(
        t,
        h,
        x,
        g,
        m,
        i,
        a.perpWallDist,
        f,
        d,
        u,
        W,
        c,
        l,
        x.floorTexture,
        x.ceilingTexture
      ));
      const p = k(H, a.mapPos, K);
      if (!p || ([f, d, u, W] = Je(t, h, a, p, g, f, d, u, W, i, c, l, p.wallTexture), p.door && Oe(t, h, p, p.door, a, i, m, f, d, u, W, c, l)))
        break;
      x = p;
    }
    e.putImageData(h, r, 0);
  }
}
function Ct(t, e, n) {
  const i = e / t.perpWallDist;
  let o;
  return t.side === 0 ? o = n.y + t.perpWallDist * t.rayDir.y - t.mapPos.y : o = n.x + t.perpWallDist * t.rayDir.x - t.mapPos.x, { heightMultiplier: i, wallX: o };
}
function Je(t, e, n, i, o, s, c, r, l, a, h, f, d) {
  if (i.cellHeight <= 0)
    return [s, c, r, l];
  const u = Math.ceil(o.heightMultiplier * i.cellHeight), W = Math.floor(t.height / 2 + a.z * o.heightMultiplier + (0.5 - i.cellHeight) * o.heightMultiplier), x = Math.ceil(W + (i.cellHeight - i.ceilingHeight) * o.heightMultiplier), g = Math.ceil(W + (i.cellHeight - i.floorHeight) * o.heightMultiplier), m = Math.max(W, c), p = Math.min(W + u, t.height - s);
  if (m <= x || p >= g) {
    const M = I(n.perpWallDist, n.side), T = o.wallX * F.x & F.x - 1, X = F.y * n.perpWallDist / t.height;
    let E = W < m ? (m - W) * X : 0;
    for (let y = m; y < p; y++) {
      const b = E & F.y - 1;
      if (E += X, y > x && y < g)
        continue;
      const D = y * 4;
      if (d) {
        const C = (b * F.x + T) * 4;
        e.data[D] = d.data[C] * M, e.data[D + 1] = d.data[C + 1] * M, e.data[D + 2] = d.data[C + 2] * M, e.data[D + 3] = 255;
      } else
        e.data[D] = 0, e.data[D + 1] = 85 * M, e.data[D + 2] = 102 * M, e.data[D + 3] = 255;
      h[f + y] = n.perpWallDist;
    }
  }
  return [
    Math.max(s, t.height - g),
    Math.max(c, x),
    Math.min(r, t.height - x),
    Math.min(l, g)
  ];
}
function Oe(t, e, n, i, o, s, c, r, l, a, h, f, d) {
  const u = o.perpWallDist;
  let W;
  if (o.side === 0 ? W = s.y + (o.perpWallDist + o.deltaDist.x * A) * o.rayDir.y - o.mapPos.y : W = s.x + (o.perpWallDist + o.deltaDist.y * A) * o.rayDir.x - o.mapPos.x, W < 0 || W >= 1)
    return !1;
  let x = !1;
  if (W < i.offset) {
    x = !0;
    let C;
    if (o.side === 0) {
      if (o.rayDir.y < 0)
        return !1;
      C = s.x + (o.sideDist.y - o.deltaDist.y * (1 - i.offset)) * o.rayDir.x - o.mapPos.x;
    } else {
      if (o.rayDir.x < 0)
        return !1;
      C = s.y + (o.sideDist.x - o.deltaDist.x * (1 - i.offset)) * o.rayDir.y - o.mapPos.y;
    }
    if (C < A || C > j)
      return !1;
    o.side === 0 ? (o.side = 1, o.perpWallDist = o.sideDist.y - o.deltaDist.y * (1 - i.offset)) : (o.side = 0, o.perpWallDist = o.sideDist.x - o.deltaDist.x * (1 - i.offset));
  } else o.side === 0 ? o.perpWallDist = o.sideDist.x - o.deltaDist.x * j : o.perpWallDist = o.sideDist.y - o.deltaDist.y * j;
  const g = Ct(o, t.height, s);
  x || (g.wallX -= i.offset), [r, l] = Kt(t, e, n, g, c, s, u, r, l, a, h, f, d, n.floorTexture, n.ceilingTexture);
  const m = x ? i.sideTexture : i.doorTexture, p = I(o.perpWallDist, o.side);
  let M = Math.floor(g.wallX * F.x);
  const T = Math.ceil(g.heightMultiplier * n.cellHeight), X = Math.floor(t.height / 2 + s.z * g.heightMultiplier + (0.5 - n.cellHeight) * g.heightMultiplier), E = Math.max(X, l), y = Math.min(X + T + 1, t.height - r), b = F.y * o.perpWallDist / t.height;
  let D = X < E ? (E - X) * b : 0;
  for (let C = E; C < y; C++) {
    const Z = C * 4, R = D & F.y - 1;
    if (D += b, m) {
      const it = (R * F.x + M) * 4;
      e.data[Z] = m.data[it] * p, e.data[Z + 1] = m.data[it + 1] * p, e.data[Z + 2] = m.data[it + 2] * p, e.data[Z + 3] = 255;
    } else
      e.data[Z] = 0, e.data[Z + 1] = 85 * p, e.data[Z + 2] = 102 * p, e.data[Z + 3] = 255;
    f[d + C] = o.perpWallDist;
  }
  return !0;
}
function Kt(t, e, n, i, o, s, c, r, l, a, h, f, d, u, W) {
  const x = (t.height - i.heightMultiplier) * 0.5, g = Math.ceil(x - s.z * i.heightMultiplier + n.floorHeight * i.heightMultiplier), m = Math.ceil(x + s.z * i.heightMultiplier - (n.ceilingHeight - 1) * i.heightMultiplier);
  return r = Ae(
    t,
    e,
    n,
    o,
    g,
    s,
    r,
    a,
    c,
    f,
    d,
    u
  ), l = Be(
    t,
    e,
    n,
    o,
    s,
    m,
    l,
    h,
    c,
    f,
    d,
    W
  ), [r, l];
}
function Ae(t, e, n, i, o, s, c, r, l, a, h, f) {
  if (!f)
    return Math.max(c, Math.min(o, r));
  const d = 2 * s.z - 2 * n.floorHeight + 1;
  for (; c < o && c < r; ) {
    const u = t.height - c - 1, W = _t(t, e, u, d, i, s, c, l, f);
    a[h + u] = W, c++;
  }
  return c;
}
function Be(t, e, n, i, o, s, c, r, l, a, h, f) {
  if (!f)
    return Math.max(c, Math.min(s, r));
  const d = -2 * o.z + 2 * n.ceilingHeight - 1;
  for (; c < s && c < r; ) {
    const u = _t(t, e, c, d, i, o, c, l, f);
    a[h + c] = u, c++;
  }
  return c;
}
function _t(t, e, n, i, o, s, c, r, l) {
  const a = t.height * i / (t.height - 2 * c), h = a / r, f = h * o.floorXWall + (1 - h) * s.x, d = h * o.floorYWall + (1 - h) * s.y;
  let u = F.x * f & F.x - 1;
  const x = ((F.y * d & F.y - 1) * F.x + u) * 4, g = I(a), m = n * 4;
  return e.data[m] = l.data[x] * g, e.data[m + 1] = l.data[x + 1] * g, e.data[m + 2] = l.data[x + 2] * g, e.data[m + 3] = 255, a;
}
function Pe(t, e, n, i, o, s, c) {
  for (const r of i) {
    const l = {
      x: c.x * r.relPos.x + c.y * r.relPos.y,
      y: c.y * r.relPos.x - c.x * r.relPos.y
    };
    if (l.y <= 0)
      continue;
    const a = Math.floor(t.height / l.y), h = Math.floor(t.width * (0.5 + l.x / (n * l.y))), f = Math.max(0, Math.floor(h - a / 2)), u = Math.min(t.width, Math.floor(h + a / 2)) - f;
    if (u < 1)
      continue;
    const W = a, x = Math.floor(t.height / 2 - W / 2 - (r.pos.z - s.z) * W), g = Math.max(0, Math.min(t.height - 1, x)), p = Math.min(t.height, x + W) - g, M = I(l.y), T = e.getImageData(f, g, u, p);
    for (let X = 0; X < u; X++) {
      const E = X + f, y = Math.floor((E + a / 2 - h) / a * F.x);
      for (let b = 0; b < p; b++) {
        const D = (X + f) * t.height + b + g;
        if (l.y >= o[D])
          continue;
        const Z = (Math.floor((b + g - x) / W * F.y) * F.x + y) * 4;
        if (r.texture.data[Z + 3]) {
          const R = (b * T.width + X) * 4;
          T.data[R] = r.texture.data[Z] * M, T.data[R + 1] = r.texture.data[Z + 1] * M, T.data[R + 2] = r.texture.data[Z + 2] * M, T.data[R + 3] = r.texture.data[Z + 3];
        }
      }
    }
    e.putImageData(T, f, g);
  }
}
const nt = H.map((t) => t.map((e) => ({
  ...e,
  door: e.door && { ...e.door }
})));
async function je() {
  const t = { x: 2, y: 3, z: 1 }, e = { x: 1, y: 0 }, n = { x: 0, y: 0, z: 0 }, i = {
    moveForward: !1,
    moveBackward: !1,
    turnLeft: !1,
    turnRight: !1,
    rotationSpeed: 0
  }, o = (m) => jt(t, m, nt, K), s = Object.fromEntries(await Promise.all(Object.entries({
    W: st("/assets/content/misc/textures/wall.png"),
    F: st("/assets/content/misc/textures/floor.png"),
    C: st("/assets/content/misc/textures/ceiling.png"),
    D: st("/assets/content/misc/textures/door.png"),
    d: st("/assets/content/misc/textures/door-side.png")
  }).map(async ([m, p]) => [m, await p])));
  Ot(nt, s), nt[6][2].door = {
    doorTexture: s.D,
    sideTexture: s.d,
    offset: 0,
    active: !1,
    open: !1
  };
  const c = [], r = [], l = await st("/assets/content/misc/textures/barrel.png");
  r.push(ct({ x: 3, y: 4, z: 1 }, l)), r.push(ct({ x: 4, y: 3.75, z: 1 }, l)), r.push(ct({ x: 7.5, y: 9.5, z: 2 }, l));
  const [a, h] = U("canvas12");
  h.transform(0, 1, 1, 0, 0, 0);
  const f = Array(a.width * a.height), d = a.width / a.height, u = Jt(a, h), W = document.createElement("canvas");
  W.width = a.height, W.height = a.width;
  const x = W.getContext("2d");
  x.transform(0, 1, 1, 0, 0, 0);
  const g = J(a, (m) => {
    O(m, i, t, e, o), xt(c, m), qt(t, n, nt, m);
    const p = $(e);
    P(a, x, u), qe(a, x, d, t, e, p, f), yt(r, t), Ve(a, x, d, r, f, t, p), h.drawImage(W, 0, 0, W.width, W.height, 0, 0, W.width, W.height);
  });
  At(a, d, i, g, t, e, n, o, nt, K, c);
}
async function st(t) {
  const e = await w(t), n = document.createElement("canvas");
  n.width = F.x, n.height = F.y, n.getContext("2d").putImageData(e, 0, 0);
  const i = document.createElement("canvas");
  i.width = F.y, i.height = F.x;
  const o = i.getContext("2d");
  return o.transform(0, 1, 1, 0, 0, 0), o.drawImage(n, 0, 0), o.getImageData(0, 0, i.width, i.height);
}
function qe(t, e, n, i, o, s, c) {
  for (let r = 0; r < t.width; r++) {
    const l = r * t.height, a = Y(t, n, i, o, r, s), h = e.getImageData(0, r, t.height, 1);
    let f = 0, d = 0, u = t.height / 2, W = t.height / 2, x = k(nt, a.mapPos, K);
    for (; G(a), !(t.height - f < d); ) {
      if (!a.perpWallDist)
        continue;
      const g = Ct(a, t.height, i), m = ot(a, g.wallX);
      x && ([f, d] = Nt(
        t,
        h,
        x,
        g,
        m,
        i,
        a.perpWallDist,
        f,
        d,
        u,
        W,
        c,
        l,
        x.floorTexture,
        x.ceilingTexture
      ));
      const p = k(nt, a.mapPos, K);
      if (!p || ([f, d, u, W] = Ke(t, h, a, p, g, f, d, u, W, i, c, l, p.wallTexture), p.door && _e(t, h, p, p.door, a, i, m, f, d, u, W, c, l)))
        break;
      x = p;
    }
    e.putImageData(h, 0, r);
  }
}
function Ke(t, e, n, i, o, s, c, r, l, a, h, f, d) {
  if (i.cellHeight <= 0)
    return [s, c, r, l];
  const u = Math.ceil(o.heightMultiplier * i.cellHeight), W = Math.floor(t.height / 2 + a.z * o.heightMultiplier + (0.5 - i.cellHeight) * o.heightMultiplier), x = Math.ceil(W + (i.cellHeight - i.ceilingHeight) * o.heightMultiplier), g = Math.ceil(W + (i.cellHeight - i.floorHeight) * o.heightMultiplier), m = Math.max(W, c), p = Math.min(W + u, t.height - s);
  if (m <= x || p >= g) {
    const M = I(n.perpWallDist, n.side), T = o.wallX * F.x & F.x - 1, X = F.y * n.perpWallDist / t.height;
    let E = W < m ? (m - W) * X : 0;
    for (let y = m; y < p; y++) {
      const b = E & F.y - 1;
      if (E += X, y > x && y < g)
        continue;
      const D = y * 4;
      if (d) {
        const C = (T * F.x + b) * 4;
        e.data[D] = d.data[C] * M, e.data[D + 1] = d.data[C + 1] * M, e.data[D + 2] = d.data[C + 2] * M, e.data[D + 3] = 255;
      } else
        e.data[D] = 0, e.data[D + 1] = 85 * M, e.data[D + 2] = 102 * M, e.data[D + 3] = 255;
      h[f + y] = n.perpWallDist;
    }
  }
  return [
    Math.max(s, t.height - g),
    Math.max(c, x),
    Math.min(r, t.height - x),
    Math.min(l, g)
  ];
}
function _e(t, e, n, i, o, s, c, r, l, a, h, f, d) {
  const u = o.perpWallDist;
  let W;
  if (o.side === 0 ? W = s.y + (o.perpWallDist + o.deltaDist.x * A) * o.rayDir.y - o.mapPos.y : W = s.x + (o.perpWallDist + o.deltaDist.y * A) * o.rayDir.x - o.mapPos.x, W < 0 || W >= 1)
    return !1;
  let x = !1;
  if (W < i.offset) {
    x = !0;
    let C;
    if (o.side === 0) {
      if (o.rayDir.y < 0)
        return !1;
      C = s.x + (o.sideDist.y - o.deltaDist.y * (1 - i.offset)) * o.rayDir.x - o.mapPos.x;
    } else {
      if (o.rayDir.x < 0)
        return !1;
      C = s.y + (o.sideDist.x - o.deltaDist.x * (1 - i.offset)) * o.rayDir.y - o.mapPos.y;
    }
    if (C < A || C > j)
      return !1;
    o.side === 0 ? (o.side = 1, o.perpWallDist = o.sideDist.y - o.deltaDist.y * (1 - i.offset)) : (o.side = 0, o.perpWallDist = o.sideDist.x - o.deltaDist.x * (1 - i.offset));
  } else o.side === 0 ? o.perpWallDist = o.sideDist.x - o.deltaDist.x * j : o.perpWallDist = o.sideDist.y - o.deltaDist.y * j;
  const g = Ct(o, t.height, s);
  x || (g.wallX -= i.offset), [r, l] = Nt(t, e, n, g, c, s, u, r, l, a, h, f, d, n.floorTexture, n.ceilingTexture);
  const m = x ? i.sideTexture : i.doorTexture, p = I(o.perpWallDist, o.side);
  let M = Math.floor(g.wallX * F.x);
  const T = Math.ceil(g.heightMultiplier * n.cellHeight), X = Math.floor(t.height / 2 + s.z * g.heightMultiplier + (0.5 - n.cellHeight) * g.heightMultiplier), E = Math.max(X, l), y = Math.min(X + T + 1, t.height - r), b = F.y * o.perpWallDist / t.height;
  let D = X < E ? (E - X) * b : 0;
  for (let C = E; C < y; C++) {
    const Z = C * 4, R = D & F.y - 1;
    if (D += b, m) {
      const it = (M * F.x + R) * 4;
      e.data[Z] = m.data[it] * p, e.data[Z + 1] = m.data[it + 1] * p, e.data[Z + 2] = m.data[it + 2] * p, e.data[Z + 3] = 255;
    } else
      e.data[Z] = 0, e.data[Z + 1] = 85 * p, e.data[Z + 2] = 102 * p, e.data[Z + 3] = 255;
    f[d + C] = o.perpWallDist;
  }
  return !0;
}
function Nt(t, e, n, i, o, s, c, r, l, a, h, f, d, u, W) {
  const x = (t.height - i.heightMultiplier) * 0.5, g = Math.ceil(x - s.z * i.heightMultiplier + n.floorHeight * i.heightMultiplier), m = Math.ceil(x + s.z * i.heightMultiplier - (n.ceilingHeight - 1) * i.heightMultiplier);
  return r = Ne(
    t,
    e,
    n,
    o,
    g,
    s,
    r,
    a,
    c,
    f,
    d,
    u
  ), l = Qe(
    t,
    e,
    n,
    o,
    s,
    m,
    l,
    h,
    c,
    f,
    d,
    W
  ), [r, l];
}
function Ne(t, e, n, i, o, s, c, r, l, a, h, f) {
  if (!f)
    return Math.max(c, Math.min(o, r));
  const d = 2 * s.z - 2 * n.floorHeight + 1;
  for (; c < o && c < r; ) {
    const u = t.height - c - 1, W = Qt(t, e, u, d, i, s, c, l, f);
    a[h + u] = W, c++;
  }
  return c;
}
function Qe(t, e, n, i, o, s, c, r, l, a, h, f) {
  if (!f)
    return Math.max(c, Math.min(s, r));
  const d = -2 * o.z + 2 * n.ceilingHeight - 1;
  for (; c < s && c < r; ) {
    const u = Qt(t, e, c, d, i, o, c, l, f);
    a[h + c] = u, c++;
  }
  return c;
}
function Qt(t, e, n, i, o, s, c, r, l) {
  const a = t.height * i / (t.height - 2 * c), h = a / r, f = h * o.floorXWall + (1 - h) * s.x, d = h * o.floorYWall + (1 - h) * s.y;
  let u = F.x * f & F.x - 1, W = F.y * d & F.y - 1;
  const x = (u * F.x + W) * 4, g = I(a), m = n * 4;
  return e.data[m] = l.data[x] * g, e.data[m + 1] = l.data[x + 1] * g, e.data[m + 2] = l.data[x + 2] * g, e.data[m + 3] = 255, a;
}
function Ve(t, e, n, i, o, s, c) {
  for (const r of i) {
    const l = {
      x: c.x * r.relPos.x + c.y * r.relPos.y,
      y: c.y * r.relPos.x - c.x * r.relPos.y
    };
    if (l.y <= 0)
      continue;
    const a = Math.floor(t.height / l.y), h = Math.floor(t.width * (0.5 + l.x / (n * l.y))), f = Math.max(0, Math.floor(h - a / 2)), u = Math.min(t.width, Math.floor(h + a / 2)) - f;
    if (u < 1)
      continue;
    const W = a, x = Math.floor(t.height / 2 - W / 2 - (r.pos.z - s.z) * W), g = Math.max(0, Math.min(t.height - 1, x)), p = Math.min(t.height, x + W) - g, M = I(l.y), T = e.getImageData(g, f, p, u);
    for (let X = 0; X < u; X++) {
      const E = X + f, y = Math.floor((E + a / 2 - h) / a * F.x);
      for (let b = 0; b < p; b++) {
        const D = (X + f) * t.height + b + g;
        if (l.y >= o[D])
          continue;
        const C = Math.floor((b + g - x) / W * F.y), Z = (y * F.x + C) * 4;
        if (r.texture.data[Z + 3]) {
          const R = (X * T.width + b) * 4;
          T.data[R] = r.texture.data[Z] * M, T.data[R + 1] = r.texture.data[Z + 1] * M, T.data[R + 2] = r.texture.data[Z + 2] * M, T.data[R + 3] = r.texture.data[Z + 3];
        }
      }
    }
    e.putImageData(T, g, f);
  }
}
te();
ne();
re();
ae();
fe();
ue();
Fe();
De();
Ze();
ye();
Le();
je();
