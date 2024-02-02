import { createSlice } from '@reduxjs/toolkit';

import { initStateQuestionAddStore, initStateQuestionEditStore } from '../type';

const initStateQuestionPreview: any = {
  // eslint-disable-next-line camelcase
  answer_type: 0,
  audio: '',
  // eslint-disable-next-line camelcase
  awareness_level: -1,
  count: -1,
  // eslint-disable-next-line camelcase
  count_turns_correct: -1,
  createdAt: '',
  createdBy: '',
  updatedBy: '',
  idQuestion: -1,
  image: '',
  isMathFormula: false,
  level: -1,
  listClass: [],
  listKnowledgeUnit: [],
  listPairOptions: { keys: null, values: null },
  listQuestionChildren: [],
  listSelectOptions: [],
  listShortAnswer: null,
  listSortOptions: null,
  listSubject: [],
  listTag: [],
  name: '',
  // eslint-disable-next-line camelcase
  quiz_type: -1,
  solution: '',
  // eslint-disable-next-line camelcase
  solution_image: '',
  text: '',
  type: -1,
  updatedAt: '',
  video: '',
};
const initStateQuestionAdd: initStateQuestionAddStore = {
  listClass: [],
  listSubject: [],
};
const initStateQuestionEdit: initStateQuestionEditStore = {
  properties: [],
  // eslint-disable-next-line camelcase
  answer_type: 0,
  audio: '',
  // eslint-disable-next-line camelcase
  awareness_level: -1,
  count: -1,
  // eslint-disable-next-line camelcase
  count_turns_correct: -1,
  createdAt: '',
  createdBy: '',
  idQuestion: 0,
  image: '',
  isMathFormula: false,
  level: -1,
  listClass: [],
  listKnowledgeUnit: [],
  listPairOptions: { keys: null, values: null },
  listQuestionChildren: [],
  listSelectOptions: [],
  listShortAnswer: null,
  listSortOptions: null,
  listSubject: [],
  listTag: [],
  name: '',
  // eslint-disable-next-line camelcase
  quiz_type: -1,
  solution: '',
  // eslint-disable-next-line camelcase
  solution_image: '',
  speakElsa: null,
  text: '',
  // eslint-disable-next-line camelcase
  text_latex: '',
  type: -1,
  updatedAt: '',
  video: '',
  title: '',
};

export const questionSlice = createSlice({
  name: 'question',
  initialState: {
    questionImport: [],
    questionPreview: initStateQuestionPreview,
    questionPreviewAdd: initStateQuestionAdd,
    questionEdit: initStateQuestionEdit,
    questionFilter: {},
  },
  reducers: {
    updateQuestion: (state, action) => {
      return { ...state, questionImport: action.payload };
    },
    updateQuestionPreview: (state, action) => {
      return { ...state, questionPreview: action.payload };
    },
    updateQuestionPreviewAdd: (state, action) => {
      return { ...state, questionPreviewAdd: action.payload };
    },
    updateQuestionEdit: (state, action) => {
      return { ...state, questionEdit: action.payload };
    },
    updateQuestionFilter: (state, action) => {
      return { ...state, questionFilter: action.payload };
    },
  },
});

export const {
  updateQuestion,
  updateQuestionPreview,
  updateQuestionEdit,
  updateQuestionPreviewAdd,
  updateQuestionFilter,
} = questionSlice.actions;
