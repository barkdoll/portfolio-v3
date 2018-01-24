<template>
<nav class="sidebar">
  <div class="logo-wrap">
    <router-link href="top"><img class="nav-img" src="img/logo.png" alt="logo" /></router-link>
  </div>
  <ul class="nav-menu">
    <li><router-link :to="{ name: 'about' }">
      About</router-link></li>
    <li><router-link :to="{ name: 'now' }">
      Now</router-link></li>
    <li><router-link :to="{ name: 'portfolio' }">
      Portfolio</router-link></li>
    <li><router-link :to="{ name: 'contact' }">
      Contact</router-link></li>
  </ul>
</nav>
</template>
