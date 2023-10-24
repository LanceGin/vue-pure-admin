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
    feiyongmc: "",
    jine: "",
    zuoxiangshijian: "",
    kehu: "",
    qishigang: "",
    mudigang: "",
    matou: "",
    chuangongsi: "",
    chuanming: "",
    xiangfenghao: "",
    xianghao: "",
    yundanhao: "",
    xiangxing: "",
    danjuleibie: "",
    mendian: "",
    yewu: "",
    wanglaidanwei: "",
    cheliang: "",
    beizhu: "",
    fapiaohao: "",
    chedui: "",
    jiesuanhao: "",
    jihuahao: "",
    lururen: "",
    lurushijian: "",
    feiyongleixing: "",
    huidanbeizhu: ""
  });
  const formRef = ref();
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
      prop: "zhuangtai"
    },
    {
      label: "账期",
      prop: "zhangqi"
    },
    {
      label: "费用名称",
      prop: "feiyongmc"
    },
    {
      label: "金额",
      prop: "jine"
    },
    {
      label: "做箱时间",
      prop: "zuoxiangshijian"
    },
    {
      label: "客户简称",
      prop: "kehu"
    },
    {
      label: "起始港",
      prop: "qishigang"
    },
    {
      label: "目的港",
      prop: "mudigang"
    },
    {
      label: "码头",
      prop: "matou"
    },
    {
      label: "船公司",
      prop: "chuangongsi"
    },
    {
      label: "船名航次",
      prop: "chuanming"
    },
    {
      label: "箱封号",
      prop: "xiangfenghao"
    },
    {
      label: "箱号",
      prop: "xianghao"
    },
    {
      label: "运单号",
      prop: "yundanhao"
    },
    {
      label: "箱型",
      prop: "xiangxing"
    },
    {
      label: "单据类别",
      prop: "danjuleibie"
    },
    {
      label: "门点",
      prop: "mendian"
    },
    {
      label: "业务名称",
      prop: "yewu"
    },
    {
      label: "往来单位",
      prop: "wanglaidanwei"
    },
    {
      label: "车辆",
      prop: "cheliang"
    },
    {
      label: "备注",
      prop: "beizhu"
    },
    {
      label: "发票号",
      prop: "fapiaohao"
    },
    {
      label: "车队",
      prop: "chedui"
    },
    {
      label: "结算票据号",
      prop: "jiesuanhao"
    },
    {
      label: "计划号",
      prop: "jihuahao"
    },
    {
      label: "录入人",
      prop: "lururen"
    },
    {
      label: "录入时间",
      prop: "lurushijian"
    },
    {
      label: "费用类型",
      prop: "feiyongleixing"
    },
    {
      label: "回单备注",
      prop: "huidanbeizhu"
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
    multipleSelection.value = val;
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

  function openDialog(title = "应收", row?: FormItemProps) {
    addDialog({
      title: `${title}费用`,
      props: {
        formInline: {
          zhuangtai: row?.zhuangtai ?? "",
          zhangqi: row?.zhangqi ?? "",
          feiyongmc: row?.feiyongmc ?? "",
          jine: row?.jine ?? "",
          zuoxiangshijian: row?.zuoxiangshijian ?? "",
          kehu: row?.kehu ?? "",
          qishigang: row?.qishigang ?? "",
          mudigang: row?.mudigang ?? "",
          matou: row?.matou ?? "",
          chuangongsi: row?.chuangongsi ?? "",
          chuanming: row?.chuanming ?? "",
          xiangfenghao: row?.xiangfenghao ?? "",
          xianghao: row?.xianghao ?? "",
          yundanhao: row?.yundanhao ?? "",
          xiangxing: row?.xiangxing ?? "",
          danjuleibie: row?.danjuleibie ?? "",
          mendian: row?.mendian ?? "",
          yewu: row?.yewu ?? "",
          wanglaidanwei: row?.wanglaidanwei ?? "",
          cheliang: row?.cheliang ?? "",
          beizhu: row?.beizhu ?? "",
          fapiaohao: row?.fapiaohao ?? "",
          chedui: row?.chedui ?? "",
          jiesuanhao: row?.jiesuanhao ?? "",
          jihuahao: row?.jihuahao ?? "",
          lururen: row?.lururen ?? "",
          lurushijian: row?.lurushijian ?? "",
          feiyongleixing: row?.feiyongleixing ?? "",
          huidanbeizhu: row?.huidanbeizhu ?? ""
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
          message(`您${title}了费用名为${curData.feiyongmc}的这条数据`, {
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
