var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect(
  'mongodb+srv://johnvees:johnvees@cluster0.kehkj0s.mongodb.net/db_kuratorberita?retryWrites=true&w=majority',

  function () {
    // Load Mongoose models
    seeder.loadModels(['./models/Users']);

    // Clear specified collections
    seeder.clearModels(['Users'], function () {
      // Callback to populate DB once collections have been cleared
      seeder.populateModels(data, function () {
        seeder.disconnect();
      });
    });
  }
);

var data = [
  {
    model: 'Users',
    documents: [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        namaLengkap: 'admin',
        username: 'admin',
        password: 'rahasia',
      },
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903346'),
        namaLengkap: 'superadmin',
        username: 'superadmin',
        password: 'rahasia',
        role: 'admin',
      },
    ],
  },
];
