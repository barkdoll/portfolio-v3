<template>
  <app-view>
    <app-sidebar>
      <app-nav></app-nav>
    </app-sidebar>
      <header id="banner"></header>
      <main id="am">
        <router-view />
      </main>
  </app-view>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
