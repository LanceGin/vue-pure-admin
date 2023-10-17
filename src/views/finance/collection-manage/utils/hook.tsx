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
    zhuangtai: "",
    zhangqi: "",
    kehu: "",
    xiangmu: "",
    liuxiang: "",
    fuwu: "",
    f: "",
    t: "",
    xiangliang: "",
    yingshou: "",
    haoma: "",
    fapiaojine: "",
    shoukuan: "",
    weishoukuan: ""
  });
  const formRef = ref();
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
      label: "状态",
      prop: "zhuangtai",
      minWidth: 100
    },
    {
      label: "账期",
      prop: "zhangqi",
      minWidth: 120
    },
    {
      label: "客户名称",
      prop: "kehu",
      minWidth: 150
    },
    {
      label: "项目名称",
      prop: "xiangmu",
      minWidth: 150
    },
    {
      label: "流向",
      prop: "liuxiang",
      minWidth: 150
    },
    {
      label: "服务内容",
      prop: "fuwu",
      minWidth: 150
    },
    {
      label: "40",
      prop: "f",
      minWidth: 150
    },
    {
      label: "20",
      prop: "t",
      minWidth: 150
    },
    {
      label: "箱量合计",
      prop: "xiangliang",
      minWidth: 150
    },
    {
      label: "应收金额",
      prop: "yingshou",
      minWidth: 150
    },
    {
      label: "开票申请",
      width: 240,
      slot: "operation"
    },
    {
      label: "发票号码",
      prop: "haoma",
      minWidth: 150
    },
    {
      label: "发票金额",
      prop: "fapiaojine",
      minWidth: 150
    },
    {
      label: "收款金额",
      prop: "shoukuan",
      minWidth: 150
    },
    {
      label: "未收款金额",
      prop: "weishoukuan",
      minWidth: 150
    }
  ];

  function handleDelete(row) {
    message(`您删除了订单号为${row.order_no}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
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

  function openDialog(title = "开票", row?: FormItemProps) {
    addDialog({
      title: `${title}申请`,
      props: {
        formInline: {
          zhuangtai: row?.zhuangtai ?? "",
          zhangqi: row?.zhangqi ?? "",
          kehu: row?.kehu ?? "",
          xiangmu: row?.xiangmu ?? "",
          liuxiang: row?.liuxiang ?? "",
          fuwu: row?.fuwu ?? "",
          f: row?.f ?? "",
          t: row?.t ?? "",
          xiangliang: row?.xiangliang ?? "",
          yingshou: row?.yingshou ?? "",
          haoma: row?.haoma ?? "",
          fapiaojine: row?.fapiaojine ?? "",
          shoukuan: row?.shoukuan ?? "",
          weishoukuan: row?.weishoukuan ?? ""
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
          message(`您${title}了项目名为${curData.xiangmu}的这条数据`, {
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
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
