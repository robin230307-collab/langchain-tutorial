export interface CodeExample {
  title: string;
  code: string;
  description: string;
}

export interface UseCase {
  scenario: string;
  why: string;
  example: string;
}

export interface Comparison {
  name: string;
  whenToUse: string;
  example: string;
}

export interface TutorialSection {
  type: 'what' | 'why' | 'how' | 'example' | 'usecase' | 'comparison' | 'deepdive' | 'exercise';
  title: string;
  content?: string;
  codeExamples?: CodeExample[];
  useCases?: UseCase[];
  comparisons?: Comparison[];
  deepDiveContent?: string;
}

export interface AIIntegration {
  /** 安装命令 */
  installCommand: string;
  /** API Key获取地址 */
  apiKeyUrl: string;
  /** 基础代码示例 */
  basicCode: string;
  /** 支持的AI列表 */
  supportedAIs: string[];
  /** 注意事项 */
  notes: string[];
}

export interface Tutorial {
  id: string;
  name: string;
  icon: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  sections: TutorialSection[];
  relatedTools: string[];
  relatedToolIds?: string[]; // IDs of related tutorials for navigation
  quickStart?: CodeExample;
  aiIntegration?: AIIntegration;
}

export interface TutorialCategory {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  description: string;
  color: string;
  tutorials: Tutorial[];
}

export interface TutorialData {
  categories: TutorialCategory[];
}
