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
    shuilv: "",
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
      label: "序号",
      prop: "xuhao"
    },
    {
      label: "发票代码",
      prop: "daima"
    },
    {
      label: "发票号码",
      prop: "haoma"
    },
    {
      label: "数电票号码",
      prop: "shudianpiao"
    },
    {
      label: "销方识别号",
      prop: "xiaofangsbh"
    },
    {
      label: "销方名称",
      prop: "xiaofangmc"
    },
    {
      label: "购方识别号",
      prop: "goufangsbh"
    },
    {
      label: "购买方名称",
      prop: "goufangmc"
    },
    {
      label: "开票日期",
      prop: "kaipiaoriqi"
    },
    {
      label: "金额",
      prop: "jine"
    },
    {
      label: "税率",
      prop: "shuilv"
    },
    {
      label: "税额",
      prop: "shuie"
    },
    {
      label: "价税合计",
      prop: "jiashuiheji"
    },
    {
      label: "发票来源",
      prop: "laiyuan"
    },
    {
      label: "发票票种",
      prop: "piaozhong"
    },
    {
      label: "发票状态",
      prop: "zhuangtai"
    },
    {
      label: "发票风险等级",
      prop: "fengxiandengji"
    },
    {
      label: "开票人",
      prop: "kaipiaoren"
    },
    {
      label: "备注",
      prop: "beizhu"
    },
    {
      label: "收款日期",
      prop: "shoukuanriqi"
    },
    {
      label: "收款金额",
      prop: "shoukuanjine"
    }
  ];

  function handleDelete() {
    message(`您删除了发票代码为${currentRow.value.daima}的这条数据`, {
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
