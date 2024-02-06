import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getYardList, addYard, deleteYard, editYard } from "@/api/operation";
// import { ElMessageBox } from "element-plus";
// import { tableData } from "./data";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";

export function useRole() {
  const form = reactive({
    id: "",
    is_dock: "",
    yard_name: "",
    port_name: "",
    yard_adress: "",
    contacts_name: "",
    mobile: "",
    remarks: "",
    longitude: "",
    latitude: "",
    base_price_20: "",
    base_price_40: "",
    create_time: ""
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
    pageSizes: [10, 20, 50, 100, 200, 500],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "类型",
      prop: "is_dock",
      formatter: ({ is_dock }) => {
        if (is_dock == 0) {
          return "堆场";
        } else {
          return "码头";
        }
      }
    },
    {
      label: "堆场名称",
      prop: "yard_name"
    },
    {
      label: "堆场地址",
      prop: "yard_adress"
    },
    {
      label: "堆场所属港口",
      prop: "port_name"
    },
    {
      label: "联系人",
      prop: "contacts_name"
    },
    {
      label: "联系电话",
      prop: "mobile"
    },
    {
      label: "备注",
      prop: "remarks"
    },
    {
      label: "经度",
      prop: "longitude"
    },
    {
      label: "纬度",
      prop: "latitude"
    },
    {
      label: "进场价格20",
      prop: "base_price_20"
    },
    {
      label: "进场价格40",
      prop: "base_price_40"
    },
    {
      label: "创建时间",
      prop: "create_time",
      formatter: ({ create_time }) =>
        dayjs(create_time).format("YYYY-MM-DD HH:mm:ss")
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
    writeFile(workBook, "堆场列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了堆场名称为${currentRow.value.yard_name}的这条数据`, {
      type: "success"
    });
    await deleteYard(currentRow.value);
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
    const { data } = await getYardList({
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

  async function handleAddYard(yard) {
    await addYard(yard);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}堆场`,
      props: {
        formInline: {
          id: row?.id ?? "",
          is_dock: row?.is_dock ?? "",
          yard_name: row?.yard_name ?? "",
          port_name: row?.port_name ?? "",
          yard_adress: row?.yard_adress ?? "",
          contacts_name: row?.contacts_name ?? "",
          mobile: row?.mobile ?? "",
          remarks: row?.remarks ?? "",
          longitude: row?.longitude ?? "",
          latitude: row?.latitude ?? "",
          base_price_20: row?.base_price_20 ?? "",
          base_price_40: row?.base_price_40 ?? ""
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
          message(`您${title}了堆场名称为${curData.yard_name}的这条数据`, {
            type: "success"
          });
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        FormRef.validate(valid => {
          if (valid) {
            // 表单规则校验通过
            if (title === "新增") {
              // 实际开发先调用新增接口，再进行下面操作
              handleAddYard(curData);
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

  async function asyncEdit(yard) {
    await editYard(yard);
  }

  // 双击行
  function handleRowDblclick(row) {
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
    handleCurrentChange,
    handlePageChange,
    handleSelectionChange
  };
}
