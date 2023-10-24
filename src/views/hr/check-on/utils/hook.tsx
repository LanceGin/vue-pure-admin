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
    name: "",
    check_on_date: "",
    check_on_time: "",
    check_on_address: "",
    check_on_type: "",
    check_on_remark: "",
    check_out_time: "",
    check_out_address: "",
    check_out_type: "",
    check_out_remark: "",
    remark: ""
  });
  const formRef = ref();
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
      label: "姓名",
      prop: "name"
    },
    {
      label: "考勤日期",
      prop: "check_on_date"
    },
    {
      label: "签到时间",
      prop: "check_on_time"
    },
    {
      label: "签到地点",
      prop: "check_on_address"
    },
    {
      label: "签到类型",
      prop: "check_on_type"
    },
    {
      label: "签到备注",
      prop: "check_on_remark"
    },
    {
      label: "签退时间",
      prop: "check_out_time"
    },
    {
      label: "签退地点",
      prop: "check_out_address"
    },
    {
      label: "签退类型",
      prop: "check_out_type"
    },
    {
      label: "签退备注",
      prop: "check_out_remark"
    },
    {
      label: "备注",
      prop: "remark"
    }
  ];

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val: number) {
    console.log(`current page: ${val}`);
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

  function openDialog(title = "考勤", row?: FormItemProps) {
    addDialog({
      title: `${title}统计`,
      props: {
        formInline: {
          name: row?.name ?? "",
          check_on_date: row?.check_on_date ?? "",
          check_on_time: row?.check_on_time ?? "",
          check_on_address: row?.check_on_address ?? "",
          check_on_type: row?.check_on_type ?? "",
          check_on_remark: row?.check_on_remark ?? "",
          check_out_time: row?.check_out_time ?? "",
          check_out_address: row?.check_out_address ?? "",
          check_out_type: row?.check_out_type ?? "",
          check_out_remark: row?.check_out_remark ?? "",
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
