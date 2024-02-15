<template>
  <div>
    <el-button @click="$router.replace('quizlet')">
      Quizlet Padrão
    </el-button>
    <el-button v-for="(type, index) in quizTypes" :key="index" @click="quizType = type">
      {{ type }}
    </el-button>
    <el-row v-if="quizType === 'Match'" :gutter="0">
      <!-- <el-col class="card__col" :span="6">
        <el-card class="card__main h-[220px] w-[270px] flex items-center justify-center">
          <span>
            AAA
          </span>
        </el-card>
      </el-col>
      <el-col class="card__col" :span="6">
        <el-card class="card__main h-[220px] w-[270px] flex items-center justify-center">
          <span>
            AAA
          </span>
        </el-card>
      </el-col>
      <el-col class="card__col" :span="6">
        <el-card class="card__main h-[220px] w-[270px] flex items-center justify-center">
          <span>
            AAA
          </span>
        </el-card>
      </el-col> -->
      <el-col v-for="(card, index) in allOptions" :key="index" class="card__col  h-[150px] w-[100px]" :lg="5" :xs="5">
        <el-card class="card__main h-[95%] mr-3 my-6 flex items-center justify-center" :class="{'card__selected': selectedOptions.includes(card), 'card__correct': correctOptions.includes(card), 'card__incorrect': incorrectOptions.includes(card)}" @click="selectOption(card)">
          <span>
            {{ card }}
          </span>
        </el-card>
      </el-col>
    </el-row>

    <el-carousel v-if="quizType === 'Flashcards'" class="mt-8 flipcard__main" arrow="always" indicator-position="outside" trigger="click" :autoplay="false">
      <el-carousel-item v-for="(card, index) in cards" :key="index" class="bg-gray-50 flipcard__item" @click="card.flipped = !card.flipped">
        <span class="overflow-wrap text-5xl">
          {{ card.flipped ? card.answer : card.question }}
        </span>
      </el-carousel-item>
    </el-carousel>

    <div v-if="quizType === 'Learn'">
      TODO
    </div>
  </div>
</template>

<script lang="ts" setup>
import _ from 'lodash';

const quizTypes = ['Match', 'Flashcards', 'Learn'];
const quizType = ref('Match');

const cards = ref([
  { question: 'Q1', answer: 'R1', flipped: false },
  { question: 'Q2', answer: 'R2', flipped: false },
  { question: 'Q3', answer: 'R3', flipped: false },
  { question: 'Q4', answer: 'R4', flipped: false },
  { question: 'Q5', answer: 'R5', flipped: false },
  { question: 'Q6', answer: 'R6', flipped: false },
  { question: 'Q7', answer: 'R7', flipped: false },
  { question: 'Q8', answer: 'R8', flipped: false },
  { question: 'Q9', answer: 'R9', flipped: false },
  { question: 'Q10', answer: 'R10', flipped: false },
]);

const randomCards = _.shuffle(cards.value).slice(0, 6);
const questions = randomCards.map((card) => card.question);
const answers = randomCards.map((card) => card.answer);

const allOptions = _.shuffle([...questions, ...answers]);

// Match
const selectedOptions = ref([]);
const correctOptions = ref([]);
const incorrectOptions = ref([]);

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

// Flashcards
const activeIndex = ref(0);
</script>

<style lang="scss">
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
  }

  &__selected {
    background-color: #edefff;
    border: 1px solid #4255ff;
  }

  &__main:hover {
    background-color: #f1f1f1;
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
.flipcard {
  &__item {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}
</style>
