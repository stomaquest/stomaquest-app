<template>
  <div class="main">
    <el-card class="card__main">
      <template #header>
        <p class="text-xl text-center">
          {{ store.stepTitle }}
        </p>
        <p v-if="store.stepSubtitle" class="text-lg text-center">
          {{ store.stepSubtitle }}
        </p>
      </template>

      <QuizQuestions :key="store.currentStep" :cards="cards" class="ml-4" />

      <el-divider />
      <StepButton route="steps" text="Voltar para a lista" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz';

const store = useQuizStore();
const cards = ref(store.currentStepData.questions);
</script>

<style lang="scss" scoped>

</style>
