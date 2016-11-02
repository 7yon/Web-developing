
<?php  

class Content {

	static $arrayItemMenu = array(
		1 => array("href" => "index.php?page=1", "name" => "About", 'path'=> './assets/about.html'),
		2 => array("href" => "index.php?page=2", "name" => "Start", 'path'=> './assets/start.html'),
		3 => array("href" => "index.php?page=3", "name" => "Top List", 'path'=> './assets/topList.html')
		);


	public static function getCurrentPage($numberPage) {
 
 		$logo =  '<a href= ' . '"index.php">' . "<img src =" . '"./img/logo1.png"' . "alt =" .  "Pokemon " . "class = " . '"logoMenu">';
		$currentPage = '<ul class="hr"><center>' . '<li>'. $logo . '</a></li>';

		foreach (self::$arrayItemMenu as  $key => $value){
    		if($key == $numberPage)
    			$currentPage = $currentPage . "<li> <a class = ". '"bordActiveLink"' . " href= '$value[href]'> $value[name] </a> </li>";
    		else 
    			$currentPage = $currentPage . "<li> <a class = " . '"bord"' . " href= '$value[href]'> $value[name] </a> </li>";
		}

		$l=  array(' href' => 'index.php', 'img'=>'./img/logo1.png', 'alt' =>'Pokemon', 'class' =>'logoMenu');
		echo json_encode($l);

		return $currentPage = $currentPage . '</center></ul>';
	}

	public static function getCurrentPageContent($numberPage){

		if ($numberPage>=1 && $numberPage <=3)
			return file_get_contents(self::$arrayItemMenu[$numberPage][path]);
		else 
			return file_get_contents('./assets/index.html');
	}

}
?>
