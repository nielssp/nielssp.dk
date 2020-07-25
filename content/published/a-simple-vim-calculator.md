# A very simple calculator in Vim
Ever wanted a simple calculator within Vim? Since vimscript is already a fully featured programming language, you've already got it! For instance you can type `:echo 2 + 5` in normal mode and get the result 7. You can also enter Ex-mode by typing `Q` in normal mode. In Ex-mode you can type commands without first typing `:`, however you still have to type `echo` to print the result of expressions. When in insert mode you can also press `<c-r>=` (an equals sign should appear in the bottom left corner) followed by a vimscript expression. This inserts the result of the expression at the current cursor position.

To get a proper read–eval–print loop (REPL) for vimscript expressions, I've added the following function to my `.vimrc`:

```vim
function! Repl()
  while 1
    let expr = input('> ', '', 'expression')
    if expr == 'q' | break | endif
    if expr != ''
      echo "\n"
      if expr =~ '='
        execute 'let ' . expr
      else
        let ans = eval(expr)
        echo string(ans)
      endif
    endif
  endwhile
endfunction
nnoremap <leader>c :call Repl()<cr>
```

You start it by pressing `<leader>c` in normal mode (or `:call Repl()`). I use space as my leader (`let mapleader = " "`), so by pressing space followed by &ldquo;c&rdquo; a prompt displays at the bottom of the window. To exit the REPL, you type &ldquo;q&rdquo; and then press enter. Any expression you type while in the REPL is evaluated. The result of the expression is printed and saved in the `ans`-variable, so that it can be reused in the next expression.

```vim
> 25 - 5
20
> ans * 5 / 2
50
> ans / (2 + 3)
10
```

If the input contains an equals sign it is interpreted as a `let`-command. This can be used to easily define variables:

```vim
> a = 2
> b = 4
> c = pow(a, b)
> c
16.0
```

When Vim is compiled with floating point support (`:echo has('float')` returns `1`), you can also do floating point arithmetic.

```vim
> 3 / 2
1
> 3 / 2.0
1.5
```

The following mathematical functions are built into vimscript (when compiled with floating point support):

```vim
abs() trunc() floor() ceil() round() float2nr()
fmod() pow() sqrt() exp() log() log10()
sin() cos() tan() sinh() cosh() tanh()
asin() acos() atan() atan2()
```

That's about it. It's pretty simple, but it can be quite useful when you need to do a couple of calculations.

<!--{
  "published": "2016-11-25 23:59:54",
	"tags": ["vim"]
}-->