import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import { getExportDispatchList, importExportContainer } from "@/api/dispatch";

export function useRole() {
  const form = reactive({
    id: "",
    order_status: "",
    order_type: "",
    ship_company: "",
    customer: "",
    subproject: "",
    arrive_time: "",
    start_port: "",
    target_port: "",
    containner_no: "",
    seal_no: "",
    container_type: "",
    ship_name: "",
    track_no: "",
    unload_port: "",
    door: "",
    make_time: dayjs().format("YYYY-MM-DD"),
    load_port: "",
    count: "",
    transfer_port: "",
    package_count: "",
    gross_weight: "",
    volume: "",
    container_weight: "",
    container_status: "",
    order_time: "",
    order_fee: "",
    car_no: ""
  });
  const formRef = ref();
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
      prop: "ship_company"
    },
    {
      label: "客户",
      prop: "customer"
    },
    {
      label: "子项目",
      prop: "subproject"
    },
    {
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) => dayjs(make_time).format("YYYY-MM-DD")
    },
    {
      label: "提箱点",
      prop: "load_port"
    },
    {
      label: "船名航次",
      prop: "ship_name"
    },
    {
      label: "运单号",
      prop: "track_no"
    },
    {
      label: "箱号",
      prop: "containner_no"
    },
    {
      label: "箱型",
      prop: "container_type"
    },
    {
      label: "封号",
      prop: "seal_no"
    },
    {
      label: "门点",
      prop: "door"
    },
    {
      label: "还箱点",
      prop: "unload_port"
    },
    {
      label: "车号",
      prop: "car_no"
    },
    {
      label: "起始港",
      prop: "start_port"
    },
    {
      label: "目的港",
      prop: "target_port"
    },
    {
      label: "中转港",
      prop: "transfer_port"
    },
    {
      label: "件数",
      prop: "package_count"
    },
    {
      label: "毛重",
      prop: "gross_weight"
    },
    {
      label: "体积",
      prop: "volume"
    },
    {
      label: "箱皮重",
      prop: "container_weight"
    }
  ];

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
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

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
  }

  function handleSelectionChange(val) {
    console.log("handleSelectionChange", val);
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getExportDispatchList({
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

  function openDialog(title = "添加") {
    addDialog({
      title: `${title}驾驶员`,
      props: {
        formInline: {}
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
          message(`您${title}了箱号为${curData.containner_no}的这条数据`, {
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

  // 上传文件批量导入
  async function uploadExcelDetail(item) {
    const form = new FormData();
    form.append("file", item.file);
    await importExportContainer(form);
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
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
