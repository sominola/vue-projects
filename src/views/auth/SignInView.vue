<script setup lang="ts">
import FormInput from "@/components/form/FormInput.vue";
import {useForm} from 'vee-validate';
import ButtonInput from "@/components/form/ButtonInput.vue";
import {signInValidation} from "@/helpers/validation-schema/sign-in.schema";
import {useAuthStore} from "@/stores/auth";
import {storeToRefs} from "pinia";
import type {SignInDto} from "@/types/types";

const {handleSubmit, meta} = useForm<SignInDto>({
  validationSchema: signInValidation
});

const authStore = useAuthStore();
const {user} = storeToRefs(authStore);

const onSubmit = handleSubmit(values => {
  authStore.signIn(values);
});

</script>

<template>
  <div class="flex flex-col gap-5 justify-center items-center my-5">
    <h3 class="text-xl font-bold">{{ JSON.stringify(user) }}</h3>
    <h3 class="text-xl font-bold">Sign In</h3>
    <form @submit="onSubmit" class="flex flex-col gap-5 w-full max-w-[400px] bg-accents-1 p-6 rounded-xl"
          autocomplete="on">
      <FormInput name="email" placeholder="Enter email" title="Email"/>
      <FormInput name="password" placeholder="Enter password" title="Password"/>
      <ButtonInput :disabled="!meta.valid" name="Submit"/>
    </form>
  </div>
</template>