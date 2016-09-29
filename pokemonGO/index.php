<!DOCTYPE html >
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=windows-1251"/>
            <title> PokemonGo </title>
			<link rel="stylesheet" type="text/css" href="./css/styles.css">
        </head> 
        <body>
        <?php require ('Content.php'); echo Content::getCurrentPage($_GET['page']); echo Content::getCurrentPageContent($_GET['page']);?>
        </body>
    </html>