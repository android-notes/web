<?php


$dataStr = urldecode($_SERVER["QUERY_STRING"]);
 
// $dataStr='{"url":"https://dm-81.data.aliyun.com/rest/160601/ip/getIpInfo.json","params":{"ip":"210.75.225.254"},"headers":{"Authorization":"APPCODE 28fd65e9aacc4a9eacfbc90f76ea1660"}}';
$data=json_decode($dataStr);



$url=$data->{'url'};
$params=$data->{'params'};

if($params){
    $url.="?";
    foreach ($params as $key => $value) {
        $url.=$key.'='.$value.'&';
    }
}


$headers= $data->{'headers'};
$headersList=array("User-Agent:Apache-HttpClient/4.1.2 (java 1.6)","Accept:application/json","Content-Type:application/json; charset=utf-8");
if($headers){
    foreach ($headers as $key => $value) {
       array_push( $headersList,$key.": ".$value);
    }
}

$ch = curl_init();
 curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headersList);  //设置头信息的地方
curl_setopt($ch, CURLOPT_FAILONERROR, false);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HEADER, false);    //不取得返回头信息


if (1 == strpos("$".$url, "https://"))
    {
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    }

$result = curl_exec($ch);





// header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
// header('Access-Control-Allow-Headers:x-requested-with');
// header('Access-Control-Max-Age:86400');  
// header('Access-Control-Allow-Origin:'.$_SERVER['HTTP_ORIGIN']);
// header('Access-Control-Allow-Credentials:true');
// header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers:x-requested-with,content-type');
// header('Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
 
 

print_r($result);
 



?>