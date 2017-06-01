<?php    
 


    
    $PNG_TEMP_DIR = dirname(__FILE__).DIRECTORY_SEPARATOR.'temp'.DIRECTORY_SEPARATOR;
    
     
    $PNG_WEB_DIR = 'temp/';

    include "qrcode/qrlib.php";    
    
    //ofcourse we need rights to create temp dir
    if (!file_exists($PNG_TEMP_DIR))
        mkdir($PNG_TEMP_DIR);
    
    //processing form input
    //remember to sanitize user input in real-life solution !!!
    $errorCorrectionLevel = 'Q';
     
    $matrixPointSize = 10;
     

    if (isset($_REQUEST['data'])) { 
    
        //it's very important!
        if (trim($_REQUEST['data']) == '')
            die('data cannot be empty! <a href="?">back</a>');
            
        // user data
        $filename = $PNG_TEMP_DIR.'test'.md5($_REQUEST['data'].'|'.$errorCorrectionLevel.'|'.$matrixPointSize).'.png';
        QRcode::png($_REQUEST['data'], $filename, $errorCorrectionLevel, $matrixPointSize, 2);    
        
    }  
        
    //display generated file
    //echo '<img src="'.$PNG_WEB_DIR.basename($filename).'" />';  
    
// header('Access-Control-Allow-Methods:OPTIONS, GET, POST');
// header('Access-Control-Allow-Headers:x-requested-with');
// header('Access-Control-Max-Age:86400');  
// header('Access-Control-Allow-Origin:'.$_SERVER['HTTP_ORIGIN']);
// header('Access-Control-Allow-Credentials:true');
// header('Access-Control-Allow-Methods:GET, POST, PUT, DELETE, OPTIONS');
// header('Access-Control-Allow-Headers:x-requested-with,content-type');
// header('Access-Control-Allow-Headers:Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
 
 
 
    echo $PNG_WEB_DIR.basename($filename);



    // if (file_exists($filename)) {
    //     //sleep(20);
    //      unlink($filename);
    //      echo "已删除";
        
           
    // }
    
    // benchmark
  //  QRtools::timeBenchmark();    
?>
    