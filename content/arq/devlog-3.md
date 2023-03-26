{
  published: "2023-03-26 14:40",
  tags: ["arq", "devlog"],
  prefix: "Arq Devlog"
}
# #3: Animated water

Initially my tile set consisted of a few tiles I made many years ago for another RPG project. I never animated the water tile but for Arq I would really prefer if the water was animated to make the world feel a bit more alive. My first few attempts to do this manually did not go too well, but then I came up with an idea for not only generating tileable water tiles but also generating a looping water animation.

The trick is to use Simplex noise. You can get noise horizontally tileable by generating 3D noise and mapping the tile's 2D coordinates to the surface of a cylinder in 3D, i.e. map the x-coordinate to the circumference of a circle in the x/z-plane of the 3d noise space via sin/cos. To get noise that tiles in both directions you can generate 4D noise and do the same with the y-coordinate (using [this library](https://www.npmjs.com/package/@leodeslf/simplex-noise) for noise generation):

```typescript
function tileableNoise(
    x: number,
    y: number,
    width: number,
    height: number,
    scale: number
): number {
    return simplex4D(
        scale * Math.sin(y / height * Math.PI * 2),
        scale * Math.cos(y / height * Math.PI * 2),
        scale * Math.sin(x / width * Math.PI * 2),
        scale * Math.cos(x / width * Math.PI * 2),
    );
}
```

To actually animate the water we need to also map the time to the circumference of a circle. There are probably many ways to do this, but I seem to get decent results just adding the time parameter's mapped circumference coordinates onto the existing 4D coordinates:

```typescript
function tileableNoise(
    x: number,
    y: number,
    t: number,
    width: number,
    height: number,
    frames: number,
    scale: number
    timeScale: number
): number {
    const t1 = timeScale * Math.sin(t / frames * Math.PI * 2);
    const t2 = timeScale * Math.cos(t / frames * Math.PI * 2);
    return simplex4D(
        scale * Math.sin(y / height * Math.PI * 2) + t1,
        scale * Math.cos(y / height * Math.PI * 2) + t1,
        scale * Math.sin(x / width * Math.PI * 2) + t2,
        scale * Math.cos(x / width * Math.PI * 2) + t2,
    );
}
```

The `scale` parameter can be used to control the size of the generated noise and the `timeScale` parameters can be adjusted to control how much the noise moves over time. The only thing left to do is to map the noise to a simple 3-color palette to fit nicely with the style of other tiles:

<figure>
<img src="../images/arq/watertest.gif" width=200 height=200 style="image-rendering: pixelated;" alt="Animated water tile"/>
<figcaption>20 frames of noise.</figcaption>
</figure>

And here's what it looks like tiled in a 3&times;3 grid:

<figure>
<img src="../images/arq/watertest2.gif" width=180 height=180 style="image-rendering: pixelated;" alt="Animated water tile"/>
<figcaption>20 frames of noise.</figcaption>
</figure>

I experimented a bit with different parameters but ended up with an animation that's a bit more subtle than the above:

<figure>
<video src="../images/arq/water.webm" autoplay loop></video>
<figcaption>Water animation in-game.</figcaption>
</figure>

Because it's generated and not drawn by hand, it's very easy to change the parameters later.
