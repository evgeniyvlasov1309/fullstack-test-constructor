const TestModel = require('../models/test-model');
const ApiError = require("../exceptions/api-error");
const questionService = require('./question-service');


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
}

module.exports = new TestService();