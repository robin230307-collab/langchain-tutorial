import { TutorialData, TutorialCategory } from '../types';

export type { TutorialCategory };

export const tutorialData: TutorialData = {
  categories: [
    {
      id: 'input-output',
      name: '输入与输出工具',
      nameEn: 'Input & Output Tools',
      icon: '💬',
      description: '学习如何构建提示、处理模型输出',
      color: 'bg-blue-500',
      tutorials: [
        {
          id: 'prompt-template',
          name: 'Prompt Template',
          icon: '📝',
          description: '创建可复用的提示模板',
          difficulty: 'beginner',
          relatedTools: ['Few-Shot Templates', 'Chat Models'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：一个模板 + 变量 = 个性化提示

# 步骤1：定义模板
"请用{style}风格写一篇关于{topic}的文章"

# 步骤2：填入变量
style = "专业学术"
topic = "人工智能"

# 步骤3：生成提示
result = "请用专业学术风格写一篇关于人工智能的文章"
`,
            description: '了解 Prompt Template 的基本用法'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Prompt Template？',
              content: `Prompt Template 是 LangChain 中用于创建可复用提示的组件。它允许你定义一个带有变量的模板，然后在运行时填入具体的值。

就像写邮件模板一样 - 你可以定义"亲爱的 {姓名}，感谢您购买 {产品}"这样的模板，然后每次使用时填入不同的姓名和产品名。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `Prompt Template 解决了以下问题：

1. **避免重复** - 不需要每次都写完整的提示
2. **统一格式** - 确保输出格式一致
3. **易于测试** - 轻松替换变量测试不同效果
4. **代码复用** - 一个模板多处使用`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 创建模板',
                  description: '定义带有变量的提示模板',
                  code: `# 模板字符串格式
template = "请为{audience}解释{concept}，用{length}的长度"

# 示例：
# {audience} = "10岁小朋友"
# {concept} = "什么是光合作用"
# {length} = "100字以内"`
                },
                {
                  title: 'Step 2: 填入变量',
                  description: '生成具体的提示',
                  code: `# 方式1：直接格式化
prompt = "请为10岁小朋友解释什么是光合作用，用100字以内的长度"

# 方式2：使用模板引擎
prompt = template.format(
    audience="10岁小朋友",
    concept="光合作用",
    length="100字以内"
)`
                },
                {
                  title: 'Step 3: 调用 AI',
                  description: '将提示发送给 AI',
                  code: `# 使用任意 AI 工具
ai_response = call_ai(prompt)

# 推荐工具：
# - ChatGPT / Claude（通用场景）
# - 通义千问 / 文心一言（中文场景）
# - 直接在 LangChain 中配置`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📊 财务报告生成',
                  why: '财务团队需要生成格式统一的各种报告：月度报告、季度报告、年报等，每个报告的结构相似，但数据和对象不同。',
                  example: '模板："请生成{period}的财务分析报告，包含营收、支出、利润分析，格式按照标准模板，报告对象是{audience}"'
                },
                {
                  scenario: '⚖️ 法律文书撰写',
                  why: '律师需要撰写大量格式规范的法律文书：合同、函件、法律意见书等，格式固定但具体内容变化。',
                  example: '模板："作为{role}，起草一份关于{subject}的{type}，其中关键条款包括{clauses}，使用标准法律格式"'
                },
                {
                  scenario: '🏥 医疗报告生成',
                  why: '医生需要撰写病历、诊断报告、出院小结等，结构固定但每个患者情况不同。',
                  example: '模板："为患者{patient_name}生成{report_type}，包含症状{symptoms}、诊断{diagnosis}、建议{treatment}"'
                },
                {
                  scenario: '📰 新闻写作',
                  why: '新闻编辑需要快速生成格式统一的新闻稿件：体育报道、财经新闻、科技资讯等。',
                  example: '模板："写一篇关于{event}的{type}新闻，要求：{style}风格，{length}字数，包含关键信息：{key_points}"'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## 底层原理

### 模板解析流程

1. **模板定义** → 定义包含占位符的字符串
2. **变量提取** → 自动识别所有 {变量名}
3. **类型检查** → 验证必填变量都已提供
4. **字符串替换** → 将变量值替换进模板

### 提示词工程技巧

**好的变量命名**：
\`\`\`
# ❌ 模糊
"{x}"

# ✅ 清晰
"{target_audience}" / "{content_theme}"
\`\`\`

**变量描述**：
在生产环境中，给变量添加描述可以提高模板可维护性。

### 高级技巧

**部分变量**：
\`\`\`python
# 预填充部分变量
template = template.partial(language="中文")
# 之后只需填充剩余变量
\`\`\``
            }
          ]
        },
        {
          id: 'few-shot-template',
          name: 'Few-Shot Templates',
          icon: '🎯',
          description: '通过示例教会模型输出格式',
          difficulty: 'beginner',
          relatedTools: ['Prompt Template', 'Output Parser'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：示例 + 模板 = 教会 AI 输出格式

# 提供几个示例：
示例1：
输入："开心"
输出：反义词是"难过"

示例2：
输入："高大"
输出：反义词是"矮小"

# AI 会自动学会这个模式：
输入："光明"
输出：反义词是"黑暗"`,
            description: '了解 Few-Shot 的基本用法'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Few-Shot Templates？',
              content: `Few-Shot Templates 是一种通过提供示例来指导模型输出的技术。它在提示中加入几个"例子"，让模型理解你期望的输出格式或推理模式。

就像教孩子写字时给他看范例一样 - 提供几个正确的例子，他就能学会模式并应用到新的输入上。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **精确控制格式** - 示例比文字描述更清晰
2. **处理复杂任务** - 难以用文字描述的格式
3. **减少错误** - AI 更容易理解真实意图
4. **无需训练** - 通过提示就能获得特定格式`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 准备示例',
                  description: '准备 2-5 个典型示例',
                  code: `示例格式：
Q: [问题]
A: [期望答案]

示例：
Q: 这部电影太精彩了！
A: 情感：正面

Q: 服务态度很差
A: 情感：负面

Q: 味道还行
A: 情感：中性`
                },
                {
                  title: 'Step 2: 创建模板',
                  description: '将示例嵌入提示模板',
                  code: `模板结构：
[示例区域]
---
[新问题]

完整示例：
示例1：
输入："这部电影太精彩了！"
情感：正面

示例2：
输入："等待时间太长了"
情感：负面
---
现在请判断：
输入："性价比很高"
情感：`
                },
                {
                  title: 'Step 3: 测试和调整',
                  description: '观察结果，调整示例',
                  code: `# 可能需要调整的情况：
# 1. 示例不够典型 → 增加更清晰的示例
# 2. 输出格式不对 → 简化示例格式
# 3. 理解有偏差 → 在示例中加注释说明

# 调整策略：
# - 3-5个示例效果最好
# - 示例要多样化且典型
# - 保持示例格式一致`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📈 财务数据分析',
                  why: '需要从非结构化的财务描述中提取结构化数据，如收入增长率、利润率、负债情况等。',
                  example: '示例："Q: 公司去年营收增长20%，净利润率15%，负债率30%。请提取关键财务指标。A: {revenue_growth: "20%", net_margin: "15%", debt_ratio: "30%"}'
                },
                {
                  scenario: '📋 简历信息提取',
                  why: 'HR 需要从简历中快速提取关键信息：姓名、学历、工作经验、技能等。',
                  example: '示例：输入简历文本 → 输出结构化的候选人信息（姓名、学校、公司、职位、技能列表）'
                },
                {
                  scenario: '🔍 合同条款分类',
                  why: '法律团队需要快速识别合同中的关键条款：保密条款、违约责任、终止条件等。',
                  example: '示例：输入合同文本 → 输出条款分类（保密: 是/否, 违约金: X%, 终止条件: ...）'
                },
                {
                  scenario: '🎬 电影评论分析',
                  why: '营销团队需要分析用户评论，提取评分、情感、关键词、观看群体等信息。',
                  example: '示例：输入"这部电影特效太棒了，但剧情有点拖沓" → 输出 {rating: 4, sentiment: "正面", keywords: ["特效", "剧情"], aspect: ["正面", "负面"]}'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Few-Shot 底层原理

### 示例选择策略

LangChain 提供多种示例选择方式：

**固定示例**（适合固定场景）：
\`\`\`
每次都用同样的3-5个示例
简单直接，但不够灵活
\`\`\`

**动态选择**（适合多样化场景）：
\`\`\`
根据输入自动选择最相关的示例
需要使用"相似度选择器"
\`\`\`

### 示例数量权衡

| 数量 | 优点 | 缺点 |
|------|------|------|
| 1-2个 | 节省 token | 可能不够清晰 |
| 3-5个 | 效果最佳 | token 消耗增加 |
| 5+ | 更准确 | 成本高，可能过拟合 |

### 提高准确率的技巧

1. **示例要多样化** - 覆盖不同情况
2. **格式要一致** - 每个示例格式相同
3. **包含边界情况** - 如负面示例
4. **避免歧义** - 示例要清晰无歧义`
            }
          ]
        },
        {
          id: 'output-parser',
          name: 'Output Parser',
          icon: '🔧',
          description: '解析和验证模型输出',
          difficulty: 'beginner',
          relatedTools: ['Prompt Template', 'Structured Output'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：定义结构 → AI 输出 → 自动解析

# Step 1: 定义你想要的数据结构
例如：提取简历信息
{
  "姓名": "张三",
  "学历": "硕士",
  "工作年限": 5,
  "技能": ["Python", "数据分析"]
}

# Step 2: 让 AI 按这个格式输出
# 提供示例，AI 会学习格式

# Step 3: 自动解析成代码可用的对象
# 不再是字符串，而是可直接使用的字典/对象`,
            description: '了解 Output Parser 的基本用法'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Output Parser？',
              content: `Output Parser 是用于解析和验证模型输出的组件。它可以将 AI 生成的自由文本转换为结构化数据（JSON、Python 对象），并验证输出是否符合预期格式。

就像给 AI 输出安装了一个"翻译器" - 把 AI 的自然语言回复转换成程序可以直接使用的数据格式。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **结构化输出** - 让 AI 输出可预测的格式
2. **自动验证** - 检查输出是否符合要求
3. **类型安全** - 获得正确类型的 Python 对象
4. **错误恢复** - 提供纠错机制处理格式错误`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 定义数据结构',
                  description: '告诉 AI 你想要什么格式',
                  code: `# 方式1：直接说明
"请以 JSON 格式输出，包含 name, age, skills 字段"

# 方式2：提供示例
"请按以下格式输出：
{
  "name": "张三",
  "age": 25,
  "skills": ["Python", "AI"]
}"`,
                },
                {
                  title: 'Step 2: 让 AI 输出',
                  description: '配合 Few-Shot 效果更好',
                  code: `# 完整提示示例
prompt = """
从以下文本中提取信息，输出 JSON 格式：

文本：{text}

输出格式：
{
  "公司名称": "...",
  "成立时间": "...",
  "主营业务": "..."
}

示例：
输入："阿里巴巴集团成立于1999年，主营电商业务"
输出：{"公司名称": "阿里巴巴集团", "成立时间": "1999年", "主营业务": "电商业务"}
---
输入：{text}
输出："""
# 将文本填入 {text}`,
                },
                {
                  title: 'Step 3: 解析和使用',
                  description: '将输出转换为代码对象',
                  code: `# 如果 AI 输出的是纯文本 JSON
import json

# 方式1：直接解析
result = json.loads(ai_output)
print(result["公司名称"])

# 方式2：使用 LangChain OutputParser
# 会自动处理格式错误、重试等`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📊 财务报表提取',
                  why: '财务系统需要从 PDF 或扫描件中提取发票信息，生成结构化数据用于报销和记账。',
                  example: '输出格式：{invoice_no: "INV-2024-001", amount: 1500.00, date: "2024-01-15", vendor: "XX公司", items: [...]}'
                },
                {
                  scenario: '📝 合同审查',
                  why: '法务团队需要从合同中提取关键条款，自动生成审查清单和风险评估。',
                  example: '输出格式：{parties: [...], effective_date: "...", termination_clauses: [...], risk_level: "high/medium/low"}'
                },
                {
                  scenario: '🔬 医学文献摘要',
                  why: '研究人员需要从大量医学论文中提取关键信息：研究方法、样本量、主要结论等。',
                  example: '输出格式：{title: "...", method: "...", sample_size: N, conclusion: "...", key_finding: "..."}'
                },
                {
                  scenario: '🏠 房产信息提取',
                  why: '房产平台需要从房源描述中提取结构化信息，便于搜索和筛选。',
                  example: '输出格式：{price: 500万, area: "120㎡", rooms: 3, floor: "中高层", orientation: "南", decoration: "精装修"}'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Output Parser 工作原理

### 解析流程

\`\`\`
原始文本 → 提取 JSON → 格式验证 → 类型转换 → 结构化对象
\`\`\`

### 常见 Parser 类型

**Pydantic Output Parser**（推荐）：
\`\`\`
- 用 Pydantic 模型定义输出结构
- 自动生成格式说明
- 类型验证和错误处理
\`\`\`

**JSON Output Parser**：
\`\`\`
- 简单直接
- 输出必须是有效的 JSON
\`\`\`

### 错误恢复机制

当 AI 输出格式错误时：
1. 记录原始输出
2. 生成纠错提示
3. 让 AI 重新生成
4. 最多重试 3 次

### 自定义 Parser

\`\`\`python
class CustomParser:
    def get_format_instructions(self):
        # 返回给 AI 的格式说明
        return "请按以下格式输出：..."

    def parse(self, text):
        # 解析 AI 输出
        return parsed_result
\`\`\``
            }
          ]
        }
      ]
    },
    {
      id: 'document-processing',
      name: '文档处理工具',
      nameEn: 'Document Processing',
      icon: '📄',
      description: '加载、分割和向量化文档',
      color: 'bg-green-500',
      tutorials: [
        {
          id: 'document-loader',
          name: 'Document Loader',
          icon: '📂',
          description: '从各种来源加载文档',
          difficulty: 'beginner',
          relatedTools: ['Text Splitter', 'Embedding'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：把各种格式的文档变成统一格式

# 支持的文档类型：
# - PDF 文件（论文、合同、报告）
# - Word 文档
# - 网页内容
# - 文本文件
# - Notion / Confluence 页面

# 工作流程：
# 1. 选择对应加载器
# 2. 读取文档
# 3. 获得统一的 Document 对象`,
            description: '了解 Document Loader 的基本用法'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Document Loader？',
              content: `Document Loader 是用于从各种来源加载文档的组件。它可以读取 PDF、Word、网页等不同格式的文档，并将其转换为统一的 Document 对象格式。

就像一个万能读卡器 - 不管是什么类型的文档，它都能读取并转换成程序可以处理的标准格式。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **统一接口** - 不同格式文档使用相同方式加载
2. **保留元数据** - 自动提取标题、来源、页码等信息
3. **处理复杂格式** - 支持表格、图片描述等复杂内容
4. **集成方便** - 轻松对接各种数据源`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 选择加载器',
                  description: '根据文档类型选择对应工具',
                  code: `# PDF 文档
使用：PyPDFLoader / PDFMinerLoader

# Word 文档
使用：Docx2txtLoader / UnstructuredWordDocumentLoader

# 网页
使用：WebBaseLoader / UnstructuredURLLoader

# 文本文件
使用：TextLoader

# 目录批量加载
使用：DirectoryLoader（支持 glob 过滤）`
                },
                {
                  title: 'Step 2: 读取文档',
                  description: '加载文档内容',
                  code: `# PDF 示例
loader = PDFLoader("document.pdf")
documents = loader.load()

# 获取内容
for doc in documents:
    print(doc.page_content)  # 文本内容
    print(doc.metadata)        # 元数据（页码等）`,
                },
                {
                  title: 'Step 3: 后续处理',
                  description: '通常配合分割和向量化使用',
                  code: `# 完整流程示例
1. 加载文档 → 2. 分割文本 → 3. 向量化 → 4. 存储

# 或直接用于问答
# 加载 → 分割 → 转换为问题答案对 → 存储向量库`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📚 企业知识库构建',
                  why: '公司有大量历史文档（政策手册、培训资料、技术文档），需要构建可搜索的知识库。',
                  example: '从 Confluence / SharePoint / 本地文件批量加载所有文档，建立内部知识搜索系统'
                },
                {
                  scenario: '📰 新闻聚合与摘要',
                  why: '新闻网站需要定期抓取、存储新闻文章，用于热点分析和内容推荐。',
                  example: '爬取多个新闻源 → 加载为 Document → 分割 → 向量存储 → 支持语义搜索'
                },
                {
                  scenario: '📋 简历筛选系统',
                  why: 'HR 需要从大量简历中快速找到符合条件的候选人。',
                  example: '批量加载简历文件（PDF/Word）→ 提取关键信息 → 结构化存储 → 智能筛选'
                },
                {
                  scenario: '📑 合同管理系统',
                  why: '法务部门需要管理大量合同，支持快速检索和到期提醒。',
                  example: '扫描/上传合同 PDF → 自动加载 → 提取关键条款 → 建立索引'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Document Loader 底层原理

### Document 对象结构

\`\`\`python
class Document:
    page_content: str  # 文本内容
    metadata: dict      # 元数据（来源、页码等）
\`\`\`

### 常用加载器对比

| 加载器 | 适用场景 | 特点 |
|--------|----------|------|
| PDFLoader | PDF 文档 | 保留页码 |
| WebBaseLoader | 网页 | 自动清理 HTML |
| DirectoryLoader | 文件夹 | 批量处理 |
| NotionLoader | Notion | 保留数据库结构 |
| Unstructured | 通用 | 支持多种格式 |

### 自定义加载器

\`\`\`python
from langchain.document_loaders.base import BaseLoader

class MyLoader(BaseLoader):
    def load(self):
        # 1. 读取数据源
        content = self.read_source()
        # 2. 解析内容
        text = self.parse(content)
        # 3. 返回 Document 列表
        return [Document(page_content=text)]
\`\`\``
            }
          ]
        },
        {
          id: 'text-splitter',
          name: 'Text Splitter',
          icon: '✂️',
          description: '将长文档分割成小块',
          difficulty: 'beginner',
          relatedTools: ['Document Loader', 'Embedding', 'Vector Store'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：把长文本切成小块

# 为什么需要分割？
# 1. AI 有上下文长度限制
# 2. 便于精准检索（大海捞针问题）
# 3. 控制每块的信息密度

# 关键参数：
# - chunk_size：每块多大（通常 500-1000 字符）
# - chunk_overlap：块之间重叠多少（保留上下文）
# - separator：按什么分割（段落、句子等）`,
            description: '了解 Text Splitter 的基本用法'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Text Splitter？',
              content: `Text Splitter 用于将长文档分割成较小的文本块（chunks）。这是构建 RAG（检索增强生成）系统的关键步骤。

就像把一本长书分成一页一页 - 方便阅读和查找。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **模型限制** - 大多数 AI 有上下文长度限制
2. **检索效率** - 小块更容易找到精确匹配的内容
3. **嵌入限制** - 嵌入模型有最大 token 数限制
4. **语义连贯** - 按段落分割保持语义完整性`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 选择分割策略',
                  description: '根据内容类型选择合适策略',
                  code: `# 通用场景
RecursiveCharacterTextSplitter
- 按优先级尝试：段落 → 句子 → 单词 → 字符
- 最常用，效果好

# Markdown 文档
MarkdownTextSplitter
- 按标题、列表等结构分割

# 代码文件
LanguageRecursiveTextSplitter
- 支持 Python、JS、Java 等多种语言

# 精确控制 token
TokenTextSplitter
- 按 token 数分割，适合配合 GPT 使用`
                },
                {
                  title: 'Step 2: 设置参数',
                  description: '调整分割大小和重叠',
                  code: `# 常用配置
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,      # 每块 500 字符
    chunk_overlap=50,    # 块之间重叠 50 字符
    separators=["\n\n", "\n", "。", "，", " "]  # 分割优先级
)

# 中文建议
# chunk_size: 300-500（中文字符信息密度高）
# chunk_overlap: 30-50
# separators: ["\n\n", "\n", "。", "！", "？", "，", " "]`
                },
                {
                  title: 'Step 3: 执行分割',
                  description: '分割文本或文档列表',
                  code: `# 分割文本
chunks = splitter.split_text(long_text)
print(f"分割成 {len(chunks)} 个块")

# 分割文档（保留元数据）
docs = splitter.split_documents(documents)

# 分割后通常用于：
# 1. 存入向量数据库
# 2. 作为 RAG 的检索单元
# 3. 生成摘要`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📖 长篇小说分析',
                  why: '分析一本几十万的网络小说，提取人物关系、情节发展、主题变化等信息。',
                  example: '按章节分割 → 分析每章主题 → 提取人物出场和关系变化 → 生成故事线'
                },
                {
                  scenario: '📑 法律条文解读',
                  why: '律师需要分析长篇法规，找出与案件相关的条款和司法解释。',
                  example: '按章节/条款分割法律文本 → 建立条款索引 → 快速定位相关法规'
                },
                {
                  scenario: '🧪 科研论文阅读',
                  why: '研究人员需要快速理解长篇论文的核心观点、方法论和结论。',
                  example: '按摘要/方法/结果/讨论分割 → 各部分独立分析 → 关键信息提取'
                },
                {
                  scenario: '📜 历史档案整理',
                  why: '档案馆需要数字化和整理大量历史文献，支持学术研究检索。',
                  example: '按文献/章节/段落分割 → 标注时间/人物/事件 → 建立历史知识图谱'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Text Splitter 底层原理

### 分割算法

RecursiveTextSplitter 的分割逻辑：
\`\`\`
1. 按第一分隔符分割
2. 检查每块大小
3. 如果太大，按下一个分隔符继续分割
4. 直到所有块都符合大小要求
\`\`\`

### Chunk Overlap 的作用

重叠区域确保：
- 边界内容不会丢失
- 跨块语义保持连贯
- 检索时更容易命中完整概念

### 参数调优指南

| 参数 | 小值 | 大值 |
|------|------|------|
| chunk_size | 更精准 | 更完整 |
| chunk_overlap | 更少重复 | 更好连贯 |

**建议**：
- 通用场景：500/50
- 中文场景：300-400/30-50
- 精确检索：200-300/20-30`
            }
          ]
        },
        {
          id: 'embedding',
          name: 'Embedding',
          icon: '🔢',
          description: '文本向量化和语义搜索',
          difficulty: 'intermediate',
          relatedTools: ['Vector Store', 'Retriever'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：把文字变成数字

# Embedding = 文本 → 向量（一串数字）

# 关键特点：
# - 语义相似的文本，向量也相似
# - 可以计算"距离"来比较相似度

# 示例：
# "苹果" 和 "水果" → 向量距离近
# "苹果" 和 "汽车" → 向量距离远

# 用途：语义搜索、文本分类、相似度计算`,
            description: '了解 Embedding 的基本概念'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Embedding？',
              content: `Embedding（嵌入）是将文本转换为数字向量的技术。这些向量捕获了文本的语义信息，使得语义相似的文本在向量空间中距离相近。

就像给每个词/句子一本书的坐标位置 - "苹果"和"水果"会离得很近，而"苹果"和"汽车"会离得很远。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **语义搜索** - 通过向量相似度实现语义匹配
2. **文本比较** - 计算两个文本的相似程度
3. **聚类分析** - 将相似文档分组
4. **降维可视化** - 将高维文本映射到低维空间`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 选择 Embedding 模型',
                  description: '根据场景选择合适的模型',
                  code: `# OpenAI（效果好，需要 API 费用）
text-embedding-ada-002
text-embedding-3-small（更快）

# 开源免费（HuggingFace）
sentence-transformers/all-MiniLM-L6-v2
BAAI/bge-large-zh（中文优化）

# 国产
智源 BGE、讯飞 Embedding`
                },
                {
                  title: 'Step 2: 生成向量',
                  description: '对文本进行向量化',
                  code: `# 基本用法
embedding = OpenAIEmbeddings()

# 单个文本
vector = embedding.embed_query("什么是机器学习")

# 批量文本
vectors = embedding.embed_documents([
    "机器学习是AI的一个分支",
    "深度学习使用神经网络",
    "今天天气很好"
])`
                },
                {
                  title: 'Step 3: 计算相似度',
                  description: '比较向量之间的距离',
                  code: `# 余弦相似度（常用）
similarity = cosine_similarity(vector1, vector2)
# 结果 0-1 之间，越接近 1 越相似

# 用途示例
# 1. 搜索：找到与问题最相似的文档
# 2. 去重：找出相似度高的重复文档
# 3. 推荐：找到相似的内容推荐给用户`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '🔍 智能客服',
                  why: '用户用自然语言提问，系统需要找到最相关的 FAQ 或解决方案。',
                  example: '用户："怎么重置密码" → Embedding → 与 FAQ 库匹配 → 返回"如何修改密码"等相关文章'
                },
                {
                  scenario: '📰 新闻推荐',
                  why: '根据用户阅读历史，推荐感兴趣的新闻文章。',
                  example: '用户阅读了科技新闻 → 找出相似文章 → 推荐给用户（相似度 > 0.8）'
                },
                {
                  scenario: '🔎 学术文献检索',
                  why: '研究人员需要从海量论文中找到与研究方向相关的文献。',
                  example: '输入研究问题 → Embedding → 在论文库中检索 → 返回语义相关的论文列表'
                },
                {
                  scenario: '🏢 合同查重',
                  why: '法务部门需要识别高度相似的合同，防止重复或抄袭。',
                  example: '上传新合同 → Embedding → 与已有合同库比较 → 标记相似度 > 0.9 的合同'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Embedding 底层原理

### Transformer 架构

现代 Embedding 基于 Transformer：

1. **输入处理** - 文本被分词（tokenize）
2. **编码** - 通过多层 Self-Attention 编码
3. **池化** - 最后一层输出池化为向量

### 常见 Embedding 模型

| 模型 | 维度 | 特点 |
|------|------|------|
| ada-002 | 1536 | 高精度 |
| text-embedding-3-small | 1536 | 速度快 |
| MiniLM | 384 | 高效率 |
| BGE-large | 1024 | 中文优化 |

### 相似度计算

\`\`\`python
import numpy as np

def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))
\`\`\``
            }
          ]
        },
        {
          id: 'vector-store',
          name: 'Vector Store',
          icon: '🗄️',
          description: '存储和检索向量数据',
          difficulty: 'intermediate',
          relatedTools: ['Embedding', 'Retriever'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：向量数据库

# 功能：
# 1. 存储大量向量
# 2. 快速找到最相似的向量

# 常见向量数据库：
# - FAISS（免费、快速、本地）
# - Chroma（易用、支持持久化）
# - Pinecone（云服务、大规模）
# - Milvus（国产、开源）

# 工作流程：
# 文档 → Embedding → 存入向量库 → 检索 → 使用`,
            description: '了解 Vector Store 的基本概念'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Vector Store？',
              content: `Vector Store（向量数据库）专门用于存储和检索向量数据。它能够：
1. 高效存储大量向量
2. 快速进行相似性搜索
3. 支持向量 CRUD 操作

常见实现：FAISS、Chroma、Pinecone、Milvus 等。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **海量数据** - 处理百万级向量
2. **实时检索** - 毫秒级相似度搜索
3. **可扩展** - 水平扩展支持更大规模
4. **持久化** - 数据持久存储`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 选择向量数据库',
                  description: '根据场景选择合适工具',
                  code: `# 开发测试 / 小规模
FAISS - Facebook 出品，免费快速
Chroma - 轻量，支持持久化

# 生产环境 / 大规模
Pinecone - 云服务，无需运维
Milvus - 开源，可私有部署
Weaviate - 支持混合检索`
                },
                {
                  title: 'Step 2: 存入向量',
                  description: '将文档转为向量后存储',
                  code: `# 以 Chroma 为例
from langchain.vectorstores import Chroma

# 从文档创建向量库
vectorstore = Chroma.from_documents(
    documents=chunks,      # 分割好的文档块
    embedding=embedding,   # Embedding 模型
    persist_directory="./db"  # 存储路径
)

# 或从文本创建
vectorstore = Chroma.from_texts(
    texts=["苹果是水果", "香蕉是水果"],
    embedding=embedding
)`
                },
                {
                  title: 'Step 3: 检索使用',
                  description: '根据查询找到相关文档',
                  code: `# 相似度搜索
results = vectorstore.similarity_search(
    query="水果有哪些",  # 查询文本
    k=3                   # 返回 3 个结果
)

# 查看结果
for doc in results:
    print(doc.page_content)  # 文档内容
    print(doc.metadata)       # 元数据

# 带分数的搜索
results = vectorstore.similarity_search_with_score(
    query="...",
    k=3
)
for doc, score in results:
    print(f"相似度: {score:.4f}, 内容: {doc.page_content}")`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '💼 企业内部知识库',
                  why: '员工需要快速找到公司政策、流程文档、技术规范等资料。',
                  example: '员工问"年假怎么计算" → 语义搜索 → 返回 HR 政策手册中相关章节'
                },
                {
                  scenario: '🛒 电商商品搜索',
                  why: '用户用自然语言搜索，平台需要找到语义相关的商品。',
                  example: '用户搜"适合送父母的礼物" → 返回"保健品"、"养生礼品"等分类商品'
                },
                {
                  scenario: '📚 在线课程推荐',
                  why: '平台需要根据用户学习历史，推荐相关课程。',
                  example: '用户学过"Python基础" → 推荐"Python进阶"、"数据分析"等课程'
                },
                {
                  scenario: '🏥 病例检索',
                  why: '医生需要找到相似的病例，辅助诊断。',
                  example: '输入当前症状描述 → 检索相似病例 → 提供诊断参考'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Vector Store 底层原理

### 索引算法

**暴力搜索**（Flat）：
\`\`\`
O(n) = 遍历所有向量
优点：精确
缺点：慢
\`\`\`

**IVF（倒排索引）**：
\`\`\`
1. 先聚类
2. 搜索时只比较最近的几个簇
优点：快
缺点：可能有精度损失
\`\`\`

**HNSW（图索引）**：
\`\`\`
构建分层小世界图
优点：查询极快
缺点：内存占用大
\`\`\`

### 选型建议

| 场景 | 推荐 |
|------|------|
| 本地开发 | FAISS / Chroma |
| 小规模生产 | Chroma |
| 大规模云服务 | Pinecone |
| 私有部署 | Milvus |
| 混合检索 | Weaviate`
            }
          ]
        }
      ]
    },
    {
      id: 'memory',
      name: '对话记忆',
      nameEn: 'Conversation Memory',
      icon: '🧠',
      description: '管理对话历史和上下文',
      color: 'bg-purple-500',
      tutorials: [
        {
          id: 'memory-types',
          name: 'Memory 类型',
          icon: '💾',
          description: '各种对话记忆的实现方式',
          difficulty: 'intermediate',
          relatedTools: ['LCEL', 'Chains'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：让 AI 记住对话历史

# 问题：AI 默认不记得之前的对话
# 解决：把历史对话传给 AI

# Memory 类型：
# 1. Buffer - 记住所有（适合短对话）
# 2. Window - 记住最近 N 轮（节省 token）
# 3. Token - 记住最近 N tokens（精确控制）
# 4. Summary - 自动摘要（适合长对话）`,
            description: '了解对话 Memory 的基本概念'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Memory？',
              content: `Memory（记忆）组件让 AI 能够记住之前的对话内容。它存储对话历史，并在每次交互时将历史信息注入到提示中，使模型能够基于之前的上下文进行回复。

就像给 AI 安装了一个记忆芯片 - 可以记住用户的名字、偏好、之前讨论的内容等。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **多轮对话** - 支持连续对话而非孤立问答
2. **个性化** - 记住用户偏好和历史
3. **上下文理解** - 基于完整上下文理解意图
4. **状态追踪** - 追踪任务进度、已完成步骤`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 选择 Memory 类型',
                  description: '根据对话长度选择',
                  code: `# 短对话（3-5轮）
ConversationBufferMemory
- 记住所有对话
- 简单直接

# 长对话
ConversationTokenBufferMemory
- 按 token 数限制
- 自动截断旧消息

# 超长对话
ConversationSummaryMemory
- 自动生成摘要
- 保留关键信息

# 只关心最近
ConversationBufferWindowMemory
- 只保留最近 N 轮`
                },
                {
                  title: 'Step 2: 保存对话',
                  description: '把对话历史存起来',
                  code: `# 基本用法
memory = ConversationBufferMemory()

# 保存对话
memory.save_context(
    {"input": "我叫张三"},           # 用户说的话
    {"output": "你好张三，很高兴认识你"}  # AI 的回复
)

# 或使用 ChatMessageHistory
from langchain.memory import ChatMessageHistory
chat_history = ChatMessageHistory()
chat_history.add_user_message("你好")
chat_history.add_ai_message("你好！有什么可以帮你的？")`
                },
                {
                  title: 'Step 3: 加载历史',
                  description: '把历史注入到提示中',
                  code: `# 获取历史对话
history = memory.load_memory_variables({})
# 返回: {'history': '用户: 你好\\nAI: 你好！...'}

# 注入到提示
prompt = f"""
历史对话：
{history['history']}

当前问题：{user_input}

请回答："""
# 将完整提示发给 AI`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '🤖 客服机器人',
                  why: '用户可能多次咨询，需要记住之前的问题和解决方案。',
                  example: '用户：我的订单还没到\nAI：请提供订单号\n用户：订单号是 12345\nAI：记住了，继续帮你查询订单 12345...'
                },
                {
                  scenario: '📋 面试助手',
                  why: '面试多轮对话中，需要记住候选人的回答以便综合评估。',
                  example: '记住候选人自我介绍、回答的每个问题、追问的细节，最终生成面试评估报告'
                },
                {
                  scenario: '📊 数据分析助手',
                  why: '用户进行多步骤数据分析，需要记住每一步的选择和结果。',
                  example: '用户选择"分析销售数据" → 选择"按月份" → 看到结果 → 说"改成按地区" → 理解用户还在分析销售数据'
                },
                {
                  scenario: '📝 文案撰写助手',
                  why: '撰写系列文案时，需要保持风格和内容的连贯性。',
                  example: '用户说"写一篇关于 AI 的文章" → AI 询问"面向技术还是普通读者" → 用户回答后 → 继续撰写符合目标读者的文章'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Memory 底层原理

### 数据结构

\`\`\`python
memory.chat_memory = [
    HumanMessage(content="我叫张三"),
    AIMessage(content="你好张三"),
    HumanMessage(content="我喜欢苹果"),
    AIMessage(content="好的，记住你喜欢苹果了"),
]
\`\`\`

### 上下文注入方式

| 方式 | 实现 | 优缺点 |
|------|------|--------|
| 直接拼接 | history + current | 简单，可能超长 |
| 摘要 | summarize + current | 节省 token |
| 压缩 | extract key + current | 保留重点 |

### Memory 对比

| 类型 | Token 消耗 | 信息完整度 | 适用场景 |
|------|------------|------------|----------|
| Buffer | 高 | 100% | 短对话 |
| Window | 中 | ~最近几轮 | 中等对话 |
| Token | 中 | 精确控制 | 长对话 |
| Summary | 低 | ~70% | 超长对话 |`
            }
          ]
        }
      ]
    },
    {
      id: 'rag-retrieval',
      name: 'RAG 与检索',
      nameEn: 'RAG & Retrieval',
      icon: '🔍',
      description: '构建检索增强生成系统',
      color: 'bg-orange-500',
      tutorials: [
        {
          id: 'retriever',
          name: 'Retriever',
          icon: '🎯',
          description: '检索器接口和实现',
          difficulty: 'intermediate',
          relatedTools: ['Vector Store', 'Embeddings'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：从知识库中找到相关信息

# Retriever = 接收问题 → 搜索知识库 → 返回相关文档

# 典型流程：
# 1. 准备知识库（文档 → 分割 → Embedding → 存储）
# 2. 用户提问
# 3. Retriever 找到相关文档
# 4. 把文档 + 问题发给 AI
# 5. AI 基于文档回答`,
            description: '了解 Retriever 的基本概念'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Retriever？',
              content: `Retriever 负责根据用户查询从数据源中找到最相关的信息。它是 RAG（检索增强生成）系统的核心组件，连接用户查询和知识库。

就像图书馆的检索系统 - 根据你的问题找到相关的书籍和资料。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **扩展知识** - 让 AI 访问额外信息
2. **减少幻觉** - 基于真实文档回答
3. **实时更新** - 知识库可独立更新
4. **可追溯** - 引用信息来源`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 构建向量库',
                  description: '准备可检索的知识库',
                  code: `# 1. 准备文档
documents = [...]  # 你的知识库文档

# 2. 分割
splitter = RecursiveCharacterTextSplitter(chunk_size=500)
chunks = splitter.split_documents(documents)

# 3. 向量化和存储
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=OpenAIEmbeddings()
)`
                },
                {
                  title: 'Step 2: 创建检索器',
                  description: '从向量库创建检索器',
                  code: `# 方式1：直接使用向量库
retriever = vectorstore.as_retriever(
    search_kwargs={"k": 4}  # 返回 4 个结果
)

# 方式2：配置检索策略
retriever = vectorstore.as_retriever(
    search_type="mmr",  # MMR 多样性检索
    search_kwargs={
        "k": 4,
        "fetch_k": 10,  # 初步取 10 个
        "lambda_mult": 0.5  # 相关性/多样性平衡
    }
)`
                },
                {
                  title: 'Step 3: 执行检索',
                  description: '根据问题找到相关文档',
                  code: `# 检索
results = retriever.get_relevant_documents(
    "什么是机器学习？"
)

# 查看结果
for doc in results:
    print(doc.page_content)
    print("---")

# 返回的是 Document 对象列表
# 包含 page_content（内容）和 metadata（来源）`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '🏦 银行智能客服',
                  why: '客户询问产品、利率、政策等问题，快速从海量文档中找到准确答案。',
                  example: '客户问"信用卡逾期怎么办" → 检索信用卡政策文档 → 返回具体处理流程'
                },
                {
                  scenario: '⚖️ 法律咨询助手',
                  why: '律师或当事人需要快速查找相关法条、案例、司法解释。',
                  example: '输入案情描述 → 检索相关法条和案例 → 提供法律建议参考'
                },
                {
                  scenario: '💊 医疗辅助诊断',
                  why: '医生需要快速查找相似病例、诊疗指南、药物说明。',
                  example: '输入症状和检查结果 → 检索相似病例和诊疗指南 → 辅助诊断'
                },
                {
                  scenario: '📚 教材问答系统',
                  why: '学生提问时，快速从教材中找到相关知识点解答。',
                  example: '学生问"光的折射是什么" → 检索物理教材 → 返回相关章节和解释'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Retriever 底层原理

### 检索流程

\`\`\`
用户查询 → Query 改写 → 向量转换 → 相似度计算 → 结果排序 → 返回
\`\`\`

### 搜索类型

| 类型 | 描述 | 适用场景 |
|------|------|----------|
| similarity | 余弦相似度 | 通用场景 |
| mmr | 最大边际相关性 | 需要多样性 |
| similarity_score_threshold | 分数阈值 | 需要质量保证 |

### MMR (Maximum Marginal Relevance)

MMR 在相关性和多样性间平衡：
- **k**：最终返回数量
- **fetch_k**：初步检索数量
- **lambda_mult**：0=多样性优先，1=相关性优先`
            }
          ]
        },
        {
          id: 'rag-pipeline',
          name: 'RAG Pipeline',
          icon: '🔗',
          description: '完整 RAG 系统构建',
          difficulty: 'advanced',
          relatedTools: ['Document Loader', 'Text Splitter', 'Embedding', 'Retriever', 'Memory'],
          quickStart: {
            title: '10分钟快速开始',
            code: `# RAG = Retrieval（检索）+ Augmented（增强）+ Generation（生成）

# 完整流程：
# 1. 文档准备 → 分割 → Embedding → 存储
# 2. 用户提问 → 检索 → 找到相关文档
# 3. 把文档 + 问题发给 AI → 生成回答

# 核心价值：
# AI 不再只靠训练数据回答
# 可以基于你的文档回答具体问题`,
            description: '了解 RAG 的完整流程'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 RAG？',
              content: `RAG (Retrieval-Augmented Generation) 是一种结合检索和生成的架构。它：
1. 从知识库检索相关信息
2. 将检索结果注入到提示中
3. 基于上下文生成答案

这让 AI 能够回答基于特定文档的问题，而不仅仅是训练数据中的知识。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **知识时效性** - 可使用最新文档而非过时训练数据
2. **领域专精** - 针对特定领域构建专家系统
3. **可解释性** - 答案可追溯到具体文档
4. **成本效率** - 比微调更经济的定制方式`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 准备知识库',
                  description: '文档处理和向量化',
                  code: `# 1. 加载文档
loader = PDFLoader("knowledge_base.pdf")
docs = loader.load()

# 2. 分割
splitter = RecursiveCharacterTextSplitter(chunk_size=500)
chunks = splitter.split_documents(docs)

# 3. 存入向量库
vectorstore = Chroma.from_documents(
    documents=chunks,
    embedding=OpenAIEmbeddings()
)

# 4. 创建检索器
retriever = vectorstore.as_retriever(search_kwargs={"k": 4})`
                },
                {
                  title: 'Step 2: 构建 RAG 链',
                  description: '组合检索和生成',
                  code: `# 提示模板（告诉 AI 怎么用检索结果）
template = """基于以下参考资料回答问题。
如果资料不够，请说明。

参考资料：
{context}

问题：{question}

回答："""

prompt = PromptTemplate.from_template(template)

# 完整 RAG 链
rag_chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | chat_model
    | StrOutputParser()
)`
                },
                {
                  title: 'Step 3: 使用',
                  description: '提问并获得基于文档的回答',
                  code: `# 提问
result = rag_chain.invoke("你们公司的年假政策是什么？")

# 返回基于文档的回答，并引用来源
print(result)

# 带来源的版本
qa_chain = RetrievalQA.from_chain_type(
    llm=chat_model,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True
)

result = qa_chain({"query": "年假政策"})
print(result["result"])
print(result["source_documents"])  # 引用来源`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '🏢 企业知识库问答',
                  why: '员工需要了解公司政策、流程、技术规范，无需人工整理即可获得准确答案。',
                  example: 'HR 助手：新员工问"入职第一周要做什么" → RAG 检索公司入职指南 → 回答并引用具体文档'
                },
                {
                  scenario: '📑 合同审查助手',
                  why: '法务人员需要快速审查合同条款，识别风险点。',
                  example: '上传合同 → RAG 检索相关法规和公司标准条款 → 自动标注风险条款并给出建议'
                },
                {
                  scenario: '🧬 医学文献助手',
                  why: '医生需要快速了解最新研究成果和临床指南。',
                  example: '医生询问某种新药 → RAG 检索最新临床试验数据 → 提供循证医学建议'
                },
                {
                  scenario: '📰 新闻分析助手',
                  why: '编辑需要快速了解某个事件的多方观点和背景。',
                  example: '输入新闻事件 → RAG 检索相关报道、评论、分析 → 生成多角度总结'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## RAG Pipeline 底层原理

### 完整流程

\`\`\`
文档 → 加载 → 分割 → 嵌入 → 存储 → 检索 → 生成
\`\`\`

### Chain Type 详解

**stuff**（常用）：
\`\`\`
所有相关文档 + 问题 → 一次 AI 调用
优点：简单、上下文完整
缺点：文档数量受限（通常 < 5）
\`\`\`

**map_reduce**：
\`\`\`
每个文档 → AI 摘要 → 所有摘要 → 最终答案
优点：处理大量文档
缺点：可能丢失文档间关联
\`\`\`

**refine**：
\`\`\`
文档1 → 答案1 → +文档2 → 改进答案1 → ...
优点：迭代优化
缺点：调用多次 AI
\`\`\`

### RAG 优化策略

1. **Query 改写**：将口语问题转换为检索友好的形式
2. **HyDE**：让 AI 先生成假设答案再检索
3. **后处理**：Rerank 优化检索结果排序`
            }
          ]
        }
      ]
    },
    {
      id: 'agents',
      name: 'Agent 与自动化',
      nameEn: 'Agents & Automation',
      icon: '🤖',
      description: '构建智能代理和自动化工作流',
      color: 'bg-red-500',
      tutorials: [
        {
          id: 'tool-calling',
          name: 'Tool Calling',
          icon: '🔧',
          description: '让模型调用外部工具',
          difficulty: 'intermediate',
          relatedTools: ['Tools', 'Bind Tools'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：给 AI 装上"手"

# Tool Calling = 让 AI 能够：
# - 搜索网络
# - 执行计算
# - 访问 API
# - 操作数据库
# - 发邮件、发消息

# 效果：
# AI 不只能回答问题
# 还能帮你执行实际操作`,
            description: '了解 Tool Calling 的基本概念'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Tool Calling？',
              content: `Tool Calling 允许 AI 调用外部工具和函数。这是实现 Agent 的基础，让 AI 能够：
1. 搜索实时信息
2. 执行计算
3. 访问外部 API
4. 操作文件和数据库

这大大扩展了 AI 的能力边界，让它不再受限于训练数据。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **访问实时数据** - 获取最新天气、新闻、股价
2. **执行动作** - 发邮件、创建日程、操作数据库
3. **精确计算** - 进行数学计算而非估算
4. **扩展能力** - 连接外部系统和服务`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 定义工具',
                  description: '告诉 AI 你有什么工具可用',
                  code: `# 定义一个计算器工具
工具名：calculator
功能：执行数学计算
输入：数学表达式（字符串）
输出：计算结果

示例：
输入："25 * 3 + 10"
输出："85"

# 定义一个搜索工具
工具名：web_search
功能：搜索网络获取信息
输入：搜索关键词
输出：搜索结果摘要`
                },
                {
                  title: 'Step 2: 让 AI 判断何时使用',
                  description: 'AI 会自动判断',
                  code: `# 当用户问：
"北京今天的天气怎么样？"

# AI 自动识别：
# → 需要调用 weather 工具
# → 调用 weather(city="北京")

# 当用户问：
# "计算 25 * 3 + 10"

# AI 自动识别：
# → 需要调用 calculator 工具
# → 调用 calculator(expression="25 * 3 + 10")`
                },
                {
                  title: 'Step 3: 执行并返回结果',
                  description: '工具执行后，AI 整合回答',
                  code: `# 完整流程：
1. 用户提问
2. AI 判断需要工具
3. 执行工具
4. 获得结果
5. AI 整合结果回答

示例：
用户："帮我查下北京天气，然后计算华氏温度"

AI 思考：
1. 需要先查天气 → 调用 weather("北京")
2. 得到结果：25°C
3. 需要转换华氏度 → 调用 calculator("25 * 9 / 5 + 32")
4. 得到结果：77°F
5. 整合回答："北京今天25°C，等于77°F""`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📊 自动数据分析',
                  why: '用户想要分析数据，AI 自动连接数据库、执行查询、生成报告。',
                  example: '用户："分析一下上个季度各地区的销售数据" → AI 连接数据库 → 执行 SQL → 分析结果 → 生成报告'
                },
                {
                  scenario: '📅 智能日程管理',
                  why: 'AI 能够帮你创建日历、设置提醒、发送邀请。',
                  example: '用户："明天下午3点和张总开会" → AI 创建日历事件 → 发送会议邀请 → 设置提前15分钟提醒'
                },
                {
                  scenario: '📧 邮件自动处理',
                  why: 'AI 可以读取、分类、回复邮件，甚至帮你写邮件。',
                  example: '收到客户邮件询问产品 → AI 读取 → 判断是售前咨询 → 调用产品数据库 → 生成回复草稿'
                },
                {
                  scenario: '🔍 市场调研自动化',
                  why: 'AI 自动搜索多个信息源，整合成调研报告。',
                  example: '用户："调研一下竞品A和B的市场表现" → AI 搜索官网/新闻/财报 → 整合数据 → 生成对比报告'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Tool Calling 底层原理

### 函数调用格式

AI 输出的函数调用格式：
\`\`\`json
{
  "name": "get_weather",
  "arguments": {
    "city": "北京"
  }
}
\`\`\`

### Tool 定义要素

1. **name**：工具名称（唯一标识）
2. **description**：描述工具用途（AI 据此决定何时调用）
3. **parameters**：参数模式（可选，用于验证）

### 提示词工程

Tool 的 description 至关重要：
\`\`\`python
# ❌ 模糊描述
description="搜索工具"

# ✅ 清晰描述
description="当用户询问当前新闻、最新事件、天气、股价、或需要获取实时信息时使用"
\`\`\``
            }
          ]
        },
        {
          id: 'agent-types',
          name: 'Agent 类型',
          icon: '🧩',
          description: '各种 Agent 架构和实现',
          difficulty: 'advanced',
          relatedTools: ['Tool Calling', 'ReAct'],
          quickStart: {
            title: '10分钟快速开始',
            code: `# 核心概念：会思考的 AI

# Agent vs 普通 AI：
# - 普通 AI：一问一答
# - Agent：规划 → 执行 → 观察 → 调整 → 完成任务

# 常见 Agent 类型：
# 1. ReAct Agent - 思考+行动+观察循环
# 2. Functions Agent - 利用 AI 原生函数调用
# 3. Plan-and-Execute - 先规划再执行

# 应用场景：
# - 多步骤任务
# - 需要根据结果调整
# - 复杂工作流自动化`,
            description: '了解 Agent 的基本概念'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 Agent？',
              content: `Agent 是一个能够自主决策和执行动作的 AI 系统。与简单的工具调用不同，Agent 可以：
1. 规划多步骤任务
2. 根据结果调整策略
3. 在不确定时询问用户
4. 使用多种工具完成复杂任务

就像一个能干的助手 - 你只需告诉目标，它自己决定怎么做。`
            },
            {
              type: 'why',
              title: '为什么需要 Agent？',
              content: `1. **复杂任务** - 多步骤、跨工具的任务
2. **动态决策** - 根据中间结果调整计划
3. **自动化** - 减少人工干预
4. **灵活性** - 适应不同场景和需求`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 选择 Agent 类型',
                  description: '根据任务复杂度选择',
                  code: `# 简单任务 / 快速原型
ReAct Agent
- 思考 → 行动 → 观察 → 循环
- 适合单轮问答后调用工具

# 复杂对话 / 需要记忆
Conversational Agent
- 带对话历史
- 支持多轮交互

# GPT-4 / 精确函数调用
OpenAI Functions Agent
- 利用原生函数调用能力
- 适合生产环境`
                },
                {
                  title: 'Step 2: 定义可用工具',
                  description: '给 Agent 装备工具',
                  code: `# 给 Agent 装备的工具
tools = [
    search_tool,      # 搜索
    calculator_tool,  # 计算
    database_tool,    # 数据库查询
    email_tool,       # 发送邮件
    calendar_tool,    # 日历管理
    ...              # 根据需求添加
]

# Agent 会根据任务自动选择工具
# 你不需要告诉它用什么工具，它自己判断`
                },
                {
                  title: 'Step 3: 交给 Agent 执行',
                  description: '描述任务，让 Agent 完成',
                  code: `# 描述任务
task = """
帮我完成以下工作：
1. 查一下 A 公司最近的新闻
2. 分析新闻中的关键信息
3. 写一份摘要报告
4. 发邮件给王总
"""

# Agent 自动执行
result = agent.run(task)

# Agent 的思考过程：
# 1. 需要查新闻 → 用 search_tool
# 2. 需要分析 → 用 analysis（内置能力）
# 3. 需要写报告 → 生成文本
# 4. 需要发邮件 → 用 email_tool
# 全程自动，无需人工干预`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📝 自动报告生成',
                  why: '需要综合多个数据源，自动生成完整报告。',
                  example: 'Agent 自动：搜索行业数据 → 查询公司数据库 → 分析竞品 → 生成报告 → 发送给相关人员'
                },
                {
                  scenario: '🔍 竞品监控系统',
                  why: '持续监控竞品动态，自动生成分析报告。',
                  example: 'Agent 定期：爬取竞品网站/新闻 → 提取更新 → 分析影响 → 预警相关人员'
                },
                {
                  scenario: '💼 自动化办公流程',
                  why: '将重复性的多步骤工作自动化。',
                  example: '收到订单 → Agent：验证信息 → 库存检查 → 更新库存系统 → 通知仓库 → 发送确认邮件'
                },
                {
                  scenario: '🎯 智能研究助手',
                  why: '自动完成复杂的研究任务。',
                  example: '研究主题：A公司进入B市场的可行性\nAgent：搜索行业报告 → 分析市场数据 → 对比竞品 → 评估风险 → 生成投资建议'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## Agent 底层原理

### ReAct 循环

\`\`\`
Thought → Action → Observation → Thought → ...
\`\`\`

**Thought**：思考下一步该做什么
**Action**：执行工具或动作
**Observation**：获取结果
**循环直到完成**

### Agent 架构

\`\`\`
Agent
├── Agent Executor（执行器）
│   ├── Agent（大脑，决定做什么）
│   ├── Tools（工具集）
│   └── Memory（可选，记忆）
└── Output Parser（解析输出）
\`\`\`

### 常见问题处理

1. **无限循环** - 设置最大迭代次数
2. **工具执行失败** - 提供备选方案
3. **超时** - 设置执行超时时间`
            }
          ]
        }
      ]
    },
    {
      id: 'lcel-langgraph',
      name: '高级编排',
      nameEn: 'Advanced Composition',
      icon: '🔗',
      description: 'LCEL 和 LangGraph 高级用法',
      color: 'bg-indigo-500',
      tutorials: [
        {
          id: 'lcel',
          name: 'LCEL',
          icon: '⛓️',
          description: 'LangChain Expression Language',
          difficulty: 'advanced',
          relatedTools: ['Chains', 'Runnables'],
          quickStart: {
            title: '5分钟快速开始',
            code: `# 核心概念：用 | 组合 AI 组件

# LCEL = LangChain Expression Language
# 用 | 把组件串联成管道

# 示例：
chain = prompt | model | output_parser

# 等价于：
# 1. 构建 prompt
# 2. 发给 model
# 3. 解析 output

# 优点：
# - 代码简洁
# - 易于理解和维护
# - 内置流式、并行、错误处理`,
            description: '了解 LCEL 的基本语法'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 LCEL？',
              content: `LCEL (LangChain Expression Language) 是一种声明式的组件组合语法。它使用 | 运算符将 Runnable 对象链接成管道。

LCEL 的设计目标：
1. **统一接口** - 所有组件都是 Runnable
2. **灵活组合** - 任意组合构建复杂流程
3. **内置支持** - 流式输出、并行处理、错误处理`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **简洁** - 几行代码替代复杂链式调用
2. **可读性** - 管道式代码更直观
3. **可复用** - 组件可单独测试和复用
4. **功能完整** - 内置流式、并行、错误处理`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 理解管道符号 |',
                  description: '| 表示"把结果传给下一步"',
                  code: `# 基本语法
A | B | C

# 等价于：
result = C.invoke(B.invoke(A.invoke(input)))

# 解读：
# input → A 处理 → B 处理 → C 处理 → output

# 示例：
prompt | model | output_parser
# 含义：
# 输入 → 构建提示 → 发送给模型 → 解析输出`
                },
                {
                  title: 'Step 2: 常用模式',
                  description: '常见的 LCEL 组合方式',
                  code: `# 1. 简单 RAG
retriever | prompt | model | output_parser

# 2. 带上下文的问答
{"question": RunnablePassthrough(), "context": retriever}
| prompt
| model
| output_parser

# 3. 并行处理
{"pros": pros_chain, "cons": cons_chain}
| RunnableParallel
| merge_prompt
| model`
                },
                {
                  title: 'Step 3: 调用链',
                  description: '执行链式处理',
                  code: `# 同步调用
result = chain.invoke({"input": "我的问题"})

# 流式调用（一个字一个字输出）
for chunk in chain.stream({"input": "我的问题"}):
    print(chunk, end="", flush=True)

# 批量调用
results = chain.batch([{"input": "Q1"}, {"input": "Q2"}])`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '🔄 数据处理管道',
                  why: '多步骤的数据转换和分析，需要灵活组合。',
                  example: '输入文本 → 清洗 → 分割 → 分析 → 汇总 → 输出报告，全程可监控每步结果'
                },
                {
                  scenario: '🎯 智能问答系统',
                  why: '组合检索、提示、模型、输出解析。',
                  example: '问题 → 检索相关文档 → 构建提示（含上下文）→ AI 生成回答 → 解析为结构化结果'
                },
                {
                  scenario: '📊 多角度分析',
                  why: '同一输入，多个角度分析，并合并结果。',
                  example: '分析报告 → 并行：优点链 + 缺点链 + 风险链 → 合并 → 综合报告'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## LCEL 底层原理

### Runnable 接口

所有 LCEL 组件都实现 Runnable 接口：
\`\`\`python
class Runnable:
    def invoke(self, input) -> Output      # 同步调用
    def batch(self, inputs) -> List[Output] # 批量调用
    def stream(self, input) -> Generator   # 流式调用
    async def ainvoke(self, input) -> Output # 异步调用
\`\`\`

### 常用组件

| 组件 | 作用 |
|------|------|
| PromptTemplate | 构建提示 |
| ChatModel | AI 模型 |
| StrOutputParser | 字符串输出 |
| Retriever | 检索器 |
| RunnableParallel | 并行执行 |
| RunnableBranch | 条件分支 |

### 惰性执行

LCEL 管道是惰性求值的：
- \`chain | model | parser\` 只是定义流程
- \`chain.invoke()\` 才会真正执行`
            }
          ]
        },
        {
          id: 'langgraph',
          name: 'LangGraph',
          icon: '🕸️',
          description: '构建有状态的多步骤工作流',
          difficulty: 'advanced',
          relatedTools: ['LCEL', 'Agent'],
          quickStart: {
            title: '10分钟快速开始',
            code: `# 核心概念：用图来描述工作流

# LangGraph = 用图的方式构建 Agent
# - 节点（Node）：执行单元
# - 边（Edge）：流程控制
# - 状态（State）：跨步骤共享数据

# 适用场景：
# - 有分支的工作流
# - 需要循环的流程
# - 多 Agent 协作
# - 需要持久状态的场景`,
            description: '了解 LangGraph 的基本概念'
          },
          sections: [
            {
              type: 'what',
              title: '什么是 LangGraph？',
              content: `LangGraph 是 LangChain 的扩展，用于构建有状态、多步骤的工作流。它基于图结构：
- **节点 (Node)**：执行单元
- **边 (Edge)**：流程控制
- **状态 (State)**：跨步骤共享数据

适合构建复杂的 Agent 系统、对话流程、多智能体协作等。`
            },
            {
              type: 'why',
              title: '为什么需要它？',
              content: `1. **状态管理** - 复杂流程需要跨步骤状态
2. **循环控制** - 支持条件的循环（LCEL 不支持）
3. **可视化** - 图结构易于理解和调试
4. **多 Agent** - 支持多 Agent 协作`
            },
            {
              type: 'example',
              title: '如何使用',
              codeExamples: [
                {
                  title: 'Step 1: 定义状态',
                  description: '定义工作流中共享的数据结构',
                  code: `# 定义状态
from typing import TypedDict

class WorkflowState(TypedDict):
    messages: list           # 对话历史
    current_task: str        # 当前任务
    completed_steps: list    # 已完成步骤
    result: str              # 最终结果

# 每个节点都会接收和更新这个状态`
                },
                {
                  title: 'Step 2: 定义节点',
                  description: '定义每个步骤要做什么',
                  code: `# 定义节点函数
def research(state):
    # 执行研究
    results = search_web(state["current_task"])
    return {"messages": [...], "result": results}

def write_report(state):
    # 写报告
    report = generate_report(state["result"])
    return {"messages": [...], "completed_steps": ["research", "report"]}

def review(state):
    # 审核
    approved = human_review(state["result"])
    return {"approved": approved}

# 添加到图中
graph.add_node("research", research)
graph.add_node("write_report", write_report)
graph.add_node("review", review)`
                },
                {
                  title: 'Step 3: 定义流程',
                  description: '定义节点之间的连接关系',
                  code: `# 设置入口
graph.set_entry_point("research")

# 定义边
graph.add_edge("research", "write_report")
graph.add_edge("write_report", "review")

# 定义条件分支
def should_continue(state):
    if state["approved"]:
        return "end"
    else:
        return "write_report"  # 打回重写

graph.add_conditional_edges(
    "review",
    should_continue,
    {"approved": "end", "rejected": "write_report"}
)

# 编译
app = graph.compile()

# 执行
result = app.invoke({"messages": [], "current_task": "调研报告"})`
                }
              ]
            },
            {
              type: 'usecase',
              title: '典型使用场景',
              useCases: [
                {
                  scenario: '📝 多轮内容审核',
                  why: '内容需要多轮审核、修改，直到达标。',
                  example: '初稿 → 质量检查 → 不合格则打回修改 → 合格则提交 → 发布。循环直到质量达标。'
                },
                {
                  scenario: '🤖 多 Agent 协作',
                  why: '多个 Agent 分工合作，完成复杂任务。',
                  example: '研究员 Agent（搜集资料）→ 分析师 Agent（分析数据）→ 作家 Agent（撰写报告）→ 审核 Agent（质量把控）'
                },
                {
                  scenario: '💬 复杂对话系统',
                  why: '对话需要根据用户意图走不同流程。',
                  example: '用户输入 → 意图识别 → 路由（查询/办理/投诉）→ 对应处理 → 确认完成/继续处理'
                },
                {
                  scenario: '⏰ 自动化审批流',
                  why: '需要人工参与的多级审批流程。',
                  example: '提交申请 → 自动初审 → 金额大则主管审批 → 更高则总监审批 → 记录归档。符合条件可跳过中间步骤。'
                }
              ]
            },
            {
              type: 'deepdive',
              title: 'In Case You Want to Know How It Works',
              deepDiveContent: `## LangGraph 底层原理

### 图结构

\`\`\`
Graph = Nodes + Edges + State
\`\`\`

### 状态传播

每个节点函数接收当前状态，返回要更新的字段：
\`\`\`python
def node(state):
    new_result = process(state["data"])
    return {"result": new_result}  # 只更新 result 字段
\`\`\`

### Checkpointer（持久化）

\`\`\`python
from langgraph.checkpoint.memory import MemorySaver

checkpointer = MemorySaver()
app = workflow.compile(checkpointer=checkpointer)

# 保存状态
config = {"configurable": {"thread_id": "user_123"}}
app.invoke(input, config=config)

# 恢复状态（继续对话）
app.invoke(None, config=config)
\`\`\`

### 什么时候用 LangGraph vs LCEL

| 场景 | 推荐 |
|------|------|
| 线性流程 | LCEL |
| 有分支 | LCEL 或 LangGraph |
| 有循环 | LangGraph |
| 多 Agent | LangGraph |
| 需要持久状态 | LangGraph |`
            }
          ]
        }
      ]
    }
  ]
};
