var app = (function (app) {
    app.initModel = function() {
        var self = this;

        self.items = ko.observableArray([]);
        self.newtasktext = ko.observable();

        self.add = function () {
            var newTask = { task: self.newtasktext(), complete: false };
            $.post('/add', newTask, function (data) {
                newTask._id = data._id;
                self.items.unshift(newTask);
            });
        }

        self.removeTask = function (task) {
            console.log(task);
            $.post('/remove', { _id: task._id }, function (result) {
                if (result.ok) {
                    self.items.remove(task);
                }
            });
        }

        $.get('/items', function (data) {
            var parsedData = JSON.parse(data);
            ko.utils.arrayPushAll(self.items, parsedData);
        })
    };
    
    return app;
}(app || {}));