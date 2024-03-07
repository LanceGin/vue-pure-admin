import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import { message } from "@/utils/message";
import { getUserList, addUser, deleteUser, editUser } from "@/api/user";
// import { ElMessageBox } from "element-plus";
// import { tableData } from "./data";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";

export function useRole() {
  const form = reactive({
    name: "",
    realname: "",
    mobile: "",
    email: "",
    department: "",
    group: "",
    wechat: "",
    create_time: "",
    create_staff: "",
    mima: "",
    shenfenzheng: "",
    zhuzhi: "",
    ruzhishijian: "",
    zhuangtai: ""
  });
  const formRef = ref();
  const currentRow = ref();
  const haveRow = ref(true);
  const dataList = ref([]);
  const loading = ref(true);
  // const switchLoadMap = ref({});
  const { tagStyle } = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    pageSizes: [10, 20, 50, 100, 200, 500],
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "用户名",
      prop: "name"
    },
    {
      label: "姓名",
      prop: "realname"
    },
    {
      label: "手机",
      prop: "mobile"
    },
    {
      label: "邮箱",
      prop: "email"
    },
    {
      label: "部门",
      prop: "department"
    },
    {
      label: "微信",
      prop: "wechat"
    },
    {
      label: "密码",
      prop: "mima"
    },
    {
      label: "身份证号",
      prop: "shenfenzheng"
    },
    {
      label: "家庭住址",
      prop: "zhuzhi"
    },
    {
      label: "入职时间",
      prop: "ruzhishijian",
      formatter: ({ ruzhishijian }) => dayjs(ruzhishijian).format("YYYY-MM-DD")
    },
    {
      label: "在职状态",
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} style={tagStyle.value(row.zhuangtai)}>
          {row.zhuangtai === "0" ? "在职" : "离职"}
        </el-tag>
      )
    },
    {
      label: "创建时间",
      prop: "create_time",
      formatter: ({ create_time }) =>
        dayjs(create_time).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "创建人",
      prop: "create_staff"
    }
  ];

  async function exportExcel() {
    const export_pagination = reactive<PaginationProps>({
      total: 0,
      pageSize: 10000,
      currentPage: 1,
      background: true
    });
    const { data } = await getUserList({
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
    writeFile(workBook, "员工列表.xlsx");
    message("导出成功", {
      type: "success"
    });
  }

  async function handleDelete() {
    message(`您删除了用户名为${currentRow.value.name}的这条数据`, {
      type: "success"
    });
    await deleteUser(currentRow.value);
    onSearch();
  }

  function handleSizeChange(val: number) {
    pagination.pageSize = val;
    onSearch();
  }

  function handlePageChange(val: number) {
    pagination.currentPage = val;
    onSearch();
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
    const { data } = await getUserList({
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

  async function handleAddUser(user) {
    await addUser(user);
  }

  function openDialog(title = "添加", row?: FormItemProps) {
    addDialog({
      title: `${title}员工`,
      props: {
        formInline: {
          name: row?.name ?? "",
          realname: row?.realname ?? "",
          mobile: row?.mobile ?? "",
          email: row?.email ?? "",
          group: row?.group ?? "",
          wechat: row?.wechat ?? "",
          create_time: row?.create_time ?? "",
          department: row?.department ?? "",
          mima: row?.mima ?? "",
          shenfenzheng: row?.shenfenzheng ?? "",
          zhuzhi: row?.zhuzhi ?? "",
          ruzhishijian: row?.ruzhishijian ?? "",
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
          message(`您${title}了角色名称为${curData.name}的这条数据`, {
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
              handleAddUser(curData);
              chores();
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              asyncEdit(curData);
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

  async function asyncEdit(user) {
    await editUser(user);
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
    exportExcel,
    onSearch,
    resetForm,
    openDialog,
    handleMenu,
    handleDelete,
    // handleDatabase,
    handleRowDblclick,
    handleEdit,
    handleSizeChange,
    handlePageChange,
    handleCurrentChange,
    handleSelectionChange
  };
}
