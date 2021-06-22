type ConstDataType = {
  tag: { [key: string]: { text: string } };
};

const CONSTDATA: ConstDataType = {
  tag: {
    'rgb(252,115,110)': { text: '红色' },
    'rgb(253,183,83)': { text: '橙色' },
    'rgb(254,221,91)': { text: '黄色' },
    'rgb(109,253,117)': { text: '绿色' },
    'rgb(78,167,251)': { text: '蓝色' },
    'rgb(213,136,252)': { text: '紫色' },
  },
};

export default CONSTDATA;
