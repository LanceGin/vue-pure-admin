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
    status: "",
    yewu: "",
    name: "",
    zhifu: "",
    zhifu_type: "",
    amount: "",
    submit: "",
    tax: "",
    apply_staff: "",
    add_time: "",
    submit_staff: "",
    shenqingdanwei: "",
    shenhe: "",
    shenpi: "",
    jizhang: "",
    feiyongbianhao: "",
    jizhang_time: "",
    remark: ""
  });
  const formRef = ref();
  const haveRow = ref(true);
  const multipleSelection = ref([]);
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
      prop: "status"
    },
    {
      label: "行政/业务",
      prop: "yewu"
    },
    {
      label: "费用名称",
      prop: "name"
    },
    {
      label: "收/付",
      prop: "zhifu"
    },
    {
      label: "支付类型",
      prop: "zhifu_type"
    },
    {
      label: "申请金额",
      prop: "amount"
    },
    {
      label: "报销金额",
      prop: "submit"
    },
    {
      label: "税额",
      prop: "tax"
    },
    {
      label: "申请人",
      prop: "apply_staff"
    },
    {
      label: "申请单位",
      prop: "shenqingdanwei"
    },
    {
      label: "录入时间",
      prop: "add_time"
    },
    {
      label: "报销人",
      prop: "submit_staff"
    },
    {
      label: "审核人",
      prop: "shenhe"
    },
    {
      label: "审批人",
      prop: "shenpi"
    },
    {
      label: "记账人",
      prop: "jizhang"
    },
    {
      label: "费用编号",
      prop: "feiyongbianhao"
    },
    {
      label: "记账时间",
      prop: "jizhang_time"
    },
    {
      label: "备注",
      prop: "remark"
    }
  ];

  function handleDelete() {
    message(`您删除了费用名为${multipleSelection.value}的这条数据`, {
      type: "success"
    });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    multipleSelection.value = val;
    if (multipleSelection.value.length != 0) {
      haveRow.value = false;
    } else {
      haveRow.value = true;
    }
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
      title: `${title}费用记录`,
      props: {
        formInline: {
          status: row?.status ?? "",
          yewu: row?.yewu ?? "",
          name: row?.name ?? "",
          zhifu: row?.zhifu ?? "",
          zhifu_type: row?.zhifu_type ?? "",
          amount: row?.amount ?? "",
          submit: row?.submit ?? "",
          tax: row?.tax ?? "",
          apply_staff: row?.apply_staff ?? "",
          add_time: row?.add_time ?? "",
          submit_staff: row?.submit_staff ?? "",
          shenqingdanwei: row?.shenqingdanwei ?? "",
          shenhe: row?.shenhe ?? "",
          shenpi: row?.shenpi ?? "",
          jizhang: row?.jizhang ?? "",
          feiyongbianhao: row?.feiyongbianhao ?? "",
          jizhang_time: row?.jizhang_time ?? "",
          remark: row?.remark ?? ""
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
          message(`您${title}了费用名为${curData.name}的这条数据`, {
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
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
