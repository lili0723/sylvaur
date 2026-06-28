# 图片目录说明

## 文件结构

```
public/images/
├── hero/              ← 首页大图
│   └── 1.webp（1920×900 横版）
├── home/              ← 首页区块素材
│   ├── 1.webp（抱枕分类卡片）
│   └── 2.webp（围巾分类卡片）
├── pillows/           ← 抱枕产品
│   ├── classic-cotton-pillow/（经典棉抱枕）
│   │   ├── 1.webp    ← 正面白底
│   │   ├── 2.webp    ← 场景搭配
│   │   └── 3.webp    ← 面料细节
│   └── linen-decorative-cushion/（亚麻装饰靠垫）
│       ├── 1.webp
│       ├── 2.webp
│       └── 3.webp
├── scarves/           ← 围巾产品
│   ├── silk-square-scarf/（真丝方巾）
│   │   ├── 1.webp    ← 正面平铺
│   │   ├── 2.webp    ← 模特佩戴
│   │   └── 3.webp    ← 面料细节
│   └── cotton-blend-wrap/（棉混纺围巾）
│       ├── 1.webp
│       ├── 2.webp
│       └── 3.webp
├── factory/           ← 合作工厂照片
│   ├── 1.webp（工厂外观）
│   ├── 2.webp（车间）
│   ├── 3.webp（产品展示间）
│   └── 4.webp（发货区）
├── cert/              ← 认证证书
├── team/              ← 团队/广交会照片
├── clients/           ← 客户Logo
└── og/                ← 社交分享图
    └── 1.jpg（1200×630）
```

## 规则

1. **图片格式**：全部用 WebP（体积小，加载快），OG 分享图用 JPG
2. **命名**：每个产品文件夹内按 1.webp、2.webp、3.webp 编号
3. **尺寸建议**：
   - 产品主图：800×800
   - 场景图：800×600
   - Banner：1920×900
   - OG 分享图：1200×630
4. **新增产品**：
   - 在 `content/products/{pillows或scarves}/` 下新建 `.mdx` 文件
   - 在 `public/images/{pillows或scarves}/` 下新建**同名文件夹**
   - 照片放进去按 1.webp、2.webp 命名即可，不用改代码

## AI 生成提示词

见项目根目录 `IMAGE-PROMPTS.md`
