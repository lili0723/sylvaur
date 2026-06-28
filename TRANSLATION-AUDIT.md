# 翻译审查清单 — 终版

## ✅ 全部完成（8 语言覆盖）

### 用户可见文案
- 导航栏、首页全部区块、产品页、产品详情、关于我们、认证、联系、页脚
- 联系表单（含下拉选项、错误提示、成功提示）
- 产品数据中英双语（MDX `_zh` 字段）
- 面包屑、规格标签、协商提示、"查看全部产品"

### SEO 元数据
- 全局 metadata（title/description）
- 6 个页面级 metadata（about / contact / products / pillows / scarves / certifications）
- 产品详情 metadata（从 MDX seoTitle/seoDescription 读取）
- 404 metadata（"Product Not Found" / "产品未找到"）

### 图片 Alt 文本
- ProductCategories（分类卡片）
- 抱枕/围巾列表页 Banner
- 产品详情页（自动使用产品名）

### 代码层面
- `localizeProduct()` 自动根据 locale 切换产品数据
- `FeaturedProducts` / 产品列表页 / 详情页均使用 `localizeProduct()`

## 📋 新增翻译操作指南

1. EN + ZH 在 `messages/{en,zh}.json` 里改
2. 其他 6 种语言（VI/TH/ID/DE/FR/ES）需对应更新 `messages/{lang}.json`
3. 新增 MDX 产品时，记得填写 `_zh` 中文字段：
   ```
   name_zh, material_zh, size_zh, color_zh, moq_zh
   customization_zh, description_zh
   ```
