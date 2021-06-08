{
  published: "2021-06-05 22:02",
  tags: ["javascript", "canvas"]
}
# Animated line of chevrons on HTML canvas

<form name="chevron" onsubmit="updateChevrons(event)">

I wanted an animation to indicate movement between two points on a map. I had this picture in my mind of a line of chevrons (or arrow heads) that I was sure I'd seen multiple times before but wasn't entirely sure what to call. I think a [chevron conveyor](https://www.google.com/search?q=chevron+conveyor) sort of has the look I'm going for, although it moves in the opposite direction of what I had in mind.

<figure>
<canvas id="canvas0" width="500" height="300" style="border: 1px solid #000; max-width: 100%;"></canvas>
<figcaption>Click on the canvas to toggle the animation.</figcaption>
</figure>

## Drawing a line between two points

If you already know how to draw a line on a canvas you can probably skip this section. The reason I've included this section is because this is how I initially approached the problem of drawing a line of chevrons.

The goal is to draw a line of chevrons moving from a point (x<sub>0</sub>, y<sub>0</sub>) to another point (x<sub>1</sub>, y<sub>1</sub>). We'll start by defining those two points globally:

```javascript
const x0 = 50;
const y0 = 50;
const x1 = 250;
const y1 = 150;
```

The exact values obviously don't matter and just serve to get something onto the screen.

Next we'll add a canvas to the HTML and give it an id (so we can access it from JavaScript) as well as a width and a height:

```html
<canvas id="canvas" width="300" height="200"></canvas>
```

We'll use `document.getElementById` to access the canvas element, then `getContext` to get the drawing context of the canvas:

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
```

Next we set the line color and line width:

```javascript
ctx.strokeStyle = '#000000';
ctx.lineWidth = 2;
```

Finally we draw our line segment by moving the pen to (x<sub>0</sub>, y<sub>0</sub>) then drawing a line to (x<sub>1</sub>, y<sub>1</sub>):

```javascript
ctx.beginPath();
ctx.moveTo(x0, y0);
ctx.lineTo(x1, y1);
ctx.stroke();
```

<figure>
<canvas id="canvas1" width="300" height="200" style="border: 1px solid #000;"></canvas>
</figure>

Not the most interesting result, but to me it was important to see the line on the canvas before I could start thinking about how to actually draw the chevrons.

You can change the parameters below (this will update all the other examples on this page as well):

<label>x<sub>0</sub>: <input type="number" size=5 name="x0" value="50"/></label>&emsp;<label>y<sub>0</sub>: <input type="number" size=5 name="y0" value="50"/></label>

<label>x<sub>1</sub>: <input type="number" size=5 name="x1" value="250"/></label>&emsp;<label>y<sub>1</sub>: <input type="number" size=5 name="y1" value="150"/></label>

<label>Line width: <input type="number" size=5 name="lineWidth" value="2"/></label>

<button type="submit">Update</button>

## Drawing chevrons

To draw chevrons instead of a boring old line we need to know the angle of the line. We can calculate this angle with the [atan2 function](https://en.wikipedia.org/wiki/Atan2). To know how many chevrons we need to draw, we'll also need to know its length.

```javascript
// Angle between our line and the x-axis in radians
const angle = Math.atan2(y1 - y0, x1 - x0);
// Length of our line (Euclidean distance)
const length = Math.sqrt((x0 - x1) * (x0 - x1) + (y0 - y1) * (y0 - y1));
```

<figure>
<img src="../images/chevron/angle.svg" width="400" alt="Diagram showing relationship between a line and the X-axis on a canvas"/>
<figcaption>`atan2` computes the angle between the x-axis and the line.</figcaption>
</figure>

Next we'll define some constants that define the shape and size of the chevrons we'll be drawing:

```javascript
// Distance between individual chevrons
const chevronSpace = 7;
// Angle between our main line and the leg of a chevron in radians
const chevronAngle = 0.7 * Math.PI; // 126°
// Length of a chevron leg
const chevronLength = 10;
```

We can think of a chevron as a path consisting of two line segments meeting in a point. We'll refer to this point as the center point.

<figure>
<img src="../images/chevron/chevron.svg" width="250" alt="Diagram showing relationship between a line and a chevron on the line"/>
<figcaption>The three points of a single chevron.</figcaption>
</figure>

The center point is on the main line (that we drew in the previous section) and will be pretty easy to find. The two other points have a constant offset from the center point. We can calculate those offsets by subtracting and adding `chevronAngle` from the angle of our main line, then converting the resulting angles to two vectors of length `chevronLength`:

```javascript
// Offset of the first point of a chevron relative to its center point
// calculated by subtracting the chevron angle from the line angle
const startX = Math.cos(angle - chevronAngle) * chevronLength;
const startY = Math.sin(angle - chevronAngle) * chevronLength;

// Offset of the third point of a chevron relative to its center point
// calculated by adding the chevron angle to the line angle
const endX = Math.cos(angle + chevronAngle) * chevronLength;
const endY = Math.sin(angle + chevronAngle) * chevronLength;
```

Finally we can loop through all the chevrons and draw them using the above offsets:

```javascript
// Number of chevrons to draw based on length of line
const n = Math.floor(length / chevronSpace);
for (let i = 0; i < n; i++) {
  // The position of the center point of the i'th chevron
  const x = x0 + (x1 - x0) * i / n;
  const y = y0 + (y1 - y0) * i / n;
  ctx.beginPath();
  ctx.moveTo(x + startX, y + startY); // First point
  ctx.lineTo(x, y);                   // Second point
  ctx.lineTo(x + endX, y + endY);     // Third point
  ctx.stroke();
}
```

<figure>
<canvas id="canvas2" width="300" height="200" style="border: 1px solid #000;"></canvas>
</figure>

<label>Chevron space: <input type="number" size=5 name="chevronSpace" value="7"/></label>

<label>Chevron angle in degrees: <input type="number" size=5 name="chevronAngle" value="126"/></label>

<label>Chevron length: <input type="number" size=5 name="chevronLength" value="10"/></label>

<button type="submit">Update</button>

## Animating the chevrons

To animate the chevrons we'll use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) to repeatedly call our rendering code, each time adding a small offset to the position of the chevrons. The speed at which we do this will be defined by the following constant:

```javascript
// Number of pixels to move the chevrons each second
const pixelsPerSecond = 20;
```

The amount by which we change the offset at each frame can then be calculated using the timestamp provided to us by `requestAnimationFrame`. To apply the offset to our chevrons we convert it to a vector using the angle of the main line.

```javascript
// Previous timestamp for calculating delta
let prevTimestamp;
// Animation offset of chevrons in pixels
let offset = 0;

function render(timestamp) {
  // Calculate elapsed time (delta) since previous frame
  const delta = prevTimestamp ? timestamp - prevTimestamp : 0;
  prevTimestamp = timestamp;

  const n = Math.floor(length / chevronSpace);

  // Calculate coordinate offset using the line angle
  const offsetX = offset * Math.cos(angle);
  const offsetY = offset * Math.sin(angle);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.lineWidth = lineWidth;

  for (let i = 0; i < n; i++) {
    // Apply previously calculated offset to chevron
    const x = x0 + (x1 - x0) * i / n + offsetX;
    const y = y0 + (y1 - y0) * i / n + offsetY;
    ctx.beginPath();
    ctx.moveTo(x + startX, y + startY);
    ctx.lineTo(x, y);
    ctx.lineTo(x + endX, y + endY);
    ctx.stroke();
  }

  // Add offset based on elapsed time
  offset += pixelsPerSecond * delta / 1000;
  // Roll over to the start
  if (offset >= chevronSpace) {
    offset %= chevronSpace;
  }

  // Render the next frame when the browser is ready for it
  requestAnimationFrame(render);
}

requestAnimationFrame(render);
```

<figure>
<canvas id="canvas3" width="300" height="200" style="border: 1px solid #000;"></canvas>
</figure>

If you cover up both ends of the above line with your fingers, it pretty much looks the way it should. We just need to do something about the chevrons popping in and out of existence.

<label>Pixels per second: <input type="number" size=5 name="pixelsPerSecond" value="20"/></label>

<button type="submit">Update</button>

## Fading

It turns out the jerkiness of the above animation is fairly easy to fix. All we need to do is to slowly fade in the chevrons at the start of line and slowly fade out the chevrons at the end of the line. We'll define one additional constant that sets the number of pixels that will be used for fading chevrons in and out:

```javascript
// Number of pixels it takes for a chevron to fade in at the start of the line
// and fade out at the end
let fadeLength = 30;
```

To use it we'll add the following code inside the loop before we draw the path (before the call to `ctx.stroke()`):

```javascript
// The opacity depends on how close we are to the start (0) or end
// (n * chevronSpace) of the line
const dist = Math.min(i * chevronSpace + offset,
  n * chevronSpace - (i * chevronSpace + offset));
const opacity = Math.min(1, dist / fadeLength);
ctx.strokeStyle = 'rgba(0, 0, 0, ' + opacity + ')';
```

This results in a 30 pixel gradient from white to black at both ends of the line:

<figure>
<canvas id="canvas4" width="300" height="200" style="border: 1px solid #000;"></canvas>
</figure>

This is the final chevron animation. You can go back and change the other parameters to see what effects they have on the final result.

<label>Fade length: <input type="number" size=5 name="fadeLength" value="30"/></label>

<button type="submit">Update</button>

## Conclusion

I'm not sure how useful this is, but I just wanted to share it since it wasn't completely obvious to me at first how to do this, and I haven't been able to find any other mentions of this type of effect. That might be down to the fact that I don't even really know what the effect is called though.

All the JavaScript used on this page is available [here](../misc/chevron.js).

</form>

<script type="text/javascript" src="../misc/chevron.js"></script>
