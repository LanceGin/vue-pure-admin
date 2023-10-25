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
    status: "",
    cata: "",
    order_no: "",
    custom: "",
    project: "",
    tracking_no: "",
    box: "",
    boat: "",
    boat_company: "",
    commission_no: "",
    boat_date: "",
    fee_time: "",
    fee: "",
    fee_amount: "",
    add_time: "",
    add_stuff: "",
    zixiangmu: ""
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
      label: "状态",
      prop: "status"
    },
    {
      label: "类型",
      prop: "cata"
    },
    {
      label: "订单编号",
      prop: "order_no"
    },
    {
      label: "客户",
      prop: "custom"
    },
    {
      label: "项目",
      prop: "project"
    },
    {
      label: "运单号",
      prop: "tracking_no"
    },
    {
      label: "箱量",
      prop: "box"
    },
    {
      label: "船名/航次",
      prop: "boat"
    },
    {
      label: "船东",
      prop: "boat_company"
    },
    {
      label: "客户委托号",
      prop: "commission_no"
    },
    {
      label: "船期",
      prop: "boat_date"
    },
    {
      label: "打单日期",
      prop: "fee_time"
    },
    {
      label: "打单费",
      prop: "fee"
    },
    {
      label: "抵单数",
      prop: "fee_amount"
    },
    {
      label: "录入时间",
      prop: "add_time"
    },
    {
      label: "录入人",
      prop: "add_stuff"
    },
    {
      label: "子项目",
      prop: "zixiangmu"
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
      title: `${title}单证`,
      props: {
        formInline: {
          status: row?.status ?? "",
          cata: row?.cata ?? "",
          order_no: row?.order_no ?? "",
          project: row?.project ?? "",
          custom: row?.custom ?? "",
          tracking_no: row?.tracking_no ?? "",
          box: row?.box ?? "",
          boat: row?.boat ?? "",
          boat_company: row?.boat_company ?? "",
          commission_no: row?.commission_no ?? "",
          boat_date: row?.boat_date ?? "",
          fee_time: row?.fee_time ?? "",
          fee: row?.fee ?? "",
          fee_amount: row?.fee_amount ?? "",
          add_time: row?.add_time ?? "",
          add_stuff: row?.add_stuff ?? "",
          zixiangmu: row?.zixiangmu ?? ""
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
          message(`您${title}了订单号为${curData.order_no}的这条数据`, {
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
