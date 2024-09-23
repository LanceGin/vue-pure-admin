<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";

interface FormItemProps {
  selectRows: [];
}
interface FormProps {
  formInline: FormItemProps;
}
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    selectRows: []
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const selectRows = newFormInline.value.selectRows;

function getRef() {
  return ruleFormRef.value;
}

// 判断发票数量
function countInvoice(invoices) {
  const item_arr = invoices.split(",");
  const new_arr = item_arr.filter(i => i && i.trim());
  return new_arr.length;
}

/**
 * 将阿拉伯数字价格转换为中文价格
 * @param price 阿拉伯数字价格
 * @returns 中文价格
 */
function getChinesePrice(price: number) {
  price = Number(price.toString().replace(/,/g, ""));
  if (price === 0) return "零元整";
  if (price >= 1e12) return "整数位已超过最大值";

  const CHINESE_NUMBER_MAP = [
    "零",
    "壹",
    "贰",
    "叁",
    "肆",
    "伍",
    "陆",
    "柒",
    "捌",
    "玖"
  ];
  const CHINESE_UNIT_MAP = ["", "拾", "佰", "仟"];
  const CHINESE_BIG_UNIT_MAP = ["", "万", "亿"];
  const CHINESE_SMALL_UNIT_MAP = ["角", "分", "厘", "毫"];

  const priceStr = price.toString();
  const priceArr = priceStr.split(".");
  const integer = priceArr[0];
  const decimal = priceArr[1];

  let chineseIntegerPrice = "";
  let zeroCount = 0;

  for (let i = 0; i < integer.length; i++) {
    const num = +integer[i];
    const unit = integer.length - i - 1; // 当前数字的单位
    const quotient = Math.floor(unit / 4); // 1w为进位单位, 除 4 即为 万 亿
    const remainder = unit % 4; // 1w为进位单位, 取模 4 即为 个 十 百 千

    if (num === 0) {
      zeroCount++;
    } else {
      // 处理前置的零
      if (zeroCount > 0) chineseIntegerPrice += CHINESE_NUMBER_MAP[0];
      zeroCount = 0;
      chineseIntegerPrice +=
        CHINESE_NUMBER_MAP[num] + CHINESE_UNIT_MAP[remainder];
    }
    if (remainder === 0 && zeroCount < 4) {
      chineseIntegerPrice += CHINESE_BIG_UNIT_MAP[quotient];
    }
  }

  // 价格为小数时，整数部分不显示
  if (price < 1) chineseIntegerPrice = "";
  else chineseIntegerPrice += "元";

  let chineseDecimalPrice = "";

  if (!decimal) {
    chineseDecimalPrice = "整";
  } else {
    let hasZero = false;
    for (let i = 0; i < decimal.length; i++) {
      const num = +decimal[i];
      if (num)
        chineseDecimalPrice +=
          CHINESE_NUMBER_MAP[num] + CHINESE_SMALL_UNIT_MAP[i];
      else hasZero = true;
    }

    if (chineseIntegerPrice && hasZero) chineseIntegerPrice += "零";
  }

  return chineseIntegerPrice + chineseDecimalPrice;
}

defineExpose({ getRef });
</script>

