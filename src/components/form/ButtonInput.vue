<script setup lang="ts">
defineProps<{
  name: string,
  disabled?: boolean,
}>();
</script>

<template>
  <button type="submit" class="text-foreground font-semibold rounded-lg h-8" :disabled="disabled"
          :class="{'bg-secondary hover:cursor-not-allowed': disabled, 
          'bg-violet hover:bg-violet-dark hover:cursor-pointer': !disabled}">{{ name }}
  </button>
</template>