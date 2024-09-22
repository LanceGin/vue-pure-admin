import dayjs from "dayjs";
import { utils, writeFile } from "xlsx";
import editForm from "../form.vue";
import authForm from "../authForm.vue";
import { message } from "@/utils/message";
import {
  getUserList,
  addUser,
  deleteUser,
  editUser,
  authUser
} from "@/api/user";
import { usePublicHooks } from "../../hooks";
import { addDialog } from "@/components/ReDialog";
import { type FormItemProps } from "../utils/types";
import { type PaginationProps } from "@pureadmin/table";
import { reactive, ref, onMounted, h } from "vue";
import { useUserStore } from "@/store/modules/user";

export function useRole() {
  const user = useUserStore();
  const form = reactive({
    id: "",
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
    zhuangtai: "",
    check_point: "",
    work_hours: "",
    roles: "",
    add_by: user.username,
    city: user.city.split(","),
    city_type: ""
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
      prop: "mobile",
      hide: true
    },
    {
      label: "邮箱",
      prop: "email",
      hide: true
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
      label: "打卡点",
      prop: "check_point"
    },
    {
      label: "工作时间",
      prop: "work_hours"
    },
    {
      label: "工作地点",
      prop: "city"
    },
    {
      label: "身份证号",
      prop: "shenfenzheng",
      hide: true
    },
    {
      label: "家庭住址",
      prop: "zhuzhi",
      hide: true
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
    await deleteUser(currentRow.value).then(() => {
      onSearch();
    });
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
          id: row?.id ?? "",
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
          zhuangtai: row?.zhuangtai ?? "",
          check_point: row?.check_point ?? "",
          work_hours: row?.work_hours ?? "",
          roles: row?.roles ?? "",
          city: row?.city.split(",") ?? ""
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
              handleAddUser(curData).then(() => {
                chores();
              });
            } else {
              // 实际开发先调用编辑接口，再进行下面操作
              asyncEdit(curData).then(() => {
                chores();
              });
            }
          }
        });
      }
    });
  }

  function authDialog() {
    addDialog({
      title: `设置权限`,
      props: {
        formInline: {
          id: currentRow.value.id,
          roles: currentRow.value.roles
        }
      },
      width: "40%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(authForm, { ref: formRef }),
      beforeSure: (done, { options }) => {
        const curData = options.props.formInline as FormItemProps;
        function chores() {
          done(); // 关闭弹框
          onSearch(); // 刷新表格数据
        }
        authUser(curData).then(() => {
          chores();
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
    authDialog,
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
