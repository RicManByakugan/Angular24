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

module.exports = { getSubjects };
