<script setup lang="ts">
import {checkIfHttpError} from "@/helpers/http.helper";
import {AuthService} from "@/services/auth.service";
import {useAuthStore} from "@/stores/auth";
import type {ActiveSessionDto, Paginated} from "@/types/types";
import {onMounted, ref} from "vue";
import {toast} from "vue-sonner";

const authStore = useAuthStore();
const sessions = ref<Paginated<ActiveSessionDto> | null>(null);
const currentSession = localStorage.getItem('refresh_token');
const revoke = async (session: ActiveSessionDto) => {
    const response = await AuthService.logout(session.refreshToken);
    const [isError, error] = checkIfHttpError(response);

    if (isError && error?.message) {
        toast.error(error?.message);
        return;
    }

    sessions.value?.items.splice(sessions.value.items.indexOf(session), 1);
    toast.success('Sessions success revoked');
}
onMounted(async () => {
    sessions.value = (await AuthService.getActiveSessions()).data;
})

</script>
<template>
   <div class="h-full">
     <div class="[&>*:not(:first-child)]:border-t-0">
       <div v-for="session in sessions?.items" :key="session.refreshToken"
            class="flex border-2 border-solid border-accents-2 rounded-lg justify-between">
         <div class="flex flex-col gap-3 p-2 pr-0">
           <span class="text-lg font-medium">{{ session.userAgent }}</span>
           <div class="text-sm text-accents-5 flex gap-5">
             <span>{{ session.lastActiveAt }}</span>
             <span class="text-green-500" v-if="session.refreshToken === currentSession">Is current session</span>
           </div>
         </div>
         <button @click="revoke(session)" v-if="session.refreshToken !== currentSession" class="bg-red-light text-background font-medium rounded-lg
            rounded-l-none px-3 py-1 hover:bg-accents-6 disabled:bg-accents-4">Revoke</button>
         <button v-else @click="authStore.logout" class="bg-red-light text-background font-medium rounded-lg
            rounded-l-none px-3 py-1 hover:bg-accents-6 disabled:bg-accents-4">Logout</button>
       </div>
     </div>
   </div>
</template>