<template>
  <router-link
    :to="{name: 'Card', params:{listId: data.boardListId, cardId: data.id}}"
    class="list-card"
    v-if="data"
  >
    <div
      v-if="data.coverPath"
      class="list-card-cover"
      :style="'background-image: url('+ server.staticPath + data.coverPath +');'"
    ></div>
    <div class="list-card-title">{{data.name}}</div>
    <div class="list-card-badges">
      <div class="badge" v-if="data.description">
        <span class="icon icon-description"></span>
      </div>
      <div class="badge" v-if="data.commentCount > 0">
        <span class="icon icon-comment"></span>
        <span class="text">{{data.commentCount}}</span>
      </div>
      <div class="badge" v-if="Array.isArray(data.attachments) && data.attachments.length > 0">
        <span class="icon icon-attachment"></span>
        <span class="text">{{data.attachments.length}}</span>
      </div>
      <div class="badge delete">
        <span @click.prevent="deleteCard">删除卡片</span>
      </div>     
    </div>
  </router-link>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TCard",

  props: {
    data: {
      type: Object
    }
  },
  computed: {
    ...mapState(['server'])
  },
  methods: {
    async deleteCard(){
      await this.$store.dispatch("card/deleteCard", this.data.id);
      this.$message.success("删除成功");
    }
  }
};
</script>
<style scoped>
  .delete{
    margin-left: 6px;
  }
</style>>