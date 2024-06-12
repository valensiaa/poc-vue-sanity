<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import client from '../client';

import { componentMap } from '../components/shared/ComponentMap'; // Import your component map
import { PortableText } from '@portabletext/vue';
import myPortableTextComponents from '../components/shared/CustomPortableText';

const route = useRoute();
const pageData = ref(null);

const fetchPageData = () => {
  const slug = route.params.slug || 'home'; 
  const groqQuery = 
  `*[_type == "pageType" && slug.current == $slug][0]`
  client.fetch(groqQuery, {slug}).then((data) => {
    pageData.value = data;
  });
};

onMounted(() => {
  fetchPageData();
});

watch(route, () => {
  fetchPageData();
});
</script>

<template>
  <div v-if="pageData" class="pagebuilder">
    <component
      v-for="(section, index) in pageData.componentList"
      :key="index"
      :is="componentMap[section._type]"
      :content="section"
    />
  <div class="container mx-auto px-6 py-12">
    <h2 class="relative font-bold text-black text-5xl  max-w-3xl">SEO Metadata</h2>
    <ul>
      <li v-if="pageData.seoTitle" class="border-b pt-3 pb-1"><b>Title:</b> {{ pageData.seoTitle }}</li>
      <li v-if="pageData.seoExcept" class="border-b pt-3 pb-1"><b>Description:</b><PortableText :value='pageData.seoExcept' :components="myPortableTextComponents" /></li>
      <li v-if="pageData.seoKeywords" class="border-b pt-3 pb-1"><b>Keywords: </b><span v-for="keyword in pageData.seoKeywords"> {{ keyword }}, </span></li>
    </ul>
  </div>
  </div>
</template>