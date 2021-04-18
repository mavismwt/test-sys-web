<template>
  <div>
    <form-filter></form-filter>
    <form-editable></form-editable>
  </div>
</template>

<script>
import FormEditable from '@/components/form/form-editable.vue'
import formFilter from '@/components/form/form-filter.vue'

export default {
  components: { formFilter, FormEditable },

}
</script>
