<template>
  <div>
    <el-container class="bg-orange-500">
      <el-main class="common-layout">
        <slot />
      </el-main>
      <el-footer />
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz';

const store = useQuizStore();

const gameName = computed(() => store.quiz?.name);

useSeoMeta({
  title: gameName.value,
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');

* {
    font-family: 'Poppins', sans-serif;
    color: #1c1917;
}

.common-layout {
    min-height: 100vh;
    min-width: 100%;
    margin-top: 2%;
    padding: 0;
}

.main {
    margin: 2%;
    margin-top: 0;
}

.card {
    &__main {
        border-radius: 10px;
        height: 100%;
        cursor: auto;
        background-color: #FED7AA;
        padding: 0 2em
    }
}
</style>
