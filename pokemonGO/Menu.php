
<?php  
echo  "<link rel='stylesheet' type='text/css' href='./css/styles.css'>";

class Menu {	
static $arrayItem = array( 
		0 => array("href" =>"index.php", "img" => "./img/logo1.png", "width" => 100, "height" => 60, "alt" => "Pokemon"),
		1 => array("href" => "about.php", "name" => "About", "style" => "bord"),
		2 => array("href" => "start.php", "name" => "Start", "style" => "bord"),
		3 => array("href" => "topList.php", "name" => "Top List", "style" => "bord")
		);
	
public static function currentPage($numberPage) {
	
    if ($numberPage == 1)
    	Menu::$arrayItem[1]["style"] = "bordActiveLink";
    if ($numberPage == 2)
    	Menu::$arrayItem[2]["style"] = "bordActiveLink";
    if ($numberPage == 3)
    	Menu::$arrayItem[3]["style"] = "bordActiveLink";


    echo'<ul class="hr"><center>';
	foreach (Menu::$arrayItem as $item ){
		if ($item[href] == "index.php")
			echo "<li><a href= $item[href]> <img src = $item[img] width = $item[width] height = $item[height] alt = $item[alt]></a></li>";
    	else echo "<li> <a class = $item[style] href= $item[href]> $item[name] </a> </li>";
	}
	echo'</center></ul>';
}

}
?>
