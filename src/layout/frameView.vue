<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ref, unref, nextTick, onMounted } from "vue";
// import { http } from "@/utils/http";
import { getSino } from "@/api/third";

defineOptions({
  name: "FrameView"
});

const { t } = useI18n();
const loading = ref(true);
const currentRoute = useRoute();
const frameSrc = ref<string>("");
const frameRef = ref<HTMLElement | null>(null);

if (unref(currentRoute.meta)?.frameSrc == "transportManage") {
  const data = {
    type: "transportManage"
  };
  getSino(data).then(result => {
    frameSrc.value = result.data.result;
  });
} else if (unref(currentRoute.meta)?.frameSrc == "pathTrack") {
  const data = {
    type: "pathTrack"
  };
  getSino(data).then(result => {
    frameSrc.value = result.data.result;
  });
}
unref(currentRoute.meta)?.frameLoading === false && hideLoading();

function hideLoading() {
  loading.value = false;
}

const param = {
  cid: "67f14880-43c9-4e56-9d43-1611ec224b1a",
  srt: "5895f81d-e674-4945-8dc9-914a2af38525",
  type: "pathTrack"
};

import hmacSHA1 from "crypto-js/hmac-sha1";

function processParam(param) {
  // eslint-disable-next-line no-prototype-builtins
  if (!param.hasOwnProperty("srt")) {
    throw new Error();
  }
  const srt = param["srt"];
  delete param["srt"];
  const paramValueList = [];
  for (const key in param) {
    // eslint-disable-next-line no-prototype-builtins
    if (param.hasOwnProperty(key)) {
      paramValueList.push(key + param[key]);
    }
  }
  paramValueList.sort();
  const data = paramValueList.join("");
  const signature = hmacSHA1(data, srt).toString();
  return signature.toUpperCase();
}

function init() {
  const sign = processParam(param);
  console.log(6666, sign.toUpperCase());
  // http
  //   .request("post", "https://zhiyunopenapi.95155.com/save/apis/pluginUrl", {
  //     data
  //   })
  //   .then(a => {
  //     console.log(11111, a);
  //   });
  nextTick(() => {
    const iframe = unref(frameRef);
    if (!iframe) return;
    const _frame = iframe as any;
    if (_frame.attachEvent) {
      _frame.attachEvent("onload", () => {
        hideLoading();
      });
    } else {
      iframe.onload = () => {
        hideLoading();
      };
    }
  });
}

onMounted(() => {
  init();
});
</script>

<template>
  <div
    class="frame"
    v-loading="loading"
    :element-loading-text="t('status.hsLoad')"
  >
    <iframe
      :src="frameSrc"
      class="frame-iframe"
      ref="frameRef"
      allow="accelerometer;gyroscope"
    />
  </div>
</template>

<style lang="scss" scoped>
.frame {
  z-index: 998;
  height: calc(100vh - 88px);

  .frame-iframe {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border: 0;
  }
}

.main-content {
  margin: 2px 0 0 !important;
}
</style>
