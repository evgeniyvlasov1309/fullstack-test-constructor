const ApiError = require("../exceptions/api-error");
const TestModel = require("../models/test-model");
const QuestionModel = require("../models/question-model");
const AnswerModel = require("../models/answer-model");


class QuestionService {
    async createQuestion(testId, type, order, description, answers) {
        const testData = await TestModel.findById(testId);
        const questionData = await QuestionModel.create({ type, order, description, test: testId });
        const answersData = await Promise.all(answers.map(async ({ value, correct }) => {
            return await AnswerModel.create({ value, correct, question: questionData._id });
        }));
        testData.questions.push(questionData._id);
        questionData.answers = answersData.map(answer => answer._id);
        await questionData.save();
        await testData.save();
        return questionData;
    }

    async updateQuestion(id, type, order, description, answers) {
        const questionData = await QuestionModel.findById(id);
        if (!questionData) {
            throw ApiError.BadRequest(`Вопрос не найден`);
        }

        questionData.type = type;
        questionData.order = order;
        questionData.description = description;

        const answersData = await Promise.all(answers.map(async answer => {
            const { value, correct } = answer;
            const answerData = await AnswerModel.findById(answer.id);
            if (answerData) {
                answerData.value = value;
                answerData.correct = correct;
                return await answerData.save();
            }
            return await AnswerModel.create({ value, correct, question: id });
        }));

        await Promise.all([questionData.answers.filter(async answer => {
            if (!answers.find(item => item.id === answer._id.toString())) {
                return await AnswerModel.findByIdAndDelete(answer._id)
            }
        })]);

        questionData.answers = answersData.map(answer => answer._id);

        await questionData.save();

        return questionData;
    }

    async deleteQuestion(id) {
        const questionData = await QuestionModel.findByIdAndDelete(id);
        await deleteAnswers(questionData);
        return questionData;
    }

    async deleteAnswers(questionData) {
        return await Promise.all(questionData.answers.map(async ({ _id }) => {
            return await AnswerModel.findByIdAndDelete(_id);
        }));
    }
}

module.exports = new QuestionService();