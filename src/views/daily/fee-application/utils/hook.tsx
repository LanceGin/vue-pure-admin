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
      type: "selection",
      align: "left"
    },
    {
      label: "状态",
      prop: "zhuangtai"
    },
    {
      label: "行政/业务",
      prop: "xingzhengyewu"
    },
    {
      label: "费用名称",
      prop: "feiyongming"
    },
    {
      label: "收/付",
      prop: "shoufu"
    },
    {
      label: "支付类型",
      prop: "zhifuleixing"
    },
    {
      label: "申请金额",
      prop: "shenqingjine"
    },
    {
      label: "报销金额",
      prop: "baoxiaojine"
    },
    {
      label: "税额",
      prop: "shuie"
    },
    {
      label: "申请人",
      prop: "shenqingren"
    },
    {
      label: "申请单位",
      prop: "shenqingdanwei"
    },
    {
      label: "录入时间",
      prop: "lurushijian"
    },
    {
      label: "报销人",
      prop: "baoxiaoren"
    },
    {
      label: "审核人",
      prop: "shenheren"
    },
    {
      label: "审核时间",
      prop: "shenheshijian"
    },
    {
      label: "审批人",
      prop: "shenpiren"
    },
    {
      label: "费用编号",
      prop: "feiyongbianhao"
    },
    {
      label: "备注",
      prop: "beizhu"
    },
    {
      label: "申请日期",
      prop: "shenqingriqi"
    }
  ];

  function handleDelete() {
    message(`您删除了费用名为${currentRow.value.feiyongming}的这条数据`, {
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
