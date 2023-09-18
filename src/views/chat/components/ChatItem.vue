<script setup lang="ts">
import type {ChatDto} from "@/common/types/types";
import {AvatarImage, AvatarRoot} from "radix-vue";

defineProps<{
  chat: ChatDto,
  isActive?: boolean
}>();
</script>

<template>
  <div class="bg-accents-1 flex justify-between h-[75px] items-center p-3 hover:cursor-pointer hover:bg-accents-2"
       :class="{'bg-accents-2': isActive}">
    <AvatarRoot
        class="h-[60px] w-[60px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="chat.avatarUrl" alt="Avatar"/>
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
</template>