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
    riqi: "",
    siji: "",
    suoshugongsi: "",
    chetouhao: "",
    cheguahao: "",
    cheliangfeiyong: "",
    zhuangtaineirong: "",
    shuliang: "",
    jine: "",
    fentanyuefen: "",
    shijijine: "",
    jiesuanqueren: "",
    fujian: "",
    beizhu: ""
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
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "日期",
      prop: "riqi"
    },
    {
      label: "司机",
      prop: "siji"
    },
    {
      label: "所属公司",
      prop: "suoshugongsi"
    },
    {
      label: "车头号",
      prop: "chetouhao"
    },
    {
      label: "车挂号",
      prop: "cheguahao"
    },
    {
      label: "车辆费用",
      prop: "cheliangfeiyong"
    },
    {
      label: "状态变化内容",
      prop: "zhuangtaineirong"
    },
    {
      label: "数量（升）",
      prop: "shuliang"
    },
    {
      label: "金额（元）",
      prop: "jine"
    },
    {
      label: "分摊月份",
      prop: "fentanyuefen"
    },
    {
      label: "实际金额",
      prop: "shijijine"
    },
    {
      label: "结算确认",
      prop: "jiesuanqueren"
    },
    {
      label: "附件",
      prop: "fujian"
    },
    {
      label: "备注",
      prop: "beizhu"
    }
  ];

  function handleDelete() {
    message(`您删除了司机为${currentRow.value.siji}的这条数据`, {
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
      title: `${title}费用`,
      props: {
        formInline: {
          riqi: row?.riqi ?? "",
          siji: row?.siji ?? "",
          suoshugongsi: row?.suoshugongsi ?? "",
          chetouhao: row?.chetouhao ?? "",
          cheguahao: row?.cheguahao ?? "",
          cheliangfeiyong: row?.cheliangfeiyong ?? "",
          zhuangtaineirong: row?.zhuangtaineirong ?? "",
          shuliang: row?.shuliang ?? "",
          jine: row?.jine ?? "",
          fentanyuefen: row?.fentanyuefen ?? "",
          shijijine: row?.shijijine ?? "",
          jiesuanqueren: row?.jiesuanqueren ?? "",
          fujian: row?.fujian ?? "",
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
          message(`您${title}了车牌号为${curData.siji}的这条数据`, {
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
