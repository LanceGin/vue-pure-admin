// import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getRoleList } from "@/api/system";
// import { ElMessageBox } from "element-plus";
import { tableData } from "./data";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";
// import { func } from "vue-types";

export function useRole() {
  const form = reactive({
    riqi: "",
    leixing: "",
    kehu: "",
    chengyunchedui: "",
    zhuanghuo: "",
    xiehuo: "",
    chexing: "",
    chehao: "",
    shoujihao: "",
    yunfei: "",
    beizhu: ""
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
  let dataList = tableData;
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "日期",
      prop: "riqi"
    },
    {
      label: "客户",
      prop: "kehu"
    },
    {
      label: "承运车队",
      prop: "chengyunchedui"
    },
    {
      label: "装货地址",
      prop: "zhuanghuo"
    },
    {
      label: "卸货地址",
      prop: "xiehuo"
    },
    {
      label: "车型",
      prop: "chexing"
    },
    {
      label: "车号",
      prop: "chehao"
    },
    {
      label: "驾驶员手机号",
      prop: "shoujihao"
    },
    {
      label: "运费",
      prop: "yunfei"
    },
    {
      label: "备注",
      prop: "beizhu"
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
      title: `${title}散货记录`,
      props: {
        formInline: {
          riqi: row?.riqi ?? "",
          leixing: row?.leixing ?? "",
          kehu: row?.kehu ?? "",
          chengyunchedui: row?.chengyunchedui ?? "",
          zhuanghuo: row?.zhuanghuo ?? "",
          xiehuo: row?.xiehuo ?? "",
          chexing: row?.chexing ?? "",
          chehao: row?.chehao ?? "",
          shoujihao: row?.shoujihao ?? "",
          yunfei: row?.yunfei ?? "",
          beizhu: row?.beizhu ?? ""
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
          message(`您${title}了客户名称为${curData.kehu}的这条数据`, {
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
    console.log(haveRow.value);
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
    handleEdit,
    handleRowDblclick,
    // handleDatabase,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
