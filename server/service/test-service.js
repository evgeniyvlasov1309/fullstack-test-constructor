const TestModel = require('../models/test-model');
const ApiError = require("../exceptions/api-error");
const questionService = require('./question-service');
const UserAnswerModel = require('../models/user-answer-model');
const CompletedTestModel = require('../models/completed-test-model');
const CompletedTestDto = require('../dtos/completed-test-dto');

class TestService {
    async createTest(title, userId) {
        const candidate = await TestModel.findOne({ title });
        if (candidate) {
            throw ApiError.BadRequest(`Тест с таким названием уже существует`);
        }
        const test = await TestModel.create({ title, author: userId });
        return test
    }

    async updateTest(id, title) {
        const testData = await TestModel.findOne({ id });
        if (!testData) {
            throw ApiError.BadRequest(`Тест не найден`);
        }

        testData.title = title;
        await testData.save();
        return {
            ...testData,
        }
    }

    async getTests(userId) {
        return await TestModel.find({ userId }).populate('author', ['email']);
    }

    async getTestById(id) {
        const testData = await TestModel.findById(id)
            .populate('author', ['email'])
            .populate({
                path: 'questions',
                select: '-test',
                populate: {
                    path: 'answers',
                    select: '-question',
                }
            });
        return testData;
    }

    async deleteTest(id) {
        const testData = await TestModel.findByIdAndDelete(id);
        await Promise.all([testData.questions.map(async questionId => {
            return await questionService.deleteQuestion(questionId);
        })]);
        return testData;
    }

    async completeTest(userId, id, answers) {
        const completedTestData = await CompletedTestModel.create({ test: id, user: userId });

        let userAnswers = await Promise.all(answers.map(async ({ answer, value }) => {
            return UserAnswerModel.create({ answer, user: userId, test: completedTestData._id, value });
        }));

        userAnswers = await Promise.all(userAnswers.map(async userAnswer => {
            return userAnswer.populate({
                path: 'answer',
                populate: {
                    path: 'question',
                }
            });
        }));

        const testData = await TestModel.findById(id).populate({
            path: 'questions',
            populate: {
                path: 'answers',
            }
        });

        const [right, wrong] = userAnswers.reduce((prev, current) => {
            if (current.answer.question.type !== 'input' && current.answer.correct || current.answer.question.type === 'input' && current.value === current.answer.value) {
                prev[0]++;
            } else {
                prev[1]++;
            }
            return prev;
        }, [0, 0]);

        const missed = testData.questions.reduce((prev, current) => {
            prev += current.answers.filter(answer => answer.correct).length;
            return prev;
        }, 0) - right;

        completedTestData.right = right;
        completedTestData.wrong = wrong;
        completedTestData.missed = missed;
        await completedTestData.save();

        return completedTestData;
    }

    async getCompletedTests(userId) {
        const completedTestData = await CompletedTestModel.find({ userId }).populate('user').populate('test');
        return completedTestData;
    }

    async getCompletedTestById(id) {
        const completedTestData = await CompletedTestModel.findById(id)
            .populate({
                path: 'test',
                populate: {
                    path: 'questions',
                    populate: {
                        path: 'answers',
                    }
                }
            });

        const userAnswers = await UserAnswerModel.find({ test: id }).select(['answer', 'value']);

        return {
            ...new CompletedTestDto(completedTestData),
            userAnswers
        };
    }
}

module.exports = new TestService();