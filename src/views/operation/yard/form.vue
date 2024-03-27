<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { ElMessage, ElMessageBox, type TabsPaneContext } from "element-plus";
import {
  getYardPriceList,
  addYardPrice,
  editYardPrice,
  deleteYardPrice
} from "@/api/operation";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    is_dock: "",
    yard_name: "",
    port_name: "",
    yard_adress: "",
    contacts_name: "",
    mobile: "",
    remarks: "",
    longitude: "",
    latitude: "",
    base_price_20: "",
    base_price_40: "",
    price_rule: "",
    create_time: ""
  })
});

const columns: TableColumnList = [
  {
    label: "Min",
    prop: "day_min"
  },
  {
    label: "Max",
    prop: "day_max"
  },
  {
    label: "20",
    prop: "price_20"
  },
  {
    label: "40",
    prop: "price_40"
  }
];

const tipinput = ref("tipinput");
const haveRow = ref(true);
const selectRow = ref();
const tableData = ref([]);
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const activeName = ref("first");
const data = getYardPriceList(newFormInline.value);
data.then(v => {
  tableData.value = v.data.list;
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

const handleCurrentChange = item => {
  haveRow.value = false;
  selectRow.value = item;
};

const handleAdd = () => {
  ElMessageBox.prompt("min,max,20,40分别用/隔开", "输入时间区间以及价格", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(yard_price => {
      const data = {
        yard_id: newFormInline.value.id,
        yard_price: yard_price.value
      };
      addYardPrice(data);
      const tmp = getYardPriceList(newFormInline.value);
      tmp.then(v => {
        tableData.value = v.data.list;
      });
    })
    .catch(info => {
      if (info == "cancel") {
        info = "取消增加价格";
      }
      ElMessage({
        type: "info",
        message: info
      });
    });
};

const handleEdit = () => {
  console.log(3333, selectRow.value);
  const input_value =
    selectRow.value.day_min +
    "/" +
    selectRow.value.day_max +
    "/" +
    selectRow.value.price_20 +
    "/" +
    selectRow.value.price_40;
  ElMessageBox.prompt("min,max,20,40分别用/隔开", "输入时间区间以及价格", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    inputValue: input_value,
    type: "warning"
  })
    .then(yard_price => {
      const data = {
        id: selectRow.value.id,
        yard_price: yard_price.value
      };
      editYardPrice(data);
      const tmp = getYardPriceList(newFormInline.value);
      tmp.then(v => {
        tableData.value = v.data.list;
      });
    })
    .catch(info => {
      if (info == "cancel") {
        info = "取消编辑价格";
      }
      ElMessage({
        type: "info",
        message: info
      });
    });
};

const handleDelete = () => {
  const data = {
    id: selectRow.value.id
  };
  deleteYardPrice(data);
  const tmp = getYardPriceList(newFormInline.value);
  tmp.then(v => {
    tableData.value = v.data.list;
  });
};

function getRef() {
  return ruleFormRef.value;
}

const map = ref();
const markers = ref([]);
// const auto = ref();
const placeSearch = ref();
const instance = getCurrentInstance();
const { MapConfigure } = instance.appContext.config.globalProperties.$config;

function initMap() {
  console.log(1111, newFormInline);
  AMapLoader.load({
    key: MapConfigure.amapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.AutoComplete",
      "AMap.PlaceSearch",
      "AMap.Driving",
      "AMap.DragRoute"
    ]
  })
    .then(AMap => {
      map.value = new AMap.Map("mapview", {
        // 设置地图容器id
        viewMode: "2D", //  是否为3D地图模式
        zoom: 14, // 初始化地图级别
        center: [newFormInline.value.longitude, newFormInline.value.latitude], //中心点坐标
        resizeEnable: true
      });

      const init_marker = new AMap.Marker({
        position: [newFormInline.value.longitude, newFormInline.value.latitude]
      });
      init_marker.setMap(map.value);
      init_marker.setLabel({
        direction: "top",
        content: newFormInline.value.yard_name
      });
      markers.value.push(init_marker);

      map.value.on("click", e => {
        newFormInline.value.longitude = e.lnglat.getLng();
        newFormInline.value.latitude = e.lnglat.getLat();
        map.value.remove(markers.value);
        const marker = new AMap.Marker({
          position: [e.lnglat.getLng(), e.lnglat.getLat()]
        });
        marker.setMap(map.value);
        marker.setLabel({
          direction: "top",
          content: newFormInline.value.yard_name
        });
        markers.value.push(marker);
      });

      // 搜索
      placeSearch.value = new AMap.PlaceSearch({
        //构造地点查询类
        pageSize: 1, // 单页显示结果条数
        map: map.value // 展现结果的地图实例
      });
    })
    .catch(e => {
      console.log(e);
    });
}

function searchAdd() {
  //关键字查询
  placeSearch.value.search(newFormInline.value.yard_adress);
}

onMounted(() => {
  initMap();
});

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
    :inline="true"
  >
    <el-row>
      <el-col :span="16">
        <el-form-item label="类型" prop="is_dock">
          <el-select
            v-model="newFormInline.is_dock"
            placeholder="请选择堆场类型"
          >
            <el-option label="堆场" value="0" />
            <el-option label="码头" value="1" />
          </el-select>
        </el-form-item>

        <el-form-item label="堆场名称" prop="yard_name">
          <el-input
            v-model="newFormInline.yard_name"
            placeholder="请输入堆场名称"
          />
        </el-form-item>

        <el-form-item label="堆场地址" prop="yard_adress">
          <el-input
            v-model="newFormInline.yard_adress"
            placeholder="请输入堆场地址"
            :id="tipinput"
            @change="searchAdd"
          />
        </el-form-item>

        <el-form-item label="所属港口" prop="port_name">
          <el-input
            v-model="newFormInline.port_name"
            placeholder="请输入所属港口"
          />
        </el-form-item>

        <el-form-item label="联系人" prop="contacts_name">
          <el-input
            v-model="newFormInline.contacts_name"
            placeholder="请输入联系人"
          />
        </el-form-item>

        <el-form-item label="联系电话" prop="mobile">
          <el-input
            v-model="newFormInline.mobile"
            placeholder="请输入联系电话"
          />
        </el-form-item>

        <el-form-item label="备注" prop="remarks">
          <el-input v-model="newFormInline.remarks" placeholder="请输入备注" />
        </el-form-item>

        <el-form-item label="经度" prop="longitude">
          <el-input
            v-model="newFormInline.longitude"
            placeholder="请输入经度"
          />
        </el-form-item>

        <el-form-item label="纬度" prop="latitude">
          <el-input v-model="newFormInline.latitude" placeholder="请输入纬度" />
        </el-form-item>

        <el-form-item label="进场价20" prop="base_price_20">
          <el-input
            v-model="newFormInline.base_price_20"
            placeholder="请输入进场价格20"
          />
        </el-form-item>

        <el-form-item label="进场价40" prop="base_price_40">
          <el-input
            v-model="newFormInline.base_price_40"
            placeholder="请输入进场价格40"
          />
        </el-form-item>
        <el-form-item label="计价规则" prop="price_rule">
          <el-select
            v-model="newFormInline.price_rule"
            placeholder="请选择计价规则"
          >
            <el-option label="单价异步" value="单价异步" />
            <el-option label="单价同步" value="单价同步" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <div id="mapview" ref="mapview" />
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="堆存天数对应金额" name="first">
        <el-form :inline="true">
          <el-form-item>
            <el-button link type="primary" @click="handleAdd()">增加</el-button>
            <el-button
              link
              type="primary"
              :disabled="haveRow"
              @click="handleEdit()"
              >编辑</el-button
            >
            <el-button
              link
              type="danger"
              :disabled="haveRow"
              @click="handleDelete()"
              >删除</el-button
            >
          </el-form-item>
        </el-form>
        <pure-table
          border
          align-whole="center"
          showOverflowTooltip
          highlight-current-row
          size="small"
          :data="tableData"
          :columns="columns"
          @current-change="handleCurrentChange"
        />
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<style lang="scss" scoped>
#mapview {
  height: calc(50vh - 180px);
}
</style>
