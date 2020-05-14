<?php
require __DIR__.'/vendor/autoload.php';

use Youtube\Service;

$url = "https://www.youtube.com/watch?v=OWl9p3oFKgg";

$youtube = new Service();

$download = $youtube->download($url);










