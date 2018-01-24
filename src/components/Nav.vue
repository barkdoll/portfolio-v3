<template>
<nav class="sidebar">
  <div class="logo-wrap">
    <!-- <router-link href="top">
      <img class="nav-img" src="img/logo.png" alt="logo" />
    </router-link> -->
  </div>
  <ul class="nav-menu">
    <li v-for="link in links" :key="link.name">
      <router-link :to="{ path: link.path }">
        {{ link.name }}</router-link>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  name: 'Nav',
  data: {
      links: [
        { name: 'About', path: '/about' },
        { name: 'Now', path: '/now' },
        { name: 'Portfolio', path: '/portfolio' },
        { name: 'Contact', path: '/contact' },
      ],
    },
};
</script>
