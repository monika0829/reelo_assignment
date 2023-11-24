class Question {
    constructor(question, subject, topic, difficulty, marks) {
        this.question = question;
        this.subject = subject;
        this.topic = topic;
        this.difficulty = difficulty;
        this.marks = marks;
    }
}

class QuestionStore {
    constructor() {
        this.questions = [];
    }

    addQuestion(question) {
        this.questions.push(question);
    }
}

class QuestionPaperGenerator {
    constructor(questionStore) {
        this.questionStore = questionStore;
    }

    generatePaper(totalMarks, difficultyDistribution) {
        const questionPaper = [];
        let remainingMarks = totalMarks;

        for (const [difficulty, percentage] of Object.entries(difficultyDistribution)) {
            const difficultyMarks = Math.floor(totalMarks * percentage);
            const selectedQuestions = this._selectQuestions(difficulty, difficultyMarks);
            questionPaper.push(...selectedQuestions);
            remainingMarks -= difficultyMarks;
        }

        // If there are remaining marks, randomly add questions to fulfill the total marks
        if (remainingMarks > 0) {
            const additionalQuestions = this._selectQuestions(null, remainingMarks);
            questionPaper.push(...additionalQuestions);
        }

        return questionPaper;
    }

    _selectQuestions(difficulty, marks) {
        const availableQuestions = this.questionStore.questions.filter(
            q => difficulty === null || q.difficulty === difficulty
        );

        const selectedQuestions = this._shuffleArray(availableQuestions).slice(0, marks);
        return selectedQuestions;
    }

    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

// Example usage
const questionStore = new QuestionStore();
questionStore.addQuestion(new Question("What is the speed of light", "Physics", "Waves", "Easy", 5));
// Add more questions...

const questionPaperGenerator = new QuestionPaperGenerator(questionStore);

// Define the difficulty distribution for the question paper
const difficultyDistribution = { "Easy": 0.2, "Medium": 0.5, "Hard": 0.3 };

// Generate a question paper with a total of 100 marks
const generatedQuestionPaper = questionPaperGenerator.generatePaper(100, difficultyDistribution);

// Print the generated question paper
generatedQuestionPaper.forEach(q => {
    console.log(`Q: ${q.question}, Difficulty: ${q.difficulty}, Marks: ${q.marks}`);
});
