{
  published: "2023-03-25 17:02",
  tags: ["arq", "devlog"],
  prefix: "Arq Devlog"
}
# #2: Movement

The very first things I implemented was a basic square canvas consisting of 21&times;21 tiles with the player character fixed in the center.
Moving the player around moves the world around underneath the player thus maintaining the same visibility in all directions.
Movement is locked to the grid, but it's possible to move diagonally. I always wanted it to be possible to play primarily using a mouse (or finger on touch screens)
so I added A* pathfinding to make it easy to move around. Movement using the WASD keys is also possible.

Initially I did not want to have any movement animation at all. I wanted a player's equipment to be visible, so having a walking animation would make it harder to add new equipment types, additionally mobs would have their own walking animations as well further complicating the creation of new mob types.
So initially I just teleported the player from tile to tile. After implementing this I did however experiment with smoothly sliding the player from tile to tile, and after doing that it was just a matter of using the sine function to make a simple jumping animation without requiring any additional sprite work:

<figure>
<video src="../images/arq/movement.webm" autoplay loop></video>
<figcaption>Movement and pathfinding in Arq. The tiles are from a tile set I made many years ago. The player sprite is new, but needs some work.</figcaption>
</figure>

I'm relatively happy with this, but I may come back and change it out for a walking/running animation later, it's just not a priority at the moment.

