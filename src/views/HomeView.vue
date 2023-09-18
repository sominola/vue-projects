<script setup lang="ts">
import Header from "@/components/shared/Header.vue";
import {AuthService} from "@/services/auth.service";
import {useAuthStore} from "@/stores/auth.store";
import {onMounted} from "vue";

onMounted(async () => {
  if (localStorage.getItem('access_token')) {
    const initUser = await AuthService.getCurrentUser();
    const authStore = useAuthStore();

    if (initUser) {
      authStore.user = initUser.data;
    } else {
      authStore.logout();
    }
  }
})
</script>

<template>
  <Header />
  <div>
    <RouterView />
  </div>
</template>