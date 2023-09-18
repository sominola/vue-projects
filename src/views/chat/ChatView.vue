<script setup lang="ts">
import ChatItem from "@/views/chat/components/ChatItem.vue";
import { useUsersStore } from "@/stores/stores";
import { onBeforeMount, onMounted, ref } from "vue";
import type { ChatDto } from "@/common/types/chat/chat.dto";
import { ChatService, signlaR } from "@/services/services";

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
const chats = ref<ChatDtoExtended[]>([]);

onBeforeMount(async () => {
  const newChats = (await ChatService.getChats()).data.items as ChatDtoExtended[];
  newChats.forEach(x => x.isActive = false);
  const uniqueMemberIds = getUniqueMemberIds(newChats);
  usersStore.addUsers(uniqueMemberIds);
  chats.value.push(...newChats)
})

</script>
<template>
  <div class="h-content">
    <div class="w-[300px] h-content overflow-y-auto">
      <ChatItem v-for="chat in chats" :chat="chat" :key="chat.id" :is-active="chat.isActive" />
    </div>
  </div>
</template>