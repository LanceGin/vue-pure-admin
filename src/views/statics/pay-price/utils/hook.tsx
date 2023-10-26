// import dayjs from "dayjs";
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
    i20tk: "",
    i40hc: "",
    o20gp: "",
    o40gp: "",
    o40hc: "",
    o20tk: ""
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
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
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(Number(row.status))}>
          {row.status == 1 ? "有效" : "无效"}
        </el-tag>
      )
    },
    {
      label: "客户",
      prop: "custom"
    },
    {
      label: "项目",
      prop: "project"
    },
    {
      label: "门点",
      prop: "door"
    },
    {
      label: "码头",
      prop: "wharf"
    },
    {
      label: "装箱",
      children: [
        {
          label: "20GP",
          prop: "i20gp"
        },
        {
          label: "40GP",
          prop: "i40gp"
        },
        {
          label: "20TK",
          prop: "i20tk"
        },
        {
          label: "40HC",
          prop: "i40hc"
        }
      ]
    },
    {
      label: "拆箱",
      children: [
        {
          label: "20GP",
          prop: "o20gp"
        },
        {
          label: "40GP",
          prop: "o40gp"
        },
        {
          label: "20TK",
          prop: "o20tk"
        },
        {
          label: "40HC",
          prop: "o40hc"
        }
      ]
    }
  ];

  function handleDelete() {
    message(`您删除了客户为${currentRow.value.custom}的这条数据`, {
      type: "success"
    });
    onSearch();
  }

  function handleSizeChange(val: number) {
    console.log(`${val} items per page`);
  }

  function handleCurrentChange(val) {
    currentRow.value = val;
    haveRow.value = false;
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
      title: `${title}价格`,
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
          o20gp: row?.o20gp ?? "",
          o40hc: row?.o40hc ?? "",
          o40gp: row?.o40gp ?? "",
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
          message(`您${title}了项目为${curData.project}的这条数据`, {
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

  // 编辑按钮
  function handleEdit() {
    openDialog("编辑", currentRow.value);
  }

  // 双击行
  function handleRowDblclick(row) {
    console.log(row);
    openDialog("编辑", row);
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
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleRowDblclick,
    handleEdit,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
