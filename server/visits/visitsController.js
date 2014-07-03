var Visit    = require('./visitModel.js'),
    Q       = require('q'),
    util    = require('../config/utils.js');


module.exports = {
  findByLinkId: function (req, res, next, link_id) {
    var findVisit = Q.nbind(Visit.find, Link);
    findLink({link_id: link_id})
      .then(function (visits) {
        if (visits) {
          // req.navLink = link;
          res.send(visits)
          next();
        } else {
          next(new Error('Link not added yet'));
        }
      })
      .fail(function (error) {
        next(error);
      });
  },


  newLink: function (req, res, next, link_id) {
    var created_at = req.body.created_at;
    var link_id = req.body.link_id;
    console.log(req.body);
    // if (!util.isValidUrl(url)) {
    //   return next(new Error('Not a valid url'));
    // }

    var createVisit = Q.nbind(Visit.create, Visit);
    var findVisit = Q.nbind(Visit.find, Visit);

    findVisit({link_id: link_id})
      .then(function (match) {
        if (match) {
          res.send(match);
        } else {
          return  util.getUrlTitle(url);
        }
      })
      .then(function (title) {
        if (title) {
          var newLink = {
            url: url,
            visits: [],
            base_url: req.headers.origin,
            title: title
          };
          return createLink(newLink);
        }
      })
      .then(function (createdLink) {
        if (createdLink) {
          res.json(createdLink);
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  navToLink: function (req, res, next) {
    var link = req.navLink;
    var date = new Date();
    var visits = JSON.parse(link.visits);
    visits.push(1, date);
    link.visits = JSON.stringify(visits);
    // link.visits++;
    link.save(function (err, savedLink) {
      if (err) {
        next(err);
      } else {
        res.redirect(savedLink.url);
      }
    });
  },
  // addNewVisit: function (req, res, next) {
  //   var link = req.navLink;
  //   var date = new Date();
  //   //  = JSON.parse(link.visits);
  //   var visits = [];
  //   visits.push(1, date);
  //   link.visits = JSON.stringify(visits);
  //   // link.visits++;
  //   link.save(function (err, savedLink) {
  //     if (err) {
  //       next(err);
  //     } else {
  //       res.end(savedLink);
  //     }
  //   });
  // }

};
