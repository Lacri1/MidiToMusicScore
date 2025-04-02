<!-- MusicScoreViewer.vue -->

<template>
  <v-container>
    <div class="justify-center">
      <VuePDF v-if="pdf" :pdf="pdf" :page="currentPage" />
      <div v-else>PDF를 불러오는 중...</div>
    </div>
    <div class="justify-center">
      <v-btn class="ma-4" @click="pagePrev">Prev</v-btn>
      <div class="mt-6"> {{ currentPage }} / {{ pages }} </div>
      <v-btn class="ma-4" @click="pageNext">Next</v-btn>
    </div>
  </v-container>
</template>

<script>
import { usePDF, VuePDF } from '@tato30/vue-pdf';
import { ref, watch } from 'vue';

export default {
  name: "MusicScoreViewer",

  components: {
    VuePDF
  },
  props: {
    pdfUrl: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const currentPage = ref(1);
    const { pdf, pages } = usePDF(props.pdfUrl);

    watch(() => props.pdfUrl, (newUrl) => {
      if (newUrl) {
        const { pdf: newPdf, pages: newPages } = usePDF(newUrl);
        pdf.value = newPdf;
        pages.value = newPages;
        currentPage.value = 1;
      }
    });

    return {
      pdf,
      pages,
      currentPage
    };
  },
  methods: {
    pageNext() {
      if (this.currentPage < this.pages) this.currentPage += 1;
    },
    pagePrev() {
      if (this.currentPage > 1) this.currentPage -= 1;
    }
  },
};
</script>

<style lang="scss" scoped>
.justify-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
