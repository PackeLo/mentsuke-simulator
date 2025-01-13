<script lang="ts" setup>
const pageNum = ref(4);
const errorMsg = ref("");
const hasCover = ref(true);
const binding:Ref<"left" | "right"> = ref("left");

const coverMentsuke = computed(() => {
  return {
    front: {
      left: binding.value === "left" ? "裏表紙" : "表紙",
      right: binding.value === "left" ? "表紙" : "裏表紙"
    },
    back: {
      left: binding.value === "left" ? "表紙\n(裏)" : "裏表紙\n(裏)",
      right: binding.value === "left" ? "裏表紙\n(裏)" : "表紙\n(裏)",
    }
  };
})

const mentsukeResult = computed(() => {
  errorMsg.value = "";
  if(pageNum.value % 4 !== 0) {
    errorMsg.value = "ページ数は 4 の倍数である必要があります"
    return [];
  }

  const baseArr = new Array(pageNum.value / 2);
  const array = baseArr.fill(null)
    .map((_,key) => {
      const front1 = pageNum.value - key * 2;
      const front2 = key * 2 + 1;
      const back1 = key * 2 + 2;
      const back2 = pageNum.value - key * 2 - 1;

      return {
        front: {
          left: binding.value === "left" ? front1 : front2,
          right: binding.value === "left" ? front2 : front1
        },
        back: {
          left: binding.value === "left" ? back1 : back2,
          right: binding.value === "left" ? back2 : back1
        }
      };
    });

  return array.slice(0, array.length / 2);
});

const printTrigger = () => {
  window.print();
}

const helpTrigger = () => {
  window.alert(
    "結果を印刷するヘルプ：\n\n面付け結果を見本小冊子として印刷できます。\n※印刷する際は両面印刷をご利用ください。"
  );
}
</script>

<template>
  <!-- 画面 -->
  <div class="print:hidden p-6">
    <h1 class="text-2xl font-bold">中綴じ 面付けシミュレーター</h1>

    <fieldset class="mt-5">
      <legend>
        ページ数を入力してください。
      </legend>

      <div class="my-2">
        <input type="number" name="page_num" v-model="pageNum" min="4">
        <div class="text-[red]">{{ errorMsg }}</div>
      </div>

      <label class="mr-5">
        <input name="has_cover" type="checkbox" v-model="hasCover">
        表紙あり
      </label>
      <label>
        綴じ方
      <select name="binding" v-model="binding">
        <option value="left">左綴じ</option>
        <option value="right">右綴じ</option>
      </select>
      </label>
    </fieldset>

    <div class="flex gap-x-3 items-center mt-8">
      <h3 class="text-xl font-bold">面付け結果</h3>
      <button class="border border-black rounded-sm p-1 bg-blue-600 text-white hover:opacity-70" @click="printTrigger">結果を印刷する</button>
      <button class="border border-black rounded-full px-1" @click="helpTrigger()">？</button>
    </div>
    <div class="flex flex-wrap gap-3 mt-3">
      <div v-if="hasCover && mentsukeResult.length" class="bg-neutral-200">
          <div>
            表
            <div class="flex">
              <div class="p-4 border border-black bg-white w-[5rem] h-[7rem] text-sm flex justify-center items-center">{{ coverMentsuke.front.left }}</div>
              <div class="p-4 border border-black bg-white w-[5rem] h-[7rem] text-sm flex justify-center items-center">{{ coverMentsuke.front.right }}</div>
            </div>
          </div>

          <div>
            裏
            <div class="flex">
              <div class="p-4 border border-black bg-white whitespace-pre-line w-[5rem] h-[7rem] text-sm flex justify-center items-center">{{ coverMentsuke.back.left }}</div>
              <div class="p-4 border border-black bg-white whitespace-pre-line w-[5rem] h-[7rem] text-sm flex justify-center items-center">{{ coverMentsuke.back.right }}</div>
            </div>
          </div>
        </div>

      <template v-for="resultValue in mentsukeResult">    
        <div class="bg-neutral-200">
          <div>
            表
            <div class="flex">
              <div class="p-4 border-black bg-white border w-[5rem] h-[7rem] flex justify-center items-center">{{ resultValue.front.left }}</div>
              <div class="p-4 border-black bg-white border w-[5rem] h-[7rem] flex justify-center items-center">{{ resultValue.front.right }}</div>
            </div>
          </div>

          <div>
            裏
            <div class="flex">
              <div class="p-4 border-black bg-white border w-[5rem] h-[7rem] flex justify-center items-center">{{ resultValue.back.left }}</div>
              <div class="p-4 border-black bg-white border w-[5rem] h-[7rem] flex justify-center items-center">{{ resultValue.back.right }}</div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>

  <!-- 印刷 -->
  <div class="hidden print:block h-screen w-screen">
    <template v-if="hasCover">
      <div class="grid grid-cols-2 place-items-stretch h-full w-full break-after-all">
        <div class="border border-black flex justify-center items-center">{{ coverMentsuke.front.left }}</div>
        <div class="border border-black flex justify-center items-center">{{ coverMentsuke.front.right }}</div>
      </div>

      <div class="grid grid-cols-2 place-items-stretch h-full w-full break-after-all">
        <div class="border border-black flex justify-center items-center">{{ coverMentsuke.back.left }}</div>
        <div class="border border-black flex justify-center items-center">{{ coverMentsuke.back.right }}</div>
      </div>
    </template>

    <template v-for="resultValue in mentsukeResult">
      <div class="grid grid-cols-2 place-items-stretch h-full w-full break-after-all">
        <div class="border border-black flex justify-center items-center">{{ resultValue.front.left }}</div>
        <div class="border border-black flex justify-center items-center">{{ resultValue.front.right }}</div>
      </div>

      <div class="grid grid-cols-2 place-items-stretch h-full w-full break-after-all">
        <div class="border border-black flex justify-center items-center">{{ resultValue.back.left }}</div>
        <div class="border border-black flex justify-center items-center">{{ resultValue.back.right }}</div>
      </div>
    </template>
  </div>
</template>

<style>
@page { size: landscape }
</style>
