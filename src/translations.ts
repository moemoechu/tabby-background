type BackgroundPluginTranslations = {
  Background: string;
  "Enable background": string;
  "Background path": string;
  "Background show type": string;
  Fullscreen: string;
  Float: string;
  "Fullscreen type": string;
  Contain: string;
  Cover: string;
  "Repeat type": string;
  Repeat: string;
  "No Repeat": string;
  "Float size(px)": string;
  "Float X offset(px)": string;
  "Float Y offset(px)": string;
  "Float X align": string;
  Center: string;
  "Float Y align": string;
  "Background opacity(%)": string;
  "Background blur(px)": string;
  "Background brightness(%)": string;
  "Background contrast(%)": string;
  "Group list transparent(%, 0 = disable)": string;
  "Make home page menu and other group list background transparent": string;

  "UI Font": string;
  "Enable UI font replace": string;
  "Do not affect the terminal font, the terminal font still uses the font in the [appearance] configuration": string;
  "UI Font Family": string;
  "Fix close button font": string;
  "After enable, restore the tab closing button to the default style": string;

  "Enable Tabs parameter override": string;
  "Tabs dynamic width min(px)": string;
  "Tabs fixed width(px)": string;
};

export const translations: [string, BackgroundPluginTranslations][] = [
  [
    "zh-CN",
    {
      Background: "背景",
      "Enable background": "是否启用背景图片",
      "Background path": "背景图片路径",
      "Background show type": "背景显示类型",
      Fullscreen: "全屏",
      Float: "浮动",
      "Fullscreen type": "全屏类型",
      Contain: "包含",
      Cover: "填充",
      "Repeat type": "重复类型",
      Repeat: "重复",
      "No Repeat": "不重复",
      "Float size(px)": "浮动大小(px)",
      "Float X offset(px)": "浮动X偏移(px)",
      "Float Y offset(px)": "浮动Y偏移(px)",
      "Float X align": "浮动X对齐",
      Center: "中央",
      "Float Y align": "浮动Y对齐",
      "Background opacity(%)": "背景不透明度(%)",
      "Background blur(px)": "背景模糊度(px)",
      "Background brightness(%)": "背景亮度(%)",
      "Background contrast(%)": "背景对比度(%)",
      "Group list transparent(%, 0 = disable)": "分组列表透明度(%, 0 = 禁用)",
      "Make home page menu and other group list background transparent":
        "让首页菜单和其他分组列表背景呈现半透明",

      "UI Font": "字体",
      "Enable UI font replace": "是否启用界面字体替换",
      "Do not affect the terminal font, the terminal font still uses the font in the [appearance] configuration":
        "不影响终端字体，终端字体仍使用【外观】配置中的字体",
      "UI Font Family": "界面字体",
      "Fix close button font": "修复标签页关闭按钮字体",
      "After enable, restore the tab closing button to the default style":
        "启用后将标签页关闭按钮恢复为默认样式",

      "Enable Tabs parameter override": "启用标签页参数覆盖",
      "Tabs dynamic width min(px)": "动态标签页宽度最小宽度(px)",
      "Tabs fixed width(px)": "固定标签页宽度(px)",
    },
  ],
];
