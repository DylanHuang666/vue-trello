<template>
  <div id="home">
    <!--头部-->
    <t-header></t-header>

    <main v-if="boards && inited">
      <h2>
        <span class="icon icon-board"></span>
        我的看板
      </h2>
      <ul class="board-items">
        <router-link
          v-for="board of boards"
          :key="board.id"
          class="board-item"
          tag="li"
          :to="{name: 'Board', params: {id: board.id}}"
        >
          <span class="title">{{board.name}}</span>
          <span class="title delete" @click.prevent="deleteBoard(board.id)">删除</span>
        </router-link>

        <li class="board-item create-new-board">
          <textarea
            class="title form-field-input"
            placeholder="+ 创建新看板"
            ref="newBoardName"
            @blur="postBoard"
            @keyup.13="postBoard"
          ></textarea>
        </li>
      </ul>
    </main>
  </div>
</template>

<script>
import THeader from "@/components/THeader";
import { mapState } from "vuex";

export default {
  name: "Home",

  components: {
    THeader
  },

  computed: {
    ...mapState("board", {
      boards: state => state.boards,
      inited: state => state.inited
    })
  },

  created() {
    if (!this.inited) {
      console.log(333)
      this.$store.dispatch("board/getBoards");
    }
  },

  methods: {
    postBoard() {
      let val = this.$refs.newBoardName.value;

      if (val.trim() !== "") {
        try {
          this.$store.dispatch("board/postBoard", {
            name: val
          });

          this.$message.success("面板创建成功");

          this.$refs.newBoardName.value = "";
        } catch (e) {}
      }
    },
    async deleteBoard(id) {
      try {
        await this.$store.dispatch("board/deleteBoard", id);

        this.$message.success("删除面板成功");
      } catch (e) {}
    }
  }
};
</script>

<style scoped>
#home .title.delete {
  color: #ddd;
  font-weight: normal;
  font-size: 14px;
  margin-left: 170px;
  height: auto;
  margin-bottom: 160px;
}
</style>>