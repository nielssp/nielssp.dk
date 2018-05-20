<?php $this->layout('_layout.rss'); ?>
<?php foreach ($content->published->orderByDescending('published')->limit(30) as $post): ?>

    <item>
        <title><?php echo $post->title; ?></title>
        <description><![CDATA[
            <?php echo $this->filter($post, ['noTitle', 'brief', 'img(480, 360, 90, true)', 'linksAbsolute']); ?>

            <?php if ($post->hasBreak): ?>
                <p>
                    <a href="<?php echo $this->url($post); ?>">Continue reading&hellip;</a>
                </p>
            <?php endif; ?>
            ]]></description>
        <link><?php echo $this->url($post); ?></link>
        <pubDate><?php echo date('r', $post->published); ?></pubDate>
        <guid><?php echo $this->url($post); ?></guid>
    </item>

    <?php
    if (!isset($this->data->lastBuildDate)) {
        $this->data->lastBuildDate = $post->published;
    }
    ?>

<?php endforeach; ?>
