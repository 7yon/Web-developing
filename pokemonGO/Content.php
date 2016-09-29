
<?php  

class Content {

	static $arrayItem = array( 
		0 => array("href" =>"index.php", "img" => "./img/logo1.png", "width" => 100, "height" => 60, "alt" => "Pokemon", 'path'=> './assets/index.html'),
		1 => array("href" => "index.php?page=1", "name" => "About", "id" => 1, 'path'=> './assets/about.html'),
		2 => array("href" => "index.php?page=2", "name" => "Start", "id" => 2, 'path'=> './assets/start.html'),
		3 => array("href" => "index.php?page=3", "name" => "Top List", "id" => 3, 'path'=> './assets/topList.html')
		);
	
	public static function currentPage($numberPage) {

		$bord = "bord";
		$activeBord = "bordActiveLink";

    	echo'<ul class="hr"><center>';
		foreach (self::$arrayItem as $item ){
			if ($item[href] == "index.php")
				echo "<li><a href= 'item[href]'> <img src = '$item[img]' width = '$item[width]' height = '$item[height]' alt = '$item[alt]>'</a></li>";
    		else 
    			if($item[id] == $numberPage)
    				echo "<li> <a class = '$activeBord' href= '$item[href]'> $item[name] </a> </li>";
    			else echo "<li> <a class = '$bord' href= '$item[href]'> $item[name] </a> </li>";
		}
		echo'</center></ul>';
	}

	public static function getContent($numberPage){
		if ($numberPage>=1 && $numberPage <=3)
			echo file_get_contents(self::$arrayItem[$numberPage][path]);
		else 
			echo file_get_contents(self::$arrayItem[0][path]);
	}

}
?>
