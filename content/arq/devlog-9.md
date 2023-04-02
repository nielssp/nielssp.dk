{
  published: "2023-04-02 12:30",
  tags: ["arq", "devlog"],
  prefix: "Arq Devlog"
}
# #9: Slash animation

And here's a simple slash animation:

<figure>
<video src="../images/arq/slash.webm" autoplay loop></video>
<figcaption>A slash animation.</figcaption>
</figure>

The trick is that the arm and hand are animated with a simple three frame animation, and then in code I rotate the sword at a higher frame rate while positioning it in the correct place.
The result is a pretty smooth animation with the added benefit that I don't have to manually animate the sword at all thus making it much easier to add different swords and weapons to the game.

I got the idea for this from Terraria, which uses this technique for weapon/tool animations. [Some examples can be seen here](https://terraria.fandom.com/wiki/Category:Demonstration_animations).

