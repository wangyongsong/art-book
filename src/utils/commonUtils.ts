// key value 转换 options
export function valueEnumTransformOptions(valueEnum: any, valueType?: string) {
  const options: any = [];
  Object.keys(valueEnum).map((i) => {
    options.push({
      value: valueType === 'number' ? Number(i) : `${i}`,
      label: valueEnum[i].text,
      disabled: valueEnum[i].disabled || false,
    });
    return null;
  });
  return options;
}

export function SecondToDate(second_time: number) {
  let date = '';
  date = `${parseInt(`${second_time}`, 10) || '0'}秒`;
  if (parseInt(`${second_time}`, 10) > 60) {
    const second = parseInt(`${second_time}`, 10) % 60;
    let min = parseInt(`${second_time / 60}`, 10);
    date = `${min}分${second}秒`;

    if (min > 60) {
      min = parseInt(`${second_time / 60}`, 10) % 60;
      let hour = parseInt(`${parseInt(`${second_time / 60}`, 10) / 60}`, 10);
      date = `${hour}小时${min}分${second}秒`;

      if (hour > 24) {
        hour = parseInt(`${parseInt(`${second_time / 60}`, 10) / 60}`, 10) % 24;
        const day = parseInt(
          `${parseInt(`${parseInt(`${second_time / 60}`, 10) / 60}`, 10) / 24}`,
          10
        );
        date = `${day}天${hour}小时${min}分${second}秒`;
      }
    }
  }
  return date;
}
