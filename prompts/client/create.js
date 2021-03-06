if (Meteor.isClient) {

  Template.create.helpers({
    prompts: function() {
      return Prompts.inOrder();
    }
  });

  Template.create.events({
    "submit .create-survey__form": function (event) {
      event.preventDefault();
      var text = event.target.prompt.value;

      Prompts.create(text);
      event.target.prompt.value = "";
    },

    "keyup .create-survey__update-form": _.debounce(function (event) {
      event.preventDefault();
      var text = event.target.value;
      var promptId = $(event.target).data('prompt-id');

      Prompts.update(
        {_id: promptId},
        {$set: {"text": text}}
      );
    }, 200),

    "click .deleteX":function(prompt){
      Prompts.markAsDeleted(this._id);
    }
  });
}
