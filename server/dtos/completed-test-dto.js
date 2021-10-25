module.exports = class CompletedTestDto {
    id;
    user;
    test;
    completionDate;
    right;
    wrong;
    missed;

    constructor(model) {
        this.id = model._id;
        this.user = model.user;
        this.test = model.test;
        this.completionDate = model.completionDate;
        this.right = model.right;
        this.wrong = model.wrong;
        this.missed = model.missed;
    }
}