/**
 * @description: 存储路径正则
 */
export async function storagePathReg(_: any, value: any) {
  const reg = /^[A-Za-z0-9]+\/$/;
  if (!value && value !== 0) return;
  if (!reg.test(value)) {
    throw new Error('路径不合法');
  }
}

/**
 * @description: 数字大小写字母正则
 */
export function numberCaseLetterReg(_: any, value: any) {
  const reg = /^[A-Za-z0-9]+$/;
  if (!reg.test(value)) {
    throw new Error('仅支持数字和字母组成');
  }
}

/**
 * @description: 不包含空格
 */
export function noBlank(_: any, value: any) {
  const reg = /^[^\s]*$/;
  if (!reg.test(value)) {
    throw new Error('不能含有空格');
  }
}
