// export default function QuizRoutes(app) {


//     const saveQuiz = async (req, res) => {
//         try {
//             const quizData = req.body;
//             // Assuming `Quiz` is a Mongoose model
//             const quiz = new Quiz(quizData);
//             await quiz.save();
//             res.status(201).json(quiz); // Send back the saved quiz data, including its ID
//         } catch (error) {
//            res.status(500).json({ message: error.message });
//         }
//     }



//     app.post('/api/quizzes', saveQuiz);
// }



import db from "../Database/index.js";
function QuizRoutes(app) {
  app.get("/api/quizzes/:quizName", (req, res) => {
    const { quizName } = req.params;
    const quiz = db.quizzes
      .filter((q) => q.quizName === quizName);
    res.send(quiz);
  });

  app.post("/api/quizzes/:quizName", (req, res) => {
    const { quizName } = req.params;
    const newQuiz = {
        ...req.body,
        quizName: quizName,
        _id: new Date().getTime().toString(),
    };
    db.modules.push(newQuiz);
    res.send(newQuiz);
  });

}
export default QuizRoutes;