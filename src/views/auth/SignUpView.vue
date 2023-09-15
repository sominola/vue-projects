<script setup lang="ts">
import FormInput from "@/components/form/FormInput.vue";
import {useForm} from 'vee-validate';
import ButtonInput from "@/components/form/ButtonInput.vue";
import {signUpSchema} from "@/common/helpers/validation-schema/sign-up.schema";
import type {SignUpDto} from "@/common/types/types";
import {useAuthStore} from "@/stores/auth";

const { handleSubmit, meta } = useForm<SignUpDto>({
  validationSchema: signUpSchema
});

const authStore = useAuthStore();

const onSubmit = handleSubmit(values => {
  authStore.signUp(values);
});

</script>

<template>
  <div class="flex flex-col gap-5 justify-center items-center my-5">
    <h3 class="text-xl font-bold">Sign Up</h3>
    <form @submit="onSubmit" autocomplete="on" class="flex flex-col gap-5 w-full
                max-w-[400px] bg-accents-1 p-6 rounded-xl">
      <FormInput name="firstName" placeholder="Enter First name" title="First name" />
      <FormInput name="lastName" placeholder="Enter Last name" title="Last name" />
      <FormInput name="email" placeholder="Enter email" title="Email" />
      <FormInput name="password" placeholder="Enter password" title="Password" type="password" />
      <FormInput name="passwordConfirm" placeholder="Enter email" title="Confirm password" type="password" />
      <ButtonInput :disabled="!meta.valid" name="Submit" />
    </form>
  </div>
</template>