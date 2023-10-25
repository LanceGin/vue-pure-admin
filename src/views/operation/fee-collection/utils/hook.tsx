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
    boat_company: "",
    car_company: "",
    name: "",
    project: "",
    fee_cata: "",
    cata: "",
    fee_name: "",
    fee_code: "",
    company_type: "",
    gp20: "",
    tk20: "",
    gp40: "",
    tk40: "",
    hc40: "",
    ot40: "",
    ot20: "",
    fr40: ""
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
      label: "船公司",
      prop: "boat_company"
    },
    {
      label: "车队公司",
      prop: "car_company"
    },
    {
      label: "客户",
      prop: "name"
    },
    {
      label: "项目",
      prop: "project"
    },
    {
      label: "费用类型",
      prop: "fee_cata"
    },
    {
      label: "类型",
      prop: "cata"
    },
    {
      label: "费用名称",
      prop: "fee_name"
    },
    {
      label: "费用代码",
      prop: "fee_code"
    },
    {
      label: "往来单位类型",
      prop: "company_type"
    },
    {
      label: "20GP",
      prop: "gp20"
    },
    {
      label: "20TK",
      prop: "tk20"
    },
    {
      label: "40GP",
      prop: "gp40"
    },
    {
      label: "40TK",
      prop: "tk40"
    },
    {
      label: "40HC",
      prop: "hc40"
    },
    {
      label: "40OT",
      prop: "ot40"
    },
    {
      label: "20OT",
      prop: "ot20"
    },
    {
      label: "40FR",
      prop: "fr40"
    }
  ];

  function handleDelete() {
    message(`您删除了角色名称为${currentRow.value.name}的这条数据`, {
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
      title: `${title}费用记录`,
      props: {
        formInline: {
          boat_company: row?.boat_company ?? "",
          car_company: row?.car_company ?? "",
          name: row?.name ?? "",
          project: row?.project ?? "",
          fee_cata: row?.fee_cata ?? "",
          cata: row?.cata ?? "",
          fee_name: row?.fee_name ?? "",
          fee_code: row?.fee_code ?? "",
          company_type: row?.company_type ?? "",
          gp20: row?.gp20 ?? "",
          tk20: row?.tk20 ?? "",
          gp40: row?.gp40 ?? "",
          tk40: row?.tk40 ?? "",
          hc40: row?.hc40 ?? "",
          ot40: row?.ot40 ?? "",
          ot20: row?.ot20 ?? "",
          fr40: row?.fr40 ?? ""
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
          message(`您${title}了角色名称为${curData.name}的这条数据`, {
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
