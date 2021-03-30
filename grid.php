<?php
	$json = json_decode(file_get_contents('./menu.txt'),true);
	$rows = array();
	foreach($json as $x => $x_value) {
		foreach($x_value as $x1 => $x1_value) {
			array_push($rows, array("menu"=>$x, "id"=>$x1_value["id"],"opcao"=>$x1_value["opcao"],"clicks"=>$x1_value["clicks"]) );
		}
	} 
	$data = array("current"=>1,"rowCount"=>count($rows),"rows"=>$rows,"total"=>count($rows));
	echo json_encode($data,JSON_PRETTY_PRINT); 
?>