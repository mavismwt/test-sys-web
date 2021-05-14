 
const assign = {
  actions: {

  },
  state: {
    assign_id:0,
    title:""
  },
  mutations: {
    // 保存提交信息
    setAssignId (state, assign_id) {
      state.assign_id = assign_id;
      localStorage.setItem('assign_id',assign_id);
    },
    setTitle (state, title) {
      state.title = title;
      localStorage.setItem('title', title);
    },
  }
}
export default assign