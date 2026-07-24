<script setup lang="ts">
import {ref, computed} from 'vue'
import {marked} from 'marked'
import DOMPurify from 'dompurify'

// 示例 Markdown 文本，你可以改成接口请求、编辑器输入
const markdownRaw = ref(`
# 联系我们
## 联系方式
- 电话：+86 15177939513
- 邮箱：hty@hty.ink

> 工作时间：每天都在工作的社畜

**注意事项**
1. 资料提前准备
2. 工作日24小时内回复

[访问官网](https://www.example.com)
`)

/**
 * 将markdown文本转为安全html
 * DOMPurify 净化html，防止XSS注入风险
 */
const renderHtml = computed(() => {
  const rawHtml = marked.parse(markdownRaw.value) as string
  return DOMPurify.sanitize(rawHtml)
})
</script>

<template>
  <div class="contact-main markdown-body" v-html="renderHtml"></div>
</template>

<style scoped lang="scss">
// markdown基础美化样式
.markdown-body {
  line-height: 1.2;
  //padding: 16px;
  padding-left: 50px;
  color: #333;

  :deep(h1) {
    font-size: 24px;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
  }

  :deep(h2) {
    font-size: 20px;
    margin-top: 16px;
  }

  :deep(blockquote) {
    border-left: 4px solid #4299e1;
    padding-left: 12px;
    color: #666;
    background: #f7fafc;
  }

  :deep(ul, ol) {
    padding-left: 24px;
  }

  :deep(a) {
    color: #4299e1;
  }

  :deep(strong) {
    font-weight: 600;
  }
}
</style>