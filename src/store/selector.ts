import { RootStateOrAny } from 'react-redux';
import { RootStore } from 'store';

export const UserData = (state: RootStateOrAny) => state.auth.dataUser;
export const Userinfo = (state: RootStateOrAny) => state.auth.userInfo;
export const QuestionImport = (state: RootStateOrAny) => state.question.questionImport;
export const QuestionPreview = (state: RootStore) => state.question.questionPreview;
export const QuestionPreviewAdd = (state: RootStateOrAny) => state.question.questionPreviewAdd;
export const QuestionEdit = (state: RootStore) => state.question.questionEdit;
export const QuestionFilter = (state: RootStore) => state.question.questionFilter;
export const FilterTest = (state: RootStore) => state.test.filter;
export const TestEdit = (state: RootStateOrAny) => state.test.testEdit;
export const Constant = (state: RootStateOrAny) => state.constant.constant;
export const ConfigForm = (state: RootStore) => state.constant.configForm;
export const storeQuestion = (state: RootStateOrAny) => state.test.listQuestion;
export const condition = (state: RootStateOrAny) => state.test.condition;
export const FilterTSA = (state: RootStateOrAny) => state.tsa.filter;
export const FilterIELTS = (state: RootStateOrAny) => state.ielts.filter;
