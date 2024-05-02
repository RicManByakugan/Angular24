let Subject = require("../model/subject");
const { ObjectID } = require("bson");

const getSubjects = (req, res) => {
  Subject.find({}, (err, subjects) => {
    if (err) {
      res.send(err);
    }
    res.json(subjects);
  });
};


const getSubject = (req, res) => {
  let SubjectId = req.params.id;
  Subject.findOne({ _id: new ObjectID(SubjectId) }, (err, subjects) => {
    if (err) {
      res.send(err);
    }
    res.json(subjects);
  });
};

module.exports = { getSubject, getSubjects };
