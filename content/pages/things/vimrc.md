{
  tags: ['vim'],
}
# My minimal .vimrc
```vim
" https://nielssp.dk/dot/.vimrc
set nocompatible " disable Vi compatibility
set noswapfile autoread ttyfast visualbell " read file when changed, fast tty, visual bell
set switchbuf=useopen " use open buffer instead of duplicating
set autochdir " cd to dir of file in buffer
set hidden confirm " allow hiding unsaved buffers, confirm when deleting
set history=50 " command history
set mouse=a " enable mouse
set encoding=utf8
" fix scroll wheel
noremap <ScrollWheelUp> <C-Y>
noremap <ScrollWheelDown> <C-E>
" appearance
set background=dark t_Co=256
try " use solarized if it exists
  colorscheme solarized
  set cursorline
catch /^Vim\%((\a\+)\)\=:E185/
  colorscheme desert
endtry
set laststatus=2 " always show status line
set list number scrolloff=2 " visible white space, numbered lines and 2 lines above/below cursor
set listchars=tab:→\ ,trail:· " show tabs and trailing spaces
set wildchar=<tab> wildmenu wildmode=longest,list,full " auto complete menus
set wildcharm=<c-z> " like wildchar, but for use in macros
" status line
set statusline =%0*\[%n]                          " buffer no.
set statusline+=\ %<%F\                           " file path
set statusline+=\ %y\                             " file type
set statusline+=\ %{''.(&fenc!=''?&fenc:&enc).''} " encoding 1
set statusline+=\ %{(&bomb?\",BOM\":\"\")}\       " encoding 2
set statusline+=\ %{&ff}\                         " format
set statusline+=\ \[%{v:register}]\               " active reg
set statusline+=\ %=\ %l\ /\ %L\ (%3p%%)\         " line no. and pct
set statusline+=\ :%03v\                          " column no.
set statusline+=\ \ %m%r%w\ %P\ \                 " modified, ro, screen pos
" syntax highlight and indent
syntax on
filetype on
filetype plugin on
filetype indent on
set expandtab shiftwidth=2 softtabstop=2 tabstop=4 " default indent w/ 2 spaces
" writing
set textwidth=80
set formatoptions-=t " don't autowrap text
set formatoptions+=lcro " long lines, comment autowrap etc.
set whichwrap=b,s,<,>,[,]
set backspace=indent,eol,start " fix backspace
set cinoptions=l1 " fix c switch case block indentation
" searching
set ignorecase smartcase hlsearch incsearch " smart case, highlight, incremental
" gvim only
if has('gui_running')
  set guioptions=agiLt
  set lines=50 columns=120
  if has('gui_win32')
    set guifont=Consolas:h8:cANSI
  else
    set guifont=consolas\ 9
  endif
endif

" commands
let mapleader=" "
" remove highlights
nnoremap <leader><cr> :nohlsearch<cr>
" edit vimrc
nnoremap <leader>ev :edit $MYVIMRC<cr>
" source vimrc
nnoremap <leader>sv :source $MYVIMRC<cr>
" indent
vnoremap <tab> >gv
" unindent
vnoremap <s-tab> <gv
inoremap <s-tab> <c-o><<
" switch between buffers
noremap <f1> :bprev!<cr>
noremap <f2> :bnext!<cr>
nnoremap <leader>bb :b <c-z>
nnoremap <leader>bn :buffers<cr>:buffer<space>
nnoremap <leader>b! :buffers!<cr>:buffer<space>
nnoremap <leader><tab> :b!#<cr>
nnoremap <leader>bd :bdelete<cr>
" open files
nnoremap <leader>ff :Explore<cr>

" save as root
function! SudoW()
  write !sudo tee % >/dev/null
endfunction
command! SudoW :call SudoW()

" a simple vimscript REPL that can be used as a calculator
function! Repl()
  while 1
    let expr = input("> ", "", "expression")
    if expr == "q" | break | endif
    if expr != ""
      echo "\n"
      if expr =~ "="
        execute "let " . expr
      else
        let ans = eval(expr)
        echo string(ans)
      endif
    endif
  endwhile
endfunction
nnoremap <leader>c :call Repl()<cr>

" optional packages installed using vim-plug
" install vim-plug and packages with :Install
try
  call plug#begin('~/.vim/plugged')

  Plug 'kien/ctrlp.vim', { 'on': 'CtrlP' }
  nnoremap <c-p> :CtrlP<cr>

  Plug 'vimwiki/vimwiki'
  let g:vimwiki_list = [{
    \ 'ext': '.md',
    \ 'syntax': 'markdown'
    \ }]

  call plug#end()
catch
  function! Install()
    echom system("curl -fLo ~/.vim/autoload/plug.vim --create-dirs https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim")
    source $MYVIMRC
    PlugInstall
  endfunction
  command! Install :call Install()
endtry
```
