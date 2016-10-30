<?php
/* 
 * BlogSTEP 
 * Copyright (c) 2016 Niels Sonnich Poulsen (http://nielssp.dk)
 * Licensed under the MIT license.
 * See the LICENSE file or http://opensource.org/licenses/MIT for more information.
 */

use Blogstep\Build\ContentNode;
use Blogstep\Build\View;
use SimpleHtmlDom\simple_html_dom;

$assets = [
    'main' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js',
    'style' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/%s.min.css',
    'lang' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/languages/%s.min.js',
];

return function (View $view, ContentNode $contentNode, simple_html_dom $dom, $style = 'default') use ($assets) {
    $codeBlocks = $dom->find('pre code[class]');
    $languages = [];
    foreach ($codeBlocks as $codeBlock) {
        $language = preg_replace('/^lang(?:uage)?-/', '', strtolower($codeBlock->class));
        if ($language !== 'nohighlight') {
            $languages[$language] = true;
        }
    }
    if (count($languages)) {
        if ($view->blocks->isEmpty('highlightjs')) {
            $view->blocks->append('highlightjs', '<script type="text/javascript" src="' . $assets['main'] . '"></script>');
            $view->blocks->append('highlightjs', '<style type="text/css">@import "' . sprintf($assets['style'], $style) . '";</style>');
            $view->blocks->append('highlightjs', '<script>hljs.initHighlightingOnLoad();</script>');
        }
        foreach (array_keys($languages) as $language) {
            $view->blocks->append('highlightjs', '<script type="text/javascript" src="' . sprintf($assets['lang'], $language) . '"></script>');
        }
    }
};