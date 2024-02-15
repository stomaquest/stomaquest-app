<template>
  <div>
    <div>
      <el-button @click="$router.replace('/custom')">
        Customizado
      </el-button>
      <el-button v-for="(type, index) in quizTypes" :key="index" @click="quizType = type.toLowerCase()">
        {{ type }}
      </el-button>
    </div>
    <div class="mt-4 h-[80vh] w-[75vw] ">
      <iframe :src="quizletUrl" height="100%" width="100%" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const quizTypes = ['Match', 'Flashcards', 'Learn'];
const quizType = ref('match');
const quizletUrl = computed(() => `https://quizlet.com/855474403/${quizType.value}/embed?i=5ifw7i&x=1jj1`);

</script>
