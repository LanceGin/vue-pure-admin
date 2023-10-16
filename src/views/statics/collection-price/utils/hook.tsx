import dayjs from "dayjs";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getRoleList } from "@/api/system";
// import { ElMessageBox } from "element-plus";
import { tableData } from "./data";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h, toRaw } from "vue";

export function useRole() {
  const form = reactive({
    status: "",
    custom: "",
    project: "",
    door: "",
    wharf: "",
    i20gp: "",
    i40gp: "",
    i40tk: "",
    i40hc: "",
    o40tk: "",
    o40hc: "",
    o20tk: "",
    o40ot: ""
  });
  const formRef = ref();
  let dataList = tableData;
  const loading = ref(true);
  // const switchLoadMap = ref({});
  const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "状态",
      minWidth: 130,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(Number(row.status))}>
          {row.status == 1 ? "有效" : "无效"}
        </el-tag>
      )
    },
    {
      label: "客户",
      prop: "custom",
      minWidth: 120
    },
    {
      label: "项目",
      prop: "project",
      minWidth: 150
    },
    {
      label: "门点",
      prop: "door",
      minWidth: 150
    },
    {
      label: "码头",
      prop: "wharf",
      minWidth: 150
    },
    {
      label: "装箱",
      children: [
        {
          label: "20GP",
          prop: "i20gp",
          minWidth: 80
        },
        {
          label: "40GP",
          prop: "i40gp",
          minWidth: 80
        },
        {
          label: "40TK",
          prop: "i40tk",
          minWidth: 80
        },
        {
          label: "40HC",
          prop: "i40hc",
          minWidth: 80
        }
      ]
    },
    {
      label: "拆箱",
      children: [
        {
          label: "40Tk",
          prop: "o40tk",
          minWidth: 80
        },
        {
          label: "40HC",
          prop: "o40hc",
          minWidth: 80
        },
        {
          label: "20TK",
          prop: "o20tk",
          minWidth: 80
        },
        {
          label: "40OT",
          prop: "i40ot",
          minWidth: 80
        }
      ]
    },
    {
      label: "创建时间",
      minWidth: 180,
      prop: "createTime",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
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
      title: `${title}堆场`,
      props: {
        formInline: {
          status: row?.status ?? "",
          custom: row?.custom ?? "",
          project: row?.project ?? "",
          door: row?.door ?? "",
          wharf: row?.wharf ?? "",
          i20gp: row?.i20gp ?? "",
          i40gp: row?.i40gp ?? "",
          i40tk: row?.i40tk ?? "",
          i40hc: row?.i40hc ?? "",
          o40tk: row?.o40tk ?? "",
          o40hc: row?.o40hc ?? "",
          o20tk: row?.o20tk ?? "",
          o40ot: row?.o40ot ?? ""
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
          message(`您${title}了客户名称为${curData.custom}的这条数据`, {
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
