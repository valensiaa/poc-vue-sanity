<script setup>
import NavBar from '../components/NavBar.vue';
import { onMounted, ref } from 'vue';
import client from '../client';
import imageUrlBuilder from '@sanity/image-url';

let imageBuilder = imageUrlBuilder(client);

const groqQuery = `*[_type=='generalSettings']{
            _id,
            headerLogo{
                asset->{
                    url
                },
                alt
            }
        }`;

let logo = ref(null);

onMounted(() => {
    client.fetch(groqQuery).then((data) => {
        logo.value = data[0].headerLogo;
    });
});

const imageUrlFor = (source) => {
    return imageBuilder.image(source);
};
</script>

<template>
<header class="bg-white shadow-md">
    <div class="w-full p-6 flex container mx-auto">
        <router-link to="/" class="pr-4">
            <img v-if="logo" :src="imageUrlFor(logo).width(200).url()" :alt="logo.alt" />
        </router-link>
        <NavBar></NavBar>
    </div>
</header>
</template>
