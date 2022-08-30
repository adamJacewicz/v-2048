<template>
  <button type="button" class="btn-primary">
    <slot />
  </button>
</template>
<style lang="scss" scoped>
.btn-primary {
  @apply block rounded-md border bg-primary-600 py-2 px-4 text-center font-medium tracking-wide text-primary-100 transition-[background] hover:bg-primary-500;
}
</style>
