<script setup lang="ts">
import {AvatarImage, AvatarRoot} from "radix-vue";
const avatarUrl = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';

</script>
<template>
  <div class="p-5">
    <div class="w-[180px]">
      <div class="flex flex-row justify-between bg-accents-1">
        <div>
          <span>Nikita Savchuk</span>
        </div>
        <AvatarRoot class="bg-blackA3 inline-flex h-[45px] w-[45px]
            select-none items-center justify-center overflow-hidden rounded-full align-middle
            hover:opacity-70 hover:cursor-pointer">
          <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="avatarUrl" alt="Avatar" />
        </AvatarRoot>
      </div>
    </div>
  </div>
</template>
