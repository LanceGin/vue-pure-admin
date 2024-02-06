// import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getRoleList } from "@/api/system";
// import { ElMessageBox } from "element-plus";
import { tableData } from "./data";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useRole() {
  const form = reactive({
    yucun: "",
    kahao: "",
    wanglaidanwei: "",
    fuwu: "",
    chongzhishijian: "",
    chongzhijine: "",
    xiaofeishijian: "",
    xiaofeijine: "",
    yue: "",
    caozuo: ""
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
  let dataList = tableData;
  const loading = ref(true);
  // const switchLoadMap = ref({});
  // const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "预存信息",
      prop: "yucun"
    },
    {
      label: "卡号/账号",
      prop: "kahao"
    },
    {
      label: "往来单位",
      prop: "wanglaidanwei"
    },
    {
      label: "服务内容",
      prop: "fuwu"
    },
    {
      label: "充值时间",
      prop: "chongzhishijian"
    },
    {
      label: "充值金额",
      prop: "chongzhijine"
    },
    {
      label: "消费时间",
      prop: "xiaofeishijian"
    },
    {
      label: "消费金额",
      prop: "xiaofeijine"
    },
    {
      label: "余额",
      prop: "yue"
    },
    {
      label: "操作人员",
      prop: "caozuo"
    }
  ];

  function handleDelete() {
    message(`您删除了角色名称为${currentRow.value.name}的这条数据`, {
      type: "success"
    });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val) {
    currentRow.value = val;
    haveRow.value = false;
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getRoleList(toRaw(form));
    dataList = data.list;
    pagination.total = data.total;
    pagination.pageSize = data.pageSize;
    pagination.currentPage = data.currentPage;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}预存记录`,
      props: {
        formInline: {
          yucun: row?.yucun ?? "",
          kahao: row?.kahao ?? "",
          wanglaidanwei: row?.wanglaidanwei ?? "",
          fuwu: row?.fuwu ?? "",
          chongzhishijian: row?.chongzhishijian ?? "",
          chongzhijine: row?.chongzhijine ?? "",
          xiaofeishijian: row?.xiaofeishijian ?? "",
          xiaofeijine: row?.xiaofeijine ?? "",
          yue: row?.yue ?? "",
          caozuo: row?.caozuo ?? ""
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          message(`您${title}了卡号为${curData.kahao}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            console.log("curData", curData);
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              chores();
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  // 双击行
  function handleRowDblclick(row) {
    console.log(row);
    openDialog("编辑", row);
  }

  /** 菜单权限 */
  function handleMenu() {
    message("等菜单管理页面开发后完善");
  }

  /** 数据权限 可自行开发 */
  // function handleDatabase() {}

  onMounted(() => {
    onSearch();
  });

  return {
    form,
    loading,
    haveRow,
    columns,
    dataList,
    pagination,
    // buttonClass,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleRowDblclick,
    handleEdit,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
