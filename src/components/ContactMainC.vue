<template>
  <div class="contact-main markdown-body" v-html="renderHtml"></div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {marked} from 'marked'
import DOMPurify from 'dompurify'
// ============关键：读取本地md原始文本============
import contactMd from '@/Other/ContactMain_Markdown.md?raw'

const markdownRaw = ref(contactMd)

const renderHtml = computed(() => {
  const rawHtml = marked.parse(markdownRaw.value) as string
  return DOMPurify.sanitize(rawHtml)
})
</script>

<style scoped lang="scss">
.markdown-body {
  padding: 30px;
  color: #2d3748;
  background-color: #ffffff;
  border-radius: 16px;
  width: 100%;
  line-height: 1;

  :deep(h1) {
    font-size: 28px;
    color: #1a202c;
    line-height: 0.5;
  }

  :deep(h2) {
    font-size: 22px;
    color: #2d3748;
    margin-top: 24px;
    line-height: 0.5;
  }

  :deep(p) {
    margin: 12px 0;
  }

  :deep(blockquote) {
    border-left: 5px solid #3182ce;
    padding: 1px 10px;
    color: #4a5568;
    background: #f7fafc;
    //margin: 10px 0;
  }

  :deep(ul) {
    padding-left: 26px;
    margin: 14px 0;

    li {
      margin: 8px 0;
    }
  }

  :deep(ol) {
    padding-left: 26px;
    margin: 14px 0;

    li {
      margin: 8px 0;
    }
  }

  :deep(a) {
    color: #3182ce;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: #2b6cb0;
      text-decoration: underline;
    }
  }

  :deep(code) {
    background: #edf2f7;
    padding: 2px 7px;
    border-radius: 6px;
    font-family: Consolas, Menlo, monospace;
    font-size: 0.92em;
    color: #c53030;
  }

  :deep(strong) {
    font-weight: 600;
    color: #1a202c;
  }
}
</style>