<template>
  <div class="apply_print" style="padding: 5px 30px; overflow: hidden">
    <div
      v-for="item in selectRows"
      :key="item"
      style="min-height: 345px; page-break-inside: avoid"
    >
      <table
        border="0"
        cellpadding="1"
        width="100%"
        style="padding-right: 50px; padding-bottom: 5px; padding-left: 50px"
      >
        <tbody>
          <tr>
            <td><label style="display: none" /></td>
            <td align="right">
              编号:<label>{{ item.fee_no }}</label>
            </td>
          </tr>
          <tr>
            <td
              colspan="2"
              align="center"
              style="font-size: 14pt; font-weight: bold"
            >
              <label>费 用 申 请 单</label>
            </td>
          </tr>
        </tbody>
      </table>
      <table class="auditTable" width="100%">
        <tbody>
          <tr>
            <td colspan="2" style="width: 25%">
              申请部门：<label>{{ item.is_admin }}</label>
            </td>
            <td colspan="1" rowspan="2" style="width: 12.5%">支付方式</td>
            <td colspan="1" rowspan="2" align="center" style="width: 12.5%">
              <label>{{ item.pay_type }}</label>
            </td>
            <td colspan="4" style="width: 50%">
              收款单位全称：<label>{{ item.company_name }}</label>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 25%">
              申请: <label>{{ item.apply_by }}</label>
              <label>{{ dayjs(item.apply_time).format("YYYY-MM-DD") }}</label>
            </td>
            <td colspan="4" style="width: 50%">
              开户行：<label>{{ item.bank }}</label>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="width: 25%">
              报销: <label>{{ item.reimburse_by }}</label> <label />
            </td>
            <td colspan="1" style="width: 12.5%">申请单位</td>
            <td colspan="1" align="center" style="width: 12.5%">
              <label>{{ item.apply_department }}</label>
            </td>
            <td colspan="4" style="width: 50%">
              帐号：<label>{{ item.account_no }}</label>
            </td>
          </tr>
          <tr height="20px">
            <td colspan="1" align="center" valign="middle" style="width: 12.5%">
              费<br />用<br />内<br />容
            </td>
            <td colspan="2" style="width: 50%">
              <label>{{ item.fee_name }}</label>
            </td>
            <td colspan="1" align="center" valign="middle" style="width: 12.5%">
              备<br />注
            </td>
            <td
              colspan="4"
              style="
                width: 50%;
                word-break: break-all;
                overflow-wrap: break-word;
              "
            >
              <label>{{ item.remark }}</label>
            </td>
          </tr>
          <tr>
            <td colspan="1" style="width: 12.5%">申请金额:</td>
            <td colspan="1" style="width: 12.5%">
              <label>{{ item.apply_amount }}</label>
            </td>
            <td colspan="1" style="width: 12.5%">大写金额:</td>
            <td colspan="3" style="width: 37.5%">
              {{ getChinesePrice(item.apply_amount) }}<label />
            </td>
            <td colspan="2" style="width: 25%">
              附件张数 <label />{{ countInvoice(item.invoice_no) }} 张
            </td>
          </tr>
          <tr>
            <td colspan="1" style="width: 12.5%">合同/发票号:</td>
            <td
              colspan="7"
              style="
                width: 87.5%;
                word-break: break-all;
                line-break: auto;

                /* overflow-wrap: break-word; */
              "
            >
              <label>{{ item.invoice_no }}</label>
            </td>
          </tr>
          <tr height="50px">
            <td colspan="2" style="width: 25%">收款人:</td>
            <td colspan="2" style="width: 25%">
              审核:
              <!-- <img
                border="0"
                src="http://www.howhan-e.com/upload/8058132213new_zhoujia.jpg"
                style="height: 40px; vertical-align: middle"
              /> -->
            </td>
            <td colspan="2" style="width: 25%">批准:</td>
            <td colspan="2" style="width: 25%">记账:</td>
          </tr>
          <tr>
            <td colspan="2" style="width: 25%">日期:</td>
            <td colspan="2" style="width: 25%">
              日期:
              <!-- <label>{{
                dayjs(selectRows[0].audit_time).format("YYYY-MM-DD")
              }}</label> -->
            </td>
            <td colspan="2" style="width: 25%">日期:<label /></td>
            <td colspan="2" style="width: 25%">日期:</td>
          </tr>
        </tbody>
      </table>
      <div align="center" style="margin-top: 10px" />
    </div>
  </div>
</template>

<style scoped>
.auditTable tbody tr {
  page-break-inside: avoid;
}

.auditTable tbody tr td {
  font-size: 10pt;
  border: 1px solid;
}

.auditTable tbody tr td label {
  font-weight: normal;
}
</style>
