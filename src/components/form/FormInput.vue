<script setup lang="ts">
import {useField} from "vee-validate";

const props = defineProps<{
  name: string,
  placeholder?: string,
  title?: string,
  type?: string
  error?: string,
}>();

const {value, errorMessage, meta} = useField(() => props.name);

</script>
<template>
  <div class="flex flex-col gap-1">
    <div class="flex flex-row justify-between">
      <label v-if="title" class="text-foreground font-bold">{{ title }}</label>
      <Transition name="bounce">
        <svg width="18" height="18" viewBox="0 0 20 20" v-if="errorMessage">
          <path class="fill-error-light"
                fill-rule="evenodd" d="M2 10a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm12 1V9H6v2h8z"
                clip-rule="evenodd"></path>
        </svg>
      </Transition>
      <svg v-if="!errorMessage && meta.dirty" class="fill-cyan" width="18" height="18" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3 5 1.5 1.5L9 14l-3.5-3.5L7 9l2 2 4-4z"
              clip-rule="evenodd"></path>
      </svg>
    </div>
    <input autocomplete="on" :name="name" :placeholder="placeholder" :type="type" v-model="value"
           class="bg-background text-foreground px-3 py-1 border-solid 
           border-accents-3 border-[3px] rounded"
           :class="{'border-error-dark outline-none': errorMessage, 'no-error': !errorMessage }">
    <Transition name="bounce">

      <div class="text-xs text-red-light" v-if="errorMessage">* {{ errorMessage }}</div>
    </Transition>
  </div>
</template>

<style>
.no-error:focus {
  outline: none !important;
  border-color: var(--violetLight);
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>