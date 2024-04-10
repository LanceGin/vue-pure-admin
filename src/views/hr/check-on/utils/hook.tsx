import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getWxClockList } from "@/api/user";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    userName: "",
    clock_date: "",
    clockin_time: "",
    clockin_location: "",
    clockin_type: "",
    clockin_remark: "",
    clockout_time: "",
    clockout_location: "",
    clockout_type: "",
    clockout_remark: "",
    remark: "",
    city: user.city
  });
  const formRef = ref();
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
      label: "姓名",
      prop: "userName"
    },
    {
      label: "考勤日期",
      prop: "clock_date",
      formatter: ({ clock_date }) => dayjs(clock_date).format("YYYY-MM-DD")
    },
    {
      label: "签到时间",
      prop: "clockin_time",
      formatter: ({ clockin_time }) =>
        dayjs(clockin_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "签到地点",
      slot: "clockin"
    },
    {
      label: "签到类型",
      prop: "clockin_type",
      formatter: ({ clockin_type }) => {
        if (clockin_type == 0) {
          return "正常";
        } else if (clockin_type == 1) {
          return "迟到";
        } else if (clockin_type == 2) {
          return "外勤";
        } else {
          return "迟到+外勤";
        }
      }
    },
    {
      label: "签到备注",
      prop: "clockin_remark"
    },
    {
      label: "签退时间",
      prop: "clockout_time",
      formatter: ({ clockout_time }) =>
        dayjs(clockout_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "签退地点",
      slot: "clockout"
    },
    {
      label: "签退类型",
      prop: "clockout_type",
      formatter: ({ clockout_type }) => {
        if (clockout_type == 0) {
          return "正常";
        } else if (clockout_type == 1) {
          return "早退";
        } else if (clockout_type == 2) {
          return "外勤";
        } else {
          return "早退+外勤";
        }
      }
    },
    {
      label: "签退备注",
      prop: "clockout_remark"
    },
    {
      label: "备注",
      prop: "remark"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await getWxClockList({
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
    writeFile(workBook, "考勤信息.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  function handleDelete(row) {
    message(`您删除了角色名称为${row.name}的这条数据`, { type: "success" });
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

  async function onSearch() {
    loading.value = true;
    const { data } = await getWxClockList({
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

  function openDialog(title = "", row?: FormItemProps) {
    addDialog({
      title: "",
      props: {
        formInline: {
          userName: row?.userName ?? "",
          clock_date: row?.clock_date ?? "",
          clockin_time: row?.clockin_time ?? "",
          clockin_location: row?.clockin_location ?? "",
          clockin_type: row?.clockin_type ?? "",
          clockin_remark: row?.clockin_remark ?? "",
          clockout_time: row?.clockout_time ?? "",
          clockout_location: row?.clockout_location ?? "",
          clockout_type: row?.clockout_type ?? "",
          clockout_remark: row?.clockout_remark ?? "",
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
          message(`您${title}了角色名称为${curData.userName}的这条数据`, {
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
