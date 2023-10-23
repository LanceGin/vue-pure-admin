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
    kehu: "",
    xiangmu: "",
    yundanhao: "",
    xiangxing: "",
    xianghao: "",
    fenghao: "",
    jihuashijian: "",
    chuanming: "",
    chuanqi: "",
    duicuntianshu: "",
    chuangongsi: "",
    liuxiang: "",
    mendian: "",
    tixiangdian: "",
    huanxiangdian: "",
    zanluoriqi: "",
    zhuangtai: ""
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
      type: "selection",
      align: "left"
    },
    {
      label: "客户",
      prop: "kehu"
    },
    {
      label: "项目",
      prop: "xiangmu"
    },
    {
      label: "运单号",
      prop: "yundanhao"
    },
    {
      label: "箱型",
      prop: "xiangxing"
    },
    {
      label: "箱号",
      prop: "xianghao"
    },
    {
      label: "封号",
      prop: "fenghao"
    },
    {
      label: "计划做箱时间",
      prop: "jihuashijian"
    },
    {
      label: "船名/航次",
      prop: "chuanming"
    },
    {
      label: "船期",
      prop: "chuanqi"
    },
    {
      label: "堆存天数",
      prop: "duicuntianshu"
    },
    {
      label: "船公司",
      prop: "chuangongsi"
    },
    {
      label: "流向",
      prop: "liuxiang"
    },
    {
      label: "门点",
      prop: "mendian"
    },
    {
      label: "提箱点",
      prop: "tixiangdian"
    },
    {
      label: "还箱点",
      prop: "huanxiangdian"
    },
    {
      label: "打包暂落日期",
      prop: "zanluoriqi"
    },
    {
      label: "状态",
      prop: "zhuangtai"
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
    message(`您删除了订单号为${row.order_no}的这条数据`, { type: "success" });
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
      title: `${title}单证`,
      props: {
        formInline: {
          kehu: row?.kehu ?? "",
          xiangmu: row?.xiangmu ?? "",
          yundanhao: row?.yundanhao ?? "",
          xiangxing: row?.xiangxing ?? "",
          xianghao: row?.xianghao ?? "",
          fenghao: row?.fenghao ?? "",
          jihuashijian: row?.jihuashijian ?? "",
          chuanming: row?.chuanming ?? "",
          chuanqi: row?.chuanqi ?? "",
          duicuntianshu: row?.duicuntianshu ?? "",
          chuangongsi: row?.chuangongsi ?? "",
          liuxiang: row?.liuxiang ?? "",
          mendian: row?.mendian ?? "",
          tixiangdian: row?.tixiangdian ?? "",
          huanxiangdian: row?.huanxiangdian ?? "",
          zanluoriqi: row?.zanluoriqi ?? "",
          zhuangtai: row?.zhuangtai ?? ""
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
          message(`您${title}了运单号为${curData.yundanhao}的这条数据`, {
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
