<script setup lang="ts">
import {computed, ComputedRef, onBeforeMount, ref} from "vue";
import type {MessageDto} from "@/common/types/chat/message.dto";
import {useAuthStore, useGlobalStore, useUsersStore} from "@/stores/stores";
import type {ChatDto} from "@/common/types/chat/chat.dto";
import {ChatType} from "@/common/enums/chat-type.enum";
import type {UserDto} from "@/common/types/user/user.dto";
import {AvatarFallback, AvatarImage, AvatarRoot} from "radix-vue";

const props = defineProps<{
  chat: ChatDto;
}>();
const userStore = useUsersStore();
const globalStore = useGlobalStore();
const authStore = useAuthStore();

const messages = ref<MessageDto[]>([]);
const userId = props.chat.memberIds.find(x => authStore.user?.id != x)!;
let user: ComputedRef<UserDto> | null;
onBeforeMount(() => {
  if (props.chat.type == ChatType.Personal)
    user = computed(() => userStore.getUserById(userId));
})
</script>
<template>
  <div class="w-full h-full box-border flex flex-col" v-if="chat">
    <div class="px-3 border-b-2 border-solid border-accents-2 flex gap-3">

      <AvatarRoot v-if="chat.type == ChatType.Personal" class="inline-flex h-[45px] w-[45px] 
          select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <AvatarFallback v-if="!user.avatarUrl"
                        class="leading-1 flex h-full w-full items-center justify-center bg-accents-3 text-[15px] font-medium">
          {{ user.firstName[0] }}{{ user.lastName[0] }}
        </AvatarFallback>
        <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="user.avatarUrl"
                     alt="Avatar"/>
      </AvatarRoot>

      <AvatarRoot v-if="chat.type == ChatType.Group" class="inline-flex h-[45px] w-[45px] 
          select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <AvatarFallback v-if="!chat.avatarUrl"
                        class="leading-1 flex h-full w-full items-center justify-center bg-accents-3 text-[15px] font-medium">
          {{ chat.name }}
        </AvatarFallback>
        <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="chat.avatarUrl"
                     alt="Avatar"/>
      </AvatarRoot>

      <span v-if="chat.type == ChatType.Personal">{{ user.firstName }} {{ user.lastName }}</span>
      <span v-else>{{ chat.name }}</span>

    </div>
    <div class="h-full flex flex-col p-3">
      <div class="h-full bg-grey overflow-y-auto">
      </div>
      <div class="h-[40px] w-full bg-accents-2"></div>
    </div>
  </div>
</template>