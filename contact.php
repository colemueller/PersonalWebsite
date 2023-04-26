<?php

    $name = $_POST['d_name'];
    $email = $_POST['d_email'];
    $message = $_POST['d_msg'];
    
    $emailto = 'coleaaronmueller@gmail.com';
    $toname = 'Cole Mueller';
    
    $subject = 'cole-mueller.com contact form';
    
    $headers = 
        'Return-Path: ' . $email . "\r\n" . 
        'From: ' . $name . ' <' . $email . '>' . "\r\n" . 
        'X-Priority: 3' . "\r\n" . 
        'X-Mailer: PHP ' . phpversion() .  "\r\n" . 
        'Reply-To: ' . $name . ' <' . $email . '>' . "\r\n" .
        'MIME-Version: 1.0' . "\r\n" . 
        'Content-Transfer-Encoding: 8bit' . "\r\n" . 
        'Content-Type: text/plain; charset=UTF-8' . "\r\n";
    $params = '-f ' . $email;
    $test = mail($emailto, $subject, $message, $headers, $params);
    // $test should be TRUE if the mail function is called correctly
?>

