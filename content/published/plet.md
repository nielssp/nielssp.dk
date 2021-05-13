{
  published: "2021-05-13 12:03",
  tags: ["textstep", "plet", "c", "blog"]
}
# Yet another static site generator

For a while I'd wanted to take the actual site generator and template language from [TEXTSTEP](./textstep.md) and spin it out into its own project. I was hoping this would be a simple task, and that I could quickly cobble together something in C. Why C? Familiarity and performance. In hindsight, some tasks were probably way more time consuming than they would have been if I had chosen to use something other than C, and overall everything took a lot longer than I had originally anticipated.

I initially named this project *tsc* (&ldquo;the TEXTSTEP compiler&rdquo;), but when I later realized that &ldquo;tsc&rdquo; is actually the TypeScript compiler, I renamed it to *Plet* (derived from the word [&ldquo;templet&rdquo;](https://en.wiktionary.org/wiki/templet), an archaic form of the word &ldquo;template&rdquo;). Thus Plet is now the name of the static site generator I've built, as well as the programming language used for writing Plet templates and scripts.

The Plet source code is available on [GitHub](https://github.com/nielssp/plet) and the documentation (still work in progress) is available on [docs.plet.info](https://docs.plet.info) (automatically deployed from the Plet repository using Plet and GitHub Actions). There are currently only two examples of sites created using Plet: [This blog](https://github.com/nielssp/nielssp.dk), and the [Plet documentation](https://github.com/nielssp/plet/tree/master/doc).

Some of the features currently offered by Plet are:

* Automatically resizes images using ImageMagick
* Pagination
* Built-in web server that compiles pages on demand and automatically reloads when changes are detected
* High level of flexibility via built-in programming language

The flexibility comes at the cost of usability since at the moment you pretty much have to learn a new programming language before you can put together a website. I'm hoping that in the future I'll be able to improve this with a set of premade themes as well as commands for quickly setting up common site structures without having to worry about anything other than typing the actual content of the website in Markdown. Plet also at the moment only compiles on Linux (mostly because of the low-level APIs used for the built-in web server) which is something I'd also like to fix at some point.
