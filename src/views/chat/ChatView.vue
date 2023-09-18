<script setup lang="ts">
import ChatItem from "@/views/chat/components/ChatItem.vue";
import {useUsersStore} from "@/stores/stores";
import {storeToRefs} from "pinia";
import {onMounted, ref} from "vue";
import type {ChatDto} from "@/common/types/chat/chat.dto";
import {ChatService} from "@/services/services";
import type {UserDto} from "@/common/types/user/user.dto";

type ChatDtoExtended = ChatDto & { isActive: false, members: UserDto[] }
const usersStore = useUsersStore()
const {getUsers} = storeToRefs(usersStore)


const chats = ref<ChatDtoExtended[]>([]);
onMounted(async () => {
  const newChats = (await ChatService.getChats()).data.items as ChatDto[];
  const uniqueMemberIds = [...new Set(newChats.flatMap(chat => chat.memberIds))];
  const members = getUsers.value;
  console.log(members)
  
})

</script>
<template>
  <div class="h-content">
    <div class="w-[300px] h-content overflow-y-auto">
      <ChatItem v-for="chat in chats" :chat="chat" :key="chat.id" :is-active="chat.isActive"/>
    </div>
  </div>
</template>