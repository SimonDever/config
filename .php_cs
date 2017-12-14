<?php

$finder = PhpCsFixer\Finder::create()
	->in(__DIR__);

return PhpCsFixer\Config::create()
	->setIndent("\t")
	->setLineEnding("\n")
	->setUsingCache(false)
	->setRules([
		'array_syntax' => ['syntax' => 'short'],
		'full_opening_tag' => false,
	])
	->setFinder($finder);

?>