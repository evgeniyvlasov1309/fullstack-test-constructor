import { TestModel } from "./Test";
import { User } from "./User";
import { UserAnswer } from "./UserAnswer";

export interface CompletedTestModel {
    id: string;
    test: TestModel;
    user: User;
    completionDate: string;
    right: number;
    wrong: number;
    missed: number;
    userAnswers: UserAnswer[];
}