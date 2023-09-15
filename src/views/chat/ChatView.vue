<script setup lang="ts">
import type {ChatInfoDto} from "@/common/types/chat/chat";
import {ref} from "vue";
import ChatItem from "@/views/chat/components/ChatItem.vue";
import {ChatType} from "@/common/enums/enums";

const avatarUrl = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';
const chatInit: ChatInfoDto[] = [
  {
    id: '1',
    type: ChatType.Personal,
    name: 'Nikita Savchuk',
    avatarUrl: avatarUrl,
    members: [
      {
        id: 1,
        fullName: 'Nikita Savchuk',
        email: 'sominola@gmail.com',
        avatarUrl: avatarUrl,
        firstName: 'Nikita',
        lastName: 'Savchuk',
      }
    ],
    lastMessage: {
      id: 'test',
      chatId: '1',
      text: 'Hi, how are you?',
      createdAt: new Date(),
      sender: {
        id: 1,
        fullName: 'Nikita Savchuk',
        email: 'sominola@gmail.com',
        avatarUrl: avatarUrl,
        firstName: 'Nikita',
        lastName: 'Savchuk',
      }
    }
  }
]
const chats = ref(chatInit)
</script>
<template>
  <div class="h-content">
    <div class="w-[300px] h-content overflow-y-auto">
      <ChatItem v-for="chat in chats" :chat="chat" :key="chat.id" :is-active="chat.isActive"/>
    </div>
  </div>
</template>