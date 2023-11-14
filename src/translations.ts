// type BackgroundPluginTranslationsText =
//   | "Absolute path begins with ../../../data"
//   | "After enable, restore the tab closing button to the default style"
//   | "Background"
//   | "Background blur"
//   | "Background brightness"
//   | "Background contrast"
//   | "Background Filters"
//   | "Background grayscale"
//   | "Background hue rotate"
//   | "Background image master switch"
//   | "Background invert"
//   | "Background opacity"
//   | "Background path"
//   | "Background saturate"
//   | "Background sepia"
//   | "Background show type"
//   | "Center"
//   | "Contain"
//   | "Cover"
//   | "Do not affect the terminal font, the terminal font still uses the font in the [appearance] configuration"
//   | "Drop shadow blur"
//   | "Drop shadow color"
//   | "Drop Shadow Parameters"
//   | "Drop shadow X offset"
//   | "Drop shadow Y offset"
//   | "Enable background"
//   | "Enable drop shadow"
//   | "Extra Settings"
//   | "Enable tabs parameter override"
//   | "Enable UI font replace"
//   | "Fix close button font"
//   | "Float"
//   | "Float Parameters"
//   | "Float size"
//   | "Float X align"
//   | "Float X offset"
//   | "Float Y align"
//   | "Float Y offset"
//   | "Fullscreen"
//   | "Fullscreen type"
//   | "Group list transparent"
//   | "Make home page menu and other group list background transparent"
//   | "Make terminal toolbar background transparent"
//   | "No Repeat"
//   | "Repeat"
//   | "Repeat type"
//   | "Tabs dynamic width min"
//   | "Tabs fixed width"
//   | "Terminal toolbar transparent"
//   | "UI Font"
//   | "UI Font Family"
//   | "Unit: %, 0 = unchanged"
//   | "Unit: %, 100 = unchanged"
//   | "Unit: degree, 0 = unchanged"
//   | "Unit: px"
//   | "Unit: px, 0 = unchanged"
//   | "Use RGBA format(#FF0000A0) or use color name(red, green, blue, etc...)";

type BackgroundPluginTranslations = Record<string, string>;

export const translations: [string, BackgroundPluginTranslations][] = [
  [
    "zh-CN",
    {
      "Relative path begins with ../../../data": "相对路径从../../../data开始",
      "After enable, restore the tab closing button to the default style":
        "启用后将标签页关闭按钮恢复为默认样式",
      Background: "背景",
      "Background blur": "背景模糊度",
      "Background brightness": "背景亮度",
      "Background contrast": "背景对比度",
      "Background Filters": "背景特效",
      "Background grayscale": "背景灰度",
      "Background hue rotate": "背景色相旋转",
      "Background image master switch": "背景图片总开关",
      "Background invert": "背景反转",
      "Background opacity": "背景不透明度",
      "Background path": "背景图片路径",
      "Background saturate": "背景饱和度",
      "Background sepia": "背景褐色",
      "Background show type": "背景显示类型",
      Center: "中央",
      Contain: "适应",
      Cover: "填充",
      "Do not affect the terminal font, the terminal font still uses the font in the [appearance] configuration":
        "不影响终端字体，终端字体仍使用【外观】配置中的字体",
      "Drop shadow blur": "阴影模糊",
      "Drop shadow color": "阴影颜色",
      "Drop Shadow Parameters": "背景阴影参数",
      "Drop shadow X offset": "阴影X偏移",
      "Drop shadow Y offset": "阴影Y偏移",
      "Enable background": "是否启用背景图片",
      "Enable drop shadow": "启用背景阴影",
      "Extra Settings": "额外设置",
      "Enable tabs parameter override": "启用标签页参数覆盖",
      "Enable UI font replace": "是否启用界面字体替换",
      "Fix close button font": "修复标签页关闭按钮字体",
      Float: "浮动",
      "Float size": "浮动大小",
      "Float Parameters": "浮动参数",
      "Float X align": "浮动X对齐",
      "Float X offset": "浮动X偏移",
      "Float Y align": "浮动Y对齐",
      "Float Y offset": "浮动Y偏移",
      Fullscreen: "全屏",
      "Fullscreen type": "全屏类型",
      "Group list transparent": "分组列表透明度",
      "No Repeat": "不重复",
      Repeat: "重复",
      "Repeat type": "重复类型",
      "Tabs dynamic width min": "动态标签页宽度最小宽度",
      "Tabs fixed width": "固定标签页宽度",
      "Terminal toolbar transparent": "终端工具栏透明度",
      "UI Font Family": "界面字体",
      "UI Font": "字体",
      "Unit: %, 0 = disable, Make home page menu and other group list background transparent":
        "单位：%，0 = 禁用，让首页菜单和其他分组列表背景呈现半透明",
      "Unit: %, 0 = disable, Make terminal toolbar background transparent":
        "单位：%，0 = 禁用，让终端工具栏的背景呈现半透明",
      "Unit: %, 0 = unchanged": "单位：%，0 = 不改变",
      "Unit: %, 100 = unchanged": "单位：%，100 = 不改变",
      "Unit: degree, 0 = unchanged": "单位：度，0 = 不改变",
      "Unit: px": "单位：像素",
      "Unit: px, 0 = unchanged": "单位：像素，0 = 不改变",
      "Use RGBA format(#FF0000A0) or use color name(red, green, blue, etc...)":
        "使用RGBA格式（如：#FF0000A0），或者使用颜色名字（red, green, blue, etc...）",
    },
  ],
];
