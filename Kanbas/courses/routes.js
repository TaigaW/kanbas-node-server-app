import Database from "../Database/index.js";
export default function CourseRoutes(app) {
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex(
          (m) => m._id === mid);
        db.modules[moduleIndex] = {
          ...db.modules[moduleIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
    
    app.delete("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses
          .filter((c) => c._id !== id);
        res.sendStatus(204);
      });
    app.put("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) =>
            c._id === id ? { ...c, ...course } : c
        );
        res.sendStatus(204);
    });
    
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,
          _id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
      });
    
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });
}
