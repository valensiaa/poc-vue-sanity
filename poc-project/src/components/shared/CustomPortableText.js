import { PortableText } from '@portabletext/vue';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../client';
import { h } from 'vue';

let imageBuilder = imageUrlBuilder(client);

const imageUrlFor = (source) => {
  return imageBuilder.image(source);
};

const myPortableTextComponents = {
  types: {
    image: ({ value }) => h('img', { 
      src: imageUrlFor(value.asset).url(),
      alt: value.alt || '',
      class: 'w-full h-auto',
     }),
    callToAction: ({ value, isInline }, { slots }) =>
      isInline
        ? h('a', { href: value.url }, value.text)
        : h('div', { class: 'callToAction' }, value.text),
  },

  block: {
    // Ex. 1: customizing common block types
    h2: (_, { slots }) => h('h3', { class: 'font-bold text-black text-3xl' }, slots.default?.()),
    h3: (_, { slots }) => h('h3', { class: 'font-bold text-black text-2xl' }, slots.default?.()),
    h4: (_, { slots }) => h('h3', { class: 'font-bold text-black text-xl' }, slots.default?.()),
    blockquote: (_, { slots }) =>
      h('blockquote', { class: 'font-italic' }, slots.default?.()),
  },

  list: {
    // Ex. 1: customizing common list types
    bullet: (_, { slots }) => h('ul', { class: 'mt-xl' }, slots.default?.()),
    number: (_, { slots }) => h('ol', { class: 'mt-lg' }, slots.default?.()),

    // Ex. 2: rendering custom lists
    checkmarks: (_, { slots }) => h('ol', { class: 'm-auto text-lg' }, slots.default?.()),
  },

  listItem: {
    // Ex. 1: customizing common list types
    bullet: (_, { slots }) =>
      h('li', { style: { listStyleType: 'disclosure-closed' } }, slots.default?.()),

    // Ex. 2: rendering custom list items
    checkmarks: (_, { slots }) => h('li', ['✅', slots.default?.()]),
  },

  marks: {
    // Ex. 1: custom renderer for the em / italics decorator
    em: (_, { slots }) => h('em', { class: 'text-black' }, slots.default?.()),

    // Ex. 2: rendering a custom `link` annotation
    link: ({ value }, { slots }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return h('a', { href: value.href, rel, class: 'text-yellow-400 hover:text-black' }, slots.default?.());
    },
  },
};

export default myPortableTextComponents