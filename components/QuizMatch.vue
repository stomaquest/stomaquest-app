<template>
  <div>
    <el-row v-if="!completed" class="grid gap-5 justify-center">
      <el-col v-for="(card, index) in allOptions" :key="index" class="" :span="11">
        <el-card body-class="" class="card__main text-xs md:text-base card__main h-full w-full flex items-center justify-center" :class="{'card__selected': selectedOptions.includes(card), 'card__correct': correctOptions.includes(card), 'card__incorrect': incorrectOptions.includes(card)}" @click="selectOption(card)">
          <p class="h-full line-clamp-6 text-justify">
            <img :src="getImage(card)" alt="">
            {{ card }}
          </p>
        </el-card>
      </el-col>
    </el-row>

    <p v-else class="text-xl">
      Parabéns, clique no botão abaixo para ir ao próximo quiz
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
const cards = computed(() => props.cards);
const randomCards = _.shuffle(cards.value).slice(0, 6);
const questions = randomCards.map((card) => card.question);
const answers = randomCards.map((card) => card.answer);

const allOptions = _.shuffle([...questions, ...answers]);

const selectedOptions = ref([]);
const correctOptions = ref([]);
const incorrectOptions = ref([]);
const completed: ComputedRef<boolean> = computed(() => correctOptions.value.length >= allOptions.length);

const getImage = (question: string) => {
  const card = randomCards.find((card) => card.question === question);
  return card?.image_url;
};

const checkAnswer = () => {
  const [option1, option2] = selectedOptions.value;
  const card = randomCards.find((card) => card.question === option1 || card.question === option2);
  if (card?.answer === option1 || card?.answer === option2) {
    correctOptions.value.push(...selectedOptions.value);
  } else {
    incorrectOptions.value.push(...selectedOptions.value);
  }
};

const selectOption = (option: string) => {
  incorrectOptions.value = [];
  if (selectedOptions.value.includes(option)) {
    selectedOptions.value = selectedOptions.value.filter((selectedOption) => selectedOption !== option);
    return;
  }
  selectedOptions.value.push(option);
  if (selectedOptions.value.length >= 2) {
    checkAnswer();
    selectedOptions.value = [];
  }
};

watch(() => correctOptions.value.length, () => {
  store.currentStepData.completed = completed.value;
});
</script>

<style lang="scss" scoped>
@keyframes colorChange {
  0% {
    background-color: #f1f1f1;
  }
  50% {
    background-color: #f09191;
    border: 1px solid #ff4255;
  }
  100% {
    background-color: #f1f1f1;
    border: 1px solid #f1f1f1;
  }
}

.card {

  &__main {
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    color: black;
    z-index: 1;
    position: relative;
    background-color: #fdba74;
  }

  &__selected {
    background-color: #edefff;
    border: 1px solid #4255ff;
  }

  &__main::before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.6;
  }

  &__main:hover {
    background-color: #fee2e2 ;
  }

  &__correct {
    background-color: #efffed;
    border: 1px solid #a8da5d;
    transform: scale(0.9);
    visibility: hidden;
  }

  &__incorrect {
    transition: all 0.3s ease-in-out;
    animation: colorChange .5s;
  }
}
</style>
