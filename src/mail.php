<?php

use PHPMailer\PHPMailer\PHPMailer;
require '../phpmailer/src/PHPMailer.php';
require '../phpmailer/src/Exception.php';
require '../phpmailer/src/SMTP.php';
require '../phpmailer/Config.php';

if (isset($_POST['json'])) {
  $data = json_decode($_POST['json']);

  // reCaptcha verification
  $base_url = 'https://www.google.com/recaptcha/api/siteverify';
  $secret_key = Config::RECAP_SECRET;
  $response_key = $data->{'g-recaptcha-response'};
  $user_IP = $_SERVER['REMOTE_ADDR'];
  // URL that verifies captcha response
  $url = $base_url."?secret=".$secret_key."&response=".$response_key."&remoteip=".$user_IP;

  $captcha_response = file_get_contents($url);
  $captcha_response = json_decode($captcha_response);


  if ($captcha_response->success) {
    // Setting up vars

    if ($data->subject == '') {
      $data->subject = 'Contact Form (jessebarkdoll.com)';
    }

    // PHPMailer Configuration
    $mail = new PHPMailer;
    $mail->isSMTP(true);

    // This is the code solution I needed because of an
    // error regarding stream_socket_enable_crypto() ???
    $mail->SMTPOptions = array(
      'ssl' => array(
          'verify_peer' => false,
          'verify_peer_name' => false,
          'allow_self_signed' => true
      )
    );

    // To view error output logs for debugging
    // $mail->SMTPDebug = 4;

    $mail->Host = Config::SMTP_HOST;
    $mail->SMTPSecure = 'ssl';
    $mail->Port = Config::SMTP_PORT;
    $mail->SMTPAuth = true;
    $mail->Username = Config::SMTP_USER;
    $mail->Password = Config::SMTP_PASS;
    $mail->CharSet = 'UTF-8';

    // Send an email
    $mail->setFrom(Config::SMTP_USER, $data->name);
    $mail->addAddress(Config::SMTP_USER);

    $mail->isHTML(true);
    $mail->Subject = $data->subject . ' – ' . $data->name;
    $mail->Body = '<h2 style="margin:5px 0 0"><span style="font-weight:normal">送信者： </span>' . $data->name . '</h2><h2 style="margin:5px 0 0"><span style="font-weight:normal">メール： </span>' . $data->email . '</h2><pre  style="font-family:\'Noto Sans\',\'Noto Sans CJK JP\',\'Helvetica\',\'Arial\',\'Meiryo\',sans-serif;font-size:15px">' . $data->message . '</pre>';
    $mail->AltBody = <<<EOT
送信者: {$data->name}
メール: {$data->email}
メッセージ: {$data->message}
EOT;

    //Send the message, check for errors
    if ($mail->send()) {
      $feedback = 'Your message was sent!';
    } else {
      // The reason for failing to send will be in $mail->ErrorInfo
      // but you shouldn't display errors to users.
      // Process the error and log it on your server instead.
      $feedback = '<span style="color:red">Sorry, something went wrong. Please try again later.</span>';

      // For debugging:
      // echo $mail->ErrorInfo;
    }
  } else {
    $feedback = '<span style="color:red">Captcha failed. Please try again.</span>';
  }

  echo $feedback;

} // if isset($_POST)
else {
  echo 'Something\'s not right! Send a tweet to @JesseBarkdoll and let him know his site needs some oil!';
} // if isset($_POST)
?>
