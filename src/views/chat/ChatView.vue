<script setup lang="ts">
import ChatItem from "@/views/chat/components/ChatItem.vue";
import {useAuthStore, useGlobalStore, useUsersStore} from "@/stores/stores";
import {computed, onBeforeMount, ref, watch} from "vue";
import type {ChatDto} from "@/common/types/types";
import {ChatService} from "@/services/services";
import {useRoute} from "vue-router";
import {checkIfHttpError} from "@/common/helpers/http.helper";
import {toast} from "vue-sonner";
import router from "@/router";
import SelectedChat from "@/views/chat/SelectedChatView.vue";

type ChatDtoExtended = ChatDto & { isActive: false }

function getUniqueMemberIds(chatArray: ChatDto[]): number[] {
  const uniqueMemberIds = new Set<number>();

  chatArray.forEach((chat) => {
    chat.memberIds.forEach((memberId) => {
      uniqueMemberIds.add(memberId);
    });
  });
  return Array.from(uniqueMemberIds);
}

const usersStore = useUsersStore()
const authStore = useAuthStore()
const globalStore = useGlobalStore()
const selectedChat = computed(() => globalStore.selectedChat)
const chats = ref<ChatDtoExtended[]>([])
const route = useRoute();

watch(() => route.params.id, async () => {
  await checkParams();
})

onBeforeMount(async () => {
  const newChats = (await ChatService.getChats()).data.items as ChatDtoExtended[];
  newChats.forEach(x => x.isActive = false);
  const uniqueMemberIds = getUniqueMemberIds(newChats).filter(x => x != authStore.user?.id);
  await usersStore.addUsers(uniqueMemberIds);
  chats.value.push(...newChats)
  await checkParams();

})

const checkParams = async () => {
  const chatId = route.params.id as string;
  if (chatId) {
    let selectedChat = chats.value.find(x => x.id == route.params.id)
    if (!selectedChat) {
      const response = await ChatService.getChat(chatId);
      const [isError, error] = checkIfHttpError(response);
      if (isError) {
        toast.error(error?.message!)
        await router.push('/chat');
        globalStore.selectedChat = null;
        return;
      }
      selectedChat = response.data;
      const uniqueMemberIds = getUniqueMemberIds([selectedChat!]).filter(x => x != authStore.user?.id);
      await usersStore.addUsers(uniqueMemberIds);
    }

    globalStore.selectedChat = selectedChat;
    const chat = chats.value.find(x => x.id == selectedChat?.id);
    if (chat) {
      chat.isActive = true;
    }
  }
}

</script>
<template>
  <div class="flex h-content">
    <div class="h-content w-full max-w-[300px] overflow-y-auto">
      <ChatItem v-for="chat in chats" :chat="chat" :key="chat.id" :is-active="chat.isActive"/>
    </div>
    <div class="w-full">
      <SelectedChat v-if="selectedChat" :chat="selectedChat"/>
    </div>
  </div>
</template>