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
    bianhao: "",
    qiandingriqi: "",
    mingcheng: "",
    leixing: "",
    xiangmu: "",
    wofangdanwei: "",
    duifangdanwei: "",
    wofangjingban: "",
    duifangjingban: "",
    wofanglianxi: "",
    duifanglianxi: "",
    shengxiaoriqi: "",
    zhongzhiriqi: "",
    zongjiakuan: "",
    yizhifu: "",
    yukuan: "",
    fenshu: "",
    qianyuebumen: "",
    hetongzhuangtai: "",
    beizhu: ""
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
      label: "合同编号",
      prop: "bianhao",
      minWidth: 100
    },
    {
      label: "签订日期",
      prop: "qiandingriqi",
      minWidth: 120
    },
    {
      label: "合同名称",
      prop: "mingcheng",
      minWidth: 150
    },
    {
      label: "合同类型",
      prop: "leixing",
      minWidth: 150
    },
    {
      label: "主要事项/项目名称",
      prop: "xiangmu",
      minWidth: 150
    },
    {
      label: "我方单位",
      prop: "wofangdanwei",
      minWidth: 150
    },
    {
      label: "对方企业或个人",
      prop: "duifangdanwei",
      minWidth: 150
    },
    {
      label: "我司经办人",
      prop: "wofangjingban",
      minWidth: 150
    },
    {
      label: "对方经办人",
      prop: "duifangjingban",
      minWidth: 150
    },
    {
      label: "我方联系方式",
      prop: "wofanglianxi",
      minWidth: 150
    },
    {
      label: "对方联系方式",
      prop: "duifanglianxi",
      minWidth: 150
    },
    {
      label: "生效日期",
      prop: "shengxiaoriqi",
      minWidth: 150
    },
    {
      label: "终止日期",
      prop: "zhongzhiriqi",
      minWidth: 150
    },
    {
      label: "总价款",
      prop: "zongjiakuan",
      minWidth: 150
    },
    {
      label: "已支付金额",
      prop: "yizhifu",
      minWidth: 150
    },
    {
      label: "余款",
      prop: "yukuan",
      minWidth: 150
    },
    {
      label: "合同份数",
      prop: "fenshu",
      minWidth: 150
    },
    {
      label: "签约承办部门",
      prop: "qianyuebumen",
      minWidth: 150
    },
    {
      label: "合同履行情况",
      prop: "hetongzhuangtai",
      minWidth: 150
    },
    {
      label: "备注",
      prop: "beizhu",
      minWidth: 150
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
      title: `${title}合同`,
      props: {
        formInline: {
          bianhao: row?.bianhao ?? "",
          qiandingriqi: row?.qiandingriqi ?? "",
          mingcheng: row?.mingcheng ?? "",
          leixing: row?.leixing ?? "",
          xiangmu: row?.xiangmu ?? "",
          wofangdanwei: row?.wofangdanwei ?? "",
          duifangdanwei: row?.duifangdanwei ?? "",
          wofangjingban: row?.wofangjingban ?? "",
          duifangjingban: row?.duifangjingban ?? "",
          wofanglianxi: row?.wofanglianxi ?? "",
          duifanglianxi: row?.duifanglianxi ?? "",
          shengxiaoriqi: row?.shengxiaoriqi ?? "",
          zhongzhiriqi: row?.zhongzhiriqi ?? "",
          zongjiakuan: row?.zongjiakuan ?? "",
          yizhifu: row?.yizhifu ?? "",
          yukuan: row?.yukuan ?? "",
          fenshu: row?.fenshu ?? "",
          qianyuebumen: row?.qianyuebumen ?? "",
          hetongzhuangtai: row?.hetongzhuangtai ?? "",
          beizhu: row?.beizhu ?? ""
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
          message(`您${title}了合同名称为${curData.mingcheng}的这条数据`, {
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
