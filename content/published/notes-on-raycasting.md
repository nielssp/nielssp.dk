{
  published: "2024-10-19 18:07",
  tags: [],
  toc_depth: 2,
}

# Notes on ray casting

These are my notes on [ray casting](https://en.wikipedia.org/wiki/Ray_casting)

See also: [Lode's Computer Graphics Tutorial](https://lodev.org/cgtutor/raycasting.html)

<div class="toc">
<h2 data-toc-ignore>Contents</h2>
<!--toc-->
</div>

## Casting rays

First we need to create a canvas:

```html
<canvas id="canvas"></canvas>
```

```typescript
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
canvas.width = 320;
canvas.height = 200;
canvas.style.imageRendering = 'pixelated';

const ctx = canvas.getContext('2d')!;
ctx.imageSmoothingEnabled = false;
```

We'll calculate the aspect ratio as well

```typescript
const aspectRatio = canvas.width / canvas.height;
```

```typescript
function onAnimationFrame(time: number) {
    const dt = (time - previousTime) / 1000;
    previousTime = time;

    render();

    requestAnimationFrame(onAnimationFrame);
}
```

### Map

The map is 2-dimensional and made up of cells that are either solid or not.

```typescript
export interface Cell {
    solid: boolean;
}
```

We can initialize the map from an array of strings &ndash; in which Xs represent walls &ndash; as follows:

```typescript
export const map: Cell[][] = [
    'XXXXXXXXXXXXXXXXXXXX',
    'X        X         X',
    'X        X         X',
    'X      X X   X     X',
    'X     XX X   X     X',
    'X        X   X     X',
    'X     XXXXXXXX     X',
    'X                  X',
    'X                  X',
    'X                  X',
    'XXXXXXXXXXXXXXXXXXXX',
].map(row => row.split('').map(cell => {
    return {
        solid: cell === 'X',
    };
}));
export const mapSize: Vec2 = {
    x: map[0].length,
    y: map.length,
};
```

The players position and orientation in the map will be represented by two vectors:

```typescript
const playerPos: Vec2 = {x: 2, y: 3};
const playerDir: Vec2 = {x: 1, y: 0};
```

The `playerDir` vector is a unit vector (i.e. length 1).

### Casting rays

To cast rays we'll start at the left side of the screen, then move right one column at the time. To determine the angle of each screen column we'll need a vector that describes the orientation of the camera/screen relative to the map. If we rotate the player's direction vector counterclockwise by 90 degrees:

```typescript
const cameraPlane = {
    x: -playerDir.y,
    y: playerDir.x,
};
```

With that, the basic loop is as follows:

```typescript
for (const x = 0; x < canvas.width; x++) {
    // TODO
}
```

For each x-coordinate of the canvas we'll calculate how far from the center of the screen we are proportional to the width of the screen:

```typescript
const cameraX = aspectRatio * x / canvas.width - aspectRato / 2;
```

This gives us a number from `- aspectRatio / 2` to `aspectRatio / 2` where 0 represents the center of the screen. We can multiply this number by the camera plane vector and add the result to the player's direction to get the ray direction vector for the current column:

```typescript
const rayDir = add2(playerDir, mul2(cameraX, cameraPlane));
```

We'll also need to keep track of the map position (i.e. the indices of the current cell):

```typescript
const mapPos = {
    x: Math.floor(playerPos.x),
    y: Math.floor(playerPos.y),
};
```

```typescript
const deltaDist = {
    x: Math.abs(1 / rayDir.x),
    y: Math.abs(1 / rayDir.y),
};
```

```typescript
const sideDist = {x: 0, y: 0};
const step = {x: 0, y: 0};
if (rayDir.x < 0) {
    step.x = -1;
    sideDist.x = (playerPos.x - mapPos.x) * deltaDist.x;
} else {
    step.x = 1;
    sideDist.x = (mapPos.x + 1.0 - playerPos.x) * deltaDist.x;
}
if (rayDir.y < 0) {
    step.y = -1;
    sideDist.y = (playerPos.y - mapPos.y) * deltaDist.y;
} else {
    step.y = 1;
    sideDist.y = (mapPos.y + 1.0 - playerPos.y) * deltaDist.y;
}
```

```typescript
let side = 0;
let perpWallDist = 0;
```

```typescript
while (true) {
    advanceRay(ray);
    const cell = getMapCell(map, ray.mapPos, mapSize)
    if (!cell) {
        break;
    } else if (cell.solid) {
        renderWall(canvas, ctx, ray);
        break;
    }
}
```

```typescript
export function advanceRay(
    ray: Ray,
) {
    if (ray.sideDist.x < ray.sideDist.y) {
        ray.perpWallDist = ray.sideDist.x;
        ray.sideDist.x += ray.deltaDist.x;
        ray.mapPos.x += ray.step.x;
        ray.side = 0;
    } else {
        ray.perpWallDist = ray.sideDist.y;
        ray.sideDist.y += ray.deltaDist.y;
        ray.mapPos.y += ray.step.y;
        ray.side = 1;
    }
}
```

<figure>
<canvas id="canvas1b" width="600" height="480" tabindex=0></canvas>
</figure>

### Rendering walls

```typescript
const wallHeight = Math.ceil(canvasHeight / dist);
const wallY = Math.floor((canvasHeight - wallHeight) / 2);
```

```typescript
ctx.strokeStyle = ray.side ? '#005566' : '#003F4C';
ctx.beginPath()
ctx.moveTo(ray.x + 0.5, Math.max(wallY, 0));
ctx.lineTo(ray.x + 0.5, Math.min(wallY + wallHeight + 1, canvas.height));
ctx.stroke();
```

### Inputs and movement

#### Keyboard input

``` typescript
interface PlayerInputs {
    moveForward: boolean;
    moveBackward: boolean;
    turnLeft: boolean;
    turnRight: boolean;
    rotationSpeed: number;
}
```

```typescript
export function updateInputs(e: KeyboardEvent, state: boolean, playerInputs: PlayerInputs) {
    switch (e.key) {
        case 'ArrowLeft':
        case 'a':
            playerInputs.turnLeft = state;
            break;
        case 'ArrowRight':
        case 'd':
            playerInputs.turnRight = state;
            break;
        case 'ArrowUp':
        case 'w':
            playerInputs.moveForward = state;
            break;
        case 'ArrowDown':
        case 's':
            playerInputs.moveBackward = state;
            break;
        default:
            return;
    }
    e.preventDefault();
}

canvas.addEventListener('keydown', e => updateInputs(e, true, playerInputs));
canvas.addEventListener('keyup', e => updateInputs(e, false, playerInputs));
```

```typescript
if (playerInputs.moveForward || playerInputs.moveBackward) {
    const moveSpeed = dt * 3;
    const newPos = {...playerPos};
    if (playerInputs.moveForward) {
        newPos.x += moveSpeed * playerDir.x;
        newPos.y += moveSpeed * playerDir.y;
    } else {
        newPos.x -= moveSpeed * playerDir.x;
        newPos.y -= moveSpeed * playerDir.y;
    }
    setPos(newPos);
}
```

```typescript
if (playerInputs.turnLeft || playerInputs.turnRight) {
    // Apply acceleration to better allow for small adjustments
    const rotSpeed = dt * 3;
    const rotAccel = dt * 0.6;
    if (playerInputs.turnLeft) {
        playerInputs.rotationSpeed = Math.max(-rotSpeed, Math.min(0, playerInputs.rotationSpeed) - rotAccel);
    } else {
        playerInputs.rotationSpeed = Math.min(rotSpeed, Math.max(0, playerInputs.rotationSpeed) + rotAccel);
    }
    // Rotate direction vector
    set2(playerDir, {
        x: playerDir.x * Math.cos(playerInputs.rotationSpeed) - playerDir.y * Math.sin(playerInputs.rotationSpeed),
        y: playerDir.x * Math.sin(playerInputs.rotationSpeed) + playerDir.y * Math.cos(playerInputs.rotationSpeed),
    });
} else {
    playerInputs.rotationSpeed = 0;
}
```

##### Strafing

```typescript
if (playerInput.strafeLeft || playerInputs.strafeRight) {
    // TODO
}
```

### Mouse input


### Putting it all together

<figure>
<canvas id="canvas1" width="320" height="200" tabindex=0></canvas>
<figcaption>Click to focus. Use the arrow keys or the mouse to move.
</figure>

### Shading based on distance

```typescript
export function getBrightness(dist: number, side: 0 | 1 = 0) {
    return 1 - Math.min(0.8, Math.max(0, (dist - side) / 10));
}
```

```typescript
const brightness = getBrightness(ray.perpWallDist, ray.side);
ctx.strokeStyle = `rgb(0, ${85 * brightness}, ${102 * brightness})`;

ctx.beginPath()
ctx.moveTo(ray.x + 0.5, Math.max(wallY, 0));
ctx.lineTo(ray.x + 0.5, Math.min(wallY + wallHeight + 1, canvas.height));
ctx.stroke();
```

<figure>
<canvas id="canvas2" width="320" height="200" tabindex=0></canvas>
</figure>

## Texturing walls

```typescript
let wallX: number;
if (ray.side === 0) {
    wallX = playerPos.y + ray.perpWallDist * ray.rayDir.y - ray.mapPos.y;
} else {
    wallX = playerPos.x + ray.perpWallDist * ray.rayDir.x - ray.mapPos.x;
}
```

```typescript
let texX: number = Math.floor(wall.wallX * textureSize.x);
const yStart = Math.max(wall.wallY, 0);
const yEnd = Math.min(wall.wallY + wall.wallHeight, canvas.height);
```

```typescript
const step = textureSize.y * ray.perpWallDist / canvas.height;
let texPos = wall.wallY < yStart ? (yStart - wall.wallY) * step : 0;
```

```typescript
for (let y = yStart; y < yEnd; y++) {
    const offset = y * 4;
    const texY = texPos & (textureSize.y - 1);
    texPos += step;
    const texOffset = (texY * textureSize.x + texX) * 4;
    stripe.data[offset] = wallTexture.data[texOffset] * brightness;
    stripe.data[offset + 1] = wallTexture.data[texOffset + 1] * brightness;
    stripe.data[offset + 2] = wallTexture.data[texOffset + 2] * brightness;
    stripe.data[offset + 3] = 255;
}
```

<figure>
<img src="../misc/textures/wall.png">
</figure>

<figure>
<canvas id="canvas3" width="320" height="200" tabindex=0></canvas>
</figure>

```typescript
if (ray.side === 0 && ray.rayDir.x < 0) {
    texX = textureSize.x - texX - 1;
}
if (ray.side === 1 && ray.rayDir.y > 0) {
    texX = textureSize.x - texX - 1;
}
```

## Skybox

<figure>
<img src="../misc/textures/sky.png">
</figure>

<figure>
<canvas id="canvas4" width="320" height="200" tabindex=0></canvas>
</figure>

## Texturing floors 

There are several different approaches to rendering floors (and ceilings). I've picked the following approach because it makes it relatively easy to have different floor and ceilings heights for cells.

The basic idea is that while advancing a ray we'll concurrently render the floors for the cells the ray passes through. We'll keep track of how much floor we've rendered for the current column with the following variable:   

```typescript
let yFloor = 0;
```

Each time the ray hits a cell we'll calculate where the floor should stop, i.e. just below wall (even if there isn't actually a wall there):

```typescript
const cellY = (canvas.height - wall.wallHeight) * 0.5;
const floorCellY = Math.ceil(cellY);
```

```typescript
let floorXWall: number, floorYWall: number;
if (ray.side === 0 && ray.rayDir.x > 0) {
    floorXWall = ray.mapPos.x;
    floorYWall = ray.mapPos.y + wallX;
} else if (ray.side === 0 && ray.rayDir.x < 0) {
    floorXWall = ray.mapPos.x + 1;
    floorYWall = ray.mapPos.y + wallX;
} else if (ray.side === 1 && ray.rayDir.y > 0) {
    floorXWall = ray.mapPos.x + wallX;
    floorYWall = ray.mapPos.y;
} else {
    floorXWall = ray.mapPos.x + wallX;
    floorYWall = ray.mapPos.y + 1;
}
```

```typescript
while (yFloor < floorCellY) {
    const y = (canvas.height - yFloor - 1);
    mapFloorTexture(canvas, stripe, y, floor, playerPos, yFloor, perpWallDist, floorTexture);
    yFloor++;
}
```

```typescript
const rowDistance = canvas.height / (canvas.height - 2 * yFloor);
const weight = rowDistance / perpWallDist;
const floorX = weight * floor.floorXWall + (1 - weight) * playerPos.x;
const floorY = weight * floor.floorYWall + (1 - weight) * playerPos.y;
let tx = ((textureSize.x * floorX) | 0) & (textureSize.x - 1);
let ty = ((textureSize.y * floorY) | 0) & (textureSize.y - 1);
const texOffset = (ty * textureSize.x + tx) * 4;
const brightness = getBrightness(rowDistance);
const offset = y * 4;
stripe.data[offset] = floorTexture.data[texOffset] * brightness;
stripe.data[offset + 1] = floorTexture.data[texOffset + 1] * brightness;
stripe.data[offset + 2] = floorTexture.data[texOffset + 2] * brightness;
stripe.data[offset + 3] = 255;
```

<figure>
<img src="../misc/textures/floor.png">
</figure>

<figure>
<canvas id="canvas5" width="320" height="200" tabindex=0></canvas>
</figure>

## Texturing ceilings

We can texture ceilings the exact same way as we textured the floors. We'll initialize the variable `yCeiling` to 0 a the start of each ray:

```typescript
let yCeiling = 0;
```

```typescript
const ceilingCellY = Math.ceil(cellY);
```

The only difference from floors is that since ceilings start from the top of the screen, we can use `yCeiling` directly:

```typescript
while (yCeiling < ceilingCellY) {
    mapFloorTexture(canvas, stripe, yCeiling, floor, playerPos, yCeiling, perpWallDist, ceilingTexture);
    yCeiling++;
}
```

We'll use the following ceiling texture:

<figure>
<img src="../misc/textures/ceiling.png" alt="Ceiling texture">
</figure>

And here's the result:

<figure>
<canvas id="canvas6" width="320" height="200" tabindex=0></canvas>
</figure>

## Cell textures

```typescript
export interface Cell {
    solid: boolean;
    wallType: string;
    floorType: string;
    ceilingType: string;
    wallTexture?: ImageData;
    floorTexture?: ImageData;
    ceilingTexture?: ImageData;
}
```

```typescript
const walls = [
    'WWWWWRWWWRRRRRWWWWWW',
    'W        R         W',
    'W        R         W',
    'W      W R   R     W',
    'W     WW R   R     W',
    'W        R   R     W',
    'W     RRRRRRRR     W',
    'W                  W',
    'W                  W',
    'W                  W',
    'WWWWWWWWWWWWWWWWWWWW',
];

const floors = [
    'FFFFFFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFFFFFF',
    'FFFFGGGGGGGGGFFFFFFF',
    'FFFFGGGGGGGGGFFFFFFF',
    'FFFFGGGGGGGGGFFFFFFF',
    'FFFFFFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFFFFFF',
    'FFFFFFFFFFFFFFFFFFFF',
];

const ceilings = [
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCFFFCCCCCCCCCC',
    'CCCCCCCFFFCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
    'CCCCCCCCCCCCCCCCCCCC',
];
```

```typescript
export const map: Cell[][] = walls.map((row, y) => {
    const floorTypes = floors[y].split('');
    const ceilingTypes = ceilings[y].split('');
    return row.split('').map((wallType, x) => {
        return {
            solid: wallType !== ' ',
            wallType,
            floorType: floorTypes[x],
            ceilingType: ceilingTypes[x],
        };
    })
});
```

<figure>
<img src="../misc/textures/wall-red.png">
<img src="../misc/textures/floor-green.png">
</figure>

<figure>
<canvas id="canvas7" width="320" height="200" tabindex=0></canvas>
</figure>

## Sliding doors

```typescript
export interface Door {
    sideTexture?: ImageData;
    offset: number;
    active: boolean,
}
```

```typescript
export interface Cell {
    // ...
    door?: Door;
}
```

```typescript
if (cell.door) {
    if (renderDoor(canvas, stripe, cell, cell.door, ray, playerPos, floor, yFloor, yCeiling)) {
        break;
    }
} else if (cell.solid) {
    renderWall(canvas, stripe, ray, wall, cell.wallTexture);
    break;
}

```

```typescript
export function renderDoor(
    canvas: HTMLCanvasElement,
    stripe: ImageData,
    cell: Cell,
    door: Door,
    ray: Ray,
    playerPos: Vec2,
    floor: FloorMeasurements,
    yFloor: number,
    yCeiling: number,
): boolean {
    const floorWallDist = ray.perpWallDist;
    let doorX: number;
    if (ray.side === 0) {
        doorX = playerPos.y + (ray.sideDist.x - ray.deltaDist.x * doorEnd) * ray.rayDir.y;
    } else {
        doorX = playerPos.x + (ray.sideDist.y - ray.deltaDist.y * doorEnd) * ray.rayDir.x;
    }
    let doorMapX = Math.floor(doorX);
    let doorSide = false;
    if (doorX - doorMapX < door.offset) {
        // The door is partially open and we're looking through the opening
        doorSide = true;
        if (ray.side === 0) {
            doorX = playerPos.x + (ray.sideDist.y - ray.deltaDist.y * (1 - door.offset)) * ray.rayDir.x;
        } else {
            doorX = playerPos.y + (ray.sideDist.x - ray.deltaDist.x * (1 - door.offset)) * ray.rayDir.y;
        }
        let doorMapX = Math.floor(doorX);
        if (doorX - doorMapX < doorStart || doorX - doorMapX > doorEnd) {
            return false;
        } else if (ray.side === 1 && doorMapX === ray.mapPos.y && ray.rayDir.x > 0) {
            ray.side = 0;
            ray.perpWallDist = ray.sideDist.x - ray.deltaDist.x * (1 - door.offset);
            ray.sideDist.x += ray.deltaDist.x * door.offset;
        } else if (ray.side === 0 && doorMapX === ray.mapPos.x && ray.rayDir.y > 0) {
            ray.side = 1;
            ray.perpWallDist = ray.sideDist.y - ray.deltaDist.y * (1 - door.offset);
            ray.sideDist.y += ray.deltaDist.y * door.offset;
        } else {
            return false;
        }
    } else if (ray.side === 0 && doorMapX === ray.mapPos.y) {
        ray.perpWallDist = ray.sideDist.x - ray.deltaDist.x * doorEnd;
        ray.sideDist.x += ray.deltaDist.x * doorStart;
    } else if (ray.side === 1 && doorMapX === ray.mapPos.x) {
        ray.perpWallDist = ray.sideDist.y - ray.deltaDist.y * doorEnd;
        ray.sideDist.y += ray.deltaDist.y * doorStart;
    } else {
        return false;
    }
    const wall = getWallMeasurements(ray, canvas.height, playerPos);
    if (!doorSide) {
        wall.wallX -= door.offset;
    }
    renderFloorAndCeiling(canvas, stripe, wall, floor, playerPos, floorWallDist,
        yFloor, yCeiling, cell.floorTexture, cell.ceilingTexture);
    renderWall(canvas, stripe, ray, wall, doorSide ? door.sideTexture : cell.wallTexture);
    return true;
}

```

<figure>
<img src="../misc/textures/door.png">
<img src="../misc/textures/door-side.png">
</figure>

<figure>
<canvas id="canvas8" width="320" height="200" tabindex=0></canvas>
<figcaption>Press E or left click to open doors.</figcaption>
</figure>


## Sprites

```typescript
export interface Sprite {
    pos: Vec2;
    texture: ImageData;
    relPos: Vec2;
    relDist: number;
}
```

```typescript
const sprites: Sprite[] = [];
const barrelTexture = await loadTextureData('/assets/content/misc/textures/barrel.png');
sprites.push(createSprite({x: 4, y: 3}, barrelTexture));
sprites.push(createSprite({x: 5, y: 2.75}, barrelTexture));
```

```typescript
const zBuffer = Array(canvas.width);
for (let x = 0; x < canvas.width; x++) {
    // ...
    zBuffer[x] = ray.perpWallDist;
}
```

```typescript
export function renderSprites(
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    aspectRatio: number,
    sprites: Sprite[],
    zBuffer: number[],
    playerPos: Vec2,
    playerDir: Vec2,
    cameraPlane: Vec2,
) {
    for (const sprite of sprites) {
        sprite.relPos = sub2(sprite.pos, playerPos);
        sprite.relDist = sprite.relPos.x * sprite.relPos.x + sprite.relPos.y * sprite.relPos.y;
    }
    sprites.sort((a, b) => b.relDist - a.relDist);

    const invDet = 1 / (cameraPlane.x * playerDir.y - playerDir.x * cameraPlane.y);
    for (const sprite of sprites) {
        const transformX = invDet * (playerDir.y * sprite.relPos.x - playerDir.x * sprite.relPos.y);
        const transformY = invDet * (-cameraPlane.y * sprite.relPos.x + cameraPlane.x * sprite.relPos.y);
        const spriteScreenX = canvas.width / aspectRatio * (aspectRatio / 2 + transformX / transformY) | 0;
        const spriteHeight = Math.abs(canvas.height / transformY | 0);
        const drawStartY = (-spriteHeight / 2 + canvas.height / 2) | 0;
        const spriteWidth = Math.abs(canvas.height / transformY | 0);
        const drawStartX = Math.max(0, -spriteWidth / 2 + spriteScreenX) | 0;
        const drawEndX = Math.min(canvas.width - 1, spriteWidth / 2 + spriteScreenX) | 0;
        const texY = 0;
        const xMax = drawEndX - drawStartX;
        if (xMax < 1 || transformY <= 0) {
            continue;
        }
        const screenStartY = Math.max(0, Math.min(canvas.height - 1, drawStartY));
        const spriteYOffset = drawStartY < 0 ? drawStartY : 0;
        const yMax = Math.min(canvas.height, screenStartY + spriteHeight) - screenStartY;
        const brightness = getBrightness(transformY);
        const imageData = ctx.getImageData(drawStartX, screenStartY, xMax, yMax);
        for (let x = 0; x < xMax; x++) {
            const stripe = x + drawStartX;
            const texX = Math.floor(64 * (stripe - (-spriteWidth / 2 + spriteScreenX)) * textureSize.x / spriteWidth / 64);

            if (stripe > 0 && stripe < canvas.width) {
                for (let y = 0; y < yMax; y++) {
                    if (transformY >= zBuffer[x + drawStartX]) {
                        continue;
                    }
                    const texYPos = texY + Math.floor((y - spriteYOffset) / spriteHeight * textureSize.y);
                    const offset = (y * imageData.width + x) * 4;
                    const texOffset = (texYPos * textureSize.x + texX) * 4;
                    if (sprite.texture.data[texOffset + 3]) {
                        imageData.data[offset] = sprite.texture.data[texOffset] * brightness;
                        imageData.data[offset + 1] = sprite.texture.data[texOffset + 1] * brightness;
                        imageData.data[offset + 2] = sprite.texture.data[texOffset + 2] * brightness;
                        imageData.data[offset + 3] = sprite.texture.data[texOffset + 3];
                    }
                }
            }
        }
        ctx.putImageData(imageData, drawStartX, screenStartY);
    }
}

```

<figure>
<img src="../misc/textures/barrel.png">
</figure>

<figure>
<canvas id="canvas9" width="320" height="200" tabindex=0></canvas>
</figure>

## Portals

<figure>
<canvas id="canvas10" width="320" height="200" tabindex=0></canvas>
</figure>

## Different floor and ceiling heights

<img src="../misc/textures/wall2.png">

<figure>
<canvas id="canvas11" width="320" height="200" tabindex=0></canvas>
<figcaption>Press space or right click to jump.</figcaption>
</figure>

## Optimization

<figure>
<canvas id="canvas12" width="320" height="200" tabindex=0></canvas>
</figure>

<script type="text/javascript" src="../misc/raycasting.js"></script>

<img src="../misc/textures/test.png">
