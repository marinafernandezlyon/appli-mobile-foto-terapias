<?php
define('_MAILCHIMP_APIKEY','ba7a2f8f9dc267557de6a3fb241471c9-us3');
define('_MAILCHIMP_LISTID','b9c0fde42d');
define('_EMAIL','your@email.com');
if( isset( $_SERVER['HTTP_X_REQUESTED_WITH'] ) && ( $_SERVER['HTTP_X_REQUESTED_WITH'] == 'XMLHttpRequest' ) )
{
$result = false;
	if (isset($_REQUEST['action']))
	{
		if ($_REQUEST['action']=="subscription_signup")
		{
			if (isset($_REQUEST['email'])) $mail = $_REQUEST['email'];
			if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) print('Error: Invalid Email Address');
			else
			{
			if ($_REQUEST['mode']=='mailchimp'||$_REQUEST['mode']=='mixed')
			{
				require_once('MailChimp.php');
			$MailChimp = new MailChimp(_MAILCHIMP_APIKEY);
			if ($_REQUEST['mailchimp_listid']!=false) $mlid = _MAILCHIMP_LISTID;
			else $mlid = $_REQUEST['mailchimp_listid'];
			if (!empty($_REQUEST['customfieldsarray']))
			{
				foreach($_REQUEST['customfieldsarray'] as $cfa)
				{
					$mv[$cfa] = $_REQUEST[$cfa];
					$customfields .='
'.$cfa.': '.$_REQUEST[$cfa]; 
				}
			}
			$result = $MailChimp->call('lists/subscribe', array(
                'id'                => $mlid,
                'email'             => array('email'=>$_REQUEST['email']),
                'merge_vars'        => $mv,
                'double_optin'      => $_REQUEST['double_optin'],
                'update_existing'   => $_REQUEST['update_existing'],
                'replace_interests' => $_REQUEST['replace_interests'],
                'send_welcome'      => $_REQUEST['send_welcome'],
            ));
				if ($result['leid']>0) $result = true;
				else $result = false;
			}
			if ($_REQUEST['mode']=='mail'||$_REQUEST['mode']=='mixed')
			{
				if (!filter_var(_EMAIL)) {print('Error: Invalid Recipient Email');die();}
				$body = "You've got a new signup on the http://".$_SERVER['HTTP_HOST'].str_replace('/php/handler.php','',$_SERVER['HTTP_REFERRER'])." website with the following mail address: ".$mail.$customfields."
				
				";
				$from_a = 'noreply@'.str_replace("www.","",$_SERVER['HTTP_HOST']);
				$from_name = 'Simple Signup Form';
				$header = 'MIME-Version: 1.0' . '\r\n';
				$header .= 'From: "'.$from_name.'" <'.$from_a.'>\r\n';
				$header .= 'Content-type: text/plain; charset=UTF-8' . '\r\n';
				if (mail(_EMAIL, 'Subscription Signup', $body, $header, "-f".$from_a)) $result = true;
				else $result = false;
			}
			if ($result==true) print("success");
			else print("Error: Mail Sending Failure");
			}
		}
	}
}
?>