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
    xuhao: "",
    daima: "",
    haoma: "",
    shudianpiao: "",
    xiaofangsbh: "",
    xiaofangmc: "",
    goufangsbh: "",
    goufangmc: "",
    kaipiaoriqi: "",
    jine: "",
    shuie: "",
    jiashuiheji: "",
    laiyuan: "",
    piaozhong: "",
    zhuangtai: "",
    fengxiandengji: "",
    kaipiaoren: "",
    beizhu: "",
    shoukuanriqi: "",
    shoukuanjine: ""
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
      label: "序号",
      prop: "xuhao",
      minWidth: 100
    },
    {
      label: "发票代码",
      prop: "daima",
      minWidth: 100
    },
    {
      label: "发票号码",
      prop: "haoma",
      minWidth: 120
    },
    {
      label: "数电票号码",
      prop: "shudianpiao",
      minWidth: 150
    },
    {
      label: "销方识别号",
      prop: "xiaofangsbh",
      minWidth: 150
    },
    {
      label: "销方名称",
      prop: "xiaofangmc",
      minWidth: 150
    },
    {
      label: "购方识别号",
      prop: "goufangsbh",
      minWidth: 150
    },
    {
      label: "购买方名称",
      prop: "goufangmc",
      minWidth: 150
    },
    {
      label: "开票日期",
      prop: "kaipiaoriqi",
      minWidth: 150
    },
    {
      label: "金额",
      prop: "jine",
      minWidth: 150
    },
    {
      label: "税额",
      prop: "shuie",
      minWidth: 150
    },
    {
      label: "价税合计",
      prop: "jiashuiheji",
      minWidth: 150
    },
    {
      label: "发票来源",
      prop: "laiyuan",
      minWidth: 150
    },
    {
      label: "发票票种",
      prop: "piaozhong",
      minWidth: 150
    },
    {
      label: "发票状态",
      prop: "zhuangtai",
      minWidth: 150
    },
    {
      label: "发票风险等级",
      prop: "fengxiandengji",
      minWidth: 150
    },
    {
      label: "开票人",
      prop: "kaipiaoren",
      minWidth: 150
    },
    {
      label: "备注",
      prop: "beizhu",
      minWidth: 150
    },
    {
      label: "收款日期",
      prop: "shoukuanriqi",
      minWidth: 150
    },
    {
      label: "收款金额",
      prop: "shoukuanjine",
      minWidth: 150
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  // function onChange({ row, index }) {
  //   ElMessageBox.confirm(
  //     `确认要<strong>${
  //       row.status === 0 ? "停用" : "启用"
  //     }</strong><strong style='color:var(--el-color-primary)'>${
  //       row.name
  //     }</strong>吗?`,
  //     "系统提示",
  //     {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning",
  //       dangerouslyUseHTMLString: true,
  //       draggable: true
  //     }
  //   )
  //     .then(() => {
  //       switchLoadMap.value[index] = Object.assign(
  //         {},
  //         switchLoadMap.value[index],
  //         {
  //           loading: true
  //         }
  //       );
  //       setTimeout(() => {
  //         switchLoadMap.value[index] = Object.assign(
  //           {},
  //           switchLoadMap.value[index],
  //           {
  //             loading: false
  //           }
  //         );
  //         message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
  //           type: "success"
  //         });
  //       }, 300);
  //     })
  //     .catch(() => {
  //       row.status === 0 ? (row.status = 1) : (row.status = 0);
  //     });
  // }

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

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}发票信息`,
      props: {
        formInline: {
          xuhao: row?.xuhao ?? "",
          daima: row?.daima ?? "",
          haoma: row?.haoma ?? "",
          shudianpiao: row?.shudianpiao ?? "",
          xiaofangsbh: row?.xiaofangsbh ?? "",
          xiaofangmc: row?.xiaofangmc ?? "",
          goufangsbh: row?.goufangsbh ?? "",
          goufangmc: row?.goufangmc ?? "",
          kaipiaoriqi: row?.kaipiaoriqi ?? "",
          jine: row?.jine ?? "",
          shuie: row?.shuie ?? "",
          jiashuiheji: row?.jiashuiheji ?? "",
          laiyuan: row?.laiyuan ?? "",
          piaozhong: row?.piaozhong ?? "",
          zhuangtai: row?.zhuangtai ?? "",
          fengxiandengji: row?.fengxiandengji ?? "",
          kaipiaoren: row?.kaipiaoren ?? "",
          beizhu: row?.beizhu ?? "",
          shoukuanriqi: row?.shoukuanriqi ?? "",
          shoukuanjine: row?.shoukuanjine ?? ""
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
          message(`您${title}了发票号为${curData.haoma}的这条数据`, {
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
