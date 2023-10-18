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
    xingzhengyewu: "",
    feiyongming: "",
    shoufu: "",
    zhifuleixing: "",
    shenqingjine: "",
    baoxiaojine: "",
    shuie: "",
    shenqingren: "",
    shenqingdanwei: "",
    lurushijian: "",
    baoxiaoren: "",
    shenheren: "",
    shenheshijian: "",
    shenpiren: "",
    feiyongbianhao: "",
    shenqingbianhao: "",
    beizhu: "",
    shenqingriqi: ""
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
      type: "selection",
      align: "left"
    },
    {
      label: "状态",
      prop: "zhuangtai",
      minWidth: 100
    },
    {
      label: "行政/业务",
      prop: "xingzhengyewu",
      minWidth: 120
    },
    {
      label: "费用名称",
      prop: "feiyongming",
      minWidth: 150
    },
    {
      label: "收/付",
      prop: "shoufu",
      minWidth: 150
    },
    {
      label: "支付类型",
      prop: "zhifuleixing",
      minWidth: 150
    },
    {
      label: "申请金额",
      prop: "shenqingjine",
      minWidth: 150
    },
    {
      label: "报销金额",
      prop: "baoxiaojine",
      minWidth: 150
    },
    {
      label: "税额",
      prop: "shuie",
      minWidth: 150
    },
    {
      label: "申请人",
      prop: "shenqingren",
      minWidth: 150
    },
    {
      label: "申请单位",
      prop: "shenqingdanwei",
      minWidth: 150
    },
    {
      label: "录入时间",
      prop: "lurushijian",
      minWidth: 150
    },
    {
      label: "报销人",
      prop: "baoxiaoren",
      minWidth: 150
    },
    {
      label: "审核人",
      prop: "shenheren",
      minWidth: 150
    },
    {
      label: "审核时间",
      prop: "shenheshijian",
      minWidth: 150
    },
    {
      label: "审批人",
      prop: "shenpiren",
      minWidth: 150
    },
    {
      label: "费用编号",
      prop: "feiyongbianhao",
      minWidth: 150
    },
    {
      label: "申请编号",
      prop: "shenqingbianhao",
      minWidth: 150
    },
    {
      label: "备注",
      prop: "beizhu",
      minWidth: 150
    },
    {
      label: "申请日期",
      prop: "shenqingriqi",
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

  function openDialog(title = "申请", row?: FormItemProps) {
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          zhuangtai: row?.zhuangtai ?? "",
          xingzhengyewu: row?.xingzhengyewu ?? "",
          feiyongming: row?.feiyongming ?? "",
          shoufu: row?.shoufu ?? "",
          zhifuleixing: row?.zhifuleixing ?? "",
          shenqingjine: row?.shenqingjine ?? "",
          baoxiaojine: row?.baoxiaojine ?? "",
          shuie: row?.shuie ?? "",
          shenqingren: row?.shenqingren ?? "",
          shenqingdanwei: row?.shenqingdanwei ?? "",
          lurushijian: row?.lurushijian ?? "",
          baoxiaoren: row?.baoxiaoren ?? "",
          shenheren: row?.shenheren ?? "",
          shenheshijian: row?.shenheshijian ?? "",
          shenpiren: row?.shenpiren ?? "",
          feiyongbianhao: row?.feiyongbianhao ?? "",
          shenqingbianhao: row?.shenqingbianhao ?? "",
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
          message(`您${title}了费用名为${curData.feiyongming}的这条数据`, {
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
