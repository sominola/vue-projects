<script setup lang="ts">
defineProps<{
    title: string,
    link: string,
}>();
</script>
<template>
    <router-link :to="link" class="link w-full px-4 py-1 hover:cursor-pointer
     hover:bg-accents-2 hover:text-foreground rounded-lg text-accents-6">{{ title }}</router-link>
</template>
<style>
.link {
    transition: color .2s ease, background-color .2s ease;
}

.router-link-active {
    color: var(--foreground);
    font-weight: 500;
}
</style>