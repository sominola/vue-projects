<script setup lang="ts">
import type { MessageDto, UserDto } from '@/common/types/types';
import { signlaR } from '@/services/signalr.service';
import { useSignalrStore } from '@/stores/signalr.store';
import { useAuthStore } from '@/stores/stores';
import { useUsersStore } from '@/stores/users.store';
import { computed, watch } from 'vue';


const authStore = useAuthStore();
const signalrStore = useSignalrStore();
const userStore = useUsersStore();
const signalRConnection = computed(() => signalrStore.hubConnection)

watch(() => signalrStore.lastUpdatedUser, (value) => {
    if (value)
        userStore.updateUserState(value);
});

watch(() => authStore.user, async (newValue, oldValue) => {
    if (oldValue == null && newValue) {
        const signalr = await signlaR.init()
        signalr.on('ReceiveMessage', (message: MessageDto) => {
            signalrStore.lastMessage = message;
        });
        signalr.on('UserUpdated', (user: UserDto) => {
            signalrStore.lastUpdatedUser = user;
        });
        signalrStore.hubConnection = signalr;
    }

})
</script>
<template>
    <RouterView v-if="signalRConnection" />
</template>