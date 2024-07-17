<template>
  <div>
    <div v-if="currentCard < cards.length">
      <p class="mb-16">
        <span class="font-bold">Q:</span> {{ cards[currentCard].question }}
      </p>

      <el-checkbox-group v-model="checkList">
        <el-checkbox
          v-for="(answer, index) in cardAnswers"
          :key="index"
          :label="answer"
          size="large"
          class="mb-5 -ml-4 checkbox__main"
          @change="selectOption(answer)"
        >
          <template #default>
            <p class="whitespace-normal text-base text-justify" :class="resultClass(answer)">
              {{ answer }}
            </p>
          </template>
        </el-checkbox>
      </el-checkbox-group>

      <button class="step-btn" :disabled="!answerStatus" @click="changeCard">
        Próxima pergunta
      </button>
    </div>
    <p v-else class="text-lg">
      Quiz finalizado!
    </p>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash';
import { useQuizStore } from '@/stores/quiz';
import type { Question } from '@/types';

const store = useQuizStore();

const props = defineProps({
  cards: {
    type: Array as () => Array<Question>,
    required: true,
  },
});

const currentCard = ref(0);
const checkList = ref([]);
const answerStatus = computed(() => props.cards[currentCard.value].answer === checkList.value[0]);

const cardAnswers = computed(() => {
  const currentCardAnswer = props.cards[currentCard.value].answer;
  const randomCards = _.shuffle(props.cards.filter((_, index) => index !== currentCard.value)).slice(0, 3);
  const answers = randomCards.map((card) => card.answer);
  answers.push(currentCardAnswer);
  return _.shuffle(answers);
});

const selectOption = (answer: string) => {
  checkList.value = [answer];
};

const isSelected = (answer: string) => checkList.value.includes(answer);

const resultClass = (answer: string) => {
  if (!isSelected(answer)) return '';
  if (answerStatus.value) return 'text-lime-500';
  return 'text-orange-700';
};

const changeCard = () => {
  currentCard.value += 1;
  checkList.value = [];
};

watch(() => currentCard.value, () => {
  if (currentCard.value >= props.cards.length) {
    store.currentStepData.completed = true;
  }
});
</script>

<style lang="scss" scoped>
.checkbox {
    &__main {
      height: auto;
    }
}

</style>

<style lang="scss">
.el-checkbox__input {
  transform: scale(1.5);
  margin-right: 0.75rem;
}
</style>
