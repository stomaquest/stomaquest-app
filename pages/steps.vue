<template>
  <div class="main">
    <el-card class="card__main">
      <template #header>
        <p class="text-xl text-center">
          Escolha o tema do quiz
        </p>
      </template>

      <el-row class="grid gap-5 justify-center mb-10">
        <el-col v-for="(step, index) in steps" :key="index" class="" :span="11">
          <el-card class="el-card__main h-[30vh] text-base md:text-lg flex items-center justify-center" :class="{'step-completed opacity-60': step.completed}" @click="goToStep(index)">
            <p class="md:text-2xl text-balance line-clamp-[8]">
              {{ step.title }}
            </p>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { useQuizStore } from '@/stores/quiz';

const router = useRouter();
const store = useQuizStore();
const steps = computed(() => store.quiz.steps);

const goToStep = (stepNumber: number) => {
  store.setStep(stepNumber);
  const route = store.stepType;
  router.push({ name: route });
};
</script>

<style lang="scss" scoped>
.el-card {
    &__main {
        border-radius: 10px;
        cursor: pointer;
        background-color: #fdba74;
    }
    &__main:hover {
        background-color: #fee2e2 ;
    }
}

.step-completed {
    @apply border-lime-500
}
</style>
