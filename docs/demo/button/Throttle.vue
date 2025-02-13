<script setup>
function handleBtnClick() {
  console.log("button clicked");
}
</script>

<template>
  <p>
    <tk-button @click="handleBtnClick"> with throttle</tk-button>
    <tk-button :use-throttle="false" @click="handleBtnClick"
      >without throttle</tk-button
    >
  </p>
</template>