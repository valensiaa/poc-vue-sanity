<script setup>
import { onMounted, ref } from 'vue';
import client from '../client';

const groqQuery = 
`*[_type=='pageType']{
slug,
title
}`

const navData = ref(null);

onMounted(() => {
    client.fetch(groqQuery)
    .then((data) => {
      navData.value = data;
    })
});
</script>

<template>
      <nav class="flex flex-auto items-center" v-if="navData">
        <ul class="flex justify-end text-lg">
          <li  v-for="item in navData" :key="item._id" class="hover:text-primary text-xl cursor-pointer px-4 transition-all">
            <router-link v-if="item.slug && item.title" :to="`/${item.slug && item.slug.current !== 'home' ? item.slug.current : ''}`">{{item.title}}</router-link>
          </li>
        </ul>
      </nav>
</template>