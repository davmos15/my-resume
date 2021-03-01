<?php

if (isset($_POST['submit']))    {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "nadav@digitalautopilot.com.au";
    $headers = "From: ".$mailfrom;
    $txt = "You've recieved an email from ".$name.".\n\n".$message;

    mail($mailTo, $txt, $headers);
    header("Location: https://nadavsresume.netlify.app/contact.html?mailsent");

}