<script setup lang="ts">
import { ChatType } from "@/common/enums/chat-type.enum";
import type { ChatDto, UserDto } from "@/common/types/types";
import { useAuthStore, useUsersStore } from "@/stores/stores";
import { AvatarImage, AvatarRoot } from "radix-vue";
import { computed, onMounted, ref } from "vue";
const avatarUrl = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';

const props = defineProps<{
  chat: ChatDto,
  isActive?: boolean
}>();


const userStore = useUsersStore();
const authStore = useAuthStore();
const userId = props.chat.memberIds.find(x => authStore.user?.id != x)!;
const user = computed(() => userStore.getUserById(userId));
</script>

<template>
  <div v-if="user"
    class="bg-accents-1 flex justify-between h-[75px] items-center p-3 hover:cursor-pointer hover:bg-accents-2"
    :class="{ 'bg-accents-2': isActive }">
    <AvatarRoot v-if="chat.type == ChatType.Group"
      class="h-[60px] w-[60px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="chat.avatarUrl ?? avatarUrl" alt="Avatar" />
    </AvatarRoot>
    <AvatarRoot v-if="chat.type == ChatType.Personal"
      class=" h-[60px] w-[60px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
      <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="user?.avatarUrl ?? avatarUrl"
        alt="Avatar" />
    </AvatarRoot>

    <div class="flex flex-col w-[200px] gap-2">
      <div class="flex justify-between w-full">
        <span v-if="chat.type == ChatType.Group"
          class="text-sm text-accents-8 font-semibold leading-4 tracking-[0.16px]">{{ chat.name }}</span>
        <span v-if="chat.type == ChatType.Personal"
          class="text-sm text-accents-8 font-semibold leading-4 tracking-[0.16px]">
          {{ user.firstName }} {{ user.lastName }}</span>
        <span v-if="chat.lastMessage" class="text-xs text-accents-6 leading-4 tracking-[0.16px]">
          {{ chat.lastMessage?.createdAt.toLocaleTimeString() }}</span>
      </div>
      <span class="text-accents-6 ">{{ chat.lastMessage?.text }}</span>
    </div>
  </div>
</template>