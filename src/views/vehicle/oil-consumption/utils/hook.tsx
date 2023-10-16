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
    no: "",
    car_no: "",
    licheng_6: "",
    youhaobiaozhun: "",
    licheng_xiuzheng: "",
    hedingshengshu: "",
    danjia: "",
    jinfei: "",
    shijishengshu: "",
    amount: "",
    chashengshu: "",
    jiangfa: "",
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
      label: "序号",
      prop: "no",
      minWidth: 100
    },
    {
      label: "车号",
      prop: "car_no",
      minWidth: 120
    },
    {
      label: "实际里程",
      children: [
        {
          label: "6月历程数（KM）",
          prop: "licheng_6",
          minWidth: 150
        },
        {
          label: "油耗标准（L/100KM）",
          prop: "youhaobiaozhun",
          minWidth: 150
        },
        {
          label: "历程修正系统",
          prop: "licheng_xiuzheng",
          minWidth: 150
        }
      ]
    },
    {
      label: "核定油耗",
      children: [
        {
          label: "升数（L）",
          prop: "hedingshengshu",
          minWidth: 150
        },
        {
          label: "平均单价",
          prop: "danjia",
          minWidth: 150
        },
        {
          label: "金费（元）",
          prop: "jinfei",
          minWidth: 150
        }
      ]
    },
    {
      label: "实际消费",
      children: [
        {
          label: "升数（L）",
          prop: "shijishengshu",
          minWidth: 150
        },
        {
          label: "总金额",
          prop: "amount",
          minWidth: 150
        }
      ]
    },
    {
      label: "（正数为超油）",
      children: [
        {
          label: "升数（L）",
          prop: "chashengshu",
          minWidth: 150
        }
      ]
    },
    {
      label: "每月油耗奖励",
      children: [
        {
          label: "元",
          prop: "jiangfa",
          minWidth: 150
        }
      ]
    },
    {
      label: "操作",
      fixed: "right",
      width: 240,
      slot: "operation"
    }
  ];
  // const buttonClass = computed(() => {
  //   return [
  //     "!h-[20px]",
  //     "reset-margin",
  //     "!text-gray-500",
  //     "dark:!text-white",
  //     "dark:hover:!text-primary"
  //   ];
  // });

  // function onChange({ row, index }) {
  //   ElMessageBox.confirm(
  //     `确认要<strong>${
  //       row.status === 0 ? "停用" : "启用"
  //     }</strong><strong style='color:var(--el-color-primary)'>${
  //       row.name
  //     }</strong>吗?`,
  //     "系统提示",
  //     {
  //       confirmButtonText: "确定",
  //       cancelButtonText: "取消",
  //       type: "warning",
  //       dangerouslyUseHTMLString: true,
  //       draggable: true
  //     }
  //   )
  //     .then(() => {
  //       switchLoadMap.value[index] = Object.assign(
  //         {},
  //         switchLoadMap.value[index],
  //         {
  //           loading: true
  //         }
  //       );
  //       setTimeout(() => {
  //         switchLoadMap.value[index] = Object.assign(
  //           {},
  //           switchLoadMap.value[index],
  //           {
  //             loading: false
  //           }
  //         );
  //         message(`已${row.status === 0 ? "停用" : "启用"}${row.name}`, {
  //           type: "success"
  //         });
  //       }, 300);
  //     })
  //     .catch(() => {
  //       row.status === 0 ? (row.status = 1) : (row.status = 0);
  //     });
  // }

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

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}核算记录`,
      props: {
        formInline: {
          no: row?.no ?? "",
          car_no: row?.car_no ?? "",
          licheng_6: row?.licheng_6 ?? "",
          youhaobiaozhun: row?.youhaobiaozhun ?? "",
          licheng_xiuzheng: row?.licheng_xiuzheng ?? "",
          hedingshengshu: row?.hedingshengshu ?? "",
          danjia: row?.danjia ?? "",
          jinfei: row?.jinfei ?? "",
          shijishengshu: row?.shijishengshu ?? "",
          amount: row?.amount ?? "",
          chashengshu: row?.chashengshu ?? "",
          jiangfa: row?.jiangfa ?? "",
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
