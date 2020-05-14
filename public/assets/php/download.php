<?php
require "../../../vendor/autoload.php";

use Youtube\Service;

$url = $_GET['url_video'];

$youtube = new Service();

$download = $youtube->download($url);


