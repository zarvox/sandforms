Submissions = new Mongo.Collection("submissions");

Submissions.allow({
  insert: function() {
    return true;
  }
});

if (Meteor.isServer) {
  Meteor.publish("submissions", function() {
    if (this.userId === null) return [];
    var user = Meteor.users.findOne({_id: this.userId});
    var permissions = user.services.sandstorm.permissions;
    var isOwner = permissions.indexOf('owner') > -1;

    if (isOwner) {
      return Submissions.find({});
    } else {
      return [];
    }
  });
}

Submissions.inTableFormat = function() {
  var headers = [],
      rows = [];

  Submissions.find().forEach(function(submission){
    var row = [];

    Object.keys(submission.responses).forEach(function(header){
      if (headers.indexOf(header) === -1) { headers.push(header); }
    });

    headers.forEach(function(header){
      row.push(submission.responses[header]);
    });

    rows.push(row);
  });

  Prompts.getPromptContent().forEach(function(header){
    if (headers.indexOf(header) === -1) { headers.push(header); }
  });

  return {headers: headers, rows: rows};
}

Submissions.exportCsvFormattedString = function() {
  var parsedString = '',
      headers = [];
  Submissions.find().forEach(function(submission){
    var row = [];

    Object.keys(submission.responses).forEach(function(header){
      if (headers.indexOf(header) === -1) { headers.push(header); }
    });

    headers.forEach(function(header){
      row.push(submission.responses[header]);
    });

    if(row.length > 0){
      parsedString += row.join(',') + '\r\n';
    }
  });
  
  Prompts.getPromptContent().forEach(function(header){
    if (headers.indexOf(header) === -1) { headers.push(header); }
  });

  return headers.join(',') + '\r\n' + parsedString;
};
