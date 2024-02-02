export enum RoleType {
  ADMIN = 0,
  REDACTOR = 1,
  ANNUNCIATOR = 2,
}

export enum TagType {
  QUESTION = 0,
  TOPIC = 1,
}

export enum questionEnumType {
  ESSAY = 0,
  ONE_RIGHT = 1,
  MULTIPLE_RIGHT = 2,
  YES_NO = 3,
  SHORT = 4,
  PAIR = 5,
  READING = 6,
  FILL_BLANK = 7,
  SORT = 8,
  ELSASPEAKING = 9,
  DRAG_DROP = 12,
  MULTIPLE_YES_NO_ONE_RIGHT = 10,
  MULTIPLE_YES_NO_MULTIPLE_RIGHT = 11,
  SPEAKING = 13,
  DROPDOWN_ONE_RIGHT = 14,
}
export enum AnswerType {
  TEXT = 0,
  IMAGE = 1,
  AUDIO = 2,
  VIDEO = 3,
}
export enum TypeUpload {
  QUESTION = 0,
  ANSWER = 1,
  DESCRIPTION,
}

export enum TestType {
  STATIC = 0,
  DYNAMIC = 1,
  CONDITIONS = 2,
}

export enum TypeHSA {
  QUALITATIVE = 1,
  QUANTITATIVE = 2,
  SCIENCE = 3,
}

export enum TypeFilter {
  Default = 0,
  ID = 1,
  NameQuestion = 2,
  Tag = 3,
  Content = 4,
  KnowledgeUnit = 5,
}

export enum TypeReturnResult {
  returnPoint = 0,
  returnPointAnswer = 1,
  returnPointAnswerTrue = 2,
  returnGuide = 3,
}

export enum TypeInput {
  STRING = 'string',
  NUMBER = 'number',
  ARRAY = 'array',
  STATIC = 'static',
}
export enum HSAContest {
  TU_DUY_DINH_LUONG,
  TU_DUY_DINH_TINH,
  KHOA_HOC,
}
export enum TSAContest {
  TU_DUY_TOAN_HOC = 3,
  TU_DUY_DOC_HIEU,
  TU_DUY_KHOA_HOC,
}
export enum IELTSContest {
  LISTENING = 6,
  READING,
  WRITING,
  SPEAKING,
}
export enum TopClassContest {
  TOPCLASS = 10,
}
export enum APTContest {
  TIENG_VIET = 11,
  TIENG_ANH,
  TOAN_HOC_LOGIC_SO_LIEU,
  GIAI_QUYET_VAN_DE,
}
export enum PracticeContest {
  Practice = 15,
}
