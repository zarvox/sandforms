Template.submit.helpers({
  prompts: function() {
    return Prompts.find();
  },
  alreadySubmitted: function() {
    return Session.get('submitted');
  }
});

Template.submit.events({

  'submit form': function(e) {
    e.preventDefault();
    var responseCollection = {};
    Prompts.inOrder().map(function(prompt) {
      var value = $('#' + prompt._id).val();
      if(typeof value === "undefined") { value = '' };
      responseCollection[prompt.text] = value;
    });

    Submissions.insert({responses: responseCollection});

    $('.response-input').val('');
    Session.set('submitted', true)
    Router.go('/thanks')
  }
});
