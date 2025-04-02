<!-- DragDropBox.vue -->

<template>
  <div class="container">
    <div class="file-upload-container"
         @dragenter="onDragenter"
         @dragover="onDragover"
         @dragleave="onDragleave"
         @drop="onDrop"
         @click="onClick"
    >
      <div class="file-upload" :class="isDragged ? 'dragged' : ''">
        Drag & Drop MIDI Files
      </div>
    </div>

    <!-- 파일 업로드 -->
    <input type="file" ref="fileInput" class="file-upload-input" @change="onFileChange" multiple accept=".midi, .mid">

    <!-- 업로드된 파일 리스트 -->
    <div class="file-upload-list">
      <div class="file-upload-list__item" v-for="(file, index) in fileList" :key="index">
        <div class="file-upload-list__item__data">
          <div class="file-upload-list__item__data-name">
            {{ file.name }}
          </div>
        </div>
        <v-btn color="error" variant="outlined" @click="handleRemove(index)">
          삭제
        </v-btn>
        <v-btn color="primary" variant="outlined" @click="convertToPdf(file, index)">
          Convert to PDF
        </v-btn>
      </div>
    </div>


    <!-- 다운로드 버튼 -->
    <div v-if="pdfUrl" class="download-container">
      <v-btn color="success" variant="outlined" @click="downloadPdf">
        Download PDF
      </v-btn>
    </div>
    <!-- MusicScoreViewer 컴포넌트를 사용하여 PDF를 표시 -->
    <MusicScoreViewer v-if="pdfUrl" :pdfUrl="pdfUrl" />

  </div>
</template>

<script>
import MusicScoreViewer from './MusicScoreViewer.vue';
import axios from 'axios';

export default {
  name: "DragDropBox",
  components: {
    MusicScoreViewer
  },
  data() {
    return {
      isDragged: null,
      fileList: [],
      pdfUrl: null // 변환된 PDF의 URL 저장
    };
  },
  methods: {
    onClick() {
      this.$refs.fileInput.click();
    },
    onDragenter() {
      this.isDragged = true;
    },
    onDragleave() {
      this.isDragged = false;
    },
    onDragover(event) {
      event.preventDefault();
    },
    onDrop(event) {
      event.preventDefault();
      this.isDragged = false;
      const files = event.dataTransfer.files;
      this.addFiles(files);
    },
    onFileChange(event) {
      const files = event.target.files;
      this.addFiles(files);
    },
    async addFiles(files) {
      for (let i = 0; i < files.length; i++) {
        const src = await this.readFiles(files[i]);
        files[i].src = src;
        this.fileList.push(files[i]);
      }
    },
    async readFiles(file) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    },
    handleRemove(index) {
      this.fileList.splice(index, 1);
    },

    // MIDI 파일을 PDF로 변환하는 메서드
    async convertToPdf(file, index) {
      const formData = new FormData();
      formData.append("midiFile", file);

      try {
        console.log('🔄 Sending file:', file);

        const response = await axios.post('http://localhost:3000/convert-midi', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log('Response:', response.data);

        if (response.data.pdfUrl) {
          // PDF URL을 백엔드 기준(`http://localhost:3000`)으로 설정
          const pdfPath = response.data.pdfUrl.startsWith('/')
            ? `http://localhost:3000${response.data.pdfUrl}`
            : response.data.pdfUrl;

          console.log('PDF URL:', pdfPath);

          this.fileList[index].pdfUrl = pdfPath;
          this.pdfUrl = response.data.pdfUrl;
          alert("PDF 변환 완료: " + pdfPath);
        } else {
          alert("⚠서버에서 PDF URL을 반환하지 않았습니다.");
        }
      } catch (error) {
        console.error("MIDI to PDF 변환 중 오류:", error);
        alert("⚠MIDI 파일 변환 중 오류 발생");
      }
    },

    // PDF 다운로드 메서드
    downloadPdf() {
      if (this.pdfUrl) {
        const link = document.createElement('a');
        link.href = this.pdfUrl;
        link.download = 'converted_file.pdf';  // 파일 이름을 'converted_file.pdf'로 지정
        link.click();
      } else {
        alert("⚠ PDF 파일이 준비되지 않았습니다.");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 300px;
  width: 500px;
  margin: 0 auto;
}

.file-upload-container {
  height: 300px;
  padding: 20px;
  margin: 0 auto;
  box-shadow: 0 0.625rem 1.25rem #0000001a;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #F3F4F6, #E5E7EB);
}

.file-upload {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: transparent;
  border-radius: 20px;
  background: linear-gradient(135deg, #F3F4F6, #E5E7EB);

  &.dragged {
    border: 1px dashed powderblue;
    opacity: .6;
  }
}

.file-upload-list {
  margin-top: 10px;
  width: 100%;

  &__item {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__data {
      display: flex;
      align-items: center;

      &-thumbnail {
        margin-right: 10px;
        border-radius: 20px;
        width: 120px;
        height: 120px;
      }
    }

    &__btn-remove {
      cursor: pointer;
      border: 1px solid powderblue;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
      border-radius: 6px;
    }
  }
}

.pdf-container {
  width: 80%;
  height: 80%;
  margin: 20px auto;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.pdf-container iframe {
  width: 100%;
  height: 100%;
}

.download-container {
  margin-top: 20px;
  text-align: center;
}
</style>
