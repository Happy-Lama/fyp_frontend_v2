<template>
  <div id="loading">
    <img
      class="img"
      src="../assets/logo.png"
      alt="loading..."
      width="200"
    />
  </div>
</template>

<script setup>

</script>

<style>
#loading {
    position: absolute;
    z-index: 1000;
    background-color: white;
    height: 100vh;
    width: 100vw;
    text-align: center;
    line-height: 100vh;
}
.img {
    position: relative;
    margin: auto;
    margin-top: 20%;
    transition: all 500ms ease-in-out;
    opacity: 1; /* Initially hide the logo */
    animation: fadeInOut 2s ease-in-out infinite; /* Adjust timing as needed */
}

@keyframes fadeInOut {
    0%, 100% {
        opacity: 0; /* Fade out */
    }
    50% {
        opacity: 1; /* Fade in */
    }
}
</style>