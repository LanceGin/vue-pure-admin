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
  addPayInvoice,
  deletePayInvoice,
  payInvoicetList,
  registerPayInvoice
} from "@/api/finance";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
    code: "",
    no: "",
    digital_ticket_no: "",
    seller_identification_no: "",
    seller_name: "",
    buyer_identification_no: "",
    buyer_name: "",
    invoice_time: "",
    classification_code: "",
    specific_type: "",
    goods_or_taxable_service: "",
    specification: "",
    unit: "",
    quantity: "",
    unit_price: "",
    amount: "",
    tax_rate: "",
    tax: "",
    total_amount: "",
    invoice_from: "",
    invoice_type: "",
    status: "",
    is_positive: "",
    risk_level: "",
    invoice_by: user.username,
    remark: "",
    is_invoice: "",
    paid_time: "",
    certification_period: ""
  });
  const formRef = ref();
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
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "全电发票号码",
      prop: "digital_ticket_no"
    },
    {
      label: "发票代码",
      prop: "code"
    },
    {
      label: "发票号码",
      prop: "no"
    },
    {
      label: "开票日期",
      prop: "invoice_time",
      formatter: ({ invoice_time }) => dayjs(invoice_time).format("YYYY-MM-DD")
    },
    {
      label: "金额",
      prop: "amount"
    },
    {
      label: "税额",
      prop: "tax"
    },
    {
      label: "价税合计",
      prop: "total_amount"
    },
    {
      label: "购买方名称",
      prop: "buyer_name"
    },
    {
      label: "销方名称",
      prop: "seller_name"
    },
    {
      label: "发票票种",
      prop: "invoice_type"
    },
    {
      label: "入账月份",
      prop: "is_invoice"
    },
    {
      label: "付款日期",
      prop: "paid_time",
      formatter: ({ paid_time }) => dayjs(paid_time).format("YYYY-MM")
    },
    {
      label: "认证期",
      prop: "certification_period",
      formatter: ({ certification_period }) =>
        dayjs(certification_period).format("YYYY-MM")
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await payInvoicetList({
      pagination: export_pagination,
      form
    });
    const res = data.list.map(item => {
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
    writeFile(workBook, "开票列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了发票代码为${currentRow.value.code}的这条数据`, {
      type: "success"
    });
    await deletePayInvoice(currentRow.value);
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
    // haveRow.value = false;
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
    const { data } = await payInvoicetList({
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
    await addPayInvoice(data);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}发票信息`,
      props: {
        formInline: {
          id: row?.id ?? "",
          code: row?.code ?? "",
          no: row?.no ?? "",
          digital_ticket_no: row?.digital_ticket_no ?? "",
          seller_identification_no: row?.seller_identification_no ?? "",
          seller_name: row?.seller_name ?? "",
          buyer_identification_no: row?.buyer_identification_no ?? "",
          buyer_name: row?.buyer_name ?? "",
          invoice_time: row?.invoice_time ?? "",
          classification_code: row?.classification_code ?? "",
          specific_type: row?.specific_type ?? "",
          goods_or_taxable_service: row?.goods_or_taxable_service ?? "",
          specification: row?.specification ?? "",
          unit: row?.unit ?? "",
          quantity: row?.quantity ?? "",
          unit_price: row?.unit_price ?? "",
          amount: row?.amount ?? "",
          tax_rate: row?.tax_rate ?? "",
          tax: row?.tax ?? "",
          total_amount: row?.total_amount ?? "",
          invoice_from: row?.invoice_from ?? "",
          invoice_type: row?.invoice_type ?? "",
          status: row?.status ?? "",
          is_positive: row?.is_positive ?? "",
          risk_level: row?.risk_level ?? "",
          invoice_by: row?.invoice_by ?? user.username,
          remark: row?.remark ?? "",
          is_invoice: row?.is_invoice ?? "",
          paid_time: row?.paid_time ?? "",
          certification_period: row?.certification_period ?? ""
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
          message(`您${title}了发票号为${curData.no}的这条数据`, {
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

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  async function asyncEdit(curData) {
    const data = {
      select_id: [],
      form: curData
    };
    selectRows.value.forEach(v => {
      data.select_id.push(v.id);
    });
    await registerPayInvoice(data);
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
