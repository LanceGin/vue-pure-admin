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
    bianhao: "",
    qiandingriqi: "",
    mingcheng: "",
    leixing: "",
    xiangmu: "",
    wofangdanwei: "",
    duifangdanwei: "",
    wofangjingban: "",
    duifangjingban: "",
    wofanglianxi: "",
    duifanglianxi: "",
    shengxiaoriqi: "",
    zhongzhiriqi: "",
    zongjiakuan: "",
    yizhifu: "",
    yukuan: "",
    fenshu: "",
    qianyuebumen: "",
    hetongzhuangtai: "",
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
      type: "selection",
      align: "left"
    },
    {
      label: "合同编号",
      prop: "bianhao"
    },
    {
      label: "签订日期",
      prop: "qiandingriqi"
    },
    {
      label: "合同名称",
      prop: "mingcheng"
    },
    {
      label: "合同类型",
      prop: "leixing"
    },
    {
      label: "主要事项/项目名称",
      prop: "xiangmu"
    },
    {
      label: "我方单位",
      prop: "wofangdanwei"
    },
    {
      label: "对方企业或个人",
      prop: "duifangdanwei"
    },
    {
      label: "我司经办人",
      prop: "wofangjingban"
    },
    {
      label: "生效日期",
      prop: "shengxiaoriqi"
    },
    {
      label: "终止日期",
      prop: "zhongzhiriqi"
    },
    {
      label: "总价款",
      prop: "zongjiakuan"
    },
    {
      label: "已支付金额",
      prop: "yizhifu"
    },
    {
      label: "余款",
      prop: "yukuan"
    },
    {
      label: "合同份数",
      prop: "fenshu"
    },
    {
      label: "签约承办部门",
      prop: "qianyuebumen"
    },
    {
      label: "合同履行情况",
      prop: "hetongzhuangtai"
    },
    {
      label: "备注",
      prop: "beizhu"
    }
  ];

  function handleDelete() {
    message(`您删除了编号为${currentRow.value.bianhao}的这条数据`, {
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
      title: `${title}合同`,
      props: {
        formInline: {
          bianhao: row?.bianhao ?? "",
          qiandingriqi: row?.qiandingriqi ?? "",
          mingcheng: row?.mingcheng ?? "",
          leixing: row?.leixing ?? "",
          xiangmu: row?.xiangmu ?? "",
          wofangdanwei: row?.wofangdanwei ?? "",
          duifangdanwei: row?.duifangdanwei ?? "",
          wofangjingban: row?.wofangjingban ?? "",
          duifangjingban: row?.duifangjingban ?? "",
          wofanglianxi: row?.wofanglianxi ?? "",
          duifanglianxi: row?.duifanglianxi ?? "",
          shengxiaoriqi: row?.shengxiaoriqi ?? "",
          zhongzhiriqi: row?.zhongzhiriqi ?? "",
          zongjiakuan: row?.zongjiakuan ?? "",
          yizhifu: row?.yizhifu ?? "",
          yukuan: row?.yukuan ?? "",
          fenshu: row?.fenshu ?? "",
          qianyuebumen: row?.qianyuebumen ?? "",
          hetongzhuangtai: row?.hetongzhuangtai ?? "",
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
          message(`您${title}了合同名称为${curData.mingcheng}的这条数据`, {
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
