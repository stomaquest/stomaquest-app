<template>
  <div class="common-layout bg-slate-100 flex justify-center items-center flex-col">
    <el-container>
      <el-main class="">
        <slot />
      </el-main>
      <el-footer />
    </el-container>
  </div>
</template>

<script lang="ts" setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
    font-family: 'Poppins', sans-serif;
}
.common-layout {
    min-height: 100vh;
    min-width: 100vw;
    margin: 0;
    padding: 0;
}
</style>
