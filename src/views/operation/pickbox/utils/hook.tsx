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
  getPickBoxList,
  loadPort,
  makeTime,
  pickBox,
  settingContainer,
  tempDrop
} from "@/api/operation";
import { ElMessage, ElMessageBox } from "element-plus";
import { generatePlanningFee } from "@/api/finance";

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
    make_time: "",
    load_port: "",
    count: "",
    transfer_port: "",
    package_count: "",
    gross_weight: "",
    volume: "",
    container_weight: "",
    container_status: "待挑箱",
    order_time: "",
    order_fee: "",
    temp_status: "",
    remark: ""
  });
  const formRef = ref();
  const selectRows = ref([]);
  const haveRow = ref(true);
  const dataList = ref([]);
  const loading = ref(true);
  // const switchLoadMap = ref({});
  // const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 20,
    pageSizes: [20, 50, 100, 200, 500],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      type: "selection",
      align: "left"
    },
    {
      label: "状态",
      prop: "container_status"
    },
    {
      label: "客户",
      prop: "customer"
    },
    {
      label: "子项目",
      prop: "subproject",
      minWidth: 100
    },
    {
      label: "运单号",
      prop: "track_no",
      minWidth: 120
    },
    {
      label: "箱型",
      prop: "container_type"
    },
    {
      label: "箱号",
      prop: "containner_no",
      minWidth: 120
    },
    {
      label: "封号",
      prop: "seal_no"
    },
    {
      label: "计划做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) =>
        dayjs(make_time).format("YYYY-MM-DD HH:mm:ss"),
      minWidth: 120
    },
    {
      label: "船名/航次",
      prop: "ship_name",
      minWidth: 100
    },
    {
      label: "船期",
      prop: "arrive_time",
      formatter: ({ arrive_time }) => dayjs(arrive_time).format("YYYY-MM-DD"),
      minWidth: 120
    },
    {
      label: "堆存天数",
      prop: "arrive_time",
      formatter: ({ arrive_time }) => {
        const a_time = dayjs(arrive_time).format("YYYY-MM-DD");
        const now_time = dayjs().format("YYYY-MM-DD");
        return (dayjs(now_time).diff(a_time, "day") + 1).toString();
      }
    },
    {
      label: "船公司",
      prop: "ship_company"
    },
    {
      label: "备注",
      prop: "remark"
    },
    {
      label: "门点",
      prop: "door"
    },
    {
      label: "提箱点",
      prop: "load_port"
    },
    {
      label: "道口",
      prop: "crossing"
    },
    {
      label: "还箱点",
      prop: "unload_port"
    },
    {
      label: "暂落状态",
      prop: "temp_status"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await getPickBoxList({
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
    writeFile(workBook, "挑箱列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  function handleDelete(row) {
    message(`您删除了订单号为${row.order_no}的这条数据`, { type: "success" });
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
    selectRows.value = val;
    if (selectRows.value.length > 0) {
      haveRow.value = false;
    } else {
      haveRow.value = true;
    }
  }

  async function onSearch() {
    loading.value = true;
    const { data } = await getPickBoxList({
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

  function openDialog(title = "修改", _row?: FormItemProps) {
    addDialog({
      title: `${title}箱信息`,
      props: {
        formInline: {
          // id: row?.id ?? "",
          // make_time: dayjs(row?.make_time).format("YYYY-MM-DD HH:mm:ss") ?? "",
          // load_port: row?.load_port ?? "",
          // crossing: row?.crossing ?? "",
          // remark: row?.remark ?? ""
          id: "",
          make_time: "",
          load_port: "",
          crossing: "",
          remark: ""
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
          message(`您${title}了运单号为${curData.track_no}的这条数据`, {
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
              const data = {
                select_container_no: [],
                make_time: curData.make_time,
                load_port: curData.load_port,
                crossing: curData.crossing,
                remark: curData.remark
              };
              selectRows.value.forEach(v => {
                data.select_container_no.push(v.containner_no);
              });
              settingContainer(data);
              // 实际开发先调用编辑接口，再进行下面操作
              chores();
            }
          }
        });
      }
    });
  }

  // 挑箱
  async function handlePickBox() {
    ElMessageBox.prompt("请输入实付金额", "挑箱确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(actual_amount => {
        const data = {
          select_container_id: [],
          select_container: [],
          actual_amount: actual_amount
        };
        selectRows.value.forEach(v => {
          data.select_container_id.push(v.id);
          data.select_container.push(v);
          if (v.make_time === null) {
            throw new Error("所选箱未设置做箱时间");
          } else if (v.load_port === null) {
            throw new Error("所选箱未设置提箱点");
          }
        });
        generatePlanningFee(data).then(() => {
          pickBox(data);
          onSearch();
        });
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消挑箱";
        }
        ElMessage({
          type: "info",
          message: info
        });
      });
  }

  // 暂落
  async function handleTempDrop() {
    ElMessageBox.prompt("请输入暂落点", "暂落确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(temp_port => {
        const data = {
          select_container_id: [],
          select_container: [],
          temp_port: temp_port,
          actual_amount: {
            value: null
          }
        };
        selectRows.value.forEach(v => {
          data.select_container_id.push(v.id);
          data.select_container.push(v);
          if (v.make_time === null) {
            throw new Error("所选箱未设置做箱时间");
          } else if (v.load_port === null) {
            throw new Error("所选箱未设置提箱点");
          }
        });
        generatePlanningFee(data).then(() => {
          tempDrop(data);
          onSearch();
        });
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消暂落";
        }
        ElMessage({
          type: "info",
          message: info
        });
      });
  }

  // 批量设置做箱时间
  async function handleMakeTime() {
    ElMessageBox.prompt("请输入新的做箱时间", "批量设置做箱时间", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      inputType: "datetime-local"
    })
      .then(make_time => {
        const data = {
          select_container_no: [],
          make_time: make_time
        };
        selectRows.value.forEach(v => {
          data.select_container_no.push(v.containner_no);
        });
        makeTime(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消修改提箱点"
        });
      });
  }

  // 批量修改提箱地点
  async function handleLoadPort() {
    ElMessageBox.prompt("请输入新的提箱点", "批量修改提箱点", {
      confirmButtonText: "确认",
      cancelButtonText: "取消"
    })
      .then(port => {
        const data = {
          select_container_no: [],
          port: port
        };
        selectRows.value.forEach(v => {
          data.select_container_no.push(v.containner_no);
        });
        loadPort(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消修改提箱点"
        });
      });
  }

  // 批量设置信息
  async function handleSetting() {
    openDialog("修改", selectRows.value[0]);
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
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange,
    handlePickBox,
    handleTempDrop,
    handleMakeTime,
    handleLoadPort,
    handleSetting
  };
}
