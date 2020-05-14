<?php
namespace Youtube;

use YouTube\YouTubeDownloader;

class Service
{

    public function download($url)
    {


        $service = self::service($url);
        $youtube = self::youtube($url);

        $title = $youtube['title'] . ".mp4";


        header("Cache-Control: public");
        header("Content-Description: File Transfer");
        header("Content-Disposition: attachment; filename=\"".$title."\"");
        header('Content-Type: application/force-download');
        header("Content-Transfer-Encoding: binary");
        header('Expires: 0');
        header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
        header('Pragma: public');
        ob_clean();
        flush();


        readfile($service);
        @unlink($service);
    }


    public function youtube($url)
    {
        $youtube = "http://www.youtube.com/oembed?url=". $url ."&format=json";
        $curl = curl_init($youtube);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $return = curl_exec($curl);
        curl_close($curl);
        $data = json_decode($return, true);
        return $data;
    }

    public function service($url)
    {
        $yt = new YouTubeDownloader();
        $links = $yt->getDownloadLinks($url);
        return $links[0]['url'];
    }









}