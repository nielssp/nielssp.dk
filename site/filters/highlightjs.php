<?php
/* 
 * BlogSTEP 
 * Copyright (c) 2016 Niels Sonnich Poulsen (http://nielssp.dk)
 * Licensed under the MIT license.
 * See the LICENSE file or http://opensource.org/licenses/MIT for more information.
 */

use Blogstep\Compile\ContentCompiler;
use Blogstep\Compile\TemplateCompiler;
use Blogstep\Compile\Tsc\StringVal;
use Blogstep\Compile\Tsc\ObjectVal;
use Blogstep\Compile\Tsc\TrueVal;
use Blogstep\Compile\Filter;
use Blogstep\Files\File;
use Jivoo\Store\Document;

$assets = [
    'main' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/highlight.min.js',
    'style' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/styles/%s.min.css',
    'lang' => '//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.7.0/languages/%s.min.js',
];

$filter = new Filter();

$filter->html = function (ContentCompiler $cc, File $file, Document $metadata, \simple_html_dom $dom) {
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

$filter['highlightjs'] = function (TemplateCompiler $tc, $attr, $enabled, $style = 'default') use ($assets) {
    if ($enabled) {
        $languages = explode(',', $attr['languages']);
        if ($tc->getEnv()->get('HIGHLIGHTJS') === null) {
            $block = '<script type="text/javascript" src="' . $assets['main'] . '"></script>';
            $block .= '<style type="text/css">@import "' . sprintf($assets['style'], $style) . '";</style>';
            $block .= '<script>hljs.initHighlightingOnLoad();</script>';
        } else {
            $block = $tc->getEnv()->get('HIGHLIGHTJS')->toString();
        }
        if ($tc->getEnv()->get('HIGHLIGHTJS_LANGS') === null) {
            $tc->getEnv()->let('HIGHLIGHTJS_LANGS', new ObjectVal([]));
        }
        $existing = $tc->getEnv()->get('HIGHLIGHTJS_LANGS');
        foreach ($languages as $language) {
            if (!$existing->has($language)) {
                $block .= '<script type="text/javascript" src="' . sprintf($assets['lang'], $language) . '"></script>';
                $existing->set($language, TrueVal::true());
            }
        }
        $tc->getEnv()->set('HIGHLIGHTJS', new StringVal($block));
    }
    return '';
};

return $filter;
