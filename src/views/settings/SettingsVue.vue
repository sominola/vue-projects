<script setup lang="ts">
import MenuLink from "@/components/shared/MenuLink.vue";

</script>
<template>
    <div>
        <div class="px-6 py-7 border-b-2 border-t-2 border-solid border-accents-2">
            <h2 class="text-2xl font-medium text-foreground tracking-wider opacity-95">Personal Account Settings</h2>
        </div>
        <div class="mt-[37px] flex flex-row px-[24px]">
            <div class="flex flex-col w-[180px] mr-[24px]">
                <MenuLink link="profile" title="Profile" />
                <MenuLink link="sessions" title="Active Sessions" />
            </div>
            <div class="w-full pb-5">
                <RouterView />
            </div>
        </div>
    </div>
</template>