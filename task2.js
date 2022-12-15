import csv from "csvtojson";
import fs from "fs";

csv()
  .fromFile("./csv/doc.csv")
  .then((jsonArrayObj) => {
    fs.open("newFile.txt", "w", function (err, fd) {
      if (err) {
        return console.log(err);
      }

      jsonArrayObj.forEach((item) => {
        fs.write(fd, JSON.stringify(item) + "\n", (err) => {
          if (err) {
            console.error(err.message);
            return;
          }
        });
      });
    });
  });
