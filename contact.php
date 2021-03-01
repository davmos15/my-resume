<?php
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $message = $_POST['message'];

    $email_from = 'Submission@NadavsResume.com';

    $email_subject = "New Form Submission";

    $email_body = "User Name: $name.\n".
                    "User Message: $message.\n";

    $to = "moskownadav@gmail.com";

    $headers = "From: $email_from \r\n";

    mail($to,$email_subject,$email_body,$headers);

    header("Location: contact.html")


?>