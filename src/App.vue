<script setup lang="ts">
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';
import { Api } from '@/ts/ApiServices';
import NavbarComponent from './components/NavbarComponent/NavbarComponent.vue';
onMounted(async () => {
	console.log('Hello from onMounted');
  const testApi = new Api('https://api.mangadex.org/at-home/server/b902c44d-cb34-4077-9501-c90b1216f2fb');
  const params = {
    forcePort443: false
  };
  const data = await testApi.getWithParams(params);
  console.log(data);
});
</script>

<template>
  <NavbarComponent />
  <RouterView />
</template>
