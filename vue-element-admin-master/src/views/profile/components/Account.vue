<template>
  <el-form>
    <el-form-item label="Name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { updateInfo } from "@/api/user";

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
        };
      },
    },
  },
  methods: {
    submit() {
      updateInfo(this.user).then((response) => {
        this.$message({
          message: "User information has been updated successfully",
          type: "success",
          duration: 5 * 1000,
        });
      });
    },
  },
};
</script>
