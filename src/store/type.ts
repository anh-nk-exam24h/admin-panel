export type initStateQuestionPreviewStore = {
  answer_type: number;
  audio: string;
  awareness_level: number;
  count: number;
  count_turns_correct: number;
  createdAt: string;
  createdBy: string;
  updatedBy: string;
  idQuestion: number;
  image: string;
  isMathFormula: boolean;
  level: number;
  listClass: any;
  listKnowledgeUnit: any;
  listPairOptions: any;
  listQuestionChildren: any[];
  listSelectOptions: any[];
  listShortAnswer: any;
  listSortOptions: any;
  listSubject: any[];
  listTag: any[];
  name: string;
  // eslint-disable-next-line camelcase
  quiz_type: number;
  solution: string;
  // eslint-disable-next-line camelcase
  solution_image: string;
  text: string;
  type: number;
  updatedAt: string;
  video: string;
};
export type initStateQuestionEditStore = {
  properties: any;
  [x: string]: any;
  answer_type: number;
  audio: string;
  awareness_level: number;
  count: number;
  count_turns_correct: number;
  createdAt: string;
  createdBy: string;
  idQuestion: number;
  image: string;
  isMathFormula: boolean;
  level: number;
  listClass: any[];
  listKnowledgeUnit: any[];
  listPairOptions: any;
  listQuestionChildren: any[];
  listSelectOptions: any[];
  listShortAnswer: any;
  listSortOptions: any;
  listSubject: any[];
  listTag: any[];
  name: string;
  // eslint-disable-next-line camelcase
  quiz_type: number;
  solution: string;
  // eslint-disable-next-line camelcase
  solution_image: string;
  speakElsa: any;
  text: string;
  text_latex: string;
  type: number;
  updatedAt: string;
  video: string;
  title?: string;
};

export type initStateQuestionAddStore = {
  listClass: any[];
  listSubject: any[];
};
