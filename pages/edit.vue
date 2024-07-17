<template>
  <div class="main">
    <el-card class="card__main">
      <StepButton route="/" text="Voltar ao inicio" class="back-btn mb-8" />

      <el-collapse v-model="activeItem" accordion>
        <el-collapse-item v-for="(step, sIdx) in steps" :key="sIdx" :name="sIdx" class="step-item__outer mb-2">
          <template #title>
            <el-input
              v-model="step.title"
              type="input"
              placeholder="Título do passo"
              style="width: 100%;"
              input-style="color: black; font-size: 1.25rem; border: none"
            />
            <el-button size="large" :icon="ElIconDeleteFilled" type="text" @click="removeStep(sIdx)" />
          </template>

          <div class="text-base ml-[12%] mb-5">
            <h3>
              Tipo de passo
            </h3>
            <el-select
              v-model="step.type"
              placeholder="Tipo de passo"
              size="large"
              style="width: 15em"
              class="step-item__input"
            >
              <el-option
                v-for="(type, tIdx) in stepTypes"
                :key="tIdx"
                :label="type.label"
                :value="type.value"
              />
            </el-select>
          </div>

          <div class="flex">
            <p class="text-base ml-[12%]">
              Pergunta
            </p>
            <p class="text-base ml-[31%]">
              Resposta
            </p>
          </div>
          <div v-for="(question, qIdx) in step.questions" :key="qIdx" class="step-item__inner flex justify-center items-center mt-2">
            <el-input
              v-model="question.question"
              type="textarea"
              placeholder="Digite a pergunta"
              style="width: 35%;"
              class="mr-2 w-1/3 step-item__input"
              rows="8"
              resize="none"
            />
            <el-input
              v-model="question.answer"
              style="width: 35%;"
              type="textarea"
              placeholder="Digite a resposta"
              class="w-1/3 step-item__input"
              rows="8"
              resize="none"
            />
            <el-button size="large" :icon="ElIconDeleteFilled" type="text" @click="removeQuestion(sIdx, qIdx)">
              Remover
            </el-button>
          </div>
          <el-button class="ml-[40%] mt-5" size="large" :icon="ElIconPlus" type="text" @click="addQuestion(sIdx)">
            Adicionar nova pergunta
          </el-button>
        </el-collapse-item>
      </el-collapse>
      <el-button class="ml-[40%] mt-5" size="large" :icon="ElIconPlus" type="text" @click="addStep">
        Adicionar novo passo
      </el-button>

      <el-button class="ml-[40%] mt-5" size="large" :icon="ElIconDocument" type="text" @click="saveChanges">
        Salvar alterações
      </el-button>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { useQuizStore } from '@/stores/quiz';

const store = useQuizStore();
await store.fetchQuiz();

const steps = computed(() => store.steps);
const activeItem = ref('1');
const stepTypes = [
  {
    label: 'Quiz',
    value: 'quiz',
  },
  {
    label: 'Combinar',
    value: 'match',
  },
  {
    label: 'Cartão',
    value: 'flip',
  },
];

const removeQuestion = (stepIndex: number, questionIndex: number) => {
  store.removeQuestion(stepIndex, questionIndex);
};

const addQuestion = (stepIndex: number) => {
  store.addQuestion(stepIndex);
};

const addStep = () => {
  store.addStep();
};

const removeStep = (stepIndex: number) => {
  store.removeStep(stepIndex);
};

const saveNotification = () => {
  ElNotification({
    message: 'Alterações salvas com sucesso',
    type: 'success',
    position: 'bottom-right',
  });
};
const saveChanges = async() => {
  await store.updateQuiz();
  saveNotification();
};

definePageMeta({
  middleware: ['auth-redirect'],
});
</script>

<style lang="scss">
.step-item  {
    &__outer {
      * {
        @apply  bg-orange-200;
      }
      @apply rounded-lg border-orange-500 border-b-[4px] shadow-md border-opacity-20 pl-3;
    }
    &__inner {
      @apply pl-2 text-base;
    }
    &__input > *{
      @apply text-black shadow-sm shadow-black text-base;
    }
}

.el-input__inner {
  @apply text-black;
}

.back-btn {
  @apply justify-start items-start;
}

</style>
