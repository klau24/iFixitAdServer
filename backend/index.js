const express = require("express");
var bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
var uuid = require("uuid");
var cors = require("cors");
const { ObjectId } = require("mongodb");

var MongoClient = require("mongodb").MongoClient;
ObjectID = require("mongodb").ObjectID;
const app = express();

app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const upload = multer({
  dest: "adUploads/",
});

function checkParams(body, params) {
  var missing = [];
  params.forEach((p) => {
    if (!(p in body)) {
      missing.push(p);
    }
  });
  return missing;
}

MongoClient.connect("mongodb://localhost:27017/imagedb", (err, client) => {
  if (err) throw err;

  var db = client.db("ads");

  app.get("/", (req, res) => {
    res.send(`
            <form action="/ads" enctype="multipart/form-data" method="POST">
                <input type="text" name="clickThrough"/>
                <input type="text" name="mainHeader"/>
                <input type="text" name="subHeader"/>
                <input type="text" name="campaign"/>
                <input type="file" name="adImage" accept="image/*" />
                <input type="submit" value="Upload Photo"/>
            </form>
            <form action="/campaigns" enctype="application/x-www-form-urlencoded" method="POST">
                <input type="text" name="campaignTitle" />
                <input type="text" name="startTime" />
                <input type="text" name="endTime" />
                <input type="text" name="description" />
                <input type="submit" value="Submit Campaign"/>
            </form>
        `);
  });

  app.post("/Ads", upload.single("adImage"), (req, res) => {
    var missing = checkParams(req.body, [
      "clickThrough",
      "mainHeader",
      "subHeader",
      "campaign",
    ]);
    if (missing.length > 0) {
      res.status(400).send(JSON.stringify({ missingParams: missing }));
      return;
    }

    var img = fs.readFileSync(req.file.path);
    var encode_image = img.toString("base64");
    var image = {
      contentType: req.file.mimetype,
      image: Buffer.from(encode_image, "base64"),
    };

    db.collection("images")
      .insertOne(image)
      .then((result) => {
        return db.collection("ads").insertOne({
          adImage: `/images/${result["insertedId"]}`,
          clickThrough: req.body.clickThrough,
          mainHeader: req.body.mainHeader,
          subHeader: req.body.subHeader,
          campaign: req.body.campaign,
        });
      })
      .then((result) => {
        res.location(`/ads/${result["insertedId"]}`).send(result["insertedId"]);
      })
      .catch((error) => {
        res.status(500);
        return console.log(error);
      });
  });

  app.get("/Ads/:id", (req, res) => {
    db.collection("ads")
      .findOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        if (result) {
          res.contentType("json").send(result);
        } else {
          res
            .status(400)
            .contentType("json")
            .send(JSON.stringify({ notFound: ["id"] }));
        }
      })
      .catch((err) => {
        res.status(500).send(console.log(err));
      });
  });

  app.get("/Images/:id", (req, res) => {
    db.collection("images")
      .findOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.contentType("image/jpeg");
        res.send(result.image.buffer);
      })
      .catch((err) => {
        res.status(400).send(JSON.stringify({ notFound: req.params.id }));
        return console.log(err);
      });
  });

  app.patch("/Ads/:id", (req, res) => {
    var item = {
      clickThrough: req.body.clickThrough,
      mainHeader: req.body.mainHeader,
      subHeader: req.body.subHeader,
      campaign: req.body.campaign,
    };

    var id = req.params.id;

    db.collection("ads")
      .updateOne({ _id: ObjectID(id) }, { $set: item })
      .then((err, result) => {
        res.contentType("json");
        res.send("Success");
        return;
      })
      .catch((err) => {
        res.status(400).send(JSON.stringify({ notFound: req.params.id }));
      });
  });

  app.delete("/Ads/:id", (req, res) => {
    db.collection("ads")
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.contentType("json");
        res.send(result);
      })
      .catch((err) => {
        res.status(500).send(console.log(err));
      });
  });

  app.get("/Ads", (req, res) => {
    db.collection("ads")
      .find()
      .toArray()
      .then((result) => {
        res.type("json");
        res.send(JSON.stringify({ ads: result }));
      })
      .catch((err) => {
        res.status(500);
        return console.log(err);
      });
  });

  app.post("/Campaigns", (req, res) => {
    var missing = checkParams(req.body, [
      "campaignTitle",
      "startTime",
      "endTime",
      "description",
    ]);
    if (missing.length > 0) {
      res
        .status(400)
        .contentType("json")
        .send(JSON.stringify({ missingParams: missing }));
      return;
    }

    return db
      .collection("campaigns")
      .insertOne({
        campaignTitle: req.body.campaignTitle,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        description: req.body.description,
      })
      .then((result) => {
        res.location(`/campaigns/${result["insertedId"]}`);
        res.send(result["insertedId"]);
      })
      .catch((err) => {
        res.status(500);
        return console.log(err);
      });
  });

  app.patch("/Campaigns/:id", (req, res) => {
    var item = {
      campaignTitle: req.body.campaignTitle,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      description: req.body.description,
    };

    var id = req.params.id;

    db.collection("campaigns")
      .updateOne({ _id: ObjectID(id) }, { $set: item })
      .then((err, result) => {
        res.contentType("json");
        res.send("Success");
        return;
      })
      .catch((err) => {
        res.status(400).send(JSON.stringify({ notFound: req.params.id }));
      });
  });

  app.get("/Campaigns/:id", (req, res) => {
    db.collection("campaigns")
      .findOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        if (result) {
          res.contentType("json");
          res.send(result);
        } else {
          res
            .status(400)
            .contentType("json").send(JSON.stringify({ notFound: ["id"] }));
        }
      })
      .catch((err) => {
        res.status(500).send(console.log(err));
      });
  });

  app.get("/Campaigns/:id/Ads", (req, res) => {
    var campaign = db
      .collection("campaigns")
      .findOne({ _id: ObjectID(req.params.id) });

    campaign.then((result) => {
      db.collection("ads")
        .find({ campaign: { $eq: result.campaignTitle } })
        .toArray((err, result) => {
          if (err) throw err;
          res.contentType("json");
          res.send(JSON.stringify({ ads: result }));
        });
    });
  });

  app.get("/Campaigns", (req, res) => {
    db.collection("campaigns")
      .find()
      .toArray((err, result) => {
        if (err) throw err;
        res.contentType("json");
        res.send(JSON.stringify({ campaigns: result }));
      });
  });

  app.delete("/Campaigns/:id", (req, res) => {
    db.collection("campaigns")
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.contentType("json").send(result);
      })
      .catch((err) => {
        res.status(404);
        res.contentType("json");
        res.send(JSON.stringify({ notFound: req.params.id }));
        return console.log(err);
      });
  });

  app.delete("/CampaignsDB", (req, res) => {
    db.collection("campaigns")
      .deleteMany({})
      .then((result) => {
        res.contentType("json").send(result);
      })
      .catch((err) => {
        res.status(404);
        return console.log(err);
      });
  });

  app.post("/Clicks", (req, res) => {
    var missing = checkParams(req.body, ["id"]);
    if (missing.length > 0) {
      res.status(400).send(JSON.stringify({ missingParams: missing }));
      return;
    }

    try {
      var oid = ObjectId(req.body.id);
    } catch (err) {
      res.status(400).send(JSON.stringify({ notFound: req.params.id }));
      return;
    }

    db.collection("clicks")
      .updateOne({ _id: oid }, { $inc: { clicks: 1 } }, { upsert: true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(500);
      });
  });

  app.get("/Clicks/:id", (req, res) => {
    try {
      var oid = ObjectId(req.params.id);
    } catch (err) {
      res.status(400).res.send(JSON.stringify({ notFound: req.params.id }));
      return;
    }
    db.collection("clicks")
      .findOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.contentType("json").send(result);
      })
      .catch((err) => {
        res.status(500);
        return console.log(err);
      });
  });

  app.get("Clicks", (req, res) => {
    db.collection("clicks")
      .find()
      .toArray()
      .then((result) => {
        res.type("json");
        res.send(JSON.stringify({ clicks: result }));
      })
      .catch((err) => {
        res.status(500);
        return console.log(err);
      });
  });

  app.get("/TotalClicks", (req, res) => {
    db.collection("clicks")
      .aggregate([
        {
          $group: {
            _id: null,
            totalClicks: { $sum: "$clicks" },
          },
        },
      ])
      .toArray()
      .then((result) => {
        res.send(JSON.stringify(result[0]));
      })
      .catch((err) => {
        res.status(500);
        return err;
      });
  });

  app.get("/Decisions/Random", (req, res) => {
    db.collection("ads")
      .aggregate([{ $sample: { size: 1 } }])
      .toArray()
      .then((result) => {
        if (result.length == 1) {
          res.send(JSON.stringify(result[0]));
        } else {
          res.status(404).send("No ads found");
        }
      })
      .catch((err) => {
        res.status(500);
        return console.log(err);
      });
  });
});

const port = 3001;
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
