// import db from "../Database/index.js";
// function QuizRoutes(app) {
//   app.get("/api/quizzes/:quizName", (req, res) => {
//     const { quizName } = req.params;
//     const quiz = db.quizzes
//       .filter((q) => q.quizName === quizName);
//     res.send(quiz);
//   });

//   app.post("/api/quizzes/:quizName", (req, res) => {
//     const { quizName } = req.params;
//     const newQuiz = {
//         ...req.body,
//         quizName: quizName,
//         _id: new Date().getTime().toString(),
//     };
//     db.modules.push(newQuiz);
//     res.send(newQuiz);
//   });

// }
// export default QuizRoutes;

import db from "../Database/index.js";
function QuizRoutes(app) {
  app.get("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const quizzes = db.quizzes
      .filter((quiz) => quiz.course === cid);
    res.send(quizzes);
  });

  app.post("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const newQuiz = {
      ...req.body,
      course: cid,
      _id: new Date().getTime().toString(),
    };
    db.quizzes.push(newQuiz);
    res.send(newQuiz);
  });

  app.delete("/api/quizzes/:qid", (req, res) => {
    const { qid } = req.params;
    db.quizzes = db.quizzes.filter((quiz) => quiz._id !== qid);
    res.sendStatus(200);
  });

  app.put("/api/quizzes/:qid", (req, res) => {
    const { qid } = req.params;
    const quizIndex = db.quizzes.findIndex(
      (q) => q._id === qid);
    db.quizzes[quizIndex] = {
      ...db.quizzes[quizIndex],
      ...req.body
    };
    res.sendStatus(204);
});

  


}
export default QuizRoutes;