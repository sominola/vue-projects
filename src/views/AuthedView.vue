<script setup lang="ts">
import type {MessageDto, UserDto} from '@/common/types/types';
import {signalR} from '@/services/signalr.service';
import { useSignalrStore, useUsersStore} from '@/stores/stores';
import {computed, onMounted, watch} from 'vue';


const signalrStore = useSignalrStore();
const userStore = useUsersStore();
const signalRConnection = computed(() => signalrStore.hubConnection)

watch(() => signalrStore.lastUpdatedUser, (value) => {
  if (value)
    userStore.updateUserState(value);
});

onMounted(async () => {
  if (signalRConnection.value == null) {
    const signalr = await signalR.init()
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
  <RouterView v-if="signalRConnection"/>
  <h1 v-if="!signalRConnection">No connection</h1>
</template>