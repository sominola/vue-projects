<script setup lang="ts">
import IconLogo from "@/components/icons/IconLogo.vue";
import {computed, ref, watch} from "vue";
import {
  AvatarFallback,
  AvatarImage, AvatarRoot,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarPortal,
  MenubarRoot,
  MenubarTrigger,
  SwitchRoot,
  SwitchThumb
} from "radix-vue";
import {useGlobalStore} from "@/stores/global.store";
import {storeToRefs} from "pinia";
import {useAuthStore} from "@/stores/auth.store";


const currentMenu = ref('')
const globalStore = useGlobalStore();
const authStore = useAuthStore();
const {isDarkTheme} = storeToRefs(globalStore);
watch(isDarkTheme, () => {
  if (isDarkTheme.value) {
    localStorage.setItem('theme', 'dark');
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
  }
});
const user = computed(() => authStore.user)

</script>
<template>
  <div class="px-3 py-2 flex flex-row gap-5 justify-between items-center h-header border-b-2 border-t-2 border-solid border-accents-2">
    <router-link to="/chat" class="flex flex-row gap-5 items-center hover:opacity-80 hover:cursor-pointer">
      <IconLogo/>
      <span class="font-bold text-xl text-foreground">Sociality</span>
    </router-link>
    <div class="flex gap-5 flex-row">
      <router-link v-if="!user" to="/sign-in" class="hidden-item font-bold bg-border px-4 py-1 rounded-lg
      hover:opacity-80 hover:cursor-pointer">Sign In
      </router-link>
      <router-link v-if="!user" to="/sign-up" class="hidden-item font-bold text-white bg-violet px-4 py-1 rounded-lg
      hover:opacity-80 hover:cursor-pointer">Sign Up
      </router-link>
      <div>
        <MenubarRoot v-model="currentMenu" v-if="user">
          <MenubarMenu value="file">
            <MenubarTrigger class="hover cursor-pointer hover:bg-accents-2 rounded-lg p-[3px]">
              <AvatarRoot class="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <AvatarFallback class="leading-1 flex h-full w-full items-center justify-center bg-accents-3 text-[15px] font-medium">
                  {{user.firstName[0] }}{{user.lastName[0]}}
                </AvatarFallback>
              </AvatarRoot>
            </MenubarTrigger>
            <MenubarPortal>
              <MenubarContent class="flex flex-col gap-5 min-w-[220px] bg-accents-1 p-3 shadow-xl rounded-lg"
                              align="start" :side-offset="5" :align-offset="-3">
                <MenubarItem v-if="!user" class="h-[30px] gap-5 hidden visible-item mb-5 justify-center">
                  <router-link to="/sign-in" class="font-bold bg-border px-4 py-1
                  rounded-lg hover:opacity-80 hover:cursor-pointer">Sign In
                  </router-link>
                  <router-link to="/sign-up" class="font-bold text-white bg-violet px-4 py-1 rounded-lg
                      hover:opacity-80 hover:cursor-pointer">Sign Up
                  </router-link>
                </MenubarItem>
                <MenubarItem disabled>
                  <div class="flex items-center justify-between">
                    <label class="select-none cursor-pointer" for="dark-mode">Dark mode</label>
                    <SwitchRoot id="dark-mode" v-model:checked="isDarkTheme" class="w-[38px] h-[21px] cursor-pointer
                            flex border-violet border-2 rounded-full
                           data-[state=unchecked]:border-accents-6">
                      <SwitchThumb class="w-[11px] h-[11px] my-auto bg-violet rounded-full
                      transition-transform duration-200 translate-x-0.5 will-change-transform 
                      data-[state=checked]:translate-x-[19px]
                      data-[state=unchecked]:bg-accents-6"/>
                    </SwitchRoot>
                  </div>
                </MenubarItem>
                <MenubarItem disabled v-if="user">
                  <div class="flex items-center justify-between">
                    <router-link to="/settings" class="text-foreground font-medium w-full
                    rounded-lg px-3 py-1 hover:bg-accents-6 disabled:bg-accents-4">Settings
                    </router-link>
                  </div>
                </MenubarItem>
                <MenubarItem disabled v-if="user">
                  <div class="flex items-center justify-between">
                    <button @click="authStore.logout" class="text-foreground font-medium w-full
                    rounded-lg px-3 py-1 hover:bg-accents-6 disabled:bg-accents-4">Logout
                    </button>
                  </div>
                </MenubarItem>
              </MenubarContent>
            </MenubarPortal>
          </MenubarMenu>
        </MenubarRoot>

      </div>
    </div>
  </div>
</template>
<style scoped>
@media (max-width: 430px) {
  .hidden-item {
    display: none;
  }

  .visible-item {
    display: flex;
  }
}
</style>

