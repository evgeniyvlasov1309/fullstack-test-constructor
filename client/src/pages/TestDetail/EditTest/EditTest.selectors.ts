import {EditTestPageState} from './EditTest.page';

export function testSelector(state: EditTestPageState) {
    return state.testDetail.edit.test;
}