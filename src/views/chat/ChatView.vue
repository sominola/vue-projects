<script setup lang="ts">
import {AvatarImage, AvatarRoot} from "radix-vue";
import type {ChatInfoDto} from "@/types/chat/chat-info.dto";
import {ChatType} from "@/types/chat/chat-info.dto";
import {onMounted, ref} from "vue";

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
onMounted(() => {
  for (let i = 0; i < 50; i++) {
    chats.value.push(chats.value[0])
  }
})
</script>
<template>
  <div class="content">
    <div class="w-[300px] content overflow-y-auto">
      <div v-for="chat in chats" :key="chat.id" class="bg-accents-1 flex justify-between h-[75px] items-center p-3">
        <AvatarRoot
            class="h-[60px] w-[60px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
          <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="avatarUrl" alt="Avatar"/>
        </AvatarRoot>
        <div class="flex flex-col w-[200px] gap-2">
          <div class="flex justify-between w-full">
            <span class="text-sm text-accents-8 font-semibold leading-4 tracking-[0.16px]">{{ chat.name }}</span>
            <span v-if="chat.lastMessage"
                  class="text-xs text-accents-6 leading-4 tracking-[0.16px]">
                      {{ chat.lastMessage?.createdAt.toLocaleTimeString() }}</span>
          </div>
          <span class="text-accents-6 ">{{ chat.lastMessage?.text }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.content {
  max-height: calc(100vh - var(--header-height));
  height: 100%;
  overflow-y: auto;
}
</style>
