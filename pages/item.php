<?php
  $item = $_GET['item'];
?>
<center style="height: 100%;">
  <div class="item-content">
    <a href="#"><img class="logo-big" src="ress/img/logo-big.png" alt="logo"></a><br>
    <img id="item-img"><br><span id="item-name"><div class="loader"></div><br><?=$item?></span><br>
    <span id="item-desc"></span>
    <div id="0-m" class="item-prices">
      <div class="loader"></div>
    </div>
    <a href="#" class="cta">
      <button type="button" class="btn btn-outline-primary how">How to update price</button>
    </a>
  </div>
</center>

<script type="text/javascript">
  loadPage('<?=$item?>')
</script>
