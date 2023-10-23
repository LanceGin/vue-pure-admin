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
    riqi: "",
    chuanming: "",
    tidanhao: "",
    zhuanghuogang: "",
    xiehuogang: "",
    mudigang: "",
    xianghuozongzhong: "",
    xianghao: "",
    chixiangren: "",
    fujiacaozuo: "",
    chuangongsixiangxing: "",
    haiguanxiangxing: "",
    ISO: "",
    jinchukou: "",
    kongzhong: "",
    maoyileixing: "",
    qianfenghao: "",
    huoming: "",
    xiechuanfufeiren: "",
    zhongzhuanleixing: ""
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
      label: "日期",
      prop: "riqi"
    },
    {
      label: "船名航次",
      prop: "chuanming"
    },
    {
      label: "提单号",
      prop: "tidanhao"
    },
    {
      label: "装货港",
      prop: "zhuanghuogang"
    },
    {
      label: "卸货港",
      prop: "xiehuogang"
    },
    {
      label: "目的港",
      prop: "mudigang"
    },
    {
      label: "箱货总重",
      prop: "xianghuozongzhong"
    },
    {
      label: "箱号",
      prop: "xianghao"
    },
    {
      label: "持箱人",
      prop: "chixiangren"
    },
    {
      label: "附加操作",
      prop: "fujiacaozuo"
    },
    {
      label: "船公司箱型",
      prop: "chuangongsixiangxing"
    },
    {
      label: "海关箱类型",
      prop: "haiguanxiangxing"
    },
    {
      label: "ISO",
      prop: "ISO"
    },
    {
      label: "进出口",
      prop: "jinchukou"
    },
    {
      label: "空重",
      prop: "kongzhong"
    },
    {
      label: "贸易类型",
      prop: "maoyileixing"
    },
    {
      label: "铅封号",
      prop: "qianfenghao"
    },
    {
      label: "货名",
      prop: "huoming"
    },
    {
      label: "卸船付费人",
      prop: "xiechuanfufeiren"
    },
    {
      label: "中转类型",
      prop: "zhongzhuanleixing"
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
      title: `${title}驳运记录`,
      props: {
        formInline: {
          riqi: row?.riqi ?? "",
          chuanming: row?.chuanming ?? "",
          tidanhao: row?.tidanhao ?? "",
          zhuanghuogang: row?.zhuanghuogang ?? "",
          xiehuogang: row?.xiehuogang ?? "",
          mudigang: row?.mudigang ?? "",
          xianghuozongzhong: row?.xianghuozongzhong ?? "",
          xianghao: row?.xianghao ?? "",
          chixiangren: row?.chixiangren ?? "",
          fujiacaozuo: row?.fujiacaozuo ?? "",
          chuangongsixiangxing: row?.chuangongsixiangxing ?? "",
          haiguanxiangxing: row?.haiguanxiangxing ?? "",
          ISO: row?.ISO ?? "",
          jinchukou: row?.jinchukou ?? "",
          kongzhong: row?.kongzhong ?? "",
          maoyileixing: row?.maoyileixing ?? "",
          qianfenghao: row?.qianfenghao ?? "",
          huoming: row?.huoming ?? "",
          xiechuanfufeiren: row?.xiechuanfufeiren ?? "",
          zhongzhuanleixing: row?.zhongzhuanleixing ?? ""
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
          message(`您${title}了箱号为${curData.xianghao}的这条数据`, {
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
