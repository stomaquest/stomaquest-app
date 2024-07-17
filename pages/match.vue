<template>
  <div class="main">
    <el-card class="card__main" style="height: auto">
      <template #header>
        <p class="text-xl text-center">
          {{ store.stepTitle }}
        </p>
        <p v-if="store.stepSubtitle" class="text-lg text-center">
          {{ store.stepSubtitle }}
        </p>
      </template>

      <p class="mb-4 text-lg">
        Combine as complicações com suas descrições
      </p>

      <QuizMatch :key="store.currentStep" :cards="cards" />

      <StepButton route="steps" text="Voltar para a lista" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz';
const store = useQuizStore();
const cards = computed(() => store.currentStepData.questions);

</script>

<style lang="scss" scoped>

</style>
