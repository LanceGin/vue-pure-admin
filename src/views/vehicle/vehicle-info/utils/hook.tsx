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
    area: "",
    brand: "",
    car_no: "",
    emission: "",
    buy_year: "",
    axles: "",
    company: "",
    guakao: "",
    youka: "",
    guaban_no: "",
    driver: "",
    mobile: "",
    meta: "",
    remark: ""
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
      label: "车辆属地",
      prop: "area"
    },
    {
      label: "品牌",
      prop: "brand"
    },
    {
      label: "车牌号",
      prop: "car_no"
    },
    {
      label: "排放",
      prop: "emission"
    },
    {
      label: "车辆购买年限",
      prop: "buy_year"
    },
    {
      label: "轴数",
      prop: "axles"
    },
    {
      label: "车辆所属",
      prop: "company"
    },
    {
      label: "车辆挂靠",
      prop: "guakao"
    },
    {
      label: "油卡归属",
      prop: "youka"
    },
    {
      label: "挂板号",
      prop: "guaban_no"
    },
    {
      label: "驾驶员",
      prop: "driver"
    },
    {
      label: "手机号",
      prop: "mobile"
    },
    {
      label: "属性",
      prop: "meta"
    },
    {
      label: "备注",
      prop: "remark"
    }
  ];

  function handleDelete() {
    message(`您删除了车号为${currentRow.value.car_no}的这条数据`, {
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
      title: `${title}车辆`,
      props: {
        formInline: {
          area: row?.area ?? "",
          brand: row?.brand ?? "",
          car_no: row?.car_no ?? "",
          emission: row?.emission ?? "",
          buy_year: row?.buy_year ?? "",
          axles: row?.axles ?? "",
          company: row?.company ?? "",
          guakao: row?.guakao ?? "",
          youka: row?.youka ?? "",
          guaban_no: row?.guaban_no ?? "",
          driver: row?.driver ?? "",
          mobile: row?.mobile ?? "",
          meta: row?.meta ?? "",
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
          message(`您${title}了车牌号为${curData.car_no}的这条数据`, {
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
