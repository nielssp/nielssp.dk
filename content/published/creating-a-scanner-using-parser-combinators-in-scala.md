# Creating a scanner using parser combinators in Scala (PLDS part I)

*This post is part of a series on **P**rogramming **L**anguage **D**esign in **S**cala (PLDS). [Click here to see the rest of the posts in the series.](bs:/tags/plds)*

In September 2014 I stumbled upon the [Scala Parser Combinators library](https://github.com/scala/scala-parser-combinators) and ended up playing around with implementing a small programming language in Scala. Although the language itself was more or less useless, I thought that the process of designing and implementing it (and later extending it with more features) was a pretty fun activity. This then gave me the idea to start this blog as a place for programming and computer science related topics that I find interesting. My first blog post was supposed to be a short tutorial or introduction to Scala Parser Combinators based around the implementation of a small programming language. Because of a lack of motivation, ideas and time, my first post instead ended up being about [an entirely different project](colorgrab-a-crossplatform-color-picker.md), and my post about parser combinators remained an unfinished draft for more than six months.

Now I've finally found the energy to complete this project, or at least the first part of it. My idea is to write a series of blog posts about the design and implementation of programming languages using practical examples in Scala (and perhaps other languages in the future). The first two posts will be about the syntactic analysis part of a language implementation, i.e. parsing the source code. This very first post will briefly introduce language design, formal definition of syntax, and how to implement a *scanner* in Scala. A scanner (also known as a *tokenizer* or a *lexer*) is a simple program that reads a sequence of characters (the source code) and outputs a sequence of tokens, i.e. a sequence of syntactical components. This process is known as [lexical analysis](https://en.wikipedia.org/wiki/Lexical_analysis) (and also sometimes tokenization), and is usually what precedes the actual parsing step, where a parse tree or an abstract syntax tree is constructed from the sequence of tokens. The parsing step is described in the next post, so for now we'll just be looking at the scanner.

This post should serve as an introduction to—and shouldn't require any prior knowledge of—language design and Scala, although a basic understanding of programming and programming languages is a prerequisite. I also recommend reading some [tutorials](http://docs.scala-lang.org/tutorials) if you're interested in learning more about Scala.

<div class="break"></div>

## Language definition and grammar

The first step of any good language implementation is the specification. At this stage we formally specify the syntax of the language. The language we'll be implementing is a simple purely functional programming language similar in appearance to [Haskell](https://en.wikipedia.org/wiki/Haskell_%28programming_language%29) or [ML](https://en.wikipedia.org/wiki/ML_%28programming_language%29) and its dialects. I'll be refering to the language as *PLDS* (**P**rogramming **L**anguage **D**esign in **S**cala), and—since I'll extend it in later posts—I'll refer to this iteration as **PLDS/1**.

### Syntax

The formal syntax of PLDS can be expressed as a [context-free grammar](https://en.wikipedia.org/wiki/Context-free_grammar). A grammar consists of a list of production rules that specify how strings of a language may be formed. Each rule consists of a non-terminal on the left (i.e. the name of the rule) and any number of operators, terminals and non-terminals on the right. The following notational conventions (a variant of [Extended Backus–Naur Form](https://en.wikipedia.org/wiki/Extended_Backus%E2%80%93Naur_Form)) are used:
 - `A` a non-terminal, the name of a production rule
 - `a` a non-terminal, the name of token (defined in the next section)
 - `"a"` a terminal: a keyword, operator or punctuation token
 - `a b` concatenation, `a` followed by `b`
 - `a | b` alternation, `a` or `b`
 - `{a}` repetition, zero or more repetitions of `a`
 - `[a]` option, zero or one `a`
 - `(a)` group, used to override precedence
 - `a - b` exception, `a` but not `b`

Using these conventions the overall structure of PLDS program is defined as:
```nohighlight
Program      ::=  {Definition}
Definition   ::=  "let" name "=" Expr
```
Thus a program is a sequence of definitions, and a single definition assigns the value of an expression to a name. Expressions are defined below:
```nohighlight
Expr         ::=  "let" name "=" Expr "in" Expr
               |  "\\" name "->" Expr
               |  "if" Expr "then" Expr "else" Expr
               |  Comparison
Comparison   ::=  Comparison ("==" | "!=) AddSub
               |  AddSub
AddSub       ::=  AddSub ("+" | "-") MultDiv
               |  MultDiv
MultDiv      ::=  MultDiv ("*" | "/") Application
               |  Application
Application  ::=  Atomic {Atomic}
Atomic       ::=  "(" Expr ")"
               |  name
               |  literal
```
Expressions consist of let-expressions, λ-abstractions, if-expressions, comparisons, and arithmetic operations.

The above grammar defines the valid structure of a program in PLDS, and we will look more into it when we implement the parser. But for now we will move on to the lexical grammar, which is what we are interested in when implementing the scanner.

### Lexical grammar

In the lexical grammar (or token grammar) we ignore the syntax/structure of a program, and instead just look at the individual tokens. The lexical grammar will look similar to the above context-free-grammar, but with two additional conventions:
 - `"a" | ... | "z"` a range of  characters from a to z
 - `any` any character

```nohighlight
program      ::=  {skip | token}
token        ::=  keyword | operator | punctuation | name | literal
```
This means that, from the perspective of the lexical grammar, a program is a sequence
of tokens and skippable characters, and a token is either a keyword, an operator, a punctuation character, an identifier, or a literal. Things that are skipped are defined as:
```nohighlight
skip         ::=  {whitespace | comment}
whitespace   ::=  " " | "\t" | "\r" | "\n"
comment      ::=  "//" {any - "\n"}
               |  "/*" {any - "*/"} "*/"
```
Thus whitespace characters, such as spaces and newlines, between tokens, as well as C-style single- and multiline comments, are ignored.
```nohighlight
keyword      ::=  "let" | "in" | "if" | "then" | "else"
operator     ::=  "->" | "==" | "!=" | "\\" | "+" | "-"
               |  "/" | "*" | "="
punctuation  ::=  "(" | ")"
```
The above rules define the reserved keywords, operators and punctuation characters of PLDS.
```nohighlight
name         ::=  letter {letter | digit | "_"} - keyword
letter       ::=  "a" | ... | "z"
               |  "A" | ... | "Z"
digit        ::=  "0" | ... | "9"
```
The last two types of tokens are literals, and in PLDS there are two types of literals: strings and numbers:
```nohighlight
literal      ::=  number | string
number       ::=  digit {digit} ["." digit {digit}]
string       ::=  "\"" {char} "\""
char         ::=  any - ("\\" | "\"")
               |  "\\" any
```
One thing to note about this lexical grammar is that it is ambiguous, meaning that a string of input characters may be tokenized in more than one way. Consider for example the string "letabc15": Depending on how we look at it, we may interpret it as either three tokens (`let` (keyword), `abc` (name), and `15` (number)), two tokens (`let` (keyword) and `abc15` (name)), or one token (`letabc15` (name)). We'll therefore have to define an additional constraint to our lexical grammar:
Reading from left to right, we accept the **longest** possible token, meaning that the example "letabc15" would indeed result in only one token: `letabc15` (name).

## Setting up the Scala project

The easiest way to get [Scala](http://scala-lang.org) up and running is probably to install an IDE with Scala support. There are several options available, e.g. [Eclipse](http://scala-ide.org/), [IntelliJ IDEA](https://www.jetbrains.com/idea/features/scala.html), and [NetBeans](http://wiki.netbeans.org/Scala). As an alternative to a big IDE, you can also use your favourite text editor and run Scala from the command-line, see for instance [this guide](http://www.scala-lang.org/documentation/getting-started.html).

A quick way to get started is to use [SBT](http://www.scala-sbt.org/), a build tool for Scala and Java projects (both Eclipse and IDEA have support for SBT projects). On Linux you should be able to find SBT in your favourite package manager, while on Windows you can use the [installer](http://www.scala-sbt.org/0.13/tutorial/Installing-sbt-on-Windows.html). To create a new project using SBT: In an empty directory create a file named `build.sbt` with the following content (note: the blank lines are required):
```Scala
name := "plds"

version := "1.0"

scalaVersion := "2.11.6"

libraryDependencies += "org.scala-lang.modules" %% "scala-parser-combinators" % "1.0.3"
```
Then run the command `sbt` in the same directory. After running SBT the message `[info] Set current project to plds` should appear followed by a `>` prompt. Type `update` and press enter. This will download the correct version of Scala and the parser combinators library.

SBT will look for Scala source files in both the root of the project directory, and in the `src/main/scala` directory tree. For small projects you could probably just drop your source files in the root, but to keep things clean let's create the directory `src/main/scala` for our Scala source code. For now we'll only create one file called `scan.scala`, which will contain our scanner plus some additional classes. At the top of the file you can specify the name of the package following the usual Scala/Java naming conventions (i.e. reverse vendor domain followed by project name followed by optional subpackages):
```scala
package dk.nielssp.plds
```
We'll also need to import a number of classes:
```scala
import scala.util.parsing.combinator.RegexParsers
import scala.util.parsing.input.{Position, Positional}
import scala.collection.immutable.HashSet
import scala.io.StdIn
```

## Representing tokens

The output of our scanner will be a sequence of tokens, so before we continue, we will create a flat hierarchy of case classes to represent the different types of tokens in PLDS. In the file `scan.scala` add the following:
```scala
abstract sealed class Token extends Positional
case class StringToken(value: String) extends Token
case class NumberToken(value: Double) extends Token
case class NameToken(name: String) extends Token
case class KeywordToken(keyword: String) extends Token
case class PunctuationToken(punctuation: String) extends Token
case class OperatorToken(operator: String) extends Token
```
Case classes in Scala can be used similarly to tagged unions in other functional languages and being `sealed` means that the `Token` class can only be extended by other classes defined in the same file. Each token type includes a value-field as part of its constructor, meaning that for instance `NumberToken(3.5)` constructs a number token for the number 3.5. The `Positional` trait, which our `Token` class extends, is part of the parser combinators library and makes it possible to add positional information (line and column) to each token. This extra information makes error messages generated by the parser much more helpful to the programmer.

## Implementing the scanner

To implement the actual scanner we'll use the trait `RegexParsers`, which we imported from the parser combinators library earlier.

Traits in Scala are like interfaces in Java, but unlike interfaces, which only contain method signatures, traits can contain full method definitions. Thus the `RegexParsers` trait mentioned above contains a number of useful methods for implementing scanners and parsers. The parser combinators library contains other traits, such as the `JavaTokenParsers` trait specifically for parsing Java tokens, and the `Parsers` trait which `RegexParsers` is a subclass of. `RegexParsers` extends `Parsers` with additional support for parsing strings of characters and using regular expressions, which is perfect for implementing a scanner. To use the trait we will create an object called `scan`:
```scala
object scan extends RegexParsers {
  override def skipWhitespace = false
}
```
A singleton object in Scala is essentially a class with only one instance. We first override the method `skipWhitespace` with the value `false`, which means that the scanner won't automatically skip whitespace characters.

Next we'll be translating the lexical grammar into Scala code, and because we are using a parser combination library that allows us to combine parsers using familiar looking operators (such as `|`), this is an almost trivial task. In the following sections we'll use parser combinators to create methods for each of the rules in our lexical grammar, and each of those methods should be part of the `scan` object.

### Literals
Let's start from the bottom by parsing literals. For instance, here's a parser that parses string characters:
```scala
  def char: Parser[Char] = ("""[^"\\]""".r | '\\' ~> ".".r) ^^ { _.head }
```
The above code should look somewhat similar to the token grammar for the `char` token, but let's break it into smaller pieces to look at what's actually going on. The outermost operator is `^^` which is a combinator that takes the result of the parser on the left and applies a function to it. In the above example the result of the type of the parser on the left is `Parser[String]` and we apply the anonymous function `{ _.head }` to the result. If you are unfamiliar with Scala syntax, this may look a bit weird, but it is basically syntactical sugar for a lambda expression `(x => x.head)`. Thus the function returns the first character of the input string thereby converting the string parser on the left to a parser of type `Parser[Char]`.

In the parser on the left (`"""[^"\\]""".r | '\\' ~> ".".r`) the outermost operator is `|` since it has lower precedence than `~>`. `|` is the alternation combinator so it has the same basic meaning as `|` in the grammar, i.e. first try the parser on the left and if that fail try the parser on the right. The left side parser parses strings using a regular expression (a string is converted to a regular expression using the `.r`-method). The regular expression is automatically converted to a parser because we are using the `RegexParsers` trait. The `[^"\\]` expression matches any single character that isn't a double quotation mark or a backslash.

On the other side of the `|` combinator we have `'\\' ~> ".".r` which uses the `~>` combinator. `~>` is used for sequential composition of parsers (i.e. concatenation) but only keeps the result on the right, so the parser in question expects a backslash followed by any character (the `.` regular expression) but only outputs the second character.

To sum it all up we have a parser that parses any character except for double quotation marks and backslashes unless they are preceded by a backslash. We use this parser to parse strings:
```scala
  def string: Parser[Token] =
    "\"" ~> rep(char) <~ "\"" ^^ (chars => StringToken(chars.mkString))
```
In the above definition we see some familiar faces, namely `~>` and `^^`. The new operator `<~` is also a combinator for sequential composition, but unlike `~>` it keeps the result of the left side parser. The `rep` function is the combinator for repetition, so `rep(char)` accepts zero or more characters. Thus the string parser accepts a double quotation mark followed by zero or more characters followed by a double quotation mark, and it throws away the quotation marks. The result of the `rep` combination is of type `List[Char]` so we use the `^^` combinator to first create a string from the characters using `mkString`, then create the `StringToken` object with the resulting string.

Next we can parse number literals using a simple regular expression:
```scala
  def number: Parser[Token] =
    """\d+(\.\d+)?""".r ^^ (s => NumberToken(s.toDouble))
```
Here we convert the resulting string to a double using the `toDouble` method, before creating the number token.

### Operators, punctuation, names and keywords

Similarly operators and punctuation characters are parsed by regular expressions:
```scala
  def operator: Parser[Token] = """->|==|!=|\\|\+|-|/|\*|=""".r ^^ OperatorToken

  def punctuation: Parser[Token] = """\(|\)""".r ^^ OperatorToken
```
Since we don't need to do any additional modifications to the result of the regular expression we can simple use the name of the token class as the right side of the `^^` combinator in order to create the tokens.

For names and keyword we're gonna simplify the implementation a bit. Because a keyword consists of only letters, we can implement our `name`-parser such that it checks if the parsed name is a keyword. We do this by first defining a hash set of keywords in PLDS:
```scala
  val keywords = HashSet("let", "in", "if", "then", "else")

  def name: Parser[Token] = """[a-zA-Z][a-zA-Z0-9_]*""".r ^^ {
    case s if keywords.contains(s) => KeywordToken(s)
    case s => NameToken(s)
  }
```
This way we have also solved the ambiguity of parsing a string such as "letlet": Since the regular expression will match the entire string and "letlet" isn't part of the hash set, a `NameToken("letlet")` will be returned instead of two keywords.

### Comments and whitespace

The parsers for single line and multiline comments are implemented below:
```scala
  def singleComment: Parser[Unit] = "//" ~ rep(not("\n") ~ ".".r) ^^^ Unit

  def multiComment: Parser[Unit] = "/*" ~ rep(not("*/") ~ "(?s).".r) ~ "*/" ^^^ Unit
```
Here we introduce the `~`, `not`, and `^^^` combinators. The `not` combinator is used to negate the result of a parser while not consuming any input, e.g. `not("\n")` fails if the next character is a line break, but it does not consume that line break. The `^^^` is similar to the previously introduced `^^` combinator except that it doesn't care about the result of the parser on the left and merely replaces the output with the value on the right. In this case we don't care about the content of the comments so we return `Unit`, i.e. nothing or "void". The `~` is another combinator for sequential composition but, unlike the others, keeps the result on both the left side and the right side. In this case it doesn't make any difference since we replace the final result with `Unit`.

We combine the comment parsers with a whitespace parser to implement the `skip`-parser:
```scala
  def skip: Parser[Unit] = rep(whiteSpace | comment) ^^^ Unit

  def comment: Parser[Unit] = singleComment | multiComment
```
`whiteSpace` is a parser provided by `RegexParsers` that parses whitespace characters.

### Tokens and program structure

To parse a token we simply combine the token parsers we have previously implemented:
```scala
  def token: Parser[Token] =
    positioned(operator | punctuation | name | number | string)
```
We surround the entire thing with `positioned()` which inserts positional information in each token (this is why our `Token`-class uses the `Positional`-trait).

Recall that the scanner views the program as a sequence of tokens (and the token grammar defines a program as `{skip | token}`). There are however two issues we have to address when implementing this: First, we can't just do `rep(skip | token)` since `skip` and `token` are not of the same type (`skip` has type `Parser[Unit]` and `token` has type `Parser[Token]`). Instead we do `skip ~> rep(token <~ skip)` which essentially (because `skip` also accepts empty strings) does the same thing while returning a list of tokens. Second, the scanner must fail in a meaningful way if it encounters a character it doesn't understand. We implement this by adding an end-of-file parser with a custom failure message:
```scala
  def program: Parser[List[Token]] = skip ~> rep(token <~ skip) <~ eof

  def eof: Parser[String] = "\\z".r | failure("unexpected character")
```
`failure()` is a parser that always fails, so when combined with another parser using the `|` combinator, we can set a custom failure message for when the other parser fails. In this case we use the regular expression "\z" to match the end of the file. As a result the `program`-parser will fail if it encounters something that isn't a valid token, whitespace, comment or the end of the file.

### Applying he scanner

The final method of the scanner takes an input string and applies the `program`-parser to it:
```scala
  def apply(input: String): List[Token] = parseAll(program, input) match {
    case Success(result, _) => result
    case NoSuccess(msg, next) => throw SyntaxError(msg, next.pos)
  }
```
We use the `parseAll` function to apply the parser to the input, and then we use pattern matching on the result (of type `ParseResult[List[Token]]`). If the parser was successful we return the resulting list of tokens. Otherwise we throw the exception implemented below (place it somewhere outside of the `scan` object):
```scala
case class SyntaxError(msg: String, pos: Position) extends Exception(msg)
```
Aside from the error message it also includes the position of the next character, which is useful to a programmer trying to find an error among hundreds of lines of code.

The `apply`-method has special meaning in Scala in that it allows us to call the `scan`-object as if it was a function. For instance, in order to generate a list of tokens from the string `"let a = 42"` we simply call `scan("let a = 42")`.

## Testing it

To test our scanner we'll implement a simple RSPL (a read–scan–print loop, similar to an [REPL](http://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop)). It will accept lines of code from the standard input, apply the scanner, and then print the result list of tokens. Simply insert the following code at the bottom of `scan.scala`:
```scala
object rspl {
  def main(args: Array[String]) {
    while (true) {
      val input = StdIn.readLine("> ")
      try {
        if (input != null) {
          val tokens = scan(input)
          println(tokens)
        }
      }
      catch {
        case e: SyntaxError =>
          println(s"Syntax error: ${e.msg} on line ${e.pos.line}, column ${e.pos.column}")
          if (e.pos.line > 0) {
            println(input.lines.toList(e.pos.line - 1))
            println("-" * (e.pos.column - 1) + "^")
          }
      }
    }
  }
}
```
To run it simply type `run` in the SBT console (or right click on the `main` method and choose "Run" if you're using an IDE).

If everything went well, you should be presented with another `>` prompt in which you can type in lines of code for the scanner to scan:
```nohighlight
> let a = 42
List(KeywordToken(let), NameToken(a), OperatorToken(=), NumberToken(42.0))
```
We see that the scanner correctly identifies a keyword, a name, an operator, and a number. Since the scanner doesn't concern itself with the syntax, we can type in any combination of valid tokens:
```nohighlight
> letlet("string"3.0
List(NameToken(letlet), PunctuationToken((), StringToken(string), NumberToken(3.0))
```
Comments and whitespace are ignored and won't appear in the token list:
```nohighlight
> 24   + /* comment */ 12 // another comment
List(NumberToken(24.0), OperatorToken(+), NumberToken(12.0))
```
The scanner fails if it encounters unkown characters (outside of a string literal):
```nohighlight
> a + b ^ 2
Syntax error: unexpected character on line 1, column 7
a + b ^ 2
------^
```
It will also fail if we forget to end a string literal:
```nohighlight
> let s = "Hello, World!
Syntax error: `"' expected but end of source found on line 1, column 23
let s = "Hello, World!
----------------------^
```

## Conclusion

The scanner is the first step towards implementing a programming language. In fact, a scanner is (often) all you need if all you want to do is to implement simple syntax highlighting for a programming language.

Since the scanner is where we've implemented the token grammar of our programming language, it is also were the keywords, literals, special characters, etc. of the language are defined. Thus, if we later wish to for instance add a new keyword to the language, we'll have to modify the scanner. A possible improvement to the lexical grammar could be the addition of more numeric literals, such as hexadecimal literals (e.g. `0xF30A`) or optional exponents (e.g. `0.5e7`). Another possible improvement could be the addition of more escape sequences to string literals, such as `"\n"` for line breaks or `"\u00C6"` for Unicode characters.

Anyway, this is the end of part 1 of what will hopefully be a series on Programming Language Design in Scala (and perhaps it will branch off into other languages in the future). The post ended up being quite a bit longer that I had originally wanted, and I am not entirely sure whether I managed to make the topic easy to understand.

<!--{
  "published": "2015-07-29 10:06",
	"tags": ["scala", "language-design", "parsing", "plds", "compilers"]
}-->