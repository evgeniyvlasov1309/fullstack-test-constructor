const testService = require("../service/test-service");

class TestController {
    async createTest(req, res, next) {
        try {
            const { title } = req.body;
            const userId = req.user.id;
            const testData = await testService.createTest(title, userId);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async getTests(req, res, next) {
        try {
            const userId = req.user.id;
            const testsData = await testService.getTests(userId);
            return res.json(testsData);
        } catch (e) {
            next(e);
        }
    }

    async getTestById(req, res, next) {
        try {
            const { id } = req.params;
            const testData = await testService.getTestById(id);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async updateTest(req, res, next) {
        try {
            const { id } = req.params;
            const { title } = req.body;
            const testData = await testService.updateTest(id, title);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async deleteTest(req, res, next) {
        try {
            const { id } = req.params;
            const testData = await testService.deleteTest(id);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async completeTest(req, res, next) {
        try {
            const userId = req.user.id;
            const { id } = req.params;
            const { answers } = req.body;
            const testData = await testService.completeTest(userId, id, answers);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async getCompletedTests(req, res, next) {
        try {
            const userId = req.user.id;
            const testData = await testService.getCompletedTests(userId);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }

    async getCompletedTestById(req, res, next) {
        try {
            const { id } = req.params;
            const testData = await testService.getCompletedTestById(id);
            return res.json(testData);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new TestController();