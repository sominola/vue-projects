<script setup lang="ts">
import FormInput from '@/components/form/FormInput.vue';
import { userUpdateSchema } from '@/helpers/validation-schema/update-user.schema';
import { useAuthStore } from '@/stores/auth';
import type { UserUpdateDto } from '@/types/types';
import { storeToRefs } from 'pinia';
import { AvatarImage, AvatarRoot } from 'radix-vue';
import { useForm } from 'vee-validate';

const avatarUrl = 'https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { handleSubmit, meta, resetForm } = useForm<UserUpdateDto>({
    validationSchema: userUpdateSchema,
    initialValues: user
});


const onSubmit = handleSubmit( async (values)=> {
   await authStore.updateUser(values).then(() => {
        resetForm();
    });
});

</script>
<template class="w-full">
    <form class="flex flex-col gap-7" @submit="onSubmit">
        <div class="flex flex-row justify-between items-center   p-5 rounded-lg bg-accents-1">
            <div class="flex flex-col gap-5">
                <span class="tracking-tight text-xl font-semibold text-accents-7">Your Avatar</span>
                <div class="flex flex-col">
                    <span>This is your avatar.</span>
                    <span> Click on the avatar to upload a custom one from your files.</span>
                </div>
            </div>
            <AvatarRoot class="bg-blackA3 inline-flex h-[75px] w-[75px] 
            select-none items-center justify-center overflow-hidden rounded-full align-middle
            hover:opacity-70 hover:cursor-pointer">
                <AvatarImage class="h-full w-full rounded-[inherit] object-cover" :src="avatarUrl" alt="Avatar" />
            </AvatarRoot>
        </div>


        <div class="flex flex-col gap-5 p-5 rounded-lg bg-accents-1">
            <span class="tracking-tight text-xl font-semibold text-accents-7">Your Email</span>
            <FormInput name="email" title="Email" placeholder="Enter Email" disabled />
        </div>

        <div class="flex flex-col gap-5 p-5 rounded-lg bg-accents-1">
            <span class="tracking-tight text-xl font-semibold text-accents-7">Your Name</span>
            <FormInput name="firstName" title="First name" placeholder="Enter First name" />
            <FormInput name="lastName" title="Last name" placeholder="Enter Last name" />
            <div class="flex justify-end">
                <button :disabled="!meta.valid || !meta.dirty" class="bg-foreground text-background
                 font-medium rounded-lg px-3 py-1 hover:bg-accents-6 disabled:bg-accents-4">Save</button>
            </div>
        </div>
    </form>
</template>