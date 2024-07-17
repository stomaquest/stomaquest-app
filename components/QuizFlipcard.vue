<template>
  <div style="height: 60vh;">
    <el-carousel
      class="flipcard__main ml-5"
      arrow="always"
      indicator-position="outside"
      trigger="click"
      :autoplay="false"
      height="57vh"
    >
      <el-carousel-item v-for="(card, index) in cards" :key="index" class="bg-orange-200 flipcard__item" @click="card.flipped = !card.flipped">
        <div class="text-justify leading-7">
          {{ card.flipped ? card.answer : card.question }}
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts" setup>

type QuizCards = {
  question: string;
  answer: string;
  flipped: boolean;
};

defineProps({
  cards: {
    type: Array as () => Array<QuizCards>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.flipcard {
  &__main {
    width: 80vw;
    margin: 0;
    padding: 0;
  }

  &__item {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
}

</style>

<style>
.el-carousel__indicators--outside button {
  background-color:  #ea580c ;
}
</style>
