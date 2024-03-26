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
  generateShipFee,
  getLighteringList,
  importYtoj
} from "@/api/operation";

export function useRole() {
  const form = reactive({
    id: "",
    type: "0",
    add_time: "",
    voyage: "",
    voyage_index: "",
    container_no: "",
    seal_no: "",
    customs_container_type: "",
    iso: "",
    container_type: "",
    container_holder: "",
    is_import: "",
    extra_operation: "",
    trade_type: "",
    bl_no: "",
    cargo_name: "",
    load_port: "",
    target_port: "",
    unload_port: "",
    load_payer: "",
    unload_payer: "",
    total_weight: "",
    cargo_weight: "",
    empty_weight: "",
    volume: "",
    amount: "",
    cargo_owner: "",
    forwarder: "",
    transfer_type: "",
    remarks: ""
  });
  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "日期",
      prop: "add_time",
      formatter: ({ add_time }) => dayjs(add_time).format("YYYY-MM-DD"),
      minWidth: 100
    },
    {
      label: "船名航次",
      prop: "voyage"
    },
    {
      label: "箱号",
      prop: "container_no",
      minWidth: 120
    },
    {
      label: "提单号",
      prop: "bl_no",
      minWidth: 120
    },
    {
      label: "海关箱类型",
      prop: "customs_container_type"
    },
    {
      label: "ISO",
      prop: "iso"
    },
    {
      label: "船公司箱型",
      prop: "container_type"
    },
    {
      label: "持箱人",
      prop: "container_holder"
    },
    {
      label: "进出口",
      prop: "is_import"
    },
    {
      label: "附加操作",
      prop: "extra_operation"
    },
    {
      label: "贸易类型",
      prop: "trade_type"
    },
    {
      label: "铅封号",
      prop: "seal_no"
    },
    {
      label: "货名",
      prop: "cargo_name"
    },
    {
      label: "装货港",
      prop: "load_port"
    },
    {
      label: "目的港",
      prop: "target_port"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await getLighteringList({
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
    writeFile(workBook, "阳逻-金口列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  function handleDelete(row) {
    message(`您删除了箱号为${row.container_no}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
    pagination.pageSize = val;
    onSearch();
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
    pagination.currentPage = val;
    onSearch();
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  // 上传文件批量导入
  async function uploadExcelDetail(item) {
    const form = new FormData();
    form.append("file", item.file);
    const { data } = await importYtoj(form);
    const select_item = {
      select_item: data.list
    };
    generateShipFee(select_item);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getLighteringList({
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

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}驳运记录`,
      props: {
        formInline: {
          id: row?.id ?? "",
          type: row?.type ?? "0",
          add_time: row?.add_time ?? "",
          voyage: row?.voyage ?? "",
          container_no: row?.container_no ?? "",
          seal_no: row?.seal_no ?? "",
          customs_container_type: row?.customs_container_type ?? "",
          iso: row?.iso ?? "",
          container_type: row?.container_type ?? "",
          container_holder: row?.container_holder ?? "",
          is_import: row?.is_import ?? "",
          extra_operation: row?.extra_operation ?? "",
          trade_type: row?.trade_type ?? "",
          bl_no: row?.bl_no ?? "",
          cargo_name: row?.cargo_name ?? "",
          load_port: row?.load_port ?? "",
          target_port: row?.target_port ?? "",
          unload_port: row?.unload_port ?? "",
          load_payer: row?.load_payer ?? "",
          unload_payer: row?.unload_payer ?? "",
          total_weight: row?.total_weight ?? "",
          cargo_weight: row?.cargo_weight ?? "",
          empty_weight: row?.empty_weight ?? "",
          volume: row?.volume ?? "",
          amount: row?.amount ?? "",
          cargo_owner: row?.cargo_owner ?? "",
          forwarder: row?.forwarder ?? "",
          transfer_type: row?.transfer_type ?? "",
          remarks: row?.remarks ?? ""
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
          message(`您${title}了箱号为${curData.container_no}的这条数据`, {
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
    uploadExcelDetail,
    exportExcel,
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
