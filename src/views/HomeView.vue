<script setup lang="ts">
import Header from "@/components/shared/Header.vue";
import {Toaster} from "vue-sonner";
</script>

<template>
  <Toaster />
  <Header/>
  <div>
    <RouterView/>
  </div>
</template>