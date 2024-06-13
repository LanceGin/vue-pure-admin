import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import tdForm from "../td-form.vue";
import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import {
  arriveTime,
  deleteContainer,
  getPickBoxList,
  loadPort,
  pickBox,
  planTime,
  settingContainer,
  tempDrop
} from "@/api/operation";
import { ElMessage, ElMessageBox } from "element-plus";
import { generatePlanningFee } from "@/api/finance";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
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
    plan_time: "",
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
    remark: "",
    city: user.city
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
      label: "做箱时间",
      prop: "make_time",
      formatter: ({ make_time }) =>
        dayjs(make_time).format("YYYY-MM-DD HH:mm:ss"),
      minWidth: 120
    },
    {
      label: "计划时间",
      prop: "plan_time",
      formatter: ({ plan_time }) =>
        dayjs(plan_time).format("YYYY-MM-DD HH:mm:ss"),
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
      cellRenderer: ({ row }) => {
        const a_time = dayjs(row.arrive_time).format("YYYY-MM-DD");
        let now_time = dayjs().format("YYYY-MM-DD");
        if (row.make_time !== null) {
          now_time = dayjs(row.make_time).format("YYYY-MM-DD");
        }
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
    },
    {
      label: "暂落点",
      prop: "temp_port"
    },
    {
      label: "暂落时间",
      prop: "temp_time",
      formatter: ({ temp_time }) => {
        if (temp_time == null) {
          return "";
        } else {
          return dayjs(temp_time).format("YYYY-MM-DD");
        }
      }
    },
    {
      label: "暂落天数",
      prop: "temp_time",
      formatter: ({ temp_time }) => {
        const a_time = dayjs(temp_time).format("YYYY-MM-DD");
        const now_time = dayjs().format("YYYY-MM-DD");
        if (temp_time == null) {
          return "";
        } else {
          return (dayjs(now_time).diff(a_time, "day") + 1).toString();
        }
      }
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
    const now_time = dayjs().format("YYYY-MM-DD");
    for (let i = 0; i < res.length; i++) {
      const element = res[i];
      element[8] = dayjs(element[8]).format("YYYY-MM-DD");
      element[9] = dayjs(element[9]).format("YYYY-MM-DD");
      element[11] = dayjs(element[11]).format("YYYY-MM-DD");
      if (element[1] == "待挑箱") {
        element[12] = (
          dayjs(now_time).diff(dayjs(element[10]).format("YYYY-MM-DD"), "day") +
          1
        ).toString();
      } else {
        element[12] = (
          dayjs(dayjs(element[8]).format("YYYY-MM-DD")).diff(
            dayjs(element[10]).format("YYYY-MM-DD"),
            "day"
          ) + 1
        ).toString();
      }
    }
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
          id: "",
          make_time: "",
          load_port: "",
          door: "",
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
                door: curData.door,
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

  // 暂落
  function pickDialog(title = "暂落", _row?: FormItemProps) {
    addDialog({
      title: `${title}`,
      props: {
        formInline: {
          temp_port: "",
          actual_amount_temp: null
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(tdForm, { ref: formRef }),
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
                type: "暂落",
                select_container_id: [],
                select_container: [],
                temp_port: curData.temp_port,
                actual_amount: {
                  value: curData.actual_amount_temp
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
                // 实际开发先调用编辑接口，再进行下面操作
                chores();
              });
            }
          }
        }).catch(info => {
          ElMessage({
            type: "info",
            message: info
          });
        });
      }
    });
  }

  // 删除
  async function handleDeleteContainer() {
    ElMessageBox.confirm("确认删除？箱子以及所包含费用都将删除", "删除数据", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const data = {
          select_container_id: []
        };
        selectRows.value.forEach(v => {
          data.select_container_id.push(v.id);
          if (v.container_status != "待挑箱") {
            throw new Error("非待挑箱状态无法删除");
          }
        });
        deleteContainer(data);
        onSearch();
      })
      .catch(info => {
        if (info == "cancel") {
          info = "取消删除";
        }
        ElMessage({
          type: "info",
          message: info
        });
      });
  }

  // 挑箱
  async function handlePickBox() {
    ElMessageBox.confirm("若计划时间为空则根据做箱时间计算计划费", "挑箱确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        const data = {
          type: "拆箱",
          select_container_id: [],
          select_container: [],
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
    ElMessageBox.prompt("请输入暂落点 实付金额（空格隔开）", "暂落确认", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(port_amount => {
        const a = port_amount.value.split(" ");
        const temp_port = a[0];
        let actual_amount = null;
        if (a.length == 2) {
          actual_amount = a[1];
        }
        const data = {
          type: "暂落",
          select_container_id: [],
          select_container: [],
          temp_port: temp_port,
          actual_amount: {
            value: actual_amount
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

  // 修改计划时间
  async function handlePlanTime() {
    ElMessageBox.prompt("请输入新的计划时间", "批量设置计划时间", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      inputType: "datetime-local"
    })
      .then(plan_time => {
        const data = {
          select_container_no: [],
          plan_time: plan_time
        };
        selectRows.value.forEach(v => {
          data.select_container_no.push(v.containner_no);
        });
        planTime(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消修改计划时间"
        });
      });
  }

  // 修改船期
  async function handleArriveTime() {
    ElMessageBox.prompt("请输入新的船期", "批量设置船期", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      inputType: "datetime-local"
    })
      .then(arrive_time => {
        const data = {
          select_track_no: [],
          arrive_time: arrive_time
        };
        selectRows.value.forEach(v => {
          if (!data.select_track_no.includes(v.track_no)) {
            data.select_track_no.push(v.track_no);
          }
        });
        arriveTime(data);
        onSearch();
      })
      .catch(() => {
        ElMessage({
          type: "info",
          message: "取消修改船期"
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
    pickDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange,
    handleDeleteContainer,
    handlePickBox,
    handleTempDrop,
    handlePlanTime,
    handleArriveTime,
    handleLoadPort,
    handleSetting
  };
}
