<!DOCTYPE html>
<html>
  <?php
  $page_title = 'Jesse Barkdoll';
  include 'templates/head.php'; ?>

<body>
<div id="top">
  <?php include 'templates/nav.htm'; ?>
  <section id="primary">
    <header id="banner"></header>
    <main>
      <?php
        include 'templates/about.htm';
        include 'templates/now.htm';
        include 'templates/portfolio.htm';
        include 'templates/contact.php';
      ?>
      <div class="top-btn">
        <a href="#primary">FROM THE TOP <i class="fa fa-arrow-up" aria-hidden="true"></i></a>
      </div>
    </main>

  </section> <!-- #primary -->
  <script
    src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
  <script src="js/script.min.js"></script>
</div> <!-- #top -->
</body>
</html>
