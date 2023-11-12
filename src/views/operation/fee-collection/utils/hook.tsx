// import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  addFeeCollection,
  deleteFeeCollection,
  editFeeCollection,
  getFeeCollectionList
} from "@/api/operation";

export function useRole() {
  const form = reactive({
    id: "",
    old_id: "",
    shipCompany: "",
    fleet_customer_id: "",
    fleetCompanyId: "",
    project: "",
    costType: "",
    isStart: "",
    costName: "",
    costCode: "",
    accountCompanyType: "",
    price_gp20: "",
    price_tk20: "",
    price_gp40: "",
    price_tk40: "",
    price_hc40: "",
    price_ot40: "",
    price_ot20: "",
    price_fr40: ""
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
  const dataList = ref([]);
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
      prop: "shipCompany"
    },
    {
      label: "车队公司",
      prop: "fleetCompanyId"
    },
    {
      label: "客户",
      prop: "fleet_customer_id"
    },
    {
      label: "项目",
      prop: "project"
    },
    {
      label: "费用类型",
      prop: "costType"
    },
    {
      label: "类型",
      prop: "isStart"
    },
    {
      label: "费用名称",
      prop: "costName"
    },
    {
      label: "费用代码",
      prop: "costCode"
    },
    {
      label: "往来单位类型",
      prop: "accountCompanyType"
    },
    {
      label: "20GP",
      prop: "price_gp20"
    },
    {
      label: "20TK",
      prop: "price_tk20"
    },
    {
      label: "40GP",
      prop: "price_gp40"
    },
    {
      label: "40TK",
      prop: "price_tk40"
    },
    {
      label: "40HC",
      prop: "price_hc40"
    },
    {
      label: "40OT",
      prop: "price_ot40"
    },
    {
      label: "20OT",
      prop: "price_ot20"
    },
    {
      label: "40FR",
      prop: "price_fr40"
    }
  ];

  function exportExcel() {
    const res = dataList.value.map(item => {
      const arr = [];
      columns.forEach(column => {
        arr.push(item[column.prop as string]);
      });
      return arr;
    });
    const titleList = [];
    columns.forEach(column => {
      titleList.push(column.label);
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "代收费用列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了费用id为${currentRow.value.id}的这条数据`, {
      type: "success"
    });
    await deleteFeeCollection(currentRow.value);
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
    pagination.pageSize = val;
    onSearch();
  }

  function handlePageChange(val: number) {
    console.log(`current page: ${val}`);
    pagination.currentPage = val;
    onSearch();
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
    const { data } = await getFeeCollectionList({
      pagination,
      form
    });
    dataList.value = data.list;
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

  async function handleAddFeeCollection(fee) {
    await addFeeCollection(fee);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}费用记录`,
      props: {
        formInline: {
          id: row?.id ?? "",
          old_id: row?.old_id ?? "",
          shipCompany: row?.shipCompany ?? "",
          fleet_customer_id: row?.fleet_customer_id ?? "",
          fleetCompanyId: row?.fleetCompanyId ?? "",
          project: row?.project ?? "",
          costType: row?.costType ?? "",
          isStart: row?.isStart ?? "",
          costName: row?.costName ?? "",
          costCode: row?.costCode ?? "",
          accountCompanyType: row?.accountCompanyType ?? "",
          price_gp20: row?.price_gp20 ?? "",
          price_tk20: row?.price_tk20 ?? "",
          price_gp40: row?.price_gp40 ?? "",
          price_tk40: row?.price_tk40 ?? "",
          price_hc40: row?.price_hc40 ?? "",
          price_ot40: row?.price_ot40 ?? "",
          price_ot20: row?.price_ot20 ?? "",
          price_fr40: row?.price_fr40 ?? ""
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
          message(`您${title}了费用id为${curData.id}的这条数据`, {
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
              handleAddFeeCollection(curData);
              chores();
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              asyncEdit(curData);
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

  async function asyncEdit(fee) {
    await editFeeCollection(fee);
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
    exportExcel,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleRowDblclick,
    handleEdit,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
