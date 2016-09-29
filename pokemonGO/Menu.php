
<?php  

class Menu {

	static $arrayItem = array( 
		0 => array("href" =>"index.php", "img" => "./img/logo1.png", "width" => 100, "height" => 60, "alt" => "Pokemon", 'path'=> './assets/index.html'),
		1 => array("href" => "index.php?page=1", "name" => "About", "style" => "bord", "id" => 1, 'path'=> './assets/about.html'),
		2 => array("href" => "index.php?page=2", "name" => "Start", "style" => "bord","id" => 2, 'path'=> './assets/start.html'),
		3 => array("href" => "index.php?page=3", "name" => "Top List", "style" => "bord", "id" => 3, 'path'=> './assets/topList.html')
		);
	
	public static function currentPage($numberPage) {

   		if($numberPage != 0)
   			Menu::$arrayItem[$numberPage]["style"] = "bordActiveLink";

    	echo'<ul class="hr"><center>';
		foreach (Menu::$arrayItem as $item ){
			if ($item[href] == "index.php")
				echo "<li><a href= $item[href]> <img src = $item[img] width = $item[width] height = $item[height] alt = $item[alt]></a></li>";
    		else 
    			echo "<li> <a class = $item[style] href= $item[href]> $item[name] </a> </li>";
		}
		echo'</center></ul>';
	}

	public static function getContent($numberPage){
		if ($numberPage>=1 && $numberPage <=3)
			echo file_get_contents(Menu::$arrayItem[$numberPage][path]);
		else 
			echo file_get_contents(Menu::$arrayItem[0][path]);
	}

}
?>
