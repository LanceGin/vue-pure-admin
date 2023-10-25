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
    yundanhao: "",
    xiangxing: "",
    zuoxiangshijian: "",
    mendian: "",
    tixiangdian: "",
    huanxiangdian: "",
    chuanming: "",
    kaichuanshijian: "",
    liuxiang: ""
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
      label: "做箱时间",
      prop: "zuoxiangshijian"
    },
    {
      label: "客户/项目",
      prop: "kehu"
    },
    {
      label: "提箱点",
      prop: "tixiangdian"
    },
    {
      label: "运单号",
      prop: "yundanhao"
    },
    {
      label: "船名航次",
      prop: "chuanming"
    },
    {
      label: "箱号",
      prop: "xianghao"
    },
    {
      label: "箱型",
      prop: "xiangxing"
    },
    {
      label: "门点",
      prop: "mendian"
    },
    {
      label: "还箱点",
      prop: "huanxiangdian"
    },
    {
      label: "车号",
      prop: "chehao"
    }
  ];

  function handleDelete(row) {
    message(`您删除了运单号为${row.yundanhao}的这条数据`, { type: "success" });
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
      title: `${title}装箱`,
      props: {
        formInline: {
          kehu: row?.kehu ?? "",
          yundanhao: row?.yundanhao ?? "",
          xiangxing: row?.xiangxing ?? "",
          zuoxiangshijian: row?.zuoxiangshijian ?? "",
          mendian: row?.mendian ?? "",
          huanxiangdian: row?.huanxiangdian ?? "",
          chuanming: row?.chuanming ?? "",
          kaichuanshijian: row?.kaichuanshijian ?? "",
          liuxiang: row?.liuxiang ?? ""
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
