<template>
  <div
    class="hero"
    :style="`height: ${height}px; width: ${
      width > assetMaxWidth ? assetMaxWidth : width
    }px;`">
    <div class="hero-thumb" @click="loadMedia()">
      <img :src="thumbnail" alt="Asset Thumbnail" class="hero-thumb-img" />
      <v-icon icon="mdi-play" size="50" class="hero-thumb-icon"></v-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  mediaUrl: string;
  thumbnail: string;
  height: number;
  width: number;
  assetMaxWidth: number;
}>();

const { mediaUrl, thumbnail, height, width, assetMaxWidth } = props;

const loadMedia = () => {
  document.querySelector('.hero-thumb')!.innerHTML = `
    <video width="${
      width > assetMaxWidth ? assetMaxWidth : width
    }" height="${height}" controls autoplay>
    <source src="${mediaUrl}" type="video/mp4">
    Your browser does not support the video tag.
    </video>
`;
};
</script>
<style lang="scss" scoped>
.hero {
  border: 1px solid #ccc;
  position: relative;
  padding: 5px;
  overflow: hidden;
}
.hero-thumb {
  display: block;
  width: 100%;
  &:hover {
    cursor: pointer;

    .hero-thumb-img {
      opacity: 0.8;
      transition: opacity 250ms;
    }
  }
}

.hero-thumb,
.hero-thumb-img {
  border-radius: 100%;
}

.hero-thumb-img {
  opacity: 0.5;
}

.hero-thumb-icon,
.hero-thumb-img {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  z-index: 1;
  width: 200px;
  height: 200px;
}

video {
  object-fit: fill;
}
</style>
