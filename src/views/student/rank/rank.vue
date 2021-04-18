<template>
  <div>
    <form-filter></form-filter>
    <form-uneditable></form-uneditable>
  </div>
</template>

<script>
import FormFilter from '../../../components/form/form-filter.vue'
import formUneditable from '../../../components/form/form-uneditable.vue'
export default {
  components: { formUneditable, FormFilter },
  
}
</script>