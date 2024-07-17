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

      <QuizFlipcard :key="store.currentStep" :cards="cards" class="ml-4 " />

      <p class="mb-4 text-lg">
        Clique nas setas para navegar entre as perguntas
      </p>
      <p class="text-lg">
        Clique no cartão para revelar ou esconder a reposta
      </p>

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

<style>
.el-card__header {
  border-bottom: none;
}
</style>
