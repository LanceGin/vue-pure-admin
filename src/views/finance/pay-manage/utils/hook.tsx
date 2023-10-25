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
    gongyingshang: "",
    jiesuandanwei: "",
    kaihuhang: "",
    yinhangzhanghao: "",
    fuwu: "",
    f: "",
    t: "",
    xiangliang: "",
    jiesuanjine: "",
    kouchu: "",
    zengjia: "",
    shifu: "",
    haoma: "",
    jizhangriqi: "",
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
      label: "状态",
      prop: "zhuangtai"
    },
    {
      label: "账期",
      prop: "zhangqi"
    },
    {
      label: "供应商名称",
      prop: "gongyingshang"
    },
    {
      label: "结算单位",
      prop: "jiesuandanwei"
    },
    {
      label: "开户行",
      prop: "kaihuhang"
    },
    {
      label: "银行账号",
      prop: "yinhangzhanghao"
    },
    {
      label: "服务内容",
      prop: "fuwu"
    },
    {
      label: "40",
      prop: "f"
    },
    {
      label: "20",
      prop: "t"
    },
    {
      label: "箱量合计",
      prop: "xiangliang"
    },
    {
      label: "结算金额",
      prop: "jiesuanjine"
    },
    {
      label: "扣除项目",
      prop: "kouchu"
    },
    {
      label: "增加项目",
      prop: "zengjia"
    },
    {
      label: "实付金额",
      prop: "shifu"
    },
    {
      label: "发票号码",
      prop: "haoma"
    },
    {
      label: "记账日期",
      prop: "jizhangriqi"
    },
    {
      label: "备注",
      prop: "beizhu"
    }
  ];

  function handleDelete() {
    message(`您删除了供应商名称为${currentRow.value.gongyingshang}的这条数据`, {
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
      title: `${title}应付记录`,
      props: {
        formInline: {
          zhuangtai: row?.zhuangtai ?? "",
          zhangqi: row?.zhangqi ?? "",
          gongyingshang: row?.gongyingshang ?? "",
          jiesuandanwei: row?.jiesuandanwei ?? "",
          kaihuhang: row?.kaihuhang ?? "",
          yinhangzhanghao: row?.yinhangzhanghao ?? "",
          fuwu: row?.fuwu ?? "",
          f: row?.f ?? "",
          t: row?.t ?? "",
          xiangliang: row?.xiangliang ?? "",
          jiesuanjine: row?.jiesuanjine ?? "",
          kouchu: row?.kouchu ?? "",
          zengjia: row?.zengjia ?? "",
          shifu: row?.shifu ?? "",
          haoma: row?.haoma ?? "",
          jizhangriqi: row?.jizhangriqi ?? "",
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
          message(`您${title}了供应商为${curData.gongyingshang}的这条数据`, {
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
