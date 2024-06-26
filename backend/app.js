let express = require("express");
let app = express();
let bodyParser = require("body-parser");
const cors = require("cors");
const routesAssignment = require("./routes/assignments");
const routesUser = require("./routes/user");
const routesUpload = require("./routes/upload");
const routesSubject = require("./routes/subject");
let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
require("dotenv").config();

async function start(port) {
  // mongoose.set('debug', true);

  // remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
  // const uri = 'mongodb+srv://mb1:toto@cluster0.lxvcyxy.mongodb.net/assignments?retryWrites=true&w=majority&appName=Cluster0';
  // const uri = "mongodb://localhost:27017/TestAngular"
  const uri = "mongodb+srv://angular1654:k4sQlEcEqs9613FE@cluster0.hzatqwf.mongodb.net/assignmentDB?retryWrites=true&w=majority&appName=Cluster0";
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  };

  mongoose.connect(uri, options).then(
    () => {
      console.log("Connecté à la base MongoDB assignments dans le cloud !");
      console.log("at URI = " + uri);
      console.log("vérifiez with http://localhost:" + port + "/api/assignments que cela fonctionne");
    },
    (err) => {
      console.log("Erreur de connexion: ", err);
    }
  );

  // Pour accepter les connexions cross-domain (CORS)
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
  });

  // Pour les formulaires
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors({ origin: "*" }));

  // Pour les images
  app.use(express.static("public"));

  // Obligatoire si déploiement dans le cloud !
  // let port = process.env.PORT || 8010;

  // Les routes
  const prefix = "/api";
  app.use(prefix, routesAssignment);
  app.use(prefix, routesUser);
  app.use(prefix, routesSubject);
  app.use(prefix, routesUpload);

  // On démarre le serveur
  app.listen(port, "0.0.0.0");
  console.log("Serveur démarré sur http://localhost:" + port);
}

exports.start = start;
