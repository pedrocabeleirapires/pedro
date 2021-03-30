<?php
$json = json_decode(file_get_contents('./menu.txt'),true);

$menu=$_GET["menu"];
$id=$_GET["id"];

$opcoes=$json[$menu];
foreach($opcoes as $x => $x_value) {
    $opcao = $x_value;
    if ($opcao["id"]==$id) {
	   $clicks = $opcao["clicks"]+1;
	   echo $clicks;
	   $json[$menu][$x]["clicks"]=$clicks;
	   file_put_contents('./menu.txt',json_encode($json,JSON_PRETTY_PRINT));
	}
}?>