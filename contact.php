<?php

// an email address that will be in the From field of the email.
$from = 'Demo contact form <demo@domain.com>';

// an email address that will receive the email with the output of the form
$sendTo = 'Demo contact form <moskownadav@domain.com>';

// subject of the email
$subject = 'New message from contact form';

// form field names and their translations.
// array variable name => Text to appear in the email
$fields = array('name' => 'Name', 'message' => 'Message'); 

// message that will be displayed when everything is OK :)
$okMessage = 'Contact form successfully submitted. Thank you, I will get back to you soon!';

?>