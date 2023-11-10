type BackgroundPluginTranslationsText =
  | "Background"
  | "Enable background"
  | "Background path"
  | "Background show type"
  | "Fullscreen"
  | "Float"
  | "Fullscreen type"
  | "Contain"
  | "Cover"
  | "Repeat type"
  | "Repeat"
  | "No Repeat"
  | "Float size(px)"
  | "Float X offset(px)"
  | "Float Y offset(px)"
  | "Float X align"
  | "Center"
  | "Float Y align"
  | "Background opacity(%, 100 = unchanged)"
  | "Background blur(px, 0 = unchanged)"
  | "Background brightness(%, 100 = unchanged)"
  | "Background contrast(%, 100 = unchanged)"
  | "Background grayscale(%, 0 = unchanged)"
  | "Background hue rotate(deg, 0 = unchanged)"
  | "Background invert(%, 0 = unchanged)"
  | "Background saturate(%, 100 = unchanged)"
  | "Background sepia(%, 0 = unchanged)"
  | "Group list transparent(%, 0 = disable)"
  | "Make home page menu and other group list background transparent"
  | "Terminal toolbar transparent(%, 0 = disable)"
  | "Make terminal toolbar background transparent"
  | "UI Font"
  | "Enable UI font replace"
  | "Do not affect the terminal font, the terminal font still uses the font in the [appearance] configuration"
  | "UI Font Family"
  | "Fix close button font"
  | "After enable, restore the tab closing button to the default style"
  | "Enable Tabs parameter override"
  | "Tabs dynamic width min(px)"
  | "Tabs fixed width(px)";

type BackgroundPluginTranslations = Record<BackgroundPluginTranslationsText, string>;

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
      Contain: "适应",
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
      "Background opacity(%, 100 = unchanged)": "背景不透明度(%, 100 = 不改变)",
      "Background blur(px, 0 = unchanged)": "背景模糊度(px, 0 = 不改变)",
      "Background brightness(%, 100 = unchanged)": "背景亮度(%, 100 = 不改变)",
      "Background contrast(%, 100 = unchanged)": "背景对比度(%, 100 = 不改变)",
      "Background grayscale(%, 0 = unchanged)": "背景灰度(%, 0 = 不改变)",
      "Background hue rotate(deg, 0 = unchanged)": "背景色相旋转(度, 0 = 不改变)",
      "Background invert(%, 0 = unchanged)": "背景反转(%, 0 = 不改变)",
      "Background saturate(%, 100 = unchanged)": "背景饱和度(%, 100 = 不改变)",
      "Background sepia(%, 0 = unchanged)": "背景褐色(%, 0 = 不改变)",
      "Group list transparent(%, 0 = disable)": "分组列表透明度(%, 0 = 禁用)",
      "Make home page menu and other group list background transparent":
        "让首页菜单和其他分组列表背景呈现半透明",
      "Terminal toolbar transparent(%, 0 = disable)": "终端工具栏透明度(%, 0 = 禁用)",
      "Make terminal toolbar background transparent": "让终端工具栏的背景呈现半透明",

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
