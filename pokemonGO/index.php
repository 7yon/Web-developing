<!DOCTYPE html >
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
            <title> PokemonGo </title>
			<link rel="stylesheet" type="text/css" href="./css/styles.css">
        </head> 
        <body>
        <?php require ('Menu.php'); require('Content.php'); Menu::currentPage($_GET['page']); Menu::getContent($_GET['page']);?>
        </body>
    </html>