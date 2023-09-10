<script setup lang="ts">
import {ref} from "vue";
import {onClickOutside, OnClickOutsideHandler} from "@vueuse/core";

const dropdown = ref(false)
const dropdownHandler: OnClickOutsideHandler = (event) => {
  dropdown.value = false
}
</script>

<template>
  <div class="ml-2 relative inline-block">
    <button @click.stop="dropdown = !dropdown">
      Toggle Dropdown
    </button>
    <div v-if="dropdown" v-on-click-outside.bubble="dropdownHandler" class="dropdown-inner">
      Click outside of the dropdown to close it.
    </div>
  </div>
</template>

<style scoped>

.dropdown-inner {
  background-color: var(--vp-c-bg);
  padding: 0.5em;
  position: absolute;
  left: 0;
  z-index: 10;
  border-radius: 5px;
  border: 1px solid var(--vp-c-divider);
  box-shadow: 2px 2px 5px rgba(10, 10, 10, 0.1);
}


</style>