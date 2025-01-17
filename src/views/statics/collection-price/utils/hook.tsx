import { utils, writeFile } from "xlsx";
import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  addDoorPrice,
  deleteDoorPrice,
  editDoorPrice,
  getDoorPriceList,
  importDoorPrice
} from "@/api/statics";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    is_pay: "0",
    status: "",
    customer: "",
    project: "",
    door: "",
    port: "",
    i20gp: "",
    i40gp: "",
    i20tk: "",
    i40hc: "",
    o20gp: "",
    o40gp: "",
    o20tk: "",
    o40hc: "",
    add_time: "",
    add_by: user.username,
    city: user.city
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
  const selectRows = ref([]);
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
      type: "selection",
      align: "left"
    },
    // {
    //   label: "状态",
    //   cellRenderer: ({ row, props }) => (
    //     <el-tag size={props.size} style={tagStyle.value(Number(row.status))}>
    //       {row.status == 1 ? "有效" : "无效"}
    //     </el-tag>
    //   )
    // },
    {
      label: "客户",
      prop: "customer"
    },
    {
      label: "项目",
      prop: "project"
    },
    {
      label: "作业点",
      prop: "door"
    },
    {
      label: "提箱点",
      prop: "port"
    },
    {
      label: "拆箱",
      children: [
        {
          label: "20GP",
          prop: "i20gp"
        },
        {
          label: "40GP",
          prop: "i40gp"
        },
        {
          label: "20TK",
          prop: "i20tk"
        },
        {
          label: "40HC",
          prop: "i40hc"
        }
      ]
    },
    {
      label: "装箱",
      children: [
        {
          label: "20GP",
          prop: "o20gp"
        },
        {
          label: "40GP",
          prop: "o40gp"
        },
        {
          label: "20TK",
          prop: "o20tk"
        },
        {
          label: "40HC",
          prop: "o40hc"
        }
      ]
    },
    {
      label: "创建时间",
      prop: "add_time",
      formatter: ({ add_time }) => dayjs(add_time).format("YYYY-MM-DD HH:mm:ss")
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await getDoorPriceList({
      pagination: export_pagination,
      form
    });
    const res = data.list.map(item => {
      const arr = [];
      columns.forEach(column => {
        if (column.label == "拆箱" || column.label == "装箱") {
          column.children.forEach(c => {
            arr.push(item[c.prop as string]);
          });
        } else {
          arr.push(item[column.prop as string]);
        }
      });
      return arr;
    });
    const titleList = [];
    columns.forEach(column => {
      if (column.label == "拆箱" || column.label == "装箱") {
        column.children.forEach(c => {
          titleList.push(c.label + column.label);
        });
      } else {
        titleList.push(column.label);
      }
    });
    res.unshift(titleList);
    const workSheet = utils.aoa_to_sheet(res);
    const workBook = utils.book_new();
    utils.book_append_sheet(workBook, workSheet, "数据报表");
    writeFile(workBook, "门点应收价格列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    const data = {
      select_id: [],
      select_customer: []
    };
    selectRows.value.forEach(v => {
      data.select_id.push(v.id);
      data.select_customer.push(v.customer);
    });
    message(`您删除了客户为为${data.select_customer}的数据`, {
      type: "success"
    });
    await deleteDoorPrice(data).then(() => {
      onSearch();
    });
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
    selectRows.value = val;
    if (selectRows.value.length > 0) {
      haveRow.value = false;
    } else {
      haveRow.value = true;
    }
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getDoorPriceList({
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

  async function handleAddDoorPrice(door_price) {
    await addDoorPrice(door_price);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}价格`,
      props: {
        formInline: {
          id: row?.id ?? "",
          is_pay: row?.is_pay ?? "0",
          status: row?.status ?? "",
          customer: row?.customer ?? "",
          project: row?.project ?? "",
          door: row?.door ?? "",
          port: row?.port ?? "",
          i20gp: row?.i20gp ?? "",
          i40gp: row?.i40gp ?? "",
          i20tk: row?.i20tk ?? "",
          i40hc: row?.i40hc ?? "",
          o20gp: row?.o20gp ?? "",
          o40gp: row?.o40gp ?? "",
          o20tk: row?.o20tk ?? "",
          o40hc: row?.o40hc ?? "",
          add_time: row?.add_time ?? "",
          add_by: row?.add_by ?? user.username,
          city: row?.city ?? user.city
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
          message(`您${title}了客户名称为${curData.customer}的这条数据`, {
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
              handleAddDoorPrice(curData).then(() => {
                chores();
              });
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              asyncEdit(curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  // 上传文件批量导入
  async function uploadExcelDetail(item) {
    const form = new FormData();
    form.append("file", item.file);
    form.append("is_pay", "0");
    form.append("add_by", user.username);
    form.append("city", user.city);
    await importDoorPrice(form);
  }

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(door_price) {
    await editDoorPrice(door_price);
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
    uploadExcelDetail,
    handleRowDblclick,
    handleEdit,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
