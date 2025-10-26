{
  published: "2025-10-26 15:40",
  tags: ["arq", "devlog"],
  prefix: "Arq Devlog"
}
# #20: Fishing

<figure>
<video src="../images/arq/fishing.webm" autoplay loop></video>
<figcaption>It wouldn't be a real MMO without fishing.</figcaption>
</figure>

I've spent a bit of time working on a simple &ldquo;profession&rdquo; system separate from the existing skills and abilities (that are focused on combat). The first profession I've implemented is fishing, which makes it possible to catch fish in the sea, lakes, and rivers.

To fish, the player needs a fishing rod and bait. With that equipped, any water tile can be right clicked to access the &ldquo;Fish&rdquo;-action. The types of fish available depend on the area, e.g. saltwater fish in the sea, freshwater fish in lakes and rivers.

Unlike for skills and abilities, where skill points can be assigned, profession levels are gained by using the profession. So each time a fish is caught, the player receives an amount of fishing XP. A higher fishing level unlocks more types of fish.

The profession is almost entirely idle-able, but fish rates can be improved by fishing the tiles with shimmering water. Those tiles move around, so to maintain higher fish rates some occasional input is required.

So far I've only implemented a four types of fish, but it should be easy enough to expand. Other expansions are also possible, for instance I already have a mechanism for allowing certain types of fish to require a specific type of bait.

As far as other professions go, I also want to add mining and cooking (both probably as simple as fishing), as well as alchemy and possibly some sort of crafting/smithing. Alchemy is a profession I've had on my backlog for a while, and it's one that I imagine to involve a bit more complexity and active gameplay than fishing.
