import dayjs from "dayjs";
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
  addContract,
  contractList,
  deleteContract,
  editContract
} from "@/api/daily";
import { showContract, uploadContract } from "@/api/third";
import { useUserStore } from "@/store/modules/user";
import { downloadByUrl } from "@pureadmin/utils";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    contract_no: "",
    sign_time: "",
    contract_name: "",
    type: "",
    content: "",
    we_company: "",
    oppo_company: "",
    we_agent: "",
    effective_time: "",
    end_time: "",
    total_amount: "",
    paid_amount: "",
    remain_amount: "",
    counts: "",
    department: "",
    status: "",
    remark: "",
    contract_url: "",
    add_by: user.username,
    city: user.city
  });
  const formRef = ref();
  const r_url = ref();
  const currentRow = ref();
  const selectRows = ref([]);
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
  const tableRowClassName = ({ row }) => {
    const a_time = dayjs(row.end_time).format("YYYY-MM-DD");
    const now_time = dayjs().format("YYYY-MM-DD");
    const delta_time = dayjs(a_time).diff(now_time, "day") + 1;
    if (delta_time < 30) {
      return "pure-success-row";
    }
    return "";
  };
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "合同编号",
      prop: "contract_no"
    },
    {
      label: "签订日期",
      prop: "sign_time",
      formatter: ({ sign_time }) => dayjs(sign_time).format("YYYY-MM-DD")
    },
    {
      label: "合同名称",
      prop: "contract_name"
    },
    {
      label: "合同类型",
      prop: "type"
    },
    {
      label: "主要事项/项目名称",
      prop: "content"
    },
    {
      label: "我方单位",
      prop: "we_company"
    },
    {
      label: "对方企业或个人",
      prop: "oppo_company"
    },
    {
      label: "我司经办人",
      prop: "we_agent"
    },
    {
      label: "生效日期",
      prop: "effective_time",
      formatter: ({ effective_time }) =>
        dayjs(effective_time).format("YYYY-MM-DD")
    },
    {
      label: "终止日期",
      prop: "end_time",
      formatter: ({ end_time }) => dayjs(end_time).format("YYYY-MM-DD")
    },
    // {
    //   label: "总价款",
    //   prop: "total_amount"
    // },
    // {
    //   label: "已支付金额",
    //   prop: "paid_amount"
    // },
    // {
    //   label: "余款",
    //   prop: "remain_amount"
    // },
    {
      label: "合同份数",
      prop: "counts"
    },
    {
      label: "签约承办部门",
      prop: "department"
    },
    {
      label: "合同履行情况",
      prop: "end_time",
      cellRenderer: ({ row }) => {
        const a_time = dayjs(row.end_time).format("YYYY-MM-DD");
        const now_time = dayjs().format("YYYY-MM-DD");
        const delta_time = dayjs(a_time).diff(now_time, "day") + 1;
        if (delta_time < 0) {
          return "到期终止";
        } else {
          return "履行中";
        }
      }
    },
    {
      label: "合同状态",
      prop: "status"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "合同",
      slot: "contract_url"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await contractList({
      pagination: export_pagination,
      form
    });
    const res = data.list.map(item => {
      const arr = [];
      columns.forEach(column => {
        if (column.prop == "sign_time") {
          if (item["sign_time"] == null) {
            arr.push("");
          } else {
            arr.push(dayjs(item["sign_time"]).format("YYYY-MM-DD"));
          }
        } else if (column.prop == "effective_time") {
          if (item["effective_time"] == null) {
            arr.push("");
          } else {
            arr.push(dayjs(item["effective_time"]).format("YYYY-MM-DD"));
          }
        } else if (column.prop == "end_time") {
          if (item["end_time"] == null) {
            arr.push("");
          } else {
            arr.push(dayjs(item["end_time"]).format("YYYY-MM-DD"));
          }
        } else {
          arr.push(item[column.prop as string]);
        }
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
    writeFile(workBook, "合同列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了合同名称为${currentRow.value.contract_name}的这条数据`, {
      type: "success"
    });
    await deleteContract(currentRow.value);
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
    selectRows.value = val;
    if (selectRows.value.length > 0) {
      haveRow.value = false;
    } else {
      haveRow.value = true;
    }
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await contractList({
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

  async function handleAddData(data) {
    await addContract(data);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}合同`,
      props: {
        formInline: {
          id: row?.id ?? "",
          contract_no: row?.contract_no ?? "",
          sign_time: row?.sign_time ?? "",
          contract_name: row?.contract_name ?? "",
          type: row?.type ?? "",
          content: row?.content ?? "",
          we_company: row?.we_company ?? "",
          oppo_company: row?.oppo_company ?? "",
          we_agent: row?.we_agent ?? "",
          effective_time: row?.effective_time ?? "",
          end_time: row?.end_time ?? "",
          total_amount: row?.total_amount ?? "",
          paid_amount: row?.paid_amount ?? "",
          remain_amount: row?.remain_amount ?? "",
          counts: row?.counts ?? "",
          department: row?.department ?? "",
          status: row?.status ?? "",
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
          message(`您${title}了合同名称为${curData.contract_name}的这条数据`, {
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
              handleAddData(curData);
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

  // 上传合同
  async function handleUploadContract(item) {
    const select_id = [];
    selectRows.value.forEach(v => {
      select_id.push(v.id);
    });
    const form = new FormData();
    form.append("file", item.file);
    form.append("contract_name", selectRows.value[0].contract_no);
    form.append("select_id", select_id.toString());
    await uploadContract(form);
  }

  // 查看水单
  async function handleDownloadContract(item) {
    console.log(item);
    showContract(item).then(data => {
      r_url.value = data.data.result[0];
      downloadByUrl(data.data.result[0].contract_url, "contract.pdf");
    });
  }

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(data) {
    await editContract(data);
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
    tableRowClassName,
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
    handleSelectionChange,
    handleUploadContract,
    handleDownloadContract
  };
}
