<template>
  <div class="flex justify-center items-center mt-4">
    <button
      class="step-btn"
      :disabled="disabled"
      @click="goToRoute(route)"
    >
      {{ text }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  route: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const goToRoute = (route: string) => {
  router.push({ path: route });
};

</script>

<style>
.step-btn {
  @apply text-xl cursor-pointer transition-all shadow-md bg-orange-400 text-orange-900 px-6 py-2 rounded-lg border-orange-500 border-b-[4px];
}

.step-btn:active:enabled {
  @apply brightness-90 translate-y-[2px]
}

.step-btn:disabled {
  @apply opacity-60 cursor-default;
}
</style>
