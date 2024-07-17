<template>
  <div class="main">
    <el-card class="card__main">
      <p class="mb-10 text-xl text-center">
        Olá, seja bem vindo ao jogo <b>{{ gameName }}</b>
      </p>
      <div v-for="(line, idx) in description" :key="idx" class="mb-4 text-lg text-justify">
        {{ line }}
      </div>
      <p class="mt-20 mb-10 text-xl text-center">
        Clique em “Iniciar” para iniciar essa experiência.
      </p>

      <StepButton route="steps" text="Iniciar" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz';

const store = useQuizStore();
await store.fetchQuiz();

const gameName = computed(() => store.quiz?.name);
const description = computed(() => store.quiz?.description?.split('\n'));

</script>

<style lang="scss">

</style>
