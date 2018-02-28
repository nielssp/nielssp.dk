<?php
/* 
 * BlogSTEP 
 * Copyright (c) 2016 Niels Sonnich Poulsen (http://nielssp.dk)
 * Licensed under the MIT license.
 * See the LICENSE file or http://opensource.org/licenses/MIT for more information.
 */

use Blogstep\Compile\View;
use Blogstep\Compile\ContentCompiler;
use Blogstep\Compile\Filter;
use Blogstep\Files\File;
use SimpleHtmlDom\simple_html_dom;

$assets = [
    'main' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js',
    'style' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/%s.min.css',
    'lang' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/languages/%s.min.js',
];

$filter = new Filter();

$filter->html = function (ContentCompiler $cc, File $file, simple_html_dom $dom) {
    $codeBlocks = $dom->find('pre code[class]');
    $languages = [];
    foreach ($codeBlocks as $codeBlock) {
        $language = preg_replace('/^lang(?:uage)?-/', '', strtolower($codeBlock->class));
        if ($language !== 'nohighlight') {
            $languages[$language] = true;
        }
    }
    if (count($languages)) {
        $dom->root->nodes[] = $dom->createTextNode(ContentCompiler::displayTag('highlightjs', [
            'languages' => implode(',', array_keys($languages))
        ]));
    }
};

$filter['highlightjs'] = function (View $view, $attr, $enabled, $style = 'default') use ($assets) {
    if ($enabled) {
        $languages = explode(',', $attr['languages']);
        if ($view->blocks->isEmpty('highlightjs')) {
            $view->blocks->append('highlightjs', '<script type="text/javascript" src="' . $assets['main'] . '"></script>');
            $view->blocks->append('highlightjs', '<style type="text/css">@import "' . sprintf($assets['style'], $style) . '";</style>');
            $view->blocks->append('highlightjs', '<script>hljs.initHighlightingOnLoad();</script>');
        }
        if (!isset($view->data->highlightjsLangs)) {
            $view->data->highlightjsLangs = [];
        }
        foreach ($languages as $language) {
            if (!isset($view->data->highlightjsLangs[$language])) {
                $view->blocks->append('highlightjs', '<script type="text/javascript" src="' . sprintf($assets['lang'], $language) . '"></script>');
                $view->data->highlightjsLangs[$language] = true;
            }
        }
    }
    return '';
};

return $filter;