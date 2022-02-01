
<?php
  // $host  = $_SERVER['HTTP_HOST'];
  // if ($host == "xillal.com") header('Location: https://www.albion-price.com/');
  // if (isset($_GET['lang'])) {
  //   setcookie("albionprice-lang", $_GET['lang'], time()+7*24*60*60, "/");
  //   header('Location: https://www.albion-price.com/');
  // }
  $lang = isset($_COOKIE['albionprice-lang']) ? $_COOKIE['albionprice-lang'] : 'EN-US';
  $page = "home";
  $title = "Index - Albion Price";
  if ($_GET["page"] == "item") {
    $page = "item";
    $title = "Wiew - Albion Price";
  }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title><?=$title?></title>
    <base href="/ao/">

    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name= "description" content="Albion price is a website showing the prices of items and resources in different cities around the world from Albion Online."/>

    <link rel="icon" href="ress/img/albiononline.png" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css">
    <link rel="stylesheet" href="ress/style.css">
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap" rel="stylesheet">

    <script src="https://kit.fontawesome.com/3437891f8d.js" crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"></script>
    <script src="ress/jquery-3.5.1.min.js"></script>
    <script src="ress/js.js"></script>
    <script type="text/javascript">var lang = '<?=$lang?>'</script>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-155244927-2"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'UA-155244927-2');
    </script>
  </head>
  <body>
    <?php
      if (false && !isset($_COOKIE['albionprice-lang']) || isset($_GET['changelang'])) {
        ?>
        <div class="walper">
          <div class="select-lang">
            <h1>Select Language</h1>
            <a href="?lang=EN-US"><img src="ress/img/en.png"> EN-US</a><br>
            <a href="?lang=DE-DE"><img src="ress/img/de.png"> DE-DE</a><br>
            <a href="?lang=FR-FR"><img src="ress/img/fr.png"> FR-FR</a><br>
            <a href="?lang=RU-RU"><img src="ress/img/russia.png"> RU-RU</a><br>
            <a href="?lang=PL-PL"><img src="ress/img/pl.png"> PL-PL</a><br>
            <a href="?lang=ES-ES"><img src="ress/img/spain.png"> ES-ES</a><br>
            <a href="?lang=PT-BR"><img src="ress/img/brazil.png"> PT-BR</a><br>
            <a href="?lang=ZH-CN">󠁨󠁺<img src="ress/img/china.png">󠁨󠁿 ZH-CN</a><br>
            <a href="?lang=KO-KR"><img src="ress/img/kr.png">󠁯󠁿 KO-KR</a><br>
          </div>
        </div>
        <?php
      }
    ?>
    <?php
      if ($page == 'item') include 'pages/item.php';
      else include 'pages/home.php'
    ?>
  </body>
</html>
